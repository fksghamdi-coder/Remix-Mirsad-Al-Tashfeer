// Phase 2 — Simple IndexedDB wrapper
const DB_NAME = 'mirsad_db';
const DB_VERSION = 2;

interface DBStore {
  name: string;
  keyPath?: string;
}

const STORES: DBStore[] = [
  { name: 'progress', keyPath: 'id' },
  { name: 'audit', keyPath: 'id' },
  { name: 'users', keyPath: 'username' },
];

let _db: IDBDatabase | null = null;

async function openDB(): Promise<IDBDatabase> {
  if (_db) return _db;
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const database = req.result;
      for (const store of STORES) {
        if (!database.objectStoreNames.contains(store.name)) {
          database.createObjectStore(store.name, { keyPath: store.keyPath });
        }
      }
    };
    req.onsuccess = () => {
      _db = req.result;
      resolve(_db);
    };
    req.onerror = () => reject(req.error);
  });
}

export const db = {
  async get<T>(key: string): Promise<T | null> {
    try {
      const database = await openDB();
      return new Promise((resolve, reject) => {
        const tx = database.transaction('progress', 'readonly');
        const store = tx.objectStore('progress');
        const req = store.get(key);
        req.onsuccess = () => resolve((req.result as T) || null);
        req.onerror = () => reject(req.error);
      });
    } catch {
      return null;
    }
  },

  async set(key: string, value: unknown): Promise<void> {
    try {
      const database = await openDB();
      return new Promise((resolve, reject) => {
        const tx = database.transaction('progress', 'readwrite');
        const store = tx.objectStore('progress');
        const payload =
          typeof value === 'object' && value !== null
            ? { id: key, ...(value as Record<string, unknown>), updatedAt: Date.now() }
            : { id: key, value, updatedAt: Date.now() };
        const req = store.put(payload);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch {
      /* fallback silently */
    }
  },

  async delete(key: string): Promise<void> {
    try {
      const database = await openDB();
      return new Promise((resolve, reject) => {
        const tx = database.transaction('progress', 'readwrite');
        const store = tx.objectStore('progress');
        const req = store.delete(key);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });
    } catch {
      /* ignore */
    }
  },

  async keys(prefix: string = ''): Promise<string[]> {
    try {
      const database = await openDB();
      return new Promise((resolve, reject) => {
        const tx = database.transaction('progress', 'readonly');
        const store = tx.objectStore('progress');
        const req = store.getAllKeys();
        req.onsuccess = () => {
          const all = (req.result || []) as string[];
          resolve(prefix ? all.filter((k) => String(k).startsWith(prefix)) : all.map(String));
        };
        req.onerror = () => reject(req.error);
      });
    } catch {
      return [];
    }
  },
};

// Utility
export function cn(...classes: (string | boolean | undefined | null | 0)[]): string {
  return classes.filter(Boolean).join(' ');
}
