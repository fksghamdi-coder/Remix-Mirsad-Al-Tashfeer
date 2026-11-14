# التحديث الهندسي الشامل وتدقيق البيانات والمختبرات لمشروع «مِرْصَاد التشفير»
**مادة: التشفير المتقدم (`ISE243`) · التخصص: دبلوم أمن المعلومات · طلاب شعبة (`002م`) · السنة الأكاديمية (`2026-2027`)**

---

## أولاً: نتيجة تدقيق بيانات ومعادلات «مختبر AES & GF(2^8)» ومطابقتها للفصل الأول من مقرر (`ISE243`)

عند مقارنة النصوص والمعادلات الموجودة في `src/components/lab/AESLab.tsx` مع **الفصل الأول من كتاب مقرر التشفير المتقدم (`ISE243`: حقول غالوا $GF(2^8)$ ومعيار التشفير المتقدم `AES`)** ومعيار `NIST FIPS 197`، تبيّن وجود **4 ملاحظات جوهرية (منها خطأ رياضي برمجي في مصفوفة `MixColumns`)** تم تصحيحها بالكامل في الكود الجديد:

| العنصر في `AESLab.tsx` | ما كان مكتوباً في الكود القديم | التصحيح العلمي الدقيق المطابق لمقرر `ISE243` ومعيار `FIPS 197` |
| :--- | :--- | :--- |
| **1. مصطلح `GF(2^8)` (السطر 263)** | `غلاف جالي GF(2⁸)` *(ترجمة آلية خاطئة لكلمة Galois Field)* | **«حقل غالوا المنتهي $GF(2^8)$ — كثير الحدود غير القابل للاختزال $P(x) = x^8 + x^4 + x^3 + x + 1 \text{ (0x11B)}$»** (مطابق للفقرة `1.3` في الفصل الأول من المقرر). |
| **2. تسمية حقل الإدخال (السطر 272)** | `النص المفترَض / النص المشفّر` | **«النص الصريح (Plaintext) / النص المشفر (Ciphertext) — 128 بت (16 بايت / 32 محرف Hex)»**، مع إضافة زر لتحميل **متجه الاختبار القياسي `NIST FIPS 197 Appendix B`** (`Plaintext: 3243F6A8885A308D313198A2E0370734`). |
| **3. معادلة `mixColumns` (الأسطر 86–89)** | `next[0][c] = s0 ^ xtime(s0 ^ s1) ^ gmul(2, s2) ^ gmul(3, s3);` *(خطأ رياضي يمنع فك التشفير من استرجاع النص الصريح!)* | تصحيح الضرب المصفوفي في $GF(2^8)$ ليطابق مصفوفة `FIPS 197` القياسية $\{02, 03, 01, 01\}$:<br>`next[0][c] = gmul(2, s0) ^ gmul(3, s1) ^ s2 ^ s3;`<br>`next[1][c] = s0 ^ gmul(2, s1) ^ gmul(3, s2) ^ s3;`<br>`next[2][c] = s0 ^ s1 ^ gmul(2, s2) ^ gmul(3, s3);`<br>`next[3][c] = gmul(3, s0) ^ s1 ^ s2 ^ gmul(2, s3);`<br>وبذلك أصبح التشفير وفك التشفير متطابقين 100% مع معيار `NIST`. |
| **4. بطاقات الخصائص والجولات (الأسطر 441–453)** | تذكر `AES-128` فقط وتسمي الجولات `الدورات` دون الإشارة لجدول مقارنة إصدارات `AES` في المقرر أو حذف `MixColumns` من الجولة الأخيرة. | تعديل المصطلح إلى **«الجولات (Rounds)»**، وتوضيح قاعدة الفصل الأول: **«الجولة 0: `AddRoundKey` مبدئي ← الجولات 1–9: `SubBytes → ShiftRows → MixColumns → AddRoundKey` ← الجولة 10 الأخيرة: بدون `MixColumns`»**، مع إضافة **جدول (1.2) من المقرر لمقارنة `AES-128` (`10` جولات) و`AES-192` (`12` جولة) و`AES-256` (`14` جولة)**، وإضافة **حاسبة حقل غالوا $GF(2^8)$ التفاعلية** في أعلى المختبر. |

---

## ثانياً: الأمر التنفيذي الشامل للنسخ واللصق المباشر في مساعد Google AI Studio

انسخ الأمر التالي بالكامل والصقه في نافذة المساعد داخل **Google AI Studio** لتنفيذ جميع الإصلاحات والتنقيات دفعةً واحدة:

