/**
 * Backup Manager with Dual-Layer AES-256-GCM + PBKDF2-HMAC-SHA256 (600,000 iterations)
 * Aligned with NCA National Cryptographic Standards (NCS-1:2020) & NIST SP 800-132
 */

import { PBKDF2_ITERATIONS } from './crypto';
import { SyncEngine } from './syncEngine';

export interface BackupData {
  version: string;
  timestamp: string;
  appName: string;
  items: Record<string, string>;
}

const BACKUP_AAD = 'MIRSAD_ENCRYPTED_BACKUP_V2';
const EXCLUDED_KEYS = new Set([
  'mirsad_jwt_secret',
  'mirsad_session_token',
  'mirsad_session_v3',
  'mirsad_otp_v1',
]);

// Convert password string into CryptoKey using PBKDF2-HMAC-SHA256
async function getKeyFromPassword(
  password: string,
  salt: Uint8Array,
  iterations = PBKDF2_ITERATIONS
): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password.normalize('NFKC')),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt as unknown as BufferSource,
      iterations,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Exports all relevant localStorage items as an AES-256-GCM + AAD encrypted string file format
 */
export async function exportEncryptedBackup(password: string): Promise<string> {
  if (!password || password.length < 4) {
    throw new Error('كلمة المرور يجب أن تكون 4 أحرف على الأقل.');
  }

  // Collect localStorage items excluding ephemeral session/OTP secrets
  const items: Record<string, string> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && !EXCLUDED_KEYS.has(key)) {
      const val = localStorage.getItem(key);
      if (val !== null) {
        items[key] = val;
      }
    }
  }

  const payload: BackupData = {
    version: '2.1.0',
    timestamp: new Date().toISOString(),
    appName: 'MIRSAD_CYBERSECURITY',
    items,
  };

  const payloadJson = JSON.stringify(payload);
  const enc = new TextEncoder();
  const data = enc.encode(payloadJson);
  const aadBytes = enc.encode(BACKUP_AAD);

  // Generate 128-bit random salt and 96-bit IV (NIST SP 800-38D)
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const key = await getKeyFromPassword(password, salt, PBKDF2_ITERATIONS);
  const encrypted = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv as unknown as BufferSource,
      additionalData: aadBytes as unknown as BufferSource,
      tagLength: 128,
    },
    key,
    data
  );

  const bundle = {
    salt: Array.from(salt),
    iv: Array.from(iv),
    cipherText: Array.from(new Uint8Array(encrypted)),
    iterations: PBKDF2_ITERATIONS,
    kdf: 'PBKDF2-HMAC-SHA256',
    cipher: 'AES-256-GCM',
    aad: BACKUP_AAD,
    header: 'MIRSAD_ENCRYPTED_BACKUP',
  };

  return JSON.stringify(bundle, null, 2);
}

/**
 * Validates and restores an encrypted backup file using the password
 */
export async function importEncryptedBackup(
  backupFileContent: string,
  password: string
): Promise<{ success: boolean; restoredCount: number; error?: string }> {
  try {
    if (!password) {
      return { success: false, restoredCount: 0, error: 'كلمة المرور مطلوبة لفك التشفير.' };
    }

    const bundle = JSON.parse(backupFileContent);
    if (!bundle || bundle.header !== 'MIRSAD_ENCRYPTED_BACKUP') {
      return { success: false, restoredCount: 0, error: 'تنسيق ملف النسخ الاحتياطي غير مدعوم أو غير صالح.' };
    }

    const salt = new Uint8Array(bundle.salt);
    const iv = new Uint8Array(bundle.iv);
    const cipherText = new Uint8Array(bundle.cipherText);
    const iterations = typeof bundle.iterations === 'number' ? bundle.iterations : 100000;
    const enc = new TextEncoder();

    const key = await getKeyFromPassword(password, salt, iterations);

    let decrypted: ArrayBuffer;
    if (bundle.aad) {
      decrypted = await crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: iv as unknown as BufferSource,
          additionalData: enc.encode(String(bundle.aad)) as unknown as BufferSource,
          tagLength: 128,
        },
        key,
        cipherText as unknown as BufferSource
      );
    } else {
      decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: iv as unknown as BufferSource },
        key,
        cipherText as unknown as BufferSource
      );
    }

    const dec = new TextDecoder();
    const jsonStr = dec.decode(decrypted);
    const backupData: BackupData = JSON.parse(jsonStr);

    if (!backupData || !backupData.items || typeof backupData.items !== 'object') {
      return { success: false, restoredCount: 0, error: 'البيانات المفكوكة غير متوافقة مع هيكلية المنصة.' };
    }

    // Restore to localStorage (excluding session/secret keys)
    let count = 0;
    Object.entries(backupData.items).forEach(([key, val]) => {
      if (!EXCLUDED_KEYS.has(key)) {
        localStorage.setItem(key, val);
        count++;
      }
    });

    return { success: true, restoredCount: count };
  } catch (err: any) {
    console.error('Import backup error:', err);
    return {
      success: false,
      restoredCount: 0,
      error: 'فشل فك التشفير. كلمة المرور غير صحيحة أو الملف تالف.',
    };
  }
}

/**
 * Validates basic backup schema
 */
export function validateBackupSchema(data: any): boolean {
  return (
    typeof data === 'object' &&
    data !== null &&
    (data.header === 'MIRSAD_ENCRYPTED_BACKUP' || (data.version && data.items))
  );
}
