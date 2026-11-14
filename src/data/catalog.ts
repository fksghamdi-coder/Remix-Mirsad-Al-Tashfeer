// src/data/catalog.ts
// طبقة البيانات الموثقة: كل معلومة سعودية في المنصة تمر من هنا بمصدر وتاريخ تحقق ودرجة ثقة.
// القاعدة: لا يُعرض رقم بلا مصدر. تاريخ آخر تحقق: ACCESSED.
// المصادر الرسمية = موقع الجهة نفسها. «ثانوي» = جهة مهنية أو صحافة تنقل عن الجهة الرسمية.

export const ACCESSED = 'العام الأكاديمي (2026-2027)';

export type Confidence = 'official' | 'secondary';

export interface Source {
  id: string;
  title: string;
  publisher: string;
  url: string;
  kind: Confidence;
  published?: string;
}

export interface Fact {
  id: string;
  group: 'index' | 'controls' | 'crypto' | 'pqc';
  title: string;
  value?: string;
  text: string;
  asOf: string;
  sourceIds: string[];
  confidence: Confidence;
  /** ملاحظة تحقق مطلوبة قبل الاعتماد (تظهر للمستخدم) */
  verifyNote?: string;
}

export const SOURCES: Source[] = [
  {
    id: 'nca-gci2024',
    title: 'خبر الهيئة عن نتيجة المملكة في المؤشر العالمي للأمن السيبراني 2024',
    publisher: 'الهيئة الوطنية للأمن السيبراني (NCA)',
    url: 'https://nca.gov.sa/en/news/1486/',
    kind: 'official',
  },
  {
    id: 'nca-ncs',
    title: 'المعايير الوطنية للتشفير (NCS)',
    publisher: 'الهيئة الوطنية للأمن السيبراني (NCA)',
    url: 'https://nca.gov.sa/en/regulatory-documents/frameworks-and-standard-list/ncs/',
    kind: 'official',
    published: '2022-06-02 (تاريخ الصفحة) · آخر تحديث 2025-05-16',
  },
  {
    id: 'clydeco-ecc2',
    title: "Saudi Arabia's Essential Cybersecurity Controls 2024 (ECC-2): Key Updates and Implications",
    publisher: 'Clyde & Co (مكتب محاماة دولي)',
    url: 'https://www.clydeco.com/en/insights/2025/01/saudi-arabia-essential-cybersecurity-controls',
    kind: 'secondary',
    published: '2025-01-16',
  },
  {
    id: 'economyme-imd2025',
    title: 'Saudi Arabia maintains top position in global IMD cybersecurity ranking in 2025',
    publisher: 'Economy Middle East (تقرير صحفي)',
    url: 'https://economymiddleeast.com/news/saudi-arabia-maintains-top-position-in-global-imd-cybersecurity-ranking-in-2025',
    kind: 'secondary',
    published: '2025',
  },
  {
    id: 'entrust-ncs',
    title: 'NCA Compliance Standards’ Impact on Resilience, Growth, Prosperity to Saudi Cyberspace',
    publisher: 'Entrust (شركة أمن معلومات)',
    url: 'https://www.entrust.com/ja/blog/2025/11/nca-compliance-standards-impact-on-resilience-growth-prosperity-to-saudi-cyberspace',
    kind: 'secondary',
    published: '2025-11',
  },
  {
    id: 'nist-fips203',
    title: 'FIPS 203: Module-Lattice-Based Key-Encapsulation Mechanism Standard (ML-KEM)',
    publisher: 'NIST',
    url: 'https://csrc.nist.gov/pubs/fips/203/final',
    kind: 'official',
    published: '2024-08-13',
  },
  {
    id: 'nist-fips204',
    title: 'FIPS 204: Module-Lattice-Based Digital Signature Standard (ML-DSA)',
    publisher: 'NIST',
    url: 'https://csrc.nist.gov/pubs/fips/204/final',
    kind: 'official',
    published: '2024-08-13',
  },
  {
    id: 'nist-fips205',
    title: 'FIPS 205: Stateless Hash-Based Digital Signature Standard (SLH-DSA)',
    publisher: 'NIST',
    url: 'https://csrc.nist.gov/pubs/fips/205/final',
    kind: 'official',
    published: '2024-08-13',
  },
  {
    id: 'enc-pqc',
    title: 'PQC Standardization: FIPS 203, 204, 205 (ملخص تاريخ الإصدار)',
    publisher: 'Encryption Consulting (شركة استشارات)',
    url: 'https://www.encryptionconsulting.com/education-center/pqcs-standardization/',
    kind: 'secondary',
  },
  {
    id: 'rfc6928',
    title: "RFC 6928: Increasing TCP's Initial Window",
    publisher: 'IETF (تجريبي)',
    url: 'https://www.rfc-editor.org/info/rfc6928',
    kind: 'official',
    published: '2013-04',
  },
  {
    id: 'rfc7748',
    title: 'RFC 7748: Elliptic Curves for Security (X25519 / X448)',
    publisher: 'IETF',
    url: 'https://www.rfc-editor.org/info/rfc7748',
    kind: 'official',
    published: '2016-01',
  },
  {
    id: 'rfc8032',
    title: 'RFC 8032: Edwards-Curve Digital Signature Algorithm (EdDSA)',
    publisher: 'IETF',
    url: 'https://www.rfc-editor.org/info/rfc8032',
    kind: 'official',
    published: '2017-01',
  },
  {
    id: 'nist-sp80057',
    title: 'SP 800-57 Part 1 Rev. 5: Recommendation for Key Management',
    publisher: 'NIST',
    url: 'https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final',
    kind: 'official',
    published: '2020-05',
  },
  {
    id: 'dpa-ncs2',
    title: 'NCA closed public consultation on updates to the National Cryptography Standards (NCS-2:2025)',
    publisher: 'Digital Policy Alert (مرصد سياسات رقمية)',
    url: 'https://digitalpolicyalert.org/event/36914-national-cybersecurity-authority-closed-public-consultation-on-updates-to-the-national-cryptography-standards-ncs-22025',
    kind: 'secondary',
    published: '2025-12-25',
  },
];

