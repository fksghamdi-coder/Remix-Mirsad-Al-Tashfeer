import { useEffect, useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, User, Lock, Phone, UserCog, AlertTriangle } from 'lucide-react';
import { initializeAuth, needsInitialSetup, setupInitialAdmin, login } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';

/** إعداد أول أدمن مخصص لهذا المتصفح. */
export default function AdminSetup() {
  const navigate = useNavigate();
  const { refresh } = useAuth();
  const [ready, setReady] = useState(false);
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await initializeAuth();
      if (!needsInitialSetup()) navigate('/login', { replace: true });
      else setReady(true);
    })();
  }, [navigate]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('تأكيد كلمة المرور غير مطابق');
      return;
    }
    setLoading(true);
    try {
      const res = await setupInitialAdmin({ fullName, username, password, phone });
      if (!res.success) {
        setError(res.error || 'تعذّر إنشاء الأدمن');
        return;
      }
      const l = await login(username, password);
      if (l.success) {
        refresh();
        navigate('/main');
      } else {
        navigate('/login');
      }
    } catch {
      setError('حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  if (!ready) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-950">
      <div className="glass-panel p-8 md:p-10 rounded-3xl w-full max-w-md relative z-10">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
            <ShieldCheck className="w-9 h-9 text-white" />
          </div>
          <h1 className="text-xl font-black gradient-text">الإعداد الأولي للمنصة</h1>
          <p className="text-slate-400 text-xs mt-2">
            أنشئ حساب مشرف مخصص بأعلى معايير التشفير الثنائي (PBKDF2-SHA256 + AES-256-GCM).
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/40 text-red-400 p-3 rounded-xl mb-4 text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <div className="relative">
            <UserCog className="absolute right-3 top-3.5 w-5 h-5 text-slate-500" />
            <input className="input-field pr-10" placeholder="الاسم الكامل" value={fullName}
              onChange={(e) => setFullName(e.target.value)} autoComplete="name" required />
          </div>
          <div className="relative">
            <User className="absolute right-3 top-3.5 w-5 h-5 text-slate-500" />
            <input className="input-field pr-10" placeholder="اسم المستخدم (إنجليزي)" value={username}
              onChange={(e) => setUsername(e.target.value)} autoComplete="username" required />
          </div>
          <div className="relative">
            <Lock className="absolute right-3 top-3.5 w-5 h-5 text-slate-500" />
            <input type="password" className="input-field pr-10" placeholder="كلمة المرور الجديدة" value={password}
              onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" required />
          </div>
          <div className="relative">
            <Lock className="absolute right-3 top-3.5 w-5 h-5 text-slate-500" />
            <input type="password" className="input-field pr-10" placeholder="تأكيد كلمة المرور" value={confirm}
              onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password" required />
          </div>
          <div className="relative">
            <Phone className="absolute right-3 top-3.5 w-5 h-5 text-slate-500" />
            <input className="input-field pr-10" placeholder="الجوال (اختياري، لاستعادة الحساب)" value={phone}
              onChange={(e) => setPhone(e.target.value)} inputMode="numeric" autoComplete="tel" />
          </div>
          <p className="text-[11px] text-slate-500">
            8 أحرف على الأقل، بنوعين مختلفين من الأحرف، وبلا اسم المستخدم داخلها.
          </p>
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
            {loading ? 'جاري الإنشاء...' : 'إنشاء حساب المشرف'}
          </button>
        </form>

        <div className="mt-4 pt-3 border-t border-slate-800 text-center text-xs">
          <Link to="/login" className="text-emerald-400 hover:underline font-bold">
            العودة إلى صفحة تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
}
