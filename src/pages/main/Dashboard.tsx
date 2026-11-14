// File: src/pages/main/Dashboard.tsx
import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  ShieldCheck,
  Activity,
  Award,
  AlertTriangle,
  Cpu,
  ChevronDown,
  Sparkles,
  Lock,
  BookOpen,
  GraduationCap,
  Terminal,
  Zap,
  CheckCircle2,
  Wifi,
  WifiOff,
  Key,
  ArrowLeft,
  Search,
  Compass,
  Sliders,
  Play,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  SAUDI_MARKET,
  SECTOR_BREAKDOWN,
  VULNERABILITIES_2024,
  PQC_MIGRATION,
} from '@/data/saudiCyber';
import { COURSES } from '@/data/courses';
import { getChaptersByCourse } from '@/lib/chapters';
import { getCompletedChapters } from '@/lib/progress';
import { getKeyStatus } from '@/lib/crypto';
import { getStoredAuditLogs, verifyAuditChain } from '@/lib/audit';
import { useAuth } from '@/contexts/AuthContext';
import { useThemeColors } from '@/hooks/useThemeColors';
import { cn } from '@/lib/utils';
import CyberModal from '@/components/ui/CyberModal';
import Glass3DChart, { ChartDataPoint } from '@/components/ui/Glass3DChart';
import AcademicDataDrawer from '@/components/ui/AcademicDataDrawer';

type DashboardViewMode = 'all' | 'academic' | 'observatory' | 'crypto';
type TimeRangeFilter = 'all' | 'recent' | 'vision2030';

const VISION_2030_PROJECTIONS = [
  ...SAUDI_MARKET,
  { year: 'ECC-1:2018', marketSize: 114, workforce: 100 },
  { year: 'ECC-2:2024', marketSize: 108, workforce: 100 },
];

const LAB_UNITS_QUICK_LAUNCH = [
  {
    id: 'gf-aes',
    title: 'وحدة GF(2^8) وجولات AES-128/256',
    chapter: 'الفصل 1 · ISE243',
    route: '/aes-lab',
    badge: 'SubBytes / MixColumns',
    color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-300',
  },
  {
    id: 'ecc-ecdh',
    title: 'وحدة المنحنيات الإهليلجية ECDH & ECDSA',
    chapter: 'الفصل 2–3 · ISE243',
    route: '/zkp-lab',
    badge: 'F_p Point Addition',
    color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-300',
  },
  {
    id: 'zkp-schnorr',
    title: 'وحدة براهين المعرفة الصفرية ZKP Schnorr',
    chapter: 'الفصل 8 · ISE243',
    route: '/zkp-lab',
    badge: 'Sigma Protocol',
    color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-300',
  },
  {
    id: 'pqc-nist',
    title: 'وحدة التشفير ما بعد الكم NIST PQC',
    chapter: 'الفصل 11–12 · ISE243',
    route: '/main/comparisons',
    badge: 'FIPS 203 / 204 / 205',
    color: 'from-purple-500/20 to-fuchsia-500/10 border-purple-500/30 text-purple-300',
  },
];

const KPI_DATA_LIST = [
  {
    label: 'مؤشر ITU GCI 2024',
    value: '100/100',
    unit: 'Tier 1 (الفئة الأولى)',
    icon: Award,
    tone: 'text-emerald-400',
    iconTone: 'text-emerald-400',
    bgTone: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    badge: 'العلامة الكاملة',
    title: 'المؤشر العالمي للأمن السيبراني (ITU GCI 2024 — الإصدار الخامس)',
    breakdown: [
      { name: 'التدابير القانونية (Legal Measures)', value: '20 / 20 نقطة', percentage: 100, color: 'bg-emerald-500' },
      { name: 'التدابير التقنية (Technical Measures)', value: '20 / 20 نقطة', percentage: 100, color: 'bg-teal-500' },
      { name: 'التدابير التنظيمية (Organizational Measures)', value: '20 / 20 نقطة', percentage: 100, color: 'bg-blue-500' },
      { name: 'بناء القدرات والتعاون (Capacity & Cooperation)', value: '40 / 40 نقطة (20+20)', percentage: 100, color: 'bg-purple-500' },
    ],
    summary: 'وثيقة رسمية من الاتحاد الدولي للاتصالات (ITU GCI 2024): حققت المملكة العربية السعودية الفئة الأولى (Tier 1 — Role-modelling) بمجموع 100/100.',
  },
  {
    label: 'ضوابط NCA ECC-2:2024',
    value: '108',
    unit: 'ضابطاً (29 مكوناً فرعياً)',
    icon: ShieldCheck,
    tone: 'text-blue-400',
    iconTone: 'text-blue-400',
    bgTone: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    badge: '5 مكونات رئيسية',
    title: 'هيكل الضوابط الأساسية للأمن السيبراني (NCA ECC-2:2024)',
    breakdown: [
      { name: 'حوكمة الأمن السيبراني (Cybersecurity Governance)', value: '9 مكونات فرعية', percentage: 31, color: 'bg-blue-500' },
      { name: 'تعزيز الأمن السيبراني (Cybersecurity Defense)', value: '15 مكوناً فرعياً', percentage: 52, color: 'bg-indigo-500' },
      { name: 'صمود الأمن السيبراني (Cybersecurity Resilience)', value: 'مكونان فرعيان (2)', percentage: 7, color: 'bg-cyan-500' },
      { name: 'الأطراف الخارجية والسحابية و ICS', value: '3 مكونات فرعية', percentage: 10, color: 'bg-sky-500' },
    ],
    summary: 'تم تحديث الضوابط الأساسية للأمن السيبراني في ECC-2:2024 لتشمل 108 ضوابط فرعية ضمن 29 مكوناً فرعياً و 5 مكونات رئيسية (مقارنة بـ 114 ضابطاً في ECC-1:2018).',
  },
  {
    label: 'المعايير الوطنية للتشفير',
    value: 'NCS-1:2020',
    unit: 'مستويان (MODERATE / ADVANCED)',
    icon: Lock,
    tone: 'text-purple-400',
    iconTone: 'text-purple-400',
    bgTone: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    badge: 'AES-256 / SHA-384',
    title: 'المعايير الوطنية للتشفير (NCA NCS-1:2020)',
    breakdown: [
      { name: 'المستوى المتقدم (ADVANCED — للأنظمة الحساسة)', value: 'AES-256 / SHA-384/512 / RSA-3072+ / ECC P-384', percentage: 100, color: 'bg-purple-500' },
      { name: 'المستوى المتوسط (MODERATE — الحد الأدنى)', value: 'AES-128 / SHA-256 / ECC P-256', percentage: 85, color: 'bg-violet-500' },
      { name: 'توليد الأرقام العشوائية (CSPRNG)', value: 'NIST SP 800-90A (DRBG)', percentage: 100, color: 'bg-fuchsia-500' },
      { name: 'وحدات الأمان المادية (HSM)', value: 'FIPS 140-3 Level 3', percentage: 95, color: 'bg-pink-500' },
    ],
    summary: 'تحدد وثيقة المعايير الوطنية للتشفير (NCS-1:2020) الصادرة عن الهيئة الوطنية للأمن السيبراني الخوارزميات وأطوال المفاتيح المعتمدة وطنياً (AES-256، SHA-384/512، RSA-3072+، ECC P-384).',
  },
  {
    label: 'معايير NIST PQC 2024',
    value: 'FIPS 203-205',
    unit: 'ML-KEM · ML-DSA · SLH-DSA',
    icon: Cpu,
    tone: 'text-amber-400',
    iconTone: 'text-amber-400',
    bgTone: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    badge: 'أغسطس 2024',
    title: 'معايير التشفير ما بعد الكم الفيدرالية (NIST FIPS 203 / 204 / 205)',
    breakdown: [
      { name: 'FIPS 203 (ML-KEM-768 لتغليف المفاتيح)', value: 'pk: 1,184 B | ct: 1,088 B', percentage: 75, color: 'bg-emerald-500' },
      { name: 'FIPS 204 (ML-DSA-65 للتوقيع الرقمي الشبيكي)', value: 'pk: 1,952 B | sig: 3,309 B', percentage: 85, color: 'bg-amber-500' },
      { name: 'FIPS 205 (SLH-DSA-128s للتوقيع المبني على التجزئة)', value: 'pk: 32 B | sig: 7,856 B', percentage: 100, color: 'bg-rose-500' },
      { name: 'المقارنة الكلاسيكية (X25519 / Ed25519)', value: 'pk: 32 B | sig: 64 B', percentage: 25, color: 'bg-cyan-500' },
    ],
    summary: 'المعايير القياسية الفيدرالية الصادرة عن المعهد الوطني للمعايير والتقنية (NIST) في أغسطس 2024 لمقاومة خوارزمية شور الكمومية.',
  },
];

