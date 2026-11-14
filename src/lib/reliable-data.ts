import { dbPromise, getProtectedContent, saveProgress, secureDB } from './secureDB';
import { sha256 } from './encryption';

export async function saveVerifiedRecord(key: string, payload: unknown): Promise<{ checksum: string }> {
  const serialized = JSON.stringify(payload);
  const checksum = await sha256(serialized);
  await saveProgress(key, { payload, checksum, updatedAt: Date.now() });
  return { checksum };
}

export async function loadVerifiedRecord<T = unknown>(key: string): Promise<T | null> {
  const db = await dbPromise;
  if (!db) return null;
  const record = await db.get('academic-content', key);
  if (!record || typeof record !== 'object') return null;
  const serialized = JSON.stringify(record.payload);
  const expected = await sha256(serialized);
  if (record.checksum && expected !== record.checksum) {
    throw new Error('INTEGRITY_VIOLATION: فشل التحقق من سلامة السجل المخزن.');
  }
  return (record.payload as T) ?? null;
}

export { getProtectedContent, saveProgress, secureDB };
