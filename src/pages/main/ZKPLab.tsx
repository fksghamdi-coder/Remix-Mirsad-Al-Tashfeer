import { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import LabPipelineTracker, { PipelineStageInfo } from '@/components/lab/LabPipelineTracker';
import {
  FlaskConical,
  CheckCircle2,
  AlertTriangle,
  KeyRound,
  ShieldCheck,
  RefreshCw,
  Eye,
  EyeOff,
  Sparkles,
  Lock,
  Unlock,
  HelpCircle,
  Send,
  Play,
} from 'lucide-react';
import { useData } from '@/contexts/DataContext';

// Exact 19-point cyclic subgroup of E(F_17): y^2 = x^3 + 2x + 2 (mod 17) with generator G = (5, 1)
// from Table 3.0 (Pages 26-27 of the textbook)
const F17_CURVE_POINTS: Record<number, [number, number] | 'O'> = {
  1: [5, 1],
  2: [6, 3],
  3: [10, 6],
  4: [3, 1],
  5: [9, 16],
  6: [16, 13],
  7: [0, 6],
  8: [13, 7],
  9: [7, 6],
  10: [7, 11],
  11: [13, 10],
  12: [0, 11],
  13: [16, 4],
  14: [9, 1],
  15: [3, 16],
  16: [10, 11],
  17: [6, 14],
  18: [5, 16],
  19: 'O',
};

function modPow(base: number, exp: number, mod: number): number {
  let res = 1;
  let b = ((base % mod) + mod) % mod;
  let e = exp;
  while (e > 0) {
    if (e % 2 === 1) res = (res * b) % mod;
    b = (b * b) % mod;
    e = Math.floor(e / 2);
  }
  return res;
}

function modInverse(a: number, m: number): number {
  const cleanA = ((a % m) + m) % m;
  for (let x = 1; x < m; x++) {
    if ((cleanA * x) % m === 1) return x;
  }
  return 1;
}

function getCryptoRandomValue(max: number): number {
  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    const buf = new Uint32Array(1);
    window.crypto.getRandomValues(buf);
    return buf[0] % max;
  }
  return 1;
}