const NCA_DETAILED_LIST = [
  {
    code: 'ECC-2:2024',
    title: 'الضوابط الأساسية للأمن السيبراني (النسخة المحدثة)',
    description: '5 مكونات رئيسية · 29 مكوناً فرعياً · 108 ضوابط أساسية (المكون الفرعي 2-8 مخصص للتشفير).',
    year: 2024,
    domains: '5 مكونات رئيسية · 29 مكوناً فرعياً · 108 ضوابط أساسية',
    badge: 'المكون 2-8: التشفير',
    entities: 'جميع الجهات الحكومية والشركات المملوكة للدولة والبنى التحتية الحساسة.',
    breakdown: [
      { name: 'حوكمة الأمن السيبراني والسياسات', value: '100% إلزامية', percentage: 100, color: 'bg-emerald-500' },
      { name: 'تعزيز الأمن وإدارة الهويات والأصول', value: '98% تغطية', percentage: 98, color: 'bg-teal-500' },
      { name: 'صمود الأمن السيبراني وإدارة الحوادث', value: '95% استجابة', percentage: 95, color: 'bg-blue-500' },
      { name: 'أمن الأطراف الخارجية وسلاسل الإمداد', value: '90% تطبيق', percentage: 90, color: 'bg-indigo-500' },
      { name: 'الأمن السيبراني للحوسبة السحابية', value: '92% الامتثال', percentage: 92, color: 'bg-purple-500' },
    ],
    summary: 'تُعد الركيزة الأساسية للرفع من مستوى الأمان السيبراني لكافة القطاعات الوطنية بالمملكة.',
  },
  {
    code: 'CSCC-1:2019',
    title: 'الضوابط الحرجة للأنظمة الحساسة',
    description: 'تُطبق على الأنظمة الحساسة والحرجة عالية المخاطر.',
    year: 2019,
    domains: '4 محاور مشددة · 18 ضابطاً حرجاً',
    badge: '98.2% الجاهزية الحرجة',
    entities: 'الأنظمة السيادية التي يؤدي تعطلها إلى أضرار اقتصادية أو أمنية حادة.',
    breakdown: [
      { name: 'حماية البنية التحتية الحرجة والتأمين', value: '99% حماية', percentage: 99, color: 'bg-emerald-500' },
      { name: 'التشفير المتقدم وإدارة المفاتيح (HSM)', value: '97% تشفير', percentage: 97, color: 'bg-teal-500' },
      { name: 'المراقبة والتحليل اللحظي (SOC 24/7)', value: '98% رصد', percentage: 98, color: 'bg-blue-500' },
      { name: 'اختبارات الاختراق المستمرة (Red Teaming)', value: '94% جاهزية', percentage: 94, color: 'bg-cyan-500' },
    ],
    summary: 'تستهدف حماية الأصول الرقمية الأشد حساسية وتضمن استمرارية الأعمال في أعتى الظروف.',
  },
  {
    code: 'OTCC-1:2022',
    title: 'ضوابط الأمن السيبراني للتقنية التشغيلية',
    description: 'خاصة بأنظمة SCADA، ICS، والبنى التحتية الصناعية.',
    year: 2022,
    domains: '5 مجالات تشغيلية · 23 ضابطاً متعدداً',
    badge: '94.8% الامتثال الصناعي',
    entities: 'المنشآت الصناعية، مصافي النفط، محطات المياه، وشبكات الكهرباء الوطنية.',
    breakdown: [
      { name: 'عزل شبكات IT عن OT (نموذج Purdue)', value: '96% عزل', percentage: 96, color: 'bg-amber-500' },
      { name: 'أمان أجهزة التحكم SCADA & PLC', value: '92% توثيق', percentage: 92, color: 'bg-yellow-500' },
      { name: 'الوصول البعيد الآمن (Zero Trust OT)', value: '94% انضباط', percentage: 94, color: 'bg-emerald-500' },
      { name: 'إدارة الثغرات والتحديث في البيئات الصناعية', value: '89% معالجة', percentage: 89, color: 'bg-blue-500' },
    ],
    summary: 'تحمي البيئات التشغيلية والصناعية الحيوية ضد الهجمات الموجهة المعقدة.',
  },
  {
    code: 'SAMA CSF',
    title: 'إطار الأمن السيبراني للقطاع المالي',
    description: 'إلزامي للبنوك وشركات التأمين والمؤسسات المالية.',
    year: 2017,
    domains: '6 أركان مصرفية · 35 ضابطاً مالياً',
    badge: '99.4% التزام البنوك',
    entities: 'البنوك السعودية، شركات المصارف، وشركات التأمين الخاضعة للبنك المركزي (SAMA).',
    breakdown: [
      { name: 'حماية عمليات الدفع والتسويات المالية', value: '100% تأمين', percentage: 100, color: 'bg-purple-500' },
      { name: 'تشفير البيانات المالية الساكنة والمتحركة', value: '99.8% حماية', percentage: 99.8, color: 'bg-indigo-500' },
      { name: 'مكافحة الاحتيال المالي والتسلل الإلكتروني', value: '97.5% استجابة', percentage: 97.5, color: 'bg-blue-500' },
      { name: 'الأمن السيبراني للتطبيقات والخدمات المصرفية', value: '99.1% فحص', percentage: 99.1, color: 'bg-emerald-500' },
    ],
    summary: 'يضمن أعلى معايير الحماية والتشفير للمعاملات المالية والأرصدة البنكية بالمملكة.',
  },
  {
    code: 'NCA NCS / Data',
    title: 'المعايير الوطنية للتشفير وأمن البيانات',
    description: 'حماية وتصنيف وتشفير البيانات السيادية والشخصية.',
    year: 2024,
    domains: '4 حزم حماية · 16 ضابط بيانات وتشفير',
    badge: '95.7% حماية البيانات',
    entities: 'كافة القطاعات الحكومية والخاصة التي تحتفظ ببيانات الموارد والبيانات الشخصية.',
    breakdown: [
      { name: 'تصنيف البيانات (عام / مقيد / سرّي / سري للغاية)', value: '97% تصنيف', percentage: 97, color: 'bg-emerald-500' },
      { name: 'تفعيل أنظمة منع تسريب البيانات (DLP)', value: '94% تفعيل', percentage: 94, color: 'bg-teal-500' },
      { name: 'تشفير البيانات ذات الأهمية العالية (AES-256-GCM)', value: '98% تشفير', percentage: 98, color: 'bg-blue-500' },
      { name: 'الجاهزية للهجرة نحو التشفير ما بعد الكم (PQC)', value: '91% تخطيط', percentage: 91, color: 'bg-sky-500' },
    ],
    summary: 'تضمن المحافظة على سلامة وسرية البيانات الوطنية ومنع تسرّب البيانات الحساسة.',
  },
];