```text
قم بتنفيذ التحديث الهندسي والتدقيقي الشامل التالي على كامل ملفات المنصة بدقة تامة دون اختصار:

أولاً — توحيد الهوية الأكاديمية للمشروع التدريبي وإزالة التاريخ (10-10-2026) وإزالة الصفة الرسمية/التسويقية:
1. اعتمد الهوية الأكاديمية الرسمية الموحدة التالية في جميع ملفات المنصة (`UnifiedDashboard.tsx`, `MainLayout.tsx`, `AcademicLayout.tsx`, `MainNav.tsx`, `AcademicNav.tsx`, `Team.tsx`, `Students.tsx`, `Sources.tsx`, `LegalContent.tsx`, `IllustrativeBanner.tsx`, `Saudi.tsx`, `Dashboard.tsx`, `CertificatePreview.tsx`, `Certificate.tsx`, `ise243.ts`, `introVideo.ts`, `Login.tsx`, `Welcome.tsx`, `index.html`, `metadata.json`):
   - اسم المشروع: `مشروع مِرْصَاد التشفير الأكاديمي التدريبي للعلوم التشفيرية والأمن السيبراني`
   - المادة: `التشفير المتقدم (ISE243)`
   - التخصص: `دبلوم أمن المعلومات`
   - الطلاب: `طلاب شعبة (002م)`
   - السنة الأكاديمية: `(2026-2027)`
   - الجامعة: `جامعة الأمير مقرن بن عبدالعزيز`
   - طبيعة المشروع: `مشروع أكاديمي تعليمي وتدريبي حقيقي موثق بالمصادر الرسمية والأكاديمية المعتمدة (وليس منصة حكومية أو تجارية رسمية)`.
2. احذف نهائياً أي ذكر لتاريخ `10-10-2026` من جميع نصوص وشارات وتذييلات المنصة، واحذف أي ذكر للنطاقات التسويقية الوهمية (`mirsad.sa` و `academy.mirsad.sa` و `الموقع التسويقي`).
3. أبقِ على أداة مواقيت الصلاة (`PrayerTimesWidget`) والتاريخ (`DateDisplay`) في الشريط العلوي كما هي.

ثانياً — إصلاح وتدقيق «مختبر AES & GF(2^8)» (`src/components/lab/AESLab.tsx`) ليطابق الفصل الأول من مقرر (ISE243) ومعيار (NIST FIPS 197):
1. صحح مصطلح «غلاف جالي» إلى المصطلح العلمي المعتمد في المقرر: `حقل غالوا المنتهي GF(2^8) — كثير الحدود غير القابل للاختزال P(x) = x^8 + x^4 + x^3 + x + 1 (0x11B)`، وصحح «النص المفترَض» إلى `النص الصريح (Plaintext) / النص المشفر (Ciphertext)`، وصحح «الدورات» إلى `الجولات (Rounds)`.
2. أصلح الخطأ الرياضي في دالة `mixColumns` (الأسطر 86–89) لتستخدم مصفوفة `FIPS 197` الصحيحة في $GF(2^8)$:
   - `next[0][c] = gmul(2, s0) ^ gmul(3, s1) ^ s2 ^ s3;`
   - `next[1][c] = s0 ^ gmul(2, s1) ^ gmul(3, s2) ^ s3;`
   - `next[2][c] = s0 ^ s1 ^ gmul(2, s2) ^ gmul(3, s3);`
   - `next[3][c] = gmul(3, s0) ^ s1 ^ s2 ^ gmul(2, s3);`
   بحيث يتطابق تشفير وفك تشفير متجه الاختبار القياسي `NIST FIPS 197 Appendix B` (`Plaintext: 3243F6A8885A308D313198A2E0370734`, `Key: 2B7E151628AED2A6ABF7158809CF4F3C` <-> `Ciphertext: 3925841D02DC09FBDC118597196A0B32`) بنسبة 100%.
3. احفظ في `setRoundStates` مصفوفات الحالة الـ 11 (`الجولة 0: بعد AddRoundKey المبدئي` حتى `الجولة 10: المخرج النهائي بدون MixColumns`) لكلٍّ من وضع التشفير ووضع فك التشفير، واضبط أزرار التنقل لعرض جميع الجولات من `0` إلى `10`.
4. أضف في أعلى `AESLab.tsx` «مختبر عمليات حقل غالوا GF(2^8) التفاعلي (الفصل الأول — ISE243)» ليتمكن الطالب من إدخال بايتين بالست عشري (`Hex A` و `Hex B`) وحساب:
   - الجمع والطرح في $GF(2^8)$ عبر عملية `XOR` (`A ⊕ B`).
   - عملية `xtime(A)` والضرب الجبري `gmul(A, B) mod 0x11B`.
   - قيمة استبدال `S-Box(A)` و`InvS-Box(A)` وتمثيل كثيرات الحدود، مع جدول مقارنة إصدارات `AES-128 / AES-192 / AES-256` من الفصل الأول للمقرر.

ثالثاً — إصلاح المعادلة الرياضية في «مختبر المعرفة الصفرية ZKP» (`src/pages/main/ZKPLab.tsx` و `src/pages/academic/ZKPLab.tsx`):
1. في التبويب الأول (`interactive_zkp`) داخل `src/pages/main/ZKPLab.tsx`، احذف المعادلة الوهمية القديمة (`const comm = (secret * r) % 997` و `const isValid = (commitment + challenge) % 2 === 0 || secret > 0`) واستبدلها بمعادلة بروتوكول شنور التفاعلي الحقيقية (الفصل 8 من مقرر ISE243) على المجموعة الدورية ($p = 23, q = 11, g = 2$):
   - المفتاح العام للمثبت: $y = g^{\text{secret}} \bmod p$
   - الخطوة 1 (الالتزام Commitment): اختيار $r \in \{1..10\}$ وحساب $t = g^r \bmod 23$
   - الخطوة 2 (التحدي Challenge): اختيار $c \in \{1..10\}$ من المدقق
   - الخطوة 3 (الاستجابة Response): حساب $s = (r + \text{secret} \cdot c) \bmod 11$
   - الخطوة 4 (التحقق الرياضي الصارم Verification): التحقق الفعلي من تطابق الطرف الأيسر $g^s \bmod 23$ مع الطرف الأيمن $(t \cdot y^c) \bmod 23$ وعرض القيمتين للطالب.
2. اجعل ملف `src/pages/academic/ZKPLab.tsx` يعيد تصدير `ZKPLab` الموحد من `@/pages/main/ZKPLab` لمنع أي تضارب بين النسختين.

رابعاً — إصلاح «الشرح التفاعلي والكتاب 3D» بحسب المقررات (`InteractiveLessonViewer.tsx` و `LiveBookPage.tsx`):
1. في `src/components/interactive/InteractiveLessonViewer.tsx`:
   - عدّل `buildChapterVideoScenes` و `buildLabForChapter` و `handleRunLiveCodeTest` لتقرأ موضوع ورقم كل فصل فعلياً داخل المقرر المختار (ففي `ISE243`: الفصل 1 يعرض `GF(2^8) & AES`، والفصل 2–3 يعرضان `ECC & ECDH/ECDSA`، والفصل 4 يعرض `PKI & TLS 1.3`، والفصل 5 يعرض `VPN IPsec & WireGuard`، والفصل 6 يعرض `Database Encryption TDE & AES-XTS`، والفصل 7 يعرض `Paillier Homomorphic Encryption`، والفصل 8 يعرض `Schnorr ZKP`، والفصل 9–10 يعرضان `HSM & Side-Channel Constant-Time`، والفصل 11–12 يعرضان `Post-Quantum ML-KEM FIPS 203 & ML-DSA FIPS 204`).
   - أضف في شريط المقررات العلوي وفي الشريط السفلي تحت المشغل زراً مباشراً لفتح «الكتاب التفاعلي 3D الكامل لهذا الفصل» (`/academic/${currentCourse.slug}/chapters/${currentChapter.id}`) وزراً لفتح «كتاب اللغة الإنجليزية التفاعلي 3D (ENG 101–301)» (`/academic/english`).
2. في `src/pages/academic/LiveBookPage.tsx`: اربط الصفحة مباشرةً بمكون الكتاب التفاعلي ثلاثي الأبعاد الحقيقي (`InteractiveTextbook`) بدلاً من `LiveBookComponent` القديم الذي كان يستدعي API خارجياً غير موجود.

خامساً — حذف الأرقام غير الموثقة في `Dashboard.tsx` و `saudiCyber.ts` و `Glass3DChart.tsx` وتنقية بطاقات الطلاب وإزالة بقايا الصوت بالكامل:
1. في `src/data/saudiCyber.ts` و `src/pages/main/Dashboard.tsx` و `src/components/ui/Glass3DChart.tsx`:
   - احذف الأرقام السوقية والتوقعات المختلقة غير الموثقة (`15.2B`, `32.8B`, `97,500 ثغرة`, `71 مؤسسة +1320%`) واستبدلها حصرياً بالبيانات الحقيقية الموثقة بالمصادر في `catalog.ts`:
     * المؤشر العالمي للأمن السيبراني (`ITU GCI 2024`): تحقيق المملكة `100 / 100` (الفئة الأولى `Tier 1`، `20 / 20` في جميع الركائز الخمس).
     * الضوابط الأساسية للأمن السيبراني (`NCA ECC-2:2024`): `108` ضوابط أساسية موزعة على `5` مكونات رئيسية و`29` مكوناً فرعياً (بعد تحديثها من `114` ضابطاً في `ECC-1:2018`).
     * المعايير الوطنية للتشفير (`NCA NCS-1:2020`): مستويان للأمان (`MODERATE` و `ADVANCED`).
     * معايير التشفير ما بعد الكم (`NIST FIPS 203 / 204 / 205`): الأحجام الحقيقية بالبايت للمفاتيح والنصوص المشفرة والتواقيع (`X25519: 32B` مقابل `ML-KEM-768: 1184B`، و`Ed25519: 64B` مقابل `ML-DSA-65: 3309B` و`SLH-DSA-128s: 7856B`).
2. في `src/data/students.ts` و `src/pages/main/Team.tsx` و `src/pages/academic/Students.tsx`:
   - استبدل الرسائل العاطفية/الأدبية المطولة بتوصيف أكاديمي رسمي رصين لكل طالب من طلاب شعبة (`002م`) — تخصص دبلوم أمن المعلومات — السنة (`2026-2027`) يوضح دوره الهندسي والفصول الخوارزمية المسندة إليه في مقرر التشفير المتقدم (`ISE243`)، واجعل عدد الفصول في `Students.tsx` يُقرأ ديناميكياً من `COURSES`.
3. في `src/pages/Login.tsx` (السطر 71): احذف النص العشوائي `'/* ها هنا نقوم بجلب الهاش المخزن للمستخدم */'` وتحقق من `matched?.passwordHash` بشكل صحيح.
4. إزالة بقايا النظام الصوتي 100%:
   - احذف دالة `playClickSound()` واستدعاء `AudioContext` من `src/pages/Certificate.tsx`.
   - أفرغ دالة `speakCyberTerm` في `src/data/courses/eng-cyber/chapters.ts` من أي استدعاء لـ `window.speechSynthesis`.
   - غيّر عبارة «المحاضرة المرئية والصوتية» في `VideoPlayer.tsx` إلى «العرض المرئي التفاعلي للفصل»، و«جولة بصرية وصوتية» في `UnifiedDashboard.tsx` إلى «جولة بصرية تفاعلية».
```

