/**
 * ============================================================================
 * منصة «مِرْصَاد التشفير» (Mirsad Al-Tashfeer) — جامعة الأمير مقرن بن عبدالعزيز
 * المقرر الأول: التشفير المتقدم (Advanced Cryptography) — رمز المقرر: ISE243 / 243 علم
 * ============================================================================
 * ملف برمجي مستقل وشامل ومفصل يدمج:
 * 1. الواجهات البرمجية القياسية والموسعة (CourseInfo, Chapter, FlashcardData, MiniQuiz,
 *    SlideItem, InteractiveBook3D, BookPage3D, StepWalkthrough, Hotspot3D, ChapterData).
 * 2. توصيف المقرر الكامل (COURSE_ISE243_INFO) شاملاً الرؤية والرسالة ومخرجات التعلم
 *    والخطة الأسبوعية وطرق التقييم.
 * 3. مصفوفة الفصول الكاملة (ISE243_CHAPTERS / DEFAULT_CHAPTERS / CHAPTERS) بجميع
 *    الفصول الـ 13 دون أي اختصار، مع الفئة الأولى (التنسيق الأكاديمي الموسع)
 *    والفئة الثانية (الكتاب التفاعلي ثلاثي الأبعاد interactiveBook3D).
 * ============================================================================
 */

// ═══════════════════════════════════════════════════════════════════════════
// 1. تعريف الواجهات البرمجية الكاملة (TypeScript Interfaces)
// ═══════════════════════════════════════════════════════════════════════════
import { SyncEngine } from '@/lib/syncEngine';
void SyncEngine;

export interface FlashcardData {
  front: string;
  back: string;
  category?: string;
}

export interface MiniQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SlideItem {
  id: number;
  slideNumber: number;
  title: string;
  subtitle: string;
  bullets: string[];
  keyHighlight: string;
  diagramTitle?: string;
  diagramData?: Record<string, unknown>;
}

export interface BookPage3D {
  pageNumber: number;
  title: string;
  subtitle: string;
  narrative: string;
  equation: string;
  liveGraphicType:
    | 'galois-matrix-4x4'
    | 'elliptic-curve-fp'
    | 'ecdh-ecdsa-exchange'
    | 'tls13-handshake-flow'
    | 'vpn-ipsec-wireguard'
    | 'db-encryption-hierarchy'
    | 'homomorphic-noise-tree'
    | 'zkp-schnorr-sigma'
    | 'hsm-tamper-boundary'
    | 'side-channel-power-trace'
    | 'quantum-shor-grover'
    | 'nist-pqc-lattice-hash'
    | 'sehatech-capstone-blueprint';
  liveGraphicCaption: string;
  visualNotes: string[];
}

export interface StepWalkthrough {
  step: number;
  title: string;
  description: string;
  formula?: string;
  visualState: string;
  securityNote: string;
}

export interface Hotspot3D {
  id: string;
  label: string;
  coordinates: { x: number; y: number; z: number };
  color: string;
  title: string;
  detailedExplanation: string;
  relatedEquation?: string;
  securityImpact: string;
}

export interface InteractiveBook3D {
  model3DType:
    | 'aes-state-cube'
    | 'weierstrass-torus-curve'
    | 'ecdh-key-bridge'
    | 'tls13-tunnel-prism'
    | 'ipsec-wireguard-capsule'
    | 'dek-kek-hsm-pyramid'
    | 'fhe-bootstrapping-sphere'
    | 'schnorr-sigma-vault'
    | 'fips140-hsm-fortress'
    | 'dpa-oscilloscope-core'
    | 'bloch-shor-resonator'
    | 'module-lwe-lattice-grid'
    | 'sehatech-architecture-citadel';
  shaderEffect:
    | 'emerald-matrix-glow'
    | 'cyan-curve-hologram'
    | 'amber-key-pulse'
    | 'neon-tls-stream'
    | 'cobalt-tunnel-shield'
    | 'gold-hierarchy-wireframe'
    | 'violet-noise-wave'
    | 'emerald-zkp-prism'
    | 'crimson-tamper-mesh'
    | 'amber-oscilloscope-beam'
    | 'quantum-entanglement-field'
    | 'crystalline-lattice-shader'
    | 'holistic-cyber-dome';
  sceneTitle: string;
  sceneDescription: string;
  cameraPosition?: { x: number; y: number; z: number };
  pages3D: BookPage3D[];
  stepByStep: StepWalkthrough[];
  hotspots: Hotspot3D[];
}

export interface ChapterImage {
  prompt?: string;
  caption: string;
  alt?: string;
  seed?: number;
  isAIGenerated?: boolean;
  url?: string;
}

export interface ChapterSection {
  heading: string;
  content: string;
  formula?: string;
  saudiExample?: string;
}

export interface ChapterTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface SolvedExample {
  title: string;
  given: string;
  steps: string[];
  result: string;
  whyItMatters: string;
}

export interface CodeSnippet {
  title: string;
  language: string;
  code: string;
  explanation: string;
}

export interface SelfAssessmentQA {
  question: string;
  answer: string;
}

export interface ChapterData {
  id: number;
  chapter_number: number;
  title: string;
  subtitle: string;
  category: 'أساسي' | 'رياضي' | 'متقدم' | 'شبكات' | 'كمومي' | 'تطبيقي' | string;
  pdfStartPage: number;
  pdfEndPage: number;
  description: string;
  objectives: string[];
  sections: ChapterSection[];
  tables: ChapterTable[];
  commonMistake: {
    mistake: string;
    fix: string;
  };
  solvedExample: SolvedExample;
  codeExamples?: CodeSnippet[];
  flashcards: FlashcardData[];
  selfAssessment: SelfAssessmentQA[];
  quiz: MiniQuiz[];
}

export interface Chapter {
  id: number;
  chapter_number: number;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  pdfStartPage?: number;
  pdfEndPage?: number;
  // الفئة الأولى: التنسيق الأكاديمي الموسع
  content: string;
  keyTopics: string[];
  diagramKey: string;
  diagramDescription: string;
  videoUrl: string;
  videoTitle: string;
  videoDuration?: string;
  presentationUrl?: string;
  slides: SlideItem[];
  flashcards: FlashcardData[];
  miniQuiz: MiniQuiz[];
  images?: ChapterImage[];
  richData?: ChapterData;
  // الفئة الثانية: الكتاب التفاعلي ثلاثي الأبعاد
  interactiveBook3D: InteractiveBook3D;
  updated_at: number;
}

export interface WeeklyPlanItem {
  week: number;
  topic: string;
  chapterNumber: number;
}

export interface AssessmentMethod {
  name: string;
  weight: number;
  description: string;
}

export interface CourseInfo {
  id: string;
  code: string;
  codeAr?: string;
  slug: string;
  title: string;
  titleEn: string;
  department?: string;
  university?: string;
  category: string;
  description: string;
  level: string;
  chaptersCount: number;
  totalHours: number;
  status: 'available' | 'coming-soon' | 'planned';
  color: string;
  accent?: string;
  badge: string;
  neonColor: 'amber' | 'cyan' | 'emerald';
  icon: string;
  reference: string;
  vision: string;
  mission: string;
  learningOutcomes: string[];
  weeklyPlan: WeeklyPlanItem[];
  assessmentMethods: AssessmentMethod[];
  deliveryMode: string;
  language: string;
  prerequisite: string;
  topics: string[];
  features: string[];
  chapters?: Chapter[];
}

export const TEXTBOOK_PDF_PATH = '/assets/aistudio/_____________________________b2b8da3f.pdf';

// ═══════════════════════════════════════════════════════════════════════════
// 2. مصفوفة الفصول الـ 13 الكاملة للمقرر (ISE243_CHAPTERS)
// ═══════════════════════════════════════════════════════════════════════════

export const ISE243_CHAPTERS: Chapter[] = [
  // =========================================================================
  // الفصل الأول: حقول غالوا GF(2^8) ومعيار التشفير المتقدم AES
  // =========================================================================
  {
    id: 1,
    chapter_number: 1,
    title: 'حقول غالوا GF(2^8) ومعيار التشفير المتقدم AES',
    subtitle: 'Galois Fields GF(2^8), Modular Arithmetic & Advanced Encryption Standard (AES)',
    description:
      'تأسيس المفاهيم الأساسية للتشفير (السرية، التكامل، مقاومة التصادم)، الحساب المعياري والأعداد الأولية، وبنية الحقول المنتهية GF(2^8) وتطبيقها داخل جولات خوارزمية AES.',
    category: 'أساسي',
    difficulty: 'beginner',
    pdfStartPage: 6,
    pdfEndPage: 14,
    diagramKey: 'ise243-1',
    diagramDescription:
      'مخطط متجهي لمصفوفة الحالة في AES (4×4 بايتات داخل حقل غالوا GF(2^8)) يوضح تدفق الجولات الأربع: SubBytes، ShiftRows، MixColumns، و AddRoundKey مع غياب MixColumns في الجولة النهائية.',
    videoUrl: 'https://www.youtube.com/watch?v=AQDCe585Lnc',
    videoTitle: 'البنية الجبرية لحقول غالوا GF(2^8) وتشريح خوارزمية AES بالتفصيل',
    videoDuration: '18:45',
    presentationUrl: `${TEXTBOOK_PDF_PATH}#page=6`,
    keyTopics: [
      'التمييز بين السرية (Secrecy) وتكامل البيانات (Integrity) ومقاومة التصادم',
      'الحساب المعياري (Modular Arithmetic) ودور العدد الأولي في المعكوس الضربي',
      'الحقول المنتهية GF(p) وحقول غالوا التوسعية GF(2^8)',
      'التمثيل الثنائي وتمثيل كثيرات الحدود والاختزال بـ P(x) = x^8 + x^4 + x^3 + x + 1',
      'خطوات الجولة في AES: SubBytes و ShiftRows و MixColumns و AddRoundKey',
      'صحة التنفيذ (Correctness Property) والجداول مسبقة الحساب (T-Tables 4KB)',
    ],
    content: `# الفصل الأول: مراجعة سريعة لأساسيات التشفير، ومقدمة في الجبر المتقدم وحقول غالوا $GF(2^8)$ ومعيار AES

## 1.1 أساسيات التشفير وأهدافه الأمنية
تعتمد حماية البيانات في العصر الرقمي على أسس رياضية متينة تضمن عدم قدرة الأطراف غير المصرح لها على كشف محتوى الاتصالات أو التلاعب به.
- **السرية (Secrecy / Confidentiality):** هي الآلية التي تسمح بنقل رسالة عبر قناة غير موثوقة مع الحفاظ على خفاء محتواها في ظل وجود خصم يتنصت على الاتصال (Eavesdropper).
- **تكامل البيانات (Message Integrity):** يضمن أن الخصم النشط لم يقم بتعديل بتات النص المشفر أثناء انتقاله. **تنبيه جوهري:** الخوارزميات التي توفر السرية وحدها لا تضمن تلقائياً تكامل البيانات.
- **دوال التجزئة ومقاومة التصادم (Collision Resistance):** بما أن مجال دالة التجزئة (المدخلات الممكنة) أكبر من مداها، فإن التصادمات موجودة نظرياً، لكن مقاومة التصادم تعني أنه من المستحيل حسابياً العثور على رسالتين مختلفتين $m_1 \\neq m_2$ تنتجان نفس البصمة $H(m_1) = H(m_2)$.

---page---

## 1.2 الحساب المعياري والأعداد الأولية
يُعرَّف **الحساب المعياري (Modular Arithmetic)** بأنه نظام حسابي للأعداد الصحيحة تلتف فيه الأعداد لتصل إلى الصفر عند بلوغ قيمة الترديد (Modulus $n$).
$$a \\equiv b \\pmod n \\iff n \\mid (a - b)$$
عندما يكون الترديد عدداً أولياً $p$، فإن كل عنصر غير صفري $a \\in \\{1, 2, \\dots, p-1\\}$ يمتلك **معكوساً ضربياً فريداً** $a^{-1}$ يحقق:
$$a \\times a^{-1} \\equiv 1 \\pmod p$$
مثال: في $\\mathbb{Z}_7$، المعكوس الضربي للعدد $3$ هو $5$ لأن $3 \\times 5 = 15 \\equiv 1 \\pmod 7$. وتشكّل هذه البنية حقلاً منتهياً أولياً $GF(p)$.

---page---

## 1.3 الحقول المنتهية وحقول غالوا $GF(2^8)$
في الأنظمة الحاسوبية التي تتعامل مع البايتات (8 بتات)، نحتاج إلى حقل منتهٍ يحتوي على $2^8 = 256$ عنصراً بالضبط، وهو **حقل غالوا $GF(2^8)$**.
يُمثَّل كل بايت $\\{b_7, b_6, b_5, b_4, b_3, b_2, b_1, b_0\\}$ ككثير حدود من الدرجة السابعة كحد أقصى بمعاملات في $GF(2)$:
$$B(x) = b_7 x^7 + b_6 x^6 + b_5 x^5 + b_4 x^4 + b_3 x^3 + b_2 x^2 + b_1 x + b_0$$
1. **الجمع والطرح في $GF(2^8)$:** يُنفَّذ بجمع المعاملات المتناظرة بترديد $2$، وهو ما يطابق عملية **أو الحصرية المنطقية (XOR $\\oplus$)** دون أي احتفاظ بالباقي (No Carry).
2. **الضرب والاختزال في $GF(2^8)$:** نضرب كثيري الحدود جبرياً ثم نختزل الناتج بقسمته على **كثير حدود غير قابل للاختزال (Irreducible Polynomial)** من الدرجة الثامنة. في معيار AES يُستخدم كثير الحدود القياسي:
$$P(x) = x^8 + x^4 + x^3 + x + 1 \\quad (\\text{ثنائياً: } 100011011_2 = \\text{0x11B})$$

---page---

## 1.4 تطبيق الحقول المنتهية في معيار التشفير المتقدم (AES)
يعمل معيار AES على كتلة بحجم **128 بت** (16 بايت) تُنظَّم في مصفوفة حالة (State Matrix) بأبعاد $4 \\times 4$ بايتات. وتعتمد كل جولة تشفير على أربع تحويلات رياضية قابلة للعكس:

| الخطوة | العملية الرياضية في $GF(2^8)$ | الغرض التشفيري |
| :--- | :--- | :--- |
| **1. SubBytes** | إيجاد المعكوس الضربي $a^{-1}$ في $GF(2^8)$ متبوعاً بتحويل تآلفي (S-Box) | اللاخطية (Non-linearity) ومقاومة التحليل التفاضلي والخطي |
| **2. ShiftRows** | إزاحة دائرية لصفوف مصفوفة الحالة بمقدار $(0, 1, 2, 3)$ بايتات | نشر البايتات عبر الأعمدة المختلفة (Diffusion) |
| **3. MixColumns** | ضرب كل عمود في مصفوفة ثابتة قابلة للعكس داخل $GF(2^8)$ | خلط البايتات داخل العمود الواحد لتحقيق أثر الانهيار الجليدي |
| **4. AddRoundKey** | عملية XOR مباشرة بين مصفوفة الحالة ومفتاح الجولة الفرعي | دمج سرية المفتاح مع الحالة |

> [!important]
> **ملاحظة معمارية حاسمة:** تخلو الجولة الأخيرة (الجولة 10 في AES-128، و12 في AES-192، و14 في AES-256) من خطوة **MixColumns** لضمان تماثل هيكل التشفير وفك التشفير. كما تُستخدم **الجداول مسبقة الحساب (Pre-computed T-Tables بحجم 4 كيلوبايت)** في الخوادم عالية الأداء لدمج خطوات الجولة في عمليات بحث ذاكرية وعمليات XOR سريعة.`,
    images: [
      {
        prompt: 'AES state matrix 4x4 bytes, SubBytes ShiftRows MixColumns visualization, cryptographic round, emerald and blue, academic, 16:9',
        caption: 'خطوات الجولة الواحدة في AES داخل حقل غالوا GF(2^8): SubBytes, ShiftRows, MixColumns, AddRoundKey',
        alt: 'AES state matrix 4x4 bytes visualization',
        seed: 101,
        isAIGenerated: true,
      },
      {
        prompt: 'Advanced Encryption Standard key expansion, 128 192 256 bit key schedule, cryptographic diagram, clean academic, 16:9',
        caption: 'بنية الجولات وتوسيع المفتاح في AES-128/192/256',
        alt: 'AES key expansion schedule',
        seed: 102,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'أهداف التشفير الحديث: السرية، التكامل، ومقاومة التصادم',
        subtitle: 'الفصل الأول — الأساس المفاهيمي لحماية الاتصالات',
        bullets: [
          'السرية (Secrecy) تحمي محتوى الرسالة من المتنصت السلبي عبر دوال التشفير المتماثلة وغير المتماثلة.',
          'تكامل البيانات (Integrity) يمنع الخصم النشط من تعديل البتات المشفرة دون اكتشاف.',
          'التشفير وحده لا يضمن التكامل؛ بل يجب اقترانه بدوال التجزئة أو رموز المصادقة (MAC / AEAD).',
          'مقاومة التصادم (Collision Resistance) تضمن استحالة إيجاد رسالتين لهما نفس قيمة التجزئة حسابياً.',
        ],
        keyHighlight: 'الخطأ الهندسي الشائع هو الافتراض بأن تشفير الرسالة يحميها من التعديل؛ السرية والتكامل هدفان مستقلان.',
        diagramTitle: 'منظومة التشفير والتكامل بين أليس وبوب',
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'الحساب المعياري والأعداد الأولية GF(p)',
        subtitle: 'الأساس الجبري للالتفاف الرقمي والمعكوس الضربي',
        bullets: [
          'في الحساب المعياري بترديد n، تلتف جميع النواتج لتبقى ضمن النطاق المحدود {0, 1, ..., n-1}.',
          'الجمع والطرح والضرب المعياري تحافظ على انغلاق المجموعة وتمنع تضخم الأرقام في الذاكرة.',
          'القسمة في الحساب المعياري تتطلب الضرب في المعكوس الضربي a^(-1) mod p.',
          'اختيار عدد أولي p كترديد يضمن أن كل عنصر غير صفري يمتلك معكوساً ضربياً فريداً.',
        ],
        keyHighlight: 'بدون العدد الأولي p، تفقد بعض العناصر معكوسها الضربي وتستحيل عملية فك التشفير العكسية.',
        diagramTitle: 'حلقة الحساب المعياري والمعكوس الضربي في GF(7)',
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'بنية حقل غالوا GF(2^8) وتمثيل كثيرات الحدود',
        subtitle: 'تحويل البايت الثماني إلى كائن جبري في حقل من 256 عنصراً',
        bullets: [
          'كل بايت (8 بتات) يمثل كثير حدود من الدرجة السابعة كحد أقصى بمعاملات في {0,1}.',
          'الجمع والطرح في GF(2^8) يتمان بعملية XOR المنطقية للبتات المتقابلة دون حمل (Carry).',
          'ضرب عنصرين يتم بضرب كثيرات الحدود ثم الاختزال بكثير حدود غير قابل للاختزال من الدرجة 8.',
          'كثير الحدود المعتمد في معيار AES هو P(x) = x^8 + x^4 + x^3 + x + 1 (0x11B).',
        ],
        keyHighlight: 'التعامل مع البايت ككثير حدود في GF(2^8) يمكّن المعالج من تنفيذ الجمع في دورة ساعة واحدة بعملية XOR.',
        diagramTitle: 'الضرب والاختزال في حقل غالوا GF(2^8)',
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'معمارية معيار التشفير المتقدم (AES-128/192/256)',
        subtitle: 'مصفوفة الحالة 4×4 والتحويلات الأربعة للجولة',
        bullets: [
          'يعالج AES كتلة ثابتة بحجم 128 بت (16 بايت) مرتبة في مصفوفة حالة 4×4 بايتات.',
          'SubBytes: استبدال غير خطي يعتمد على المعكوس الضربي في GF(2^8) لبناء صندوق S-Box.',
          'ShiftRows و MixColumns: تحقيق الانتشار الكامل (Diffusion) عبر الصفوف والأعمدة.',
          'AddRoundKey: دمج مفتاح الجولة مع مصفوفة الحالة عبر عملية XOR المباشرة.',
        ],
        keyHighlight: 'الجولة الأخيرة في جميع إصدارات AES تحذف خطوة MixColumns لجعل بنية فك التشفير مطابقة لبنية التشفير.',
        diagramTitle: 'مصفوفة الحالة 4×4 ومسار الجولة في AES',
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'صحة التنفيذ وتسريع الأداء بالجداول مسبقة الحساب',
        subtitle: 'من المعادلات الجبرية إلى الأداء الفائق في الخوادم المالية',
        bullets: [
          'شرط صحة التنفيذ (Correctness): فك تشفير أي نص مشفر بالمفتاح الصحيح يعيد الرسالة الأصلية دائماً.',
          'كل خطوة في AES تمتلك معكوساً رياضياً دقيقاً: InvSubBytes، InvShiftRows، InvMixColumns.',
          'الجداول مسبقة الحساب (Pre-computed Tables بحجم 4KB) تدمج SubBytes و ShiftRows و MixColumns.',
          'تُستخدم تعليمات AES-NI العتادية والجداول المسبقة لتسريع بوابات الدفع الإلكتروني السعودية.',
        ],
        keyHighlight: 'دمج عمليات الحقل المنتهي في جداول 4 كيلوبايت يحول الضرب الجبري المعقد إلى قراءات ذاكرية فورية.',
        diagramTitle: 'مقارنة الأداء بين الحساب المباشر والجداول مسبقة الحساب',
      },
    ],
    flashcards: [
      {
        front: 'ما الفرق الجوهري بين التشفير المتماثل والتشفير غير المتماثل؟',
        back: 'التشفير المتماثل يستخدم نفس المفتاح السري للتشفير وفك التشفير، بينما غير المتماثل يستخدم مفتاحاً عاماً للتشفير ومفتاحاً خاصاً لفك التشفير.',
        category: 'أساسيات',
      },
      {
        front: 'كيف تُنفَّذ عمليتا الجمع والطرح داخل حقل غالوا GF(2^n)؟',
        back: 'تُنفذان معاً باستخدام عملية أو الحصرية المنطقية (XOR) للبتات المتقابلة دون احتفاظ بالباقي (بدون Carry).',
        category: 'رياضيات',
      },
      {
        front: 'ما هو كثير الحدود غير القابل للاختزال المستخدم في معيار AES داخل حقل GF(2^8)؟',
        back: 'كثير الحدود هو P(x) = x^8 + x^4 + x^3 + x + 1 ويكافئ بالتمثيل الثنائي 100011011 وبالست عشري 0x11B.',
        category: 'رياضيات',
      },
      {
        front: 'ما هي خطوات الجولة القياسية الأربع في خوارزمية AES؟',
        back: '1. SubBytes (استبدال البايتات)، 2. ShiftRows (إزاحة الصفوف)، 3. MixColumns (خلط الأعمدة)، 4. AddRoundKey (إضافة مفتاح الجولة).',
        category: 'خوارزميات',
      },
      {
        front: 'لماذا تُحذف خطوة MixColumns من الجولة الأخيرة في خوارزمية AES؟',
        back: 'لأنها لا تضيف أماناً إضافياً قبل آخر AddRoundKey، وحذفها يجعل بنية خوارزمية فك التشفير متماثلة مع بنية التشفير ومتوافقة مع المعايير.',
        category: 'خوارزميات',
      },
      {
        front: 'ما دور الجداول مسبقة الحساب (Pre-computed T-Tables) بحجم 4 كيلوبايت في AES؟',
        back: 'تخزن نواتج الاستبدال وخلط الأعمدة مسبقاً، مما يستبدل عمليات الضرب والاختزال في GF(2^8) بعمليات قراءة من الذاكرة و XOR سريعة.',
        category: 'أداء',
      },
    ],
    miniQuiz: [
      {
        question: 'كم عدد الجولات في خوارزمية AES-256 وما هو حجم كتلة البيانات التي تعالجها؟',
        options: [
          '10 جولات وكتلة بحجم 128 بت',
          '12 جولة وكتلة بحجم 192 بت',
          '14 جولة وكتلة بحجم 128 بت',
          '14 جولة وكتلة بحجم 256 بت',
        ],
        correctIndex: 2,
        explanation:
          'جميع إصدارات AES (128 و 192 و 256) تعالج كتلة بيانات ثابتة بحجم 128 بت (16 بايت)، بينما يبلغ عدد الجولات في AES-256 أربع عشرة (14) جولة.',
      },
      {
        question: 'ما ناتج جمع العنصرين (x^2 + 1) و (x + 1) الممثلين ثنائياً بـ 101 و 011 في حقل غالوا GF(2^3)؟',
        options: ['111 (x^2 + x + 1)', '110 (x^2 + x)', '100 (x^2)', '001 (1)'],
        correctIndex: 1,
        explanation:
          'الجمع في حقل غالوا يتم بعملية XOR للبتات المتقابلة: 101 ⊕ 011 = 110، حيث يختفي الحد الثابت 1 ⊕ 1 = 0 ويتبقى x^2 + x.',
      },
      {
        question: 'ما هو المعكوس الضربي للعدد 3 في الحساب المعياري بترديد العدد الأولي 7؟',
        options: ['2', '4', '5', '6'],
        correctIndex: 2,
        explanation:
          'نبحث عن عدد يضرب في 3 فيعطي باقي قسمة 1 على 7؛ وبما أن 3 × 5 = 15 و 15 = 2×7 + 1، فإن المعكوس الضربي هو 5.',
      },
      {
        question: 'أي خطوة من خطوات جولة AES تعتمد مباشرة على إيجاد المعكوس الضربي للبايت في حقل غالوا GF(2^8)؟',
        options: ['ShiftRows', 'SubBytes', 'AddRoundKey', 'KeyExpansion فقط'],
        correctIndex: 1,
        explanation:
          'خطوة SubBytes تستبدل كل بايت بمعكوسه الضربي في حقل GF(2^8) متبوعاً بتحويل تآلفي لبناء جدول S-Box غير الخطي.',
      },
    ],
    richData: {
      id: 1,
      chapter_number: 1,
      title: 'مراجعة سريعة لأساسيات التشفير، ومقدمة في الجبر المتقدم وحقول غالوا',
      subtitle: 'Galois Fields & Advanced Encryption Standard (AES)',
      category: 'أساسي',
      pdfStartPage: 6,
      pdfEndPage: 14,
      description:
        'تأسيس المفاهيم الأساسية للتشفير (السرية، التكامل، مقاومة التصادم)، الحساب المعياري والأعداد الأولية، وبنية الحقول المنتهية GF(2^8) وتطبيقها داخل خوارزمية AES.',
      objectives: [
        'التمييز الدقيق بين السرية (Secrecy) وتكامل البيانات (Message Integrity) والمصادقة.',
        'فهم الحساب المعياري (Modular Arithmetic) ودور العدد الأولي في ضمان وجود المعكوس الضربي.',
        'تمثيل عناصر حقل غالوا GF(2^8) ثنائياً وككثيرات حدود وإجراء الجمع بـ XOR والضرب مع الاختزال.',
        'تحليل البنية الداخلية لخوارزمية AES (SubBytes, ShiftRows, MixColumns) والجداول مسبقة الحساب.',
      ],
      sections: [
        {
          heading: '1.1 أساسيات التشفير وأهدافه',
          content:
            'تُعرّف السرية (Secrecy) بأنها الآلية التي تسمح بنقل رسالة عبر شبكة مع الحفاظ على خفاء محتواها في ظل وجود خصم يتنصت على الاتصال. أما تكامل البيانات (Message Integrity) فيضمن أن الخصم لم يقم بتعديل بتات النص المشفر أثناء انتقاله. الخوارزميات التشفيرية التي توفر السرية لا توفر بالضرورة التكامل، لذا تُستخدم دوال التجزئة (Hash Functions) التي تتميز بمقاومة التصادم (Collision Resistance).',
          saudiExample:
            'تبادل بيانات مالية بين فرعين لمصرف محلي في الرياض وجدة باستخدام مفتاح تشفير يضمن سرية الأرقام المنقولة، مع استخدام دالة تجزئة لضمان عدم تلاعب أي وسيط بالبيانات.',
        },
        {
          heading: '1.2 الحساب المعياري والأعداد الأولية',
          content:
            'الحساب المعياري (Modular Arithmetic) هو نظام حسابي للأعداد الصحيحة حيث تلتف الأعداد لتصل إلى الصفر عند بلوغ قيمة الترديد (Modulo). عندما يكون الترديد عدداً أولياً p، فإن كل عنصر غير صفري يمتلك معكوساً ضربياً (Multiplicative Inverse) يحقق a × a⁻¹ ≡ 1 (mod p)، مما يشكل حقلاً منتهياً GF(p).',
          formula: '3 × 5 = 15 ≡ 1 (mod 7)  ⟹  3⁻¹ ≡ 5 (mod 7)',
          saudiExample:
            'نظام تشفير مبسط لجدول مناوبات حراس أمن يستخدم ترديد 24 لتمثيل ساعات اليوم: 20 + 7 = 27 ≡ 3 فجراً (mod 24).',
        },
        {
          heading: '1.3 و 1.4 الحقول المنتهية وحقول غالوا GF(2^8)',
          content:
            'في معيار التشفير المتقدم (AES)، يُستخدم حقل غالوا ذو 256 عنصراً GF(2^8) حيث يُمثل كل بايت (8 بتات) ككثير حدود من الدرجة السابعة كحد أقصى. يُنفذ الجمع داخل الحقل بعملية أو الحصرية (XOR) للبتات المتقابلة دون احتفاظ بالباقي (Carry)، بينما يتطلب الضرب ضرب كثيري الحدود ثم الاختزال بكثير الحدود غير القابل للاختزال.',
          formula: 'P(x) = x⁸ + x⁴ + x³ + x + 1   (في حقل GF(2^8) لمعيار AES)',
        },
        {
          heading: '1.5 تطبيق الحقول المنتهية في معيار التشفير المتقدم (AES)',
          content:
            'تعمل خوارزمية AES على كتل بيانات بحجم 128 بتاً تُنظم كمصفوفة 4×4 من البايتات. تعتمد خطوة SubBytes على إيجاد المعكوس الضربي في GF(2^8)، وتعتمد خطوة MixColumns على ضرب المصفوفة في حقل غالوا. وتخلو الجولة الأخيرة من خطوة MixColumns.',
          saudiExample:
            'تُستخدم الجداول مسبقة الحساب (Pre-computed tables بحجم 4 كيلوبايت) لتسريع عمليات التشفير في خوادم بوابات الدفع الإلكتروني السعودية لتقليل وقت الاستجابة للعملاء.',
        },
      ],
      tables: [
        {
          title: 'جدول 1.2: خصائص إصدارات خوارزمية AES',
          headers: ['اسم الخوارزمية', 'حجم المفتاح (بت)', 'حجم الكتلة (بت)', 'عدد الجولات'],
          rows: [
            ['AES-128', '128', '128', '10'],
            ['AES-192', '192', '128', '12'],
            ['AES-256', '256', '128', '14'],
          ],
        },
      ],
      commonMistake: {
        mistake:
          'استخدام الجمع الحسابي التقليدي (مع الاحتفاظ بالباقي Carry) بدلاً من XOR عند جمع عناصر حقل غالوا، أو نسيان حذف خطوة MixColumns من الجولة الأخيرة في AES.',
        fix: 'استخدام المعاملات المنطقية (Bitwise XOR ^) لجمع عناصر الحقل، وتطبيق دالة الجولة الأخيرة المعدلة الخالية من خلط الأعمدة لضمان التوافق القياسية.',
      },
      solvedExample: {
        title: 'اختزال كثير حدود في حقل محدود GF(2^3)',
        given:
          'العنصر الأول: x² + 1 (ثنائياً 101)، العنصر الثاني: x + 1 (ثنائياً 011)، كثير الحدود غير القابل للاختزال: x³ + x + 1 (ثنائياً 1011).',
        steps: [
          '1. يُضرب العنصران ككثيري حدود: (x² + 1)(x + 1) = x³ + x² + x + 1.',
          '2. درجة الناتج (3) تساوي درجة كثير الحدود غير القابل للاختزال، مما يستوجب الاختزال.',
          '3. شرط الاختزال بمساواة كثير الحدود بالصفر بترديد 2: x³ + x + 1 = 0 ⟹ x³ = x + 1.',
          '4. يُستبدل الحد x³ في الناتج بقيمته المكافئة (x + 1): (x + 1) + x² + x + 1.',
          '5. تُجمع الحدود المتشابهة بـ XOR: الحد x + x = 0، والحد 1 + 1 = 0.',
        ],
        result: 'يتبقى الحد x² فقط (ثنائياً: 100).',
        whyItMatters:
          'يضمن الاختزال بقاء نواتج الضرب كعناصر صالحة داخل الحقل المنتهي، ويمنع تضخم المعاملات.',
      },
      flashcards: [
        {
          front: 'ما الفرق بين التشفير المتماثل وغير المتماثل؟',
          back: 'المتماثل يستخدم نفس المفتاح السري للتشفير وفك التشفير، بينما غير المتماثل يستخدم مفتاحاً عاماً للتشفير ومفتاحاً خاصاً لفك التشفير.',
        },
        {
          front: 'كيف يُنفذ الجمع في حقل غالوا GF(2^n)؟',
          back: 'باستخدام عملية أو الحصرية (XOR) للبتات المتقابلة دون احتفاظ بالباقي (ترديد 2).',
        },
        {
          front: 'لماذا تُحذف خطوة MixColumns في الجولة الأخيرة من AES؟',
          back: 'لضمان تماثل بنية التشفير وفك التشفير والتوافق مع متجهات الاختبار القياسية.',
        },
      ],
      selfAssessment: [
        {
          question: 'عرّف الخوارزمية التشفيرية؟',
          answer:
            'هي الآلية الأساسية لتشفير رسالة باستخدام مفتاح، وتتكون من زوج من الدوال: دالة التشفير ودالة فك التشفير.',
        },
        {
          question: 'علّل أهمية العدد الأولي في ضمان وجود المعكوس الضربي؟',
          answer:
            'لأن استخدام عدد أولي كترديد يضمن أن كل عدد غير صفري يمتلك معكوساً ضربياً، مما يسمح بإجراء العمليات العكسية (القسمة).',
        },
        {
          question: 'كيف يساهم التمثيل الثنائي والجداول مسبقة الحساب في رفع كفاءة AES؟',
          answer:
            'التمثيل الثنائي يسمح بإجراء الجمع بتعليمة XOR سريعة، والجداول مسبقة الحساب (4KB) تدمج الاستبدال وخلط الأعمدة بقراءات مباشرة من الذاكرة.',
        },
      ],
      quiz: [
        {
          question: 'كم عدد الجولات في خوارزمية AES-256؟',
          options: ['10 جولات', '12 جولة', '14 جولة', '16 جولة'],
          correctIndex: 2,
          explanation: 'يعمل معيار AES-256 بمفتاح طوله 256 بت وكتلة 128 بت وينفذ 14 جولة.',
        },
        {
          question: 'ما ناتج جمع العنصرين 011 و 101 في حقل غالوا GF(2^3)؟',
          options: ['111', '110', '100', '001'],
          correctIndex: 1,
          explanation: 'الجمع في حقل غالوا يتم بعملية XOR للبتات المتقابلة: 011 ⊕ 101 = 110.',
        },
        {
          question: 'ما المعكوس الضربي للعدد 3 في الحساب المعياري بترديد 7؟',
          options: ['2', '4', '5', '6'],
          correctIndex: 2,
          explanation: 'لأن 3 × 5 = 15، وباقي قسمة 15 على 7 هو 1.',
        },
      ],
    },
    interactiveBook3D: {
      model3DType: 'aes-state-cube',
      shaderEffect: 'emerald-matrix-glow',
      sceneTitle: 'مجسم مصفوفة الحالة ثلاثي الأبعاد لخوارزمية AES في حقل GF(2^8)',
      sceneDescription:
        'مكعب تفاعلي ثلاثي الأبعاد يمثل مصفوفة الحالة 4×4 بايتات (128 بت) عبر جولات AES، مع إضاءة زمردية وكهرمانية توضح انتقال كل بايت عبر S-Box وإزاحة الصفوف وخلط الأعمدة.',
      cameraPosition: { x: 0, y: 2.5, z: 6.5 },
      pages3D: [
        {
          pageNumber: 1,
          title: 'تمثيل البايتات ككثيرات حدود في GF(2^8)',
          subtitle: 'من البتات الثمانية إلى عناصر الحقل المنتهي',
          narrative:
            'يتحول كل بايت في مصفوفة الحالة إلى كثير حدود من الدرجة السابعة، حيث تُنفذ عمليات الجمع ببوابات XOR المنطقية الفورية، وتُختزل نواتج الضرب بكثير الحدود غير القابل للاختزال.',
          equation: 'P(x) = x^8 + x^4 + x^3 + x + 1 \\equiv 0 \\pmod 2',
          liveGraphicType: 'galois-matrix-4x4',
          liveGraphicCaption: 'شبكة مصفوفة الحالة 4×4 بايتات وتمثيلها الجبري في GF(2^8)',
          visualNotes: [
            'كل خلية في المكعب تحتوي على 8 بتات تمثل عنصراً من 256 عنصراً في الحقل.',
            'عملية الجمع في الحقل لا تولد أي بت محمول (Carry-free addition).',
          ],
        },
        {
          pageNumber: 2,
          title: 'تحويلات الجولة: اللاخطية والانتشار (Confusion & Diffusion)',
          subtitle: 'تكامل SubBytes و ShiftRows و MixColumns',
          narrative:
            'يحقق SubBytes اللاخطية عبر المعكوس الضربي في GF(2^8)، بينما توزع ShiftRows البايتات أفقياً، وتخلط MixColumns كل عمود بضرب مصفوفي يضمن أن تغير بت واحد يغير نصف بتات المخرج.',
          equation: 'S^{\\prime}_{i,j} = \\text{Affine}\\left((S_{i,j})^{-1} \\text{ in } GF(2^8)\\right)',
          liveGraphicType: 'galois-matrix-4x4',
          liveGraphicCaption: 'محاكاة حية لانتشار البايتات عبر الصفوف والأعمدة في الجولة الواحدة',
          visualNotes: [
            'الصف 0 لا يزاح، الصف 1 يزاح بايتاً واحداً، الصف 2 بايتين، الصف 3 ثلاثة بايتات.',
            'MixColumns تضرب كل عمود بالمصفوفة الثابتة {02, 03, 01, 01}.',
          ],
        },
        {
          pageNumber: 3,
          title: 'دمج المفتاح الفرعي والجولة النهائية',
          subtitle: 'AddRoundKey والتماثل العكسي لفك التشفير',
          narrative:
            'تُختتم كل جولة بعملية AddRoundKey التي تدمج 128 بت من مفتاح الجولة المشتق مع مصفوفة الحالة، وتُحذف MixColumns من الجولة الأخيرة لتوحيد معمارية التشفير وفك التشفير.',
          equation: '\\text{State}_{r} = \\text{State}_{r-1} \\oplus K_r',
          liveGraphicType: 'galois-matrix-4x4',
          liveGraphicCaption: 'تطبيق مفتاح الجولة K_r عبر بوابات XOR ثلاثية الأبعاد',
          visualNotes: [
            'AES-128 ينفذ 10 جولات، AES-192 ينفذ 12 جولة، AES-256 ينفذ 14 جولة.',
            'الجداول مسبقة الحساب (4KB) تدمج الخطوات في عمليات قراءة سريعة.',
          ],
        },
      ],
      stepByStep: [
        {
          step: 1,
          title: 'تهيئة مصفوفة الحالة وإضافة المفتاح الأولي (Initial AddRoundKey)',
          description:
            'تنظيم كتلة النص الصريح (16 بايت) في مصفوفة 4×4 بايتات بترتيب الأعمدة، ثم إجراء عملية XOR مع المفتاح الأولي K_0.',
          formula: 'S_0 = \\text{Plaintext} \\oplus K_0',
          visualState: 'إضاءة خلايا المكعب الـ 16 باللون الأزرق السماوي عند اندماج المفتاح K_0.',
          securityNote: 'بدء التشفير بـ AddRoundKey يمنع المهاجم من عكس الخطوات غير المعتمدة على المفتاح في البداية.',
        },
        {
          step: 2,
          title: 'استبدال البايتات اللاخطي (SubBytes / S-Box)',
          description:
            'استبدال كل بايت في المصفوفة بمعكوسه الضربي في حقل GF(2^8) متبوعاً بتحويل تآلفي مع الثابت 0x63.',
          formula: 'b^{\\prime} = M \\cdot b^{-1} \\oplus \\text{0x63}',
          visualState: 'دوران كل خلية في المكعب حول محورها وتحول لونها إلى الأخضر الزمردي.',
          securityNote: 'هي الخطوة الوحيدة غير الخطية في AES وتحمي من التحليل التفاضلي والخطي.',
        },
        {
          step: 3,
          title: 'الإزاحة الدائرية للصفوف (ShiftRows)',
          description:
            'إزاحة الصف الثاني بمقدار بايت واحد لليسار، والصف الثالث بمقدار بايتين، والصف الرابع بمقدار 3 بايتات.',
          formula: 'S^{\\prime}_{r, c} = S_{r, (c + r) \\bmod 4}',
          visualState: 'انزلاق طبقات المكعب الأفقية بشكل متدرج لتفكيك ارتباط الأعمدة.',
          securityNote: 'تضمن عدم بقاء بايتات العمود الواحد معاً في الجولة التالية.',
        },
        {
          step: 4,
          title: 'خلط الأعمدة الجبري (MixColumns)',
          description:
            'ضرب كل عمود من أعمدة المصفوفة الأربعة في كثير حدود ثابت داخل حقل GF(2^8) مع الاختزال بـ 0x11B.',
          formula: 'C^{\\prime}(x) = (03x^3 + 01x^2 + 01x + 02) \\otimes C(x) \\pmod{x^4 + 1}',
          visualState: 'توهج الأعمدة الرأسية باللون الكهرماني وامتزاج قيم الخلايا الأربع في كل عمود.',
          securityNote: 'تحقق أثر الانهيار الجليدي الكامل خلال جولتين فقط؛ وتُحذف في الجولة الأخيرة.',
        },
        {
          step: 5,
          title: 'إضافة مفتاح الجولة (AddRoundKey)',
          description:
            'إجراء عملية XOR بين مصفوفة الحالة الناتجة ومفتاح الجولة الفرعي المشتق من جدول توسيع المفتاح (Key Schedule).',
          formula: 'S_{\\text{out}} = S_{\\text{mixed}} \\oplus K_r',
          visualState: 'إغلاق القفل الضوئي للجولة والانتقال إلى الجولة التالية حتى اكتمال الجولات.',
          securityNote: 'كل جولة تستخدم مفتاحاً فرعياً مختلفاً لمنع هجمات الانزلاق (Slide Attacks).',
        },
      ],
      hotspots: [
        {
          id: 'aes-sbox-cell',
          label: 'خلية S-Box (SubBytes)',
          coordinates: { x: -1.5, y: 1.5, z: 1.5 },
          color: '#10b981',
          title: 'صندوق الاستبدال اللاخطي في GF(2^8)',
          detailedExplanation:
            'يحسب المعكوس الضربي للبايت في حقل غالوا GF(2^8) بمقياس كثير الحدود x^8 + x^4 + x^3 + x + 1، حيث يُعيَّن العنصر الصفري 0x00 إلى 0x63 بعد التحويل التآلفي.',
          relatedEquation: 'a \\otimes a^{-1} \\equiv 1 \\pmod{x^8 + x^4 + x^3 + x + 1}',
          securityImpact: 'يكسر العلاقات الجبرية الخطية بين النص الصريح والنص المشفر.',
        },
        {
          id: 'aes-shiftrows-layer',
          label: 'طبقة إزاحة الصفوف (ShiftRows)',
          coordinates: { x: 1.5, y: 0.5, z: 1.5 },
          color: '#06b6d4',
          title: 'الانتشار الأفقي عبر الأعمدة',
          detailedExplanation:
            'تعيد توزيع البايتات الأربعة لكل عمود بحيث ينتقل كل بايت إلى عمود مختلف في الجولة التالية، مما يضمن انتشار تأثير أي بت متغير إلى جميع البايتات الـ 16.',
          relatedEquation: '\\text{Row}_r \\ll r \\text{ bytes}\\; (r \\in \\{0,1,2,3\\})',
          securityImpact: 'يمنع عمل الأعمدة الأربعة كأربعة مشفرات مستقلة بحجم 32 بت.',
        },
        {
          id: 'aes-mixcolumns-pillar',
          label: 'عمود الخلط الجبري (MixColumns)',
          coordinates: { x: -0.5, y: -1.0, z: 1.5 },
          color: '#f59e0b',
          title: 'مصفوفة الانتشار الأقصى (MDS Matrix)',
          detailedExplanation:
            'تستخدم مصفوفة MDS فوق GF(2^8) بمعاملات صغيرة {0x01, 0x02, 0x03} ليكون عدد البايتات النشطة على الأقل 5 بايتات لكل عمود غير صفري.',
          relatedEquation: 's^{\\prime}_{0,c} = (\\text{0x02} \\bullet s_{0,c}) \\oplus (\\text{0x03} \\bullet s_{1,c}) \\oplus s_{2,c} \\oplus s_{3,c}',
          securityImpact: 'يضمن مقاومة عالية جداً ضد التحليل التفاضلي بحد أدنى 25 صندوق S-Box نشط في 4 جولات.',
        },
        {
          id: 'aes-roundkey-core',
          label: 'نواة مفتاح الجولة (AddRoundKey)',
          coordinates: { x: 1.5, y: -1.5, z: 0.0 },
          color: '#ec4899',
          title: 'دمج المفتاح المشتق بعملية XOR',
          detailedExplanation:
            'عملية ثنائية عكسية لذاتها (Self-inverse) تدمج 128 بت من المفتاح الموسع مع مصفوفة الحالة، وتُسرَّع في الخوادم عبر الجداول مسبقة الحساب (4KB T-Tables).',
          relatedEquation: 'S \\oplus K_r \\oplus K_r = S',
          securityImpact: 'تعتمد سرية الخوارزمية بالكامل على عدم معرفة مفاتيح الجولات الفرعية.',
        },
      ],
    },
    updated_at: 1730937600000,
  },

  // =========================================================================
  // الفصل الثاني: التشفير بالمنحنيات الإهليلجية (ECC) والأساس الرياضي فوق F_p
  // =========================================================================
  {
    id: 2,
    chapter_number: 2,
    title: 'التشفير بالمنحنيات الإهليلجية (ECC) والأساس الرياضي فوق F_p',
    subtitle: 'Elliptic Curve Cryptography over Finite Fields F_p, Point Arithmetic & Twist Security',
    description:
      'دراسة معادلة المنحنى الإهليلجي (فايرشتراس، مونتغمري، إدواردز)، جمع ومضاعفة النقاط فوق الحقول المحدودة F_p، الضرب القياسي السريع بخوارزمية المضاعفة والجمع، وأمن الالتواء.',
    category: 'رياضي',
    difficulty: 'intermediate',
    pdfStartPage: 15,
    pdfEndPage: 24,
    diagramKey: 'ise243-2',
    diagramDescription:
      'مخطط هندسي وجبري لمنحنى إهليلجي بصيغة فايرشتراس y^2 = x^3 + ax + b يوضح عمليتي جمع نقطتين بالوتر (P + Q) ومضاعفة النقطة بالمماس (2P) والانعكاس حول محور السينات.',
    videoUrl: 'https://www.youtube.com/watch?v=NF1pwjL9-DE',
    videoTitle: 'الأساس الرياضي للمنحنيات الإهليلجية ECC والضرب القياسي فوق الحقول المحدودة',
    videoDuration: '21:10',
    presentationUrl: `${TEXTBOOK_PDF_PATH}#page=15`,
    keyTopics: [
      'معادلة فايرشتراس y^2 = x^3 + ax + b وشرط عدم الانحلال 4a^3 + 27b^2 ≠ 0',
      'صيغ مونتغمري وإدواردز (x^2 + y^2 = 1 + dx^2y^2) ومزايا القانون الموحد للجمع',
      'جمع النقاط (ميل الوتر) ومضاعفة النقطة (ميل المماس) فوق الحقل المحدود F_p',
      'الضرب القياسي αP وخوارزمية المضاعفة والجمع (Double-and-Add) بتعقيد 2 log_2(α)',
      'مسألة اللوغاريتم المتقطع على المنحنى الإهليلجي (ECDLP) ومقارنة أحجام المفاتيح مع RSA',
      'المنحنيات المعيارية (secp256r1, secp256k1, Curve25519) وهجمات الالتواء (Twist Attacks)',
    ],
    content: `# الفصل الثاني: تشفير المنحنيات الإهليلجية (ECC) والأساس الرياضي فوق $\\mathbb{F}_p$

## 2.1 مقدمة: لماذا المنحنيات الإهليلجية؟
تحتاج أنظمة المفتاح العام إلى بنية رياضية يسهل فيها تنفيذ العملية الأمامية ويصعب عكسها. تاريخياً استُخدمت الأعداد الصحيحة بترديد عدد أولي كبير (كما في RSA)، لكنها تتطلب مفاتيح ضخمة (2048 إلى 4096 بت) بسبب وجود خوارزمية **منخل حقل الأعداد العام (GNFS)** ذات التعقيد شبه الأسي. في المقابل، توفر زمرة نقاط المنحنى الإهليلجي أماناً مكافئاً بمفاتيح أصغر بكثير (**256 بت تعادل أمان RSA-2048 و AES-128**).

---page---

## 2.2 معادلة فايرشتراس والصيغ البديلة (مونتغمري وإدواردز)
تُكتب الصيغة القياسية للمنحنى الإهليلجي (**صيغة فايرشتراس القصيرة**) فوق حقل محدود $\\mathbb{F}_p$ (حيث $p > 3$ عدد أولي) على النحو:
$$y^2 \\equiv x^3 + ax + b \\pmod p$$
بشرط عدم الانحلال الرياضي (عدم وجود جذور مزدوجة أو نقاط تفرد):
$$4a^3 + 27b^2 \\not\\equiv 0 \\pmod p$$
بالإضافة إلى النقاط $(x, y)$ التي تحقق المعادلة، تضم الزمرة **نقطة اللانهاية $\\mathcal{O}$** التي تعمل كعنصر محايد للجمع ($P + \\mathcal{O} = P$)، ومعكوس النقطة $P = (x, y)$ هو $-P = (x, -y \\bmod p)$.
- **صيغة إدواردز (Edwards Curves):** $x^2 + y^2 = 1 + dx^2y^2$، وتتميز بقانون جمع موحد وكامل لا يحتاج إلى تفرعات شرطية بين الجمع والمضاعفة، مما يحصن التنفيذ ضد هجمات التوقيت.

---page---

## 2.3 قوانين جمع ومضاعفة النقاط فوق $\\mathbb{F}_p$
ليكن لدينا نقطتان $P = (x_1, y_1)$ و $Q = (x_2, y_2)$ على المنحنى (حيث $P \\neq -Q$):
1. **جمع نقطتين مختلفتين ($P \\neq Q$ — طريقة الوتر):**
   $$s_c \\equiv (y_1 - y_2) \\cdot (x_1 - x_2)^{-1} \\pmod p$$
2. **مضاعفة النقطة مع نفسها ($P = Q$ — طريقة المماس):**
   $$s_t \\equiv (3x_1^2 + a) \\cdot (2y_1)^{-1} \\pmod p$$
3. **إحداثيات النقطة الناتجة $R = (x_3, y_3) = P + Q$:**
   $$x_3 \\equiv s^2 - x_1 - x_2 \\pmod p, \\qquad y_3 \\equiv s(x_1 - x_3) - y_1 \\pmod p$$

---page---

## 2.4 الضرب القياسي ومسألة ECDLP والمنحنيات المعيارية
**الضرب القياسي (Scalar Multiplication)** هو حساب النقطة $Q = \\alpha P = P + P + \\dots + P$ ($\\alpha$ مرة). يُنفذ بسرعة فائقة عبر خوارزمية **المضاعفة والجمع (Double-and-Add)** التي تحتاج على الأكثر إلى $2\\log_2(\\alpha)$ عملية نقطية. أما استنتاج السلم السري $\\alpha$ من $P$ و $Q$ فيُعرف بـ **مسألة اللوغاريتم المتقطع على المنحنى الإهليلجي (ECDLP)**، وأفضل هجوم عام عليها يتطلب نحو $\\sqrt{q}$ خطوة ($2^{128}$ عملية لمنحنى بحجم $2^{256}$).

| المنحنى القياسي | حجم الحقل | المعامل المساعد (Cofactor) | الخصائص والاستخدام البارز |
| :--- | :--- | :--- | :--- |
| **secp256r1 (NIST P-256)** | 256 بت | $h = 1$ | المنحنى الإلزامي في بروتوكول TLS 1.3 والشهادات الحكومية |
| **secp256k1** | 256 بت | $h = 1$ | منحنى كوبليتز ($a=0, b=7$) مستخدم في شبكات البلوك تشين والبيتكوين |
| **Curve25519** | 255 بت ($2^{255}-19$) | $h = 8$ | منحنى مونتغمري فائق السرعة ومصمم ليكون آمناً بطبيعته ضد هجمات الالتواء |

> [!warning]
> **هجوم الالتواء (Twist Attack):** إذا أرسل المهاجم إحداثياً سينياً $x$ لا يحقق معادلة المنحنى الأصلي بل يقع على «منحنى التواء» ذي رتب صغيرة ولم يتحقق الخادم من وقوع النقطة على المنحنى قبل ضربها في مفتاحه الخاص، فإن النتيجة المسربة تكشف المفتاح الخاص للخادم!`,
    images: [
      {
        prompt: 'Elliptic curve geometry y²=x³+ax+b, points P Q R, mathematical illustration, 16:9',
        caption: 'هندسة المنحنيات الإهليلجية وعمليتا جمع نقطتين بالوتر ومضاعفة النقطة بالمماس',
        alt: 'Elliptic curve geometry y²=x³+ax+b, points P Q R',
        seed: 21,
        isAIGenerated: true,
      },
      {
        prompt: 'Discrete logarithm problem visualization on elliptic curve, cryptographic trapdoor function, 16:9',
        caption: 'الضرب القياسي السريع مقابل صعوبة مسألة اللوغاريتم المتقطع (ECDLP)',
        alt: 'Discrete logarithm problem visualization on elliptic curve',
        seed: 22,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'تفوق المنحنيات الإهليلجية (ECC) على RSA التقليدي',
        subtitle: 'لماذا يكفي مفتاح 256 بت في ECC لمكافأة 2048 بت في RSA؟',
        bullets: [
          'تخضع أمان RSA لمسألة تحليل الأعداد الصحيحة التي تهاجَم بخوارزمية منخل حقل الأعداد العام (GNFS).',
          'بنية زمرة نقاط المنحنى الإهليلجي لا تسمح بتطبيق خوارزمية GNFS عليها.',
          'أفضل خوارزمية عامة لكسر ECC (مثل Pollard’s Rho) تتطلب الجذر التربيعي لرتبة الزمرة √q.',
          'مفتاح ECC بطول 256 بت (32 بايت فقط) يوفر أماناً يعادل 128 بت ويكافئ RSA-2048.',
        ],
        keyHighlight: 'صغر حجم المفاتيح في ECC يقلل زمن المصافحة واستهلاك الطاقة والنطاق الترددي في الهواتف والخوادم.',
        diagramTitle: 'مقارنة أحجام المفاتيح ومستويات الأمان بين ECC و RSA',
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'معادلة فايرشتراس وشرط عدم الانحلال',
        subtitle: 'الهندسة الجبرية للمنحنى فوق الحقول المحدودة F_p',
        bullets: [
          'الصيغة القياسية لفايرشتراس: y^2 ≡ x^3 + ax + b (mod p) فوق حقل أولي F_p.',
          'شرط عدم الانحلال الإلزامي: 4a^3 + 27b^2 ≠ 0 (mod p) لمنع الجذور المكررة.',
          'نقطة اللانهاية O هي العنصر المحايد للجمع، ومعكوس النقطة (x, y) هو (x, -y mod p).',
          'صيغة إدواردز x^2 + y^2 = 1 + dx^2y^2 توفر قانون جمع موحداً يقاوم هجمات التوقيت.',
        ],
        keyHighlight: 'انحلال المنحنى (4a^3 + 27b^2 = 0) يحول مسألة اللوغاريتم المتقطع الصعبة إلى مسألة سهلة الكسر.',
        diagramTitle: 'تمثيل النقاط والانعكاس حول المحور الأفقي فوق F_p',
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'قوانين جمع النقاط ومضاعفتها حسابياً',
        subtitle: 'معادلات ميل الوتر وميل المماس بالحساب المعياري',
        bullets: [
          'جمع نقطتين مختلفتين P ≠ Q يعتمد على ميل الوتر: s_c = (y_1 - y_2)(x_1 - x_2)^(-1) mod p.',
          'مضاعفة النقطة P = Q تعتمد على ميل المماس: s_t = (3x_1^2 + a)(2y_1)^(-1) mod p.',
          'الإحداثي السيني للناتج: x_3 = s^2 - x_1 - x_2 (mod p).',
          'الإحداثي الصادي للناتج: y_3 = s(x_1 - x_3) - y_1 (mod p).',
        ],
        keyHighlight: 'القسمة في معادلة الميل تُنفذ دائماً عبر إيجاد المعكوس الضربي للمقام بترديد العدد الأولي p.',
        diagramTitle: 'الخطوات الجبرية لحساب R = P + Q و R = 2P',
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'الضرب القياسي وخوارزمية المضاعفة والجمع (Double-and-Add)',
        subtitle: 'تسريع حساب Q = αP من O(α) إلى O(log α)',
        bullets: [
          'الجمع المتتالي للنقطة P عدد α مرة مستحيل عملياً عندما يكون α بحجم 2^256.',
          'تحول خوارزمية المضاعفة والجمع العدد α إلى تمثيله الثنائي وتنفذ مضاعفة في كل بت وجمعاً عند البت 1.',
          'مثال: لحساب 5P (حيث 5 = 101_2)، نضاعف P لنحصل على 2P ثم 4P ثم نجمع 4P + P في 3 خطوات فقط.',
          'الاتجاه المعاكس (إيجاد α من P و Q = αP) هو مسألة اللوغاريتم المتقطع الصعبة (ECDLP).',
        ],
        keyHighlight: 'بفضل Double-and-Add يُحسب الضرب القياسي لمفتاح 256-بت في أقل من 512 عملية نقطية.',
        diagramTitle: 'شجرة حساب 5P بخوارزمية المضاعفة والجمع على F_11',
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'المنحنيات المعيارية وأمن الالتواء (Twist Security)',
        subtitle: 'secp256r1، secp256k1، Curve25519 والتحقق من النقاط',
        bullets: [
          'secp256r1 (P-256): المنحنى الإلزامي في TLS 1.3 بمعامل مساعد Cofactor = 1.',
          'secp256k1: منحنى كوبليتز سريع الحسابات مستخدم في شبكات البلوك تشين.',
          'Curve25519: مصمم فوق الحقل الأولي 2^255 - 19 ليكون آمناً بطبيعته ضد هجمات الالتواء.',
          'يجب فحص انتماء النقطة الواردة إلى المنحنى قبل إجراء أي ضرب قياسي بالمفتاح الخاص.',
        ],
        keyHighlight: 'إهمال التحقق من وقوع النقطة المستلمة على المنحنى يمكّن المهاجم من تنفيذ هجوم الالتواء وكشف المفتاح الخاص.',
        diagramTitle: 'مقارنة المنحنيات القياسية وآلية صد هجوم الالتواء',
      },
    ],
    flashcards: [
      {
        front: 'ما هو العنصر المحايد في زمرة نقاط المنحنى الإهليلجي وما هو معكوس النقطة P = (x, y)؟',
        back: 'العنصر المحايد هو نقطة اللانهاية O حيث P + O = P، ومعكوس النقطة P = (x, y) هو -P = (x, -y mod p) حيث P + (-P) = O.',
        category: 'رياضيات',
      },
      {
        front: 'ما الشرط الرياضي اللازم لعدم انحلال المنحنى الإهليلجي في صيغة فايرشتراس؟',
        back: 'يجب أن يتحقق الشرط 4a^3 + 27b^2 ≠ 0 (mod p) لضمان عدم وجود جذور مكررة أو نقاط تفرد على المنحنى.',
        category: 'رياضيات',
      },
      {
        front: 'كم يبلغ حجم مفتاح ECC المكافئ أمنياً لمفتاح RSA-2048 ومعيار AES-128؟',
        back: 'يبلغ 256 بت فقط (32 بايت) مقارنة بـ 2048 بت (256 بايت) في نظام RSA، أي أصغر بـ 8 أضعاف.',
        category: 'مقارنة',
      },
      {
        front: 'كيف تسرّع خوارزمية المضاعفة والجمع (Double-and-Add) عملية الضرب القياسي αP؟',
        back: 'تعتمد على التمثيل الثنائي للعدد α فتجري مضاعفة للنقطة في كل خانة ثنائية وجمعاً فقط عندما تكون الخانة 1، مقلصة العمليات إلى 2 log_2(α) كحد أقصى.',
        category: 'خوارزميات',
      },
      {
        front: 'ما هو هجوم الالتواء (Twist Attack) على أنظمة المنحنيات الإهليلجية؟',
        back: 'هجوم يرسل فيه الخصم إحداثياً سينياً x لا يقع على المنحنى الأصلي بل على منحنى التواء ضعيف، فإذا ضربه الخادم بمفتاحه الخاص دون تحقق تسرب المفتاح السري.',
        category: 'أمن',
      },
      {
        front: 'ما الميزة الأمنية الأبرز لمنحنى Curve25519 وصيغة إدواردز مقارنة بصيغة فايرشتراس؟',
        back: 'أمان طبيعي ضد هجمات الالتواء وقانون جمع موحد وبسيط يسهّل كتابة كود ثابت الزمن (Constant-time) مقاوم لهجمات التوقيت.',
        category: 'معايير',
      },
    ],
    miniQuiz: [
      {
        question: 'على المنحنى الإهليلجي المعرف فوق الحقل المحدود F_11، ما هو معكوس النقطة P = (2, 3)؟',
        options: ['(2, 8)', '(9, 3)', '(3, 2)', '(2, -8)'],
        correctIndex: 0,
        explanation:
          'معكوس النقطة (x, y) هو (x, -y mod p)، وبما أن -3 ≡ 8 (mod 11)، فإن معكوس النقطة (2, 3) هو (2, 8).',
      },
      {
        question: 'أي من المنحنيات الإهليلجية التالية يُعد إلزامي الدعم لتبادل المفاتيح في مواصفة بروتوكول TLS 1.3؟',
        options: ['secp256k1', 'secp256r1 (NIST P-256)', 'secp192r1', 'RSA-2048'],
        correctIndex: 1,
        explanation:
          'المنحنى secp256r1 (المعروف أيضاً بـ P-256 أو prime256v1) هو المنحنى الإلزامي في مواصفة TLS 1.3.',
      },
      {
        question: 'كم عملية نقطية (مضاعفة وجمع) تحتاجها خوارزمية المضاعفة والجمع لحساب 5P على المنحنى الإهليلجي؟',
        options: ['5 عمليات جمع متتالية', '3 عمليات (مضاعفتان وعملية جمع واحدة)', 'عملية واحدة فقط', '10 عمليات'],
        correctIndex: 1,
        explanation:
          'بما أن 5 = 101 بالثنائي (4 + 1)، نضاعف P لنحصل على 2P، ثم نضاعف 2P لنحصل على 4P، ثم نجمع 4P + P، والمجموع 3 عمليات فقط.',
      },
      {
        question: 'لماذا لا تتأثر المنحنيات الإهليلجية بخوارزمية منخل حقل الأعداد العام (GNFS) التي تضعف RSA؟',
        options: [
          'لأن ECC يستخدم مفاتيح أطول من RSA',
          'لأن بنية زمرة نقاط المنحنى لا تسمح بتحليل العناصر إلى عوامل أولية صغيرة كما في الأعداد الصحيحة',
          'لأن ECC نظام تشفير متماثل',
          'لأن ECC لا يستخدم الحساب المعياري',
        ],
        correctIndex: 1,
        explanation:
          'تفتقر زمرة نقاط المنحنى الإهليلجي إلى البنية الجبرية التي تستغلها خوارزمية GNFS، لذا يظل أفضل هجوم كلاسيكي عليها بتعقيد الجذر التربيعي √q.',
      },
    ],
    richData: {
      id: 2,
      chapter_number: 2,
      title: 'تشفير المنحنيات الإهليلجية (ECC): الرياضيات والآليات',
      subtitle: 'Elliptic Curve Cryptography over Finite Fields',
      category: 'رياضي',
      pdfStartPage: 15,
      pdfEndPage: 24,
      description:
        'دراسة معادلة المنحنى الإهليلجي (فايرشتراس، مونتغمري، إدواردز)، جمع ومضاعفة النقاط فوق الحقول المحدودة F_p، الضرب القياسي السريع، وأمن الالتواء.',
      objectives: [
        'التحقق من شرط عدم انحلال المنحنى الإهليلجي 4a³ + 27b² ≠ 0.',
        'تنفيذ عمليتي جمع النقاط (الوتر) ومضاعفة النقطة (المماس) فوق حقل محدود F_p.',
        'تطبيق خوارزمية المضاعفة والجمع (Double-and-Add) لتسريع الضرب القياسي αP.',
        'مقارنة أحجام مفاتيح ECC بنظام RSA وتحليل المنحنيات المعيارية (secp256r1, secp256k1, Curve25519).',
      ],
      sections: [
        {
          heading: '2.2 أساسيات المنحنيات الإهليلجية ومعادلة فايرشتراس',
          content:
            'الصيغة القياسية للمنحنى الإهليلجي (فايرشتراس) هي y² = x³ + ax + b بشرط 4a³ + 27b² ≠ 0 حتى لا تكون للمعادلة جذور مزدوجة تسبب انحلالاً رياضياً. وتوجد صيغ أخرى مثل صيغة مونتغمري وصيغة إدواردز (x² + y² = 1 + dx²y²) التي تتميز بقانون جمع بسيط وموحد يسهّل مقاومة هجمات التوقيت.',
          formula: 'y² ≡ x³ + ax + b (mod p),   4a³ + 27b² ≠ 0',
        },
        {
          heading: '2.3 المنحنيات فوق الحقول المحدودة وجمع النقاط',
          content:
            'فوق الحقل المحدود F_p، تشكل نقاط المنحنى مع نقطة اللانهاية O (العنصر المحايد) مجموعة دورية. لجمع نقطتين مختلفتين يُحسب ميل الوتر s_c = (y₁ - y₂)/(x₁ - x₂) mod p، ولمضاعفة النقطة P مع نفسها يُحسب ميل المماس s_t = (3x₁² + a)/(2y₁) mod p.',
          formula: 'x₃ ≡ s² - x₁ - x₂ (mod p),   y₃ ≡ s(x₁ - x₃) - y₁ (mod p)',
        },
        {
          heading: '2.4 الضرب القياسي ومسألة اللوغاريتم المتقطع (ECDLP)',
          content:
            'الضرب القياسي αP هو جمع النقطة P مع نفسها α مرة، ويُحسب بخوارزمية المضاعفة والجمع في 2 log₂(α) عملية كحد أقصى. أما استنتاج المفتاح الخاص α من النقطة العامة Q = αP فيتطلب نحو √q محاولة (أي 2¹²⁸ عملية لمجموعة بحجم 2²⁵⁶).',
        },
        {
          heading: '2.5 المنحنيات المعيارية وأمن الالتواء (Twist Security)',
          content:
            'إذا أرسل مهاجم إحداثياً سينياً لا يقع على المنحنى الأصلي بل على منحنى التواء ضعيف ولم يتحقق الخادم من المعادلة، كشف رده المفتاح الخاص. صُمم منحنى Curve25519 ليكون آمناً تجاه الالتواء بطبيعته.',
        },
      ],
      tables: [
        {
          title: 'جدول 2.2 و 2.3: مقارنة ECC مع RSA والمنحنيات المعيارية',
          headers: ['المنحنى / النظام', 'حجم المعامل لأمان AES-128', 'المعامل المساعد (Cofactor)', 'الاستعمال البارز'],
          rows: [
            ['RSA التقليدي', '2048 بت (256 بايت)', '-', 'أنظمة التشفير الموروثة (عرضة لـ GNFS)'],
            ['secp256r1 (P-256)', '256 بت (32 بايت)', '1', 'إلزامي في بروتوكول TLS 1.3'],
            ['secp256k1', '256 بت (32 بايت)', '1', 'أنظمة البلوك تشين والبيتكوين (منحنى كوبليتز)'],
            ['Curve25519', '255 بت (32 بايت)', '8', 'تصميم آمن تجاه الالتواء وسريع العمليات (WireGuard)'],
          ],
        },
      ],
      commonMistake: {
        mistake:
          'تجاوز فحص انتماء النقطة للمنحنى عند استلام الإحداثي السيني x وحده لتسريع المعالجة، أو الاعتماد على دوال العشوائية العادية في لغات البرمجة لتوليد المفتاح الخاص.',
        fix: 'فحص المعادلة إلزامياً قبل أي ضرب قياسي لمنع هجمات الالتواء، واستخدام مولدات عشوائية تشفيرية آمنة (CSPRNG).',
      },
      solvedExample: {
        title: 'حساب الضرب القياسي 5P بخوارزمية المضاعفة والجمع على F_11',
        given: 'المنحنى y² ≡ x³ + 1 (mod 11)، النقطة P = (2, 3)، المطلوب حساب 5P.',
        steps: [
          '1. التمثيل الثنائي للعدد 5 هو 101₂، أي 5P = 4P + P.',
          '2. مضاعفة P = (2, 3) للحصول على 2P: الميل s_t = 12/6 = 2، ومنه x₃ = 2² - 4 = 0، y₃ = 2(2 - 0) - 3 = 1 ⟹ 2P = (0, 1).',
          '3. مضاعفة 2P = (0, 1) للحصول على 4P: الميل s_t = 0/2 = 0، ومنه x₃ = 0، y₃ = -1 ≡ 10 ⟹ 4P = (0, 10).',
          '4. جمع 4P = (0, 10) مع P = (2, 3): الميل s_c = (3 - 10)/(2 - 0) = -7/2 ≡ 4/2 = 2، ومنه x₃ = 2² - 2 = 2، y₃ = 2(0 - 2) - 10 = -14 ≡ 8.',
        ],
        result: '5P = (2, 8) في 3 خطوات فقط بدلاً من الجمع المتتالي.',
        whyItMatters:
          'يثبت كيف تقلص خوارزمية المضاعفة والجمع عدد العمليات من α إلى 2 log₂(α)، مما يجعل مفتاح 256-بت يُحسب في أجزاء من الثانية.',
      },
      flashcards: [
        {
          front: 'ما هو العنصر المحايد في جمع نقاط المنحنى الإهليلجي؟',
          back: 'نقطة اللانهاية O، حيث P + O = P، ومجموع أي نقطة P = (x, y) مع معكوسها -P = (x, -y) يساوي O.',
        },
        {
          front: 'كم يبلغ حجم مفتاح ECC المكافئ لأمان RSA-2048 و AES-128؟',
          back: '256 بت فقط (32 بايت) مقارنة بـ 2048 بت (256 بايت) في RSA.',
        },
        {
          front: 'لماذا لا تتأثر المنحنيات الإهليلجية بخوارزمية GNFS؟',
          back: 'لأن بنية مجموعة نقاط المنحنى لا تسمح بتطبيق منخل حقل الأعداد العام، وأفضل هجوم عام عليها يتطلب O(√q) عملية.',
        },
      ],
      selfAssessment: [
        {
          question: 'ما الشرط الرياضي الواجب توفره في معاملات صيغة فايرشتراس، ولماذا؟',
          answer: 'يجب أن يتحقق 4a³ + 27b² ≠ 0 لضمان ألا يكون للمعادلة جذور مزدوجة تسبب انحلالاً رياضياً.',
        },
        {
          question: 'اذكر ميزة رئيسية لاستخدام صيغة إدواردز مقارنة بصيغة فايرشتراس القياسية.',
          answer: 'تتميز صيغة إدواردز بقانون جمع بسيط وموحد يسهّل مقاومة هجمات التوقيت ويسرّع التنفيذ.',
        },
        {
          question: 'علّل أهمية إجراء التحقق من النقطة قبل استخدامها في العمليات التشفيرية.',
          answer: 'لمنع المهاجم من إرسال نقطة على منحنى التواء ضعيف لاستنتاج المفتاح الخاص للخادم.',
        },
      ],
      quiz: [
        {
          question: 'على المنحنى فوق F_11، ما هو معكوس النقطة P = (2, 3)؟',
          options: ['(2, -3) ≡ (2, 8)', '(-2, 3) ≡ (9, 3)', '(3, 2)', '(0, 0)'],
          correctIndex: 0,
          explanation: 'معكوس النقطة (x, y) هو (x, -y)، وفي F_11 يكون -3 ≡ 8 (mod 11)، أي (2, 8).',
        },
        {
          question: 'أي من المنحنيات التالية إلزامي لتبادل المفاتيح في بروتوكول TLS 1.3؟',
          options: ['secp256k1', 'secp256r1 (P-256)', 'secp192r1', 'RSA-2048'],
          correctIndex: 1,
          explanation: 'المنحنى secp256r1 هو المنحنى الإلزامي الوحيد في مواصفة TLS 1.3.',
        },
      ],
    },
    interactiveBook3D: {
      model3DType: 'weierstrass-torus-curve',
      shaderEffect: 'cyan-curve-hologram',
      sceneTitle: 'مجسم المنحنى الإهليلجي فوق الحقل المحدود F_p والضرب القياسي',
      sceneDescription:
        'تمثيل ثلاثي الأبعاد لمنحنى فايرشتراس وطارة الحقل المحدود F_p، يعرض تقاطع الوتر والمماس وانعكاس النقاط ومسار القفز اللوغاريتمي في الضرب القياسي αP.',
      cameraPosition: { x: 0, y: 3.0, z: 7.0 },
      pages3D: [
        {
          pageNumber: 1,
          title: 'هندسة جمع النقاط (الوتر) ومضاعفة النقطة (المماس)',
          subtitle: 'القانون الهندسي للزمرة الأبيلية على المنحنى',
          narrative:
            'عند رسم مستقيم يمر بنقطتين P و Q فإنه يقطع المنحنى في نقطة ثالثة، وبعكسها حول محور السينات نحصل على R = P + Q. وعندما تنطبق P على Q نأخذ مماس المنحنى لحساب 2P.',
          equation: 'y^2 \\equiv x^3 + ax + b \\pmod p, \\quad 4a^3 + 27b^2 \\not\\equiv 0',
          liveGraphicType: 'elliptic-curve-fp',
          liveGraphicCaption: 'محاكاة حية لجمع النقاط P + Q ومضاعفة 2P مع الانعكاس المعياري',
          visualNotes: [
            'نقطة اللانهاية O تقع في ما لا نهاية للأعلى والأسفل وتعمل كعنصر محايد.',
            'جميع العمليات تُختزل بترديد العدد الأولي p.',
          ],
        },
        {
          pageNumber: 2,
          title: 'الضرب القياسي السريع ومسألة اللوغاريتم المتقطع ECDLP',
          subtitle: 'بوابة الاتجاه الواحد الرياضية',
          narrative:
            'الانتقال من النقطة المولدة G والمفتاح السري α إلى النقطة العامة Q = αG يتم في أجزاء من المللي ثانية بخوارزمية المضاعفة والجمع، بينما العودة من Q إلى α تتطلب 2^128 عملية.',
          equation: 'Q = \\alpha G = \\sum_{i=0}^{k} b_i (2^i G)',
          liveGraphicType: 'elliptic-curve-fp',
          liveGraphicCaption: 'قفزات المضاعفة والجمع على شبكة نقاط F_p لحساب 5P = 4P + P',
          visualNotes: [
            'حجم مفتاح 256-بت في ECC يعادل أمان 2048-بت في RSA.',
            'صيغة إدواردز توحد معادلة الجمع والمضاعفة في معادلة واحدة.',
          ],
        },
        {
          pageNumber: 3,
          title: 'المنحنيات المعيارية وحماية الخادم من هجمات الالتواء',
          subtitle: 'secp256r1 و Curve25519 وفحص صحة النقاط',
          narrative:
            'يجب على الخادم التحقق من أن النقطة المستلمة تحقق معادلة المنحنى الأصلي قبل ضربها في مفتاحه الخاص، أو استخدام منحنى آمن تجاه الالتواء مثل Curve25519.',
          equation: 'y_{\\text{recv}}^2 \\stackrel{?}{\\equiv} x_{\\text{recv}}^3 + ax_{\\text{recv}} + b \\pmod p',
          liveGraphicType: 'elliptic-curve-fp',
          liveGraphicCaption: 'كشف النقطة الخبيثة الواقعة خارج المنحنى الأصلي (Twist Curve)',
          visualNotes: [
            'Curve25519 يعمل فوق الحقل الأولي 2^255 - 19 بسرعة فائقة.',
            'secp256r1 هو المعيار الإلزامي في TLS 1.3.',
          ],
        },
      ],
      stepByStep: [
        {
          step: 1,
          title: 'فحص معاملات المنحنى وشرط عدم الانحلال',
          description:
            'التأكد من أن معاملات المنحنى a و b فوق الحقل F_p تحقق شرط عدم الانحلال لضمان خلو المنحنى من نقاط التفرد.',
          formula: '\\Delta = -16(4a^3 + 27b^2) \\not\\equiv 0 \\pmod p',
          visualState: 'تشكّل سطح المنحنى الأملس باللون السماوي المتوهج دون أي انكسار.',
          securityNote: 'المنحنيات المنحلة يمكن اختزال اللوغاريتم المتقطع فيها إلى الحقل الأساسي السهل الكسر.',
        },
        {
          step: 2,
          title: 'حساب ميل المماس لمضاعفة النقطة P إلى 2P',
          description:
            'في المثال المحلول لحساب 5P حيث P=(2,3) على y^2 = x^3 + 1 (mod 11)، نحسب ميل المماس عند P.',
          formula: 's_t = \\frac{3(2)^2 + 0}{2(3)} = \\frac{12}{6} = 2 \\pmod{11} \\implies 2P = (0, 1)',
          visualState: 'انطلاق شعاع المماس الذهبي من النقطة P=(2,3) وتوليد النقطة 2P=(0,1).',
          securityNote: 'تتطلب خطوة الميل حساب المعكوس الضربي للمقام 2y_1 بترديد p.',
        },
        {
          step: 3,
          title: 'مضاعفة 2P للحصول على 4P',
          description:
            'نكرر عملية المماس على النقطة 2P=(0,1) للحصول على النقطة 4P=(0,10).',
          formula: 's_t = \\frac{3(0)^2 + 0}{2(1)} = 0 \\pmod{11} \\implies 4P = (0, 10)',
          visualState: 'قفزة الشعاع الثانية على المنحنى لتحديد موضع 4P=(0,10).',
          securityNote: 'المضاعفة المتتالية ترفع الأس أسياً (P -> 2P -> 4P -> 8P...).',
        },
        {
          step: 4,
          title: 'جمع 4P مع P بطريقة الوتر للحصول على 5P',
          description:
            'نحسب ميل الوتر الواصل بين 4P=(0,10) و P=(2,3) ثم نعكس نقطة التقاطع لنحصل على 5P=(2,8).',
          formula: 's_c = \\frac{3 - 10}{2 - 0} \\equiv \\frac{4}{2} = 2 \\pmod{11} \\implies 5P = (2, 8)',
          visualState: 'رسم وتر أخضر زمردي يصل بين 4P و P وانعكاس نقطة التقاطع إلى 5P=(2,8).',
          securityNote: 'اكتمل حساب 5P في 3 عمليات فقط بدلاً من 4 عمليات جمع متتالية.',
        },
      ],
      hotspots: [
        {
          id: 'ecc-point-p',
          label: 'النقطة المولدة P / G',
          coordinates: { x: -1.8, y: 1.2, z: 0.8 },
          color: '#ef4444',
          title: 'النقطة المولدة للزمرة الدورية (Generator Point)',
          detailedExplanation:
            'نقطة أساسية متفق عليها علناً في معلمات المنحنى، تولد بضربها القياسي زمرة جزئية دورية رتبتها عدد أولي كبير q.',
          relatedEquation: '\\langle G \\rangle = \\{G, 2G, 3G, \\dots, qG = \\mathcal{O}\\}',
          securityImpact: 'كبر الرتبة الأولية q يمنع هجمات Pohlig-Hellman.',
        },
        {
          id: 'ecc-chord-line',
          label: 'وتر الجمع (P + Q)',
          coordinates: { x: 0.2, y: 0.8, z: 1.2 },
          color: '#f59e0b',
          title: 'قاعدة الوتر والمماس في جمع النقاط',
          detailedExplanation:
            'يمثل المستقيم الجبري القاطع للمنحنى في ثلاث نقاط مجموعها يساوي نقطة اللانهاية O، مما يعطي P + Q = -R.',
          relatedEquation: 'x_3 \\equiv s^2 - x_1 - x_2 \\pmod p',
          securityImpact: 'عملية الجبر النقطي تخلط الإحداثيات بشكل غير خطي يخفي قيمة السلم α.',
        },
        {
          id: 'ecc-infinity-point',
          label: 'نقطة اللانهاية O',
          coordinates: { x: 0.0, y: 2.5, z: 0.0 },
          color: '#a855f7',
          title: 'العنصر المحايد للزمرة (Point at Infinity)',
          detailedExplanation:
            'نقطة افتراضية تكمل زمرة المنحنى الإهليلجي وتنتج عند جمع أي نقطة P=(x,y) مع معكوسها -P=(x,-y).',
          relatedEquation: 'P + (-P) = \\mathcal{O}, \\quad P + \\mathcal{O} = P',
          securityImpact: 'يجب رفض نقطة اللانهاية كقيمة مفتاح عام أو توقيع لمنع التزوير التافه.',
        },
        {
          id: 'ecc-twist-guard',
          label: 'حارس أمن الالتواء (Point Validation)',
          coordinates: { x: 1.9, y: -1.1, z: 0.9 },
          color: '#10b981',
          title: 'فحص انتماء النقطة للمنحنى قبل الضرب القياسي',
          detailedExplanation:
            'بوابة تحقق تتأكد من أن الإحداثيين (x, y) المستلمين من الشبكة يحققان معادلة المنحنى الأصلي وليسا على منحنى التواء ضعيف.',
          relatedEquation: 'y^2 - (x^3 + ax + b) \\equiv 0 \\pmod p',
          securityImpact: 'يمنع استخراج المفتاح الخاص للخادم عبر هجمات المنحنيات غير الصالحة (Invalid Curve / Twist Attacks).',
        },
      ],
    },
    updated_at: 1730937600000,
  },

  // =========================================================================
  // الفصل الثالث: بروتوكول تبادل المفاتيح ECDH والتوقيع الرقمي ECDSA
  // =========================================================================
  {
    id: 3,
    chapter_number: 3,
    title: 'بروتوكول تبادل المفاتيح ECDH والتوقيع الرقمي ECDSA',
    subtitle: 'ECDH Key Exchange, HKDF, ECDSA Digital Signatures & Nonce Reuse Vulnerability',
    description:
      'آلية بناء السر المشترك عبر ECDH واشتقاق مفتاح الجلسة بدالة HKDF، خوارزمية التوقيع الرقمي ECDSA والتحقق منها، وكارثة إعادة استخدام القيمة التشغيلية (Nonce Reuse) وحلها عبر RFC 6979.',
    category: 'متقدم',
    difficulty: 'intermediate',
    pdfStartPage: 25,
    pdfEndPage: 37,
    diagramKey: 'ise243-3',
    diagramDescription:
      'مخطط بروتوكول تبادل المفاتيح ECDH بين أليس وبوب لتوليد النقطة المشتركة w = αβG واشتقاق مفتاح الجلسة عبر HKDF، إلى جانب مخطط التوقيع الرقمي ECDSA.',
    videoUrl: 'https://www.youtube.com/watch?v=NmM9HA2MQGI',
    videoTitle: 'تبادل المفاتيح ECDH والتوقيع الرقمي ECDSA وكارثة تكرار القيمة العشوائية Nonce',
    videoDuration: '23:15',
    presentationUrl: `${TEXTBOOK_PDF_PATH}#page=25`,
    keyTopics: [
      'بروتوكول تبادل المفاتيح ECDH وتوليد النقطة المشتركة w = αβG',
      'دالة اشتقاق المفاتيح HKDF ومفهوم السرية الأمامية (Forward Secrecy)',
      'خوارزمية التوقيع الرقمي ECDSA: التوليد، التوقيع (r, s)، والتحقق الرياضي',
      'ثغرة إعادة استخدام القيمة التشغيلية (Nonce Reuse) واستخراج المفتاح الخاص جبرياً',
      'التوقيع الحتمي (Deterministic ECDSA — RFC 6979) وفصل مفاتيح الاستخدام',
      'هجوم الرجل في الوسط (MITM) على ECDH غير المصادق عليه وربط الهوية بالشهادات',
    ],
    content: `# الفصل الثالث: بروتوكول تبادل المفاتيح ECDH والتوقيع الرقمي ECDSA

## 3.1 تبادل مفاتيح ديفي-هيلمان على المنحنيات الإهليلجية (ECDH)
يُمكّن بروتوكول **ECDH** طرفين (أليس وبوب) من إنشاء سر مشترك عبر قناة اتصال علنية غير آمنة بالاعتماد على زمرة نقاط المنحنى الإهليلجي المولدة بالنقطة $G$ ذات الرتبة الأولية $q$:
1. تختار أليس سراً عشوائياً مؤقتاً $\\alpha \\xleftarrow{\\$} \\mathbb{Z}_q^*$ وتحسب قيمتها العامة المؤقتة $u = \\alpha G$ وترسلها لبوب.
2. يختار بوب سراً عشوائياً مؤقتاً $\\beta \\xleftarrow{\\$} \\mathbb{Z}_q^*$ ويحسب قيمته العامة المؤقتة $v = \\beta G$ ويرسلها لأليس.
3. تحسب أليس $w = \\alpha v = \\alpha(\\beta G)$، ويحسب بوب $w = \\beta u = \\beta(\\alpha G) = \\alpha\\beta G$.
4. يؤخذ الإحداثي السيني $x_w$ للنقطة المشتركة $w$ ويُمرر إلى **دالة اشتقاق المفاتيح (HKDF)** لإنتاج مفتاح جلسة متماثل موزع بانتظام، ثم يُتلف $\\alpha$ و $\\beta$ فوراً لتحقيق **السرية الأمامية (Forward Secrecy)**.

---page---

## 3.2 خوارزمية التوقيع الرقمي للمنحنيات الإهليلجية (ECDSA)
تتكون خوارزمية **ECDSA** من ثلاث مراحل رئيسية فوق المنحنى ذي المولد $G$ والرتبة $q$:
- **توليد المفاتيح:** المفتاح الخاص $\\alpha \\in \\mathbb{Z}_q^*$، والمفتاح العام $Q = \\alpha G$.
- **التوقيع على رسالة $m$:**
  1. اختيار قيمة تشغيلية عشوائية فريدة (Nonce) $k \\xleftarrow{\\$} \\mathbb{Z}_q^*$ وحساب النقطة $R = kG = (x_R, y_R)$.
  2. حساب $r = x_R \\bmod q$ (إذا كان $r = 0$ نعيد اختيار $k$).
  3. حساب $s \\equiv k^{-1}\\big(H(m) + r \\cdot \\alpha\\big) \\pmod q$ (إذا كان $s = 0$ نعيد اختيار $k$). التوقيع هو الزوج $(r, s)$.
- **التحقق من التوقيع $(r, s)$:**
  1. التأكد من أن $r, s \\in \\{1, \\dots, q-1\\}$ (رفض القيم الصفرية أو الخارجة عن النطاق فوراً).
  2. حساب $a \\equiv H(m) \\cdot s^{-1} \\pmod q$ و $b \\equiv r \\cdot s^{-1} \\pmod q$.
  3. حساب النقطة $\\hat{R} = aG + bQ = (x_{\\hat{R}}, y_{\\hat{R}})$، ورفض التوقيع إذا كانت $\\hat{R} = \\mathcal{O}$، وقبوله إذا وفقط إذا كان $x_{\\hat{R}} \\bmod q = r$.

---page---

## 3.3 الكارثة الأمنية: إعادة استخدام القيمة التشغيلية (Nonce Reuse)
إذا وقّع صاحب المفتاح السري $\\alpha$ رسالتين مختلفتين $m_1$ و $m_2$ باستخدام **نفس القيمة التشغيلية العشوائية $k$**، فإن النقطة $R = kG$ تكون واحدة، وبالتالي **تتطابق قيمة $r$ في التوقيعين** $(r, s_1)$ و $(r, s_2)$!
بطرح معادلتي $s_1$ و $s_2$ يختفي المفتاح السري $\\alpha$ فنستخرج $k$ مباشرة:
$$s_1 - s_2 \\equiv k^{-1}\\big(H(m_1) - H(m_2)\\big) \\pmod q \\implies k \\equiv \\big(H(m_1) - H(m_2)\\big) \\cdot (s_1 - s_2)^{-1} \\pmod q$$
وبمجرد معرفة $k$، يستخرج المهاجم المفتاح الخاص $\\alpha$ بعلاقة خطية بسيطة:
$$\\alpha \\equiv \\big(s_1 \\cdot k - H(m_1)\\big) \\cdot r^{-1} \\pmod q$$

> [!danger]
> **حوادث تاريخية شهيرة:** استُغلت ثغرة تكرار $k$ في اختراق مفتاح التوقيع الرئيس لمنصة **PlayStation 3** عام 2010، وفي سرقة آلاف العملات من محافظ **Bitcoin** التي عانت من ضعف مولد الأرقام العشوائية على الهواتف. الحل الهندسي الجذري هو **التوقيع الحتمي (Deterministic ECDSA — RFC 6979)** الذي يشتق $k$ بدالة شبه عشوائية آمنة $k = \\text{PRF}(\\alpha, H(m))$، مع **فصل مفاتيح الاستخدام (Key Separation)** بين التوقيع وتبادل المفاتيح.`,
    images: [
      {
        prompt: 'ECDH key exchange flow diagram, two parties, shared secret, cryptographic, 16:9',
        caption: 'مخطط بروتوكول تبادل المفاتيح ECDH واشتقاق مفتاح الجلسة عبر HKDF',
        alt: 'ECDH key exchange flow diagram',
        seed: 31,
        isAIGenerated: true,
      },
      {
        prompt: 'Public key cryptography protocol Alice and Bob key agreement, digital security, 16:9',
        caption: 'ربط تبادل المفاتيح بالتوقيع الرقمي ECDSA لمنع هجوم الرجل في الوسط MITM',
        alt: 'Public key cryptography protocol Alice and Bob key agreement',
        seed: 32,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'بروتوكول تبادل المفاتيح ECDH والسر المشترك',
        subtitle: 'بناء قناة مشفرة عبر شبكة غير موثوقة',
        bullets: [
          'تولد أليس زوجاً مؤقتاً (α, u = αG) ويولد بوب زوجاً مؤقتاً (β, v = βG).',
          'يتبادل الطرفان النقطتين العامتين u و v عبر الشبكة العلنية.',
          'يحسب كل طرف النقطة المشتركة w = αv = βu = αβG بشكل مستقل.',
          'المتنصت يرى G و u و v فقط، ويعجز عن حساب w بسبب صعوبة مسألة ECDLP.',
        ],
        keyHighlight: 'السر المشترك w لا يُرسل عبر الشبكة أبداً، بل يُحسب محلياً لدى كل طرف.',
        diagramTitle: 'تدفق رسائل ECDH بين أليس وبوب',
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'دالة اشتقاق المفاتيح HKDF والسرية الأمامية',
        subtitle: 'لماذا لا نستخدم الإحداثي السيني للنقطة المشتركة كمفتاح تشفير مباشرة؟',
        bullets: [
          'إحداثيات نقاط المنحنى الإهليلجي ليست موزعة بانتظام كسلسلة بتات عشوائية تماماً.',
          'تستخلص دالة HKDF الإنتروبيا من الإحداثي السيني x_w وتنتج مفاتيح جلسة منتظمة التوزيع.',
          'تتحقق السرية الأمامية (Forward Secrecy) بإتلاف الأسرار المؤقتة α و β فور انتهاء المصافحة.',
          'إذا سُرب المفتاح الدائم للخادم مستقبلاً، تظل جميع الجلسات المسجلة سابقاً محمية وغير قابلة للفك.',
        ],
        keyHighlight: 'حذف المفاتيح المؤقتة α و β من الذاكرة بعد اشتقاق مفتاح الجلسة هو جوهر السرية الأمامية.',
        diagramTitle: 'مراحل الاستخلاص والتوسيع في دالة HKDF',
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'خوارزمية التوقيع الرقمي ECDSA: التوقيع والتحقق',
        subtitle: 'ربط الرسالة بهوية الموقع رياضياً',
        bullets: [
          'للتوقيع على m: نختار قيمة تشغيلية عشوائية k ونحسب R = kG ومنها r = x_R mod q.',
          'نحسب الجزء الثاني من التوقيع: s = k^(-1) (H(m) + r·α) mod q.',
          'للتحقق من (r, s): نحسب a = H(m)/s و b = r/s ثم النقطة R̂ = aG + bQ.',
          'يُقبل التوقيع إذا تطابق الإحداثي السيني للنقطة R̂ بترديد q مع قيمة r.',
        ],
        keyHighlight: 'يجب التحقق الصريح من أن r ≠ 0 و s ≠ 0 وأن R̂ ≠ O لمنع قبول توقيعات مزورة.',
        diagramTitle: 'معادلات التوقيع والتحقق في ECDSA',
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'ثغرة إعادة استخدام القيمة التشغيلية (Nonce Reuse)',
        subtitle: 'كيف يكشف توقيعان بنفس k المفتاح الخاص فوراً؟',
        bullets: [
          'إذا تكررت k في توقيع رسالتين m_1 و m_2، تتساوى قيمة r في التوقيعين في سجل التدقيق.',
          'يحسب المهاجم k = (H(m_1) - H(m_2)) / (s_1 - s_2) mod q بدون معرفة المفتاح الخاص.',
          'يعوض المهاجم بقيمة k في معادلة التوقيع ليستخرج المفتاح السري α = (s_1·k - H(m_1)) / r mod q.',
          'الحل القياسي: التوقيع الحتمي (RFC 6979) الذي يشتق k من المفتاح الخاص وتجزئة الرسالة.',
        ],
        keyHighlight: 'تكرار القيمة العشوائية k مرة واحدة فقط كافٍ لتدمير منظومة التوقيع الرقمي بالكامل.',
        diagramTitle: 'الاستخراج الجبري للمفتاح الخاص من توقيعين بنفس r',
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'هجوم الرجل في الوسط (MITM) وفصل مفاتيح الاستخدام',
        subtitle: 'دمج ECDH مع ECDSA في البروتوكولات الآمنة',
        bullets: [
          'ECDH المجرد لا يصادق على هوية الطرفين، مما يجعله عرضة لهجوم الرجل في الوسط (MITM).',
          'يُحبط هجوم MITM بتوقيع القيم العامة المؤقتة (u و v) باستخدام مفتاح توقيع ECDSA موثق بشهادة.',
          'مبدأ فصل المفاتيح (Key Separation): يمنع استخدام نفس المفتاح للتوقيع ولتبادل المفاتيح معاً.',
          'مراقبة سجلات التدقيق العلنية لرصد أي تكرار في قيمة r وإبطال المفتاح فوراً عند الاشتباه.',
        ],
        keyHighlight: 'أمن القناة يتطلب ربط تبادل المفاتيح المؤقت (ECDH) بهوية موقعة رقمياً (ECDSA).',
        diagramTitle: 'إحباط هجوم الرجل في الوسط عبر توقيع القيم المؤقتة',
      },
    ],
    flashcards: [
      {
        front: 'ما العلامة الفورية التي تكشف إعادة استخدام القيمة التشغيلية k في سجل تدقيق توقيعات ECDSA؟',
        back: 'تطابق قيمة الإحداثي السيني r في توقيعين لرسالتين مختلفتين صادرتين عن نفس المفتاح العام.',
        category: 'أمن التواقيع',
      },
      {
        front: 'كيف يعالج معيار RFC 6979 (Deterministic ECDSA) خطر تكرار القيمة التشغيلية k؟',
        back: 'يشتق القيمة k بطريقة حتمية باستخدام دالة شبه عشوائية آمنة (HMAC_DRBG) من المفتاح الخاص α وتجزئة الرسالة H(m)، فلا تتكرر k لرسالتين مختلفتين أبداً.',
        category: 'معايير',
      },
      {
        front: 'لماذا نمرر النقطة المشتركة w في ECDH عبر دالة HKDF بدلاً من استخدامها مباشرة كمفتاح AES؟',
        back: 'لأن إحداثيات النقطة الإهليلجية لا تمتلك توزيعاً عشوائياً منتظماً بالكامل؛ وتقوم HKDF باستخلاص الإنتروبيا وتوليد مفاتيح جلسة منتظمة ومستقلة.',
        category: 'بروتوكولات',
      },
      {
        front: 'كيف تتحقق السرية الأمامية (Forward Secrecy) في تبادل المفاتيح ECDH؟',
        back: 'عبر توليد مفاتيح مؤقتة (Ephemeral Keys α, β) لكل جلسة جديدة وحذفها نهائياً من الذاكرة فور اشتقاق مفتاح الجلسة.',
        category: 'بروتوكولات',
      },
      {
        front: 'ما أهمية مبدأ فصل مفاتيح الاستخدام (Key Separation) بين ECDH و ECDSA؟',
        back: 'يضمن ألا يؤدي أي تفاعل رياضي أو تسرب في مفتاح التوقيع إلى كشف أسرار جلسات التشفير، ولكل مفتاح دورة حياة وضوابط مستقلة.',
        category: 'إدارة مفاتيح',
      },
      {
        front: 'لماذا يجب عدم تسجيل القيمة التشغيلية k في سجل التدقيق (Audit Log)؟',
        back: 'لأن k قيمة سرية للغاية؛ وأي مطلع يقرأ k من السجل يستطيع فوراً حساب المفتاح الخاص α من معادلة التوقيع.',
        category: 'أمن تشغيلي',
      },
    ],
    miniQuiz: [
      {
        question: 'إذا تكررت القيمة التشغيلية العشوائية k عند توقيع رسالتين مختلفتين في ECDSA، فما الذي يتطابق في التوقيعين (r, s_1) و (r, s_2)؟',
        options: ['القيمة s فقط', 'القيمة r لأنها تعتمد فقط على النقطة kG', 'قيمة التجزئة H(m)', 'حاصل ضرب r × s'],
        correctIndex: 1,
        explanation:
          'بما أن r هو الإحداثي السيني للنقطة R = kG بترديد q، فإن ثبات k ينتج نفس النقطة R ونفس قيمة r في التوقيعين.',
      },
      {
        question: 'في المثال الرياضي على زمرة رتبتها q = 19، إذا كان H(m_1) = 4, s_1 = 14 و H(m_2) = 11, s_2 = 12 بنفس r = 16، فكم تساوي قيمة k المستخرجة؟',
        options: ['k = 2', 'k = 6', 'k = 10', 'k = 16'],
        correctIndex: 1,
        explanation:
          'حساب البسط: 4 - 11 = -7 ≡ 12 (mod 19)، والمقام: 14 - 12 = 2، ومعكوس 2 بترديد 19 هو 10، إذن k = 12 × 10 = 120 ≡ 6 (mod 19).',
      },
      {
        question: 'ما التهديد الأمني الذي يتعرض له بروتوكول ECDH إذا استُخدم بمفرده دون توقيع رقمي أو شهادات؟',
        options: [
          'انحلال المنحنى الإهليلجي',
          'هجوم الرجل في الوسط النشط (Man-in-the-Middle - MITM)',
          'تمدد النص المشفر',
          'بقايا الذاكرة في البطاقات الذكية',
        ],
        correctIndex: 1,
        explanation:
          'ECDH غير المصادق عليه لا يثبت هوية الطرف الآخر، فيستطيع مهاجم نشط في الوسط اعتراض u و v واستبدالهما بمفاتيحه الخاصة.',
      },
      {
        question: 'أي من الشروط التالية يجب على المدقق فحصه أولاً قبل إجراء الحسابات النقطية في التحقق من توقيع ECDSA؟',
        options: [
          'أن تكون قيمة r و s ضمن النطاق الصحيح [1, q-1] وليستا صفراً',
          'أن تكون القيمة العشوائية k مرسلة مع التوقيع',
          'أن يكون طول الرسالة أقل من 16 بايت',
          'أن يكون المفتاح الخاص α مرفقاً في الشهادة',
        ],
        correctIndex: 0,
        explanation:
          'إذا كانت r = 0 أو s = 0 أو خارج النطاق [1, q-1]، يجب رفض التوقيع فوراً لأن القيم الصفرية تعطل المعكوس الضربي وتسمح بتزوير التحقق.',
      },
    ],
    richData: {
      id: 3,
      chapter_number: 3,
      title: 'خوارزمية التوقيع الرقمي للمنحنيات الإهليلجية (ECDSA) وتبادل المفاتيح (ECDH)',
      subtitle: 'Key Exchange, Digital Signatures & Nonce Reuse Vulnerability',
      category: 'متقدم',
      pdfStartPage: 25,
      pdfEndPage: 37,
      description:
        'آلية بناء السر المشترك عبر ECDH واشتقاق مفتاح الجلسة بدالة HKDF، خوارزمية التوقيع ECDSA والتحقق منها، وكارثة إعادة استخدام القيمة التشغيلية (Nonce Reuse).',
      objectives: [
        'تنفيذ تبادل مفاتيح ديفي-هيلمان على المنحنيات الإهليلجية (ECDH) واشتقاق مفتاح الجلسة بـ HKDF.',
        'تطبيق خطوات التوقيع والتحقق في خوارزمية ECDSA وفهم أسباب فشل التحقق.',
        'استنتاج المفتاح الخاص رياضياً عند تكرار القيمة التشغيلية k (حادثة PlayStation 3 ومحافظ Bitcoin).',
        'تطبيق فصل مفاتيح الاستخدام (Key Separation) وسجلات التدقيق لاكتشاف تكرار r.',
      ],
      sections: [
        {
          heading: '3.2 تبادل مفاتيح ديفي-هيلمان للمنحنيات الإهليلجية (ECDH)',
          content:
            'تختار أليس سراً مؤقتاً α وتحسب u = αG، ويختار بوب سراً مؤقتاً β ويحسب v = βG. عند تبادل القيمتين العامتين يحسب كل منهما النقطة المشتركة w = αβG. يُؤخذ الإحداثي السيني للنقطة w ويُدخل في دالة اشتقاق المفتاح (HKDF) لإنتاج مفتاح الجلسة، ثم يُتلف α و β لتحقيق السرية الأمامية.',
          formula: 'w = α(βG) = β(αG) = αβG  ⟶  SessionKey = HKDF(x_w)',
        },
        {
          heading: '3.3 خوارزمية التوقيع الرقمي (ECDSA)',
          content:
            'للتوقيع على رسالة m بمفتاح خاص α: تُختار قيمة تشغيلية عشوائية جديدة k من Z_q*، وتُحسب النقطة R = kG ويُؤخذ إحداثيها السيني r = x_R mod q. ثم تُحسب s = k⁻¹(H(m) + rα) mod q. التوقيع هو الزوج (r, s). وللتحقق يُحسب a = H(m)/s و b = r/s ثم النقطة R̂ = aG + bQ ويُقبل التوقيع إذا تطابق إحداثيها السيني مع r.',
          formula: 's ≡ k⁻¹(H(m) + r·α) (mod q)',
        },
        {
          heading: '3.4 التحديات الأمنية: إعادة استخدام القيمة التشغيلية (Nonce Reuse)',
          content:
            'إذا وُقعت رسالتان m₁ و m₂ بنفس القيمة التشغيلية k، تتطابق قيمة r في التوقيعين. بطرح معادلتي s₁ و s₂ يختفي المفتاح α ونستخرج k = (H(m₁) - H(m₂))/(s₁ - s₂) mod q، ومنها نستخرج المفتاح السري α فوراً! ويعالج التوقيع الحتمي (Deterministic ECDSA) هذه المشكلة.',
          formula: 'k ≡ (H(m₁) - H(m₂)) · (s₁ - s₂)⁻¹ (mod q),   α ≡ (s₁·k - H(m₁)) · r⁻¹ (mod q)',
        },
        {
          heading: '3.5 إدارة المفاتيح وهجوم الرجل في الوسط (MITM)',
          content:
            'تبادل ECDH وحده يحمي من المتنصت السلبي لكنه لا يصادق على الهوية، لذا يعترض المهاجم النشط القيمتين ويستبدل بهما مفتاحيه. يُمنع ذلك بتوقيع القيم المؤقتة بواسطة ECDSA وربط المفتاح العام بالهوية عبر شهادة رقمية.',
        },
      ],
      tables: [
        {
          title: 'جدول 3.1: مقارنة بين تبادل المفاتيح (ECDH) والتوقيع الرقمي (ECDSA)',
          headers: ['وجه المقارنة', 'تبادل المفاتيح (ECDH)', 'التوقيع الرقمي (ECDSA)'],
          rows: [
            ['الغرض', 'إنشاء سر مشترك بين طرفين عبر قناة غير آمنة', 'ربط رسالة بصاحب مفتاح سري يتحقق منها أي طرف'],
            ['المدخلات', 'المفتاح المؤقت للطرف والقيمة العامة للطرف الآخر', 'مفتاح التوقيع الخاص والرسالة m'],
            ['المخرج', 'السر المشترك w (لا يُرسل أبداً)', 'التوقيع (r, s) ويُرسل علناً مع الرسالة'],
            ['القيمة العشوائية', 'α و β جديدتان في كل جلسة (للسرية الأمامية)', 'k جديدة لكل توقيع (تكرارها يكشف المفتاح الخاص)'],
          ],
        },
      ],
      commonMistake: {
        mistake:
          'إهمال فحص نقطة اللانهاية والقيم الصفرية (r = 0 أو s = 0) عند التحقق من التوقيع، أو حفظ القيمة التشغيلية k في سجل التدقيق.',
        fix: 'إضافة شرطي الرفض الصريح إذا كان r = 0 أو s = 0 أو كانت نقطة التحقق هي O، وحفظ قيمتي r و s العلنيتين فقط في سجل التدقيق لرصد أي تكرار في r.',
      },
      solvedExample: {
        title: 'كشف المفتاح السري من سجل التدقيق عند تكرار r (على المنحنى التعليمي q = 19)',
        given:
          'توقيعان من نفس المفتاح KEY-SIGN-01 بنفس r = 16: التوقيع الأول H(m₁) = 4, s₁ = 14، والتوقيع الثاني H(m₂) = 11, s₂ = 12.',
        steps: [
          '1. رصد تكرار r = 16 في سجل التدقيق يدل على إعادة استخدام القيمة التشغيلية k.',
          '2. حساب بسط ومقام k بمقياس 19: H(m₁) - H(m₂) = 4 - 11 = -7 ≡ 12 (mod 19)، و s₁ - s₂ = 14 - 12 = 2.',
          '3. معكوس 2 بمقياس 19 هو 10 (لأن 2 × 10 = 20 ≡ 1)، إذن k = 12 × 10 = 120 ≡ 6 (mod 19).',
          '4. حساب المفتاح السري α = (s₁·k - H(m₁)) · r⁻¹: لدينا 14 × 6 - 4 = 80 ≡ 4 (mod 19).',
          '5. معكوس r = 16 بمقياس 19 هو 6 (لأن 16 × 6 = 96 ≡ 1)، إذن α = 4 × 6 = 24 ≡ 5 (mod 19).',
        ],
        result: 'انكشف المفتاح الخاص بالكامل: α = 5، ويجب إيقاف KEY-SIGN-01 فوراً وإبطال شهادته.',
        whyItMatters:
          'يبرهن عملياً كيف أن توقيعين عاديين في سجل علني يكشفان المفتاح الخاص إذا تكررت القيمة التشغيلية k.',
      },
      flashcards: [
        {
          front: 'ما العلامة التي تكشف إعادة استخدام القيمة التشغيلية k في سجل التدقيق؟',
          back: 'تطابق الإحداثي السيني r في توقيعين مختلفين صادرين عن نفس المفتاح.',
        },
        {
          front: 'ما الفرق بين التوقيع العشوائي والتوقيع الحتمي في ECDSA؟',
          back: 'التوقيع الحتمي يشتق k بدالة شبه عشوائية آمنة (PRF) من المفتاح والرسالة فلا تتكرر k لرسالتين مختلفتين أبداً.',
        },
        {
          front: 'لماذا نحتاج إلى فصل مفاتيح الاستخدام (Key Separation)؟',
          back: 'حتى لا يؤدي انكشاف مفتاح التوقيع إلى كشف أسرار جلسات ECDH السابقة أو العكس.',
        },
      ],
      selfAssessment: [
        {
          question: 'علّل خطورة إعادة استخدام القيمة العشوائية عند إنشاء توقيعات ECDSA.',
          answer:
            'لأن التوقيعين يشتركان في نفس قيمة r، فيمكن للمهاجم طرح معادلتي s لاستخراج k ثم حساب المفتاح السري α بطرح وقسمة بسيطة.',
        },
        {
          question: 'عرّف هجوم الرجل في الوسط في سياق تبادل المفاتيح.',
          answer:
            'هجوم نشط يعترض فيه المهاجم القيمتين العامتين المؤقتتين u و v ويستبدل بهما قيماً يعرف أسرارها، فيشترك في سر مع كل طرف دون علمهما.',
        },
      ],
      quiz: [
        {
          question: 'إذا تكررت القيمة التشغيلية k في توقيعين لرسالتين مختلفتين في ECDSA، فما الذي يتساوى في التوقيعين؟',
          options: ['القيمة s', 'القيمة r', 'قيمة التجزئة H(m)', 'المجموع r + s'],
          correctIndex: 1,
          explanation: 'لأن r يعتمد فقط على الإحداثي السيني للنقطة kG، فثبات k يؤدي حتماً إلى تطابق r.',
        },
        {
          question: 'أي دالة تُستخدم لتحويل النقطة المشتركة w في ECDH إلى مفتاح جلسة متماثل؟',
          options: ['دالة اشتقاق المفتاح (HKDF)', 'دالة RSA', 'دالة التعمية (Blinding)', 'بروتوكول OCSP'],
          correctIndex: 0,
          explanation: 'يؤخذ الإحداثي السيني للنقطة المشتركة ويُدخل في دالة اشتقاق المفاتيح HKDF.',
        },
      ],
    },
    interactiveBook3D: {
      model3DType: 'ecdh-key-bridge',
      shaderEffect: 'amber-key-pulse',
      sceneTitle: 'مجسم جسر تبادل المفاتيح ECDH ومختبر التوقيع الرقمي ECDSA',
      sceneDescription:
        'مشهد ثلاثي الأبعاد يصور عقدتي أليس وبوب وجسر تبادل النقطتين u = αG و v = βG للوصول إلى النقطة المشتركة w = αβG، مع محاكي كشف ثغرة تكرار الـ Nonce في ECDSA.',
      cameraPosition: { x: 0, y: 2.2, z: 6.8 },
      pages3D: [
        {
          pageNumber: 1,
          title: 'جسر ECDH واشتقاق مفتاح الجلسة عبر HKDF',
          subtitle: 'التقاء الأسرار المؤقتة دون عبور الشبكة',
          narrative:
            'يتبادل الطرفان النقطتين العامتين المؤقتتين u و v فقط، بينما تتشكل النقطة المشتركة w = αβG داخل الذاكرة المحمية لكل طرف وتُشتق منها مفاتيح التشفير بدالة HKDF.',
          equation: 'w = \\alpha(\\beta G) = \\beta(\\alpha G) \\xrightarrow{\\text{HKDF}} K_{\\text{session}}',
          liveGraphicType: 'ecdh-ecdsa-exchange',
          liveGraphicCaption: 'توليد السر المشترك وإتلاف المفاتيح المؤقتة لتحقيق السرية الأمامية',
          visualNotes: [
            'إتلاف α و β بعد المصافحة يمنع فك تشفير الجلسة مستقبلاً.',
            'يجب توقيع u و v لمنع هجوم الرجل في الوسط.',
          ],
        },
        {
          pageNumber: 2,
          title: 'بنية التوقيع الرقمي ECDSA والتحقق منه',
          subtitle: 'المعادلة المزدوجة (r, s) وإثبات الملكية',
          narrative:
            'يربط التوقيع الرقمي تجزئة الرسالة H(m) بالمفتاح السري α عبر القيمة العشوائية المؤقتة k، ويتحقق المدقق عبر حساب التركيبة الخطية aG + bQ.',
          equation: 's \\equiv k^{-1}(H(m) + r\\alpha) \\pmod q, \\quad \\hat{R} = H(m)s^{-1}G + rs^{-1}Q',
          liveGraphicType: 'ecdh-ecdsa-exchange',
          liveGraphicCaption: 'تطابق الإحداثي السيني للنقطة المحسوبة R̂ مع قيمة r في التوقيع الصحيح',
          visualNotes: [
            'رفض r=0 أو s=0 شرط أساسي لمنع التزوير الرياضي.',
            'المفتاح العام Q = αG يمكّن أي طرف من التحقق دون معرفة α.',
          ],
        },
        {
          pageNumber: 3,
          title: 'تشريح كارثة إعادة استخدام الـ Nonce (PlayStation 3 & Bitcoin)',
          subtitle: 'كيف ينكشف المفتاح السري α من توقيعين بنفس r؟',
          narrative:
            'عندما تتكرر القيمة العشوائية k في توقيعين، يصبح لدينا معادلتان خطيتان بمجهولين (k و α)، فيُحذف α بالطرح لاستخراج k ثم يُعوض لاستخراج α بالكامل.',
          equation: 'k \\equiv \\frac{H(m_1)-H(m_2)}{s_1-s_2} \\pmod q \\implies \\alpha \\equiv \\frac{s_1 k - H(m_1)}{r} \\pmod q',
          liveGraphicType: 'ecdh-ecdsa-exchange',
          liveGraphicCaption: 'محاكاة كشف المفتاح السري α = 5 من سجل التدقيق عند تكرار r = 16',
          visualNotes: [
            'RFC 6979 يولد k حتمياً من المفتاح والرسالة لمنع التكرار نهائياً.',
            'مراقبة تكرار r في سجلات التدقيق تكشف الخلل فوراً.',
          ],
        },
      ],
      stepByStep: [
        {
          step: 1,
          title: 'توليد وإرسال الحصص المؤقتة في ECDH',
          description:
            'تولد أليس α وتحسب u = αG، ويولد بوب β ويحسب v = βG، ويتبادلان النقطتين عبر القناة.',
          formula: 'u = \\alpha G, \\quad v = \\beta G',
          visualState: 'انطلاق كرتين ضوئيتين متقاطعتين عبر الجسر بين أليس وبوب.',
          securityNote: 'يجب أن تُولد α و β من مولد أرقام عشوائية تشفيري آمن (CSPRNG).',
        },
        {
          step: 2,
          title: 'حساب النقطة المشتركة واشتقاق المفتاح بـ HKDF',
          description:
            'يضرب كل طرف النقطة المستلمة في سره المؤقت للحصول على w = αβG، ثم يمرر x_w إلى HKDF.',
          formula: 'K_{\\text{session}} = \\text{HKDF-Expand}(\\text{HKDF-Extract}(\\text{salt}, x_w), \\text{info})',
          visualState: 'اندماج الشعاعين في نواة ذهبية مشتركة وتلاشي الأسرار المؤقتة α و β.',
          securityNote: 'توزيع مخرج HKDF منتظم تماماً ومناسب لمفاتيح AES-GCM.',
        },
        {
          step: 3,
          title: 'إنشاء توقيع ECDSA بقيمة تشغيلية فريدة k',
          description:
            'حساب R = kG وأخذ r = x_R mod q، ثم حساب s = k^(-1)(H(m) + rα) mod q.',
          formula: '(r, s) = \\left(x_{kG} \\bmod q,\\; k^{-1}(H(m) + r\\alpha) \\bmod q\\right)',
          visualState: 'ختم الوثيقة الرقمية بختم زمردي يحمل الزوج (r, s).',
          securityNote: 'استخدم RFC 6979 لضمان عدم تكرار k تحت أي ظرف.',
        },
        {
          step: 4,
          title: 'التحقق الرياضي من التوقيع لدى المستقبل',
          description:
            'حساب u_1 = H(m)s^(-1) mod q و u_2 = rs^(-1) mod q والتحقق من أن الإحداثي السيني لـ u_1G + u_2Q يساوي r.',
          formula: 'u_1 G + u_2 Q = (H(m) + r\\alpha)s^{-1}G = kG = R',
          visualState: 'تطابق الشعاعين الأخضر والأزرق على النقطة R وإضاءة علامة التحقق.',
          securityNote: 'إذا لم يتطابق الإحداثي السيني مع r يُرفض التوقيع فوراً.',
        },
      ],
      hotspots: [
        {
          id: 'ecdh-ephemeral-node',
          label: 'المفتاح المؤقت (Ephemeral α, β)',
          coordinates: { x: -2.0, y: 1.0, z: 0.5 },
          color: '#10b981',
          title: 'محرك السرية الأمامية (Forward Secrecy)',
          detailedExplanation:
            'مفتاح خاص يُولد لجلسة واحدة فقط ويُمحى من الذاكرة فور اشتقاق مفتاح الجلسة، مما يمنع فك تشفير الجلسات السابقة بأثر رجعي.',
          relatedEquation: 'w = \\alpha(\\beta G) = \\beta(\\alpha G)',
          securityImpact: 'يحمي سجل الاتصالات التاريخي حتى لو سُرق المفتاح الدائم للخادم لاحقاً.',
        },
        {
          id: 'hkdf-extractor-core',
          label: 'وحدة اشتقاق المفاتيح HKDF',
          coordinates: { x: 0.0, y: 1.4, z: 1.0 },
          color: '#3b82f6',
          title: 'تحويل النقطة الإهليلجية إلى مفتاح متماثل منتظم',
          detailedExplanation:
            'تطبق مرحلتي Extract و Expand لتحويل الإحداثي السيني للنقطة المشتركة إلى مفاتيح تشفير ومصادقة مستقلة لكل اتجاه.',
          relatedEquation: '\\text{PRK} = \\text{HMAC-Hash}(\\text{salt}, \\text{IKM})',
          securityImpact: 'تزيل أي انحياز إحصائي في بتات إحداثيات نقاط المنحنى.',
        },
        {
          id: 'ecdsa-nonce-vault',
          label: 'مولد القيمة التشغيلية k (RFC 6979)',
          coordinates: { x: 1.8, y: 0.9, z: 0.7 },
          color: '#ef4444',
          title: 'الحماية الحتمية ضد تكرار الـ Nonce',
          detailedExplanation:
            'يولد القيمة التشغيلية k حتمياً من دمج المفتاح الخاص وتجزئة الرسالة عبر HMAC_DRBG، مما يقضي نهائياً على خطر تكرار k.',
          relatedEquation: 'k = \\text{HMAC\\_DRBG}(\\alpha \\parallel H(m))',
          securityImpact: 'يمنع استخراج المفتاح الخاص عبر هجوم طرح التوقيعين.',
        },
        {
          id: 'audit-log-r-monitor',
          label: 'راصد تكرار r في سجل التدقيق',
          coordinates: { x: 0.0, y: -1.4, z: 1.2 },
          color: '#f59e0b',
          title: 'الفحص الآلي لقيم (r, s) العلنية',
          detailedExplanation:
            'يفحص سجل التدقيق العلني بحثاً عن أي تطابق في قيمة r بين توقيعين مختلفين لإيقاف المفتاح المخترق وإبطال شهادته فوراً.',
          relatedEquation: 'r_1 = r_2 \\implies \\text{Key Compromise Alert!}',
          securityImpact: 'يكتشف خلل مولدات العشوائية في الأجهزة الطرفية قبل استغلالها الواسع.',
        },
      ],
    },
    updated_at: 1730937600000,
  },

  // =========================================================================
  // الفصل الرابع: بروتوكول TLS 1.3 ومجموعات التشفير الحديثة (Cipher Suites & 0-RTT)
  // =========================================================================
  {
    id: 4,
    chapter_number: 4,
    title: 'بروتوكول TLS 1.3 ومجموعات التشفير الحديثة (Cipher Suites & 0-RTT)',
    subtitle: 'TLS 1.3 Handshake (1-RTT & 0-RTT), AEAD Cipher Suites (AES-GCM / ChaCha20-Poly1305) & Risk Priority',
    description:
      'تشريح سجل TLS 1.3، مجموعات التشفير الموثق (AES-GCM و ChaCha20-Poly1305)، مصافحة الجولة الواحدة (1-RTT) والجولة الصفرية (0-RTT)، جدول اشتقاق المفاتيح، وحساب أولوية معالجة المخاطر.',
    category: 'شبكات',
    difficulty: 'intermediate',
    pdfStartPage: 38,
    pdfEndPage: 49,
    diagramKey: 'ise243-4',
    diagramDescription:
      'مخطط تسلسلي لمصافحة بروتوكول TLS 1.3 في جولة واحدة (1-RTT) يوضح إرسال ClientHello + KeyShare والرد بـ ServerHello متبوعاً بالشهادة المشفرة ووسم Finished.',
    videoUrl: 'https://www.youtube.com/watch?v=86cQJ0MMses',
    videoTitle: 'تشريح بروتوكول TLS 1.3 ومجموعات التشفير الموثق AEAD ومخاطر 0-RTT',
    videoDuration: '19:50',
    presentationUrl: `${TEXTBOOK_PDF_PATH}#page=38`,
    keyTopics: [
      'بنية سجل TLS 1.3 وإخفاء النوع الحقيقي للسجل داخل النص المشفر (ContentType 23)',
      'الفروق الجوهرية بين TLS 1.2 و TLS 1.3 (إلزامية ECDHE، تشفير الشهادات، حذف CBC و RSA Key Transport)',
      'التشفير الموثق مع بيانات مصاحبة (AEAD): AES-GCM و ChaCha20-Poly1305 وفك التشفير الذري',
      'مصافحة الجولة الواحدة (1-RTT) ومخاطر إعادة الإرسال (Replay Attacks) في الجولة الصفرية (0-RTT)',
      'توليد الرقم الفريد (Nonce) ومفاتيح الاتجاهين المستقلة عبر HKDF',
      'ترويسة HSTS وحساب درجة أولوية معالجة المخاطر (الجدّية × احتمال الحدوث)',
    ],
    content: `# الفصل الرابع: بروتوكول أمن طبقة النقل TLS 1.3 ومجموعات التشفير الحديثة

## 4.1 معمارية TLS 1.3 وبنية السجل المشفر
صدر بروتوكول **TLS 1.3 (RFC 8446)** عام 2018 ليتخلى جذرياً عن الخوارزميات الضعيفة ويجعل السرية الأمامية إلزامية في كل اتصال. يتكون البروتوكول من طبقتين: **بروتوكول إعداد الجلسة (Handshake)** و **بروتوكول السجل (Record Protocol)**.
في TLS 1.3، يظهر حقل النوع الظاهر في ترويسة السجل المشفر دائماً بالقيمة الثابتة **23 (Application Data)** مع إصدار توافقي ثابت \`0x0303\`، بينما يوضع **النوع الحقيقي للسجل** مشفراً في نهاية النص قبل وسم المصادقة لحماية البيانات الوصفية من التحليل الشبكي.

---page---

## 4.2 مجموعات التشفير الموثق (AEAD Cipher Suites)
حذف TLS 1.3 جميع أنماط CBC وخوارزميات نقل المفاتيح بـ RSA، واقتصرت مجموعة التشفير فيه على زوج مكون من **خوارزمية تشفير موثق (AEAD)** و **دالة تجزئة لـ HKDF/HMAC**:
1. **\`TLS_AES_128_GCM_SHA256\`** (إلزامية الدعم في جميع تطبيقات TLS 1.3).
2. **\`TLS_AES_256_GCM_SHA384\`** (للأنظمة عالية الحساسية والجاهزية الكمومية).
3. **\`TLS_CHACHA20_POLY1305_SHA256\`** (مثالية للهواتف والأجهزة المحمولة التي تفتقر لتسريع AES العتادي).

> [!warning]
> **الفك الذري (Atomic Decryption) وعدم تكرار الـ Nonce:** يجب أن تتحقق خوارزمية AEAD من وسم المصادقة (Tag) كاملاً قبل إخراج أي بايت من النص الصريح. كما أن تكرار الرقم الفريد (Nonce) مع نفس المفتاح في AES-GCM يفضح سرية الرسالتين ويكشف مفتاح المصادقة الداخلي **GHASH**! لذلك يُحسب الـ Nonce في TLS 1.3 عبر عملية XOR بين متجه التهيئة المشتق (\`write_iv\`) والرقم التسلسلي للسجل (\`Sequence Number\`).

---page---

## 4.3 مصافحة الجولة الواحدة (1-RTT) ومخاطر الجولة الصفرية (0-RTT)
- **مصافحة 1-RTT:** يرسل العميل في أول رسالة \`ClientHello\` قائمة العروض مع حصة المفتاح المؤقت \`key_share\` مباشرًة، فيرد الخادم بـ \`ServerHello\` و \`key_share\` ثم يشتق مفاتيح المصافحة ويشفر شهادته (\`{Certificate}\`) وتوقيعه (\`{CertificateVerify}\`) ورسالة \`{Finished}\` في جولة واحدة فقط!
- **بيانات الجولة الصفرية (0-RTT Early Data):** عند استئناف جلسة سابقة بمفتاح مسبق (PSK)، يمكن للعميل إرسال بيانات في أول حزمة، لكنها **لا تتمتع بالسرية الأمامية الكاملة وعرضة لهجمات إعادة الإرسال (Replay Attacks)**؛ لذا يُحظر قبول 0-RTT في المعاملات المالية أو أوامر التعديل غير القابلة للتكرار (Non-idempotent requests).

---page---

## 4.4 التكوينات الآمنة وحساب أولوية معالجة المخاطر
يُشتق لكل اتجاه مفتاح مستقل (\`client_write_key\` و \`server_write_key\`) لمنع هجمات الانعكاس. ولترتيب إصلاح الثغرات التشفيرية هندسياً، تُحسب **درجة أولوية معالجة المخاطر**:
$$\\text{Priority Score} = \\text{Severity } (1..5) \\times \\text{Likelihood } (1..5) \\in [1, 25]$$

| المشكلة المكتشفة في الخادم | الجدّية (1–5) | الاحتمال (1–5) | درجة الأولوية | القرار الهندسي |
| :--- | :---: | :---: | :---: | :--- |
| تفعيل مجموعات تصدير ضعيفة (EXPORT 40-bit) | 5 | 4 | **20** | إزالة فورية من ملف الإعداد (الأولوية 1) |
| قبول بيانات 0-RTT في بوابة سداد الرسوم | 4 | 3 | **12** | تعطيل 0-RTT في مسارات الدفع (الأولوية 2) |
| غياب ترويسة HSTS لإلزام HTTPS | 3 | 3 | **9** | تفعيل Strict-Transport-Security (الأولوية 3) |
| بقاء مجموعات CBC القديمة مفعلة في TLS 1.2 | 3 | 2 | **6** | قصر الخادم على TLS 1.3 أو AEAD فقط (الأولوية 4) |`,
    images: [
      {
        prompt: 'TLS 1.3 handshake sequence, client server messages, encrypted channel, 16:9',
        caption: 'تسلسل مصافحة TLS 1.3 في جولة واحدة (1-RTT) وتشفير الشهادات',
        alt: 'TLS 1.3 handshake sequence',
        seed: 41,
        isAIGenerated: true,
      },
      {
        prompt: 'Network packet encryption with ephemeral Diffie-Hellman keys, secure socket, 16:9',
        caption: 'بنية السجل المشفر AEAD في TLS 1.3 وتوليد الرقم الفريد Nonce',
        alt: 'Network packet encryption with ephemeral Diffie-Hellman keys',
        seed: 42,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'ثورة TLS 1.3: السرعة والأمان الإلزامي',
        subtitle: 'لماذا أعاد RFC 8446 تصميم طبقة النقل من الجذور؟',
        bullets: [
          'إلزامية السرية الأمامية (Forward Secrecy) عبر ECDHE في كل جلسة دون استثناء.',
          'تقليص زمن المصافحة من جولتين (2-RTT في TLS 1.2) إلى جولة واحدة (1-RTT).',
          'تشفير شهادات الخادم والعميل لحماية الهوية من المتنصتين على الشبكة.',
          'حذف كامل للخوارزميات الضعيفة: RSA key transport، أنماط CBC، MD5، SHA-1، و RC4.',
        ],
        keyHighlight: 'إزالة الخيارات الضعيفة من البروتوكول تمنع هجمات خفض المستوى (Downgrade Attacks) من جذورها.',
        diagramTitle: 'مقارنة مصافحة TLS 1.2 (جولتان) مقابل TLS 1.3 (جولة واحدة)',
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'بنية سجل TLS 1.3 ومجموعات التشفير الثلاث',
        subtitle: 'إخفاء نوع المحتوى والاعتماد الحصري على AEAD',
        bullets: [
          'ترويسة السجل المشفر تحمل دائماً النوع الظاهر 23 (Application Data) لإخفاء نوع الرسالة.',
          'يوضع النوع الحقيقي للسجل (مصافحة، تنبيه، بيانات) داخل النص المشفر قبل وسم المصادقة.',
          'المجموعة الإلزامية: TLS_AES_128_GCM_SHA256، والمجموعة الفائقة: TLS_AES_256_GCM_SHA384.',
          'المجموعة المحمولة: TLS_CHACHA20_POLY1305_SHA256 للأجهزة غير المزودة بتسريع AES العتادي.',
        ],
        keyHighlight: 'التشفير في TLS 1.3 ذري (Atomic): لا يخرج بايت واحد للتطبيق قبل نجاح التحقق من وسم المصادقة.',
        diagramTitle: 'تشريح حقول سجل TLS 1.3 المشفر',
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'التشفير الموثق (AEAD) وبناء الرقم الفريد (Nonce)',
        subtitle: 'كيف يحمي TLS 1.3 من تكرار الـ Nonce ومن هجمات الانعكاس؟',
        bullets: [
          'يدمج AEAD السرية والسلامة في عملية واحدة تقبل نصاً صريحاً وبيانات مصاحبة (AAD).',
          'تكرار الـ Nonce في AES-GCM يكشف XOR النصين ويفضح مفتاح المصادقة GHASH.',
          'يبني TLS 1.3 الـ Nonce بعملية XOR بين متجه التهيئة الثابت (write_iv) والرقم التسلسلي للسجل (64-bit).',
          'يُشتق مفتاح مستقل لكل اتجاه (Client Write Key ≠ Server Write Key) لمنع عكس الرسائل.',
        ],
        keyHighlight: 'ربط الـ Nonce بالرقم التسلسلي المتزايد للسجل يضمن عدم تكراره طوال عمر مفتاح الجلسة.',
        diagramTitle: 'آلية توليد Nonce من Sequence Number ⊕ write_iv',
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'بيانات الجولة الصفرية (0-RTT) ومخاطر إعادة الإرسال',
        subtitle: 'المفاضلة بين السرعة القصوى والحماية من Replay Attacks',
        bullets: [
          'تسمح 0-RTT بإرسال بيانات التطبيق مع أول رسالة ClientHello بالاعتماد على مفتاح مسبق (PSK).',
          'بيانات 0-RTT لا تشترك في مفتاح ECDHE جديد، لذا تفتقر للسرية الأمامية الفورية.',
          'يستطيع مهاجم يسجل حزمة 0-RTT إعادة إرسالها للخادم عدة مرات (Replay Attack).',
          'يُحظر قبول 0-RTT في عمليات الدفع المالي أو طلبات POST/DELETE غير القابلة للتكرار.',
        ],
        keyHighlight: 'لا تقبل بيانات 0-RTT أبداً في العمليات المالية أو التي تغير حالة قاعدة البيانات.',
        diagramTitle: 'سيناريو هجوم إعادة الإرسال على طلب سداد في 0-RTT',
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'التكوين الآمن وحساب أولوية معالجة المخاطر',
        subtitle: 'منهجية ترتيب الإصلاحات الأمنية في خوادم المؤسسات',
        bullets: [
          'تفعيل ترويسة HSTS (Strict-Transport-Security) يجبر المتصفح على استخدام HTTPS حصرياً.',
          'إزالة الخيارات الضعيفة نهائياً بدلاً من مجرد تأخيرها في قائمة التفضيل.',
          'درجة أولوية المعالجة = الجدّية (1..5) × احتمال الحدوث (1..5).',
          'إرفاق كل تغيير في إعدادات الخادم بخطة اختبار توافق وخطة تراجع (Rollback Plan) موثقة.',
        ],
        keyHighlight: 'حساب درجة الأولوية يوجه الجهد الهندسي نحو الثغرات الأشد خطراً والأسهل استغلالاً أولاً.',
        diagramTitle: 'مصفوفة أولويات معالجة مخاطر إعدادات TLS',
      },
    ],
    flashcards: [
      {
        front: 'ماذا يحدث إذا تكرر الرقم الفريد (Nonce) مع نفس المفتاح في خوارزمية AES-GCM؟',
        back: 'ينكشف حاصل XOR بين النصين الصريحين (ضرب السرية)، وينكشف مفتاح التجزئة الداخلي GHASH مما يسمح للمهاجم بتزوير رسائل موثقة.',
        category: 'تشفير موثق',
      },
      {
        front: 'لماذا يشتق بروتوكول TLS 1.3 مفتاحين منفصلين للجلسة بدلاً من مفتاح واحد للطرفين؟',
        back: 'ليشفر كل مفتاح اتجاهاً واحداً فقط (عميل→خادم، وخادم→عميل)، مما يمنع هجمات الانعكاس (Reflection Attacks) التي تعيد إرسال حزم الطرف إليه.',
        category: 'أمن البروتوكولات',
      },
      {
        front: 'أين يوضع النوع الحقيقي للسجل (مثل المصافحة أو التنبيه) في سجل TLS 1.3 المشفر؟',
        back: 'يوضع مشفراً في نهاية النص الصريح داخل الحمولة المشفرة، بينما يظهر النوع الظاهر في الترويسة الخارجية دائماً بالقيمة 23 (بيانات تطبيق).',
        category: 'معمارية TLS',
      },
      {
        front: 'لماذا تُعد بيانات الجولة الصفرية (0-RTT) خطرة في عمليات الدفع الإلكتروني؟',
        back: 'لأنها عرضة لهجمات إعادة الإرسال (Replay Attacks) حيث يمكن للمتنصت نسخ حزمة 0-RTT وإعادة إرسالها لتكرار خصم المبلغ المالي.',
        category: 'مخاطر 0-RTT',
      },
      {
        front: 'ما هي مجموعة التشفير الإلزامية (Mandatory-to-Implement) في مواصفة TLS 1.3؟',
        back: 'المجموعة الإلزامية هي TLS_AES_128_GCM_SHA256.',
        category: 'معايير',
      },
      {
        front: 'كيف تُحسب درجة أولوية معالجة المخاطر لثغرات إعدادات التشفير؟',
        back: 'بحاصل ضرب درجة الجدّية (Severity من 1 إلى 5) في درجة احتمال الحدوث (Likelihood من 1 إلى 5) لتعطي قيمة بين 1 و 25.',
        category: 'إدارة مخاطر',
      },
    ],
    miniQuiz: [
      {
        question: 'أي مجموعة تشفير تُعد إلزامية الدعم في جميع تطبيقات مواصفة TLS 1.3 (RFC 8446)؟',
        options: [
          'TLS_RSA_WITH_AES_128_CBC_SHA',
          'TLS_AES_128_GCM_SHA256',
          'TLS_EXPORT_RC4_40_MD5',
          'TLS_DH_ANON_WITH_AES_256_CBC_SHA',
        ],
        correctIndex: 1,
        explanation:
          'تنص مواصفة TLS 1.3 على أن TLS_AES_128_GCM_SHA256 إلزامية لضمان التوافق والأمان الموثق بين جميع الخوادم والعملاء.',
      },
      {
        question: 'ما هي الوظيفة الأمنية الأساسية لترويسة HSTS (HTTP Strict Transport Security)؟',
        options: [
          'تسريع ضغط الصور في المتصفح',
          'إجبار المتصفح على الاتصال بالخادم عبر HTTPS حصرياً ومنع هجمات خفض المستوى إلى HTTP',
          'تشفير قاعدة البيانات الخلفية',
          'السماح ببيانات 0-RTT في طلبات الدفع',
        ],
        correctIndex: 1,
        explanation:
          'تُلزم ترويسة HSTS المتصفح برفض أي اتصال HTTP غير مشفر وتحويله تلقائياً إلى HTTPS، مما يحبط هجمات SSL Stripping.',
      },
      {
        question: 'إذا اكتُشفت ثغرة تفعيل مجموعة تشفير ضعيفة بجدّية (5) واحتمال حدوث (4)، وثغرة غياب HSTS بجدّية (3) واحتمال (3)، فما درجتا الأولوية على الترتيب؟',
        options: ['9 و 6', '20 و 9', '25 و 15', '12 و 9'],
        correctIndex: 1,
        explanation:
          'درجة الأولوية = الجدّية × الاحتمال؛ للثغرة الأولى 5 × 4 = 20، وللثانية 3 × 3 = 9، فتُعالج الأولى فوراً قبل الثانية.',
      },
      {
        question: 'كيف يولّد بروتوكول TLS 1.3 الرقم الفريد (Nonce) لكل سجل في AES-GCM لمنع تكراره؟',
        options: [
          'يستخدم قيمة صفرية ثابتة لكل السجلات',
          'يجري عملية XOR بين متجه التهيئة المشتق (write_iv) والرقم التسلسلي المتزايد للسجل (Sequence Number)',
          'يطلب من المستخدم إدخال رقم عشوائي',
          'يأخذ أول 12 بايت من النص الصريح',
        ],
        correctIndex: 1,
        explanation:
          'يُحشى الرقم التسلسلي للسجل (64 بت) بالأصفار إلى 96 بت ثم يُدمج بعملية XOR مع write_iv (96 بت) لضمان رقم فريد لكل سجل دون إرساله علناً.',
      },
    ],
    richData: {
      id: 4,
      chapter_number: 4,
      title: 'مجموعات التشفير المتقدمة في بروتوكول أمن طبقة النقل الإصدار 1.3 وتكويناتها الآمنة',
      subtitle: 'TLS 1.3 Handshake, AEAD Cipher Suites & Risk Prioritization',
      category: 'شبكات',
      pdfStartPage: 38,
      pdfEndPage: 49,
      description:
        'تشريح سجل TLS 1.3، مجموعات التشفير الموثق (AES-GCM و ChaCha20-Poly1305)، مصافحة الجولة الواحدة (1-RTT)، جدول اشتقاق المفاتيح، وحساب أولوية معالجة المخاطر.',
      objectives: [
        'مقارنة مجموعات التشفير والمصافحة بين TLS 1.2 و TLS 1.3.',
        'تحليل عمل التشفير الموثق (AEAD) وخطورة إعادة استخدام الرقم الفريد (Nonce) في AES-GCM.',
        'إعداد تكوين آمن لخادم الويب (Secure Baseline) مع تفعيل HSTS وتجاهل بيانات 0-RTT غير المحمية.',
        'حساب درجة أولوية معالجة المخاطر (الجدّية × احتمال الحدوث) وبناء خطة التغيير والتراجع.',
      ],
      sections: [
        {
          heading: '4.2 بروتوكول أمن طبقة النقل الإصدار 1.3 وحقول السجل',
          content:
            'يتكون TLS من إعداد الجلسة (Handshake) وبروتوكول السجل (Record Protocol). في TLS 1.3 يظهر نوع السجل المشفر دائماً كـ «بيانات تطبيق» (23)، بينما يُشفر النوع الحقيقي داخل النص مع الحشو. ويُشتق لكل اتجاه مفتاح مستقل بدالة HKDF (client write iv و server write iv).',
        },
        {
          heading: '4.3 مجموعات التشفير والتشفير الموثق (AEAD)',
          content:
            'في TLS 1.3 تقتصر مجموعة التشفير على زوج: خوارزمية تشفير موثق للسجلات (مثل AES-128-GCM الإلزامية أو ChaCha20-Poly1305) ودالة تجزئة لـ HMAC و HKDF (مثل SHA256). يجب أن يكون فك التشفير ذرياً (Atomic) فلا يُخرج شيئاً قبل التحقق من وسم المصادقة كاملاً.',
        },
        {
          heading: '4.4 المصافحة في جولة واحدة (1-RTT) والسرية الأمامية',
          content:
            'يرسل العميل ClientHello مع حصة تبادل المفتاح (key_share) وقائمة العروض، ويرد الخادم بـ ServerHello متبوعاً بشهادته مشفرة وتوقيعه ووسم Finished. بيانات الجولة الصفرية (0-RTT) تعتمد على المفتاح المسبق وحده وهي عرضة لهجمات إعادة الإرسال (Replay Attacks).',
        },
        {
          heading: '4.6 التكوينات الآمنة وحساب أولوية معالجة المخاطر',
          content:
            'يُمنع هجوم خفض المستوى بتعطيل SSL 3.0 و TLS 1.0/1.1 والمجموعات المتقادمة (EXPORT-40bit, CBC, RSA key transport) وتفعيل HSTS. وتُحسب درجة أولوية معالجة المخاطر بضرب الجدية (1–5) في احتمال الحدوث (1–5).',
          formula: 'درجة الأولوية = الجدّية (1..5) × احتمال الحدوث (1..5)  ∈ [1, 25]',
        },
      ],
      tables: [
        {
          title: 'جدول 4.2: الفرق الجوهري بين TLS 1.2 و TLS 1.3',
          headers: ['وجه المقارنة', 'TLS 1.2 وما قبله', 'TLS 1.3 (RFC 8446)'],
          rows: [
            ['ما تحدده المجموعة', 'خيارات كثيرة منها تبادل المفتاح والتوقيع', 'تشفير موثق (AEAD) ودالة تجزئة فقط'],
            ['تبادل المفتاح والسرية الأمامية', 'نقل سر بالمفتاح العام RSA أو ديفي-هيلمان اختياري', 'ديفي-هيلمان (ECDHE) إلزامي في كل جلسة'],
            ['حماية السجلات', 'CBC مع رمز منفصل (عرضة لهجمات الحشو) أو AEAD', 'تشفير موثق (AEAD) فقط'],
            ['هوية الطرفين', 'الشهادات مكشوفة في القناة', 'الشهادات مشفرة بمفاتيح المصافحة'],
          ],
        },
      ],
      commonMistake: {
        mistake:
          'إعادة استعمال الرقم الفريد (Nonce) مع المفتاح نفسه في AES-GCM، أو قبول بيانات الجولة الصفرية (0-RTT) في طلبات الدفع المالي.',
        fix: 'حساب الرقم الفريد بدمج الرقم التسلسلي مع قيمة عشوائية ثابتة، وتجاهل بيانات 0-RTT في العمليات غير القابلة للتكرار.',
      },
      solvedExample: {
        title: 'حساب أولوية معالجة المخاطر لخدمة تسجيل طلابية في جامعة سعودية',
        given:
          'أربع مشكلات أمنية مكتشفة: (1) مجموعة تصدير 40-بت [الجدية 5، الاحتمال 4]، (2) قبول 0-RTT في سداد الرسوم [الجدية 4، الاحتمال 3]، (3) غياب HSTS [الجدية 3، الاحتمال 3]، (4) مجموعات CBC [الجدية 3، الاحتمال 2].',
        steps: [
          '1. حساب أولوية المشكلة الأولى (تصدير 40-بت): 5 × 4 = 20.',
          '2. حساب أولوية المشكلة الثانية (0-RTT في السداد): 4 × 3 = 12.',
          '3. حساب أولوية المشكلة الثالثة (غياب HSTS): 3 × 3 = 9.',
          '4. حساب أولوية المشكلة الرابعة (مجموعات CBC): 3 × 2 = 6.',
        ],
        result: 'ترتيب الإصلاح الهندسي: المشكلة 1 (20) ثم 2 (12) ثم 3 (9) ثم 4 (6).',
        whyItMatters:
          'يوجه الجهد الهندسي المحدود إلى الثغرات الأعلى ضرراً والأسهل استغلالاً بدلاً من ترتيب الاكتشاف العشوائي.',
      },
      flashcards: [
        {
          front: 'ماذا يحدث إذا تكرر الرقم الفريد (Nonce) في AES-GCM؟',
          back: 'تضيع سرية الرسالتين وينكشف مفتاح GHASH فيمكن للمهاجم تزوير رسائل موثقة.',
        },
        {
          front: 'لماذا يشتق TLS 1.3 مفتاحين منفصلين للجلسة بدلاً من مفتاح واحد؟',
          back: 'ليشفر كل مفتاح اتجاهاً واحداً (عميل->خادم، وخادم->عميل) تصحيحاً لثغرات الانعكاس كما حدث في SSHv1.',
        },
      ],
      selfAssessment: [
        {
          question: 'عدّد حقول السجل المشفر في TLS 1.3، وبيّن أين يوجد النوع الحقيقي للسجل.',
          answer:
            'الحقول هي: النوع الظاهر (دائماً 23)، والإصدار (0x0303)، والطول، والنص المشفر. ويوجد النوع الحقيقي مشفراً داخل النص المشفر.',
        },
        {
          question: 'علّل كون إزالة الخيار الضعيف أجدى من تأخيره في ترتيب التفضيل.',
          answer:
            'لأن الخادم يختار ما يقبله، فيبقى الخيار الضعيف ممكناً مهما تأخر ويمكن لوسيط إجبار الطرفين عليه، بينما إزالته تمنعه كلياً.',
        },
      ],
      quiz: [
        {
          question: 'أي مجموعة تشفير تُعد إلزامية الدعم في مواصفة TLS 1.3؟',
          options: [
            'TLS_RSA_WITH_AES_128_CBC_SHA',
            'TLS_AES_128_GCM_SHA256',
            'TLS_EXPORT_RC4_40_MD5',
            'TLS_DH_ANON_AES_256',
          ],
          correctIndex: 1,
          explanation:
            'الزوج AES-128-GCM مع SHA256 إلزامي في مواصفة TLS 1.3 لضمان توافق جميع العملاء والخوادم.',
        },
        {
          question: 'ما الوظيفة الأساسية لترويسة HSTS؟',
          options: [
            'ضغط الصور في المتصفح',
            'إجبار المتصفح على الاتصال عبر HTTPS فقط ومنع خفض المستوى إلى HTTP',
            'تشفير قاعدة البيانات',
            'تسريع الجولة الصفرية',
          ],
          correctIndex: 1,
          explanation:
            'يوجه HSTS المتصفح إلى استخدام HTTPS فقط مستقبلاً فيمنع هجمات خفض المستوى مثل cookie cutter.',
        },
      ],
    },
    interactiveBook3D: {
      model3DType: 'tls13-tunnel-prism',
      shaderEffect: 'neon-tls-stream',
      sceneTitle: 'مجسم نفق مصافحة TLS 1.3 وكبسولة التشفير الموثق AEAD',
      sceneDescription:
        'منشور ضوئي ثلاثي الأبعاد يمثل تدفق رسائل مصافحة 1-RTT بين العميل والخادم، مع تفكيك كبسولة سجل TLS 1.3 (النوع الظاهر 23، النص المشفر، النوع الحقيقي المخفي، ووسم المصادقة).',
      cameraPosition: { x: 0, y: 2.0, z: 6.5 },
      pages3D: [
        {
          pageNumber: 1,
          title: 'مصافحة الجولة الواحدة (1-RTT Handshake)',
          subtitle: 'اختصار الزمن وتشفير الهوية منذ اللحظة الأولى',
          narrative:
            'يرسل العميل حصة المفتاح المؤقت key_share داخل ClientHello مباشرة، فيرد الخادم بـ ServerHello ويبدأ فوراً بتشفير الشهادة الرقمية والتوقيع بمفتاح المصافحة المشتق.',
          equation: '\\text{HandshakeKey} = \\text{HKDF-Expand-Label}(\\text{EarlySecret}, x_{\\text{ECDHE}})',
          liveGraphicType: 'tls13-handshake-flow',
          liveGraphicCaption: 'تدفق مصافحة 1-RTT وتشفير الشهادات مقارنة بـ TLS 1.2',
          visualNotes: [
            'الشهادات لا تمر مكشوفة في TLS 1.3 أبداً.',
            'ECDHE إلزامي في كل جلسة لضمان السرية الأمامية.',
          ],
        },
        {
          pageNumber: 2,
          title: 'كبسولة AEAD وبناء الـ Nonce غير المتكرر',
          subtitle: 'AES-GCM و ChaCha20-Poly1305 والفك الذري',
          narrative:
            'تُغلف كل رسالة داخل سجل يحمل النوع الظاهر 23 كبيانات مصاحبة (AAD)، ويُحسب الـ Nonce بعملية XOR بين write_iv والرقم التسلسلي للسجل.',
          equation: '\\text{Nonce}_{96} = \\text{write\\_iv}_{96} \\oplus (\\text{0}^{32} \\parallel \\text{seq\\_num}_{64})',
          liveGraphicType: 'tls13-handshake-flow',
          liveGraphicCaption: 'تشريح كبسولة السجل المشفر AEAD في TLS 1.3',
          visualNotes: [
            'الفك الذري يمنع إخراج أي بايت قبل التأكد من صحة وسم الـ 128-بت.',
            'مفاتيح الكتابة منفصلة لكل اتجاه.',
          ],
        },
        {
          pageNumber: 3,
          title: 'الجولة الصفرية (0-RTT) ومصفوفة أولويات المخاطر',
          subtitle: 'متى نرفض 0-RTT وكيف نرتب إصلاح الثغرات؟',
          narrative:
            'رغم أن 0-RTT تلغي زمن الانتظار عند استئناف الجلسة، إلا أنها عرضة لإعادة الإرسال؛ وتُرتب أولويات معالجة الثغرات بضرب الجدّية في الاحتمال.',
          equation: '\\text{Risk Priority} = \\text{Severity} \\times \\text{Likelihood}',
          liveGraphicType: 'tls13-handshake-flow',
          liveGraphicCaption: 'رفض هجوم Replay على 0-RTT وترتيب أولويات الإصلاح الهندسي',
          visualNotes: [
            'تُقبل 0-RTT فقط في طلبات القراءة الآمنة (Idempotent GET).',
            'ترويسة HSTS تغلق ثغرة البدء بـ HTTP.',
          ],
        },
      ],
      stepByStep: [
        {
          step: 1,
          title: 'إرسال ClientHello مع KeyShare (P-256 / X25519)',
          description:
            'يرسل العميل قائمة مجموعات التشفير الثلاث المدعومة مع حصته العامة المؤقتة u = αG في أول حزمة.',
          formula: '\\text{ClientHello} \\supset \\{\\text{CipherSuites},\\; \\text{KeyShare}(u = \\alpha G)\\}',
          visualState: 'انطلاق شعاع أخضر من العميل يحمل مفتاح ECDHE المؤقت.',
          securityNote: 'إرسال KeyShare مبكراً يوفر جولة كاملة من التفاوض.',
        },
        {
          step: 2,
          title: 'رد الخادم بـ ServerHello واشتقاق مفاتيح المصافحة',
          description:
            'يرسل الخادم حصته v = βG، ويشتق الطرفان مفاتيح المصافحة (Handshake Traffic Keys) عبر HKDF.',
          formula: 'K_{\\text{hs}} = \\text{HKDF}(\\text{EarlySecret},\\; \\alpha\\beta G,\\; H(\\text{HelloMessages}))',
          visualState: 'تكون درع بلوري أزرق يغلف القناة بين العميل والخادم.',
          securityNote: 'تدخل تجزئة رسائل المصافحة في اشتقاق المفتاح لمنع أي تلاعب بالرسائل.',
        },
        {
          step: 3,
          title: 'إرسال الشهادة المشفرة والتوقيع ورسالة Finished',
          description:
            'يرسل الخادم شهادته وتوقيعه على سجل المصافحة ووسم Finished داخل سجلات AEAD مشفرة.',
          formula: '\\text{VerifyData} = \\text{HMAC}(K_{\\text{finished}},\\; H(\\text{Transcript}))',
          visualState: 'عبور كبسولات مشفرة باللون الكهرماني داخل الدرع البلوري.',
          securityNote: 'توقيع سجل المصافحة بالكامل يحبط هجمات الرجل في الوسط وخفض المستوى.',
        },
        {
          step: 4,
          title: 'تبادل بيانات التطبيق بمفاتيح الاتجاهين المستقلة',
          description:
            'ينتقل الطرفان إلى مفاتيح التطبيق النهائية (Application Traffic Keys) مع فك تشفير ذري لكل سجل.',
          formula: '(C, T) = \\text{AEAD-Encrypt}(K_{\\text{app}},\\; \\text{IV} \\oplus \\text{seq},\\; \\text{AAD}_{23},\\; P \\parallel \\text{Type})',
          visualState: 'تدفق ثنائي الاتجاه بسرعات عالية مع فحص آلي لوسم المصادقة.',
          securityNote: 'عند اقتراب الرقم التسلسلي من الحد الأقصى يتم تدوير المفتاح برسالة KeyUpdate.',
        },
      ],
      hotspots: [
        {
          id: 'tls13-outer-header',
          label: 'ترويسة السجل الظاهرة (Type 23)',
          coordinates: { x: -1.9, y: 1.1, z: 0.8 },
          color: '#06b6d4',
          title: 'إخفاء نوع المحتوى (ContentType Obfuscation)',
          detailedExplanation:
            'تظهر الترويسة الخارجية دائماً كبيانات تطبيق (23) وتُمرر كبيانات مصاحبة غير مشفرة ولكن موثقة (AAD) لمنع العبث بها.',
          relatedEquation: '\\text{AAD} = \\text{0x17} \\parallel \\text{0x0303} \\parallel \\text{Length}',
          securityImpact: 'يمنع المتنصت من التمييز بين رسائل المصافحة والتنبيهات وبيانات التطبيق.',
        },
        {
          id: 'tls13-nonce-xor',
          label: 'مُولّد الـ Nonce (IV ⊕ Seq)',
          coordinates: { x: 0.0, y: 1.3, z: 1.1 },
          color: '#10b981',
          title: 'الرقم الفريد المشتق لكل سجل (96-bit Nonce)',
          detailedExplanation:
            'يدمج متجه التهيئة السري المشتق من HKDF مع عداد السجلات المتزايد بعملية XOR، فلا يُرسل الـ Nonce في الشبكة ولا يتكرر أبداً.',
          relatedEquation: 'N = \\text{write\\_iv} \\oplus \\text{seq\\_num}',
          securityImpact: 'يحمي AES-GCM و ChaCha20-Poly1305 من كارثة إعادة استخدام الـ Nonce.',
        },
        {
          id: 'tls13-aead-tag',
          label: 'وسم المصادقة الذري (128-bit Tag)',
          coordinates: { x: 1.9, y: 0.8, z: 0.8 },
          color: '#f59e0b',
          title: 'التحقق الذري قبل إخراج البيانات (Atomic Verification)',
          detailedExplanation:
            'وسم مصادقة بحجم 16 بايت يُفحص بالكامل في زمن ثابت قبل تسليم أي بايت من النص المفكوك إلى طبقة التطبيق.',
          relatedEquation: '\\text{Tag} = \\text{GHASH}_H(\\text{AAD}, C) \\oplus E_K(J_0)',
          securityImpact: 'يقضي كلياً على هجمات حشو CBC (مثل POODLE و Lucky13).',
        },
        {
          id: 'tls13-0rtt-guard',
          label: 'مرشح حماية 0-RTT (Anti-Replay)',
          coordinates: { x: 0.0, y: -1.3, z: 1.0 },
          color: '#ef4444',
          title: 'حارس منع إعادة الإرسال في الجولة الصفرية',
          detailedExplanation:
            'يرفض تنفيذ أي طلبات تعديل أو دفع مالي واردة داخل حزم 0-RTT Early Data ويلزمها بانتظار اكتمال مصافحة 1-RTT.',
          relatedEquation: '\\text{If } (\\text{is\\_0RTT} \\land \\neg\\text{Idempotent}) \\implies \\text{Reject (HTTP 425)}',
          securityImpact: 'يمنع تكرار الحوالات المالية والعمليات الحساسة عبر Replay Attacks.',
        },
      ],
    },
    updated_at: 1730937600000,
  },

  // =========================================================================
  // الفصل الخامس: الشبكات الافتراضية الخاصة VPN (IPsec ESP/IKEv2, OpenVPN, WireGuard)
  // =========================================================================
  {
    id: 5,
    chapter_number: 5,
    title: 'الشبكات الافتراضية الخاصة VPN (IPsec ESP/IKEv2, OpenVPN, WireGuard)',
    subtitle: 'IPsec Architecture (ESP, AH, Tunnel vs Transport, IKEv2), OpenVPN & WireGuard',
    description:
      'تصميم الأنفاق المشفرة بين فروع المؤسسات والموظفين عن بُعد باستخدام IPsec (IKEv2, ESP/AH, وضع النقل والنفق) و OpenVPN و WireGuard، ومفتاح القطع (Kill Switch) وتقسيم الشبكة.',
    category: 'شبكات',
    difficulty: 'intermediate',
    pdfStartPage: 50,
    pdfEndPage: 68,
    diagramKey: 'ise243-5',
    diagramDescription:
      'مخطط مقارن لبنية حزمة IPsec ESP في وضع النقل (Transport Mode) ووضع النفق (Tunnel Mode) مع تغليف الرأس الداخلي بالكامل بين البوابات.',
    videoUrl: 'https://www.youtube.com/watch?v=UuYQO2eYt1g',
    videoTitle: 'هندسة الأنفاق المشفرة: مقارنة معمارية بين IPsec IKEv2 و OpenVPN و WireGuard',
    videoDuration: '22:30',
    presentationUrl: `${TEXTBOOK_PDF_PATH}#page=50`,
    keyTopics: [
      'معمارية IPsec: بروتوكول تغليف حمولة الأمان ESP (رقم 50) مقابل رأس المصادقة AH (رقم 51)',
      'الفرق الهندسي بين وضع النقل (Transport Mode) ووضع النفق (Tunnel Mode) وعبور NAT-T (منفذ UDP 4500)',
      'بروتوكول IKEv2 بمرحلتيه (IKE_SA_INIT و IKE_AUTH) وجمعيات الأمان (SA) وتجديدها بـ CREATE_CHILD_SA',
      'بروتوكول OpenVPN فوق TLS/TCP (منفذ 443) لتجاوز جدران الحماية المقيدة وبنية الشهادات Easy-RSA',
      'بروتوكول WireGuard الحديث: العمل في نواة النظام، مصافحة Noise IK، وجدول التوجيه التشفيري AllowedIPs',
      'الضوابط الأمنية المتقدمة: مفتاح القطع (Kill Switch)، تقسيم الشبكة (Segmentation)، ومبدأ الامتياز الأقل',
    ],
    content: `# الفصل الخامس: هندسة التشفير في الشبكات — تصميم وإعداد اتصالات VPN آمنة

## 5.1 أساسيات الشبكات الافتراضية الخاصة وتبادل المفاتيح المصادق عليه
تُنشئ **الشبكة الافتراضية الخاصة (VPN)** نفقاً مشفراً ومصادقاً عليه عبر شبكة عامة غير موثوقة (كالإنترنت) لربط فرعين لمؤسسة (Site-to-Site) أو ربط موظف عن بُعد (Remote Access).
> [!important]
> **قاعدة تصميمية:** لا يجوز فصل بروتوكول التعريف بالهوية عن بروتوكول تبادل المفاتيح وتشغيلهما بالتتابع؛ بل يجب استخدام **تبادل مفاتيح مصادق عليه (Authenticated Key Exchange - AKE)** يربط الهوية بتوقيع القيم المؤقتة ذاتها لمنع اختطاف الجلسة.

---page---

## 5.2 معمارية بروتوكول IPsec و IKEv2
يعمل **IPsec** على طبقة الشبكة (Layer 3) لحماية جميع حزم IP، ويتكون من:
1. **بروتوكول تغليف حمولة الأمان (ESP — بروتوكول IP رقم 50):** يوفر **السرية والتكامل ومصادقة المصدر والحماية من إعادة الإرسال** عبر نافذة منزلقة للعداد التسلسلي.
2. **رأس المصادقة (AH — بروتوكول IP رقم 51):** يوفر التكامل ومصادقة المصدر فقط **دون أي تشفير للسرية**، ولا يعمل عبر أجهزة ترجمة العناوين (NAT).
3. **وضعا العمل (Transport vs Tunnel):**
   - **وضع النقل (Transport Mode):** يشفر الحمولة فقط ويُبقي رأس IP الأصلي مكشوفاً (يُستخدم بين مضيفين نهائيين Host-to-Host).
   - **وضع النفق (Tunnel Mode):** يغلف حزمة IP الأصلية بالكامل (الرأس الداخلي + الحمولة) داخل حزمة IP خارجية جديدة تحمل عنواني بوابتي الـ VPN، وهو **إلزامي عند الربط بين البوابات (Site-to-Site)**. وعند وجود NAT يُغلف ESP داخل **UDP على المنفذ 4500 (NAT-T)**.
4. **بروتوكول IKEv2 (منفذ UDP 500/4500):** ينشئ جمعيات الأمان (Security Associations - SA) في مرحلتين:
   - المرحلة الأولى \`IKE_SA_INIT\`: تفاوض الخوارزميات وتبادل ديفي-هيلمان لبناء قناة تحكم مشفرة.
   - المرحلة الثانية \`IKE_AUTH\`: التحقق من الهوية (بالشهادات الرقمية) وإنشاء أول جمعية أمان للبيانات \`CHILD_SA\`، وتُجدد دورياً برسالة \`CREATE_CHILD_SA\`.

---page---

## 5.3 مقارنة OpenVPN و WireGuard و IPsec
| المعيار الهندسي | IPsec (IKEv2 / ESP) | OpenVPN | WireGuard |
| :--- | :--- | :--- | :--- |
| **طبقة العمل والبروتوكول** | طبقة الشبكة (ESP 50 / UDP 500, 4500) | طبقة التطبيق فوق **UDP أو TCP (منفذ 443)** | داخل نواة النظام فوق **UDP حصرياً** |
| **الخوارزميات المعتمدة** | قابلة للتفاوض (مثل AES-256-GCM + SHA256) | مكتبة OpenSSL / TLS (قابلة للتخصيص) | ثابتة وحديثة (Curve25519, ChaCha20-Poly1305, BLAKE2s) |
| **إدارة الهوية** | شهادات X.509 أو PSK أو EAP | سلطة شهادات كاملة (PKI / Easy-RSA) | مفاتيح عامة ثابتة ومباشرة للنظراء (بدون شهادات) |
| **السيناريو الأمثل** | ربط الفروع الثابتة وأجهزة المؤسسات القياسية | شبكات مقيدة تحجب UDP وتتطلب العبور عبر TCP 443 | ربط الخوادم السحابية والأجهزة المحمولة بأعلى سرعة وأقل إعداد |

---page---

## 5.4 التوجيه الآمن، مفتاح القطع (Kill Switch)، وتقسيم الشبكة
- **جدول التوجيه التشفيري في WireGuard (\`AllowedIPs\`):** يربط كل نظير (Peer) بمفتاحه العام وقائمة العناوين المسموحة له؛ فعند الإرسال يعمل كجدول توجيه، وعند الاستقبال يعمل كقائمة تحكم بالوصول (ACL) تُسقط أي حزمة مفكوكة المصدر لا ينتمي عنوانها الداخلي إلى \`AllowedIPs\`.
- **مفتاح القطع (Kill Switch):** قاعدة جدار حماية محلية تمنع خروج أي حزمة شبكية من الجهاز إلا عبر واجهة النفق الافتراضية (\`tun0\` أو \`wg0\`)، فتمنع تسرب البيانات بالوضع الصريح إذا انقطع اتصال VPN فجأة.
- **تقسيم الشبكة (Network Segmentation):** تطبيق مبدأ الامتياز الأقل داخل شبكة المؤسسة بحيث لا يمنح اتصال الـ VPN وصولاً شاملاً لكل الخوادم، بل يقيد كل مستخدم بالقسم المخصص لدوره الوظيفي فقط.`,
    images: [
      {
        prompt: 'IPsec tunnel mode packet encapsulation, VPN gateway, network security, 16:9',
        caption: 'تغليف حزم IPsec ESP في وضع النفق (Tunnel Mode) مقابل وضع النقل (Transport Mode)',
        alt: 'IPsec tunnel mode packet encapsulation',
        seed: 51,
        isAIGenerated: true,
      },
      {
        prompt: 'Encapsulating Security Payload ESP header and tunnel diagram, cybersecurity architecture, 16:9',
        caption: 'معمارية IKEv2 و WireGuard وعزل حركة الشبكة عبر مفتاح القطع Kill Switch',
        alt: 'Encapsulating Security Payload ESP header and tunnel diagram',
        seed: 52,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'معمارية IPsec: الفرق بين ESP و AH ووضعي النقل والنفق',
        subtitle: 'حماية الحزم على طبقة الشبكة (Layer 3)',
        bullets: [
          'بروتوكول ESP (رقم 50) يوفر السرية والتكامل ومصادقة المصدر والحماية من إعادة الإرسال.',
          'بروتوكول AH (رقم 51) يوفر المصادقة والتكامل دون تشفير، ويتعطل مع ترجمة العناوين NAT.',
          'وضع النقل (Transport Mode) يشفر الحمولة فقط ويُبقي رأس IP الأصلي بين مضيفين.',
          'وضع النفق (Tunnel Mode) يغلف الحزمة الأصلية بالكامل برأس IP خارجي جديد وهو إلزامي للبوابات.',
        ],
        keyHighlight: 'عند ربط فرعين عبر بوابتين (Site-to-Site)، يجب استخدام وضع النفق (Tunnel Mode) مع بروتوكول ESP.',
        diagramTitle: 'بنية حزمة ESP في وضع النقل ووضع النفق',
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'بروتوكول IKEv2 وإدارة جمعيات الأمان (Security Associations)',
        subtitle: 'التفاوض والمصادقة وتجديد المفاتيح الآلي',
        bullets: [
          'تعمل المرحلة الأولى IKE_SA_INIT على تبادل ديفي-هيلمان وبناء قناة تحكم مشفرة.',
          'تعمل المرحلة الثانية IKE_AUTH على مصادقة الهوية بالشهادات وإنشاء أول جمعية أمان للبيانات CHILD_SA.',
          'عند وجود جهاز NAT في المسار، يُغلف ESP داخل حزم UDP على المنفذ 4500 (NAT-T).',
          'تُجدد مفاتيح النفق دورياً قبل انتهاء عمرها عبر رسالة CREATE_CHILD_SA مع السرية الأمامية PFS.',
        ],
        keyHighlight: 'دمج تبادل المفاتيح مع المصادقة في IKEv2 يمنع هجمات اختطاف الجلسة والرجل في الوسط.',
        diagramTitle: 'التسلسل الزمني لمرحلتي IKE_SA_INIT و IKE_AUTH',
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'بروتوكول OpenVPN: المرونة وتجاوز جدران الحماية المقيدة',
        subtitle: 'العمل فوق TLS و TCP المنفذ 443 وبنية الشهادات الرقمية',
        bullets: [
          'يعتمد OpenVPN على مكتبة OpenSSL وبروتوكول TLS لتأمين قناة التحكم واشتقاق مفاتيح البيانات.',
          'يدعم العمل فوق UDP للسرعة، أو فوق TCP على المنفذ 443 لتجاوز الشبكات التي تحجب UDP.',
          'يستخدم بنية مفاتيح عامة كاملة (PKI) تُدار بأداة Easy-RSA لإصدار وإبطال شهادات العملاء.',
          'مثالي للعيادات أو الموظفين المتنقلين خلف شبكات مزودي خدمة تقيد منافذ IPsec و UDP.',
        ],
        keyHighlight: 'ميزة OpenVPN الحاسمة هي قدرته على العمل فوق TCP/443 ليبدو كحركة HTTPS عادية.',
        diagramTitle: 'معمارية نفق OpenVPN فوق TCP/443',
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'بروتوكول WireGuard: البساطة التشفيرية والأداء الفائق',
        subtitle: 'التوجيه التشفيري (Cryptokey Routing) عبر AllowedIPs',
        bullets: [
          'يعمل داخل نواة النظام فوق UDP حصرياً بقاعدة شيفرة صغيرة جداً يسهل تدقيقها أمنياً.',
          'يعتمد خوارزميات ثابتة وحديثة: Curve25519، ChaCha20-Poly1305، و BLAKE2s (إطار Noise IK).',
          'يستغني عن الشهادات المعقدة ويعرّف كل نظير بمفتاحه العام القصير (32 بايت) مباشرة.',
          'قائمة AllowedIPs تعمل كجدول توجيه عند الإرسال وكقائمة تحكم في الوصول (ACL) عند الاستقبال.',
        ],
        keyHighlight: 'إذا وصلت حزمة عبر نفق WireGuard من عنوان داخلي غير مدرج في AllowedIPs الخاصة بذلك النظير، تُسقط فوراً.',
        diagramTitle: 'آلية التوجيه التشفيري AllowedIPs في WireGuard',
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'مفتاح القطع (Kill Switch) وتقسيم الشبكة المؤسسية',
        subtitle: 'منع تسرب البيانات وحصر الصلاحيات داخل النفق',
        bullets: [
          'الانقطاع المفاجئ لاتصال VPN قد يجعل نظام التشغيل يعيد توجيه الحزم الحساسة عبر الإنترنت المكشوف.',
          'مفتاح القطع (Kill Switch) يفرض قاعدة جدار حماية تمنع خروج أي حزمة من غير واجهة النفق.',
          'النفق الكامل (Full Tunnel) يوجه كل الحركة للنفق، بينما النفق المقسم (Split Tunnel) يوجه حركة المؤسسة فقط.',
          'تقسيم الشبكة (Network Segmentation) يعزل أقسام المؤسسة بحيث يصل المتصل للموارد المصرحة له فقط.',
        ],
        keyHighlight: 'لا يكتمل أمان نفق VPN إلا بتفعيل Kill Switch على طرف العميل وتقسيم الشبكة على طرف البوابة.',
        diagramTitle: 'عمل مفتاح القطع Kill Switch وعزل الشبكات الداخلية',
      },
    ],
    flashcards: [
      {
        front: 'ما الفرق الجوهري بين بروتوكول ESP وبروتوكول AH في حزمة IPsec؟',
        back: 'ESP (رقم 50) يوفر السرية (التشفير) والسلامة ومصادقة المصدر، بينما AH (رقم 51) يوفر السلامة ومصادقة المصدر فقط دون أي تشفير للسرية.',
        category: 'IPsec',
      },
      {
        front: 'متى يكون وضع النفق (Tunnel Mode) إلزامياً في IPsec بدلاً من وضع النقل (Transport Mode)؟',
        back: 'يكون وضع النفق إلزامياً عند ربط الشبكات عبر بوابات VPN (Site-to-Site Gateways) لأنه يغلف حزمة IP الأصلية بالكامل برأس خارجي يحمل عنواني البوابتين.',
        category: 'IPsec',
      },
      {
        front: 'كيف تعمل خاصية AllowedIPs في بروتوكول WireGuard؟',
        back: 'تعمل في اتجاهين: عند الإرسال تحدد أي نظير يملك المفتاح العام لتشفير الحزمة الموجهة لذلك العنوان، وعند الاستقبال ترفض أي حزمة مفكوكة لا يطابق عنوان مصدرها القائمة.',
        category: 'WireGuard',
      },
      {
        front: 'ما هو البروتوكول الأنسب لفرع أو موظف يعمل خلف شبكة تحجب بروتوكول UDP والمنافذ غير القياسية؟',
        back: 'بروتوكول OpenVPN مضبوطاً للعمل فوق TCP على المنفذ 443، لأنه يعبر جدران الحماية المقيدة كما لو كان اتصال HTTPS.',
        category: 'مقارنة بروتوكولات',
      },
      {
        front: 'ما وظيفة مفتاح القطع (Kill Switch) في أنظمة VPN؟',
        back: 'قاعدة جدار حماية تمنع خروج أي حزمة بيانات من الجهاز إلا عبر واجهة النفق المشفر، فتمنع تسرب البيانات مكشوفة في حال سقوط النفق فجأة.',
        category: 'ضوابط أمنية',
      },
      {
        front: 'لماذا نحتاج إلى فتح منفذ UDP 4500 عند تشغيل IPsec خلف أجهزة ترجمة العناوين (NAT)؟',
        back: 'لتفعيل آلية NAT Traversal (NAT-T) التي تغلف حزم ESP داخل رزم UDP على المنفذ 4500 حتى تتمكن أجهزة الـ NAT من توجيهها.',
        category: 'شبكات',
      },
    ],
    miniQuiz: [
      {
        question: 'أي بروتوكول VPN هو الأنسب لعيادة طبية تتصل عبر مزود خدمة يحجب حركة UDP بالكامل مع اشتراط إدارة الهوية بالشهادات الرقمية؟',
        options: [
          'WireGuard القياسي',
          'OpenVPN مضبوطاً للعمل فوق TCP على المنفذ 443',
          'IPsec AH بدون تغليف',
          'PPTP القديم',
        ],
        correctIndex: 1,
        explanation:
          'WireGuard يعمل فوق UDP فقط، بينما يدعم OpenVPN العمل فوق TCP على المنفذ 443 لتجاوز حجب UDP ويدعم الشهادات الرقمية X.509 بالكامل.',
      },
      {
        question: 'ما اسم الرسالة التي تتبادلها بوابتا IPsec في بروتوكول IKEv2 لتجديد جمعية الأمان واشتقاق مفاتيح جديدة قبل انتهاء عمرها؟',
        options: ['CREATE_CHILD_SA', 'CLIENT_HELLO', 'ESP_RENEW', 'IKE_RESET'],
        correctIndex: 0,
        explanation:
          'تُستخدم رسالة CREATE_CHILD_SA في IKEv2 لإنشاء جمعية أمان جديدة للبيانات وتدوير المفاتيح مع تحقيق السرية الأمامية قبل حذف الجمعية القديمة.',
      },
      {
        question: 'في أمر PowerShell لإعداد اتصال IKEv2 مؤسسي، أي خيار يفرض استخدام AES-256 بنمط التشفير الموثق GCM؟',
        options: ['DES3', 'GCMAES256', 'MD5', 'RC4-128'],
        correctIndex: 1,
        explanation:
          'يُضبط المعامل AuthenticationTransformConstants و CipherTransformConstants على القيمة GCMAES256 لتفعيل التشفير الموثق AES-256-GCM.',
      },
      {
        question: 'ماذا يحدث في WireGuard إذا استقبلت البوابة حزمة مشفرة صحيحة من نظير (Peer A)، ولكن بعد فك تشفيرها تبيّن أن عنوان IP المصدر الداخلي لا ينتمي إلى قائمة AllowedIPs الخاصة بـ Peer A؟',
        options: [
          'يقبلها النظام لأن التوقيع صحيح',
          'يسقطها النظام فوراً لمنع انتحال العناوين الداخلية بين النظراء',
          'يرسلها كحزمة غير مشفرة',
          'يعيد تشغيل الخادم',
        ],
        correctIndex: 1,
        explanation:
          'تُنفذ AllowedIPs فحص Reverse Path Filtering تشفيرياً صارماً، فتُسقط أي حزمة لا ينتمي عنوان مصدرها الداخلي للنطاق المسموح لذلك المفتاح العام.',
      },
    ],
    richData: {
      id: 5,
      chapter_number: 5,
      title: 'هندسة التشفير في الشبكات: تصميم وإعداد اتصالات VPN آمنة',
      subtitle: 'IPsec (IKEv2/ESP), OpenVPN & WireGuard Architecture',
      category: 'شبكات',
      pdfStartPage: 50,
      pdfEndPage: 68,
      description:
        'تصميم الأنفاق المشفرة بين فروع المؤسسات والموظفين عن بُعد باستخدام IPsec (IKEv2, ESP/AH, وضع النقل والنفق) و OpenVPN و WireGuard، وضوابط تقسيم الشبكة.',
      objectives: [
        'التمييز بين وضع النقل (Transport Mode) ووضع النفق (Tunnel Mode) وبروتوكولي ESP و AH في IPsec.',
        'تطبيق أوامر PowerShell لإعداد نفق IKEv2 بمصادقة شهادات الأجهزة و GCM-AES-256.',
        'إعداد سلطة شهادات بـ Easy-RSA وبناء نفق OpenVPN كامل والتحقق منه.',
        'مقارنة WireGuard بـ OpenVPN و IPsec وتطبيق مفتاح القطع (Kill Switch) وتقسيم الشبكة.',
      ],
      sections: [
        {
          heading: '5.2 معمارية بروتوكول IPsec و IKEv2',
          content:
            'يوفر بروتوكول تغليف حمولة الأمان (ESP - رقم 50) السرية والسلامة ومصادقة المصدر والحماية من إعادة الإرسال، بينما يوفر رأس المصادقة (AH) السلامة دون السرية. في وضع النفق (Tunnel Mode) تُغلف الحزمة كاملة داخل حزمة جديدة وهو إلزامي بين البوابات (Site-to-Site). ويُنشئ بروتوكول IKEv2 جمعيات الأمان (SA) في مرحلتين: IKE_SA_INIT ثم IKE_AUTH.',
        },
        {
          heading: '5.3 بروتوكولات OpenVPN و WireGuard',
          content:
            'يستخدم OpenVPN بروتوكول TLS لتأمين قناة التحكم ويدعم العمل فوق TCP على المنفذ 443 لتجاوز جدران الحماية التي تحجب UDP. أما WireGuard فيعمل داخل نواة لينكس فوق UDP فقط، ويستخدم نمط المصافحة IK بمفاتيح عامة ثابتة ومباشرة للنظراء مع قائمة العناوين المسموحة (AllowedIPs).',
        },
        {
          heading: '5.4 و 5.6 التوجيه الآمن ومفتاح القطع وتقسيم الشبكة',
          content:
            'مفتاح القطع (Kill Switch) هو قاعدة جدار حماية تمنع خروج أي حزمة من غير واجهة النفق حتى لو انقطع الاتصال فجأة. ويعزل تقسيم الشبكة (Network Segmentation) الموارد حسب مبدأ الامتياز الأقل (Least Privilege).',
        },
      ],
      tables: [
        {
          title: 'جدول 5.1: مطابقة متطلبات السيناريو ببروتوكول VPN الأنسب',
          headers: ['متطلب السيناريو', 'البروتوكول الأنسب', 'سبب الملاءمة الهندسي'],
          rows: [
            ['ربط شبكتين ثابتتين عبر بوابتين (الرياض والدمام)', 'IPsec بوضع النفق', 'وضع النفق إلزامي مع البوابات ولا يحتاج برامج على الأجهزة الداخلية'],
            ['موظف متنقل في شبكات تحجب UDP', 'OpenVPN فوق TCP (منفذ 443)', 'يعبر جدران الحماية التي تحجب UDP والبروتوكول 50'],
            ['ربط خوادم سحابية بأقل قدر من الإعداد', 'WireGuard', 'هوية بالمفاتيح العامة مباشرة ومصافحة برسالتين فقط'],
          ],
        },
      ],
      commonMistake: {
        mistake:
          'تشغيل بروتوكول تعريف بالهوية ثم تبادل مفاتيح مجهول الهوية بشكل متتالٍ غير متداخل، أو نسيان السماح لمنفذ UDP 4500 عند وجود NAT أمام IPsec.',
        fix: 'استخدام تبادل مفاتيح مصادق عليه (AKE مثل IKEv2) يدمج الهوية بتوقيع القيم المؤقتة، وتفعيل تغليف UDP على المنفذ 4500 لعبور أجهزة ترجمة العناوين.',
      },
      solvedExample: {
        title: 'إعداد اتصال VPN ببروتوكول IKEv2 ومصادقة الشهادات على Windows PowerShell',
        given:
          'بوابة فرع مؤسسة على العنوان vpn.example.com تتطلب شهادة جهاز وخوارزميات GCMAES256 ومجموعة ديفي-هيلمان Group14 وسرية أمامية PFS2048.',
        steps: [
          '1. التحقق من تثبيت شهادة الجهاز في certlm.msc تحت Personal > Certificates.',
          '2. إنشاء الاتصال بالأمر Add-VpnConnection مع تحديد -TunnelType Ikev2 و -AuthenticationMethod MachineCertificate.',
          '3. ضبط سياسة التشفير بالأمر Set-VpnConnectionIPsecConfiguration مع GCMAES256 و SHA256 و Group14 و PFS2048.',
          '4. الاتصال بالبوابة بالأمر rasdial "Branch-IKEv2" والتحقق من جمعيات الأمان بالأمر Get-NetIPsecMainModeSA.',
        ],
        result: 'قيام نفق IPsec IKEv2 مشفر ومصادق عليه بشهادة الجهاز مع سرية أمامية تامة.',
        whyItMatters:
          'يوفر أماناً مؤسسياً عالياً يمنع أي جهاز غير معتمد بشهادة المؤسسة من الاتصال بالشبكة الداخلية.',
      },
      codeExamples: [
        {
          title: 'أوامر PowerShell لإعداد وتأمين اتصال IKEv2 VPN',
          language: 'powershell',
          code: `Add-VpnConnection -Name "Branch-IKEv2" -ServerAddress "vpn.example.com" -TunnelType Ikev2 -AuthenticationMethod MachineCertificate -EncryptionLevel Required -MachineCertificateEKUFilter "1.3.6.1.5.5.7.3.2" -AllUserConnection -PassThru

Set-VpnConnectionIPsecConfiguration -ConnectionName "Branch-IKEv2" -AuthenticationTransformConstants GCMAES256 -CipherTransformConstants GCMAES256 -EncryptionMethod AES256 -IntegrityCheckMethod SHA256 -DHGroup Group14 -PfsGroup PFS2048 -AllUserConnection -Force`,
          explanation:
            'ينشئ الأمر الأول اتصال IKEv2 عام على الجهاز مقيداً بشهادات مصادقة العميل، ويفرض الأمر الثاني خوارزمية AES-256-GCM ومجموعة PFS2048.',
        },
      ],
      flashcards: [
        {
          front: 'ما الفرق بين ESP و AH في بروتوكول IPsec؟',
          back: 'ESP يوفر السرية والسلامة ومصادقة المصدر، بينما AH يوفر السلامة ومصادقة المصدر دون سرية.',
        },
        {
          front: 'كيف تعمل قائمة AllowedIPs في WireGuard؟',
          back: 'تعمل كجدول توجيه عند الإرسال وكقائمة تحكم في الوصول (ACL) عند الاستقبال فتُسقط أي حزمة واردة من عنوان خارجها.',
        },
      ],
      selfAssessment: [
        {
          question: 'قارن بين وضع النقل ووضع النفق في بروتوكول IPsec.',
          answer:
            'وضع النقل يحمي الحمولة ويُبقي الرأس الأصلي بين مضيفين نهائيين، بينما وضع النفق يغلف الحزمة كاملة برأس خارجي جديد ويُستخدم إلزامياً مع البوابات.',
        },
        {
          question: 'اشرح آلية عمل مفتاح القطع (Kill Switch) في منع تسرب البيانات.',
          answer:
            'يضيف قاعدة جدار حماية تمنع خروج أي حزمة من غير واجهة النفق، وتبقى القاعدة فعالة إذا انقطع اتصال VPN فجأة.',
        },
      ],
      quiz: [
        {
          question:
            'أي بروتوكول VPN هو الأنسب لعيادة تتصل عبر مزود خدمة يحجب حركة UDP مع اشتراط استخدام الشهادات الرقمية؟',
          options: ['WireGuard', 'OpenVPN فوق TCP', 'IPsec بدون تغليف', 'PPTP'],
          correctIndex: 1,
          explanation:
            'OpenVPN يدعم العمل فوق TCP (مثل المنفذ 443) متجاوزاً حجب UDP ويدعم بنية الشهادات الرقمية PKI.',
        },
        {
          question: 'ما الرسالة التي تستبدل بها البوابتان جمعية الأمان قبل انتهاء عمرها في IKEv2؟',
          options: ['CREATE_CHILD_SA', 'CLIENT_HELLO', 'KEY_UPDATE', 'ESP_RESET'],
          correctIndex: 0,
          explanation: 'تستبدل البوابتان جمعية الأمان عبر رسالة CREATE_CHILD_SA ثم تحذفان الجمعية القديمة.',
        },
      ],
    },
    interactiveBook3D: {
      model3DType: 'ipsec-wireguard-capsule',
      shaderEffect: 'cobalt-tunnel-shield',
      sceneTitle: 'مجسم كبسولة النفق المشفر IPsec ESP وموجه WireGuard التشفيري',
      sceneDescription:
        'نموذج ثلاثي الأبعاد يعرض طبقات تغليف حزمة IPsec ESP في وضع النفق بين بوابتين، وموجه AllowedIPs في WireGuard مع جدار مفتاح القطع (Kill Switch).',
      cameraPosition: { x: 0, y: 2.3, z: 7.0 },
      pages3D: [
        {
          pageNumber: 1,
          title: 'كبسولة IPsec ESP في وضع النفق (Tunnel Mode)',
          subtitle: 'إخفاء عناوين الشبكة الداخلية وحماية الحمولة',
          narrative:
            'تُغلف حزمة IP الداخلية بالكامل داخل حمولة ESP مشفرة بـ AES-GCM، ويُضاف رأس IP خارجي يحمل عنواني بوابتي المؤسسة في الرياض والدمام مع رمز تحقق ICV.',
          equation: '\\text{Packet}_{\\text{Tunnel}} = \\text{OuterIP} \\parallel \\text{ESP}_{\\text{SPI,Seq}} \\parallel E_K(\\text{InnerIP} \\parallel \\text{TCP} \\parallel \\text{Pad}) \\parallel \\text{ICV}',
          liveGraphicType: 'vpn-ipsec-wireguard',
          liveGraphicCaption: 'تفكيك ثلاثي الأبعاد لطبقات حزمة IPsec ESP في وضع النفق',
          visualNotes: [
            'SPI يحدد جمعية الأمان SA، و Seq يمنع إعادة الإرسال.',
            'NAT-T يغلف الحزمة داخل UDP/4500 عند عبور الموجهات المنزلية.',
          ],
        },
        {
          pageNumber: 2,
          title: 'مصافحة IKEv2 وتجديد جمعيات الأمان (SA)',
          subtitle: 'أتمتة إدارة مفاتيح النفق والسرية الأمامية',
          narrative:
            'تنفذ البوابتان IKE_SA_INIT لتبادل ديفي-هيلمان ثم IKE_AUTH للتحقق من الشهادات وبناء النفق، وتجددان المفاتيح دورياً عبر CREATE_CHILD_SA.',
          equation: '\\text{IKE\\_SA\\_INIT} \\longrightarrow \\text{IKE\\_AUTH} \\longrightarrow \\text{CREATE\\_CHILD\\_SA}',
          liveGraphicType: 'vpn-ipsec-wireguard',
          liveGraphicCaption: 'دورة حياة جمعية الأمان SA وتجديد المفاتيح الآلي',
          visualNotes: [
            'كل اتجاه له جمعية أمان SA مستقلة (Inbound SA & Outbound SA).',
            'تفعيل PFS يضمن تبادل ديفي-هيلمان جديد عند كل تجديد.',
          ],
        },
        {
          pageNumber: 3,
          title: 'WireGuard و AllowedIPs ومفتاح القطع (Kill Switch)',
          subtitle: 'البساطة الحديثة ومنع تسرب الحزم',
          narrative:
            'يربط WireGuard كل عنوان IP داخلي بالمفتاح العام للنظير في جدول واحد، بينما يغلق مفتاح القطع أي مسار خارجي إذا سقط النفق.',
          equation: '\\text{Accept}(P) \\iff \\text{AEAD\\_Verify}(P) \\land (\\text{InnerSrcIP} \\in \\text{AllowedIPs}[\\text{Peer}])',
          liveGraphicType: 'vpn-ipsec-wireguard',
          liveGraphicCaption: 'بوابة التوجيه التشفيري AllowedIPs ومفتاح القطع Kill Switch',
          visualNotes: [
            'يعمل WireGuard في نواة لينكس بسرعة فائقة.',
            'Kill Switch يمنع خروج البيانات عبر واجهة الشبكة العادية.',
          ],
        },
      ],
      stepByStep: [
        {
          step: 1,
          title: 'إنشاء قناة التحكم IKE_SA_INIT و IKE_AUTH',
          description:
            'تتفاوض البوابتان على خوارزمية AES-256-GCM و Group14 وتتحققان من شهادات الأجهزة لبناء النفق.',
          formula: 'SKEYSEED = \\text{prf}(Ni \\parallel Nr, g^{ir})',
          visualState: 'تشكل أنبوب مدرع أزرق كوبالت يربط بوابة الرياض ببوابة الدمام.',
          securityNote: 'استخدام شهادات الأجهزة يمنع أي جهاز غير مصرح له من بدء النفق.',
        },
        {
          step: 2,
          title: 'تغليف الحزمة الداخلية في وضع النفق (ESP Encapsulation)',
          description:
            'تشفير الحزمة الأصلية كاملة وإضافة ترويسة ESP (SPI + Sequence Number) ووسم النزاهة ICV.',
          formula: 'C = \\text{AES-GCM-Enc}(K_{\\text{ESP}},\\; \\text{IV},\\; \\text{InnerIP} \\parallel \\text{Payload})',
          visualState: 'دخول الحزمة الخضراء داخل كبسولة ESP الذهبية وإغلاقها بختم ICV.',
          securityNote: 'إخفاء الرأس الداخلي يمنع المتنصت من معرفة هيكل الشبكة الداخلية.',
        },
        {
          step: 3,
          title: 'فحص AllowedIPs ونافذة مكافحة إعادة الإرسال عند الاستقبال',
          description:
            'تتحقق بوابة الاستقبال من الرقم التسلسلي ووسم ICV وتطابق عنوان المصدر مع النطاق المسموح للنظير.',
          formula: '\\text{Seq} > \\text{Window}_{\\text{low}} \\land \\text{ICV}_{\\text{calc}} = \\text{ICV}_{\\text{recv}}',
          visualState: 'عبور الكبسولة من بوابة الفحص الضوئي واستخراج الحزمة الداخلية بأمان.',
          securityNote: 'تُسقط الحزم المكررة أو المنتحلة قبل وصولها للشبكة الداخلية.',
        },
        {
          step: 4,
          title: 'تفعيل مفتاح القطع (Kill Switch) عند انقطاع النفق',
          description:
            'في حال انقطاع الاتصال بالبوابة، يمنع جدار الحماية المحلي خروج أي حزمة عبر الواجهة الفيزيائية المباشرة.',
          formula: '\\text{OutInterface} \\neq \\text{tun0/wg0} \\implies \\text{DROP}',
          visualState: 'إغلاق البوابة الحمراء تلقائياً لحماية الحزم الداخلية من التسرب للإنترنت العام.',
          securityNote: 'يمنع كشف عنوان IP الحقيقي أو تسرب البيانات الحساسة أثناء إعادة الاتصال.',
        },
      ],
      hotspots: [
        {
          id: 'vpn-esp-header',
          label: 'ترويسة ESP (SPI & Seq)',
          coordinates: { x: -1.8, y: 1.0, z: 0.9 },
          color: '#3b82f6',
          title: 'مؤشر معلمات الأمان (SPI) والعداد التسلسلي',
          detailedExplanation:
            'يخبر حقل SPI (32-bit) بوابة الاستقبال بأي جمعية أمان ومفتاح يجب فك الحزمة، بينما يمنع الرقم التسلسلي (Sequence Number) هجمات إعادة الإرسال.',
          relatedEquation: '\\text{SA} = \\text{Lookup}(\\text{DstIP},\\; \\text{Protocol}=50,\\; \\text{SPI})',
          securityImpact: 'يمكّن البوابة من إدارة آلاف الأنفاق المتزامنة بمفاتيح معزولة.',
        },
        {
          id: 'vpn-inner-ip',
          label: 'رأس IP الداخلي المشفر',
          coordinates: { x: 0.0, y: 1.2, z: 1.1 },
          color: '#f59e0b',
          title: 'حماية طوبولوجيا الشبكة الداخلية في وضع النفق',
          detailedExplanation:
            'يُشفر رأس IP الأصلي بالكامل داخل حمولة ESP، فلا يرى المتنصت على الإنترنت سوى عنواني بوابتي الـ VPN الخارجيتين.',
          relatedEquation: 'E_K(\\text{Src}=10.1.1.5,\\; \\text{Dst}=10.2.1.9,\\; \\text{Data})',
          securityImpact: 'يمنع كشف خريطة العناوين والخوادم الداخلية للمؤسسة.',
        },
        {
          id: 'vpn-allowed-ips',
          label: 'محرك التوجيه التشفيري AllowedIPs',
          coordinates: { x: 1.8, y: 0.9, z: 0.8 },
          color: '#10b981',
          title: 'جدول ربط المفاتيح العامة بالعناوين في WireGuard',
          detailedExplanation:
            'يربط المفتاح العام لكل نظير (32 بايت) بقائمة العناوين المسموحة له، فيعمل كموجه وكجدار حماية صارم يمنع انتحال العناوين.',
          relatedEquation: '\\text{PeerKey}_{25519} \\longleftrightarrow \\text{10.10.0.2/32}',
          securityImpact: 'يلغي تعقيد بروتوكولات التفاوض ويمنع النظير المخترق من انتحال عنوان نظير آخر.',
        },
        {
          id: 'vpn-kill-switch',
          label: 'صمام مفتاح القطع (Kill Switch)',
          coordinates: { x: 0.0, y: -1.3, z: 1.0 },
          color: '#ef4444',
          title: 'حاجز منع التسرب عند سقوط النفق',
          detailedExplanation:
            'قاعدة جدار حماية دائمة تقيد حركة الشبكة بواجهة النفق الافتراضية فقط، ولا تسمح إلا لحزم IKEv2/WireGuard بالخروج للإنترنت.',
          relatedEquation: '\\text{Allow}(\\text{UDP } 51820) \\land \\text{Allow}(\\text{wg0}) \\land \\text{Drop}(\\text{eth0})',
          securityImpact: 'يضمن عدم خروج بايت واحد غير مشفر عند اضطراب الاتصال.',
        },
      ],
    },
    updated_at: 1730937600000,
  },

  // =========================================================================
  // الفصل السادس: تشفير قواعد البيانات (TDE، تشفير الأعمدة، وضع AES-XTS، وهرمية المفاتيح)
  // =========================================================================
  {
    id: 6,
    chapter_number: 6,
    title: 'تشفير قواعد البيانات (TDE، تشفير الأعمدة، وضع AES-XTS، وهرمية المفاتيح)',
    subtitle: 'Full Disk Encryption (XTS-AES), TDE, Column & Application-Level Encryption, Key Hierarchy & Rotation',
    description:
      'استراتيجية الدفاع متعدد الطبقات لحماية البيانات الساكنة: تشفير القرص الكامل (XTS-AES)، التشفير الشفاف (TDE)، التشفير الحتمي والعشوائي على مستوى العمود والتطبيق، وهرمية المفاتيح وتدويرها.',
    category: 'متقدم',
    difficulty: 'advanced',
    pdfStartPage: 69,
    pdfEndPage: 76,
    diagramKey: 'ise243-6',
    diagramDescription:
      'مخطط هرمية مفاتيح تشفير قواعد البيانات من ثلاث طبقات: المفتاح الجذر (Root Key داخل HSM) يغلف مفاتيح التغليف (KEK/Wrapping Keys) التي تشفر مفاتيح تشفير البيانات (DEK/Data Keys).',
    videoUrl: 'https://www.youtube.com/watch?v=J7B2nC6uXIU',
    videoTitle: 'طبقات تشفير قواعد البيانات (FDE, TDE, Column, App) وهرمية المفاتيح وتدويرها',
    videoDuration: '20:40',
    presentationUrl: `${TEXTBOOK_PDF_PATH}#page=69`,
    keyTopics: [
      'طبقات حماية البيانات الساكنة الأربع: FDE (XTS-AES)، TDE، تشفير العمود، وتشفير التطبيق',
      'الفرق بين التشفير الحتمي (Deterministic) والتشفير العشوائي (Randomized) ومخاطر تحليل التكرار',
      'حساب تمدد النص المشفر (Ciphertext Expansion) بسبب الحشو (Padding) ومتجه التهيئة (IV)',
      'هرمية المفاتيح ثلاثية الطبقات: المفتاح الجذر (Root Key) ← مفتاح التغليف (KEK) ← مفتاح البيانات (DEK)',
      'تدوير المفاتيح (Key Rotation) ولماذا يتحول DEK القديم إلى حالة «معطّل» بدلاً من الإتلاف الفوري',
      'مبدأ الاستعادة المعزولة عند الكوارث وفصل المهام عبر تجزئة السر (Secret Sharing)',
    ],
    content: `# الفصل السادس: تشفير قواعد البيانات — الأقراص، الأعمدة، التطبيق، وهرمية المفاتيح

## 6.1 الدفاع متعدد الطبقات لحماية البيانات الساكنة (Data at Rest)
لا تكفي طبقة تشفير واحدة لحماية قواعد البيانات المؤسسية من جميع التهديدات؛ بل تتكامل أربع طبقات لكل منها نطاق حماية محدد:

| طبقة التشفير | أين يُنفذ التشفير؟ | ماذا يحمي؟ | نقطة الضعف (ماذا لا يحمي؟) |
| :--- | :--- | :--- | :--- |
| **1. تشفير القرص الكامل (FDE / XTS-AES)** | نظام التشغيل / متحكم القرص (\`LUKS2\`) | السرقة المادية للأقراص الصلبة والخادم مطفأ | لا يحمي أثناء عمل الخادم من أي مستخدم أو برنامج على النظام |
| **2. التشفير الشفاف (TDE)** | محرك إدارة قاعدة البيانات (DBMS) | سرقة ملفات \`.mdf/.ibd\` أو النسخ الاحتياطية من نظام التشغيل | يفك التشفير تلقائياً في الذاكرة؛ لا يحمي من مدير قاعدة بيانات (DBA) أو ثغرة SQL Injection |
| **3. تشفير العمود (Column-Level)** | داخل أعمدة محددة في الجداول | عزل الحقول الحساسة بمفاتيح خاصة | التشفير الحتمي يكشف تكرار القيم قليلة التنوع |
| **4. تشفير التطبيق (Application-Level)** | داخل خادم التطبيق قبل الإرسال للقاعدة | أعلى عزل؛ المفاتيح لا تصل لخادم قاعدة البيانات أبداً | يمنع قاعدة البيانات من الفهرسة أو البحث على النص الصريح |

---page---

## 6.2 التشفير الحتمي مقابل العشوائي وتمدد النص المشفر
عند تشفير الأعمدة أو الحقول، نواجه مفاضلة هندسية بين **قابلية البحث** و **إخفاء الأنماط**:
- **التشفير الحتمي (Deterministic Encryption):** ينتج دائماً نفس النص المشفر لنفس النص الصريح، مما يسمح بعمليات البحث والمطابقة الدقيقة (\`WHERE national_id = ...\`). **شرطه الصارم:** لا يُستخدم إلا للحقول ذات المجال الواسع جداً (High Entropy) مثل رقم الهوية الوطنية. أما استخدامه لحقل قليل القيم (مثل «فصيلة الدم» أو «الجنس») فيسمح للمهاجم باستنتاج القيم فوراً عبر **تحليل التكرار (Frequency Analysis)**!
- **التشفير العشوائي (Randomized Encryption):** يستخدم قيمة تهيئة عشوائية جديدة ($IV$) في كل مرة فينتج نصوصاً مشفرة مختلفة لنفس القيمة، وهو إلزامي للحقول قليلة التنوع ولكنه يؤدي إلى **تمدد النص المشفر (Ciphertext Expansion)**:
  $$\\text{Stored Size} = \\lceil \\text{Plaintext} / 16 \\rceil \\times 16 \\text{ (Padding)} + 16 \\text{ bytes (IV)}$$
  مثال: حقل رقم هاتف طوله $10$ بايتات يُكمَّل بـ $6$ بايتات حشو ليصبح $16$ بايت، ويُضاف إليه $16$ بايت لـ $IV$، فيصبح حجمه المخزن **$32$ بايت** (أكثر من 3 أضعاف حجمه الأصلي).

---page---

## 6.3 هرمية المفاتيح وتدويرها والنسخ الاحتياطي المعزول
تُنظم مفاتيح التشفير في **هرمية شجرية من ثلاث طبقات**:
1. **المفتاح الجذر (Root / Master Key):** يسكن داخل وحدة أمن العتاد (HSM) ولا يغادرها أبداً.
2. **مفتاح تشفير المفاتيح / التغليف (KEK / Wrapping Key):** يُشفر بالمفتاح الجذر، ويُستخدم لتغليف مفاتيح البيانات.
3. **مفتاح تشفير البيانات (DEK / Data Encryption Key):** يشفر صفحات وجداول قاعدة البيانات الفعلية.

> [!important]
> **قاعدة تدوير المفاتيح والنسخ الاحتياطية:** عند تدوير مفتاح البيانات $DEK_1$ واستبداله بـ $DEK_2$، **يُحظر إتلاف $DEK_1$ فوراً**؛ بل يُنقل إلى حالة **«معطّل (Deactivated / Archived)»** للتمكن من فك تشفير النسخ الاحتياطية التاريخية التي شُفرت به. كما يجب تطبيق **مبدأ الاستعادة المعزولة عند الكوارث** و **تجزئة السر (Shamir's Secret Sharing)** بحيث لا تُستعاد المفاتيح إلا باجتماع أمينين معاً (رقابة ثنائية حقيقية).`,
    images: [
      {
        prompt: 'Database encryption hierarchy, root key wrapping key data key, HSM, 16:9',
        caption: 'الهرمية الثلاثية لمفاتيح تشفير قواعد البيانات: Root Key ← KEK ← DEK',
        alt: 'Database encryption hierarchy',
        seed: 61,
        isAIGenerated: true,
      },
      {
        prompt: 'Transparent data encryption column level database protection schema, 16:9',
        caption: 'مقارنة التشفير الشفاف TDE مع تشفير الأعمدة والتشفير على مستوى التطبيق',
        alt: 'Transparent data encryption column level database protection',
        seed: 62,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'طبقات حماية البيانات الساكنة: FDE و TDE',
        subtitle: 'ماذا يحمي تشفير القرص الكامل والتشفير الشفاف وماذا يعجزان عنه؟',
        bullets: [
          'تشفير القرص الكامل (FDE بنمط XTS-AES عبر LUKS2) يحمي من سرقة القرص المادي والخادم مطفأ.',
          'يربط نمط XTS-AES تشفير كل قطاع برقم موقعه على القرص دون أي تمدد في حجم البيانات.',
          'التشفير الشفاف (TDE) يشفر ملفات قاعدة البيانات وسجلات المعاملات على القرص تلقائياً.',
          'كل من FDE و TDE يفكان التشفير تلقائياً في الذاكرة، فلا يحميان من مدير قاعدة بيانات خبيث أو حقن SQL.',
        ],
        keyHighlight: 'لا تعتمد على TDE وحده لحماية الحقول فائقة الحساسية من المطلعين الداخليين (Insiders).',
        diagramTitle: 'نطاق الحماية في FDE مقابل TDE',
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'تشفير العمود والتطبيق: الحتمي مقابل العشوائي',
        subtitle: 'موازنة قابلية البحث مع الحماية من تحليل التكرار',
        bullets: [
          'التشفير الحتمي ينتج نفس النص المشفر لنفس المدخل، مما يتيح البحث بالمساواة والفهرسة.',
          'يُحظر استخدام التشفير الحتمي للحقول قليلة التنوع (مثل فصيلة الدم) لأنه يكشف القيم بتحليل التكرار.',
          'التشفير العشوائي يضيف IV عشوائياً لكل سجل فيخفي التكرار تماماً ولكنه يمنع البحث المباشر.',
          'التشفير على مستوى التطبيق (AES-GCM) يعزل المفاتيح في خادم التطبيق بعيداً عن قاعدة البيانات.',
        ],
        keyHighlight: 'رقم الهوية الوطنية يناسبه التشفير الحتمي للبحث، بينما فصيلة الدم والتشخيص الطبي يتطلبان تشفيراً عشوائياً.',
        diagramTitle: 'تصنيف حقول قاعدة بيانات طبية وربطها بطبقة التشفير المناسبة',
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'حساب تمدد النص المشفر (Ciphertext Expansion)',
        subtitle: 'الأثر الهندسي للحشو (Padding) ومتجه التهيئة (IV) على سعة التخزين',
        bullets: [
          'تعمل أنماط التشفير الكتلي (مثل AES-CBC) على كتل بحجم 16 بايت وتلزم بإضافة حشو PKCS#7.',
          'يحتاج التشفير العشوائي إلى تخزين قيمة التهيئة IV (16 بايت) بجوار كل حقل مشفر.',
          'مثال: حقل هاتف (10 بايت) + حشو (6 بايت) + IV (16 بايت) = 32 بايت (تضخم 3.2×).',
          'قصر تشفير العمود على الحقول الحساسة فقط يمنع تضخم قاعدة البيانات وتراجع أداء الذاكرة.',
        ],
        keyHighlight: 'فهم تمدد النص المشفر ضروري عند تصميم مخطط الجداول (Schema) وتحديد أطوال الأعمدة.',
        diagramTitle: 'معادلة تمدد الحقل من 10 بايت إلى 32 بايت في AES-CBC',
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'هرمية المفاتيح ثلاثية الطبقات وتدوير المفاتيح',
        subtitle: 'Root Key ← Wrapping Key (KEK) ← Data Key (DEK)',
        bullets: [
          'المفتاح الجذر (Root Key) في قمة الهرم داخل وحدة HSM ولا يغادرها صريحاً أبداً.',
          'مفتاح التغليف (KEK) يُشفر بالمفتاح الجذر ويغلف مفاتيح البيانات (DEK).',
          'عند تدوير مفتاح التغليف KEK، نعيد تغليف مفاتيح DEK الصغرى دون إعادة تشفير تيرابايتات البيانات!',
          'عند تدوير DEK، يُحفظ المفتاح القديم في حالة «معطّل (Deactivated)» لفك تشفير النسخ الاحتياطية القديمة.',
        ],
        keyHighlight: 'إتلاف مفتاح DEK القديم فور التدوير يجعل جميع النسخ الاحتياطية التاريخية غير قابلة للاستعادة نهائياً.',
        diagramTitle: 'شجرة هرمية المفاتيح الثلاثية وحالات دورة حياة المفتاح',
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'النسخ الاحتياطي المعزول وتجزئة السر (Secret Sharing)',
        subtitle: 'ضمان الاستعادة أثناء الكوارث مع الرقابة الثنائية الصارمة',
        bullets: [
          'مبدأ الاستعادة المعزولة: القدرة على فك تشفير النسخ الاحتياطية في بيئة طوارئ دون اتصال بخادم KMS الحي.',
          'التغليف المستقل لمفتاح الاستعادة بمفتاحي مديرين مختلفين يسمح لكل مدير بالاستعادة منفرداً (لا يحقق رقابة ثنائية).',
          'تجزئة السر (Shamir Secret Sharing) تقسم مفتاح الاستعادة إلى حصص لا يُركب المفتاح إلا باجتماعها معاً.',
          'تضمن تجزئة السر عدم قدرة أي مسؤول منفرد على تهريب وتفكيك النسخة الاحتياطية خارج المؤسسة.',
        ],
        keyHighlight: 'الرقابة الثنائية الحقيقية (Dual Control) تتحقق بتجزئة السر لا بالتغليف المستقل.',
        diagramTitle: 'الفرق بين تجزئة السر والتغليف المستقل في حماية النسخ الاحتياطية',
      },
    ],
    flashcards: [
      {
        front: 'لماذا لا يُتلف مفتاح تشفير البيانات (DEK) القديم فوراً بعد عملية التدوير؟',
        back: 'لأنه لا يزال مطلوباً لفك تشفير النسخ الاحتياطية التاريخية والأرشيفات التي شُفرت به؛ لذلك يُنقل إلى حالة «معطّل (Deactivated)» يُسمح فيها بفك التشفير فقط.',
        category: 'إدارة مفاتيح',
      },
      {
        front: 'ما الفرق بين التشفير الحتمي والتشفير العشوائي على مستوى العمود؟',
        back: 'التشفير الحتمي ينتج نفس النص المشفر لنفس المدخل فيسمح بالبحث ولكنه يفضح تكرار القيم القليلة، بينما العشوائي يغير النص المشفر في كل مرة بـ IV جديد فيخفي الأنماط تماماً.',
        category: 'تشفير أعمدة',
      },
      {
        front: 'كم يصبح حجم حقل نصي طوله 10 بايتات بعد تشفيره بنمط AES-CBC العشوائي (كتلة 16 بايت + IV بحجم 16 بايت)؟',
        back: 'يصبح 32 بايت (10 بايت نص + 6 بايت حشو لإكمال الكتلة 16 بايت + 16 بايت لقيمة التهيئة العشوائية IV).',
        category: 'حسابات',
      },
      {
        front: 'ما هي ميزة نمط XTS-AES المستخدم في تشفير الأقراص الكامل (LUKS2)؟',
        back: 'يربط تشفير كل قطاع برقم موقعه على القرص (Tweak) لمنع نسخ القطاعات بين المواقع، ولا يسبب أي تمدد في حجم النص المشفر.',
        category: 'تشفير أقراص',
      },
      {
        front: 'ما الفرق الأمني بين تجزئة السر (Secret Sharing) والتغليف المستقل لمفتاح النسخ الاحتياطي؟',
        back: 'تجزئة السر تشترط اجتماع المديرين معاً لتركيب المفتاح (رقابة ثنائية)، بينما التغليف المستقل يمنح كل مدير نسخة كاملة يمكنه فكها بمفرده.',
        category: 'حوكمة',
      },
      {
        front: 'أي طبقة تشفير تحمي البيانات الساكنة حتى لو تم اختراق حساب مدير قاعدة البيانات (DBA)؟',
        back: 'التشفير على مستوى التطبيق (Application-Level Encryption) لأن المفاتيح تبقى في خادم التطبيق ولا تصل إلى خادم قاعدة البيانات أبداً.',
        category: 'معمارية',
      },
    ],
    miniQuiz: [
      {
        question: 'في قاعدة بيانات مستشفى، أي نوع تشفير يناسب حقل «فصيلة الدم» لمنع المهاجم من استنتاج الفصائل عبر تحليل التكرار؟',
        options: [
          'التشفير الحتمي على مستوى العمود',
          'التشفير العشوائي على مستوى العمود أو التطبيق',
          'تشفير القرص الكامل فقط',
          'تجزئة MD5 بدون مملح',
        ],
        correctIndex: 1,
        explanation:
          'بما أن فصائل الدم محدودة بـ 8 قيم فقط، فإن التشفير الحتمي يكشف توزيعها الإحصائي فوراً، لذا يجب استخدام التشفير العشوائي.',
      },
      {
        question: 'حقل رقم هاتف طوله 10 بايتات يُراد تشفيره بنمط AES-CBC العشوائي (حجم الكتلة 16 بايت وحجم IV هو 16 بايت). كم بايتاً سيستهلك في قاعدة البيانات؟',
        options: ['10 بايتات', '16 بايتاً', '26 بايتاً', '32 بايتاً'],
        correctIndex: 3,
        explanation:
          'تُكمل الـ 10 بايتات بـ 6 بايتات حشو لتصبح 16 بايتاً، ويُضاف إليها 16 بايتاً لقيمة التهيئة العشوائية IV، فيكون المجموع 32 بايتاً.',
      },
      {
        question: 'ما الفائدة الهندسية المباشرة لوجود «مفتاح التغليف (KEK)» بين المفتاح الجذر ومفاتيح البيانات (DEK)؟',
        options: [
          'إلغاء الحاجة للنسخ الاحتياطي',
          'إمكانية تدوير المفتاح الأعلى وإعادة تغليف مفاتيح DEK بسرعة دون إعادة تشفير تيرابايتات البيانات المخزنة',
          'تقليل حجم متجه التهيئة IV إلى الصفر',
          'السماح لمدير قاعدة البيانات بقراءة المفتاح الجذر',
        ],
        correctIndex: 1,
        explanation:
          'تفصل هرمية المفاتيح بين تشفير البيانات الضخمة (بواسطة DEK) وتغليف المفاتيح الصغيرة (بواسطة KEK)، مما يتيح تدوير KEK في أجزاء من الثانية.',
      },
      {
        question: 'أي أداة ونمط تشفير يُستخدمان قياسياً في أنظمة لينكس لتشفير قسم قرص كامل بدون تمدد في حجم البيانات؟',
        options: [
          'cryptsetup luksFormat بنمط aes-xts-plain64',
          'AES-ECB بدون مفتاح',
          'ترويسة HSTS',
          'بروتوكول OCSP',
        ],
        correctIndex: 0,
        explanation:
          'تستخدم أداة cryptsetup مع LUKS2 نمط aes-xts-plain64 المصمم خصيصاً لتشفير قطاعات الأقراص الصلبة دون زيادة في الحجم.',
      },
    ],
    richData: {
      id: 6,
      chapter_number: 6,
      title: 'تشفير قواعد البيانات: التشفير على مستوى العمود، وعلى مستوى الأقراص، وإدارة المفاتيح',
      subtitle: 'FDE (LUKS/XTS-AES), TDE, Column/App Encryption & Key Hierarchy',
      category: 'متقدم',
      pdfStartPage: 69,
      pdfEndPage: 76,
      description:
        'استراتيجية الدفاع متعدد الطبقات لحماية البيانات الساكنة: تشفير القرص الكامل (XTS-AES)، التشفير الشفاف (TDE)، التشفير الحتمي والعشوائي على مستوى العمود والتطبيق، وهرمية المفاتيح.',
      objectives: [
        'المقارنة بين التشفير الكامل للقرص (FDE) والتشفير الشفاف للبيانات (TDE) وتشفير العمود والتطبيق.',
        'تمييز متى يُستخدم التشفير الحتمي (Deterministic) ومتى يجب استخدام التشفير العشوائي.',
        'تصميم هرمية مفاتيح ثلاثية الطبقات (Root Key -> KEK -> DEK) وإدارة تدوير المفاتيح.',
        'تطبيق مبدأ الاستعادة المعزولة عند الكوارث وفصل المهام عبر تجزئة السر (Secret Sharing).',
      ],
      sections: [
        {
          heading: '6.1 التشفير الكامل للقرص (FDE) والتشفير الشفاف (TDE)',
          content:
            'يحمي FDE (بنمط CBC-ESSIV أو XTS-AES عبر أداة cryptsetup luksFormat) من السرقة المادية للأقراص والنسخ الفيزيائية بينما الخادم مطفأ. أما التشفير الشفاف (TDE) فيشفر ملفات قاعدة البيانات أثناء التخزين ويحمي من سرقة الملفات من نظام التشغيل، لكن كليهما لا يحمي من مسؤول قاعدة بيانات داخلي خبيث.',
        },
        {
          heading: '6.2 التشفير على مستوى العمود والتطبيق وتمدد النص المشفر',
          content:
            'ينقسم تشفير العمود إلى حتمي (يسمح بالبحث والمطابقة لحقول واسعة المجال مثل رقم الهوية) وعشوائي (يمنع تحليل التكرار لحقول قليلة القيم مثل فصيلة الدم). أما التشفير على مستوى التطبيق بنمط GCM فيعزل المفاتيح تماماً عن خادم قاعدة البيانات.',
        },
        {
          heading: '6.3 و 6.4 هرمية المفاتيح وتدويرها والنسخ الاحتياطي المعزول',
          content:
            'تُنظم المفاتيح في بنية شجرية: مفتاح جذر (Root Key) يشفر مفاتيح التغليف (KEK)، التي تشفر مفاتيح تشفير البيانات (DEK). وعند تدوير DEK، يُنقل المفتاح القديم إلى حالة «معطّل» ولا يُتلف فوراً لأنه مطلوب لفك تشفير النسخ الاحتياطية القديمة.',
        },
      ],
      tables: [
        {
          title: 'جدول 6.3: تصنيف حقول قاعدة بيانات مواعيد طبية وربطها بطبقات التشفير',
          headers: ['الحقل', 'التصنيف', 'طبقة التشفير المقترحة', 'المبرر العملي والهندسي'],
          rows: [
            ['اسم القسم', 'عام', 'التشفير الشفاف (TDE)', 'بيانات غير حساسة تحتاج فهرسة وفرزاً سريعاً'],
            ['فصيلة الدم', 'سري', 'تشفير العمود (عشوائي)', 'قليل القيم الممكنة؛ التشفير العشوائي يمنع استنتاج القيم بتحليل التكرار'],
            ['رقم الهوية الوطنية', 'شديد الحساسية', 'تشفير العمود (حتمي)', 'مجال قيمه واسع جداً ويحتاج النظام للبحث والمطابقة الدقيقة'],
            ['التشخيص الطبي', 'شديد الحساسية', 'مستوى التطبيق (AES-GCM)', 'نص طويل حساس يحتاج تحققاً من السلامة وعزلاً تاماً للمفتاح عن القاعدة'],
          ],
        },
      ],
      commonMistake: {
        mistake:
          'استخدام التشفير الحتمي لحقول ذات قيم ممكنة قليلة جداً (مثل الجنس أو فصيلة الدم)، أو إتلاف مفتاح DEK القديم فور انتهاء التدوير.',
        fix: 'تطبيق التشفير العشوائي للحقول قليلة القيم، وتحويل المفتاح القديم إلى حالة «معطل» في الأرشيف لفك تشفير النسخ الاحتياطية السابقة.',
      },
      solvedExample: {
        title: 'حساب تمدد النص المشفر (Ciphertext Expansion) في الحقول القصيرة',
        given: 'حقل رقم هاتف طوله 10 بايتات يُراد تشفيره باستخدام نمط CBC العشوائي (حجم الكتلة 16 بايت).',
        steps: [
          '1. يضاف 6 بايتات حشوة (Padding) لإكمال النص الأصلي (10 بايت) إلى مضاعفات حجم الكتلة (16 بايت).',
          '2. يضاف 16 بايت لقيمة التهيئة العشوائية (IV) اللازمة لفك التشفير.',
          '3. يُجمع حجم النص المشفر المبطن (16 بايت) مع قيمة التهيئة (16 بايت).',
        ],
        result: 'يصبح حجم الحقل المخزن 32 بايت (أكثر من 3 أضعاف الحجم الأصلي).',
        whyItMatters: 'يوضح ضرورة قصر تشفير العمود والتطبيق على الحقول الحساسة فقط لتفادي تضخم حجم قاعدة البيانات.',
      },
      codeExamples: [
        {
          title: 'تهيئة قسم قرص مشفر بنمط XTS-AES في لينكس (LUKS2)',
          language: 'bash',
          code: `cryptsetup luksFormat --type luks2 --cipher aes-xts-plain64 /dev/sdb1`,
          explanation: 'يربط نمط XTS-AES التشفير بموقع الكتلة الفعلي على القرص مع الحفاظ على طول البيانات دون تمدد.',
        },
      ],
      flashcards: [
        {
          front: 'لماذا لا يُتلف مفتاح تشفير البيانات (DEK) القديم فوراً بعد التدوير؟',
          back: 'لأنه مطلوب لفك تشفير النسخ الاحتياطية القديمة التي شُفرت به؛ لذلك يُنقل إلى حالة «معطّل».',
        },
        {
          front: 'ما الفرق بين تجزئة السر (Secret Sharing) والتغليف المستقل؟',
          back: 'تجزئة السر تقسم المفتاح بحيث لا يُركب إلا باجتماع المديرين معاً (رقابة ثنائية حقيقية)، بينما التغليف المستقل يتيح لكل طرف فك نسخته منفرداً.',
        },
      ],
      selfAssessment: [
        {
          question: 'قارن بين التشفير الكامل للقرص والتشفير الشفاف من حيث التهديدات التي يغطيها كل منهما.',
          answer:
            'التشفير الكامل للقرص يحمي من سرقة القرص الصلب المادي والخادم مطفأ، بينما التشفير الشفاف يحمي من نسخ ملفات قاعدة البيانات المباشرة من نظام التشغيل.',
        },
        {
          question: 'علّل أهمية مبدأ الاستعادة المعزولة عند الكوارث للنسخ الاحتياطية.',
          answer:
            'لضمان إمكانية استعادة النسخ الاحتياطية في بيئات معزولة أثناء الكوارث دون الاعتماد على خوادم إدارة المفاتيح الحية أو الشبكات التي قد تكون معطلة.',
        },
      ],
      quiz: [
        {
          question: 'أي نوع تشفير يناسب حقل «فصيلة الدم» لمنع المهاجم من استنتاج الفصائل عبر تحليل التكرار؟',
          options: ['التشفير الحتمي', 'التشفير العشوائي على مستوى العمود', 'التشفير الكامل للقرص فقط', 'بدون تشفير'],
          correctIndex: 1,
          explanation:
            'لأن فصائل الدم محدودة العدد، فالتشفير الحتمي يكشف الأنماط، بينما ينتج التشفير العشوائي نصاً مشفراً مختلفاً في كل سجل.',
        },
      ],
    },
    interactiveBook3D: {
      model3DType: 'dek-kek-hsm-pyramid',
      shaderEffect: 'gold-hierarchy-wireframe',
      sceneTitle: 'مجسم هرمية مفاتيح قواعد البيانات الثلاثية وطبقات التشفير الأربع',
      sceneDescription:
        'هرم ثلاثي الأبعاد متدرج الإضاءة يعرض المفتاح الجذر (Root Key) في القمة داخل HSM، ومفاتيح التغليف (KEK) في الوسط، ومفاتيح تشفير البيانات (DEK) في القاعدة المتصلة بطبقات القرص والجدول والعمود والتطبيق.',
      cameraPosition: { x: 0, y: 2.8, z: 7.2 },
      pages3D: [
        {
          pageNumber: 1,
          title: 'الطبقات الأربع لحماية البيانات الساكنة',
          subtitle: 'من قطاع القرص الفيزيائي (XTS-AES) إلى ذاكرة التطبيق (AES-GCM)',
          narrative:
            'كل طبقة تغلق ثغرة محددة: FDE يحمي القرص المسروق، TDE يحمي ملفات القاعدة المسروقة، تشفير العمود يعزل الحقول الحساسة، وتشفير التطبيق يعزل المفاتيح عن مدير القاعدة نفسه.',
          equation: 'C_{\\text{XTS}} = E_{K_1}(P \\oplus (E_{K_2}(\\text{Sector}) \\otimes \\alpha^j)) \\oplus (E_{K_2}(\\text{Sector}) \\otimes \\alpha^j)',
          liveGraphicType: 'db-encryption-hierarchy',
          liveGraphicCaption: 'مقطع عرضي ثلاثي الأبعاد لطبقات حماية قاعدة البيانات الأربع',
          visualNotes: [
            'XTS-AES يستخدم مفتاحين K_1 للبيانات و K_2 لرقم القطاع دون تمدد.',
            'التشفير على مستوى التطبيق يحمي من ثغرات SQL Injection و DBA الخبيث.',
          ],
        },
        {
          pageNumber: 2,
          title: 'التشفير الحتمي مقابل العشوائي وتمدد النص المشفر',
          subtitle: 'كيف نختار نمط تشفير العمود لكل حقل طبي أو مالي؟',
          narrative:
            'الحقول قليلة القيم مثل فصيلة الدم تتطلب تشفيراً عشوائياً بـ IV فريد لمنع تحليل التكرار، مع حساب أثر التمدد (من 10 بايت إلى 32 بايت) في تصميم الجداول.',
          equation: '\\text{Ciphertext Size} = \\text{Pad}_{16}(|P|) + |\\text{IV}_{16}|',
          liveGraphicType: 'db-encryption-hierarchy',
          liveGraphicCaption: 'محاكاة تمدد حقل الهاتف من 10 بايت إلى 32 بايت ومنع تحليل التكرار',
          visualNotes: [
            'التشفير الحتمي يناسب رقم الهوية الوطنية للبحث السريع.',
            'AES-GCM في مستوى التطبيق يضيف 12 بايت Nonce و 16 بايت Tag.',
          ],
        },
        {
          pageNumber: 3,
          title: 'هرمية المفاتيح (Root -> KEK -> DEK) والتدوير الآمن',
          subtitle: 'حماية النسخ الاحتياطية وتجزئة السر (Secret Sharing)',
          narrative:
            'تغلف مفاتيح KEK مفاتيح البيانات DEK، وعند التدوير يحتفظ الأرشيف بـ DEK القديم في حالة «معطل» لفك النسخ الاحتياطية، مع تقسيم مفتاح الطوارئ بتجزئة السر.',
          equation: '\\text{Wrapped\\_DEK} = \\text{AES-KW}_{\\text{KEK}}(\\text{DEK}), \\quad \\text{KEK} = \\text{HSM}_{\\text{RootKey}}',
          liveGraphicType: 'db-encryption-hierarchy',
          liveGraphicCaption: 'شجرة تغليف المفاتيح الثلاثية وتدوير KEK دون المساس بالبيانات الضخمة',
          visualNotes: [
            'حالة Deactivated تسمح بفك تشفير النسخ القديمة وتمنع تشفير بيانات جديدة.',
            'Shamir Secret Sharing يفرض اجتماع أمينين لاستعادة النسخة الاحتياطية.',
          ],
        },
      ],
      stepByStep: [
        {
          step: 1,
          title: 'توليد المفتاح الجذر داخل وحدة HSM وتغليف KEK',
          description:
            'يُولَّد المفتاح الجذر داخل HSM ولا يغادرها، ويُستخدم لتشفير مفتاح التغليف KEK الخاص بقاعدة البيانات.',
          formula: 'C_{\\text{KEK}} = E_{\\text{RootKey}}(\\text{KEK})',
          visualState: 'توهج قمة الهرم الذهبية داخل صندوق HSM المدرع.',
          securityNote: 'المفتاح الجذر معزول فيزيائياً عن نظام تشغيل خادم قاعدة البيانات.',
        },
        {
          step: 2,
          title: 'تغليف مفاتيح البيانات (DEK) وتوزيعها على الأعمدة والجداول',
          description:
            'يغلف KEK مفاتيح البيانات DEK_A و DEK_B، وتُخزن مغلفة بجوار البيانات وتُفك في الذاكرة المحمية عند التشغيل.',
          formula: 'C_{\\text{DEK}} = \\text{KeyWrap}_{\\text{KEK}}(\\text{DEK})',
          visualState: 'امتداد خطوط الطاقة الخضراء من الطبقة الوسطى إلى مفاتيح الجداول في القاعدة.',
          securityNote: 'سرقة ملفات القرص لا تفيد المهاجم لأن DEK مخزن بصيغة مغلفة بـ KEK.',
        },
        {
          step: 3,
          title: 'تشفير الحقول حسب التصنيف (حتمي لرقم الهوية، عشوائي لفصيلة الدم)',
          description:
            'تطبيق التشفير الحتمي على حقل الهوية لإتاحة الفهرسة، والتشفير العشوائي بـ IV متجدد على حقل فصيلة الدم.',
          formula: 'C_{\\text{blood}} = \\text{IV} \\parallel E_{\\text{DEK}}(\\text{Pad}(\\text{BloodType}) \\oplus \\text{IV})',
          visualState: 'تحول قيم الأعمدة في الجدول الثلاثي الأبعاد إلى كتل مشفرة غير متشابهة.',
          securityNote: 'اختلاف IV يمنع المهاجم من معرفة المرضى الذين يشتركون في نفس فصيلة الدم.',
        },
        {
          step: 4,
          title: 'تدوير المفاتيح وأرشفة المفتاح القديم للنسخ الاحتياطية',
          description:
            'توليد DEK جديد للبيانات الحديثة ونقل DEK القديم إلى حالة «معطّل (Deactivated)» لفك النسخ الاحتياطية السابقة.',
          formula: '\\text{State}(\\text{DEK}_{\\text{old}}) \\leftarrow \\text{DEACTIVATED (Decrypt-Only)}',
          visualState: 'انتقال المفتاح القديم إلى خزنة الأرشيف الزرقاء وتوليد مفتاح نشط جديد.',
          securityNote: 'يحافظ على قابلية استعادة النسخ الاحتياطية التاريخية عند الكوارث.',
        },
      ],
      hotspots: [
        {
          id: 'db-root-key-hsm',
          label: 'قمة الهرم: المفتاح الجذر (Root Key)',
          coordinates: { x: 0.0, y: 2.2, z: 0.0 },
          color: '#f59e0b',
          title: 'المفتاح الجذر المعزول داخل وحدة HSM',
          detailedExplanation:
            'يمثل نقطة الثقة العليا في هرمية المفاتيح، ولا يخرج من حدود وحدة أمن العتاد أبداً بل تُرسل إليه مفاتيح التغليف لفكها داخله.',
          relatedEquation: '\\text{RootKey} \\in \\text{HSM Boundary Only}',
          securityImpact: 'يمنع تسرب شجرة المفاتيح حتى لو اخترق المهاجم خادم قاعدة البيانات بالكامل.',
        },
        {
          id: 'db-kek-layer',
          label: 'الطبقة الوسطى: مفتاح التغليف (KEK)',
          coordinates: { x: -1.4, y: 0.4, z: 1.0 },
          color: '#10b981',
          title: 'مفتاح تشفير المفاتيح (Key Encryption Key)',
          detailedExplanation:
            'حلقة الوصل بين HSM ومفاتيح البيانات؛ يسمح بتدوير المفاتيح العليا وإعادة تغليف DEK دون لمس البيانات المشفرة على الأقراص.',
          relatedEquation: '\\text{ReWrap}: C^{\\prime}_{\\text{DEK}} = E_{\\text{KEK}_{\\text{new}}}(D_{\\text{KEK}_{\\text{old}}}(C_{\\text{DEK}}))',
          securityImpact: 'يجعل عملية التدوير الدورية سريعة ولا تعطل توافرية قاعدة البيانات.',
        },
        {
          id: 'db-dek-column',
          label: 'القاعدة: مفتاح تشفير البيانات (DEK)',
          coordinates: { x: 1.4, y: -1.0, z: 1.0 },
          color: '#3b82f6',
          title: 'مفاتيح تشفير الجداول والأعمدة والقطاعات',
          detailedExplanation:
            'تُستخدم مباشرة في خوارزميات XTS-AES و AES-CBC و AES-GCM لتشفير البيانات الفعلية، وتُحفظ في حالة «معطل» بعد التدوير لخدمة النسخ الاحتياطية.',
          relatedEquation: 'C_{\\text{row}} = E_{\\text{DEK}}(\\text{Plaintext}_{\\text{row}})',
          securityImpact: 'عزل DEK لكل جدول أو تطبيق يحد من أثر أي تسرب جزئي.',
        },
        {
          id: 'db-secret-sharing-vault',
          label: 'خزنة الاستعادة المعزولة (Secret Sharing)',
          coordinates: { x: 0.0, y: -1.8, z: 1.2 },
          color: '#a855f7',
          title: 'تجزئة مفتاح الاستعادة لفرض الرقابة الثنائية',
          detailedExplanation:
            'يقسم مفتاح فك النسخ الاحتياطية إلى حصص رياضية توزع على أمناء مختلفين بحيث لا يمكن استعادة القاعدة في موقع الطوارئ إلا بحضورهم معاً.',
          relatedEquation: 'K_{\\text{backup}} = \\text{Reconstruct}(S_1, S_2)',
          securityImpact: 'يمنع الموظف المنفرد من سرقة النسخة الاحتياطية وفك تشفيرها خارج المؤسسة.',
        },
      ],
    },
    updated_at: 1730937600000,
  },

  // =========================================================================
  // الفصل السابع: التشفير المتجانس (Homomorphic Encryption: PHE Paillier, SWHE, FHE, ونمو الضوضاء)
  // =========================================================================
  {
    id: 7,
    chapter_number: 7,
    title: 'التشفير المتجانس (Homomorphic Encryption: PHE Paillier, SWHE, FHE, ونمو الضوضاء)',
    subtitle: 'Partially, Somewhat & Fully Homomorphic Encryption, Noise Accumulation & Bootstrapping',
    description:
      'الحوسبة على البيانات المشفرة في السحابة دون فك تشفيرها: التشفير المتجانس الجزئي (PHE مثل Paillier)، وبعض الشيء (SWHE)، والكامل (FHE)، وإدارة تراكم الضوضاء التشفيرية بعملية التمهيد (Bootstrapping).',
    category: 'متقدم',
    difficulty: 'advanced',
    pdfStartPage: 77,
    pdfEndPage: 85,
    diagramKey: 'ise243-7',
    diagramDescription:
      'منحنى بياني يوضح تراكم الضوضاء التشفيرية (Cryptographic Noise) مع تتابع العمليات الحسابية واقترابها من السقف الأقصى (Max Noise Threshold)، وكيف تعيد عملية التمهيد (Bootstrapping) الضوضاء إلى مستوى آمن.',
    videoUrl: 'https://www.youtube.com/watch?v=uKZ2jTH6E3s',
    videoTitle: 'التشفير المتجانس (PHE, SWHE, FHE) ونمو الضوضاء التشفيرية وعملية التمهيد Bootstrapping',
    videoDuration: '20:15',
    presentationUrl: `${TEXTBOOK_PDF_PATH}#page=77`,
    keyTopics: [
      'مبدأ التشفير المتجانس ونموذج الثقة (Honest-but-Curious Cloud Model)',
      'التشفير المتجانس الجزئي (PHE): الجمع المتجانس في Paillier والضرب المتجانس في RSA الخام',
      'التشفير المتجانس بعض الشيء (SWHE) وعلاقة عمق الدارة (Circuit Depth) بنمو الضوضاء',
      'التشفير المتجانس الكامل (FHE) وتقنية التمهيد (Bootstrapping) لتصفير الضوضاء',
      'معالجة غياب القسمة المباشرة في السحابة (إرجاع المجموع المشفر والعدد للمالك)',
      'القيود الهندسية: التضخم الهائل للنص المشفر، التكلفة الحسابية، والتسريب الوصفي (Metadata Leakage)',
    ],
    content: `# الفصل السابع: التشفير المتجانس أو المتماثل كلياً (Homomorphic Encryption)

## 7.1 مبدأ التشفير المتجانس ونموذج الثقة السحابي
في الحوسبة السحابية التقليدية، تضطر المؤسسة لفك تشفير بياناتها داخل السحابة لإجراء المعالجة الإحصائية أو المالية، مما يعرضها لخطر انكشافها لمزود الخدمة. يسمح **التشفير المتجانس (Homomorphic Encryption - HE)** للخادم السحابي بإجراء عمليات حسابية مباشرة على النصوص المشفرة $E(m_1)$ و $E(m_2)$ لإنتاج نص مشفر جديد يكافئ عند فك تشفيره ناتج العملية على النصين الصريحين:
$$D\\big(E(m_1) \\star E(m_2)\\big) = m_1 \\circ m_2$$
- **نموذج الثقة (Trust Model):** لا نثق بالخادم السحابي في حفظ سرية البيانات (فهو لا يملك المفتاح الخاص أبداً)، لكن نفترض أمانته في تنفيذ الخطوات الحسابية المطلوبة (Honest-but-Curious).

---page---

## 7.2 التصنيف الثلاثي للتشفير المتجانس (PHE, SWHE, FHE)
| الفئة | العمليات المدعومة | عمق الدارة (Circuit Depth) | أمثلة وتطبيقات عملية |
| :--- | :--- | :--- | :--- |
| **1. الجزئي (PHE)** | عملية واحدة فقط (جمع **أو** ضرب) | غير محدود للعملية الواحدة | نظام **Paillier** (جمع متجانس لمجاميع الرواتب والمبيعات والتصويت)؛ **RSA الخام** (ضرب متجانس) |
| **2. بعض الشيء (SWHE)** | الجمع والضرب معاً | **محدود** (يتوقف قبل بلوغ سقف الضوضاء) | تقييم كثيرات الحدود منخفضة الدرجة والإحصاءات البسيطة كالتباين |
| **3. الكامل (FHE)** | الجمع والضرب معاً | **غير محدود** (بفضل التمهيد Bootstrapping) | تقييم نماذج الذكاء الاصطناعي المشفرة والتحليلات الطبية المعقدة |

---page---

## 7.3 الضوضاء التشفيرية (Noise)، عمق الدارة، والتمهيد (Bootstrapping)
تعتمد أنظمة SWHE و FHE (المبنية على الشبكيات الرياضية ومسألة LWE) على إضافة **ضوضاء تشفيرية صغيرة ($e$)** داخل كل نص مشفر لإخفاء الرسالة:
- عند **جمع** نصين مشفرين، تُجمع الضوضاء خطياً ($e_1 + e_2$).
- عند **ضرب** نصين مشفرين، **تتضاعف الضوضاء وتتربع ($e_1 \\times e_2$)**!
يمثل **عمق الدارة (Circuit Depth)** عدد طبقات عمليات الضرب المتتالية؛ فإذا تجاوزت الضوضاء المتراكمة **الحد الأقصى ($B_{\\max}$)** تطغى الضوضاء على بتات الرسالة ويفشل فك التشفير في استعادة النص الصريح.
- **ابتكار التمهيد (Bootstrapping — Craig Gentry 2009):** عملية تعيد تنشيط النص المشفر المنهك بالضوضاء عن طريق تقييم «دارة فك التشفير نفسها» متجانساً باستخدام نسخة مشفرة من المفتاح السري، فينتج نص مشفر جديد لنفس القيمة ولكن بضوضاء منخفضة!

---page---

## 7.4 التطبيقات السحابية والقيود العملية
- **معالجة القسمة وحساب المتوسط:** لا تدعم معظم أنظمة HE القسمة المباشرة بكفاءة؛ لذلك يجمع الخادم السحابي القيم المشفرة (مثلاً مبيعات 50 فرعاً بنظام Paillier) ويعيد **المجموع المشفر مع عدد السجلات ($N=50$)** إلى المركز الرئيسي، الذي يفك تشفير المجموع ويقسمه محلياً على $50$.
- **مخاطر التسريب الوصفي (Metadata Leakage):** التشفير المتجانس يخفي المحتوى الرقمي لكنه لا يخفي حجم الملفات أو توقيت إرسالها أو عدد السجلات.
- **موانع الاستخدام الفوري:** بسبب التكلفة الحسابية العالية جداً وتضخم النص المشفر، لا يصلح FHE لأنظمة الدفع اللحظي أو التحكم الآني، بل يُخصص للمعالجة الدفعية (Batch Processing).`,
    images: [
      {
        prompt: 'Homomorphic encryption noise accumulation, bootstrapping visualization, 16:9',
        caption: 'تراكم الضوضاء التشفيرية مع زيادة عمق الدارة وإعادة ضبطها عبر التمهيد Bootstrapping',
        alt: 'Homomorphic encryption noise accumulation and bootstrapping',
        seed: 71,
        isAIGenerated: true,
      },
      {
        prompt: 'Computing on encrypted ciphertext data without decryption, privacy preserving computation, 16:9',
        caption: 'الحوسبة الحافظة للخصوصية في السحابة باستخدام التشفير المتجانس',
        alt: 'Computing on encrypted ciphertext data without decryption',
        seed: 72,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'مفهوم التشفير المتجانس ونموذج الثقة السحابي',
        subtitle: 'كيف نحسب على البيانات المشفرة دون كشفها للخادم؟',
        bullets: [
          'التشفير التقليدي يجبرك على فك التشفير قبل إجراء أي عملية جمع أو ضرب.',
          'التشفير المتجانس يحقق العلاقة: فك_تشفير(تشغيل(مشفر1، مشفر2)) = تشغيل(صريح1، صريح2).',
          'يحتفظ مالك البيانات بالمفتاح الخاص محلياً، ويرسل النصوص المشفرة والمفتاح العام للسحابة.',
          'الخادم السحابي ينفذ الحسابات المطلوبة بأمانة دون أن يتمكن من معرفة المدخلات أو المخرجات.',
        ],
        keyHighlight: 'لا تخلط بين «التشفير المتجانس (Homomorphic)» وبين «التشفير المتناظر (Symmetric)».',
        diagramTitle: 'دورة الحوسبة المشفرة بين فروع الشركة والخادم السحابي',
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'مقارنة PHE و SWHE و FHE',
        subtitle: 'اختيار النوع الأبسط الذي يلبي حاجة التطبيق بأقل تكلفة',
        bullets: [
          'الجزئي (PHE): يدعم عملية واحدة فقط (جمع في Paillier أو ضرب في RSA) بعدد غير محدود.',
          'بعض الشيء (SWHE): يدعم الجمع والضرب معاً ولكن بعمق دارة محدود.',
          'الكامل (FHE): يدعم الجمع والضرب معاً لعدد غير محدود من المرات بفضل التمهيد.',
          'لحساب إجمالي مبيعات 50 فرعاً، نختار PHE الجمعي (Paillier) لأنه أسرع بآلاف المرات من FHE.',
        ],
        keyHighlight: 'استخدام FHE لمهمة تحتاج جمعاً فقط هو هدر هندسي جسيم للموارد الحسابية.',
        diagramTitle: 'جدول مقارنة الأنواع الثلاثة للتشفير المتجانس',
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'الضوضاء التشفيرية (Noise) وعمق الدارة (Circuit Depth)',
        subtitle: 'لماذا تتلف البيانات المشفرة بعد عدة عمليات ضرب متتالية؟',
        bullets: [
          'يُضاف خطأ عشوائي صغير (Noise) عند التشفير لضمان الأمان الرياضي.',
          'عمليات الجمع تزيد الضوضاء ببطء (جمعياً)، بينما عمليات الضرب تضاعفها أسياً (تربيعياً).',
          'عمق الدارة هو أطول مسار من عمليات الضرب المتتالية في الخوارزمية.',
          'إذا تخطت الضوضاء الحد الأقصى المسموح (Noise Ceiling)، يفشل فك التشفير وتفسد النتيجة.',
        ],
        keyHighlight: 'ضوضاء التشفير في الضرب تنمو كمتوالية تربيعية (2 -> 4 -> 16 -> 256) فتستنزف ميزانية الضوضاء سريعاً.',
        diagramTitle: 'منحنى نمو الضوضاء التشفيرية مع عمليات الضرب',
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'عملية التمهيد (Bootstrapping): مفتاح التشفير المتجانس الكامل',
        subtitle: 'تنظيف الضوضاء داخل النص المشفر دون فك تشفيره علناً',
        bullets: [
          'ابتكر Craig Gentry تقنية التمهيد عام 2009 لتحويل SWHE المحدود إلى FHE غير محدود.',
          'تُجرى عملية فك التشفير نفسها كدارة منطقية مشفرة باستخدام نسخة مشفرة من المفتاح السري.',
          'الناتج هو نص مشفر جديد يحمل نفس القيمة الصريحة ولكن بمستوى ضوضاء منخفض وجديد.',
          'التمهيد عملية مكلفة حسابياً جداً، لذا يُستخدم فقط عند اقتراب الضوضاء من الحد الأقصى.',
        ],
        keyHighlight: 'التمهيد يعيد شحن ميزانية الضوضاء ليسمح بعمق دارة لا نهائي.',
        diagramTitle: 'آلية خفض الضوضاء عبر بوابة التمهيد Bootstrapping',
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'الحيل الهندسية التطبيقية ومخاطر التسريب الوصفي',
        subtitle: 'كيف نحسب المتوسط الحسابي وكيف نحمي البيانات الوصفية؟',
        bullets: [
          'لتجنب القسمة المعقدة في السحابة، تحسب السحابة المجموع المشفر وتعيده مع العدد N للمركز الرئيسي.',
          'يفك المركز الرئيسي تشفير المجموع في جزء من الثانية ويقسمه محلياً على N.',
          'التسريب الوصفي (Metadata Leakage): معرفة وقت الإرسال وعدد السجلات قد يكشف نشاط المؤسسة.',
          'تُعالج التسريبات الوصفية بتوحيد أحجام الرسائل (Padding) وإرسالها في دفعات زمنية ثابتة.',
        ],
        keyHighlight: 'تقسيم العمل بين السحابة (الجمع المشفر) والمركز الرئيسي (القسمة بعد الفك) يحقق أعلى كفاءة.',
        diagramTitle: 'معمارية حساب متوسط مبيعات 50 فرعاً عبر PHE',
      },
    ],
    flashcards: [
      {
        front: 'ما الفرق بين التشفير المتجانس الجزئي (PHE) والتشفير المتجانس الكامل (FHE)؟',
        back: 'PHE يدعم نوعاً واحداً فقط من العمليات (إما الجمع كما في Paillier أو الضرب كما في RSA) لعدد غير محدود، بينما FHE يدعم الجمع والضرب معاً لأي عمق دارة بفضل التمهيد.',
        category: 'أنواع التشفير المتجانس',
      },
      {
        front: 'ما هي وظيفة عملية التمهيد (Bootstrapping) في التشفير المتجانس الكامل؟',
        back: 'تقليل الضوضاء المتراكمة في النص المشفر عبر تقييم دارة فك التشفير نفسها بشكل متجانس، مما ينتج نصاً مشفراً جديداً بنفس القيمة وبضوضاء منخفضة.',
        category: 'مفاهيم متقدمة',
      },
      {
        front: 'كيف تتأثر الضوضاء التشفيرية بعمليتي الجمع والضرب على النصوص المشفرة؟',
        back: 'الجمع يزيد الضوضاء خطياً ببطء، بينما الضرب يضاعف الضوضاء بشكل تربيعي سريع مما يستهلك سقف الضوضاء المسموح.',
        category: 'الضوضاء التشفيرية',
      },
      {
        front: 'كيف نحسب متوسط المبيعات عبر خادم سحابي باستخدام تشفير متجانس جمعي (PHE) لا يدعم القسمة؟',
        back: 'يجمع الخادم السحابي النصوص المشفرة ويعيد النص المشفر للمجموع مع عدد الفروع (N) للمركز الرئيسي، الذي يفك تشفير المجموع ويقسمه على N محلياً.',
        category: 'تطبيقات سحابية',
      },
      {
        front: 'ما المقصود بالتسريب الوصفي (Metadata Leakage) في أنظمة التشفير المتجانس؟',
        back: 'تسرب معلومات غير مشفرة تحيط بالبيانات مثل حجم الملفات، وتوقيت إرسالها، وعدد المعاملات اليومية لكل فرع.',
        category: 'أمن وخصوصية',
      },
      {
        front: 'لماذا لا يُستخدم التشفير المتجانس الكامل (FHE) في بوابات الدفع الإلكتروني اللحظية؟',
        back: 'بسبب تكلفته الحسابية الباهظة وتضخم حجم النص المشفر آلاف المرات، مما يسبب تأخيراً زمنياً لا يناسب الأنظمة الفورية.',
        category: 'قيود عملية',
      },
    ],
    miniQuiz: [
      {
        question: 'إذا كانت الضوضاء الأولية في نص مشفر تساوي 2، وكانت كل عملية ضرب متجانس تربع قيمة الضوضاء (Noise^2)، وكان السقف الأقصى للضوضاء قبل تلف البيانات هو 100، فماذا يحدث بعد 3 عمليات ضرب متتالية؟',
        options: [
          'تصبح الضوضاء 6 وتنجح العملية',
          'تصبح الضوضاء 16 وتنجح العملية',
          'تصبح الضوضاء 256 وتتجاوز السقف الأقصى (100) فيفشل فك التشفير وتفسد البيانات',
          'تختفي الضوضاء تلقائياً بدون Bootstrapping',
        ],
        correctIndex: 2,
        explanation:
          'بعد الضرب الأول: 2^2 = 4؛ بعد الضرب الثاني: 4^2 = 16؛ بعد الضرب الثالث: 16^2 = 256 وهو أكبر من 100 فتتلف الرسالة ما لم نجرِ Bootstrapping قبل الضرب الثالث.',
      },
      {
        question: 'شركة تجزئة سعودية لديها 50 فرعاً وتريد جمع مبيعاتها اليومية على خادم سحابي دون كشف مبيعات أي فرع. ما الخيار التشفيري الأكفأ هندسياً؟',
        options: [
          'التشفير المتجانس الجزئي الجمعي (PHE مثل Paillier)',
          'التشفير المتجانس الكامل (FHE) مع تشغيل التمهيد في كل عملية جمع',
          'إرسال المفتاح الخاص للخادم السحابي لفك التشفير',
          'استخدام دالة تجزئة SHA-256 فقط',
        ],
        correctIndex: 0,
        explanation:
          'بما أن العملية المطلوبة هي الجمع فقط، فإن PHE الجمعي (Paillier) يؤدي المهمة بسرعة عالية ودون حاجة لتعقيد وتكلفة FHE.',
      },
      {
        question: 'ما المصطلح الذي يصف عدد العمليات المتتالية (وخاصة الضرب) التي تُجرى على النص المشفر قبل الحاجة إلى التمهيد؟',
        options: ['طول المفتاح', 'عمق الدارة (Circuit Depth)', 'نافذة الإرسال', 'معامل الالتواء'],
        correctIndex: 1,
        explanation:
          'عمق الدارة (Circuit Depth) هو عدد الطبقات المتتالية من البوابات الحسابية ويحدد مدى تراكم الضوضاء التشفيرية.',
      },
      {
        question: 'ما الفرق الأساسي بين التشفير المتجانس (Homomorphic Encryption) والتشفير المتناظر (Symmetric Encryption)؟',
        options: [
          'لا يوجد فرق بينهما',
          'التشفير المتناظر يستخدم مفتاحاً واحداً للتشفير والفك، بينما التشفير المتجانس يسمح بإجراء عمليات حسابية على النص المشفر نفسه دون فك تشفيره',
          'التشفير المتجانس لا يستخدم مفاتيح أبداً',
          'التشفير المتناظر أبطأ من التشفير المتجانس الكامل',
        ],
        correctIndex: 1,
        explanation:
          'التشابه اللفظي في الترجمة العربية («متماثل كلياً» مقابل «متماثل/متناظر») يوقع في اللبس؛ فالمتجانس يختص بالحوسبة على النصوص المشفرة.',
      },
    ],
    richData: {
      id: 7,
      chapter_number: 7,
      title: 'التشفير المتجانس أو المتماثل كلياً (Homomorphic Encryption)',
      subtitle: 'PHE, SWHE, FHE, Bootstrapping & Cloud Privacy',
      category: 'متقدم',
      pdfStartPage: 77,
      pdfEndPage: 85,
      description:
        'الحوسبة على البيانات المشفرة في السحابة دون فك تشفيرها: التشفير المتجانس الجزئي (PHE)، وبعض الشيء (SWHE)، والكامل (FHE)، وإدارة الضوضاء التشفيرية بعملية التمهيد.',
      objectives: [
        'فهم مبدأ التشفير المتجانس ونموذج الثقة (Trust Model) عند تفويض الحوسبة للسحابة.',
        'المقارنة بين أنواع التشفير المتجانس: الجزئي (PHE)، وبعض الشيء (SWHE)، والكامل (FHE).',
        'تحليل علاقة عمق الدارة (Circuit Depth) بتراكم الضوضاء التشفيرية ودور عملية التمهيد (Bootstrapping).',
        'تقييم حدود التطبيق (التكلفة الحسابية، تضخم حجم النص المشفر، والتسريب الوصفي).',
      ],
      sections: [
        {
          heading: '7.1 مبادئ التشفير المتجانس ونموذج الثقة',
          content:
            'يسمح التشفير المتجانس للخادم السحابي بإجراء عمليات رياضية (جمع أو ضرب) مباشرة على النص المشفر (Ciphertext) لإنتاج نص مشفر جديد يكافئ عند فك تشفيره ناتج العملية على النص الصريح (Plaintext). يلغي ذلك الحاجة للثقة بالخادم في حفظ سرية البيانات، مع افتراض أمانته في تنفيذ العملية الحسابية.',
        },
        {
          heading: '7.2 أنواع التشفير المتجانس والضوضاء والتمهيد',
          content:
            'يدعم PHE عملية واحدة فقط (الجمع في Paillier أو الضرب في RSA الخام) بعدد غير محدود. ويدعم SWHE الجمع والضرب معاً لكن بعمق دارة محدود بسبب تراكم الضوضاء التشفيرية (التي تتضاعف بالضرب). أما FHE فيستخدم تقنية التمهيد (Bootstrapping) لتقليل الضوضاء مما يتيح عمق دارة غير محدود.',
        },
        {
          heading: '7.3 و 7.4 التطبيقات السحابية وحدود الملاءمة',
          content:
            'لتفادي تعقيد عملية القسمة في السحابة عند حساب المتوسط، يجمع الخادم القيم المشفرة ويعيد المجموع المشفر مع عدد السجلات للمالك ليجري القسمة محلياً. ويجب الحذر من مخاطر التسريب الوصفي (Metadata Leakage) مثل حجم وتوقيت إرسال البيانات.',
        },
      ],
      tables: [
        {
          title: 'جدول 7.1: مقارنة أنواع التشفير المتجانس',
          headers: ['نوع التشفير', 'العمليات المدعومة', 'عمق الدارة (Circuit Depth)', 'المهمة المناسبة'],
          rows: [
            ['الجزئي (PHE)', 'نوع واحد فقط (جمع أو ضرب)', 'غير محدود للعملية الواحدة', 'حساب مجاميع المبيعات والأصوات الانتخابية'],
            ['بعض الشيء (SWHE)', 'جمع وضرب معاً', 'محدود (يتوقف عند سقف الضوضاء)', 'حسابات إحصائية بسيطة (مثل التباين ومجموع المربعات)'],
            ['الكامل (FHE)', 'جمع وضرب معاً', 'غير محدود (بفضل التمهيد Bootstrapping)', 'تقييم نماذج الذكاء الاصطناعي والتنبؤ المالي المعقد'],
          ],
        },
      ],
      commonMistake: {
        mistake:
          'الخلط بين مصطلح «التشفير المتماثل كلياً (Homomorphic)» وبين «التشفير المتناظر (Symmetric Encryption)»، أو استخدام FHE لمعالجة المدفوعات اللحظية.',
        fix: 'التشفير المتجانس يختص بالحوسبة على البيانات المشفرة، ويُختار PHE للمجاميع البسيطة بينما لا يناسب FHE الأنظمة اللحظية الحرجة لارتفاع تكلفته الحسابية.',
      },
      solvedExample: {
        title: 'تحليل استخدام سحابي لحساب إجمالي ومتوسط مبيعات 50 فرعاً لشركة تجزئة سعودية',
        given:
          'شركة تجزئة سعودية تمتلك 50 فرعاً، وترغب في حساب إجمالي ومتوسط المبيعات اليومية عبر خادم سحابي دون كشف أرقام المبيعات.',
        steps: [
          '1. تولد إدارة تقنية المعلومات في المركز الرئيسي زوج مفاتيح لتشفير متجانس جزئي جمعي (PHE مثل Paillier).',
          '2. توزع المفتاح العام على الـ 50 فرعاً، وتحتفظ بالمفتاح السري في خوادم المركز الرئيسي المعزولة.',
          '3. يشفر كل فرع مبيعاته اليومية بالمفتاح العام ويرسل النص المشفر للخادم السحابي.',
          '4. يجمع الخادم السحابي الـ 50 نصاً مشفراً بعملية الجمع المتجانس ويعيد النص المشفر النهائي مع العدد (50).',
          '5. يفك المركز الرئيسي تشفير المجموع بالمفتاح السري ويقسمه محلياً على 50 لحساب المتوسط.',
        ],
        result: 'الحصول على إجمالي ومتوسط المبيعات بدقة دون أن يطلع الخادم السحابي على أي رقم مبيعات.',
        whyItMatters:
          'يحقق الخصوصية التامة للبيانات المالية الحساسة بأقل كلفة حسابية ممكنة عبر اختيار PHE بدلاً من FHE.',
      },
      flashcards: [
        {
          front: 'ما هي وظيفة عملية التمهيد (Bootstrapping) في التشفير المتجانس؟',
          back: 'تقييم دارة فك التشفير نفسها بشكل متجانس على النص المشفر المليء بالضوضاء لإنتاج نص مشفر جديد بنفس القيمة ولكن بضوضاء أقل.',
        },
        {
          front: 'ما المقصود بالتسريب الوصفي (Metadata Leakage)؟',
          back: 'كشف معلومات عن البيانات الأصلية لا تتعلق بالمحتوى مثل حجم الملفات وتوقيت الإرسال وعدد السجلات.',
        },
      ],
      selfAssessment: [
        {
          question: 'قارن بين التشفير المتجانس الجزئي والتشفير المتجانس الكامل.',
          answer:
            'الجزئي (PHE) يدعم نوعاً واحداً فقط من العمليات (إما الجمع أو الضرب) لعدد غير محدود، بينما الكامل (FHE) يدعم العمليتين معاً بأي عمق دارة بفضل التمهيد.',
        },
        {
          question: 'عرّف عمق الدارة واشرح تأثيره على تراكم الضوضاء التشفيرية.',
          answer:
            'يمثل عمق الدارة عدد العمليات المتتالية التي تُجرى على البيانات المشفرة؛ ومع زيادة العمق (خصوصاً الضرب) تتراكم الضوضاء بسرعة حتى يتعذر فك التشفير.',
        },
      ],
      quiz: [
        {
          question:
            'إذا كانت الضوضاء الأولية 2 وتتضاعف بالضرب (تُربع في كل عملية ضرب) وكان الحد الأقصى للضوضاء 100، فماذا يحدث بعد 3 عمليات ضرب متتالية؟',
          options: [
            'تصبح الضوضاء 8 وتنجح العملية',
            'تصبح الضوضاء 16 وتنجح العملية',
            'تصبح الضوضاء 256 وتتجاوز الحد فتفسد البيانات',
            'تختفي الضوضاء تلقائياً',
          ],
          correctIndex: 2,
          explanation:
            'العملية الأولى: 2×2=4، الثانية: 4×4=16، الثالثة: 16×16=256 > 100، فتتجاوز الحد المسموح وتفسد البيانات.',
        },
      ],
    },
    interactiveBook3D: {
      model3DType: 'fhe-bootstrapping-sphere',
      shaderEffect: 'violet-noise-wave',
      sceneTitle: 'مجسم كرة الضوضاء التشفيرية وبوابة التمهيد (Bootstrapping) في FHE',
      sceneDescription:
        'كرة بلورية ثلاثية الأبعاد تمثل النص المشفر وبداخلها نواة الرسالة محاطة بهالة الضوضاء البنفسجية التي تتمدد مع كل عملية ضرب، ثم تتقلص عبر حلقة التمهيد الذهبية.',
      cameraPosition: { x: 0, y: 2.4, z: 6.8 },
      pages3D: [
        {
          pageNumber: 1,
          title: 'الجمع المتجانس في Paillier (PHE)',
          subtitle: 'ضرب النصوص المشفرة يعطي جمع النصوص الصريحة',
          narrative:
            'في نظام Paillier، عندما يضرب الخادم السحابي نصين مشفرين معاً بترديد n^2، فإن الناتج عند فك تشفيره يساوي مجموع الرسالتين الأصليتين بترديد n.',
          equation: 'E(m_1) \\cdot E(m_2) \\equiv (g^{m_1} r_1^n)(g^{m_2} r_2^n) \\equiv g^{m_1+m_2}(r_1 r_2)^n = E(m_1 + m_2) \\pmod{n^2}',
          liveGraphicType: 'homomorphic-noise-tree',
          liveGraphicCaption: 'تجميع مبيعات 50 فرعاً في السحابة عبر نظام Paillier PHE',
          visualNotes: [
            'الخادم السحابي يحتاج فقط إلى المفتاح العام n و g.',
            'المتوسط يُحسب بقسمة المجموع المفكوك على 50 في المركز الرئيسي.',
          ],
        },
        {
          pageNumber: 2,
          title: 'ديناميكا الضوضاء التشفيرية وعمق الدارة (SWHE)',
          subtitle: 'لماذا يهدد الضرب المتتالي سلامة النص المشفر؟',
          narrative:
            'تتضاعف الضوضاء تربيعياً مع كل بوابة ضرب متجانس (e_new ≈ e_1 × e_2)؛ فإذا وصلت الهالة البنفسجية إلى جدار الحد الأقصى (Max Noise) تتلف بتات الرسالة.',
          equation: '\\text{Noise}(C_1 \\otimes C_2) \\approx \\text{Noise}(C_1) \\times \\text{Noise}(C_2) < B_{\\max}',
          liveGraphicType: 'homomorphic-noise-tree',
          liveGraphicCaption: 'نمو الضوضاء التربيعي (2 -> 4 -> 16 -> 256) مقارنة بالسقف الأقصى 100',
          visualNotes: [
            'بعد عمليتي ضرب تكون الضوضاء 16 < 100 (آمنة).',
            'العملية الثالثة ترفعها إلى 256 > 100 فيجب التمهيد قبلها.',
          ],
        },
        {
          pageNumber: 3,
          title: 'بوابة التمهيد (Bootstrapping) والوصول إلى FHE',
          subtitle: 'فك التشفير المتجانس لتجديد ميزانية الضوضاء',
          narrative:
            'تمر الكرة المشفرة المليئة بالضوضاء عبر حلقة التمهيد المزودة بـ Evaluation Key، فتخرج بنص مشفر جديد يحمل نفس القيمة الصريحة ولكن بضوضاء أولية منخفضة.',
          equation: 'C_{\\text{refreshed}} = \\text{HomomorphicDecrypt}_{\\text{Enc}(sk)}(C_{\\text{noisy}})',
          liveGraphicType: 'homomorphic-noise-tree',
          liveGraphicCaption: 'إعادة شحن ميزانية الضوضاء عبر حلقة التمهيد Bootstrapping',
          visualNotes: [
            'يجعل التمهيد عمق الدارة غير محدود نظرياً.',
            'يُحذر من التسريب الوصفي لحجم وتوقيت الدفعات.',
          ],
        },
      ],
      stepByStep: [
        {
          step: 1,
          title: 'تشفير البيانات محلياً بالمفتاح العام مع ضوضاء أولية صغيرة',
          description:
            'يشفر كل فرع بياناته بالمفتاح العام مع إدراج ضوضاء أولية صغيرة (مثلاً e_0 = 2) ويرسلها للسحابة.',
          formula: 'C_i = \\text{Encrypt}_{pk}(m_i;\\; e_0 = 2)',
          visualState: 'ظهور كرات مشفرة بنواة خضراء ساطعة وهالة ضوضاء بنفسجية رقيقة جداً.',
          securityNote: 'الضوضاء الأولية ضرورية لإخفاء الرسالة ضمن مسألة التعلم مع الأخطاء (LWE).',
        },
        {
          step: 2,
          title: 'تنفيذ عمليات الجمع والضرب المتجانس في السحابة',
          description:
            'ينفذ الخادم السحابي عمليتي ضرب متتاليتين، فتزداد الضوضاء من 2 إلى 4 ثم إلى 16 (ضمن الحد الآمن < 100).',
          formula: 'e_1 = 2^2 = 4 \\longrightarrow e_2 = 4^2 = 16 < 100',
          visualState: 'اتساع الهالة البنفسجية حول النواة واقترابها من الغلاف الأحمر الخارجي.',
          securityNote: 'الخادم السحابي ينفذ العمليات دون معرفة قيمة m_i أو قيمة الضوضاء.',
        },
        {
          step: 3,
          title: 'تشغيل حلقة التمهيد (Bootstrapping) قبل تجاوز سقف الضوضاء',
          description:
            'قبل إجراء الضرب الثالث (الذي سيرفع الضوضاء إلى 256 > 100)، يمرر الخادم النص المشفر في دارة التمهيد.',
          formula: 'C^{\\prime} = \\text{Bootstrap}(C_{\\text{noisy}},\\; \\text{evk}) \\implies e^{\\prime} \\ll 100',
          visualState: 'عبور الكرة عبر حلقة ذهبية تمتص الهالة البنفسجية وتعيدها لحجمها الصغير.',
          securityNote: 'يمنع التمهيد تلف بتات الرسالة ويتيح مواصلة العمليات الحسابية.',
        },
        {
          step: 4,
          title: 'إرجاع النتيجة المشفرة للمركز الرئيسي لفكها بالمفتاح السري',
          description:
            'تستلم المؤسسة النص المشفر النهائي وتفكه بالمفتاح السري sk وتجري القسمة النهائية محلياً.',
          formula: 'M_{\\text{total}} = \\text{Decrypt}_{sk}(C_{\\text{final}}), \\quad \\text{Avg} = M_{\\text{total}} / N',
          visualState: 'فتح الكرة البلورية في المركز الرئيسي واستخراج النتيجة الرقمية الصريحة.',
          securityNote: 'لم تغادر البيانات الصريحة ولا المفتاح الخاص حدود المؤسسة إطلاقاً.',
        },
      ],
      hotspots: [
        {
          id: 'he-plaintext-core',
          label: 'نواة الرسالة المشفرة (Plaintext Slot)',
          coordinates: { x: 0.0, y: 0.0, z: 0.0 },
          color: '#10b981',
          title: 'القيمة الصريحة المحمية داخل البنية الجبرية',
          detailedExplanation:
            'تبقى القيمة الرقمية محفوظة داخل البنية الحلقية للنص المشفر وتخضع لنفس عمليات الجمع والضرب التي تُجرى على الغلاف الخارجي.',
          relatedEquation: 'D_{sk}(C_1 \\oplus C_2) = m_1 + m_2',
          securityImpact: 'سرية تامة للمدخلات والمخرجات الوسيطة أمام مزود السحابة.',
        },
        {
          id: 'he-noise-halo',
          label: 'هالة الضوضاء التشفيرية (Noise Vector)',
          coordinates: { x: -1.6, y: 1.1, z: 0.9 },
          color: '#a855f7',
          title: 'متجه الخطأ المتراكم مع عمق الدارة',
          detailedExplanation:
            'خطأ رياضي صغير يُضاف عند التشفير ويتضخم مع كل عملية ضرب؛ ويمثل الفرق بين السقف الأقصى والضوضاء الحالية «ميزانية الضوضاء».',
          relatedEquation: '\\|e_{\\text{mult}}\\| \\approx \\|e_1\\| \\cdot \\|e_2\\|',
          securityImpact: 'مراقبة عمق الدارة إلزامية لمنع تجاوز سقف الضوضاء وتلف البيانات.',
        },
        {
          id: 'he-bootstrap-ring',
          label: 'حلقة التمهيد (Bootstrapping Gate)',
          coordinates: { x: 1.7, y: 0.9, z: 0.8 },
          color: '#f59e0b',
          title: 'تقييم دالة فك التشفير متجانساً',
          detailedExplanation:
            'تستخدم مفتاح تقييم خاص (Evaluation Key) لإزالة الضوضاء المتراكمة من النص المشفر دون كشف النص الصريح.',
          relatedEquation: '\\text{Refresh}(C) = \\text{Eval}(\\text{Dec},\\; C,\\; \\text{Enc}(sk))',
          securityImpact: 'يحول التشفير المتجانس من عمق محدود (SWHE) إلى عمق غير محدود (FHE).',
        },
        {
          id: 'he-metadata-shield',
          label: 'درع التسريب الوصفي (Metadata Padding)',
          coordinates: { x: 0.0, y: -1.6, z: 1.1 },
          color: '#06b6d4',
          title: 'توحيد الأحجام وتوقيت الدفعات',
          detailedExplanation:
            'يمنع مزود السحابة من استنتاج معلومات تجارية من حجم الرسائل أو أوقات ذروة الإرسال عبر توحيد حجم الحزم وجدولتها.',
          relatedEquation: '|C_{\\text{padded}}| = \\text{Constant}, \\quad \\Delta t = \\text{Fixed Batch Interval}',
          securityImpact: 'يسد ثغرة تحليل حركة البيانات الوصفية (Traffic & Metadata Analysis).',
        },
      ],
    },
    updated_at: 1730937600000,
  },

  // =========================================================================
  // الفصل الثامن: إثباتات المعرفة الصفرية (Zero-Knowledge Proofs & بروتوكول Schnorr Sigma)
  // =========================================================================
  {
    id: 8,
    chapter_number: 8,
    title: 'إثباتات المعرفة الصفرية (Zero-Knowledge Proofs & بروتوكول Schnorr Sigma)',
    subtitle: 'Zero-Knowledge Proofs (Completeness, Special Soundness, HVZK), Schnorr Sigma Protocol & Fiat-Shamir',
    description:
      'عناصر برهان المعرفة الصفرية (البيان والشاهد)، الخصائص الثلاث (الاكتمال، السلامة الخاصة، عدم كشف المعرفة)، بروتوكول سيجما وشنور التفاعلي، تحويل فيات-شامير غير التفاعلي، والتصويت والتحقق من الأهلية.',
    category: 'متقدم',
    difficulty: 'advanced',
    pdfStartPage: 86,
    pdfEndPage: 95,
    diagramKey: 'ise243-8',
    diagramDescription:
      'مخطط بروتوكول سيجما (Σ-Protocol) ذي الحركات الثلاث بين المثبت (Prover) والمدقق (Verifier): 1. الالتزام (Commitment t = g^r)، 2. التحدي (Challenge c)، 3. الاستجابة (Response s = r + c·x) ومعادلة التحقق g^s = t · y^c.',
    videoUrl: 'https://www.youtube.com/watch?v=HusvGeEDU_U',
    videoTitle: 'براهين المعرفة الصفرية ZKP وبروتوكول شنور سيجما وتحويل فيات-شامير',
    videoDuration: '21:55',
    presentationUrl: `${TEXTBOOK_PDF_PATH}#page=86`,
    keyTopics: [
      'البيان المعلن (Statement u = g^α) والشاهد السري (Witness α) ومبدأ تقليل الإفصاح',
      'الخصائص الثلاث لـ ZKP: الاكتمال، السلامة الخاصة (Special Soundness)، وعدم كشف المعرفة (HVZK)',
      'بروتوكول سيجما التفاعلي وشنور (الالتزام u_t ← التحدي c ← الاستجابة α_z)',
      'مستخرج الشاهد (Witness Extractor) ودور المحاكي (Simulator) في إثبات عدم تسرب السر',
      'تحويل فيات-شامير (Fiat-Shamir Heuristic) لبناء البراهين غير التفاعلية (NIZK) وتوقيع شنور',
      'التطبيقات العملية: إثبات الأهلية (العمر/الراتب) بالتفكيك الثنائي والتصويت الإلكتروني النزيه (b^2 = b)',
    ],
    content: `# الفصل الثامن: بروتوكولات المعرفة الصفرية (ZKP) وتطبيقاتها في الخصوصية الرقمية

## 8.1 مفهوم برهان المعرفة الصفرية (Statement & Witness)
يُمكّن **برهان المعرفة الصفرية (Zero-Knowledge Proof - ZKP)** طرفاً يُسمى **المثبت (Prover $P$)** من إقناع طرف آخر يُسمى **المدقق (Verifier $V$)** بأنه يعرف **شاهداً سرياً (Witness $\\alpha$)** يحقق **بياناً معلناً (Statement $u = g^\\alpha \\bmod p$)** دون أن يكشف للمدقق أي معلومة عن قيمة $\\alpha$ نفسها!

## 8.2 الخصائص الرياضية الثلاث لبراهين المعرفة الصفرية
1. **الاكتمال (Completeness):** إذا كان المثبت صادقاً ويملك الشاهد السري $\\alpha$، فإن المدقق الصادق يقبل البرهان دائماً باحتمال $1$.
2. **السلامة الخاصة (Special Soundness):** لا يستطيع مثبت كاذب لا يملك $\\alpha$ إقناع المدقق إلا باحتمال ضئيل جداً؛ ويُثبت ذلك بوجود **مستخرج الشاهد (Witness Extractor)** الذي يستطيع استخراج $\\alpha$ من أي استجابتين مقبولتين $(\\alpha_z, \\alpha_z^{\\prime})$ لنفس الالتزام $u_t$ مع تحديين مختلفين $c \\neq c^{\\prime}$:
   $$\\alpha \\equiv (\\alpha_z - \\alpha_z^{\\prime}) \\cdot (c - c^{\\prime})^{-1} \\pmod q$$
3. **عدم كشف المعرفة (Honest-Verifier Zero-Knowledge - HVZK):** لا يتعلم المدقق أي معلومة عن $\\alpha$؛ ويُبرهن على ذلك بوجود **محاكٍ (Simulator)** يستطيع توليد محادثة مقبولة $(u_t, c, \\alpha_z)$ تبدو مطابقة إحصائياً للمحادثة الحقيقية **دون امتلاك الشاهد السري $\\alpha$** (باختيار $\\alpha_z$ و $c$ أولاً ثم حساب $u_t = g^{\\alpha_z} \\cdot u^{-c}$).

---page---

## 8.3 بروتوكول سيجما (Sigma Protocol) وبروتوكول شنور (Schnorr)
في زمرة دورية رتبتها الأولية $q$ ومولدها $g \\pmod p$، يتكون بروتوكول شنور التفاعلي من **ثلاث رسائل متسلسلة** (شكل الحرف اليوناني $\\Sigma$):
1. **الالتزام (Commitment):** يختار المثبت قيمة عشوائية جديدة $\\alpha_t \\xleftarrow{\\$} \\mathbb{Z}_q$ ويحسب $u_t = g^{\\alpha_t} \\bmod p$ ويرسلها للمدقق.
2. **التحدي (Challenge):** يختار المدقق تحدياً عشوائياً $c \\xleftarrow{\\$} \\mathbb{Z}_q$ ويرسله للمثبت.
3. **الاستجابة (Response):** يحسب المثبت $\\alpha_z \\equiv \\alpha_t + \\alpha \\cdot c \\pmod q$ ويرسلها للمدقق.
- **معادلة التحقق لدى المدقق:** يقبل المدقق البرهان إذا وفقط إذا تحقق:
  $$g^{\\alpha_z} \\stackrel{?}{\\equiv} u_t \\cdot u^c \\pmod p$$

---page---

## 8.4 تحويل فيات-شامير (Fiat-Shamir) والتطبيقات الحديثة
- **تحويل فيات-شامير غير التفاعلي (NIZK & Schnorr Signatures):** يستبدل المدقق التفاعلي بدالة تجزئة تشفيرية تحسب التحدي حتمياً $c = H(u_t \\parallel m)$، فيرسل المثبت الزوج $(u_t, \\alpha_z)$ في رسالة واحدة غير تفاعلية.
- **إثبات الأهلية وتقليل الإفصاح (Range Proofs):** لإثبات أن العمر $\\ge 18$ أو أن الراتب يتجاوز حداً معيناً دون كشف الرقم الدقيق، تُفكك القيمة إلى بتات ثنائية $b_i \\in \\{0, 1\\}$ ويُثبت لكل بت أنه يحقق المعادلة التربيعية:
  $$b_i^2 = b_i \\iff b_i(b_i - 1) = 0 \\iff b_i \\in \\{0, 1\\}$$
  تنمو تكلفة طريقة **التفكيك الثنائي (Binary Decomposition)** لوغاريتمياً $\\mathcal{O}(\\log_2 R)$ مع اتساع المدى، وهي أكفأ بكثير من طريقة كثيرة الحدود الخطية. كما تُستخدم نفس المعادلة $b^2 = b$ في **التصويت الإلكتروني المشفر** لإثبات أن الصوت المشفر هو $0$ أو $1$ فقط دون كشف اختيار الناخب!`,
    images: [
      {
        prompt: 'Zero-knowledge proof sigma protocol, commitment challenge response, 16:9',
        caption: 'بروتوكول سيجما ذو الرسائل الثلاث: الالتزام (Commitment) ← التحدي (Challenge) ← الاستجابة (Response)',
        alt: 'Zero-knowledge proof sigma protocol',
        seed: 81,
        isAIGenerated: true,
      },
      {
        prompt: 'Prover and verifier interactive zero knowledge proof protocol, cryptographic proof, 16:9',
        caption: 'تحويل فيات-شامير وتطبيقات إثبات الأهلية والتصويت الإلكتروني بالمعرفة الصفرية',
        alt: 'Prover and verifier interactive zero knowledge proof protocol',
        seed: 82,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'جوهر المعرفة الصفرية: البيان المعلن والشاهد السري',
        subtitle: 'كيف تثبت أنك تعرف السر دون أن تنطق بحرف منه؟',
        bullets: [
          'البيان المعلن (Statement): القيمة العامة المعروفة للجميع مثل المفتاح العام u = g^α.',
          'الشاهد السري (Witness): القيمة الخاصة α التي يريد المثبت إثبات معرفته بها.',
          'مبدأ تقليل الإفصاح (Data Minimization): إثبات استيفاء الشرط (مثل العمر ≥ 18) دون كشف تاريخ الميلاد.',
          'يشترط في إثبات الأهلية أن تكون البيانات المشفرة موقعة أصلاً من جهة مصدرة موثوقة (كالأحوال المدنية أو البنك).',
        ],
        keyHighlight: 'برهان المعرفة الصفرية يفصل بين «التحقق من صحة المعلومة» وبين «الاطلاع على المعلومة نفسها».',
        diagramTitle: 'العلاقة بين المثبت والمدقق والبيان والشاهد',
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'الأركان الثلاثة لبرهان المعرفة الصفرية',
        subtitle: 'الاكتمال، السلامة الخاصة، وعدم كشف المعرفة',
        bullets: [
          'الاكتمال (Completeness): المثبت الصادق يقنع المدقق الصادق دائماً.',
          'السلامة الخاصة (Special Soundness): مستخرج الشاهد يستخرج السر من استجابتين لنفس الالتزام.',
          'عدم كشف المعرفة (Zero-Knowledge): المحاكي (Simulator) يولد محادثات مطابقة دون امتلاك السر.',
          'وجود المحاكي يبرهن رياضياً أن المدقق لا يكتسب أي معلومة جديدة من المحادثة.',
        ],
        keyHighlight: 'المحاكي (Simulator) يعمل بعكس الترتيب الزمني: يختار الاستجابة والتحدي أولاً ثم يحسب الالتزام!',
        diagramTitle: 'الخصائص الثلاث ودور المحاكي ومستخرج الشاهد',
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'بروتوكول سيجما التفاعلي وبروتوكول شنور (Schnorr)',
        subtitle: 'الحركات الثلاث: الالتزام u_t ← التحدي c ← الاستجابة α_z',
        bullets: [
          'الرسالة 1 (الالتزام): يختار المثبت α_t عشوائياً ويرسل u_t = g^(α_t) mod p.',
          'الرسالة 2 (التحدي): يرسل المدقق تحدياً عشوائياً c من Z_q.',
          'الرسالة 3 (الاستجابة): يحسب المثبت α_z = α_t + α·c (mod q) ويرسلها.',
          'التحقق: يتأكد المدقق من تطابق g^(α_z) مع u_t · u^c (mod p).',
        ],
        keyHighlight: 'إعادة استخدام نفس الالتزام u_t مع تحديين مختلفين تمكّن المدقق من تشغيل مستخرج الشاهد وكشف α فوراً!',
        diagramTitle: 'تطبيق بروتوكول شنور بالأرقام على (p=23, q=11, g=2)',
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'تحويل فيات-شامير (Fiat-Shamir) وتوقيع شنور',
        subtitle: 'تحويل البرهان التفاعلي إلى رسالة واحدة غير تفاعلية (NIZK)',
        bullets: [
          'البروتوكول التفاعلي يتطلب اتصالاً مباشراً ومتزامناً بين المثبت والمدقق.',
          'يستبدل تحويل فيات-شامير المدقق بدالة تجزئة تشفيرية تولد التحدي: c = H(u_t || m).',
          'بما أن المثبت لا يستطيع التنبؤ بمخرج دالة التجزئة قبل تثبيت u_t، يظل البرهان آمناً.',
          'النتيجة هي توقيع شنور الرقمي المدمج أو برهان NIZK يُنشر علناً ويتحقق منه أي شخص.',
        ],
        keyHighlight: 'دالة التجزئة في تحويل فيات-شامير تلعب دور المدقق النزيه الذي يصدر تحدياً لا يمكن التلاعب به.',
        diagramTitle: 'التحول من بروتوكول سيجما التفاعلي إلى NIZK بفيات-شامير',
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'التطبيقات: إثبات النطاق بالتفكيك الثنائي والتصويت الإلكتروني',
        subtitle: 'كيف نثبت أن الصوت الانتخابي 0 أو 1 دون كشفه؟',
        bullets: [
          'في التصويت المتجانس، قد يحاول ناخب غشاش تشفير الرقم 100 بدلاً من 1 لتضخيم الأصوات.',
          'يُلزم الناخب بإرفاق برهان ZKP يثبت أن صوته b يحقق المعادلة b^2 = b (أي 0 أو 1 فقط).',
          'في إثبات الراتب أو العمر ضمن مدى كبير، نستخدم التفكيك الثنائي للرقم إلى بتات وإثبات كل بت.',
          'تنمو تكلفة التفكيك الثنائي لوغاريتمياً O(log R) بدلاً من النمو الخطي المكلف.',
        ],
        keyHighlight: 'الدمج بين التشفير المتجانس (لجمع الأصوات) و ZKP (لإثبات صحة كل صوت) يصنع تصويتاً إلكترونياً نزيهاً وسرياً.',
        diagramTitle: 'إثبات صحة الصوت الانتخابي b^2 = b والتفكيك الثنائي للنطاق',
      },
    ],
    flashcards: [
      {
        front: 'ما هي الرسائل الثلاث المتسلسلة في بروتوكول سيجما (Sigma Protocol)؟',
        back: '1. الالتزام (Commitment) من المثبت إلى المدقق، 2. التحدي (Challenge) من المدقق إلى المثبت، 3. الاستجابة (Response) من المثبت إلى المدقق.',
        category: 'بروتوكول سيجما',
      },
      {
        front: 'ما هي وظيفة المحاكي (Simulator) في برهان المعرفة الصفرية؟',
        back: 'توليد محادثات مقبولة إحصائياً تبدو مطابقة للمحادثات الحقيقية دون معرفة الشاهد السري، مما يبرهن رياضياً أن المحادثة لا تسرب أي معلومة عن السر.',
        category: 'خصائص ZKP',
      },
      {
        front: 'كيف يعمل مستخرج الشاهد (Witness Extractor) إذا أعاد المثبت استخدام نفس الالتزام u_t مرتين؟',
        back: 'يطرح الاستجابتين α_z و α_z\' ويقسم على فرق التحديين: α = (α_z - α_z\') / (c - c\') mod q، فيستخرج الشاهد السري فوراً.',
        category: 'خصائص ZKP',
      },
      {
        front: 'كيف يحول تحويل فيات-شامير (Fiat-Shamir) بروتوكول سيجما إلى برهان غير تفاعلي؟',
        back: 'يستبدل تحدي المدقق العشوائي بدالة تجزئة تشفيرية تحسب التحدي حتمياً من الالتزام والرسالة c = H(u_t || m).',
        category: 'فيات-شامير',
      },
      {
        front: 'ما المعادلة الرياضية المستخدمة في ZKP لإثبات أن قيمة مشفرة b هي بت ثنائي صالح (0 أو 1 فقط)؟',
        back: 'المعادلة التربيعية b^2 = b (أو b(b - 1) = 0)، لأن حلولها الوحيدة في الحقل هي 0 و 1.',
        category: 'تطبيقات ZKP',
      },
      {
        front: 'لماذا نفضل طريقة التفكيك الثنائي على طريقة كثيرة الحدود عند إثبات وقوع قيمة في مدى واسع؟',
        back: 'لأن تكلفة البرهان في التفكيك الثنائي تنمو لوغاريتمياً بعدد البتات O(log_2 R)، بينما تنمو خطياً مع حجم المدى في طريقة كثيرة الحدود.',
        category: 'أداء البراهين',
      },
    ],
    miniQuiz: [
      {
        question: 'في بروتوكول شنور على الزمرة (p = 23, q = 11, g = 2)، إذا كان الشاهد السري α = 7 والالتزام العشوائي α_t = 3 والتحدي c = 4، فكم تساوي الاستجابة α_z = α_t + α·c (mod 11)؟',
        options: ['3', '7', '9', '10'],
        correctIndex: 2,
        explanation:
          'نحسب α_z = 3 + (7 × 4) = 3 + 28 = 31، وباقي قسمة 31 على 11 هو 9 (لأن 31 = 2×11 + 9).',
      },
      {
        question: 'ما المعادلة الجبرية التي تُستخدم في طريقة التفكيك الثنائي والتصويت الإلكتروني لإثبات أن كل بت مشفر يساوي 0 أو 1 فقط؟',
        options: ['b_i + 1 = 0', 'b_i^2 = b_i', 'b_i^3 = 2', '2^(b_i) = 0'],
        correctIndex: 1,
        explanation:
          'المعادلة b^2 = b لا يتحقق تساوي طرفيها إلا إذا كان b = 0 أو b = 1، مما يمنع الناخب من تشفير أعداد أكبر لتزوير الجمع المتجانس.',
      },
      {
        question: 'ما الذي يحل محل المدقق التفاعلي لتوليد التحدي c في تحويل فيات-شامير (Fiat-Shamir Heuristic)؟',
        options: [
          'دالة تجزئة تشفيرية (Cryptographic Hash Function) تطبق على الالتزام والرسالة',
          'مولد أرقام ثابت يصدر الرقم 1 دائماً',
          'خادم قاعدة البيانات',
          'ترويسة HSTS',
        ],
        correctIndex: 0,
        explanation:
          'يُحسب التحدي ذاتياً عبر c = H(u_t || m)، وبما أن دالة التجزئة لا يمكن التنبؤ بمخرجها قبل اختيار u_t، فإنها تقوم مقام المدقق النزيه.',
      },
      {
        question: 'أي خاصية من خصائص برهان المعرفة الصفرية تضمن عدم قدرة مثبت كاذب (لا يملك الشاهد السري) على خداع المدقق؟',
        options: [
          'الاكتمال (Completeness)',
          'السلامة / السلامة الخاصة (Soundness / Special Soundness)',
          'تمدد النص المشفر',
          'السرية الأمامية',
        ],
        correctIndex: 1,
        explanation:
          'خاصية السلامة (Soundness) تضمن أن أي مثبت ينجح في الإجابة على تحديات متعددة لنفس الالتزام لا بد أنه يملك الشاهد السري (ببرهان مستخرج الشاهد).',
      },
    ],
    richData: {
      id: 8,
      chapter_number: 8,
      title: 'بروتوكولات المعرفة الصفرية (ZKP) وتطبيقاتها الحديثة في حماية الخصوصية الرقمية',
      subtitle: 'Sigma Protocols, Schnorr Identification, Fiat-Shamir & Eligibility Verification',
      category: 'متقدم',
      pdfStartPage: 86,
      pdfEndPage: 95,
      description:
        'عناصر برهان المعرفة الصفرية (البيان والشاهد)، الخصائص الثلاث (الاكتمال، السلامة الخاصة، عدم كشف المعرفة)، بروتوكول سيجما وشنور، تحويل فيات-شامير، والتصويت والتحقق من العمر.',
      objectives: [
        'التمييز بين البيان المعلن (Statement) والشاهد السري (Witness) وخصائص البرهان الثلاث.',
        'تتبع وتنفيذ رسائل بروتوكول سيجما التفاعلي (الالتزام، التحدي، الاستجابة) وبروتوكول شنور.',
        'تطبيق مستخرج الشاهد (Witness Extractor) ودور المحاكي (Simulator).',
        'تحويل البروتوكول التفاعلي إلى غير تفاعلي بتحويل فيات-شامير وتطبيقه في التحقق من الأهلية والتصويت الإلكتروني.',
      ],
      sections: [
        {
          heading: '8.2 و 8.3 مفهوم وخصائص برهان المعرفة الصفرية',
          content:
            'يمكّن ZKP المثبت (Prover) من إقناع المدقق (Verifier) بمعرفة شاهد سري α يحقق بياناً معلناً u = g^α دون كشف α. ويشترط تحقيق 3 خصائص: (1) الاكتمال (Completeness)، (2) السلامة الخاصة (Special Soundness) بوجود مستخرج الشاهد من استجابتين لنفس الالتزام، (3) عدم كشف المعرفة (HVZK) بوجود المحاكي (Simulator).',
        },
        {
          heading: '8.4 البروتوكول التفاعلي: بروتوكول سيجما وشنور',
          content:
            'يتكون بروتوكول سيجما (Σ) من 3 رسائل: (1) الالتزام u_t = g^(α_t) mod p، (2) التحدي العشوائي c من المدقق، (3) الاستجابة α_z = α_t + α·c mod q. يقبل المدقق المحادثة إذا تحقق g^(α_z) ≡ u_t · u^c (mod p).',
          formula: 'g^(α_z) ≡ u_t · u^c (mod p),   حيث α_z = α_t + α·c (mod q)',
        },
        {
          heading: '8.5 البروتوكول غير التفاعلي وتحويل فيات-شامير',
          content:
            'يستبدل تحويل فيات-شامير (Fiat-Shamir) المدقق بدالة تجزئة تولد التحدي حتمياً c = H(t || m)، مما ينتج برهاناً غير تفاعلي أو توقيع شنور الرقمي (t, z) الذي يمكن لأي طرف التحقق منه لاحقاً.',
        },
        {
          heading: '8.6 و 8.7 التحقق من الأهلية والتصويت الإلكتروني وتكلفة البرهان',
          content:
            'يحقق ZKP مبدأ تقليل الإفصاح (Reducing Disclosure) مثل إثبات أن العمر ≥ 18 عاماً أو أن الراتب يتجاوز حداً معيناً دون كشف القيمة الدقيقة. وللمدى الواسع تُستخدم طريقة التفكيك الثنائي (b_i² = b_i) لتنمو التكلفة لوغاريتمياً بدلاً من طريقة كثيرة الحدود الخطية.',
        },
      ],
      tables: [
        {
          title: 'جدول 8.1: مقارنة بين الإفصاح الكامل وإثبات الأهلية بالمعرفة الصفرية (سيناريو راتب عميل)',
          headers: ['المعيار', 'الإفصاح الكامل (كشف الراتب)', 'إثبات الأهلية بالمعرفة الصفرية (ZKP)'],
          rows: [
            ['حساسية البيانات', 'تُكشف القيمة الأصلية للراتب كاملة للشركة', 'تُكشف صحة الخاصية فقط (تجاوز الحد المطلوب)'],
            ['موثوقية المصدر', 'المستند يُقرأ مباشرة', 'يُشترط أن يكون النص المشفر صادراً وموقعاً عن جهة موثوقة (البنك)'],
            ['تكلفة البرهان', 'لا توجد تكلفة حسابية إضافية', 'تنمو لوغاريتمياً بطريقة التفكيك الثنائي للمدى الكبير'],
            ['الثقة بالمتحقق', 'يجب أن تكون الشركة مؤتمنة تماماً على البيانات', 'لا تحتاج الشركة للاطلاع على البيانات لتثق بالنتيجة'],
          ],
        },
      ],
      commonMistake: {
        mistake:
          'إعادة استخدام القيمة العشوائية α_t (الالتزام u_t) مع تحديين مختلفين في بروتوكول شنور، أو استخدام طريقة كثيرة الحدود لمدى قيم واسع جداً.',
        fix: 'توليد التزام عشوائي جديد لكل إثبات، واستخدام طريقة التفكيك الثنائي (Binary Decomposition) للمدى الواسع.',
      },
      solvedExample: {
        title: 'تطبيق بروتوكول شنور ومستخرج الشاهد على الزمرة التعليمية (p = 23, q = 11, g = 2)',
        given:
          'المثبت يملك الشاهد السري α = 7، والبيان المعلن u = 2⁷ mod 23 = 13. اختار الالتزام العشوائي α_t = 3.',
        steps: [
          '1. الالتزام: يحسب المثبت u_t = 2³ mod 23 = 8 ويرسله للمدقق.',
          '2. التحدي: يختار المدقق التحدي c = 4 ويرسله للمثبت.',
          '3. الاستجابة: يحسب المثبت α_z = 3 + (7 × 4) = 31 ≡ 9 (mod 11) ويرسل 9.',
          '4. التحقق: يحسب المدقق الطرف الأيسر 2⁹ mod 23 = 512 mod 23 = 6، والطرف الأيمن 8 × 13⁴ mod 23 = 8 × 18 = 144 ≡ 6 (mod 23). الطرفان متساويان فيقبل!',
          "5. استخراج الشاهد عند إعادة استخدام الالتزام: لو أجاب المثبت على تحدٍ ثانٍ c' = 3 باستجابة α_z' = 2، يحسب المستخرج α = (9 - 2)/(4 - 3) = 7.",
        ],
        result: 'قبول البرهان دون كشف α = 7، وإثبات كيف يكشف مستخرج الشاهد السر لو تكرر الالتزام.',
        whyItMatters: 'يجسد الأساس الرياضي لبروتوكولات سيجما وتوقيع شنور وأهمية عشوائية الالتزام.',
      },
      flashcards: [
        {
          front: 'ما هي وظيفة المحاكي (Simulator) في برهان المعرفة الصفرية؟',
          back: 'توليد محادثات مقبولة تبدو مطابقة للمحادثات الحقيقية دون امتلاك الشاهد السري، مما يثبت أن المحادثة لا تسرب أي معلومة عن السر.',
        },
        {
          front: 'كيف يمنع برهان المعرفة الصفرية الغش في التصويت الإلكتروني المشفر؟',
          back: 'يرفق كل ناخب مع صوته المشفر برهاناً غير تفاعلي يثبت أن قيمة الصوت تنتمي للمجموعة {0, 1} (عبر b² = b) دون كشف اختياره.',
        },
      ],
      selfAssessment: [
        {
          question: 'عدّد رسائل بروتوكول سيجما الثلاث بترتيبها.',
          answer: '1. الالتزام (من المثبت)، 2. التحدي (من المدقق)، 3. الاستجابة (من المثبت).',
        },
        {
          question: 'علّل: دالة التجزئة تحل محل المدقق في تحويل فيات-شامير.',
          answer:
            'لأن ناتج دالة التجزئة عشوائي المظهر ولا يمكن التنبؤ به قبل حساب الالتزام، مما يمنع المثبت من التلاعب بالتحدي في غياب المدقق.',
        },
      ],
      quiz: [
        {
          question: 'ما المعادلة التي تستخدم في طريقة التفكيك الثنائي لإثبات أن كل بت مشفر يساوي 0 أو 1؟',
          options: ['b_i + 1 = 0', 'b_i² = b_i', 'b_i³ = 1', '2^b_i = 1'],
          correctIndex: 1,
          explanation: 'حلول المعادلة b² = b هي فقط 0 و 1، مما يثبت أن القيمة المشفرة هي بت ثنائي صالح.',
        },
      ],
    },
    interactiveBook3D: {
      model3DType: 'schnorr-sigma-vault',
      shaderEffect: 'emerald-zkp-prism',
      sceneTitle: 'مجسم مثلث بروتوكول سيجما (Σ) وبوابة المعرفة الصفرية لشنور',
      sceneDescription:
        'منشور ثلاثي الأبعاد يربط المثبت (Prover) والمدقق (Verifier) عبر الحركات الثلاث (الالتزام u_t، التحدي c، الاستجابة α_z)، مع محاكي المحادثة ومستخرج الشاهد.',
      cameraPosition: { x: 0, y: 2.3, z: 6.7 },
      pages3D: [
        {
          pageNumber: 1,
          title: 'بروتوكول شنور التفاعلي ذو الحركات الثلاث (Σ)',
          subtitle: 'إثبات معرفة اللوغاريتم المتقطع α دون البوح به',
          narrative:
            'يخفي المثبت شاهده السري α خلف قناع عشوائي مؤقت α_t في معادلة خطية بترديد q، بينما يتحقق المدقق في الأسس بترديد p.',
          equation: 'u_t = g^{\\alpha_t} \\bmod p \\xrightarrow{c} \\alpha_z = \\alpha_t + \\alpha c \\bmod q \\implies g^{\\alpha_z} \\equiv u_t \\cdot u^c \\pmod p',
          liveGraphicType: 'zkp-schnorr-sigma',
          liveGraphicCaption: 'محاكاة حية لبروتوكول شنور على الزمرة (p=23, q=11, g=2, α=7)',
          visualNotes: [
            'الطرف الأيسر 2^9 mod 23 = 6 يطابق الطرف الأيمن 8 × 13^4 mod 23 = 6.',
            'قيمة α_t تعمل كقناع لمرة واحدة (One-time pad) يخفي α·c.',
          ],
        },
        {
          pageNumber: 2,
          title: 'المحاكي (Simulator) ومستخرج الشاهد (Witness Extractor)',
          subtitle: 'البرهان الرياضي على عدم كشف المعرفة والسلامة الخاصة',
          narrative:
            'يثبت المحاكي أن المحادثة لا تسرب شيئاً بتوليدها عكسياً بدون α، بينما يعاقب مستخرج الشاهد أي إعادة استخدام للالتزام باستخراج α فوراً.',
          equation: '\\text{Sim}: u_t = g^{\\alpha_z} u^{-c} \\pmod p, \\qquad \\text{Ext}: \\alpha = \\frac{\\alpha_z - \\alpha^{\\prime}_z}{c - c^{\\prime}} \\pmod q',
          liveGraphicType: 'zkp-schnorr-sigma',
          liveGraphicCaption: 'مقارنة مسار المحاكي العكسي ومسار مستخرج الشاهد',
          visualNotes: [
            'توزيع (u_t, c, α_z) في المحاكي مطابق تماماً للبروتوكول الحقيقي.',
            'استجابتان لنفس الالتزام تكشفان الشاهد السري.',
          ],
        },
        {
          pageNumber: 3,
          title: 'تحويل فيات-شامير وإثبات الأهلية والتصويت (b^2 = b)',
          subtitle: 'من التفاعل الحي إلى الشهادات الرقمية الحافظة للخصوصية',
          narrative:
            'تحل دالة التجزئة c = H(u_t || m) محل المدقق، وتُستخدم معادلة البت الثنائي b^2 = b لإثبات صحة الصوت الانتخابي أو تفكيك مدى العمر والراتب لوغاريتمياً.',
          equation: 'c = H(u_t \\parallel m), \\quad b_i^2 - b_i = 0 \\implies b_i \\in \\{0, 1\\}',
          liveGraphicType: 'zkp-schnorr-sigma',
          liveGraphicCaption: 'بوابة التحقق من الأهلية (العمر ≥ 18) دون كشف تاريخ الميلاد',
          visualNotes: [
            'التفكيك الثنائي يختصر تكلفة إثبات النطاق إلى O(log R).',
            'توقيع شنور يعتمد مباشرة على تحويل فيات-شامير.',
          ],
        },
      ],
      stepByStep: [
        {
          step: 1,
          title: 'إرسال الالتزام العشوائي (Commitment u_t = 8)',
          description:
            'يختار المثبت α_t = 3 عشوائياً ويحسب u_t = 2^3 mod 23 = 8 ويرسله للمدقق.',
          formula: 'u_t = g^{\\alpha_t} \\bmod p = 2^3 \\bmod 23 = 8',
          visualState: 'انطلاق شعاع الالتزام الكهرماني من منصة المثبت إلى المدقق.',
          securityNote: 'يجب توليد α_t جديد في كل مرة وعدم تكراره أبداً.',
        },
        {
          step: 2,
          title: 'إصدار التحدي العشوائي (Challenge c = 4)',
          description:
            'يرد المدقق (أو دالة التجزئة في فيات-شامير) بالتحدي c = 4.',
          formula: 'c \\xleftarrow{\\$} \\mathbb{Z}_{11} \\implies c = 4',
          visualState: 'ارتداد شعاع التحدي الأزرق من المدقق نحو المثبت.',
          securityNote: 'لا يعرف المثبت قيمة c إلا بعد أن يكون قد التزم بـ u_t.',
        },
        {
          step: 3,
          title: 'حساب وإرسال الاستجابة المقنّعة (Response α_z = 9)',
          description:
            'يدمج المثبت الشاهد السري α = 7 مع التحدي والالتزام: α_z = 3 + 7×4 = 31 ≡ 9 (mod 11).',
          formula: '\\alpha_z = \\alpha_t + \\alpha \\cdot c \\bmod q = 3 + 28 \\equiv 9 \\pmod{11}',
          visualState: 'انطلاق شعاع الاستجابة الزمردي لإغلاق مثلث سيجما.',
          securityNote: 'القيمة α_z لا تكشف α لأن α_t مجهول وعشوائي للمدقق.',
        },
        {
          step: 4,
          title: 'تحقق المدقق من تطابق المعادلة الأسية (6 = 6)',
          description:
            'يتحقق المدقق من أن 2^9 mod 23 = 6 يساوي 8 × 13^4 mod 23 = 6 دون معرفة α = 7.',
          formula: '2^9 \\bmod 23 = 6 \\;\\stackrel{\\checkmark}{=}\\; 8 \\times 13^4 \\bmod 23 = 6',
          visualState: 'توهج قفل التحقق باللون الأخضر الزمردي وتأكيد الأهلية.',
          securityNote: 'اكتمل البرهان بصفر معلومات مسربة عن قيمة الشاهد السري.',
        },
      ],
      hotspots: [
        {
          id: 'zkp-commitment-node',
          label: 'عقدة الالتزام (Commitment u_t)',
          coordinates: { x: -1.8, y: 1.2, z: 0.8 },
          color: '#f59e0b',
          title: 'القناع العشوائي المانع لتسرب الشاهد',
          detailedExplanation:
            'تثبّت القيمة العشوائية α_t قبل معرفة التحدي، وتعمل كغطاء تشفيري يمنع المدقق من استخراج α من معادلة الاستجابة.',
          relatedEquation: 'u_t = g^{\\alpha_t} \\bmod p',
          securityImpact: 'حجر الزاوية في خاصية عدم كشف المعرفة (Zero-Knowledge).',
        },
        {
          id: 'zkp-fiat-shamir-lens',
          label: 'عدسة فيات-شامير c = H(u_t || m)',
          coordinates: { x: 0.0, y: 1.5, z: 1.0 },
          color: '#3b82f6',
          title: 'تحويل البرهان التفاعلي إلى توقيع غير تفاعلي',
          detailedExplanation:
            'تستبدل المدقق البشري بدالة تجزئة تشفيرية تربط الالتزام بالرسالة، مما ينتج برهاناً ذا خطوة واحدة يصلح للبلوك تشين والتواقيع.',
          relatedEquation: 'c = \\text{SHA256}(u_t \\parallel u \\parallel m)',
          securityImpact: 'يمنع المثبت من اختيار التحدي الذي يناسبه مسبقاً.',
        },
        {
          id: 'zkp-witness-extractor',
          label: 'مِسبار مستخرج الشاهد (Extractor)',
          coordinates: { x: 1.8, y: 0.9, z: 0.8 },
          color: '#ef4444',
          title: 'برهان السلامة الخاصة وكشف الغش',
          detailedExplanation:
            'آلية رياضية تبرهن أنه لا يمكن الإجابة على تحديين مختلفين لنفس الالتزام إلا لمن يملك الشاهد السري فعلياً.',
          relatedEquation: '\\alpha = (\\alpha_z - \\alpha^{\\prime}_z)(c - c^{\\prime})^{-1} \\bmod q',
          securityImpact: 'يضمن استحالة تزوير البرهان باحتمال يتجاوز 1/q.',
        },
        {
          id: 'zkp-binary-range-gate',
          label: 'بوابة التفكيك الثنائي (b_i^2 = b_i)',
          coordinates: { x: 0.0, y: -1.4, z: 1.1 },
          color: '#10b981',
          title: 'إثبات النطاق والأهلية بتكلفة لوغاريتمية',
          detailedExplanation:
            'تفكك القيمة السرية (الراتب أو العمر أو الصوت الانتخابي) إلى بتات ثنائية وتثبت أن كل بت هو 0 أو 1 دون كشف القيمة.',
          relatedEquation: '\\forall i \\in [0, k-1]:\\; b_i(b_i - 1) = 0',
          securityImpact: 'يتيح التحقق من الأهلية والتصويت الإلكتروني النزيه مع حفظ الخصوصية الكاملة.',
        },
      ],
    },
    updated_at: 1730937600000,
  },

  // =========================================================================
  // الفصل التاسع: الإدارة المتقدمة للمفاتيح التشفيرية ووحدات الأمن المادية (HSM & FIPS 140-3)
  // =========================================================================
  {
    id: 9,
    chapter_number: 9,
    title: 'الإدارة المتقدمة للمفاتيح التشفيرية ووحدات الأمن المادية (HSM & FIPS 140-3)',
    subtitle: 'Enterprise Key Lifecycle, Separation of Duties, Dual Control, HSM Tamper Resistance & Memory Remanence',
    description:
      'حوكمة وسياسة المفاتيح، مراحل دورة حياة المفتاح، فصل المهام والسيطرة المشتركة، ومعمارية وحدات أمن العتاد (HSM) ومقاومة العبث المادي وبقايا الذاكرة ومعيار FIPS 140-3.',
    category: 'مؤسسي',
    difficulty: 'advanced',
    pdfStartPage: 96,
    pdfEndPage: 107,
    diagramKey: 'ise243-9',
    diagramDescription:
      'مخطط دائري لمراحل دورة حياة المفتاح التشفيري (التوليد، التوزيع، التخزين والاستخدام، التدوير، الإتلاف) مع الحدثين الاستثنائيين: التعليق المؤقت (Suspension) والإبطال النهائي (Revocation).',
    videoUrl: 'https://www.youtube.com/watch?v=1nUCsQOZPmE',
    videoTitle: 'الإدارة المؤسسية للمفاتيح ووحدات أمن العتاد HSM ومعيار FIPS 140-3',
    videoDuration: '20:05',
    presentationUrl: `${TEXTBOOK_PDF_PATH}#page=96`,
    keyTopics: [
      'دورة حياة المفتاح التشفيري (التوليد، التوزيع، الاستخدام، التدوير، الإتلاف)',
      'الفرق الدقيق بين تعليق المفتاح المؤقت (Suspension) وإبطاله النهائي (Revocation)',
      'حوكمة العمليات الحرجة: فصل المهام (Separation of Duties) والسيطرة المشتركة (Shared/Dual Control)',
      'معمارية وحدات أمن العتاد (HSM) والحدود المادية للتشفير وفق FIPS 140-3 (المستوى 4)',
      'طبقات مقاومة العبث المادي (أغشية الاستشعار، الإيبوكسي، حساسات الضوء والحرارة) والتصفير الفوري (Zeroization)',
      'ظاهرة بقايا الذاكرة (Memory Remanence) في SRAM وهجمات التمهيد البارد (Cold Boot تحت -20°C) وجدار حماية أوامر API',
    ],
    content: `# الفصل التاسع: إدارة المفاتيح المتقدمة في المؤسسات الكبيرة واستخدام أجهزة (HSM)

## 9.1 دورة حياة المفتاح التشفيري والأحداث الاستثنائية
تمر المفاتيح في المؤسسات بست مراحل منظمة: **التوليد (Generation) ← التوزيع (Distribution) ← التخزين (Storage) ← التفعيل والاستخدام (Usage) ← التدوير (Rotation) ← الإتلاف الآمن (Destruction)**.
وقد يطرأ أثناء الخدمة حدثان استثنائيان يجب التمييز بينهما بدقة:
- **التعليق المؤقت (Suspension):** إخراج المفتاح من الخدمة مؤقتاً **مع بقاء الثقة به وإمكانية إعادته للتفعيل لاحقاً** (مثال: تعليق مفتاح جهاز تشفير أثناء دخوله للصيانة الدورية).
- **الإبطال النهائي (Revocation):** إسقاط الثقة بالمفتاح **نهائياً ولا رجعة فيه** قبل انتهاء صلاحيته بسبب الاشتباه بانكشافه، مع إبلاغ جميع الأنظمة عبر قوائم CRL أو بروتوكول OCSP.

---page---

## 9.2 فصل المهام (Separation of Duties) والسيطرة المشتركة (Dual Control)
لمنع الفساد أو الخطأ البشري أو تهديد المطلعين من الداخل (Insider Threat)، تُطبَّق ضوابط حوكمة صارمة على العمليات الحرجة:
- **فصل المهام (Separation of Duties):** لا يجوز لشخص واحد أن يجمع بين أدوار **الطلب، والموافقة، والتنفيذ التشغيلي، والتدقيق**.
- **السيطرة المشتركة (Shared / Dual Control):** تقسيم المفتاح الرئيس إلى مكونين أو حصص عتبة $(k, n)$ لدى أمناء تشفير مختلفين بحيث لا يعمل المفتاح الرئيس أو تُستعاد النسخ الاحتياطية إلا بحضور **مسؤول التشفير (أ) ومسؤول التشفير (ب) معاً**.

| العملية الحرجة | جهة الطلب | جهة الموافقة | التشغيل التنفيذي | المراجعة والتدقيق |
| :--- | :--- | :--- | :--- | :--- |
| **توليد مفتاح رئيس (Master Key)** | مسؤول النظام | مدير أمن المعلومات | مسؤول تشفير (أ) + مسؤول تشفير (ب) معاً | المدقق الداخلي |
| **تدوير مفتاح بيانات (DEK)** | مسؤول النظام | مدير أمن المعلومات | مسؤول تشفير (أ) | المدقق الداخلي |
| **الاستعادة من النسخ الاحتياطي** | مسؤول النظام | مدير أمن المعلومات | مسؤول تشفير (أ) + مسؤول تشفير (ب) معاً | المدقق الداخلي |

---page---

## 9.3 وحدات أمن العتاد (HSM) ومقاومة العبث وبقايا الذاكرة
تُقيَّم وحدات أمن العتاد (مثل IBM 4758 والمصارف) أمام **ثلاث فئات من المهاجمين**: (1) الغرباء الأذكياء، (2) المطلعون من الداخل، (3) المنظمات الممولة ذات المختبرات المتقدمة.
- **مقاومة العبث والاستجابة له (Tamper Resistance & Response — FIPS 140-3 Level 4):** تحاط النواة التشفيرية بشبكة أسلاك استشعار دقيقة مغمورة في الإيبوكسي، ومفاتيح غطاء، وخلايا ضوئية، وحساسات ميل وحرارة. عند رصد أي اختراق، تنفذ الوحدة **تصفيراً ومحوًا فورياً (Zeroization)** لذاكرة **SRAM** التي تحوي المفتاح الرئيس في أجزاء من الميكروثانية!
- **ظاهرة بقايا الذاكرة (Memory Remanence) وهجوم التمهيد البارد:** تحتفظ ذاكرة SRAM بشحناتها لثوانٍ أو دقائق إذا جُمِّدت الشريحة لدرجات حرارة منخفضة جداً (**تحت $-20^\\circ\\text{C}$** باستخدام النيتروجين السائل). لذلك تزود وحدات HSM بحساسات انخفاض الحرارة التي تصفر الذاكرة فوراً قبل تجمدها، مع وضع **جدار حماية برمجي (API Firewall)** يقيد الأوامر المسموح إرسالها للوحدة.`,
    images: [
      {
        prompt: 'HSM hardware security module, tamper resistant, key lifecycle, 16:9',
        caption: 'معمارية وحدة أمن العتاد HSM المقاومة للعبث ودورة حياة المفاتيح المؤسسية',
        alt: 'HSM hardware security module tamper resistant',
        seed: 91,
        isAIGenerated: true,
      },
      {
        prompt: 'FIPS 140 physical cryptographic boundary and secure key generation appliance, 16:9',
        caption: 'الحدود المادية للتشفير وفق معيار FIPS 140-3 وآلية التصفير الفوري Zeroization',
        alt: 'FIPS 140 physical cryptographic boundary',
        seed: 92,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'دورة حياة المفتاح: من التوليد إلى الإتلاف الآمن',
        subtitle: 'المراحل الست والأحداث الاستثنائية (التعليق والإبطال)',
        bullets: [
          'المراحل القياسية: التوليد ← التوزيع ← التخزين ← الاستخدام ← التدوير ← الإتلاف.',
          'التعليق المؤقت (Suspension): إيقاف مؤقت مع بقاء الثقة وإمكانية إعادة التفعيل (مثل فترة الصيانة).',
          'الإبطال النهائي (Revocation): إسقاط الثقة نهائياً عند الاشتباه بتسرب المفتاح وإبلاغ الأطراف.',
          'يحظر تسجيل قيم المفاتيح في سجلات التدقيق؛ تُسجل العمليات وهويات المنفذين والطوابع الزمنية فقط.',
        ],
        keyHighlight: 'الفرق الحاسم: المفتاح المعلّق يمكن إعادته للخدمة بعد زوال السبب، أما المفتاح المبطل فلا يعود أبداً.',
        diagramTitle: 'مخطط حالات دورة حياة المفتاح التشفيري',
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'فصل المهام (SoD) والسيطرة المشتركة (Dual Control)',
        subtitle: 'كيف نحمي المفتاح الرئيس من خطأ أو خيانة الموظف الواحد؟',
        bullets: [
          'فصل المهام يمنع اجتماع صلاحيات الطلب والموافقة والتنفيذ والتدقيق في يد شخص واحد.',
          'السيطرة المشتركة تشترط حضور أمينين مختلفين على الأقل لتشغيل المفتاح الرئيس أو استعادة النسخ.',
          'تسليم مكوني المفتاح الرئيس لمهندس واحد «توفيراً للوقت» يسقط ضابط السيطرة المشتركة بالكامل.',
          'المدقق الداخلي يراجع السجلات مستقلاً دون أن يمتلك صلاحية تشغيلية على المفاتيح.',
        ],
        keyHighlight: 'لا قيمة لأقوى خوارزمية تشفير إذا كان موظف واحد يستطيع توليد أو نسخ المفتاح الرئيس بمفرده.',
        diagramTitle: 'مصفوفة فصل المهام الرباعية للعمليات الحرجة',
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'وحدات أمن العتاد (HSM) ومعيار FIPS 140-3',
        subtitle: 'لماذا لا تكفي أنظمة التشغيل التجارية لحفظ مفاتيح المصارف؟',
        bullets: [
          'أنظمة التشغيل العادية معرضة للبرمجيات الخبيثة وتسمح لمديري النظام بقراءة الذاكرة.',
          'وحدة HSM جهاز فيزيائي معزول يولد المفاتيح وينفذ التشفير داخله دون أن تغادره المفاتيح صريحة.',
          'يُصنف المهاجمون إلى: غرباء أذكياء (فئة 1)، مطلعين من الداخل (فئة 2)، ومنظمات ممولة (فئة 3).',
          'المستوى الرابع من FIPS 140-3 يوفر غلافاً نشطاً يكشف أي محاولة اختراق من جميع الاتجاهات.',
        ],
        keyHighlight: 'المفتاح الرئيس (Master Key) يولد ويعيش ويموت داخل حدود HSM ولا يظهر في ذاكرة الخادم أبداً.',
        diagramTitle: 'معمارية العزل بين الخادم ووحدة HSM',
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'مقاومة العبث المادي وبقايا الذاكرة (Memory Remanence)',
        subtitle: 'التصفير الفوري (Zeroization) وإحباط هجمات التبريد بالنيتروجين',
        bullets: [
          'تحاط شريحة HSM بأغشية استشعار عبث، وخلايا ضوئية، وحساسات ضغط وميل، وكتلة إيبوكسي.',
          'عند قطع أي سلك في الغشاء الواقي، تُفرَّغ ذاكرة SRAM وتُمحى المفاتيح في ميكروثانية (Zeroization).',
          'بقايا الذاكرة (Memory Remanence): تبريد SRAM تحت -20°C يجمّد الشحنات الكهربائية لعدة دقائق.',
          'تزود HSM بحساسات حرارة تطلق التصفير الفوري بمجرد رصد أي تبريد غير طبيعي.',
        ],
        keyHighlight: 'حساسات الحرارة المنخفضة داخل HSM تحبط هجمات التمهيد البارد (Cold Boot Attacks) قبل تجمد الذاكرة.',
        diagramTitle: 'طبقات الحماية الفيزيائية واستجابة التصفير في HSM',
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'أمن الواجهة البرمجية لوحدة HSM (API Security)',
        subtitle: 'حماية الوحدة من الهجمات المنطقية عبر الأوامر البرمجية',
        bullets: [
          'حتى لو صمدت وحدة HSM فيزيائياً، قد يستغل مهاجم داخلي أوامر الواجهة البرمجية (API) بشكل خبيث.',
          'مثال: استدعاء أمر تغليف أو فك تغليف بتركيبة معينة لاستنتاج بتات مفتاح التغليف.',
          'يجب وضع جدار حماية برمجي (API Firewall) يقيد الأوامر المسموحة لكل تطبيق بدقة.',
          'تصنيف حساسية المفاتيح: المفتاح الرئيس (حرج جداً داخل HSM)، مفتاح التغليف (مغلف)، مفتاح البيانات (مؤقت).',
        ],
        keyHighlight: 'الحماية الفيزيائية للعتاد يجب أن تقترن دائماً بتقييد صارم لأوامر الواجهة البرمجية (API).',
        diagramTitle: 'جدار حماية الأوامر البرمجية أمام وحدة HSM',
      },
    ],
    flashcards: [
      {
        front: 'ما الفرق الدقيق بين تعليق المفتاح (Suspension) وإبطاله (Revocation)؟',
        back: 'التعليق هو إيقاف مؤقت للمفتاح مع بقاء الثقة به وإمكانية إعادته للخدمة (مثل وقت الصيانة)، بينما الإبطال هو إسقاط نهائي للثقة لا رجعة فيه بسبب الاشتباه بانكشافه.',
        category: 'دورة حياة المفتاح',
      },
      {
        front: 'كيف تؤثر البرودة الشديدة (تحت -20°C) على ظاهرة بقايا الذاكرة (Memory Remanence) في SRAM؟',
        back: 'تبطئ البرودة الشديدة تلاشي الشحنات الكهربائية في خلايا SRAM بعد قطع التيار، مما يبقي المفاتيح قابلة للقراءة لثوانٍ أو دقائق في هجوم التمهيد البارد؛ لذا تزود HSM بحساسات برودة تصفر الذاكرة فوراً.',
        category: 'أمن العتاد',
      },
      {
        front: 'ما هما ضابطا الحوكمة اللذان يمنعان موظفاً واحداً من الانفراد بتوليد أو استعادة المفتاح الرئيس؟',
        back: 'فصل المهام (Separation of Duties بين الطلب والموافقة والتنفيذ والتدقيق) والسيطرة المشتركة (Shared/Dual Control باشتراط حضور أمينين معاً).',
        category: 'حوكمة المفاتيح',
      },
      {
        front: 'ما هي فئات المهاجمين الثلاث المعتمدة في تقييم وحدات أمن العتاد (IBM / FIPS)؟',
        back: 'الفئة 1: الغرباء الأذكياء، الفئة 2: المطلعون من الداخل ذوو الوصول التقني، الفئة 3: المنظمات الممولة ذات المختبرات والموارد الضخمة.',
        category: 'تقييم HSM',
      },
      {
        front: 'ما المقصود بالتصفير الفوري (Zeroization) في وحدات HSM؟',
        back: 'المحو الفوري والكامل للمفاتيح المخزنة في ذاكرة SRAM بمجرد اكتشاف حساسات الوحدة لأي محاولة فتح أو ثقب أو تبريد أو عبث مادي.',
        category: 'مقاومة العبث',
      },
      {
        front: 'أين يُفك تغليف «مفتاح التغليف (Wrapping Key)» في منظومة محمية بوحدة HSM؟',
        back: 'يُفك تغليفه ويُستخدم حصرياً داخل الحدود المادية لوحدة HSM بواسطة المفتاح الرئيس، ولا يظهر مكشوفاً في ذاكرة الخادم أبداً.',
        category: 'هرمية المفاتيح',
      },
    ],
    miniQuiz: [
      {
        question: 'أين يُفك تغليف «مفتاح التغليف (Wrapping Key / KEK)» في هرمية مفاتيح مؤسسة مالية تستخدم وحدة HSM؟',
        options: [
          'في متصفح العميل',
          'داخل الحدود المادية لوحدة أمن العتاد (HSM) فقط',
          'في ملفات سجل التدقيق النصية',
          'في القرص الصلب الخارجي للخادم',
        ],
        correctIndex: 1,
        explanation:
          'مفتاح التغليف مشفر بالمفتاح الرئيس (Master Key)، وبما أن المفتاح الرئيس لا يغادر HSM أبداً، فإن فك تغليف KEK واستخدامه يتمان داخل HSM حصراً.',
      },
      {
        question: 'عند إخراج جهاز تشفير من الشبكة لإجراء صيانة دورية روتينية دون وجود أي شبهة اختراق، ما الإجراء الصحيح على مفتاحه؟',
        options: [
          'تعليق المفتاح مؤقتاً (Suspension) ثم إعادته بعد انتهاء الصيانة',
          'نشر المفتاح الخاص في سجل التدقيق',
          'إلغاء جميع النسخ الاحتياطية للمؤسسة',
          'تسليم المفتاح لمهندس الصيانة الخارجي',
        ],
        correctIndex: 0,
        explanation:
          'بما أن الثقة بالمفتاح قائمة والانقطاع مؤقت للصيانة، يُعلَّق المفتاح (Suspended) لمنع استخدامه أثناء الصيانة ثم يُعاد تفعيله.',
      },
      {
        question: 'لماذا تحتوي وحدات HSM المعتمدة عند المستوى الرابع (FIPS 140-3 Level 4) على حساسات لدرجة الحرارة المنخفضة؟',
        options: [
          'لتوفير استهلاك الكهرباء في الصيف',
          'لرصد محاولات التبريد الشديد (تحت -20°C) وتصفير ذاكرة SRAM فوراً قبل استغلال ظاهرة بقايا الذاكرة (Memory Remanence)',
          'لتسريع سرعة مروحة المعالج',
          'لمنع تمدد النص المشفر',
        ],
        correctIndex: 1,
        explanation:
          'يلجأ المهاجمون لتجميد الشريحة بالنيتروجين السائل لإبقاء الشحنات في SRAM بعد قطع الطاقة، فتكشف حساسات البرودة ذلك وتمحو الذاكرة فوراً.',
      },
      {
        question: 'في مصفوفة فصل المهام، من المسؤول عن التحقق من سجلات العمليات الحرجة على المفاتيح دون أن يملك صلاحية تنفيذها؟',
        options: ['مهندس الصيانة', 'المدقق الداخلي (Internal Auditor)', 'العميل الخارجي', 'مسؤول التشفير (أ) نفسه'],
        correctIndex: 1,
        explanation:
          'يتولى المدقق الداخلي مراجعة سجلات التدقيق بشكل مستقل للتحقق من التزام المنفذين والموافقين بالسياسة دون أن يشارك في التشغيل.',
      },
    ],
    richData: {
      id: 9,
      chapter_number: 9,
      title: 'إدارة المفاتيح المتقدمة في المؤسسات الكبيرة واستخدام أجهزة (HSM)',
      subtitle: 'Key Lifecycle, Separation of Duties, Tamper Resistance & FIPS 140-3',
      category: 'متقدم',
      pdfStartPage: 96,
      pdfEndPage: 107,
      description:
        'حوكمة وسياسة المفاتيح، دورة حياة المفتاح، فصل المهام والسيطرة المشتركة، ومعمارية وحدات أمن العتاد (HSM) ومقاومة العبث المادي وبقايا الذاكرة.',
      objectives: [
        'إدارة مراحل دورة حياة المفتاح والتمييز بين تعليق المفتاح (Suspension) وإبطاله (Revocation) وإتلافه.',
        'تصميم مصفوفة فصل المهام (Separation of Duties) والسيطرة المشتركة على المفتاح الرئيس.',
        'تحليل طبقات مقاومة العبث المادي في وحدات HSM (مثل IBM 4758) وظاهرة بقايا الذاكرة (Memory Remanence).',
        'تقييم وحدات أمن العتاد وفق فئات المهاجمين الثلاث ومعيار FIPS 140-3.',
      ],
      sections: [
        {
          heading: '9.2 دورة حياة المفتاح (Key Lifecycle)',
          content:
            'تمر المفاتيح بمراحل: التوليد، التوزيع، التخزين، التفعيل والاستخدام، التدوير، والإتلاف. وقد يطرأ حدثان استثنائيان: التعليق المؤقت (مع بقاء الثقة وإمكان الإعادة كما عند صيانة أجهزة التشفير) والإبطال النهائي (إسقاط الثقة وإبلاغ حاملي النسخ).',
        },
        {
          heading: '9.3 و 9.4 تسلسل المفاتيح وفصل المهام والسيطرة المشتركة',
          content:
            'يُحفظ المفتاح الرئيس (Master Key) داخل وحدة أمن العتاد ولا يغادرها صريحاً أبداً، ويشفر مفتاح التغليف (Wrapping Key) الذي يغلف مفاتيح البيانات (Data Keys). وتُطبق السيطرة المشتركة بتقسيم المفتاح الرئيس إلى مكونين أو حصص عتبة (Threshold) لدى أمناء مختلفين.',
        },
        {
          heading: '9.5 وحدات أمن العتاد (HSM) ومقاومة العبث وبقايا الذاكرة',
          content:
            'تحفظ HSM المفاتيح في ذاكرة SRAM تُصفّر وتُمحى فور فتح الغلاف أو رصد الضوء أو الميل أو قطع أغطية استشعار العبث أو انخفاض الحرارة الشديد (لمنع هجمات التمهيد البارد Cold Boot التي تستغل بقايا الذاكرة تحت -20°C).',
        },
      ],
      tables: [
        {
          title: 'جدول 9.2: مصفوفة فصل مهام مقترحة للعمليات الحرجة على المفاتيح',
          headers: ['العملية الحرجة', 'الطلب', 'الموافقة', 'التشغيل التنفيذي', 'التدقيق'],
          rows: [
            ['توليد مفتاح رئيس (Master Key)', 'مسؤول النظام (التقنية)', 'مدير أمن المعلومات (المخاطر)', 'مسؤول تشفير (أ) + مسؤول تشفير (ب) معاً', 'المدقق الداخلي'],
            ['تدوير مفتاح بيانات (DEK)', 'مسؤول النظام (التقنية)', 'مدير أمن المعلومات (المخاطر)', 'مسؤول تشفير (أ)', 'المدقق الداخلي'],
            ['الاستعادة من النسخ الاحتياطي', 'مسؤول النظام (التقنية)', 'مدير أمن المعلومات (المخاطر)', 'مسؤول تشفير (أ) + مسؤول تشفير (ب) معاً', 'المدقق الداخلي'],
          ],
        },
      ],
      commonMistake: {
        mistake:
          'تسليم مكوني المفتاح الرئيس لمهندس صيانة واحد توفيراً للجهد، أو تسجيل قيم المفاتيح في سجل التدقيق، أو ترك الواجهة البرمجية للـ HSM دون تقييد الأوامر.',
        fix: 'إلزام السيطرة المشتركة الفيزيائية، وتسجيل العمليات فقط دون القيم في سجل التدقيق، ووضع جدار حماية برمجي يقيد الأوامر المرسلة لوحدة HSM.',
      },
      solvedExample: {
        title: 'قرار معماري لحفظ مفاتيح خدمة دفع إلكتروني لشركة سعودية',
        given:
          'خدمة دفع إلكتروني تواجه مهاجمين من الفئة الثانية (مطلعون من الداخل) والفئة الثالثة (منظمات ممولة).',
        steps: [
          '1. تصنيف المفتاح الرئيس كـ «حرج جداً» لأن تسويته تسقط أمن كل المفاتيح تحته ⟹ يُحفظ داخل HSM معتمدة عند المستوى 4 مع فصل مهام.',
          '2. تصنيف مفتاح التغليف كـ «مرتفع الحساسية» ⟹ يُحفظ مغلفاً بالمفتاح الرئيس ويُفك داخل الوحدة فقط ولا يظهر مكشوفاً في ذاكرة الخادم.',
          '3. تصنيف مفتاح البيانات كـ «متوسط الحساسية» ⟹ يُحفظ مغلفاً خارج الوحدة وعند الحاجة يُرسل للوحدة لفك تغليفه ويُستعمل مؤقتاً ثم يُتلف.',
          '4. ضبط الواجهة البرمجية للوحدة بجدار حماية يقيد الأوامر البرمجية المسموحة.',
        ],
        result: 'حماية شاملة ضد الاختراق المادي، والمطلعين من الداخل، وهجمات الواجهة البرمجية.',
        whyItMatters: 'يجمع بين قوة العتاد المقاوم للعبث (FIPS 140 المستوى 4) وضبط أوامر الواجهة البرمجية.',
      },
      flashcards: [
        {
          front: 'ما الفرق بين تعليق المفتاح (Suspension) وإبطاله (Revocation)؟',
          back: 'التعليق إخراج مؤقت مع بقاء الثقة (كإخراجه لصيانة الجهاز)، بينما الإبطال إسقاط نهائي للثقة وإبلاغ لجميع حاملي النسخ.',
        },
        {
          front: 'كيف تؤثر البرودة الشديدة على بقايا الذاكرة (Memory Remanence)؟',
          back: 'تطيل البرودة (تحت -20°C أو بالنيتروجين السائل) بقاء الشحنات في SRAM لثوانٍ أو دقائق بعد قطع التيار، مما يتيح هجوم التمهيد البارد.',
        },
      ],
      selfAssessment: [
        {
          question: 'اذكر فئات المهاجمين الثلاث في تقييم وحدات أمن العتاد.',
          answer:
            '1. الغرباء الأذكياء (معرفة ناقصة ومعدات متوسطة)، 2. المطلعون من الداخل (تعليم تقني متخصص ووصول للنظام)، 3. المنظمات الممولة (فرق متخصصة وموارد كبيرة).',
        },
        {
          question: 'علّل لجوء المصارف إلى عتاد منفصل (HSM) لحماية المفاتيح بدلاً من أنظمة التشغيل التجارية.',
          answer:
            'لأن أنظمة التشغيل التجارية لا تحمي المفاتيح من الموظفين المطلعين ولا من الهجوم المادي، بينما تصفر HSM ذاكرتها عند أي محاولة عبث.',
        },
      ],
      quiz: [
        {
          question: 'أين يُفك تغليف «مفتاح التغليف (Wrapping Key)» في هرمية مفاتيح قاعدة البيانات المحمية بـ HSM؟',
          options: ['في متصفح العميل', 'داخل وحدة أمن العتاد (HSM) فقط', 'في سجل التدقيق', 'في القرص الصلب الخارجي'],
          correctIndex: 1,
          explanation: 'مفتاح التغليف مشفر بالمفتاح الرئيس ولا يُفك ولا يُستعمل إلا داخل حدود وحدة أمن العتاد.',
        },
      ],
    },
    interactiveBook3D: {
      model3DType: 'fips140-hsm-fortress',
      shaderEffect: 'crimson-tamper-mesh',
      sceneTitle: 'مجسم حصن وحدة أمن العتاد HSM (FIPS 140-3 Level 4) ودورة حياة المفتاح',
      sceneDescription:
        'مقطع تشريحي ثلاثي الأبعاد لوحدة HSM يظهر الغلاف المعدني، وشبكة أسلاك استشعار العبث النشطة، وطبقة الإيبوكسي، وذاكرة SRAM المزودة بآلية التصفير الفوري Zeroization وبوابة السيطرة المشتركة.',
      cameraPosition: { x: 0, y: 2.5, z: 6.9 },
      pages3D: [
        {
          pageNumber: 1,
          title: 'دورة حياة المفتاح وفصل المهام والسيطرة المشتركة',
          subtitle: 'حوكمة المفاتيح المؤسسية ضد التهديدات الداخلية',
          narrative:
            'تخضع المفاتيح لدورة حياة صارمة من التوليد داخل مولد عشوائي عتادي (TRNG) إلى الإتلاف، مع فصل كامل بين طالب العملية والموافق عليها ومنفذيها (أ + ب) والمدقق.',
          equation: '\\text{MasterKey} = S_A \\oplus S_B \\quad (\\text{Dual Control}) \\lor \\text{Shamir}(k, n)',
          liveGraphicType: 'hsm-tamper-boundary',
          liveGraphicCaption: 'حلقة دورة حياة المفتاح وبوابة السيطرة المشتركة (أمين أ + أمين ب)',
          visualNotes: [
            'التعليق المؤقت يحفظ الثقة، بينما الإبطال يسقطها نهائياً.',
            'سجل التدقيق يسجل الحدث والهوية دون قيمة المفتاح.',
          ],
        },
        {
          pageNumber: 2,
          title: 'الحدود المادية للتشفير ومقاومة العبث (FIPS 140-3 Level 4)',
          subtitle: 'كيف تدافع وحدة HSM عن نفسها ضد المثقاب والليزر والتبريد؟',
          narrative:
            'تحيط شبكة استشعار دقيقة (Tamper Mesh) بالنواة التشفيرية من جميع الجهات؛ وأي قطع أو ضوء أو تبريد تحت -20°C يفعّل دائرة التصفير التي تمحو SRAM فوراً.',
          equation: '\\text{TamperSensor}(\\Delta V, \\text{Light}, T < -20^\\circ\\text{C}) \\implies \\text{SRAM} \\leftarrow \\mathbf{0}',
          liveGraphicType: 'hsm-tamper-boundary',
          liveGraphicCaption: 'طبقات الدرع الفيزيائي في HSM واستجابة التصفير الفوري Zeroization',
          visualNotes: [
            'ذاكرة SRAM المدعومة ببطارية تمحى في أجزاء من الميكروثانية.',
            'حساسات الحرارة تحبط هجمات Memory Remanence.',
          ],
        },
        {
          pageNumber: 3,
          title: 'تغليف المفاتيح وجدار حماية الأوامر البرمجية (API Firewall)',
          subtitle: 'حماية العتاد من الهجمات المنطقية',
          narrative:
            'لا يغادر المفتاح الرئيس الوحدة أبداً، بل يفك تغليف KEK و DEK داخلها، بينما يمنع جدار حماية الواجهة البرمجية استغلال الأوامر لاستنتاج المفاتيح.',
          equation: '\\text{API\\_Policy}: \\text{Reject}(\\text{ExportPlainKey}) \\land \\text{Enforce}(\\text{KeyUsageTag})',
          liveGraphicType: 'hsm-tamper-boundary',
          liveGraphicCaption: 'جدار حماية أوامر API وعزل المفتاح الرئيس داخل HSM',
          visualNotes: [
            'كل مفتاح مقيد بوسم استخدام لا يمكن تغييره.',
            'يدعم استمرارية الأعمال عبر استنساخ آمن بين وحدتي HSM بمصادقة متبادلة.',
          ],
        },
      ],
      stepByStep: [
        {
          step: 1,
          title: 'تفعيل السيطرة المشتركة لتوليد المفتاح الرئيس داخل HSM',
          description:
            'يدخل مسؤول التشفير (أ) ومسؤول التشفير (ب) بطاقتيهما الذكيتين بعد موافقة مدير أمن المعلومات لتوليد المفتاح الرئيس من TRNG العتادي.',
          formula: 'MK \\xleftarrow{\\text{TRNG}} \\{0,1\\}^{256} \\text{ inside HSM SRAM}',
          visualState: 'إضاءة قفلين ذهبيين متزامنين وتوليد النواة الماسية داخل الحصن.',
          securityNote: 'لا يعرف أي من المسؤولين قيمة المفتاح الرئيس المولد داخل الوحدة.',
        },
        {
          step: 2,
          title: 'تغليف مفاتيح المستوى الأدنى عبر الواجهة البرمجية المقيدة',
          description:
            'يرسل الخادم مفتاح التغليف KEK إلى HSM لفك تغليفه وتشغيله داخلياً وفق سياسة API المسموحة.',
          formula: '\\text{HSM\\_Unwrap}(MK,\\; C_{\\text{KEK}}) \\implies KEK \\text{ (Internal Only)}',
          visualState: 'عبور الحزمة عبر مرشح API الأخضر ومعالجتها داخل النواة دون خروج المفتاح.',
          securityNote: 'جدار حماية API يمنع أي أمر يطلب إخراج مفتاح بصيغة صريحة.',
        },
        {
          step: 3,
          title: 'رصد محاولة عبث فيزيائي أو تبريد بالنيتروجين السائل',
          description:
            'عند محاولة ثقب الغلاف أو تبريده تحت -20°C لقراءة بقايا الذاكرة، ترصد شبكة الاستشعار الخلل فوراً.',
          formula: 'T_{\\text{sensor}} < -20^\\circ\\text{C} \\lor R_{\\text{mesh}} \\neq R_0 \\implies \\text{ALARM}',
          visualState: 'توهج شبكة الأسلاك المحيطة باللون القرمزي وإطلاق نبضة التصفير.',
          securityNote: 'تعمل دائرة الرصد والتصفير بطاقة البطارية الداخلية حتى لو فُصل الجهاز عن الكهرباء.',
        },
        {
          step: 4,
          title: 'تنفيذ التصفير الفوري (Zeroization) وحماية الأسرار',
          description:
            'تُفرَّغ شحنات ذاكرة SRAM وتُكتب فوقها أصفار عشوائية في أقل من ميكروثانية، فتصبح الوحدة خالية تماماً من أي مفتاح.',
          formula: '\\forall i:\\; \\text{SRAM}[i] \\leftarrow 0x00',
          visualState: 'تلاشي النواة الماسية وتحول الذاكرة الداخلية إلى حالة الصفر الآمن.',
          securityNote: 'تُستعاد الخدمة في الموقع البديل عبر وحدة HSM الاحتياطية وبموافقة السيطرة المشتركة.',
        },
      ],
      hotspots: [
        {
          id: 'hsm-tamper-mesh',
          label: 'شبكة استشعار العبث (Active Tamper Mesh)',
          coordinates: { x: -1.9, y: 1.2, z: 0.9 },
          color: '#ef4444',
          title: 'الدرع السلكي النشط ثلاثي الأبعاد (FIPS 140-3 Level 4)',
          detailedExplanation:
            'طبقات متداخلة من المسارات الموصلة الدقيقة المغمورة في الإيبوكسي الصلب، ترصد أي محاولة حفر أو ليزر أو أشعة وتطلق التصفير الفوري.',
          relatedEquation: '\\Delta R_{\\text{mesh}} > \\epsilon \\implies \\text{Zeroize}()',
          securityImpact: 'يحبط هجمات المختبرات المتقدمة من الفئة الثالثة.',
        },
        {
          id: 'hsm-sram-zeroizer',
          label: 'ذاكرة SRAM ودائرة التصفير وحساس الحرارة',
          coordinates: { x: 0.0, y: 0.5, z: 0.5 },
          color: '#f59e0b',
          title: 'محو المفاتيح الفوري ومقاومة بقايا الذاكرة (Memory Remanence)',
          detailedExplanation:
            'تخزن المفاتيح في ذاكرة متطايرة سريعة المحو مزودة بحساسات حرارة منخفضة وعالية لمنع تجميد الشريحة وقراءة الشحنات المتبقية.',
          relatedEquation: 't_{\\text{zeroize}} < 1\\;\\mu\\text{s}',
          securityImpact: 'يمنع هجمات التمهيد البارد (Cold Boot) والفحص المادي للشريحة.',
        },
        {
          id: 'hsm-dual-control-slots',
          label: 'منفذا السيطرة المشتركة (Dual Control Smartcards)',
          coordinates: { x: 1.8, y: 0.9, z: 1.0 },
          color: '#10b981',
          title: 'التحقق المادي من حضور أميني التشفير (أ) و (ب)',
          detailedExplanation:
            'يتطلب تفعيل المفتاح الرئيس أو استعادة النسخ الاحتياطية إدخال بطاقتين ذكيتين مستقلتين وتوقيع أمر الموافقة من مدير أمن المعلومات.',
          relatedEquation: '\\text{Auth} = \\text{Card}_A \\land \\text{Card}_B \\land \\text{CISO\\_Approval}',
          securityImpact: 'يقضي على خطر الموظف المنفرد الخبيث أو المكرَه.',
        },
        {
          id: 'hsm-api-firewall',
          label: 'جدار حماية الواجهة البرمجية (API Firewall)',
          coordinates: { x: 0.0, y: -1.5, z: 1.1 },
          color: '#3b82f6',
          title: 'تقييد الأوامر التشفيرية ومنع استغلال API',
          detailedExplanation:
            'يفحص كل طلب PKCS#11 وارد من الخادم ليتأكد من تطابقه مع الدور المسموح للمفتاح ويمنع أوامر التصدير أو فك التغليف غير المصرح بها.',
          relatedEquation: '\\text{VerifyCommand}(\\text{Role},\\; \\text{KeyAttribute},\\; \\text{OpCode})',
          securityImpact: 'يحمي الوحدة من الهجمات البرمجية التي تستهدف منطق إدارة المفاتيح.',
        },
      ],
    },
    updated_at: 1730937600000,
  },

  // =========================================================================
  // الفصل العاشر: هجمات القنوات الجانبية (Side-Channel Attacks: Timing, SPA, DPA, وMontgomery Ladder)
  // =========================================================================
  {
    id: 10,
    chapter_number: 10,
    title: 'هجمات القنوات الجانبية (Side-Channel Attacks: Timing, SPA, DPA, وMontgomery Ladder)',
    subtitle: 'Timing & Cache Attacks, SPA/DPA Power Analysis, Fault Injection, Constant-Time & Montgomery Ladder',
    description:
      'تحليل التسرب الفيزيائي للمعلومات (التوقيت، ذاكرة التخزين المؤقت L1، تحليل الطاقة البسيط والتفاضلي SPA/DPA، وحقن الأخطاء)، وتطبيق الضوابط الوقائية (التنفيذ ثابت الزمن، سلم مونتغمري، التعمية، الإخفاء، والتحقق من التنفيذ).',
    category: 'هجمات',
    difficulty: 'advanced',
    pdfStartPage: 108,
    pdfEndPage: 117,
    diagramKey: 'ise243-10',
    diagramDescription:
      'مخطط راسم إشارة (Oscilloscope) لتحليل استهلاك الطاقة (SPA/DPA) يوضح الارتفاعات الحادة في الطاقة عند معالجة البت "1" من المفتاح السري مقارنة بالبت "0".',
    videoUrl: 'https://www.youtube.com/watch?v=8SRv1fE2Bwg',
    videoTitle: 'هجمات القنوات الجانبية (Timing, SPA, DPA, Faults) والبرمجة ثابتة الزمن Constant-Time',
    videoDuration: '21:20',
    presentationUrl: `${TEXTBOOK_PDF_PATH}#page=108`,
    keyTopics: [
      'مفهوم القنوات الجانبية: مهاجمة التنفيذ الفيزيائي بدلاً من كسر الرياضيات النظرية',
      'هجمات التوقيت (Timing Attacks) وهجمات الذاكرة المخبئية L1 Cache (1–4 دورات مقابل 50–200 دورة)',
      'تحليل الطاقة البسيط (SPA) والتحليل التفاضلي للطاقة (DPA) والإشعاع الكهرومغناطيسي',
      'هجمات حقن الأخطاء (Fault Injection بالليزر/الجهد) على توقيع RSA-CRT والتصد لها بالتحقق من التنفيذ',
      'الضوابط البرمجية: التنفيذ ثابت الزمن (Constant-Time Bitwise Masking)، سلم مونتغمري (Montgomery Ladder)، التعمية (Blinding)، والإخفاء (Masking)',
      'اختبار العتاد المتقدم: الشعاع الأيوني المركّز (FIB)، المنطق اللاصق (Glue Logic)، والإفصاح المسؤول (45 يوماً)',
    ],
    content: `# الفصل العاشر: هجمات القنوات الجانبية (Side-Channel Attacks) وآليات الحماية منها

## 10.1 مفهوم القنوات الجانبية وأنواع التسرب الفيزيائي
بدلاً من محاولة كسر الخوارزمية التشفيرية رياضياً، تستغل **هجمات القنوات الجانبية (Side-Channel Attacks)** المعلومات الفيزيائية التي تتسرب دون قصد أثناء تنفيذ الخوارزمية على المعالج أو البطاقة الذكية:
1. **هجمات التوقيت (Timing Attacks):** إذا كان مسار الكود يتفرع شرطياً (\`if (secret_bit == 1)\`) أو يتوقف عند أول حرف خاطئ في المقارنة، يختلف زمن التنفيذ باختلاف المفتاح. **ملاحظة حاسمة:** إضافة تأخير زمني عشوائي لا تمنع الهجوم لأن المهاجم يلغي الضوضاء العشوائية بحساب المتوسط الإحصائي لآلاف العينات!
2. **هجمات الذاكرة المخبئية (Cache Timing Attacks):** الوصول إلى جدول S-Box في ذاكرة **L1 Cache** يستغرق **$1\\text{--}4$ دورات معالج** فقط، بينما الإخفاق والذهاب للذاكرة الرئيسية يستغرق **$50\\text{--}200$ دورة**، مما يكشف عناوين الجداول المعتمدة على المفتاح.
3. **تحليل الطاقة البسيط (SPA) والتفاضلي (DPA):**
   - **SPA (Simple Power Analysis):** يقرأ أثر استهلاك الطاقة من قياس واحد لتمييز عملية المضاعفة عن عملية الجمع في الضرب القياسي غير المحمي.
   - **DPA (Differential Power Analysis):** يجمع آلاف آثار الطاقة لمدخلات مختلفة ويطبق التحليل الإحصائي وفرق المتوسطات لاستخراج المفتاح بايتاً تلو الآخر حتى بوجود ضوضاء عالية.
4. **هجوم حقن الأخطاء (Fault Injection Attack):** تسليط نبضة ليزر أو اضطراب جهد أثناء حساب توقيع RSA المنفذ بنظرية الباقي الصيني (CRT)؛ خطأ واحد في أحد المعاملين الأوليين يمكّن المهاجم من كسر المفتاح عبر حساب القاسم المشترك الأكبر $\\gcd(s - s_{\\text{faulty}}, n) = p$.

---page---

## 10.2 آليات الحماية والضوابط الوقائية
| الضابط الوقائي | التهديد الذي يصده | الآلية الهندسية والتكلفة |
| :--- | :--- | :--- |
| **1. التنفيذ ثابت الزمن (Constant-Time) وسلم مونتغمري** | هجمات التوقيت و SPA | إزالة التفرعات الشرطية واستبدالها بأقنعة البتات (\`mask = 0 - secret_bit\`) أو تنفيذ الجمع والمضاعفة دائماً في كل بت عبر **Montgomery Ladder** |
| **2. التعمية (Blinding) والإخفاء (Masking)** | تحليل الطاقة DPA/SPA | ضرب المدخل في قيمة عشوائية قبل العملية في RSA (التعمية)، أو خلط القيم الوسيطة بإزاحات عشوائية في كل جولة AES (الإخفاء) |
| **3. التحقق من التنفيذ (Execution Verification)** | هجمات حقن الأخطاء (Faults) | فك تشفير الناتج أو التحقق من التوقيع داخلياً ومطابقته قبل إخراجه (يضاعف الوقت في المتماثل لكنه يحبط هجوم الأخطاء تماماً) |
| **4. المنطق اللاصق (Glue Logic) ومقاومة FIB** | الفحص المجهري والشعاع الأيوني | التوجيه العشوائي للبوابات المنطقية على الشريحة لإحباط الفحص البصري ومحطات **الشعاع الأيوني المركّز (FIB)** |

---page---

## 10.3 مثال برمجي: تحويل الكود المتفرع إلى كود ثابت الزمن (Constant-Time)
\`\`\`c
// كود غير آمن: يتفرع بناءً على قيمة البت السري (عرضة لهجوم التوقيت و SPA)
if (secret_bit == 1) {
    result = result * data;
}

// كود آمن (تنفيذ ثابت الزمن): ينفذ نفس التعليمات دائماً باستخدام قناع البتات
uint32_t mask = 0U - secret_bit; // يكون 0xFFFFFFFF إذا كان البت 1، و 0x00000000 إذا كان 0
result = (mask & (result * data)) | (~mask & result);
\`\`\`
> [!important]
> **الإفصاح المسؤول (Responsible Disclosure):** عند اكتشاف ثغرة قناة جانبية في المعالجات، يلتزم الباحثون بإبلاغ الشركة المصنعة سراً ومنحها مهلة (غالباً **45 يوماً**) لتطوير تحديثات الرمز الدقيق (Microcode) قبل النشر العلني.`,
    images: [
      {
        prompt: 'Side-channel attack power analysis waveform, cryptographic leakage, 16:9',
        caption: 'آثار استهلاك الطاقة في تحليل الطاقة البسيط (SPA) والتفاضلي (DPA)',
        alt: 'Side-channel attack power analysis waveform',
        seed: 101,
        isAIGenerated: true,
      },
      {
        prompt: 'Differential power analysis DPA oscilloscope trace and electromagnetic emanation, 16:9',
        caption: 'الفرق بين التنفيذ المتفرع المسرب للطاقة والتنفيذ المتوازن بسلم مونتغمري وثبات الزمن',
        alt: 'Differential power analysis DPA oscilloscope trace',
        seed: 102,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'مفهوم هجمات القنوات الجانبية: عندما يتحدث العتاد',
        subtitle: 'لماذا تنكسر خوارزمية آمنة رياضياً بسبب طريقة تنفيذها الفيزيائي؟',
        bullets: [
          'تفترض الرياضيات التشفيرية أن الخوارزمية صندوق أسود لا يخرج منه سوى النص المشفر.',
          'في الواقع الفيزيائي، يستهلك المعالج وقتاً متبايناً وطاقة كهربائية ويصدر إشعاعاً كهرومغناطيسياً.',
          'هجمات القنوات الجانبية تقيس هذه الآثار الفيزيائية لاستنتاج بتات المفتاح السري واحداً تلو الآخر.',
          'أخطر ما فيها أنها لا تحتاج لكسر الرياضيات بل تستغل التفرعات الشرطية والوصول للذاكرة.',
        ],
        keyHighlight: 'أقوى خوارزمية في العالم تصبح هشة إذا اعتمد زمن تنفيذها أو استهلاك طاقتها على قيم بتات المفتاح.',
        diagramTitle: 'قنوات التسرب الفيزيائي من الشريحة التشفيرية',
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'هجمات التوقيت وهجمات ذاكرة التخزين المؤقت (L1 Cache)',
        subtitle: 'كيف يكشف فرق المللي ثانية أو دورات الذاكرة المفتاح السري؟',
        bullets: [
          'دالة مقارنة نصوص تتوقف عند أول حرف خاطئ تسمح للمهاجم باكتشاف الرمز السري حرفاً بحرف.',
          'الوصول إلى ذاكرة L1 Cache يستغرق 1–4 دورات، بينما الذهاب للذاكرة الرئيسية يستغرق 50–200 دورة.',
          'مراقبة أزمنة الوصول للجداول مسبقة الحساب (T-Tables) في AES تكشف البايتات التي تم استدعاؤها.',
          'إضافة تأخير زمني عشوائي لا تحل المشكلة لأن المهاجم يحسب متوسط آلاف القياسات فيلغي العشوائية.',
        ],
        keyHighlight: 'الحل الوحيد لهجمات التوقيت هو كتابة كود ثابت الزمن (Constant-Time) لا يتفرع ولا يغير عناوين الذاكرة حسب السر.',
        diagramTitle: 'مقارنة زمن الاستجابة المتغير مقابل الزمن الثابت',
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'تحليل الطاقة البسيط (SPA) والتفاضلي (DPA) وحقن الأخطاء',
        subtitle: 'قراءة بتات المفتاح من ذبذبات التيار الكهربائي ونبضات الليزر',
        bullets: [
          'SPA: يراقب أثر طاقة واحد ليكشف التفرع الشرطي (مثل الفرق بين المضاعفة وحدها والمضاعفة مع الجمع).',
          'DPA: يجمع آلاف الآثار ويطبق فرق المتوسطات الإحصائي لاستخراج المفتاح رغم وجود الضوضاء.',
          'حقن الأخطاء (Fault Attack): إحداث خلل بالليزر أو الجهد أثناء حساب توقيع RSA-CRT.',
          'مقارنة توقيع واحد خاطئ بتوقيع صحيح تكفي لتحليل العدد n وكسر مفتاح RSA بالكامل!',
        ],
        keyHighlight: 'يحبط سلم مونتغمري (Montgomery Ladder) هجوم SPA لأنه ينفذ مضاعفة وجمعاً في كل بت سواء كان 0 أم 1.',
        diagramTitle: 'أثر الطاقة في Double-and-Add التقليدي مقابل Montgomery Ladder',
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'الضوابط الوقائية: ثبات الزمن، التعمية، الإخفاء، والتحقق',
        subtitle: 'ترسانة المهندس التشفيري لحماية البرمجيات والعتاد',
        bullets: [
          'التنفيذ ثابت الزمن (Constant-Time): استبدال جمل if الشرطية بأقنعة البتات المنطقية (Bitwise Masks).',
          'التعمية (Blinding) والإخفاء (Masking): دمج القيم السرية بقيم عشوائية متجددة لفك ارتباط الطاقة بالمفتاح.',
          'التحقق من التنفيذ (Execution Verification): فك تشفير الناتج ومطابقته قبل إرساله لصد حقن الأخطاء.',
          'عند فشل التحقق، يجب التزام الصمت أو إخراج خطأ عام موحد دون تفاصيل تساعد المهاجم.',
        ],
        keyHighlight: 'التحقق من التنفيذ يضاعف زمن التشفير المتماثل تقريباً لكنه يمنع خروج أي نص مشفر معطوب يكشف المفتاح.',
        diagramTitle: 'كود قناع البتات ثابت الزمن بلغة C',
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'اختبار العتاد المتقدم (FIB & Glue Logic) والإفصاح المسؤول',
        subtitle: 'كيف تُصمم الشرائح التشفيرية لإحباط الهندسة العكسية المجهرية؟',
        bullets: [
          'يستخدم المهاجمون المتقدمون محطة الشعاع الأيوني المركّز (FIB) لحفر ثقوب مجهرية وتعديل الدارات.',
          'تعتمد الشرائح الحديثة على تقنية المنطق اللاصق (Glue Logic) التي تبعثر البوابات المنطقية عشوائياً.',
          'يجعل المنطق اللاصق سطح الشريحة يبدو كبحر متجانس يستحيل تمييز مسارات المفاتيح فيه بالمجهر.',
          'الإفصاح المسؤول (Responsible Disclosure): منح الشركات المصنعة مهلة 45 يوماً لإصلاح الثغرات قبل النشر.',
        ],
        keyHighlight: 'تقنية المنطق اللاصق (Glue Logic) تحول الهندسة العكسية البصرية للشريحة إلى مهمة شبه مستحيلة.',
        diagramTitle: 'تصميم الشريحة القياسي مقابل التصميم المبعثر بالمنطق اللاصق',
      },
    ],
    flashcards: [
      {
        front: 'لماذا لا ينجح إضافة تأخير زمني عشوائي في منع هجمات التوقيت (Timing Attacks)؟',
        back: 'لأن المهاجم يستطيع جمع عدد كبير من قياسات الزمن وحساب المتوسط الحسابي لها، فتُلغى الضوضاء العشوائية ويبقى الفرق الزمني الحقيقي واضحاً.',
        category: 'هجمات التوقيت',
      },
      {
        front: 'ما الفرق بين تحليل الطاقة البسيط (SPA) والتحليل التفاضلي للطاقة (DPA)؟',
        back: 'SPA يقرأ أثر استهلاك الطاقة مباشرة من عملية واحدة أو بضع عمليات لتمييز التفرعات الشرطية، بينما يجمع DPA آلاف الآثار ويستخدم التحليل الإحصائي لاستخراج المفتاح وسط الضوضاء.',
        category: 'تحليل الطاقة',
      },
      {
        front: 'كيف يحمي سلم مونتغمري (Montgomery Ladder) عملية الضرب القياسي في ECC من هجمات SPA والتوقيت؟',
        back: 'ينفذ نفس العمليتين (مضاعفة نقطة وجمع نقطتين) في كل خطوة لكل بت من بتات المفتاح السري سواء كان البت 0 أو 1، فلا يظهر أي اختلاف في الزمن أو الطاقة.',
        category: 'ضوابط وقائية',
      },
      {
        front: 'ما الهدف من تقنية المنطق اللاصق (Glue Logic) في تصميم الشرائح التشفيرية؟',
        back: 'توزيع وتوجيه البوابات المنطقية بشكل عشوائي غير نمطي على الشريحة حتى لا يتمكن المهاجم بالمجهر أو جهاز FIB من تحديد موقع وحدة التشفير أو مسارات المفتاح.',
        category: 'أمن الشرائح',
      },
      {
        front: 'أي ضابط وقائي يحمي من هجمات حقن الأخطاء (Fault Injection) وما هي تكلفته الأدائية؟',
        back: 'التحقق من التنفيذ (Execution Verification) عن طريق فك تشفير الناتج ومطابقته بالنص الأصلي قبل إخراجه، وتكلفته مضاعفة وقت التنفيذ تقريباً في التشفير المتماثل.',
        category: 'ضوابط وقائية',
      },
      {
        front: 'كم يبلغ الفرق التقريبي في دورات المعالج بين إصابة ذاكرة L1 Cache والذهاب للذاكرة الرئيسية؟',
        back: 'الوصول إلى L1 Cache يستغرق 1 إلى 4 دورات فقط، بينما الذهاب إلى الذاكرة الرئيسية يستغرق 50 إلى 200 دورة، وهو فرق ضخم يستغله هجوم Cache Timing.',
        category: 'هجمات الذاكرة',
      },
    ],
    miniQuiz: [
      {
        question: 'أي آلية دفاعية تضاعف وقت التنفيذ تقريباً في الخوارزميات المتماثلة لكنها تصد هجمات حقن الأخطاء (Fault Attacks) بفعالية؟',
        options: [
          'التنفيذ ثابت الزمن فقط',
          'التحقق من التنفيذ (Execution Verification) بفك تشفير الناتج ومقارنته قبل إرساله',
          'ضغط النقاط الإهليلجية',
          'ترويسة HSTS',
        ],
        correctIndex: 1,
        explanation:
          'يعيد التحقق من التنفيذ فك تشفير النص المشفر الناتج للتو ويطابقه بالنص الصريح الأصلي قبل إخراجه، فاكتشاف أي اختلاف يحبط هجوم حقن الأخطاء.',
      },
      {
        question: 'خادم مصادقة يستجيب لطلبات كلمة المرور الخاطئة من أول حرف في 12 ملي ثانية، وللطلبات التي يصح فيها أول حرفين في 14 ملي ثانية. ما سبب هذه الثغرة وكيف تُصلح؟',
        options: [
          'سببها التوقف المبكر في دالة المقارنة عند أول حرف خاطئ، وتُصلح بدالة مقارنة ثابتة الزمن تفحص جميع الأحرف دائماً',
          'سببها بطء الإنترنت وتُصلح بإضافة تأخير عشوائي',
          'سببها استخدام TLS 1.3',
          'سببها صغر حجم القرص الصلب',
        ],
        correctIndex: 0,
        explanation:
          'الفرق (2 ملي ثانية لحرفين) يثبت أن الدالة تستغرق 1 ملي ثانية لكل حرف صحيح ثم تخرج فوراً؛ والحل هو المقارنة ثابتة الزمن (Constant-Time Comparison).',
      },
      {
        question: 'ما الأداة المتقدمة التي يستخدمها مختبرو العتاد والمهاجمون من الفئة الثالثة لحفر ثقوب مجهرية وتعديل مسارات الشريحة دون إتلاف شبكتها الواقية؟',
        options: [
          'محطة الشعاع الأيوني المركّز (Focused Ion Beam - FIB)',
          'مفك البراغي العادي',
          'أمر ping الشبكي',
          'بروتوكول IKEv2',
        ],
        correctIndex: 0,
        explanation:
          'تستخدم محطة الشعاع الأيوني المركّز (FIB) لحفر مسارات مجهرية أو توصيل مجسات دقيقة داخل الشريحة بدقة نانومترية.',
      },
      {
        question: 'في الكود الآمن ثابت الزمن `mask = 0 - secret_bit;` حيث `secret_bit` يأخذ 0 أو 1، ما قيمة القناع `mask` بالست عشري (32-بت) في الحالتين؟',
        options: [
          '0x00000000 عند البت 0، و 0xFFFFFFFF عند البت 1',
          '0x11111111 في الحالتين',
          '0x00000001 في الحالتين',
          'يرمي خطأ قسمة على صفر',
        ],
        correctIndex: 0,
        explanation:
          'في حساب الأعداد غير الموقعة (Unsigned 32-bit)، يكون 0 - 0 = 0x00000000، و 0 - 1 يلتف ليعطي 0xFFFFFFFF (جميع البتات 1)، مما يسمح بالاختيار بعمليات AND و OR دون أي تفرع شرطي.',
      },
    ],
    richData: {
      id: 10,
      chapter_number: 10,
      title: 'هجمات القنوات الجانبية (Side-Channel Attacks) على أجهزة التشفير وآليات الحماية منها',
      subtitle: 'Timing, Cache, SPA/DPA Power Analysis, Fault Injection & Constant-Time Defense',
      category: 'متقدم',
      pdfStartPage: 108,
      pdfEndPage: 117,
      description:
        'تحليل التسرب الفيزيائي للمعلومات (التوقيت، ذاكرة التخزين المؤقت L1، تحليل الطاقة البسيط والتفاضلي SPA/DPA، وحقن الأخطاء)، وتطبيق الضوابط الوقائية (التنفيذ ثابت الزمن، التعمية، الإخفاء، والتحقق من التنفيذ).',
      objectives: [
        'تفسير كيف تتحول التفرعات الشرطية وإخفاقات الذاكرة المخبئية (L1 Cache) إلى ثغرات توقيت.',
        'التمييز بين تحليل الطاقة البسيط (SPA) والتحليل التفاضلي للطاقة (DPA) وهجوم حقن الأخطاء (Fault Attack).',
        'كتابة شيفرة تنفيذ ثابت الزمن (Constant-Time Execution) وتطبيق التعمية (Blinding) والإخفاء (Masking).',
        'فهم اختبارات مقاومة العبث المادي مثل الشعاع الأيوني المركّز (FIB) والمنطق اللاصق (Glue Logic).',
      ],
      sections: [
        {
          heading: '10.2 أنواع هجمات القنوات الجانبية (التوقيت، الطاقة، الأخطاء)',
          content:
            'يستغل هجوم التوقيت اختلاف زمن التنفيذ أو زمن الوصول إلى ذاكرة L1 (1–4 دورات) مقارنة بالذاكرة الرئيسية (50–200 دورة). ويراقب تحليل الطاقة البسيط (SPA) التفرعات الشرطية مباشرة، بينما يجمع التحليل التفاضلي (DPA) آلاف الآثار ويحسب الفرق الإحصائي لاكتشاف المفتاح بايتاً تلو الآخر. ويستغل هجوم الأخطاء (Fault Attack) حقن خطأ بالليزر أثناء توقيع RSA المنفذ بنظرية الباقي الصيني (CRT).',
        },
        {
          heading: '10.3 آليات الحماية والضوابط الوقائية',
          content:
            'يمنع التنفيذ ثابت الزمن (Constant-Time Execution) اعتماد مسارات التنفيذ أو عناوين الذاكرة على أي بت سري. وتدمج التعمية (Blinding) البيانات المدخلة بقيمة عشوائية في RSA، بينما يُدخل الإخفاء (Masking) إزاحات عشوائية في جولات AES. ويصد التحقق من التنفيذ هجمات حقن الأخطاء بفك تشفير الناتج ومطابقته قبل إخراجه.',
        },
        {
          heading: '10.4 بيئات التنفيذ واختبار مقاومة العبث (FIB & Glue Logic)',
          content:
            'يستخدم المختبرون محطة الشعاع الأيوني المركّز (FIB) لحفر ثقوب دقيقة عبر الشبكة الواقية دون قطعها، بينما يعتمد مصممو الشرائح على تقنية المنطق اللاصق (Glue Logic) لتوجيه البوابات عشوائياً وإحباط الفحص المجهري.',
        },
      ],
      tables: [
        {
          title: 'جدول 10.2: المفاضلة الأدائية والمالية لضوابط الحماية من القنوات الجانبية',
          headers: ['الضابط الوقائي', 'التكلفة المالية', 'الأثر على السرعة', 'مستوى الحماية الموفر'],
          rows: [
            ['التنفيذ ثابت الزمن (Constant-Time)', 'منخفضة', 'منخفض', 'مرتفع (ضد هجمات التوقيت)'],
            ['الإخفاء والتعمية (Masking & Blinding)', 'متوسطة', 'متوسط', 'مرتفع (ضد تحليل الطاقة SPA/DPA)'],
            ['التحقق من التنفيذ (Execution Verification)', 'منخفضة', 'مرتفع (يضاعف الوقت في المتماثل)', 'مرتفع (ضد هجمات حقن الأخطاء)'],
            ['مقاومة العبث العتادية (Tamper Resistance)', 'مرتفعة', 'منخفض', 'مرتفع (ضد الهجوم الفيزيائي المباشر)'],
          ],
        },
      ],
      commonMistake: {
        mistake:
          'الاعتقاد بأن إضافة تأخير زمني عشوائي في نهاية عملية التشفير يمنع هجوم التوقيت، أو إخراج رسالة خطأ تفصيلية عند فشل التحقق من التنفيذ.',
        fix: 'كتابة العمليات بمعاملات البتات ثابتة الزمن (لأن المهاجم يلغي التأخير العشوائي بحساب المتوسط)، وإخراج رسالة خطأ عامة ثابتة أو صمت تام.',
      },
      solvedExample: {
        title: 'تشخيص وإصلاح تسرب توقيت في خادم مصادقة',
        given:
          'خادم مصادقة يستجيب للطلبات الخاطئة بمتوسط 12 ملي ثانية، وللطلبات التي تحتوي على أول حرفين صحيحين بمتوسط 14 ملي ثانية.',
        steps: [
          '1. الفرضية: الفرق الزمني (14 - 12 = 2 ملي ثانية) يعني أن الخادم يستغرق 1 ملي ثانية لكل حرف صحيح ثم يتوقف فور أول حرف خاطئ.',
          '2. الفحص البرمجي: دالة مقارنة النصوص تتوقف وتُرجع النتيجة بمجرد العثور على أول حرف غير متطابق.',
          '3. الإصلاح: استبدال الدالة بدالة تنفيذ ثابت الزمن تقارن جميع أحرف السلسلتين بالكامل دائماً.',
          '4. التحقق: أصبحت استجابة الخادم لجميع الطلبات تستغرق 15 ملي ثانية ثابتة وأصبح الفرق الزمني صفراً.',
        ],
        result: 'سد ثغرة هجوم التوقيت بالكامل بثبات زمن الاستجابة.',
        whyItMatters: 'يمنع المهاجم عبر الشبكة من تخمين كلمات المرور أو رموز المصادقة حرفاً بحرف.',
      },
      codeExamples: [
        {
          title: 'تحويل تفرع شرطي غير آمن إلى كود تنفيذ ثابت الزمن بلغة C',
          language: 'c',
          code: `// كود غير آمن: يتفرع بناءً على قيمة البت السري (عرضة لهجوم التوقيت)
if (secret_bit == 1) {
    result = result * data;
}

// كود آمن (تنفيذ ثابت الزمن): يُنفذ دائماً بنفس الوقت باستخدام عمليات البتات
mask = 0 - secret_bit;
result = (mask & (result * data)) | (~mask & result);`,
          explanation:
            'يزيل القناع المنطقي (mask) التفرع الشرطي المعتمد على البت السري ويضمن استغراق نفس عدد دورات المعالج دائماً.',
        },
      ],
      flashcards: [
        {
          front: 'لماذا لا يمنع التأخير الزمني العشوائي هجمات التوقيت؟',
          back: 'لأن المهاجم يستطيع جمع عدد كبير من العينات وحساب المتوسط الحسابي لإلغاء تأثير الضوضاء العشوائية.',
        },
        {
          front: 'ما هو الهدف من تقنية المنطق اللاصق (Glue Logic) في تصميم الشرائح؟',
          back: 'التوجيه العشوائي للبوابات المنطقية لجعل تخطيط الشريحة يبدو كبحر عشوائي يصعّب على المهاجمين تحديد المكونات الداخلية بالفحص المادي.',
        },
      ],
      selfAssessment: [
        {
          question: 'قارن بين تحليل الطاقة البسيط (SPA) والتحليل التفاضلي للطاقة (DPA).',
          answer:
            'SPA يبحث عن ارتفاعات واضحة مباشرة في استهلاك الطاقة ناتجة عن التفرع الشرطي، بينما يجمع DPA آلاف الآثار ويخمن جزءاً من المفتاح لحساب الفرق الإحصائي.',
        },
        {
          question: 'ما أهمية الإفصاح المسؤول (Responsible Disclosure) عند اكتشاف ثغرات في بنية المعالجات؟',
          answer:
            'يمنح الشركات المصنعة مهلة زمنية (غالباً 45 يوماً) لتطوير إصلاحات برمجية وتحديثات للرمز الدقيق (Microcode) بسرية قبل النشر العام.',
        },
      ],
      quiz: [
        {
          question:
            'أي آلية دفاعية تضاعف وقت التنفيذ تقريباً في الخوارزميات المتماثلة لكنها تصد هجمات حقن الأخطاء؟',
          options: [
            'التنفيذ ثابت الزمن',
            'التحقق من التنفيذ (Execution Verification)',
            'ضغط النقاط',
            'ترويسة HSTS',
          ],
          correctIndex: 1,
          explanation:
            'التحقق من التنفيذ يفك تشفير النص المشفر الناتج للتو ويقارنه بالنص الأصلي قبل إرساله، مما يضاعف وقت التنفيذ تقريباً.',
        },
      ],
    },
    interactiveBook3D: {
      model3DType: 'dpa-oscilloscope-core',
      shaderEffect: 'amber-oscilloscope-beam',
      sceneTitle: 'مجسم راسم إشارات الطاقة DPA/SPA ومختبر التنفيذ ثابت الزمن',
      sceneDescription:
        'نموذج ثلاثي الأبعاد يعرض شريحة تشفير متصلة بمجسات قياس الطاقة والزمن وأشعة الليزر لحقن الأخطاء، مع مقارنة حية بين نبضات الكود المتفرع ونبضات سلم مونتغمري المتوازنة.',
      cameraPosition: { x: 0, y: 2.3, z: 6.8 },
      pages3D: [
        {
          pageNumber: 1,
          title: 'تشريح تسرب التوقيت وذاكرة L1 Cache',
          subtitle: 'عندما تفضح دورات المعالج قيمة البت السري',
          narrative:
            'التوقف المبكر في المقارنة أو القفز الشرطي في الذاكرة يخلق بصمة زمنية قابلة للقياس عن بُعد؛ ويُسوى ذلك نهائياً بأقنعة البتات ثابتة الزمن.',
          equation: '\\text{mask} = 0 - b \\in \\{\\text{0x00000000},\\; \\text{0xFFFFFFFF}\\}, \\quad R = (\\text{mask} \\land A) \\lor (\\sim\\text{mask} \\land B)',
          liveGraphicType: 'side-channel-power-trace',
          liveGraphicCaption: 'تساوي زمن التنفيذ عند استبدال التفرع الشرطي بقناع البتات',
          visualNotes: [
            'L1 Cache Hit (1-4 cycles) مقابل Cache Miss (50-200 cycles).',
            'المتوسط الإحصائي يلغي أي تأخير عشوائي مضاف.',
          ],
        },
        {
          pageNumber: 2,
          title: 'موجات الطاقة SPA و DPA وسلم مونتغمري (Montgomery Ladder)',
          subtitle: 'إخفاء بصمة الضرب القياسي وصناديق S-Box',
          narrative:
            'في SPA تظهر قفزة طاقة واضحة عند البت 1؛ بينما ينفذ سلم مونتغمري جمعاً ومضاعفة في كل بت، ويفكك الإخفاء (Masking) الارتباط الإحصائي في DPA.',
          equation: '\\forall i:\\; (R_0, R_1) \\leftarrow \\begin{cases} (2R_0,\\; R_0 + R_1) & b_i = 0 \\\\ (R_0 + R_1,\\; 2R_1) & b_i = 1 \\end{cases}',
          liveGraphicType: 'side-channel-power-trace',
          liveGraphicCaption: 'تطابق أثر استهلاك الطاقة بين البت 0 والبت 1 في سلم مونتغمري',
          visualNotes: [
            'التعمية (Blinding) تضرب المدخل في r^e mod n قبل فك تشفير RSA.',
            'الإخفاء (Masking) يقسم كل بايت حساس إلى حصص عشوائية بـ XOR.',
          ],
        },
        {
          pageNumber: 3,
          title: 'حقن الأخطاء بالليزر (Fault Injection) والتحقق من التنفيذ',
          subtitle: 'حماية توقيع RSA-CRT وتشتيت البوابات بالمنطق اللاصق',
          narrative:
            'نبضة ليزر واحدة أثناء حساب RSA-CRT تمكّن المهاجم من تحليل العدد المركب n بقسمة إقليدس؛ ويصد التحقق من التنفيذ هذا الهجوم قبل خروج التوقيع.',
          equation: 'p = \\gcd(S_{\\text{correct}} - S_{\\text{faulty}},\\; n) \\implies \\text{Verify}(S^e \\stackrel{?}{\\equiv} m \\pmod n)',
          liveGraphicType: 'side-channel-power-trace',
          liveGraphicCaption: 'اكتشاف الخطأ المحقون بالليزر ومنع خروج التوقيع المعطوب',
          visualNotes: [
            'Glue Logic يبعثر البوابات المنطقية لإحباط الفحص المجهري و FIB.',
            'الإفصاح المسؤول يمنح المصنعين 45 يوماً لإصدار الترقيعات.',
          ],
        },
      ],
      stepByStep: [
        {
          step: 1,
          title: 'رصد تسرب الطاقة والتوقيت في الكود المتفرع غير المحمي',
          description:
            'ملاحظة ارتفاع الموجة الحمراء في راسم الإشارة كلما صادف المعالج بتاً يساوي 1 في المفتاح السري.',
          formula: '\\Delta P(t) = P(\\text{Multiply} + \\text{Square}) - P(\\text{Square Only})',
          visualState: 'ظهور قمم حمراء حادة تكشف تسلسل بتات المفتاح 101101 على الشاشة.',
          securityNote: 'التفرع الشرطي المعتمد على السر يفضح المفتاح من قياس واحد في SPA.',
        },
        {
          step: 2,
          title: 'تفعيل سلم مونتغمري والأقنعة ثابتة الزمن (Constant-Time)',
          description:
            'إعادة كتابة حلقة الضرب القياسي لتنفيذ نفس العمليات وتبديل السجلات بقناع بتات ثابت الزمن.',
          formula: '\\text{cswap}(R_0, R_1, b_i) \\text{ via bitwise XOR mask}',
          visualState: 'استواء موجة الطاقة وتحولها إلى خط كهرماني منتظم لا يكشف أي بت.',
          securityNote: 'زمن التنفيذ وعدد التعليمات متطابقان تماماً لكل المفاتيح الممكنة.',
        },
        {
          step: 3,
          title: 'تطبيق الإخفاء (Masking) والتعمية (Blinding) ضد DPA',
          description:
            'دمج القيم الوسيطة بقناع عشوائي متجدد m في كل عملية تشفير لفصل استهلاك الطاقة الفيزيائي عن قيمة المفتاح.',
          formula: 'x_{\\text{masked}} = x \\oplus m, \\quad S\\text{-Box}^{\\prime}(x \\oplus m) = S\\text{-Box}(x) \\oplus m^{\\prime}',
          visualState: 'تغليف مسارات الشريحة بطبقة ضوئية زرقاء تشتت الارتباط الإحصائي.',
          securityNote: 'يجعل فرق المتوسطات في DPA يقترب من الصفر حتى مع آلاف الآثار.',
        },
        {
          step: 4,
          title: 'فحص الناتج بالتحقق من التنفيذ لصد حقن الأخطاء بالليزر',
          description:
            'قبل إرسال النص المشفر أو التوقيع، تعيد الشريحة التحقق منه داخلياً وتكتم المخرج إذا رصدت أي خطأ محقون.',
          formula: '\\text{If } D_K(C) \\neq P \\implies \\text{ZeroizeOutput}()',
          visualState: 'اعتراض شعاع الليزر البنفسجي وإغلاق بوابة الإخراج تلقائياً.',
          securityNote: 'لا تُخرج رسالة خطأ تفصيلية أبداً حتى لا يستفيد منها المهاجم كـ Oracle.',
        },
      ],
      hotspots: [
        {
          id: 'sca-power-probe',
          label: 'مِجس تحليل الطاقة (SPA / DPA Probe)',
          coordinates: { x: -1.8, y: 1.2, z: 0.8 },
          color: '#ef4444',
          title: 'قياس استهلاك التيار اللحظي عبر مقاومة التحويل',
          detailedExplanation:
            'يقيس فرق الجهد عبر مقاومة صغيرة متصلة بخط تغذية الشريحة لرصد استهلاك الطاقة أثناء تبديل الترانزستورات (Hamming Weight / Distance).',
          relatedEquation: 'V_{\\text{drop}}(t) = I_{\\text{chip}}(t) \\times R_{\\text{shunt}}',
          securityImpact: 'يُحبط عبر الإخفاء العشوائي (Masking) وموازنة استهلاك البوابات.',
        },
        {
          id: 'sca-constant-time-alu',
          label: 'وحدة التنفيذ ثابت الزمن (Constant-Time ALU)',
          coordinates: { x: 0.0, y: 1.3, z: 1.0 },
          color: '#10b981',
          title: 'إزالة التفرعات الشرطية والوصول المتغير للذاكرة',
          detailedExplanation:
            'تنفذ جميع العمليات بمعاملات منطقية على البتات (AND, OR, XOR) وتضمن ثبات عدد دورات المعالج بغض النظر عن قيم المدخلات السرية.',
          relatedEquation: '\\text{Time}(k_1) = \\text{Time}(k_2) = \\text{Constant}',
          securityImpact: 'يقضي نهائياً على هجمات التوقيت الشبكية والمحلية.',
        },
        {
          id: 'sca-laser-fault-shield',
          label: 'حارس التحقق ضد حقن الأخطاء (Fault Verifier)',
          coordinates: { x: 1.8, y: 0.9, z: 0.8 },
          color: '#f59e0b',
          title: 'حماية RSA-CRT و AES من اضطرابات الجهد والليزر',
          detailedExplanation:
            'يتحقق من صحة التوقيع بالمفتاح العام أو يفك تشفير الكتلة قبل إخراجها، مما يمنع تسرب التوقيع الخاطئ اللازم لهجوم Bellcore.',
          relatedEquation: 'S^e \\bmod n \\stackrel{?}{=} \\text{Pad}(m)',
          securityImpact: 'يمنع كسر مفتاح RSA من خطأ محقون واحد.',
        },
        {
          id: 'sca-glue-logic-substrate',
          label: 'نسيج المنطق اللاصق (Glue Logic Layout)',
          coordinates: { x: 0.0, y: -1.4, z: 1.1 },
          color: '#a855f7',
          title: 'التوجيه العشوائي للبوابات لإحباط جهاز FIB',
          detailedExplanation:
            'يدمج بوابات وحدات التشفير والذاكرة والسجلات في كتلة عشوائية واحدة غير منتظمة تمنع تحديد مواقع الأسلاك السرية تحت المجهر الإلكتروني.',
          relatedEquation: '\\text{LayoutEntropy} \\longrightarrow \\text{Maximal}',
          securityImpact: 'يرفع كلفة وزمن الهندسة العكسية الفيزيائية بالـ FIB إلى مستويات غير مجدية.',
        },
      ],
    },
    updated_at: 1730937600000,
  },

  // =========================================================================
  // الفصل الحادي عشر: التشفير ما بعد الكم (Post-Quantum Cryptography: خوارزميتا Shor وGrover والتهديد الكمومي)
  // =========================================================================
  {
    id: 11,
    chapter_number: 11,
    title: 'التشفير ما بعد الكم (Post-Quantum Cryptography: خوارزميتا Shor وGrover والتهديد الكمومي)',
    subtitle: 'Quantum Threat (Shor & Grover Algorithms), Harvest Now Decrypt Later, Lattice & Hash-Based PQC',
    description:
      'أثر خوارزميتي شور وجروفر الكموميتين على التشفير الحالي، خطر «سجل الآن وفك التشفير لاحقاً»، مبادئ التشفير القائم على الشبكيات (Lattices) والتجزئة (أشجار ميركل)، وحساب حمولة الشبكة والهجين التشفيري.',
    category: 'كمومي',
    difficulty: 'advanced',
    pdfStartPage: 118,
    pdfEndPage: 125,
    diagramKey: 'ise243-11',
    diagramDescription:
      'مقارنة بيانية للتسريع الأسي في خوارزمية شور الكمومية لكسر RSA-2048 (من 10^14 سنة على الحاسوب الكلاسيكي إلى نحو 8 ساعات على الحاسوب الكمومي).',
    videoUrl: 'https://www.youtube.com/watch?v=6uI3e4EqLDA',
    videoTitle: 'التهديد الكمومي (خوارزميتا شور وجروفر) وأسس التشفير المقاوم للكم PQC',
    videoDuration: '22:10',
    presentationUrl: `${TEXTBOOK_PDF_PATH}#page=118`,
    keyTopics: [
      'أثر خوارزمية جروفر (Grover) على التشفير المتماثل: خفض بتات الأمان إلى النصف (AES-128 -> 2^64، AES-256 -> 2^128)',
      'أثر خوارزمية شور (Shor) على تشفير المفتاح العام: الكسر التام لـ RSA و ECC في وقت متعدد الحدود',
      'خطر «سجل الآن وفك التشفير لاحقاً» (Harvest Now, Decrypt Later) وأولوية البيانات طويلة العمر',
      'التشفير القائم على الشبكيات الرياضية (Lattices / Module-LWE): آلية تغليف المفتاح ML-KEM والتوقيع ML-DSA',
      'التوقيعات القائمة على التجزئة (Hash-Based): من توقيع لامبورت لمرة واحدة إلى شجرة ميركل و SLH-DSA',
      'حساب حمولة الشبكة (المفتاح العام + النص المشفر/التوقيع) واستراتيجية الهجين التشفيري (Hybrid Scheme)',
    ],
    content: `# الفصل الحادي عشر: التشفير المقاوم للحوسبة الكمومية (Post-Quantum Cryptography)

## 11.1 أثر الحوسبة الكمومية: خوارزميتا جروفر وشور
تستثمر الحواسيب الكمومية ظاهرتي التراكب (Superposition) والتشابك (Entanglement) لحل مسائل رياضية محددة بتسريع هائل، ويختلف أثرها جذرياً بين فئتي التشفير:
1. **التشفير المتماثل ودوال التجزئة — خوارزمية جروفر (Grover's Algorithm):**
   تسرع البحث في الفضاء غير المرتب بمقدار **الجذر التربيعي ($\\sqrt{N}$)**، مما **يخفض عدد بتات الأمان إلى النصف**:
   - يصبح أمان \`AES-128\` يعادل $2^{64}$ عملية كمومية (غير كافٍ).
   - يصبح أمان \`AES-256\` يعادل **$2^{128}$ عملية كمومية (آمن تماماً)**.
2. **تشفير المفتاح العام التقليدي — خوارزمية شور (Shor's Algorithm):**
   تستخدم تحويل فورييه الكمومي لاكتشاف دورية الدوال، فتنجح في **تحليل الأعداد الصحيحة الكبيرة وحساب اللوغاريتم المتقطع (DLP & ECDLP) في وقت متعدد الحدود**، مما **يكسر أنظمة RSA و DH و ECDH و ECDSA كسراً تاماً**!

---page---

## 11.2 خطر «سجل الآن وفك التشفير لاحقاً» وعائلات ما بعد الكم (PQC)
يمتد الخطر الكمومي إلى الماضي عبر استراتيجية **«سجل الآن وفك التشفير لاحقاً» (Harvest Now, Decrypt Later - HNDL)**؛ حيث يعترض الخصوم الاتصالات المشفرة اليوم ويخزنونها لفك شفرتها فور توفر حاسوب كمومي واسع النطاق، مما يوجب البدء فوراً بحماية البيانات طويلة العمر (كالسجلات الصحية والأسرار السيادية).
تعمل خوارزميات **التشفير المقاوم للكم (PQC)** على الحواسيب الكلاسيكية الحالية لكنها تستند إلى مسائل رياضية تعجز خوارزمية شور عن حلها:
- **الشبكيات الرياضية (Lattice-Based — Module-LWE / SIS):** أساس معيار تغليف المفاتيح **ML-KEM** ومعيار التوقيع الرقمي **ML-DSA**.
- **دوال التجزئة وأشجار ميركل (Hash-Based):** يعالج بناء **شجرة ميركل (Merkle Tree)** قيد توقيع لامبورت (الصالح لرسالة واحدة فقط) بوضع مفاتيح لمرة واحدة في أوراق الشجرة وتجزئتها صعوداً حتى **جذر واحد يمثل المفتاح العام الوحيد**، وهو أساس معيار **SLH-DSA**.

---page---

## 11.3 حساب حمولة الشبكة (Network Payload) والهجين التشفيري
تميز خوارزميات ما بعد الكم بزيادة أحجام المفاتيح والتواقيع مقارنة بـ ECC، لذا يجب على مهندس الشبكات حساب **إجمالي الحمولة المرسلة (المفتاح العام + النص المشفر أو التوقيع)**:

| الخوارزمية | الوظيفة التشفيرية | المفتاح العام (بايت) | المفتاح الخاص (بايت) | التوقيع / النص المشفر (بايت) | إجمالي الحمولة المرسلة (بايت) |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **ML-KEM-512** | تغليف مفتاح (FIPS 203) | 800 | 1632 | 768 | **$800 + 768 = 1568$ بايت** |
| **ML-DSA-44** | توقيع شبكي (FIPS 204) | 1312 | 2560 | 2420 | **$1312 + 2420 = 3732$ بايت** |
| **SLH-DSA-128s** | توقيع بالتجزئة (FIPS 205) | 32 | 64 | 7856 | **$32 + 7856 = 7888$ بايت** |

> [!tip]
> **الهجين التشفيري (Hybrid Scheme):** أثناء المرحلة الانتقالية، يُدمج تبادل مفاتيح تقليدي مجرّب (مثل \`ECDH P-256 / X25519\`) مع خوارزمية كمومية (\`ML-KEM-768\`) ويُشتق مفتاح الجلسة من السرّين معاً عبر \`HKDF(Secret_Classic || Secret_PQC)\`، بحيث يظل الاتصال آمناً ما دامت إحدى الخوارزميتين صامدة. تنبيه: الهجين لا يحمي عميلاً قديماً لا يدعم الخوارزمية الكمومية إذا تفاوض للعودة للتقليدي وحده!`,
    images: [
      {
        prompt: 'Post-quantum cryptography lattice-based, quantum computer threat, 16:9',
        caption: 'الشبكيات الرياضية متعددة الأبعاد (Lattices) كأساس للتشفير المقاوم للحوسبة الكمومية',
        alt: 'Post-quantum cryptography lattice-based',
        seed: 111,
        isAIGenerated: true,
      },
      {
        prompt: 'Shor algorithm threat to RSA ECC and lattice cryptography defense, 16:9',
        caption: 'تأثير خوارزميتي شور وجروفر ومعمارية التشفير الهجين (ECDH + ML-KEM)',
        alt: 'Shor algorithm threat to RSA ECC and lattice cryptography defense',
        seed: 112,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'المواجهة الكمومية: خوارزمية جروفر مقابل خوارزمية شور',
        subtitle: 'لماذا ينجو AES-256 بينما ينهار RSA و ECC كلياً؟',
        bullets: [
          'خوارزمية جروفر تسرع البحث الشامل بمقدار الجذر التربيعي فتخفض بتات أمان التشفير المتماثل إلى النصف.',
          'مضاعفة طول المفتاح المتماثل إلى AES-256 تعيد مستوى الأمان الكمومي إلى 2^128 خطوة آمنة.',
          'خوارزمية شور تحل مسألتي تحليل الأعداد الصحيحة واللوغاريتم المتقطع في وقت متعدد الحدود.',
          'جميع أنظمة RSA و Diffie-Hellman و ECDH و ECDSA تنكسر كسراً تاماً أمام خوارزمية شور.',
        ],
        keyHighlight: 'الحل للتشفير المتماثل هو مضاعفة طول المفتاح (AES-256)، أما المفتاح العام فيتطلب استبدال الرياضيات بالكامل.',
        diagramTitle: 'مقارنة الأثر الكمومي على AES و RSA و ECC',
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'خطر «سجل الآن وفك التشفير لاحقاً» (HNDL)',
        subtitle: 'لماذا يبدأ التهديد الكمومي اليوم وليس بعد عشر سنوات؟',
        bullets: [
          'يسجل الخصوم حركة الشبكات المشفرة اليوم ويخزنونها في مراكز بيانات ضخمة.',
          'عند توفر الحاسوب الكمومي مستقبلاً، سيفكك الخصم مفاتيح جلسات ECDH/RSA المسجلة ويكشف البيانات.',
          'البيانات التي تتطلب سرية لـ 10 أو 20 عاماً (السجلات الطبية، المالية، والأسرار الوطنية) معرضة للخطر الآن.',
          'الرشاقة التشفيرية (Cryptographic Agility): تصميم الأنظمة بحيث يمكن تبديل خوارزمياتها دون إعادة بناء التطبيق.',
        ],
        keyHighlight: 'إذا كانت بياناتك تحتاج للبقاء سرية لمدة 10 سنوات، فإن تأمينها ضد الكم واجب فوري اليوم.',
        diagramTitle: 'الخط الزمني لهجوم Harvest Now, Decrypt Later',
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'أسس خوارزميات ما بعد الكم: الشبكيات وأشجار ميركل',
        subtitle: 'Module-LWE وتغليف المفاتيح (KEM) والتوقيع بالتجزئة',
        bullets: [
          'تعتمد الشبكيات (Lattices) على صعوبة إيجاد أقرب متجه أو التعلم مع الأخطاء (Module-LWE) في أبعاد عالية.',
          'تستخدم آلية تغليف المفتاح (KEM) بدلاً من تبادل ديفي-هيلمان لتوليد وتغليف مفتاح الجلسة العشوائي.',
          'توقيع لامبورت المبني على التجزئة آمن كمومياً لكنه يصلح لتوقيع رسالة واحدة فقط.',
          'تدمج شجرة ميركل آلاف مفاتيح المرة الواحدة في أوراقها وتلخصها في جذر واحد يمثل المفتاح العام (SLH-DSA).',
        ],
        keyHighlight: 'أمان SLH-DSA يعتمد حصرياً على مقاومة دوال التجزئة للتصادم دون أي افتراضات جبرية إضافية.',
        diagramTitle: 'بنية شجرة ميركل وآلية تغليف المفتاح KEM',
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'حساب حمولة الشبكة (Network Payload) في عصر الكم',
        subtitle: 'مقارنة أحجام المفاتيح والتواقيع بين ML-KEM و ML-DSA و SLH-DSA',
        bullets: [
          'حمولة تبادل ML-KEM-512 = مفتاح عام (800 بايت) + نص مشفر (768 بايت) = 1568 بايت.',
          'حمولة توقيع ML-DSA-44 = مفتاح عام (1312 بايت) + توقيع (2420 بايت) = 3732 بايت.',
          'حمولة توقيع SLH-DSA-128s = مفتاح عام (32 بايت فقط!) + توقيع (7856 بايت) = 7888 بايت.',
          'SLH-DSA يستهلك أكثر من ضعف النطاق الترددي لـ ML-DSA، لذا يناسب تحديثات البرامج لا جلسات الويب الكثيفة.',
        ],
        keyHighlight: 'يجب حساب مجموع (المفتاح العام + النص المشفر/التوقيع) لتجنب تقطيع حزم الشبكة (Packet Fragmentation).',
        diagramTitle: 'مقارنة حمولة الشبكة بالبايت لمعايير ما بعد الكم',
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'استراتيجية الهجين التشفيري (Hybrid Cryptography)',
        subtitle: 'الجمع بين موثوقية ECDH الكلاسيكي ومقاومة ML-KEM الكمومية',
        bullets: [
          'ينفذ الطرفان تبادل ECDH وتغليف ML-KEM معاً في نفس المصافحة.',
          'يُدمج السر الكلاسيكي والسر الكمومي داخل دالة اشتقاق المفاتيح: HKDF(S_ECDH || S_MLKEM).',
          'يظل الاتصال آمناً بالكامل حتى لو ظهرت ثغرة رياضية في إحداهما أو توفر حاسوب كمومي.',
          'تنبيه: العملاء القدامى الذين لا يدعمون PQC سيتفاوضون للعودة للتقليدي وحده، لذا تجب ترقيتهم.',
        ],
        keyHighlight: 'الهجين التشفيري هو الجسر الهندسي الآمن للانتقال نحو معايير ما بعد الكم دون المخاطرة بالموثوقية.',
        diagramTitle: 'مخطط اشتقاق مفتاح الجلسة الهجين ECDH + ML-KEM',
      },
    ],
    flashcards: [
      {
        front: 'ما الفرق بين تأثير خوارزمية جروفر وتأثير خوارزمية شور على أنظمة التشفير؟',
        back: 'خوارزمية جروفر تخفض بتات أمان التشفير المتماثل إلى النصف (يُعالج بمضاعفة المفتاح إلى AES-256)، بينما تكسر خوارزمية شور أنظمة المفتاح العام (RSA, ECC) كسراً تاماً.',
        category: 'التهديد الكمومي',
      },
      {
        front: 'كيف تحل شجرة ميركل (Merkle Tree) مشكلة صلاحية توقيع لامبورت لرسالة واحدة فقط؟',
        back: 'بوضع عدد كبير من مفاتيح المرة الواحدة في أوراق الشجرة وتجزئة كل عقدتين متجاورتين صعوداً حتى الجذر الوحيد الذي يعمل كمفتاح عام ثابت.',
        category: 'تواقيع التجزئة',
      },
      {
        front: 'كم يبلغ إجمالي حمولة التبادل (المفتاح العام + النص المشفر) لخوارزمية ML-KEM-512 بالبايت؟',
        back: 'يبلغ 1568 بايت (800 بايت للمفتاح العام + 768 بايت للنص المشفر).',
        category: 'حساب الحمولة',
      },
      {
        front: 'ما المقصود بهجوم «سجل الآن وفك التشفير لاحقاً» (Harvest Now, Decrypt Later)؟',
        back: 'اعتراض وتخزين البيانات المشفرة المتبادلة اليوم عبر الإنترنت بهدف فك تشفيرها مستقبلاً فور امتلاك حاسوب كمومي قادر على كسر مفاتيح الجلسات.',
        category: 'مخاطر استراتيجية',
      },
      {
        front: 'كيف يعمل الهجين التشفيري (Hybrid Scheme) في تبادل المفاتيح؟',
        back: 'ينفذ خوارزمية تقليدية (مثل ECDH) وخوارزمية مقاومة للكم (مثل ML-KEM) بالتوازي، ويشتق مفتاح الجلسة من دمج السرّين معاً عبر دالة HKDF.',
        category: 'الانتقال التشفيري',
      },
      {
        front: 'لماذا لا يحمي الهجين التشفيري على الخادم العملاء القدامى الذين لا يدعمون الخوارزميات الكمومية؟',
        back: 'لأن العميل القديم سيتفاوض لرفض الخوارزمية الكمومية والاتصال بالخوارزمية التقليدية وحدها، فيبقى اتصاله عرضة للتسجيل والفك الكمومي.',
        category: 'أخطاء شائعة',
      },
    ],
    miniQuiz: [
      {
        question: 'كم يبلغ إجمالي حمولة التبادل المرسلة عبر الشبكة (المفتاح العام + النص المشفر) في خوارزمية ML-KEM-512؟',
        options: ['64 بايت', '800 بايت', '1568 بايت (800 + 768)', '7888 بايت'],
        correctIndex: 2,
        explanation:
          'في ML-KEM-512 يبلغ حجم المفتاح العام 800 بايت وحجم النص المشفر 768 بايت، فيكون مجموع الحمولة المتبادلة 1568 بايت.',
      },
      {
        question: 'ما مستوى الأمان الكمومي الذي يوفره معيار AES-256 في مواجهة خوارزمية جروفر؟',
        options: [
          'ينكسر بالكامل في ثوانٍ',
          'يوفر هامش أمان يعادل 2^128 خطوة كمومية (آمن تماماً)',
          'يوفر أمان 2^32 خطوة فقط',
          'يتحول إلى خوارزمية مفتاح عام',
        ],
        correctIndex: 1,
        explanation:
          'تخفض خوارزمية جروفر الأس إلى النصف عبر الجذر التربيعي، فيصبح 2^256 تحت الجذر مساوياً لـ 2^128 عملية كمومية وهو آمن عملياً.',
      },
      {
        question: 'أي عائلة رياضية تعتمد عليها خوارزميتا ML-KEM و ML-DSA المعتمدتان من NIST؟',
        options: [
          'تحليل الأعداد الصحيحة الكبيرة',
          'الشبكيات الرياضية ومسألة التعلم مع الأخطاء على الوحدات (Module-Lattices / Module-LWE)',
          'المنحنيات الإهليلجية بصيغة فايرشتراس',
          'شفرة قيصر التقليدية',
        ],
        correctIndex: 1,
        explanation:
          'تعتمد كل من ML-KEM (تغليف المفاتيح) و ML-DSA (التوقيع الرقمي) على الشبكيات الرياضية النموذجية (Module Lattices).',
      },
      {
        question: 'بالمقارنة بين حمولة ML-DSA-44 (3732 بايت) وحمولة SLH-DSA-128s (7888 بايت)، أي العبارات التالية صحيحة هندسياً؟',
        options: [
          'SLH-DSA-128s يملك مفتاحاً عاماً صغيراً جداً (32 بايت) لكن توقيعه كبير (7856 بايت) فيستهلك ضعف النطاق الترددي تقريباً',
          'ML-DSA-44 لا يصلح للإنترنت',
          'كلاهما يستهلك 32 بايت فقط في المجموع',
          'SLH-DSA يعتمد على تحليل الأعداد الأولية',
        ],
        correctIndex: 0,
        explanation:
          'يتميز SLH-DSA بمفتاح عام بحجم 32 بايت فقط، إلا أن توقيعه يبلغ 7856 بايت مما يرفع إجمالي الحمولة إلى 7888 بايت.',
      },
    ],
    richData: {
      id: 11,
      chapter_number: 11,
      title: 'التشفير المقاوم للحوسبة الكمومية (Post-Quantum Cryptography)',
      subtitle: 'Shor & Grover Algorithms, Lattice-Based Crypto, ML-KEM, ML-DSA & SLH-DSA',
      category: 'كمومي',
      pdfStartPage: 118,
      pdfEndPage: 125,
      description:
        'أثر خوارزميتي شور وجروفر الكموميتين على التشفير الحالي، مبادئ التشفير القائم على الشبكيات (Lattices) والتجزئة، وحساب حمولة الشبكة لمعايير ML-KEM و ML-DSA و SLH-DSA.',
      objectives: [
        'المقارنة بين أثر خوارزمية جروفر على التشفير المتماثل وأثر خوارزمية شور على تشفير المفتاح العام.',
        'شرح آلية تغليف المفتاح (KEM) والتوقيعات المعتمدة على الشبكيات والتجزئة (أشجار ميركل).',
        'حساب ومقارنة حمولة التبادل والتوقيع لخوارزميات ML-KEM-512 و ML-DSA-44 و SLH-DSA-128s.',
        'تخطيط الانتقال التشفيري باستخدام الهجين التشفيري (Hybrid Scheme) واختبار التوافق.',
      ],
      sections: [
        {
          heading: '11.1 أثر الحوسبة الكمومية: خوارزميتا جروفر وشور',
          content:
            'تخفض خوارزمية جروفر عدد بتات أمان التشفير المتماثل إلى النصف تقريباً (الجذر التربيعي لفضاء المفاتيح)، لذا يُوصى بـ AES-256 لتوفير هامش أمان 2¹²⁸ خطوة كمومية. أما خوارزمية شور فتكسر أنظمة RSA و ECC كسراً تاماً في وقت متعدد الحدود باكتشاف دورية الدوال.',
        },
        {
          heading: '11.2 و 11.3 خوارزميات ما بعد الكم ومعاييرها (ML-KEM, ML-DSA, SLH-DSA)',
          content:
            'تعتمد ML-KEM (تغليف مفاتيح) و ML-DSA (توقيع رقمي) على صعوبة مسألة التعلم مع الأخطاء على الوحدات في الشبكيات الرياضية (Module-LWE/SIS). بينما تعتمد SLH-DSA على دوال التجزئة وأشجار ميركل وهي عديمة الحالة (Stateless) بمفتاح عام صغير جداً (32 بايت) وتوقيع كبير (7856 بايت).',
        },
        {
          heading: '11.4 الانتقال إلى التشفير المقاوم للكم والهجين التشفيري',
          content:
            'بسبب خطر «سجل الآن وفك التشفير لاحقاً»، يجب البدء بتأمين البيانات طويلة العمر فوراً. ويدمج الهجين التشفيري (Hybrid Scheme) خوارزمية تقليدية مثل ECDH مع ML-KEM واشتقاق مفتاح الجلسة من السرّين معاً لضمان أمان مزدوج.',
        },
      ],
      tables: [
        {
          title: 'جدول 11.1: مقارنة أحجام المفاتيح والتوقيعات في معايير NIST FIPS (بالبايت)',
          headers: ['الخوارزمية', 'الوظيفة التشفيرية', 'المفتاح العام (بايت)', 'المفتاح الخاص (بايت)', 'التوقيع / النص المشفر (بايت)'],
          rows: [
            ['ML-KEM-512', 'تغليف مفتاح (FIPS 203)', '800', '1632', '768'],
            ['ML-DSA-44', 'توقيع رقمي شبكي (FIPS 204)', '1312', '2560', '2420'],
            ['SLH-DSA-128s', 'توقيع رقمي بالتجزئة (FIPS 205)', '32', '64', '7856'],
          ],
        },
      ],
      commonMistake: {
        mistake:
          'الاعتقاد بأن الهجين التشفيري يحمي العملاء القدامى الذين لا يدعمون الخوارزمية الجديدة، أو استخدام SLH-DSA لشهادات الويب عالية الكثافة دون حساب سعة النطاق.',
        fix: 'ترقية العملاء لأن العميل القديم سيتفاوض للعودة للخوارزمية التقليدية فقط، واستخدام ML-DSA لشهادات الويب و SLH-DSA لتحديثات البرامج الثابتة.',
      },
      solvedExample: {
        title: 'حساب حمولة التبادل والتوقيع لخوارزميات ما بعد الكم في شبكة شركة سعودية',
        given:
          'مهندس شبكات يحسب إجمالي حجم البيانات المرسلة (الحمولة) عند استخدام ML-KEM-512 و ML-DSA-44 و SLH-DSA-128s.',
        steps: [
          '1. حمولة تبادل المفاتيح لـ ML-KEM-512 = المفتاح العام (800) + النص المشفر (768) = 1568 بايت.',
          '2. حمولة التوقيع الرقمي لـ ML-DSA-44 = المفتاح العام (1312) + التوقيع (2420) = 3732 بايت.',
          '3. حمولة التوقيع الرقمي لـ SLH-DSA-128s = المفتاح العام (32) + التوقيع (7856) = 7888 بايت.',
        ],
        result:
          'تستهلك SLH-DSA-128s (7888 بايت) ضعف النطاق الترددي الذي تستهلكه ML-DSA-44 (3732 بايت) تقريباً.',
        whyItMatters: 'يوجه المهندس لاختيار الخوارزمية الأنسب لسعة الشبكة وطبيعة التطبيق.',
      },
      flashcards: [
        {
          front: 'كيف تحل شجرة ميركل مشكلة صلاحية توقيع لامبورت لرسالة واحدة فقط؟',
          back: 'بوضع مفاتيح عامة كثيرة لمرة واحدة في أوراق الشجرة وتجزئة كل عقدتين معاً صعوداً حتى نصل إلى جذر واحد يمثل المفتاح العام الوحيد.',
        },
        {
          front: 'لماذا نحتاج AES-256 بدلاً من AES-128 في العصر الكمومي؟',
          back: 'لأن خوارزمية جروفر تخفض بتات الأمان إلى النصف، فيصبح AES-128 بقوة 2⁶⁴ بينما يوفر AES-256 هامش أمان 2¹²⁸ خطوة كمومية.',
        },
      ],
      selfAssessment: [
        {
          question: 'قارن بين أثر خوارزمية جروفر وخوارزمية شور.',
          answer:
            'خوارزمية جروفر تخفض عدد بتات أمان التشفير المتماثل إلى النصف وتتطلب مضاعفة حجم المفتاح، بينما خوارزمية شور تكسر أنظمة المفتاح العام (RSA و ECC) كسراً تاماً.',
        },
        {
          question: 'علّل أهمية البدء بتأمين البيانات طويلة العمر فوراً.',
          answer:
            'لأن الخطر الكمومي يمتد إلى الماضي عبر استراتيجية «سجل الآن وفك التشفير لاحقاً»، فالبيانات المشفرة اليوم يمكن اعتراضها وتخزينها لفك شفرتها عند توفر الحاسوب الكمومي.',
        },
      ],
      quiz: [
        {
          question: 'كم يبلغ إجمالي حمولة التبادل (المفتاح العام + النص المشفر) في خوارزمية ML-KEM-512؟',
          options: ['64 بايت', '800 بايت', '1568 بايت', '7888 بايت'],
          correctIndex: 2,
          explanation: 'حجم المفتاح العام 800 بايت وحجم النص المشفر 768 بايت، ومجموعهما 1568 بايت.',
        },
      ],
    },
    interactiveBook3D: {
      model3DType: 'bloch-shor-resonator',
      shaderEffect: 'quantum-entanglement-field',
      sceneTitle: 'مجسم مرنان شور الكمومي وشبكة التحول الهجين نحو PQC',
      sceneDescription:
        'مشهد ثلاثي الأبعاد يجمع كرة بلوخ الكمومية وموجات تحويل فورييه الكمومي (QFT) التي تكسر حلقات RSA/ECC، في مقابل شبكة بلورية متعددة الأبعاد (Module-Lattice) تصد الهجوم الكمومي.',
      cameraPosition: { x: 0, y: 2.5, z: 7.0 },
      pages3D: [
        {
          pageNumber: 1,
          title: 'خوارزميتا شور وجروفر تحت المجهر الكمومي',
          subtitle: 'اكتشاف الدورية في O((log N)^3) مقابل البحث التربيعي O(√N)',
          narrative:
            'يكتشف تحويل فورييه الكمومي في خوارزمية شور دورية الدالة f(x) = a^x mod N فيكسر RSA و ECC كلياً، بينما تكتفي خوارزمية جروفر بتسريع البحث بمقدار الجذر التربيعي.',
          equation: '\\text{Shor}: \\text{Order}(a \\bmod N) \\implies \\text{Break RSA/ECC}, \\qquad \\text{Grover}: \\mathcal{O}(2^{n/2}) \\implies \\text{Use AES-256}',
          liveGraphicType: 'quantum-shor-grover',
          liveGraphicCaption: 'انهيار زمن كسر RSA-2048 من 10^14 عام إلى ~8 ساعات كمومية',
          visualNotes: [
            'AES-256 يحافظ على أمان 128-بت كمومي أمام جروفر.',
            'HNDL يهدد البيانات المخزنة اليوم بأثر رجعي.',
          ],
        },
        {
          pageNumber: 2,
          title: 'آلية تغليف المفتاح الشبكية (KEM) وأشجار ميركل',
          subtitle: 'البدائل الرياضية المقاومة لخوارزمية شور',
          narrative:
            'تخفي مسألة التعلم مع الأخطاء (Module-LWE) السر داخل شبكة متعددة الأبعاد مضافاً إليها ضوضاء صغيرة، بينما تبني شجرة ميركل توقيعاً يعتمد على التجزئة فقط.',
          equation: '\\mathbf{b} = \\mathbf{A}\\mathbf{s} + \\mathbf{e} \\pmod q \\quad (\\text{Module-LWE})',
          liveGraphicType: 'quantum-shor-grover',
          liveGraphicCaption: 'تمثيل متجهات الشبكية مع متجه الخطأ e وشجرة ميركل للتوقيع',
          visualNotes: [
            'KEM يستخدم KeyGen و Encaps و Decaps بدلاً من تبادل DH.',
            'جذر شجرة ميركل (32 بايت) يختصر آلاف مفاتيح لامبورت.',
          ],
        },
        {
          pageNumber: 3,
          title: 'موازنة حمولة الشبكة والهجين التشفيري (Hybrid Scheme)',
          subtitle: 'دمج ECDH + ML-KEM في قنوات الاتصال المؤسسية',
          narrative:
            'لحماية الاتصالات اليوم دون التضحية بالموثوقية الكلاسيكية، يُشتق مفتاح الجلسة من دمج سر ECDH وسر ML-KEM مع مراعاة أحجام الحزم.',
          equation: 'K_{\\text{hybrid}} = \\text{HKDF}(K_{\\text{ECDH}} \\parallel K_{\\text{ML-KEM}})',
          liveGraphicType: 'quantum-shor-grover',
          liveGraphicCaption: 'بوابة الدمج الهجين ومقارنة أحجام الحمولة (1568B vs 3732B vs 7888B)',
          visualNotes: [
            'ML-KEM-512 يحتاج 1568 بايت فقط للتبادل الكامل.',
            'يجب ترقية العملاء القدامى لمنع التفاوض التراجعي.',
          ],
        },
      ],
      stepByStep: [
        {
          step: 1,
          title: 'تقييم التهديد الكمومي ومضاعفة المفاتيح المتماثلة',
          description:
            'ترقية التشفير المتماثل إلى AES-256 ودوال التجزئة إلى SHA-384/SHA3-256 لمقاومة خوارزمية جروفر.',
          formula: '\\text{Security}_{\\text{Grover}}(\\text{AES-256}) = \\sqrt{2^{256}} = 2^{128} \\text{ ops}',
          visualState: 'تضاعف سمك الدرع المتماثل الأخضر ليصد موجات جروفر الكمومية.',
          securityNote: 'التشفير المتماثل لا يحتاج لتغيير الخوارزمية بل لرفع طول المفتاح إلى 256 بت.',
        },
        {
          step: 2,
          title: 'توليد مفتاح الشبكية في آلية تغليف المفتاح (ML-KEM KeyGen)',
          description:
            'يولد المستقبل مصفوفة شبكية A ومتجهاً سرياً s ومتجه خطأ e، وينشر المفتاح العام (A, b = As + e).',
          formula: 'pk = (\\mathbf{A},\\; \\mathbf{b} = \\mathbf{A}\\mathbf{s} + \\mathbf{e} \\bmod q), \\quad sk = \\mathbf{s}',
          visualState: 'تشكّل شبكة بلورية ثلاثية الأبعاد مع إزاحة النقاط بمتجه الخطأ e.',
          securityNote: 'إيجاد s من A و b يصطدم بمسألة أقرب متجه العصية على الحواسيب الكمومية.',
        },
        {
          step: 3,
          title: 'تغليف المفتاح الهجين (Encapsulation + ECDH)',
          description:
            'يغلف المرسل سراً عشوائياً بـ ML-KEM بالتوازي مع حصة ECDH ويرسل النص المشفر الكلي.',
          formula: '(C_{\\text{KEM}}, K_1) \\leftarrow \\text{Encaps}(pk), \\quad K_2 = \\text{ECDH}, \\quad K = \\text{HKDF}(K_1 \\parallel K_2)',
          visualState: 'اندماج الشعاع البلوري الكمومي مع الشعاع الذهبي الكلاسيكي في مفتاح جلسة موحد.',
          securityNote: 'يظل مفتاح الجلسة K آمناً حتى لو كُسر أحد المكونين.',
        },
        {
          step: 4,
          title: 'التوقيع الرقمي بشجرة ميركل أو الشبكيات وحساب الحمولة',
          description:
            'اختيار ML-DSA (3732 بايت) للاتصالات التفاعلية السريعة، أو SLH-DSA (7888 بايت) لتوقيع تحديثات الأنظمة طويلة الأمد.',
          formula: '\\text{Payload}_{\\text{ML-DSA-44}} = 1312 + 2420 = 3732\\;\\text{Bytes}',
          visualState: 'عبور حزم الشهادات الموقعة عبر مقياس النطاق الترددي الشبكي.',
          securityNote: 'مراعاة حجم MTU الشبكي تمنع فشل المصافحة بسبب تقطيع الحزم الكبيرة.',
        },
      ],
      hotspots: [
        {
          id: 'pqc-shor-qft',
          label: 'مُحلل دورية خوارزمية شور (Shor QFT)',
          coordinates: { x: -1.9, y: 1.2, z: 0.8 },
          color: '#ef4444',
          title: 'الخطر القاتل على RSA و ECC',
          detailedExplanation:
            'يستغل التراكب الكمومي وتحويل فورييه الكمومي لإيجاد دور الدالة الأسية المعيارية في وقت متعدد الحدود، مما يكسر تحليل الأعداد واللوغاريتم المتقطع.',
          relatedEquation: '\\text{QFT}\\left(\\sum_x |x\\rangle |a^x \\bmod N\\rangle\\right) \\implies r',
          securityImpact: 'يوجب إيقاف الاعتماد المنفرد على RSA و ECC للبيانات طويلة العمر.',
        },
        {
          id: 'pqc-grover-sqrt',
          label: 'مسرّع البحث الكمومي لجروفر (Grover √N)',
          coordinates: { x: 0.0, y: 1.4, z: 1.0 },
          color: '#f59e0b',
          title: 'التسريع التربيعي للبحث في فضاء المفاتيح المتماثلة',
          detailedExplanation:
            'يقلص عدد المحاولات اللازمة لتخمين مفتاح متماثل بطول n بت من 2^n إلى 2^(n/2)، ويُعالج بسهولة عبر اعتماد AES-256.',
          relatedEquation: 'T_{\\text{quantum}} = \\mathcal{O}\\left(\\sqrt{2^n}\\right) = \\mathcal{O}(2^{n/2})',
          securityImpact: 'يجعل AES-256 المعيار الذهبي المقاوم للكم في التشفير المتماثل.',
        },
        {
          id: 'pqc-merkle-root',
          label: 'جذر شجرة ميركل (Merkle Root 32B)',
          coordinates: { x: 1.9, y: 0.9, z: 0.8 },
          color: '#10b981',
          title: 'تحويل تواقيع المرة الواحدة إلى نظام متعدد التواقيع',
          detailedExplanation:
            'يجمع مفاتيح لامبورت/WOTS+ في شجرة تجزئة هرمية بحيث يكون الجذر العلوي (32 بايت) هو المفتاح العام الوحيد، ويتضمن التوقيع مسار المصادقة في الشجرة.',
          relatedEquation: '\\text{Root} = H(H(L_1 \\parallel L_2) \\parallel H(L_3 \\parallel L_4))',
          securityImpact: 'يمنح معيار SLH-DSA أماناً يعتمد فقط على دوال التجزئة دون افتراضات شبكية.',
        },
        {
          id: 'pqc-hybrid-combiner',
          label: 'مُدمج المفاتيح الهجين (Hybrid Combiner)',
          coordinates: { x: 0.0, y: -1.4, z: 1.1 },
          color: '#06b6d4',
          title: 'الجمع الآمن بين ECDH الكلاسيكي و ML-KEM الكمومي',
          detailedExplanation:
            'يدمج السر المشترك من المنحنيات الإهليلجية مع السر المغلف من الشبكيات داخل دالة HKDF لحماية البيانات ضد تهديدات الحاضر والمستقبل.',
          relatedEquation: 'K_{\\text{final}} = \\text{HKDF}(\\text{Secret}_{\\text{P256}} \\parallel \\text{Secret}_{\\text{ML-KEM-768}})',
          securityImpact: 'يحمي من هجوم «سجل الآن وفك التشفير لاحقاً» مع الحفاظ على الامتثال الحالي.',
        },
      ],
    },
    updated_at: 1730937600000,
  },

  // =========================================================================
  // الفصل الثاني عشر: معايير NIST للتشفير ما بعد الكم (FIPS 203 ML-KEM, FIPS 204 ML-DSA, FIPS 205 SLH-DSA)
  // =========================================================================
  {
    id: 12,
    chapter_number: 12,
    title: 'معايير NIST للتشفير ما بعد الكم (FIPS 203 ML-KEM, FIPS 204 ML-DSA, FIPS 205 SLH-DSA)',
    subtitle: 'NIST PQC Standards (FIPS 203, FIPS 204, FIPS 205), Parameter Sets, Cryptographic Inventory & Compliance',
    description:
      'تفصيل معايير المعهد الوطني للمعايير والتقنية النهائية الصادرة في أغسطس 2024 (FIPS 203 ML-KEM, FIPS 204 ML-DSA, FIPS 205 SLH-DSA)، مجموعات المعلمات وفئات الأمان، ملف التشفير المؤسسي، والامتثال.',
    category: 'كمومي',
    difficulty: 'advanced',
    pdfStartPage: 126,
    pdfEndPage: 133,
    diagramKey: 'ise243-12',
    diagramDescription:
      'الخط الزمني لمعايير NIST للتشفير ما بعد الكم من انطلاق المسابقة عام 2016 حتى اعتماد المعايير النهائية الثلاثة FIPS 203 (ML-KEM) و FIPS 204 (ML-DSA) و FIPS 205 (SLH-DSA) في أغسطس 2024.',
    videoUrl: 'https://www.youtube.com/watch?v=Qy7vZ5YJY5w',
    videoTitle: 'معايير NIST النهائية لما بعد الكم: FIPS 203 (ML-KEM)، FIPS 204 (ML-DSA)، و FIPS 205 (SLH-DSA)',
    videoDuration: '20:30',
    presentationUrl: `${TEXTBOOK_PDF_PATH}#page=126`,
    keyTopics: [
      'معيار FIPS 203 (ML-KEM): مجموعات المعلمات (512، 768، 1024) ومطابقتها لفئات الأمان 1 و 3 و 5',
      'معيار FIPS 204 (ML-DSA): مجموعات المعلمات (44، 65، 87) للتوقيع الرقمي الشبكي العام',
      'معيار FIPS 205 (SLH-DSA): التوقيع عديم الحالة بالتجزئة والفرق بين النسخ الصغيرة (s) والسريعة (f)',
      'حقيقة أرقام المعلمات: لماذا لا تمثل الأرقام (512, 768, 1024) أطوال المفاتيح بالبت؟',
      'بناء ملف التشفير المؤسسي (Cryptographic Inventory Profile) وترتيب أولويات الانتقال',
      'متطلبات الامتثال الرسمية: توثيق مسوغات الاختيار، استخدام وحدات مجازة، والمراجعة الدورية',
    ],
    content: `# الفصل الثاني عشر: دراسة معايير NIST النهائية للتشفير ما بعد الكم (FIPS 203 / 204 / 205)

## 12.1 المعايير الفيدرالية الثلاثة الصادرة في أغسطس 2024
بعد ثماني سنوات من التقييم العالمي، أصدر المعهد الوطني للمعايير والتقنية (**NIST**) في 13 أغسطس 2024 أول ثلاثة معايير نهائية جاهزة للنشر الفعلي:
1. **معيار FIPS 203 (\`ML-KEM\` — Module-Lattice-Based Key-Encapsulation Mechanism):** المعيار الأساسي لتغليف وتبادل المفاتيح العام (المشتق من CRYSTALS-Kyber).
2. **معيار FIPS 204 (\`ML-DSA\` — Module-Lattice-Based Digital Signature Algorithm):** المعيار الأساسي للتوقيعات الرقمية العامة وحماية الشهادات (المشتق من CRYSTALS-Dilithium).
3. **معيار FIPS 205 (\`SLH-DSA\` — Stateless Hash-Based Digital Signature Algorithm):** معيار توقيع رقمي عديم الحالة مبني على دوال التجزئة (المشتق من SPHINCS+) كبديل مستقل رياضياً عن الشبكيات.

---page---

## 12.2 جدول مجموعات المعلمات وفئات الأمان وأحجام المفاتيح
> [!warning]
> **تنبيه هندسي مهم:** الأرقام في أسماء الخوارزميات مثل \`512\` و \`768\` و \`1024\` في \`ML-KEM\` أو \`44\` و \`65\` و \`87\` في \`ML-DSA\` **لا تمثل أطوال المفاتيح بالبت**، بل ترمز إلى أبعاد المصفوفات الشبكية ومجموعات المعلمات!

| المعيار الفيدرالي | مجموعة المعلمات | فئة أمان NIST | المكافئ القياسي للأمان | المفتاح العام (بايت) | النص المشفر / التوقيع (بايت) |
| :--- | :--- | :---: | :--- | :---: | :---: |
| **FIPS 203 (تغليف مفاتيح)** | \`ML-KEM-512\` | الفئة 1 | يعادل كسر \`AES-128\` | 800 | 768 |
| **FIPS 203 (تغليف مفاتيح)** | \`ML-KEM-768\` | **الفئة 3 (الموصى بها)** | يعادل كسر \`AES-192\` | 1184 | 1088 |
| **FIPS 203 (تغليف مفاتيح)** | \`ML-KEM-1024\` | الفئة 5 | يعادل كسر \`AES-256\` | 1568 | 1568 |
| **FIPS 204 (توقيع شبكي)** | \`ML-DSA-44\` | الفئة 2 | يعادل تصادم \`SHA-256\` | 1312 | 2420 |
| **FIPS 204 (توقيع شبكي)** | \`ML-DSA-65\` | **الفئة 3 (الموصى بها)** | يعادل كسر \`AES-192\` | 1952 | 3309 |
| **FIPS 204 (توقيع شبكي)** | \`ML-DSA-87\` | الفئة 5 | يعادل كسر \`AES-256\` | 2592 | 4627 |
| **FIPS 205 (توقيع بالتجزئة)** | \`SLH-DSA-SHA2-128s\` | الفئة 1 (نسخة **s** صغيرة) | توقيع أصغر حجماً وأبطأ إنشاءً | **32** | **7856** |
| **FIPS 205 (توقيع بالتجزئة)** | \`SLH-DSA-SHA2-128f\` | الفئة 1 (نسخة **f** سريعة) | إنشاء توقيع أسرع وحجم أكبر | **32** | **17088** |

لاحظ أن حجم المفتاح العام في \`ML-DSA-44\` ($1312$ بايت) يساوي **$41$ ضعفاً** لحجم المفتاح العام في \`SLH-DSA-128s\` ($32$ بايت فقط: $1312 \\div 32 = 41$).

---page---

## 12.3 ملف التشفير المؤسسي (Cryptographic Inventory) والامتثال
للانتقال الآمن نحو معايير NIST دون تعطيل الأنظمة الحيوية، تتبع المؤسسة خطوات منهجية:
1. **إعداد ملف التشفير المؤسسي (Cryptographic Inventory Profile):** جدول يحصر كل خدمة في المؤسسة، وحساسية بياناتها، والخوارزمية الحالية، ومدى جاهزية الطرف المقابل لدعم البدائل الكمومية.
   - إذا كانت الخدمة عالية الحساسية والطرف المقابل محدثاً (مثل بوابة الموظفين الداخلية): **يُفعَّل التبادل الهجين (\`ECC + ML-KEM-768\`) فوراً**.
   - إذا كانت الخدمة تتعامل مع أنظمة عملاء قديمة لا تدعم PQC (مثل واجهة API خارجية): **تُجدول خطة اختبار توافق وإشعار مسبق** قبل إيقاف الخوارزمية القديمة لمنع انقطاع الخدمة.
2. **متطلبات الامتثال (Compliance):**
   - **توثيق قرار الاختيار:** كتابة الخوارزمية ومجموعة المعلمات ومسوغ الاختيار الفني (فئة الأمان + قيود الشبكة).
   - **التحقق من التنفيذ (Validation):** استخدام مكتبات ووحدات تشفير مجازة رسمياً في برنامج NIST CMVP.
   - **المراجعة الدورية:** فحص دوري لاكتشاف أي خوارزميات متقادمة أو غير معتمدة أضيفت للشبكة.`,
    images: [
      {
        prompt: 'NIST PQC standards ML-KEM ML-DSA SLH-DSA, FIPS 203 204 205, 16:9',
        caption: 'المعايير الثلاثة النهائية لمعهد NIST: FIPS 203 (ML-KEM) و FIPS 204 (ML-DSA) و FIPS 205 (SLH-DSA)',
        alt: 'NIST PQC standards ML-KEM ML-DSA SLH-DSA',
        seed: 121,
        isAIGenerated: true,
      },
      {
        prompt: 'Quantum safe migration roadmap, cryptographic agility in enterprise, 16:9',
        caption: 'بناء ملف التشفير المؤسسي وخارطة طريق الامتثال والانتقال التشفيري',
        alt: 'Quantum safe migration roadmap',
        seed: 122,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'ثلاثية معايير NIST النهائية (أغسطس 2024)',
        subtitle: 'FIPS 203 و FIPS 204 و FIPS 205: البدائل الرسمية لـ RSA و ECC',
        bullets: [
          'FIPS 203 (ML-KEM): المعيار الرسمي لتغليف المفاتيح وتأسيس الجلسات المشفرة.',
          'FIPS 204 (ML-DSA): المعيار الرسمي للتوقيعات الرقمية العامة المبني على الشبكيات.',
          'FIPS 205 (SLH-DSA): معيار التوقيع الرقمي عديم الحالة المبني على التجزئة كخط دفاع مستقل.',
          'إلزامية استخدام الأسماء المعيارية النهائية (ML-KEM, ML-DSA, SLH-DSA) بدلاً من أسماء المسودات السابقة.',
        ],
        keyHighlight: 'تنوع الأساس الرياضي بين الشبكيات (FIPS 203/204) والتجزئة (FIPS 205) يمنح المؤسسات مرونة دفاعية عالية.',
        diagramTitle: 'خارطة معايير NIST FIPS 203 / 204 / 205',
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'تفصيل معيار FIPS 203 (ML-KEM) وفئات الأمان',
        subtitle: 'كيف نختار بين ML-KEM-512 و ML-KEM-768 و ML-KEM-1024؟',
        bullets: [
          'الأرقام 512 و 768 و 1024 تعبر عن أبعاد المصفوفة الشبكية وليست طول المفتاح بالبت!',
          'ML-KEM-512: فئة الأمان 1 (تكافئ كسر AES-128)، مفتاح عام 800 بايت ونص مشفر 768 بايت.',
          'ML-KEM-768: فئة الأمان 3 (تكافئ كسر AES-192)، الخيار القياسي الموصى به لمعظم المؤسسات.',
          'ML-KEM-1024: فئة الأمان 5 (تكافئ كسر AES-256)، مفتاح عام 1568 بايت ونص مشفر 1568 بايت.',
        ],
        keyHighlight: 'ML-KEM-768 يوازن بشكل مثالي بين هامش الأمان الكمومي العالي (الفئة 3) وحجم الحمولة المعتدل.',
        diagramTitle: 'مقارنة معلمات وأحجام ML-KEM الثلاث',
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'مقارنة FIPS 204 (ML-DSA) و FIPS 205 (SLH-DSA)',
        subtitle: 'التوقيع الشبكي المتوازن مقابل التوقيع عديم الحالة بالتجزئة (s vs f)',
        bullets: [
          'يوفر ML-DSA ثلاث مجموعات: ML-DSA-44 (فئة 2)، ML-DSA-65 (فئة 3)، و ML-DSA-87 (فئة 5).',
          'يتميز SLH-DSA بمفتاح عام صغير جداً (32 بايت في فئة 128)، أي أصغر بـ 41 مرة من مفتاح ML-DSA-44 (1312 بايت).',
          'النسخة (s - Small) في SLH-DSA تنتج توقيعاً أصغر (7856 بايت) لكنها أبطأ في التوقيع.',
          'النسخة (f - Fast) في SLH-DSA أسرع في إنشاء التوقيع لكن حجم التوقيع يتضاعف إلى 17088 بايت.',
        ],
        keyHighlight: 'استخدم ML-DSA لبروتوكولات الويب والشهادات اليومية، واستخدم SLH-DSA لتوقيع البرامج الثابتة (Firmware) والجذور.',
        diagramTitle: 'المفاضلة بين ML-DSA ونسختي SLH-DSA (128s و 128f)',
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'بناء ملف التشفير المؤسسي (Cryptographic Inventory)',
        subtitle: 'تحليل الجاهزية واتخاذ قرار الانتقال لكل خدمة',
        bullets: [
          'الخطوة الأولى لأي انتقال كمومي هي جرد كافة الخوارزميات والشهادات والبروتوكولات العاملة في المؤسسة.',
          'يربط الملف كل خدمة بـ: درجة حساسية البيانات، الخوارزمية الحالية، ودعم الطرف الآخر للبدائل.',
          'الخدمات الداخلية المحدثة عالية الحساسية تنتقل فوراً إلى الوضع الهجين (ECC + ML-KEM).',
          'الخدمات المرتبطة بأجهزة عملاء قديمة تخضع لخطة توافق مرحلية وإشعار مسبق لمنع انقطاع الخدمة.',
        ],
        keyHighlight: 'إيقاف RSA أو ECC فجأة على واجهة يستخدمها عملاء قدامى يؤدي إلى شلل توافرية الخدمة (Availability).',
        diagramTitle: 'نموذج ملف التشفير المؤسسي وخيارات المعالجة',
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'حوكمة الامتثال التشفيري والمراجعة الدورية',
        subtitle: 'توثيق القرار، التحقق من الوحدات المجازة، والتدقيق المستمر',
        bullets: [
          'يتطلب الامتثال الفيدرالي والمؤسسي توثيق مسوغات اختيار كل خوارزمية ومجموعة معلمات.',
          'حظر كتابة خوارزميات PQC يدوياً من الصفر؛ يجب استخدام مكتبات ووحدات مجازة رسمياً (FIPS Validated).',
          'إجراء اختبارات توافق وأداء في بيئة معزولة لقياس أثر أحجام المفاتيح الجديدة على الشبكة.',
          'جدولة مراجعة دورية لملف التشفير للتأكد من عدم تسلل خوارزميات متقادمة في التحديثات البرمجية.',
        ],
        keyHighlight: 'الوثيقة الهندسية المعتمدة يجب أن تسجل: الخوارزمية، مجموعة المعلمات، والمسوغ الفني والأمني للاختيار.',
        diagramTitle: 'دورة الامتثال والمراجعة الدورية لملف التشفير',
      },
    ],
    flashcards: [
      {
        front: 'ما الفرق بين النسخة (s) والنسخة (f) في معلمات معيار FIPS 205 (مثل SLH-DSA-128s مقابل SLH-DSA-128f)؟',
        back: 'الحرف (s - Small) ينتج توقيعاً أصغر حجماً (7856 بايت) لكنه أبطأ في الإنشاء، بينما الحرف (f - Fast) أسرع في إنشاء التوقيع لكن حجمه أكبر (17088 بايت).',
        category: 'FIPS 205',
      },
      {
        front: 'هل تمثل الأرقام 512 و 768 و 1024 في معيار ML-KEM (FIPS 203) طول المفتاح بالبت؟',
        back: 'لا؛ هذه الأرقام ترمز إلى مجموعات المعلمات وأبعاد المصفوفات الشبكية (رتبة الوحدة k = 2, 3, 4 مضروبة في 256)، بينما يبلغ طول المفتاح العام بالبايت 800 و 1184 و 1568 بايت.',
        category: 'FIPS 203',
      },
      {
        front: 'كم يبلغ حجم المفتاح العام في ML-DSA-44 (1312 بايت) مقارنة بحجم المفتاح العام في SLH-DSA-SHA2-128s (32 بايت)؟',
        back: 'يساوي 41 ضعفاً (1312 ÷ 32 = 41)، حيث يتميز SLH-DSA بمفتاح عام صغير جداً مقابل توقيع كبير.',
        category: 'مقارنة المعايير',
      },
      {
        front: 'ما هي المعايير الثلاثة النهائية التي أصدرها NIST في أغسطس 2024 وما وظيفة كل منها؟',
        back: '1. FIPS 203 (ML-KEM لتغليف المفاتيح)، 2. FIPS 204 (ML-DSA للتوقيع الرقمي الشبكي)، 3. FIPS 205 (SLH-DSA للتوقيع الرقمي عديم الحالة بالتجزئة).',
        category: 'معايير NIST',
      },
      {
        front: 'ما هي العناصر الثلاثة الواجب تسجيلها عند توثيق قرار اختيار خوارزمية تشفير جديدة للامتثال؟',
        back: '1. اسم الخوارزمية المعيارية، 2. مجموعة المعلمات المحددة (مثل ML-KEM-768)، 3. مسوغ الاختيار الفني المبني على فئة الأمان وقيود الأداء.',
        category: 'الامتثال والحوكمة',
      },
      {
        front: 'ما الإجراء الصحيح في ملف التشفير لخدمة خارجية تعمل بـ RSA-2048 وتتصل بها أنظمة عملاء قديمة لا تدعم PQC بعد؟',
        back: 'جدولة اختبار توافق وخطة انتقال مرحلية مع إشعار مسبق للعملاء قبل إيقاف RSA-2048، لتفادي قطع الخدمة المفاجئ.',
        category: 'إدارة الانتقال',
      },
    ],
    miniQuiz: [
      {
        question: 'كم يساوي حجم المفتاح العام لخوارزمية ML-DSA-44 (البالغ 1312 بايت) مقارنة بحجم المفتاح العام لخوارزمية SLH-DSA-SHA2-128s (البالغ 32 بايت)؟',
        options: ['ضعفين فقط', '10 أضعاف', '41 ضعفاً (1312 ÷ 32 = 41)', 'متساويان في الحجم'],
        correctIndex: 2,
        explanation:
          'بقسمة 1312 بايت على 32 بايت نحصل على 41 ضعفاً بالضبط، وهو ما يبرز صغر المفتاح العام في تواقيع التجزئة SLH-DSA.',
      },
      {
        question: 'إلى ماذا يشير الحرفان (s) و (f) في مجموعتي المعلمات SLH-DSA-SHA2-128s و SLH-DSA-SHA2-128f ضمن معيار FIPS 205؟',
        options: [
          's تشير إلى توقيع أصغر حجماً (Small) وأبطأ، بينما f تشير إلى توقيع أسرع إنشاءً (Fast) وأكبر حجماً',
          's للخوادم و f للهواتف فقط',
          's للتشفير المتماثل و f للتشفير المتجانس',
          'لا يوجد أي فرق بينهما في حجم التوقيع',
        ],
        correctIndex: 0,
        explanation:
          'صُممت مجموعات s لتقليل حجم التوقيع (7856 بايت) على حساب سرعة التوقيع، وصُممت مجموعات f لتسريع التوقيع مقابل حجم أكبر (17088 بايت).',
      },
      {
        question: 'أي مجموعة معلمات في معيار FIPS 203 (ML-KEM) تقابل فئة الأمان 5 (المكافئة لقوة AES-256)؟',
        options: ['ML-KEM-512', 'ML-KEM-768', 'ML-KEM-1024', 'ML-DSA-44'],
        correctIndex: 2,
        explanation:
          'تغطي ML-KEM-512 الفئة 1، وتغطي ML-KEM-768 الفئة 3، بينما تغطي ML-KEM-1024 الفئة 5 الأعلى أماناً.',
      },
      {
        question: 'عند فحص ملف التشفير المؤسسي، وُجدت «بوابة موظفين داخلية» ذات حساسية عالية جداً وتعمل بـ ECC P-256 وجميع متصفحات الموظفين محدثة وتدعم التبادل الهجين. ما القرار الهندسي الأمثل؟',
        options: [
          'الانتظار 10 سنوات دون تغيير',
          'تفعيل التبادل الهجين (ECC P-256 + ML-KEM-768) فوراً لحماية البيانات الحساسة من التسجيل والفك اللاحق',
          'الرجوع إلى RSA-1024',
          'إلغاء تشفير البوابة لتسريع التصفح',
        ],
        correctIndex: 1,
        explanation:
          'بما أن البيانات عالية الحساسية والأطراف الطرفية تدعم التبادل الهجين، فإن الترقية الفورية تحمي البوابة دون أي خطر على التوافق.',
      },
    ],
    richData: {
      id: 12,
      chapter_number: 12,
      title: 'دراسة معايير NIST الأخيرة الخاصة بالخوارزميات البديلة لـ RSA و ECC في العصر الكمي',
      subtitle: 'NIST FIPS 203, FIPS 204 & FIPS 205 Parameter Sets & Compliance',
      category: 'كمومي',
      pdfStartPage: 126,
      pdfEndPage: 133,
      description:
        'تفصيل معايير المعهد الوطني للمعايير والتقنية (FIPS 203 ML-KEM, FIPS 204 ML-DSA, FIPS 205 SLH-DSA)، مجموعات المعلمات وفئات الأمان، ملف التشفير المؤسسي، والامتثال.',
      objectives: [
        'تحليل مجموعات معلمات ML-KEM (512, 768, 1024) وفئات الأمان 1 و 3 و 5 في FIPS 203.',
        'مقارنة معلمات ML-DSA (44, 65, 87) في FIPS 204 ومعلمات SLH-DSA (النسخ s الصغيرة والنسخ f السريعة) في FIPS 205.',
        'إعداد ملف التشفير المؤسسي (Cryptographic Inventory Profile) وتحديد خطة التوافق.',
        'تطبيق متطلبات الامتثال وتوثيق القرار والتحقق من التنفيذ والمراجعة الدورية.',
      ],
      sections: [
        {
          heading: '12.2 و 12.3 معايير FIPS 203 و FIPS 204 و FIPS 205',
          content:
            'يحدد FIPS 203 خوارزمية ML-KEM بثلاث مجموعات معلمات (512 للفئة 1، 768 للفئة 3، 1024 للفئة 5). ويحدد FIPS 204 خوارزمية التوقيع الشبكية ML-DSA (44، 65، 87). بينما يحدد FIPS 205 خوارزمية التوقيع عديمة الحالة SLH-DSA بنسختين لكل فئة: الحرف (s) لتوقيع أصغر وأبطأ، والحرف (f) لتوقيع أسرع وأكبر.',
        },
        {
          heading: '12.4 و 12.5 الانتقال التشفيري وملف التشفير والامتثال',
          content:
            'يُبنى ملف التشفير المؤسسي بحصر كل خدمة وحساسية بياناتها والخوارزمية الحالية ودعم الطرف الآخر للبدائل الكمومية. ويتطلب الامتثال لمعايير FIPS توثيق مسوغات اختيار المعلمات، واجتياز برامج التحقق الرسمية التابعة لـ NIST، وإجراء مراجعة دورية.',
        },
      ],
      tables: [
        {
          title: 'جدول 12.1 و 12.2 و 12.3: معلمات وأحجام معايير NIST FIPS 203 / 204 / 205',
          headers: ['المعيار ومجموعة المعلمات', 'فئة الأمان', 'حجم المفتاح العام (بايت)', 'حجم النص المشفر / التوقيع (بايت)'],
          rows: [
            ['FIPS 203: ML-KEM-512', 'الفئة 1 (AES-128)', '800', '768'],
            ['FIPS 203: ML-KEM-768', 'الفئة 3 (AES-192)', '1184', '1088'],
            ['FIPS 203: ML-KEM-1024', 'الفئة 5 (AES-256)', '1568', '1568'],
            ['FIPS 204: ML-DSA-44', 'الفئة 2', '1312', '2420'],
            ['FIPS 204: ML-DSA-65', 'الفئة 3', '1952', '3309'],
            ['FIPS 204: ML-DSA-87', 'الفئة 5', '2592', '4627'],
            ['FIPS 205: SLH-DSA-SHA2-128s', 'الفئة 1 (توقيع أصغر)', '32', '7856'],
            ['FIPS 205: SLH-DSA-SHA2-128f', 'الفئة 1 (إنشاء أسرع)', '32', '17088'],
          ],
        },
      ],
      commonMistake: {
        mistake:
          'الظن بأن الأرقام (512, 768, 1024) في ML-KEM تمثل أطوال المفاتيح بالبت، أو استخدام مكتبة تشفير غير معتمدة في نظام حكومي حساس.',
        fix: 'الأرقام (512, 768, 1024) هي أسماء لمجموعات المعلمات (أبعاد المصفوفات الشبكية)، ويجب الالتزام بالوحدات المجازة رسمياً وفق FIPS.',
      },
      solvedExample: {
        title: 'تحليل ملف التشفير المؤسسي وتحديد الإجراء الانتقالي',
        given:
          'خدمتان في مؤسسة: (1) «بوابة الموظفين» بحساسية عالية جداً وتعمل بـ ECC P-256 والطرف الآخر يدعم التبادل الهجين، (2) «واجهة API للعملاء» بحساسية متوسطة وتعمل بـ RSA-2048 مع أنظمة عملاء قديمة.',
        steps: [
          '1. تقييم بوابة الموظفين: البيانات عالية الحساسية والأطراف محدثة ⟹ تفعيل تبادل مفاتيح هجين (ECC + ML-KEM-768) فوراً.',
          '2. تقييم واجهة API للعملاء: الأنظمة الطرفية قديمة لا تدعم البدائل الكمومية ⟹ جدولة اختبار توافق دقيق وخطة إشعار مسبق قبل إيقاف RSA-2048 لمنع انقطاع الخدمة.',
        ],
        result: 'حماية فورية لبوابة الموظفين مع ضمان استمرارية الأعمال لواجهة العملاء.',
        whyItMatters: 'يوازن بين الحماية ضد التهديدات الكمومية والحفاظ على توافرية الخدمات الحيوية.',
      },
      flashcards: [
        {
          front: 'ما الفرق بين المجموعتين 128s و 128f في خوارزمية SLH-DSA (FIPS 205)؟',
          back: 'الحرف (s) يشير إلى توقيع أصغر (7856 بايت) لكنه أبطأ في الإنشاء، بينما (f) يشير إلى توقيع أسرع في الإنشاء لكنه أكبر حجماً (17088 بايت).',
        },
        {
          front: 'ما هي العناصر الأساسية لتوثيق قرار تغيير خوارزمية التشفير؟',
          back: 'الخوارزمية المختارة، ومجموعة المعلمات (مثل ML-KEM-768)، ومسوغ الاختيار الفني المبني على فئة الأمان والأداء.',
        },
      ],
      selfAssessment: [
        {
          question: 'قارن بين معيار FIPS 204 ومعيار FIPS 205 من حيث الاستخدام.',
          answer:
            'FIPS 204 (ML-DSA) مبني على الشبكيات بأحجام متوازنة وسريع للاستخدام العام، بينما FIPS 205 (SLH-DSA) مبني على التجزئة وعديم الحالة بمفاتيح صغيرة جداً وتواقيع كبيرة يناسب تحديثات البرمجيات.',
        },
        {
          question: 'علّل أهمية المراجعة الدورية لملف التشفير في المؤسسة.',
          answer:
            'لضمان بقاء الأنظمة متوافقة مع أحدث المعايير، واكتشاف أي خوارزميات غير معتمدة أضيفت للشبكة، والتأكد من صلاحية شهادات الاعتماد.',
        },
      ],
      quiz: [
        {
          question:
            'كم يساوي حجم المفتاح العام لـ ML-DSA-44 (1312 بايت) مقارنة بمفتاح SLH-DSA-SHA2-128s (32 بايت)؟',
          options: ['ضعفين', '10 أضعاف', '41 ضعفاً', 'متساويان'],
          correctIndex: 2,
          explanation: '1312 ÷ 32 = 41 ضعفاً، حيث يتميز SLH-DSA بمفتاح عام صغير جداً (32 بايت فقط).',
        },
      ],
    },
    interactiveBook3D: {
      model3DType: 'module-lwe-lattice-grid',
      shaderEffect: 'crystalline-lattice-shader',
      sceneTitle: 'مجسم المعايير الثلاثة FIPS 203 / 204 / 205 وبانوراما المعلمات الكمومية',
      sceneDescription:
        'ثلاث منصات بلورية ثلاثية الأبعاد تمثل FIPS 203 (ML-KEM) و FIPS 204 (ML-DSA) و FIPS 205 (SLH-DSA)، مع مقارنة بصرية حية لأبعاد المصفوفات الشبكية وأحجام المفاتيح والتواقيع.',
      cameraPosition: { x: 0, y: 2.6, z: 7.2 },
      pages3D: [
        {
          pageNumber: 1,
          title: 'معيار تغليف المفاتيح الفيدرالي FIPS 203 (ML-KEM)',
          subtitle: 'المجموعات 512 (فئة 1) و 768 (فئة 3) و 1024 (فئة 5)',
          narrative:
            'يعمل ML-KEM داخل حلقة كثيرات الحدود R_q = Z_q[X]/(X^256 + 1) حيث تحدد رتبة المصفوفة k ∈ {2, 3, 4} مجموعة المعلمات 512 أو 768 أو 1024.',
          equation: 'R_q = \\mathbb{Z}_{3329}[X]/(X^{256}+1), \\quad \\text{Dim}(k) \\in \\{2\\to 512,\\; 3\\to 768,\\; 4\\to 1024\\}',
          liveGraphicType: 'nist-pqc-lattice-hash',
          liveGraphicCaption: 'تدرج أبعاد مصفوفة ML-KEM من k=2 (512) إلى k=4 (1024)',
          visualNotes: [
            'الأرقام 512/768/1024 هي=256×k وليست طول المفتاح بالبت.',
            'ML-KEM-768 هو الاختيار الافتراضي الموصى به مؤسسياً.',
          ],
        },
        {
          pageNumber: 2,
          title: 'معيارا التوقيع الرقمي: FIPS 204 (ML-DSA) و FIPS 205 (SLH-DSA)',
          subtitle: 'مقارنة الشبكيات مع أشجار التجزئة عديمة الحالة (s vs f)',
          narrative:
            'يوفر ML-DSA تواقيع سريعة ومتوازنة (2420–4627 بايت)، بينما يمنح SLH-DSA مفتاحاً عاماً متناهي الصغر (32 بايت) مع خيارين للتوقيع: الصغير 128s (7856B) أو السريع 128f (17088B).',
          equation: '\\frac{|pk_{\\text{ML-DSA-44}}|}{|pk_{\\text{SLH-DSA-128s}}|} = \\frac{1312}{32} = 41\\times',
          liveGraphicType: 'nist-pqc-lattice-hash',
          liveGraphicCaption: 'مقارنة حجم المفتاح العام والتوقيع بين ML-DSA و SLH-DSA (128s / 128f)',
          visualNotes: [
            'SLH-DSA عديم الحالة (Stateless) فلا يحتاج لتتبع عداد التواقيع.',
            'ML-DSA-65 يحقق فئة الأمان 3 لتوقيعات الشهادات المؤسسية.',
          ],
        },
        {
          pageNumber: 3,
          title: 'ملف التشفير المؤسسي وحوكمة الامتثال (Compliance)',
          subtitle: 'من الجرد إلى الترقية الهجينة والمراجعة الدورية',
          narrative:
            'تُصنف كل خدمة حسب الحساسية وجاهزية الأطراف لتحديد مسار الترقية الفورية أو المرحلية، مع توثيق مسوغات الاختيار واستخدام وحدات مجازة.',
          equation: '\\text{Decision} = f(\\text{DataSensitivity},\\; \\text{PeerPQCReadiness},\\; \\text{BandwidthLimit})',
          liveGraphicType: 'nist-pqc-lattice-hash',
          liveGraphicCaption: 'لوحة تحكم ملف التشفير المؤسسي ومؤشرات الامتثال لـ FIPS',
          visualNotes: [
            'بوابة الموظفين المحدثة -> ترقية هجينة فورية.',
            'واجهة API لعملاء قدامى -> خطة توافق وإشعار مسبق.',
          ],
        },
      ],
      stepByStep: [
        {
          step: 1,
          title: 'بناء ملف التشفير المؤسسي (Cryptographic Inventory)',
          description:
            'حصر جميع الأنظمة والبروتوكولات وتصنيف حساسية بياناتها وجاهزية الأنظمة المقابلة.',
          formula: '\\text{Inventory} = \\{(\\text{Service}_i,\\; \\text{CurrentAlg}_i,\\; \\text{Sensitivity}_i,\\; \\text{ClientSupport}_i)\\}',
          visualState: 'مسح ضوئي شامل للبنية المؤسسية وإظهار بطاقات الخدمات.',
          securityNote: 'لا يمكن حماية ما لا تعرف وجوده؛ الجرد هو الخطوة الأولى دائماً.',
        },
        {
          step: 2,
          title: 'اختيار مجموعة معلمات FIPS 203 و FIPS 204/205 المناسبة',
          description:
            'اعتماد ML-KEM-768 و ML-DSA-65 (الفئة 3) للخدمات المؤسسية، و SLH-DSA-128s لتوقيع البرمجيات الثابتة.',
          formula: '\\text{TLS KeyEx} \\leftarrow \\text{X25519MLKEM768}, \\quad \\text{CertSign} \\leftarrow \\text{ML-DSA-65}',
          visualState: 'تركيب البلورات الثلاث في مواقعها المعمارية المناسبة.',
          securityNote: 'توثيق مسوغ الاختيار الفني شرط أساسي لاجتياز تدقيق الامتثال.',
        },
        {
          step: 3,
          title: 'التحقق من اعتماد المكتبات (FIPS CMVP Validation)',
          description:
            'التأكد من أن الوحدات التشفيرية المستخدمة مجازة رسمياً وتجتاز متجهات الاختبار القياسية لـ NIST.',
          formula: '\\text{ModuleStatus} \\in \\text{NIST CMVP Validated List}',
          visualState: 'ختم الوحدات البرمجية والعتادية بشارة التحقق الذهبية.',
          securityNote: 'يُحظر نشر تطبيقات تجريبية غير معتمدة في البيئات الحكومية والمالية.',
        },
        {
          step: 4,
          title: 'النشر المرحلي والمراجعة الدورية لملف التشفير',
          description:
            'تفعيل الهجين للأنظمة الجاهزة، وجدولة ترقية العملاء القدامى، وإجراء فحص دوري لاكتشاف أي خوارزميات متقادمة.',
          formula: '\\text{PeriodicAudit}(t + \\Delta T) \\implies \\text{Zero Deprecated Algorithms}',
          visualState: 'تحول جميع عقد الشبكة إلى اللون الأخضر الآمن كمومياً.',
          securityNote: 'الرشاقة التشفيرية تضمن سلاسة التحديث عند صدور معايير إضافية.',
        },
      ],
      hotspots: [
        {
          id: 'nist-fips203-pillar',
          label: 'منصة FIPS 203 (ML-KEM 512/768/1024)',
          coordinates: { x: -1.9, y: 1.1, z: 0.8 },
          color: '#10b981',
          title: 'المعيار الأساسي لتغليف المفاتيح الشبكي',
          detailedExplanation:
            'يوفر ثلاث فئات أمان (1، 3، 5) بأحجام مفاتيح عامة (800، 1184، 1568 بايت) وسرعة عالية جداً في التوليد والتغليف وفك التغليف.',
          relatedEquation: '\\text{ML-KEM-768}: |pk|=1184\\text{B},\\; |ct|=1088\\text{B}',
          securityImpact: 'البديل الرسمي لتبادل مفاتيح RSA و ECDH في TLS 1.3 و IPsec.',
        },
        {
          id: 'nist-fips204-pillar',
          label: 'منصة FIPS 204 (ML-DSA 44/65/87)',
          coordinates: { x: 0.0, y: 1.3, z: 1.0 },
          color: '#3b82f6',
          title: 'المعيار الأساسي للتوقيع الرقمي الشبكي',
          detailedExplanation:
            'يغطي فئات الأمان (2، 3، 5) بأحجام تواقيع متوازنة (2420، 3309، 4627 بايت)، ويُعد الخيار الأول لشهادات PKI والمصادقة.',
          relatedEquation: '\\text{ML-DSA-44}: |pk|=1312\\text{B},\\; |\\sigma|=2420\\text{B}',
          securityImpact: 'يستبدل تواقيع ECDSA و RSA في الشهادات الرقمية المؤسسية.',
        },
        {
          id: 'nist-fips205-pillar',
          label: 'منصة FIPS 205 (SLH-DSA 128s / 128f)',
          coordinates: { x: 1.9, y: 0.9, z: 0.8 },
          color: '#a855f7',
          title: 'التوقيع عديم الحالة القائم على التجزئة',
          detailedExplanation:
            'يتميز بمفتاح عام صغير جداً (32 بايت) وأمان مستند حصرياً لدوال التجزئة، مع خيار التوقيع الصغير (s: 7856B) أو السريع (f: 17088B).',
          relatedEquation: '|pk_{\\text{SLH-DSA-128}}| = 32\\text{B}, \\quad |\\sigma_{128s}| = 7856\\text{B}',
          securityImpact: 'خط دفاع احتياطي مستقل تماماً عن رياضيات الشبكيات.',
        },
        {
          id: 'nist-inventory-matrix',
          label: 'سجل ملف التشفير المؤسسي (Crypto Inventory)',
          coordinates: { x: 0.0, y: -1.5, z: 1.1 },
          color: '#f59e0b',
          title: 'أداة حوكمة الانتقال التشفيري والامتثال',
          detailedExplanation:
            'يوثق كل خدمة، والخوارزمية المختارة، ومجموعة المعلمات، ومسوغ الاختيار، وخطة التوافق مع الأنظمة الطرفية القديمة.',
          relatedEquation: '\\text{Compliance} = \\text{DocumentedRationale} \\land \\text{ValidatedModule} \\land \\text{PeriodicReview}',
          securityImpact: 'يمنع انقطاع الخدمات أثناء الترقية ويضمن الامتثال للجهات التنظيمية.',
        },
      ],
    },
    updated_at: 1730937600000,
  },

  // =========================================================================
  // الفصل الثالث عشر: المشروع التراكمي التطبيقي الشامل (تأمين منصة «صحة تك» SehaTech الوطنية)
  // =========================================================================
  {
    id: 13,
    chapter_number: 13,
    title: 'المشروع التراكمي التطبيقي الشامل (تأمين منصة «صحة تك» SehaTech الوطنية)',
    subtitle: 'Capstone Cryptographic Architecture Design Document for SehaTech Telemedicine Platform & 21-Point Rubric',
    description:
      'تطبيق شامل لجميع فصول المقرر الـ 12 لصياغة «وثيقة تصميم البنية التشفيرية» لمنصة الطب الاتصالي الناشئة في الرياض «صحة تك» (SehaTech) عبر 6 مراحل تنفيذية مع أدلة التنفيذ (Nginx/OpenSSL) وروبرك التقييم من 21 نقطة.',
    category: 'تطبيقي',
    difficulty: 'advanced',
    pdfStartPage: 134,
    pdfEndPage: 142,
    diagramKey: 'ise243-13',
    diagramDescription:
      'مخطط معماري شامل لمنظومة التشفير في منصة «صحة تك» (SehaTech) يربط المراحل الست: تصنيف البيانات، تواقيع ECDSA وتبادل ECDH، بوابة TLS 1.3 و VPN، قواعد البيانات و HSM، الخصوصية بـ HE/ZKP، والجاهزية الكمومية الهجينة.',
    videoUrl: 'https://www.youtube.com/watch?v=86cQJ0MMses',
    videoTitle: 'شرح المشروع التراكمي الشامل: هندسة التشفير لمنصة الرعاية الصحية «صحة تك» SehaTech',
    videoDuration: '25:40',
    presentationUrl: `${TEXTBOOK_PDF_PATH}#page=134`,
    keyTopics: [
      'المراحل الست لوثيقة تصميم البنية التشفيرية (Cryptographic Architecture Design Document)',
      'إعدادات خادم Nginx لـ TLS 1.3 حصرياً ومنحنى prime256v1 وتفعيل ssl_prefer_server_ciphers off للهواتف',
      'خطة الاستعادة الفورية عند الاشتباه باختراق الخادم والتحقق برقم التنبيه SSL alert number 70',
      'خطة التوافق والانتقال لمدة 6 أشهر للأجهزة القديمة للمرضى دون حرمانهم من الرعاية الصحية',
      'توظيف التشفير المتجانس (HE) وبراهين المعرفة الصفرية (ZKP) ووحدة HSM ومقاومة القنوات الجانبية في المنصة',
      'روبرك التقييم الهندسي الذاتي (7 معايير × 3 نقاط = 21 نقطة، والحد الأدنى للنجاح 14 نقطة)',
    ],
    content: `# الفصل الثالث عشر: المشروع التطبيقي التراكمي — تصميم البنية التشفيرية لمنصة «صحة تك» (SehaTech)

## 13.1 سيناريو المشروع والمراحل التنفيذية الست
تأسست شركة **«صحة تك» (SehaTech)** في مدينة الرياض لتطوير منصة طب اتصالي وطنية تربط المرضى بالأطباء والمختبرات وشركات التأمين. مهمتك بصفتك مهندس التشفير الرئيس صياغة **«وثيقة تصميم البنية التشفيرية» (Cryptographic Architecture Design Document)** عبر **ست مراحل متكاملة** تغطي الفصول الـ 12 السابقة:
1. **المرحلة الأولى (الفصل 1 — تصنيف الأصول):** جرد الأصول (السجلات الطبية، الوصفات، الفواتير، قائمة الأطباء) وتحديد متطلبات السرية والسلامة والأصالة. *تنبيه:* تصنيف «قائمة الأطباء» كمنخفضة الحساسية للسرية لا يعفيها من حماية الاتصال بـ TLS 1.3 لضمان **السلامة (Integrity)** ومنع توجيه المريض لطبيب منتحل!
2. **المرحلة الثانية (الفصل 2 و 3 — المفتاح العام):** اعتماد منحنى \`secp256r1 (P-256)\` لتبادل المفاتيح \`ECDH\` وتوقيع الوصفات الطبية بـ \`ECDSA\` حتمي (\`RFC 6979\`) مع فصل مفاتيح الاستخدام.
3. **المرحلة الثالثة (الفصل 4 و 5 — أمن النقل والشبكات):** فرض \`TLS 1.3\` حصرياً لواجهات المرضى (\`api.sehatech.sa\`)، ونفق \`IPsec IKEv2\` لربط المستشفيات، و \`WireGuard / OpenVPN\` للإدارة عن بُعد مع مفتاح القطع \`Kill Switch\`.
4. **المرحلة الرابعة (الفصل 6 و 9 — البيانات الساكنة و HSM):** تشفير الأقراص بـ \`XTS-AES\`، وتشغيل \`TDE\`، وتشفير رقم الهوية حتمياً وفصيلة الدم عشوائياً والتشخيص الطبي على مستوى التطبيق (\`AES-GCM\`)، وحفظ المفتاح الرئيس داخل وحدة \`HSM (FIPS 140-3 Level 4)\` مع سيطرة مشتركة وفصل مهام.
5. **المرحلة الخامسة (الفصل 7 و 8 و 10 — الخصوصية والقنوات الجانبية):** استخدام التشفير المتجانس الجزئي (\`PHE Paillier\`) لحساب إحصاءات الأمراض للوزارة دون كشف سجلات المرضى، وبرهان المعرفة الصفرية (\`ZKP\`) لإثبات سريان التغطية التأمينية للمريض دون كشف تفاصيل بوليصته، وإلزام الكود ثابت الزمن (\`Constant-Time\`) في خوادم المصادقة.
6. **المرحلة السادسة (الفصل 11 و 12 — الجاهزية لما بعد الكم):** بناء ملف التشفير والانتقال الهجين نحو معايير **NIST FIPS 203 (\`ML-KEM-768\`)** و **FIPS 204 (\`ML-DSA-65\`)** و **FIPS 205 (\`SLH-DSA-128s\`)**.

---page---

## 13.2 أدلة التنفيذ التقنية (Nginx & OpenSSL) وخطة التوافق والاستعادة
\`\`\`nginx
server {
    listen 443 ssl;
    server_name api.sehatech.sa;

    ssl_certificate     /etc/ssl/certs/sehatech_cert.pem;
    ssl_certificate_key /etc/ssl/private/sehatech_private.pem;

    # قصر الاتصال حصرياً على بروتوكول TLS 1.3
    ssl_protocols TLSv1.3;

    # حزم التشفير الموثق AEAD المعتمدة
    ssl_conf_command Ciphersuites TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256;

    # المنحنى الإهليلجي الإلزامي P-256
    ssl_ecdh_curve prime256v1;

    # احترام تفضيل العميل لتمكين الهواتف القديمة من اختيار ChaCha20-Poly1305 توفيراً للبطارية
    ssl_prefer_server_ciphers off;
}
\`\`\`
- **أدلة التحقق بـ OpenSSL:**
  1. اختبار نجاح TLS 1.3: \`openssl s_client -connect api.sehatech.sa:443 -tls1_3\`
  2. إثبات رفض TLS 1.2: \`openssl s_client -connect api.sehatech.sa:443 -tls1_2\` والتأكد من ظهور **\`SSL alert number 70 (protocol_version)\`**.
- **خطة التوافق مع الهواتف القديمة للمرضى (6 أشهر):** عدم قطع الخدمة فجأة؛ بل توفير بوابة ويب معزولة مؤقتة وإشعار المرضى لمدة 6 أشهر لترقية أجهزتهم.
- **خطة الاستعادة الفورية عند الاشتباه باختراق الخادم:** توليد زوج مفاتيح جديد داخل HSM ← إصدار CSR وشهادة جديدة ← إبطال الشهادة القديمة عبر OCSP/CRL ← تدوير مفاتيح الجلسات قسرياً.

---page---

## 13.3 روبرك تقييم المشروع التطبيقي التراكمي (21 نقطة — حد النجاح 14 نقطة)
| المعيار الهندسي (من 7 معايير) | ممتاز (3 نقاط) | مقبول (نقطتان) | ضعيف (نقطة واحدة) |
| :--- | :--- | :--- | :--- |
| **1. جرد الأصول وتصنيف البيانات (م1)** | يربط كل أصل بهدف تشفيري دقيق بناءً على تصنيف واضح للحساسية | يصنف البيانات بشكل عام دون تحديد دقيق لأهداف الحماية | جرد تقني عام يتجاهل تصنيف الحساسية |
| **2. دقة اختيار الخوارزميات و HSM (م2، م4)** | يحدد ECC ويشترط وحدة HSM مع تحديد دورة حياة المفاتيح بالكامل | يحدد خوارزميات مقبولة دون تفصيل لآليات العزل أو HSM | يختار خوارزميات قديمة أو يترك المفاتيح مدمجة في الشفرة |
| **3. أمن الشبكات والخصوصية (م3، م5)** | يصمم إعدادات TLS/VPN دقيقة ويوظف HE/ZKP مع سجل مخاطر شامل | يحدد بروتوكولات الشبكة وتقنيات الخصوصية نظرياً فقط | يكتفي بذكر الأسماء دون إعدادات ويتجاهل سجل المخاطر |
| **4. بدائل التصميم واختبار التوافق** | يحلل البدائل المرفوضة فنياً ويضع خطة انتقال واضحة لا تحرم المرضى | يذكر بدائل دون تحليل عميق أو خطة توافق سطحية | يفرض تصميماً واحداً ويتجاهل أثر التحديثات على الأجهزة القديمة |
| **5. أدلة التنفيذ والتطبيق** | يقدم أمثلة تكوين دقيقة وواقعية (Nginx, OpenSSL) تدعم كل قرار | أمثلة عامة أو غير مكتملة | شرح نظري دون أي أدلة تنفيذ تقنية |
| **6. الجاهزية المستقبلية للكم (م6)** | خطة انتقال واضحة مستندة صراحة إلى NIST FIPS 203, 204, 205 | يذكر التهديد الكمومي دون تحديد المعايير النهائية المعتمدة | يتجاهل التهديدات الكمومية تماماً |
| **7. العمل الجماعي وتناسق الوثيقة** | وثيقة متماسكة بلا تعارض فني بين المراحل ومصطلحات موحدة | تعارض طفيف بين بعض المراحل | تعارض جوهري بين المراحل وغياب التنسيق |`,
    images: [
      {
        prompt: 'Cryptographic agility assessment, hybrid classical quantum protocols, enterprise architecture, 16:9',
        caption: 'المعمارية التشفيرية المتكاملة لمنصة الرعاية الصحية الرقمية «صحة تك» (SehaTech)',
        alt: 'Cryptographic agility assessment and enterprise architecture',
        seed: 131,
        isAIGenerated: true,
      },
      {
        prompt: 'End to end post quantum cybersecurity deployment, 16:9',
        caption: 'تكامل المراحل الست من TLS 1.3 و HSM إلى الخصوصية بـ ZKP/HE والجاهزية الكمومية FIPS 203/204/205',
        alt: 'End to end post quantum cybersecurity deployment',
        seed: 132,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'نظرة شاملة على مشروع «صحة تك» (SehaTech) ومراحله الست',
        subtitle: 'تحويل المعرفة النظرية من 12 فصلاً إلى وثيقة معمارية تنفيذية',
        bullets: [
          'صحة تك منصة طب اتصالي في الرياض تعالج سجلات طبية ووصفات إلكترونية وبيانات تأمين.',
          'المرحلة 1 و 2: تصنيف الأصول واعتماد ECC P-256 لتبادل ECDH وتواقيع ECDSA للوصفات.',
          'المرحلة 3 و 4: تأمين النقل بـ TLS 1.3 و VPN، وتأمين السكون بـ FDE/TDE/App ووحدة HSM.',
          'المرحلة 5 و 6: إحصاءات مشفرة بـ HE وأهلية تأمين بـ ZKP، وخارطة انتقال كمومي FIPS 203/204/205.',
        ],
        keyHighlight: 'تقتصر الوثيقة على هندسة التشفير المبررة رياضياً وتقنياً دون التشتت في سياسات تقنية المعلومات العامة.',
        diagramTitle: 'خارطة المراحل الست لمشروع منصة صحة تك',
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'تصنيف الأصول الطبية وهندسة الخوارزميات (المرحلة 1 و 2)',
        subtitle: 'لماذا نحمي حتى البيانات منخفضة السرية عبر TLS 1.3؟',
        bullets: [
          'التشخيص الطبي والوصفات: سرية عالية جداً + سلامة + عدم إنكار بتوقيع الطبيب (ECDSA).',
          'قائمة الأطباء والتخصصات: سرية منخفضة (بيانات عامة)، لكن سلامتها (Integrity) حرجة جداً.',
          'إهمال تشفير اتصال قائمة الأطباء يسمح لمهاجم MITM بتزوير القائمة وتوجيه المريض لجهة خبيثة.',
          'توقيع الوصفات الطبية يستخدم ECDSA حتمي (RFC 6979) داخل HSM لمنع تكرار الـ Nonce.',
        ],
        keyHighlight: 'انخفاض متطلب السرية لا يلغي أبداً متطلب السلامة والأصالة (Integrity & Authenticity).',
        diagramTitle: 'مصفوفة تصنيف أصول منصة صحة تك',
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'أدلة تنفيذ TLS 1.3 في Nginx وخطة التوافق والاستعادة (المرحلة 3)',
        subtitle: 'إعدادات الخادم الحقيقية واختبار SSL alert number 70',
        bullets: [
          'فرض ssl_protocols TLSv1.3; ومنحنى prime256v1 ومجموعات AES-GCM و ChaCha20-Poly1305.',
          'ضبط ssl_prefer_server_ciphers off; ليسمح للهواتف القديمة باختيار ChaCha20 توفيراً للبطارية.',
          'التحقق عبر OpenSSL من رفض TLS 1.2 بظهور التنبيه SSL alert number 70 (protocol_version).',
          'خطة انتقال لمدة 6 أشهر مع بوابة ويب بديلة للمرضى ذوي الهواتف القديمة، وخطة استعادة فورية عند الاختراق.',
        ],
        keyHighlight: 'احترام تفضيل العميل (ssl_prefer_server_ciphers off) يطيل عمر بطارية هواتف المرضى دون المساس بالأمان.',
        diagramTitle: 'ملف إعداد Nginx وأوامر التحقق بـ OpenSSL',
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'حماية قاعدة البيانات، HSM، والخصوصية المتقدمة (المرحلة 4 و 5)',
        subtitle: 'التكامل بين التشفير الطبقى و HE و ZKP ومقاومة القنوات الجانبية',
        bullets: [
          'رقم الهوية: تشفير عمود حتمي للبحث؛ فصيلة الدم: تشفير عمود عشوائي؛ التشخيص: تشفير تطبيق AES-GCM.',
          'المفتاح الرئيس داخل HSM (FIPS 140-3 Level 4) مع سيطرة مشتركة، وتدوير DEK مع حفظ القديم كـ «معطل».',
          'التشفير المتجانس الجمعي (Paillier PHE) لحساب إحصاءات الأمراض دون كشف بيانات المرضى.',
          'برهان المعرفة الصفرية (ZKP) لإثبات أهلية التأمين الطبي للمريض دون كشف راتبه أو تفاصيل بوليصته.',
        ],
        keyHighlight: 'تجمع المنصة بين سرية السكون (TDE/App/HSM) وخصوصية المعالجة السحابية (PHE/ZKP).',
        diagramTitle: 'معمارية قاعدة البيانات والخصوصية في صحة تك',
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'الجاهزية الكمومية (المرحلة 6) وروبرك التقييم من 21 نقطة',
        subtitle: 'كيف تضمن الحصول على الدرجة الكاملة في تقييم الوثيقة؟',
        bullets: [
          'حماية السجلات الطبية طويلة العمر من هجوم «سجل الآن وفك لاحقاً» عبر التبادل الهجين (P-256 + ML-KEM-768).',
          'اعتماد الأسماء الرسمية النهائية: FIPS 203 (ML-KEM)، FIPS 204 (ML-DSA)، و FIPS 205 (SLH-DSA).',
          'يتكون روبرك التقييم من 7 معايير هندسية × 3 نقاط لكل معيار = 21 نقطة كحد أقصى.',
          'الحد الأدنى للنجاح هو 14 نقطة من 21، ويشترط خلو الوثيقة من أي تعارض فني بين المراحل.',
        ],
        keyHighlight: 'المراجعة الذاتية قبل التسليم تضمن تحديد فترات صلاحية المفاتيح واستخدام مسميات NIST النهائية.',
        diagramTitle: 'معايير روبرك التقييم السبعة (21 نقطة)',
      },
    ],
    flashcards: [
      {
        front: 'لماذا يُضبط الخيار ssl_prefer_server_ciphers على off في خادم Nginx لمنصة «صحة تك»؟',
        back: 'لاحترام تفضيل جهاز العميل بحيث تتمكن الهواتف الذكية القديمة التي تفتقر لتسريع AES العتادي من اختيار ChaCha20-Poly1305 توفيراً للبطارية والمعالج.',
        category: 'تكوين Nginx',
      },
      {
        front: 'ماذا يعني ظهور رسالة الخطأ SSL alert number 70 عند اختبار خادم «صحة تك» بأمر OpenSSL مع الخيار -tls1_2؟',
        back: 'يعني تنبيه protocol_version، وهو دليل تنفيذي قاطع على أن الخادم رفض الاتصال ببروتوكول TLS 1.2 القديم وأنه محصن ضد هجمات خفض الإصدار.',
        category: 'أدلة التحقق',
      },
      {
        front: 'لماذا يجب تشفير اتصال «قائمة الأطباء» عبر TLS 1.3 رغم أنها مصنفة كبيانات عامة منخفضة السرية؟',
        back: 'لضمان سلامة البيانات (Integrity) ومصادقة المصدر، ومنع مهاجم الرجل في الوسط من تعديل القائمة وتوجيه المريض إلى جهة منتحلة خبيثة.',
        category: 'تصنيف الأصول',
      },
      {
        front: 'ما هي خطوات خطة الاستعادة الفورية عند الاشتباه باختراق خادم الواجهة البرمجية لمنصة «صحة تك»؟',
        back: '1. توليد زوج مفاتيح EC جديد داخل HSM، 2. إصدار CSR وشهادة جديدة، 3. إبطال الشهادة القديمة وتحديث OCSP، 4. تدوير مفاتيح الجلسات النشطة قسرياً.',
        category: 'الاستجابة للحوادث',
      },
      {
        front: 'كيف توظف منصة «صحة تك» كلاً من التشفير المتجانس (HE) وبرهان المعرفة الصفرية (ZKP)؟',
        back: 'تستخدم PHE الجمعي لجمع إحصاءات الحالات الصحية سحابياً دون كشف بيانات المرضى، وتستخدم ZKP لإثبات سريان التأمين الطبي أو أهلية العمر دون كشف الوثيقة الأصلية.',
        category: 'الخصوصية المتقدمة',
      },
      {
        front: 'كم تبلغ الدرجة الكلية ودرجة النجاح الدنيا في روبرك تقييم المشروع التراكمي لمنصة «صحة تك»؟',
        back: 'الدرجة الكلية 21 نقطة موزعة على 7 معايير (3 نقاط لكل معيار)، والحد الأدنى لاجتياز المشروع هو 14 نقطة.',
        category: 'تقييم المشروع',
      },
    ],
    miniQuiz: [
      {
        question: 'كم يبلغ الحد الأدنى للنجاح من أصل 21 نقطة في روبرك تقييم المشروع التطبيقي التراكمي لمنصة «صحة تك»؟',
        options: ['10 نقاط', '12 نقطة', '14 نقطة (من أصل 21 نقطة موزعة على 7 معايير)', '20 نقطة'],
        correctIndex: 2,
        explanation:
          'يتكون الروبرك من 7 معايير هندسية، لكل معيار 3 نقاط كحد أقصى (المجموع 21 نقطة)، والحد الأدنى للنجاح هو 14 نقطة.',
      },
      {
        question: 'عند اختبار خادم api.sehatech.sa بالأمر `openssl s_client -connect api.sehatech.sa:443 -tls1_2`، أي رمز تنبيه يثبت نجاح الخادم في رفض الإصدار القديم؟',
        options: [
          'SSL alert number 70 (protocol_version)',
          'HTTP 200 OK',
          'SSL alert number 0 (close_notify)',
          'DNS timeout',
        ],
        correctIndex: 0,
        explanation:
          'ظهور SSL alert number 70 يؤكد أن الخادم يرفض التفاوض على بروتوكول TLS 1.2 ويلتزم حصرياً بـ TLS 1.3.',
      },
      {
        question: 'ما الغرض الهندسي من وضع خطة انتقال لمدة 6 أشهر مع بوابة ويب بديلة عند فرض TLS 1.3 في منصة «صحة تك»؟',
        options: [
          'تأجيل التشفير إلى أجل غير مسمى',
          'ضمان التوافق وعدم حرمان المرضى أصحاب الهواتف القديمة من الرعاية الصحية ريثما يحدثون أجهزتهم',
          'تقليل حجم قاعدة البيانات',
          'إلغاء الحاجة لوحدة HSM',
        ],
        correctIndex: 1,
        explanation:
          'توازن الهندسة التشفيرية الناجحة بين الأمان العالي وتوافرية الخدمة الإنسانية للمرضى عبر مسار انتقالي آمن لمدة 6 أشهر.',
      },
      {
        question: 'أي خطأ مما يلي يؤدي إلى خصم درجات في المعيار السادس (الجاهزية المستقبلية للكم) من روبرك المشروع؟',
        options: [
          'الاستناد الصريح إلى معايير NIST FIPS 203 و 204 و 205',
          'الاكتفاء بذكر الخطر الكمومي نظرياً أو استخدام أسماء مسودات قديمة غير معتمدة دون تحديد ML-KEM و ML-DSA و SLH-DSA',
          'تفعيل التبادل الهجين للبيانات الطبية طويلة العمر',
          'إعداد جدول جرد الأصول التشفيرية',
        ],
        correctIndex: 1,
        explanation:
          'يشترط مستوى «ممتاز (3 نقاط)» في المعيار السادس بناء خطة انتقال واضحة تستند صراحة إلى المعايير النهائية FIPS 203 (ML-KEM) و FIPS 204 (ML-DSA) و FIPS 205 (SLH-DSA).',
      },
    ],
    richData: {
      id: 13,
      chapter_number: 13,
      title: 'المشروع التطبيقي التراكمي: تصميم البنية التشفيرية لمنصة «صحة تك» (SehaTech)',
      subtitle: 'Capstone Cryptographic Architecture Design Document & 21-Point Rubric',
      category: 'تطبيقي',
      pdfStartPage: 134,
      pdfEndPage: 142,
      description:
        'تطبيق شامل لجميع فصول المقرر الـ 12 لصياغة «وثيقة تصميم البنية التشفيرية» لمنصة الطب الاتصالي الناشئة في الرياض «صحة تك» (SehaTech) عبر 6 مراحل تنفيذية مع أدلة التنفيذ (Nginx/OpenSSL) وروبرك التقييم.',
      objectives: [
        'بناء المراحل الست لوثيقة تصميم البنية التشفيرية لمنصة الرعاية الصحية الرقمية «صحة تك».',
        'صياغة إعدادات خادم Nginx وأوامر OpenSSL لتأمين الاتصالات بـ TLS 1.3 حصرياً ومنحنى P-256.',
        'تصميم خطة الاستعادة الفورية عند الاشتباه باختراق الخادم وخطة الانتقال ذات الـ 6 أشهر للأجهزة القديمة.',
        'تقييم الوثيقة ذاتياً مقابل روبرك التقييم المكون من 7 معايير (21 نقطة، حد النجاح 14 نقطة).',
      ],
      sections: [
        {
          heading: '13.1 و 13.2 الهدف ومراحل المشروع التشفيري الست لمنصة «صحة تك»',
          content:
            'تأسست شركة «صحة تك» (SehaTech) في الرياض لتطوير منصة طب اتصالي. ينقسم بناء وثيقة التصميم إلى 6 مراحل: (1) تحليل الأصول وتصنيف البيانات (الفصل 1)، (2) اختيار الخوارزميات والتواقيع ECC/ECDSA/ECDH (الفصل 2 و 3)، (3) تأمين البيانات أثناء النقل TLS 1.3 و VPN (الفصل 4 و 5)، (4) تأمين البيانات في السكون وإدارة المفاتيح بـ HSM (الفصل 6 و 9)، (5) الخصوصية المتقدمة بـ HE و ZKP وتحليل مخاطر القنوات الجانبية (الفصل 7 و 8 و 10)، (6) الجاهزية المستقبلية لما بعد الكم وفق FIPS 203/204/205 (الفصل 11 و 12).',
        },
        {
          heading: '13.3 مثال تطبيقي محلول: مرحلة تأمين الاتصالات وأدلة التنفيذ',
          content:
            'تُعتمد بنية تعتمد حصرياً على TLS 1.3 مع احترام تفضيل العميل (ssl_prefer_server_ciphers off) لتمكين الهواتف القديمة من اختيار ChaCha20-Poly1305 توفيراً للبطارية، مع منحنى prime256v1 (secp256r1). وتُوضع خطة انتقال بإشعار مسبق 6 أشهر وبوابة ويب بديلة.',
        },
        {
          heading: '13.4 و 13.5 معايير التقييم (الروبرك من 21 نقطة) والتحقق الذاتي',
          content:
            'تُقيّم الوثيقة عبر 7 معايير (لكل معيار 3 نقاط: ممتاز 3، مقبول 2، ضعيف 1). الحد الأدنى للنجاح 14 نقطة من 21. ويضمن التحقق الذاتي سد الفجوات مثل تحديد فترة صلاحية المفاتيح واعتماد أسماء معايير NIST النهائية (ML-KEM, ML-DSA, SLH-DSA).',
        },
      ],
      tables: [
        {
          title: 'جدول 13.1: روبرك تقييم المشروع التطبيقي التراكمي (الدرجة الكلية: 21 نقطة)',
          headers: ['المعيار الهندسي', 'ممتاز (3 نقاط)', 'مقبول (نقطتان)', 'ضعيف (نقطة واحدة)'],
          rows: [
            ['1. جرد الأصول وتصنيف البيانات (م1)', 'يربط كل أصل بهدف تشفيري دقيق بناء على تصنيف واضح للحساسية', 'يصنف البيانات بشكل عام دون تحديد دقيق لأهداف الحماية', 'جرد تقني عام يتجاهل تصنيف الحساسية'],
            ['2. دقة اختيار الخوارزميات و HSM (م2، م4)', 'يحدد ECC ويشترط وحدة HSM مع تحديد دورة حياة المفاتيح بالكامل', 'يحدد خوارزميات مقبولة دون تفصيل لآليات العزل أو HSM', 'يختار خوارزميات قديمة أو يترك المفاتيح مدمجة في الشفرة'],
            ['3. أمن الشبكات والخصوصية (م3، م5)', 'يصمم إعدادات TLS/VPN دقيقة ويوظف HE/ZKP مع سجل مخاطر شامل', 'يحدد بروتوكولات الشبكة وتقنيات الخصوصية نظرياً فقط', 'يكتفي بذكر الأسماء دون إعدادات ويتجاهل سجل المخاطر'],
            ['4. بدائل التصميم واختبار التوافق', 'يحلل البدائل المرفوضة فنياً ويضع خطة انتقال واضحة لا تحرم المرضى', 'يذكر بدائل دون تحليل عميق أو خطة توافق سطحية', 'يفرض تصميماً واحداً ويتجاهل أثر التحديثات على الأجهزة القديمة'],
            ['5. أدلة التنفيذ والتطبيق', 'يقدم أمثلة تكوين دقيقة وواقعية (Nginx, OpenSSL) تدعم كل قرار', 'أمثلة عامة أو غير مكتملة', 'شرح نظري دون أي أدلة تنفيذ تقنية'],
            ['6. الجاهزية المستقبلية للكم (م6)', 'خطة انتقال واضحة مستندة صراحة إلى NIST FIPS 203, 204, 205', 'يذكر التهديد الكمومي دون تحديد المعايير النهائية المعتمدة', 'يتجاهل التهديدات الكمومية تماماً'],
            ['7. العمل الجماعي وتناسق الوثيقة', 'وثيقة متماسكة بلا تعارض فني بين المراحل ومصطلحات موحدة', 'تعارض طفيف بين بعض المراحل', 'تعارض جوهري بين المراحل وغياب التنسيق'],
          ],
        },
      ],
      commonMistake: {
        mistake:
          'التوسع غير المبرر في نطاق المشروع ليشمل أمن تقنية المعلومات العام (مثل سياسات كلمات المرور الإدارية) بدلاً من التركيز العميق على هندسة التشفير، أو تجاهل خطة التوافق مع الهواتف القديمة للمرضى.',
        fix: 'حصر النطاق في القرارات التشفيرية المبررة رياضياً وهندسياً، وتوفير مسار انتقال لمدة 6 أشهر مع بوابة ويب بديلة.',
      },
      solvedExample: {
        title: 'خطة الاستعادة الفورية وأدلة التحقق لمنصة «صحة تك» (api.sehatech.sa)',
        given:
          'الاشتباه باختراق خادم الواجهة البرمجية لمنصة «صحة تك»، والمطلوب تفعيل خطة الاستعادة والتحقق من رفض بروتوكول TLS 1.2.',
        steps: [
          '1. توليد زوج مفاتيح EC جديد على المنحنى P-256 حصرياً داخل وحدة أمن العتاد (HSM) لتوقيع ECDSA.',
          '2. إصدار طلب توقيع شهادة (CSR) جديد وتوقيعه من سلطة الشهادات.',
          '3. إرسال طلب إبطال للشهادة القديمة وتحديث حالة OCSP، وتدوير جميع مفاتيح الجلسات النشطة قسرياً.',
          '4. التحقق من نجاح TLS 1.3 بالأمر: openssl s_client -connect api.sehatech.sa:443 -tls1_3.',
          '5. التحقق من رفض TLS 1.2 بالأمر: openssl s_client -connect api.sehatech.sa:443 -tls1_2 والتأكد من ظهور SSL alert number 70 (protocol_version).',
        ],
        result: 'استعادة أمان القناة بالكامل وإثبات رفض هجمات خفض الإصدار برقم التنبيه 70.',
        whyItMatters: 'يقدم دليلاً تنفيذياً قاطعاً يثبت مطابقة الإعدادات للقرار الهندسي.',
      },
      codeExamples: [
        {
          title: 'إعدادات خادم Nginx وأوامر OpenSSL لمنصة «صحة تك» (SehaTech)',
          language: 'nginx',
          code: `server {
    listen 443 ssl;
    server_name api.sehatech.sa;

    ssl_certificate /etc/ssl/certs/sehatech_cert.pem;
    ssl_certificate_key /etc/ssl/private/sehatech_private.pem;

    ssl_protocols TLSv1.3;

    # التحكم الدقيق في حزم TLS 1.3
    ssl_conf_command Ciphersuites TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256;

    ssl_ecdh_curve prime256v1;
    ssl_prefer_server_ciphers off;
}`,
          explanation:
            'يقصر الاتصال على TLS 1.3، ويرتب حزم التشفير الموثق، ويعطل تفضيل الخادم ليسمح للهواتف القديمة باختيار ChaCha20 توفيراً للبطارية.',
        },
      ],
      flashcards: [
        {
          front: 'لماذا يُضبط ssl_prefer_server_ciphers على off في خادم منصة صحة تك؟',
          back: 'لاحترام تفضيل العميل بحيث تختار الهواتف الذكية القديمة ChaCha20-Poly1305 التي لا تستهلك البطارية عند غياب تسريع AES العتادي.',
        },
        {
          front: 'ماذا يعني ظهور الخطأ SSL alert number 70 عند اختبار الخادم؟',
          back: 'يعني تنبيه protocol_version، ويؤكد أن الخادم رفض طلب الاتصال بإصدار قديم مثل TLS 1.2 مما يثبت الحماية ضد هجمات خفض الإصدار.',
        },
      ],
      selfAssessment: [
        {
          question: 'ما هو الهدف الرئيس من وثيقة تصميم البنية التشفيرية لمنصة صحة تك؟',
          answer:
            'نقل الجانب النظري والعملي من جميع فصول المقرر إلى وثيقة هندسية متكاملة تحمي بيانات المرضى أثناء النقل وفي السكون وتستعد للتهديدات الكمومية.',
        },
        {
          question: 'لماذا لا يعني تصنيف قائمة الأطباء كـ «منخفضة الحساسية» إهمال تشفير اتصالها؟',
          answer:
            'لأن جميع الاتصالات يجب أن تظل محمية عبر TLS 1.3 لضمان السلامة (Integrity) والأصالة ومنع المهاجم من التلاعب بالبيانات وتوجيه المريض لجهات خبيثة.',
        },
      ],
      quiz: [
        {
          question: 'كم يبلغ الحد الأدنى للنجاح من أصل 21 نقطة في روبرك تقييم المشروع التطبيقي التراكمي؟',
          options: ['10 نقاط', '12 نقطة', '14 نقطة', '18 نقطة'],
          correctIndex: 2,
          explanation: 'الدرجة الكلية للروبرك هي 21 نقطة موزعة على 7 معايير، والحد الأدنى للنجاح هو 14 نقطة.',
        },
      ],
    },
    interactiveBook3D: {
      model3DType: 'sehatech-architecture-citadel',
      shaderEffect: 'holistic-cyber-dome',
      sceneTitle: 'مجسم القلعة المعمارية الشاملة لمنصة الرعاية الصحية «صحة تك» (SehaTech)',
      sceneDescription:
        'مجمع معماري ثلاثي الأبعاد يدمج بوابة Nginx TLS 1.3، وأنفاق IPsec/WireGuard، وهرم قاعدة البيانات المحمي بوحدة HSM، ومحرك الخصوصية السحابي (PHE/ZKP)، ودرع الجاهزية الكمومية (FIPS 203/204/205).',
      cameraPosition: { x: 0, y: 3.2, z: 8.0 },
      pages3D: [
        {
          pageNumber: 1,
          title: 'المراحل 1–3: تصنيف الأصول، تواقيع ECDSA، وبوابة TLS 1.3',
          subtitle: 'تأمين رحلة المريض والطبيب من الهاتف إلى الخادم',
          narrative:
            'تتصل تطبيقات المرضى عبر TLS 1.3 حصرياً بمنحنى prime256v1 مع السماح لـ ChaCha20-Poly1305 للهواتف القديمة، وتُوقع الوصفات الطبية بـ ECDSA حتمي داخل HSM.',
          equation: '\\text{TLS 1.3}: \\text{ECDHE}_{\\text{P-256}} + \\text{AEAD}(\\text{AES-GCM} \\lor \\text{ChaCha20-Poly1305})',
          liveGraphicType: 'sehatech-capstone-blueprint',
          liveGraphicCaption: 'بوابة api.sehatech.sa ورفض TLS 1.2 برمز التنبيه SSL alert 70',
          visualNotes: [
            'ssl_prefer_server_ciphers off يوفر بطارية هواتف المرضى.',
            'خطة انتقال 6 أشهر تضمن عدم حرمان أي مريض من الخدمة.',
          ],
        },
        {
          pageNumber: 2,
          title: 'المراحل 4–5: تشفير البيانات الساكنة، HSM، والخصوصية بـ HE و ZKP',
          subtitle: 'حماية السجلات الطبية في السكون وأثناء التحليل السحابي',
          narrative:
            'تحمى قاعدة البيانات بأربع طبقات (XTS-AES، TDE، تشفير عمود حتمي للهوية وعشوائي لفصيلة الدم، وتشفير تطبيق AES-GCM للتشخيص) تحت مظلة HSM، مع PHE للإحصاءات و ZKP للتأمين.',
          equation: '\\text{RootKey}_{\\text{HSM}} \\longrightarrow \\text{KEK} \\longrightarrow \\text{DEK}_{\\text{Active / Deactivated}}',
          liveGraphicType: 'sehatech-capstone-blueprint',
          liveGraphicCaption: 'تكامل هرمية المفاتيح في HSM مع محركي Paillier PHE و Schnorr ZKP',
          visualNotes: [
            'تجزئة السر تحمي النسخ الاحتياطية الطبية عند الكوارث.',
            'كود المصادقة ثابت الزمن يصد هجمات التوقيت.',
          ],
        },
        {
          pageNumber: 3,
          title: 'المرحلة 6 وروبرك التقييم الذاتي (21 نقطة)',
          subtitle: 'الانتقال الكمومي وفق FIPS 203/204/205 واجتياز المعايير السبعة',
          narrative:
            'تُؤمَّن السجلات الطبية طويلة العمر بالتبادل الهجين (P-256 + ML-KEM-768) وتوقيعات ML-DSA-65 و SLH-DSA-128s، وتُراجع الوثيقة مقابل المعايير السبعة للروبرك.',
          equation: '\\text{Total Score} = \\sum_{i=1}^{7} \\text{Criterion}_i \\in [14, 21] \\quad (\\text{Pass } \\ge 14)',
          liveGraphicType: 'sehatech-capstone-blueprint',
          liveGraphicCaption: 'مصفوفة روبرك التقييم السباعية وخارطة الانتقال الكمومي لمنصة صحة تك',
          visualNotes: [
            '7 معايير × 3 نقاط = 21 نقطة كحد أقصى.',
            'توحيد المصطلحات ومنع التعارض بين المراحل يضمن الدرجة الكاملة.',
          ],
        },
      ],
      stepByStep: [
        {
          step: 1,
          title: 'تصنيف الأصول الطبية وضبط بوابة Nginx TLS 1.3',
          description:
            'تفعيل TLS 1.3 حصرياً على api.sehatech.sa مع منحنى prime256v1 وإيقاف تفضيل الخادم لدعم ChaCha20.',
          formula: '\\text{openssl s\\_client -connect api.sehatech.sa:443 -tls1\\_2} \\implies \\text{Alert 70}',
          visualState: 'إضاءة القبة الخارجية للمنصة باللون الزمردي وصد محاولات خفض الإصدار.',
          securityNote: 'جميع الواجهات بما فيها قائمة الأطباء تمر عبر TLS 1.3 لضمان السلامة.',
        },
        {
          step: 2,
          title: 'تشغيل هرمية مفاتيح قاعدة البيانات داخل وحدة HSM',
          description:
            'توليد المفتاح الرئيس بالسيطرة المشتركة داخل HSM وتغليف KEK و DEK وتشفير الحقول الطبية حسب حساسيتها.',
          formula: '\\text{Diagnosis} \\xrightarrow{\\text{App AES-GCM}} \\text{DB}, \\quad \\text{BloodType} \\xrightarrow{\\text{Randomized}} \\text{DB}',
          visualState: 'توهج نواة HSM في مركز القلعة وربطها بخزائن البيانات.',
          securityNote: 'المفاتيح القديمة تنتقل لحالة Deactivated لخدمة النسخ الاحتياطية.',
        },
        {
          step: 3,
          title: 'تفعيل الخصوصية المتقدمة (PHE & ZKP) وخطة الاستعادة الفورية',
          description:
            'حساب الإحصاءات الطبية بتشفير Paillier والتحقق من أهلية التأمين بـ ZKP، مع جاهزية خطة إبطال وتدوير الشهادة عند الطوارئ.',
          formula: '\\text{ZKP}(\\text{InsuranceActive} = 1) \\land \\text{PHE}\\left(\\sum E(\\text{Cases})\\right)',
          visualState: 'تشغيل الجناح السحابي البنفسجي للحسابات المشفرة دون كشف هوية المرضى.',
          securityNote: 'خطة الاستعادة تعيد إصدار الشهادة من داخل HSM وتحدّث OCSP فوراً.',
        },
        {
          step: 4,
          title: 'الترقية الهجينة لما بعد الكم والتدقيق الذاتي بالروبرك (21/21)',
          description:
            'دمج ML-KEM-768 و ML-DSA-65 و SLH-DSA-128s في ملف التشفير ومراجعة المعايير السبعة في الروبرك.',
          formula: 'K_{\\text{SehaTech}} = \\text{HKDF}(\\text{ECDH}_{\\text{P-256}} \\parallel \\text{ML-KEM-768})',
          visualState: 'اكتمال الدرع البلوري الكمومي حول منصة صحة تك وإضاءة شارة 21/21.',
          securityNote: 'يحمي السجلات الصحية للمواطنين لعقود قادمة ضد الحواسيب الكمومية.',
        },
      ],
      hotspots: [
        {
          id: 'sehatech-nginx-gateway',
          label: 'بوابة Nginx TLS 1.3 (api.sehatech.sa)',
          coordinates: { x: -2.0, y: 1.2, z: 1.0 },
          color: '#10b981',
          title: 'حارس طبقة النقل ومنحنى P-256 و ChaCha20',
          detailedExplanation:
            'يرفض أي اتصال أقل من TLS 1.3 (يرجع Alert 70)، ويحترم تفضيل العميل لتمكين الهواتف غير المزودة بـ AES-NI من استخدام ChaCha20-Poly1305.',
          relatedEquation: '\\text{ssl\\_protocols TLSv1.3}; \\quad \\text{ssl\\_prefer\\_server\\_ciphers off};',
          securityImpact: 'يمنع هجمات خفض المستوى ويحافظ على توافرية التطبيق على هواتف المرضى.',
        },
        {
          id: 'sehatech-hsm-db-core',
          label: 'نواة HSM وقاعدة البيانات الطبية',
          coordinates: { x: 0.0, y: 1.4, z: 0.8 },
          color: '#f59e0b',
          title: 'الدفاع متعدد الطبقات للبيانات الساكنة (FIPS 140-3 Level 4)',
          detailedExplanation:
            'يجمع بين XTS-AES للأقراص، و TDE للملفات، والتشفير الحتمي لرقم الهوية، والعشوائي لفصيلة الدم، و AES-GCM على مستوى التطبيق للتشخيص الطبي.',
          relatedEquation: '\\text{HSM}(\\text{MasterKey}) \\to \\text{KEK} \\to \\text{DEK}',
          securityImpact: 'يعزل السجلات الطبية عن مديري الأنظمة وعن سرقة الأقراص أو النسخ الاحتياطية.',
        },
        {
          id: 'sehatech-privacy-engine',
          label: 'محرك الخصوصية (Paillier PHE + Schnorr ZKP)',
          coordinates: { x: 2.0, y: 1.0, z: 0.9 },
          color: '#a855f7',
          title: 'التحليلات الصحية المشفرة وإثبات الأهلية التأمينية',
          detailedExplanation:
            'يمكّن وزارة الصحة ومراكز الأبحاث من جمع الإحصاءات الطبية عبر التشفير المتجانس، ويتحقق من التغطية التأمينية للمريض ببرهان معرفة صفرية.',
          relatedEquation: 'D\\left(\\prod E(c_i)\\right) = \\sum c_i, \\quad b^2 = b',
          securityImpact: 'يحقق أقصى استفادة بحثية وتشغيلية مع صفر إفصاح عن البيانات الشخصية.',
        },
        {
          id: 'sehatech-pqc-rubric-shield',
          label: 'درع الجاهزية الكمومية وروبرك الـ 21 نقطة',
          coordinates: { x: 0.0, y: -1.5, z: 1.2 },
          color: '#06b6d4',
          title: 'معايير NIST FIPS 203/204/205 وضمان الجودة الهندسية',
          detailedExplanation:
            'يوثق خطة الانتقال إلى ML-KEM-768 و ML-DSA-65 و SLH-DSA-128s ويحقق معايير التقييم السبعة بحد نجاح لا يقل عن 14 من 21 نقطة.',
          relatedEquation: '\\text{FIPS 203 (ML-KEM)} + \\text{FIPS 204 (ML-DSA)} + \\text{FIPS 205 (SLH-DSA)}',
          securityImpact: 'يضمن صمود منصة صحة تك أمام تهديدات «سجل الآن وفك لاحقاً» الكمومية.',
        },
      ],
    },
    updated_at: 1730937600000,
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// 3. كائن توصيف المقرر الكامل (COURSE_ISE243_INFO)
// ═══════════════════════════════════════════════════════════════════════════

export const COURSE_ISE243_INFO: CourseInfo = {
  id: '550e8400-e29b-41d4-a716-446655440004',
  code: 'ISE 243',
  codeAr: '243 علم',
  slug: 'ise243',
  title: 'التشفير المتقدم',
  titleEn: 'Advanced Cryptography',
  department: 'دبلوم أمن المعلومات (دبلوم متوسط مهني)',
  university: 'جامعة الأمير مقرن بن عبدالعزيز',
  category: 'التشفير وأمن البيانات',
  description:
    'دراسة أكاديمية وتطبيقية متعمقة لأسس التشفير الحديث وهندسة البروتوكولات الآمنة: حقول غالوا GF(2^8) ومعيار AES، المنحنيات الإهليلجية ECC وتبادل المفاتيح ECDH والتوقيع ECDSA، بروتوكول TLS 1.3 وشبكات VPN (IPsec, OpenVPN, WireGuard)، تشفير قواعد البيانات ووحدات أمن العتاد HSM، التشفير المتجانس HE وبراهين المعرفة الصفرية ZKP، هجمات القنوات الجانبية، ومعايير NIST للتشفير ما بعد الكم (FIPS 203/204/205) مع مشروع تطبيقي شامل لتأمين منصة «صحة تك».',
  level: 'المستوى الرابع — السنة الثانية',
  chaptersCount: 13,
  totalHours: 60,
  status: 'available',
  color: 'from-amber-500 to-orange-600',
  accent: '#f59e0b',
  badge: 'NIST FIPS 203/204/205',
  neonColor: 'amber',
  icon: 'Lock',
  reference: 'Dan Boneh & Victor Shoup — A Graduate Course in Applied Cryptography + NIST FIPS 203/204/205',
  vision:
    'تأهيل مهندسي وممارسي أمن معلومات وطنيين يمتلكون العمق الرياضي والمهارة الهندسية لتصميم وتدقيق الأنظمة التشفيرية المؤسسية وحمايتها ضد التهديدات الكلاسيكية والكمومية.',
  mission:
    'تقديم محتوى علمي وتطبيقي رصين يربط بين البنى الجبرية (حقول غالوا والمنحنيات الإهليلجية والشبكيات) وبين التنفيذ الفعلي في بروتوكولات الشبكات وقواعد البيانات ووحدات أمن العتاد وفق أحدث المعايير العالمية والوطنية.',
  learningOutcomes: [
    'تحليل البنى الجبرية والرياضية (الحساب المعياري، حقول غالوا GF(2^8)، وزمر المنحنيات الإهليلجية فوق F_p) وتطبيقها في خوارزميتي AES و ECC.',
    'تنفيذ وتدقيق بروتوكول تبادل المفاتيح ECDH وخوارزمية التوقيع الرقمي ECDSA وتشخيص ثغرات إعادة استخدام القيمة التشغيلية (Nonce Reuse).',
    'تصميم وتكوين قنوات اتصال آمنة باستخدام بروتوكول TLS 1.3 (AEAD و 1-RTT) وأنفاق VPN المؤسسية (IPsec IKEv2/ESP، OpenVPN، و WireGuard).',
    'بناء استراتيجية دفاع متعدد الطبقات لتشفير قواعد البيانات (FDE XTS-AES، TDE، تشفير الأعمدة والتطبيق) وإدارة هرمية المفاتيح داخل وحدات HSM (FIPS 140-3).',
    'توظيف تقنيات الخصوصية المتقدمة (التشفير المتجانس PHE/SWHE/FHE وبراهين المعرفة الصفرية ZKP) وتطبيق الضوابط الوقائية ضد هجمات القنوات الجانبية (Timing, SPA/DPA, Faults).',
    'تقييم مخاطر الحوسبة الكمومية (خوارزميتي شور وجروفر) وقيادة الانتقال التشفيري الهجين وفق معايير NIST النهائية (FIPS 203 ML-KEM، FIPS 204 ML-DSA، و FIPS 205 SLH-DSA).',
    'صياغة وثيقة تصميم بنية تشفيرية متكاملة لمنصة رعاية صحية رقمية («صحة تك» SehaTech) مدعومة بأدلة التنفيذ وروبرك التقييم الهندسي.',
  ],
  weeklyPlan: [
    { week: 1, topic: 'مراجعة أساسيات التشفير، الحساب المعياري، والأعداد الأولية GF(p)', chapterNumber: 1 },
    { week: 2, topic: 'حقول غالوا GF(2^8) وتطبيقها في جولات معيار التشفير المتقدم AES', chapterNumber: 1 },
    { week: 3, topic: 'الأساس الرياضي للمنحنيات الإهليلجية (ECC) وجمع النقاط والضرب القياسي فوق F_p', chapterNumber: 2 },
    { week: 4, topic: 'بروتوكول تبادل المفاتيح ECDH وخوارزمية التوقيع الرقمي ECDSA وثغرة الـ Nonce', chapterNumber: 3 },
    { week: 5, topic: 'بروتوكول TLS 1.3، مجموعات التشفير الموثق AEAD، ومخاطر 0-RTT', chapterNumber: 4 },
    { week: 6, topic: 'هندسة الشبكات الافتراضية الخاصة VPN: IPsec (IKEv2/ESP) و OpenVPN و WireGuard', chapterNumber: 5 },
    { week: 7, topic: 'تشفير قواعد البيانات (XTS-AES, TDE, Column/App) وهرمية المفاتيح + الاختبار النصفي', chapterNumber: 6 },
    { week: 8, topic: 'التشفير المتجانس (PHE Paillier, SWHE, FHE) ونمو الضوضاء وعملية التمهيد Bootstrapping', chapterNumber: 7 },
    { week: 9, topic: 'إثباتات المعرفة الصفرية (ZKP)، بروتوكول شنور سيجما، وتحويل فيات-شامير', chapterNumber: 8 },
    { week: 10, topic: 'الإدارة المتقدمة للمفاتيح، فصل المهام، ووحدات أمن العتاد HSM (FIPS 140-3)', chapterNumber: 9 },
    { week: 11, topic: 'هجمات القنوات الجانبية (Timing, Cache, SPA/DPA, Faults) والتنفيذ ثابت الزمن', chapterNumber: 10 },
    { week: 12, topic: 'التشفير ما بعد الكم (PQC): خوارزميتا شور وجروفر، الشبكيات، وأشجار ميركل', chapterNumber: 11 },
    { week: 13, topic: 'معايير NIST النهائية لما بعد الكم: FIPS 203 (ML-KEM)، FIPS 204 (ML-DSA)، و FIPS 205 (SLH-DSA)', chapterNumber: 12 },
    { week: 14, topic: 'المشروع التراكمي التطبيقي الشامل: تصميم البنية التشفيرية لمنصة «صحة تك» (SehaTech)', chapterNumber: 13 },
  ],
  assessmentMethods: [
    {
      name: 'اختبارات قصيرة وتقويم ذاتي مستمر',
      weight: 20,
      description: 'اختبارات قصيرة منتظمة ومسائل حسابية وتطبيقية بعد كل فصلين لقياس استيعاب المفاهيم الرياضية والهندسية.',
    },
    {
      name: 'الاختبار النصفي',
      weight: 20,
      description: 'اختبار تحريري وتطبيقي شامل للفصول الستة الأولى (من حقول غالوا و AES حتى تشفير قواعد البيانات).',
    },
    {
      name: 'المشروع التراكمي التطبيقي (منصة صحة تك SehaTech)',
      weight: 30,
      description: 'إعداد وثيقة تصميم البنية التشفيرية عبر 6 مراحل تنفيذية وتقييمها وفق روبرك الـ 21 نقطة.',
    },
    {
      name: 'الاختبار النهائي الشامل',
      weight: 30,
      description: 'اختبار نهائي يغطي جميع الفصول الـ 13 بما فيها التشفير المتجانس و ZKP و HSM ومعايير NIST الكمومية.',
    },
  ],
  deliveryMode: 'نظري + تطبيقي + كتاب تفاعلي ثلاثي الأبعاد (3D Interactive Book)',
  language: 'العربية (مع المصطلحات والمعايير التقنية الإنجليزية)',
  prerequisite: 'ISE231 — أساسيات الأمن السيبراني (أو مبادئ الرياضيات المتقطعة)',
  topics: [
    'Galois Fields GF(2^8) & AES',
    'Elliptic Curve Cryptography (ECC)',
    'ECDH & ECDSA (RFC 6979)',
    'TLS 1.3 & AEAD Cipher Suites',
    'IPsec IKEv2, OpenVPN & WireGuard',
    'Database Encryption & Key Hierarchy',
    'Homomorphic Encryption (PHE/SWHE/FHE)',
    'Zero-Knowledge Proofs (Schnorr Sigma)',
    'HSM & FIPS 140-3 Key Management',
    'Side-Channel Attacks & Constant-Time',
    'Post-Quantum Crypto (Shor & Grover)',
    'NIST FIPS 203 / 204 / 205',
    'SehaTech Capstone Architecture',
  ],
  features: [
    '13 فصلاً أكاديمياً متكاملاً مع المعادلات الرياضية والأمثلة السعودية المحلولة',
    'كتاب تفاعلي ثلاثي الأبعاد (InteractiveBook3D) لكل فصل مع نقاط ساخنة (Hotspots) وخطوات متسلسلة',
    '65 شريحة عرض تقديمي، 78 بطاقة استذكار، و 52 سؤال اختبار قصير مشروح بالكامل',
    'أدلة تنفيذ واقعية (Nginx، OpenSSL، PowerShell، LUKS2، وكود C ثابت الزمن)',
  ],
  chapters: ISE243_CHAPTERS,
};

// ═══════════════════════════════════════════════════════════════════════════
// 4. تصديرات التوافق التام ودوال إدارة الفصول (Backward-Compatible Exports)
// ═══════════════════════════════════════════════════════════════════════════

export const COURSE_INFO = COURSE_ISE243_INFO;
export const DEFAULT_CHAPTERS: Chapter[] = ISE243_CHAPTERS;
export const CHAPTERS: Chapter[] = ISE243_CHAPTERS;

const STORAGE_KEY = 'mirsad_chapters_v9_unlocked';

export const getChapters = (): Chapter[] => {
  if (typeof window === 'undefined') return DEFAULT_CHAPTERS;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed: Chapter[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length >= DEFAULT_CHAPTERS.length) {
        return parsed.map((ch) => {
          const def = DEFAULT_CHAPTERS.find(
            (d) => d.id === ch.id || d.chapter_number === ch.chapter_number
          );
          return {
            ...def,
            ...ch,
            richData: def?.richData || ch.richData,
            interactiveBook3D: def?.interactiveBook3D || ch.interactiveBook3D,
            slides: def?.slides || ch.slides || [],
            miniQuiz: def?.miniQuiz || ch.miniQuiz || [],
          };
        });
      }
    } catch {
      return DEFAULT_CHAPTERS;
    }
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CHAPTERS));
  } catch {
    // Ignore storage quota warnings
  }
  return DEFAULT_CHAPTERS;
};

export const saveChapters = (chapters: Chapter[]): void => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(chapters));
  }
};

export const getChapterById = (id: number): Chapter | undefined =>
  getChapters().find((c) => c.id === id || c.chapter_number === id);

export const addChapter = (chapter: Omit<Chapter, 'id' | 'updated_at'>): number => {
  const chapters = getChapters();
  const newId = Math.max(0, ...chapters.map((c) => c.id)) + 1;
  chapters.push({
    ...chapter,
    id: newId,
    presentationUrl: chapter.presentationUrl || `${TEXTBOOK_PDF_PATH}#page=1`,
    updated_at: Date.now(),
  });
  saveChapters(chapters);
  return newId;
};

export const updateChapter = (id: number, updates: Partial<Chapter>): void => {
  const chapters = getChapters().map((c) =>
    c.id === id ? { ...c, ...updates, updated_at: Date.now() } : c
  );
  saveChapters(chapters);
};

export const deleteChapter = (id: number): void => {
  saveChapters(getChapters().filter((c) => c.id !== id));
};

export const resetChapters = (): void => {
  saveChapters(DEFAULT_CHAPTERS);
};

export default COURSE_ISE243_INFO;