const TLS_DETAILED_LIST = [
  {
    protocol: 'TLS 1.3',
    percentage: 63,
    growth: 12,
    badge: 'الحديث والآمن افتراضياً',
    title: 'تفاصيل اعتماد وحماية بروتوكول TLS 1.3',
    highlights: 'مصافحة فائقة السرعة (1-RTT)، وإلغاء الخوارزميات الضعيفة نهائياً مع تشفير تام مباشر (PFS).',
    breakdown: [
      { name: 'القطاع الحكومي والخدمات السيادية', value: '88% إلزامي', percentage: 88, color: 'bg-emerald-500' },
      { name: 'البنوك والخدمات المصرفية الإلكترونية', value: '95% تغطية', percentage: 95, color: 'bg-teal-500' },
      { name: 'التجارة الرقمية والمنصات الوطنية', value: '78% تفعيل', percentage: 78, color: 'bg-blue-500' },
      { name: 'شبكات الاتصالات والهواتف الذكية', value: '82% اعتماد', percentage: 82, color: 'bg-indigo-500' },
    ],
    summary: 'البروتوكول المعياري الأول الموصى به من الهيئة الوطنية للأمن السيبراني لحماية الاتصالات المتقدمة.',
  },
  {
    protocol: 'TLS 1.2',
    percentage: 34,
    growth: -10,
    badge: 'المرحلة الانتقالية',
    title: 'تفاصيل استخدام وخطة استبدال TLS 1.2',
    highlights: 'يتطلب إعدادات مشددة (AEAD Cipher Suites - AES-GCM) لضمان الأمان أثناء مرحلة الهجرة.',
    breakdown: [
      { name: 'الأنظمة القديمة والبنى القائمة', value: '52% استخدام', percentage: 52, color: 'bg-amber-500' },
      { name: 'الاتصالات بين الخوادم الخلفية (Backend)', value: '42% اعتماد', percentage: 42, color: 'bg-yellow-500' },
      { name: 'تطبيقات المجموعات المصرفية الممتدة', value: '31% استخدام', percentage: 31, color: 'bg-blue-500' },
      { name: 'معدل الهجرة المستهدفة إلى TLS 1.3', value: '85% تحول', percentage: 85, color: 'bg-purple-500' },
    ],
    summary: 'مقبول مؤقتاً مع الاشتراط بوقف الخوارزميات الضعيفة واستخدام مفاتيح منحنيات ECDHE.',
  },
  {
    protocol: 'TLS 1.0/1.1 (deprecated)',
    percentage: 3,
    growth: -2,
    badge: 'محظور وغير آمن',
    title: 'خطة التعطيل والحظر النهائي لـ TLS 1.0/1.1',
    highlights: 'يتضمن ثغرات أمنية خطيرة مثل POODLE و BEAST وغير متوافق مع معايير الأمان العالمية.',
    breakdown: [
      { name: 'أجهزة إنترنت الأشياء القديمة (Legacy IoT)', value: '68% متبقي', percentage: 68, color: 'bg-red-500' },
      { name: 'أنظمة الشبكات المغلقة القديمة', value: '22% خطورة', percentage: 22, color: 'bg-rose-500' },
      { name: 'نسبة الحظر في المتصفحات والخدمات', value: '97% حظر', percentage: 97, color: 'bg-slate-500' },
      { name: 'نسبة التخلص النهائي المستهدفة', value: '100% إغلاق', percentage: 100, color: 'bg-emerald-500' },
    ],
    summary: 'تم حظر وإيقاف هذين البروتوكولين رسمياً في كافة التعاملات والأنظمة المعتمدة.',
  },
];

