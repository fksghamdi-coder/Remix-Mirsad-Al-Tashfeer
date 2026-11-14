// src/lib/certificates.ts
// شهادات موثّقة: السجل الرسمي في Firestore (collection: certificates)، بالإضافة إلى دعم الشهادات التحفيزية الأكاديمية.

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { sha256 } from './crypto';
import { findAutomatedCertificateBySealOrId, CertificateManager } from './certificateManager';
import { SyncEngine } from './syncEngine';

void SyncEngine;

export const COURSE = { code: 'ISE243', title: 'التشفير المتقدم والتحليل الأمني' };

export interface CertificateRecord {
  certId: string;
  uid: string;
  studentName: string;
  courseCode: string;
  courseTitle: string;
  scorePercentage: number;
  issuedBy: string;
  issuedAt: Timestamp | null;
  status: 'valid' | 'revoked';
  integrityHash: string;
  revokedAt?: Timestamp | null;
  revokeReason?: string;
}

export interface LocalCertificateRecord {
  certId: string;
  uid: string;
  studentName: string;
  courseCode: string;
  courseTitle: string;
  scorePercentage: number;
  issuedBy: string;
  issuedAt: string;
  status: 'valid' | 'revoked';
  integrityHash: string;
  type: 'academic-motivational';
  disclaimer: string;
  revokedAt?: string;
  revokeReason?: string;
}

const LOCAL_CERTS_KEY = 'mirsad_certificates_v2';

/* ---------- معرّف الشهادة: MIR-XXXX-XXXX-XXXX-XXXX-C (80 بت عشوائية + خانة فحص) ---------- */
const ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'; // Crockford base32 (بلا I L O U)

function checkChar(body: string): string {
  let sum = 0;
  for (let i = 0; i < body.length; i++) sum += (i + 1) * ALPHABET.indexOf(body[i]);
  return ALPHABET[sum % 32];
}

export function generateCertId(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  let body = '';
  for (let i = 0; i < 16; i++) body += ALPHABET[bytes[i] % 32];
  const g = (n: number) => body.slice(n * 4, n * 4 + 4);
  return `MIR-${g(0)}-${g(1)}-${g(2)}-${g(3)}-${checkChar(body)}`;
}

/** يوحّد الإدخال (حالة الأحرف، المسافات، الشرطات، O→0، I/L→1) ويتحقق من الصيغة وخانة الفحص */
export function normalizeCertId(input: string): string | null {
  const up = (input || '').toUpperCase().replace(/\s+/g, '');
  if (!up.startsWith('MIR')) return null;
  const rest = up.slice(3).replace(/-/g, '').replace(/O/g, '0').replace(/[IL]/g, '1');
  if (!/^[0-9A-Z]{17}$/.test(rest)) return null;
  if ([...rest].some((c) => !ALPHABET.includes(c))) return null;
  const body = rest.slice(0, 16);
  if (checkChar(body) !== rest[16]) return null;
  return `MIR-${body.slice(0, 4)}-${body.slice(4, 8)}-${body.slice(8, 12)}-${body.slice(12, 16)}-${rest[16]}`;
}

export async function computeIntegrityHash(c: {
  certId: string;
  uid: string;
  studentName: string;
  courseCode: string;
  scorePercentage: number;
}): Promise<string> {
  return sha256(
    JSON.stringify(['mirsad-cert-v1', c.certId, c.uid, c.studentName, c.courseCode, Number(c.scorePercentage).toFixed(1)])
  );
}

