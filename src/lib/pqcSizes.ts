// src/lib/pqcSizes.ts
// أحجام المفاتيح والتواقيع والنصوص المشفّرة. أحجام ما بعد الكم تُحسب من معاملات المعايير
// (FIPS 203/204/205) بدل كتابتها يدوياً، وتُختبر مقابل القيم المنشورة في tests/pqc-sizes.test.mjs.
// الأحجام الكلاسيكية ثوابت من RFC 7748/8032 وSEC1 وSP 800-57. كل الأحجام بالبايت.

const bitlen = (n: number) => Math.floor(Math.log2(n)) + 1;

export type Category = 1 | 2 | 3 | 5 | null;

export interface KemScheme {
  id: string;
  name: string;
  family: 'classical' | 'pqc' | 'hybrid';
  standard: string;
  /** المفتاح العام / حصة العميل */
  publicKey: number;
  privateKey: number;
  /** النص المغلّف (KEM) أو حصة الخادم (تبادل مفاتيح) */
  ciphertext: number;
  sharedSecret: number;
  category: Category;
  /** مستوى الأمان الكلاسيكي التقريبي بالبت (للكلاسيكي فقط) */
  classicalBits?: number;
  quantumSafe: boolean;
}

export interface SigScheme {
  id: string;
  name: string;
  family: 'classical' | 'pqc';
  standard: string;
  publicKey: number;
  privateKey: number;
  signature: number;
  category: Category;
  classicalBits?: number;
  quantumSafe: boolean;
  note?: string;
}

/* ---------------- ML-KEM (FIPS 203) ---------------- */
const mlkem = (k: number, du: number, dv: number, category: Category): Omit<KemScheme, 'id' | 'name'> => ({
  family: 'pqc',
  standard: 'FIPS 203',
  publicKey: 384 * k + 32,
  privateKey: 768 * k + 96,
  ciphertext: 32 * (du * k + dv),
  sharedSecret: 32,
  category,
  quantumSafe: true,
});

/* ---------------- ML-DSA (FIPS 204) ---------------- */
const mldsa = (
  k: number, l: number, eta: number, gamma1Bits: number, omega: number, lambda: number, category: Category
): Omit<SigScheme, 'id' | 'name'> => ({
  family: 'pqc',
  standard: 'FIPS 204',
  publicKey: 32 + 32 * k * (bitlen(8380416) - 13), // q-1 = 8380416 → 23 بت، d = 13
  privateKey: 32 + 32 + 64 + 32 * ((k + l) * bitlen(2 * eta) + 13 * k),
  signature: lambda / 4 + 32 * l * (1 + gamma1Bits) + omega + k,
  category,
  quantumSafe: true,
});

/* ---------------- SLH-DSA (FIPS 205) ---------------- */
const slhdsa = (
  n: number, h: number, d: number, a: number, k: number, category: Category
): Omit<SigScheme, 'id' | 'name'> => {
  const len = 2 * n + 3; // w = 16
  return {
    family: 'pqc',
    standard: 'FIPS 205',
    publicKey: 2 * n,
    privateKey: 4 * n,
    signature: n * (1 + k * (a + 1) + h + d * len),
    category,
    quantumSafe: true,
  };
};

export const KEM_SCHEMES: KemScheme[] = [
  { id: 'x25519', name: 'X25519 (ECDH)', family: 'classical', standard: 'RFC 7748', publicKey: 32, privateKey: 32, ciphertext: 32, sharedSecret: 32, category: null, classicalBits: 128, quantumSafe: false },
  { id: 'p256-ecdh', name: 'ECDH P-256', family: 'classical', standard: 'SEC 1 / SP 800-186', publicKey: 65, privateKey: 32, ciphertext: 65, sharedSecret: 32, category: null, classicalBits: 128, quantumSafe: false },
  { id: 'rsa2048-kem', name: 'RSA-2048 (نقل المفتاح)', family: 'classical', standard: 'PKCS #1', publicKey: 256, privateKey: 256, ciphertext: 256, sharedSecret: 32, category: null, classicalBits: 112, quantumSafe: false },
  { id: 'mlkem512', name: 'ML-KEM-512', ...mlkem(2, 10, 4, 1) },
  { id: 'mlkem768', name: 'ML-KEM-768', ...mlkem(3, 10, 4, 3) },
  { id: 'mlkem1024', name: 'ML-KEM-1024', ...mlkem(4, 11, 5, 5) },
  // هجين: مجموع حجمي المكوّنين (يضيف TLS ترويسة صغيرة لكل مجموعة، تُهمَل هنا)
  { id: 'x25519-mlkem768', name: 'X25519 + ML-KEM-768 (هجين)', family: 'hybrid', standard: 'IETF TLS (هجين)', publicKey: 32 + 1184, privateKey: 32 + 2400, ciphertext: 32 + 1088, sharedSecret: 64, category: 3, quantumSafe: true },
];