---

## ثالثاً: الأكواد البرمجية الكاملة للملفات الأساسية بعد التدقيق والتصحيح

### 1. الكود المصحح بالكامل لملف `src/components/lab/AESLab.tsx` (مختبر حقل غالوا $GF(2^8)$ ومعيار `AES-128` وفق `FIPS 197` والفصل الأول من `ISE243`)

```tsx
// File: src/components/lab/AESLab.tsx
// مختبر حقل غالوا GF(2^8) ومعيار التشفير المتقدم AES-128 (مطابق للفصل الأول من مقرر ISE243 ومعيار NIST FIPS 197)
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Unlock,
  Key,
  RotateCcw,
  Play,
  ChevronLeft,
  ChevronRight,
  Cpu,
  BookOpen,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── جدول استبدال البايتات القياسي AES S-Box (NIST FIPS 197) ───
const SBOX = [
  0x63,0x7c,0x77,0x7b,0xf2,0x6b,0x6f,0xc5,0x30,0x01,0x67,0x2b,0xfe,0xd7,0xab,0x76,
  0xca,0x82,0xc9,0x7d,0xfa,0x59,0x47,0xf0,0xad,0xd4,0xa2,0xaf,0x9c,0xa4,0x72,0xc0,
  0xb7,0xfd,0x93,0x26,0x36,0x3f,0xf7,0xcc,0x34,0xa5,0xe5,0xf1,0x71,0xd8,0x31,0x15,
  0x04,0xc7,0x23,0xc3,0x18,0x96,0x05,0x9a,0x07,0x12,0x80,0xe2,0xeb,0x27,0xb2,0x75,
  0x09,0x83,0x2c,0x1a,0x1b,0x6e,0x5a,0xa0,0x52,0x3b,0xd6,0xb3,0x29,0xe3,0x2f,0x84,
  0x53,0xd1,0x00,0xed,0x20,0xfc,0xb1,0x5b,0x6a,0xcb,0xbe,0x39,0x4a,0x4c,0x58,0xcf,
  0xd0,0xef,0xaa,0xfb,0x43,0x4d,0x33,0x85,0x45,0xf9,0x02,0x7f,0x50,0x3c,0x9f,0xa8,
  0x51,0xa3,0x40,0x8f,0x92,0x9d,0x38,0xf5,0xbc,0xb6,0xda,0x21,0x10,0xff,0xf3,0xd2,
  0xcd,0x0c,0x13,0xec,0x5f,0x97,0x44,0x17,0xc4,0xa7,0x7e,0x3d,0x64,0x5d,0x19,0x73,
  0x60,0x81,0x4f,0xdc,0x22,0x2a,0x90,0x88,0x46,0xee,0xb8,0x14,0xde,0x5e,0x0b,0xdb,
  0xe0,0x32,0x3a,0x0a,0x49,0x06,0x24,0x5c,0xc2,0xd3,0xac,0x62,0x91,0x95,0xe4,0x79,
  0xe7,0xc8,0x37,0x6d,0x8d,0xd5,0x4e,0xa9,0x6c,0x56,0xf4,0xea,0x65,0x7a,0xae,0x08,
  0xba,0x78,0x25,0x2e,0x1c,0xa6,0xb4,0xc6,0xe8,0xdd,0x74,0x1f,0x4b,0xbd,0x8b,0x8a,
  0x70,0x3e,0xb5,0x66,0x48,0x03,0xf6,0x0e,0x61,0x35,0x57,0xb9,0x86,0xc1,0x1d,0x9e,
  0xe1,0xf8,0x98,0x11,0x69,0xd9,0x8e,0x94,0x9b,0x1e,0x87,0xe9,0xce,0x55,0x28,0xdf,
  0x8c,0xa1,0x89,0x0d,0xbf,0xe6,0x42,0x68,0x41,0x99,0x2d,0x0f,0xb0,0x54,0xbb,0x16,
];

const INV_SBOX = [
  0x52,0x09,0x6a,0xd5,0x30,0x36,0xa5,0x38,0xbf,0x40,0xa3,0x9e,0x81,0xf3,0xd7,0xfb,
  0x7c,0xe3,0x39,0x82,0x9b,0x2f,0xff,0x87,0x34,0x8e,0x43,0x44,0xc4,0xde,0xe9,0xcb,
  0x54,0x7b,0x94,0x32,0xa6,0xc2,0x23,0x3d,0xee,0x4c,0x95,0x0b,0x42,0xfa,0xc3,0x4e,
  0x08,0x2e,0xa1,0x66,0x28,0xd9,0x24,0xb2,0x76,0x5b,0xa2,0x49,0x6d,0x8b,0xd1,0x25,
  0x72,0xf8,0xf6,0x64,0x86,0x68,0x98,0x16,0xd4,0xa4,0x5c,0xcc,0x5d,0x65,0xb6,0x92,
  0x6c,0x70,0x48,0x50,0xfd,0xed,0xb9,0xda,0x5e,0x15,0x46,0x57,0xa7,0x8d,0x9d,0x84,
  0x90,0xd8,0xab,0x00,0x8c,0xbc,0xd3,0x0a,0xf7,0xe4,0x58,0x05,0xb8,0xb3,0x45,0x06,
  0xd0,0x2c,0x1e,0x8f,0xca,0x3f,0x0f,0x02,0xc1,0xaf,0xbd,0x03,0x01,0x13,0x8a,0x6b,
  0x3a,0x91,0x11,0x41,0x4f,0x67,0xdc,0xea,0x97,0xf2,0xcf,0xce,0xf0,0xb4,0xe6,0x73,
  0x96,0xac,0x74,0x22,0xe7,0xad,0x35,0x85,0xe2,0xf9,0x37,0xe8,0x1c,0x75,0xdf,0x6e,
  0x47,0xf1,0x1a,0x71,0x1d,0x29,0xc5,0x89,0x6f,0xb7,0x62,0x0e,0xaa,0x18,0xbe,0x1b,
  0xfc,0x56,0x3e,0x4b,0xc6,0xd2,0x79,0x20,0x9a,0xdb,0xc0,0xfe,0x78,0xcd,0x5a,0xf4,
  0x1f,0xdd,0xa8,0x33,0x88,0x07,0xc7,0x31,0xb1,0x12,0x10,0x59,0x27,0x80,0xec,0x5f,
  0x60,0x51,0x7f,0xa9,0x19,0xb5,0x4a,0x0d,0x2d,0xe5,0x7a,0x9f,0x93,0xc9,0x9c,0xef,
  0xa0,0xe0,0x3b,0x4d,0xae,0x2a,0xf5,0xb0,0xc8,0xeb,0xbb,0x3c,0x83,0x53,0x99,0x61,
  0x17,0x2b,0x04,0x7e,0xba,0x77,0xd6,0x26,0xe1,0x69,0x14,0x63,0x55,0x21,0x0c,0x7d,
];

// ─── الحساب الجبري في حقل غالوا GF(2^8) بمعامل الاختزال P(x) = x^8 + x^4 + x^3 + x + 1 (0x11B) ───
function xtime(a: number): number {
  return ((a << 1) ^ (a & 0x80 ? 0x1b : 0x00)) & 0xff;
}

function gmul(a: number, b: number): number {
  let p = 0;
  let aa = a & 0xff;
  let bb = b & 0xff;
  for (let i = 0; i < 8; i++) {
    if (bb & 1) p ^= aa;
    const hi = aa & 0x80;
    aa = (aa << 1) & 0xff;
    if (hi) aa ^= 0x1b;
    bb >>= 1;
  }
  return p & 0xff;
}

function byteToPolynomial(b: number): string {
  const val = b & 0xff;
  if (val === 0) return '0';
  const terms: string[] = [];
  for (let i = 7; i >= 0; i--) {
    if ((val >> i) & 1) {
      if (i === 0) terms.push('1');
      else if (i === 1) terms.push('x');
      else terms.push(`x^${i}`);
    }
  }
  return terms.join(' + ');
}

function subBytes(state: number[][]): number[][] {
  return state.map((row) => row.map((b) => SBOX[b & 0xff]));
}

function invSubBytes(state: number[][]): number[][] {
  return state.map((row) => row.map((b) => INV_SBOX[b & 0xff]));
}

function shiftRows(state: number[][]): number[][] {
  return state.map((row, i) => [...row.slice(i), ...row.slice(0, i)]);
}

function invShiftRows(state: number[][]): number[][] {
  return state.map((row, i) => [...row.slice((4 - i) % 4), ...row.slice(0, (4 - i) % 4)]);
}

// مصفوفة MixColumns القياسية في NIST FIPS 197 داخل حقل غالوا GF(2^8)
function mixColumns(state: number[][]): number[][] {
  const next: number[][] = Array.from({ length: 4 }, () => Array(4).fill(0));
  for (let c = 0; c < 4; c++) {
    const s0 = state[0][c];
    const s1 = state[1][c];
    const s2 = state[2][c];
    const s3 = state[3][c];
    next[0][c] = gmul(2, s0) ^ gmul(3, s1) ^ s2 ^ s3;
    next[1][c] = s0 ^ gmul(2, s1) ^ gmul(3, s2) ^ s3;
    next[2][c] = s0 ^ s1 ^ gmul(2, s2) ^ gmul(3, s3);
    next[3][c] = gmul(3, s0) ^ s1 ^ s2 ^ gmul(2, s3);
  }
  return next;
}

function invMixColumns(state: number[][]): number[][] {
  const next: number[][] = Array.from({ length: 4 }, () => Array(4).fill(0));
  for (let c = 0; c < 4; c++) {
    const s0 = state[0][c];
    const s1 = state[1][c];
    const s2 = state[2][c];
    const s3 = state[3][c];
    next[0][c] = gmul(14, s0) ^ gmul(11, s1) ^ gmul(13, s2) ^ gmul(9, s3);
    next[1][c] = gmul(9, s0) ^ gmul(14, s1) ^ gmul(11, s2) ^ gmul(13, s3);
    next[2][c] = gmul(13, s0) ^ gmul(9, s1) ^ gmul(14, s2) ^ gmul(11, s3);
    next[3][c] = gmul(11, s0) ^ gmul(13, s1) ^ gmul(9, s2) ^ gmul(14, s3);
  }
  return next;
}

function addRoundKey(state: number[][], roundKey: number[][]): number[][] {
  return state.map((row, i) => row.map((b, j) => (b ^ roundKey[j][i]) & 0xff));
}

function bytesToState(bytes: number[]): number[][] {
  const s: number[][] = Array.from({ length: 4 }, () => Array(4).fill(0));
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 4; r++) {
      s[r][c] = (bytes[c * 4 + r] ?? 0) & 0xff;
    }
  }
  return s;
}

function stateToBytes(state: number[][]): number[] {
  const bytes: number[] = [];
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 4; r++) {
      bytes.push(state[r][c] & 0xff);
    }
  }
  return bytes;
}

function hexByte(b: number): string {
  return (b & 0xff).toString(16).toUpperCase().padStart(2, '0');
}

function hexArr(arr: number[]): string {
  return arr.map(hexByte).join(' ');
}

function hexStr(str: string): number[] {
  const clean = str.replace(/\s+/g, '');
  if (/^[0-9A-Fa-f]+$/.test(clean) && clean.length >= 2) {
    const padded = clean.length % 2 === 1 ? clean + '0' : clean;
    return padded.match(/.{2}/g)?.map((b) => parseInt(b, 16) & 0xff) ?? [];
  }
  return Array.from(new TextEncoder().encode(str));
}

function keyExpansion(keyBytes: number[]): number[][][] {
  const key =
    keyBytes.length < 16
      ? [...keyBytes, ...Array(16 - keyBytes.length).fill(0)]
      : keyBytes.slice(0, 16);
  const w: number[][] = Array.from({ length: 44 }, () => Array(4).fill(0));
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) w[i][j] = key[i * 4 + j] & 0xff;
  }
  const Rcon = [0, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];
  for (let i = 4; i < 44; i++) {
    const temp = [...w[i - 1]];
    if (i % 4 === 0) {
      const t = temp.shift()!;
      temp.push(t);
      temp[0] = SBOX[temp[0] & 0xff];
      temp[1] = SBOX[temp[1] & 0xff];
      temp[2] = SBOX[temp[2] & 0xff];
      temp[3] = SBOX[temp[3] & 0xff];
      temp[0] ^= Rcon[i / 4];
    }
    for (let j = 0; j < 4; j++) w[i][j] = (w[i - 4][j] ^ temp[j]) & 0xff;
  }
  const rounds: number[][][] = [];
  for (let r = 0; r <= 10; r++) {
    const rk: number[][] = Array.from({ length: 4 }, (_, c) => [
      w[r * 4 + c][0],
      w[r * 4 + c][1],
      w[r * 4 + c][2],
      w[r * 4 + c][3],
    ]);
    rounds.push(rk);
  }
  return rounds;
}

export default function AESLab() {
  // 1) حالة حاسبة حقل غالوا GF(2^8) التفاعلية (الفصل الأول — ISE243)
  const [gfHexA, setGfHexA] = useState<string>('57');
  const [gfHexB, setGfHexB] = useState<string>('83');

  // 2) حالة مختبر تشفير وفك تشفير AES-128 (متجه اختبار NIST FIPS 197 Appendix B القياسي)
  const [inputText, setInputText] = useState('3243F6A8885A308D313198A2E0370734');
  const [keyHex, setKeyHex] = useState('2B7E151628AED2A6ABF7158809CF4F3C');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [result, setResult] = useState<string>('');
  const [showDetails, setShowDetails] = useState(false);
  const [roundStates, setRoundStates] = useState<{ label: string; matrix: number[][] }[]>([]);
  const [currentRound, setCurrentRound] = useState(0);

  // حسابات حقل غالوا GF(2^8) الحية
  const gfCalculations = useMemo(() => {
    const a = parseInt(gfHexA || '0', 16) & 0xff;
    const b = parseInt(gfHexB || '0', 16) & 0xff;
    const xorSum = (a ^ b) & 0xff;
    const xtimeA = xtime(a);
    const product = gmul(a, b);
    const sboxA = SBOX[a];
    return {
      a,
      b,
      xorSum,
      xtimeA,
      product,
      sboxA,
      polyA: byteToPolynomial(a),
      polyB: byteToPolynomial(b),
      polyXor: byteToPolynomial(xorSum),
      polyProduct: byteToPolynomial(product),
    };
  }, [gfHexA, gfHexB]);

  const run = () => {
    const key = hexStr(keyHex);
    let input = hexStr(inputText);
    if (input.length !== 16) {
      input =
        input.length < 16
          ? [...input, ...Array(16 - input.length).fill(0)]
          : input.slice(0, 16);
    }

    const rounds = keyExpansion(key);

    if (mode === 'encrypt') {
      let state = bytesToState(input);
      const tracked: { label: string; matrix: number[][] }[] = [];

      // الجولة 0: AddRoundKey المبدئي
      state = addRoundKey(state, rounds[0]);
      tracked.push({ label: 'الجولة 0 (AddRoundKey المبدئي)', matrix: state.map((r) => [...r]) });

      // الجولات 1 إلى 9 (SubBytes -> ShiftRows -> MixColumns -> AddRoundKey)
      for (let r = 1; r <= 9; r++) {
        state = subBytes(state);
        state = shiftRows(state);
        state = mixColumns(state);
        state = addRoundKey(state, rounds[r]);
        tracked.push({ label: `الجولة ${r} (مع MixColumns)`, matrix: state.map((row) => [...row]) });
      }

      // الجولة 10 الأخيرة (بدون MixColumns وفق معيار FIPS 197 والفصل الأول من المقرر)
      state = subBytes(state);
      state = shiftRows(state);
      state = addRoundKey(state, rounds[10]);
      tracked.push({
        label: 'الجولة 10 النهائية (بدون MixColumns)',
        matrix: state.map((row) => [...row]),
      });

      setResult(hexArr(stateToBytes(state)));
      setRoundStates(tracked);
    } else {
      let dState = bytesToState(input);
      const trackedDec: { label: string; matrix: number[][] }[] = [];

      dState = addRoundKey(dState, rounds[10]);
      trackedDec.push({
        label: 'بداية فك التشفير (AddRoundKey K10)',
        matrix: dState.map((row) => [...row]),
      });

      for (let r = 9; r >= 1; r--) {
        dState = invShiftRows(dState);
        dState = invSubBytes(dState);
        dState = addRoundKey(dState, rounds[r]);
        dState = invMixColumns(dState);
        trackedDec.push({
          label: `جولة فك التشفير العكسية ${10 - r}`,
          matrix: dState.map((row) => [...row]),
        });
      }

      dState = invShiftRows(dState);
      dState = invSubBytes(dState);
      dState = addRoundKey(dState, rounds[0]);
      trackedDec.push({
        label: 'الجولة العكسية 10 (النص الصريح المسترجع)',
        matrix: dState.map((row) => [...row]),
      });

      setResult(hexArr(stateToBytes(dState)));
      setRoundStates(trackedDec);
    }

    setCurrentRound(0);
    setShowDetails(true);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-6 px-4" dir="rtl">
      {/* Header المربوط بالفصل الأول من مقرر التشفير المتقدم ISE243 */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 rounded-3xl border border-emerald-500/30 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-13 h-13 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
            <Lock className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold text-emerald-300 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>مقرر التشفير المتقدم (ISE243 — الفصل الأول) · دبلوم أمن المعلومات · شعبة (002م)</span>
            </div>
            <h1 className="text-2xl font-black text-white">
              مختبر حقل غالوا GF(2⁸) ومعيار التشفير المتقدم AES
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              المعيار القياسي NIST FIPS 197 — 10 جولات تشفير في AES-128 • حقل غالوا المنتهي GF(2⁸) بمعامل الاختزال P(x) = x⁸ + x⁴ + x³ + x + 1 (0x11B)
            </p>
          </div>
        </div>

        <Link
          to="/academic/ise243/chapters/1"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all"
        >
          <BookOpen className="w-4 h-4" />
          <span>فتح الفصل الأول (GF(2⁸) &amp; AES) في الكتاب التفاعلي 3D</span>
        </Link>
      </motion.header>

      {/* القسم الأول: حاسبة ومختبر حقل غالوا GF(2^8) التفاعلي (الفصل 1.3 من المقرر) */}
      <section className="glass-panel p-6 rounded-3xl border border-cyan-500/30 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base sm:text-lg font-black text-white">
              أولاً: مختبر الحساب الجبري في حقل غالوا GF(2⁸) (الجمع XOR والضرب بمعامل الاختزال 0x11B)
            </h2>
          </div>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-950/50 border border-cyan-500/30 px-2.5 py-1 rounded-lg" dir="ltr">
            P(x) = x^8 + x^4 + x^3 + x + 1 (0x11B)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <label className="text-xs font-bold text-cyan-300 block">
              العنصر الأول A في حقل GF(2⁸) (بايت Hex من 00 إلى FF):
            </label>
            <input
              type="text"
              dir="ltr"
              maxLength={2}
              value={gfHexA}
              onChange={(e) => setGfHexA(e.target.value.replace(/[^0-9a-fA-F]/g, '').toUpperCase())}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm font-mono text-white focus:border-cyan-400 focus:outline-none"
            />
            <div className="text-[11px] text-slate-400 font-mono" dir="ltr">
              Bin: {gfCalculations.a.toString(2).padStart(8, '0')} | Poly: {gfCalculations.polyA}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <label className="text-xs font-bold text-emerald-300 block">
              العنصر الثاني B في حقل GF(2⁸) (بايت Hex من 00 إلى FF):
            </label>
            <input
              type="text"
              dir="ltr"
              maxLength={2}
              value={gfHexB}
              onChange={(e) => setGfHexB(e.target.value.replace(/[^0-9a-fA-F]/g, '').toUpperCase())}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-sm font-mono text-white focus:border-emerald-400 focus:outline-none"
            />
            <div className="text-[11px] text-slate-400 font-mono" dir="ltr">
              Bin: {gfCalculations.b.toString(2).padStart(8, '0')} | Poly: {gfCalculations.polyB}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-slate-900/95 border border-emerald-500/30">
            <div className="text-[11px] text-slate-400 font-bold">1. الجمع/الطرح في GF(2⁸) (A ⊕ B)</div>
            <div className="text-lg font-black text-emerald-400 font-mono mt-1" dir="ltr">
              0x{hexByte(gfCalculations.xorSum)}
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate" dir="ltr">
              {gfCalculations.polyXor}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/95 border border-cyan-500/30">
            <div className="text-[11px] text-slate-400 font-bold">2. الضرب بـ x: xtime(A) mod 0x11B</div>
            <div className="text-lg font-black text-cyan-300 font-mono mt-1" dir="ltr">
              0x{hexByte(gfCalculations.xtimeA)}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              إزاحة لليسار مع XOR 0x1B إذا كان البت السابع = 1
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/95 border border-amber-500/30">
            <div className="text-[11px] text-slate-400 font-bold">3. الضرب الجبري (A ⊗ B mod 0x11B)</div>
            <div className="text-lg font-black text-amber-300 font-mono mt-1" dir="ltr">
              0x{hexByte(gfCalculations.product)}
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate" dir="ltr">
              {gfCalculations.polyProduct}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/95 border border-purple-500/30">
            <div className="text-[11px] text-slate-400 font-bold">4. استبدال SubBytes: S-Box(A)</div>
            <div className="text-lg font-black text-purple-300 font-mono mt-1" dir="ltr">
              0x{hexByte(gfCalculations.sboxA)}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              المعكوس الضربي A⁻¹ في GF(2⁸) + تحويل تآلفي
            </div>
          </div>
        </div>
      </section>

      {/* القسم الثاني: محاكي تشفير وفك تشفير الكتلة القياسي AES-128 (NIST FIPS 197) */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-400" />
            <span>ثانياً: محاكي مصفوفة الحالة وجولات التشفير وفك التشفير في AES-128 (4×4 بايتات)</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setMode('encrypt');
                setInputText('3243F6A8885A308D313198A2E0370734');
                setKeyHex('2B7E151628AED2A6ABF7158809CF4F3C');
              }}
              className="px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition"
            >
              تحميل متجه التشفير القياسي (NIST FIPS 197 Appendix B)
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('decrypt');
                setInputText('3925841D02DC09FBDC118597196A0B32');
                setKeyHex('2B7E151628AED2A6ABF7158809CF4F3C');
              }}
              className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold transition"
            >
              تحميل متجه فك التشفير القياسي (Ciphertext ➔ Plaintext)
            </button>
          </div>
        </div>

        {/* Input Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20">
            <label className="text-xs font-bold text-emerald-400 mb-2 block flex items-center gap-2">
              <Key className="w-3.5 h-3.5" />
              <span>
                {mode === 'encrypt'
                  ? 'النص الصريح (Plaintext — 128 بت / 32 محرف Hex أو نص عادي)'
                  : 'النص المشفر (Ciphertext — 128 بت / 32 محرف Hex)'}
              </span>
            </label>
            <input
              type="text"
              dir="ltr"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              maxLength={48}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm font-mono text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
              placeholder="3243F6A8885A308D313198A2E0370734"
            />
            <p className="text-[11px] text-slate-400 mt-1.5">
              أدخل كود ست عشري (32 محرف Hex = 16 بايت) أو نصاً عادياً ليتم تحويله تلقائياً إلى مصفوفة حالة 4×4.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20">
            <label className="text-xs font-bold text-emerald-400 mb-2 block flex items-center gap-2">
              <Key className="w-3.5 h-3.5" /> مفتاح التشفير AES-128 (128 بت / 32 محرف Hex)
            </label>
            <input
              type="text"
              dir="ltr"
              value={keyHex}
              onChange={(e) => setKeyHex(e.target.value.toUpperCase())}
              maxLength={32}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm font-mono text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 transition-colors"
              placeholder="2B7E151628AED2A6ABF7158809CF4F3C"
            />
            <p className="text-[11px] text-slate-400 mt-1.5">
              المفتاح الافتراضي هو مفتاح الاختبار المعياري المعتمد في وثيقة NIST FIPS 197 (Appendix B).
            </p>
          </div>
        </div>

        {/* Mode Toggle + Run */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex bg-slate-800/80 rounded-xl p-1 gap-1">
            <button
              type="button"
              onClick={() => setMode('encrypt')}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all',
                mode === 'encrypt'
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <Lock className="w-4 h-4" /> تشفير (Encrypt)
            </button>
            <button
              type="button"
              onClick={() => setMode('decrypt')}
              className={cn(
                'flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all',
                mode === 'decrypt'
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              <Unlock className="w-4 h-4" /> فك التشفير (Decrypt)
            </button>
          </div>

          <button
            type="button"
            onClick={run}
            className="flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
          >
            <Play className="w-5 h-5" /> تشغيل الجولات الحسابية
          </button>

          <button
            type="button"
            onClick={() => {
              setShowDetails(false);
              setCurrentRound(0);
              setResult('');
            }}
            className="flex items-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold transition-all"
          >
            <RotateCcw className="w-4 h-4" /> إعادة ضبط
          </button>
        </div>

        {/* Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 rounded-2xl border border-emerald-500/30 space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {mode === 'encrypt'
                    ? 'النص المشفر الناتج (Ciphertext Output — 16 Bytes Hex):'
                    : 'النص الصريح المسترجع (Decrypted Plaintext — 16 Bytes Hex):'}
                </span>
              </span>
              <button
                type="button"
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs text-amber-300 hover:text-amber-200 font-bold transition-colors"
              >
                {showDetails ? 'إخفاء مصفوفات الجولات' : 'إظهار مصفوفات الجولات الـ 10 بالتفصيل'}
              </button>
            </div>
            <div
              dir="ltr"
              className="font-mono text-base md:text-lg text-emerald-300 break-all bg-slate-900/70 rounded-xl p-4 border border-slate-800"
            >
              {result}
            </div>
          </motion.div>
        )}

        {/* Round Details (0..10) */}
        <AnimatePresence>
          {showDetails && roundStates.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0 }}
              className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-black text-slate-100">
                  تتبع مصفوفة الحالة (4×4 State Matrix) عبر الجولات (من الجولة 0 إلى الجولة 10)
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCurrentRound((r) => Math.max(0, r - 1))}
                    disabled={currentRound <= 0}
                    className="p-2 rounded-lg bg-slate-800 disabled:opacity-30 hover:bg-slate-700 text-slate-300"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-emerald-300 px-3 py-1 rounded-lg bg-slate-900 border border-slate-700">
                    {roundStates[currentRound]?.label || `الجولة ${currentRound}`}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentRound((r) => Math.min(roundStates.length - 1, r + 1))
                    }
                    disabled={currentRound >= roundStates.length - 1}
                    className="p-2 rounded-lg bg-slate-800 disabled:opacity-30 hover:bg-slate-700 text-slate-300"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
                {roundStates.map((item, rIdx) => (
                  <button
                    key={rIdx}
                    type="button"
                    onClick={() => setCurrentRound(rIdx)}
                    className={cn(
                      'p-3 rounded-xl text-center transition-all border',
                      rIdx === currentRound
                        ? 'border-emerald-400 bg-emerald-950/40 shadow-lg'
                        : 'border-slate-800 bg-slate-900/70 hover:border-slate-700'
                    )}
                  >
                    <div className="text-[10px] font-bold text-emerald-300 mb-2 truncate">
                      {rIdx === 0 ? 'جولة 0 (مبدئية)' : rIdx === 10 ? 'جولة 10 (النهائية)' : `الجولة ${rIdx}`}
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-[9px] font-mono" dir="ltr">
                      {item.matrix.flatMap((row) => row).map((b, i) => (
                        <span
                          key={i}
                          className={cn(
                            'py-1 rounded flex items-center justify-center',
                            rIdx === currentRound
                              ? 'bg-emerald-500/30 text-emerald-100 font-bold'
                              : 'bg-slate-800 text-slate-400'
                          )}
                        >
                          {hexByte(b)}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* بطاقات المواصفات المعيارية وجدول 1.2 من مقرر ISE243 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'حجم الكتلة الثابت (Block Size)', value: '128 بت', desc: '16 بايت (مصفوفة 4×4 بايتات)' },
            { label: 'طول المفتاح (Key Sizes)', value: '128 / 192 / 256 بت', desc: '16 أو 24 أو 32 بايت' },
            {
              label: 'عدد الجولات (Rounds)',
              value: '10 / 12 / 14 جولة',
              desc: 'SubBytes → ShiftRows → MixColumns → AddRoundKey (الجولة الأخيرة بدون MixColumns)',
            },
            { label: 'المعيار الموثق', value: 'NIST FIPS 197', desc: 'حقل غالوا GF(2⁸) · 0x11B' },
          ].map((info, i) => (
            <div key={i} className="glass-panel p-4 rounded-xl text-center border border-slate-800">
              <p className="text-lg font-black text-emerald-400">{info.value}</p>
              <p className="text-xs font-bold text-slate-200 mt-1">{info.label}</p>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{info.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export { AESLab };
```

