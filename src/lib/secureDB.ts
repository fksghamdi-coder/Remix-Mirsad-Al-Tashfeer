// src/lib/secureDB.ts
/**
 * طبقة التخزين الآمن (Secure Storage Layer)
 * تضمن سلامة البيانات الأكاديمية (Data Integrity) ومنع التلاعب (Tamper Resistance)
 */

import { openDB as openIdb } from 'idb';
import { encryptJSON, decryptJSON, sha256 } from './encryption';

const SECURE_DB_NAME = 'mirsad-secure-db';
const SECURE_STORE_NAME = 'academic-content';

export const dbPromise =
  typeof window !== 'undefined' && typeof indexedDB !== 'undefined'
    ? openIdb(SECURE_DB_NAME, 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains(SECURE_STORE_NAME)) {
            db.createObjectStore(SECURE_STORE_NAME);
          }
        },
      })
    : Promise.resolve(null as any);

export async function getProtectedContent(
  chapterId: string | number,
  _userCompletedChapters: number[] = []
): Promise<unknown> {
  // ✅ تم إلغاء القفل التسلسلي: جميع الفصول في جميع المقررات متاحة بالكامل للدراسة المباشرة
  const chapterKey = String(chapterId);
  try {
    const db = await dbPromise;
    if (!db) return { unlocked: true, chapterId: chapterKey };
    const content = await db.get(SECURE_STORE_NAME, chapterKey);
    return content ?? { unlocked: true, chapterId: chapterKey };
  } catch {
    return { unlocked: true, chapterId: chapterKey };
  }
}

export async function saveProgress(chapterId: string | number, progressData: any) {
  const db = await dbPromise;
  if (!db) return;
  const chapterKey = String(chapterId);
  // تنقية البيانات قبل الحفظ (Sanitization)
  const sanitizedData = JSON.parse(
    JSON.stringify(progressData).replace(/<script.*?>.*?<\/script>/gi, '')
  );
  await db.put(SECURE_STORE_NAME, sanitizedData, chapterKey);
}

const DB_NAME = 'mirsad_central_v2';
const DB_VERSION = 2;


export type StoreName =
  | 'users'
  | 'security_events'
  | 'user_progress'
  | 'sync_queue'
  | 'audit_chain'
  | 'sessions'
  | 'notifications';

interface StoreConfig {
  name: StoreName;
  keyPath: string;
  autoIncrement?: boolean;
  indexes?: { name: string; keyPath: string; unique?: boolean }[];
}

const STORES: StoreConfig[] = [
  {
    name: 'users',
    keyPath: 'username',
    indexes: [
      { name: 'by_academic_id', keyPath: 'academicIdHash', unique: true },
      { name: 'by_role', keyPath: 'role' },
    ],
  },
  {
    name: 'security_events',
    keyPath: 'id',
    indexes: [
      { name: 'by_timestamp', keyPath: 'timestamp' },
      { name: 'by_severity', keyPath: 'severity' },
      { name: 'by_username', keyPath: 'username' },
    ],
  },
  {
    name: 'user_progress',
    keyPath: 'username',
    indexes: [{ name: 'by_last_visit', keyPath: 'lastVisit' }],
  },
  {
    name: 'sync_queue',
    keyPath: 'id',
    autoIncrement: true,
    indexes: [{ name: 'by_status', keyPath: 'status' }],
  },
  {
    name: 'audit_chain',
    keyPath: 'index',
    indexes: [{ name: 'by_timestamp', keyPath: 'timestamp' }],
  },
  {
    name: 'sessions',
    keyPath: 'token',
    indexes: [{ name: 'by_username', keyPath: 'username' }],
  },
  {
    name: 'notifications',
    keyPath: 'id',
    indexes: [
      { name: 'by_created', keyPath: 'createdAt' },
      { name: 'by_recipient', keyPath: 'recipient' },
    ],
  },
];

let centralDbPromise: Promise<IDBDatabase> | null = null;

export function openDB(): Promise<IDBDatabase> {
  if (centralDbPromise) return centralDbPromise;
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('IndexedDB only in browser'));
  }

  centralDbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      for (const cfg of STORES) {
        if (!db.objectStoreNames.contains(cfg.name)) {
          const store = db.createObjectStore(cfg.name, {
            keyPath: cfg.keyPath,
            autoIncrement: cfg.autoIncrement,
          });
          for (const idx of cfg.indexes || []) {
            store.createIndex(idx.name, idx.keyPath, { unique: idx.unique });
          }
        }
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return centralDbPromise;
}

/* ============ عمليات CRUD ============ */

const inMemoryStores: Record<string, Map<any, any>> = {};

