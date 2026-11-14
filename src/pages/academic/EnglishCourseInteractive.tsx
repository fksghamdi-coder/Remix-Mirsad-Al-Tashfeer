import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Award,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Layers,
  PenTool,
  MessageSquare,
  GraduationCap,
  Maximize2,
  Minimize2,
  Compass,
  ArrowRight,
} from 'lucide-react';

// ============================================================================
// 1. هياكل البيانات التعليمية للكتاب التفاعلي ثلاثي الأبعاد (CEFR A1 -> C2)
// ============================================================================

interface GrammarFormulaBlock {
  labelAr: string;
  labelEn: string;
  examples: string;
  color: string;
}

interface SentenceBuilderExercise {
  id: string;
  promptAr: string;
  targetWords: string[];
  scrambledWords: string[];
  grammarTipAr: string;
}

interface ErrorCorrectionItem {
  id: string;
  incorrectSentence: string;
  options: string[];
  correctIndex: number;
  explanationAr: string;
}

interface VocabEntry {
  word: string;
  ipa: string;
  partOfSpeech: string;
  meaningAr: string;
  exampleEn: string;
  exampleAr: string;
  clozeSentence: string;
  clozeOptions: string[];
  clozeAnswer: string;
}

interface DialogueTurn {
  speaker: string;
  roleAr: string;
  textEn: string;
  textAr: string;
  keyPhrase?: string;
}

interface DialogueSimulationNode {
  situationAr: string;
  partnerLineEn: string;
  partnerLineAr: string;
  choices: {
    textEn: string;
    quality: 'optimal' | 'informal' | 'incorrect';
    feedbackAr: string;
  }[];
}

interface ReadingAndWritingLab {
  passageTitleEn: string;
  passageTitleAr: string;
  paragraphs: {
    tagAr: string;
    textEn: string;
    textAr: string;
    keyConnectors: string[];
  }[];
  comprehensionQuestion: {
    questionEn: string;
    questionAr: string;
    options: string[];
    correctIndex: number;
    explanationAr: string;
  };
  writingPromptAr: string;
  writingPromptEn: string;
  targetKeywords: string[];
  modelAnswerEn: string;
}

interface UnitQuizItem {
  id: string;
  skillTag: string;
  questionEn: string;
  questionAr: string;
  options: string[];
  correctIndex: number;
  explanationAr: string;
}

interface EnglishBookUnit {
  unitNumber: number;
  cefrLevel: string;
  badgeColor: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  grammarSection: {
    ruleTitleAr: string;
    ruleTitleEn: string;
    overviewAr: string;
    formulaBlocks: GrammarFormulaBlock[];
    coreRules: {
      titleAr: string;
      patternEn: string;
      exampleEn: string;
      exampleAr: string;
    }[];
    sentenceBuilders: SentenceBuilderExercise[];
    errorCorrections: ErrorCorrectionItem[];
  };
  vocabularySection: VocabEntry[];
  dialogueSection: {
    contextTitleAr: string;
    contextTitleEn: string;
    turns: DialogueTurn[];
    simulations: DialogueSimulationNode[];
  };
  readingWritingSection: ReadingAndWritingLab;
  quizSection: UnitQuizItem[];
}