/* ---------- الشهادات التحفيزية الأكاديمية (Local / Hybrid) ---------- */
export async function createCertificate(
  uid: string,
  studentName: string,
  courseCode: string,
  courseTitle: string,
  scorePercentage: number,
  issuedBy: string = 'فريق مِرْصَاد التشفير الأكاديمي'
): Promise<LocalCertificateRecord> {
  const certId = generateCertId();
  const integrityHash = await computeIntegrityHash({
    certId,
    uid,
    studentName,
    courseCode,
    scorePercentage,
  });

  return {
    certId,
    uid,
    studentName,
    courseCode,
    courseTitle,
    scorePercentage,
    issuedBy,
    issuedAt: new Date().toISOString(),
    status: 'valid',
    integrityHash,
    type: 'academic-motivational',
    disclaimer:
      'هذه شهادة إتمام تحفيزية أكاديمية صادرة من مشروع مِرْصَاد التشفير (ISE243 — جامعة الأمير مقرن بن عبدالعزيز) وليست شهادة مهنية أو رسمية معتمدة من جهة حكومية.',
  };
}

export function storeCertificate(cert: LocalCertificateRecord): void {
  try {
    const existing = JSON.parse(localStorage.getItem(LOCAL_CERTS_KEY) || '[]') as LocalCertificateRecord[];
    const idx = existing.findIndex((c) => c.certId === cert.certId);
    if (idx >= 0) existing[idx] = cert;
    else existing.push(cert);
    localStorage.setItem(LOCAL_CERTS_KEY, JSON.stringify(existing));
  } catch {
    /* ignore */
  }
}

export function findCertificateById(certId: string): LocalCertificateRecord | null {
  const normalized = normalizeCertId(certId);
  if (!normalized) return null;
  try {
    const all = JSON.parse(localStorage.getItem(LOCAL_CERTS_KEY) || '[]') as LocalCertificateRecord[];
    return all.find((c) => c.certId === normalized) ?? null;
  } catch {
    return null;
  }
}

export function getCertificatesByUid(uid: string): LocalCertificateRecord[] {
  try {
    const all = JSON.parse(localStorage.getItem(LOCAL_CERTS_KEY) || '[]') as LocalCertificateRecord[];
    return all.filter((c) => c.uid === uid && c.status === 'valid');
  } catch {
    return [];
  }
}

function toTimestamp(isoString: string): Timestamp {
  const date = new Date(isoString);
  return Timestamp.fromDate(isNaN(date.getTime()) ? new Date() : date);
}

/* ---------- التحقق العام ---------- */
export type VerifyResult =
  | { state: 'invalid_format' }
  | { state: 'not_found' }
  | { state: 'unavailable' }
  | { state: 'tampered' }
  | { state: 'revoked'; cert: CertificateRecord }
  | { state: 'valid'; cert: CertificateRecord };

export async function verifyCertificate(input: string): Promise<VerifyResult> {
  const cleanInput = (input || '').trim();

  // فحص الشهادات الرقمية المشفرة المؤتمتة (Mirsad Encrypted Seals)
  if (cleanInput.startsWith('MIRSAD-SEAL-') || cleanInput.startsWith('CERT-')) {
    const auto = findAutomatedCertificateBySealOrId(cleanInput);
    if (auto) {
      const isValid = await CertificateManager.verifySeal(auto.digitalSeal, {
        studentId: auto.studentId,
        studentName: auto.studentName,
        courseId: auto.courseId,
        issueDate: auto.issueDate,
        grade: auto.grade,
      });

      if (!isValid) return { state: 'tampered' };

      return {
        state: 'valid',
        cert: {
          certId: auto.certificateId,
          uid: auto.studentId,
          studentName: auto.studentName,
          courseCode: 'ISE243',
          courseTitle: 'التشفير المتقدم والتحليل الأمني',
          scorePercentage: 100,
          issuedBy: 'نظام مِرْصَاد المؤتمت (Mirsad Encrypted Certification)',
          issuedAt: toTimestamp(auto.issueDate),
          status: 'valid',
          integrityHash: auto.digitalSeal,
        },
      };
    }
  }

  const certId = normalizeCertId(cleanInput);
  if (!certId) return { state: 'invalid_format' };

  // فحص الشهادات التحفيزية المحلية أولاً إن وجدت
  const localCert = findCertificateById(certId);
  if (localCert) {
    const expectedLocal = await computeIntegrityHash(localCert);
    if (expectedLocal !== localCert.integrityHash) return { state: 'tampered' };
    const converted: CertificateRecord = {
      certId: localCert.certId,
      uid: localCert.uid,
      studentName: localCert.studentName,
      courseCode: localCert.courseCode,
      courseTitle: localCert.courseTitle,
      scorePercentage: localCert.scorePercentage,
      issuedBy: localCert.issuedBy,
      issuedAt: toTimestamp(localCert.issuedAt),
      status: localCert.status,
      integrityHash: localCert.integrityHash,
      revokeReason: localCert.revokeReason,
    };
    return converted.status === 'revoked'
      ? { state: 'revoked', cert: converted }
      : { state: 'valid', cert: converted };
  }

  let snap;
  try {
    snap = await getDoc(doc(db, 'certificates', certId));
  } catch {
    return { state: 'unavailable' };
  }
  if (!snap.exists()) return { state: 'not_found' };
  const cert = snap.data() as CertificateRecord;
  if (cert.certId !== certId) return { state: 'tampered' };
  const expected = await computeIntegrityHash(cert);
  if (expected !== cert.integrityHash) return { state: 'tampered' };
  return cert.status === 'revoked' ? { state: 'revoked', cert } : { state: 'valid', cert };
}

