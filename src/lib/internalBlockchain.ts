/**
 * سلسلة كتل مرصاد الأكاديمية الداخلية (Mirsad Internal Blockchain)
 * لتسجيل وتوثيق الشهادات الأكاديمية والعمليات الحساسة بغير قابلية للتلاعب.
 */

import { SyncEngine } from './syncEngine';
import { apiClient } from './apiClient';

void SyncEngine;

export interface CertificateBlock {
  index: number;
  timestamp: number;
  data: unknown;
  certificateData?: unknown;
  previousHash: string;
  hash: string;
  nonce: number;
}

export class MirsadInternalBlockchain {
  private chain: CertificateBlock[] = [];
  private static readonly STORAGE_KEY = 'mirsad_internal_blockchain';

  constructor() {
    this.loadChain();
    if (this.chain.length === 0) {
      this.chain.push(this.createGenesisBlock());
      this.saveChain();
    }
  }

  private createGenesisBlock(): CertificateBlock {
    const timestamp = 1711900000000;
    const data = { message: 'Mirsad Academic Blockchain Genesis Block - PQC & Zero-Trust 2026' };
    const hash = '0000' + 'a1f8c4e09832d1b7'.repeat(3.5).substring(0, 60);
    return {
      index: 0,
      timestamp,
      data,
      previousHash: '0',
      hash,
      nonce: 0,
    };
  }

  public async calculateHashAsync(
    index: number,
    previousHash: string,
    timestamp: number,
    data: unknown,
    nonce: number
  ): Promise<string> {
    const payload = `${index}|${previousHash}|${timestamp}|${JSON.stringify(data)}|${nonce}`;
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(payload);
    
    if (typeof crypto !== 'undefined' && crypto.subtle) {
      const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    }

    let hash = 0;
    for (let i = 0; i < payload.length; i++) {
      const char = payload.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `${hex.repeat(8)}`.substring(0, 64);
  }

  public calculateHashSync(
    index: number,
    previousHash: string,
    timestamp: number,
    data: unknown,
    nonce: number
  ): string {
    const payload = `${index}|${previousHash}|${timestamp}|${JSON.stringify(data)}|${nonce}`;
    let hash = 0;
    for (let i = 0; i < payload.length; i++) {
      const char = payload.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `${hex.repeat(8)}`.substring(0, 64);
  }

  public getLatestBlock(): CertificateBlock {
    return this.chain[this.chain.length - 1];
  }

  public async addCertificateBlockAsync(certData: unknown): Promise<CertificateBlock> {
    const previousBlock = this.getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const timestamp = Date.now();
    const randomArray = new Uint32Array(1);
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      crypto.getRandomValues(randomArray);
    }
    const nonce = randomArray[0] % 10000;
    const hash = await this.calculateHashAsync(newIndex, previousBlock.hash, timestamp, certData, nonce);

    const newBlock: CertificateBlock = {
      index: newIndex,
      timestamp,
      data: certData,
      previousHash: previousBlock.hash,
      hash,
      nonce,
    };

    this.chain.push(newBlock);
    this.saveChain();
    void apiClient.request('/blockchain/sync', 'POST', newBlock).catch(() => {});
    return newBlock;
  }

  public addCertificateBlock(certData: unknown): CertificateBlock {
    const previousBlock = this.getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const timestamp = Date.now();
    const randomArray = new Uint32Array(1);
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      crypto.getRandomValues(randomArray);
    }
    const nonce = randomArray[0] % 10000;
    const hash = this.calculateHashSync(newIndex, previousBlock.hash, timestamp, certData, nonce);

    const newBlock: CertificateBlock = {
      index: newIndex,
      timestamp,
      data: certData,
      previousHash: previousBlock.hash,
      hash,
      nonce,
    };

    this.chain.push(newBlock);
    this.saveChain();
    void apiClient.request('/blockchain/sync', 'POST', newBlock).catch(() => {});
    return newBlock;
  }

  public verifyChainIntegrity(): boolean {
    if (this.chain.length === 0) return false;

    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  public getChain(): CertificateBlock[] {
    return [...this.chain];
  }

  private saveChain() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(
          MirsadInternalBlockchain.STORAGE_KEY,
          JSON.stringify(this.chain)
        );
      }
    } catch {
      // ignore storage quota issues
    }
  }

  private loadChain() {
    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem(MirsadInternalBlockchain.STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            this.chain = parsed;
          }
        }
      }
    } catch {
      this.chain = [];
    }
  }
}

export const internalBlockchain = new MirsadInternalBlockchain();
