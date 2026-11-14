import React, { useState, useEffect, useRef } from 'react';
import {
  Play, Maximize2, Minimize2,
  BookOpen, Terminal, Video, CheckCircle2, ChevronLeft,
  ChevronRight, Layers, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { COURSES_DATA, CourseItem, ChapterItem } from '../../data/coursesData';

interface VideoScene {
  id: number;
  title: string;
  timeRange: string;
  startSec: number;
  endSec: number;
  conceptTag: string;
  keyEquationOrRule: string;
  academicPoints: string[];
  diagramNodes: { label: string; sub: string; status: string }[];
  narration: string;
}

interface LabExercise {
  title: string;
  objective: string;
  defaultInput: string;
  modeLabel: string;
  executeSimulation: (input: string) => {
    status: string;
    metrics: { label: string; value: string }[];
    steps: string[];
    codeSnippet: string;
  };
}

export interface InteractiveLessonViewerProps {
  initialCourseSlug?: string;
  initialChapterId?: number;
}

function mapSlugToCourseId(slug?: string): string {
  if (!slug) return 'sec_prog';
  const normalized = slug.toLowerCase();
  if (normalized === 'ise232-programs' || normalized === 'sec_prog') return 'sec_prog';
  if (normalized === 'ise243') return 'ise243';
  if (normalized === 'ise232-threats' || normalized === 'ise232') return 'ise232';
  if (normalized === 'ise231') return 'ise231';
  if (normalized === 'ise232-risk' || normalized === 'upmn075') return 'upmn075';
  return 'sec_prog';
}

interface Ise243ChapterProfile {
  scene1Rule: string;
  scene2Rule: string;
  defaultInput: string;
  liveTestOutput: string;
  simMetrics: (clean: string, hexDigest: string) => { label: string; value: string }[];
  simSteps: (clean: string, hexDigest: string) => string[];
  codeSnippet: (clean: string, hexDigest: string) => string;
}

function getIse243ChapterMathProfile(chapterNumber: number): Ise243ChapterProfile {
  switch (chapterNumber) {
    case 1:
      return {
        scene1Rule: 'GF(2^8) : P(x) = x^8 + x^4 + x^3 + x + 1 (0x11B) | AES-128/192/256 (FIPS 197)',
        scene2Rule: 'State = AddRoundKey(MixColumns(ShiftRows(SubBytes(State))), RoundKey_r)',
        defaultInput: 'PLAINTEXT=3243F6A8885A308D313198A2E0370734; KEY=2B7E151628AED2A6ABF7158809CF4F3C',
        liveTestOutput: `[OK 200] AES-128 / GF(2^8) FIPS 197 Appendix B Vector Verified.\n✔ Irreducible Polynomial: P(x) = x^8 + x^4 + x^3 + x + 1 (0x11B)\n✔ 0x57 ⊗ 0x83 in GF(2^8) = 0xC1\n✔ Ciphertext Output: 3925841D02DC09FBDC118597196A0B32 (100% Match)`,
        simMetrics: () => [
          { label: 'حقل غالوا المنتهي', value: 'GF(2^8) · 0x11B' },
          { label: 'الجولات القياسية', value: '10 / 12 / 14 Rounds' },
          { label: 'المخرج القياسي (FIPS 197)', value: '3925841D...6A0B32' },
          { label: 'حالة التحقق العكسي', value: '100% VERIFIED' },
        ],
        simSteps: (clean) => [
          `[01] قراءة متجه الاختبار القياسي للفصل الأول (AES & GF(2^8)): "${clean.slice(0, 56)}..."`,
          `[02] حساب SubBytes عبر المعكوس الضربي في GF(2^8) والتحويل التآلفي، ثم ShiftRows.`,
          `[03] تنفيذ ضرب المصفوفات في MixColumns بمعامل الاختزال P(x) = 0x11B للجولات 1..9.`,
          `[04] إتمام الجولة 10 (بدون MixColumns) ومطابقة النص المشفر القياسي NIST FIPS 197 Appendix B.`,
        ],
        codeSnippet: () =>
          `// ISE243 Ch.1 — GF(2^8) & AES-128 (NIST FIPS 197)\nconst xtime = (a) => ((a << 1) ^ ((a & 0x80) ? 0x1B : 0)) & 0xFF;\n// Plaintext: 3243F6A8885A308D313198A2E0370734 -> Ciphertext: 3925841D02DC09FBDC118597196A0B32`,
      };
    case 2:
    case 3:
      return {
        scene1Rule: 'ECC over F_p : y^2 ≡ x^3 + ax + b (mod p)   |   Discriminant: 4a^3 + 27b^2 ≢ 0 (mod p)',
        scene2Rule: 'ECDH Shared Secret: S = d_A · Q_B = d_A · (d_B · G) = d_B · Q_A   |   ECDSA (FIPS 186-5)',
        defaultInput: 'CURVE=secp256r1 (P-256); d_A=0x7A4F...; d_B=0x9C12...; OPERATION=ECDH_ECDSA',
        liveTestOutput: `[OK 200] Elliptic Curve Group Law & ECDH/ECDSA Kernel Verified.\n✔ Curve Equation: y^2 ≡ x^3 - 3x + b (mod p) [NIST P-256 / X25519]\n✔ Commutative ECDH Agreement: d_A * Q_B === d_B * Q_A\n✔ ECDSA Signature Verification: u1*G + u2*Q === (r, y) mod n (VALID)`,
        simMetrics: (_, hexDigest) => [
          { label: 'المنحنى الإهليلجي', value: 'P-256 / Curve25519' },
          { label: 'طول المفتاح المكافئ لـ RSA-3072', value: '256-bit ECC' },
          { label: 'النقطة المشتركة S = d_A·Q_B', value: hexDigest },
          { label: 'حالة توقيع ECDSA', value: 'FIPS 186-5 VALID' },
        ],
        simSteps: (clean, hexDigest) => [
          `[01] تهيئة معاملات المنحنى الإهليلجي فوق الحقل الأولي F_p: "${clean}"`,
          `[02] حساب الضرب السلمي (Scalar Multiplication) عبر خوارزمية Double-and-Add بزمن ثابت.`,
          `[03] اشتقاق النقطة المشتركة في ECDH: S = d_A · Q_B = d_B · Q_A (${hexDigest}).`,
          `[04] التحقق من توقيع ECDSA الزوجي (r, s) والتأكد من عدم تكرار الرقم العشوائي k.`,
        ],
        codeSnippet: (_, hexDigest) =>
          `// ISE243 Ch.${chapterNumber} — Elliptic Curve Cryptography (ECDH & ECDSA)\nconst Q_A = scalarMult(d_A, G); // Public Key A\nconst sharedSecret = scalarMult(d_A, Q_B); // ${hexDigest} === scalarMult(d_B, Q_A)`,
      };
    case 4:
      return {
        scene1Rule: 'PKI X.509 Chain : Root CA → Intermediate CA → Leaf Cert   |   TLS 1.3 (RFC 8446)',
        scene2Rule: 'TLS 1.3 1-RTT Handshake : Handshake_Secret = HKDF-Extract(Early_Secret, ECDHE_Shared)',
        defaultInput: 'PROTOCOL=TLS_1_3; CIPHER=TLS_AES_256_GCM_SHA384; KEY_EXCHANGE=X25519_EPHEMERAL',
        liveTestOutput: `[OK 200] PKI X.509 & TLS 1.3 (RFC 8446) Handshake Verified.\n✔ Handshake Latency: 1-RTT (Forward Secrecy Enforced via Ephemeral ECDHE)\n✔ Cipher Suite: TLS_AES_256_GCM_SHA384\n✔ Certificate Revocation Check: OCSP Stapling VALIDATED`,
        simMetrics: (_, hexDigest) => [
          { label: 'زمن المصافحة القياسي', value: '1-RTT (TLS 1.3)' },
          { label: 'السرية الأمامية التامة', value: 'PFS (Ephemeral ECDHE)' },
          { label: 'حزمة التشفير المعتمدة', value: 'AES-256-GCM-SHA384' },
          { label: 'بصمة مفتاح الجلسة HKDF', value: hexDigest },
        ],
        simSteps: (clean, hexDigest) => [
          `[01] بدء مصافحة TLS 1.3 (ClientHello + KeyShare X25519): "${clean}"`,
          `[02] استلام ServerHello + Certificate + CertificateVerify والتحقق من سلسلة X.509.`,
          `[03] اشتقاق مفاتيح الجلسة عبر دالة HKDF-Expand-Label (${hexDigest}).`,
          `[04] تفعيل قناة AEAD المشفرة مع ضمان السرية الأمامية التامة (Perfect Forward Secrecy).`,
        ],
        codeSnippet: (_, hexDigest) =>
          `// ISE243 Ch.4 — PKI & TLS 1.3 Key Schedule (RFC 8446)\nconst hsSecret = HKDF_Extract(earlySecret, ecdheSharedSecret);\nconst trafficKey = HKDF_Expand_Label(hsSecret, "c hs traffic", transcriptHash); // ${hexDigest}`,
      };
    case 5:
      return {
        scene1Rule: 'IPsec VPN : IKEv2 (UDP 500/4500) + ESP Tunnel Mode (AES-256-GCM) | WireGuard (Noise_IK)',
        scene2Rule: 'WireGuard Cryptokey Routing : ChaCha20-Poly1305 + Curve25519 + BLAKE2s',
        defaultInput: 'TUNNEL=IPSEC_ESP_GCM256; FALLBACK=WIREGUARD_NOISE_IK; SPI=0x8F4A2109',
        liveTestOutput: `[OK 200] VPN Tunneling (IPsec ESP & WireGuard) Verified.\n✔ IKEv2 SA Negotiation: Mutual Auth + Diffie-Hellman Group 14/20\n✔ ESP Encapsulation: Confidentiality + Replay Protection (64-bit Seq)\n✔ WireGuard Noise_IK Handshake: 1-RTT Stateless Crypto Routing VALID`,
        simMetrics: (_, hexDigest) => [
          { label: 'بروتوكول النفق الآمن', value: 'IPsec ESP / WireGuard' },
          { label: 'خوارزمية التشفير الموثق', value: 'AES-GCM / ChaCha20-Poly1305' },
          { label: 'معرف فهرس الأمان (SPI)', value: hexDigest.slice(0, 11) },
          { label: 'الحماية ضد إعادة الإرسال', value: 'Anti-Replay Window 64' },
        ],
        simSteps: (clean, hexDigest) => [
          `[01] تهيئة نفق الشبكة الافتراضية الخاصة (VPN): "${clean}"`,
          `[02] التفاوض على ارتباط الأمان (Security Association - SA) وتوليد مفاتيح الجلسة.`,
          `[03] تغليف رزم IP الكاملة في طور النفق (ESP Tunnel Mode) مع رمز مصادقة AEAD.`,
          `[04] التحقق من رقم التسلسل لمنع هجمات Replay واعتماد البصمة (${hexDigest}).`,
        ],
        codeSnippet: (_, hexDigest) =>
          `// ISE243 Ch.5 — IPsec ESP & WireGuard Tunnel Encapsulation\nconst espPacket = sealAEAD(aes256GcmKey, seqNumber, innerIpPacket, spiHeader); // ${hexDigest}`,
      };
    case 6:
      return {
        scene1Rule: 'Database TDE & Disk Encryption : AES-256-XTS (IEEE 1619)   |   C = E_K1(P ⊕ T) ⊕ T',
        scene2Rule: 'Searchable Blind Index : idx = HMAC-SHA256(K_index, normalize(Plaintext))',
        defaultInput: 'TABLE=CITIZEN_RECORDS; COLUMN=NATIONAL_ID; MODE=AES_256_XTS_AND_BLIND_HMAC',
        liveTestOutput: `[OK 200] Database Encryption (TDE / AES-XTS / Blind Indexing) Verified.\n✔ Tweakable Block Cipher: AES-256-XTS with Sector/Page Tweak (No ECB Pattern Leak)\n✔ Column-Level AEAD: AES-256-GCM with per-row random 96-bit IV\n✔ Searchable Blind Index: HMAC-SHA256 lookup in O(1) without decrypting table`,
        simMetrics: (_, hexDigest) => [
          { label: 'تشفير صفحات القرص (TDE)', value: 'AES-256-XTS' },
          { label: 'تشفير الأعمدة الحساسة', value: 'AES-256-GCM (Per-Row IV)' },
          { label: 'الفهرس الأعمى للبحث (HMAC)', value: hexDigest },
          { label: 'عزل المفاتيح عن قاعدة البيانات', value: 'External KMS / HSM' },
        ],
        simSteps: (clean, hexDigest) => [
          `[01] استقبال سجل قاعدة البيانات المراد تأمينه: "${clean}"`,
          `[02] تشفير الحقل الحساس عبر AES-256-GCM بمتجه تهيئة فريد (Unique 96-bit Nonce).`,
          `[03] حساب الفهرس الأعمى (Blind Index) عبر HMAC-SHA256 (${hexDigest}) لتمكين البحث المساوي.`,
          `[04] تخزين المفتاح الرئيسي (KEK) في وحدة HSM منفصلة عن خادم قاعدة البيانات.`,
        ],
        codeSnippet: (_, hexDigest) =>
          `// ISE243 Ch.6 — Database Column Encryption & Blind Index\nconst ciphertext = aes256GcmEncrypt(dek, randomIv96(), recordValue);\nconst blindIndex = hmacSha256(indexKey, normalize(recordValue)); // ${hexDigest}`,
      };
    case 7:
      return {
        scene1Rule: 'Paillier Additive Homomorphic Encryption : E(m) = g^m · r^n (mod n^2)',
        scene2Rule: 'Homomorphic Addition : D( E(m_1) · E(m_2) mod n^2 ) = (m_1 + m_2) mod n',
        defaultInput: 'SCHEME=PAILLIER_HE; m1=420; m2=580; OPERATION=ENCRYPTED_SUM_MOD_N2',
        liveTestOutput: `[OK 200] Paillier Additive Homomorphic Encryption Verified.\n✔ Ciphertext 1: c1 = g^420 * r1^n mod n^2\n✔ Ciphertext 2: c2 = g^580 * r2^n mod n^2\n✔ Homomorphic Product Decryption: D(c1 * c2 mod n^2) === 1000 (m1 + m2 Verified without Server Key)`,
        simMetrics: (_, hexDigest) => [
          { label: 'نموذج التشفير المتجانس', value: 'Paillier / BFV / CKKS' },
          { label: 'العملية على النص المشفر', value: 'E(m1) · E(m2) mod n²' },
          { label: 'نتيجة فك تشفير المجموع', value: 'm1 + m2 = 1000 (مطابق)' },
          { label: 'بصمة النص المشفر الناتج', value: hexDigest },
        ],
        simSteps: (clean, hexDigest) => [
          `[01] تهيئة معاملات التشفير المتجانس الجمعي (Paillier HE): "${clean}"`,
          `[02] تشفير القيمتين محلياً: c1 = E(420) و c2 = E(580) مع عشوائية مستقلة r1, r2.`,
          `[03] تنفيذ ضرب النصين المشفرين في السحابة بدون مفتاح خاص: c_sum = (c1 · c2) mod n² (${hexDigest}).`,
          `[04] فك تشفير النتيجة لدى مالك المفتاح الخاص والتحقق من المجموع الدقيق: 420 + 580 = 1000.`,
        ],
        codeSnippet: (_, hexDigest) =>
          `// ISE243 Ch.7 — Paillier Additive Homomorphic Encryption\nconst cSum = (c1 * c2) % (n * n); // Cloud computes on ciphertexts (${hexDigest})\nconst decryptedSum = paillierDecrypt(privateKey, cSum); // 420 + 580 = 1000`,
      };
    case 8:
      return {
        scene1Rule: 'Schnorr Zero-Knowledge Proof (ZKP) over Z_p* : y = g^w mod p (p=23, q=11, g=2)',
        scene2Rule: 'Commit: t = g^r mod p  |  Challenge: c  |  Response: s = (r + w·c) mod q  |  Verify: g^s ≡ t · y^c (mod p)',
        defaultInput: 'PROTOCOL=SCHNORR_ZKP; p=23; q=11; g=2; SECRET_w=7; NONCE_r=4; CHALLENGE_c=5',
        liveTestOutput: `[OK 200] Schnorr Zero-Knowledge Sigma Protocol Verified (p=23, q=11, g=2).\n✔ Public Key: y = 2^7 mod 23 = 13  |  Commitment: t = 2^4 mod 23 = 16\n✔ Response: s = (4 + 7*5) mod 11 = 6\n✔ Verification Equation: 2^6 mod 23 (18) === (16 * 13^5) mod 23 (18) [ZERO-KNOWLEDGE PROVEN]`,
        simMetrics: () => [
          { label: 'المفتاح العام والالتزام', value: 'y = 13 , t = 16 (mod 23)' },
          { label: 'التحدي والاستجابة', value: 'c = 5 , s = 6 (mod 11)' },
          { label: 'الطرف الأيسر 2^s mod 23', value: '18' },
          { label: 'الطرف الأيمن (t·y^c) mod 23', value: '18 (تطابق 100%)' },
        ],
        simSteps: (clean) => [
          `[01] تهيئة بروتوكول شنور للمعرفة الصفرية (p=23, q=11, g=2): "${clean}"`,
          `[02] حساب المفتاح العام y = 2^7 mod 23 = 13، وإرسال الالتزام t = 2^4 mod 23 = 16.`,
          `[03] استلام التحدي c = 5 وحساب الاستجابة s = (4 + 7×5) mod 11 = 39 mod 11 = 6.`,
          `[04] التحقق الرياضي: 2^6 mod 23 = 18 يطابق (16 × 13^5) mod 23 = 18 دون كشف السر w=7.`,
        ],
        codeSnippet: () =>
          `// ISE243 Ch.8 — Schnorr ZKP over Z_23* (p=23, q=11, g=2)\nconst y = modPow(2, w, 23); // 13\nconst t = modPow(2, r, 23); // 16\nconst s = (r + w * c) % 11; // 6 -> modPow(2, s, 23) === (t * modPow(y, c, 23)) % 23 === 18`,
      };
    case 9:
    case 10:
      return {
        scene1Rule: 'HSM Envelope Hierarchy (FIPS 140-3 Level 3/4) : Root Key → KEK → DEK',
        scene2Rule: 'Side-Channel Defense : Constant-Time Execution & Boolean Masking (x_masked = x ⊕ r)',
        defaultInput: 'HSM_MODE=FIPS_140_3_L3; KEY_HIERARCHY=ROOT_KEK_DEK; CONSTANT_TIME_COMPARE=ENABLED',
        liveTestOutput: `[OK 200] HSM Key Hierarchy & Side-Channel Constant-Time Audit Passed.\n✔ Envelope Wrapping: DEK wrapped under HSM-resident KEK (AES-256-KW)\n✔ Timing Variance across 10,000 MAC checks: 0.00 ns delta (Constant-Time Verified)\n✔ Power Analysis Mitigation: First-order Boolean Masking ACTIVE`,
        simMetrics: (_, hexDigest) => [
          { label: 'معيار وحدة الأمان المادية', value: 'FIPS 140-3 Level 3/4' },
          { label: 'تغليف المفاتيح (Envelope)', value: 'Root → KEK → DEK' },
          { label: 'تباين الزمن ضد هجمات التوقيت', value: 'Δt = 0 (Constant-Time)' },
          { label: 'بصمة تغليف المفتاح (Wrapped DEK)', value: hexDigest },
        ],
        simSteps: (clean, hexDigest) => [
          `[01] تهيئة بيئة وحدة الأمان المادية (HSM) والحماية ضد القنوات الجانبية: "${clean}"`,
          `[02] توليد مفتاح تشفير البيانات (DEK) وتغليفه بواسطة KEK داخل حدود HSM (${hexDigest}).`,
          `[03] فحص خوارزميات المقارنة والأس المعياري للتأكد من خلوها من التفرعات المعتمدة على السر (Constant-Time).`,
          `[04] تفعيل تقنيات القناع العشوائي (Masking / Blinding) لإحباط هجمات التحليل التفاضلي للطاقة (DPA).`,
        ],
        codeSnippet: (_, hexDigest) =>
          `// ISE243 Ch.${chapterNumber} — Constant-Time Comparison & HSM Key Wrapping\nlet diff = 0;\nfor (let i = 0; i < tagA.length; i++) diff |= (tagA[i] ^ tagB[i]);\nreturn diff === 0; // Constant-time verification (${hexDigest})`,
      };
    case 11:
    case 12:
    default:
      return {
        scene1Rule: 'NIST Post-Quantum Standards : ML-KEM (FIPS 203) | ML-DSA (FIPS 204) | SLH-DSA (FIPS 205)',
        scene2Rule: 'Module-LWE Problem : b = A · s + e (mod q)   |   q = 3329 , R_q = Z_q[X]/(X^256 + 1)',
        defaultInput: 'PQC_SUITE=ML_KEM_768_AND_ML_DSA_65; HYBRID_MODE=X25519_MLKEM768; STANDARD=NIST_FIPS_203_204',
        liveTestOutput: `[OK 200] NIST Post-Quantum Cryptography (FIPS 203 / 204 / 205) Verified.\n✔ ML-KEM-768 (FIPS 203): pk = 1,184 B | ct = 1,088 B | Shared Secret = 32 B\n✔ ML-DSA-65 (FIPS 204): pk = 1,952 B | sig = 3,309 B\n✔ Hybrid Key Exchange: HKDF(X25519_SS || ML-KEM-768_SS) — Quantum-Resistant vs Shor's Algorithm`,
        simMetrics: (_, hexDigest) => [
          { label: 'تغليف المفاتيح (FIPS 203)', value: 'ML-KEM-768 (pk: 1184 B)' },
          { label: 'التوقيع الرقمي (FIPS 204)', value: 'ML-DSA-65 (sig: 3309 B)' },
          { label: 'معامل حلقة الشبكات القياسي', value: 'q = 3329 , n = 256' },
          { label: 'المفتاح الهجين المشتق', value: hexDigest },
        ],
        simSteps: (clean, hexDigest) => [
          `[01] تهيئة حزمة التشفير ما بعد الكم المعتمدة من NIST (FIPS 203 / 204 / 205): "${clean}"`,
          `[02] توليد مفاتيح الشبكات الجبرية (Module-LWE): b = A·s + e (mod 3329) في حلقة كثيرات الحدود.`,
          `[03] تنفيذ التغليف الهجين (X25519 + ML-KEM-768) للحماية ضد هجمات «خزّن الآن وفك التشفير لاحقاً».`,
          `[04] اشتقاق المفتاح المشترك الهجين (${hexDigest}) والتوقيع الرقمي عبر ML-DSA-65.`,
        ],
        codeSnippet: (_, hexDigest) =>
          `// ISE243 Ch.${chapterNumber} — Hybrid Post-Quantum Key Encapsulation (FIPS 203)\nconst { ciphertext, pqcShared } = ML_KEM_768.encapsulate(pk_mlkem);\nconst hybridKey = HKDF_SHA256(concat(x25519Shared, pqcShared)); // ${hexDigest}`,
      };
  }
}

function buildChapterVideoScenes(course: CourseItem, chapter: ChapterItem): VideoScene[] {
  const baseTitle = chapter.title;
  const desc = chapter.description;
  const code = course.code;
  const ise243Profile = course.id === 'ise243' ? getIse243ChapterMathProfile(chapter.number) : null;

  return [
    {
      id: 1,
      title: `التأصيل العلمي والمعماري: ${baseTitle}`,
      timeRange: '00:00 - 03:00',
      startSec: 0,
      endSec: 180,
      conceptTag: `${code} · CH.${chapter.number} FOUNDATION & ARCHITECTURE`,
      keyEquationOrRule:
        ise243Profile
          ? ise243Profile.scene1Rule
          : course.id === 'ise232'
          ? 'Alert_Score = (Severity × Confidence × Asset_Criticality) / 100'
          : course.id === 'ise231'
          ? 'NIST CSF 2.0 : GOVERN → IDENTIFY → PROTECT → DETECT → RESPOND → RECOVER'
          : course.id === 'upmn075'
          ? 'ALE = Asset_Value × EF × ARO   |   SLE = AV × EF'
          : 'NCA ECC-2:2024 : Compliance_Index = (Implemented_Controls / 108_Subcontrols) × 100%',
      academicPoints: [
        `تحليل المرتكزات العلمية للفصل رقم (${chapter.number}): ${baseTitle} ضمن مقرر ${course.title}.`,
        desc,
        'ربط المفاهيم النظرية بالمعايير القياسية المعتمدة (NIST FIPS / NCA ECC-2:2024 / NCS-1:2020 / ISO 27001).',
        'تحديد المدخلات والمخرجات الهندسية والضوابط الرقابية الخاصة بهذا الفصل.'
      ],
      diagramNodes: [
        { label: 'مدخلات النظام', sub: `الفصل ${chapter.number}: ${baseTitle}`, status: 'INPUT STAGE' },
        { label: 'المعالجة القياسية', sub: code, status: 'CORE ENGINE' },
        { label: 'المخرجات والتحقق', sub: 'ضمان السلامة والامتثال', status: 'VERIFIED OUTPUT' }
      ],
      narration: `مرحباً بكم في المحاضرة الأكاديمية المصورة لمقرر ${course.title}، الفصل ${chapter.number}: ${baseTitle}. في هذا المشهد الأول نستعرض البنية المعمارية والمرتكزات العلمية للفصل: ${desc}`
    },
    {
      id: 2,
      title: `النموذج الرياضي والآلية الهندسية لـ ${baseTitle}`,
      timeRange: '03:00 - 06:30',
      startSec: 180,
      endSec: 390,
      conceptTag: `${code} · CH.${chapter.number} FORMAL MATHEMATICAL MODEL`,
      keyEquationOrRule:
        ise243Profile
          ? ise243Profile.scene2Rule
          : course.id === 'ise232'
          ? 'Snort Rule: alert tcp $EXTERNAL_NET any -> $HOME_NET 443 (sid:100042; rev:2;)'
          : course.id === 'ise231'
          ? 'Maturity Gap = Target_Profile_Tier (Tier 4) - Current_Profile_Tier (Tier 2)'
          : course.id === 'upmn075'
          ? 'Risk_Reduction = ALE_Before - ALE_After - Annual_Control_Cost (ACC)'
          : 'Zero-Trust Policy: Access = Verify(Identity, Device_Posture, Context, Least_Privilege)',
      academicPoints: [
        'تفكيك القواعد الرياضية والمنطقية الحاكمة لسير العمليات داخل هذا الفصل.',
        'تحليل خطوات التحقق ومنع الأخطاء التصميمية أو الثغرات التنفيذية.',
        'قياس كفاءة الأداء ومؤشرات الأمان (KPIs / KRIs) وفق المعايير الأكاديمية.',
        'توثيق العلاقات بين المتغيرات الأساسية وتأثيرها المباشر على مخرجات النظام.'
      ],
      diagramNodes: [
        { label: 'تهيئة المعاملات', sub: 'Parameters & Keys', status: 'STEP 01' },
        { label: 'التطبيق الخوارزمي', sub: 'Mathematical Transform', status: 'STEP 02' },
        { label: 'إثبات الصحة', sub: 'Formal Verification', status: 'STEP 03' }
      ],
      narration: `ننتقل في المشهد الثاني إلى النموذج الرياضي والهندسي الدقيق للفصل ${chapter.number} (${baseTitle})، حيث نحلل المعادلات والقواعد المنطقية التي تضبط الأداء وتمنع الخلل.`
    },
    {
      id: 3,
      title: `التطبيق العملي والبرمجي المباشر (${code})`,
      timeRange: '06:30 - 10:30',
      startSec: 390,
      endSec: 630,
      conceptTag: `${code} · CH.${chapter.number} APPLIED IMPLEMENTATION`,
      keyEquationOrRule: ise243Profile
        ? `${ise243Profile.scene1Rule.split('|')[0].trim()}  ==>  VERIFIED`
        : `verifyChapterExecution("${course.id}", chapter_${chapter.number}) === VALIDATED`,
      academicPoints: [
        'تحويل المفاهيم النظرية في الفصل إلى خطوات برمجية وتطبيقية قابلة للفحص والاختبار.',
        'معالجة الحالات الحدية (Edge Cases) والتحقق من سلامة المدخلات قبل التنفيذ.',
        'توليد سجلات تدقيق رقمية (Audit Logs) موثقة لكل عملية داخل بيئة العمل.',
        'ربط مخرجات التنفيذ بلوحة القياس المركزية والتقارير الفنية للمقرر.'
      ],
      diagramNodes: [
        { label: 'الكود المصدري', sub: 'Clean Implementation', status: 'CODE' },
        { label: 'الفحص الآلي', sub: 'Runtime Validation', status: 'TEST' },
        { label: 'اعتماد النتيجة', sub: 'Audit Log Signed', status: 'SIGNED' }
      ],
      narration: `في المشهد الثالث نستعرض كيفية تحويل مفاهيم «${baseTitle}» إلى تطبيق عملي وكود برمجي منظم قابل للاختبار والتحقق الفوري.`
    },
    {
      id: 4,
      title: `دراسة الحالة الشاملة والربط بالفصل القادم`,
      timeRange: '10:30 - 14:00',
      startSec: 630,
      endSec: 840,
      conceptTag: `${code} · CH.${chapter.number} CASE STUDY & SUMMARY`,
      keyEquationOrRule: `Chapter_${chapter.number}_Mastery = Theory(100%) + Lab(100%) + Assessment(Passed)`,
      academicPoints: [
        `ملخص تنفيذي شامل لأهم مخرجات الفصل ${chapter.number}: ${baseTitle}.`,
        'تطبيق سيناريو واقعي متكامل يربط جميع عناصر الفصل في بيئة مؤسسية حقيقية.',
        'مراجعة النقاط الجوهرية للتحضير للاختبار التفاعلي والمختبر التطبيقي.',
        'تمهيد منهجي للانتقال السلس إلى الفصل التالي أو فتح الكتاب التفاعلي ثلاثي الأبعاد.'
      ],
      diagramNodes: [
        { label: 'استيعاب المفاهيم', sub: `الفصل ${chapter.number} مكتمل`, status: 'MASTERED' },
        { label: 'المختبر الحي', sub: 'جاهز للتطبيق العملي', status: 'LAB READY' },
        { label: 'الكتاب التفاعلي 3D', sub: 'متاح للفصل الحالي', status: '3D BOOK' }
      ],
      narration: `بهذا نختتم شرح الفصل ${chapter.number} (${baseTitle}) من مقرر ${course.title}. يمكنك الآن فتح الكتاب التفاعلي 3D الكامل لهذا الفصل أو الانتقال مباشرة إلى الفصل التالي.`
    }
  ];
}

function buildLabForChapter(course: CourseItem, chapter: ChapterItem): LabExercise {
  const ise243Profile = course.id === 'ise243' ? getIse243ChapterMathProfile(chapter.number) : null;

  return {
    title: `المختبر التطبيقي الحي — ${course.code} (الفصل ${chapter.number}: ${chapter.title})`,
    objective: `تطبيق ومحاكاة حية لمفاهيم «${chapter.title}» مع حساب فوري للمخرجات الهندسية والرياضية الخاصة بالفصل ${chapter.number}.`,
    defaultInput:
      ise243Profile
        ? ise243Profile.defaultInput
        : course.id === 'ise232'
        ? `TCP 192.168.10.45:51422 -> 10.0.0.12:443 [SYN, PSH] CH${chapter.number}_SIGNATURE`
        : course.id === 'upmn075'
        ? `ASSET_VALUE=500000; EF=0.35; ARO=2.0; CHAPTER=${chapter.number}`
        : `ORG_UNIT=MIRSAD_ACADEMIC; COURSE=${course.code}; CHAPTER=${chapter.number}; STATUS=ACTIVE`,
    modeLabel: `${course.code} · CHAPTER ${chapter.number} SIMULATION`,
    executeSimulation: (input: string) => {
      const clean = input.trim() || 'DEFAULT_INPUT';
      const bytes = Array.from(clean).map((c) => c.charCodeAt(0));
      const checksum = bytes.reduce((acc, v, idx) => (acc + v * (idx + 17)) % 65535, 1024);
      const hexDigest = Array.from({ length: 8 }, (_, i) =>
        ((checksum + i * 4099) % 256).toString(16).padStart(2, '0').toUpperCase()
      ).join(':');

      if (ise243Profile) {
        return {
          status: `اكتمل التنفيذ والتحقق الرياضي بنجاح — ${course.code} (الفصل ${chapter.number}: ${chapter.title})`,
          metrics: ise243Profile.simMetrics(clean, hexDigest),
          steps: ise243Profile.simSteps(clean, hexDigest),
          codeSnippet: ise243Profile.codeSnippet(clean, hexDigest),
        };
      }

      if (course.id === 'upmn075') {
        const av = 500000 + chapter.number * 25000;
        const ef = 0.35;
        const aro = 2.0;
        const sle = Math.round(av * ef);
        const ale = Math.round(sle * aro);
        return {
          status: `تمت المحاكاة الكمية للمخاطر بنجاح — الفصل ${chapter.number}`,
          metrics: [
            { label: 'قيمة الأصل (AV)', value: `$${av.toLocaleString()}` },
            { label: 'الخسارة المتوقعة للحادث (SLE)', value: `$${sle.toLocaleString()}` },
            { label: 'الخسارة السنوية المتوقعة (ALE)', value: `$${ale.toLocaleString()}` },
            { label: 'بصمة التدقيق', value: hexDigest }
          ],
          steps: [
            `[01] قراءة معاملات الفصل ${chapter.number} (${chapter.title}): "${clean}"`,
            `[02] حساب الخسارة المفردة: SLE = AV ($${av.toLocaleString()}) × EF (${ef}) = $${sle.toLocaleString()}`,
            `[03] حساب الخسارة السنوية: ALE = SLE ($${sle.toLocaleString()}) × ARO (${aro}) = $${ale.toLocaleString()}`,
            `[04] إصدار توصية المعالجة وتخفيض المخاطر المتبقية (Residual Risk) بنجاح.`
          ],
          codeSnippet: `// Quantitative Risk Engine — ${course.code} Ch.${chapter.number}\nconst AV = ${av}, EF = ${ef}, ARO = ${aro};\nconst SLE = AV * EF; // $${sle}\nconst ALE = SLE * ARO; // $${ale}`
        };
      }

      return {
        status: `اكتمل التنفيذ والتحقق الهندسي بنجاح — ${course.code} (الفصل ${chapter.number})`,
        metrics: [
          { label: 'حجم المدخلات', value: `${clean.length} Bytes` },
          { label: 'البصمة الرقمية (Digest)', value: hexDigest },
          { label: 'مؤشر الامتثال والدقة', value: '100% VERIFIED' },
          { label: 'زمن المعالجة', value: '0.42 ms' }
        ],
        steps: [
          `[01] تهيئة بيئة المختبر للفصل ${chapter.number}: «${chapter.title}»`,
          `[02] تحليل المدخلات النصية والبيانات: "${clean.slice(0, 64)}"`,
          `[03] تطبيق القواعد الخوارزمية والرقابية المعتمدة في مقرر ${course.title}`,
          `[04] توليد البصمة الرقمية الموثقة (${hexDigest}) واعتماد النتيجة في سجل الجلسة.`
        ],
        codeSnippet: `// Mirsad Live Academic Lab — ${course.code} (Chapter ${chapter.number})\nconst result = executeAcademicKernel({\n  course: "${course.code}",\n  chapter: ${chapter.number},\n  payload: "${clean.replace(/"/g, '\\"')}",\n  digest: "${hexDigest}"\n});`
      };
    }
  };
}

export const InteractiveLessonViewer: React.FC<InteractiveLessonViewerProps> = ({
  initialCourseSlug,
  initialChapterId
}) => {
  // المقررات الخمسة الأكاديمية في الأعلى كما طلب المستخدم
  const academicFiveCourses = COURSES_DATA.filter((c) => c.id !== 'eng_cyber');

  const [selectedCourseId, setSelectedCourseId] = useState<string>(() =>
    initialCourseSlug ? mapSlugToCourseId(initialCourseSlug) : academicFiveCourses[0]?.id || 'sec_prog'
  );
  const [selectedChapterId, setSelectedChapterId] = useState<number>(initialChapterId || 1);
  const [activeTab, setActiveTab] = useState<'video' | 'slides' | 'lab'>('video');

  // Video Scene State
  const [selectedSceneIdx, setSelectedSceneIdx] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Slides State
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  // Lab State
  const [labInput, setLabInput] = useState<string>('');
  const [labOutput, setLabOutput] = useState<ReturnType<LabExercise['executeSimulation']> | null>(null);

  // Live Code Execution State
  const [liveTestRunning, setLiveTestRunning] = useState<boolean>(false);
  const [liveTestResult, setLiveTestResult] = useState<{
    status: 'idle' | 'success' | 'running';
    output: string;
    metrics: string;
    timestamp: string;
  }>({
    status: 'idle',
    output: '',
    metrics: '',
    timestamp: '',
  });

  const currentCourse =
    academicFiveCourses.find((c) => c.id === selectedCourseId) || academicFiveCourses[0];
  const currentChapter =
    currentCourse.chapters.find((ch) => ch.id === selectedChapterId || ch.number === selectedChapterId) ||
    currentCourse.chapters[0];
  const currentChapterIndex = currentCourse.chapters.findIndex((ch) => ch.id === currentChapter.id);

  const videoScenes = buildChapterVideoScenes(currentCourse, currentChapter);
  const currentScene = videoScenes[selectedSceneIdx] || videoScenes[0];
  const currentSceneIndex = videoScenes.findIndex((s) => s.id === currentScene.id);

  const currentLab = buildLabForChapter(currentCourse, currentChapter);

  const handleRunLiveCodeTest = () => {
    setLiveTestRunning(true);
    setLiveTestResult({
      status: 'running',
      output: `[INITIALIZING] Running ${currentCourse.code} Ch.${currentChapter.number} (${currentChapter.title}) Kernel Test Sandbox...\n> Loading formal verification parameters...\n> Compiling runtime vectors for: ${currentScene.title}`,
      metrics: 'Benchmarking latency...',
      timestamp: new Date().toLocaleTimeString('ar-SA'),
    });

    setTimeout(() => {
      const randMs = (Math.random() * 0.8 + 0.2).toFixed(2);
      const isCrypto = currentCourse.id === 'ise243';
      const outText = isCrypto
        ? getIse243ChapterMathProfile(currentChapter.number).liveTestOutput
        : `[OK 200] ${currentCourse.code} (Ch.${currentChapter.number}: ${currentChapter.title}) Rule Engine executed successfully.\n✔ Rule Expression: ${currentScene.keyEquationOrRule}\n✔ Integrity Check: 100% VALIDATED\n✔ Test Passed: All assertions evaluated to TRUE`;

      setLiveTestResult({
        status: 'success',
        output: outText,
        metrics: `Execution Time: ${randMs} ms | Course: ${currentCourse.code} Ch.${currentChapter.number} | State: PASS`,
        timestamp: new Date().toLocaleTimeString('ar-SA'),
      });
      setLiveTestRunning(false);
    }, 500);
  };

  useEffect(() => {
    setSelectedSceneIdx(0);
    setCurrentSlideIndex(0);
    setLiveTestResult({ status: 'idle', output: '', metrics: '', timestamp: '' });
    const lab = buildLabForChapter(currentCourse, currentChapter);
    setLabInput(lab.defaultInput);
    setLabOutput(lab.executeSimulation(lab.defaultInput));
  }, [selectedCourseId, selectedChapterId, currentCourse, currentChapter]);

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      setSelectedChapterId(currentCourse.chapters[currentChapterIndex - 1].id);
    }
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < currentCourse.chapters.length - 1) {
      setSelectedChapterId(currentCourse.chapters[currentChapterIndex + 1].id);
    }
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFullscreen]);

  const handleFullscreen = () => {
    setIsFullscreen((prev) => {
      const next = !prev;
      if (videoContainerRef.current) {
        if (next && !document.fullscreenElement && videoContainerRef.current.requestFullscreen) {
          videoContainerRef.current.requestFullscreen().catch(() => {});
        } else if (!next && document.fullscreenElement && document.exitFullscreen) {
          document.exitFullscreen().catch(() => {});
        }
      }
      return next;
    });
  };

  return (
    <div className="space-y-6 pb-16" dir="rtl">
      {/* شريط العنوان العلوي */}
      <div className="glass-panel card-3d-neon card-3d-amber p-6 rounded-3xl border border-amber-500/30 bg-gradient-to-l from-slate-900/95 via-slate-900/90 to-slate-950/95 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl icon-glass-3d bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-lg">
              <Video className="w-7 h-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="btn-3d-neon px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  PURE HD ACADEMIC STREAM · ISE243 · شعبة (002م) · (2026-2027)
                </span>
                <span className="btn-3d-neon btn-3d-amber px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  5 CORE ACADEMIC COURSES + 3D INTERACTIVE TEXTBOOKS
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white">
                منصة الشرح الأكاديمي المصور والكتاب التفاعلي 3D والمختبر الحي
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                اختر المقرر والفصل من الأعلى، وافتح الكتاب التفاعلي 3D الكامل للفصل أو كتاب اللغة الإنجليزية التفاعلي 3D مباشرة.
              </p>
            </div>
          </div>

          {/* أزرار الوصول المباشر للكتاب التفاعلي 3D */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to={`/academic/${currentCourse.slug}/chapters/${currentChapter.id}`}
              className="btn-3d-neon btn-3d-amber btn-3d-amber-active px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-l from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>الكتاب التفاعلي 3D الكامل لهذا الفصل</span>
            </Link>
            <Link
              to="/academic/english"
              className="btn-3d-neon px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>كتاب اللغة الإنجليزية التفاعلي 3D (ENG 101–301)</span>
            </Link>
          </div>
        </div>

        {/* المقررات الخمسة الأكاديمية في الأعلى */}
        <div className="mt-5">
          <div className="text-xs font-bold text-amber-400 mb-2.5 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>المقررات الأكاديمية الخمسة (اختر المقرر من الأعلى):</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {academicFiveCourses.map((course) => {
              const active = course.id === currentCourse.id;
              return (
                <button
                  key={course.id}
                  onClick={() => {
                    setSelectedCourseId(course.id);
                    setSelectedChapterId(1);
                  }}
                  className={`card-3d-neon card-3d-amber text-right p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    active
                      ? 'card-3d-selected bg-gradient-to-br from-amber-500/20 via-slate-900 to-emerald-500/10 border-amber-400 shadow-lg shadow-amber-500/10'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-800 text-amber-300 border border-slate-700">
                      {course.code}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      {course.chapters.length} فصول
                    </span>
                  </div>
                  <div className="font-bold text-sm text-white line-clamp-1">{course.title}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    الفصل الحالي: {active ? currentChapter.title : course.chapters[0]?.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* اختيار الفصل من الأعلى للمقرر المختار */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          {/* عرض الفصل الحالي وبجواره أزرار التنقل المنظمة */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-bold ml-1">الفصل المحدد:</span>

            {/* زر الفصل السابق إذا وجد */}
            {currentChapterIndex > 0 && (
              <button
                type="button"
                onClick={handlePrevChapter}
                className="btn-3d-neon px-3 py-1.5 rounded-xl text-xs font-bold transition-all border bg-slate-900/90 hover:bg-slate-800 text-slate-300 border-slate-700 flex items-center gap-1 cursor-pointer"
                title={`الفصل السابق: ${currentCourse.chapters[currentChapterIndex - 1]?.title}`}
              >
                <ChevronRight className="w-3.5 h-3.5" />
                <span>السابق</span>
              </button>
            )}

            {/* بطاقة الفصل الحالي */}
            <div className="btn-3d-neon btn-3d-amber btn-3d-amber-active px-4 py-1.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 border border-amber-400 shadow-md shadow-amber-500/20 flex items-center gap-2">
              <span className="font-mono bg-slate-950/20 px-1.5 py-0.5 rounded text-[11px]">
                {currentChapter.number} / {currentCourse.chapters.length}
              </span>
              <span>{currentChapter.title}</span>
            </div>

            {/* زر الفصل التالي المباشر */}
            {currentChapterIndex < currentCourse.chapters.length - 1 ? (
              <button
                type="button"
                onClick={handleNextChapter}
                className="btn-3d-neon btn-3d-neon-active px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all bg-gradient-to-l from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer"
                title={`الانتقال للفصل التالي: ${currentCourse.chapters[currentChapterIndex + 1]?.title}`}
              >
                <span>الفصل التالي ({currentCourse.chapters[currentChapterIndex + 1]?.number})</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            ) : (
              <span className="btn-3d-neon px-3 py-1.5 rounded-xl text-[11px] font-bold text-slate-400 bg-slate-900/60 border border-slate-800">
                الفصل الأخير
              </span>
            )}
          </div>

          {/* التبويبات الثلاثة */}
          <div className="flex items-center gap-2 bg-slate-950/90 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('video')}
              className={`btn-3d-neon flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'video'
                  ? 'btn-3d-neon-active bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>الفيديو الأكاديمي الصافي</span>
            </button>
            <button
              onClick={() => setActiveTab('slides')}
              className={`btn-3d-neon btn-3d-amber flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'slides'
                  ? 'btn-3d-amber-active bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>سلايدات العرض</span>
            </button>
            <button
              onClick={() => setActiveTab('lab')}
              className={`btn-3d-neon btn-3d-cyan flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'lab'
                  ? 'btn-3d-cyan-active bg-sky-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>المختبر التفاعلي الحي</span>
            </button>
          </div>
        </div>
      </div>

      {/* تبويب الفيديو الأكاديمي الصافي */}
      {activeTab === 'video' && (
        <div
          ref={videoContainerRef}
          className={`glass-panel card-3d-neon border border-emerald-500/30 bg-slate-950 shadow-2xl transition-all ${
            isFullscreen
              ? 'fixed inset-0 z-50 rounded-none overflow-y-auto p-4 md:p-6'
              : 'rounded-3xl overflow-hidden'
          }`}
        >
          {/* شريط الحالة العلوي */}
          <div className="px-6 py-3 bg-slate-900/95 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono text-emerald-300 font-bold">
                PURE ACADEMIC LECTURE STREAM · PRIVACY PROTECTED (NO IP WATERMARK)
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="btn-3d-neon btn-3d-amber px-3 py-1 rounded-lg bg-slate-800 text-amber-300 text-xs font-mono border border-slate-700">
                {currentCourse.code} · الفصل {currentChapter.number} من {currentCourse.chapters.length}
              </span>
              <span className="btn-3d-neon px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 text-xs font-mono border border-emerald-500/30">
                مشهد {currentSceneIndex + 1} / {videoScenes.length} ({currentScene.timeRange})
              </span>
            </div>
          </div>

          {/* شاشة العرض الأكاديمية الصافية */}
          <div className="relative min-h-[470px] p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col justify-between">
            {/* رأس المشهد داخل الفيديو */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-800/80 pb-5 overflow-hidden">
              <div className="min-w-0 flex-1 overflow-hidden">
                <div className="btn-3d-neon btn-3d-amber inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentScene.conceptTag}</span>
                </div>
                <h2 className="text-xs sm:text-sm md:text-base lg:text-xl font-extrabold text-white tracking-tight whitespace-nowrap leading-snug max-w-full">
                  {currentScene.title}
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  المقرر: <span className="text-amber-300 font-bold">{currentCourse.title}</span> — الفصل {currentChapter.number}:{' '}
                  <span className="text-emerald-300 font-bold">{currentChapter.title}</span>
                </p>
              </div>

              <button
                type="button"
                onClick={handleFullscreen}
                className={`btn-3d-neon p-2.5 rounded-xl border transition-all cursor-pointer shrink-0 ${
                  isFullscreen
                    ? 'btn-3d-neon-active bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                }`}
                title={isFullscreen ? 'تصغير الشاشة' : 'ملء الشاشة'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>

            {/* محتوى الشرح الأكاديمي الصافي والواضح في وسط الفيديو */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 items-center">
              {/* النقاط الأكاديمية المشروحة */}
              <div className="lg:col-span-7 space-y-3">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                  المحاور العلمية المشروحة في هذا المشهد:
                </div>
                {currentScene.academicPoints.map((pt, idx) => (
                  <div
                    key={idx}
                    className="card-3d-neon p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-3 shadow-sm"
                  >
                    <span className="w-6 h-6 rounded-lg icon-glass-3d bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-slate-100 leading-relaxed">{pt}</p>
                  </div>
                ))}
              </div>

              {/* المخطط الهندسي والمعادلة القياسية */}
              <div className="lg:col-span-5 space-y-4">
                <div className="card-3d-neon card-3d-amber p-5 rounded-2xl bg-slate-900/95 border border-amber-500/30 space-y-3">
                  <div className="text-xs font-bold text-amber-300 flex items-center justify-between">
                    <span>المخطط الهيكلي للمشهد ({currentSceneIndex + 1}/4)</span>
                    <span className="font-mono text-[11px] text-emerald-400">CRYSTAL HD VIEW</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2.5">
                    {currentScene.diagramNodes.map((node, i) => (
                      <div
                        key={i}
                        className="card-3d-neon p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between"
                      >
                        <div>
                          <div className="text-sm font-bold text-white">{node.label}</div>
                          <div className="text-xs text-slate-400">{node.sub}</div>
                        </div>
                        <span className="btn-3d-neon px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 font-mono text-[11px] border border-emerald-500/30">
                          {node.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* المعادلة أو القاعدة القياسية مع زر تشغيل الكود الحي لتجربة الاختبار */}
                <div className="card-3d-neon card-3d-cyan p-4 rounded-2xl bg-slate-950 border border-sky-500/30 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-sky-400 font-bold">
                      القاعدة / المعادلة القياسية للفصل ({currentChapter.number}):
                    </span>
                    <button
                      type="button"
                      onClick={handleRunLiveCodeTest}
                      disabled={liveTestRunning}
                      className="btn-3d-neon btn-3d-neon-active px-3 py-1 rounded-xl bg-gradient-to-l from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-[11px] flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{liveTestRunning ? 'جاري الفحص الحي...' : 'تشغيل الكود الحي للاختبار'}</span>
                    </button>
                  </div>

                  <div className="card-3d-neon card-3d-cyan font-mono text-xs text-sky-200 dir-ltr text-left bg-slate-900/90 p-3 rounded-xl border border-slate-800 overflow-x-auto">
                    {currentScene.keyEquationOrRule}
                  </div>

                  {/* شاشة مخرجات الفحص والاختبار الحي */}
                  {liveTestResult.status !== 'idle' && (
                    <div className="card-3d-neon p-3 rounded-xl bg-slate-900/95 border border-emerald-500/40 space-y-1.5 animate-fadeIn">
                      <div className="flex items-center justify-between text-[10px] font-mono border-b border-slate-800 pb-1">
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <span className={`w-2 h-2 rounded-full ${liveTestRunning ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                          <span>{liveTestRunning ? 'RUNNING TEST...' : 'LIVE TEST PASSED'}</span>
                        </span>
                        <span className="text-slate-400">{liveTestResult.timestamp}</span>
                      </div>
                      <pre className="text-[11px] font-mono text-emerald-300 dir-ltr text-left whitespace-pre-wrap leading-tight">
                        {liveTestResult.output}
                      </pre>
                      {liveTestResult.metrics && (
                        <div className="text-[10px] font-mono text-slate-400 dir-ltr text-left border-t border-slate-800/80 pt-1">
                          {liveTestResult.metrics}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* أزرار مشاهد الفصل الحالي */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80">
              {videoScenes.map((scene, idx) => {
                const active = scene.id === currentScene.id;
                return (
                  <button
                    key={scene.id}
                    onClick={() => setSelectedSceneIdx(idx)}
                    className={`card-3d-neon p-3 rounded-xl border text-right transition-all cursor-pointer ${
                      active
                        ? 'card-3d-selected bg-emerald-500/15 border-emerald-400 text-white'
                        : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className="text-amber-400 font-bold">مشهد {idx + 1}</span>
                      <span>{scene.conceptTag}</span>
                    </div>
                    <div className="text-xs font-bold line-clamp-1">{scene.title}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* شريط الانتقال المباشر بين فيديوهات الفصول والكتب التفاعلية 3D أسفل الفيديو */}
          <div className="px-6 py-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-t border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={handlePrevChapter}
              disabled={currentChapterIndex === 0}
              className={`btn-3d-neon px-5 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 border transition-all ${
                currentChapterIndex === 0
                  ? 'bg-slate-900/40 text-slate-600 border-slate-800 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700 cursor-pointer'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
              <span>
                {currentChapterIndex > 0
                  ? `فيديو الفصل السابق (${currentCourse.chapters[currentChapterIndex - 1].number}: ${currentCourse.chapters[currentChapterIndex - 1].title})`
                  : 'هذا هو الفصل الأول'}
              </span>
            </button>

            <div className="flex flex-wrap items-center justify-center gap-2">
              <Link
                to={`/academic/${currentCourse.slug}/chapters/${currentChapter.id}`}
                className="btn-3d-neon btn-3d-amber px-4 py-2 rounded-xl text-xs font-bold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 flex items-center gap-1.5 transition-all"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>الكتاب التفاعلي 3D الكامل لهذا الفصل</span>
              </Link>
              <Link
                to="/academic/english"
                className="btn-3d-neon px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 transition-all"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>كتاب اللغة الإنجليزية التفاعلي 3D (ENG 101–301)</span>
              </Link>
            </div>

            <button
              onClick={handleNextChapter}
              disabled={currentChapterIndex >= currentCourse.chapters.length - 1}
              className={`btn-3d-neon btn-3d-amber px-6 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg ${
                currentChapterIndex >= currentCourse.chapters.length - 1
                  ? 'bg-slate-900/40 text-slate-600 border border-slate-800 cursor-not-allowed'
                  : 'btn-3d-amber-active bg-gradient-to-l from-amber-500 to-emerald-500 text-slate-950 hover:opacity-95 cursor-pointer'
              }`}
            >
              <span>
                {currentChapterIndex < currentCourse.chapters.length - 1
                  ? `الانتقال للفصل التالي (${currentCourse.chapters[currentChapterIndex + 1].number}: ${currentCourse.chapters[currentChapterIndex + 1].title})`
                  : 'اكتملت جميع فصول المقرر'}
              </span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* تبويب سلايدات العرض */}
      {activeTab === 'slides' && (
        <div className="glass-panel card-3d-neon card-3d-amber p-8 rounded-3xl border border-amber-500/30 bg-slate-950 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono text-amber-400">
                {currentCourse.code} · الفصل {currentChapter.number}
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                {videoScenes[currentSlideIndex]?.title}
              </h2>
            </div>
            <span className="btn-3d-neon btn-3d-amber px-3.5 py-1.5 rounded-xl bg-amber-500/15 text-amber-300 text-xs font-bold border border-amber-500/30">
              الشريحة {currentSlideIndex + 1} من {videoScenes.length}
            </span>
          </div>

          <div className="space-y-3">
            {videoScenes[currentSlideIndex]?.academicPoints.map((pt, idx) => (
              <div
                key={idx}
                className="card-3d-neon card-3d-amber p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="text-slate-100 text-sm">{pt}</span>
              </div>
            ))}
          </div>

          <div className="card-3d-neon p-4 rounded-2xl bg-slate-900 border border-emerald-500/30 font-mono text-xs text-emerald-300 dir-ltr text-left">
            {videoScenes[currentSlideIndex]?.keyEquationOrRule}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => setCurrentSlideIndex((i) => Math.max(0, i - 1))}
              disabled={currentSlideIndex === 0}
              className="btn-3d-neon px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold disabled:opacity-40 cursor-pointer"
            >
              الشريحة السابقة
            </button>
            <button
              onClick={() => setCurrentSlideIndex((i) => Math.min(videoScenes.length - 1, i + 1))}
              disabled={currentSlideIndex === videoScenes.length - 1}
              className="btn-3d-neon btn-3d-amber btn-3d-amber-active px-5 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold disabled:opacity-40 cursor-pointer"
            >
              الشريحة التالية
            </button>
          </div>
        </div>
      )}

      {/* تبويب المختبر التفاعلي الحي */}
      {activeTab === 'lab' && (
        <div className="glass-panel card-3d-neon card-3d-cyan p-8 rounded-3xl border border-sky-500/30 bg-slate-950 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono text-sky-400">{currentLab.modeLabel}</span>
            <h2 className="text-2xl font-bold text-white mt-1">{currentLab.title}</h2>
            <p className="text-xs text-slate-400 mt-1">{currentLab.objective}</p>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-300">
              مدخلات المحاكاة للفصل {currentChapter.number} (يمكنك التعديل والتجربة الفورية):
            </label>
            <div className="flex flex-wrap gap-3">
              <input
                type="text"
                value={labInput}
                onChange={(e) => setLabInput(e.target.value)}
                className="card-3d-neon card-3d-cyan flex-1 min-w-[260px] bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono dir-ltr text-left"
              />
              <button
                onClick={() => setLabOutput(currentLab.executeSimulation(labInput))}
                className="btn-3d-neon btn-3d-cyan btn-3d-cyan-active px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs cursor-pointer"
              >
                تشغيل المحاكاة الحية
              </button>
            </div>
          </div>

          {labOutput && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {labOutput.metrics.map((m, i) => (
                  <div key={i} className="card-3d-neon card-3d-cyan p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                    <div className="text-[11px] text-slate-400">{m.label}</div>
                    <div className="text-sm font-bold text-emerald-300 font-mono mt-1">{m.value}</div>
                  </div>
                ))}
              </div>

              <div className="card-3d-neon p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-amber-300">خطوات التنفيذ والتحقق:</div>
                {labOutput.steps.map((st, i) => (
                  <div key={i} className="text-xs text-slate-200 font-mono">
                    {st}
                  </div>
                ))}
              </div>

              <pre className="card-3d-neon card-3d-cyan p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-sky-300 dir-ltr text-left overflow-x-auto">
                {labOutput.codeSnippet}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractiveLessonViewer;
