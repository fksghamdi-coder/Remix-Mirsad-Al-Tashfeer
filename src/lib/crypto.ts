// src/lib/crypto.ts
// طبقة تشفير موحّدة — تحل محل الملفين القديمين crypto.ts و encryption.ts.
//
// الهيكل (يطابق فصلي 6 و9 من مقرر ISE243):
//   KEK  (مفتاح تغليف، غير قابل للتصدير، محفوظ في IndexedDB كـ CryptoKey)
//    └─ DEK (مفاتيح بيانات AES-256-GCM، تُحفظ مغلّفة بالـ KEK، لكل منها رقم إصدار)
//   HMAC (مفتاح توقيع الجلسات، غير قابل للتصدير)
//
// ملاحظة صريحة: المتصفح لا يوفّر HSM. هذه الطبقة ترفع الكلفة على المهاجم
// (لا يوجد مفتاح خام في localStorage) لكنها لا تحمي من XSS الذي يستطيع
// استدعاء المفتاح من داخل الصفحة. الحماية الحقيقية تكون بالخادم/Cloud KMS.
 
import { SyncEngine } from './syncEngine';

/* ====================== أدوات ثنائية ====================== */
export const crypto = typeof window !== 'undefined' ? window.crypto : (globalThis as any).crypto;
const enc = new TextEncoder();
const dec = new TextDecoder();
 
const buf = (u: Uint8Array): BufferSource => u as BufferSource;
 
export function toHex(bytes: Uint8Array): string {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}
 
export function fromHex(hex: string): Uint8Array {
  if (hex.length % 2 !== 0 || /[^0-9a-f]/i.test(hex)) throw new Error('hex غير صالح');
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return out;
}
 
function toB64(bytes: Uint8Array): string {
  let s = '';
  const CHUNK = 0x8000; // تجنّب حد عدد الوسائط في String.fromCharCode
  for (let i = 0; i < bytes.length; i += CHUNK) {
    s += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(s);
}
 
function fromB64(b64: string): Uint8Array {
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
}
 
/** مقارنة ثابتة الزمن (لا تُسرّب الفروق ولا الطول مبكراً) */
export function safeEqual(a: string, b: string): boolean {
  let diff = a.length ^ b.length;
  const n = Math.max(a.length, b.length);
  for (let i = 0; i < n; i++) diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return diff === 0;
}
 
/* ====================== عشوائية آمنة ====================== */
export function generateSalt(bytes = 16): string {
  const b = new Uint8Array(bytes);
  crypto.getRandomValues(b);
  return toHex(b);
}
 
/** عدد صحيح منتظم في [0, max) بدون انحياز (rejection sampling) */
function randomInt(max: number): number {
  const limit = Math.floor(0x100000000 / max) * max;
  const v = new Uint32Array(1);
  do {
    crypto.getRandomValues(v);
  } while (v[0] >= limit);
  return v[0] % max;
}
 
export function generateRandomPassword(length = 16): string {
  const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%^&*';
  let out = '';
  for (let i = 0; i < length; i++) out += charset[randomInt(charset.length)];
  return out;
}
 
export function generateOTP(): string {
  return String(randomInt(1_000_000)).padStart(6, '0');
}
 
export function sanitizeUsername(academicId: string): string {
  return (
    academicId.trim().toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 24) ||
    'user' + Date.now()
  );
}
 
/* ====================== التجزئة ====================== */
export async function sha256(text: string): Promise<string> {
  const d = await crypto.subtle.digest('SHA-256', buf(enc.encode(text)));
  return toHex(new Uint8Array(d));
}
 
/* ====================== كلمات المرور (PBKDF2) ====================== */
// OWASP (2023): PBKDF2-HMAC-SHA256 ≥ 600,000 تكرار.
export const PBKDF2_ITERATIONS = 600_000;
const LEGACY_ITERATIONS = 200_000;
const HASH_PREFIX = 'v2';
 
