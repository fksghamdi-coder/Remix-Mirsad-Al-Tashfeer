import { SyncEngine } from './syncEngine';

const OTP_DB_NAME = 'mirsad_otp_db';
const OTP_STORE = 'otps';
export const OTP_TTL_MS = 5 * 60 * 1000;
export const MAX_REQUESTS_PER_HOUR = 3;
export const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
void SyncEngine;

export interface OTPRecord { phone: string; codeHash: string; salt: string; createdAt: number; expiresAt: number; attempts: number; maxAttempts: number; }
interface RateLimitEntry { phone: string; timestamp: number; }

export function generateOTP(length: number = 6): string {
  const digits = '0123456789';
  let otp = '';
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  for (const num of array) otp += digits[num % digits.length];
  return otp;
}

export async function hashOTP(otp: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey('raw', encoder.encode(otp), 'PBKDF2', false, ['deriveBits']);
  const derived = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: encoder.encode(salt), iterations: 100000, hash: 'SHA-256' }, keyMaterial, 256);
  return btoa(String.fromCharCode(...new Uint8Array(derived)));
}

export function checkRateLimit(phone: string): boolean {
  try {
    const requests = JSON.parse(localStorage.getItem('mirsad_otp_rate_limit') || '[]') as RateLimitEntry[];
    const now = Date.now();
    const recent = requests.filter(r => now - r.timestamp < RATE_LIMIT_WINDOW);
    if (recent.length >= MAX_REQUESTS_PER_HOUR) return false;
    recent.push({ phone, timestamp: now });
    localStorage.setItem('mirsad_otp_rate_limit', JSON.stringify(recent));
    return true;
  } catch { return true; }
}

export async function saveOTPSecure(phone: string): Promise<OTPRecord> {
  const otp = generateOTP();
  const salt = btoa(crypto.getRandomValues(new Uint8Array(16)).reduce((acc, val) => acc + val.toString(16).padStart(2, '0'), ''));
  const codeHash = await hashOTP(otp, salt);
  const record: OTPRecord = { phone, codeHash, salt, createdAt: Date.now(), expiresAt: Date.now() + OTP_TTL_MS, attempts: 0, maxAttempts: 3 };
  const request = indexedDB.open(OTP_DB_NAME, 1);
  request.onupgradeneeded = (e) => { const db = (e.target as IDBOpenDBRequest).result; if (!db.objectStoreNames.contains(OTP_STORE)) db.createObjectStore(OTP_STORE, { keyPath: 'phone' }); };
  request.onsuccess = () => { const db = request.result; const tx = db.transaction(OTP_STORE, 'readwrite'); tx.objectStore(OTP_STORE).put(record); };
  return record;
}

export async function verifyOTPSecure(phone: string, enteredOTP: string): Promise<boolean> {
  const request = indexedDB.open(OTP_DB_NAME, 1);
  return new Promise((resolve) => {
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(OTP_STORE, 'readwrite');
      const store = tx.objectStore(OTP_STORE);
      const getReq = store.get(phone);
      getReq.onsuccess = () => {
        const record = getReq.result as OTPRecord | undefined;
        if (!record || Date.now() > record.expiresAt || record.attempts >= record.maxAttempts) { if (record) store.delete(phone); resolve(false); return; }
        hashOTP(enteredOTP, record.salt).then(async (hash) => {
          const updateTx = db.transaction(OTP_STORE, 'readwrite');
          const updateStore = updateTx.objectStore(OTP_STORE);
          if (hash === record.codeHash) { updateStore.delete(phone); resolve(true); }
          else { record.attempts++; updateStore.put(record); resolve(false); }
        });
      };
      getReq.onerror = () => resolve(false);
    };
    request.onerror = () => resolve(false);
  });
}

export function issueSecureOtp(username: string): { code: string; expiresAt: number } {
  const code = generateOTP(6);
  return { code, expiresAt: Date.now() + OTP_TTL_MS };
}

export async function verifySecureOtp(username: string, inputCode: string): Promise<{ valid: boolean; reason?: string }> {
  const valid = await verifyOTPSecure(username, inputCode);
  return { valid };
}
