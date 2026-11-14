/**
 * HybridDatabaseEngine.ts
 * المحرك الهجين للبيانات (IndexedDB + AES-256-GCM + PBKDF2 600k + CRDT Vector Clocks + LWW)
 * يدعم التخزين المحلي الآمن والمزامنة الذاتية دون فقدان البيانات.
 */

export interface CRDTRecord<T = any> {
  id: string;
  data: T;
  vectorClock: Record<string, number>;
  timestamp: number;
  nodeId: string;
}

export class HybridDatabaseEngine {
  private dbName = 'MirsadHybridDB';
  private version = 1;
  private db: IDBDatabase | null = null;
  private nodeId: string;
  private masterKey: CryptoKey | null = null;

  constructor() {
    this.nodeId = 'node_' + Math.random().toString(36).substring(2, 9);
  }

  public async init(passphrase: string): Promise<void> {
    this.masterKey = await this.deriveKey(passphrase);
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('encrypted_records')) {
          db.createObjectStore('encrypted_records', { keyPath: 'id' });
        }
      };

      request.onsuccess = (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve();
      };

      request.onerror = () => reject(request.error);
    });
  }

  private async deriveKey(passphrase: string): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const subtle = window.crypto?.subtle || crypto.subtle;
    const keyMaterial = await subtle.importKey(
      'raw',
      encoder.encode(passphrase),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    const salt = encoder.encode('Mirsad_Security_Salt_2025_v4');

    return subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 600000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  public async putRecord<T>(id: string, payload: T): Promise<void> {
    if (!this.db || !this.masterKey) throw new Error('Database not initialized');

    const existingRecord = await this.getRecord<T>(id);
    const vectorClock = existingRecord ? { ...existingRecord.vectorClock } : {};
    vectorClock[this.nodeId] = (vectorClock[this.nodeId] || 0) + 1;

    const record: CRDTRecord<T> = {
      id,
      data: payload,
      vectorClock,
      timestamp: Date.now(),
      nodeId: this.nodeId
    };

    const encoder = new TextEncoder();
    const encodedData = encoder.encode(JSON.stringify(record));
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encryptedContent = await (crypto.subtle || window.crypto.subtle).encrypt(
      {
        name: 'AES-GCM',
        iv,
        additionalData: encoder.encode(id) // AAD
      },
      this.masterKey,
      encodedData
    );

    const storePayload = {
      id,
      iv: Array.from(iv),
      content: Array.from(new Uint8Array(encryptedContent))
    };

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('encrypted_records', 'readwrite');
      const store = tx.objectStore('encrypted_records');
      const request = store.put(storePayload);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  public async getRecord<T>(id: string): Promise<CRDTRecord<T> | null> {
    if (!this.db || !this.masterKey) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction('encrypted_records', 'readonly');
      const store = tx.objectStore('encrypted_records');
      const request = store.get(id);

      request.onsuccess = async () => {
        const item = request.result;
        if (!item) {
          resolve(null);
          return;
        }

        try {
          const iv = new Uint8Array(item.iv);
          const content = new Uint8Array(item.content);
          const encoder = new TextEncoder();

          const decryptedBuffer = await (crypto.subtle || window.crypto.subtle).decrypt(
            {
              name: 'AES-GCM',
              iv,
              additionalData: encoder.encode(id)
            },
            this.masterKey!,
            content
          );

          const decoder = new TextDecoder();
          const record: CRDTRecord<T> = JSON.parse(decoder.decode(decryptedBuffer));
          resolve(record);
        } catch (err) {
          reject(err);
        }
      };

      request.onerror = () => reject(request.error);
    });
  }

  public resolveLWW<T>(recordA: CRDTRecord<T>, recordB: CRDTRecord<T>): CRDTRecord<T> {
    if (recordA.timestamp > recordB.timestamp) return recordA;
    if (recordB.timestamp > recordA.timestamp) return recordB;
    return recordA.nodeId > recordB.nodeId ? recordA : recordB;
  }
}

export const hybridDB = new HybridDatabaseEngine();
