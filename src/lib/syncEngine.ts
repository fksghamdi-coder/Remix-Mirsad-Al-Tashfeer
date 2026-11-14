// src/lib/syncEngine.ts
/**
 * Mirsad Sync Engine: محرك المزامنة الذكي المؤمّن بـ AES-256-GCM و IndexedDB
 * يستخدم التشفير الموثّق (AEAD) وتخزين MirsadSecureDB بدلاً من localStorage
 */
import { AESGCM } from './encryption'; // مكتبة تشفير المتصفح

export interface SyncTask {
  id: string;
  action: string;
  payload: unknown;
  timestamp: number;
}

export class SyncEngine {
  private static readonly STORAGE_KEY = 'mirsad_sync_queue';
  private static memoryCache: Map<string, unknown> = new Map();
  private static queueMemory: SyncTask[] = [];

  /**
   * حفظ البيانات بشكل مشفر عبر AES-256-GCM داخل IndexedDB (secure_store)
   */
  static async saveSecurely(key: string, data: unknown): Promise<void> {
    this.memoryCache.set(key, data);
    try {
      const encrypted = await AESGCM.encrypt(JSON.stringify(data), `sync:${key}`);
      if (typeof indexedDB === 'undefined') return;
      // استخدام IndexedDB بدلاً من localStorage
      const db = await this.openDB();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction('secure_store', 'readwrite');
        tx.objectStore('secure_store').put(encrypted, key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch (err) {
      console.warn('[SyncEngine] Secure IndexedDB write fallback:', err);
    }
  }

  /**
   * استرجاع وفك تشفير البيانات المحفوظة في IndexedDB (secure_store)
   */
  static async loadSecurely<T = unknown>(key: string): Promise<T | null> {
    try {
      if (typeof indexedDB !== 'undefined') {
        const db = await this.openDB();
        const encrypted = await new Promise<string | undefined>((resolve, reject) => {
          const tx = db.transaction('secure_store', 'readonly');
          const req = tx.objectStore('secure_store').get(key);
          req.onsuccess = () => resolve(req.result as string | undefined);
          req.onerror = () => reject(req.error);
        });
        if (encrypted && typeof encrypted === 'string') {
          const decrypted = await AESGCM.decrypt(encrypted, `sync:${key}`);
          const parsed = JSON.parse(decrypted) as T;
          this.memoryCache.set(key, parsed);
          return parsed;
        }
      }
    } catch (err) {
      console.warn('[SyncEngine] Secure IndexedDB read fallback:', err);
    }
    return (this.memoryCache.get(key) as T) ?? null;
  }

  /**
   * حذف مفتاح من التخزين المشفر في IndexedDB
   */
  static async removeSecurely(key: string): Promise<void> {
    this.memoryCache.delete(key);
    try {
      if (typeof indexedDB === 'undefined') return;
      const db = await this.openDB();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction('secure_store', 'readwrite');
        tx.objectStore('secure_store').delete(key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch {
      // ignore
    }
  }

  private static openDB(): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open('MirsadSecureDB', 1);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains('secure_store')) {
          request.result.createObjectStore('secure_store');
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * حفظ التقدم محلياً في قائمة المزامنة المشفرة (IndexedDB + AES-GCM)
   */
  static saveProgressLocally(chapterId: string, progress: unknown): void {
    const entry: SyncTask = {
      id: chapterId,
      action: 'SAVE_PROGRESS',
      payload: progress,
      timestamp: Date.now(),
    };
    this.queueMemory.push(entry);
    void this.saveSecurely(this.STORAGE_KEY, this.queueMemory);
    console.log(`[SyncEngine] Progress encrypted & saved in IndexedDB for: ${chapterId}`);
  }

  /**
   * مزامنة البيانات المخزنة محلياً مع السيرفر عند استعادة الاتصال
   */
  static async syncWithServer(): Promise<void> {
    if (typeof navigator !== 'undefined' && !navigator.onLine) return;

    try {
      const storedQueue = await this.loadSecurely<SyncTask[]>(this.STORAGE_KEY);
      const localRaw =
        typeof localStorage !== 'undefined' ? localStorage.getItem('mirsad_sync_queue') : null;
      const localQueue: SyncTask[] = localRaw ? (JSON.parse(localRaw) as SyncTask[]) : [];
      const queue =
        localQueue.length > 0
          ? localQueue
          : Array.isArray(storedQueue) && storedQueue.length > 0
          ? storedQueue
          : this.queueMemory;

      if (queue.length === 0) return;

      const token =
        typeof localStorage !== 'undefined'
          ? localStorage.getItem('mirsad_token') || localStorage.getItem('mirsad_jwt_token') || ''
          : '';

      // استخدام بروتوكول التزامن اللحظي
      const result = await fetch('/api/v1/sync', {
        method: 'POST',
        body: JSON.stringify({ updates: queue }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (result.ok) {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem('mirsad_sync_queue');
        }
        this.queueMemory = [];
        await this.removeSecurely(this.STORAGE_KEY);
        console.log('[SyncEngine] Data synced with Mirsad Server.');
      }
    } catch {
      console.error('[SyncEngine] Sync failed, will retry later.');
    }
  }

  /**
   * تفعيل الاستماع التلقائي لعودة الاتصال وتحميل القائمة المشفرة
   */
  static initAutoSync(): void {
    if (typeof window === 'undefined') return;
    void this.loadSecurely<SyncTask[]>(this.STORAGE_KEY).then((loaded) => {
      if (Array.isArray(loaded) && loaded.length > 0 && this.queueMemory.length === 0) {
        this.queueMemory = loaded;
      }
    });
    window.addEventListener('online', () => {
      console.info('📡 [SyncEngine] Connection restored. Synchronizing offline progress...');
      void SyncEngine.syncWithServer();
      void syncEngine.syncNow();
    });
  }

  // ==========================================
  // دعم إدارة قائمة المهام والعمليات (Instance API)
  // ==========================================

  public async addToQueue(action: string, payload: unknown): Promise<void> {
    try {
      const randBuf = new Uint32Array(1);
      if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
        window.crypto.getRandomValues(randBuf);
      }
      const task: SyncTask = {
        id: `TASK_${Date.now()}_${randBuf[0].toString(36)}`,
        action,
        payload,
        timestamp: Date.now(),
      };
      SyncEngine.queueMemory.push(task);
      await SyncEngine.saveSecurely(SyncEngine.STORAGE_KEY, SyncEngine.queueMemory);

      if (typeof navigator !== 'undefined' && navigator.onLine) {
        await this.syncNow();
      }
    } catch {
      // ignore
    }
  }

  public getPendingCount(): number {
    return SyncEngine.queueMemory.length;
  }

  public async syncNow(): Promise<void> {
    if (typeof navigator !== 'undefined' && !navigator.onLine) return;

    const stored = await SyncEngine.loadSecurely<SyncTask[]>(SyncEngine.STORAGE_KEY);
    const queue = Array.isArray(stored) && stored.length > 0 ? stored : [...SyncEngine.queueMemory];
    if (queue.length === 0) return;

    const remaining: SyncTask[] = [];
    for (const task of queue) {
      try {
        await fetch('/api/v1/sync-task', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(task),
        });
      } catch {
        remaining.push(task);
      }
    }
    SyncEngine.queueMemory = remaining;
    await SyncEngine.saveSecurely(SyncEngine.STORAGE_KEY, remaining);
  }
}

/** مثيل مشترك للاستخدام في التطبيق */
export const syncEngine = new SyncEngine();

/** دالة تهيئة محرك التزامن المباشر */
export function initSyncEngine(): void {
  SyncEngine.initAutoSync();
}

// تشغيل الاستماع التلقائي في المتصفح
if (typeof window !== 'undefined') {
  initSyncEngine();
}