async function pbkdf2Bits(
  password: string,
  salt: Uint8Array,
  iterations: number,
  bits: number
): Promise<Uint8Array> {
  const keyMaterial = await crypto.subtle.importKey('raw', buf(enc.encode(password)), 'PBKDF2', false, [
    'deriveBits',
  ]);
  const out = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: buf(salt), iterations, hash: 'SHA-256' },
    keyMaterial,
    bits
  );
  return new Uint8Array(out);
}
 
/**
 * الصيغة الجديدة: v2$<iterations>$<hex 256-bit>
 * الملح (hex) يُفكّ إلى بايتات حقيقية، والمخرج 256 بت = طول SHA-256
 * (المخرج الأطول كان يضاعف كلفة المدافع دون المهاجم).
 */
export async function hashPassword(password: string, salt: string): Promise<string> {
  const out = await pbkdf2Bits(password, fromHex(salt), PBKDF2_ITERATIONS, 256);
  return `${HASH_PREFIX}$${PBKDF2_ITERATIONS}$${toHex(out)}`;
}
 
/** يدعم الصيغ القديمة (200k، 512 أو 256 بت، الملح كنص) لترحيل الحسابات الحالية */
export async function verifyPassword(
  password: string,
  storedHash: string,
  salt: string
): Promise<boolean> {
  if (storedHash.startsWith(HASH_PREFIX + '$')) {
    const [, iterStr, hex] = storedHash.split('$');
    const iterations = parseInt(iterStr, 10);
    if (!Number.isFinite(iterations) || iterations < 100_000 || !hex) return false;
    const out = await pbkdf2Bits(password, fromHex(salt), iterations, hex.length * 4);
    return safeEqual(toHex(out), hex);
  }
  // legacy: الملح مُرمَّز كنص UTF-8 للسلسلة السداسية
  const bits = storedHash.length === 128 ? 512 : 256;
  const out = await pbkdf2Bits(password, enc.encode(salt), LEGACY_ITERATIONS, bits);
  return safeEqual(toHex(out), storedHash);
}
 
/** true إن كان الهاش قديماً ويجب إعادة حسابه بعد نجاح الدخول */
export function needsRehash(storedHash: string): boolean {
  if (!storedHash.startsWith(HASH_PREFIX + '$')) return true;
  return parseInt(storedHash.split('$')[1], 10) < PBKDF2_ITERATIONS;
}
 
/** اشتقاق مفتاح AES من كلمة مرور (للنسخ الاحتياطي المحمي بعبارة سر) */
export async function deriveKey(password: string, salt: string): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey('raw', buf(enc.encode(password)), 'PBKDF2', false, [
    'deriveKey',
  ]);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: buf(fromHex(salt)), iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}
 
/** HKDF-SHA256: اشتقاق مفاتيح فرعية مستقلة من سر رئيسي قوي (فصل 6) */
export async function hkdf(
  secret: Uint8Array,
  info: string,
  salt: Uint8Array = new Uint8Array(32),
  bits = 256
): Promise<Uint8Array> {
  const k = await crypto.subtle.importKey('raw', buf(secret), 'HKDF', false, ['deriveBits']);
  const out = await crypto.subtle.deriveBits(
    { name: 'HKDF', hash: 'SHA-256', salt: buf(salt), info: buf(enc.encode(info)) },
    k,
    bits
  );
  return new Uint8Array(out);
}
 
/* ====================== مخزن المفاتيح ====================== */
const KS_DB = 'mirsad_keystore';
const KS_STORE = 'keys';
 
type KeyRecord =
  | { id: 'kek'; key: CryptoKey }
  | { id: 'hmac'; key: CryptoKey }
  | { id: 'meta'; activeDek: string }
  | { id: string; wrapped: string; iv: string; status: 'active' | 'retired'; createdAt: number };
 
const memStore = new Map<string, KeyRecord>();
let dbPromise: Promise<IDBDatabase> | null = null;
 
function hasIDB(): boolean {
  return typeof indexedDB !== 'undefined';
}
 
