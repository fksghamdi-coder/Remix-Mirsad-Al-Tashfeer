import { SyncEngine } from './syncEngine';
import { encrypt, decrypt, signHMAC, verifyHMAC } from './crypto';
import type { UserSession } from './auth';

void SyncEngine;

export const UNIFIED_SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 أيام موحدة
const SECURE_SESSION_KEY = 'mirsad_secure_session_v2';

export interface UnifiedSignedSession {
  v: 2;
  payload: string;
  signature: string;
  expiresAt: number;
}

export async function createUnifiedSession(session: UserSession): Promise<UnifiedSignedSession> {
  const expiresAt = Date.now() + UNIFIED_SESSION_TTL_MS;
  const encryptedPayload = await encrypt(
    JSON.stringify({ session, expiresAt }),
    'mirsad:session:v2'
  );
  const signature = await signHMAC(`${encryptedPayload}.${expiresAt}`);
  const record: UnifiedSignedSession = {
    v: 2,
    payload: encryptedPayload,
    signature,
    expiresAt,
  };
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(SECURE_SESSION_KEY, JSON.stringify(record));
  }
  return record;
}

export async function verifyUnifiedSession(): Promise<UserSession | null> {
  if (typeof localStorage === 'undefined') return null;
  const raw = localStorage.getItem(SECURE_SESSION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as UnifiedSignedSession;
    if (parsed.expiresAt < Date.now()) {
      localStorage.removeItem(SECURE_SESSION_KEY);
      return null;
    }
    const validSig = await verifyHMAC(`${parsed.payload}.${parsed.expiresAt}`, parsed.signature);
    if (!validSig) {
      localStorage.removeItem(SECURE_SESSION_KEY);
      return null;
    }
    const decrypted = JSON.parse(await decrypt(parsed.payload, 'mirsad:session:v2')) as {
      session: UserSession;
      expiresAt: number;
    };
    return decrypted.session;
  } catch {
    localStorage.removeItem(SECURE_SESSION_KEY);
    return null;
  }
}

export function clearUnifiedSession(): void {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(SECURE_SESSION_KEY);
  }
}
