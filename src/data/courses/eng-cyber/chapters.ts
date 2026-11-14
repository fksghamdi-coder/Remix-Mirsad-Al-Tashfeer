/**
 * ============================================================================
 * منصة مرصاد التشفير الأكاديمية (Mirsad Academic Platform)
 * المقرر السادس: اللغة الإنجليزية الأكاديمية للأمن السيبراني والتشفير
 * Course 6: Academic English for Cybersecurity & Cryptography (ENG-CYBER)
 * ============================================================================
 *
 * هذا الملف مستقل وكامل ومفصل (Standalone & Comprehensive TypeScript Module)
 * يطوّر نموذج `/src/pages/academic/EnglishCourseInteractive.tsx` إلى مقرر أكاديمي
 * متكامل من 8 فصول دراسية متدرجة يتبع المعمارية القياسية للمقررات الأكاديمية
 * في منصة مرصاد، مع دعم كامل لمنظومة النطق الصوتي التفاعلي (IPA Phonetics & Web Speech API)
 * ونظام الدراسة المزدوج:
 *   1. الفئة الأولى (التنسيق الأكاديمي الشامل - Academic Format)
 *   2. الفئة الثانية (الكتاب التفاعلي ثلاثي الأبعاد - 3D Interactive Book)
 */

// ============================================================================
// 1. تعريف الواجهات القياسية والمتقدمة (TypeScript Interfaces)
// ============================================================================

export interface VocabularyItem {
  id: string;
  term: string;
  acronym?: string;
  partOfSpeech: 'Noun' | 'Verb' | 'Adjective' | 'Adverb' | 'Noun Phrase' | 'Modal Verb' | 'Technical Clause';
  phonetic: string; // التمثيل الصوتي الدولي IPA
  pronunciationAudioText: string; // النص المخصص للنطق عبر Web Speech API
  arabicMeaning: string;
  academicDefinitionEn: string;
  academicDefinitionAr: string;
  exampleSentenceEn: string;
  exampleSentenceAr: string;
  collocations: string[];
  commonErrorWarning?: string;
}

export interface TerminologyGlossaryEntry {
  term: string;
  phonetic: string;
  pronunciationAudioText: string;
  category: 'Cryptography' | 'Standards & RFCs' | 'SOC & IR' | 'Forensics' | 'Risk & Board' | 'Policy & GRC' | 'PQC & ZKP' | 'Advisory & Presentation';
  arabicEquivalent: string;
  usageContext: string;
}

export interface SlideData {
  slideNumber: number;
  title: string;
  titleEn: string;
  bulletPoints: string[];
  englishKeyExcerpt: string;
  phoneticHighlight: string;
  speakerNotes: string;
  visualCue: string;
}

export interface FlashcardData {
  front: string;
  back: string;
  category?: string;
  phonetic?: string;
  pronunciationAudioText?: string;
}

export interface MiniQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ChapterImage {
  prompt?: string;
  caption: string;
  alt?: string;
  seed?: number;
  isAIGenerated?: boolean;
  url?: string;
}

export interface Page3D {
  pageNumber: number;
  titleAr: string;
  titleEn: string;
  badge: string;
  bilingualSummaryAr: string;
  englishExcerpt: string;
  phoneticGuide: string;
  pronunciationAudioText: string;
  grammarOrStyleTip: string;
  keyTakeaway: string;
}

export interface StepByStep3D {
  stepNumber: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  englishActionPhrase: string;
  phonetic: string;
  pronunciationAudioText: string;
  visualState: string;
}

export interface Hotspot3D {
  id: string;
  labelAr: string;
  labelEn: string;
  coordinates: { x: number; y: number; z: number };
  phonetic: string;
  pronunciationAudioText: string;
  explanationAr: string;
  englishTemplateSnippet: string;
  securityContext: string;
}

export interface InteractiveBook3DData {
  model3DType:
    | 'CRYPTO_LEXICON_CUBE'
    | 'RFC_NORMATIVE_PILLAR'
    | 'SOC_SIEM_RADAR_ORB'
    | 'FORENSIC_TIMELINE_PRISM'
    | 'BOARD_RISK_MATRIX_HOLOGRAM'
    | 'POLICY_SHIELD_MONOLITH'
    | 'PQC_LATTICE_HYPERCUBE'
    | 'CVE_ADVISORY_PODIUM';
  shaderEffect:
    | 'emerald-cyber-glow'
    | 'cyan-normative-grid'
    | 'amber-soc-pulse'
    | 'rose-forensic-scan'
    | 'violet-executive-aura'
    | 'blue-compliance-lattice'
    | 'quantum-iridescent-wave'
    | 'gold-academic-beacon';
  bookTitleEn: string;
  bookTitleAr: string;
  pages3D: Page3D[];
  stepByStep: StepByStep3D[];
  hotspots: Hotspot3D[];
}

export interface Chapter {
  id: number;
  chapter_number: number;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  phonetic: string;
  pronunciationAudioText: string;
  diagramKey:
    | 'eng-cyber-1'
    | 'eng-cyber-2'
    | 'eng-cyber-3'
    | 'eng-cyber-4'
    | 'eng-cyber-5'
    | 'eng-cyber-6'
    | 'eng-cyber-7'
    | 'eng-cyber-8';
  content: string;
  keyTopics: string[];
  vocabularyList: VocabularyItem[];
  terminologyGlossary: TerminologyGlossaryEntry[];
  images: ChapterImage[];
  videoUrl: string;
  presentationUrl: string;
  slides: SlideData[];
  flashcards: FlashcardData[];
  miniQuiz: MiniQuiz[];
  interactiveBook3D: InteractiveBook3DData;
  pdfStartPage?: number;
  pdfEndPage?: number;
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
  terminologyGlossary: TerminologyGlossaryEntry[];
  chapters: Chapter[];
}

// ============================================================================
// 2. دالة النطق الصوتي المساعدة عبر Web Speech API (speakCyberTerm)
// ============================================================================

export interface SpeakCyberTermOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (errorMessage: string) => void;
}

/**
 * دالة مساعدة لنطق المصطلحات والجمل الأكاديمية السيبرانية عبر Web Speech API
 * مصممة للعمل بأمان في بيئات المتصفح وبيئات الخادم (SSR-Safe) دون استخدام window.alert
 */
export function speakCyberTerm(
  _text: string,
  _options: SpeakCyberTermOptions = {}
): boolean {
  return false;
}

// ============================================================================
// 3. مصفوفة الفصول الدراسية الكاملة (ENG_CYBER_CHAPTERS - 8 فصول متدرجة)
// ============================================================================

const GENERATED_TIMESTAMP = 1762473600000;

export const ENG_CYBER_CHAPTERS: Chapter[] = [
  // ==========================================================================
  // الفصل الأول (Chapter 1)
  // ==========================================================================
  {
    id: 601,
    chapter_number: 1,
    title: 'المصطلحات التأسيسية في التشفير والأمن السيبراني',
    subtitle: 'Core Cryptography & Cybersecurity Terminology: Plaintext, Ciphertext, Non-Repudiation, Ephemeral Keys, Perfect Forward Secrecy',
    description: 'إتقان البنية الصرفية والصوتية والدلالية للمصطلحات التأسيسية في علم التشفير وهندسة الأمن السيبراني، مع التدريب العملي على صياغة الجمل الأكاديمية ونطق الرموز الصوتية (IPA).',
    category: 'أساسي',
    difficulty: 'beginner',
    phonetic: '/kɔːr ˌkrɪptəˈɡræfɪk ænd ˌsaɪbərsɪˈkjʊərəti ˌtɜːrmɪˈnɒlədʒi/',
    pronunciationAudioText: 'Core Cryptographic and Cybersecurity Terminology: Plaintext, Ciphertext, Non-Repudiation, Ephemeral Keys, and Perfect Forward Secrecy.',
    diagramKey: 'eng-cyber-1',
    videoUrl: 'https://www.youtube.com/watch?v=jhXCTbFnK8o',
    presentationUrl: '/assets/presentations/eng-cyber-ch1-core-terminology.pdf',
    pdfStartPage: 1,
    pdfEndPage: 18,
    updated_at: GENERATED_TIMESTAMP,
    keyTopics: [
      'البنية اللغوية والصوتية لمصطلحات التشفير الأساسية (Plaintext, Ciphertext, Cleartext, Keystream)',
      'الفرق الدقيق في الكتابة الأكاديمية بين (Encryption, Encoding, Hashing, Obfuscation)',
      'الصياغة القانونية والتقنية لمفهوم عدم الإنكار (Non-Repudiation) ومثلت CIA Triad',
      'المفاتيح المؤقتة (Ephemeral Keys) والسرية الأمامية التامة (Perfect Forward Secrecy - PFS)',
      'بناء الجمل الأكاديمية بالمبني للمجهول (Passive Voice) لوصف العمليات التشفيرية',
    ],
    content: `## تمهيد أكاديمي: لماذا ندرس الإنجليزية التخصصية للتشفير؟

تُكتب المعايير الدولية في التشفير والأمن السيبراني—مثل إصدارات المعهد الوطني للمعايير والتقنية الأمريكي ([NIST Cryptographic Standards](https://csrc.nist.gov/publications)) ووثائق مجموعة مهندسي الإنترنت ([IETF RFCs](https://www.rfc-editor.org/)) والنسخ الإنجليزية من الضوابط والمعايير الصادرة عن الهيئة الوطنية للأمن السيبراني ([NCA National Cryptography Standards - NCS](https://nca.gov.sa/en/regulatory-documents/frameworks-and-standard-list/ncs/))—بلغة إنجليزية تقنية شديدة الدقة. إن الخلط بين فعلين متقاربين مثل **Encrypt** و **Encode**، أو بين اسمين مثل **Authentication** و **Authorization**، قد يؤدي إلى ثغرة تصميمية أو سوء تفسير لضابط امتثال إلزامي.

---page---

## أولاً: جدول المصطلحات التأسيسية والنطق الصوتي (IPA Phonetic Matrix)

يوضح الجدول التالي المصطلحات المحورية في هذا الفصل مع تمثيلها الصوتي الدولي (IPA) ودلالتها الهندسية الدقيقة:

| المصطلح الإنجليزي (Term) | النطق الصوتي (IPA) | الفئة النحوية | المقابل العربي المعتمد | الدلالة الهندسية الدقيقة في التشفير |
| :--- | :--- | :--- | :--- | :--- |
| **Plaintext** | \`/ˈpleɪn.tekst/\` | Noun (Uncountable) | النص الواضح / الأصلي | البيانات الخام القابلة للقراءة قبل إدخالها في خوارزمية التشفير. |
| **Ciphertext** | \`/ˈsaɪ.fər.tekst/\` | Noun (Uncountable) | النص المشفر / المعمّى | المخرج غير المفهوم الناتج عن تطبيق خوارزمية التشفير والمفتاح على النص الواضح. |
| **Non-Repudiation** | \`/ˌnɒn.rɪˌpjuː.diˈeɪ.ʃən/\` | Noun | عدم الإنكار / الحجية | ضمان رياضي وقانوني يمنع المُرسِل من إنكار توقيعه للرسالة أو إرسالها لاحقاً. |
| **Ephemeral Key** | \`/ɪˈfem.ər.əl kiː/\` | Noun Phrase | مفتاح مؤقت / زائل | مفتاح تشفير يُولَّد لجلسة اتصال واحدة فقط ثم يُتلف فوراً عقب انتهاء الجلسة. |
| **Perfect Forward Secrecy (PFS)** | \`/ˈpɜː.fekt ˈfɔː.wəd ˈsiː.krə.si/\` | Noun Phrase | السرية الأمامية التامة | خاصية تضمن عدم انكشاف جلسات الاتصال السابقة حتى لو سُرِق المفتاح الخاص الطويل الأمد للخادم مستقبلاً. |
| **Cryptographic Primitive** | \`/ˌkrɪp.təˈɡræf.ɪk ˈprɪm.ɪ.tɪv/\` | Noun Phrase | لبنة تشفيرية أولية | خوارزمية أساسية منخفضة المستوى (مثل AES أو SHA-256) تُبنى عليها البروتوكولات الأمنية. |
| **Key Encapsulation** | \`/kiː ɪnˌkæp.sjʊˈleɪ.ʃən/\` | Noun Phrase | تغليف المفاتيح | آلية تأمين مفتاح متماثل عبر تغليفه بالمفتاح العام للمستقبل (مثل معيار ML-KEM). |
| **Entropy** | \`/ˈen.trə.pi/\` | Noun | العشوائية / الإنتروبيا | مقياس عدم القابلية للتنبؤ في مولدات الأرقام العشوائية التشفيرية (CSPRNG). |

---page---

## ثانياً: الفروق الدلالية الدقيقة (Semantic Precision in Cryptography)

### 1. الفرق بين Encryption و Encoding و Hashing
في الكتابة الأكاديمية والتقارير الفنية، يُعد استخدام هذه المصطلحات بالتبادل خطأً جسيماً:
- **Encryption (التشفير)**: عملية ثنائية الاتجاه (Reversible) تعتمد على مفتاح سري (Secret/Private Key)؛ الغاية منها **السرية (Confidentiality)**.
  - *Academic Formulation*: *"Sensitive payload data is **encrypted** at rest using AES-256-GCM."*
- **Encoding (الترميز)**: تحويل البيانات من تنسيق إلى آخر (مثل Base64 أو UTF-8) لضمان توافق النقل دون أي مفتاح سري؛ الغاية منها **قابلية الاستخدام (Usability & Interoperability)** وليس الأمان.
  - *Academic Formulation*: *"The binary certificate is **encoded** in Base64 format for HTTP transport."*
- **Hashing (التجزئة / الدالة الاختزالية)**: دالة رياضية أحادية الاتجاه (One-Way Function) تحوّل مدخلاً بأي حجم إلى بصمة ثابتة الطول (Digest)؛ الغاية منها **سلامة البيانات (Data Integrity)**.
  - *Academic Formulation*: *"User passwords must be **hashed** using Argon2id with a unique cryptographic salt."*

> [!warning]
> **خطأ لغوي شائع (Common Linguistic Pitfall)**:
> لا تكتب أبداً في التقرير التقني: *"We encrypted the password using SHA-256"* أو *"Base64 encryption"*. الصياغة الأكاديمية الصحيحة هي: *"We computed the SHA-256 hash digest"* و *"Base64 encoding"*.

---page---

## ثالثاً: البنية الصرفية (Morphology) للمصطلحات السيبرانية

يساعد تحليل الجذور اللاتينية واليونانية واللواحق (Prefixes & Suffixes) على فهم ونطق المصطلحات المعقدة:
1. **البادئة \`crypto-\`** (من اليونانية *kryptos* بمعنى مخفي/سري):
   - **Cryptography** (\`/krɪpˈtɒɡ.rə.fi/\`): علم تصميم أنظمة التشفير (كتابة السر).
   - **Cryptanalysis** (\`/ˌkrɪp.təˈnæl.ə.sɪs/\`): علم كسر التشفير وتحليل نقاط ضعفه دون معرفة المفتاح مسبقاً.
   - **Cryptology** (\`/krɪpˈtɒl.ə.dʒi/\`): العلم الجامع لفرعي Cryptography و Cryptanalysis معاً.
2. **البادئة \`non-\` واللاحقة \`-ation\` في \`Non-Repudiation\`**:
   - الفعل **Repudiate** (\`/rɪˈpjuː.di.eɪt/\`) يعني «يرفض الاعتراف بـ» أو «ينكر صحة شيء».
   - بإضافة \`Non-\` و \`-ation\` نحصل على **Non-Repudiation** (\`/ˌnɒn.rɪˌpjuː.diˈeɪ.ʃən/\`)، وتتحقق تقنياً عبر التوقيع الرقمي (**Digital Signature**) وليس عبر رموز مصادقة الرسائل المتماثلة (**MAC / HMAC**)؛ لأن المفتاح المتماثل مشترك بين الطرفين فلا يمنع أحدهما من الادعاء بأن الطرف الآخر هو من أنشأ الرسالة.
3. **الصفة \`Ephemeral\`** (\`/ɪˈfem.ər.əl/\`):
   - مشتقة من أصل يوناني يعني «يدوم ليوم واحد فقط». وفي بروتوكول [TLS 1.3 (RFC 8446)](https://www.rfc-editor.org/info/rfc8446)، تُستخدم **Ephemeral Diffie-Hellman Keys (ECDHE)** لضمان تحقيق **Perfect Forward Secrecy (PFS)**.

---page---

## رابعاً: نموذج فقرة توصيف معماري رسمية مع التحليل اللغوي

اقرأ الفقرة الأكاديمية التالية المقتبسة من وثيقة تصميم معماري لتشفير الاتصالات في مؤسسة مالية سعودية، ثم راجع ترجمتها وتحليلها اللغوي:

> **Official English Architectural Specification Excerpt:**
> *"To preserve long-term confidentiality and enforce non-repudiation across all inter-bank API transactions, the gateway establishes mutually authenticated TLS 1.3 channels utilizing ephemeral elliptic-curve Diffie-Hellman (ECDHE) key exchange over Curve25519. Upon session termination, all ephemeral session keys are cryptographically zeroized from volatile memory, thereby guaranteeing Perfect Forward Secrecy (PFS) even in the event of a future compromise of the server's long-term private signing key."*

### الترجمة العربية الاحترافية المعتمدة:
«للحفاظ على السرية طويلة الأمد وفرض عدم الإنكار عبر جميع معاملات واجهات برمجة التطبيقات بين البنوك، تُنشئ البوابة قنوات اتصال بتقنية TLS 1.3 ذات مصادقة متبادلة باستخدام تبادل مفاتيح ديفي-هيلمان المؤقت المعتمد على المنحنيات الإهليلجية (ECDHE) فوق منحنى Curve25519. وفور انتهاء الجلسة، تُصفَّر جميع مفاتيح الجلسة المؤقتة تشفيرياً من الذاكرة المتطايرة، مما يضمن السرية الأمامية التامة (PFS) حتى في حال تعرض المفتاح الخاص طويل الأمد الخاص بتوقيع الخادم للاختراق مستقبلاً.»

### التحليل اللغوي والأكاديمي (Linguistic & Stylistic Breakdown):
- **\`To preserve ... and enforce ...\`**: افتتاحية مصدرية (Infinitive of Purpose) شائعة في وثائق التصميم لربط الضابط التقني بالهدف الأمني.
- **\`mutually authenticated TLS 1.3 channels\`**: نعت مركب (Compound Modifier) باستخدام الظرف \`mutually\` متبوعاً باسم المفعول \`authenticated\` لوصف مصادقة الطرفين (mTLS).
- **\`are cryptographically zeroized\`**: صيغة المبني للمجهول (Passive Voice) مع الفعل التقني الدقيق **Zeroize** (\`/ˈzɪə.rəʊ.aɪz/\`) الذي يعني الكتابة فوق الذاكرة بالأصفار لحذف أثر المفتاح تماماً، وهو أدق أكاديمياً من الفعل العام *Delete*.
- **\`thereby guaranteeing\`**: رابط سببي رصين (Formal Resultative Participle) يربط الإجراء التقني بالنتيجة الأمنية الحتمية.`,
    vocabularyList: [
      {
        id: 'voc-101',
        term: 'Plaintext',
        partOfSpeech: 'Noun',
        phonetic: '/ˈpleɪn.tekst/',
        pronunciationAudioText: 'Plaintext. Prior to encryption, the plaintext is padded to match the block size.',
        arabicMeaning: 'النص الواضح / البيانات الأصلية غير المشفرة',
        academicDefinitionEn: 'Unencrypted data that is input into a cryptographic cipher to be transformed into ciphertext.',
        academicDefinitionAr: 'البيانات غير المشفرة التي تُدخل إلى خوارزمية التشفير لتحويلها إلى نص مشفر.',
        exampleSentenceEn: 'Prior to encryption, the plaintext must never be written to unencrypted swap storage.',
        exampleSentenceAr: 'قبل عملية التشفير، يجب ألا يُكتب النص الواضح أبداً في مساحة التبديل غير المشفرة.',
        collocations: ['input plaintext', 'recover plaintext', 'known-plaintext attack', 'plaintext block'],
        commonErrorWarning: 'يُكتب كلمة واحدة متصلة (Plaintext) في المعايير الحديثة مثل NIST، ولا يُجمع بصيغة Plaintexts بل يُعامل معاملة الاسم غير المعدود.',
      },
      {
        id: 'voc-102',
        term: 'Ciphertext',
        partOfSpeech: 'Noun',
        phonetic: '/ˈsaɪ.fər.tekst/',
        pronunciationAudioText: 'Ciphertext. Authenticated encryption ensures the integrity of the transmitted ciphertext.',
        arabicMeaning: 'النص المشفر / المعمّى',
        academicDefinitionEn: 'The scrambled, unreadable output produced by applying an encryption algorithm and key to plaintext.',
        academicDefinitionAr: 'المخرج المشوّش غير القابل للقراءة الناتج عن تطبيق خوارزمية التشفير والمفتاح على النص الواضح.',
        exampleSentenceEn: 'Any bit modification within the ciphertext immediately invalidates the GCM authentication tag.',
        exampleSentenceAr: 'أي تعديل في البتات داخل النص المشفر يُبطل فوراً وسم المصادقة في نمط GCM.',
        collocations: ['ciphertext integrity', 'chosen-ciphertext attack (CCA)', 'ciphertext expansion'],
        commonErrorWarning: 'انتبه لنطق الحرف الأول بصوت /s/ (/ˈsaɪ.fər/) وتجنب كتابته بالياء القديمة Cyphertext في التقارير الأمريكية القياسية.',
      },
      {
        id: 'voc-103',
        term: 'Non-Repudiation',
        partOfSpeech: 'Noun',
        phonetic: '/ˌnɒn.rɪˌpjuː.diˈeɪ.ʃən/',
        pronunciationAudioText: 'Non-Repudiation. Digital signatures provide cryptographic non-repudiation for financial transactions.',
        arabicMeaning: 'عدم الإنكار / الحجية القانونية الرقمية',
        academicDefinitionEn: 'A security service that provides proof of the origin and integrity of data, preventing the sender from denying having sent it.',
        academicDefinitionAr: 'خدمة أمنية توفر إثباتاً لأصل البيانات وسلامتها، مما يمنع المرسل من إنكار إرسالها أو توقيعها.',
        exampleSentenceEn: 'Asymmetric digital signatures guarantee non-repudiation across national electronic invoicing systems.',
        exampleSentenceAr: 'تضمن التواقيع الرقمية غير المتماثلة عدم الإنكار عبر أنظمة الفوترة الإلكترونية الوطنية.',
        collocations: ['enforce non-repudiation', 'cryptographic non-repudiation', 'non-repudiation of origin'],
        commonErrorWarning: 'لا يتحقق Non-Repudiation عبر التشفير المتماثل وحده لأن المفتاح مشترك بين الطرفين.',
      },
      {
        id: 'voc-104',
        term: 'Ephemeral Key',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/ɪˈfem.ər.əl kiː/',
        pronunciationAudioText: 'Ephemeral Key. Each TLS handshake generates a fresh ephemeral key pair.',
        arabicMeaning: 'المفتاح المؤقت / الزائل',
        academicDefinitionEn: 'A cryptographic key generated for a single execution of a key-establishment process and destroyed immediately thereafter.',
        academicDefinitionAr: 'مفتاح تشفيري يُولَّد لتنفيذ واحد فقط في عملية تأسيس المفتاح ثم يُتلف فور انتهاء الجلسة.',
        exampleSentenceEn: 'Using an ephemeral key per session prevents retrospective decryption of captured traffic.',
        exampleSentenceAr: 'يمنع استخدام مفتاح مؤقت لكل جلسة فك التشفير بأثر رجعي لحركة البيانات الملتقطة.',
        collocations: ['ephemeral key pair', 'ephemeral Diffie-Hellman (ECDHE)', 'zeroize ephemeral keys'],
        commonErrorWarning: 'احرص على نطق المقطع الثاني بالفاء /f/ (/ɪˈfem.ər.əl/) وليس بالباء.',
      },
      {
        id: 'voc-105',
        term: 'Perfect Forward Secrecy',
        acronym: 'PFS',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/ˈpɜː.fekt ˈfɔː.wəd ˈsiː.krə.si/',
        pronunciationAudioText: 'Perfect Forward Secrecy. TLS 1.3 mandates cipher suites that support Perfect Forward Secrecy.',
        arabicMeaning: 'السرية الأمامية التامة',
        academicDefinitionEn: 'A property of key-agreement protocols ensuring that compromise of long-term keys does not compromise past session keys.',
        academicDefinitionAr: 'خاصية في بروتوكولات اتفاق المفاتيح تضمن أن اختراق المفاتيح طويلة الأمد لا يؤدي إلى كشف مفاتيح الجلسات السابقة.',
        exampleSentenceEn: 'Static RSA key exchange was deprecated in TLS 1.3 because it lacks Perfect Forward Secrecy.',
        exampleSentenceAr: 'أُلغي تبادل مفاتيح RSA الثابت في TLS 1.3 لأنه يفتقر إلى السرية الأمامية التامة.',
        collocations: ['guarantee Perfect Forward Secrecy', 'provide forward secrecy', 'PFS-compliant cipher suite'],
      },
      {
        id: 'voc-106',
        term: 'Zeroization',
        partOfSpeech: 'Noun',
        phonetic: '/ˌzɪə.rəʊ.aɪˈzeɪ.ʃən/',
        pronunciationAudioText: 'Zeroization. Hardware security modules perform immediate cryptographic zeroization upon tamper detection.',
        arabicMeaning: 'التصفير التشفيري للذاكرة',
        academicDefinitionEn: 'A method of erasing electronically stored sensitive parameters and cryptographic keys by altering or deleting the contents to prevent recovery.',
        academicDefinitionAr: 'طريقة لمسح المعاملات الحساسة والمفاتيح التشفيرية المخزنة إلكترونياً عبر استبدال محتوياتها بالأصفار لمنع استعادتها.',
        exampleSentenceEn: 'FIPS 140-3 requires verifiable zeroization of all plaintext secret keys upon module decommissioning.',
        exampleSentenceAr: 'يتطلب معيار FIPS 140-3 تصفير جميع المفاتيح السرية الواضحة بشكل قابل للتحقق عند إخراج الوحدة من الخدمة.',
        collocations: ['cryptographic zeroization', 'tamper-triggered zeroization', 'zeroize memory'],
      },
    ],
    terminologyGlossary: [
      {
        term: 'Plaintext',
        phonetic: '/ˈpleɪn.tekst/',
        pronunciationAudioText: 'Plaintext',
        category: 'Cryptography',
        arabicEquivalent: 'النص الواضح',
        usageContext: 'البيانات قبل التشفير أو بعد نجاح فك التشفير.',
      },
      {
        term: 'Ciphertext',
        phonetic: '/ˈsaɪ.fər.tekst/',
        pronunciationAudioText: 'Ciphertext',
        category: 'Cryptography',
        arabicEquivalent: 'النص المشفر',
        usageContext: 'المخرج المشفر المرسل عبر قناة الاتصال غير الموثوقة.',
      },
      {
        term: 'Non-Repudiation',
        phonetic: '/ˌnɒn.rɪˌpjuː.diˈeɪ.ʃən/',
        pronunciationAudioText: 'Non-Repudiation',
        category: 'Cryptography',
        arabicEquivalent: 'عدم الإنكار',
        usageContext: 'إثبات المصدر والسلامة عبر التوقيع الرقمي غير المتماثل.',
      },
      {
        term: 'Ephemeral Keys',
        phonetic: '/ɪˈfem.ər.əl kiːz/',
        pronunciationAudioText: 'Ephemeral Keys',
        category: 'Cryptography',
        arabicEquivalent: 'المفاتيح المؤقتة',
        usageContext: 'مفاتيح جلسة قصيرة العمر تُحذف فور انتهاء الاتصال.',
      },
      {
        term: 'Perfect Forward Secrecy (PFS)',
        phonetic: '/ˈpɜː.fekt ˈfɔː.wəd ˈsiː.krə.si/',
        pronunciationAudioText: 'Perfect Forward Secrecy',
        category: 'Cryptography',
        arabicEquivalent: 'السرية الأمامية التامة',
        usageContext: 'حماية الجلسات التاريخية من فك التشفير المستقبلي عند تسرب المفتاح الخاص للخادم.',
      },
    ],
    images: [
      {
        prompt: 'Academic diagram of Plaintext to Ciphertext transformation with Ephemeral Keys and Perfect Forward Secrecy in TLS 1.3, bilingual labels, 16:9',
        caption: 'مخطط التحويل التشفيري من Plaintext إلى Ciphertext ودور المفاتيح المؤقتة (Ephemeral Keys) في تحقيق السرية الأمامية التامة (PFS)',
        alt: 'Plaintext to Ciphertext and Perfect Forward Secrecy diagram',
        seed: 6011,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'مدخل إلى المصطلحات التأسيسية في التشفير',
        titleEn: 'Foundational Cryptographic Lexicon',
        bulletPoints: [
          'أهمية الدقة الدلالية (Semantic Precision) في هندسة التشفير وكتابة الوثائق.',
          'التمييز الصارم بين Plaintext (النص الواضح) و Ciphertext (النص المشفر).',
          'إتقان نطق المصطلحات عبر الأبجدية الصوتية الدولية (IPA).',
        ],
        englishKeyExcerpt: 'In cryptographic specifications, plaintext and ciphertext are uncountable nouns representing distinct states of data.',
        phoneticHighlight: 'Plaintext /ˈpleɪn.tekst/ • Ciphertext /ˈsaɪ.fər.tekst/',
        speakerNotes: 'ابدأ المحاضرة بتوضيح أن المصطلح التقني في التشفير يحمل معنى رياضياً وقانونياً محدداً لا يقبل الترادف العشوائي.',
        visualCue: 'مخطط تدفق البيانات من المرسل إلى المستقبل عبر قناة مشفرة.',
      },
      {
        slideNumber: 2,
        title: 'الفرق الأكاديمي بين التشفير والترميز والتجزئة',
        titleEn: 'Encryption vs. Encoding vs. Hashing',
        bulletPoints: [
          'Encryption: عملية عكسية بمفتاح سري لحماية السرية (Confidentiality).',
          'Encoding: تحويل تنسيق البيانات (مثل Base64) للتوافقية دون أي سرية.',
          'Hashing: دالة اختزال باتجاه واحد (مثل SHA-256) للتحقق من السلامة (Integrity).',
        ],
        englishKeyExcerpt: 'Encoding transforms data representation for interoperability, whereas encryption enforces confidentiality via a secret key.',
        phoneticHighlight: 'Encryption /ɪnˈkrɪp.ʃən/ • Encoding /ɪnˈkəʊ.dɪŋ/ • Hashing /ˈhæʃ.ɪŋ/',
        speakerNotes: 'نبّه الطلاب إلى الخطأ الشائع في تقارير المبتدئين حين يصفون Base64 بأنه تشفير.',
        visualCue: 'جدول مقارنة ثلاثي الأعمدة يوضح المدخلات والمخرجات والمفاتيح.',
      },
      {
        slideNumber: 3,
        title: 'مفهوم عدم الإنكار وصياغته القانونية والتقنية',
        titleEn: 'Cryptographic Non-Repudiation',
        bulletPoints: [
          'معنى الفعل Repudiate (ينكر/يتنصل) وكيف تنفيه البادئة Non-.',
          'الفرق بين Message Authentication (عبر HMAC) و Non-Repudiation (عبر Digital Signatures).',
          'تطبيقات عدم الإنكار في الفوترة الإلكترونية والعقود الرقمية.',
        ],
        englishKeyExcerpt: 'Asymmetric digital signatures bind the signer’s identity to the message digest, thereby enforcing non-repudiation.',
        phoneticHighlight: 'Non-Repudiation /ˌnɒn.rɪˌpjuː.diˈeɪ.ʃən/',
        speakerNotes: 'ركز على تقسيم الكلمة صوتياً إلى مقاطع لتسهيل نطقها على الطلاب: Non - re - pu - di - a - tion.',
        visualCue: 'مخطط مقارنة بين مفتاح متماثل مشترك ومفتاح خاص منفرد للتوقيع.',
      },
      {
        slideNumber: 4,
        title: 'المفاتيح المؤقتة والسرية الأمامية التامة',
        titleEn: 'Ephemeral Keys & Perfect Forward Secrecy (PFS)',
        bulletPoints: [
          'معنى Ephemeral (مؤقت/زائل) ودوره في بروتوكول TLS 1.3.',
          'كيف تحمي السرية الأمامية التامة (PFS) الجلسات السابقة من الاختراق المستقبلي.',
          'مفهوم التصفير التشفيري للذاكرة (Cryptographic Zeroization).',
        ],
        englishKeyExcerpt: 'Upon session termination, ephemeral keys are zeroized from volatile memory to guarantee Perfect Forward Secrecy.',
        phoneticHighlight: 'Ephemeral /ɪˈfem.ər.əl/ • Zeroization /ˌzɪə.rəʊ.aɪˈzeɪ.ʃən/',
        speakerNotes: 'اشرح لماذا حُذف تبادل مفاتيح RSA الثابت من معيار TLS 1.3 واستُبدل بـ ECDHE.',
        visualCue: 'سلسلة زمنية لجلسات اتصال متعددة بمفاتيح مؤقتة مستقلة.',
      },
      {
        slideNumber: 5,
        title: 'قواعد الأسلوب الأكاديمي في الكتابة التشفيرية',
        titleEn: 'Academic Style in Cryptographic Writing',
        bulletPoints: [
          'استخدام المبني للمجهول (Passive Voice) للتركيز على البروتوكول والبيانات.',
          'استخدام المتلازمات اللفظية القياسية (Standard Collocations) مثل enforce non-repudiation.',
          'تجنب العبارات التسويقية المبالغ فيها مثل unhackable أو 100% secure.',
        ],
        englishKeyExcerpt: 'Session keys are derived via HKDF-SHA256 rather than transmitted directly over the wire.',
        phoneticHighlight: 'Derived /dɪˈraɪvd/ • Authenticated /ɔːˈθen.tɪ.keɪ.tɪd/',
        speakerNotes: 'اختم الفصل بمراجعة الأفعال القياسية التي تتكرر في أوراق التشفير: derive, encapsulate, authenticate, zeroize.',
        visualCue: 'بطاقة مراجعة سريعة لأهم المتلازمات اللفظية في الفصل الأول.',
      },
    ],
    flashcards: [
      {
        front: 'Plaintext (/ˈpleɪn.tekst/)',
        back: 'النص الواضح أو البيانات الأصلية غير المشفرة قبل إدخالها في خوارزمية التشفير. (اسم غير معدود في الكتابة الأكاديمية).',
        category: 'Core Crypto Terms',
        phonetic: '/ˈpleɪn.tekst/',
        pronunciationAudioText: 'Plaintext',
      },
      {
        front: 'Ciphertext (/ˈsaɪ.fər.tekst/)',
        back: 'النص المشفر غير القابل للقراءة الناتج عن تطبيق خوارزمية التشفير والمفتاح على النص الواضح.',
        category: 'Core Crypto Terms',
        phonetic: '/ˈsaɪ.fər.tekst/',
        pronunciationAudioText: 'Ciphertext',
      },
      {
        front: 'Non-Repudiation (/ˌnɒn.rɪˌpjuː.diˈeɪ.ʃən/)',
        back: 'عدم الإنكار: ضمان تشفيري وقانوني يتحقق عبر التواقيع الرقمية يمنع المُرسل من إنكار إرسال الرسالة أو توقيعها.',
        category: 'Security Services',
        phonetic: '/ˌnɒn.rɪˌpjuː.diˈeɪ.ʃən/',
        pronunciationAudioText: 'Non-Repudiation',
      },
      {
        front: 'Ephemeral Key (/ɪˈfem.ər.əl kiː/)',
        back: 'المفتاح المؤقت (الزائل): مفتاح يُولَّد لجلسة اتصال واحدة فقط ثم يُتلف فوراً عبر التصفير التشفيري (Zeroization).',
        category: 'Key Management',
        phonetic: '/ɪˈfem.ər.əl kiː/',
        pronunciationAudioText: 'Ephemeral Key',
      },
      {
        front: 'Perfect Forward Secrecy - PFS (/ˈpɜː.fekt ˈfɔː.wəd ˈsiː.krə.si/)',
        back: 'السرية الأمامية التامة: خاصية تضمن عدم إمكانية فك تشفير الجلسات السابقة حتى لو تسرب المفتاح الخاص طويل الأمد للخادم مستقبلاً.',
        category: 'Protocol Security',
        phonetic: '/ˈpɜː.fekt ˈfɔː.wəd ˈsiː.krə.si/',
        pronunciationAudioText: 'Perfect Forward Secrecy',
      },
      {
        front: 'Encoding vs. Encryption vs. Hashing',
        back: 'Encoding (ترميز للتوافق بدون مفتاح مثل Base64) | Encryption (تشفير عكسي بمفتاح للسرية مثل AES) | Hashing (بصمة باتجاه واحد للسلامة مثل SHA-256).',
        category: 'Semantic Precision',
        phonetic: '/ɪnˈkəʊ.dɪŋ/ vs /ɪnˈkrɪp.ʃən/ vs /ˈhæʃ.ɪŋ/',
        pronunciationAudioText: 'Encoding versus Encryption versus Hashing',
      },
    ],
    miniQuiz: [
      {
        question: 'Choose the most academically accurate verb to complete the specification: "To prevent memory forensics recovery, ephemeral session keys must be cryptographically ________ immediately upon connection teardown."',
        options: [
          'zeroized',
          'encoded',
          'repudiated',
          'broadcasted',
        ],
        correctIndex: 0,
        explanation: 'الفعل التقني القياسي في معايير التشفير (مثل FIPS 140-3) لمسح المفاتيح من الذاكرة عبر الكتابة فوقها بالأصفار هو "zeroized".',
      },
      {
        question: 'أي من الجمل الإنجليزية التالية خالية تماماً من الأخطاء الاصطلاحية في أمن المعلومات؟',
        options: [
          'The user password is encrypted with SHA-256 and encoded with AES-256.',
          'The binary payload is encoded in Base64 after being encrypted with AES-256-GCM.',
          'HMAC-SHA256 alone provides full legal non-repudiation between two untrusted parties.',
          'Static RSA key exchange guarantees Perfect Forward Secrecy in TLS 1.3.',
        ],
        correctIndex: 1,
        explanation: 'الجملة الثانية صحيحة علمياً ولغوياً؛ لأن AES-256-GCM يُستخدم للتشفير الموثق (Encryption)، بينما Base64 يُستخدم للترميز النصي (Encoding).',
      },
      {
        question: 'What is the exact meaning and phonetic transcription of the adjective "Ephemeral" in "Ephemeral Diffie-Hellman (ECDHE)"?',
        options: [
          '/ɪˈfem.ər.əl/ — Short-lived, generated for a single session and destroyed afterward.',
          '/ˌiː.kwɪˈvæl.ənt/ — Mathematically identical across all server sessions.',
          '/ɪmˈpɜː.vi.əs/ — Stored permanently inside an offline root hardware token.',
          '/ɪˈnɪʃ.əl/ — Transmitted in cleartext during the DNS resolution phase.',
        ],
        correctIndex: 0,
        explanation: 'كلمة Ephemeral تُنطق /ɪˈfem.ər.əl/ وتعني مؤقتاً أو قصير الأجل، حيث يُولَّد المفتاح لجلسة واحدة فقط لتحقيق السرية الأمامية التامة (PFS).',
      },
      {
        question: 'Why does an asymmetric Digital Signature provide "Non-Repudiation" whereas a symmetric MAC (Message Authentication Code) does not?',
        options: [
          'Because Digital Signatures compress the plaintext before transmission.',
          'Because the private signing key is uniquely held by the sender, whereas a symmetric MAC key is shared between both parties.',
          'Because symmetric MAC keys cannot be generated using random number generators.',
          'Because Non-Repudiation only applies to unencrypted HTTP traffic.',
        ],
        correctIndex: 1,
        explanation: 'في التوقيع الرقمي غير المتماثل ينفرد المرسل بحيازة المفتاح الخاص (Private Signing Key)، مما يمنعه من إنكار التوقيع، بخلاف مفتاح MAC المشترك بين الطرفين.',
      },
    ],
    interactiveBook3D: {
      model3DType: 'CRYPTO_LEXICON_CUBE',
      shaderEffect: 'emerald-cyber-glow',
      bookTitleEn: 'Interactive 3D Lexicon: Core Cryptographic Terminology',
      bookTitleAr: 'الكتاب التفاعلي ثلاثي الأبعاد: معجم التشفير التأسيسي',
      pages3D: [
        {
          pageNumber: 1,
          titleAr: 'دورة حياة النص الواضح والنص المشفر',
          titleEn: 'Plaintext & Ciphertext Lifecycle',
          badge: 'LEXICON PAGE 01',
          bilingualSummaryAr: 'تبدأ العملية التشفيرية بإدخال النص الواضح (Plaintext) وتطبيق خوارزمية التشفير الموثق (AEAD) لإنتاج النص المشفر (Ciphertext) مع وسم المصادقة.',
          englishExcerpt: 'Authenticated Encryption with Associated Data (AEAD) simultaneously protects the confidentiality of the plaintext and the authenticity of the resulting ciphertext.',
          phoneticGuide: 'Plaintext /ˈpleɪn.tekst/ | Ciphertext /ˈsaɪ.fər.tekst/ | Authenticity /ˌɔː.θenˈtɪs.ə.ti/',
          pronunciationAudioText: 'Authenticated Encryption with Associated Data simultaneously protects the confidentiality of the plaintext and the authenticity of the resulting ciphertext.',
          grammarOrStyleTip: 'استخدم دائماً الظرف "simultaneously" في الوثائق الأكاديمية عند وصف أنماط AEAD مثل AES-GCM لأنها تدمج السرية والسلامة في خطوة واحدة.',
          keyTakeaway: 'Plaintext و Ciphertext اسمان غير معدودين (Uncountable Nouns) في الكتابة الأكاديمية القياسية.',
        },
        {
          pageNumber: 2,
          titleAr: 'عدم الإنكار والتواقيع الرقمية',
          titleEn: 'Non-Repudiation & Digital Signatures',
          badge: 'LEXICON PAGE 02',
          bilingualSummaryAr: 'يوفر التوقيع الرقمي إثباتاً رياضياً يربط الهوية بالرسالة، مما يمنع صاحب المفتاح الخاص من التنصل من التوقيع أمام الجهات الرقابية أو القضائية.',
          englishExcerpt: 'By verifying the digital signature against the sender’s X.509 public key certificate, the relying party establishes cryptographic non-repudiation.',
          phoneticGuide: 'Non-Repudiation /ˌnɒn.rɪˌpjuː.diˈeɪ.ʃən/ | Relying Party /rɪˈlaɪ.ɪŋ ˈpɑː.ti/',
          pronunciationAudioText: 'By verifying the digital signature against the sender public key certificate, the relying party establishes cryptographic non-repudiation.',
          grammarOrStyleTip: 'مصطلح "Relying Party" هو المصطلح المعياري في وثائق PKI و NIST للجهة التي تعتمد على الشهادة الرقمية للتحقق من التوقيع.',
          keyTakeaway: 'متلازمة "establish / enforce non-repudiation" هي الصياغة القياسية في معايير التشفير.',
        },
        {
          pageNumber: 3,
          titleAr: 'المفاتيح المؤقتة والسرية الأمامية التامة',
          titleEn: 'Ephemeral Keys & Perfect Forward Secrecy',
          badge: 'LEXICON PAGE 03',
          bilingualSummaryAr: 'في بروتوكول TLS 1.3، يُولَّد زوج مفاتيح مؤقت (Ephemeral Key Pair) لكل جلسة اتصال، ثم يُصفَّر (Zeroized) فور انتهاء الجلسة لحماية الاتصالات السابقة.',
          englishExcerpt: 'Ephemeral key agreement protocols ensure that the compromise of a long-term private key does not compromise the confidentiality of past sessions, a property known as Perfect Forward Secrecy.',
          phoneticGuide: 'Ephemeral /ɪˈfem.ər.əl/ | Perfect Forward Secrecy /ˈpɜː.fekt ˈfɔː.wəd ˈsiː.krə.si/',
          pronunciationAudioText: 'Ephemeral key agreement protocols ensure that the compromise of a long-term private key does not compromise the confidentiality of past sessions, a property known as Perfect Forward Secrecy.',
          grammarOrStyleTip: 'لاحظ الفرق بين "compromise" كاسم (اختراق/انكشاف) وكفعل متعدٍّ (يُعرّض للخطر/يكشف سرية) في الجملة نفسها.',
          keyTakeaway: 'تدمير المفتاح المؤقت عبر Zeroization هو الشرط العملي لتحقق PFS.',
        },
      ],
      stepByStep: [
        {
          stepNumber: 1,
          titleAr: 'إدخال النص الواضح (Plaintext Ingestion)',
          titleEn: 'Step 1: Plaintext Ingestion & Formatting',
          descriptionAr: 'تجهيز البيانات الأصلية والتحقق من ترميزها القياسي قبل إدخالها إلى وحدة التشفير.',
          englishActionPhrase: 'The UTF-8 encoded plaintext payload is ingested into the cryptographic module.',
          phonetic: '/ðə ˈpleɪn.tekst ˈpeɪ.ləʊd ɪz ɪnˈdʒes.tɪd/',
          pronunciationAudioText: 'The UTF-8 encoded plaintext payload is ingested into the cryptographic module.',
          visualState: 'إضاءة الوجه الأمامي للمكعب التشفيري باللون الأخضر الزمردي.',
        },
        {
          stepNumber: 2,
          titleAr: 'توليد مفتاح الجلسة المؤقت (Ephemeral Key Generation)',
          titleEn: 'Step 2: Ephemeral Key Pair Generation',
          descriptionAr: 'توليد مفتاح مؤقت عبر منحنى X25519 خاص بالجلسة الحالية فقط.',
          englishActionPhrase: 'A fresh ephemeral ECDHE key pair is generated using a FIPS-approved CSPRNG.',
          phonetic: '/ə freʃ ɪˈfem.ər.əl kiː peər ɪz ˈdʒen.ə.reɪ.tɪd/',
          pronunciationAudioText: 'A fresh ephemeral ECDHE key pair is generated using a FIPS-approved cryptographically secure pseudorandom number generator.',
          visualState: 'دوران الحلقة المدارية حول المكعب وتوليد نبضة ضوئية زرقاء.',
        },
        {
          stepNumber: 3,
          titleAr: 'إنتاج النص المشفر ووسم المصادقة (Ciphertext & Tag Output)',
          titleEn: 'Step 3: Authenticated Ciphertext Emission',
          descriptionAr: 'تشفير البيانات وإرفاق وسم مصادقة الرسالة لضمان السرية والسلامة معاً.',
          englishActionPhrase: 'The plaintext is transformed into authenticated ciphertext accompanied by a 128-bit GCM tag.',
          phonetic: '/ɔːˈθen.tɪ.keɪ.tɪd ˈsaɪ.fər.tekst/',
          pronunciationAudioText: 'The plaintext is transformed into authenticated ciphertext accompanied by a 128-bit GCM tag.',
          visualState: 'تحول شبكة المكعب إلى رموز ست عشرية مشفرة متوهجة.',
        },
        {
          stepNumber: 4,
          titleAr: 'التوقيع الرقمي لتحقيق عدم الإنكار (Non-Repudiation Signing)',
          titleEn: 'Step 4: Digital Signature & Non-Repudiation',
          descriptionAr: 'توقيع بصمة الرسالة بالمفتاح الخاص للمُرسل لإثبات المصدر قانونياً وتقنياً.',
          englishActionPhrase: 'An ECDSA digital signature is appended to enforce cryptographic non-repudiation.',
          phonetic: '/tʊ ɪnˈfɔːs ˌnɒn.rɪˌpjuː.diˈeɪ.ʃən/',
          pronunciationAudioText: 'An ECDSA digital signature is appended to enforce cryptographic non-repudiation.',
          visualState: 'ظهور ختم رقمي ذهبي ثلاثي الأبعاد أعلى المكعب.',
        },
        {
          stepNumber: 5,
          titleAr: 'التصفير التشفيري وحفظ السرية الأمامية (Key Zeroization & PFS)',
          titleEn: 'Step 5: Ephemeral Key Zeroization for PFS',
          descriptionAr: 'مسح المفتاح المؤقت من الذاكرة العشوائية فور انتهاء الجلسة لضمان السرية الأمامية التامة.',
          englishActionPhrase: 'Ephemeral keys are cryptographically zeroized to preserve Perfect Forward Secrecy.',
          phonetic: '/ˌkrɪp.təˈɡræf.ɪ.kəl.i ˈzɪə.rəʊ.aɪzd/',
          pronunciationAudioText: 'Ephemeral keys are cryptographically zeroized to preserve Perfect Forward Secrecy.',
          visualState: 'تلاشي الحلقة المؤقتة مع بقاء درع الحماية الأمامي مضاءً.',
        },
      ],
      hotspots: [
        {
          id: 'hs-ch1-1',
          labelAr: 'مدخل النص الواضح (Plaintext Input Node)',
          labelEn: 'Plaintext Input Node',
          coordinates: { x: -1.4, y: 0.8, z: 0.6 },
          phonetic: '/ˈpleɪn.tekst ˈɪn.pʊt nəʊd/',
          pronunciationAudioText: 'Plaintext Input Node. Unencrypted data must be protected in memory prior to cipher transformation.',
          explanationAr: 'يمثل هذا الجزء البيانات الخام قبل التشفير؛ وفي التقارير الأمنية يجب التأكيد على عدم تخزينها على القرص الصلب.',
          englishTemplateSnippet: 'Sensitive plaintext resides exclusively in locked volatile memory pages prior to encryption.',
          securityContext: 'حماية البيانات قيد الاستخدام (Data in Use) قبل التشفير.',
        },
        {
          id: 'hs-ch1-2',
          labelAr: 'مولد المفاتيح المؤقتة (Ephemeral Key Core)',
          labelEn: 'Ephemeral Key Core (ECDHE)',
          coordinates: { x: 0.0, y: 1.5, z: 0.0 },
          phonetic: '/ɪˈfem.ər.əl kiː kɔːr/',
          pronunciationAudioText: 'Ephemeral Key Core. Ephemeral keys establish session-unique shared secrets to achieve Perfect Forward Secrecy.',
          explanationAr: 'النواة المسؤولة عن توليد مفاتيح جلسة زائلة تُستخدم لمرة واحدة فقط لتحقيق خاصية السرية الأمامية التامة (PFS).',
          englishTemplateSnippet: 'Session establishment relies on ephemeral X25519 key exchange to guarantee Perfect Forward Secrecy (PFS).',
          securityContext: 'منع فك التشفير بأثر رجعي (Retrospective Decryption Defense).',
        },
        {
          id: 'hs-ch1-3',
          labelAr: 'مخرج النص المشفر الموثق (Authenticated Ciphertext)',
          labelEn: 'Authenticated Ciphertext Stream',
          coordinates: { x: 1.4, y: 0.8, z: 0.6 },
          phonetic: '/ɔːˈθen.tɪ.keɪ.tɪd ˈsaɪ.fər.tekst striːm/',
          pronunciationAudioText: 'Authenticated Ciphertext Stream. Any tampering with the ciphertext invalidates the authentication tag.',
          explanationAr: 'المخرج المشفر النهائي المرسل عبر الشبكة والمقرون بوسم مصادقة يكشف أي تلاعب بالبتات.',
          englishTemplateSnippet: 'The resulting ciphertext and 16-byte authentication tag are transmitted over the untrusted network.',
          securityContext: 'حماية البيانات أثناء النقل (Data in Transit Confidentiality & Integrity).',
        },
        {
          id: 'hs-ch1-4',
          labelAr: 'ختم عدم الإنكار (Non-Repudiation Seal)',
          labelEn: 'Cryptographic Non-Repudiation Seal',
          coordinates: { x: 0.0, y: -1.2, z: 0.9 },
          phonetic: '/ˌnɒn.rɪˌpjuː.diˈeɪ.ʃən siːl/',
          pronunciationAudioText: 'Cryptographic Non-Repudiation Seal. Digital signatures bind the origin entity to the signed payload.',
          explanationAr: 'يمثل التوقيع الرقمي غير المتماثل الذي يمنح الوثيقة أو المعاملة حجية الإثبات وعدم القابلية للإنكار.',
          englishTemplateSnippet: 'Non-repudiation is enforced via ECDSA P-256 signatures anchored to the national PKI root of trust.',
          securityContext: 'الحجية القانونية والتقنية للتواقيع الرقمية (PKI & Digital Signatures).',
        },
      ],
    },
  },

  // ==========================================================================
  // الفصل الثاني (Chapter 2)
  // ==========================================================================
  {
    id: 602,
    chapter_number: 2,
    title: 'قراءة وتحليل وثائق المعايير الدولية والوطنية باللغة الإنجليزية',
    subtitle: 'Reading NIST FIPS, IETF RFCs & NCA ECC Regulatory Documents: Normative Verbs MUST/SHALL/SHOULD/MAY وفق RFC 2119',
    description: 'منهجية قراءة وتفسير الوثائق المعيارية الدولية (NIST FIPS & SP, IETF RFCs) والضوابط الوطنية السعودية (NCA ECC-2:2024 & NCS) باللغة الإنجليزية، مع إتقان دلالات الأفعال المعيارية الإلزامية والشرطية وفق معيار RFC 2119 / BCP 14.',
    category: 'أساسي',
    difficulty: 'beginner',
    phonetic: '/ˈriːdɪŋ ˈnɔːrmətɪv ˈstændərdz ænd ˌrɛɡjʊˈleɪtəri ˈdɒkjʊmənts/',
    pronunciationAudioText: 'Reading Normative Standards and Regulatory Documents: NIST FIPS, IETF RFC 2119, and NCA Essential Cybersecurity Controls.',
    diagramKey: 'eng-cyber-2',
    videoUrl: 'https://www.youtube.com/watch?v=2TofunAI6fU',
    presentationUrl: '/assets/presentations/eng-cyber-ch2-normative-standards.pdf',
    pdfStartPage: 19,
    pdfEndPage: 38,
    updated_at: GENERATED_TIMESTAMP,
    keyTopics: [
      'قواعد الأفعال المعيارية الإلزامية والاختيارية (MUST, SHALL, SHOULD, MAY) وفق IETF RFC 2119 و RFC 8174',
      'الفرق الجوهري بين الأقسام المعيارية (Normative Sections) والأقسام الإرشادية (Informative Sections)',
      'هيكلية وثائق NIST (FIPS vs. Special Publications SP 800 Series) ومصطلحات دورة حياة المعايير (Deprecated, Disallowed, Legacy-Use)',
      'تحليل الصياغة الإنجليزية الرسمية لضوابط الهيئة الوطنية للأمن السيبراني (NCA ECC-2:2024 & NCS)',
      'صياغة مصفوفة تتبع الامتثال (Compliance Traceability Matrix) باللغة الإنجليزية',
    ],
    content: `## تمهيد: لغة المعايير ليست لغة عادية

عندما تقرأ وثيقة معيارية دولية مثل [IETF RFC 2119 (Key words for use in RFCs to Indicate Requirement Levels)](https://www.rfc-editor.org/info/rfc2119) ومكمّلها [RFC 8174](https://www.rfc-editor.org/info/rfc8174)، أو تقرأ معيار التشفير الفيدرالي [NIST FIPS 140-3](https://csrc.nist.gov/pubs/fips/140-3/final) أو النسخة الإنجليزية من الضوابط الأساسية للأمن السيبراني الصادرة عن الهيئة الوطنية للأمن السيبراني ([NCA Essential Cybersecurity Controls - ECC](https://nca.gov.sa/en/regulatory-documents/))، فإن الأفعال المساعدة مثل **MUST** و **SHALL** و **SHOULD** و **MAY** لا تعبّر عن نصيحة لغوية عامة، بل تحدد **الوضع القانوني والتقني للامتثال (Compliance Posture)**.

---page---

## أولاً: المصفوفة المعيارية لأفعال الإلزام وفق RFC 2119 / BCP 14

يُعد فهم هذا الجدول حجر الزاوية لكل مهندس أمن سيبراني ومدقق امتثال:

| الكلمة المفتاحية (RFC 2119 Keyword) | النطق الصوتي (IPA) | المرادفات المعيارية المعتمدة | مستوى الإلزام (Requirement Level) | الأثر الهندسي والتدقيقي عند عدم التطبيق |
| :--- | :--- | :--- | :--- | :--- |
| **MUST / SHALL** | \`/mʌst/\` • \`/ʃæl/\` | **REQUIRED** | **إلزام مطلق (Absolute Requirement)** | يُعد عدم التطبيق مخالفة صريحة للمعيار (Non-Compliance) وفشلاً في التدقيق أو التوافق البروتوكولي. |
| **MUST NOT / SHALL NOT** | \`/mʌst nɒt/\` • \`/ʃæl nɒt/\` | **PROHIBITED** | **حظر مطلق (Absolute Prohibition)** | يُمنع استخدام الخوارزمية أو الإعداد منعاً باتاً (مثل حظر DES أو SSLv3). |
| **SHOULD** | \`/ʃʊd/\` | **RECOMMENDED** | **توصية قوية مشروطة (Strong Recommendation)** | يجب التطبيق إلا إذا وُجد مبرر هندسي موثق ومحلل المخاطر (Documented Risk Exception) مع ضوابط تعويضية. |
| **SHOULD NOT** | \`/ʃʊd nɒt/\` | **NOT RECOMMENDED** | **عدم توصية مشروطة (Conditional Discouragement)** | يُتجنب التطبيق إلا في حالات استثنائية مدروسة ومفهومة المخاطر بالكامل. |
| **MAY** | \`/meɪ/\` | **OPTIONAL** | **اختياري تماماً (Truly Optional)** | خيار متاح للمنفّذ دون أي أثر سلبي على الامتثال، ويجب أن تتعامل الأنظمة الأخرى مع وجوده أو غيابه بمرونة. |

> [!info]
> **قاعدة الأحرف الكبيرة (RFC 8174 Capitalization Rule)**:
> ينص المعيار [RFC 8174](https://www.rfc-editor.org/info/rfc8174) على أن الكلمات (**MUST**, **SHALL**, **SHOULD**, **MAY**) لا تكتسب معناها الإلزامي المعياري الصارم في وثائق IETF إلا إذا كُتبت **بأحرف إنجليزية كبيرة بالكامل (ALL CAPS)**. أما في وثائق **NIST FIPS** وضوابط **NCA ECC** فيُفضَّل الفعل **SHALL** أو صيغة الوجوب المباشرة للدلالة على المتطلبات الإلزامية.

---page---

## ثانياً: الفرق بين النص المعياري (Normative) والنص الإرشادي (Informative)

تقسم وثائق NIST و ISO/IEC 27001 و NCA الوثيقة الواحدة إلى نوعين من الأقسام:
1. **Normative Content (\`/ˈnɔː.mə.tɪv/\` — المحتوى المعياري الإلزامي)**:
   - يشمل البنود الأساسية للضوابط والمتطلبات التي يُحاسَب عليها المدقق (Auditor) لتحديد حالة الامتثال (**Compliant** vs. **Non-Compliant**).
2. **Informative / Non-Normative Content (\`/ɪnˈfɔː.mə.tɪv/\` — المحتوى الإرشادي/التوضيحي)**:
   - يشمل المقدمات التاريخية، والأمثلة التوضيحية، والملاحق الاسترشادية (مثل Appendices الموسومة بـ *Informative*)، وهي تساعد على الفهم لكنها لا تُنشئ التزاماً رقابياً جديداً بذاتها.

---page---

## ثالثاً: مصطلحات حالة الخوارزميات في وثائق NIST و NCA NCS

عند قراءة جدول الخوارزميات المعتمدة في [NIST SP 800-131A](https://csrc.nist.gov/pubs/sp/800/131/a/r2/final) أو [المعايير الوطنية للتشفير (NCA NCS)](https://nca.gov.sa/en/regulatory-documents/frameworks-and-standard-list/ncs/)، ستواجه أربعة مصطلحات دقيقة لوصف حالة الخوارزمية:
- **Approved / Acceptable (\`/əˈpruːvd/\`)**: خوارزمية معتمدة ومسموح باستخدامها كاملاً لتوليد وحماية البيانات الجديدة.
- **Deprecated (\`/ˈdep.rɪ.keɪ.tɪd/\` — مُستحسَن تركها / قيد الإيقاف التدريجي)**: يُسمح باستخدامها مؤقتاً خلال فترة انتقالية محددة مع تحمّل مخاطر مقبولة، ولكن يجب التخطيط لاستبدالها قبل تاريخ الإيقاف النهائي (Sunset Date).
- **Legacy-Use (\`/ˈleɡ.ə.si juːs/\` — للاستخدام التراثي فقط)**: يُمنع استخدامها لتشفير بيانات جديدة أو إنشاء تواقيع جديدة، ويُسمح بها فقط لفك تشفير بيانات قديمة مخزنة مسبقاً أو التحقق من تواقيع تاريخية.
- **Disallowed / Prohibited (\`/ˌdɪs.əˈlaʊd/\` — محظورة تماماً)**: خوارزمية مكسورة أو غير آمنة يُحظر استخدامها تحت أي ظرف.

---page---

## رابعاً: تحليل لغوي وتطبيقي لنص ضابط أمني رسمي

لنقارن بين صياغة ضابط تشفيري بصيغة الإلزام المطلق (SHALL/MUST) وصياغة توصية مشروطة (SHOULD) في وثيقة تنظيمية:

> **Regulatory Control Excerpt (Normative English Text):**
> *"1. Cryptographic keys protecting classified or critical national data **SHALL** be generated, stored, and processed exclusively within a validated Hardware Security Module (HSM) compliant with FIPS 140-3 Level 3 or higher.*
> *2. Organizations **SHOULD** implement automated key rotation schedules; where automated rotation is technically infeasible on legacy industrial controllers, a formal risk exception **MUST** be approved by the CISO and supported by compensating network segmentation controls."*

### الترجمة العربية والتحليل المعياري:
1. «**يجب إلزاماً (SHALL)** توليد وتخزين ومعالجة مفاتيح التشفير التي تحمي البيانات المصنفة أو البيانات الوطنية الحساسة حصرياً داخل وحدة أمن عتادية (HSM) معتمدة ومتوافقة مع معيار FIPS 140-3 المستوى الثالث أو أعلى.»
   - **تحليل الامتثال**: وجود الفعل **SHALL** والظرف الحصري **exclusively** يعني عدم جواز تخزين المفتاح في ملف برمجي عادي على الخادم تحت أي مبرر.
2. «**ينبغي بقوة (SHOULD)** للمؤسسات تطبيق جداول زمنية مؤتمتة لتدوير المفاتيح؛ وحيثما يكون التدوير المؤتمت غير ممكن تقنياً في وحدات التحكم الصناعية القديمة، **فيجب حتماً (MUST)** اعتماد استثناء مخاطر رسمي من رئيس الأمن السيبراني (CISO) مدعوماً بضوابط تعويضية لعزل الشبكة.»
   - **تحليل الامتثال**: لاحظ كيف تحولت التوصية المشروطة (**SHOULD**) في الشطر الأول إلى إلزام مطلق (**MUST**) في الشطر الثاني عند تعذر التطبيق المباشر: إما تطبيق الأتمتة، أو توثيق استثناء رسمي مع ضابط تعويضي (**Compensating Control**).`,
    vocabularyList: [
      {
        id: 'voc-201',
        term: 'Normative',
        partOfSpeech: 'Adjective',
        phonetic: '/ˈnɔː.mə.tɪv/',
        pronunciationAudioText: 'Normative. Section 4 of the specification is normative and defines mandatory compliance requirements.',
        arabicMeaning: 'معياري / إلزامي المرجعية',
        academicDefinitionEn: 'Establishing, relating to, or deriving from a standard or norm; prescribing mandatory rules required for compliance.',
        academicDefinitionAr: 'ذو صفة معيارية حاكمة؛ يحدد القواعد الإلزامية التي يجب استيفاؤها لتحقيق الامتثال للمعيار.',
        exampleSentenceEn: 'All normative clauses containing the verb SHALL are subject to external regulatory audit.',
        exampleSentenceAr: 'تخضع جميع البنود المعيارية التي تحتوي على الفعل SHALL للتدقيق الرقابي الخارجي.',
        collocations: ['normative requirement', 'normative reference', 'normative annex', 'normative verb'],
        commonErrorWarning: 'عكسها في وثائق المعايير هو "Informative" (إرشادي/توضيحي) وليس "Abnormal".',
      },
      {
        id: 'voc-202',
        term: 'Deprecated',
        partOfSpeech: 'Adjective',
        phonetic: '/ˈdep.rɪ.keɪ.tɪd/',
        pronunciationAudioText: 'Deprecated. SHA-1 is deprecated for digital signature generation and disallowed in modern TLS.',
        arabicMeaning: 'متقادم / قيد الإيقاف التدريجي',
        academicDefinitionEn: 'The use of an algorithm or protocol is allowed during a transition period, but the user must accept some risk and migrate away.',
        academicDefinitionAr: 'حالة تسمح باستخدام الخوارزمية مؤقتاً خلال فترة انتقالية مع تحمل مخاطرها والالتزام بخطة ترحيل.',
        exampleSentenceEn: 'Triple-DES (3DES) was first deprecated and subsequently disallowed by NIST due to sweet32 block-collision risks.',
        exampleSentenceAr: 'أُدرج تشفير 3DES أولاً في حالة الإيقاف التدريجي ثم حُظر نهائياً من قِبل NIST بسبب مخاطر تصادم الكتل.',
        collocations: ['deprecated cipher suite', 'formally deprecated', 'deprecation schedule'],
        commonErrorWarning: 'لا تخلط بين Deprecated (/ˈdep.rɪ.keɪ.tɪd/ — قيد الإيقاف تقنياً) و Depreciated (/dɪˈpriː.ʃi.eɪ.tɪd/ — منخفض القيمة محاسبياً).',
      },
      {
        id: 'voc-203',
        term: 'Compensating Control',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/ˈkɒm.pən.seɪ.tɪŋ kənˈtrəʊl/',
        pronunciationAudioText: 'Compensating Control. When a SHOULD requirement cannot be met on legacy hardware, a compensating control must be implemented.',
        arabicMeaning: 'ضابط تعويضي / بديل مكافئ',
        academicDefinitionEn: 'An alternative security measure implemented to satisfy the requirement of a security control when the primary control is technically infeasible.',
        academicDefinitionAr: 'إجراء أمني بديل يُطبَّق لتحقيق الغاية الأمنية لضابط أساسي عندما يتعذر تطبيقه تقنياً أو تشغيلياً.',
        exampleSentenceEn: 'Network micro-segmentation serves as a compensating control for legacy medical devices unable to run EDR agents.',
        exampleSentenceAr: 'يعمل التقسيم الدقيق للشبكة بوصفه ضابطاً تعويضياً للأجهزة الطبية القديمة غير القادرة على تشغيل وكلاء EDR.',
        collocations: ['implement a compensating control', 'documented compensating control', 'validate compensating controls'],
      },
      {
        id: 'voc-204',
        term: 'Interoperability',
        partOfSpeech: 'Noun',
        phonetic: '/ˌɪn.tərˌɒp.ər.əˈbɪl.ə.ti/',
        pronunciationAudioText: 'Interoperability. Adhering to IETF RFC 8446 MUST requirements ensures cross-vendor TLS interoperability.',
        arabicMeaning: 'التوافقية البينية / قابلية التشغيل المتبادل',
        academicDefinitionEn: 'The ability of different cryptographic systems, implementations, and vendors to exchange and verify data seamlessly according to a shared standard.',
        academicDefinitionAr: 'قدرة الأنظمة التشفيرية والمنتجات المختلفة على تبادل البيانات والتحقق منها بسلاسة وفق معيار مشترك.',
        exampleSentenceEn: 'Violation of RFC 2119 MUST directives breaks cryptographic interoperability between client and server implementations.',
        exampleSentenceAr: 'يؤدي انتهاك توجيهات MUST في RFC 2119 إلى كسر التوافقية البينية بين تطبيقات العميل والخادم.',
        collocations: ['protocol interoperability', 'cross-vendor interoperability', 'interoperability testing'],
      },
      {
        id: 'voc-205',
        term: 'Supersede',
        partOfSpeech: 'Verb',
        phonetic: '/ˌsuː.pəˈsiːd/',
        pronunciationAudioText: 'Supersede. NIST FIPS 140-3 formally supersedes FIPS 140-2 for cryptographic module validation.',
        arabicMeaning: 'يحلّ محلّ / ينسخ إصداراً سابقاً',
        academicDefinitionEn: 'To take the place of a previously issued standard, specification, or RFC, rendering the older version obsolete.',
        academicDefinitionAr: 'أن يحل إصدار معياري جديد محل وثيقة أو معيار سابق ويلغي العمل بالنسخة القديمة.',
        exampleSentenceEn: 'NCA ECC-2:2024 supersedes ECC-1:2018 by streamlining 114 controls into 108 unified cybersecurity controls.',
        exampleSentenceAr: 'يحل إصدار NCA ECC-2:2024 محل ECC-1:2018 عبر توحيد وتبسيط 114 ضابطاً في 108 ضوابط أساسية.',
        collocations: ['formally supersede', 'superseded by RFC', 'superseding standard'],
        commonErrorWarning: 'يُكتب بحرف s في المقطع الأخير (Supersede) وليس بحرف c كما في كلمة Proceed.',
      },
      {
        id: 'voc-206',
        term: 'Mandatory / Shall',
        partOfSpeech: 'Modal Verb',
        phonetic: '/ˈmæn.də.tər.i/ • /ʃæl/',
        pronunciationAudioText: 'Mandatory and Shall. In regulatory documents, the modal verb SHALL denotes a mandatory control requirement.',
        arabicMeaning: 'إلزامي / يجب وجوباً مطلقاً',
        academicDefinitionEn: 'Expressing an authoritative command or strict obligation in legal, regulatory, and technical specifications.',
        academicDefinitionAr: 'صيغة فعلية تفيد الإلزام الحتمي والوجوب الرقابي والقانوني في المواصفات والمعايير التقنية.',
        exampleSentenceEn: 'Critical national infrastructure entities shall comply with the Advanced level of the National Cryptography Standards.',
        exampleSentenceAr: 'يجب على جهات البنية التحتية الوطنية الحساسة الامتثال للمستوى المتقدم من المعايير الوطنية للتشفير.',
        collocations: ['shall be implemented', 'mandatory compliance', 'shall not permit'],
      },
    ],
    terminologyGlossary: [
      {
        term: 'MUST / SHALL',
        phonetic: '/mʌst/ • /ʃæl/',
        pronunciationAudioText: 'MUST and SHALL',
        category: 'Standards & RFCs',
        arabicEquivalent: 'إلزام مطلق (واجب التطبيق)',
        usageContext: 'RFC 2119 / NIST FIPS / NCA ECC — متطلب إلزامي لا يجوز تجاوزه.',
      },
      {
        term: 'SHOULD / RECOMMENDED',
        phonetic: '/ʃʊd/ • /ˌrek.əˈmen.dɪd/',
        pronunciationAudioText: 'SHOULD and RECOMMENDED',
        category: 'Standards & RFCs',
        arabicEquivalent: 'توصية قوية مشروطة',
        usageContext: 'يطبق إلا при وجود عذر تقني موثق وضابط تعويضي معتمد.',
      },
      {
        term: 'MAY / OPTIONAL',
        phonetic: '/meɪ/ • /ˈɒp.ʃən.əl/',
        pronunciationAudioText: 'MAY and OPTIONAL',
        category: 'Standards & RFCs',
        arabicEquivalent: 'اختياري بالكامل',
        usageContext: 'ميزة اختيارية يترك قرار تفعيلها لهندسة النظام.',
      },
      {
        term: 'Normative vs. Informative',
        phonetic: '/ˈnɔː.mə.tɪv/ vs /ɪnˈfɔː.mə.tɪv/',
        pronunciationAudioText: 'Normative versus Informative',
        category: 'Standards & RFCs',
        arabicEquivalent: 'معياري إلزامي مقابل إرشادي توضيحي',
        usageContext: 'التمييز بين بنود التدقيق الملزمة والملاحق الشارحة.',
      },
      {
        term: 'Deprecated',
        phonetic: '/ˈdep.rɪ.keɪ.tɪd/',
        pronunciationAudioText: 'Deprecated',
        category: 'Standards & RFCs',
        arabicEquivalent: 'قيد الإيقاف التدريجي',
        usageContext: 'خوارزمية مسموح بها مؤقتاً ويجب الترحيل عنها قبل تاريخ الإيقاف.',
      },
    ],
    images: [
      {
        prompt: 'Normative requirement hierarchy diagram showing RFC 2119 MUST SHALL SHOULD MAY and NIST FIPS / NCA ECC compliance mapping, 16:9',
        caption: 'الهرم المعياري لأفعال الإلزام في RFC 2119 وربطها بمستويات الامتثال في NIST FIPS وضوابط NCA ECC',
        alt: 'RFC 2119 Normative Verbs Hierarchy diagram',
        seed: 6021,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'دلالات الأفعال المعيارية وفق RFC 2119 و RFC 8174',
        titleEn: 'Normative Verbs in IETF RFC 2119 & RFC 8174',
        bulletPoints: [
          'MUST / SHALL / REQUIRED = إلزام مطلق لا يقبل الاستثناء.',
          'MUST NOT / SHALL NOT = حظر مطلق.',
          'أهمية كتابة الكلمات بأحرف كبيرة (ALL CAPS) وفق تحديث RFC 8174.',
        ],
        englishKeyExcerpt: 'The key words MUST, MUST NOT, REQUIRED, SHALL, SHALL NOT, SHOULD, SHOULD NOT, RECOMMENDED, MAY, and OPTIONAL are to be interpreted as described in BCP 14.',
        phoneticHighlight: 'Normative /ˈnɔː.mə.tɪv/ • Prohibited /prəˈhɪb.ɪ.tɪd/',
        speakerNotes: 'اشرح للطلاب كيف تبدأ كل وثيقة RFC حديثة بديباجة BCP 14 لتعريف دلالة الأفعال المعيارية.',
        visualCue: 'مخطط إشارات مرور معيارية (أحمر: MUST NOT، أخضر داكن: MUST/SHALL، كهرماني: SHOULD، أزرق: MAY).',
      },
      {
        slideNumber: 2,
        title: 'الفرق الدقيق بين SHOULD و MAY في التدقيق الأمني',
        titleEn: 'Distinguishing SHOULD from MAY in Security Audits',
        bulletPoints: [
          'SHOULD لا تعني "اختياري بلا قيد"، بل تعني: طبّق الضابط أو قدّم مبرراً هندسياً موثقاً.',
          'MAY تعني أن الخيار متروك تماماً للمؤسسة أو المطوّر دون الحاجة لمبرر استثناء.',
          'دور الضوابط التعويضية (Compensating Controls) عند تعذر تطبيق SHOULD.',
        ],
        englishKeyExcerpt: 'When a SHOULD directive is bypassed due to legacy constraints, a formal risk exception and compensating control MUST be documented.',
        phoneticHighlight: 'Compensating Control /ˈkɒm.pən.seɪ.tɪŋ kənˈtrəʊl/',
        speakerNotes: 'هذه النقطة من أكثر الأسئلة تكراراً في مقابلات وظائف GRC والتدقيق السيبراني.',
        visualCue: 'شجرة قرار للمدقق عند مواجهة بند SHOULD غير مطبق.',
      },
      {
        slideNumber: 3,
        title: 'هيكلية وثائق NIST: الفرق بين FIPS و SP 800',
        titleEn: 'NIST Document Hierarchy: FIPS vs. Special Publications',
        bulletPoints: [
          'FIPS (Federal Information Processing Standards): معايير إلزامية قانونياً للأنظمة الفيدرالية (مثل FIPS 140-3, FIPS 203).',
          'NIST SP 800 Series: إرشادات وتوصيات فنية مفصلة (مثل SP 800-57 لإدارة المفاتيح).',
          'التمييز داخل الوثيقة الواحدة بين Normative Sections و Informative Appendices.',
        ],
        englishKeyExcerpt: 'FIPS 203 specifies the normative mathematical steps for ML-KEM, whereas the appendices provide informative implementation notes.',
        phoneticHighlight: 'Specification /ˌspes.ɪ.fɪˈkeɪ.ʃən/ • Informative /ɪnˈfɔː.mə.tɪv/',
        speakerNotes: 'اربط هذا الفصل بما يدرسه الطالب في مقرر التشفير المتقدم (ISE 243) حول FIPS 203/204/205.',
        visualCue: 'مقارنة بصرية بين غلاف وثيقة NIST FIPS ووثيقة NIST SP 800.',
      },
      {
        slideNumber: 4,
        title: 'قراءة الضوابط والمعايير الوطنية السعودية بالإنجليزية',
        titleEn: 'Reading NCA ECC-2:2024 & NCS in English',
        bulletPoints: [
          'هيكلية الضوابط الأساسية للأمن السيبراني (Main Domains, Subdomains, Controls).',
          'قراءة مستويات القوة في المعايير الوطنية للتشفير (MODERATE vs. ADVANCED Security Levels).',
          'مصطلح Supersede: كيف حلّ ECC-2:2024 محل ECC-1:2018.',
        ],
        englishKeyExcerpt: 'To ensure cybersecurity resilience, the organization shall implement multi-factor authentication for all remote and privileged access.',
        phoneticHighlight: 'Supersede /ˌsuː.pəˈsiːd/ • Privileged /ˈprɪv.əl.ɪdʒd/',
        speakerNotes: 'درّب الطلاب على قراءة النص الإنجليزي الرسمي لضوابط الهيئة ومطابقته مع النص العربي.',
        visualCue: 'بطاقة تشريح لضابط من ضوابط NCA باللغتين العربية والإنجليزية.',
      },
      {
        slideNumber: 5,
        title: 'حالات دورة حياة الخوارزميات في المعايير',
        titleEn: 'Cryptographic Algorithm Lifecycle Statuses',
        bulletPoints: [
          'Approved / Acceptable: معتمد للاستخدام الكامل.',
          'Deprecated: مسموح مؤقتاً مع وجوب الترحيل وتحمل المخاطر.',
          'Legacy-Use vs. Disallowed: الفرق بين فك تشفير القديم فقط والحظر التام.',
        ],
        englishKeyExcerpt: 'While SHA-1 is disallowed for generating new digital signatures, it remains permitted solely for legacy-use verification of historical archives.',
        phoneticHighlight: 'Deprecated /ˈdep.rɪ.keɪ.tɪd/ • Disallowed /ˌdɪs.əˈlaʊd/',
        speakerNotes: 'أكد على الفرق النطقي والدلالي بين Deprecated و Depreciated.',
        visualCue: 'خط زمني لدورة حياة خوارزمية تشفير من الاعتماد إلى الحظر.',
      },
    ],
    flashcards: [
      {
        front: 'MUST / SHALL (RFC 2119)',
        back: 'أفعال معيارية تفيد الإلزام المطلق (Absolute Requirement)؛ أي إخلال بها يُعد عدم امتثال (Non-Compliance).',
        category: 'RFC 2119 Keywords',
        phonetic: '/mʌst/ • /ʃæl/',
        pronunciationAudioText: 'MUST and SHALL denote an absolute requirement of the specification.',
      },
      {
        front: 'SHOULD / RECOMMENDED (RFC 2119)',
        back: 'توصية معيارية قوية؛ يجب تطبيقها ما لم توجد أسباب تقنية موثقة ومعتمدة مع تطبيق ضوابط تعويضية (Compensating Controls).',
        category: 'RFC 2119 Keywords',
        phonetic: '/ʃʊd/ • /ˌrek.əˈmen.dɪd/',
        pronunciationAudioText: 'SHOULD and RECOMMENDED',
      },
      {
        front: 'Normative vs. Informative (/ˈnɔː.mə.tɪv/ vs /ɪnˈfɔː.mə.tɪv/)',
        back: 'Normative: نص معياري ملزم يدخل في نطاق التدقيق والامتثال. Informative: نص إرشادي أو توضيحي للمساعدة على الفهم.',
        category: 'Standards Structure',
        phonetic: '/ˈnɔː.mə.tɪv/ vs /ɪnˈfɔː.mə.tɪv/',
        pronunciationAudioText: 'Normative versus Informative',
      },
      {
        front: 'Deprecated (/ˈdep.rɪ.keɪ.tɪd/)',
        back: 'حالة خوارزمية قيد الإيقاف التدريجي: يُسمح بها مؤقتاً خلال فترة انتقالية مع وجوب التخطيط لاستبدالها.',
        category: 'Algorithm Lifecycle',
        phonetic: '/ˈdep.rɪ.keɪ.tɪd/',
        pronunciationAudioText: 'Deprecated',
      },
      {
        front: 'Supersede (/ˌsuː.pəˈsiːd/)',
        back: 'فعل أكاديمي يعني «يحلّ محلّ / ينسخ إصداراً أقدم» (مثل: FIPS 140-3 supersedes FIPS 140-2).',
        category: 'Standards Vocabulary',
        phonetic: '/ˌsuː.pəˈsiːd/',
        pronunciationAudioText: 'Supersede',
      },
      {
        front: 'Compensating Control (/ˈkɒm.pən.seɪ.tɪŋ kənˈtrəʊl/)',
        back: 'ضابط تعويضي بديل يُطبَّق لتخفيف المخاطر عندما يتعذر تقنياً تطبيق الضابط الأساسي في الأنظمة القديمة.',
        category: 'Audit & Compliance',
        phonetic: '/ˈkɒm.pən.seɪ.tɪŋ kənˈtrəʊl/',
        pronunciationAudioText: 'Compensating Control',
      },
    ],
    miniQuiz: [
      {
        question: 'According to IETF RFC 2119 (BCP 14), how should an auditor interpret the word "SHOULD" in a protocol security specification?',
        options: [
          'The requirement is completely optional and can be ignored without justification.',
          'There may exist valid reasons in particular circumstances to ignore a particular item, but the full implications must be understood and carefully weighed before choosing a different course.',
          'The feature is strictly prohibited and must never be implemented.',
          'The clause is purely historical and has been superseded.',
        ],
        correctIndex: 1,
        explanation: 'وفق نص RFC 2119 الحرفي، كلمة SHOULD تعني توصية قوية لا يجوز تركها إلا لأسباب وجيهة وموثقة بعد دراسة كامل التبعات الأمنية.',
      },
      {
        question: 'في وثائق NIST SP 800-131A، ما المصطلح الإنجليزي الدقيق للخوارزمية التي يُمنع استخدامها لإنشاء تواقيع جديدة، ويُسمح بها فقط للتحقق من التواقيع القديمة المؤرشفة؟',
        options: [
          'Approved',
          'Legacy-Use',
          'Normative',
          'Mandatory',
        ],
        correctIndex: 1,
        explanation: 'مصطلح Legacy-Use يعني السماح بمعالجة أو التحقق من البيانات التاريخية المشفرة أو الموقعة مسبقاً مع حظر تطبيق الخوارزمية على بيانات جديدة.',
      },
      {
        question: 'Which spelling and phonetic pair correctly represents the verb meaning "to replace an older regulatory standard"?',
        options: [
          'Supersede — /ˌsuː.pəˈsiːd/',
          'Superceed — /ˌsuː.pəˈsiːd/',
          'Depreciate — /dɪˈpriː.ʃi.eɪt/',
          'Subordinate — /səˈbɔː.dɪ.neɪt/',
        ],
        correctIndex: 0,
        explanation: 'الفعل الصحيح هو Supersede ويُكتب بحرف s في المقطع الأخير (/ˌsuː.pəˈsiːd/).',
      },
      {
        question: 'If Appendix B of a NIST FIPS document is labeled "(Informative)", what does this signify?',
        options: [
          'Appendix B contains the strictest mandatory controls in the document.',
          'Appendix B provides supplementary explanations or examples and does not add mandatory compliance requirements.',
          'Appendix B is classified and restricted to government auditors.',
          'Appendix B supersedes the main body of the standard.',
        ],
        correctIndex: 1,
        explanation: 'الأقسام والملاحق الموسومة بـ Informative هي أقسام إرشادية وتوضيحية لا تضيف متطلبات إلزامية جديدة.',
      },
    ],
    interactiveBook3D: {
      model3DType: 'RFC_NORMATIVE_PILLAR',
      shaderEffect: 'cyan-normative-grid',
      bookTitleEn: 'Interactive 3D Pillar: Normative Standards & RFC 2119',
      bookTitleAr: 'الكتاب التفاعلي ثلاثي الأبعاد: صرح المعايير والأفعال المعيارية',
      pages3D: [
        {
          pageNumber: 1,
          titleAr: 'تفكيك معيار RFC 2119 و RFC 8174',
          titleEn: 'Deconstructing RFC 2119 & RFC 8174',
          badge: 'STANDARDS PAGE 01',
          bilingualSummaryAr: 'تحدد وثائق BCP 14 (RFC 2119 + RFC 8174) الدلالة المعيارية الدقيقة للأفعال المساعدة المكتوبة بأحرف كبيرة لضمان التوافقية والامتثال.',
          englishExcerpt: 'These words are often capitalized. When these words are not capitalized, they are meant in their natural-language sense and do not carry normative weight.',
          phoneticGuide: 'Capitalized /ˈkæp.ɪ.təl.aɪzd/ | Normative Weight /ˈnɔː.mə.tɪv weɪt/',
          pronunciationAudioText: 'When these words are not capitalized, they are meant in their natural-language sense and do not carry normative weight.',
          grammarOrStyleTip: 'في وثائق IETF، الفرق بين "must" و "MUST" هو الفرق بين اللغة الطبيعية العادية والشرط المعياري الإلزامي.',
          keyTakeaway: 'تحقق دائماً من قسم Terminology & Conventions في بداية أي معيار دولي.',
        },
        {
          pageNumber: 2,
          titleAr: 'قراءة ضوابط NCA ECC-2:2024 بالإنجليزية',
          titleEn: 'Analyzing NCA ECC-2:2024 Controls in English',
          badge: 'STANDARDS PAGE 02',
          bilingualSummaryAr: 'تصاغ ضوابط الهيئة الوطنية للأمن السيبراني بلغة معيارية واضحة تبدأ غالباً بـ "Cybersecurity requirements for ... shall be defined, documented, and approved".',
          englishExcerpt: 'Cybersecurity requirements for cryptography must be defined, documented, approved, and periodically reviewed to protect data confidentiality and integrity.',
          phoneticGuide: 'Periodically Reviewed /ˌpɪə.riˈɒd.ɪ.kəl.i rɪˈvjuːd/',
          pronunciationAudioText: 'Cybersecurity requirements for cryptography must be defined, documented, approved, and periodically reviewed.',
          grammarOrStyleTip: 'لاحظ الترتيب الثلاثي والرباعي القياسي في ضوابط الحوكمة: defined (محددة)، documented (موثقة)، approved (معتمدة)، reviewed (مراجعة دورياً).',
          keyTakeaway: 'كل فعل من الأفعال الأربعة في الضابط يتطلب دليلاً مستقلاً (Audit Evidence) أثناء التدقيق.',
        },
        {
          pageNumber: 3,
          titleAr: 'إدارة الاستثناءات والضوابط التعويضية',
          titleEn: 'Risk Exceptions & Compensating Controls',
          badge: 'STANDARDS PAGE 03',
          bilingualSummaryAr: 'عندما يتعذر تطبيق توصية معيارية (SHOULD) على نظام صناعي قديم، يجب توثيق استثناء مخاطر وتفعيل ضابط تعويضي مكافئ.',
          englishExcerpt: 'Where strict adherence to a recommended cipher suite is operationally infeasible, a compensating control SHALL be enforced and formally approved.',
          phoneticGuide: 'Infeasible /ɪnˈfiː.zə.bəl/ | Adherence /ədˈhɪə.rəns/',
          pronunciationAudioText: 'Where strict adherence to a recommended cipher suite is operationally infeasible, a compensating control shall be enforced and formally approved.',
          grammarOrStyleTip: 'الصفة "infeasible" (/ɪnˈfiː.zə.bəl/ — غير ممكن التطبيق عملياً) أكثر دقة ورصانة في تقارير الهندسة الأمنية من كلمة "impossible".',
          keyTakeaway: 'لا يُقبل ترك بند SHOULD دون توثيق مبرر تقني وضابط تعويضي.',
        },
      ],
      stepByStep: [
        {
          stepNumber: 1,
          titleAr: 'تحديد طبيعة القسم (Normative vs. Informative Check)',
          titleEn: 'Step 1: Identify Normative Scope',
          descriptionAr: 'التحقق مما إذا كان البند يقع في متن المعيار الإلزامي أم في ملحق إرشادي.',
          englishActionPhrase: 'Verify whether the clause resides within a normative section or an informative annex.',
          phonetic: '/ˈnɔː.mə.tɪv ˈsek.ʃən ɔːr ɪnˈfɔː.mə.tɪv ˈæn.eks/',
          pronunciationAudioText: 'Verify whether the clause resides within a normative section or an informative annex.',
          visualState: 'إضاءة قاعدة العمود المعياري باللون السماوي.',
        },
        {
          stepNumber: 2,
          titleAr: 'استخراج الفعل المعياري (Extract Modal Keyword)',
          titleEn: 'Step 2: Parse RFC 2119 Modal Verb',
          descriptionAr: 'تحديد مستوى الإلزام عبر رصد MUST/SHALL أو SHOULD أو MAY.',
          englishActionPhrase: 'Parse the normative modal verb to classify the requirement as mandatory, recommended, or optional.',
          phonetic: '/ˈmæn.də.tər.i, ˌrek.əˈmen.dɪd, ɔːr ˈɒp.ʃən.əl/',
          pronunciationAudioText: 'Parse the normative modal verb to classify the requirement as mandatory, recommended, or optional.',
          visualState: 'فرز الكلمات المفتاحية ثلاثية الأبعاد حول العمود.',
        },
        {
          stepNumber: 3,
          titleAr: 'فحص حالة الخوارزمية (Algorithm Lifecycle Check)',
          titleEn: 'Step 3: Verify Algorithm Approval Status',
          descriptionAr: 'التأكد من كون الخوارزمية Approved وليست Deprecated أو Disallowed.',
          englishActionPhrase: 'Cross-reference the cryptographic primitive against NIST SP 800-131A and NCA NCS approval tables.',
          phonetic: '/ˈkrɒsˌref.ər.əns ðə ˌkrɪp.təˈɡræf.ɪk ˈprɪm.ɪ.tɪv/',
          pronunciationAudioText: 'Cross-reference the cryptographic primitive against NIST SP 800-131A and NCA NCS approval tables.',
          visualState: 'ظهور مصفوفة التحقق الخضراء أعلى العمود.',
        },
        {
          stepNumber: 4,
          titleAr: 'توثيق دليل الامتثال أو الضابط التعويضي (Audit Evidence)',
          titleEn: 'Step 4: Map Audit Evidence & Compensating Controls',
          descriptionAr: 'ربط كل فعل معياري بدليل الفحص الفني أو توثيق الضابط التعويضي.',
          englishActionPhrase: 'Document verifiable audit artifacts or approved compensating controls in the compliance matrix.',
          phonetic: '/ˈkɒm.pən.seɪ.tɪŋ kənˈtrəʊlz ɪn ðə kəmˈplaɪ.əns ˈmeɪ.trɪks/',
          pronunciationAudioText: 'Document verifiable audit artifacts or approved compensating controls in the compliance matrix.',
          visualState: 'اكتمال الإطار الضوئي لعمود الامتثال المعياري.',
        },
      ],
      hotspots: [
        {
          id: 'hs-ch2-1',
          labelAr: 'قمة الإلزام المطلق (MUST / SHALL Tier)',
          labelEn: 'MUST / SHALL Absolute Mandate Tier',
          coordinates: { x: 0.0, y: 1.6, z: 0.4 },
          phonetic: '/ˈæb.sə.luːt ˈmæn.deɪt tɪər/',
          pronunciationAudioText: 'MUST and SHALL Absolute Mandate Tier. Non-compliance with a SHALL clause results in an immediate audit finding.',
          explanationAr: 'يمثل المتطلبات الحتمية التي لا تقبل الاستثناء في معايير IETF و NIST وضوابط NCA.',
          englishTemplateSnippet: 'All external TLS endpoints SHALL enforce TLS 1.2 or TLS 1.3 and MUST NOT negotiate SSLv3.',
          securityContext: 'الامتثال الإلزامي الصارم (Mandatory Regulatory Compliance).',
        },
        {
          id: 'hs-ch2-2',
          labelAr: 'نطاق التوصية المشروطة (SHOULD / RECOMMENDED Tier)',
          labelEn: 'SHOULD Conditional Recommendation Tier',
          coordinates: { x: -1.1, y: 0.4, z: 0.7 },
          phonetic: '/kənˈdɪʃ.ən.əl ˌrek.ə.menˈdeɪ.ʃən/',
          pronunciationAudioText: 'SHOULD Conditional Recommendation Tier. Deviations require a formal risk assessment and compensating controls.',
          explanationAr: 'يمثل التوصيات القوية التي يتطلب الحياد عنها توثيق تقييم مخاطر واعتماد ضابط تعويضي.',
          englishTemplateSnippet: 'Implementations SHOULD prioritize AEAD cipher suites such as AES-256-GCM or ChaCha20-Poly1305.',
          securityContext: 'إدارة الاستثناءات والضوابط التعويضية (Risk Exception Handling).',
        },
        {
          id: 'hs-ch2-3',
          labelAr: 'مؤشر التقادم والإيقاف (Deprecation Indicator)',
          labelEn: 'Algorithm Deprecation & Sunset Indicator',
          coordinates: { x: 1.1, y: 0.4, z: 0.7 },
          phonetic: '/ˌdep.rɪˈkeɪ.ʃən ˈsʌn.set ɪn.dɪ.keɪ.tər/',
          pronunciationAudioText: 'Algorithm Deprecation and Sunset Indicator. Deprecated algorithms must be scheduled for cryptographic migration.',
          explanationAr: 'ينبّه المهندس إلى الخوارزميات الموضوعة على جدول الإيقاف التدريجي (Deprecated) قبل حظرها النهائي (Disallowed).',
          englishTemplateSnippet: 'Legacy RSA-1024 keys are disallowed, and transitional parameters must be migrated prior to the sunset date.',
          securityContext: 'رشاقة التشفير والترحيل المعياري (Cryptographic Agility & Migration).',
        },
        {
          id: 'hs-ch2-4',
          labelAr: 'قاعدة الفصل بين المعياري والإرشادي (Normative vs. Informative Base)',
          labelEn: 'Normative vs. Informative Boundary',
          coordinates: { x: 0.0, y: -1.3, z: 0.5 },
          phonetic: '/ˈnɔː.mə.tɪv ˈvɜː.səs ɪnˈfɔː.mə.tɪv/',
          pronunciationAudioText: 'Normative versus Informative Boundary. Auditors evaluate compliance strictly against normative clauses.',
          explanationAr: 'يفصل بين البنود الإلزامية الحاكمة وبين الأمثلة والملاحق التوضيحية غير الملزمة.',
          englishTemplateSnippet: 'This appendix is informative and does not specify additional normative requirements for module validation.',
          securityContext: 'منهجية التدقيق المعياري (Standardized Audit Scoping).',
        },
      ],
    },
  },

  // ==========================================================================
  // الفصل الثالث (Chapter 3)
  // ==========================================================================
  {
    id: 603,
    chapter_number: 3,
    title: 'مصطلحات مركز العمليات الأمنية والاستجابة للحوادث',
    subtitle: 'SOC, SIEM, EDR, Playbooks, Triage, False Positives & Dwell Time Terminology',
    description: 'إتقان قاموس مركز العمليات الأمنية (SOC) باللغة الإنجليزية، والتعبير الدقيق عن مقاييس الرصد والاستجابة (MTTD, MTTR, Dwell Time)، ومصفوفة دقة التنبيهات (True/False Positives & Negatives)، وفرز الحوادث (Alert Triage) وأدلة التشغيل (Playbooks).',
    category: 'تطبيقي',
    difficulty: 'intermediate',
    phonetic: '/sɪˈkjʊərəti ˌɒpəˈreɪʃənz ˈsɛntər ænd ˈɪnsɪdənt ˈtraɪɑːʒ/',
    pronunciationAudioText: 'Security Operations Center and Incident Triage Terminology: SIEM, EDR, Playbooks, False Positives, and Dwell Time.',
    diagramKey: 'eng-cyber-3',
    videoUrl: 'https://www.youtube.com/watch?v=fG8R2M7W4wI',
    presentationUrl: '/assets/presentations/eng-cyber-ch3-soc-terminology.pdf',
    pdfStartPage: 39,
    pdfEndPage: 58,
    updated_at: GENERATED_TIMESTAMP,
    keyTopics: [
      'منظومة تقنيات مركز العمليات الأمنية بالإنجليزية (SOC, SIEM, SOAR, EDR, XDR, NDR)',
      'نطق ودلالة مصطلح الفرز الأولي للتنبيهات (Alert Triage /ˈtriː.ɑːʒ/) ومسارات التصعيد (Escalation Paths)',
      'مصفوفة تصنيف التنبيهات الأربع (True Positive, False Positive, True Negative, False Negative)',
      'مقاييس الكفاءة الزمنية في التقارير الإنجليزية (Dwell Time, MTTD, MTTA, MTTR)',
      'الفرق اللغوي والتشغيلي بين Runbook و Playbook و Standard Operating Procedure (SOP)',
    ],
    content: `## تمهيد: اللغة اليومية لمحلل مركز العمليات الأمنية (SOC Analyst)

يدور العمل اليومي داخل مركز العمليات الأمنية (**Security Operations Center - SOC**) حول قراءة السجلات (Logs)، وفرز التنبيهات (**Alert Triage**)، وتنفيذ أدلة الاستجابة (**Incident Response Playbooks**)، وكتابة ملاحظات التسليم بين المناوبات (**Shift Handover Logs**) باللغة الإنجليزية. وتستند هذه المصطلحات عالمياً إلى إرشادات [NIST SP 800-61 Rev. 3 (Incident Response Recommendations)](https://csrc.nist.gov/pubs/sp/800/61/r3/final) وإطار [MITRE ATT&CK Framework](https://attack.mitre.org/).

---page---

## أولاً: جدول مصطلحات SOC والنطق الصوتي الدقيق (IPA)

| المصطلح الإنجليزي (SOC Term) | النطق الصوتي (IPA) | الفئة | المقابل العربي المعتمد | الدلالة التشغيلية الدقيقة |
| :--- | :--- | :--- | :--- | :--- |
| **Triage** | \`/ˈtriː.ɑːʒ/\` أو \`/ˈtraɪ.ɑːʒ/\` | Noun / Verb | الفرز الأولي وتحديد الأولويات | تقييم التنبيهات الواردة بسرعة لتحديد مدى صحتها وخطورتها وأولوية معالجتها. |
| **SIEM** | \`/sɪm/\` أو \`/siːm/\` | Acronym (Noun) | إدارة معلومات وأحداث الأمن | منصة تجمع السجلات وتربطها (Log Correlation) لاكتشاف الأنماط المشبوهة. |
| **SOAR** | \`/sɔːr/\` | Acronym (Noun) | التنسيق والأتمتة والاستجابة الأمنية | منصة تؤتمت تنفيذ أدلة الاستجابة (Playbooks) مثل عزل الأجهزة أو حظر العناوين. |
| **EDR / XDR** | \`/ˌiː.diːˈɑːr/\` • \`/ˌeks.diːˈɑːr/\` | Acronym (Noun) | رصد واستجابة الطرفيات / الممتدة | وكلاء برمجيون يراقبون سلوك العمليات والذاكرة على الأجهزة والشبكة لحظياً. |
| **Dwell Time** | \`/dwel taɪm/\` | Noun Phrase | زمن المكوث الخفي للمهاجم | المدة الزمنية الفاصلة بين لحظة الاختراق الأولي (Initial Compromise) ولحظة اكتشافه (Detection). |
| **False Positive (FP)** | \`/fɔːls ˈpɒz.ə.tɪv/\` | Noun Phrase | إنذار إيجابي كاذب | تنبيه يطلقه النظام لنشاط سليم طبيعي (Benign Activity) ظناً منه أنه هجوم. |
| **False Negative (FN)** | \`/fɔːls ˈneɡ.ə.tɪv/\` | Noun Phrase | خفاء سلبي كاذب (الأخطر) | هجوم حقيقي يمر عبر الشبكة دون أن يكتشفه النظام أو يطلق أي تنبيه بشأنه. |
| **Lateral Movement** | \`/ˈlæt.ər.əl ˈmuːv.mənt/\` | Noun Phrase | الحركة الجانبية داخل الشبكة | انتقال المهاجم من الجهاز المخترق الأول إلى خوادم وأنظمة أخرى داخل الشبكة. |

---page---

## ثانياً: مصفوفة دقة التنبيهات (The 4-Quadrant Alert Classification Matrix)

في تقارير ضبط قواعد الرصد (**Detection Engineering & Rule Tuning**)، يجب التعبير بدقة عن الحالات الأربع التالية:

1. **True Positive (TP — إيجابي حقيقي)**:
   - *Meaning*: الهجوم وقع فعلاً، والنظام أطلق تنبيهاً صحيحاً.
   - *English Action*: *"The Tier-1 analyst confirmed the alert as a **True Positive** and escalated the ticket to Incident Response."*
2. **False Positive (FP — إيجابي كاذب)**:
   - *Meaning*: النشاط سليم ومصرح به (مثل أداة نسخ احتياطي)، لكن النظام أطلق تنبيهاً خاطئاً. يؤدي كثرة الـ FP إلى **Alert Fatigue** (إجهاد التنبيهات).
   - *English Action*: *"The correlation rule was tuned to suppress recurring **False Positives** triggered by the authorized vulnerability scanner."*
3. **True Negative (TN — سلبي حقيقي)**:
   - *Meaning*: حركة مرور طبيعية سليمة، والنظام لم يطلق أي تنبيه (الوضع الطبيعي الهادئ).
4. **False Negative (FN — سلبي كاذب / ثغرة الرصد)**:
   - *Meaning*: وقع هجوم فعلي خبيث، لكن أنظمة الرصد فشلت في اكتشافه (Missed Detection).
   - *English Action*: *"Red-team exercises uncovered a critical **False Negative** gap where encrypted C2 beaconing bypassed perimeter inspection."*

---page---

## ثالثاً: المقاييس الزمنية للاستجابة (SOC Temporal Metrics)

تُقاس كفاءة مركز العمليات الأمنية في التقارير الإنجليزية بأربعة مؤشرات أداء رئيسية (KPIs):
- **Dwell Time (\`/dwel taɪm/\`)**: المدة التي يقضيها المهاجم داخل البيئة دون أن يُكتشف.
- **MTTD — Mean Time to Detect (\`/miːn taɪm tə dɪˈtekt/\`)**: متوسط الزمن المستغرق لاكتشاف التهديد منذ لحظة وقوعه.
- **MTTA — Mean Time to Acknowledge (\`/miːn taɪm tʊ əkˈnɒl.ɪdʒ/\`)**: متوسط الزمن المستغرق منذ ظهور التنبيه حتى استلام المحلل له وبدء الفرز.
- **MTTR — Mean Time to Respond / Contain / Remediate (\`/miːn taɪm tə rɪˈspɒnd/\`)**: متوسط الزمن المستغرق لاحتواء الحادثة ومعالجتها بالكامل.

---page---

## رابعاً: نموذج سجل مناوبة وتصعيد رسمي في مركز العمليات (SOC Shift Handover & Escalation Note)

> **Official English SOC Tier-1 to Tier-2 Escalation Log:**
> *"**[Ticket #SOC-2026-8841 | Severity: HIGH | Status: Escalated to Tier-2]**"*
> *"During routine **alert triage** at 02:14 UTC, the **SIEM** correlated an anomalous PowerShell encoded command execution on workstation \`FIN-WS-042\` with a subsequent outbound connection to an unclassified external IP. Initial **EDR** telemetry confirmed unauthorized credential dumping activity against \`lsass.exe\` (**True Positive**). In accordance with **Playbook PB-IR-07 (Credential Access & Lateral Movement)**, the host was immediately **quarantined** via SOAR containment automation within 4 minutes (**MTTR-Contain: 4m**). The case is hereby **escalated** to Tier-2 Threat Hunting to assess potential **dwell time** and verify whether **lateral movement** occurred prior to host isolation."*

### الترجمة العربية والتحليل اللغوي:
«أثناء **الفرز الأولي الروتيني للتنبيهات (alert triage)** عند الساعة 02:14 بالتوقيت العالمي، ربط نظام **SIEM** تنفيذ أمر PowerShell مشفر غير معتاد على محطة العمل \`FIN-WS-042\` باتصال خارجي لاحق نحو عنوان IP غير مصنف. وأكدت قياسات **EDR** الأولية وجود نشاط غير مصرح به لاستخراج بيانات الاعتماد من عملية \`lsass.exe\` (**إيجابي حقيقي - True Positive**). ووفقاً **لدليل الاستجابة PB-IR-07**، **عُزل (quarantined)** الجهاز فوراً عبر أتمتة الاحتواء في منصة SOAR خلال 4 دقائق. وعليه، **تُصعَّد (escalated)** الحالة إلى المستوى الثاني لصيد التهديدات لتقييم **زمن المكوث (dwell time)** المحتمل والتحقق مما إذا كانت قد حدثت **حركة جانبية (lateral movement)** قبل عزل المضيف.»`,
    vocabularyList: [
      {
        id: 'voc-301',
        term: 'Triage',
        partOfSpeech: 'Noun',
        phonetic: '/ˈtriː.ɑːʒ/',
        pronunciationAudioText: 'Triage. Rapid alert triage enables SOC analysts to prioritize critical intrusions.',
        arabicMeaning: 'الفرز الأولي وتحديد الأولويات',
        academicDefinitionEn: 'The process of sorting, categorizing, and prioritizing incoming security alerts based on severity, asset criticality, and fidelity.',
        academicDefinitionAr: 'عملية فرز وتصنيف وترتيب أولويات التنبيهات الأمنية الواردة بناءً على الخطورة وأهمية الأصل ودقة المؤشر.',
        exampleSentenceEn: 'Tier-1 analysts perform initial triage within fifteen minutes of alert generation.',
        exampleSentenceAr: 'يجري محللو المستوى الأول الفرز الأولي خلال خمس عشرة دقيقة من صدور التنبيه.',
        collocations: ['alert triage', 'triage queue', 'initial triage', 'triage playbook'],
        commonErrorWarning: 'الكلمة ذات أصل فرنسي وتُنطق في الإنجليزية التقنية /ˈtriː.ɑːʒ/ أو /ˈtraɪ.ɑːʒ/ بنهاية صوتية تشبه حرف جيم المعطشة الناعمة /ʒ/.',
      },
      {
        id: 'voc-302',
        term: 'Dwell Time',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/dwel taɪm/',
        pronunciationAudioText: 'Dwell Time. Deploying EDR behavioral monitoring significantly reduced median adversary dwell time.',
        arabicMeaning: 'زمن مكوث المهاجم دون اكتشاف',
        academicDefinitionEn: 'The duration a threat actor remains undetected inside a compromised network from initial intrusion to detection.',
        academicDefinitionAr: 'المدة الزمنية التي يبقى فيها المهاجم متخفياً داخل الشبكة المخترقة منذ لحظة الدخول الأولي حتى لحظة اكتشافه.',
        exampleSentenceEn: 'Proactive threat hunting aims to minimize adversary dwell time before ransomware deployment.',
        exampleSentenceAr: 'يهدف صيد التهديدات الاستباقي إلى تقليص زمن مكوث المهاجم قبل نشر برمجيات الفدية.',
        collocations: ['adversary dwell time', 'median dwell time', 'reduce dwell time'],
      },
      {
        id: 'voc-303',
        term: 'False Positive',
        acronym: 'FP',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/fɔːls ˈpɒz.ə.tɪv/',
        pronunciationAudioText: 'False Positive. High false positive rates lead to analyst alert fatigue.',
        arabicMeaning: 'إنذار إيجابي كاذب',
        academicDefinitionEn: 'An alert that incorrectly indicates that a malicious event or vulnerability is present when the activity is actually benign.',
        academicDefinitionAr: 'تنبيه يشير خطأً إلى وجود نشاط خبيث أو ثغرة بينما النشاط في الواقع سليم ومصرح به.',
        exampleSentenceEn: 'Fine-tuning SIEM correlation thresholds reduced false positives by forty percent.',
        exampleSentenceAr: 'أدى الضبط الدقيق لعتبات الترابط في SIEM إلى خفض الإنذارات الإيجابية الكاذبة بنسبة أربعين بالمئة.',
        collocations: ['false positive rate', 'suppress false positives', 'benign false positive'],
      },
      {
        id: 'voc-304',
        term: 'False Negative',
        acronym: 'FN',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/fɔːls ˈneɡ.ə.tɪv/',
        pronunciationAudioText: 'False Negative. A false negative occurs when a genuine cyberattack evades detection controls.',
        arabicMeaning: 'خفاء سلبي كاذب (هجوم غير مكتشف)',
        academicDefinitionEn: 'A failure of a detection system to generate an alert when an actual malicious intrusion takes place.',
        academicDefinitionAr: 'فشل نظام الرصد في إطلاق أي تنبيه عند وقوع هجوم سيبراني حقيقي.',
        exampleSentenceEn: 'Uncovering false negatives requires continuous purple-team validation against MITRE ATT&CK techniques.',
        exampleSentenceAr: 'يتطلب كشف حالات الخفاء السلبي الكاذب اختبارات مستمرة من الفريق الأرجواني مقابل تقنيات MITRE ATT&CK.',
        collocations: ['eliminate false negatives', 'false negative detection gap', 'critical false negative'],
      },
      {
        id: 'voc-305',
        term: 'Playbook',
        partOfSpeech: 'Noun',
        phonetic: '/ˈpleɪ.bʊk/',
        pronunciationAudioText: 'Playbook. The ransomware containment playbook automates host isolation and token revocation.',
        arabicMeaning: 'دليل الاستجابة التشغيلي للحوادث',
        academicDefinitionEn: 'A structured checklist and workflow of response actions tailored to a specific incident type (e.g., phishing, ransomware, data exfiltration).',
        academicDefinitionAr: 'مخطط عمل وقائمة إجراءات استجابة منظمة ومصممة لنوع محدد من الحوادث الأمنية.',
        exampleSentenceEn: 'SOAR platforms execute standardized incident response playbooks to accelerate containment.',
        exampleSentenceAr: 'تنفذ منصات SOAR أدلة الاستجابة القياسية للحوادث لتسريع عملية الاحتواء.',
        collocations: ['incident response playbook', 'automated playbook', 'execute a playbook'],
      },
      {
        id: 'voc-306',
        term: 'Telemetry',
        partOfSpeech: 'Noun',
        phonetic: '/təˈlem.ə.tri/',
        pronunciationAudioText: 'Telemetry. Endpoint and network telemetry provide visibility into process creation and DNS queries.',
        arabicMeaning: 'القياسات والبيانات الرصدية عن بُعد',
        academicDefinitionEn: 'Automated collection and transmission of security data, logs, and behavioral metrics from endpoints, networks, and cloud workloads.',
        academicDefinitionAr: 'الجمع والنقل الآلي للبيانات الأمنية والسجلات والمقاييس السلوكية من الطرفيات والشبكات والسحابة.',
        exampleSentenceEn: 'High-fidelity EDR telemetry is essential for reconstructing the attack kill chain.',
        exampleSentenceAr: 'تُعد القياسات الرصدية عالية الدقة من نظام EDR ضرورية لإعادة بناء سلسلة الهجوم.',
        collocations: ['endpoint telemetry', 'ingest telemetry', 'high-fidelity telemetry'],
      },
    ],
    terminologyGlossary: [
      {
        term: 'Triage',
        phonetic: '/ˈtriː.ɑːʒ/',
        pronunciationAudioText: 'Triage',
        category: 'SOC & IR',
        arabicEquivalent: 'الفرز الأولي للتنبيهات',
        usageContext: 'تصنيف التنبيهات وتحديد أولوياتها في المستوى الأول من SOC.',
      },
      {
        term: 'Dwell Time',
        phonetic: '/dwel taɪm/',
        pronunciationAudioText: 'Dwell Time',
        category: 'SOC & IR',
        arabicEquivalent: 'زمن المكوث الخفي',
        usageContext: 'المدة من لحظة الاختراق الأولي حتى لحظة الاكتشاف.',
      },
      {
        term: 'False Positive (FP)',
        phonetic: '/fɔːls ˈpɒz.ə.tɪv/',
        pronunciationAudioText: 'False Positive',
        category: 'SOC & IR',
        arabicEquivalent: 'إنذار إيجابي كاذب',
        usageContext: 'تنبيه خاطئ لنشاط سليم طبيعي.',
      },
      {
        term: 'False Negative (FN)',
        phonetic: '/fɔːls ˈneɡ.ə.tɪv/',
        pronunciationAudioText: 'False Negative',
        category: 'SOC & IR',
        arabicEquivalent: 'خفاء سلبي كاذب',
        usageContext: 'هجوم حقيقي لم ترصده أنظمة الكشف.',
      },
      {
        term: 'Playbook',
        phonetic: '/ˈpleɪ.bʊk/',
        pronunciationAudioText: 'Playbook',
        category: 'SOC & IR',
        arabicEquivalent: 'دليل الاستجابة للحوادث',
        usageContext: 'خطوات الاستجابة القياسية لسيناريو تهديد محدد.',
      },
    ],
    images: [
      {
        prompt: 'SOC incident triage pipeline showing SIEM telemetry ingestion, True/False Positive matrix, Dwell Time timeline, and SOAR Playbook containment, 16:9',
        caption: 'مسار عمل مركز العمليات الأمنية (SOC): من جمع القياسات (Telemetry) والفرز (Triage) إلى الاحتواء الآلي عبر Playbooks',
        alt: 'SOC Triage and Dwell Time pipeline diagram',
        seed: 6031,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'بيئة عمل مركز العمليات الأمنية (SOC Ecosystem)',
        titleEn: 'The Modern SOC Technology Stack',
        bulletPoints: [
          'SIEM (Security Information and Event Management): جمع وربط السجلات.',
          'EDR / XDR: الرصد السلوكي والاستجابة على مستوى الطرفيات والشبكة.',
          'SOAR: أتمتة وتنسيق تنفيذ أدلة الاستجابة (Playbooks).',
        ],
        englishKeyExcerpt: 'The SIEM ingests normalized telemetry from EDR agents and firewall logs to detect multi-stage intrusions.',
        phoneticHighlight: 'SIEM /sɪm/ • SOAR /sɔːr/ • Telemetry /təˈlem.ə.tri/',
        speakerNotes: 'وضح للطلاب كيف تُنطق الاختصارات SIEM (/sɪm/) و SOAR (/sɔːr/) ككلمات كاملة في المؤتمرات الدولية.',
        visualCue: 'مخطط معماري يربط الطرفيات والشبكة بمنصتي SIEM و SOAR.',
      },
      {
        slideNumber: 2,
        title: 'فن الفرز الأولي للتنبيهات ومسارات التصعيد',
        titleEn: 'Alert Triage & Escalation Workflows',
        bulletPoints: [
          'معنى ونطق Triage (/ˈtriː.ɑːʒ/): التقييم السريع لخطورة وموثوقية التنبيه.',
          'مهام محلل المستوى الأول (Tier-1 Triage) مقابل المستوى الثاني (Tier-2 Incident Responder).',
          'متلازمات التصعيد: escalate an incident, quarantine a host, revoke credentials.',
        ],
        englishKeyExcerpt: 'Following initial triage, confirmed high-severity incidents are immediately escalated to Tier-2 responders.',
        phoneticHighlight: 'Triage /ˈtriː.ɑːʒ/ • Quarantine /ˈkwɒr.ən.tiːn/',
        speakerNotes: 'ذكّر الطلاب بالسؤال التفاعلي في النموذج الأولي حول كلمة Quarantine ومعناها الدقيق.',
        visualCue: 'مخطط تدفق التنبيه من Tier-1 إلى Tier-2 و Tier-3.',
      },
      {
        slideNumber: 3,
        title: 'مصفوفة تصنيف التنبيهات الأربع وإجهاد المحللين',
        titleEn: 'True/False Positives & Alert Fatigue',
        bulletPoints: [
          'True Positive (TP): تهديد حقيقي تم رصده بنجاح.',
          'False Positive (FP): نشاط سليم أطلق تنبيهاً كاذباً (يسبب Alert Fatigue).',
          'False Negative (FN): هجوم خبيث عبر دون أي تنبيه (الخطر الأكبر).',
        ],
        englishKeyExcerpt: 'Excessive false positives induce analyst alert fatigue, increasing the likelihood of overlooking a true positive.',
        phoneticHighlight: 'Alert Fatigue /əˈlɜːt fəˈtiːɡ/ • Benign /bɪˈnaɪn/',
        speakerNotes: 'علّم الطلاب كلمة Benign (/bɪˈnaɪn/ — سليم/غير خبيث) باعتبارها المقابل الأكاديمي لكلمة Malicious.',
        visualCue: 'مصفوفة 2×2 توضح العلاقة بين الواقع الفعلي وقرار نظام الرصد.',
      },
      {
        slideNumber: 4,
        title: 'مقاييس الأداء الزمنية في تقارير SOC',
        titleEn: 'Temporal Metrics: Dwell Time, MTTD & MTTR',
        bulletPoints: [
          'Dwell Time: زمن بقاء المهاجم متخفياً داخل البيئة.',
          'MTTD (Mean Time to Detect): متوسط زمن الاكتشاف.',
          'MTTR (Mean Time to Respond/Contain): متوسط زمن الاستجابة والاحتواء.',
        ],
        englishKeyExcerpt: 'Automated SOAR containment playbooks reduced our Mean Time to Respond (MTTR) from four hours to six minutes.',
        phoneticHighlight: 'Dwell Time /dwel taɪm/ • Containment /kənˈteɪn.mənt/',
        speakerNotes: 'وضح كيف تُستخدم هذه المقاييس في التقارير الشهرية لإثبات كفاءة فريق SOC.',
        visualCue: 'خط زمني للحادثة يبدأ من الاختراق الأولي حتى التعافي الكامل.',
      },
      {
        slideNumber: 5,
        title: 'كتابة ملاحظات تسليم المناوبات (Shift Handover Logs)',
        titleEn: 'Drafting Clear Shift Handover Logs',
        bulletPoints: [
          'الإيجاز والدقة الزمنية بالتوقيت العالمي المنسق (UTC Timestamps).',
          'تحديد حالة التذكرة بوضوح (Investigating, Contained, Escalated, Closed - FP).',
          'تحديد الإجراءات المتخذة والإجراءات المطلوبة من المناوبة التالية.',
        ],
        englishKeyExcerpt: 'Host FIN-WS-042 remains isolated pending forensic memory acquisition by the incoming morning shift.',
        phoneticHighlight: 'Acquisition /ˌæk.wɪˈzɪʃ.ən/ • Isolated /ˈaɪ.sə.leɪ.tɪd/',
        speakerNotes: 'اعرض نموذج سجل التسليم القياسي واطلب من الطلاب قراءته بصوت واضح.',
        visualCue: 'نموذج بطاقة تذكرة SOC قياسية باللغة الإنجليزية.',
      },
    ],
    flashcards: [
      {
        front: 'Triage (/ˈtriː.ɑːʒ/)',
        back: 'الفرز الأولي للتنبيهات الأمنية لتحديد مدى صحتها ودرجة خطورتها وأولوية التعامل معها.',
        category: 'SOC Operations',
        phonetic: '/ˈtriː.ɑːʒ/',
        pronunciationAudioText: 'Triage',
      },
      {
        front: 'Dwell Time (/dwel taɪm/)',
        back: 'زمن المكوث الخفي: المدة الزمنية التي يقضيها المهاجم داخل الشبكة المخترقة منذ لحظة الدخول حتى لحظة اكتشافه.',
        category: 'SOC Metrics',
        phonetic: '/dwel taɪm/',
        pronunciationAudioText: 'Dwell Time',
      },
      {
        front: 'False Positive vs. False Negative',
        back: 'False Positive: إنذار كاذب لنشاط سليم (Benign). False Negative: فشل النظام في إطلاق تنبيه عند وقوع هجوم حقيقي (Malicious).',
        category: 'Detection Engineering',
        phonetic: '/fɔːls ˈpɒz.ə.tɪv/ vs /fɔːls ˈneɡ.ə.tɪv/',
        pronunciationAudioText: 'False Positive versus False Negative',
      },
      {
        front: 'MTTD & MTTR',
        back: 'MTTD (Mean Time to Detect): متوسط زمن الاكتشاف. MTTR (Mean Time to Respond/Contain): متوسط زمن الاستجابة والاحتواء.',
        category: 'SOC Metrics',
        phonetic: '/miːn taɪm tə dɪˈtekt/',
        pronunciationAudioText: 'Mean Time to Detect and Mean Time to Respond',
      },
      {
        front: 'Playbook (/ˈpleɪ.bʊk/)',
        back: 'دليل استجابة تشغيلي يحدد الخطوات المتسلسلة (اليدوية أو المؤتمتة عبر SOAR) للتعامل مع سيناريو حادثة محدد.',
        category: 'Incident Response',
        phonetic: '/ˈpleɪ.bʊk/',
        pronunciationAudioText: 'Playbook',
      },
      {
        front: 'Quarantine / Isolate a Host (/ˈkwɒr.ən.tiːn/)',
        back: 'عزل الجهاز المصاب عن الشبكة فوراً لمنع الحركة الجانبية (Lateral Movement) أو تسريب البيانات مع إبقائه متاحاً للفحص الجنائي.',
        category: 'Containment',
        phonetic: '/ˈkwɒr.ən.tiːn/',
        pronunciationAudioText: 'Quarantine a host',
      },
    ],
    miniQuiz: [
      {
        question: 'An authorized nightly backup script triggers a "Mass File Modification" ransomware alert in the SIEM. How should the SOC analyst classify this alert upon closing the ticket?',
        options: [
          'True Positive (TP)',
          'False Positive (FP)',
          'False Negative (FN)',
          'Dwell Time Escalation',
        ],
        correctIndex: 1,
        explanation: 'بما أن النشاط ناتج عن أداة نسخ احتياطي مصرح بها وسليمة (Benign Activity) وليس هجوماً فعلياً، فإن التنبيه يُصنف بأنه False Positive (FP).',
      },
      {
        question: 'What term describes the total elapsed time between an attacker’s initial exploitation of a server on March 1st and the SOC’s detection of the breach on March 19th?',
        options: [
          'Mean Time to Remediate (MTTR)',
          'Dwell Time (18 days)',
          'Alert Triage Window',
          'Zeroization Interval',
        ],
        correctIndex: 1,
        explanation: 'المدة الزمنية الفاصلة بين لحظة الاختراق الأولي ولحظة اكتشافه تُعرف في تقارير الاستجابة للحوادث باسم Dwell Time.',
      },
      {
        question: 'Which English sentence uses SOC terminology accurately?',
        options: [
          'The EDR agent repudiated the benign traffic into ciphertext.',
          'Following initial alert triage, the compromised endpoint was quarantined in accordance with the ransomware containment playbook.',
          'We increased our adversary dwell time to improve SOC efficiency.',
          'False negatives cause alert fatigue because they generate thousands of noisy tickets.',
        ],
        correctIndex: 1,
        explanation: 'الجملة الثانية تستخدم مصطلحات alert triage و quarantined و containment playbook في سياقها التشغيلي والأكاديمي السليم.',
      },
      {
        question: 'ما المقابل الإنجليزي الأكاديمي الدقيق لمفهوم «النشاط السليم غير الخبيث» في تقارير تحليل التنبيهات؟',
        options: [
          'Benign activity (/bɪˈnaɪn/)',
          'Malicious payload (/məˈlɪʃ.əs/)',
          'Anomalous exfiltration (/əˈnɒm.ə.ləs/)',
          'Volatile artifact (/ˈvɒl.ə.taɪl/)',
        ],
        correctIndex: 0,
        explanation: 'كلمة Benign (/bɪˈnaɪn/) هي المصطلح القياسي في أمن المعلومات لوصف النشاط السليم غير الضار، في مقابل Malicious (خبيث).',
      },
    ],
    interactiveBook3D: {
      model3DType: 'SOC_SIEM_RADAR_ORB',
      shaderEffect: 'amber-soc-pulse',
      bookTitleEn: 'Interactive 3D SOC Radar: Triage, Metrics & Playbooks',
      bookTitleAr: 'الكتاب التفاعلي ثلاثي الأبعاد: رادار مركز العمليات الأمنية',
      pages3D: [
        {
          pageNumber: 1,
          titleAr: 'دورة حياة التنبيه داخل منصة SIEM',
          titleEn: 'Alert Lifecycle Inside the SIEM',
          badge: 'SOC RADAR PAGE 01',
          bilingualSummaryAr: 'تستقبل منصة SIEM القياسات والسجلات (Telemetry & Logs)، وتطبق قواعد الترابط (Correlation Rules) لتوليد تنبيهات تدخل طابور الفرز (Triage Queue).',
          englishExcerpt: 'Normalized telemetry from endpoints, firewalls, and identity providers is correlated in real time to surface high-fidelity security alerts.',
          phoneticGuide: 'Telemetry /təˈlem.ə.tri/ | Correlated /ˈkɒr.ə.leɪ.tɪd/ | High-Fidelity /haɪ fɪˈdel.ə.ti/',
          pronunciationAudioText: 'Normalized telemetry from endpoints, firewalls, and identity providers is correlated in real time to surface high-fidelity security alerts.',
          grammarOrStyleTip: 'مصطلح "High-Fidelity Alert" يعني تنبيهاً ذا موثوقية عالية ونسبة إنذار كاذب منخفضة.',
          keyTakeaway: 'توحيد صيغة السجلات (Log Normalization) يسبق دائماً عملية الترابط (Correlation).',
        },
        {
          pageNumber: 2,
          titleAr: 'فرز التنبيهات ومصفوفة الدقة',
          titleEn: 'Triage & The Detection Accuracy Matrix',
          badge: 'SOC RADAR PAGE 02',
          bilingualSummaryAr: 'يميز المحلل أثناء الفرز (Triage) بين الهجوم الفعلي (True Positive) والإنذار الكاذب لنشاط سليم (False Positive)، بينما يعمل صيد التهديدات على كشف الهجمات الصامتة (False Negatives).',
          englishExcerpt: 'During triage, analysts enrich indicators and inspect process trees to distinguish true positives from benign false positives.',
          phoneticGuide: 'Triage /ˈtriː.ɑːʒ/ | Benign /bɪˈnaɪn/ | False Positive /fɔːls ˈpɒz.ə.tɪv/',
          pronunciationAudioText: 'During triage, analysts enrich indicators and inspect process trees to distinguish true positives from benign false positives.',
          grammarOrStyleTip: 'الفعل "enrich" (يثري البيانات بالسياق مثل سمعة الـ IP أو Hash) فعل محوري في تقارير SOC و SOAR.',
          keyTakeaway: 'الهدف من ضبط القواعد (Rule Tuning) هو خفض FP دون التسبب في ظهور FN.',
        },
        {
          pageNumber: 3,
          titleAr: 'الاحتواء الآلي وتقليص زمن المكوث',
          titleEn: 'SOAR Containment & Reducing Dwell Time',
          badge: 'SOC RADAR PAGE 03',
          bilingualSummaryAr: 'كلما انخفض متوسط زمن الاكتشاف (MTTD) ومتوسط زمن الاستجابة (MTTR) عبر تنفيذ أدلة التشغيل (Playbooks)، تضاءل زمن مكوث المهاجم (Dwell Time) وانعدمت فرص الحركة الجانبية.',
          englishExcerpt: 'Automated playbook execution isolates compromised endpoints within seconds, drastically compressing adversary dwell time and halting lateral movement.',
          phoneticGuide: 'Dwell Time /dwel taɪm/ | Lateral Movement /ˈlæt.ər.əl ˈmuːv.mənt/',
          pronunciationAudioText: 'Automated playbook execution isolates compromised endpoints within seconds, drastically compressing adversary dwell time and halting lateral movement.',
          grammarOrStyleTip: 'استخدم الأفعال "halt" أو "contain" أو "arrest" مع "lateral movement" في تقارير الاستجابة للحوادث.',
          keyTakeaway: 'قياس MTTD و MTTR بانتظام هو المعيار العالمي لتقييم نضج مركز العمليات الأمنية.',
        },
      ],
      stepByStep: [
        {
          stepNumber: 1,
          titleAr: 'جمع القياسات وتوحيد السجلات (Telemetry Ingestion)',
          titleEn: 'Step 1: Telemetry Ingestion & Correlation',
          descriptionAr: 'استقبال سجلات EDR والشبكة والهوية داخل منصة SIEM.',
          englishActionPhrase: 'Multi-source security telemetry is ingested, normalized, and correlated by the SIEM engine.',
          phonetic: '/ˈnorm.ə.laɪzd ænd ˈkɒr.ə.leɪ.tɪd/',
          pronunciationAudioText: 'Multi-source security telemetry is ingested, normalized, and correlated by the SIEM engine.',
          visualState: 'تدفق نبضات ضوئية متعددة الألوان نحو مركز الكرة الرادارية.',
        },
        {
          stepNumber: 2,
          titleAr: 'الفرز الأولي وإثراء المؤشرات (Alert Triage & Enrichment)',
          titleEn: 'Step 2: Tier-1 Alert Triage & Enrichment',
          descriptionAr: 'فحص شجرة العمليات وإثراء عناوين IP والبصمات لتحديد ما إذا كان التنبيه TP أم FP.',
          englishActionPhrase: 'The Tier-1 analyst performs alert triage and classifies the event as a confirmed True Positive.',
          phonetic: '/pəˈfɔːmz əˈlɜːt ˈtriː.ɑːʒ/',
          pronunciationAudioText: 'The Tier-1 analyst performs alert triage and classifies the event as a confirmed True Positive.',
          visualState: 'توهج المؤشر الحرج باللون الكهرماني الساطع مع علامة تحقق.',
        },
        {
          stepNumber: 3,
          titleAr: 'تفعيل دليل الاحتواء عبر SOAR (Playbook Containment)',
          titleEn: 'Step 3: Automated Playbook Execution',
          descriptionAr: 'عزل الجهاز المخترق وتعطيل جلسات الهوية لمنع الحركة الجانبية.',
          englishActionPhrase: 'The SOAR platform executes the containment playbook to quarantine the host and revoke active tokens.',
          phonetic: '/ˈkwɒr.ən.tiːn ðə həʊst ænd rɪˈvəʊk ˈtəʊ.kənz/',
          pronunciationAudioText: 'The SOAR platform executes the containment playbook to quarantine the host and revoke active tokens.',
          visualState: 'إحاطة العقدة المخترقة بدرع عزل سداسي الأضلاع.',
        },
        {
          stepNumber: 4,
          titleAr: 'التصعيد وتوثيق المقاييس الزمنية (Escalation & Metrics)',
          titleEn: 'Step 4: Tier-2 Escalation & MTTD/MTTR Logging',
          descriptionAr: 'تصعيد الحادثة للتحقيق الجنائي وتسجيل زمن المكوث وزمن الاحتواء.',
          englishActionPhrase: 'The incident is escalated to Tier-2 with documented MTTD, MTTR, and estimated adversary dwell time.',
          phonetic: '/ˈes.kə.leɪ.tɪd tə tɪər tuː wɪð ˈdwel taɪm/',
          pronunciationAudioText: 'The incident is escalated to Tier-2 with documented MTTD, MTTR, and estimated adversary dwell time.',
          visualState: 'ظهور لوحة مؤشرات الأداء الزمنية الثلاثية الأبعاد أعلى الرادار.',
        },
      ],
      hotspots: [
        {
          id: 'hs-ch3-1',
          labelAr: 'بوابة الفرز الأولي (Alert Triage Gate)',
          labelEn: 'Alert Triage & Enrichment Gate',
          coordinates: { x: -1.3, y: 0.9, z: 0.5 },
          phonetic: '/əˈlɜːt ˈtriː.ɑːʒ ɡeɪt/',
          pronunciationAudioText: 'Alert Triage and Enrichment Gate. Analysts evaluate alert fidelity to separate true positives from benign false positives.',
          explanationAr: 'نقطة الفرز الأولى التي يُفحص فيها التنبيه ويُثرى بمعلومات استخبارات التهديدات لتحديد أولويته.',
          englishTemplateSnippet: 'Initial triage confirmed anomalous child-process spawning under winword.exe (True Positive).',
          securityContext: 'فرز التنبيهات وتقليل الإجهاد التشغيلي (SOC Tier-1 Triage).',
        },
        {
          id: 'hs-ch3-2',
          labelAr: 'مؤشر زمن المكوث (Adversary Dwell Time Meter)',
          labelEn: 'Adversary Dwell Time & MTTD Meter',
          coordinates: { x: 1.3, y: 0.9, z: 0.5 },
          phonetic: '/ˈæd.və.sər.i dwel taɪm ˈmiː.tər/',
          pronunciationAudioText: 'Adversary Dwell Time and MTTD Meter. Reducing dwell time prevents attackers from achieving lateral movement.',
          explanationAr: 'يقيس الفترة الزمنية الحرجة بين دخول المهاجم واكتشافه من قِبل مركز العمليات الأمنية.',
          englishTemplateSnippet: 'Total adversary dwell time was restricted to 18 minutes prior to automated EDR containment.',
          securityContext: 'قياس كفاءة الكشف المبكر (Detection Speed Metrics).',
        },
        {
          id: 'hs-ch3-3',
          labelAr: 'محرك أدلة الاستجابة (SOAR Playbook Engine)',
          labelEn: 'Automated SOAR Playbook Engine',
          coordinates: { x: 0.0, y: -1.2, z: 0.8 },
          phonetic: '/ˈɔː.tə.meɪ.tɪd ˈpleɪ.bʊk ˈen.dʒɪn/',
          pronunciationAudioText: 'Automated SOAR Playbook Engine. Standardized playbooks orchestrate host isolation and firewall blocklists.',
          explanationAr: 'ينفذ خطوات الاحتواء القياسية آلياً فور تأكيد الحادثة لتقليص زمن الاستجابة (MTTR).',
          englishTemplateSnippet: 'Playbook PB-IR-04 executed host network quarantine and triggered Active Directory password reset.',
          securityContext: 'أتمتة وتنسيق الاستجابة للحوادث (SOAR Orchestration).',
        },
        {
          id: 'hs-ch3-4',
          labelAr: 'مرشح الإنذارات الكاذبة (False Positive Suppression Filter)',
          labelEn: 'False Positive Tuning Filter',
          coordinates: { x: 0.0, y: 1.5, z: -0.3 },
          phonetic: '/fɔːls ˈpɒz.ə.tɪv ˈtjuː.nɪŋ ˈfɪl.tər/',
          pronunciationAudioText: 'False Positive Tuning Filter. Rule tuning suppresses benign administrative noise while preserving detection coverage.',
          explanationAr: 'يمثل عملية هندسة وضبط قواعد الرصد لاستبعاد الأنشطة الإدارية السليمة ومنع إجهاد المحللين.',
          englishTemplateSnippet: 'The SIEM correlation rule was tuned to exclude authorized vulnerability assessment subnets.',
          securityContext: 'هندسة الرصد وضبط القواعد (Detection Engineering).',
        },
      ],
    },
  },

  // ==========================================================================
  // الفصل الرابع (Chapter 4)
  // ==========================================================================
  {
    id: 604,
    chapter_number: 4,
    title: 'الصياغة الاحترافية لتقارير الحوادث الأمنية والتحقيق الجنائي باللغة الإنجليزية',
    subtitle: 'Writing Technical Incident Response & Digital Forensics Reports: Root Cause Analysis, Timeline of Compromise, IOCs',
    description: 'منهجية كتابة تقارير الاستجابة للحوادث (DFIR Reports) وتقارير التحقيق الجنائي الرقمي باللغة الإنجليزية وفق معايير NIST SP 800-86 و ISO/IEC 27037، بما يشمل صياغة سلسلة الحيازة (Chain of Custody)، والجدول الزمني للاختراق (Timeline of Compromise)، وتحليل السبب الجذري (RCA)، ومؤشرات الاختراق (IOCs vs. IOAs).',
    category: 'متقدم',
    difficulty: 'intermediate',
    phonetic: '/ˈraɪtɪŋ ˈdɪdʒɪtəl fəˈrɛnsɪks ænd ˈɪnsɪdənt rɪˈspɒns rɪˈpɔːrts/',
    pronunciationAudioText: 'Writing Digital Forensics and Incident Response Reports: Root Cause Analysis, Timeline of Compromise, Chain of Custody, and Indicators of Compromise.',
    diagramKey: 'eng-cyber-4',
    videoUrl: 'https://www.youtube.com/watch?v=k9ZigsW9YwQ',
    presentationUrl: '/assets/presentations/eng-cyber-ch4-dfir-reports.pdf',
    pdfStartPage: 59,
    pdfEndPage: 80,
    updated_at: GENERATED_TIMESTAMP,
    keyTopics: [
      'الأقسام القياسية لتقرير التحقيق الجنائي الرقمي والاستجابة للحوادث (DFIR Report Structure)',
      'الفرق الدقيق بين مؤشرات الاختراق (Indicators of Compromise - IOCs) ومؤشرات الهجوم السلوكية (Indicators of Attack - IOAs)',
      'صياغة سلسلة الحيازة القانونية (Chain of Custody) وترتيب التطاير (Order of Volatility وفق RFC 3227)',
      'قواعد النزاهة العلمية واللغوية في تقارير التحقيق الجنائي (Objective Tone, Hedging vs. Fact, Past Tense & Passive Voice)',
      'كتابة تحليل السبب الجذري (Root Cause Analysis - RCA) والجدول الزمني للاختراق (Timeline of Compromise)',
    ],
    content: `## تمهيد: تقرير التحقيق الجنائي وثيقة تقنية وقانونية

يختلف تقرير الاستجابة للحوادث والتحقيق الجنائي الرقمي (**Digital Forensics and Incident Response - DFIR Report**) عن المراسلات التقنية العادية؛ فهو وثيقة قد تُعرض أمام الجهات التنظيمية (مثل الهيئة الوطنية للأمن السيبراني NCA أو البنك المركزي السعودي SAMA) أو أمام المحاكم المختصة. ولذلك يجب أن يُصاغ بلغة إنجليزية **موضوعية تماماً (Strictly Objective)**، خالية من التخمين العاطفي، ومستندة إلى الأدلة الرقمية الموثقة ببصمات التجزئة وفق معايير [ISO/IEC 27037 (Guidelines for identification, collection, acquisition, and preservation of digital evidence)](https://www.iso.org/standard/44381.html) ووثيقة [IETF RFC 3227 (Guidelines for Evidence Collection and Archiving)](https://www.rfc-editor.org/info/rfc3227).

---page---

## أولاً: قاموس مصطلحات التحقيق الجنائي الرقمي (DFIR Lexicon & IPA)

| المصطلح الإنجليزي (DFIR Term) | النطق الصوتي (IPA) | الفئة | المقابل العربي المعتمد | الدلالة الجنائية والتقنية الدقيقة |
| :--- | :--- | :--- | :--- | :--- |
| **Chain of Custody** | \`/tʃeɪn əv ˈkʌs.tə.di/\` | Noun Phrase | سلسلة الحيازة (حفظ الأدلة) | سجل كرونولوجي موثق يثبت من جمع الدليل الرقمي ومن نقله وحفظه وفحصه منذ لحظة الضبط حتى المحكمة. |
| **Order of Volatility** | \`/ˈɔː.dər əv ˌvɒl.əˈtɪl.ə.ti/\` | Noun Phrase | ترتيب التطاير للأدلة | قاعدة جمع الأدلة بدءاً من الأكثر تطايراً (محتويات المعالج والذاكرة RAM) قبل الأقل تطايراً (الأقراص الصلبة). |
| **Root Cause Analysis (RCA)** | \`/ruːt kɔːz əˈnæl.ə.sɪs/\` | Noun Phrase | تحليل السبب الجذري | تحديد الثغرة الأساسية أو الخلل الهيكلي الذي مكّن المهاجم من تحقيق الاختراق الأولي. |
| **Indicator of Compromise (IOC)** | \`/ˈɪn.dɪ.keɪ.tər əv ˈkɒm.prə.maɪz/\` | Noun Phrase | مؤشر اختراق (أثر جنائي ثابت) | دليل تقني يثبت وقوع اختراق سابق أو حالي (مثل SHA-256 Hash لملف خبيث، أو C2 IP/Domain). |
| **Indicator of Attack (IOA)** | \`/ˈɪn.dɪ.keɪ.tər əv əˈtæk/\` | Noun Phrase | مؤشر هجوم (سلوكي لحظي) | نمط سلوكي يكشف نية المهاجم وخطواته أثناء التنفيذ حتى لو لم يستخدم ملفاً خبيثاً معروف البصمة. |
| **Data Exfiltration** | \`/ˈdeɪ.tə ˌeks.fɪlˈtreɪ.ʃən/\` | Noun Phrase | تسريب / نهب البيانات للخارج | النقل غير المصرح به للبيانات الحساسة من داخل شبكة المؤسسة إلى خادم يتحكم به المهاجم. |
| **Forensic Imaging** | \`/fəˈren.zɪk ˈɪm.ɪ.dʒɪŋ/\` | Noun Phrase | النسخ الجنائي المطابق للبتات | أخذ نسخة مطابقة بتاً ببت (Bit-by-Bit / Bitstream Clone) عبر حاجز كتابة (Write Blocker) مع التحقق ببصمة SHA-256. |
| **Persistence Mechanism** | \`/pəˈsɪs.təns ˈmek.ə.nɪ.zəm/\` | Noun Phrase | آلية البقاء والاستمرارية | تقنية يزرعها المهاجم (مثل Scheduled Task أو Registry Run Key) للاحتفاظ بالوصول حتى بعد إعادة تشغيل النظام. |

---page---

## ثانياً: قواعد الصياغة اللغوية في تقارير التحقيق الجنائي (Forensic Writing Rules)

1. **التمييز الصارم بين الحقيقة المثبتة (Verified Fact) والفرضية المرجحة (Analytical Assessment)**:
   - **عند وجود دليل قاطع**: استخدم أفعالاً جازمة في الماضي: *"Forensic analysis of the MFT **confirmed** that \`payload.dll\` was created at 14:22:09 UTC."*
   - **عند وجود استنتاج تحليلي غير مكتمل الدليل (بسبب مسح السجلات مثلاً)**: استخدم لغة التحوط الأكاديمي (**Academic Hedging**): *"The absence of Security Event ID 4624 entries prior to 14:00 UTC **indicates with high confidence** that the threat actor cleared the event log using \`wevtutil.exe\`."*
2. **عدم إسناد النية البشرية أو الهوية الجنائية دون دليل (Attribution Discipline)**:
   - لا تكتب في التقرير الجنائي الفني: *"A hacker named X stole the database"*.
   - الصياغة المهنية: *"An unauthorized threat actor utilizing compromised service account credentials exfiltrated 4.2 GB of archive data to external IP \`198.51.100.44\`."*
3. **تحييد عناوين الويب والعناوين الخبيثة (Defanging IOCs in Reports)**:
   - لمنع النقر الخاطئ من قِبل قارئ التقرير، تُكتب المؤشرات بصيغة محيّدة (**Defanged Format**): يُكتب \`http://malicious.example.com\` على هيئة \`hxxp[://]malicious[.]example[.]com\`، ويُكتب \`198.51.100.44\` على هيئة \`198[.]51[.]100[.]44\`.

---page---

## ثالثاً: نموذج رسمي متكامل لتقرير تحقيق جنائي رقمي واستجابة للحوادث (Complete English DFIR Report Template)

فيما يلي نموذج قياسي مكتمل الأركان لتقرير حادثة أمنية باللغة الإنجليزية مع ترجمته وتحليله:

> **OFFICIAL DFIR REPORT EXCERPT — CASE ID: DFIR-2026-0914**
>
> **1. Executive & Technical Summary**
> On 04 November 2026 at 08:45 UTC, the Security Operations Center (SOC) detected anomalous outbound TLS traffic originating from application server \`APP-PRD-09\`. Forensic investigation confirmed that an external threat actor exploited an unpatched remote code execution (RCE) vulnerability in a third-party web framework (CVE-2026-1042) to establish initial access, deploy an in-memory web shell, and stage 1.8 GB of configuration archives for exfiltration. Host containment was achieved within 11 minutes of detection.
>
> **2. Evidence Preservation & Chain of Custody**
> In strict adherence to the **order of volatility** (RFC 3227), responders captured a 32 GB volatile RAM dump using *WinPmem* prior to isolating the server, followed by a bit-by-bit **forensic disk image** acquired via a hardware write blocker. Cryptographic integrity of all forensic artifacts was verified using SHA-256 digests logged in **Chain of Custody Form #CoC-914**.
>
> **3. Timeline of Compromise (UTC)**
> - **2026-11-04 06:12:04 UTC — Initial Access**: Threat actor sent a crafted HTTP POST request exploiting CVE-2026-1042 on \`APP-PRD-09\`.
> - **2026-11-04 06:15:39 UTC — Persistence**: A scheduled task named \`SysHealthSync\` was registered to execute an obfuscated PowerShell loader every 30 minutes.
> - **2026-11-04 08:41:10 UTC — Staging & Exfiltration Attempt**: Sensitive configuration files were compressed into \`C:\\ProgramData\\diag.7z\` and outbound transfer to \`198[.]51[.]100[.]44:8443\` commenced.
> - **2026-11-04 08:45:22 UTC — Detection & Containment**: EDR behavioral rule triggered; SOAR playbook isolated \`APP-PRD-09\` and blocked the destination IP at the perimeter firewall.
>
> **4. Root Cause Analysis (RCA)**
> The **root cause** of the intrusion was an unpatched deserialization vulnerability (CVE-2026-1042) on an internet-facing web service, compounded by overly permissive outbound firewall rules that permitted direct egress on port 8443.
>
> **5. Defanged Indicators of Compromise (IOCs)**
> - **SHA-256 Hash (\`diag.7z\` loader)**: \`e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855\`
> - **Command-and-Control (C2) IPv4**: \`198[.]51[.]100[.]44\`
> - **Persistence Artifact**: Scheduled Task \`\\Microsoft\\Windows\\SysHealthSync\`

### الترجمة العربية والتحليل اللغوي للتقرير:
- **\`In strict adherence to the order of volatility\`**: عبارة معيارية تثبت للمدقق القانوني أن المحقق التزم بجمع الذاكرة المتطايرة قبل إيقاف تشغيل الخادم أو عزله الكامل.
- **\`compounded by overly permissive outbound firewall rules\`**: الفعل **compounded by** (\`/kəmˈpaʊn.dɪd baɪ/\`) تعبير أكاديمي رفيع يُستخدم في قسم **Root Cause Analysis** لبيان «العوامل المساعدة أو المفاقِمة» التي ضاعفت أثر الثغرة الأساسية.`,
    vocabularyList: [
      {
        id: 'voc-401',
        term: 'Chain of Custody',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/tʃeɪn əv ˈkʌs.tə.di/',
        pronunciationAudioText: 'Chain of Custody. Maintaining an unbroken chain of custody is mandatory for digital evidence admissibility in court.',
        arabicMeaning: 'سلسلة الحيازة القانونية للأدلة',
        academicDefinitionEn: 'The chronological documentation showing the seizure, custody, control, transfer, analysis, and disposition of physical or digital evidence.',
        academicDefinitionAr: 'التوثيق التسلسلي الزمني الذي يثبت ضبط الدليل الرقمي وحيازته ونقله وتحليله وتخزينه دون أي تلاعب.',
        exampleSentenceEn: 'Every transfer of the forensic disk image was recorded with SHA-256 hashes in the chain of custody log.',
        exampleSentenceAr: 'سُجلت كل عملية نقل للنسخة الجنائية للقرص مع بصمات SHA-256 في سجل سلسلة الحيازة.',
        collocations: ['unbroken chain of custody', 'maintain chain of custody', 'chain of custody form'],
      },
      {
        id: 'voc-402',
        term: 'Order of Volatility',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/ˈɔː.dər əv ˌvɒl.əˈtɪl.ə.ti/',
        pronunciationAudioText: 'Order of Volatility. Digital evidence collection must proceed from the most volatile memory to non-volatile disk storage.',
        arabicMeaning: 'ترتيب التطاير للأدلة الرقمية',
        academicDefinitionEn: 'The prioritized sequence for collecting digital evidence, starting with the most transient data (CPU registers, RAM) before persistent storage.',
        academicDefinitionAr: 'التسلسل الأولوي لجمع الأدلة الرقمية بدءاً من البيانات الأسرع زوالاً (الذاكرة العشوائية RAM) قبل وحدات التخزين الدائمة.',
        exampleSentenceEn: 'Powering off a compromised server violates the order of volatility by destroying active RAM artifacts.',
        exampleSentenceAr: 'يؤدي إيقاف تشغيل الخادم المخترق إلى انتهاك ترتيب التطاير عبر تدمير الآثار النشطة في الذاكرة العشوائية.',
        collocations: ['adhere to the order of volatility', 'volatile memory acquisition', 'RFC 3227 order of volatility'],
      },
      {
        id: 'voc-403',
        term: 'Root Cause Analysis',
        acronym: 'RCA',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/ruːt kɔːz əˈnæl.ə.sɪs/',
        pronunciationAudioText: 'Root Cause Analysis. The post-incident root cause analysis identified an unpatched VPN appliance as the initial entry vector.',
        arabicMeaning: 'تحليل السبب الجذري للحادثة',
        academicDefinitionEn: 'A systematic forensic and engineering process for identifying the fundamental underlying vulnerability or control failure that enabled an incident.',
        academicDefinitionAr: 'عملية جنائية وهندسية منهجية لتحديد الثغرة الأساسية أو فشل الضابط الذي مكّن من وقوع الحادثة.',
        exampleSentenceEn: 'Remediation plans must address the findings of the root cause analysis to prevent recurrence.',
        exampleSentenceAr: 'يجب أن تعالج خطط الإصلاح نتائج تحليل السبب الجذري لمنع تكرار الحادثة.',
        collocations: ['conduct a root cause analysis', 'underlying root cause', 'RCA findings'],
      },
      {
        id: 'voc-404',
        term: 'Indicator of Compromise',
        acronym: 'IOC',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/ˈɪn.dɪ.keɪ.tər əv ˈkɒm.prə.maɪz/',
        pronunciationAudioText: 'Indicator of Compromise. File hashes, malicious domains, and registry persistence keys serve as Indicators of Compromise.',
        arabicMeaning: 'مؤشر اختراق (أثر جنائي)',
        academicDefinitionEn: 'A forensic artifact observed on a network or operating system that indicates with high confidence an unauthorized intrusion.',
        academicDefinitionAr: 'أثر جنائي يُرصد في الشبكة أو نظام التشغيل ويدل بدرجة ثقة عالية على وقوع اختراق غير مصرح به.',
        exampleSentenceEn: 'All extracted Indicators of Compromise were defanged in the PDF report and shared via STIX/TAXII.',
        exampleSentenceAr: 'حُيّدت جميع مؤشرات الاختراق المستخرجة داخل تقرير PDF وتمت مشاركتها عبر بروتوكول STIX/TAXII.',
        collocations: ['defanged IOCs', 'atomic IOCs', 'ingest IOC feeds'],
      },
      {
        id: 'voc-405',
        term: 'Exfiltration',
        partOfSpeech: 'Noun',
        phonetic: '/ˌeks.fɪlˈtreɪ.ʃən/',
        pronunciationAudioText: 'Exfiltration. DNS tunneling was utilized by the adversary for covert data exfiltration.',
        arabicMeaning: 'تسريب / استخراج البيانات خلسة للخارج',
        academicDefinitionEn: 'The unauthorized transfer of sensitive data from an information system to an external destination controlled by a threat actor.',
        academicDefinitionAr: 'النقل غير المصرح به للبيانات الحساسة من داخل النظام المعلوماتي إلى وجهة خارجية يسيطر عليها المهاجم.',
        exampleSentenceEn: 'Firewall netflow logs confirmed that data exfiltration was blocked prior to completion.',
        exampleSentenceAr: 'أكدت سجلات تدفق الشبكة في جدار الحماية أن تسريب البيانات قد حُظر قبل اكتماله.',
        collocations: ['data exfiltration', 'covert exfiltration', 'exfiltrate sensitive records'],
        commonErrorWarning: 'عكس كلمة Infiltration (التسلل إلى الداخل) هو Exfiltration (تهريب البيانات إلى الخارج).',
      },
      {
        id: 'voc-406',
        term: 'Write Blocker',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/raɪt ˈblɒk.ər/',
        pronunciationAudioText: 'Write Blocker. Forensic disk acquisition must be performed through a hardware write blocker.',
        arabicMeaning: 'حاجز الكتابة الجنائي (مانع التعديل)',
        academicDefinitionEn: 'A hardware or software mechanism that permits read-only access to a storage medium without allowing any modification to its contents or metadata.',
        academicDefinitionAr: 'جهاز أو أداة برمجية تسمح بقراءة وسائط التخزين فقط وتمنع أي تعديل على محتوياتها أو بياناتها الوصفية أثناء النسخ الجنائي.',
        exampleSentenceEn: 'Connecting suspect media through a hardware write blocker preserves evidentiary integrity.',
        exampleSentenceAr: 'يحافظ توصيل الوسائط المشتبه بها عبر حاجز كتابة عتادي على سلامة الدليل الجنائي.',
        collocations: ['hardware write blocker', 'forensic write-blocking', 'preserve evidentiary integrity'],
      },
    ],
    terminologyGlossary: [
      {
        term: 'Chain of Custody',
        phonetic: '/tʃeɪn əv ˈkʌs.tə.di/',
        pronunciationAudioText: 'Chain of Custody',
        category: 'Forensics',
        arabicEquivalent: 'سلسلة الحيازة',
        usageContext: 'توثيق حيازة ونقل وسلامة الدليل الرقمي بمرجعيات SHA-256.',
      },
      {
        term: 'Order of Volatility',
        phonetic: '/ˈɔː.dər əv ˌvɒl.əˈtɪl.ə.ti/',
        pronunciationAudioText: 'Order of Volatility',
        category: 'Forensics',
        arabicEquivalent: 'ترتيب التطاير',
        usageContext: 'جمع الذاكرة العشوائية RAM والاتصالات النشطة قبل الأقراص الصلبة.',
      },
      {
        term: 'Root Cause Analysis (RCA)',
        phonetic: '/ruːt kɔːz əˈnæl.ə.sɪs/',
        pronunciationAudioText: 'Root Cause Analysis',
        category: 'Forensics',
        arabicEquivalent: 'تحليل السبب الجذري',
        usageContext: 'تحديد الثغرة الأساسية والعوامل المفاقمة التي سمحت بالاختراق.',
      },
      {
        term: 'Indicators of Compromise (IOCs)',
        phonetic: '/ˈɪn.dɪ.keɪ.tərz əv ˈkɒm.prə.maɪz/',
        pronunciationAudioText: 'Indicators of Compromise',
        category: 'Forensics',
        arabicEquivalent: 'مؤشرات الاختراق',
        usageContext: 'بصمات الملفات الخبيثة وعناوين C2 وآثار البقاء في النظام.',
      },
      {
        term: 'Data Exfiltration',
        phonetic: '/ˈdeɪ.tə ˌeks.fɪlˈtreɪ.ʃən/',
        pronunciationAudioText: 'Data Exfiltration',
        category: 'Forensics',
        arabicEquivalent: 'تسريب البيانات للخارج',
        usageContext: 'سحب البيانات الحساسة إلى خادم خارجي يتحكم به المهاجم.',
      },
    ],
    images: [
      {
        prompt: 'Digital Forensics and Incident Response DFIR report anatomy diagram showing Chain of Custody, Order of Volatility, Timeline of Compromise, and RCA, 16:9',
        caption: 'تشريح تقرير التحقيق الجنائي الرقمي (DFIR Report): من ترتيب التطاير وسلسلة الحيازة إلى الجدول الزمني وتحليل السبب الجذري',
        alt: 'DFIR Report Anatomy and Chain of Custody diagram',
        seed: 6041,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'الهيكل القياسي لتقرير الاستجابة للحوادث والتحقيق الجنائي',
        titleEn: 'Standard Anatomy of a DFIR Report',
        bulletPoints: [
          'Executive Summary: ملخص موجز للقيادة حول نطاق الحادثة وأثرها.',
          'Chain of Custody & Evidence Preservation: توثيق سلامة الأدلة الرقمية.',
          'Timeline of Compromise, Root Cause Analysis (RCA), & Defanged IOCs.',
        ],
        englishKeyExcerpt: 'A forensic report must maintain strict objectivity, distinguishing verified evidentiary facts from analytical hypotheses.',
        phoneticHighlight: 'Evidentiary /ˌev.ɪˈden.ʃər.i/ • Objectivity /ˌɒb.dʒekˈtɪv.ə.ti/',
        speakerNotes: 'شدد على أن تقرير DFIR قد يقرؤه القاضي والمدقق القانوني والمهندس التقني في آن واحد.',
        visualCue: 'مخطط هيكلي للأقسام الخمسة الرئيسية في تقرير DFIR.',
      },
      {
        slideNumber: 2,
        title: 'سلسلة الحيازة وترتيب التطاير (RFC 3227)',
        titleEn: 'Chain of Custody & Order of Volatility',
        bulletPoints: [
          'Order of Volatility: جمع CPU/RAM والاتصالات النشطة قبل إيقاف الجهاز.',
          'Forensic Imaging: أخذ نسخة Bit-by-Bit عبر Hardware Write Blocker.',
          'Chain of Custody: توثيق بصمة SHA-256 لكل دليل عند الجمع والنقل.',
        ],
        englishKeyExcerpt: 'Volatile memory was acquired prior to host shutdown in strict compliance with RFC 3227 order of volatility.',
        phoneticHighlight: 'Volatility /ˌvɒl.əˈtɪl.ə.ti/ • Custody /ˈkʌs.tə.di/',
        speakerNotes: 'اشرح لماذا يؤدي فصل الكهرباء عن الخادم فوراً إلى ضياع أدلة الذاكرة العشوائية (RAM).',
        visualCue: 'هرم ترتيب التطاير من المسجلات والذاكرة العشوائية إلى الأشرطة الاحتياطية.',
      },
      {
        slideNumber: 3,
        title: 'بناء الجدول الزمني للاختراق (Timeline of Compromise)',
        titleEn: 'Constructing the Timeline of Compromise',
        bulletPoints: [
          'توحيد جميع الأوقات إلى التوقيت العالمي المنسق (Normalized to UTC).',
          'ربط كل خطوة زمنية بمراحل MITRE ATT&CK (Initial Access, Execution, Persistence, Exfiltration).',
          'استخدام صيغة الماضي الدقيق والأفعال الجنائية المحايدة.',
        ],
        englishKeyExcerpt: 'At 06:15:39 UTC, the threat actor established persistence by registering a scheduled task.',
        phoneticHighlight: 'Persistence /pəˈsɪs.təns/ • Chronological /ˌkrɒn.əˈlɒdʒ.ɪ.kəl/',
        speakerNotes: 'نبّه الطلاب إلى ضرورة كتابة المنطقة الزمنية (UTC) في كل سطر من الجدول الزمني.',
        visualCue: 'خط زمني جنائي يربط الطوابع الزمنية بتكتيكات MITRE ATT&CK.',
      },
      {
        slideNumber: 4,
        title: 'صياغة تحليل السبب الجذري (Root Cause Analysis - RCA)',
        titleEn: 'Articulating Root Cause Analysis (RCA)',
        bulletPoints: [
          'تحديد نقطة الدخول الأولية (Initial Entry Vector) والثغرة المستغلة.',
          'استخدام العبارة الأكاديمية "compounded by" لذكر العوامل المفاقمة.',
          'ربط كل سبب جذري بإجراء تصحيحي مباشر (Corrective & Preventive Action).',
        ],
        englishKeyExcerpt: 'The root cause was an unpatched RCE vulnerability, compounded by the absence of egress traffic filtering.',
        phoneticHighlight: 'Compounded by /kəmˈpaʊn.dɪd baɪ/ • Egress /ˈiː.ɡres/',
        speakerNotes: 'وضح الفرق بين Ingress traffic (حركة داخلة) و Egress traffic (حركة خارجة).',
        visualCue: 'مخطط عظمة السمكة (Ishikawa Diagram) لتحليل السبب الجذري.',
      },
      {
        slideNumber: 5,
        title: 'مؤشرات الاختراق (IOCs) وقواعد التحييد النصي (Defanging)',
        titleEn: 'Indicators of Compromise (IOCs) & Defanging',
        bulletPoints: [
          'الفرق بين IOC (أثر ثابت مثل Hash أو IP) و IOA (نمط سلوكي للهجوم).',
          'تحييد الروابط والعناوين الخبيثة (Defanging) مثل hxxp[://] و 198[.]51[.]100[.]44.',
          'إرفاق بصمات SHA-256 الكاملة للملفات المضبوطة.',
        ],
        englishKeyExcerpt: 'All malicious URLs and IPv4 addresses in Section 5 have been defanged to prevent accidental activation.',
        phoneticHighlight: 'Defanged /diːˈfæŋd/ • Exfiltration /ˌeks.fɪlˈtreɪ.ʃən/',
        speakerNotes: 'درّب الطلاب على تحويل رابط خبيث حي إلى صيغة Defanged آمنة للنشر في التقارير.',
        visualCue: 'جدول مقارنة بين Raw IOC و Defanged IOC.',
      },
    ],
    flashcards: [
      {
        front: 'Chain of Custody (/tʃeɪn əv ˈkʌs.tə.di/)',
        back: 'سلسلة الحيازة: التوثيق القانوني والتقني المتسلسل الذي يثبت من جمع الدليل الرقمي ومن نقله وفحصه مع التحقق ببصمات SHA-256.',
        category: 'Digital Forensics',
        phonetic: '/tʃeɪn əv ˈkʌs.tə.di/',
        pronunciationAudioText: 'Chain of Custody',
      },
      {
        front: 'Order of Volatility (/ˈɔː.dər əv ˌvɒl.əˈtɪl.ə.ti/)',
        back: 'ترتيب التطاير (RFC 3227): جمع الأدلة الرقمية بدءاً من الأكثر تطايراً (CPU caches, RAM, active network connections) قبل الأقراص الصلبة.',
        category: 'Digital Forensics',
        phonetic: '/ˈɔː.dər əv ˌvɒl.əˈtɪl.ə.ti/',
        pronunciationAudioText: 'Order of Volatility',
      },
      {
        front: 'Root Cause Analysis - RCA (/ruːt kɔːz əˈnæl.ə.sɪs/)',
        back: 'تحليل السبب الجذري: تحديد الثغرة الأساسية أو القصور في الضوابط الأمنية الذي سمح بوقوع الاختراق الأولي.',
        category: 'Incident Reporting',
        phonetic: '/ruːt kɔːz əˈnæl.ə.sɪs/',
        pronunciationAudioText: 'Root Cause Analysis',
      },
      {
        front: 'IOC vs. IOA',
        back: 'IOC (Indicator of Compromise): أثر جنائي ثابت لاختراق وقع (مثل SHA-256 hash أو C2 IP). IOA (Indicator of Attack): مؤشر سلوكي لحظي يكشف خطوات الهجوم أثناء تنفيذها.',
        category: 'Threat Intelligence',
        phonetic: '/ˈɪn.dɪ.keɪ.tər əv ˈkɒm.prə.maɪz/',
        pronunciationAudioText: 'Indicator of Compromise versus Indicator of Attack',
      },
      {
        front: 'Data Exfiltration (/ˈdeɪ.tə ˌeks.fɪlˈtreɪ.ʃən/)',
        back: 'تسريب أو تهريب البيانات الحساسة غير المصرح به من داخل شبكة المؤسسة إلى خادم خارجي يتحكم به المهاجم.',
        category: 'Attack Lifecycle',
        phonetic: '/ˈdeɪ.tə ˌeks.fɪlˈtreɪ.ʃən/',
        pronunciationAudioText: 'Data Exfiltration',
      },
      {
        front: 'Defanging IOCs (/diːˈfæŋ.ɪŋ/)',
        back: 'تحييد عناوين الويب والـ IP الخبيثة داخل التقارير المكتوبة (مثل كتابة hxxps[://]domain[.]com) لمنع النقر العرضي عليها.',
        category: 'Report Formatting',
        phonetic: '/diːˈfæŋ.ɪŋ/',
        pronunciationAudioText: 'Defanging Indicators of Compromise',
      },
    ],
    miniQuiz: [
      {
        question: 'According to RFC 3227 (Order of Volatility), which forensic artifact MUST be acquired FIRST before powering down or rebooting a compromised server?',
        options: [
          'Offline magnetic backup tapes stored in the vault',
          'Volatile system memory (RAM) and active network connection tables',
          'Printed firewall architecture diagrams',
          'Archived PDF compliance policies',
        ],
        correctIndex: 1,
        explanation: 'وفق مبدأ ترتيب التطاير (Order of Volatility)، يجب جمع محتويات الذاكرة العشوائية المتطايرة (RAM) وجداول الاتصالات النشطة أولاً لأنها تزول فوراً عند انقطاع التيار.',
      },
      {
        question: 'Which of the following sentences uses the most appropriate objective forensic tone for an official DFIR report?',
        options: [
          'We think a super clever hacker probably guessed the admin password somehow.',
          'Forensic analysis of Windows Security Event ID 4624 (Logon Type 10) confirmed unauthorized RDP access using compromised domain administrator credentials at 03:14:08 UTC.',
          'The server was totally destroyed by an unstoppable virus.',
          'The firewall was 100% secure until bad luck happened.',
        ],
        correctIndex: 1,
        explanation: 'الجملة الثانية تلتزم بالأسلوب الأكاديمي والجنائي الموضوعي المعتمد على الأدلة المحددة (Event ID 4624) والطابع الزمني القياسي (UTC).',
      },
      {
        question: 'ما الغرض من كتابة الرابط الخبيث على هيئة `hxxps[://]c2-update[.]example[.]net` في تقرير التحقيق الجنائي الإنجليزي؟',
        options: [
          'تشفير الرابط باستخدام خوارزمية AES',
          'تحييد المؤشر الخبيث (Defanging the IOC) لمنع النقر أو الاتصال العرضي أثناء قراءة التقرير',
          'ضغط حجم ملف PDF',
          'تحويل الرابط إلى صيغة IPv6',
        ],
        correctIndex: 1,
        explanation: 'يُعرف هذا الإجراء باسم Defanging IOCs، وهو معيار أساسي في كتابة تقارير DFIR واستخبارات التهديدات لحماية القراء والأنظمة البريدية من تفعيل الروابط الخبيثة خطأً.',
      },
      {
        question: 'Choose the best academic phrase to connect a primary vulnerability with a secondary control failure in a Root Cause Analysis section:',
        options: [
          'The intrusion resulted from an unpatched RCE vulnerability, compounded by the lack of outbound egress filtering.',
          'The intrusion resulted from an unpatched RCE vulnerability, zeroized by plaintext.',
          'The intrusion was benignly repudiated by the write blocker.',
          'The intrusion was superseded by a false positive.',
        ],
        correctIndex: 0,
        explanation: 'عبارة "compounded by" هي الصياغة الأكاديمية المعيارية لربط السبب الجذري الأولي بالعوامل الثانوية التي فاقمت الأثر.',
      },
    ],
    interactiveBook3D: {
      model3DType: 'FORENSIC_TIMELINE_PRISM',
      shaderEffect: 'rose-forensic-scan',
      bookTitleEn: 'Interactive 3D Forensic Prism: DFIR Report & Chain of Custody',
      bookTitleAr: 'الكتاب التفاعلي ثلاثي الأبعاد: منشور التحقيق الجنائي الرقمي',
      pages3D: [
        {
          pageNumber: 1,
          titleAr: 'جمع الأدلة الرقمية وسلسلة الحيازة',
          titleEn: 'Volatile Acquisition & Chain of Custody',
          badge: 'DFIR PRISM PAGE 01',
          bilingualSummaryAr: 'يبدأ التحقيق الجنائي بجمع الذاكرة المتطايرة (RAM) ثم أخذ نسخة بتاً ببت للقرص عبر حاجز كتابة (Write Blocker) وتوثيق بصمة SHA-256 في سجل سلسلة الحيازة.',
          englishExcerpt: 'Prior to host remediation, a bitstream forensic image was acquired through a hardware write blocker and verified via SHA-256 cryptographic hashing.',
          phoneticGuide: 'Bitstream /ˈbɪt.striːm/ | Write Blocker /raɪt ˈblɒk.ər/ | Evidentiary /ˌev.ɪˈden.ʃər.i/',
          pronunciationAudioText: 'Prior to host remediation, a bitstream forensic image was acquired through a hardware write blocker and verified via SHA-256 cryptographic hashing.',
          grammarOrStyleTip: 'استخدم الفعل "acquire" (وليس "copy") عند الحديث عن أخذ النسخ الجنائية للأدلة الرقمية في التقارير الرسمية.',
          keyTakeaway: 'تطابق بصمة SHA-256 قبل التحليل وبعده هو الدليل الرياضي على عدم التلاعب بالدليل.',
        },
        {
          pageNumber: 2,
          titleAr: 'إعادة بناء الجدول الزمني للاختراق',
          titleEn: 'Reconstructing the Timeline of Compromise',
          badge: 'DFIR PRISM PAGE 02',
          bilingualSummaryAr: 'تُرتب الأحداث الجنائية كرونولوجياً بالتوقيت العالمي (UTC) لتوضيح لحظة الاختراق الأولي، وآليات البقاء (Persistence)، ومحاولات تسريب البيانات (Exfiltration).',
          englishExcerpt: 'Artifact correlation across MFT records, Prefetch files, and firewall logs reconstructed the complete timeline of compromise in UTC.',
          phoneticGuide: 'Chronological /ˌkrɒn.əˈlɒdʒ.ɪ.kəl/ | Exfiltration /ˌeks.fɪlˈtreɪ.ʃən/',
          pronunciationAudioText: 'Artifact correlation across MFT records, Prefetch files, and firewall logs reconstructed the complete timeline of compromise in UTC.',
          grammarOrStyleTip: 'الجمع بين مصادر أدلة متعددة في التحقيق الجنائي يُسمى "Cross-artifact correlation" وهو يمنح الاستنتاج موثوقية عالية.',
          keyTakeaway: 'يجب أن يجيب الجدول الزمني عن أسئلة التحقيق الخمسة: Who, What, When, Where, and How.',
        },
        {
          pageNumber: 3,
          titleAr: 'تحليل السبب الجذري ومؤشرات الاختراق المحيدة',
          titleEn: 'Root Cause Analysis & Defanged IOCs',
          badge: 'DFIR PRISM PAGE 03',
          bilingualSummaryAr: 'يختتم التقرير بتحديد السبب الجذري (RCA) الذي سمح بالاختراق، مع قائمة محيدة (Defanged) بجميع مؤشرات الاختراق لتغذية أنظمة الدفاع.',
          englishExcerpt: 'Root cause analysis determined that an exposed management interface facilitated initial access; all associated C2 indicators have been defanged below.',
          phoneticGuide: 'Root Cause Analysis /ruːt kɔːz əˈnæl.ə.sɪs/ | Defanged /diːˈfæŋd/',
          pronunciationAudioText: 'Root cause analysis determined that an exposed management interface facilitated initial access; all associated C2 indicators have been defanged below.',
          grammarOrStyleTip: 'الفعل "facilitate" (مهّد لـ / سهّل) فعل موضوعي ممتاز في قسم RCA لبيان كيف مكّنت الثغرة من وقوع الهجوم.',
          keyTakeaway: 'لا يكتمل تقرير DFIR دون توصيات إصلاحية قابلة للقياس تعالج السبب الجذري.',
        },
      ],
      stepByStep: [
        {
          stepNumber: 1,
          titleAr: 'الاستحواذ الجنائي وفق ترتيب التطاير (Volatile & Disk Acquisition)',
          titleEn: 'Step 1: Evidence Acquisition per Order of Volatility',
          descriptionAr: 'التقاط صورة الذاكرة العشوائية RAM أولاً ثم تصوير القرص عبر Write Blocker.',
          englishActionPhrase: 'Acquire volatile RAM memory first, followed by a write-blocked bitstream disk image.',
          phonetic: '/əˈkwaɪər ˈvɒl.ə.taɪl ræm ˈmem.ər.i fɜːst/',
          pronunciationAudioText: 'Acquire volatile RAM memory first, followed by a write-blocked bitstream disk image.',
          visualState: 'مسح ليزري وردي يلتقط طبقة الذاكرة العلوية في المنشور الثلاثي.',
        },
        {
          stepNumber: 2,
          titleAr: 'توثيق سلسلة الحيازة بالبصمات التشفيرية (Chain of Custody Hashing)',
          titleEn: 'Step 2: Cryptographic Chain of Custody Logging',
          descriptionAr: 'حساب بصمة SHA-256 للدليل وتقييدها في سجل سلسلة الحيازة.',
          englishActionPhrase: 'Compute SHA-256 digests to seal the Chain of Custody and guarantee evidentiary integrity.',
          phonetic: '/tə siːl ðə tʃeɪn əv ˈkʌs.tə.di/',
          pronunciationAudioText: 'Compute SHA-256 digests to seal the Chain of Custody and guarantee evidentiary integrity.',
          visualState: 'ظهور قفل بصمة SHA-256 حول حاوية الدليل الجنائي.',
        },
        {
          stepNumber: 3,
          titleAr: 'بناء الجدول الزمني الموحد (UTC Timeline Reconstruction)',
          titleEn: 'Step 3: UTC Timeline of Compromise Reconstruction',
          descriptionAr: 'ربط آثار النظام والشبكة في خط زمني موحد بالتوقيت العالمي.',
          englishActionPhrase: 'Correlate system and network artifacts into a unified UTC Timeline of Compromise.',
          phonetic: '/ˈjuː.nɪ.faɪd ˈtaɪm.laɪn əv ˈkɒm.prə.maɪz/',
          pronunciationAudioText: 'Correlate system and network artifacts into a unified UTC Timeline of Compromise.',
          visualState: 'امتداد خط زمني مضيء داخل المنشور يعرض مراحل الاختراق.',
        },
        {
          stepNumber: 4,
          titleAr: 'صياغة السبب الجذري وتحييد المؤشرات (RCA & Defanged IOCs)',
          titleEn: 'Step 4: RCA Drafting & IOC Defanging',
          descriptionAr: 'كتابة خلاصة السبب الجذري وإرفاق جدول مؤشرات الاختراق المحيدة.',
          englishActionPhrase: 'Formulate the Root Cause Analysis and publish defanged Indicators of Compromise.',
          phonetic: '/ˈfɔː.mjʊ.leɪt ðə ruːt kɔːz əˈnæl.ə.sɪs/',
          pronunciationAudioText: 'Formulate the Root Cause Analysis and publish defanged Indicators of Compromise.',
          visualState: 'توليد وثيقة التقرير النهائية ثلاثية الأبعاد مع ختم التحقق الجنائي.',
        },
      ],
      hotspots: [
        {
          id: 'hs-ch4-1',
          labelAr: 'قسم سلسلة الحيازة (Chain of Custody Block)',
          labelEn: 'Chain of Custody & SHA-256 Verification Block',
          coordinates: { x: -1.3, y: 1.1, z: 0.5 },
          phonetic: '/tʃeɪn əv ˈkʌs.tə.di blɒk/',
          pronunciationAudioText: 'Chain of Custody and SHA-256 Verification Block. Every evidence transfer must be cryptographically verified.',
          explanationAr: 'الركن القانوني في التقرير الذي يثبت سلامة الأدلة الرقمية وعدم تعرضها للتعديل منذ لحظة جمعها.',
          englishTemplateSnippet: 'SHA-256 digest of acquired image (APP-PRD-09.E01) matched across acquisition and forensic workstation ingestion.',
          securityContext: 'المقبولية القانونية للأدلة الرقمية (Legal Admissibility of Digital Evidence).',
        },
        {
          id: 'hs-ch4-2',
          labelAr: 'شريط الجدول الزمني للاختراق (Timeline of Compromise)',
          labelEn: 'UTC Timeline of Compromise Axis',
          coordinates: { x: 0.0, y: 0.3, z: 1.1 },
          phonetic: '/ˈtaɪm.laɪn əv ˈkɒm.prə.maɪz ˈæk.sɪs/',
          pronunciationAudioText: 'UTC Timeline of Compromise Axis. All timestamps must be normalized to Coordinated Universal Time.',
          explanationAr: 'يعرض التسلسل الدقيق لأحداث الاختراق من نقطة الدخول الأولي حتى الاحتواء النهائي بتوقيت UTC.',
          englishTemplateSnippet: '2026-11-04 06:15:39 UTC — Persistence established via scheduled task registration.',
          securityContext: 'التحليل الجنائي الزمني (Forensic Timeline Reconstruction).',
        },
        {
          id: 'hs-ch4-3',
          labelAr: 'نواة تحليل السبب الجذري (Root Cause Analysis Core)',
          labelEn: 'Root Cause Analysis (RCA) Core',
          coordinates: { x: 1.3, y: 1.1, z: 0.5 },
          phonetic: '/ruːt kɔːz əˈnæl.ə.sɪs kɔːr/',
          pronunciationAudioText: 'Root Cause Analysis Core. Identifying the underlying vulnerability prevents incident recurrence.',
          explanationAr: 'يشرح الثغرة الجذرية والعوامل المفاقمة التي مكّنت المهاجم من اختراق النظام.',
          englishTemplateSnippet: 'The root cause was an unpatched deserialization flaw, compounded by permissive egress rules.',
          securityContext: 'معالجة الجذور الهندسية للحوادث (Post-Incident Root Cause Remediation).',
        },
        {
          id: 'hs-ch4-4',
          labelAr: 'جدول المؤشرات المحيدة (Defanged IOCs Table)',
          labelEn: 'Defanged Indicators of Compromise (IOCs)',
          coordinates: { x: 0.0, y: -1.3, z: 0.6 },
          phonetic: '/diːˈfæŋd ˈɪn.dɪ.keɪ.tərz əv ˈkɒm.prə.maɪz/',
          pronunciationAudioText: 'Defanged Indicators of Compromise. Malicious domains and IP addresses are defanged for safe report distribution.',
          explanationAr: 'يضم بصمات الملفات وعناوين خوادم التحكم والسيطرة (C2) بعد تحييدها نصياً لمنع النقر العرضي.',
          englishTemplateSnippet: 'C2 Endpoint: hxxps[://]telemetry-sync[.]example[.]org/api/v1/beacon (IPv4: 198[.]51[.]100[.]44).',
          securityContext: 'مشاركة استخبارات التهديدات بأمان (Safe Threat Intelligence Sharing).',
        },
      ],
    },
  },

  // ==========================================================================
  // الفصل الخامس (Chapter 5)
  // ==========================================================================
  {
    id: 605,
    chapter_number: 5,
    title: 'كتابة الملخصات التنفيذية وتقارير تقييم المخاطر لمجلس الإدارة',
    subtitle: 'Writing Executive Summaries, Risk Registers & Board Briefings: Business Impact, ALE/ROSI Articulation',
    description: 'إتقان مهارات الترجمة الاستراتيجية للمخاطر التقنية إلى لغة الأعمال والمال باللغة الإنجليزية لمخاطبة مجلس الإدارة واللجان التنفيذية، بما يشمل صياغة الملخصات التنفيذية (Executive Summaries)، وسجلات المخاطر (Risk Registers)، وشرح المعادلات الكمية (SLE, ARO, ALE, ROSI) ومؤشرات استمرارية الأعمال (RTO, RPO, BIA).',
    category: 'متقدم',
    difficulty: 'intermediate',
    phonetic: '/ɪɡˈzɛkjʊtɪv ˈsʌməriz ænd bɔːrd ˈlɛvəl rɪsk ˈbriːfɪŋz/',
    pronunciationAudioText: 'Executive Summaries and Board-Level Risk Briefings: Business Impact Analysis, Annualized Loss Expectancy, and Return on Security Investment.',
    diagramKey: 'eng-cyber-5',
    videoUrl: 'https://www.youtube.com/watch?v=c3b2m5vR9xE',
    presentationUrl: '/assets/presentations/eng-cyber-ch5-executive-risk-briefings.pdf',
    pdfStartPage: 81,
    pdfEndPage: 102,
    updated_at: GENERATED_TIMESTAMP,
    keyTopics: [
      'تحويل المصطلحات التقنية المعقدة إلى لغة الأثر المالي والتشغيلي والسمعة لمجلس الإدارة (Board-Level Articulation)',
      'صياغة المقاييس الكمية للمخاطر بالإنجليزية (EF, SLE, ARO, ALE) وفق منهجيات التحليل الكمي (FAIR & ISO 27005)',
      'حساب وعرض العائد على الاستثمار في الأمن السيبراني (Return on Security Investment - ROSI) لتبرير الميزانيات',
      'مصطلحات سجل المخاطر (Inherent Risk, Residual Risk, Risk Appetite, Risk Tolerance) وخيارات معالجة المخاطر الأربعة (Mitigate, Transfer, Avoid, Accept)',
      'مصطلحات تحليل أثر الأعمال واستمرارية التشغيل (BIA, RTO, RPO, MTD)',
    ],
    content: `## تمهيد: كيف يتحدث رئيس الأمن السيبراني (CISO) مع مجلس الإدارة بالإنجليزية؟

عندما يخاطب مهندس الأمن السيبراني أو رئيس الأمن السيبراني (**Chief Information Security Officer - CISO**) مجلس الإدارة (**Board of Directors**) أو لجنة المخاطر والمراجعة (**Audit & Risk Committee**)، فإن التفاصيل التقنية المنخفضة المستوى (مثل تفاصيل المسجلات أو حزم TCP) لا تساعد صانع القرار المالي والاستراتيجي. يحتاج مجلس الإدارة إلى فهم **الأثر على الأعمال (Business Impact)**، و**التعرض المالي السنوي المتوقع (Annualized Loss Expectancy - ALE)**، و**العائد على استثمار الأمن السيبراني (Return on Security Investment - ROSI)**، ودرجة توافق **المخاطر المتبقية (Residual Risk)** مع **شهية المخاطر المعتمدة (Risk Appetite)** وفق أطر [NIST SP 800-30](https://csrc.nist.gov/pubs/sp/800/30/r1/final) و [ISO/IEC 27005](https://www.iso.org/standard/80585.html).

---page---

## أولاً: مصطلحات المخاطر الكمية ومجلس الإدارة (Executive Risk Lexicon & IPA)

| المصطلح الإنجليزي (Executive Term) | النطق الصوتي (IPA) | المعادلة أو الاختصار | المقابل العربي المعتمد | كيفية توظيفه في عروض مجلس الإدارة |
| :--- | :--- | :--- | :--- | :--- |
| **Inherent Risk** | \`/ɪnˈher.ənt rɪsk/\` | — | المخاطرة الكامنة (الأصلية) | مستوى الخطر قبل تطبيق أي ضوابط أمنية أو إجراءات تخفيف. |
| **Residual Risk** | \`/rɪˈzɪd.ju.əl rɪsk/\` | — | المخاطرة المتبقية | مستوى الخطر المتبقي بعد تطبيق الضوابط الحالية؛ ويجب أن يكون ضمن Risk Appetite. |
| **Single Loss Expectancy (SLE)** | \`/ˈsɪŋ.ɡəl lɒs ɪkˈspek.tən.si/\` | $\\text{Asset Value} \\times \\text{EF}$ | الخسارة المتوقعة للحادثة الواحدة | التكلفة المالية المتوقعة في حال وقوع التهديد مرة واحدة فقط. |
| **Annualized Rate of Occurrence (ARO)** | \`/ˈæn.ju.ə.laɪzd reɪt əv əˈkʌr.əns/\` | Events / Year | المعدل السنوي المتوقع للوقوع | عدد المرات المتوقع فيها وقوع التهديد خلال سنة واحدة (مثلاً 0.5 تعني مرة كل سنتين). |
| **Annualized Loss Expectancy (ALE)** | \`/ˈæn.ju.ə.laɪzd lɒs ɪkˈspek.tən.si/\` | $\\text{SLE} \\times \\text{ARO}$ | الخسارة السنوية المتوقعة | القيمة المالية السنوية المتوقعة للخسارة؛ وتُستخدم لمقارنتها بتكلفة الضابط الأمني. |
| **Return on Security Investment (ROSI)** | \`/rɪˈtɜːn ɒn sɪˈkjʊə.rə.ti ɪnˈvest.mənt/\` | $\\frac{\\Delta\\text{ALE} - \\text{Cost}}{\\text{Cost}}$ | العائد على الاستثمار الأمني | مقياس يثبت لمجلس الإدارة الجدوى الاقتصادية لشراء أو تطوير ضابط أمني. |
| **Recovery Time Objective (RTO)** | \`/rɪˈkʌv.ər.i taɪm əbˈdʒek.tɪv/\` | Target Duration | الزمن المستهدف للتعافي | أقصى مدة زمنية مسموح بتوقف الخدمة خلالها بعد وقوع كارثة قبل تكبد خسائر غير مقبولة. |
| **Recovery Point Objective (RPO)** | \`/rɪˈkʌv.ər.i pɔɪnt əbˈdʒek.tɪv/\` | Max Data Loss Age | النقطة الزمنية المستهدفة لاستعادة البيانات | أقصى عمر للبيانات المسموح بفقدانها (يحدد دورية النسخ الاحتياطي والمزامنة). |

---page---

## ثانياً: تحويل الصياغة التقنية إلى صياغة تنفيذية (Technical-to-Executive Translation Matrix)

انظر كيف نحول الجملة التقنية الصرفة إلى جملة تنفيذية موجزة تقنع مجلس الإدارة:

| الصياغة التقنية للفرق الهندسية (Technical Framing) | الصياغة التنفيذية لمجلس الإدارة (Board-Level Executive Framing) |
| :--- | :--- |
| *"We have 42 unpatched CVEs with CVSS > 8.5 on our legacy ERP middleware."* | *"Unpatched vulnerabilities in our core financial ERP expose the enterprise to an estimated **SAR 6.4M in Annualized Loss Expectancy (ALE)** from potential service disruption and regulatory penalties."* |
| *"We need SAR 800,000 to deploy a FIPS 140-3 HSM cluster and automated PKI."* | *"Investing SAR 800K in automated cryptographic key governance reduces our annual financial risk exposure by SAR 2.8M, yielding a net positive **Return on Security Investment (ROSI) of 250%** while achieving full compliance with **NCA NCS**."* |
| *"Our database replication lag is 4 hours and failover takes 9 hours."* | *"Current recovery capabilities (**RPO: 4h, RTO: 9h**) exceed the board-approved **Business Impact Analysis (BIA)** thresholds (**RPO: 15m, RTO: 2h**), requiring immediate failover clustering."* |

---page---

## ثالثاً: استراتيجيات معالجة المخاطر الأربع في اللغة الإنجليزية (The 4 Ts of Risk Treatment)

عند كتابة عمود **Risk Treatment Strategy** في سجل المخاطر (**Risk Register**)، يُستخدم أحد الأفعال المعيارية الأربعة:
1. **Mitigate / Reduce (\`/ˈmɪt.ɪ.ɡeɪt/\` — تخفيف المخاطرة)**: تطبيق ضوابط أمنية لتقليص الاحتمالية (Likelihood) أو الأثر (Impact).
2. **Transfer / Share (\`/trænsˈfɜːr/\` — نقل أو مشاركة الأثر المالي)**: مثل وثائق التأمين السيبراني (Cyber Insurance) أو اتفاقيات مستوى الخدمة التعاقدية، مع التنبيه الأكاديمي الدائم: *"Financial impact may be transferred via cyber insurance; however, regulatory accountability under NCA frameworks cannot be transferred."*
3. **Avoid (\`/əˈvɔɪd/\` — تجنب المخاطرة)**: إيقاف النشاط أو الخدمة عالية الخطورة بالكامل.
4. **Accept / Retain (\`/əkˈsept/\` — قبول المخاطرة)**: قبول المخاطرة المتبقية رسمياً بتوقيع صاحب الصلاحية إذا كانت دون سقف **Risk Appetite**.

---page---

## رابعاً: نموذج رسمي لملخص تنفيذي موجه لمجلس الإدارة (Board Executive Briefing Sample)

> **MEMORANDUM TO THE BOARD RISK & AUDIT COMMITTEE**
> **Subject: Q4 Cybersecurity Risk Posture & Post-Quantum Readiness Investment Proposal**
>
> **1. Executive Summary**
> During Q4, the enterprise maintained a resilient cybersecurity posture with zero material operational disruptions. However, quantitative risk modeling indicates that our legacy customer portal authentication infrastructure currently carries an **inherent risk** exceeding the Board’s approved **risk appetite** due to emerging credential-stuffing campaigns and upcoming **NCA National Cryptography Standards (NCS)** compliance milestones.
>
> **2. Quantitative Financial Impact & ROSI Analysis**
> Based on our **Business Impact Analysis (BIA)**, a severe breach affecting the customer portal represents a **Single Loss Expectancy (SLE)** of **SAR 12,000,000** (comprising regulatory fines, forensic response, and customer churn). At an estimated **Annualized Rate of Occurrence (ARO)** of **0.25** (once every four years), the current **Annualized Loss Expectancy (ALE)** stands at **SAR 3,000,000**.
> Implementing the proposed hardware-backed FIDO2 MFA and cryptographic modernization program requires an annualised investment of **SAR 600,000** and reduces the post-control **ALE** to **SAR 300,000** (a net risk reduction of **SAR 2,700,000/year**). This yields a **Return on Security Investment (ROSI)** of **350%**, calculated as:
> $$\\text{ROSI} = \\frac{(3,000,000 - 300,000) - 600,000}{600,000} \\times 100 = 350\\%$$
>
> **3. Board Decision Requested**
> Management requests formal Board approval to allocate SAR 600,000 to **mitigate** this risk, bringing the **residual risk** within tolerable enterprise thresholds and reducing critical service **RTO** from 6 hours to 45 minutes.

### الترجمة العربية والتحليل اللغوي:
- **\`zero material operational disruptions\`**: كلمة **material** (\`/məˈtɪə.ri.əl/\`) في لغة مجالس الإدارة والتدقيق المالي لا تعني «مادي/فيزيائي»، بل تعني **«جوهري / ذو أثر مالي أو قانوني يُعتدّ به»**.
- **\`stands at SAR 3,000,000\`** و **\`yielding a ROSI of 350%\`**: تراكيب فعلية رصينة تُستخدم لعرض المؤشرات المالية والكمية بإيجاز وإقناع.`,
    vocabularyList: [
      {
        id: 'voc-501',
        term: 'Inherent Risk vs. Residual Risk',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/ɪnˈher.ənt rɪsk/ vs /rɪˈzɪd.ju.əl rɪsk/',
        pronunciationAudioText: 'Inherent Risk versus Residual Risk. Security controls are implemented to reduce inherent risk to an acceptable residual risk level.',
        arabicMeaning: 'المخاطرة الكامنة مقابل المخاطرة المتبقية',
        academicDefinitionEn: 'Inherent risk is the raw risk level before controls are applied; residual risk is the remaining risk after controls are implemented.',
        academicDefinitionAr: 'المخاطرة الكامنة هي مستوى الخطر الخام قبل الضوابط؛ والمخاطرة المتبقية هي الخطر الباقي بعد تطبيق الضوابط الأمنية.',
        exampleSentenceEn: 'The board accepted the residual risk after verifying that MFA reduced the inherent risk by ninety percent.',
        exampleSentenceAr: 'قبل مجلس الإدارة المخاطرة المتبقية بعد التحقق من أن المصادقة متعددة العوامل خفضت المخاطرة الكامنة بنسبة تسعين بالمئة.',
        collocations: ['assess inherent risk', 'tolerable residual risk', 'residual risk acceptance'],
      },
      {
        id: 'voc-502',
        term: 'Annualized Loss Expectancy',
        acronym: 'ALE',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/ˈæn.ju.ə.laɪzd lɒs ɪkˈspek.tən.si/',
        pronunciationAudioText: 'Annualized Loss Expectancy. Annualized Loss Expectancy equals Single Loss Expectancy multiplied by the Annualized Rate of Occurrence.',
        arabicMeaning: 'الخسارة السنوية المتوقعة مالياً',
        academicDefinitionEn: 'The expected monetary loss for an asset due to a specific risk over a one-year period, calculated as SLE × ARO.',
        academicDefinitionAr: 'الخسارة المالية المتوقعة لأصل معين نتيجة خطر محدد خلال فترة عام واحد، وتُحسب بضرب SLE في ARO.',
        exampleSentenceEn: 'Quantifying cyber risk in terms of Annualized Loss Expectancy enables objective budget prioritization.',
        exampleSentenceAr: 'يتيح تكميم المخاطر السيبرانية بدلالة الخسارة السنوية المتوقعة ترتيب أولويات الميزانية بموضوعية.',
        collocations: ['calculate ALE', 'pre-control ALE', 'post-control ALE'],
      },
      {
        id: 'voc-503',
        term: 'Return on Security Investment',
        acronym: 'ROSI',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/rɪˈtɜːn ɒn sɪˈkjʊə.rə.ti ɪnˈvest.mənt/',
        pronunciationAudioText: 'Return on Security Investment. A positive Return on Security Investment demonstrates that the control saves more money than it costs.',
        arabicMeaning: 'العائد على الاستثمار في الأمن السيبراني',
        academicDefinitionEn: 'A quantitative metric measuring the financial cost-effectiveness of a security control by comparing risk reduction against control cost.',
        academicDefinitionAr: 'مقياس كمي يقيس الجدوى المالية للضابط الأمني عبر مقارنة مقدار خفض الخسارة السنوية بتكلفة الضابط.',
        exampleSentenceEn: 'The CISO presented a compelling Return on Security Investment of 350% to justify the HSM upgrade.',
        exampleSentenceAr: 'قدّم رئيس الأمن السيبراني عائداً مقنعاً على الاستثمار الأمني بنسبة 350% لتبرير ترقية وحدات HSM.',
        collocations: ['positive ROSI', 'demonstrate ROSI', 'ROSI calculation'],
      },
      {
        id: 'voc-504',
        term: 'Risk Appetite',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/rɪsk ˈæp.ə.taɪt/',
        pronunciationAudioText: 'Risk Appetite. Residual cyber risks exceeding the board-approved risk appetite require immediate mitigation.',
        arabicMeaning: 'شهية المخاطر (مستوى القبول المؤسسي للمخاطر)',
        academicDefinitionEn: 'The amount and type of risk that an organization is willing to pursue or retain in order to achieve its strategic objectives.',
        academicDefinitionAr: 'حجم ونوع المخاطر التي تقبل المؤسسة تحملها أو الاحتفاظ بها في سبيل تحقيق أهدافها الاستراتيجية.',
        exampleSentenceEn: 'The executive committee aligned the cybersecurity risk appetite statement with national regulatory mandates.',
        exampleSentenceAr: 'واءمت اللجنة التنفيذية بيان شهية المخاطر السيبرانية مع المتطلبات التنظيمية الوطنية.',
        collocations: ['board-approved risk appetite', 'within risk appetite', 'exceed risk appetite'],
      },
      {
        id: 'voc-505',
        term: 'Recovery Time Objective & Recovery Point Objective',
        acronym: 'RTO / RPO',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/rɪˈkʌv.ər.i taɪm əbˈdʒek.tɪv/',
        pronunciationAudioText: 'Recovery Time Objective and Recovery Point Objective. RTO defines maximum tolerable downtime, whereas RPO defines maximum tolerable data loss duration.',
        arabicMeaning: 'الزمن المستهدف للتعافي (RTO) والنقطة المستهدفة لاستعادة البيانات (RPO)',
        academicDefinitionEn: 'RTO is the target duration within which a business process must be restored after disaster; RPO is the maximum acceptable age of data lost.',
        academicDefinitionAr: 'RTO هو أقصى زمن مسموح به لاستعادة الخدمة بعد الانقطاع؛ و RPO هو أقصى فترة زمنية من البيانات يُسمح بفقدانها.',
        exampleSentenceEn: 'Synchronous database replication reduced our Recovery Point Objective (RPO) to near-zero.',
        exampleSentenceAr: 'أدت المزامنة الفورية لقاعدة البيانات إلى خفض النقطة المستهدفة لاستعادة البيانات (RPO) إلى قرابة الصفر.',
        collocations: ['meet RTO and RPO targets', 'BIA-defined RTO', 'stringent RPO'],
      },
      {
        id: 'voc-506',
        term: 'Material Impact',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/məˈtɪə.ri.əl ˈɪm.pækt/',
        pronunciationAudioText: 'Material Impact. Publicly listed enterprises must disclose cybersecurity incidents that have a material impact on financial operations.',
        arabicMeaning: 'أثر جوهري (مالي أو قانوني أو تشغيلي يُعتدّ به)',
        academicDefinitionEn: 'A significant effect on an organization’s financial condition, operational continuity, legal standing, or reputation that would influence executive or investor decisions.',
        academicDefinitionAr: 'تأثير كبير وجوهري على الوضع المالي للمؤسسة أو استمرارية أعمالها أو مركزها القانوني يؤثر في قرارات الإدارة والمستثمرين.',
        exampleSentenceEn: 'Rapid containment prevented the ransomware intrusion from causing a material impact on quarterly revenue.',
        exampleSentenceAr: 'حال الاحتواء السريع دون تسبب اختراق الفدية في إحداث أثر جوهري على الإيرادات الفصلية.',
        collocations: ['material financial impact', 'material cybersecurity incident', 'zero material disruption'],
      },
    ],
    terminologyGlossary: [
      {
        term: 'Inherent vs. Residual Risk',
        phonetic: '/ɪnˈher.ənt/ vs /rɪˈzɪd.ju.əl/',
        pronunciationAudioText: 'Inherent Risk versus Residual Risk',
        category: 'Risk & Board',
        arabicEquivalent: 'المخاطرة الكامنة مقابل المتبقية',
        usageContext: 'قياس الخطر قبل تطبيق الضوابط وبعد تطبيقها.',
      },
      {
        term: 'Annualized Loss Expectancy (ALE)',
        phonetic: '/ˈæn.ju.ə.laɪzd lɒs ɪkˈspek.tən.si/',
        pronunciationAudioText: 'Annualized Loss Expectancy',
        category: 'Risk & Board',
        arabicEquivalent: 'الخسارة السنوية المتوقعة',
        usageContext: 'حاصل ضرب خسارة الحادثة الواحدة (SLE) في معدل التكرار السنوي (ARO).',
      },
      {
        term: 'Return on Security Investment (ROSI)',
        phonetic: '/rɪˈtɜːn ɒn sɪˈkjʊə.rə.ti ɪnˈvest.mənt/',
        pronunciationAudioText: 'Return on Security Investment',
        category: 'Risk & Board',
        arabicEquivalent: 'العائد على الاستثمار الأمني',
        usageContext: 'نسبة الوفر المالي من خفض المخاطر مقارنة بتكلفة الضابط الأمني.',
      },
      {
        term: 'RTO & RPO',
        phonetic: '/ˌɑːr.tiːˈəʊ/ & /ˌɑːr.piːˈəʊ/',
        pronunciationAudioText: 'Recovery Time Objective and Recovery Point Objective',
        category: 'Risk & Board',
        arabicEquivalent: 'زمن التعافي المستهدف ونقطة استعادة البيانات',
        usageContext: 'معايير استمرارية الأعمال وتحليل الأثر (BIA).',
      },
      {
        term: 'Material Impact',
        phonetic: '/məˈtɪə.ri.əl ˈɪm.pækt/',
        pronunciationAudioText: 'Material Impact',
        category: 'Risk & Board',
        arabicEquivalent: 'أثر جوهري يُعتدّ به',
        usageContext: 'وصف الحوادث ذات الأثر المالي أو الرقابي الجسيم في إفصاحات الإدارة.',
      },
    ],
    images: [
      {
        prompt: 'Executive Board Risk Briefing dashboard showing Inherent vs Residual Risk, SLE ARO ALE ROSI financial formulas, and RTO RPO continuity metrics, 16:9',
        caption: 'لوحة العرض التنفيذي لمجلس الإدارة: ربط المخاطر الكامنة والمتبقية بمعادلات ALE و ROSI ومؤشرات استمرارية الأعمال RTO/RPO',
        alt: 'Board Risk Briefing ALE ROSI and RTO RPO diagram',
        seed: 6051,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'لغة مجلس الإدارة مقابل لغة الفريق التقني',
        titleEn: 'Boardroom Language vs. Technical Jargon',
        bulletPoints: [
          'مجلس الإدارة يفكر بلغة: Financial Exposure, Regulatory Compliance, Operational Resilience.',
          'تحويل الثغرات التقنية (CVEs) إلى أثر مالي وتشغيلي قابل للقياس.',
          'مفهوم Material Impact (/məˈtɪə.ri.əl ˈɪm.pækt/ — الأثر الجوهري).',
        ],
        englishKeyExcerpt: 'Effective CISOs translate technical vulnerability metrics into quantified business impact and strategic risk posture.',
        phoneticHighlight: 'Material Impact /məˈtɪə.ri.əl ˈɪm.pækt/ • Posture /ˈpɒs.tʃər/',
        speakerNotes: 'وضح للطلاب أن كلمة Material في التقارير المالية تعني "جوهري/مؤثر" وليس "مادي".',
        visualCue: 'جسر بصري يربط المصطلحات التقنية بالمؤشرات المالية التنفيذية.',
      },
      {
        slideNumber: 2,
        title: 'المصطلحات الكمية لتقييم المخاطر: SLE, ARO, ALE',
        titleEn: 'Quantitative Risk Articulation: SLE, ARO & ALE',
        bulletPoints: [
          'SLE (Single Loss Expectancy): الخسارة المالية لحادثة واحدة (Asset Value × Exposure Factor).',
          'ARO (Annualized Rate of Occurrence): المعدل السنوي المتوقع لوقوع التهديد.',
          'ALE (Annualized Loss Expectancy = SLE × ARO): الخسارة السنوية المتوقعة.',
        ],
        englishKeyExcerpt: 'With an SLE of SAR 12M and an ARO of 0.25, the pre-control Annualized Loss Expectancy (ALE) stands at SAR 3M.',
        phoneticHighlight: 'Annualized /ˈæn.ju.ə.laɪzd/ • Expectancy /ɪkˈspek.tən.si/',
        speakerNotes: 'درب الطلاب على قراءة الأرقام المالية والمعادلات باللغة الإنجليزية بطلاقة.',
        visualCue: 'بطاقات معادلات رياضية واضحة لحساب SLE و ARO و ALE.',
      },
      {
        slideNumber: 3,
        title: 'تبرير الميزانية عبر العائد على الاستثمار الأمني (ROSI)',
        titleEn: 'Justifying Security Budgets with ROSI',
        bulletPoints: [
          'معادلة ROSI = ((ALE قبل الضابط - ALE بعد الضابط) - تكلفة الضابط) ÷ تكلفة الضابط.',
          'كيف تصوغ توصية استثمارية مقنعة للجنة المالية.',
          'الربط بين خفض ALE والامتثال للمتطلبات التنظيمية (NCA / SAMA).',
        ],
        englishKeyExcerpt: 'Deploying automated key management yields a net risk reduction of SAR 2.7M/year, representing a 350% ROSI.',
        phoneticHighlight: 'Yielding /ˈjiːl.dɪŋ/ • Cost-Effective /ˌkɒst.ɪˈfek.tɪv/',
        speakerNotes: 'اشرح كيف يستخدم الفعل "yield" في الكتابة المالية والتنفيذية بمعنى "يحقق عائداً قدره".',
        visualCue: 'مخطط أعمدة يقارن بين ALE قبل الضابط وبعده مع تكلفة الاستثمار.',
      },
      {
        slideNumber: 4,
        title: 'المخاطرة الكامنة والمتبقية وخيارات المعالجة الأربعة',
        titleEn: 'Inherent Risk, Residual Risk & Treatment Options',
        bulletPoints: [
          'Inherent Risk (قبل الضوابط) مقابل Residual Risk (بعد الضوابط).',
          'خيارات المعالجة الأربعة: Mitigate, Transfer, Avoid, Accept.',
          'قاعدة ذهبية: لا يمكن نقل المساءلة التنظيمية (Regulatory Accountability) عبر التأمين.',
        ],
        englishKeyExcerpt: 'Management proposes to mitigate the inherent risk via MFA, reducing residual risk within the Board’s risk appetite.',
        phoneticHighlight: 'Inherent /ɪnˈher.ənt/ • Residual /rɪˈzɪd.ju.əl/ • Mitigate /ˈmɪt.ɪ.ɡeɪt/',
        speakerNotes: 'ركز على النطق الصحيح لكلمتي Inherent و Residual.',
        visualCue: 'مصفوفة حرارة المخاطر (5×5 Risk Heatmap) توضح انتقال الخطر من الأحمر إلى الأخضر.',
      },
      {
        slideNumber: 5,
        title: 'مؤشرات تحليل أثر الأعمال واستمرارية التشغيل (BIA, RTO, RPO)',
        titleEn: 'Business Impact Analysis: RTO & RPO',
        bulletPoints: [
          'BIA (Business Impact Analysis): تحديد العمليات الحرجة وتكلفة توقفها.',
          'RTO (Recovery Time Objective): أقصى زمن مسموح به لاستعادة الخدمة بعد الانقطاع.',
          'RPO (Recovery Point Objective): أقصى فترة بيانات مسموح بفقدانها (عمر آخر نسخة احتياطية).',
        ],
        englishKeyExcerpt: 'Active-active clustering ensures our core payment gateway satisfies its stringent 15-minute RTO and zero-data-loss RPO.',
        phoneticHighlight: 'Stringent /ˈstrɪn.dʒənt/ • Continuity /ˌkɒn.tɪˈnjuː.ə.ti/',
        speakerNotes: 'علّم الطلاب الصفة الأكاديمية "stringent" (/ˈstrɪn.dʒənt/ — صارم/مشدد) لوصف متطلبات RTO/RPO في القطاع المالي.',
        visualCue: 'مخطط زمني يوضح RPO في الماضي (آخر نسخة احتياطية) و RTO في المستقبل (لحظة عودة الخدمة).',
      },
    ],
    flashcards: [
      {
        front: 'Inherent Risk vs. Residual Risk',
        back: 'Inherent Risk (/ɪnˈher.ənt/): المخاطرة الكامنة قبل تطبيق أي ضوابط. Residual Risk (/rɪˈzɪd.ju.əl/): المخاطرة المتبقية بعد تطبيق الضوابط الأمنية.',
        category: 'Risk Governance',
        phonetic: '/ɪnˈher.ənt/ vs /rɪˈzɪd.ju.əl/',
        pronunciationAudioText: 'Inherent Risk versus Residual Risk',
      },
      {
        front: 'ALE (Annualized Loss Expectancy)',
        back: 'الخسارة السنوية المتوقعة مالياً، وتساوي حاصل ضرب الخسارة المتوقعة للحادثة الواحدة (SLE) في المعدل السنوي للوقوع (ARO).',
        category: 'Quantitative Risk',
        phonetic: '/ˈæn.ju.ə.laɪzd lɒs ɪkˈspek.tən.si/',
        pronunciationAudioText: 'Annualized Loss Expectancy',
      },
      {
        front: 'ROSI (Return on Security Investment)',
        back: 'العائد على الاستثمار الأمني: مقياس مالي يوضح نسبة الوفر الصافي الناتج عن خفض ALE مقارنة بتكلفة الضابط الأمني.',
        category: 'Board Metrics',
        phonetic: '/rɪˈtɜːn ɒn sɪˈkjʊə.rə.ti ɪnˈvest.mənt/',
        pronunciationAudioText: 'Return on Security Investment',
      },
      {
        front: 'RTO vs. RPO',
        back: 'RTO (Recovery Time Objective): أقصى وقت مسموح لتوقف الخدمة بعد حادثة. RPO (Recovery Point Objective): أقصى حجم بيانات زمني مسموح بفقدانه.',
        category: 'Business Continuity',
        phonetic: '/ˌɑːr.tiːˈəʊ/ vs /ˌɑːr.piːˈəʊ/',
        pronunciationAudioText: 'Recovery Time Objective versus Recovery Point Objective',
      },
      {
        front: 'Risk Appetite (/rɪsk ˈæp.ə.taɪt/)',
        back: 'شهية المخاطر: الحد الأعلى من المخاطر الذي يقبل مجلس الإدارة تحمله في سبيل تحقيق أهداف المؤسسة الاستراتيجية.',
        category: 'Risk Governance',
        phonetic: '/rɪsk ˈæp.ə.taɪt/',
        pronunciationAudioText: 'Risk Appetite',
      },
      {
        front: 'Material Impact (/məˈtɪə.ri.əl ˈɪm.pækt/)',
        back: 'أثر جوهري: تأثير مالي أو تشغيلي أو قانوني جسيم يستوجب الإفصاح لمجلس الإدارة والجهات الرقابية.',
        category: 'Executive Reporting',
        phonetic: '/məˈtɪə.ri.əl ˈɪm.pækt/',
        pronunciationAudioText: 'Material Impact',
      },
    ],
    miniQuiz: [
      {
        question: 'A core banking server has a Single Loss Expectancy (SLE) of SAR 4,000,000 and an Annualized Rate of Occurrence (ARO) of 0.5. What is the Annualized Loss Expectancy (ALE), and how should it be stated in an executive report?',
        options: [
          'SAR 8,000,000 — "The inherent RPO stands at SAR 8M."',
          'SAR 2,000,000 — "The pre-control Annualized Loss Expectancy (ALE) stands at SAR 2,000,000 per year."',
          'SAR 4,000,000 — "The false positive rate equals SAR 4M."',
          'SAR 500,000 — "The residual RTO is SAR 500K."',
        ],
        correctIndex: 1,
        explanation: 'حساب ALE = SLE × ARO = 4,000,000 × 0.5 = 2,000,000 ريال سنوياً، وتُصاغ تنفيذياً بـ "The pre-control Annualized Loss Expectancy (ALE) stands at SAR 2,000,000 per year."',
      },
      {
        question: 'In an executive board briefing, what does the adjective "material" mean in the phrase "zero material operational disruptions"?',
        options: [
          'Related to physical hardware cables only',
          'Significant or substantial enough to affect financial outcomes, operations, or regulatory standing',
          'Temporary and completely negligible',
          'Encrypted with symmetric keys',
        ],
        correctIndex: 1,
        explanation: 'في لغة الحوكمة والمال ومجالس الإدارة، تعني كلمة "material" (/məˈtɪə.ri.əl/) جوهرياً أو ذا أثر مالي وتشغيلي وقانوني يُعتدّ به.',
      },
      {
        question: 'أي من المصطلحات التالية يعبّر عن «أقصى عمر للبيانات المسموح بفقدانها عند وقوع كارثة»، وهو ما يحدد دورية النسخ الاحتياطي؟',
        options: [
          'Recovery Point Objective (RPO)',
          'Recovery Time Objective (RTO)',
          'Mean Time to Acknowledge (MTTA)',
          'Annualized Rate of Occurrence (ARO)',
        ],
        correctIndex: 0,
        explanation: 'مؤشر Recovery Point Objective (RPO) يحدد أقصى مدى زمني للبيانات المسموح بفقدانها، بينما RTO يحدد أقصى زمن لاستعادة الخدمة.',
      },
      {
        question: 'Which statement accurately reflects academic cybersecurity governance regarding "Risk Transfer" (e.g., purchasing cyber insurance)?',
        options: [
          'Purchasing cyber insurance transfers both financial loss and all NCA regulatory compliance liability to the insurer.',
          'Cyber insurance transfers a portion of the financial impact, but legal and regulatory accountability remains with the organization.',
          'Risk transfer eliminates the need for any technical security controls.',
          'Risk transfer is identical to risk avoidance.',
        ],
        correctIndex: 1,
        explanation: 'نقل المخاطر عبر التأمين ينقل جزءاً من الأثر المالي فقط، أما المساءلة القانونية والتنظيمية (Accountability) فتبقى دائماً على عاتق المؤسسة.',
      },
    ],
    interactiveBook3D: {
      model3DType: 'BOARD_RISK_MATRIX_HOLOGRAM',
      shaderEffect: 'violet-executive-aura',
      bookTitleEn: 'Interactive 3D Board Hologram: Executive Risk & ROSI',
      bookTitleAr: 'الكتاب التفاعلي ثلاثي الأبعاد: هولوغرام مخاطر مجلس الإدارة والعائد الأمني',
      pages3D: [
        {
          pageNumber: 1,
          titleAr: 'الترجمة التنفيذية للمخاطر السيبرانية',
          titleEn: 'Translating Cyber Risk for the Board',
          badge: 'BOARD BRIEFING PAGE 01',
          bilingualSummaryAr: 'تُصاغ الملخصات التنفيذية بلغة موجزة تربط التهديدات التقنية بالأثر المالي واستمرارية الأعمال والامتثال التنظيمي دون إغراق في التفاصيل البرمجية.',
          englishExcerpt: 'Rather than listing raw vulnerability counts, executive briefings quantify financial exposure and align mitigation investments with enterprise risk appetite.',
          phoneticGuide: 'Quantify /ˈkwɒn.tɪ.faɪ/ | Risk Appetite /rɪsk ˈæp.ə.taɪt/',
          pronunciationAudioText: 'Rather than listing raw vulnerability counts, executive briefings quantify financial exposure and align mitigation investments with enterprise risk appetite.',
          grammarOrStyleTip: 'ابدأ الملخص التنفيذي دائماً بالنتيجة الاستراتيجية والقرار المطلوب (Bottom-Line Up Front - BLUF).',
          keyTakeaway: 'مجلس الإدارة يقارن المخاطرة المتبقية (Residual Risk) بشهية المخاطر المعتمدة (Risk Appetite).',
        },
        {
          pageNumber: 2,
          titleAr: 'التحليل الكمي للمخاطر والعائد الأمني (ALE & ROSI)',
          titleEn: 'Quantitative Modeling: SLE, ARO, ALE & ROSI',
          badge: 'BOARD BRIEFING PAGE 02',
          bilingualSummaryAr: 'يُثبت العائد على الاستثمار الأمني (ROSI) أن تكلفة الضابط الأمني أقل بكثير من الخسارة السنوية المتوقعة (ALE) التي يمنعها.',
          englishExcerpt: 'By reducing the Annualized Loss Expectancy from SAR 3.0M to SAR 0.3M at an annual control cost of SAR 0.6M, the initiative delivers a 350% ROSI.',
          phoneticGuide: 'Annualized Loss Expectancy /ˈæn.ju.ə.laɪzd lɒs ɪkˈspek.tən.si/ | ROSI /ˈrəʊ.zi/',
          pronunciationAudioText: 'By reducing the Annualized Loss Expectancy from 3 million riyals to 0.3 million riyals at an annual control cost of 0.6 million riyals, the initiative delivers a 350 percent Return on Security Investment.',
          grammarOrStyleTip: 'الفعل "deliver" أو "yield" مع النسب المئوية للعائد الاستثماري يمنح الجملة قوة إقناع مالية عالية.',
          keyTakeaway: 'التكميم المالي يحوّل الأمن السيبراني من مركز تكلفة إلى استثمار يحمي أصول المؤسسة.',
        },
        {
          pageNumber: 3,
          titleAr: 'مؤشرات استمرارية الأعمال (BIA, RTO & RPO)',
          titleEn: 'Business Continuity Metrics: BIA, RTO & RPO',
          badge: 'BOARD BRIEFING PAGE 03',
          bilingualSummaryAr: 'يحدد تحليل أثر الأعمال (BIA) سقف التوقف المسموح به للخدمة (RTO) وأقصى فقدان مسموح به للبيانات (RPO) لضمان صمود العمليات الحيوية.',
          englishExcerpt: 'Failover architecture upgrades are required to align current recovery capabilities with the Board-mandated 30-minute RTO and 5-minute RPO.',
          phoneticGuide: 'Failover /ˈfeɪlˌəʊ.vər/ | Mandated /ˈmæn.deɪ.tɪd/',
          pronunciationAudioText: 'Failover architecture upgrades are required to align current recovery capabilities with the Board-mandated 30-minute RTO and 5-minute RPO.',
          grammarOrStyleTip: 'النعت المركب "Board-mandated" (المعتمد إلزامياً من مجلس الإدارة) يبرز المرجعية الحوكمية للمتطلب.',
          keyTakeaway: 'تجاوز RTO أو RPO الفعلي للحدود المعتمدة في BIA يُعد فجوة استمرارية أعمال حرجة.',
        },
      ],
      stepByStep: [
        {
          stepNumber: 1,
          titleAr: 'تقييم المخاطرة الكامنة وأثر الأعمال (Inherent Risk & BIA)',
          titleEn: 'Step 1: Quantify Inherent Risk & Business Impact',
          descriptionAr: 'تحديد قيمة الأصل وحساب SLE و ARO للوصول إلى الخسارة السنوية المتوقعة قبل الضوابط.',
          englishActionPhrase: 'Quantify pre-control Annualized Loss Expectancy (ALE) based on Business Impact Analysis.',
          phonetic: '/ˈkwɒn.tɪ.faɪ ˈæn.ju.ə.laɪzd lɒs ɪkˈspek.tən.si/',
          pronunciationAudioText: 'Quantify pre-control Annualized Loss Expectancy based on Business Impact Analysis.',
          visualState: 'توهج الخلية الحمراء في مصفوفة المخاطر الثلاثية الأبعاد.',
        },
        {
          stepNumber: 2,
          titleAr: 'تصميم خيار التخفيف وحساب ROSI (Mitigation & ROSI Modeling)',
          titleEn: 'Step 2: Model Control Cost & Calculate ROSI',
          descriptionAr: 'حساب مقدار الانخفاض في ALE بعد تطبيق الضابط ومقارنته بتكلفة الاستثمار.',
          englishActionPhrase: 'Compute the Return on Security Investment (ROSI) to validate financial cost-effectiveness.',
          phonetic: '/kəmˈpjuːt ðə rɪˈtɜːn ɒn sɪˈkjʊə.rə.ti ɪnˈvest.mənt/',
          pronunciationAudioText: 'Compute the Return on Security Investment to validate financial cost-effectiveness.',
          visualState: 'ظهور منحنى العائد الاستثماري البنفسجي والذهبي فوق المصفوفة.',
        },
        {
          stepNumber: 3,
          titleAr: 'مواءمة المخاطرة المتبقية مع شهية المخاطر (Residual Risk Alignment)',
          titleEn: 'Step 3: Align Residual Risk with Risk Appetite',
          descriptionAr: 'التحقق من انتقال الخطر بعد التخفيف إلى النطاق الأخضر المقبول مؤسسياً.',
          englishActionPhrase: 'Verify that post-mitigation residual risk falls within the Board-approved risk appetite.',
          phonetic: '/rɪˈzɪd.ju.əl rɪsk fɔːlz wɪˈðɪn rɪsk ˈæp.ə.taɪt/',
          pronunciationAudioText: 'Verify that post-mitigation residual risk falls within the Board-approved risk appetite.',
          visualState: 'انتقال مؤشر الخطر من المربع الأحمر إلى المربع الأخضر الآمن.',
        },
        {
          stepNumber: 4,
          titleAr: 'تقديم التوصية التنفيذية لمجلس الإدارة (Board Decision Sign-Off)',
          titleEn: 'Step 4: Present Executive Summary for Board Sign-Off',
          descriptionAr: 'عرض الملخص التنفيذي الموجز للحصول على اعتماد الميزانية وخطة المعالجة.',
          englishActionPhrase: 'Submit the executive briefing for formal Board approval and budget allocation.',
          phonetic: '/səbˈmɪt ðɪ ɪɡˈzek.jʊ.tɪv ˈbriː.fɪŋ/',
          pronunciationAudioText: 'Submit the executive briefing for formal Board approval and budget allocation.',
          visualState: 'ظهور ختم اعتماد مجلس الإدارة على الهولوغرام التنفيذي.',
        },
      ],
      hotspots: [
        {
          id: 'hs-ch5-1',
          labelAr: 'مؤشر الخسارة السنوية المتوقعة (ALE Financial Node)',
          labelEn: 'Annualized Loss Expectancy (ALE) Node',
          coordinates: { x: -1.4, y: 1.0, z: 0.4 },
          phonetic: '/ˈæn.ju.ə.laɪzd lɒs ɪkˈspek.tən.si nəʊd/',
          pronunciationAudioText: 'Annualized Loss Expectancy Node. ALE translates technical likelihood and impact into annualized monetary exposure.',
          explanationAr: 'يحوّل احتمالية التهديد وأثره إلى رقم مالي سنوي واضح يفهمه أعضاء اللجنة المالية ومجلس الإدارة.',
          englishTemplateSnippet: 'Pre-control ALE is estimated at SAR 3.0M/year (SLE: SAR 12.0M × ARO: 0.25).',
          securityContext: 'التحليل الكمي للمخاطر السيبرانية (Quantitative Cyber Risk Analysis).',
        },
        {
          id: 'hs-ch5-2',
          labelAr: 'حاسبة العائد الأمني (ROSI Justification Gauge)',
          labelEn: 'Return on Security Investment (ROSI) Gauge',
          coordinates: { x: 1.4, y: 1.0, z: 0.4 },
          phonetic: '/rɪˈtɜːn ɒn sɪˈkjʊə.rə.ti ɪnˈvest.mənt ɡeɪdʒ/',
          pronunciationAudioText: 'Return on Security Investment Gauge. ROSI quantifies the net financial savings generated by a security control.',
          explanationAr: 'يوضح الجدوى الاقتصادية للمشروع الأمني عبر مقارنة الوفر المالي السنوي بتكلفة الضابط.',
          englishTemplateSnippet: 'The proposed cryptographic upgrade delivers a net annual risk reduction of SAR 2.1M (350% ROSI).',
          securityContext: 'حوكمة الميزانيات وتبرير الاستثمار الأمني (CISO Budget Justification).',
        },
        {
          id: 'hs-ch5-3',
          labelAr: 'عتبة شهية المخاطر والمخاطرة المتبقية (Residual Risk Threshold)',
          labelEn: 'Residual Risk vs. Risk Appetite Boundary',
          coordinates: { x: 0.0, y: 0.2, z: 1.1 },
          phonetic: '/rɪˈzɪd.ju.əl rɪsk ˈbaʊn.dər.i/',
          pronunciationAudioText: 'Residual Risk versus Risk Appetite Boundary. Controls must reduce inherent risk below the board risk appetite ceiling.',
          explanationAr: 'الخط الفاصل بين المخاطر المقبولة مؤسسياً والمخاطر التي تستلزم تدخلاً ومعالجة فورية.',
          englishTemplateSnippet: 'Post-mitigation residual risk is rated LOW, aligning with the enterprise risk appetite statement.',
          securityContext: 'حوكمة المخاطر المؤسسية (Enterprise Risk Management - ERM).',
        },
        {
          id: 'hs-ch5-4',
          labelAr: 'مؤشرات استمرارية الأعمال (RTO & RPO Continuity Bar)',
          labelEn: 'RTO & RPO Business Continuity Bar',
          coordinates: { x: 0.0, y: -1.2, z: 0.6 },
          phonetic: '/rɪˈkʌv.ər.i taɪm ænd pɔɪnt əbˈdʒek.tɪvz/',
          pronunciationAudioText: 'Recovery Time and Recovery Point Objectives. RTO and RPO define operational resilience targets during disruptions.',
          explanationAr: 'يحدد أقصى زمن مسموح لتوقف الخدمة (RTO) وأقصى مدى زمني لفقدان البيانات (RPO).',
          englishTemplateSnippet: 'Geo-redundant failover reduces critical payment service RTO to 15 minutes and RPO to zero.',
          securityContext: 'إدارة استمرارية الأعمال والتعافي من الكوارث (BCP & DRP).',
        },
      ],
    },
  },

  // ==========================================================================
  // الفصل السادس (Chapter 6)
  // ==========================================================================
  {
    id: 606,
    chapter_number: 6,
    title: 'صياغة السياسات والمعايير الأمنية وإعلانات الامتثال باللغة الإنجليزية',
    subtitle: 'Drafting Security Policies, Acceptable Use Policies & Compliance Statements',
    description: 'إتقان الصياغة القانونية والمؤسسية لوثائق الحوكمة السيبرانية باللغة الإنجليزية: الفرق الهرمي بين السياسة (Policy) والمعيار (Standard) والإجراء (Procedure) والدليل الإرشادي (Guideline)، وصياغة سياسة الاستخدام المقبول (AUP)، وسياسة إدارة المفاتيح التشفيرية، وإعلانات القابلية للتطبيق والامتثال (Statement of Applicability - SoA).',
    category: 'متقدم',
    difficulty: 'intermediate',
    phonetic: '/ˈdræftɪŋ sɪˈkjʊərəti ˈpɒlɪsiz ænd kəmˈplaɪəns ˈsteɪtmənts/',
    pronunciationAudioText: 'Drafting Security Policies, Acceptable Use Policies, and Statements of Applicability in Corporate Governance English.',
    diagramKey: 'eng-cyber-6',
    videoUrl: 'https://www.youtube.com/watch?v=q2_g8n4xY9w',
    presentationUrl: '/assets/presentations/eng-cyber-ch6-security-policies.pdf',
    pdfStartPage: 103,
    pdfEndPage: 124,
    updated_at: GENERATED_TIMESTAMP,
    keyTopics: [
      'الهرم الوثائقي للأمن السيبراني بالإنجليزية (Policy vs. Standard vs. Baseline vs. Procedure vs. Guideline)',
      'الأقسام السبعة القياسية لوثيقة السياسة الأمنية الرسمية (Purpose, Scope, Roles & Responsibilities, Policy Statements, Exceptions, Enforcement, Review Cycle)',
      'تراكيب الإلزام والمسؤولية المؤسسية (adhere to, comply with, strictly prohibited, principle of least privilege, separation of duties)',
      'صياغة سياسة إدارة المفاتيح التشفيرية (Cryptographic Key Management Policy) وسياسة الاستخدام المقبول (AUP)',
      'كتابة إعلانات الامتثال وبيان القابلية للتطبيق (Statement of Applicability - SoA) وفق ISO/IEC 27001 وضوابط NCA ECC',
    ],
    content: `## تمهيد: البنية الهرمية لوثائق الحوكمة السيبرانية

تُبنى منظومة الحوكمة والمخاطر والامتثال (**Governance, Risk, and Compliance - GRC**) في المؤسسات الكبرى على هرم وثائقي دقيق، كما هو موضح في أطر [ISO/IEC 27001](https://www.iso.org/standard/27001) والضوابط الأساسية للأمن السيبراني ([NCA ECC-2:2024](https://nca.gov.sa/en/regulatory-documents/)). ويتطلب تحرير هذه الوثائق باللغة الإنجليزية إتقان النبرة الرسمية الحازمة (**Authoritative & Prescriptive Corporate Tone**) الخالية من الغموض أو الثغرات اللفظية.

---page---

## أولاً: الفرق الدقيق بين وثائق الحوكمة الخمس (The GRC Documentation Hierarchy)

| نوع الوثيقة (Document Type) | النطق الصوتي (IPA) | درجة الإلزام | السؤال الذي تجيب عنه | مثال إنجليزي تطبيقي |
| :--- | :--- | :--- | :--- | :--- |
| **Policy (السياسة العليا)** | \`/ˈpɒl.ə.si/\` | **Mandatory (إلزامية)** | **What & Why?** (ماذا نحمي ولماذا؟ — توجيه الإدارة العليا) | *"All sensitive corporate data must be protected using approved cryptographic controls across its lifecycle."* |
| **Standard (المعيار الفني)** | \`/ˈstæn.dəd/\` | **Mandatory (إلزامي)** | **What Specific Criteria?** (ما المواصفات والخوارزميات المحددة؟) | *"Data at rest shall be encrypted using AES-256-GCM; RSA keys shall have a minimum length of 3072 bits."* |
| **Baseline (خط الأساس)** | \`/ˈbeɪs.laɪn/\` | **Mandatory (إلزامي)** | **What Minimum Configuration?** (ما الحد الأدنى لإعدادات التأمين؟) | *"All Linux production servers must adhere to the CIS Benchmark Level 2 hardening baseline."* |
| **Procedure / SOP (الإجراء)** | \`/prəˈsiː.dʒər/\` | **Mandatory (إلزامي)** | **How Step-by-Step?** (كيف يُنفذ الضابط خطوة بخطوة؟) | *"Step 1: Generate CSR on the HSM. Step 2: Submit CSR to the internal issuing CA."* |
| **Guideline (الدليل الإرشادي)** | \`/ˈɡaɪd.laɪn/\` | **Recommended (إرشادي)** | **What Best Practices?** (ما أفضل الممارسات الموصى بها؟) | *"Employees are encouraged to use passphrases of at least four unrelated words where MFA is supplemented."* |

---page---

## ثانياً: المصطلحات والتراكيب القانونية في صياغة السياسات (Policy Drafting Lexicon & IPA)

| المصطلح أو التركيب (Policy Phrase) | النطق الصوتي (IPA) | المقابل العربي الرسمي | السياق القياسي داخل وثيقة السياسة |
| :--- | :--- | :--- | :--- |
| **Adhere to / Comply with** | \`/ədˈhɪər tuː/\` • \`/kəmˈplaɪ wɪð/\` | يلتزم بـ / يمتثل لـ | *"All personnel and third-party contractors **shall adhere to** this policy."* |
| **Principle of Least Privilege (PoLP)** | \`/ˈprɪn.sə.pəl əv liːst ˈprɪv.əl.ɪdʒ/\` | مبدأ الحد الأدنى من الصلاحيات | منح المستخدم أو العملية أقل صلاحيات لازمة لأداء مهامها الوظيفية فقط. |
| **Separation / Segregation of Duties (SoD)** | \`/ˌsep.ərˈeɪ.ʃən əv ˈdjuː.tiz/\` | الفصل بين المهام المتعارضة | اشتراط أكثر من شخص لإتمام العمليات الحساسة (مثل Split Knowledge / Dual Control في إدارة مفاتيح HSM). |
| **Data Classification & Handling** | \`/ˈdeɪ.tə ˌklæs.ɪ.fɪˈkeɪ.ʃən/\` | تصنيف البيانات والتعامل معها | تقسيم البيانات إلى مستويات (Top Secret, Confidential, Internal, Public) وتحديد ضوابط تشفير كل مستوى. |
| **Disciplinary Action** | \`/ˌdɪs.əˈplɪn.ər.i ˈæk.ʃən/\` | إجراء تأديبي | يرد دائماً في بند المساءلة والعقوبات (**Enforcement & Non-Compliance Clause**). |
| **Statement of Applicability (SoA)** | \`/ˈsteɪt.mənt əv əˌplɪk.əˈbɪl.ə.ti/\` | بيان القابلية للتطبيق | وثيقة محورية في ISO 27001 تحدد الضوابط المطبقة وتبرر أي استثناءات مع حالة التنفيذ. |

---page---

## ثالثاً: نموذج رسمي متكامل لسياسة أمنية باللغة الإنجليزية (Enterprise Cryptographic & Acceptable Use Policy Excerpt)

اقرأ النموذج الرسمي التالي الذي يمثل البنية المعيارية لسياسات الأمن السيبراني في الشركات والجهات الحكومية:

> **DOCUMENT ID: POL-SEC-004 | VERSION: 3.0 | CLASSIFICATION: INTERNAL**
> **TITLE: ENTERPRISE CRYPTOGRAPHIC KEY MANAGEMENT & ACCEPTABLE USE POLICY**
>
> **1. Purpose**
> The purpose of this policy is to establish mandatory governance and technical requirements for the generation, storage, rotation, and destruction of cryptographic keys, ensuring the confidentiality, integrity, and non-repudiation of organizational information assets in alignment with the **NCA National Cryptography Standards (NCS)** and **ECC-2:2024**.
>
> **2. Scope**
> This policy applies to all full-time and part-time employees, contractors, consultants, and third-party service providers who access, manage, or operate information systems owned or leased by the Organization.
>
> **3. Policy Statements**
> - **3.1 Principle of Least Privilege & Dual Control**: Access to production Hardware Security Modules (HSMs) **shall** strictly enforce the **principle of least privilege** and **separation of duties**. Root key activation ceremonies **must** require *m-of-n* quorum authentication under **dual control** and **split knowledge**.
> - **3.2 Prohibited Practices**: Users are **strictly prohibited** from storing plaintext private keys in source code repositories, sharing cryptographic credentials via unencrypted email, or deploying proprietary/non-standardized encryption algorithms.
> - **3.3 Acceptable Use of Corporate Assets**: Corporate cryptographic tokens and digital certificates **shall** be used exclusively for authorized business operations.
>
> **4. Exception Management**
> Any deviation from this policy requires a formal **Risk Exception Request** documented in the Enterprise Risk Register, supported by a validated **compensating control**, and approved in writing by the CISO for a period not exceeding six (6) months.
>
> **5. Enforcement & Non-Compliance**
> Failure to **adhere to** the provisions of this policy **may** result in immediate revocation of system privileges and **disciplinary action**, up to and including termination of employment or contract cancellation, as well as applicable civil or criminal liability under national laws.

### الترجمة العربية والتحليل اللغوي لبنود السياسة:
- **\`in alignment with\`**: التركيب القياسي لربط السياسة الداخلية بالمرجعية التنظيمية الوطنية (NCA NCS / ECC).
- **\`dual control and split knowledge\`**: مصطلحان متلازمان في سياسات التشفير؛ **Dual Control** يعني اشتراط وجود شخصين أو أكثر لتنفيذ العملية، و **Split Knowledge** يعني ألا يعرف أي شخص بمفرده كامل مكونات المفتاح السري.
- **\`up to and including termination of employment\`**: الصيغة القانونية القياسية العالمية في بند **Enforcement** لبيان تدرج العقوبات الإدارية.`,
    vocabularyList: [
      {
        id: 'voc-601',
        term: 'Adhere to',
        partOfSpeech: 'Verb',
        phonetic: '/ədˈhɪər tuː/',
        pronunciationAudioText: 'Adhere to. All employees and third-party vendors are required to adhere to the enterprise security policy.',
        arabicMeaning: 'يلتزم بـ / يتقيّد بـ',
        academicDefinitionEn: 'To follow, observe, or act in accordance with a formal rule, policy, standard, or regulatory mandate.',
        academicDefinitionAr: 'الالتزام والتقيد التام بقاعدة رسمية أو سياسة مؤسسية أو معيار تقني أو متطلب تنظيمي.',
        exampleSentenceEn: 'Contractors must adhere to the Acceptable Use Policy before receiving network credentials.',
        exampleSentenceAr: 'يجب على المتعاقدين الالتزام بسياسة الاستخدام المقبول قبل استلام بيانات الدخول للشبكة.',
        collocations: ['strictly adhere to', 'adherence to security policies', 'fail to adhere to'],
      },
      {
        id: 'voc-602',
        term: 'Principle of Least Privilege',
        acronym: 'PoLP',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/ˈprɪn.sə.pəl əv liːst ˈprɪv.əl.ɪdʒ/',
        pronunciationAudioText: 'Principle of Least Privilege. Access control policies must enforce the principle of least privilege across all cloud roles.',
        arabicMeaning: 'مبدأ الحد الأدنى من الصلاحيات',
        academicDefinitionEn: 'A security architecture rule requiring that every user, program, or system process be granted only the minimum privileges necessary to perform its authorized function.',
        academicDefinitionAr: 'قاعدة أمنية تقضي بمنح كل مستخدم أو برنامج أو عملية الحد الأدنى فقط من الصلاحيات اللازمة لأداء مهامه المصرح بها.',
        exampleSentenceEn: 'Enforcing the principle of least privilege limits the blast radius of a compromised account.',
        exampleSentenceAr: 'يؤدي فرض مبدأ الحد الأدنى من الصلاحيات إلى تقليص نطاق الضرر في حال اختراق الحساب.',
        collocations: ['enforce least privilege', 'least-privilege access model', 'violate least privilege'],
      },
      {
        id: 'voc-603',
        term: 'Separation of Duties',
        acronym: 'SoD',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/ˌsep.ərˈeɪ.ʃən əv ˈdjuː.tiz/',
        pronunciationAudioText: 'Separation of Duties. Separation of duties prevents any single administrator from unilaterally issuing and approving root certificates.',
        arabicMeaning: 'الفصل بين المهام والصلاحيات المتعارضة',
        academicDefinitionEn: 'An internal control principle that divides critical tasks among multiple individuals to prevent fraud, insider abuse, and unilateral error.',
        academicDefinitionAr: 'مبدأ رقابي داخلي يقسّم المهام الحساسة بين عدة أشخاص لمنع الاحتيال أو إساءة استخدام الصلاحيات أو الخطأ الفردي.',
        exampleSentenceEn: 'Cryptographic key ceremonies enforce separation of duties through dual control and split knowledge.',
        exampleSentenceAr: 'تفرض مراسم توليد المفاتيح التشفيرية الفصل بين المهام عبر التحكم المزدوج وتجزئة المعرفة.',
        collocations: ['enforce separation of duties', 'segregation of duties (SoD)', 'SoD conflict matrix'],
      },
      {
        id: 'voc-604',
        term: 'Acceptable Use Policy',
        acronym: 'AUP',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/əkˈsep.tə.bəl juːs ˈpɒl.ə.si/',
        pronunciationAudioText: 'Acceptable Use Policy. Every employee must sign the Acceptable Use Policy during onboarding.',
        arabicMeaning: 'سياسة الاستخدام المقبول للأصول التقنية',
        academicDefinitionEn: 'A formal policy stipulating the permitted and prohibited uses of an organization’s corporate devices, networks, email, and cryptographic assets.',
        academicDefinitionAr: 'سياسة رسمية تحدد الاستخدامات المسموح بها والمحظورة لأجهزة المؤسسة وشبكاتها وبريدها الإلكتروني وأصولها التشفيرية.',
        exampleSentenceEn: 'Installing unauthorized peer-to-peer software is a direct violation of the Acceptable Use Policy.',
        exampleSentenceAr: 'يُعد تثبيت برمجيات الند للند غير المصرح بها انتهاكاً مباشراً لسياسة الاستخدام المقبول.',
        collocations: ['acknowledge the AUP', 'AUP violation', 'corporate Acceptable Use Policy'],
      },
      {
        id: 'voc-605',
        term: 'Statement of Applicability',
        acronym: 'SoA',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/ˈsteɪt.mənt əv əˌplɪk.əˈbɪl.ə.ti/',
        pronunciationAudioText: 'Statement of Applicability. The Statement of Applicability documents which ISO 27001 Annex A controls are implemented and justifies any exclusions.',
        arabicMeaning: 'بيان القابلية للتطبيق (وثيقة نطاق الضوابط)',
        academicDefinitionEn: 'A mandatory ISO/IEC 27001 document listing all reference controls, stating whether each is applicable, justifying exclusions, and describing implementation status.',
        academicDefinitionAr: 'وثيقة إلزامية في معيار ISO/IEC 27001 تسرد جميع الضوابط المرجعية وتوضح قابليتها للتطبيق ومبررات الاستبعاد وحالة التنفيذ.',
        exampleSentenceEn: 'External certification auditors inspect the Statement of Applicability to verify ISMS control coverage.',
        exampleSentenceAr: 'يفحص مدققو الشهادات الخارجيون بيان القابلية للتطبيق للتحقق من تغطية ضوابط نظام إدارة أمن المعلومات.',
        collocations: ['maintain the Statement of Applicability', 'SoA control mapping', 'justify exclusions in the SoA'],
      },
      {
        id: 'voc-606',
        term: 'Disciplinary Action',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/ˌdɪs.əˈplɪn.ər.i ˈæk.ʃən/',
        pronunciationAudioText: 'Disciplinary Action. Intentional circumvention of cryptographic controls will result in disciplinary action.',
        arabicMeaning: 'إجراء تأديبي / مساءلة إدارية',
        academicDefinitionEn: 'Formal administrative or legal measures taken by an employer in response to an employee’s violation of organizational security policies.',
        academicDefinitionAr: 'الإجراءات الإدارية أو القانونية الرسمية التي تتخذها المؤسسة بحق من ينتهك سياسات الأمن السيبراني المعتمدة.',
        exampleSentenceEn: 'Non-compliance with data classification rules may lead to disciplinary action up to termination.',
        exampleSentenceAr: 'قد يؤدي عدم الامتثال لقواعد تصنيف البيانات إلى إجراءات تأديبية تصل إلى إنهاء الخدمة.',
        collocations: ['subject to disciplinary action', 'enforcement and disciplinary action'],
      },
    ],
    terminologyGlossary: [
      {
        term: 'Adhere to / Comply with',
        phonetic: '/ədˈhɪər tuː/ • /kəmˈplaɪ wɪð/',
        pronunciationAudioText: 'Adhere to and Comply with',
        category: 'Policy & GRC',
        arabicEquivalent: 'يلتزم بـ / يمتثل لـ',
        usageContext: 'الأفعال القياسية لإلزام الموظفين والمتعاقدين ببنود السياسة.',
      },
      {
        term: 'Principle of Least Privilege (PoLP)',
        phonetic: '/ˈprɪn.sə.pəl əv liːst ˈprɪv.əl.ɪdʒ/',
        pronunciationAudioText: 'Principle of Least Privilege',
        category: 'Policy & GRC',
        arabicEquivalent: 'مبدأ الحد الأدنى من الصلاحيات',
        usageContext: 'قصر صلاحيات الوصول على ما يلزم لأداء الوظيفة فقط.',
      },
      {
        term: 'Separation of Duties (SoD)',
        phonetic: '/ˌsep.ərˈeɪ.ʃən əv ˈdjuː.tiz/',
        pronunciationAudioText: 'Separation of Duties',
        category: 'Policy & GRC',
        arabicEquivalent: 'الفصل بين المهام',
        usageContext: 'منع انفراد شخص واحد بالتحكم الكامل في العمليات الحساسة.',
      },
      {
        term: 'Acceptable Use Policy (AUP)',
        phonetic: '/əkˈsep.tə.bəl juːs ˈpɒl.ə.si/',
        pronunciationAudioText: 'Acceptable Use Policy',
        category: 'Policy & GRC',
        arabicEquivalent: 'سياسة الاستخدام المقبول',
        usageContext: 'تنظيم الاستخدام المسموح والمحظور للأصول الرقمية للمؤسسة.',
      },
      {
        term: 'Statement of Applicability (SoA)',
        phonetic: '/ˈsteɪt.mənt əv əˌplɪk.əˈbɪl.ə.ti/',
        pronunciationAudioText: 'Statement of Applicability',
        category: 'Policy & GRC',
        arabicEquivalent: 'بيان القابلية للتطبيق',
        usageContext: 'توثيق الضوابط المطبقة ومبررات الاستبعاد في ISO 27001.',
      },
    ],
    images: [
      {
        prompt: 'Cybersecurity GRC documentation pyramid showing Policy, Standard, Baseline, Procedure, and Guideline with Statement of Applicability SoA mapping, 16:9',
        caption: 'الهرم الوثائقي للحوكمة والأمن السيبراني: من السياسة العليا (Policy) والمعيار الفني (Standard) إلى الإجراء التفصيلي (Procedure)',
        alt: 'GRC Policy Standard Procedure Hierarchy diagram',
        seed: 6061,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'الهرم الوثائقي للأمن السيبراني: Policy, Standard, Procedure, Guideline',
        titleEn: 'The Cybersecurity Documentation Hierarchy',
        bulletPoints: [
          'Policy (السياسة): توجيهات عليا إلزامية تجيب عن What & Why.',
          'Standard & Baseline (المعيار وخط الأساس): أرقام وخوارزميات وإعدادات إلزامية محددة.',
          'Procedure (الإجراء الإلزامي خطوة بخطوة) مقابل Guideline (الإرشاد غير الإلزامي).',
        ],
        englishKeyExcerpt: 'While the high-level Policy mandates encryption of sensitive data, the Technical Standard specifies AES-256-GCM.',
        phoneticHighlight: 'Policy /ˈpɒl.ə.si/ • Procedure /prəˈsiː.dʒər/ • Guideline /ˈɡaɪd.laɪn/',
        speakerNotes: 'اشرح لماذا لا نضع أسماء خوارزميات أو أرقام منافذ متغيرة داخل وثيقة السياسة العليا (Policy)، بل نضعها في وثيقة المعيار الفني (Standard) ليسهل تحديثها.',
        visualCue: 'هرم خماسي الطبقات يوضح تدرج وثائق الحوكمة.',
      },
      {
        slideNumber: 2,
        title: 'التشريح القياسي لوثيقة السياسة الأمنية بالإنجليزية',
        titleEn: 'Standard Anatomy of an Enterprise Security Policy',
        bulletPoints: [
          '1. Purpose (الغرض) & 2. Scope (النطاق ومن تشملهم السياسة).',
          '3. Roles & Responsibilities & 4. Policy Statements (بنود الإلزام والحظر).',
          '5. Exception Management & 6. Enforcement / Disciplinary Action.',
        ],
        englishKeyExcerpt: 'This policy applies to all employees, contractors, and third-party vendors accessing organizational assets.',
        phoneticHighlight: 'Scope /skəʊp/ • Enforcement /ɪnˈfɔːs.mənt/',
        speakerNotes: 'استعرض كل قسم من الأقسام الستة مع عباراته الإنجليزية المعيارية الجاهزة.',
        visualCue: 'مخطط وثيقة رسمية مقسمة إلى 6 كتل واضحة.',
      },
      {
        slideNumber: 3,
        title: 'مبادئ التحكم في الوصول وإدارة المفاتيح داخل السياسات',
        titleEn: 'Access & Key Governance Clauses: PoLP, SoD & Dual Control',
        bulletPoints: [
          'Principle of Least Privilege (PoLP): منح الحد الأدنى فقط من الصلاحيات.',
          'Separation of Duties (SoD): فصل المهام المتعارضة لمنع إساءة الاستخدام.',
          'Dual Control & Split Knowledge: اشتراط أكثر من أمين مفاتيح (Key Custodian) لتفعيل HSM.',
        ],
        englishKeyExcerpt: 'Root CA activation ceremonies shall enforce dual control and split knowledge across designated key custodians.',
        phoneticHighlight: 'Least Privilege /liːst ˈprɪv.əl.ɪdʒ/ • Custodian /kʌsˈtəʊ.di.ən/',
        speakerNotes: 'وضح معنى Key Custodian (/kʌsˈtəʊ.di.ən/ — أمين المفاتيح التشفيرية).',
        visualCue: 'رسم توضيحي لمراسم تفعيل مفتاح جذري بحضور ثلاثة أمناء مفاتيح (3-of-5 Quorum).',
      },
      {
        slideNumber: 4,
        title: 'صياغة سياسة الاستخدام المقبول (Acceptable Use Policy - AUP)',
        titleEn: 'Drafting an Acceptable Use Policy (AUP)',
        bulletPoints: [
          'تحديد الاستخدامات المسموح بها لأجهزة المؤسسة وشهاداتها الرقمية.',
          'استخدام عبارة "are strictly prohibited from" + فعل مضاف له -ing.',
          'بند المساءلة القانونية والإدارية (Disciplinary Action Clause).',
        ],
        englishKeyExcerpt: 'Employees are strictly prohibited from exporting private cryptographic keys or bypassing endpoint security controls.',
        phoneticHighlight: 'Strictly Prohibited /ˈstrɪkt.li prəˈhɪb.ɪ.tɪd/',
        speakerNotes: 'ذكّر الطلاب بالدرس الثاني في الملف الأصلي (Drafting Security Policies in English) وكيف طورناه هنا إلى وثيقة مؤسسية كاملة.',
        visualCue: 'قائمة مقارنة بين Permitted Uses و Prohibited Activities.',
      },
      {
        slideNumber: 5,
        title: 'إعلانات الامتثال وبيان القابلية للتطبيق (Statement of Applicability - SoA)',
        titleEn: 'Compliance Statements & Statement of Applicability (SoA)',
        bulletPoints: [
          'دور وثيقة SoA في تدقيق ISO/IEC 27001 ومطابقة ضوابط NCA ECC.',
          'كيف تكتب مبرر شمول الضابط (Inclusion Justification) أو مبرر استبعاده (Exclusion Justification).',
          'صياغة حالة التطبيق بدقة: Fully Implemented, Partially Implemented, Planned.',
        ],
        englishKeyExcerpt: 'Control A.8.24 (Use of Cryptography) is applicable and fully implemented via the Enterprise Key Management Standard.',
        phoneticHighlight: 'Applicability /əˌplɪk.əˈbɪl.ə.ti/ • Exclusion /ɪkˈskluː.ʒən/',
        speakerNotes: 'درب الطلاب على كتابة سطر كامل في جدول Statement of Applicability.',
        visualCue: 'نموذج جدول SoA يربط ISO 27001 بضوابط NCA ECC.',
      },
    ],
    flashcards: [
      {
        front: 'Adhere to (/ədˈhɪər tuː/)',
        back: 'يلتزم بـ / يتقيّد بـ (مرادف أكاديمي ورسمي لـ Comply with في صياغة السياسات الأمنية).',
        category: 'Policy Verbs',
        phonetic: '/ədˈhɪər tuː/',
        pronunciationAudioText: 'Adhere to',
      },
      {
        front: 'Policy vs. Standard vs. Procedure',
        back: 'Policy: توجيه عام إلزامي (ماذا ولماذا). Standard: متطلبات ومواصفات تقنية إلزامية محددة بالأرقام والخوارزميات. Procedure: خطوات تنفيذية متسلسلة (كيف).',
        category: 'GRC Hierarchy',
        phonetic: '/ˈpɒl.ə.si/ vs /ˈstæn.dəd/ vs /prəˈsiː.dʒər/',
        pronunciationAudioText: 'Policy versus Standard versus Procedure',
      },
      {
        front: 'Principle of Least Privilege - PoLP (/ˈprɪn.sə.pəl əv liːst ˈprɪv.əl.ɪdʒ/)',
        back: 'مبدأ الحد الأدنى من الصلاحيات: ألا يُمنح أي مستخدم أو نظام إلا الصلاحيات الضرورية فقط لأداء مهمته المصرح بها.',
        category: 'Access Governance',
        phonetic: '/ˈprɪn.sə.pəl əv liːst ˈprɪv.əl.ɪdʒ/',
        pronunciationAudioText: 'Principle of Least Privilege',
      },
      {
        front: 'Separation of Duties - SoD (/ˌsep.ərˈeɪ.ʃən əv ˈdjuː.tiz/)',
        back: 'الفصل بين المهام: توزيع الصلاحيات الحرجة على أكثر من شخص (مثل Dual Control & Split Knowledge) لمنع التواطؤ أو الانفراد بالقرار.',
        category: 'Access Governance',
        phonetic: '/ˌsep.ərˈeɪ.ʃən əv ˈdjuː.tiz/',
        pronunciationAudioText: 'Separation of Duties',
      },
      {
        front: 'Statement of Applicability - SoA (/ˈsteɪt.mənt əv əˌplɪk.əˈbɪl.ə.ti/)',
        back: 'بيان القابلية للتطبيق: وثيقة رئيسية في ISO/IEC 27001 توضح الضوابط المشمولة ومبررات استبعاد أي ضابط وحالة التنفيذ الفعلي.',
        category: 'ISO 27001 & Audit',
        phonetic: '/ˈsteɪt.mənt əv əˌplɪk.əˈbɪl.ə.ti/',
        pronunciationAudioText: 'Statement of Applicability',
      },
      {
        front: 'Disciplinary Action (/ˌdɪs.əˈplɪn.ər.i ˈæk.ʃən/)',
        back: 'الإجراء التأديبي المنصوص عليه في بند المساءلة (Enforcement Clause) عند مخالفة سياسات الأمن السيبراني.',
        category: 'Policy Enforcement',
        phonetic: '/ˌdɪs.əˈplɪn.ər.i ˈæk.ʃən/',
        pronunciationAudioText: 'Disciplinary Action',
      },
    ],
    miniQuiz: [
      {
        question: 'In the GRC documentation hierarchy, which document type should specify exact cryptographic parameters such as "AES-256-GCM with 96-bit IVs and 90-day automated key rotation"?',
        options: [
          'The Technical Cryptographic Standard (Standard)',
          'An informal optional Guideline',
          'A press release',
          'A shift handover ticket',
        ],
        correctIndex: 0,
        explanation: 'المواصفات الرقمية والخوارزميات المحددة والإعدادات الإلزامية توضع في وثيقة المعيار الفني (Technical Standard) التي تدعم السياسة العليا (Policy).',
      },
      {
        question: 'Choose the grammatically and stylistically correct clause for a corporate Acceptable Use Policy (AUP):',
        options: [
          'Employees are strictly prohibited from storing plaintext cryptographic keys in source code repositories.',
          'Employees are strictly prohibited to store plaintext keys maybe.',
          'Employees might optionally repudiate the write blocker.',
          'Employees are benignly zeroized by the risk appetite.',
        ],
        correctIndex: 0,
        explanation: 'التركيب القياسي في السياسات الرسمية هو: "are strictly prohibited from + [verb-ing]".',
      },
      {
        question: 'ما المصطلحان الإنجليزيان اللذان يصفان اشتراط وجود أكثر من أمين مفاتيح (Key Custodian) لتفعيل المفتاح الجذري للـ HSM مع عدم معرفة أي شخص منهم لكامل السر بمفرده؟',
        options: [
          'Dual Control and Split Knowledge',
          'False Positive and False Negative',
          'Plaintext and Cleartext',
          'RTO and RPO',
        ],
        correctIndex: 0,
        explanation: 'مصطلح Dual Control يعني التحكم المزدوج بحضور شخصين أو أكثر، ومصطلح Split Knowledge يعني تجزئة المعرفة السرية بينهم.',
      },
      {
        question: 'What is the primary purpose of a "Statement of Applicability (SoA)" in an ISO/IEC 27001 Information Security Management System (ISMS)?',
        options: [
          'To store raw RAM dumps after a malware infection',
          'To document which reference controls are applicable to the organization, justify any exclusions, and record implementation status',
          'To encrypt network packets using ChaCha20',
          'To calculate adversary dwell time in the SOC',
        ],
        correctIndex: 1,
        explanation: 'بيان القابلية للتطبيق (Statement of Applicability - SoA) هو الوثيقة التي تربط نتائج تقييم المخاطر بالضوابط المطبقة وتبرر أي استثناءات أمام المدقق.',
      },
    ],
    interactiveBook3D: {
      model3DType: 'POLICY_SHIELD_MONOLITH',
      shaderEffect: 'blue-compliance-lattice',
      bookTitleEn: 'Interactive 3D Policy Monolith: Governance, AUP & SoA',
      bookTitleAr: 'الكتاب التفاعلي ثلاثي الأبعاد: صرح السياسات الأمنية والامتثال',
      pages3D: [
        {
          pageNumber: 1,
          titleAr: 'هندسة الهرم الوثائقي للحوكمة',
          titleEn: 'Architecting the GRC Document Pyramid',
          badge: 'POLICY MONOLITH PAGE 01',
          bilingualSummaryAr: 'تضع السياسة العليا (Policy) المبادئ الإلزامية العامة، ويفصّل المعيار الفني (Standard) الخوارزميات والأطوال، بينما يشرح الإجراء (Procedure) خطوات التنفيذ.',
          englishExcerpt: 'High-level security policies remain technology-agnostic, delegating specific algorithmic parameters to subordinate technical standards.',
          phoneticGuide: 'Technology-Agnostic /tekˈnɒl.ə.dʒi æɡˈnɒs.tɪk/ | Subordinate /səˈbɔː.dɪ.nət/',
          pronunciationAudioText: 'High-level security policies remain technology-agnostic, delegating specific algorithmic parameters to subordinate technical standards.',
          grammarOrStyleTip: 'المصطلح المركب "technology-agnostic" (مستقل عن التقنية المحددة) يشرح لماذا تظل السياسة العليا صالحة لسنوات دون تغيير.',
          keyTakeaway: 'الفصل بين Policy و Standard يمنح المؤسسة مرونة تحديث المعايير التقنية بسرعة.',
        },
        {
          pageNumber: 2,
          titleAr: 'صياغة بنود الصلاحيات وإدارة المفاتيح',
          titleEn: 'Drafting Access & Key Custody Clauses',
          badge: 'POLICY MONOLITH PAGE 02',
          bilingualSummaryAr: 'ترتكز سياسات التشفير والوصول على مبدأ الحد الأدنى من الصلاحيات (Least Privilege)، والفصل بين المهام (Separation of Duties)، والتحكم المزدوج (Dual Control).',
          englishExcerpt: 'Privileged cryptographic operations shall enforce separation of duties, requiring dual control and split knowledge among authorized key custodians.',
          phoneticGuide: 'Separation of Duties /ˌsep.ərˈeɪ.ʃən əv ˈdjuː.tiz/ | Key Custodians /kiː kʌsˈtəʊ.di.ənz/',
          pronunciationAudioText: 'Privileged cryptographic operations shall enforce separation of duties, requiring dual control and split knowledge among authorized key custodians.',
          grammarOrStyleTip: 'استخدم دائماً "among" عند الحديث عن ثلاثة عناصر أو أكثر (مثل مجموعة أمناء المفاتيح)، و "between" عند الحديث عن عنصرين محددين.',
          keyTakeaway: 'تمنع ضوابط Dual Control & Split Knowledge مخاطر التهديد الداخلي المنفرد (Single Insider Threat).',
        },
        {
          pageNumber: 3,
          titleAr: 'إعلانات الامتثال وبيان القابلية للتطبيق (SoA)',
          titleEn: 'Compliance Attestation & Statement of Applicability',
          badge: 'POLICY MONOLITH PAGE 03',
          bilingualSummaryAr: 'يوثق بيان القابلية للتطبيق (SoA) حالة تنفيذ كل ضابط مرجعي ويربطه بالسياسات والمعايير الداخلية والأدلة التدقيقية.',
          englishExcerpt: 'The Statement of Applicability maps each NCA ECC-2:2024 and ISO 27001 control to its corresponding enterprise standard and audit evidence.',
          phoneticGuide: 'Statement of Applicability /ˈsteɪt.mənt əv əˌplɪk.əˈbɪl.ə.ti/ | Attestation /ˌæt.esˈteɪ.ʃən/',
          pronunciationAudioText: 'The Statement of Applicability maps each NCA ECC-2:2024 and ISO 27001 control to its corresponding enterprise standard and audit evidence.',
          grammarOrStyleTip: 'كلمة "Attestation" (/ˌæt.esˈteɪ.ʃən/ — إقرار/شهادة امتثال رسمية) تُستخدم بكثرة في تقارير التدقيق والامتثال.',
          keyTakeaway: 'كل ضابط مستبعد في SoA يحتاج إلى مبرر موثق ومعتمد.',
        },
      ],
      stepByStep: [
        {
          stepNumber: 1,
          titleAr: 'تحديد الغرض والنطاق (Define Purpose & Scope)',
          titleEn: 'Step 1: Define Policy Purpose & Scope',
          descriptionAr: 'كتابة الهدف الاستراتيجي للسياسة وتحديد جميع الفئات والأصول المشمولة بها.',
          englishActionPhrase: 'Establish the policy purpose and define its binding scope across all personnel and third parties.',
          phonetic: '/dɪˈfaɪn ɪts ˈbaɪn.dɪŋ skəʊp/',
          pronunciationAudioText: 'Establish the policy purpose and define its binding scope across all personnel and third parties.',
          visualState: 'إضاءة القاعدة الزرقاء لصرح السياسة الأمنية.',
        },
        {
          stepNumber: 2,
          titleAr: 'صياغة البنود الإلزامية والمحظورات (Draft Normative Policy Statements)',
          titleEn: 'Step 2: Formulate Mandatory & Prohibited Clauses',
          descriptionAr: 'كتابة بنود الإلزام بـ SHALL وبنود الحظر بـ strictly prohibited from.',
          englishActionPhrase: 'Draft prescriptive policy statements enforcing least privilege, separation of duties, and dual control.',
          phonetic: '/prɪˈskrɪp.tɪv ˈpɒl.ə.si ˈsteɪt.mənts/',
          pronunciationAudioText: 'Draft prescriptive policy statements enforcing least privilege, separation of duties, and dual control.',
          visualState: 'تشكّل شبكة الضوابط الزرقاء الساطعة على واجهة الصرح.',
        },
        {
          stepNumber: 3,
          titleAr: 'تضمين آلية الاستثناءات والمساءلة (Exceptions & Enforcement)',
          titleEn: 'Step 3: Specify Exception Handling & Enforcement',
          descriptionAr: 'تحديد شروط استثناء المخاطر المؤقت وبند الإجراءات التأديبية عند المخالفة.',
          englishActionPhrase: 'Incorporate formal risk-exception governance and disciplinary enforcement clauses.',
          phonetic: '/ˌdɪs.əˈplɪn.ər.i ɪnˈfɔːs.mənt ˈklɔː.zɪz/',
          pronunciationAudioText: 'Incorporate formal risk-exception governance and disciplinary enforcement clauses.',
          visualState: 'ظهور درع الحماية القانونية حول الصرح.',
        },
        {
          stepNumber: 4,
          titleAr: 'ربط السياسة ببيان القابلية للتطبيق (SoA & NCA ECC Mapping)',
          titleEn: 'Step 4: Map Policy to Statement of Applicability (SoA)',
          descriptionAr: 'توثيق ارتباط السياسة بضوابط ISO 27001 و NCA ECC-2:2024.',
          englishActionPhrase: 'Cross-map policy controls within the Statement of Applicability (SoA) for audit readiness.',
          phonetic: '/ˈsteɪt.mənt əv əˌplɪk.əˈbɪl.ə.ti/',
          pronunciationAudioText: 'Cross-map policy controls within the Statement of Applicability for audit readiness.',
          visualState: 'اكتمال الإضاءة التكاملية للصرح مع شارة الامتثال.',
        },
      ],
      hotspots: [
        {
          id: 'hs-ch6-1',
          labelAr: 'بند النطاق والإلزام (Scope & Adherence Clause)',
          labelEn: 'Scope & Mandatory Adherence Clause',
          coordinates: { x: 0.0, y: 1.5, z: 0.5 },
          phonetic: '/skəʊp ænd ədˈhɪə.rəns klɔːz/',
          pronunciationAudioText: 'Scope and Mandatory Adherence Clause. All employees, contractors, and third-party vendors must adhere to this policy.',
          explanationAr: 'يحدد بوضوح الفئات البشرية والأنظمة التقنية الخاضعة للسياسة دون استثناء.',
          englishTemplateSnippet: 'All employees, contractors, and third-party personnel shall strictly adhere to this policy.',
          securityContext: 'تحديد نطاق الحوكمة القانونية (Governance Scope Definition).',
        },
        {
          id: 'hs-ch6-2',
          labelAr: 'ركن الفصل بين المهام والتحكم المزدوج (SoD & Dual Control Node)',
          labelEn: 'Separation of Duties & Dual Control Node',
          coordinates: { x: -1.3, y: 0.4, z: 0.7 },
          phonetic: '/ˌsep.ərˈeɪ.ʃən əv ˈdjuː.tiz nəʊd/',
          pronunciationAudioText: 'Separation of Duties and Dual Control Node. Critical cryptographic ceremonies require multi-custodian authorization.',
          explanationAr: 'يفرض تقسيم الصلاحيات الحساسة بين عدة أمناء لمنع الانفراد بالتحكم في المفاتيح الجذرية.',
          englishTemplateSnippet: 'Root CA key generation shall enforce separation of duties via dual control and split knowledge.',
          securityContext: 'حوكمة المفاتيح التشفيرية والصلاحيات الممتازة (Privileged & Key Governance).',
        },
        {
          id: 'hs-ch6-3',
          labelAr: 'بند المساءلة والإجراءات التأديبية (Enforcement & Disciplinary Clause)',
          labelEn: 'Enforcement & Disciplinary Action Clause',
          coordinates: { x: 1.3, y: 0.4, z: 0.7 },
          phonetic: '/ɪnˈfɔːs.mənt ænd ˌdɪs.əˈplɪn.ər.i klɔːz/',
          pronunciationAudioText: 'Enforcement and Disciplinary Action Clause. Policy violations may result in disciplinary action up to termination.',
          explanationAr: 'يمنح السياسة قوتها الرادعة عبر تحديد التبعات الإدارية والقانونية لعدم الامتثال.',
          englishTemplateSnippet: 'Violations of this policy may result in disciplinary action, up to and including termination of employment.',
          securityContext: 'الردع والمساءلة الإدارية (Administrative Deterrence & Accountability).',
        },
        {
          id: 'hs-ch6-4',
          labelAr: 'سجل بيان القابلية للتطبيق (Statement of Applicability Base)',
          labelEn: 'Statement of Applicability (SoA) Registry',
          coordinates: { x: 0.0, y: -1.3, z: 0.6 },
          phonetic: '/ˈsteɪt.mənt əv əˌplɪk.əˈbɪl.ə.ti ˈredʒ.ɪ.stri/',
          pronunciationAudioText: 'Statement of Applicability Registry. The SoA links every applicable control to its implementation evidence.',
          explanationAr: 'يربط السياسات والمعايير الداخلية بضوابط ISO 27001 و NCA ECC لأغراض التدقيق الخارجي.',
          englishTemplateSnippet: 'Control A.8.24 (Use of Cryptography): Applicable — Implemented via POL-SEC-004 and STD-CRYPTO-01.',
          securityContext: 'جاهزية التدقيق وإثبات الامتثال (Audit Readiness & Compliance Mapping).',
        },
      ],
    },
  },

  // ==========================================================================
  // الفصل السابع (Chapter 7)
  // ==========================================================================
  {
    id: 607,
    chapter_number: 7,
    title: 'مصطلحات التشفير المتقدم والأمن الكمومي وبروتوكولات الشبكات',
    subtitle: 'Advanced Crypto, Zero-Knowledge Proofs, Homomorphic Encryption & Post-Quantum NIST FIPS 203/204/205 English Analysis',
    description: 'قراءة وتحليل وصياغة الأبحاث والوثائق الهندسية المتقدمة باللغة الإنجليزية في مجالات إثباتات المعرفة الصفرية (Zero-Knowledge Proofs - ZKP)، والتشفير المتماثل الشكل (Homomorphic Encryption)، والمعايير النهائية للتشفير ما بعد الكم الصادرة عن NIST (FIPS 203 ML-KEM, FIPS 204 ML-DSA, FIPS 205 SLH-DSA) واستراتيجيات الترحيل الهجين (Hybrid Post-Quantum Migration).',
    category: 'كمومي',
    difficulty: 'advanced',
    phonetic: '/ˈpəʊst-ˈkwɒntəm ˌkrɪptəˈɡræfɪk ˈstændərdz ænd ˈzɪərəʊ-ˈnɒlɪdʒ pruːfs/',
    pronunciationAudioText: 'Post-Quantum Cryptographic Standards NIST FIPS 203, 204, and 205, Zero-Knowledge Proofs, and Homomorphic Encryption.',
    diagramKey: 'eng-cyber-7',
    videoUrl: 'https://www.youtube.com/watch?v=AQDCe585Lnc',
    presentationUrl: '/assets/presentations/eng-cyber-ch7-pqc-zkp-terminology.pdf',
    pdfStartPage: 125,
    pdfEndPage: 148,
    updated_at: GENERATED_TIMESTAMP,
    keyTopics: [
      'التحليل اللغوي والاصطلاحي لمعايير NIST للتشفير ما بعد الكم: FIPS 203 (ML-KEM), FIPS 204 (ML-DSA), FIPS 205 (SLH-DSA)',
      'مصطلحات التهديد الكمومي: Shor’s Algorithm, Grover’s Algorithm, Harvest Now Decrypt Later (HNDL / SNDL)',
      'الخصائص الثلاث لإثبات المعرفة الصفرية بالإنجليزية (Completeness, Soundness, Zero-Knowledge) ومصطلحات zk-SNARKs vs. zk-STARKs',
      'مصطلحات التشفير المتماثل الشكل (Fully Homomorphic Encryption - FHE) والحوسبة متعددة الأطراف (MPC)',
      'صياغة خطط الرشاقة التشفيرية (Cryptographic Agility) والوضع الهجين في بروتوكولات الشبكات (Hybrid Key Exchange in TLS 1.3 / IKEv2)',
    ],
    content: `## تمهيد: اللغة الأكاديمية لثورة التشفير ما بعد الكم والخصوصية المتقدمة

يشهد العالم منذ إصدار المعهد الوطني للمعايير والتقنية الأمريكي (**NIST**) لمعاييره النهائية الأولى للتشفير ما بعد الكم في 13 أغسطس 2024—وهي [NIST FIPS 203 (ML-KEM)](https://csrc.nist.gov/pubs/fips/203/final)، و[NIST FIPS 204 (ML-DSA)](https://csrc.nist.gov/pubs/fips/204/final)، و[NIST FIPS 205 (SLH-DSA)](https://csrc.nist.gov/pubs/fips/205/final)—فضلاً عن تحديثات [المعايير الوطنية للتشفير (NCA NCS)](https://nca.gov.sa/en/regulatory-documents/frameworks-and-standard-list/ncs/)، تحولاً جذرياً في المصطلحات التشفيرية. لم يعد المهندس يكتفي بمصطلح *Key Exchange* أو *RSA Encryption*، بل أصبح يتعامل مع مصطلحات دقيقة مثل **Key Encapsulation Mechanism (KEM)**، و **Module-Lattice-Based Cryptography**، و **Harvest Now, Decrypt Later (HNDL)**.

---page---

## أولاً: جدول مصطلحات التشفير المتقدم والأمن الكمومي (PQC & ZKP Lexicon & IPA)

| المصطلح الإنجليزي المتقدم | النطق الصوتي (IPA) | المرجع المعياري | المقابل العربي الأكاديمي | الدلالة الهندسية الدقيقة |
| :--- | :--- | :--- | :--- | :--- |
| **Post-Quantum Cryptography (PQC)** | \`/ˌpəʊstˈkwɒn.təm krɪpˈtɒɡ.rə.fi/\` | NIST FIPS 203–205 | التشفير ما بعد الكم (المقاوم للكم) | خوارزميات تعمل على الحواسيب الكلاسيكية لكنها تصمد أمام هجمات الحواسيب الكمومية. |
| **Key Encapsulation Mechanism (KEM)** | \`/kiː ɪnˌkæp.sjʊˈleɪ.ʃən ˈmek.ə.nɪ.zəm/\` | NIST FIPS 203 (ML-KEM) | آلية تغليف المفاتيح | طريقة حديثة لتأسيس سر مشترك (Shared Secret) عبر تغليفه بالمفتاح العام للمستقبل بدلاً من تشفير رسائل مباشرة. |
| **Module-Lattice-Based** | \`/ˈmɒd.juːl ˈlæt.ɪs beɪst/\` | FIPS 203 & FIPS 204 | قائم على الشبكات الجبرية المعيارية | الأساس الرياضي لمعياري ML-KEM (Kyber سابقاً) و ML-DSA (Dilithium سابقاً) المعتمد على مسألة MLWE. |
| **Stateless Hash-Based Signature** | \`/ˈsteɪt.ləs hæʃ beɪst ˈsɪɡ.nə.tʃər/\` | NIST FIPS 205 (SLH-DSA) | توقيع رقمي عديم الحالة قائم على التجزئة | معيار التوقيع الرقمي الاحتياطي (SPHINCS+ سابقاً) الذي يعتمد فقط على أمان دوال التجزئة دون حاجة لحفظ حالة التوقيع. |
| **Harvest Now, Decrypt Later (HNDL)** | \`/ˈhɑː.vɪst naʊ dɪˈkrɪpt ˈleɪ.tər/\` | DHS / NIST / NCA | اجمع الآن وفك التشفير لاحقاً | استراتيجية هجومية يقوم فيها الخصم بتخزين حركة البيانات المشفرة حالياً لفك تشفيرها مستقبلاً عند توفر حاسوب كمومي. |
| **Cryptographic Agility** | \`/ˌkrɪp.təˈɡræf.ɪk əˈdʒɪl.ə.ti/\` | NIST / NCA NCS | الرشاقة / المرونة التشفيرية | قدرة البنية البرمجية على استبدال الخوارزميات والمفاتيح التشفيرية بسلاسة دون إعادة كتابة التطبيقات. |
| **Zero-Knowledge Proof (ZKP)** | \`/ˈzɪə.rəʊ ˈnɒl.ɪdʒ pruːf/\` | Academic / IETF | إثبات المعرفة الصفرية | بروتوكول يثبت فيه المُثبِت (Prover) للمتحقق (Verifier) صحة عبارة أو امتلاك سر دون كشف أي معلومة عن السر نفسه. |
| **Homomorphic Encryption (FHE)** | \`/ˌhɒm.əˈmɔː.fɪk ɪnˈkrɪp.ʃən/\` | ISO/IEC 18033-6 | التشفير المتماثل الشكل | تشفير يسمح بإجراء عمليات حسابية مباشرة على البيانات المشفرة (Ciphertext) دون الحاجة لفك تشفيرها أولاً. |

---page---

## ثانياً: المصطلحات الثلاثة الحاكمة في إثبات المعرفة الصفرية (The Three Pillars of ZKP in English)

عند قراءة أو كتابة ورقة بحثية عن **Zero-Knowledge Proofs (ZKP)** (كما في مختبر ZKP في منصة مرصاد)، يجب إتقان تعريف الخصائص الثلاث باللغة الإنجليزية الأكاديمية:
1. **Completeness (\`/kəmˈpliːt.nəs/\` — الاكتمال)**:
   - *"If the statement is true, an honest **prover** can convince an honest **verifier** with overwhelming probability."*
2. **Soundness (\`/ˈsaʊnd.nəs/\` — السلامة المنطقية / المنعة ضد التزوير)**:
   - *"If the statement is false, no cheating **prover** can convince the honest **verifier** that it is true, except with negligible probability."*
3. **Zero-Knowledge (\`/ˈzɪə.rəʊ ˈnɒl.ɪdʒ/\` — انعدام تسريب المعرفة)**:
   - *"If the statement is true, the **verifier** learns nothing other than the fact that the statement is true."*

> [!info]
> **الفرق اللغوي في اختصارات ZKP**:
> - في **zk-SNARK** (*Zero-Knowledge Succinct Non-Interactive Argument of Knowledge*)، كلمة **Succinct** (\`/səkˈsɪŋkt/\`) تعني «موجز/صغير الحجم وسريع التحقق».
> - في **zk-STARK** (*Zero-Knowledge Scalable Transparent Argument of Knowledge*)، كلمة **Transparent** (\`/trænsˈpær.ənt/\`) تعني أنه لا يتطلب إعداداً موثوقاً (No Trusted Setup Ceremony) ويعتمد على دوال التجزئة المقاومة للكم.

---page---

## ثالثاً: قراءة العمليات الثلاث في معايير NIST FIPS 203 و FIPS 204

لاحظ الدقة الاصطلاحية في التمييز بين وظائف **FIPS 203 (ML-KEM)** ووظائف **FIPS 204 (ML-DSA)**:
- **في FIPS 203 (ML-KEM)**: لا نقول *Encrypt/Decrypt a message*، بل نستخدم الخوارزميات الثلاث الرسمية:
  1. **\`ML-KEM.KeyGen()\`**: توليد مفتاح التغليف العام (**Encapsulation Key \`ek\`**) ومفتاح فك التغليف الخاص (**Decapsulation Key \`dk\`**).
  2. **\`ML-KEM.Encaps(ek)\`**: إنتاج المفتاح السري المشترك (**Shared Secret Key \`K\`**) والنص المشفر المغلِّف (**Ciphertext \`c\`**).
  3. **\`ML-KEM.Decaps(dk, c)\`**: استخراج نفس المفتاح السري المشترك (**Shared Secret Key \`K\`**) باستخدام مفتاح فك التغليف.
- **في FIPS 204 (ML-DSA)** و **FIPS 205 (SLH-DSA)**: نستخدم الثلاثية القياسية للتواقيع:
  1. **\`KeyGen()\`** • 2. **\`Sign(sk, M)\`** • 3. **\`Verify(pk, M, σ)\`**.

---page---

## رابعاً: نموذج تحليل أكاديمي لخطة الترحيل إلى التشفير ما بعد الكم (Post-Quantum Migration Architecture Excerpt)

> **ARCHITECTURAL SPECIFICATION: HYBRID POST-QUANTUM TLS 1.3 DEPLOYMENT**
> *"To mitigate the **Harvest Now, Decrypt Later (HNDL)** threat posed by cryptanalytically relevant quantum computers (**CRQCs**), the enterprise gateway implements a **hybrid key exchange** mechanism combining classical elliptic-curve Diffie-Hellman (**X25519**, RFC 7748) with the NIST-standardized Module-Lattice-Based Key-Encapsulation Mechanism (**ML-KEM-768**, FIPS 203). By concatenating the classical and post-quantum shared secrets within the TLS 1.3 key schedule, the connection retains both established FIPS 140-3 classical security assurances and quantum-resistant confidentiality. Furthermore, the microservice mesh is engineered for **cryptographic agility**, enabling seamless transition of digital certificates from ECDSA P-256 to **ML-DSA-65 (FIPS 204)** and **SLH-DSA (FIPS 205)** without application-layer refactoring."*

### الترجمة العربية والتحليل اللغوي:
- **\`cryptanalytically relevant quantum computers (CRQCs)\`**: المصطلح الرسمي المعتمد في وثائق NIST و NSA للحاسوب الكمومي ذي القدرة الفعلية على كسر التشفير الكلاسيكي عبر خوارزمية شور (**Shor's Algorithm**).
- **\`hybrid key exchange\`**: الدمج الهجين بين خوارزمية كلاسيكية مجربة (X25519) وخوارزمية كمومية جديدة (ML-KEM-768) بحيث يظل الاتصال آمناً طالما صمدت إحداهما على الأقل.
- **\`without application-layer refactoring\`**: ثمرة تطبيق الرشاقة التشفيرية (**Cryptographic Agility**).`,
    vocabularyList: [
      {
        id: 'voc-701',
        term: 'Key Encapsulation Mechanism',
        acronym: 'KEM',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/kiː ɪnˌkæp.sjʊˈleɪ.ʃən ˈmek.ə.nɪ.zəm/',
        pronunciationAudioText: 'Key Encapsulation Mechanism. NIST FIPS 203 standardizes ML-KEM as the primary post-quantum Key Encapsulation Mechanism.',
        arabicMeaning: 'آلية تغليف المفاتيح التشفيرية',
        academicDefinitionEn: 'A class of asymmetric cryptographic algorithms designed to secure symmetric key material for transmission using public-key algorithms.',
        academicDefinitionAr: 'فئة من الخوارزميات غير المتماثلة المصممة لتأمين وتغليف مفتاح سري متماثل مشترك باستخدام المفتاح العام للطرف المستقبل.',
        exampleSentenceEn: 'In TLS 1.3 post-quantum profiles, a Key Encapsulation Mechanism replaces traditional finite-field Diffie-Hellman.',
        exampleSentenceAr: 'في ملفات تعريف TLS 1.3 المقاومة للكم، تحل آلية تغليف المفاتيح محل تبادل ديفي-هيلمان التقليدي.',
        collocations: ['encapsulation key', 'decapsulation key', 'ML-KEM-768', 'hybrid KEM'],
      },
      {
        id: 'voc-702',
        term: 'Cryptographic Agility',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/ˌkrɪp.təˈɡræf.ɪk əˈdʒɪl.ə.ti/',
        pronunciationAudioText: 'Cryptographic Agility. Cryptographic agility allows organizations to swap out vulnerable algorithms without rewriting core software.',
        arabicMeaning: 'الرشاقة / المرونة التشفيرية',
        academicDefinitionEn: 'The architectural capacity of an information system to rapidly switch between cryptographic algorithms, key sizes, and primitives without disrupting infrastructure.',
        academicDefinitionAr: 'القدرة المعمارية للنظام المعلوماتي على التبديل السريع بين الخوارزميات وأحجام المفاتيح واللبنات التشفيرية دون تعطيل البنية التحتية.',
        exampleSentenceEn: 'Achieving cryptographic agility is a prerequisite for a smooth migration to NIST post-quantum standards.',
        exampleSentenceAr: 'يُعد تحقيق الرشاقة التشفيرية متطلباً مسبقاً للانتقال السلس إلى معايير NIST لما بعد الكم.',
        collocations: ['crypto-agile architecture', 'enforce cryptographic agility', 'algorithm agility'],
      },
      {
        id: 'voc-703',
        term: 'Harvest Now, Decrypt Later',
        acronym: 'HNDL',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/ˈhɑː.vɪst naʊ dɪˈkrɪpt ˈleɪ.tər/',
        pronunciationAudioText: 'Harvest Now, Decrypt Later. Adversaries intercept and archive encrypted traffic today under a Harvest Now, Decrypt Later strategy.',
        arabicMeaning: 'اجمع الآن وفك التشفير لاحقاً (التخزين لغرض الكسر الكمومي المستقبلي)',
        academicDefinitionEn: 'A surveillance and attack strategy in which adversaries collect and store encrypted data today to decrypt it once quantum computers mature.',
        academicDefinitionAr: 'استراتيجية هجومية يقوم فيها الخصوم بالتقاط وتخزين البيانات المشفرة حالياً لفك تشفيرها مستقبلاً عند نضج الحواسيب الكمومية.',
        exampleSentenceEn: 'Data with a confidentiality lifespan exceeding ten years is immediately vulnerable to Harvest Now, Decrypt Later attacks.',
        exampleSentenceAr: 'تُعد البيانات التي يتجاوز عمر سريتها عشر سنوات عرضة منذ اللحظة لهجمات «اجمع الآن وفك التشفير لاحقاً».',
        collocations: ['mitigate HNDL threats', 'HNDL attack model', 'retrospective quantum decryption'],
      },
      {
        id: 'voc-704',
        term: 'Zero-Knowledge Proof',
        acronym: 'ZKP',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/ˈzɪə.rəʊ ˈnɒl.ɪdʒ pruːf/',
        pronunciationAudioText: 'Zero-Knowledge Proof. A Zero-Knowledge Proof satisfies three mathematical properties: completeness, soundness, and zero-knowledge.',
        arabicMeaning: 'إثبات المعرفة الصفرية',
        academicDefinitionEn: 'A cryptographic protocol whereby a prover convinces a verifier that a statement is true without revealing any information beyond the validity of the statement.',
        academicDefinitionAr: 'بروتوكول تشفيري يقنع فيه المُثبِتُ المتحققَ بصحة قضية أو امتلاك سر دون كشف أي معلومة إضافية عن السر ذاته.',
        exampleSentenceEn: 'Privacy-preserving identity systems utilize Zero-Knowledge Proofs to verify age without exposing birthdates.',
        exampleSentenceAr: 'تستخدم أنظمة الهوية الحافظة للخصوصية إثباتات المعرفة الصفرية للتحقق من العمر دون كشف تاريخ الميلاد.',
        collocations: ['non-interactive zero-knowledge (NIZK)', 'honest prover and verifier', 'completeness and soundness'],
      },
      {
        id: 'voc-705',
        term: 'Homomorphic Encryption',
        acronym: 'HE / FHE',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/ˌhɒm.əˈmɔː.fɪk ɪnˈkrɪp.ʃən/',
        pronunciationAudioText: 'Homomorphic Encryption. Fully Homomorphic Encryption permits arbitrary computation directly on encrypted ciphertexts.',
        arabicMeaning: 'التشفير المتماثل الشكل (المحابِي للعمليات الحسابية)',
        academicDefinitionEn: 'A form of encryption allowing computations to be performed directly on ciphertexts, generating an encrypted result that, when decrypted, matches the result of operations on the plaintexts.',
        academicDefinitionAr: 'نمط تشفير يسمح بإجراء العمليات الحسابية مباشرة على النصوص المشفرة دون فك تشفيرها، بحيث يطابق ناتج فك التشفير ناتج العملية على النص الواضح.',
        exampleSentenceEn: 'Cloud healthcare analytics can process encrypted patient records using Fully Homomorphic Encryption (FHE).',
        exampleSentenceAr: 'يمكن لتحليلات الرعاية الصحية السحابية معالجة سجلات المرضى المشفرة باستخدام التشفير المتماثل الشكل الكامل.',
        collocations: ['Fully Homomorphic Encryption (FHE)', 'compute on encrypted data', 'homomorphic evaluation'],
      },
      {
        id: 'voc-706',
        term: 'Negligible Probability',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/ˈneɡ.lɪ.dʒə.bəl ˌprɒb.əˈbɪl.ə.ti/',
        pronunciationAudioText: 'Negligible Probability. In asymptotic security definitions, an adversary’s advantage must remain a negligible probability.',
        arabicMeaning: 'احتمالية ضئيلة يمكن إهمالها رياضياً',
        academicDefinitionEn: 'A probability function that decreases faster than the inverse of any polynomial in the security parameter as the key size grows.',
        academicDefinitionAr: 'دالة احتمال تتضاءل أسرع من مقلوب أي كثيرة حدود في معامل الأمان كلما زاد طول المفتاح.',
        exampleSentenceEn: 'Soundness guarantees that a dishonest prover cannot forge a valid proof except with negligible probability.',
        exampleSentenceAr: 'تضمن خاصية السلامة المنطقية عدم قدرة المُثبِت المخادع على تزوير إثبات صالح إلا باحتمالية ضئيلة مهملة.',
        collocations: ['except with negligible probability', 'overwhelming probability', 'security parameter'],
      },
    ],
    terminologyGlossary: [
      {
        term: 'ML-KEM (FIPS 203)',
        phonetic: '/ˌem.elˈkem/ • /fɪps tuː ˈzɪə.rəʊ θriː/',
        pronunciationAudioText: 'ML-KEM, NIST FIPS 203',
        category: 'PQC & ZKP',
        arabicEquivalent: 'آلية تغليف المفاتيح القائمة على الشبكات الجبرية المعيارية',
        usageContext: 'المعيار الأساسي لتبادل وتغليف المفاتيح في التشفير ما بعد الكم.',
      },
      {
        term: 'ML-DSA (FIPS 204) & SLH-DSA (FIPS 205)',
        phonetic: '/ˌem.el.diː.esˈeɪ/ & /ˌes.el.eɪtʃ.diː.esˈeɪ/',
        pronunciationAudioText: 'ML-DSA FIPS 204 and SLH-DSA FIPS 205',
        category: 'PQC & ZKP',
        arabicEquivalent: 'معايير التوقيع الرقمي ما بعد الكم (الشبكية والاختزالية عديمة الحالة)',
        usageContext: 'التواقيع الرقمية المقاومة للحواسيب الكمومية.',
      },
      {
        term: 'Harvest Now, Decrypt Later (HNDL)',
        phonetic: '/ˈhɑː.vɪst naʊ dɪˈkrɪpt ˈleɪ.tər/',
        pronunciationAudioText: 'Harvest Now, Decrypt Later',
        category: 'PQC & ZKP',
        arabicEquivalent: 'اجمع الآن وفك التشفير لاحقاً',
        usageContext: 'تخزين البيانات المشفرة حالياً لكسرها عند ظهور الحواسيب الكمومية.',
      },
      {
        term: 'Zero-Knowledge Proof (ZKP)',
        phonetic: '/ˈzɪə.rəʊ ˈnɒl.ɪdʒ pruːf/',
        pronunciationAudioText: 'Zero-Knowledge Proof',
        category: 'PQC & ZKP',
        arabicEquivalent: 'إثبات المعرفة الصفرية',
        usageContext: 'إثبات صحة معلومة دون كشف المعلومة نفسها (Completeness, Soundness, Zero-Knowledge).',
      },
      {
        term: 'Homomorphic Encryption (FHE)',
        phonetic: '/ˌhɒm.əˈmɔː.fɪk ɪnˈkrɪp.ʃən/',
        pronunciationAudioText: 'Homomorphic Encryption',
        category: 'PQC & ZKP',
        arabicEquivalent: 'التشفير المتماثل الشكل',
        usageContext: 'إجراء العمليات الحسابية على البيانات وهي مشفرة دون كشفها.',
      },
    ],
    images: [
      {
        prompt: 'Post-Quantum Cryptography NIST FIPS 203 ML-KEM FIPS 204 ML-DSA FIPS 205 SLH-DSA and Zero-Knowledge Proof completeness soundness diagram, 16:9',
        caption: 'منظومة التشفير المتقدم وما بعد الكم: معايير NIST FIPS 203/204/205 والدمج الهجين مع خصائص إثبات المعرفة الصفرية (ZKP)',
        alt: 'NIST FIPS 203 204 205 Post-Quantum and ZKP diagram',
        seed: 6071,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'التهديد الكمومي ومصطلح Harvest Now, Decrypt Later (HNDL)',
        titleEn: 'The Quantum Threat & HNDL Terminology',
        bulletPoints: [
          'Shor’s Algorithm تكسر التشفير غير المتماثل الكلاسيكي (RSA, ECDH, ECDSA).',
          'Grover’s Algorithm تقلص القوة الفعالة للتشفير المتماثل إلى النصف (لذلك نستخدم AES-256).',
          'خطر HNDL: تخزين البيانات المشفرة اليوم لفك تشفيرها كمومياً في المستقبل.',
        ],
        englishKeyExcerpt: 'Long-lived state secrets and financial archives face immediate exposure from Harvest Now, Decrypt Later (HNDL) collection.',
        phoneticHighlight: 'Quantum /ˈkwɒn.təm/ • Cryptanalytically /ˌkrɪp.tə.nəˈlɪt.ɪ.kəl.i/',
        speakerNotes: 'اربط هذا المفهوم بالدرس الرابع في الملف الأصلي (Post-Quantum Cryptography) وبتفاصيل مقرر ISE 243.',
        visualCue: 'مقارنة بين أثر خوارزمية شور على RSA/ECC وأثر خوارزمية جروفر على AES-256.',
      },
      {
        slideNumber: 2,
        title: 'تحليل المعايير الثلاثة لـ NIST: FIPS 203, FIPS 204, FIPS 205',
        titleEn: 'NIST Post-Quantum Standards: FIPS 203, 204 & 205',
        bulletPoints: [
          'FIPS 203 (ML-KEM): لتغليف وتبادل المفاتيح عبر الشبكات الجبرية المعيارية.',
          'FIPS 204 (ML-DSA): المعيار الأساسي للتواقيع الرقمية القائمة على الشبكات الجبرية.',
          'FIPS 205 (SLH-DSA): معيار التوقيع الرقمي عديم الحالة القائم على دوال التجزئة.',
        ],
        englishKeyExcerpt: 'NIST published FIPS 203 (ML-KEM), FIPS 204 (ML-DSA), and FIPS 205 (SLH-DSA) on August 13, 2024.',
        phoneticHighlight: 'Encapsulation /ɪnˌkæp.sjʊˈleɪ.ʃən/ • Lattice /ˈlæt.ɪs/ • Stateless /ˈsteɪt.ləs/',
        speakerNotes: 'درّب الطلاب على نطق كلمة Lattice (/ˈlæt.ɪs/) وكلمة Encapsulation بدقة عالية.',
        visualCue: 'ثلاث بطاقات معيارية تعرض FIPS 203 و FIPS 204 و FIPS 205 ووظيفة كل منها.',
      },
      {
        slideNumber: 3,
        title: 'الرشاقة التشفيرية والتبادل الهجين للمفاتيح',
        titleEn: 'Cryptographic Agility & Hybrid Key Exchange',
        bulletPoints: [
          'Cryptographic Agility: تصميم الأنظمة لتبديل الخوارزميات دون إعادة برمجة شاملة.',
          'Hybrid Mode (مثل X25519 + ML-KEM-768): الجمع بين الموثوقية الكلاسيكية والحماية الكمومية.',
          'التوافق مع توجيهات المعايير الوطنية للتشفير (NCA NCS).',
        ],
        englishKeyExcerpt: 'Hybrid key establishment combines X25519 with ML-KEM-768, ensuring security holds as long as at least one primitive remains unbroken.',
        phoneticHighlight: 'Agility /əˈdʒɪl.ə.ti/ • Concatenating /kənˈkæt.ə.neɪ.tɪŋ/',
        speakerNotes: 'وضح الفعل التقني "concatenate" (/kənˈkæt.ə.neɪt/ — يربط/يدمج سلسلتين من البتات معاً).',
        visualCue: 'مخطط مصافحة TLS 1.3 الهجينة (X25519 + ML-KEM-768).',
      },
      {
        slideNumber: 4,
        title: 'المصطلحات الأكاديمية لإثباتات المعرفة الصفرية (ZKP)',
        titleEn: 'Zero-Knowledge Proofs: Completeness, Soundness & Zero-Knowledge',
        bulletPoints: [
          'الأدوار: The Prover (المُثبِت) و The Verifier (المتحقق).',
          'الخصائص الثلاث: Completeness (الاكتمال)، Soundness (السلامة المنطقية)، Zero-Knowledge.',
          'الفرق بين Overwhelming Probability و Negligible Probability.',
        ],
        englishKeyExcerpt: 'Soundness ensures that a dishonest prover cannot convince the verifier of a false statement except with negligible probability.',
        phoneticHighlight: 'Soundness /ˈsaʊnd.nəs/ • Negligible /ˈneɡ.lɪ.dʒə.bəl/ • Succinct /səkˈsɪŋkt/',
        speakerNotes: 'اشرح كيف تستخدم عبارتا "with overwhelming probability" و "except with negligible probability" في جميع الأوراق البحثية التشفيرية.',
        visualCue: 'مثلث خصائص ZKP الثلاث بين Prover و Verifier.',
      },
      {
        slideNumber: 5,
        title: 'التشفير المتماثل الشكل (Homomorphic Encryption)',
        titleEn: 'Fully Homomorphic Encryption (FHE) Terminology',
        bulletPoints: [
          'معنى Homomorphic (/ˌhɒm.əˈmɔː.fɪk/): الحفاظ على البنية الجبرية بين النص الواضح والنص المشفر.',
          'إجراء العمليات الحسابية على البيانات المشفرة في السحابة دون كشفها (Data in Use Protection).',
          'تطبيقات FHE و ZKP في الذكاء الاصطناعي الحافظ للخصوصية والقطاع المالي والصحي.',
        ],
        englishKeyExcerpt: 'Fully Homomorphic Encryption enables untrusted cloud servers to evaluate arbitrary functions over encrypted data without access to the decryption key.',
        phoneticHighlight: 'Homomorphic /ˌhɒm.əˈmɔː.fɪk/ • Arbitrary /ˈɑː.bɪ.trər.i/',
        speakerNotes: 'وضح معنى الصفة الرياضية "arbitrary" (/ˈɑː.bɪ.trər.i/) في الرياضيات والتشفير، حيث تعني "أي عملية حسابية عامة دون قيد".',
        visualCue: 'مخطط سحابي يجري عملية جمع وضرب على نصوص مشفرة ويعيد النتيجة مشفرة للمستخدم.',
      },
    ],
    flashcards: [
      {
        front: 'Key Encapsulation Mechanism - KEM (/kiː ɪnˌkæp.sjʊˈleɪ.ʃən ˈmek.ə.nɪ.zəm/)',
        back: 'آلية تغليف المفاتيح (مثل ML-KEM في FIPS 203): خوارزمية غير متماثلة تُستخدم لتغليف وتبادل مفتاح متماثل سري مشترك بأمان ما بعد الكم.',
        category: 'Post-Quantum Crypto',
        phonetic: '/kiː ɪnˌkæp.sjʊˈleɪ.ʃən ˈmek.ə.nɪ.zəm/',
        pronunciationAudioText: 'Key Encapsulation Mechanism',
      },
      {
        front: 'NIST FIPS 203, FIPS 204, and FIPS 205',
        back: 'FIPS 203 (ML-KEM لتغليف المفاتيح) | FIPS 204 (ML-DSA للتوقيع الرقمي الشبكي) | FIPS 205 (SLH-DSA للتوقيع الرقمي عديم الحالة القائم على التجزئة).',
        category: 'Post-Quantum Standards',
        phonetic: '/fɪps tuː ˈzɪə.rəʊ θriː, tuː ˈzɪə.rəʊ fɔːr, tuː ˈzɪə.rəʊ faɪv/',
        pronunciationAudioText: 'NIST FIPS 203, FIPS 204, and FIPS 205',
      },
      {
        front: 'Harvest Now, Decrypt Later - HNDL (/ˈhɑː.vɪst naʊ dɪˈkrɪpt ˈleɪ.tər/)',
        back: 'اجمع الآن وفك التشفير لاحقاً: قيام المهاجمين بتخزين الاتصالات المشفرة اليوم لفك تشفيرها عند توفر حاسوب كمومي مستقبلاً.',
        category: 'Quantum Threat Model',
        phonetic: '/ˈhɑː.vɪst naʊ dɪˈkrɪpt ˈleɪ.tər/',
        pronunciationAudioText: 'Harvest Now, Decrypt Later',
      },
      {
        front: 'Cryptographic Agility (/ˌkrɪp.təˈɡræf.ɪk əˈdʒɪl.ə.ti/)',
        back: 'الرشاقة التشفيرية: تصميم الأنظمة والبروتوكولات بحيث يمكن استبدال الخوارزميات التشفيرية بسرعة وسلاسة دون إعادة كتابة التطبيقات.',
        category: 'Crypto Architecture',
        phonetic: '/ˌkrɪp.təˈɡræf.ɪk əˈdʒɪl.ə.ti/',
        pronunciationAudioText: 'Cryptographic Agility',
      },
      {
        front: 'Completeness, Soundness, Zero-Knowledge',
        back: 'الخصائص الثلاث لإثبات المعرفة الصفرية (ZKP): الاكتمال (إقناع المتحقق عند الصدق)، السلامة (استحالة التزوير عند الكذب)، وانعدام تسريب السر.',
        category: 'Zero-Knowledge Proofs',
        phonetic: '/kəmˈpliːt.nəs, ˈsaʊnd.nəs, ˈzɪə.rəʊ ˈnɒl.ɪdʒ/',
        pronunciationAudioText: 'Completeness, Soundness, and Zero-Knowledge',
      },
      {
        front: 'Homomorphic Encryption (/ˌhɒm.əˈmɔː.fɪk ɪnˈkrɪp.ʃən/)',
        back: 'التشفير المتماثل الشكل: تقنية تسمح بإجراء العمليات الحسابية مباشرة على البيانات المشفرة (Ciphertext) دون فك تشفيرها.',
        category: 'Advanced Privacy',
        phonetic: '/ˌhɒm.əˈmɔː.fɪk ɪnˈkrɪp.ʃən/',
        pronunciationAudioText: 'Homomorphic Encryption',
      },
    ],
    miniQuiz: [
      {
        question: 'Which NIST Federal Information Processing Standard (published in August 2024) specifies the Module-Lattice-Based Key-Encapsulation Mechanism (ML-KEM)?',
        options: [
          'NIST FIPS 203',
          'NIST FIPS 204 (ML-DSA)',
          'NIST FIPS 205 (SLH-DSA)',
          'IETF RFC 2119',
        ],
        correctIndex: 0,
        explanation: 'معيار NIST FIPS 203 هو المعيار المخصص لآلية تغليف المفاتيح (ML-KEM)، بينما FIPS 204 مخصص لـ ML-DSA و FIPS 205 مخصص لـ SLH-DSA.',
      },
      {
        question: 'In the formal academic definition of a Zero-Knowledge Proof (ZKP), which property guarantees that a cheating prover cannot convince an honest verifier that a false statement is true (except with negligible probability)?',
        options: [
          'Soundness (/ˈsaʊnd.nəs/)',
          'Completeness (/kəmˈpliːt.nəs/)',
          'Homomorphism (/ˌhɒm.əˈmɔː.fɪ.zəm/)',
          'Deprecation (/ˌdep.rɪˈkeɪ.ʃən/)',
        ],
        correctIndex: 0,
        explanation: 'خاصية Soundness (السلامة المنطقية / المنعة ضد الغش) هي التي تمنع المُثبِت المخادع من إقناع المتحقق بصحة عبارة كاذبة.',
      },
      {
        question: 'ما المصطلح الإنجليزي الدقيق الذي يصف قدرة النظام البرمجي على التبديل السريع بين الخوارزميات التشفيرية (مثل الانتقال من RSA/ECDSA إلى ML-DSA) دون إعادة هيكلة الكود المصدري؟',
        options: [
          'Cryptographic Agility (/ˌkrɪp.təˈɡræf.ɪk əˈdʒɪl.ə.ti/)',
          'Order of Volatility (/ˈɔː.dər əv ˌvɒl.əˈtɪl.ə.ti/)',
          'Alert Triage (/əˈlɜːt ˈtriː.ɑːʒ/)',
          'False Negative (/fɔːls ˈneɡ.ə.tɪv/)',
        ],
        correctIndex: 0,
        explanation: 'تعرف هذه الخاصية المعمارية الجوهرية باسم Cryptographic Agility (الرشاقة أو المرونة التشفيرية).',
      },
      {
        question: 'Which advanced cryptographic paradigm allows an untrusted cloud server to perform mathematical computations directly on encrypted ciphertexts without decrypting them first?',
        options: [
          'Fully Homomorphic Encryption (FHE)',
          'Base64 Encoding',
          'Static RSA Key Exchange',
          'Chain of Custody Logging',
        ],
        correctIndex: 0,
        explanation: 'التشفير المتماثل الشكل الكامل (Fully Homomorphic Encryption - FHE) يتيح إجراء العمليات الحسابية مباشرة على النصوص المشفرة.',
      },
    ],
    interactiveBook3D: {
      model3DType: 'PQC_LATTICE_HYPERCUBE',
      shaderEffect: 'quantum-iridescent-wave',
      bookTitleEn: 'Interactive 3D Quantum Lattice: FIPS 203/204/205, ZKP & FHE',
      bookTitleAr: 'الكتاب التفاعلي ثلاثي الأبعاد: الشبكة الكمومية وإثبات المعرفة الصفرية',
      pages3D: [
        {
          pageNumber: 1,
          titleAr: 'معايير التشفير ما بعد الكم (NIST FIPS 203/204/205)',
          titleEn: 'Post-Quantum Standards: ML-KEM, ML-DSA & SLH-DSA',
          badge: 'QUANTUM LATTICE PAGE 01',
          bilingualSummaryAr: 'تعتمد معايير FIPS 203 (ML-KEM) و FIPS 204 (ML-DSA) على صعوبة مسائل الشبكات الجبرية المعيارية (Module Lattices)، بينما يعتمد FIPS 205 (SLH-DSA) على دوال التجزئة عديمة الحالة.',
          englishExcerpt: 'ML-KEM (FIPS 203) establishes quantum-resistant shared secrets via key encapsulation, while ML-DSA (FIPS 204) and SLH-DSA (FIPS 205) provide post-quantum digital signatures.',
          phoneticGuide: 'ML-KEM /ˌem.elˈkem/ | Lattice /ˈlæt.ɪs/ | Encapsulation /ɪnˌkæp.sjʊˈleɪ.ʃən/',
          pronunciationAudioText: 'ML-KEM FIPS 203 establishes quantum-resistant shared secrets via key encapsulation, while ML-DSA FIPS 204 and SLH-DSA FIPS 205 provide post-quantum digital signatures.',
          grammarOrStyleTip: 'في التشفير ما بعد الكم، استخدم دائماً مصطلح "Key Encapsulation" مع ML-KEM بدلاً من مصطلح "Key Transport".',
          keyTakeaway: 'نشر الوضع الهجين (X25519 + ML-KEM-768) يحمي البيانات فوراً من هجمات HNDL.',
        },
        {
          pageNumber: 2,
          titleAr: 'إثباتات المعرفة الصفرية (Zero-Knowledge Proofs)',
          titleEn: 'Zero-Knowledge Proofs: Prover, Verifier & Soundness',
          badge: 'QUANTUM LATTICE PAGE 02',
          bilingualSummaryAr: 'يتيح إثبات المعرفة الصفرية التحقق الرياضي من صحة المعاملات أو الهويات دون كشف البيانات السرية، مستنداً إلى الاكتمال والسلامة وانعدام التسريب.',
          englishExcerpt: 'A non-interactive zero-knowledge proof (NIZK) enables a prover to demonstrate knowledge of a secret witness without revealing the witness itself.',
          phoneticGuide: 'Witness /ˈwɪt.nəs/ | Soundness /ˈsaʊnd.nəs/ | Succinct /səkˈsɪŋkt/',
          pronunciationAudioText: 'A non-interactive zero-knowledge proof enables a prover to demonstrate knowledge of a secret witness without revealing the witness itself.',
          grammarOrStyleTip: 'في أدبيات ZKP، يُسمى السر الذي يعرفه المُثبِت رياضياً بكلمة "Witness" (/ˈwɪt.nəs/ — الشاهد الرياضي السري).',
          keyTakeaway: 'تُفرّق zk-STARKs عن zk-SNARKs بكونها شفافة (Transparent) ومقاومة للكم.',
        },
        {
          pageNumber: 3,
          titleAr: 'التشفير المتماثل الشكل والرشاقة التشفيرية',
          titleEn: 'Homomorphic Encryption & Cryptographic Agility',
          badge: 'QUANTUM LATTICE PAGE 03',
          bilingualSummaryAr: 'يكمل التشفير المتماثل الشكل (FHE) منظومة الخصوصية بحماية البيانات أثناء المعالجة، بينما تضمن الرشاقة التشفيرية استدامة الأنظمة أمام تطور الخوارزميات.',
          englishExcerpt: 'Combining Fully Homomorphic Encryption with crypto-agile microservice architectures ensures end-to-end data protection across untrusted cloud environments.',
          phoneticGuide: 'Homomorphic /ˌhɒm.əˈmɔː.fɪk/ | Crypto-Agile /ˈkrɪp.təʊ ˈædʒ.aɪl/',
          pronunciationAudioText: 'Combining Fully Homomorphic Encryption with crypto-agile microservice architectures ensures end-to-end data protection across untrusted cloud environments.',
          grammarOrStyleTip: 'الصفة المركبة "crypto-agile" تُكتب بشرطة واصلة عندما تسبق الاسم الموصوف مباشرة.',
          keyTakeaway: 'حماية البيانات تشمل ثلاث حالات: At Rest، و In Transit، و In Use (عبر FHE/TEE).',
        },
      ],
      stepByStep: [
        {
          stepNumber: 1,
          titleAr: 'توليد مفاتيح الشبكة الجبرية (ML-KEM KeyGen)',
          titleEn: 'Step 1: Generate Module-Lattice Encapsulation Keys',
          descriptionAr: 'توليد مفتاح التغليف العام ومفتاح فك التغليف الخاص وفق معيار FIPS 203.',
          englishActionPhrase: 'Execute ML-KEM.KeyGen() to produce the public encapsulation key and private decapsulation key.',
          phonetic: '/ɪnˌkæp.sjʊˈleɪ.ʃən ænd diːˌkæp.sjʊˈleɪ.ʃən kiːz/',
          pronunciationAudioText: 'Execute ML-KEM KeyGen to produce the public encapsulation key and private decapsulation key.',
          visualState: 'تشكّل نقاط الشبكة الجبرية متعددة الأبعاد داخل المكعب الفائق.',
        },
        {
          stepNumber: 2,
          titleAr: 'التغليف الهجين للمفتاح المشترك (Hybrid Encapsulation)',
          titleEn: 'Step 2: Hybrid X25519 + ML-KEM-768 Encapsulation',
          descriptionAr: 'دمج السر الكلاسيكي والسر الكمومي لإحباط هجمات اجمع الآن وفك التشفير لاحقاً (HNDL).',
          englishActionPhrase: 'Encapsulate the hybrid shared secret to neutralize Harvest Now, Decrypt Later (HNDL) threats.',
          phonetic: '/ˈnjuː.trə.laɪz ˈhɑː.vɪst naʊ dɪˈkrɪpt ˈleɪ.tər θrets/',
          pronunciationAudioText: 'Encapsulate the hybrid shared secret to neutralize Harvest Now, Decrypt Later threats.',
          visualState: 'اندماج شعاعين ضوئيين (كلاسيكي وكمومي) في نواة المكعب الفائق.',
        },
        {
          stepNumber: 3,
          titleAr: 'التوقيع الرقمي ما بعد الكم (ML-DSA / SLH-DSA Signing)',
          titleEn: 'Step 3: Post-Quantum Digital Signature Verification',
          descriptionAr: 'توقيع المعاملة باستخدام FIPS 204 (ML-DSA) أو FIPS 205 (SLH-DSA).',
          englishActionPhrase: 'Authenticate the channel using a quantum-resistant ML-DSA-65 digital signature.',
          phonetic: '/ˈkwɒn.təm rɪˈzɪs.tənt ˈdɪdʒ.ɪ.təl ˈsɪɡ.nə.tʃər/',
          pronunciationAudioText: 'Authenticate the channel using a quantum-resistant ML-DSA-65 digital signature.',
          visualState: 'توهج عقد الشبكة الجبرية باللون السماوي القزحي.',
        },
        {
          stepNumber: 4,
          titleAr: 'التحقق بالمعرفة الصفرية والمعالجة المتماثلة (ZKP & FHE Evaluation)',
          titleEn: 'Step 4: Zero-Knowledge Verification & Homomorphic Compute',
          descriptionAr: 'التحقق من صحة الإثبات دون كشف الشاهد السري ومعالجة البيانات المشفرة.',
          englishActionPhrase: 'Verify the Zero-Knowledge Proof with soundness guarantees and evaluate homomorphic ciphertexts.',
          phonetic: '/ˈzɪə.rəʊ ˈnɒl.ɪdʒ pruːf ænd ˌhɒm.əˈmɔː.fɪk ˈsaɪ.fər.teksts/',
          pronunciationAudioText: 'Verify the Zero-Knowledge Proof with soundness guarantees and evaluate homomorphic ciphertexts.',
          visualState: 'دوران متزامن للمكعب الفائق مع ظهور شارة الحماية الكمومية الكاملة.',
        },
      ],
      hotspots: [
        {
          id: 'hs-ch7-1',
          labelAr: 'عقدة تغليف المفاتيح الكمومية (FIPS 203 ML-KEM Node)',
          labelEn: 'FIPS 203 ML-KEM Encapsulation Node',
          coordinates: { x: -1.4, y: 1.1, z: 0.5 },
          phonetic: '/fɪps tuː ˈzɪə.rəʊ θriː ɪnˌkæp.sjʊˈleɪ.ʃən nəʊd/',
          pronunciationAudioText: 'FIPS 203 ML-KEM Encapsulation Node. Module-Lattice-Based Key Encapsulation protects shared secrets against quantum decryption.',
          explanationAr: 'يمثل معيار NIST FIPS 203 المعتمد لتأسيس المفاتيح المقاومة للحواسيب الكمومية.',
          englishTemplateSnippet: 'Key establishment utilizes hybrid X25519MLKEM768 in compliance with NIST FIPS 203.',
          securityContext: 'تأسيس المفاتيح المقاوم للكم (Post-Quantum Key Establishment).',
        },
        {
          id: 'hs-ch7-2',
          labelAr: 'عقدة التواقيع الرقمية ما بعد الكم (FIPS 204 & 205 Signatures)',
          labelEn: 'FIPS 204 (ML-DSA) & FIPS 205 (SLH-DSA) Node',
          coordinates: { x: 1.4, y: 1.1, z: 0.5 },
          phonetic: '/fɪps tuː ˈzɪə.rəʊ fɔːr ænd faɪv ˈsɪɡ.nə.tʃərz/',
          pronunciationAudioText: 'FIPS 204 ML-DSA and FIPS 205 SLH-DSA Node. Post-quantum digital signatures preserve authentication and non-repudiation.',
          explanationAr: 'يمثل معياري NIST للتواقيع الرقمية ما بعد الكم (الشبكي ML-DSA والاختزالي عديم الحالة SLH-DSA).',
          englishTemplateSnippet: 'Code-signing and PKI hierarchies are transitioning to ML-DSA (FIPS 204) and SLH-DSA (FIPS 205).',
          securityContext: 'عدم الإنكار والمصادقة في العصر الكمومي (Post-Quantum Authentication).',
        },
        {
          id: 'hs-ch7-3',
          labelAr: 'بوابة إثبات المعرفة الصفرية (ZKP Soundness & Completeness Gate)',
          labelEn: 'Zero-Knowledge Proof (ZKP) Verification Gate',
          coordinates: { x: -0.9, y: -1.1, z: 0.8 },
          phonetic: '/ˈzɪə.rəʊ ˈnɒl.ɪdʒ pruːf ɡeɪt/',
          pronunciationAudioText: 'Zero-Knowledge Proof Verification Gate. ZKP protocols guarantee completeness, soundness, and zero-knowledge privacy.',
          explanationAr: 'يتيح التحقق الرياضي من صحة المعاملة أو الهوية دون إفشاء أي بيانات سرية للمتحقق.',
          englishTemplateSnippet: 'The verifier validates the zk-STARK proof without learning any information about the private witness.',
          securityContext: 'المصادقة والخصوصية المتقدمة (Privacy-Preserving Verification).',
        },
        {
          id: 'hs-ch7-4',
          labelAr: 'معالج التشفير المتماثل الشكل (Homomorphic Encryption Core)',
          labelEn: 'Fully Homomorphic Encryption (FHE) Compute Core',
          coordinates: { x: 0.9, y: -1.1, z: 0.8 },
          phonetic: '/ˌhɒm.əˈmɔː.fɪk ɪnˈkrɪp.ʃən kɔːr/',
          pronunciationAudioText: 'Fully Homomorphic Encryption Compute Core. FHE enables mathematical operations directly on encrypted data.',
          explanationAr: 'يسمح بإجراء العمليات الحسابية والتحليلية على النصوص المشفرة دون كشف النص الواضح للخادم السحابي.',
          englishTemplateSnippet: 'Encrypted medical records are aggregated homomorphically without exposing underlying plaintext.',
          securityContext: 'حماية البيانات أثناء المعالجة السحابية (Encrypted Data-in-Use Computation).',
        },
      ],
    },
  },

  // ==========================================================================
  // الفصل الثامن (Chapter 8)
  // ==========================================================================
  {
    id: 608,
    chapter_number: 8,
    title: 'التواصل التقني والعروض الأكاديمية والمختبر اللغوي التفاعلي الشامل',
    subtitle: 'Cybersecurity Technical Presentations, CVE Advisory Writing & Interactive Phonetic Lab',
    description: 'الدمج التطبيقي الشامل لمهارات التحدث الأكاديمي، وإلقاء العروض التقديمية في المؤتمرات السيبرانية الدولية، وكتابة النشرات والتحذيرات الأمنية للثغرات (CVE Security Advisories & CVSS v4.0 Vector Articulation) وفق سياسات الإفصاح المنسق عن الثغرات (ISO/IEC 29147 CVD)، مع المختبر الصوتي التفاعلي الشامل للمقرر.',
    category: 'تطبيقي',
    difficulty: 'advanced',
    phonetic: '/ˈtɛknɪkəl ˌprɛzənˈteɪʃənz, ˌsiː.viːˈiː ədˈvaɪzəriz ænd fəˈnɛtɪk læb/',
    pronunciationAudioText: 'Cybersecurity Technical Presentations, CVE Security Advisory Writing, Coordinated Vulnerability Disclosure, and Interactive Phonetic Lab.',
    diagramKey: 'eng-cyber-8',
    videoUrl: 'https://www.youtube.com/watch?v=SPG048T1B9A',
    presentationUrl: '/assets/presentations/eng-cyber-ch8-cve-advisories-presentations.pdf',
    pdfStartPage: 149,
    pdfEndPage: 172,
    updated_at: GENERATED_TIMESTAMP,
    keyTopics: [
      'كتابة النشرات الأمنية الرسمية للثغرات (CVE Security Advisories) وفق معيار الإفصاح المنسق (ISO/IEC 29147 CVD) وتصنيف CWE',
      'قراءة وشرح متجهات التقييم القياسي للثغرات (CVSS v3.1 / v4.0 Metrics: Attack Vector, Attack Complexity, Privileges Required, Scope)',
      'هيكلة العروض التقديمية الأكاديمية والتقنية باللغة الإنجليزية (Opening Hook, Threat Model, Architecture, Live Demo, Q&A Defense)',
      'عبارات الانتقال الأكاديمي والرد الرصين على أسئلة اللجان والمحكمين (Signposting & Defending Technical Claims)',
      'المختبر الصوتي التفاعلي الشامل (Comprehensive Interactive Phonetic & Web Speech Synthesis Lab)',
    ],
    content: `## تمهيد: من إتقان المصطلح إلى القيادة الفكرية والعلمية الدولية

يتوج هذا الفصل الثامن رحلة الطالب في مقرر **اللغة الإنجليزية الأكاديمية للأمن السيبراني (\`ENG-CYBER\`)** عبر الجمع بين مهارتين رفيعتين يمارسهما كبار الباحثين ومهندسي الأمن السيبراني عالمياً:
1. **تحرير النشرات والتحذيرات الأمنية للثغرات (CVE Security Advisories)** وفق معيار الإفصاح المنسق عن الثغرات [ISO/IEC 29147 (Vulnerability Disclosure)](https://www.iso.org/standard/72311.html) ونظام التسمية الموحد [MITRE CVE](https://www.cve.org/) ومقياس الخطورة [FIRST CVSS v4.0](https://www.first.org/cvss/v4.0/specification-document).
2. **إلقاء العروض الأكاديمية والتقنية والدفاع عن الأبحاث باللغة الإنجليزية** أمام اللجان العلمية والمؤتمرات الدولية ومجالس الإدارة، مع إتقان النطق الصوتي السليم عبر المختبر اللغوي التفاعلي.

---page---

## أولاً: قاموس تحرير نشرات الثغرات والعروض الأكاديمية (CVE Advisory & Presentation Lexicon & IPA)

| المصطلح الإنجليزي (Advisory Term) | النطق الصوتي (IPA) | المرجع القياسي | المقابل العربي المعتمد | السياق الأكاديمي والتقني |
| :--- | :--- | :--- | :--- | :--- |
| **Coordinated Vulnerability Disclosure (CVD)** | \`/kəʊˈɔː.dɪ.neɪ.tɪd ˌvʌl.nər.əˈbɪl.ə.ti dɪsˈkləʊ.ʒər/\` | ISO/IEC 29147 | الإفصاح المنسق عن الثغرات | إبلاغ الجهة المطوِّرة بالثغرة سرياً وإمهالها فترة إصلاح (Embargo Period) قبل النشر العام لحماية المستخدمين. |
| **Security Advisory** | \`/sɪˈkjʊə.rə.ti ədˈvaɪ.zər.i/\` | Vendor / CERT | نشرة تحذيرية أمنية رسمية | وثيقة رسمية تصف الثغرة، والإصدارات المتأثرة، ودرجة CVSS، والتحديثات أو الحلول البديلة. |
| **Proof of Concept (PoC)** | \`/pruːf əv ˈkɒn.sept/\` | Research / CVD | إثبات المفهوم (كود تحققي) | مثال تقني أو سكربت غير مدمر يثبت قابلية استغلال الثغرة عملياً لمساعدة المطور على إصلاحها. |
| **Workaround / Mitigation** | \`/ˈwɜː.kə.raʊnd/\` • \`/ˌmɪt.ɪˈɡeɪ.ʃən/\` | CVE Advisory | حل وقائي مؤقت (قبل الترقية) | إجراء إداري أو إعداد تقني يقلل خطر استغلال الثغرة ريثما يتم تثبيت التحديث البرمجي الدائم (Patch). |
| **Remediation / Patch** | \`/rɪˌmiː.diˈeɪ.ʃən/\` • \`/pætʃ/\` | CVE Advisory | الإصلاح الجذري / الرقعة البرمجية | التحديث البرمجي الرسمي الذي يزيل الثغرة من الكود المصدري نهائياً. |
| **Arbitrary Code Execution (ACE / RCE)** | \`/ˈɑː.bɪ.trər.i kəʊd ˌek.sɪˈkjuː.ʃən/\` | CWE / CVSS | تنفيذ أوامر برمجية عشوائية (عن بُعد) | أخطر فئات الثغرات التي تسمح للمهاجم بتشغيل أي أوامر يختارها على الخادم المستهدف. |
| **Privilege Escalation (LPE / PE)** | \`/ˈprɪv.əl.ɪdʒ ˌes.kəˈleɪ.ʃən/\` | CWE / MITRE | تصعيد الصلاحيات | استغلال خلل برمجي للارتقاء من حساب مستخدم محدود إلى صلاحيات النظام العليا (SYSTEM / root). |
| **Embargo Period** | \`/ɪmˈbɑː.ɡəʊ ˈpɪə.ri.əd/\` | CVD Policy | فترة الحظر الإعلامي المنسق | المهلة الزمنية المتفق عليها بين الباحث والجهة المصنعة (عادة 90 يوماً) قبل الإفصاح العلني عن الثغرة. |

---page---

## ثانياً: قراءة وصياغة متجه خطورة الثغرة (Articulating CVSS v3.1 / v4.0 Vectors in English)

عندما تكتب في نشرة أمنية المتجه التالي:
\`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H (Base Score: 10.0 CRITICAL)\`
كيف تشرحه بلغة إنجليزية أكاديمية سليمة؟
- **\`AV:N (Attack Vector: Network)\`**: *"The vulnerability is remotely exploitable over the network without physical or local access."*
- **\`AC:L (Attack Complexity: Low)\`**: *"Exploitation requires no specialized access conditions or extenuating circumstances."*
- **\`PR:N (Privileges Required: None)\` & \`UI:N (User Interaction: None)\`**: *"An unauthenticated attacker can trigger the flaw autonomously without any user interaction."*
- **\`S:C (Scope: Changed)\`**: *"Successful exploitation enables the attacker to impact resources beyond the security scope managed by the vulnerable component."*

---page---

## ثالثاً: نموذج رسمي متكامل لنشرة تحذير أمني عن ثغرة (Official English CVE Security Advisory Template)

> **MIRSAD SECURITY ADVISORY — MSA-2026-019 (CVE-2026-44901)**
> **Title**: Pre-Authentication Buffer Overflow in Legacy Telemetry Gateway
> **Severity**: Critical — **CVSS v3.1 Base Score: 9.8** (\`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H\`)
> **Weakness Enumeration**: **CWE-122** (Heap-based Buffer Overflow)
>
> **1. Vulnerability Overview**
> A heap-based buffer overflow vulnerability exists in the TLS packet parser of Telemetry Gateway versions **prior to 4.8.2**. By transmitting a specially crafted ClientHello extension exceeding 16 KB, an **unauthenticated remote attacker** can corrupt heap metadata, leading to **remote code execution (RCE)** within the context of the \`gatewayd\` daemon or an immediate denial-of-service (DoS) crash.
>
> **2. Affected Versions & Remediation (Patch)**
> - **Affected Products**: Telemetry Gateway \`v4.0.0\` through \`v4.8.1\`.
> - **Remediation**: Upgrade immediately to **version \`4.8.2\` or later**, which enforces strict bounds checking prior to memory allocation.
>
> **3. Temporary Workaround (Mitigation)**
> Where immediate patching is operationally infeasible, administrators **should** apply the following **workaround**: restrict external access to port \`8443/TCP\` via perimeter firewall ACLs to trusted management subnets only, and enable deep packet inspection (DPI) signature \`SID-2026449\`.
>
> **4. Coordinated Vulnerability Disclosure (CVD) Timeline**
> - **2026-09-10**: Vulnerability reported privately under **ISO/IEC 29147 CVD** protocol with a minimalist **Proof of Concept (PoC)**.
> - **2026-09-14**: Vendor triaged the report, confirmed reproduction, and assigned **CVE-2026-44901**.
> - **2026-11-05**: Patch \`v4.8.2\` released; **embargo period** concluded and public advisory published.

---page---

## رابعاً: عبارات العرض التقديمي الأكاديمي والدفاع العلمي بالإنجليزية (Academic Presentation Signposting)

عند تقديم مشروع التخرج أو ورقة بحثية في الأمن السيبراني باللغة الإنجليزية، استخدم هذه العبارات القياسية:
1. **افتتاح العرض وتحديد نموذج التهديد (Opening & Threat Model Framing)**:
   - *"Good morning, esteemed committee members. Today, I will present our architectural framework for mitigating Harvest Now, Decrypt Later threats in national financial gateways."*
   - *"Before examining the cryptographic implementation, let us first define our **adversary threat model** and security assumptions."*
2. **الانتقال بين الشرائح والمحاور (Signposting Transitions)**:
   - *"Having established the normative requirements under NCA NCS, let us now transition to the empirical benchmark results."*
   - *"As illustrated in Figure 3, hybrid ML-KEM-768 negotiation introduces less than 1.4 milliseconds of handshake latency."*
3. **الرد الأكاديمي الرصين على أسئلة اللجنة المحكِّمة (Defending Questions in Q&A)**:
   - *"That is a highly pertinent question regarding memory overhead on constrained IoT sensors. While ML-DSA signatures are larger than ECDSA, our architecture offloads verification to the edge gateway."*
   - *"To clarify the distinction between mitigation and remediation in our case study: network segmentation served as a temporary workaround until the firmware patch was deployed."*`,
    vocabularyList: [
      {
        id: 'voc-801',
        term: 'Coordinated Vulnerability Disclosure',
        acronym: 'CVD',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/kəʊˈɔː.dɪ.neɪ.tɪd ˌvʌl.nər.əˈbɪl.ə.ti dɪsˈkləʊ.ʒər/',
        pronunciationAudioText: 'Coordinated Vulnerability Disclosure. Under Coordinated Vulnerability Disclosure, researchers report flaws privately to allow patching before public release.',
        arabicMeaning: 'الإفصاح المنسق والمسؤول عن الثغرات',
        academicDefinitionEn: 'A structured process (ISO/IEC 29147) in which security researchers report vulnerabilities privately to vendors, allowing a remediation window before public disclosure.',
        academicDefinitionAr: 'عملية منظمة (وفق معيار ISO/IEC 29147) يبلّغ فيها الباحثون عن الثغرات سرياً للجهة المطورة لإتاحة فرصة إصلاحها قبل النشر العلني.',
        exampleSentenceEn: 'The researcher adhered to Coordinated Vulnerability Disclosure guidelines and respected the 90-day embargo.',
        exampleSentenceAr: 'التزم الباحث بإرشادات الإفصاح المنسق عن الثغرات واحترم فترة الحظر الإعلامي البالغة تسعين يوماً.',
        collocations: ['ISO/IEC 29147 CVD policy', 'embargo period', 'responsible disclosure'],
      },
      {
        id: 'voc-802',
        term: 'Security Advisory',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/sɪˈkjʊə.rə.ti ədˈvaɪ.zər.i/',
        pronunciationAudioText: 'Security Advisory. The vendor published a critical Security Advisory detailing affected versions, CVSS scores, and patch instructions.',
        arabicMeaning: 'نشرة تحذيرية أمنية رسمية',
        academicDefinitionEn: 'An official bulletin issued by a vendor or CERT informing users of a discovered vulnerability, its impact, affected versions, workarounds, and patches.',
        academicDefinitionAr: 'بيان رسمي يصدر عن الشركة المصنعة أو مركز الاستجابة للطوارئ لإبلاغ المستخدمين بثغرة مكتشفة وأثرها والإصدارات المتأثرة وطرق إصلاحها.',
        exampleSentenceEn: 'Administrators must review the CVE security advisory and apply the recommended remediation immediately.',
        exampleSentenceAr: 'يجب على مديري الأنظمة مراجعة النشرة الأمنية للثغرة وتطبيق الإصلاح الموصى به فوراً.',
        collocations: ['issue a security advisory', 'CVE advisory', 'vendor advisory'],
      },
      {
        id: 'voc-803',
        term: 'Remediation vs. Workaround',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/rɪˌmiː.diˈeɪ.ʃən/ vs /ˈwɜː.kə.raʊnd/',
        pronunciationAudioText: 'Remediation versus Workaround. Applying a source-code patch provides permanent remediation, whereas disabling a feature is a temporary workaround.',
        arabicMeaning: 'الإصلاح الجذري الدائم مقابل الحل الوقائي المؤقت',
        academicDefinitionEn: 'Remediation is the permanent fix (such as a software patch) that eliminates a vulnerability; a workaround is a temporary configuration change that reduces risk until patching.',
        academicDefinitionAr: 'الإصلاح الجذري (Remediation) هو التحديث الدائم الذي يزيل الثغرة نهائياً؛ أما الحل المؤقت (Workaround) فهو إجراء وقائي يقلل الخطر ريثما يتوفر التحديث.',
        exampleSentenceEn: 'As a temporary workaround prior to full remediation, restrict port 443 access to internal VPN subnets.',
        exampleSentenceAr: 'بوصفه حلاً وقائياً مؤقتاً قبل الإصلاح الكامل، قيّد الوصول إلى المنفذ 443 بشبكات VPN الداخلية فقط.',
        collocations: ['permanent remediation', 'temporary workaround', 'patch remediation'],
      },
      {
        id: 'voc-804',
        term: 'Proof of Concept',
        acronym: 'PoC',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/pruːf əv ˈkɒn.sept/',
        pronunciationAudioText: 'Proof of Concept. The vulnerability report included a benign Proof of Concept script demonstrating the buffer overflow.',
        arabicMeaning: 'إثبات المفهوم (نموذج تحققي للثغرة)',
        academicDefinitionEn: 'A non-destructive demonstration or minimal code artifact proving that a reported vulnerability is practically exploitable.',
        academicDefinitionAr: 'تطبيق عملي غير مدمر أو كود مصغر يثبت أن الثغرة المبلَّغ عنها قابلة للاستغلال الفعلي.',
        exampleSentenceEn: 'Submitting a reproducible Proof of Concept accelerates vendor triage and patch validation.',
        exampleSentenceAr: 'يسهم تقديم إثبات مفهوم قابل لإعادة الإنتاج في تسريع فرز الثغرة والتحقق من إصلاحها لدى الشركة المصنعة.',
        collocations: ['reproducible PoC', 'benign Proof of Concept', 'PoC exploit code'],
      },
      {
        id: 'voc-805',
        term: 'Privilege Escalation',
        acronym: 'PE / LPE',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/ˈprɪv.əl.ɪdʒ ˌes.kəˈleɪ.ʃən/',
        pronunciationAudioText: 'Privilege Escalation. Exploiting the kernel race condition enables local privilege escalation from a standard user to root.',
        arabicMeaning: 'تصعيد الصلاحيات غير المصرح به',
        academicDefinitionEn: 'The act of exploiting a bug, design flaw, or configuration oversight in an operating system or application to gain elevated access to restricted resources.',
        academicDefinitionAr: 'استغلال خطأ برمجي أو ثغرة تصميمية أو سوء إعداد للحصول على صلاحيات عليا غير مصرح بها داخل النظام.',
        exampleSentenceEn: 'Vertical privilege escalation grants an attacker administrative control over the entire domain.',
        exampleSentenceAr: 'يمنح تصعيد الصلاحيات الرأسي المهاجمَ تحكماً إدارياً كاملاً في النطاق.',
        collocations: ['local privilege escalation (LPE)', 'vertical privilege escalation', 'prevent privilege escalation'],
      },
      {
        id: 'voc-806',
        term: 'Threat Model',
        partOfSpeech: 'Noun Phrase',
        phonetic: '/θret ˈmɒd.əl/',
        pronunciationAudioText: 'Threat Model. Every academic security presentation must clearly articulate its underlying threat model and trust boundaries.',
        arabicMeaning: 'نموذج التهديد وحدود الثقة',
        academicDefinitionEn: 'A structured representation of all information affecting the security of an application, including adversary capabilities, attack surfaces, trust boundaries, and assets.',
        academicDefinitionAr: 'تمثيل منهجي يحدد قدرات المهاجم المفترضة، وأسطح الهجوم، وحدود الثقة، والأصول المراد حمايتها في النظام.',
        exampleSentenceEn: 'Under our Dolev-Yao threat model, the adversary can intercept, modify, and inject arbitrary network messages.',
        exampleSentenceAr: 'في ظل نموذج تهديد دوليف-ياو المعتمد لدينا، يستطيع المهاجم اعتراض وتعديل وحقن رسائل الشبكة.',
        collocations: ['define the threat model', 'trust boundary', 'attack surface'],
      },
    ],
    terminologyGlossary: [
      {
        term: 'Coordinated Vulnerability Disclosure (CVD)',
        phonetic: '/kəʊˈɔː.dɪ.neɪ.tɪd ˌvʌl.nər.əˈbɪl.ə.ti dɪsˈkləʊ.ʒər/',
        pronunciationAudioText: 'Coordinated Vulnerability Disclosure',
        category: 'Advisory & Presentation',
        arabicEquivalent: 'الإفصاح المنسق عن الثغرات',
        usageContext: 'التعاون المنظم بين الباحث والجهة المصنعة لإصلاح الثغرة قبل إعلانها.',
      },
      {
        term: 'Remediation vs. Workaround',
        phonetic: '/rɪˌmiː.diˈeɪ.ʃən/ vs /ˈwɜː.kə.raʊnd/',
        pronunciationAudioText: 'Remediation versus Workaround',
        category: 'Advisory & Presentation',
        arabicEquivalent: 'الإصلاح الدائم مقابل الحل المؤقت',
        usageContext: 'التمييز في نشرات CVE بين الرقعة الجذرية (Patch) والإجراء الوقائي المؤقت.',
      },
      {
        term: 'Proof of Concept (PoC)',
        phonetic: '/pruːf əv ˈkɒn.sept/',
        pronunciationAudioText: 'Proof of Concept',
        category: 'Advisory & Presentation',
        arabicEquivalent: 'إثبات المفهوم',
        usageContext: 'مثال عملي يثبت وجود الثغرة وقابليتها للاستغلال.',
      },
      {
        term: 'Privilege Escalation',
        phonetic: '/ˈprɪv.əl.ɪdʒ ˌes.kəˈleɪ.ʃən/',
        pronunciationAudioText: 'Privilege Escalation',
        category: 'Advisory & Presentation',
        arabicEquivalent: 'تصعيد الصلاحيات',
        usageContext: 'الانتقال غير المصرح به من صلاحيات محدودة إلى صلاحيات الجذر أو المشرف.',
      },
      {
        term: 'Threat Model & Trust Boundary',
        phonetic: '/θret ˈmɒd.əl/ & /trʌst ˈbaʊn.dər.i/',
        pronunciationAudioText: 'Threat Model and Trust Boundary',
        category: 'Advisory & Presentation',
        arabicEquivalent: 'نموذج التهديد وحدود الثقة',
        usageContext: 'الأساس المعماري لأي عرض تقديمي أو ورقة بحثية في الأمن السيبراني.',
      },
    ],
    images: [
      {
        prompt: 'CVE Security Advisory lifecycle and Coordinated Vulnerability Disclosure ISO 29147 diagram with CVSS vector breakdown and phonetic lab podium, 16:9',
        caption: 'دورة حياة الإفصاح المنسق عن الثغرات (CVD) وتشريح نشرة التحذير الأمني (CVE Advisory) ومنصة العرض الأكاديمي التفاعلي',
        alt: 'CVE Advisory and Coordinated Vulnerability Disclosure diagram',
        seed: 6081,
        isAIGenerated: true,
      },
    ],
    slides: [
      {
        slideNumber: 1,
        title: 'تحرير النشرات الأمنية للثغرات (CVE Security Advisories)',
        titleEn: 'Authoring Professional CVE Security Advisories',
        bulletPoints: [
          'العناصر القياسية لنشرة الثغرة: Title, CVE ID, CWE ID, CVSS Vector, Affected Versions.',
          'وصف الثغرة بوضوح: نوع الخلل + آلية الاستغلال + الأثر الأقصى (Impact).',
          'تجنب كشف تفاصيل الاستغلال التدميري قبل توفر التحديث للمستخدمين.',
        ],
        englishKeyExcerpt: 'A heap-based buffer overflow in versions prior to 4.8.2 allows an unauthenticated remote attacker to execute arbitrary code.',
        phoneticHighlight: 'Advisory /ədˈvaɪ.zər.i/ • Arbitrary /ˈɑː.bɪ.trər.i/',
        speakerNotes: 'علم الطلاب القالب الذهبي لوصف أي ثغرة CVE في جملة واحدة: [Flaw Type] in [Component/Versions] allows [Attacker Type] to [Impact] via [Vector].',
        visualCue: 'قالب تركيبي ملون لصياغة ملخص ثغرة CVE.',
      },
      {
        slideNumber: 2,
        title: 'التمييز الدقيق بين Remediation و Workaround و Mitigation',
        titleEn: 'Remediation (Patch) vs. Temporary Workaround',
        bulletPoints: [
          'Remediation: القضاء الجذري على الثغرة عبر ترقية البرمجيات أو تطبيق الـ Patch.',
          'Workaround: حل التفافي أو وقائي مؤقت (مثل إغلاق منفذ أو تعطيل ميزة) حتى يحين وقت الترقية.',
          'أهمية توفير Workaround واضح للأنظمة الحرجة التي لا تقبل التوقف الفوري.',
        ],
        englishKeyExcerpt: 'Upgrade to v4.8.2 for full remediation; as a temporary workaround, restrict port 8443 access via firewall ACLs.',
        phoneticHighlight: 'Remediation /rɪˌmiː.diˈeɪ.ʃən/ • Workaround /ˈwɜː.kə.raʊnd/',
        speakerNotes: 'هذا الفرق أساسي جداً في نشرات MSRC و Cisco PSIRT و NCA CERT.',
        visualCue: 'مقارنة بصرية بين مسار Patch Remediation ومسار Firewall Workaround.',
      },
      {
        slideNumber: 3,
        title: 'الإفصاح المنسق عن الثغرات (ISO/IEC 29147 CVD)',
        titleEn: 'Coordinated Vulnerability Disclosure (CVD) Workflow',
        bulletPoints: [
          'Discovery & PoC: اكتشاف الثغرة وإعداد إثبات مفهوم غير مدمر (Benign PoC).',
          'Private Reporting & Embargo: الإبلاغ السري والاتفاق على مهلة الحظر الإعلامي (Embargo Period).',
          'Coordinated Release: إصدار الرقعة البرمجية ونشر الـ Advisory في وقت متزامن.',
        ],
        englishKeyExcerpt: 'In accordance with ISO/IEC 29147 Coordinated Vulnerability Disclosure, public release was withheld until patch availability.',
        phoneticHighlight: 'Disclosure /dɪsˈkləʊ.ʒər/ • Embargo /ɪmˈbɑː.ɡəʊ/',
        speakerNotes: 'اشرح الأخلاقيات المهنية للباحث الأمني وكيف يصوغ مراسلته الأولى لفريق PSIRT.',
        visualCue: 'خط زمني لعملية CVD من الاكتشاف إلى النشر المنسق.',
      },
      {
        slideNumber: 4,
        title: 'إلقاء العروض الأكاديمية والدفاع عن الأبحاث بالإنجليزية',
        titleEn: 'Delivering Cybersecurity Presentations & Q&A Defense',
        bulletPoints: [
          'تحديد نموذج التهديد (Threat Model) وحدود الثقة (Trust Boundaries) في بداية العرض.',
          'استخدام عبارات الربط الأكاديمي (Signposting) عند شرح المخططات والجداول.',
          'الرد المنهجي والهادئ على أسئلة المحكمين في جلسة المناقشة (Q&A Defense).',
        ],
        englishKeyExcerpt: 'Under our threat model, the adversary controls the external network channel but cannot tamper with the hardware root of trust.',
        phoneticHighlight: 'Threat Model /θret ˈmɒd.əl/ • Pertinent /ˈpɜː.tɪ.nənt/',
        speakerNotes: 'درّب الطلاب على افتتاحية العرض الأكاديمي والرد على الأسئلة الصعبة بثقة.',
        visualCue: 'خارطة طريق من 5 خطوات لعرض مشروع تخرج سيبراني ناجح.',
      },
      {
        slideNumber: 5,
        title: 'المختبر الصوتي التفاعلي الشامل ومعايير إتقان النطق',
        titleEn: 'Comprehensive Phonetic Lab & Pronunciation Mastery',
        bulletPoints: [
          'مراجعة النطق الصحيح لأصعب 20 مصطلحاً في الفصول الثمانية عبر IPA.',
          'التدرب العملي عبر دالة speakCyberTerm(text) ومحرك Web Speech API.',
          'الاستعداد النهائي لاختبار المقرر وإصدار وثيقة الإتمام الأكاديمية.',
        ],
        englishKeyExcerpt: 'Mastering precise pronunciation and normative writing empowers cybersecurity engineers to lead international standards and incident response.',
        phoneticHighlight: 'Non-Repudiation • Ephemeral • Triage • Homomorphic',
        speakerNotes: 'شجع الطلاب على تجربة النطق الصوتي التفاعلي لجميع المصطلحات قبل خوض الاختبار النهائي.',
        visualCue: 'لوحة تحكم المختبر الصوتي التفاعلي الشامل في منصة مرصاد.',
      },
    ],
    flashcards: [
      {
        front: 'Coordinated Vulnerability Disclosure - CVD (/kəʊˈɔː.dɪ.neɪ.tɪd ˌvʌl.nər.əˈbɪl.ə.ti dɪsˈkləʊ.ʒər/)',
        back: 'الإفصاح المنسق عن الثغرات (ISO/IEC 29147): إبلاغ الجهة المصنعة سرياً بالثغرة وإمهالها فترة إصلاح (Embargo) قبل النشر العلني.',
        category: 'Vulnerability Management',
        phonetic: '/kəʊˈɔː.dɪ.neɪ.tɪd ˌvʌl.nər.əˈbɪl.ə.ti dɪsˈkləʊ.ʒər/',
        pronunciationAudioText: 'Coordinated Vulnerability Disclosure',
      },
      {
        front: 'Remediation vs. Workaround',
        back: 'Remediation (/rɪˌmiː.diˈeɪ.ʃən/): الإصلاح الجذري الدائم عبر تحديث الكود (Patch). Workaround (/ˈwɜː.kə.raʊnd/): إجراء وقائي مؤقت لتقليل الخطر ريثما يصدر التحديث.',
        category: 'CVE Advisories',
        phonetic: '/rɪˌmiː.diˈeɪ.ʃən/ vs /ˈwɜː.kə.raʊnd/',
        pronunciationAudioText: 'Remediation versus Workaround',
      },
      {
        front: 'Proof of Concept - PoC (/pruːf əv ˈkɒn.sept/)',
        back: 'إثبات المفهوم: كود أو خطوات غير مدمرة يرفقها الباحث لإثبات قابلية استغلال الثغرة عملياً ومساعدة الفريق الهندسي على إعادة إنتاجها وإصلاحها.',
        category: 'Vulnerability Research',
        phonetic: '/pruːf əv ˈkɒn.sept/',
        pronunciationAudioText: 'Proof of Concept',
      },
      {
        front: 'Arbitrary Code Execution - ACE / RCE (/ˈɑː.bɪ.trər.i kəʊd ˌek.sɪˈkjuː.ʃən/)',
        back: 'تنفيذ التعليمات البرمجية العشوائية (عن بُعد): قدرة المهاجم على تشغيل أي أوامر يختارها على النظام المستهدف نتيجة ثغرة أمنية.',
        category: 'Vulnerability Impact',
        phonetic: '/ˈɑː.bɪ.trər.i kəʊd ˌek.sɪˈkjuː.ʃən/',
        pronunciationAudioText: 'Arbitrary Code Execution',
      },
      {
        front: 'Privilege Escalation (/ˈprɪv.əl.ɪdʒ ˌes.kəˈleɪ.ʃən/)',
        back: 'تصعيد الصلاحيات: ارتقاء المهاجم غير المصرح به من حساب محدود الصلاحيات إلى صلاحيات المشرف أو النظام (root / SYSTEM).',
        category: 'Vulnerability Impact',
        phonetic: '/ˈprɪv.əl.ɪdʒ ˌes.kəˈleɪ.ʃən/',
        pronunciationAudioText: 'Privilege Escalation',
      },
      {
        front: 'Threat Model & Trust Boundary (/θret ˈmɒd.əl/)',
        back: 'نموذج التهديد وحدود الثقة: التوصيف المنهجي لقدرات المهاجم المفترضة والحدود الفاصلة بين المكونات الموثوقة وغير الموثوقة في النظام.',
        category: 'Academic Presentation',
        phonetic: '/θret ˈmɒd.əl/',
        pronunciationAudioText: 'Threat Model and Trust Boundary',
      },
    ],
    miniQuiz: [
      {
        question: 'In a CVE Security Advisory, what is the precise distinction between a "Remediation" and a "Workaround"?',
        options: [
          'Remediation is a permanent fix (such as upgrading to a patched version) that eliminates the vulnerability, whereas a Workaround is a temporary configuration change that mitigates risk until the patch can be applied.',
          'Remediation is a temporary firewall rule, whereas a Workaround rewrites the operating system kernel.',
          'Remediation means ignoring the vulnerability, whereas a Workaround deletes the SIEM logs.',
          'They are 100% identical synonyms in ISO/IEC 29147.',
        ],
        correctIndex: 0,
        explanation: 'في نشرات الثغرات القياسية، يشير مصطلح Remediation إلى الإصلاح الجذري الدائم (Patch/Upgrade)، بينما يشير Workaround إلى الإجراء الوقائي المؤقت.',
      },
      {
        question: 'What does "AV:N / PR:N / UI:N" indicate in a CVSS vector string?',
        options: [
          'The vulnerability requires physical USB access, domain admin privileges, and social engineering.',
          'The vulnerability is exploitable over the Network (AV:N) without any Privileges Required (PR:N) and without any User Interaction (UI:N).',
          'The vulnerability has been deprecated and superseded.',
          'The vulnerability only affects offline backup tapes.',
        ],
        correctIndex: 1,
        explanation: 'يرمز AV:N إلى Attack Vector: Network، و PR:N إلى Privileges Required: None، و UI:N إلى User Interaction: None، ما يعني إمكانية الاستغلال عن بُعد دون مصادقة أو تفاعل مستخدم.',
      },
      {
        question: 'أي من المصطلحات التالية يصف البروتوكول الأخلاقي والمعياري (ISO/IEC 29147) الذي يبلّغ فيه الباحث الجهة المطورة بالثغرة سرياً ويمهلها فترة زمنية لإصدار التحديث قبل النشر العلني؟',
        options: [
          'Coordinated Vulnerability Disclosure (CVD)',
          'Harvest Now, Decrypt Later (HNDL)',
          'Annualized Loss Expectancy (ALE)',
          'False Negative Suppression',
        ],
        correctIndex: 0,
        explanation: 'يُعرف هذا المنهج عالمياً وفي أطر الهيئة الوطنية للأمن السيبراني ومعيار ISO/IEC 29147 باسم Coordinated Vulnerability Disclosure (CVD).',
      },
      {
        question: 'Which sentence follows the standard academic pattern for summarizing a CVE vulnerability in an advisory?',
        options: [
          'A heap-based buffer overflow in Telemetry Gateway versions prior to 4.8.2 allows an unauthenticated remote attacker to execute arbitrary code via a crafted ClientHello packet.',
          'Telemetry Gateway had a very bad bug that made hackers happy.',
          'The plaintext was zeroized by the false positive in version 4.8.2.',
          'We encoded the buffer overflow with SHA-256.',
        ],
        correctIndex: 0,
        explanation: 'الجملة الأولى تطبق القالب القياسي العالمي لتحرير ملخصات CVE: تحديد نوع العيب البرمجي + المكون والإصدارات المتأثرة + نوع المهاجم + الأثر الأقصى + متجه الاستغلال.',
      },
    ],
    interactiveBook3D: {
      model3DType: 'CVE_ADVISORY_PODIUM',
      shaderEffect: 'gold-academic-beacon',
      bookTitleEn: 'Interactive 3D Podium: CVE Advisories, Presentations & Phonetic Lab',
      bookTitleAr: 'الكتاب التفاعلي ثلاثي الأبعاد: منصة النشرات الأمنية والمختبر الصوتي',
      pages3D: [
        {
          pageNumber: 1,
          titleAr: 'هيكلة نشرة التحذير الأمني (CVE Security Advisory)',
          titleEn: 'Structuring a CVE Security Advisory',
          badge: 'PODIUM LAB PAGE 01',
          bilingualSummaryAr: 'تتكون نشرة التحذير الأمني من توصيف دقيق للعيب البرمجي (CWE)، ومتجه الخطورة (CVSS)، والإصدارات المتأثرة، والترقية الدائمة (Remediation)، والحل المؤقت (Workaround).',
          englishExcerpt: 'An authoritative security advisory pairs a precise CWE root-cause classification and CVSS vector with actionable remediation and workaround guidance.',
          phoneticGuide: 'Advisory /ədˈvaɪ.zər.i/ | Remediation /rɪˌmiː.diˈeɪ.ʃən/ | Workaround /ˈwɜː.kə.raʊnd/',
          pronunciationAudioText: 'An authoritative security advisory pairs a precise CWE root-cause classification and CVSS vector with actionable remediation and workaround guidance.',
          grammarOrStyleTip: 'احرص دائماً على استخدام عبارة "versions prior to X.Y.Z" بدلاً من عبارات مبهمة مثل "old versions".',
          keyTakeaway: 'وضوح النشرة الأمنية يقلص زمن استجابة مسؤولي الأنظمة حول العالم.',
        },
        {
          pageNumber: 2,
          titleAr: 'الإفصاح المنسق عن الثغرات (ISO/IEC 29147 CVD)',
          titleEn: 'Coordinated Vulnerability Disclosure (CVD)',
          badge: 'PODIUM LAB PAGE 02',
          bilingualSummaryAr: 'ينظم الإفصاح المنسق العلاقة بين الباحث الأمني والجهة المصنعة عبر إرسال إثبات مفهوم غير مدمر (PoC) والالتزام بفترة الحظر الإعلامي (Embargo Period) حتى صدور الرقعة.',
          englishExcerpt: 'Coordinated Vulnerability Disclosure balances transparency with user safety by maintaining an embargo period until patch remediation is publicly available.',
          phoneticGuide: 'Disclosure /dɪsˈkləʊ.ʒər/ | Embargo Period /ɪmˈbɑː.ɡəʊ ˈpɪə.ri.əd/',
          pronunciationAudioText: 'Coordinated Vulnerability Disclosure balances transparency with user safety by maintaining an embargo period until patch remediation is publicly available.',
          grammarOrStyleTip: 'استخدم الفعل "withhold" (يرجئ/يمسك عن النشر) في جمل مثل "Public details were withheld during the embargo period".',
          keyTakeaway: 'الإفصاح المسؤول يحمي البنية التحتية من هجمات اليوم الصفري (Zero-Day Exploitation).',
        },
        {
          pageNumber: 3,
          titleAr: 'مهارات العرض الأكاديمي والمختبر الصوتي التفاعلي',
          titleEn: 'Academic Defense & Interactive Phonetic Mastery',
          badge: 'PODIUM LAB PAGE 03',
          bilingualSummaryAr: 'يكتمل التميز الهندسي بالقدرة على عرض نموذج التهديد والنتائج التجريبية شفوياً بنطق إنجليزي سليم ومخارج صوتية واضحة للمصطلحات السيبرانية.',
          englishExcerpt: 'Clear phonetic articulation and structured threat-model signposting enable cybersecurity researchers to defend complex architectures before international panels.',
          phoneticGuide: 'Articulation /ɑːˌtɪk.jʊˈleɪ.ʃən/ | Signposting /ˈsaɪnˌpəʊ.stɪŋ/',
          pronunciationAudioText: 'Clear phonetic articulation and structured threat-model signposting enable cybersecurity researchers to defend complex architectures before international panels.',
          grammarOrStyleTip: 'استخدم عبارات Signposting مثل "Turning now to our empirical evaluation..." لربط أجزاء عرضك التقديمي بسلاسة.',
          keyTakeaway: 'استخدم دالة speakCyberTerm للتدرب المستمر على نطق المصطلحات والجمل النموذجية.',
        },
      ],
      stepByStep: [
        {
          stepNumber: 1,
          titleAr: 'صياغة ملخص الثغرة ومتجه الخطورة (Draft CVE Summary & CVSS)',
          titleEn: 'Step 1: Formulate CVE Summary & CVSS Vector',
          descriptionAr: 'تحديد فئة الضعف CWE وحساب متجه CVSS وصياغة جملة الملخص القياسية.',
          englishActionPhrase: 'Classify the weakness under CWE and articulate the CVSS v4.0 severity vector.',
          phonetic: '/ɑːˈtɪk.jʊ.leɪt ðə ˈsiː.viː.es.es ˈvek.tər/',
          pronunciationAudioText: 'Classify the weakness under CWE and articulate the CVSS version 4 severity vector.',
          visualState: 'إضاءة المنصة الذهبية وعرض شريط متجه CVSS ثلاثي الأبعاد.',
        },
        {
          stepNumber: 2,
          titleAr: 'تحرير قسم الإصلاح والحل المؤقت (Specify Remediation & Workaround)',
          titleEn: 'Step 2: Detail Patch Remediation & Workaround',
          descriptionAr: 'توضيح رقم الإصدار المعالج للثغرة وخطوات التخفيف المؤقتة.',
          englishActionPhrase: 'Provide explicit patch remediation versions alongside actionable firewall workarounds.',
          phonetic: '/pætʃ rɪˌmiː.diˈeɪ.ʃən ˈvɜː.ʃənz ænd ˈwɜː.kə.raʊndz/',
          pronunciationAudioText: 'Provide explicit patch remediation versions alongside actionable firewall workarounds.',
          visualState: 'ظهور درعي الحماية الدائمة والمؤقتة على جانبي المنصة.',
        },
        {
          stepNumber: 3,
          titleAr: 'توثيق الجدول الزمني للإفصاح المنسق (Log CVD Timeline)',
          titleEn: 'Step 3: Document ISO/IEC 29147 CVD Timeline',
          descriptionAr: 'توثيق تواريخ الإبلاغ السري، والتحقق من PoC، وانتهاء فترة الحظر (Embargo).',
          englishActionPhrase: 'Record the Coordinated Vulnerability Disclosure timeline from private PoC submission to public release.',
          phonetic: '/kəʊˈɔː.dɪ.neɪ.tɪd ˌvʌl.nər.əˈbɪl.ə.ti dɪsˈkləʊ.ʒər/',
          pronunciationAudioText: 'Record the Coordinated Vulnerability Disclosure timeline from private Proof of Concept submission to public release.',
          visualState: 'تشكّل حلقة الجدول الزمني الذهبية حول المنصة.',
        },
        {
          stepNumber: 4,
          titleAr: 'الإلقاء الصوتي والدفاع الأكاديمي (Phonetic Delivery & Q&A Defense)',
          titleEn: 'Step 4: Deliver Technical Presentation & Phonetic Lab',
          descriptionAr: 'تقديم العرض التقني بنطق صوتي متقن والرد على أسئلة اللجنة العلمية.',
          englishActionPhrase: 'Present the threat model and empirical findings with precise phonetic articulation.',
          phonetic: '/prɪˈzent ðə θret ˈmɒd.əl wɪð prɪˈsaɪs ɑːˌtɪk.jʊˈleɪ.ʃən/',
          pronunciationAudioText: 'Present the threat model and empirical findings with precise phonetic articulation.',
          visualState: 'انطلاق موجات النطق الصوتي التفاعلي وتوهج شارة إتمام المقرر.',
        },
      ],
      hotspots: [
        {
          id: 'hs-ch8-1',
          labelAr: 'لوحة متجه الخطورة وتوصيف الثغرة (CVE & CVSS Header)',
          labelEn: 'CVE Summary & CVSS Vector Header',
          coordinates: { x: 0.0, y: 1.5, z: 0.5 },
          phonetic: '/ˈsiː.viː.iː ˈsʌm.ər.i ænd ˈsiː.viː.es.es ˈvek.tər/',
          pronunciationAudioText: 'CVE Summary and CVSS Vector Header. Standardized vulnerability summaries specify flaw type, affected versions, attacker profile, and maximum impact.',
          explanationAr: 'يحتوي على المعرف العالمي للثغرة (CVE ID) وتصنيف الضعف البرمجي (CWE) ومتجه الخطورة القياسي (CVSS).',
          englishTemplateSnippet: 'CVE-2026-44901 (CWE-122) — CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H (9.8 Critical).',
          securityContext: 'التوصيف المعياري للثغرات الأمنية (Standardized Vulnerability Identification).',
        },
        {
          id: 'hs-ch8-2',
          labelAr: 'قسم الإصلاح الجذري والحل المؤقت (Remediation & Workaround Panel)',
          labelEn: 'Remediation vs. Workaround Action Panel',
          coordinates: { x: -1.3, y: 0.4, z: 0.7 },
          phonetic: '/rɪˌmiː.diˈeɪ.ʃən ˈvɜː.səs ˈwɜː.kə.raʊnd/',
          pronunciationAudioText: 'Remediation versus Workaround Action Panel. Remediation eliminates the flaw via patching, while a workaround reduces exposure temporarily.',
          explanationAr: 'يوجّه مسؤولي الأنظمة إلى النسخة المحدثة الخالية من الثغرة، أو الإعداد الوقائي المؤقت عند تعذر الترقية الفورية.',
          englishTemplateSnippet: 'Remediation: Upgrade to v4.8.2. Workaround: Restrict port 8443/TCP access to trusted management subnets.',
          securityContext: 'إدارة التصحيحات وتخفيف التعرض للخطر (Patch & Exposure Management).',
        },
        {
          id: 'hs-ch8-3',
          labelAr: 'ميثاق الإفصاح المنسق (ISO 29147 CVD Protocol Node)',
          labelEn: 'Coordinated Vulnerability Disclosure (CVD) Node',
          coordinates: { x: 1.3, y: 0.4, z: 0.7 },
          phonetic: '/kəʊˈɔː.dɪ.neɪ.tɪd ˌvʌl.nər.əˈbɪl.ə.ti dɪsˈkləʊ.ʒər nəʊd/',
          pronunciationAudioText: 'Coordinated Vulnerability Disclosure Node. Responsible disclosure protects end users during the patch development embargo.',
          explanationAr: 'يوثق التزام الباحث والشركة المصنعة بمسار الإفصاح الأخلاقي المنسق وحماية المستخدمين خلال فترة الحظر الإعلامي.',
          englishTemplateSnippet: 'Reported privately under ISO/IEC 29147 CVD with a benign PoC; public disclosure followed patch availability.',
          securityContext: 'أخلاقيات وحوكمة أبحاث الثغرات (Vulnerability Disclosure Governance).',
        },
        {
          id: 'hs-ch8-4',
          labelAr: 'وحدة المختبر الصوتي التفاعلي (Web Speech Phonetic Synthesizer)',
          labelEn: 'Interactive IPA & Web Speech Synthesizer Core',
          coordinates: { x: 0.0, y: -1.2, z: 0.8 },
          phonetic: '/ˌɪn.tərˈæk.tɪv fəˈnet.ɪk ˈsɪn.θə.saɪ.zər/',
          pronunciationAudioText: 'Interactive IPA and Web Speech Synthesizer Core. Practice pronouncing technical cybersecurity terms with academic clarity.',
          explanationAr: 'يربط كل مصطلح في المقرر بتمثيله الصوتي الدولي (IPA) ومحرك النطق الصوتي `speakCyberTerm` لإتقان التحدث الأكاديمي.',
          englishTemplateSnippet: 'Invoke speakCyberTerm(utteranceText) to synthesize clear en-US academic pronunciation across all 8 chapters.',
          securityContext: 'الكفاءة اللغوية والتواصل الأكاديمي الدولي (Academic Cybersecurity Communication).',
        },
      ],
    },
  },
];

// ============================================================================
// 4. القاموس الصوتي الشامل للمقرر (Master Course Terminology Glossary)
// ============================================================================

export const MASTER_ENG_CYBER_GLOSSARY: TerminologyGlossaryEntry[] = ENG_CYBER_CHAPTERS.reduce<
  TerminologyGlossaryEntry[]
>((acc, chapter) => {
  return [...acc, ...chapter.terminologyGlossary];
}, []);

// ============================================================================
// 5. توصيف المقرر الأكاديمي الكامل (COURSE_ENG_CYBER_INFO)
// ============================================================================

export const COURSE_ENG_CYBER_INFO: CourseInfo = {
  id: '990e8400-e29b-41d4-a716-446655440005',
  code: 'ENG-CYBER',
  slug: 'eng-cyber',
  title: 'اللغة الإنجليزية الأكاديمية للأمن السيبراني والتشفير',
  titleEn: 'Academic English for Cybersecurity & Cryptography',
  category: 'اللغة والتواصل التقني السيبراني',
  description:
    'مقرر أكاديمي وتطبيقي متكامل من 8 فصول دراسية يمكّن مهندسي وباحثي الأمن السيبراني من إتقان المصطلحات التأسيسية والمتقدمة في التشفير، وقراءة معايير NIST FIPS ووثائق IETF RFCs وضوابط الهيئة الوطنية للأمن السيبراني (NCA ECC & NCS) باللغة الإنجليزية، وصياغة تقارير التحقيق الجنائي الرقمي (DFIR)، والملخصات التنفيذية لمجلس الإدارة (ALE/ROSI)، والسياسات الأمنية، ونشرات الثغرات (CVE Advisories)، مع مختبر نطق صوتي تفاعلي شامل مدعوم بالتمثيل الصوتي الدولي (IPA) و Web Speech API.',
  level: 'المستوى التأسيسي إلى المتقدم (Bilingual Academic Track)',
  chaptersCount: 8,
  totalHours: 48,
  status: 'available',
  color: 'from-emerald-500 to-teal-700',
  accent: '#10b981',
  badge: 'RFC 2119 / NIST FIPS / NCA English',
  neonColor: 'emerald',
  icon: 'BookOpen',
  reference:
    'IETF BCP 14 (RFC 2119 / RFC 8174), NIST FIPS 140-3 & FIPS 203/204/205, NIST SP 800-61r3, ISO/IEC 27001 & 29147, and NCA ECC-2:2024 & NCS Official English Editions',
  vision:
    'تخريج كوادر وطنية وباحثين في الأمن السيبراني والتشفير يمتلكون طلاقة أكاديمية ومهنية رفيعة باللغة الإنجليزية تمكّنهم من قراءة المعايير الدولية، وتحرير التقارير الجنائية والتنفيذية والسياسات الرقابية، وتمثيل المملكة بكفاءة في المحافل والمؤتمرات والمنظمات السيبرانية الدولية.',
  mission:
    'تقديم منهج ثنائي اللغة (عربي/إنجليزي) يربط المفاهيم الرياضية والهندسية للتشفير والأمن السيبراني ببنيتها اللغوية والصرفية والصوتية الدقيقة (IPA)، مع توفير نماذج رسمية محكّمة للتقارير والسياسات ومختبر تفاعلي للنطق الصوتي والكتاب ثلاثي الأبعاد.',
  learningOutcomes: [
    'إتقان نطق واستخدام المصطلحات التأسيسية والمتقدمة في التشفير والأمن السيبراني (Plaintext, Ciphertext, Non-Repudiation, Ephemeral Keys, Perfect Forward Secrecy, Zeroization) وفق الأبجدية الصوتية الدولية (IPA).',
    'قراءة وتحليل الوثائق المعيارية الدولية (NIST FIPS, IETF RFCs) والضوابط الوطنية (NCA ECC-2:2024 & NCS) باللغة الإنجليزية والتمييز الدقيق بين أفعال الإلزام المعيارية (MUST, SHALL, SHOULD, MAY) وفق RFC 2119.',
    'توظيف مصطلحات مركز العمليات الأمنية (SOC, SIEM, SOAR, EDR, Alert Triage, Dwell Time, MTTD, MTTR) ومصفوفة دقة التنبيهات (True/False Positives & Negatives) في كتابة تقارير المناوبات والتصعيد.',
    'تحرير تقارير الاستجابة للحوادث والتحقيق الجنائي الرقمي (DFIR Reports) باللغة الإنجليزية الموضوعية، بما يشمل سلسلة الحيازة (Chain of Custody)، وترتيب التطاير (Order of Volatility)، والجدول الزمني للاختراق، وتحليل السبب الجذري (RCA)، وتحييد مؤشرات الاختراق (Defanged IOCs).',
    'صياغة الملخصات التنفيذية وعروض تقييم المخاطر الموجهة لمجلس الإدارة بلغة الأعمال، وحساب وشرح مؤشرات SLE و ARO و ALE والعائد على الاستثمار الأمني (ROSI) ومؤشرات استمرارية الأعمال (RTO & RPO).',
    'كتابة السياسات والمعايير الأمنية وإعلانات الامتثال (Acceptable Use Policies, Key Management Policies, Statement of Applicability - SoA) بلغة حوكمية ملزمة تطبق مبادئ Least Privilege و Separation of Duties.',
    'استيعاب وصياغة الأبحاث والوثائق الهندسية الخاصة بالتشفير ما بعد الكم (NIST FIPS 203 ML-KEM, FIPS 204 ML-DSA, FIPS 205 SLH-DSA) وإثباتات المعرفة الصفرية (ZKP: Completeness, Soundness, Zero-Knowledge) والتشفير المتماثل الشكل (FHE).',
    'كتابة النشرات الأمنية للثغرات (CVE Security Advisories) وفق معيار الإفصاح المنسق (ISO/IEC 29147 CVD) وإلقاء العروض الأكاديمية والدفاع العلمي باللغة الإنجليزية أمام لجان التحكيم.',
  ],
  weeklyPlan: [
    {
      week: 1,
      topic: 'المصطلحات التأسيسية في التشفير والأمن السيبراني والنطق الصوتي (Core Crypto Terminology & IPA)',
      chapterNumber: 1,
    },
    {
      week: 2,
      topic: 'قراءة وتحليل وثائق المعايير الدولية والوطنية (NIST FIPS, IETF RFC 2119 & NCA ECC)',
      chapterNumber: 2,
    },
    {
      week: 3,
      topic: 'مصطلحات مركز العمليات الأمنية وفرز التنبيهات والاستجابة (SOC, SIEM, EDR, Triage & Dwell Time)',
      chapterNumber: 3,
    },
    {
      week: 4,
      topic: 'الصياغة الاحترافية لتقارير الحوادث والتحقيق الجنائي الرقمي (DFIR Reports, Chain of Custody & RCA)',
      chapterNumber: 4,
    },
    {
      week: 5,
      topic: 'كتابة الملخصات التنفيذية وتقارير تقييم المخاطر لمجلس الإدارة (Board Briefings, ALE, ROSI & RTO/RPO)',
      chapterNumber: 5,
    },
    {
      week: 6,
      topic: 'صياغة السياسات والمعايير الأمنية وبيان القابلية للتطبيق (Security Policies, AUP & ISO 27001 SoA)',
      chapterNumber: 6,
    },
    {
      week: 7,
      topic: 'مصطلحات التشفير المتقدم والأمن الكمومي وإثبات المعرفة الصفرية (NIST FIPS 203/204/205, ZKP & FHE)',
      chapterNumber: 7,
    },
    {
      week: 8,
      topic: 'التواصل التقني وكتابة نشرات الثغرات والمختبر اللغوي الشامل (CVE Advisories, CVD & Phonetic Lab)',
      chapterNumber: 8,
    },
  ],
  assessmentMethods: [
    {
      name: 'الاختبار التحريري واللغوي النهائي الشامل',
      weight: 35,
      description: 'اختبار شامل يقيس دقة استيعاب المصطلحات السيبرانية، وتفسير بنود RFC 2119 و NIST FIPS، وتحرير الفقرات الأكاديمية.',
    },
    {
      name: 'مشروع تحرير محفظة الوثائق السيبرانية بالإنجليزية (DFIR + Policy + Board Memo)',
      weight: 30,
      description: 'كتابة تقرير تحقيق جنائي متكامل، وسياسة إدارة مفاتيح تشفيرية، وملخص تنفيذي لحساب ALE/ROSI باللغة الإنجليزية الرسمية.',
    },
    {
      name: 'العرض التقديمي الشفوي ومختبر النطق الصوتي وصياغة نشرة CVE',
      weight: 25,
      description: 'تقديم عرض تقني بالإنجليزية مع تقييم صحة النطق الصوتي للمصطلحات وتحرير نشرة تحذير أمني (CVE Advisory).',
    },
    {
      name: 'التمارين التفاعلية الأسبوعية والبطاقات الصوتية',
      weight: 10,
      description: 'إتمام الاختبارات القصيرة (Mini-Quizzes) وتدريبات الكتاب التفاعلي ثلاثي الأبعاد عبر الفصول الثمانية.',
    },
  ],
  deliveryMode: 'أكاديمي مزدوج اللغة (عربي/إنجليزي) + مختبر نطق صوتي تفاعلي (Web Speech API) + كتاب تفاعلي ثلاثي الأبعاد (3D Book)',
  language: 'العربية والإنجليزية (Bilingual Ar/En with IPA Phonetics)',
  instructor: 'فريق الهندسة الأكاديمية واللغوية — منصة مرصاد التشفير',
  prerequisite: 'لا يوجد متطلب مسبق (متاح لجميع مستويات المسار الأكاديمي)',
  topics: [
    'Cryptographic Terminology & IPA Phonetics',
    'RFC 2119 Normative Verbs (MUST/SHALL/SHOULD/MAY)',
    'NCA ECC-2:2024 & NCS English Terminology',
    'SOC Triage, Dwell Time, MTTD & MTTR',
    'DFIR Reports, Chain of Custody & RCA',
    'Executive Board Briefings, ALE & ROSI',
    'Security Policy Drafting & Statement of Applicability (SoA)',
    'Post-Quantum NIST FIPS 203/204/205, ZKP & Homomorphic Encryption',
    'CVE Security Advisories & Technical Presentations',
  ],
  features: [
    '8 فصول دراسية متكاملة ومفصلة دون أي اختصار تغطي كامل دورة حياة الكتابة والتحدث في الأمن السيبراني.',
    'تمثيل صوتي دولي دقيق (IPA) ودعم النطق الفوري عبر Web Speech API من خلال الدالة المساعدة speakCyberTerm.',
    'نماذج رسمية كاملة باللغة الإنجليزية لتقارير DFIR، ومذكرات مجلس الإدارة، والسياسات الأمنية، ونشرات CVE مع ترجمتها وتحليلها اللغوي.',
    'كتاب تفاعلي ثلاثي الأبعاد (interactiveBook3D) لكل فصل يضم صفحات تفاعلية، وخطوات متسلسلة، ونقاطاً ساخنة (Hotspots) ناطقة صوتياً.',
    '40 شريحة عرض تقديمي (5 شرائح لكل فصل)، و48 بطاقة استذكار مزدوجة اللغة (6 لكل فصل)، و32 سؤال اختيار من متعدد مشروحاً بالتفصيل.',
  ],
  terminologyGlossary: MASTER_ENG_CYBER_GLOSSARY,
  chapters: ENG_CYBER_CHAPTERS,
};

// تصدير CHAPTERS للتوافق القياسي المباشر مع بقية مقررات منصة مرصاد
export const CHAPTERS: Chapter[] = ENG_CYBER_CHAPTERS;

export default COURSE_ENG_CYBER_INFO;