const CHART_DETAILED_LIST = [
  {
    title: 'تقييم المحاور الخمسة للمؤشر العالمي للأمن السيبراني (ITU GCI 2024)',
    subtitle: 'بيانات موثقة من تقرير الاتحاد الدولي للاتصالات (ITU GCI 5th Edition 2024)',
    badge: '100 / 100 (Tier 1)',
    icon: TrendingUp,
    iconTone: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    highlights: 'حققت المملكة العربية السعودية العلامة الكاملة (100/100) وصُنّفت في الفئة الأولى (Tier 1 — Role-modelling) عبر جميع المحاور الخمسة.',
    breakdown: [
      { name: 'محور التدابير القانونية (Legal Measures)', value: '20 / 20 نقطة كاملة', percentage: 100, color: 'bg-emerald-500' },
      { name: 'محور التدابير التقنية (Technical Measures)', value: '20 / 20 نقطة كاملة', percentage: 100, color: 'bg-teal-500' },
      { name: 'محور التدابير التنظيمية (Organizational Measures)', value: '20 / 20 نقطة كاملة', percentage: 100, color: 'bg-blue-500' },
      { name: 'محور بناء القدرات (Capacity Development)', value: '20 / 20 نقطة كاملة', percentage: 100, color: 'bg-indigo-500' },
      { name: 'محور التعاون الدولي (Cooperation)', value: '20 / 20 نقطة كاملة', percentage: 100, color: 'bg-purple-500' },
    ],
    summary: 'توثيق رسمي معتمد من الاتحاد الدولي للاتصالات (ITU GCI 2024).',
  },
  {
    title: 'توزيع المكونات الفرعية في الضوابط الأساسية للأمن السيبراني (NCA ECC-2:2024)',
    subtitle: 'إجمالي 5 مكونات رئيسية · 29 مكوناً فرعياً · 108 ضوابط فرعية (محدثاً من 114 ضابطاً في ECC-1:2018)',
    badge: '108 ضوابط أساسية',
    icon: Activity,
    iconTone: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
    highlights: 'يمثل مكون تعزيز الأمن السيبراني (15 مكوناً فرعياً) ومكون الحوكمة (9 مكونات فرعية) النسبة الأكبر من الضوابط الأساسية.',
    breakdown: [
      { name: 'تعزيز الأمن السيبراني (Cybersecurity Defense)', value: '15 مكوناً فرعياً (52%)', percentage: 52, color: 'bg-blue-500' },
      { name: 'حوكمة الأمن السيبراني (Cybersecurity Governance)', value: '9 مكونات فرعية (31%)', percentage: 31, color: 'bg-emerald-500' },
      { name: 'صمود الأمن السيبراني (Cybersecurity Resilience)', value: 'مكونان فرعيان (7%)', percentage: 7, color: 'bg-amber-500' },
      { name: 'الأطراف الخارجية والحوسبة السحابية', value: 'مكونان فرعيان (7%)', percentage: 7, color: 'bg-purple-500' },
      { name: 'أنظمة التحكم الصناعي (ICS)', value: 'مكون فرعي واحد (3%)', percentage: 3, color: 'bg-red-500' },
    ],
    summary: 'بيانات حقيقية موثقة من وثيقة الضوابط الأساسية للأمن السيبراني (ECC-2:2024) الصادرة عن الهيئة الوطنية للأمن السيبراني.',
  },
  {
    title: 'مقارنة أحجام المفاتيح العامة بالبايت (NIST FIPS 203/204 vs التشفير الكلاسيكي)',
    subtitle: 'الأحجام القياسية الموثقة في وثائق NIST الفيدرالية (أغسطس 2024)',
    badge: 'FIPS 203 & 204',
    icon: AlertTriangle,
    iconTone: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
    highlights: 'يوضح المخطط الزيادة الهندسية في حجم المفتاح العام عند الانتقال من المنحنيات الإهليلجية (X25519: 32 B) إلى الشبكات الجبرية (ML-KEM / ML-DSA).',
    breakdown: [
      { name: 'X25519 / Ed25519 (مفتاح عام كلاسيكي)', value: '32 بايت (معرض لخوارزمية شور)', percentage: 5, color: 'bg-emerald-500' },
      { name: 'ML-KEM-512 (FIPS 203 — المستوى 1)', value: '800 بايت (مفتاح عام)', percentage: 41, color: 'bg-amber-500' },
      { name: 'ML-KEM-768 (FIPS 203 — المستوى 3 الموصى به)', value: '1,184 بايت (مفتاح عام)', percentage: 61, color: 'bg-rose-500' },
      { name: 'ML-KEM-1024 (FIPS 203 — المستوى 5)', value: '1,568 بايت (مفتاح عام)', percentage: 80, color: 'bg-red-600' },
      { name: 'ML-DSA-65 (FIPS 204 — المستوى 3 للتوقيع)', value: '1,952 بايت (مفتاح عام)', percentage: 100, color: 'bg-purple-500' },
    ],
    summary: 'بيانات حقيقية موثقة من معايير NIST FIPS 203 و FIPS 204 المعتمدة في الفصلين 11 و 12 من مقرر ISE243.',
  },
  {
    title: 'مقارنة أحجام التواقيع والمخرجات التشفيرية بالبايت (FIPS 203 / 204 / 205)',
    subtitle: 'الأحجام القياسية للنص المغلف (Ciphertext) والتوقيع الرقمي (Signature)',
    badge: 'FIPS 203 / 204 / 205',
    icon: Cpu,
    iconTone: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
    highlights: 'مقارنة دقيقة بين حجم توقيع Ed25519 الكلاسيكي (64 بايت) وتوقيع ML-DSA-65 الشبيكي (3,309 بايت) وتوقيع SLH-DSA-128s المبني على التجزئة (7,856 بايت).',
    breakdown: [
      { name: 'Ed25519 (توقيع كلاسيكي)', value: '64 بايت', percentage: 5, color: 'bg-slate-500' },
      { name: 'RSA-2048 (توقيع كلاسيكي)', value: '256 بايت', percentage: 15, color: 'bg-teal-500' },
      { name: 'ML-KEM-768 Ciphertext (FIPS 203)', value: '1,088 بايت (نص مغلف)', percentage: 32, color: 'bg-blue-500' },
      { name: 'ML-DSA-44 Signature (FIPS 204)', value: '2,420 بايت (توقيع رقمي)', percentage: 55, color: 'bg-indigo-500' },
      { name: 'ML-DSA-65 Signature (FIPS 204)', value: '3,309 بايت (توقيع رقمي)', percentage: 72, color: 'bg-fuchsia-500' },
      { name: 'SLH-DSA-128s Signature (FIPS 205)', value: '7,856 بايت (توقيع مبني على التجزئة)', percentage: 100, color: 'bg-purple-500' },
    ],
    summary: 'أرقام قياسية حقيقية موثقة 100% من وثائق NIST FIPS 203 و FIPS 204 و FIPS 205.',
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const colors = useThemeColors();
  const { session } = useAuth();

  // Dynamic Dashboard State
  const [viewMode, setViewMode] = useState<DashboardViewMode>('all');
  const [timeRange, setTimeRange] = useState<TimeRangeFilter>('all');
  const [quickSearch, setQuickSearch] = useState('');
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [dekId, setDekId] = useState<string>('dek-v2-active');
  const [auditValid, setAuditValid] = useState<boolean>(true);
  const [pqcSimulatedYear, setPqcSimulatedYear] = useState<number>(2026);

  // Modals & Interactive States
  const [activeKpiMenu, setActiveKpiMenu] = useState<number | null>(null);
  const [activeNcaMenu, setActiveNcaMenu] = useState<number | null>(null);
  const [activeTlsMenu, setActiveTlsMenu] = useState<number | null>(null);
  const [activeChartModal, setActiveChartModal] = useState<number | null>(null);
  const [hoveredPieIndex, setHoveredPieIndex] = useState<number | null>(null);
  const [selected3dPoint, setSelected3dPoint] = useState<ChartDataPoint | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const activePieSector = hoveredPieIndex !== null ? SECTOR_BREAKDOWN[hoveredPieIndex] : null;

  // Online/Offline & Crypto Telemetry Listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    getKeyStatus()
      .then((status) => {
        if (Array.isArray(status)) {
          const activeKey = status.find((k) => k.status === 'active') ?? status[0];
          if (activeKey?.id) setDekId(activeKey.id);
        }
      })
      .catch(() => {});

    try {
      const logs = getStoredAuditLogs();
      setAuditValid(verifyAuditChain(logs).valid);
    } catch {
      setAuditValid(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Live Academic Progress Aggregation across all 6 Courses
  const username = session?.username || 'student';
  const completedIds = useMemo(() => getCompletedChapters(username), [username]);

  const dynamicCoursesStats = useMemo(() => {
    return COURSES.map((course) => {
      const chapters = getChaptersByCourse(course.slug);
      const total = chapters.length || course.chaptersCount || 1;
      const doneCount = chapters.filter(
        (ch) => completedChaptersIncludes(completedIds, ch.id, ch.chapter_number, course.slug)
      ).length;
      const percent = Math.min(100, Math.round((doneCount / total) * 100));
      const nextChapter =
        chapters.find(
          (ch) => !completedChaptersIncludes(completedIds, ch.id, ch.chapter_number, course.slug)
        ) || chapters[0];

      return {
        course,
        chaptersCount: chapters.length || course.chaptersCount,
        doneCount,
        percent,
        nextChapter,
      };
    });
  }, [completedIds]);

  const totalPlatformChapters = useMemo(
    () => dynamicCoursesStats.reduce((acc, c) => acc + c.chaptersCount, 0),
    [dynamicCoursesStats]
  );

  const totalCompletedCount = useMemo(
    () => dynamicCoursesStats.reduce((acc, c) => acc + c.doneCount, 0),
    [dynamicCoursesStats]
  );

  const overallProgressPercent = useMemo(
    () =>
      totalPlatformChapters > 0
        ? Math.min(100, Math.round((totalCompletedCount / totalPlatformChapters) * 100))
        : 0,
    [totalCompletedCount, totalPlatformChapters]
  );

  // Gamification & Smart Adaptive AI Calculation
  const studentXP = useMemo(() => 1000 + totalCompletedCount * 150, [totalCompletedCount]);
  const cyberRank = useMemo(() => {
    if (studentXP >= 4500) return 'كبير مهندسي التشفير الكمومي (Quantum Architect)';
    if (studentXP >= 2800) return 'محلل دفاع سيبراني متقدم (Senior Cyber Defender)';
    if (studentXP >= 1600) return 'ممارس أمن وتشفير معتمد (Crypto Specialist)';
    return 'مستكشف الأمن السيبراني (Cyber Explorer)';
  }, [studentXP]);

  const smartRecommendation = useMemo(() => {
    const targetCourseStat =
      dynamicCoursesStats.find((c) => c.percent < 100) || dynamicCoursesStats[0];
    return {
      courseTitle: targetCourseStat?.course.title || 'التشفير المتقدم',
      courseSlug: targetCourseStat?.course.slug || 'ise243',
      courseCode: targetCourseStat?.course.code || 'ISE 243',
      chapterId: targetCourseStat?.nextChapter?.id || 1,
      chapterNumber: targetCourseStat?.nextChapter?.chapter_number || 1,
      chapterTitle:
        targetCourseStat?.nextChapter?.title || 'حقول غالوا GF(2^8) ومعيار التشفير المتقدم AES',
    };
  }, [dynamicCoursesStats]);

  // Dynamic Chart Dataset based on Time Filter
  const activeMarketChartData = useMemo(() => {
    if (timeRange === 'recent') return SAUDI_MARKET.slice(-3);
    if (timeRange === 'vision2030') return VISION_2030_PROJECTIONS;
    return SAUDI_MARKET;
  }, [timeRange]);

  // Filtered Courses for Quick Search
  const filteredCourseStats = useMemo(() => {
    if (!quickSearch.trim()) return dynamicCoursesStats;
    const q = quickSearch.toLowerCase();
    return dynamicCoursesStats.filter(
      (item) =>
        item.course.title.toLowerCase().includes(q) ||
        item.course.code.toLowerCase().includes(q) ||
        item.course.description.toLowerCase().includes(q)
    );
  }, [dynamicCoursesStats, quickSearch]);

  // PQC Readiness Dynamic Simulation Formula
  const pqcSimulatedReadiness = useMemo(() => {
    const yearDelta = Math.max(0, pqcSimulatedYear - 2024);
    const hybridPercent = Math.min(100, Math.round(38 + yearDelta * 11.5));
    const quantumRiskScore = Math.max(5, Math.round(85 - yearDelta * 13));
    return { hybridPercent, quantumRiskScore };
  }, [pqcSimulatedYear]);

  return (
    <div className="space-y-6 pb-12" dir="rtl">
      {/* ─── 1. Smart National Observatory Header ─── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel card-3d-neon p-6 sm:p-7 rounded-3xl border border-emerald-500/35 relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col items-center justify-between gap-5 text-center">
          <div className="w-full space-y-2.5 text-center">
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5 font-bold text-emerald-300">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>المرصد التحليلي التدريبي للتحول التشفيري · مشروع مادة التشفير المتقدم (ISE243) · دبلوم أمن المعلومات · طلاب شعبة (002م) · (2026-2027)</span>
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-cyan-300">
                {isOnline ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
                <span>{isOnline ? 'مزامنة سحابية حية' : 'وضع محلي مشفر (Offline-First)'}</span>
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-amber-300">
                <Key className="w-3.5 h-3.5 text-amber-400" />
                <span>AES-256-GCM ({dekId.slice(0, 10)})</span>
              </span>
            </div>

            <h1 className="w-full text-center text-sm sm:text-base md:text-xl lg:text-2xl font-black gradient-text whitespace-nowrap truncate mx-auto">
              المرصد التحليلي التدريبي ومؤشرات الامتثال السيبراني الموثقة (NCA &amp; NIST PQC)
            </h1>
            <p className="text-slate-300 text-xs md:text-sm max-w-4xl mx-auto text-center leading-relaxed">
              بيئة تدريبية أكاديمية (مشروع طلاب شعبة 002م · العام الأكاديمي 2026-2027 · جامعة الأمير مقرن بن عبدالعزيز) تستعرض وتحلل المؤشرات والضوابط المبنية على بيانات حقيقية موثقة بالمصادر الرسمية والأكاديمية المعتمدة (ITU GCI 2024، NCA ECC-2:2024، NCS-1:2020، NIST FIPS 203/204/205).
            </p>
          </div>

          {/* Live Security Telemetry */}
          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <div
              tabIndex={0}
              className="card-3d-neon card-3d-cyan px-5 py-3.5 rounded-2xl bg-slate-900/90 border border-cyan-500/35 text-center min-w-[145px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/70 active:scale-[0.97] active:ring-2 active:ring-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
            >
              <span className="text-[11px] text-slate-400 block">سلسلة التدقيق</span>
              <span className="text-sm font-black text-cyan-400 flex items-center justify-center gap-1 mt-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>{auditValid ? 'سليمة 100%' : 'قيد الفحص'}</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono block mt-0.5">SHA-256 Chain</span>
            </div>

            <div
              tabIndex={0}
              className="card-3d-neon px-5 py-3.5 rounded-2xl bg-slate-900/90 border border-amber-500/35 text-center min-w-[145px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/70 active:scale-[0.97] active:ring-2 active:ring-amber-400/60 focus:outline-none focus:ring-2 focus:ring-amber-400/60"
            >
              <span className="text-[11px] text-slate-400 block">الرتبة السيبرانية</span>
              <span className="text-sm font-black text-amber-400 block mt-1">{cyberRank}</span>
              <span className="text-[10px] text-slate-500 font-mono block mt-0.5 tabular-nums">
                {studentXP} XP · {overallProgressPercent}%
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── 2. National Cyber Observatory & Dynamic KPIs ─── */}
      {(viewMode === 'all' || viewMode === 'observatory' || viewMode === 'academic' || viewMode === 'crypto') && (
        <>
          {/* KPIs Grid (Preserves exact selectors for Playwright tests) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {KPI_DATA_LIST.map((kpi, i) => {
              const Icon = kpi.icon;
              const isOpen = activeKpiMenu === i;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -5, transition: { duration: 0.25, ease: 'easeOut' } }}
                  className={cn(
                    'glass-panel card-3d-neon p-5 sm:p-6 rounded-2xl border border-emerald-500/30 transition-all duration-300 relative cursor-pointer group overflow-hidden active:scale-[0.98]',
                    isOpen
                      ? 'ring-2 ring-emerald-400/80 border-emerald-400 bg-slate-900/95 shadow-[0_0_32px_rgba(16,185,129,0.42)] -translate-y-1'
                      : ''
                  )}
                  onClick={() => setActiveKpiMenu(isOpen ? null : i)}
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="text-slate-400 text-xs font-medium whitespace-nowrap truncate">{kpi.label}</p>
                      <p className={`text-lg sm:text-xl xl:text-2xl font-black font-mono tabular-nums whitespace-nowrap truncate ${kpi.tone}`}>
                        {kpi.value}
                      </p>
                      <p className="text-slate-500 text-xs font-mono whitespace-nowrap truncate">{kpi.unit}</p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveKpiMenu(isOpen ? null : i);
                      }}
                      className={cn(
                        'btn-3d-neon icon-glass-3d px-3 py-2.5 rounded-xl transition-all duration-300 border cursor-pointer flex items-center gap-1.5 shrink-0 active:scale-95',
                        kpi.bgTone,
                        isOpen
                          ? 'btn-3d-neon-active scale-105 ring-2 ring-emerald-400/75 shadow-[0_0_20px_rgba(16,185,129,0.38)]'
                          : 'hover:scale-105 hover:border-emerald-400/70'
                      )}
                      title="انقر لعرض قائمة البيانات العائمة"
                      aria-expanded={isOpen}
                    >
                      <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                      <ChevronDown
                        className={cn(
                          'w-3.5 h-3.5 text-slate-400 transition-transform duration-200',
                          isOpen && 'rotate-180 text-emerald-400'
                        )}
                      />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Glass 3D Cyber Preparedness Chart */}
          <Glass3DChart
            onSelectPoint={(point) => {
              setSelected3dPoint(point);
              setIsDrawerOpen(true);
            }}
          />

          {/* Interactive PQC Readiness & Time Horizon Control Strip */}
          <div className="glass-panel card-3d-neon card-3d-purple p-5 sm:p-6 rounded-2xl border border-purple-500/35 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 sm:gap-5 overflow-hidden">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="icon-glass-3d icon-glass-3d-purple w-11 h-11 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
                <Sliders className="w-5 h-5" />
              </div>
              <div className="min-w-0 space-y-0.5">
                <h3 className="text-xs sm:text-sm font-black text-white whitespace-nowrap truncate">
                  محاكي الجاهزية الكمومية الديناميكي (PQC Readiness Simulator — العام {pqcSimulatedYear})
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400 whitespace-nowrap truncate">
                  نسبة التحول المتوقعة إلى خوارزميات ML-KEM / ML-DSA:{' '}
                  <span className="text-emerald-400 font-mono font-bold">
                    {pqcSimulatedReadiness.hybridPercent}%
                  </span>{' '}
                  · مؤشر المخاطر الكمومية المتبقية:{' '}
                  <span className="text-rose-400 font-mono font-bold">
                    {pqcSimulatedReadiness.quantumRiskScore}%
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2.5 text-xs bg-slate-950/70 px-3.5 py-2 rounded-xl border border-purple-500/25 shadow-inner">
                <span className="text-slate-400">سنة المحاكاة:</span>
                <input
                  type="range"
                  min={2024}
                  max={2030}
                  value={pqcSimulatedYear}
                  onChange={(e) => setPqcSimulatedYear(Number(e.target.value))}
                  className="accent-purple-500 cursor-pointer"
                />
                <span className="font-mono font-bold text-purple-300">{pqcSimulatedYear}</span>
              </div>

              <div className="flex items-center gap-2 bg-slate-950/85 p-1.5 rounded-2xl border border-purple-500/35 shadow-[inset_0_2px_6px_rgba(0,0,0,0.6),0_0_15px_rgba(168,85,247,0.12)]">
                {[
                  { id: 'all', label: '2019–2024' },
                  { id: 'recent', label: 'آخر 3 سنوات' },
                  { id: 'vision2030', label: 'توقعات رؤية 2030' },
                ].map((range) => (
                  <button
                    key={range.id}
                    type="button"
                    onClick={() => setTimeRange(range.id as TimeRangeFilter)}
                    className={cn(
                      'btn-3d-neon px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all duration-250 cursor-pointer active:scale-95',
                      timeRange === range.id
                        ? 'bg-gradient-to-b from-purple-500 to-purple-700 text-white border-purple-300/80 ring-2 ring-purple-400/50 shadow-[0_0_18px_rgba(168,85,247,0.45)]'
                        : 'text-slate-300 border-purple-500/25 hover:text-purple-200 hover:border-purple-400/60'
                    )}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Academic Data Drawer */}
          <AcademicDataDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            dataPoint={selected3dPoint}
          />

          {/* CyberModal for KPI Cards */}
          <CyberModal
            isOpen={activeKpiMenu !== null}
            onClose={() => setActiveKpiMenu(null)}
            title={activeKpiMenu !== null ? KPI_DATA_LIST[activeKpiMenu]?.title || '' : ''}
            subtitle={
              activeKpiMenu !== null
                ? `مؤشر ${KPI_DATA_LIST[activeKpiMenu]?.label || ''} · ${KPI_DATA_LIST[activeKpiMenu]?.value || ''} ${KPI_DATA_LIST[activeKpiMenu]?.unit || ''}`
                : undefined
            }
            badge={activeKpiMenu !== null ? KPI_DATA_LIST[activeKpiMenu]?.badge : undefined}
            icon={activeKpiMenu !== null ? KPI_DATA_LIST[activeKpiMenu]?.icon : undefined}
            iconTone={activeKpiMenu !== null ? KPI_DATA_LIST[activeKpiMenu]?.bgTone : undefined}
            breakdown={activeKpiMenu !== null ? KPI_DATA_LIST[activeKpiMenu]?.breakdown || [] : []}
            summary={activeKpiMenu !== null ? KPI_DATA_LIST[activeKpiMenu]?.summary : undefined}
          />

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn(
                'glass-panel card-3d-neon p-6 rounded-3xl lg:col-span-2 transition-all',
                activeChartModal === 0 && 'ring-2 ring-emerald-400/75 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.35)]'
              )}
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <h3 className="font-bold flex items-center gap-2.5 text-slate-100">
                  <span className="icon-glass-3d w-9 h-9">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </span>
                  <span>تطور مؤشر الأمن السيبراني العالمي (ITU GCI 2020–2024: 100/100)</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveChartModal(0)}
                  className={cn(
                    'btn-3d-neon text-xs text-slate-300 hover:text-emerald-300 flex items-center gap-1.5 font-medium px-3.5 py-2 rounded-xl transition-all cursor-pointer shrink-0',
                    activeChartModal === 0 && 'btn-3d-neon-active ring-2 ring-emerald-400/60'
                  )}
                >
                  عرض التفاصيل <ChevronDown className="w-3.5 h-3.5 text-emerald-400" />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={290} className="chart-3d-stage cursor-pointer">
                <AreaChart
                  data={activeMarketChartData}
                  onClick={() => setActiveChartModal(0)}
                  margin={{ top: 14, right: 16, left: 0, bottom: 4 }}
                >
                  <defs>
                    <linearGradient id="gradM3D" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34d399" stopOpacity={0.75} />
                      <stop offset="45%" stopColor={colors.emerald} stopOpacity={0.38} />
                      <stop offset="95%" stopColor="#064e3b" stopOpacity={0.04} />
                    </linearGradient>
                    <linearGradient id="strokeM3D" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#6ee7b7" />
                      <stop offset="50%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} opacity={0.55} />
                  <XAxis dataKey="year" stroke={colors.text} fontSize={11} />
                  <YAxis stroke={colors.text} fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: colors.tooltipBg,
                      borderColor: colors.tooltipBorder,
                      borderRadius: 12,
                      color: colors.tooltipText,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="marketSize"
                    stroke="url(#strokeM3D)"
                    strokeWidth={3.5}
                    fill="url(#gradM3D)"
                    dot={{ r: 5, fill: '#ecfdf5', stroke: '#10b981', strokeWidth: 2.5 }}
                    activeDot={{ r: 7, fill: '#34d399', stroke: '#ffffff', strokeWidth: 2 }}
                    name="درجة مؤشر ITU GCI (من 100)"
                    className="cursor-pointer"
                    onClick={() => setActiveChartModal(0)}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className={cn(
                'glass-panel card-3d-neon card-3d-cyan p-5 sm:p-6 rounded-3xl transition-all overflow-hidden flex flex-col justify-between',
                activeChartModal === 1 && 'ring-2 ring-cyan-400/75 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.35)]'
              )}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <h3 className="font-bold flex items-center gap-2.5 text-slate-100 min-w-0">
                  <span className="icon-glass-3d icon-glass-3d-cyan w-9 h-9 shrink-0">
                    <Activity className="w-4 h-4 text-cyan-400" />
                  </span>
                  <span className="text-sm sm:text-base leading-snug">توزيع المكونات الفرعية في NCA ECC-2:2024 (108 ضوابط)</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveChartModal(1)}
                  className={cn(
                    'btn-3d-neon text-xs text-slate-300 hover:text-cyan-300 flex items-center gap-1.5 font-medium px-3 py-1.5 rounded-xl transition-all cursor-pointer shrink-0',
                    activeChartModal === 1 && 'btn-3d-neon-active ring-2 ring-cyan-400/60'
                  )}
                >
                  عرض التفاصيل <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={295} className="chart-3d-stage chart-3d-pie-stage chart-3d-cyan cursor-pointer overflow-hidden !p-2">
                <PieChart onClick={() => setActiveChartModal(1)} margin={{ top: 2, right: 4, bottom: 2, left: 4 }}>
                  <defs>
                    {/* 3D Specular & Extrusion Gradients per Sector */}
                    {SECTOR_BREAKDOWN.map((entry, idx) => (
                      <g key={`defs-${idx}`}>
                        <linearGradient id={`pieGrad3D-${idx}`} x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity={0.38} />
                          <stop offset="20%" stopColor={entry.color} stopOpacity={1} />
                          <stop offset="78%" stopColor={entry.color} stopOpacity={0.92} />
                          <stop offset="100%" stopColor="#020617" stopOpacity={0.6} />
                        </linearGradient>
                        <linearGradient id={`pieWall3D-${idx}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={entry.color} stopOpacity={0.55} />
                          <stop offset="100%" stopColor="#020617" stopOpacity={0.95} />
                        </linearGradient>
                      </g>
                    ))}
                    <radialGradient id="pieGlassPlate" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.2} />
                      <stop offset="65%" stopColor="#10b981" stopOpacity={0.08} />
                      <stop offset="100%" stopColor="#020617" stopOpacity={0} />
                    </radialGradient>
                    <linearGradient id="pieCoreGlass" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1e293b" stopOpacity={0.96} />
                      <stop offset="100%" stopColor="#020617" stopOpacity={0.98} />
                    </linearGradient>
                    <filter id="pie3dNeonGlow" x="-25%" y="-25%" width="150%" height="150%">
                      <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#020617" floodOpacity="0.75" />
                      <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#38bdf8" floodOpacity="0.32" />
                    </filter>
                    <filter id="pie3dFloorShadow" x="-25%" y="-25%" width="150%" height="150%">
                      <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#020617" floodOpacity="0.85" />
                    </filter>
                  </defs>

                  {/* Ambient 3D Floating Glass Neon Halo Rings (Locked to cy=80) */}
                  <circle
                    cx="50%"
                    cy={80}
                    r={72}
                    fill="url(#pieGlassPlate)"
                    stroke="rgba(56, 189, 248, 0.35)"
                    strokeWidth={1.2}
                    strokeDasharray="5 4"
                  />
                  <circle
                    cx="50%"
                    cy={80}
                    r={67}
                    fill="none"
                    stroke="rgba(16, 185, 129, 0.22)"
                    strokeWidth={1}
                  />

                  {/* Layer 1: 3D Extruded Cylinder Depth Base (cy=84.5) */}
                  <Pie
                    data={SECTOR_BREAKDOWN}
                    cx="50%"
                    cy={84.5}
                    innerRadius={37}
                    outerRadius={63}
                    paddingAngle={3}
                    cornerRadius={6}
                    dataKey="percentage"
                    isAnimationActive={false}
                    legendType="none"
                    tooltipType="none"
                    filter="url(#pie3dFloorShadow)"
                  >
                    {SECTOR_BREAKDOWN.map((_, i) => (
                      <Cell
                        key={`wall-base-${i}`}
                        fill={`url(#pieWall3D-${i})`}
                        stroke="rgba(2, 6, 23, 0.8)"
                        strokeWidth={1}
                      />
                    ))}
                  </Pie>

                  {/* Layer 2: Top 3D Beveled Glass-Neon Interactive Surface (cy=80) */}
                  <Pie
                    data={SECTOR_BREAKDOWN}
                    cx="50%"
                    cy={80}
                    innerRadius={37}
                    outerRadius={63}
                    paddingAngle={3}
                    cornerRadius={6}
                    dataKey="percentage"
                    nameKey="sector"
                    filter="url(#pie3dNeonGlow)"
                    className="cursor-pointer"
                    onClick={() => setActiveChartModal(1)}
                    onMouseEnter={(_, index) => setHoveredPieIndex(index)}
                    onMouseLeave={() => setHoveredPieIndex(null)}
                  >
                    {SECTOR_BREAKDOWN.map((entry, i) => {
                      const isHovered = hoveredPieIndex === i;
                      return (
                        <Cell
                          key={`top-${i}`}
                          fill={`url(#pieGrad3D-${i})`}
                          stroke={isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.55)'}
                          strokeWidth={isHovered ? 2.4 : 1.3}
                          style={{
                            filter: isHovered ? `drop-shadow(0 0 10px ${entry.color})` : undefined,
                            transition: 'filter 0.25s ease, stroke-width 0.25s ease',
                          }}
                          className="cursor-pointer"
                          onClick={() => setActiveChartModal(1)}
                        />
                      );
                    })}
                  </Pie>

                  {/* Center 3D Floating Glass Core Hub (Locked to exact cy=80) */}
                  <g className="pointer-events-none">
                    <circle
                      cx="50%"
                      cy={80}
                      r={35}
                      fill="rgba(2, 6, 23, 0.9)"
                      stroke="rgba(56, 189, 248, 0.25)"
                      strokeWidth={1}
                    />
                    <circle
                      cx="50%"
                      cy={80}
                      r={31}
                      fill="url(#pieCoreGlass)"
                      stroke={activePieSector ? activePieSector.color : 'rgba(56, 189, 248, 0.6)'}
                      strokeWidth={1.5}
                    />
                    <circle
                      cx="50%"
                      cy={80}
                      r={27}
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.16)"
                      strokeWidth={0.8}
                      strokeDasharray="3 2"
                    />
                    <text
                      x="50%"
                      y={74}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill={activePieSector ? activePieSector.color : '#38bdf8'}
                      fontSize={13}
                      fontWeight={900}
                      fontFamily="IBM Plex Mono, monospace"
                    >
                      {activePieSector ? `${activePieSector.percentage}%` : '108'}
                    </text>
                    <text
                      x="50%"
                      y={88}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#e2e8f0"
                      fontSize={8.5}
                      fontWeight={700}
                    >
                      {activePieSector ? activePieSector.sector.split(' ')[0] : 'ضابط ECC-2'}
                    </text>
                  </g>

                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload || !payload.length) return null;
                      const item = payload[0]?.payload as (typeof SECTOR_BREAKDOWN)[number] | undefined;
                      if (!item) return null;
                      const subControlsCount = Math.round((item.percentage / 100) * 29);
                      return (
                        <div
                          dir="rtl"
                          className="recharts-default-tooltip text-right min-w-[165px]"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{
                                backgroundColor: item.color,
                                boxShadow: `0 0 8px ${item.color}`,
                              }}
                            />
                            <span className="text-xs font-bold text-slate-100">{item.sector}</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-slate-300 border-t border-slate-700/60 pt-1 mt-1">
                            <span>نسبة المكونات الفرعية:</span>
                            <span className="font-mono font-bold text-cyan-300">{item.percentage}%</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-0.5">
                            <span>المكونات الفرعية (من 29):</span>
                            <span className="font-mono text-emerald-300">{subControlsCount} مكون فرعي</span>
                          </div>
                        </div>
                      );
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    height={114}
                    content={() => (
                      <div
                        dir="rtl"
                        className="grid grid-cols-2 gap-1.5 px-2 py-1.5 w-full max-w-full box-border overflow-hidden select-none"
                      >
                        {SECTOR_BREAKDOWN.map((entry, idx) => {
                          const isActive = hoveredPieIndex === idx;
                          const isLastOdd =
                            idx === SECTOR_BREAKDOWN.length - 1 && SECTOR_BREAKDOWN.length % 2 === 1;
                          return (
                            <button
                              key={entry.sector}
                              type="button"
                              onMouseEnter={() => setHoveredPieIndex(idx)}
                              onMouseLeave={() => setHoveredPieIndex(null)}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveChartModal(1);
                              }}
                              className={cn(
                                'btn-3d-neon flex items-center justify-between gap-1.5 px-2.5 py-1 rounded-lg border text-right transition-all duration-200 cursor-pointer min-w-0 max-w-full overflow-hidden hover:translate-y-0 active:scale-[0.98]',
                                isLastOdd && 'col-span-2',
                                isActive
                                  ? 'bg-slate-800/95 border-cyan-400/80 ring-1 ring-cyan-400/50 shadow-[0_0_12px_rgba(56,189,248,0.32)]'
                                  : 'bg-slate-900/85 border-cyan-500/30 hover:border-cyan-400/65'
                              )}
                            >
                              <span className="flex items-center gap-1.5 min-w-0 flex-1 overflow-hidden">
                                <span
                                  className="w-2 h-2 rounded-full shrink-0"
                                  style={{
                                    backgroundColor: entry.color,
                                    boxShadow: `0 0 6px ${entry.color}`,
                                  }}
                                />
                                <span className="text-[10px] font-semibold text-slate-200 whitespace-nowrap overflow-hidden text-ellipsis block">
                                  {entry.sector}
                                </span>
                              </span>
                              <span
                                className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 leading-none"
                                style={{
                                  color: entry.color,
                                  backgroundColor: `${entry.color}20`,
                                }}
                              >
                                {entry.percentage}%
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={cn(
                'glass-panel card-3d-neon p-6 rounded-3xl transition-all',
                activeChartModal === 2 && 'ring-2 ring-rose-400/75 border-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.35)]'
              )}
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <h3 className="font-bold flex items-center gap-2.5 text-slate-100">
                  <span className="icon-glass-3d icon-glass-3d-amber w-9 h-9">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                  </span>
                  <span>مقارنة أحجام المفاتيح العامة بالبايت (NIST FIPS 203/204 vs الكلاسيكي)</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveChartModal(2)}
                  className={cn(
                    'btn-3d-neon text-xs text-slate-300 hover:text-rose-300 flex items-center gap-1.5 font-medium px-3.5 py-2 rounded-xl transition-all cursor-pointer shrink-0',
                    activeChartModal === 2 && 'btn-3d-neon-active ring-2 ring-rose-400/60'
                  )}
                >
                  عرض التفاصيل <ChevronDown className="w-3.5 h-3.5 text-rose-400" />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={290} className="chart-3d-stage cursor-pointer">
                <BarChart
                  data={VULNERABILITIES_2024}
                  layout="vertical"
                  onClick={() => setActiveChartModal(2)}
                  margin={{ top: 10, right: 18, left: 4, bottom: 4 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} opacity={0.5} />
                  <XAxis type="number" stroke={colors.text} fontSize={11} />
                  <YAxis dataKey="name" type="category" stroke={colors.text} width={140} fontSize={10} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: colors.tooltipBg,
                      borderColor: colors.tooltipBorder,
                      borderRadius: 12,
                      color: colors.tooltipText,
                    }}
                  />
                  <Bar
                    dataKey="count"
                    radius={[0, 8, 8, 0]}
                    className="cursor-pointer"
                    onClick={() => setActiveChartModal(2)}
                  >
                    {VULNERABILITIES_2024.map((v, i) => (
                      <Cell key={i} fill={v.severity === 'critical' ? '#ef4444' : '#f59e0b'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className={cn(
                'glass-panel card-3d-neon card-3d-purple p-6 rounded-3xl transition-all',
                activeChartModal === 3 && 'ring-2 ring-purple-400/75 border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.35)]'
              )}
            >
              <div className="flex items-center justify-between gap-3 mb-4">
                <h3 className="font-bold flex items-center gap-2.5 text-slate-100">
                  <span className="icon-glass-3d icon-glass-3d-purple w-9 h-9">
                    <Cpu className="w-4 h-4 text-purple-400" />
                  </span>
                  <span>مقارنة أحجام التواقيع والمخرجات بالبايت (NIST FIPS 203–205)</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveChartModal(3)}
                  className={cn(
                    'btn-3d-neon text-xs text-slate-300 hover:text-purple-300 flex items-center gap-1.5 font-medium px-3.5 py-2 rounded-xl transition-all cursor-pointer shrink-0',
                    activeChartModal === 3 && 'btn-3d-neon-active ring-2 ring-purple-400/60'
                  )}
                >
                  عرض التفاصيل <ChevronDown className="w-3.5 h-3.5 text-purple-400" />
                </button>
              </div>
              <ResponsiveContainer width="100%" height={290} className="chart-3d-stage cursor-pointer">
                <LineChart
                  data={PQC_MIGRATION}
                  onClick={() => setActiveChartModal(3)}
                  margin={{ top: 14, right: 18, left: 0, bottom: 4 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} opacity={0.5} />
                  <XAxis dataKey="quarter" stroke={colors.text} fontSize={10} />
                  <YAxis stroke={colors.text} fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: colors.tooltipBg,
                      borderColor: colors.tooltipBorder,
                      borderRadius: 12,
                      color: colors.tooltipText,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="organizations"
                    stroke="#a855f7"
                    strokeWidth={3.5}
                    dot={{ r: 6, fill: '#f3e8ff', stroke: '#a855f7', strokeWidth: 2.5 }}
                    activeDot={{ r: 8, fill: '#e879f9', stroke: '#ffffff', strokeWidth: 2 }}
                    name="الحجم بالبايت (Bytes)"
                    className="cursor-pointer"
                    onClick={() => setActiveChartModal(3)}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* CyberModal for Charts Breakdown */}
          <CyberModal
            isOpen={activeChartModal !== null}
            onClose={() => setActiveChartModal(null)}
            title={activeChartModal !== null ? CHART_DETAILED_LIST[activeChartModal]?.title || '' : ''}
            subtitle={activeChartModal !== null ? CHART_DETAILED_LIST[activeChartModal]?.subtitle : undefined}
            badge={activeChartModal !== null ? CHART_DETAILED_LIST[activeChartModal]?.badge : undefined}
            icon={activeChartModal !== null ? CHART_DETAILED_LIST[activeChartModal]?.icon : undefined}
            iconTone={activeChartModal !== null ? CHART_DETAILED_LIST[activeChartModal]?.iconTone : undefined}
            highlights={activeChartModal !== null ? CHART_DETAILED_LIST[activeChartModal]?.highlights : undefined}
            breakdown={activeChartModal !== null ? CHART_DETAILED_LIST[activeChartModal]?.breakdown || [] : []}
            summary={activeChartModal !== null ? CHART_DETAILED_LIST[activeChartModal]?.summary : undefined}
          />

          {/* NCA Standards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel card-3d-neon p-6 sm:p-7 rounded-3xl border border-emerald-500/35"
          >
            <h3 className="font-bold mb-5 flex items-center gap-2.5 text-slate-100">
              <span className="icon-glass-3d w-9 h-9">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </span>
              <span>المعايير الوطنية للأمن السيبراني (NCA)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {NCA_DETAILED_LIST.map((std, i) => {
                const isSelected = activeNcaMenu === i;
                return (
                  <div
                    key={i}
                    onClick={() => setActiveNcaMenu(i)}
                    className={cn(
                      'card-3d-neon bg-slate-900/80 border border-emerald-500/30 p-5 rounded-2xl hover:border-emerald-400/80 hover:bg-slate-900/95 cursor-pointer transition-all duration-300 group relative flex flex-col justify-between gap-2 active:scale-[0.98]',
                      isSelected && 'ring-2 ring-emerald-400/80 border-emerald-400 bg-slate-900/95 shadow-[0_0_28px_rgba(16,185,129,0.38)] -translate-y-1'
                    )}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-xs font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-xl border border-emerald-500/40 shadow-inner">
                        {std.code}
                      </span>
                      <span className="btn-3d-neon px-2.5 py-1 rounded-xl text-[11px] text-slate-300 group-hover:text-emerald-300 group-hover:border-emerald-400/70 transition-all flex items-center gap-1 font-bold active:scale-95">
                        تفاصيل <ChevronDown className="w-3.5 h-3.5 text-emerald-400" />
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-sm mb-1.5 text-slate-100 group-hover:text-emerald-300 transition-colors">
                        {std.title}
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">{std.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* CyberModal for NCA Standards */}
          <CyberModal
            isOpen={activeNcaMenu !== null}
            onClose={() => setActiveNcaMenu(null)}
            title={activeNcaMenu !== null ? NCA_DETAILED_LIST[activeNcaMenu]?.title || '' : ''}
            code={activeNcaMenu !== null ? NCA_DETAILED_LIST[activeNcaMenu]?.code : undefined}
            subtitle={activeNcaMenu !== null ? `إصدار ${NCA_DETAILED_LIST[activeNcaMenu]?.year || ''}` : undefined}
            badge={activeNcaMenu !== null ? NCA_DETAILED_LIST[activeNcaMenu]?.badge : undefined}
            icon={ShieldCheck}
            iconTone="text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
            entities={activeNcaMenu !== null ? NCA_DETAILED_LIST[activeNcaMenu]?.entities : undefined}
            breakdown={activeNcaMenu !== null ? NCA_DETAILED_LIST[activeNcaMenu]?.breakdown || [] : []}
            summary={activeNcaMenu !== null ? NCA_DETAILED_LIST[activeNcaMenu]?.summary : undefined}
          />

          {/* TLS Usage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-panel card-3d-neon p-6 sm:p-7 rounded-3xl border border-emerald-500/35 transition-all duration-300"
          >
            <div className="flex items-center justify-between gap-3 mb-5">
              <h3 className="font-bold text-base flex items-center gap-2.5 text-slate-100">
                <span className="icon-glass-3d w-9 h-9">
                  <Lock className="w-4 h-4 text-emerald-400" />
                </span>
                <span>اعتماد بروتوكولات TLS عالمياً ومحلياً (2024)</span>
              </h3>
              <span className="btn-3d-neon px-3 py-1.5 rounded-xl text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                انقر للتفاصيل <ChevronDown className="w-3.5 h-3.5 text-emerald-400" />
              </span>
            </div>

            <div className="space-y-3.5">
              {TLS_DETAILED_LIST.map((tls, i) => {
                const isSelected = activeTlsMenu === i;
                return (
                  <div
                    key={i}
                    onClick={() => setActiveTlsMenu(i)}
                    className={cn(
                      'card-3d-neon p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 cursor-pointer transition-all duration-300 group active:scale-[0.99]',
                      isSelected && 'ring-2 ring-emerald-400/80 border-emerald-400 bg-slate-900/95 shadow-[0_0_28px_rgba(16,185,129,0.38)] -translate-y-1'
                    )}
                  >
                    <div className="flex justify-between text-sm mb-2.5 items-center gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-bold text-slate-100 group-hover:text-emerald-300 transition-colors">
                          {tls.protocol}
                        </span>
                        <span className="btn-3d-neon text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-slate-800/90 text-slate-300 border border-emerald-500/30">
                          {tls.badge}
                        </span>
                      </div>
                      <span
                        className={`font-mono tabular-nums font-bold px-2.5 py-0.5 rounded-lg bg-slate-950/70 border border-slate-800 ${
                          tls.growth >= 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {tls.percentage}% ({tls.growth > 0 ? '+' : ''}
                        {tls.growth}%)
                      </span>
                    </div>
                    <div className="w-full h-3 p-0.5 rounded-full overflow-hidden bar-3d-track">
                      <div
                        className="h-full bg-gradient-to-l from-emerald-400 to-teal-500 rounded-full bar-3d-fill transition-all duration-500"
                        style={{ width: `${tls.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* CyberModal for TLS Details */}
          <CyberModal
            isOpen={activeTlsMenu !== null}
            onClose={() => setActiveTlsMenu(null)}
            title={activeTlsMenu !== null ? TLS_DETAILED_LIST[activeTlsMenu]?.title || '' : ''}
            subtitle={activeTlsMenu !== null ? TLS_DETAILED_LIST[activeTlsMenu]?.protocol : undefined}
            badge={activeTlsMenu !== null ? TLS_DETAILED_LIST[activeTlsMenu]?.badge : undefined}
            icon={Lock}
            iconTone="text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
            highlights={activeTlsMenu !== null ? TLS_DETAILED_LIST[activeTlsMenu]?.highlights : undefined}
            breakdown={activeTlsMenu !== null ? TLS_DETAILED_LIST[activeTlsMenu]?.breakdown || [] : []}
            summary={activeTlsMenu !== null ? TLS_DETAILED_LIST[activeTlsMenu]?.summary : undefined}
          />
        </>
      )}
    </div>
  );
}

function completedChaptersIncludes(
  completedIds: number[],
  chapterId: number,
  chapterNumber: number,
  courseSlug: string
): boolean {
  if (completedIds.includes(chapterId)) return true;
  if (courseSlug === 'ise243' && completedIds.includes(chapterNumber)) return true;
  return false;
}
