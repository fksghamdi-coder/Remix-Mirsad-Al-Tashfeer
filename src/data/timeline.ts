export type TimelineCategory = 'تاريخي' | 'عالمي' | 'السعودية' | 'كمومي';

export interface TimelineEvent {
  year: number;
  title: string;
  category: TimelineCategory;
  description: string;
  source?: string;
  icon: 'lock' | 'shield' | 'globe' | 'cpu' | 'flag' | 'award' | 'book';
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  // ===== الأساس الكلاسيكي =====
  {
    year: 44,
    title: 'شيفرة قيصر',
    category: 'تاريخي',
    icon: 'book',
    description:
      'يوليوس قيصر يستخدم إزاحة حروف بسيطة في مراسلاته العسكرية. أول شيفرة استبدال موثقة.',
  },
  {
    year: 1553,
    title: 'شيفرة فيجينير',
    category: 'تاريخي',
    icon: 'book',
    description: 'بليز دي فيجينير ينشر شيفرة تعدد الأبجدية، صمدت 300 عام قبل كسرها.',
  },
  {
    year: 1918,
    title: 'آلة إنجما',
    category: 'تاريخي',
    icon: 'lock',
    description:
      'ألمانيا تعتمد آلة إنجما في الحرب العالمية الثانية. كسرها في Bletchley Park (بقيادة Alan Turing) غيّر مجرى الحرب.',
  },
  {
    year: 1949,
    title: 'نظرية شانون للسرية',
    category: 'تاريخي',
    icon: 'book',
    description:
      'كلود شانون ينشر "Communication Theory of Secrecy Systems" — الأساس النظري للتشفير الحديث.',
  },
  {
    year: 1976,
    title: 'Diffie-Hellman',
    category: 'عالمي',
    icon: 'globe',
    description:
      'Whitfield Diffie وMartin Hellman يقدمان أول بروتوكول تبادل مفاتيح بالمفتاح العام.',
  },
  {
    year: 1977,
    title: 'RSA',
    category: 'عالمي',
    icon: 'lock',
    description:
      'Rivest وShamir وAdleman يقدمون خوارزمية RSA، أساس كل توقيع رقمي حديث حتى 2024.',
  },
  {
    year: 1977,
    title: 'معيار DES',
    category: 'عالمي',
    icon: 'shield',
    description: 'NIST يعتمد DES (FIPS 46) كأول معيار تشفير حكومي أمريكي. مفتاح 56 بت.',
  },
  {
    year: 1985,
    title: 'المنحنيات الإهليلجية',
    category: 'عالمي',
    icon: 'globe',
    description:
      'Neal Koblitz وVictor Miller يقترحان استخدام المنحنيات الإهليلجية في التشفير (ECC).',
  },
  {
    year: 1991,
    title: 'PGP',
    category: 'عالمي',
    icon: 'lock',
    description:
      'Phil Zimmermann يطلق Pretty Good Privacy — أول تشفير بريد إلكتروني مفتوح المصدر.',
  },
  {
    year: 1994,
    title: 'خوارزمية شور',
    category: 'كمومي',
    icon: 'cpu',
    description:
      'Peter Shor يثبت أن الحاسوب الكمومي يستطيع كسر RSA وECC في وقت متعدد الحدود.',
  },
  {
    year: 1996,
    title: 'خوارزمية جروف',
    category: 'كمومي',
    icon: 'cpu',
    description:
      'Lov Grover يقدم خوارزمية تربيع سرعة البحث الكمومي. تخفض أمان AES إلى نصف عدد البتات.',
  },
  {
    year: 1999,
    title: 'TLS 1.0',
    category: 'عالمي',
    icon: 'globe',
    source: 'RFC 2246',
    description: 'IETF يصدر TLS 1.0 كخليفة لـ SSL 3.0، ويصبح معيار أمان الويب.',
  },
  {
    year: 2001,
    title: 'معيار AES',
    category: 'عالمي',
    icon: 'shield',
    source: 'FIPS 197',
    description: 'NIST يعتمد AES (Rijndael) بديلاً لـ DES. مفتاح 128/192/256 بت.',
  },

