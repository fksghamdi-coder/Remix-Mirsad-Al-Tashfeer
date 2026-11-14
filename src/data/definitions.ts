export interface Definition {
  term: string;
  en: string;
  definition: string;
  formula?: string;
  category: 'أساسي' | 'رياضي' | 'متقدم' | 'كمومي' | 'تطبيقي' | 'هجوم';
  chapter: number; // رقم الفصل المرجعي
  related?: string[];
}

export const DEFINITIONS: Definition[] = [
  // ===== الفصل 1 =====
  {
    term: 'الحساب المعياري',
    en: 'Modular Arithmetic',
    chapter: 1,
    category: 'رياضي',
    definition: 'نظام حسابي تلتف فيه الأعداد عند بلوغ قيمة الترديد m، فينتج باقي القسمة.',
    formula: 'a ≡ b (mod m) ⟺ m | (a − b)',
  },
  {
    term: 'حقل غالوا',
    en: 'Galois Field',
    chapter: 1,
    category: 'رياضي',
    definition: 'حقل منتهٍ بعدد محدود من العناصر، كل عنصر غير صفري فيه له معكوس ضربي.',
    formula: 'GF(pⁿ) — p عدد أولي، n ≥ 1',
  },
  {
    term: 'GF(2⁸)',
    en: 'Galois Field 256',
    chapter: 1,
    category: 'رياضي',
    definition: 'حقل من 256 عنصراً، كل بايت يمثل عنصراً. يُستخدم في AES.',
    formula: 'GF(2⁸) ≅ GF(2)[x]/(x⁸+x⁴+x³+x+1)',
  },
  {
    term: 'AES',
    en: 'Advanced Encryption Standard',
    chapter: 1,
    category: 'أساسي',
    definition:
      'معيار تشفير كتلي بمفتاح 128/192/256 بت وكتلة 128 بت. يعتمد على 4 تحويلات: SubBytes, ShiftRows, MixColumns, AddRoundKey.',
  },
  {
    term: 'مقاومة التصادم',
    en: 'Collision Resistance',
    chapter: 1,
    category: 'أساسي',
    definition: 'خاصية دالة تجزئة تجعل إيجاد مدخلين مختلفين ينتجان نفس المخرج صعباً حسابياً.',
    formula: 'Pr[H(x)=H(y) | x≠y] < 2⁻¹²⁸ (لـ SHA-256)',
  },

  // ===== الفصل 2 =====
  {
    term: 'المنحنى الإهليلجي',
    en: 'Elliptic Curve',
    chapter: 2,
    category: 'رياضي',
    definition:
      'مجموعة نقاط (x,y) تحقق معادلة يسهل فيها جمع النقاط ومضاعفتها لكن يصعب عكسها.',
    formula: 'y² = x³ + ax + b, Δ = 4a³ + 27b² ≠ 0',
  },
  {
    term: 'الضرب القياسي',
    en: 'Scalar Multiplication',
    chapter: 2,
    category: 'رياضي',
    definition:
      'جمع نقطة P لنفسها k مرة. سهل حسابياً لكن استخراج k صعب (مسألة اللوغاريتم المنفصل).',
    formula: 'Q = k·P',
  },
  {
    term: 'ECDLP',
    en: 'Elliptic Curve Discrete Log Problem',
    chapter: 2,
    category: 'رياضي',
    definition: 'مسألة إيجاد k من P وkP على منحنى. أفضل هجوم معروف يحتاج O(√q) خطوة.',
  },
  {
    term: 'أمن الالتواء',
    en: 'Twist Security',
    chapter: 2,
    category: 'متقدم',
    definition:
      'منع المهاجم من إرسال نقطة على منحنى التوأم (twist) الأضعف لاستخراج المفتاح.',
  },

  // ===== الفصل 3 =====
  {
    term: 'ECDH',
    en: 'Elliptic Curve Diffie-Hellman',
    chapter: 3,
    category: 'أساسي',
    definition: 'تبادل مفاتيح: كل طرف يرسل gᵃ أو gᵇ ويحسب gᵃᵇ محلياً دون إرسالها.',
    formula: 'K = (gᵃ)ᵇ = (gᵇ)ᵃ = gᵃᵇ',
  },
  {
    term: 'ECDSA',
    en: 'Elliptic Curve Digital Signature Algorithm',
    chapter: 3,
    category: 'أساسي',
    definition: 'خوارزمية توقيع رقمي على المنحنيات. تعتمد على Nonce فريد لكل توقيع.',
    formula: 's = k⁻¹(H(m) + r·x) mod q',
  },
  {
    term: 'الـ Nonce',
    en: 'Number Used Once',
    chapter: 3,
    category: 'أساسي',
    definition:
      'قيمة عشوائية تُستخدم مرة واحدة فقط للتوقيع. إعادة استخدامها تكشف المفتاح الخاص.',
  },
  {
    term: 'السرية الأمامية',
    en: 'Forward Secrecy',
    chapter: 3,
    category: 'متقدم',
    definition:
      'خاصية تضمن بقاء الجلسات السابقة آمنة حتى لو انكشف المفتاح طويل الأمد لاحقاً.',
  },
  {
    term: 'توقيع شئور',
    en: 'Schnorr Signature',
    chapter: 3,
    category: 'متقدم',
    definition: 'توقيع يعتمد على بروتوكول سيجما وتقنية Fiat-Shamir. أبسط رياضياً من ECDSA.',
    formula: 's = k + c·x',
  },

  // ===== الفصل 4 =====
  {
    term: 'TLS',
    en: 'Transport Layer Security',
    chapter: 4,
    category: 'تطبيقي',
    definition: 'بروتوكول أمان طبقة النقل. TLS 1.3 (2018) يجعل PFS إلزامية ويُسرّع المصافحة.',
  },
  {
    term: 'AEAD',
    en: 'Authenticated Encryption with Associated Data',
    chapter: 4,
    category: 'متقدم',
    definition:
      'نمط تشفير يوفر السرية والسلامة معاً. مدخلاته: مفتاح، نص، Nonce، بيانات مصاحبة.',
  },
  {
    term: 'AES-GCM',
    en: 'Galois Counter Mode',
    chapter: 4,
    category: 'متقدم',
    definition: 'نمط AEAD يعتمد على AES-CTR و GHASH. سريع جداً مع تعليمات AES-NI.',
  },
  {
    term: 'ChaCha20-Poly1305',
    en: 'ChaCha20-Poly1305',
    chapter: 4,
    category: 'متقدم',
    definition:
      'تشفير تدفقي + رمز مصادقة. أفضل للأجهزة بدون تعليمات AES العتادية.',
  },
  {
    term: 'مجموعة التشفير',
    en: 'Cipher Suite',
    chapter: 4,
    category: 'تطبيقي',
    definition:
      'زوج (خوارزمية AEAD + دالة تجزئة) في TLS 1.3. مثال: TLS_AES_128_GCM_SHA256.',
  },
  {
    term: 'HKDF',
    en: 'HMAC-based KDF',
    chapter: 4,
    category: 'متقدم',
    definition:
      'دالة اشتقاق مفاتيح من سر مشترك. تُستخدم في TLS 1.3 لاشتقاق مفاتيح الجلسة.',
    formula: 'HKDF-Extract(salt, IKM) → PRK\nHKDF-Expand(PRK, info, L) → OKM',
  },

  // ===== الفصل 5 =====
  {
    term: 'VPN',
    en: 'Virtual Private Network',
    chapter: 5,
    category: 'تطبيقي',
    definition: 'نفق مشفر بين طرفين عبر شبكة عامة، يحمي البيانات من التنصت والتعديل.',
  },
  {
    term: 'IPsec',
    en: 'Internet Protocol Security',
    chapter: 5,
    category: 'تطبيقي',
    definition:
      'حزمة بروتوكولات لحماية الحزم على طبقة الشبكة. مكوناتها: ESP, AH, IKEv2, SA.',
  },
  {
    term: 'WireGuard',
    en: 'WireGuard',
    chapter: 5,
    category: 'تطبيقي',
    definition:
      'بروتوكول VPN حديث (2020) بقاعدة كود صغيرة (~4000 سطر)، أسرع من OpenVPN.',
  },
  {
    term: 'وحدة أمن العتاد',
    en: 'HSM',
    chapter: 5,
    category: 'متقدم',
    definition:
      'جهاز فيزيائي مقاوم للعبث يحفظ المفاتيح ويجري عمليات التشفير دون إخراجها.',
  },

  // ===== الفصل 6 =====
  {
    term: 'التشفير الكامل للقرص',
    en: 'FDE',
    chapter: 6,
    category: 'تطبيقي',
    definition:
      'تشفير كل قطاعات القرص (XTS-AES عادةً). يحمي من السرقة المادية، لا من المستخدم الداخلي.',
  },
  {
    term: 'التشفير الشفاف',
    en: 'TDE',
    chapter: 6,
    category: 'تطبيقي',
    definition:
      'يشفر ملفات قاعدة البيانات وسجل المعاملات، ويفكها في الذاكرة عند الاستعلام.',
  },
  {
    term: 'تشفير العمود',
    en: 'Column-level Encryption',
    chapter: 6,
    category: 'متقدم',
    definition:
      'تشفير حقول محددة. نوعان: حتمي (يسمح بالبحث) وعشوائي (أكثر أماناً، يمنع البحث).',
  },
  {
    term: 'هرمية المفاتيح',
    en: 'Key Hierarchy',
    chapter: 6,
    category: 'متقدم',
    definition:
      'Root Key → Wrapping Key → Data Key. عزل التأثير بحيث اختراق مفتاح فرعي لا يؤثر على البقية.',
  },
  {
    term: 'تمدد النص المشفر',
    en: 'Ciphertext Expansion',
    chapter: 6,
    category: 'متقدم',
    definition:
      'زيادة حجم البيانات بعد التشفير بسبب IV والحشوة. مشكلة في الحقول القصيرة.',
  },

  // ===== الفصل 7 =====
  {
    term: 'التشفير المتجانس',
    en: 'Homomorphic Encryption',
    chapter: 7,
    category: 'متقدم',
    definition:
      'نظام يسمح بإجراء عمليات رياضية على النص المشفر، فينتج نص مشفر جديد يمثل نتيجة العملية.',
    formula: 'E(a) ⊙ E(b) = E(a * b)',
  },
  {
    term: 'PHE',
    en: 'Partially Homomorphic Encryption',
    chapter: 7,
    category: 'متقدم',
    definition: 'يدعم عملية واحدة فقط (جمع أو ضرب) لعدد غير محدود من المرات.',
  },
  {
    term: 'FHE',
    en: 'Fully Homomorphic Encryption',
    chapter: 7,
    category: 'متقدم',
    definition:
      'يدعم الجمع والضرب معاً لعدد غير محدود من المرات بفضل التمهيد (Bootstrapping).',
  },
  {
    term: 'الضوضاء التشفيرية',
    en: 'Cryptographic Noise',
    chapter: 7,
    category: 'متقدم',
    definition:
      'خطأ صغير متعمد يتراكم مع كل عملية. إذا تجاوز الحد، يتعذر فك التشفير.',
  },
  {
    term: 'التمهيد',
    en: 'Bootstrapping',
    chapter: 7,
    category: 'متقدم',
    definition:
      'تقنية تقيّم دارة فك التشفير نفسها متجانسة، فتنتج نصاً جديداً بضوضاء أقل.',
  },

  // ===== الفصل 8 =====
  {
    term: 'ZKP',
    en: 'Zero-Knowledge Proof',
    chapter: 8,
    category: 'متقدم',
    definition:
      'بروتوكول يثبت معرفة سر دون كشفه. مثال: إثبات العمر فوق 18 دون كشف تاريخ الميلاد.',
  },
  {
    term: 'الاكتمال',
    en: 'Completeness',
    chapter: 8,
    category: 'متقدم',
    definition: 'خاصية ZKP: مثبت صادق يقنع مدققاً صادقاً دائماً.',
  },
  {
    term: 'السلامة',
    en: 'Soundness',
    chapter: 8,
    category: 'متقدم',
    definition: 'خاصية ZKP: لا يمكن لمثبت كاذب إقناع المدقق ببيان كاذب.',
  },
  {
    term: 'بروتوكول سيجما',
    en: 'Sigma Protocol',
    chapter: 8,
    category: 'متقدم',
    definition:
      'بروتوكول ZKP ثلاثي: الالتزام (Commitment) ← التحدي (Challenge) ← الاستجابة (Response).',
  },
  {
    term: 'Fiat-Shamir',
    en: 'Fiat-Shamir Transform',
    chapter: 8,
    category: 'متقدم',
    definition:
      'يحول البروتوكول التفاعلي إلى غير تفاعلي باستبدال المدقق بدالة تجزئة.',
    formula: 'c = H(m, t)',
  },

  // ===== الفصل 9 =====
  {
    term: 'دورة حياة المفتاح',
    en: 'Key Lifecycle',
    chapter: 9,
    category: 'متقدم',
    definition:
      'التوليد → التوزيع → التخزين والاستخدام → التدوير → الإتلاف. مع تعليق وإبطال استثنائيين.',
  },
  {
    term: 'مفتاح الجذر',
    en: 'Root Key',
    chapter: 9,
    category: 'متقدم',
    definition:
      'قمة هرمية المفاتيح، يُحفظ داخل HSM ويُستخدم لتغليف مفاتيح التغليف فقط.',
  },
  {
    term: 'فصل المهام',
    en: 'Separation of Duties',
    chapter: 9,
    category: 'متقدم',
    definition: 'توزيع العمليات الحساسة على جهات مختلفة (طلب/موافقة/تنفيذ/تدقيق).',
  },
  {
    term: 'مقاومة العبث',
    en: 'Tamper Resistance',
    chapter: 9,
    category: 'متقدم',
    definition:
      'آليات تمنع الوصول الفيزيائي لـ HSM: مفاتيح الغطاء، شبكات استشعار، عزل الإيبوكسي.',
  },

  // ===== الفصل 10 =====
  {
    term: 'هجوم القناة الجانبية',
    en: 'Side-Channel Attack',
    chapter: 10,
    category: 'هجوم',
    definition:
      'يستغل تسرب المعلومات من التنفيذ الفيزيائي (طاقة، توقيت، إشعاع) بدلاً من كسر الرياضيات.',
  },
  {
    term: 'SPA',
    en: 'Simple Power Analysis',
    chapter: 10,
    category: 'هجوم',
    definition:
      'مراقبة استهلاك الطاقة مباشرة لكشف التفرعات الشرطية المرتبطة بالمفتاح.',
  },
  {
    term: 'DPA',
    en: 'Differential Power Analysis',
    chapter: 10,
    category: 'هجوم',
    definition:
      'جمع آلاف القياسات واستخدام الإحصاء لاستخراج المفتاح. يكسر حتى المقاومة السطحية.',
  },
  {
    term: 'حقن الأخطاء',
    en: 'Fault Attack',
    chapter: 10,
    category: 'هجوم',
    definition:
      'إحداث خلل (ليزر، تردد، حرارة) لاستخراج المفتاح من المخرجات المشوهة. مثال: كسر RSA-CRT.',
  },
  {
    term: 'التنفيذ ثابت الزمن',
    en: 'Constant-time Execution',
    chapter: 10,
    category: 'متقدم',
    definition: 'كتابة كود لا يعتمد مساره على القيم السرية، لمنع هجمات التوقيت.',
  },
  {
    term: 'الإخفاء',
    en: 'Masking',
    chapter: 10,
    category: 'متقدم',
    definition: 'إدخال إزاحات عشوائية في كل جولة تشفير لتعطيل تحليل الطاقة.',
  },

  // ===== الفصل 11 =====
  {
    term: 'خوارزمية شور',
    en: "Shor's Algorithm",
    chapter: 11,
    category: 'كمومي',
    definition:
      'خوارزمية كمومية تكسر RSA وECC في وقت متعدد الحدود عبر حل مسألة التحليل واللوغاريتم المنفصل.',
  },
  {
    term: 'خوارزمية جروف',
    en: "Grover's Algorithm",
    chapter: 11,
    category: 'كمومي',
    definition:
      'تسرع البحث في فضاء غير منظم بـ √N. تخفض أمان AES-128 إلى 64 بت فعلياً.',
  },
  {
    term: 'التشفير القائم على الشبكات',
    en: 'Lattice-based Cryptography',
    chapter: 11,
    category: 'كمومي',
    definition:
      'أمانه يعتمد على صعوبة إيجاد أقصر متجه في شبكة عالية الأبعاد. أساس ML-KEM وML-DSA.',
  },
  {
    term: 'KEM',
    en: 'Key Encapsulation Mechanism',
    chapter: 11,
    category: 'كمومي',
    definition:
      'آلية لتغليف مفتاح مشترك عبر قناة عامة. تتكون من: KeyGen, Encapsulate, Decapsulate.',
  },
  {
    term: 'التشفير الهجين',
    en: 'Hybrid Encryption',
    chapter: 11,
    category: 'كمومي',
    definition:
      'دمج خوارزمية كلاسيكية (ECC) مع كمومية (ML-KEM). يبقى الأمان ما دامت إحداهما آمنة.',
  },
  {
    term: 'سجل الآن وفك لاحقاً',
    en: 'Harvest Now, Decrypt Later',
    chapter: 11,
    category: 'كمومي',
    definition:
      'استراتيجية الخصم: اعتراض البيانات المشفرة اليوم وتخزينها لفكها عند توفر حاسوب كمومي.',
  },

  // ===== الفصل 12 =====
  {
    term: 'ML-KEM',
    en: 'Module-Lattice KEM',
    chapter: 12,
    category: 'كمومي',
    definition:
      'FIPS 203 (2024). آلية تغليف مفاتيح كمومية. ML-KEM-768 هو المستوى الموصى به لتطبيقات الإنترنت.',
    formula: 'FIPS 203 — Kyber (CRYSTALS)',
  },
  {
    term: 'ML-DSA',
    en: 'Module-Lattice Digital Signature',
    chapter: 12,
    category: 'كمومي',
    definition:
      'FIPS 204 (2024). توقيع رقمي كمومي. ML-DSA-65 يوازن بين الحجم والأداء.',
    formula: 'FIPS 204 — Dilithium (CRYSTALS)',
  },
  {
    term: 'SLH-DSA',
    en: 'Stateless Hash-based DSA',
    chapter: 12,
    category: 'كمومي',
    definition:
      'FIPS 205 (2024). توقيع كمومي قائم على التجزئة. مفتاح عام صغير لكن توقيع ضخم.',
  },
  {
    term: 'الرشاقة التشفيرية',
    en: 'Cryptographic Agility',
    chapter: 12,
    category: 'متقدم',
    definition:
      'قدرة النظام على تبديل الخوارزميات دون إعادة بناء. أساسية للانتقال إلى PQC.',
  },
];
