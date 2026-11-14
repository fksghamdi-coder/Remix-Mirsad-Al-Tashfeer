// src/pages/Login.tsx
import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAssetUrl } from '@/lib/utils';
import {
  Lock,
  User,
  ShieldCheck,
  KeyRound,
  AlertTriangle,
  Fingerprint,
  Cpu,
  FileCheck2,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Headphones,
  X,
  Send,
  UserCheck,
  FileText,
  Eye,
  EyeOff,
  ShieldAlert,
  UserPlus,
} from 'lucide-react';
import {
  login,
  initializeAuth,
} from '@/lib/auth';
import { hasSeenCongrats } from '@/lib/cards';
import { useAuth } from '@/contexts/AuthContext';
import { useSupport } from '@/contexts/SupportContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  // حالة نموذج الشكاوى السريع داخل النافذة
  const [supportSenderName, setSupportSenderName] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSubmittedCode, setSupportSubmittedCode] = useState<string | null>(null);

  const navigate = useNavigate();
  const { refresh } = useAuth();
  const { sendTicket } = useSupport();

  useEffect(() => {
    initializeAuth();
  }, []);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await initializeAuth();
      const res = await login(username.trim(), password);

      if (res.success) {
        refresh();
        const loggedUsername = res.session?.username || username.trim().toLowerCase();
        if (res.session?.role !== 'admin' && !hasSeenCongrats(loggedUsername)) {
          navigate('/congratulations');
        } else {
          navigate('/');
        }
      } else {
        setError(res.error || 'اسم المستخدم أو كلمة المرور غير صحيحة');
      }
    } catch {
      setError('تعذر الاتصال بخدمة التحقق الأمني');
    } finally {
      setLoading(false);
    }
  };

  const handleSendSupport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportSenderName.trim() || !supportMessage.trim()) return;

    const created = sendTicket(supportSenderName, supportMessage);
    if (created) {
      setSupportSubmittedCode(created.referenceCode);
      setSupportMessage('');
      setTimeout(() => setSupportSubmittedCode(null), 6000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 relative overflow-hidden" dir="rtl">
      {/* خلفية الشيفرات الرقمية والتشفير المثبتة مع تعتيم 30% وضبابية بلور 30% */}
      <div
        className="fixed -inset-4 z-0 bg-cover bg-center bg-no-repeat pointer-events-none filter blur-[6px] scale-105"
        style={{
          backgroundImage: `url('${getAssetUrl('assets/login-bg-encryption.jpg')}')`,
          backgroundAttachment: 'fixed',
        }}
      />
      {/* طبقة تعتيم الصورة بنسبة 30% */}
      <div className="fixed inset-0 z-0 bg-black/30 pointer-events-none" />

      <div className="glass-panel p-8 md:p-10 rounded-3xl w-full max-w-lg border border-slate-800 shadow-2xl relative z-10">
        {/* شريط معلومات وإشعار العزل الأمني في أعلى بطاقة الدخول */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
          <span className="text-[11px] font-mono text-slate-400">بوابة الدخول الآمن المشفرة · منصة مِرْصَاد التشفير</span>
          <button
            type="button"
            onClick={() => setShowSupportModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all cursor-pointer"
          >
            <Headphones className="w-3.5 h-3.5 text-emerald-400" />
            <span>الشكاوى والدعم الداخلي</span>
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="w-24 h-24 mx-auto mb-3 rounded-3xl bg-slate-900/90 border border-emerald-500/40 p-2 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.25)]">
            <img
              src={getAssetUrl('assets/mirsad-emblem-logo.png')}
              alt="شعار مرصاد التشفير"
              className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(6,182,212,0.7)]"
            />
          </div>
          <h1 className="text-2xl font-black text-white">دخول مرصاد الآمن</h1>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono text-emerald-300">
            <Fingerprint className="w-3.5 h-3.5 text-emerald-400" />
            <span>PBKDF2-SHA256 (600,000 Rounds) / AES-256-GCM</span>
          </div>
        </div>

        {error && (
          <div className="text-rose-400 p-3 bg-rose-950/50 rounded-xl mb-4 text-xs flex items-center gap-2 border border-rose-500/30">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={submit} className="space-y-3.5">
          <div className="group relative flex items-center w-full h-[52px] rounded-2xl bg-slate-950/80 border border-slate-700/80 hover:border-slate-600 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/25 px-3.5 transition-all shadow-inner">
            <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-focus-within:text-emerald-400 group-focus-within:border-emerald-500/40 group-focus-within:bg-emerald-500/10 transition-all shrink-0 pointer-events-none">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="اسم المستخدم أو المعرف الرقمي"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-full bg-transparent px-3 text-slate-100 placeholder:text-slate-500 text-sm font-medium focus:outline-none"
              required
            />
          </div>
          <div className="group relative flex items-center w-full h-[52px] rounded-2xl bg-slate-950/80 border border-slate-700/80 hover:border-slate-600 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/25 px-3.5 transition-all shadow-inner">
            <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 group-focus-within:text-emerald-400 group-focus-within:border-emerald-500/40 group-focus-within:bg-emerald-500/10 transition-all shrink-0 pointer-events-none">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="كلمة المرور المشفرة"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 h-full bg-transparent px-3 text-slate-100 placeholder:text-slate-500 text-sm font-medium focus:outline-none min-w-0"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-slate-400 hover:text-emerald-300 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 active:scale-95 transition-all shrink-0 focus:outline-none cursor-pointer"
              title={showPassword ? 'إخفاء كلمة المرور' : 'عرض كلمة المرور'}
              aria-label={showPassword ? 'إخفاء كلمة المرور' : 'عرض كلمة المرور'}
            >
              {showPassword ? <EyeOff className="w-4.5 h-4.5 text-emerald-400" /> : <Eye className="w-4.5 h-4.5" />}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="relative w-full h-[52px] rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/60 hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed border border-emerald-400/20"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
                <span>جاري التحقق التشفيري الآمن...</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-100" />
                <span>تسجيل الدخول الآمن</span>
                <span className="mr-1 text-[10px] py-0.5 px-2 rounded-md bg-emerald-950/60 border border-emerald-400/30 text-emerald-200 font-mono">Verified</span>
              </span>
            )}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-800/80">
          <button
            type="button"
            onClick={() => setShowPolicy((v) => !v)}
            className="w-full py-2 px-3 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center justify-between gap-2 transition-all cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>سياسة التحقق التشفيري والعزل الأمني (NCS-1:2020)</span>
            </span>
            {showPolicy ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showPolicy && (
            <div className="mt-2 p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-[11px] text-slate-300 space-y-1.5">
              <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>تجزئة PBKDF2-SHA256 مقاومة للهجمات مع تشفير عالي الكفاءة</span>
              </div>
              <p className="text-[10px] text-slate-400 flex items-center gap-1">
                <FileCheck2 className="w-3 h-3 text-emerald-400" />
                <span>المعايير المعتمدة: NIST SP 800-63B · NCA NCS-1:2020</span>
              </p>
            </div>
          )}
        </div>

        {/* شريط استعادة كلمة المرور + إنشاء حساب جديد */}
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
          <Link to="/recovery" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold">
            <KeyRound className="w-3.5 h-3.5" />
            <span>نسيت كلمة المرور؟</span>
          </Link>
          <Link
            to="/register"
            className="px-3.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-black flex items-center gap-1.5 transition-all"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>إنشاء حساب جديد</span>
          </Link>
        </div>
      </div>

      {/* نافذة الشكاوى والدعم الداخلي السري Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel p-6 rounded-3xl w-full max-w-xl border border-emerald-500/30 bg-slate-900 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* إغلاق النافذة */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">الشكاوى والمراسلات الداخلية السرية</h3>
                  <p className="text-[11px] text-slate-400">
                    تواصل مباشر وسري مع إدارة منصة مِرْصَاد مع عزل تام وتشفير متكامل
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowSupportModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* نموذج الإرسال السريع */}
            <form onSubmit={handleSendSupport} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>اسم المرسل:</span>
                </label>
                <input
                  type="text"
                  required
                  value={supportSenderName}
                  onChange={(e) => setSupportSenderName(e.target.value)}
                  placeholder="أدخل اسمك أو معرفك"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>محتوى الرسالة أو الشكوى:</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  placeholder="اكتب مشكلتك في الدخول، أو شكواك السرية لإدارة المنصة..."
                  className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>عزل أمني تام ومحمي من أي تسريب</span>
                </span>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-l from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>إرسال الشكوى</span>
                </button>
              </div>

              {supportSubmittedCode && (
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    تم إرسال شكواك بنجاح. الرمز المرجعي السري لمتابعة الرد:{' '}
                    <strong className="font-mono text-white underline">{supportSubmittedCode}</strong>
                  </span>
                </div>
              )}
            </form>

            <div className="mt-5 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>المراسلات مشفرة ومحفوظة بسرية تامة لدى المشرف العام فقط.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
