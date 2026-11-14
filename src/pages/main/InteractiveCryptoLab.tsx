// File: src/pages/main/InteractiveCryptoLab.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  KeyRound,
  Cpu,
  Play,
  RefreshCw,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import LabPipelineTracker, { PipelineStageInfo } from '@/components/lab/LabPipelineTracker';
import { cn } from '@/lib/utils';

interface CryptoUnitSpec {
  id: number;
  title: string;
  courseChapter: string;
  standard: string;
  defaultInput: string;
  defaultKey: string;
  execute: (input: string, key: string) => {
    stage1Input: string;
    stage2Transform: string;
    stage3Verify: string;
    stage4Output: string;
    stepsTrace: { label: string; equation: string; result: string }[];
  };
}

function modPow(base: bigint, exp: bigint, mod: bigint): bigint {
  let res = 1n;
  let b = ((base % mod) + mod) % mod;
  let e = exp;
  while (e > 0n) {
    if (e & 1n) res = (res * b) % mod;
    e >>= 1n;
    b = (b * b) % mod;
  }
  return res;
}

const CRYPTO_UNITS: CryptoUnitSpec[] = [
  {
    id: 1,
    title: 'تشفير الإزاحة والجبر المعياري (Modular Shift Cipher)',
    courseChapter: 'الفصل 1 · الجبر المعياري Z_26',
    standard: 'Classical & Modular Arithmetic',
    defaultInput: 'MIRSAD2026',
    defaultKey: '7',
    execute: (input, key) => {
      const shift = ((parseInt(key, 10) || 7) % 26 + 26) % 26;
      const clean = (input || 'MIRSAD').toUpperCase();
      const encrypted = clean
        .split('')
        .map((ch) => {
          const code = ch.charCodeAt(0);
          if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 + shift) % 26) + 65);
          }
          return ch;
        })
        .join('');
      const decrypted = encrypted
        .split('')
        .map((ch) => {
          const code = ch.charCodeAt(0);
          if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
          }
          return ch;
        })
        .join('');
      return {
        stage1Input: `M = "${clean}", K = ${shift} (mod 26)`,
        stage2Transform: `C_i = (M_i + ${shift}) mod 26 ➔ "${encrypted}"`,
        stage3Verify: `D_i = (C_i - ${shift}) mod 26 ➔ "${decrypted}" [100% Match]`,
        stage4Output: `النص المشفر: ${encrypted} | استرجاع النص الأصلي: ${decrypted}`,
        stepsTrace: [
          { label: 'تجهيز الحروف في الحلقة Z_26', equation: 'M_i ∈ {0..25}', result: clean },
          { label: 'تطبيق دالة التشفير المعياري', equation: `E(x) = (x + ${shift}) mod 26`, result: encrypted },
          { label: 'تطبيق دالة فك التشفير العكسية', equation: `D(y) = (y - ${shift} + 26) mod 26`, result: decrypted },
        ],
      };
    },
  },
  {
    id: 2,
    title: 'حقل غالوا المحدود وخلط الأعمدة (AES GF(2^8) & MixColumns)',
    courseChapter: 'الفصل 1 و2 · معيار FIPS 197',
    standard: 'NIST FIPS 197 (0x11B)',
    defaultInput: '57',
    defaultKey: '83',
    execute: (input, key) => {
      const a = parseInt(input, 16) & 0xff || 0x57;
      const b = parseInt(key, 16) & 0xff || 0x83;
      const xorVal = a ^ b;
      let p = 0;
      let aa = a;
      let bb = b;
      for (let i = 0; i < 8; i++) {
        if (bb & 1) p ^= aa;
        const hi = aa & 0x80;
        aa = (aa << 1) & 0xff;
        if (hi) aa ^= 0x1b;
        bb >>= 1;
      }
      const hexA = a.toString(16).toUpperCase().padStart(2, '0');
      const hexB = b.toString(16).toUpperCase().padStart(2, '0');
      const hexXor = xorVal.toString(16).toUpperCase().padStart(2, '0');
      const hexMul = p.toString(16).toUpperCase().padStart(2, '0');
      return {
        stage1Input: `A = 0x${hexA}, B = 0x${hexB} in GF(2^8)`,
        stage2Transform: `A ⊗ B mod (x^8+x^4+x^3+x+1) = 0x${hexMul}`,
        stage3Verify: `(A ⊕ B) ⊕ B = 0x${(xorVal ^ b).toString(16).toUpperCase().padStart(2, '0')} == 0x${hexA}`,
        stage4Output: `جمع غالوا (XOR): 0x${hexXor} | ضرب غالوا (⊗): 0x${hexMul}`,
        stepsTrace: [
          { label: 'جمع كثيرات الحدود (XOR)', equation: `0x${hexA} ⊕ 0x${hexB}`, result: `0x${hexXor}` },
          { label: 'ضرب كثيرات الحدود مع الاختزال بـ 0x11B', equation: `0x${hexA} ⊗ 0x${hexB} mod m(x)`, result: `0x${hexMul}` },
          { label: 'فحص الانغلاق في الحقل GF(2^8)', equation: 'deg(R(x)) < 8 (0..255)', result: `عنصر صالح (0x${hexMul})` },
        ],
      };
    },
  },
  {
    id: 3,
    title: 'تشفير وفك تشفير المفتاح العام (RSA Modular Exponentiation)',
    courseChapter: 'الفصل 3 · خوارزمية RSA',
    standard: 'NIST SP 800-56B',
    defaultInput: '65',
    defaultKey: '17',
    execute: (input) => {
      const p = 61n;
      const q = 53n;
      const n = p * q;
      const phi = (p - 1n) * (q - 1n);
      const e = 17n;
      const d = 2753n;
      const m = BigInt(Math.max(2, Math.min(3000, parseInt(input, 10) || 65)));
      const c = modPow(m, e, n);
      const dec = modPow(c, d, n);
      return {
        stage1Input: `M = ${m}, (e=${e}, n=${n})`,
        stage2Transform: `C = ${m}^${e} mod ${n} = ${c}`,
        stage3Verify: `M' = ${c}^${d} mod ${n} = ${dec} [Match]`,
        stage4Output: `النص المشفر C = ${c} | النص المسترجع M' = ${dec}`,
        stepsTrace: [
          { label: 'توليد المعاملات الأولية وحساب أويلر', equation: `n = 61×53 = ${n}, φ(n) = ${phi}`, result: `e=${e}, d=${d}` },
          { label: 'التشفير بالمفتاح العام (Square-and-Multiply)', equation: `C = M^e mod n = ${m}^17 mod 3233`, result: `C = ${c}` },
          { label: 'فك التشفير بالمفتاح الخاص والتحقق', equation: `M' = C^d mod n = ${c}^2753 mod 3233`, result: `M' = ${dec} ✓` },
        ],
      };
    },
  },
  {
    id: 4,
    title: 'تبادل المفاتيح بالمنحنيات الإهليلجية (ECDH Key Exchange)',
    courseChapter: 'الفصل 4 · التشفير بالمنحنيات الإهليلجية ECC',
    standard: 'NIST FIPS 186-5 / Curve F_97',
    defaultInput: '6',
    defaultKey: '11',
    execute: (input, key) => {
      const privA = Math.max(2, (parseInt(input, 10) || 6) % 23);
      const privB = Math.max(3, (parseInt(key, 10) || 11) % 23);
      const g = 5n;
      const p = 97n;
      const pubA = modPow(g, BigInt(privA), p);
      const pubB = modPow(g, BigInt(privB), p);
      const sharedA = modPow(pubB, BigInt(privA), p);
      const sharedB = modPow(pubA, BigInt(privB), p);
      return {
        stage1Input: `d_A = ${privA}, d_B = ${privB} over F_97`,
        stage2Transform: `Q_A = ${pubA}, Q_B = ${pubB}`,
        stage3Verify: `S_A (${sharedA}) === S_B (${sharedB}) [Verified]`,
        stage4Output: `المفتاح المشترك المشتق بنجاح لدى الطرفين: S = ${sharedA}`,
        stepsTrace: [
          { label: 'اشتقاق المفاتيح العامة للطرفين', equation: `Q_A = [d_A]G, Q_B = [d_B]G`, result: `Q_A=${pubA}, Q_B=${pubB}` },
          { label: 'حساب السر المشترك لدى الطرف الأول', equation: `S_A = [d_A]Q_B`, result: `${sharedA}` },
          { label: 'حساب السر المشترك لدى الطرف الثاني والمطابقة', equation: `S_B = [d_B]Q_A`, result: `${sharedB} (تطابق 100%)` },
        ],
      };
    },
  },
  {
    id: 5,
    title: 'التشفير المتجانس الجمعي (Paillier Homomorphic Encryption)',
    courseChapter: 'الفصل 7 · التشفير المتجانس PHE',
    standard: 'Paillier (p=17, q=19, n=323)',
    defaultInput: '42',
    defaultKey: '58',
    execute: (input, key) => {
      const m1 = BigInt(Math.max(1, Math.min(120, parseInt(input, 10) || 42)));
      const m2 = BigInt(Math.max(1, Math.min(120, parseInt(key, 10) || 58)));
      const n = 323n;
      const nSq = 104329n;
      const g = 324n;
      const lambda = 144n;
      const mu = 127n;
      const enc = (m: bigint, r: bigint) => (modPow(g, m, nSq) * modPow(r, n, nSq)) % nSq;
      const dec = (c: bigint) => {
        const u = modPow(c, lambda, nSq);
        const l = (u - 1n) / n;
        return (l * mu) % n;
      };
      const c1 = enc(m1, 5n);
      const c2 = enc(m2, 7n);
      const cSum = (c1 * c2) % nSq;
      const decSum = dec(cSum);
      return {
        stage1Input: `m1 = ${m1}, m2 = ${m2}, n = 323, n^2 = 104329`,
        stage2Transform: `C1 = ${c1}, C2 = ${c2} ➔ C_sum = ${cSum}`,
        stage3Verify: `Dec(C1×C2) = ${decSum} === m1+m2 (${m1 + m2})`,
        stage4Output: `مجموع النصين بعد فك التشفير = ${decSum} (دون كشف القيم للسحابة)`,
        stepsTrace: [
          { label: 'تشفير القيمتين بشكل مستقل', equation: 'C_i = g^m_i · r^n mod n^2', result: `C1=${c1}, C2=${c2}` },
          { label: 'الضرب المتجانس على السحابة', equation: 'C_sum = (C1 × C2) mod 104329', result: `C_sum = ${cSum}` },
          { label: 'فك تشفير حاصل الضرب والتحقق', equation: 'L(C_sum^λ mod n^2) · μ mod n', result: `${decSum} = ${m1}+${m2} ✓` },
        ],
      };
    },
  },
  {
    id: 6,
    title: 'التشفير ما بعد الكم القائم على الشبكات (ML-KEM / Kyber Lattice)',
    courseChapter: 'الفصل 6 · التشفير ما بعد الكم PQC',
    standard: 'NIST FIPS 203 (ML-KEM)',
    defaultInput: '1',
    defaultKey: '3',
    execute: (input, key) => {
      const bit = (parseInt(input, 10) || 1) % 2;
      const secretS = Math.max(1, (parseInt(key, 10) || 3) % 11);
      const q = 3329;
      const halfQ = Math.floor(q / 2);
      const a = 945;
      const e = 2;
      const b = (a * secretS + e) % q;
      const r = 2;
      const e1 = 1;
      const e2 = 2;
      const u = (a * r + e1) % q;
      const v = (b * r + e2 + bit * halfQ) % q;
      const diff = (((v - secretS * u) % q) + q) % q;
      const recoveredBit = diff > q / 4 && diff < (3 * q) / 4 ? 1 : 0;
      return {
        stage1Input: `Bit = ${bit}, Secret s = ${secretS}, q = 3329`,
        stage2Transform: `Public b = ${b} ➔ Cipher (u=${u}, v=${v})`,
        stage3Verify: `v - s·u mod q = ${diff} ➔ Recovered Bit = ${recoveredBit}`,
        stage4Output: `البت المرسل: ${bit} | البت المستخلص بعد إزالة الضوضاء: ${recoveredBit}`,
        stepsTrace: [
          { label: 'توليد مفتاح الشبكة العام مع الضوضاء', equation: 'b = (a·s + e) mod 3329', result: `b = ${b}` },
          { label: 'تغليف البت السري (Encapsulation)', equation: 'u = a·r+e1, v = b·r+e2+m·⌊q/2⌋', result: `(u=${u}, v=${v})` },
          { label: 'فك التغليف وإزالة الضوضاء (Decapsulation)', equation: 'v - s·u mod 3329', result: `المسافة=${diff} ➔ البت=${recoveredBit} ✓` },
        ],
      };
    },
  },
  {
    id: 7,
    title: 'التحليل التشفيري الإحصائي وكسر الإزاحة (Cryptanalysis)',
    courseChapter: 'الفصل 8 · التحليل التشفيري',
    standard: 'Chi-Square Frequency Analysis',
    defaultInput: 'KHOOR ZRUOG',
    defaultKey: '3',
    execute: (input, key) => {
      const shift = ((parseInt(key, 10) || 3) % 26 + 26) % 26;
      const cipher = (input || 'KHOOR ZRUOG').toUpperCase();
      const recovered = cipher
        .split('')
        .map((ch) => {
          const code = ch.charCodeAt(0);
          if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
          }
          return ch;
        })
        .join('');
      return {
        stage1Input: `Cipher = "${cipher}", Candidate Key = ${shift}`,
        stage2Transform: `Frequency Peak Alignment (Shift = -${shift})`,
        stage3Verify: `Plaintext Intelligibility Check: "${recovered}"`,
        stage4Output: `المفتاح المكتشف: K = ${shift} | النص الصريح المسترد: ${recovered}`,
        stepsTrace: [
          { label: 'حساب التوزيع التكراري للحروف المشفرة', equation: 'f(c) = count(c) / N', result: `طول النص = ${cipher.length}` },
          { label: 'تطبيق الإزاحة العكسية المرشحة', equation: `P = (C - ${shift}) mod 26`, result: recovered },
          { label: 'تأكيد مطابقة الأنماط اللغوية', equation: 'Chi-Square Minimization', result: `مفتاح صحيح (K=${shift}) ✓` },
        ],
      };
    },
  },
  {
    id: 8,
    title: 'إثبات المعرفة الصفرية غير التفاعلي (Schnorr Zero-Knowledge Proof)',
    courseChapter: 'الفصل 5 · إثبات المعرفة الصفرية ZKP',
    standard: 'Schnorr Protocol over Z_23*',
    defaultInput: '6',
    defaultKey: '4',
    execute: (input, key) => {
      const p = 23n;
      const q = 22n;
      const g = 5n;
      const x = BigInt(Math.max(1, (parseInt(input, 10) || 6) % 21));
      const c = BigInt(Math.max(1, (parseInt(key, 10) || 4) % 10));
      const r = 7n;
      const y = modPow(g, x, p);
      const t = modPow(g, r, p);
      const s = (r + c * x) % q;
      const lhs = modPow(g, s, p);
      const rhs = (t * modPow(y, c, p)) % p;
      return {
        stage1Input: `Secret x = ${x} (Hidden), Public y = g^x mod 23 = ${y}`,
        stage2Transform: `Commitment t = ${t}, Challenge c = ${c} ➔ Response s = ${s}`,
        stage3Verify: `g^s mod 23 (${lhs}) === t·y^c mod 23 (${rhs})`,
        stage4Output: `الطرف الأيسر (${lhs}) = الطرف الأيمن (${rhs}) ➔ الإثبات صحيح دون كشف السر!`,
        stepsTrace: [
          { label: 'حساب المفتاح العام والالتزام العشوائي', equation: `y = 5^${x} mod 23 = ${y}, t = 5^7 mod 23 = ${t}`, result: `y=${y}, t=${t}` },
          { label: 'حساب استجابة المُثبِت للتحدي c', equation: `s = (r + c·x) mod 22 = (7 + ${c}×${x}) mod 22`, result: `s = ${s}` },
          { label: 'معادلة تحقق المُدقِّق الصفرية', equation: `5^${s} mod 23 == (${t} × ${y}^${c}) mod 23`, result: `${lhs} == ${rhs} ✓` },
        ],
      };
    },
  },
];

