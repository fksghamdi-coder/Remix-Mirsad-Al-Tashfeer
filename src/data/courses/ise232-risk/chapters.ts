/**
 * ============================================================================
 * منصة «مِرْصَاد التشفير» (Mirsad Al-Tashfeer) — جامعة الأمير مقرن بن عبدالعزيز
 * المقرر الثالث: تحليل المخاطر السيبرانية (Cyber Risk Analysis)
 * رمز المقرر: UPMN075 | المعرّف البرمجي: ise232-risk
 * ============================================================================
 * ملف برمجي مستقل وشامل يدمج المحتوى الأكاديمي لكتاب المقرر المعتمد
 * (المبني على منهجية OCTAVE Allegro — معهد هندسة البرمجيات SEI بجامعة كارنيجي ميلون،
 * ومعايير ISO/IEC 27005:2022، وNIST SP 800-30 Rev.1، ونموذج التحليل الكمي FAIR،
 * والضوابط الأساسية للأمن السيبراني بالهيئة الوطنية للأمن السيبراني NCA ECC-2:2024)
 * مع منظومة التعلم المزدوجة:
 *   1. الفئة الأولى (التنسيق الأكاديمي الشامل):
 *      - محتوى علمي موسع (Markdown) غني بمعادلات AV, EF, SLE, ARO, ALE, ROSI وجداول OCTAVE Allegro
 *      - أوراق العمل المعيارية العشر (Worksheets 1–10) ومصفوفة المخاطر 5×5
 *      - إعدادات المخططات المتجهية (diagramKey: 'ise232-risk-1' .. 'ise232-risk-11')
 *      - شرائح العرض التقديمي التفاعلية (5 شرائح مفصلة لكل فصل = 55 شريحة)
 *      - بطاقات الاستذكار الذكية (6 بطاقات لكل فصل = 66 بطاقة)
 *      - الاختبارات القصيرة المحلولة (4 أسئلة لكل فصل = 44 سؤالاً مع التعليل العلمي)
 *   2. الفئة الثانية (الكتاب التفاعلي ثلاثي الأبعاد interactiveBook3D):
 *      - المجسمات الهندسية ثلاثية الأبعاد (model3DType & shaderEffect)
 *      - صفحات الكتاب ثلاثي الأبعاد (pages3D) مع المختبر التفاعلي الحيّ
 *      - خطوات الشرح المتسلسلة (stepByStep: 5 خطوات لكل فصل)
 *      - النقاط الساخنة التفاعلية (hotspots: 4 نقاط ثلاثية الأبعاد بإحداثيات x,y,z لكل فصل)
 * ============================================================================
 */

// ═══════════════════════════════════════════════════════════════════════════
// 1. تعريف الواجهات البرمجية الشاملة (TypeScript Interfaces)
// ═══════════════════════════════════════════════════════════════════════════

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
  speakerNotes?: string;
  diagramData?: Record<string, unknown>;
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

export interface SelfAssessmentQA {
  question: string;
  answer: string;
}

export interface RichChapterData {
  id: number;
  chapter_number: number;
  title: string;
  subtitle: string;
  category: string;
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
  solvedExamples: SolvedExample[];
  selfAssessment: SelfAssessmentQA[];
  quiz: MiniQuiz[];
  flashcards: FlashcardData[];
}

export type Model3DType =
  | 'octave_allegro_4phases_cube'
  | 'threat_tree_4branches_hierarchy'
  | 'asset_containers_triad_matrix'
  | 'quantitative_sle_ale_rosi_prism'
  | 'risk_heatmap_5x5_surface'
  | 'treatment_4strategies_shield'
  | 'fair_ontology_monte_carlo_tree'
  | 'iso27005_nist800_30_nca_rings'
  | 'executive_risk_register_vault'
  | 'pbcd_hospital_architecture_twin'
  | 'mawaidi_national_cloud_topology';

export type ShaderEffectType =
  | 'holographic_amber_grid'
  | 'threat_pulse_crimson_glow'
  | 'container_neon_wireframe'
  | 'financial_matrix_gold_flux'
  | 'thermal_heatmap_gradient'
  | 'defense_barrier_emerald_shield'
  | 'probabilistic_wave_cyan'
  | 'compliance_orbital_laser'
  | 'executive_crystal_refraction'
  | 'medical_telemetry_biometric_glow'
  | 'national_cloud_quantum_mesh';

export interface Hotspot3D {
  id: string;
  label: string;
  x: number;
  y: number;
  z: number;
  coordinates: { x: number; y: number; z: number };
  title: string;
  detailedExplanation: string;
  technicalMetric: string;
  securityImpact: 'حرج جداً' | 'مرتفع' | 'متوسط' | 'منخفض';
  relatedControl: string;
}

export interface StepByStep3D {
  stepNumber: number;
  title: string;
  description: string;
  formulaOrRule: string;
  visualState: string;
  cameraFocus: { x: number; y: number; z: number };
}

export interface Page3DItem {
  pageNumber: number;
  spreadSide: 'right' | 'left';
  title: string;
  subtitle: string;
  summaryMarkdown: string;
  interactiveFormula?: string;
  labParameterName: string;
  labMin: number;
  labMax: number;
  labDefault: number;
  labUnit: string;
  labInterpretation: Record<number, string>;
  challengeQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    feedbackCorrect: string;
    feedbackWrong: string;
  };
  aiTutorGuardrailTopics: string[];
}

export interface InteractiveBook3DConfig {
  model3DType: Model3DType;
  shaderEffect: ShaderEffectType;
  ambientColor: string;
  accentColor: string;
  autoRotateSpeed: number;
  pages3D: Page3DItem[];
  stepByStep: StepByStep3D[];
  hotspots: Hotspot3D[];
}

export type RiskDiagramKey =
  | 'ise232-risk-1'
  | 'ise232-risk-2'
  | 'ise232-risk-3'
  | 'ise232-risk-4'
  | 'ise232-risk-5'
  | 'ise232-risk-6'
  | 'ise232-risk-7'
  | 'ise232-risk-8'
  | 'ise232-risk-9'
  | 'ise232-risk-10'
  | 'ise232-risk-11';

export interface Chapter {
  id: number;
  chapter_number: number;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  pdfStartPage: number;
  pdfEndPage: number;
  diagramKey: RiskDiagramKey;
  content: string;
  images: ChapterImage[];
  keyTopics: string[];
  videoUrl: string;
  videoDuration: string;
  presentationUrl: string;
  slides: SlideItem[];
  flashcards: FlashcardData[];
  miniQuiz: MiniQuiz[];
  interactiveBook3D: InteractiveBook3DConfig;
  richData: RichChapterData;
  updated_at: number;
}

export type ChapterData = Chapter;

export interface WeeklyPlanItem {
  week: number;
  topic: string;
  chapterNumber: number;
  practicalLab?: string;
  deliverable?: string;
}

export interface AssessmentMethod {
  name: string;
  weight: number;
  description: string;
}

export interface CourseInfo {
  id: string;
  code: string;
  slug: string;
  title: string;
  titleEn: string;
  category: string;
  description: string;
  level: string;
  chaptersCount: number;
  totalHours: number;
  status: 'available' | 'coming-soon' | 'planned';
  color: string;
  accent: string;
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
  instructor: string;
  prerequisite: string;
  topics: string[];
  features: string[];
  chapters: Chapter[];
}

const NOW_TIMESTAMP = 1762473600000;

// ═══════════════════════════════════════════════════════════════════════════
// 2. مصفوفة الفصول الدراسية الكاملة (ISE232_RISK_CHAPTERS: 11 فصلاً)
// ═══════════════════════════════════════════════════════════════════════════

export const ISE232_RISK_CHAPTERS: Chapter[] = [
  // =========================================================================
  // الفصل الأول: مدخل إلى تحليل المخاطر السيبرانية ومنهجية OCTAVE Allegro
  // =========================================================================
  {
    id: 201,
    chapter_number: 1,
    title: 'مدخل إلى تحليل المخاطر السيبرانية ومنهجية OCTAVE Allegro',
    subtitle: 'المراحل الأربع، الخطوات الثماني، والتمييز الجوهري بين الثغرة والخطر والقرار المبني على المخاطر',
    description: 'تأصيل علمي وتطبيقي لمفهوم تحليل مخاطر أمن المعلومات ودوره التشخيصي ضمن إدارة المخاطر المستمرة، مع دراسة تفصيلية لمنهجية OCTAVE Allegro (المراحل الـ 4 والخطوات الـ 8) والتمييز بين المخاطر الكامنة والمتبقية.',
    category: 'أساسيات ومنهجيات',
    difficulty: 'beginner',
    pdfStartPage: 6,
    pdfEndPage: 17,
    diagramKey: 'ise232-risk-1',
    videoUrl: 'https://www.youtube.com/watch?v=8kVXKyGOYsY',
    videoDuration: '18:45',
    presentationUrl: '/presentations/ise232-risk-ch1.pdf',
    keyTopics: [
      'تعريف تحليل مخاطر أمن المعلومات ودوره التشخيصي',
      'منهجية OCTAVE Allegro (المراحل الأربع والخطوات الثماني)',
      'التمييز الجوهري: الثغرة الأمنية ليست خطراً بذاتها',
      'القرار المبني على المخاطر مقابل القرار التفاعلي المبني على الافتراض',
      'الأصل المعلوماتي وحاوياته الثلاث (التقنية، المادية، البشرية)',
      'المخاطر الكامنة (Inherent Risk) والمخاطر المتبقية (Residual Risk)',
    ],
    images: [
      {
        prompt: 'OCTAVE Allegro risk assessment 4 phases and 8 steps roadmap, organizational drivers, cybersecurity governance, 16:9',
        caption: 'خريطة طريق منهجية OCTAVE Allegro: المراحل الأربع والخطوات الثماني المتسلسلة',
        alt: 'OCTAVE Allegro 4 phases and 8 steps roadmap',
        seed: 2011,
        isAIGenerated: true,
      },
      {
        prompt: 'Risk-based decision making starting from mission goals vs reactive vulnerability-driven decisions, 16:9',
        caption: 'مقارنة صناعة القرار المبني على المخاطر بالقرار التفاعلي القائم على رد الفعل',
        alt: 'Risk based decision making vs reactive model',
        seed: 2012,
        isAIGenerated: true,
      },
    ],
    content: `## 1.1 مقدمة في تحليل مخاطر أمن المعلومات

تعتمد المنظمات الحديثة في القطاعين الحكومي والخاص على المعلومات بوصفها شرياناً حيوياً لتقديم خدماتها وتحقيق رسالتها الاستراتيجية. ولذلك فإن أي خلل يصيب سرية هذه المعلومات أو تكاملها أو توافرها يمتد أثره مباشرةً إلى قدرة المنظمة على أداء أعمالها والوفاء بالتزاماتها التنظيمية والتشغيلية.

يُعرَّف **تحليل مخاطر أمن المعلومات (Information Security Risk Analysis)** بأنه عملية تشخيصية منهجية لتحديد المخاطر التي تهدد الأصول المعلوماتية وتقييمها في سياق أهداف المنظمة ومحركات أعمالها (Organizational Drivers). ويمثل هذا التحليل الأساس التشخيصي الذي تُبنى عليه عملية **إدارة المخاطر (Risk Management)** المستمرة، فلا يمكن للمنظمة أن تعالج خطراً أو تخصص له ميزانية دفاعية قبل أن تشخصه وتقيس أثره بدقة.

---

## 1.2 عائلة منهجيات OCTAVE ومنهجية OCTAVE Allegro

طوّر معهد هندسة البرمجيات (**SEI — Software Engineering Institute**) في جامعة كارنيجي ميلون (**Carnegie Mellon University**) عائلة منهجيات **OCTAVE** (*Operationally Critical Threat, Asset, and Vulnerability Evaluation*) لمساعدة المنظمات على مواءمة أنشطة أمن المعلومات مع غاياتها التشغيلية:

1. **OCTAVE الأصلية**: صُممت للمؤسسات الكبرى التي تمتلك فرقاً متعددة التخصصات وتحتاج إلى ورش عمل موسعة.
2. **OCTAVE-S**: نُسخة مبسطة للمنظمات الصغيرة (نحو 100 موظف أو أقل) تفترض أن فريقاً صغيراً خبيراً يعرف أصول المنظمة بالكامل.
3. **OCTAVE Allegro**: النسخة الرشيقة والمحسنة التي تركز مباشرةً على **الأصل المعلوماتي (Information Asset)** في سياق **حاوياته (Containers)**، مما يختصر الجهد والوقت مع رفع دقة المخرجات وقابلية مقارنتها.

### المراحل الأربع والخطوات الثماني في OCTAVE Allegro

تنتظم منهجية **OCTAVE Allegro** في **أربع مراحل (4 Phases)** تضم **ثماني خطوات متسلسلة (8 Steps)**:

| المرحلة (Phase) | الخطوات المنضوية (Steps) | المخرج القياسي (Key Deliverable) |
| :--- | :--- | :--- |
| **المرحلة 1: تحديد المحركات (Establish Drivers)** | **الخطوة 1**: وضع معايير قياس المخاطر (Risk Measurement Criteria) | أوراق عمل معايير الأثر وترتيب أولويات المجالات (1a–1f) |
| **المرحلة 2: تحديد ملامح الأصول (Profile Assets)** | **الخطوة 2**: إعداد ملف الأصل المعلوماتي الحرج<br>**الخطوة 3**: تحديد حاويات الأصل المعلوماتي | ملف الأصل الحرج (ورقة 8) + خريطة بيئة خطر الأصل (9a–9c) |
| **المرحلة 3: تحديد التهديدات (Identify Threats)** | **الخطوة 4**: تحديد مجالات القلق (Areas of Concern)<br>**الخطوة 5**: تحديد سيناريوهات التهديد (Threat Scenarios) | سيناريوهات التهديد الموثقة واستبيانات الحاويات |
| **المرحلة 4: تحديد المخاطر ومعالجتها (Identify & Mitigate Risks)** | **الخطوة 6**: تحديد المخاطر (العواقب)<br>**الخطوة 7**: تحليل المخاطر (درجة الخطر النسبية)<br>**الخطوة 8**: اختيار نهج المعالجة (Mitigation Approach) | ورقة عمل المخاطر الشاملة (ورقة 10) وخطة المعالجة |

---

## 1.3 القاعدة الذهبية: الثغرة الأمنية ليست خطراً بذاتها

> [!warning]
> **خطأ شائع في الممارسة الأمنية**: التعامل مع قائمة الثغرات التقنية الناتجة عن أدوات الفحص الآلي (Vulnerability Scanners) بوصفها «سجل مخاطر» جاهزاً. **الصحيح علمياً**: الثغرة مجرد نقطة ضعف (Vulnerability) أو شرط مهيئ، ولا تتحول إلى خطر (Risk) يستلزم المعالجة إلا بعد اقترانها بتهديد قادر على استغلالها وتحليل **نتيجتها المحتملة وأثرها (Impact)** على أهداف المنظمة.

### مقارنة القرار المبني على المخاطر بالقرار التفاعلي المبني على الافتراض

| معيار المقارنة | القرار المبني على المخاطر (Risk-Based Decision) | القرار المبني على افتراض أن الثغرة خطر (Reactive) |
| :--- | :--- | :--- |
| **نقطة البداية** | غايات المنظمة وأهدافها الاستراتيجية وأصولها الحرجة | الثغرة التقنية المكتشفة عرضاً أو عبر ماسح آلي |
| **النظرة المؤسسية** | تنظيمية وتشغيلية شاملة تربط الأمن بالأعمال | تفاعلية ضيقة قائمة على رد الفعل اللحظي |
| **معاملة الثغرة** | تُحلَّل نتيجتها المحتملة وأثرها على الأصل قبل الحكم عليها | تُعدّ خطراً مباشراً يستنزف الموارد دون تمحيص للأثر |
| **قابلية المقارنة** | نتائج متسقة وقابلة للمقارنة عبر الزمن وبين الوحدات | نتائج متفرقة لا يجمعها معيار قياس موحد |

---

## 1.4 العناصر الأساسية لمعادلة الخطر السيبراني

يتكون الخطر المعلوماتي من تفاعل ستة عناصر مترابطة:

1. **الأصل المعلوماتي (Information Asset)**: معلومة أو مجموعة معلومات ذات قيمة للمنظمة تحتاج إلى حماية (مثل: قاعدة بيانات السجلات الأكاديمية أو بيانات فوترة المرضى)، وليس الجهاز المادي ذاته.
2. **الحاوية (Container)**: كل موضع تُخزن فيه المعلومة أو تُنقل عبره أو تُعالج بواسطته، وتنقسم إلى ثلاث فئات:
   - **حاوية تقنية (Technical)**: الخوادم، قواعد البيانات، الشبكات، تطبيقات الويب.
   - **حاوية مادية (Physical)**: الوثائق الورقية، الخزائن، أشرطة النسخ الاحتياطي، غرف الخوادم.
   - **حاوية بشرية (People)**: الموظفون والمستخدمون الذين يحملون المعلومة في أذهانهم ومعرفتهم التشغيلية.
3. **المتطلبات الأمنية (Security Requirements)**: السرية (Confidentiality)، التكامل/السلامة (Integrity)، والتوافر (Availability)، مع تحديد **أهم متطلب أمني** لكل أصل.
4. **التهديد (Threat)**: ظرف أو حدث (فاعل + وسيلة + دافع) يؤدي إلى نتيجة غير مرغوبة (إفشاء، تعديل، فقدان/تدمير، انقطاع).
5. **الأثر والاحتمالية (Impact & Probability)**: مقدار الضرر الواقع على المنظمة وفرصة تحقق السيناريو:
   $$\text{Risk} = f(\text{Threat}, \text{Vulnerability}, \text{Asset Value}) = \text{Probability} \times \text{Impact}$$
6. **المخاطر الكامنة مقابل المخاطر المتبقية (Inherent vs. Residual Risk)**:
   $$\text{Residual Risk} = \text{Inherent Risk} - \text{Control Effectiveness}$$
   - **المخاطر الكامنة (Inherent Risk)**: مستوى الخطر على الأصل قبل احتساب أثر الضوابط الأمنية.
   - **المخاطر المتبقية (Residual Risk)**: ما يتبقى من الخطر بعد تطبيق الضوابط الأمنية الوقائية والكشفية والتعويضية.`,
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'مفهوم تحليل المخاطر السيبرانية ودوره التشخيصي',
        subtitle: 'ربط أنشطة حماية المعلومات بالمحركات الاستراتيجية للمؤسسة',
        bullets: [
          'تحليل المخاطر هو الأداة التشخيصية التي تسبق أي قرار استثماري أو تقني في إدارة الأمن السيبراني.',
          'يربط التحليل السليم بين حماية الأصول المعلوماتية واستمرارية تحقيق رسالة المنظمة وغاياتها.',
          'مشاركة أصحاب المصلحة من الوحدات التشغيلية وتقنية المعلومات والامتثال تكشف فجوات التواصل الخفية.',
          'في السياق الوطني السعودي: الأصل في بوابة القبول الجامعي هو «بيانات الطلاب وسجلاتهم» لا الخادم وحده.'
        ],
        keyHighlight: 'لا يمكن إدارة ما لا يمكن قياسه: تحليل المخاطر يحول القلق الأمني المبهم إلى أولويات قابلة للقياس والمقارنة.',
        diagramTitle: 'العلاقة بين تحليل المخاطر وإدارة المخاطر المستمرة'
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'منهجية OCTAVE Allegro: المراحل الأربع والخطوات الثماني',
        subtitle: 'منهجية معهد هندسة البرمجيات (SEI) بجامعة كارنيجي ميلون',
        bullets: [
          'المرحلة 1 (تحديد المحركات): الخطوة 1 — إنشاء معايير قياس المخاطر المتسقة مع أهداف المنظمة.',
          'المرحلة 2 (تحديد ملامح الأصول): الخطوة 2 (ملف الأصل الحرج) والخطوة 3 (خريطة حاويات الأصل).',
          'المرحلة 3 (تحديد التهديدات): الخطوة 4 (مجالات القلق) والخطوة 5 (سيناريوهات التهديد).',
          'المرحلة 4 (تحديد المخاطر ومعالجتها): الخطوة 6 (العواقب)، الخطوة 7 (درجة الخطر)، والخطوة 8 (استراتيجية المعالجة).'
        ],
        keyHighlight: 'تتميز OCTAVE Allegro بالتركيز على الأصل المعلوماتي داخل حاوياته، مما يحقق دقة عالية بأقل عبء تشغيلي.',
        diagramTitle: 'خريطة طريق OCTAVE Allegro ذات الخطوات الثماني'
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'القاعدة المنهجية: لماذا لا تُعدّ كل ثغرة خطراً؟',
        subtitle: 'الفرق الجوهري بين القرار المبني على المخاطر والقرار التفاعلي',
        bullets: [
          'الثغرة (Vulnerability) هي نقطة ضعف كامنة، ولا تتحول إلى خطر إلا بوجود تهديد يستغلها وأثر يمس المنظمة.',
          'القرار التفاعلي يبدأ من قائمة الثغرات فيستنزف الميزانية في ترقيع أنظمة ثانوية غير حرجة.',
          'القرار المبني على المخاطر يبدأ من غايات المنظمة وأصولها الحرجة فيوجه الموارد نحو الأعلى أثراً.',
          'توحيد معايير القياس يضمن قابلية مقارنة المخاطر عبر مختلف الإدارات والفترات الزمنية.'
        ],
        keyHighlight: 'وجود ثغرة في نظام معزول لا يحوي أصولاً حرجة ولا يترتب على تعطله أثر تشغيلي لا يمثل أولوية خطر قصوى.',
        diagramTitle: 'مصفوفة المقارنة بين القرار المبني على المخاطر والقرار التفاعلي'
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'الأصل المعلوماتي ونموذج الحاويات الثلاث (Containers)',
        subtitle: 'أين تعيش المعلومة وكيف ترث مخاطر بيئتها؟',
        bullets: [
          'الأصل المعلوماتي (Information Asset): البيانات والمعرفة ذات القيمة للمنظمة (مثل سجلات المرضى أو العقود).',
          'الحاوية التقنية (Technical Container): الخوادم، قواعد البيانات، الشبكات، والبرمجيات التي تعالج الأصل.',
          'الحاوية المادية (Physical Container): الملفات الورقية، أشرطة النسخ الاحتياطي، وغرف الأرشيف.',
          'الحاوية البشرية (People Container): الموظفون والمختصون الذين يحملون المعلومة في معرفتهم ويتداولونها.'
        ],
        keyHighlight: 'القاعدة الذهبية: الأصل المعلوماتي يرث كل ثغرة أو تهديد يصيب أي حاوية من حاوياته التقنية أو المادية أو البشرية.',
        diagramTitle: 'نموذج الحاويات الثلاث للأصل المعلوماتي'
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'سلسلة الخطر السيبراني: الكامن والمتبقي',
        subtitle: 'دور الضوابط الأمنية في قطع سلسلة التهديد والأثر',
        bullets: [
          'سلسلة الخطر: تهديد (Threat) يستغل ثغرة (Vulnerability) في حاوية أصل فينتج أثر سلبي (Impact).',
          'الخطر الكامن (Inherent Risk): حجم الخطر الخام قبل احتساب أي ضوابط أمنية وقائية أو كشفية.',
          'الضابط الأمني (Security Control): يُطبق على مستوى الحاوية (تشفير للحاوية التقنية، أقفال للمادية، توعية للبشرية).',
          'الخطر المتبقي (Residual Risk): الجزء المتبقي من الخطر بعد تطبيق الضوابط، ويجب أن يقع ضمن شهية المخاطر.'
        ],
        keyHighlight: 'تشفير قاعدة البيانات يحمي الحاوية التقنية فقط، لكنه لا يحمي المعلومة ذاتها حين تُطبع على ورقة غير محمية!',
        diagramTitle: 'معادلة الخطر الكامن والضوابط والخطر المتبقي'
      }
    ],
    flashcards: [
      {
        front: 'ما التعريف العلمي لتحليل مخاطر أمن المعلومات وما دوره في إدارة المخاطر؟',
        back: 'هو عملية تشخيصية منهجية لتحديد المخاطر على الأصول المعلوماتية وتقييم أثرها في سياق أهداف المنظمة، ويمثل الأساس التشخيصي الذي تُبنى عليه قرارات إدارة المخاطر المستمرة.',
        category: 'أساسيات'
      },
      {
        front: 'كم عدد المراحل والخطوات في منهجية OCTAVE Allegro؟',
        back: 'تتكون من أربع مراحل (تحديد المحركات، تحديد ملامح الأصول، تحديد التهديدات، تحديد المخاطر ومعالجتها) موزعة على ثماني خطوات متسلسلة.',
        category: 'منهجية OCTAVE'
      },
      {
        front: 'لماذا لا تُعدّ كل ثغرة أمنية مكتشفة خطراً يستوجب المعالجة الفورية؟',
        back: 'لأن الثغرة مجرد نقطة ضعف، ولا تصبح خطراً إلا إذا وُجد تهديد يستغلها وترتب على ذلك نتيجة ذات أثر سلبي معتبر على أهداف المنظمة.',
        category: 'مفاهيم جوهرية'
      },
      {
        front: 'ما الفرق بين الأصل المعلوماتي (Information Asset) والحاوية (Container)؟',
        back: 'الأصل المعلوماتي هو المعلومة ذات القيمة نفسها (كبيانات الطلاب)، بينما الحاوية هي الموضع الذي تُخزن فيه المعلومة أو تُنقل أو تُعالج عبره (تقنية، مادية، بشرية).',
        category: 'الأصول والحاويات'
      },
      {
        front: 'ما الفرق بين المخاطر الكامنة (Inherent Risk) والمخاطر المتبقية (Residual Risk)؟',
        back: 'المخاطر الكامنة هي مستوى الخطر قبل احتساب أثر الضوابط الأمنية، أما المخاطر المتبقية فهي ما يبقى من الخطر بعد تطبيق الضوابط الأمنية وتقييم كفايتها.',
        category: 'تحليل المخاطر'
      },
      {
        front: 'لماذا يُشترط إشراك ممثلين من الوحدات التشغيلية إلى جانب تقنية المعلومات في فريق تحليل المخاطر؟',
        back: 'لأن الوحدات التشغيلية هي الأقدر على فهم قيمة الأصل المعلوماتي وأثر تعطله على الأعمال، كما أن اجتماعهم يكشف فجوات إيصال السياسات وتطبيقها.',
        category: 'حوكمة التقييم'
      }
    ],
    miniQuiz: [
      {
        question: 'وفق منهجية OCTAVE Allegro، ما هي الخطوة الأولى التي يجب أن تبدأ بها المنظمة عملية تحليل المخاطر؟',
        options: [
          'تشغيل أدوات فحص الثغرات الآلية على جميع الخوادم المرتبطة بالإنترنت',
          'وضع معايير قياس المخاطر (Risk Measurement Criteria) المتسقة مع محركات وأهداف المنظمة',
          'شراء جدران حماية وأنظمة كشف تسلل لتقليل المخاطر الكامنة',
          'حصر جميع الأجهزة المكتبية والطابعات في سجل الأصول التقنية'
        ],
        correctIndex: 1,
        explanation: 'تبدأ المرحلة الأولى في OCTAVE Allegro (الخطوة 1) بوضع معايير قياس المخاطر المشتقة من محركات المنظمة وغاياتها، لأن التحليل المبني على المخاطر ينطلق مما يهم المنظمة لا من الأجهزة أو الثغرات.'
      },
      {
        question: 'في بوابة الخدمات الأكاديمية بجامعة سعودية، أي مما يلي يمثل «الأصل المعلوماتي» (Information Asset) بمعناه الدقيق في OCTAVE Allegro؟',
        options: [
          'خادم قاعدة البيانات Oracle الموجود في مركز البيانات الرئيسي',
          'سجلات الطلاب الأكاديمية وبياناتهم الشخصية ونتائجهم الدراسية',
          'جهاز التوجيه (Router) الذي يربط البوابة بشبكة الإنترنت',
          'موظف القبول والتسجيل المسؤول عن إدخال الدرجات'
        ],
        correctIndex: 1,
        explanation: 'الأصل المعلوماتي هو المعلومة ذاتها (سجلات الطلاب وبياناتهم)، بينما الخادم وجهاز التوجيه يمثلان حاويات تقنية، وموظف القبول يمثل حاوية بشرية.'
      },
      {
        question: 'عندما تطبق مؤسسة ضابط تشفير قوي (AES-256) على قاعدة بيانات الرواتب، لكن موظف المالية يطبع مسيرات الرواتب ورقياً ويتركها على مكتبه دون قفل، فما التفسير العلمي الصحيح؟',
        options: [
          'الضابط التقني كافٍ لحماية الأصل المعلوماتي في جميع حالاته',
          'الضابط الأمني يُطبق على مستوى الحاوية؛ فالتشفير حمى الحاوية التقنية وبقيت الحاوية المادية الورقية مكشوفة',
          'المخاطر الكامنة تساوي صفراً بعد تشفير قاعدة البيانات',
          'هذا التهديد يُصنف كمشكلة تقنية في عتاد الطابعة'
        ],
        correctIndex: 1,
        explanation: 'الضوابط الأمنية تُطبق على مستوى كل حاوية يعيش فيها الأصل المعلوماتي؛ لذا فإن حماية الحاوية التقنية بالتشفير لا تحمي الأصل حين ينتقل إلى حاوية مادية (ورقية) أو بشرية.'
      },
      {
        question: 'ما السمة المميزة للقرار الأمني المبني على المخاطر (Risk-Based Decision) مقارنةً بالقرار المبني على افتراض أن الثغرة خطر؟',
        options: [
          'يعامل كل ثغرة تقنية بوصفها خطراً حرجاً يتطلب إغلاقاً فورياً',
          'يبدأ من غايات المنظمة وأصولها الحرجة ويحلل النتيجة المحتملة وأثرها قبل الحكم على الثغرة',
          'يستغني تماماً عن تحديد المتطلبات الأمنية للأصول',
          'ينتج أحكاماً متفرقة غير قابلة للمقارنة بين وحدات المنظمة'
        ],
        correctIndex: 1,
        explanation: 'القرار المبني على المخاطر ينطلق من غايات المنظمة وأصولها الحرجة ويُخضع أي ثغرة لتحليل النتيجة المحتملة والأثر وفق معايير موحدة قبل تخصيص موارد المعالجة.'
      }
    ],
    interactiveBook3D: {
      model3DType: 'octave_allegro_4phases_cube',
      shaderEffect: 'holographic_amber_grid',
      ambientColor: '#0f172a',
      accentColor: '#f59e0b',
      autoRotateSpeed: 1.2,
      pages3D: [
        {
          pageNumber: 1,
          spreadSide: 'right',
          title: 'معمارية OCTAVE Allegro رباعية المراحل',
          subtitle: 'من محركات الأعمال المؤسسية إلى استراتيجية المعالجة',
          summaryMarkdown: 'تُجسد هذه الصفحة ثلاثية الأبعاد المراحل الأربع لمنهجية **OCTAVE Allegro**: بدءاً من **تحديد المحركات (Establish Drivers)**، مروراً بـ **تحديد ملامح الأصول (Profile Assets)** وحاوياتها الثلاث، ثم **تحديد التهديدات (Identify Threats)**، وصولاً إلى **تحديد المخاطر ومعالجتها (Identify & Mitigate Risks)**.',
          interactiveFormula: 'Residual_Risk = Inherent_Risk × (1 - Control_Effectiveness)',
          labParameterName: 'كفاية الضوابط الأمنية على الحاويات (%)',
          labMin: 0,
          labMax: 100,
          labDefault: 60,
          labUnit: '%',
          labInterpretation: {
            0: 'خطر كامن كامل (100%): غياب تام للضوابط على الحاويات التقنية والمادية والبشرية.',
            25: 'حماية أولية ضعيفة: تقليص طفيف للخطر مع بقاء فجوات حرجة في الحاويات المادية والبشرية.',
            50: 'حماية متوسطة: خفض الخطر الكامن للنصف، لكن الخطر المتبقي قد يتجاوز حد التحمل.',
            75: 'حماية متقدمة متوازنة: الخطر المتبقي منخفض ويقع ضمن شهية المخاطر المؤسسية.',
            100: 'حماية نظرية قصوى: عملياً يبقى دائماً هامش خطر متبقٍ يُدار بالمراقبة والقبول الموثق.'
          },
          challengeQuestion: {
            question: 'إذا كان الخطر الكامن لتسرب بيانات بوابة القبول 80 نقطة، وطبقت الجامعة ضوابط تشفير ومصادقة خفضت الخطر بنسبة 70%، فكم يبلغ الخطر المتبقي؟',
            options: [
              '24 نقطة خطر متبقٍ (ضمن النطاق المقبول بعد التخفيف)',
              '80 نقطة لأن الخطر الكامن لا يتغير بتطبيق الضوابط',
              '56 نقطة خطر متبقٍ',
              'صفر، لأن التشفير يلغي المخاطر البشرية والمادية أيضاً'
            ],
            correctIndex: 0,
            feedbackCorrect: 'أحسنت! الخطر المتبقي = 80 × (1 - 0.70) = 24 نقطة، مع ضرورة استكمال ضوابط الحاويات المادية والبشرية.',
            feedbackWrong: 'راجع المعادلة: الخطر المتبقي = الخطر الكامن × (1 - نسبة فعالية الضوابط) = 80 × 0.30 = 24.'
          },
          aiTutorGuardrailTopics: ['OCTAVE Allegro', 'المراحل الأربع', 'الخطوات الثماني', 'الخطر الكامن', 'الخطر المتبقي', 'الحاويات الثلاث']
        },
        {
          pageNumber: 2,
          spreadSide: 'left',
          title: 'تحدي الموازن الأمني: القرار المبني على المخاطر مقابل القرار التفاعلي',
          subtitle: 'محاكاة توزيع ميزانية الحماية على الحاويات الثلاث (التقنية والمادية والبشرية)',
          summaryMarkdown: 'في الصفحة اليسرى من الكتاب الحيّ، تختبر كيف يؤدي البدء من **محركات المنظمة وأصولها الحرجة** إلى حماية متوازنة تشمل الحاوية التقنية والمادية والبشرية، بينما يؤدي القرار التفاعلي إلى ترك الحاويات الورقية والبشرية مكشوفة.',
          interactiveFormula: 'Balanced_Protection = min(Control_Tech, Control_Physical, Control_People)',
          labParameterName: 'توازن توزيع الضوابط عبر الحاويات الثلاث (1=تقني فقط .. 5=متوازن شامل)',
          labMin: 1,
          labMax: 5,
          labDefault: 4,
          labUnit: 'درجة توازن',
          labInterpretation: {
            1: 'تركيز 100% على الخادم التقني فقط: الأصل مكشوف تماماً عند طباعته ورقياً أو تداوله شفهياً.',
            2: 'تغطية تقنية عالية ومادية ضعيفة: بقاء فجوة في أشرطة النسخ الاحتياطي والوثائق الورقية.',
            3: 'تغطية متوسطة للحاويات الثلاث: انخفاض ملحوظ في المخاطر الكامنة.',
            4: 'تغطية متوازنة وفق OCTAVE Allegro: ربط الضوابط بمتطلبات سرية وتكامل وتوافر الأصل في كل حاوية.',
            5: 'حوكمة متكاملة: ضوابط وقائية وكشفية متزامنة على الحاويات التقنية والمادية والبشرية.'
          },
          challengeQuestion: {
            question: 'لماذا تفترض منهجية OCTAVE-S أن فريقاً صغيراً يعرف جميع أصول المنظمة، بينما تعتمد OCTAVE Allegro على ورش عمل واستبيانات حاويات؟',
            options: [
              'لأن OCTAVE-S صُممت للمنظمات الصغيرة جداً ذات الهياكل البسيطة، أما OCTAVE Allegro فتركز على تتبع الأصل المعلوماتي عبر حاوياته في المنظمات المتوسطة والكبيرة',
              'لأن OCTAVE-S لا تعترف بوجود حواسيب',
              'لأن OCTAVE Allegro تلغي مفهوم الأصل المعلوماتي',
              'لا يوجد أي فرق بين المنهجيتين'
            ],
            correctIndex: 0,
            feedbackCorrect: 'إجابة صحيحة! افتراض OCTAVE-S مشروع لصغر حجم المنظمة، بينما تفصل OCTAVE Allegro حاويات الأصل لتناسب البيئات المؤسسية الأوسع.',
            feedbackWrong: 'تذكر أن OCTAVE-S مخصصة للمنظمات الصغيرة، في حين تركز OCTAVE Allegro على الأصل المعلوماتي وحاوياته الثلاث.'
          },
          aiTutorGuardrailTopics: ['OCTAVE-S', 'OCTAVE Allegro', 'القرار المبني على المخاطر', 'توازن الحاويات']
        }
      ],
      stepByStep: [
        {
          stepNumber: 1,
          title: 'المرحلة 1: تأسيس محركات المنظمة ومعايير القياس (الخطوة 1)',
          description: 'يبني فريق التقييم معايير قياس الأثر (مرتفع، متوسط، منخفض) عبر مجالات الأثر المؤسسية ويرتب أولوياتها.',
          formulaOrRule: 'Step 1 → Worksheets 1a..1f (Risk Measurement Criteria)',
          visualState: 'phase_1_drivers_active',
          cameraFocus: { x: -2.0, y: 1.5, z: 3.0 }
        },
        {
          stepNumber: 2,
          title: 'المرحلة 2: بناء ملف الأصل الحرج وخريطة حاوياته (الخطوتان 2 و3)',
          description: 'توثيق الأصل المعلوماتي الحرج وملكية البيانات ومتطلباته الأمنية، ثم رسم خريطة حاوياته التقنية والمادية والبشرية (الداخلية والخارجية).',
          formulaOrRule: 'Steps 2 & 3 → Worksheet 8 (Asset Profile) + Worksheets 9a..9c (Container Map)',
          visualState: 'phase_2_containers_expanded',
          cameraFocus: { x: 2.0, y: 1.5, z: 3.0 }
        },
        {
          stepNumber: 3,
          title: 'المرحلة 3: استكشاف مجالات القلق وسيناريوهات التهديد (الخطوتان 4 و5)',
          description: 'تحويل المخاوف التشغيلية على كل حاوية إلى سيناريوهات تهديد مكتملة الأركان (الفاعل، الوسيلة، الدافع، النتيجة).',
          formulaOrRule: 'Steps 4 & 5 → Threat Scenarios & Questionnaires',
          visualState: 'phase_3_threats_pulsing',
          cameraFocus: { x: -2.0, y: -1.5, z: 3.0 }
        },
        {
          stepNumber: 4,
          title: 'المرحلة 4: حساب درجة الخطر واختيار نهج المعالجة (الخطوات 6 و7 و8)',
          description: 'تحديد العواقب على المنظمة، وحساب درجة الخطر النسبية، واختيار استراتيجية المعالجة المناسبة لكل حوض مخاطر.',
          formulaOrRule: 'Steps 6, 7 & 8 → Relative Risk Score & Mitigation Strategy (Worksheet 10)',
          visualState: 'phase_4_mitigation_shield',
          cameraFocus: { x: 2.0, y: -1.5, z: 3.0 }
        }
      ],
      hotspots: [
        {
          id: 'hs-ch1-drivers',
          label: 'نواة المحركات المؤسسية (الخطوة 1)',
          x: -1.8,
          y: 1.4,
          z: 0.5,
          coordinates: { x: -1.8, y: 1.4, z: 0.5 },
          title: 'معايير قياس المخاطر (Risk Measurement Criteria)',
          detailedExplanation: 'تمثل نقطة الانطلاق في OCTAVE Allegro؛ حيث تحول المنظمة غاياتها الاستراتيجية إلى مقاييس واضحة للأثر (السمعة، المالي، الإنتاجية، السلامة، الغرامات).',
          technicalMetric: 'Worksheets 1a–1f (6 Impact Areas)',
          securityImpact: 'حرج جداً',
          relatedControl: 'NCA ECC-2:2024 — ضابط إدارة مخاطر الأمن السيبراني (1-5)'
        },
        {
          id: 'hs-ch1-asset',
          label: 'ملف الأصل المعلوماتي (الخطوة 2)',
          x: 1.8,
          y: 1.4,
          z: 0.5,
          coordinates: { x: 1.8, y: 1.4, z: 0.5 },
          title: 'الأصل المعلوماتي الحرج (Critical Information Asset)',
          detailedExplanation: 'المعلومة المحورية التي لا تستطيع المنظمة تحقيق رسالتها بدونها، ويُحدد لها مالك رسمي ومتطلبات سرية وتكامل وتوافر وأهم متطلب أمني.',
          technicalMetric: 'Worksheet 8 (Information Asset Profile)',
          securityImpact: 'حرج جداً',
          relatedControl: 'NCA ECC-2:2024 — ضابط إدارة الأصول وتصنيف البيانات (2-1)'
        },
        {
          id: 'hs-ch1-containers',
          label: 'مصفوفة الحاويات الثلاث (الخطوة 3)',
          x: -1.8,
          y: -1.4,
          z: 0.5,
          coordinates: { x: -1.8, y: -1.4, z: 0.5 },
          title: 'خريطة بيئة خطر الأصل (Information Asset Risk Environment Map)',
          detailedExplanation: 'تحدد المواضع التقنية والمادية والبشرية (داخل المنظمة وخارجها) التي يُخزن فيها الأصل أو يُنقل أو يُعالج، لأن الأصل يرث ثغرات حاوياته.',
          technicalMetric: 'Worksheets 9a (Technical), 9b (Physical), 9c (People)',
          securityImpact: 'مرتفع',
          relatedControl: 'ISO/IEC 27005:2022 — Context & Asset Identification'
        },
        {
          id: 'hs-ch1-residual',
          label: 'درع الخطر المتبقي (الخطوات 6-8)',
          x: 1.8,
          y: -1.4,
          z: 0.5,
          coordinates: { x: 1.8, y: -1.4, z: 0.5 },
          title: 'تحليل العواقب واستراتيجية التخفيف (Risk Analysis & Mitigation)',
          detailedExplanation: 'يقيس الأثر على المنظمة ويحسب درجة الخطر النسبية لتحديد ما إذا كان الخطر يُخفف بضوابط على الحاويات أو يُنقل أو يُؤجل أو يُقبل.',
          technicalMetric: 'Worksheet 10 (Risk Worksheet)',
          securityImpact: 'حرج جداً',
          relatedControl: 'NIST SP 800-30 Rev.1 — Risk Framing & Response'
        }
      ]
    },
    richData: {
      id: 201,
      chapter_number: 1,
      title: 'مدخل إلى تحليل المخاطر السيبرانية ومنهجية OCTAVE Allegro',
      subtitle: 'المراحل الأربع، الخطوات الثماني، والقرار المبني على المخاطر',
      category: 'أساسي',
      pdfStartPage: 6,
      pdfEndPage: 17,
      description: 'مدخل تأسيسي شامل لتحليل مخاطر أمن المعلومات وفق منهجية OCTAVE Allegro ومقارنة القرار المبني على المخاطر بالقرار التفاعلي.',
      objectives: [
        'تعريف تحليل مخاطر أمن المعلومات وتوضيح دوره التشخيصي في إدارة المخاطر المستمرة.',
        'شرح المراحل الأربع والخطوات الثماني في منهجية OCTAVE Allegro.',
        'التمييز الدقيق بين الثغرة الأمنية والتهديد والخطر، وبين القرار المبني على المخاطر والقرار التفاعلي.',
        'تحديد الأصل المعلوماتي وحاوياته الثلاث (التقنية، المادية، البشرية) ومتطلباته الأمنية.',
        'التفريق بين المخاطر الكامنة (Inherent Risk) والمخاطر المتبقية (Residual Risk).'
      ],
      sections: [
        {
          heading: '1. تعريف تحليل المخاطر ومنهجية OCTAVE Allegro',
          content: 'تحليل المخاطر هو الأداة التشخيصية التي تربط أمن المعلومات بمحركات المنظمة وأهدافها، وتنفذ عبر 8 خطوات في 4 مراحل.',
          formula: 'Risk = Probability × Impact',
          saudiExample: 'في بوابة الخدمات الطلابية بجامعة سعودية، الأصل المعلوماتي هو بيانات الطلاب وسجلاتهم الأكاديمية، لا البوابة التقنية وحدها.'
        },
        {
          heading: '2. الحاويات الثلاث والمخاطر الكامنة والمتبقية',
          content: 'يعيش الأصل المعلوماتي داخل حاويات تقنية ومادية وبشرية، وتُطبق الضوابط على مستوى الحاويات لخفض الخطر الكامن إلى خطر متبقٍ مقبول.',
          formula: 'Residual Risk = Inherent Risk - Control Effect',
          saudiExample: 'تشفير قاعدة بيانات بوابة القبول يحمي الحاوية التقنية، بينما تتطلب النسخ الورقية المطبوعة ضوابط وصول مادية مستقلة.'
        }
      ],
      tables: [
        {
          title: 'مقارنة القرار المبني على المخاطر بالقرار المبني على الافتراض',
          headers: ['معيار المقارنة', 'القرار المبني على المخاطر', 'القرار المبني على افتراض أن الثغرة خطر'],
          rows: [
            ['نقطة البداية', 'غايات المنظمة وأهدافها وأصولها الحرجة', 'الثغرة المكتشفة'],
            ['النظرة', 'تنظيمية وتشغيلية شاملة', 'تفاعلية قائمة على رد الفعل'],
            ['معاملة الثغرة', 'تُحلل نتيجتها المحتملة وأثرها قبل الحكم عليها', 'تُعد خطراً مباشرة دون تحليل أثر'],
            ['قابلية المقارنة', 'نتائج متسقة عبر الزمن وبين الوحدات', 'نتائج متفرقة لا يجمعها معيار واحد']
          ]
        }
      ],
      commonMistake: {
        mistake: 'عدّ كل ثغرة مكتشفة في تقارير الفحص الآلي خطراً حرجاً يستلزم المعالجة الفورية دون النظر إلى قيمة الأصل وأثر الاستغلال.',
        fix: 'معاملة الثغرة بوصفها نقطة ضعف فقط، وعدم الحكم عليها كخطر إلا بعد تحليل نتيجتها المحتملة وأثرها على أهداف المنظمة.'
      },
      solvedExamples: [
        {
          title: 'تحليل حاويات أصل معلوماتي في بوابة خدمات طلابية',
          given: 'أصل معلوماتي يتمثل في «السجلات الأكاديمية للطلاب» يُعالج في خادم قاعدة بيانات، وتُطبع منه كشوف ورقية في عمادة القبول، ويطلع عليه موظفو التسجيل.',
          steps: [
            'تحديد الأصل المعلوماتي: السجلات الأكاديمية وبيانات الطلاب.',
            'حصر الحاوية التقنية: خادم قاعدة البيانات، تطبيق البوابة، الشبكة الداخلية.',
            'حصر الحاوية المادية: الكشوف الورقية المطبوعة وخزائن الأرشيف.',
            'حصر الحاوية البشرية: موظفو عمادة القبول والتسجيل الذين يعرفون تفاصيل السجلات.'
          ],
          result: 'خريطة بيئة خطر متكاملة تضمن عدم إغفال أي موضع يتعرض فيه الأصل للتهديد.',
          whyItMatters: 'إغفال الحاوية الورقية أو البشرية يجعل الأصل عرضة للتسريب حتى لو كانت قاعدة البيانات مشفرة بأقوى الخوارزميات.'
        }
      ],
      selfAssessment: [
        {
          question: 'علّل: لا تُعد كل ثغرة مكتشفة خطراً يجب معالجته.',
          answer: 'لأن الثغرة نقطة ضعف فقط، ولا تصبح خطراً يستلزم المعالجة إلا بعد تحليل نتيجتها المحتملة وأثرها على المنظمة.'
        },
        {
          question: 'فرّق بين المخاطر الكامنة والمخاطر المتبقية في ضوء الضوابط الأمنية القائمة.',
          answer: 'المخاطر الكامنة هي الخطر على الأصل قبل احتساب أثر الضوابط المطبقة عليه، أما المخاطر المتبقية فهي ما يبقى من الخطر بعد النظر في الضوابط القائمة وكفايتها.'
        }
      ],
      quiz: [
      {
        question: 'وفق منهجية OCTAVE Allegro، ما هي الخطوة الأولى التي يجب أن تبدأ بها المنظمة عملية تحليل المخاطر؟',
        options: [
          'تشغيل أدوات فحص الثغرات الآلية على جميع الخوادم المرتبطة بالإنترنت',
          'وضع معايير قياس المخاطر (Risk Measurement Criteria) المتسقة مع محركات وأهداف المنظمة',
          'شراء جدران حماية وأنظمة كشف تسلل لتقليل المخاطر الكامنة',
          'حصر جميع الأجهزة المكتبية والطابعات في سجل الأصول التقنية'
        ],
        correctIndex: 1,
        explanation: 'تبدأ المرحلة الأولى في OCTAVE Allegro (الخطوة 1) بوضع معايير قياس المخاطر المشتقة من محركات المنظمة وغاياتها، لأن التحليل المبني على المخاطر ينطلق مما يهم المنظمة لا من الأجهزة أو الثغرات.'
      },
      {
        question: 'في بوابة الخدمات الأكاديمية بجامعة سعودية، أي مما يلي يمثل «الأصل المعلوماتي» (Information Asset) بمعناه الدقيق في OCTAVE Allegro؟',
        options: [
          'خادم قاعدة البيانات Oracle الموجود في مركز البيانات الرئيسي',
          'سجلات الطلاب الأكاديمية وبياناتهم الشخصية ونتائجهم الدراسية',
          'جهاز التوجيه (Router) الذي يربط البوابة بشبكة الإنترنت',
          'موظف القبول والتسجيل المسؤول عن إدخال الدرجات'
        ],
        correctIndex: 1,
        explanation: 'الأصل المعلوماتي هو المعلومة ذاتها (سجلات الطلاب وبياناتهم)، بينما الخادم وجهاز التوجيه يمثلان حاويات تقنية، وموظف القبول يمثل حاوية بشرية.'
      },
      {
        question: 'عندما تطبق مؤسسة ضابط تشفير قوي (AES-256) على قاعدة بيانات الرواتب، لكن موظف المالية يطبع مسيرات الرواتب ورقياً ويتركها على مكتبه دون قفل، فما التفسير العلمي الصحيح؟',
        options: [
          'الضابط التقني كافٍ لحماية الأصل المعلوماتي في جميع حالاته',
          'الضابط الأمني يُطبق على مستوى الحاوية؛ فالتشفير حمى الحاوية التقنية وبقيت الحاوية المادية الورقية مكشوفة',
          'المخاطر الكامنة تساوي صفراً بعد تشفير قاعدة البيانات',
          'هذا التهديد يُصنف كمشكلة تقنية في عتاد الطابعة'
        ],
        correctIndex: 1,
        explanation: 'الضوابط الأمنية تُطبق على مستوى كل حاوية يعيش فيها الأصل المعلوماتي؛ لذا فإن حماية الحاوية التقنية بالتشفير لا تحمي الأصل حين ينتقل إلى حاوية مادية (ورقية) أو بشرية.'
      },
      {
        question: 'ما السمة المميزة للقرار الأمني المبني على المخاطر (Risk-Based Decision) مقارنةً بالقرار المبني على افتراض أن الثغرة خطر؟',
        options: [
          'يعامل كل ثغرة تقنية بوصفها خطراً حرجاً يتطلب إغلاقاً فورياً',
          'يبدأ من غايات المنظمة وأصولها الحرجة ويحلل النتيجة المحتملة وأثرها قبل الحكم على الثغرة',
          'يستغني تماماً عن تحديد المتطلبات الأمنية للأصول',
          'ينتج أحكاماً متفرقة غير قابلة للمقارنة بين وحدات المنظمة'
        ],
        correctIndex: 1,
        explanation: 'القرار المبني على المخاطر ينطلق من غايات المنظمة وأصولها الحرجة ويُخضع أي ثغرة لتحليل النتيجة المحتملة والأثر وفق معايير موحدة قبل تخصيص موارد المعالجة.'
      }
    ],
      flashcards: [
      {
        front: 'ما التعريف العلمي لتحليل مخاطر أمن المعلومات وما دوره في إدارة المخاطر؟',
        back: 'هو عملية تشخيصية منهجية لتحديد المخاطر على الأصول المعلوماتية وتقييم أثرها في سياق أهداف المنظمة، ويمثل الأساس التشخيصي الذي تُبنى عليه قرارات إدارة المخاطر المستمرة.',
        category: 'أساسيات'
      },
      {
        front: 'كم عدد المراحل والخطوات في منهجية OCTAVE Allegro؟',
        back: 'تتكون من أربع مراحل (تحديد المحركات، تحديد ملامح الأصول، تحديد التهديدات، تحديد المخاطر ومعالجتها) موزعة على ثماني خطوات متسلسلة.',
        category: 'منهجية OCTAVE'
      },
      {
        front: 'لماذا لا تُعدّ كل ثغرة أمنية مكتشفة خطراً يستوجب المعالجة الفورية؟',
        back: 'لأن الثغرة مجرد نقطة ضعف، ولا تصبح خطراً إلا إذا وُجد تهديد يستغلها وترتب على ذلك نتيجة ذات أثر سلبي معتبر على أهداف المنظمة.',
        category: 'مفاهيم جوهرية'
      },
      {
        front: 'ما الفرق بين الأصل المعلوماتي (Information Asset) والحاوية (Container)؟',
        back: 'الأصل المعلوماتي هو المعلومة ذات القيمة نفسها (كبيانات الطلاب)، بينما الحاوية هي الموضع الذي تُخزن فيه المعلومة أو تُنقل أو تُعالج عبره (تقنية، مادية، بشرية).',
        category: 'الأصول والحاويات'
      },
      {
        front: 'ما الفرق بين المخاطر الكامنة (Inherent Risk) والمخاطر المتبقية (Residual Risk)؟',
        back: 'المخاطر الكامنة هي مستوى الخطر قبل احتساب أثر الضوابط الأمنية، أما المخاطر المتبقية فهي ما يبقى من الخطر بعد تطبيق الضوابط الأمنية وتقييم كفايتها.',
        category: 'تحليل المخاطر'
      },
      {
        front: 'لماذا يُشترط إشراك ممثلين من الوحدات التشغيلية إلى جانب تقنية المعلومات في فريق تحليل المخاطر؟',
        back: 'لأن الوحدات التشغيلية هي الأقدر على فهم قيمة الأصل المعلوماتي وأثر تعطله على الأعمال، كما أن اجتماعهم يكشف فجوات إيصال السياسات وتطبيقها.',
        category: 'حوكمة التقييم'
      }
    ]
    },
    updated_at: NOW_TIMESTAMP
  },

  // =========================================================================
  // الفصل الثاني: تحليل التهديدات الداخلية والخارجية وبناء أشجار التهديد
  // =========================================================================
  {
    id: 202,
    chapter_number: 2,
    title: 'تحليل التهديدات الداخلية والخارجية وبناء أشجار التهديد (Threat Trees)',
    subtitle: 'تصنيف أشجار التهديد الأربع، خصائص السيناريو (الفاعل، الدافع، المسار، النتيجة)، والفجوات الأمنية',
    description: 'دراسة معمقة لتصنيف التهديدات الداخلية والخارجية وتهديدات الأطراف الثالثة، وبناء أشجار التهديد الأربع في OCTAVE Allegro (الفاعل، الوسيلة، الدافع، النتيجة)، وتحليل سطح الهجوم والفجوات التقنية والإجرائية والبشرية.',
    category: 'تصنيف التهديدات',
    difficulty: 'intermediate',
    pdfStartPage: 18,
    pdfEndPage: 29,
    diagramKey: 'ise232-risk-2',
    videoUrl: 'https://www.youtube.com/watch?v=8kVXKyGOYsY',
    videoDuration: '21:10',
    presentationUrl: '/presentations/ise232-risk-ch2.pdf',
    keyTopics: [
      'أشجار التهديد الأربع في OCTAVE Allegro (بشري تقني، بشري مادي، مشكلات تقنية، مشكلات أخرى)',
      'التهديدات الداخلية والخارجية وتهديدات الموردين والأطراف الثالثة',
      'أركان سيناريو التهديد: الفاعل (Actor)، الوسيلة (Means)، الدافع (Motive)، النتيجة (Outcome)',
      'النتائج الأربع للتهديدات: الإفشاء، التعديل، الفقدان/التدمير، والانقطاع',
      'سطح الهجوم (Attack Surface) والفجوات الأمنية (التقنية، الإجرائية، البشرية)',
      'الهندسة الاجتماعية بوصفها استغلالاً للحاوية البشرية',
    ],
    images: [
      {
        prompt: 'Threat tree four branches taxonomy: human actors technical means, human actors physical access, technical problems, other problems, 16:9',
        caption: 'أشجار التهديد الأربع في منهجية OCTAVE Allegro ومسارات تفرعها',
        alt: 'Threat tree four branches taxonomy',
        seed: 2021,
        isAIGenerated: true,
      },
      {
        prompt: 'Attack surface and container locations internal vs external for information assets, cybersecurity diagram, 16:9',
        caption: 'سطح الهجوم وتصنيف الحاويات الداخلية والخارجية للأصل المعلوماتي',
        alt: 'Attack surface and container locations',
        seed: 2022,
        isAIGenerated: true,
      },
    ],
    content: `## 2.1 تصنيف التهديدات وأشجار التهديد الأربع (Threat Trees)

يتعرض الأصل المعلوماتي لطيف واسع من التهديدات التي تنشأ من مصادر بشرية أو تقنية أو بيئية. ولضمان عدم إغفال أي مصدر تهديد أثناء التحليل، تصنف منهجية **OCTAVE Allegro** جميع التهديدات الممكنة في **أربع أشجار تهديد قياسية (Four Threat Trees)**؛ شجرتان مسببهما إنسان، وشجرتان مسببهما غير بشري:

| رقم الشجرة | اسم شجرة التهديد (Threat Tree) | طبيعة الفاعل / المصدر | أمثلة تطبيقية واقعية |
| :--- | :--- | :--- | :--- |
| **الشجرة 1** | **فاعلون بشريون بوسائل تقنية**<br>*(Human Actors Using Technical Means)* | بشري (داخلي أو خارجي)؛ متعمد أو غير متعمد | اختراق عبر الشبكة، برمجية فدية، تصيد إلكتروني، خطأ برمجي من مدير نظام عن بُعد |
| **الشجرة 2** | **فاعلون بشريون بوصول مادي**<br>*(Human Actors Using Physical Access)* | بشري (داخلي أو خارجي)؛ متعمد أو غير متعمد | سرقة خادم أو شريط نسخ احتياطي، الاطلاع على شاشة محطة عمل متروكة، إتلاف وثائق ورقية |
| **الشجرة 3** | **مشكلات تقنية**<br>*(Technical Problems)* | غير بشري (عيوب العتاد والبرمجيات) | تعطل أقراص التخزين (RAID Failure)، أخطاء برمجية (Bugs)، انهيار نظام التشغيل، ثغرات التصميم |
| **الشجرة 4** | **مشكلات أخرى**<br>*(Other Problems)* | غير بشري (بيئي / خارج عن السيطرة) | انقطاع التيار الكهربائي أو الاتصالات، الحرائق، الفيضانات، الكوارث الطبيعية، تعطل مورد خارجي |

---

## 2.2 التمييز الدقيق بين موقع الحاوية ونوع الفاعل

> [!warning]
> **خطأ منهجي شائع**: الخلط بين «موقع الحاوية» (داخلية/خارجية) و«نوع الفاعل» (داخلي/خارجي). **القاعدة الصحيحة**: يُصنف موقع الحاوية بحسب حدود سيطرة المنظمة، ولا يُستنتج نوع الفاعل آلياً من موقع الحاوية؛ فقد تتعرض **حاوية داخلية** (خادم داخل مقر المؤسسة) لهجوم من **فاعل خارجي** عبر الإنترنت، وقد تتعرض **حاوية خارجية** (نسخ احتياطية لدى طرف ثالث) لتهديد من **فاعل داخلي** أو من موظف المورد.

### مصفوفة الحاويات الداخلية والخارجية عبر الأنواع الثلاثة

| نوع الحاوية | حاوية داخلية (Internal Container — داخل حدود المنظمة) | حاوية خارجية (External Container — خارج حدود المنظمة) |
| :--- | :--- | :--- |
| **حاوية تقنية** | خوادم قواعد البيانات المحلية، الشبكة الداخلية (LAN)، أجهزة الموظفين | خوادم الاستضافة السحابية العامة، قنوات الربط مع شركات التأمين أو الموردين |
| **حاوية مادية** | خزائن الملفات الورقية في الأرشيف، غرف الخوادم، أشرطة النسخ داخل المقر | أشرطة النسخ المحفوظة لدى شركة أرشفة خارجية، كشوف الفواتير المرسلة بالبريد |
| **حاوية بشرية** | موظفو المنظمة (الأطباء، المحاسبون، مديرو الأنظمة) | موظفو شركات الصيانة المتعاقدة، موظفو شركات التأمين، المستشارون الخارجيون |

---

## 2.3 البنية التشريحية لسيناريو التهديد (Threat Scenario Anatomy)

يتكون كل سيناريو تهديد في شجرة التهديد من **أربع خصائص أساسية**:

$$\text{Threat Scenario} = \langle \text{Actor}, \text{Means}, \text{Motive}, \text{Outcome} \rangle$$

1. **الفاعل (Actor)**: من أو ما الذي يسبب الحدث؟ (موظف داخلي، مهاجم خارجي، عطل برمجي، انقطاع طاقة).
2. **الوسيلة / المسار (Means)**: كيف يصل الفاعل إلى الحاوية؟ (وصول شبكي تقني، وصول مادي مباشر، هندسة اجتماعية).
3. **الدافع (Motive)**: هل الفعل **عرضي/غير متعمد (Accidental)** أم **متعمد (Deliberate)**؟ *(ملاحظة هامة: خاصية الدافع تنطبق على الفاعل البشري وحده في الشجرتين 1 و2، ولا تنطبق على المشكلات التقنية أو البيئية في الشجرتين 3 و4)*.
4. **النتيجة (Outcome)**: الأثر المباشر الذي يصيب الأصل المعلوماتي، وينحصر في **أربع نتائج معيارية**:

| النتيجة (Outcome) | المعنى الأمني | المتطلب الأمني المنتهك | مثال تطبيقي |
| :--- | :--- | :--- | :--- |
| **الإفشاء (Disclosure)** | اطلاع جهة غير مخولة على الأصل المعلوماتي | **السرية (Confidentiality)** | تسريب سجلات المرضى أو كشوف الرواتب |
| **التعديل (Modification)** | تغيير غير مصرح به أو عبث ببيانات الأصل | **التكامل / السلامة (Integrity)** | تزوير رموز الفوترة أو تعديل الدرجات الأكاديمية |
| **الفقدان أو التدمير (Loss / Destruction)** | زوال الأصل المعلوماتي نهائياً دون إمكانية استعادته | **التوافر (Availability)** — دائم | احتراق أشرطة النسخ الاحتياطي الوحيدة أو حذف قاعدة بيانات بلا نسخ |
| **الانقطاع (Interruption)** | تعذر الوصول إلى الأصل المعلوماتي لفترة مؤقتة | **التوافر (Availability)** — مؤقت | هجوم حجب خدمة (DDoS) أو انقطاع الكهرباء لعدة ساعات |

---

## 2.4 الفجوات الأمنية وسطح الهجوم والهندسة الاجتماعية

- **سطح الهجوم (Attack Surface)**: مجموع نقاط الدخول والمسارات والحاويات التي يمكن للمهاجم عبرها الوصول إلى الأصل المعلوماتي. كلما زاد عدد الحاويات غير المضبوطة اتسع سطح الهجوم.
- **الفجوات الأمنية الثلاث**:
  1. **فجوة تقنية (Technical Vulnerability)**: مثل غياب التشفير، أو بقاء حسابات افتراضية، أو فشل ضوابط المصادقة.
  2. **فجوة إجرائية (Procedural Gap)**: مثل غياب إجراء رسمي لمراجعة السجلات، أو ترك الوثائق الورقية بلا سياسة مكتب نظيف.
  3. **فجوة بشرية (Human Vulnerability)**: ضعف الوعي الأمني القابل للاستغلال عبر **الهندسة الاجتماعية (Social Engineering)** (كالتصيد الاحتيالي Phishing أو انتحال الصفة Pretexting) حيث يُستغل الإنسان بوصفه حاوية للمعلومة دون الحاجة لثغرة برمجية.`,
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'أشجار التهديد الأربع في منهجية OCTAVE Allegro',
        subtitle: 'الإطار الشامل لحصر المصادر البشرية والتقنية والبيئية',
        bullets: [
          'الشجرة 1: فاعلون بشريون بوسائل تقنية (اختراق شبكي، برمجيات خبيثة، إساءة استخدام صلاحيات النظام).',
          'الشجرة 2: فاعلون بشريون بوصول مادي (سرقة أجهزة، تصوير وثائق ورقية، التلصص على الشاشات).',
          'الشجرة 3: مشكلات تقنية (أعطال الأقراص الصلبة، عيوب البرمجيات، انهيار أنظمة التشغيل).',
          'الشجرة 4: مشكلات أخرى (الحرائق، السيول، انقطاع الكهرباء والاتصالات، فشل الأطراف الثالثة).'
        ],
        keyHighlight: 'تقسم أشجار التهديد المصادر إلى فئتين بشريتين (ينطبق عليهما الدافع المتعمد أو العرضي) وفئتين غير بشريتين.',
        diagramTitle: 'هيكل أشجار التهديد الأربع في OCTAVE Allegro'
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'موقع الحاوية مقابل نوع الفاعل وتهديدات الطرف الثالث',
        subtitle: 'فك الارتباط الخاطئ بين مكان الأصل وهوية المهاجم',
        bullets: [
          'الحاوية الداخلية تقع تحت السيطرة الإدارية والمادية المباشرة للمنظمة، والخارجية تقع خارج حدودها.',
          'قد تتعرض حاوية داخلية لتهديد من فاعل خارجي (مثل مهاجم يخترق خادماً محلياً عبر الإنترنت).',
          'قد تتعرض حاوية خارجية لتهديد داخلي أو خارجي (مثل فقدان أشرطة نسخ احتياطي لدى شركة نقل متعاقدة).',
          'تهديدات سلاسل الإمداد والأطراف الثالثة تنشأ عندما ينتقل الأصل إلى حاويات يديرها مورد لا يطبق متطلبات أمن الأصل.'
        ],
        keyHighlight: 'تصنيف التهديد يبدأ بتحديد موقع الحاوية أولاً، ثم تحديد الفاعل والوسيلة في حقل مستقل دون خلط بينهما.',
        diagramTitle: 'مصفوفة تقاطع موقع الحاوية (داخلي/خارجي) مع نوع الفاعل'
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'الأركان الأربعة لسيناريو التهديد والنتائج المعيارية',
        subtitle: 'الفاعل (Actor) · الوسيلة (Means) · الدافع (Motive) · النتيجة (Outcome)',
        bullets: [
          'الفاعل والوسيلة يحددان مصدر الخطر ومسار وصوله إلى الحاوية الحاملة للأصل المعلوماتي.',
          'الدافع (متعمد أو عرضي) يخص الفاعل البشري فقط ولا يوصف به الحريق أو العطل الكهربائي.',
          'الإفشاء (Disclosure) ينتهك السرية، والتعديل (Modification) ينتهك التكامل والسلامة.',
          'الفقدان/التدمير (Loss/Destruction) ينتهك التوافر دائماً، والانقطاع (Interruption) ينتهك التوافر مؤقتاً.'
        ],
        keyHighlight: 'التفريق بين الفقدان (حريق يتلف الخادم بلا نسخ احتياطية) والانقطاع (انقطاع كهرباء لساعتين) حاسم في تقدير الأثر.',
        diagramTitle: 'مسار بناء سيناريو التهديد في شجرة التهديد'
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'سطح الهجوم والفجوات التقنية والإجرائية والبشرية',
        subtitle: 'كيف يرث الأصل المعلوماتي نقاط ضعف حاوياته؟',
        bullets: [
          'سطح الهجوم (Attack Surface): مجموع المنافذ والواجهات والحاويات التي يمكن استهداف الأصل عبرها.',
          'الثغرة التقنية: عيب في إعدادات النظام أو البرمجيات (مثل غياب التشفير أو ضعف المصادقة).',
          'الثغرة الإجرائية: غياب أو قصور في السياسات والضوابط التشغيلية (مثل عدم مراجعة سجلات التدقيق).',
          'الثغرة البشرية: استغلال الموظفين عبر الهندسة الاجتماعية والتصيد الاحتيالي للإفصاح عن أسرار العمل.'
        ],
        keyHighlight: 'الهندسة الاجتماعية تستهدف «الحاوية البشرية» مباشرةً، فتتجاوز أقوى الجدران النارية التقنية عبر إقناع الموظف.',
        diagramTitle: 'طبقات سطح الهجوم وأنواع الفجوات الأمنية الثلاث'
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'تطبيق عملي: ورقة عمل مخاطر لأصل بيانات فوترة المرضى (PBCD)',
        subtitle: 'تحليل سيناريو فقدان أشرطة النسخ الاحتياطي لدى مورد خارجي',
        bullets: [
          'الأصل المعلوماتي: بيانات فوترة المرضى وتحصيلها (PBCD) المحفوظة في أشرطة نسخ احتياطي.',
          'الحاوية: حاوية مادية خارجية (أشرطة مغناطيسية تُحفظ خارج الموقع لدى شركة أرشفة متعاقدة).',
          'السيناريو: فاعل بشري خارجي (موظف المورد) + وصول مادي + دافع عرضي (إهمال) → النتيجة: إفشاء أو فقدان.',
          'المعالجة الوقائية: تشفير أشرطة النسخ الاحتياطي قبل خروجها من المستشفى وضبط سلسلة الحيازة.'
        ],
        keyHighlight: 'تشفير الشريط المغناطيسي يحول حادثة «فقدان الشريط» من كارثة إفشاء بيانات طبية إلى حادث مادي محدود الأثر.',
        diagramTitle: 'نموذج تطبيقي لورقة عمل مخاطر أصل PBCD'
      }
    ],
    flashcards: [
      {
        front: 'ما هي أشجار التهديد الأربع في منهجية OCTAVE Allegro؟',
        back: '1) فاعلون بشريون بوسائل تقنية، 2) فاعلون بشريون بوصول مادي، 3) مشكلات تقنية، 4) مشكلات أخرى (كوارث طبيعية، انقطاع خدمات، أطراف ثالثة).',
        category: 'أشجار التهديد'
      },
      {
        front: 'ما هي العناصر الأربعة المكونة لسيناريو التهديد، وأيها يقتصر على الفاعل البشري؟',
        back: 'العناصر الأربعة هي: الفاعل، الوسيلة، الدافع، والنتيجة. وتقتصر خاصية «الدافع» (متعمد أو غير متعمد) على الفاعل البشري وحده.',
        category: 'سيناريو التهديد'
      },
      {
        front: 'ما الفرق بين نتيجتي «الفقدان/التدمير» (Loss/Destruction) و«الانقطاع» (Interruption)؟',
        back: 'الفقدان/التدمير يعني زوال الأصل المعلوماتي نهائياً (مثل تلف القرص بلا نسخ احتياطية)، أما الانقطاع فيعني تعذر الوصول المؤقت للأصل (مثل انقطاع الكهرباء أو هجوم DDoS).',
        category: 'نتائج التهديد'
      },
      {
        front: 'لماذا يُعدّ استنتاج نوع الفاعل من موقع الحاوية خطأً منهجياً في تحليل المخاطر؟',
        back: 'لأن الحاوية الداخلية قد يهاجمها فاعل خارجي عبر الشبكة، والحاوية الخارجية قد تتضرر بفعل فاعل داخلي أو خارجي؛ لذا يُوثق كل منهما في حقل مستقل.',
        category: 'الحاويات والفاعلون'
      },
      {
        front: 'قارن بين الثغرة التقنية والثغرة الإجرائية والثغرة البشرية.',
        back: 'التقنية عيب في البرمجيات/العتاد (ضعف مصادقة)، والإجرائية غياب ضابط تنظيمي (ترك ملفات ورقية بلا قفل)، والبشرية ضعف وعي الموظف أمام الهندسة الاجتماعية.',
        category: 'الفجوات الأمنية'
      },
      {
        front: 'كيف تعمل الهندسة الاجتماعية في ميزان منهجية OCTAVE Allegro؟',
        back: 'تستهدف الهندسة الاجتماعية «الحاوية البشرية» (الشخص الذي يعرف المعلومة أو يملك صلاحية الوصول إليها) وتدفعه لإفشاء الأصل أو تعديله دون الحاجة لثغرة تقنية.',
        category: 'الهندسة الاجتماعية'
      }
    ],
    miniQuiz: [
      {
        question: 'أي من أشجار التهديد الأربع في OCTAVE Allegro تخلو من حقل «الدافع» (متعمد / غير متعمد)؟',
        options: [
          'شجرة الفاعلين البشريين بوسائل تقنية فقط',
          'شجرة الفاعلين البشريين بوصول مادي فقط',
          'شجرتا المشكلات التقنية والمشكلات الأخرى (لأن مصدرهما غير بشري)',
          'جميع أشجار التهديد الأربع تحتوي على حقل الدافع'
        ],
        correctIndex: 2,
        explanation: 'الدافع (Motive) يعبر عن النية البشرية (متعمد أم عرضي)، ولذلك ينطبق فقط على الشجرتين البشريتين (1 و2) ولا ينطبق على المشكلات التقنية أو البيئية (الشجرتان 3 و4).'
      },
      {
        question: 'إذا أدى حريق في غرفة الخوادم إلى تلف الأقراص الصلبة التي تحوي قاعدة بيانات لم تُؤخذ لها أي نسخة احتياطية، فما النتيجة (Outcome) الدقيقة لهذا التهديد؟',
        options: [
          'إفشاء (Disclosure)',
          'تعديل (Modification)',
          'فقدان أو تدمير (Loss / Destruction)',
          'انقطاع مؤقت (Interruption)'
        ],
        correctIndex: 2,
        explanation: 'بما أن البيانات تلفت نهائياً ولا توجد نسخة احتياطية لاستعادتها، فالنتيجة هي «فقدان أو تدمير» (Loss/Destruction)، بينما لو كان انقطاعاً مؤقتاً للكهرباء لكانت النتيجة «انقطاع» (Interruption).'
      },
      {
        question: 'موظف في قسم الموارد البشرية أرسل بالخطأ ملف رواتب الموظفين عبر البريد الإلكتروني إلى جهة خارجية. كيف يُصنف هذا السيناريو في شجرة التهديد؟',
        options: [
          'فاعل بشري داخلي + وسائل تقنية + دافع غير متعمد (عرضي) + نتيجة: إفشاء',
          'فاعل بشري خارجي + وصول مادي + دافع متعمد + نتيجة: تعديل',
          'مشكلة تقنية + عطل برمجي + نتيجة: انقطاع',
          'مشكلة أخرى + طرف ثالث + نتيجة: تدمير'
        ],
        correctIndex: 0,
        explanation: 'الموظف يتبع للمنظمة (فاعل داخلي)، استخدم البريد الإلكتروني (وسيلة تقنية)، وقع الفعل بالخطأ (غير متعمد)، وأدى لاطلاع غير المخولين على البيانات (إفشاء).'
      },
      {
        question: 'ما الضابط الوقائي الأنسب لمعالجة فجوة إجرائية في حاوية مادية ورقية (سجلات طبية مطبوعة متروكة في ممر القسم المالي بلا ضبط وصول)؟',
        options: [
          'تثبيت برنامج مكافحة فيروسات على خادم البريد الإلكتروني',
          'تطبيق سياسة المكتب النظيف وحفظ السجلات الورقية في خزائن مقفلة بسجل استلام وتسليم على الحاوية المادية',
          'تحديث نظام تشغيل الخادم الرئيسي',
          'زيادة عرض النطاق الترددي للإنترنت'
        ],
        correctIndex: 1,
        explanation: 'بما أن الفجوة إجرائية في حاوية مادية ورقية، فإن الضابط الوقائي يجب أن يطبق على الحاوية المادية نفسها عبر خزائن مقفلة وضبط وصول مادي وسياسة مكتب نظيف.'
      }
    ],
    interactiveBook3D: {
      model3DType: 'threat_tree_4branches_hierarchy',
      shaderEffect: 'threat_pulse_crimson_glow',
      ambientColor: '#111827',
      accentColor: '#ef4444',
      autoRotateSpeed: 1.4,
      pages3D: [
        {
          pageNumber: 1,
          spreadSide: 'right',
          title: 'محاكي أشجار التهديد وسطح الهجوم',
          subtitle: 'تفكيك المسارات الهجومية من الفاعل إلى النتيجة',
          summaryMarkdown: 'يُظهر المجسم ثلاثي الأبعاد تفرع **أشجار التهديد الأربع** من الجذر (الأصل المعلوماتي داخل حاويته) إلى الفاعلين البشريين (تقني/مادي) والمشكلات غير البشرية (تقنية/أخرى)، وصولاً إلى النتائج الأربع (**الإفشاء، التعديل، الفقدان، الانقطاع**).',
          interactiveFormula: 'Attack_Surface_Index = ∑ (Container_Exposure × Vulnerability_Count)',
          labParameterName: 'عدد الحاويات المكشوفة بلا ضوابط وصول',
          labMin: 1,
          labMax: 5,
          labDefault: 2,
          labUnit: 'حاويات',
          labInterpretation: {
            1: 'سطح هجوم منضبط (حاوية واحدة): سهولة عالية في المراقبة وتطبيق الضوابط الوقائية.',
            2: 'سطح هجوم محدود: يتطلب مواءمة ضوابط الحاوية التقنية مع الحاوية البشرية.',
            3: 'سطح هجوم متوسط: تعدد مسارات التهديد بين الداخلي والخارجي يستلزم مراجعة شاملة.',
            4: 'سطح هجوم مرتفع الخطورة: وجود حاويات خارجية غير مشفرة لدى أطراف ثالثة.',
            5: 'سطح هجوم حرج جداً: الأصل مكشوف عبر جميع الحاويات التقنية والمادية والبشرية!'
          },
          challengeQuestion: {
            question: 'أي فرع من فروع شجرة التهديد يمثل هجوم تصيد احتيالي (Spear Phishing) يستهدف محاسب الشركة للحصول على كلمة مرور نظام الرواتب؟',
            options: [
              'فاعل بشري خارجي بوسائل تقنية (يستغل الحاوية البشرية للوصول للحاوية التقنية) بدافع متعمد',
              'مشكلة تقنية ناتجة عن تلف القرص الصلب',
              'مشكلة بيئية خارجية',
              'فاعل بشري داخلي بوصول مادي غير متعمد'
            ],
            correctIndex: 0,
            feedbackCorrect: 'إجابة دقيقة! المهاجم خارجي استخدم وسيلة تقنية (البريد الخبيث) بدافع متعمد لاستغلال المحاسب (حاوية بشرية) والوصول لنظام الرواتب.',
            feedbackWrong: 'تذكر أن المهاجم في التصيد الاحتيالي فاعل بشري خارجي متعمد يستخدم وسائل تقنية لخداع العنصر البشري.'
          },
          aiTutorGuardrailTopics: ['أشجار التهديد', 'الفاعل والوسيلة والدافع والنتيجة', 'سطح الهجوم', 'الهندسة الاجتماعية', 'الحاويات الداخلية والخارجية']
        },
        {
          pageNumber: 2,
          spreadSide: 'left',
          title: 'مختبر تفكيك الفجوات الثلاث والهندسة الاجتماعية',
          subtitle: 'ربط الثغرة التقنية والإجرائية والبشرية بنتائج التهديد الأربع',
          summaryMarkdown: 'تستعرض الصفحة اليسرى كيف يتحول **الإنسان إلى حاوية للمعلومة**، وكيف تستغل هجمات **الهندسة الاجتماعية** غياب الضوابط الإجرائية والبشرية لإحداث **إفشاء أو تعديل أو فقدان أو انقطاع** دون كسر سطر برمجي واحد.',
          interactiveFormula: 'Threat_Success = P(Social_Engineering) × (1 - Awareness_Level)',
          labParameterName: 'مستوى الوعي الأمني والضوابط الإجرائية للحاوية البشرية',
          labMin: 1,
          labMax: 5,
          labDefault: 3,
          labUnit: 'مستوى وعي',
          labInterpretation: {
            1: 'وعي منعدم وغياب سياسة مكتب نظيف: نجاح شبه مؤكد لهجمات التصيد وانتحال الصفة.',
            2: 'وعي محدود: انخداع الموظفين بالرسائل المستعجلة التي تنتحل صفة الإدارة العليا.',
            3: 'وعي متوسط: اكتشاف الرسائل البدائية مع بقاء خطر الهجمات الموجهة (Spear Phishing).',
            4: 'وعي مرتفع وضوابط إجرائية للتحقق الثنائي: إحباط معظم محاولات الهندسة الاجتماعية.',
            5: 'ثقافة أمنية راسخة مع فصل مهام وتدقيق مستمر: تحصين الحاوية البشرية والمادية.'
          },
          challengeQuestion: {
            question: 'ما الفرق الجوهري بين أثر «حريق يتلف خادم البيانات» وأثر «انقطاع التيار الكهربائي عن الخادم لثلاث ساعات» من حيث نتيجة التهديد؟',
            options: [
              'الحريق يؤدي إلى نتيجة «الفقدان أو التدمير» (إذا لم توجد نسخة احتياطية)، بينما انقطاع الكهرباء يؤدي إلى نتيجة «الانقطاع المؤقت»',
              'كلاهما يؤدي إلى نتيجة الإفشاء فقط',
              'كلاهما يؤدي إلى نتيجة التعديل فقط',
              'انقطاع الكهرباء يدمر البيانات نهائياً والحريق يوقفها مؤقتاً'
            ],
            correctIndex: 0,
            feedbackCorrect: 'تفرقة دقيقة! التلف الدائم هو «فقدان أو تدمير» (Loss/Destruction)، والتوقف المؤقت عن الخدمة هو «انقطاع» (Interruption).',
            feedbackWrong: 'ميز بين الزوال الدائم للأصل (فقدان/تدمير) والتعطل المؤقت للوصول إليه (انقطاع).'
          },
          aiTutorGuardrailTopics: ['الفقدان مقابل الانقطاع', 'الهندسة الاجتماعية', 'الفجوات الإجرائية', 'تهديدات الطرف الثالث']
        }
      ],
      stepByStep: [
        {
          stepNumber: 1,
          title: 'الخطوة 1: تحديد الحاوية المستهدفة وموقعها (داخلي / خارجي)',
          description: 'نبدأ بتحديد موضع الأصل المعلوماتي (خادم، وثيقة ورقية، موظف) وهل يقع داخل حدود المنظمة أم لدى طرف ثالث.',
          formulaOrRule: 'Container Location ∈ {Internal, External}',
          visualState: 'container_node_selected',
          cameraFocus: { x: 0.0, y: 2.2, z: 3.5 }
        },
        {
          stepNumber: 2,
          title: 'الخطوة 2: اختيار شجرة التهديد والفاعل والوسيلة',
          description: 'نحدد ما إذا كان المصدر فاعلاً بشرياً (بوسائل تقنية أو بوصول مادي) أم مشكلة تقنية أم مشكلة بيئية/أخرى.',
          formulaOrRule: 'Tree ∈ {Human-Tech, Human-Physical, Technical, Other}',
          visualState: 'actor_branch_highlighted',
          cameraFocus: { x: -1.8, y: 0.5, z: 3.0 }
        },
        {
          stepNumber: 3,
          title: 'الخطوة 3: تحديد الدافع البشري (متعمد أم عرضي)',
          description: 'في حال كان الفاعل بشرياً، نميز بين الهجوم المتعمد (Deliberate) والخطأ غير المتعمد (Accidental).',
          formulaOrRule: 'Motive ∈ {Accidental, Deliberate} (Human Trees Only)',
          visualState: 'motive_split_active',
          cameraFocus: { x: 1.8, y: 0.5, z: 3.0 }
        },
        {
          stepNumber: 4,
          title: 'الخطوة 4: ربط السيناريو بالنتيجة والمتطلب الأمني المنتهك',
          description: 'تحديد النتيجة المباشرة على الأصل: إفشاء (السرية)، تعديل (التكامل)، فقدان أو انقطاع (التوافر).',
          formulaOrRule: 'Outcome ∈ {Disclosure, Modification, Loss, Interruption}',
          visualState: 'outcome_leaf_glowing',
          cameraFocus: { x: 0.0, y: -2.0, z: 3.2 }
        }
      ],
      hotspots: [
        {
          id: 'hs-ch2-tree1',
          label: 'الشجرة 1: فاعل بشري بوسائل تقنية',
          x: -2.2,
          y: 0.8,
          z: 0.4,
          coordinates: { x: -2.2, y: 0.8, z: 0.4 },
          title: 'تهديدات الشبكة والبرمجيات الخبيثة (Human Actors - Technical Means)',
          detailedExplanation: 'تشمل الهجمات المنفذة عبر الشبكات أو البرمجيات من موظف داخلي أو مهاجم خارجي، سواء بقصد التخريب/السرقة أو بالخطأ التشغيلي.',
          technicalMetric: 'Tree 1: Actor (Int/Ext) → Motive (Acc/Del) → 4 Outcomes',
          securityImpact: 'حرج جداً',
          relatedControl: 'NCA ECC-2:2024 — أمن الشبكات (2-5) وإدارة الهويات والوصول (2-2)'
        },
        {
          id: 'hs-ch2-tree2',
          label: 'الشجرة 2: فاعل بشري بوصول مادي',
          x: -0.7,
          y: 0.8,
          z: 0.4,
          coordinates: { x: -0.7, y: 0.8, z: 0.4 },
          title: 'تهديدات الوصول الفيزيائي المباشر (Human Actors - Physical Access)',
          detailedExplanation: 'تشمل الدخول المادي لغرف الخوادم، سرقة الوسائط المحمولة، الاطلاع على الوثائق الورقية أو محطات العمل المتروكة دون قفل.',
          technicalMetric: 'Tree 2: Physical Breach / Unattended Workstation',
          securityImpact: 'مرتفع',
          relatedControl: 'NCA ECC-2:2024 — الأمن المادي والبيئي (2-13)'
        },
        {
          id: 'hs-ch2-tree3',
          label: 'الشجرة 3: المشكلات التقنية',
          x: 0.8,
          y: 0.8,
          z: 0.4,
          coordinates: { x: 0.8, y: 0.8, z: 0.4 },
          title: 'أعطال العتاد والبرمجيات (Technical Problems)',
          detailedExplanation: 'تشمل تلف وحدات التخزين، عيوب الأنظمة البرمجية، تعارض التحديثات، وامتلاء السعة التخزينية دون تدخل بشري مباشر.',
          technicalMetric: 'Tree 3: Hardware/Software Defects (No Motive Field)',
          securityImpact: 'مرتفع',
          relatedControl: 'NCA ECC-2:2024 — إدارة النسخ الاحتياطي (2-9) وحماية الأنظمة (2-3)'
        },
        {
          id: 'hs-ch2-tree4',
          label: 'الشجرة 4: المشكلات الأخرى والبيئية',
          x: 2.2,
          y: 0.8,
          z: 0.4,
          coordinates: { x: 2.2, y: 0.8, z: 0.4 },
          title: 'الكوارث البيئية وانقطاع الإمدادات والأطراف الثالثة (Other Problems)',
          detailedExplanation: 'تشمل انقطاع التيار الكهربائي، تعطل خطوط الاتصالات، الحرائق، الفيضانات، وإخفاق مزودي الخدمات الخارجيين.',
          technicalMetric: 'Tree 4: Environmental & Third-Party Dependencies',
          securityImpact: 'مرتفع',
          relatedControl: 'NCA ECC-2:2024 — إدارة استمرارية الأعمال (3-1) وأمن الأطراف الخارجية (4-1)'
        }
      ]
    },
    richData: {
      id: 202,
      chapter_number: 2,
      title: 'تحليل التهديدات الداخلية والخارجية وبناء أشجار التهديد',
      subtitle: 'أشجار التهديد الأربع، خصائص السيناريو، والفجوات الأمنية',
      category: 'أساسي',
      pdfStartPage: 18,
      pdfEndPage: 29,
      description: 'تحليل شامل للتهديدات الداخلية والخارجية وأشجار التهديد الأربع في OCTAVE Allegro وسطح الهجوم.',
      objectives: [
        'تعداد أشجار التهديد الأربع في OCTAVE Allegro والتمييز بين فروعها.',
        'المقارنة بين موقع الحاوية (داخلي/خارجي) ونوع الفاعل (داخلي/خارجي).',
        'تحليل عناصر سيناريو التهديد الأربعة (الفاعل، الوسيلة، الدافع، النتيجة).',
        'التمييز بين الفجوات التقنية والإجرائية والبشرية وتفسير أثر الهندسة الاجتماعية.'
      ],
      sections: [
        {
          heading: '1. أشجار التهديد الأربع وموقع الحاوية',
          content: 'تصنف التهديدات إلى أربع أشجار (شجرتان بشريتان وشجرتان غير بشريتين)، ويُحدد موقع الحاوية بمعزل عن نوع الفاعل.',
          formula: 'Threat Tree ∈ {T1: Human-Tech, T2: Human-Phys, T3: Tech-Defects, T4: Other}',
          saudiExample: 'حفظ نسخ احتياطية لمستشفى سعودي لدى مزود سحابي خارجي يمثل حاوية خارجية قد تتعرض لتهديد من فاعل خارجي أو داخلي.'
        },
        {
          heading: '2. خصائص سيناريو التهديد والفجوات الثلاث',
          content: 'يتكون السيناريو من الفاعل والوسيلة والدافع والنتيجة (إفشاء، تعديل، فقدان، انقطاع)، ويستغل فجوات تقنية أو إجرائية أو بشرية.',
          formula: 'Scenario = (Actor, Means, Motive, Outcome)',
          saudiExample: 'ترك شاشة نظام السجلات الطبية مفتوحة في عيادة خارجية يمثل فجوة إجرائية وبشرية تسمح بالاطلاع غير المصرح به (إفشاء).'
        }
      ],
      tables: [
        {
          title: 'خصائص سيناريو التهديد ونطاق انطباقها',
          headers: ['الخاصية', 'التعريف', 'نطاق الانطباق'],
          rows: [
            ['الفاعل (Actor)', 'الجهة أو السبب الذي يطلق التهديد', 'جميع أشجار التهديد الأربع'],
            ['الوسيلة (Means)', 'طريقة الوصول إلى الحاوية (تقنية/مادية)', 'أشجار الفاعلين البشريين'],
            ['الدافع (Motive)', 'متعمد (Deliberate) أو عرضي (Accidental)', 'الفاعلون البشريون فقط (الشجرتان 1 و2)'],
            ['النتيجة (Outcome)', 'إفشاء، تعديل، فقدان/تدمير، انقطاع', 'جميع أشجار التهديد الأربع']
          ]
        }
      ],
      commonMistake: {
        mistake: 'افتراض أن الحاوية الداخلية لا يهددها إلا فاعل داخلي، أو نسبة «الدافع المتعمد» إلى الكوارث الطبيعية والأعطال التقنية.',
        fix: 'الفصل التام بين حقل موقع الحاوية وحقل نوع الفاعل، وحصر خاصية الدافع في الفاعلين البشريين وحدهم.'
      },
      solvedExamples: [
        {
          title: 'بناء سيناريو تهديد لفشل ضوابط المصادقة على خادم الرواتب',
          given: 'خادم رواتب داخلي يعاني من ثغرة في آلية المصادقة تسمح بتجاوز كلمة المرور عبر الشبكة.',
          steps: [
            'تحديد الحاوية: خادم الرواتب (حاوية تقنية داخلية).',
            'تحديد الفاعل والوسيلة: فاعل بشري (داخلي أو خارجي) بوسائل تقنية عبر الشبكة.',
            'تحديد الدافع: متعمد (Deliberate).',
            'تحديد النتيجة: إفشاء مسيرات الرواتب (انتهاك السرية) أو تعديل المبالغ البنكية (انتهاك التكامل).'
          ],
          result: 'سيناريو تهديد كامل مرتبط بمتطلبي السرية والتكامل في ورقة عمل المخاطر.',
          whyItMatters: 'يربط الثغرة التقنية بنتيجتها التشغيلية والمالية المباشرة على المؤسسة.'
        }
      ],
      selfAssessment: [
        {
          question: 'قارن أثر حريق يتلف أجهزة تقنية المعلومات وأثر انقطاع إمدادات الطاقة على الأصل من حيث النتيجة.',
          answer: 'الحريق الذي يتلف الأجهزة بلا نسخ احتياطية يؤدي إلى نتيجة «الفقدان أو التدمير» الدائم، بينما انقطاع الطاقة يؤدي إلى نتيجة «الانقطاع» المؤقت.'
        }
      ],
      quiz: [
      {
        question: 'أي من أشجار التهديد الأربع في OCTAVE Allegro تخلو من حقل «الدافع» (متعمد / غير متعمد)؟',
        options: [
          'شجرة الفاعلين البشريين بوسائل تقنية فقط',
          'شجرة الفاعلين البشريين بوصول مادي فقط',
          'شجرتا المشكلات التقنية والمشكلات الأخرى (لأن مصدرهما غير بشري)',
          'جميع أشجار التهديد الأربع تحتوي على حقل الدافع'
        ],
        correctIndex: 2,
        explanation: 'الدافع (Motive) يعبر عن النية البشرية (متعمد أم عرضي)، ولذلك ينطبق فقط على الشجرتين البشريتين (1 و2) ولا ينطبق على المشكلات التقنية أو البيئية (الشجرتان 3 و4).'
      },
      {
        question: 'إذا أدى حريق في غرفة الخوادم إلى تلف الأقراص الصلبة التي تحوي قاعدة بيانات لم تُؤخذ لها أي نسخة احتياطية، فما النتيجة (Outcome) الدقيقة لهذا التهديد؟',
        options: [
          'إفشاء (Disclosure)',
          'تعديل (Modification)',
          'فقدان أو تدمير (Loss / Destruction)',
          'انقطاع مؤقت (Interruption)'
        ],
        correctIndex: 2,
        explanation: 'بما أن البيانات تلفت نهائياً ولا توجد نسخة احتياطية لاستعادتها، فالنتيجة هي «فقدان أو تدمير» (Loss/Destruction)، بينما لو كان انقطاعاً مؤقتاً للكهرباء لكانت النتيجة «انقطاع» (Interruption).'
      },
      {
        question: 'موظف في قسم الموارد البشرية أرسل بالخطأ ملف رواتب الموظفين عبر البريد الإلكتروني إلى جهة خارجية. كيف يُصنف هذا السيناريو في شجرة التهديد؟',
        options: [
          'فاعل بشري داخلي + وسائل تقنية + دافع غير متعمد (عرضي) + نتيجة: إفشاء',
          'فاعل بشري خارجي + وصول مادي + دافع متعمد + نتيجة: تعديل',
          'مشكلة تقنية + عطل برمجي + نتيجة: انقطاع',
          'مشكلة أخرى + طرف ثالث + نتيجة: تدمير'
        ],
        correctIndex: 0,
        explanation: 'الموظف يتبع للمنظمة (فاعل داخلي)، استخدم البريد الإلكتروني (وسيلة تقنية)، وقع الفعل بالخطأ (غير متعمد)، وأدى لاطلاع غير المخولين على البيانات (إفشاء).'
      },
      {
        question: 'ما الضابط الوقائي الأنسب لمعالجة فجوة إجرائية في حاوية مادية ورقية (سجلات طبية مطبوعة متروكة في ممر القسم المالي بلا ضبط وصول)؟',
        options: [
          'تثبيت برنامج مكافحة فيروسات على خادم البريد الإلكتروني',
          'تطبيق سياسة المكتب النظيف وحفظ السجلات الورقية في خزائن مقفلة بسجل استلام وتسليم على الحاوية المادية',
          'تحديث نظام تشغيل الخادم الرئيسي',
          'زيادة عرض النطاق الترددي للإنترنت'
        ],
        correctIndex: 1,
        explanation: 'بما أن الفجوة إجرائية في حاوية مادية ورقية، فإن الضابط الوقائي يجب أن يطبق على الحاوية المادية نفسها عبر خزائن مقفلة وضبط وصول مادي وسياسة مكتب نظيف.'
      }
    ],
      flashcards: [
      {
        front: 'ما هي أشجار التهديد الأربع في منهجية OCTAVE Allegro؟',
        back: '1) فاعلون بشريون بوسائل تقنية، 2) فاعلون بشريون بوصول مادي، 3) مشكلات تقنية، 4) مشكلات أخرى (كوارث طبيعية، انقطاع خدمات، أطراف ثالثة).',
        category: 'أشجار التهديد'
      },
      {
        front: 'ما هي العناصر الأربعة المكونة لسيناريو التهديد، وأيها يقتصر على الفاعل البشري؟',
        back: 'العناصر الأربعة هي: الفاعل، الوسيلة، الدافع، والنتيجة. وتقتصر خاصية «الدافع» (متعمد أو غير متعمد) على الفاعل البشري وحده.',
        category: 'سيناريو التهديد'
      },
      {
        front: 'ما الفرق بين نتيجتي «الفقدان/التدمير» (Loss/Destruction) و«الانقطاع» (Interruption)؟',
        back: 'الفقدان/التدمير يعني زوال الأصل المعلوماتي نهائياً (مثل تلف القرص بلا نسخ احتياطية)، أما الانقطاع فيعني تعذر الوصول المؤقت للأصل (مثل انقطاع الكهرباء أو هجوم DDoS).',
        category: 'نتائج التهديد'
      },
      {
        front: 'لماذا يُعدّ استنتاج نوع الفاعل من موقع الحاوية خطأً منهجياً في تحليل المخاطر؟',
        back: 'لأن الحاوية الداخلية قد يهاجمها فاعل خارجي عبر الشبكة، والحاوية الخارجية قد تتضرر بفعل فاعل داخلي أو خارجي؛ لذا يُوثق كل منهما في حقل مستقل.',
        category: 'الحاويات والفاعلون'
      },
      {
        front: 'قارن بين الثغرة التقنية والثغرة الإجرائية والثغرة البشرية.',
        back: 'التقنية عيب في البرمجيات/العتاد (ضعف مصادقة)، والإجرائية غياب ضابط تنظيمي (ترك ملفات ورقية بلا قفل)، والبشرية ضعف وعي الموظف أمام الهندسة الاجتماعية.',
        category: 'الفجوات الأمنية'
      },
      {
        front: 'كيف تعمل الهندسة الاجتماعية في ميزان منهجية OCTAVE Allegro؟',
        back: 'تستهدف الهندسة الاجتماعية «الحاوية البشرية» (الشخص الذي يعرف المعلومة أو يملك صلاحية الوصول إليها) وتدفعه لإفشاء الأصل أو تعديله دون الحاجة لثغرة تقنية.',
        category: 'الهندسة الاجتماعية'
      }
    ]
    },
    updated_at: NOW_TIMESTAMP
  },

  // =========================================================================
  // الفصل الثالث: إطار إدارة المخاطر وتحديد الأصول الحرجة وحاويات الأصول
  // =========================================================================
  {
    id: 203,
    chapter_number: 3,
    title: 'إطار إدارة المخاطر وتحديد الأصول الحرجة وحاويات الأصول (Asset Containers)',
    subtitle: 'التحضير المؤسسي، تحليل التقارب (Affinity Analysis)، الخطوات الثماني وأوراق العمل العشر، ودورة حياة المخاطر',
    description: 'تفصيل كامل لإطار عمل إدارة مخاطر أمن المعلومات، بدءاً من التحضير المؤسسي ورعاية الإدارة العليا وتشكيل فريق التقييم، مروراً باختيار الأصول الحرجة عبر تحليل التقارب (Affinity Analysis) مع عوامل النجاح الحرجة (CSF)، ووصولاً إلى تطبيق الخطوات الثماني وأوراق العمل (1–10).',
    category: 'إطار العمل والأصول',
    difficulty: 'advanced',
    pdfStartPage: 30,
    pdfEndPage: 42,
    diagramKey: 'ise232-risk-3',
    videoUrl: 'https://www.youtube.com/watch?v=8kVXKyGOYsY',
    videoDuration: '24:15',
    presentationUrl: '/presentations/ise232-risk-ch3.pdf',
    keyTopics: [
      'متطلبات التحضير للتقييم: رعاية الإدارة العليا وتشكيل الفريق (3–7 أعضاء)',
      'عوامل النجاح الحرجة (CSFs) وتحليل التقارب (Affinity Analysis) لاختيار الأصول الحرجة',
      'التفصيل الكامل للخطوات الثماني في OCTAVE Allegro ومخرجاتها (أوراق العمل 1–10)',
      'خريطة بيئة خطر الأصل المعلوماتي: الحاويات التقنية (9a) والمادية (9b) والبشرية (9c)',
      'أحواض المخاطر الأربعة (Risk Pools 1–4) وشجرة قرار المعالجة',
      'دورة حياة إدارة المخاطر (التأطير، التقييم، الاستجابة، المراقبة) وتكرار التقييم',
    ],
    images: [
      {
        prompt: 'OCTAVE Allegro 8 steps and 10 worksheets workflow diagram, information asset risk environment map, 16:9',
        caption: 'تدفق الخطوات الثماني وأوراق العمل العشر في منهجية OCTAVE Allegro',
        alt: 'OCTAVE Allegro 8 steps and 10 worksheets',
        seed: 2031,
        isAIGenerated: true,
      },
      {
        prompt: 'Information asset risk environment map showing internal and external technical physical people containers, 16:9',
        caption: 'خريطة بيئة خطر الأصل المعلوماتي: الحاويات التقنية والمادية والبشرية (الداخلية والخارجية)',
        alt: 'Asset risk environment map containers',
        seed: 2032,
        isAIGenerated: true,
      },
    ],
    content: `## 3.1 التحضير المؤسسي لتقييم المخاطر واختيار الأصول الحرجة

قبل الشروع في الخطوات الثماني لمنهجية **OCTAVE Allegro**، يجب استيفاء أربعة متطلبات تحضيرية حاسمة لنجاح التقييم:

1. **رعاية الإدارة العليا (Senior Management Sponsorship)**: هي العامل الحاسم الأول؛ إذ تضع الإدارة العليا معايير قياس المخاطر على مستوى المنظمة، وتمنح الفريق صلاحية الوصول للمعلومات، وتخصص الموارد والوقت، وتلتزم باتخاذ قرارات المعالجة.
2. **تشكيل فريق التقييم (Assessment Team)**: يتكون مثالياً من **3 إلى 7 أشخاص** يجمعون بين ممثلي الوحدات التشغيلية (مالكي الأعمال)، وممثلي تقنية المعلومات، ومختصي الأمن والامتثال.
3. **تحديد نطاق التقييم (Assessment Scope)**: ضبط حدود التقييم (منظمة كاملة، وحدة أعمال، أو مشروع محدد) لمنع تشتت الجهد.
4. **اختيار الأصول المعلوماتية الحرجة عبر تحليل التقارب (Affinity Analysis)**:
   - تجمع المنظمة قوائم الأصول من الوحدات المختلفة وتدمج المتشابه منها.
   - تُقابل الأصول المجمعة بـ **عوامل النجاح الحرجة (CSFs — Critical Success Factors)** ورسالة المنظمة؛ فالأصل الذي يؤدي غيابه أو فساده إلى فشل عامل نجاح حرج يُصنف **أصلاً معلوماتياً حرجاً (Critical Information Asset)** ويدخل نطاق التقييم (يُبدأ عادةً بـ 3 إلى 5 أصول حرجة في الدورة الأولى).

---

## 3.2 الجدول المرجعي الشامل للخطوات الثماني وأوراق العمل العشر في OCTAVE Allegro

| المرحلة (مجال النشاط) | رقم واسم الخطوة | أوراق العمل (Worksheets) | المخرج الرئيسي للخطوة |
| :--- | :--- | :--- | :--- |
| **1. تحديد المحركات**<br>*(Establish Drivers)* | **الخطوة 1**: وضع معايير قياس المخاطر | **أوراق 1a–1e** (المجالات الخمسة) + **1f** (محدد المستخدم) + **ورقة 7** (ترتيب الأولويات) | معايير قياس موحدة للأثر (مرتفع/متوسط/منخفض) وترتيب أهمية المجالات من 1 إلى 5 أو 6 |
| **2. تحديد ملامح الأصول**<br>*(Profile Assets)* | **الخطوة 2**: إعداد ملف الأصل المعلوماتي | **ورقة العمل 8**<br>*(Information Asset Profile)* | وثيقة تعرف حدود الأصل، مالكه، مسوغ أهميته، ومتطلبات السرية والتكامل والتوافر، وأهم متطلب أمني |
| **2. تحديد ملامح الأصول**<br>*(Profile Assets)* | **الخطوة 3**: تحديد حاويات الأصل المعلوماتي | **أوراق العمل 9a (تقنية)، 9b (مادية)، 9c (بشرية)** | خريطة بيئة خطر الأصل المعلوماتي مقسمة إلى حاويات داخلية وخارجية |
| **3. تحديد التهديدات**<br>*(Identify Threats)* | **الخطوة 4**: تحديد مجالات القلق | **ورقة العمل 10** (الحقول الأولى) | قائمة بمواقف التهديد الواقعية التي تقلق الفريق على الأصل في كل حاوية |
| **3. تحديد التهديدات**<br>*(Identify Threats)* | **الخطوة 5**: تحديد سيناريوهات التهديد | **استبيانات السيناريوهات** + **ورقة العمل 10** | سيناريوهات تهديد مفصلة (الفاعل، الوسيلة، الدافع، النتيجة، المتطلب المنتهك، والاحتمالية الاختيارية) |
| **4. تحديد المخاطر ومعالجتها**<br>*(Identify & Mitigate Risks)* | **الخطوة 6**: تحديد المخاطر | **ورقة العمل 10** (حقل العواقب) | بيان واضح للعواقب المؤسسية المترتبة على تحقق كل سيناريو تهديد |
| **4. تحديد المخاطر ومعالجتها**<br>*(Identify & Mitigate Risks)* | **الخطوة 7**: تحليل المخاطر | **ورقة العمل 10** (جدول الشدة والدرجة النسبية) | تقييم شدة الأثر في كل مجال وحساب **درجة الخطر النسبية (Relative Risk Score)** |
| **4. تحديد المخاطر ومعالجتها**<br>*(Identify & Mitigate Risks)* | **الخطوة 8**: اختيار نهج المعالجة | **ورقة العمل 10** (حقل المعالجة) | تصنيف المخاطر في **أحواض (Pools 1–4)** وتحديد قرار المعالجة والضوابط على الحاويات |

---

## 3.3 أدوار الجهات المعنية وحوكمة التقييم

| الدور المؤسسي | المسؤولية الجوهرية في عملية تحليل المخاطر |
| :--- | :--- |
| **راعي التقييم (الإدارة العليا)** | اعتماد معايير قياس المخاطر، توفير الموارد، واعتماد قرارات المعالجة وقبول المخاطر المتبقية |
| **مالك الأصل المعلوماتي (Asset Owner)** | تحديد قيمة الأصل ومتطلباته الأمنية (السرية، التكامل، التوافر) والمصادقة على دقة ملف الأصل |
| **ممثل تقنية المعلومات (IT Representative)** | توضيح الحاويات التقنية والبنية الشبكية والضوابط التقنية القائمة (لا ينفرد بتقدير أثر الأعمال) |
| **مديرو الوحدات التشغيلية** | تحديد مجالات القلق التشغيلية وتقدير العواقب الفعلية على الإنتاجية والسمعة والعمليات |

---

## 3.4 أحواض المخاطر الأربعة (Risk Pools) ودورة حياة إدارة المخاطر

تُوزع المخاطر في الخطوة 8 على **أربعة أحواض (4 Pools)** لتوجيه قرار المعالجة:

| الحوض (Pool) | معيار التصنيف (الدرجة النسبية والاحتمالية) | نهج المعالجة القياسي المقترح |
| :--- | :--- | :--- |
| **الحوض 1 (Pool 1)** | درجة خطر **30 إلى 45** (أو 16–29 مع احتمالية مرتفعة) | **تخفيف فوري (Mitigate)** عبر ضوابط أمنية على الحاويات |
| **الحوض 2 (Pool 2)** | درجة خطر **16 إلى 29** مع احتمالية متوسطة (أو 30–45 باحتمالية منخفضة) | **تخفيف أو تأجيل مشروط (Mitigate or Defer)** مع دراسة السياق |
| **الحوض 3 (Pool 3)** | درجة خطر **16 إلى 29** مع احتمالية منخفضة (أو 0–15 باحتمالية مرتفعة/متوسطة) | **تأجيل أو قبول (Defer or Accept)** مع مراقبة دورية |
| **الحوض 4 (Pool 4)** | درجة خطر **0 إلى 15** مع احتمالية منخفضة | **قبول رسمي موثق (Accept)** |

### دورة حياة إدارة المخاطر وتكرار التقييم
تقييم المخاطر ليس حدثاً لمرة واحدة، بل يدور في حلقة مستمرة (**التأطير ← التقييم ← الاستجابة ← المراقبة**). وتجمع المنظمات الناضجة بين **الأسلوب الهجين (Hybrid Approach)**: جدول زمني دوري (سنوي مثلاً) مقترناً بإعادة تقييم فورية عند وقوع **تغير جوهري (Significant Change)** كإطلاق منصة سحابية جديدة أو صدور تشريع تنظيمي جديد.`,
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'التحضير المؤسسي وتحليل التقارب (Affinity Analysis)',
        subtitle: 'كيف نختار الأصول المعلوماتية الحرجة التي تستحق التقييم؟',
        bullets: [
          'رعاية الإدارة العليا تضمن توحيد معايير القياس وتخصيص وقت الفريق واعتماد مخرجات المعالجة.',
          'يتشكل فريق التقييم من 3 إلى 7 أعضاء يجمعون الخبرة التشغيلية والتقنية والرقابية.',
          'تحليل التقارب (Affinity Analysis) يدمج قوائم الأصول المتشابهة ويقابلها بعوامل النجاح الحرجة (CSFs).',
          'الأصل الذي يتوقف عليه تحقيق رسالة المنظمة يُصنف أصلاً حرجاً ويُدرج في النطاق (3–5 أصول في البداية).'
        ],
        keyHighlight: 'لا يبدأ التقييم الناجح بجرد آلاف الأجهزة، بل باختيار الأصول المعلوماتية الحرجة المرتبطة بعوامل النجاح الحرجة.',
        diagramTitle: 'آلية تحليل التقارب لاختيار الأصول المعلوماتية الحرجة'
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'تدفق الخطوات الثماني وأوراق العمل العشر (Worksheets 1–10)',
        subtitle: 'الهندسة الإجرائية لمنهجية OCTAVE Allegro',
        bullets: [
          'الخطوة 1: أوراق العمل 1a–1f لتعريف مستويات الأثر + ورقة 7 لترتيب أولويات المجالات.',
          'الخطوة 2: ورقة العمل 8 لبناء ملف الأصل الحرج وتحديد مالكه وأهم متطلب أمني له.',
          'الخطوة 3: أوراق العمل 9a و9b و9c لرسم خريطة الحاويات التقنية والمادية والبشرية (الداخلية والخارجية).',
          'الخطوات 4 إلى 8: تتجمع في ورقة العمل 10 (مجالات القلق، السيناريوهات، العواقب، الدرجة النسبية، والمعالجة).'
        ],
        keyHighlight: 'كل خطوة في OCTAVE Allegro تسلم مخرجها كمدخل مباشر للخطوة التي تليها في سلسلة مترابطة.',
        diagramTitle: 'مخطط ترابط الخطوات الثماني وأوراق العمل العشر'
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'خريطة بيئة خطر الأصل المعلوماتي (الخطوة 3)',
        subtitle: 'تتبع حياة الأصل عبر الحاويات الداخلية والخارجية',
        bullets: [
          'ورقة العمل 9a (الحاويات التقنية): الخوادم، قواعد البيانات، التطبيقات، الشبكات المحلية والسحابية.',
          'ورقة العمل 9b (الحاويات المادية): الغرف، الخزائن، الملفات الورقية، الأقراص والأشرطة المحمولة.',
          'ورقة العمل 9c (الحاويات البشرية): الموظفون الداخليون وموظفو الموردين والشركاء الخارجيين.',
          'يرث الأصل المعلوماتي جميع التهديدات والثغرات الكامنة في كل حاوية يمر بها أو يستقر فيها.'
        ],
        keyHighlight: 'حصر الحاويات بدقة يرسم الحدود الحقيقية لنطاق التقييم ويمنع تضخمه أو إغفال الثغرات الخارجية.',
        diagramTitle: 'خريطة بيئة خطر الأصل المعلوماتي (9a / 9b / 9c)'
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'أحواض المخاطر الأربعة (Risk Pools) وشجرة قرار المعالجة',
        subtitle: 'ربط درجة الخطر النسبية والاحتمالية بقرار المعالجة',
        bullets: [
          'الحوض 1 (الخطورة القصوى: درجة 30–45 مع احتمالية عالية/متوسطة): يتطلب استراتيجية تخفيف فورية.',
          'الحوض 2 (الخطورة المتوسطة العليا): يُفاضل فيه بين التخفيف أو التأجيل المشروط بمراجعة الإدارة.',
          'الحوض 3 (الخطورة المتوسطة الدنيا): يُوجه نحو التأجيل المجدول أو القبول مع المراقبة.',
          'الحوض 4 (الخطورة المنخفضة: درجة 0–15 مع احتمالية منخفضة): يُقبل رسمياً ويوثق في السجل.'
        ],
        keyHighlight: 'لا يُترك أي خطر في سجل المخاطر دون قرار موثق ومالك مسؤول عن تنفيذ المعالجة أو متابعتها.',
        diagramTitle: 'مصفوفة توزيع المخاطر على الأحواض الأربعة'
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'دورة حياة إدارة المخاطر واستمرارية التقييم',
        subtitle: 'التأطير · التقييم · الاستجابة · المراقبة المستمرة',
        bullets: [
          'المرحلة 1 (التأطير Framing): وضع سياق المخاطر ومعايير القياس وحدود التحمل المؤسسية.',
          'المرحلة 2 (التقييم Assessing): تحديد الأصول والتهديدات والعواقب وحساب درجات الخطر.',
          'المرحلة 3 (الاستجابة Responding): اختيار وتطبيق استراتيجيات التخفيف أو النقل أو التجنب أو القبول.',
          'المرحلة 4 (المراقبة Monitoring): متابعة فعالية الضوابط وإعادة التقييم دورياً وعند التغيرات الجوهرية.'
        ],
        keyHighlight: 'النهج الهجين (جدول دوري + تقييم فوري عند التغير الجوهري) هو الممارسة المثلى لحوكمة المخاطر السيبرانية.',
        diagramTitle: 'الحلقة الدائرية لدورة حياة إدارة المخاطر'
      }
    ],
    flashcards: [
      {
        front: 'ما المقصود بتحليل التقارب (Affinity Analysis) في اختيار الأصول الحرجة؟',
        back: 'هو أسلوب منهجي لتجميع الأصول المتشابهة من وحدات المنظمة ومقابلتها بعوامل النجاح الحرجة (CSFs) لتحديد الأصول الضرورية لتحقيق رسالة المنظمة.',
        category: 'اختيار الأصول'
      },
      {
        front: 'ما الغرض من أوراق العمل 9a و9b و9c في منهجية OCTAVE Allegro؟',
        back: 'توثيق خريطة بيئة خطر الأصل المعلوماتي عبر حصر حاوياته التقنية (9a) والمادية (9b) والبشرية (9c) مقسمة إلى داخلية وخارجية.',
        category: 'أوراق العمل'
      },
      {
        front: 'ما الفرق بين دور مالك الأصل المعلوماتي ودور ممثل تقنية المعلومات في فريق التقييم؟',
        back: 'مالك الأصل يحدد قيمة المعلومة ومتطلباتها الأمنية وأثر تعطلها على العمل، بينما يوضح ممثل تقنية المعلومات بنية الحاويات التقنية والضوابط المطبقة عليها.',
        category: 'أدوار التقييم'
      },
      {
        front: 'ما هي العناصر الأربعة التي تراعيها استراتيجية المعالجة في الخطوة الثامنة؟',
        back: '1) قيمة الأصل المعلوماتي، 2) متطلبات أمنه، 3) الحاويات التي يوجد فيها، 4) بيئة التشغيل الخاصة بالمنظمة.',
        category: 'معالجة المخاطر'
      },
      {
        front: 'كيف توازن المنظمة بين التقييم الدوري والتقييم المبني على الحدث؟',
        back: 'باعتماد «الأسلوب الهجين» الذي يحدد جدولاً دورياً منتظماً للتقييم، مع اشتراط إجراء تقييم فوري كلما طرأ تغير جوهري في التقنية أو العمليات أو التهديدات.',
        category: 'دورة حياة المخاطر'
      },
      {
        front: 'لماذا تُعد رعاية الإدارة العليا (Senior Management Sponsorship) شرطاً لا غنى عنه قبل بدء الخطوات الثماني؟',
        back: 'لأن الإدارة العليا هي التي تعتمد معايير قياس المخاطر المؤسسية، وتوفر الوقت والموارد للفريق، وتملك صلاحية اعتماد خطط المعالجة وقبول المخاطر المتبقية.',
        category: 'الحوكمة'
      }
    ],
    miniQuiz: [
      {
        question: 'أي خطوة من خطوات OCTAVE Allegro الثماني يُنتج فيها «خريطة بيئة خطر الأصل المعلوماتي» (Worksheets 9a, 9b, 9c)؟',
        options: [
          'الخطوة 1: وضع معايير قياس المخاطر',
          'الخطوة 2: إعداد ملف الأصل المعلوماتي',
          'الخطوة 3: تحديد حاويات الأصل المعلوماتي',
          'الخطوة 7: تحليل المخاطر'
        ],
        correctIndex: 2,
        explanation: 'في الخطوة 3 (تحديد حاويات الأصل المعلوماتي) يتم رسم خريطة بيئة خطر الأصل باستخدام أوراق العمل 9a (التقنية) و9b (المادية) و9c (البشرية).'
      },
      {
        question: 'كيف تساعد عوامل النجاح الحرجة (Critical Success Factors - CSFs) فريق التقييم أثناء مرحلة التحضير؟',
        options: [
          'تُستخدم لاختيار نوع جدار الحماية التقني فقط',
          'تُقابل بها الأصول المعلوماتية عبر تحليل التقارب لتحديد الأصول الحرجة التي تدخل نطاق التقييم',
          'تحل محل سجل المخاطر النهائي',
          'تعفي المنظمة من إشراك الوحدات التشغيلية'
        ],
        correctIndex: 1,
        explanation: 'تُستخدم عوامل النجاح الحرجة (CSFs) في تحليل التقارب لفرز الأصول وتحديد أيها ضروري لتحقيق رسالة المنظمة ليدخل نطاق التقييم كأصل حرج.'
      },
      {
        question: 'إذا حصل خطر على درجة نسبية قدرها 36 من 45 مع احتمالية وقوع مرتفعة، ففي أي حوض (Pool) يقع وما القرار المقترح له؟',
        options: [
          'الحوض 4 — قبول الخطر دون إجراءات',
          'الحوض 3 — تأجيل النظر فيه للعام القادم',
          'الحوض 1 — تخفيف الخطر (Mitigate) بوضع ضوابط أمنية على الحاويات المعنية',
          'الحوض 2 — تجاهل الخطر لعدم أهميته'
        ],
        correctIndex: 2,
        explanation: 'الدرجة 36 تقع في النطاق الأعلى (30–45) ومع الاحتمالية المرتفعة تصنف في الحوض 1 (Pool 1) الذي يستوجب التخفيف الفوري.'
      },
      {
        question: 'مؤسسة مالية تجري تقييم مخاطر سنوياً في شهر يناير، وفي شهر مايو قررت ربط نظامها الأساسي ببوابة دفع سحابية خارجية جديدة. ما الإجراء الصحيح وفق دورة حياة إدارة المخاطر؟',
        options: [
          'الانتظار حتى شهر يناير القادم لإجراء التقييم في موعده الدوري',
          'تطبيق الأسلوب الهجين بإجراء تقييم مخاطر فوري للتغير الجوهري دون انتظار الموعد الدوري',
          'إلغاء التقييم السنوي نهائياً',
          'الاكتفاء بفحص الفيروسات على أجهزة الموظفين'
        ],
        correctIndex: 1,
        explanation: 'الربط ببوابة سحابية خارجية يمثل «تغيراً جوهرياً» في حاويات الأصل وبيئة التشغيل، مما يستوجب تقييماً فورياً وفق الأسلوب الهجين.'
      }
    ],
    interactiveBook3D: {
      model3DType: 'asset_containers_triad_matrix',
      shaderEffect: 'container_neon_wireframe',
      ambientColor: '#091526',
      accentColor: '#10b981',
      autoRotateSpeed: 1.1,
      pages3D: [
        {
          pageNumber: 1,
          spreadSide: 'right',
          title: 'معمارية الحاويات الثلاث والخطوات الثماني',
          subtitle: 'تمثيل ثلاثي الأبعاد لخريطة بيئة خطر الأصل (Worksheets 9a, 9b, 9c)',
          summaryMarkdown: 'يُظهر المجسم ثلاثي الأبعاد **الأصل المعلوماتي الحرج** في المركز محاطاً بمدارات حاوياته الثلاث (**التقنية 9a، المادية 9b، البشرية 9c**) مقسمة بين النطاق الداخلي والنطاق الخارجي، مع تتبع تدفق الخطوات الثماني حتى مصفوفة الأحواض الأربعة.',
          interactiveFormula: 'Pool_Index = f(Relative_Risk_Score ∈ [0..45], Probability ∈ {L, M, H})',
          labParameterName: 'درجة الخطر النسبية المحسوبة للأصل',
          labMin: 5,
          labMax: 45,
          labDefault: 32,
          labUnit: 'نقطة',
          labInterpretation: {
            5: 'الحوض 4 (0–15): خطر منخفض يُوجه للقبول والتوثيق.',
            15: 'الحد الفاصل بين الحوضين 3 و4: يتطلب مراجعة الاحتمالية.',
            25: 'الحوض 2 (16–29): خطر متوسط إلى مرتفع يستلزم التخفيف أو التأجيل المشروط.',
            32: 'الحوض 1 (30–45): خطر حرج يتطلب خطة تخفيف فورية على الحاويات.',
            45: 'الحد الأقصى للخطر (45/45): أثر مرتفع في جميع المجالات الخمسة!'
          },
          challengeQuestion: {
            question: 'لماذا تُفصل كل حاوية (تقنية، مادية، بشرية) إلى قسمين: داخلي وخارجي في أوراق العمل 9a و9b و9c؟',
            options: [
              'لأن الحاويات الخارجية تخضع لبيئة سيطرة وضوابط تعاقدية مختلفة عن الحاويات الداخلية التي تديرها المنظمة مباشرة',
              'لأغراض تجميلية في تنسيق الجداول فقط',
              'لأن الحاويات الخارجية لا تتعرض لأي تهديدات أمنية',
              'لإعفاء مالك الأصل من مسؤوليته القانونية'
            ],
            correctIndex: 0,
            feedbackCorrect: 'إجابة ممتازة! الحاويات الخارجية تقع خارج السيطرة المادية والإدارية المباشرة للمنظمة، فتتطلب ضوابط تعاقدية وتشفيرية خاصة.',
            feedbackWrong: 'تذكر أن موقع الحاوية يحدد مدى سيطرة المنظمة ونوع الضوابط الممكن فرضها.'
          },
          aiTutorGuardrailTopics: ['أوراق العمل 9a 9b 9c', 'تحليل التقارب', 'عوامل النجاح الحرجة', 'أحواض المخاطر الأربعة', 'الخطوات الثماني']
        },
        {
          pageNumber: 2,
          spreadSide: 'left',
          title: 'مختبر تحليل التقارب (Affinity Analysis) وأوراق العمل العشر',
          subtitle: 'ربط عوامل النجاح الحرجة (CSFs) باختيار الأصول الحرجة وتكرار التقييم',
          summaryMarkdown: 'في الصفحة اليسرى، تطبق عملياً **تحليل التقارب** لفرز قائمة كبيرة من الأصول واختيار الأصول الحرجة التي ترتبط مباشرةً بـ **عوامل النجاح الحرجة (CSFs)**، وتعاين متى تُفعّل المنظمة إعادة التقييم عند **التغير الجوهري**.',
          interactiveFormula: 'Asset_Criticality = ∑ (CSF_Dependency_Weight × Mission_Impact)',
          labParameterName: 'ارتباط الأصل بعوامل النجاح الحرجة للمنظمة (CSF Score)',
          labMin: 1,
          labMax: 5,
          labDefault: 5,
          labUnit: 'درجة ارتباط CSF',
          labInterpretation: {
            1: 'ارتباط هامشي: أصل تشغيلي ثانوي لا يعطل رسالة المنظمة (يُستبعد من النطاق الأولي).',
            2: 'ارتباط منخفض: أصل داعم يمكن تعويضه يدوياً دون أثر استراتيجي.',
            3: 'ارتباط متوسط: يدخل في المرحلة الثانية من التقييم بعد الأصول الحرجة.',
            4: 'ارتباط عالٍ: أصل مهم يمس أكثر من وحدة تشغيلية.',
            5: 'ارتباط حاسم بـ CSF: أصل معلوماتي حرج يتوقف عليه تحقيق رسالة المنظمة (يدخل النطاق فوراً).'
          },
          challengeQuestion: {
            question: 'ما الدور الصحيح لممثل إدارة تقنية المعلومات داخل فريق تقييم المخاطر المكون من 3 إلى 7 أعضاء؟',
            options: [
              'توضيح بنية الحاويات التقنية والضوابط المطبقة عليها لدعم الفريق، دون الانفراد بتحديد قيمة أصول الأعمال أو عواقبها التشغيلية',
              'الانفراد الكامل بكتابة التقييم وفرض القرارات على إدارات الأعمال',
              'الحضور كمراقب صامت دون تقديم أي معلومات عن الشبكة أو الخوادم',
              'إلغاء دور ملاك الأصول المعلوماتية'
            ],
            correctIndex: 0,
            feedbackCorrect: 'أحسنت! ممثل تقنية المعلومات خبير بالحاويات التقنية، بينما يحدد ملاك الأصول والوحدات التشغيلية قيمة الأصل وأثر تعطله على الأعمال.',
            feedbackWrong: 'تذكر أن تقييم المخاطر عمل تشاركي: تقنية المعلومات توضح الحاويات التقنية، وإدارات الأعمال تقيم قيمة الأصل وأثره.'
          },
          aiTutorGuardrailTopics: ['تحليل التقارب', 'عوامل النجاح الحرجة', 'فريق التقييم', 'التغير الجوهري']
        }
      ],
      stepByStep: [
        {
          stepNumber: 1,
          title: 'الخطوة 1: تحليل التقارب وتحديد الأصل الحرج (Worksheet 8)',
          description: 'ربط الأصول المعلوماتية بعوامل النجاح الحرجة (CSF) وتوثيق ملف الأصل ومالكه وأهم متطلب أمني له.',
          formulaOrRule: 'Asset × CSF → Critical Asset Profile (Worksheet 8)',
          visualState: 'core_asset_illuminated',
          cameraFocus: { x: 0.0, y: 0.0, z: 3.0 }
        },
        {
          stepNumber: 2,
          title: 'الخطوة 2: بناء مدار الحاويات التقنية (Worksheet 9a)',
          description: 'حصر جميع الأنظمة والخوادم وقواعد البيانات والشبكات الداخلية والسحابية التي يمر بها الأصل.',
          formulaOrRule: 'Technical Containers (Internal & External) → Worksheet 9a',
          visualState: 'ring_technical_9a_active',
          cameraFocus: { x: -2.0, y: 1.2, z: 3.2 }
        },
        {
          stepNumber: 3,
          title: 'الخطوة 3: بناء مدار الحاويات المادية والبشرية (Worksheets 9b & 9c)',
          description: 'حصر الوثائق الورقية وأشرطة النسخ والمواقع الفيزيائية (9b) والأفراد المطلعين على الأصل داخلياً وخارجياً (9c).',
          formulaOrRule: 'Physical (9b) + People (9c) Containers Mapped',
          visualState: 'rings_9b_9c_active',
          cameraFocus: { x: 2.0, y: 1.2, z: 3.2 }
        },
        {
          stepNumber: 4,
          title: 'الخطوة 4: التوزيع في أحواض المخاطر الأربعة (Pools 1–4)',
          description: 'دمج درجة الخطر النسبية مع الاحتمالية في مصفوفة الأحواض لتحديد قرار المعالجة على كل حاوية.',
          formulaOrRule: 'Score + Probability → Pool ∈ {1: Mitigate, 2: Mitigate/Defer, 3: Defer/Accept, 4: Accept}',
          visualState: 'pools_decision_tree_active',
          cameraFocus: { x: 0.0, y: -1.8, z: 3.5 }
        }
      ],
      hotspots: [
        {
          id: 'hs-ch3-ws8',
          label: 'ورقة العمل 8: ملف الأصل الحرج',
          x: 0.0,
          y: 1.6,
          z: 0.6,
          coordinates: { x: 0.0, y: 1.6, z: 0.6 },
          title: 'ملف تعريف الأصل المعلوماتي (Information Asset Profile)',
          detailedExplanation: 'يوثق اسم الأصل، مالكه، وصفه، مسوغ أهميته للمنظمة، ومتطلباته الأمنية (السرية، التكامل، التوافر) مع تحديد أهم متطلب أمني.',
          technicalMetric: 'Worksheet 8 — Asset Boundary & Most Important Requirement',
          securityImpact: 'حرج جداً',
          relatedControl: 'NCA ECC-2:2024 — إدارة الأصول (2-1-1 و 2-1-2)'
        },
        {
          id: 'hs-ch3-ws9a',
          label: 'ورقة العمل 9a: الحاويات التقنية',
          x: -1.9,
          y: -0.4,
          z: 0.5,
          coordinates: { x: -1.9, y: -0.4, z: 0.5 },
          title: 'خريطة الحاويات التقنية الداخلية والخارجية',
          detailedExplanation: 'تشمل الخوادم، قواعد البيانات، التطبيقات، ومعدات الشبكة داخل المنظمة أو لدى مزودي الخدمات السحابية.',
          technicalMetric: 'Worksheet 9a — Technical Risk Environment Map',
          securityImpact: 'حرج جداً',
          relatedControl: 'NCA ECC-2:2024 — حماية الأنظمة وأجهزة معالجة المعلومات (2-3)'
        },
        {
          id: 'hs-ch3-ws9b',
          label: 'ورقة العمل 9b: الحاويات المادية',
          x: 0.0,
          y: -1.6,
          z: 0.5,
          coordinates: { x: 0.0, y: -1.6, z: 0.5 },
          title: 'خريطة الحاويات المادية الداخلية والخارجية',
          detailedExplanation: 'تشمل المجلدات الورقية، الأقراص المدمجة، أشرطة النسخ الاحتياطي، وغرف الأرشيف داخل المقر أو لدى شركات الحفظ.',
          technicalMetric: 'Worksheet 9b — Physical Risk Environment Map',
          securityImpact: 'مرتفع',
          relatedControl: 'NCA ECC-2:2024 — الأمن المادي والبيئي (2-13)'
        },
        {
          id: 'hs-ch3-ws9c',
          label: 'ورقة العمل 9c: الحاويات البشرية',
          x: 1.9,
          y: -0.4,
          z: 0.5,
          coordinates: { x: 1.9, y: -0.4, z: 0.5 },
          title: 'خريطة الحاويات البشرية الداخلية والخارجية',
          detailedExplanation: 'تشمل الموظفين الداخليين وأفراد الأطراف الخارجية الذين يحملون معرفة تفصيلية بالأصل المعلوماتي أو يملكون صلاحية تداوله.',
          technicalMetric: 'Worksheet 9c — People Risk Environment Map',
          securityImpact: 'مرتفع',
          relatedControl: 'NCA ECC-2:2024 — الأمن السيبراني المتعلق بالموارد البشرية (1-9)'
        }
      ]
    },
    richData: {
      id: 203,
      chapter_number: 3,
      title: 'إطار إدارة المخاطر وتحديد الأصول الحرجة وحاويات الأصول',
      subtitle: 'الخطوات الثماني، أوراق العمل العشر، وخريطة بيئة خطر الأصل',
      category: 'متقدم',
      pdfStartPage: 30,
      pdfEndPage: 42,
      description: 'شرح تفصيلي للخطوات الثماني وأوراق العمل العشر في OCTAVE Allegro وآلية اختيار الأصول الحرجة.',
      objectives: [
        'تعداد مجالات النشاط الأربعة والخطوات الثماني في OCTAVE Allegro بترتيبها.',
        'تطبيق تحليل التقارب (Affinity Analysis) لاختيار الأصول الحرجة بناءً على عوامل النجاح الحرجة.',
        'إعداد ملف الأصل المعلوماتي (ورقة 8) وخريطة حاوياته التقنية والمادية والبشرية (9a, 9b, 9c).',
        'توظيف أحواض المخاطر الأربعة (Pools 1–4) في توجيه قرار المعالجة.'
      ],
      sections: [
        {
          heading: '1. الخطوات الثماني وأوراق العمل (1–10)',
          content: 'تنتقل المنهجية من وضع المعايير (خطوة 1) إلى ملف الأصل (خطوة 2) والحاويات (خطوة 3) ثم مجالات القلق والسيناريوهات والعواقب والتحليل والمعالجة (خطوات 4–8).',
          formula: '8 Steps → 10 Standardized Worksheets',
          saudiExample: 'تشكيل لجنة تقييم مخاطر في جهة حكومية سعودية برعاية وكيل الوزارة وعضوية ملاك الأصول وتقنية المعلومات والأمن السيبراني.'
        }
      ],
      tables: [
        {
          title: 'دليل نهج المعالجة بحسب الحوض (Risk Pools)',
          headers: ['الحوض', 'نطاق الدرجة والاحتمالية', 'قرار المعالجة المقترح'],
          rows: [
            ['الحوض 1', 'درجة 30–45 (أو 16–29 باحتمالية مرتفعة)', 'التخفيف (Mitigate)'],
            ['الحوض 2', 'درجة 16–29 باحتمالية متوسطة', 'التخفيف أو التأجيل (Mitigate / Defer)'],
            ['الحوض 3', 'درجة 0–15 باحتمالية متوسطة/مرتفعة', 'التأجيل أو القبول (Defer / Accept)'],
            ['الحوض 4', 'درجة 0–15 باحتمالية منخفضة', 'القبول (Accept)']
          ]
        }
      ],
      commonMistake: {
        mistake: 'ترك مهمة تقييم المخاطر لقسم تقنية المعلومات وحده دون إشراك ملاك الأصول والوحدات التشغيلية.',
        fix: 'تشكيل فريق متعدد التخصصات (3–7 أعضاء) برعاية الإدارة العليا لأن أثر الأعمال لا يقدره إلا أصحاب العمليات.'
      },
      solvedExamples: [
        {
          title: 'تحديد الحوض وقرار المعالجة لخطر ذي درجة نسبية 34 واحتمالية متوسطة',
          given: 'سيناريو تهديد على قاعدة بيانات الفوترة حصل على درجة خطر نسبية 34 من 45، وقُدرت احتماليته بأنها متوسطة.',
          steps: [
            'تحديد فئة الدرجة: 34 تقع في الفئة العليا (30 إلى 45).',
            'تقاطع الفئة (30–45) مع صف الاحتمالية المتوسطة في مصفوفة المخاطر النسبية يضع الخطر في الحوض 1 (Pool 1).',
            'قراءة نهج المعالجة المقترح للحوض 1: التخفيف (Mitigate).'
          ],
          result: 'يُصنف الخطر في الحوض 1 ويُلزم بوضع ضوابط تخفيف على الحاوية المعنية.',
          whyItMatters: 'يوفر قاعدة موضوعية شفافة لتحويل الدرجات النسبية إلى قرارات تنفيذية.'
        }
      ],
      selfAssessment: [
        {
          question: 'عدّد مجالات النشاط الأربعة في منهجية OCTAVE Allegro بترتيبها.',
          answer: 'تحديد المحركات، ثم تحديد ملامح الأصول، ثم تحديد التهديدات، ثم تحديد المخاطر ومعالجتها.'
        }
      ],
      quiz: [
      {
        question: 'أي خطوة من خطوات OCTAVE Allegro الثماني يُنتج فيها «خريطة بيئة خطر الأصل المعلوماتي» (Worksheets 9a, 9b, 9c)؟',
        options: [
          'الخطوة 1: وضع معايير قياس المخاطر',
          'الخطوة 2: إعداد ملف الأصل المعلوماتي',
          'الخطوة 3: تحديد حاويات الأصل المعلوماتي',
          'الخطوة 7: تحليل المخاطر'
        ],
        correctIndex: 2,
        explanation: 'في الخطوة 3 (تحديد حاويات الأصل المعلوماتي) يتم رسم خريطة بيئة خطر الأصل باستخدام أوراق العمل 9a (التقنية) و9b (المادية) و9c (البشرية).'
      },
      {
        question: 'كيف تساعد عوامل النجاح الحرجة (Critical Success Factors - CSFs) فريق التقييم أثناء مرحلة التحضير؟',
        options: [
          'تُستخدم لاختيار نوع جدار الحماية التقني فقط',
          'تُقابل بها الأصول المعلوماتية عبر تحليل التقارب لتحديد الأصول الحرجة التي تدخل نطاق التقييم',
          'تحل محل سجل المخاطر النهائي',
          'تعفي المنظمة من إشراك الوحدات التشغيلية'
        ],
        correctIndex: 1,
        explanation: 'تُستخدم عوامل النجاح الحرجة (CSFs) في تحليل التقارب لفرز الأصول وتحديد أيها ضروري لتحقيق رسالة المنظمة ليدخل نطاق التقييم كأصل حرج.'
      },
      {
        question: 'إذا حصل خطر على درجة نسبية قدرها 36 من 45 مع احتمالية وقوع مرتفعة، ففي أي حوض (Pool) يقع وما القرار المقترح له؟',
        options: [
          'الحوض 4 — قبول الخطر دون إجراءات',
          'الحوض 3 — تأجيل النظر فيه للعام القادم',
          'الحوض 1 — تخفيف الخطر (Mitigate) بوضع ضوابط أمنية على الحاويات المعنية',
          'الحوض 2 — تجاهل الخطر لعدم أهميته'
        ],
        correctIndex: 2,
        explanation: 'الدرجة 36 تقع في النطاق الأعلى (30–45) ومع الاحتمالية المرتفعة تصنف في الحوض 1 (Pool 1) الذي يستوجب التخفيف الفوري.'
      },
      {
        question: 'مؤسسة مالية تجري تقييم مخاطر سنوياً في شهر يناير، وفي شهر مايو قررت ربط نظامها الأساسي ببوابة دفع سحابية خارجية جديدة. ما الإجراء الصحيح وفق دورة حياة إدارة المخاطر؟',
        options: [
          'الانتظار حتى شهر يناير القادم لإجراء التقييم في موعده الدوري',
          'تطبيق الأسلوب الهجين بإجراء تقييم مخاطر فوري للتغير الجوهري دون انتظار الموعد الدوري',
          'إلغاء التقييم السنوي نهائياً',
          'الاكتفاء بفحص الفيروسات على أجهزة الموظفين'
        ],
        correctIndex: 1,
        explanation: 'الربط ببوابة سحابية خارجية يمثل «تغيراً جوهرياً» في حاويات الأصل وبيئة التشغيل، مما يستوجب تقييماً فورياً وفق الأسلوب الهجين.'
      }
    ],
      flashcards: [
      {
        front: 'ما المقصود بتحليل التقارب (Affinity Analysis) في اختيار الأصول الحرجة؟',
        back: 'هو أسلوب منهجي لتجميع الأصول المتشابهة من وحدات المنظمة ومقابلتها بعوامل النجاح الحرجة (CSFs) لتحديد الأصول الضرورية لتحقيق رسالة المنظمة.',
        category: 'اختيار الأصول'
      },
      {
        front: 'ما الغرض من أوراق العمل 9a و9b و9c في منهجية OCTAVE Allegro؟',
        back: 'توثيق خريطة بيئة خطر الأصل المعلوماتي عبر حصر حاوياته التقنية (9a) والمادية (9b) والبشرية (9c) مقسمة إلى داخلية وخارجية.',
        category: 'أوراق العمل'
      },
      {
        front: 'ما الفرق بين دور مالك الأصل المعلوماتي ودور ممثل تقنية المعلومات في فريق التقييم؟',
        back: 'مالك الأصل يحدد قيمة المعلومة ومتطلباتها الأمنية وأثر تعطلها على العمل، بينما يوضح ممثل تقنية المعلومات بنية الحاويات التقنية والضوابط المطبقة عليها.',
        category: 'أدوار التقييم'
      },
      {
        front: 'ما هي العناصر الأربعة التي تراعيها استراتيجية المعالجة في الخطوة الثامنة؟',
        back: '1) قيمة الأصل المعلوماتي، 2) متطلبات أمنه، 3) الحاويات التي يوجد فيها، 4) بيئة التشغيل الخاصة بالمنظمة.',
        category: 'معالجة المخاطر'
      },
      {
        front: 'كيف توازن المنظمة بين التقييم الدوري والتقييم المبني على الحدث؟',
        back: 'باعتماد «الأسلوب الهجين» الذي يحدد جدولاً دورياً منتظماً للتقييم، مع اشتراط إجراء تقييم فوري كلما طرأ تغير جوهري في التقنية أو العمليات أو التهديدات.',
        category: 'دورة حياة المخاطر'
      },
      {
        front: 'لماذا تُعد رعاية الإدارة العليا (Senior Management Sponsorship) شرطاً لا غنى عنه قبل بدء الخطوات الثماني؟',
        back: 'لأن الإدارة العليا هي التي تعتمد معايير قياس المخاطر المؤسسية، وتوفر الوقت والموارد للفريق، وتملك صلاحية اعتماد خطط المعالجة وقبول المخاطر المتبقية.',
        category: 'الحوكمة'
      }
    ]
    },
    updated_at: NOW_TIMESTAMP
  },

  // =========================================================================
  // الفصل الرابع: التحليل النوعي والكمي للمخاطر السيبرانية ومعادلات SLE/ALE/ROSI
  // =========================================================================
  {
    id: 204,
    chapter_number: 4,
    title: 'التحليل النوعي والكمي للمخاطر السيبرانية ومعادلات (AV, EF, SLE, ARO, ALE, ROSI)',
    subtitle: 'طيف أساليب التحليل، معايرة مقاييس الأثر والحدود الفاصلة، والنموذج المالي الكمي وعائد الاستثمار الأمني',
    description: 'دراسة متعمقة لطيف أساليب تحليل المخاطر (النوعي، شبه الكمي، الكمي)، ومعايرة مقاييس الأثر عبر مجالات الأثر الستة والحدود الفاصلة، مع التطبيق الرياضي والمالي الكامل لمعادلات التحليل الكمي (AV, EF, SLE, ARO, ALE) وحساب عائد الاستثمار في الضوابط الأمنية (ROSI).',
    category: 'التحليل الكمي والنوعي',
    difficulty: 'advanced',
    pdfStartPage: 43,
    pdfEndPage: 53,
    diagramKey: 'ise232-risk-4',
    videoUrl: 'https://www.youtube.com/watch?v=8kVXKyGOYsY',
    videoDuration: '26:30',
    presentationUrl: '/presentations/ise232-risk-ch4.pdf',
    keyTopics: [
      'طيف أساليب تحليل المخاطر: النوعي (Qualitative)، شبه الكمي (Semi-Quantitative)، والكمي (Quantitative)',
      'مجالات الأثر الستة (Impact Areas) ومعايرة المقاييس والحدود الفاصلة (Thresholds)',
      'معادلات التحليل الكمي: قيمة الأصل (AV)، عامل التعرض (EF)، وتوقع الخسارة الواحدة (SLE)',
      'المعدل السنوي للحدوث (ARO) وتوقع الخسارة السنوية (ALE = SLE × ARO)',
      'حساب عائد الاستثمار الأمني (ROSI — Return on Security Investment) وتبرير تكلفة الضوابط',
      'صيغ التحليل الثلاث في OCTAVE Allegro وموثوقية البيانات وتحيز التقدير',
    ],
    images: [
      {
        prompt: 'Qualitative semi-quantitative and quantitative risk analysis spectrum with SLE ALE ROSI formulas, 16:9',
        caption: 'طيف أساليب تحليل المخاطر: من الأوصاف النوعية والدرجات النسبية إلى النماذج المالية الكمية (SLE/ALE/ROSI)',
        alt: 'Risk analysis spectrum qualitative to quantitative',
        seed: 2041,
        isAIGenerated: true,
      },
      {
        prompt: 'Financial cybersecurity metrics dashboard showing Asset Value Exposure Factor SLE ARO ALE and ROSI calculation, 16:9',
        caption: 'لوحة النمذجة المالية للمخاطر السيبرانية وحساب عائد الاستثمار الأمني (ROSI)',
        alt: 'SLE ALE ROSI financial risk calculation',
        seed: 2042,
        isAIGenerated: true,
      },
    ],
    content: `## 4.1 طيف أساليب تحليل المخاطر: النوعي، شبه الكمي، والكمي

تتوزع أساليب قياس المخاطر السيبرانية على طيف متصل يضم ثلاثة مناهج رئيسية:

| أسلوب التحليل | طبيعة المقياس والبيانات | المزايا الرئيسية | القيود والتحديات |
| :--- | :--- | :--- | :--- |
| **1. التحليل النوعي**<br>*(Qualitative Analysis)* | أوصاف لفظية (مرتفع، متوسط، منخفض) مبنية على معايير محددة مسبقاً | سريع، مفهوم لغير المختصين، يلتقط الأبعاد غير الملموسة كالسمعة | لا يعطي مبالغ نقدية مباشرة لحساب العائد المالي الدقيق |
| **2. التحليل شبه الكمي**<br>*(Semi-Quantitative)* | تحويل المستويات النوعية إلى أوزان ودرجات رقمية نسبية (مثل 0 إلى 45 في OCTAVE Allegro) | يتيح ترتيب المخاطر ومقارنتها عبر عدة مجالات أثر بأوزان مختلفة | الأرقام للترتيب النسبي فقط (Ordinal)، فالدرجة 30 لا تعني ضعف الدرجة 15 مالياً |
| **3. التحليل الكمي**<br>*(Quantitative Analysis)* | قيم نقدية ومعدلات احتمالية رقمية ($AV, EF, SLE, ARO, ALE, ROSI$) | يدعم قرارات الميزانية ودراسات الجدوى المالية (Cost-Benefit Analysis) مباشرةً | يتطلب بيانات تاريخية دقيقة عن الحوادث وتكاليف الأصول يصعب توفرها دائماً |

---

## 4.2 مجالات الأثر الستة ومعايرة المقاييس في OCTAVE Allegro

تُبنى معايير قياس المخاطر في **OCTAVE Allegro** حول **خمسة مجالات أثر معيارية** بالإضافة إلى مجال سادس اختياري:

1. **السمعة وثقة العملاء (Reputation and Customer Confidence)**
2. **المجال المالي (Financial)**: خسائر الإيرادات أو ارتفاع تكاليف التشغيل.
3. **الإنتاجية (Productivity)**: ساعات العمل الضائعة وتعطل الكفاءة التشغيلية.
4. **السلامة والصحة (Safety and Health)**: الأثر على حياة وسلامة المرضى أو الموظفين أو الجمهور.
5. **الغرامات والعقوبات القانونية (Fines and Legal Penalties)**: الجزاءات التنظيمية وتكاليف التقاضي.
6. **مجال يحدده المستخدم (User-Defined Impact Area)**: تضيفه المنظمة عند الحاجة لقياس بُعد خاص برسالتها.

### طرق معايرة المقياس (Scale Calibration) والحدود الفاصلة
لا يجوز للمنظمة استخدام قوالب عامة صماء دون تكييفها؛ بل تُعاير أوراق العمل عبر ثلاث آليات:
- **ملء الفراغات (Fill-in-the-blanks)**: إدخال النسب المئوية أو المبالغ الخاصة بحجم المنظمة.
- **تعديل الأوصاف**: مواءمة العبارات مع طبيعة القطاع (حكومي، صحي، مالي، تعليمي).
- **وضع الحدود الفاصلة (Thresholds)**: تحديد رقم فاصل يفصل بين «منخفض» و«متوسط» و«مرتفع» (مثال: غرامة أقل من $10,000\text{ SAR}$ = منخفض، ومن $10,000$ إلى $100,000\text{ SAR}$ = متوسط، وأكثر من $100,000\text{ SAR}$ = مرتفع).

---

## 4.3 المعادلات الرياضية للتحليل الكمي للمخاطر ($AV, EF, SLE, ARO, ALE, ROSI$)

يعتمد التحليل الكمي الكلاسيكي على ستة متغيرات ومعادلات رياضية متسلسلة:

### 1. قيمة الأصل وعامل التعرض وتوقع الخسارة الواحدة ($AV, EF, SLE$)
- **قيمة الأصل ($AV$ — Asset Value)**: القيمة النقدية الإجمالية للأصل (تشمل تكلفة الإحلال، قيمة البيانات، والإيراد المرتبط به).
- **عامل التعرض ($EF$ — Exposure Factor)**: النسبة المئوية للخسارة التي تلحق بالأصل في حال وقوع الحادث لمرة واحدة، وتتراوح بين $0\%$ و $100\%$ ($0 \le EF \le 1$).
- **توقع الخسارة الواحدة ($SLE$ — Single Loss Expectancy)**: الخسارة المالية المتوقعة عند وقوع التهديد مرة واحدة:
$$\text{SLE} = \text{AV} \times \text{EF}$$

### 2. المعدل السنوي للحدوث وتوقع الخسارة السنوية ($ARO, ALE$)
- **المعدل السنوي للحدوث ($ARO$ — Annualized Rate of Occurrence)**: العدد المتوقع لمرات وقوع هذا التهديد خلال سنة واحدة (مثال: مرة كل 4 سنوات تعني $ARO = 0.25$؛ و3 مرات في السنة تعني $ARO = 3.0$).
- **توقع الخسارة السنوية ($ALE$ — Annualized Loss Expectancy)**: إجمالي الخسارة المالية المتوقعة سنوياً من هذا الخطر:
$$\text{ALE} = \text{SLE} \times \text{ARO} = (\text{AV} \times \text{EF}) \times \text{ARO}$$

### 3. حساب صافي قيمة الضابط وعائد الاستثمار الأمني ($ROSI$)
عند اقتراح ضابط أمني بتكلفة سنوية مقدارها $\text{Annual Cost of Control } (C_{\text{control}})$ يخفض الخسارة السنوية من $\text{ALE}_{\text{prior}}$ (قبل الضابط) إلى $\text{ALE}_{\text{post}}$ (بعد الضابط):

$$\text{Annual Risk Reduction (Savings)} = \text{ALE}_{\text{prior}} - \text{ALE}_{\text{post}}$$

$$\text{Net Value of Control} = (\text{ALE}_{\text{prior}} - \text{ALE}_{\text{post}}) - C_{\text{control}}$$

$$\text{ROSI (\%)} = \frac{(\text{ALE}_{\text{prior}} - \text{ALE}_{\text{post}}) - C_{\text{control}}}{C_{\text{control}}} \times 100\%$$

> [!success]
> **قاعدة القرار المالي**: إذا كان $\text{ROSI} > 0\%$ (أي أن الوفر السنوي في الخسائر المتوقعة أكبر من التكلفة السنوية للضابط)، فإن الاستثمار في الضابط الأمني **مجدي اقتصادياً ومبرر مالياً**.

---

## 4.4 مثال تطبيقي شامل ومحلول لمعادلات التحليل الكمي

**المعطيات**: تمتلك مؤسسة مالية سعودية خادم بوابة مدفوعات تبلغ قيمته الإجمالية مع بياناته $\text{AV} = 2,000,000\text{ SAR}$. تشير البيانات التاريخية إلى أن هجوم حجب خدمة موزع (DDoS) يتسبب في خسارة تعادل $15\%$ من قيمة الأصل في المرة الواحدة ($\text{EF} = 0.15$)، ويتكرر هذا الهجوم بمعدل مرتين سنوياً ($\text{ARO} = 2$). تدرس المؤسسة الاشتراك في خدمة حماية سحابية ضد DDoS بتكلفة سنوية $C_{\text{control}} = 120,000\text{ SAR}$، والتي تخفض معدل نجاح الهجوم إلى مرة واحدة كل 5 سنوات ($\text{ARO}_{\text{post}} = 0.20$).

**خطوات الحل**:
1. حساب الخسارة في الحادث الواحد ($\text{SLE}$):
   $$\text{SLE} = 2,000,000 \times 0.15 = 300,000\text{ SAR}$$
2. حساب الخسارة السنوية المتوقعة قبل الضابط ($\text{ALE}_{\text{prior}}$):
   $$\text{ALE}_{\text{prior}} = 300,000 \times 2 = 600,000\text{ SAR/year}$$
3. حساب الخسارة السنوية المتوقعة بعد الضابط ($\text{ALE}_{\text{post}}$):
   $$\text{ALE}_{\text{post}} = 300,000 \times 0.20 = 60,000\text{ SAR/year}$$
4. حساب الوفر السنوي وصافي القيمة و$\text{ROSI}$:
   $$\text{Savings} = 600,000 - 60,000 = 540,000\text{ SAR/year}$$
   $$\text{Net Benefit} = 540,000 - 120,000 = +420,000\text{ SAR/year}$$
   $$\text{ROSI} = \frac{540,000 - 120,000}{120,000} \times 100\% = \frac{420,000}{120,000} \times 100\% = +350\%$$

**القرار**: الاستثمار في ضابط الحماية يحقق عائداً أمنياً صافياً قدره $+350\%$ ويوفر على المؤسسة $420,000\text{ SAR}$ سنوياً.`,
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'طيف أساليب تحليل المخاطر: النوعي، شبه الكمي، والكمي',
        subtitle: 'متى نستخدم الأوصاف، ومتى نستخدم الدرجات النسبية أو المبالغ النقدية؟',
        bullets: [
          'التحليل النوعي (Qualitative): يصنف الأثر والاحتمالية بأوصاف (مرتفع/متوسط/منخفض) استناداً لمعايير معايرة.',
          'التحليل شبه الكمي (Semi-Quantitative): يحول التقديرات النوعية إلى درجات ترتيبية نسبية (مثل 0–45 في Allegro).',
          'التحليل الكمي (Quantitative): يعبر عن الخطر بمبالغ مالية حقيقية (ريال/دولار) ومعدلات حدوث سنوية.',
          'التكامل المنهجي: تستخدم OCTAVE Allegro إطاراً نوعياً/شبه كمي مع إدماج الحدود المالية الفاصلة في المعايير.'
        ],
        keyHighlight: 'لا يوجد أسلوب واحد يلغي الآخر؛ فالأرقام المالية تقنع المدير المالي، ومجالات الأثر النوعية تحمي السمعة والسلامة.',
        diagramTitle: 'طيف أساليب تحليل المخاطر الثلاثة'
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'مجالات الأثر الستة ومعايرة المقاييس والحدود الفاصلة',
        subtitle: 'تكييف أوراق العمل (1a–1f) لتعكس واقع المنظمة وحجمها المالي',
        bullets: [
          'المجالات الخمسة الإلزامية: السمعة وثقة العملاء، المالي، الإنتاجية، السلامة والصحة، الغرامات والعقوبات.',
          'المجال السادس (اختياري): مجال يحدده المستخدم وفق خصوصية قطاع المنظمة.',
          'الحدود الفاصلة (Thresholds): قيم رقمية تفصل بوضوح بين الأثر المنخفض والمتوسط والمرتفع.',
          'توحيد المعايير عبر المنظمة كلها شرط أساسي لمقارنة مخاطر الإدارات المختلفة بعدالة.'
        ],
        keyHighlight: 'غرامة قدرها 50,000 ريال قد تكون أثراً مرتفعاً لشركة ناشئة، لكنها أثر منخفض لمؤسسة مصرفية كبرى؛ لذا تجب المعايرة.',
        diagramTitle: 'معايرة الحدود الفاصلة في مجالات الأثر الستة'
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'معادلات التحليل الكمي: AV و EF و SLE و ARO و ALE',
        subtitle: 'البناء الرياضي لتوقع الخسارة الواحدة والسنوية',
        bullets: [
          'قيمة الأصل (AV): التكلفة الإجمالية للأصل المعلوماتي وحاويته وإيراداته المرتبطة.',
          'عامل التعرض (EF): نسبة الضرر المئوية من قيمة الأصل عند وقوع الحادث مرة واحدة (0% إلى 100%).',
          'توقع الخسارة الواحدة (SLE): حاصل ضرب قيمة الأصل في عامل التعرض (SLE = AV × EF).',
          'توقع الخسارة السنوية (ALE): حاصل ضرب SLE في المعدل السنوي للحدوث (ALE = SLE × ARO).'
        ],
        keyHighlight: 'معادلة ALE تحول الحوادث النادرة أو المتكررة إلى رقم سنوي موحد يسهل مقارنته بميزانية الأمن السيبراني السنوية.',
        diagramTitle: 'السلسلة الحسابية من قيمة الأصل (AV) إلى الخسارة السنوية (ALE)'
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'حساب عائد الاستثمار الأمني (ROSI) وتبرير الضوابط',
        subtitle: 'كيف نثبت للإدارة العليا الجدوى الاقتصادية للضابط الأمني؟',
        bullets: [
          'الوفر السنوي في الخطر = ALE قبل تطبيق الضابط مطروحاً منه ALE بعد تطبيق الضابط.',
          'صافي قيمة الضابط = الوفر السنوي في الخطر مطروحاً منه التكلفة السنوية للضابط الأمني.',
          'معادلة ROSI = ((ALE_prior - ALE_post) - Cost) / Cost × 100%.',
          'إذا كانت قيمة ROSI موجبة (> 0%) فإن الضابط يوفر على المؤسسة أكثر مما يكلفها.'
        ],
        keyHighlight: 'لا يُنفق 100,000 ريال سنوياً لحماية أصل لا تتجاوز خسارته السنوية المتوقعة (ALE) مبلغ 20,000 ريال.',
        diagramTitle: 'نموذج تقييم الجدوى المالية وعائد الاستثمار الأمني (ROSI)'
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'صيغ التحليل في OCTAVE Allegro وموثوقية البيانات',
        subtitle: 'الترتيب بالدرجة النسبية، القواسم الأربعة، أو مصفوفة الاحتمالية',
        bullets: [
          'الصيغة 1: الترتيب المباشر بدرجة الخطر النسبية (لا يتطلب تقدير الاحتمالية).',
          'الصيغة 2: تقسيم المخاطر إلى 4 مجموعات متساوية حسب مدى الدرجات.',
          'الصيغة 3: مصفوفة المخاطر النسبية التي تدمج درجة الخطر مع الاحتمالية في 4 أحواض.',
          'إذا قررت المؤسسة استخدام الاحتمالية وجب تطبيقها على جميع السيناريوهات بلا استثناء لضمان اتساق الترتيب.'
        ],
        keyHighlight: 'تتوقف جودة أي تحليل كمي أو نوعي على موثوقية البيانات وخلو تقديرات الخبراء من التحيز الشخصي.',
        diagramTitle: 'مقارنة صيغ التحليل الثلاث في OCTAVE Allegro'
      }
    ],
    flashcards: [
      {
        front: 'ما معادلة حساب توقع الخسارة الواحدة (SLE) وتوقع الخسارة السنوية (ALE)؟',
        back: 'SLE = AV × EF (قيمة الأصل × عامل التعرض)، و ALE = SLE × ARO (توقع الخسارة الواحدة × المعدل السنوي للحدوث).',
        category: 'معادلات كمية'
      },
      {
        front: 'كيف يُحسب عائد الاستثمار الأمني (ROSI)؟',
        back: 'ROSI = [((ALE قبل الضابط - ALE بعد الضابط) - التكلفة السنوية للضابط) ÷ التكلفة السنوية للضابط] × 100%.',
        category: 'معادلات كمية'
      },
      {
        front: 'ما هي مجالات الأثر المعيارية الخمسة في OCTAVE Allegro؟',
        back: '1) السمعة وثقة العملاء، 2) المالي، 3) الإنتاجية، 4) السلامة والصحة، 5) الغرامات والعقوبات القانونية (ويضاف إليها مجال سادس يحدده المستخدم عند الحاجة).',
        category: 'مجالات الأثر'
      },
      {
        front: 'لماذا لا يُعتد بالفرق العددي كقيمة مالية بين درجتي خطر نسبيتين (مثل 30 و 15) في التحليل شبه الكمي؟',
        back: 'لأن درجة الخطر النسبية أداة ترتيبية (Ordinal) تبين أي الخطرين أولى بالمعالجة فقط، ولا تعني أن الخطر ذا الدرجة 30 يساوي ضعف الخطر ذي الدرجة 15 مالياً.',
        category: 'التحليل شبه الكمي'
      },
      {
        front: 'ما المقصود بالحد الفاصل (Threshold) في معايرة معايير القياس؟',
        back: 'هو قيمة رقمية أو مالية صريحة تفصل بين نطاقات الأثر (منخفض / متوسط / مرتفع) مثل تحديد غرامة 25,000 دولار حداً فاصلاً للأثر المرتفع.',
        category: 'معايرة المقاييس'
      },
      {
        front: 'لماذا يجب تطبيق تقدير الاحتمالية على جميع سيناريوهات التهديد إذا قررت المؤسسة استعماله؟',
        back: 'حتى تُقارن جميع المخاطر على أساس موحد؛ فلو قُدرت الاحتمالية لبعض السيناريوهات دون بعض لاختل ميزان ترتيب الأولويات في السجل.',
        category: 'اتساق التحليل'
      }
    ],
    miniQuiz: [
      {
        question: 'أصل معلوماتي تبلغ قيمته (AV) 500,000 ريال، ويؤدي هجوم برمجية فدية إلى تدمير 40% من قيمته (EF = 0.40)، ويتوقع حدوث هذا الهجوم مرة واحدة كل سنتين (ARO = 0.5). ما قيمة توقع الخسارة السنوية (ALE)؟',
        options: [
          '200,000 ريال سنوياً',
          '100,000 ريال سنوياً',
          '250,000 ريال سنوياً',
          '50,000 ريال سنوياً'
        ],
        correctIndex: 1,
        explanation: 'أولاً نحسب SLE = AV × EF = 500,000 × 0.40 = 200,000 ريال. ثم نحسب ALE = SLE × ARO = 200,000 × 0.5 = 100,000 ريال سنوياً.'
      },
      {
        question: 'إذا كانت الخسارة السنوية المتوقعة قبل الضابط (ALE_prior) تساوي 400,000 ريال، وبعد تطبيق ضابط نسخ احتياطي سحابي بتكلفة سنوية 50,000 ريال انخفضت الخسارة السنوية (ALE_post) إلى 50,000 ريال، فكم يبلغ عائد الاستثمار الأمني (ROSI)؟',
        options: [
          '600%',
          '700%',
          '300%',
          '150%'
        ],
        correctIndex: 0,
        explanation: 'الوفر السنوي = 400,000 - 50,000 = 350,000 ريال. صافي العائد = 350,000 - 50,000 = 300,000 ريال. ROSI = (300,000 ÷ 50,000) × 100% = 600%.'
      },
      {
        question: 'في منهجية OCTAVE Allegro، أين تظهر المبالغ المالية الكمية داخل إطار التقييم؟',
        options: [
          'في حساب احتمال الهجوم فقط',
          'في ثلاثة مواضع: ملف الأصل (قيمة الأصل)، بيان النتيجة، والحدود الفاصلة في معايير قياس الأثر',
          'لا تسمح OCTAVE Allegro بذكر أي مبالغ مالية مطلقاً',
          'في أسماء أشجار التهديد الأربع فقط'
        ],
        correctIndex: 1,
        explanation: 'تدمج OCTAVE Allegro البيانات الكمية في ثلاثة مواضع: تسجيل القيمة النقدية في ملف الأصل، وذكر المبالغ في بيان النتيجة، وتحديد الحدود الفاصلة في معايير الأثر.'
      },
      {
        question: 'ما السبب العلمي للتعبير عن احتمالية وقوع الحوادث السيبرانية بمقياس نوعي (مرتفع/متوسط/منخفض) بدلاً من الأرقام الدقيقة في معظم التقييمات؟',
        options: [
          'لأن الحوادث السيبرانية والثغرات نادراً ما تتوفر لها سلاسل بيانات تاريخية إحصائية دقيقة وثابتة كبرامج التأمين التقليدية',
          'لأن الحواسيب لا تستطيع ضرب الكسور العشرية',
          'لأن الاحتمالية لا علاقة لها بتحليل المخاطر',
          'لإخفاء المعلومات عن الإدارة العليا'
        ],
        correctIndex: 0,
        explanation: 'التعبير عن احتمالية الهجمات السيبرانية بأرقام دقيقة صعب جداً لندرة البيانات التاريخية الموثوقة وتغير سلوك المهاجمين باستمرار.'
      }
    ],
    interactiveBook3D: {
      model3DType: 'quantitative_sle_ale_rosi_prism',
      shaderEffect: 'financial_matrix_gold_flux',
      ambientColor: '#0c192c',
      accentColor: '#fbbf24',
      autoRotateSpeed: 1.3,
      pages3D: [
        {
          pageNumber: 1,
          spreadSide: 'right',
          title: 'المختبر المالي الحيّ: محاكي معادلات SLE و ALE و ROSI',
          subtitle: 'التحليل الكمي للمخاطر السيبرانية وجدوى الاستثمار في الضوابط',
          summaryMarkdown: 'يُجسد المنشور المالي ثلاثي الأبعاد تفاعل المتغيرات الكمية الخمسة (**AV, EF, SLE, ARO, ALE**) مع تكلفة الضابط الأمني لحساب **عائد الاستثمار الأمني (ROSI)** لحظياً.',
          interactiveFormula: 'ALE = (AV × EF) × ARO  |  ROSI = ((ΔALE - Cost) / Cost) × 100%',
          labParameterName: 'عامل التعرض (EF) عند وقوع الحادث (×20%)',
          labMin: 1,
          labMax: 5,
          labDefault: 3,
          labUnit: 'مستوى تعرض',
          labInterpretation: {
            1: 'تعرض طفيف (EF = 20%): لعقار أصل قيمته مليون ريال، SLE = 200,000 ريال.',
            2: 'تعرض متوسط (EF = 40%): SLE = 400,000 ريال، يستدعي ضوابط وقائية متوسطة التكلفة.',
            3: 'تعرض مرتفع (EF = 60%): SLE = 600,000 ريال، يرفع ALE بشكل حاد ويزيد جدوى ROSI.',
            4: 'تعرض جسيم (EF = 80%): SLE = 800,000 ريال، يتطلب ضوابط حماية عالية الاعتمادية.',
            5: 'تدمير كلي للأصل (EF = 100%): SLE = 1,000,000 ريال (فقدان كامل لقيمة الأصل في حادث واحد).'
          },
          challengeQuestion: {
            question: 'إذا كان توقع الخسارة الواحدة (SLE) يساوي 150,000 ريال، ويقع الحادث مرة كل 3 سنوات (ARO = 1/3)، فكم تبلغ الخسارة السنوية المتوقعة (ALE)؟',
            options: [
              '50,000 ريال سنوياً',
              '450,000 ريال سنوياً',
              '150,000 ريال سنوياً',
              '15,000 ريال سنوياً'
            ],
            correctIndex: 0,
            feedbackCorrect: 'أحسنت! ALE = SLE × ARO = 150,000 × (1/3) = 50,000 ريال سنوياً.',
            feedbackWrong: 'اضرب SLE في ARO: 150,000 × (1 ÷ 3) = 50,000 ريال سنوياً.'
          },
          aiTutorGuardrailTopics: ['AV', 'EF', 'SLE', 'ARO', 'ALE', 'ROSI', 'التحليل الكمي والنوعي', 'الحدود الفاصلة']
        },
        {
          pageNumber: 2,
          spreadSide: 'left',
          title: 'مختبر معايرة الحدود الفاصلة وعائد الاستثمار الأمني (ROSI)',
          subtitle: 'محاكاة القرار المالي للمدير التنفيذي والمدير المالي',
          summaryMarkdown: 'تمكّنك الصفحة اليسرى من اختبار حساسية **عائد الاستثمار الأمني ($\text{ROSI}$)** عند تغير تكلفة الضابط الأمني أو تغير المعدل السنوي للحدوث ($\text{ARO}$)، مع ضبط **الحدود الفاصلة** للغرامات في أوراق العمل.',
          interactiveFormula: 'Net_Savings = (AV × EF × ARO_prior) - (AV × EF × ARO_post) - Control_Cost',
          labParameterName: 'نسبة خفض المخاطر المتحققة من الضابط الأمني (×20%)',
          labMin: 1,
          labMax: 5,
          labDefault: 4,
          labUnit: 'مستوى فعالية (×20%)',
          labInterpretation: {
            1: 'خفض ضعيف (20%): قد لا يغطي الوفر السنوي تكلفة شراء وتشغيل الضابط (ROSI سالب).',
            2: 'خفض متوسط (40%): نقطة التعادل المالي (Break-even) بين التكلفة والوفر.',
            3: 'خفض جيد (60%): عائد استثمار أمني موجب يدعم تبرير الميزانية.',
            4: 'خفض قوي (80%): عائد استثمار أمني مرتفع جداً يحمي ميزانية المؤسسة.',
            5: 'خفض شبه كامل (95%+): أقصى جدوى اقتصادية مع بقاء خطر متبقٍ ضئيل جداً.'
          },
          challengeQuestion: {
            question: 'حددت مؤسسة حداً فاصلاً مالياً للغرامات القانونية قدره 25,000 دولار (ما زاد عنه يعد أثراً مرتفعاً = 3). إذا كان سيناريو اختراق يؤدي لغرامة تنظيمية قدرها 40,000 دولار، فما قيمة الأثر المسندة؟',
            options: [
              'أثر مرتفع (القيمة = 3) لتجاوزه الحد الفاصل المعلن (25,000 دولار)',
              'أثر منخفض (القيمة = 1)',
              'أثر متوسط (القيمة = 2)',
              'لا يُحسب له أي أثر'
            ],
            correctIndex: 0,
            feedbackCorrect: 'إجابة صحيحة! بما أن الغرامة المتوقعة (40,000 دولار) تتجاوز الحد الفاصل للأثر المرتفع (25,000 دولار)، تُسند لها القيمة 3 مباشرةً.',
            feedbackWrong: 'قارن المبلغ المتوقع (40,000) بالحد الفاصل (25,000): بما أنه تجاوزه فيأخذ درجة الأثر المرتفع (3).'
          },
          aiTutorGuardrailTopics: ['الحدود الفاصلة', 'ROSI', 'جدوى الضوابط', 'معايرة المقاييس']
        }
      ],
      stepByStep: [
        {
          stepNumber: 1,
          title: 'الخطوة 1: تقدير قيمة الأصل (AV) وعامل التعرض (EF)',
          description: 'حساب القيمة المالية الكلية للأصل المعلوماتي وتحديد النسبة المئوية للضرر المتوقع من حادث واحد.',
          formulaOrRule: 'SLE = AV × EF',
          visualState: 'sle_base_computed',
          cameraFocus: { x: -2.0, y: 1.5, z: 3.0 }
        },
        {
          stepNumber: 2,
          title: 'الخطوة 2: ضرب SLE في المعدل السنوي للحدوث (ARO)',
          description: 'تحويل خسارة الحادث الواحد إلى توقع خسارة سنوية مستمرة (ALE_prior) قبل تطبيق الضابط المقترح.',
          formulaOrRule: 'ALE_prior = SLE × ARO_prior',
          visualState: 'ale_prior_column_high',
          cameraFocus: { x: 0.0, y: 1.5, z: 3.2 }
        },
        {
          stepNumber: 3,
          title: 'الخطوة 3: محاكاة أثر الضابط الأمني (ALE_post)',
          description: 'إعادة حساب ALE بعد تطبيق الضابط الذي يخفض إما عامل التعرض (EF) أو معدل الحدوث السنوي (ARO).',
          formulaOrRule: 'ALE_post = SLE_post × ARO_post',
          visualState: 'ale_post_column_reduced',
          cameraFocus: { x: 2.0, y: 1.5, z: 3.0 }
        },
        {
          stepNumber: 4,
          title: 'الخطوة 4: استخراج صافي الوفر وعائد الاستثمار الأمني (ROSI)',
          description: 'مقارنة الوفر السنوي المحقق بتكلفة الضابط السنوية لإصدار التوصية المالية للإدارة التنفيذية.',
          formulaOrRule: 'ROSI = ((ALE_prior - ALE_post - Cost) / Cost) × 100%',
          visualState: 'rosi_positive_badge',
          cameraFocus: { x: 0.0, y: -1.5, z: 3.5 }
        }
      ],
      hotspots: [
        {
          id: 'hs-ch4-sle',
          label: 'معادلة SLE (AV × EF)',
          x: -1.7,
          y: 1.2,
          z: 0.5,
          coordinates: { x: -1.7, y: 1.2, z: 0.5 },
          title: 'توقع الخسارة الواحدة (Single Loss Expectancy)',
          detailedExplanation: 'يمثل التكلفة النقدية المباشرة وغير المباشرة لوقوع سيناريو التهديد مرة واحدة، ويُشتق من ضرب قيمة الأصل (AV) في عامل التعرض (EF).',
          technicalMetric: 'SLE = Asset Value (AV) × Exposure Factor (EF)',
          securityImpact: 'حرج جداً',
          relatedControl: 'ISO/IEC 27005:2022 — Quantitative Consequence Valuation'
        },
        {
          id: 'hs-ch4-ale',
          label: 'معادلة ALE (SLE × ARO)',
          x: 1.7,
          y: 1.2,
          z: 0.5,
          coordinates: { x: 1.7, y: 1.2, z: 0.5 },
          title: 'توقع الخسارة السنوية (Annualized Loss Expectancy)',
          detailedExplanation: 'المؤشر المالي الأهم لمقارنة المخاطر على أساس سنوي موحد عبر ضرب SLE في المعدل السنوي للحدوث (ARO).',
          technicalMetric: 'ALE = SLE × Annualized Rate of Occurrence (ARO)',
          securityImpact: 'حرج جداً',
          relatedControl: 'NIST SP 800-30 Rev.1 — Frequency & Impact Aggregation'
        },
        {
          id: 'hs-ch4-rosi',
          label: 'مؤشر عائد الاستثمار الأمني (ROSI)',
          x: -1.7,
          y: -1.2,
          z: 0.5,
          coordinates: { x: -1.7, y: -1.2, z: 0.5 },
          title: 'عائد الاستثمار في الضوابط الأمنية (Return on Security Investment)',
          detailedExplanation: 'يقيس الكفاءة الاقتصادية للضابط الأمني بمقارنة الخسائر السنوية التي يمنعها الضابط بتكلفته السنوية.',
          technicalMetric: 'ROSI = ((ΔALE - Control_Cost) / Control_Cost) × 100%',
          securityImpact: 'مرتفع',
          relatedControl: 'NCA ECC-2:2024 — حوكمة استثمارات وموارد الأمن السيبراني'
        },
        {
          id: 'hs-ch4-thresholds',
          label: 'الحدود الفاصلة لمجالات الأثر الستة',
          x: 1.7,
          y: -1.2,
          z: 0.5,
          coordinates: { x: 1.7, y: -1.2, z: 0.5 },
          title: 'معايرة المقاييس والحدود الفاصلة (Impact Thresholds)',
          detailedExplanation: 'تربط بين التحليل النوعي والكمي عبر وضع عتبات نقدية وتشغيلية تفصل بين الأثر المنخفض والمتوسط والمرتفع.',
          technicalMetric: 'Worksheets 1a–1f Calibration Thresholds',
          securityImpact: 'مرتفع',
          relatedControl: 'OCTAVE Allegro Step 1 — Establish Risk Measurement Criteria'
        }
      ]
    },
    richData: {
      id: 204,
      chapter_number: 4,
      title: 'التحليل النوعي والكمي للمخاطر السيبرانية ومعادلات SLE/ALE/ROSI',
      subtitle: 'طيف التحليل، معايرة المقاييس، والنموذج المالي للمخاطر',
      category: 'متقدم',
      pdfStartPage: 43,
      pdfEndPage: 53,
      description: 'دراسة شاملة للتحليل النوعي وشبه الكمي والكمي ومعادلات AV, EF, SLE, ARO, ALE, ROSI.',
      objectives: [
        'المقارنة بين التحليل النوعي وشبه الكمي والكمي للمخاطر السيبرانية.',
        'معايرة مقاييس الأثر عبر المجالات الستة وتحديد الحدود الفاصلة.',
        'تطبيق معادلات AV, EF, SLE, ARO, ALE, ROSI لحساب الخسائر المتوقعة وجدوى الضوابط.',
        'تفسير طريقة حساب درجة الخطر النسبية وصيغ الترتيب في OCTAVE Allegro.'
      ],
      sections: [
        {
          heading: '1. التحليل الكمي ومعادلات SLE و ALE و ROSI',
          content: 'يُحسب توقع الخسارة الواحدة بضرب قيمة الأصل في عامل التعرض، ثم يضرب في المعدل السنوي للحدوث لإنتاج الخسارة السنوية المتوقعة.',
          formula: 'SLE = AV × EF ; ALE = SLE × ARO ; ROSI = ((ΔALE - Cost)/Cost) × 100%',
          saudiExample: 'تقييم جدوى اشتراك سنوي في مركز عمليات أمنية مدار (Managed SOC) لمؤسسة مالية في الرياض عبر مقارنة خفض ALE بتكلفة العقد.'
        }
      ],
      tables: [
        {
          title: 'ملخص معادلات التحليل الكمي للمخاطر السيبرانية',
          headers: ['المصطلح والاختصار', 'الصيغة الرياضية', 'الدلالة المالية والأمنية'],
          rows: [
            ['قيمة الأصل (AV)', 'معطى تقييمي بالريال/الدولار', 'القيمة الكلية للأصل المعلوماتي وحاويته'],
            ['عامل التعرض (EF)', 'نسبة مئوية (0% إلى 100%)', 'نسبة الضرر المتوقع من حادث واحد'],
            ['توقع الخسارة الواحدة (SLE)', 'AV × EF', 'التكلفة المالية لوقوع التهديد مرة واحدة'],
            ['معدل الحدوث السنوي (ARO)', 'عدد المرات سنوياً', 'التكرار المتوقع للحادث في السنة الواحدة'],
            ['توقع الخسارة السنوية (ALE)', 'SLE × ARO', 'إجمالي الخسارة المتوقعة سنوياً'],
            ['عائد الاستثمار الأمني (ROSI)', '((ΔALE - Cost) / Cost) × 100%', 'نسبة العائد الاقتصادي الصافي من تطبيق الضابط']
          ]
        }
      ],
      commonMistake: {
        mistake: 'اعتماد معايير قياس عامة غير معايرة لحجم المؤسسة، أو إنفاق تكلفة ضابط أمني تفوق توقع الخسارة السنوية (ALE).',
        fix: 'معايرة الحدود الفاصلة مالياً وتشغيلياً لبيئة المنظمة، والتحقق من أن الوفر في ALE يبرر تكلفة الضابط.'
      },
      solvedExamples: [
        {
          title: 'حساب ALE و ROSI لخادم التجارة الإلكترونية',
          given: 'AV = 1,000,000 SAR, EF = 25%, ARO_prior = 1.0, ARO_post = 0.1, Control Cost = 45,000 SAR/year.',
          steps: [
            'SLE = 1,000,000 × 0.25 = 250,000 SAR.',
            'ALE_prior = 250,000 × 1.0 = 250,000 SAR/year.',
            'ALE_post = 250,000 × 0.1 = 25,000 SAR/year.',
            'الوفر السنوي = 250,000 - 25,000 = 225,000 SAR.',
            'ROSI = ((225,000 - 45,000) / 45,000) × 100% = +400%.'
          ],
          result: 'صافي وفر سنوي 180,000 ريال وعائد استثمار أمني +400%.',
          whyItMatters: 'يقدم حجة مالية دامغة للإدارة العليا للموافقة على ميزانية الضابط.'
        }
      ],
      selfAssessment: [
        {
          question: 'قارن بين البيانات النوعية والبيانات الكمية في تحليل المخاطر مع مثال لكل منهما.',
          answer: 'البيانات النوعية أوصاف وتقديرات مثل «ضرر مرتفع في السمعة»، والبيانات الكمية مبالغ وأرقام مثل «خسارة سنوية متوقعة قدرها 250,000 ريال».'
        }
      ],
      quiz: [
      {
        question: 'أصل معلوماتي تبلغ قيمته (AV) 500,000 ريال، ويؤدي هجوم برمجية فدية إلى تدمير 40% من قيمته (EF = 0.40)، ويتوقع حدوث هذا الهجوم مرة واحدة كل سنتين (ARO = 0.5). ما قيمة توقع الخسارة السنوية (ALE)؟',
        options: [
          '200,000 ريال سنوياً',
          '100,000 ريال سنوياً',
          '250,000 ريال سنوياً',
          '50,000 ريال سنوياً'
        ],
        correctIndex: 1,
        explanation: 'أولاً نحسب SLE = AV × EF = 500,000 × 0.40 = 200,000 ريال. ثم نحسب ALE = SLE × ARO = 200,000 × 0.5 = 100,000 ريال سنوياً.'
      },
      {
        question: 'إذا كانت الخسارة السنوية المتوقعة قبل الضابط (ALE_prior) تساوي 400,000 ريال، وبعد تطبيق ضابط نسخ احتياطي سحابي بتكلفة سنوية 50,000 ريال انخفضت الخسارة السنوية (ALE_post) إلى 50,000 ريال، فكم يبلغ عائد الاستثمار الأمني (ROSI)؟',
        options: [
          '600%',
          '700%',
          '300%',
          '150%'
        ],
        correctIndex: 0,
        explanation: 'الوفر السنوي = 400,000 - 50,000 = 350,000 ريال. صافي العائد = 350,000 - 50,000 = 300,000 ريال. ROSI = (300,000 ÷ 50,000) × 100% = 600%.'
      },
      {
        question: 'في منهجية OCTAVE Allegro، أين تظهر المبالغ المالية الكمية داخل إطار التقييم؟',
        options: [
          'في حساب احتمال الهجوم فقط',
          'في ثلاثة مواضع: ملف الأصل (قيمة الأصل)، بيان النتيجة، والحدود الفاصلة في معايير قياس الأثر',
          'لا تسمح OCTAVE Allegro بذكر أي مبالغ مالية مطلقاً',
          'في أسماء أشجار التهديد الأربع فقط'
        ],
        correctIndex: 1,
        explanation: 'تدمج OCTAVE Allegro البيانات الكمية في ثلاثة مواضع: تسجيل القيمة النقدية في ملف الأصل، وذكر المبالغ في بيان النتيجة، وتحديد الحدود الفاصلة في معايير الأثر.'
      },
      {
        question: 'ما السبب العلمي للتعبير عن احتمالية وقوع الحوادث السيبرانية بمقياس نوعي (مرتفع/متوسط/منخفض) بدلاً من الأرقام الدقيقة في معظم التقييمات؟',
        options: [
          'لأن الحوادث السيبرانية والثغرات نادراً ما تتوفر لها سلاسل بيانات تاريخية إحصائية دقيقة وثابتة كبرامج التأمين التقليدية',
          'لأن الحواسيب لا تستطيع ضرب الكسور العشرية',
          'لأن الاحتمالية لا علاقة لها بتحليل المخاطر',
          'لإخفاء المعلومات عن الإدارة العليا'
        ],
        correctIndex: 0,
        explanation: 'التعبير عن احتمالية الهجمات السيبرانية بأرقام دقيقة صعب جداً لندرة البيانات التاريخية الموثوقة وتغير سلوك المهاجمين باستمرار.'
      }
    ],
      flashcards: [
      {
        front: 'ما معادلة حساب توقع الخسارة الواحدة (SLE) وتوقع الخسارة السنوية (ALE)؟',
        back: 'SLE = AV × EF (قيمة الأصل × عامل التعرض)، و ALE = SLE × ARO (توقع الخسارة الواحدة × المعدل السنوي للحدوث).',
        category: 'معادلات كمية'
      },
      {
        front: 'كيف يُحسب عائد الاستثمار الأمني (ROSI)؟',
        back: 'ROSI = [((ALE قبل الضابط - ALE بعد الضابط) - التكلفة السنوية للضابط) ÷ التكلفة السنوية للضابط] × 100%.',
        category: 'معادلات كمية'
      },
      {
        front: 'ما هي مجالات الأثر المعيارية الخمسة في OCTAVE Allegro؟',
        back: '1) السمعة وثقة العملاء، 2) المالي، 3) الإنتاجية، 4) السلامة والصحة، 5) الغرامات والعقوبات القانونية (ويضاف إليها مجال سادس يحدده المستخدم عند الحاجة).',
        category: 'مجالات الأثر'
      },
      {
        front: 'لماذا لا يُعتد بالفرق العددي كقيمة مالية بين درجتي خطر نسبيتين (مثل 30 و 15) في التحليل شبه الكمي؟',
        back: 'لأن درجة الخطر النسبية أداة ترتيبية (Ordinal) تبين أي الخطرين أولى بالمعالجة فقط، ولا تعني أن الخطر ذا الدرجة 30 يساوي ضعف الخطر ذي الدرجة 15 مالياً.',
        category: 'التحليل شبه الكمي'
      },
      {
        front: 'ما المقصود بالحد الفاصل (Threshold) في معايرة معايير القياس؟',
        back: 'هو قيمة رقمية أو مالية صريحة تفصل بين نطاقات الأثر (منخفض / متوسط / مرتفع) مثل تحديد غرامة 25,000 دولار حداً فاصلاً للأثر المرتفع.',
        category: 'معايرة المقاييس'
      },
      {
        front: 'لماذا يجب تطبيق تقدير الاحتمالية على جميع سيناريوهات التهديد إذا قررت المؤسسة استعماله؟',
        back: 'حتى تُقارن جميع المخاطر على أساس موحد؛ فلو قُدرت الاحتمالية لبعض السيناريوهات دون بعض لاختل ميزان ترتيب الأولويات في السجل.',
        category: 'اتساق التحليل'
      }
    ]
    },
    updated_at: NOW_TIMESTAMP
  },

  // =========================================================================
  // الفصل الخامس: تقييم الأثر والاحتمالية وبناء مصفوفة المخاطر المعيارية (5×5)
  // =========================================================================
  {
    id: 205,
    chapter_number: 5,
    title: 'تقييم الأثر والاحتمالية وبناء مصفوفة المخاطر المعيارية (5×5 Risk Matrix) وأوراق عمل المخاطر',
    subtitle: 'معادلة درجة الخطر النسبية (Relative Risk Score)، مصفوفة 5×5، شهية المخاطر وحدود التحمل، ومراجعة الأقران',
    description: 'دراسة تطبيقية شاملة لتقييم الأثر والاحتمالية على الأصول المعلوماتية، وحساب درجة الخطر النسبية عبر أوزان مجالات الأثر (من 0 إلى 45 أو 63)، وبناء مصفوفة المخاطر المعيارية (5×5 Risk Matrix) ومصفوفة OCTAVE Allegro، مع ضبط شهية المخاطر وحدود التحمل ومسار مراجعة الأقران.',
    category: 'تقييم الأثر والاحتمالية',
    difficulty: 'advanced',
    pdfStartPage: 54,
    pdfEndPage: 63,
    diagramKey: 'ise232-risk-5',
    videoUrl: 'https://www.youtube.com/watch?v=8kVXKyGOYsY',
    videoDuration: '23:20',
    presentationUrl: '/presentations/ise232-risk-ch5.pdf',
    keyTopics: [
      'معادلة حساب درجة الخطر النسبية (Relative Risk Score = Σ Impact Value × Area Rank)',
      'أعلى درجة خطر نسبية ممكنة: 45 (لخمسة مجالات) و 63 (لستة مجالات)',
      'بناء مصفوفة المخاطر المعيارية (5×5 Risk Matrix) ومصفوفة المخاطر النسبية (Pools 1–4)',
      'الفرق الدقيق بين شهية المخاطر (Risk Appetite) وحدود التحمل (Risk Tolerance)',
      'ضمان اتساق تقدير المخاطر ومسار مراجعة الأقران رباعي الخطوات (Peer Review)',
      'تطبيق عملي لحساب درجة الخطر النسبية لحادثة كشف السجلات الطبية (الدرجة 23)',
    ],
    images: [
      {
        prompt: 'Standard 5x5 Risk Matrix heatmap likelihood vs impact and OCTAVE Allegro Relative Risk Score table, 16:9',
        caption: 'مصفوفة المخاطر المعيارية 5×5 وآلية احتساب درجة الخطر النسبية الموزونة',
        alt: '5x5 Risk Matrix heatmap and relative risk score',
        seed: 2051,
        isAIGenerated: true,
      },
      {
        prompt: 'Risk appetite vs risk tolerance thresholds and 4-step peer review validation workflow, 16:9',
        caption: 'التمييز بين شهية المخاطر وحدود التحمل ومسار مراجعة الأقران لضبط جودة التقييم',
        alt: 'Risk appetite tolerance and peer review',
        seed: 2052,
        isAIGenerated: true,
      },
    ],
    content: `## 5.1 حساب درجة الخطر النسبية (Relative Risk Score) في OCTAVE Allegro

بعد تحديد سيناريوهات التهديد وعواقبها على الأصل المعلوماتي، تحول منهجية **OCTAVE Allegro** التقديرات النوعية للأثر في المجالات المختلفة إلى رقم ترتيبي موحد يسمى **درجة الخطر النسبية (Relative Risk Score)**.

### القواعد الرياضية لحساب درجة الخطر النسبية
1. **ترتيب أولويات مجالات الأثر ($R_i$ — Impact Area Rank)**:
   - إذا اعتمدت المنظمة المجالات الخمسة المعيارية، تُرتب من **1** (الأقل أهمية) إلى **5** (الأعلى أهمية)، فيكون مجموع الرتب:
     $$\sum_{i=1}^{5} R_i = 1 + 2 + 3 + 4 + 5 = 15$$
   - إذا أضافت المنظمة المجال السادس الذي يحدده المستخدم، تُرتب المجالات من **1** إلى **6**، فيكون مجموع الرتب:
     $$\sum_{i=1}^{6} R_i = 1 + 2 + 3 + 4 + 5 + 6 = 21$$
2. **تحويل مستوى الأثر النوعي إلى قيمة رقمية ($V_i$ — Impact Value)**:
   - أثر **مرتفع (High)** $= 3$
   - أثر **متوسط (Medium)** $= 2$
   - أثر **منخفض (Low)** $= 1$
   - أثر **منعدم (None)** $= 0$
3. **معادلة درجة الخطر النسبية**:
   $$\text{Relative Risk Score} = \sum_{i=1}^{n} \left( R_i \times V_i \right)$$
   - **الحد الأعلى لخمسة مجالات**: عندما يكون الأثر مرتفعاً ($3$) في جميع المجالات الخمسة:
     $$\text{Max Score}_{5} = 3 \times (5 + 4 + 3 + 2 + 1) = 3 \times 15 = 45$$
   - **الحد الأعلى لستة مجالات**: عندما يكون الأثر مرتفعاً ($3$) في جميع المجالات الستة:
     $$\text{Max Score}_{6} = 3 \times (6 + 5 + 4 + 3 + 2 + 1) = 3 \times 21 = 63$$

---

## 5.2 مثال محلول من كتاب المقرر: حساب درجة الخطر لكشف السجلات الطبية

حددت مؤسسة صحية رتب أولويات مجالات الأثر الخمسة لديها، وقيّمت عاقبة سيناريو «كشف السجلات الطبية للمرضى» كما في الجدول التالي:

| مجال الأثر (Impact Area) | رتبة الأهمية ($R_i$) | تقدير الأثر النوعي | قيمة الأثر ($V_i$) | درجة المجال ($R_i \times V_i$) | التعليل من معايير المؤسسة |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **السمعة وثقة العملاء** | $4$ | متوسط (Medium) | $2$ | $4 \times 2 = 8$ | تضرر ثقة المرضى محلياً دون انهيار شامل |
| **المالي** | $5$ | منخفض (Low) | $1$ | $5 \times 1 = 5$ | تراجع الإيرادات السنوية بنسبة أقل من الحد الفاصل |
| **الإنتاجية** | $3$ | منخفض (Low) | $1$ | $3 \times 1 = 3$ | استمرار تقديم الخدمة الطبية دون توقف |
| **السلامة والصحة** | $1$ | منخفض (Low) | $1$ | $1 \times 1 = 1$ | كشف السرية لا يهدد سلامة المريض الجسدية مباشرة |
| **الغرامات والعقوبات** | $2$ | مرتفع (High) | $3$ | $2 \times 3 = 6$ | غرامة مخالفة خصوصية البيانات تتجاوز $25,000\text{ USD}$ |
| **المجموع الكلي (درجة الخطر النسبية)** | **$\sum R_i = 15$** | — | — | **$\text{Score} = 23 / 45$** | **تقع الدرجة 23 في الفئة الوسطى (16 إلى 29)** |

---

## 5.3 مصفوفة المخاطر المعيارية ($5 \times 5$ Risk Matrix) ومصفوفة OCTAVE Allegro

### أولاً: مصفوفة المخاطر المعيارية ($5 \times 5$ Standard Risk Matrix)
في المعايير العامة (مثل NIST وISO)، تُقيّم **الاحتمالية ($L \in \{1..5\}$)** و**الأثر ($I \in \{1..5\}$)** على مقياس من 1 (منخفض جداً) إلى 5 (مرتفع جداً)، وتُحسب شدة الخطر بحاصل الضرب:
$$\text{Risk Score}_{5\times 5} = \text{Likelihood } (1..5) \times \text{Impact } (1..5) \in [1, 25]$$

| الاحتمالية \ الأثر | 1: ضئيل جداً | 2: منخفض | 3: متوسط | 4: كبير | 5: كارثي |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **5: شبه مؤكد** | 5 (منخفض) | 10 (متوسط) | 15 (حرج) | 20 (حرج جداً) | **25 (حرج أقصى)** |
| **4: محتمل جداً** | 4 (منخفض) | 8 (متوسط) | 12 (متوسط) | 16 (حرج) | **20 (حرج جداً)** |
| **3: ممكن** | 3 (منخفض) | 6 (منخفض) | 9 (متوسط) | 12 (متوسط) | **15 (حرج)** |
| **2: غير مرجح** | 2 (منخفض) | 4 (منخفض) | 6 (منخفض) | 8 (متوسط) | **10 (متوسط)** |
| **1: نادر جداً** | 1 (منخفض) | 2 (منخفض) | 3 (منخفض) | 4 (منخفض) | **5 (منخفض/مراجعة)** |

### ثانياً: مصفوفة المخاطر النسبية في OCTAVE Allegro (Pools 1–4)

| الاحتمالية (Probability) | درجة الخطر (30 إلى 45) | درجة الخطر (16 إلى 29) | درجة الخطر (0 إلى 15) |
| :--- | :---: | :---: | :---: |
| **مرتفعة (High)** | **المجموعة 1 (تخفيف)** | **المجموعة 1 (تخفيف)** | **المجموعة 2 (تخفيف/تأجيل)** |
| **متوسطة (Medium)** | **المجموعة 1 (تخفيف)** | **المجموعة 2 (تخفيف/تأجيل)** | **المجموعة 3 (تأجيل/قبول)** |
| **منخفضة (Low)** | **المجموعة 2 (تخفيف/تأجيل)** | **المجموعة 3 (تأجيل/قبول)** | **المجموعة 4 (قبول)** |

---

## 5.4 شهية المخاطر وحدود التحمل ومراجعة الأقران

- **شهية / الرغبة في المخاطر (Risk Appetite)**: المقدار العام من المخاطر الذي تقبله المنظمة على مستوى استراتيجي أثناء سعيها لتحقيق أهدافها.
- **حدود التحمل (Risk Tolerance)**: الحد الأدنى والأدق للتفاوت المقبول في خطر بعينه أو مجال أثر محدد (مثل عدم تحمل أي غرامة تتجاوز $25,000\text{ USD}$ أو عدم تحمل توقف نظام الطوارئ لأكثر من 15 دقيقة).
- **مسار مراجعة الأقران رباعي الخطوات (4-Step Peer Review)**: لضمان اتساق التقدير ومنع التحيز الفردي:
  1. **التقدير الأولي**: يضع المقدر الأول درجات الأثر والاحتمالية مع مسوغاتها.
  2. **المراجعة المستقلة**: يفحص مراجع ثانٍ (أو فريق الأقران) التقديرات بموضوعية.
  3. **مناقشة الفروق**: تُناقش نقاط الاختلاف بالرجوع لمعايير القياس وأدلة الحاويات.
  4. **توثيق المبرر المعتمد**: يُسجل الحكم النهائي المتفق عليه ومبرره في سجل المخاطر.`,
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'آلية حساب درجة الخطر النسبية (Relative Risk Score)',
        subtitle: 'تحويل الأثر النوعي عبر المجالات إلى رقم ترتيبي موحد',
        bullets: [
          'تُرتب مجالات الأثر الخمسة حسب أهميتها للمنظمة من 1 (الأقل) إلى 5 (الأعلى أهمية).',
          'يُعطى الأثر المرتفع قيمة (3)، والمتوسط قيمة (2)، والمنخفض قيمة (1)، والمنعدم (0).',
          'تُضرب قيمة الأثر في رتبة أهمية المجال لكل مجال على حدة، ثم تُجمع النواتج.',
          'أعلى درجة ممكنة هي 45 (عند وجود 5 مجالات) أو 63 (عند إضافة المجال السادس).'
        ],
        keyHighlight: 'درجة الخطر النسبية تعكس أولويات المنظمة الحقيقية لأنها تضرب شدة الأثر في وزن أهمية المجال لدى الإدارة.',
        diagramTitle: 'معادلة احتساب درجة الخطر النسبية الموزونة'
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'مثال تطبيقي محلول: خطر كشف السجلات الطبية (الدرجة 23)',
        subtitle: 'كيف يتفاعل أثر الغرامات المرتفع مع أثر السلامة المنخفض؟',
        bullets: [
          'السمعة (رتبة 4 × أثر متوسط 2 = 8) + المالي (رتبة 5 × أثر منخفض 1 = 5).',
          'الإنتاجية (رتبة 3 × أثر منخفض 1 = 3) + السلامة (رتبة 1 × أثر منخفض 1 = 1).',
          'الغرامات القانونية (رتبة 2 × أثر مرتفع 3 = 6) لتجاوز الغرامة حاجز 25,000 دولار.',
          'المجموع الكلي = 8 + 5 + 3 + 1 + 6 = 23 من 45 (يقع في الفئة الوسطى 16–29).'
        ],
        keyHighlight: 'لو تغيرت أولويات المؤسسة فجعلت الغرامات في الرتبة 5، لقفزت درجة الخطر نفسها دون تغير الحادث!',
        diagramTitle: 'جدول الحساب التفصيلي لدرجة الخطر النسبية (23/45)'
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'مصفوفة المخاطر المعيارية 5×5 ومصفوفة OCTAVE Allegro',
        subtitle: 'دمج بُعدي الاحتمالية والأثر لتحديد مجموعات المعالجة',
        bullets: [
          'مصفوفة 5×5 تقاطع 5 مستويات للاحتمالية مع 5 مستويات للأثر لإنتاج درجات من 1 إلى 25.',
          'مصفوفة OCTAVE Allegro تقاطع 3 مستويات احتمالية مع 3 نطاقات لدرجة الخطر النسبية (30–45، 16–29، 0–15).',
          'ينتج عن مصفوفة Allegro أربع مجموعات (Pools 1–4) توجه القرار نحو التخفيف أو التأجيل أو القبول.',
          'تضمن المصفوفة عدم إهمال المخاطر ذات الدرجة المرتفعة (30–45) حتى لو كانت احتماليتها متوسطة.'
        ],
        keyHighlight: 'الخطر ذو الدرجة النسبية (30–45) والاحتمالية المنخفضة يصنف في المجموعة 2 ولا يُقبل تلقائياً في المجموعة 4!',
        diagramTitle: 'المقارنة البصرية بين مصفوفة 5×5 ومصفوفة OCTAVE Allegro'
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'شهية المخاطر (Risk Appetite) مقابل حدود التحمل (Tolerance)',
        subtitle: 'الضوابط الحاكمة لقرار قبول المخاطر أو رفضها',
        bullets: [
          'شهية المخاطر (Risk Appetite): المستوى الكلي للمخاطر الذي تقبل الإدارة العليا التعايش معه.',
          'حدود التحمل (Risk Tolerance): العتبة القصوى الصارمة في مجال بعينه التي لا يُسمح بتجاوزها.',
          'تحذير منهجي: لا يجوز قبول خطر ذي عواقب كارثية بمجرد أن احتماله التقديري منخفض.',
          'يجب إشراك جميع ملاك الأصل عند تقدير أثره لأن الأصل الواحد قد يخدم عدة إدارات بطرق مختلفة.'
        ],
        keyHighlight: 'قبول خطر يتجاوز حد التحمل القانوني أو التشغيلي للمؤسسة يعد خرقاً لحوكمة إدارة المخاطر.',
        diagramTitle: 'منحنى شهية المخاطر وحدود التحمل القصوى'
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'ضبط جودة التقييم ومسار مراجعة الأقران (Peer Review)',
        subtitle: 'خطوات التحقق الأربعة لضمان اتساق التقديرات وموضوعيتها',
        bullets: [
          'الخطوة 1: يقوم المقدر الأول بتقييم الأثر والاحتمالية استناداً إلى معايير القياس الموحدة.',
          'الخطوة 2: يفحص المراجع المستقل (Peer Reviewer) التقديرات ويتحقق من عدم وجود تحيز شخصي.',
          'الخطوة 3: تُناقش الفروق التقييمية بالاحتكام إلى الحدود الفاصلة في أوراق العمل (1a–1f).',
          'الخطوة 4: يُوثق التقدير النهائي المعتمد مع مسوغه العلمي والتشغيلي في سجل المخاطر.'
        ],
        keyHighlight: 'مراجعة الأقران تمنع تضخيم المخاطر بدافع الخوف أو التقليل منها بدافع التهرب من تكاليف الضوابط.',
        diagramTitle: 'مسار مراجعة الأقران رباعي الخطوات'
      }
    ],
    flashcards: [
      {
        front: 'ما معادلة حساب درجة الخطر النسبية (Relative Risk Score) في OCTAVE Allegro؟',
        back: 'درجة الخطر النسبية = مجموع (قيمة الأثر في المجال × رتبة أهمية المجال) عبر جميع مجالات الأثر المعتمدة.',
        category: 'درجة الخطر النسبية'
      },
      {
        front: 'كم تبلغ أعلى درجة خطر نسبية ممكنة عند استخدام 5 مجالات أثر، وعند استخدام 6 مجالات أثر؟',
        back: 'عند استخدام 5 مجالات أثر تبلغ 45 درجة (3 × 15)، وعند استخدام 6 مجالات أثر تبلغ 63 درجة (3 × 21).',
        category: 'درجة الخطر النسبية'
      },
      {
        front: 'ما الفرق بين الرغبة/شهية المخاطر (Risk Appetite) وحدود التحمل (Risk Tolerance)؟',
        back: 'شهية المخاطر هي المقدار العام من الخطر الذي تقبله المنظمة لتحقيق أهدافها، أما حدود التحمل فهي العتبة الدقيقة القصوى المقبولة في خطر أو مجال بعينه.',
        category: 'حوكمة المخاطر'
      },
      {
        front: 'ما هي الخطوات الأربع لمسار مراجعة الأقران (Peer Review) في تقدير المخاطر؟',
        back: '1) التقدير الأولي من المقدر الأول، 2) المراجعة المستقلة من طرف آخر، 3) مناقشة الفروق، 4) توثيق التقدير والمبرر المعتمد.',
        category: 'جودة التقييم'
      },
      {
        front: 'كيف يختلف أثر انتهاك السرية عن أثر انتهاك التكامل وعن أثر انتهاك التوافر؟',
        back: 'انتهاك السرية يكشف المعلومة لغير المخولين (إفشاء)، وانتهاك التكامل يفسد صحة البيانات ودقتها (تعديل)، وانتهاك التوافر يحجب الوصول إليها (فقدان أو انقطاع).',
        category: 'الأثر الأمني'
      },
      {
        front: 'لماذا يجب ترتيب مجالات الأثر بحسب أهميتها للمنظمة قبل حساب درجة المخاطر؟',
        back: 'لأن وزن كل مجال (من 1 إلى 5) يدخل كمعامل ضرب مباشر في حساب درجة الخطر النسبية، فبدون ترتيب الأولويات لا تعكس الدرجة محركات المنظمة.',
        category: 'معايير القياس'
      }
    ],
    miniQuiz: [
      {
        question: 'إذا اعتمدت منظمة ستة مجالات أثر (المجالات الخمسة المعيارية + مجال سادس يحدده المستخدم)، فما هي أعلى درجة خطر نسبية ممكنة لسيناريو تهديد يحقق أثراً مرتفعاً (3) في جميع المجالات الستة؟',
        options: [
          '45 درجة',
          '63 درجة',
          '30 درجة',
          '100 درجة'
        ],
        correctIndex: 1,
        explanation: 'مجموع رتب ستة مجالات هو (1 + 2 + 3 + 4 + 5 + 6 = 21). وعندما يكون الأثر مرتفعاً (3) في جميعها تكون الدرجة القصوى = 3 × 21 = 63.'
      },
      {
        question: 'في مصفوفة المخاطر النسبية لمنهجية OCTAVE Allegro، إذا كانت درجة الخطر النسبية لسيناريو ما تساوي 23 (الفئة 16–29) واحتمالية وقوعه «متوسطة»، ففي أي مجموعة يقع؟',
        options: [
          'المجموعة 1 (Pool 1)',
          'المجموعة 2 (Pool 2 — تخفيف أو تأجيل)',
          'المجموعة 3 (Pool 3)',
          'المجموعة 4 (Pool 4)'
        ],
        correctIndex: 1,
        explanation: 'تقاطع عمود الدرجة (16–29) مع صف الاحتمالية المتوسطة في مصفوفة OCTAVE Allegro يضع الخطر في المجموعة 2 (Pool 2).'
      },
      {
        question: 'لماذا يُعدّ القبول التلقائي لخطر ذي أثر كارثي (درجة 42 من 45) بمجرد أن احتماله التقديري «منخفض» خطأً جسيماً في تقييم المخاطر؟',
        options: [
          'لأن تقديرات الاحتمالية للأحداث السيبرانية غير يقينية، والعواقب الجسيمة التي تتجاوز حد التحمل تضع الخطر في المجموعة 2 لا المجموعة 4، مما يستلزم مراجعة دقيقة وتخفيفاً أو نقلاً',
          'لأن الاحتمالية المنخفضة تعني وقوع الحدث يومياً',
          'لأن درجة الخطر النسبية لا علاقة لها بالأثر',
          'لأن جميع المخاطر يجب تجنبها بإغلاق المؤسسة'
        ],
        correctIndex: 0,
        explanation: 'في مصفوفة OCTAVE Allegro، الخطر ذو الدرجة (30–45) والاحتمالية المنخفضة يقع في المجموعة 2 وليس المجموعة 4، فلا يجوز قبوله آلياً دون فحص حدود التحمل.'
      },
      {
        question: 'ما الهدف الرئيسي من تطبيق «مسار مراجعة الأقران» (Peer Review) أثناء تقدير الأثر والاحتمالية؟',
        options: [
          'إطالة مدة المشروع دون فائدة عملية',
          'تحقيق الاتساق في التقدير وتقليل الذاتية والتحيز الشخصي عبر فحص التقديرات ومناقشة الفروق وتوثيق المبرر المعتمد',
          'إلغاء دور مالك الأصل المعلوماتي',
          'الاستغناء عن أوراق عمل معايير القياس'
        ],
        correctIndex: 1,
        explanation: 'تهدف مراجعة الأقران إلى ضبط جودة التقييم ومنع التطرف في التقدير (تهويلاً أو تهويناً) وتوثيق مسوغات الدرجات المعتمدة.'
      }
    ],
    interactiveBook3D: {
      model3DType: 'risk_heatmap_5x5_surface',
      shaderEffect: 'thermal_heatmap_gradient',
      ambientColor: '#13111c',
      accentColor: '#f97316',
      autoRotateSpeed: 1.2,
      pages3D: [
        {
          pageNumber: 1,
          spreadSide: 'right',
          title: 'سطح الخريطة الحرارية 5×5 وحاسبة الدرجة النسبية',
          subtitle: 'تمثيل طبوغرافي ثلاثي الأبعاد لتقاطع الاحتمالية والأثر الموزون',
          summaryMarkdown: 'يعرض المجسم ثلاثي الأبعاد **سطح مصفوفة المخاطر الحرارية (5×5 Risk Surface)** بارتفاعات لونية تتدرج من الأخضر الزمردي (المخاطر المقبولة) إلى البرتقالي التحذيري فالـقرمزي المتوهج (المخاطر الحرجة التي تتجاوز حدود التحمل).',
          interactiveFormula: 'Relative_Score = ∑ (Rank_i × Impact_i) ∈ [0..45]  |  Matrix_5x5 = L × I ∈ [1..25]',
          labParameterName: 'مستوى الأثر في المجال الأعلى أولوية (الرتبة 5)',
          labMin: 1,
          labMax: 3,
          labDefault: 2,
          labUnit: 'مستوى أثر (1=منخفض، 2=متوسط، 3=مرتفع)',
          labInterpretation: {
            1: 'أثر منخفض في المجال الأهم (5 × 1 = 5 نقاط): يبقي درجة الخطر الكلية منخفضة نسبياً.',
            2: 'أثر متوسط في المجال الأهم (5 × 2 = 10 نقاط): يرفع الخطر نحو المنطقة البرتقالية (المجموعة 2).',
            3: 'أثر مرتفع في المجال الأهم (5 × 3 = 15 نقطة من مجال واحد فقط!): يدفع الخطر بقوة نحو المجموعة 1.'
          },
          challengeQuestion: {
            question: 'إذا كانت رتب المجالات الخمسة: المالي (5)، السمعة (4)، الإنتاجية (3)، الغرامات (2)، السلامة (1)، وكان سيناريو انقطاع النظام يسبب أثراً مرتفعاً (3) في المالي والإنتاجية، ومنخفضاً (1) في البقية، فكم تبلغ درجة الخطر النسبية؟',
            options: [
              '31 درجة (تقع في الفئة العليا 30–45)',
              '24 درجة',
              '15 درجة',
              '45 درجة'
            ],
            correctIndex: 0,
            feedbackCorrect: 'حساب دقيق! (5×3) + (3×3) + (4×1) + (2×1) + (1×1) = 15 + 9 + 4 + 2 + 1 = 31 درجة.',
            feedbackWrong: 'احسب مجموع حاصل الضرب: المالي (5×3=15) + الإنتاجية (3×3=9) + السمعة (4×1=4) + الغرامات (2×1=2) + السلامة (1×1=1) = 31.'
          },
          aiTutorGuardrailTopics: ['درجة الخطر النسبية', 'مصفوفة 5×5', 'مصفوفة المخاطر النسبية', 'شهية المخاطر', 'حدود التحمل', 'مراجعة الأقران']
        },
        {
          pageNumber: 2,
          spreadSide: 'left',
          title: 'مختبر مراجعة الأقران وضبط حدود التحمل (Peer Review & Tolerance)',
          subtitle: 'التحقق من اتساق الدرجات النسبية ومنع التحيز في مصفوفة المخاطر',
          summaryMarkdown: 'تضعك الصفحة اليسرى في دور **المراجع المستقل (Peer Reviewer)** الذي يفحص تقديرات المقدر الأول، ويقارنها بحدود التحمل المؤسسية، ويوثق المسوغ المعتمد لكل درجة في المصفوفة.',
          interactiveFormula: 'Consensus_Score = Peer_Review(Estimator_1, Reviewer_2, Criteria_Worksheets)',
          labParameterName: 'درجة التوافق بين المقدر الأول والمراجع بعد الاحتكام للمعايير',
          labMin: 1,
          labMax: 5,
          labDefault: 5,
          labUnit: 'مستوى توافق',
          labInterpretation: {
            1: 'تباين حاد بلا مسوغات: غياب الرجوع لأوراق عمل المعايير (1a–1f).',
            2: 'تباين في تقدير الاحتمالية: يتطلب فحص سجلات الحوادث السابقة وظروف الحاوية.',
            3: 'توافق جزئي: الاتفاق على المجالات المالية والاختلاف في تقدير أثر السمعة.',
            4: 'توافق عالٍ بعد النقاش: تعديل الدرجات الشاذة بالاحتكام للحدود الفاصلة.',
            5: 'توافق معياري موثق (100%): اعتماد الدرجة النهائية وتدوين المبرر في سجل المخاطر.'
          },
          challengeQuestion: {
            question: 'لماذا يجب إشراك جميع ملاك الأصل المعلوماتي (أو ممثلي الوحدات التي تستخدمه) عند تقدير أثر مخاطره في الفصل الخامس؟',
            options: [
              'لأن الأصل المعلوماتي الواحد قد يُستخدم في عدة وحدات تشغيلية، وقد يبدو تعطل الأصل منخفض الأثر لوحدة ولكنه كارثي لوحدة أخرى تعتمد عليه لحظياً',
              'لمجرد زيادة عدد الحاضرين في الاجتماع',
              'لأن مالك الأصل لا يعرف شيئاً عن عمله',
              'لإلغاء مصفوفة المخاطر'
            ],
            correctIndex: 0,
            feedbackCorrect: 'تعليل دقيق! النظرة الجزئية من وحدة واحدة قد تغفل الأثر الجسيم الذي يلحق بوحدة أخرى تعتمد على نفس الأصل المعلوماتي.',
            feedbackWrong: 'تذكر أن الأصل المشترك يمس عدة وحدات، ولا تكتمل صورة الأثر إلا بجمع منظور جميع ملاكه ومستخدميه.'
          },
          aiTutorGuardrailTopics: ['مراجعة الأقران', 'اتساق التقدير', 'ملاك الأصل', 'حدود التحمل']
        }
      ],
      stepByStep: [
        {
          stepNumber: 1,
          title: 'الخطوة 1: تثبيت رتب أولويات مجالات الأثر (Impact Area Ranks)',
          description: 'تحديد أوزان المجالات الخمسة من 1 إلى 5 (مجموعها 15) وفق محركات أعمال المنظمة المعتمدة من الإدارة العليا.',
          formulaOrRule: '∑ Ranks (1..5) = 15',
          visualState: 'ranks_axes_calibrated',
          cameraFocus: { x: -2.0, y: 1.5, z: 3.0 }
        },
        {
          stepNumber: 2,
          title: 'الخطوة 2: تقييم شدة العاقبة في كل مجال (1 أو 2 أو 3)',
          description: 'إسناد قيمة الأثر لكل مجال بالاحتكام إلى الحدود الفاصلة في أوراق العمل 1a–1e.',
          formulaOrRule: 'Impact Value V_i ∈ {1: Low, 2: Medium, 3: High}',
          visualState: 'impact_bars_extruded',
          cameraFocus: { x: 0.0, y: 1.5, z: 3.2 }
        },
        {
          stepNumber: 3,
          title: 'الخطوة 3: حساب المجموع الموزون (درجة الخطر النسبية)',
          description: 'ضرب قيمة الأثر في رتبة المجال وجمع النواتج الخمسة للحصول على الدرجة النسبية من 45.',
          formulaOrRule: 'Score = ∑ (R_i × V_i) ∈ [0..45]',
          visualState: 'relative_score_peak_shown',
          cameraFocus: { x: 2.0, y: 1.5, z: 3.0 }
        },
        {
          stepNumber: 4,
          title: 'الخطوة 4: إسقاط الدرجة والاحتمالية على مصفوفة المخاطر ومراجعة الأقران',
          description: 'تحديد تقاطع الدرجة مع الاحتمالية لاستخراج المجموعة (Pool 1–4) واعتمادها عبر مراجعة الأقران.',
          formulaOrRule: 'Matrix(Probability, Score) → Pool ∈ {1, 2, 3, 4}',
          visualState: 'heatmap_cell_locked',
          cameraFocus: { x: 0.0, y: -1.6, z: 3.5 }
        }
      ],
      hotspots: [
        {
          id: 'hs-ch5-redzone',
          label: 'المنطقة الحمراء الحرجة (Pool 1)',
          x: 1.8,
          y: 1.5,
          z: 0.8,
          coordinates: { x: 1.8, y: 1.5, z: 0.8 },
          title: 'المجموعة 1: منطقة الخطر الحرج (درجة 30–45 مع احتمالية عالية/متوسطة)',
          detailedExplanation: 'تمثل المخاطر التي تتجاوز شهية المخاطر وحدود التحمل المؤسسية، وتستلزم وضع خطة تخفيف فورية وتخصيص موارد عاجلة.',
          technicalMetric: 'Score 30–45 (High/Med Prob) OR 16–29 (High Prob)',
          securityImpact: 'حرج جداً',
          relatedControl: 'NCA ECC-2:2024 — المعالجة الإلزامية للمخاطر الحرجة (1-5)'
        },
        {
          id: 'hs-ch5-amberzone',
          label: 'المنطقة البرتقالية (Pools 2 & 3)',
          x: 0.0,
          y: 0.3,
          z: 0.5,
          coordinates: { x: 0.0, y: 0.3, z: 0.5 },
          title: 'المجموعتان 2 و3: منطقة المفاضلة بين التخفيف والتأجيل',
          detailedExplanation: 'تتطلب فحصاً دقيقاً لمجالات الأثر الفردية؛ فإذا كان الأثر مرتفعاً في مجال ذي حد تحمل صارم (كالسلامة أو الغرامات) وُجّه للتخفيف بدلاً من التأجيل.',
          technicalMetric: 'Score 16–29 (Med/Low Prob) — Context-Driven Decision',
          securityImpact: 'مرتفع',
          relatedControl: 'OCTAVE Allegro Step 8 — Relative Risk Matrix Guidance'
        },
        {
          id: 'hs-ch5-greenzone',
          label: 'المنطقة الخضراء (Pool 4)',
          x: -1.8,
          y: -1.2,
          z: 0.2,
          coordinates: { x: -1.8, y: -1.2, z: 0.2 },
          title: 'المجموعة 4: منطقة القبول الموثق (درجة 0–15 مع احتمالية منخفضة)',
          detailedExplanation: 'تقع ضمن شهية المخاطر الطبيعية للمنظمة، فيُكتفى بالضوابط القائمة مع توثيق قرار القبول ومراقبته دورياً.',
          technicalMetric: 'Score 0–15 & Low Probability → Formal Acceptance',
          securityImpact: 'منخفض',
          relatedControl: 'ISO/IEC 27005:2022 — Risk Acceptance Criteria'
        },
        {
          id: 'hs-ch5-peerreview',
          label: 'بوابة مراجعة الأقران (Peer Review Gate)',
          x: 1.6,
          y: -1.3,
          z: 0.4,
          coordinates: { x: 1.6, y: -1.3, z: 0.4 },
          title: 'حوكمة التحقق ومراجعة الأقران رباعية الخطوات',
          detailedExplanation: 'تضمن أن الدرجات المسندة في المصفوفة ليست انطباعات شخصية بل أحكام معللة ومراجعة من طرف ثانٍ وموثقة رسمياً.',
          technicalMetric: '4-Step Peer Validation (Estimator → Reviewer → Consensus → Log)',
          securityImpact: 'مرتفع',
          relatedControl: 'NIST SP 800-30 Rev.1 — Assessment Credibility & Reproducibility'
        }
      ]
    },
    richData: {
      id: 205,
      chapter_number: 5,
      title: 'تقييم الأثر والاحتمالية وبناء مصفوفة المخاطر المعيارية (5×5)',
      subtitle: 'درجة الخطر النسبية، مصفوفة المخاطر، وحدود القبول والتحمل',
      category: 'متقدم',
      pdfStartPage: 54,
      pdfEndPage: 63,
      description: 'حساب درجة الخطر النسبية وبناء مصفوفة المخاطر 5×5 ومصفوفة OCTAVE Allegro وضبط اتساق التقدير.',
      objectives: [
        'حساب درجة الخطر النسبية بضرب قيم الأثر في رتب الأولويات.',
        'بناء مصفوفة المخاطر 5×5 ومصفوفة المخاطر النسبية (Pools 1–4).',
        'التمييز بين شهية المخاطر وحدود التحمل وتطبيق مراجعة الأقران.'
      ],
      sections: [
        {
          heading: '1. حساب درجة الخطر النسبية ومصفوفة المخاطر',
          content: 'تُحسب درجة الخطر النسبية بجمع حاصل ضرب قيمة الأثر (1، 2، 3) في رتبة المجال (1..5)، ثم تقاطع مع الاحتمالية في مصفوفة المخاطر.',
          formula: 'Relative Risk Score = ∑ (Impact_Value_i × Area_Rank_i)',
          saudiExample: 'في مستشفى تخصصي، يُعطى مجال سلامة المرضى الرتبة 5 (الأعلى)، فيؤدي أي تهديد يمس دقة الجرعات الدوائية إلى درجة خطر مرتفعة جداً.'
        }
      ],
      tables: [
        {
          title: 'مصفوفة المخاطر النسبية في OCTAVE Allegro',
          headers: ['الاحتمالية', 'درجة الخطر (30–45)', 'درجة الخطر (16–29)', 'درجة الخطر (0–15)'],
          rows: [
            ['مرتفعة (High)', 'المجموعة 1', 'المجموعة 1', 'المجموعة 2'],
            ['متوسطة (Medium)', 'المجموعة 1', 'المجموعة 2', 'المجموعة 3'],
            ['منخفضة (Low)', 'المجموعة 2', 'المجموعة 3', 'المجموعة 4']
          ]
        }
      ],
      commonMistake: {
        mistake: 'قبول خطر ذي أثر جسيم جداً بمجرد أن احتماله التقديري منخفض دون فحص حدود التحمل.',
        fix: 'مراجعة بيانات الأثر الفردية وحدود التحمل قبل أي قرار قبول، وملاحظة أن الدرجة 30–45 ذات الاحتمال المنخفض تقع في المجموعة 2 لا 4.'
      },
      solvedExamples: [
        {
          title: 'حساب درجة الخطر النسبية لسيناريو كشف السجلات الطبية',
          given: 'الرتب: المالي (5)، السمعة (4)، الإنتاجية (3)، الغرامات (2)، السلامة (1). الأثر: الغرامات مرتفع (3)، السمعة متوسط (2)، والبقية منخفض (1).',
          steps: [
            'درجة السمعة = 4 × 2 = 8.',
            'درجة المالي = 5 × 1 = 5.',
            'درجة الإنتاجية = 3 × 1 = 3.',
            'درجة السلامة = 1 × 1 = 1.',
            'درجة الغرامات = 2 × 3 = 6.',
            'المجموع = 8 + 5 + 3 + 1 + 6 = 23.'
          ],
          result: 'درجة الخطر النسبية = 23 من 45.',
          whyItMatters: 'تحول الأوصاف النوعية المتفرقة إلى مؤشر كمي نسبي واحد يسهل ترتيبه في المصفوفة.'
        }
      ],
      selfAssessment: [
        {
          question: 'علّل: لا يُعتد بالفرق العددي بين درجتي مخاطر نسبيتين.',
          answer: 'لأن الدرجة النسبية أداة ترتيب فقط تبين أي الخطرين أهم نسبياً، ولا يحمل الفرق الحسابي بينهما معنى كمياً أو مالياً تناسبياً.'
        }
      ],
      quiz: [
      {
        question: 'إذا اعتمدت منظمة ستة مجالات أثر (المجالات الخمسة المعيارية + مجال سادس يحدده المستخدم)، فما هي أعلى درجة خطر نسبية ممكنة لسيناريو تهديد يحقق أثراً مرتفعاً (3) في جميع المجالات الستة؟',
        options: [
          '45 درجة',
          '63 درجة',
          '30 درجة',
          '100 درجة'
        ],
        correctIndex: 1,
        explanation: 'مجموع رتب ستة مجالات هو (1 + 2 + 3 + 4 + 5 + 6 = 21). وعندما يكون الأثر مرتفعاً (3) في جميعها تكون الدرجة القصوى = 3 × 21 = 63.'
      },
      {
        question: 'في مصفوفة المخاطر النسبية لمنهجية OCTAVE Allegro، إذا كانت درجة الخطر النسبية لسيناريو ما تساوي 23 (الفئة 16–29) واحتمالية وقوعه «متوسطة»، ففي أي مجموعة يقع؟',
        options: [
          'المجموعة 1 (Pool 1)',
          'المجموعة 2 (Pool 2 — تخفيف أو تأجيل)',
          'المجموعة 3 (Pool 3)',
          'المجموعة 4 (Pool 4)'
        ],
        correctIndex: 1,
        explanation: 'تقاطع عمود الدرجة (16–29) مع صف الاحتمالية المتوسطة في مصفوفة OCTAVE Allegro يضع الخطر في المجموعة 2 (Pool 2).'
      },
      {
        question: 'لماذا يُعدّ القبول التلقائي لخطر ذي أثر كارثي (درجة 42 من 45) بمجرد أن احتماله التقديري «منخفض» خطأً جسيماً في تقييم المخاطر؟',
        options: [
          'لأن تقديرات الاحتمالية للأحداث السيبرانية غير يقينية، والعواقب الجسيمة التي تتجاوز حد التحمل تضع الخطر في المجموعة 2 لا المجموعة 4، مما يستلزم مراجعة دقيقة وتخفيفاً أو نقلاً',
          'لأن الاحتمالية المنخفضة تعني وقوع الحدث يومياً',
          'لأن درجة الخطر النسبية لا علاقة لها بالأثر',
          'لأن جميع المخاطر يجب تجنبها بإغلاق المؤسسة'
        ],
        correctIndex: 0,
        explanation: 'في مصفوفة OCTAVE Allegro، الخطر ذو الدرجة (30–45) والاحتمالية المنخفضة يقع في المجموعة 2 وليس المجموعة 4، فلا يجوز قبوله آلياً دون فحص حدود التحمل.'
      },
      {
        question: 'ما الهدف الرئيسي من تطبيق «مسار مراجعة الأقران» (Peer Review) أثناء تقدير الأثر والاحتمالية؟',
        options: [
          'إطالة مدة المشروع دون فائدة عملية',
          'تحقيق الاتساق في التقدير وتقليل الذاتية والتحيز الشخصي عبر فحص التقديرات ومناقشة الفروق وتوثيق المبرر المعتمد',
          'إلغاء دور مالك الأصل المعلوماتي',
          'الاستغناء عن أوراق عمل معايير القياس'
        ],
        correctIndex: 1,
        explanation: 'تهدف مراجعة الأقران إلى ضبط جودة التقييم ومنع التطرف في التقدير (تهويلاً أو تهويناً) وتوثيق مسوغات الدرجات المعتمدة.'
      }
    ],
      flashcards: [
      {
        front: 'ما معادلة حساب درجة الخطر النسبية (Relative Risk Score) في OCTAVE Allegro؟',
        back: 'درجة الخطر النسبية = مجموع (قيمة الأثر في المجال × رتبة أهمية المجال) عبر جميع مجالات الأثر المعتمدة.',
        category: 'درجة الخطر النسبية'
      },
      {
        front: 'كم تبلغ أعلى درجة خطر نسبية ممكنة عند استخدام 5 مجالات أثر، وعند استخدام 6 مجالات أثر؟',
        back: 'عند استخدام 5 مجالات أثر تبلغ 45 درجة (3 × 15)، وعند استخدام 6 مجالات أثر تبلغ 63 درجة (3 × 21).',
        category: 'درجة الخطر النسبية'
      },
      {
        front: 'ما الفرق بين الرغبة/شهية المخاطر (Risk Appetite) وحدود التحمل (Risk Tolerance)؟',
        back: 'شهية المخاطر هي المقدار العام من الخطر الذي تقبله المنظمة لتحقيق أهدافها، أما حدود التحمل فهي العتبة الدقيقة القصوى المقبولة في خطر أو مجال بعينه.',
        category: 'حوكمة المخاطر'
      },
      {
        front: 'ما هي الخطوات الأربع لمسار مراجعة الأقران (Peer Review) في تقدير المخاطر؟',
        back: '1) التقدير الأولي من المقدر الأول، 2) المراجعة المستقلة من طرف آخر، 3) مناقشة الفروق، 4) توثيق التقدير والمبرر المعتمد.',
        category: 'جودة التقييم'
      },
      {
        front: 'كيف يختلف أثر انتهاك السرية عن أثر انتهاك التكامل وعن أثر انتهاك التوافر؟',
        back: 'انتهاك السرية يكشف المعلومة لغير المخولين (إفشاء)، وانتهاك التكامل يفسد صحة البيانات ودقتها (تعديل)، وانتهاك التوافر يحجب الوصول إليها (فقدان أو انقطاع).',
        category: 'الأثر الأمني'
      },
      {
        front: 'لماذا يجب ترتيب مجالات الأثر بحسب أهميتها للمنظمة قبل حساب درجة المخاطر؟',
        back: 'لأن وزن كل مجال (من 1 إلى 5) يدخل كمعامل ضرب مباشر في حساب درجة الخطر النسبية، فبدون ترتيب الأولويات لا تعكس الدرجة محركات المنظمة.',
        category: 'معايير القياس'
      }
    ]
    },
    updated_at: NOW_TIMESTAMP
  },

  // =========================================================================
  // الفصل السادس: استراتيجيات معالجة المخاطر الأربع والمخاطر المتبقية
  // =========================================================================
  {
    id: 206,
    chapter_number: 6,
    title: 'استراتيجيات معالجة المخاطر الأربع (التخفيف، النقل، القبول، التجنب) والمخاطر المتبقية (Residual Risk)',
    subtitle: 'التخفيف والنقل والقبول والتجنب والتأجيل، تصميم الضوابط على مستوى الحاوية، وحساب المخاطر المتبقية',
    description: 'دراسة تفصيلية لاستراتيجيات التعامل مع المخاطر السيبرانية (التخفيف، النقل/المشاركة، التجنب، القبول، والتأجيل)، وتصميم الضوابط الأمنية الوقائية والكشفية والتعويضية على مستوى الحاويات الثلاث، وتحليل التناسب الاقتصادي بين تكلفة المعالجة وقيمة الأصل، وإدارة المخاطر المتبقية.',
    category: 'معالجة المخاطر',
    difficulty: 'intermediate',
    pdfStartPage: 64,
    pdfEndPage: 73,
    diagramKey: 'ise232-risk-6',
    videoUrl: 'https://www.youtube.com/watch?v=8kVXKyGOYsY',
    videoDuration: '20:50',
    presentationUrl: '/presentations/ise232-risk-ch6.pdf',
    keyTopics: [
      'استراتيجيات معالجة المخاطر الأربع: التخفيف (Mitigate)، النقل (Transfer)، التجنب (Avoid)، القبول (Accept)، بالإضافة إلى التأجيل (Defer)',
      'تصميم الضوابط الأمنية على مستوى الحاوية: الوقائية (Preventive)، الكشفية (Detective)، والتعويضية/التصحيحية (Compensating/Corrective)',
      'حساب وتقييم المخاطر المتبقية (Residual Risk) ومقارنتها بشهية المخاطر وحدود التحمل',
      'اقتصاديات المعالجة: الكفاءة (Efficiency) والفعالية (Effectiveness) والتناسب مع قيمة الأصل',
      'مخاطر إسناد إدارة الحاويات لمزودي خدمات خارجيين دون نقل متطلبات أمن الأصل',
      'الأعمدة التسعة لورقة عمل مخاطر الأصل المعلوماتي وتوثيق قرار المعالجة النهائي',
    ],
    images: [
      {
        prompt: 'Four risk treatment strategies mitigate transfer avoid accept decision flowchart and residual risk shield, 16:9',
        caption: 'مخطط اختيار استراتيجية معالجة المخاطر (التخفيف، النقل، التجنب، القبول) والوصول للخطر المتبقي المقبول',
        alt: 'Risk treatment strategies flowchart',
        seed: 2061,
        isAIGenerated: true,
      },
      {
        prompt: 'Security controls applied to technical physical and human asset containers preventive detective corrective, 16:9',
        caption: 'تطبيق الضوابط الوقائية والكشفية والتعويضية على الحاويات التقنية والمادية والبشرية',
        alt: 'Security controls on asset containers',
        seed: 2062,
        isAIGenerated: true,
      },
    ],
    content: `## 6.1 استراتيجيات التعامل مع المخاطر السيبرانية

بعد تقييم المخاطر وتحديد درجاتها النسبية وتصنيفها في مجموعات (Pools 1–4)، تتخذ المنظمة قراراً واعياً وموثقاً لكل خطر عبر إحدى **الاستراتيجيات الأربع الرئيسية** (إضافةً إلى خيار التأجيل المؤقت في OCTAVE Allegro):

| الاستراتيجية | المصطلح الإنجليزي | الجوهر الإجرائي | نوع المخاطر الأنسب لها | ما يلزم بعد اتخاذ القرار |
| :--- | :--- | :--- | :--- | :--- |
| **1. التخفيف (الحد)** | **Mitigate / Reduce** | تطبيق ضوابط أمنية على الحاويات لخفض احتمالية وقوع التهديد أو تقليل أثره | المخاطر الحرجة والمرتفعة (المجموعة 1 وجزء من 2) | تنفيذ الضوابط، قياس فعاليتها، وتقييم **الخطر المتبقي** |
| **2. النقل (المشاركة)** | **Transfer / Share** | تحويل العبء المالي أو التشغيلي للخطر إلى طرف ثالث (تأمين سيبراني أو تعهيد مضمون باتفاقية SLA) | المخاطر ذات الأثر المالي الكبير والاحتمال المنخفض أو التي تتطلب خبرة خارجية | إبرام العقود، إبلاغ الطرف الثالث بمتطلبات أمن الأصل، ومراقبة التزامه |
| **3. التجنب** | **Avoid** | إيقاف النشاط أو إلغاء العملية أو الاستغناء عن الحاوية المسببة للخطر كلياً | المخاطر التي تفوق عواقبها وتكلفة حمايتها الفائدة المرجوة من النشاط نفسه | التأكد من عدم تأثير إيقاف النشاط على أهداف المنظمة الأساسية |
| **4. القبول** | **Accept** | عدم اتخاذ إجراء إضافي والاعتماد على الضوابط القائمة مع القبول الرسمي للعواقب المحتملة | المخاطر المنخفضة الواقعة ضمن شهية المخاطر وحدود التحمل (المجموعة 4) | توثيق القبول رسمياً من صاحب الصلاحية ومراقبة الخطر دورياً |
| **5. التأجيل (في Allegro)** | **Defer** | إرجاء قرار التخفيف مؤقتاً لمخاطر متوسطة غير عاجلة مع وضعها تحت المراقبة | المخاطر المتوسطة (المجموعتان 2 و3) عند محدودية الميزانية الحالية | تحديد **تاريخ إلزامي لإعادة التقييم** ومراقبة أي تغير في البيئة |

> [!warning]
> **تنبيه حرج حول استراتيجية النقل (Transfer)**: إسناد استضافة البيانات أو إدارة الحاويات إلى مزود خدمة سحابية أو طرف ثالث **لا يعفي مالك الأصل من المساءلة النظامية والسمعة**؛ وإذا لم يُبلّغ المزود الخارجي بمتطلبات أمن الأصل كتابةً، ينشأ خطر جديد يتمثل في فجوة ضوابط لدى الطرف الثالث.

---

## 6.2 تصميم الضوابط الأمنية على مستوى الحاوية (Container-Level Controls)

تُطبق الضوابط الأمنية لحماية الأصل المعلوماتي من خلال تحصين **الحاويات الثلاث** التي يعيش فيها، وتنقسم وظيفياً إلى:

1. **ضوابط وقائية (Preventive Controls)**: تمنع وقوع الحادث أو استغلال الثغرة ابتداءً (مثل: التشفير، المصادقة متعددة العوامل MFA، الأقفال المادية، التدريب الأمني).
2. **ضوابط كشفية (Detective Controls)**: ترصد وقوع الحدث أثناء أو فور حدوثه وتطلق التنبيهات (مثل: أنظمة كشف التسلل IDS، مراجعة سجلات التدقيق Audit Logs، كاميرات المراقبة CCTV).
3. **ضوابط تصحيحية وتعويضية (Corrective & Compensating Controls)**: تستعيد الوضع الطبيعي بعد الحادث (كالنسخ الاحتياطي وخطط التعافي) أو تعوض غياب ضابط أصلي تعذر تطبيقه تقنياً أو مالياً.

### أمثلة تطبيق الضوابط بحسب نوع الحاوية

| نوع الحاوية | ضابط وقائي (Preventive) | ضابط كشفي (Detective) | ضابط تصحيحي / تعويضي (Corrective) |
| :--- | :--- | :--- | :--- |
| **حاوية تقنية** | تشفير قواعد البيانات (AES-256) وضبط الصلاحيات (RBAC) | تفعيل سجلات تدقيق المعاملات ونظام SIEM | استعادة البيانات من نسخ احتياطية معزولة (Immutable Backups) |
| **حاوية مادية** | خزائن حديدية مقفلة وبطاقات دخول ذكية لغرفة الأرشيف | حساسات الحركة والدخان وكاميرات المراقبة وسجل الزوار | موقع بديل للتعافي من الكوارث (DR Site) ونسخ خارج الموقع |
| **حاوية بشرية** | فصل المهام (SoD) وبرامج التوعية ضد الهندسة الاجتماعية | مراجعة الأقران الدورية ورصد السلوك غير المعتاد (UEBA) | إجراءات سحب الصلاحيات الفوري وتدوير المهام الحساسة |

---

## 6.3 المخاطر المتبقية (Residual Risk) واقتصاديات المعالجة

بعد تطبيق استراتيجية التخفيف، لا ينعدم الخطر تماماً بل يتبقى منه جزء يسمى **المخاطر المتبقية (Residual Risk)**:

$$\text{Residual Risk} = \text{Inherent Risk} - \text{Implemented Controls Reduction}$$

- **شرط الاعتماد**: يجب أن تكون المخاطر المتبقية أقل من **حد التحمل (Risk Tolerance)** وداخلة ضمن **شهية المخاطر (Risk Appetite)**. فإن بقيت أعلى من حد التحمل، وجب إضافة ضوابط إضافية أو تغيير الاستراتيجية.
- **التناسب الاقتصادي (Cost-Value Proportionality)**: يجب أن تتناسب تكلفة المعالجة مع قيمة الأصل المحمي، مع تحقيق:
  - **الفعالية (Effectiveness)**: قدرة الضابط على خفض الخطر فعلياً بالقدر المطلوب.
  - **الكفاءة (Efficiency)**: تحقيق ذلك الهدف بأقل تكلفة وموارد تشغيلية ممكنة.`,
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'استراتيجيات التعامل مع المخاطر الأربع وخيار التأجيل',
        subtitle: 'التخفيف · النقل · التجنب · القبول · التأجيل المراقب',
        bullets: [
          'التخفيف (Mitigate): تطبيق ضوابط أمنية لتقليل احتمالية التهديد أو تحجيم أثره على المنظمة.',
          'النقل (Transfer): مشاركة العبء المالي أو التشغيلي مع طرف ثالث كشركات التأمين أو مقدمي الخدمات.',
          'التجنب (Avoid): إلغاء النشاط أو الاستغناء عن التقنية المسببة للخطر حين تفوق مخاطرها منافعها.',
          'القبول (Accept) والتأجيل (Defer): قبول المخاطر المنخفضة رسمياً، أو تأجيل المتوسطة مع تحديد موعد إعادة التقييم.'
        ],
        keyHighlight: 'تجمع معظم خطط المعالجة الناجحة بين أكثر من استراتيجية (مثل تخفيف الخطر تقنياً ثم نقل الخطر المتبقي بالتأمين).',
        diagramTitle: 'شجرة القرار لاختيار استراتيجية معالجة المخاطر'
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'هندسة الضوابط الأمنية على مستوى الحاويات الثلاث',
        subtitle: 'ضوابط وقائية (Preventive) · كشفية (Detective) · تعويضية وتصحيحية',
        bullets: [
          'الضوابط الوقائية تمنع استغلال الثغرة قبل وقوعه (مثل التشفير والمصادقة متعددة العوامل والأقفال).',
          'الضوابط الكشفية ترصد الاختراق أو الخطأ فور وقوعه (مثل سجلات التدقيق Audit Logs وأنظمة IDS).',
          'الضوابط التعويضية والتصحيحية توفر حماية بديلة وتستعيد توافر الأصل بعد الحادث (كالنسخ الاحتياطي).',
          'يُصمم الضابط دائماً بلغة الحاوية: ضابط تقني للخادم، وضابط مادي للورق والأشرطة، وضابط إجرائي/توعوي للبشر.'
        ],
        keyHighlight: 'لا يكتمل برنامج الحماية بالاكتفاء بالضوابط الوقائية؛ فغياب الضوابط الكشفية يجعل الاختراق يمر دون أن يشعر به أحد.',
        diagramTitle: 'مصفوفة الضوابط الوقائية والكشفية والتصحيحية عبر الحاويات'
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'المخاطر المتبقية (Residual Risk) وحدود القبول',
        subtitle: 'ماذا يبقى بعد تطبيق الضوابط ومن يملك صلاحية قبوله؟',
        bullets: [
          'المخاطر المتبقية هي الفرق بين الخطر الكامن ومقدار الخفض الذي حققته الضوابط المطبقة.',
          'لا يُغلق ملف الخطر بمجرد شراء الضابط الأمني، بل يجب إعادة تقييم الخطر المتبقي للتأكد من قبوله.',
          'إذا تجاوز الخطر المتبقي حد التحمل ( مثال: بقاء احتمال غرامة تفوق 25,000 دولار)، يُرفض القبول وتُضاف ضوابط.',
          'اعتماد المخاطر المتبقية مسؤولية حصرية للإدارة العليا ومالك الأصل، وليس لمهندس الشبكة منفرداً.'
        ],
        keyHighlight: 'كل قرار تخفيف ينتهي حتماً بـ «خطر متبقٍ» يجب أن يُقبل رسمياً ويوثق في سجل المخاطر.',
        diagramTitle: 'تدرج خفض الخطر الكامن عبر الضوابط وصولاً للخطر المتبقي المقبول'
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'اقتصاديات المعالجة ومخاطر إسناد الحاويات للأطراف الثالثة',
        subtitle: 'التوازن بين الكفاءة والفعالية وضبط عقود الموردين',
        bullets: [
          'قاعدة التناسب المالي: لا يجوز أن تتجاوز تكلفة الضابط الأمني قيمة الأصل المعلوماتي الذي يحميه.',
          'الفعالية تعني نجاح الضابط في صد التهديد، والكفاءة تعني تحقيق ذلك بأقل كلفة وتعقيد تشغيلي.',
          'عند نقل إدارة حاوية لمزود خارجي، يجب تضمين متطلبات أمن الأصل (السرية، التكامل، التوافر) في العقد.',
          'المسؤولية القانونية والسمعة تبقى على عاتق المنظمة مالكة الأصل حتى لو نُقلت العمليات لطرف ثالث.'
        ],
        keyHighlight: 'تعهيد قاعدة البيانات أو أشرطة النسخ لمورد لا يعرف متطلبات أمن الأصل يخلق ثغرة تعاقدية وتشغيلية خطيرة.',
        diagramTitle: 'معادلة الموازنة بين قيمة الأصل وتكلفة الضابط ومخاطر الطرف الثالث'
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'ورقة عمل مخاطر الأصل المعلوماتي (الأعمدة التسعة)',
        subtitle: 'التوثيق الكامل من مجال القلق إلى خطة المعالجة',
        bullets: [
          'الأعمدة (1–4): الأصل ومجال القلق، الفاعل، الوسيلة، والدافع.',
          'الأعمدة (5–6): النتيجة (إفشاء/تعديل/فقدان/انقطاع) والمتطلب الأمني المنتهك.',
          'الأعمدة (7–8): الاحتمالية، بيان العواقب، وجدول حساب الشدة ودرجة الخطر النسبية.',
          'العمود (9): قرار معالجة المخاطر (الحوض، الاستراتيجية، الضوابط المقترحة على كل حاوية).'
        ],
        keyHighlight: 'لا يجوز أن يبقى أي سطر في سجل المخاطر خالياً في العمود التاسع؛ فكل خطر لا بد له من نهج معالجة موثق.',
        diagramTitle: 'الهيكل التفصيلي للأعمدة التسعة في ورقة عمل المخاطر (Worksheet 10)'
      }
    ],
    flashcards: [
      {
        front: 'قارن بين استراتيجيات التخفيف والنقل والتجنب والقبول.',
        back: 'التخفيف يقلل الاحتمالية أو الأثر بضوابط أمنية؛ النقل يحول عبء الخطر لطرف ثالث؛ التجنب يوقف النشاط المسبب للخطر كلياً؛ القبول يقر العواقب المحتملة دون ضوابط إضافية.',
        category: 'استراتيجيات المعالجة'
      },
      {
        front: 'ما الفرق بين الضابط الوقائي والضابط الكشفي والضابط التعويضي؟',
        back: 'الوقائي يمنع استغلال الثغرة ابتداءً (كالتشفير)، والكشفي يرصد الحدث عند وقوعه (كتدقيق السجلات)، والتعويضي يوفر بديلاً أمنياً عند تعذر تطبيق الضابط الأصلي.',
        category: 'الضوابط الأمنية'
      },
      {
        front: 'لماذا تجمع معظم خطط المعالجة بين أكثر من استراتيجية واحدة؟',
        back: 'لأن استراتيجية واحدة نادراً ما تكفي وحدها؛ فالمنظمة قد تخفف الخطر بضوابط تقنية، ثم تنقل الجزء المالي المتبقي بالتأمين، وتقبل الهامش الضئيل المتبقي.',
        category: 'تخطيط المعالجة'
      },
      {
        front: 'ما الخطر الذي ينشأ عند إسناد إدارة حاويات الأصل لمزود خدمة خارجي لا يعرف متطلبات أمن الأصل؟',
        back: 'ينشأ خطر تطبيق المزود لممارسات تشغيلية لا تلبي سرية أو تكامل أو توافر الأصل، مما يعرض الأصل للاختراق مع بقاء المساءلة القانونية على المنظمة المالكة.',
        category: 'مخاطر الطرف الثالث'
      },
      {
        front: 'متى يكون قرار «قبول المخاطر» (Risk Acceptance) قراراً غير مقبول منهجياً؟',
        back: 'عندما يتجاوز أثر الخطر حد التحمل المعتمد في المنظمة (مثل قبول خطر يؤدي لغرامة تتجاوز الحد الفاصل الأعلى أو يهدد سلامة المرضى).',
        category: 'حدود التحمل'
      },
      {
        front: 'ما الفرق بين الكفاءة (Efficiency) والفعالية (Effectiveness) في اختيار الضوابط الأمنية؟',
        back: 'الفعالية هي قدرة الضابط على تحقيق هدف الحماية وخفض الخطر، أما الكفاءة فهي تحقيق ذلك الهدف بأقل تكلفة وموارد ممكنة تتناسب مع قيمة الأصل.',
        category: 'اقتصاديات الأمن'
      }
    ],
    miniQuiz: [
      {
        question: 'قررت شركة الاستغناء نهائياً عن ميزة الدخول عن بُعد لنظام أرشيف سري للغاية لأن مخاطر اختراقها تفوق الفائدة المرجوة منها. ما الاستراتيجية التي طبقتها الشركة؟',
        options: [
          'قبول المخاطر (Risk Acceptance)',
          'نقل المخاطر (Risk Transfer)',
          'تجنب المخاطر (Risk Avoidance)',
          'تأجيل المخاطر (Risk Deferral)'
        ],
        correctIndex: 2,
        explanation: 'إلغاء النشاط أو الميزة المسببة للخطر من جذورها للتخلص من احتمال وقوع الخطر يمثل استراتيجية «تجنب المخاطر» (Risk Avoidance).'
      },
      {
        question: 'عند تفعيل ميزة «سجلات تدقيق المعاملات» (Transaction Audit Logs) لكشف أي موظف يدخل تعديلاً غير مصرح به على الفواتير، فما نوع هذا الضابط الأمني؟',
        options: [
          'ضابط كشفي (Detective Control) يُطبق على الحاوية التقنية لرصد أفعال الحاوية البشرية',
          'ضابط مادي بيئي فقط',
          'استراتيجية تجنب للمخاطر',
          'قبول للمخاطر دون إجراء'
        ],
        correctIndex: 0,
        explanation: 'سجلات التدقيق (Audit Logs) تكشف التعديلات بعد أو أثناء وقوعها وتحدد هوية الفاعل، فهي ضابط كشفي (Detective Control).'
      },
      {
        question: 'خادم تبلغ قيمته الكلية مع البيانات التي يحويها 10,000 ريال فقط، واقترح أحد المهندسين شراء منظومة حماية متخصصة لهذا الخادم وحده بتكلفة 50,000 ريال سنوياً. ما الحكم العلمي الصحيح؟',
        options: [
          'الاقتراح سليم لأن الأمن لا يقدر بثمن',
          'الاقتراح يخالف مبدأ تناسب تكلفة المعالجة مع قيمة الأصل المحمي ويفقر الكفاءة الاقتصادية',
          'يجب مضاعفة المبلغ إلى 100,000 ريال',
          'الخادم لا يحتاج لأي كلمة مرور'
        ],
        correctIndex: 1,
        explanation: 'من القواعد الأساسية في معالجة المخاطر أن تكلفة الضابط الأمني يجب أن تتناسب اقتصادياً مع قيمة الأصل المحمي ومقدار الخسارة المتوقعة.'
      },
      {
        question: 'إذا وقع خطر في المجموعة 2 (درجة 23 واحتمالية متوسطة)، ولكنه يتضمن أثراً مرتفعاً (3) في مجال الغرامات القانونية يتجاوز حد التحمل الصارم للمؤسسة، فما القرار الأرجح بين خياري المجموعة 2 (التخفيف أو التأجيل)؟',
        options: [
          'اختيار التخفيف (Mitigate) لأن تجاوز حد التحمل في الغرامات يمنع التأجيل أو القبول',
          'تأجيل الخطر إلى أجل غير مسمى',
          'حذف الخطر من سجل المخاطر',
          'تحويله إلى المجموعة 4 تلقائياً'
        ],
        correctIndex: 0,
        explanation: 'دليل المجموعات إرشادي ويُقرأ مع تفاصيل المجالات؛ فبما أن الخطر يسبب أثراً مرتفعاً في الغرامات يتجاوز حد التحمل، يتعين اختيار التخفيف لا التأجيل.'
      }
    ],
    interactiveBook3D: {
      model3DType: 'treatment_4strategies_shield',
      shaderEffect: 'defense_barrier_emerald_shield',
      ambientColor: '#061a17',
      accentColor: '#10b981',
      autoRotateSpeed: 1.15,
      pages3D: [
        {
          pageNumber: 1,
          spreadSide: 'right',
          title: 'محاكي دروع المعالجة الأربع والخطر المتبقي',
          subtitle: 'اختبار أثر الضوابط الوقائية والكشفية والتعويضية على الحاويات',
          summaryMarkdown: 'يُجسد المجسم ثلاثي الأبعاد **منظومة الدروع الدفاعية الأربع** (التخفيف، النقل، التجنب، القبول) حول حاويات الأصل المعلوماتي، ويوضح كيف يمتص كل ضابط جزءاً من الشعاع الهجومي ليخرج **الخطر المتبقي (Residual Risk)** ضمن النطاق الآمن.',
          interactiveFormula: 'Residual_Risk = Inherent_Risk × (1 - P_prevent) × (1 - P_detect_respond)',
          labParameterName: 'عدد طبقات الضوابط المطبقة (الدفاع المتعمق)',
          labMin: 1,
          labMax: 4,
          labDefault: 3,
          labUnit: 'طبقات ضوابط',
          labInterpretation: {
            1: 'طبقة واحدة (ضابط وقائي فقط): خفض جزئي للخطر، لكن في حال اختراق الطبقة لا يوجد كشف ولا استعادة.',
            2: 'طبقتان (وقائي + كشفي): منع معظم الهجمات مع رصد فوري لمحاولات التجاوز في سجلات التدقيق.',
            3: 'ثلاث طبقات (وقائي + كشفي + تصحيحي/نسخ احتياطي): خفض الخطر المتبقي إلى ما دون حد التحمل.',
            4: 'أربع طبقات (دفاع متعمق + نقل تأميني للمخاطر الكارثية): أقصى درجات الصمود السيبراني والمالي.'
          },
          challengeQuestion: {
            question: 'عندما تشفر المستشفى أشرطة النسخ الاحتياطي (ضابط وقائي) وتحتفظ بنسخة ثانية في موقع بديل (ضابط تصحيحي/تعويضي)، ماذا يحدث للخطر المتبقي لسيناريو سرقة شريط أثناء النقل؟',
            options: [
              'ينخفض أثر السرية (الإفشاء) بفضل التشفير، وينخفض أثر التوافر (الفقدان) بفضل النسخة الثانية، فيصبح الخطر المتبقي مقبولاً',
              'يزداد الخطر الكامن أضعافاً مضاعفة',
              'تنتقل ملكية البيانات لشركة النقل',
              'يصبح التشفير غير ذي فائدة'
            ],
            correctIndex: 0,
            feedbackCorrect: 'إجابة ممتازة! التشفير يعالج خطر الإفشاء، والنسخة الثانية تعالج خطر الفقدان، فينخفض الخطر المتبقي في البعدين معاً.',
            feedbackWrong: 'لاحظ أن كل ضابط يعالج جانباً من النتيجة: التشفير يحمي السرية، والنسخة الإضافية تحمي التوافر.'
          },
          aiTutorGuardrailTopics: ['التخفيف والنقل والتجنب والقبول', 'الضوابط الوقائية والكشفية والتعويضية', 'المخاطر المتبقية', 'اقتصاديات المعالجة']
        },
        {
          pageNumber: 2,
          spreadSide: 'left',
          title: 'مختبر هندسة الضوابط على الحاويات الثلاث وإدارة الطرف الثالث',
          subtitle: 'مواءمة الضابط الوقائي والكشفي والتعويضي مع موقع التهديد',
          summaryMarkdown: 'في الصفحة اليسرى، تختبر قاعدة **«تطبيق الضابط على مستوى الحاوية»**: كيف نحمي الحاوية التقنية بالتشفير وتدقيق المعاملات، والمادية بالخزائن وتعدد النسخ، والبشرية بفصل المهام والتوعية، وكيف نضبط عقود الأطراف الخارجية.',
          interactiveFormula: 'Container_Security = Preventive_Control + Detective_Control + Corrective_Control',
          labParameterName: 'مستوى إلزام الطرف الثالث بمتطلبات أمن الأصل تعاقدياً وتقنياً',
          labMin: 1,
          labMax: 5,
          labDefault: 4,
          labUnit: 'مستوى ضبط المورد',
          labInterpretation: {
            1: 'إسناد عشوائي بلا شروط أمنية: المزود لا يعرف متطلبات سرية وتكامل الأصل (خطر حرج!).',
            2: 'عقد تجاري عام: غياب بنود التشفير وحق التدقيق والإبلاغ عن الحوادث.',
            3: 'اتفاقية عدم إفشاء (NDA) فقط: غير كافية تقنياً لحماية الحاويات الخارجية.',
            4: 'اتفاقية SLA أمنية مفصلة: نقل متطلبات أمن الأصل للمزود مع تشفير البيانات قبل النقل.',
            5: 'حوكمة أطراف خارجية متكاملة (NCA ECC-4): تشفير + SLA + تدقيق دوري + خطة خروج آمنة.'
          },
          challengeQuestion: {
            question: 'عندما تجمع المؤسسة بين «إلغاء خدمة نقل ملفات قديمة غير آمنة» و«تطبيق تشفير قوي على الخدمة البديلة»، فما الاستراتيجيتان اللتان جمعت بينهما؟',
            options: [
              'جمعت بين استراتيجية التجنب (بإيقاف الخدمة القديمة الخطرة) واستراتيجية التخفيف/الحد (بتشفير الخدمة البديلة)',
              'استراتيجية القبول فقط',
              'استراتيجية التأجيل فقط',
              'لم تطبق أي استراتيجية معالجة'
            ],
            correctIndex: 0,
            feedbackCorrect: 'ممتاز! إيقاف النشاط الخطر هو «تجنب» (Avoid)، وتطبيق ضوابط لتقليل خطر النشاط القائم هو «تخفيف/حد» (Mitigate).',
            feedbackWrong: 'لاحظ أن إيقاف مصدر الخطر يمثل «التجنب»، وتحصين العملية بالضوابط يمثل «التخفيف».'
          },
          aiTutorGuardrailTopics: ['الضوابط على الحاويات', 'التجنب والتخفيف', 'أمن الأطراف الخارجية', 'العمود التاسع']
        }
      ],
      stepByStep: [
        {
          stepNumber: 1,
          title: 'الخطوة 1: فحص الخطر الكامن ومقارنته بشهية المخاطر وحد التحمل',
          description: 'تحديد ما إذا كان الخطر الكامن يقع ضمن النطاق المقبول (Pool 4) أم يتطلب تدخلاً (Pools 1–3).',
          formulaOrRule: 'If Inherent_Risk > Tolerance → Select Treatment Strategy',
          visualState: 'inherent_beam_incoming',
          cameraFocus: { x: -2.2, y: 1.2, z: 3.0 }
        },
        {
          stepNumber: 2,
          title: 'الخطوة 2: اختيار الاستراتيجية الملائمة (Mitigate / Transfer / Avoid / Accept)',
          description: 'المفاضلة بين التخفيف بضوابط، أو النقل لطرف ثالث، أو تجنب النشاط، أو التأجيل المجدول.',
          formulaOrRule: 'Strategy ∈ {Mitigate, Transfer, Avoid, Accept, Defer}',
          visualState: 'strategy_selector_ring',
          cameraFocus: { x: 0.0, y: 1.5, z: 3.2 }
        },
        {
          stepNumber: 3,
          title: 'الخطوة 3: ربط الضوابط بالحاويات (تقنية 9a / مادية 9b / بشرية 9c)',
          description: 'تطبيق الضوابط الوقائية والكشفية والتصحيحية على الحاوية الدقيقة التي ينشأ فيها التهديد.',
          formulaOrRule: 'Control_Target = Specific_Asset_Container (9a, 9b, or 9c)',
          visualState: 'container_shields_deployed',
          cameraFocus: { x: 2.0, y: 0.8, z: 3.0 }
        },
        {
          stepNumber: 4,
          title: 'الخطوة 4: حساب الخطر المتبقي واعتماده رسمياً في العمود التاسع',
          description: 'التأكد من انخفاض الخطر المتبقي لما دون حد التحمل وتوثيق موافقة الإدارة العليا عليه.',
          formulaOrRule: 'Residual_Risk ≤ Risk_Tolerance → Approved & Logged',
          visualState: 'residual_risk_green_core',
          cameraFocus: { x: 0.0, y: -1.6, z: 3.4 }
        }
      ],
      hotspots: [
        {
          id: 'hs-ch6-mitigate',
          label: 'درع التخفيف (Mitigate Strategy)',
          x: -1.8,
          y: 1.3,
          z: 0.6,
          coordinates: { x: -1.8, y: 1.3, z: 0.6 },
          title: 'استراتيجية التخفيف عبر الضوابط الوقائية والكشفية والتعويضية',
          detailedExplanation: 'الاستراتيجية الأكثر تطبيقاً في الأمن السيبراني؛ تخفض الاحتمالية عبر الضوابط الوقائية وتحد من الأثر عبر الضوابط الكشفية والتصحيحية.',
          technicalMetric: 'Pool 1 & Pool 2 Primary Strategy',
          securityImpact: 'حرج جداً',
          relatedControl: 'NCA ECC-2:2024 — تعزيز الأمن السيبراني (المكون الثاني)'
        },
        {
          id: 'hs-ch6-transfer',
          label: 'بوابة نقل المخاطر (Transfer Strategy)',
          x: 1.8,
          y: 1.3,
          z: 0.6,
          coordinates: { x: 1.8, y: 1.3, z: 0.6 },
          title: 'استراتيجية النقل والمشاركة التعاقدية والتأمين السيبراني',
          detailedExplanation: 'تنقل التبعات المالية أو التشغيلية لطرف ثالث، مع وجوب تضمين متطلبات أمن الأصل في اتفاقيات مستوى الخدمة (SLA) وبقاء المساءلة النهائية لدى مالك الأصل.',
          technicalMetric: 'SLA + Cyber Insurance + Third-Party Security Addendum',
          securityImpact: 'مرتفع',
          relatedControl: 'NCA ECC-2:2024 — الأمن السيبراني المتعلق بالأطراف الخارجية (4-1)'
        },
        {
          id: 'hs-ch6-avoid',
          label: 'صمام تجنب المخاطر (Avoid Strategy)',
          x: -1.8,
          y: -1.3,
          z: 0.6,
          coordinates: { x: -1.8, y: -1.3, z: 0.6 },
          title: 'استراتيجية التجنب بإيقاف النشاط أو الحاوية الخطرة',
          detailedExplanation: 'تُستخدم عندما يكون الخطر كارثياً وتكلفة الضوابط اللازمة لتخفيفه أعلى من العائد التجاري أو التشغيلي للنشاط نفسه.',
          technicalMetric: 'Zero Exposure via Activity Termination',
          securityImpact: 'مرتفع',
          relatedControl: 'ISO/IEC 27005:2022 — Risk Avoidance Clause'
        },
        {
          id: 'hs-ch6-accept',
          label: 'ختم القبول والخطر المتبقي (Accept & Residual)',
          x: 1.8,
          y: -1.3,
          z: 0.6,
          coordinates: { x: 1.8, y: -1.3, z: 0.6 },
          title: 'استراتيجية القبول الموثق وإدارة المخاطر المتبقية',
          detailedExplanation: 'قبول رسمي موقع من صاحب الصلاحية للمخاطر الواقعة في المجموعة 4 أو للمخاطر المتبقية بعد التخفيف، بشرط عدم تجاوز حد التحمل.',
          technicalMetric: 'Residual Risk ≤ Risk Appetite & Tolerance',
          securityImpact: 'متوسط',
          relatedControl: 'NCA ECC-2:2024 — اعتماد سجل المخاطر والمخاطر المتبقية (1-5)'
        }
      ]
    },
    richData: {
      id: 206,
      chapter_number: 6,
      title: 'استراتيجيات معالجة المخاطر الأربع والمخاطر المتبقية',
      subtitle: 'التخفيف، النقل، التجنب، القبول، والضوابط على مستوى الحاويات',
      category: 'متقدم',
      pdfStartPage: 64,
      pdfEndPage: 73,
      description: 'مقارنة شاملة لاستراتيجيات معالجة المخاطر الأربع وتصميم الضوابط على الحاويات وحساب المخاطر المتبقية.',
      objectives: [
        'التمييز بين استراتيجيات التخفيف والنقل والتجنب والقبول والتأجيل.',
        'تصميم ضوابط وقائية وكشفية وتعويضية على مستوى الحاويات التقنية والمادية والبشرية.',
        'تعريف المخاطر المتبقية وتطبيق مبدأ التناسب بين تكلفة المعالجة وقيمة الأصل.'
      ],
      sections: [
        {
          heading: '1. الاستراتيجيات الأربع والضوابط على الحاويات',
          content: 'تُعالج المخاطر بالتخفيف أو النقل أو التجنب أو القبول، وتُطبق الضوابط على الحاوية التي يتعرض فيها الأصل للتهديد.',
          formula: 'Residual Risk = Inherent Risk - Control Mitigation',
          saudiExample: 'إلزام الموردين السحابيين للجهات الحكومية السعودية بضوابط الحوسبة السحابية (CCC) عند نقل أو مشاركة إدارة الحاويات التقنية.'
        }
      ],
      tables: [
        {
          title: 'مقارنة استراتيجيات التعامل مع المخاطر السيبرانية',
          headers: ['الاستراتيجية', 'الجوهر', 'متى تُستخدم؟'],
          rows: [
            ['التخفيف (Mitigate)', 'تطبيق ضوابط لخفض الاحتمالية أو الأثر', 'المخاطر الحرجة والعالية (Pool 1 & 2)'],
            ['النقل (Transfer)', 'تحويل جزء من الخطر لطرف ثالث أو تأمين', 'المخاطر المالية الكبيرة أو التخصصية'],
            ['التجنب (Avoid)', 'إيقاف النشاط المسبب للخطر', 'حين تفوق المخاطر وتكلفة الحماية منفعة النشاط'],
            ['القبول (Accept)', 'إقرار الخطر ضمن الضوابط القائمة', 'المخاطر المنخفضة دون حد التحمل (Pool 4)']
          ]
        }
      ],
      commonMistake: {
        mistake: 'الاعتقاد بأن نقل استضافة النظام إلى طرف ثالث ينقل المساءلة القانونية والسمعة بالكامل عن المنظمة مالكة الأصل.',
        fix: 'تضمين متطلبات أمن الأصل في العقود ومراقبة امتثال المزود لأن المساءلة النهائية تبقى على مالك الأصل.'
      },
      solvedExamples: [
        {
          title: 'اختيار نهج المعالجة لخطرين مختلفين في ورقة عمل المخاطر',
          given: 'الخطر أ: درجة 37 واحتمالية مرتفعة (تزوير إجراءات طبية). الخطر ب: درجة 15 واحتمالية منخفضة (إرسال كشف ورقي لعنوان خطأ).',
          steps: [
            'الخطر أ يقع في المجموعة 1 (درجة 30–45 واحتمالية مرتفعة) → القرار: تخفيف فوري بتفعيل تدقيق المعاملات وفصل المهام.',
            'الخطر ب يقع في المجموعة 4 (درجة 0–15 واحتمالية منخفضة) → القرار: قبول أو تأجيل مع التحقق الدوري من العناوين.'
          ],
          result: 'توجيه الموارد المالية نحو الخطر أ الحرج بدلاً من استنزافها في الخطر ب المنخفض.',
          whyItMatters: 'يجسد الكفاءة والفعالية في تخصيص ميزانية الأمن السيبراني.'
        }
      ],
      selfAssessment: [
        {
          question: 'علّل: يجب أن تتناسب تكلفة المعالجة مع قيمة الأصل المحمي.',
          answer: 'لأن الهدف من إدارة المخاطر حماية قيمة الأعمال بكفاءة اقتصادية، فلا معنى لإنفاق تكلفة حماية تفوق قيمة الأصل نفسه أو الخسارة المتوقعة منه.'
        }
      ],
      quiz: [
      {
        question: 'قررت شركة الاستغناء نهائياً عن ميزة الدخول عن بُعد لنظام أرشيف سري للغاية لأن مخاطر اختراقها تفوق الفائدة المرجوة منها. ما الاستراتيجية التي طبقتها الشركة؟',
        options: [
          'قبول المخاطر (Risk Acceptance)',
          'نقل المخاطر (Risk Transfer)',
          'تجنب المخاطر (Risk Avoidance)',
          'تأجيل المخاطر (Risk Deferral)'
        ],
        correctIndex: 2,
        explanation: 'إلغاء النشاط أو الميزة المسببة للخطر من جذورها للتخلص من احتمال وقوع الخطر يمثل استراتيجية «تجنب المخاطر» (Risk Avoidance).'
      },
      {
        question: 'عند تفعيل ميزة «سجلات تدقيق المعاملات» (Transaction Audit Logs) لكشف أي موظف يدخل تعديلاً غير مصرح به على الفواتير، فما نوع هذا الضابط الأمني؟',
        options: [
          'ضابط كشفي (Detective Control) يُطبق على الحاوية التقنية لرصد أفعال الحاوية البشرية',
          'ضابط مادي بيئي فقط',
          'استراتيجية تجنب للمخاطر',
          'قبول للمخاطر دون إجراء'
        ],
        correctIndex: 0,
        explanation: 'سجلات التدقيق (Audit Logs) تكشف التعديلات بعد أو أثناء وقوعها وتحدد هوية الفاعل، فهي ضابط كشفي (Detective Control).'
      },
      {
        question: 'خادم تبلغ قيمته الكلية مع البيانات التي يحويها 10,000 ريال فقط، واقترح أحد المهندسين شراء منظومة حماية متخصصة لهذا الخادم وحده بتكلفة 50,000 ريال سنوياً. ما الحكم العلمي الصحيح؟',
        options: [
          'الاقتراح سليم لأن الأمن لا يقدر بثمن',
          'الاقتراح يخالف مبدأ تناسب تكلفة المعالجة مع قيمة الأصل المحمي ويفقر الكفاءة الاقتصادية',
          'يجب مضاعفة المبلغ إلى 100,000 ريال',
          'الخادم لا يحتاج لأي كلمة مرور'
        ],
        correctIndex: 1,
        explanation: 'من القواعد الأساسية في معالجة المخاطر أن تكلفة الضابط الأمني يجب أن تتناسب اقتصادياً مع قيمة الأصل المحمي ومقدار الخسارة المتوقعة.'
      },
      {
        question: 'إذا وقع خطر في المجموعة 2 (درجة 23 واحتمالية متوسطة)، ولكنه يتضمن أثراً مرتفعاً (3) في مجال الغرامات القانونية يتجاوز حد التحمل الصارم للمؤسسة، فما القرار الأرجح بين خياري المجموعة 2 (التخفيف أو التأجيل)؟',
        options: [
          'اختيار التخفيف (Mitigate) لأن تجاوز حد التحمل في الغرامات يمنع التأجيل أو القبول',
          'تأجيل الخطر إلى أجل غير مسمى',
          'حذف الخطر من سجل المخاطر',
          'تحويله إلى المجموعة 4 تلقائياً'
        ],
        correctIndex: 0,
        explanation: 'دليل المجموعات إرشادي ويُقرأ مع تفاصيل المجالات؛ فبما أن الخطر يسبب أثراً مرتفعاً في الغرامات يتجاوز حد التحمل، يتعين اختيار التخفيف لا التأجيل.'
      }
    ],
      flashcards: [
      {
        front: 'قارن بين استراتيجيات التخفيف والنقل والتجنب والقبول.',
        back: 'التخفيف يقلل الاحتمالية أو الأثر بضوابط أمنية؛ النقل يحول عبء الخطر لطرف ثالث؛ التجنب يوقف النشاط المسبب للخطر كلياً؛ القبول يقر العواقب المحتملة دون ضوابط إضافية.',
        category: 'استراتيجيات المعالجة'
      },
      {
        front: 'ما الفرق بين الضابط الوقائي والضابط الكشفي والضابط التعويضي؟',
        back: 'الوقائي يمنع استغلال الثغرة ابتداءً (كالتشفير)، والكشفي يرصد الحدث عند وقوعه (كتدقيق السجلات)، والتعويضي يوفر بديلاً أمنياً عند تعذر تطبيق الضابط الأصلي.',
        category: 'الضوابط الأمنية'
      },
      {
        front: 'لماذا تجمع معظم خطط المعالجة بين أكثر من استراتيجية واحدة؟',
        back: 'لأن استراتيجية واحدة نادراً ما تكفي وحدها؛ فالمنظمة قد تخفف الخطر بضوابط تقنية، ثم تنقل الجزء المالي المتبقي بالتأمين، وتقبل الهامش الضئيل المتبقي.',
        category: 'تخطيط المعالجة'
      },
      {
        front: 'ما الخطر الذي ينشأ عند إسناد إدارة حاويات الأصل لمزود خدمة خارجي لا يعرف متطلبات أمن الأصل؟',
        back: 'ينشأ خطر تطبيق المزود لممارسات تشغيلية لا تلبي سرية أو تكامل أو توافر الأصل، مما يعرض الأصل للاختراق مع بقاء المساءلة القانونية على المنظمة المالكة.',
        category: 'مخاطر الطرف الثالث'
      },
      {
        front: 'متى يكون قرار «قبول المخاطر» (Risk Acceptance) قراراً غير مقبول منهجياً؟',
        back: 'عندما يتجاوز أثر الخطر حد التحمل المعتمد في المنظمة (مثل قبول خطر يؤدي لغرامة تتجاوز الحد الفاصل الأعلى أو يهدد سلامة المرضى).',
        category: 'حدود التحمل'
      },
      {
        front: 'ما الفرق بين الكفاءة (Efficiency) والفعالية (Effectiveness) في اختيار الضوابط الأمنية؟',
        back: 'الفعالية هي قدرة الضابط على تحقيق هدف الحماية وخفض الخطر، أما الكفاءة فهي تحقيق ذلك الهدف بأقل تكلفة وموارد ممكنة تتناسب مع قيمة الأصل.',
        category: 'اقتصاديات الأمن'
      }
    ]
    },
    updated_at: NOW_TIMESTAMP
  },

  // =========================================================================
  // الفصل السابع: أدوات وتقنيات تقييم المخاطر السيبرانية ونموذج FAIR الكمي
  // =========================================================================
  {
    id: 207,
    chapter_number: 7,
    title: 'أدوات وتقنيات تقييم المخاطر السيبرانية ونموذج FAIR الكمي',
    subtitle: 'الأصناف الأربعة لأدوات التوثيق (الورقي، الجداول، قواعد البيانات، منصات GRC)، الحقول التسعة، وأنطولوجيا FAIR',
    description: 'دراسة شاملة لأدوات وبرامج تحليل المخاطر السيبرانية (النموذج الورقي، الجداول الإلكترونية، قواعد بيانات المخاطر، ومنصات الحوكمة والمخاطر والامتثال GRC)، وتشريح الحقول التسعة لورقة عمل المخاطر وضبط جودة البيانات، مع دراسة تفصيلية لنموذج التحليل الكمي للمخاطر المعلوماتية (FAIR — Factor Analysis of Information Risk) ومحاكاة مونت كارلو.',
    category: 'أدوات ونموذج FAIR',
    difficulty: 'intermediate',
    pdfStartPage: 74,
    pdfEndPage: 85,
    diagramKey: 'ise232-risk-7',
    videoUrl: 'https://www.youtube.com/watch?v=8kVXKyGOYsY',
    videoDuration: '22:40',
    presentationUrl: '/presentations/ise232-risk-ch7.pdf',
    keyTopics: [
      'الأصناف الأربعة لأدوات حفظ وتحليل المخاطر: النموذج الورقي، الجداول الإلكترونية، قواعد البيانات، ومنصات GRC',
      'التشريح الدقيق للحقول التسعة في ورقة عمل مخاطر الأصل المعلوماتي (Worksheet 10)',
      'معرف المخاطر (Risk ID)، مالك المخاطر (Risk Owner)، وتاريخ إعادة التقييم لحالات التأجيل',
      'التحقق من صحة البيانات (Data Validation) مقابل جودة البيانات (Data Quality) وحدود الأتمتة',
      'نموذج FAIR الكمي (Factor Analysis of Information Risk): تكرار حدث الخسارة (LEF) وحجم الخسارة (LM)',
      'تفكيك LEF إلى (TEF × Vulnerability) وتفكيك LM إلى خسائر أولية وثانوية ومحاكاة مونت كارلو',
    ],
    images: [
      {
        prompt: 'Comparison of 4 risk analysis tools: paper worksheet, spreadsheet, relational database, enterprise GRC platform, 16:9',
        caption: 'تطور أدوات تحليل المخاطر من أوراق العمل والجداول الإلكترونية إلى قواعد البيانات ومنصات الحوكمة (GRC)',
        alt: 'Risk analysis tools and GRC platforms',
        seed: 2071,
        isAIGenerated: true,
      },
      {
        prompt: 'FAIR quantitative risk model ontology tree showing Loss Event Frequency LEF Threat Event Frequency TEF Vulnerability and Loss Magnitude LM, 16:9',
        caption: 'شجرة أنطولوجيا نموذج FAIR الكمي: تفكيك الخطر إلى تكرار حدث الخسارة (LEF) وحجم الخسارة (LM)',
        alt: 'FAIR risk model ontology tree',
        seed: 2072,
        isAIGenerated: true,
      },
    ],
    content: `## 7.1 الأصناف الأربعة لأدوات حفظ وإدارة مخرجات تحليل المخاطر

تُنتج عملية تقييم المخاطر كمّاً كبيراً من البيانات المترابطة (معايير القياس، ملفات الأصول، خرائط الحاويات، وسيناريوهات المخاطر). وتُصنف الأدوات المستخدمة لتوثيق هذه المخرجات وتحليلها إلى **أربعة أصناف متدرجة**:

| الصنف | البنية التقنية | حالات الاستخدام المثلى | المزايا والقيود التشغيلية |
| :--- | :--- | :--- | :--- |
| **1. النموذج الورقي أو النصي**<br>*(Paper / Word Forms)* | أوراق عمل منفصلة لكل أصل ولكل سيناريو | تقييم أصل واحد في ورشة عمل أولية أو تدريبية | سهل البدء، لكنه يفتقر للفرز الآلي والربط بين الأصول |
| **2. الجدول الإلكتروني**<br>*(Spreadsheets — Excel)* | مصنف يضم علامات تبويب ومعادلات ضرب وجمع تلقائية | المنظمات الصغيرة والمتوسطة (تقييم 1 إلى 3 أصول) | يحسب الدرجات النسبية آلياً، لكن يصعب فيه تتبع التعديلات الجماعية |
| **3. قاعدة بيانات المخاطر**<br>*(Risk Database)* | جداول علائقية تجمع سجلات المخاطر من عدة أصول في بنية موحدة | المنظمات المتوسطة والكبيرة التي تقيم أصولاً متعددة | يتيح ترتيب جميع مخاطر المؤسسة معاً حسب الدرجة والبحث والفلترة |
| **4. منصة الحوكمة والمخاطر والامتثال**<br>*(GRC Platform)* | منظومة مؤسسية متكاملة تربط المخاطر بالأصول والضوابط والامتثال (مثل NCA ECC) | المؤسسات الكبرى والجهات الحكومية والبنوك | لوحات مؤشرات لحظية، مسارات اعتماد، تنبيهات بتواريخ إعادة التقييم |

---

## 7.2 التشريح الكامل للحقول التسعة في ورقة عمل المخاطر (Worksheet 10)

تشكل **ورقة عمل المخاطر** النواة الهيكلية لأي جدول إلكتروني أو قاعدة بيانات مخاطر، وتتكون من **تسعة حقول قياسية**:

1. **الفاعل (Actor)**: من يسبب التهديد؟
2. **الوسيلة (Means)**: بأي أداة أو مسار يصل للحاوية؟
3. **الدافع (Motive)**: متعمد أم عرضي؟
4. **النتيجة (Outcome)**: إفشاء، تعديل، فقدان/تدمير، أو انقطاع.
5. **متطلبات الأمن (Security Requirements)**: المتطلب الأمني المنتهك للأصل.
6. **الاحتمالية (Probability)**: مرتفعة، متوسطة، أو منخفضة.
7. **العواقب (Consequences)**: الوصف التفصيلي للأثر الواقع على المنظمة.
8. **الشدة ودرجة الخطر النسبية (Severity & Relative Risk Score)**: جدول ضرب قيمة الأثر في رتبة كل مجال وجمعها.
9. **معالجة المخاطر (Risk Mitigation)**: المجموعة (Pool)، الاستراتيجية المختارة، والضوابط المقترحة على كل حاوية.

### حقول الضبط المؤسسي الإضافية في السجل الإلكتروني
- **معرّف المخاطر (Risk ID)**: رمز فريد لكل سجل خطر (مثل **RISK-PBCD-001**) يمنع التداخل عند دمج أوراق العمل في قاعدة بيانات موحدة.
- **مالك المخاطر (Risk Owner)**: المسؤول المسمى وظيفياً عن متابعة تنفيذ خطة المعالجة ومراقبة الخطر المتبقي.
- **تاريخ إعادة التقييم (Re-evaluation Date)**: حقل إلزامي يرتبط بحالة المعالجة **«تأجيل» (Defer)** لضمان عدم نسيان الخطر المؤجل في السجل.

---

## 7.3 نموذج التحليل الكمي للمخاطر المعلوماتية (FAIR Model)

يُعدّ نموذج **FAIR** (*Factor Analysis of Information Risk*)، المعتمد كمعيار دولي من **The Open Group**، الإطار القياسي الأبرز للتحليل الكمي المالي للمخاطر السيبرانية، ويكمّل منهجية OCTAVE Allegro عبر تفكيك الخطر إلى شجرة عوامل قابلة للقياس الإحصائي:

$$\text{Risk (FAIR)} = \text{Loss Event Frequency (LEF)} \times \text{Loss Magnitude (LM)}$$

### 1. الفرع الأيسر: تكرار حدث الخسارة ($\text{LEF}$ — Loss Event Frequency)
يمثل عدد المرات المتوقع أن ينجح فيها التهديد في إيقاع خسارة فعلية خلال إطار زمني (سنة عادةً)، وينقسم إلى:
$$\text{LEF} = \text{Threat Event Frequency (TEF)} \times \text{Vulnerability (Vuln)}$$
- **تكرار حدث التهديد ($\text{TEF}$)**: كم مرة يحاول الفاعل استهداف الأصل؟ ويتفرع إلى: **تكرار التماس (Contact Frequency)** $\times$ **احتمالية الفعل (Probability of Action)**.
- **القابلية للاختراق ($\text{Vuln}$)**: احتمال نجاح التهديد عندما يقع، وتتحدد بالمقارنة بين **قدرة التهديد ($\text{TCap}$ — Threat Capability)** و**قوة المقاومة/الضابط ($\text{RS}$ — Resistance Strength)**:
  $$\text{Vuln} = P(\text{TCap} > \text{RS})$$

### 2. الفرع الأيمن: حجم الخسارة ($\text{LM}$ — Loss Magnitude)
يمثل التكلفة المالية الإجمالية الناتجة عن حدث الخسارة، وينقسم إلى:
$$\text{LM} = \text{Primary Loss} + \text{Secondary Loss}$$
- **الخسارة الأولية (Primary Loss)**: الخسائر المباشرة الفورية (تعطل الإنتاجية، تكلفة الاستجابة والاستعادة، تكلفة استبدال الأصول).
- **الخسارة الثانوية (Secondary Loss)**: الخسائر اللاحقة الناتجة عن رد فعل الأطراف الخارجية (غرامات الجهات التنظيمية، الدعاوى القضائية، تراجع الحصة السوقية والسمعة)، وتساوي:
  $$\text{Secondary Loss} = \text{Secondary Loss Event Frequency (SLEF)} \times \text{Secondary Loss Magnitude (SLM)}$$

### 3. محاكاة مونت كارلو (Monte Carlo Simulation) في نموذج FAIR
بدلاً من إعطاء رقم واحد مضلل، يُدخل المحلل في أدوات FAIR نطاقاً احتمالياً (حد أدنى، أكثر احتمالاً، حد أقصى — توزيع PERT) لكل عامل، وتجري الأداة آلاف المحاكاات العشوائية لإنتاج منحنى توزيع الخسارة السنوية (مثل: $90\%$ ثقة بأن الخسارة السنوية ستتراوح بين $150,000\text{ SAR}$ و $850,000\text{ SAR}$).

---

## 7.4 التحقق من صحة البيانات مقابل جودة البيانات وحدود الأتمتة

- **التحقق من صحة البيانات (Data Validation)**: فحص آلي تطبقه الأداة للتأكد من أن المدخل يطابق الصيغة المسموحة (مثل قبول أرقام فقط من 1 إلى 3 في حقل الشدة، وعدم ترك حقل إلزامي فارغاً).
- **جودة البيانات (Data Quality)**: دقة المعنى وواقعية التقدير ومطابقته لبيئة المنظمة (مثل صحة مسوغ أن أثر السمعة مرتفع).
- **حدود الأتمتة (Automation Limits)**: تستطيع البرمجيات أتمتة الحسابات والفرز والتحقق الشكلي، لكن **تفسير السياق وتقدير العواقب وقرار المعالجة تتطلب إشرافاً وحكماً بشرياً خبيراً لا يمكن أتمتته**.`,
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'الأصناف الأربعة لأدوات تحليل وتوثيق المخاطر',
        subtitle: 'متى نكتفي بورقة عمل، ومتى ننتقل إلى قاعدة بيانات أو منصة GRC؟',
        bullets: [
          'النموذج الورقي: مناسب لتقييم أصل واحد أو للتدريب الأولي، لكنه صعب الفرز والمقارنة.',
          'الجدول الإلكتروني (Excel): يحسب معادلات الضرب والجمع آلياً ويناسب عدداً محدوداً من الأصول.',
          'قاعدة بيانات المخاطر: تدمج أوراق العمل المتكررة لعدة أصول في سجل موحد قابل للترتيب الشامل.',
          'منصة الحوكمة والمخاطر والامتثال (GRC): تربط المخاطر بالضوابط الرقابية ومؤشرات الأداء اللحظية.'
        ],
        keyHighlight: 'تتكون قاعدة بيانات المخاطر من تكرار بنية ورقة العمل القياسية نفسها لكل أصل، مما يتيح ترتيب جميع مخاطر المؤسسة معاً.',
        diagramTitle: 'هرم تطور أدوات إدارة وتحليل المخاطر المؤسسية'
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'تشريح الحقول التسعة لورقة عمل مخاطر الأصل (Worksheet 10)',
        subtitle: 'البنية المعيارية لسجل المخاطر وحقول الضبط الإضافية',
        bullets: [
          'الحقول (1–5): الفاعل، الوسيلة، الدافع، النتيجة، ومتطلبات الأمن المنتهكة.',
          'الحقول (6–9): الاحتمالية، العواقب، الشدة (الدرجة النسبية)، ومعالجة المخاطر.',
          'حقول الضبط المؤسسي: معرف المخاطر الفريد (Risk ID) ومالك المخاطر (Risk Owner).',
          'حقل تاريخ إعادة التقييم: إلزامي عند اختيار حالة «تأجيل» (Defer) لمنع إهمال المخاطر المؤجلة.'
        ],
        keyHighlight: 'حقل «أخرى» ومجال «يحدده المستخدم» يمنحان الأداة المرونة لاستيعاب الحالات الخاصة دون كسر البنية القياسية.',
        diagramTitle: 'مخطط الحقول التسعة وحقول التتبع في قاعدة بيانات المخاطر'
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'نموذج التحليل الكمي FAIR: أنطولوجيا تفكيك الخطر',
        subtitle: 'Factor Analysis of Information Risk — المعيار الكمي الدولي',
        bullets: [
          'يقسم نموذج FAIR الخطر إلى جناحين رئيسيين: تكرار حدث الخسارة (LEF) وحجم الخسارة (LM).',
          'يتكون LEF من حاصل ضرب تكرار حدث التهديد (TEF) في القابلية للاختراق (Vulnerability).',
          'تتحدد القابلية للاختراق بالموازنة بين قدرة المهاجم (Threat Capability) وقوة المقاومة والضوابط (Resistance Strength).',
          'يتكون حجم الخسارة (LM) من مجموع الخسارة الأولية المباشرة والخسارة الثانوية (الغرامات والسمعة).'
        ],
        keyHighlight: 'يعالج نموذج FAIR ضعف التقديرات الجزافية عبر تفكيك السؤال الصعب إلى عوامل أولية يسهل قياسها ببيانات حقيقية.',
        diagramTitle: 'الشجرة الهرمية لأنطولوجيا نموذج FAIR الكمي'
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'محاكاة مونت كارلو (Monte Carlo) في أدوات FAIR',
        subtitle: 'التعبير عن عدم اليقين بنطاقات احتمالية وتوزيعات مالية',
        bullets: [
          'بدلاً من إدخال رقم واحد جامد، يُدخل المحلل الحد الأدنى والأكثر احتمالاً والحد الأقصى (توزيع PERT).',
          'تنفذ الأداة آلاف الدورات الحسابية العشوائية (Monte Carlo Runs) لمحاكاة جميع السيناريوهات الممكنة.',
          'تنتج المحاكاة منحنى تجاوز الخسارة (Loss Exceedance Curve) لتوضيح احتمالات الخسائر المالية بالريال.',
          'تمكّن الإدارة العليا من مقارنة تكلفة الضابط الأمني بمقدار خفض منحنى الخسارة السنوية بدقة إحصائية.'
        ],
        keyHighlight: 'محاكاة مونت كارلو تحول عدم اليقين في الأمن السيبراني إلى فترات ثقة إحصائية يفهمها صناع القرار المالي.',
        diagramTitle: 'منحنى توزيع الخسارة السنوية الناتج عن محاكاة مونت كارلو في FAIR'
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'صحة البيانات مقابل جودة البيانات وحدود الأتمتة',
        subtitle: 'لماذا لا تغني أتمتة البرمجيات عن الحكم البشري الخبير؟',
        bullets: [
          'التحقق من صحة البيانات (Data Validation): قيد برمجي يمنع إدخال قيم خارج النطاق (كإدخال 9 في مقياس 1–3).',
          'جودة البيانات (Data Quality): صدق المحتوى ودقة تمثيله للواقع التشغيلي للمنظمة.',
          'قد تقبل الأداة البرمجية مدخلاً صحيحاً شكلياً (Validation Pass) لكنه خاطئ علمياً وواقعياً (Low Quality)!',
          'الإشراف البشري ضروري لتفسير السياق، وتقدير العواقب غير الملموسة، واتخاذ قرار المعالجة النهائي.'
        ],
        keyHighlight: 'الأداة البرمجية تضرب الأرقام وتفرز الجداول بدقة، لكنها لا تعرف قيمة سمعة المؤسسة ولا سياق عملياتها بدون خبير بشري.',
        diagramTitle: 'الفرق بين التحقق الشكلي (Validation) وجودة المضمون (Quality)'
      }
    ],
    flashcards: [
      {
        front: 'ما هي الحقول التسعة في ورقة عمل مخاطر الأصل المعلوماتي (Worksheet 10)؟',
        back: '1) الفاعل، 2) الوسيلة، 3) الدافع، 4) النتيجة، 5) متطلبات الأمن، 6) الاحتمالية، 7) العواقب، 8) الشدة، 9) معالجة المخاطر.',
        category: 'أوراق العمل'
      },
      {
        front: 'مم يتكون الخطر في نموذج FAIR الكمي؟',
        back: 'يتكون من حاصل تفاعل عاملين رئيسيين: تكرار حدث الخسارة (LEF — Loss Event Frequency) وحجم الخسارة (LM — Loss Magnitude).',
        category: 'نموذج FAIR'
      },
      {
        front: 'كيف تُحسب القابلية للاختراق (Vulnerability) في نموذج FAIR؟',
        back: 'تُحسب باحتمال تفوق قدرة التهديد/المهاجم (Threat Capability - TCap) على قوة المقاومة/الضوابط الأمنية (Resistance Strength - RS).',
        category: 'نموذج FAIR'
      },
      {
        front: 'ما الفرق بين الخسارة الأولية (Primary Loss) والخسارة الثانوية (Secondary Loss) في FAIR؟',
        back: 'الخسارة الأولية هي التكلفة المباشرة للحادث (توقف العمل وتكلفة الاستجابة)، أما الثانوية فهي تبعات ردود فعل الأطراف الخارجية (كالغرامات التنظيمية والدعاوى وفقدان العملاء).',
        category: 'نموذج FAIR'
      },
      {
        front: 'ما الفرق بين التحقق من صحة البيانات (Data Validation) وجودة البيانات (Data Quality) في سجل المخاطر؟',
        back: 'التحقق من الصحة يفحص التزام المدخل بالقواعد الشكلية (نوع الحقل ونطاق الأرقام)، بينما تعني جودة البيانات دقة المعلومة وواقعيتها وملاءمتها لسياق المؤسسة.',
        category: 'جودة البيانات'
      },
      {
        front: 'لماذا يرتبط حقل «تاريخ إعادة التقييم» ارتباطاً وثيقاً بحالة المعالجة «تأجيل» (Defer)؟',
        back: 'لأن الخطر المؤجل لم يُعالج بعد ولم يُقبل نهائياً؛ فبدون تاريخ إلزامي لإعادة التقييم قد يُنسى الخطر في السجل رغم تغير الظروف وارتفاع خطورته.',
        category: 'سجل المخاطر'
      }
    ],
    miniQuiz: [
      {
        question: 'وفق نموذج FAIR الكمي، إذا كان تكرار حدث التهديد (TEF) يساوي 20 محاولة هجوم سنوياً، وكانت القابلية للاختراق (Vulnerability) تساوي 10% (لأن قوة الضوابط تصد 90% من المحاولات)، فكم يبلغ تكرار حدث الخسارة (LEF)؟',
        options: [
          'حدثا خسارة في السنة (LEF = 20 × 0.10 = 2)',
          '200 حدث خسارة في السنة',
          '20 حدث خسارة في السنة',
          'صفر حدث خسارة'
        ],
        correctIndex: 0,
        explanation: 'في نموذج FAIR، يُحسب تكرار حدث الخسارة بالمعادلة LEF = TEF × Vulnerability = 20 × 0.10 = 2 حدث خسارة سنوياً.'
      },
      {
        question: 'ما السبب المنهجي لتكوّن «قاعدة بيانات المخاطر» من تكرار أوراق عمل المخاطر القياسية؟',
        options: [
          'لأن مجموعة أوراق العمل الواحدة تخص أصلاً معلوماتياً واحداً، فتتكرر البنية نفسها لكل أصل وتتجمع سجلاتها المتطابقة في قاعدة بيانات واحدة تتيح فرز وترتيب جميع مخاطر المنظمة معاً',
          'بسبب خطأ برمجي في الجداول الإلكترونية',
          'لأن قاعدة البيانات لا تقبل أكثر من أصل واحد',
          'لمنع المقارنة بين مخاطر الأصول المختلفة'
        ],
        correctIndex: 0,
        explanation: 'تُملأ أوراق العمل لكل أصل حرج على حدة، وبما أن بنيتها التساعية متطابقة، فإن تجميعها في قاعدة بيانات واحدة يسمح بترتيب جميع مخاطر المؤسسة ومقارنتها معاً.'
      },
      {
        question: 'قام موظف بإدخال الرقم (3) في حقل شدة أثر السلامة والصحة (وهو رقم مسموح به برمجياً في القائمة المنسدلة 1–3)، رغم أن الحادث مجرد تأخر بريد إلكتروني داخلي لا يمس صحة أحد. كيف يُوصف هذا المدخل؟',
        options: [
          'اجتاز التحقق من صحة البيانات (Data Validation) لكنه يفتقر إلى جودة البيانات (Data Quality)',
          'فشل في التحقق من صحة البيانات البرمجية',
          'يمثل أعلى درجات جودة البيانات',
          'خطأ في نظام التشغيل'
        ],
        correctIndex: 0,
        explanation: 'الرقم 3 يقع ضمن النطاق المسموح برمجياً (1 إلى 3) فاجتاز Data Validation، لكنه غير واقعي ولا يطابق معايير المؤسسة ففشل في Data Quality.'
      },
      {
        question: 'أي من الأصناف الأربعة لأدوات تحليل المخاطر يوفر بيئة موحدة تربط سجل المخاطر بالضوابط الرقابية (مثل NCA ECC) وتولد تنبيهات آلية لمواعيد المراجعة ولوحات مؤشرات للإدارة العليا؟',
        options: [
          'النموذج الورقي المطبوع',
          'منصة الحوكمة وإدارة المخاطر والامتثال (GRC Platform)',
          'المفكرة النصية البسيطة',
          'الحاسبة اليدوية'
        ],
        correctIndex: 1,
        explanation: 'منصات الحوكمة وإدارة المخاطر والامتثال (GRC Platforms) توفر البيئة المؤسسية الموحدة للربط بين الأصول والمخاطر والضوابط والامتثال.'
      }
    ],
    interactiveBook3D: {
      model3DType: 'fair_ontology_monte_carlo_tree',
      shaderEffect: 'probabilistic_wave_cyan',
      ambientColor: '#071929',
      accentColor: '#06b6d4',
      autoRotateSpeed: 1.25,
      pages3D: [
        {
          pageNumber: 1,
          spreadSide: 'right',
          title: 'شجرة أنطولوجيا FAIR ومحاكاة مونت كارلو ثلاثية الأبعاد',
          subtitle: 'تفكيك الخطر إلى LEF (TEF × Vuln) و LM (خسارة أولية + ثانوية)',
          summaryMarkdown: 'يعرض المجسم ثلاثي الأبعاد **شجرة نموذج FAIR الكمي** المتفرعة إلى جناح الاحتمال والتكرار (**LEF**) وجناح حجم الخسارة المالية (**LM**)، مع تمثيل موجي لتوزيع مونت كارلو الاحتمالي.',
          interactiveFormula: 'FAIR_Risk = LEF (TEF × P(TCap > RS)) × LM (Primary_Loss + Secondary_Loss)',
          labParameterName: 'قوة المقاومة والضوابط (RS) أمام قدرة التهديد (TCap)',
          labMin: 1,
          labMax: 5,
          labDefault: 3,
          labUnit: 'مستوى مقاومة',
          labInterpretation: {
            1: 'مقاومة ضعيفة جداً (RS << TCap): القابلية للاختراق تقترب من 90%، مما يرفع LEF لأقصى حد.',
            2: 'مقاومة دون المتوسط: القابلية للاختراق نحو 60%، تكرار خسائر سنوي مرتفع.',
            3: 'مقاومة متكافئة (RS ≈ TCap): القابلية للاختراق نحو 30%، خطر متوسط يتطلب تعزيز الضوابط.',
            4: 'مقاومة قوية (RS > TCap): القابلية للاختراق تنخفض إلى 10%، انحسار كبير في منحنى مونت كارلو.',
            5: 'مقاومة حصينة (RS >> TCap): القابلية للاختراق < 2%، ندرة شديدة في وقوع أحداث الخسارة.'
          },
          challengeQuestion: {
            question: 'في نموذج FAIR، إذا رفعت المؤسسة قوة ضوابطها الأمنية (Resistance Strength - RS) مع ثبات قدرة المهاجمين (TCap)، فأي متغير ينخفض مباشرةً؟',
            options: [
              'تنخفض القابلية للاختراق (Vulnerability) فينخفض معها تكرار حدث الخسارة (LEF)',
              'ترتفع قيمة الغرامات التنظيمية',
              'يزداد عدد محاولات التماس من المهاجمين بالضرورة',
              'لا يتأثر أي متغير في شجرة FAIR'
            ],
            correctIndex: 0,
            feedbackCorrect: 'إجابة صحيحة! رفع قوة المقاومة (RS) يقلل احتمال تفوق المهاجم P(TCap > RS)، فتنخفض القابلية للاختراق (Vuln) وينخفض LEF.',
            feedbackWrong: 'تذكر أن Vulnerability = P(TCap > RS)؛ فكلما زادت RS انخفضت Vulnerability وبالتالي انخفض LEF.'
          },
          aiTutorGuardrailTopics: ['نموذج FAIR', 'LEF', 'TEF', 'TCap', 'RS', 'LM', 'محاكاة مونت كارلو', 'منصات GRC', 'ورقة العمل 10']
        },
        {
          pageNumber: 2,
          spreadSide: 'left',
          title: 'مختبر جودة سجل المخاطر: التحقق البرمجي مقابل الحكم البشري',
          subtitle: 'تشريح الحقول التسعة في ورقة العمل 10 وحوكمة التأجيل',
          summaryMarkdown: 'تستعرض الصفحة اليسرى الفرق العملي بين **التحقق الآلي من صحة البيانات ($\text{Data Validation}$)** و**جودة البيانات التحليلية ($\text{Data Quality}$)** داخل قواعد بيانات المخاطر ومنصات الحوكمة ($\text{GRC}$).',
          interactiveFormula: 'Register_Integrity = Data_Validation_Rules ∧ Expert_Human_Review',
          labParameterName: 'تكامل الإشراف البشري الخبير مع أتمتة منصة GRC',
          labMin: 1,
          labMax: 5,
          labDefault: 5,
          labUnit: 'مستوى تكامل',
          labInterpretation: {
            1: 'إدخال يدوي حر بلا تحقق آلي ولا مراجعة: أخطاء حسابية وحقول ناقصة.',
            2: 'تحقق شكلي فقط (Validation): الأرقام ضمن النطاق (1–3) لكن الأوصاف والمسوغات سطحية.',
            3: 'حساب آلي للدرجات في Excel مع مراجعة فردية: جيد للأصول القليلة لكن يصعب تتبعه مؤسسياً.',
            4: 'قاعدة بيانات موحدة بمعرفات (Risk IDs) وملاك مخاطر وتواريخ إعادة تقييم مفعلة.',
            5: 'منصة GRC مؤتمتة للحسابات والتنبيهات + إشراف بشري خبير لتفسير السياق واعتماد القرار.'
          },
          challengeQuestion: {
            question: 'لماذا يوجد حقل «أخرى» في أشجار التهديد ومجال «يحدده المستخدم» في معايير قياس الأثر داخل أدوات OCTAVE Allegro؟',
            options: [
              'لمنح الأداة المرونة لاستيعاب التهديدات أو مجالات الأثر الخاصة بطبيعة المنظمة والتي لا تغطيها الفئات القياسية الخمس',
              'لأن المؤلفين نسوا كتابة أسماء الحقول',
              'لتعطيل معادلات الجمع والضرب في الجدول الإلكتروني',
              'لاستخدامها كحقول تجميلية فارغة دائماً'
            ],
            correctIndex: 0,
            feedbackCorrect: 'إجابة سديدة! توفر هذه الحقول مرونة منهجية لتكييف الأداة مع خصوصية كل منظمة دون الإخلال بالهيكل القياسي.',
            feedbackWrong: 'تذكر أن الغرض من حقل «أخرى» ومجال «يحدده المستخدم» هو تكييف المنهجية مع الاحتياجات الخاصة للمنظمة.'
          },
          aiTutorGuardrailTopics: ['ورقة العمل 10', 'Data Validation vs Quality', 'حدود الأتمتة', 'تاريخ إعادة التقييم']
        }
      ],
      stepByStep: [
        {
          stepNumber: 1,
          title: 'الخطوة 1: تقدير تكرار حدث التهديد (TEF = Contact × Action)',
          description: 'حساب عدد المرات التي يحتك فيها الفاعل بالحاوية واحتمال إقدامه على تنفيذ الهجوم.',
          formulaOrRule: 'TEF = Contact_Frequency × Probability_of_Action',
          visualState: 'fair_tef_branch_active',
          cameraFocus: { x: -2.2, y: 1.4, z: 3.0 }
        },
        {
          stepNumber: 2,
          title: 'الخطوة 2: موازنة قدرة التهديد (TCap) بقوة المقاومة (RS)',
          description: 'اشتقاق نسبة القابلية للاختراق (Vulnerability) وضربها في TEF لاستخراج تكرار حدث الخسارة (LEF).',
          formulaOrRule: 'Vuln = P(TCap > RS)  →  LEF = TEF × Vuln',
          visualState: 'fair_vuln_balance_scale',
          cameraFocus: { x: -1.0, y: 0.4, z: 3.0 }
        },
        {
          stepNumber: 3,
          title: 'الخطوة 3: حساب حجم الخسارة الأولية والثانوية (Loss Magnitude - LM)',
          description: 'جمع تكاليف الاستجابة وتوقف الإنتاجية (أولية) مع الغرامات وفقدان الثقة والدعاوى (ثانوية).',
          formulaOrRule: 'LM = Primary_Loss + (SLEF × SLM)',
          visualState: 'fair_lm_branch_active',
          cameraFocus: { x: 1.8, y: 1.0, z: 3.0 }
        },
        {
          stepNumber: 4,
          title: 'الخطوة 4: تشغيل محاكاة مونت كارلو وتوثيق السجل في منصة GRC',
          description: 'دمج توزيعات LEF وLM عبر آلاف الدورات الاحتمالية وتصدير النتائج الموثقة إلى سجل المخاطر المؤسسي.',
          formulaOrRule: 'Annual_Loss_Distribution = MonteCarlo(LEF_PERT × LM_PERT)',
          visualState: 'monte_carlo_curve_rendered',
          cameraFocus: { x: 0.0, y: -1.6, z: 3.5 }
        }
      ],
      hotspots: [
        {
          id: 'hs-ch7-lef',
          label: 'جناح تكرار حدث الخسارة (LEF)',
          x: -1.9,
          y: 1.1,
          z: 0.5,
          coordinates: { x: -1.9, y: 1.1, z: 0.5 },
          title: 'تكرار حدث الخسارة (Loss Event Frequency = TEF × Vuln)',
          detailedExplanation: 'يمثل الجناح الاحتمالي في شجرة FAIR، ويقيس عدد المرات المتوقع أن ينجح فيها التهديد في اختراق دفاعات الحاوية خلال العام.',
          technicalMetric: 'LEF = TEF × P(TCap > RS)',
          securityImpact: 'حرج جداً',
          relatedControl: 'The Open Group O-RA / FAIR Standard — LEF Taxonomy'
        },
        {
          id: 'hs-ch7-lm',
          label: 'جناح حجم الخسارة (Loss Magnitude)',
          x: 1.9,
          y: 1.1,
          z: 0.5,
          coordinates: { x: 1.9, y: 1.1, z: 0.5 },
          title: 'حجم الخسارة الكلي (Primary + Secondary Loss Magnitude)',
          detailedExplanation: 'يمثل الجناح المالي في شجرة FAIR، ويجمع الخسائر التشغيلية المباشرة مع الخسائر الثانوية التنظيمية والسمعة.',
          technicalMetric: 'LM = Primary + Secondary (Fines, Reputation, Legal)',
          securityImpact: 'حرج جداً',
          relatedControl: 'FAIR Risk Model — Six Forms of Loss (Productivity, Response, Replacement, Fines, Competitive, Reputation)'
        },
        {
          id: 'hs-ch7-ws10',
          label: 'نواة الحقول التسعة (Worksheet 10)',
          x: -1.6,
          y: -1.3,
          z: 0.5,
          coordinates: { x: -1.6, y: -1.3, z: 0.5 },
          title: 'البنية التساعية القياسية لورقة عمل المخاطر',
          detailedExplanation: 'تضمن توحيد حقول التوثيق (الفاعل، الوسيلة، الدافع، النتيجة، المتطلب، الاحتمالية، العواقب، الشدة، المعالجة) عبر جميع الأصول.',
          technicalMetric: '9 Core Fields + Risk_ID + Risk_Owner + Re-eval_Date',
          securityImpact: 'مرتفع',
          relatedControl: 'OCTAVE Allegro Worksheet 10 Schema'
        },
        {
          id: 'hs-ch7-grc',
          label: 'محرك منصة الحوكمة (GRC Engine)',
          x: 1.6,
          y: -1.3,
          z: 0.5,
          coordinates: { x: 1.6, y: -1.3, z: 0.5 },
          title: 'منصة الحوكمة وإدارة المخاطر والامتثال وضبط جودة البيانات',
          detailedExplanation: 'توفر التحقق الآلي من صحة البيانات (Data Validation) ولوحات المتابعة اللحظية، مع إبقاء قرار المعالجة وجودة التقدير تحت الإشراف البشري.',
          technicalMetric: 'Data Validation (Automated) + Data Quality (Human Expert)',
          securityImpact: 'مرتفع',
          relatedControl: 'NCA ECC-2:2024 — أتمتة متابعة الامتثال والمخاطر'
        }
      ]
    },
    richData: {
      id: 207,
      chapter_number: 7,
      title: 'أدوات وتقنيات تقييم المخاطر السيبرانية ونموذج FAIR الكمي',
      subtitle: 'الأدوات الأربع، الحقول التسعة، وأنطولوجيا FAIR الكمي',
      category: 'متقدم',
      pdfStartPage: 74,
      pdfEndPage: 85,
      description: 'مقارنة أدوات حفظ وتحليل المخاطر وتشريح ورقة عمل المخاطر وشرح نموذج FAIR الكمي.',
      objectives: [
        'المقارنة بين النموذج الورقي والجدول الإلكتروني وقاعدة البيانات ومنصة الحوكمة GRC.',
        'تعداد الحقول التسعة لورقة عمل المخاطر وبيان دور معرف المخاطر ومالك المخاطر وتاريخ إعادة التقييم.',
        'شرح نموذج FAIR الكمي (LEF, TEF, TCap, RS, LM) ومحاكاة مونت كارلو.',
        'التمييز بين التحقق من صحة البيانات وجودة البيانات وتوضيح حدود الأتمتة.'
      ],
      sections: [
        {
          heading: '1. أدوات تحليل المخاطر والحقول التسعة',
          content: 'تتدرج الأدوات من الورق وExcel إلى قواعد البيانات ومنصات GRC، وتعتمد جميعها على الحقول التسعة لورقة المخاطر.',
          formula: 'Risk Record = (Risk_ID, Asset, 9_Allegro_Fields, Owner, ReEval_Date)',
          saudiExample: 'استخدام منصة حوكمة وطنية (GRC) في الجهات الحكومية السعودية لربط سجل المخاطر بضوابط ECC-2:2024.'
        },
        {
          heading: '2. نموذج FAIR الكمي',
          content: 'يفكك الخطر إلى تكرار حدث الخسارة (LEF = TEF × Vuln) وحجم الخسارة (LM = Primary + Secondary).',
          formula: 'Risk = LEF × LM',
          saudiExample: 'تطبيق محاكاة مونت كارلو بنموذج FAIR لتقدير نطاق الخسائر المالية المحتملة لتعطل منصة دفع إلكتروني بالريال السعودي.'
        }
      ],
      tables: [
        {
          title: 'مقارنة أصناف أدوات تحليل المخاطر الأربعة',
          headers: ['الأداة', 'حجم الأصول المناسب', 'أبرز ميزة'],
          rows: [
            ['النموذج الورقي', 'أصل واحد (ورش عمل أولية)', 'بساطة الاستخدام المباشر'],
            ['الجدول الإلكتروني (Excel)', 'عدد صغير إلى متوسط', 'حساب الدرجات النسبية بالمعادلات تلقائياً'],
            ['قاعدة بيانات المخاطر', 'عدد كبير من الأصول', 'دمج وترتيب مخاطر جميع الأصول معاً'],
            ['منصة الحوكمة (GRC)', 'المؤسسات الكبرى', 'ربط المخاطر بالضوابط والامتثال ولوحات القيادة']
          ]
        }
      ],
      commonMistake: {
        mistake: 'الاعتماد الكامل على الأتمتة البرمجية والظن بأن قبول البرنامج للرقم المدخل يعني أن التقييم عالي الجودة.',
        fix: 'التمييز بين التحقق الشكلي (Data Validation) وجودة المضمون (Data Quality) وإبقاء قرار المعالجة خاضعاً للمراجعة البشرية.'
      },
      solvedExamples: [
        {
          title: 'حساب LEF وتوقع الخسارة في نموذج FAIR',
          given: 'TEF = 50 محاولة سنوياً، احتمال تفوق المهاجم P(TCap > RS) = 4%، متوسط الخسارة الأولية = 100,000 ريال، ومتوسط الخسارة الثانوية = 150,000 ريال.',
          steps: [
            'حساب تكرار حدث الخسارة: LEF = 50 × 0.04 = 2 حدث خسارة سنوياً.',
            'حساب حجم الخسارة للحدث الواحد: LM = 100,000 + 150,000 = 250,000 ريال.',
            'حساب الخطر السنوي المتوقع: Risk = LEF × LM = 2 × 250,000 = 500,000 ريال سنوياً.'
          ],
          result: 'خسارة سنوية متوقعة قدرها 500,000 ريال.',
          whyItMatters: 'يوضح كيف يفصل نموذج FAIR بين تكرار المحاولات ونسبة نجاحها وبين الخسائر الأولية والثانوية.'
        }
      ],
      selfAssessment: [
        {
          question: 'علّل ارتباط حقل تاريخ إعادة التقييم بحالة المعالجة «تأجيل».',
          answer: 'لأن التأجيل إرجاء مؤقت للقرار، فبدون تحديد تاريخ ملزم لإعادة التقييم قد يُهمل الخطر في السجل دون متابعة.'
        }
      ],
      quiz: [
      {
        question: 'وفق نموذج FAIR الكمي، إذا كان تكرار حدث التهديد (TEF) يساوي 20 محاولة هجوم سنوياً، وكانت القابلية للاختراق (Vulnerability) تساوي 10% (لأن قوة الضوابط تصد 90% من المحاولات)، فكم يبلغ تكرار حدث الخسارة (LEF)؟',
        options: [
          'حدثا خسارة في السنة (LEF = 20 × 0.10 = 2)',
          '200 حدث خسارة في السنة',
          '20 حدث خسارة في السنة',
          'صفر حدث خسارة'
        ],
        correctIndex: 0,
        explanation: 'في نموذج FAIR، يُحسب تكرار حدث الخسارة بالمعادلة LEF = TEF × Vulnerability = 20 × 0.10 = 2 حدث خسارة سنوياً.'
      },
      {
        question: 'ما السبب المنهجي لتكوّن «قاعدة بيانات المخاطر» من تكرار أوراق عمل المخاطر القياسية؟',
        options: [
          'لأن مجموعة أوراق العمل الواحدة تخص أصلاً معلوماتياً واحداً، فتتكرر البنية نفسها لكل أصل وتتجمع سجلاتها المتطابقة في قاعدة بيانات واحدة تتيح فرز وترتيب جميع مخاطر المنظمة معاً',
          'بسبب خطأ برمجي في الجداول الإلكترونية',
          'لأن قاعدة البيانات لا تقبل أكثر من أصل واحد',
          'لمنع المقارنة بين مخاطر الأصول المختلفة'
        ],
        correctIndex: 0,
        explanation: 'تُملأ أوراق العمل لكل أصل حرج على حدة، وبما أن بنيتها التساعية متطابقة، فإن تجميعها في قاعدة بيانات واحدة يسمح بترتيب جميع مخاطر المؤسسة ومقارنتها معاً.'
      },
      {
        question: 'قام موظف بإدخال الرقم (3) في حقل شدة أثر السلامة والصحة (وهو رقم مسموح به برمجياً في القائمة المنسدلة 1–3)، رغم أن الحادث مجرد تأخر بريد إلكتروني داخلي لا يمس صحة أحد. كيف يُوصف هذا المدخل؟',
        options: [
          'اجتاز التحقق من صحة البيانات (Data Validation) لكنه يفتقر إلى جودة البيانات (Data Quality)',
          'فشل في التحقق من صحة البيانات البرمجية',
          'يمثل أعلى درجات جودة البيانات',
          'خطأ في نظام التشغيل'
        ],
        correctIndex: 0,
        explanation: 'الرقم 3 يقع ضمن النطاق المسموح برمجياً (1 إلى 3) فاجتاز Data Validation، لكنه غير واقعي ولا يطابق معايير المؤسسة ففشل في Data Quality.'
      },
      {
        question: 'أي من الأصناف الأربعة لأدوات تحليل المخاطر يوفر بيئة موحدة تربط سجل المخاطر بالضوابط الرقابية (مثل NCA ECC) وتولد تنبيهات آلية لمواعيد المراجعة ولوحات مؤشرات للإدارة العليا؟',
        options: [
          'النموذج الورقي المطبوع',
          'منصة الحوكمة وإدارة المخاطر والامتثال (GRC Platform)',
          'المفكرة النصية البسيطة',
          'الحاسبة اليدوية'
        ],
        correctIndex: 1,
        explanation: 'منصات الحوكمة وإدارة المخاطر والامتثال (GRC Platforms) توفر البيئة المؤسسية الموحدة للربط بين الأصول والمخاطر والضوابط والامتثال.'
      }
    ],
      flashcards: [
      {
        front: 'ما هي الحقول التسعة في ورقة عمل مخاطر الأصل المعلوماتي (Worksheet 10)؟',
        back: '1) الفاعل، 2) الوسيلة، 3) الدافع، 4) النتيجة، 5) متطلبات الأمن، 6) الاحتمالية، 7) العواقب، 8) الشدة، 9) معالجة المخاطر.',
        category: 'أوراق العمل'
      },
      {
        front: 'مم يتكون الخطر في نموذج FAIR الكمي؟',
        back: 'يتكون من حاصل تفاعل عاملين رئيسيين: تكرار حدث الخسارة (LEF — Loss Event Frequency) وحجم الخسارة (LM — Loss Magnitude).',
        category: 'نموذج FAIR'
      },
      {
        front: 'كيف تُحسب القابلية للاختراق (Vulnerability) في نموذج FAIR؟',
        back: 'تُحسب باحتمال تفوق قدرة التهديد/المهاجم (Threat Capability - TCap) على قوة المقاومة/الضوابط الأمنية (Resistance Strength - RS).',
        category: 'نموذج FAIR'
      },
      {
        front: 'ما الفرق بين الخسارة الأولية (Primary Loss) والخسارة الثانوية (Secondary Loss) في FAIR؟',
        back: 'الخسارة الأولية هي التكلفة المباشرة للحادث (توقف العمل وتكلفة الاستجابة)، أما الثانوية فهي تبعات ردود فعل الأطراف الخارجية (كالغرامات التنظيمية والدعاوى وفقدان العملاء).',
        category: 'نموذج FAIR'
      },
      {
        front: 'ما الفرق بين التحقق من صحة البيانات (Data Validation) وجودة البيانات (Data Quality) في سجل المخاطر؟',
        back: 'التحقق من الصحة يفحص التزام المدخل بالقواعد الشكلية (نوع الحقل ونطاق الأرقام)، بينما تعني جودة البيانات دقة المعلومة وواقعيتها وملاءمتها لسياق المؤسسة.',
        category: 'جودة البيانات'
      },
      {
        front: 'لماذا يرتبط حقل «تاريخ إعادة التقييم» ارتباطاً وثيقاً بحالة المعالجة «تأجيل» (Defer)؟',
        back: 'لأن الخطر المؤجل لم يُعالج بعد ولم يُقبل نهائياً؛ فبدون تاريخ إلزامي لإعادة التقييم قد يُنسى الخطر في السجل رغم تغير الظروف وارتفاع خطورته.',
        category: 'سجل المخاطر'
      }
    ]
    },
    updated_at: NOW_TIMESTAMP
  },

  // =========================================================================
  // الفصل الثامن: المعايير الدولية والوطنية لإدارة المخاطر (ISO 27005, NIST 800-30, NCA)
  // =========================================================================
  {
    id: 208,
    chapter_number: 8,
    title: 'المعايير الدولية والوطنية لإدارة المخاطر (ISO/IEC 27005، NIST SP 800-30، وضوابط NCA)',
    subtitle: 'مقارنة الأطر الدولية، الخطوات الأربع ومصادر التهديد في NIST 800-30، والضوابط الوطنية السعودية NCA ECC',
    description: 'دراسة مقارنة ومعمقة للمعايير الدولية والوطنية لإدارة وتقييم المخاطر السيبرانية: معيار ISO/IEC 27005 ضمن منظومة ISMS، والدليل الفدرالي NIST SP 800-30 Rev.1 (النموذج العام، الخطوات الأربع، مصادر التهديد، الظرف المهيئ)، ومنهجية إدارة المخاطر في ضوابط الهيئة الوطنية للأمن السيبراني (NCA ECC-2:2024)، والفرق بين التدقيق الرسمي والتقييم التعليمي.',
    category: 'المعايير الدولية والوطنية',
    difficulty: 'advanced',
    pdfStartPage: 86,
    pdfEndPage: 97,
    diagramKey: 'ise232-risk-8',
    videoUrl: 'https://www.youtube.com/watch?v=8kVXKyGOYsY',
    videoDuration: '25:10',
    presentationUrl: '/presentations/ise232-risk-ch8.pdf',
    keyTopics: [
      'معيار ISO/IEC 27005: إنشاء السياق، تحديد المخاطر، تحليلها، تقييمها، معالجتها، والتواصل والمراقبة',
      'معيار NIST SP 800-30 Rev.1: الفرق بين معايير FIPS الإلزامية والمنشورات الخاصة SPs الإرشادية',
      'النموذج العام للمخاطر في NIST 800-30: مصدر التهديد، حدث التهديد، الثغرة، والظرف المهيئ (Predisposing Condition)',
      'الخطوات الأربع في NIST SP 800-30: الإعداد (Prepare)، الإجراء (Conduct — 6 مهام)، الإيصال (Communicate)، والمحافظة (Maintain)',
      'تكامل منهجية إدارة المخاطر مع ضوابط الهيئة الوطنية للأمن السيبراني (NCA ECC-1:2018 / ECC-2:2024)',
      'الفئات المهنية الست والتفريق بين تدقيق الامتثال الرسمي (Formal Audit) والتقييم التعليمي/الداخلي',
    ],
    images: [
      {
        prompt: 'Comparison of ISO IEC 27005 NIST SP 800-30 Rev 1 and Saudi NCA ECC risk management frameworks, 16:9',
        caption: 'التكامل والمقارنة المعيارية بين ISO/IEC 27005 و NIST SP 800-30 Rev.1 وضوابط الهيئة الوطنية للأمن السيبراني (NCA)',
        alt: 'ISO 27005 NIST 800-30 NCA comparison',
        seed: 2081,
        isAIGenerated: true,
      },
      {
        prompt: 'NIST SP 800-30 risk model threat source threat event vulnerability predisposing condition adverse impact, 16:9',
        caption: 'النموذج التحليلي للمخاطر في NIST SP 800-30 Rev.1 والخطوات الأربع المتسلسلة',
        alt: 'NIST SP 800-30 risk model and 4 steps',
        seed: 2082,
        isAIGenerated: true,
      },
    ],
    content: `## 8.1 المعايير الدولية والفرق بين الإلزام والإرشاد (FIPS vs. SPs vs. ISO)

تعمل المنظمات الحديثة في بيئة تنظيمية تتطلب الامتثال لأطر ومعايير متعددة. ومن الضروري التمييز بين طبيعة هذه الوثائق:

1. **معايير معالجة المعلومات الفدرالية ($\text{FIPS}$ — Federal Information Processing Standards)**: معايير **إلزامية قانوناً** على الجهات الفدرالية الأمريكية (مثل **FIPS 199** لتصنيف الأنظمة و**FIPS 200** لمتطلبات الأمن الدنيا).
2. **المنشورات الخاصة لـ NIST ($\text{SPs}$ — Special Publications)**: أدلة ومنهجيات **إرشادية وتوجيهية** (مثل **NIST SP 800-30 Rev.1** لتقييم المخاطر و**NIST SP 800-39** لإدارة المخاطر المؤسسية)، وتصبح إلزامية حين تعتمدها الجهة في سياساتها أو يفرضها المنظم.
3. **معيار $\text{ISO/IEC 27005}$**: المعيار الدولي الإرشادي لإدارة مخاطر أمن المعلومات الداعم لنظام إدارة أمن المعلومات ($\text{ISMS — ISO/IEC 27001}$). يمتاز بمرونته العالية، إذ يحدد **العمليات الكبرى** (إنشاء السياق ← تقييم المخاطر [تحديد، تحليل، تقييم] ← معالجة المخاطر ← التواصل والتشاور ← المراقبة والمراجعة) دون أن يفرض معادلة حسابية واحدة جامدة.
4. **ضوابط الهيئة الوطنية للأمن السيبراني ($\text{NCA ECC-2:2024}$)**: إطار تنظيمي **إلزامي** في المملكة العربية السعودية يفرض ضمن المكون الأول (حوكمة الأمن السيبراني — الضابط **1-5**) اعتماد وتطبيق منهجية موثقة لإدارة مخاطر الأمن السيبراني عبر دورة حياة الأصول والأنظمة.

> [!success]
> **مبدأ إعادة استخدام نتائج التقييم (Assessment Reuse)**: المنظمة التي تلتزم بمعياري $\text{ISO/IEC 27005}$ و$\text{NIST SP 800-30}$ معاً (أو مع $\text{NCA ECC}$) لا تحتاج لإجراء تقييمين منفصلين من الصفر؛ بل تبني سجل مخاطر موحداً وتعيد استخدام مخرجاته لتلبية متطلبات جميع المعايير، مما يخفف العبء التشغيلي.

---

## 8.2 معيار NIST SP 800-30 Rev.1: النموذج العام والخطوات الأربع

### أولاً: النموذج التحليلي للمخاطر في NIST SP 800-30
يحلل المعيار الخطر عبر تفاعل خمسة مكونات دقيقة:
1. **مصدر التهديد (Threat Source)**: وينقسم في NIST إلى **أربعة مصادر قياسية**:
   - **معادٍ / هجومي (Adversarial)**: أفراد، مجموعات قرصنة، دول معادية.
   - **عرضي / أخطاء بشرية (Accidental)**: أخطاء المستخدمين أو مديري الأنظمة دون قصد.
   - **هيكلي / بنيوي (Structural)**: تقادم العتاد، أعطال البرمجيات، استنفاد الموارد، تعطل التبريد.
   - **بيئي (Environmental)**: الكوارث الطبيعية، الحرائق، الفيضانات، وانقطاع البنية التحتية العامة.
2. **حدث التهديد (Threat Event)**: الفعل أو الواقعة المحددة التي يطلقها مصدر التهديد (مثل: شن هجوم تصيد، أو انقطاع خط الكهرباء).
3. **الثغرة الأمنية (Vulnerability)**: نقطة ضعف في التصميم أو التنفيذ أو الإجراءات يمكن لحدث التهديد استغلالها.
4. **الظرف المهيئ (Predisposing Condition)**: حالة قائمة داخل المنظمة أو بيئتها (مثل: معمارية النظام، الموقع الجغرافي في منطقة سيول، أو غياب التشفير المعماري) تزيد أو تقلل من **احتمالية** أن يؤدي حدث التهديد إلى أثر سلبي.
5. **الأثر السلبي (Adverse Impact)**: الضرر الواقع على عمليات المنظمة أو أصولها أو الأفراد أو المنظمات الأخرى أو الدولة.

### ثانياً: الخطوات الأربع والمهام الست في NIST SP 800-30 Rev.1

| رقم الخطوة | اسم الخطوة | المهام التفصيلية داخل الخطوة |
| :--- | :--- | :--- |
| **الخطوة 1** | **الإعداد للتقييم (Prepare)** | تحديد الغرض، النطاق، الافتراضات والقيود، مصادر المعلومات، ونموذج التحليل ومعايير القياس |
| **الخطوة 2** | **إجراء التقييم (Conduct)** | **6 مهام متسلسلة**:<br>1. تحديد مصادر التهديد (Identify Threat Sources)<br>2. تحديد أحداث التهديد (Identify Threat Events)<br>3. تحديد الثغرات والظروف المهيئة (Identify Vulnerabilities & Predisposing Conditions)<br>4. تحديد احتمالية الوقوع (Determine Likelihood)<br>5. تحديد حجم الأثر (Determine Impact)<br>6. تحديد الخطر ومستوى عدم اليقين (Determine Risk) |
| **الخطوة 3** | **إيصال النتائج (Communicate)** | مشاركة تقرير وسجل المخاطر مع أصحاب القرار لدعم استراتيجية الاستجابة |
| **الخطوة 4** | **المحافظة على التقييم (Maintain)** | مراقبة عوامل الخطر وتحديث التقييم باستمرار عند تغير التهديدات أو البنية |

---

## 8.3 الفئات المهنية الست والتدقيق الرسمي مقابل التقييم التعليمي

### الفئات المهنية الست المستفيدة من تقييم المخاطر
1. **الإشراف على المخاطر والحوكمة**: رؤساء الجهات ومجالس الإدارة.
2. **تنفيذ الرسالة والأعمال**: ملاك الأعمال والوحدات التشغيلية.
3. **اقتناء التقنية والعقود**: مسؤولو المشتريات وسلاسل الإمداد.
4. **تصميم وتطوير الأنظمة**: مهندسو النظم ومديرو المشاريع.
5. **الإشراف على أمن المعلومات**: مسؤولو الأمن السيبراني ($\text{CISO}$).
6. **التقييم والمراقبة والتدقيق**: مقيمو الضوابط والمدققون الداخليون والخارجيون.

### الفرق بين تدقيق الامتثال الرسمي والتقييم التعليمي/الداخلي
- **تدقيق الامتثال الرسمي (Formal Compliance Audit)**: يجريه مدقق مستقل مخول (Certified Auditor) وفق معيار إلزامي ليصدر **حكم امتثال رسمي أو شهادة اعتماد** يترتب عليها أثر قانوني أو تنظيمي.
- **التقييم التعليمي أو المراجعة الداخلية**: يفحص جودة توثيق سجل المخاطر واكتمال مسوغاته الزمنية والتحليلية بهدف **التحسين وبناء القدرات**، دون إصدار شهادة امتثال رسمية.`,
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'منظومة المعايير الدولية والوطنية: ISO 27005 و NIST و NCA',
        subtitle: 'الفرق بين المعايير الإلزامية (FIPS / NCA ECC) والأدلة الإرشادية (SPs / ISO 27005)',
        bullets: [
          'معايير FIPS إلزامية قانوناً على الجهات الفدرالية، بينما منشورات NIST SP 800-30 أدلة إرشادية منهجية.',
          'معيار ISO/IEC 27005 يوفر إطاراً مرناً لإدارة مخاطر أمن المعلومات يتكامل مع متطلبات شهادة ISO 27001.',
          'ضوابط الهيئة الوطنية للأمن السيبراني (NCA ECC-2:2024) تلزم الجهات الوطنية بمنهجية موثقة لإدارة المخاطر.',
          'إعادة استخدام نتائج التقييم (Reuse) تمكّن المنظمة من بناء سجل مخاطر واحد يلبي متطلبات ISO وNIST وNCA معاً.'
        ],
        keyHighlight: 'لا تعارض بين OCTAVE Allegro وISO 27005 وNIST 800-30؛ فكلها تشترك في جوهر تحديد الأصول والتهديدات والأثر والمعالجة.',
        diagramTitle: 'خريطة التقاطع والتكامل بين ISO 27005 و NIST 800-30 و NCA ECC'
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'النموذج العام للمخاطر في NIST SP 800-30 Rev.1',
        subtitle: 'مصادر التهديد الأربعة · حدث التهديد · الثغرة · الظرف المهيئ · الأثر',
        bullets: [
          'مصادر التهديد الأربعة: هجومية معادية (Adversarial)، عرضية (Accidental)، هيكلية (Structural)، وبيئية (Environmental).',
          'الفرق بين مصدر التهديد وحدث التهديد: المصدر هو الفاعل أو السبب، والحدث هو الفعل الهجومي أو العطل نفسه.',
          'الظرف المهيئ (Predisposing Condition): خاصية قائمة في البنية أو البيئة ترفع أو تخفض احتمال تحقق الضرر.',
          'تُشتق درجة الخطر في NIST 800-30 من دمج احتمالية استغلال الحدث للثغرة مع شدة الأثر السلبي الناتج.'
        ],
        keyHighlight: 'وجود مركز بيانات في قبو معرض للسيول يمثل «ظرفاً مهيئاً» يرفع احتمالية تحول الأمطار الغزيرة إلى حادث فقدان بيانات.',
        diagramTitle: 'التسلسل السببي لنموذج المخاطر في NIST SP 800-30'
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'الخطوات الأربع والمهام الست في NIST SP 800-30',
        subtitle: 'الإعداد (Prepare) · الإجراء (Conduct) · الإيصال (Communicate) · المحافظة (Maintain)',
        bullets: [
          'الخطوة 1 (الإعداد): تحديد الغرض والنطاق والافتراضات والقيود ومنهجية التقييم ومعايير القياس.',
          'الخطوة 2 (الإجراء): تنفيذ 6 مهام متسلسلة من تحديد المصادر والأحداث والثغرات إلى حساب الاحتمالية والأثر والخطر.',
          'الخطوة 3 (الإيصال): تبادل النتائج مع صناع القرار بصورة واضحة تدعم قرارات الاستجابة للمخاطر.',
          'الخطوة 4 (المحافظة): المراقبة المستمرة لمؤشرات الخطر وتحديث التقييم عند تغير البيئة أو التهديدات.'
        ],
        keyHighlight: 'التصريح الواضح بمكونات منهجية التقييم في خطوة «الإعداد» هو الشرط الأساسي لقابلية التكرار (Repeatability) وإعادة الإنتاج (Reproducibility).',
        diagramTitle: 'دورة الخطوات الأربع والمهام الست في NIST SP 800-30'
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'إطار المخاطر التنظيمي وحدود دقة التقييمات',
        subtitle: 'الافتراضات والقيود وعدم اليقين ولماذا ليست التقييمات أدوات قياس فيزيائية دقيقة؟',
        bullets: [
          'عناصر إطار المخاطر التنظيمي: الافتراضات، القيود، الأولويات والمفاضلات، تحمل المخاطر، وعدم اليقين.',
          'تقييمات المخاطر ليست أدوات قياس فيزيائية دقيقة لأنها تتأثر بحدود المنهجية وجودة البيانات وذاتية التقدير.',
          'الشفافية في توثيق الافتراضات ومستوى عدم اليقين تمنح صاحب القرار رؤية صادقة لمدى موثوقية النتائج.',
          'إدخال سجل مخاطر يحدد الأثر دون مسوغ علمي أو إطار زمني يعد «فجوة توثيقية» تضعف حجية التقييم.'
        ],
        keyHighlight: 'قوة تقييم المخاطر لا تكمن في ادعاء الدقة المطلقة، بل في التصريح الصادق بالافتراضات والقيود وتوحيد المنهجية.',
        diagramTitle: 'العناصر الخمسة لإطار المخاطر التنظيمي (Risk Framing)'
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'الفئات المهنية الست والتدقيق الرسمي مقابل التقييم التعليمي',
        subtitle: 'من يستخدم نتائج التقييم وكيف يفحصها المدققون؟',
        bullets: [
          'الفئات المهنية الست: الإشراف والحوكمة، تنفيذ الرسالة، الاقتناء، التصميم والتطوير، الإشراف الأمني (CISO)، والتقييم.',
          'يوحد معيار NIST 800-30 لغة الخطاب بين قسم تقنية المعلومات والإدارة التنفيذية والتدقيق الداخلي.',
          'تدقيق الامتثال الرسمي (Formal Audit): يجريه طرف مخول لإصدار حكم امتثال رسمي أو شهادة اعتماد.',
          'التقييم التعليمي / الداخلي: يفحص جودة التوثيق واكتمال المبررات بهدف التحسين دون إصدار شهادة رسمية.'
        ],
        keyHighlight: 'المدخل الذي يقول «الأثر: مرتفع» دون ذكر المسوغ والحد الفاصل والإطار الزمني يُرفض في كل من التدقيق الرسمي والتقييم التعليمي.',
        diagramTitle: 'مقارنة تدقيق الامتثال الرسمي بالتقييم التعليمي الداخلي'
      }
    ],
    flashcards: [
      {
        front: 'ما الفرق بين معايير FIPS والمنشورات الخاصة SPs الصادرة عن NIST من حيث الإلزام؟',
        back: 'معايير FIPS إلزامية قانوناً على الجهات الفدرالية، أما المنشورات الخاصة SPs (مثل SP 800-30) فهي أدلة إرشادية وتوجيهية مرنة.',
        category: 'معايير NIST'
      },
      {
        front: 'ما هي خطوات تقييم المخاطر الأربع في معيار NIST SP 800-30 Rev.1؟',
        back: '1) الإعداد للتقييم (Prepare)، 2) إجراء التقييم (Conduct — ويضم 6 مهام)، 3) إيصال النتائج (Communicate)، 4) المحافظة على التقييم (Maintain).',
        category: 'NIST SP 800-30'
      },
      {
        front: 'ما هي أنواع مصادر التهديد الأربعة المعتمدة في NIST SP 800-30؟',
        back: '1) هجومية معادية (Adversarial)، 2) عرضية / أخطاء بشرية (Accidental)، 3) هيكلية / بنيوية (Structural)، 4) بيئية (Environmental).',
        category: 'مصادر التهديد'
      },
      {
        front: 'ما المقصود بالظرف المهيئ (Predisposing Condition) وما أثره في التقييم؟',
        back: 'هو حالة قائمة داخل المنظمة أو بيئتها التشغيلية أو المعمارية تؤثر (زيادةً أو نقصاناً) في احتمالية أن يؤدي حدث التهديد عند وقوعه إلى أثر سلبي.',
        category: 'NIST SP 800-30'
      },
      {
        front: 'ما هي العناصر الخمسة لإطار المخاطر التنظيمي (Risk Framing) التي تحدد استراتيجية إدارة المخاطر؟',
        back: '1) الافتراضات، 2) القيود، 3) الأولويات والمفاضلات، 4) تحمّل المخاطر، 5) عدم اليقين.',
        category: 'تأطير المخاطر'
      },
      {
        front: 'قارن بين تدقيق الامتثال الرسمي (Formal Audit) والتقييم التعليمي لسجل المخاطر.',
        back: 'التدقيق الرسمي يجريه طرف مخول لإصدار حكم امتثال رسمي أو شهادة، بينما يركز التقييم التعليمي على فحص جودة التوثيق واكتمال المسوغات لغرض التعلم والتحسين.',
        category: 'التدقيق والامتثال'
      }
    ],
    miniQuiz: [
      {
        question: 'أي من المهام التالية تقع ضمن الخطوة الثانية «إجراء التقييم» (Conduct Assessment) في معيار NIST SP 800-30 Rev.1؟',
        options: [
          'تحديد مصادر التهديد، تحديد أحداث التهديد، تحديد الثغرات والظروف المهيئة، وتقدير الاحتمالية والأثر والخطر',
          'إصدار شهادات التخرج للطلاب',
          'شراء أجهزة الحاسب المكتبية',
          'إلغاء قسم الأمن السيبراني'
        ],
        correctIndex: 0,
        explanation: 'تضم خطوة «إجراء التقييم» (Conduct) في NIST SP 800-30 ست مهام متسلسلة تبدأ بتحديد مصادر التهديد وتنتهي بتحديد درجة الخطر.'
      },
      {
        question: 'لماذا لا تُعدّ تقييمات المخاطر السيبرانية «أدوات قياس دقيقة» بالمعنى الفيزيائي؟',
        options: [
          'لأنها تعكس حدود المنهجية والأدوات المستخدمة، وذاتية البيانات وجودتها، وتباين تفسير النتائج وخبرة المقيمين',
          'لأنها لا تستخدم أي جداول أو أرقام',
          'لأنها غير مفيدة للمؤسسات',
          'لأن المعايير الدولية تمنع كتابة التقارير'
        ],
        correctIndex: 0,
        explanation: 'ينص NIST SP 800-30 صراحةً على أن تقييمات المخاطر ليست أدوات قياس دقيقة بسبب حدود المنهجيات وذاتية المدخلات وعدم اليقين؛ ولذلك توثق الافتراضات صراحةً.'
      },
      {
        question: 'عند فحص سجل مخاطر، وُجد مدخل ينص على أن «الأثر: مرتفع» دون ذكر أي مسوغ أو حد فاصل أو إطار زمني لوقوع الأثر. ماذا يمثل هذا المدخل؟',
        options: [
          'فجوة توثيقية تخل بقابلية المراجعة وإعادة الإنتاج (Reproducibility)',
          'أفضل ممارسة في اختصار التقارير',
          'امتثالاً كاملاً لمعيار NIST SP 800-30',
          'ضابطاً أمنياً وقائياً'
        ],
        correctIndex: 0,
        explanation: 'إسناد درجة أثر دون توثيق المسوغ والإطار الزمني يمثل فجوة توثيقية تمنع المراجع أو صاحب القرار من التحقق من صحة التقدير.'
      },
      {
        question: 'كيف تستفيد منظمة سعودية تطبق ضوابط الهيئة الوطنية للأمن السيبراني (NCA ECC) ومعيار ISO/IEC 27001/27005 من مبدأ «إعادة استخدام نتائج التقييم»؟',
        options: [
          'تبني منهجية وسجل مخاطر موحداً يفي بمتطلبات كل من NCA ECC وISO 27005 دون تكرار العمل مرتين بمعايير متناقضة',
          'تتجاهل ضوابط NCA ECC تماماً',
          'تتجاهل معيار ISO 27005 تماماً',
          'تحذف سجل المخاطر بعد التدقيق مباشرة'
        ],
        correctIndex: 0,
        explanation: 'إعادة استخدام مخرجات التقييم الموحد تقلل العبء التشغيلي وتمنع تناقض التقديرات بين فرق الامتثال المختلفة داخل المؤسسة.'
      }
    ],
    interactiveBook3D: {
      model3DType: 'iso27005_nist800_30_nca_rings',
      shaderEffect: 'compliance_orbital_laser',
      ambientColor: '#0c1425',
      accentColor: '#3b82f6',
      autoRotateSpeed: 1.1,
      pages3D: [
        {
          pageNumber: 1,
          spreadSide: 'right',
          title: 'الحلقات المدارية للمعايير الثلاثة: ISO 27005 · NIST 800-30 · NCA ECC',
          subtitle: 'مواءمة النموذج التحليلي للمخاطر وإعادة استخدام المخرجات الرقابية',
          summaryMarkdown: 'يمثل المجسم ثلاثي الأبعاد **ثلاث حلقات مدارية متداخلة** تدور حول نواة سجل المخاطر الموحد: حلقة **ISO/IEC 27005** (السياق والمعالجة)، وحلقة **NIST SP 800-30** (الإعداد والإجراء والإيصال والمحافظة)، وحلقة **NCA ECC-2:2024** (الامتثال الوطني السيادي).',
          interactiveFormula: 'NIST_Risk = f(Threat_Source, Threat_Event, Vulnerability, Predisposing_Condition, Impact)',
          labParameterName: 'نضج توثيق المنهجية والمسوغات (Repeatability & Reproducibility)',
          labMin: 1,
          labMax: 5,
          labDefault: 4,
          labUnit: 'مستوى نضج التوثيق',
          labInterpretation: {
            1: 'توثيق عشوائي (درجات بلا مسوغات): فجوة توثيقية جسيمة، فشل في التدقيق وعدم قابلية للتكرار.',
            2: 'توثيق جزئي: تحديد التهديدات دون توثيق الافتراضات والقيود والإطار الزمني.',
            3: 'توثيق معياري أساسي: تطبيق خطوات NIST 800-30 الأربع مع وجود بعض التفاوت بين المقيمين.',
            4: 'توثيق مؤسسي ناضج: منهجية معلنة، مسوغات واضحة، وقابلية عالية لإعادة الإنتاج (Reproducibility).',
            5: 'تكامل قياسي كامل (ISO + NIST + NCA): سجل موحد مؤتمت يعاد استخدامه عبر جميع عمليات التدقيق.'
          },
          challengeQuestion: {
            question: 'أي عنصر في نموذج NIST SP 800-30 يصف «استخدام المؤسسة لنظام تشغيل قديم توقف دعمه الأمني ولا يمكن ترقيته حالياً لتشغيله أجهزة طبية حرجة»؟',
            options: [
              'ثغرة أمنية (Vulnerability) مقترنة بظرف مهيئ معماري (Predisposing Condition)',
              'ضابط أمني وقائي',
              'مصدر تهديد بيئي طبيعي',
              'شهادة امتثال رسمية'
            ],
            correctIndex: 0,
            feedbackCorrect: 'تحليل ممتاز! توقف الدعم يمثل ثغرة، والاعتماد المعماري للأجهزة الطبية عليه يمثل ظرفاً مهيئاً يزيد احتمالية التضرر ويستلزم ضوابط تعويضية (كالعزل الشبكي).',
            feedbackWrong: 'تذكر أن الظرف المهيئ (Predisposing Condition) هو قيد معماري أو تشغيلي أو بيئي قائم يؤثر في احتمالية تحقق الضرر.'
          },
          aiTutorGuardrailTopics: ['ISO 27005', 'NIST SP 800-30', 'NCA ECC', 'الظرف المهيئ', 'مصادر التهديد الأربعة', 'FIPS مقابل SPs', 'قابلية التكرار وإعادة الإنتاج']
        },
        {
          pageNumber: 2,
          spreadSide: 'left',
          title: 'مختبر تدقيق سجل المخاطر: قابلية التكرار وإعادة الإنتاج',
          subtitle: 'فحص السجل بمعايير NIST SP 800-30 وISO 27005 وضوابط NCA ECC',
          summaryMarkdown: 'في الصفحة اليسرى، تمارس دور **مدقق المخاطر** الذي يفحص مدى تحقيق التقييم لشرطي **قابلية التكرار ($\text{Repeatability}$)** و**قابلية إعادة الإنتاج ($\text{Reproducibility}$)**، ويكتشف الفجوات التوثيقية.',
          interactiveFormula: 'Audit_Readiness = Explicit_Methodology + Time_Horizon + Evidence_Justification',
          labParameterName: 'اكتمال عناصر إطار المخاطر التنظيمي الخمسة في الوثيقة',
          labMin: 1,
          labMax: 5,
          labDefault: 5,
          labUnit: 'عناصر مؤطرة',
          labInterpretation: {
            1: 'عنصر واحد فقط: غياب الافتراضات والقيود وعدم اليقين (تقييم ضعيف الحجية).',
            2: 'عنصران (الأولويات والتحمل فقط): نقص في توثيق القيود والافتراضات.',
            3: 'ثلاثة عناصر: تقييم مقبول داخلياً لكنه يحتاج لاستكمال توثيق عدم اليقين.',
            4: 'أربعة عناصر مكتملة: جاهزية عالية لمراجعة الأقران والتدقيق الداخلي.',
            5: 'خمسة عناصر مكتملة (الافتراضات، القيود، الأولويات، التحمل، عدم اليقين): امتثال كامل لـ NIST 800-30 وNCA ECC.'
          },
          challengeQuestion: {
            question: 'ما الفرق بين «مصدر التهديد» (Threat Source) و«حدث التهديد» (Threat Event) في معيار NIST SP 800-30 Rev.1؟',
            options: [
              'مصدر التهديد هو الفاعل أو السبب الكامن (مهاجم، خطأ بشري، عطل هيكلي، كارثة بيئية)، أما حدث التهديد فهو الواقعة أو الفعل المحدد الذي يطلقه ذلك المصدر (كشن هجوم فدية أو انقطاع التيار)',
              'لا يوجد أي فرق بينهما في المعيار',
              'مصدر التهديد هو الضابط الأمني، وحدث التهديد هو التقرير النهائي',
              'حدث التهديد يقتصر على الكوارث الطبيعية فقط'
            ],
            correctIndex: 0,
            feedbackCorrect: 'تفريق علمي ممتاز! المصدر هو «من أو ما الذي يسبب التهديد»، والحدث هو «ماذا وقع فعلياً أو كيف هُوجم الأصل».',
            feedbackWrong: 'تذكر: مصدر التهديد هو الكيان/السبب (الأصناف الأربعة)، وحدث التهديد هو الفعل أو الحادث المنبثق عنه.'
          },
          aiTutorGuardrailTopics: ['مصدر التهديد مقابل حدث التهديد', 'قابلية التكرار وإعادة الإنتاج', 'التدقيق الرسمي مقابل التعليمي', 'إطار المخاطر التنظيمي']
        }
      ],
      stepByStep: [
        {
          stepNumber: 1,
          title: 'الخطوة 1: الإعداد وتأطير المخاطر (Prepare & Risk Framing)',
          description: 'تحديد الغرض والنطاق والافتراضات والقيود ومعايير القياس بما يتوافق مع NCA ECC وISO 27005.',
          formulaOrRule: 'Step 1 (Prepare) → Scope + Assumptions + Constraints + Scales',
          visualState: 'ring_prepare_active',
          cameraFocus: { x: -2.0, y: 1.5, z: 3.0 }
        },
        {
          stepNumber: 2,
          title: 'الخطوة 2: إجراء المهام الست لتحليل المخاطر (Conduct 6 Tasks)',
          description: 'تحديد مصادر التهديد الأربعة، وأحداث التهديد، والثغرات والظروف المهيئة، ثم حساب الاحتمالية والأثر والخطر.',
          formulaOrRule: 'Step 2 (Conduct) → Tasks 2-1 to 2-6 Executed',
          visualState: 'ring_conduct_6tasks_spinning',
          cameraFocus: { x: 0.0, y: 1.6, z: 3.2 }
        },
        {
          stepNumber: 3,
          title: 'الخطوة 3: إيصال النتائج للفئات المهنية الست (Communicate)',
          description: 'مشاركة مخرجات التقييم بلغة واضحة مع الإدارة العليا وملاك الرسالة ومسؤولي الاقتناء وCISO.',
          formulaOrRule: 'Step 3 (Communicate) → Decision-Maker Alignment',
          visualState: 'ring_communicate_pulsing',
          cameraFocus: { x: 2.0, y: 1.5, z: 3.0 }
        },
        {
          stepNumber: 4,
          title: 'الخطوة 4: المحافظة والمراقبة وإعادة استخدام النتائج (Maintain & Reuse)',
          description: 'تحديث التقييم باستمرار وتوظيف السجل الموحد لتلبية متطلبات التدقيق الرسمي لـ NCA وISO 27001.',
          formulaOrRule: 'Step 4 (Maintain) → Continuous Monitoring & Multi-Standard Reuse',
          visualState: 'all_rings_synchronized',
          cameraFocus: { x: 0.0, y: -1.6, z: 3.5 }
        }
      ],
      hotspots: [
        {
          id: 'hs-ch8-nist',
          label: 'حلقة NIST SP 800-30 Rev.1',
          x: -1.8,
          y: 1.3,
          z: 0.5,
          coordinates: { x: -1.8, y: 1.3, z: 0.5 },
          title: 'الدليل الفدرالي NIST SP 800-30 Rev.1 (الخطوات الأربع والمهام الست)',
          detailedExplanation: 'يوفر أعمق تفصيل إجرائي لتحديد مصادر التهديد الأربعة وأحداث التهديد والظروف المهيئة وضمان قابلية التكرار وإعادة الإنتاج.',
          technicalMetric: '4 Steps (Prepare, Conduct, Communicate, Maintain)',
          securityImpact: 'حرج جداً',
          relatedControl: 'NIST SP 800-30 Rev.1 & NIST SP 800-39'
        },
        {
          id: 'hs-ch8-iso27005',
          label: 'حلقة المعيار الدولي ISO/IEC 27005',
          x: 1.8,
          y: 1.3,
          z: 0.5,
          coordinates: { x: 1.8, y: 1.3, z: 0.5 },
          title: 'معيار ISO/IEC 27005 لإدارة مخاطر أمن المعلومات',
          detailedExplanation: 'يربط تقييم المخاطر بنظام إدارة أمن المعلومات (ISMS - ISO 27001) عبر إنشاء السياق وتحديد وتحليل وتقييم ومعالجة المخاطر.',
          technicalMetric: 'Context → Identification → Analysis → Evaluation → Treatment',
          securityImpact: 'حرج جداً',
          relatedControl: 'ISO/IEC 27001:2022 Clauses 6.1.2 & 6.1.3 & ISO/IEC 27005:2022'
        },
        {
          id: 'hs-ch8-ncaecc',
          label: 'حلقة ضوابط الهيئة الوطنية (NCA ECC)',
          x: -1.8,
          y: -1.3,
          z: 0.5,
          coordinates: { x: -1.8, y: -1.3, z: 0.5 },
          title: 'ضوابط الهيئة الوطنية للأمن السيبراني (NCA ECC-2:2024 — ضابط 1-5)',
          detailedExplanation: 'تلزم الجهات الوطنية في المملكة باعتماد منهجية إدارة مخاطر سيبرانية وتطبيقها قبل إطلاق الأنظمة وعند التغيرات الجوهرية ومراجعتها دورياً.',
          technicalMetric: 'NCA ECC-2:2024 Control 1-5 (Cybersecurity Risk Management)',
          securityImpact: 'حرج جداً',
          relatedControl: 'الهيئة الوطنية للأمن السيبراني — الإطار الوطني لإدارة مخاطر الأمن السيبراني'
        },
        {
          id: 'hs-ch8-predisposing',
          label: 'عقدة الظرف المهيئ (Predisposing Condition)',
          x: 1.8,
          y: -1.3,
          z: 0.5,
          coordinates: { x: 1.8, y: -1.3, z: 0.5 },
          title: 'الظرف المهيئ وفجوات التوثيق وقابلية إعادة الإنتاج',
          detailedExplanation: 'يبين كيف تؤثر الخصائص المعمارية أو الجغرافية أو التشغيلية القائمة في احتمالية تضرر الأصل، ويشترط توثيق المسوغات الزمنية لكل تقدير.',
          technicalMetric: 'Predisposing Condition + Reproducibility Justification',
          securityImpact: 'مرتفع',
          relatedControl: 'NIST SP 800-30 Rev.1 Task 2-3'
        }
      ]
    },
    richData: {
      id: 208,
      chapter_number: 8,
      title: 'المعايير الدولية والوطنية لإدارة المخاطر (ISO 27005, NIST 800-30, NCA)',
      subtitle: 'مقارنة المعايير الدولية والوطنية والخطوات الأربع ومصادر التهديد',
      category: 'متقدم',
      pdfStartPage: 86,
      pdfEndPage: 97,
      description: 'دراسة مقارنة لمعياري ISO/IEC 27005 وNIST SP 800-30 Rev.1 وضوابط NCA ECC السعودية.',
      objectives: [
        'التمييز بين معايير FIPS الإلزامية والمنشورات الخاصة SPs الإرشادية.',
        'شرح الخطوات الأربع والمهام الست ومصادر التهديد الأربعة والظرف المهيئ في NIST SP 800-30.',
        'بيان كيفية إعادة استخدام نتائج التقييم بين ISO 27005 وNIST 800-30 وضوابط NCA ECC.',
        'المقارنة بين تدقيق الامتثال الرسمي والتقييم التعليمي لسجل المخاطر.'
      ],
      sections: [
        {
          heading: '1. معيار ISO 27005 ومعيار NIST SP 800-30 وضوابط NCA',
          content: 'بينما يضع ISO 27005 الإطار العام للعمليات، يفصل NIST 800-30 مهام إجراء التقييم الست ومصادر التهديد الأربعة، وتلزم NCA ECC الجهات السعودية بتطبيق إدارة المخاطر.',
          formula: 'Risk (NIST) = Likelihood(Threat_Event, Vulnerability, Predisposing_Condition) × Impact',
          saudiExample: 'توظيف دليل NIST SP 800-30 لبناء سجل مخاطر مستشفى حكومي سعودي يحقق الامتثال للضابط (1-5) في NCA ECC-2:2024.'
        }
      ],
      tables: [
        {
          title: 'مقارنة بين OCTAVE Allegro و ISO/IEC 27005 و NIST SP 800-30',
          headers: ['المعيار / المنهجية', 'محور التركيز الأساسي', 'الهيكل الإجرائي'],
          rows: [
            ['OCTAVE Allegro', 'الأصل المعلوماتي وحاوياته الثلاث', '4 مراحل و 8 خطوات و 10 أوراق عمل'],
            ['ISO/IEC 27005', 'التكامل مع نظام إدارة أمن المعلومات ISMS', 'السياق ← التحديد ← التحليل ← التقييم ← المعالجة'],
            ['NIST SP 800-30 Rev.1', 'حدث التهديد ومصادره والظروف المهيئة', '4 خطوات (الإعداد، الإجراء [6 مهام]، الإيصال، المحافظة)']
          ]
        }
      ],
      commonMistake: {
        mistake: 'تدوين درجات الأثر والاحتمالية في سجل المخاطر كأرقام مجردة دون ذكر المسوغ أو الإطار الزمني أو الافتراضات.',
        fix: 'توثيق المسوغ والإطار الزمني والافتراضات والقيود صراحةً لضمان قابلية التكرار وإعادة الإنتاج (Reproducibility).'
      },
      solvedExamples: [
        {
          title: 'تصنيف مصادر التهديد والظرف المهيئ وفق NIST SP 800-30',
          given: 'مركز بيانات يقع في منطقة ساحلية رطبة يعاني من تقادم أجهزة التكييف، وتعرض لهجوم فدية من مجموعة قرصنة خارجية.',
          steps: [
            'مجموعة القرصنة الخارجية: مصدر تهديد معادٍ (Adversarial).',
            'تقادم أجهزة التكييف: مصدر تهديد هيكلي/بنيوي (Structural).',
            'الموقع الساحلي الرطب: ظرف مهيئ بيئي/معماري (Predisposing Condition) يسرّع تآكل الأجهزة.'
          ],
          result: 'فصل منهجي دقيق بين المصادر المعادية والهيكلية والظروف المهيئة في سجل المخاطر.',
          whyItMatters: 'يساعد في توجيه الضوابط المناسبة لكل مصدر (ضوابط سيبرانية للمعادي، وصيانة إحلالية للهيكلي).'
        }
      ],
      selfAssessment: [
        {
          question: 'علّل: تقييمات المخاطر ليست أدوات قياس دقيقة.',
          answer: 'لأنها تعكس حدود المنهجية والأدوات، وذاتية البيانات وجودتها، وتفسير النتائج، وخبرة المقيمين.'
        }
      ],
      quiz: [
      {
        question: 'أي من المهام التالية تقع ضمن الخطوة الثانية «إجراء التقييم» (Conduct Assessment) في معيار NIST SP 800-30 Rev.1؟',
        options: [
          'تحديد مصادر التهديد، تحديد أحداث التهديد، تحديد الثغرات والظروف المهيئة، وتقدير الاحتمالية والأثر والخطر',
          'إصدار شهادات التخرج للطلاب',
          'شراء أجهزة الحاسب المكتبية',
          'إلغاء قسم الأمن السيبراني'
        ],
        correctIndex: 0,
        explanation: 'تضم خطوة «إجراء التقييم» (Conduct) في NIST SP 800-30 ست مهام متسلسلة تبدأ بتحديد مصادر التهديد وتنتهي بتحديد درجة الخطر.'
      },
      {
        question: 'لماذا لا تُعدّ تقييمات المخاطر السيبرانية «أدوات قياس دقيقة» بالمعنى الفيزيائي؟',
        options: [
          'لأنها تعكس حدود المنهجية والأدوات المستخدمة، وذاتية البيانات وجودتها، وتباين تفسير النتائج وخبرة المقيمين',
          'لأنها لا تستخدم أي جداول أو أرقام',
          'لأنها غير مفيدة للمؤسسات',
          'لأن المعايير الدولية تمنع كتابة التقارير'
        ],
        correctIndex: 0,
        explanation: 'ينص NIST SP 800-30 صراحةً على أن تقييمات المخاطر ليست أدوات قياس دقيقة بسبب حدود المنهجيات وذاتية المدخلات وعدم اليقين؛ ولذلك توثق الافتراضات صراحةً.'
      },
      {
        question: 'عند فحص سجل مخاطر، وُجد مدخل ينص على أن «الأثر: مرتفع» دون ذكر أي مسوغ أو حد فاصل أو إطار زمني لوقوع الأثر. ماذا يمثل هذا المدخل؟',
        options: [
          'فجوة توثيقية تخل بقابلية المراجعة وإعادة الإنتاج (Reproducibility)',
          'أفضل ممارسة في اختصار التقارير',
          'امتثالاً كاملاً لمعيار NIST SP 800-30',
          'ضابطاً أمنياً وقائياً'
        ],
        correctIndex: 0,
        explanation: 'إسناد درجة أثر دون توثيق المسوغ والإطار الزمني يمثل فجوة توثيقية تمنع المراجع أو صاحب القرار من التحقق من صحة التقدير.'
      },
      {
        question: 'كيف تستفيد منظمة سعودية تطبق ضوابط الهيئة الوطنية للأمن السيبراني (NCA ECC) ومعيار ISO/IEC 27001/27005 من مبدأ «إعادة استخدام نتائج التقييم»؟',
        options: [
          'تبني منهجية وسجل مخاطر موحداً يفي بمتطلبات كل من NCA ECC وISO 27005 دون تكرار العمل مرتين بمعايير متناقضة',
          'تتجاهل ضوابط NCA ECC تماماً',
          'تتجاهل معيار ISO 27005 تماماً',
          'تحذف سجل المخاطر بعد التدقيق مباشرة'
        ],
        correctIndex: 0,
        explanation: 'إعادة استخدام مخرجات التقييم الموحد تقلل العبء التشغيلي وتمنع تناقض التقديرات بين فرق الامتثال المختلفة داخل المؤسسة.'
      }
    ],
      flashcards: [
      {
        front: 'ما الفرق بين معايير FIPS والمنشورات الخاصة SPs الصادرة عن NIST من حيث الإلزام؟',
        back: 'معايير FIPS إلزامية قانوناً على الجهات الفدرالية، أما المنشورات الخاصة SPs (مثل SP 800-30) فهي أدلة إرشادية وتوجيهية مرنة.',
        category: 'معايير NIST'
      },
      {
        front: 'ما هي خطوات تقييم المخاطر الأربع في معيار NIST SP 800-30 Rev.1؟',
        back: '1) الإعداد للتقييم (Prepare)، 2) إجراء التقييم (Conduct — ويضم 6 مهام)، 3) إيصال النتائج (Communicate)، 4) المحافظة على التقييم (Maintain).',
        category: 'NIST SP 800-30'
      },
      {
        front: 'ما هي أنواع مصادر التهديد الأربعة المعتمدة في NIST SP 800-30؟',
        back: '1) هجومية معادية (Adversarial)، 2) عرضية / أخطاء بشرية (Accidental)، 3) هيكلية / بنيوية (Structural)، 4) بيئية (Environmental).',
        category: 'مصادر التهديد'
      },
      {
        front: 'ما المقصود بالظرف المهيئ (Predisposing Condition) وما أثره في التقييم؟',
        back: 'هو حالة قائمة داخل المنظمة أو بيئتها التشغيلية أو المعمارية تؤثر (زيادةً أو نقصاناً) في احتمالية أن يؤدي حدث التهديد عند وقوعه إلى أثر سلبي.',
        category: 'NIST SP 800-30'
      },
      {
        front: 'ما هي العناصر الخمسة لإطار المخاطر التنظيمي (Risk Framing) التي تحدد استراتيجية إدارة المخاطر؟',
        back: '1) الافتراضات، 2) القيود، 3) الأولويات والمفاضلات، 4) تحمّل المخاطر، 5) عدم اليقين.',
        category: 'تأطير المخاطر'
      },
      {
        front: 'قارن بين تدقيق الامتثال الرسمي (Formal Audit) والتقييم التعليمي لسجل المخاطر.',
        back: 'التدقيق الرسمي يجريه طرف مخول لإصدار حكم امتثال رسمي أو شهادة، بينما يركز التقييم التعليمي على فحص جودة التوثيق واكتمال المسوغات لغرض التعلم والتحسين.',
        category: 'التدقيق والامتثال'
      }
    ]
    },
    updated_at: NOW_TIMESTAMP
  },

  // =========================================================================
  // الفصل التاسع: إعداد وتوثيق تقارير المخاطر التنفيذية وسجل المخاطر المؤسسي
  // =========================================================================
  {
    id: 209,
    chapter_number: 9,
    title: 'إعداد وتوثيق تقارير المخاطر التنفيذية وسجل المخاطر المؤسسي (Risk Register)',
    subtitle: 'المكونات الثلاثة عشر لتقرير المخاطر، الملخص التنفيذي مقابل الملاحق التحليلية، واعتماد التوصيات والمخاطر المتبقية',
    description: 'دراسة منهجية شاملة لصياغة تقارير تحليل المخاطر الاحترافية وبناء سجل المخاطر المؤسسي (Risk Register)، وتكييف لغة العرض بحسب الجمهور المستهدف (المدير المالي، المدير التقني، القيادة العليا)، وإعداد الملخص التنفيذي ذي الصفحة الواحدة والملاحق الفنية، وآلية اعتماد التقرير.',
    category: 'تقارير وسجل المخاطر',
    difficulty: 'intermediate',
    pdfStartPage: 98,
    pdfEndPage: 107,
    diagramKey: 'ise232-risk-9',
    videoUrl: 'https://www.youtube.com/watch?v=8kVXKyGOYsY',
    videoDuration: '19:45',
    presentationUrl: '/presentations/ise232-risk-ch9.pdf',
    keyTopics: [
      'المكونات الثلاثة عشر القياسية لتقرير تحليل المخاطر الاحترافي',
      'الفرق الجوهري بين الملخص التنفيذي (Executive Summary) والملاحق التحليلية (Appendices)',
      'تكييف الخطاب بحسب الجمهور: المدير المالي (CFO)، المدير التقني (CTO/IT)، والقيادة العليا (CEO/Board)',
      'العناصر الستة للتوصية الواضحة والقابلة للتنفيذ والفرق بين التوصية وخطة المعالجة',
      'بنية سجل المخاطر المؤسسي (Risk Register) وموقع المخاطر المتبقية بعد الضوابط',
      'سرية تقرير المخاطر وآلية الاعتماد الرسمي (اعتماد التوصيات واعتماد المخاطر المتبقية)',
    ],
    images: [
      {
        prompt: 'Executive risk assessment report structure 13 components executive summary risk register and appendices, 16:9',
        caption: 'الهيكل القياسي لتقرير تحليل المخاطر: من الملخص التنفيذي وسجل المخاطر إلى الملاحق التفصيلية',
        alt: 'Risk assessment report structure',
        seed: 2091,
        isAIGenerated: true,
      },
      {
        prompt: 'Boardroom cybersecurity risk presentation tailored for CEO CFO and CTO stakeholders, 16:9',
        caption: 'تخصيص عرض نتائج تحليل المخاطر بحسب الجمهور المستهدف (القيادة التنفيذية، المالية، والتقنية)',
        alt: 'Risk report presentation to stakeholders',
        seed: 2092,
        isAIGenerated: true,
      },
    ],
    content: `## 9.1 الغرض من تقرير تحليل المخاطر ومكوناته الثلاثة عشر

لا تكتمل قيمة تحليل المخاطر مهما بلغت دقته العلمية إلا إذا تُرجمت مخرجاته إلى **تقرير مخاطر واضح ومقنع (Risk Assessment Report)** يمكّن صاحب الصلاحية من اتخاذ قرار المعالجة وتخصيص الموارد. ويتحدد نطاق التقرير بما وُثق فعلياً في أوراق عمل التقييم، وينتظم في **ثلاثة عشر مكوناً قياسياً**:

| الرقم | المكون الرئيسي في التقرير | الغرض والمحتوى التفصيلي |
| :---: | :--- | :--- |
| **1** | **هدف التقرير (Objective)** | بيان القرار المطلوب من الإدارة والغاية من إجراء التقييم |
| **2** | **النطاق (Scope)** | تحديد الأصول الحرجة والوحدات التنظيمية والحاويات المشمولة والمستبعدة |
| **3** | **المنهجية (Methodology)** | شرح الإطار المتبع (OCTAVE Allegro / NIST 800-30) ومعايير القياس وأوزان المجالات |
| **4** | **الافتراضات والقيود (Assumptions & Constraints)** | التصريح بحدود البيانات والوقت والنطاق لضمان أمانة التفسير |
| **5** | **الأصول والسيناريوهات (Assets & Scenarios)** | عرض ملفات الأصول الحرجة وسيناريوهات التهديد (الفاعل، الوسيلة، الدافع، النتيجة) |
| **6** | **الأدلة والملاحظات (Evidence)** | الشواهد الواقعية والفجوات المرصودة في الحاويات التقنية والمادية والبشرية |
| **7** | **ترتيب الأولويات (Prioritization)** | فرز المخاطر تنازلياً حسب درجة الخطر النسبية ومجموعات المصفوفة |
| **8** | **سجل المخاطر (Risk Register)** | الجدول الجامع لجميع المخاطر وحقولها التسعة وحالات معالجتها |
| **9** | **مصفوفة المخاطر (Risk Matrix)** | التمثيل البصري لتوزيع المخاطر على الأحواض الأربعة أو مصفوفة $5\times 5$ |
| **10** | **التوصيات (Recommendations)** | القرارات المقترحة والضوابط المطلوبة لكل خطر ذي أولوية |
| **11** | **خطة المعالجة (Mitigation Plan)** | الجدول الزمني للتنفيذ، الميزانية، المسؤولون، ومؤشرات الإنجاز |
| **12** | **المخاطر المتبقية (Residual Risks)** | بيان مستوى الخطر المتبقي بعد تطبيق الضوابط المقترحة لطلب قبوله رسمياً |
| **13** | **الملاحق التحليلية (Appendices)** | أوراق العمل الكاملة (1–10)، خرائط الحاويات (9a–9c)، والجداول التفصيلية |

---

## 9.2 الملخص التنفيذي مقابل الملاحق وتكييف الخطاب للجمهور

> [!warning]
> **خطأ شائع في إعداد التقارير**: تقديم تقرير مثقل بالمصطلحات التقنية المعقدة وأرقام المنافذ البرمجية لصاحب القرار التنفيذي، مما يعيق فهم الأثر ويعطل اتخاذ القرار. **الحل الصحيح**: الفصل المنهجي بين **الملخص التنفيذي (Executive Summary)** الموجه للقيادة بلغة الأعمال ومجالات الأثر، وبين **الملاحق التحليلية (Appendices)** الموجهة للمختصين التقنيين والمدققين.

### مقارنة الجمهور المستهدف ولغة الخطاب الملائمة

| الجمهور المستهدف | ما يهمه في تقرير المخاطر | القسم الأنسب له في التقرير |
| :--- | :--- | :--- |
| **القيادة العليا (CEO / رئيس الجهة)** | الأثر على الرسالة والسمعة، أعلى المخاطر، القرار المطلوب، واعتماد المخاطر المتبقية | **الملخص التنفيذي** (صفحة واحدة مركزة) |
| **المدير المالي (CFO)** | الخسائر المالية المتوقعة ($ALE$)، الغرامات التنظيمية، تكلفة الضوابط وعائد الاستثمار ($ROSI$) | قسم التحليل المالي وجدوى خطة المعالجة |
| **المدير التقني ومدير الأمن (CTO / CISO)** | تفاصيل الحاويات، الفجوات التقنية والإجرائية، الضوابط الوقائية والكشفية، وأوراق العمل | المتن التحليلي + **الملاحق التفصيلية الكاملة** |

---

## 9.3 العناصر الستة للتوصية الواضحة واعتماد التقرير وسريته

لكي تكون **التوصية (Recommendation)** في الملخص التنفيذي والتقرير قابلة للاعتماد الفوري، يجب أن تتضمن **ستة عناصر متكاملة**:
1. **الخطر المعني** (مع درجته النسبية وترتيبه).
2. **القرار المطلوب** (تخفيف، نقل، تجنب، تأجيل، أو قبول).
3. **الحاوية المستهدفة** (تقنية، مادية، أو بشرية).
4. **الضوابط الأمنية المقترحة** (وقائية، كشفية، أو تصحيحية).
5. **المسؤول عن التنفيذ** (الجهة أو الوظيفة المكلفة).
6. **المخاطر المتبقية المطلوب قبولها** بعد تنفيذ الضوابط.

- **الفرق بين التوصية وخطة المعالجة**: التوصية تجيب عن سؤال **«ماذا يجب أن نفعل ولماذا؟»**، بينما تفصل خطة المعالجة **«كيف ومتى وبأي ميزانية ومراحل زمنية سيتم التنفيذ؟»**.
- **موقع المخاطر المتبقية**: تُذكر المخاطر المتبقية دائماً **بعد عرض الضوابط المقترحة** لأنها تمثل ما سيبقى من الخطر بعد تنفيذ تلك الضوابط.
- **اعتماد التقرير (Report Sign-Off)**: عندما يوقّع صاحب الصلاحية على اعتماد التقرير، فإنه يعتمد أمرين متلازمين: **(1) التوصيات وخطط المعالجة، و(2) قبول المخاطر المتبقية**.
- **سرية التقرير**: يرث تقرير المخاطر **مستوى سرية الأصل المعلوماتي** الذي يدرسه (بل قد يكون أشد حساسية لأنه يجمع خريطة نقاط الضعف والحاويات في وثيقة واحدة!).`,
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'الهيكل القياسي لتقرير تحليل المخاطر (المكونات الـ 13)',
        subtitle: 'تحويل أوراق العمل التشخيصية إلى وثيقة قرار مؤسسي',
        bullets: [
          'المكونات التأسيسية (1–4): الهدف، النطاق، المنهجية، والافتراضات والقيود المعلنة.',
          'المكونات التشخيصية (5–9): الأصول والسيناريوهات، الأدلة، ترتيب الأولويات، سجل المخاطر، والمصفوفة.',
          'مكونات القرار (10–12): التوصيات، خطة المعالجة التنفيذية، والمخاطر المتبقية المطلوب قبولها.',
          'المكون المرجعي (13): الملاحق التحليلية التي تضم أوراق العمل الكاملة وخرائط الحاويات.'
        ],
        keyHighlight: 'ذكر الافتراضات والقيود صراحةً في صدر التقرير يحمي الفريق التحليلي ويمنح القيادة قراءة واقعية لحدود النتائج.',
        diagramTitle: 'خارطة المكونات الثلاثة عشر لتقرير تحليل المخاطر'
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'الملخص التنفيذي مقابل الملاحق التحليلية وتعدد الجمهور',
        subtitle: 'مخاطبة القيادة بلغة الأعمال ومجالات الأثر، والتقنيين بلغة الضوابط',
        bullets: [
          'صاحب القرار غير التقني يفهم الخطر عبر مجالات الأثر (السمعة، المالي، الإنتاجية، السلامة، الغرامات).',
          'الملخص التنفيذي (صفحة واحدة): يعرض الأصل الحرج، أعلى 3 مخاطر، القرار المطلوب، والمسؤول، والخطر المتبقي.',
          'المدير المالي يركز على تكلفة الضوابط مقارنةً بخفض الخسائر والغرامات (ALE / ROSI).',
          'الملاحق التحليلية تحفظ جميع التفاصيل التقنية وأوراق العمل (1–10) للمختصين والمدققين دون إثقال الملخص.'
        ],
        keyHighlight: 'التقرير الناجح يضع الملخص التنفيذي في المقدمة لصانع القرار، ويحيل التفاصيل الهندسية الدقيقة إلى الملاحق.',
        diagramTitle: 'مصفوفة مواءمة أقسام التقرير مع احتياجات الجمهور المستهدف'
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'العناصر الستة للتوصية الواضحة والفرق بينها وبين خطة المعالجة',
        subtitle: 'كيف نصوغ توصية لا تقبل اللبس أو التسويف؟',
        bullets: [
          'العنصر 1 و2: تحديد الخطر المعني بدقة + تحديد قرار المعالجة المطلوب (تخفيف/نقل/تجنب/تأجيل).',
          'العنصر 3 و4: تسمية الحاوية المستهدفة + تحديد الضوابط الأمنية الوقائية أو الكشفية المقترحة عليها.',
          'العنصر 5 و6: تعيين المسؤول عن التنفيذ + بيان المخاطر المتبقية المطلوب قبولها بعد التنفيذ.',
          'التوصية تحدد «القرار والضابط»، أما خطة المعالجة فتفصل «الجدول الزمني والميزانية ومراحل التنفيذ».'
        ],
        keyHighlight: 'توصية تقول «نوصي بتحسين الأمن» هي توصية جوفاء؛ التوصية الاحترافية تحدد الحاوية والضابط والمسؤول والخطر المتبقي.',
        diagramTitle: 'اللبنات الست لبناء التوصية الاحترافية في تقرير المخاطر'
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'موقع المخاطر المتبقية في التقرير وآلية الاعتماد الرسمي',
        subtitle: 'ماذا تعتمد المؤسسة عند التوقيع على تقرير تحليل المخاطر؟',
        bullets: [
          'تُعرض المخاطر المتبقية في التقرير مباشرةً بعد قسم الضوابط المقترحة وخطة المعالجة.',
          'السبب المنهجي: لا يمكن لصاحب القرار تقييم الخطر المتبقي إلا بعد معرفة الضوابط التي ستُطبق أولاً.',
          'اعتماد التقرير (Report Approval) هو قرار رسمي من صاحب الصلاحية يتضمن شقين متلازمين:',
          'الشق الأول: اعتماد التوصيات وتخصيص مواردها؛ والشق الثاني: القبول الرسمي للمخاطر المتبقية.'
        ],
        keyHighlight: 'التوقيع على تقرير المخاطر دون قراءة بند «المخاطر المتبقية» يعني قبول عواقب غير معروفة على المنظمة.',
        diagramTitle: 'تسلسل التوصية ← الضوابط ← المخاطر المتبقية ← قرار الاعتماد المزدوج'
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'سرية تقرير المخاطر وحمايته كأصل معلوماتي حساس',
        subtitle: 'العلاقة الطردية بين سرية التقرير ومتطلب السرية للأصل المدروس',
        bullets: [
          'يحتوي تقرير المخاطر على خريطة شاملة لأهم أصول المؤسسة وحاوياتها وثغراتها غير المعالجة بعد.',
          'وقوع تقرير المخاطر في يد مهاجم خارجي يمنحه «دليل اختراق جاهزاً» لأخطر نقاط الضعف في المنظمة.',
          'يرث تقرير المخاطر على الأقل مستوى سرية الأصل المعلوماتي الذي يقيّمه، ويُصنف عادةً «سري» أو «سري للغاية».',
          'يُحصر توزيع النسخ الكاملة (مع الملاحق) في المعنيين المخولين، مع تشفير النسخ الإلكترونية وضبط حيازة الورقية.'
        ],
        keyHighlight: 'تقرير تحليل المخاطر هو نفسه أصل معلوماتي فائق الحساسية يجب حمايته بضوابط سرية صارمة أثناء الإعداد والتداول والحفظ.',
        diagramTitle: 'ضوابط حماية سرية تقرير وسجل المخاطر المؤسسي'
      }
    ],
    flashcards: [
      {
        front: 'قارن بين الملخص التنفيذي والملحق التحليلي من حيث الجمهور والمحتوى.',
        back: 'الملخص التنفيذي يوجه للقيادة العليا في صفحة واحدة بلغة الأعمال ومجالات الأثر والقرار المطلوب، أما الملحق التحليلي فيوجه للمختصين والمدققين ويضم أوراق العمل الكاملة وتفاصيل الحاويات.',
        category: 'بنية التقرير'
      },
      {
        front: 'ما هي العناصر الستة التي تجعل التوصية واضحة ومكتملة في تقرير المخاطر؟',
        back: '1) الخطر المعني، 2) القرار المطلوب، 3) الحاوية المستهدفة، 4) الضوابط المقترحة، 5) المسؤول عن التنفيذ، 6) المخاطر المتبقية المطلوب قبولها.',
        category: 'صياغة التوصيات'
      },
      {
        front: 'ما الفرق بين التوصية (Recommendation) وخطة المعالجة (Mitigation Plan)؟',
        back: 'التوصية تحدد الإجراء والضابط المقترح لمعالجة الخطر، بينما تحول خطة المعالجة تلك التوصية إلى خطوات تنفيذية بجدول زمني وموارد ومسؤوليات ومؤشرات متابعة.',
        category: 'التوصيات والخطط'
      },
      {
        front: 'أين تقع المخاطر المتبقية في تقرير تحليل المخاطر، ولماذا تُذكر بعد الضوابط؟',
        back: 'تقع بعد قسم التوصيات والضوابط المقترحة؛ لأنها تمثل ما يتبقى من الخطر بعد تطبيق تلك الضوابط، فيجب معرفة الضابط أولاً لتقدير ما يتبقى بعده.',
        category: 'المخاطر المتبقية'
      },
      {
        front: 'ما المقصود باعتماد التقرير (Report Approval)، وما الأمران اللذان تعتمدهما المؤسسة فيه؟',
        back: 'اعتماد التقرير هو القرار الرسمي للمؤسسة بالموافقة على ما ورد فيه، وتعتمد فيه أمرين: 1) التوصيات وخطط المعالجة، 2) المخاطر المتبقية.',
        category: 'حوكمة الاعتماد'
      },
      {
        front: 'وضح العلاقة بين سرية تقرير المخاطر ومتطلب السرية للأصل المعلوماتي.',
        back: 'يكتسب تقرير المخاطر حساسية وسرية لا تقل عن سرية الأصل المعلوماتي نفسه؛ لأنه يكشف مواضع الأصول وحاوياتها وثغراتها، فإفشاؤه يعرض الأصل للخطر المباشر.',
        category: 'أمن التقارير'
      }
    ],
    miniQuiz: [
      {
        question: 'لماذا يُفضّل التعبير عن المخاطر بلغة «مجالات التأثير» (كالسمعة والمالي والإنتاجية والغرامات) عند عرض التقرير على صاحب قرار غير تقني؟',
        options: [
          'لأن مجالات التأثير تربط الخطر مباشرةً بأهداف المؤسسة ورسالتها التي يديرها صاحب القرار، خلافاً للتفاصيل التقنية المجردة',
          'لإخفاء وجود ثغرات في الشبكة',
          'لأن المعايير الدولية تمنع ذكر أسماء الأنظمة في الملاحق',
          'لأن صاحب القرار لا يهتم بميزانية المؤسسة'
        ],
        correctIndex: 0,
        explanation: 'صاحب القرار التنفيذي يقيس الأمور بأثرها على رسالة المؤسسة وسمعتها وماليتها؛ ولذلك صُممت مجالات الأثر لترجمة المخاطر التقنية إلى لغة الأعمال.'
      },
      {
        question: 'عندما يوقع رئيس الجهة أو صاحب الصلاحية على «اعتماد تقرير تحليل المخاطر»، فما الذي يعتمده رسمياً بهذا التوقيع؟',
        options: [
          'يعتمد أمرين معاً: التوصيات المقترحة للمعالجة، والمخاطر المتبقية بعد تطبيق الضوابط',
          'يعتمد أسماء أعضاء فريق التقييم فقط',
          'يعتمد إلغاء جميع الضوابط الأمنية السابقة',
          'يعتمد نقل المسؤولية القانونية إلى قسم السكرتارية'
        ],
        correctIndex: 0,
        explanation: 'اعتماد تقرير المخاطر يعني الموافقة الرسمية المزدوجة على تنفيذ التوصيات وقبول المخاطر المتبقية المترتبة عليها.'
      },
      {
        question: 'لماذا يجب ذكر «الافتراضات والقيود» (Assumptions & Constraints) صراحةً في متن تقرير تحليل المخاطر؟',
        options: [
          'لأنها توضح الحدود التي أُجري التقييم ضمنها (مثل عدم فحص فرع خارجي أو الاعتماد على تقديرات أولية)، فلا يُبنى قرار يتجاوز حدود دقة التقرير',
          'لزيادة عدد صفحات التقرير فقط',
          'لإعفاء الفريق من كتابة التوصيات',
          'لأنها تحل محل سجل المخاطر'
        ],
        correctIndex: 0,
        explanation: 'التصريح بالافتراضات والقيود يضمن الشفافية العلمية ويمنع متخذ القرار من تعميم نتائج التقرير خارج نطاقها الفعلي.'
      },
      {
        question: 'ما التصنيف الأمني الصحيح لتقرير تحليل مخاطر يفصل ثغرات وحاويات «قاعدة بيانات سرية للغاية»؟',
        options: [
          'وثيقة عامة تُنشر على الموقع الإلكتروني للمؤسسة',
          'وثيقة سرية للغاية تحمى بضوابط سرية توازي أو تفوق سرية الأصل المعلوماتي المدروس',
          'وثيقة غير مهمة تُتلف دون ضوابط',
          'وثيقة تسويقية توزع على الموردين كافة'
        ],
        correctIndex: 1,
        explanation: 'تقرير المخاطر يكشف نقاط الضعف والحاويات والثغرات الخاصة بالأصل، ولذلك يرث متطلب السرية الخاص بالأصل بل ويتطلب ضبط وصول صارماً.'
      }
    ],
    interactiveBook3D: {
      model3DType: 'executive_risk_register_vault',
      shaderEffect: 'executive_crystal_refraction',
      ambientColor: '#0f172a',
      accentColor: '#a855f7',
      autoRotateSpeed: 1.0,
      pages3D: [
        {
          pageNumber: 1,
          spreadSide: 'right',
          title: 'خزانة سجل المخاطر المؤسسي والملخص التنفيذي ثلاثي الأبعاد',
          subtitle: 'هيكلة التقرير من الصفحة التنفيذية الواحدة إلى الملاحق الفنية',
          summaryMarkdown: 'يمثل المجسم ثلاثي الأبعاد **هرم التوثيق التنفيذي**: في قمته البلورية **الملخص التنفيذي** الموجه للقيادة العليا، وفي قلبه **سجل المخاطر والمصفوفة والتوصيات الست**، وفي قاعدته المدرعة **الملاحق التحليلية وأوراق العمل (1–10)**.',
          interactiveFormula: 'Report_SignOff = Approve(Recommendations_Plan) ∧ Accept(Residual_Risks)',
          labParameterName: 'مستوى اكتمال العناصر الستة للتوصية في التقرير',
          labMin: 1,
          labMax: 6,
          labDefault: 6,
          labUnit: 'عناصر مكتملة',
          labInterpretation: {
            1: 'عنصر واحد (ذكر الخطر فقط): توصية مبهمة غير قابلة للتنفيذ.',
            2: 'عنصران (الخطر + القرار العام): غياب تحديد الحاوية والضابط والمسؤول.',
            3: 'ثلاثة عناصر (الخطر + القرار + الحاوية): نصف مكتملة، تفتقر لتحديد الضابط والمسؤول.',
            4: 'أربعة عناصر (+ الضوابط): جيدة تقنياً لكن بلا مالك مسؤول عن التنفيذ.',
            5: 'خمسة عناصر (+ المسؤول): ينقصها فقط تحديد الخطر المتبقي المطلوب قبوله.',
            6: 'ستة عناصر مكتملة (الخطر، القرار، الحاوية، الضوابط، المسؤول، الخطر المتبقي): جاهزة للاعتماد التنفيذي!'
          },
          challengeQuestion: {
            question: 'أي من الصياغات التالية تمثل «توصية مكتملة الأركان الستة» في الملخص التنفيذي لتقرير مخاطر؟',
            options: [
              'لمعالجة خطر تزوير الفواتير (درجة 37)، نوصي بـ«تخفيف الخطر» على «الحاوية التقنية (نظام PBMS) والحاوية البشرية» عبر «تفعيل تدقيق المعاملات وفصل المهام»، ويتولى التنفيذ «مدير تقنية المعلومات ومدير المالية»، مع قبول «الخطر المتبقي المنخفض (تواطؤ موظفين معاً)»',
              'نوصي بتحسين أمن نظام الفواتير في أسرع وقت ممكن',
              'يوجد خطر بدرجة 37 في المستشفى ويجب الحذر منه',
              'نوصي بشراء برامج حماية جديدة'
            ],
            correctIndex: 0,
            feedbackCorrect: 'إجابة مثالية! جمعت الصياغة الأولى العناصر الستة كاملة: الخطر، القرار، الحاوية، الضوابط، المسؤول، والخطر المتبقي.',
            feedbackWrong: 'ابحث عن الصياغة التي تشتمل على العناصر الستة: الخطر المعني، القرار، الحاوية، الضوابط، المسؤول، والمخاطر المتبقية.'
          },
          aiTutorGuardrailTopics: ['تقرير تحليل المخاطر', 'الملخص التنفيذي', 'سجل المخاطر', 'التوصيات الست', 'خطة المعالجة', 'اعتماد التقرير', 'سرية التقرير']
        },
        {
          pageNumber: 2,
          spreadSide: 'left',
          title: 'مختبر صياغة الملخص التنفيذي وقرار الاعتماد المزدوج',
          subtitle: 'محاكاة عرض التقرير على مجلس الإدارة ولجنة الأمن السيبراني',
          summaryMarkdown: 'في الصفحة اليسرى، تصمم **الملخص التنفيذي ذا الصفحة الواحدة** الموجه لصاحب الصلاحية، وتتأكد من تضمين التوصيات لمكوناتها الستة، ووضع **المخاطر المتبقية** بعد الضوابط مباشرةً للحصول على **الاعتماد المزدوج**.',
          interactiveFormula: 'Executive_Clarity = Impact_Areas_Language + 6_Element_Rec + Residual_Risk_Disclosure',
          labParameterName: 'ملاءمة لغة العرض للجمهور المستهدف (1=تقني معقد .. 5=تنفيذي واضح)',
          labMin: 1,
          labMax: 5,
          labDefault: 5,
          labUnit: 'درجة وضوح تنفيذي',
          labInterpretation: {
            1: 'لغة تقنية مفرطة (أكواد وثغرات برمجية بلا أثر أعمال): تعذر اتخاذ القرار من القيادة.',
            2: 'عرض السجل الخام (مئات الأسطر) دون ملخص تنفيذي: تشتت انتباه صاحب القرار.',
            3: 'ملخص عام يذكر المخاطر دون تحديد القرار المطلوب أو المسؤول عن التنفيذ.',
            4: 'ملخص تنفيذي جيد يعرض أعلى المخاطر والضوابط، مع إحالة التفاصيل للملاحق.',
            5: 'ملخص تنفيذي احترافي (صفحة واحدة): الأصل، أعلى 3 مخاطر، القرار، الحاوية والضابط، المسؤول، والخطر المتبقي.'
          },
          challengeQuestion: {
            question: 'لماذا تُذكر «المخاطر المتبقية» في تقرير تحليل المخاطر بعد عرض التوصيات والضوابط المقترحة لا قبلها؟',
            options: [
              'لأن المخاطر المتبقية هي ما سيبقى من الخطر بعد تطبيق تلك الضوابط المقترحة، فيجب أن يعرف صاحب القرار الضابط أولاً ليحكم هل يقبل ما يتبقى بعده أم لا',
              'لأن المخاطر المتبقية غير مهمة فتوضع في الهامش',
              'لأن المخاطر المتبقية تساوي المخاطر الكامنة دائماً',
              'بسبب ترتيب أبجدي عشوائي'
            ],
            correctIndex: 0,
            feedbackCorrect: 'إجابة دقيقة! المخاطر المتبقية نتيجة مباشرة لتطبيق الضوابط المقترحة، فلا معنى لعرضها قبل بيان الضوابط التي خفضت الخطر الكامن.',
            feedbackWrong: 'تذكر أن الخطر المتبقي ينتج بعد طرح أثر الضوابط من الخطر الكامن، ولذلك يُعرض بعد الضوابط المقترحة.'
          },
          aiTutorGuardrailTopics: ['الملخص التنفيذي', 'موقع المخاطر المتبقية', 'اعتماد التقرير', 'مخاطبة الجمهور غير التقني']
        }
      ],
      stepByStep: [
        {
          stepNumber: 1,
          title: 'الخطوة 1: تأطير الهدف والنطاق والمنهجية والافتراضات (الأقسام 1–4)',
          description: 'تثبيت حدود التقرير والمنهجية المتبعة والافتراضات والقيود لضمان قراءة النتائج في سياقها الصحيح.',
          formulaOrRule: 'Sections 1..4 → Scope + Methodology + Assumptions & Constraints',
          visualState: 'report_foundation_active',
          cameraFocus: { x: -2.0, y: 1.5, z: 3.0 }
        },
        {
          stepNumber: 2,
          title: 'الخطوة 2: بناء سجل المخاطر والمصفوفة وترتيب الأولويات (الأقسام 5–9)',
          description: 'تجميع السيناريوهات والأدلة وفرز المخاطر تنازلياً حسب الدرجة النسبية والمجموعة في سجل المخاطر.',
          formulaOrRule: 'Sections 5..9 → Prioritized Risk Register & Matrix',
          visualState: 'risk_register_core_active',
          cameraFocus: { x: 0.0, y: 1.0, z: 3.2 }
        },
        {
          stepNumber: 3,
          title: 'الخطوة 3: صياغة التوصيات الست وخطة المعالجة والمخاطر المتبقية (الأقسام 10–12)',
          description: 'تحديد القرار والضوابط لكل حاوية والجدول الزمني للتنفيذ ومقدار الخطر المتبقي بعد الضوابط.',
          formulaOrRule: 'Sections 10..12 → 6-Element Recommendations + Action Plan + Residual Risk',
          visualState: 'recommendations_tier_glowing',
          cameraFocus: { x: 2.0, y: 1.0, z: 3.0 }
        },
        {
          stepNumber: 4,
          title: 'الخطوة 4: استخلاص الملخص التنفيذي واعتماد التقرير وتأمين الملاحق (القسم 13)',
          description: 'تقديم صفحة الملخص التنفيذي للقيادة العليا لتوقيع الاعتماد المزدوج، مع حفظ أوراق العمل في الملاحق السرية.',
          formulaOrRule: 'Executive Summary (1 Page) + Appendices (Worksheets 1–10) → Formal Sign-Off',
          visualState: 'crystal_capstone_approved',
          cameraFocus: { x: 0.0, y: 2.0, z: 3.4 }
        }
      ],
      hotspots: [
        {
          id: 'hs-ch9-execsummary',
          label: 'قمة الملخص التنفيذي (Executive Summary)',
          x: 0.0,
          y: 1.8,
          z: 0.6,
          coordinates: { x: 0.0, y: 1.8, z: 0.6 },
          title: 'الملخص التنفيذي ذو الصفحة الواحدة للقيادة العليا',
          detailedExplanation: 'يلخص بلغة الأعمال غير التقنية: الأصل الحرج، أعلى 3 مخاطر بدرجاتها، القرار المطلوب، الحاوية والضوابط، المسؤول، والمخاطر المتبقية.',
          technicalMetric: '1-Page Executive Brief (Non-Technical Impact Language)',
          securityImpact: 'حرج جداً',
          relatedControl: 'NCA ECC-2:2024 — رفع تقارير المخاطر للإدارة العليا ولجنة الإشراف'
        },
        {
          id: 'hs-ch9-recommendation',
          label: 'مصفوفة التوصيات الست وخطة المعالجة',
          x: -1.8,
          y: 0.2,
          z: 0.5,
          coordinates: { x: -1.8, y: 0.2, z: 0.5 },
          title: 'العناصر الستة للتوصية القابلة للتنفيذ وخطة المعالجة',
          detailedExplanation: 'تربط كل خطر بقرار واضح وضابط محدد على الحاوية ومسؤول تنفيذي وخطر متبقٍ، ثم تفصل الجدول الزمني والميزانية في خطة المعالجة.',
          technicalMetric: 'Risk + Decision + Container + Control + Owner + Residual',
          securityImpact: 'حرج جداً',
          relatedControl: 'ISO/IEC 27005:2022 — Risk Treatment Plan (RTP)'
        },
        {
          id: 'hs-ch9-signoff',
          label: 'بوابة الاعتماد المزدوج (Report Approval)',
          x: 1.8,
          y: 0.2,
          z: 0.5,
          coordinates: { x: 1.8, y: 0.2, z: 0.5 },
          title: 'اعتماد التوصيات وقبول المخاطر المتبقية',
          detailedExplanation: 'يمثل التوقيع الرسمي من صاحب الصلاحية التزاماً بتوفير موارد خطة المعالجة وإقراراً بقبول المخاطر المتبقية المترتبة عليها.',
          technicalMetric: 'Dual Sign-Off: Recommendations + Residual Risk Acceptance',
          securityImpact: 'حرج جداً',
          relatedControl: 'NIST SP 800-30 Rev.1 Step 3 — Communicate Results'
        },
        {
          id: 'hs-ch9-appendices',
          label: 'قبو الملاحق السرية (Confidential Appendices)',
          x: 0.0,
          y: -1.6,
          z: 0.5,
          coordinates: { x: 0.0, y: -1.6, z: 0.5 },
          title: 'الملاحق التحليلية وأوراق العمل الكاملة وضوابط سرية التقرير',
          detailedExplanation: 'تضم أوراق العمل (1–10) وخرائط الحاويات وتفاصيل الثغرات للمختصين والمدققين، وتُحمى بدرجة سرية الأصل المعلوماتي.',
          technicalMetric: 'Worksheets 1–10 Archive (Classified Security Level)',
          securityImpact: 'مرتفع',
          relatedControl: 'NCA ECC-2:2024 — حماية الوثائق المصنفة وتقارير التدقيق'
        }
      ]
    },
    richData: {
      id: 209,
      chapter_number: 9,
      title: 'إعداد وتوثيق تقارير المخاطر التنفيذية وسجل المخاطر المؤسسي',
      subtitle: 'مكونات التقرير، الملخص التنفيذي، التوصيات، واعتماد المخاطر المتبقية',
      category: 'متقدم',
      pdfStartPage: 98,
      pdfEndPage: 107,
      description: 'دليل شامل لإعداد تقارير تحليل المخاطر الاحترافية والملخص التنفيذي وسجل المخاطر المؤسسي.',
      objectives: [
        'تعداد مكونات تقرير تحليل المخاطر الثلاثة عشر وتحديد نطاقه.',
        'المقارنة بين الملخص التنفيذي والملحق التحليلي وتكييف العرض للجمهور المستهدف.',
        'صياغة توصيات مكتملة العناصر الستة والتمييز بين التوصية وخطة المعالجة.',
        'توضيح مفهوم اعتماد التقرير وسريته وموقع المخاطر المتبقية فيه.'
      ],
      sections: [
        {
          heading: '1. بنية تقرير المخاطر والملخص التنفيذي',
          content: 'يتكون التقرير من 13 قسماً، يتصدرها ملخص تنفيذي من صفحة واحدة للقيادة العليا، وتختتمها ملاحق تفصيلية للتقنيين.',
          formula: 'Recommendation = (Risk, Decision, Container, Control, Owner, Residual_Risk)',
          saudiExample: 'رفع ملخص تنفيذي للجنة الأمن السيبراني في وزارة سعودية يتضمن أعلى المخاطر والقرار المطلوب واعتماد المخاطر المتبقية.'
        }
      ],
      tables: [
        {
          title: 'مقارنة الملخص التنفيذي بالملحق التحليلي',
          headers: ['وجه المقارنة', 'الملخص التنفيذي (Executive Summary)', 'الملحق التحليلي (Analytical Appendix)'],
          rows: [
            ['الجمهور المستهدف', 'الإدارة العليا وأصحاب الصلاحية', 'فريق تقنية المعلومات والأمن والمدققون'],
            ['الحجم واللغة', 'صفحة واحدة بلغة الأعمال ومجالات الأثر', 'مفصل يضم جميع أوراق العمل والجداول التقنية'],
            ['التركيز', 'أعلى المخاطر، القرار المطلوب، والمخاطر المتبقية', 'الأدلة، خرائط الحاويات، وتفاصيل الحسابات']
          ]
        }
      ],
      commonMistake: {
        mistake: 'تقديم تقرير واحد مكدس بالتفاصيل التقنية المعقدة لمجلس الإدارة دون ملخص تنفيذي، أو إغفال ذكر المخاطر المتبقية.',
        fix: 'كتابة ملخص تنفيذي غير تقني في صفحة واحدة، ووضع التفاصيل في الملاحق، وتحديد المخاطر المتبقية بعد كل ضابط مقترح.'
      },
      solvedExamples: [
        {
          title: 'صياغة فقرة توصية مكتملة العناصر الستة في تقرير المخاطر',
          given: 'خطر فقدان أشرطة النسخ الاحتياطي (درجة 31، المجموعة 1) على الحاوية المادية الخارجية.',
          steps: [
            '1) الخطر المعني: فقدان أو سرقة أشرطة النسخ الاحتياطي الليلية (درجة 31).',
            '2) القرار المطلوب: التخفيف (Mitigate).',
            '3) الحاوية المستهدفة: الحاوية المادية الخارجية والداخلية (أشرطة النسخ الاحتياطي).',
            '4) الضوابط المقترحة: تشفير الأشرطة قبل النقل + إنشاء نسختين وحفظ إحداهما في موقع بديل.',
            '5) المسؤول عن التنفيذ: مدير تقنية المعلومات.',
            '6) المخاطر المتبقية المطلوب قبولها: احتمال ضئيل لتلف النسختين معاً في كارثة إقليمية شاملة.'
          ],
          result: 'توصية تنفيذية مكتملة الأركان جاهزة لتوقيع الاعتماد.',
          whyItMatters: 'تمنح صاحب القرار كل ما يحتاجه للموافقة الفورية والمساءلة اللاحقة.'
        }
      ],
      selfAssessment: [
        {
          question: 'عرّف اعتماد التقرير، وبيّن ما الذي تعتمده المؤسسة فيه.',
          answer: 'اعتماد التقرير هو قرار المؤسسة الرسمي بالموافقة على ما ورد فيه، وتعتمد فيه أمرين: التوصيات، والمخاطر المتبقية.'
        }
      ],
      quiz: [
      {
        question: 'لماذا يُفضّل التعبير عن المخاطر بلغة «مجالات التأثير» (كالسمعة والمالي والإنتاجية والغرامات) عند عرض التقرير على صاحب قرار غير تقني؟',
        options: [
          'لأن مجالات التأثير تربط الخطر مباشرةً بأهداف المؤسسة ورسالتها التي يديرها صاحب القرار، خلافاً للتفاصيل التقنية المجردة',
          'لإخفاء وجود ثغرات في الشبكة',
          'لأن المعايير الدولية تمنع ذكر أسماء الأنظمة في الملاحق',
          'لأن صاحب القرار لا يهتم بميزانية المؤسسة'
        ],
        correctIndex: 0,
        explanation: 'صاحب القرار التنفيذي يقيس الأمور بأثرها على رسالة المؤسسة وسمعتها وماليتها؛ ولذلك صُممت مجالات الأثر لترجمة المخاطر التقنية إلى لغة الأعمال.'
      },
      {
        question: 'عندما يوقع رئيس الجهة أو صاحب الصلاحية على «اعتماد تقرير تحليل المخاطر»، فما الذي يعتمده رسمياً بهذا التوقيع؟',
        options: [
          'يعتمد أمرين معاً: التوصيات المقترحة للمعالجة، والمخاطر المتبقية بعد تطبيق الضوابط',
          'يعتمد أسماء أعضاء فريق التقييم فقط',
          'يعتمد إلغاء جميع الضوابط الأمنية السابقة',
          'يعتمد نقل المسؤولية القانونية إلى قسم السكرتارية'
        ],
        correctIndex: 0,
        explanation: 'اعتماد تقرير المخاطر يعني الموافقة الرسمية المزدوجة على تنفيذ التوصيات وقبول المخاطر المتبقية المترتبة عليها.'
      },
      {
        question: 'لماذا يجب ذكر «الافتراضات والقيود» (Assumptions & Constraints) صراحةً في متن تقرير تحليل المخاطر؟',
        options: [
          'لأنها توضح الحدود التي أُجري التقييم ضمنها (مثل عدم فحص فرع خارجي أو الاعتماد على تقديرات أولية)، فلا يُبنى قرار يتجاوز حدود دقة التقرير',
          'لزيادة عدد صفحات التقرير فقط',
          'لإعفاء الفريق من كتابة التوصيات',
          'لأنها تحل محل سجل المخاطر'
        ],
        correctIndex: 0,
        explanation: 'التصريح بالافتراضات والقيود يضمن الشفافية العلمية ويمنع متخذ القرار من تعميم نتائج التقرير خارج نطاقها الفعلي.'
      },
      {
        question: 'ما التصنيف الأمني الصحيح لتقرير تحليل مخاطر يفصل ثغرات وحاويات «قاعدة بيانات سرية للغاية»؟',
        options: [
          'وثيقة عامة تُنشر على الموقع الإلكتروني للمؤسسة',
          'وثيقة سرية للغاية تحمى بضوابط سرية توازي أو تفوق سرية الأصل المعلوماتي المدروس',
          'وثيقة غير مهمة تُتلف دون ضوابط',
          'وثيقة تسويقية توزع على الموردين كافة'
        ],
        correctIndex: 1,
        explanation: 'تقرير المخاطر يكشف نقاط الضعف والحاويات والثغرات الخاصة بالأصل، ولذلك يرث متطلب السرية الخاص بالأصل بل ويتطلب ضبط وصول صارماً.'
      }
    ],
      flashcards: [
      {
        front: 'قارن بين الملخص التنفيذي والملحق التحليلي من حيث الجمهور والمحتوى.',
        back: 'الملخص التنفيذي يوجه للقيادة العليا في صفحة واحدة بلغة الأعمال ومجالات الأثر والقرار المطلوب، أما الملحق التحليلي فيوجه للمختصين والمدققين ويضم أوراق العمل الكاملة وتفاصيل الحاويات.',
        category: 'بنية التقرير'
      },
      {
        front: 'ما هي العناصر الستة التي تجعل التوصية واضحة ومكتملة في تقرير المخاطر؟',
        back: '1) الخطر المعني، 2) القرار المطلوب، 3) الحاوية المستهدفة، 4) الضوابط المقترحة، 5) المسؤول عن التنفيذ، 6) المخاطر المتبقية المطلوب قبولها.',
        category: 'صياغة التوصيات'
      },
      {
        front: 'ما الفرق بين التوصية (Recommendation) وخطة المعالجة (Mitigation Plan)؟',
        back: 'التوصية تحدد الإجراء والضابط المقترح لمعالجة الخطر، بينما تحول خطة المعالجة تلك التوصية إلى خطوات تنفيذية بجدول زمني وموارد ومسؤوليات ومؤشرات متابعة.',
        category: 'التوصيات والخطط'
      },
      {
        front: 'أين تقع المخاطر المتبقية في تقرير تحليل المخاطر، ولماذا تُذكر بعد الضوابط؟',
        back: 'تقع بعد قسم التوصيات والضوابط المقترحة؛ لأنها تمثل ما يتبقى من الخطر بعد تطبيق تلك الضوابط، فيجب معرفة الضابط أولاً لتقدير ما يتبقى بعده.',
        category: 'المخاطر المتبقية'
      },
      {
        front: 'ما المقصود باعتماد التقرير (Report Approval)، وما الأمران اللذان تعتمدهما المؤسسة فيه؟',
        back: 'اعتماد التقرير هو القرار الرسمي للمؤسسة بالموافقة على ما ورد فيه، وتعتمد فيه أمرين: 1) التوصيات وخطط المعالجة، 2) المخاطر المتبقية.',
        category: 'حوكمة الاعتماد'
      },
      {
        front: 'وضح العلاقة بين سرية تقرير المخاطر ومتطلب السرية للأصل المعلوماتي.',
        back: 'يكتسب تقرير المخاطر حساسية وسرية لا تقل عن سرية الأصل المعلوماتي نفسه؛ لأنه يكشف مواضع الأصول وحاوياتها وثغراتها، فإفشاؤه يعرض الأصل للخطر المباشر.',
        category: 'أمن التقارير'
      }
    ]
    },
    updated_at: NOW_TIMESTAMP
  },

  // =========================================================================
  // الفصل العاشر: دراسات حالة تطبيقية شاملة في تحليل المخاطر (حالة PBCD)
  // =========================================================================
  {
    id: 210,
    chapter_number: 10,
    title: 'دراسات حالة تطبيقية شاملة في تحليل المخاطر (حالة PBCD والمؤسسات المالية والصحية)',
    subtitle: 'التطبيق الكامل لمنهجية OCTAVE Allegro على أصل بيانات فوترة المرضى وتحصيلها (PBCD) والسيناريوهات الثمانية',
    description: 'دراسة حالة تطبيقية شاملة ومتكاملة من واقع القطاع الصحي والمالي تطبق جميع خطوات منهجية OCTAVE Allegro على الأصل الحرج «بيانات فوترة المرضى وتحصيلها (PBCD)»، بدءاً من معايرة مجالات الأثر الستة وملف الأصل وخريطة حاوياته، وصولاً إلى تحليل السيناريوهات الثمانية وحساب درجاتها النسبية وقرارات معالجتها والمخاطر المتبقية.',
    category: 'دراسات حالة تطبيقية',
    difficulty: 'advanced',
    pdfStartPage: 108,
    pdfEndPage: 118,
    diagramKey: 'ise232-risk-10',
    videoUrl: 'https://www.youtube.com/watch?v=8kVXKyGOYsY',
    videoDuration: '28:15',
    presentationUrl: '/presentations/ise232-risk-ch10.pdf',
    keyTopics: [
      'تحديد نطاق دراسة حالة المستشفى والأصل المعلوماتي الحرج: بيانات فوترة المرضى وتحصيلها (PBCD)',
      'ترتيب أولويات مجالات الأثر الستة في المستشفى ومعايرة حدودها الفاصلة (تكاليف التشغيل والغرامات)',
      'ملف الأصل PBCD: المالك، مكونات البيانات، ولماذا تُعد «السلامة/التكامل (Integrity)» أهم متطلب أمني له',
      'خريطة حاويات الأصل PBCD الست (تقنية داخلية/خارجية، مادية داخلية/خارجية، بشرية داخلية/خارجية)',
      'التحليل الكامل للسيناريوهات الثمانية لأصل PBCD (الدرجات النسبية من 15 إلى 37 وقرارات المعالجة)',
      'تحليل الفجوات والضوابط والمخاطر المتبقية وحوكمة القرار في دراسة الحالة',
    ],
    images: [
      {
        prompt: 'Hospital PBCD Patient Billing and Collection Data case study architecture containers and 8 threat scenarios, 16:9',
        caption: 'معمارية دراسة حالة بيانات فوترة المرضى وتحصيلها (PBCD): الحاويات الست والسيناريوهات الثمانية',
        alt: 'Hospital PBCD case study 8 scenarios',
        seed: 2101,
        isAIGenerated: true,
      },
      {
        prompt: 'Financial and healthcare risk register comparison table showing relative risk scores and mitigation controls, 16:9',
        caption: 'مقارنة درجات الخطر النسبية وقرارات المعالجة والضوابط في دراسة حالة المستشفى والمؤسسات المالية',
        alt: 'PBCD risk register and mitigation decisions',
        seed: 2102,
        isAIGenerated: true,
      },
    ],
    content: `## 10.1 سياق دراسة الحالة الشاملة: بيانات فوترة المرضى وتحصيلها (PBCD)

تطبق هذه الدراسة جميع خطوات **OCTAVE Allegro** على مستشفى يعتمد في استدامته المالية والتشغيلية على دقة الفواتير الطبية ومطالبات شركات التأمين.

### أولاً: نطاق التقييم والأصل الحرج (PBCD)
- **الأصل المعلوماتي الحرج**: **بيانات فوترة المرضى وتحصيلها ($\text{PBCD}$ — Patient Billing and Collection Data)**، ويضم ثلاثة مكونات:
  1. البيانات الديموغرافية للمرضى (الأسماء، العناوين، أرقام الهوية/الضمان، وبيانات شركات التأمين).
  2. سجل الخدمات والإجراءات الطبية المقدمة ورموز الفوترة ($\text{Billing Codes}$).
  3. سجلات الدفع والتحصيل والمطالبات المالية.
- **ما يُستبعد من النطاق**: السجلات السريرية والتشخيصية التفصيلية التي لا تدخل في نظام الفوترة.
- **مالك الأصل (Asset Owner)**: مدير فواتير المرضى ($\text{Director of Patient Billing}$).
- **مسوغ الأهمية وأهم متطلب أمني**: دقة بيانات الفوترة هي الأساس المالي للمستشفى وللتفاوض مع شركات التأمين؛ ولذلك فإن **السلامة/التكامل ($\text{Integrity}$) هي أهم متطلب أمني** للأصل $\text{PBCD}$ (لأن تعديل رموز الفوترة يسبب خسائر مالية وغرامات احتيال تأميني جسيمة).

---

## 10.2 ترتيب أولويات مجالات الأثر الستة ومعايرتها في المستشفى

اعتمدت المستشفى ستة مجالات أثر (رتبتها من **1 = الأقل أهمية** إلى **6 = الأعلى أهمية**، بحيث يكون مجموع الرتب $1+2+3+4+5+6 = 21$ وأعلى درجة ممكنة $3 \times 21 = 63$، أو بنظام الرتب الخمس المعيارية في التمرين التطبيقي):

| مجال الأثر | الحدود الفاصلة للأثر المنخفض (1) | الحدود الفاصلة للأثر المتوسط (2) | الحدود الفاصلة للأثر المرتفع (3) |
| :--- | :--- | :--- | :--- |
| **المالي (تكاليف التشغيل)** | زيادة أقل من $2.5\%$ في التكاليف السنوية | زيادة بين $2.5\%$ و $5\%$ في التكاليف السنوية | زيادة أكثر من $5\%$ في التكاليف السنوية |
| **السمعة وثقة العملاء** | تضرر محدود داخل القسم فقط | تغطية إعلامية محلية سلبية مؤقتة | فقدان ثقة الجمهور وشركات التأمين على نطاق واسع |
| **الإنتاجية** | تأخر طفيف يُعوض خلال ساعات العمل | تعطل الفوترة لعدة أيام وتراكم المعاملات | توقف كامل لعمليات الفوترة والتحصيل لأكثر من أسبوع |
| **الغرامات والعقوبات** | غرامات أقل من $10,000\text{ USD}$ | غرامات بين $10,000$ و $100,000\text{ USD}$ | غرامات تتجاوز $100,000\text{ USD}$ أو ملاحقة قضائية |
| **السلامة والصحة** | لا يوجد ضرر جسدي | إجهاد أو أثر صحي طفيف قابل للعلاج الفوري | خطر يهدد حياة المرضى أو سلامتهم الجسدية |

---

## 10.3 خريطة حاويات الأصل PBCD (الداخلية والخارجية)

| فئة الحاوية | الحاويات الداخلية (Internal Containers) | الحاويات الخارجية (External Containers) |
| :--- | :--- | :--- |
| **الحاويات التقنية (9a)** | نظام إدارة فواتير المرضى ($\text{PBMS}$) العامل على خادم **Windows Server**، الشبكة الداخلية ($\text{LAN}$)، ومحطات عمل الموظفين | شبكة الإنترنت وقنوات الإرسال الإلكتروني للفواتير إلى شركات التأمين |
| **الحاويات المادية (9b)** | النسخ الورقية المطبوعة في القسم المالي، وأشرطة النسخ الاحتياطي الليلية أثناء وجودها بالمستشفى | كشوف الفواتير الورقية المرسلة بالبريد للمرضى، وأشرطة النسخ الاحتياطي المحفوظة خارج الموقع لدى مورد خارجي |
| **الحاويات البشرية (9c)** | موظفو مكتب الدخول والتسجيل، وموظفو القسم المالي والمحاسبة | موظفو شركات التأمين الصحي، وموظفو شركة نقل وحفظ أشرطة النسخ الاحتياطي |

---

## 10.4 التحليل التفصيلي للسيناريوهات الثمانية في دراسة حالة PBCD

يوضح الجدول المرجعي التالي السيناريوهات الثمانية التي خلص إليها فريق التقييم لأصل $\text{PBCD}$، ودرجة الخطر النسبية لكل منها، والضوابط القائمة، وفجوات الضوابط، وقرار المعالجة النهائي:

| # | سيناريو التهديد والحاوية | النتيجة والمتطلب المنتهك | الاحتمالية والدرجة النسبية | الضابط القائم وفجوة الضابط | القرار والضوابط المقترحة والمخاطر المتبقية |
| :---: | :--- | :--- | :---: | :--- | :--- |
| **1** | مهاجم يستغل ثغرة في نظام تشغيل خادم **PBMS** لتعديل البيانات (تقنية داخلية) | **تعديل**<br>(التكامل) | متوسطة<br>**الدرجة: 30** | فحص ثغرات دوري، لكن **الفجوة**: تأخر تثبيت التحديثات الأمنية | **تخفيف**: جدولة صارمة لإدارة التحديثات (Patch Management) وعزل الشبكة |
| **2** | اعتراض بيانات الفواتير أثناء إرسالها عبر الإنترنت لشركات التأمين (تقنية خارجية) | **إفشاء / تعديل**<br>(السرية والتكامل) | منخفضة<br>**الدرجة: 18** | وجود صلاحيات دخول، لكن **الفجوة**: نقل البيانات دون تشفير قناة الاتصال | **تخفيف**: تفعيل تشفير النقل القياسي ($\text{TLS 1.3 / IPsec VPN}$) مع شركات التأمين |
| **3** | هجوم حجب خدمة أو عطل يعيق إرسال الفواتير الإلكترونية (تقنية خارجية/داخلية) | **انقطاع**<br>(التوافر) | متوسطة<br>**الدرجة: 31** | جدار حماية أساسي، لكن **الفجوة**: غياب خط اتصال بديل وخطة استمرارية | **تخفيف**: توفير خط اتصال احتياطي وضوابط حماية ضد $\text{DDoS}$ |
| **4** | اطلاع شخص غير مخول على محطة عمل متروكة قيد التشغيل في مكتب الدخول (بشرية/تقنية داخلية) | **إفشاء**<br>(السرية) | مرتفعة<br>**الدرجة: 20** | كلمات مرور فردية، لكن **الفجوة**: عدم تفعيل القفل التلقائي للشاشة | **تخفيف**: فرض القفل الآلي للشاشة بعد دقيقتين من الخمول وتدريب الموظفين |
| **5** | العثور على نسخ ورقية من كشوف الفواتير في مكاتب غير مقفلة أو سلال المهملات (مادية داخلية) | **إفشاء**<br>(السرية) | متوسطة<br>**الدرجة: 18** | وجود خزائن، لكن **الفجوة**: غياب سياسة المكتب النظيف وإتلاف الورق | **تخفيف**: توفير فراّمات ورق (Shredders) وإلزامية قفل الخزائن نهاية الدوام |
| **6** | فقدان أو سرقة أشرطة النسخ الاحتياطي الليلية أثناء النقل أو الحفظ الخارجي (مادية خارجية) | **فقدان / إفشاء**<br>(التوافر والسرية) | منخفضة<br>**الدرجة: 31** | **الضابط القائم**: نسخ احتياطي ليلي. **الفجوة**: إنشاء مجموعة واحدة فقط بلا تشفير | **تخفيف**: تشفير الأشرطة + إنشاء مجموعتين (واحدة بالموقع وأخرى خارجه) |
| **7** | إرسال كشف فاتورة ورقي بالبريد إلى عنوان مريض خطأ بسبب تشابه الأسماء (مادية/بشرية خارجية) | **إفشاء محدود**<br>(السرية) | منخفضة<br>**الدرجة: 15** | مراجعة يدوية سريعة، والأثر يقتصر على سجل مريض واحد | **تأجيل / قبول**: الدرجة منخفضة (15) والاحتمالية منخفضة؛ يراقب دورياً |
| **8** | موظف داخلي يدخل إجراءات طبية وهمية لم تُنفذ أو يتلاعب بالفوترة (بشرية/تقنية داخلية) | **تعديل**<br>(التكامل) | مرتفعة<br>**الدرجة: 37** | صلاحيات دخول، لكن **الفجوة**: غياب تدقيق المعاملات وفصل المهام | **تخفيف عاجل**: تمكين تدقيق المعاملات (Audit Logs) وفصل المهام ($\text{SoD}$) |

> [!info]
> **تحليل المخاطر المتبقية في السيناريو الثامن (الأعلى خطورة — الدرجة 37)**: بعد تمكين **تدقيق المعاملات (Transaction Auditing)** و**فصل المهام (Segregation of Duties)** بين مدخل الفاتورة ومعتمدها، ينخفض الخطر بشكل كبير، وتنحصر **المخاطر المتبقية** في احتمال «تواطؤ موظفين اثنين معاً أو إدخال خطأ غير مقصود يمر قبل المراجعة الدورية»، وهو خطر متبقٍ منخفض يقع ضمن حدود التحمل.`,
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'تأطير دراسة حالة المستشفى: الأصل الحرج PBCD',
        subtitle: 'بيانات فوترة المرضى وتحصيلها ومسوغ اختيار «التكامل» أهم متطلب أمني',
        bullets: [
          'الأصل الحرج (PBCD): يضم البيانات الديموغرافية، سجل الخدمات ورموز الفوترة، وسجلات الدفع والتحصيل.',
          'تحديد النطاق بدقة: يشمل جميع عمليات وحاويات الفوترة والتحصيل، ويستبعد السجلات السريرية خارج الفوترة.',
          'مالك الأصل: مدير فواتير المرضى، بالتنسيق مع مدير تقنية المعلومات واللجنة الإشرافية.',
          'أهم متطلب أمني هو «التكامل/السلامة (Integrity)» لأن دقة الفواتير هي أساس الإيراد والتفاوض مع شركات التأمين.'
        ],
        keyHighlight: 'اختيار «التكامل» كأهم متطلب أمني لأصل PBCD يفسر لماذا حصلت سيناريوهات التعديل والتزوير على أعلى درجات الخطر!',
        diagramTitle: 'مكونات الأصل المعلوماتي الحرج PBCD ومتطلباته الأمنية'
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'خريطة الحاويات الست لأصل PBCD (تقنية، مادية، بشرية)',
        subtitle: 'تتبع مسار بيانات الفوترة داخل المستشفى وخارجها',
        bullets: [
          'الحاويات التقنية: نظام PBMS على الخادم الداخلي ومحطات العمل (داخلية)، والإنترنت وقنوات التأمين (خارجية).',
          'الحاويات المادية: النسخ الورقية بالقسم المالي وأشرطة النسخ الليلية (داخلية)، وبريد المرضى ومستودع المورد (خارجية).',
          'الحاويات البشرية: موظفو الدخول والمحاسبة (داخلية)، وموظفو شركات التأمين ومورد حفظ الأشرطة (خارجية).',
          'كل حاوية من هذه الحاويات الست ولّدت سيناريو تهديد أو أكثر في ورقة عمل المخاطر.'
        ],
        keyHighlight: 'لولا رسم خريطة الحاويات المادية والبشرية الخارجية لغفل الفريق عن خطر فقدان أشرطة النسخ الاحتياطي لدى المورد!',
        diagramTitle: 'خريطة بيئة خطر الأصل PBCD عبر الحاويات الست'
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'مقارنة السيناريوهات الثمانية ودرجاتها النسبية (15 إلى 37)',
        subtitle: 'لماذا تصدر السيناريو الثامن (درجة 37) والسيناريو السادس (درجة 31) قائمة الأولويات؟',
        bullets: [
          'السيناريو 8 (إدخال إجراءات لم تُنفذ / تلاعب بالفوترة): حصل على أعلى درجة (37) لأنه يضرب التكامل والمال والغرامات.',
          'السيناريو 3 (انقطاع إرسال الفواتير) والسيناريو 6 (فقدان أشرطة النسخ): حصلا على الدرجة (31) لتأثيرهما الشديد على التوافر والمال.',
          'السيناريو 1 (تعديل عبر ثغرة نظام التشغيل): حصل على الدرجة (30) ووجه للتخفيف عبر إدارة التحديثات.',
          'السيناريو 7 (إرسال كشف بالبريد لعنوان خطأ): حصل على أقل درجة (15) ووجه للتأجيل لأن أثره فردي محدود.'
        ],
        keyHighlight: 'الفرق بين قرار «التخفيف العاجل» في السيناريو 8 (درجة 37) وقرار «التأجيل» في السيناريو 7 (درجة 15) يبرهن كفاءة المنهجية.',
        diagramTitle: 'مخطط ترتيب السيناريوهات الثمانية حسب درجة الخطر النسبية'
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'تحليل الضابط القائم مقابل فجوة الضابط في أشرطة النسخ الاحتياطي',
        subtitle: 'دراسة معمقة للسيناريو السادس (الدرجة 31)',
        bullets: [
          'الضابط القائم فعلياً: تقوم المستشفى بإنشاء أشرطة نسخ احتياطي كل ليلة بانتظام.',
          'فجوة الضابط الأولى: إنشاء مجموعة أشرطة واحدة فقط ونقلها خارج الموقع (فإذا ضاعت أثناء النقل ضاعت النسخة الوحيدة!).',
          'فجوة الضابط الثانية: حفظ البيانات على الأشرطة كنص واضح غير مشفر (مما يحول الفقدان إلى إفشاء أيضاً).',
          'المعالجة المعتمدة: تشفير الأشرطة برمجياً + إنشاء مجموعتين من النسخ الاحتياطي لتأمين التوافر والسرية معاً.'
        ],
        keyHighlight: 'وجود نسخ احتياطي ليلي (ضابط قائم) لا يمنع الكارثة إذا كانت هناك فجوة في عدد النسخ وفي تشفيرها!',
        diagramTitle: 'تحليل الفجوة في السيناريو السادس وضوابط المعالجة المزدوجة'
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'المخاطر المتبقية وحوكمة القرار في دراسة حالة PBCD',
        subtitle: 'كيف تتكامل أدوار مالك الأصل ومدير النظام واللجنة الإشرافية؟',
        bullets: [
          'في السيناريو 8: بعد تفعيل تدقيق المعاملات (Audit Logs) وفصل المهام، ينحصر الخطر المتبقي في التواطؤ الثنائي أو الخطأ العابر.',
          'في السيناريو 4 (محطات العمل المتروكة): يُخفف الخطر بتفعيل شاشات التوقف المقفلة بكلمة مرور وتوعية الموظفين.',
          'حوكمة القرار: يوصي فريق التقييم، ويصادق مالك الأصل (مدير الفواتير)، وينفذ مدير النظام، وتعتمد اللجنة الإشرافية.',
          'تُوثق جميع القرارات والمخاطر المتبقية في سجل المخاطر المؤسسي مع جدولة مراجعة دورية.'
        ],
        keyHighlight: 'تمكين تدقيق المعاملات يحول بيئة العمل من غياب المساءلة إلى رقابة كشفية رادعة تخفض الخطر من 37 إلى مستوى مقبول.',
        diagramTitle: 'هيكل الحوكمة واعتماد المخاطر المتبقية في حالة PBCD'
      }
    ],
    flashcards: [
      {
        front: 'ما هو الأصل المعلوماتي الحرج في دراسة حالة المستشفى (PBCD)، ومن هو مالكه؟',
        back: 'الأصل هو بيانات فوترة المرضى وتحصيلها (PBCD — Patient Billing and Collection Data)، ومالكه هو مدير فواتير المرضى.',
        category: 'دراسة حالة PBCD'
      },
      {
        front: 'لماذا اختير «التكامل/السلامة (Integrity)» كأهم متطلب أمني لأصل PBCD في المستشفى؟',
        back: 'لأن دقة الفواتير ورموز الإجراءات الطبية هي الأساس المالي لتحصيل إيرادات المستشفى والتفاوض مع شركات التأمين وتجنب عقوبات الاحتيال.',
        category: 'متطلبات الأمن'
      },
      {
        front: 'ما الفرق بين الضابط القائم وفجوة الضابط في خطر فقدان أشرطة النسخ الاحتياطي (السيناريو 6)؟',
        back: 'الضابط القائم هو إنشاء أشرطة نسخ احتياطي كل ليلة، أما الفجوة فهي إنشاء مجموعة واحدة فقط دون تشفير وحفظها خارج الموقع.',
        category: 'تحليل الفجوات'
      },
      {
        front: 'علّل اختلاف قرار المعالجة بين خطر إدخال إجراءات لم تُنفذ (درجة 37) وخطر إرسال الكشف لعنوان خطأ (درجة 15).',
        back: 'خطر إدخال إجراءات وهمية ذو درجة عالية جداً (37) واحتمالية مرتفعة ويمس التكامل والمال والغرامات فوجب تخفيفه فوراً، بينما خطأ العنوان الفردي درجته منخفضة (15) واحتماليته منخفضة فأُجّل/قُبل.',
        category: 'قرارات المعالجة'
      },
      {
        front: 'ما هي المخاطر المتبقية بعد تمكين تدقيق المعاملات وفصل المهام في السيناريو الثامن؟',
        back: 'ينحصر الخطر المتبقي في احتمال تواطؤ أكثر من موظف لتمرير معاملة مزورة، أو وقوع خطأ إدخال غير متعمد قبل اكتشافه في المراجعة الدورية.',
        category: 'المخاطر المتبقية'
      },
      {
        front: 'اذكر مثالاً لحاوية تقنية، وحاوية مادية، وحاوية بشرية للأصل PBCD.',
        back: 'التقنية: نظام إدارة فواتير المرضى (PBMS)؛ المادية: أشرطة النسخ الاحتياطي والكشوف الورقية؛ البشرية: موظفو مكتب الدخول والقسم المالي.',
        category: 'حاويات PBCD'
      }
    ],
    miniQuiz: [
      {
        question: 'في دراسة حالة المستشفى، أي سيناريو من السيناريوهات الثمانية حصل على أعلى درجة خطر نسبية (37)، وما السبب؟',
        options: [
          'السيناريو 8: قيام موظف بإضافة إجراءات طبية لم تُنفذ (تعديل البيانات)، لأنه ينتهك أهم متطلب أمني للأصل (التكامل) ويؤدي لغرامات قانونية وأضرار سمعة ومالية جسيمة',
          'السيناريو 7: إرسال كشف ورقي لعنوان خطأ (درجة 15)',
          'السيناريو 4: ترك محطة عمل مفتوحة لبضع دقائق (درجة 20)',
          'السيناريو 5: العثور على ورقة مطبوعة (درجة 18)'
        ],
        correctIndex: 0,
        explanation: 'السيناريو الثامن (إدخال إجراءات لم تُنفذ) نال الدرجة 37 لأنه يضرب التكامل (أهم متطلب أمني) ويترتب عليه عقوبات قانونية ومالية وسمعة عالية.'
      },
      {
        question: 'ما الفجوة الأمنية التي اكتشفها فريق التقييم في ضابط أشرطة النسخ الاحتياطي الليلية (السيناريو 6 — درجة 31)؟',
        options: [
          'أن المستشفى ينشئ مجموعة أشرطة واحدة فقط غير مشفرة ويرسلها خارج الموقع، فإذا فُقدت أثناء النقل ضاعت النسخة الاحتياطية الوحيدة وانكشفت سريتها',
          'أن المستشفى لا يملك أي أجهزة حاسب',
          'أن النسخ الاحتياطي يتم كل عشر سنوات',
          'أن الأشرطة محفوظة داخل خادم سحابي مشفر'
        ],
        correctIndex: 0,
        explanation: 'الضابط القائم كان النسخ الليلي، لكن الفجوة تمثلت في وجود نسخة وحيدة غير مشفرة تُنقل للخارج، وعولجت بإنشاء مجموعتين وتشفير الأشرطة.'
      },
      {
        question: 'كيف حُسبت درجة المجال الواحد في جداول دراسة حالة المستشفى (PBCD)؟',
        options: [
          'بتحويل قيمة شدة الأثر (منخفض=1، متوسط=2، مرتفع=3) ثم ضرب هذا الوزن في رتبة أولوية المجال لدى المستشفى، وأخيراً جمع درجات المجالات كلها',
          'بقسمة عدد الموظفين على عدد الخوادم',
          'بطرح الاحتمالية من الأثر',
          'بجمع أرقام الصفحات'
        ],
        correctIndex: 0,
        explanation: 'تُحسب درجة كل مجال بضرب وزن الشدة (1 أو 2 أو 3) في رتبة أولوية المجال، ثم تُجمع نواتج المجالات للحصول على درجة الخطر النسبية.'
      },
      {
        question: 'لماذا استبعد فريق التقييم في حالة المستشفى «التشخيصات السريرية التفصيلية للمرضى» من نطاق تقييم الأصل PBCD؟',
        options: [
          'لأن ضبط النطاق (Scope) يقصر التقييم على مكونات الأصل المحددة في ملفه (بيانات الفوترة والتحصيل ورموز الخدمات) لمنع تشعب التقييم خارج حدوده',
          'لأن البيانات السريرية ليست مهمة للمستشفى',
          'لأن الأطباء رفضوا المشاركة في المستشفى',
          'لأن نظام التشغيل لا يدعم اللغة الإنجليزية'
        ],
        correctIndex: 0,
        explanation: 'تحديد ما يشمله النطاق وما يستبعده خطوة أساسية في OCTAVE Allegro لضبط الجهد والتركيز على حدود الأصل قيد التقييم (PBCD).'
      }
    ],
    interactiveBook3D: {
      model3DType: 'pbcd_hospital_architecture_twin',
      shaderEffect: 'medical_telemetry_biometric_glow',
      ambientColor: '#081c24',
      accentColor: '#14b8a6',
      autoRotateSpeed: 1.15,
      pages3D: [
        {
          pageNumber: 1,
          spreadSide: 'right',
          title: 'التوأم الرقمي لدراسة حالة المستشفى (PBCD Risk Twin)',
          subtitle: 'محاكاة تفاعلية للحاويات الست والسيناريوهات الثمانية لبيانات فوترة المرضى',
          summaryMarkdown: 'يعرض المجسم ثلاثي الأبعاد **التوأم الرقمي لمنظومة فوترة المرضى (PBCD)** في المستشفى، موضحاً ارتباط الخادم الداخلي (**PBMS**) بمحطات العمل، وخزائن القسم المالي، وأشرطة النسخ الاحتياطي، وقنوات الربط مع شركات التأمين.',
          interactiveFormula: 'PBCD_Max_Risk = Scenario_8 (Score = 37)  →  Mitigated via Audit_Logs + SoD',
          labParameterName: 'رقم سيناريو التهديد قيد الفحص في حالة PBCD (من 1 إلى 8)',
          labMin: 1,
          labMax: 8,
          labDefault: 8,
          labUnit: 'سيناريو',
          labInterpretation: {
            1: 'السيناريو 1 (ثغرة نظام تشغيل PBMS): الدرجة 30 — القرار: تخفيف عبر إدارة التحديثات.',
            2: 'السيناريو 2 (نقل فواتير بلا تشفير): الدرجة 18 — القرار: تخفيف بتشفير القناة (TLS/VPN).',
            3: 'السيناريو 3 (حجب خدمة يعيق الإرسال): الدرجة 31 — القرار: تخفيف بخط اتصال بديل.',
            4: 'السيناريو 4 (محطة عمل متروكة): الدرجة 20 — القرار: تخفيف بقفل الشاشة الآلي.',
            5: 'السيناريو 5 (نسخ ورقية مكشوفة): الدرجة 18 — القرار: تخفيف بسياسة المكتب النظيف والفرامات.',
            6: 'السيناريو 6 (فقدان أشرطة النسخ الاحتياطي): الدرجة 31 — القرار: تخفيف بنسختين وتشفير الأشرطة.',
            7: 'السيناريو 7 (إرسال كشف لعنوان خطأ): الدرجة 15 — القرار: تأجيل/قبول لانخفاض الدرجة والاحتمال.',
            8: 'السيناريو 8 (إدخال إجراءات طبية لم تُنفذ): الدرجة 37 (الأعلى!) — القرار: تخفيف فوري بتدقيق المعاملات وفصل المهام.'
          },
          challengeQuestion: {
            question: 'في دراسة حالة PBCD، ما هو التبرير العلمي لكون السيناريو السادس (فقدان أشرطة النسخ الاحتياطي) حصل على درجة عالية (31) رغم أن احتماليته قُدرت بأنها «منخفضة»؟',
            options: [
              'لأن درجة الخطر النسبية تُحسب من شدة الأثر في المجالات الموزونة؛ وبما أن فقدان النسخة الوحيدة غير المشفرة يدمر التوافر والسرية معاً فقد أنتج درجة أثر عالية (31) أوجبت التخفيف',
              'لأن الأشرطة تُفقد كل ساعة',
              'لأن الاحتمالية المنخفضة تضاعف الدرجة ثلاث مرات',
              'بسبب خطأ مطبعي في جمع الأرقام'
            ],
            correctIndex: 0,
            feedbackCorrect: 'تحليل ممتاز! درجة الخطر النسبية (31) تعكس شدة الأثر الجسيم على المال والسمعة والغرامات عند ضياع النسخة الوحيدة، ولذلك وُجه للتخفيف.',
            feedbackWrong: 'تذكر أن درجة الخطر النسبية تقيس شدة العواقب الموزونة؛ وفقدان النسخة الوحيدة غير المشفرة له عواقب جسيمة ترفع الدرجة إلى 31.'
          },
          aiTutorGuardrailTopics: ['دراسة حالة PBCD', 'نظام PBMS', 'السيناريوهات الثمانية', 'أشرطة النسخ الاحتياطي', 'تدقيق المعاملات', 'فصل المهام']
        },
        {
          pageNumber: 2,
          spreadSide: 'left',
          title: 'مختبر مقارنة قرارات المعالجة في حالة PBCD (الدرجة 37 مقابل 15)',
          subtitle: 'كيف توجه الدرجة النسبية والاحتمالية قرار التخفيف أو التأجيل؟',
          summaryMarkdown: 'في الصفحة اليسرى، تقارن بين السيناريوهات الثمانية في دراسة حالة المستشفى (**PBCD**)، وتختبر كيف يتغير الخطر المتبقي عند تفعيل **تدقيق المعاملات ($\text{Transaction Auditing}$)** و**تشفير ومضاعفة أشرطة النسخ الاحتياطي**.',
          interactiveFormula: 'Scenario_8_Residual = Score_37_Inherent - (Audit_Logs_Effect + SoD_Effect)',
          labParameterName: 'مستوى تفعيل ضوابط السيناريو الثامن (تدقيق المعاملات + فصل المهام)',
          labMin: 1,
          labMax: 5,
          labDefault: 5,
          labUnit: 'مستوى تحصين PBMS',
          labInterpretation: {
            1: 'غياب التدقيق وفصل المهام (الوضع الأصلي): درجة خطر 37 واحتمالية مرتفعة للتلاعب بالفواتير.',
            2: 'مراجعة يدوية عشوائية: كشف متأخر جداً مع بقاء احتمالية التلاعب مرتفعة.',
            3: 'تفعيل سجلات التدقيق دون مراجعة دورية: ضابط كشفي ناقص الفعالية.',
            4: 'تفعيل تدقيق المعاملات مع مراجعة يومية: انخفاض كبير في احتمالية التلاعب المتعمد.',
            5: 'تدقيق معاملات آلي + فصل مهام (SoD) + صلاحيات دنيا: ينحصر الخطر المتبقي في التواطؤ الثنائي النادر.'
          },
          challengeQuestion: {
            question: 'في دراسة حالة PBCD، من هو صاحب الصلاحية في اتخاذ القرار التقني التنفيذي على النظام، ومن هو مالك الأصل المعلوماتي؟',
            options: [
              'مالك الأصل المعلوماتي هو «مدير فواتير المرضى»، وصاحب القرار التنفيذي على النظام هو «مدير النظام / تقنية المعلومات» تحت إشراف اللجنة الإشرافية',
              'مالك الأصل هو موظف الاستقبال، وصاحب القرار هو شركة التأمين الخارجية',
              'لا يوجد مالك للأصل في المستشفى',
              'شركة نقل الأشرطة هي مالكة الأصل المعلوماتي'
            ],
            correctIndex: 0,
            feedbackCorrect: 'إجابة صحيحة! مدير فواتير المرضى هو مالك الأصل (Asset Owner) الأدرى بقيمته ومتطلباته، ويتكامل مع مدير النظام واللجنة الإشرافية في حوكمة القرار.',
            feedbackWrong: 'تذكر من دراسة الحالة: مالك أصل PBCD هو مدير فواتير المرضى.'
          },
          aiTutorGuardrailTopics: ['مالك أصل PBCD', 'السيناريو الثامن 37', 'السيناريو السابع 15', 'فجوة أشرطة النسخ الاحتياطي']
        }
      ],
      stepByStep: [
        {
          stepNumber: 1,
          title: 'الخطوة 1: تعريف ملف الأصل PBCD وتثبيت التكامل كأهم متطلب أمني',
          description: 'حصر المكونات الثلاثة لبيانات الفوترة (الديموغرافية، رموز الخدمات، المدفوعات) وتعيين مدير الفواتير مالكاً للأصل.',
          formulaOrRule: 'PBCD Asset → Owner: Billing Director | Primary Req: Integrity',
          visualState: 'pbcd_core_profile_loaded',
          cameraFocus: { x: 0.0, y: 1.5, z: 3.0 }
        },
        {
          stepNumber: 2,
          title: 'الخطوة 2: نشر خريطة الحاويات الست (PBMS، الأشرطة، البريد، الموظفون)',
          description: 'ربط الأصل بحاوياته التقنية والمادية والبشرية داخل المستشفى ولدى شركات التأمين ومورد الأرشفة.',
          formulaOrRule: '6 Container Groups Mapped (9a, 9b, 9c × Internal/External)',
          visualState: 'hospital_containers_mapped',
          cameraFocus: { x: -2.0, y: 0.8, z: 3.2 }
        },
        {
          stepNumber: 3,
          title: 'الخطوة 3: تقييم السيناريوهات الثمانية وترتيب درجاتها النسبية (15..37)',
          description: 'حساب درجة كل سيناريو وفرزها من الأخطر (السيناريو 8 بدرجة 37، ثم 3 و6 بدرجة 31، ثم 1 بدرجة 30) إلى الأقل (السيناريو 7 بدرجة 15).',
          formulaOrRule: 'Scores Ranked: #8(37) > #3,#6(31) > #1(30) > #4(20) > #2,#5(18) > #7(15)',
          visualState: 'eight_scenarios_bars_sorted',
          cameraFocus: { x: 2.0, y: 0.8, z: 3.2 }
        },
        {
          stepNumber: 4,
          title: 'الخطوة 4: تطبيق الضوابط وسد الفجوات واعتماد المخاطر المتبقية',
          description: 'تفعيل تدقيق المعاملات على PBMS، وتشفير ومضاعفة أشرطة النسخ، وتشفير قناة التأمين، وقبول المخاطر المتبقية المنخفضة.',
          formulaOrRule: '7 Mitigated + 1 Deferred (#7) → Residual Risks Approved',
          visualState: 'pbcd_controls_locked_green',
          cameraFocus: { x: 0.0, y: -1.6, z: 3.5 }
        }
      ],
      hotspots: [
        {
          id: 'hs-ch10-pbms',
          label: 'خادم نظام الفوترة (PBMS Server)',
          x: -1.8,
          y: 1.3,
          z: 0.5,
          coordinates: { x: -1.8, y: 1.3, z: 0.5 },
          title: 'الحاوية التقنية الداخلية: نظام PBMS (السيناريوهان 1 و8)',
          detailedExplanation: 'يواجه خطر التعديل عبر ثغرات نظام التشغيل (درجة 30) وخطر إدخال إجراءات وهمية من موظف داخلي (درجة 37)؛ ويعالج بإدارة التحديثات وتدقيق المعاملات وفصل المهام.',
          technicalMetric: 'Scenario #8 (Score 37) & Scenario #1 (Score 30)',
          securityImpact: 'حرج جداً',
          relatedControl: 'NCA ECC-2:2024 — سجلات الأحداث ومراقبتها (2-11) وإدارة الثغرات (2-10)'
        },
        {
          id: 'hs-ch10-tapes',
          label: 'أشرطة النسخ الاحتياطي الليلية (Backup Tapes)',
          x: 1.8,
          y: 1.3,
          z: 0.5,
          coordinates: { x: 1.8, y: 1.3, z: 0.5 },
          title: 'الحاوية المادية الخارجية: أشرطة النسخ الاحتياطي (السيناريو 6)',
          detailedExplanation: 'كانت الفجوة حفظ نسخة وحيدة غير مشفرة خارج الموقع (درجة 31)؛ وعولجت بتشفير الأشرطة وإنشاء مجموعتين من النسخ الاحتياطي.',
          technicalMetric: 'Scenario #6 (Score 31) — Dual Encrypted Backup Sets',
          securityImpact: 'حرج جداً',
          relatedControl: 'NCA ECC-2:2024 — إدارة النسخ الاحتياطي وتشفيره (2-9)'
        },
        {
          id: 'hs-ch10-insurance',
          label: 'قناة الربط مع شركات التأمين (Insurance Link)',
          x: -1.8,
          y: -1.3,
          z: 0.5,
          coordinates: { x: -1.8, y: -1.3, z: 0.5 },
          title: 'الحاوية التقنية الخارجية: إرسال الفواتير عبر الإنترنت (السيناريوهان 2 و3)',
          detailedExplanation: 'تعالج خطر اعتراض البيانات غير المشفرة (درجة 18) وخطر انقطاع الإرسال (درجة 31) عبر تشفير القنوات وتوفير خط اتصال احتياطي.',
          technicalMetric: 'Scenario #3 (Score 31) & Scenario #2 (Score 18)',
          securityImpact: 'مرتفع',
          relatedControl: 'NCA ECC-2:2024 — التشفير أثناء النقل (2-8) وتوافر الشبكات (2-5)'
        },
        {
          id: 'hs-ch10-workstation',
          label: 'محطات عمل الدخول والأرشيف الورقي',
          x: 1.8,
          y: -1.3,
          z: 0.5,
          coordinates: { x: 1.8, y: -1.3, z: 0.5 },
          title: 'الحاويات البشرية والمادية: محطات العمل والنسخ الورقية (السيناريوهات 4 و5 و7)',
          detailedExplanation: 'تعالج خطر الشاشات المتروكة (درجة 20) والورق المكشوف (درجة 18) بالقفل التلقائي وسياسة المكتب النظيف، بينما يؤجل خطر خطأ العنوان البريدي الفردي (درجة 15).',
          technicalMetric: 'Scenarios #4 (20), #5 (18) Mitigated | #7 (15) Deferred',
          securityImpact: 'متوسط',
          relatedControl: 'NCA ECC-2:2024 — أمن محطات العمل والمكتب النظيف'
        }
      ]
    },
    richData: {
      id: 210,
      chapter_number: 10,
      title: 'دراسات حالة تطبيقية شاملة في تحليل المخاطر (حالة PBCD)',
      subtitle: 'تطبيق OCTAVE Allegro على بيانات فوترة المرضى والسيناريوهات الثمانية',
      category: 'تطبيقي',
      pdfStartPage: 108,
      pdfEndPage: 118,
      description: 'دراسة حالة متكاملة تطبق خطوات OCTAVE Allegro الثماني على أصل بيانات فوترة المرضى (PBCD) في مستشفى.',
      objectives: [
        'تحديد نطاق دراسة حالة المستشفى ومكونات الأصل الحرج PBCD ومالكه.',
        'تحليل الحاويات التقنية والمادية والبشرية (الداخلية والخارجية) لأصل PBCD.',
        'تفسير حساب درجات الخطر النسبية للسيناريوهات الثمانية وأسباب تفاوت قرارات معالجتها.',
        'التمييز بين الضابط القائم وفجوة الضابط والمخاطر المتبقية في سيناريوهات الدراسة.'
      ],
      sections: [
        {
          heading: '1. ملف الأصل PBCD والحاويات الست والسيناريوهات الثمانية',
          content: 'يمثل PBCD بيانات فواتير المرضى وتحصيلها، وأهم متطلب أمني له هو السلامة/التكامل، وقد حُللت له 8 سيناريوهات تراوحت درجاتها بين 15 و37.',
          formula: 'Max Scenario (#8: Unperformed Procedures Added) = 37 → Mitigate (Audit Logs + SoD)',
          saudiExample: 'تطبيق منهجية مماثلة لتأمين أنظمة المطالبات التأمينية المرتبطة بمنصة «نفيس» ومجلس الضمان الصحي في المستشفيات السعودية.'
        }
      ],
      tables: [
        {
          title: 'ملخص السيناريوهات الثمانية في دراسة حالة PBCD',
          headers: ['رقم السيناريو', 'وصف السيناريو المختصر', 'الدرجة النسبية', 'قرار المعالجة'],
          rows: [
            ['1', 'تعديل البيانات عبر ثغرة نظام تشغيل الخادم', '30', 'تخفيف (إدارة التحديثات)'],
            ['2', 'إفشاء البيانات المنقولة لشركات التأمين دون تشفير', '18', 'تخفيف (تشفير النقل)'],
            ['3', 'حجب الخدمة يعيق إرسال الفواتير', '31', 'تخفيف (خط بديل وحماية توافر)'],
            ['4', 'الاطلاع على محطة عمل متروكة دون قفل', '20', 'تخفيف (قفل شاشة آلي)'],
            ['5', 'العثور على نسخ ورقية غير محمية', '18', 'تخفيف (خزائن وإتلاف آمن)'],
            ['6', 'فقدان أشرطة النسخ الاحتياطي الليلية', '31', 'تخفيف (نسختان + تشفير الأشرطة)'],
            ['7', 'إرسال كشف الفاتورة لعنوان خطأ', '15', 'تأجيل (أثر فردي محدود)'],
            ['8', 'إدخال إجراءات طبية لم تُنفذ (تلاعب داخلي)', '37', 'تخفيف عاجل (تدقيق المعاملات + فصل المهام)']
          ]
        }
      ],
      commonMistake: {
        mistake: 'الظن بأن وجود نسخ احتياطي ليلي يلغي خطر فقدان البيانات حتى لو كانت النسخة وحيدة وغير مشفرة.',
        fix: 'فحص كفاية الضابط القائم واكتشاف فجوة النسخة الوحيدة غير المشفرة ومعالجتها بتعدد النسخ والتشفير.'
      },
      solvedExamples: [
        {
          title: 'مقارنة السيناريو الثامن (درجة 37) بالسيناريو السابع (درجة 15)',
          given: 'السيناريو 8: تلاعب داخلي بإضافة إجراءات لم تُنفذ. السيناريو 7: خطأ بريدي في إرسال فاتورة مريض واحد.',
          steps: [
            'في السيناريو 8: ينتهك التكامل (المتطلب الأهم) ويسبب غرامات وعقوبات قانونية مرتفعة وضرراً مالياً وسمعة، فتبلغ درجته 37 ويصنف في المجموعة 1 (تخفيف فوري).',
            'في السيناريو 7: يقتصر الإفشاء على فاتورة مريض واحد باحتمال منخفض وأثر منخفض في جميع المجالات، فتبلغ درجته 15 ويصنف في المجموعة 4/3 (تأجيل/قبول).'
          ],
          result: 'تخصيص ميزانية المعالجة لتفعيل تدقيق المعاملات في السيناريو 8 وتأجيل السيناريو 7.',
          whyItMatters: 'يبرهن كيف تمنع منهجية OCTAVE Allegro هدر الموارد على الحوادث الفردية الطفيفة.'
        }
      ],
      selfAssessment: [
        {
          question: 'علّل اختيار السلامة (التكامل) أهم متطلب أمني لبيانات فواتير المرضى PBCD.',
          answer: 'لأن دقة الفواتير وسلامتها من التعديل غير المصرح به هي الأساس في تحصيل إيرادات المستشفى والتفاوض مع شركات التأمين وتجنب المساءلة القانونية.'
        }
      ],
      quiz: [
      {
        question: 'في دراسة حالة المستشفى، أي سيناريو من السيناريوهات الثمانية حصل على أعلى درجة خطر نسبية (37)، وما السبب؟',
        options: [
          'السيناريو 8: قيام موظف بإضافة إجراءات طبية لم تُنفذ (تعديل البيانات)، لأنه ينتهك أهم متطلب أمني للأصل (التكامل) ويؤدي لغرامات قانونية وأضرار سمعة ومالية جسيمة',
          'السيناريو 7: إرسال كشف ورقي لعنوان خطأ (درجة 15)',
          'السيناريو 4: ترك محطة عمل مفتوحة لبضع دقائق (درجة 20)',
          'السيناريو 5: العثور على ورقة مطبوعة (درجة 18)'
        ],
        correctIndex: 0,
        explanation: 'السيناريو الثامن (إدخال إجراءات لم تُنفذ) نال الدرجة 37 لأنه يضرب التكامل (أهم متطلب أمني) ويترتب عليه عقوبات قانونية ومالية وسمعة عالية.'
      },
      {
        question: 'ما الفجوة الأمنية التي اكتشفها فريق التقييم في ضابط أشرطة النسخ الاحتياطي الليلية (السيناريو 6 — درجة 31)؟',
        options: [
          'أن المستشفى ينشئ مجموعة أشرطة واحدة فقط غير مشفرة ويرسلها خارج الموقع، فإذا فُقدت أثناء النقل ضاعت النسخة الاحتياطية الوحيدة وانكشفت سريتها',
          'أن المستشفى لا يملك أي أجهزة حاسب',
          'أن النسخ الاحتياطي يتم كل عشر سنوات',
          'أن الأشرطة محفوظة داخل خادم سحابي مشفر'
        ],
        correctIndex: 0,
        explanation: 'الضابط القائم كان النسخ الليلي، لكن الفجوة تمثلت في وجود نسخة وحيدة غير مشفرة تُنقل للخارج، وعولجت بإنشاء مجموعتين وتشفير الأشرطة.'
      },
      {
        question: 'كيف حُسبت درجة المجال الواحد في جداول دراسة حالة المستشفى (PBCD)؟',
        options: [
          'بتحويل قيمة شدة الأثر (منخفض=1، متوسط=2، مرتفع=3) ثم ضرب هذا الوزن في رتبة أولوية المجال لدى المستشفى، وأخيراً جمع درجات المجالات كلها',
          'بقسمة عدد الموظفين على عدد الخوادم',
          'بطرح الاحتمالية من الأثر',
          'بجمع أرقام الصفحات'
        ],
        correctIndex: 0,
        explanation: 'تُحسب درجة كل مجال بضرب وزن الشدة (1 أو 2 أو 3) في رتبة أولوية المجال، ثم تُجمع نواتج المجالات للحصول على درجة الخطر النسبية.'
      },
      {
        question: 'لماذا استبعد فريق التقييم في حالة المستشفى «التشخيصات السريرية التفصيلية للمرضى» من نطاق تقييم الأصل PBCD؟',
        options: [
          'لأن ضبط النطاق (Scope) يقصر التقييم على مكونات الأصل المحددة في ملفه (بيانات الفوترة والتحصيل ورموز الخدمات) لمنع تشعب التقييم خارج حدوده',
          'لأن البيانات السريرية ليست مهمة للمستشفى',
          'لأن الأطباء رفضوا المشاركة في المستشفى',
          'لأن نظام التشغيل لا يدعم اللغة الإنجليزية'
        ],
        correctIndex: 0,
        explanation: 'تحديد ما يشمله النطاق وما يستبعده خطوة أساسية في OCTAVE Allegro لضبط الجهد والتركيز على حدود الأصل قيد التقييم (PBCD).'
      }
    ],
      flashcards: [
      {
        front: 'ما هو الأصل المعلوماتي الحرج في دراسة حالة المستشفى (PBCD)، ومن هو مالكه؟',
        back: 'الأصل هو بيانات فوترة المرضى وتحصيلها (PBCD — Patient Billing and Collection Data)، ومالكه هو مدير فواتير المرضى.',
        category: 'دراسة حالة PBCD'
      },
      {
        front: 'لماذا اختير «التكامل/السلامة (Integrity)» كأهم متطلب أمني لأصل PBCD في المستشفى؟',
        back: 'لأن دقة الفواتير ورموز الإجراءات الطبية هي الأساس المالي لتحصيل إيرادات المستشفى والتفاوض مع شركات التأمين وتجنب عقوبات الاحتيال.',
        category: 'متطلبات الأمن'
      },
      {
        front: 'ما الفرق بين الضابط القائم وفجوة الضابط في خطر فقدان أشرطة النسخ الاحتياطي (السيناريو 6)؟',
        back: 'الضابط القائم هو إنشاء أشرطة نسخ احتياطي كل ليلة، أما الفجوة فهي إنشاء مجموعة واحدة فقط دون تشفير وحفظها خارج الموقع.',
        category: 'تحليل الفجوات'
      },
      {
        front: 'علّل اختلاف قرار المعالجة بين خطر إدخال إجراءات لم تُنفذ (درجة 37) وخطر إرسال الكشف لعنوان خطأ (درجة 15).',
        back: 'خطر إدخال إجراءات وهمية ذو درجة عالية جداً (37) واحتمالية مرتفعة ويمس التكامل والمال والغرامات فوجب تخفيفه فوراً، بينما خطأ العنوان الفردي درجته منخفضة (15) واحتماليته منخفضة فأُجّل/قُبل.',
        category: 'قرارات المعالجة'
      },
      {
        front: 'ما هي المخاطر المتبقية بعد تمكين تدقيق المعاملات وفصل المهام في السيناريو الثامن؟',
        back: 'ينحصر الخطر المتبقي في احتمال تواطؤ أكثر من موظف لتمرير معاملة مزورة، أو وقوع خطأ إدخال غير متعمد قبل اكتشافه في المراجعة الدورية.',
        category: 'المخاطر المتبقية'
      },
      {
        front: 'اذكر مثالاً لحاوية تقنية، وحاوية مادية، وحاوية بشرية للأصل PBCD.',
        back: 'التقنية: نظام إدارة فواتير المرضى (PBMS)؛ المادية: أشرطة النسخ الاحتياطي والكشوف الورقية؛ البشرية: موظفو مكتب الدخول والقسم المالي.',
        category: 'حاويات PBCD'
      }
    ]
    },
    updated_at: NOW_TIMESTAMP
  },

  // =========================================================================
  // الفصل الحادي عشر: المشروع التراكمي التطبيقي (منصة «مواعيدي» الوطنية)
  // =========================================================================
  {
    id: 211,
    chapter_number: 11,
    title: 'المشروع التراكمي التطبيقي (تقييم ومعالجة مخاطر منصة «مواعيدي» الوطنية)',
    subtitle: 'بناء حزمة تحليل المخاطر المتكاملة لمنصة «مواعيدي / بوابة الواحة» عبر المراحل الخمس والمخرجات السبعة',
    description: 'المشروع التطبيقي التراكمي للمقرر: بناء حزمة تحليل وتقييم ومعالجة مخاطر سيبرانية متكاملة لمنصة «مواعيدي» (وبوابة الواحة للخدمات الصحية الحكومية) العاملة على بنية سحابية وحاويات برمجية، شاملاً المراحل الخمس، والمخرجات السبعة، والجدول الزمني لـ 14 يوماً، والمثال المحلول للمخاطر الثلاثة، وسلم التقييم المعياري (Rubric)، وأخطاء المشاريع الشائعة.',
    category: 'المشروع التراكمي',
    difficulty: 'advanced',
    pdfStartPage: 119,
    pdfEndPage: 128,
    diagramKey: 'ise232-risk-11',
    videoUrl: 'https://www.youtube.com/watch?v=8kVXKyGOYsY',
    videoDuration: '30:00',
    presentationUrl: '/presentations/ise232-risk-ch11.pdf',
    keyTopics: [
      'بيئة المشروع التطبيقي: منصة «مواعيدي» الوطنية لإدارة المواعيد الطبية على بنية سحابية (IaaS & Containers)',
      'المراحل الخمس لسير المشروع التراكمي (من النطاق وجرد الأصول إلى تقرير القرار النهائي)',
      'حزمة التسليم والمخرجات السبعة المتكاملة + المخرجات الأربعة الأساسية الموقعة',
      'مثال تطبيقي محلول بالكامل: تقييم وترتيب ثلاثة مخاطر رئيسية في المنصة الصحية (بوابة الواحة / مواعيدي)',
      'الجدول الزمني التنفيذي للمشروع (خطة الـ 14 يوماً) ومسار مراجعة الأقران الإلزامي',
      'معايير التقييم الخمسة (Rubric: 20% لكل معيار) والأخطاء الشائعة في مشاريع تحليل المخاطر وكيفية تجنبها',
    ],
    images: [
      {
        prompt: 'National healthcare appointment platform Mawaidi cloud containers architecture 5 project phases and 7 deliverables, 16:9',
        caption: 'معمارية مشروع منصة «مواعيدي» الوطنية: المراحل الخمس والمخرجات السبعة لحزمة تحليل المخاطر',
        alt: 'Mawaidi platform risk assessment project deliverables',
        seed: 2111,
        isAIGenerated: true,
      },
      {
        prompt: 'Project evaluation rubric 5 criteria 20 percent each and 14-day implementation timeline with peer review, 16:9',
        caption: 'الجدول الزمني التنفيذي (14 يوماً) وسلم التقييم المعياري الخماسي (Rubric) للمشروع التراكمي',
        alt: 'Project timeline and evaluation rubric',
        seed: 2112,
        isAIGenerated: true,
      },
    ],
    content: `## 11.1 هدف المشروع التراكمي وبيئة منصة «مواعيدي» الوطنية

يمثل هذا الفصل ثمرة المقرر بأكمله؛ حيث يطبق الطالب جميع المهارات والمعادلات وأوراق العمل التي درسها في الفصول العشرة السابقة على حالة وطنية واقعية متكاملة: **منصة «مواعيدي» (Mawaidi) / بوابة الواحة للخدمات الصحية الحكومية**.

### توصيف بيئة النظام المستهدف بالتقييم
- **طبيعة المنصة**: منصة إلكترونية حكومية سعودية مركزية لإدارة وحجز مواعيد المرضى والعيادات التخصصية والربط مع الملفات الصحية الموحدة.
- **البنية التقنية**: مستضافة على بيئة حوسبة سحابية حكومية ($\text{Cloud IaaS}$) وتعتمد معمارية الحاويات البرمجية ($\text{Containers / Kubernetes}$)، وواجهات برمجة التطبيقات ($\text{APIs}$) المرتبطة ببوابة النفاذ الوطني الموحد وبوابات الرسائل النصية ($\text{SMS}$).
- **الأصول المعلوماتية الحرجة**:
  1. **قاعدة بيانات مواعيد وهويات المرضى ($\text{Patient Appointments & Identity DB}$)**.
  2. **رموز ومفاتيح التكامل البرمجي مع الأنظمة الحكومية ($\text{API Keys & Auth Tokens}$)**.
  3. **سجلات الإحالات الطبية والحالات الحرجة ($\text{Medical Referral Records}$)**.

---

## 11.2 المراحل الخمس والمخرجات السبعة لحزمة المشروع

ينتظم المشروع في **خمس مراحل متسلسلة** تنتج **حزمة تحليل المخاطر المتكاملة (7 مخرجات تفصيلية تتجمع في 4 وثائق تسليم رئيسية)**:

| المرحلة | عنوان المرحلة | الأنشطة القياسية المطلوبة | المخرج المرحلي (Deliverable) |
| :---: | :--- | :--- | :--- |
| **المرحلة 1** | **نطاق المشروع وجرد الأصول والحاويات** | تحديد حدود التقييم، إعداد ملفات الأصول الحرجة (ورقة 8)، ورسم خرائط الحاويات التقنية والمادية والبشرية (9a–9c) | **1. وثيقة النطاق وجرد الأصول وخرائط الحاويات** |
| **المرحلة 2** | **سيناريوهات التهديد وسجل المخاطر الأولي** | تطبيق أشجار التهديد الأربع لبناء سيناريوهات مكتملة (الفاعل، الوسيلة، الدافع، النتيجة، المتطلب المنتهك) | **2. جدول تحليل التهديدات**<br>**3. سجل المخاطر الأولي (Risk Register)** |
| **المرحلة 3** | **تقييم الأثر والاحتمالية وترتيب الأولويات** | معايرة مجالات الأثر الستة، حساب درجة الخطر النسبية لكل سيناريو، وتصنيفها في مصفوفة المخاطر | **4. مصفوفة المخاطر وترتيب الأولويات المعلل** |
| **المرحلة 4** | **فجوات الضوابط والمعالجة والمخاطر المتبقية** | تحديد الضوابط القائمة وفجواتها، اختيار استراتيجية المعالجة، ربط الضوابط بـ $\text{NCA ECC}$، وتحديد المخاطر المتبقية | **5. مصفوفة الضوابط وخطة الاستجابة**<br>**6. مذكرة القرارات والمخاطر المتبقية** |
| **المرحلة 5** | **تقرير المخاطر التنفيذي ومراجعة الأقران** | صياغة التقرير النهائي بالملخص التنفيذي، وإجراء التقويم الذاتي ومراجعة الأقران، وإعداد عرض القرار | **7. تقرير المخاطر النهائي + قائمة التحقق ومراجعة الأقران + عرض القرار** |

---

## 11.3 مثال محلول من الكتاب (المرحلة الثالثة): تقييم 3 مخاطر رئيسية في المنصة

اعتمد فريق التقييم رتب أولويات المجالات الخمسة للمنصة كالتالي: **السلامة والصحة ($5$)**، **السمعة وثقة المستفيدين ($4$)**، **الإنتاجية واستمرارية الخدمة ($3$)**، **الغرامات والالتزام التنظيمي ($2$)**، **المالي ($1$)** (مجموع الرتب $= 15$، الدرجة القصوى $= 45$):

| رمز الخطر | السيناريو والحاوية المستهدفة | حساب الدرجة النسبية ($\sum R_i \times V_i$) | الدرجة والاحتمالية | المجموعة وقرار المعالجة | الضابط المقترح والخطر المتبقي |
| :---: | :--- | :--- | :---: | :--- | :--- |
| **R-01** | **تعطل عنقود الحاويات السحابية** وقت ذروة الحجز الصباحي بسبب هجوم $\text{DDoS}$ أو خطأ إعدادات (تقنية خارجية/داخلية) | السلامة ($5\times 2=10$) + السمعة ($4\times 3=12$) + الإنتاجية ($3\times 3=9$) + الغرامات ($2\times 1=2$) + المالي ($1\times 2=2$) | **الدرجة: 35 / 45**<br>الاحتمالية: **مرتفعة** | **المجموعة 1**<br>*(تخفيف فوري)* | تفعيل التوسع التلقائي ($\text{Auto-Scaling}$) ودرع $\text{WAF/DDoS}$ الوطني. المتبقي: تأخر ثوانٍ معدودة مقبول |
| **R-02** | **تسريب بيانات مواعيد وهويات المرضى** عبر ثغرة صلاحيات في واجهة $\text{API}$ (تقنية داخلية) | السلامة ($5\times 1=5$) + السمعة ($4\times 3=12$) + الإنتاجية ($3\times 1=3$) + الغرامات ($2\times 3=6$) + المالي ($1\times 2=2$) | **الدرجة: 28 / 45**<br>الاحتمالية: **متوسطة** | **المجموعة 2**<br>*(تخفيف إلزامي لخرق حد تحمل الخصوصية)* | مصادقة $\text{OAuth2/mTLS}$ صارمة وتشفير الحقول الحساسة واختبار اختراق دوري لـ $\text{APIs}$ |
| **R-03** | **إفشاء محدود لبيانات موعد مريض واحد** بسبب إدخال رقم جوال خاطئ من موظف الاستقبال في الرسائل النصية (بشرية/تقنية) | السلامة ($5\times 1=5$) + السمعة ($4\times 1=4$) + الإنتاجية ($3\times 1=3$) + الغرامات ($2\times 1=2$) + المالي ($1\times 1=1$) | **الدرجة: 15 / 45**<br>الاحتمالية: **منخفضة** | **المجموعة 4**<br>*(قبول مع ضابط تحققي بسيط)* | التحقق الآلي برمز $\text{OTP}$ عند ربط رقم الجوال وقبول الخطر المتبقي المنخفض |

---

## 11.4 الجدول الزمني التنفيذي (14 يوماً) وسلم التقييم المعياري (Rubric)

### أولاً: الجدول الزمني لإنجاز حزمة المشروع (14 يوماً)

| الأيام | المهام الإجرائية المجدولة | المخرج المنجز |
| :---: | :--- | :--- |
| **الأيام 1–3** | تحديد النطاق، جرد الأصول، تطبيق تحليل التقارب، وإعداد ملفات الأصول وخرائط الحاويات (9a–9c) | وثيقة النطاق والجرد |
| **الأيام 4–5** | بناء سيناريوهات التهديد باستخدام أشجار التهديد الأربع وتعبئة الحقول الخمسة الأولى في السجل | جدول تحليل التهديدات والسجل الأولي |
| **اليوم 6** | معايرة مجالات الأثر، حساب درجات الخطر النسبية، وتصنيف المخاطر في المصفوفة | مصفوفة المخاطر وترتيب الأولويات |
| **اليوم 7** | تحديد الضوابط القائمة وفجواتها، اختيار استراتيجيات المعالجة، وتحديد المخاطر المتبقية | مصفوفة الضوابط وخطة المعالجة |
| **اليوم 8–9** | إعداد خطة الاستجابة للحوادث، جمع الأدلة، وصياغة مذكرة القرارات والملخص التنفيذي | مسودة التقرير الكامل ومذكرة القرار |
| **اليوم 10** | تسليم المسودة الكاملة لمراجعة الأقران (Peer Review Submission) | نسخة المراجعة |
| **اليومان 11–12** | إجراء مراجعة الأقران المتبادلة وتوثيق الملاحظات والفروق التقييمية | نموذج مراجعة الأقران الموقع |
| **اليومان 13–14** | التحسين النهائي بناءً على مراجعة الأقران، وإعداد عرض القرار المسجل، والتسليم النهائي | حزمة التسليم النهائية الموحدة (PDF + Excel + Presentation) |

### ثانياً: سلم التقييم المعياري للمشروع (Grading Rubric — 100%)

| معيار التقييم | الوزن النسبي | مواصفات الأداء الممتاز (Exemplary — كامل الدرجة) |
| :--- | :---: | :--- |
| **1. الترابط المنطقي والمنهجي** | **$20\%$** | ترابط تام بين الأصل والحاوية وسيناريو التهديد والعاقبة والضابط المقترح والخطر المتبقي دون أي انقطاع |
| **2. الواقعية والتطبيق على البيئة** | **$20\%$** | السيناريوهات والضوابط مصممة خصيصاً لبيئة منصة «مواعيدي» السحابية وطبيعة القطاع الصحي السعودي ($\text{NCA ECC}$) |
| **3. اكتمال المكونات والمخرجات** | **$20\%$** | استيفاء جميع المخرجات وأوراق العمل والحقول التسعة وتواريخ إعادة التقييم دون حقول فارغة |
| **4. تبرير القرارات والمسوغات** | **$20\%$** | كل درجة أثر واحتمالية وكل قرار معالجة أو قبول مشفوع بمسوغ كمي/تشغيلي واضح وإطار زمني |
| **5. التوثيق الاحترافي والإسناد** | **$20\%$** | لغة تنفيذية سليمة، ملخص تنفيذي متقن، توثيق مراجعة الأقران، وإسناد علمي دقيق للمعايير والقوالب لحظة استعمالها |

---

## 11.5 الأخطاء الشائعة في مشاريع تحليل المخاطر وكيفية تجنبها

1. **انفصال الضابط عن الحاوية**: اقتراح ضابط تقني (كتحديث الجدار الناري) لمعالجة خطر سببه فجوة في حاوية مادية أو بشرية.
2. **غياب المسوغ الزمني والمعياري**: كتابة «أثر مرتفع» دون ربطه بالحد الفاصل المعلن في معايير الخطوة الأولى.
3. **إغفال المخاطر المتبقية**: إنهاء السجل عند اسم الضابط المقترح دون بيان ما يتبقى من الخطر بعد تطبيقه.
4. **الإسناد الناقص أو المتأخر**: استعمال قالب سجل أو معيار أو أداة صياغة دون ذكر مصدرها؛ ويُتجنب ذلك **بتدوين المصدر لحظة استعماله لا عند التسليم النهائي**.`,
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'بيئة المشروع التراكمي: منصة «مواعيدي» الوطنية',
        subtitle: 'تطبيق شامل لمنهجية OCTAVE Allegro وNIST 800-30 وضوابط NCA ECC',
        bullets: [
          'المنصة المستهدفة: منصة «مواعيدي» الحكومية لإدارة مواعيد المرضى والإحالات الطبية.',
          'البنية المعمارية: استضافة سحابية (IaaS)، حاويات برمجية (Containers)، وتكامل عبر واجهات API.',
          'الأصول الحرجة: قاعدة بيانات مواعيد وهويات المرضى، مفاتيح التكامل البرمجي، وسجلات الإحالات الحرجة.',
          'الهدف: تسليم حزمة تحليل مخاطر متكاملة من تحديد النطاق حتى عرض القرار التنفيذي.'
        ],
        keyHighlight: 'يجمع المشروع بين الحاويات التقنية السحابية الحديثة والحاويات البشرية والمادية في بيئة صحية وطنية عالية الحساسية.',
        diagramTitle: 'المعمارية السحابية والحاويات لمنصة «مواعيدي» الوطنية'
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'خط سير المشروع: المراحل الخمس والمخرجات السبعة',
        subtitle: 'بناء تراكمي متسلسل يضمن عدم وجود أي فجوة بين التحليل والقرار',
        bullets: [
          'المرحلة 1: وثيقة النطاق وجرد الأصول الحرجة وخرائط الحاويات (9a, 9b, 9c).',
          'المرحلة 2: جدول تحليل التهديدات وسجل المخاطر الأولي المبني على أشجار التهديد الأربع.',
          'المرحلة 3: تقييم الأثر والاحتمالية وحساب الدرجات النسبية ومصفوفة الأولويات.',
          'المرحلتان 4 و5: مصفوفة الضوابط، خطة الاستجابة، مذكرة القرارات، التقرير النهائي، ومراجعة الأقران.'
        ],
        keyHighlight: 'كل مرحلة في المشروع تسلم مخرجاتها للمرحلة التالية، وتُفحص عبر قائمة تحقق موقعة ونموذج مراجعة أقران.',
        diagramTitle: 'خارطة تدفق المراحل الخمس والمخرجات السبعة للمشروع'
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'المثال المحلول: تقييم وترتيب 3 مخاطر رئيسية في المنصة',
        subtitle: 'مقارنة خطر تعطل الحاويات السحابية (35) وخطر تسريب API (28) وخطأ رقم الجوال (15)',
        bullets: [
          'الخطر R-01 (تعطل عنقود الحاويات وقت الذروة): الدرجة 35 واحتمالية مرتفعة ← المجموعة 1 (تخفيف فوري بـ Auto-Scaling وDDoS Shield).',
          'الخطر R-02 (تسريب بيانات عبر ثغرة API): الدرجة 28 واحتمالية متوسطة ← المجموعة 2 (تخفيف إلزامي بـ mTLS وتشفير الحقول).',
          'الخطر R-03 (إدخال رقم جوال خاطئ لمريض واحد): الدرجة 15 واحتمالية منخفضة ← المجموعة 4 (قبول مع تحقق OTP).',
          'يُظهر المثال كيف توجه الدرجات النسبية وحدود التحمل قرارات المعالجة بدقة.'
        ],
        keyHighlight: 'رغم وقوع R-02 في المجموعة 2، فإنه لا يُؤجل أبداً لأن تسريب البيانات الصحية يخرق حد التحمل الصارم لخصوصية البيانات الوطنية.',
        diagramTitle: 'مقارنة الحساب التفصيلي للمخاطر الثلاثة في منصة مواعيدي / بوابة الواحة'
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'الجدول الزمني التنفيذي (14 يوماً) وسلم التقييم (Rubric)',
        subtitle: 'معايير التميز الخمسة (20% لكل معيار) وإدارة الوقت',
        bullets: [
          'الأيام (1–7): إنجاز النطاق والجرد والسيناريوهات والتقييم ومصفوفة الضوابط.',
          'الأيام (8–12): صياغة التقرير، التسليم لمراجعة الأقران (اليوم 10)، وإجراء المراجعة المتبادلة (11–12).',
          'اليومان (13–14): التحسين النهائي على ضوء ملاحظات الأقران وتسليم الحزمة الكاملة والعرض المسجل.',
          'معايير التقييم الخمسة (20% لكل منها): الترابط المنطقي، الواقعية، الاكتمال، تبرير القرارات، والتوثيق والإسناد.'
        ],
        keyHighlight: 'مراجعة الأقران في اليومين 11 و12 ليست إجراءً شكلياً، بل شرط أساسي لاكتشاف الثغرات المنطقية قبل التسليم النهائي.',
        diagramTitle: 'الجدول الزمني لـ 14 يوماً وتوزيع أوزان سلم التقييم (Rubric)'
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'الأخطاء الشائعة في مشاريع تحليل المخاطر وكيفية تجنبها',
        subtitle: 'ضمان الجودة الأكاديمية والمهنية لحزمة التسليم النهائية',
        bullets: [
          'الخطأ 1: اقتراح ضوابط عامة لا ترتبط بالحاوية المحددة التي نشأ فيها سيناريو التهديد.',
          'الخطأ 2: رصد درجات أثر واحتمالية دون ذكر المسوغ والحد الفاصل والإطار الزمني.',
          'الخطأ 3: ترك حقل «المخاطر المتبقية» فارغاً أو ادعاء أن الخطر المتبقي يساوي صفراً مطلقاً.',
          'الخطأ 4: الإسناد الناقص للمصادر والقوالب؛ والعلاج هو تدوين المصدر لحظة استعماله لا عند التسليم.'
        ],
        keyHighlight: 'الحزمة الاحترافية هي التي يستطيع رئيس الجهة قراءة ملخصها التنفيذي في 3 دقائق ويتخذ قرار الاعتماد بثقة كاملة.',
        diagramTitle: 'قائمة الفحص النهائي لتجنب الأخطاء الشائعة في مشاريع تحليل المخاطر'
      }
    ],
    flashcards: [
      {
        front: 'ما هي المخرجات السبعة التفصيلية لحزمة مشروع منصة «مواعيدي»؟',
        back: '1) وثيقة النطاق والجرد، 2) جدول تحليل التهديدات، 3) سجل المخاطر، 4) مصفوفة الضوابط، 5) خطة الاستجابة للحوادث، 6) مذكرة القرارات، 7) تقرير التقويم الذاتي ومراجعة الأقران.',
        category: 'مخرجات المشروع'
      },
      {
        front: 'ما هي المراحل الخمس لسير المشروع التطبيقي التراكمي؟',
        back: '1) نطاق المشروع وجرد الأصول، 2) سيناريوهات المخاطر وسجل المخاطر، 3) تقييم الأثر والاحتمالية وترتيب الأولويات، 4) فجوات الضوابط والمعالجة والمخاطر المتبقية، 5) تقرير المخاطر وعرض القرار.',
        category: 'مراحل المشروع'
      },
      {
        front: 'ما هي معايير التقييم الخمسة (Rubric) للمشروع التراكمي وما وزن كل منها؟',
        back: '1) الترابط المنطقي (20%)، 2) الواقعية والتطبيق (20%)، 3) اكتمال المكونات (20%)، 4) تبرير القرارات (20%)، 5) التوثيق والاحترافية والإسناد (20%).',
        category: 'معايير التقييم'
      },
      {
        front: 'ما هي الوثائق الأربع الرئيسية التي تُسلم في الحزمة النهائية للمشروع؟',
        back: '1) سجل مخاطر في جدول بيانات، 2) تقرير مخاطر مكتوب، 3) عرض قرار مسجل، 4) قائمة تحقق موقعة يُرفق بها نموذج مراجعة أقران.',
        category: 'طريقة التسليم'
      },
      {
        front: 'كيف يتجنب الطالب خطأ «الإسناد الناقص» عند إعداد مشروع تحليل المخاطر؟',
        back: 'بتدوين المصدر أو المعيار أو قالب السجل أو الأداة المستخدمة لحظة استعمالها أثناء العمل، لا تأجيل ذلك إلى لحظة التسليم النهائي.',
        category: 'الأخطاء الشائعة'
      },
      {
        front: 'في المثال المحلول للمنصة، لماذا وُجّه خطر تسريب البيانات عبر API (الدرجة 28 — المجموعة 2) إلى التخفيف الإلزامي بدلاً من التأجيل؟',
        back: 'لأن تسريب البيانات الشخصية والطبية ينتج أثراً مرتفعاً (3) في مجالي السمعة والغرامات التنظيمية ويتجاوز حد التحمل الصارم لخصوصية البيانات الوطنية.',
        category: 'المثال المحلول'
      }
    ],
    miniQuiz: [
      {
        question: 'كم يبلغ عدد المخرجات التفصيلية لحزمة تحليل التهديدات والمخاطر لمنصة «مواعيدي»، وما أوزان معايير التقييم الخمسة في الروبوك (Rubric)؟',
        options: [
          '7 مخرجات تفصيلية، و5 معايير تقييم بوزن متساوٍ (20% لكل معيار)',
          'مخرج واحد فقط، ومعيار واحد بوزن 100%',
          '3 مخرجات، بدون معايير تقييم',
          '15 مخرجاً، بوزن 5% لكل معيار'
        ],
        correctIndex: 0,
        explanation: 'تضم حزمة مشروع مواعيدي 7 مخرجات متكاملة، وتُقيّم وفق 5 معايير (الترابط، الواقعية، الاكتمال، التبرير، التوثيق) بوزن 20% لكل معيار.'
      },
      {
        question: 'في المثال المحلول للمرحلة الثالثة (حساب درجة الخطر لـ R-01: تعطل عنقود الحاويات السحابية وقت الذروة)، إذا كانت الرتب: السلامة(5)، السمعة(4)، الإنتاجية(3)، الغرامات(2)، المالي(1)، وكانت قيم الأثر: السمعة(3)، الإنتاجية(3)، السلامة(2)، المالي(2)، الغرامات(1)، فكم تبلغ الدرجة النسبية؟',
        options: [
          '35 من 45',
          '20 من 45',
          '45 من 45',
          '15 من 45'
        ],
        correctIndex: 0,
        explanation: 'الحساب: السلامة(5×2=10) + السمعة(4×3=12) + الإنتاجية(3×3=9) + الغرامات(2×1=2) + المالي(1×2=2) = 10 + 12 + 9 + 2 + 2 = 35.'
      },
      {
        question: 'ما الغرض من تخصيص اليومين 11 و12 في الجدول الزمني للمشروع لـ «مراجعة الأقران» (Peer Review) قبل التسليم النهائي في اليوم 14؟',
        options: [
          'فحص اتساق التقديرات واكتشاف أي انقطاع منطقي بين الحاويات والسيناريوهات والضوابط وتصحيحه في اليومين 13 و14 قبل التسليم النهائي',
          'إلغاء المشروع وإعادته من الصفر',
          'نقل ملكية المشروع لطالب آخر',
          'حذف الملاحق التحليلية'
        ],
        correctIndex: 0,
        explanation: 'تتيح مراجعة الأقران في اليومين 11–12 فحصاً موضوعياً متبادلاً يكتشف فجوات التبرير أو عدم الترابط، ليتم تحسين العمل في اليومين 13–14.'
      },
      {
        question: 'أي من الممارسات التالية تُعدّ «خطأً شائعاً» يؤدي إلى خفض درجة معيار «الترابط المنطقي» في تقييم المشروع؟',
        options: [
          'اقتراح ضابط أمني في المرحلة الرابعة لا يعالج الحاوية ولا الثغرة المذكورتين في سيناريو المرحلة الثانية',
          'ربط كل سيناريو تهديد بحاويته الدقيقة وضابطه المقابل',
          'ذكر المخاطر المتبقية بعد كل ضابط مقترح',
          'تدوين المصادر لحظة استخدامها'
        ],
        correctIndex: 0,
        explanation: 'انفصال الضابط المقترح عن الحاوية والسيناريو الأصلي يكسر التسلسل المنطقي بين مراحل المشروع الخمس.'
      }
    ],
    interactiveBook3D: {
      model3DType: 'mawaidi_national_cloud_topology',
      shaderEffect: 'national_cloud_quantum_mesh',
      ambientColor: '#041f1e',
      accentColor: '#10b981',
      autoRotateSpeed: 1.3,
      pages3D: [
        {
          pageNumber: 1,
          spreadSide: 'right',
          title: 'المعمارية السحابية ثلاثية الأبعاد لمنصة «مواعيدي» الوطنية',
          subtitle: 'محاكاة شاملة للمراحل الخمس والمخرجات السبعة وحساب المخاطر الثلاثة',
          summaryMarkdown: 'يُجسد المجسم ثلاثي الأبعاد **البنية السحابية الوطنية لمنصة «مواعيدي»** (عناقيد الحاويات البرمجية Kubernetes، بوابات API، قاعدة بيانات المواعيد المشفرة، ودرع الحماية السيبراني المتوافق مع ضوابط NCA ECC وCCC).',
          interactiveFormula: 'Project_Score = 0.20×Coherence + 0.20×Realism + 0.20×Completeness + 0.20×Justification + 0.20×Documentation',
          labParameterName: 'المرحلة النشطة من مراحل المشروع الخمس',
          labMin: 1,
          labMax: 5,
          labDefault: 3,
          labUnit: 'مرحلة مشروع',
          labInterpretation: {
            1: 'المرحلة 1 (الأيام 1–3): تحديد نطاق منصة مواعيدي وجرد الأصول الحرجة وخرائط الحاويات السحابية والبشرية.',
            2: 'المرحلة 2 (الأيام 4–5): بناء سيناريوهات التهديد وتعبئة سجل المخاطر الأولي.',
            3: 'المرحلة 3 (اليوم 6): حساب الدرجات النسبية (R-01=35، R-02=28، R-03=15) ومصفوفة الأولويات.',
            4: 'المرحلة 4 (الأيام 7–8): تصميم مصفوفة الضوابط (WAF, mTLS, Auto-Scaling) وحساب المخاطر المتبقية.',
            5: 'المرحلة 5 (الأيام 9–14): صياغة التقرير التنفيذي، مراجعة الأقران، وتقديم عرض القرار النهائي.'
          },
          challengeQuestion: {
            question: 'عند تسليم حزمة مشروع «مواعيدي» النهائية، كيف تتحقق من استيفاء معيار «الترابط المنطقي» (20%)؟',
            options: [
              'بالتأكد من أن كل أصل في المرحلة 1 له حاويات محددة، وأن كل سيناريو في المرحلة 2 يقع في إحدى هذه الحاويات، وأن درجته في المرحلة 3 توجه ضابطاً على نفس الحاوية في المرحلة 4، ويُلخص ذلك في تقرير المرحلة 5',
              'بزيادة عدد الألوان في الجداول فقط',
              'بكتابة أسماء ضوابط عشوائية لا علاقة لها بالسحابة',
              'بتسليم التقرير بدون سجل مخاطر'
            ],
            correctIndex: 0,
            feedbackCorrect: 'إجابة شاملة ودقيقة! هذا الخيط المتصل من الأصل والحاوية حتى الضابط والخطر المتبقي والقرار هو جوهر الترابط المنطقي.',
            feedbackWrong: 'الترابط المنطقي يعني اتصال السلسلة كاملة: الأصل ← الحاوية ← السيناريو ← الدرجة ← الضابط على الحاوية ← الخطر المتبقي ← قرار الاعتماد.'
          },
          aiTutorGuardrailTopics: ['مشروع مواعيدي', 'بوابة الواحة', 'المخرجات السبعة', 'المراحل الخمس', 'معايير التقييم Rubric', 'مراجعة الأقران', 'ضوابط السحابة NCA CCC']
        },
        {
          pageNumber: 2,
          spreadSide: 'left',
          title: 'مختبر فحص جودة التسليم النهائي لمشروع «مواعيدي» (Rubric Inspector)',
          subtitle: 'التحقق من المخرجات السبعة وتجنب الأخطاء الشائعة قبل التسليم',
          summaryMarkdown: 'تمثل الصفحة اليسرى **أداة الفحص الذاتي ومراجعة الأقران** لحزمة مشروع منصة «مواعيدي» الوطنية، حيث تتحقق من اكتمال المراحل الخمس والمخرجات السبعة واستيفاء معايير التقييم الخمسة ($5 \times 20\%$).',
          interactiveFormula: 'Readiness_Index = ∑_{k=1}^{5} Rubric_Criterion_k (20% each) = 100%',
          labParameterName: 'عدد معايير الروبوك (Rubric) المستوفاة بالكامل قبل التسليم',
          labMin: 1,
          labMax: 5,
          labDefault: 5,
          labUnit: 'معايير مستوفاة (×20%)',
          labInterpretation: {
            1: '20% (اكتمال جزئي فقط): وجود انقطاع منطقي بين الحاويات والضوابط وغياب المبررات.',
            2: '40% (اكتمال + واقعية أولية): نقص في تبرير الدرجات وإغفال المخاطر المتبقية.',
            3: '60% (متوسط): الحزمة مكتملة لكن تفتقر لمراجعة الأقران أو دقة الإسناد العلمي.',
            4: '80% (جيد جداً): ترابط منطقي وواقعية وتبرير قوي مع حاجة لتجويد الملخص التنفيذي.',
            5: '100% (امتياز كامل): استيفاء الترابط المنطقي والواقعية والاكتمال والتبرير والتوثيق والإسناد اللحظي.'
          },
          challengeQuestion: {
            question: 'أثناء إعداد مشروع «مواعيدي»، استعان الطالب بقالب سجل مخاطر قياسي وبمعيار NIST SP 800-30. متى وكيف يجب عليه توثيق هذا الإسناد العلمي لتجنب خطأ «الإسناد الناقص»؟',
            options: [
              'يدون المصدر والمعيار وقالب السجل في قائمة المراجع ومواضع الاقتباس لحظة استعماله أثناء العمل، ولا يؤجل ذلك إلى لحظة التسليم النهائي',
              'لا يذكر المصادر إطلاقاً لأنها معروفة',
              'يحذف أسماء المعايير من التقرير',
              'يكتفي بذكرها شفهياً بعد انتهاء الفصل الدراسي'
            ],
            correctIndex: 0,
            feedbackCorrect: 'أحسنت! القاعدة الذهبية في الفصل الحادي عشر هي تدوين المصدر لحظة استعماله أثناء العمل لمنع السهو أو الإسناد الناقص عند التسليم.',
            feedbackWrong: 'تذكر نصيحة الكتاب المقرر: يُتجنب الإسناد الناقص بتدوين المصدر لحظة استعماله، لا عند التسليم.'
          },
          aiTutorGuardrailTopics: ['تسليم مشروع مواعيدي', 'الأخطاء الشائعة', 'الإسناد العلمي', 'قائمة التحقق الموقعة']
        }
      ],
      stepByStep: [
        {
          stepNumber: 1,
          title: 'المرحلة 1: تحديد نطاق منصة «مواعيدي» وجرد الأصول وخرائط الحاويات',
          description: 'توثيق الأصول الحرجة الثلاثة (بيانات المواعيد، مفاتيح API، سجلات الإحالات) ورسم حاوياتها السحابية والمادية والبشرية.',
          formulaOrRule: 'Stage 1 → Scope Document + Asset Profiles (WS 8) + Container Maps (WS 9a–9c)',
          visualState: 'mawaidi_stage1_containers',
          cameraFocus: { x: -2.2, y: 1.5, z: 3.0 }
        },
        {
          stepNumber: 2,
          title: 'المرحلة 2: بناء سيناريوهات التهديد وسجل المخاطر الأولي',
          description: 'استنباط سيناريوهات تهديد واقعية من أشجار التهديد الأربع تغطي الحاويات التقنية السحابية والمادية والبشرية.',
          formulaOrRule: 'Stage 2 → Threat Scenarios Table + Initial Risk Register',
          visualState: 'mawaidi_stage2_threats',
          cameraFocus: { x: -0.8, y: 1.5, z: 3.0 }
        },
        {
          stepNumber: 3,
          title: 'المرحلة 3: حساب درجات الخطر النسبية ومصفوفة الأولويات',
          description: 'تطبيق أوزان المجالات الخمسة لحساب الدرجات (مثل R-01=35، R-02=28، R-03=15) وتوزيعها في الأحواض الأربعة.',
          formulaOrRule: 'Stage 3 → Relative Risk Scores & 5x5 / Allegro Matrix Prioritization',
          visualState: 'mawaidi_stage3_scoring',
          cameraFocus: { x: 0.8, y: 1.5, z: 3.0 }
        },
        {
          stepNumber: 4,
          title: 'المرحلة 4: سد فجوات الضوابط وتحديد المخاطر المتبقية وخطة الاستجابة',
          description: 'ربط كل خطر بضوابط وقائية وكشفية وتصحيحية متوافقة مع NCA ECC وCCC وتقدير الخطر المتبقي.',
          formulaOrRule: 'Stage 4 → Controls Matrix + Incident Response Plan + Residual Risk Memo',
          visualState: 'mawaidi_stage4_controls',
          cameraFocus: { x: 2.2, y: 1.5, z: 3.0 }
        },
        {
          stepNumber: 5,
          title: 'المرحلة 5: إعداد التقرير التنفيذي ومراجعة الأقران وعرض القرار',
          description: 'تجميع المخرجات السبعة ومراجعتها مع الأقران وتقديم عرض القرار النهائي لاعتماد التوصيات والمخاطر المتبقية.',
          formulaOrRule: 'Stage 5 → Final Report + Signed Checklist & Peer Review + Recorded Decision Pitch',
          visualState: 'mawaidi_stage5_capstone_complete',
          cameraFocus: { x: 0.0, y: -1.5, z: 3.6 }
        }
      ],
      hotspots: [
        {
          id: 'hs-ch11-k8s',
          label: 'عنقود الحاويات السحابية (Cloud IaaS & Containers)',
          x: -1.9,
          y: 1.3,
          z: 0.5,
          coordinates: { x: -1.9, y: 1.3, z: 0.5 },
          title: 'الخطر R-01: تعطل عنقود الحاويات السحابية وقت ذروة الحجز (الدرجة 35)',
          detailedExplanation: 'يقع في المجموعة 1 (درجة 35 واحتمالية مرتفعة)؛ ويعالج بتفعيل التوسع التلقائي (Auto-Scaling) وحماية DDoS وتوزيع الأحمال عبر منطقتي توافر وطنيتين.',
          technicalMetric: 'Risk R-01: Score 35/45 (Pool 1 — Immediate Mitigation)',
          securityImpact: 'حرج جداً',
          relatedControl: 'NCA CCC & ECC-2:2024 — صمود الأمن السيبراني وتوافر السحابة (3-1)'
        },
        {
          id: 'hs-ch11-api',
          label: 'بوابة التكامل البرمجي (API Gateway & Auth)',
          x: 1.9,
          y: 1.3,
          z: 0.5,
          coordinates: { x: 1.9, y: 1.3, z: 0.5 },
          title: 'الخطر R-02: تسريب بيانات المواعيد والهويات عبر ثغرة API (الدرجة 28)',
          detailedExplanation: 'يقع في المجموعة 2 (درجة 28 واحتمالية متوسطة)، ويوجه للتخفيف الإلزامي لخرقه حد تحمل الغرامات والخصوصية عبر مصادقة mTLS وتشفير الحقول.',
          technicalMetric: 'Risk R-02: Score 28/45 (Pool 2 — Mandatory Mitigation)',
          securityImpact: 'حرج جداً',
          relatedControl: 'NCA ECC-2:2024 — أمن التطبيقات وواجهات التكامل وحماية البيانات (2-6 و 2-7)'
        },
        {
          id: 'hs-ch11-deliverables',
          label: 'حزمة المخرجات السبعة (7 Deliverables Hub)',
          x: -1.7,
          y: -1.3,
          z: 0.5,
          coordinates: { x: -1.7, y: -1.3, z: 0.5 },
          title: 'تكامل المخرجات السبعة والجدول الزمني (14 يوماً)',
          detailedExplanation: 'تضم وثيقة النطاق والجرد، جدول التهديدات، سجل المخاطر، مصفوفة الضوابط، خطة الاستجابة، مذكرة القرارات، وتقرير مراجعة الأقران.',
          technicalMetric: '7 Deliverables across 5 Stages in 14 Days',
          securityImpact: 'مرتفع',
          relatedControl: 'OCTAVE Allegro & NIST SP 800-30 Full Assessment Package'
        },
        {
          id: 'hs-ch11-rubric',
          label: 'بوابة سلم التقييم ومراجعة الأقران (Rubric & Peer Gate)',
          x: 1.7,
          y: -1.3,
          z: 0.5,
          coordinates: { x: 1.7, y: -1.3, z: 0.5 },
          title: 'سلم التقييم الخماسي (5 × 20%) وضمان جودة الإسناد',
          detailedExplanation: 'يقيس الترابط المنطقي (20%)، الواقعية (20%)، الاكتمال (20%)، تبرير القرارات (20%)، والتوثيق والإسناد اللحظي (20%).',
          technicalMetric: '100% Rubric Score + Signed Peer Review Form',
          securityImpact: 'مرتفع',
          relatedControl: 'Academic Integrity & Quality Assurance Standard — UPMN075'
        }
      ]
    },
    richData: {
      id: 211,
      chapter_number: 11,
      title: 'المشروع التراكمي التطبيقي (تقييم ومعالجة مخاطر منصة «مواعيدي» الوطنية)',
      subtitle: 'بناء حزمة تحليل المخاطر المتكاملة عبر المراحل الخمس والمخرجات السبعة',
      category: 'تطبيقي',
      pdfStartPage: 119,
      pdfEndPage: 128,
      description: 'المشروع التراكمي الختامي لتطبيق منهجية تحليل المخاطر السيبرانية على منصة «مواعيدي» الوطنية.',
      objectives: [
        'تطبيق المراحل الخمس للمشروع التراكمي من تحديد النطاق وجرد الأصول حتى عرض القرار.',
        'إعداد المخرجات السبعة لحزمة تحليل المخاطر لمنصة «مواعيدي» السحابية.',
        'حساب وترتيب درجات الخطر النسبية للمخاطر الثلاثة المحلولة في المنصة.',
        'الالتزام بمعايير التقييم الخمسة (Rubric) وتجنب الأخطاء الشائعة في مشاريع تحليل المخاطر.'
      ],
      sections: [
        {
          heading: '1. المراحل الخمس والمخرجات السبعة لمشروع منصة مواعيدي',
          content: 'يطبق المشروع دورة تقييم مخاطر كاملة على منصة مواعيد طبية سحابية حكومية، وينتج حزمة من 7 مخرجات مترابطة خلال 14 يوماً.',
          formula: 'Total Grade = 20%(Coherence) + 20%(Realism) + 20%(Completeness) + 20%(Justification) + 20%(Documentation)',
          saudiExample: 'تأمين منصة «مواعيدي» الصحية الوطنية وفق منهجية OCTAVE Allegro وضوابط الهيئة الوطنية للأمن السيبراني (NCA ECC & CCC).'
        }
      ],
      tables: [
        {
          title: 'معايير تقييم المشروع التراكمي (Rubric)',
          headers: ['المعيار', 'الوزن', 'وصف المستوى الممتاز'],
          rows: [
            ['الترابط المنطقي', '20%', 'كل الأقسام والمراحل مترابطة من الأصل والحاوية حتى الضابط والخطر المتبقي'],
            ['الواقعية والتطبيق', '20%', 'السيناريوهات والضوابط مناسبة لبيئة منصة مواعيدي السحابية والقطاع الصحي'],
            ['اكتمال المكونات', '20%', 'جميع المخرجات السبعة والحقول التسعة مكتملة دون نقص'],
            ['تبرير القرارات', '20%', 'جميع الدرجات وقرارات المعالجة مبررة مالياً وتشغيلياً وبإطار زمني'],
            ['التوثيق والاحترافية', '20%', 'ملف منسق، ملخص تنفيذي واضح، ومصادر مسندة لحظة استعمالها']
          ]
        }
      ],
      commonMistake: {
        mistake: 'استعمال قوالب أو أدوات دون إسنادها لحظة العمل، أو اقتراح ضوابط لا ترتبط بالحاويات المحددة في المرحلة الأولى.',
        fix: 'تدوين المصادر لحظة استعمالها، والتحقق من خيط الترابط المنطقي بين المراحل الخمس عبر مراجعة الأقران.'
      },
      solvedExamples: [
        {
          title: 'تقييم وترتيب المخاطر الثلاثة في منصة مواعيدي / بوابة الواحة',
          given: 'الرتب: السلامة(5)، السمعة(4)، الإنتاجية(3)، الغرامات(2)، المالي(1). المخاطر: R-01 (تعطل سحابي)، R-02 (تسريب API)، R-03 (خطأ رقم جوال فردي).',
          steps: [
            'حساب R-01: (5×2)+(4×3)+(3×3)+(2×1)+(1×2) = 35 (احتمالية مرتفعة) → المجموعة 1 (تخفيف فوري).',
            'حساب R-02: (5×1)+(4×3)+(3×1)+(2×3)+(1×2) = 28 (احتمالية متوسطة) → المجموعة 2 (تخفيف إلزامي لخرق حد تحمل الغرامات والخصوصية).',
            'حساب R-03: (5×1)+(4×1)+(3×1)+(2×1)+(1×1) = 15 (احتمالية منخفضة) → المجموعة 4 (قبول مع تحقق OTP).'
          ],
          result: 'ترتيب الأولويات: R-01 (35) ثم R-02 (28) ثم R-03 (15).',
          whyItMatters: 'يقدم نموذجاً مرجعياً كاملاً لكيفية تنفيذ المرحلة الثالثة والرابعة في المشروع التراكمي.'
        }
      ],
      selfAssessment: [
        {
          question: 'ما الوثائق الأربع الرئيسية التي تتكون منها حزمة التسليم النهائية في الفصل الحادي عشر؟',
          answer: '1) سجل مخاطر في جدول بيانات، 2) تقرير مخاطر مكتوب، 3) عرض قرار مسجل، 4) قائمة تحقق موقعة يُرفق بها نموذج مراجعة أقران.'
        }
      ],
      quiz: [
      {
        question: 'كم يبلغ عدد المخرجات التفصيلية لحزمة تحليل التهديدات والمخاطر لمنصة «مواعيدي»، وما أوزان معايير التقييم الخمسة في الروبوك (Rubric)؟',
        options: [
          '7 مخرجات تفصيلية، و5 معايير تقييم بوزن متساوٍ (20% لكل معيار)',
          'مخرج واحد فقط، ومعيار واحد بوزن 100%',
          '3 مخرجات، بدون معايير تقييم',
          '15 مخرجاً، بوزن 5% لكل معيار'
        ],
        correctIndex: 0,
        explanation: 'تضم حزمة مشروع مواعيدي 7 مخرجات متكاملة، وتُقيّم وفق 5 معايير (الترابط، الواقعية، الاكتمال، التبرير، التوثيق) بوزن 20% لكل معيار.'
      },
      {
        question: 'في المثال المحلول للمرحلة الثالثة (حساب درجة الخطر لـ R-01: تعطل عنقود الحاويات السحابية وقت الذروة)، إذا كانت الرتب: السلامة(5)، السمعة(4)، الإنتاجية(3)، الغرامات(2)، المالي(1)، وكانت قيم الأثر: السمعة(3)، الإنتاجية(3)، السلامة(2)، المالي(2)، الغرامات(1)، فكم تبلغ الدرجة النسبية؟',
        options: [
          '35 من 45',
          '20 من 45',
          '45 من 45',
          '15 من 45'
        ],
        correctIndex: 0,
        explanation: 'الحساب: السلامة(5×2=10) + السمعة(4×3=12) + الإنتاجية(3×3=9) + الغرامات(2×1=2) + المالي(1×2=2) = 10 + 12 + 9 + 2 + 2 = 35.'
      },
      {
        question: 'ما الغرض من تخصيص اليومين 11 و12 في الجدول الزمني للمشروع لـ «مراجعة الأقران» (Peer Review) قبل التسليم النهائي في اليوم 14؟',
        options: [
          'فحص اتساق التقديرات واكتشاف أي انقطاع منطقي بين الحاويات والسيناريوهات والضوابط وتصحيحه في اليومين 13 و14 قبل التسليم النهائي',
          'إلغاء المشروع وإعادته من الصفر',
          'نقل ملكية المشروع لطالب آخر',
          'حذف الملاحق التحليلية'
        ],
        correctIndex: 0,
        explanation: 'تتيح مراجعة الأقران في اليومين 11–12 فحصاً موضوعياً متبادلاً يكتشف فجوات التبرير أو عدم الترابط، ليتم تحسين العمل في اليومين 13–14.'
      },
      {
        question: 'أي من الممارسات التالية تُعدّ «خطأً شائعاً» يؤدي إلى خفض درجة معيار «الترابط المنطقي» في تقييم المشروع؟',
        options: [
          'اقتراح ضابط أمني في المرحلة الرابعة لا يعالج الحاوية ولا الثغرة المذكورتين في سيناريو المرحلة الثانية',
          'ربط كل سيناريو تهديد بحاويته الدقيقة وضابطه المقابل',
          'ذكر المخاطر المتبقية بعد كل ضابط مقترح',
          'تدوين المصادر لحظة استخدامها'
        ],
        correctIndex: 0,
        explanation: 'انفصال الضابط المقترح عن الحاوية والسيناريو الأصلي يكسر التسلسل المنطقي بين مراحل المشروع الخمس.'
      }
    ],
      flashcards: [
      {
        front: 'ما هي المخرجات السبعة التفصيلية لحزمة مشروع منصة «مواعيدي»؟',
        back: '1) وثيقة النطاق والجرد، 2) جدول تحليل التهديدات، 3) سجل المخاطر، 4) مصفوفة الضوابط، 5) خطة الاستجابة للحوادث، 6) مذكرة القرارات، 7) تقرير التقويم الذاتي ومراجعة الأقران.',
        category: 'مخرجات المشروع'
      },
      {
        front: 'ما هي المراحل الخمس لسير المشروع التطبيقي التراكمي؟',
        back: '1) نطاق المشروع وجرد الأصول، 2) سيناريوهات المخاطر وسجل المخاطر، 3) تقييم الأثر والاحتمالية وترتيب الأولويات، 4) فجوات الضوابط والمعالجة والمخاطر المتبقية، 5) تقرير المخاطر وعرض القرار.',
        category: 'مراحل المشروع'
      },
      {
        front: 'ما هي معايير التقييم الخمسة (Rubric) للمشروع التراكمي وما وزن كل منها؟',
        back: '1) الترابط المنطقي (20%)، 2) الواقعية والتطبيق (20%)، 3) اكتمال المكونات (20%)، 4) تبرير القرارات (20%)، 5) التوثيق والاحترافية والإسناد (20%).',
        category: 'معايير التقييم'
      },
      {
        front: 'ما هي الوثائق الأربع الرئيسية التي تُسلم في الحزمة النهائية للمشروع؟',
        back: '1) سجل مخاطر في جدول بيانات، 2) تقرير مخاطر مكتوب، 3) عرض قرار مسجل، 4) قائمة تحقق موقعة يُرفق بها نموذج مراجعة أقران.',
        category: 'طريقة التسليم'
      },
      {
        front: 'كيف يتجنب الطالب خطأ «الإسناد الناقص» عند إعداد مشروع تحليل المخاطر؟',
        back: 'بتدوين المصدر أو المعيار أو قالب السجل أو الأداة المستخدمة لحظة استعمالها أثناء العمل، لا تأجيل ذلك إلى لحظة التسليم النهائي.',
        category: 'الأخطاء الشائعة'
      },
      {
        front: 'في المثال المحلول للمنصة، لماذا وُجّه خطر تسريب البيانات عبر API (الدرجة 28 — المجموعة 2) إلى التخفيف الإلزامي بدلاً من التأجيل؟',
        back: 'لأن تسريب البيانات الشخصية والطبية ينتج أثراً مرتفعاً (3) في مجالي السمعة والغرامات التنظيمية ويتجاوز حد التحمل الصارم لخصوصية البيانات الوطنية.',
        category: 'المثال المحلول'
      }
    ]
    },
    updated_at: NOW_TIMESTAMP
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// 3. كائن توصيف المقرر الكامل (COURSE_UPMN075_RISK_INFO)
// ═══════════════════════════════════════════════════════════════════════════

export const COURSE_UPMN075_RISK_INFO: CourseInfo = {
  id: '770e8400-e29b-41d4-a716-446655440002',
  slug: 'ise232-risk',
  code: 'UPMN075',
  title: 'تحليل المخاطر السيبرانية',
  titleEn: 'Cyber Risk Analysis',
  category: 'إدارة المخاطر والحوكمة',
  level: 'المستوى الرابع (دبلوم أمن المعلومات المشارك - المتوسط)',
  icon: 'AlertTriangle',
  color: 'from-amber-500 to-orange-600',
  accent: '#f59e0b',
  badge: 'OCTAVE Allegro / NIST 800-30 / ISO 27005 / FAIR',
  neonColor: 'amber',
  status: 'available',
  chaptersCount: 11,
  totalHours: 54,
  deliveryMode: 'نظري + تطبيقي + مختبر كتاب تفاعلي ثلاثي الأبعاد (3D)',
  language: 'العربية (مع المصطلحات التقنية والمعادلات الإنجليزية المعتمدة)',
  instructor: 'فريق الهندسة الأكاديمية للأمن السيبراني — منصة مرصاد التشفير',
  prerequisite: 'ISE 231 — تخطيط وإدارة الأمن السيبراني',
  description:
    'يتناول هذا المقرر المفاهيم والمنهجيات العلمية والعملية لتحليل مخاطر أمن المعلومات وحماية الأصول الرقمية والمعلوماتية للمؤسسات. يرتكز المقرر على منهجية OCTAVE Allegro (المراحل الـ 4 والخطوات الـ 8 وأوراق العمل الـ 10)، وبناء أشجار التهديد، والتحليل النوعي وشبه الكمي والكمي (معادلات AV, EF, SLE, ARO, ALE, ROSI ونموذج FAIR)، وبناء مصفوفة المخاطر المعيارية (5×5)، واستراتيجيات المعالجة الأربع، وتطبيق المعايير الدولية والوطنية (ISO/IEC 27005، NIST SP 800-30 Rev.1، وضوابط الهيئة الوطنية للأمن السيبراني NCA ECC-2:2024)، وإعداد التقارير التنفيذية وسجل المخاطر، انتهاءً بدراسة حالة المستشفى (PBCD) والمشروع التراكمي لمنصة «مواعيدي» الوطنية.',
  vision:
    'تأهيل كوادر وطنية متخصصة قادرة على تشخيص وتحليل وتقييم المخاطر السيبرانية كمياً ونوعياً، وصياغة قرارات معالجة مبنية على المخاطر تدعم صمود البنى التحتية الوطنية وتتكامل مع مستهدفات رؤية المملكة 2030.',
  mission:
    'تمكين الطالب من إتقان منهجيات تحليل المخاطر المعتمدة دولياً ووطنياً (OCTAVE Allegro، NIST SP 800-30، ISO/IEC 27005، FAIR، وضوابط NCA) عبر محتوى أكاديمي رصين ومختبرات محاكاة ثلاثية الأبعاد ودراسات حالة واقعية في القطاعات الصحية والمالية والحكومية.',
  learningOutcomes: [
    'المعرفة والفهم: شرح المفاهيم الأساسية لتحليل مخاطر أمن المعلومات، والتمييز بين الثغرة والتهديد والخطر، وبين القرار المبني على المخاطر والقرار التفاعلي.',
    'المعرفة والفهم: توضيح إطار عمل إدارة مخاطر أمن المعلومات، والمراحل الأربع والخطوات الثماني في منهجية OCTAVE Allegro، وخرائط الحاويات الثلاث (التقنية، المادية، البشرية).',
    'المعرفة والفهم: تفسير أساليب وتقنيات التحليل النوعي وشبه الكمي والكمي، ومعادلات (AV, EF, SLE, ARO, ALE, ROSI) وأنطولوجيا نموذج FAIR الكمي.',
    'المهارات: تطبيق خطوات تقييم الأثر والاحتمالية وحساب درجة الخطر النسبية وبناء مصفوفة المخاطر المعيارية (5×5) ومصفوفة المخاطر النسبية (Pools 1–4).',
    'المهارات: اختيار استراتيجيات معالجة المخاطر الأربع (التخفيف، النقل، التجنب، القبول) وتصميم الضوابط الوقائية والكشفية والتعويضية على مستوى الحاوية وحساب المخاطر المتبقية.',
    'المهارات: استخدام أدوات وبرامج تحليل المخاطر ومنصات الحوكمة (GRC)، ومواءمة التقييم مع معايير ISO/IEC 27005 وNIST SP 800-30 Rev.1 وضوابط NCA ECC-2:2024.',
    'المهارات: تصميم وصياغة تقارير تحليل المخاطر التنفيذية وسجل المخاطر المؤسسي (Risk Register) وتنفيذ مشروع تطبيقي تراكمي متكامل لمنصة «مواعيدي» الوطنية.',
    'القيم والاستقلالية والمسؤولية: الالتزام بأخلاقيات المهنة، وحماية سرية تقارير المخاطر، وتطبيق مراجعة الأقران الموضوعية والإسناد العلمي الدقيق.'
  ],
  topics: [
    'منهجية OCTAVE Allegro (4 مراحل و8 خطوات)',
    'أشجار التهديد الأربع (Threat Trees)',
    'الأصول الحرجة والحاويات الثلاث (9a, 9b, 9c)',
    'التحليل الكمي والنوعي ومعادلات SLE / ALE / ROSI',
    'درجة الخطر النسبية ومصفوفة المخاطر 5×5',
    'استراتيجيات المعالجة الأربع والمخاطر المتبقية',
    'أدوات التقييم ومنصات GRC ونموذج FAIR الكمي',
    'معايير ISO/IEC 27005 وNIST SP 800-30 وضوابط NCA',
    'تقارير المخاطر التنفيذية وسجل المخاطر المؤسسي',
    'دراسة حالة المستشفى الشاملة (PBCD — 8 سيناريوهات)',
    'المشروع التراكمي التطبيقي: منصة «مواعيدي» الوطنية'
  ],
  features: [
    '11 فصلاً أكاديمياً متكاملاً تغطي كامل مفردات المقرر دون اختصار',
    '55 شريحة عرض تقديمي تفاعلية (5 شرائح لكل فصل)',
    '66 بطاقة استذكار ذكية مرمزة حسب الفئات (6 بطاقات لكل فصل)',
    '44 سؤال اختبار قصير محلول بالتفصيل العلمي (4 أسئلة لكل فصل)',
    '11 مختبراً وكتاباً تفاعلياً ثلاثي الأبعاد (interactiveBook3D) بـ 44 نقطة ساخنة (Hotspots) بإحداثيات (x,y,z)',
    '11 مخططاً متجهياً قياسياً (diagramKey: ise232-risk-1 إلى ise232-risk-11)'
  ],
  weeklyPlan: [
    {
      week: 1,
      topic: 'مدخل إلى تحليل المخاطر السيبرانية ومنهجية OCTAVE Allegro (المراحل الـ 4 والخطوات الـ 8)',
      chapterNumber: 1,
      practicalLab: 'مختبر مقارنة القرار المبني على المخاطر بالقرار التفاعلي وتحليل الخطر الكامن والمتبقي',
      deliverable: 'ورقة عمل التمييز بين الثغرات والمخاطر وتحديد الأصول'
    },
    {
      week: 2,
      topic: 'تحليل التهديدات الداخلية والخارجية وبناء أشجار التهديد (Threat Trees: الفاعل، الدافع، المسار، النتيجة)',
      chapterNumber: 2,
      practicalLab: 'بناء أشجار التهديد الأربع وفصل موقع الحاوية عن نوع الفاعل',
      deliverable: 'خريطة سيناريوهات التهديد والنتائج الأربع (إفشاء، تعديل، فقدان، انقطاع)'
    },
    {
      week: 3,
      topic: 'إطار إدارة المخاطر وتحديد الأصول الحرجة وحاويات الأصول (Asset Containers: تقنية، مادية، بشرية)',
      chapterNumber: 3,
      practicalLab: 'تطبيق تحليل التقارب (Affinity Analysis) وتعبئة ورقة العمل 8 وأوراق الحاويات 9a و9b و9c',
      deliverable: 'ملف الأصل المعلوماتي الحرج وخريطة بيئة خطر الأصل'
    },
    {
      week: 4,
      topic: 'التحليل النوعي والكمي للمخاطر السيبرانية ومعادلات (AV, EF, SLE, ARO, ALE, وحساب عائد الاستثمار الأمني ROSI)',
      chapterNumber: 4,
      practicalLab: 'معايرة الحدود الفاصلة لمجالات الأثر الستة وحساب SLE وALE وROSI مالياً',
      deliverable: 'تقرير الجدوى المالية للضوابط الأمنية بالريال السعودي'
    },
    {
      week: 5,
      topic: 'تقييم الأثر والاحتمالية وبناء مصفوفة المخاطر المعيارية (5×5 Risk Matrix) وأوراق عمل المخاطر',
      chapterNumber: 5,
      practicalLab: 'حساب درجة الخطر النسبية (من 45 و63) وتطبيق مسار مراجعة الأقران رباعي الخطوات',
      deliverable: 'مصفوفة المخاطر 5×5 ومصفوفة المجموعات الأربعة (Pools 1–4)'
    },
    {
      week: 6,
      topic: 'استراتيجيات معالجة المخاطر الأربع (التخفيف، النقل، القبول، التجنب) والمخاطر المتبقية (Residual Risk)',
      chapterNumber: 6,
      practicalLab: 'تصميم الضوابط الوقائية والكشفية والتعويضية على مستوى الحاوية وحساب الخطر المتبقي',
      deliverable: 'خطة معالجة المخاطر وتقييم كفاية الضوابط'
    },
    {
      week: 7,
      topic: 'أدوات وتقنيات تقييم المخاطر السيبرانية ونموذج FAIR الكمي',
      chapterNumber: 7,
      practicalLab: 'بناء قاعدة بيانات ورقة العمل 10 ذات الحقول التسعة ومحاكاة مونت كارلو في نموذج FAIR',
      deliverable: 'نموذج سجل مخاطر إلكتروني متحقق من صحة وجودة البيانات'
    },
    {
      week: 8,
      topic: 'المعايير الدولية والوطنية لإدارة المخاطر (ISO/IEC 27005، NIST SP 800-30، وضوابط NCA)',
      chapterNumber: 8,
      practicalLab: 'تطبيق الخطوات الأربع والمهام الست في NIST SP 800-30 ومواءمتها مع الضابط (1-5) في NCA ECC',
      deliverable: 'مصفوفة مواءمة وإعادة استخدام نتائج التقييم بين ISO وNIST وNCA'
    },
    {
      week: 9,
      topic: 'إعداد وتوثيق تقارير المخاطر التنفيذية وسجل المخاطر المؤسسي (Risk Register)',
      chapterNumber: 9,
      practicalLab: 'كتابة الملخص التنفيذي ذي الصفحة الواحدة وصياغة التوصيات المكتملة للعناصر الستة',
      deliverable: 'تقرير تحليل مخاطر تنفيذي جاهز للاعتماد المزدوج'
    },
    {
      week: 10,
      topic: 'دراسات حالة تطبيقية شاملة في تحليل المخاطر (حالة PBCD والمؤسسات المالية والصحية)',
      chapterNumber: 10,
      practicalLab: 'تحليل السيناريوهات الثمانية لأصل بيانات فوترة المرضى (PBCD) وسد فجوات أشرطة النسخ وتدقيق المعاملات',
      deliverable: 'دراسة حالة تطبيقية مكتملة الأوراق لقطاع صحي/مالي'
    },
    {
      week: 11,
      topic: 'المشروع التراكمي التطبيقي (تقييم ومعالجة مخاطر منصة «مواعيدي» الوطنية)',
      chapterNumber: 11,
      practicalLab: 'إنجاز المراحل الخمس والمخرجات السبعة لمنصة «مواعيدي» ومراجعة الأقران وتقديم عرض القرار',
      deliverable: 'حزمة مشروع «مواعيدي» النهائية الموحدة (السجل + التقرير + العرض + مراجعة الأقران)'
    }
  ],
  assessmentMethods: [
    {
      name: 'المشروع التراكمي التطبيقي (منصة «مواعيدي» الوطنية)',
      weight: 35,
      description: 'تقييم حزمة المخرجات السبعة وفق معايير الروبوك الخمسة (الترابط 20%، الواقعية 20%، الاكتمال 20%، التبرير 20%، التوثيق 20%)'
    },
    {
      name: 'الاختبار النهائي الشامل (نظري وحسابي وتطبيقي)',
      weight: 35,
      description: 'يغطي منهجية OCTAVE Allegro، أشجار التهديد، حسابات SLE/ALE/ROSI ودرجة الخطر النسبية، ومعايير ISO 27005 وNIST 800-30 وNCA'
    },
    {
      name: 'دراسة الحالة وتقرير المخاطر التنفيذي ومراجعة الأقران',
      weight: 20,
      description: 'تحليل حالة عملية (مثل PBCD) وصياغة ملخص تنفيذي وتوصيات مكتملة العناصر الستة وإجراء مراجعة أقران موثقة'
    },
    {
      name: 'الاختبارات القصيرة والمختبرات التفاعلية ثلاثية الأبعاد',
      weight: 10,
      description: 'التفاعل مع المختبرات الحية والكتاب ثلاثي الأبعاد وإتمام الاختبارات القصيرة وبطاقات الاستذكار عبر الفصول الـ 11'
    }
  ],
  reference:
    'Richard A. Caralli et al., "Introducing OCTAVE Allegro: Improving the Information Security Risk Assessment Process" (CMU/SEI) · NIST SP 800-30 Rev. 1 · ISO/IEC 27005:2022 · The Open Group FAIR Standard · ضوابط الهيئة الوطنية للأمن السيبراني (NCA ECC-2:2024)',
  chapters: ISE232_RISK_CHAPTERS
};

// ═══════════════════════════════════════════════════════════════════════════
// 4. تصدير الثوابت المتوافقة مع بنية المنصة (Exports Compatibility)
// ═══════════════════════════════════════════════════════════════════════════

export const CHAPTERS: Chapter[] = ISE232_RISK_CHAPTERS;

export default {
  COURSE_UPMN075_RISK_INFO,
  ISE232_RISK_CHAPTERS,
  CHAPTERS
};


// ═══════════════════════════════════════════════════════════════════════════
// 5. دوال مساعدة برمجية وحسابية لتحليل المخاطر (Risk Analysis Utility Functions)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * حساب توقع الخسارة الواحدة (SLE = AV × EF)
 */
export function calculateSLE(assetValue: number, exposureFactor: number): number {
  const clampedEF = Math.max(0, Math.min(1, exposureFactor));
  return Math.round(assetValue * clampedEF * 100) / 100;
}

/**
 * حساب توقع الخسارة السنوية (ALE = SLE × ARO)
 */
export function calculateALE(sle: number, annualizedRateOfOccurrence: number): number {
  const validARO = Math.max(0, annualizedRateOfOccurrence);
  return Math.round(sle * validARO * 100) / 100;
}

/**
 * حساب عائد الاستثمار الأمني (ROSI = ((ALE_prior - ALE_post - controlCost) / controlCost) × 100)
 */
export function calculateROSI(alePrior: number, alePost: number, annualControlCost: number): {
  annualSavings: number;
  netBenefit: number;
  rosiPercentage: number;
  isCostEffective: boolean;
} {
  if (annualControlCost <= 0) {
    throw new Error('تكلفة الضابط السنوية يجب أن تكون أكبر من الصفر');
  }
  const annualSavings = alePrior - alePost;
  const netBenefit = annualSavings - annualControlCost;
  const rosiPercentage = Math.round((netBenefit / annualControlCost) * 10000) / 100;
  return {
    annualSavings,
    netBenefit,
    rosiPercentage,
    isCostEffective: netBenefit > 0,
  };
}

/**
 * حساب درجة الخطر النسبية في منهجية OCTAVE Allegro: Σ (Rank_i × ImpactValue_i)
 */
export function calculateRelativeRiskScore(
  areas: Array<{ rank: number; impactValue: 0 | 1 | 2 | 3 }>
): {
  totalScore: number;
  maxPossibleScore: number;
  scoreBand: '30-45' | '16-29' | '0-15';
} {
  const totalScore = areas.reduce((acc, item) => acc + item.rank * item.impactValue, 0);
  const maxPossibleScore = areas.reduce((acc, item) => acc + item.rank * 3, 0);
  const scoreBand: '30-45' | '16-29' | '0-15' =
    totalScore >= 30 ? '30-45' : totalScore >= 16 ? '16-29' : '0-15';
  return { totalScore, maxPossibleScore, scoreBand };
}

/**
 * تحديد حوض المعالجة (Pool 1..4) في مصفوفة المخاطر النسبية لمنهجية OCTAVE Allegro
 */
export function determineOctaveAllegroPool(
  relativeScore: number,
  probability: 'high' | 'medium' | 'low'
): {
  pool: 1 | 2 | 3 | 4;
  recommendedApproach: string;
} {
  if (relativeScore >= 30) {
    if (probability === 'high' || probability === 'medium') {
      return { pool: 1, recommendedApproach: 'تخفيف فوري (Mitigate)' };
    }
    return { pool: 2, recommendedApproach: 'تخفيف أو تأجيل مشروط (Mitigate or Defer)' };
  }
  if (relativeScore >= 16) {
    if (probability === 'high') {
      return { pool: 1, recommendedApproach: 'تخفيف فوري (Mitigate)' };
    }
    if (probability === 'medium') {
      return { pool: 2, recommendedApproach: 'تخفيف أو تأجيل مشروط (Mitigate or Defer)' };
    }
    return { pool: 3, recommendedApproach: 'تأجيل أو قبول مع المراقبة (Defer or Accept)' };
  }
  if (probability === 'high') {
    return { pool: 2, recommendedApproach: 'تخفيف أو تأجيل مشروط (Mitigate or Defer)' };
  }
  if (probability === 'medium') {
    return { pool: 3, recommendedApproach: 'تأجيل أو قبول مع المراقبة (Defer or Accept)' };
  }
  return { pool: 4, recommendedApproach: 'قبول رسمي موثق (Accept)' };
}

/**
 * استرجاع فصل محدد برقم الفصل (1..11) أو المعرف البرمجي (201..211)
 */
export function getRiskChapterByNumberOrId(idOrNumber: number): Chapter | undefined {
  return ISE232_RISK_CHAPTERS.find(
    (ch) => ch.chapter_number === idOrNumber || ch.id === idOrNumber
  );
}