/* ---------- شهادات الطالب نفسه ---------- */
export async function getMyCertificates(uid: string): Promise<CertificateRecord[]> {
  const snap = await getDocs(query(collection(db, 'certificates'), where('uid', '==', uid)));
  return snap.docs.map((d) => d.data() as CertificateRecord);
}

/* ---------- للمشرف فقط (تفرضه القواعد) ---------- */
export async function listAllCertificates(): Promise<CertificateRecord[]> {
  const snap = await getDocs(collection(db, 'certificates'));
  return snap.docs
    .map((d) => d.data() as CertificateRecord)
    .sort((a, b) => (b.issuedAt?.toMillis?.() ?? 0) - (a.issuedAt?.toMillis?.() ?? 0));
}

export async function issueCertificate(input: {
  uid: string;
  studentName: string;
  scorePercentage: number;
  issuedBy: string;
}): Promise<{ success: true; certId: string } | { success: false; error: string }> {
  const name = input.studentName.trim();
  const score = Math.round(Number(input.scorePercentage) * 10) / 10;
  if (!input.uid) return { success: false, error: 'الطالب غير محدد' };
  if (name.length < 3 || name.length > 100) return { success: false, error: 'الاسم يجب أن يكون بين 3 و100 حرف' };
  if (!(score >= 0 && score <= 100)) return { success: false, error: 'الدرجة يجب أن تكون بين 0 و100' };

  for (let attempt = 0; attempt < 3; attempt++) {
    const certId = generateCertId();
    const base = { certId, uid: input.uid, studentName: name, courseCode: COURSE.code, scorePercentage: score };
    try {
      await setDoc(doc(db, 'certificates', certId), {
        ...base,
        courseTitle: COURSE.title,
        issuedBy: input.issuedBy,
        issuedAt: serverTimestamp(),
        status: 'valid',
        integrityHash: await computeIntegrityHash(base),
      });
      return { success: true, certId };
    } catch (e) {
      if (attempt === 2) return { success: false, error: 'تعذّر الإصدار: ' + ((e as Error).message || 'خطأ غير معروف') };
    }
  }
  return { success: false, error: 'تعذّر الإصدار' };
}

export async function revokeCertificate(
  certId: string,
  reason: string
): Promise<{ success: boolean; error?: string }> {
  const r = reason.trim();
  if (r.length < 3 || r.length > 300) return { success: false, error: 'سبب الإلغاء مطلوب (3–300 حرف)' };
  try {
    await updateDoc(doc(db, 'certificates', certId), {
      status: 'revoked',
      revokedAt: serverTimestamp(),
      revokeReason: r,
    });
    return { success: true };
  } catch (e) {
    return { success: false, error: (e as Error).message || 'تعذّر الإلغاء' };
  }
}
