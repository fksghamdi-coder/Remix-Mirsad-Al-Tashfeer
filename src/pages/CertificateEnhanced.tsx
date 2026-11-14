// Phase 2: Enhanced Certificate — Academic Motivational Certificate
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Lock, Sparkles, CheckCircle2, ShieldAlert, Download, Share2, ExternalLink } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getProgress, getCompletionPercent, getAverageScore } from '@/lib/progress';
import {
  createCertificate,
  storeCertificate,
  getCertificatesByUid,
  LocalCertificateRecord,
  COURSE,
} from '@/lib/certificates';

export default function CertificateEnhanced() {
  const { session } = useAuth();
  const [percent, setPercent] = useState(0);
  const [avgScore, setAvgScore] = useState(0);
  const [certs, setCerts] = useState<LocalCertificateRecord[]>([]);
  const [generating, setGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (!session) return;
    const prog = getProgress(session.username);
    void prog;
    setPercent(getCompletionPercent(session.username, 12));
    setAvgScore(getAverageScore(session.username));
    setCerts(getCertificatesByUid(session.username));
  }, [session]);

  const handleGenerate = async () => {
    if (!session || generating) return;
    setGenerating(true);
    try {
      const cert = await createCertificate(
        session.username,
        session.fullName || session.displayName || session.username,
        COURSE.code,
        COURSE.title,
        avgScore || percent,
        'فريق مِرْصَاد التشفير الأكاديمي'
      );
      storeCertificate(cert);
      setCerts((prev) => [...prev, cert]);
    } finally {
      setGenerating(false);
    }
  };

  const activeCert = certs[certs.length - 1] ?? null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6" dir="rtl">
      {/* Important Disclaimer Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5"
      >
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-black text-amber-300 mb-1">تنبيه أكاديمي مهم</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              الشهادة الصادرة من هذه المنصة هي{' '}
              <strong className="text-amber-200">شهادة تحفيزية أكاديمية</strong> صادرة من مشروع مِرْصَاد التشفير
              (مقرر ISE243 — جامعة الأمير مقرن بن عبدالعزيز)، وتهدف إلى تحفيز الطلاب على إتمام المحتوى التعليمي.{' '}
              <strong className="text-amber-200">
                هذه الشهادة ليست شهادة مهنية أو رسمية معتمدة من أي جهة حكومية أو تعليمية.
              </strong>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Progress Summary */}
      <div className="glass-panel p-8 rounded-3xl text-center space-y-4">
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 w-fit mx-auto text-amber-400">
          <Award className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-black gradient-text">شهادة الإتمام التحفيزية</h1>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          مقرر التشفير المتقدم والأمن السيبراني التطبيقي (ISE243)
        </p>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto space-y-2 pt-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-400">نسبة إنجاز الفصول</span>
            <span className="text-emerald-400">{percent}%</span>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-gradient-to-l from-amber-500 to-emerald-500 rounded-full transition-all duration-1000"
              style={{ width: `${percent}%` }}
            />
          </div>
          {avgScore > 0 && <p className="text-xs text-slate-400">متوسط درجات الاختبارات: {avgScore}%</p>}
        </div>
      </div>

      {/* Certificate Display */}
      {activeCert ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>شهادتك التحفيزية الأكاديمية</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">معرف التحقق: {activeCert.certId}</p>
            </div>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" /> صالحة
            </span>
          </div>

          {/* Certificate Card */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/30 p-8 md:p-12">
            {/* Decorative corners */}
            <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-amber-500/30 rounded-tr-2xl" />
            <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-amber-500/30 rounded-tl-2xl" />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-amber-500/30 rounded-br-2xl" />
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-amber-500/30 rounded-bl-2xl" />

            <div className="text-center space-y-6 relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                <Award className="w-4 h-4" /> شهادة تحفيزية أكاديمية — غير رسمية
              </div>

              {/* University */}
              <div>
                <p className="text-xs text-slate-400">جامعة الأمير مقرن بن عبدالعزيز</p>
                <p className="text-sm text-slate-300 font-bold mt-0.5">كلية علوم وهندسة الحاسب — قسم الأمن السيبراني</p>
              </div>

              {/* Title */}
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-amber-300 mb-2">شهادة إتمام تحفيزية</h2>
                <p className="text-xs text-slate-400">تُمنح هذه الشهادة تقديراً لإتمام المحتوى التعليمي في</p>
              </div>

              {/* Course */}
              <div className="py-3 px-6 rounded-2xl bg-slate-800/60 border border-slate-700/50 inline-block">
                <p className="text-lg font-black text-emerald-400">{activeCert.courseTitle}</p>
                <p className="text-xs font-mono text-slate-400 mt-0.5">{activeCert.courseCode}</p>
              </div>

              {/* Recipient */}
              <div>
                <p className="text-xs text-slate-400 mb-1">الطالب / المتعلم</p>
                <p className="text-2xl font-black text-slate-100">{activeCert.studentName}</p>
              </div>

              {/* Score & Date */}
              <div className="flex items-center justify-center gap-8 text-sm">
                <div>
                  <span className="text-xs text-slate-400 block">نسبة الإنجاز</span>
                  <span className="font-black text-emerald-400">{activeCert.scorePercentage}%</span>
                </div>
                <div className="w-px h-8 bg-slate-700" />
                <div>
                  <span className="text-xs text-slate-400 block">تاريخ الإصدار</span>
                  <span className="font-bold text-slate-200">
                    {new Date(activeCert.issuedAt).toLocaleDateString('ar-SA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              {/* Verification Info */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <p className="text-[11px] font-mono text-slate-500">معرف الشهادة: {activeCert.certId}</p>
                <p className="text-[10px] font-mono text-slate-600 break-all">
                  بصمة SHA-256: {activeCert.integrityHash.slice(0, 32)}...
                </p>
                <p className="text-[10px] text-amber-400/70 max-w-lg mx-auto leading-relaxed mt-2">
                  {activeCert.disclaimer}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-all"
            >
              <Download className="w-4 h-4" /> طباعة / حفظ PDF
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(`${window.location.origin}/verify/${activeCert.certId}`);
                setCopiedId(activeCert.certId);
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold border border-slate-700 transition-all"
            >
              <Share2 className="w-4 h-4" /> {copiedId === activeCert.certId ? 'تم نسخ رابط التحقق!' : 'نسخ رابط التحقق'}
            </button>
            <a
              href={`/verify/${activeCert.certId}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium border border-slate-700 transition-all"
            >
              <ExternalLink className="w-4 h-4" /> صفحة التحقق
            </a>
          </div>
        </motion.div>
      ) : (
        /* Generate Certificate Section */
        <div className="glass-panel p-8 rounded-3xl text-center space-y-4 border border-slate-800">
          {percent >= 50 ? (
            <>
              <Sparkles className="w-12 h-12 text-amber-400 mx-auto" />
              <h3 className="text-lg font-bold text-slate-200">أنت مؤهل للحصول على شهادة تحفيزية!</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                لقد أتممت {percent}% من فصول المقرر. يمكنك الآن إصدار شهادة إتمام تحفيزية أكاديمية ببصمة رقمية SHA-256.
              </p>
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="px-6 py-3 rounded-xl bg-gradient-to-l from-emerald-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 text-white font-bold text-sm transition-all shadow-lg disabled:opacity-50"
              >
                {generating ? 'جاري الإصدار...' : 'إصدار الشهادة التحفيزية'}
              </button>
            </>
          ) : (
            <>
              <Lock className="w-12 h-12 text-slate-500 mx-auto" />
              <h3 className="text-lg font-bold text-slate-300">أكمل 50% على الأقل من الفصول لإصدار الشهادة</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                نسبة إنجازك الحالية: {percent}%. أتمم قراءة الفصول واجتز الاختبارات القصيرة لتتمكن من إصدار شهادتك التحفيزية.
              </p>
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="text-xs text-emerald-400 underline hover:text-emerald-300"
              >
                {showPreview ? 'إخفاء المعاينة' : 'معاينة شكل الشهادة'}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export { CertificateEnhanced };
