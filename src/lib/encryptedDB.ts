// src/lib/encryptedDB.ts
// IndexedDB + تشفير تلقائي للحقول الحساسة

const DB_NAME = 'mirsad_central_db';
const DB_VERSION = 1;

export type StoreName = 'users' | 'security_events' | 'activity_log' | 'sessions';

interface EncryptedDBConfig {
  store: StoreName;
  keyPath: string;
  indexes?: { name: string; keyPath: string; unique?: boolean }[];
}

const STORES: EncryptedDBConfig[] = [
  {
    store: 'users',
    keyPath: 'username',
    indexes: [
      { name: 'by_academic_id', keyPath: 'academicId', unique: false },
      { name: 'by_role', keyPath: 'role' },
    ],
  },
  {
    store: 'security_events',
    keyPath: 'id',
    indexes: [
      { name: 'by_timestamp', keyPath: 'timestamp' },
      { name: 'by_type', keyPath: 'type' },
      { name: 'by_username', keyPath: 'username' },
    ],
  },
  {
    store: 'activity_log',
    keyPath: 'id',
    indexes: [{ name: 'by_timestamp', keyPath: 'timestamp' }],
  },
  {
    store: 'sessions',
    keyPath: 'id',
    indexes: [{ name: 'by_username', keyPath: 'username' }],
  },
];

let dbPromise: Promise<IDBDatabase> | null = null;

export function openDB(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('IndexedDB only in browser'));
  }

  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = () => {
      const db = req.result;
      for (const cfg of STORES) {
        if (!db.objectStoreNames.contains(cfg.store)) {
          const store = db.createObjectStore(cfg.store, { keyPath: cfg.keyPath });
          for (const idx of cfg.indexes || []) {
            store.createIndex(idx.name, idx.keyPath, { unique: idx.unique });
          }
        }
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

  return dbPromise;
}

/** كتابة سجل */
export async function putRecord<T = any>(
  store: StoreName,
  record: T
): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).put(record);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

/** قراءة سجل واحد */
export async function getRecord<T = any>(
  store: StoreName,
  key: IDBValidKey
): Promise<T | null> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).get(key);
    req.onsuccess = () => resolve((req.result as T) || null);
    req.onerror = () => reject(req.error);
  });
}

/** قراءة كل السجلات */
export async function getAllRecords<T = any>(
  store: StoreName
): Promise<T[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).getAll();
    req.onsuccess = () => resolve((req.result as T[]) || []);
    req.onerror = () => reject(req.error);
  });
}

/** حذف سجل */
export async function deleteRecord(
  store: StoreName,
  key: IDBValidKey
): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).delete(key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

/** مسح متجر كامل */
export async function clearStore(store: StoreName): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).clear();
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}