export async function putRecord<T = any>(
  store: StoreName,
  record: T,
  options: { encrypted?: boolean } = {}
): Promise<void> {
  if (typeof window === 'undefined' || typeof indexedDB === 'undefined') {
    if (!inMemoryStores[store]) inMemoryStores[store] = new Map();
    const key = (record as any).id || (record as any).username || (record as any).index || (record as any).token || Date.now();
    inMemoryStores[store].set(key, record);
    return;
  }

  const db = await openDB();

  // تشفير الحقول الحساسة
  let toSave: any = record;
  if (options.encrypted) {
    const encrypted = await encryptJSON(record);
    toSave = {
      ...(record as any),
      __encrypted: true,
      __data: encrypted,
    };
    // إزالة الحقول الأصلية
    const keys = Object.keys(record as any);
    for (const k of keys) {
      if (k !== 'username' && k !== 'id') delete toSave[k];
    }
    toSave.username = (record as any).username;
    toSave.id = (record as any).id;
  }

  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).put(toSave);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function getRecord<T = any>(
  store: StoreName,
  key: IDBValidKey
): Promise<T | null> {
  if (typeof window === 'undefined' || typeof indexedDB === 'undefined') {
    const storeMap = inMemoryStores[store];
    return (storeMap?.get(key) as T) || null;
  }

  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).get(key);
    req.onsuccess = async () => {
      const raw = req.result;
      if (!raw) return resolve(null);
      if (raw.__encrypted) {
        const decrypted = await decryptJSON<T>(raw.__data);
        return resolve(decrypted);
      }
      resolve(raw as T);
    };
    req.onerror = () => reject(req.error);
  });
}

export async function getAllRecords<T = any>(store: StoreName): Promise<T[]> {
  if (typeof window === 'undefined' || typeof indexedDB === 'undefined') {
    const storeMap = inMemoryStores[store];
    return storeMap ? Array.from(storeMap.values()) : [];
  }

  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).getAll();
    req.onsuccess = async () => {
      const raw = req.result as any[];
      const out: T[] = [];
      for (const r of raw) {
        if (r.__encrypted) {
          const decrypted = await decryptJSON<T>(r.__data);
          if (decrypted) out.push(decrypted);
        } else {
          out.push(r as T);
        }
      }
      resolve(out);
    };
    req.onerror = () => reject(req.error);
  });
}

export async function deleteRecord(
  store: StoreName,
  key: IDBValidKey
): Promise<void> {
  if (typeof window === 'undefined' || typeof indexedDB === 'undefined') {
    inMemoryStores[store]?.delete(key);
    return;
  }

  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).delete(key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function clearStore(store: StoreName): Promise<void> {
  if (typeof window === 'undefined' || typeof indexedDB === 'undefined') {
    inMemoryStores[store]?.clear();
    return;
  }

  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).clear();
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

/* ============ سلسلة التدقيق (Hash Chain) ============ */

export interface AuditBlock {
  index: number;
  timestamp: number;
  event: string;
  data: any;
  previousHash: string;
  hash: string;
}

export async function appendAuditBlock(
  event: string,
  data: any
): Promise<AuditBlock> {
  const blocks = await getAllRecords<AuditBlock>('audit_chain');
  const sorted = blocks.sort((a, b) => b.index - a.index);
  const last = sorted[0];
  const previousHash = last?.hash || '0'.repeat(64);
  const index = (last?.index ?? -1) + 1;

  const block: AuditBlock = {
    index,
    timestamp: Date.now(),
    event,
    data,
    previousHash,
    hash: '',
  };

  block.hash = await sha256(
    `${index}|${block.timestamp}|${event}|${JSON.stringify(data)}|${previousHash}`
  );

  await putRecord('audit_chain', block);
  return block;
}

export async function verifyAuditChain(): Promise<{
  valid: boolean;
  brokenAt?: number;
}> {
  const blocks = await getAllRecords<AuditBlock>('audit_chain');
  const sorted = blocks.sort((a, b) => a.index - b.index);

  for (let i = 0; i < sorted.length; i++) {
    const block = sorted[i];
    const expectedHash = await sha256(
      `${block.index}|${block.timestamp}|${block.event}|${JSON.stringify(block.data)}|${block.previousHash}`
    );
    if (block.hash !== expectedHash) {
      return { valid: false, brokenAt: block.index };
    }
    if (i > 0 && block.previousHash !== sorted[i - 1].hash) {
      return { valid: false, brokenAt: block.index };
    }
  }
  return { valid: true };
}

export const secureDB = {
  setItem: putRecord,
  getItem: getRecord,
  removeItem: deleteRecord,
  addAuditLog: async (action: string, description: string, userId: string) => {
    const block = await appendAuditBlock(action, { description, userId });
    return {
      id: String(block.index),
      action: block.event,
      hash: block.hash,
    };
  },
  verifyAuditChain: async () => {
    const res = await verifyAuditChain();
    return res.valid;
  },
};
