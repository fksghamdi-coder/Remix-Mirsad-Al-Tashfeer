/**
 * ============================================================================
 * منصة «مِرْصَاد التشفير» (Mirsad Al-Tashfeer)
 * المقرر الرابع: التهديدات السيبرانية (Cyber Threats)
 * رمز المقرر: ISE 232 | المعرّف البرمجي: ise232-threats
 * ============================================================================
 * ملف برمجي مستقل وشامل يدمج المحتوى الأكاديمي لكتاب المقرر الرسمي
 * (دبلوم أمن المعلومات - المستوى الثالث: التهديدات السيبرانية ISE232)
 * مع البنية التفاعلية ثنائية الفئات:
 *   1. الفئة الأولى (التنسيق الأكاديمي الموسع):
 *      - الشرح العلمي المفصل بصيغة Markdown (شامل الجداول، قواعد Snort/Suricata،
 *        تكتيكات ومعرّفات MITRE ATT&CK، الأمثلة المحلولة، السياق الوطني السعودي NCA ECC/CSCC/OTCC)
 *      - المواضيع المفتاحية (keyTopics)، المخطط المتجهي (diagramKey: ise232-threats-1..9)
 *      - الفيديو التعليمي (videoUrl)، شرائح العرض التقديمي (slides: 5 شرائح لكل فصل)
 *      - بطاقات الاستذكار (flashcards: 6 بطاقات لكل فصل)، الاختبار القصير (miniQuiz: 4 أسئلة لكل فصل)
 *   2. الفئة الثانية (الكتاب التفاعلي ثلاثي الأبعاد interactiveBook3D):
 *      - المجسم ثلاثي الأبعاد (model3DType) وتأثيرات المظلل (shaderEffect)
 *      - صفحات الكتاب ثلاثي الأبعاد (pages3D)
 *      - خطوات الشرح المتسلسلة (stepByStep: 5 خطوات تفصيلية لكل فصل)
 *      - النقاط الساخنة التفاعلية عند النقر (hotspots: 4 أجزاء تفاعلية بإحداثيات x,y,z وشرح معمق)
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
  visualType?: 'matrix' | 'flow' | 'comparison' | 'architecture' | 'killchain' | 'snort' | 'mitre';
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

export interface RichChapterData {
  id: number;
  chapter_number: number;
  title: string;
  subtitle: string;
  category: 'أساسي' | 'متقدم' | 'شبكات' | 'كمومي' | 'تطبيقي' | string;
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
  codeSnippets?: CodeSnippet[];
  selfAssessment: SelfAssessmentQA[];
}

export interface Coordinates3D {
  x: number;
  y: number;
  z: number;
}

export interface Hotspot3D {
  id: string;
  label: string;
  title: string;
  x: number;
  y: number;
  z: number;
  coordinates: Coordinates3D;
  color: string;
  icon: string;
  summary: string;
  detailedExplanation: string;
  mitreTactic?: string;
  defensiveControl?: string;
}

export interface StepByStep3D {
  stepNumber: number;
  title: string;
  description: string;
  technicalDetail: string;
  visualCue: string;
  codeOrCommand?: string;
}

export interface BookPage3D {
  pageNumber: number;
  type: 'overview' | 'anatomy' | 'defense-lab' | 'case-study';
  title: string;
  subtitle: string;
  contentMarkdown: string;
  highlightedRuleOrFormula?: string;
  interactiveTakeaway: string;
}

export interface InteractiveBook3D {
  model3DType:
    | 'cia_triad_prism'
    | 'malware_dna_helix'
    | 'kill_chain_fortress'
    | 'aaa_vault_gate'
    | 'apt_radar_globe'
    | 'scada_plc_twin'
    | 'ai_iot_cloud_nexus'
    | 'ids_ips_firewall_core'
    | 'mitre_attack_matrix_cube';
  shaderEffect:
    | 'holographic_shield_glow'
    | 'biohazard_red_pulse'
    | 'cyber_laser_scan'
    | 'zero_trust_grid'
    | 'stealth_radar_sweep'
    | 'industrial_amber_wireframe'
    | 'quantum_neural_wave'
    | 'packet_inspection_stream'
    | 'forensic_matrix_lattice';
  cameraPosition: Coordinates3D;
  autoRotateSpeed: number;
  primaryNeonColor: string;
  secondaryNeonColor: string;
  pages3D: BookPage3D[];
  stepByStep: StepByStep3D[];
  hotspots: Hotspot3D[];
}

export interface DiagramConfig {
  key: string;
  title: string;
  svgType: string;
  nodes: string[];
  accentColor: string;
}

export interface ChapterData {
  id: number;
  chapter_number: number;
  title: string;
  subtitle?: string;
  description: string;
  content: string;
  keyTopics: string[];
  diagramKey?: string;
  diagramConfig?: DiagramConfig;
  videoUrl?: string;
  videoDuration?: string;
  presentationUrl?: string;
  slides?: SlideItem[];
  flashcards?: FlashcardData[];
  miniQuiz?: MiniQuiz[];
  interactiveBook3D?: InteractiveBook3D;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
}

export interface Chapter extends ChapterData {
  images?: ChapterImage[];
  diagramKey: string;
  slides: SlideItem[];
  flashcards: FlashcardData[];
  miniQuiz: MiniQuiz[];
  interactiveBook3D: InteractiveBook3D;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  pdfStartPage?: number;
  pdfEndPage?: number;
  richData?: RichChapterData;
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
  id?: string;
  code: string;
  slug: string;
  title: string;
  titleEn: string;
  category?: string;
  description: string;
  level: string;
  chaptersCount: number;
  totalHours: number;
  status: 'available' | 'coming-soon' | 'planned';
  color: string;
  accent?: string;
  badge?: string;
  neonColor?: 'amber' | 'cyan' | 'emerald';
  icon: string;
  reference?: string;
  vision?: string;
  mission?: string;
  learningOutcomes?: string[];
  weeklyPlan?: WeeklyPlanItem[];
  assessmentMethods?: AssessmentMethod[];
  deliveryMode?: string;
  language?: string;
  instructor?: string;
  prerequisite?: string;
  topics?: string[];
  features?: string[];
  chapters?: Chapter[];
}

const COURSE_TIMESTAMP = 1762473600000;

// ═══════════════════════════════════════════════════════════════════════════
// 2. مصفوفة الفصول الدراسية الكاملة (ISE232_THREATS_CHAPTERS - 9 فصول)
// ═══════════════════════════════════════════════════════════════════════════

export const ISE232_THREATS_CHAPTERS: Chapter[] = [
  // =========================================================================
  // الفصل الأول: مدخل إلى التهديدات السيبرانية وثالوث الحماية الأساسي (CIA Triad)
  // =========================================================================
  {
    id: 301,
    chapter_number: 1,
    title: 'مدخل إلى التهديدات السيبرانية وثالوث الحماية الأساسي (CIA Triad: السرية، السلامة، التوافر)',
    subtitle: 'الوصول غير المصرح به، فاعلو التهديد، الفرق بين التهديد والضعف والهجوم، وتقييم البلاغ الأمني الأولي',
    description: 'تأصيل علمي شامل لمفهوم التهديدات السيبرانية، الأصول المعلوماتية، تصنيف المخترقين وفاعلي التهديد، التمييز الدقيق بين التهديد والضعف والهجوم، قياس الأثر عبر ثالوث CIA ومصفوفة NIST SP 800-30، وتصنيف البلاغ الأمني الأولي وقرار التصعيد.',
    category: 'أساسيات',
    difficulty: 'beginner',
    pdfStartPage: 5,
    pdfEndPage: 14,
    diagramKey: 'ise232-threats-1',
    diagramConfig: {
      key: 'ise232-threats-1',
      title: 'ثالوث أمن المعلومات (CIA Triad) ومسار تحقق الخطر من التهديد إلى الأصل',
      svgType: 'CIATriad',
      nodes: ['السرية (Confidentiality)', 'السلامة/التكامل (Integrity)', 'التوافر (Availability)', 'التهديد × الضعف = الخطر'],
      accentColor: '#ef4444',
    },
    videoUrl: 'https://www.youtube.com/watch?v=QzX2gN7YbW0',
    videoDuration: '16:20',
    presentationUrl: '/presentations/ise232-threats-ch1.pdf',
    keyTopics: [
      'أمن المعلومات ومنع الوصول غير المصرح به (Unauthorized Access)',
      'الأصل المعلوماتي (Information Asset) ومسؤولية حراسته',
      'التهديد التقني والبشري والمتعمد والعرضي والداخلي والخارجي',
      'تصنيف القبعات (البيضاء، السوداء، الرمادية، الزرقاء)',
      'فئات فاعلي التهديد (الهواة، الناشطون، الجريمة المنظمة، APTs)',
      'معادلة الخطر: الفرق بين التهديد (Threat) والضعف (Vulnerability) والهجوم (Attack)',
      'الضوابط الأمنية الثلاثة (المادية، الإدارية، التقنية)',
      'الحدث الأمني (Event) مقابل الحادث الأمني (Incident) والمؤشرات السابقة والآنية',
      'ثالوث الحماية الأساسي CIA Triad (السرية، السلامة/التكامل، التوافر)',
      'تصنيف البيانات ومصفوفة تقاطع الاحتمال والأثر وفق NIST SP 800-30 Rev. 1',
      'نموذج تصنيف البلاغ الأولي وقرار التصعيد (Escalation)',
    ],
    content: `## 1.1 تمهيد: أمن المعلومات والوصول غير المصرح به

يُعرّف **أمن المعلومات (Information Security)** في جوهره بأنه الممارسة الهندسية والإدارية المصممة لمنع **الوصول غير المصرح به (Unauthorized Access)** إلى البيانات والأنظمة. ويقصد بالوصول غير المصرح به حصول فاعل على بيانات أو موارد لا يملك صلاحية الوصول إليها، ويتحقق ذلك غالباً باستعمال النظام على غير ما صُمّم له.

- **الأصل المعلوماتي (Information Asset)**: هو البيانات والموارد التقنية ذات القيمة للمنشأة. وقد تزايدت قيمة البيانات حتى أصبحت أصول تقنية المعلومات أثمن ما تملكه المؤسسات الحديثة، فانتقلت إدارات التقنية والأمن السيبراني من دور مزود الخدمة الأساسي لتصبح شريكاً استراتيجياً في صناعة القرار على أعلى مستويات الإدارة.
- **مثال في السياق الوطني السعودي**: بيانات التسجيل الأكاديمي والملفات المالية في بوابة طالب جامعية أو منصة حكومية؛ إذ يمثل اطلاع موظف غير مخول على بيانات مالية لشركة سعودية أو درجات أكاديمية وصولاً غير مصرح به يستوجب تطبيق ضوابط الهيئة الوطنية للأمن السيبراني (**NCA ECC-2:2024**).

---

## 1.2 تعريف التهديد السيبراني وتصنيفاته

**التهديد السيبراني (Cyber Threat)** هو خطر محتمل على الأصل المعلوماتي، يتمثل في فقده أو إتلافه أو وصول الآخرين إليه دون صلاحية. ومن أبرز آثاره **تعطل النظام (System Failure)**، أي عجزه عن أداء الغرض الذي صُمم له، سواء أكان التعطل نتيجة مقصودة للهجوم (كهجمات حجب الخدمة) أم غير مقصودة.

### تقسيمات التهديدات السيبرانية

| معيار التصنيف | النوع الأول | النوع الثاني | مثال تطبيقي |
| :--- | :--- | :--- | :--- |
| **أداة التنفيذ** | **التهديد التقني (Technical Threat)**: تنفذه وسيلة برمجية كالبرمجيات الخبيثة. | **التهديد البشري (Human Threat)**: ينشأ من سلوك الأشخاص وأبرزه الهندسة الاجتماعية. | إرسال بريد جماعي خادع يدفع المستخدم لتشغيل برمجية خبيثة بيده. |
| **القصد والنية** | **التهديد المتعمد (Intentional Threat)**: يُقصد به الضرر كالعبث المقصود بالبيانات. | **التهديد العرضي (Unintentional Threat)**: يقع الضرر دون قصد كتلف البيانات العارض. | تعطل النظام كأثر مقصود في DoS (متعمد) مقابل تعطله كأثر جانبي لخطأ تشغيلي (عرضي). |
| **موقع المصدر** | **التهديد الداخلي (Internal Threat)**: أشخاص لهم صلة بالنظام كمستخدميه وموظفيه. | **التهديد الخارجي (External Threat)**: غرباء من خارج النظام والمنشأة. | مستخدمو موقع التجارة الإلكترونية (داخلي) مقابل مهاجمين من خارج الموقع (خارجي). |

---

## 1.3 تصنيف المخترقين (Hacker Hats) وفئات فاعلي التهديد

كان مصطلح **المخترق (Hacker)** يطلق في الأصل على كل من يعمل بحماس على حل مشكلة حاسوبية، بينما سُمّي المتسلل **Cracker**، ثم صار «المخترق» الاسم الشائع. ويقوم تصنيف القبعات على محورين: **الوضع القانوني** و**النية**:

| القبعة | الوضع القانوني | النية والدافع | ملاحظات جوهرية |
| :--- | :--- | :--- | :--- |
| **القبعة البيضاء (White Hat)** | قانوني (بتوظيف أو عقد رسمي من الشركة) | تحسين أمن أنظمة الشركة وكشف الثغرات | يعمل ضمن نطاق مكتوب وقواعد اشتباك معتمدة. |
| **القبعة السوداء (Black Hat)** | غير قانوني وعرضة للملاحقة الجنائية | الربح الشخصي أو الأذى أو كلاهما | يستغل الثغرات للسرقة أو الابتزاز أو التدمير. |
| **القبعة الرمادية (Gray Hat)** | **غير قانوني وعرضة للملاحقة** | تحسين أمن النظام ولفت الانتباه للثغرات | **خطأ شائع**: عدّه قانونياً لحسن نيته؛ فحسن النية لا يشرعن الوصول غير المصرح به. |
| **القبعة الزرقاء (Blue Hat - خارجي)** | قانوني بتكليف من الشركة | اختبار أمن مكوّن قبل إطلاقه (مثل Microsoft) | يُدعى لاختبار الأنظمة قبل الإصدار الرسمي. |
| **القبعة الزرقاء (بمعنى آخر)** | غير قانوني | الانتقام الشخصي أو المؤسسي | مهاجم يسعى للثأر وإلحاق الضرر. |

### فئات فاعلي التهديد (Threat Actors)

| الفئة | الدافع الأساسي | مستوى الموارد والتطور | تكتيكات MITRE ATT&CK الشائعة |
| :--- | :--- | :--- | :--- |
| **الهواة (Script Kiddies)** | غير محدد / التباهي | يعتمدون على أدوات آلية جاهزة قد لا يفهمونها بالكامل | \`T1595\` (Active Scanning), \`T1498\` (Network DoS) |
| **الناشطون (Hacktivists)** | غايات اجتماعية أو سياسية (مثل Anonymous) | قد يكونون متطورين جداً في الاختراق والتشويه | \`T1491\` (Defacement), \`T1499\` (Endpoint DoS) |
| **الجريمة المنظمة (Organized Crime)** | كسب المال والابتزاز المالي | يملكون موارد وصلات وسوقاً سوداء تفوق الفاعل المنفرد | \`T1486\` (Data Encrypted for Impact), \`T1566\` (Phishing) |
| **المرتبطون بالدول (APT)** | استهداف دول وبنى تحتية بإذن من دولتهم | يملكون أكبر الموارد الاستخباراتية والعسكرية ودوام التهديد | \`T1195\` (Supply Chain Compromise), \`T1078\` (Valid Accounts) |

> [!warning]
> **خطأ شائع**: التهوين من خطر الهواة (Script Kiddies) لقلة تمرسهم. والصحيح أن أساليب أتمتة الدفاع تصلح لأتمتة الهجوم، فينفذون بأدوات آلية جاهزة هجمات معقدة بفهم بدائي.

---

## 1.4 الفرق بين التهديد (Threat)، والضعف (Vulnerability)، والهجوم (Attack)

- **التهديد (Threat)**: الخطر المحتمل الذي يأتي إلى النظام من فاعل أو حدث خارجي (مثل عصابة منظمة تبحث عن بيانات ثمينة لبيعها).
- **الضعف أو الثغرة الأمنية (Vulnerability)**: حالة قائمة داخل النظام تسمح باستعماله على غير ما صُمّم له، ومنها ثغرات نظام التشغيل (Operating System Loopholes) أو ضعف الإجراءات البشرية.
- **الهجوم السيبراني (Attack)**: الفعل التنفيذي الذي يقوم به فاعل التهديد لاستغلال الضعف بالبرمجيات الخبيثة أو الهندسة الاجتماعية بهدف الوصول إلى النظام أو الإضرار به.

$$\text{Risk (الخطر)} = \text{Threat (التهديد)} \times \text{Vulnerability (الضعف)} \times \text{Impact (الأثر على الأصل)}$$

### أنواع الضوابط الأمنية الثلاثة (Security Controls)

1. **الضوابط المادية (Physical Controls)**: أقفال الأبواب، الكاميرات، البطاقات الذكية، وتوزيع الغرف في المبنى. (**قاعدة ذهبية**: الوصول المادي يجعل كل شيء ممكناً مهما قويت الضوابط التقنية).
2. **الضوابط الإدارية (Administrative Controls)**: سياسات الموارد البشرية، تصنيف البيانات، تقييد الوصول، وفصل المهام (Separation of Duties).
3. **الضوابط التقنية (Technical Controls)**: جدران الحماية (Firewalls)، أنظمة كشف ومنع التسلل (IDS/IPS)، التشفير، ومكافحات البرمجيات الخبيثة.

---

## 1.5 الحدث الأمني (Event) والحادث الأمني (Incident) والمؤشرات

- **الحدث الأمني (Security Event)**: أي واقعة يمكن ملاحظتها أو تسجيلها في شبكة أو نظام (مثل تسجيل دخول مستخدم ناجح).
- **الحادث الأمني (Security Incident)**: انتهاك أو تهديد وشيك بانتهاك سياسات أمن الحاسب أو الاستخدام المقبول (مثل محاولة تجاوز الصلاحيات أو رفع ملف سري إلى سحابة شخصية).
- **المؤشر السابق (Precursor)**: علامة على أن المهاجم قد يستعد لإحداث حادث (مثل فحص الشبكة \`nmap\` بحثاً عن ثغرات).
- **المؤشر الآني (Indicator)**: علامة على أن الحادث قد وقع أو يجري الآن (مثل تنبيه IDS بوجود استغلال نشط).

### قاعدة Snort لرصد مؤشر سابق (مسح استطلاعي) ومؤشر آني (محاولات دخول فاشلة متكررة)

\`\`\`snort
# 1. رصد مؤشر سابق (Precursor): مسح Nmap SYN استطلاعي للبوابة الأكاديمية
alert tcp $EXTERNAL_NET any -> $HOME_NET 443 (msg:"[PRECURSOR] Nmap SYN Recon Scan Detected on Student Portal"; flags:S; threshold:type both, track by_src, count 30, seconds 10; classtype:attempted-recon; sid:1000101; rev:1;)

# 2. رصد مؤشر آني (Indicator): هجوم Brute-Force ليلي متكرر على صفحة الدخول
alert tcp $EXTERNAL_NET any -> $HOME_NET 443 (msg:"[INDICATOR] Multiple Failed Login Attempts - Brute Force Attack"; flow:to_server,established; content:"POST"; http_method; content:"/api/auth/login"; http_uri; threshold:type both, track by_src, count 10, seconds 60; classtype:attempted-user; sid:1000102; rev:2;)
\`\`\`

---

## 1.6 ثالوث الحماية الأساسي (CIA Triad) ومصفوفة الخطر NIST SP 800-30

1. **السرية (Confidentiality)**: إبقاء المعلومات السرية طي الكتمان وألا يطلع عليها إلا من يحق له (يخل بها: تسريب أرقام البطاقات الائتمانية).
2. **السلامة / التكامل (Integrity)**: ضمان أن البيانات لم تتلف ولم يُعبث بها عمداً ليوثق بالنظام (يخل بها: تغيير عناوين التوصيل في متجر إلكتروني أو تزوير درجات الطلاب).
3. **التوافر (Availability)**: بقاء النظام عاملاً ليصل المصرح لهم إلى البيانات وقت الحاجة (يخل به: هجوم حجب الخدمة DoS، أو الخطأ الشائع بإيقاف النظام كلياً بحجة حمايته!).

### مصفوفة تقاطع الاحتمال والأثر ومستويات درجة الخطر (NIST SP 800-30 Rev. 1)

| مستوى الخطر | النطاق الرقمي (شبه الكمي) | القيمة المرجعية | التوصيف والتقاطع في المصفوفة |
| :--- | :---: | :---: | :--- |
| **مرتفع جداً (Very High)** | 96 إلى 100 | **10** | احتمال مرتفع جداً مع أثر مرتفع أو مرتفع جداً. |
| **مرتفع (High)** | 80 إلى 95 | **8** | احتمال مرتفع مع أثر مرتفع، أو احتمال متوسط مع أثر مرتفع جداً. |
| **متوسط (Moderate)** | 21 إلى 79 | **5** | احتمال متوسط مع أثر متوسط أو مرتفع (مثل محاولات دخول فاشلة مستمرة على بوابة جامعية). |
| **منخفض (Low)** | 5 إلى 20 | **2** | احتمال منخفض مع أثر منخفض أو متوسط. |
| **منخفض جداً (Very Low)** | 0 إلى 4 | **0** | احتمال منخفض جداً مع أثر منخفض أو منخفض جداً. |

---

## 1.7 نموذج تصنيف البلاغ الأولي وقرار التصعيد (Escalation)

يضم نموذج تصنيف البلاغ الأولي 6 بنود أساسية: **بيانات الاتصال**، **تفاصيل الحادث**، **التصنيف**، **فئات التصنيف الست** (محاولات وصول غير مصرح به، وصول غير مصرح به ناجح، حجب الخدمة، الشيفرة الخبيثة، الاستخدام غير السليم، تضرر أصول متعددة)، **عوامل الأولوية** (الأثر الوظيفي، الأثر على المعلومات، إمكانية الاسترداد)، و**ما يحيط بالحادث**.
ويُفعّل **قرار التصعيد (Escalation)** عند عدم استجابة فريق الاستجابة خلال المدة المحددة؛ فتُكرر محاولة الاتصال أولاً، فإن لم يرد أحد صُعّد الإخطار إلى مدير الفريق ثم إلى مستوى إداري أعلى حتى يستجيب أحد.`,
    images: [
      {
        prompt: 'CIA triad confidentiality integrity availability, hacker hats taxonomy, 16:9',
        caption: 'ثالوث أمن المعلومات (CIA Triad) وتصنيف قبعات المخترقين وفاعلي التهديد',
        alt: 'CIA triad confidentiality integrity availability',
        seed: 3011,
        isAIGenerated: true,
      },
      {
        prompt: 'NIST SP 800-30 risk matrix threat vulnerability attack impact pathway, 16:9',
        caption: 'مسار تحقق الضرر من التهديد إلى الثغرة والهجوم ومصفوفة تقييم الخطر',
        alt: 'NIST SP 800-30 risk matrix pathway',
        seed: 3012,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'أمن المعلومات تأسس لمنع الوصول غير المصرح به وحراسة الأصول الحيوية',
        subtitle: 'العلاقة بين الأصل المعلوماتي والتهديد السيبراني وإدارة المخاطر المؤسسية',
        bullets: [
          'الوصول غير المصرح به (Unauthorized Access): حصول فاعل على بيانات لا يملك صلاحية الوصول إليها باستعمال النظام على غير ما صُمم له.',
          'الأصل المعلوماتي (Asset): البيانات والموارد التقنية ذات القيمة التي انتقلت بإدارات التقنية إلى موقع الشريك الاستراتيجي في القرار.',
          'التهديد السيبراني (Cyber Threat): خطر محتمل على الأصل يتمثل في فقده أو تعطل النظام (System Failure) عن أداء غرضه.',
          'تقسيم التهديدات: تقنية مقابل بشرية (هندسة اجتماعية)، متعمدة مقابل عرضية، وداخلية مقابل خارجية.',
        ],
        keyHighlight: 'أصول تقنية المعلومات هي أثمن ما تملكه المؤسسات الحديثة، وحراستها تقع في صميم خطة إدارة المخاطر.',
        visualType: 'architecture',
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'تصنيف المخترقين يعتمد على القانونية والنية وفئات التهديد تتفاوت في الموارد',
        subtitle: 'مقارنة القبعات (البيضاء، السوداء، الرمادية، الزرقاء) والفاعلين الأربعة',
        bullets: [
          'القبعة البيضاء: وضع قانوني بتوظيف رسمي لتحسين أمن الأنظمة | القبعة السوداء: غير قانوني بدافع الربح أو الأذى.',
          'القبعة الرمادية: يعمل بطريقة غير قانونية وعرضة للملاحقة القضائية حتى لو كانت نيته تحسين الأمن.',
          'الهواة (Script Kiddies): أدوات آلية جاهزة قد تنفذ هجمات معقدة | الناشطون (Hacktivists): دوافع سياسية أو اجتماعية.',
          'الجريمة المنظمة: شبكات مالية لبيع المسروقات | الفاعلون المرتبطون بالدول (APT): أعلى الموارد ودوام التهديد.',
        ],
        keyHighlight: 'حسن النية لا يشرعن الوصول غير المصرح به؛ مخترق القبعة الرمادية يعمل خارج القانون ويبقى عرضة للملاحقة.',
        visualType: 'comparison',
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'الضرر لا يتحقق في الهجمات المستغلة للثغرات إلا باجتماع التهديد والضعف والهجوم',
        subtitle: 'تشريح مسار الضرر وتكامل الضوابط المادية والإدارية والتقنية',
        bullets: [
          'التهديد (Threat): خطر محتمل من فاعل خارجي أو داخلي | الضعف (Vulnerability): حالة قائمة أو ثغرة في النظام أو الإجراءات.',
          'الهجوم (Attack): الفعل التنفيذي الذي يستغل الضعف فيوقع الأثر على الأصل المعلوماتي.',
          'الضوابط المادية (أقفال، كاميرات) + الضوابط الإدارية (تصنيف بيانات، فصل مهام) + الضوابط التقنية (جدران حماية، IDS).',
          'قاعدة حاكمة: قوة الضوابط التقنية لا تتجاوز قوة الضوابط المادية والإدارية التي تسندها.',
        ],
        keyHighlight: 'الوصول المادي إلى غرفة الخوادم يجعل كل شيء ممكناً مهما بلغت قوة جدران الحماية والتشفير.',
        visualType: 'flow',
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'ثالوث CIA يقيس الأثر ومصفوفة NIST SP 800-30 تشتق درجة الخطر بدقة',
        subtitle: 'السرية والتكامل والتوافر وتقاطع الاحتمال والأثر الخماسي',
        bullets: [
          'السرية (Confidentiality): منع انكشاف البيانات لغير المصرح لهم | التكامل (Integrity): ضمان عدم العبث بالبيانات أو تلفها.',
          'التوافر (Availability): بقاء النظام عاملاً ومتاحاً للمصرح لهم وقت الحاجة (إيقاف النظام كلياً يخل بالتوافر).',
          'تصنيف البيانات (Data Classification): تقدير أثر فقد CIA بثلاثة مستويات (منخفض، متوسط، مرتفع).',
          'مصفوفة NIST SP 800-30: تقاطع الاحتمال والأثر يعطي 5 مستويات خطر بقيم مرجعية (0، 2، 5، 8، 10).',
        ],
        keyHighlight: 'درجة الخطر لا تُحسب بجمع الاحتمال والأثر حسابياً، بل تُقرأ من خلية تقاطعهما في مصفوفة المخاطر.',
        visualType: 'matrix',
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'فرز البلاغ الأمني الأولي يفصل المشاهد عن المفترض ويحسم قرار التصعيد',
        subtitle: 'التمييز بين المؤشر السابق والآني وتطبيق الفئات الست لتصنيف الحوادث',
        bullets: [
          'الحدث الأمني (Event) واقعة ملحوظة، بينما الحادث الأمني (Incident) انتهاك فعلي أو وشيك للسياسات يُستنتج بالتحليل.',
          'المؤشر السابق (Precursor) علامة استعداد للهجوم (مثل المسح)، والمؤشر الآني (Indicator) علامة هجوم جارٍ الآن.',
          'فئات التصنيف الست: محاولات وصول غير مصرح به، وصول ناجح، حجب خدمة، شيفرة خبيثة، استخدام غير سليم، تضرر أصول متعددة.',
          'قرار التصعيد (Escalation): يُفعّل عند عدم رد فريق الاستجابة خلال المدة المحددة صعوداً للمدير ثم الإدارة العليا.',
        ],
        keyHighlight: 'الفرز المنظم للبلاغ الأولي يمنع تفويت حادث حقيقي ويحمي فريق الأمن من الغرق في بلاغات لا ترقى إلى حوادث.',
        visualType: 'snort',
      },
    ],
    flashcards: [
      {
        front: 'ما الفرق الجوهري بين التهديد (Threat) والضعف (Vulnerability) والهجوم (Attack)؟',
        back: 'التهديد خطر محتمل مصدره فاعل أو حدث، والضعف حالة قائمة داخل النظام (ثغرة)، والهجوم فعل ينفذه الفاعل لاستغلال الضعف وإيقاع الضرر.',
        category: 'أساسيات',
      },
      {
        front: 'هل يُعد مخترق القبعة الرمادية (Gray Hat) قانونياً نظراً لحسن نيته في تحسين الأمن؟',
        back: 'لا، يعمل بطريقة غير قانونية ودون تصريح مسبق ويبقى عرضة للملاحقة القضائية؛ فحسن النية لا يشرعن الوصول غير المصرح به.',
        category: 'تصنيف المخترقين',
      },
      {
        front: 'ما الفرق بين المؤشر السابق (Precursor) والمؤشر الآني (Indicator) في البلاغ الأولي؟',
        back: 'المؤشر السابق علامة على أن المهاجم يستعد للهجوم مستقبلاً (مثل فحص الشبكة بحثاً عن ثغرات)، بينما المؤشر الآني علامة على أن الحادث وقع أو يجري الآن (مثل تنبيه IDS).',
        category: 'تحليل البلاغات',
      },
      {
        front: 'لماذا لا يكفي إيقاف النظام كلياً ومنع الوصول إليه لحماية البيانات؟',
        back: 'لأن الإيقاف الكلي يضمن السرية والتكامل بأبسط صورة لكنه يجعل النظام عديم الفائدة ويخل بمبدأ التوافر (Availability) الذي يوجب إتاحة النظام للمصرح لهم وقت الحاجة.',
        category: 'ثالوث CIA',
      },
      {
        front: 'كيف تُحدد درجة الخطر ومستوياتها الخمسة وفق معيار NIST SP 800-30 Rev. 1؟',
        back: 'تُقرأ من مصفوفة تقاطع الاحتمال والأثر: منخفض جداً (0-4، مرجعي 0)، منخفض (5-20، مرجعي 2)، متوسط (21-79، مرجعي 5)، مرتفع (80-95، مرجعي 8)، مرتفع جداً (96-100، مرجعي 10).',
        category: 'تقييم المخاطر',
      },
      {
        front: 'ما الفئات الست المعتمدة في نموذج تصنيف البلاغ الأمني الأولي؟',
        back: '1) محاولات وصول غير مصرح به، 2) وصول غير مصرح به ناجح، 3) حجب الخدمة، 4) الشيفرة الخبيثة، 5) الاستخدام غير السليم، 6) تضرر أصول متعددة.',
        category: 'الاستجابة الأولية',
      },
    ],
    miniQuiz: [
      {
        question: 'رفَع موظف في شركة سعودية ملف بيانات عملاء على حساب تخزين سحابي شخصي دون قصد سيئ. كيف يُصنّف هذا البلاغ ضمن فئات نموذج تصنيف البلاغ الأولي؟',
        options: [
          'استخدام غير سليم (Improper Usage)',
          'شيفرة خبيثة (Malicious Code)',
          'حجب الخدمة (Denial of Service)',
          'تضرر أصول متعددة (Multiple Component Incident)',
        ],
        correctIndex: 0,
        explanation: 'رفع ملف بيانات العمل إلى تخزين سحابي شخصي يخالف سياسات الاستخدام المقبول ويُصنف ضمن فئة «استخدام غير سليم»، بينما وجود برمجية مشبوهة يُصنف ضمن «شيفرة خبيثة».',
      },
      {
        question: 'سجّلت بوابة طالب جامعية محاولات دخول فاشلة متكررة ليلاً (احتمال متوسط) على قاعدة بيانات التسجيل الأكاديمي لآلاف الطلاب (أثر مرتفع). ما درجة الخطر وقيمتها المرجعية وفق جداول NIST SP 800-30 Rev. 1 في المقرر؟',
        options: [
          'درجة الخطر: متوسط (النطاق 21 إلى 79، والقيمة المرجعية 5)',
          'درجة الخطر: مرتفع جداً (النطاق 96 إلى 100، والقيمة المرجعية 10)',
          'درجة الخطر: منخفض (النطاق 5 إلى 20، والقيمة المرجعية 2)',
          'درجة الخطر: منخفض جداً (النطاق 0 إلى 4، والقيمة المرجعية 0)',
        ],
        correctIndex: 0,
        explanation: 'في مصفوفة تقاطع الاحتمال والأثر (جدول 1.3 وجدول 1.4)، تقاطع احتمال «متوسط» مع أثر «مرتفع» يعطي مستوى خطر «متوسط» بنطاق رقمي (21 إلى 79) وقيمة مرجعية (5).',
      },
      {
        question: 'أي من العبارات التالية تصف بدقة العلاقة بين الضوابط التقنية والضوابط المادية والإدارية؟',
        options: [
          'قوة الضوابط التقنية لا تتجاوز قوة الضوابط المادية والإدارية التي تسندها، لأن الوصول المادي أو غياب الصلاحيات يبطل أثر التقنية',
          'الضوابط التقنية كجدران الحماية تغني تماماً عن الضوابط المادية والإدارية في البيئات السحابية والمحلية',
          'الضوابط الإدارية تُطبق فقط بعد وقوع الحادث الأمني ولا علاقة لها بالوقاية',
          'الضوابط المادية تخص حراس الأمن فقط ولا تدخل ضمن خطة أمن المعلومات',
        ],
        correctIndex: 0,
        explanation: 'أكد كتاب المقرر أن قوة الضوابط التقنية لا تتجاوز قوة الضوابط المادية والإدارية التي تسندها؛ فالوصول المادي يجعل كل شيء ممكناً، والضوابط الإدارية هي التي تنظم الصلاحيات التي تطبقها التقنية.',
      },
      {
        question: 'قام مهاجم باعتراض وتغيير عناوين توصيل الطلبات في متجر إلكتروني بحيث تُرسل الطرود إلى عناوين خاطئة وتُسرق. أي ضلع من أضلاع ثالوث CIA تم الإخلال به مباشرة بهذا التعديل؟',
        options: [
          'التكامل / السلامة (Integrity)',
          'السرية فقط (Confidentiality)',
          'التوافر فقط (Availability)',
          'المصادقة الصفرية (Zero Knowledge)',
        ],
        correctIndex: 0,
        explanation: 'تغيير عناوين التوصيل والعبث العمدي بصحة البيانات المخزنة أو المنقولة يمثل إخلالاً مباشراً بمبدأ التكامل/السلامة (Integrity) مما يفقد البيانات موثوقيتها.',
      },
    ],
    interactiveBook3D: {
      model3DType: 'cia_triad_prism',
      shaderEffect: 'holographic_shield_glow',
      cameraPosition: { x: 0, y: 2.2, z: 5.5 },
      autoRotateSpeed: 1.2,
      primaryNeonColor: '#ef4444',
      secondaryNeonColor: '#f59e0b',
      pages3D: [
        {
          pageNumber: 1,
          type: 'overview',
          title: 'هندسة ثالوث الحماية CIA Triad ومعادلة الخطر',
          subtitle: 'تمثيل ثلاثي الأبعاد لتوازن السرية والتكامل والتوافر أمام التهديدات',
          contentMarkdown: `### المنشور الهولوغرافي لثالوث CIA
يمثل المجسم ثلاثي الأبعاد منشوراً متساوي الأضلاع يرتكز على **السرية (C)** و**التكامل (I)** و**التوافر (A)**، وفي قلبه **الأصل المعلوماتي (Asset)** محاطاً بثلاث حلقات دفاعية (مادية، إدارية، تقنية).
- حين يحاول فاعل التهديد كسر حلقة الضوابط عبر ثغرة (Vulnerability)، يضيء مسار الهجوم باللون الأحمر الكهرماني.`,
          highlightedRuleOrFormula: 'Risk = Threat × Vulnerability × Impact (NIST SP 800-30)',
          interactiveTakeaway: 'تفاعل مع رؤوس المنشور الثلاثة لملاحظة كيف يؤدي إغلاق النظام كلياً إلى حماية C و I لكنه يحطم الضلع A (التوافر).',
        },
        {
          pageNumber: 2,
          type: 'anatomy',
          title: 'تشريح فاعلي التهديد والقبعات الأربع',
          subtitle: 'تحليل الدوافع والموارد والوضع القانوني للمخترقين',
          contentMarkdown: `### مصفوفة النية والقانونية
- **White Hat**: فحص قانوني مصرح به.
- **Gray Hat**: نية حسنة ولكن **فعل غير قانوني** يعرض صاحبه للمساءلة.
- **Black Hat / Organized Crime / APT**: استهداف متعمد للأصول المالية والسيادية.`,
          highlightedRuleOrFormula: 'Authorization + Scope = Legal Security Assessment',
          interactiveTakeaway: 'انقر على النقاط الساخنة للمقارنة بين الهواة (Script Kiddies) ومجموعات APT المدعومة دولياً.',
        },
        {
          pageNumber: 3,
          type: 'defense-lab',
          title: 'مختبر المؤشرات السابقة والآنية (Precursors vs Indicators)',
          subtitle: 'تحليل سجلات البوابة الجامعية وقواعد Snort',
          contentMarkdown: `### التمييز اللحظي في مركز العمليات (SOC)
- **المؤشر السابق (Precursor)**: مسح منافذ البوابة الأكاديمية ليلاً (\`nmap -sS\`).
- **المؤشر الآني (Indicator)**: مئات محاولات الدخول الفاشلة المتكررة على حسابات الطلاب.`,
          highlightedRuleOrFormula: 'alert tcp $EXTERNAL_NET any -> $HOME_NET 443 (sid:1000102;)',
          interactiveTakeaway: 'افحص السجلات لفصل افتراض المبلّغ عن المشاهدة الفعلية في السجل.',
        },
        {
          pageNumber: 4,
          type: 'case-study',
          title: 'دراسة حالة محلولة: فرز بلاغ البوابة الأكاديمية السعودية',
          subtitle: 'تطبيق مصفوفة NIST SP 800-30 وقرار التصعيد الفوري',
          contentMarkdown: `### ملخص قرار الفرز والتصعيد
1. **الأصل**: بيانات التسجيل الأكاديمي (السرية: مرتفع، التكامل: مرتفع).
2. **التصنيف**: محاولات وصول غير مصرح به.
3. **درجة الخطر**: متوسط (الاحتمال متوسط × الأثر مرتفع = النطاق 21-79، القيمة المرجعية **5**).`,
          highlightedRuleOrFormula: 'Priority = f(Functional Impact, Information Impact, Recoverability)',
          interactiveTakeaway: 'عند عدم رد فريق الاستجابة خلال المهلة المحددة، يُصعّد الإخطار فوراً لمدير الفريق ثم للإدارة العليا.',
        },
      ],
      stepByStep: [
        {
          stepNumber: 1,
          title: 'رصد المؤشر السابق (Precursor Detection)',
          description: 'التقاط نشاط فحص استطلاعي للشبكة يستهدف بوابة التسجيل الأكاديمي قبل بدء الهجوم الفعلي.',
          technicalDetail: 'يرسل المهاجم حزم TCP SYN متتالية لاكتشاف المنافذ المفتوحة وإصدارات خادم الويب.',
          visualCue: 'وميض كهرماني على الحلقة الخارجية للمنشور ثلاثي الأبعاد يمثل اقتراب فاعل التهديد.',
          codeOrCommand: 'nmap -sS -p 80,443,8080 portal.university.edu.sa',
        },
        {
          stepNumber: 2,
          title: 'انطلاق المؤشر الآني (Active Indicator Trigger)',
          description: 'رصد محاولات تسجيل دخول فاشلة متكررة ليلاً من عنوان IP غير مألوف على عدة حسابات طلابية.',
          technicalDetail: 'انطلاق تنبيه قاعدة Snort رقم 1000102 بعد تجاوز عتبة 10 محاولات فاشلة في الدقيقة.',
          visualCue: 'نبض أحمر متسارع على بوابة المصادقة في المجسم ثلاثي الأبعاد.',
          codeOrCommand: '[ALERT] [1:1000102:2] Multiple Failed Login Attempts | SRC: 185.220.101.44 -> DST: 10.10.20.15:443',
        },
        {
          stepNumber: 3,
          title: 'الفصل بين المشاهدة والافتراض والتحقق من السجلات',
          description: 'التحقق مما إذا كانت المحاولات قد نجحت فعلاً أم بقيت محاولات فاشلة دون استغلال ثغرة.',
          technicalDetail: 'مراجعة سجلات المصادقة للتحقق من رموز الاستجابة HTTP 401 مقابل HTTP 200.',
          visualCue: 'شعاع فحص أزرق يمسح عقدة السجلات داخل المنشور.',
          codeOrCommand: 'grep "POST /api/auth/login" /var/log/nginx/access.log | awk \'{print $9}\' | sort | uniq -c',
        },
        {
          stepNumber: 4,
          title: 'تقدير الأثر وحساب درجة الخطر وفق NIST SP 800-30',
          description: 'تحديد أثر انكشاف بيانات الطلاب (مرتفع) وتقاطعه مع احتمال الهجوم (متوسط).',
          technicalDetail: 'خلية التقاطع في الجدول 1.3 تعطي مستوى خطر «متوسط» بنطاق رقمي (21-79) وقيمة مرجعية (5).',
          visualCue: 'إضاءة خلية (متوسط × مرتفع = 5) في مصفوفة الخطر ثلاثية الأبعاد.',
          codeOrCommand: 'Risk_Level = Matrix[Likelihood="Moderate"][Impact="High"] => "Moderate" (Ref: 5, Range: 21..79)',
        },
        {
          stepNumber: 5,
          title: 'تعبئة نموذج البلاغ الأولي وتفعيل مسار التصعيد',
          description: 'تصنيف الحادث ضمن فئة «محاولات وصول غير مصرح به» وإخطار فريق الاستجابة مع تفعيل مؤقت التصعيد.',
          technicalDetail: 'إذا لم يستجب المناوب خلال 15 دقيقة، يتم التصعيد آلياً إلى مدير SOC ثم رئيس أمن المعلومات (CISO).',
          visualCue: 'تحول الدرع الهولوغرافي إلى اللون الأخضر الزمردي مع توثيق تذكرة الحادث.',
          codeOrCommand: 'Escalation_Policy: Tier1_SOC (15m) -> SOC_Manager (30m) -> CISO_Executive',
        },
      ],
      hotspots: [
        {
          id: 'hs-ch1-confidentiality',
          label: 'ضلع السرية (Confidentiality)',
          title: 'حماية السرية ومنع انكشاف البيانات الحساسة',
          x: 0.0,
          y: 1.8,
          z: 0.0,
          coordinates: { x: 0.0, y: 1.8, z: 0.0 },
          color: '#3b82f6',
          icon: 'Lock',
          summary: 'ضمان ألا يطلع على البيانات السرية إلا الأشخاص المصرح لهم قانونياً وتقنياً.',
          detailedExplanation: 'يمثل الرأس العلوي للمنشور مبدأ السرية. أي اختراق لبيانات البطاقات الائتمانية أو السجلات الأكاديمية يضرب هذا الضلع مباشرة، ويُحمى بالتشفير، وتقييد الصلاحيات، وتصنيف البيانات.',
          mitreTactic: 'TA0009 - Collection / TA0010 - Exfiltration',
          defensiveControl: 'التشفير القوي (AES-256 / TLS 1.3) وتصنيف البيانات وتقييد الوصول.',
        },
        {
          id: 'hs-ch1-integrity',
          label: 'ضلع التكامل (Integrity)',
          title: 'سلامة البيانات ومنع التلاعب العمدي أو العرضي',
          x: -1.6,
          y: -1.0,
          z: 0.8,
          coordinates: { x: -1.6, y: -1.0, z: 0.8 },
          color: '#10b981',
          icon: 'ShieldCheck',
          summary: 'ضمان بقاء البيانات صحيحة وسليمة دون تعديل غير مصرح به أثناء التخزين أو النقل.',
          detailedExplanation: 'تفقد البيانات قيمتها إذا تعذر التأكد من سلامتها (مثل تغيير عناوين شحن الطلبات أو تعديل الدرجات الجامعية). يُحمى التكامل بدوال التجزئة التشفيرية (SHA-256) والتواقيع الرقمية وسجلات التدقيق.',
          mitreTactic: 'TA0040 - Impact (Data Manipulation T1565)',
          defensiveControl: 'بصمات التجزئة (Hashes) والتواقيع الرقمية وفصل المهام.',
        },
        {
          id: 'hs-ch1-availability',
          label: 'ضلع التوافر (Availability)',
          title: 'استمرارية عمل النظام وإتاحة الخدمة للمصرح لهم',
          x: 1.6,
          y: -1.0,
          z: 0.8,
          coordinates: { x: 1.6, y: -1.0, z: 0.8 },
          color: '#f59e0b',
          icon: 'Activity',
          summary: 'بقاء النظام عاملاً وقادراً على خدمة المستخدمين الشرعيين وقت الحاجة.',
          detailedExplanation: 'يستهدف هجوم حجب الخدمة (DoS/DDoS) هذا الضلع مباشرة لإسقاط النظام. كما أن المبالغة في الإغلاق (إيقاف النظام كلياً لحمايته) تخل بالتوافر وتجعل النظام عديم الجدوى.',
          mitreTactic: 'TA0040 - Impact (Network/Endpoint DoS T1498/T1499)',
          defensiveControl: 'التكرار الاحتياطي (Redundancy)، موازنة الأحمال، وتحديد معدل الطلبات (Rate Limiting).',
        },
        {
          id: 'hs-ch1-controls-core',
          label: 'نواة الضوابط الثلاثة (Controls Core)',
          title: 'تضافر الضوابط المادية والإدارية والتقنية حول الأصل',
          x: 0.0,
          y: 0.0,
          z: -1.2,
          coordinates: { x: 0.0, y: 0.0, z: -1.2 },
          color: '#ef4444',
          icon: 'Layers',
          summary: 'الحلقات الدفاعية الثلاث التي تقطع مسار الهجوم قبل وصوله إلى الأصل المعلوماتي.',
          detailedExplanation: 'تحيط بالأصل ثلاث طبقات متكاملة: الضوابط المادية (أقفال الأبواب والكاميرات)، والضوابط الإدارية (سياسات الموارد البشرية وتصنيف البيانات)، والضوابط التقنية (جدران الحماية وأنظمة كشف التسلل).',
          mitreTactic: 'Defense-in-Depth Architecture',
          defensiveControl: 'تطبيق ضوابط الهيئة الوطنية للأمن السيبراني NCA ECC-2:2024 الشاملة.',
        },
      ],
    },
    richData: {
      id: 301,
      chapter_number: 1,
      title: 'مدخل إلى التهديدات السيبرانية وثالوث الحماية الأساسي (CIA Triad)',
      subtitle: 'الوصول غير المصرح به، فاعلو التهديد، معادلة الخطر، وفرز البلاغ الأمني الأولي',
      category: 'أساسي',
      pdfStartPage: 5,
      pdfEndPage: 14,
      description: 'يؤسس هذا الفصل المفاهيم الجوهرية للتهديدات السيبرانية، تصنيف القبعات وفاعلي التهديد، الفرق بين التهديد والضعف والهجوم، وقياس الأثر والخطر وفق ثالوث CIA ومعيار NIST SP 800-30.',
      objectives: [
        'تعريف التهديدات السيبرانية ومصادرها والتمييز بين التهديد التقني والبشري والمتعمد والعرضي',
        'مقارنة قبعات المخترقين وفئات فاعلي التهديد الأربع من حيث الدوافع والموارد والوضع القانوني',
        'التمييز الدقيق بين التهديد والضعف والهجوم وتكامل الضوابط المادية والإدارية والتقنية',
        'تطبيق ثالوث CIA ومصفوفة NIST SP 800-30 لتقدير الأثر وحساب درجة الخطر وتصنيف البلاغ الأولي',
      ],
      sections: [
        {
          heading: '1. أمن المعلومات والأصل المعلوماتي والوصول غير المصرح به',
          content: 'أمن المعلومات ممارسة لمنع الوصول غير المصرح به إلى البيانات. والأصل المعلوماتي هو البيانات والموارد التقنية ذات القيمة التي يتولى مختصو الأمن حراستها.',
          saudiExample: 'حماية بيانات التسجيل الأكاديمي في بوابة طالب بجامعة سعودية من اطلاع غير المخولين.',
        },
        {
          heading: '2. تصنيف المخترقين (Hacker Hats) وفئات فاعلي التهديد',
          content: 'يصنف المخترقون بحسب القانونية والنية إلى قبعات بيضاء وسوداء ورمادية وزرقاء، ويتوزع فاعلو التهديد إلى هواة وناشطين وجريمة منظمة وفاعلين مرتبطين بالدول (APT).',
          saudiExample: 'تطبيق ضوابط NCA لمواجهة تهديدات مجموعات APT التي تستهدف القطاعات الحيوية.',
        },
        {
          heading: '3. التهديد والضعف والهجوم وثالوث CIA',
          content: 'التهديد خطر محتمل، والضعف حالة قائمة في النظام، والهجوم فعل يستغل الضعف. ويقاس الأثر بالسرية والتكامل والتوافر، وتشتق درجة الخطر من تقاطع الاحتمال والأثر.',
          formula: 'Risk = Threat × Vulnerability × Impact',
        },
      ],
      tables: [
        {
          title: 'جدول 1.1: تصنيف المخترقين بحسب القبعات',
          headers: ['القبعة', 'الوضع القانوني', 'النية'],
          rows: [
            ['البيضاء (White Hat)', 'قانوني، بتوظيف من الشركة', 'تحسين أمن أنظمة الشركة'],
            ['السوداء (Black Hat)', 'غير قانوني وعرضة للملاحقة', 'الربح الشخصي أو الأذى أو كلاهما'],
            ['الرمادية (Gray Hat)', 'غير قانوني وعرضة للملاحقة', 'تحسين أمن النظام'],
            ['الزرقاء (جهة خارجية)', 'قانوني، بتكليف من الشركة', 'اختبار أمن مكوّن كما في Microsoft'],
          ],
        },
        {
          title: 'جدول 1.4: مستويات درجة الخطر ونطاقاتها (NIST SP 800-30 Rev. 1)',
          headers: ['المستوى', 'النطاق الرقمي', 'القيمة المرجعية'],
          rows: [
            ['مرتفع جداً', 'من 96 إلى 100', '10'],
            ['مرتفع', 'من 80 إلى 95', '8'],
            ['متوسط', 'من 21 إلى 79', '5'],
            ['منخفض', 'من 5 إلى 20', '2'],
            ['منخفض جداً', 'من 0 إلى 4', '0'],
          ],
        },
      ],
      commonMistake: {
        mistake: 'عدّ مخترق القبعة الرمادية قانونياً لحسن نيته، أو إيقاف النظام كلياً لحماية البيانات.',
        fix: 'مخترق القبعة الرمادية يعمل بطريقة غير قانونية وعرضة للملاحقة، وإيقاف النظام كلياً يخل بمبدأ التوافر ويجعل النظام عديم الفائدة.',
      },
      solvedExample: {
        title: 'فرز بلاغ دخول غير معتاد إلى بوابة جامعية سعودية',
        given: 'سجلت بوابة طالب في جامعة سعودية ليلاً محاولات دخول فاشلة متكررة من نظام غير مألوف على عدة حسابات، مع سجل فحص سابق للبوابة بحثاً عن ثغرات.',
        steps: [
          '1. الأصل: بيانات التسجيل الأكاديمي (سرية وتكامل مرتفعان).',
          '2. المؤشرات: الفحص السابق مؤشر سابق (Precursor)، والمحاولات الفاشلة المتكررة مؤشر آني (Indicator).',
          '3. التصنيف: حادث أمني بفئة «محاولات وصول غير مصرح به».',
          '4. درجة الخطر: الاحتمال متوسط × الأثر مرتفع = مستوى خطر «متوسط» (النطاق 21-79، القيمة المرجعية 5).',
        ],
        result: 'حادث بفئة «محاولات وصول غير مصرح به»، بدرجة خطر متوسطة وقيمة مرجعية 5، مع إخطار فوري وتصعيد عند عدم الرد.',
        whyItMatters: 'يمنع هذا الفرز تفويت حادث حقيقي، ويمنع إغراق فريق الأمن ببلاغات غير مصنفة.',
      },
      selfAssessment: [
        {
          question: 'قارن بين التهديد والضعف والهجوم مع ذكر مثال لكل منها.',
          answer: 'التهديد خطر محتمل مصدره فاعل (كعصابة تبحث عن بيانات)، والضعف حالة قائمة في النظام (كثغرة في نظام التشغيل)، والهجوم فعل يستغل الضعف (كهاوٍ يشغل أداة لاستغلال الثغرة).',
        },
        {
          question: 'علّل: لا تتجاوز قوة الضوابط التقنية قوة الضوابط المادية والإدارية.',
          answer: 'لأن الوصول المادي يجعل كل شيء ممكناً مهما قويت الضوابط التقنية، ولأن الضوابط الإدارية هي التي تنظم صلاحيات الوصول التي تطبقها التقنية.',
        },
      ],
    },
    updated_at: COURSE_TIMESTAMP,
  },

  // =========================================================================
  // الفصل الثاني: تصنيف البرمجيات الخبيثة (Malware Taxonomy)
  // =========================================================================
  {
    id: 302,
    chapter_number: 2,
    title: 'تصنيف البرمجيات الخبيثة (Malware: الفيروسات، الديدان، أحصنة طروادة، الفدية Ransomware، الجذور الخفية Rootkits)',
    subtitle: 'التشريح السلوكي للبرمجيات الخبيثة، التشفير المزدوج في الفدية، البرمجيات عديمة الملفات، ومؤشرات الاختراق (IoCs)',
    description: 'دراسة معمقة لتصنيف البرمجيات الخبيثة وآليات انتشارها وتخفيها: الفيروسات (Viruses)، الديدان (Worms)، أحصنة طروادة وأدوات التحكم عن بعد (Trojans/RATs)، برمجيات الفدية والابتزاز المزدوج (Ransomware)، الجذور الخفية (Rootkits)، البرمجيات عديمة الملفات (Fileless Malware)، ومؤشرات الاختراق (IoCs).',
    category: 'برمجيات خبيثة',
    difficulty: 'intermediate',
    pdfStartPage: 15,
    pdfEndPage: 24,
    diagramKey: 'ise232-threats-2',
    diagramConfig: {
      key: 'ise232-threats-2',
      title: 'شجرة تصنيف البرمجيات الخبيثة وآليات الانتشار والتخفي ومؤشرات الاختراق IoC',
      svgType: 'MalwareTaxonomy',
      nodes: ['الفيروس (Virus)', 'الدودة (Worm)', 'التروجان (Trojan/RAT)', 'الفدية (Ransomware)', 'الجذور الخفية (Rootkit)'],
      accentColor: '#f97316',
    },
    videoUrl: 'https://www.youtube.com/watch?v=QzX2gN7YbW0',
    videoDuration: '18:45',
    presentationUrl: '/presentations/ise232-threats-ch2.pdf',
    keyTopics: [
      'مفهوم البرمجيات الخبيثة (Malware) والفرق بين القصد الخبيث والبرمجيات الرديئة',
      'الأصل المتأثر ولماذا يتصدر Windows والمتصفحات قائمة الاستهداف',
      'الفيروسات (Viruses) وفيروسات الماكرو (Concept في Microsoft Word)',
      'الديدان الشبكية (Worms) والانتشار الذاتي عبر RPC وUSB (دودة Stuxnet)',
      'أحصنة طروادة (Trojans) وتروجان الوصول عن بعد (RAT) وتروجان Emotet المصرفي',
      'برمجيات الفدية (Ransomware): التشفير الهجين (متماثل + غير متماثل) والابتزاز المزدوج (Wana Decrypt0r / WannaCry)',
      'الجذور الخفية (Rootkits) في مستوى المستخدم (User-mode) ومستوى النواة (Kernel-mode)',
      'البرمجيات الخبيثة عديمة الملفات (Fileless Malware) عبر PowerShell وسجل ويندوز (Registry)',
      'مؤشرات الاختراق (Indicators of Compromise - IoCs): التجزئة، عناوين IP، النطاقات، وتواقيع البايتات',
    ],
    content: `## 2.1 تمهيد: مفهوم البرمجيات الخبيثة (Malware) والأصل المتأثر

**البرمجيات الخبيثة (Malware)** مصطلح منحوت من كلمتي (*Malicious* و *Software*)، يشمل كل برنامج صُمّم **عن قصد** لإتلاف الأنظمة أو استغلالها أو التجسس على المضيف؛ وهذا **القصد الجنائي** هو ما يميزها عن البرمجيات الرديئة التي تحتوي على أخطاء برمجية غير مقصودة (Bugs).

- **الأصل المتأثر (Affected Asset)**: هو المورد الذي يقع عليه الهجوم أو يمتد إليه أثره. ويُعد نظام **Windows** الهدف الأول للبرمجيات الخبيثة بفارق كبير لانتشاره الواسع على أجهزة سطح المكتب، يليه **المتصفح (Browser)** لأنه يمنح وصولاً عابراً لأنظمة التشغيل، ثم **Android**، بينما يلقى **Linux** و**macOS** اهتماماً أقل جزئياً على مستوى المستخدم النهائي (مع استهداف Linux بكثافة في الخوادم والحاويات).

> [!warning]
> **خطأ شائع**: تسمية كل برمجية خبيثة «فيروساً» أو معاملة الأنواع على أنها متنافية. والصحيح أن الأنواع متداخلة (فقد تُوزّع برمجية الفدية عبر تروجان أو دودة)، والتمييز الدقيق بينها ضروري لمعرفة طريقة الانتشار واختيار أداة الاحتواء المناسبة.

---

## 2.2 التشريح المقارن لفئات البرمجيات الخبيثة

### 1. الفيروسات (Viruses)
يخزن الفيروس شيفرته داخل ملف آخر (ملف تنفيذي أو مستند)، ويحتاج عادة إلى **تدخل المستخدم** لينتقل (مثل نسخ ملف مصاب أو فتحه). تُلحق شيفرته بالملف التنفيذي فتُنفّذ قبل البرنامج الأصلي، ويستهلك موارد محلية كبيرة.
- **مثال تاريخي وتقني**: فيروس **Concept**، وهو أول فيروس ماكرو في \`Microsoft Word\`، اختبأ في المستندات ونسخ نفسه بلغة الماكرو الآلية، وتلته فيروسات لـ \`Excel\`.

### 2. الديدان (Worms)
برنامج **ذاتي الانتشار بلا تدخل المستخدم**، تُخزّن شيفرته في كائن مستقل كملف تنفيذي مخفي. لا تضر المضيف غالباً ضرراً محلياً فورياً لأن همّها الانتشار السريع المتضاعف عبر الشبكة.
- **مثال**: دودة **Stuxnet** سنة 2010 التي انتشرت عبر أقراص \`USB\` واستدعاءات الإجراءات البعيدة (\`RPC\`) واستعملت **4 ثغرات يوم صفر (Zero-Day)** لاستهداف أجهزة التحكم الصناعي (\`PLC\`).

### 3. أحصنة طروادة (Trojans) وتروجان الوصول عن بعد (RAT)
يتنكر التروجان في هيئة برنامج شرعي، ويستغل خداع المستخدم أكثر من الثغرات التقنية فيدفعه إلى تثبيته ومنحه الصلاحيات. ومن أخطر صوره **تروجان الوصول عن بعد (Remote Access Trojan - RAT)** الذي يمنح المهاجم تحكماً كاملاً: تصفح الملفات، تسجيل ضربات المفاتيح (Keylogging)، ومراقبة الشاشة والميكروفون والكاميرا.
- **مثال**: تروجان **Emotet** المصرفي (ظهر سنة 2014)، انتشر عبر رسائل بريد تحوي روابط خبيثة أو مستندات بماكرو، وتحول إلى منصة توصيل (Loader) لبرمجيات الفدية.

### 4. برمجيات الفدية (Ransomware) وآلية التشفير المزدوج
تشفّر ملفات الضحية وتطلب فدية (غالباً بالعملات المشفرة) لفكها. وتعمل السلالات الحديثة (مثل **Wana Decrypt0r / WannaCry** و**LockBit**) على **مرحلتين تشفيريتين (Hybrid Encryption)**:
1. **المرحلة الأولى (التشفير المتماثل السريع)**: توليد مفتاح متماثل عشوائي (\`AES-256\` أو \`ChaCha20\`) لتشفير ملفات القرص الصلب بسرعة فائقة.
2. **المرحلة الثانية (التشفير غير المتماثل لقفل المفتاح)**: تشفير المفتاح المتماثل نفسه باستخدام **مفتاح عام مدمج (\`RSA-2048\` أو \`ECC\`)** لا يملك مفتاحه الخاص إلا المهاجم في خادمه البعيد.
- كما تمارس المجموعات الحديثة **الابتزاز المزدوج (Double Extortion)**: سرقة البيانات وتسريبها قبل تشفيرها، مما يضرب **السرية** و**التوافر** و**التكامل** معاً!

### 5. الجذور الخفية (Rootkits) والبرمجيات عديمة الملفات (Fileless Malware)
- **الجذور الخفية (Rootkits)**: برمجيات خبيثة فائقة التخفي تندمج في عمق نظام التشغيل (في مستوى المستخدم \`User-mode\` عبر اعتراض استدعاءات \`API Hooking\`، أو في مستوى النواة \`Kernel-mode\` وتعديلات الإقلاع \`Bootkits\`) لإخفاء العمليات الخبيثة والملفات والاتصالات الشبكية عن برامج الحماية ومدير المهام.
- **البرمجيات عديمة الملفات (Fileless Malware)**: لا تكتب نفسها كملف على القرص الصلب، بل تُحمّل مباشرة في الذاكرة العشوائية (\`RAM\`) عبر عمليات نظام مشروعة (مثل \`PowerShell\` و\`WMI\`، وهو ما يُعرف في MITRE ATT&CK بـ *Living off the Land - LotL*)، وتضمن بقاءها عبر مفتاح في **سجل ويندوز (Registry)** يعيد تحميلها عند كل إقلاع.

### جدول مقارنة شامل لفئات البرمجيات الخبيثة

| المعيار | الفيروس (Virus) | الدودة (Worm) | التروجان (Trojan/RAT) | الفدية (Ransomware) | الجذور الخفية (Rootkit) | عديمة الملفات (Fileless) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **شرط الانتقال** | تدخل المستخدم (فتح/نسخ ملف) | لا شرط (انتشار شبكي ذاتي) | خداع المستخدم للتثبيت | عبر تروجان أو ثغرات RDP/SMB | يُثبّت بعد الاستغلال وتصعيد الصلاحيات | استغلال متصفح أو سكربت في الذاكرة |
| **موضع الاختباء** | داخل ملف تنفيذي أو مستند | ملف تنفيذي مستقل ومخفي | تطبيق يبدو شرعياً | عملية تشفير + مذكرة فدية | نواة النظام (Kernel) أو مكتبات النظام | الذاكرة (RAM) + مفتاح في Registry |
| **الأثر الأبرز** | استهلاك موارد المضيف وتلف الملفات | إنهاك الشبكة والانتشار الواسع | فتح باب خلفي وتسليم حمولات | شلل التوافر + تسريب البيانات | إخفاء الوجود طويل الأمد (Stealth) | تجاوز فحص الملفات التقليدي |
| **تكتيك MITRE** | \`T1204\` User Execution | \`T1210\` Exploitation of Remote Services | \`T1219\` Remote Access Software | \`T1486\` Data Encrypted for Impact | \`T1014\` Rootkit (\`TA0005\` Evasion) | \`T1059.001\` PowerShell / \`T1547.001\` Registry |
| **مثال مشهور** | \`Concept\` Macro Virus | \`Stuxnet\` / \`Conficker\` | \`Emotet\` / \`NjRAT\` | \`WannaCry\` (\`Wana Decrypt0r\`) | \`Sony BMG Rootkit\` / \`ZeroAccess\` | \`Astaroth\` / \`Poweliks\` |

---

## 2.3 مؤشرات الاختراق (Indicators of Compromise - IoCs) وحفظ الأدلة

**مؤشر الاختراق (IoC)** هو أثر تقني يدل بثقة عالية على وقوع اقتحام، ويتبادله المختصون للحد من آثار البرمجيات الخبيثة:

| نوع مؤشر الاختراق (IoC) | ما يُرصد تقنياً | الوظيفة الدفاعية في SOC |
| :--- | :--- | :--- |
| **التجزئة التشفيرية (Hash - SHA256/MD5)** | بصمة ملفات معروف أنها خبيثة | التعرف القطعي على التروجان والديدان عند تطابق البصمة. |
| **عناوين الشبكة (IP Addresses)** | العناوين الخارجية التي تتصل بها البرمجية (C2) | كشف الأجهزة المصابة داخل المنشأة وحجب الاتصال في الجدار الناري. |
| **الروابط والنطاقات (URLs / Domains)** | النطاقات التي تستعملها البرمجية لتنزيل الحمولات | رصد محاولات الاتصال عبر سجلات DNS وProxy. |
| **توقيع الفيروس (Byte Signature)** | تسلسل بايتات فريد لبرمجية خبيثة بعينها | كشف البرمجية حتى لو اختبأت داخل ملف آخر أو في الذاكرة. |

### قواعد Snort/Suricata لرصد برمجية الفدية (SMB/WannaCry) والبرمجيات عديمة الملفات (PowerShell)

\`\`\`snort
# 1. كشف اتصال برمجية فدية أو دودة تستغل SMB (مثل WannaCry / EternalBlue)
alert tcp any any -> $HOME_NET 445 (msg:"[MALWARE-RANSOMWARE] Suspicious SMB EternalBlue Exploit & Ransomware Propagation"; flow:to_server,established; content:"|ff|SMB|73 00 00 00 00|"; depth:9; classtype:trojan-activity; sid:2000201; rev:1;)

# 2. كشف تنزيل حمولة عديمة الملفات (Fileless Malware) عبر سطر أوامر PowerShell مشفر
alert http $HOME_NET any -> $EXTERNAL_NET any (msg:"[MALWARE-FILELESS] PowerShell In-Memory Payload Download Detected"; flow:to_server,established; content:"PowerShell"; http_user_agent; content:"IEX"; nocase; classtype:trojan-activity; sid:2000202; rev:2;)

# 3. كشف اتصال تروجان Emotet بخادم القيادة والتحكم (C2 Beacon)
alert tcp $HOME_NET any -> $EXTERNAL_NET [80,443,8080] (msg:"[MALWARE-TROJAN] Emotet Banking Trojan C2 Check-in Detected"; flow:to_server,established; content:"POST"; http_method; pcre:"/^\/[a-zA-Z0-9]{4,8}\/$/U"; classtype:trojan-activity; sid:2000203; rev:1;)
\`\`\`

> [!error]
> **خطأ حرج عند الاستجابة للبرمجيات عديمة الملفات (Fileless Malware)**: إعادة تشغيل الجهاز المصاب فوراً ظناً أنها تزيل الإصابة! فإعادة التشغيل تمحو الدليل الجنائي الموجود في الذاكرة العشوائية (\`RAM\`) بينما تعيد البرمجية تشغيل نفسها عبر مفتاح سجل ويندوز (\`Registry Run Key\`). الصحيح: **عزل الجهاز عن الشبكة أولاً، وأخذ صورة للذاكرة (Memory Dump) وحفظ مؤشرات الاختراق قبل أي إصلاح**.`,
    images: [
      {
        prompt: 'Malware taxonomy diagram virus worm trojan ransomware rootkit fileless, 16:9',
        caption: 'تصنيف البرمجيات الخبيثة وآليات الانتشار والتخفي في الأنظمة',
        alt: 'Malware taxonomy diagram',
        seed: 3021,
        isAIGenerated: true,
      },
      {
        prompt: 'Ransomware hybrid encryption symmetric AES asymmetric RSA public key flow, 16:9',
        caption: 'آلية التشفير المزدوج في برمجيات الفدية الحديثة ومؤشرات الاختراق IoCs',
        alt: 'Ransomware hybrid encryption flow',
        seed: 3022,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'القصد الجنائي يميز البرمجيات الخبيثة عن البرمجيات الرديئة وWindows يتصدر الاستهداف',
        subtitle: 'تشريح الأصول المتأثرة والمؤشرات الأمنية الأولية',
        bullets: [
          'البرمجيات الخبيثة (Malware): برامج صُممت عن قصد لإتلاف الأنظمة أو استغلالها أو التجسس عليها.',
          'نظام Windows هو الهدف الأول بفارق كبير لانتشاره المكتبي، يليه المتصفح (Browser) كونه عابراً للأنظمة، ثم Android.',
          'تسمية كل برمجية خبيثة «فيروساً» خطأ شائع يضلل التحليل ويخفي آلية الانتشار الحقيقية.',
          'المؤشر الأمني قد يبدأ بملاحظة بطء غير معتاد أو اتصالات متكررة من جهاز موظف إلى عنوان IP غير مألوف.',
        ],
        keyHighlight: 'التمييز الدقيق بين عائلات البرمجيات الخبيثة هو الخطوة الأولى لاختيار طريقة الاحتواء والاستئصال الصحيحة.',
        visualType: 'architecture',
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'الفيروسات تحتاج لتدخل المستخدم بينما الديدان تنتشر ذاتياً والتروجان يتنكر كبرنامج شرعي',
        subtitle: 'مقارنة سلوكية بين Concept و Stuxnet و Emotet',
        bullets: [
          'الفيروس (Virus): يلحق شيفرته بملف آخر ويحتاج تدخل المستخدم (مثال: فيروس الماكرو Concept في Word).',
          'الدودة (Worm): ذاتية الانتشار عبر الشبكة والأقراص دون تدخل بشري (مثال: Stuxnet عبر USB وRPC و4 ثغرات يوم صفر).',
          'التروجان (Trojan): يتنكر في هيئة برنامج شرعي لخداع المستخدم، ويعمل كأداة إيصال لحمولات أخرى (مثال: Emotet).',
          'تروجان الوصول عن بعد (RAT): يمنح المهاجم تحكماً كاملاً بالملفات وضغطات المفاتيح والشاشة والميكروفون والكاميرا.',
        ],
        keyHighlight: 'الفيروس يرهق المضيف محلياً، والدودة ترهق الشبكة بانتشارها المتضاعف، والتروجان يفتح الأبواب الخلفية بصمت.',
        visualType: 'comparison',
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'برمجيات الفدية توظف التشفير الهجين والابتزاز المزدوج لضرب السرية والتوافر معاً',
        subtitle: 'كيف تعمل Wana Decrypt0r ولماذا لا يضمن الدفع استعادة الملفات؟',
        bullets: [
          'المرحلة 1: تشفير متماثل سريع جداً للملفات على القرص باستخدام مفتاح عشوائي (مثل AES-256).',
          'المرحلة 2: تشفير المفتاح المتماثل نفسه تشفيراً غير متماثل بمفتاح عام مدمج (RSA/ECC) يملك المهاجم مفتاحه الخاص.',
          'الابتزاز المزدوج (Double Extortion): تسريب البيانات الحساسة قبل تشفيرها للمساس بالسرية إلى جانب التوافر.',
          'دفع الفدية بالعملات المشفرة لا يضمن فك التشفير ويمول الجريمة المنظمة ومجموعات APT.',
        ],
        keyHighlight: 'النسخ الاحتياطية المعزولة والمشفرة (Offline/Immutable Backups) هي خط الدفاع الحاسم ضد برمجيات الفدية.',
        visualType: 'flow',
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'الجذور الخفية والبرمجيات عديمة الملفات تتجاوز الفحص التقليدي بالاختباء في النواة والذاكرة',
        subtitle: 'تحليل Rootkits و Fileless Malware واستغلال PowerShell وسجل ويندوز',
        bullets: [
          'الجذور الخفية (Rootkits): تندمج في النظام أو النواة (Kernel) لإخفاء العمليات الخبيثة والاتصالات عن أدوات الفحص.',
          'البرمجيات عديمة الملفات (Fileless): تُحمّل مباشرة في الذاكرة (RAM) عبر PowerShell دون كتابة ملف تنفيذي على القرص.',
          'آلية البقاء (Persistence): زرع مفتاح في سجل ويندوز (Registry) يعيد تحميل الحمولة في الذاكرة عند كل إقلاع.',
          'إعادة تشغيل الجهاز المصاب فوراً خطأ فادح يمحو الدليل الجنائي من الذاكرة ولا يزيل البرمجية.',
        ],
        keyHighlight: 'حفظ صورة الذاكرة العشوائية (RAM Dump) قبل إعادة التشغيل شرط جوهري لكشف البرمجيات عديمة الملفات.',
        visualType: 'mitre',
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'مؤشرات الاختراق (IoCs) تمكّن الكشف المبكر وتبادل المعلومات الاستخباراتية بين المنشآت',
        subtitle: 'الأنواع الأربعة لمؤشرات الاختراق وقواعد Snort لرصدها',
        bullets: [
          'التجزئة (Hash): بصمة رقمية قصيرة للملف الخبيث تكشف التروجان والديدان بدقة قاطعة.',
          'عناوين IP والنطاقات (Domains/URLs): ترصد تواصل الجهاز المصاب مع خوادم القيادة والتحكم (C2).',
          'توقيع الفيروس (Signature): تسلسل بايتات فريد يكشف الفيروس حتى لو اختبأ داخل ملف آخر.',
          'العزل الأولي (Containment) يسبق الإصلاح لمنع التحرك الجانبي وتنزيل حمولات المرحلة الثانية.',
        ],
        keyHighlight: 'مشاركة مؤشرات الاختراق (IoCs) علناً بين مراكز العمليات الأمنية تحول هجوماً على منشأة واحدة إلى درع يحمي الجميع.',
        visualType: 'snort',
      },
    ],
    flashcards: [
      {
        front: 'ما الذي يميز البرمجيات الخبيثة (Malware) عن البرمجيات الرديئة التي تحتوي على أخطاء (Bugs)؟',
        back: 'القصد الجنائي؛ فالبرمجيات الخبيثة صُممت عن قصد لإتلاف الأنظمة أو استغلالها أو التجسس عليها.',
        category: 'مفاهيم أساسية',
      },
      {
        front: 'ما الفرق السلوكي بين الفيروس (Virus) والدودة (Worm) في طريقة الانتشار؟',
        back: 'الفيروس يخزن شيفرته داخل ملف آخر ويحتاج عادة إلى تدخل المستخدم لينتقل، بينما الدودة برنامج مستقل ذاتي الانتشار عبر الشبكة والأقراص دون تدخل المستخدم.',
        category: 'تصنيف Malware',
      },
      {
        front: 'كيف تعمل برمجيات الفدية الحديثة (Ransomware) على مرحلتين تشفيريتين؟',
        back: '1) تشفير متماثل سريع للملفات بمفتاح واحد، 2) تشفير هذا المفتاح المتماثل تشفيراً غير متماثل بمفتاح عام مدمج لا يملك مفتاحه الخاص إلا المهاجم.',
        category: 'برمجيات الفدية',
      },
      {
        front: 'ما هي الجذور الخفية (Rootkits) وما خطرها الأمني؟',
        back: 'برمجيات خبيثة تتغلغل في نظام التشغيل أو النواة (Kernel) لإخفاء وجود العمليات والملفات الخبيثة والاتصالات الشبكية عن المستخدم وبرامج الحماية.',
        category: 'التخفي المتقدم',
      },
      {
        front: 'لماذا يُعدّ إعادة تشغيل الجهاز فوراً خطأً فادحاً عند الاشتباه ببرمجية عديمة الملفات (Fileless Malware)؟',
        back: 'لأنها تعمل في الذاكرة (RAM) فتمحو إعادة التشغيل أثرها القابل للفحص الجنائي دون إزالتها، إذ تعيد تحميل نفسها عند الإقلاع عبر مفتاح في سجل ويندوز (Registry).',
        category: 'التحقيق الجنائي',
      },
      {
        front: 'عدد الأنواع الأربعة الشائعة لمؤشرات الاختراق (IoCs).',
        back: '1) التجزئة (Hash) للملفات الخبيثة، 2) عناوين IP للاتصال، 3) الروابط والنطاقات (URLs/Domains)، 4) توقيع الفيروس (تسلسل البايتات الفريد).',
        category: 'مؤشرات الاختراق',
      },
    ],
    miniQuiz: [
      {
        question: 'أي من البرمجيات الخبيثة التالية انتشرت عام 2010 عبر أقراص USB واستدعاءات RPC واستخدمت أربع ثغرات يوم صفر لاستهداف أجهزة التحكم الصناعي؟',
        options: [
          'دودة Stuxnet',
          'فيروس الماكرو Concept',
          'تروجان Emotet المصرفي',
          'أداة فحص الشبكة Nmap',
        ],
        correctIndex: 0,
        explanation: 'دودة Stuxnet انتشرت ذاتياً سنة 2010 عبر USB وRPC واستعملت 4 ثغرات يوم صفر لاستهداف أجهزة التحكم الصناعي (PLC) في منشآت نووية.',
      },
      {
        question: 'لماذا تُعد برمجيات الفدية الحديثة اختراقاً لسرية البيانات (Confidentiality) إلى جانب ضربها للتوافر (Availability)؟',
        options: [
          'لأن المهاجمين يسربون البيانات ويسرقونها غالباً قبل تشفيرها للضغط على الضحية (الابتزاز المزدوج)',
          'لأن التشفير المتماثل يحذف بطاقة الشبكة من الجهاز المضيف',
          'لأن برمجية الفدية تعمل فقط على أنظمة Linux غير المتصلة بالشبكة',
          'لأن الفدية تُدفع دائماً عبر حوالات بنكية رسمية تكشف هوية المهاجم',
        ],
        correctIndex: 0,
        explanation: 'أوضح كتاب المقرر أن برمجية الفدية تُعد اختراقاً للبيانات أيضاً لأن البيانات تُسرّب غالباً قبل تشفيرها (مساس بالسرية) إلى جانب تعطيل الوصول إليها بالتشفير (مساس بالتوافر).',
      },
      {
        question: 'نقر مستخدم على رابط في رسالة فحمّل الموقع ثغرة JavaScript نفذت أمر PowerShell من سطر واحد في الذاكرة مع إضافة مفتاح في سجل ويندوز (Registry). ما تصنيف هذا الهجوم؟',
        options: [
          'برمجية خبيثة عديمة الملفات (Fileless Malware)',
          'هجوم تضخيم انعكاسي (Smurf ICMP Attack)',
          'فيروس قطاع إقلاع تقليدي (Boot Sector Virus)',
          'نقل منطقة أسماء النطاقات (DNS Zone Transfer)',
        ],
        correctIndex: 0,
        explanation: 'هذا المثال النصي من كتاب المقرر يوضح آلية عمل البرمجيات عديمة الملفات (Fileless Malware) التي تُحمّل في الذاكرة عبر PowerShell وتستمر عبر مفتاح في سجل ويندوز (Registry).',
      },
      {
        question: 'أي مؤشر من مؤشرات الاختراق (IoCs) التالية يُستخدم لكشف فيروس بعينه حتى لو اختبأ داخل ملف تنفيذي آخر وتغيرت تجزئة الملف الكلي؟',
        options: [
          'توقيع الفيروس (Signature - تسلسل بايتات فريد للفيروس)',
          'عنوان MAC الخاص ببطاقة الشبكة المحلية',
          'رقم المنفذ المصدري العشوائي (Ephemeral Port)',
          'اسم حساب المستخدم في نظام التشغيل',
        ],
        correctIndex: 0,
        explanation: 'وفق جدول 2.2 في كتاب المقرر، فإن توقيع الفيروس (Signature) هو تسلسل بايتات فريد لفيروس بعينه يُمكّن من كشف الفيروس حتى لو اختبأ داخل ملف آخر.',
      },
    ],
    interactiveBook3D: {
      model3DType: 'malware_dna_helix',
      shaderEffect: 'biohazard_red_pulse',
      cameraPosition: { x: 1.5, y: 1.8, z: 5.0 },
      autoRotateSpeed: 1.5,
      primaryNeonColor: '#f97316',
      secondaryNeonColor: '#ef4444',
      pages3D: [
        {
          pageNumber: 1,
          type: 'overview',
          title: 'الحلزون الجيني للبرمجيات الخبيثة (Malware DNA Helix)',
          subtitle: 'تمثيل ثلاثي الأبعاد لبنية الانتشار والحمولة والتخفي',
          contentMarkdown: `### تشريح الحلزون الثلاثي الأبعاد
يمثل المجسم ثلاثي الأبعاد شريطاً مزدوجاً يربط بين **آلية الانتشار (Propagation Vector)** و**الحمولة التدميرية (Payload)**:
- **الفيروس**: يلتصق بخلية مضيفة (ملف Word/EXE).
- **الدودة**: تتحرك ذاتياً عبر عقد الشبكة (RPC/SMB).
- **التروجان**: يرتدي غلافاً شرعياً لاجتياز الجدار الدفاعي.`,
          highlightedRuleOrFormula: 'Malware = Intentional Malicious Code (Propagation + Payload + Persistence)',
          interactiveTakeaway: 'تدوير الحلزون يظهر الفرق بين استهلاك الموارد المحلي (الفيروس) واستهلاك عرض النطاق الشبكي (الدودة).',
        },
        {
          pageNumber: 2,
          type: 'anatomy',
          title: 'تشريح التشفير المزدوج في برمجيات الفدية (Ransomware)',
          subtitle: 'مفتاح متماثل سريع للملفات + مفتاح عام غير متماثل لقفل المفتاح',
          contentMarkdown: `### لماذا يستحيل فك تشفير الفدية بدون المفتاح الخاص؟
1. تقوم البرمجية بتوليد مفتاح \`AES-256\` محلي وتشفير آلاف الملفات في ثوانٍ.
2. تشفّر مفتاح \`AES\` نفسه بمفتاح \`RSA-2048\` العام المدمج داخل الشيفرة، وتمحو مفتاح AES الصريح من الذاكرة.`,
          highlightedRuleOrFormula: 'CipherFiles = AES_Enc(Files, K_sym) | LockedKey = RSA_Enc(K_sym, PubKey_Attacker)',
          interactiveTakeaway: 'انقر على عقدة القفل المزدوج لرؤية مسار التشفير الهجين وأهمية النسخ الاحتياطي المعزول.',
        },
        {
          pageNumber: 3,
          type: 'defense-lab',
          title: 'مختبر كشف البرمجيات عديمة الملفات والجذور الخفية',
          subtitle: 'تحليل الذاكرة العشوائية (RAM) وسجل ويندوز (Registry) ومؤشرات IoC',
          contentMarkdown: `### مطاردة الأشباح في الذاكرة (Memory Forensics)
- **Fileless Malware**: تنفيذ أمر \`PowerShell -nop -w hidden -enc ...\` مباشرة في الذاكرة.
- **Rootkit**: التلاعب بجدول استدعاءات النظام (\`SSDT Hooking\`) لإخفاء العملية الخبيثة.`,
          highlightedRuleOrFormula: 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run -> PowerShell Payload',
          interactiveTakeaway: 'تذكر: عزل الشبكة وأخذ لقطة الذاكرة (Memory Dump) يسبق دائماً إعادة تشغيل الجهاز!',
        },
        {
          pageNumber: 4,
          type: 'case-study',
          title: 'مختبر مؤشرات الاختراق (IoCs) الأربعة',
          subtitle: 'ربط البصمات والعناوين والنطاقات والتواقيع بقواعد Snort',
          contentMarkdown: `### بناء درع استخبارات التهديدات
- مطابقة بصمة \`SHA-256\` للملفات المشبوهة.
- حظر عناوين \`IP\` ونطاقات خوادم القيادة والتحكم (\`C2\`) الخاصة بتروجان \`Emotet\` وفدية \`WannaCry\`.`,
          highlightedRuleOrFormula: 'IoC = { File_Hash, C2_IP, Malicious_Domain, Byte_Signature }',
          interactiveTakeaway: 'تحديث قاعدة التواقيع ومؤشرات الاختراق باستمرار يحول دون انتشار العدوى إلى بقية أصول المنشأة.',
        },
      ],
      stepByStep: [
        {
          stepNumber: 1,
          title: 'الإيصال والتنكر (Trojan / Phishing Delivery)',
          description: 'وصول مستند Word يحوي ماكرو خبيثاً أو رابط JavaScript خبيث إلى جهاز سطح مكتب يعمل بنظام Windows.',
          technicalDetail: 'يستغل المهاجم ثقة المستخدم لتشغيل الماكرو أو الرابط (T1204 User Execution).',
          visualCue: 'اقتراب كبسولة خضراء خادعة من عقدة الجهاز في المجسم ثلاثي الأبعاد ثم تحولها للون الأحمر عند الفتح.',
          codeOrCommand: 'WINWORD.EXE -> spawns -> cmd.exe /c powershell.exe -w hidden -ep bypass',
        },
        {
          stepNumber: 2,
          title: 'التحميل في الذاكرة والبقاء (Fileless Execution & Registry Persistence)',
          description: 'تنفيذ الحمولة في الذاكرة العشوائية (RAM) دون كتابة ملف تنفيذي على القرص، مع زرع مفتاح استمرارية في Registry.',
          technicalDetail: 'كتابة سطر أوامر في مفتاح Run داخل سجل ويندوز لضمان إعادة التحميل عند كل إقلاع.',
          visualCue: 'توهج شرائح الذاكرة RAM باللون البرتقالي وارتباطها بعقدة Registry.',
          codeOrCommand: 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run" /v "Updater" /t REG_SZ /d "powershell -enc ...================"',
        },
        {
          stepNumber: 3,
          title: 'التخفي عبر الجذور الخفية وحقن العمليات (Rootkit & Process Injection)',
          description: 'حقن الشيفرة الخبيثة داخل عملية نظام شرعية (مثل svchost.exe) لإخفاء مصدر نشاطها عن المستخدم.',
          technicalDetail: 'استغلال تقنية Process Hollowing / API Hooking لإخفاء الاتصالات الشبكية والملفات.',
          visualCue: 'تغليف العقدة الخبيثة بغشاء تمويهي شفاف داخل المجسم ثلاثي الأبعاد.',
          codeOrCommand: 'Technique: MITRE ATT&CK T1055 (Process Injection) & T1014 (Rootkit)',
        },
        {
          stepNumber: 4,
          title: 'الانتشار الشبكي أو التشفير الهجين للفدية (Worm Propagation / Ransomware)',
          description: 'محاولة البرمجية التحرك جانبياً عبر الشبكة (SMB/RPC) أو بدء التشفير المتماثل وغير المتماثل للملفات.',
          technicalDetail: 'رصد محاولة اتصال بمنفذ 445 وخادم القيادة والتحكم الخارجي لطلب تعليمات التشفير.',
          visualCue: 'إطلاق خيوط ليزر حمراء من الجهاز المصاب نحو الخوادم المجاورة في الشبكة.',
          codeOrCommand: 'alert tcp $HOME_NET any -> $HOME_NET 445 (msg:"Lateral SMB Worm Propagation"; sid:2000201;)',
        },
        {
          stepNumber: 5,
          title: 'العزل الأولي وحفظ الأدلة ومؤشرات الاختراق (Isolation & Evidence Preservation)',
          description: 'فصل الجهاز المصاب عن الشبكة فوراً مع إبقائه قيد التشغيل لجمع صورة الذاكرة واستخراج مؤشرات الاختراق (IoCs).',
          technicalDetail: 'استخراج عناوين IP، النطاقات، وتجزئة SHA-256 من الذاكرة وتعميمها على جدران الحماية وأنظمة EDR.',
          visualCue: 'إحاطة الجهاز المصاب بدرع عزل أزرق يقطع خيوط الاتصال الخبيثة مع حفظ بيانات الذاكرة.',
          codeOrCommand: 'sha256sum suspicious_dump.bin && iptables -A OUTPUT -d 198.51.100.77 -j DROP',
        },
      ],
      hotspots: [
        {
          id: 'hs-ch2-worm-stuxnet',
          label: 'نواة الدودة ذاتية الانتشار (Worm Core)',
          title: 'الانتشار الذاتي عبر الشبكة والأقراص (مثال Stuxnet)',
          x: -1.5,
          y: 1.2,
          z: 0.5,
          coordinates: { x: -1.5, y: 1.2, z: 0.5 },
          color: '#ef4444',
          icon: 'Zap',
          summary: 'كائن برمجي مستقل ينسخ نفسه عبر الشبكة ووسائط USB دون أي تدخل من المستخدم.',
          detailedExplanation: 'تختلف الدودة عن الفيروس في كونها لا تحتاج لتدخل المستخدم ولا تلحق شيفرتها بملف آخر، بل تستغل ثغرات الشبكة (مثل RPC أو SMB) للتضاعف السريع، كما فعلت دودة Stuxnet عام 2010 باستغلال 4 ثغرات يوم صفر.',
          mitreTactic: 'TA0008 - Lateral Movement (T1210 Exploitation of Remote Services)',
          defensiveControl: 'تجزئة الشبكة، إغلاق المنافذ غير الضرورية، وتعطيل التشغيل التلقائي لوسائط USB.',
        },
        {
          id: 'hs-ch2-trojan-rat',
          label: 'بوابة حصان طروادة (Trojan / RAT)',
          title: 'التنكر الشرعي والتحكم الكامل عن بعد (Emotet & RATs)',
          x: 1.5,
          y: 1.2,
          z: 0.5,
          coordinates: { x: 1.5, y: 1.2, z: 0.5 },
          color: '#f59e0b',
          icon: 'Terminal',
          summary: 'برنامج يتظاهر بالشرعية ليمنح المهاجم تحكماً خفياً بالملفات والشاشة والكاميرا والميكروفون.',
          detailedExplanation: 'يعتمد التروجان على خداع المستخدم لتثبيته ومنحه الصلاحيات. يعمل تروجان Emotet كمنصة إيصال (Dropper/Loader) لتنزيل برمجيات الفدية، بينما يتيح RAT التجسس الكامل وتسجيل ضربات المفاتيح.',
          mitreTactic: 'TA0011 - Command and Control (T1219 Remote Access Software)',
          defensiveControl: 'تطبيق مبدأ القوائم البيضاء للتطبيقات (Application Whitelisting) وتوعية المستخدمين.',
        },
        {
          id: 'hs-ch2-ransomware-crypto',
          label: 'وحدة تشفير الفدية (Ransomware Engine)',
          title: 'التشفير المزدوج (متماثل + غير متماثل) والابتزاز المزدوج',
          x: -1.2,
          y: -1.2,
          z: 0.8,
          coordinates: { x: -1.2, y: -1.2, z: 0.8 },
          color: '#ec4899',
          icon: 'Lock',
          summary: 'تشفير سريع للملفات بمفتاح متماثل ثم قفل المفتاح بمفتاح عام يملك المهاجم مفتاحه الخاص.',
          detailedExplanation: 'تجمع برمجيات الفدية الحديثة بين سرعة التشفير المتماثل (AES) وقوة التشفير غير المتماثل (RSA/ECC)، وتسرّب البيانات قبل تشفيرها للابتزاز المزدوج، مما يجعلها التهديد الأخطر على قطاعي الشركات والرعاية الصحية.',
          mitreTactic: 'TA0040 - Impact (T1486 Data Encrypted for Impact)',
          defensiveControl: 'نسخ احتياطية معزولة وغير قابلة للتعديل (Immutable Offline Backups) وأنظمة EDR.',
        },
        {
          id: 'hs-ch2-fileless-rootkit',
          label: 'طبقة الذاكرة والجذور الخفية (Fileless & Rootkit)',
          title: 'الاستقرار في الذاكرة العشوائية (RAM) والتخفي في النواة (Kernel)',
          x: 1.2,
          y: -1.2,
          z: 0.8,
          coordinates: { x: 1.2, y: -1.2, z: 0.8 },
          color: '#06b6d4',
          icon: 'Cpu',
          summary: 'تشغيل الشيفرة في الذاكرة عبر PowerShell وإخفاء الأثر عبر الجذور الخفية ومفاتيح Registry.',
          detailedExplanation: 'تتجنب البرمجيات عديمة الملفات كتابة أي ملف على القرص الصلب لتفادي مضادات الفيروسات التقليدية، وتستخدم أدوات النظام الشرعية (PowerShell) مع مفتاح في سجل ويندوز (Registry) للبقاء بعد الإقلاع.',
          mitreTactic: 'TA0005 - Defense Evasion (T1014 Rootkit / T1027 Obfuscated Files)',
          defensiveControl: 'تقييد سياسات تنفيذ PowerShell (Constrained Language Mode) ومراقبة سجل النظام والذاكرة.',
        },
      ],
    },
    richData: {
      id: 302,
      chapter_number: 2,
      title: 'تصنيف البرمجيات الخبيثة (Malware Taxonomy)',
      subtitle: 'الفيروسات، الديدان، التروجان، برمجيات الفدية، الجذور الخفية، ومؤشرات الاختراق',
      category: 'متقدم',
      pdfStartPage: 15,
      pdfEndPage: 24,
      description: 'يحلل هذا الفصل عائلات البرمجيات الخبيثة، شروط انتقالها، آلية التشفير الهجين في الفدية، البرمجيات عديمة الملفات، والأنواع الأربعة لمؤشرات الاختراق (IoCs).',
      objectives: [
        'التمييز بين الفيروس والدودة والتروجان من حيث شرط الانتقال والأثر على المضيف والشبكة',
        'شرح آلية عمل برمجيات الفدية الحديثة على مرحلتين تشفيريتين وخطرها على السرية والتوافر',
        'تحليل الجذور الخفية (Rootkits) والبرمجيات عديمة الملفات (Fileless Malware) في الذاكرة وسجل ويندوز',
        'توظيف مؤشرات الاختراق الأربعة (التجزئة، IP، النطاقات، التوقيع) في الكشف والاحتواء وحفظ الأدلة',
      ],
      sections: [
        {
          heading: '1. الفيروسات والديدان وأحصنة طروادة',
          content: 'الفيروس يخزن شيفرته داخل ملف آخر ويحتاج تدخل المستخدم (مثل Concept)، والدودة تنتشر ذاتياً بلا تدخل (مثل Stuxnet)، والتروجان يتنكر في هيئة برنامج شرعي لإيصال حمولات أخرى أو فتح تحكم عن بعد RAT (مثل Emotet).',
        },
        {
          heading: '2. برمجيات الفدية (Ransomware) والتشفير المزدوج',
          content: 'تعمل على مرحلتين: تشفير متماثل سريع للملفات، ثم تشفير المفتاح المتماثل بمفتاح عام مدمج يملك المهاجم مفتاحه الخاص، مع تسريب البيانات قبل تشفيرها.',
        },
        {
          heading: '3. البرمجيات عديمة الملفات ومؤشرات الاختراق (IoCs)',
          content: 'تُحمّل البرمجيات عديمة الملفات في الذاكرة عبر PowerShell وتستمر عبر سجل ويندوز (Registry). وتُكشف البرمجيات عبر مؤشرات الاختراق: التجزئة، عناوين IP، الروابط والنطاقات، وتوقيع الفيروس.',
        },
      ],
      tables: [
        {
          title: 'جدول 2.1: مقارنة سلوكية بين الفيروس والدودة والتروجان',
          headers: ['المعيار', 'الفيروس (Virus)', 'الدودة (Worm)', 'التروجان (Trojan)'],
          rows: [
            ['شرط الانتقال', 'تدخل المستخدم كنسخ ملف مصاب', 'لا شرط، انتشار ذاتي', 'إقناع المستخدم بالتثبيت أو منح الصلاحيات'],
            ['ما يحققه الانتشار', 'تكاثر داخل ملفات الجهاز', 'تضاعف سريع عبر الشبكة والأقراص', 'تسليم حمولات أخرى إلى الجهاز'],
            ['أثر الانتشار على الأداء', 'استهلاك موارد محلي كبير', 'ضغط على الشبكة أكثر من المضيف', 'بحسب الحمولة التي يحملها'],
            ['مثال مذكور', 'Concept', 'Stuxnet', 'Emotet'],
          ],
        },
        {
          title: 'جدول 2.2: الأنواع الشائعة لمؤشر الاختراق (IoC)',
          headers: ['النوع', 'ما يُرصد', 'الوظيفة'],
          rows: [
            ['التجزئة (Hash)', 'تجزئة ملفات معروف أنها خبيثة', 'التعرف على التروجان والديدان'],
            ['عناوين IP', 'العناوين التي تتصل بها البرمجية الخبيثة', 'معرفة ما إذا كان الجهاز مصاباً'],
            ['الروابط والنطاقات', 'الروابط أو النطاقات التي تستعملها البرمجية', 'معرفة ما إذا كان الجهاز مصاباً'],
            ['توقيع الفيروس (Signature)', 'تسلسل بايتات فريد لفيروس بعينه', 'كشف الفيروس حتى لو اختبأ داخل ملف آخر'],
          ],
        },
      ],
      commonMistake: {
        mistake: 'تسمية كل برمجية خبيثة «فيروساً»، أو إعادة تشغيل الجهاز المصاب فوراً ظناً أنها تزيل الإصابة.',
        fix: 'يجب التمييز بين الأنواع لمعرفة طريقة الانتشار، ويجب حفظ أدلة الذاكرة وعزل الجهاز قبل إعادة التشغيل لأن البرمجيات عديمة الملفات تعود عبر سجل ويندوز بينما تمحو إعادة التشغيل دليل الذاكرة.',
      },
      solvedExample: {
        title: 'تحليل حادثة إصابة ببرمجية عديمة الملفات وعزلها',
        given: 'نقر موظف على رابط في رسالة مزعجة فحُمّلت ثغرة JavaScript نفذت أمر PowerShell في الذاكرة وأضافت مفتاحاً في سجل ويندوز، وبدأ الجهاز بالاتصال بعنوان IP خارجي غريب.',
        steps: [
          '1. رصد المؤشر: الاتصال المتكرر بعنوان IP غير مألوف يُعد مؤشراً أمنياً ومؤشر اختراق (IoC).',
          '2. الاحتواء الأولي: فصل الجهاز عن الشبكة فوراً لقطع اتصال القيادة والتحكم (C2) ومنع التحرك الجانبي.',
          '3. حفظ الأدلة: عدم إعادة تشغيل الجهاز، وأخذ لقطة للذاكرة (RAM) وتوثيق مفتاح Registry وعنوان IP وتجزئة الحمولة.',
          '4. الإبلاغ والمعالجة: مشاركة مؤشرات الاختراق لفحص بقية أجهزة المنشأة ثم إزالة مفتاح السجل وتطهير النظام.',
        ],
        result: 'احتواء الإصابة في الجهاز الأول ومنع تنزيل حمولة الفدية في المرحلة الثانية مع الحفاظ على الدليل الجنائي كاملاً.',
        whyItMatters: 'العزل يقطع مسار C2 والتحرك الجانبي، وحفظ الذاكرة قبل الإقلاع يمنع ضياع أثر البرمجية عديمة الملفات.',
      },
      selfAssessment: [
        {
          question: 'قارن بين الدودة والفيروس من حيث الحاجة إلى تدخل المستخدم وطريقة الانتشار.',
          answer: 'الدودة تنتشر ذاتياً بلا تدخل المستخدم وتُخزن في كائن مستقل كملف تنفيذي مخفي، والفيروس يحتاج عادة إلى تدخله ويخزن شيفرته داخل ملف آخر.',
        },
        {
          question: 'علّل أهمية حفظ الأدلة قبل إعادة تشغيل الجهاز المتأثر.',
          answer: 'لأن بعض البرمجيات (Fileless) تعمل في الذاكرة فتمحو إعادة التشغيل أثرها القابل للفحص دون إزالتها وتعود عبر مفتاح في سجل ويندوز، ولأن الآثار المحفوظة تصبح مؤشرات اختراق لكشف أجهزة أخرى.',
        },
      ],
    },
    updated_at: COURSE_TIMESTAMP,
  },

  // =========================================================================
  // الفصل الثالث: الهندسة الاجتماعية، التصيد الاحتيالي، حجب الخدمة، وسلسلة القتل السيبراني
  // =========================================================================
  {
    id: 303,
    chapter_number: 3,
    title: 'الهندسة الاجتماعية، التصيد الاحتيالي (Phishing/Spear-Phishing)، هجمات حجب الخدمة (DoS/DDoS)، وسلسلة القتل السيبراني (Cyber Kill Chain - 7 مراحل)',
    subtitle: 'فئات التصيد الخمس، المؤشرات الستة للرسائل الاحتيالية، آليات إغراق SYN وICMP وتضخيم Smurf، وتشريح مراحل Kill Chain السبع',
    description: 'دراسة تفصيلية متكاملة لهجمات الهندسة الاجتماعية والتصيد الاحتيالي بفئاته الخمس ومؤشراته الستة، هجمات الحرمان من الخدمة (DoS/DDoS) والشبكات البوتية (Botnets) والتمييز بين الحمل المشروع والهجوم، هجمات الاستغلال ورفع الصلاحيات عبر حدود الثقة، وتشريح مراحل سلسلة القتل السيبراني السبع (Cyber Kill Chain).',
    category: 'هجمات وسلاسل القتل',
    difficulty: 'intermediate',
    pdfStartPage: 17,
    pdfEndPage: 24,
    diagramKey: 'ise232-threats-3',
    diagramConfig: {
      key: 'ise232-threats-3',
      title: 'مراحل سلسلة القتل السيبراني السبعة (Cyber Kill Chain) ومسارات التصيد وDDoS',
      svgType: 'CyberKillchain',
      nodes: [
        '1. الاستطلاع (Recon)',
        '2. التسليح (Weaponization)',
        '3. الإيصال (Delivery)',
        '4. الاستغلال (Exploitation)',
        '5. التثبيت (Installation)',
        '6. القيادة والتحكم (C2)',
        '7. التسريب والأهداف (Exfiltration)',
      ],
      accentColor: '#eab308',
    },
    videoUrl: 'https://www.youtube.com/watch?v=QzX2gN7YbW0',
    videoDuration: '21:10',
    presentationUrl: '/presentations/ise232-threats-ch3.pdf',
    keyTopics: [
      'الهندسة الاجتماعية (Social Engineering) والتصيد الاحتيالي (Phishing) والبريد المزعج (SPAM ~85%)',
      'الفئات الخمس للتصيد: الموجه (Spear Phishing)، صيد الحيتان (Whaling)، Smishing، Vishing، والقنوات غير المرتبطة بالعمل',
      'انتحال النطاق بالخطأ الإملائي (Typosquatting مثل gooogle.com) والمؤشرات الستة لرسالة التصيد',
      'المصافحة الثلاثية في TCP (SYN, SYN-ACK, ACK) وهجوم إغراق SYN Flood وحل SYN Cookies',
      'هجوم إغراق ICMP (Ping Flood) وتجاوز سعة الذاكرة المؤقتة (Buffer Overflow)',
      'الحرمان من الخدمة الموزع (DDoS)، الشبكات البوتية (Botnets)، وهجوم التضخيم الانعكاسي (Smurf Attack)',
      'التمييز الدقيق بين الحمل المشروع (ذروة الاستخدام) وهجوم حجب الخدمة عبر القرائن التقنية',
      'الاختراق (Intrusion) مقابل الاستغلال (Exploitation)، ثغرات يوم صفر (Zero-Day)، وتنفيذ الشيفرة عن بعد (RCE)',
      'رفع الصلاحيات الأفقي والرأسي (Privilege Escalation: CVE-2021-4034 pkexec) وحدود الثقة (SQL Injection)',
      'سلسلة القتل السيبراني السباعية (Lockheed Martin Cyber Kill Chain - 7 Stages)',
    ],
    content: `## 3.1 الهندسة الاجتماعية وهجمات التصيد الاحتيالي (Phishing)

**التصيد الاحتيالي (Phishing)** هو تواصل برسالة احتيالية لدفع شخص إلى إجراء يضره، وهو أبرز صور **الهندسة الاجتماعية (Social Engineering)** لأن الضحية ينفذ الإجراء الخطر بيده (كتنزيل مرفق وتشغيله أو النقر على رابط وإدخال بيانات الدخول). ويرتبط به **البريد المزعج (SPAM)** الذي يشكل نحو **85%** من حركة البريد الإلكتروني عالمياً.

### الفئات الخمس الرئيسة للتصيد الاحتيالي (جدول 2.3 في المقرر)

| الفئة | المصطلح الإنجليزي | الوصف الدقيق | مثال تطبيقي |
| :--- | :--- | :--- | :--- |
| **1. التصيد الموجه** | \`Spear Phishing\` | حملة مفصلة على مقاس منشأة أو بيئة بعينها تتضمن معلومات داخلية لتقليل الشك. | انتحال صفة ممثل لجهة رقابية حكومية لمراسلة قسم الامتثال في شركة. |
| **2. صيد الحيتان** | \`Whaling\` | استهداف أصحاب المناصب العليا والقيادات التنفيذية في المنشأة. | رسالة مفصلة للمدير التنفيذي (CEO) أو المدير المالي (CFO) لاعتماد حوالة عاجلة. |
| **3. التصيد بالرسائل النصية** | \`Smishing\` | استعمال رسائل \`SMS\` النصية في التصيد وإرسال روابط خبيثة. | رسالة SMS تنتحل شركة شحن تطلب دفع رسوم جمركية عبر رابط مزيف. |
| **4. التصيد الصوتي** | \`Vishing\` | استعمال المكالمات والرسائل الصوتية في خداع الضحية. | اتصال هاتفي ينتحل الدعم الفني للبنك لطلب رمز التحقق OTP. |
| **5. التصيد عبر قنوات غير مرتبطة بالعمل** | \`Non-work Channel Phishing\` | جمع معلومات من قناة تواصل شخصية أو منتدى هوايات واستعمالها للوصول غير المصرح به. | إنشاء حساب في منتدى للإبحار الشراعي يرتاده مدير تنفيذي ومراسلته لاستدراج معلومات. |

### المؤشرات الستة لرسالة البريد الإلكتروني المشتبه بها

1. **انتحال المرسل (Impersonation)**: ادعاء صفة شخص من المنشأة أو جهة ذات سلطة.
2. **عدم تطابق عنوان المرسل**: اختلاف نطاق البريد الفعلي عن النطاق الرسمي للجهة المدّعاة.
3. **رابط مضلل أو نطاق مشابه (Typosquatting)**: مثل تسجيل \`gooogle.com\` بثلاثة أحرف \`o\` لجذب من يخطئون إملائياً.
4. **مرفق أو رابط يقود إلى شيفرة خبيثة**: كمستند Word/Excel يحتوي على ماكرو خبيث.
5. **طلب إجراء صريح**: تنزيل ملف أو تشغيله أو النقر على رابط أو إدخال بيانات الاعتماد.
6. **الاستعجال بمهلة قصيرة (Urgency)**: وهو **جوهر الرسالة الاحتيالية** لأن التصيد لا ينجح إلا إذا نفّذ الضحية الإجراء بنفسه تحت ضغط الوقت دون تدقيق.

---

## 3.2 هجمات الحرمان من الخدمة (DoS / DDoS) والشبكات البوتية

يهدف هجوم **الحرمان من الخدمة (Denial of Service - DoS)** إلى إيقاف النظام عن العمل بإغراقه بالطلبات، أو باستغلال ثغرة تُسقط البرنامج فتتوقف الخدمة (استهداف مباشر لضلع **التوافر Availability**).

### أشكال هجمات الحرمان من الخدمة وسبل الحد منها (جدول 2.4 في المقرر)

| الشكل الهجومي | آلية العمل التقنية | وسيلة الحد منه (Mitigation) |
| :--- | :--- | :--- |
| **إغراق SYN (\`SYN Flood\`)** | يستغل المصافحة الثلاثية في TCP (\`SYN\` -> \`SYN-ACK\` -> \`ACK\`)؛ فيرسل رزم \`SYN\` كثيرة تبدأ المصافحة ولا تكملها، فيخصص الخادم موارد كبيرة للرد عليها حتى ينهار. | **كوكيز SYN (\`SYN Cookies\`)**: آلية تؤجل ربط الحالة وتخصيص الذاكرة بالاتصال إلى أن تكتمل المصافحة الثلاثية فعلاً. |
| **إغراق ICMP (\`ICMP / Ping Flood\`)** | إرسال طلبات صدى (\`ICMP Echo Request / Ping\`) كثيفة جداً لإنهاك الخادم وعرض النطاق، خاصة من مصادر متعددة. | **تحديد معدل رزم ICMP (\`Rate Limiting\`)** على الخادم وجدار الحماية. |
| **تجاوز سعة الذاكرة المؤقتة (\`Buffer Overflow\`)** | إرسال بيانات أكبر من سعة الذاكرة المؤقتة (\`Buffer\`) أو بشكل غير متوقع فيُسقط برنامجاً سيئ التصميم. | **معالجة البيانات غير المتوقعة والتحقق من حدود المدخلات (\`Bounds Checking\`)** في البرنامج. |
| **هجوم التضخيم الانعكاسي (\`Smurf DDoS Attack\`)** | إرسال طلب صدى \`ICMP\` بعنوان الضحية كمصدر مزور (\`Spoofed IP\`) موجهاً إلى عنوان البث (\`Broadcast\`) للشبكة الفرعية، فترد جميع الأجهزة على الضحية وتغرقه. | **منع التوجيه إلى عناوين البث (\`Disable IP Directed Broadcast\`)** والتحقق من عناوين المصدر (\`BCP 38\`). |

### التمييز بين الحمل المشروع (ذروة الاستخدام) وهجوم حجب الخدمة
كلاهما يرفع عدد الطلبات، لذا **لا يكفي عدد الطلبات وحده للفصل بينهما**. وتفصل بينهما **القرائن الثلاث**:
1. مصافحات \`TCP\` تبدأ بـ \`SYN\` ولا تكتمل بـ \`ACK\`.
2. بيانات غير متوقعة أو مشوهة تُسقط البرنامج.
3. تلقي الخادم ردوداً لطلبات لم يرسلها أصلاً بسبب تزوير عنوان المصدر (\`IP Spoofing\`).

---

## 3.3 هجمات الاختراق والاستغلال وحدود الثقة

- **الاختراق (Intrusion)**: دخول غير مصرح به إلى الأصل أو النظام (لا يشترط ثغرة تقنية، فقد يتحقق ببيانات دخول مسروقة).
- **الاستغلال (Exploitation)**: لحظة تنفيذ البرمجية الخبيثة أو حمولة الثغرة بنجاح، ومن أخطرها **ثغرات يوم صفر (Zero-Day)** غير المعلنة.
- **رفع الصلاحيات (Privilege Escalation)**:
  - **أفقي (Horizontal)**: يمنح وصولاً مماثلاً (من حساب مستخدم عادي إلى مستخدم عادي آخر).
  - **رأسي (Vertical)**: يمنح وصولاً أعلى (من مستخدم عادي إلى مدير \`root/SYSTEM\`، مثل ثغرة **\`CVE-2021-4034\`** المعروفة بـ \`PwnKit\` في الأمر \`pkexec\` على Linux).
- **تنفيذ الشيفرة عن بعد (\`RCE - Remote Code Execution\`)**: أخطر نتائج الاستغلال لأنه يفتح واجهة أوامر بصلاحيات واسعة للتحكم التام في الأصل.
- **حدود الثقة (\`Trust Boundaries\`) وحقن \`SQL\`**: الخط الفاصل بين مكونات النظام الموثوقة والمدخلات الخارجية غير الموثوقة. في حقن \`SQL\` يُدرج مدخل المستخدم مباشرة في الاستعلام دون تنقية (\`Input Sanitization\`) فيصبح شرط كلمة المرور صحيحاً دائماً (\`' OR '1'='1\`).

---

## 3.4 سلسلة القتل السيبراني السباعية (Cyber Kill Chain) وقواعد Snort

طورت **Lockheed Martin** نموذج **سلسلة الهجوم السيبرانية (Cyber Kill Chain)** من 7 مراحل متتابعة. ظهور مؤشر في أي مرحلة يعني أن الهجوم بلغها على الأقل، وإحباط المهاجم في أي مرحلة يكسر السلسلة:

| المرحلة | الاسم الإنجليزي | ما يحدث فيها تقنياً | تكتيك MITRE المقابل |
| :---: | :--- | :--- | :--- |
| **1** | **الاستطلاع (\`Reconnaissance\`)** | جمع المعلومات سلبياً (OSINT) أو نشطاً بفحص المنافذ والثغرات (\`nmap\`). | \`TA0043\` Reconnaissance |
| **2** | **التسليح (\`Weaponization\`)** | تجهيز الثغرات وتكييف البرمجية الخبيثة وإعداد رسائل التصيد المرفقة. | \`TA0042\` Resource Development |
| **3** | **الإيصال (\`Delivery\`)** | تسليم البرمجية الخبيثة للهدف (عبر بريد تصيد، رابط ويب، أو قرص USB) مع تجاوز الكشف. | \`TA0001\` Initial Access |
| **4** | **الاستغلال (\`Exploitation\`)** | تنفيذ البرمجية الخبيثة أو الحمولة بنجاح عبر ثغرة برمجية أو بشرية. | \`TA0002\` Execution |
| **5** | **التثبيت (\`Installation\`)** | تثبيت البرمجية وإخفاؤها وضمان دوامها (\`Persistence\`) ورفع صلاحياتها (\`pkexec\`). | \`TA0003\` Persistence / \`TA0004\` PrivEsc |
| **6** | **القيادة والتحكم (\`Command & Control - C2\`)** | اتصال البرمجية بالمهاجم لتلقي الأوامر عبر حركة تمتزج بالحركة العادية (\`HTTP/HTTPS/DNS/SSH\`). | \`TA0011\` Command and Control |
| **7** | **التسريب والأهداف (\`Actions on Objectives / Exfiltration\`)** | سحب البيانات الحساسة إلى الخارج أو تشفير الأنظمة للفدية أو تعطيلها. | \`TA0010\` Exfiltration / \`TA0040\` Impact |

### قواعد Snort/Suricata لكشف SYN Flood وحقن SQL وتصعيد الصلاحيات

\`\`\`snort
# 1. كشف هجوم إغراق SYN (SYN Flood DoS Attack)
alert tcp $EXTERNAL_NET any -> $HOME_NET $HTTP_PORTS (msg:"[DOS-SYNFLOOD] Possible TCP SYN Flood Attack Detected"; flags:S,12; flow:stateless; threshold:type both, track by_dst, count 200, seconds 5; classtype:attempted-dos; sid:3000301; rev:1;)

# 2. كشف عبور حدود الثقة عبر حقن SQL (SQL Injection Authentication Bypass)
alert tcp $EXTERNAL_NET any -> $HOME_NET $HTTP_PORTS (msg:"[EXPLOIT-SQLI] SQL Injection Trust Boundary Violation Attempt"; flow:to_server,established; content:"' OR '1'='1"; fast_pattern; nocase; http_uri; classtype:web-application-attack; sid:3000302; rev:2;)

# 3. كشف اتصال قناة القيادة والتحكم (Stage 6 C2 Beacon over Non-Standard HTTP)
alert http $HOME_NET any -> $EXTERNAL_NET any (msg:"[KILLCHAIN-C2] Suspicious Periodic Botnet C2 Heartbeat"; flow:to_server,established; content:"User-Agent: Mozilla/4.0 (compatible|3b| MSIE 6.0)"; http_header; classtype:trojan-activity; sid:3000303; rev:1;)
\`\`\``,
    images: [
      {
        prompt: 'Cyber kill chain 7 stages reconnaissance weaponization delivery exploitation installation C2 exfiltration, 16:9',
        caption: 'المراحل السبع لسلسلة الهجوم السيبراني (Lockheed Martin Cyber Kill Chain)',
        alt: 'Cyber kill chain 7 stages',
        seed: 3031,
        isAIGenerated: true,
      },
      {
        prompt: 'Phishing spear phishing whaling vs DDoS botnet SYN flood architecture, 16:9',
        caption: 'تكتيكات التصيد الموجه (Spear-Phishing) وشبكات البوتات في هجمات DDoS',
        alt: 'Phishing and DDoS botnet architecture',
        seed: 3032,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'التصيد الاحتيالي يستغل العنصر البشري ويتفرع إلى خمس فئات تتفاوت في دقة الاستهداف',
        subtitle: 'من البريد المزعج العام (SPAM) إلى التصيد الموجه (Spear Phishing) وصيد الحيتان (Whaling)',
        bullets: [
          'يشكل البريد المزعج (SPAM) نحو 85% من البريد العالمي، ويُعد التصيد أشهر وسائل إيصال البرمجيات الخبيثة.',
          'التصيد الموجه (Spear Phishing): حملة مفصلة لمنشأة بعينها تتضمن معلومات داخلية لتقليل الشك، ويقترن بصيد الحيتان (Whaling).',
          'Smishing (عبر رسائل SMS)، وVishing (عبر المكالمات الصوتية)، والتصيد عبر قنوات شخصية غير مرتبطة بالعمل.',
          'انتحال النطاق بالخطأ الإملائي (Typosquatting مثل gooogle.com) والمؤشرات الستة (وأهمها الاستعجال بمهلة قصيرة).',
        ],
        keyHighlight: 'طلب الإجراء العاجل بمهلة قصيرة هو جوهر رسالة التصيد، لأن الهجوم لا ينجح إلا إذا نفّذ الضحية الإجراء بيده قبل أن يدقق.',
        visualType: 'comparison',
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'هجمات حجب الخدمة (DoS/DDoS) تستهدف التوافر عبر استنزاف الموارد والشبكات البوتية',
        subtitle: 'تشريح إغراق SYN وإغراق ICMP وهجوم Smurf الانعكاسي',
        bullets: [
          'إغراق SYN (SYN Flood): إرسال رزم SYN تبدأ المصافحة الثلاثية ولا تكملها، ويعالج بآلية كوكيز SYN (SYN Cookies).',
          'إغراق ICMP (Ping Flood): إرسال طلبات صدى كثيفة لإنهاك الخادم، ويعالج بتحديد معدل الرزم (Rate Limiting).',
          'DDoS والشبكات البوتية (Botnets): آلاف الأجهزة المخترقة (حواسيب وIoT) تدار عبر خادم قيادة وتحكم (C2).',
          'هجوم Smurf الانعكاسي: تزوير عنوان الضحية كمصدر وإرسال ICMP إلى عنوان البث (Broadcast) لتنهال الردود على الضحية.',
        ],
        keyHighlight: 'عدد الطلبات المرتفع وحده لا يثبت وجود هجوم DoS؛ بل تفصل القرائن كالمصافحات غير المكتملة والردود على طلبات لم يرسلها الخادم.',
        visualType: 'architecture',
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'الاستغلال يعبر حدود الثقة ويمنح المهاجم تصعيداً للصلاحيات أو تنفيذاً للشيفرة عن بعد',
        subtitle: 'الفرق بين الاختراق والاستغلال وثغرات Zero-Day و pkexec',
        bullets: [
          'الاختراق (Intrusion): دخول غير مصرح به (قد يتم ببيانات مسروقة)، بينما الاستغلال (Exploitation) لحظة تنفيذ حمولة الثغرة.',
          'رفع الصلاحيات (Privilege Escalation): أفقي (من مستخدم لمستخدم) أو رأسي (من مستخدم لمدير مثل ثغرة CVE-2021-4034 في pkexec).',
          'تنفيذ الشيفرة عن بعد (RCE): أخطر المؤشرات لأنه يفتح جلسة أوامر إدارية للسيطرة الكاملة على الأصل.',
          'حدود الثقة (Trust Boundaries): تنشأ ثغرات حقن SQL من الوثوق الضمني بمدخلات المستخدم دون تنقية (Sanitization).',
        ],
        keyHighlight: 'مؤشر تنفيذ الشيفرة عن بعد (RCE) يفوق في خطورته مؤشر حجب الخدمة لأنه يمنح سيطرة شاملة على الأصل وبياناته.',
        visualType: 'flow',
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'سلسلة القتل السيبراني (Cyber Kill Chain) تحلل الهجوم عبر سبع مراحل متتابعة',
        subtitle: 'من الاستطلاع والتسليح إلى القيادة والتحكم وتسريب البيانات',
        bullets: [
          'المراحل 1-3 (ما قبل الاختراق): الاستطلاع (Recon)، التسليح (Weaponization)، والإيصال (Delivery عبر التصيد).',
          'المراحل 4-5 (الاختراق والبقاء): الاستغلال (Exploitation) والتثبيت (Installation & Persistence).',
          'المراحل 6-7 (السيطرة والأثر): القيادة والتحكم (C2) والتسريب وتحقيق الأهداف (Exfiltration & Actions on Objectives).',
          'قاعدة تحليلية: رصد مؤشر في أي مرحلة يوجب فحص جميع المراحل التي تليها لاحتمال وصول المهاجم إليها.',
        ],
        keyHighlight: 'كسر سلسلة القتل في المراحل المبكرة (الإيصال أو الاستغلال) يمنع تحرك المهاجم جانبياً ويحبط التسريب قبل وقوعه.',
        visualType: 'killchain',
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'الاحتواء الأولي يقطع مسارات التحرك الجانبي والـ C2 ويسبق إجراءات الإصلاح',
        subtitle: 'ترابط قرارات العزل الأولي والإبلاغ وحفظ الأدلة الرقمية',
        bullets: [
          'بعد مرحلة التثبيت، تحتاج البرمجية إلى الشبكة للتحرك الجانبي (Lateral Movement) وتنزيل حمولات المرحلة الثانية.',
          'العزل الأولي (Containment): فصل الأصل المتأثر عن الشبكة فوراً يقطع اتصال C2 ويترك المهاجم بلا سيطرة فعلية.',
          'الإبلاغ ومشاركة مؤشرات الاختراق (IoCs) يعين المختصين على كشف الإصابة في الأجهزة الأخرى.',
          'حفظ الأدلة (IPs، النطاقات، التجزئة، مفاتيح Registry) يسبق أي إعادة تهيئة أو إصلاح للنظام.',
        ],
        keyHighlight: 'الإصلاح دون عزل أولي يترك مسارات التحرك الجانبي وقنوات القيادة والتحكم مفتوحة أمام المهاجم.',
        visualType: 'snort',
      },
    ],
    flashcards: [
      {
        front: 'ما الفرق بين التصيد الموجه (Spear Phishing) وصيد الحيتان (Whaling)؟',
        back: 'التصيد الموجه حملة مفصلة تستهدف منشأة أو بيئة بعينها بمعلومات داخلية، بينما صيد الحيتان يستهدف تحديداً أصحاب المناصب العليا والقيادات التنفيذية في المنشأة.',
        category: 'التصيد الاحتيالي',
      },
      {
        front: 'ما هو انتحال النطاق بالخطأ الإملائي (Typosquatting)؟ اذكر مثالاً.',
        back: 'شراء وتسجيل نطاق قريب جداً من نطاق مشهور لجذب من يخطئون في كتابته لسرقة بياناتهم أو نشر برمجيات خبيثة، مثل تسجيل gooogle.com بثلاثة أحرف o.',
        category: 'الهندسة الاجتماعية',
      },
      {
        front: 'كيف يعمل هجوم إغراق SYN (SYN Flood) وما آلية الحد منه؟',
        back: 'يرسل المهاجم رزم SYN كثيرة تبدأ المصافحة الثلاثية في TCP ولا تكملها فيستنزف موارد الخادم؛ ويُحد منه بآلية كوكيز SYN (SYN Cookies) التي تؤجل ربط الحالة بالاتصال حتى تكتمل المصافحة.',
        category: 'حجب الخدمة DoS',
      },
      {
        front: 'كيف يميز محلل الأمن بين ذروة الاستخدام المشروعة وهجوم حجب الخدمة (DoS)؟',
        back: 'عبر القرائن المجتمعة: مصافحات TCP تبدأ ولا تكتمل، وبيانات غير متوقعة تسقط البرنامج، وتلقي الخادم ردوداً لطلبات لم يرسلها أصلاً بسبب تزوير عنوان المصدر.',
        category: 'تحليل الشبكات',
      },
      {
        front: 'ما الفرق بين رفع الصلاحيات الأفقي ورفع الصلاحيات الرأسي؟',
        back: 'الأفقي يمنح وصولاً مماثلاً لحساب مستخدم آخر من نفس المستوى، بينما الرأسي يمنح وصولاً أعلى (من مستخدم عادي إلى مدير/جذر، مثل ثغرة pkexec CVE-2021-4034).',
        category: 'الاستغلال',
      },
      {
        front: 'عدد مراحل سلسلة الهجوم السيبرانية السبعة (Cyber Kill Chain) بالترتيب.',
        back: '1) الاستطلاع، 2) التسليح، 3) الإيصال، 4) الاستغلال، 5) التثبيت، 6) القيادة والتحكم (C2)، 7) التسريب والأهداف.',
        category: 'Kill Chain',
      },
    ],
    miniQuiz: [
      {
        question: 'علم مهاجمون أن مديراً تنفيذياً في شركة مستهدفة يرتاد منتدى إلكترونياً لرياضة الإبحار الشراعي، فأنشؤوا حساباً فيه وراسلوه لاستدراج معلومات. ما تصنيف هذا الهجوم وفق جدول فئات التصيد في المقرر؟',
        options: [
          'التصيد عبر قنوات غير مرتبطة بالعمل',
          'التصيد الصوتي (Vishing)',
          'التصيد عبر الرسائل النصية القصيرة (Smishing)',
          'تسميم ذاكرة خادم أسماء النطاقات (DNS Poisoning)',
        ],
        correctIndex: 0,
        explanation: 'جمع معلومات أو استدراج الضحية عبر منتدى هوايات شخصي خارج بيئة العمل يُصنف في جدول 2.3 ضمن «التصيد عبر قنوات غير مرتبطة بالعمل».',
      },
      {
        question: 'في هجوم Smurf الكلاسيكي للحرمان من الخدمة الموزع (DDoS)، كيف يتم تضخيم الهجوم ضد الضحية؟',
        options: [
          'بإرسال طلب صدى ICMP بعنوان الضحية كمصدر مزور إلى عنوان البث (Broadcast) للشبكة الفرعية فترد جميع الأجهزة على الضحية',
          'بإرسال مستندات Word تحتوي على ماكرو Concept إلى البريد الإلكتروني للضحية',
          'بإدخال شرط SQL صحيح دائماً في صفحة تسجيل الدخول الخاصة بالضحية',
          'باستغلال ثغرة pkexec المحلية لرفع صلاحيات المستخدم إلى الجذر',
        ],
        correctIndex: 0,
        explanation: 'هجوم Smurf مثال على التضخيم الانعكاسي: يرسل المهاجم طلب صدى ICMP بعنوان الضحية كمصدر مزور موجهاً إلى عنوان البث (Broadcast)، فتغرق ردود جميع أجهزة الشبكة الفرعية جهاز الضحية.',
      },
      {
        question: 'أي من المؤشرات التالية يُعد الأشد خطراً عند تقييم درجة الخطر الأولية على الأصل المعلوماتي؟',
        options: [
          'مؤشر تنفيذ الشيفرة عن بعد (Remote Code Execution - RCE)',
          'ارتفاع طفيف في طلبات HTTP المكتملة وقت ذروة التسجيل الفصلي',
          'رسالة بريد إلكتروني إعلانية (SPAM) تم حجبها في مرشح البريد',
          'استعلام ping واحد من جهاز مسؤول الشبكة الداخلي',
        ],
        correctIndex: 0,
        explanation: 'أكد كتاب المقرر أن مؤشر تنفيذ الشيفرة عن بعد (RCE) من أخطر المؤشرات على الإطلاق لأنه يمنح المهاجم صلاحيات واسعة لتنفيذ أي تعليمات والسيطرة التامة على الأصل.',
      },
      {
        question: 'إذا رصد فريق الأمن مؤشراً يدل على أن برمجية خبيثة تحقن شيفرتها في عملية قائمة وتتصل بخادم خارجي لطلب تعليمات، ففي أي مرحلة من سلسلة الهجوم السيبرانية (Cyber Kill Chain) يقع هذا النشاط؟',
        options: [
          'المرحلة السادسة: القيادة والتحكم (Command & Control - C2) بعد إتمام التثبيت',
          'المرحلة الأولى: الاستطلاع السلبي (Passive Reconnaissance)',
          'المرحلة الثانية: التسليح (Weaponization) لدى المهاجم قبل الإرسال',
          'المرحلة الثالثة: الإيصال (Delivery) قبل فتح المرفق',
        ],
        correctIndex: 0,
        explanation: 'اتصال البرمجية الخبيثة بعد تثبيتها وحقنها في عملية قائمة بقناة خارجية لتلقي الأوامر والتعليمات يمثل المرحلة السادسة: القيادة والتحكم (C2)، ويستلزم العزل الفوري لقطع الاتصال.',
      },
    ],
    interactiveBook3D: {
      model3DType: 'kill_chain_fortress',
      shaderEffect: 'cyber_laser_scan',
      cameraPosition: { x: 0, y: 3.0, z: 6.5 },
      autoRotateSpeed: 1.0,
      primaryNeonColor: '#eab308',
      secondaryNeonColor: '#ef4444',
      pages3D: [
        {
          pageNumber: 1,
          type: 'overview',
          title: 'قلعة سلسلة القتل السيبراني السباعية (Cyber Kill Chain Fortress)',
          subtitle: 'تمثيل ثلاثي الأبعاد للمراحل السبع من الاستطلاع إلى التسريب',
          contentMarkdown: `### البوابات السبع لسلسلة الهجوم
يجسد المجسم ثلاثي الأبعاد مسار الهجوم عبر 7 حلقات متتالية صممتها **Lockheed Martin**:
1. **Reconnaissance** -> 2. **Weaponization** -> 3. **Delivery** -> 4. **Exploitation** -> 5. **Installation** -> 6. **C2** -> 7. **Exfiltration**.
- وضع حاجز دفاعي واحد في مرحلة الإيصال أو العزل الأولي قبل C2 يحطم السلسلة بالكامل.`,
          highlightedRuleOrFormula: 'Break_Kill_Chain(Stage_i) => Prevents(Stages_{i+1 .. 7})',
          interactiveTakeaway: 'تتبع شعاع الليزر عبر البوابات السبع وشاهد كيف يقطع العزل الأولي البوابة السادسة (C2).',
        },
        {
          pageNumber: 2,
          type: 'anatomy',
          title: 'تشريح التصيد الاحتيالي وحدود الثقة (Trust Boundaries)',
          subtitle: 'كيف يخترق المهاجم العنصر البشري وتطبيقات الويب',
          contentMarkdown: `### عبور حدود الثقة بطريقتين
- **بشرياً (Spear-Phishing & Whaling)**: انتحال صفة جهة رقابية أو نطاق مشابه (\`gooogle.com\`) مع عنصر الاستعجال لدفع الضحية لتنفيذ الكود.
- **برمجياً (SQL Injection)**: إدراج مدخلات غير منقاة تعبر خط الثقة وتجعل شرط المصادقة صحيحاً دائماً.`,
          highlightedRuleOrFormula: "SELECT * FROM users WHERE user='admin' AND pass='' OR '1'='1'",
          interactiveTakeaway: 'انقر على بوابة الإيصال وبوابة الاستغلال لمقارنة الخداع البشري بالاستغلال البرمجي.',
        },
        {
          pageNumber: 3,
          type: 'defense-lab',
          title: 'مختبر صد هجمات الحرمان من الخدمة (DoS / DDoS)',
          subtitle: 'محاكاة المصافحة الثلاثية في TCP وكوكيز SYN وتحديد معدل ICMP',
          contentMarkdown: `### التمييز بين ذروة الاستخدام والهجوم
- في **SYN Flood**، يمتلئ جدول الاتصالات نصف المفتوحة (\`SYN_RECV\`).
- تفعيل **SYN Cookies** يلغي حجز الذاكرة حتى يعود العميل برزمة \`ACK\` صحيحة.`,
          highlightedRuleOrFormula: 'sysctl -w net.ipv4.tcp_syncookies=1',
          interactiveTakeaway: 'راقب كيف تحافظ كوكيز SYN على توافر الخادم أمام آلاف الطلبات المزورة.',
        },
        {
          pageNumber: 4,
          type: 'case-study',
          title: 'دراسة حالة: استغلال pkexec (CVE-2021-4034) والعزل الأولي',
          subtitle: 'من رفع الصلاحيات الرأسي إلى قطع قناة القيادة والتحكم (C2)',
          contentMarkdown: `### لماذا يسبق الاحتواءُ الإصلاحَ دائماً؟
- بعد نجاح الاستغلال ورفع الصلاحيات الرأسي إلى \`root\`، تحاول البرمجية التحرك جانبياً والاتصال بخادم \`C2\`.
- فصل الأصل عن الشبكة فوراً يجهض المرحلتين 6 و 7 قبل وقوع تسريب البيانات.`,
          highlightedRuleOrFormula: 'Containment (Network Isolation) -> Evidence Preservation -> Remediation',
          interactiveTakeaway: 'تأكد من جمع عناوين IP والنطاقات وتجزئة الملفات قبل إعادة بناء النظام.',
        },
      ],
      stepByStep: [
        {
          stepNumber: 1,
          title: 'المرحلة 1 و 2: الاستطلاع والتسليح (Recon & Weaponization)',
          description: 'فحص المنافذ المفتوحة للهدف وجمع معلومات عن الموظفين، ثم تجهيز مستند مفخخ ونطاق تصيد مشابه (Typosquatting).',
          technicalDetail: 'تسجيل نطاق مشابه واستخدام معلومات داخلية لبناء حملة تصيد موجه (Spear Phishing).',
          visualCue: 'إضاءة البوابتين الأولى والثانية في قلعة Kill Chain باللون الأصفر التحذيري.',
          codeOrCommand: 'nmap -sV target.org &&prepare_macro_payload.py --domain gooogle-auth.com',
        },
        {
          stepNumber: 2,
          title: 'المرحلة 3: الإيصال عبر التصيد الموجه (Delivery)',
          description: 'إرسال بريد إلكتروني ينتحل جهة رقابية ويطلب إجراءً عاجلاً بمهلة قصيرة لدفع الموظف لفتح المرفق.',
          technicalDetail: 'تجاوز مرشحات البريد المزعج (SPAM) عبر استخدام حساب مخترق أو نطاق حديث التسجيل.',
          visualCue: 'عبور كبسولة البريد المخادعة للبوابة الثالثة نحو محطة عمل الموظف.',
          codeOrCommand: 'From: compliance@regu1ator-gov.sa | Subject: [عاجل خلال ساعتين] تحديث بيانات الامتثال',
        },
        {
          stepNumber: 3,
          title: 'المرحلة 4 و 5: الاستغلال والتثبيت ورفع الصلاحيات (Exploitation & Installation)',
          description: 'تنفيذ الحمولة واستغلال ثغرة محلية (مثل pkexec CVE-2021-4034) لرفع الصلاحيات رأسياً إلى مدير النظام (root).',
          technicalDetail: 'تثبيت باب خلفي وحقن شيفرة في عملية قائمة لضمان الدوام والبقاء في الخلفية.',
          visualCue: 'وميض أحمر في البوابتين الرابعة والخامسة مع ارتفاع مؤشر الصلاحيات من User إلى Root.',
          codeOrCommand: 'CVE-2021-4034 (pkexec) -> uid=0(root) gid=0(root) -> Persistence Installed',
        },
        {
          stepNumber: 4,
          title: 'المرحلة 6: القيادة والتحكم ومحاولة التحرك الجانبي (Command & Control - C2)',
          description: 'اتصال البرمجية الخبيثة بخادم المهاجم عبر حركة HTTP/DNS لطلب تعليمات المرحلة الثانية والتحرك جانبياً.',
          technicalDetail: 'رصد اتصالات دورية (Beaconing) من الجهاز المصاب إلى عنوان IP خارجي غير مألوف.',
          visualCue: 'انطلاق شعاع اتصال متقطع من البوابة السادسة نحو سحابة خادم C2 الخارجي.',
          codeOrCommand: 'alert http $HOME_NET any -> 198.51.100.200 any (msg:"C2 Beacon Detected"; sid:3000303;)',
        },
        {
          stepNumber: 5,
          title: 'كسر السلسلة قبل المرحلة 7: العزل الأولي وحفظ الأدلة (Containment & Forensics)',
          description: 'فصل الجهاز عن الشبكة فوراً لإحباط مرحلة التسريب (Exfiltration) مع حفظ الأدلة ومشاركة مؤشرات الاختراق.',
          technicalDetail: 'قطع اتصال الشبكة يوقف التحرك الجانبي واتصال C2 قبل إصلاح النظام.',
          visualCue: 'إغلاق البوابة السابعة بدرع فولاذي أزرق وانطفاء شعاع C2 الخبيث.',
          codeOrCommand: 'nmcli networking off && netstat -antp > /forensics/active_c2_connections.log',
        },
      ],
      hotspots: [
        {
          id: 'hs-ch3-spear-phishing',
          label: 'بوابة التصيد الموجه (Spear-Phishing & Whaling)',
          title: 'الهندسة الاجتماعية والمؤشرات الستة للرسائل الاحتيالية',
          x: -1.8,
          y: 1.4,
          z: 0.6,
          coordinates: { x: -1.8, y: 1.4, z: 0.6 },
          color: '#eab308',
          icon: 'AlertTriangle',
          summary: 'استدراج الضحية لتنفيذ الإجراء الضار بيده عبر الانتحال والاستعجال والنطاقات المشابهة.',
          detailedExplanation: 'يمثل التصيد الموجه المرحلة الثالثة (الإيصال) في سلسلة الهجوم؛ حيث يستغل معلومات داخلية أو ينتحل شخصية قيادية أو رقابية مع مهلة زمنية ضيقة تدفع المتلقي للنقر قبل التحقق.',
          mitreTactic: 'TA0001 - Initial Access (T1566.001 Spearphishing Attachment)',
          defensiveControl: 'التوعية الأمنية المستمرة، وبروتوكولات SPF/DKIM/DMARC، والتحقق عبر قناة اتصال مستقلة.',
        },
        {
          id: 'hs-ch3-ddos-syn',
          label: 'مصفوفة إغراق SYN و DDoS',
          title: 'استنزاف المصافحة الثلاثية في TCP والشبكات البوتية (Botnets)',
          x: 1.8,
          y: 1.4,
          z: 0.6,
          coordinates: { x: 1.8, y: 1.4, z: 0.6 },
          color: '#ef4444',
          icon: 'Radio',
          summary: 'إغراق الخادم بطلبات مصافحة غير مكتملة أو ردود ICMP مضخمة من آلاف الأجهزة المخترقة.',
          detailedExplanation: 'في هجوم SYN Flood، يستغل المهاجم التفاوت بين سهولة إرسال رزمة SYN وكلفة تخصيص الموارد لدى الخادم. أما في DDoS فتشترك آلاف أجهزة Botnet لإسقاط الخدمة وتهديد التوافر.',
          mitreTactic: 'TA0040 - Impact (T1498 Network Denial of Service)',
          defensiveControl: 'تفعيل SYN Cookies، وتحديد معدل ICMP (Rate Limiting)، وخدمات تنظيف الحركة (DDoS Scrubbing).',
        },
        {
          id: 'hs-ch3-privesc-rce',
          label: 'عقدة الاستغلال ورفع الصلاحيات (RCE & PrivEsc)',
          title: 'عبور حدود الثقة وتنفيذ الشيفرة عن بعد وتصعيد الامتيازات',
          x: -1.5,
          y: -1.2,
          z: 0.9,
          coordinates: { x: -1.5, y: -1.2, z: 0.9 },
          color: '#a855f7',
          icon: 'Terminal',
          summary: 'الانتقال من مدخل غير موثوق أو مستخدم عادي إلى صلاحيات الجذر (Root/SYSTEM).',
          detailedExplanation: 'عند عبور حدود الثقة دون تنقية المدخلات (مثل حقن SQL) أو استغلال ثغرة محلية (مثل pkexec CVE-2021-4034)، يحصل المهاجم على تصعيد رأسي للصلاحيات أو تنفيذ شيفرة عن بعد (RCE).',
          mitreTactic: 'TA0004 - Privilege Escalation (T1068 Exploitation for Privilege Escalation)',
          defensiveControl: 'تنقية المدخلات (Parameterized Queries)، والترقيع الفوري للثغرات، وتطبيق مبدأ أقل الامتيازات.',
        },
        {
          id: 'hs-ch3-killchain-c2',
          label: 'مفصل القيادة والتحكم والعزل (C2 & Containment)',
          title: 'كسر سلسلة القتل السيبراني في المرحلة السادسة قبل التسريب',
          x: 1.5,
          y: -1.2,
          z: 0.9,
          coordinates: { x: 1.5, y: -1.2, z: 0.9 },
          color: '#10b981',
          icon: 'ShieldCheck',
          summary: 'فصل الأصل المصاب عن الشبكة يقطع قناة الأوامر والتحرك الجانبي ويمنع سرقة البيانات.',
          detailedExplanation: 'تعتمد البرمجية الخبيثة بعد التثبيت على الاتصال بخادم القيادة والتحكم (C2) عبر بروتوكولات شائعة (HTTP/DNS). العزل الأولي الفوري يقطع هذا الشريان قبل أن يبدأ المهاجم المرحلة السابعة (التسريب).',
          mitreTactic: 'TA0011 - Command and Control / TA0010 - Exfiltration',
          defensiveControl: 'العزل الشبكي الفوري للأصل المصاب، مراقبة DNS/HTTP الخارجة، ومشاركة مؤشرات الاختراق IoCs.',
        },
      ],
    },
    richData: {
      id: 303,
      chapter_number: 3,
      title: 'الهندسة الاجتماعية، التصيد، حجب الخدمة، وسلسلة القتل السيبراني',
      subtitle: 'تشريح Phishing/Spear-Phishing، هجمات DoS/DDoS، الاستغلال، ومراحل Kill Chain السبع',
      category: 'شبكات',
      pdfStartPage: 17,
      pdfEndPage: 24,
      description: 'يستعرض هذا الفصل الفئات الخمس للتصيد الاحتيالي ومؤشراته الستة، آليات هجمات الحرمان من الخدمة (DoS/DDoS) والتمييز بينها وبين الحمل المشروع، الاستغلال ورفع الصلاحيات، وسلسلة الهجوم السيبرانية السباعية.',
      objectives: [
        'التمييز بين الفئات الخمس للتصيد الاحتيالي واستخراج المؤشرات الستة من الرسائل المشتبه بها',
        'شرح آليات SYN Flood وICMP Flood وهجوم Smurf وكيفية تمييزها عن ذروة الاستخدام المشروعة',
        'التفريق بين الاختراق والاستغلال ورفع الصلاحيات الأفقي والرأسي وحدود الثقة',
        'تحليل الهجمات وفق المراحل السبع لسلسلة الهجوم السيبرانية (Cyber Kill Chain) واتخاذ قرار العزل الأولي',
      ],
      sections: [
        {
          heading: '1. التصيد الاحتيالي (Phishing) وفئاته الخمس',
          content: 'يشمل التصيد الموجه (Spear Phishing)، صيد الحيتان (Whaling)، التصيد النصي (Smishing)، التصيد الصوتي (Vishing)، والتصيد عبر قنوات غير مرتبطة بالعمل. ويعتمد على الانتحال والاستعجال والنطاقات المشابهة (Typosquatting).',
        },
        {
          heading: '2. هجمات الحرمان من الخدمة (DoS/DDoS) والحمل المشروع',
          content: 'تستهدف التوافر عبر إغراق SYN أو ICMP أو تجاوز سعة الذاكرة المؤقتة أو شبكات Botnet. وتُميّز عن الحمل المشروع بالقرائن: مصافحات غير مكتملة، بيانات تسقط البرنامج، وردود لطلبات لم يرسلها الخادم.',
        },
        {
          heading: '3. الاستغلال وسلسلة الهجوم السيبرانية (Cyber Kill Chain)',
          content: 'تتكون سلسلة الهجوم من 7 مراحل: الاستطلاع، التسليح، الإيصال، الاستغلال، التثبيت، القيادة والتحكم (C2)، والتسريب والأهداف. ويُتخذ قرار العزل الأولي لقطع مسار التحرك الجانبي والـ C2 قبل الإصلاح.',
        },
      ],
      tables: [
        {
          title: 'جدول 2.4: أشكال هجمات الحرمان من الخدمة ووسائل الحد منها',
          headers: ['الشكل', 'آلية العمل', 'وسيلة الحد منه'],
          rows: [
            ['إغراق SYN (SYN Flood)', 'إرسال رزم SYN كثيرة تبدأ المصافحة ولا تكملها فيستنزف الخادم موارده', 'كوكيز SYN (SYN Cookies) لتأجيل ربط الحالة حتى تكتمل المصافحة'],
            ['إغراق ICMP (ICMP Flood)', 'إرسال طلبات صدى Ping كثيفة لإنهاك الخادم', 'تحديد معدل رزم ICMP على الخادم'],
            ['تجاوز سعة الذاكرة المؤقتة', 'إرسال بيانات أكبر من سعة Buffer لإسقاط البرنامج', 'معالجة البيانات غير المتوقعة والتحقق من حدود المدخلات'],
          ],
        },
        {
          title: 'جدول 2.5: مراحل سلسلة الهجوم السيبرانية (Cyber Kill Chain)',
          headers: ['المرحلة', 'ما يحدث فيها'],
          rows: [
            ['1. الاستطلاع (Recon)', 'جمع المعلومات سلبياً من المصادر العامة أو نشطاً بفحص المنافذ والثغرات'],
            ['2. التسليح (Weaponization)', 'تجهيز الثغرات وتكييف البرمجية الخبيثة وإعداد رسائل التصيد'],
            ['3. الإيصال (Delivery)', 'تسليم البرمجية الخبيثة للهدف مع تجاوز أنظمة الكشف'],
            ['4. الاستغلال (Exploitation)', 'تنفيذ البرمجية الخبيثة أو الحمولة بنجاح'],
            ['5. التثبيت (Installation)', 'تثبيت البرمجية وإخفاؤها وضمان دوامها ورفع صلاحياتها'],
            ['6. القيادة والتحكم (C2)', 'اتصال البرمجية بالمهاجم لتلقي الأوامر عبر حركة تمتزج بالحركة العادية'],
            ['7. التسريب والأهداف (Exfiltration)', 'سحب البيانات أو تعطيل الأنظمة أو إساءة استعمالها'],
          ],
        },
      ],
      commonMistake: {
        mistake: 'الوثوق برسالة بريد لمجرد صدورها من حساب حقيقي، أو الحكم بوجود هجوم DoS لمجرد ارتفاع عدد الطلبات.',
        fix: 'المهاجمون قد يستعملون بيانات دخول مسروقة لإرسال رسائل تصيد من حسابات حقيقية، وارتفاع الطلبات قد يكون ذروة استخدام مشروعة فلا يُحكم بالهجوم إلا بالقرائن التقنية.',
      },
      solvedExample: {
        title: 'تتبع هجوم مركب عبر مراحل سلسلة الهجوم السيبرانية السبع',
        given: 'رصد فريق الأمن رسالة بريد تنتحل جهة رقابية وصلت لموظف، تلاها تنفيذ أمر غير مألوف واتصال خارجي دوري من جهاز الموظف.',
        steps: [
          '1. الرسالة الاحتيالية تمثل المرحلة 3 (الإيصال Delivery)، مما يعني أن المرحلتين 1 (الاستطلاع) و2 (التسليح) قد تمتا سلفاً.',
          '2. تنفيذ الأمر يمثل المرحلة 4 (الاستغلال) والمرحلة 5 (التثبيت).',
          '3. الاتصال الخارجي الدوري يمثل المرحلة 6 (القيادة والتحكم C2).',
          '4. الإجراء الفوري: عزل الجهاز أولياً لقطع المرحلة 6 ومنع الوصول إلى المرحلة 7 (التسريب Exfiltration)، مع فحص سجلات الشبكة للتحقق من عدم خروج بيانات.',
        ],
        result: 'إحباط الهجوم في المرحلة السادسة قبل تسريب البيانات وحصر الإصابة في جهاز واحد.',
        whyItMatters: 'تحديد موضع المؤشر في سلسلة الهجوم يوجه المحلل لفحص المراحل اللاحقة واتخاذ قرار العزل في الوقت المناسب.',
      },
      selfAssessment: [
        {
          question: 'علّل: لماذا لا يكفي عدد الطلبات وحده للتمييز بين الحمل المشروع وهجوم الحرمان من الخدمة؟',
          answer: 'لأن كليهما يرفع العدد، والتمييز يحتاج قرائن مجتمعة: المصافحات غير المكتملة، والبيانات غير المتوقعة التي تسقط البرنامج، والردود على طلبات لم يرسلها الخادم.',
        },
        {
          question: 'علّل: لماذا يُعدّ الاحتواء الأولي خطوة سابقة لإصلاح النظام؟',
          answer: 'لأن البرمجية بعد التثبيت تتحرك جانبياً وتنزّل حمولات وتتلقى أوامر عبر الشبكة، والإصلاح دون عزل يترك هذه المسارات مفتوحة.',
        },
      ],
    },
    updated_at: COURSE_TIMESTAMP,
  },

  // =========================================================================
  // الفصل الرابع: التهديدات الداخلية والخارجية ونموذج المصادقة والتفويض والمحاسبة (AAA Model)
  // =========================================================================
  {
    id: 304,
    chapter_number: 4,
    title: 'التهديدات الداخلية والخارجية ونموذج المصادقة والتفويض والمحاسبة (AAA Model)',
    subtitle: 'الخطر السياقي الداخلي، أقل الامتيازات، فصل المهام، التحقق متعدد العوامل (MFA)، ومقارنة أدوات الوقاية والكشف والاستجابة',
    description: 'دراسة تفصيلية للتهديدات الداخلية (الموظف، المقاول، الحساب الخدمي، الخطأ غير المقصود مقابل السلوك المتعمد) والتهديدات الخارجية (الهواة، الناشطون، الجريمة المنظمة، APT)، وتطبيق منظومة AAA (المصادقة، التفويض، المحاسبة)، أقل الامتيازات، فصل المهام، إدارة دورة حياة الحساب، وسلسلة الثقة في العمل عن بعد.',
    category: 'هويات وضوابط AAA',
    difficulty: 'intermediate',
    pdfStartPage: 25,
    pdfEndPage: 31,
    diagramKey: 'ise232-threats-4',
    diagramConfig: {
      key: 'ise232-threats-4',
      title: 'نموذج المصادقة والتفويض والمحاسبة (AAA Model) ومكافحة التهديدات الداخلية والخارجية',
      svgType: 'AAA_Flow',
      nodes: ['المصادقة (Authentication / MFA)', 'التفويض (Authorization / Least Privilege)', 'المحاسبة (Accounting / Audit Logs)', 'فصل المهام (SoD)'],
      accentColor: '#10b981',
    },
    videoUrl: 'https://www.youtube.com/watch?v=QzX2gN7YbW0',
    videoDuration: '17:50',
    presentationUrl: '/presentations/ise232-threats-ch4.pdf',
    keyTopics: [
      'التهديد الداخلي بوصفه خطراً سياقياً وفئات الداخل الثلاث (الموظف، المقاول، الحساب الخدمي)',
      'الخطأ غير المقصود مقابل السلوك المتعمد ودوافع التهديد الداخلي دون تنميط الأفراد',
      'نموذج AAA: المصادقة (Authentication)، التفويض (Authorization)، المحاسبة (Accounting)',
      'مبدأ أقل الامتيازات (Least Privilege) وقوائم التحكم في الوصول (ACL)',
      'فصل المهام (Separation of Duties - SoD) وإدارة دورة حياة الحساب ومراجعة الصلاحيات الدورية',
      'التحقق متعدد العوامل (MFA): شيء تعرفه، شيء تملكه (Key fob/OTP)، وشيء هو جزء منك (بصمة حيوية)',
      'سجلات التدقيق (Audit Logs) وموازنة الخصوصية وحفظ الأدلة وعدم الاتهام المبكر',
      'تحليل سجلات الوصول العملية (التمييز بين خطأ كلمة المرور الصباحي وتصدير قاعدة البيانات ليلاً)',
      'مصادر التهديد الخارجي والهندسة الاجتماعية كصلة بين الداخل والخارج',
      'مقارنة أدوات الوقاية (التشفير ومكافح Malware) والكشف (IDS) والاستجابة (النسخ الاحتياطية)',
      'سلسلة الثقة في العمل عن بعد (Chain of Trust in Remote Work)',
    ],
    content: `## 4.1 التهديدات من الداخل: الأسس والخطر السياقي

تنشأ **التهديدات الداخلية (Insider Threats)** من بيئة المؤسسة نفسها، وتكتسب خطورتها من كونها **خطراً سياقياً** يرتبط بكيانات مصرح لها مسبقاً بالعمل داخل النظام. ويشمل «الداخل» ثلاث فئات رئيسة:
1. **الموظف بدوام كامل (Full-time Employee)**: يمتلك وصولاً يومياً لأنظمة العمل.
2. **المقاول أو المتعاقد (Contractor)**: يُستقطب لمهام محددة ومؤقتة.
3. **الحساب الخدمي (Service Account)**: يُنشأ لتشغيل عمليات برمجية آلية بين الأنظمة (مثل حساب النسخ الاحتياطي الذي يمتلك صلاحيات قراءة واسعة).

### مقارنة بين الخطأ غير المقصود والسلوك المتعمد

| وجه المقارنة | الخطأ غير المقصود (Unintentional Error) | السلوك المتعمد (Intentional Malicious Behavior) |
| :--- | :--- | :--- |
| **السبب والدافع** | غياب الوعي أو نقص الاستعداد والتدريب الكافي | تحقيق مكاسب مالية شخصية أو التصرف بدافع الخبث والانتقام |
| **الأثر على النظام** | قد يؤدي إلى فشل النظام أو كشف البيانات كأثر غير مقصود | إضرار متعمد بالنظام أو سرقة وتسريب قواعد البيانات |
| **مثال واقعي من المقرر** | موظف يحذف مجلداً مشتركاً بالخطأ معتقداً أنه نسخة محلية | موظف ينسخ ملفات تسعير سرية قبل استقالته أو يبيع بيانات عملاء لمنافس |

> [!warning]
> **خطأ شائع**: افتراض أن كل تهديد داخلي متعمد، أو تنميط الأفراد شخصياً. والصحيح أن كثيراً من الحوادث تقع بسبب غياب الوعي، وأن التعامل مع الدوافع يعتمد على سياسات الموارد البشرية (HR) والضوابط الإدارية لا على الظنون.

---

## 4.2 الوقاية بنموذج المصادقة والتفويض والمحاسبة (AAA Model)

تندرج الضوابط الوقائية والرقابية ضد التهديدات الداخلية تحت **نموذج AAA**:

| ركيزة AAA | الوظيفة الجوهرية | المبادئ والآليات التطبيقية في المقرر |
| :--- | :--- | :--- |
| **1. المصادقة (\`Authentication\`)** | تأكيد هوية المستخدم أو الكيان قبل منحه حق الدخول | **التحقق متعدد العوامل (\`MFA\`)** بدمج فئتين أو أكثر: **شيء يعرفه** (كلمة مرور)، **شيء يملكه** (\`Key fob\` / رمز \`OTP\`)، **شيء هو جزء منه** (الخصائص الحيوية كبصمة الأصابع). |
| **2. التفويض (\`Authorization\`)** | تحديد ما يحق للكيان المصادق عليه فعله والموارد المسموح له بالوصول إليها | **مبدأ أقل الامتيازات (\`Least Privilege\`)** عبر قوائم التحكم في الوصول (\`ACL\`)، **فصل المهام (\`Separation of Duties\`)**، و**إدارة دورة حياة الحساب ومراجعة الصلاحيات الدورية** عند انتقال الموظف بين الأقسام. |
| **3. المحاسبة (\`Accounting\`)** | تتبع استخدام الموارد وتسجيل كل إجراء ووقت الدخول والملفات المفتوحة | **سجلات التدقيق (\`Audit Logs\`)**، مراقبة السلوك ضمن سياسة معلنة، **حفظ الأدلة وعدم الاتهام المبكر**، و**الإبلاغ الداخلي الآمن** مع موازنة الخصوصية الشخصية للموظفين. |

### تطبيق متكامل على سجل وصول (من كتاب المقرر صفحة 27)

\`\`\`log
السجل 1: User: Ahmed  | Action: Failed Login    | Time: 08:05 AM | Reason: Bad Password
السجل 2: User: Ahmed  | Action: Failed Login    | Time: 08:06 AM | Reason: Bad Password
السجل 3: User: Ahmed  | Action: Success Login   | Time: 08:07 AM
# التحليل: يُقرأ هذا السجل على أنه خطأ غير مقصود في إدخال كلمة المرور صباحاً لبداية الدوام.

السجل 4: User: Khalid | Action: Export Database | Time: 02:30 AM | IP: External
# التحليل: يُقرأ كمؤشر سلوك يحتاج مراجعة فورية، نظراً لتصدير قاعدة بيانات في وقت متأخر (02:30 فجراً) ومن عنوان خارجي!
\`\`\`

---

## 4.3 التهديدات من الخارج وضوابط الوقاية والكشف والاستجابة

تتنوع مصادر التهديد الخارجي بين **المخترقين المبتدئين (\`Script Kiddies\`)**، و**الناشطين السيبرانيين (\`Hacktivists\`)**، و**الجريمة المنظمة (\`Organized Crime\`)**، و**التهديد المتقدم المستمر (\`APT\`)**. وتعمل **الهندسة الاجتماعية** كصلة وصل خطيرة بين الخارج والداخل؛ إذ يدفع المهاجم الخارجي المستخدمَ الداخلي غير المستعد لتنفيذ برمجية خبيثة عبر بريد جماعي منتحل.

### مقارنة أدوات الوقاية والكشف والاستجابة (جدول 3.1 في المقرر)

| نوع الضابط | الأداة التقنية | الوظيفة الدقيقة في مواجهة الهجمات |
| :--- | :--- | :--- |
| **الوقاية (\`Prevention\`)** | برامج مكافحة البرمجيات الخبيثة (\`Anti-Malware\`) و**التشفير (\`Encryption\`)** | تصفية طلبات التنزيل لمنع وصول البرمجيات الضارة، وإخفاء البيانات بالتشفير لجعلها عديمة الفائدة للمهاجمين الذين لا يملكون المفتاح حتى لو وصلوا إليها. |
| **الكشف (\`Detection\`)** | أنظمة كشف التسلل (\`IDS\`) ومراقبة السجلات | مراقبة حركة مرور الشبكة لاكتشاف الأنماط النشطة للبرمجيات الخبيثة والانحرافات السلوكية. |
| **الاستجابة (\`Response\`)** | **النسخ الاحتياطية (\`Backups\`)** | استعادة البيانات بسرعة بعد الهجوم (خاصة الهجمات الإتلافية والفدية) لضمان استمرارية العمل. |

### قواعد Snort/Suricata لرصد التهديدات الداخلية وتصدير قواعد البيانات في أوقات غير معتادة

\`\`\`snort
# 1. كشف تصدير ضخم لقاعدة البيانات من عنوان خارجي أو في غير ساعات الدوام (Insider / Compromised Account)
alert tcp $HOME_NET 3306 -> $EXTERNAL_NET any (msg:"[INSIDER-EXFIL] Large Database Export to External IP Detected"; flow:from_server,established; dsize:>4000; threshold:type both, track by_src, count 50, seconds 10; classtype:policy-violation; sid:4000401; rev:1;)

# 2. كشف محاولة حساب خدمي (Service Account) تنفيذ أوامر تفاعلية خارج نطاقه
alert tcp $HOME_NET any -> $HOME_NET 445 (msg:"[AAA-VIOLATION] Service Account Interactive SMB Admin Share Access"; flow:to_server,established; content:"svc_backup"; content:"ADMIN$"; classtype:privilege-gain; sid:4000402; rev:1;)
\`\`\``,
    images: [
      {
        prompt: 'AAA authentication authorization accounting model least privilege separation of duties MFA, 16:9',
        caption: 'نموذج الحماية الثلاثي (AAA) ومبادئ أقل الامتيازات وفصل المهام والتحقق متعدد العوامل',
        alt: 'AAA model and insider threat controls',
        seed: 3041,
        isAIGenerated: true,
      },
      {
        prompt: 'Insider threat audit logging vs external threat actors prevention detection response matrix, 16:9',
        caption: 'تحليل سجلات التدقيق وتكامل أدوات الوقاية والكشف والاستجابة',
        alt: 'Audit logging and security controls matrix',
        seed: 3042,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'التهديد الداخلي يمثل خطراً سياقياً ينبع من الموظفين والمقاولين والحسابات الخدمية',
        subtitle: 'التمييز بين الخطأ غير المقصود والسلوك المتعمد دون تنميط الأفراد',
        bullets: [
          'فئات الداخل المصرح لها: الموظف بدوام كامل، المقاول لمهام محددة، والحساب الخدمي للعمليات الآلية (كالنسخ الاحتياطي).',
          'الخطأ غير المقصود ينتج عن نقص الوعي والتدريب (مثل حذف مجلد مشترك بالخطأ).',
          'السلوك المتعمد ينفذ بدافع الكسب المالي أو الخبث (مثل نسخ ملفات تسعير سرية قبل الاستقالة).',
          'يُعالج التهديد الداخلي عبر سياسات الموارد البشرية (HR) والضوابط الإدارية والتقنية دون تنميط شخصي للموظفين.',
        ],
        keyHighlight: 'الحساب الخدمي (Service Account) ذو الصلاحيات الواسعة يمثل خطراً سياقياً جسيماً إذا أُسيء استخدامه أو تم اختراقه.',
        visualType: 'architecture',
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'نموذج AAA يضبط الهوية والصلاحيات والمساءلة عبر المصادقة والتفويض والمحاسبة',
        subtitle: 'تطبيق MFA وأقل الامتيازات وفصل المهام وإدارة دورة حياة الحساب',
        bullets: [
          'المصادقة (Authentication) عبر MFA: شيء تعرفه (كلمة مرور) + شيء تملكه (Key fob) + شيء هو جزء منك (بصمة).',
          'التفويض (Authorization): تطبيق مبدأ أقل الامتيازات (Least Privilege) عبر قوائم التحكم في الوصول (ACL).',
          'فصل المهام (Separation of Duties): توزيع خطوات العملية الحساسة (كالموافقة على الشراء وصرف المبلغ) على أكثر من شخص.',
          'مراجعة الصلاحيات الدورية: سحب صلاحيات القسم السابق فوراً عند انتقال الموظف إلى قسم جديد.',
        ],
        keyHighlight: 'منح صلاحيات دائمة لتسهيل العمل خطأ شائع يؤدي إلى تراكم الامتيازات وانكشاف البيانات عند انتهاء الحاجة إليها.',
        visualType: 'flow',
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'المحاسبة وسجلات التدقيق تحفظ الأدلة القاطعة وتمنع الاتهام المبكر وتحمي الخصوصية',
        subtitle: 'قراءة مؤشرات السلوك في السجلات وتفعيل الإبلاغ الداخلي الآمن',
        bullets: [
          'تتبع المحاسبة (Accounting) وقت الدخول والملفات المفتوحة ومدة استخدام الخدمات بدقة.',
          'موازنة الخصوصية: جمع البيانات الضرورية للأمن دون تسجيل محتوى الرسائل الشخصية غير المرتبطة بالعمل.',
          'حفظ الأدلة وعدم الاتهام المبكر: تقييم البلاغات بناءً على أدلة السجلات التقنية القاطعة لا الافتراضات.',
          'تمييز السجلات: محاولتان فاشلتان صباحاً تليها محاولة ناجحة = خطأ عارض | تصدير قاعدة بيانات 2:30 فجراً من IP خارجي = مؤشر خطر.',
        ],
        keyHighlight: 'مراقبة السلوك تتم دائماً ضمن سياسة معلنة وواضحة لجميع الموظفين بإشراف مشترك مع الموارد البشرية.',
        visualType: 'matrix',
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'الهندسة الاجتماعية تربط التهديد الخارجي بالمستخدم الداخلي لتجاوز الحواجز التقنية',
        subtitle: 'من المبتدئين والناشطين إلى الجريمة المنظمة و APTs',
        bullets: [
          'مصادر الخارج: المبتدئون (أدوات جاهزة)، الناشطون (دوافع سياسية)، الجريمة المنظمة (المال)، وAPT (موارد دول).',
          'لا يحتاج المهاجم الخارجي للتواصل الشخصي المباشر، بل يستعمل البريد الجماعي الخادع لدفع الموظف لتشغيل Malware.',
          'التوعية الأمنية الموجهة (User Awareness) مكون حاسم لتحصين المستخدمين ضد أساليب الخداع والانتحال.',
          'سلسلة الثقة في العمل عن بعد: حماية جهاز المنزل تقنياً + تدريب الموظف إدارياً على عدم مشاركته مع العائلة.',
        ],
        keyHighlight: 'تكون الضوابط التقنية في العمل عن بعد قوية بقدر قوة الضوابط الإدارية والمادية التي تدعمها في بيئة الموظف.',
        visualType: 'comparison',
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'تكامل أدوات الوقاية والكشف والاستجابة يحمي الأصول قبل الهجوم وأثناءه وبعده',
        subtitle: 'مكافحات البرمجيات والتشفير (وقاية)، IDS (كشف)، والنسخ الاحتياطية (استجابة)',
        bullets: [
          'أدوات الوقاية: مكافحة البرمجيات الخبيثة لتصفية التنزيلات، والتشفير لجعل البيانات عديمة الفائدة للمهاجم بلا مفتاح.',
          'أدوات الكشف: أنظمة كشف التسلل (IDS) لمراقبة حركة الشبكة ورصد الأنماط النشطة للبرمجيات الخبيثة.',
          'أدوات الاستجابة: النسخ الاحتياطية (Backups) لاستعادة البيانات بسرعة وضمان استمرارية العمل بعد الهجوم.',
          'اجتماع الضوابط المادية والإدارية والتقنية يشكل خطة أمنية شاملة تحمي أصول المنشأة بكفاءة.',
        ],
        keyHighlight: 'التشفير يحمي السرية حتى لو سُرقت البيانات، والنسخ الاحتياطية تحمي التوافر حتى لو شُفرت الأنظمة الأصلية.',
        visualType: 'snort',
      },
    ],
    flashcards: [
      {
        front: 'ما الفئات الثلاث التي تشكل الكيانات المصرح لها في بيئة التهديد الداخلي؟',
        back: '1) الموظف بدوام كامل، 2) المقاول المستقطب لمهام محددة، 3) الحساب الخدمي (Service Account) المنشأ لتشغيل عمليات آلية بين الأنظمة.',
        category: 'التهديد الداخلي',
      },
      {
        front: 'ما هي الفئات الثلاث التي يعتمد عليها التحقق متعدد العوامل (MFA)؟',
        back: '1) شيء يعرفه المستخدم (مثل كلمة المرور)، 2) شيء يمتلكه (مثل مفتاح أمان مادي Key fob أو رمز OTP)، 3) شيء هو جزء منه كخصائصه الحيوية (مثل بصمات الأصابع).',
        category: 'نموذج AAA',
      },
      {
        front: 'ما الفرق بين مبدأ أقل الامتيازات (Least Privilege) ومبدأ فصل المهام (Separation of Duties)؟',
        back: 'أقل الامتيازات يقيد وصول الكيان عبر ACL بالقدر الذي يحتاجه فقط لأداء عمله، بينما فصل المهام يوزع خطوات العملية الحساسة على أكثر من شخص لمنع انفراد شخص واحد بالسيطرة الكاملة.',
        category: 'الضوابط الإدارية والتقنية',
      },
      {
        front: 'كيف يساهم مبدأ المحاسبة (Accounting) في حفظ الأدلة وعدم الاتهام المبكر؟',
        back: 'يوفر سجلاً قاطعاً يثبت الأفعال التي تمت وتوقيتها الفعلي، مما يتيح تقييم البلاغات بعدالة ومهنية بناءً على الأدلة التقنية بدلاً من الظنون والافتراضات.',
        category: 'المحاسبة والتدقيق',
      },
      {
        front: 'قارن بين وظيفة التشفير ووظيفة النسخ الاحتياطية في مصفوفة الوقاية والاستجابة.',
        back: 'التشفير أداة وقائية تخفي البيانات وتجعلها عديمة الفائدة للمهاجم الذي لا يملك المفتاح، بينما النسخ الاحتياطية أداة استجابة تتيح استعادة سريعة للبيانات عند تعرض النظام للإتلاف.',
        category: 'الوقاية والاستجابة',
      },
      {
        front: 'ما المقصود بسلسلة الثقة في العمل عن بعد (Chain of Trust in Remote Work)؟',
        back: 'تكامل الضوابط التقنية (حماية حاسوب الموظف بمكافح برمجيات خبيثة) والضوابط الإدارية والمادية (تدريب الموظف على عدم مشاركة حاسوب العمل مع أفراد عائلته) لمنع استغلاله كمنفذ خارجي.',
        category: 'العمل عن بعد',
      },
    ],
    miniQuiz: [
      {
        question: 'انتقل موظف في شركة من قسم المحاسبة إلى قسم المبيعات، فقام مسؤول النظام بتعديل صلاحيات حسابه فوراً وإزالة صلاحياته السابقة على الأنظمة المالية. ما الممارسة الأمنية التي طبّقها المسؤول؟',
        options: [
          'إدارة دورة حياة الحساب ومراجعة الصلاحيات الدورية',
          'فحص الشبكة الاستطلاعي بأداة Nmap',
          'التشفير غير المتماثل لمفاتيح الفدية',
          'إغراق الخادم بطلبات صدى ICMP',
        ],
        correctIndex: 0,
        explanation: 'تعديل صلاحيات الموظف عند انتقاله بين الأقسام وإزالة صلاحياته السابقة غير اللازمة لدوره الجديد هو تطبيق مباشر لإدارة دورة حياة الحساب ومراجعة الصلاحيات الدورية ومبدأ أقل الامتيازات.',
      },
      {
        question: 'عند مراجعة سجل الوصول، ظهر السجل التالي: (User: Khalid | Action: Export Database | Time: 02:30 AM | IP: External). كيف يُفسّر هذا السجل أمنياً؟',
        options: [
          'مؤشر سلوك يحتاج مراجعة فورية نظراً لتصدير قاعدة بيانات في وقت متأخر ومن عنوان خارجي',
          'خطأ غير مقصود في كتابة كلمة المرور الصباحية المعتادة',
          'تحديث آلي روتيني لتعريفات مضاد الفيروسات المحلي',
          'فشل في بطاقة الشبكة المادية لجهاز الموظف الداخلي',
        ],
        correctIndex: 0,
        explanation: 'أورد كتاب المقرر هذا المثال نصاً ليبين أن تصدير قاعدة بيانات في الساعة 02:30 فجراً ومن عنوان خارجي يمثل مؤشر سلوك خطيراً يستوجب المراجعة الفورية والتحقيق.',
      },
      {
        question: 'في شركة تجارية، الموظف الذي يوافق على أوامر الشراء لا يمتلك صلاحية صرف المبالغ المالية، بل تُسند مهمة الصرف لموظف آخر. ما الضابط الإداري المطبق هنا؟',
        options: [
          'فصل المهام (Separation of Duties)',
          'الكشف المعتمد على التوقيع (Signature Detection)',
          'تسميم ذاكرة DNS (DNS Cache Poisoning)',
          'اختبار الصندوق الأسود (Black Box Testing)',
        ],
        correctIndex: 0,
        explanation: 'توزيع خطوات العملية المالية الحساسة (الموافقة على الشراء مقابل صرف المبلغ) على أكثر من شخص لضمان الرقابة المتبادلة هو تطبيق لمبدأ فصل المهام (Separation of Duties).',
      },
      {
        question: 'أي من البدائل التالية يجمع بشكل صحيح بين عوامل التحقق متعدد العوامل (MFA) من فئات مختلفة؟',
        options: [
          'كلمة المرور (شيء تعرفه) + مفتاح أمان مادي Key fob (شيء تملكه) + بصمة الإصبع (شيء هو جزء منك)',
          'كلمة المرور الأولى + كلمة المرور الثانية + رقم التعريف الشخصي PIN',
          'اسم المستخدم + البريد الإلكتروني + رقم المكتب الداخلي',
          'عنوان IP للجهاز + نوع المتصفح + دقة الشاشة',
        ],
        correctIndex: 0,
        explanation: 'يتطلب التحقق متعدد العوامل (MFA) دمج عوامل من فئات مختلفة: شيء يعرفه المستخدم (كلمة مرور)، وشيء يمتلكه (Key fob / OTP)، وشيء هو جزء منه كخصائصه الحيوية (بصمة الإصبع).',
      },
    ],
    interactiveBook3D: {
      model3DType: 'aaa_vault_gate',
      shaderEffect: 'zero_trust_grid',
      cameraPosition: { x: 0, y: 2.0, z: 5.8 },
      autoRotateSpeed: 1.1,
      primaryNeonColor: '#10b981',
      secondaryNeonColor: '#06b6d4',
      pages3D: [
        {
          pageNumber: 1,
          type: 'overview',
          title: 'بوابة الخزنة الثلاثية لنموذج AAA (Authentication, Authorization, Accounting)',
          subtitle: 'تمثيل ثلاثي الأبعاد لحلقات التحقق من الهوية وتفويض الصلاحيات وتسجيل الأفعال',
          contentMarkdown: `### البوابات الثلاث لحماية الأصول من الداخل والخارج
يمثل المجسم ثلاثي الأبعاد خزنة بيانات مؤسسية محمية بثلاث بوابات متتالية:
1. **بوابة المصادقة (Authentication)**: تتحقق من الهوية عبر عوامل \`MFA\` الثلاثة.
2. **بوابة التفويض (Authorization)**: تطبق قوائم \`ACL\` وأقل الامتيازات وفصل المهام.
3. **بوابة المحاسبة (Accounting)**: تسجل كل حركة في سجلات تدقيق غير قابلة للإنكار.`,
          highlightedRuleOrFormula: 'Access_Granted = Authenticate(MFA) ∧ Authorize(ACL ∩ Least_Privilege) ∧ Log(Audit_Trail)',
          interactiveTakeaway: 'تفاعل مع البوابات الثلاث لرؤية كيف يُحجب الحساب الخدمي أو الموظف عند محاولة تجاوز صلاحياته.',
        },
        {
          pageNumber: 2,
          type: 'anatomy',
          title: 'تشريح التهديد الداخلي: الموظف، المقاول، والحساب الخدمي',
          subtitle: 'مقارنة الخطأ غير المقصود بالسلوك المتعمد ومراجعة دورة حياة الحساب',
          contentMarkdown: `### لماذا يُعد التهديد الداخلي خطراً سياقياً؟
- لأن الكيان يمتلك وصولاً مشروعاً مسبقاً داخل حدود الشبكة.
- **مراجعة الصلاحيات الدورية**: تمنع تراكم الامتيازات (Privilege Creep) عند تنقل الموظفين بين الأقسام.`,
          highlightedRuleOrFormula: 'Effective_Permissions = Current_Role_Permissions (Remove Legacy Dept Access)',
          interactiveTakeaway: 'انقر على عقدة التفويض لمحاكاة سحب صلاحيات المحاسبة من موظف انتقل إلى المبيعات.',
        },
        {
          pageNumber: 3,
          type: 'defense-lab',
          title: 'مختبر التحقيق في سجلات الوصول (Audit Log Forensics)',
          subtitle: 'قراءة القرائن الزمنية والمكانية مع حفظ الخصوصية وعدم الاتهام المبكر',
          contentMarkdown: `### مقارنة سجل أحمد وسجل خالد
- **أحمد (08:05 ص - 08:07 ص)**: إخفاقان ثم نجاح صباحي = خطأ طباعي غير مقصود.
- **خالد (02:30 ص - IP خارجي)**: تصدير قاعدة بيانات فجراً = مؤشر سلوك حرج يستوجب التحقيق الفوري.`,
          highlightedRuleOrFormula: 'Anomaly_Score = f(Time_of_Day=02:30AM, Action=Export_DB, Source_IP=External)',
          interactiveTakeaway: 'لا يُوجّه اتهام مبكر لأي موظف قبل استكمال مراجعة سجلات المحاسبة (Accounting) القاطعة.',
        },
        {
          pageNumber: 4,
          type: 'case-study',
          title: 'مصفوفة الوقاية والكشف والاستجابة وسلسلة الثقة عن بعد',
          subtitle: 'دمج التشفير و IDS والنسخ الاحتياطية في خطة أمنية متكاملة',
          contentMarkdown: `### منظومة الحماية الثلاثية
- **الوقاية**: مكافحة البرمجيات الخبيثة + التشفير + التوعية الأمنية.
- **الكشف**: أنظمة \`IDS\` ومراقبة السجلات.
- **الاستجابة**: النسخ الاحتياطية السريعة لاستعادة العمل.`,
          highlightedRuleOrFormula: 'Remote_Trust_Chain = Technical_Control(AntiMalware/VPN) + Admin_Control(No_Family_Sharing)',
          interactiveTakeaway: 'سقوط حلقة الوعي الإداري في العمل المنزلي يفتح منفذاً للتهديد الخارجي رغم وجود مضاد الفيروسات.',
        },
      ],
      stepByStep: [
        {
          stepNumber: 1,
          title: 'الخطوة 1: المصادقة متعددة العوامل (MFA Authentication)',
          description: 'مطالبة المستخدم بإدخال كلمة المرور (شيء يعرفه) وتمرير مفتاح الأمان أو بصمة الإصبع (شيء يملكه / جزء منه).',
          technicalDetail: 'منع الاعتماد الأحادي على كلمات المرور التي يسهل سرقتها بالتصيد أو التخمين.',
          visualCue: 'إضاءة البوابة الأولى باللون الأزرق السماوي بعد تطابق العوامل الثلاثة.',
          codeOrCommand: 'Auth_Check: Factor1(Password=OK) + Factor2(Hardware_KeyFob_OTP=OK) + Factor3(Biometric=OK)',
        },
        {
          stepNumber: 2,
          title: 'الخطوة 2: التفويض وتطبيق أقل الامتيازات وفصل المهام (Authorization & SoD)',
          description: 'فحص قائمة التحكم في الوصول (ACL) لمنح المستخدم صلاحية القراءة والإضافة فقط دون الحذف، مع فصل الموافقة عن الصرف.',
          technicalDetail: 'رفض أي طلب يتجاوز الدور الوظيفي الحالي للمستخدم أو يجمع خطوتي عملية مالية حساسة في يد واحدة.',
          visualCue: 'انفتاح البوابة الثانية جزئياً على مسار القراءة فقط وإغلاق مسار الحذف والإدارة.',
          codeOrCommand: 'ACL_Rule: Role="Data_Entry" -> Allow:[SELECT, INSERT] | Deny:[DELETE, DROP, ALTER]',
        },
        {
          stepNumber: 3,
          title: 'الخطوة 3: المحاسبة والتسجيل الدقيق في سجلات التدقيق (Accounting & Logging)',
          description: 'تسجيل هوية المستخدم، الوقت، عنوان IP، والعملية المنفذة في سجل التدقيق مع مراعاة خصوصية الموظف.',
          technicalDetail: 'توثيق الوصول للملفات المهنية دون التلصص على محتوى المراسلات الشخصية غير المرتبطة بالعمل.',
          visualCue: 'تدفق نبضات خضراء نحو أسطوانة السجلات المحمية داخل المجسم ثلاثي الأبعاد.',
          codeOrCommand: 'AUDIT_LOG: ts="2026-11-07T02:30:11Z" user="Khalid" action="Export_Database" src_ip="198.51.100.42"',
        },
        {
          stepNumber: 4,
          title: 'الخطوة 4: كشف الشذوذ السلوكي والتحقيق العادل دون اتهام مبكر',
          description: 'إطلاق تنبيه عند رصد تصدير قاعدة بيانات في الساعة 02:30 فجراً من عنوان خارجي ومراجعة الأدلة التقنية.',
          technicalDetail: 'التحقق مما إذا كان الحساب قد تم اختراقه خارجياً عبر هندسة اجتماعية أم أُسيء استخدامه داخلياً.',
          visualCue: 'تحول أسطوانة السجلات إلى اللون الكهرماني المتوهج مع عرض مقارنة السجلات.',
          codeOrCommand: 'SIEM_Correlation: Alert="Abnormal Off-Hours DB Export" -> Initiate_Forensic_Review(No_Premature_Accusation)',
        },
        {
          stepNumber: 5,
          title: 'الخطوة 5: تفعيل ضوابط الوقاية والكشف والاستجابة',
          description: 'تشفير البيانات الحساسة (وقاية)، ومراقبة الشبكة عبر IDS (كشف)، وتأمين النسخ الاحتياطية (استجابة).',
          technicalDetail: 'ضمان بقاء البيانات المسروقة غير قابلة للقراءة بالتشفير، وضمان استعادة النظام فوراً من النسخ الاحتياطية.',
          visualCue: 'إحاطة الخزنة الثلاثية بدرع زمردي متكامل يربط الوقاية والكشف والاستجابة.',
          codeOrCommand: 'Defense_Matrix = Prevention(AES256 + AV) + Detection(IDS) + Response(Immutable_Backups)',
        },
      ],
      hotspots: [
        {
          id: 'hs-ch4-mfa-gate',
          label: 'بوابة المصادقة متعددة العوامل (MFA Gate)',
          title: 'تأكيد الهوية عبر دمج المعرفة والملكية والخصائص الحيوية',
          x: -1.7,
          y: 1.3,
          z: 0.7,
          coordinates: { x: -1.7, y: 1.3, z: 0.7 },
          color: '#06b6d4',
          icon: 'KeyRound',
          summary: 'دمج كلمة المرور مع مفتاح أمان مادي (Key fob) أو بصمة الإصبع لمنع انتحال الهوية.',
          detailedExplanation: 'توفر المصادقة متعددة العوامل (MFA) طبقة حماية حاسمة تتجاوز ضعف كلمات المرور التقليدية، بحيث يعجز المهاجم الذي سرق كلمة المرور بالتصيد عن الدخول دون العامل المادي أو الحيوي.',
          mitreTactic: 'Mitigates TA0001 / TA0006 (T1078 Valid Accounts & Brute Force)',
          defensiveControl: 'فرض MFA الإلزامي لجميع الحسابات الإدارية والدخول عن بعد وفق ضوابط NCA ECC-2-2.',
        },
        {
          id: 'hs-ch4-least-privilege-sod',
          label: 'مصفوفة التفويض وفصل المهام (ACL & SoD)',
          title: 'أقل الامتيازات وفصل المهام ومراجعة دورة حياة الحساب',
          x: 1.7,
          y: 1.3,
          z: 0.7,
          coordinates: { x: 1.7, y: 1.3, z: 0.7 },
          color: '#10b981',
          icon: 'ShieldCheck',
          summary: 'منح الحد الأدنى الضروري من الصلاحيات وتوزيع العمليات الحساسة على أكثر من شخص.',
          detailedExplanation: 'يمنع مبدأ أقل الامتيازات منح صلاحيات دائمة غير مبررة، ويضمن فصل المهام عدم انفراد شخص واحد بالموافقة والصرف معاً، بينما تزيل المراجعة الدورية صلاحيات الأقسام السابقة عند تنقل الموظفين.',
          mitreTactic: 'Mitigates TA0004 - Privilege Escalation & Insider Misuse',
          defensiveControl: 'قوائم التحكم بالوصول المبنية على الأدوار (RBAC/ACL) والمراجعة الدورية للامتيازات.',
        },
        {
          id: 'hs-ch4-audit-accounting',
          label: 'وحدة المحاسبة وسجلات التدقيق (Accounting Logs)',
          title: 'تتبع الأنشطة وحفظ الأدلة وموازنة الخصوصية',
          x: -1.4,
          y: -1.2,
          z: 0.8,
          coordinates: { x: -1.4, y: -1.2, z: 0.8 },
          color: '#f59e0b',
          icon: 'FileText',
          summary: 'توثيق قاطع لمن فعل ماذا ومتى، يكشف الشذوذ ويمنع الاتهام المبكر بغير دليل.',
          detailedExplanation: 'تسجل المحاسبة أوقات الدخول والملفات المفتوحة والعمليات المنفذة ضمن سياسة معلنة تحترم خصوصية الموظفين، وتوفر دليلاً جنائياً يُميز بين الخطأ الصباحي العارض وتصدير البيانات المريب فجراً.',
          mitreTactic: 'Detects TA0009 - Collection & TA0010 - Exfiltration',
          defensiveControl: 'سجلات تدقيق مركزية محمية من التعديل مع نظام إبلاغ داخلي آمن.',
        },
        {
          id: 'hs-ch4-pdr-triad',
          label: 'منظومة الوقاية والكشف والاستجابة (PDR Shield)',
          title: 'تكامل التشفير وأنظمة IDS والنسخ الاحتياطية وسلسلة الثقة',
          x: 1.4,
          y: -1.2,
          z: 0.8,
          coordinates: { x: 1.4, y: -1.2, z: 0.8 },
          color: '#3b82f6',
          icon: 'Layers',
          summary: 'التشفير ومكافح البرمجيات للوقاية، وIDS للكشف، والنسخ الاحتياطية للاستجابة السريعة.',
          detailedExplanation: 'تتكامل الأدوات الثلاث لحماية المؤسسة من التهديدات الداخلية والخارجية، وتمتد عبر سلسلة الثقة في العمل عن بعد لتشمل تأمين جهاز الموظف تقنياً وتوعيته إدارياً.',
          mitreTactic: 'Comprehensive Defense-in-Depth (NIST CSF Protect/Detect/Respond)',
          defensiveControl: 'تشفير قواعد البيانات، مراقبة الشبكة بـ IDS، ونسخ احتياطية دورية مختبرة.',
        },
      ],
    },
    richData: {
      id: 304,
      chapter_number: 4,
      title: 'التهديدات الداخلية والخارجية ونموذج AAA',
      subtitle: 'إدارة الهوية والوصول، أقل الامتيازات، فصل المهام، وسجلات التدقيق',
      category: 'أساسي',
      pdfStartPage: 25,
      pdfEndPage: 31,
      description: 'يتناول هذا الفصل التهديدات الداخلية والخارجية، وتطبيق مبادئ المصادقة والتفويض والمحاسبة (AAA)، وأقل الامتيازات، وفصل المهام، ومقارنة أدوات الوقاية والكشف والاستجابة.',
      objectives: [
        'تحليل التهديد الداخلي بوصفه خطراً سياقياً والتمييز بين الخطأ غير المقصود والسلوك المتعمد',
        'تطبيق نموذج AAA (المصادقة MFA، التفويض بأقل الامتيازات وفصل المهام، والمحاسبة بسجلات التدقيق)',
        'قراءة سجلات الوصول للتمييز بين الأخطاء العارضة ومؤشرات السلوك المشبوه دون اتهام مبكر',
        'مقارنة أدوات الوقاية والكشف والاستجابة وبناء سلسلة الثقة في العمل عن بعد',
      ],
      sections: [
        {
          heading: '1. التهديدات من الداخل والخطأ غير المقصود مقابل السلوك المتعمد',
          content: 'يشمل الداخل الموظف بدوام كامل، المقاول، والحساب الخدمي. وتتنوع المسببات بين الخطأ غير المقصود (نقص الوعي) والسلوك المتعمد (كسب مالي أو خبث).',
        },
        {
          heading: '2. الوقاية بنموذج AAA وأقل الامتيازات وفصل المهام',
          content: 'تؤكد المصادقة (MFA) الهوية، ويقيد التفويض (Least Privilege & SoD) الصلاحيات ويوزع المهام الحساسة، وتوثق المحاسبة (Accounting) الأفعال في سجلات التدقيق.',
        },
        {
          heading: '3. التهديدات الخارجية ومقارنة الوقاية والكشف والاستجابة',
          content: 'تربط الهندسة الاجتماعية المهاجم الخارجي بالمستخدم الداخلي. وتعمل مكافحات البرمجيات والتشفير للوقاية، وأنظمة IDS للكشف، والنسخ الاحتياطية للاستجابة.',
        },
      ],
      tables: [
        {
          title: 'جدول 3.1: مقارنة أدوات الوقاية والكشف والاستجابة',
          headers: ['نوع الضابط', 'الأداة التقنية', 'الوظيفة'],
          rows: [
            ['الوقاية (Prevention)', 'برامج مكافحة البرمجيات الخبيثة والتشفير', 'تصفية طلبات التنزيل لمنع البرمجيات الضارة، وإخفاء البيانات لجعلها عديمة الفائدة للمهاجمين'],
            ['الكشف (Detection)', 'أنظمة كشف التسلل (IDS)', 'مراقبة حركة مرور الشبكة لاكتشاف الأنماط النشطة للبرمجيات الخبيثة'],
            ['الاستجابة (Response)', 'النسخ الاحتياطية (Backups)', 'استعادة البيانات بسرعة بعد الهجوم لضمان استمرارية العمل'],
          ],
        },
      ],
      commonMistake: {
        mistake: 'افتراض أن كل تهديد داخلي متعمد، أو منح صلاحيات دائمة للموظفين لتسهيل العمل.',
        fix: 'كثير من الحوادث الداخلية تقع بسبب غياب الوعي، ويجب تطبيق مبدأ أقل الامتيازات ومراجعة الصلاحيات دورياً عند تغير الأدوار الوظيفية.',
      },
      solvedExample: {
        title: 'تحليل سجل وصول للتمييز بين الخطأ العارض والمؤشر الخطر',
        given: 'سجل النظام محاولتي دخول فاشلتين للموظف أحمد الساعة 08:05 و08:06 صباحاً تلتهما محاولة ناجحة الساعة 08:07 صباحاً، بينما سجل للموظف خالد عملية تصدير قاعدة بيانات الساعة 02:30 فجراً من عنوان خارجي.',
        steps: [
          '1. تحليل سجل أحمد: التوقيت صباحي معتاد وانتهى بدخول ناجح بعد دقيقتين = خطأ غير مقصود في إدخال كلمة المرور.',
          '2. تحليل سجل خالد: العملية حساسة (Export Database)، والتوقيت غير معتاد (02:30 فجراً)، والمصدر خارجي = مؤشر سلوك يحتاج مراجعة فورية.',
          '3. الإجراء المهني: عدم توجيه اتهام مبكر لخالد، بل مراجعة سجلات المحاسبة (Accounting) للتحقق مما إذا كان الحساب مخترقاً من الخارج أم استُخدم داخلياً.',
        ],
        result: 'تصنيف حالة أحمد كخطأ عارض، وفتح تحقيق جنائي فوري في حساب خالد بالاعتماد على أدلة السجل.',
        whyItMatters: 'يبرز دور سجلات التدقيق في كشف التجاوزات وحفظ الأدلة مع ضمان العدالة المهنية.',
      },
      selfAssessment: [
        {
          question: 'كيف يساهم مبدأ المحاسبة (Accounting) في حفظ الأدلة وعدم الاتهام المبكر عند مراجعة سجلات التدقيق؟',
          answer: 'يتيح تتبع استخدام الموارد وتسجيل إجراءات المستخدمين بدقة في ملفات السجل، مما يوفر دليلاً قاطعاً على الأفعال التي تمت ويتيح تقييم البلاغات بناءً على الأدلة التقنية لا الافتراضات.',
        },
        {
          question: 'عرّف التحقق متعدد العوامل (MFA) واذكر الفئات الثلاث التي يعتمد عليها.',
          answer: 'هو عملية تأكيد هوية المستخدم باستخدام أكثر من عامل واحد، ويعتمد على: شيء يعرفه المستخدم (كلمة المرور)، وشيء يمتلكه (مفتاح أمان مادي Key fob)، وشيء هو جزء منه (بصمات الأصابع).',
        },
      ],
    },
    updated_at: COURSE_TIMESTAMP,
  },

  // =========================================================================
  // الفصل الخامس: التجسس السيبراني، التهديدات المستمرة المتقدمة (APTs)، والاختراق الأخلاقي
  // =========================================================================
  {
    id: 305,
    chapter_number: 5,
    title: 'التجسس السيبراني، التهديدات المستمرة المتقدمة (APTs)، ومنهجيات الاختراق الأخلاقي (Penetration Testing)',
    subtitle: 'استغلال SNMP و LLMNR و DNS، المسح بـ Nmap، هجمات الاعتراض (MitM/MitB/SSL)، والتصريح المكتوب وقواعد الاشتباك',
    description: 'دراسة شاملة لأساليب التجسس الإلكتروني وجمع المعلومات، مخاطر SNMP واختطاف LLMNR وتسميم DNS، المسح الشبكي واكتشاف المضيفين والمنافذ بأداة Nmap، هجمات الاعتراض (MitM، MitB، Replay، التحايل على SSL)، التسريب عبر نقل المنطقة (DNS Zone Transfer)، ومنهجيات اختبار الاختراق المصرح (التصريح المكتوب، النطاق، قائمة الاستثناء، قواعد الاشتباك، أنماط الصندوق الأسود والأبيض والرمادي، السجل الفني، والإفصاح المسؤول).',
    category: 'تجسس واختبار اختراق',
    difficulty: 'advanced',
    pdfStartPage: 32,
    pdfEndPage: 41,
    diagramKey: 'ise232-threats-5',
    diagramConfig: {
      key: 'ise232-threats-5',
      title: 'مسار الاستطلاع والتجسس (SNMP / Nmap / MitM) مقابل إطار اختبار الاختراق المصرح (RoE)',
      svgType: 'EspionageRecon',
      nodes: ['SNMP (161/162 UDP)', 'Nmap (-sn / -A)', 'MitM & MitB & SSL', 'التصريح المكتوب وقواعد الاشتباك (RoE)'],
      accentColor: '#06b6d4',
    },
    videoUrl: 'https://www.youtube.com/watch?v=QzX2gN7YbW0',
    videoDuration: '22:15',
    presentationUrl: '/presentations/ise232-threats-ch5.pdf',
    keyTopics: [
      'التجسس الإلكتروني (Cyber Espionage) والهدف المعلوماتي للتجسس',
      'بروتوكول إدارة الشبكة البسيط SNMP (المنفذ 161 للعوامل والمنفذ 162 للمدير عبر UDP) وأهمية SNMPv3 المشفر',
      'الفرق الدقيق بين سرية البيانات (Confidentiality) وخصوصية المستخدم (Privacy)',
      'سرقة بيانات الاعتماد: اختطاف LLMNR بالبث المتعدد وتسميم ذاكرة DNS (وحل DNSSEC)',
      'المسح الشبكي بأداة Nmap: استكشاف الواجهات (ip addr)، مسح المضيفين (nmap -sn)، ومسح الإصدارات (nmap -A)',
      'سطح الهجوم (Attack Surface): كيف يتسع وكيف يضيق',
      'هجمات الاعتراض: الوسيط (MitM)، المتصفح (MitB)، إعادة الإرسال (Replay Attack & Nonce/OTP)، والتحايل على SSL',
      'التسريب عبر القنوات الرقمية: نقل المنطقة (DNS Zone Transfer) ودليل FTP المكشوف (ملف shadow)',
      'التجسس الاجتماعي واختطاف النقرات (Clickjacking)',
      'اختبار الاختراق المصرح: البنود الثمانية للتصريح المكتوب، النطاق، قائمة الاستثناء، وقواعد الاشتباك (RoE)',
      'أنماط الاختبار الثلاثة (Black Box, White Box, Gray Box)، السجل الفني السباعي، والإفصاح المسؤول',
    ],
    content: `## 5.1 أساليب التجسس الإلكتروني وجمع المعلومات والشبكة

**التجسس الإلكتروني (Cyber Espionage)** هو جمع معلومات عن شبكة أو نظام أو مستخدميه دون علم صاحب الحق تمهيداً لاستغلالها. و**هدفه المعلوماتي** الحصول على ما يكشف بنية النظام وحالته ومواطن ضعفه قبل شن أي هجوم.

### 1. بروتوكول إدارة الشبكة البسيط (\`SNMP\`)
يتكون من عوامل (\`Agents\`) على الأجهزة تتواصل عبر المنفذ **\`161/UDP\`**، ومدير (\`Manager\`) يستقبل رسائلها عبر المنفذ **\`162/UDP\`**. ينقل البروتوكول معلومات تشغيلية ثمينة للمهاجم (درجة حرارة الجهاز، عدد اتصالاته الحالية، وسعة القناة المستخدمة) تصبح خريطة لوقت ضعف الخادم.
- **خطأ شائع**: تشغيل إصدار أقدم من الإصدار الثالث (**\`SNMPv3\`**)؛ فتنتقل الرسائل بلا تشفير وبمصادقة ضعيفة (\`Community Strings\`).

### 2. الفرق بين سرية البيانات (\`Confidentiality\`) وخصوصية المستخدم (\`Privacy\`)
- **سرية البيانات**: ألا تُفصح المعلومات إلا لمن يملك حق الاطلاع (من ثالوث CIA).
- **خصوصية المستخدم**: سيطرة الفرد على بياناته الشخصية وعلى ما يُجمع عن نشاطه. فقد تبقى بيانات المؤسسة سرية بينما تُنتهك خصوصية موظف تُلتقط نماذجه!

### 3. سرقة بيانات الاعتماد بخداع الجهاز قبل المستخدم
- **اختطاف تحليل الأسماء متعدد البث محلي النطاق (\`LLMNR Poisoning\`)**: يُستعمل \`LLMNR\` بعد إخفاق \`DNS\` ويُرسل بالبث المتعدد (\`Multicast\`) إلى الشبكة المحلية، فيردّ المهاجم منتحلاً خادم مصادقة ويستلم بيانات الضحية. **الحل**: تعطيل \`LLMNR\`.
- **تسميم ذاكرة \`DNS\` (\`DNS Cache Poisoning\`)**: يُخدع المحلّل (\`Resolver\`) ليخزّن عناوين خاطئة ويقدمها للعملاء لأن رد \`DNS\` غالباً حزمة واحدة غير مصادق عليها. **الحل**: تفعيل امتداد **\`DNSSEC\`** الذي يفرض المصادقة الرقمية على إجابات \`DNS\`.

---

## 5.2 مسح الشبكة واكتشاف المضيفين والمنافذ (\`Nmap\`) وسطح الهجوم

يبني المهاجم (أو الفاحص الدفاعي) صورة الهدف عبر أوامر استكشاف متدرجة (كما وردت في مختبر كتاب المقرر صفحات 33-34):

\`\`\`bash
# 1. معرفة واجهات الجهاز وعنوانه المحلي
root@7b6d733cc03a:/# ip addr
3: eth0@if166: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 ...
    link/ether 02:42:ac:14:00:02 brd ff:ff:ff:ff:ff:ff
    inet 172.20.0.2/16 brd 172.20.255.255 scope global eth0

# 2. مسح اكتشاف المضيفين الأحياء دون فحص المنافذ (Ping Scan - 256 عنواناً)
root@7b6d733cc03a:/# nmap -sn 172.20.0.0/24
Nmap scan report for 172.20.0.1
Host is up (0.000076s latency).
Nmap scan report for nmap_victim_1.nmap_default (172.20.0.3)
Host is up (0.000070s latency).
Nmap scan report for 7b6d733cc03a (172.20.0.2)
Host is up.
Nmap done: 256 IP addresses (3 hosts up) scanned in 5.78 seconds

# 3. مسح المنافذ وكشف الإصدار وبصمة نظام التشغيل ونصوص NSE الافتراضية
root@7b6d733cc03a:/# nmap -A victim
PORT   STATE SERVICE VERSION
21/tcp open  ftp     ProFTPD
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_drwxr-xr-x   1 ftp  users   4096 Sep 22 20:11 incoming
No exact OS matches for host
Nmap done: 1 IP address (1 host up) scanned in 28.39 seconds
\`\`\`

- **سطح الهجوم (\`Attack Surface\`)**: مجموع نقاط الدخول المكشوفة (المنافذ المفتوحة، الخدمات المعلومة إصداراتها، والواجهات التي تقبل المدخلات). فوجود منفذ \`21/tcp\` بخدمة \`ProFTPD\` تسمح بدخول مجهول (\`Anonymous FTP\`) مع مجلد \`incoming\` يمثل سطح هجوم كاملاً!

---

## 5.3 هجمات الاعتراض (\`Interception\`) والتسريب عبر القنوات الرقمية

| نوع الهجوم | آلية العمل التقنية | الأثر على CIA والحل الدفاعي |
| :--- | :--- | :--- |
| **هجوم الوسيط (\`MitM - Man in the Middle\`)** | اعتراض اتصال قائم بين طرفين للتنصت وتبديل المفاتيح العامة أو تعديل الرسائل. | يمس السرية والسلامة والتوافر. **الحل**: التشفير مع تأمين تبادل المفاتيح الموثق. |
| **اعتراض المتصفح (\`MitB - Man in the Browser\`)** | ينشأ من حصان طروادة فيعترض اتصالات المتصفح بالخادم ويعدلها (مثل تحويل 1,000 إلى 10,000 لحساب المهاجم). | يمس السلامة والسرية داخل المتصفح قبل التشفير الشبكي. **الحل**: حماية النقاط الطرفية والتأكيد خارج القناة. |
| **إعادة الإرسال (\`Replay Attack\`)** | نسخ ما أرسله الضحية (بيانات دخول أو أوامر) وإعادة بثه لانتحاله. | **الحل**: ربط كل أمر بسياقه وزمنه عبر الطوابع الزمنية أو رقم لمرة واحدة (\`Nonce\`) أو رمز متغير (\`OTP\`). |
| **التحايل على \`SSL\` (\`SSL Stripping / Fake CA\`)** | تثبيت شهادة مزورة من سلطة إصدار (\`CA\`) وهمية عبر تروجان، أو منع ترقية الاتصال من \`HTTP\` إلى \`HTTPS\`. | يرى المهاجم البيانات بنص واضح. **الحل**: \`HSTS\` وحماية مخزن الشهادات الجذرية. |
| **التسريب عبر القنوات الرقمية (\`Zone Transfer\` / \`shadow\`)** | إتاحة نقل المنطقة (\`DNS Zone Transfer\`) للعموم خطأً، أو وضع نسخة من ملف \`shadow\` (قيم كلمات المرور المجزأة) في دليل \`incoming\` المتاح للدخول المجهول. | تسريب خريطة المضيفين الداخلية وبيانات الاعتماد دون اعتراض مباشر. **الحل**: قصر نقل المنطقة على الخوادم الداخلية وإغلاق الدخول المجهول. |
| **اختطاف النقرات (\`Clickjacking\`)** | واجهة مربكة تخلط الإعلانات بأزرار التشغيل في مواقع البث فينقر المستخدم رابطاً ضاراً دون قصد. | **الحل**: ترويسات \`X-Frame-Options\` و \`CSP frame-ancestors\`. |

---

## 5.4 استراتيجيات الاختراق الأخلاقي (\`Authorized Penetration Testing\`)

يتميز **اختبار الاختراق المصرح** عن النشاط غير المصرح بثلاثة أركان: **موافقة مسبقة من صاحب الحق**، و**حدود مكتوبة لا تُتجاوز**، و**مسؤولية مهنية يُساءل عنها**.

### البنود الثمانية للتصريح المكتوب (جدول 4.1) والحد الأدنى للسجل الفني السباعي (جدول 4.2)

| بنود التصريح المكتوب (\`Written Authorization\`) | عناصر سجل الأنشطة الفني (\`Technical Log\` - 7 عناصر) |
| :--- | :--- |
| 1. **الغرض والجهات** (سبب الاختبار وصاحب الأصل وفريق التنفيذ) | 1. **التاريخ والوقت** (لحظة تنفيذ كل نشاط) |
| 2. **النطاق (\`Scope\`)** (الأنظمة والعناوين المشمولة مثل \`172.20.0.0/24\`) | 2. **اسم المقيّم** (من نفّذ النشاط) |
| 3. **قائمة الاستثناء (\`Excluded Systems\`)** (الممنوع فحصها نهائياً كقاعدة الرواتب) | 3. **معرّف نظام التقييم** (عنوان النظام الذي أُجري منه الفحص) |
| 4. **الأنشطة** (الأفعال المسموحة وغير المسموحة) | 4. **معرّف النظام المستهدف** (عنوان النظام الذي أُجري عليه الفحص) |
| 5. **جدول التنفيذ / نافذة الاختبار (\`Test Window\`)** | 5. **الأداة المستخدمة** (اسم الأداة وإصدارها) |
| 6. **جهات الاتصال** (مع إضافة جهة اتصال بديلة دائماً) | 6. **الأمر المنفّذ** (نص الأمر كما أُدخل) |
| 7. **التعامل مع البيانات التجريبية** (الجمع -> التخزين -> النقل -> الإتلاف) | 7. **التعليقات** (ما ظهر من ملاحظات أو نتائج) |
| 8. **التقارير** (شكل التقرير ومحتواه وموعد تسليمه والإفصاح المسؤول) | *(يضمن السجل إمكانية إعادة التنفيذ وتمييز أفعال المقيّم عن الخصوم)* |

### أنماط الاختبار الثلاثة وقواعد الحوكمة الأخلاقية
- **الصندوق الأسود (\`Black Box\`)**: فحص السلوك الظاهر من الخارج دون معرفة مسبقة بالبنية أو الشفرة.
- **الصندوق الأبيض (\`White Box\`)**: تحليل شفرة المصدر مباشرة، وهو **الأكفأ والأقل تكلفة** في كشف عيوب التطبيقات المخصصة لأنه يصل للعيوب المخفية مباشرة.
- **الصندوق الرمادي (\`Gray Box\`)**: معرفة جزئية (كحساب مستخدم عادي أو وصف معماري) مع فحص خارجي.
- **قرار عدم البدء (\`Decision Not to Start\`)**: الامتناع عن أي فحص قبل استيفاء التصريح المكتوب والنطاق وقواعد الاشتباك (\`RoE\`).

### قواعد Snort/Suricata لكشف استطلاع SNMP واختطاف LLMNR ونقل منطقة DNS

\`\`\`snort
# 1. كشف استعلامات SNMP غير المصرح بها باستخدام Community String الافتراضية (public)
alert udp $EXTERNAL_NET any -> $HOME_NET 161 (msg:"[ESPIONAGE-SNMP] Unauthorized SNMPv1/v2c Public Community Recon"; content:"public"; nocase; classtype:attempted-recon; sid:5000501; rev:1;)

# 2. كشف محاولة نقل منطقة أسماء النطاقات (DNS Zone Transfer AXFR Leakage)
alert tcp $EXTERNAL_NET any -> $HOME_NET 53 (msg:"[LEAKAGE-DNS] Unauthorized DNS Zone Transfer AXFR Attempt"; flow:to_server,established; content:"|00 00 fc|"; offset:14; classtype:attempted-recon; sid:5000502; rev:1;)
\`\`\``,
    images: [
      {
        prompt: 'Cyber espionage reconnaissance nmap SNMP LLMNR MitM interception attack path, 16:9',
        caption: 'أساليب التجسس والاستطلاع السيبراني (SNMP, Nmap, LLMNR) وهجمات الاعتراض (MitM/MitB)',
        alt: 'Cyber espionage and interception attacks',
        seed: 3051,
        isAIGenerated: true,
      },
      {
        prompt: 'Authorized penetration testing rules of engagement black white gray box testing methodology, 16:9',
        caption: 'إطار اختبار الاختراق المصرح: التصريح المكتوب، قواعد الاشتباك، وأنماط الصناديق الثلاثة',
        alt: 'Authorized penetration testing framework',
        seed: 3052,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'التجسس الإلكتروني يجمع خريطة ضعف النظام عبر SNMP وبروتوكولات تحليل الأسماء',
        subtitle: 'مخاطر SNMP القديم واختطاف LLMNR وتسميم ذاكرة DNS',
        bullets: [
          'التجسس الإلكتروني يجمع معلومات عن بنية النظام وحالته دون علم صاحبه تمهيداً لاستغلالها.',
          'بروتوكول SNMP (المنفذ 161 للعوامل و162 للمدير عبر UDP) يكشف حرارة الجهاز وعدد اتصالاته وسعة القناة، ويؤمّن بالإصدار الثالث SNMPv3 المشفر.',
          'اختطاف LLMNR يستغل البث المتعدد المحلي بعد إخفاق DNS لسرقة بيانات الاعتماد، وعلاجه تعطيل LLMNR.',
          'تسميم ذاكرة DNS يخدع المحلل (Resolver) لتخزين عناوين مزيفة، وعلاجه فرض المصادقة عبر DNSSEC.',
        ],
        keyHighlight: 'قد تبقى بيانات المؤسسة سرية (Confidentiality) بينما تُنتهك خصوصية المستخدم (Privacy) بالتقاط نماذجه ونشاطه.',
        visualType: 'architecture',
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'المسح الشبكي بأداة Nmap يكشف المضيفين الأحياء والمنافذ المفتوحة التي تشكل سطح الهجوم',
        subtitle: 'من استكشاف الواجهات (ip addr) إلى المسح الشامل (nmap -A)',
        bullets: [
          'يبدأ الاستكشاف بمعرفة عنوان الواجهة المحلية عبر ip addr (مثل 172.20.0.2 على eth0).',
          'مسح اكتشاف المضيفين (nmap -sn 172.20.0.0/24) يفحص 256 عنواناً بسرعة لمعرفة الأجهزة الحية دون فحص منافذها.',
          'مسح المنافذ والإصدارات (nmap -A) يستخدم مسح SYN نصف المفتوح ويفعل كشف الإصدار وبصمة النظام ونصوص NSE.',
          'سطح الهجوم (Attack Surface) يتسع بكل منفذ مفتوح وخدمة مكشوفة (مثل FTP بدخول مجهول) ويضيق بإغلاق غير اللازم.',
        ],
        keyHighlight: 'الفارق بين مسح المهاجم ومسح المختص في جمع المعلومات الدفاعي هو الغرض والتصريح المكتوب لا الأداة التقنية.',
        visualType: 'flow',
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'هجمات الاعتراض والتسريب تضرب أضلاع CIA الثلاثة عبر الشبكة والمتصفح والقنوات المهملة',
        subtitle: 'تشريح MitM و MitB و Replay والتحايل على SSL ونقل منطقة DNS',
        bullets: [
          'في هجمات الاعتراض: التنصت يمس السرية، والتعديل يمس السلامة، وإسقاط الاتصال يمس التوافر.',
          'هجوم المتصفح (MitB): حصان طروادة يعدل معاملات المتصفح (تحويل 1,000 إلى 10,000) دون أن يشعر المستخدم.',
          'هجوم إعادة الإرسال (Replay) يُحبط عبر الطوابع الزمنية أو الأرقام العشوائية لمرة واحدة (Nonce) أو OTP.',
          'التسريب عبر القنوات الرقمية: إتاحة نقل المنطقة (DNS Zone Transfer) للعموم أو ترك ملف shadow في دليل FTP مكشوف.',
        ],
        keyHighlight: 'منع ترقية الاتصال من HTTP إلى HTTPS (SSL Stripping) يجعل المستخدم يعمل بنص واضح طوال الجلسة ظاناً أنه آمن.',
        visualType: 'comparison',
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'اختبار الاختراق المصرح يحول الفعل التقني إلى تقييم مهني عبر التصريح وقواعد الاشتباك',
        subtitle: 'البنود الثمانية للتصريح المكتوب، قائمة الاستثناء، والبيانات التجريبية',
        bullets: [
          'يرتكز الاختبار المصرح على: موافقة مسبقة، حدود مكتوبة (Scope & Exclusions)، ومسؤولية مهنية وقانونية.',
          'قائمة الاستثناء (Excluded Systems) تحدد الأنظمة الممنوع لمسها نهائياً (كأنظمة الإنتاج الحرجة أو قاعدة الرواتب).',
          'قواعد الاشتباك (RoE) تنظم التنفيذ اليومي، نافذة الاختبار، معايير الإيقاف الفوري، وحدود الاختبار السري (Covert).',
          'البيانات التجريبية تمر بأربع مراحل صارمة: الجمع (الحد الأدنى) -> التخزين المشفر -> النقل الآمن -> الإتلاف والتطهير.',
        ],
        keyHighlight: 'قرار عدم البدء (Decision Not to Start) واجب مهني حاسم عند نقص أي عنصر من التصريح المكتوب أو النطاق.',
        visualType: 'matrix',
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'أنماط الصناديق الثلاثة والسجل الفني السباعي والإفصاح المسؤول تضبط جودة التقييم',
        subtitle: 'مقارنة الصندوق الأسود والأبيض والرمادي وتوثيق الأدلة دون تغيير',
        bullets: [
          'الصندوق الأسود يختبر السلوك الظاهر من الخارج، والصندوق الرمادي يمزج معرفة جزئية بالفحص الخارجي.',
          'الصندوق الأبيض يحلل شفرة المصدر مباشرة وهو الأكفأ والأقل تكلفة لكشف عيوب التطبيقات المخصصة.',
          'السجل الفني (7 عناصر) يوثق التاريخ، المقيّم، نظام التقييم، الهدف، الأداة، الأمر، والتعليقات دون تعديل الأصل.',
          'الإفصاح المسؤول يوجب إبلاغ صاحب الأصل أولاً عبر القنوات الرسمية، مع الإبلاغ الفوري عن أي تجاوز للنطاق.',
        ],
        keyHighlight: 'المختبر المصرح يتوقف عند إثبات إمكانية الوصول ويوثق الدليل في مكانه دون تغيير إعدادات الهدف أو حذف ملفاته.',
        visualType: 'snort',
      },
    ],
    flashcards: [
      {
        front: 'ما المنافذ التي يستخدمها بروتوكول SNMP وما خطر تشغيل إصدار أقدم من الإصدار الثالث؟',
        back: 'يستخدم المنفذ 161 للعوامل (Agents) والمنفذ 162 للمدير (Manager) عبر UDP. وتشغيل إصدار أقدم من SNMPv3 ينقل المعلومات التشغيلية الحساسة بلا تشفير وبمصادقة ضعيفة.',
        category: 'التجسس الإلكتروني',
      },
      {
        front: 'ما الفرق بين سرية البيانات (Confidentiality) وخصوصية المستخدم (Privacy)؟',
        back: 'السرية ألا تُفصح المعلومات إلا لمن يملك حق الاطلاع، بينما الخصوصية سيطرة الفرد على بياناته الشخصية وما يُجمع عن نشاطه؛ فقد تبقى بيانات المؤسسة سرية وتُنتهك خصوصية موظف.',
        category: 'مفاهيم دقيقة',
      },
      {
        front: 'قارن بين الخيارين (-sn) و (-A) في أداة المسح الشبكي Nmap.',
        back: 'الخيار (-sn) ينفذ مسح اكتشاف المضيفين الأحياء فقط دون فحص منافذهم، بينما الخيار (-A) يفعل كشف إصدارات الخدمات وبصمة نظام التشغيل ونصوص NSE الافتراضية.',
        category: 'أدوات المسح',
      },
      {
        front: 'ما الفرق بين هجوم الوسيط (MitM) وهجوم اعتراض المتصفح (MitB)؟',
        back: 'MitM يعترض الاتصال الشبكي القائم بين طرفين، بينما MitB ينشأ من برمجية يثبتها حصان طروادة داخل المتصفح لتعديل المدخلات أو المعاملات قبل تشفيرها وإرسالها.',
        category: 'هجمات الاعتراض',
      },
      {
        front: 'لماذا يُعد الاختبار بالصندوق الأبيض (White Box) أكثر كفاءة وفعالية من حيث التكلفة في التطبيقات المخصصة؟',
        back: 'لأنه يحلل شفرة المصدر مباشرة فيرى ما لا تراه الجهة الخارجية ويصل إلى العيوب المخفية في البنية دون استهلاك وقت طويل في محاولة اكتشافها من الخارج.',
        category: 'اختبار الاختراق',
      },
      {
        front: 'ما المراحل الأربع للتعامل مع البيانات التجريبية (Test Data) في اختبار الاختراق المصرح؟',
        back: '1) الجمع (بالحد الأدنى الضروري)، 2) التخزين (مع حماية وتشفير)، 3) النقل (بوسائل آمنة)، 4) الإتلاف (بتطهير الأنظمة والوسائط بعد التقرير).',
        category: 'حوكمة الاختبار',
      },
    ],
    miniQuiz: [
      {
        question: 'يخطئ موظف في كتابة اسم خادم داخلي فيفشل استعلام DNS، فيُبث الاستعلام محلياً عبر الشبكة بالبث المتعدد (Multicast) ويرد جهاز مخترق منتحلاً خادم المصادقة ليستلم بيانات الموظف. ما اسم هذا الهجوم وما حله؟',
        options: [
          'اختطاف تحليل الأسماء متعدد البث محلي النطاق (LLMNR)، وحله تعطيل بروتوكول LLMNR',
          'نقل المنطقة (DNS Zone Transfer)، وحله فتح المنفذ 21 للدخول المجهول',
          'اختطاف النقرات (Clickjacking)، وحله ترقية بروتوكول SNMP إلى الإصدار الأول',
          'هجوم Smurf الانعكاسي، وحله إلغاء التشفير في المتصفح',
        ],
        correctIndex: 0,
        explanation: 'يُستعمل بروتوكول LLMNR تلقائياً بعد إخفاق DNS عبر البث المتعدد المحلي، فيستغله المهاجم لانتحال خادم المصادقة وسرقة بيانات الاعتماد، والحل الجذري هو تعطيل LLMNR.',
      },
      {
        question: 'نفّذ مختبر اختراق الأمر (nmap -A victim) فظهرت له العبارة (No exact OS matches for host). ما التفسير الفني الصحيح لهذه العبارة وفق كتاب المقرر؟',
        options: [
          'عدم وجود تطابق دقيق لبصمة نظام التشغيل وهو أمر معتاد مع قلة المنافذ المفتوحة فلا يُبنى عليها استنتاج',
          'أن الجهاز المستهدف مطفأ تماماً ولا يتصل بالشبكة المحلية',
          'أن أداة Nmap تعطلت بسبب انتهاء صلاحية التصريح المكتوب',
          'أن جميع منافذ الجهاز الـ 65535 مفتوحة وتعمل بنظام Windows XP',
        ],
        correctIndex: 0,
        explanation: 'أوضح كتاب المقرر (صفحة 34) أن عبارة «No exact OS matches» تعني عدم وجود تطابق دقيق لبصمة نظام التشغيل، وهو أمر معتاد مع قلة المنافذ المفتوحة، فلا يُبنى عليها استنتاج.',
      },
      {
        question: 'أثناء تنفيذ اختبار اختراق مصرح، طلب مسؤول في الجهة شفهياً من المختص توسيع الفحص ليشمل نظاماً مدرجاً في قائمة الاستثناء (Excluded Systems). ما القرار الأخلاقي والمهني الصحيح؟',
        options: [
          'رفض الطلب وإيقاف العمل على ذلك النظام حتى يُحدّث التصريح المكتوب بموافقة صاحب الأصل الموقع الأصلي',
          'تنفيذ الفحص فوراً إرضاءً للمسؤول وتدوين ذلك بعد انتهاء المشروع',
          'فحص النظام سراً دون كتابة النتائج في التقرير النهائي',
          'حذف ملفات السجل الفني لإخفاء عملية فحص النظام المستثنى',
        ],
        correctIndex: 0,
        explanation: 'أكد كتاب المقرر أنه لا يجوز الانحراف عن الخطة أو فحص نظام مستثنى إلا بإذن كتابي محدد ومحدث من الموقع الأصلي (صاحب الأصل)، ويرفض المختص الطلب الشفهي التزاماً بالقرار الأخلاقي.',
      },
      {
        question: 'عثر مختبر اختراق مصرح أثناء فحص خدمة FTP على ملف shadow مكشوف داخل الدليل incoming. كيف يتعامل معه وفق مبدأ «جمع الدليل دون تغيير غير مبرر»؟',
        options: [
          'يترك الملف في مكانه ويوثق مساره وحجمه في السجل الفني دون نقله أو حذفه أو تعديل إعدادات الهدف',
          'يحذف الملف فوراً من الخادم لحماية الشركة ثم يبلغ زملاءه عبر قناة دردشة غير رسمية',
          'ينقل الملف إلى حاسوبه الشخصي ويغير كلمات مرور المستخدمين بنفسه',
          'يعيد تهيئة خادم FTP بالكامل قبل إبلاغ نقطة الاتصال',
        ],
        correctIndex: 0,
        explanation: 'مبدأ جمع الدليل دون تغيير غير مبرر يوجب عدم تعديل الأصل أو حذف ما وُجد، بل يُترك الملف مكانه ويُوثق مساره وحجمه في السجل الفني ويُبلغ صاحب الأصل عبر الإفصاح المسؤول.',
      },
    ],
    interactiveBook3D: {
      model3DType: 'apt_radar_globe',
      shaderEffect: 'stealth_radar_sweep',
      cameraPosition: { x: 0, y: 2.4, z: 5.6 },
      autoRotateSpeed: 1.3,
      primaryNeonColor: '#06b6d4',
      secondaryNeonColor: '#a855f7',
      pages3D: [
        {
          pageNumber: 1,
          type: 'overview',
          title: 'رادار الاستطلاع السيبراني وسطح الهجوم (Recon & Attack Surface Globe)',
          subtitle: 'تمثيل ثلاثي الأبعاد لنقاط الدخول المكشوفة (SNMP, DNS, FTP, Nmap)',
          contentMarkdown: `### كيف يرى المهاجم الشبكة قبل الهجوم؟
يمثل المجسم ثلاثي الأبعاد كرة شبكية يمسحها شعاع رادار استطلاعي:
- كل منفذ مفتوح (\`21/tcp FTP\`, \`161/udp SNMP\`, \`53/tcp DNS AXFR\`) يظهر كفجوة مضيئة توسع **سطح الهجوم (Attack Surface)**.
- إغلاق المنافذ غير اللازمة وتشفير \`SNMPv3\` يقلص سطح الهجوم أمام المهاجم.`,
          highlightedRuleOrFormula: 'Attack_Surface = ∑ (Open_Ports + Exposed_Services + Unvalidated_Inputs)',
          interactiveTakeaway: 'تفاعل مع الفجوات المضيئة على المجسم لمشاهدة كيف يكتشفها أمر nmap -A وكيف يتم تحصينها.',
        },
        {
          pageNumber: 2,
          type: 'anatomy',
          title: 'تشريح هجمات الاعتراض: MitM و MitB و Replay و SSL',
          subtitle: 'كيف تُسرق الجلسات وتُزوّر المعاملات المالية وكيف نحبطها',
          contentMarkdown: `### الفرق بين اعتراض الشبكة واعتراض المتصفح
- **MitM**: يجلس بين الطرفين على الشبكة ويبدل المفاتيح أو يمنع الترقية إلى \`HTTPS\`.
- **MitB**: يعمل داخل المتصفح نفسه عبر حصان طروادة فيغير مبلغ التحويل من \`1,000\` إلى \`10,000\` قبل التشفير!
- **Replay Attack**: يعيد بث طلب صادق، ويُحبط بربط كل أمر بـ \`Nonce\` أو \`Timestamp\` أو \`OTP\`.`,
          highlightedRuleOrFormula: 'Valid_Request = Verify_Signature(Payload || Timestamp || Nonce_OTP)',
          interactiveTakeaway: 'انقر على عقدة الاعتراض لمقارنة موضع MitM في الشبكة بموضع MitB داخل المتصفح.',
        },
        {
          pageNumber: 3,
          type: 'defense-lab',
          title: 'مختبر Nmap التفاعلي: من ip addr إلى فحص الإصدارات',
          subtitle: 'قراءة مخرجات المسح وبناء السجل الفني السباعي',
          contentMarkdown: `### خطوات الفحص المنهجي في المختبر المعزول
1. \`ip addr\` لمعرفة شبكة الواجهة (\`172.20.0.2/16\`).
2. \`nmap -sn 172.20.0.0/24\` لاكتشاف المضيفين الأحياء (3 مضيفين في 5.78 ثانية).
3. \`nmap -A victim\` لكشف \`ProFTPD\` والدخول المجهول ودليل \`incoming\`.`,
          highlightedRuleOrFormula: 'Technical_Log = { Timestamp, Assessor, Src_IP, Dst_IP, Tool_Ver, Command, Notes }',
          interactiveTakeaway: 'كل أمر ينفذه المختبر المصرح يجب أن يُدوّن في السجل الفني السباعي لتمييز عمله عن هجمات الخصوم.',
        },
        {
          pageNumber: 4,
          type: 'case-study',
          title: 'حوكمة الاختراق الأخلاقي: التصريح المكتوب وقواعد الاشتباك (RoE)',
          subtitle: 'قرار عدم البدء، قائمة الاستثناء، والإفصاح المسؤول',
          contentMarkdown: `### الحارس الأخلاقي والقانوني للمختص
- لا يبدأ أي فحص بدون **تصريح مكتوب** يحدد النطاق وقائمة الاستثناء ونافذة الاختبار.
- عند اكتشاف ثغرة أو تجاوز غير مقصود للنطاق، يتم **الإبلاغ الفوري والإفصاح المسؤول** لصاحب الأصل فقط.`,
          highlightedRuleOrFormula: 'If (!Written_Authorization || !Defined_Scope) => Decision_Not_To_Start()',
          interactiveTakeaway: 'التصريح المكتوب وقواعد الاشتباك هما الفارق القانوني الوحيد بين مختبر القبعة البيضاء ومخترق القبعة الرمادية.',
        },
      ],
      stepByStep: [
        {
          stepNumber: 1,
          title: 'التحقق من التصريح المكتوب وقواعد الاشتباك (Authorization & RoE Check)',
          description: 'مراجعة البنود الثمانية للتصريح المكتوب وتثبيت النطاق المسموح (172.20.0.0/24) وقائمة الأنظمة المستثناة.',
          technicalDetail: 'التأكد من وجود جهة اتصال رئيسة وبديلة، واستخدام بيئة وبيانات تجريبية معزولة.',
          visualCue: 'ظهور ختم التصريح الأخضر على منصة الرادار ثلاثية الأبعاد وتحديد الأنظمة المستثناة باللون الرمادي المحمي.',
          codeOrCommand: 'Scope_Allowed: 172.20.0.0/24 | Excluded_Systems: [172.20.0.1 (Router), Payroll_DB]',
        },
        {
          stepNumber: 2,
          title: 'استكشاف الواجهة واكتشاف المضيفين الأحياء (Host Discovery)',
          description: 'تنفيذ ip addr لمعرفة عنوان نظام التقييم، ثم تشغيل nmap -sn لاكتشاف المضيفين النشطين ضمن النطاق.',
          technicalDetail: 'فحص 256 عنواناً في 5.78 ثانية ورصد المضيف الهدف (victim: 172.20.0.3).',
          visualCue: 'مسح راداري دائري يكشف 3 عقد مضيئة على الشبكة.',
          codeOrCommand: 'ip addr && nmap -sn 172.20.0.0/24',
        },
        {
          stepNumber: 3,
          title: 'مسح المنافذ وكشف الخدمات وسطح الهجوم (Service & Version Enumeration)',
          description: 'تنفيذ nmap -A victim لكشف المنافذ المفتوحة وإصدارات الخدمات وتشغيل نصوص فحص الإعدادات NSE.',
          technicalDetail: 'اكتشاف المنفذ 21/tcp المفتوح بخدمة ProFTPD التي تسمح بدخول مجهول (Anonymous FTP) وتكشف الدليل incoming.',
          visualCue: 'تركيز شعاع الرادار على العقدة 172.20.0.3 وبروز منفذ 21/tcp كثغرة مكشوفة.',
          codeOrCommand: 'nmap -A victim -> 21/tcp open ftp ProFTPD (Anonymous FTP login allowed)',
        },
        {
          stepNumber: 4,
          title: 'جمع الدليل دون تغيير وتدوين السجل الفني السباعي (Evidence Collection)',
          description: 'توثيق وجود ملف shadow المكشوف في دليل FTP دون حذفه أو تعديله، وتسجيل العناصر السبعة في السجل الفني.',
          technicalDetail: 'ترك الأصل على حالته لضمان سلامة الأثر التدقيقي وإمكانية إعادة التحقق.',
          visualCue: 'التقاط صورة هولوغرافية للدليل وختمها بالطابع الزمني في السجل الفني.',
          codeOrCommand: 'Log_Entry: { ts:"2026-11-07 10:15", assessor:"Pentester_01", src:"172.20.0.2", dst:"172.20.0.3", tool:"nmap 7.94", cmd:"nmap -A victim" }',
        },
        {
          stepNumber: 5,
          title: 'الإفصاح المسؤول وإتلاف البيانات التجريبية (Responsible Disclosure & Cleanup)',
          description: 'تقديم التقرير المنظم لصاحب الأصل عبر القنوات الرسمية مع توصيات إغلاق الثغرة، ثم تطهير وإتلاف البيانات التجريبية.',
          technicalDetail: 'الامتناع التام عن نشر تفاصيل الثغرة قبل معالجتها من قبل المالك.',
          visualCue: 'إغلاق فجوة المنفذ 21/tcp وتحول سطح المجسم إلى الدرع الأزرق الآمن.',
          codeOrCommand: 'Deliver_Report(Owner_SOC) -> Shred_Test_Data(/tmp/pentest_artifacts/*)',
        },
      ],
      hotspots: [
        {
          id: 'hs-ch5-snmp-llmnr-dns',
          label: 'عقدة بروتوكولات الشبكة (SNMP / LLMNR / DNS)',
          title: 'مخاطر التجسس عبر SNMPv1/v2 واختطاف LLMNR وتسميم DNS',
          x: -1.6,
          y: 1.4,
          z: 0.6,
          coordinates: { x: -1.6, y: 1.4, z: 0.6 },
          color: '#06b6d4',
          icon: 'Network',
          summary: 'استغلال بروتوكولات الإدارة وتحليل الأسماء لكشف حالة الخوادم أو سرقة بيانات الاعتماد.',
          detailedExplanation: 'ينقل SNMP عبر المنفذين 161 و162 معلومات تشغيلية حساسة، ويسمح LLMNR للمهاجم بانتحال خادم المصادقة محلياً، بينما يؤدي سوء إعداد DNS إلى تسريب خريطة النطاق عبر نقل المنطقة (Zone Transfer).',
          mitreTactic: 'TA0006 - Credential Access (T1557.001 LLMNR/NBT-NS Poisoning)',
          defensiveControl: 'الترقية إلى SNMPv3 المشفر، تعطيل LLMNR، تفعيل DNSSEC، وقصر نقل المنطقة داخلياً.',
        },
        {
          id: 'hs-ch5-nmap-surface',
          label: 'مسبار المسح وسطح الهجوم (Nmap & Attack Surface)',
          title: 'اكتشاف المضيفين (-sn) وفحص المنافذ والإصدارات (-A)',
          x: 1.6,
          y: 1.4,
          z: 0.6,
          coordinates: { x: 1.6, y: 1.4, z: 0.6 },
          color: '#f59e0b',
          icon: 'Eye',
          summary: 'تحويل المنافذ المفتوحة والخدمات المكشوفة إلى خريطة استهداف أو خطة تحصين دفاعي.',
          detailedExplanation: 'يستخدم Nmap مسح SYN نصف المفتوح وخيارات كشف الإصدارات ونصوص NSE لتحديد نقاط الدخول المكشوفة (مثل خدمة FTP بدخول مجهول)، مما يساعد في تقليص سطح الهجوم قبل استغلاله.',
          mitreTactic: 'TA0043 - Reconnaissance (T1595 Active Scanning)',
          defensiveControl: 'إغلاق المنافذ غير اللازمة، إخفاء تفاصيل إصدارات الخدمات، وإلغاء الدخول المجهول.',
        },
        {
          id: 'hs-ch5-mitm-mitb-ssl',
          label: 'حلقة الاعتراض والتحايل (MitM / MitB / SSL / Replay)',
          title: 'اعتراض المحادثات والمتصفح وإعادة الإرسال والتحايل على الشهادات',
          x: -1.5,
          y: -1.2,
          z: 0.8,
          coordinates: { x: -1.5, y: -1.2, z: 0.8 },
          color: '#ef4444',
          icon: 'Radio',
          summary: 'التنصت وتعديل المعاملات البنكية في المتصفح أو إسقاط التشفير عبر شهادات مزورة.',
          detailedExplanation: 'يهدد الاعتراض عناصر CIA الثلاثة؛ حيث يتلاعب MitB بالقيم داخل المتصفح، ويعيد Replay بث الطلبات السابقة، بينما يمنع SSL Stripping ترقية الاتصال إلى HTTPS.',
          mitreTactic: 'TA0006 / TA0009 - Adversary-in-the-Middle (T1557) & Man-in-the-Browser (T1185)',
          defensiveControl: 'استخدام Nonce/OTP والطوابع الزمنية، تفعيل HSTS، وحماية النقاط الطرفية من أحصنة طروادة.',
        },
        {
          id: 'hs-ch5-roe-governance',
          label: 'ميثاق الاختبار المصرح (Written Auth & RoE)',
          title: 'التصريح المكتوب، قائمة الاستثناء، السجل الفني، والإفصاح المسؤول',
          x: 1.5,
          y: -1.2,
          z: 0.8,
          coordinates: { x: 1.5, y: -1.2, z: 0.8 },
          color: '#10b981',
          icon: 'FileText',
          summary: 'الإطار القانوني والأخلاقي الذي يفصل التقييم المهني المصرح عن الجريمة السيبرانية.',
          detailedExplanation: 'يحدد التصريح المكتوب النطاق والأنظمة المستثناة ونافذة الاختبار وطريقة إتلاف البيانات التجريبية، ويلزم المختص بقرار عدم البدء عند نقص الوثائق، وجمع الدليل دون تغيير، والإفصاح المسؤول.',
          mitreTactic: 'Authorized Security Assessment & Ethical Governance',
          defensiveControl: 'التصريح المكتوب الموقّع، قواعد الاشتباك (RoE)، والسجل الفني ذو العناصر السبعة.',
        },
      ],
    },
    richData: {
      id: 305,
      chapter_number: 5,
      title: 'التجسس السيبراني، APTs، ومنهجيات الاختراق الأخلاقي',
      subtitle: 'أساليب الاستطلاع والاعتراض، أداة Nmap، وإطار اختبار الاختراق المصرح',
      category: 'متقدم',
      pdfStartPage: 32,
      pdfEndPage: 41,
      description: 'يستعرض هذا الفصل أساليب التجسس الإلكتروني (SNMP, LLMNR, DNS)، مسح الشبكة بـ Nmap، هجمات الاعتراض (MitM, MitB, Replay, SSL)، والإطار الكامل لاختبار الاختراق المصرح.',
      objectives: [
        'تحليل مصادر التجسس الإلكتروني عبر SNMP واختطاف LLMNR وتسميم DNS والتمييز بين السرية والخصوصية',
        'تطبيق أوامر المسح الشبكي بأداة Nmap (-sn و -A) وتحديد سطح الهجوم وكيفية تقليصه',
        'مقارنة هجمات الاعتراض (MitM, MitB, Replay, SSL) والتسريب عبر القنوات الرقمية (Zone Transfer)',
        'إعداد عناصر التصريح المكتوب وقواعد الاشتباك والسجل الفني وتطبيق القرار الأخلاقي والإفصاح المسؤول',
      ],
      sections: [
        {
          heading: '1. التجسس الإلكتروني وبيانات الاعتماد والمسح الشبكي',
          content: 'يجمع التجسس معلومات عن بنية النظام عبر SNMP (161/162) أو سرقة بيانات الاعتماد عبر LLMNR وتسميم DNS، ويبني صورة الهدف عبر مسح المضيفين والمنافذ بأداة Nmap.',
        },
        {
          heading: '2. هجمات الاعتراض والتسريب عبر القنوات الرقمية',
          content: 'تشمل هجمات الوسيط (MitM)، اعتراض المتصفح (MitB)، إعادة الإرسال (Replay)، التحايل على SSL، والتسريب عبر نقل منطقة DNS أو أدلة FTP المكشوفة.',
        },
        {
          heading: '3. اختبار الاختراق المصرح والحوكمة الأخلاقية',
          content: 'يقوم على التصريح المكتوب، تحديد النطاق وقائمة الاستثناء، قواعد الاشتباك، حماية وإتلاف البيانات التجريبية، أنماط الصناديق الثلاثة، السجل الفني السباعي، والإفصاح المسؤول.',
        },
      ],
      tables: [
        {
          title: 'جدول 4.1: بنود التصريح المكتوب ووظيفة كل بند',
          headers: ['البند', 'ما يحدده'],
          rows: [
            ['الغرض والجهات', 'سبب الاختبار وصاحب الأصل وفريق التنفيذ'],
            ['النطاق (Scope)', 'الأنظمة والعناوين المشمولة'],
            ['قائمة الاستثناء', 'الأنظمة الممنوع فحصها نهائياً'],
            ['الأنشطة', 'الأفعال المسموحة وغير المسموحة'],
            ['جدول التنفيذ', 'التواريخ والساعات المسموح فيها بالاختبار'],
            ['جهات الاتصال', 'أسماء من يُبلّغهم الفريق وطرق الوصول إليهم'],
            ['التعامل مع البيانات', 'حماية ما يُستخرج وإتلافه بعد التقرير'],
            ['التقارير', 'شكل التقرير ومحتواه وموعد تسليمه'],
          ],
        },
        {
          title: 'جدول 4.2: الحد الأدنى لعناصر سجل الأنشطة الفني',
          headers: ['العنصر', 'ما يسجّله'],
          rows: [
            ['1. التاريخ والوقت', 'لحظة تنفيذ كل نشاط'],
            ['2. اسم المقيّم', 'من نفّذ النشاط'],
            ['3. معرّف نظام التقييم', 'عنوان النظام الذي أُجري منه الفحص'],
            ['4. معرّف النظام المستهدف', 'عنوان النظام الذي أُجري عليه الفحص'],
            ['5. الأداة المستخدمة', 'اسم الأداة وإصدارها'],
            ['6. الأمر المنفّذ', 'نص الأمر كما أُدخل'],
            ['7. التعليقات', 'ما ظهر من ملاحظات أو نتائج'],
          ],
        },
      ],
      commonMistake: {
        mistake: 'تشغيل إصدار SNMP أقدم من الثالث، أو إهمال بند التعامل مع البيانات في التصريح المكتوب، أو البدء بالفحص قبل اكتمال النطاق المكتوب.',
        fix: 'يجب استخدام SNMPv3 المشفر، وتحديد مراحل جمع وتخزين ونقل وإتلاف البيانات التجريبية، واتخاذ قرار عدم البدء عند نقص أي مستند تفويض.',
      },
      solvedExample: {
        title: 'تحليل نتائج مسح Nmap وتوثيق الدليل ضمن اختبار مصرح',
        given: 'ضمن نطاق مصرح (172.20.0.0/24) مع استثناء الموجه (172.20.0.1)، نفذ الفاحص nmap -sn ثم nmap -A على الهدف victim (172.20.0.3) فوجد خدمة ProFTPD على المنفذ 21 تسمح بدخول مجهول وتحتوي على نسخة احتياطية من ملف shadow داخل الدليل incoming.',
        steps: [
          '1. الالتزام بالنطاق: عدم لمس العنوان المستثنى 172.20.0.1 والاقتصار على الهدف المسموح.',
          '2. تحليل سطح الهجوم: المنفذ 21 بدخول مجهول يمثل سطح هجوم كاملاً، ووجود ملف shadow يمثل تسريباً لبيانات الاعتماد عبر قناة رقمية مكشوفة.',
          '3. جمع الدليل دون تغيير: ترك ملف shadow في مكانه دون حذفه أو نقله، وتدوين المسار والحجم والأمر المنفذ في السجل الفني السباعي.',
          '4. الإفصاح المسؤول: رفع التقرير عبر القناة الرسمية لصاحب الأصل مع توصية بإغلاق الدخول المجهول وحذف الملف وتدوير كلمات المرور.',
        ],
        result: 'كشف ثغرة حرجة وتوثيقها قانونياً ومهنياً دون إحداث أي ضرر تشغيلي أو تجاوز للنطاق.',
        whyItMatters: 'يوضح كيف يشترك المهاجم والمختبر في الأداة (nmap) ويفترقان في الإطار القانوني والتوقف عند الدليل.',
      },
      selfAssessment: [
        {
          question: 'علّل: لماذا تضع هجمات الاعتراض عناصر ثالوث أمن المعلومات الثلاثة في خطر؟',
          answer: 'لأن التنصت والتسجيل يمس السرية، والتعديل والتزوير أثناء المرور يمس السلامة، والإسقاط أو قطع الاتصال يمس التوافر.',
        },
        {
          question: 'اشرح معنى الإفصاح المسؤول، وأهمية الإبلاغ عند تجاوز نطاق الاختبار.',
          answer: 'الإفصاح المسؤول أن يصل خبر الثغرة أولاً إلى صاحب الأصل عبر القنوات الرسمية بما يكفيه للمعالجة، والإبلاغ عن تجاوز النطاق يحفظ الثقة ويتيح تقييم الأثر ومعالجته.',
        },
      ],
    },
    updated_at: COURSE_TIMESTAMP,
  },

  // =========================================================================
  // الفصل السادس: تهديدات البنى التحتية الحرجة وأنظمة التحكم الصناعي (OT / ICS / SCADA / PLC)
  // =========================================================================
  {
    id: 306,
    chapter_number: 6,
    title: 'تهديدات البنى التحتية الحرجة وأنظمة التحكم الصناعي (OT / ICS / SCADA / PLC & Stuxnet/Triton)',
    subtitle: 'المقارنة الجوهرية بين بيئتي IT و OT، السلامة التشغيلية (Safety)، التجزئة والمنطقة الصناعية منزوعة السلاح (IDMZ)، والمراقبة السلبية',
    description: 'دراسة معمقة لتهديدات البنية التحتية الحيوية وأنظمة التحكم الصناعي (ICS / SCADA / PLC)، الفروق الجوهرية في ترتيب أولويات CIA بين تقنية المعلومات (IT) والتقنية التشغيلية (OT)، ترابط السلامة التشغيلية (Safety) بسلامة البيانات (Integrity)، تحليل هجمات Stuxnet وTriton، وتطبيق الضوابط الصناعية: التجزئة (Segmentation)، المنطقة منزوعة السلاح الصناعية (IDMZ)، المراقبة السلبية (Passive Monitoring)، وإدارة التغيير والاستجابة المحافظة على التوافر.',
    category: 'بنية تحتية و OT/ICS',
    difficulty: 'advanced',
    pdfStartPage: 42,
    pdfEndPage: 49,
    diagramKey: 'ise232-threats-6',
    diagramConfig: {
      key: 'ise232-threats-6',
      title: 'معمارية الفصل بين شبكة IT وشبكة التشغيل OT عبر المنطقة الصناعية منزوعة السلاح (IDMZ) ونموذج Purdue',
      svgType: 'IT_vs_OT',
      nodes: ['شبكة الأعمال (IT)', 'المنطقة الصناعية العازلة (IDMZ)', 'شبكة الإشراف (SCADA/HMI)', 'وحدات التحكم الميدانية (PLC / Safety SIS)'],
      accentColor: '#f59e0b',
    },
    videoUrl: 'https://www.youtube.com/watch?v=QzX2gN7YbW0',
    videoDuration: '20:30',
    presentationUrl: '/presentations/ise232-threats-ch6.pdf',
    keyTopics: [
      'البنية التحتية الحيوية (Critical Infrastructure)، سياق الخدمة، الخدمة الحرجة، والأصل الداعم',
      'نظام التحكم الصناعي (ICS)، أنظمة SCADA، وأجهزة التحكم المنطقي القابلة للبرمجة (PLC)',
      'المقارنة الحاسمة بين بيئة تقنية المعلومات (IT) وبيئة التقنية التشغيلية (OT) عند التعارض',
      'وحدة التحكم والمنظومة الميدانية كنقطة أثر مادي، والعلاقة الوثيقة بين السلامة التشغيلية (Safety) وسلامة البيانات (Integrity)',
      'تقييم الأثر على المواطنين والمرضى والخدمات وترتيب أولوية الأصول الحرجة',
      'تحليل الهجمات الصناعية المتقدمة: دودة Stuxnet (عبور حدود الثقة عبر USB/RPC) وبرمجية Triton/Trisis (استهداف أنظمة السلامة SIS)',
      'خطأ نقل ضوابط مكتبية (IT) إلى بيئة تشغيلية (OT) دون تكييف (مثل فحص مضاد الفيروسات وقت الإنتاج)',
      'ضوابط حماية OT: التجزئة (Segmentation)، والمنطقة منزوعة السلاح الصناعية (IDMZ)',
      'ضبط الوصول عن بعد، منع الحسابات المشتركة في OT، وإدارة التغيير مع فصل المهام',
      'المراقبة السلبية (Passive Monitoring) مقابل الفحص النشط، والاستجابة للحوادث المحافظة على التوافر',
    ],
    content: `## 6.1 البنية التحتية الحيوية وأنظمة التحكم الصناعي (\`ICS / SCADA / PLC\`)

تعتمد الخدمات اليومية للمواطنين — من الماء والكهرباء والغاز إلى الرعاية الصحية والموانئ والنقل — على أنظمة تقود عمليات مادية.
- **البنية التحتية الحيوية (\`Critical Infrastructure\`)**: هي الأصول والعمليات والخدمات التي يتوقف عليها سير الحياة اليومية للمجتمع.
- **سياق الخدمة (\`Service Context\`)**: وصف الخدمة التي تقدمها المنشأة وما يلزم لاستمرارها (مثل إمداد حي سكني بالكهرباء على مدار اليوم).
- **الخدمة الحرجة (\`Critical Service\`) والأصل الداعم (\`Supporting Asset\`)**: الخدمة الحرجة هي التي يترتب على انقطاعها أثر مباشر على الأعمال الأساسية أو حياة الناس (مثل جلسات الغسيل الكلوي في مستشفى)، والأصل الداعم هو كل مكوّن مادي أو برمجي أو إجرائي تتوقف الخدمة عند فقده (مثل منظومة تنقية المياه ومصدر الكهرباء وأقفال غرفة المضخات).
- **نظام التحكم الصناعي (\`Industrial Control System - ICS\`)**: النظام الذي يقود العمليات المادية ويراقبها آلياً، ويعتمد على أنظمة التحكم الإشرافي وتحصيل البيانات (**\`SCADA\`**) وأجهزة التحكم المنطقي القابلة للبرمجة (**\`PLC\`**) التي تقود المعدات كالمحركات والصمامات والأفران.

---

## 6.2 الفرق الجوهري بين بيئة تقنية المعلومات (\`IT\`) وبيئة التقنية التشغيلية (\`OT\`)

يكمن الفرق الحاسم بين البيئتين في **ترتيب مبادئ ثالوث \`CIA\` عند التعارض**؛ لأن العبث بمنطق \`OT\` لا يبقى داخل الحاسب بل ينتقل أثره إلى العالم المادي والمعدات والأرواح (جدول 5.1 في المقرر):

| الجانب المقارن | بيئة تقنية المعلومات (\`IT\`) | بيئة التقنية التشغيلية (\`OT / ICS\`) |
| :--- | :--- | :--- |
| **غاية الحماية الأساسية** | إبقاء البيانات سرية وسليمة | إبقاء العملية المادية مستمرة وآمنة (\`Safety & Continuity\`) |
| **الأولوية عند التعارض** | **السرية (\`Confidentiality\`) وسلامة البيانات (\`Integrity\`)** أولاً | **التوافر (\`Availability\`) وسلامة العمليات المادية (\`Safety/Integrity\`)** أولاً |
| **نتيجة الخطأ أو الفشل** | فقد بيانات أو تأخر عمل مكتبي (يُعالج باستبدال الجهاز أو الاستعادة) | **ضرر مادي جسيم، تلف أفران/معدات، أو تهديد حياة المواطنين والمرضى** |
| **التحديثات وإعادة التشغيل** | معتادة ومجدولة دورياً بسهولة | حذرة جداً وتخضع لإدارة تغيير صارمة لأن إعادة التشغيل قد توقف خط الإنتاج |
| **طريقة المراقبة الشبكية** | فحص نشط ومراقبة تقليدية | **مراقبة سلبية (\`Passive Monitoring\`)** لا ترسل حزماً استطلاعية تجهد وحدات \`PLC\` |

### العلاقة بين السلامة التشغيلية (\`Safety\`) والأمن (\`Security / Integrity\`)
ترتبط **السلامة التشغيلية (\`Safety\`)** ارتباطاً وثيقاً بـ **سلامة البيانات (\`Integrity\`)**؛ ففي بيئة \`OT\` يؤدي انتهاك سلامة البيانات إلى تغيير الأوامر الموجهة للمعدات (مثل تغيير حد الضغط الأقصى في منشأة لتعبئة الغاز فيمنع التنفيس عند الحد الآمن، أو تعطيل مراوح التبريد في مصنع زجاج فتتلف الأفران).

### تشريح هجمات \`Stuxnet\` و \`Triton/Trisis\` على بيئات \`OT\`
1. **دودة \`Stuxnet\` (2010)**: صُممت لعبور **حدود الثقة (\`Trust Boundaries\`)** في المنشآت المعزولة عبر وحدات التخزين المتنقلة (\`USB\`) واستدعاءات الإجراءات البعيدة (\`RPC\`)، واستهدفت منطق أجهزة \`PLC\` لتغيير سرعة المحركات المادية مع إرسال قراءات وهمية طبيعية لشاشات الإشراف (\`HMI\`).
2. **برمجية \`Triton / Trisis\` (2017)**: استهدفت **أنظمة السلامة المؤتمتة (\`Safety Instrumented Systems - SIS\`)** من طراز \`Triconex\` في منشأة بتروكيماويات؛ بهدف تعطيل صمام الأمان الأخير لإحداث كارثة مادية.

> [!error]
> **خطأ نقل ضوابط مكتبية (\`IT\`) دون تكييف إلى بيئة (\`OT\`)**: تشغيل برمجيات مكافحة البرمجيات الضارة (\`Anti-Malware\`) بإعداداتها المكتبية لإجراء فحص كامل أسبوعي **أثناء وقت الإنتاج**! فهذا الفحص يستهلك موارد محطات الإشراف ويؤخر استجابتها فيتوقف خط الإنتاج (كما حدث في مصنع البلاستيك في كتاب المقرر صفحة 45). **الصواب**: نقل موعد الفحص والتحديث إلى خارج وقت الإنتاج وتكييف الضوابط.

---

## 6.3 الضوابط الوقائية والرقابية لحماية البنية التحتية الحيوية

1. **التجزئة (\`Network Segmentation\`)**: تقسيم الشبكة إلى مقاطع منفصلة بناءً على حدود الثقة وضبط العبور بينها بجدار الحماية (\`Firewall\`) وقوائم التحكم (\`ACL\`)، بحيث يُمنع أي أمر قيادة قادم من شبكة الأعمال ويُسمح فقط بخروج بيانات القراءة والتقارير.
2. **المنطقة منزوعة السلاح الصناعية (\`Industrial DMZ - IDMZ\`)**: منطقة وسيطة تُبنى باستخدام جدران الحماية لتفصل بين شبكة الأعمال (\`IT\`) وشبكة التشغيل (\`OT\`)، وتمنع أي اتصال مباشر بينهما؛ فيتم كل تبادل للبيانات عبر خدمات وسيطة تُنشر داخل \`IDMZ\` (مثال مصنع البتروكيماويات).
3. **ضبط الوصول عن بعد (\`Remote Access\`)**: تقييده بـ \`MFA\`، وعنوان \`IP\` محدد، ونافذة زمنية محددة (مثال المقاول الذي يعالج عطلاً في موقع ضخ ناءٍ).
4. **إدارة الهوية للحسابات التشغيلية (\`AAA\`)**: **منع الحسابات المشتركة نهائياً** لأنها تُبطل المحاسبة الفردية (مثال مصنع الإسمنت الذي تعذرت فيه معرفة من غيّر إعدادات المحرك لاشتراك فريق الصيانة في حساب واحد).
5. **إدارة التغيير (\`Change Management\`) وفصل المهام**: عدم تعديل منطق \`PLC\` إلا بعد مراجعته من مهندس التشغيل ومسؤول الأمن معاً (مثال مصنع الأدوية).
6. **المراقبة السلبية (\`Passive Monitoring\`)**: متابعة حركة الشبكة عبر المنفذ العاكس (\`SPAN/Mirror Port\`) دون إرسال طلبات فحص نشطة لوحدات التحكم \`PLC\` حتى لا تستهلك مواردها وتسبب توقفها.
7. **الاستجابة للحوادث والنسخ الاحتياطي المشفر واستمرارية الخدمة**: استخدام السجلات لعزل الأجهزة المتأثرة فقط دون إيقاف كامل المحطة، والاحتفاظ بنسخ احتياطية مشفرة لمنطق وحدات التحكم (\`PLC Logic\`)، وتوفير خطة تشغيل يدوية بديلة قبل أي عزل شبكي.

### قواعد Snort/Suricata (للمراقبة السلبية) لكشف أوامر كتابة غير مصرح بها على بروتوكول Modbus الصناعي

\`\`\`snort
# 1. كشف أمر كتابة مباشر (Write Single Register - Function Code 0x06) قادم من خارج شبكة الإشراف إلى جهاز PLC عبر Modbus/TCP
alert tcp !$SCADA_MASTERS any -> $PLC_NET 502 (msg:"[OT-MODBUS] Unauthorized Modbus Write Register Command to PLC"; flow:to_server,established; content:"|00 00|"; offset:2; depth:2; content:"|06|"; offset:7; depth:1; classtype:industrial-protocol; sid:6000601; rev:1;)

# 2. كشف محاولة برمجة أو إيقاف وحدة تحكم صناعية عبر بروتوكول Siemens S7comm (Stuxnet-style PLC Manipulation)
alert tcp !$ENGINEERING_WS any -> $PLC_NET 102 (msg:"[OT-S7COMM] Unauthorized PLC Logic Stop/Download Attempt Detected"; flow:to_server,established; content:"|32 01 00 00|"; content:"|29|"; distance:4; within:8; classtype:industrial-protocol; sid:6000602; rev:1;)
\`\`\``,
    images: [
      {
        prompt: 'Industrial control system ICS SCADA PLC IT vs OT segmentation IDMZ Purdue model, 16:9',
        caption: 'هندسة الفصل بين شبكة الأعمال (IT) وشبكة التشغيل (OT) عبر المنطقة الصناعية منزوعة السلاح (IDMZ)',
        alt: 'ICS SCADA IDMZ network architecture',
        seed: 3061,
        isAIGenerated: true,
      },
      {
        prompt: 'Critical infrastructure cyber physical safety PLC logic passive monitoring water power plant, 16:9',
        caption: 'حماية البنية التحتية الحيوية والمراقبة السلبية لوحدات التحكم المنطقي القابلة للبرمجة (PLC)',
        alt: 'Critical infrastructure PLC protection',
        seed: 3062,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'أنظمة التحكم الصناعي تقود العمليات المادية والعبث بمنطقها ينتقل إلى المعدات والأرواح',
        subtitle: 'البنية التحتية الحيوية، الخدمة الحرجة، الأصل الداعم، ووحدات PLC',
        bullets: [
          'البنية التحتية الحيوية تشمل الماء والكهرباء والصحة والنقل التي يتوقف عليها سير الحياة اليومية للمجتمع.',
          'الخدمة الحرجة (كجلسات الغسيل الكلوي) تقوم على أصول داعمة (تنقية المياه، الكهرباء، أقفال غرفة المضخات).',
          'نظام التحكم الصناعي (ICS) وأجهزة PLC تقود المحركات والأفران والصمامات وفق منطق برمجي مخزن.',
          'تقييم الأثر في البيئة الحيوية يُقاس أولاً بسلامة المواطنين والمرضى واستمرار الخدمة لا بمجرد تعطل الجهاز فنياً.',
        ],
        keyHighlight: 'أولوية الحماية في المنشأة الحيوية تُرتب بحسب دور الأصل في استمرار الخدمة الحرجة نظراً لمحدودية الموارد.',
        visualType: 'architecture',
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'الأولوية في بيئة OT تتقدم فيها التوافر والسلامة المادية على السرية عكس بيئة IT',
        subtitle: 'مقارنة شاملة بين تقنية المعلومات (IT) والتقنية التشغيلية (OT)',
        bullets: [
          'بيئة IT غايتها سرية البيانات وسلامتها، ونتيجة الخطأ فيها فقد بيانات أو تأخر عمل مكتبي.',
          'بيئة OT غايتها استمرار العملية المادية وأمانها، وأولويتها عند التعارض: التوافر وسلامة العمليات المادية.',
          'السلامة التشغيلية (Safety) ترتبط بسلامة البيانات (Integrity): تغيير حد الضغط في منشأة غاز يتحول لخطر انفجار مادي.',
          'خطأ شائع: نقل ضوابط مكتبية (كفحص مضاد الفيروسات الشامل وقت الإنتاج) إلى OT دون تكييف مما يوقف خط التشكيل.',
        ],
        keyHighlight: 'لا ينفع حماية إشارات المرور أو منظومة الأكسجين في مستشفى بإطفائها؛ فالتوافر في OT مسألة حياة وسلامة.',
        visualType: 'comparison',
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'التجزئة والمنطقة الصناعية منزوعة السلاح (IDMZ) ترسمان حدود الثقة بين IT و OT',
        subtitle: 'كيف نعزل شبكة التشغيل عن شبكة الأعمال ونمنع عبور دودة مثل Stuxnet؟',
        bullets: [
          'عبور حدود الثقة لا يقتصر على الشبكة؛ فقد عبرت دودة Stuxnet عبر أقراص USB واستدعاءات RPC لاستهداف أجهزة PLC.',
          'التجزئة (Segmentation) تقسم الشبكة إلى مقاطع منفصلة وتضبط المرور بجدار الحماية وقوائم التحكم (ACL).',
          'المنطقة منزوعة السلاح الصناعية (IDMZ) تفصل بين شبكتي الأعمال والتشغيل وتمنع الاتصال المباشر بينهما.',
          'يُضبط الحاجز الأمني ليمنع أي أمر قيادة قادم من شبكة الأعمال ويسمح فقط بخروج بيانات القراءة والتقارير عبر IDMZ.',
        ],
        keyHighlight: 'المنطقة الصناعية العازلة (IDMZ) تضمن ألا يتحول اختراق حاسوب إداري في المكاتب إلى سيطرة على وحدات التحكم الميدانية.',
        visualType: 'flow',
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'حوكمة الهوية وإدارة التغيير والمراقبة السلبية تحمي وحدات التحكم دون إرباك التشغيل',
        subtitle: 'منع الحسابات المشتركة وتجنب الفحص النشط على أجهزة PLC',
        bullets: [
          'الوصول عن بعد يُقيد بـ MFA، وعنوان IP محدد، ونافذة زمنية محددة (مثال صيانة موقع الضخ النائي).',
          'منع الحسابات المشتركة في OT لأنها تبطل المحاسبة الفردية (مثال مصنع الإسمنت).',
          'إدارة التغيير وفصل المهام: لا يُعدّل منطق PLC إلا بمراجعة مهندس التشغيل ومسؤول الأمن معاً (مثال مصنع الأدوية).',
          'المراقبة السلبية (Passive Monitoring) تتابع حركة الشبكة دون إرسال حزم فحص نشطة تستهلك موارد PLC وتوقفه.',
        ],
        keyHighlight: 'الفحص النشط (Active Scanning) قد يسقط وحدات PLC الحساسة، لذا تُعتمد المراقبة السلبية عبر منافذ النسخ (SPAN) في OT.',
        visualType: 'matrix',
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'الاستجابة للحوادث في البيئة الحيوية تحافظ على الحد الأدنى الآمن للتوافر وتستند لخطة بديلة',
        subtitle: 'عزل الجزء المتأثر فقط، النسخ الاحتياطي المشفر لمنطق PLC، والتشغيل اليدوي',
        bullets: [
          'تُراجع سجلات الأحداث التشغيلية لتحديد الأجهزة المتأثرة فقط وعزلها وحدها دون إيقاف كامل المحطة.',
          'النسخ الاحتياطي المشفر لمنطق وحدات التحكم (PLC Logic) يضمن استعادة سريعة ويجعل النسخة المسروقة بلا فائدة للمهاجم.',
          'خطأ عزل الأنظمة بلا خطة تشغيل بديلة يحول الإجراء الأمني نفسه إلى سبب في فشل النظام وتوقف الخدمة (مثال سكة الحديد).',
          'التطبيق المتكامل يجمع ترتيب الأصول، فصل الشبكات، إدارة الحسابات، والأقفال المادية لغرف الخوادم والمضخات.',
        ],
        keyHighlight: 'كل قرار عزل تقني في بيئة حيوية يجب أن تسبقه أو ترافقه خطة تشغيل يدوية أو بديلة تحفظ استمرار الخدمة للمواطنين.',
        visualType: 'snort',
      },
    ],
    flashcards: [
      {
        front: 'ما الفرق بين بيئة تقنية المعلومات (IT) وبيئة التقنية التشغيلية (OT) من حيث الأولوية عند التعارض؟',
        back: 'في بيئة IT تتقدم السرية وسلامة البيانات، بينما في بيئة OT تتقدم التوافر (Availability) وسلامة العمليات المادية (Safety/Integrity) لأن الخطأ يسبب ضرراً مادياً أو يمس الأرواح.',
        category: 'IT مقابل OT',
      },
      {
        front: 'كيف ترتبط السلامة التشغيلية (Safety) بسلامة البيانات (Integrity) في أنظمة التحكم الصناعي؟',
        back: 'في بيئة OT تتحول البيانات إلى أوامر مادية للمعدات؛ فانتهاك سلامة البيانات (كتغيير حد الضغط في منشأة غاز أو إيقاف تبريد الأفران) يتحول فوراً إلى خطر مادي يهدد سلامة الأشخاص والمعدات.',
        category: 'السلامة والأمن',
      },
      {
        front: 'ما هي المنطقة منزوعة السلاح الصناعية (IDMZ) وما وظيفتها؟',
        back: 'منطقة وسيطة تُبنى باستخدام جدران الحماية لتفصل بين شبكة الأعمال (IT) وشبكة التشغيل (OT)، وتمنع أي اتصال مباشر بينهما بحيث يتم تبادل البيانات عبر خدمات وسيطة داخلها.',
        category: 'معمارية OT',
      },
      {
        front: 'قارن بين المراقبة السلبية (Passive Monitoring) والفحص النشط (Active Scanning) في بيئة التشغيل.',
        back: 'المراقبة السلبية تتابع حركة الشبكة دون إرسال طلبات فحص لوحدات التحكم فلا تستهلك مواردها، بينما الفحص النشط يرسل حزماً استكشافية قد تتسبب في توقف الأجهزة التشغيلية (PLC).',
        category: 'مراقبة OT',
      },
      {
        front: 'لماذا يُمنع استخدام الحسابات المشتركة بين فنيي الصيانة والتشغيل في الأنظمة الصناعية؟',
        back: 'لأن الحسابات المشتركة تُبطل القدرة على المحاسبة (Accounting) وتمنع تتبع استخدام الموارد وتحديد المسؤولية الفردية عند وقوع تغيير خاطئ أو متعمد في إعدادات المعدات.',
        category: 'حوكمة الحسابات',
      },
      {
        front: 'ما الخطأ الذي يقع عند عزل أنظمة حيوية (كخط سكة حديد أو محطة مياه) فوراً دون خطة تشغيل بديلة؟',
        back: 'يتحول الإجراء الأمني نفسه إلى سبب في فشل النظام وتوقف الخدمة الحيوية عن المواطنين؛ والصواب تفعيل خطة تشغيل يدوية أو تواصل بديلة قبل الإغلاق الشبكي.',
        category: 'استمرارية الخدمة',
      },
    ],
    miniQuiz: [
      {
        question: 'في مصنع بلاستيك، أُلزمت محطات الإشراف بإجراء فحص كامل أسبوعي بمضاد البرمجيات الخبيثة أثناء ساعات العمل، فتوقف خط التشكيل دقائق متكررة. ما الخطأ الذي وقع وكيف يُصحح؟',
        options: [
          'نقل ضوابط مكتبية (IT) إلى بيئة تشغيلية (OT) دون تكييف، ويُصحح بنقل موعد الفحص إلى خارج وقت الإنتاج',
          'استخدام المنطقة الصناعية منزوعة السلاح (IDMZ)، ويُصحح بإلغاء جدران الحماية نهائياً',
          'تطبيق المراقبة السلبية، ويُصحح باستبدالها بفحص Nmap نشط كل خمس دقائق',
          'منع الحسابات المشتركة، ويُصحح بتوحيد جميع المهندسين في حساب واحد بدون كلمة مرور',
        ],
        correctIndex: 0,
        explanation: 'أورد كتاب المقرر هذا المثال (صفحة 44-45) لتوضيح خطأ نقل ضوابط مكتبية دون تكييف إلى بيئة التشغيل؛ إذ يستهلك الفحص موارد محطة الإشراف فيؤخر استجابتها ويوقف الإنتاج، والحل تكييف مواعيد الفحص خارج وقت الإنتاج.',
      },
      {
        question: 'في مركز طبي أكاديمي، تعطلت خدمة تحكم في منظومة الأكسجين المركزي. وفق منهجية تقييم الأثر في البنية التحتية الحيوية، ما المقياس الأول والحقيقي لتقدير الأثر؟',
        options: [
          'الأثر الواقع على المرضى وسلامتهم واستمرار الخدمة الطبية، وليس مجرد تعطل جهاز التحكم فنياً',
          'تكلفة شراء بطاقة شبكة بديلة لجهاز التحكم المتعطل فقط',
          'عدد الساعات اللازمة لكتابة تقرير المراجعة السنوي لقسم المشتريات',
          'سرية عناوين البريد الإلكتروني لموردي الأكسجين',
        ],
        correctIndex: 0,
        explanation: 'أكد كتاب المقرر أن تقييم الأثر في البيئة الحيوية يبدأ بمعرفة من يتضرر من فشل النظام، فيُقدّم الأثر على الأشخاص (المرضى والمواطنين) والخدمات على الأثر الفني البحت.',
      },
      {
        question: 'كيف يُضبط قرار الحاجز الأمني (جدار الحماية وقائمة التحكم ACL) بين شبكة الأعمال وشبكة التشغيل في شبكة توزيع كهرباء؟',
        options: [
          'يُضبط ليمنع أي أمر قيادة قادم من شبكة الأعمال ويسمح فقط بخروج بيانات القراءة والتقارير عبر المنطقة الوسيطة',
          'يُفتح بالكامل في الاتجاهين لتسهيل تعديل المحولات من أجهزة المكاتب مباشرة',
          'يُغلق تماماً بحيث لا تخرج أي قراءات أو فواتير إلى الإدارة نهائياً وتُطفأ المحولات',
          'يُسمح بمرور أوامر التحكم من الإنترنت العام دون مصادقة لتسريع الصيانة',
        ],
        correctIndex: 0,
        explanation: 'يوازن قرار الحاجز الأمني بين الحماية واستمرارية الخدمة بالسماح بالمرور الضروري فقط: منع أوامر القيادة القادمة من شبكة الأعمال، والسماح بخروج بيانات القراءة عبر IDMZ.',
      },
      {
        question: 'رُصد دخول غير مصرح به في شبكة منشأة غاز حيوية. ما خطوة الاستجابة الصحيحة التي توازن بين الاحتواء والتوافر؟',
        options: [
          'مراجعة سجلات الأحداث لتحديد الأجهزة المتأثرة بدقة وعزلها وحدها مع الحفاظ على عمل المحطة بالحد الأدنى الآمن',
          'إيقاف كامل محطة الغاز فوراً وقطع الإمداد عن المدينة قبل قراءة أي سجل',
          'حذف جميع سجلات الأحداث التشغيلية وإعادة تشغيل وحدات PLC عشوائياً',
          'تجاهل التنبيه تماماً لأن بيئة OT لا تتأثر بالهجمات السيبرانية',
        ],
        correctIndex: 0,
        explanation: 'تختلف الاستجابة في البيئة الحيوية عن المكتبية في وجوب مراعاة التوافر؛ فتُستخدم سجلات المحاسبة لتحديد نطاق الضرر وعزل الأجهزة المتأثرة فقط دون إيقاف كامل المحطة.',
      },
    ],
    interactiveBook3D: {
      model3DType: 'scada_plc_twin',
      shaderEffect: 'industrial_amber_wireframe',
      cameraPosition: { x: 1.2, y: 2.5, z: 6.0 },
      autoRotateSpeed: 0.9,
      primaryNeonColor: '#f59e0b',
      secondaryNeonColor: '#10b981',
      pages3D: [
        {
          pageNumber: 1,
          type: 'overview',
          title: 'التوأم الرقمي لمنظومة التحكم الصناعي (SCADA / PLC / IDMZ Twin)',
          subtitle: 'تمثيل ثلاثي الأبعاد لطبقات IT و IDMZ و OT والمنظومة الميدانية',
          contentMarkdown: `### معمارية الفصل الصناعي وحماية الخدمة الحرجة
يعرض المجسم ثلاثي الأبعاد ثلاث مناطق مفصولة بحدود ثقة صارمة:
1. **الطابق العلوي (IT Corporate Network)**: شبكة الأعمال والمكاتب.
2. **الطبقة الوسطى العازلة (Industrial DMZ - IDMZ)**: خادم تقارير وسيط محاط بجداري حماية يمنع الاتصال المباشر.
3. **الطابق الميداني (OT / SCADA / PLC)**: محطات الإشراف ووحدات \`PLC\` المتصلة بالمحركات والتوربينات.`,
          highlightedRuleOrFormula: 'IT_Network --(Read Only via IDMZ)--> OT_Network (Zero Direct Command Path)',
          interactiveTakeaway: 'تفاعل مع طبقة IDMZ لملاحظة كيف تُحجز أوامر القيادة القادمة من المكاتب وتُمرر بيانات القراءة فقط.',
        },
        {
          pageNumber: 2,
          type: 'anatomy',
          title: 'تشريح هجوم Stuxnet وانقلاب أولويات CIA في OT',
          subtitle: 'لماذا يتقدم التوافر والسلامة التشغيلية (Safety) على السرية؟',
          contentMarkdown: `### عندما يتحول الكود الرقمي إلى دمار مادي
- في **OT**، تتحكم وحدة \`PLC\` بسرعة المحرك وضغط الغاز وحرارة الفرن.
- تغيير قيمة مسجل واحد في \`PLC\` (انتهاك \`Integrity\`) يوقف التبريد أو يرفع الضغط فوق الحد الآمن فيهدد **السلامة (\`Safety\`)** وحياة العاملين والمواطنين.`,
          highlightedRuleOrFormula: 'OT_Priority: Availability (A) + Safety/Integrity (I) > Confidentiality (C)',
          interactiveTakeaway: 'انقر على وحدة PLC الميدانية لمحاكاة أثر العبث بحدود الضغط وتفعيل التحويل اليدوي الآمن.',
        },
        {
          pageNumber: 3,
          type: 'defense-lab',
          title: 'مختبر المراقبة السلبية (Passive Monitoring) وضبط الوصول عن بعد',
          subtitle: 'لماذا نستخدم منفذ النسخ (SPAN Port) بدلاً من المسح النشط في OT؟',
          contentMarkdown: `### حماية وحدات PLC من الإجهاد والتوقف
- وحدات \`PLC\` صُممت للعمل 24/7 بموارد معالجة محدودة وحساسية زمنية عالية (\`Real-Time\`).
- إرسال حزم مسح نشطة أو تشغيل مضاد فيروسات ثقيل وقت الإنتاج يسبب تأخراً يوقف خط الإنتاج!
- **الحل**: مراقبة سلبية عبر نسخة من حركة المحول الشبكي (\`SPAN Port\`) وجدولة الفحص خارج أوقات الإنتاج.`,
          highlightedRuleOrFormula: 'Passive_IDS(SPAN_Port_Mirror) => Zero_Latency_Impact_On(PLC)',
          interactiveTakeaway: 'قارن في المختبر بين أثر الفحص النشط وأثر المراقبة السلبية على استقرار خط الإنتاج.',
        },
        {
          pageNumber: 4,
          type: 'case-study',
          title: 'الاستجابة للحوادث في البنية الحيوية: العزل الانتقائي والتشغيل اليدوي',
          subtitle: 'دراسة حالات محطة الغاز، مصنع الأدوية، وخط سكة الحديد',
          contentMarkdown: `### القواعد الذهبية للاستجابة في البيئة الحيوية
1. **منع الحسابات المشتركة** لضمان معرفة من غيّر إعدادات المحرك.
2. **فصل المهام في إدارة التغيير**: مراجعة تعديل \`PLC\` من مهندس التشغيل ومسؤول الأمن معاً.
3. **العزل الانتقائي بالسجلات**: عزل الأجهزة المتأثرة فقط مع تفعيل **خطة التشغيل اليدوي** قبل أي إغلاق شبكي.`,
          highlightedRuleOrFormula: 'OT_Incident_Response = Log_Scope_Analysis + Selective_Isolation + Manual_Fallback_Plan',
          interactiveTakeaway: 'لا تعزل نظاماً حيوياً كلياً دون خطة تشغيل بديلة حتى لا يتحول القرار الأمني نفسه إلى كارثة تشغيلية.',
        },
      ],
      stepByStep: [
        {
          stepNumber: 1,
          title: 'تحليل سياق الخدمة وترتيب الأصول الحرجة (Service Context & Asset Prioritization)',
          description: 'تحديد الخدمة الحرجة (إمداد المياه/الكهرباء أو الأكسجين الطبي) وترتيب الأصول الداعمة بحسب دورها في استمرار الخدمة.',
          technicalDetail: 'تقديم حماية وحدات التحكم في المضخات (PLC) على أجهزة التقارير الإدارية.',
          visualCue: 'إضاءة وحدات PLC والمضخات باللون الذهبي عالي الأولوية في المجسم ثلاثي الأبعاد.',
          codeOrCommand: 'Priority_1: Pump_PLC_Controllers | Priority_2: SCADA_HMI | Priority_3: Admin_Reporting_PC',
        },
        {
          stepNumber: 2,
          title: 'بناء التجزئة والمنطقة منزوعة السلاح الصناعية (Segmentation & IDMZ)',
          description: 'فصل شبكة التشغيل (OT) عن شبكة الأعمال (IT) عبر منطقة وسيطة (IDMZ) وجداري حماية وقوائم ACL.',
          technicalDetail: 'منع أي اتصال مباشر من IT إلى OT، وحظر أوامر الكتابة (Modbus Write) القادمة من خارج شبكة الإشراف.',
          visualCue: 'ظهور جدارين ناريين باللون الكهرماني يحيطان بخادم IDMZ الوسيط بين الطابقين.',
          codeOrCommand: 'Firewall_ACL: Deny TCP IT_Net -> OT_Net:502 | Allow TCP OT_Historian -> IDMZ_Server:443',
        },
        {
          stepNumber: 3,
          title: 'ضبط الهوية والوصول عن بعد وإدارة التغيير (AAA & Change Management)',
          description: 'إلغاء الحسابات المشتركة، وفرض MFA وتقييد الوقت والـ IP للوصول عن بعد، وإلزام مراجعة مهندس التشغيل والأمن معاً لأي تعديل.',
          technicalDetail: 'تطبيق مبدأ فصل المهام (SoD) على برمجة منطق PLC وتوثيق كل أمر في سجلات الأحداث التشغيلية.',
          visualCue: 'ظهور قفلي مصادقة مزدوجين (مهندس التشغيل + مسؤول الأمن) على وحدة برمجة PLC.',
          codeOrCommand: 'PLC_Change_Commit: Requires Sign(OT_Engineer) && Sign(Security_Officer)',
        },
        {
          stepNumber: 4,
          title: 'تفعيل المراقبة السلبية دون إرباك التشغيل (Passive IDS Monitoring)',
          description: 'ربط نظام كشف التسلل (IDS) بمنفذ النسخ (SPAN Port) على المحول الشبكي لمراقبة الأوامر الصناعية سلبياً.',
          technicalDetail: 'رصد الأنماط الضارة دون إرسال أي حزم فحص استطلاعية نشطة إلى أجهزة PLC.',
          visualCue: 'تدفق نسخة ضوئية شفافة من حركة الشبكة إلى حساس IDS الجانبي دون مساس بالمسار الميداني.',
          codeOrCommand: 'Switch_Config: monitor session 1 source vlan 100 (OT_VLAN) -> destination interface Gi0/24 (Passive_IDS)',
        },
        {
          stepNumber: 5,
          title: 'الاستجابة الانتقائية واستمرارية الخدمة والنسخ الاحتياطي المشفر (OT Response & Continuity)',
          description: 'عند رصد اختراق، تُحدد الأجهزة المتأثرة من السجلات وتُعزل وحدها مع تفعيل خطة التشغيل اليدوي واستعادة منطق PLC من نسخة احتياطية مشفرة.',
          technicalDetail: 'الحفاظ على الحد الأدنى الآمن للتوافر وعدم إيقاف المحطة بالكامل.',
          visualCue: 'عزل عقدة فرعية واحدة بغلاف أحمر مع استمرار دوران التوربينات والمضخات باللون الأخضر الآمن.',
          codeOrCommand: 'Restore_PLC_Logic --source /vault/plc_logic_encrypted.bak --verify-hash --enable-manual-override',
        },
      ],
      hotspots: [
        {
          id: 'hs-ch6-idmz-barrier',
          label: 'المنطقة الصناعية العازلة (Industrial DMZ - IDMZ)',
          title: 'فصل شبكة الأعمال (IT) عن شبكة التشغيل (OT) ومنع العبور المباشر',
          x: 0.0,
          y: 1.5,
          z: 0.5,
          coordinates: { x: 0.0, y: 1.5, z: 0.5 },
          color: '#f59e0b',
          icon: 'Layers',
          summary: 'منطقة وسيطة محمية بجدران الحماية يتم عبرها تبادل التقارير دون اتصال مباشر بأجهزة التحكم.',
          detailedExplanation: 'تمنع IDMZ المهاجم الذي يخترق حاسوباً مكتبياً في شبكة الأعمال من الوصول المباشر إلى شبكة التشغيل، وتسمح فقط بخروج قراءات الإنتاج إلى خادم وسيط تقرأ منه الإدارة.',
          mitreTactic: 'Mitigates TA0008 - Lateral Movement from IT to OT (Purdue Level 3.5)',
          defensiveControl: 'تجزئة الشبكة، جدران حماية ثنائية، وقوائم ACL تمنع أوامر القيادة من IT (ضوابط NCA OTCC-1:2022).',
        },
        {
          id: 'hs-ch6-plc-field-safety',
          label: 'وحدة التحكم الميدانية والسلامة (PLC & Safety SIS)',
          title: 'نقطة الأثر المادي وترابط سلامة البيانات (Integrity) بالسلامة التشغيلية (Safety)',
          x: -1.6,
          y: -1.1,
          z: 0.8,
          coordinates: { x: -1.6, y: -1.1, z: 0.8 },
          color: '#ef4444',
          icon: 'Cpu',
          summary: 'الأجهزة التي تحول المنطق البرمجي إلى أفعال مادية تقود المحركات والصمامات والأفران.',
          detailedExplanation: 'العبث بالأوامر الموجهة إلى PLC (كما في دودة Stuxnet أو برمجية Triton) يغير حدود الضغط أو الحرارة فيحول مسألة أمن البيانات إلى خطر مادي يهدد المعدات وحياة المواطنين.',
          mitreTactic: 'MITRE ATT&CK for ICS: T0836 Modify Parameter / T0831 Manipulation of Control',
          defensiveControl: 'إدارة التغيير بفصل المهام، النسخ الاحتياطي المشفر لمنطق PLC، والأقفال المادية.',
        },
        {
          id: 'hs-ch6-passive-ids',
          label: 'مسبار المراقبة السلبية (Passive OT IDS)',
          title: 'رصد التسلل عبر منافذ النسخ دون إرسال حزم فحص تجهد وحدات التحكم',
          x: 1.6,
          y: -1.1,
          z: 0.8,
          coordinates: { x: 1.6, y: -1.1, z: 0.8 },
          color: '#06b6d4',
          icon: 'Eye',
          summary: 'متابعة حركة بروتوكولات التشغيل (Modbus/S7) سلبياً دون التأثير على زمن الاستجابة الفوري.',
          detailedExplanation: 'في بيئة التشغيل، قد يؤدي الفحص النشط أو تشغيل مضاد فيروسات ثقيل وقت الإنتاج إلى توقف الخط الصناعي؛ لذا تُستخدم المراقبة السلبية وتُجدول الفحوص خارج أوقات الإنتاج.',
          mitreTactic: 'Detects ICS Network Reconnaissance & Unauthorized Command Injection',
          defensiveControl: 'أنظمة كشف تسلل صناعية سلبية (Passive OT IDS) وتكييف مواعيد الفحص خارج ذروة الإنتاج.',
        },
        {
          id: 'hs-ch6-service-continuity',
          label: 'وحدة استمرارية الخدمة والبديل اليدوي (Service Continuity)',
          title: 'العزل الانتقائي المحافظ على التوافر وخطط التشغيل اليدوي البديلة',
          x: 0.0,
          y: -0.2,
          z: -1.3,
          coordinates: { x: 0.0, y: -0.2, z: -1.3 },
          color: '#10b981',
          icon: 'Activity',
          summary: 'ضمان بقاء الخدمة الحيوية عاملة للمواطنين عبر العزل الجزئي المدروس والتشغيل اليدوي.',
          detailedExplanation: 'عند وقوع حادث في بيئة حيوية، تُراجع سجلات الأحداث لعزل الأجهزة المصابة وحدها دون إيقاف المحطة كاملة، وتُفعّل خطط التشغيل اليدوي (كتشغيل المضخات يدوياً من الموقع) قبل أي فصل شبكي.',
          mitreTactic: 'Resilience against T0816 Device Restart/Shutdown & Loss of Availability',
          defensiveControl: 'خطط استمرارية الخدمة، التشغيل اليدوي المحلي، وتكامل الضوابط المادية والإدارية والتقنية.',
        },
      ],
    },
    richData: {
      id: 306,
      chapter_number: 6,
      title: 'تهديدات البنى التحتية الحرجة وأنظمة التحكم الصناعي (OT / ICS)',
      subtitle: 'الفرق بين IT و OT، السلامة التشغيلية، التجزئة و IDMZ، والمراقبة السلبية',
      category: 'متقدم',
      pdfStartPage: 42,
      pdfEndPage: 49,
      description: 'يدرس هذا الفصل تأثير الهجمات على أنظمة التحكم الصناعي (ICS/PLC)، الفروق بين بيئتي IT وOT، وضوابط حماية البنية التحتية الحيوية دون تعطيل التشغيل الآمن.',
      objectives: [
        'التمييز بين بيئة تقنية المعلومات (IT) وبيئة التقنية التشغيلية (OT) من حيث الغاية والأولوية عند التعارض ونتيجة الخطأ',
        'شرح العلاقة بين السلامة التشغيلية (Safety) وسلامة البيانات (Integrity) وتقييم الأثر على المواطنين والمرضى',
        'تطبيق ضوابط التجزئة والمنطقة منزوعة السلاح الصناعية (IDMZ) وإدارة الهوية والتغيير في OT',
        'المقارنة بين المراقبة السلبية والفحص النشط وتنفيذ استجابة للحوادث تحافظ على التوافر واستمرارية الخدمة',
      ],
      sections: [
        {
          heading: '1. البنية التحتية الحيوية وأنظمة التحكم الصناعي والفرق بين IT و OT',
          content: 'يقود نظام ICS وأجهزة PLC العمليات المادية. وفي OT تتقدم أولوية التوافر وسلامة العمليات المادية على السرية لأن الخطأ يسبب ضرراً مادياً أو يمس سلامة المواطنين والمرضى.',
        },
        {
          heading: '2. التجزئة والمنطقة الصناعية منزوعة السلاح (IDMZ) وحوكمة الوصول',
          content: 'تفصل IDMZ بين شبكة الأعمال وشبكة التشغيل وتمنع الاتصال المباشر، ويُقيد الوصول عن بعد بـ MFA والوقت والعنوان، وتُمنع الحسابات المشتركة لتفعيل المحاسبة الفردية.',
        },
        {
          heading: '3. المراقبة السلبية والاستجابة للحوادث واستمرارية الخدمة',
          content: 'تُعتمد المراقبة السلبية لتجنب إجهاد وحدات PLC، وتُستخدم السجلات لعزل الأصول المتأثرة فقط مع وجود خطة تشغيل يدوية ونسخ احتياطية مشفرة لمنطق التحكم.',
        },
      ],
      tables: [
        {
          title: 'جدول 5.1: مقارنة بين بيئة تقنية المعلومات (IT) وبيئة التقنية التشغيلية (OT)',
          headers: ['الجانب', 'بيئة تقنية المعلومات (IT)', 'بيئة التقنية التشغيلية (OT)'],
          rows: [
            ['غاية الحماية', 'إبقاء البيانات سرية وسليمة', 'إبقاء العملية المادية مستمرة وآمنة'],
            ['الأولوية عند التعارض', 'السرية وسلامة البيانات', 'التوافر وسلامة العمليات المادية'],
            ['نتيجة الخطأ', 'فقد بيانات أو تأخر عمل', 'ضرر مادي أو فشل نظام'],
          ],
        },
      ],
      commonMistake: {
        mistake: 'نقل ضوابط مكتبية دون تكييف إلى بيئة التشغيل (كالفحص الكامل وقت الإنتاج)، أو عزل الأنظمة الحيوية فجأة بلا خطة تشغيل بديلة.',
        fix: 'تُكيّف مواعيد الفحص والتحديث لتكون خارج وقت الإنتاج، وتُفعّل خطط التشغيل اليدوي والتواصل البديلة قبل أي إغلاق شبكي.',
      },
      solvedExample: {
        title: 'تصميم منظومة حماية متكاملة لمحطة معالجة مياه وميناء بحري',
        given: 'تحتاج محطة معالجة مياه حيوية إلى إرسال تقارير الإنتاج إلى الإدارة مع حماية وحدات PLC للمضخات من الهجمات وضمان عدم انقطاع ضخ المياه للسكان.',
        steps: [
          '1. ترتيب الأولويات: وضع وحدات PLC للمضخات في المرتبة الأولى قبل أجهزة التقارير الإدارية.',
          '2. التجزئة و IDMZ: فصل شبكة التشغيل عن شبكة الأعمال عبر منطقة IDMZ، وضبط الجدار الناري ليمنع أي أمر قيادة من الإدارة ويسمح بخروج تقارير القراءة فقط.',
          '3. الهوية والمراقبة: إلغاء الحسابات المشتركة للفنيين، وتفعيل مراقبة سلبية عبر المحول الشبكي، وحفظ نسخ احتياطية مشفرة من منطق PLC.',
          '4. الاستمرارية: اعتماد خطة تشغيل يدوي للمضخات من الموقع عند أي تعطل في التحكم المركزي.',
        ],
        result: 'حماية وحدات التحكم الميدانية من العبور المباشر مع ضمان استمرارية ضخ المياه للسكان دون انقطاع.',
        whyItMatters: 'يجمع الضوابط المادية والإدارية والتقنية لحماية الخدمة الحرجة دون الإضرار بالتوافر.',
      },
      selfAssessment: [
        {
          question: 'علّل: لماذا تتقدم السلامة التشغيلية والتوافر على السرية في الأنظمة الحيوية؟',
          answer: 'لأن الأوامر في الأنظمة الحيوية تتحول إلى أفعال مادية، فانتهاك سلامة البيانات يغير الأوامر الموجهة للمعدات فيحول قراراً آمناً إلى خطر مادي يهدد سلامة الأشخاص والمعدات، وتوقف التوافر يقطع خدمة حيوية عن المواطنين.',
        },
        {
          question: 'قارن بين المراقبة السلبية والفحص النشط من حيث الأثر على التشغيل.',
          answer: 'المراقبة السلبية تتابع حركة الشبكة دون إرسال طلبات فحص لوحدات التحكم فلا تستهلك مواردها، بينما الفحص النشط يرسل حزماً قد تتسبب في توقف الأجهزة التشغيلية.',
        },
      ],
    },
    updated_at: COURSE_TIMESTAMP,
  },

  // =========================================================================
  // الفصل السابع: التهديدات السيبرانية الناشئة (IoT، السحابة، والذكاء الاصطناعي التوليدي و Deepfakes)
  // =========================================================================
  {
    id: 307,
    chapter_number: 7,
    title: 'التهديدات السيبرانية الناشئة (إنترنت الأشياء IoT، الحوسبة السحابية، والذكاء الاصطناعي التوليدي والتزييف العميق Deepfakes)',
    subtitle: 'تقارب IT/OT/IoT، المسؤولية المشتركة والسيادة السيبرانية، تسميم البيانات وحقن الأوامر (Prompt Injection)، والضوابط الأولية للتبني',
    description: 'دراسة شاملة للتهديدات الناشئة حتى عام 2030: تهديدات إنترنت الأشياء (IoT) والأنظمة المستقلة والروبوتات وقيد التشفير القديم، تهديدات الحوسبة السحابية ونموذج المسؤولية المشتركة والسيادة السيبرانية واعتماد الكابلات البحرية (99%)، وتهديدات الذكاء الاصطناعي التوليدي والوكيل (تسميم البيانات، حقن الأوامر Prompt Injection، تسرب الخصوصية، التزييف العميق Deepfakes)، ومقارنة تطبيق مبادئ الحماية في المجالات الثلاثة.',
    category: 'تهديدات ناشئة و AI/Cloud/IoT',
    difficulty: 'advanced',
    pdfStartPage: 50,
    pdfEndPage: 58,
    diagramKey: 'ise232-threats-7',
    diagramConfig: {
      key: 'ise232-threats-7',
      title: 'مثلث التهديدات الناشئة (IoT / Cloud / Generative AI & Agents) ومصفوفة الضوابط الأولية للتبني',
      svgType: 'AIThreats',
      nodes: ['إنترنت الأشياء والروبوتات (IoT)', 'الحوسبة السحابية والسيادة (Cloud)', 'الذكاء الاصطناعي التوليدي والوكلاء (AI Agents)', 'حواجز الحماية والتحقق البشري (Guardrails)'],
      accentColor: '#a855f7',
    },
    videoUrl: 'https://www.youtube.com/watch?v=QzX2gN7YbW0',
    videoDuration: '23:10',
    presentationUrl: '/presentations/ise232-threats-ch7.pdf',
    keyTopics: [
      'تهديدات إنترنت الأشياء (IoT): كثافة الأجهزة (العواكس والحساسات في الطاقة المتجددة السعودية) واتساع سطح الهجوم',
      'تقارب IT و OT و IoT والروبوتات (42% من المنشآت تأخذه في استراتيجيتها) وحادثة سد النرويج الكهرومائي (أبريل 2025 - 500 لتر/ثانية)',
      'هوية جهاز IoT، العزل في 3 خطوات (المنع افتراضياً والسماح استثناءً)، وقيد التحديث والتشفير القديم أمام الحوسبة الكمية (2030)',
      'الحوسبة السحابية ونموذج المسؤولية المشتركة (Shared Responsibility Model)',
      'العناصر الثلاثة بيد المنشأة في السحابة: هوية السحابة، إعدادات السحابة (Misconfiguration)، وسجلات السحابة (Audit Trails)',
      'السيادة السيبرانية (Cyber Sovereignty)، السحابة السيادية، والعناية الواجبة السيبرانية (Cyber Due Diligence)',
      'اعتماد السحابة على الكابلات البحرية (99% من حركة البيانات الدولية، بينما لا تأخذها في الحسبان إلا 18% من المنشآت، و15% للأقمار الصناعية)',
      'ثلاثية نظام الذكاء الاصطناعي (بيانات <- نموذج <- مخرجات) والأبعاد الثلاثة لأثره (الطبيعة مزدوجة الاستخدام Dual-Use: 94% محرك التغيير)',
      'ثغرات الذكاء الاصطناعي (أسرع المخاطر نمواً بنسبة 87%) وتحول مخاوف AI التوليدي بين 2025 و2026 (تسرب البيانات 34% مقابل القدرات العدائية والتزييف العميق 29%)',
      'تسميم البيانات (Data Poisoning)، وكلاء الذكاء الاصطناعي (AI Agents)، وحقن الأوامر (Prompt Injection)',
      'حواجز الحماية (Guardrails)، الدفاع بالعمق، تقييم الأمن قبل النشر (ارتفع من 37% إلى 64%)، والتحقق البشري',
      'جدول مقارنة تطبيق مبادئ الحماية الخمسة (الهوية، أقل الامتيازات، العزل، الدفاع بالعمق، قرار التبني) في IoT والسحابة وAI',
    ],
    content: `## 7.1 تهديدات إنترنت الأشياء (\`IoT\`) والأنظمة المستقلة والروبوتات

تُعد التقنيات الناشئة — وفي مقدمتها الذكاء الاصطناعي الذي عدّه **94%** من المشاركين في المسح العالمي (\`Global Cybersecurity Outlook 2026\`) أبرز محرك للتغيير في الأمن السيبراني — عاملاً حاسماً في توسيع سطح الهجوم.

- **إنترنت الأشياء (\`Internet of Things - IoT\`)**: شبكة من الأجهزة المادية المزودة بحساسات وبرامج ووسائل اتصال تجمع البيانات وتتبادلها. وكل جهاز متصل يمثل نقطة دخل ممكنة؛ وفي السياق السعودي يزداد حضور هذه المنظومات مع التوسع في مشروعات الطاقة المتجددة المكونة من عواكس (\`Inverters\`) وحساسات متصلة بالسحابة.
- **تقارب \`IT / OT / IoT / Robotics\`**: اجتماع أنظمة المكاتب والتشغيل الصناعي والأجهزة المتصلة والروبوتات في منظومة واحدة مترابطة. وتأخذه في استراتيجيتها **42%** من المنشآت (بعد الهجمات الجيوسياسية **64%** والمعلومات المضللة **49%** وقبل الكوارث الطبيعية **41%**).
- **المخاطر السيبرانية المادية (\`Cyber-Physical Risks\`)**: تنشأ حين تنفذ الآلة قراراً يغير شيئاً في العالم المادي خلال ثوانٍ. **مثال واقعي من المقرر**: في **أبريل 2025** اخترق مهاجمون سداً كهرومائياً في النرويج فانفتحت بوابة تصريف وتدفق **500 لتر من الماء في الثانية لمدة أربع ساعات**!
- **هوية الجهاز والعزل وقيد التحديث**:
  1. **هوية جهاز \`IoT\`**: الرقم التسلسلي أو الشهادة الرقمية لمنع الأجهزة المقلدة.
  2. **خطوات العزل الثلاث**: (1) تحديد المكونات المراد عزلها، (2) عزلها بالموجهات أو البوابات أو جدران الحماية أو التشفير بمفاتيح متميزة، (3) تقييد الاتصال بسياسة **«المنع افتراضياً والسماح استثناءً» (\`Default Deny\`)** في الاتجاهين الوارد والصادر.
  3. **قيد التحديث والتشفير القديم (\`Legacy Encryption\`)**: أكبر تعرض نظامي في الأنظمة المدمجة والصناعية لصعوبة ترحيله، وتزداد خطورته مع اقتراب **التقنيات الكمية بحلول عام 2030** وضيق نافذة الترحيل الاستباقي إلى التشفير ما بعد الكمي (\`PQC\`).

---

## 7.2 التهديدات في بيئات الحوسبة السحابية (\`Cloud Computing\`)

- **نموذج المسؤولية المشتركة (\`Shared Responsibility Model\`)**: المزود مسؤول عن البنية التي يقدم منها الخدمة، والعميل مسؤول عما يضعه فيها. وأي خطأ في الجزء الذي يتولاه العميل قد يتسلسل أثره عبر منظومة المنشأة كلها.
- **العناصر الثلاثة التي تبقى في يد المنشأة داخل السحابة**:
  1. **هوية السحابة (\`Cloud Identity\`)**: حسابات الموظفين وحسابات الخدمات الآلية (\`Service Accounts\`).
  2. **إعدادات السحابة (\`Cloud Configuration\`)**: وأخطر ما يصيبها **سوء الإعداد (\`Misconfiguration\`)**، كضبط مجلد ملفات الموظفين ليفتحه كل من يملك الرابط.
  3. **سجلات السحابة (\`Cloud Audit Trails\`)**: سجلات التدقيق التي تبين من نفذ كل عملية ومتى.
- **السيادة السيبرانية (\`Cyber Sovereignty\`) والعناية الواجبة (\`Cyber Due Diligence\`)**: تطبيق حقوق السيادة التقليدية للدولة على الفضاء السيبراني للحد من مخاطر السيطرة من خارج الحدود (\`Extraterritorial Control\`). وعند تغيير الموردين على عجل، يجب إجراء **العناية الواجبة السيبرانية** وإعادة نمذجة التهديدات (\`Threat Modelling\`) قبل نقل البيانات.
- **اعتماد السحابة على الكابلات البحرية والأقمار الصناعية**: تمر عبر الكابلات البحرية (**\`Undersea Cables\`**) نحو **99%** من حركة البيانات الدولية، ومع ذلك لا تأخذها في الحسبان عند الحد من المخاطر إلا **18%** من المنشآت، ولا تأخذ الأصول الفضائية إلا **15%**!

---

## 7.3 تهديدات الذكاء الاصطناعي (\`AI\`) والوكلاء (\`AI Agents\`) والتزييف العميق (\`Deepfakes\`)

يتكون نظام الذكاء الاصطناعي من **ثلاثية**: **بيانات يتعلم منها -> نموذج يُبنى منها -> مخرجات ينتجها**. ويؤثر في الأمن السيبراني في **ثلاثة أبعاد مترابطة** تشكل **الطبيعة مزدوجة الاستخدام (\`Dual-Use\`)**:
1. **توسيع سطح الهجوم**: إضافة ثغرات جديدة (عدّ **87%** من المشاركين ثغرات الذكاء الاصطناعي أسرع المخاطر نمواً في 2025، تليها مخاطر الاحتيال والتصيد **77%**، ثم اضطراب سلسلة الإمداد **65%**).
2. **تعزيز الدفاع**: تبنت **77%** من المنشآت الذكاء الاصطناعي للدفاع السيبراني، وأبرز استخداماته الثلاثة: **كشف التصيد (52%)**، **كشف التسلل والشذوذ (46%)**، و**تحليل سلوك المستخدم (40%)**.
3. **تقوية الهجمات**: زيادة سرعة وتعقيد التصيد وتطوير البرمجيات الخبيثة و**التزييف العميق (\`Deepfakes\`)**.

### تحول مخاوف الذكاء الاصطناعي التوليدي بين عامي 2025 و 2026
- في عام **2025**: تقدم **تقدم القدرات العدائية والتزييف العميق (47%)** على **تسرب البيانات (22%)**.
- في عام **2026**: انعكس الترتيب! فتقدم **تسرب البيانات وكشف الخصوصية عبر المخرجات (34%)** على **تقدم القدرات العدائية (29%)**.

### التهديدات التقنية الخاصة بنماذج ووكلاء الذكاء الاصطناعي
- **تسميم البيانات (\`Data Poisoning\`)**: إدخال بيانات مضللة أثناء التدريب أو التعلم التكيفي لتغيير سلوك النموذج (كأداة تصنيف بلاغات تتعلم تصنيفاً خاطئاً).
- **حقن الأوامر (\`Prompt Injection\`) وتراكم امتيازات الوكلاء (\`AI Agents\`)**: إرسال طلب يحمل تعليمات مخفية تأمر الوكيل بتعديل السجلات أو تسريب البيانات، وتراكم امتيازات مفرطة لدى الوكلاء عند غياب الحوكمة.
- **مخاطر سوء التطبيق الأربعة وضوابطها**: (سوء الإعداد، التحيز، الإفراط في الأتمتة، والتلاعب العدائي) وتقابلها ضوابط: **حواجز الحماية (\`Guardrails\`)**، **الأمن بالتصميم (\`Security-by-Design\`)**، **المراقبة المستمرة**، و**التحقق البشري (\`Human-in-the-Loop\`)** كطبقة أخيرة في الدفاع بالعمق.
- **تقييم الأمن قبل النشر**: ارتفعت نسبة المنشآت التي تقيم أمن أدوات \`AI\` قبل نشرها من **37%** في 2025 إلى **64%** في 2026 (**40%** تقيمها دورياً، و**24%** تقيمها مرة واحدة، بينما يبقى نحو الثلث بلا تقييم!).

---

## 7.4 مقارنة تطبيق مبادئ الحماية في المجالات الثلاثة (جدول 6.1 في المقرر)

| المبدأ الأمني | إنترنت الأشياء (\`IoT\`) | الحوسبة السحابية (\`Cloud\`) | الذكاء الاصطناعي (\`AI\`) |
| :--- | :--- | :--- | :--- |
| **1. الهوية (\`Identity\`)** | هوية الجهاز وبيانات اعتماده (شهادة رقمية / رقم تسلسلي) | حسابات المستخدمين وحسابات الخدمات الآلية | هوية الوكيل (\`AI Agent\`) وصلاحياته |
| **2. أقل الامتيازات (\`Least Privilege\`)** | المنع افتراضياً والسماح استثناءً (\`Default Deny\`) | تضييق صلاحيات الحسابات ومراجعتها | صلاحيات محددة بحسب المهمة ومبادئ انعدام الثقة (\`Zero Trust\`) |
| **3. العزل وحدود الثقة (\`Isolation\`)** | عزل شبكات الأجهزة عن شبكة المكاتب | توزيع المسؤولية المشتركة مع المزود | **حواجز الحماية (\`Guardrails\`)** |
| **4. الدفاع بالعمق (\`Defense in Depth\`)** | الأمن بالتصميم والمراقبة المستمرة | العناية الواجبة وسجلات التدقيق (\`Audit Trails\`) | المراقبة المستمرة و**التحقق البشري** كطبقة أخيرة |
| **5. قرار التبني (\`Adoption Decision\`)** | حصر الأنظمة ذات التشفير القديم والتخطيط لترحيلها | تقييم المورد قبل نقل الاستضافة | تقييم الأداة دورياً قبل النشر وبعد كل تحديث |

### قواعد Snort/Suricata لكشف هجمات حقن الأوامر (Prompt Injection) وبوتات IoT (Mirai)

\`\`\`snort
# 1. كشف محاولة حقن أوامر (Prompt Injection) في واجهة برمجة تطبيقات المساعد الذكي (LLM API)
alert http $EXTERNAL_NET any -> $HOME_NET $HTTP_PORTS (msg:"[AI-THREAT] LLM Prompt Injection & Guardrail Bypass Attempt"; flow:to_server,established; content:"POST"; http_method; content:"Ignore previous instructions"; nocase; http_client_body; classtype:web-application-attack; sid:7000701; rev:1;)

# 2. كشف محاولة اختراق أجهزة إنترنت الأشياء عبر منافذ Telnet الافتراضية (IoT Botnet Propagation)
alert tcp $EXTERNAL_NET any -> $IOT_VLAN 23 (msg:"[IOT-THREAT] Unauthorized Telnet Default Credential Brute Force on IoT Device"; flow:to_server,established; content:"root"; depth:10; classtype:attempted-admin; sid:7000702; rev:1;)
\`\`\``,
    images: [
      {
        prompt: 'Emerging cyber threats IoT cloud computing generative AI prompt injection guardrails, 16:9',
        caption: 'توسع سطح الهجوم في إنترنت الأشياء والحوسبة السحابية والذكاء الاصطناعي التوليدي',
        alt: 'Emerging cyber threats IoT Cloud AI',
        seed: 3071,
        isAIGenerated: true,
      },
      {
        prompt: 'AI security defense in depth guardrails human in the loop data poisoning protection, 16:9',
        caption: 'منظومة الدفاع بالعمق في الذكاء الاصطناعي: حواجز الحماية (Guardrails) والتحقق البشري',
        alt: 'AI defense in depth and guardrails',
        seed: 3072,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'إنترنت الأشياء والروبوتات توسع سطح الهجوم وتقارب IT/OT/IoT يضاعف المخاطر المادية',
        subtitle: 'كثافة الحساسات، حادثة سد النرويج 2025، وخطر التشفير القديم أمام الحوسبة الكمية 2030',
        bullets: [
          'كل جهاز IoT متصل (كالعواكس والحساسات في مشروعات الطاقة المتجددة السعودية) يمثل نقطة دخل إضافية.',
          'تقارب IT/OT/IoT والروبوتات تأخذه 42% من المنشآت في استراتيجيتها؛ وفي أبريل 2025 اخترق سد في النرويج فتدفق 500 لتر/ثانية لمدة 4 ساعات.',
          'يُطبق عزل شبكات IoT بثلاث خطوات تنتهي بسياسة «المنع افتراضياً والسماح استثناءً» في الاتجاهين الوارد والصادر.',
          'التشفير القديم (Legacy Encryption) في الأنظمة المدمجة أكبر تعرض نظامي مع اقتراب التهديد الكمي بحلول عام 2030.',
        ],
        keyHighlight: 'حماية الأنظمة المستقلة والروبوتات تتطلب الأمن بالتصميم، وضوابط وصول قوية للتفاعل بين الإنسان والروبوت، ومراقبة مستمرة.',
        visualType: 'architecture',
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'أمن الحوسبة السحابية يرتكز على المسؤولية المشتركة والسيادة السيبرانية والعناية الواجبة',
        subtitle: 'الهوية والإعدادات والسجلات، ومخاطر الكابلات البحرية (99% من حركة البيانات)',
        bullets: [
          'نموذج المسؤولية المشتركة: المزود يحمي البنية، والعميل يحمي الهوية والإعدادات والسجلات؛ وأخطر ما يصيبها سوء الإعداد (Misconfiguration).',
          'السيادة السيبرانية تطبق ولاية الدولة القضائية على الفضاء السيبراني للحد من السيطرة على البيانات من خارج الحدود.',
          'العناية الواجبة السيبرانية (Cyber Due Diligence): وجوب التقييم الأمني وإعادة نمذجة التهديدات قبل الانتقال لمزود استضافة بديل.',
          'تحمل الكابلات البحرية 99% من حركة البيانات الدولية، لكن لا تأخذها في الحسبان إلا 18% من المنشآت (و15% للأقمار الصناعية).',
        ],
        keyHighlight: 'إعداد خاطئ واحد في السحابة (كفتح مجلد لكل من يملك الرابط أو نسيان حساب خدمة قديم) قد يتسلسل أثره عبر المنشأة كلها.',
        visualType: 'comparison',
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'الذكاء الاصطناعي ذو طبيعة مزدوجة الاستخدام وثغراته أسرع المخاطر نمواً بنسبة 87%',
        subtitle: 'ثلاثية (بيانات <- نموذج <- مخرجات) وتحول المخاوف في 2026 نحو تسرب البيانات',
        bullets: [
          'يتكون نظام AI من: بيانات يتعلم منها، ونموذج يُبنى منها، ومخرجات ينتجها، ويعده 94% أبرز محرك للتغيير السيبراني.',
          'الأبعاد الثلاثة (Dual-Use): توسيع سطح الهجوم، تعزيز الدفاع (77% من المنشآت تستخدمه للدفاع)، وتقوية الهجمات (التصيد والتزييف العميق).',
          'في 2025 تصدرت القدرات العدائية المخاوف (47% مقابل 22% للتسرب)، وفي 2026 انعكس الترتيب فتصدر تسرب البيانات (34% مقابل 29%).',
          'تسميم البيانات (Data Poisoning) يدخل بيانات مضللة لتغيير سلوك النموذج التكيفي أثناء التدريب أو التشغيل.',
        ],
        keyHighlight: 'انتقل التركيز الأمني العالمي في 2026 إلى حماية الخصوصية ومنع كشف البيانات الحساسة دون قصد عبر مخرجات النماذج التوليدية.',
        visualType: 'matrix',
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'وكلاء الذكاء الاصطناعي (AI Agents) يواجهون مخاطر حقن الأوامر وتراكم الامتيازات المفرطة',
        subtitle: 'تطبيق أقل الامتيازات، انعدام الثقة (Zero Trust)، حواجز الحماية (Guardrails)، والتحقق البشري',
        bullets: [
          'بدون حوكمة قوية، تتراكم لدى وكلاء AI امتيازات مفرطة، أو يُتلاعب بهم عبر حقن الأوامر (Prompt Injection).',
          'تُقابل مخاطر سوء التطبيق (سوء الإعداد، التحيز، الإفراط في الأتمتة، التلاعب العدائي) بحواجز الحماية (Guardrails) والأمن بالتصميم.',
          'الدفاع بالعمق في AI يجعل التحقق البشري (Human-in-the-Loop) الطبقة الأخيرة لأن AI محدود في فهم السياق الاستراتيجي.',
          'ارتفع تقييم أمن أدوات AI قبل النشر من 37% في 2025 إلى 64% في 2026 (40% تقييم دوري و24% لمرة واحدة).',
        ],
        keyHighlight: 'الإفراط في الأتمتة غير المحكومة يخلق نقاطاً عمياء؛ لذا يجب أن يراجع محلل بشري قرارات العزل الحرجة التي يقترحها الذكاء الاصطناعي.',
        visualType: 'flow',
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'الضوابط الأولية الخمسة تتكرر عبر IoT والسحابة والذكاء الاصطناعي قبل التشغيل',
        subtitle: 'مقارنة الهوية وأقل الامتيازات والعزل والدفاع بالعمق وقرار التبني',
        bullets: [
          'الهوية: شهادة جهاز IoT | حسابات المستخدمين والخدمات في السحابة | هوية الوكيل وصلاحياته في AI.',
          'أقل الامتيازات: المنع افتراضياً في IoT | تضييق صلاحيات الحسابات في السحابة | صلاحيات بحسب المهمة في AI.',
          'العزل وحدود الثقة: عزل شبكات IoT | توزيع المسؤولية مع مزود السحابة | حواجز الحماية (Guardrails) في AI.',
          'قرار التبني: خطة ترحيل التشفير القديم في IoT | تقييم المورد السحابي قبل النقل | التقييم الدوري لأداة AI قبل النشر.',
        ],
        keyHighlight: 'جميع الضوابط الأولية للتقنيات الناشئة تُصمم وتُختبر قبل التشغيل الفعلي في النظام الخدمي لا بعد وقوع الحادث.',
        visualType: 'snort',
      },
    ],
    flashcards: [
      {
        front: 'ما هي خطوات تطبيق العزل (Isolation) الثلاث في شبكات إنترنت الأشياء (IoT)؟',
        back: '1) تحديد المكونات والوظائف المراد عزلها، 2) عزلها بالموجهات أو البوابات أو جدران الحماية أو التشفير، 3) تطبيق سياسة «المنع افتراضياً والسماح استثناءً» في الاتجاهين الوارد والصادر.',
        category: 'إنترنت الأشياء IoT',
      },
      {
        front: 'ما العناصر الثلاثة التي تبقى في يد المنشأة داخل البيئة السحابية وفق نموذج المسؤولية المشتركة؟',
        back: '1) هوية السحابة (حسابات الموظفين والخدمات)، 2) إعدادات السحابة (تحديد أين تُحفظ البيانات ومن يصل إليها)، 3) سجلات السحابة (سجلات التدقيق Audit Trails).',
        category: 'الحوسبة السحابية',
      },
      {
        front: 'ما المقصود بالطبيعة مزدوجة الاستخدام (Dual-Use) للذكاء الاصطناعي في الأمن السيبراني؟',
        back: 'أنه يضاعف قوة الدفاع (في كشف التصيد والشذوذ والأتمتة) ويحفز المهاجمين ويقوي هجماتهم (في تسريع كتابة رسائل التصيد والتزييف العميق) في الوقت نفسه.',
        category: 'الذكاء الاصطناعي',
      },
      {
        front: 'كيف انعكس ترتيب أبرز مخاوف الذكاء الاصطناعي التوليدي بين عامي 2025 و 2026؟',
        back: 'في عام 2025 تقدم تقدمُ القدرات العدائية (47%) على تسرب البيانات (22%)؛ وفي عام 2026 انعكس الترتيب فتقدم تسربُ البيانات وكشف الخصوصية (34%) على القدرات العدائية (29%).',
        category: 'إحصاءات 2025-2026',
      },
      {
        front: 'ما الفرق بين تسميم البيانات (Data Poisoning) وحقن الأوامر (Prompt Injection) في الذكاء الاصطناعي؟',
        back: 'تسميم البيانات هو إدخال بيانات مضللة أثناء التدريب أو التعلم لتغيير سلوك النموذج، بينما حقن الأوامر هو دس تعليمات مخفية في المدخلات لدفع النموذج أو الوكيل لتنفيذ فعل غير مصرح به.',
        category: 'تهديدات AI',
      },
      {
        front: 'كيف يُطبق ضابط «قرار التبني» قبل التشغيل في كل من: إنترنت الأشياء، الحوسبة السحابية، والذكاء الاصطناعي؟',
        back: 'في IoT: حصر الأنظمة ذات التشفير القديم والتخطيط لترحيلها؛ وفي السحابة: تقييم المورد قبل نقل الاستضافة؛ وفي AI: تقييم الأداة أمنياً ودورياً قبل النشر.',
        category: 'الضوابط الأولية',
      },
    ],
    miniQuiz: [
      {
        question: 'وفق إحصاءات كتاب المقرر (Global Cybersecurity Outlook 2026)، كم تبلغ نسبة حركة البيانات الدولية التي تمر عبر الكابلات البحرية (Undersea Cables)، وكم نسبة المنشآت التي تأخذها في الحسبان عند الحد من المخاطر؟',
        options: [
          'تمر عبرها 99% من حركة البيانات الدولية، ولا تأخذها في الحسبان إلا 18% من المنشآت (و15% للأصول الفضائية)',
          'تمر عبرها 10% فقط من حركة البيانات الدولية، وتأخذها في الحسبان 95% من المنشآت',
          'تمر عبرها 50% من حركة البيانات الدولية، ولا تتأثر بها الحوسبة السحابية إطلاقاً',
          'تمر عبرها 25% من حركة البيانات الدولية، وتدار بالكامل عبر بروتوكول LLMNR المحلي',
        ],
        correctIndex: 0,
        explanation: 'نص كتاب المقرر (صفحة 53 و58) على أن 99% من حركة البيانات الدولية تمر عبر الكابلات البحرية، ومع ذلك لا تأخذها في الحسبان إلا 18% من المنشآت، ولا تأخذ الأصول الفضائية إلا 15%.',
      },
      {
        question: 'ما الحادثة الواقعية التي أوردها كتاب المقرر في شهر أبريل 2025 كمثال على المخاطر السيبرانية المادية (Cyber-Physical Risks) للأنظمة المتصلة؟',
        options: [
          'اختراق سد كهرومائي في النرويج أدى لانفتاح بوابة تصريف وتدفق 500 لتر من الماء في الثانية لمدة أربع ساعات',
          'انتشار فيروس الماكرو Concept في مستندات Microsoft Word عام 1995',
          'تعطل طابعة محلية في مكتب استقبال بسبب نفاد الحبر',
          'تغيير خلفية شاشة حاسوب شخصي غير متصل بالإنترنت',
        ],
        correctIndex: 0,
        explanation: 'أورد كتاب المقرر (صفحة 52) حادثة اختراق السد الكهرومائي في النرويج في أبريل 2025 وتدفق 500 لتر/ثانية لمدة 4 ساعات كمثال حي على المخاطر السيبرانية المادية.',
      },
      {
        question: 'وكيل ذكاء اصطناعي (AI Agent) مهمته فرز الطلبات الواردة، وصله طلب يحمل تعليمات مخفية تأمره بتعديل سجل الطلبات ومنح صلاحيات إدارية. ما اسم هذا التهديد وما الضوابط التي تعالجه؟',
        options: [
          'حقن الأوامر (Prompt Injection)، ويعالج بحواجز الحماية (Guardrails) ومبدأ أقل الامتيازات وانعدام الثقة والتحقق البشري',
          'إغراق SYN (SYN Flood)، ويعالج بتفعيل كوكيز SYN على الموجه',
          'نقل المنطقة (Zone Transfer)، ويعالج بتعطيل المنفذ 21 في خادم الملفات',
          'تسميم ARP المحلي، ويعالج بتغيير أقفال غرفة الخوادم المادية فقط',
        ],
        correctIndex: 0,
        explanation: 'التعليمات المخفية داخل المدخلات التي تتلاعب بوكيل الذكاء الاصطناعي تُسمى حقن الأوامر (Prompt Injection)، وتعالج بحواجز الحماية (Guardrails) وتحديد صلاحيات الوكيل بمبدأ أقل الامتيازات والتحقق البشري.',
      },
      {
        question: 'ما أبرز ثلاثة استخدامات دفاعية للذكاء الاصطناعي في المنشآت التي تبنته لأغراض الأمن السيبراني (77% من المنشآت) مرتبة حسب نسبتها في المقرر؟',
        options: [
          'كشف التصيد (52%)، يليه كشف التسلل والشذوذ (46%)، يليه تحليل سلوك المستخدم (40%)',
          'إلغاء النسخ الاحتياطي (90%)، وإيقاف التشفير (80%)، وحذف سجلات التدقيق (70%)',
          'كتابة عقود الموارد البشرية (60%)، وصيانة المكيفات (30%)، وتصميم الشعارات (10%)',
          'تشغيل بروتوكول Telnet (55%)، وتفعيل LLMNR (45%)، وإلغاء MFA (35%)',
        ],
        correctIndex: 0,
        explanation: 'وفق الشكل 6.7 في كتاب المقرر (صفحة 56)، فإن أبرز استخدامات الذكاء الاصطناعي في الدفاع السيبراني هي: كشف التصيد (52%)، كشف التسلل والشذوذ (46%)، وتحليل سلوك المستخدم (40%).',
      },
    ],
    interactiveBook3D: {
      model3DType: 'ai_iot_cloud_nexus',
      shaderEffect: 'quantum_neural_wave',
      cameraPosition: { x: 0, y: 2.3, z: 5.8 },
      autoRotateSpeed: 1.4,
      primaryNeonColor: '#a855f7',
      secondaryNeonColor: '#06b6d4',
      pages3D: [
        {
          pageNumber: 1,
          type: 'overview',
          title: 'تقاطع التهديدات الناشئة: إنترنت الأشياء، السحابة، والذكاء الاصطناعي',
          subtitle: 'تمثيل ثلاثي الأبعاد لتقارب IT/OT/IoT/Robotics (42%) وثلاثية AI',
          contentMarkdown: `### العقد الثلاث لتوسع سطح الهجوم حتى عام 2030
يجسد المجسم ثلاثي الأبعاد شبكة عصبية تربط بين:
1. **عقدة إنترنت الأشياء والروبوتات (IoT & Robotics)**: كثافة الحساسات وقيد التشفير القديم أمام الحوسبة الكمية.
2. **عقدة السحابة السيادية (Cloud & Sovereignty)**: نموذج المسؤولية المشتركة واعتماد الكابلات البحرية (**99%**).
3. **عقدة الذكاء الاصطناعي والوكلاء (AI & Agents)**: ثلاثية (البيانات -> النموذج -> المخرجات) وحواجز الحماية (\`Guardrails\`).`,
          highlightedRuleOrFormula: 'Emerging_Attack_Surface = IoT_Density + Cloud_Dependencies + AI_Agent_Autonomy',
          interactiveTakeaway: 'تفاعل مع العقد الثلاث لاستكشاف كيف تتكرر مبادئ الحماية الخمسة (الهوية، أقل الامتيازات، العزل، الدفاع بالعمق، قرار التبني) في كل مجال.',
        },
        {
          pageNumber: 2,
          type: 'anatomy',
          title: 'تشريح هجمات الذكاء الاصطناعي: تسميم البيانات وحقن الأوامر',
          subtitle: 'كيف يُخترق النموذج التكيفي وكيف يُخدع الوكيل الذكي؟',
          contentMarkdown: `### مساران للهجوم على ثلاثية الذكاء الاصطناعي
- **Data Poisoning (على مرحلة البيانات/التعلم)**: دسّ بلاغات مضللة أثناء التدريب لتغيير سلوك التصنيف.
- **Prompt Injection (على مرحلة المدخلات/الوكيل)**: دسّ أوامر خفية في طلب المستخدم لدفع الوكيل لتعديل السجلات أو تسريب بيانات شخصية (أبرز مخاوف 2026 بنسبة **34%**).`,
          highlightedRuleOrFormula: 'Safe_AI_Output = Human_Verification( Guardrails( Model( Clean_Training_Data ) ) )',
          interactiveTakeaway: 'انقر على عقدة الوكيل الذكي لمشاهدة كيف توقف حواجز الحماية (Guardrails) ومبدأ أقل الامتيازات هجوم حقن الأوامر.',
        },
        {
          pageNumber: 3,
          type: 'defense-lab',
          title: 'مختبر عزل إنترنت الأشياء والمسؤولية المشتركة في السحابة',
          subtitle: 'سياسة المنع افتراضياً (Default Deny) وتدقيق إعدادات السحابة',
          contentMarkdown: `### خطوات العزل الثلاث في IoT وضبط السحابة
1. تحديد الحساسات والعواكس في محطة الطاقة.
2. فصلها بجدار حماية عن شبكة المكاتب.
3. تطبيق **المنع افتراضياً والسماح استثناءً** (السماح بالاتصال بخادم التجميع وحده).`,
          highlightedRuleOrFormula: 'IoT_Firewall_Policy: Default=DENY_ALL | Exception=ALLOW(Sensor -> Collector_Server:8883/TLS)',
          interactiveTakeaway: 'شاهد كيف بقي اختراق حاسوب موظف في المكاتب محصوراً ولم يصل إلى حساسات محطة المياه بفضل العزل.',
        },
        {
          pageNumber: 4,
          type: 'case-study',
          title: 'مصفوفة الضوابط الأولية قبل تبني التقنيات الناشئة',
          subtitle: 'تقييم الأداة قبل النشر (64%)، خطة ترحيل التشفير القديم، والعناية الواجبة',
          contentMarkdown: `### شروط التبني الآمن في نظام خدمي
- قبل نشر مساعد ذكي للرد على المستفيدين:
  1. يُجرى **تقييم أمني قبلي ودوري** للأداة.
  2. تُقيّد صلاحيات الوكيل بـ **القراءة فقط** (أقل الامتيازات + انعدام الثقة).
  3. تُراجع ردوده ومقترحاته **مراجعة بشرية (Human-in-the-Loop)**.`,
          highlightedRuleOrFormula: 'Adoption_Gate = Pre_Deployment_Assessment + Least_Privilege + Continuous_Monitoring',
          interactiveTakeaway: 'نحو ثلث المنشآت (36%) لا تزال تنشر أدوات AI دون تقييم أمني، مما يعرضها لمخاطر نظامية جسيمة.',
        },
      ],
      stepByStep: [
        {
          stepNumber: 1,
          title: 'الخطوة 1: تقييم التبني والعناية الواجبة وحصر التشفير القديم (Pre-Adoption Assessment)',
          description: 'إجراء تقييم أمني لأداة الذكاء الاصطناعي ومزود السحابة قبل النشر، وحصر أجهزة IoT ذات التشفير القديم لترحيلها قبل 2030.',
          technicalDetail: 'تجنب التسرع في نقل الاستضافة أو نشر أدوات AI دون فحص أمني مسبق.',
          visualCue: 'مرور العقد الثلاث عبر بوابة فحص ليزرية بنفسجية قبل السماح بدخولها بيئة الإنتاج.',
          codeOrCommand: 'Pre_Deploy_Check: AI_Tool_Evaluated=TRUE | Cloud_Vendor_DueDiligence=PASS | IoT_PQC_Migration_Plan=ACTIVE',
        },
        {
          stepNumber: 2,
          title: 'الخطوة 2: تثبيت الهويات وتطبيق أقل الامتيازات وانعدام الثقة (Identity & Zero Trust)',
          description: 'منح كل جهاز IoT شهادة رقمية فريدة، وتضييق صلاحيات حسابات الخدمات السحابية، وتقييد وكيل AI بصلاحية القراءة فقط.',
          technicalDetail: 'منع تراكم الامتيازات المفرطة لدى وكلاء الذكاء الاصطناعي ومعاملة كل تفاعل على أنه غير موثوق افتراضياً.',
          visualCue: 'توهج أقفال الهوية الرقمية على كل جهاز IoT ووكيل AI في المجسم ثلاثي الأبعاد.',
          codeOrCommand: 'AI_Agent_Policy: Role="Inventory_Dashboard_Updater" -> Allow:[READ_INVENTORY] | Deny:[DELETE, WRITE_USERS]',
        },
        {
          stepNumber: 3,
          title: 'الخطوة 3: العزل الشبكي وحواجز الحماية (Isolation & AI Guardrails)',
          description: 'عزل شبكات IoT بسياسة المنع افتراضياً، وتفعيل حواجز الحماية (Guardrails) لفلترة مدخلات ومخرجات النموذج الذكي.',
          technicalDetail: 'إحباط هجمات حقن الأوامر (Prompt Injection) ومنع تسرب البيانات الشخصية (PII) في إجابات المساعد الذكي.',
          visualCue: 'تشكّل درع سداسي حول نموذج الذكاء الاصطناعي يصفي الأوامر المحقونة باللون الأحمر.',
          codeOrCommand: 'Guardrail_Filter: Block_Input_Pattern("Ignore previous instructions") && Redact_Output_PII(National_ID, Phone)',
        },
        {
          stepNumber: 4,
          title: 'الخطوة 4: حماية بيانات التدريب ومنع تسميم البيانات (Data Poisoning Defense)',
          description: 'تأمين بيانات تدريب النموذج بالتشفير والمصادقة القوية وفحص البلاغات المدخلة لمنع تسميم عمليات التعلم التكيفي.',
          technicalDetail: 'التحقق من سلامة مجموعات البيانات قبل إعادة تدريب أو تخصيص النموذج.',
          visualCue: 'فحص حزم البيانات المتدفقة إلى قلب النموذج واستبعاد العقد المسمومة.',
          codeOrCommand: 'Verify_Training_Dataset --sha256-manifest --outlier-sanitization=strict',
        },
        {
          stepNumber: 5,
          title: 'الخطوة 5: الدفاع بالعمق والمراقبة المستمرة والتحقق البشري (Human-in-the-Loop)',
          description: 'تفعيل سجلات التدقيق السحابية والمراقبة المستمرة، واشتراط موافقة المحلل البشري قبل تنفيذ أي إجراء عزل يقترحه الذكاء الاصطناعي.',
          technicalDetail: 'معالجة نقاط العمى الناتجة عن الإفراط في الأتمتة عبر الجمع بين سرعة AI وحكمة السياق البشري.',
          visualCue: 'ظهور شاشة اعتماد المحلل البشري كطبقة حماية أخيرة تحيط بالمنظومة الكاملة.',
          codeOrCommand: 'AI_Action_Proposal("Isolate_Host_10.20.30.14") -> Status: PENDING_HUMAN_ANALYST_APPROVAL',
        },
      ],
      hotspots: [
        {
          id: 'hs-ch7-iot-robotics-isolation',
          label: 'عقدة إنترنت الأشياء والروبوتات (IoT & Cyber-Physical)',
          title: 'كثافة الأجهزة، سياسة المنع افتراضياً، وقيد التشفير القديم (2030)',
          x: -1.7,
          y: 1.3,
          z: 0.6,
          coordinates: { x: -1.7, y: 1.3, z: 0.6 },
          color: '#06b6d4',
          icon: 'Cpu',
          summary: 'حماية الحساسات والعواكس والروبوتات بهوية الجهاز والعزل الصارم وخطة الترحيل ما بعد الكمي.',
          detailedExplanation: 'كل جهاز IoT يوسع سطح الهجوم، وتقارب IT/OT/IoT يخلق مخاطر مادية فورية (كحادثة سد النرويج 2025). يُحمى بعزل الشبكات بسياسة المنع افتراضياً والسماح استثناءً، والتخطيط لترحيل التشفير القديم قبل عام 2030.',
          mitreTactic: 'TA0001 / TA0040 - Exploit Public-Facing Application & Cyber-Physical Impact',
          defensiveControl: 'هوية الجهاز الرقمية، العزل الشبكي (Default Deny)، والأمن بالتصميم للأنظمة المستقلة.',
        },
        {
          id: 'hs-ch7-cloud-sovereignty',
          label: 'سحابة المسؤولية المشتركة والسيادة (Cloud & Sovereignty)',
          title: 'حوكمة الهوية والإعدادات والسجلات، السيادة السيبرانية، والكابلات البحرية',
          x: 1.7,
          y: 1.3,
          z: 0.6,
          coordinates: { x: 1.7, y: 1.3, z: 0.6 },
          color: '#3b82f6',
          icon: 'Server',
          summary: 'منع سوء الإعداد السحابي، وتطبيق العناية الواجبة على الموردين، وتأمين السيادة على البيانات.',
          detailedExplanation: 'تبقى الهوية والإعدادات والسجلات بيد المنشأة في السحابة، وأي سوء إعداد يتسلسل عبر المنشأة. كما تتطلب السيادة السيبرانية حماية البيانات من السيطرة العابرة للحدود ومراعاة مخاطر الكابلات البحرية (99% من الحركة الدولية).',
          mitreTactic: 'TA0001 / TA0005 - Cloud Accounts (T1078.004) & Cloud Misconfiguration',
          defensiveControl: 'نموذج المسؤولية المشتركة، سجلات التدقيق، والعناية الواجبة قبل نقل الاستضافة.',
        },
        {
          id: 'hs-ch7-ai-poisoning-injection',
          label: 'نواة الذكاء الاصطناعي والوكلاء (AI & Prompt Injection)',
          title: 'تسميم البيانات، حقن الأوامر، وتسرب الخصوصية عبر المخرجات التوليدية',
          x: -1.5,
          y: -1.2,
          z: 0.8,
          coordinates: { x: -1.5, y: -1.2, z: 0.8 },
          color: '#a855f7',
          icon: 'Sparkles',
          summary: 'حماية ثلاثية (البيانات، النموذج، المخرجات) من التلاعب العدائي وتراكم امتيازات الوكلاء.',
          detailedExplanation: 'تعد ثغرات AI أسرع المخاطر نمواً (87%)، وتصدر تسرب البيانات مخاوف 2026 (34%). يُهاجم النموذج بتسميم بيانات التدريب أو حقن الأوامر المخفية في الوكلاء، ويُحمى بحواجز الحماية (Guardrails) وأقل الامتيازات.',
          mitreTactic: 'MITRE ATLAS: AML.T0020 Poison Training Data & AML.T0051 LLM Prompt Injection',
          defensiveControl: 'حواجز الحماية (Guardrails)، تقييد صلاحيات الوكيل (Zero Trust)، وتقييم الأداة قبل النشر.',
        },
        {
          id: 'hs-ch7-human-in-the-loop',
          label: 'حلقة التحقق البشري والدفاع بالعمق (Human-in-the-Loop)',
          title: 'التحقق البشري كطبقة أخيرة لمعالجة نقاط العمى في الأتمتة الذكية',
          x: 1.5,
          y: -1.2,
          z: 0.8,
          coordinates: { x: 1.5, y: -1.2, z: 0.8 },
          color: '#10b981',
          icon: 'ShieldCheck',
          summary: 'الجمع بين سرعة الذكاء الاصطناعي في كشف التصيد والشذوذ وحكمة الإنسان في فهم السياق.',
          detailedExplanation: 'رغم تفوق AI في المهام الكثيفة (كشف التصيد 52% وكشف الشذوذ 46%)، فإنه محدود في فهم السياق الاستراتيجي؛ لذا يوجب الدفاع بالعمق وضع التحقق البشري طبقة أخيرة قبل تنفيذ قرارات الاستجابة الحرجة.',
          mitreTactic: 'Defense-in-Depth & Collaborative Security-by-Design',
          defensiveControl: 'مراجعة المحلل البشري لاستجابات النظام الآلي قبل تنفيذها، والتقييم الدوري بعد كل تحديث.',
        },
      ],
    },
    richData: {
      id: 307,
      chapter_number: 7,
      title: 'التهديدات السيبرانية الناشئة (IoT، السحابة، والذكاء الاصطناعي)',
      subtitle: 'توسع سطح الهجوم، المسؤولية المشتركة، تهديدات AI التوليدي والوكلاء، والضوابط الأولية',
      category: 'كمومي',
      pdfStartPage: 50,
      pdfEndPage: 58,
      description: 'يستعرض هذا الفصل كيف توسع التقنيات الناشئة (إنترنت الأشياء، الحوسبة السحابية، والذكاء الاصطناعي) سطح الهجوم، وما الضوابط الأولية التي تسبق تبنيها في نظام خدمي.',
      objectives: [
        'تحليل تهديدات إنترنت الأشياء وتقارب IT/OT/IoT والروبوتات وتطبيق خطوات العزل الثلاث',
        'شرح نموذج المسؤولية المشتركة في السحابة والسيادة السيبرانية والعناية الواجبة ومخاطر الكابلات البحرية',
        'تقييم أبعاد أثر الذكاء الاصطناعي ومخاطر تسميم البيانات وحقن الأوامر وتسرب الخصوصية في 2025-2026',
        'مقارنة تطبيق مبادئ الحماية الخمسة (الهوية، أقل الامتيازات، العزل، الدفاع بالعمق، قرار التبني) في المجالات الثلاثة',
      ],
      sections: [
        {
          heading: '1. تهديدات إنترنت الأشياء (IoT) والأنظمة المستقلة والروبوتات',
          content: 'تزيد كثافة أجهزة IoT نقاط التعرض، ويضاعف تقارب IT/OT/IoT (42%) المخاطر المادية. وتُحمى بهوية الجهاز، والعزل بسياسة المنع افتراضياً والسماح استثناءً، وخطة ترحيل التشفير القديم قبل عام 2030.',
          saudiExample: 'تأمين شبكات العواكس والحساسات في مشروعات الطاقة المتجددة السعودية وروبوتات نقل الحاويات في الموانئ.',
        },
        {
          heading: '2. التهديدات في بيئات الحوسبة السحابية والسيادة السيبرانية',
          content: 'يوزع نموذج المسؤولية المشتركة المهام بين المزود والعميل (الهوية، الإعدادات، السجلات)، وتتطلب السيادة السيبرانية والعناية الواجبة تقييم الموردين قبل نقل البيانات ومراعاة اعتماد السحابة على الكابلات البحرية (99%).',
        },
        {
          heading: '3. تهديدات الذكاء الاصطناعي والوكلاء والضوابط الأولية للتبني',
          content: 'يؤثر AI في ثلاثة أبعاد (توسيع سطح الهجوم، تعزيز الدفاع، تقوية الهجمات)، ويواجه مخاطر تسميم البيانات وحقن الأوامر وتسرب البيانات (34% في 2026)، ويُضبط بحواجز الحماية (Guardrails) وأقل الامتيازات والتحقق البشري وتقييم الأداة قبل النشر.',
        },
      ],
      tables: [
        {
          title: 'جدول 6.1: مقارنة تطبيق مبادئ الحماية في المجالات الثلاثة',
          headers: ['المبدأ', 'إنترنت الأشياء (IoT)', 'الحوسبة السحابية', 'الذكاء الاصطناعي'],
          rows: [
            ['الهوية', 'هوية الجهاز وبيانات اعتماده', 'حسابات المستخدمين والخدمات', 'هوية الوكيل وصلاحياته'],
            ['أقل الامتيازات', 'المنع افتراضياً والسماح استثناءً', 'تضييق صلاحيات الحسابات', 'صلاحيات محددة بحسب المهمة'],
            ['العزل وحدود الثقة', 'عزل شبكات الأجهزة', 'توزيع المسؤولية مع المزود', 'حواجز الحماية (Guardrails)'],
            ['الدفاع بالعمق', 'الأمن بالتصميم والمراقبة المستمرة', 'العناية الواجبة وسجلات التدقيق', 'المراقبة المستمرة والتحقق البشري'],
            ['قرار التبني', 'حصر الأنظمة ذات التشفير القديم والتخطيط لترحيلها', 'تقييم المورد قبل نقل الاستضافة', 'تقييم الأداة دورياً قبل النشر'],
          ],
        },
      ],
      commonMistake: {
        mistake: 'نشر أداة ذكاء اصطناعي أو الانتقال إلى مزود استضافة سحابي بديل على عجل دون تقييم أمني مسبق، أو الإفراط في الأتمتة دون تحقق بشري.',
        fix: 'يجب إجراء تقييم أمني قبلي ودوري لأدوات AI، وممارسة العناية الواجبة السيبرانية قبل نقل الاستضافة، ووضع التحقق البشري طبقة أخيرة في الدفاع بالعمق.',
      },
      solvedExample: {
        title: 'تطبيق الضوابط الأولية قبل تشغيل مساعد ذكي في نظام خدمي',
        given: 'ترغب جهة خدمية في تشغيل مساعد آلي يعتمد على الذكاء الاصطناعي التوليدي للرد على استفسارات المستفيدين وتحديث لوحة الجرد.',
        steps: [
          '1. قرار التبني: إجراء تقييم أمني شامل للأداة قبل نشرها وجدولة إعادة تقييمها بعد كل تحديث.',
          '2. الهوية وأقل الامتيازات: منح الوكيل هوية مستقلة وصلاحية القراءة فقط من قاعدة الجرد دون صلاحية الحذف أو تعديل السجلات الحساسة.',
          '3. العزل وحواجز الحماية: وضع حواجز حماية (Guardrails) تمنع حقن الأوامر (Prompt Injection) وتمنع عرض بيانات شخصية لعملاء آخرين.',
          '4. الدفاع بالعمق والتحقق البشري: مراجعة ردود المساعد الأولى وقراراته الحرجة مراجعة بشرية مع مراقبة مستمرة وسجلات تدقيق.',
        ],
        result: 'تشغيل المساعد الذكي بأمان دون تسريب بيانات شخصية أو السماح بالتلاعب بصلاحياته.',
        whyItMatters: 'يجسد تطبيق المبادئ الخمسة في جدول 6.1 قبل التشغيل الفعلي.',
      },
      selfAssessment: [
        {
          question: 'قارن بين أبرز مخاوف الذكاء الاصطناعي التوليدي في عامي 2025 و 2026.',
          answer: 'في عام 2025 تقدم تقدمُ القدرات العدائية (47%) على تسرب البيانات (22%)؛ وفي عام 2026 انعكس الترتيب فتقدم تسربُ البيانات وكشف الخصوصية (34%) على القدرات العدائية (29%).',
        },
        {
          question: 'علّل: وجوب تحقق الإنسان من استجابات الذكاء الاصطناعي قبل تنفيذها.',
          answer: 'لأن الذكاء الاصطناعي محدود في فهم السياق واتخاذ القرارات الاستراتيجية، ولأن الإفراط في الأتمتة غير المحكومة يخلق نقاطاً عمياء قد يستغلها المهاجمون.',
        },
      ],
    },
    updated_at: COURSE_TIMESTAMP,
  },

  // =========================================================================
  // الفصل الثامن: أنظمة كشف ومنع التسلل (IDS / IPS / SIEM) ودورة الاستجابة للحوادث الأمنية
  // =========================================================================
  {
    id: 308,
    chapter_number: 8,
    title: 'أنظمة كشف ومنع التسلل (IDS / IPS / SIEM، قواعد Snort/Suricata) ودورة الاستجابة للحوادث الأمنية',
    subtitle: 'الكشف بالتوقيع والسلوك، الإيجابيات والسلبيات الكاذبة، ربط التنبيه بالأصل (BIA)، والمراحل الست للاستجابة وسلسلة الحيازة',
    description: 'دراسة تفصيلية لأنظمة كشف ومنع التسلل (IDS / IPS / NGFW / HIPS / EDR)، مؤشرات اختراق ثغرة Log4j (CVE-2021-44228)، الكشف بالتوقيع مقابل الكشف بالسلوك وخط الأساس، الإيجابيات والسلبيات الكاذبة، أنظمة SIEM (QRadar, Splunk, Azure Sentinel)، تحليل أثر الأعمال (BIA) بمحاوره الستة، وخطة ومراحل الاستجابة للحوادث الست (التحضير، الاكتشاف والتحليل، الاحتواء، الاستئصال، التعافي، والدروس المستفادة) وحفظ الأدلة وسلسلة الحيازة.',
    category: 'كشف واستجابة SOC/IR',
    difficulty: 'advanced',
    pdfStartPage: 59,
    pdfEndPage: 66,
    diagramKey: 'ise232-threats-8',
    diagramConfig: {
      key: 'ise232-threats-8',
      title: 'معمارية الكشف والمنع (IDS vs IPS & SIEM) ودورة حياة الاستجابة للحوادث الأمنية الست',
      svgType: 'IDSvsIPS',
      nodes: ['IDS (رصد وتنبيه خارج المسار)', 'IPS / NGFW (منع آلي في المسار)', 'SIEM & BIA Correlation', 'دورة الاستجابة الست وسلسلة الحيازة'],
      accentColor: '#10b981',
    },
    videoUrl: 'https://www.youtube.com/watch?v=QzX2gN7YbW0',
    videoDuration: '24:00',
    presentationUrl: '/presentations/ise232-threats-ch8.pdf',
    keyTopics: [
      'الدفاع في العمق (Defense in Depth) وتكامل الجدار الناري مع نظم الكشف والمنع',
      'المقارنة الرباعية بين نظام كشف التسلل (IDS) ونظام منع التسلل (IPS): الوظيفة، الإجراء، صاحب القرار، وموضع النشر',
      'جدران الحماية من الجيل التالي (NGFW)، إطار netfilter في نواة لينكس، وأنظمة HIPS و EDR',
      'مؤشر الاختراق (IoC) وتشريح ثغرة Log4j الشهيرة (CVE-2021-44228: السلسلة ${jndi:ldap://} في ترويسة User-Agent)',
      'الكشف المعتمد على التوقيع (Signature-based) مقابل الكشف المعتمد على السلوك (Behavior-based) وخط الأساس (Baseline)',
      'الإيجابيات الكاذبة (False Positives - إرهاق الفريق) والسلبيات الكاذبة (False Negatives - تفويت الهجوم)',
      'مصدر السجل وسياقه وأنظمة إدارة معلومات الأحداث الأمنية SIEM (QRadar, Splunk, Azure Sentinel)',
      'ربط التنبيه بالأصل وتصنيف الأولوية وفق تحليل أثر الأعمال (BIA) بمحاوره الستة (الممتلكات، المالية، السلامة، السمعة، الحياة، العملاء)',
      'تقدير درجة الخطر وترتيب التنبيهات (قوة المؤشر × قيمة الأصل × انكشافه)',
      'خطة الاستجابة للحوادث وعلاقتها بـ BCP و BIA و DRP (ذات العناصر الخمسة)',
      'المراحل الست للاستجابة للحوادث: 1) التحضير (SOC، التكرار Redundancy، SPOF، والمواقع الساخنة والدافئة والباردة)، 2) الاكتشاف والتحليل، 3) الاحتواء (العزل، Sandboxing، اللقطات Snapshots)، 4) الاستئصال والمعالجة، 5) التعافي (بما فيه البناء من الصفر)، 6) الدروس المستفادة (MITRE ATT&CK - 14 قسماً)',
      'حفظ الأدلة الرقمية (السجلات المختومة زمنياً وبصمات الرسائل Hashes)، سلسلة الحيازة (Chain of Custody)، وقياس فعالية الاستجابة وإعادة الاختبار بـ Nessus',
    ],
    content: `## 8.1 نظم الكشف عن التسلل ومنعه (\`IDS / IPS / NGFW / EDR\`)

لا تبلغ أي وسيلة أمنية فعالية 100%؛ لذلك تُنشر نظم الكشف والمنع ضمن **الدفاع في العمق (\`Defense in Depth\`)** بحيث إذا تجاوز هجوم طبقة أوقفته طبقة تليها.

### مقارنة تفصيلية بين نظام كشف التسلل (\`IDS\`) ونظام منع التسلل (\`IPS\`) (جدول 7.1 في المقرر)

| وجه المقارنة | نظام كشف التسلل (\`IDS\`) | نظام منع التسلل (\`IPS\`) |
| :--- | :--- | :--- |
| **الوظيفة الأساسية** | مراقبة الحركة لاكتشاف الهجمات | مراقبة الحركة لمنع الهجمات وإيقافها |
| **الإجراء عند الرصد** | إطلاق **تنبيه أمني (\`Security Alert\`)** لا يمس الاتصال | **إغلاق الاتصال المخالف أو إنهاء العملية المسيئة فعلياً وآلياً** |
| **صاحب القرار** | **فريق الأمن** بعد قراءة التنبيه والتحقيق فيه | **النظام نفسه** وقت الرصد |
| **موضع النشر الشبكي** | خارج المسار (لا يمس مسار الاتصال المباشر) | **في مسار الحركة المباشر (\`In-line\`)** قبل بلوغ الطلب الخدمة |

- **جدران الحماية من الجيل التالي (\`Next-Gen Firewalls - NGFW\`)**: جدران تقليدية مقترنة بنظام منع تسلل (\`IPS\`)، ويمكن بناؤها على لينكس بالجمع بين \`IPS\` وجدار يعتمد على إطار **\`netfilter\`** في نواة لينكس.
- **حماية المضيف والنقاط الطرفية (\`HIPS\` & \`EDR\`)**: يعمل \`Host-based IPS\` على الجهاز الطرفي، وعليه تقوم أدوات الكشف والاستجابة عند النقاط الطرفية (**\`EDR\`**) التي تراقب مؤشرات الاختراق، وتمسح البرمجيات الخبيثة، وتستطيع عزل الجهاز أو إيقافه.

---

## 8.2 مؤشر اختراق \`Log4j\` وأساليب الكشف (التوقيع مقابل السلوك)

- **تشريح مؤشر اختراق ثغرة \`Log4j\` (\`CVE-2021-44228\`)**: سلسلة نصية تبدأ بـ **\`\${jndi:ldap://\`** تُرسل في ترويسة \`User-Agent\` لطلب ويب، فتدفع تطبيق جافا عبر واجهة \`JNDI\` إلى الاتصال بخادم دليل خارجي عبر بروتوكول \`LDAP\` وتحميل شيفرة خبيثة منه وقراءة أسرار مخزنة في متغيرات البيئة!

### مقارنة الكشف بالتوقيع والكشف بالسلوك، والإيجابيات والسلبيات الكاذبة

| المفهوم | الآلية والمزايا | العيوب وكيفية المعالجة في مركز العمليات (\`SOC\`) |
| :--- | :--- | :--- |
| **الكشف بالتوقيع (\`Signature-based\`)** | يقارن الحركة بقاعدة توقيعات الاستغلالات المعروفة (مثل أنماط حقن \`SQL\` أو \`Log4j\`). دقيق جداً للهجمات المسجلة. | **رهين بحداثة القاعدة**؛ لا يكشف الهجمات الجديدة التي لا توقيع لها بعد. يُعالج بالتحديث المستمر والآلي للتوقيعات. |
| **الكشف بالسلوك (\`Behavior-based\`)** | يقوم على **خط الأساس (\`Baseline\`)** لما هو طبيعي في البيئة، ويرصد أي انحراف واضح عنه (مثل ارتفاع اتصالات من IP واحد لمنافذ كثيرة). | يكشف الهجمات الجديدة غير المسجلة، لكنه قد ينتج **إيجابيات كاذبة**. يُعالج بضبط القواعد بدقة على خط الأساس. |
| **الإيجابية الكاذبة (\`False Positive\`)** | أن يكتشف الحل الأمني تهديداً لا وجود له (مثال: مضاد فيروسات صنف ملفات نظام ويندوز الحرجة تهديدات وعزلها فتعطلت الأجهزة). | كثرتها **تُتعب الفريق (\`Alert Fatigue\`)** حتى يعتاد تجاهلها فيفقد الحل فائدته. تُخفض بضبط القواعد على خط الأساس. |
| **السلبية الكاذبة (\`False Negative\`)** | أن يفشل الحل الأمني في التعرف على تهديد واقع فعلاً (هجوم حقيقي بلا تنبيه). | **الأخطر** لأنها تفوّت الهجوم وتضعف الثقة. يعالجها فريق يراقب عن قرب وتعدد طبقات الدفاع في العمق. |

### قواعد Snort/Suricata لكشف استغلال ثغرة \`Log4j\` (\`CVE-2021-44228\`) وحقن \`SQL\` ومسح المنافذ

\`\`\`snort
# 1. قاعدة Snort/Suricata لكشف استغلال ثغرة Log4j (CVE-2021-44228) عبر JNDI/LDAP في ترويسة HTTP
alert http $EXTERNAL_NET any -> $HOME_NET $HTTP_PORTS (msg:"[CRITICAL-IOC] Apache Log4j CVE-2021-44228 JNDI LDAP Exploit Attempt"; flow:to_server,established; content:"\${jndi:"; nocase; http_header; pcre:"/\$\{jndi:(ldap|ldaps|rmi|dns|iiop|http|nis|nds|corba):\/\//iH"; classtype:attempted-admin; sid:8000801; rev:3;)

# 2. قاعدة IPS (Drop) لمنع وإسقاط اتصال استغلال معروف على منفذ SSH (22) في جدار الجيل التالي (NGFW)
drop tcp $EXTERNAL_NET any -> $HOME_NET 22 (msg:"[IPS-DROP] Known SSH Exploit Payload Blocked Inline"; flow:to_server,established; content:"SSH-2.0-OpenSSH_"; content:"|90 90 90 90|"; distance:0; classtype:attempted-admin; sid:8000802; rev:1;)
\`\`\`

---

## 8.3 أنظمة \`SIEM\` وتحليل أثر الأعمال (\`BIA\`) وترتيب التنبيهات

- **مصدر السجل وسياقه وأنظمة \`SIEM\`**: يجمع نظام إدارة معلومات الأحداث الأمنية (**\`SIEM\`** مثل **\`QRadar\`** و**\`Splunk\`** و**\`Azure Sentinel\`**) التنبيهات من \`IDS/IPS\` و\`EDR\` والجدار الناري في لوحة واحدة لإصدار التقارير وفتح التذاكر، فالقراءة المجمّعة تكشف ما لا يكشفه التنبيه المفرد.
- **ربط التنبيه بالأصل وتصنيف الأولوية عبر تحليل أثر الأعمال (\`BIA\`)**: يقيس **\`BIA\`** أثر انقطاع كل وظيفة على **ست جهات (محاور)**:
  1. **الممتلكات** (الأصول المادية)
  2. **المالية** (التمويل النقدي)
  3. **السلامة** (الحماية المادية)
  4. **السمعة** (المكانة)
  5. **الحياة** (الرفاه)
  6. **العملاء** (المستفيدون)
- **عوامل تقدير درجة الخطر وترتيب التنبيهات الثلاثة**:
  $$\text{Alert Priority Score} = f(\text{1. قوة المؤشر}, \text{2. قيمة الأصل وفق BIA}, \text{3. انكشاف الأصل للإنترنت})$$
  لذا يُعالج أولاً التنبيه الذي اجتمع فيه **مؤشر قوي (توقيع استغلال معروف) + أصل قيم (خادم بيانات عملاء ومالية) + مكشوف للإنترنت**!

---

## 8.4 خطة ومراحل الاستجابة للحوادث الأمنية الست وحفظ الأدلة

تستند **خطة الاستجابة للحوادث (\`Incident Response Plan - IRP\`)** إلى ثلاث خطط من استمرارية الأعمال: **تخطيط استمرارية الأعمال (\`BCP\`)**، و**تحليل أثر الأعمال (\`BIA\`)**، و**خطة التعافي من الكوارث (\`DRP\`)** التي تتكون من 5 عناصر (الغرض والنطاق، فريق التعافي، الاستعداد للكارثة، إجراءات الطوارئ أثناء الحادث، وإجراءات الاستعادة والعودة للوضع الطبيعي).

### المراحل الست للاستجابة للحوادث الأمنية

| المرحلة | الغاية الأساسية | الإجراءات والأدوات المميزة (وفق جدول 7.2 ومتن المقرر) |
| :---: | :--- | :--- |
| **1. التحضير (\`Preparation\`)** | الاستعداد قبل وقوع الحادث لتكون الاستجابة سريعة ومنظمة | يتولاه **\`SOC\`**؛ تحديد خط الأساس، النسخ الاحتياطي، إزالة نقاط الفشل المفردة (**\`SPOF\`**) عبر التكرار (**\`Redundancy\`**)، وتجهيز المواقع البديلة: **الموقع الساخن (\`Hot Site\`)** يكرر الإنتاج لحظة بلحظة، **الموقع الدافئ (\`Warm Site\`)** فيه المعدات وتحتاج تشغيلاً، و**الموقع البارد (\`Cold Site\`)** يخلو من المعدات. |
| **2. الاكتشاف والتحليل (\`Detection & Analysis\`)** | رصد الحادث والتحقق من حقيقته ونطاقه | رصد **السوابق (\`Precursors\`)** و**المؤشرات (\`Indicators\`)**، و**حفظ الأدلة الرقمية** (السجلات المختومة زمنياً وبصمات **\`Hashes\`**) وتوثيق **سلسلة الحيازة (\`Chain of Custody\`)** قبل أي تعديل أو تنظيف. |
| **3. الاحتواء (\`Containment\`)** | **إيقاف انتشار الضرر فوراً** | **عزل الأصل المصاب عن الشبكة**، العزل في بيئة محكومة (**\`Sandboxing\`**)، وأخذ اللقطات الدورية (**\`Snapshots\`**). |
| **4. الاستئصال والمعالجة (\`Eradication & Remediation\`)** | **إزالة المصدر ومنع العودة** | إزالة البرمجية الخبيثة، **تعطيل الحسابات المخترقة واستبدال الأسرار المكشوفة في متغيرات البيئة**، تطبيق التحديثات، وتحديث قواعد الجدار الناري ومؤشرات الاختراق. |
| **5. التعافي (\`Recovery\`)** | **إرجاع الخدمة إلى العمل السليم** | الإرجاع إلى لقطة سابقة (\`Snapshot\`)، أو الاستعادة من نسخة احتياطية، أو **إتلاف الأصل وإعادة البناء من الصفر** إذا تسربت البرمجية إلى النسخ الاحتياطية نفسها! |
| **6. الدروس المستفادة (\`Lessons Learned\`)** | تحسين الاستعداد ومنع التكرار | إعداد التقرير النهائي، تقييم الهجوم بإطار **\`MITRE ATT&CK\` (المكون من 14 قسماً)**، قياس فعالية الاستجابة (زمن عودة الخدمة)، و**إعادة الاختبار بعد المعالجة (\`Re-testing\`)** بماسحات الثغرات مثل **\`Nessus\`** (مقارنة الفئات الأربع: منخفضة، متوسطة، عالية، حرجة). |

> [!error]
> **خطأ حرج (حذف الأدلة قبل التوثيق)**: المسارعة إلى تنظيف الأصل أو إعادة تهيئته قبل جمع سجلاته المختومة زمنياً وحساب بصماتها (\`Hashes\`). فبذلك ينجز الفريق عمل المهاجم نيابة عنه (إذ إن محو السجلات من أساليب التهرب من الدفاعات \`Defense Evasion\` لدى المهاجم)، فيضيع أساس التقرير وتُجهل الثغرة التي دخل منها المهاجم!`,
    images: [
      {
        prompt: 'IDS vs IPS inline deployment SIEM correlation SOC incident response 6 phases, 16:9',
        caption: 'الفرق المعماري بين IDS و IPS ولوحة ربط الأحداث في SIEM ومراحل الاستجابة الست',
        alt: 'IDS vs IPS and SIEM incident response',
        seed: 3081,
        isAIGenerated: true,
      },
      {
        prompt: 'Digital forensics chain of custody hash verification hot warm cold disaster recovery sites, 16:9',
        caption: 'حفظ الأدلة الرقمية وسلسلة الحيازة (Chain of Custody) والمواقع البديلة (الساخن والدافئ والبارد)',
        alt: 'Digital forensics chain of custody and DR sites',
        seed: 3082,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'نظم IDS ترصد وتنبه خارج المسار بينما نظم IPS تمنع وتغلق الاتصال آلياً في المسار',
        subtitle: 'الدفاع في العمق، جدران الجيل التالي (NGFW / netfilter)، وأدوات EDR',
        bullets: [
          'الدفاع في العمق (Defense in Depth) يبني طبقات متقاطعة لأن أي وسيلة أمنية منفردة لا تبلغ فعالية 100%.',
          'نظام كشف التسلل (IDS): يراقب الحركة ويطلق تنبيهاً أمنياً دون مساس بالاتصال، ويترك القرار لفريق الأمن.',
          'نظام منع التسلل (IPS): يُنشر في مسار الحركة المباشر قبل بلوغ الطلب الخدمة، فيغلق الاتصال المخالف آلياً وقت الرصد.',
          'يدمج IPS في جدران الجيل التالي (NGFW) أو على المضيف (HIPS) الذي تقوم عليه أدوات النقاط الطرفية (EDR).',
        ],
        keyHighlight: 'الفارق الجوهري بين IDS و IPS يكمن في صاحب القرار (فريق الأمن مقابل النظام نفسه) وموضع النشر (خارج المسار مقابل في المسار).',
        visualType: 'comparison',
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'الكشف بالتوقيع يرصد المعلوم بدقة والكشف بالسلوك يرصد الشذوذ الجديد على خط الأساس',
        subtitle: 'ثغرة Log4j (CVE-2021-44228) ومعالجة الإيجابيات والسلبيات الكاذبة',
        bullets: [
          'مثال مؤشر اختراق: السلسلة ${jndi:ldap:// في ترويسة User-Agent لاستغلال ثغرة Log4j وتحميل شيفرة عبر LDAP.',
          'الكشف بالتوقيع يقارن الحركة بقاعدة الاستغلالات المعروفة وفعاليته رهينة بحداثة القاعدة.',
          'الكشف بالسلوك يرصد الانحراف عن خط الأساس (Baseline) الطبيعي للبيئة، فيكشف هجمات لا توقيع لها بعد.',
          'كثرة الإيجابيات الكاذبة (False Positives) ترهق الفريق حتى يتجاهل التنبيهات، بينما السلبية الكاذبة (False Negative) تفوّت الهجوم.',
        ],
        keyHighlight: 'يُخفض معدل الإيجابيات الكاذبة بضبط القواعد بدقة على خط الأساس، وتُعالج السلبيات الكاذبة بالمراقبة عن قرب وتعدد الطبقات.',
        visualType: 'snort',
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'أنظمة SIEM تجمع السياق وتحليل أثر الأعمال (BIA) يرتب أولوية التنبيهات والأصول',
        subtitle: 'المحاور الستة لـ BIA والعوامل الثلاثة لتقدير درجة خطر التنبيه',
        bullets: [
          'يجمع نظام SIEM (مثل QRadar وSplunk وAzure Sentinel) السجلات من مصادر متعددة لكشف الأنماط الواسعة.',
          'تحليل أثر الأعمال (BIA) يقيس أثر الانقطاع على 6 جهات: الممتلكات، المالية، السلامة، السمعة، الحياة، والعملاء.',
          'يحدد BIA الوظائف الأساسية ونقاط الفشل المفردة (SPOF) ليعرف مركز العمليات (SOC) أين يوجه موارده.',
          'ترتيب التنبيهات يقوم على 3 عوامل: قوة المؤشر، قيمة الأصل وفق BIA، وانكشاف الأصل للإنترنت.',
        ],
        keyHighlight: 'يُعالج أولاً التنبيه الذي يجتمع فيه مؤشر استغلال قوي وأصل مرتفع القيمة (بيانات عملاء ومالية) ومكشوف للإنترنت.',
        visualType: 'matrix',
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'الاستجابة للحوادث تبدأ بالتحضير وحفظ الأدلة وسلسلة الحيازة قبل أي تعديل على النظام',
        subtitle: 'المواقع البديلة (الساخن والدافئ والبارد) وخطأ حذف الأدلة قبل التوثيق',
        bullets: [
          'تستند خطة الاستجابة (IRP) إلى خطط استمرارية الأعمال (BCP) وتحليل الأثر (BIA) والتعافي من الكوارث (DRP).',
          'المواقع البديلة في التحضير: الموقع الساخن (Hot Site - فوري)، الموقع الدافئ (Warm Site - ساعات)، الموقع البارد (Cold Site - أطول).',
          'تُجمع الأدلة الرقمية (السجلات المختومة زمنياً) وتُحسب بصماتها (Hashes) وتُوثق سلسلة الحيازة (Chain of Custody) قبل أي إصلاح.',
          'حذف الأدلة أو إعادة تهيئة الجهاز قبل التوثيق خطأ فادح ينجز عمل المهاجم في التهرب من الدفاعات (Defense Evasion).',
        ],
        keyHighlight: 'اللقطة الأولى للنظام بحالته القائمة وقت الاشتباه هي الأدل على المشكلة ومصدرها، وتوثيق سلسلة الحيازة يجعلها حجة موثوقة.',
        visualType: 'flow',
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'الاحتواء يوقف الانتشار والاستئصال يزيل الجذور والتعافي يعيد الخدمة والدروس تمنع التكرار',
        subtitle: 'البناء من الصفر عند تلوث النسخ الاحتياطية، إطار MITRE ATT&CK، وإعادة الفحص بـ Nessus',
        bullets: [
          'الاحتواء (Containment): عزل الأصل عن الشبكة، Sandboxing، واللقطات (Snapshots) مع إبقاء الجهاز قيد التشغيل لجمع سجلاته.',
          'الاستئصال والمعالجة: إزالة البرمجية، تعطيل الحسابات المخترقة واستبدال الأسرار المكشوفة كلياً، وتطبيق التحديثات.',
          'التعافي (Recovery): الإرجاع للقطة، أو نسخة احتياطية، أو إتلاف الأصل والبناء من الصفر إذا أصابت البرمجية النسخ الاحتياطية.',
          'الدروس المستفادة: تقييم الأثر بـ MITRE ATT&CK (14 قسماً)، قياس زمن عودة الخدمة، وإعادة الاختبار بماسح الثغرات (Nessus).',
        ],
        keyHighlight: 'لا تثبت فعالية المعالجة إلا بإعادة الفحص (Re-testing) ومقارنة الفئات الأربع للثغرات (منخفضة، متوسطة، عالية، حرجة) بما قبل المعالجة.',
        visualType: 'mitre',
      },
    ],
    flashcards: [
      {
        front: 'ما الفرق بين نظام كشف التسلل (IDS) ونظام منع التسلل (IPS) من حيث صاحب القرار وموضع النشر؟',
        back: 'في IDS صاحب القرار هو فريق الأمن بعد قراءة التنبيه ولا يمس مسار الاتصال؛ أما في IPS فصاحب القرار هو النظام نفسه وقت الرصد ويُنشر في مسار الحركة المباشر ليغلق الاتصال المخالف آلياً.',
        category: 'IDS مقابل IPS',
      },
      {
        front: 'اشرح كيف يعمل مؤشر اختراق ثغرة Log4j (CVE-2021-44228).',
        back: 'سلسلة نصية تبدأ بـ ${jndi:ldap:// تُرسل في ترويسة User-Agent لطلب ويب، فتدفع التطبيق عبر واجهة JNDI للاتصال بخادم دليل خارجي (LDAP) وتحميل شيفرة خبيثة وقراءة أسرار متغيرات البيئة.',
        category: 'مؤشرات الاختراق',
      },
      {
        front: 'ما الجهات (المحاور) الست التي يقيس تحليل أثر الأعمال (BIA) أثر انقطاع الوظيفة عليها؟',
        back: '1) الممتلكات (الأصول المادية)، 2) المالية (التمويل النقدي)، 3) السلامة (الحماية المادية)، 4) السمعة (المكانة)، 5) الحياة (الرفاه)، 6) العملاء.',
        category: 'تحليل أثر الأعمال BIA',
      },
      {
        front: 'قارن بين الموقع الساخن (Hot Site) والموقع الدافئ (Warm Site) والموقع البارد (Cold Site).',
        back: 'الموقع الساخن يكرر الإنتاج لحظة بلحظة فيُتحول إليه فوراً؛ والموقع الدافئ فيه المعدات والاتصال لكنها تحتاج تشغيلاً وتجهيزاً؛ والموقع البارد يخلو من المعدات ويستغرق إعداده وقتاً أطول.',
        category: 'التحضير والتعافي',
      },
      {
        front: 'ما الفرق بين الاحتواء (Containment) والاستئصال (Eradication) والتعافي (Recovery)؟',
        back: 'الاحتواء: إيقاف انتشار الضرر بعزل الأصل عن الشبكة؛ الاستئصال: إزالة المصدر ومنع العودة بتعطيل الحسابات المخترقة والترقيع؛ التعافي: إرجاع الخدمة للعمل من نسخة احتياطية أو البناء من الصفر.',
        category: 'مراحل الاستجابة',
      },
      {
        front: 'ما هي سلسلة الحيازة (Chain of Custody) ولماذا تقترن بحساب بصمات الرسائل (Hashes)؟',
        back: 'توثيق متصل لكل دليل يبين من جمعه ومتى وأين ومن تسلّمه وما أُجري عليه؛ وتثبت البصمات (Hashes) تطابق النسخة مع الأصل وعدم العبث بها فتكون موثوقة في التحليل والإفصاح.',
        category: 'الأدلة الجنائية',
      },
    ],
    miniQuiz: [
      {
        question: 'وصلت إلى مركز العمليات الأمنية (SOC) في ساعة واحدة ثلاثة تنبيهات: (1) محاولة دخول فاشلة متكررة لبوابة، (2) استعلام شاذ على تطبيق داخلي، (3) طلب ويب يحمل توقيع استغلال معروف (Log4j) إلى خادم مكشوف للإنترنت يحوي بيانات عملاء. أيها يُعالج أولاً ولماذا؟',
        options: [
          'التنبيه الثالث أولاً؛ لأنه اجتمع فيه مؤشر قوي (توقيع استغلال معروف) وأصل مرتفع القيمة ومكشوف للإنترنت',
          'التنبيه الثاني أولاً؛ لأن التطبيقات الداخلية غير المتصلة بالإنترنت أهم من خوادم العملاء',
          'تُهمل جميع التنبيهات الثلاثة باعتبارها إيجابيات كاذبة دون فحص',
          'يُعاد تشغيل الخادم المكشوف فوراً مع حذف سجلاته قبل قراءة التنبيه',
        ],
        correctIndex: 0,
        explanation: 'تُرتب التنبيهات بثلاثة عوامل: قوة المؤشر، وقيمة الأصل وفق BIA، وانكشافه للإنترنت؛ لذا يُعالج أولاً ما اجتمع فيه مؤشر استغلال مؤكد وأصل قيم ومكشوف للإنترنت.',
      },
      {
        question: 'اكتشفت منشأة أن برمجية خبيثة بقيت كامنة في نظام البوابة الرقمية مدة طويلة حتى أصابت نسخه الاحتياطية (Backups) نفسها. ما خيار التعافي (Recovery) الصحيح الذي يضمن خلو الأصل من الاختراق؟',
        options: [
          'إتلاف الأصل المصاب وإعادة بناء البوابة من الصفر قبل إرجاعها إلى الخدمة',
          'استعادة النسخة الاحتياطية المصابة كما هي وتشغيلها على الشبكة',
          'تغيير اسم الخادم فقط مع الإبقاء على نفس الملفات والعمليات النشطة',
          'الاكتفاء بفصل الشاشة عن الخادم لمدة عشر دقائق',
        ],
        correctIndex: 0,
        explanation: 'نص كتاب المقرر (صفحة 64) على أنه إذا تسربت البرمجية الخبيثة إلى النسخ الاحتياطية نفسها، فيُتلف الأصل ويُبنى بديل من الصفر، وهو الإجراء الذي يضمن خلو الأصل من الاختراق.',
      },
      {
        question: 'أصدرت خدمة مضاد فيروسات تجارية قاعدة توقيع خاطئة صنفت ملفات نظام ويندوز الحرجة على أنها تهديدات وعزلتها، فتعطلت أجهزة كثيرة في المنشأة. ماذا تسمى هذه الحالة أمنياً؟',
        options: [
          'إيجابية كاذبة (False Positive)',
          'سلبية كاذبة (False Negative)',
          'هجوم رجل في المتصفح (Man in the Browser)',
          'تسميم ذاكرة DNS (DNS Poisoning)',
        ],
        correctIndex: 0,
        explanation: 'أورد كتاب المقرر هذا المثال (صفحة 61) لتوضيح الإيجابية الكاذبة (False Positive)، وهي أن يكتشف الحل الأمني تهديداً لا وجود له فيعزل ملفات نظام شرعية.',
      },
      {
        question: 'ما العواقب المحتملة لحذف الأدلة الرقمية أو إعادة تهيئة الجهاز المصاب قبل توثيق سجلاته؟',
        options: [
          'فقدان أساس التقرير، وجهل الثغرة التي دخل منها المهاجم، وضعف المعالجة، وإنجاز عمل المهاجم في التهرب من الدفاعات (Defense Evasion)',
          'تسريع حصول المنشأة على شهادة الامتثال وإغلاق الثغرة تلقائياً في الشيفرة المصدرية',
          'تحويل الموقع البارد (Cold Site) تلقائياً إلى موقع ساخن (Hot Site)',
          'تحديث قاعدة بيانات ماسح Nessus آلياً دون اتصال بالشبكة',
        ],
        correctIndex: 0,
        explanation: 'حذف الأدلة قبل التوثيق يجهض أساس التقرير، ولا تُعرف الثغرة التي دخل منها المهاجم، فتضعف المعالجة ويعسر الإفصاح الدقيق، وينجز الفريق بذلك عمل المهاجم الذي يمحو السجلات ليتهرّب من الدفاعات.',
      },
    ],
    interactiveBook3D: {
      model3DType: 'ids_ips_firewall_core',
      shaderEffect: 'packet_inspection_stream',
      cameraPosition: { x: 0, y: 2.2, z: 5.8 },
      autoRotateSpeed: 1.2,
      primaryNeonColor: '#10b981',
      secondaryNeonColor: '#3b82f6',
      pages3D: [
        {
          pageNumber: 1,
          type: 'overview',
          title: 'نواة فحص الحزم وكشف ومنع التسلل (IDS / IPS / NGFW Core)',
          subtitle: 'تمثيل ثلاثي الأبعاد لموضع النشر في المسار (In-line) وخارج المسار (Out-of-band)',
          contentMarkdown: `### كيف يفحص الدرع حركة الشبكة؟
يعرض المجسم ثلاثي الأبعاد مسارين لحركة الحزم الواردة من الإنترنت:
- **مسار IDS (خارج المسار)**: يأخذ نسخة من الحزم ويطلق تنبيهاً لمركز العمليات (\`SOC\`) دون قطع الاتصال.
- **مسار IPS / NGFW (في المسار المباشر)**: يفحص الحزمة قبل بلوغ الخادم؛ فإذا طابقت توقيع استغلال (مثل \`Log4j\` أو \`SSH Exploit\`) يسقطها آلياً في أجزاء من الثانية!`,
          highlightedRuleOrFormula: 'IPS_Inline_Action(Malicious_Packet) => DROP_CONNECTION() | IDS_Action => ALERT_SOC()',
          interactiveTakeaway: 'تفاعل مع بوابة NGFW لرؤية كيف تسقط حزمة استغلال المنفذ 22 قبل وصولها للخادم.',
        },
        {
          pageNumber: 2,
          type: 'anatomy',
          title: 'تشريح ثغرة Log4j (CVE-2021-44228) ومعادلة ترتيب التنبيهات',
          subtitle: 'ربط السجلات في SIEM بتحليل أثر الأعمال (BIA)',
          contentMarkdown: `### كيف تُرتب مئات التنبيهات في مركز العمليات (SOC)؟
- يرصد النظام السلسلة \`\${jndi:ldap://\` في ترويسة \`User-Agent\`.
- يربط نظام **SIEM** التنبيه بقيمة الأصل وفق محاور **BIA الستة** (الممتلكات، المالية، السلامة، السمعة، الحياة، العملاء).`,
          highlightedRuleOrFormula: 'Risk_Score = Indicator_Strength × Asset_BIA_Value × Internet_Exposure',
          interactiveTakeaway: 'انقر على لوحة SIEM لمقارنة أولوية تنبيه على خادم عملاء مكشوف بتنبيه على جهاز اختبار داخلي.',
        },
        {
          pageNumber: 3,
          type: 'defense-lab',
          title: 'مختبر حفظ الأدلة الرقمية وسلسلة الحيازة (Chain of Custody)',
          subtitle: 'الطوابع الزمنية، بصمات الرسائل (Hashes)، وتجنب حذف الأدلة',
          contentMarkdown: `### القاعدة الجنائية الذهبية قبل الاحتواء والإصلاح
1. جمع السجلات المختومة زمنياً (\`Timestamped Logs\`) وأخذ لقطة للنظام بحالته القائمة.
2. حساب بصمة (\`SHA-256 Hash\`) للأصل والنسخة لإثبات عدم التغيير.
3. توثيق نموذج **سلسلة الحيازة** (من جمع الدليل، متى، أين، ومن تسلّمه).`,
          highlightedRuleOrFormula: 'SHA256(Original_Log) === SHA256(Forensic_Copy) => Verified_Chain_of_Custody',
          interactiveTakeaway: 'حذف السجلات أو تهيئة القرص قبل التوثيق يكمل مهمة المهاجم في التهرب من الدفاعات (Defense Evasion).',
        },
        {
          pageNumber: 4,
          type: 'case-study',
          title: 'دورة الاستجابة الست وإعادة الفحص بماسح Nessus',
          subtitle: 'من التحضير والمواقع البديلة إلى البناء من الصفر والدروس المستفادة',
          contentMarkdown: `### التكامل بين الاحتواء والاستئصال والتعافي
- **الاحتواء**: عزل الشبكة مع إبقاء الجهاز مشتغلاً لجمع سجلاته.
- **الاستئصال**: إزالة البرمجية + استبدال بيانات الاعتماد المكشوفة في متغيرات البيئة.
- **التعافي**: الاستعادة من نسخة نظيفة أو **البناء من الصفر**، ثم **إعادة الفحص بـ Nessus** للتحقق من إغلاق الثغرة.`,
          highlightedRuleOrFormula: 'Post_Remediation_Scan(Nessus) => Critical_Vulns == 0 && High_Vulns == 0',
          interactiveTakeaway: 'تقييم الحادث بإطار MITRE ATT&CK (14 قسماً) يحول الدروس المستفادة إلى قواعد كشف تلتقط السوابق مستقبلاً.',
        },
      ],
      stepByStep: [
        {
          stepNumber: 1,
          title: 'المرحلة 1: التحضير وتحديد خط الأساس والمواقع البديلة (Preparation & SOC Baseline)',
          description: 'تجهيز مركز العمليات (SOC)، تحديد خط الأساس الطبيعي للحركة، توفير التكرار (Redundancy) لإزالة SPOF، وتجهيز موقع دافئ/ساخن.',
          technicalDetail: 'ضبط قواعد IDS/IPS على خط الأساس لتقليل الإيجابيات الكاذبة (False Positives).',
          visualCue: 'استقرار شبكة المراقبة ثلاثية الأبعاد باللون الأخضر مع ظهور الموقع الرديف المتزامن.',
          codeOrCommand: 'SOC_Prep: Baseline_Established=TRUE | Redundancy=Active_Passive | DR_Site="Warm_Site_Ready"',
        },
        {
          stepNumber: 2,
          title: 'المرحلة 2: الاكتشاف والتحليل وترتيب التنبيهات في SIEM (Detection & Triage)',
          description: 'رصد مؤشر اختراق ثغرة Log4j (${jndi:ldap://) على خادم البوابة المكشوف للإنترنت وربطه بتحليل BIA.',
          technicalDetail: 'منح التنبيه الأولوية القصوى لاجتماع مؤشر استغلال مؤكد مع أصل يحمل بيانات عملاء ومالية.',
          visualCue: 'وميض أحمر عالي الأولوية على عقدة خادم الويب في لوحة SIEM ثلاثية الأبعاد.',
          codeOrCommand: '[SIEM-PRIORITY-1] CVE-2021-44228 JNDI Exploit on web-frontend (BIA: Customers/Finance/Reputation)',
        },
        {
          stepNumber: 3,
          title: 'حفظ الأدلة الرقمية وسلسلة الحيازة قبل التعديل (Forensic Preservation)',
          description: 'نسخ السجلات المختومة بالطابع الزمني وحساب بصمات التجزئة (Hashes) للأصل والنسخة وتوقيع نموذج سلسلة الحيازة.',
          technicalDetail: 'تجنب إعادة التهيئة المبكرة التي تمحو آثار الهجوم وتعيق معرفة الثغرة المستغلة.',
          visualCue: 'تغليف نسخة السجلات بختم تشفيري ذهبي يثبت تطابق البصمة وسلسلة الحيازة.',
          codeOrCommand: 'sha256sum /var/log/webapp/access.log > /forensics/evidence.sha256 && cp -p access.log /forensics/',
        },
        {
          stepNumber: 4,
          title: 'المرحلة 3 و 4: الاحتواء والاستئصال والمعالجة الشاملة (Containment & Eradication)',
          description: 'عزل الخادم المصاب عن الشبكة لوقف الانتشار، ثم إزالة البرمجية وتدوير جميع الأسرار المخزنة في متغيرات البيئة وترقيع الثغرة.',
          technicalDetail: 'تحديث قواعد الجدار الناري وقاعدة مؤشرات الاختراق لمنع عودة المهاجم.',
          visualCue: 'انفصال الخادم المصاب عن الشبكة وتطهيره بشعاع أزرق مع تحديث قواعد NGFW.',
          codeOrCommand: 'Patch_Log4j(2.17.1) && Rotate_Env_Secrets() && Update_IPS_Signatures(sid:8000801)',
        },
        {
          stepNumber: 5,
          title: 'المرحلة 5 و 6: التعافي والدروس المستفادة وإعادة الفحص بـ Nessus (Recovery & Re-testing)',
          description: 'إرجاع الخدمة للعمل في غضون ساعتين، وتوثيق الدروس المستفادة وفق MITRE ATT&CK، وإعادة فحص الخادم بماسح Nessus.',
          technicalDetail: 'مقارنة حصيلة الفئات الأربع (حرجة، عالية، متوسطة، منخفضة) بعد المعالجة بما قبلها لإثبات إغلاق الثغرة.',
          visualCue: 'عودة الخادم للعمل باللون الزمردي وظهور تقرير Nessus خالياً من الثغرات الحرجة.',
          codeOrCommand: 'nessuscli scan --target 10.20.30.11 --verify-remediation -> Critical: 0, High: 0 (RTO: 2h Met)',
        },
      ],
      hotspots: [
        {
          id: 'hs-ch8-ids-vs-ips-ngfw',
          label: 'بوابة الكشف والمنع (IDS vs IPS / NGFW)',
          title: 'الفارق بين الرصد والتنبيه خارج المسار والمنع الآلي في مسار الحركة',
          x: -1.7,
          y: 1.3,
          z: 0.6,
          coordinates: { x: -1.7, y: 1.3, z: 0.6 },
          color: '#10b981',
          icon: 'ShieldCheck',
          summary: 'دمج IPS في جدار الجيل التالي (NGFW) لإسقاط الحزم الخبيثة قبل بلوغها الخادم.',
          detailedExplanation: 'بينما يراقب IDS الحركة ويطلق تنبيهاً لفريق الأمن دون قطع الاتصال، يتمركز IPS في مسار الحركة المباشر ليغلق الاتصال المخالف آلياً وقت الرصد، وتكمله أنظمة HIPS وEDR على النقاط الطرفية.',
          mitreTactic: 'Real-time Network & Endpoint Intrusion Prevention',
          defensiveControl: 'نشر NGFW/IPS في المسار مع ضبط القواعد على خط الأساس لمنع الإيجابيات الكاذبة.',
        },
        {
          id: 'hs-ch8-siem-bia-triage',
          label: 'منصة ربط الأحداث وتحليل الأثر (SIEM & BIA)',
          title: 'تجميع السياق من مصادر السجلات وترتيب الأولويات بالمحاور الستة',
          x: 1.7,
          y: 1.3,
          z: 0.6,
          color: '#3b82f6',
          coordinates: { x: 1.7, y: 1.3, z: 0.6 },
          icon: 'Activity',
          summary: 'ربط التنبيه بقيمة الأصل وفق تحليل أثر الأعمال (BIA) وانكشافه للإنترنت.',
          detailedExplanation: 'تجمع أنظمة SIEM (مثل QRadar وSplunk وSentinel) السجلات لكشف السياق الكامل، ويقيس BIA أثر الانقطاع على الممتلكات والمالية والسلامة والسمعة والحياة والعملاء لتوجيه موارد SOC للأخطر أولاً.',
          mitreTactic: 'Multi-Source Telemetry Correlation & Risk-Based Alert Triage',
          defensiveControl: 'ربط مصادر السجلات بنظام SIEM مركزي وتطبيق مصفوفة أولويات BIA.',
        },
        {
          id: 'hs-ch8-forensics-custody',
          label: 'خزنة الأدلة وسلسلة الحيازة (Digital Forensics)',
          title: 'حفظ السجلات المختومة زمنياً وبصمات Hashes قبل أي تعديل أو تنظيف',
          x: -1.5,
          y: -1.2,
          z: 0.8,
          coordinates: { x: -1.5, y: -1.2, z: 0.8 },
          color: '#f59e0b',
          icon: 'Lock',
          summary: 'توثيق من جمع الدليل ومتى وأين ومن تسلّمه مع إثبات عدم التغيير ببصمات التجزئة.',
          detailedExplanation: 'تُجمع الأدلة من النظام بحالته القائمة قبل أي استعادة لأن التحقيق أو التنظيف المبكر يغير حالة الجهاز ويمحو أثر المهاجم. وتجعل سلسلة الحيازة وبصمات Hashes الدليلَ موثوقاً في التحليل والإفصاح.',
          mitreTactic: 'Counters TA0005 - Defense Evasion (T1070 Indicator Removal on Host)',
          defensiveControl: 'السجلات المختومة زمنياً، حساب بصمات SHA-256، وتوثيق سلسلة الحيازة (Chain of Custody).',
        },
        {
          id: 'hs-ch8-ir-lifecycle-nessus',
          label: 'محرك الاستجابة والتعافي وإعادة الفحص (IR & Nessus)',
          title: 'المراحل الست للاستجابة، المواقع البديلة، وإعادة الاختبار بعد المعالجة',
          x: 1.5,
          y: -1.2,
          z: 0.8,
          coordinates: { x: 1.5, y: -1.2, z: 0.8 },
          color: '#a855f7',
          icon: 'RotateCcw',
          summary: 'من التحضير والاحتواء والاستئصال والتعافي إلى الدروس المستفادة وإعادة الفحص بـ Nessus.',
          detailedExplanation: 'تضمن دورة الاستجابة الست استعادة الخدمة عبر النسخ الاحتياطية أو المواقع البديلة (الساخنة والدافئة والباردة) أو البناء من الصفر عند تلوث النسخ، ثم إثبات إغلاق الثغرة بإعادة الفحص بماسح الثغرات Nessus.',
          mitreTactic: 'NIST SP 800-61 Incident Response Lifecycle & MITRE ATT&CK Postmortem',
          defensiveControl: 'خطة استجابة مدرب عليها (IRP/BCP/DRP) وإعادة فحص إلزامية بعد المعالجة.',
        },
      ],
    },
    richData: {
      id: 308,
      chapter_number: 8,
      title: 'أنظمة كشف ومنع التسلل (IDS / IPS / SIEM) والاستجابة للحوادث',
      subtitle: 'الكشف بالتوقيع والسلوك، تحليل أثر الأعمال BIA، المراحل الست للاستجابة، وسلسلة الحيازة',
      category: 'شبكات',
      pdfStartPage: 59,
      pdfEndPage: 66,
      description: 'يشرح هذا الفصل نظم كشف ومنع التسلل (IDS/IPS)، أساليب الكشف بالتوقيع والسلوك، إدارة الإيجابيات والسلبيات الكاذبة، ربط التنبيهات في SIEM، والمراحل الست للاستجابة للحوادث وحفظ الأدلة.',
      objectives: [
        'المقارنة الوظيفية والمعمارية بين نظام كشف التسلل (IDS) ونظام منع التسلل (IPS) وجدران الجيل التالي',
        'التمييز بين الكشف بالتوقيع والكشف بالسلوك ومعالجة الإيجابيات والسلبيات الكاذبة باستخدام خط الأساس',
        'ربط التنبيه بالأصل في SIEM وتقدير درجة الخطر وفق تحليل أثر الأعمال (BIA) بمحاوره الستة',
        'تطبيق المراحل الست للاستجابة للحوادث الأمنية وحفظ الأدلة الرقمية وسلسلة الحيازة وإعادة الفحص بعد المعالجة',
      ],
      sections: [
        {
          heading: '1. نظم الكشف والمنع (IDS/IPS) وأساليب التوقيع والسلوك',
          content: 'يكتفي IDS بالتنبيه خارج المسار ويترك القرار للفريق، بينما ينشر IPS في المسار ليغلق الاتصال آلياً. ويعتمد الكشف على التوقيع (للأنماط المعروفة مثل Log4j) أو السلوك (للانحراف عن خط الأساس).',
        },
        {
          heading: '2. الإيجابيات والسلبيات الكاذبة وأنظمة SIEM وتحليل BIA',
          content: 'تُرهق الإيجابيات الكاذبة الفريق وتُخفض بضبط القواعد على خط الأساس، بينما تفوّت السلبيات الكاذبة الهجوم. وتجمع SIEM السياق وترتب التنبيهات بقوة المؤشر وقيمة الأصل (وفق محاور BIA الستة) وانكشافه.',
        },
        {
          heading: '3. المراحل الست للاستجابة للحوادث وحفظ الأدلة وسلسلة الحيازة',
          content: 'تسير الاستجابة في 6 مراحل: التحضير (SOC والمواقع الساخنة والدافئة والباردة)، الاكتشاف والتحليل (مع حفظ الأدلة وبصماتها وسلسلة الحيازة)، الاحتواء، الاستئصال، التعافي، والدروس المستفادة وإعادة الاختبار بـ Nessus.',
        },
      ],
      tables: [
        {
          title: 'جدول 7.1: مقارنة بين نظام كشف التسلل (IDS) ونظام منع التسلل (IPS)',
          headers: ['وجه المقارنة', 'نظام كشف التسلل (IDS)', 'نظام منع التسلل (IPS)'],
          rows: [
            ['الوظيفة', 'مراقبة الحركة لاكتشاف الهجمات', 'مراقبة الحركة لمنع الهجمات'],
            ['الإجراء عند الرصد', 'إطلاق تنبيه لا يمس الاتصال', 'إغلاق الاتصال أو إنهاء العملية المسيئة'],
            ['صاحب القرار', 'فريق الأمن بعد قراءة التنبيه', 'النظام نفسه وقت الرصد'],
            ['موضع النشر', 'لا يمس مسار الاتصال', 'في مسار الحركة قبل بلوغ الطلب الخدمة'],
          ],
        },
        {
          title: 'جدول 7.2: غاية كل مرحلة من مراحل المعالجة',
          headers: ['المرحلة', 'الغاية', 'إجراء مميز لها'],
          rows: [
            ['الاحتواء (Containment)', 'إيقاف انتشار الضرر', 'عزل الأصل عن الشبكة'],
            ['الاستئصال (Eradication)', 'إزالة المصدر ومنع العودة', 'تعطيل الحسابات المخترقة وتطبيق التحديثات'],
            ['التعافي (Recovery)', 'إرجاع الخدمة إلى العمل', 'الاستعادة من نسخة احتياطية أو البناء من الصفر'],
          ],
        },
      ],
      commonMistake: {
        mistake: 'حذف الأدلة أو تنظيف الأصل المصاب قبل جمع سجلاته المختومة زمنياً وحساب بصماتها، أو إهمال ضبط الإيجابيات الكاذبة.',
        fix: 'تُجمع الأدلة وتُحسب بصماتها وتُوثق سلسلة الحيازة قبل أي تعديل أو استعادة، وتُضبط قواعد التنبيه على خط الأساس لحماية الفريق من الإرهاق.',
      },
      solvedExample: {
        title: 'معالجة حادثة استغلال ثغرة Log4j على خادم بوابة رقمية',
        given: 'رصد نظام SIEM طلب ويب يحوي السلسلة ${jndi:ldap:// على خادم بوابة رقمية مكشوف للإنترنت، وتبين أن المهاجم قرأ بيانات اعتماد مخزنة في متغيرات البيئة.',
        steps: [
          '1. الفرز والأولوية: منح التنبيه الأولوية القصوى لاجتماع مؤشر قوي وأصل قيم ومكشوف للإنترنت.',
          '2. حفظ الأدلة: نسخ سجلات الخادم المختومة زمنياً وحساب بصمتها (Hash) وتوثيق سلسلة الحيازة قبل التعديل.',
          '3. الاحتواء والاستئصال: عزل الخادم عن الشبكة، ثم استبدال بيانات الاعتماد المكشوفة في متغيرات البيئة كلياً وتعطيل الحسابات المخترقة وترقيع مكتبة Log4j.',
          '4. التعافي وإعادة الفحص: استعادة الخدمة من نسخة نظيفة، وإعادة فحص الخادم بماسح Nessus للتأكد من اختفاء الثغرة الحرجة.',
        ],
        result: 'احتواء الاختراق واستعادة البوابة خلال ساعتين (مطابقاً لهدف خطة التعافي) مع إغلاق الثغرة نهائياً.',
        whyItMatters: 'يوضح تسلسل مراحل الاستجابة الست وتكامل حفظ الأدلة مع الاستئصال الشامل وإعادة الاختبار.',
      },
      selfAssessment: [
        {
          question: 'علّل: لماذا تُجمع الأدلة الرقمية قبل أي تعديل أو استعادة للنظام المصاب؟',
          answer: 'لأن اللقطة الأولية للنظام بحالته القائمة أدل على المشكلة ومصدرها من الإجراءات اللاحقة، ولأن التحقيق أو الاستعادة قد يغير حالة الجهاز عن غير قصد فيضيع أثر الهجوم.',
        },
        {
          question: 'ما أهمية سلسلة الحيازة عند التعامل مع الأدلة الرقمية؟',
          answer: 'توثق كيف جُمعت الأدلة ومن تسلّمها ومتى وأين وما أُجري عليها، وهذا مع التحقق بالبصمات (Hashes) يجعل الأدلة موثوقة في التحليل وتقييم مطابقة التنفيذ للخطة والإفصاح للجهات المعنية.',
        },
      ],
    },
    updated_at: COURSE_TIMESTAMP,
  },

  // =========================================================================
  // الفصل التاسع: دراسات الحالة التطبيقية وتحليل هجوم Sony Pictures وفق مصفوفة MITRE ATT&CK
  // =========================================================================
  {
    id: 309,
    chapter_number: 9,
    title: 'دراسات الحالة التطبيقية وتحليل هجوم Sony Pictures وفق مصفوفة MITRE ATT&CK',
    subtitle: 'بناء حزمة تحليل التهديدات المتكاملة لمنصة «مواعيدي» السحابية، التكتيكات الـ 14 لـ MITRE ATT&CK، دراسة حالة Sony Pictures 2014، والروبرك',
    description: 'الفصل التطبيقي التراكمي الشامل: بناء حزمة تحليل التهديدات المتكاملة (Threat Analysis Package) لمنصة «مواعيدي» الحكومية العاملة بالحاويات على سحابة IaaS، تفصيل التكتيكات الـ 14 لمصفوفة MITRE ATT&CK، جرد الأصول وتصنيف البيانات، سجل المخاطر ونقاط الفشل الأحادية، مصفوفة الضوابط (و، ك، ح) وحدودها، نموذجا الإشعار، دراسة حالة اختراق Sony Pictures 2014 (فصل المؤكد بالتحقيق عن المستنتج، وتوثيق البديل المرفوض)، والتقويم الذاتي بالروبرك.',
    category: 'دراسات حالة ومشروع MITRE',
    difficulty: 'advanced',
    pdfStartPage: 67,
    pdfEndPage: 79,
    diagramKey: 'ise232-threats-9',
    diagramConfig: {
      key: 'ise232-threats-9',
      title: 'مصفوفة تكتيكات MITRE ATT&CK الـ 14 وتحليل هجوم Sony Pictures وحزمة منصة «مواعيدي»',
      svgType: 'CyberKillchain',
      nodes: ['1. النطاق والجرد (IaaS/Containers)', '2. تكتيكات MITRE الـ 14', '3. سجل المخاطر ومصفوفة الضوابط (و/ك/ح)', '4. حالة Sony Pictures ومذكرة القرارات والروبرك'],
      accentColor: '#ef4444',
    },
    videoUrl: 'https://www.youtube.com/watch?v=QzX2gN7YbW0',
    videoDuration: '26:30',
    presentationUrl: '/presentations/ise232-threats-ch9.pdf',
    keyTopics: [
      'بنية حزمة تحليل التهديدات المتكاملة (Threat Analysis Package) ومخرجاتها السبعة النهائية',
      'بيئة منصة «مواعيدي» الحكومية السعودية: الحاويات (Containers)، العنقود (Kubernetes)، ونموذج IaaS مقابل PaaS',
      'طبقات أمن التطبيقات السحابية الأربع: الشيفرة (Code)، الحاوية (Container)، العنقود (Cluster)، والسحابة (Cloud)',
      'اكتشاف المضيفات بأداة Nmap (10.20.30.0/24) وجرد الأصول الستة وتصنيف البيانات الشخصية المعرّفة (PII)',
      'التكتيكات الـ 14 الكاملة لإطار MITRE ATT&CK وتطبيقها على جدول تحليل التهديدات',
      'التمييز الدقيق بين العلامة التحذيرية السابقة (Precursor)، والمؤشر (Indicator)، ومؤشر الاختراق (IoC)',
      'سجل المخاطر المرتب بالأثر أولاً وفق BIA ونقطة الفشل الأحادية (appointments-db)',
      'مصفوفة ضوابط الوقاية (و) والكشف (ك) والاحتواء (ح) مع كتابة حدود كل ضابط، والفرق بين RAID والنسخ الاحتياطي، واللقطة (Snapshot) مقابل الاحتواء',
      'نموذجا الإشعار الرسميان: إشعار المتأثرين (المستفيدين) وإشعار الشركاء والمزوّد السحابي',
      'دراسة حالة اختراق Sony Pictures عام 2014: فصل المؤكد بالتحقيق عن المستنتج على مستوى الحملات، ومؤشرات الهجوم المدمر',
      'الحوكمة ومذكرة القرارات: توثيق البديل المرفوض (Rejected Alternative) ومبرر القرار بدليل يحيل لرقم الخطر ورمز الضابط',
      'التقويم الذاتي بالروبرك (Rubric) ذي المحاور الستة ومراجعة الأقران غير المتزامنة والأخطاء الشائعة السبعة',
    ],
    content: `## 9.1 الهدف والحالة التطبيقية: منصة «مواعيدي» ومخرجات الحزمة السبعة

يجمع هذا الفصل مكتسبات المقرر كلها في بناء **حزمة تحليل التهديدات المتكاملة (\`Threat Analysis Package\`)** لنظام رقمي واقعي هو **منصة «مواعيدي»** لإدارة مواعيد وخدمات المستفيدين في جهة حكومية سعودية.
تعمل المنصة بـ **الحاويات (\`Containers\`)** — وهي بيئات تشغيل معزولة تشارك نواة نظام التشغيل مع المضيف — على بنية سحابية من نوع **البنية التحتية بوصفها خدمة (\`IaaS\`)**، حيث يقع معظم مسؤولية التأمين على الجهة المشترية لا على المزوّد.

### المخرجات النهائية السبعة للحزمة وطريقة الربط المرجعي

| رقم المخرج | اسم المخرج النهائي في الحزمة | صيغة التسليم ومعيار الترابط |
| :---: | :--- | :--- |
| **1** | **وثيقة النطاق وحدود المشروع وجرد الأصول وتصنيف البيانات** | صفحة واحدة + جدول جرد (يفصل مسؤولية المزوّد عن مسؤولية الجهة). |
| **2** | **جدول تحليل التهديدات وسجل المخاطر مرتب الأولويات** | جدولان مرقّما الصفوف (\`1، 2، 3\`) تبقى أرقامها ثابتة في كل جداول الحزمة. |
| **3** | **مصفوفة ضوابط الوقاية (\`و\`) والكشف (\`ك\`) والاحتواء (\`ح\`)** | جدول مرقّم الضوابط (\`1.و، 1.ك، 1.ح\` / \`2.و، 2.ك، 2.ح\`) مع بيان حدود كل ضابط. |
| **4** | **خطة الاستجابة للحوادث ونموذجا الإشعار** | صفحتان + نموذجا إشعار (إشعار المتأثرين + إشعار الشركاء والمزوّد السحابي). |
| **5** | **مذكرة القرارات (\`Decision Memo\`)** | قائمة قرارات مرقمة توثق لكل قرار **بديله المرفوض** ومبرره بدليل من الحزمة. |
| **6** | **تقرير التقويم الذاتي بالروبرك وتقرير مراجعة الأقران** | ورقة روبرك مملوءة (6 محاور × 4 مستويات) + ملاحظتا مراجعة الأقران. |
| **7** | **الحزمة المتكاملة النهائية** | ملف \`PDF\` واحد مفهرس في الصفحة الأولى بتسمية موحدة (\`مواعيدي ـ المخرج X ـ اسم الطالب\`). |

---

## 9.2 نطاق المشروع والطبقات السحابية الأربع وجرد الأصول

يُبنى النطاق على **طبقات أمن التطبيقات السحابية الأربع**:
1. **الشيفرة (\`Code\`)**: كود التطبيق وسلامته وإعداده.
2. **الحاوية (\`Container\`)**: عزلها وصلاحياتها وسلامة نظام تشغيلها وسجل الصور (\`Image Registry\`).
3. **العنقود (\`Cluster\`)**: الأجهزة التي يعمل عليها نظام تنسيق الحاويات (\`Kubernetes\`).
4. **السحابة (\`Cloud\`)**: مزوّد المورد (مركز بيانات المزوّد وشبكته الفيزيائية والافتراضية يخرج عن نطاق سيطرة فريق الجهة).
- **حد المسؤولية في \`IaaS\`**: يتولى المزوّد ما دون نظام تشغيل المضيف (الفيزيائية والافتراضية)، وتتولى الجهة المشترية نظام تشغيل مضيف الحاويات (\`container-host-01\`) ورقعه وإعداده وإعدادات الحاويات والشيفرة.

### جرد الأصول الستة لمنصة «مواعيدي» بعد اكتشاف المضيفات (\`nmap -sn 10.20.30.0/24\`)

| الأصل المسجّل | عنوان IP | تصنيف بياناته | مبرر التصنيف ودوره المعماري |
| :--- | :---: | :---: | :--- |
| **خادم الويب \`web-frontend\`** | \`10.20.30.11\` | **سري** | تمر عبره البيانات الشخصية المعرّفة (\`PII\`: الاسم، رقم الهوية، الجوال). |
| **مضيف الحاويات \`container-host-01\`** | \`10.20.30.12\` | **سري** | يشغّل حاويات المنصة ويقع رقعه وإعداده على عاتق فريق الجهة. |
| **قاعدة بيانات المواعيد \`appointments-db\`** | \`10.20.30.13\` | **سري** | يخزن جدول المواعيد المربوط بالاسم والهوية، ويمثل **نقطة فشل أحادية (\`SPOF\`)**. |
| **محطة موظف الاستقبال \`reception-pc-01\`** | \`10.20.30.14\` | **سري** | تطلع على مواعيد وبيانات المستفيدين (تُطابق بـ \`ipconfig / ifconfig\`). |
| **سجلات تشغيل خادم الويب** | \`10.20.30.11\` | **داخلي** | سجلات تقنية بلا أسماء مستفيدين أو بيانات شخصية. |
| **مضيف غير محدد الدور** | \`10.20.30.21\` | **يُحدّد بعد التحقيق** | ظهر نشطاً في المسح (\`Host is up\`) فيُعلّق تصنيفه حتى يُعرف دوره (فإن كان طابعة مشتركة بلا بيانات شخصية صُنّف \`داخلي\`). |

---

## 9.3 التكتيكات الـ 14 الكاملة لإطار \`MITRE ATT&CK\` وجدول تحليل التهديدات

طُوّر إطار **\`MITRE ATT&CK\`** عام 2013 ويضم **14 قسماً (تكتيكاً)** تغطي دورة حياة سلوك الخصوم (صفحة 70 في كتاب المقرر):

| # | التكتيك (Tactic) | المصطلح الإنجليزي | ما يفعله المهاجم تقنياً |
| :---: | :--- | :--- | :--- |
| **1** | **الاستطلاع** | \`Reconnaissance (TA0043)\` | جمع معلومات عن الهدف بالمسح والتصيّد. |
| **2** | **تطوير الموارد** | \`Resource Development (TA0042)\` | تجهيز البنية التحتية والثغرات المخصصة للهجوم. |
| **3** | **الوصول الأولي** | \`Initial Access (TA0001)\` | أول خرق للأمن، كثيراً ما يكون بالتصيّد أو بحساب مخترق. |
| **4** | **التنفيذ** | \`Execution (TA0002)\` | تشغيل الأوامر والنصوص البرمجية اللازمة لبقية الهجوم. |
| **5** | **الاستمرارية** | \`Persistence (TA0003)\` | ضمان عودة الشيفرة الخبيثة إلى العمل بعد إعادة التشغيل. |
| **6** | **تصعيد الامتياز** | \`Privilege Escalation (TA0004)\` | الحصول على حساب مدير للسيطرة الكاملة على الأصل. |
| **7** | **تجنّب الدفاعات** | \`Defense Evasion (TA0005)\` | تعطيل الماسحات ومسح السجلات لإخفاء الوجود. |
| **8** | **الوصول إلى بيانات الدخول** | \`Credential Access (TA0006)\` | تسجيل ضربات المفاتيح وكسر كلمات المرور المخزنة. |
| **9** | **الاستكشاف** | \`Discovery (TA0007)\` | جمع معلومات عن الحسابات والخدمات وسياسة كلمات المرور داخل الشبكة (يقع زمنياً بعد الوصول الأولي وقبل الحركة الجانبية). |
| **10** | **الحركة الجانبية** | \`Lateral Movement (TA0008)\` | التنقل بين الأنظمة الداخلية دون تغيير كبير في الامتياز. |
| **11** | **جمع البيانات** | \`Collection (TA0009)\` | حصاد بيانات الأجهزة والمحركات والبريد. |
| **12** | **القيادة والتحكم** | \`Command and Control (TA0011)\` | فتح قناة بين الأنظمة المخترقة ونظام خارجي (قد تتنكر في \`DNS\` أو \`Google Drive\` أو \`Dropbox\`). |
| **13** | **التسريب** | \`Exfiltration (TA0010)\` | إخراج البيانات بصورة تشبه الحركة العادية. |
| **14** | **الأثر** | \`Impact (TA0040)\` | فقد البيانات أو احتجازها لطلب فدية أو الحرمان من الخدمة. |

### جدول تحليل التهديدات وسجل المخاطر ومصفوفة الضوابط لمنصة «مواعيدي»

| رقم الخطر | المصدر الفعلي وتصنيفه | نوع الهجوم (\`ATT&CK\`) | مؤشر الاختراق القابل للمراقبة | الأولوية والمحاور المتأثرة (BIA) | الضوابط الثلاثة (\`و / ك / ح\`) وحدودها |
| :---: | :--- | :--- | :--- | :--- | :--- |
| **1** | منظمة إجرامية خارجية (**خارجي**) | الوصول الأولي عبر التصيّد (\`TA0001\`) | تنبيه ماسح البرمجيات الخبيثة على \`reception-pc-01\` | **متوسطة** (العملاء): أثره محدود بأصل واحد واحتواؤه أسهل. | **\`1.و\`**: تصفية البريد ومنع تشغيل المرفقات التنفيذية (لا يمنع الروابط الجديدة تماماً). **\`1.ك\`**: تنبيه الماسح على المحطة (يكشف بعد التنزيل). **\`1.ح\`**: عزل المحطة عن الشبكة (يوقف الانتشار ولا يزيل الملفات المصابة). |
| **2** | منظمة إجرامية تدير حساب موظف مخترق (**خارجي** لأن التصنيف بالمصدر الفعلي لا بالمسار!) | الحركة الجانبية (\`TA0008\`) | نمط غير معتاد في سجلات الدخول مقارنة بخط الأساس | **عالية (الأول)** (العملاء، السمعة): أثره دائم في سرية بيانات شخصية واتساعه كبير. | **\`2.و\`**: تقسيم الشبكة بين محطات الاستقبال وقاعدة البيانات (لا يمنع الحركة الجانبية داخل الشبكة الواحدة). **\`2.ك\`**: مراقبة سجلات الدخول مقارنة بخط الأساس (يكشف بعد وقوع الدخول لا قبله). **\`2.ح\`**: عزل الأصل المرتبط بالحساب المخترق (يوقف الانتشار ولا يزيل البرمجية). |
| **3** | ناشط ينشر برمجية خبيثة (**خارجي**) | الأثر: الحرمان من الخدمة (\`TA0040\`) | ارتفاع غير معتاد في الطلبات على \`web-frontend\` مقارنة بخط الأساس | **عالية (الثاني)** (العملاء، السمعة، المالية): يهدد حجز المواعيد لكن أثره في التوافر يُزال بالتحويل الاحتياطي. | **\`3.و\`**: تحديد معدل الطلبات وتفعيل التكرار والتحويل الاحتياطي \`Failover\` (قد يبطئ الاستجابة وقت الذروة). **\`3.ك\`**: رصد انحراف معدل الطلبات عن خط الأساس في \`IDS\`. **\`3.ح\`**: حجب عناوين الهجوم وتحويل الحركة للخادم الثانوي. |

> [!warning]
> **تنبيهات فنية دقيقة من كتاب المقرر (صفحة 72-73)**:
> 1. مصفوفة الأقراص **\`RAID\` ليست نسخة احتياطية (\`Backup\`)**؛ فهي على جهاز واحد وتخفف تعطل الأقراص فقط ولا تحمي من تشفير الفدية أو مسح البيانات.
> 2. **اللقطة (\`Snapshot\`)** أداة **تعافٍ (\`Recovery\`)** لا أداة احتواء (\`Containment\`)؛ تُجدول مسبقاً وتُستعمل بعد العزل.

---

## 9.4 دراسة حالة اختراق \`Sony Pictures\` عام 2014 ومذكرة القرارات

تُقرأ حادثة اختراق شركة **Sony Pictures (2014)** — التي شهدت تسريب بيانات داخلية، ومسح أقراص ببرمجيات مدمرة (\`Wiper Malware\`)، وعرض رسائل تحذير على الشاشات — وفق قاعدتين منهجيتين صارمتين:
1. **فصل المؤكد بالتحقيق عن المستنتج**: تُقرأ تكتيكات \`ATT&CK\` على مستويين: **ما ثبت بالتحقيق في الحادثة نفسها**، وما يُرجّح أو يرد على مستوى حملات متعددة للمجموعة المهاجمة؛ **فلا يُسند الثاني إلى الحادثة وحدها**! كما أن كل قرار لا دليل موثق عليه (كإعادة بناء الأنظمة فوراً أو رفض مطالب المهاجمين) يُسجّل في المذكرة **إجراءً مقترحاً أو أمراً غير موثق لا واقعة**.
2. **توثيق البديل المرفوض (\`Rejected Alternative\`) ومبرر القرار**: كل قرار أمني يجب أن يُوثق مقابل بديله الذي دُرس ثم رُفض مع مبرر يحيل إلى رقم خطر ورمز ضابط في الحزمة؛ وذلك لمنع إعادة النظر فيه وإثبات أن القرار موزون:
   - **قرار 1 (الاستجابة)**: عزل الأصل المرتبط بالحساب المخترق (الضابط \`2.ح\`) | **البديل المرفوض**: إعادة بناء الأصل فوراً | **المبرر والدليل**: العزل يوقف الانتشار في الحال، وإعادة البناء تستغرق وقتاً طويلاً وتُترك لما بعد تعذر الاستعادة (الدليل: الخطر \`2\` وحد الضابط \`2.ح\`).
   - **قرار 2 (المعمارية السحابية)**: الاعتماد على مزوّد سحابي واحد مع نسخ احتياطي معزول | **البديل المرفوض**: الاشتراك بمزوّدين سحابيين اثنين | **المبرر والدليل**: تعدد المزودين يبقي الخدمة إذا تعطل أحدهما، لكنه يوسع سطح الهجوم بثغرات مزودين اثنين ويزيد تعقيد إدارة الحاويات (الدليل: حدود نطاق \`IaaS\` والخطر \`2\`).

### قواعد Snort/Suricata لكشف مسح الاستكشاف والـ C2 المتنكر في DNS والبرمجيات الماسحة (Sony Wiper)

\`\`\`snort
# 1. كشف تكتيك الحركة الجانبية والاستكشاف الداخلي من محطة الاستقبال إلى قاعدة بيانات المواعيد (Risk #2)
alert tcp 10.20.30.14 any -> 10.20.30.13 5432 (msg:"[MAWAEIDI-RISK2] Unauthorized Lateral Movement from Reception PC to Appointments DB"; flow:to_server,established; classtype:policy-violation; sid:9000901; rev:1;)

# 2. كشف قناة قيادة وتحكم متنكرة في استعلامات DNS طويلة (Emerging Threat: DNS Tunneling C2)
alert udp $HOME_NET any -> any 53 (msg:"[EMERGING-C2] Suspicious Long DNS TXT Query - Possible C2 Exfiltration Tunnel"; content:"|00 10 00 01|"; dsize:>250; classtype:trojan-activity; sid:9000902; rev:1;)

# 3. كشف نشاط برمجية مسح وتدمير الأقراص (Sony Pictures Wiper Style SMB Mass Deletion)
alert tcp $HOME_NET any -> $HOME_NET 445 (msg:"[IMPACT-WIPER] High-Velocity SMB File Deletion & Master Boot Record Wipe Attempt"; flow:to_server,established; content:"|ff|SMB"; threshold:type both, track by_src, count 100, seconds 3; classtype:attempted-dos; sid:9000903; rev:1;)
\`\`\``,
    images: [
      {
        prompt: 'Sony Pictures 2014 cyber attack MITRE ATT&CK 14 tactics threat analysis package, 16:9',
        caption: 'تحليل حادثة Sony Pictures 2014 وتطبيق التكتيكات الـ 14 لمصفوفة MITRE ATT&CK',
        alt: 'Sony Pictures 2014 MITRE ATT&CK analysis',
        seed: 3091,
        isAIGenerated: true,
      },
      {
        prompt: 'Cloud container Kubernetes IaaS security scope threat analysis dossier Mawaeidi platform, 16:9',
        caption: 'بنية حزمة تحليل التهديدات المتكاملة لمنصة «مواعيدي» السحابية ومصفوفة الضوابط والروبرك',
        alt: 'Threat analysis package architecture',
        seed: 3092,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        id: 1,
        slideNumber: 1,
        title: 'حزمة تحليل التهديدات المتكاملة تجمع سبعة مخرجات مترابطة لمنصة «مواعيدي» السحابية',
        subtitle: 'طبقات أمن السحابة الأربع (الشيفرة، الحاوية، العنقود، السحابة) وحدود مسؤولية IaaS',
        bullets: [
          'تعمل منصة «مواعيدي» بالحاويات (Containers) على سحابة IaaS؛ حيث يتولى المزوّد الطبقات الفيزيائية والافتراضية وشبكته فقط.',
          'تتولى الجهة المشترية أمن نظام تشغيل مضيف الحاويات (container-host-01) ورقعه وإعداده وإعدادات الحاويات والشيفرة.',
          'المخرجات السبعة: 1) النطاق والجرد، 2) تحليل التهديدات وسجل المخاطر، 3) مصفوفة الضوابط، 4) خطة الاستجابة والإشعاران، 5) مذكرة القرارات، 6) الروبرك ومراجعة الأقران، 7) ملف PDF المفهرس.',
          'أي أصل يخزن أو تمر عبره بيانات شخصية معرّفة (PII: الاسم، الهوية، الجوال) يُصنّف في أعلى مستوى حساسية (سري).',
        ],
        keyHighlight: 'تحديد النطاق وحدود مسؤولية IaaS بدقة يمنع تحمّل الفريق مسؤولية ما لا يسيطر عليه ويمنع فحص أنظمة خارج التصريح.',
        visualType: 'architecture',
      },
      {
        id: 2,
        slideNumber: 2,
        title: 'التكتيكات الـ 14 لإطار MITRE ATT&CK تصنف سلوك المهاجم وتضبط جدول تحليل التهديدات',
        subtitle: 'تصنيف التهديد بمصدره الفعلي لا بمساره والتمييز بين العلامة السابقة والمؤشر و IoC',
        bullets: [
          'يُصنّف التهديد بمصدره الفعلي لا بمساره: منظمة إجرامية تدير حساب موظف مخترق للتنقل الجانبي تُصنّف تهديداً خارجياً.',
          'زمنياً في ATT&CK: يسبق الاستطلاعُ (Recon) الوصولَ الأولي (Initial Access)، ويقع الاستكشاف (Discovery) بعد الوصول الأولي وقبل الحركة الجانبية (Lateral Movement).',
          'العلامة التحذيرية السابقة (Precursor) تسبق الحادث، والمؤشر (Indicator) يبدأ التحقيق والتأكيد، ومؤشر الاختراق (IoC) يُسجّل بعد التحقيق.',
          'الخلط بين العلامة السابقة والمؤشر يقدم التصعيد أو يؤخره؛ فالتصعيد للإدارة لا يتم إلا بعد التحقق والتأكيد.',
        ],
        keyHighlight: 'الحساب المخترق مجرد مسار داخلي تستغله جهة خارجية للحركة الجانبية، لذا يبقى تصنيف مصدر الخطر «خارجياً».',
        visualType: 'mitre',
      },
      {
        id: 3,
        slideNumber: 3,
        title: 'سجل المخاطر يُرتب بالأثر أولاً ومصفوفة الضوابط توثق الوقاية والكشف والاحتواء وحدودها',
        subtitle: 'نقطة الفشل الأحادية (appointments-db) والفرق بين RAID والنسخ الاحتياطي واللقطات',
        bullets: [
          'يُرتب سجل المخاطر بالأثر أولاً وفق محاور BIA الستة؛ ويتصدر الخطر 2 (الحركة الجانبية لبيانات المستفيدين) يليه الخطر 3 ثم 1.',
          'قاعدة بيانات المواعيد (appointments-db: 10.20.30.13) تمثل نقطة فشل أحادية (SPOF) لأن تعطلها يوقف الحجز كله.',
          'لكل خطر عالي الأولوية 3 ضوابط مرقمة: وقائي (و)، كشف (ك)، واحتواء (ح) مع كتابة حدود كل ضابط بصياغة غير مكررة.',
          'مصفوفة الأقراص RAID ليست نسخة احتياطية (تخفف تعطل القرص فقط)، واللقطة (Snapshot) أداة تعافٍ لا أداة احتواء.',
        ],
        keyHighlight: 'منع تشغيل الشيفرة بحساب مدير (Root) داخل الحاوية والتحقق من سلامة سجل الصور (Image Registry) يحدان من أثر الاختراق.',
        visualType: 'matrix',
      },
      {
        id: 4,
        slideNumber: 4,
        title: 'دراسة حالة Sony Pictures 2014 تكرّس فصل المؤكد بالتحقيق عن المستنتج وتوثيق البديل المرفوض',
        subtitle: 'قراءة الهجوم المدمر، نماذج الإشعار الرسمية، ومذكرة القرارات المبررة',
        bullets: [
          'في حالة Sony Pictures 2014: يُفصل بين ما ثبت بالتحقيق في الحادثة وما ورد عن حملات أخرى للمجموعة فلا يُسند الثاني للحادثة وحدها.',
          'كل إجراء لا دليل موثق عليه يُسجل في المذكرة كإجراء مقترح لا واقعة، ويُوثق لكل قرار بديله المرفوض (Rejected Alternative).',
          'إشعار المتأثرين يوضح ما حدث، البيانات المتأثرة (الاسم، الهوية، الجوال)، ما اتخذه الفريق، وما يجب على المستفيد عمله.',
          'إشعار الشركاء والمزوّد السحابي يركز على نطاق الأثر المشترك ومؤشر الاختراق المعلن للمراقبة دون كشف تفاصيل التحقيق الجارية.',
        ],
        keyHighlight: 'توثيق البديل المرفوض (مثل رفض إعادة البناء الفوري لصالح العزل الفوري) يثبت أن القرار موزون ويمنع إعادة الجدل حوله.',
        visualType: 'comparison',
      },
      {
        id: 5,
        slideNumber: 5,
        title: 'التقويم الذاتي بالروبرك ومراجعة الأقران غير المتزامنة يضمنان اكتمال الحزمة قبل التسليم',
        subtitle: 'المحاور الستة للروبرك وتجنب الأخطاء الشائعة السبعة',
        bullets: [
          'يقيم الروبرك (Rubric) 6 محاور بأربعة مستويات (متميز، متقن، نامٍ، غير مكتمل) لاستخلاص الفجوات وتحسينها قبل الإيداع.',
          'مراجعة الأقران غير المتزامنة تركز على المخرجات لا صاحبها: تبادل الملف نهاية اليوم العاشر، وملاحظتان لكل زميل خلال يومين.',
          'من الأخطاء الشائعة: توسيع النطاق خارج المنصة، إغفال مؤشر الاختراق، تجاهل SPOF، وتبرير ترتيب السجل بضابط لم يُصمم بعد.',
          'التسليم بلا مذكرة قرارات أو بلا تقويم ذاتي بالروبرك يجعل العمل غير مكتمل مهما جاد تحليله الفني.',
        ],
        keyHighlight: 'اكتمال الحزمة يتحقق بتطابق الفهرس، وتسمية الملفات الموحدة، وربط كل قرار برقم الخطر ورمز الضابط في المصفوفة.',
        visualType: 'flow',
      },
    ],
    flashcards: [
      {
        front: 'ما طبقات أمن التطبيقات السحابية الأربع التي يُبنى عليها نطاق المشروع في منصة «مواعيدي»؟',
        back: '1) الشيفرة (Code)، 2) الحاوية (Container)، 3) العنقود (Cluster - Kubernetes)، 4) السحابة (Cloud - مزوّد المورد).',
        category: 'أمن الحاويات والسحابة',
      },
      {
        front: 'في نموذج IaaS لمنصة «مواعيدي»، أين يقع خط فصل المسؤولية بين المزوّد السحابي والجهة المشترية؟',
        back: 'يتولى المزوّد الطبقات الفيزيائية والافتراضية وشبكته (ما دون نظام تشغيل المضيف)، وتتولى الجهة المشترية نظام تشغيل مضيف الحاويات ورقعه وإعداده وإعدادات الحاويات والشيفرة.',
        category: 'حدود النطاق',
      },
      {
        front: 'كيف يُصنّف تهديد منظمة إجرامية خارجية تستخدم حساب موظف مخترق للتنقل الجانبي داخل الشبكة؟ ولماذا؟',
        back: 'يُصنّف تهديداً «خارجياً»؛ لأن التهديد يُصنّف بمصدره الفعلي لا بمساره، والحساب المخترق مجرد مسار داخلي تستغله الجهة الخارجية.',
        category: 'تحليل التهديدات',
      },
      {
        front: 'ما الترتيب الزمني الصحيح لتكتيكات (الاستطلاع، الوصول الأولي، الاستكشاف، الحركة الجانبية) في MITRE ATT&CK؟',
        back: '1) الاستطلاع (قبل الاختراق)، 2) الوصول الأولي (أول خرق للأمن)، 3) الاستكشاف (Discovery - لجمع معلومات عن الحسابات والخدمات بالداخل)، 4) الحركة الجانبية (للتنقل بين الأنظمة).',
        category: 'MITRE ATT&CK',
      },
      {
        front: 'لماذا لا تُعد مصفوفة الأقراص (RAID) نسخة احتياطية، ولماذا لا تُعد اللقطة (Snapshot) ضابط احتواء؟',
        back: 'RAID تقع على جهاز واحد وتخفف تعطل الأقراص فقط ولا تحمي من التشفير أو المسح؛ واللقطة (Snapshot) أداة تعافٍ (Recovery) تُستعمل لاسترجاع الحالة بعد العزل وليست أداة احتواء لإيقاف الانتشار.',
        category: 'دقة الضوابط',
      },
      {
        front: 'ما القاعدتان المنهجيتان الأساسيتان عند تحليل حادثة Sony Pictures 2014 ومذكرة القرارات؟',
        back: '1) فصل ما ثبت بالتحقيق في الحادثة عما ورد عن حملات متعددة للمجموعة المهاجمة، 2) توثيق البديل المرفوض (Rejected Alternative) ومبرر كل قرار بدليل يحيل لرقم الخطر ورمز الضابط.',
        category: 'دراسة الحالة والحوكمة',
      },
    ],
    miniQuiz: [
      {
        question: 'أثناء مسح اكتشاف المضيفات (nmap -sn 10.20.30.0/24) لمنصة «مواعيدي»، ظهر المضيف (10.20.30.21) نشطاً ولم يكن دوره معروفاً لحظة المسح، ثم تبين لاحقاً أنه طابعة مشتركة لا تمر عبرها بيانات شخصية. كيف يُتعامل مع تصنيفه؟',
        options: [
          'يُعلّق تصنيفه عند الاكتشاف حتى يُتحقق من دوره، وبعد ثبوت أنه طابعة مشتركة بلا بيانات شخصية يُصنّف في مستوى «داخلي»',
          'يُستثنى من جدول الجرد نهائياً لأن عنوانه ينتهي بالرقم 21',
          'يُصنّف «سري للغاية» قبل معرفة دوره ويُحذف خادم قاعدة البيانات بدلاً منه',
          'يُترك خارج وثيقة النطاق ويُمنح صلاحيات جذر داخل الحاوية',
        ],
        correctIndex: 0,
        explanation: 'أوضح كتاب المقرر (صفحة 68-69 و78) أن كل عنوان نشط يُسجّل صفاً في الجرد، ويُعلّق تصنيف المضيف المجهول (10.20.30.21) حتى التحقق، فإذا تبين أنه طابعة مشتركة لا تمر عبرها بيانات شخصية صُنّف «داخلي».',
      },
      {
        question: 'ما الفرق الجوهري بين محتوى «إشعار المتأثرين (المستفيدين)» ومحتوى «إشعار الشركاء والمزوّد السحابي» في المخرج الرابع من الحزمة؟',
        options: [
          'إشعار المتأثرين يبين البيانات الشخصية المتأثرة وما يجب على المستفيد عمله (كتغيير كلمة المرور)، بينما إشعار الشركاء يركز على نطاق الأثر المشترك ومراقبة مؤشر الاختراق دون تفاصيل التحقيق الجارية',
          'إشعار المتأثرين يُرسل للشركاء فقط ويحتوي على شفرة المصدر الكاملة للبرمجية الخبيثة',
          'إشعار الشركاء يطلب من المزوّد السحابي تغيير أرقام الهوية الوطنية للمواطنين',
          'كلا الإشعارين يُنشران في المنتديات العامة قبل التحقق من المؤشر أو عزل الأصل',
        ],
        correctIndex: 0,
        explanation: 'فصّل كتاب المقرر (صفحة 74) نموذجي الإشعار: الأول للمتأثرين (ماذا حدث، البيانات المتأثرة، ما اتخذه الفريق، ما يجب عليكم عمله)، والثاني للشركاء والمزوّد (نطاق الأثر المشترك، الإجراءات، ومراقبة مؤشر الاختراق المعلن دون تفاصيل التحقيق الجارية).',
      },
      {
        question: 'عند تقييم مسودة حزمة «مواعيدي» بالروبرك (Rubric)، وُجد أن الخطر رقم 2 (عالي الأولوية) يحتوي على ضابط وقائي (2.و) وضابط كشف (2.ك) ولكنه يخلو من ضابط احتواء (2.ح). ما المستوى المستحق لمحور الضوابط وما التحسين القابل للتنفيذ؟',
        options: [
          'المستوى المستحق «متقن» (لوجود ضابط ناقص لخطر واحد)، والتحسين: إضافة الضابط (2.ح: عزل الأصل المرتبط بالحساب المخترق) وبيان حده ليرتفع إلى «متميز»',
          'المستوى المستحق «غير مكتمل»، والتحسين حذف مصفوفة الضوابط بالكامل',
          'المستوى المستحق «متميز» لأن ضوابط الاحتواء اختيارية في المخاطر عالية الأولوية',
          'المستوى المستحق «نامٍ»، والتحسين إلغاء سجل المخاطر ودمجه في فهرس الملف',
        ],
        correctIndex: 0,
        explanation: 'وفق جدول الروبرك وتطبيقه المحلول في كتاب المقرر (صفحة 76-77)، غياب ضابط واحد لخطر واحد يضع المحور في مستوى «متقن»، ويُحسّن بإضافة الضابط 2.ح وبيان حده ليرتفع المحور إلى «متميز».',
      },
      {
        question: 'أي من الممارسات التالية يُعد من «الأخطاء الشائعة السبعة» التي نص عليها الفصل الختامي عند إعداد حزمة تحليل التهديدات؟',
        options: [
          'تبرير ترتيب سجل المخاطر بضابط لم يُصمّم بعد، أو إسناد تكتيكات المجموعة المهاجمة كلها إلى حادثة Sony Pictures وحدها دون دليل تحقيق',
          'ترتيب سجل المخاطر بالأثر أولاً وفق محاور تحليل أثر الأعمال (BIA)',
          'توثيق البديل المرفوض ومبرر القرار مع الإحالة لرقم الخطر ورمز الضابط',
          'تحديد قاعدة بيانات المواعيد (appointments-db) كنقطة فشل أحادية (SPOF)',
        ],
        correctIndex: 0,
        explanation: 'نص القسم 8.13 في كتاب المقرر (صفحة 78) على أن تبرير ترتيب سجل المخاطر بضابط لم يُصمم بعد (يخلط السجل بالمصفوفة)، وإسناد تكتيكات المجموعة كلها لحادثة واحدة كـ Sony Pictures (يخلط الثابت بالتحقيق بالمستنتج) من أبرز الأخطاء الشائعة.',
      },
    ],
    interactiveBook3D: {
      model3DType: 'mitre_attack_matrix_cube',
      shaderEffect: 'forensic_matrix_lattice',
      cameraPosition: { x: 0, y: 2.6, z: 6.2 },
      autoRotateSpeed: 1.0,
      primaryNeonColor: '#ef4444',
      secondaryNeonColor: '#10b981',
      pages3D: [
        {
          pageNumber: 1,
          type: 'overview',
          title: 'مكعب مصفوفة MITRE ATT&CK وحزمة منصة «مواعيدي»',
          subtitle: 'تمثيل ثلاثي الأبعاد للطبقات السحابية الأربع والتكتيكات الـ 14 والمخرجات السبعة',
          contentMarkdown: `### الهندسة المتكاملة لحزمة تحليل التهديدات
يمثل المجسم ثلاثي الأبعاد مكعباً استراتيجياً يربط بين:
- **الطبقات الأربع لمنصة «مواعيدي»**: الشيفرة (\`Code\`)، الحاوية (\`Container\`)، العنقود (\`Kubernetes Cluster\`)، والسحابة (\`IaaS Cloud\`).
- **التكتيكات الـ 14 لـ MITRE ATT&CK**: من الاستطلاع والوصول الأولي إلى الاستكشاف والحركة الجانبية والأثر.
- **الترابط المرجعي الصارم**: كل قرار في المذكرة يحيل إلى **رقم خطر (1، 2، 3)** وإلى **رمز ضابط (\`و / ك / ح\`)**.`,
          highlightedRuleOrFormula: 'Decision_Justification -> Ref(Risk_ID ∈ {1,2,3}) + Ref(Control_Code ∈ {و, ك, ح}) + Rejected_Alternative',
          interactiveTakeaway: 'تفاعل مع أوجه المكعب لاستعراض جرد الأصول الستة لمنصة «مواعيدي» ونقطة الفشل الأحادية (appointments-db).',
        },
        {
          pageNumber: 2,
          type: 'anatomy',
          title: 'تشريح هجوم Sony Pictures 2014 بمنهجية الفصل الصارم',
          subtitle: 'فصل المؤكد بالتحقيق عن المستنتج، وتوثيق البديل المرفوض',
          contentMarkdown: `### كيف يحلل المهندس الجنائي حادثة كبرى دون خلط؟
1. **المستوى الأول (المؤكد بالتحقيق)**: التكتيكات والمؤشرات التي ثبتت بأدلة الحادثة نفسها (مسح الأقراص، رسائل التحذير، تسريب البيانات).
2. **المستوى الثاني (المستنتج من حملات المجموعة)**: لا يُسند إلى الحادثة وحدها كواقعة!
3. **مذكرة القرارات**: عزل الأصل فوراً (مقابل البديل المرفوض: إعادة البناء الفوري قبل التحقق).`,
          highlightedRuleOrFormula: 'Forensic_Analysis = Verified_Incident_Facts ≠ Attributed_Group_Campaign_History',
          interactiveTakeaway: 'انقر على عقدة Sony Pictures لمشاهدة الفرق بين الواقعة المثبتة والإجراء المقترح غير الموثق.',
        },
        {
          pageNumber: 3,
          type: 'defense-lab',
          title: 'مختبر بناء مصفوفة الضوابط (و، ك، ح) لمخاطر «مواعيدي» الثلاثة',
          subtitle: 'ربط كل خطر بثلاثة ضوابط وكتابة حدود كل ضابط بدقة',
          contentMarkdown: `### استكمال صفوف الخطر 1 والخطر 2 والخطر 3
- **الخطر 1 (وصول أولي بالتصيد على محطة الاستقبال)**: \`1.و\` (تصفية البريد وتوعية الموظف)، \`1.ك\` (تنبيه الماسح على المحطة)، \`1.ح\` (عزل المحطة عن الشبكة).
- **الخطر 2 (حركة جانبية بحساب مخترق)**: \`2.و\` (تقسيم الشبكة)، \`2.ك\` (مراقبة سجلات الدخول على خط الأساس)، \`2.ح\` (عزل الأصل المرتبط بالحساب المخترق).`,
          highlightedRuleOrFormula: 'Control_Row = { Control_ID (X.و/ك/ح), Risk_ID, Type, Description, Explicit_Limitation }',
          interactiveTakeaway: 'تذكر: لا يجوز تكرار نفس صياغة حدود الضابط حرفياً بين المخاطر المختلفة في المصفوفة.',
        },
        {
          pageNumber: 4,
          type: 'case-study',
          title: 'مختبر التقويم الذاتي بالروبرك (Rubric) وإصلاح الفجوات الأربع',
          subtitle: 'رفع مستوى المسودة من «نامٍ / متقن» إلى «متميز» قبل الإيداع النهائي',
          contentMarkdown: `### كيف نصلح الفجوات الأربع في مسودة «مواعيدي»؟
1. إضافة جملة فصل مسؤولية المزوّد عن الجهة في \`IaaS\` وتصنيف الصفين الناقصين في الجرد.
2. إضافة مؤشر الاختراق للخطر 3: *«ارتفاع غير معتاد في الطلبات على خادم الويب مقارنة بخط الأساس»*.
3. إضافة الضابط \`2.ح\` وبيان حده للخطر 2.`,
          highlightedRuleOrFormula: 'Rubric_Upgrade(Draft) => All_6_Criteria == "متميز (Exemplary)"',
          interactiveTakeaway: 'يرتفع كل محور في الروبرك إلى «متميز» فور استيفاء شروطه الأربعة وتوثيق التحسين في التقرير.',
        },
      ],
      stepByStep: [
        {
          stepNumber: 1,
          title: 'المرحلة 1: صياغة النطاق وفصل مسؤوليات IaaS وجرد الأصول وتصنيفها',
          description: 'تنفيذ nmap -sn 10.20.30.0/24 لحصر المضيفات الخمسة النشطة، وفصل مسؤولية المزوّد عن الجهة، وتصنيف كل أصل يمر عبره PII كـ «سري».',
          technicalDetail: 'تثبيت عنوان محطة الاستقبال (10.20.30.14) عبر ipconfig/ifconfig وتعليق تصنيف 10.20.30.21 حتى التحقق.',
          visualCue: 'ظهور خريطة أصول منصة «مواعيدي» ثلاثية الأبعاد مع خط حدود المسؤولية الفاصل في IaaS.',
          codeOrCommand: 'nmap -sn 10.20.30.0/24 -> Hosts Up: .11 (Web), .12 (ContainerHost), .13 (DB-SPOF), .14 (Reception), .21 (Unknown)',
        },
        {
          stepNumber: 2,
          title: 'المرحلة 2: بناء جدول تحليل التهديدات بربطه بتكتيكات MITRE ATT&CK ومؤشرات الاختراق',
          description: 'تحديد المصدر الفعلي لكل خطر (خارجي)، واختيار تكتيك ATT&CK (الوصول الأولي، الحركة الجانبية، الأثر)، وتحديد مؤشر قابل للمراقبة لكل خطر.',
          technicalDetail: 'تصنيف منظمة إجرامية تدير حساب موظف مخترق كتهديد «خارجي» لأن التصنيف بالمصدر الفعلي لا بالمسار.',
          visualCue: 'إضاءة مسارات التهديدات الثلاثة على مكعب MITRE ATT&CK وربطها بمؤشرات الكشف.',
          codeOrCommand: 'Threat_Table: Risk1(TA0001 Phishing) | Risk2(TA0008 Lateral Movement) | Risk3(TA0040 DoS Impact)',
        },
        {
          stepNumber: 3,
          title: 'المرحلة 3 و 4: إنشاء سجل المخاطر (BIA) ومصفوفة الضوابط الثلاثة (و، ك، ح) وحدودها',
          description: 'ترتيب المخاطر بالأثر أولاً (الخطر 2 ثم 3 ثم 1)، وتحديد قاعدة البيانات كنقطة فشل أحادية (SPOF)، وتخصيص 3 ضوابط لكل خطر مع حدودها.',
          technicalDetail: 'جدولة اللقطات (Snapshots) كأداة تعافٍ، واعتماد التكرار والتحويل الاحتياطي (Failover) دون خلطها بـ RAID.',
          visualCue: 'تشكل مصفوفة الدروع الثلاثية (وقائي، كشف، احتواء) حول كل خطر في المكعب.',
          codeOrCommand: 'Controls_Matrix: Risk2 -> [2.و: Network_Segmentation, 2.ك: Login_Baseline_Monitor, 2.ح: Host_Isolation]',
        },
        {
          stepNumber: 4,
          title: 'المرحلة 5 و 6: كتابة خطة الاستجابة ونموذجي الإشعار ومذكرة القرارات المبررة',
          description: 'رسم مسار التصعيد على مرحلتين (المؤشر لقائد SOC، والتأكيد للإدارة)، وصياغة إشعاري المتأثرين والشركاء، وتوثيق البديل المرفوض لكل قرار.',
          technicalDetail: 'تطبيق منهجية دراسة حالة Sony Pictures بفصل المؤكد بالتحقيق عن المستنتج.',
          visualCue: 'ظهور وثائق الإشعار ومذكرة القرارات مختومة بالأدلة المرجعية (رقم الخطر + رمز الضابط).',
          codeOrCommand: 'Decision_1: Isolate_Host(2.ح) | Rejected_Alt: Immediate_Rebuild | Proof: Risk_2 & Limit_of_2.ح',
        },
        {
          stepNumber: 5,
          title: 'المرحلة 7: التقويم الذاتي بالروبرك ومراجعة الأقران وإيداع الحزمة المفهرسة',
          description: 'فحص المخرجات على المحاور الستة للروبرك وسد الفجوات، وإجراء مراجعة الأقران غير المتزامنة، وتجميع ملف PDF النهائي المفهرس.',
          technicalDetail: 'التأكد من التسمية الموحدة للملفات وخلو الحزمة من الأخطاء الشائعة السبعة.',
          visualCue: 'اكتمال المكعب الهولوغرافي باللون الأخضر الزمردي مع شهادة اجتياز المحاور الستة بمستوى «متميز».',
          codeOrCommand: 'Package_Build: "مواعيدي ـ المخرج 1..7 ـ اسم الطالب.pdf" -> Rubric_Status: EXEMPLARY (6/6)',
        },
      ],
      hotspots: [
        {
          id: 'hs-ch9-mawaeidi-iaas-scope',
          label: 'معمارية منصة «مواعيدي» وحدود IaaS',
          title: 'الطبقات الأربع (الشيفرة، الحاوية، العنقود، السحابة) ونقطة الفشل الأحادية',
          x: -1.7,
          y: 1.3,
          z: 0.6,
          coordinates: { x: -1.7, y: 1.3, z: 0.6 },
          color: '#06b6d4',
          icon: 'Server',
          summary: 'فصل مسؤولية المزوّد السحابي عن مسؤولية الجهة المشترية وتصنيف أصول PII في أعلى مستوى.',
          detailedExplanation: 'تعمل منصة «مواعيدي» بالحاويات على سحابة IaaS؛ فيتولى المزوّد الطبقات الفيزيائية والافتراضية، وتتولى الجهة رقع وإعداد مضيف الحاويات (10.20.30.12) والحاويات والشيفرة، وتمثل قاعدة المواعيد (10.20.30.13) نقطة فشل أحادية (SPOF).',
          mitreTactic: 'Cloud & Container Security Architecture (IaaS Shared Responsibility)',
          defensiveControl: 'التحقق من سلامة سجل الصور (Image Registry) ومنع تشغيل الحاويات بصلاحيات مدير (Root).',
        },
        {
          id: 'hs-ch9-mitre-14-tactics',
          label: 'مصفوفة تكتيكات MITRE ATT&CK الـ 14',
          title: 'ربط التهديدات بمصادرها الفعلية وتكتيكاتها ومؤشرات الاختراق القابلة للمراقبة',
          x: 1.7,
          y: 1.3,
          z: 0.6,
          coordinates: { x: 1.7, y: 1.3, z: 0.6 },
          color: '#ef4444',
          icon: 'Layers',
          summary: 'من الاستطلاع وتطوير الموارد والوصول الأولي إلى الاستكشاف والحركة الجانبية والتسريب والأثر.',
          detailedExplanation: 'يُصنّف التهديد بمصدره الفعلي لا بمساره (فالحساب المخترق مسار داخلي لمنظمة خارجية)، ويُربط كل خطر في جدول التحليل بتكتيك ATT&CK ومؤشر اختراق قابل للمراقبة على خط الأساس.',
          mitreTactic: 'Full 14-Tactic MITRE ATT&CK Enterprise Matrix (TA0043 -> TA0040)',
          defensiveControl: 'مصفوفة الضوابط الثلاثية (وقائي و، كشف ك، احتواء ح) المرتبطة بأرقام المخاطر.',
        },
        {
          id: 'hs-ch9-sony-pictures-case',
          label: 'دراسة حالة Sony Pictures 2014 ومذكرة القرارات',
          title: 'فصل المؤكد بالتحقيق عن المستنتج وتوثيق البديل المرفوض بدليل مرجعي',
          x: -1.5,
          y: -1.2,
          z: 0.8,
          coordinates: { x: -1.5, y: -1.2, z: 0.8 },
          color: '#f59e0b',
          icon: 'FileText',
          summary: 'منهجية التحليل الجنائي الدقيق لحوادث التدمير الواسع وبناء القرارات المبررة.',
          detailedExplanation: 'في تحليل حادثة Sony Pictures 2014، لا تُسند تكتيكات المجموعة المهاجمة كلها إلى الحادثة وحدها إلا ما ثبت بالتحقيق، ويُوثق لكل قرار في المذكرة بديله المرفوض (كرفض إعادة البناء الفوري لصالح العزل الفوري) مع الإحالة لرقم الخطر ورمز الضابط.',
          mitreTactic: 'TA0040 - Impact (T1485 Data Destruction / T1561 Disk Wipe)',
          defensiveControl: 'العزل الفوري، حفظ الأدلة الزمنية، الإفصاح المنضبط، وتوثيق البدائل المرفوضة.',
        },
        {
          id: 'hs-ch9-rubric-peer-review',
          label: 'مقياس الروبرك ومراجعة الأقران (Rubric & Quality)',
          title: 'التقويم الذاتي على المحاور الستة وتجنب الأخطاء الشائعة السبعة قبل التسليم',
          x: 1.5,
          y: -1.2,
          z: 0.8,
          coordinates: { x: 1.5, y: -1.2, z: 0.8 },
          color: '#10b981',
          icon: 'Award',
          summary: 'فحص اكتمال النطاق والجرد والتحليل والضوابط والخطة والمذكرة والفهرسة.',
          detailedExplanation: 'يكشف الروبرك الفجوات في المسودة (كغياب حدود IaaS أو غياب مؤشر للخطر 3 أو نقص ضابط الاحتواء 2.ح) لترقيتها إلى مستوى «متميز» قبل الإيداع النهائي لملف PDF المفهرس.',
          mitreTactic: 'Quality Assurance & Governance Compliance Dossier',
          defensiveControl: 'التقويم الذاتي بالروبرك، مراجعة الأقران غير المتزامنة، وقوائم التحقق للمراحل الست.',
        },
      ],
    },
    richData: {
      id: 309,
      chapter_number: 9,
      title: 'دراسات الحالة التطبيقية وتحليل هجوم Sony Pictures وفق MITRE ATT&CK',
      subtitle: 'بناء حزمة تحليل التهديدات المتكاملة لمنصة «مواعيدي»، التكتيكات الـ 14، والروبرك',
      category: 'تطبيقي',
      pdfStartPage: 67,
      pdfEndPage: 79,
      description: 'يطبق هذا الفصل الختامي كامل مفاهيم المقرر في بناء حزمة تحليل التهديدات المتكاملة لمنصة «مواعيدي» الحكومية السحابية، وتحليل حادثة Sony Pictures 2014 وفق إطار MITRE ATT&CK، والتقويم الذاتي بالروبرك.',
      objectives: [
        'تحديد نطاق المشروع وحدود المسؤولية في بيئة الحاويات والسحابة (IaaS) وإجراء جرد الأصول وتصنيف البيانات (PII)',
        'تطبيق التكتيكات الـ 14 لإطار MITRE ATT&CK لبناء جدول تحليل التهديدات وسجل المخاطر المرتب بالأثر أولاً',
        'تصميم مصفوفة الضوابط (وقاية، كشف، احتواء) مع حدودها، وخطة الاستجابة ونموذجي الإشعار للمتأثرين والشركاء',
        'تحليل حادثة Sony Pictures 2014 بفصل المؤكد عن المستنتج، وتوثيق البديل المرفوض في مذكرة القرارات، وتطبيق الروبرك',
      ],
      sections: [
        {
          heading: '1. نطاق منصة «مواعيدي» وجرد الأصول وتكتيكات MITRE ATT&CK الـ 14',
          content: 'يُبنى النطاق على طبقات الشيفرة والحاوية والعنقود والسحابة، وتُجرد الأصول بعد مسح Nmap وتُصنف بناءً على مرور البيانات الشخصية (PII). وتُربط التهديدات بمصادرها الفعلية وتكتيكات ATT&CK الـ 14.',
          saudiExample: 'تأمين منصة «مواعيدي» الحكومية السعودية العاملة بالحاويات على بنية IaaS.',
        },
        {
          heading: '2. سجل المخاطر ومصفوفة الضوابط (و، ك، ح) وخطة الاستجابة والإشعاران',
          content: 'يُرتب سجل المخاطر بالأثر أولاً وفق BIA مع تحديد نقاط الفشل الأحادية (appointments-db)، وتُربط الضوابط الثلاثة بكل خطر مع حدودها، ويُصاغ إشعار المتأثرين وإشعار الشركاء والمزوّد.',
        },
        {
          heading: '3. دراسة حالة Sony Pictures 2014 ومذكرة القرارات والتقويم بالروبرك',
          content: 'يُفصل في تحليل الحادثة بين ما ثبت بالتحقيق وما ورد عن حملات متعددة للمجموعة، ويُوثق لكل قرار بديله المرفوض ومبرره بدليل من الحزمة، وتُسد الفجوات عبر التقويم الذاتي بالروبرك ومراجعة الأقران.',
        },
      ],
      tables: [
        {
          title: 'جدول المخرجات السبعة لحزمة تحليل التهديدات المتكاملة',
          headers: ['رقم', 'المخرج النهائي', 'صيغة التسليم'],
          rows: [
            ['1', 'وثيقة النطاق وحدود المشروع وجرد الأصول وتصنيف البيانات', 'صفحة واحدة وجدول جرد'],
            ['2', 'جدول تحليل التهديدات وسجل المخاطر مرتب الأولويات', 'جدولان مرقّما الصفوف'],
            ['3', 'مصفوفة ضوابط الوقاية والكشف والاحتواء', 'جدول مرقّم الضوابط (و، ك، ح)'],
            ['4', 'خطة الاستجابة للحوادث ونموذجا الإشعار', 'صفحتان ونموذجان'],
            ['5', 'مذكرة القرارات', 'قائمة قرارات مرقمة مع البديل المرفوض'],
            ['6', 'تقرير التقويم الذاتي بالروبرك وتقرير مراجعة الأقران', 'ورقة روبرك مملوءة وتقرير'],
            ['7', 'الحزمة المتكاملة', 'ملف PDF واحد مفهرس'],
          ],
        },
        {
          title: 'سجل المخاطر المرتب بالأثر أولاً لمنصة «مواعيدي»',
          headers: ['الأولوية', 'رقم الخطر', 'الوظيفة الأساسية المهددة', 'الأثر على المحاور', 'سبب الترتيب'],
          rows: [
            ['عالية', '2', 'الوصول إلى بيانات المستفيدين', 'العملاء، السمعة', 'أثره دائم في سرية بيانات شخصية واتساعه كبير'],
            ['عالية', '3', 'حجز المواعيد', 'العملاء، السمعة، المالية', 'يهدد وظيفة أساسية لكن أثره في التوافر يُزال بالتحويل الاحتياطي والاحتواء'],
            ['متوسطة', '1', 'الوصول إلى بيانات المستفيدين', 'العملاء', 'أثره محدود بأصل واحد واحتواؤه أسهل'],
          ],
        },
      ],
      commonMistake: {
        mistake: 'توسيع النطاق خارج المنصة، أو الخلط بين العلامة التحذيرية السابقة والمؤشر، أو إسناد تكتيكات المجموعة كلها لحادثة Sony Pictures، أو التسليم بلا مذكرة قرارات وروبرك.',
        fix: 'الالتزام بحدود النطاق، والتحقق من المؤشر قبل التصعيد، وفصل المؤكد بالتحقيق عن المستنتج، وإرفاق مذكرة القرارات وتقرير الروبرك.',
      },
      solvedExample: {
        title: 'تطبيق الروبرك لإصلاح مسودة ناقصة لحزمة منصة «مواعيدي»',
        given: 'مسودة حزمة لمنصة «مواعيدي» فيها 4 فجوات: عبارة النطاق بلا حدود ولا فصل مسؤوليات، وصفان من الجرد بلا تصنيف، والخطر 3 بلا مؤشر اختراق، والخطر 2 بلا ضابط احتواء.',
        steps: [
          '1. إصلاح النطاق والجرد (كان بمستوى نامٍ): إضافة جملة تُخرج الطبقات الفيزيائية والافتراضية وشبكة المزوّد كمسؤولية المزوّد، وتُدخل نظام تشغيل مضيف الحاويات ورقعه وإعدادات الحاويات والشيفرة كمسؤولية الجهة، وتصنيف الصفين وفق قاعدة مرور البيانات الشخصية (PII).',
          '2. إصلاح جدول التهديدات (كان بمستوى متقن): إضافة مؤشر للخطر 3 هو «ارتفاع غير معتاد في الطلبات على خادم الويب مقارنة بخط الأساس».',
          '3. إصلاح مصفوفة الضوابط (كان بمستوى متقن): إضافة الضابط 2.ح «عزل الأصل المرتبط بالحساب المخترق» مع بيان حده «يوقف الانتشار ولا يزيل البرمجية الخبيثة».',
        ],
        result: 'ارتقاء جميع محاور الحزمة إلى المستوى «متميز (Exemplary)» وجاهزيتها للإيداع النهائي.',
        whyItMatters: 'يبرهن عملياً كيف يعمل الروبرك كأداة تقويم ذاتي لسد الفجوات قبل التسليم.',
      },
      selfAssessment: [
        {
          question: 'ضع تكتيكي الاستطلاع والحركة الجانبية زمنياً بالنسبة للوصول الأولي، وبيّن موقع الاستكشاف بينهما مع السبب.',
          answer: 'يقع الاستطلاع (Reconnaissance) قبل الوصول الأولي لجمع معلومات عن الهدف، وتقع الحركة الجانبية بعد الوصول الأولي للتنقل بين الأنظمة؛ ويقع الاستكشاف (Discovery) بين الوصول الأولي والحركة الجانبية لأن المهاجم بعد دخوله الأولي يحتاج لجمع معلومات عن الحسابات والخدمات الداخلية قبل أن يتنقل جانبياً.',
        },
        {
          question: 'ما ميزة توثيق البديل المرفوض في مذكرة القرارات؟',
          answer: 'يمنع إعادة النظر والجدل في خيار دُرس ثم رُفض، ويثبت أن القرار المتخذ موزون ومبني على موازنة مكتوبة بين المخاطر والمزايا بأدلة من الحزمة.',
        },
      ],
    },
    updated_at: COURSE_TIMESTAMP,
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// 3. كائن توصيف المقرر الكامل (COURSE_ISE232_THREATS_INFO)
// ═══════════════════════════════════════════════════════════════════════════

export const COURSE_ISE232_THREATS_INFO: CourseInfo = {
  id: '660e8400-e29b-41d4-a716-446655440001',
  slug: 'ise232-threats',
  code: 'ISE 232',
  title: 'التهديدات السيبرانية',
  titleEn: 'Cyber Threats',
  category: 'الهجمات والتهديدات السيبرانية',
  level: 'المستوى الثالث (السنة الثانية - دبلوم أمن المعلومات)',
  icon: 'Bug',
  color: 'from-red-500 to-orange-600',
  accent: '#ef4444',
  badge: 'NCA / MITRE ATT&CK',
  neonColor: 'amber',
  status: 'available',
  chaptersCount: 9,
  totalHours: 48,
  deliveryMode: 'نظري + تطبيقي (مختبرات محاكاة وكتاب تفاعلي ثلاثي الأبعاد)',
  language: 'العربية (مع المصطلحات التقنية الإنجليزية المعتمدة)',
  instructor: 'فريق الهندسة الأكاديمية والأمن السيبراني - منصة مرصاد التشفير',
  prerequisite: 'لا توجد متطلبات سابقة (يبني المقرر المعرفة تدريجياً من الأساسيات حتى المشروع التراكمي)',
  description:
    'دراسة علمية وتطبيقية شاملة للتهديدات والهجمات السيبرانية الحديثة: من ثالوث الحماية الأساسي (CIA Triad) وتصنيف البرمجيات الخبيثة والهندسة الاجتماعية وحجب الخدمة وسلسلة القتل السيبراني (Cyber Kill Chain)، مروراً بنموذج AAA والتجسس السيبراني واختبار الاختراق الأخلاقي وتهديدات البنى التحتية الحيوية (OT/ICS/SCADA) والتقنيات الناشئة (IoT والسحابة والذكاء الاصطناعي التوليدي)، وصولاً إلى أنظمة كشف ومنع التسلل (IDS/IPS/SIEM) وقواعد Snort والاستجابة للحوادث وبناء حزمة تحليل التهديدات المتكاملة وفق مصفوفة MITRE ATT&CK.',
  vision:
    'تأهيل كوادر وطنية متخصصة قادرة على رصد وتحليل وتصنيف التهديدات السيبرانية التقليدية والناشئة، وبناء حزم دفاعية وخطط استجابة للحوادث تحمي الأصول المعلوماتية والبنى التحتية الحيوية وفق أعلى المعايير الوطنية (NCA) والدولية (NIST & MITRE ATT&CK).',
  mission:
    'تزويد الطالب بالمعارف العلمية العميقة والمهارات العملية التطبيقية لفهم سلوك المهاجمين وتكتيكاتهم، وتشغيل أدوات المسح والكشف (Nmap, Snort/Suricata, SIEM)، واتخاذ قرارات الاحتواء والتصعيد والعزل المبررة ضمن إطار المسؤولية المهنية والأخلاقية.',
  learningOutcomes: [
    'التمييز الدقيق بين التهديد والضعف والهجوم، وتصنيف فاعلي التهديد وقبعات المخترقين، وتقدير الأثر ودرجة الخطر وفق ثالوث CIA ومصفوفة NIST SP 800-30 Rev. 1.',
    'تحليل السلوك التقني لعائلات البرمجيات الخبيثة (الفيروسات، الديدان، التروجان/RAT، برمجيات الفدية ذات التشفير المزدوج، الجذور الخفية، والبرمجيات عديمة الملفات) واستخراج مؤشرات الاختراق (IoCs).',
    'تفكيك هجمات الهندسة الاجتماعية والتصيد الاحتيالي بفئاته الخمس، وهجمات حجب الخدمة (DoS/DDoS)، والاستغلال ورفع الصلاحيات عبر مراحل سلسلة الهجوم السيبرانية السبع (Cyber Kill Chain).',
    'تطبيق نموذج المصادقة والتفويض والمحاسبة (AAA)، ومبدأ أقل الامتيازات، وفصل المهام، والتحقق متعدد العوامل (MFA)، وتحليل سجلات التدقيق لمواجهة التهديدات الداخلية والخارجية.',
    'تمييز أساليب التجسس السيبراني والاعتراض (SNMP, LLMNR, DNS, Nmap, MitM, MitB) عن منهجيات اختبار الاختراق الأخلاقي المصرح المرتكزة على التصريح المكتوب وقواعد الاشتباك (RoE) والإفصاح المسؤول.',
    'حماية البنى التحتية الحيوية وأنظمة التحكم الصناعي (OT/ICS/SCADA/PLC) بتطبيق التجزئة والمنطقة منزوعة السلاح الصناعية (IDMZ) والمراقبة السلبية دون الإخلال بالتوافر والسلامة التشغيلية (Safety).',
    'تقييم التهديدات الناشئة في إنترنت الأشياء (IoT) والحوسبة السحابية (المسؤولية المشتركة والسيادة السيبرانية) والذكاء الاصطناعي التوليدي والوكلاء (تسميم البيانات وحقن الأوامر) وتطبيق الضوابط الأولية للتبني.',
    'إدارة أنظمة كشف ومنع التسلل (IDS/IPS/NGFW/EDR) وكتابة قواعد Snort، وربط التنبيهات في SIEM بتحليل أثر الأعمال (BIA)، وتنفيذ المراحل الست للاستجابة للحوادث مع حفظ الأدلة وسلسلة الحيازة.',
    'بناء حزمة تحليل تهديدات متكاملة لنظام رقمي واقعي («مواعيدي») وتحليل دراسات الحالة الكبرى (Sony Pictures 2014) وفق التكتيكات الـ 14 لمصفوفة MITRE ATT&CK وتقويمها ذاتياً بالروبرك.',
  ],
  topics: [
    'ثالوث CIA ومصفوفة الخطر NIST SP 800-30',
    'تصنيف البرمجيات الخبيثة (Malware & Fileless) ومؤشرات IoC',
    'الهندسة الاجتماعية والتصيد الموجه (Spear-Phishing) و DDoS',
    'سلسلة القتل السيبراني السباعية (Cyber Kill Chain)',
    'التهديدات الداخلية والخارجية ونموذج AAA و MFA',
    'التجسس السيبراني (SNMP/Nmap/MitM) والاختراق الأخلاقي (RoE)',
    'أمن البنى التحتية الحرجة وأنظمة التحكم الصناعي (OT/ICS/PLC & IDMZ)',
    'تهديدات IoT والسحابة والذكاء الاصطناعي التوليدي (Prompt Injection & Guardrails)',
    'أنظمة IDS/IPS/SIEM وقواعد Snort ودورة الاستجابة للحوادث وسلسلة الحيازة',
    'مصفوفة MITRE ATT&CK ودراسة حالة Sony Pictures ومشروع منصة «مواعيدي»',
  ],
  features: [
    '9 فصول أكاديمية وتطبيقية كاملة تغطي 100% من مفردات كتاب المقرر الرسمي دون أي اختصار',
    'شرح علمي موسع بصيغة Markdown غني بالجداول المقارنة وقواعد Snort/Suricata وتكتيكات MITRE ATT&CK',
    '45 شريحة عرض تقديمي تفاعلية (5 شرائح لكل فصل) مصممة وفق نموذج التأكيد والدليل',
    '54 بطاقة استذكار ذكية (6 بطاقات لكل فصل) و36 سؤال اختبار قصير مع التعليل العلمي المفصل',
    'كتاب تفاعلي ثلاثي الأبعاد (interactiveBook3D) لكل فصل يضم المجسمات، المظللات، الصفحات، الخطوات المتسلسلة، و36 نقطة ساخنة ثلاثية الأبعاد (x,y,z)',
  ],
  weeklyPlan: [
    {
      week: 1,
      topic: 'مدخل إلى التهديدات السيبرانية، تصنيف المخترقين وفاعلي التهديد، ثالوث CIA، ومصفوفة الخطر وفرز البلاغ الأولي',
      chapterNumber: 1,
    },
    {
      week: 2,
      topic: 'تصنيف البرمجيات الخبيثة (الفيروسات، الديدان، التروجان، الفدية Ransomware، الجذور الخفية، وعديمة الملفات) ومؤشرات الاختراق IoCs',
      chapterNumber: 2,
    },
    {
      week: 3,
      topic: 'الهندسة الاجتماعية والتصيد الاحتيالي، هجمات حجب الخدمة (DoS/DDoS)، الاستغلال، وسلسلة القتل السيبراني (Cyber Kill Chain)',
      chapterNumber: 3,
    },
    {
      week: 4,
      topic: 'التهديدات الداخلية والخارجية، نموذج المصادقة والتفويض والمحاسبة (AAA)، أقل الامتيازات، فصل المهام، وسجلات التدقيق',
      chapterNumber: 4,
    },
    {
      week: 5,
      topic: 'التجسس السيبراني (SNMP, LLMNR, DNS, Nmap)، هجمات الاعتراض (MitM/MitB)، ومنهجيات الاختراق الأخلاقي المصرح (RoE)',
      chapterNumber: 5,
    },
    {
      week: 6,
      topic: 'تهديدات البنى التحتية الحرجة وأنظمة التحكم الصناعي (OT/ICS/SCADA/PLC)، التجزئة و IDMZ، والمراقبة السلبية',
      chapterNumber: 6,
    },
    {
      week: 7,
      topic: 'التهديدات السيبرانية الناشئة: إنترنت الأشياء (IoT)، الحوسبة السحابية والسيادة، والذكاء الاصطناعي التوليدي والوكلاء (AI Agents)',
      chapterNumber: 7,
    },
    {
      week: 8,
      topic: 'أنظمة كشف ومنع التسلل (IDS/IPS/SIEM)، قواعد Snort، تحليل أثر الأعمال (BIA)، والمراحل الست للاستجابة للحوادث وسلسلة الحيازة',
      chapterNumber: 8,
    },
    {
      week: 9,
      topic: 'دراسات الحالة التطبيقية وتحليل هجوم Sony Pictures وفق مصفوفة MITRE ATT&CK وبناء حزمة تحليل التهديدات لمنصة «مواعيدي»',
      chapterNumber: 9,
    },
  ],
  assessmentMethods: [
    {
      name: 'الاختبار النهائي الشامل',
      weight: 40,
      description: 'اختبار تحليلي وتطبيقي يغطي الفصول التسعة، تشريح الهجمات، قراءة السجلات، ومصفوفة MITRE ATT&CK.',
    },
    {
      name: 'المشروع التطبيقي التراكمي (حزمة تحليل التهديدات المتكاملة)',
      weight: 30,
      description: 'بناء المخرجات السبعة لحزمة تحليل التهديدات لمنصة «مواعيدي» السحابية مع مذكرة القرارات والتقويم بالروبرك.',
    },
    {
      name: 'تحليل الحوادث والمختبرات التفاعلية (Nmap & Snort & 3D Labs)',
      weight: 20,
      description: 'تطبيق عملي على فرز البلاغات، استخراج مؤشرات الاختراق IoCs، وكتابة قواعد الكشف وتحليل حالة Sony Pictures.',
    },
    {
      name: 'المشاركة الصفية ومراجعة الأقران غير المتزامنة',
      weight: 10,
      description: 'تقديم ملاحظات بناءة على مخرجات الزملاء وفق معايير الروبرك والمشاركة في النقاشات التحليلية.',
    },
  ],
  reference:
    'كتاب المقرر الرسمي: التهديدات السيبرانية (ISE232) - مستند إلى Ryan Tolboom (Computer Systems Security: Planning for Success) & WEF Global Cybersecurity Outlook 2026 & NIST SP 800-30 / SP 800-61 & MITRE ATT&CK & ضوابط الهيئة الوطنية للأمن السيبراني (NCA ECC/CSCC/OTCC)',
  chapters: ISE232_THREATS_CHAPTERS,
};

// ═══════════════════════════════════════════════════════════════════════════
// 4. التصديرات المتوافقة مع بنية المنصة (Exports for Full Compatibility)
// ═══════════════════════════════════════════════════════════════════════════

export const CHAPTERS: Chapter[] = ISE232_THREATS_CHAPTERS;

export default {
  COURSE_ISE232_THREATS_INFO,
  ISE232_THREATS_CHAPTERS,
  CHAPTERS,
};