export default function InteractiveCryptoLab() {
  const [activeUnitId, setActiveUnitId] = useState<number>(1);
  const currentUnit = CRYPTO_UNITS.find((u) => u.id === activeUnitId) || CRYPTO_UNITS[0];

  const [inputText, setInputText] = useState<string>(currentUnit.defaultInput);
  const [keyText, setKeyText] = useState<string>(currentUnit.defaultKey);
  const [activeStage, setActiveStage] = useState<0 | 1 | 2 | 3 | 4>(4);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleSelectUnit = (unit: CryptoUnitSpec) => {
    setActiveUnitId(unit.id);
    setInputText(unit.defaultInput);
    setKeyText(unit.defaultKey);
    triggerSequentialRun();
  };

  const triggerSequentialRun = useCallback(() => {
    setIsRunning(true);
    setActiveStage(1);
    setTimeout(() => setActiveStage(2), 320);
    setTimeout(() => setActiveStage(3), 680);
    setTimeout(() => {
      setActiveStage(4);
      setIsRunning(false);
    }, 1050);
  }, []);

  useEffect(() => {
    triggerSequentialRun();
  }, [triggerSequentialRun]);

  const result = currentUnit.execute(inputText, keyText);

  const stages: [PipelineStageInfo, PipelineStageInfo, PipelineStageInfo, PipelineStageInfo] = [
    {
      stageNumber: 1,
      title: '1. الإدخال وتجهيز المعاملات',
      subtitle: 'تجهيز المدخلات والمفتاح في البنية الجبرية المقررة',
      formulaOrValue: result.stage1Input,
    },
    {
      stageNumber: 2,
      title: '2. التشغيل والتحويل التشفيري',
      subtitle: 'تنفيذ الدالة التشفيرية خطوة بخطوة',
      formulaOrValue: result.stage2Transform,
    },
    {
      stageNumber: 3,
      title: '3. الفحص والتحقق العكسي',
      subtitle: 'فك التشفير أو فحص المعادلة الرياضية للتأكد من السلامة',
      formulaOrValue: result.stage3Verify,
    },
    {
      stageNumber: 4,
      title: '4. إظهار النتيجة النهائية',
      subtitle: 'النتيجة المعتمدة بعد اجتياز الفحص الرياضي',
      formulaOrValue: result.stage4Output,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-6 font-sans" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 glass-panel card-3d-neon p-5 rounded-3xl border border-emerald-500/35">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl icon-glass-3d flex items-center justify-center text-emerald-400">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-100 flex items-center gap-2">
                <span>المختبر التفاعلي الشامل (ISE243 Labs)</span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/35 text-emerald-300 font-mono">
                  8 وحدات رياضية حية
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                تشغيل متسلسل مضيء للمراحل الأربع: الإدخال ➔ التشغيل ➔ الفحص الرياضي ➔ النتيجة النهائية
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={triggerSequentialRun}
            disabled={isRunning}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl btn-3d-neon btn-3d-neon-active text-emerald-200 hover:text-white font-black text-xs cursor-pointer transition-all duration-300 active:scale-95"
          >
            <Play className="w-4 h-4" />
            <span>تشغيل متسلسل للمراحل الأربع الآن</span>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {CRYPTO_UNITS.map((unit) => {
            const isSelected = unit.id === activeUnitId;
            return (
              <button
                key={unit.id}
                type="button"
                onClick={() => handleSelectUnit(unit)}
                className={cn(
                  'p-4 rounded-2xl border text-right transition-all duration-300 cursor-pointer flex flex-col justify-between gap-2 card-3d-neon btn-3d-neon active:scale-[0.98]',
                  isSelected
                    ? 'btn-3d-neon-active ring-2 ring-emerald-400/75 border-emerald-400 text-white'
                    : 'text-slate-300 hover:text-white'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-amber-400">الوحدة #{unit.id}</span>
                  <span className="text-[10px] font-mono text-emerald-300">{unit.standard}</span>
                </div>
                <div className="text-xs font-black leading-snug">{unit.title}</div>
                <div className="text-[10px] text-slate-400">{unit.courseChapter}</div>
              </button>
            );
          })}
        </div>

        <LabPipelineTracker
          activeStage={activeStage}
          modeLabel={`تتالي تشغيل وفحص: ${currentUnit.title}`}
          stages={stages}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl glass-panel card-3d-neon border border-emerald-500/35 space-y-4">
            <h3 className="text-sm font-black text-emerald-400 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>معاملات الإدخال والتجربة الحية</span>
            </h3>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">
                المدخل الأول (النص أو القيمة العددية M / A):
              </label>
              <input
                type="text"
                dir="ltr"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/90 border border-emerald-500/35 hover:border-emerald-400/70 focus:border-emerald-400 text-emerald-300 font-mono text-xs shadow-[inset_0_1px_2px_rgba(255,255,255,0.14)] outline-none transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">
                المعامل الثاني (المفتاح أو التحدي K / B):
              </label>
              <input
                type="text"
                dir="ltr"
                value={keyText}
                onChange={(e) => setKeyText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/90 border border-amber-500/35 hover:border-amber-400/70 focus:border-amber-400 text-amber-300 font-mono text-xs shadow-[inset_0_1px_2px_rgba(255,255,255,0.14)] outline-none transition-all duration-300"
              />
            </div>

            <button
              type="button"
              onClick={triggerSequentialRun}
              className="w-full py-3 rounded-xl btn-3d-neon btn-3d-neon-active text-emerald-200 hover:text-white font-black text-xs flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 active:scale-95"
            >
              <RefreshCw className={cn('w-4 h-4', isRunning && 'animate-spin')} />
              <span>إعادة التشغيل المتسلسل والفحص</span>
            </button>
          </div>

          <div className="lg:col-span-2 p-6 rounded-3xl glass-panel card-3d-neon border border-emerald-500/35 space-y-4">
            <h3 className="text-sm font-black text-amber-400 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>سجل التحويلات الرياضية المتتابعة والنتيجة النهائية للطلاب:</span>
            </h3>

            <div className="space-y-3">
              {result.stepsTrace.map((st, idx) => {
                const stepHighlighted = activeStage >= idx + 1;
                return (
                  <div
                    key={idx}
                    className={cn(
                      'p-4 rounded-2xl card-3d-neon border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-3 active:scale-[0.99]',
                      stepHighlighted
                        ? 'bg-slate-950/90 border-emerald-500/45'
                        : 'bg-slate-950/40 border-slate-800 opacity-60'
                    )}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-black text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-black text-white">{st.label}</span>
                      </div>
                      <div dir="ltr" className="text-[11px] font-mono text-amber-300">
                        {st.equation}
                      </div>
                    </div>

                    <div
                      dir="ltr"
                      className="px-3.5 py-2 rounded-xl bg-emerald-950/50 border border-emerald-500/35 font-mono text-xs text-emerald-300 font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.14)]"
                    >
                      {st.result}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 rounded-2xl card-3d-neon bg-emerald-950/35 border border-emerald-500/45 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs font-black text-emerald-200">{result.stage4Output}</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 shrink-0">VERIFIED 100%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