export const ENGLISH_3D_BOOK_UNITS: EnglishBookUnit[] = [
  // ==========================================================================
  // UNIT 1 — LEVEL A1
  // ==========================================================================
  {
    unitNumber: 1,
    cefrLevel: 'Level A1',
    badgeColor: 'from-sky-500 to-cyan-500',
    titleAr: 'الوحدة الأولى (تأسيس A1): أساسيات الجملة الإنجليزية والضمائر وفعل الكينونة',
    titleEn: 'Unit 1: English Foundations, Pronouns & Verb To Be',
    subtitleAr: 'بناء الجملة الإسمية والفعلية، ضمائر الفاعل والملكية، والتعريف الأكاديمي واليومي بالنفس.',
    grammarSection: {
      ruleTitleAr: 'هندسة الجملة الأساسية وفعل الكينونة (Subject + Verb To Be + Complement)',
      ruleTitleEn: 'Core Sentence Architecture & Verb To Be (am / is / are)',
      overviewAr:
        'على عكس اللغة العربية التي قد تخلو فيها الجملة الاسمية من فعل ظاهر في المضارع، تشترط اللغة الإنجليزية وجود فعل في كل جملة؛ ويُستخدم فعل الكينونة (am / is / are) لربط الفاعل بالاسم أو الصفة أو الموقع.',
      formulaBlocks: [
        {
          labelAr: '1. الفاعل (Subject)',
          labelEn: 'I / He / She / It / We / They',
          examples: 'The student / She / We',
          color: 'border-sky-400/50 bg-sky-950/50 text-sky-200',
        },
        {
          labelAr: '2. فعل الكينونة (Verb To Be)',
          labelEn: 'am / is / are',
          examples: 'am (I) · is (Singular) · are (Plural)',
          color: 'border-emerald-400/50 bg-emerald-950/50 text-emerald-200',
        },
        {
          labelAr: '3. المتمم (Complement)',
          labelEn: 'Noun / Adjective / Prepositional Phrase',
          examples: 'an engineer / ready / in the lab',
          color: 'border-amber-400/50 bg-amber-950/50 text-amber-200',
        },
      ],
      coreRules: [
        {
          titleAr: 'المفرد المتكلم (I am)',
          patternEn: 'I + am + (a/an + Singular Noun / Adjective)',
          exampleEn: 'I am a university researcher in Jeddah.',
          exampleAr: 'أنا باحث جامعي في جدة.',
        },
        {
          titleAr: 'المفرد الغائب (He / She / It is)',
          patternEn: 'He / She / It + is + Complement',
          exampleEn: 'The academic schedule is clear and organized.',
          exampleAr: 'الجدول الأكاديمي واضح ومنظم.',
        },
        {
          titleAr: 'الجمع والمخاطب (You / We / They are)',
          patternEn: 'You / We / They + are + Plural Noun / Adjective',
          exampleEn: 'We are ready for the introductory seminar.',
          exampleAr: 'نحن مستعدون للندوة التعريفية.',
        },
        {
          titleAr: 'صياغة السؤال والنفي (Question & Negation)',
          patternEn: 'Am/Is/Are + Subject + ...? | Subject + am/is/are + not',
          exampleEn: 'Are the lecture halls open today? — Yes, they are.',
          exampleAr: 'هل قاعات المحاضرات مفتوحة اليوم؟ — نعم، إنها مفتوحة.',
        },
      ],
      sentenceBuilders: [
        {
          id: 'u1-sb1',
          promptAr: 'رتّب الكلمات التالية لتكوين جملة تعريفية صحيحة نحوياً:',
          targetWords: ['She', 'is', 'an', 'ambitious', 'university', 'student.'],
          scrambledWords: ['student.', 'an', 'She', 'university', 'is', 'ambitious'],
          grammarTipAr: 'نبدأ بضمير الفاعل (She) ثم فعل الكينونة للمفرد (is) ثم أداة التنكير (an) لأن الصفة (ambitious) تبدأ بصوت علة.',
        },
        {
          id: 'u1-sb2',
          promptAr: 'رتّب الكلمات لتكوين سؤال صحيح باستخدام فعل الكينونة:',
          targetWords: ['Are', 'the', 'new', 'textbooks', 'in', 'the', 'library?'],
          scrambledWords: ['the', 'library?', 'Are', 'textbooks', 'in', 'new', 'the'],
          grammarTipAr: 'في السؤال مع فعل الكينونة نقدم (Are) قبل الفاعل الجمع (the new textbooks).',
        },
      ],
      errorCorrections: [
        {
          id: 'u1-ec1',
          incorrectSentence: 'The lecture notes is very helpful for beginners.',
          options: [
            'The lecture notes are very helpful for beginners.',
            'The lecture notes am very helpful for beginners.',
            'The lecture notes be very helpful for beginners.',
          ],
          correctIndex: 0,
          explanationAr: 'الفاعل (The lecture notes) جمع، لذلك يجب استخدام (are) بدلاً من (is).',
        },
        {
          id: 'u1-ec2',
          incorrectSentence: 'He is a honest person in his team.',
          options: [
            'He is an honest person in his team.',
            'He are an honest person in his team.',
            'He is honest a person in his team.',
          ],
          correctIndex: 0,
          explanationAr: 'كلمة (honest) تبدأ بحرف صامت (h) لا يُنطق ويليها صوت علة، لذا نستخدم (an honest person).',
        },
      ],
    },
    vocabularySection: [
      {
        word: 'Foundation',
        ipa: '/faʊnˈdeɪ.ʃən/',
        partOfSpeech: 'Noun',
        meaningAr: 'أساس / ركيزة تأسيسية',
        exampleEn: 'Grammar builds a strong foundation for fluent communication.',
        exampleAr: 'تبني القواعد أساساً قوياً للتواصل الطليق.',
        clozeSentence: 'A solid vocabulary is the ________ of academic reading.',
        clozeOptions: ['foundation', 'hesitation', 'fragment'],
        clozeAnswer: 'foundation',
      },
      {
        word: 'Schedule',
        ipa: '/ˈʃed.juːl/ · /ˈskedʒ.uːl/',
        partOfSpeech: 'Noun / Verb',
        meaningAr: 'جدول زمني / يجدول',
        exampleEn: 'Our weekly study schedule includes four interactive sessions.',
        exampleAr: 'يتضمن جدولنا الدراسي الأسبوعي أربع جلسات تفاعلية.',
        clozeSentence: 'Please check the exam ________ before Friday.',
        clozeOptions: ['schedule', 'pronoun', 'syllable'],
        clozeAnswer: 'schedule',
      },
      {
        word: 'Introduce',
        ipa: '/ˌɪn.trəˈdjuːs/',
        partOfSpeech: 'Verb',
        meaningAr: 'يُقدّم (نفسه أو غيره) / يستهل',
        exampleEn: 'Allow me to introduce my research colleague, Dr. Sami.',
        exampleAr: 'اسمحوا لي أن أقدم زميلي في البحث، الدكتور سامي.',
        clozeSentence: 'On the first day, students ________ themselves to the class.',
        clozeOptions: ['introduce', 'postpone', 'conclude'],
        clozeAnswer: 'introduce',
      },
      {
        word: 'Essential',
        ipa: '/ɪˈsen.ʃəl/',
        partOfSpeech: 'Adjective',
        meaningAr: 'أساسي / جوهري لا غنى عنه',
        exampleEn: 'Clear pronunciation is essential for effective presentations.',
        exampleAr: 'النطق الواضح أمر جوهري للعروض التقديمية الفعالة.',
        clozeSentence: 'Daily practice is ________ if you want to master English.',
        clozeOptions: ['essential', 'optional', 'accidental'],
        clozeAnswer: 'essential',
      },
    ],
    dialogueSection: {
      contextTitleAr: 'التعارف الرسمي في اليوم الأول بالجامعة',
      contextTitleEn: 'First Day Academic Orientation & Self-Introduction',
      turns: [
        {
          speaker: 'Advisor (Dr. Tariq)',
          roleAr: 'المرشد الأكاديمي',
          textEn: 'Good morning! Welcome to the Academic English Center. Are you a new student here?',
          textAr: 'صباح الخير! مرحباً بك في مركز اللغة الإنجليزية الأكاديمية. هل أنت طالب جديد هنا؟',
          keyPhrase: 'Welcome to...',
        },
        {
          speaker: 'Student (Faisal)',
          roleAr: 'الطالب',
          textEn: 'Good morning, Dr. Tariq. Yes, I am. My name is Faisal, and I am in my first semester.',
          textAr: 'صباح الخير يا دكتور طارق. نعم، أنا طالب جديد. اسمي فيصل، وأنا في فصلي الدراسي الأول.',
          keyPhrase: 'I am in my first semester',
        },
        {
          speaker: 'Advisor (Dr. Tariq)',
          roleAr: 'المرشد الأكاديمي',
          textEn: 'Pleased to meet you, Faisal. Your orientation room is on the second floor, right next to the library.',
          textAr: 'تشرفت بمعرفتك يا فيصل. قاعة اللقاء التعريفي الخاصة بك في الطابق الثاني، بجوار المكتبة مباشرة.',
          keyPhrase: 'Pleased to meet you',
        },
        {
          speaker: 'Student (Faisal)',
          roleAr: 'الطالب',
          textEn: 'Thank you very much for your guidance. Have a wonderful day!',
          textAr: 'شكراً جزيلاً لإرشادك. أتمنى لك يوماً رائعاً!',
          keyPhrase: 'Thank you very much for your guidance',
        },
      ],
      simulations: [
        {
          situationAr: 'يسألك أستاذ المقرر في أول لقاء: "Hello! Are you registered in the morning section?"',
          partnerLineEn: 'Hello! Are you registered in the morning section?',
          partnerLineAr: 'مرحباً! هل أنت مسجل في الشعبة الصباحية؟',
          choices: [
            {
              textEn: 'Yes, I am. My name is Khalid, and I am on the official roster.',
              quality: 'optimal',
              feedbackAr: 'إجابة ممتازة وأكاديمية! استخدمت (Yes, I am) بشكل صحيح وأضفت تعريفاً واضحاً.',
            },
            {
              textEn: 'Yes, I is registered in morning.',
              quality: 'incorrect',
              feedbackAr: 'خطأ نحوي: الضمير (I) يأخذ (am) وليس (is)، كما ينقص الجملة أداة التعريف (the morning section).',
            },
            {
              textEn: 'Yeah, morning.',
              quality: 'informal',
              feedbackAr: 'رد مقتضب وغير رسمي؛ في البيئة الجامعية يُفضل الرد بجملة كاملة ومهذبة.',
            },
          ],
        },
      ],
    },
    readingWritingSection: {
      passageTitleEn: 'A Day in an Academic Learning Environment',
      passageTitleAr: 'يوم في بيئة التعلم الأكاديمية',
      paragraphs: [
        {
          tagAr: 'المقدمة والتعريف (Introduction)',
          textEn: 'University life is an exciting journey of discovery. First, every student is part of a collaborative academic community where curiosity and discipline are equally important.',
          textAr: 'الحياة الجامعية رحلة استكشافية مثيرة. أولاً، كل طالب هو جزء من مجتمع أكاديمي تعاوني حيث يتساوى الفضول العلمي والانضباط في الأهمية.',
          keyConnectors: ['First', 'where', 'and'],
        },
        {
          tagAr: 'العرض والتفاصيل (Body Paragraph)',
          textEn: 'In addition, the campus library and interactive laboratories are open throughout the week. These resources are essential tools for building strong research and language skills.',
          textAr: 'بالإضافة إلى ذلك، تفتح مكتبة الحرم الجامعي والمختبرات التفاعلية أبوابها طوال الأسبوع. وتُعد هذه الموارد أدوات جوهرية لبناء مهارات بحثية ولغوية قوية.',
          keyConnectors: ['In addition', 'throughout', 'for'],
        },
      ],
      comprehensionQuestion: {
        questionEn: 'According to the passage, why are the library and interactive laboratories important?',
        questionAr: 'وفقاً للنص، لماذا تُعد المكتبة والمختبرات التفاعلية مهمة؟',
        options: [
          'They are essential tools for building strong research and language skills.',
          'They are only open during final exam weeks.',
          'They are optional spaces for sports activities.',
        ],
        correctIndex: 0,
        explanationAr: 'ذكر النص صراحةً أن هذه الموارد أدوات جوهرية لبناء مهارات البحث واللغة (building strong research and language skills).',
      },
      writingPromptAr: 'اكتب فقرة تعريفية قصيرة (3 إلى 4 جمل) عن نفسك وتخصصك وأهدافك الدراسية باستخدام (am / is / are) والكلمات المستهدفة:',
      writingPromptEn: 'Write a 3–4 sentence self-introduction using Verb To Be and the target words below:',
      targetKeywords: ['am', 'is', 'schedule', 'essential', 'foundation'],
      modelAnswerEn:
        'My name is Ahmed, and I am a freshman at the university. English is an essential foundation for my academic studies. My daily study schedule is well organized, and my classmates are very supportive.',
    },
    quizSection: [
      {
        id: 'u1-q1',
        skillTag: 'Grammar · A1',
        questionEn: 'Choose the correct form: "The new laboratory computers ________ ready for the workshop."',
        questionAr: 'اختر الصيغة الصحيحة لفعل الكينونة:',
        options: ['are', 'is', 'am', 'be'],
        correctIndex: 0,
        explanationAr: 'الفاعل هو (computers) بصيغة الجمع، لذا يأخذ (are).',
      },
      {
        id: 'u1-q2',
        skillTag: 'Phonetics & Articles · A1',
        questionEn: 'Which article correctly completes the sentence: "It is ________ honor to join this academic program."',
        questionAr: 'أي أداة تنكير تكمل الجملة بشكل صحيح؟',
        options: ['an', 'a', 'the', 'no article'],
        correctIndex: 0,
        explanationAr: 'كلمة (honor) تُنطق /ˈɒn.ər/ وتبدأ بصوت علة لأن حرف H صامت، لذلك نختار (an).',
      },
      {
        id: 'u1-q3',
        skillTag: 'Vocabulary · A1',
        questionEn: 'What does the word "Essential" (/ɪˈsen.ʃəl/) mean in academic English?',
        questionAr: 'ما معنى كلمة "Essential" في السياق الأكاديمي؟',
        options: ['ضروري وجوهري', 'ثانوي ومؤقت', 'نادر الحدوث', 'معقد للغاية'],
        correctIndex: 0,
        explanationAr: 'كلمة Essential تعني جوهري أو ضروري لا غنى عنه (Necessary / Fundamental).',
      },
    ],
  },

  // ==========================================================================
  // UNIT 2 — LEVEL A2
  // ==========================================================================
  {
    unitNumber: 2,
    cefrLevel: 'Level A2',
    badgeColor: 'from-blue-500 to-indigo-500',
    titleAr: 'الوحدة الثانية (A2): الحياة اليومية والمضارع البسيط والمستمر',
    titleEn: 'Unit 2: Daily Routines, Present Simple & Present Continuous',
    subtitleAr: 'التمييز الدقيق بين العادات المتكررة والحقائق العلمية مقابل الأحداث الجارية لحظة الكلام.',
    grammarSection: {
      ruleTitleAr: 'المقارنة الهندسية بين المضارع البسيط (Present Simple) والمضارع المستمر (Present Continuous)',
      ruleTitleEn: 'Present Simple (Habits & Facts) vs. Present Continuous (Actions in Progress)',
      overviewAr:
        'يُستخدم المضارع البسيط للتعبير عن العادات المنتظمة والحقائق الثابتة والجداول الرسمية، بينما يُستخدم المضارع المستمر (am/is/are + V-ing) للأحداث المؤقتة التي تقع الآن أو في الفترة الحالية.',
      formulaBlocks: [
        {
          labelAr: 'المضارع البسيط (Present Simple)',
          labelEn: 'Subject + V1 (he/she/it + V-s/es)',
          examples: 'She reviews her notes every evening.',
          color: 'border-blue-400/50 bg-blue-950/50 text-blue-200',
        },
        {
          labelAr: 'المضارع المستمر (Present Continuous)',
          labelEn: 'Subject + am/is/are + Verb-ing',
          examples: 'She is reviewing a research paper right now.',
          color: 'border-emerald-400/50 bg-emerald-950/50 text-emerald-200',
        },
        {
          labelAr: 'أدوات الدلالة الزمنية (Time Markers)',
          labelEn: 'always, usually, often vs. now, currently, at the moment',
          examples: 'usually (Simple) · currently (Continuous)',
          color: 'border-purple-400/50 bg-purple-950/50 text-purple-200',
        },
      ],
      coreRules: [
        {
          titleAr: 'إضافة (s/es) مع المفرد الغائب في المضارع البسيط',
          patternEn: 'He / She / It + Verb + s / es / ies',
          exampleEn: 'The library opens at 8:00 AM and closes at 9:00 PM.',
          exampleAr: 'تفتح المكتبة الساعة الثامنة صباحاً وتغلق الساعة التاسعة مساءً.',
        },
        {
          titleAr: 'النفي والسؤال في المضارع البسيط (do / does)',
          patternEn: 'Do/Does + Subject + Base Verb? | Subject + do/does not + Base Verb',
          exampleEn: 'Does the workshop require prior registration?',
          exampleAr: 'هل تتطلب ورشة العمل تسجيلاً مسبقاً؟',
        },
        {
          titleAr: 'الأحداث الجارية الآن (Present Continuous)',
          patternEn: 'Subject + am/is/are + Verb-ing (right now / currently)',
          exampleEn: 'We are currently working on a collaborative project.',
          exampleAr: 'نحن نعمل في الوقت الحالي على مشروع تعاوني.',
        },
        {
          titleAr: 'الأفعال الحسية والإدراكية الثابتة (Stative Verbs)',
          patternEn: 'know, understand, believe, need, prefer (No -ing form)',
          exampleEn: 'I understand the main concept clearly now. (NOT: I am understanding)',
          exampleAr: 'أنا أفهم المفهوم الأساسي بوضوح الآن.',
        },
      ],
      sentenceBuilders: [
        {
          id: 'u2-sb1',
          promptAr: 'رتّب الكلمات لتكوين جملة في المضارع البسيط مع ظرف تكرار:',
          targetWords: ['Our', 'professor', 'always', 'explains', 'complex', 'concepts', 'clearly.'],
          scrambledWords: ['explains', 'clearly.', 'Our', 'concepts', 'always', 'professor', 'complex'],
          grammarTipAr: 'ظرف التكرار (always) يأتي قبل الفعل الأساسي (explains)، ونضيف (-s) للفعل لأن الفاعل مفرد (Our professor).',
        },
        {
          id: 'u2-sb2',
          promptAr: 'رتّب الكلمات لتكوين جملة في المضارع المستمر تصف حدثاً يجري حالياً:',
          targetWords: ['The', 'students', 'are', 'currently', 'preparing', 'their', 'presentations.'],
          scrambledWords: ['preparing', 'The', 'presentations.', 'currently', 'are', 'students', 'their'],
          grammarTipAr: 'نضع (are) بعد الفاعل الجمع، ثم ظرف الحال (currently)، ثم الفعل المضاف له (-ing).',
        },
      ],
      errorCorrections: [
        {
          id: 'u2-ec1',
          incorrectSentence: 'She is knowing the answer to this academic question.',
          options: [
            'She knows the answer to this academic question.',
            'She know the answer to this academic question.',
            'She are knowing the answer to this academic question.',
          ],
          correctIndex: 0,
          explanationAr: 'الفعل (know) من أفعال الإدراك الثابتة (Stative Verbs) التي لا تأتي في صيغة المستمر (-ing)، لذا نستخدم المضارع البسيط (knows).',
        },
      ],
    },
    vocabularySection: [
      {
        word: 'Consistent',
        ipa: '/kənˈsɪs.tənt/',
        partOfSpeech: 'Adjective',
        meaningAr: 'منتظم / متسق ومستمر على وتيرة ثابتة',
        exampleEn: 'Consistent daily reading improves comprehension rapidly.',
        exampleAr: 'القراءة اليومية المنتظمة تحسن الاستيعاب بسرعة.',
        clozeSentence: 'Success requires ________ effort throughout the semester.',
        clozeOptions: ['consistent', 'temporary', 'random'],
        clozeAnswer: 'consistent',
      },
      {
        word: 'Currently',
        ipa: '/ˈkʌr.ənt.li/',
        partOfSpeech: 'Adverb',
        meaningAr: 'حالياً / في الوقت الراهن',
        exampleEn: 'The research team is currently analyzing the survey results.',
        exampleAr: 'يقوم فريق البحث حالياً بتحليل نتائج الاستبيان.',
        clozeSentence: 'We are ________ upgrading our language laboratory.',
        clozeOptions: ['currently', 'yesterday', 'rarely'],
        clozeAnswer: 'currently',
      },
      {
        word: 'Collaborate',
        ipa: '/kəˈlæb.ə.reɪt/',
        partOfSpeech: 'Verb',
        meaningAr: 'يتعاون / يشترك في العمل',
        exampleEn: 'Students collaborate in small groups to solve case studies.',
        exampleAr: 'يتعاون الطلاب في مجموعات صغيرة لحل دراسات الحالة.',
        clozeSentence: 'Two departments ________ on the annual academic conference.',
        clozeOptions: ['collaborate', 'hesitate', 'separate'],
        clozeAnswer: 'collaborate',
      },
      {
        word: 'Priority',
        ipa: '/praɪˈɒr.ə.ti/',
        partOfSpeech: 'Noun',
        meaningAr: 'أولوية قصوى',
        exampleEn: 'Completing the weekly assignment is my top priority today.',
        exampleAr: 'إنجاز التكليف الأسبوعي هو أولويتي القصوى اليوم.',
        clozeSentence: 'Time management helps you set clear ________ for your tasks.',
        clozeOptions: ['priorities', 'obstacles', 'guesses'],
        clozeAnswer: 'priorities',
      },
    ],
    dialogueSection: {
      contextTitleAr: 'تنسيق مهام مشروع جماعي بين طالبين',
      contextTitleEn: 'Coordinating a Group Project & Weekly Routine',
      turns: [
        {
          speaker: 'Noura',
          roleAr: 'منسقة الفريق',
          textEn: 'Hi Omar! What are you working on at the moment?',
          textAr: 'مرحباً يا عمر! على ماذا تعمل في هذه اللحظة؟',
          keyPhrase: 'at the moment',
        },
        {
          speaker: 'Omar',
          roleAr: 'عضو الفريق',
          textEn: 'Hi Noura. I am currently summarizing the second chapter, and I usually finish my drafts before 4:00 PM.',
          textAr: 'أهلاً يا نورة. أنا ألخص حالياً الفصل الثاني، وعادةً ما أنهي مسوداتي قبل الرابعة عصراً.',
          keyPhrase: 'I am currently summarizing... / I usually finish...',
        },
        {
          speaker: 'Noura',
          roleAr: 'منسقة الفريق',
          textEn: 'That sounds great! Our team meets every Wednesday at 5:00 PM to review all sections together.',
          textAr: 'هذا يبدو رائعاً! يجتمع فريقنا كل يوم أربعاء الساعة الخامسة مساءً لمراجعة جميع الأقسام معاً.',
          keyPhrase: 'meets every Wednesday',
        },
      ],
      simulations: [
        {
          situationAr: 'يسألك زميلك في المختبر عن تقدمك الحالي: "How is your report going right now?"',
          partnerLineEn: 'How is your report going right now?',
          partnerLineAr: 'كيف يسير تقريرك في الوقت الحالي؟',
          choices: [
            {
              textEn: 'I am currently reviewing the final references, and I usually proofread everything twice.',
              quality: 'optimal',
              feedbackAr: 'إجابة مثالية! جمعت بين المضارع المستمر للحدث الجاري الآن (am currently reviewing) والمضارع البسيط للعادة المتكررة (usually proofread).',
            },
            {
              textEn: 'I review the final references right now.',
              quality: 'incorrect',
              feedbackAr: 'مع وجود (right now) لحدث مؤقت جارٍ حالياً، يجب استخدام المضارع المستمر (I am reviewing).',
            },
          ],
        },
      ],
    },
    readingWritingSection: {
      passageTitleEn: 'Balancing Daily Habits and Ongoing Projects',
      passageTitleAr: 'الموازنة بين العادات اليومية والمشاريع الجارية',
      paragraphs: [
        {
          tagAr: 'الروتين اليومي المنتظم (Present Simple)',
          textEn: 'Successful learners follow a consistent daily routine. Every morning, they review their priority list, attend lectures actively, and summarize key vocabulary.',
          textAr: 'يتبع المتعلمون الناجحون روتيناً يومياً منتظماً. ففي كل صباح، يراجعون قائمة أولوياتهم، ويحضرون المحاضرات بفاعلية، ويلخصون المفردات الرئيسية.',
          keyConnectors: ['Every morning', 'and'],
        },
        {
          tagAr: 'المشاريع الجارية حالياً (Present Continuous)',
          textEn: 'At the same time, universities are currently integrating interactive digital books into their classrooms. As a result, students are collaborating more effectively than ever before.',
          textAr: 'وفي الوقت نفسه، تدمج الجامعات حالياً الكتب الرقمية التفاعلية في قاعاتها الدراسية. ونتيجةً لذلك، يتعاون الطلاب بفاعلية أكبر من أي وقت مضى.',
          keyConnectors: ['At the same time', 'currently', 'As a result'],
        },
      ],
      comprehensionQuestion: {
        questionEn: 'Why does the second paragraph use the Present Continuous ("are currently integrating")?',
        questionAr: 'لماذا استخدمت الفقرة الثانية زمن المضارع المستمر؟',
        options: [
          'Because it describes an ongoing development happening in the current period.',
          'Because it describes an event that finished a century ago.',
          'Because "integrate" is a stative verb.',
        ],
        correctIndex: 0,
        explanationAr: 'استُخدم المضارع المستمر لأنه يصف تطوراً جارياً ومستمراً في الفترة الحالية (currently).',
      },
      writingPromptAr: 'اكتب فقرة من 3–4 جمل تقارن فيها بين عاداتك الدراسية اليومية (Present Simple) وما تعمل عليه حالياً هذا الأسبوع (Present Continuous):',
      writingPromptEn: 'Write 3–4 sentences describing your usual study routine and what you are currently working on this week:',
      targetKeywords: ['usually', 'currently', 'consistent', 'priority', 'collaborate'],
      modelAnswerEn:
        'I usually start my study routine at 7:00 AM because consistent practice is my top priority. This week, I am currently preparing an English presentation and collaborating with my classmates on a new project.',
    },
    quizSection: [
      {
        id: 'u2-q1',
        skillTag: 'Grammar · A2',
        questionEn: 'Select the correct verb form: "Look! The lecturer ________ the 3D simulation on the main screen."',
        questionAr: 'اختر صيغة الفعل الصحيحة للجملة التالية:',
        options: ['is demonstrating', 'demonstrates', 'demonstrate', 'are demonstrating'],
        correctIndex: 0,
        explanationAr: 'كلمة التنبيه (Look!) تدل على حدث يقع أمامنا الآن، والفاعل مفرد (The lecturer) فنختار (is demonstrating).',
      },
      {
        id: 'u2-q2',
        skillTag: 'Stative Verbs · A2',
        questionEn: 'Which sentence is grammatically CORRECT?',
        questionAr: 'أي الجمل التالية صحيحة نحوياً؟',
        options: [
          'I prefer structured study plans over random reading.',
          'I am preferring structured study plans over random reading.',
          'She is knowing all the phonetic symbols.',
          'They are needing more time right now.',
        ],
        correctIndex: 0,
        explanationAr: 'الأفعال (prefer, know, need) أفعال حالة (Stative Verbs) تُصاغ في المضارع البسيط وليس المستمر.',
      },
    ],
  },

  // ==========================================================================
  // UNIT 3 — LEVEL B1
  // ==========================================================================
  {
    unitNumber: 3,
    cefrLevel: 'Level B1',
    badgeColor: 'from-teal-500 to-emerald-500',
    titleAr: 'الوحدة الثالثة (B1): سرد الخبرات السابقة والمضارع التام والتخطيط للمستقبل',
    titleEn: 'Unit 3: Past Experiences, Present Perfect & Future Plans',
    subtitleAr: 'الربط بين الماضي والحاضر عبر (have/has + V3) والتمييز بينه وبين الماضي البسيط المحدد زمنياً.',
    grammarSection: {
      ruleTitleAr: 'المضارع التام (Present Perfect) مقابل الماضي البسيط (Past Simple) وصيغ المستقبل',
      ruleTitleEn: 'Present Perfect (have/has + Past Participle) vs. Past Simple & Future Forms',
      overviewAr:
        'نستخدم الماضي البسيط (V2) عندما نذكر وقتاً محدداً ومنتهياً في الماضي (مثل yesterday, in 2024)، بينما نستخدم المضارع التام (have/has + V3) للخبرات والإنجازات التي تمت في وقت غير محدد أو التي لا يزال أثرها ممتداً حتى الحاضر.',
      formulaBlocks: [
        {
          labelAr: 'الماضي البسيط (Past Simple)',
          labelEn: 'Subject + V2 (Completed Past Time)',
          examples: 'We completed the first module last week.',
          color: 'border-amber-400/50 bg-amber-950/50 text-amber-200',
        },
        {
          labelAr: 'المضارع التام (Present Perfect)',
          labelEn: 'Subject + have / has + V3 (Past Participle)',
          examples: 'We have already completed three modules so far.',
          color: 'border-emerald-400/50 bg-emerald-950/50 text-emerald-200',
        },
        {
          labelAr: 'التخطيط للمستقبل (Future Plans)',
          labelEn: 'be going to + V1 (Plan) / will + V1 (Decision/Prediction)',
          examples: 'I am going to present my findings tomorrow.',
          color: 'border-cyan-400/50 bg-cyan-950/50 text-cyan-200',
        },
      ],
      coreRules: [
        {
          titleAr: 'إنجاز له أثر حاضر (already / just / yet / so far)',
          patternEn: 'Subject + have/has + already/just + V3',
          exampleEn: 'The committee has already published the updated syllabus.',
          exampleAr: 'لقد نشرت اللجنة بالفعل توصيف المقرر المحدث (والنسخة متاحة الآن).',
        },
        {
          titleAr: 'المدة الزمنية الممتدة (since vs. for)',
          patternEn: 'for + Duration (for three years) | since + Starting Point (since 2023)',
          exampleEn: 'He has studied academic English for two years (since 2024).',
          exampleAr: 'لقد درس الإنجليزية الأكاديمية لمدة عامين (منذ عام 2024 وحتى الآن).',
        },
      ],
      sentenceBuilders: [
        {
          id: 'u3-sb1',
          promptAr: 'رتّب الكلمات لتكوين جملة صحيحة في زمن المضارع التام:',
          targetWords: ['She', 'has', 'achieved', 'remarkable', 'progress', 'since', 'September.'],
          scrambledWords: ['progress', 'September.', 'She', 'remarkable', 'has', 'since', 'achieved'],
          grammarTipAr: 'نستخدم (has + V3: achieved) مع (since September) للدلالة على استمرار التقدم منذ سبتمبر حتى الآن.',
        },
      ],
      errorCorrections: [
        {
          id: 'u3-ec1',
          incorrectSentence: 'I have attended the international conference yesterday.',
          options: [
            'I attended the international conference yesterday.',
            'I has attended the international conference yesterday.',
            'I have attend the international conference yesterday.',
          ],
          correctIndex: 0,
          explanationAr: 'مع وجود زمن ماضٍ محدد ومنتهٍ مثل (yesterday)، يُمنع استخدام المضارع التام ويجب استخدام الماضي البسيط (attended).',
        },
      ],
    },
    vocabularySection: [
      {
        word: 'Accomplish',
        ipa: '/əˈkʌm.plɪʃ/',
        partOfSpeech: 'Verb',
        meaningAr: 'ينجز / يحقق بنجاح',
        exampleEn: 'Our team has accomplished all key milestones ahead of schedule.',
        exampleAr: 'لقد أنجز فريقنا جميع المراحل الرئيسية قبل الموعد المحدد.',
        clozeSentence: 'With clear planning, you can ________ your academic goals.',
        clozeOptions: ['accomplish', 'abandon', 'confuse'],
        clozeAnswer: 'accomplish',
      },
      {
        word: 'Significant',
        ipa: '/sɪɡˈnɪf.ɪ.kənt/',
        partOfSpeech: 'Adjective',
        meaningAr: 'ملحوظ / ذو دلالة وأهمية كبيرة',
        exampleEn: 'There has been a significant improvement in her writing fluency.',
        exampleAr: 'حدث تحسن ملحوظ وكبير في طلاقة كتابتها.',
        clozeSentence: 'The experiment produced a ________ change in performance.',
        clozeOptions: ['significant', 'trivial', 'silent'],
        clozeAnswer: 'significant',
      },
      {
        word: 'Objective',
        ipa: '/əbˈdʒek.tɪv/',
        partOfSpeech: 'Noun / Adjective',
        meaningAr: 'هدف محدد / موضوعي',
        exampleEn: 'Our main objective for next month is to complete the research paper.',
        exampleAr: 'هدفنا الرئيسي للشهر القادم هو إتمام الورقة البحثية.',
        clozeSentence: 'Every training module begins with a clear learning ________.',
        clozeOptions: ['objective', 'accident', 'delay'],
        clozeAnswer: 'objective',
      },
      {
        word: 'Experience',
        ipa: '/ɪkˈspɪə.ri.əns/',
        partOfSpeech: 'Noun / Verb',
        meaningAr: 'خبرة عملية / تجربة',
        exampleEn: 'Practical laboratory work gives students valuable hands-on experience.',
        exampleAr: 'يمنح العمل المخبري التطبيقي الطلاب خبرة عملية قيّمة.',
        clozeSentence: 'Have you ever had any prior ________ in public speaking?',
        clozeOptions: ['experience', 'furniture', 'departure'],
        clozeAnswer: 'experience',
      },
    ],
    dialogueSection: {
      contextTitleAr: 'مقابلة الترشح لبرنامج تدريب بحثي صيفي',
      contextTitleEn: 'Academic Internship & Progress Interview',
      turns: [
        {
          speaker: 'Interviewer',
          roleAr: 'رئيس اللجنة',
          textEn: 'Could you tell us what academic projects you have completed so far?',
          textAr: 'هل يمكنك إخبارنا بالمشاريع الأكاديمية التي أنجزتها حتى الآن؟',
          keyPhrase: 'have completed so far',
        },
        {
          speaker: 'Candidate (Reem)',
          roleAr: 'المترشحة',
          textEn: 'Certainly. Over the past year, I have participated in two analytical workshops, and last month I presented a seminar on technical communication.',
          textAr: 'بالتأكيد. خلال العام الماضي شاركتُ في ورشتي عمل تحليليتين، وفي الشهر الماضي قدمتُ ندوة حول التواصل التقني.',
          keyPhrase: 'I have participated... / last month I presented...',
        },
      ],
      simulations: [
        {
          situationAr: 'يسألك المحاور في المقابلة: "What are your plans for the upcoming semester?"',
          partnerLineEn: 'What are your plans for the upcoming semester?',
          partnerLineAr: 'ما هي خططك للفصل الدراسي القادم؟',
          choices: [
            {
              textEn: 'I am going to focus on advanced academic writing, and I plan to publish a summary report.',
              quality: 'optimal',
              feedbackAr: 'إجابة ممتازة! استخدمت صيغة التخطيط المسبق (am going to focus / plan to) بدقة.',
            },
            {
              textEn: 'I have focused on advanced writing tomorrow.',
              quality: 'incorrect',
              feedbackAr: 'خطأ زمني: لا يجوز استخدام المضارع التام (have focused) مع زمن مستقبلي (tomorrow).',
            },
          ],
        },
      ],
    },
    readingWritingSection: {
      passageTitleEn: 'From Past Milestones to Future Horizons',
      passageTitleAr: 'من الإنجازات السابقة إلى الآفاق المستقبلية',
      paragraphs: [
        {
          tagAr: 'الخبرات المتراكمة (Present Perfect)',
          textEn: 'Over the last decade, interactive learning has transformed higher education. Students have gained access to dynamic 3D textbooks that bridge theory and practice.',
          textAr: 'على مدى العقد الماضي، غيّر التعلم التفاعلي التعليم العالي. فقد اكتسب الطلاب إمكانية الوصول إلى كتب ثلاثية الأبعاد ديناميكية تصل النظرية بالتطبيق.',
          keyConnectors: ['Over the last decade', 'that'],
        },
        {
          tagAr: 'التوجه المستقبلي (Future Outlook)',
          textEn: 'Looking ahead, academic institutions are going to expand personalized training laboratories so every learner can accomplish their full potential.',
          textAr: 'وبالنظر إلى المستقبل، سوف تتوسع المؤسسات الأكاديمية في المختبرات التدريبية المخصصة حتى يتمكن كل متعلم من تحقيق كامل إمكاناته.',
          keyConnectors: ['Looking ahead', 'so'],
        },
      ],
      comprehensionQuestion: {
        questionEn: 'Why does the author use "has transformed" in the first sentence?',
        questionAr: 'لماذا استخدم الكاتب صيغة المضارع التام (has transformed) في الجملة الأولى؟',
        options: [
          'Because the transformation started in the past and its impact continues in the present.',
          'Because the transformation ended fifty years ago.',
          'Because it is a conditional sentence.',
        ],
        correctIndex: 0,
        explanationAr: 'المضارع التام مع (Over the last decade) يربط التغير الذي بدأ في الماضي بأثره المستمر حتى اليوم.',
      },
      writingPromptAr: 'اكتب فقرة قصيرة تذكر فيها إنجازاً حققته في الماضي (have/has + V3) وهدفاً تخطط لإنجازه قريباً (am going to):',
      writingPromptEn: 'Write 3–4 sentences about what you have accomplished so far and your next objective:',
      targetKeywords: ['have', 'accomplished', 'significant', 'objective', 'going to'],
      modelAnswerEn:
        'So far, I have accomplished significant progress in my English vocabulary and grammar. Next month, my main objective is to master academic essay writing, and I am going to practice every day.',
    },
    quizSection: [
      {
        id: 'u3-q1',
        skillTag: 'Grammar · B1',
        questionEn: 'Choose the correct form: "Dr. Al-Harbi ________ three textbooks since 2021."',
        questionAr: 'اختر الصيغة الصحيحة للفعل مع وجود (since 2021):',
        options: ['has authored', 'authored', 'is authoring', 'author'],
        correctIndex: 0,
        explanationAr: 'وجود (since 2021) يدل على فترة ممتدة من الماضي حتى الحاضر، لذا نستخدم المضارع التام (has authored).',
      },
    ],
  },

  // ==========================================================================
  // UNIT 4 — LEVEL B2
  // ==========================================================================
  {
    unitNumber: 4,
    cefrLevel: 'Level B2',
    badgeColor: 'from-indigo-500 to-violet-500',
    titleAr: 'الوحدة الرابعة (B2): الجمل الشرطية، المبني للمجهول، والروابط المنطقية',
    titleEn: 'Unit 4: Conditionals, Passive Voice & Logical Connectors',
    subtitleAr: 'صياغة الفرضيات العلمية، الكتابة الموضوعية بصيغة المبني للمجهول، وأدوات الربط البرهاني.',
    grammarSection: {
      ruleTitleAr: 'المبني للمجهول الأكاديمي (Passive Voice) وحالات الشرط (Conditionals Zero, 1, 2, 3)',
      ruleTitleEn: 'Academic Passive Voice (be + V3) & Conditional Structures',
      overviewAr:
        'تكثر في الأبحاث والتقارير الأكاديمية صيغة المبني للمجهول (be + Past Participle) للتركيز على الفعل والإجراء العلمي بدلاً من الفاعل الشخصي، كما تُستخدم الجمل الشرطية لبناء الاستنتاجات والفرضيات.',
      formulaBlocks: [
        {
          labelAr: 'المبني للمجهول (Passive Voice)',
          labelEn: 'Object + be (is/are/was/were/has been) + V3',
          examples: 'The data was analyzed carefully by the research team.',
          color: 'border-violet-400/50 bg-violet-950/50 text-violet-200',
        },
        {
          labelAr: 'الشرط الأول والثاني (1st & 2nd Conditionals)',
          labelEn: 'If + Present, will + V1 | If + Past, would + V1',
          examples: 'If you revise daily, you will succeed.',
          color: 'border-sky-400/50 bg-sky-950/50 text-sky-200',
        },
        {
          labelAr: 'الروابط المنطقية (Logical Connectors)',
          labelEn: 'However, Furthermore, Consequently, Whereas',
          examples: 'The method is fast; however, it requires calibration.',
          color: 'border-emerald-400/50 bg-emerald-950/50 text-emerald-200',
        },
      ],
      coreRules: [
        {
          titleAr: 'تحويل الجملة إلى المبني للمجهول في المضارع والماضي',
          patternEn: 'is/are + V3 (Present) | was/were + V3 (Past) | has/have been + V3 (Perfect)',
          exampleEn: 'All academic submissions are evaluated according to strict criteria.',
          exampleAr: 'تُقيّم جميع الأعمال الأكاديمية المقدمة وفق معايير دقيقة.',
        },
        {
          titleAr: 'الشرط الافتراضي غير الواقعي (Second Conditional)',
          patternEn: 'If + Subject + Past Simple (were/V2), Subject + would/could + Base Verb',
          exampleEn: 'If we had more laboratory time, we would test additional samples.',
          exampleAr: 'لو كان لدينا وقت مخبري أطول، لاختبرنا عينات إضافية.',
        },
      ],
      sentenceBuilders: [
        {
          id: 'u4-sb1',
          promptAr: 'رتّب الكلمات لتكوين جملة أكاديمية صحيحة في صيغة المبني للمجهول:',
          targetWords: ['The', 'final', 'results', 'were', 'verified', 'by', 'independent', 'experts.'],
          scrambledWords: ['verified', 'experts.', 'The', 'were', 'by', 'final', 'independent', 'results'],
          grammarTipAr: 'نائب الفاعل الجمع (The final results) يأخذ في الماضي المبني للمجهول (were + V3: verified).',
        },
      ],
      errorCorrections: [
        {
          id: 'u4-ec1',
          incorrectSentence: 'If the student will study consistently, he will pass the exam.',
          options: [
            'If the student studies consistently, he will pass the exam.',
            'If the student study consistently, he will pass the exam.',
            'If the student studied consistently, he will pass the exam.',
          ],
          correctIndex: 0,
          explanationAr: 'في جملة فعل الشرط بعد (If) في الحالة الأولى نستخدم المضارع البسيط (studies) ولا نضع (will) داخل شطر (If).',
        },
      ],
    },
    vocabularySection: [
      {
        word: 'Comprehensive',
        ipa: '/ˌkɒm.prɪˈhen.sɪv/',
        partOfSpeech: 'Adjective',
        meaningAr: 'شامل / مستفيض يحيط بجميع الجوانب',
        exampleEn: 'The guide provides a comprehensive overview of English grammar.',
        exampleAr: 'يقدم الدليل نظرة شاملة ومستفيضة لقواعد اللغة الإنجليزية.',
        clozeSentence: 'Before the final exam, students need a ________ review of all units.',
        clozeOptions: ['comprehensive', 'superficial', 'partial'],
        clozeAnswer: 'comprehensive',
      },
      {
        word: 'Consequently',
        ipa: '/ˈkɒn.sɪ.kwənt.li/',
        partOfSpeech: 'Adverb (Connector)',
        meaningAr: 'وبالتالي / ونتيجةً لذلك',
        exampleEn: 'The sample size was small; consequently, further research is required.',
        exampleAr: 'كان حجم العينة صغيراً؛ ونتيجةً لذلك يلزم إجراء مزيد من البحث.',
        clozeSentence: 'He practiced speaking daily; ________, his confidence grew rapidly.',
        clozeOptions: ['consequently', 'although', 'despite'],
        clozeAnswer: 'consequently',
      },
      {
        word: 'Evaluate',
        ipa: '/ɪˈvæl.ju.eɪt/',
        partOfSpeech: 'Verb',
        meaningAr: 'يُقيّم / يزن الأدلة علمياً',
        exampleEn: 'Independent reviewers evaluate each research proposal objectively.',
        exampleAr: 'يُقيّم المراجعون المستقلون كل مقترح بحثي بموضوعية.',
        clozeSentence: 'This rubric is used to ________ academic essays fairly.',
        clozeOptions: ['evaluate', 'neglect', 'conceal'],
        clozeAnswer: 'evaluate',
      },
      {
        word: 'Hypothesis',
        ipa: '/haɪˈpɒθ.ə.sɪs/',
        partOfSpeech: 'Noun',
        meaningAr: 'فرضية علمية قابلة للاختبار',
        exampleEn: 'The experimental data strongly supported our initial hypothesis.',
        exampleAr: 'دعمت البيانات التجريبية فرضيتنا الأولية بقوة.',
        clozeSentence: 'Before running the experiment, formulate a clear ________.',
        clozeOptions: ['hypothesis', 'coincidence', 'hesitation'],
        clozeAnswer: 'hypothesis',
      },
    ],
    dialogueSection: {
      contextTitleAr: 'مناقشة منهجية تقرير أكاديمي مع المشرف',
      contextTitleEn: 'Discussing Report Methodology & Formal Style',
      turns: [
        {
          speaker: 'Supervisor',
          roleAr: 'المشرف الأكاديمي',
          textEn: 'Your methodology section is informative; however, it should be written in the passive voice to maintain an objective tone.',
          textAr: 'قسم المنهجية لديك غني بالمعلومات؛ غير أنه ينبغي كتابته بصيغة المبني للمجهول للحفاظ على نبرة موضوعية.',
          keyPhrase: 'however, it should be written in the passive voice',
        },
        {
          speaker: 'Researcher',
          roleAr: 'الباحث',
          textEn: 'Thank you for the feedback. If I revise the active sentences into passive constructions today, will the draft be ready for submission?',
          textAr: 'شكراً لملاحظتك. إذا قمتُ بتعديل الجمل المبنية للمعلوم إلى تراكيب مبنية للمجهول اليوم، فهل ستكون المسودة جاهزة للتسليم؟',
          keyPhrase: 'If I revise..., will the draft be ready...',
        },
      ],
      simulations: [
        {
          situationAr: 'يطلب منك المشرف تحويل الجملة التالية إلى أسلوب أكاديمي مبني للمجهول: "We collected the survey responses in March."',
          partnerLineEn: 'How would you rewrite "We collected the survey responses in March" in formal academic passive voice?',
          partnerLineAr: 'كيف تعيد صياغة هذه الجملة بأسلوب أكاديمي رسمي مبني للمجهول؟',
          choices: [
            {
              textEn: 'The survey responses were collected in March.',
              quality: 'optimal',
              feedbackAr: 'تحويل ممتاز! قدمت المفعول به الجمع (The survey responses) واستخدمت (were collected) في الماضي المبني للمجهول.',
            },
            {
              textEn: 'The survey responses was collect in March.',
              quality: 'incorrect',
              feedbackAr: 'خطأ نحوي: الجمع يأخذ (were) متبوعاً بالتصريف الثالث (collected).',
            },
          ],
        },
      ],
    },
    readingWritingSection: {
      passageTitleEn: 'Objectivity and Logical Flow in Academic Reports',
      passageTitleAr: 'الموضوعية والترابط المنطقي في التقارير الأكاديمية',
      paragraphs: [
        {
          tagAr: 'المبني للمجهول في المنهجية (Passive Methodology)',
          textEn: 'In formal academic writing, procedures are described objectively. For instance, questionnaires are distributed to participants, and responses are analyzed systematically.',
          textAr: 'في الكتابة الأكاديمية الرسمية، تُوصف الإجراءات بموضوعية. فعلى سبيل المثال، تُوزع الاستبيانات على المشاركين، وتُحلل الاستجابات بصورة منهجية.',
          keyConnectors: ['For instance', 'and'],
        },
        {
          tagAr: 'الربط الاستنتاجي (Logical Consequence)',
          textEn: 'However, raw figures alone do not guarantee clarity; consequently, each table must be accompanied by a concise analytical explanation.',
          textAr: 'ومع ذلك، فإن الأرقام الخام وحدها لا تضمن الوضوح؛ وبالتالي، يجب أن يُرفق كل جدول بشرح تحليلي موجز.',
          keyConnectors: ['However', 'consequently'],
        },
      ],
      comprehensionQuestion: {
        questionEn: 'What is the logical function of the connector "However" in the second paragraph?',
        questionAr: 'ما الوظيفة المنطقية لأداة الربط (However) في الفقرة الثانية؟',
        options: [
          'It introduces a contrast or limitation to the previous statement.',
          'It gives a chronological sequence of past events.',
          'It expresses a future personal wish.',
        ],
        correctIndex: 0,
        explanationAr: 'الأداة (However) تُستخدم لتقديم استدراك أو تضاد منطقي مع الفكرة السابقة.',
      },
      writingPromptAr: 'اكتب فقرة رسمية قصيرة (3–4 جمل) تستخدم فيها صيغة المبني للمجهول (is/are/were + V3) وأداة ربط منطقية مثل (consequently أو however):',
      writingPromptEn: 'Write 3–4 formal sentences using the passive voice and logical connectors:',
      targetKeywords: ['comprehensive', 'evaluated', 'consequently', 'hypothesis'],
      modelAnswerEn:
        'A comprehensive literature review was conducted before the experiment. Each hypothesis was evaluated carefully using empirical tests; consequently, the final conclusions are strongly supported by evidence.',
    },
    quizSection: [
      {
        id: 'u4-q1',
        skillTag: 'Passive Voice · B2',
        questionEn: 'Choose the correct passive form: "The new academic guidelines ________ by the senate last week."',
        questionAr: 'اختر صيغة المبني للمجهول الصحيحة:',
        options: ['were approved', 'was approved', 'approved', 'have approving'],
        correctIndex: 0,
        explanationAr: 'الفاعل الجمع (guidelines) مع زمن ماضٍ محدد (last week) يأخذ في المبني للمجهول (were approved).',
      },
    ],
  },

  // ==========================================================================
  // UNIT 5 — LEVEL C1–C2 (IELTS & ACADEMIC MASTERY)
  // ==========================================================================
  {
    unitNumber: 5,
    cefrLevel: 'Level C1–C2',
    badgeColor: 'from-emerald-500 to-teal-400',
    titleAr: 'الوحدة الخامسة (C1–C2): القراءة الاستيعابية المتقدمة وكتابة المقال الأكاديمي واحتراف IELTS',
    titleEn: 'Unit 5: Advanced Academic Reading, Essay Writing & IELTS Mastery',
    subtitleAr: 'التقديم البلاغي (Inversion)، التماسك النصي (Coherence & Cohesion)، وبناء أطروحة المقال الأكاديمي (Band 8+).',
    grammarSection: {
      ruleTitleAr: 'التراكيب البلاغية المتقدمة: التقديم للتوكيد (Negative Inversion) والجمل الاسمية المركبة',
      ruleTitleEn: 'Advanced Syntactic Structures: Negative Inversion, Cleft Sentences & Nominalization',
      overviewAr:
        'في المستويين المتقدمين (C1–C2) واختبارات الكفاءة الأكاديمية مثل (IELTS Academic)، يتميز الأسلوب الرفيع باستخدام التقديم البلاغي (Inversion) بعد العبارات الحصرية (Not only..., Seldom..., Rarely...)، وتحويل الأفعال إلى مصادر اسمية رصينة (Nominalization).',
      formulaBlocks: [
        {
          labelAr: 'التقديم البلاغي (Negative Inversion)',
          labelEn: 'Not only + Auxiliary + Subject + Verb, but also...',
          examples: 'Not only does this model improve accuracy, but it also reduces latency.',
          color: 'border-emerald-400/50 bg-emerald-950/50 text-emerald-200',
        },
        {
          labelAr: 'الجمل الموصولة المختزلة (Reduced Relative Clauses)',
          labelEn: 'Noun + V-ing (Active) / Noun + V3 (Passive)',
          examples: 'The evidence presented in the study confirms the theory.',
          color: 'border-cyan-400/50 bg-cyan-950/50 text-cyan-200',
        },
        {
          labelAr: 'هيكل المقال الأكاديمي (Academic Essay Blueprint)',
          labelEn: 'Hook ➔ Thesis Statement ➔ Topic Sentences ➔ Synthesis',
          examples: 'Clear thesis + Cohesive body paragraphs',
          color: 'border-amber-400/50 bg-amber-950/50 text-amber-200',
        },
      ],
      coreRules: [
        {
          titleAr: 'قاعدة التقديم بعد (Not only / Seldom / Never before)',
          patternEn: 'Negative Adverbial + Auxiliary (do/does/did/has/can) + Subject + Main Verb',
          exampleEn: 'Seldom have researchers observed such a rapid pedagogical shift.',
          exampleAr: 'قلّما لاحظ الباحثون مثل هذا التحول التربوي السريع.',
        },
        {
          titleAr: 'الجمل الحصرية التوكيدية (It-Cleft & What-Cleft Sentences)',
          patternEn: 'It is [Focused Element] that + Clause | What [Clause] is [Focused Element]',
          exampleEn: 'What distinguishes high-scoring essays is logical coherence.',
          exampleAr: 'إن ما يميز المقالات ذات الدرجات العالية هو الترابط المنطقي.',
        },
      ],
      sentenceBuilders: [
        {
          id: 'u5-sb1',
          promptAr: 'رتّب الكلمات لتكوين جملة بلاغية متقدمة بأسلوب التقديم (Negative Inversion):',
          targetWords: ['Not', 'only', 'does', 'reading', 'expand', 'vocabulary,', 'but', 'it', 'also', 'sharpens', 'critical', 'thinking.'],
          scrambledWords: ['expand', 'does', 'Not', 'vocabulary,', 'only', 'reading', 'also', 'but', 'thinking.', 'it', 'sharpens', 'critical'],
          grammarTipAr: 'عند البدء بـ (Not only) نقدم الفعل المساعد (does) قبل الفاعل (reading) ثم الفعل المجرد (expand).',
        },
      ],
      errorCorrections: [
        {
          id: 'u5-ec1',
          incorrectSentence: 'Not only the study provides empirical data, but it also offers practical solutions.',
          options: [
            'Not only does the study provide empirical data, but it also offers practical solutions.',
            'Not only the study provide empirical data, but it also offers practical solutions.',
            'Not only did the study provides empirical data, but it also offers practical solutions.',
          ],
          correctIndex: 0,
          explanationAr: 'بعد (Not only) في بداية الجملة يجب قلب التركيب وتقديم الفعل المساعد: (Not only does the study provide...).',
        },
      ],
    },
    vocabularySection: [
      {
        word: 'Articulate',
        ipa: '/ɑːˈtɪk.jə.leɪt/',
        partOfSpeech: 'Verb / Adjective',
        meaningAr: 'فصيح / يُعبّر بوضوح وطلاقة',
        exampleEn: 'She articulated her main arguments with remarkable clarity.',
        exampleAr: 'عبّرت عن حججها الرئيسية بوضوح لافت.',
        clozeSentence: 'High-scoring candidates ________ complex ideas with precision.',
        clozeOptions: ['articulate', 'obscure', 'mumble'],
        clozeAnswer: 'articulate',
      },
      {
        word: 'Synthesize',
        ipa: '/ˈsɪn.θə.saɪz/',
        partOfSpeech: 'Verb',
        meaningAr: 'يدمج ويؤلف بين مصادر وأفكار متعددة',
        exampleEn: 'Advanced researchers synthesize findings from multiple studies.',
        exampleAr: 'يدمج الباحثون المتقدمون النتائج من دراسات متعددة.',
        clozeSentence: 'A literature review must ________ evidence rather than merely listing facts.',
        clozeOptions: ['synthesize', 'fragment', 'ignore'],
        clozeAnswer: 'synthesize',
      },
      {
        word: 'Coherence',
        ipa: '/kəʊˈhɪə.rəns/',
        partOfSpeech: 'Noun',
        meaningAr: 'الترابط المنطقي وتماسك الأفكار',
        exampleEn: 'Essay coherence is essential for achieving a Band 8 in IELTS.',
        exampleAr: 'ترابط المقال ضروري لتحقيق الدرجة الثامنة في اختبار الآيلتس.',
        clozeSentence: 'Clear topic sentences strengthen the overall ________ of an academic essay.',
        clozeOptions: ['coherence', 'ambiguity', 'contradiction'],
        clozeAnswer: 'coherence',
      },
      {
        word: 'Empirical',
        ipa: '/ɪmˈpɪr.ɪ.kəl/',
        partOfSpeech: 'Adjective',
        meaningAr: 'تجريبي / قائم على الدليل والملاحظة الميدانية',
        exampleEn: 'Every scientific claim requires rigorous empirical evidence.',
        exampleAr: 'يتطلب كل ادعاء علمي دليلاً تجريبياً رصيناً.',
        clozeSentence: 'The authors supported their thesis with ________ data collected over five years.',
        clozeOptions: ['empirical', 'fictional', 'speculative'],
        clozeAnswer: 'empirical',
      },
    ],
    dialogueSection: {
      contextTitleAr: 'مناقشة أطروحة بحثية في ندوة أكاديمية متقدمة',
      contextTitleEn: 'Defending an Academic Thesis in a Research Colloquium',
      turns: [
        {
          speaker: 'Panel Chair',
          roleAr: 'رئيس الجلسة العلمية',
          textEn: 'How does your study synthesize the conflicting findings reported in earlier literature?',
          textAr: 'كيف تدمج دراستكم النتائج المتباينة الواردة في الأدبيات البحثية السابقة؟',
          keyPhrase: 'synthesize the conflicting findings',
        },
        {
          speaker: 'Lead Author',
          roleAr: 'الباحث الرئيسي',
          textEn: 'Not only did we re-examine the empirical datasets, but we also articulated a unified framework that resolves those discrepancies.',
          textAr: 'لم نكتفِ بإعادة فحص مجموعات البيانات التجريبية فحسب، بل صغنا أيضاً إطاراً موحداً يحسم تلك التباينات.',
          keyPhrase: 'Not only did we re-examine..., but we also articulated...',
        },
      ],
      simulations: [
        {
          situationAr: 'يُسأل الباحث في اختبار المحادثة الأكاديمية (IELTS Speaking Part 3): "Why is coherence important in persuasive writing?"',
          partnerLineEn: 'Why is coherence so important in persuasive academic writing?',
          partnerLineAr: 'لماذا يُعد الترابط المنطقي (Coherence) مهماً للغاية في الكتابة الإقناعية الأكاديمية؟',
          choices: [
            {
              textEn: 'Not only does coherence guide the reader smoothly from the thesis to the conclusion, but it also allows the writer to articulate complex evidence persuasively.',
              quality: 'optimal',
              feedbackAr: 'إجابة بمستوى (Band 8.5 / C2)! وظفت التقديم البلاغي (Not only does...) ومفردات المستوى المتقدم (coherence, articulate).',
            },
            {
              textEn: 'Coherence is good because people read easy.',
              quality: 'informal',
              feedbackAr: 'لغة بسيطة جداً (A1/A2) وتحتوي على خطأ في استخدام الصفة (easy) بدلاً من الظرف (easily).',
            },
          ],
        },
      ],
    },
    readingWritingSection: {
      passageTitleEn: 'Architecting High-Impact Academic Essays (IELTS Band 8+ Standard)',
      passageTitleAr: 'هندسة المقالات الأكاديمية رفيعة المستوى (معيار IELTS Band 8+)',
      paragraphs: [
        {
          tagAr: 'جملة الأطروحة المركزية (Thesis Statement)',
          textEn: 'Not only does effective academic writing demand lexical precision, but it also relies fundamentally on structural coherence. Every essay must open with an explicit thesis statement that articulates the central argument.',
          textAr: 'لا تتطلب الكتابة الأكاديمية الفعالة دقة معجمية فحسب، بل تعتمد اعتماداً جوهرياً على الترابط الهيكلي. ويجب أن يُفتتح كل مقال بجملة أطروحة صريحة تعبّر بوضوح عن الحجة المركزية.',
          keyConnectors: ['Not only... but also', 'that'],
        },
        {
          tagAr: 'الدمج البرهاني والختام (Evidence Synthesis)',
          textEn: 'Furthermore, body paragraphs should synthesize empirical examples rather than listing isolated opinions. Consequently, the conclusion reinforces the thesis with authoritative clarity.',
          textAr: 'علاوةً على ذلك، ينبغي لفقرات العرض أن تدمج الأمثلة التجريبية بدلاً من سرد آراء معزولة. ونتيجةً لذلك، تعزز الخاتمة الأطروحة بوضوح رصين.',
          keyConnectors: ['Furthermore', 'rather than', 'Consequently'],
        },
      ],
      comprehensionQuestion: {
        questionEn: 'According to the passage, what should body paragraphs do instead of listing isolated opinions?',
        questionAr: 'وفقاً للنص، ماذا ينبغي لفقرات العرض أن تفعل بدلاً من سرد آراء معزولة؟',
        options: [
          'They should synthesize empirical examples to support the central thesis.',
          'They should avoid using any logical connectors.',
          'They should repeat the introduction word for word.',
        ],
        correctIndex: 0,
        explanationAr: 'يؤكد النص على ضرورة دمج الأمثلة التجريبية (synthesize empirical examples) لدعم الأطروحة.',
      },
      writingPromptAr: 'اكتب فقرة أكاديمية رصينة (3–5 جمل) تستخدم فيها أسلوب التقديم (Not only...) والمفردات المتقدمة (articulate, synthesize, coherence, empirical):',
      writingPromptEn: 'Compose an advanced academic paragraph using Negative Inversion and C1/C2 vocabulary:',
      targetKeywords: ['Not only', 'articulate', 'synthesize', 'coherence', 'empirical'],
      modelAnswerEn:
        'Not only does rigorous research require empirical evidence, but it also demands structural coherence. Scholars must articulate their thesis clearly and synthesize diverse perspectives to reach sound conclusions.',
    },
    quizSection: [
      {
        id: 'u5-q1',
        skillTag: 'Inversion · C1/C2',
        questionEn: 'Select the grammatically correct inverted sentence:',
        questionAr: 'اختر الجملة الصحيحة نحوياً بأسلوب التقديم البلاغي (Inversion):',
        options: [
          'Rarely do we encounter such a comprehensive synthesis of empirical data.',
          'Rarely we encounter such a comprehensive synthesis of empirical data.',
          'Rarely does we encounter such a comprehensive synthesis of empirical data.',
          'Rarely we do encountering such a comprehensive synthesis of empirical data.',
        ],
        correctIndex: 0,
        explanationAr: 'بعد ظرف النفي والندرة (Rarely) في صدر الجملة نقدم الفعل المساعد (do) قبل الفاعل الجمع (we) ثم الفعل المجرد (encounter).',
      },
      {
        id: 'u5-q2',
        skillTag: 'Academic Lexicon · C1/C2',
        questionEn: 'Which word best describes "combining findings from several sources into a unified whole"?',
        questionAr: 'أي كلمة تعني «دمج النتائج من عدة مصادر في كلٍّ متكامل وموحد»؟',
        options: ['Synthesize', 'Fragment', 'Postpone', 'Contradict'],
        correctIndex: 0,
        explanationAr: 'الفعل (Synthesize) يعني دمج وتأليف عناصر ومصادر متعددة في إطار متكامل.',
      },
    ],
  },
];

