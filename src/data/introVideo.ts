import { IntroArtId } from '@/components/diagrams/introScenes';

export interface IntroSlide {
  id: string;
  artId: IntroArtId;
  title: string;
  subtitle: string;
  description: string;
  keyPoints: string[];
  duration: number; // in seconds
  icon: string;
  badge: string;
  bgGradient: string;
  accentColor: string;
  image?: string;
  stats?: { label: string; value: string }[];
}

export const INTRO_SLIDES: IntroSlide[] = [
  {
    id: 'welcome',
    artId: 'welcome',
    title: 'مشروع مِرْصَاد التشفير الأكاديمي التدريبي',
    subtitle: 'مشروع أكاديمي تدريبي لطلاب دبلوم أمن المعلومات — شعبة 002م — العام 2026-2027',
    description: 'مشروع أكاديمي تعليمي وتدريبي تطبيقي حقيقي (وليس منصة رسمية) مقدم لمادة التشفير المتقدم (ISE243) في جامعة الأمير مقرن بن عبدالعزيز، مبني بالكامل على بيانات ومعايير علمية وتنظيمية حقيقية موثقة بالمصادر المعتمدة.',
    keyPoints: [
      'مشروع أكاديمي تدريبي حقيقي لمادة التشفير المتقدم (ISE243) — دبلوم أمن المعلومات (شعبة 002م)',
      'بيانات ومعايير حقيقية موثقة بالمصادر بنسبة 100% (NCA ECC-2:2024 / NCS-1:2020 / ITU GCI 2024 / NIST FIPS)',
      'محاكاة رياضية حية لخوارزميات AES-256 و ECC وبراهين المعرفة الصفرية (ZKP) والتشفير ما بعد الكم'
    ],
    duration: 8,
    icon: 'Shield',
    badge: 'ISE243 · شعبة (002م) · (2026-2027)',
    bgGradient: 'from-emerald-900/40 via-slate-900 to-cyan-900/40',
    accentColor: '#10b981',
    stats: [
      { label: 'مقررات أكاديمية', value: '6 مقررات' },
      { label: 'أدوات محاكاة', value: '+35' },
      { label: 'موثوقية المصادر', value: '100%' }
    ]
  },
  {
    id: 'classical-vs-modern',
    artId: 'timeline',
    title: 'من الشفرات التاريخية إلى عصر الكم',
    subtitle: 'رحلة عبر تطور العلوم التشفيرية عبر التاريخ',
    description: 'استكشف التحول التاريخي الهائل من شفرات سيزار والتعويض والروتور إلى خوارزميات التشفير المتناظر والتناظري المعتمدة دولياً.',
    keyPoints: [
      'فهم نقاط الضعف التاريخية وهجمات التكرار والتحليل الترددي',
      'التحول لـ AES و RSA مع البنية التحتية للمفاتيح العامة (PKI)',
      'الاستعداد القومي لتهديدات الحوسبة الكمومية وخوارزمية شور'
    ],
    duration: 9,
    icon: 'History',
    badge: 'التطور التشفيري',
    bgGradient: 'from-blue-900/40 via-slate-900 to-indigo-900/40',
    accentColor: '#3b82f6',
    stats: [
      { label: 'خوارزميات مفسرة', value: '18' },
      { label: 'مخططات زمنية', value: '100%' },
      { label: 'محاكاة رياضية', value: 'تفصيلية' }
    ]
  },
  {
    id: 'zkp-quantum',
    artId: 'zk',
    title: 'براهين المعرفة الصفرية والأمن ما بعد الكم',
    subtitle: 'تقنيات المستقبل لحماية الخصوصية المطلقة',
    description: 'معمل تفاعلي مبتكر للتحقق من صحة البيانات والمعاملات دون الكشف عن أسرارها باستخدام ZK-SNARKs وشبكات الشبيكات التشفيرية (Lattice Cryptography).',
    keyPoints: [
      'تجارب تفاعلية مغلقة للتحقق من المجهول بدون تسريب البيانات',
      'تطبيق معايير NIST للتشفير المقاوم للكم (ML-KEM / ML-DSA)',
      'تطبيقات العملات المعتمدة وسلاسل الكتل الوطنية'
    ],
    duration: 9,
    icon: 'Sparkles',
    badge: 'تقنيات الجيل القادم',
    bgGradient: 'from-amber-900/40 via-slate-900 to-purple-900/40',
    accentColor: '#f59e0b',
    stats: [
      { label: 'مختبر ZKP', value: 'نشط' },
      { label: 'مقاومة الكم', value: '100%' },
      { label: 'بروتوكولات', value: 'zk-SNARKs' }
    ]
  },
  {
    id: 'academics-cert',
    artId: 'certificate',
    title: 'المنظومة الأكاديمية والشهادات الرقمية الموثقة',
    subtitle: 'مسارات تعليمية واختبارات قياسية مع شهادات تشفيرية',
    description: 'نظام تقييم متكامل يمنح شهادات إتمام موثقة برمز استجابة سريع (QR Code) وبصمة تشفيرية رقمية غير قابلة للتزوير.',
    keyPoints: [
      'اختبارات شاملة ومباشرة مع تحليل الأداء والنقاط القوية والضعيفة',
      'توليد وتصدير شهادات PDF رسمية بدقة عالية وبصمة SHA-256',
      'دليل فريق العمل الطلابي ولوحة تصنيف التميّز'
    ],
    duration: 10,
    icon: 'GraduationCap',
    badge: 'التقييم والتوثيق',
    bgGradient: 'from-emerald-900/40 via-slate-900 to-teal-900/40',
    accentColor: '#10b981',
    stats: [
      { label: 'بصمة الشهادة', value: 'SHA-256' },
      { label: 'تحقيق QR', value: 'فوري' },
      { label: 'تصدير PDF', value: 'مستمر' }
    ]
  },
  {
    id: 'nca-governance',
    artId: 'governance',
    title: 'الامتثال للأمن السيبراني والتحصين الشامل',
    subtitle: 'حماية البيانات النسخ الاحتياطي المشفر وربط ضوابط NCA',
    description: 'إدارة متقدمة للنسخ الاحتياطي المشفر بكلمات سر خوارزمية AES-GCM وحماية سرية بيانات المتعلمين والمحتوى.',
    keyPoints: [
      'تصدير واسترجاع نسخ احتياطية مشفرة بكلمة مرور',
      'تتبع التزام الضوابط NCA ECC-2:2024 عبر جميع مكونات المنصة',
      'دعم PWA والعمل بدون اتصال بالإنترنت بالكامل'
    ],
    duration: 8,
    icon: 'Lock',
    badge: 'السيادة والامتثال',
    bgGradient: 'from-cyan-900/40 via-slate-900 to-blue-900/40',
    accentColor: '#06b6d4',
    stats: [
      { label: 'تشفير النسخ', value: 'AES-256' },
      { label: 'امتثال NCA', value: '100%' },
      { label: 'دعم PWA', value: 'مفعل' }
    ]
  }
];