  // ===== السعودية =====
  {
    year: 2017,
    title: 'إنشاء الهيئة الوطنية للأمن السيبراني (NCA)',
    category: 'السعودية',
    icon: 'flag',
    description:
      'أمر ملكي بإنشاء NCA لتعزيز الفضاء السيبراني السعودي، برئاسة مجلس إدارة يرأسه ولي العهد.',
  },
  {
    year: 2018,
    title: 'TLS 1.3',
    category: 'عالمي',
    icon: 'globe',
    source: 'RFC 8446',
    description:
      'TLS 1.3 يُصدر — مصافحة أسرع، إجبارية السرية الأمامية، وإلغاء الخوارزميات القديمة.',
  },
  {
    year: 2018,
    title: 'الضوابط الأساسية ECC-1:2018',
    category: 'السعودية',
    icon: 'shield',
    description:
      'NCA تصدر الضوابط الأساسية للأمن السيبراني (ECC) — إلزامية لجميع الجهات الحكومية.',
  },
  {
    year: 2019,
    title: 'المرتبة الأولى عالمياً (GCI)',
    category: 'السعودية',
    icon: 'award',
    description: 'المملكة تحقق المرتبة الأولى في مؤشر الأمن السيبراني العالمي (ITU-GCI).',
  },
  {
    year: 2020,
    title: 'الضوابط الحرجة CSCC',
    category: 'السعودية',
    icon: 'shield',
    description:
      'NCA تصدر الضوابط الحرجة للأنظمة الحساسة (CSCC) وضوابط التقنية التشغيلية (OTCC).',
  },
  {
    year: 2021,
    title: 'الاستراتيجية الوطنية للأمن السيبراني',
    category: 'السعودية',
    icon: 'flag',
    description: 'إطلاق الاستراتيجية الشاملة لبناء فضاء سيبراني سعودي آمن ومزدهر.',
  },
  {
    year: 2022,
    title: 'معايير SAMA CSF المحدثة',
    category: 'السعودية',
    icon: 'shield',
    description: 'البنك المركزي السعودي (SAMA) يحدّث إطار الأمن السيبراني للقطاع المالي.',
  },
  {
    year: 2023,
    title: 'المملكة تحتفظ بالمرتبة الأولى',
    category: 'السعودية',
    icon: 'award',
    description: 'السعودية تحافظ على المرتبة الأولى عالمياً في مؤشر GCI لثلاث سنوات.',
  },
  {
    year: 2024,
    title: 'سوق الأمن السيبراني 15.2 مليار ريال',
    category: 'السعودية',
    icon: 'award',
    description:
      'نمو السوق السعودي بنسبة 14% ليصل إلى 15.2 مليار ريال، مع 21.3 ألف مختص.',
  },

  // ===== المعايير الكمومية =====
  {
    year: 2015,
    title: 'مسابقة NIST PQC',
    category: 'كمومي',
    icon: 'cpu',
    description:
      'NIST تطلق مسابقة عالمية لتوحيد خوارزميات مقاومة للحوسبة الكمومية. 82 مرشحاً أولياً.',
  },
  {
    year: 2020,
    title: 'الجولة الثالثة من PQC',
    category: 'كمومي',
    icon: 'cpu',
    description:
      'NIST تختار 15 مرشحاً للجولة الثالثة، وتقلص المسابقة للخوارزميات النهائية.',
  },
  {
    year: 2022,
    title: 'اختيار الفائزين الأوائل',
    category: 'كمومي',
    icon: 'cpu',
    description:
      'NIST تختار CRYSTALS-Kyber (KEM) وCRYSTALS-Dilithium وFALCON وSPHINCS+ (توقيعات).',
  },
  {
    year: 2023,
    title: 'NIST يختار HQC',
    category: 'كمومي',
    icon: 'cpu',
    description: 'NIST تختار HQC كبديل احتياطي لـ ML-KEM لتوفير تنوع رياضي.',
  },
  {
    year: 2024,
    title: 'FIPS 203/204/205',
    category: 'كمومي',
    icon: 'shield',
    source: 'NIST Aug 13',
    description:
      'إصدار نهائي لمعايير ML-KEM (203) وML-DSA (204) وSLH-DSA (205). نهاية حقبة انتقالية.',
  },
  {
    year: 2030,
    title: 'CNSA 2.0 (استهدف NSA)',
    category: 'كمومي',
    icon: 'cpu',
    description:
      'الجدول الزمني للـ NSA للانتقال الكامل إلى PQC في الأنظمة الوطنية الأمنية.',
  },
];
