import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import {
  ShieldCheck,
  ShieldAlert,
  Award,
  Calendar,
  User,
  Hash,
  ArrowRight,
  Search,
  Printer,
  Lock,
  WifiOff,
  FileQuestion,
  Loader2,
} from 'lucide-react';
import { verifyCertificate, VerifyResult } from '@/lib/certificates';

export default function VerifyCertificate() {
  const { hash: urlId } = useParams<{ hash?: string }>(); // المسار /verify/:hash يحمل رقم الشهادة
  const [searchParams] = useSearchParams();
  const queryId = searchParams.get('id');

  const initialInput = urlId || queryId || '';
  const [searchInput, setSearchInput] = useState(initialInput);
  const [activeQuery, setActiveQuery] = useState(initialInput);
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (urlId || queryId) {
      setSearchInput(urlId || queryId || '');
      setActiveQuery(urlId || queryId || '');
    }
  }, [urlId, queryId]);

  // التحقق الحقيقي من السجل الرسمي (لا بيانات افتراضية ولا درجات مختلقة)
  useEffect(() => {
    if (!activeQuery.trim()) {
      setResult(null);
      return;
    }
    let alive = true;
    setLoading(true);
    verifyCertificate(activeQuery).then((r) => {
      if (alive) {
        setResult(r);
        setLoading(false);
      }
    });
    return () => {
      alive = false;
    };
  }, [activeQuery]);

  const certificate = result && (result.state === 'valid' || result.state === 'revoked') ? result.cert : null;
  const issuedDate = certificate?.issuedAt && 'toDate' in certificate.issuedAt ? certificate.issuedAt.toDate() : null;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) setActiveQuery(searchInput.trim());
  };

  const formattedDate = issuedDate
    ? new Intl.DateTimeFormat('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' }).format(issuedDate)
    : '—';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 sm:p-8">
      {/* Top Brand Bar */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between pb-6 border-b border-slate-800">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-amber-500 p-0.5 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <h2 className="text-base font-black text-white group-hover:text-emerald-400 transition-colors">
              مِرْصَاد التشفير
            </h2>
            <p className="text-[10px] text-slate-400 font-mono">
              بوابة التحقق العام من الشهادات الرقمية
            </p>
          </div>
        </Link>

        <Link
          to="/"
          className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1.5 transition-colors"
        >
          <span>الرئيسية</span>
          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
        </Link>
      </div>

      {/* Main Verification Container */}
      <div className="max-w-2xl w-full mx-auto my-8 space-y-6">
        {/* Search Bar for manual lookup */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="أدخل رقم الشهادة أو الختم المشفر (مثال: CERT-XXXX أو MIRSAD-SEAL-...)"
            className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3.5 pr-11 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 shadow-lg"
          />
          <button
            type="submit"
            className="absolute left-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
          >
            تحقق الآن
          </button>
        </form>

        {/* State: No query provided yet */}
        {!activeQuery.trim() && (
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 sm:p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <Hash className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">التحقق من صحة الوثائق الأكاديمية</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              يُقارَن رقم الشهادة بالسجل الرسمي للمنصة، ولا تُعدّ الشهادة صالحة إلا إذا وُجدت فيه غير ملغاة وسليمة البصمة.
            </p>
          </div>
        )}

        {activeQuery.trim() && loading && (
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 text-center text-slate-400 text-sm flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> جاري التحقق من السجل الرسمي...
          </div>
        )}

        {activeQuery.trim() && !loading && result && ['invalid_format', 'not_found', 'unavailable', 'tampered'].includes(result.state) && (
          <div className="rounded-3xl bg-slate-900 border border-amber-500/30 p-8 text-center space-y-3 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-500/40 flex items-center justify-center mx-auto text-amber-400">
              {result.state === 'unavailable' ? <WifiOff className="w-8 h-8" /> : result.state === 'tampered' ? <ShieldAlert className="w-8 h-8" /> : <FileQuestion className="w-8 h-8" />}
            </div>
            <h2 className="text-xl font-black text-white">
              {result.state === 'invalid_format' && 'صيغة رقم الشهادة غير صحيحة'}
              {result.state === 'not_found' && 'لا توجد شهادة بهذا الرقم'}
              {result.state === 'unavailable' && 'تعذّر الاتصال بالسجل'}
              {result.state === 'tampered' && 'السجل لا يطابق بصمته'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              {result.state === 'invalid_format' && 'تأكد من الرقم كما يظهر على الشهادة (مثال: MIR-XXXX-XXXX-XXXX-XXXX-X). قد يكون هناك خطأ في أحد الأحرف.'}
              {result.state === 'not_found' && 'لم نجد هذا الرقم في السجل الرسمي. لا تعتمد هذه الوثيقة قبل التواصل مع إدارة المنصة.'}
              {result.state === 'unavailable' && 'لا نستطيع الجزم بصحة الشهادة الآن. هذا لا يعني أنها صحيحة أو مزوّرة، أعد المحاولة لاحقاً.'}
              {result.state === 'tampered' && 'بيانات السجل لا تطابق بصمتها المخزنة. لا تعتمد هذه الشهادة وأبلغ إدارة المنصة.'}
            </p>
          </div>
        )}

        {/* State: Revoked Certificate */}
        {activeQuery.trim() && !loading && result?.state === 'revoked' && certificate && (
          <div className="rounded-3xl bg-slate-900 border border-red-500/30 p-8 text-center space-y-4 shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500/40 flex items-center justify-center mx-auto text-red-400">
              <ShieldAlert className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-white">الشهادة ملغاة رسمياً</h2>
            <p className="text-sm text-slate-400">
              هذه الشهادة مسجلة ولكنها أُلغيت من قِبل إدارة الأكاديمية.
            </p>
            {certificate.revokeReason && (
              <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20 text-xs text-red-300 max-w-md mx-auto">
                {certificate.revokeReason}
              </div>
            )}
          </div>
        )}

        {/* State: Valid Certificate Card */}
        {activeQuery.trim() && !loading && result?.state === 'valid' && certificate && (
          <div className="space-y-6">
            {/* Success Banner */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 text-emerald-400 relative">
                <ShieldCheck className="w-10 h-10" />
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping pointer-events-none" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                الشهادة صالحة ومعتمدة ✓
              </h2>
              <p className="text-xs sm:text-sm text-emerald-400">
                السجل موجود في قاعدة بيانات المنصة وبصمته سليمة
              </p>
            </div>

            {/* Credential Data Card */}
            <div className="rounded-3xl bg-slate-900 border border-emerald-500/40 p-6 sm:p-8 space-y-5 shadow-2xl">
              <div className="space-y-4">
                <Row icon={Award} label="اسم المستلم" value={certificate.studentName} highlight />
                <Row icon={Hash} label="رقم الشهادة" value={certificate.certId} mono />
                <Row icon={User} label="المقرر الأكاديمي" value={`${certificate.courseTitle} (${certificate.courseCode})`} />
                <Row icon={Calendar} label="تاريخ الإصدار" value={formattedDate} />
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">النتيجة الأكاديمية المسجَّلة</span>
                </div>
                <span className="text-3xl font-black text-emerald-400">
                  {certificate.scorePercentage.toFixed(1)}%
                </span>
              </div>

              {/* Hash Proof Box */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-right">
                <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>بصمة سلامة السجل (SHA-256):</span>
                </div>
                <p className="text-[10px] font-mono text-emerald-400 break-all leading-tight" dir="ltr">
                  {certificate.integrityHash}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>طباعة تقرير التحقق</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer info */}
      <footer className="text-center text-xs text-slate-500 py-4 border-t border-slate-900">
        منظومة التحقق الرقمي المستقلة — أكاديمية مِرْصَاد للتشفير والأمن السيبراني © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
  highlight = false,
  mono = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  highlight?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center gap-3.5 py-1">
      <div
        className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
          highlight
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            : 'bg-slate-800 border-slate-700 text-slate-400'
        }`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-slate-400">{label}</p>
        <p
          className={`font-medium truncate ${
            highlight ? 'text-lg text-white font-bold' : 'text-slate-200 text-sm'
          } ${mono ? 'font-mono text-xs text-amber-300' : ''}`}
          dir={mono ? 'ltr' : undefined}
          style={mono ? { textAlign: 'right' } : undefined}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