function openKS(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(KS_DB, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(KS_STORE)) {
        req.result.createObjectStore(KS_STORE, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}
 
async function ksGet(id: string): Promise<KeyRecord | undefined> {
  if (!hasIDB()) return memStore.get(id);
  const db = await openKS();
  return new Promise((resolve, reject) => {
    const r = db.transaction(KS_STORE, 'readonly').objectStore(KS_STORE).get(id);
    r.onsuccess = () => resolve(r.result as KeyRecord | undefined);
    r.onerror = () => reject(r.error);
  });
}
 
async function ksPut(rec: KeyRecord): Promise<void> {
  if (!hasIDB()) {
    memStore.set(rec.id, rec);
    return;
  }
  const db = await openKS();
  return new Promise((resolve, reject) => {
    const r = db.transaction(KS_STORE, 'readwrite').objectStore(KS_STORE).put(rec);
    r.onsuccess = () => resolve();
    r.onerror = () => reject(r.error);
  });
}
 
/** يكتب فقط إن لم يوجد سجل بنفس المعرّف، ويعيد السجل الفائز (آمن عند فتح عدة تبويبات) */
async function ksPutIfAbsent<T extends KeyRecord>(rec: T): Promise<KeyRecord> {
  if (!hasIDB()) {
    const cur = memStore.get(rec.id);
    if (cur) return cur;
    memStore.set(rec.id, rec);
    return rec;
  }
  const db = await openKS();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(KS_STORE, 'readwrite');
    const store = tx.objectStore(KS_STORE);
    const g = store.get(rec.id);
    g.onsuccess = () => {
      if (g.result) {
        resolve(g.result as KeyRecord);
      } else {
        store.put(rec);
        tx.oncomplete = () => resolve(rec);
      }
    };
    tx.onerror = () => reject(tx.error);
  });
}
 
/* ====================== تهيئة المفاتيح ====================== */
const dekCache = new Map<string, CryptoKey>();
let kekCache: CryptoKey | null = null;
let hmacCache: CryptoKey | null = null;
let activeDekId: string | null = null;
let readyPromise: Promise<void> | null = null;
 
async function wrapDek(dek: CryptoKey, kek: CryptoKey): Promise<{ wrapped: string; iv: string }> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const w = await crypto.subtle.wrapKey('raw', dek, kek, { name: 'AES-GCM', iv: buf(iv) });
  return { wrapped: toB64(new Uint8Array(w)), iv: toB64(iv) };
}
 
async function unwrapDek(rec: { wrapped: string; iv: string }, kek: CryptoKey): Promise<CryptoKey> {
  return crypto.subtle.unwrapKey(
    'raw',
    buf(fromB64(rec.wrapped)),
    kek,
    { name: 'AES-GCM', iv: buf(fromB64(rec.iv)) },
    { name: 'AES-GCM' },
    false, // المفتاح المُسترجع غير قابل للتصدير
    ['encrypt', 'decrypt']
  );
}
 
async function newWrappedDek(kek: CryptoKey) {
  // يجب أن يكون قابلاً للتصدير لحظة التغليف فقط؛ ثم يُسترجع غير قابل للتصدير
  const dek = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, [
    'encrypt',
    'decrypt',
  ]);
  return wrapDek(dek, kek);
}
 
function ensureReady(): Promise<void> {
  if (readyPromise) return readyPromise;
  readyPromise = (async () => {
    const kekRec = await ksPutIfAbsent({
      id: 'kek',
      key: await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, false, [
        'wrapKey',
        'unwrapKey',
      ]),
    } as KeyRecord);
    kekCache = (kekRec as { key: CryptoKey }).key;
 
    const hmacRec = await ksPutIfAbsent({
      id: 'hmac',
      key: await crypto.subtle.generateKey({ name: 'HMAC', hash: 'SHA-256' }, false, [
        'sign',
        'verify',
      ]),
    } as KeyRecord);
    hmacCache = (hmacRec as { key: CryptoKey }).key;
 
    const w = await newWrappedDek(kekCache);
    await ksPutIfAbsent({ id: 'dek:k1', ...w, status: 'active', createdAt: Date.now() });
    const meta = await ksPutIfAbsent({ id: 'meta', activeDek: 'k1' });
    activeDekId = (meta as { activeDek: string }).activeDek;
  })().catch((e) => {
    readyPromise = null; // اسمح بإعادة المحاولة
    throw e;
  });
  return readyPromise;
}
 
