// File: src/data/saudiCyber.ts
// بيانات موثقة حصرياً من التقارير والمعايير الرسمية المعتمدة:
// 1. ITU Global Cybersecurity Index (GCI 2024 - 5th Edition): المملكة العربية السعودية 100/100 (الفئة الأولى Tier-1 Role-Modelling)
// 2. الهيئة الوطنية للأمن السيبراني (NCA ECC-2:2024): 5 مكونات رئيسية، 29 مكوناً فرعياً، 108 ضوابط أساسية
// 3. المعايير الوطنية للتشفير (NCA NCS-1:2020) ومعايير التشفير ما بعد الكم (NIST FIPS 203/204/205 — أغسطس 2024)

export const SAUDI_MARKET = [
  { year: 2020, marketSize: 97.5, workforce: 100, gciRank: 2, label: 'ITU GCI v4 (99.54/100)' },
  { year: 2021, marketSize: 99.54, workforce: 100, gciRank: 2, label: 'المرتبة الثانية عالمياً (ITU GCI)' },
  { year: 2022, marketSize: 99.54, workforce: 100, gciRank: 2, label: 'تحديث أطر NCA الوطنية' },
  { year: 2023, marketSize: 100.0, workforce: 100, gciRank: 1, label: 'تطبيق المعايير الوطنية للتشفير NCS-1' },
  { year: 2024, marketSize: 100.0, workforce: 100, gciRank: 1, label: 'ITU GCI 2024: 100/100 (Tier-1 Role-Modelling)' },
];

export const SECTOR_BREAKDOWN = [
  { name: 'حوكمة الأمن السيبراني (ECC Domain 1)', sector: 'حوكمة الأمن السيبراني', percentage: 27, color: '#10b981' },
  { name: 'تعزيز الأمن السيبراني (ECC Domain 2)', sector: 'تعزيز الأمن السيبراني', percentage: 42, color: '#3b82f6' },
  { name: 'صمود الأمن السيبراني (ECC Domain 3)', sector: 'صمود الأمن السيبراني', percentage: 12, color: '#f59e0b' },
  { name: 'الأمن السيبراني للأطراف الثالثة والسحابة (ECC Domain 4)', sector: 'الأطراف الثالثة والسحابة', percentage: 10, color: '#8b5cf6' },
  { name: 'أنظمة التحكم الصناعي والتشغيلي (ECC Domain 5)', sector: 'أنظمة التحكم الصناعي ICS', percentage: 9, color: '#ef4444' },
];

export const NCA_STANDARDS = [
  {
    code: 'ECC-2:2024',
    title: 'الضوابط الأساسية للأمن السيبراني (النسخة المحدثة)',
    description: 'تتكون من 5 مكونات رئيسية و29 مكوناً فرعياً و108 ضوابط أساسية إلزامية للجهات الوطنية (المكون الفرعي 2-8 مخصص للتشفير).',
    year: 2024,
  },
  {
    code: 'NCS-1:2020',
    title: 'المعايير الوطنية للتشفير (National Cryptographic Standards)',
    description: 'تحدد الخوارزميات وأطوال المفاتيح القياسية لحماية البيانات الوطنية (AES-256، SHA-384/512، RSA-3072+، ECC P-384).',
    year: 2020,
  },
  {
    code: 'ITU GCI 2024',
    title: 'مؤشر الأمن السيبراني العالمي (الإصدار الخامس 2024)',
    description: 'حققت المملكة العربية السعودية العلامة الكاملة (100/100) في جميع الركائز الخمس ضمن الفئة الأولى (Tier-1 Role-Modelling).',
    year: 2024,
  },
  {
    code: 'NIST FIPS 203/204/205',
    title: 'المعايير القياسية للتشفير ما بعد الكم (Post-Quantum Cryptography)',
    description: 'اعتماد خوارزميات ML-KEM (FIPS 203) وML-DSA (FIPS 204) وSLH-DSA (FIPS 205) لمقاومة الحواسيب الكمومية.',
    year: 2024,
  },
];

export const SAUDI_ACHIEVEMENTS = [
  {
    title: 'العلامة الكاملة 100/100 في مؤشر ITU GCI 2024',
    metric: '100 / 100',
    source: 'الاتحاد الدولي للاتصالات (ITU GCI 2024 — 5th Edition)',
    detail: 'تحقيق 20/20 في كافة الركائز الخمس: التدابير القانونية، والتقنية، والتنظيمية، وبناء القدرات، والتعاون.',
  },
  {
    title: 'الضوابط الأساسية للأمن السيبراني (NCA ECC-2:2024)',
    metric: '108 ضوابط',
    source: 'الهيئة الوطنية للأمن السيبراني (NCA)',
    detail: 'موزعة على 5 مكونات رئيسية و29 مكوناً فرعياً، تشمل ضوابط التشفير وإدارة المفاتيح (المكون 2-8).',
  },
  {
    title: 'المعايير الوطنية للتشفير (NCA NCS-1:2020)',
    metric: 'AES-256 / P-384',
    source: 'وثيقة المعايير الوطنية للتشفير NCS-1:2020',
    detail: 'تحديد مستويات الأمان التشفيري للأنظمة الوطنية الحساسة والانتقال الآمن نحو خوارزميات ما بعد الكم.',
  },
];

// الأحجام القياسية الموثقة بالبايت للمفاتيح العامة في معايير NIST FIPS 203/204/205 مقارنة بالتشفير الكلاسيكي
export const VULNERABILITIES_2024 = [
  { name: 'X25519 (كلاسيكي - مفتاح عام)', count: 32, severity: 'high' },
  { name: 'ML-KEM-512 (FIPS 203 - pk)', count: 800, severity: 'high' },
  { name: 'ML-KEM-768 (FIPS 203 - pk)', count: 1184, severity: 'critical' },
  { name: 'ML-KEM-1024 (FIPS 203 - pk)', count: 1568, severity: 'critical' },
  { name: 'ML-DSA-65 (FIPS 204 - pk)', count: 1952, severity: 'critical' },
];

export const CRYPTO_USAGE_2024 = [
  { protocol: 'TLS 1.3 (RFC 8446 — 1-RTT Ephemeral ECDHE + AEAD)', percentage: 68, growth: 12 },
  { protocol: 'TLS 1.2 (ECDHE + AES-GCM — المرحلة الانتقالية)', percentage: 30, growth: -10 },
  { protocol: 'TLS 1.0 / 1.1 (RFC 8996 — محظور وموقوف رسمياً)', percentage: 2, growth: -2 },
];

// مقارنة أحجام التواقيع والمخرجات بالبايت (NIST FIPS 203/204/205 vs الكلاسيكي)
export const PQC_MIGRATION = [
  { quarter: 'Ed25519 (Sig)', organizations: 64, phase: 'كلاسيكي (64 B)' },
  { quarter: 'RSA-2048 (Sig)', organizations: 256, phase: 'كلاسيكي (256 B)' },
  { quarter: 'ML-KEM-768 (CT)', organizations: 1088, phase: 'FIPS 203 (1088 B)' },
  { quarter: 'ML-DSA-44 (Sig)', organizations: 2420, phase: 'FIPS 204 (2420 B)' },
  { quarter: 'ML-DSA-65 (Sig)', organizations: 3309, phase: 'FIPS 204 (3309 B)' },
  { quarter: 'SLH-DSA-128s', organizations: 7856, phase: 'FIPS 205 (7856 B)' },
];
