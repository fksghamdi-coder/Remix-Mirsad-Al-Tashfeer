// Phase 2 — بنك الأسئلة الشامل للاختبار النهائي والتكيفي (106 سؤالاً موزعة على جميع الفصول)

export interface QuizQuestion {
  id: string | number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  chapter: number;
  chapterId: number;
  course?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

const RAW_QUIZ_BANK: Array<Omit<QuizQuestion, 'chapter' | 'chapterId'> & { chapter?: number; chapterId?: number }> = [
  // ─── الفصل 1: أساسيات التشفير والجبر المتقدم ───
  {
    id: 'q1-001',
    chapter: 1,
    question: 'كم عدد عناصر حقل غالوا GF(2^8) المستخدم في AES؟',
    options: ['128', '256', '512', '64'],
    correctIndex: 1,
    explanation: 'GF(2^8) يتكون من 2^8 = 256 عنصراً، كل منها يمثل بايت.',
  },
  {
    id: 'q1-002',
    chapter: 1,
    question: 'ما هي كثيرة الحدود اللاختزالية المستخدمة في AES؟',
    options: ['x^8 + x^4 + x^3 + x + 1', 'x^8 + x^4 + x^2 + 1', 'x^8 + x^3 + x + 1', 'x^8 + x^6 + x^4 + x^2 + 1'],
    correctIndex: 0,
    explanation: 'كثيرة الحدود اللاختزالية في AES هي x^8 + x^4 + x^3 + x + 1 (0x11B).',
  },
  {
    id: 'q1-003',
    chapter: 1,
    question: 'ما ناتج 17 mod 5؟',
    options: ['1', '2', '3', '4'],
    correctIndex: 1,
    explanation: '17 = 3 × 5 + 2، إذن الباقي هو 2.',
  },
  {
    id: 'q1-004',
    chapter: 1,
    question: 'ما هو GCD(48, 18)؟',
    options: ['6', '12', '3', '24'],
    correctIndex: 0,
    explanation: 'باستخدام خوارزمية إقليدس: GCD(48,18) = GCD(18,12) = GCD(12,6) = GCD(6,0) = 6.',
  },
  {
    id: 'q1-005',
    chapter: 1,
    question: 'في AES، ما حجم كتلة التشفير بالبت؟',
    options: ['128', '192', '256', '64'],
    correctIndex: 0,
    explanation: 'AES يعمل بكتلة ثابتة 128 بت (16 بايت) بغض النظر عن طول المفتاح.',
  },
  {
    id: 'q1-006',
    chapter: 1,
    question: 'ما عدد دورات التشفير في AES-128؟',
    options: ['10', '12', '14', '8'],
    correctIndex: 0,
    explanation: 'AES-128 يستخدم 10 دورات، AES-192 يستخدم 12، وAES-256 يستخدم 14.',
  },
  {
    id: 'q1-007',
    chapter: 1,
    question: 'أي خطوة في AES تعمل على مستوى البايت الواحد (SubBytes)؟',
    options: ['استبدال كل بايت بقيمته عبر جدول S-Box', 'تبديل صفوف المصفوفة', 'خلط أعمدة المصفوفة', 'إضافة مفتاح الجولة'],
    correctIndex: 0,
    explanation: 'SubBytes تستبدل كل بايت بقيمة من جدول S-Box الثابت.',
  },
  {
    id: 'q1-008',
    chapter: 1,
    question: 'ما وظيفة ShiftRows في AES؟',
    options: ['إزاحة دورانية للصفوف', 'خلط الأعمدة', 'استبدال القيم', 'إضافة مفتاح الجولة'],
    correctIndex: 0,
    explanation: 'ShiftRows تزحزح صفوف مصفوفة الحالة بشكل دوري: الصف 1 بنقطة، الصف 2 بنقطتين، الصف 3 بثلاث نقاط.',
  },
  {
    id: 'q1-009',
    chapter: 1,
    question: 'ما هي خاصية المعكوس المعياري لـ 3 mod 11؟',
    options: ['4', '7', '8', '10'],
    correctIndex: 2,
    explanation: '3 × 8 = 24 ≡ 1 (mod 11)، إذن المعكوس المعياري هو 8.',
  },
  {
    id: 'q1-010',
    chapter: 1,
    question: 'في حساب modpow(2, 10, 1000)، ما الناتج؟',
    options: ['24', '240', '2048', '48'],
    correctIndex: 0,
    explanation: '2^10 = 1024، و 1024 mod 1000 = 24.',
  },
  {
    id: 'q1-011',
    chapter: 1,
    question: 'ما الفرق بين التشفير المتماثل والتشفير غير المتماثل؟',
    options: [
      'المتماثل يستخدم نفس المفتاح للتشفير وفك التشفير',
      'غير المتماثل أبطأ ولا يستخدم للملفات الكبيرة',
      'المتماثل يستخدم مفتاحاً عاماً ومفتاحاً خاصاً',
      'لا فرق بينهما',
    ],
    correctIndex: 0,
    explanation: 'التشفير المتماثل يستخدم نفس المفتاح (سري) في كلا الاتجاهين، بينما غير المتماثل يستخدم زوج مفاتيح.',
  },
  {
    id: 'q1-012',
    chapter: 1,
    question: 'ما هي وظيفة AddRoundKey في AES؟',
    options: ['الجمع XOR بين حالة المصفوفة ومفتاح الجولة', 'استبدال القيم', 'تبديل المواقع', 'خلط الأعمدة'],
    correctIndex: 0,
    explanation: 'AddRoundKey يمزج مفتاح الجولة مع حالة المصفوفة باستخدام العملية XOR.',
  },

  // ─── الفصل 2: المنحنيات الإهليلجية ───
  {
    id: 'q2-001',
    chapter: 2,
    question: 'ما معادلة المنحنى الإهليلجي القياسية؟',
    options: ['y² = x³ + ax + b', 'y = x² + ax + b', 'x² + y² = r²', 'y² = x³ + x + 1'],
    correctIndex: 0,
    explanation: 'المعادلة العامة لمنحنى إهليلجي: y² = x³ + ax + b مع المميز 4a³ + 27b² ≠ 0.',
  },
  {
    id: 'q2-002',
    chapter: 2,
    question: 'ما شرط المميز (Discriminant) لمنع الجذور المزدوجة؟',
    options: ['4a³ + 27b² ≠ 0', '4a³ + 27b² = 0', 'a ≠ 0 و b ≠ 0', 'a² + b² > 0'],
    correctIndex: 0,
    explanation: 'يجب أن يكون المميز مختلفاً عن الصفر لضمان أن المنحنى سلس (بدون تقاطع ذاتي أو نقطة انعطاف).',
  },
  {
    id: 'q2-003',
    chapter: 2,
    question: 'ما هي عملية P + P على المنحنى الإهليلجي تسمى؟',
    options: ['المضاعفة (Point Doubling)', 'الجمع (Point Addition)', 'الإسقاط (Projection)', 'التحوير (Twisting)'],
    correctIndex: 0,
    explanation: 'عند جمع نقطة مع نفسها نستخدم مماس المنحنى ونسمي العملية "المضاعفة".',
  },
  {
    id: 'q2-004',
    chapter: 2,
    question: 'ما هي نظرية هاسه (Hasse) فيما يتعلق بالمنحنيات الإهليلجية؟',
    options: [
      'عدد النقاط على المنحنى محدود ويساوي #E(Fp) = p + 1 - t',
      'المنحنى لا نهائي النقاط دائماً',
      'كل نقطة تقع على المحور السيني',
      'لا يوجد عنصر محايد',
    ],
    correctIndex: 0,
    explanation: 'نظرية هاسه: #E(Fp) = p + 1 - t حيث |t| ≤ 2√p.',
  },
  {
    id: 'q2-005',
    chapter: 2,
    question: 'ما هي المشكلة الحسابية الصعبة الأساسية التي يعتمد عليها ECC؟',
    options: [
      'مسألة اللوغاريتم المنفصل على المنحنيات الإهليلجية (ECDLP)',
      'تحليل الأعداد إلى عوامل أولية',
      'مسألة knapsack',
      'حل أنظمة المعادلات الخطية',
    ],
    correctIndex: 0,
    explanation: 'ECDLP: معطى P و Q = kP، إيجاد k. هذه مسألة صعبة حسابياً للحواسيب الكلاسيكية.',
  },
  {
    id: 'q2-006',
    chapter: 2,
    question: 'ما هو العنصر المحايد (Identity) في مجموعة المنحنى الإهليلجي؟',
    options: ['نقطة اللانهاية (O)', 'النقطة (0, 0)', 'النقطة (1, 1)', 'ليس هناك عنصر محايد'],
    correctIndex: 0,
    explanation: 'نقطة اللانهاية O تعمل كعنصر محايد: P + O = P لكل نقطة P.',
  },
  {
    id: 'q2-007',
    chapter: 2,
    question: 'ما معيار المنحنى المعتمد في Bitcoin؟',
    options: ['secp256k1', 'NIST P-256', 'Curve25519', 'brainpoolP256r1'],
    correctIndex: 0,
    explanation: 'secp256k1 يُستخدم في Bitcoin و Ethereum، بينما NIST P-256 وCurve25519 يُستخدمان في TLS و X.509.',
  },
  {
    id: 'q2-008',
    chapter: 2,
    question: 'في المنحنى y² = x³ + 7 (mod p) المستخدم في Bitcoin، ما قيمة a؟',
    options: ['0', '1', '7', '-3'],
    correctIndex: 0,
    explanation: 'في secp256k1: a = 0 و b = 7، لذا المعادلة هي y² = x³ + 7.',
  },
  {
    id: 'q2-009',
    chapter: 2,
    question: 'ما هي خاصية التجميع (Associativity) في المجموعة الإهليلجية؟',
    options: ['(P + Q) + R = P + (Q + R)', 'P + Q = Q + P فقط', 'P + P = O', 'P + O = P فقط'],
    correctIndex: 0,
    explanation: 'عملية جمع النقاط تجميعية: ترتيب الجمع لا يؤثر على النتيجة.',
  },
  {
    id: 'q2-010',
    chapter: 2,
    question: 'ما الفرق بين ECDH و ECDSA؟',
    options: ['ECDH لتبادل المفاتيح، ECDSA للتوقيع الرقمي', 'كلاهما لنفس الغرض', 'ECDH للتشفير المتماثل، ECDSA للهايبرد', 'لا علاقة بينهما'],
    correctIndex: 0,
    explanation: 'ECDH: اتفاق مفتاح مشترك. ECDSA: توقيع رقمي للتحقق من الأصالة وسلامة البيانات.',
  },

  // ─── الفصل 3: RSA وتبادل المفاتيح ───
  {
    id: 'q3-001',
    chapter: 3,
    question: 'على أي صعوبة رياضية يعتمد أمان RSA؟',
    options: [
      'تحليل الأعداد الكبيرة إلى عواملها الأولية',
      'حساب اللوغاريتم المنفصل',
      'مسألة knapsack',
      'حل معادلات كثيرات الحدود',
    ],
    correctIndex: 0,
    explanation: 'أمان RSA يعتمد على صعوبة تحليل n = p × q عندما تكون p و q عددين أوليين كبيرين.',
  },
  {
    id: 'q3-002',
    chapter: 3,
    question: 'في RSA، ما علاقة المفتاح العام بالمفتاح الخاص؟',
    options: ['ed ≡ 1 (mod φ(n))', 'e + d = n', 'e × d = φ(n)', 'لا توجد علاقة'],
    correctIndex: 0,
    explanation: 'المفتاحان مرتبطان بالعلاقة: e × d ≡ 1 (mod φ(n)) حيث φ(n) = (p-1)(q-1).',
  },
  {
    id: 'q3-003',
    chapter: 3,
    question: 'ما هي عملية التشفير في RSA؟',
    options: ['c = m^e mod n', 'c = m × e mod n', 'c = m^d mod n', 'c = m + e mod n'],
    correctIndex: 0,
    explanation: 'التشفير: c ≡ m^e (mod n). فك التشفير: m ≡ c^d (mod n).',
  },
  {
    id: 'q3-004',
    chapter: 3,
    question: "ما هو Euler's totient function φ(n) لـ n = 15؟",
    options: ['8', '10', '12', '6'],
    correctIndex: 0,
    explanation: 'φ(15) = φ(3) × φ(5) = 2 × 4 = 8. الأعداد الأولية نسبياً مع 15 هي: 1,2,4,7,8,11,13,14.',
  },
  {
    id: 'q3-005',
    chapter: 3,
    question: 'لماذا يُعتبر RSA بطيئاً مقارنة بـ AES؟',
    options: [
      'لأنه يعتمد على أس رقمي مع أعداد كبيرة (حسابات معيارية معقدة)',
      'لأنه يستخدم مفاتيح أقصر',
      'لأنه لا يحتاج عمليات رياضية',
      'لأنه بسيط جداً',
    ],
    correctIndex: 0,
    explanation: 'RSA يتطلب عمليات modular exponentiation بأعداد 2048+ بت، بينما AES يعمل على البايتات مباشرة.',
  },
  {
    id: 'q3-006',
    chapter: 3,
    question: 'ما هو Diffie-Hellman؟',
    options: [
      'بروتوكول تبادل مفاتيح يسمح بإنشاء سر مشترك عبر قناة غير آمنة',
      'خوارزمية تشفير متماثل',
      'نظام توقيعات رقمية',
      'بروتوكول تصديق',
    ],
    correctIndex: 0,
    explanation: 'Diffie-Hellman (1976) هو أول بروتوكول عملي لتبادل المفاتيح، يسمح لطرفين بإنشاء مفتاح سري مشترك.',
  },
  {
    id: 'q3-007',
    chapter: 3,
    question: 'في ECDH، ما هو "السر المشترك"؟',
    options: ['النقطة d_A × Q_B على المنحنى الإهليلجي', 'اللوغاريتم المنفصل للنقطة', 'مفتاح RSA العام', 'هاش للمفتاح'],
    correctIndex: 0,
    explanation: 'كل طرف يحسب النقطة نفسها: الطرف A: d_A × Q_B = d_A × d_B × G = الطرف B: d_B × Q_A.',
  },
  {
    id: 'q3-008',
    chapter: 3,
    question: 'ما الحجم الآمن للمفتاح في RSA حالياً؟',
    options: ['2048 بت على الأقل', '512 بت', '1024 بت', '768 بت'],
    correctIndex: 0,
    explanation: 'مفاتيح RSA أقل من 2048 بت تعتبر غير آمنة. 2048 بت يوفر أماناً يعادل ~112 بت.',
  },
  {
    id: 'q3-009',
    chapter: 3,
    question: 'ما الفرق بين OAEP و PKCS#1 v1.5 في RSA؟',
    options: ['OAEP أكثر أماناً ويحمي من هجمات padding oracle', 'لا فرق', 'PKCS#1 v1.5 أحدث', 'OAEP أسرع فقط'],
    correctIndex: 0,
    explanation: 'OAEP (Optimal Asymmetric Encryption Padding) يضيف عشوائية ويمنع هجمات Padding Oracle الشهيرة.',
  },
  {
    id: 'q3-010',
    chapter: 3,
    question: 'ما هو Digital Signature Algorithm (DSA)؟',
    options: [
      'خوارزمية توقيع رقمي معتمدة من NIST تعتمد على اللوغاريتم المنفصل',
      'خوارزمية تشفير متماثل',
      'بروتوكول تبادل مفاتيح',
      'دالة الهاش',
    ],
    correctIndex: 0,
    explanation: 'DSA هو معيار NIST للتوقيع الرقمي (FIPS 186)، يعتمد على صعوبة DLP في Zp*.',
  },

  // ─── الفصل 4: PKI والشهادات ───
  {
    id: 'q4-001',
    chapter: 4,
    question: 'ما هو CA (Certificate Authority)؟',
    options: ['جهة إصدار شهادات التشفير للمفتاح العام Public Key', 'خوارزمية تشفير', 'بروتوكول شبكي', 'نظام إدارة مخاطر'],
    correctIndex: 0,
    explanation: 'CA هي جهة موثوقة تصدر شهادات PKI تربط الهوية بالمفتاح العام.',
  },
  {
    id: 'q4-002',
    chapter: 4,
    question: 'ما هو X.509؟',
    options: ['معيار شهادات المفتاح العام', 'بروتوكول نقل ملفات', 'خوارزمية hashing', 'معيار تشفير متماثل'],
    correctIndex: 0,
    explanation: 'X.509 هو معيار ITU-T لتحديد بنية الشهادات الرقمية المستخدمة في PKI.',
  },
  {
    id: 'q4-003',
    chapter: 4,
    question: 'ما هو CRL (Certificate Revocation List)؟',
    options: ['قائمة بالشهادات الملغاة', 'قائمة بالمفاتيح العامة', 'قائمة بالتوقيعات', 'قائمة بالتشفير'],
    correctIndex: 0,
    explanation: 'CRL هي قائمة منشورة من قبل CA تحتوي على الشهادات التي تم إلغاؤها قبل انتهاء صلاحيتها.',
  },
  {
    id: 'q4-004',
    chapter: 4,
    question: 'ما الفرق بين OCSP و CRL؟',
    options: ['OCSP يتحقق من حالة الشهادة فورياً (Online)، بينما CRL قائمة منشورة مسبقاً', 'لا فرق', 'CRL أسرع', 'OCSP ليس للتحقق'],
    correctIndex: 0,
    explanation: 'OCSP يوفر تحققاً فورياً لحالة الشهادة عبر استفسار مباشر، بينما CRL تتطلب تنزيل قائمة كاملة.',
  },
  {
    id: 'q4-005',
    chapter: 4,
    question: 'ما هي سلسلة الثقة (Chain of Trust) في PKI؟',
    options: [
      'تسلسل الشهادات من الشهادة الطرفية إلى CA الجذر',
      'تشفير البيانات في السلسلة',
      'توزيع المفاتيح على الشبكة',
      'نسخ احتياطي للشهادات',
    ],
    correctIndex: 0,
    explanation: 'كل شهادة تُوقع من CA أعلى منها، وتتسلسل حتى نصل إلى CA الجذر الموثوق به محلياً.',
  },
  {
    id: 'q4-006',
    chapter: 4,
    question: 'ما هو DNSSEC؟',
    options: ['تأمين نظام أسماء النطاقات بتوقيعات رقمية', 'بروتوكول تشفير HTTP', 'خوارزمية مصادقة', 'نظام توزيع مفاتيح'],
    correctIndex: 0,
    explanation: 'DNSSEC يضيف توقيعات رقمية لسجلات DNS لمنع هجمات Cache Poisoning.',
  },

  // ─── الفصل 5: VPN و TLS ───
  {
    id: 'q5-001',
    chapter: 5,
    question: 'ما هو الفرق الأساسي بين IPsec و SSL/TLS؟',
    options: [
      'IPsec يعمل على مستوى الشبكة (Layer 3)، و TLS على مستوى النقل (Layer 4-7)',
      'لا فرق',
      'TLS أقدم',
      'IPsec للتطبيقات فقط',
    ],
    correctIndex: 0,
    explanation: 'IPsec يحمي حركة الشبكة كاملة (Layer 3)، بينما TLS يحمي اتصال تطبيق محدد (HTTP/TCP).',
  },
  {
    id: 'q5-002',
    chapter: 5,
    question: 'ما هي ميزات TLS 1.3 الرئيسية مقارنة بـ TLS 1.2؟',
    options: [
      'إزالة خوارزميات ضعيفة، وتسريع Handshake إلى 1-RTT، وإلزام ECDHE',
      'إضافة RSA فقط',
      'إلغاء التشفير',
      'زيادة حجم المفاتيح',
    ],
    correctIndex: 0,
    explanation: 'TLS 1.3 ألغى RSA key exchange، و CBC modes، وفرض ECDHE لتحقيق السرية الأمامية.',
  },
  {
    id: 'q5-003',
    chapter: 5,
    question: 'ما هي Forward Secrecy (FS)؟',
    options: [
      'قدرة كل جلسة على استخدام مفتاح مستقل لا يمكن استنتاجه من المفاتيح الأخرى',
      'تشفير البيانات المستقبلية',
      'حماية ضد هجمات المستقبل',
      'تشفير متعدد المستويات',
    ],
    correctIndex: 0,
    explanation: 'FS تضمن أنه حتى لو تم اختراق المفتاح الثابت، لن يتمكن المهاجم من فك تشفير الجلسات السابقة.',
  },
  {
    id: 'q5-004',
    chapter: 5,
    question: 'ما هو WireGuard؟',
    options: ['بروتوكول VPN حديث مبني على أوليات تشفيرية بسيطة وآمنة', 'خوارزمية تشفير', 'بروتوكول routing', 'نظام مصادقة'],
    correctIndex: 0,
    explanation: 'WireGuard بروتوكول VPN حديث يستخدم تشفيراً معتمداً (Noise Protocol) وأقل تعقيداً من IPsec.',
  },
  {
    id: 'q5-005',
    chapter: 5,
    question: 'ما هو HTTP Strict Transport Security (HSTS)؟',
    options: ['سياسة تجبر المتصفح على استخدام HTTPS فقط', 'بروتوكول تشفير', 'خوارزمية مصادقة', 'نظام توقيعات'],
    correctIndex: 0,
    explanation: 'HSTS يضمن عدم حدوث downgrade attacks من HTTPS إلى HTTP.',
  },

  // ─── الفصل 7: إثبات المعرفة الصفرية (ZKP) ───
  {
    id: 'q7-001',
    chapter: 7,
    question: 'ما هو إثبات المعرفة الصفرية (Zero-Knowledge Proof)؟',
    options: ['بروتوكول يسمح للمثبت بإثبات معرفة سر دون كشفه', 'نوع من التشفير', 'خوارزمية hashing', 'نظام مصادقة تقليدي'],
    correctIndex: 0,
    explanation: 'ZKP يسمح للطرف بإثبات معرفته بمعلومة سرية دون الكشف عن المعلومة نفسها.',
  },
  {
    id: 'q7-002',
    chapter: 7,
    question: 'ما هي خصائص ZKP الثلاث؟',
    options: [
      'الاكتمال (Completeness)، السلامة (Soundness)، المعرفة الصفرية (Zero-Knowledge)',
      'السرية، السرعة، الدقة',
      'التشفير، الفك، التحقق',
      'الاختصار، التسريع، التكرار',
    ],
    correctIndex: 0,
    explanation: 'الاكتمال: الحقيقة المقترحة يقبلها المدقق. السلامة: الكاذب لا ينجح. المعرفة الصفرية: لا تسرب معلومات.',
  },
  {
    id: 'q7-003',
    chapter: 7,
    question: 'ما هو بروتوكول شنور (Schnorr) للإثبات؟',
    options: ['بروتوكول Sigma ثلاثي الرسائل: التزام، تحدٍ، استجابة', 'خوارزمية تشفير', 'نظام توقيع', 'بروتوكول تبادل مفاتيح'],
    correctIndex: 0,
    explanation: 'Schnorr: 1) يختار المثبت k عشوائياً ويرسل r=g^k، 2) يرسل المدقق التحدي e، 3) يرسل المثبت s=k+ex mod q.',
  },
  {
    id: 'q7-004',
    chapter: 7,
    question: 'ما هي witness extraction في سياق ZKP؟',
    options: [
      'قدرة المدقق على استخراج المعرفة السرية عند تقديم استجابتين لنفس الالتزام',
      'استخراج البيانات المشفرة',
      'فك التشفير',
      'استعادة المفتاح',
    ],
    correctIndex: 0,
    explanation: 'إذا أجاب المثبت على تحديين مختلفين لنفس الالتزام، يمكن استخراج الشاهد السري رياضياً.',
  },
  {
    id: 'q7-005',
    chapter: 7,
    question: 'كيف يُستخدم ZKP في سلاسل الكتل (zk-SNARKs)؟',
    options: ['لإثبات صحة المعاملات بخصوصية تامة دون كشف المبلغ أو المرسل', 'لتشفير البلوكات', 'لتسريع التعدين فقط', 'لزيادة حجم البلوك'],
    correctIndex: 0,
    explanation: 'zk-SNARKs تسمح بإثبات صحة المعاملة دون كشف تفاصيلها.',
  },

  // ─── الفصل 8: الهجمات الجانبية و HSM ───
  {
    id: 'q8-001',
    chapter: 8,
    question: 'ما هي الهجمات الجانبية (Side-Channel Attacks)؟',
    options: [
      'هجمات تستغل التسريبات الفيزيائية (الطاقة، الزمن، الإشعاع) وليس الخوارزمية الرياضية',
      'هجمات على البروتوكولات',
      'هجمات على التطبيق',
      'هجمات على قاعدة البيانات',
    ],
    correctIndex: 0,
    explanation: 'تستغل التسريبات المادية: Time analysis, Power analysis, EM analysis, acoustic.',
  },
  {
    id: 'q8-002',
    chapter: 8,
    question: 'ما هو HSM (Hardware Security Module)؟',
    options: ['جهاز مادي يعزل ويحمي المفاتيح المشفرة في بيئة آمنة', 'برنامج تشفير', 'خادم ويب آمن', 'جدار حماية'],
    correctIndex: 0,
    explanation: 'HSM وحدة عتادية متخصصة تولد وتخزن وتدير المفاتيح التشفيرية بعزل تام.',
  },
  {
    id: 'q8-003',
    chapter: 8,
    question: 'ما هو Constant-Time Implementation؟',
    options: [
      'تنفيذ برمجي لا يتغير وقت تنفيذه حسب قيمة البيانات السرية',
      'تطبيق سريع جداً',
      'تطبيق متزامن شبكياً',
      'تطبيق محسّن للأداء',
    ],
    correctIndex: 0,
    explanation: 'لمنع هجمات timing attack: يجب أن يستغرق التنفيذ نفس الوقت بغض النظر عن المدخلات السرية.',
  },
  {
    id: 'q8-004',
    chapter: 8,
    question: 'ما هي Power Analysis Attack؟',
    options: ['تحليل استهلاك الطاقة للكشف عن المفاتيح التشفيرية', 'هجوم على الشبكة', 'هجوم على البرمجيات', 'هجوم على قواعد البيانات'],
    correctIndex: 0,
    explanation: 'DPA (Differential Power Analysis) يحلل أنماط استهلاك الطاقة أثناء العمليات التشفيرية.',
  },

  // ─── الفصل 9-11: التشفير المقاوم للكم ───
  {
    id: 'q9-001',
    chapter: 9,
    question: 'ما هو ML-KEM (معيار NIST FIPS 203)؟',
    options: [
      'خوارزمية تبادل مفاتيح مقاومة للكم مبنية على شبكات lattice-LWE',
      'خوارزمية تشفير متماثل',
      'خوارزمية توقيع',
      'دالة hashing',
    ],
    correctIndex: 0,
    explanation: 'ML-KEM (المعروف سابقاً بـ CRYSTALS-Kyber) هو معيار NIST لتبادل المفاتيح المقاوم للكم.',
  },
  {
    id: 'q9-002',
    chapter: 9,
    question: 'ما هي مسألة LWE (Learning With Errors)؟',
    options: ['استنتاج متجه سري من معادلات خطية مع إضافة ضوضاء', 'مسألة تحليل أعداد', 'مسألة لوغاريتم منفصل', 'مسألة knapsack'],
    correctIndex: 0,
    explanation: 'LWE: معطى (A, b = As + e) حيث e ضوضاء، إيجاد s. صعبة حتى على الحواسيب الكمومية.',
  },
  {
    id: 'q10-001',
    chapter: 10,
    question: 'ما هو ML-DSA (معيار NIST FIPS 204)؟',
    options: ['خوارزمية توقيع رقمي مقاومة للكم مبنية على lattice', 'خوارزمية تشفير', 'بروتوكول تبادل مفاتيح', 'دالة hashing'],
    correctIndex: 0,
    explanation: 'ML-DSA (المعروف سابقاً بـ CRYSTALS-Dilithium) معيار NIST للتوقيع الرقمي المقاوم للكم.',
  },
  {
    id: 'q11-001',
    chapter: 11,
    question: 'ما هو SLH-DSA (FIPS 205)؟',
    options: [
      'خوارزمية توقيع رقمي مقاومة للكم مبنية على الهاش (stateless hash-based)',
      'خوارزمية تشفير',
      'بروتوكول تبادل مفاتيح',
      'دالة hashing',
    ],
    correctIndex: 0,
    explanation: 'SLH-DSA (SPHINCS+) مبنية على دوال الهاش فقط، وتعتبر آمنة جداً ضد الحواسيب الكمومية.',
  },
  {
    id: 'q11-002',
    chapter: 11,
    question: 'ما هو التهديد الرئيسي الذي تشكله الحواسيب الكمومية على التشفير الحالي؟',
    options: [
      'خوارزمية شور (Shor) التي تحلل العوامل الأولية وتحسب اللوغاريتم المنفصل بكفاءة',
      'خوارزمية جروفر (Grover) فقط',
      'لا تهديد حالياً',
      'الهجوم بالقوة الغاشمة',
    ],
    correctIndex: 0,
    explanation: 'خوارزمية شور تكسر RSA و ECC في وقت متعدد الحدود. جروفر يسرع البحث لكن يمكن تعويضه بمفاتيح أكبر.',
  },
  {
    id: 'q11-003',
    chapter: 11,
    question: 'ما هي سياسة "Harvest Now, Decrypt Later"؟',
    options: [
      'جمع البيانات المشفرة حالياً وفك تشفيرها لاحقاً عند توفر حواسيب كمومية',
      'تشفير البيانات الآن وفكها لاحقاً',
      'حذف البيانات القديمة',
      'تشفير البيانات بالمستقبل',
    ],
    correctIndex: 0,
    explanation: 'المهاجمون يجمعون بيانات مشفرة اليوم وينتظرون الحواسيب الكمومية لفكها.',
  },

  // ─── أسئلة عامة ومتقدمة ───
  {
    id: 'qX-001',
    chapter: 1,
    question: 'ما الفرق بين Hash و Encryption؟',
    options: [
      'Hash باتجاه واحد ولا يمكن عكسه، بينما Encryption باتجاهين ويمكن فك تشفيره بالمفتاح',
      'لا فرق',
      'Hash للبيانات الكبيرة فقط',
      'Encryption للبيانات الصغيرة فقط',
    ],
    correctIndex: 0,
    explanation: 'Hash دالة اتجاه واحد (one-way) تنتج مخرجاً ثابت الطول، بينما Encryption قابلة للعكس بالمفتاح.',
  },
  {
    id: 'qX-002',
    chapter: 3,
    question: 'ما هي padding oracle attack؟',
    options: [
      'هجوم يستغل اختلاف استجابة الخادم عند وجود padding خاطئ مقابل صحيح',
      'هجوم على الشبكة',
      'هجوم على قاعدة البيانات',
      'هجوم على المصادقة',
    ],
    correctIndex: 0,
    explanation: 'يُستخدم لاستخراج النص الصريح بتجربة paddings مختلفة ومراقبة استجابات الخطأ من الخادم.',
  },
  {
    id: 'qX-003',
    chapter: 5,
    question: 'ما هو Perfect Forward Secrecy؟',
    options: [
      'كل جلسة تستخدم مفتاح جلسة منفصل لا علاقة له بالمفاتيح الأخرى',
      'حماية تامة',
      'عدم وجود ثغرات',
      'تشفير كامل',
    ],
    correctIndex: 0,
    explanation: 'PFS يضمن أن اختراق مفتاح طويل الأمد لا يفصح عن مفاتيح الجلسات السابقة أو اللاحقة.',
  },
  {
    id: 'qX-004',
    chapter: 7,
    question: 'ما هو Fiat-Shamir heuristic في تحويل ZKP إلى توقيع؟',
    options: [
      'استبدال تحدي المدقق بدالة هاش لجعل البروتوكول غير تفاعلي (non-interactive)',
      'استبدال المفتاح',
      'استبدال الخوارزمية',
      'استبدال البيانات',
    ],
    correctIndex: 0,
    explanation: 'Fiat-Shamir يحول بروتوكولاً تفاعلياً إلى non-interactive بتعويض التحدي بـ H(commitment || message).',
  },
  {
    id: 'qX-005',
    chapter: 1,
    question: 'ما هو Galois Field GF(p) حيث p أولي؟',
    options: [
      'مجموعة الأعداد {0, 1, ..., p-1} مع العمليات الحسابية modulo p',
      'مجموعة الأعداد الحقيقية',
      'مجموعة المصفوفات',
      'مجموعة الأعداد الصحيحة غير المحدودة',
    ],
    correctIndex: 0,
    explanation: 'GF(p) = Z/pZ هو حقل منتهٍ من p عنصر عندما يكون p عدداً أولياً.',
  },
  {
    id: 'q1',
    course: 'ise243',
    chapter: 1,
    question: 'ما هي نتيجة تطبيق الدالة xtime(0x57) في حقل AES؟',
    options: ['0xAE', '0xFE', '0x47', '0xB5'],
    correctIndex: 0,
    explanation:
      'البايت 0x57 = 01010111 ثنائياً، وبما أن البت الأعلى قيمة MSB يساوي 0 فإن xtime تكتفي بالإزاحة لليسار بمقدار بت واحد فينتج 0xAE.',
    difficulty: 'medium',
  },
  {
    id: 'q2',
    course: 'ise243',
    chapter: 1,
    question: 'متى يتم إجراء عملية XOR مع البايت 0x1B أثناء تنفيذ عملية xtime(a)؟',
    options: [
      'عندما يكون البت الأعلى قيمة (MSB - Bit 7) للبايت a يساوي 1 قبل الإزاحة',
      'عندما يكون البت الأقل قيمة (LSB - Bit 0) يساوي 1',
      'في جميع الحالات بعد الإزاحة اليسارية',
      'عندما تكون قيمة البايت أقل من 0x80',
    ],
    correctIndex: 0,
    explanation:
      'إذا كان البت السابع يساوي 1 فإن الضرب في x ينتج حداً من الدرجة x^8 فيتم اختزاله عبر XOR مع 0x1B.',
    difficulty: 'medium',
  },
  {
    id: 'q3',
    course: 'ise243',
    chapter: 2,
    question: 'لماذا تُحذف خطوة MixColumns من الجولة الأخيرة في خوارزمية AES؟',
    options: [
      'لجعل هيكل التشفير وفك التشفير متماثلاً ولأنها لا تضيف أماناً إضافياً قبل AddRoundKey الأخيرة',
      'لتقليل استهلاك الطاقة إلى النصف',
      'لأن مصفوفة الحالة تصبح غير قابلة للعكس في الجولة العاشرة',
      'لأن مفتاح الجولة الأخيرة أقصر من المفاتيح السابقة',
    ],
    correctIndex: 0,
    explanation:
      'إبقاء MixColumns في الجولة الأخيرة لا يزيد الأمان لأنها عملية خطية معروفة يمكن عكسها مباشرة، كما أن حذفها يسهل بناء الشيفرة العكسية المتكافئة.',
    difficulty: 'medium',
  },
  {
    id: 'q4',
    course: 'ise243',
    chapter: 2,
    question: 'ماذا يحدث عندما يعيد المطور استخدام نفس الرقم العشوائي (Nonce/IV) مع نفس المفتاح في وضع AES-GCM؟',
    options: [
      'ينكسر أمان السرية (XOR للنصوص الصريحة) ويمكن تزوير علامة المصادقة GHASH بالكامل',
      'يتباطأ أداء التشفير فقط دون تأثير أمني',
      'يتم تشفير الكتلة الأولى فقط بشكل متطابق بينما تبقى بقية الكتل آمنة',
      'يرفض المعالج تنفيذ العملية تلقائياً',
    ],
    correctIndex: 0,
    explanation:
      'تكرار الـ Nonce في AES-GCM يؤدي إلى توليد نفس تيار المفاتيح (Keystream) وكشف مفتاح المصادقة الفرعي H عبر هجوم Forbidden Attack.',
    difficulty: 'hard',
  },
  {
    id: 'q5',
    course: 'ise243',
    chapter: 3,
    question: 'ماذا حدث في حادثة Sony PlayStation 3 الشهيرة عام 2010 المتعلقة بتوقيع ECDSA؟',
    options: [
      'استخدمت سوني نفس الرقم العشوائي k في توقيعين مختلفين مما سمح باستخراج المفتاح الخاص هندسياً',
      'استخدمت مفتاح RSA بطول 512 بت فقط',
      'لم تستخدم دالة تجزئة قبل التوقيع',
      'اعتمدت على خوارزمية MD5 في توليد الشهادات',
    ],
    correctIndex: 0,
    explanation:
      'في ECDSA، إذا تكرر الرقم العشوائي k لتوقيع رسالتين m1 وm2 فإن الفرق s1 - s2 يكشف k مباشرة ومنه يُحسب المفتاح الخاص d.',
    difficulty: 'medium',
  },
  {
    id: 'q6',
    course: 'ise243',
    chapter: 4,
    question: 'ما هو الهدف من سجلات شفافية الشهادات (Certificate Transparency - CT Logs)؟',
    options: [
      'تسجيل جميع الشهادات الصادرة في سجلات عامة غير قابلة للتعديل (Merkle Trees) لاكتشاف أي شهادة مزورة فوراً',
      'تشفير المفاتيح الخاصة لأصحاب المواقع في سحابة عامة',
      'إلغاء الحاجة إلى بروتوكول HTTPS',
      'تسريع ضغط الصور في المتصفحات',
    ],
    correctIndex: 0,
    explanation:
      'تفرض المتصفحات الحديثة وجود إثباتات SCT في الشهادات لضمان إدراجها في أشجار Merkle علنية يمكن لمالكي النطاقات مراقبتها.',
    difficulty: 'medium',
  },
  {
    id: 'q7',
    course: 'ise243',
    chapter: 8,
    question: 'ما هو الهجوم الكارثي الذي يمكن تنفيذه على توقيع RSA-CRT عند حقن خطأ مادي عابر (Bellcore Fault Attack)؟',
    options: [
      'يستطيع المهاجم استخراج العامل الأولي السري p بحساب القاسم المشترك الأكبر GCD(s^e - m, n) من توقيع خاطئ واحد فقط',
      'يتم تصفير الشهادة الرقمية في المتصفح فقط',
      'يتحول المفتاح العام إلى نص عادي',
      'تتوقف خوارزمية SHA-256 عن العمل',
    ],
    correctIndex: 0,
    explanation:
      'في هجوم Bellcore، إذا تعطل الحساب mod q وبقي الحساب mod p صحيحاً، فإن القيمة (s_faulty^e - m) تكون مضاعفاً لـ p وليست مضاعفاً لـ q، فيكشف GCD العامل الأولي p فوراً.',
    difficulty: 'hard',
  },
  {
    id: 'q8',
    course: 'ise243',
    chapter: 11,
    question: 'وفق مبرهنة موسكا (Mosca’s Inequality: X + Y > Z)، متى يجب البدء فوراً بالترحيل إلى التشفير ما بعد الكمي؟',
    options: [
      'عندما يكون مجموع فترة السرية المطلوبة للبيانات (X) والزمن اللازم لترحيل الأنظمة (Y) أكبر من الزمن المتبقي لظهور حاسوب كمي كاسر للتشفير (Z)',
      'فقط بعد إعلان بناء حاسوب كمي فعلي بسعة مليون كيوبت منطقي',
      'عندما تكون قيمة X تساوي صفراً',
      'عند انتهاء صلاحية شهادة TLS الحالية',
    ],
    correctIndex: 0,
    explanation:
      'توضح متباينة موسكا أنه إذا كان X + Y > Z فإن البيانات الحالية ستنكشف قبل انتهاء فترة سريتها ما لم نبدأ الترحيل الآن.',
    difficulty: 'medium',
  },
];

export const QUIZ_BANK: QuizQuestion[] = RAW_QUIZ_BANK.map((q) => {
  const ch = q.chapter ?? q.chapterId ?? 1;
  return {
    ...q,
    chapter: ch,
    chapterId: ch,
    course: q.course ?? 'ise243',
  };
});

export function pickRandomQuestions(count: number = 15): QuizQuestion[] {
  const arr = [...QUIZ_BANK];
  const rand = new Uint32Array(arr.length);
  crypto.getRandomValues(rand);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = rand[i] % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, Math.min(count, arr.length));
}