async function getDek(id: string): Promise<CryptoKey> {
  await ensureReady();
  const cached = dekCache.get(id);
  if (cached) return cached;
  const rec = (await ksGet('dek:' + id)) as
    | { wrapped: string; iv: string }
    | undefined;
  if (!rec) throw new Error(`مفتاح البيانات ${id} غير موجود`);
  const key = await unwrapDek(rec, kekCache!);
  dekCache.set(id, key);
  return key;
}
 
async function currentDekId(): Promise<string> {
  await ensureReady();
  // أعد قراءة meta لالتقاط تدوير جرى في تبويب آخر
  const meta = (await ksGet('meta')) as { activeDek: string } | undefined;
  if (meta) activeDekId = meta.activeDek;
  return activeDekId!;
}
 
/* ====================== التشفير الموثّق (AES-256-GCM) ====================== */
// الصيغة: v2.<dekId>.<iv b64>.<ciphertext+tag b64>
// context يُربط كبيانات موثّقة إضافية (AAD): نص مشفّر لحقل "phone" لا يُفكّ كحقل "name".
 
export async function encrypt(plaintext: string, context = ''): Promise<string> {
  if (!plaintext) return '';
  const id = await currentDekId();
  const key = await getDek(id);
  const iv = crypto.getRandomValues(new Uint8Array(12)); // 96 بت عشوائي لكل رسالة
  const params: AesGcmParams = { name: 'AES-GCM', iv: buf(iv) };
  if (context) params.additionalData = buf(enc.encode(context));
  const ct = await crypto.subtle.encrypt(params, key, buf(enc.encode(plaintext)));
  return `v2.${id}.${toB64(iv)}.${toB64(new Uint8Array(ct))}`;
}
 
export async function decrypt(ciphertext: string, context = ''): Promise<string> {
  if (!ciphertext) return '';
  if (!ciphertext.startsWith('v2.')) return legacyDecrypt(ciphertext);
  const [, id, ivB64, ctB64] = ciphertext.split('.');
  if (!id || !ivB64 || !ctB64) throw new Error('صيغة نص مشفّر غير صالحة');
  const key = await getDek(id);
  const params: AesGcmParams = { name: 'AES-GCM', iv: buf(fromB64(ivB64)) };
  if (context) params.additionalData = buf(enc.encode(context));
  // أي تعديل على النص أو الـ IV أو السياق يجعل فك التشفير يفشل (فحص السلامة)
  const pt = await crypto.subtle.decrypt(params, key, buf(fromB64(ctB64)));
  return dec.decode(pt);
}
 
export async function encryptJSON(obj: unknown, context = ''): Promise<string> {
  return encrypt(JSON.stringify(obj), context);
}
 
export async function decryptJSON<T = unknown>(ciphertext: string, context = ''): Promise<T | null> {
  try {
    return JSON.parse(await decrypt(ciphertext, context)) as T;
  } catch {
    return null;
  }
}

export const AESGCM = {
  encrypt,
  decrypt,
  encryptJSON,
  decryptJSON,
};
 
/** فك تشفير الصيغة القديمة (base64(iv+ct) بمفتاح الجهاز في localStorage) لأجل الترحيل فقط */
async function legacyDecrypt(ciphertext: string): Promise<string> {
  const raw =
    typeof localStorage !== 'undefined' ? localStorage.getItem('mirsad_device_key_v2') : null;
  if (!raw) throw new Error('المفتاح القديم غير متاح لفك هذا النص');
  const key = await crypto.subtle.importKey('raw', buf(fromB64(raw)), 'AES-GCM', false, ['decrypt']);
  const all = fromB64(ciphertext);
  const pt = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: buf(all.slice(0, 12)) },
    key,
    buf(all.slice(12))
  );
  return dec.decode(pt);
}
 
/** هل النص الحالي مشفّر بالمفتاح النشط؟ (false للقديم أو لإصدار مفتاح متقاعد) */
export async function isCurrentCiphertext(ciphertext: string): Promise<boolean> {
  if (!ciphertext.startsWith('v2.')) return false;
  return ciphertext.split('.')[1] === (await currentDekId());
}
 
