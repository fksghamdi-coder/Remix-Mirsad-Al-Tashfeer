// src/lib/sessionManager.ts
// جلسات موقعة بـ HMAC-SHA256 (RFC 2104) بمفتاح WebCrypto غير قابل للتصدير

import { sha256 } from './encryption';
import { signHMAC, verifyHMAC } from './crypto';
import { SyncEngine } from './syncEngine';

const LEGACY_SECRET_KEY = 'mirsad_jwt_secret';
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 أيام

export interface SessionPayload {
  username: string;
  role: string;
  deviceId: string;
  issuedAt: number;
  expiresAt: number;
}

/* ============ تنظيف أي سر نصي قديم من localStorage ============ */
function purgeLegacySecret(): void {
  try {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      localStorage.removeItem(LEGACY_SECRET_KEY);
    }
  } catch {
    /* ignore */
  }
}

/* ============ إنشاء توقيع HMAC-SHA256 ============ */
async function sign(payload: string): Promise<string> {
  purgeLegacySecret();
  return signHMAC(payload);
}

/* ============ إنشاء توكن ============ */
export async function createSession(
  username: string,
  role: string,
  deviceId: string
): Promise<string> {
  const now = Date.now();
  const payload: SessionPayload = {
    username,
    role,
    deviceId,
    issuedAt: now,
    expiresAt: now + SESSION_DURATION,
  };

  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT', std: 'RFC2104-NCS1' }));
  const body = btoa(JSON.stringify(payload));
  const signature = await sign(`${header}.${body}`);

  return `${header}.${body}.${signature}`;
}

const revokedTokens = new Set<string>();

/* ============ التحقق من توكن بزمن ثابت ============ */
export async function verifySession(
  token: string
): Promise<SessionPayload | null> {
  try {
    if (revokedTokens.has(token)) return null;

    const [header, body, signature] = token.split('.');
    if (!header || !body || !signature) return null;

    const validSig = await verifyHMAC(`${header}.${body}`, signature);
    if (!validSig) return null;

    const payload: SessionPayload = JSON.parse(atob(body));
    if (typeof payload.expiresAt !== 'number' || payload.expiresAt < Date.now()) return null;

    return payload;
  } catch {
    return null;
  }
}

const sessionMemoryStore: Record<string, string> = {};
const TOKEN_STORAGE = 'mirsad_session_token';
const API_TOKEN_STORAGE = 'mirsad_token';

export function storeToken(token: string) {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.setItem(TOKEN_STORAGE, token);
    localStorage.setItem(API_TOKEN_STORAGE, token);
  } else {
    sessionMemoryStore[TOKEN_STORAGE] = token;
    sessionMemoryStore[API_TOKEN_STORAGE] = token;
  }
}

export function getStoredToken(): string | null {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    return (
      localStorage.getItem(TOKEN_STORAGE) ||
      localStorage.getItem(API_TOKEN_STORAGE)
    );
  }
  return (
    sessionMemoryStore[TOKEN_STORAGE] ||
    sessionMemoryStore[API_TOKEN_STORAGE] ||
    null
  );
}

export function clearToken() {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.removeItem(TOKEN_STORAGE);
    localStorage.removeItem(API_TOKEN_STORAGE);
  }
  delete sessionMemoryStore[TOKEN_STORAGE];
  delete sessionMemoryStore[API_TOKEN_STORAGE];
}

/* ============ جلسات الجهاز ============ */
export async function registerSession(
  username: string,
  role: string
): Promise<string> {
  const { getDeviceFingerprint } = await import('./encryption');
  const deviceId = await sha256(getDeviceFingerprint());
  const token = await createSession(username, role, deviceId);
  storeToken(token);

  // حفظ في قاعدة البيانات (لا نُفشل الجلسة إن تعذّر تحميل secureDB أثناء إعادة تشغيل الخادم)
  try {
    const { putRecord } = await import('./secureDB');
    await putRecord('sessions', {
      token,
      username,
      role,
      deviceId,
      issuedAt: Date.now(),
    });
  } catch (e) {
    console.warn('[session] تعذّر حفظ سجل الجلسة', e);
  }

  return token;
}

export async function getActiveSession(): Promise<SessionPayload | null> {
  const token = getStoredToken();
  if (!token) return null;
  return verifySession(token);
}

export const sessionManager = {
  createSession: async (user: { uid: string; email: string; role: string }) => {
    const token = await createSession(user.email, user.role, user.uid);
    return { token, userId: user.uid };
  },
  validateSession: async (token: string) => {
    const payload = await verifySession(token);
    if (!payload) return null;
    return { email: payload.username, role: payload.role };
  },
  destroySession: async (token: string) => {
    revokedTokens.add(token);
    clearToken();
  },
};