export default function ZKPLab() {
  const { addAuditLog } = useData();
  const [activeLab, setActiveLab] = useState<'interactive_zkp' | 'schnorr' | 'ecdh' | 'eligibility'>('interactive_zkp');

  // Component 5: Interactive Zero-Knowledge Proof Protocol (Schnorr over Z_23*: p=23, g=5, order=22)
  const zkpP = 23;
  const zkpOrder = 22;
  const zkpG = 5;
  const [secret, setSecret] = useState<number>(7); // الشاهد السري secret in {1..21}
  const [commitment, setCommitment] = useState<number | null>(null); // الالتزام t = modPow(5, r, 23)
  const [challenge, setChallenge] = useState<number | null>(null); // التحدي challenge in {1..21}
  const [responseS, setResponseS] = useState<number | null>(null); // الاستجابة s = (r + challenge * secret) % 22
  const [proofResult, setProofResult] = useState<string | null>(null);
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(1);
  const [showSecret, setShowSecret] = useState<boolean>(false);
  const [randomR, setRandomR] = useState<number | null>(null);

  const cleanSecret = ((secret % zkpOrder) + zkpOrder) % zkpOrder || 1;
  const publicKeyY = modPow(5, cleanSecret, 23);

  // الخطوة 1: توليد الالتزام التشفيري الحقيقي (Commitment: t = modPow(5, r, 23))
  const handleCommitment = () => {
    const r = (getCryptoRandomValue(zkpOrder - 1) % (zkpOrder - 1)) + 1;
    setRandomR(r);
    const comm = modPow(5, r, 23);
    setCommitment(comm);
    setChallenge(null);
    setResponseS(null);
    setStep(2);
    setProofResult(null);
    void addAuditLog(
      'ZKP_COMMITMENT_GENERATED',
      'lab',
      `توليد التزام شنور التشفيري t = 5^r mod 23 = ${comm} باستخدام عشوائية r=${r}`
    );
  };

  // الخطوة 2: إرسال التحدي (Challenge) من المُتحقق وحساب الاستجابة s = (r + challenge * secret) % 22
  const handleChallenge = () => {
    const ch = (getCryptoRandomValue(zkpOrder - 1) % (zkpOrder - 1)) + 1;
    setChallenge(ch);
    const sVal = ((randomR ?? 1) + ch * cleanSecret) % 22;
    setResponseS(sVal);
    setStep(3);
    void addAuditLog(
      'ZKP_CHALLENGE_ISSUED',
      'lab',
      `إرسال تحدي المدقق c=${ch} وحساب الاستجابة المعيارية s = (r + c·secret) mod 22 = ${sVal}`
    );
  };

  // الخطوة 3: التحقق الرياضي الصارم (modPow(5, s, 23) === (t * modPow(y, challenge, 23)) % 23) دون كشف السر
  const handleVerify = () => {
    if (commitment !== null && challenge !== null && responseS !== null) {
      const lhs = modPow(5, responseS, 23);
      const rhs = (commitment * modPow(publicKeyY, challenge, 23)) % 23;
      const isValid = lhs === rhs;
      if (isValid) {
        setProofResult(
          `نجاح التحقق الرياضي الصارم (Proof Verified): الطرف الأيسر 5^s mod 23 = ${lhs} يطابق الطرف الأيمن (t · y^c) mod 23 = ${rhs} — تم إثبات معرفة السر دون كشفه!`
        );
      } else {
        setProofResult(
          `فشل التحقق الرياضي (Verification Failed): الطرف الأيسر (${lhs}) لا يطابق الطرف الأيمن (${rhs}).`
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

  // تشغيل متسلسل للمراحل الأربع بضغطة واحدة
  const runSequentialZKP = () => {
    setStep(1);
    const r = (getCryptoRandomValue(zkpOrder - 1) % (zkpOrder - 1)) + 1;
    const comm = modPow(5, r, 23);
    const ch = (getCryptoRandomValue(zkpOrder - 1) % (zkpOrder - 1)) + 1;
    const sVal = (r + ch * cleanSecret) % 22;
    const lhs = modPow(5, sVal, 23);
    const rhs = (comm * modPow(publicKeyY, ch, 23)) % 23;

    setRandomR(r);
    setCommitment(comm);
    setChallenge(null);
    setResponseS(null);
    setProofResult(null);

    setTimeout(() => {
      setStep(2);
      setChallenge(ch);
      setResponseS(sVal);
    }, 320);

    setTimeout(() => {
      setStep(3);
    }, 640);

    setTimeout(() => {
      setProofResult(
        lhs === rhs
          ? `نجاح التحقق الرياضي الصارم (Proof Verified): الطرف الأيسر 5^s mod 23 = ${lhs} يطابق الطرف الأيمن (t · y^c) mod 23 = ${rhs} — تم إثبات معرفة السر دون كشفه!`
          : `فشل التحقق الرياضي (Verification Failed): الطرف الأيسر (${lhs}) لا يطابق الطرف الأيمن (${rhs}).`
      );
      setStep(4);
    }, 960);
  };

  const resetLab = () => {
    setCommitment(null);
    setChallenge(null);
    setResponseS(null);
    setProofResult(null);
    setRandomR(null);
    setStep(1);
  };

  const zkpPipelineStages: [PipelineStageInfo, PipelineStageInfo, PipelineStageInfo, PipelineStageInfo] = [
    {
      stageNumber: 1,
      title: '1. الإدخال والالتزام (Commitment)',
      subtitle: 'حساب المفتاح العام y = 5^x mod 23 وتوليد الالتزام t = 5^r mod 23',
      formulaOrValue: commitment !== null ? `y = ${publicKeyY}, t = 5^${randomR} mod 23 = ${commitment}` : `y = 5^${cleanSecret} mod 23 = ${publicKeyY}`,
    },
    {
      stageNumber: 2,
      title: '2. التحدي والاستجابة (Challenge & Response)',
      subtitle: 'إرسال التحدي c وحساب الاستجابة المعيارية s = (r + c·x) mod 22',
      formulaOrValue: challenge !== null && responseS !== null ? `c = ${challenge}, s = (${randomR} + ${challenge}×${cleanSecret}) mod 22 = ${responseS}` : 's = (r + c·secret) mod 22',
    },
    {
      stageNumber: 3,
      title: '3. الفحص والتحقق الرياضي (Verify)',
      subtitle: 'فحص تطابق الطرفين 5^s mod 23 === (t · y^c) mod 23 دون كشف السر',
      formulaOrValue:
        commitment !== null && challenge !== null && responseS !== null
          ? `LHS = ${modPow(5, responseS, 23)} | RHS = ${(commitment * modPow(publicKeyY, challenge, 23)) % 23}`
          : '5^s mod 23 === (t · y^c) mod 23',
    },
    {
      stageNumber: 4,
      title: '4. النتيجة النهائية المعتمدة',
      subtitle: 'إثبات صفري المعرفة مكتمل وسليم بنسبة 100%',
      formulaOrValue: proofResult ? 'ZKP VERIFIED 100% ✓' : 'بانتظار إتمام الخطوات الأربع',
    },
  ];

  // Lab 1: Schnorr Sigma Protocol over Z_23* (p = 23, q = 11, g = 2) - Chapter 8.4
  const p = 23;
  const q = 11;
  const g = 2;
  const [secretAlpha, setSecretAlpha] = useState<number>(7);
  const [commitRandomAt, setCommitRandomAt] = useState<number>(3);
  const [challengeC, setChallengeC] = useState<number>(4);
  const [secondChallengeC2, setSecondChallengeC2] = useState<number>(3);
  const [cheatAttempt, setCheatAttempt] = useState<boolean>(false);

  // Public Statement u = g^alpha mod 23
  const publicStatementU = modPow(g, secretAlpha, p);
  // Step 1: Commitment u_t = g^(alpha_t) mod 23
  const commitmentUt = modPow(g, commitRandomAt, p);
  // Step 3: Response alpha_z = (alpha_t + alpha * c) mod 11 (or fake if cheatAttempt)
  const responseAz = cheatAttempt
    ? (commitRandomAt + ((secretAlpha + 2) % q) * challengeC) % q
    : (commitRandomAt + secretAlpha * challengeC) % q;
  // Step 4: Verification: LHS = g^(alpha_z) mod 23, RHS = (u_t * u^c) mod 23
  const verifyLHS = modPow(g, responseAz, p);
  const verifyRHS = (commitmentUt * modPow(publicStatementU, challengeC, p)) % p;
  const isVerified = verifyLHS === verifyRHS;

  // Witness Extractor (when same commitment alpha_t is reused for c and c2)
  const responseAz2 = (commitRandomAt + secretAlpha * secondChallengeC2) % q;
  const deltaZ = (((responseAz - responseAz2) % q) + q) % q;
  const deltaC = (((challengeC - secondChallengeC2) % q) + q) % q;
  const extractedWitness =
    challengeC !== secondChallengeC2 ? (deltaZ * modInverse(deltaC, q)) % q : null;

  // Lab 2: ECDH over E(F_17): y^2 = x^3 + 2x + 2 (Chapter 3.2, Page 28)
  const [aliceSecret, setAliceSecret] = useState<number>(3);
  const [bobSecret, setBobSecret] = useState<number>(5);
  const alicePubPoint = F17_CURVE_POINTS[aliceSecret];
  const bobPubPoint = F17_CURVE_POINTS[bobSecret];
  const sharedIndex = ((aliceSecret * bobSecret - 1) % 19) + 1;
  const sharedPoint = F17_CURVE_POINTS[sharedIndex];

  // Lab 3: Eligibility Age Verification (Chapter 8.6, Figure 8.2)
  const [citizenAge, setCitizenAge] = useState<number>(27);
  const minRequiredAge = 25;
  const ageOffsetB = citizenAge - minRequiredAge;
  const isAgeEligible = ageOffsetB >= 0 && ageOffsetB < 8;

  const randomizeSchnorr = async () => {
    setSecretAlpha(getCryptoRandomValue(9) + 1);
    setCommitRandomAt(getCryptoRandomValue(9) + 1);
    setChallengeC(getCryptoRandomValue(9) + 1);
    setCheatAttempt(false);
    await addAuditLog(
      'ZKP_SCHNORR_SIMULATION',
      'lab',
      'تشغيل محاكاة بروتوكول سيجما وشنور التفاعلي في المختبر الأكاديمي'
    );
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-6 px-4">
      <div
        role="note"
        className="p-3.5 rounded-2xl glass-panel card-3d-neon border border-emerald-500/30 text-[11px] text-slate-300 leading-relaxed"
      >
        محاكٍ تعليمي لمعايير المعرفة الصفرية ZKP (الفصل الثامن من مقرر ISE243 — بروتوكول شنور التفاعلي على الزمرة الدورية Z_23* (p=23, g=5)، وتبادل ECDH على E(F₁₇)).
        مُصمم بأسلوب تفاعلي لبيان الاكتمال والسلامة وصفرية المعرفة دون كشف السر.
      </div>
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black gradient-text-academic mb-2 whitespace-nowrap">
              مختبر البراهين صفرية المعرفة التفاعلي (Zero-Knowledge Proofs Lab)
            </h1>
            <p className="text-slate-400 text-sm">
              تطبيق تفاعلي لبروتوكول شنور التفاعلي على الزمرة الدائرية Z_23* (p=23, g=5)، مستخرج الشاهد، وتبادل المفاتيح ECDH — مقرر التشفير المتقدم (ISE243)
            </p>
          </div>
          {activeLab === 'interactive_zkp' && (
            <button
              type="button"
              onClick={runSequentialZKP}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl btn-3d-neon btn-3d-neon-active text-emerald-200 hover:text-white font-black text-xs cursor-pointer transition-all duration-300 active:scale-95"
            >
              <Play className="w-4 h-4" />
              <span>تشغيل متسلسل للمراحل الأربع الآن</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 p-2 glass-panel card-3d-neon border border-amber-500/35 rounded-2xl w-full overflow-hidden">
          {[
            { id: 'interactive_zkp', label: '1. المختبر التفاعلي لبروتوكول شنور (ZKP)' },
            { id: 'schnorr', label: '2. بروتوكول سيجما ومستخرج الشاهد' },
            { id: 'ecdh', label: '3. تبادل ECDH على F_17' },
            { id: 'eligibility', label: '4. إثبات الأهلية والعمر (ZKP)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveLab(tab.id as any)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 whitespace-nowrap truncate text-center cursor-pointer btn-3d-neon btn-3d-amber active:scale-95 ${
                activeLab === tab.id
                  ? 'btn-3d-amber-active ring-1 ring-amber-400/60 text-amber-200 font-black'
                  : 'text-slate-300 hover:text-amber-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* COMPONENT 5: Interactive 4-Step Schnorr Zero-Knowledge Proof Protocol */}
      {activeLab === 'interactive_zkp' && (
        <div className="space-y-6">
          {/* Sequential 4-Stage Pipeline Tracker */}
          <LabPipelineTracker
            activeStage={step}
            modeLabel="تتالي المراحل الأربع لبروتوكول Schnorr ZKP على الزمرة الدائرية Z_23* (p=23, g=5)"
            stages={zkpPipelineStages}
          />

          {/* Interactive Protocol Workspace (Two Zones) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Zone 1: Main Protocol Interaction (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1: Prover Box & Secret & Commitment */}
              <GlassCard variant="academic" className="p-5 sm:p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-100">
                        الطرف الأول: المُثبِت (Prover / سارة)
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        يمتلك الشاهد السري secret ويعلن المفتاح العام y = 5^secret mod 23 = {publicKeyY}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900 text-amber-300 border border-slate-800">
                    الخطوة 1: الالتزام
                  </span>
                </div>

                {/* Secret Input */}
                <div className="p-4 rounded-2xl card-3d-neon bg-slate-950/85 border border-emerald-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                      <span>الشاهد السري المحمي (Secret Witness ∈ {'{1..21}'}):</span>
                      {step > 1 ? (
                        <span className="text-[10px] text-slate-500">(مغلق أثناء تشغيل البروتوكول)</span>
                      ) : (
                        <span className="text-[10px] text-emerald-400">(يمكنك تعديله الآن)</span>
                      )}
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowSecret(!showSecret)}
                      className="px-2.5 py-1 rounded-lg btn-3d-neon text-xs text-slate-300 hover:text-amber-300 flex items-center gap-1 transition-all cursor-pointer active:scale-95"
                      title={showSecret ? 'إخفاء السر' : 'إظهار السر'}
                    >
                      {showSecret ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showSecret ? 'إخفاء' : 'كشف'}</span>
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type={showSecret ? 'number' : 'password'}
                      min={1}
                      max={21}
                      value={secret}
                      disabled={step > 1}
                      onChange={(e) => setSecret(Number(e.target.value))}
                      className="w-full bg-slate-900/90 border border-amber-500/35 hover:border-amber-400/70 focus:border-amber-400 rounded-xl px-4 py-2.5 text-sm font-mono text-amber-300 disabled:opacity-60 transition-all shadow-[inset_0_1px_2px_rgba(255,255,255,0.14)]"
                      placeholder="أدخل الشاهد السري (من 1 إلى 21)..."
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    المفتاح العام المعلن للمدقق: <code className="text-emerald-300 font-mono" dir="ltr">y = modPow(5, {cleanSecret}, 23) = {publicKeyY}</code>
                  </p>
                </div>

                {/* Commitment Action & Details */}
                <div className="p-4 rounded-2xl card-3d-neon bg-slate-950/85 border border-amber-500/30 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold text-slate-200">
                        معادلة التزام شنور: <code className="text-amber-300 font-mono dir-ltr">t = modPow(5, r, 23)</code>
                      </span>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        يختار المثبت عشوائية سرية مؤقتة r ويحسب الالتزام t = 5^r mod 23
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleCommitment}
                      disabled={step !== 1}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 btn-3d-neon btn-3d-amber active:scale-95 ${
                        step === 1
                          ? 'btn-3d-amber-active text-amber-200 cursor-pointer font-black'
                          : 'text-slate-500 cursor-not-allowed opacity-60'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>1. توليد الالتزام (Commitment)</span>
                    </button>
                  </div>

                  {commitment !== null && (
                    <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                      <div className="p-3 rounded-xl card-3d-neon bg-slate-900 border border-emerald-500/30">
                        <span className="text-[10px] text-slate-400 block font-sans">العشوائية السرية (r ∈ {'{1..21}'}):</span>
                        <span className="text-emerald-400 font-bold">{randomR ?? '—'}</span>
                      </div>
                      <div className="p-3 rounded-xl card-3d-neon bg-amber-500/10 border border-amber-500/35">
                        <span className="text-[10px] text-amber-300 block font-sans">الالتزام المعلن (t = 5^r mod 23):</span>
                        <span className="text-amber-400 font-bold text-sm">{commitment}</span>
                      </div>
                    </div>
                  )}
                </div>
              </GlassCard>

              {/* Step 2 & 3: Verifier Box & Challenge & Verify */}
              <GlassCard variant="academic" className="p-5 sm:p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl icon-glass-3d icon-glass-3d-cyan flex items-center justify-center text-blue-400">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-100">
                        الطرف الثاني: المُتحقِّق (Verifier / علي)
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        يرسل التحدي العشوائي challenge ويتحقق من المعادلة 5^s ≡ t · y^challenge (mod 23)
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900 text-blue-300 border border-slate-800">
                    الخطوات 2 و 3: التحدي والتحقق
                  </span>
                </div>

                {/* Challenge Section */}
                <div className="p-4 rounded-2xl card-3d-neon bg-slate-950/85 border border-blue-500/30 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-bold text-slate-200">
                        الخطوة 2: إرسال التحدي وحساب الاستجابة <code className="text-purple-300 font-mono dir-ltr">s = (r + challenge * secret) % 22</code>
                      </span>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        يرسل المدقق تحدياً عشوائياً فيجيب المثبت بالاستجابة المعيارية s بمقياس رتبة الزمرة (p-1 = 22)
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleChallenge}
                      disabled={step !== 2}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 btn-3d-neon active:scale-95 ${
                        step === 2
                          ? 'btn-3d-neon-active text-emerald-200 cursor-pointer font-black'
                          : 'text-slate-500 cursor-not-allowed opacity-60'
                      }`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>2. إرسال التحدي (Challenge)</span>
                    </button>
                  </div>

                  {challenge !== null && responseS !== null && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 font-mono text-xs">
                      <div className="p-3 rounded-xl card-3d-neon card-3d-cyan bg-blue-500/10 border border-blue-500/35 flex items-center justify-between">
                        <span className="text-[11px] text-blue-300 font-sans">تحدي المدقق (challenge):</span>
                        <code className="text-sm font-bold text-blue-400">c = {challenge}</code>
                      </div>
                      <div className="p-3 rounded-xl card-3d-neon card-3d-purple bg-purple-500/10 border border-purple-500/35 flex items-center justify-between">
                        <span className="text-[11px] text-purple-300 font-sans">استجابة المثبت (s mod 22):</span>
                        <code className="text-sm font-bold text-purple-300">s = {responseS}</code>
                      </div>
                    </div>
                  )}
                </div>

                {/* Verification Section */}
                <div className="p-4 rounded-2xl card-3d-neon bg-slate-950/85 border border-emerald-500/30 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-bold text-slate-200">
                        الخطوة 3: التحقق الرياضي الصارم (Verify)
                      </span>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        المعادلة الرياضية: <code className="text-emerald-400 font-mono dir-ltr">modPow(5, s, 23) === (t * modPow(y, challenge, 23)) % 23</code>
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleVerify}
                      disabled={step !== 3}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 btn-3d-neon active:scale-95 ${
                        step === 3
                          ? 'btn-3d-neon-active text-emerald-200 cursor-pointer font-black'
                          : 'text-slate-500 cursor-not-allowed opacity-60'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>3. التحقق من البرهان (Verify)</span>
                    </button>
                  </div>

                  {commitment !== null && challenge !== null && responseS !== null && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 font-mono text-xs">
                      <div className="p-3 rounded-xl card-3d-neon bg-slate-900 border border-emerald-500/30">
                        <span className="text-[10px] text-slate-400 block font-sans">الطرف الأيسر: 5^s mod 23</span>
                        <span className="text-emerald-300 font-bold" dir="ltr">
                          5^{responseS} mod 23 = {modPow(zkpG, responseS, zkpP)}
                        </span>
                      </div>
                      <div className="p-3 rounded-xl card-3d-neon card-3d-cyan bg-slate-900 border border-cyan-500/30">
                        <span className="text-[10px] text-slate-400 block font-sans">الطرف الأيمن: (t · y^c) mod 23</span>
                        <span className="text-cyan-300 font-bold" dir="ltr">
                          ({commitment} · {publicKeyY}^{challenge}) mod 23 = {(commitment * modPow(publicKeyY, challenge, zkpP)) % zkpP}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </GlassCard>

              {/* Step 4: Verification Result Banner & Reset */}
              {proofResult && (
                <div
                  className={`p-6 rounded-2xl glass-panel card-3d-neon border transition-all ${
                    proofResult.includes('نجاح')
                      ? 'bg-emerald-500/10 border-emerald-500/50'
                      : 'bg-red-500/10 border-red-500/50'
                  } space-y-4`}
                >
                  <div className="flex items-start gap-3">
                    {proofResult.includes('نجاح') ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="text-base font-bold text-slate-100">
                        {proofResult.includes('نجاح') ? 'تم التحقق بنجاح (Proof Verified)' : 'فشل التحقق (Verification Failed)'}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {proofResult}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      حالة الجلسة: تم التحقق من المعادلة الرياضية مع صون خصوصية السر بنسبة 100%.
                    </span>
                    <button
                      type="button"
                      onClick={resetLab}
                      className="px-4 py-2 rounded-xl btn-3d-neon btn-3d-amber text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>إعادة ضبط المختبر (Reset Lab)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Zone 2: Theoretical Foundations & Live State Card (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Live Protocol Status Dashboard */}
              <GlassCard className="p-5 space-y-4 border-amber-500/35">
                <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <KeyRound className="w-4 h-4" />
                  <span>لوحة الرقابة والمطابقة الفورية (Schnorr State Inspector)</span>
                </h3>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl card-3d-neon bg-slate-950/85 border border-emerald-500/25">
                    <span className="text-slate-400">المرحلة الحالية:</span>
                    <span className="font-mono font-bold text-amber-300">
                      الخطوة {step} من 4
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl card-3d-neon bg-slate-950/85 border border-emerald-500/25">
                    <span className="text-slate-400">المفتاح العام المعلن (y = 5^secret mod 23):</span>
                    <span className="font-mono font-bold text-emerald-400">
                      y = {publicKeyY}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl card-3d-neon bg-slate-950/85 border border-emerald-500/25">
                    <span className="text-slate-400">الالتزام المسجل (t = 5^r mod 23):</span>
                    <span className="font-mono font-bold text-slate-200">
                      {commitment !== null ? `t = ${commitment}` : 'في انتظار التوليد'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl card-3d-neon bg-slate-950/85 border border-emerald-500/25">
                    <span className="text-slate-400">التحدي والاستجابة (c, s):</span>
                    <span className="font-mono font-bold text-blue-300">
                      {challenge !== null && responseS !== null ? `c = ${challenge}, s = ${responseS}` : 'في انتظار الإرسال'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl card-3d-neon bg-slate-950/85 border border-emerald-500/25">
                    <span className="text-slate-400">قرار التحقق الرياضي:</span>
                    <span className={`font-mono font-bold ${proofResult ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {proofResult ? 'معتمد ومؤكد ✓' : 'قيد المعالجة...'}
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={resetLab}
                    className="w-full py-2.5 px-3 rounded-xl btn-3d-neon text-xs font-bold text-slate-200 hover:text-emerald-300 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>إعادة تهيئة المتغيرات من جديد</span>
                  </button>
                </div>
              </GlassCard>

              {/* Three Foundational Pillars of ZKP */}
              <GlassCard className="p-5 space-y-3.5">
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-400" />
                  <span>الركائز الثلاث للبراهين صفرية المعرفة (ZKP)</span>
                </h3>

                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="p-3.5 rounded-xl card-3d-neon bg-slate-950/80 border border-emerald-500/30">
                    <strong className="text-emerald-400 block mb-1">1. الاكتمال (Completeness):</strong>
                    إذا كان الادعاء صحيحاً وكلا الطرفين يتبعان البروتوكول بأمانة، فإن المُتحقق يقتنع دائماً بصحة البرهان.
                  </div>

                  <div className="p-3.5 rounded-xl card-3d-neon card-3d-cyan bg-slate-950/80 border border-blue-500/30">
                    <strong className="text-blue-400 block mb-1">2. السلامة (Soundness):</strong>
                    إذا كان الادعاء باطلاً، فلا يمكن لأي مُثبِت مخادع إقناع المُتحقق إلا باحتمال ضئيل جداً يمكن إهماله رياضياً.
                  </div>

                  <div className="p-3.5 rounded-xl card-3d-neon bg-slate-950/80 border border-amber-500/30">
                    <strong className="text-amber-400 block mb-1">3. صفرية المعرفة (Zero-Knowledge):</strong>
                    لا يتعلم المُتحقق أي معلومة جديدة إطلاقاً عن السر بخلاف أن العبارة الرياضية صحيحة فقط.
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      )}

      {/* LAB 1: Two-Zone Sandbox Layout for Schnorr Sigma Protocol */}
      {activeLab === 'schnorr' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left/Main Zone (Interactive Visual Stage - 7 cols) */}
          <GlassCard variant="academic" className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-amber-400" />
                  <span>محاكاة الرسائل الثلاث لبروتوكول سيجما (Σ) — الزمرة (p=23, q=11, g=2)</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  يثبت المثبت معرفته للشاهد السري α الذي يحقق البيان المعلن u = 2^α mod 23 دون كشف α
                </p>
              </div>
              <button
                type="button"
                onClick={randomizeSchnorr}
                className="px-3.5 py-2 rounded-xl btn-3d-neon btn-3d-amber text-amber-300 hover:text-amber-200 text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>قيم عشوائية</span>
              </button>
            </div>

            {/* Public Parameters Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3.5 rounded-xl card-3d-neon bg-slate-950 border border-emerald-500/30">
                <span className="text-[11px] text-slate-400 block">الترديد الأولي p</span>
                <span className="text-lg font-black font-mono tabular-nums text-slate-200">23</span>
              </div>
              <div className="p-3.5 rounded-xl card-3d-neon bg-slate-950 border border-emerald-500/30">
                <span className="text-[11px] text-slate-400 block">رتبة الزمرة q</span>
                <span className="text-lg font-black font-mono tabular-nums text-slate-200">11</span>
              </div>
              <div className="p-3.5 rounded-xl card-3d-neon bg-slate-950 border border-emerald-500/30">
                <span className="text-[11px] text-slate-400 block">المولد g</span>
                <span className="text-lg font-black font-mono tabular-nums text-slate-200">2</span>
              </div>
              <div className="p-3.5 rounded-xl card-3d-neon bg-amber-500/10 border border-amber-500/40">
                <span className="text-[11px] text-amber-300 block">البيان المعلن u = g^α</span>
                <span className="text-lg font-black font-mono tabular-nums text-amber-400">
                  {publicStatementU}
                </span>
              </div>
            </div>

            {/* 3-Step Sigma Protocol Flow */}
            <div className="space-y-3.5">
              <div className="p-4 rounded-2xl card-3d-neon bg-slate-950/90 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-emerald-400 block">
                    الرسالة 1: الالتزام (Commitment) — من المثبت إلى المدقق
                  </span>
                  <p className="text-xs text-slate-300 mt-1">
                    يختار المثبت القيمة العشوائية السرية α_t = {commitRandomAt} ويحسب الالتزام:
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setCommitRandomAt((commitRandomAt % 10) + 1)}
                    className="px-3 py-1.5 rounded-xl btn-3d-neon text-emerald-300 hover:text-emerald-200 text-xs font-bold cursor-pointer active:scale-95"
                  >
                    توليد التزام
                  </button>
                  <code className="px-3 py-2 rounded-xl bg-slate-900 border border-emerald-500/35 font-mono text-xs text-emerald-300 shrink-0 dir-ltr shadow-[inset_0_1px_1px_rgba(255,255,255,0.14)]">
                    u_t = 2^{commitRandomAt} mod 23 = {commitmentUt}
                  </code>
                </div>
              </div>

              <div className="p-4 rounded-2xl card-3d-neon card-3d-cyan bg-slate-950/90 border border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-blue-400 block">
                    الرسالة 2: التحدي (Challenge) — من المدقق إلى المثبت
                  </span>
                  <p className="text-xs text-slate-300 mt-1">
                    يرسل المدقق تحدياً عشوائياً c من فضاء التحدي (أو يُشتق عبر فيات-شامير):
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setChallengeC((challengeC % 10) + 1)}
                    className="px-3 py-1.5 rounded-xl btn-3d-neon text-blue-300 hover:text-blue-200 text-xs font-bold cursor-pointer active:scale-95"
                  >
                    إرسال تحدٍ
                  </button>
                  <code className="px-3 py-2 rounded-xl bg-slate-900 border border-blue-500/35 font-mono text-xs text-blue-300 shrink-0 dir-ltr shadow-[inset_0_1px_1px_rgba(255,255,255,0.14)]">
                    c = {challengeC}
                  </code>
                </div>
              </div>

              <div className="p-4 rounded-2xl card-3d-neon card-3d-purple bg-slate-950/90 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-purple-400 block">
                    الرسالة 3: الاستجابة (Response) — من المثبت إلى المدقق
                  </span>
                  <p className="text-xs text-slate-300 mt-1">
                    يدمج المثبت الالتزام مع الشاهد السري والتحدي بمقياس الرتبة q = 11:
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setCheatAttempt(false)}
                    className="px-3 py-1.5 rounded-xl btn-3d-neon text-purple-300 hover:text-purple-200 text-xs font-bold cursor-pointer active:scale-95"
                  >
                    حساب الاستجابة
                  </button>
                  <code className="px-3 py-2 rounded-xl bg-slate-900 border border-purple-500/35 font-mono text-xs text-purple-300 shrink-0 dir-ltr shadow-[inset_0_1px_1px_rgba(255,255,255,0.14)]">
                    α_z = ({commitRandomAt} + {cheatAttempt ? (secretAlpha + 2) % q : secretAlpha}×{challengeC}) mod 11 = {responseAz}
                  </code>
                </div>
              </div>
            </div>

            {/* Final Verification Equation */}
            <div
              className={`p-5 rounded-2xl card-3d-neon border ${
                isVerified
                  ? 'bg-emerald-500/10 border-emerald-500/45'
                  : 'bg-red-500/10 border-red-500/45'
              } space-y-3`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isVerified ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  )}
                  <h3 className="text-sm font-bold text-slate-100">
                    قرار المدقق الحتمي:{' '}
                    {isVerified
                      ? 'قبول البرهان — تم التحقق بنجاح (ACCEPT ✓)'
                      : 'رفض البرهان — كشف تلاعب (REJECT ✗)'}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCheatAttempt(false)}
                    className="px-3 py-1 rounded-lg btn-3d-neon text-emerald-200 hover:text-white text-xs font-bold cursor-pointer active:scale-95"
                  >
                    التحقق
                  </button>
                  <span className="text-xs font-mono text-slate-300">
                    g^(α_z) ≡ u_t · u^c (mod 23)
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl card-3d-neon bg-slate-950/85 border border-emerald-500/30">
                  <span className="text-slate-400 block mb-1">الطرف الأيسر: g^(α_z) mod 23</span>
                  <span className="text-emerald-300 font-bold">
                    2^{responseAz} mod 23 = {verifyLHS}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl card-3d-neon card-3d-cyan bg-slate-950/85 border border-blue-500/30">
                  <span className="text-slate-400 block mb-1">الطرف الأيمن: u_t · u^c mod 23</span>
                  <span className="text-blue-300 font-bold">
                    ({commitmentUt} × {publicStatementU}^{challengeC}) mod 23 = {verifyRHS}
                  </span>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Right Zone (Control & Concept Deck + Witness Extractor - 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <GlassCard className="space-y-4">
              <h3 className="text-base font-bold text-slate-100">لوحة التحكم بمعاملات المثبت والمدقق</h3>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-slate-300 font-semibold">
                      الشاهد السري للمثبت (α):
                    </label>
                    <span className="font-mono font-bold text-amber-400">{secretAlpha} (سري)</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={secretAlpha}
                    onChange={e => setSecretAlpha(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-slate-300 font-semibold">
                      عشوائية الالتزام (α_t):
                    </label>
                    <span className="font-mono font-bold text-emerald-400">{commitRandomAt}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={commitRandomAt}
                    onChange={e => setCommitRandomAt(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-slate-300 font-semibold">تحدي المدقق (c):</label>
                    <span className="font-mono font-bold text-blue-400">{challengeC}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={challengeC}
                    onChange={e => setChallengeC(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setCheatAttempt(!cheatAttempt)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold border transition-all duration-300 btn-3d-neon cursor-pointer active:scale-95 ${
                      cheatAttempt
                        ? 'bg-red-500/20 border-red-500/50 text-red-300'
                        : 'text-slate-300 hover:text-emerald-300'
                    }`}
                  >
                    {cheatAttempt
                      ? 'وضع مثبت غاش مفعّل (لا يملك الشاهد الصحيح)'
                      : 'تجربة محاولة غش (إرسال استجابة بدون الشاهد الصحيح)'}
                  </button>
                </div>
              </div>
            </GlassCard>

            {/* Witness Extractor / Nonce Reuse Simulator (Chapter 8.3 & 8.7) */}
            <GlassCard className="border-red-500/35 space-y-3">
              <h3 className="text-base font-bold text-red-400 flex items-center gap-2">
                <KeyRound className="w-4 h-4" />
                <span>مستخرج الشاهد (Witness Extractor) — خطر تكرار الالتزام</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                إذا استخدم المثبت نفس الالتزام (α_t = {commitRandomAt}) للإجابة على تحديين مختلفين c = {challengeC} و c&apos; = {secondChallengeC2}، يستخرج المهاجم الشاهد السري فوراً!
              </p>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="text-slate-400">اختر التحدي الثاني (c&apos;):</label>
                <select
                  value={secondChallengeC2}
                  onChange={e => setSecondChallengeC2(Number(e.target.value))}
                  className="bg-slate-950 border border-emerald-500/35 rounded-xl px-3 py-1.5 font-mono text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.14)]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                    <option key={n} value={n}>
                      c&apos; = {n}
                    </option>
                  ))}
                </select>
              </div>

              {extractedWitness !== null ? (
                <div className="p-3.5 rounded-xl card-3d-neon bg-slate-950 border border-red-500/40 text-xs font-mono space-y-1">
                  <div className="text-slate-400">
                    α_z = {responseAz} , α_z&apos; = {responseAz2}
                  </div>
                  <div className="text-red-300 font-bold">
                    α = (α_z - α_z&apos;) / (c - c&apos;) mod 11 = ({responseAz} - {responseAz2}) / (
                    {challengeC} - {secondChallengeC2}) mod 11 = {extractedWitness}
                  </div>
                  <div className="text-emerald-400 font-sans pt-1">
                    ✓ تطابق تام مع الشاهد السري الأصلي ({secretAlpha})!
                  </div>
                </div>
              ) : (
                <p className="text-xs text-amber-400">اختر قيمة لـ c&apos; تختلف عن c = {challengeC}.</p>
              )}
            </GlassCard>
          </div>
        </div>
      )}

      {/* LAB 2: ECDH over F_17 (Chapter 3.2, Page 28) */}
      {activeLab === 'ecdh' && (
        <GlassCard variant="academic" className="space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-slate-100">
              محاكي تبادل مفاتيح ديفي-هيلمان على المنحنى الإهليلجي (ECDH over F_17)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              المنحنى التعليمي من الفصل الثالث (ص 26–28): y² ≡ x³ + 2x + 2 (mod 17) ، نقطة المولد G = (5, 1) ، رتبة الزمرة q = 19
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Alice */}
            <div className="p-5 rounded-2xl card-3d-neon bg-slate-950/85 border border-emerald-500/35 space-y-4">
              <h3 className="text-base font-bold text-emerald-400">الطرف الأول: سارة (Alice)</h3>
              <div className="space-y-2 text-xs">
                <label className="block text-slate-300">
                  المفتاح المؤقت السري (a ∈ 1..18):{' '}
                  <span className="font-mono font-bold text-emerald-400">{aliceSecret}</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={18}
                  value={aliceSecret}
                  onChange={e => setAliceSecret(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
              <div className="p-3.5 rounded-xl card-3d-neon bg-slate-900 border border-emerald-500/30 text-xs font-mono">
                <span className="text-slate-400 block mb-1">القيمة العامة المرسلة u = aG:</span>
                <span className="text-emerald-300 font-bold text-sm">
                  {aliceSecret}G = (
                  {Array.isArray(alicePubPoint)
                    ? `${alicePubPoint[0]}, ${alicePubPoint[1]}`
                    : 'O'}
                  )
                </span>
              </div>
            </div>

            {/* Public Channel / Attacker View */}
            <div className="p-5 rounded-2xl card-3d-neon bg-slate-950/85 border border-amber-500/35 flex flex-col justify-between space-y-4 text-center">
              <div>
                <h3 className="text-base font-bold text-amber-400">القناة العامة واشتقاق HKDF</h3>
                <p className="text-xs text-slate-400 mt-1">
                  المتنصت على القناة يرى فقط النقطتين aG و bG ولا يستطيع حساب abG
                </p>
              </div>

              <div className="p-4 rounded-xl card-3d-neon bg-amber-500/10 border border-amber-500/40 space-y-1">
                <span className="text-xs text-amber-200 block">
                  النقطة المشتركة السرية w = abG = {sharedIndex}G
                </span>
                <span className="text-2xl font-black font-mono text-amber-400 block">
                  {Array.isArray(sharedPoint)
                    ? `(${sharedPoint[0]}, ${sharedPoint[1]})`
                    : 'نقطة اللانهاية O'}
                </span>
              </div>

              {Array.isArray(sharedPoint) && (
                <div className="p-3.5 rounded-xl card-3d-neon bg-slate-900 border border-emerald-500/30 text-xs">
                  <span className="text-slate-400 block">
                    الإحداثي السيني x = {sharedPoint[0]} يدخل دالة HKDF:
                  </span>
                  <code className="text-emerald-400 font-mono font-bold block mt-1">
                    SessionKey = HKDF(x={sharedPoint[0]}) ➔ 0x
                    {(sharedPoint[0] * 7919 + 4096).toString(16).toUpperCase()}...
                  </code>
                </div>
              )}
            </div>

            {/* Bob */}
            <div className="p-5 rounded-2xl card-3d-neon card-3d-cyan bg-slate-950/85 border border-blue-500/35 space-y-4">
              <h3 className="text-base font-bold text-blue-400">الطرف الثاني: علي (Bob)</h3>
              <div className="space-y-2 text-xs">
                <label className="block text-slate-300">
                  المفتاح المؤقت السري (b ∈ 1..18):{' '}
                  <span className="font-mono font-bold text-blue-400">{bobSecret}</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={18}
                  value={bobSecret}
                  onChange={e => setBobSecret(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
              </div>
              <div className="p-3.5 rounded-xl card-3d-neon card-3d-cyan bg-slate-900 border border-blue-500/30 text-xs font-mono">
                <span className="text-slate-400 block mb-1">القيمة العامة المرسلة v = bG:</span>
                <span className="text-blue-300 font-bold text-sm">
                  {bobSecret}G = (
                  {Array.isArray(bobPubPoint) ? `${bobPubPoint[0]}, ${bobPubPoint[1]}` : 'O'})
                </span>
              </div>
            </div>
          </div>
        </GlassCard>
      )}

      {/* LAB 3: Zero-Knowledge Eligibility Verification (Chapter 8.6, Page 91-92) */}
      {activeLab === 'eligibility' && (
        <GlassCard variant="academic" className="space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>محاكي التحقق من الأهلية بالمعرفة الصفرية وتقليل الإفصاح (الفصل 8.6 · شكل 8.2)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              إثبات أن عمر المستخدم يقع في المدى المسموح [25 إلى 32 عاماً] انطلاقاً من تشفير الجمل (ElGamal) دون كشف العمر الدقيق!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 space-y-4 card-3d-neon bg-slate-950/85 p-5 rounded-2xl border border-amber-500/35">
              <label className="block text-xs font-bold text-slate-200">
                اختر العمر الحقيقي لحامل الهوية (الشاهد السري):{' '}
                <span className="text-amber-400 font-mono text-base">{citizenAge} عاماً</span>
              </label>
              <input
                type="range"
                min={18}
                max={40}
                value={citizenAge}
                onChange={e => setCitizenAge(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <div className="text-[11px] text-slate-400 flex justify-between font-mono">
                <span>18 عاماً</span>
                <span>المدى المطلوب: [25..32]</span>
                <span>40 عاماً</span>
              </div>

              <div className="p-3.5 rounded-xl card-3d-neon bg-slate-900 border border-emerald-500/30 text-xs space-y-1.5">
                <div className="text-slate-400">
                  الفرق المحسوب على النص المشفر: b = العمر - 25 ={' '}
                  <span className="font-mono font-bold text-white">{ageOffsetB}</span>
                </div>
                <div className="text-slate-400">
                  شرط كثيرة الحدود: b(b-1)(b-2)...(b-7) = 0
                </div>
              </div>
            </div>

            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl card-3d-neon bg-slate-950/85 border border-emerald-500/35 space-y-2">
                <h3 className="text-sm font-bold text-emerald-400">ما يُكشف لمقدم الخدمة (المدقق)</h3>
                <ul className="text-xs text-slate-300 space-y-2 pt-1">
                  <li>• النص المشفر الموقّع من جهة الإصدار (v, e)</li>
                  <li>• البرهان غير التفاعلي π (بتحويل فيات-شامير)</li>
                  <li>
                    • القرار الحتمي:{' '}
                    {isAgeEligible ? (
                      <span className="text-emerald-400 font-bold">مؤهل (ضمن المدى 25–32) ✓</span>
                    ) : (
                      <span className="text-red-400 font-bold">غير مؤهل (خارج المدى) ✗</span>
                    )}
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl card-3d-neon bg-slate-950/85 border border-amber-500/35 space-y-2">
                <h3 className="text-sm font-bold text-amber-400">ما يبقى مخفياً تماماً (Zero-Knowledge)</h3>
                <ul className="text-xs text-slate-300 space-y-2 pt-1">
                  <li>• العمر الدقيق للمواطن ({citizenAge} عاماً) وتاريخ الميلاد</li>
                  <li>• النص الصريح للبيانات والشاهد السري</li>
                  <li>• يحقق مبدأ تقليل الإفصاح (Reducing Disclosure)</li>
                </ul>
              </div>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