/** فك التشفير ثم إعادته بالمفتاح النشط (يُستدعى على كل سجل بعد التدوير) */
export async function reencrypt(ciphertext: string, context = ''): Promise<string> {
  if (!ciphertext) return '';
  if (await isCurrentCiphertext(ciphertext)) return ciphertext;
  return encrypt(await decrypt(ciphertext, context), context);
}
 
/* ====================== تدوير المفاتيح ====================== */
/**
 * يُنشئ DEK جديداً ويجعله النشط. المفتاح القديم يصبح "retired":
 * يبقى لفك التشفير فقط (النسخ القديمة)، ولا يُستخدم لتشفير أي بيانات جديدة.
 * بعد التدوير شغّل reencrypt على كل السجلات المخزّنة.
 */
export async function rotateDataKey(): Promise<string> {
  await ensureReady();
  const oldId = await currentDekId();
  const n = parseInt(oldId.slice(1), 10) + 1;
  const newId = 'k' + n;
  const w = await newWrappedDek(kekCache!);
  await ksPutIfAbsent({ id: 'dek:' + newId, ...w, status: 'active', createdAt: Date.now() });
 
  const old = (await ksGet('dek:' + oldId)) as Extract<KeyRecord, { wrapped: string }>;
  if (old && old.status !== 'retired') await ksPut({ ...old, status: 'retired' });
  await ksPut({ id: 'meta', activeDek: newId });
  activeDekId = newId;
  return newId;
}
 
/** يدوّر إن تجاوز عمر المفتاح النشط المدة المحددة (الافتراضي 30 يوماً) */
export async function rotateIfDue(maxAgeMs = 30 * 24 * 60 * 60 * 1000): Promise<boolean> {
  const id = await currentDekId();
  const rec = (await ksGet('dek:' + id)) as { createdAt: number } | undefined;
  if (rec && Date.now() - rec.createdAt >= maxAgeMs) {
    await rotateDataKey();
    return true;
  }
  return false;
}
 
/** حالة المفاتيح للعرض/التدقيق (بدون أي مادة مفتاحية) */
export async function getKeyStatus(): Promise<
  { id: string; status: 'active' | 'retired'; createdAt: number }[]
> {
  await ensureReady();
  const out: { id: string; status: 'active' | 'retired'; createdAt: number }[] = [];
  const active = await currentDekId();
  for (let i = 1; i <= parseInt(active.slice(1), 10); i++) {
    const r = (await ksGet('dek:k' + i)) as
      | { status: 'active' | 'retired'; createdAt: number }
      | undefined;
    if (r) out.push({ id: 'k' + i, status: r.status, createdAt: r.createdAt });
  }
  return out;
}
 
/* ====================== توقيع HMAC (للجلسات) ====================== */
export async function signHMAC(data: string): Promise<string> {
  await ensureReady();
  const sig = await crypto.subtle.sign('HMAC', hmacCache!, buf(enc.encode(data)));
  return toHex(new Uint8Array(sig));
}
 
/** تحقق ثابت الزمن عبر crypto.subtle.verify */
export async function verifyHMAC(data: string, sigHex: string): Promise<boolean> {
  await ensureReady();
  try {
    return await crypto.subtle.verify('HMAC', hmacCache!, buf(fromHex(sigHex)), buf(enc.encode(data)));
  } catch {
    return false;
  }
}
 
/* ====================== بصمة الجهاز ====================== */
// تنبيه: بصمة ضعيفة الإنتروبيا، للتنبيه والتدقيق فقط وليست دليل هوية.
export function getDeviceFingerprint(): string {
  if (typeof window === 'undefined') return 'server';
  return [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    navigator.hardwareConcurrency || 0,
  ].join('|');
}
 
/** للاختبارات فقط: تصفير الحالة داخل الذاكرة */
export function __resetKeystoreForTests(): void {
  memStore.clear();
  dekCache.clear();
  kekCache = null;
  hmacCache = null;
  activeDekId = null;
  readyPromise = null;
}