export const SIG_SCHEMES: SigScheme[] = [
  { id: 'ed25519', name: 'Ed25519', family: 'classical', standard: 'RFC 8032', publicKey: 32, privateKey: 32, signature: 64, category: null, classicalBits: 128, quantumSafe: false },
  { id: 'ecdsa-p256', name: 'ECDSA P-256', family: 'classical', standard: 'FIPS 186-5', publicKey: 65, privateKey: 32, signature: 64, category: null, classicalBits: 128, quantumSafe: false, note: 'التوقيع الخام r‖s؛ ترميز DER يزيده بضعة بايتات' },
  { id: 'rsa2048', name: 'RSA-2048', family: 'classical', standard: 'FIPS 186-5', publicKey: 256, privateKey: 256, signature: 256, category: null, classicalBits: 112, quantumSafe: false, note: 'المفتاح العام: المقياس فقط (بدون الأس)' },
  { id: 'mldsa44', name: 'ML-DSA-44', ...mldsa(4, 4, 2, 17, 80, 128, 2) },
  { id: 'mldsa65', name: 'ML-DSA-65', ...mldsa(6, 5, 4, 19, 55, 192, 3) },
  { id: 'mldsa87', name: 'ML-DSA-87', ...mldsa(8, 7, 2, 19, 75, 256, 5) },
  { id: 'slh128s', name: 'SLH-DSA-128s', ...slhdsa(16, 63, 7, 12, 14, 1) },
  { id: 'slh128f', name: 'SLH-DSA-128f', ...slhdsa(16, 66, 22, 6, 33, 1) },
  { id: 'slh192s', name: 'SLH-DSA-192s', ...slhdsa(24, 63, 7, 14, 17, 3) },
  { id: 'slh192f', name: 'SLH-DSA-192f', ...slhdsa(24, 66, 22, 8, 33, 3) },
  { id: 'slh256s', name: 'SLH-DSA-256s', ...slhdsa(32, 64, 8, 14, 22, 5) },
  { id: 'slh256f', name: 'SLH-DSA-256f', ...slhdsa(32, 68, 17, 9, 35, 5) },
];

export const getKem = (id: string) => KEM_SCHEMES.find((s) => s.id === id)!;
export const getSig = (id: string) => SIG_SCHEMES.find((s) => s.id === id)!;

/* ---------------- محاكي حمل المصافحة ---------------- */
export const TCP_MSS = 1460; // بايت (إيثرنت/IPv4 دون خيارات)
/** الحد الأعلى للنافذة الابتدائية وفق RFC 6928 (تجريبي): min(10×MSS, max(2×MSS, 14600)) */
export const initialWindowBytes = (mss: number) => Math.min(10 * mss, Math.max(2 * mss, 14600));

export interface HandshakeEstimate {
  clientKeyShare: number;
  serverKeyShare: number;
  signatures: number;
  publicKeys: number;
  serverFlight: number;
  total: number;
  /** عدد جولات الذهاب والإياب اللازمة لإيصال رحلة الخادم مع نافذة بدء بطيء مضاعِفة */
  serverFlightRounds: number;
  fitsInitialWindow: boolean;
}

/**
 * تقدير مجموع بايتات المفاتيح والتواقيع في مصافحة (بلا ترويسات البروتوكول وبيانات الشهادة الأخرى):
 *  - حصة مفتاح العميل (في ClientHello) + حصة الخادم
 *  - سلسلة من c شهادة: c مفتاح عام، و(c + 1) توقيعاً (توقيع كل شهادة + CertificateVerify)
 */
export function estimateHandshake(kemId: string, sigId: string, chainLength: number, mss = TCP_MSS): HandshakeEstimate {
  const kem = getKem(kemId);
  const sig = getSig(sigId);
  const c = Math.max(1, Math.min(5, Math.floor(chainLength)));
  const signatures = (c + 1) * sig.signature;
  const publicKeys = c * sig.publicKey;
  const serverFlight = kem.ciphertext + signatures + publicKeys;
  const total = kem.publicKey + serverFlight;

  // بدء بطيء: تبدأ النافذة بالحد الابتدائي ثم تتضاعف كل جولة (تبسيط: بلا فقدان ولا ACK متأخر)
  let rounds = 0;
  let sent = 0;
  let cwnd = initialWindowBytes(mss);
  while (sent < serverFlight) {
    sent += cwnd;
    cwnd *= 2;
    rounds++;
  }
  return {
    clientKeyShare: kem.publicKey,
    serverKeyShare: kem.ciphertext,
    signatures,
    publicKeys,
    serverFlight,
    total,
    serverFlightRounds: rounds,
    fitsInitialWindow: serverFlight <= initialWindowBytes(mss),
  };
}