// ============================================================================
// 2. تعريف فتحات الكتاب الخمس لكل وحدة (5 Double-Page Spreads = 10 Pages)
// ============================================================================

const BOOK_SPREADS = [
  {
    spreadIndex: 0,
    rightPageNum: 1,
    leftPageNum: 2,
    shortTitleAr: '1. القواعد وتكوين الجملة',
    shortTitleEn: 'Grammar & Sentence Lab',
    rightHeaderAr: 'الشرح التأسيسي وهندسة القواعد ثلاثية الأبعاد',
    leftHeaderAr: 'معمل التدريب الديناميكي: بناء الجملة وتصحيح الأخطاء',
    icon: Layers,
  },
  {
    spreadIndex: 1,
    rightPageNum: 3,
    leftPageNum: 4,
    shortTitleAr: '2. المفردات والرموز الصوتية (IPA)',
    shortTitleEn: 'IPA Lexicon & 3D Cards',
    rightHeaderAr: 'المعجم الصوتي الأكاديمي (Phonetic IPA Lexicon)',
    leftHeaderAr: 'تدريب البطاقات ثلاثية الأبعاد وإكمال السياق',
    icon: Sparkles,
  },
  {
    spreadIndex: 2,
    rightPageNum: 5,
    leftPageNum: 6,
    shortTitleAr: '3. المحادثة التفاعلية',
    shortTitleEn: 'Interactive Dialogue',
    rightHeaderAr: 'النص الحواري الكامل والتعبيرات المفتاحية',
    leftHeaderAr: 'محاكي تقمص الأدوار والردود التفاعلية',
    icon: MessageSquare,
  },
  {
    spreadIndex: 3,
    rightPageNum: 7,
    leftPageNum: 8,
    shortTitleAr: '4. القراءة والكتابة الأكاديمية',
    shortTitleEn: 'Reading & Writing Coach',
    rightHeaderAr: 'النص القرائي المشروح وتحليل الروابط المنطقية',
    leftHeaderAr: 'التحليل الاستيعابي ومدرب الكتابة الأكاديمية الحي',
    icon: PenTool,
  },
  {
    spreadIndex: 4,
    rightPageNum: 9,
    leftPageNum: 10,
    shortTitleAr: '5. اختبر مستواك (Mastery Exam)',
    shortTitleEn: 'Unit Mastery Assessment',
    rightHeaderAr: 'لوحة إتقان الوحدة وبطاقة التقدم المعياري (CEFR)',
    leftHeaderAr: 'الاختبار التدريبي الفوري مع التفسير الأكاديمي',
    icon: Award,
  },
];