export const FACTS: Fact[] = [
  {
    id: 'gci-tier1',
    group: 'index',
    title: 'المؤشر العالمي للأمن السيبراني (GCI) — الطبعة الخامسة',
    value: '100 / 100',
    text: 'صُنّفت المملكة ضمن المستوى الأول («نموذج يُحتذى») في طبعة 2024 من مؤشر الاتحاد الدولي للاتصالات، بالدرجة الكاملة.',
    asOf: '2024',
    sourceIds: ['nca-gci2024'],
    confidence: 'official',
  },
  {
    id: 'gci-pillars',
    group: 'index',
    title: 'ركائز المؤشر الخمس',
    value: '20 / 20 لكل ركيزة',
    text: 'نالت المملكة الدرجة الكاملة في كل ركيزة من ركائز المؤشر الخمس.',
    asOf: '2024',
    sourceIds: ['nca-gci2024'],
    confidence: 'official',
  },
  {
    id: 'imd-2025',
    group: 'index',
    title: 'مؤشر الأمن السيبراني ضمن تصنيف IMD',
    value: 'المركز الأول',
    text: 'تحتفظ المملكة بالمركز الأول عالمياً في مؤشر الأمن السيبراني ضمن تصنيف IMD لعام 2025.',
    asOf: '2025',
    sourceIds: ['economyme-imd2025'],
    confidence: 'secondary',
    verifyNote: 'المصدر تقرير صحفي؛ راجع تقرير IMD الأصلي قبل الاستشهاد الأكاديمي.',
  },
  {
    id: 'ecc2-controls',
    group: 'controls',
    title: 'الضوابط الأساسية للأمن السيبراني ECC-2:2024',
    value: '114 ← 108 ضابطاً',
    text: 'تبني ECC-2 على ECC-1:2018 وتخفض عدد الضوابط من 114 إلى 108 لتبسيط التطبيق، وتوحّد المتطلبات المتداخلة مع وثائق تنظيمية أخرى.',
    asOf: '2024',
    sourceIds: ['clydeco-ecc2'],
    confidence: 'secondary',
  },
  {
    id: 'ecc2-localization',
    group: 'controls',
    title: 'توطين البيانات في ECC-2',
    text: 'أُزيلت من ECC-2 المتطلبات الصريحة لاستضافة البيانات داخل المملكة، ونُقلت مرجعيتها إلى مكتب إدارة البيانات الوطنية (NDMO) في الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا).',
    asOf: '2024',
    sourceIds: ['clydeco-ecc2'],
    confidence: 'secondary',
  },
  {
    id: 'ecc2-saudization',
    group: 'controls',
    title: 'التوطين الوظيفي في ECC-2',
    text: 'كانت ECC-1 تشترط المناصب القيادية فقط؛ وتشترط ECC-2 أن تُشغَل جميع وظائف الأمن السيبراني بمختصين سعوديين مؤهلين بدوام كامل.',
    asOf: '2024',
    sourceIds: ['clydeco-ecc2'],
    confidence: 'secondary',
  },
  {
    id: 'ncs-structure',
    group: 'crypto',
    title: 'المعايير الوطنية للتشفير (NCS)',
    value: 'مستويان: متوسط ومتقدم',
    text: 'الهيئة مكلفة بصياغة السياسات والمعايير الوطنية للتشفير ومراجعتها دورياً. تحدد المعايير مستويين للقوة والأمان (MODERATE وADVANCED)، وتشمل الأوليات المتماثلة وغير المتماثلة والبروتوكولات التطبيقية وبنية المفتاح العام (PKI) وإدارة دورة حياة المفاتيح، وملاحق عن توليد الأرقام العشوائية والتشفير ما بعد الكم وهجمات القنوات الجانبية.',
    asOf: '2025-05-16',
    sourceIds: ['nca-ncs'],
    confidence: 'official',
  },
  {
    id: 'ncs-1-2020',
    group: 'crypto',
    title: 'الإصدار الأول من المعايير',
    value: 'NCS-1:2020',
    text: 'صدر الإصدار الأول من المعايير الوطنية للتشفير بتسمية NCS-1:2020.',
    asOf: '2020',
    sourceIds: ['entrust-ncs'],
    confidence: 'secondary',
    verifyNote: 'التسمية والسنة من مصدر ثانوي؛ تأكد من غلاف الوثيقة (nca.gov.sa/ncs_en.pdf).',
  },
  {
    id: 'pqc-final-2024',
    group: 'pqc',
    title: 'معايير التشفير ما بعد الكم الأولى',
    value: '13 أغسطس 2024',
    text: 'أصدر NIST ثلاثة معايير نهائية: FIPS 203 (ML-KEM) لتبادل المفاتيح، وFIPS 204 (ML-DSA) وFIPS 205 (SLH-DSA) للتواقيع الرقمية.',
    asOf: '2024-08-13',
    sourceIds: ['nist-fips203', 'nist-fips204', 'nist-fips205', 'enc-pqc'],
    confidence: 'secondary',
    verifyNote: 'التاريخ مؤكد من عدة مصادر ثانوية؛ لم تُفتح صفحات NIST نفسها في هذه المراجعة، وروابطها هي المرجع.',
  },
  {
    id: 'classical-sizes',
    group: 'pqc',
    title: 'أحجام المفاتيح الكلاسيكية',
    text: 'مفتاح X25519 وحصته 32 بايتاً (RFC 7748). مفتاح Ed25519 العام 32 بايتاً وتوقيعه 64 بايتاً (RFC 8032).',
    asOf: '2016–2017',
    sourceIds: ['rfc7748', 'rfc8032'],
    confidence: 'official',
    verifyNote: 'قيم معروفة من نصي المعيارين؛ لم تُفتح نصوصهما في هذه المراجعة.',
  },
  {
    id: 'strength-sp80057',
    group: 'pqc',
    title: 'قوة الأمان التقريبية للأنظمة الكلاسيكية',
    text: 'تُقدَّر قوة RSA-2048 بنحو 112 بتاً، وقوة ECC بمفتاح 256 بتاً ونحو 128 بتاً، وفق جدول قوة الأمان في SP 800-57.',
    asOf: '2020',
    sourceIds: ['nist-sp80057'],
    confidence: 'official',
    verifyNote: 'القيم من جدول قوة الأمان المعروف في المعيار؛ لم يُفتح النص في هذه المراجعة.',
  },
  {
    id: 'tcp-iw10',
    group: 'pqc',
    title: 'النافذة الابتدائية لـ TCP',
    value: '10 مقاطع (حتى 14600 بايت)',
    text: 'يقترح RFC 6928 (تجريبي) رفع الحد الأعلى للنافذة الابتدائية إلى 10 مقاطع، بحد أقصى 14600 بايت، بحسب حجم MSS.',
    asOf: '2013-04',
    sourceIds: ['rfc6928'],
    confidence: 'official',
  },
  {
    id: 'ncs-2-2025',
    group: 'crypto',
    title: 'تحديث المعايير (NCS-2:2025)',
    value: 'أُغلقت الاستشارة 25-12-2025',
    text: 'طرحت الهيئة تحديثات المعايير الوطنية للتشفير للاستشارة العامة، وأُغلقت الاستشارة بتاريخ 25 ديسمبر 2025.',
    asOf: '2025-12-25',
    sourceIds: ['dpa-ncs2'],
    confidence: 'secondary',
    verifyNote: 'لا يثبت المصدر صدور نسخة نهائية؛ راجع موقع الهيئة قبل اعتبارها سارية.',
  },
];

export const getSource = (id: string) => SOURCES.find((s) => s.id === id);
export const factsBySource = (id: string) => FACTS.filter((f) => f.sourceIds.includes(id));