---

### 2. الكود المصحح للتبويب الأول في `src/pages/main/ZKPLab.tsx` (بروتوكول شنور التفاعلي الحقيقي بدلاً من المعادلة الوهمية)

في ملف `src/pages/main/ZKPLab.tsx`، تُستبدل الأسطر `78–140` بالكود الرياضي الصحيح لبروتوكول المعرفة الصفرية التفاعلي على المجموعة الدورية ($\mathbb{Z}_{23}^*, p=23, q=11, g=2$):

```tsx
  // Component 5: Interactive Zero-Knowledge Proof Protocol (Schnorr over Z_23*: p=23, q=11, g=2)
  const zkpP = 23;
  const zkpQ = 11;
  const zkpG = 2;
  const [secret, setSecret] = useState<number>(7); // الشاهد السري w in {1..10}
  const [commitment, setCommitment] = useState<number | null>(null); // الالتزام t = g^r mod 23
  const [challenge, setChallenge] = useState<number | null>(null); // التحدي c in {1..10}
  const [responseS, setResponseS] = useState<number | null>(null); // الاستجابة s = (r + secret * c) mod 11
  const [proofResult, setProofResult] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);
  const [showSecret, setShowSecret] = useState<boolean>(false);
  const [randomR, setRandomR] = useState<number | null>(null);

  const publicKeyY = modPow(zkpG, ((secret % zkpQ) + zkpQ) % zkpQ || 1, zkpP);

  // الخطوة 1: توليد الالتزام التشفيري الحقيقي (Commitment: t = g^r mod p)
  const handleCommitment = () => {
    const r = (getCryptoRandomValue(zkpQ - 1) % (zkpQ - 1)) + 1;
    setRandomR(r);
    const comm = modPow(zkpG, r, zkpP);
    setCommitment(comm);
    setChallenge(null);
    setResponseS(null);
    setStep(2);
    setProofResult(null);
    void addAuditLog(
      'ZKP_COMMITMENT_GENERATED',
      'lab',
      `توليد التزام شنور التشفيري t = g^r mod 23 = ${comm} باستخدام عشوائية r=${r}`
    );
  };

  // الخطوة 2: إرسال التحدي (Challenge) من المُتحقق وحساب الاستجابة s = (r + w*c) mod q
  const handleChallenge = () => {
    const ch = (getCryptoRandomValue(zkpQ - 1) % (zkpQ - 1)) + 1;
    setChallenge(ch);
    const cleanW = ((secret % zkpQ) + zkpQ) % zkpQ || 1;
    const sVal = ((randomR ?? 1) + cleanW * ch) % zkpQ;
    setResponseS(sVal);
    setStep(3);
    void addAuditLog(
      'ZKP_CHALLENGE_ISSUED',
      'lab',
      `إرسال تحدي المدقق c=${ch} وحساب الاستجابة المعيارية s = (r + w·c) mod 11 = ${sVal}`
    );
  };

  // الخطوة 3: التحقق الرياضي الصارم (g^s mod p === (t * y^c) mod p) دون كشف السر
  const handleVerify = () => {
    if (commitment !== null && challenge !== null && responseS !== null) {
      const lhs = modPow(zkpG, responseS, zkpP);
      const rhs = (commitment * modPow(publicKeyY, challenge, zkpP)) % zkpP;
      const isValid = lhs === rhs;
      if (isValid) {
        setProofResult(
          `نجاح التحقق الرياضي الصارم: الطرف الأيسر g^s mod 23 = ${lhs} يطابق الطرف الأيمن (t · y^c) mod 23 = ${rhs} — تم إثبات معرفة السر دون كشفه!`
        );
      } else {
        setProofResult(
          `فشل التحقق الرياضي: الطرف الأيسر (${lhs}) لا يطابق الطرف الأيمن (${rhs}).`
        );
      }
      setStep(4);
      void addAuditLog(
        'ZKP_PROOF_VERIFIED',
        'lab',
        `اكتمال التحقق الرياضي لبروتوكول شنور: LHS=${lhs}, RHS=${rhs}`
      );
    }
  };
```

