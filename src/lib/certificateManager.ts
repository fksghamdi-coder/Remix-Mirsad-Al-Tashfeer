/**
 * نظام إصدار الشهادات الأكاديمية الرقمية المشفرة (Mirsad Encrypted Certification)
 * يعتمد على التوقيع الرقمي (Digital Signatures) والتحقق اللحظي.
 */

import { crypto } from './crypto';
import { MirsadInternalBlockchain } from './internalBlockchain';
import { CertificateVerifier } from './CertificateVerifier';
import { SyncEngine } from './syncEngine';

export interface CertificateData {
    studentId: string;
    studentName: string;
    courseId: string;
    issueDate: string;
    grade: string;
    blockchainHash?: string;
}

export interface IssuedCertificateResult extends CertificateData {
    certificateId: string;
    digitalSeal: string;
    verificationUrl: string;
}

export class CertificateManager {
    private static readonly MIRSAD_PUBLIC_KEY = "MIRSAD-ACAD-PUB-2026"; // مفتاح افتراضي

    /**
     * توليد ختم رقمي مشفر للشهادة (Digital Seal)
     */
    static async generateEncryptedSeal(data: CertificateData): Promise<string> {
        const payload = JSON.stringify(data);
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(payload);

        // استخدام SHA-256 لتوليد بصمة فريدة (Hash)
        const hashBuffer = await (window.crypto || crypto).subtle.digest('SHA-256', dataBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        // إضافة الختم الأكاديمي والترميز الزمني
        return `MIRSAD-SEAL-${hashHex.substring(0, 16).toUpperCase()}-${Date.now()}`;
    }

    /**
     * أتمتة إصدار الشهادة عند اكتمال المقرر بنسبة 100%
     */
    static async issueCertificateAutomated(student: any, course: any): Promise<IssuedCertificateResult> {
        const studentProgress = student.progress?.[course.id] ?? 0;
        if (studentProgress < 100) {
            throw new Error("لم يتم إكمال كافة متطلبات المقرر بعد.");
        }

        const certData: CertificateData = {
            studentId: student.id,
            studentName: student.name,
            courseId: course.id,
            issueDate: new Date().toISOString(),
            grade: "Excellent"
        };

        const seal = await this.generateEncryptedSeal(certData);

        const blockHash = await CertificateVerifier.signAndArchiveCertificate({
            ...certData,
            seal,
        });

        const randBuf = new Uint32Array(1);
        if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
            window.crypto.getRandomValues(randBuf);
        }

        return {
            ...certData,
            blockchainHash: blockHash,
            certificateId: `CERT-${randBuf[0].toString(36).toUpperCase()}`,
            digitalSeal: seal,
            verificationUrl: `https://mirsad.academy/verify/${seal}`
        };
    }

    /**
     * التحقق من الختم الرقمي والتأكد من عدم التلاعب
     */
    static async verifySeal(seal: string, data: CertificateData): Promise<boolean> {
        if (!seal.startsWith('MIRSAD-SEAL-')) return false;
        const payload = JSON.stringify(data);
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(payload);

        const hashBuffer = await (window.crypto || crypto).subtle.digest('SHA-256', dataBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        const expectedPrefix = `MIRSAD-SEAL-${hashHex.substring(0, 16).toUpperCase()}-`;

        return seal.startsWith(expectedPrefix);
    }
}

const STORAGE_KEY_PREFIX = 'mirsad_auto_cert_';

export function saveAutomatedCertificate(username: string, cert: IssuedCertificateResult): void {
    if (typeof localStorage === 'undefined') return;
    try {
        localStorage.setItem(`${STORAGE_KEY_PREFIX}${username.toLowerCase()}`, JSON.stringify(cert));
        // Also keep an index for quick verification lookups by seal or id
        localStorage.setItem(`mirsad_seal_idx_${cert.digitalSeal}`, JSON.stringify(cert));
        localStorage.setItem(`mirsad_seal_idx_${cert.certificateId}`, JSON.stringify(cert));
    } catch (e) {
        console.warn('Failed to save automated certificate to localStorage', e);
    }
}

export function getAutomatedCertificate(username: string): IssuedCertificateResult | null {
    if (typeof localStorage === 'undefined') return null;
    try {
        const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${username.toLowerCase()}`);
        return raw ? (JSON.parse(raw) as IssuedCertificateResult) : null;
    } catch {
        return null;
    }
}

export function findAutomatedCertificateBySealOrId(identifier: string): IssuedCertificateResult | null {
    if (typeof localStorage === 'undefined') return null;
    try {
        const clean = identifier.trim();
        const direct = localStorage.getItem(`mirsad_seal_idx_${clean}`);
        if (direct) return JSON.parse(direct) as IssuedCertificateResult;

        // Search through all mirsad_auto_cert_* keys if not found in direct index
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(STORAGE_KEY_PREFIX)) {
                const item = JSON.parse(localStorage.getItem(key) || 'null') as IssuedCertificateResult | null;
                if (item && (item.digitalSeal === clean || item.certificateId === clean)) {
                    return item;
                }
            }
        }
        return null;
    } catch {
        return null;
    }
}