// ============================================================================
// 3. المكون الرئيسي للكتاب التفاعلي ثلاثي الأبعاد لمقرر اللغة الإنجليزية
// ============================================================================

export const EnglishCourseInteractive: React.FC = () => {
  // الوحدة المختارة (0..4)
  const [selectedUnitIdx, setSelectedUnitIdx] = useState<number>(0);
  // فتحة الكتاب المزدوجة الحالية داخل الوحدة (0..4 => صفحات 1-2 حتى 9-10)
  const [currentSpreadIdx, setCurrentSpreadIdx] = useState<number>(0);
  // حالة حركة تقليب الصفحة ثلاثية الأبعاد
  const [pageFlipDirection, setPageFlipDirection] = useState<'idle' | 'next' | 'prev'>('idle');
  // زاوية المنظور ثلاثي الأبعاد للكتاب
  const [bookTiltDeg, setBookTiltDeg] = useState<number>(7);
  // وضع ملء الشاشة للكتاب ثلاثي الأبعاد
  const [isFullscreenBook, setIsFullscreenBook] = useState<boolean>(false);

  // حالات التمارين التفاعلية الديناميكية
  // 1) بناء الجملة (Sentence Builder)
  const [selectedWordsMap, setSelectedWordsMap] = useState<Record<string, string[]>>({});
  // 2) تصحيح الأخطاء (Error Correction)
  const [errorAnswersMap, setErrorAnswersMap] = useState<Record<string, number>>({});
  // 3) البطاقات ثلاثية الأبعاد القابلة للقلب (3D Flip Cards)
  const [flippedVocabCards, setFlippedVocabCards] = useState<Record<string, boolean>>({});
  // 4) إكمال الفراغ للمفردات (Cloze Test)
  const [clozeAnswersMap, setClozeAnswersMap] = useState<Record<string, string>>({});
  // 5) محاكي المحادثة (Dialogue Simulator)
  const [dialogueChoiceMap, setDialogueChoiceMap] = useState<Record<string, number>>({});
  // 6) سؤال القراءة الاستيعابية + مسودة الكتابة الحية
  const [readingAnswerMap, setReadingAnswerMap] = useState<Record<number, number>>({});
  const [writingDraftMap, setWritingDraftMap] = useState<Record<number, string>>({});
  // 7) إجابات اختبار نهاية الوحدة
  const [quizAnswersMap, setQuizAnswersMap] = useState<Record<string, number>>({});

  const currentUnit = ENGLISH_3D_BOOK_UNITS[selectedUnitIdx];
  const currentSpread = BOOK_SPREADS[currentSpreadIdx];

  // رقم الصفحة التراكمي في الكتاب الكامل (50 صفحة عبر 5 وحدات)
  const globalRightPage = selectedUnitIdx * 10 + currentSpread.rightPageNum;
  const globalLeftPage = selectedUnitIdx * 10 + currentSpread.leftPageNum;

  // دالة تقليب الصفحات بحركة ثلاثية الأبعاد سلسة
  const triggerSpreadChange = (targetSpreadIdx: number, targetUnitIdx = selectedUnitIdx) => {
    if (targetSpreadIdx === currentSpreadIdx && targetUnitIdx === selectedUnitIdx) return;
    const isForward =
      targetUnitIdx > selectedUnitIdx ||
      (targetUnitIdx === selectedUnitIdx && targetSpreadIdx > currentSpreadIdx);
    setPageFlipDirection(isForward ? 'next' : 'prev');
    setTimeout(() => {
      setSelectedUnitIdx(targetUnitIdx);
      setCurrentSpreadIdx(targetSpreadIdx);
    }, 160);
    setTimeout(() => {
      setPageFlipDirection('idle');
    }, 360);
  };

  const handleNextSpread = () => {
    if (currentSpreadIdx < BOOK_SPREADS.length - 1) {
      triggerSpreadChange(currentSpreadIdx + 1, selectedUnitIdx);
    } else if (selectedUnitIdx < ENGLISH_3D_BOOK_UNITS.length - 1) {
      triggerSpreadChange(0, selectedUnitIdx + 1);
    }
  };

  const handlePrevSpread = () => {
    if (currentSpreadIdx > 0) {
      triggerSpreadChange(currentSpreadIdx - 1, selectedUnitIdx);
    } else if (selectedUnitIdx > 0) {
      triggerSpreadChange(BOOK_SPREADS.length - 1, selectedUnitIdx - 1);
    }
  };

  // حساب درجة الإتقان التفاعلي للوحدة الحالية
  const unitMasteryStats = useMemo(() => {
    let completedTasks = 0;
    let totalTasks = 0;

    // Sentence builders
    currentUnit.grammarSection.sentenceBuilders.forEach((sb) => {
      totalTasks += 1;
      const picked = selectedWordsMap[sb.id] || [];
      if (picked.join(' ') === sb.targetWords.join(' ')) completedTasks += 1;
    });

    // Error corrections
    currentUnit.grammarSection.errorCorrections.forEach((ec) => {
      totalTasks += 1;
      if (errorAnswersMap[ec.id] === ec.correctIndex) completedTasks += 1;
    });

    // Vocab cloze
    currentUnit.vocabularySection.forEach((v) => {
      totalTasks += 1;
      const key = `${currentUnit.unitNumber}-${v.word}`;
      if (clozeAnswersMap[key] === v.clozeAnswer) completedTasks += 1;
    });

    // Dialogue simulation
    currentUnit.dialogueSection.simulations.forEach((_, idx) => {
      totalTasks += 1;
      const key = `${currentUnit.unitNumber}-sim-${idx}`;
      const pickedIdx = dialogueChoiceMap[key];
      if (
        pickedIdx !== undefined &&
        currentUnit.dialogueSection.simulations[idx].choices[pickedIdx]?.quality === 'optimal'
      ) {
        completedTasks += 1;
      }
    });

    // Reading comprehension
    totalTasks += 1;
    if (
      readingAnswerMap[currentUnit.unitNumber] ===
      currentUnit.readingWritingSection.comprehensionQuestion.correctIndex
    ) {
      completedTasks += 1;
    }

    // Quiz
    currentUnit.quizSection.forEach((q) => {
      totalTasks += 1;
      if (quizAnswersMap[q.id] === q.correctIndex) completedTasks += 1;
    });

    const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    return { completedTasks, totalTasks, percentage };
  }, [
    currentUnit,
    selectedWordsMap,
    errorAnswersMap,
    clozeAnswersMap,
    dialogueChoiceMap,
    readingAnswerMap,
    quizAnswersMap,
  ]);

  // تحليل مسودة الكتابة الحية
  const currentWritingDraft = writingDraftMap[currentUnit.unitNumber] || '';
  const writingAnalysis = useMemo(() => {
    const words = currentWritingDraft
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    const matchedKeywords = currentUnit.readingWritingSection.targetKeywords.filter((kw) =>
      currentWritingDraft.toLowerCase().includes(kw.toLowerCase())
    );
    return {
      wordCount: words.length,
      matchedKeywords,
      totalKeywords: currentUnit.readingWritingSection.targetKeywords.length,
    };
  }, [currentWritingDraft, currentUnit]);

  return (
    <div
      dir="rtl"
      className={`${
        isFullscreenBook
          ? 'fixed inset-0 z-50 overflow-y-auto bg-slate-950 p-4 md:p-6'
          : 'min-h-screen bg-gradient-to-b from-slate-950 via-[#04111d] to-slate-950 text-slate-100 py-6 px-3 sm:px-6'
      }`}
    >
      <div className="max-w-[1440px] mx-auto space-y-5">
        {/* ===================================================================
            الشريط العلوي المستقل لمقرر اللغة الإنجليزية + العودة لقائمة المقررات
           =================================================================== */}
        <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-[#071a26] via-[#092230] to-[#061722] p-5 sm:p-6 shadow-[0_0_50px_rgba(16,185,129,0.12)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* شارات المقرر المستقل */}
            <div className="flex items-center gap-3">
              <div className="flex h-13 w-13 items-center justify-center rounded-2xl border border-emerald-400/40 bg-emerald-500/15 text-emerald-300 shadow-inner">
                <BookOpen className="h-7 w-7" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-0.5 text-xs font-bold text-emerald-300">
                    مقرر مستقل في قائمة المقررات · ENG 101–301
                  </span>
                  <span className="rounded-full border border-cyan-400/40 bg-cyan-500/15 px-3 py-0.5 text-xs font-semibold text-cyan-200">
                    3D INTERACTIVE TRAINING BOOK · CEFR A1 TO C2
                  </span>
                  <span className="rounded-full border border-amber-400/40 bg-amber-500/15 px-3 py-0.5 text-xs font-semibold text-amber-200">
                    PHONETIC IPA GUIDE INCLUDED
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  الكتاب التفاعلي التدريبي ثلاثي الأبعاد لمقرر اللغة الإنجليزية (A1 – C2)
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  كتاب تعليمي وتدريبي ديناميكي مفتوح الصفحات بنظام المحاكاة ثلاثية الأبعاد (50 صفحة تفاعلية مقسمة إلى 5 فصول معيارية وتدريبات فورية).
                </p>
              </div>
            </div>

            {/* أزرار التحكم العليا والعودة إلى قائمة المقررات */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-900/90 px-3 py-1.5 text-xs">
                <Compass className="h-4 w-4 text-cyan-400" />
                <span className="text-slate-300">زاوية الكتاب 3D:</span>
                {[0, 7, 13].map((deg) => (
                  <button
                    key={deg}
                    type="button"
                    onClick={() => setBookTiltDeg(deg)}
                    className={`rounded-lg px-2 py-0.5 font-bold transition cursor-pointer ${
                      bookTiltDeg === deg
                        ? 'bg-emerald-500 text-slate-950'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {deg === 0 ? 'مسطح 0°' : `${deg}°`}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsFullscreenBook((prev) => !prev)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-950/60 px-3.5 py-2 text-xs font-bold text-cyan-200 hover:bg-cyan-900/70 transition cursor-pointer"
              >
                {isFullscreenBook ? (
                  <>
                    <Minimize2 className="h-4 w-4" />
                    <span>تصغير العرض</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="h-4 w-4" />
                    <span>وضع الكتاب الكامل 3D</span>
                  </>
                )}
              </button>

              <Link
                to="/academic"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-600/80 bg-slate-800/90 px-4 py-2 text-xs sm:text-sm font-bold text-slate-100 hover:border-emerald-400/60 hover:bg-slate-800 transition"
              >
                <span>العودة إلى قائمة المقررات</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* شريط اختيار فصول/وحدات الكتاب الخمس (Units A1 -> C1/C2) */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {ENGLISH_3D_BOOK_UNITS.map((unit, idx) => {
              const isSelected = idx === selectedUnitIdx;
              return (
                <button
                  key={unit.unitNumber}
                  type="button"
                  onClick={() => triggerSpreadChange(0, idx)}
                  className={`group relative text-right rounded-2xl border p-3.5 transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'border-emerald-400 bg-gradient-to-br from-emerald-950/90 via-slate-900 to-cyan-950/80 shadow-[0_0_25px_rgba(16,185,129,0.28)] -translate-y-0.5'
                      : 'border-slate-800 bg-slate-900/60 hover:border-slate-600 hover:bg-slate-900/90'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`inline-flex items-center rounded-lg bg-gradient-to-r ${unit.badgeColor} px-2.5 py-0.5 text-[11px] font-extrabold text-slate-950`}
                    >
                      {unit.cefrLevel}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">
                      فصل الكتاب {unit.unitNumber} · ص {idx * 10 + 1}–{idx * 10 + 10}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug">
                    {unit.titleAr}
                  </div>
                  <div
                    dir="ltr"
                    className="mt-1 text-[11px] text-cyan-300/90 font-medium line-clamp-1"
                  >
                    {unit.titleEn}
                  </div>
                </button>
              );
            })}
          </div>

          {/* شريط فواصل صفحات الكتاب (Bookmark Ribbon Tabs) */}
          <div className="mt-4 flex flex-wrap lg:flex-nowrap items-center justify-between gap-2 pt-3 border-t border-slate-800/90 overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 flex-1 min-w-0">
              {BOOK_SPREADS.map((spread) => {
                const IconComp = spread.icon;
                const active = spread.spreadIndex === currentSpreadIdx;
                const pStart = selectedUnitIdx * 10 + spread.rightPageNum;
                const pEnd = selectedUnitIdx * 10 + spread.leftPageNum;
                return (
                  <button
                    key={spread.spreadIndex}
                    type="button"
                    onClick={() => triggerSpreadChange(spread.spreadIndex)}
                    className={`inline-flex items-center justify-center gap-1 rounded-xl px-2 py-1.5 text-[10px] xl:text-xs font-bold whitespace-nowrap truncate transition-all cursor-pointer ${
                      active
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.45)]'
                        : 'border border-slate-700/80 bg-slate-900/80 text-slate-200 hover:border-emerald-500/50 hover:text-white'
                    }`}
                  >
                    <IconComp className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{spread.shortTitleAr}</span>
                    <span
                      className={`rounded-md px-1.5 py-0.5 text-[10px] shrink-0 ${
                        active ? 'bg-slate-950/25 text-slate-950 font-extrabold' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      ص {pStart}–{pEnd}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* مؤشر نسبة إتقان تدريبات الفصل الحالي */}
            <div className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-slate-900/90 px-3 py-1.5 whitespace-nowrap shrink-0">
              <div className="text-[11px] xl:text-xs">
                <span className="text-slate-400">إتقان الفصل {currentUnit.unitNumber}: </span>
                <span className="font-extrabold text-emerald-400">
                  {unitMasteryStats.percentage}% ({unitMasteryStats.completedTasks}/{unitMasteryStats.totalTasks})
                </span>
              </div>
              <div className="w-16 h-2 rounded-full bg-slate-800 overflow-hidden shrink-0">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-500"
                  style={{ width: `${unitMasteryStats.percentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            المجسم الفيزيائي للكتاب المفتوح ثلاثي الأبعاد (3D Open Educational Book)
           =================================================================== */}
        <div
          className="relative py-2 select-none"
          style={{
            perspective: '2400px',
          }}
        >
          {/* الإطار الخارجي لغلاف الكتاب وسمك الأوراق ثلاثي الأبعاد */}
          <div
            className="relative mx-auto rounded-[28px] border-2 border-emerald-500/35 bg-gradient-to-b from-[#0a1926] via-[#07131e] to-[#050d15] p-2 sm:p-4 shadow-[0_28px_70px_rgba(0,0,0,0.85),0_0_45px_rgba(16,185,129,0.14)] transition-transform duration-500"
            style={{
              transformStyle: 'preserve-3d',
              transform:
                pageFlipDirection === 'next'
                  ? `rotateX(${bookTiltDeg}deg) rotateY(-4deg) scale(0.992)`
                  : pageFlipDirection === 'prev'
                  ? `rotateX(${bookTiltDeg}deg) rotateY(4deg) scale(0.992)`
                  : `rotateX(${bookTiltDeg}deg) rotateY(0deg)`,
            }}
          >
            {/* حواف الأوراق المتعددة على يمين ويسار الكتاب لإعطاء عمق ثلاثي الأبعاد */}
            <div className="pointer-events-none hidden lg:block absolute inset-y-4 right-1.5 w-3 rounded-r-2xl bg-gradient-to-l from-slate-300/25 via-slate-400/10 to-transparent border-r border-emerald-300/30" />
            <div className="pointer-events-none hidden lg:block absolute inset-y-4 left-1.5 w-3 rounded-l-2xl bg-gradient-to-r from-slate-300/25 via-slate-400/10 to-transparent border-l border-cyan-300/30" />

            {/* الكعب المركزي للكتاب المفتوح (3D Center Book Spine & Binding) */}
            <div className="pointer-events-none hidden lg:flex flex-col items-center justify-between absolute inset-y-2 left-1/2 -translate-x-1/2 w-9 z-20 bg-gradient-to-r from-black/80 via-emerald-950/90 to-black/80 border-x border-emerald-500/25 shadow-[0_0_30px_rgba(0,0,0,0.95)] py-6">
              <div className="h-16 w-1 rounded-full bg-gradient-to-b from-emerald-400/60 to-transparent" />
              <div className="writing-vertical text-[10px] tracking-widest text-emerald-300/70 font-bold uppercase rotate-180">
                ENG 101–301 · 3D BOOK
              </div>
              <div className="h-16 w-1 rounded-full bg-gradient-to-t from-cyan-400/60 to-transparent" />
            </div>

            {/* شبكة الصفحتين المتقابلتين (الصفحة اليمنى + الصفحة اليسرى) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-9 relative z-10">
              {/* ===============================================================
                  الصفحة اليمنى للكتاب (RIGHT PAGE: الشرح التأسيسي والتمثيل ثلاثي الأبعاد)
                 =============================================================== */}
              <div className="relative rounded-2xl border border-emerald-500/25 bg-gradient-to-bl from-[#0b1f2e] via-[#091926] to-[#07141f] p-5 sm:p-6 shadow-[inset_-18px_0_35px_rgba(0,0,0,0.45)] flex flex-col justify-between min-h-[620px]">
                {/* رأس الصفحة اليمنى */}
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-xs font-extrabold text-emerald-300">
                        ص {globalRightPage}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-emerald-300">
                          {currentSpread.rightHeaderAr}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {currentUnit.titleAr}
                        </div>
                      </div>
                    </div>
                    <span className="rounded-lg border border-slate-700 bg-slate-900/90 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
                      الصفحة اليمنى · الشرح والقاعدة
                    </span>
                  </div>

                  {/* محتوى الصفحة اليمنى حسب فتحة الكتاب الحالية */}
                  {currentSpreadIdx === 0 && (
                    <div className="space-y-4">
                      <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/75 p-4">
                        <div className="text-xs font-bold text-cyan-300 mb-1" dir="ltr">
                          {currentUnit.grammarSection.ruleTitleEn}
                        </div>
                        <h2 className="text-base sm:text-lg font-extrabold text-white mb-2">
                          {currentUnit.grammarSection.ruleTitleAr}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {currentUnit.grammarSection.overviewAr}
                        </p>
                      </div>

                      {/* المكعبات الهندسية ثلاثية الأبعاد لمعادلة الجملة */}
                      <div>
                        <div className="text-xs font-bold text-emerald-300 mb-2 flex items-center gap-1.5">
                          <Layers className="h-4 w-4" />
                          <span>النموذج البصري ثلاثي الأبعاد لتكوين الجملة (3D Sentence Blocks):</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5" dir="ltr">
                          {currentUnit.grammarSection.formulaBlocks.map((block, bIdx) => (
                            <div
                              key={bIdx}
                              className={`rounded-xl border p-3 shadow-lg transform transition hover:-translate-y-1 ${block.color}`}
                            >
                              <div className="text-[11px] font-bold opacity-90 text-right" dir="rtl">
                                {block.labelAr}
                              </div>
                              <div className="text-xs sm:text-sm font-extrabold text-white mt-1">
                                {block.labelEn}
                              </div>
                              <div className="mt-1.5 text-[11px] opacity-85 border-t border-white/10 pt-1">
                                {block.examples}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* جدول القواعد والأمثلة المشروحة */}
                      <div className="space-y-2.5">
                        <div className="text-xs font-bold text-amber-300">
                          القواعد التطبيقية والأمثلة القياسية في هذه الوحدة:
                        </div>
                        {currentUnit.grammarSection.coreRules.map((rule, rIdx) => (
                          <div
                            key={rIdx}
                            className="rounded-xl border border-slate-800 bg-slate-900/80 p-3.5 hover:border-emerald-500/40 transition"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                              <span className="text-xs sm:text-sm font-bold text-emerald-300">
                                {rIdx + 1}. {rule.titleAr}
                              </span>
                              <code
                                dir="ltr"
                                className="rounded-md bg-slate-950 px-2 py-0.5 text-[11px] text-cyan-300 border border-slate-800"
                              >
                                {rule.patternEn}
                              </code>
                            </div>
                            <p
                              dir="ltr"
                              className="text-xs sm:text-sm font-semibold text-white mt-1.5 bg-slate-950/70 rounded-lg px-3 py-1.5 border-l-2 border-emerald-400"
                            >
                              {rule.exampleEn}
                            </p>
                            <p className="text-xs text-slate-300 mt-1">{rule.exampleAr}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentSpreadIdx === 1 && (
                    <div className="space-y-3.5">
                      <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-3.5 text-xs text-amber-200 leading-relaxed">
                        <strong>دليل القراءة الصوتية المكتوبة (IPA Phonetic Guide):</strong> الرموز بين الشرطتين المائلتين <code dir="ltr">/ˈ.../</code> توضح النطق القياسي الدقيق لكل كلمة وعلامة التشديد الصوتي <code dir="ltr">ˈ</code> قبل المقطع المشدد.
                      </div>

                      {currentUnit.vocabularySection.map((item, vIdx) => (
                        <div
                          key={vIdx}
                          className="rounded-2xl border border-slate-800 bg-slate-900/85 p-4 hover:border-emerald-500/40 transition"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
                              {item.partOfSpeech}
                            </span>
                            <div dir="ltr" className="flex items-center gap-2">
                              <span className="text-base sm:text-lg font-extrabold text-white">
                                {item.word}
                              </span>
                              <span className="rounded-md bg-slate-950 px-2 py-0.5 text-xs font-mono text-cyan-300 border border-slate-800">
                                {item.ipa}
                              </span>
                            </div>
                          </div>

                          <div className="mt-2 text-sm font-bold text-emerald-300">
                            المعنى الأكاديمي: <span className="text-white">{item.meaningAr}</span>
                          </div>

                          <div className="mt-2 rounded-xl bg-slate-950/80 border border-slate-800/90 p-3 space-y-1">
                            <div dir="ltr" className="text-xs sm:text-sm font-semibold text-slate-100">
                              "{item.exampleEn}"
                            </div>
                            <div className="text-xs text-slate-400">{item.exampleAr}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {currentSpreadIdx === 2 && (
                    <div className="space-y-4">
                      <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/80 p-4">
                        <div dir="ltr" className="text-xs font-bold text-cyan-300">
                          {currentUnit.dialogueSection.contextTitleEn}
                        </div>
                        <h3 className="text-base font-extrabold text-white mt-0.5">
                          سيناريو المحادثة: {currentUnit.dialogueSection.contextTitleAr}
                        </h3>
                      </div>

                      <div className="space-y-3">
                        {currentUnit.dialogueSection.turns.map((turn, tIdx) => (
                          <div
                            key={tIdx}
                            className={`rounded-2xl border p-4 ${
                              tIdx % 2 === 0
                                ? 'border-emerald-500/30 bg-emerald-950/20'
                                : 'border-cyan-500/30 bg-cyan-950/20'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span className="text-xs font-extrabold text-emerald-300">
                                {turn.roleAr}
                              </span>
                              <span dir="ltr" className="text-xs font-bold text-slate-300">
                                {turn.speaker}
                              </span>
                            </div>
                            <p
                              dir="ltr"
                              className="text-xs sm:text-sm font-semibold text-white leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-white/5"
                            >
                              {turn.textEn}
                            </p>
                            <p className="text-xs text-slate-300 mt-2">{turn.textAr}</p>
                            {turn.keyPhrase && (
                              <div className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-2.5 py-1 text-[11px] text-amber-300 border border-amber-500/30">
                                <span>تعبير مفتاحي:</span>
                                <strong dir="ltr">{turn.keyPhrase}</strong>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentSpreadIdx === 3 && (
                    <div className="space-y-4">
                      <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/80 p-4">
                        <div dir="ltr" className="text-xs font-bold text-emerald-300">
                          {currentUnit.readingWritingSection.passageTitleEn}
                        </div>
                        <h3 className="text-base font-extrabold text-white mt-0.5">
                          {currentUnit.readingWritingSection.passageTitleAr}
                        </h3>
                      </div>

                      <div className="space-y-3.5">
                        {currentUnit.readingWritingSection.paragraphs.map((para, pIdx) => (
                          <div
                            key={pIdx}
                            className="rounded-2xl border border-slate-800 bg-slate-900/85 p-4 space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold text-emerald-300">
                                {para.tagAr}
                              </span>
                              <div className="flex flex-wrap gap-1" dir="ltr">
                                {para.keyConnectors.map((conn, cIdx) => (
                                  <span
                                    key={cIdx}
                                    className="rounded bg-amber-500/20 border border-amber-400/40 px-2 py-0.5 text-[10px] font-bold text-amber-200"
                                  >
                                    {conn}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <p
                              dir="ltr"
                              className="text-xs sm:text-sm text-white leading-relaxed font-medium bg-slate-950/70 p-3.5 rounded-xl border-l-2 border-cyan-400"
                            >
                              {para.textEn}
                            </p>
                            <p className="text-xs text-slate-300 leading-relaxed">{para.textAr}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentSpreadIdx === 4 && (
                    <div className="space-y-4">
                      <div className="rounded-2xl border border-emerald-500/35 bg-gradient-to-br from-emerald-950/50 via-slate-900 to-slate-950 p-5 text-center space-y-3">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/50 bg-emerald-500/20 text-emerald-300 shadow-lg">
                          <GraduationCap className="h-9 w-9" />
                        </div>
                        <div className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                          {currentUnit.cefrLevel} · Mastery Summary
                        </div>
                        <h3 className="text-lg font-extrabold text-white">
                          بطاقة إتقان الفصل {currentUnit.unitNumber}: {currentUnit.titleAr}
                        </h3>
                        <p className="text-xs text-slate-300 max-w-md mx-auto">
                          أكمل الاختبار التقييمي في الصفحة اليسرى المقابلة بالإضافة إلى تمارين الصفحات السابقة للحصول على ختم إتقان الوحدة الكامل.
                        </p>
                        <div className="pt-2">
                          <div className="text-3xl font-black text-emerald-400">
                            {unitMasteryStats.percentage}%
                          </div>
                          <div className="text-xs text-slate-400 mt-1">
                            إجمالي المهام التدريبية المكتملة بنجاح: {unitMasteryStats.completedTasks} من{' '}
                            {unitMasteryStats.totalTasks}
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 space-y-2.5">
                        <div className="text-xs font-bold text-cyan-300">
                          ملخص المهارات القياسية المكتسبة في هذه الوحدة:
                        </div>
                        <ul className="space-y-2 text-xs text-slate-300">
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                            <span>إتقان قاعدة: {currentUnit.grammarSection.ruleTitleAr}</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                            <span>
                              إتقان {currentUnit.vocabularySection.length} مفردات أكاديمية بالرموز الصوتية (IPA)
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                            <span>تطبيق محاكاة المحادثة: {currentUnit.dialogueSection.contextTitleAr}</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                            <span>تحليل النص القرائي والتدرب على صياغة الفقرة الأكاديمية</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* تذييل الصفحة اليمنى */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-3 text-[11px] text-slate-400">
                  <span>{currentUnit.cefrLevel} · {currentSpread.shortTitleAr}</span>
                  <span className="font-bold text-emerald-300">صفحة الكتاب {globalRightPage} من 50</span>
                </div>
              </div>

              {/* ===============================================================
                  الصفحة اليسرى للكتاب (LEFT PAGE: التدريب التفاعلي الديناميكي الحي)
                 =============================================================== */}
              <div className="relative rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-[#0b1f2e] via-[#091926] to-[#07141f] p-5 sm:p-6 shadow-[inset_18px_0_35px_rgba(0,0,0,0.45)] flex flex-col justify-between min-h-[620px]">
                {/* رأس الصفحة اليسرى */}
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-xs font-extrabold text-cyan-300">
                        ص {globalLeftPage}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-cyan-300">
                          {currentSpread.leftHeaderAr}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          تدريب تفاعلي ديناميكي فوري التصحيح
                        </div>
                      </div>
                    </div>
                    <span className="rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-2.5 py-1 text-[11px] font-semibold text-cyan-200">
                      الصفحة اليسرى · مختبر التدريب الحي
                    </span>
                  </div>

                  {/* محتوى التدريب التفاعلي في الصفحة اليسرى حسب فتحة الكتاب */}
                  {currentSpreadIdx === 0 && (
                    <div className="space-y-5">
                      {/* التمرين 1: بناء الجملة التفاعلي بالكلمات */}
                      <div className="space-y-3">
                        <div className="text-xs font-extrabold text-emerald-300 flex items-center gap-1.5">
                          <Sparkles className="h-4 w-4" />
                          <span>التدريب التفاعلي (أ): ركّب الجملة الإنجليزية بالترتيب الصحيح</span>
                        </div>

                        {currentUnit.grammarSection.sentenceBuilders.map((sb) => {
                          const pickedWords = selectedWordsMap[sb.id] || [];
                          const isComplete = pickedWords.length === sb.targetWords.length;
                          const isCorrect =
                            isComplete && pickedWords.join(' ') === sb.targetWords.join(' ');

                          return (
                            <div
                              key={sb.id}
                              className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 space-y-3"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-bold text-white">{sb.promptAr}</span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setSelectedWordsMap((prev) => ({ ...prev, [sb.id]: [] }))
                                  }
                                  className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-[11px] text-slate-300 hover:text-white cursor-pointer"
                                >
                                  <RotateCcw className="h-3 w-3" />
                                  <span>إعادة ترتيب</span>
                                </button>
                              </div>

                              {/* منطقة الجملة التي يبنيها الطالب */}
                              <div
                                dir="ltr"
                                className={`min-h-[48px] rounded-xl border p-2.5 flex flex-wrap items-center gap-2 ${
                                  isComplete
                                    ? isCorrect
                                      ? 'border-emerald-400 bg-emerald-950/30'
                                      : 'border-rose-400 bg-rose-950/30'
                                    : 'border-slate-700 bg-slate-950/80'
                                }`}
                              >
                                {pickedWords.length === 0 ? (
                                  <span className="text-xs text-slate-500">
                                    انقر على الكلمات بالأسفل لإضافتها بالترتيب الصحيح...
                                  </span>
                                ) : (
                                  pickedWords.map((w, wIdx) => (
                                    <button
                                      key={`${w}-${wIdx}`}
                                      type="button"
                                      onClick={() =>
                                        setSelectedWordsMap((prev) => ({
                                          ...prev,
                                          [sb.id]: pickedWords.filter((_, i) => i !== wIdx),
                                        }))
                                      }
                                      className="rounded-lg bg-emerald-500/20 border border-emerald-400/50 px-2.5 py-1 text-xs font-bold text-emerald-200 hover:bg-rose-500/30 cursor-pointer"
                                    >
                                      {w}
                                    </button>
                                  ))
                                )}
                              </div>

                              {/* الكلمات المبعثرة للاختيار */}
                              <div dir="ltr" className="flex flex-wrap gap-2">
                                {sb.scrambledWords.map((word, idx) => {
                                  const usedCount = pickedWords.filter((x) => x === word).length;
                                  const totalAvailable = sb.scrambledWords.filter(
                                    (x) => x === word
                                  ).length;
                                  const isDisabled = usedCount >= totalAvailable;

                                  return (
                                    <button
                                      key={`${word}-${idx}`}
                                      type="button"
                                      disabled={isDisabled}
                                      onClick={() =>
                                        setSelectedWordsMap((prev) => ({
                                          ...prev,
                                          [sb.id]: [...(prev[sb.id] || []), word],
                                        }))
                                      }
                                      className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition ${
                                        isDisabled
                                          ? 'border-slate-800 bg-slate-950 text-slate-600 cursor-not-allowed'
                                          : 'border-cyan-500/40 bg-slate-800 text-white hover:bg-cyan-500 hover:text-slate-950 cursor-pointer'
                                      }`}
                                    >
                                      {word}
                                    </button>
                                  );
                                })}
                              </div>

                              {isComplete && (
                                <div
                                  className={`rounded-xl p-2.5 text-xs font-semibold ${
                                    isCorrect
                                      ? 'bg-emerald-500/15 text-emerald-200 border border-emerald-500/40'
                                      : 'bg-rose-500/15 text-rose-200 border border-rose-500/40'
                                  }`}
                                >
                                  {isCorrect ? (
                                    <span>
                                      أحسنت! تركيب نحوي سليم 100%: ({sb.targetWords.join(' ')}) —{' '}
                                      {sb.grammarTipAr}
                                    </span>
                                  ) : (
                                    <span>
                                      الترتيب غير مطابق بعد؛ تلميح القاعدة: {sb.grammarTipAr}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* التمرين 2: اكتشاف وتصحيح الخطأ النحوي */}
                      <div className="space-y-3">
                        <div className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>التدريب التفاعلي (ب): اكتشف الخطأ النحوي واختر الصياغة الصحيحة</span>
                        </div>

                        {currentUnit.grammarSection.errorCorrections.map((ec) => {
                          const pickedIdx = errorAnswersMap[ec.id];
                          return (
                            <div
                              key={ec.id}
                              className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 space-y-2.5"
                            >
                              <div className="text-xs text-rose-300 font-semibold">
                                الجملة الخاطئة:{' '}
                                <span
                                  dir="ltr"
                                  className="line-through text-rose-200 bg-rose-950/60 px-2 py-0.5 rounded"
                                >
                                  {ec.incorrectSentence}
                                </span>
                              </div>
                              <div className="space-y-1.5" dir="ltr">
                                {ec.options.map((opt, oIdx) => {
                                  const isPicked = pickedIdx === oIdx;
                                  const isRight = oIdx === ec.correctIndex;
                                  return (
                                    <button
                                      key={oIdx}
                                      type="button"
                                      onClick={() =>
                                        setErrorAnswersMap((prev) => ({ ...prev, [ec.id]: oIdx }))
                                      }
                                      className={`w-full text-left rounded-xl border px-3.5 py-2 text-xs font-semibold transition flex items-center justify-between cursor-pointer ${
                                        isPicked
                                          ? isRight
                                            ? 'border-emerald-400 bg-emerald-950/50 text-emerald-200'
                                            : 'border-rose-400 bg-rose-950/50 text-rose-200'
                                          : 'border-slate-800 bg-slate-950/70 text-slate-200 hover:border-slate-600'
                                      }`}
                                    >
                                      <span>{opt}</span>
                                      {isPicked &&
                                        (isRight ? (
                                          <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                                        ) : (
                                          <XCircle className="h-4 w-4 text-rose-400 shrink-0" />
                                        ))}
                                    </button>
                                  );
                                })}
                              </div>
                              {pickedIdx !== undefined && (
                                <div className="text-xs text-slate-300 bg-slate-950/80 rounded-xl p-2.5 border border-slate-800">
                                  <strong className="text-emerald-300">التعليل النحوي: </strong>
                                  {ec.explanationAr}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {currentSpreadIdx === 1 && (
                    <div className="space-y-5">
                      {/* بطاقات الاستذكار ثلاثية الأبعاد القابلة للقلب */}
                      <div>
                        <div className="text-xs font-extrabold text-cyan-300 mb-2.5 flex items-center justify-between">
                          <span>أولاً: بطاقات المفردات ثلاثية الأبعاد (انقر على أي بطاقة لقلبها 180°):</span>
                          <span className="text-[11px] text-slate-400">3D Flip Flashcards</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {currentUnit.vocabularySection.map((v) => {
                            const cardKey = `${currentUnit.unitNumber}-${v.word}`;
                            const isFlipped = !!flippedVocabCards[cardKey];
                            return (
                              <button
                                key={cardKey}
                                type="button"
                                onClick={() =>
                                  setFlippedVocabCards((prev) => ({
                                    ...prev,
                                    [cardKey]: !prev[cardKey],
                                  }))
                                }
                                className={`group text-right rounded-2xl border p-4 transition-all duration-300 min-h-[118px] flex flex-col justify-between cursor-pointer ${
                                  isFlipped
                                    ? 'border-emerald-400 bg-gradient-to-br from-emerald-950/80 to-slate-900 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                                    : 'border-slate-800 bg-slate-900/90 hover:border-cyan-500/50'
                                }`}
                              >
                                {!isFlipped ? (
                                  <>
                                    <div className="flex items-center justify-between w-full">
                                      <span className="text-[10px] text-slate-400">
                                        وجه البطاقة (انقر للكشف)
                                      </span>
                                      <span className="rounded bg-cyan-500/15 px-2 py-0.5 text-[10px] font-bold text-cyan-300">
                                        {v.partOfSpeech}
                                      </span>
                                    </div>
                                    <div dir="ltr" className="my-1 text-center">
                                      <div className="text-lg font-extrabold text-white">
                                        {v.word}
                                      </div>
                                      <div className="text-xs font-mono text-cyan-300 mt-0.5">
                                        {v.ipa}
                                      </div>
                                    </div>
                                    <div className="text-[10px] text-center text-emerald-300/80">
                                      اضغط لقلب البطاقة ثلاثية الأبعاد ↻
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="flex items-center justify-between w-full">
                                      <span className="text-xs font-extrabold text-emerald-300">
                                        {v.meaningAr}
                                      </span>
                                      <span dir="ltr" className="text-xs font-bold text-white">
                                        {v.word}
                                      </span>
                                    </div>
                                    <div
                                      dir="ltr"
                                      className="text-[11px] text-slate-200 mt-1.5 text-left bg-slate-950/70 p-2 rounded-lg"
                                    >
                                      {v.exampleEn}
                                    </div>
                                    <div className="text-[10px] text-slate-400 mt-1">
                                      {v.exampleAr}
                                    </div>
                                  </>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* تدريب إكمال الجمل بالمفردة المناسبة (Contextual Cloze Training) */}
                      <div className="space-y-2.5">
                        <div className="text-xs font-extrabold text-amber-300">
                          ثانياً: تدريب توظيف المفردات في السياق الأكاديمي (Contextual Cloze):
                        </div>
                        {currentUnit.vocabularySection.map((v) => {
                          const key = `${currentUnit.unitNumber}-${v.word}`;
                          const picked = clozeAnswersMap[key];
                          const isCorrect = picked === v.clozeAnswer;
                          return (
                            <div
                              key={key}
                              className="rounded-xl border border-slate-800 bg-slate-900/90 p-3.5 space-y-2"
                            >
                              <div dir="ltr" className="text-xs sm:text-sm font-semibold text-white">
                                {v.clozeSentence}
                              </div>
                              <div dir="ltr" className="flex flex-wrap gap-2">
                                {v.clozeOptions.map((opt) => {
                                  const active = picked === opt;
                                  return (
                                    <button
                                      key={opt}
                                      type="button"
                                      onClick={() =>
                                        setClozeAnswersMap((prev) => ({ ...prev, [key]: opt }))
                                      }
                                      className={`rounded-lg border px-3 py-1 text-xs font-bold transition cursor-pointer ${
                                        active
                                          ? opt === v.clozeAnswer
                                            ? 'border-emerald-400 bg-emerald-500 text-slate-950'
                                            : 'border-rose-400 bg-rose-500 text-white'
                                          : 'border-slate-700 bg-slate-950 text-slate-200 hover:border-cyan-400'
                                      }`}
                                    >
                                      {opt}
                                    </button>
                                  );
                                })}
                              </div>
                              {picked && (
                                <div
                                  className={`text-[11px] font-semibold ${
                                    isCorrect ? 'text-emerald-300' : 'text-rose-300'
                                  }`}
                                >
                                  {isCorrect
                                    ? `إجابة صحيحة! الكلمة (${v.word}) تعني «${v.meaningAr}».`
                                    : `حاول مرة أخرى؛ ابحث عن الكلمة التي تعني «${v.meaningAr}».`}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {currentSpreadIdx === 2 && (
                    <div className="space-y-4">
                      <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-3.5 text-xs text-cyan-200">
                        <strong>محاكي المحادثة وتقمص الأدوار (Role-Play Simulator):</strong> اقرأ الموقف الحواري ثم اختر الرد الإنجليزي الأدق أكاديمياً ونحوياً لترى تقييم المحاكي الفوري.
                      </div>

                      {currentUnit.dialogueSection.simulations.map((sim, sIdx) => {
                        const simKey = `${currentUnit.unitNumber}-sim-${sIdx}`;
                        const pickedIdx = dialogueChoiceMap[simKey];
                        const pickedChoice =
                          pickedIdx !== undefined ? sim.choices[pickedIdx] : undefined;

                        return (
                          <div
                            key={simKey}
                            className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 space-y-3"
                          >
                            <div className="text-xs font-bold text-amber-300">
                              الموقف التدريبي: {sim.situationAr}
                            </div>

                            <div className="rounded-xl border border-slate-700 bg-slate-950 p-3.5">
                              <div dir="ltr" className="text-xs sm:text-sm font-bold text-white">
                                "{sim.partnerLineEn}"
                              </div>
                              <div className="text-xs text-slate-400 mt-1">{sim.partnerLineAr}</div>
                            </div>

                            <div className="text-xs font-bold text-slate-300">
                              اختر ردك باللغة الإنجليزية:
                            </div>

                            <div className="space-y-2" dir="ltr">
                              {sim.choices.map((ch, cIdx) => {
                                const isSelected = pickedIdx === cIdx;
                                return (
                                  <button
                                    key={cIdx}
                                    type="button"
                                    onClick={() =>
                                      setDialogueChoiceMap((prev) => ({
                                        ...prev,
                                        [simKey]: cIdx,
                                      }))
                                    }
                                    className={`w-full text-left rounded-xl border p-3 text-xs font-semibold transition cursor-pointer ${
                                      isSelected
                                        ? ch.quality === 'optimal'
                                          ? 'border-emerald-400 bg-emerald-950/50 text-emerald-200'
                                          : ch.quality === 'informal'
                                          ? 'border-amber-400 bg-amber-950/50 text-amber-200'
                                          : 'border-rose-400 bg-rose-950/50 text-rose-200'
                                        : 'border-slate-800 bg-slate-950/80 text-slate-200 hover:border-cyan-500/40'
                                    }`}
                                  >
                                    {ch.textEn}
                                  </button>
                                );
                              })}
                            </div>

                            {pickedChoice && (
                              <div
                                className={`rounded-xl p-3 text-xs font-semibold border ${
                                  pickedChoice.quality === 'optimal'
                                    ? 'border-emerald-500/40 bg-emerald-950/30 text-emerald-200'
                                    : pickedChoice.quality === 'informal'
                                    ? 'border-amber-500/40 bg-amber-950/30 text-amber-200'
                                    : 'border-rose-500/40 bg-rose-950/30 text-rose-200'
                                }`}
                              >
                                {pickedChoice.feedbackAr}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {currentSpreadIdx === 3 && (
                    <div className="space-y-4">
                      {/* سؤال الاستيعاب القرائي */}
                      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 space-y-2.5">
                        <div className="text-xs font-extrabold text-emerald-300">
                          أولاً: فحص الاستيعاب القرائي للنص المقابل (Reading Comprehension):
                        </div>
                        <div
                          dir="ltr"
                          className="text-xs sm:text-sm font-bold text-white bg-slate-950/80 p-3 rounded-xl"
                        >
                          {currentUnit.readingWritingSection.comprehensionQuestion.questionEn}
                        </div>
                        <div className="text-xs text-slate-400">
                          {currentUnit.readingWritingSection.comprehensionQuestion.questionAr}
                        </div>
                        <div className="space-y-1.5" dir="ltr">
                          {currentUnit.readingWritingSection.comprehensionQuestion.options.map(
                            (opt, oIdx) => {
                              const picked = readingAnswerMap[currentUnit.unitNumber];
                              const isSelected = picked === oIdx;
                              const isRight =
                                oIdx ===
                                currentUnit.readingWritingSection.comprehensionQuestion
                                  .correctIndex;
                              return (
                                <button
                                  key={oIdx}
                                  type="button"
                                  onClick={() =>
                                    setReadingAnswerMap((prev) => ({
                                      ...prev,
                                      [currentUnit.unitNumber]: oIdx,
                                    }))
                                  }
                                  className={`w-full text-left rounded-xl border px-3 py-2 text-xs font-semibold transition cursor-pointer ${
                                    isSelected
                                      ? isRight
                                        ? 'border-emerald-400 bg-emerald-950/50 text-emerald-200'
                                        : 'border-rose-400 bg-rose-950/50 text-rose-200'
                                      : 'border-slate-800 bg-slate-950/70 text-slate-200 hover:border-slate-600'
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            }
                          )}
                        </div>
                        {readingAnswerMap[currentUnit.unitNumber] !== undefined && (
                          <div className="text-xs text-emerald-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                            {currentUnit.readingWritingSection.comprehensionQuestion.explanationAr}
                          </div>
                        )}
                      </div>

                      {/* معمل الكتابة التدريبي الحي (Live Academic Writing Coach) */}
                      <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/90 p-4 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-extrabold text-cyan-300">
                            ثانياً: معمل الكتابة الأكاديمية الموجهة (Live Writing Workbench)
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setWritingDraftMap((prev) => ({
                                ...prev,
                                [currentUnit.unitNumber]:
                                  currentUnit.readingWritingSection.modelAnswerEn,
                              }))
                            }
                            className="rounded-lg border border-amber-500/40 bg-amber-500/15 px-2.5 py-1 text-[11px] font-bold text-amber-200 hover:bg-amber-500/25 cursor-pointer"
                          >
                            إدراج الفقرة النموذجية للمقارنة
                          </button>
                        </div>

                        <p className="text-xs text-slate-300">
                          {currentUnit.readingWritingSection.writingPromptAr}
                        </p>

                        {/* الكلمات المستهدفة التي يراقبها المصحح الآلي */}
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[11px] text-slate-400">الكلمات المستهدفة:</span>
                          {currentUnit.readingWritingSection.targetKeywords.map((kw) => {
                            const used = writingAnalysis.matchedKeywords.includes(kw);
                            return (
                              <span
                                key={kw}
                                dir="ltr"
                                className={`rounded-md px-2 py-0.5 text-[11px] font-bold border ${
                                  used
                                    ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200'
                                    : 'border-slate-700 bg-slate-950 text-slate-400'
                                }`}
                              >
                                {used ? `✓ ${kw}` : kw}
                              </span>
                            );
                          })}
                        </div>

                        <textarea
                          dir="ltr"
                          rows={4}
                          value={currentWritingDraft}
                          onChange={(e) =>
                            setWritingDraftMap((prev) => ({
                              ...prev,
                              [currentUnit.unitNumber]: e.target.value,
                            }))
                          }
                          placeholder={currentUnit.readingWritingSection.writingPromptEn}
                          className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none"
                        />

                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs bg-slate-950/80 rounded-xl p-2.5 border border-slate-800">
                          <span>
                            عدد الكلمات المكتوبة:{' '}
                            <strong className="text-emerald-400">{writingAnalysis.wordCount}</strong>{' '}
                            كلمة
                          </span>
                          <span>
                            المفردات المستهدفة الموظفة:{' '}
                            <strong className="text-cyan-300">
                              {writingAnalysis.matchedKeywords.length} /{' '}
                              {writingAnalysis.totalKeywords}
                            </strong>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentSpreadIdx === 4 && (
                    <div className="space-y-3.5">
                      <div className="text-xs font-extrabold text-amber-300">
                        أسئلة التقييم الشامل للوحدة {currentUnit.unitNumber} ({currentUnit.cefrLevel}):
                      </div>

                      {currentUnit.quizSection.map((q, qIdx) => {
                        const picked = quizAnswersMap[q.id];
                        return (
                          <div
                            key={q.id}
                            className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 space-y-2.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-emerald-300">
                                السؤال {qIdx + 1}: {q.questionAr}
                              </span>
                              <span
                                dir="ltr"
                                className="rounded bg-slate-950 px-2 py-0.5 text-[10px] font-bold text-cyan-300 border border-slate-800"
                              >
                                {q.skillTag}
                              </span>
                            </div>

                            <div
                              dir="ltr"
                              className="text-xs sm:text-sm font-bold text-white bg-slate-950/80 p-3 rounded-xl"
                            >
                              {q.questionEn}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" dir="ltr">
                              {q.options.map((opt, oIdx) => {
                                const isSelected = picked === oIdx;
                                const isRight = oIdx === q.correctIndex;
                                return (
                                  <button
                                    key={oIdx}
                                    type="button"
                                    onClick={() =>
                                      setQuizAnswersMap((prev) => ({ ...prev, [q.id]: oIdx }))
                                    }
                                    className={`rounded-xl border px-3 py-2 text-xs font-bold text-left transition flex items-center justify-between cursor-pointer ${
                                      isSelected
                                        ? isRight
                                          ? 'border-emerald-400 bg-emerald-950/60 text-emerald-200'
                                          : 'border-rose-400 bg-rose-950/60 text-rose-200'
                                        : 'border-slate-800 bg-slate-950 text-slate-200 hover:border-cyan-500/40'
                                    }`}
                                  >
                                    <span>{opt}</span>
                                    {isSelected &&
                                      (isRight ? (
                                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                                      ) : (
                                        <XCircle className="h-4 w-4 text-rose-400 shrink-0" />
                                      ))}
                                  </button>
                                );
                              })}
                            </div>

                            {picked !== undefined && (
                              <div className="text-xs text-slate-300 bg-slate-950/90 p-2.5 rounded-xl border border-slate-800">
                                <strong className="text-emerald-300">الشرح الأكاديمي: </strong>
                                {q.explanationAr}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* تذييل الصفحة اليسرى */}
                <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-3 text-[11px] text-slate-400">
                  <span>مختبر التدريب التفاعلي الحي</span>
                  <span className="font-bold text-cyan-300">صفحة الكتاب {globalLeftPage} من 50</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            شريط التحكم السفلي بتقليب صفحات الكتاب ثلاثي الأبعاد (3D Page Turn Controls)
           =================================================================== */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
          <button
            type="button"
            onClick={handlePrevSpread}
            disabled={selectedUnitIdx === 0 && currentSpreadIdx === 0}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs sm:text-sm font-bold text-white hover:border-emerald-400/60 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
            <span>الصفحتان السابقتان في الكتاب</span>
          </button>

          {/* أزرار الانتقال السريع بين فتحات الكتاب الخمس داخل الفصل الحالي */}
          <div className="flex flex-wrap items-center gap-1.5">
            {BOOK_SPREADS.map((sp) => {
              const p1 = selectedUnitIdx * 10 + sp.rightPageNum;
              const p2 = selectedUnitIdx * 10 + sp.leftPageNum;
              const isCurr = sp.spreadIndex === currentSpreadIdx;
              return (
                <button
                  key={sp.spreadIndex}
                  type="button"
                  onClick={() => triggerSpreadChange(sp.spreadIndex)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                    isCurr
                      ? 'bg-emerald-500 text-slate-950 shadow'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  ص {p1}–{p2}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNextSpread}
            disabled={
              selectedUnitIdx === ENGLISH_3D_BOOK_UNITS.length - 1 &&
              currentSpreadIdx === BOOK_SPREADS.length - 1
            }
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2.5 text-xs sm:text-sm font-extrabold text-slate-950 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer"
          >
            <span>تقليب للصفحتين التاليتين (3D Flip)</span>
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnglishCourseInteractive;