---

### 3. الكود المنقى لبطاقات الطلاب العشرة في `src/data/students.ts` (توصيف أكاديمي رسمي لطلاب شعبة `002م` — دبلوم أمن المعلومات — `2026-2027`)

```ts
// File: src/data/students.ts
// بيانات طلاب شعبة (002م) — تخصص دبلوم أمن المعلومات — مادة التشفير المتقدم (ISE243) — العام الأكاديمي (2026-2027)

export interface StudentPersona {
  id: number;
  name: string;
  academicId: string;
  username: string;
  initial: string;
  title: string;
  message: string;
  theme: {
    color: string;
    accent: string;
    icon: string;
    quote: string;
    specialty: string;
  };
  badge: string;
  chapterFocus: number[];
}

export const STUDENTS: StudentPersona[] = [
  {
    id: 1,
    name: 'فهد خالد الغامدي',
    academicId: '25105375',
    username: '25105375',
    initial: 'ف',
    title: 'هندسة البنية التشفيرية وحقول غالوا',
    message:
      'عضو فريق المشروع الأكاديمي لمادة التشفير المتقدم (ISE243) — تخصص دبلوم أمن المعلومات — شعبة (002م) للسنة الأكاديمية (2026-2027). تولى تطوير محاكيات حقل غالوا GF(2^8) وجولات معيار AES-128/256 وحسابات المنحنيات الإهليلجية التأسيسية.',
    theme: {
      color: 'from-blue-500 to-indigo-600',
      accent: '#3b82f6',
      icon: 'Cpu',
      quote: 'تطبيق البنية الجبرية لحقول غالوا GF(2^8) ومعيار NIST FIPS 197.',
      specialty: 'خوارزميات AES-256 و GF(2^8) والمنحنيات الإهليلجية (الفصلان 1 و 2)',
    },
    badge: '⚙️',
    chapterFocus: [1, 2],
  },
  {
    id: 2,
    name: 'صالح محمد المالكي',
    academicId: '25106060',
    username: '25106060',
    initial: 'ص',
    title: 'تشفير قواعد البيانات وإدارة المفاتيح',
    message:
      'عضو فريق المشروع الأكاديمي لمادة التشفير المتقدم (ISE243) — تخصص دبلوم أمن المعلومات — شعبة (002م) للسنة الأكاديمية (2026-2027). تولى إعداد وتوثيق وحدات تشفير قواعد البيانات (TDE & AES-XTS) ودورة حياة المفاتيح في وحدات HSM.',
    theme: {
      color: 'from-teal-500 to-emerald-600',
      accent: '#14b8a6',
      icon: 'FileText',
      quote: 'حماية البيانات الساكنة وتطبيق هرمية المفاتيح Root Key -> KEK -> DEK.',
      specialty: 'تشفير قواعد البيانات وإدارة المفاتيح HSM (الفصلان 6 و 9)',
    },
    badge: '📚',
    chapterFocus: [6, 9],
  },
  {
    id: 3,
    name: 'ياسر مفرح العسيري',
    academicId: '25106394',
    username: '25106394',
    initial: 'ي',
    title: 'تحليل القنوات الجانبية والتشفير الكمومي',
    message:
      'عضو فريق المشروع الأكاديمي لمادة التشفير المتقدم (ISE243) — تخصص دبلوم أمن المعلومات — شعبة (002م) للسنة الأكاديمية (2026-2027). تولى إعداد محاكيات مقاومة هجمات التوقيت والقنوات الجانبية وتحليل خوارزمية شور الكمومية.',
    theme: {
      color: 'from-amber-500 to-orange-600',
      accent: '#f59e0b',
      icon: 'Search',
      quote: 'التنفيذ ثابت الزمن (Constant-Time) يحصن المفاتيح ضد التسريب الجانبي.',
      specialty: 'أمن القنوات الجانبية وأسس التشفير ما بعد الكم (الفصلان 10 و 11)',
    },
    badge: '🔍',
    chapterFocus: [10, 11],
  },
  {
    id: 4,
    name: 'ماهر حبيب داود',
    academicId: '25106059',
    username: '25106059',
    initial: 'م',
    title: 'هندسة بروتوكولات TLS 1.3 و VPN',
    message:
      'عضو فريق المشروع الأكاديمي لمادة التشفير المتقدم (ISE243) — تخصص دبلوم أمن المعلومات — شعبة (002م) للسنة الأكاديمية (2026-2027). تولى بناء نماذج البنية التحتية للمفاتيح العامة PKI ومصافحة TLS 1.3 وتغليف أنفاق IPsec و WireGuard.',
    theme: {
      color: 'from-cyan-500 to-blue-600',
      accent: '#06b6d4',
      icon: 'Network',
      quote: 'ضمان السرية الأمامية التامة (PFS) في اتصالات الشبكات المشفرة.',
      specialty: 'البنية التحتية PKI وبروتوكولات TLS 1.3 و VPN (الفصلان 4 و 5)',
    },
    badge: '🔗',
    chapterFocus: [4, 5],
  },
  {
    id: 5,
    name: 'عبدالرحمن محمد الفيفي',
    academicId: '25105456',
    username: '25105456',
    initial: 'ع',
    title: 'معايير التشفير ما بعد الكم NIST PQC',
    message:
      'عضو فريق المشروع الأكاديمي لمادة التشفير المتقدم (ISE243) — تخصص دبلوم أمن المعلومات — شعبة (002م) للسنة الأكاديمية (2026-2027). تولى توثيق ومحاكاة معايير NIST الكمومية النهائية (FIPS 203 ML-KEM و FIPS 204 ML-DSA و FIPS 205 SLH-DSA).',
    theme: {
      color: 'from-rose-500 to-pink-600',
      accent: '#ef4444',
      icon: 'Lightbulb',
      quote: 'الشبيكات الجبرية Module-LWE هي الأساس القياسي للأمن المقاوم للكم.',
      specialty: 'الشبيكات الجبرية ومعايير NIST FIPS 203/204/205 (الفصلان 11 و 12)',
    },
    badge: '💡',
    chapterFocus: [11, 12],
  },
  {
    id: 6,
    name: 'عمر إبراهيم بن مشعان',
    academicId: '25104748',
    username: '25104748',
    initial: 'ع',
    title: 'تكامل المعايير الوطنية للتشفير وضوابط NCA',
    message:
      'عضو فريق المشروع الأكاديمي لمادة التشفير المتقدم (ISE243) — تخصص دبلوم أمن المعلومات — شعبة (002م) للسنة الأكاديمية (2026-2027). تولى ربط مخرجات الفصول التشفيرية بالضوابط الأساسية للأمن السيبراني (NCA ECC-2:2024) والمعايير الوطنية للتشفير (NCS-1:2020).',
    theme: {
      color: 'from-indigo-500 to-blue-700',
      accent: '#6366f1',
      icon: 'Compass',
      quote: 'مواءمة الخوارزميات القياسية مع متطلبات الضوابط الوطنية المعتمدة.',
      specialty: 'الضوابط التشفيرية وأمن الشبكات الافتراضية (الفصلان 1 و 5)',
    },
    badge: '🎯',
    chapterFocus: [1, 5],
  },
  {
    id: 7,
    name: 'إيمان محمد الأهدل',
    academicId: '25108174',
    username: '25108174',
    initial: 'إ',
    title: 'التشفير المتجانس وبراهين المعرفة الصفرية',
    message:
      'عضو فريق المشروع الأكاديمي لمادة التشفير المتقدم (ISE243) — تخصص دبلوم أمن المعلومات — شعبة (002م) للسنة الأكاديمية (2026-2027). تولت تطوير محاكيات التشفير المتجانس الجمعي (Paillier) وبروتوكول سيجما وشنور للمعرفة الصفرية (ZKP).',
    theme: {
      color: 'from-emerald-500 to-teal-600',
      accent: '#10b981',
      icon: 'ShieldCheck',
      quote: 'الحوسبة على البيانات المشفرة وإثبات المعرفة دون كشف الأسرار.',
      specialty: 'التشفير المتجانس FHE وبراهين المعرفة الصفرية ZKP (الفصلان 7 و 8)',
    },
    badge: '🛡️',
    chapterFocus: [7, 8],
  },
  {
    id: 8,
    name: 'عفراء سعود الجهني',
    academicId: '25105999',
    username: '25105999',
    initial: 'ع',
    title: 'تبادل المفاتيح ECDH والتواقيع الرقمية ECDSA',
    message:
      'عضو فريق المشروع الأكاديمي لمادة التشفير المتقدم (ISE243) — تخصص دبلوم أمن المعلومات — شعبة (002م) للسنة الأكاديمية (2026-2027). تولت تصميم التمثيل البصري ثلاثي الأبعاد لتبادل المفاتيح على المنحنيات الإهليلجية والتحقق من الشهادات.',
    theme: {
      color: 'from-purple-500 to-violet-600',
      accent: '#8b5cf6',
      icon: 'Sparkles',
      quote: 'تبادل المفاتيح الآمن عبر القناة العامة باستخدام صعوبة اللوغاريتم المتقطع ECDLP.',
      specialty: 'بروتوكولات ECDH و ECDSA وشهادات X.509 (الفصلان 3 و 4)',
    },
    badge: '✨',
    chapterFocus: [3, 4],
  },
  {
    id: 9,
    name: 'عبدالله موسى سفياني',
    academicId: '25105026',
    username: '25105026',
    initial: 'ع',
    title: 'تدقيق سلامة البيانات وسلاسل التجزئة',
    message:
      'عضو فريق المشروع الأكاديمي لمادة التشفير المتقدم (ISE243) — تخصص دبلوم أمن المعلومات — شعبة (002م) للسنة الأكاديمية (2026-2027). تولى بناء سجل التدقيق المترابط ببصمات SHA-256 وفحص متجهات الاختبار القياسية في المختبرات.',
    theme: {
      color: 'from-slate-500 to-slate-700',
      accent: '#64748b',
      icon: 'CheckCircle2',
      quote: 'التحقق الرياضي من متجهات الاختبار القياسية يضمن سلامة التنفيذ التشفيري.',
      specialty: 'تدقيق جودة الخوارزميات وحماية المفاتيح (الفصلان 6 و 9)',
    },
    badge: '✅',
    chapterFocus: [6, 9],
  },
  {
    id: 10,
    name: 'خديجة محمد جعفري',
    academicId: '2510650',
    username: '2510650',
    initial: 'خ',
    title: 'الاختبارات القياسية والتحقق من الشهادات',
    message:
      'عضو فريق المشروع الأكاديمي لمادة التشفير المتقدم (ISE243) — تخصص دبلوم أمن المعلومات — شعبة (002م) للسنة الأكاديمية (2026-2027). تولت إعداد بنك الأسئلة المعياري ونظام التحقق التشفيري من الشهادات التدريبية.',
    theme: {
      color: 'from-fuchsia-500 to-purple-600',
      accent: '#d946ef',
      icon: 'TestTube2',
      quote: 'التقييم المعياري يربط الفهم النظري بالتطبيق المخبري الدقيق.',
      specialty: 'التحقق من التنفيذ والاختبارات المعيارية (الفصلان 9 و 10)',
    },
    badge: '🧪',
    chapterFocus: [9, 10],
  },
];

export const TEAM_ACADEMIC_IDS = new Set(STUDENTS.map((s) => s.academicId));

export function findTeamMember(academicId?: string): StudentPersona | undefined {
  if (!academicId) return undefined;
  return STUDENTS.find((s) => s.academicId === academicId.trim());
}

export const GENERAL_MOTIVATION = {
  title: 'متدرب أكاديمي — مِرْصَاد التشفير',
  subtitle: 'مادة التشفير المتقدم (ISE243) · دبلوم أمن المعلومات · شعبة (002م) · (2026-2027)',
  message:
    'مرحباً بك في بيئة المشروع الأكاديمي التدريبي لمادة التشفير المتقدم (ISE243) — تخصص دبلوم أمن المعلومات — طلاب شعبة (002م) للسنة الأكاديمية (2026-2027) بجامعة الأمير مقرن بن عبدالعزيز.',
};
```
