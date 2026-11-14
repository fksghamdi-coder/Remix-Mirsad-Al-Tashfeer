export interface KnowledgeNode {
  id: string;
  label: string;
  description: string;
  category: string;
  course: string;
  chapters: number[];
  connections: string[];
}

export const ALL_KNOWLEDGE_NODES: KnowledgeNode[] = [
  // Tashfeer (ISE243)
  { id: 'galois-fields', label: 'حقول جالوا', description: 'بنية جبرية تستخدم في حسابات AES وتتكون من مجموعة عناصر مع عمليتي الجمع والضرب.', category: 'تشفير', course: 'ise243', chapters: [1], connections: ['aes', 'finite-fields'] },
  { id: 'aes', label: 'AES (معيار التشفير المتقدم)', description: 'معيار تشفير متماثل يعتمد على شبكة SubBytes وShiftRows وMixColumns وAddRoundKey.', category: 'تشفير', course: 'ise243', chapters: [1], connections: ['galois-fields', 'shift-rows'] },
  { id: 'ecc', label: 'التشفير بالمنحنيات الإهليلجية', description: 'نظام تشفير يعتمد على البنية الجبرية للمنحنيات الإهليلجية فوق الحقول المنتهية.', category: 'تشفير', course: 'ise243', chapters: [2], connections: ['ecdh', 'ecdsa', 'galois-fields'] },
  { id: 'ecdh', label: 'ECDH (تبادل المفاتيح)', description: 'بروتوكول تبادل مفاتيح يستخدم المنحنيات الإهليلجية للوصول إلى سر مشترك.', category: 'تشفير', course: 'ise243', chapters: [3], connections: ['ecc', 'diffie-hellman'] },
  { id: 'ecdsa', label: 'ECDSA (التوقيع الرقمي)', description: 'خوارزمية توقيع رقمي تعتمد على المنحنيات الإهليلجية، مستخدمة في Bitcoin وTLS.', category: 'تشفير', course: 'ise243', chapters: [3], connections: ['ecc', 'pkcs'] },
  { id: 'diffie-hellman', label: 'Diffie-Hellman', description: 'بروتوكول تبادل مفاتيح سمح لأطراف غير متعاونة بإنشاء سر مشترك عبر قناة غير آمنة.', category: 'تشفير', course: 'ise243', chapters: [3], connections: ['ecdh', 'rsa'] },
  { id: 'rsa', label: 'RSA', description: 'خوارزمية تشفير غير متماثلة تعتمد على صعوبة تحليل الأعداد الكبيرة إلى عواملها الأولية.', category: 'تشفير', course: 'ise243', chapters: [1], connections: ['gcd', 'modular-inverse'] },
  { id: 'zkp', label: 'إثبات المعرفة الصفرية', description: 'بروتوكول يسمح للمثبت بإثبات معرفة سر دون كشفه للمدقق.', category: 'تشفير', course: 'ise243', chapters: [7], connections: ['schnorr', 'eligibility'] },
  { id: 'schnorr', label: 'بروتوكول شنور (Sigma)', description: 'بروتوكول إثبات معرفة ثلاثي الرسائل: التزام، تحدٍّ، استجابة.', category: 'تشفير', course: 'ise243', chapters: [7], connections: ['zkp', 'witness-extraction'] },
  { id: 'pqcrypto', label: 'التشفير المقاوم للكم', description: 'أجيال جديدة من خوارزميات التشفير مقاومة لهجمات الحواسيب الكمومية.', category: 'كمومي', course: 'ise243', chapters: [9, 10, 11], connections: ['ml-kem', 'ml-dsa', 'slh-dsa'] },
  { id: 'ml-kem', label: 'ML-KEM (CRYSTALS-Kyber)', description: 'معيار NIST FIPS 203 لتبادل المفاتيح المقاوم للكم بناءً على شبكات LWE.', category: 'كمومي', course: 'ise243', chapters: [9], connections: ['pqcrypto', 'lattice'] },
  { id: 'ml-dsa', label: 'ML-DSA (CRYSTALS-Dilithium)', description: 'معيار NIST FIPS 204 للتوقيع الرقمي المقاوم للكم.', category: 'كمومي', course: 'ise243', chapters: [10], connections: ['pqcrypto', 'lattice'] },
  { id: 'vpn', label: 'شبكات VPN', description: 'تقنيات إنشاء قنوات مشفرة عبر شبكات عامة مثل IPsec وWireGuard وOpenVPN.', category: 'شبكات', course: 'ise243', chapters: [5], connections: ['tls13', 'ipsec'] },
  { id: 'tls13', label: 'TLS 1.3', description: 'بروتوكول أمان طبقة النقل الإصدار الثالث، يستخدم ECDHE وتبادل مفاتيح هجين.', category: 'شبكات', course: 'ise243', chapters: [5], connections: ['vpn', 'ecdh', 'certificate'] },
  { id: 'pkcs', label: 'PKI (البنية التحتية للمفاتيح)', description: 'نظام إدارة المفاتيح العامة والشهادات الرقمية يشمل CAs وCertificates وCRLs.', category: 'شبكات', course: 'ise243', chapters: [4], connections: ['certificate', 'ecdsa', 'rsa'] },
  { id: 'side-channel', label: 'الهجمات الجانبية', description: 'هجمات تستغل التسريبات الفيزيائية (الاستهلاك، الزمن، الإشعاع) وليس الخوارزمية نفسها.', category: 'أمن', course: 'ise243', chapters: [8], connections: ['hsm', 'constant-time'] },
  { id: 'hsm', label: 'وحدة أمن الأجهزة (HSM)', description: 'جهاز مادي يولد ويخزن المفاتيح المشفرة في بيئة آمنة ومعزولة.', category: 'أمن', course: 'ise243', chapters: [8], connections: ['key-hierarchy', 'side-channel'] },

  // Security Management (ISE231)
  { id: 'nist-csf', label: 'إطار NIST CSF 2.0', description: 'إطار عمل وطني لأمن البرمجيات يتضمن الوظائف: Identify, Protect, Detect, Respond, Recover.', category: 'حوكمة', course: 'ise231', chapters: [3], connections: ['governance', 'risk'] },
  { id: 'governance', label: 'حوكمة الأمن السيبراني', description: 'النظام الإداري الذي يضمن توجيه الأنشطة الأمنية بشكل استراتيجي ومتماسك.', category: 'حوكمة', course: 'ise231', chapters: [1, 2], connections: ['nist-csf', 'iso27001'] },
  { id: 'iso27001', label: 'ISO/IEC 27001', description: 'معايير دولية لنظام إدارة أمن المعلومات (ISMS) تتطلب تدقيقاً دورياً.', category: 'حوكمة', course: 'ise231', chapters: [7], connections: ['nist-csf', 'compliance'] },
  { id: 'iam', label: 'إدارة الهوية والوصول (IAM)', description: 'إطار يعمل على ضمان وصول الأشخاص المناسبين للموارد المناسبة في الوقت المناسب.', category: 'أمن', course: 'ise231', chapters: [5], connections: ['mfa', 'zero-trust'] },
  { id: 'mfa', label: 'المصادقة متعددة العوامل', description: 'متطلب التحقق من هوية المستخدم عبر عاملين أو أكثر: شيء تعرفه، شيء تملكه، شيء تكونه.', category: 'أمن', course: 'ise231', chapters: [5], connections: ['iam', 'otp'] },
  { id: 'zero-trust', label: 'النموذج الصفري الثقة', description: 'نموذج أمني يفترض أن التهديد موجود داخل وخارج الشبكة، ويتطلب تحققاً مستمراً.', category: 'أمن', course: 'ise231', chapters: [6], connections: ['iam', 'network-security'] },

  // Threats (ISE232)
  { id: 'malware', label: 'البرمجيات الخبيثة', description: 'برامج مصممة لإلحاق الضرر بالأجهزة أو الشبكات أو البيانات دون إذن المالك.', category: 'تهديد', course: 'ise232-threats', chapters: [2], connections: ['ransomware', 'phishing'] },
  { id: 'ransomware', label: 'برمجيات الفدية', description: 'نوع من البرمجيات الخبيثة تقوم بتشفير ملفات الضحية وتتطلب فدية لاستعادتها.', category: 'تهديد', course: 'ise232-threats', chapters: [2], connections: ['malware', 'social-engineering'] },
  { id: 'phishing', label: 'التصيد الاحتيالي', description: 'هجوم هندسة اجتماعية يحاول خداع الضحية لكشف معلومات حساسة عبر رسائل مزيفة.', category: 'تهديد', course: 'ise232-threats', chapters: [3], connections: ['social-engineering', 'malware'] },
  { id: 'social-engineering', label: 'الهندسة الاجتماعية', description: 'تلاعب نفسي بشخص ما لدفعه لاتخاذ إجراء معين أو كشف معلومات سرية.', category: 'تهديد', course: 'ise232-threats', chapters: [3], connections: ['phishing', 'insider-threat'] },
  { id: 'ddos', label: 'هجوم حجب الخدمة MDDoS', description: 'إغراق الهدف بكميات ضخمة من الطلبات لجعله غير متاح للمستخدمين الشرعيين.', category: 'تهديد', course: 'ise232-threats', chapters: [4], connections: ['ids-ips', 'botnet'] },
  { id: 'iot-threats', label: 'تهديدات إنترنت الأشياء', description: 'ثغرات أمنية خاصة بالأجهزة الذكية المتصلة بالشبكة ذات قدرات معالجة محدودة.', category: 'تهديد', course: 'ise232-threats', chapters: [6], connections: ['physical-security', 'network-security'] },
  { id: 'ids-ips', label: 'أنظمة كشف ومنع التسلل', description: 'أجهزة أو برامج تراقب حركة الشبكة للكشف عن الأنشطة الضارة ومنعها.', category: 'أمن', course: 'ise232-threats', chapters: [7], connections: ['incident-response', 'threat-intelligence'] },
  { id: 'incident-response', label: 'الاستجابة للحوادث', description: 'العملية المنظمة للتعامل مع الانتهاكات الأمنية والحوادث السيبرانية.', category: 'أمن', course: 'ise232-threats', chapters: [8], connections: ['bccdrp', 'forensics'] },

  // Risk Analysis (UPMN075)
  { id: 'risk-assessment', label: 'تقييم المخاطر', description: 'عملية منهجية لتحديد وتحليل وتقييم المخاطر التي تهدد الأصول المعلوماتية.', category: 'مخاطر', course: 'ise232-risk', chapters: [3], connections: ['nist-800-30', 'iso27005'] },
  { id: 'fair', label: 'نموذج FAIR', description: 'Frame of Information Risk — نموذج كمي لتقييم المخاطر المالية باستخدام التحليل الإحصائي.', category: 'مخاطر', course: 'ise232-risk', chapters: [5], connections: ['risk-assessment', 'quantitative'] },
  { id: 'iso27005', label: 'ISO/IEC 27005', description: 'دليل إدارة مخاطر أمن المعلومات، مكمل لمعيار ISO 27001.', category: 'مخاطر', course: 'ise232-risk', chapters: [8], connections: ['risk-assessment', 'risk-treatment'] },
  { id: 'nca-ecc', label: 'ضوابط NCA ECC', description: 'الضوابط الأساسية للأمن السيبراني الصادرة عن الهيئة الوطنية للأمن السيبراني في السعودية.', category: 'حوكمة', course: 'ise232-programs', chapters: [1, 2], connections: ['risk-assessment', 'compliance'] },
];

export const KNOWLEDGE_NODES = ALL_KNOWLEDGE_NODES;

// Relationship graph for visualization
export const KNOWLEDGE_EDGES = ALL_KNOWLEDGE_NODES.flatMap(node =>
  node.connections.map(targetId => ({ source: node.id, target: targetId }))
);

export function getNodesByCourse(course: string): KnowledgeNode[] {
  return ALL_KNOWLEDGE_NODES.filter(n => n.course === course);
}

export function searchNodes(query: string): KnowledgeNode[] {
  const q = query.toLowerCase().trim();
  return ALL_KNOWLEDGE_NODES.filter(n =>
    n.label.includes(q) || n.description.includes(q) || n.id.includes(q)
  );
}

export function getRelatedNodes(nodeId: string): KnowledgeNode[] {
  const node = ALL_KNOWLEDGE_NODES.find(n => n.id === nodeId);
  if (!node) return [];
  return node.connections
    .map(cid => ALL_KNOWLEDGE_NODES.find(n => n.id === cid))
    .filter((n): n is KnowledgeNode => n !== undefined);
}
