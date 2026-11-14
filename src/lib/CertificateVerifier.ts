// src/lib/CertificateVerifier.ts
import { MirsadInternalBlockchain, CertificateBlock } from './internalBlockchain';

const blockchain = new MirsadInternalBlockchain();

export class CertificateVerifier {
  static async signAndArchiveCertificate(certData: unknown): Promise<string> {
    // التوقيع الرقمي + الأرشفة في البلوكشين الداخلي
    const block: CertificateBlock = blockchain.addCertificateBlock(certData);

    // إرسال البيانات الموقعة للسيرفر للتخزين الدائم
    try {
      await fetch('/api/v1/certificates/archive', {
        method: 'POST',
        body: JSON.stringify({ block, certificate: certData }),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.warn('[CertificateVerifier] Offline archive fallback:', error);
    }

    return block.hash;
  }

  static verifyLocalChain(): boolean {
    return blockchain.verifyChainIntegrity();
  }

  static getArchivedBlocks(): CertificateBlock[] {
    return blockchain.getChain();
  }
}
