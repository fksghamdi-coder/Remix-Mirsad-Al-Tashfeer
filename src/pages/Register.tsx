// File: src/pages/Register.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  UserPlus,
  User,
  Lock,
  Phone,
  Hash,
  AlertTriangle,
  CheckCircle2,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { registerUser, login } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { refresh } = useAuth();

  const [form, setForm] = useState({
    fullName: '',
    academicId: '',
    username: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const cleanFullName = form.fullName.trim();
    const cleanAcademicId = form.academicId.trim();
    const cleanUsername = (form.username.trim() || cleanAcademicId).toLowerCase();
    const cleanPassword = form.password.trim();

    if (cleanFullName.length < 3) {
      setError('يرجى إدخال الاسم الكامل (3 أحرف على الأقل)');
      return;
    }
    if (!cleanAcademicId || cleanAcademicId.length < 3) {
      setError('يرجى إدخال الرقم الأكاديمي أو المعرف الرقمي');
      return;
    }
    if (cleanPassword.length < 6) {
      setError('كلمة المرور يجب أن تتكون من 6 أحرف أو أرقام على الأقل');
      return;
    }
    if (cleanPassword !== form.confirmPassword.trim()) {
      setError('كلمتا المرور غير متطابقتين');
      return;
    }

    setLoading(true);
    const res = await registerUser({
      username: cleanUsername,
      academicId: cleanAcademicId,
      fullName: cleanFullName,
      password: cleanPassword,
      phone: form.phone.trim() || undefined,
      registrationSource: 'self_register',
    });

    if (!res.success) {
      setLoading(false);
      setError(res.error || 'تعذر إنشاء الحساب');
      return;
    }

    // تسجيل الدخول تلقائياً بالحساب الجديد فور إنشائه وتوجيهه لنظام الترحيب بالمستخدم الجديد
    const loginRes = await login(cleanUsername, cleanPassword);
    setLoading(false);

    if (loginRes.success) {
      refresh();
      navigate('/congratulations');
    } else {
      setSuccessMsg('تم إنشاء وتشفير حسابك بنجاح! يمكنك الآن تسجيل الدخول.');
      setTimeout(() => navigate('/login'), 1500);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-950"
      dir="rtl"
    >
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-7 md:p-9 rounded-3xl w-full max-w-lg relative z-10 border border-slate-800 shadow-2xl space-y-5"
      >
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
            <UserPlus className="w-8 h-8 text-slate-950" />
          </div>
          <h1 className="text-2xl font-black text-white">إنشاء حساب أكاديمي جديد</h1>
          <p className="text-xs text-slate-400">
            يُشفّر الحساب عبر PBKDF2-HMAC-SHA256 (600,000 تكرار) ويرتبط بقاعدة بيانات المنصة المركزية
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-400 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5" autoComplete="off">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              الاسم الثلاثي الكامل *
            </label>
            <div className="flex items-center h-11 rounded-xl bg-slate-950 border border-slate-700 focus-within:border-emerald-500 px-3">
              <User className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                required
                value={form.fullName}
                onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                placeholder="أدخل اسمك الكامل"
                className="w-full h-full bg-transparent px-2.5 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                الرقم الأكاديمي *
              </label>
              <div className="flex items-center h-11 rounded-xl bg-slate-950 border border-slate-700 focus-within:border-emerald-500 px-3">
                <Hash className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  required
                  value={form.academicId}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      academicId: e.target.value,
                      username: p.username || e.target.value,
                    }))
                  }
                  placeholder="(الرقم الأكاديمي)"
                  className="w-full h-full bg-transparent px-2.5 text-xs text-white font-mono focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                اسم المستخدم للدخول
              </label>
              <div className="flex items-center h-11 rounded-xl bg-slate-950 border border-slate-700 focus-within:border-emerald-500 px-3">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
                  placeholder="اختياري (الافتراضي: الرقم الأكاديمي)"
                  className="w-full h-full bg-transparent px-2.5 text-xs text-white font-mono focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              رقم الجوال (اختياري)
            </label>
            <div className="flex items-center h-11 rounded-xl bg-slate-950 border border-slate-700 focus-within:border-emerald-500 px-3">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                placeholder="05XXXXXXXX"
                className="w-full h-full bg-transparent px-2.5 text-xs text-white font-mono focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-emerald-300 mb-1">
                كلمة المرور (6 خانات فأكثر) *
              </label>
              <div className="flex items-center h-11 rounded-xl bg-slate-950 border border-slate-700 focus-within:border-emerald-500 px-3">
                <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                  placeholder="أدخل كلمة المرور"
                  className="w-full h-full bg-transparent px-2.5 text-xs text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-slate-400 hover:text-emerald-400"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-300 mb-1">
                تأكيد كلمة المرور *
              </label>
              <div className="flex items-center h-11 rounded-xl bg-slate-950 border border-slate-700 focus-within:border-emerald-500 px-3">
                <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.confirmPassword}
                  onChange={(e) => setForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                  placeholder="أعد كتابة كلمة المرور"
                  className="w-full h-full bg-transparent px-2.5 text-xs text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>
              {loading
                ? 'جارٍ تشفير الحساب وتفعيله...'
                : 'إنشاء الحساب وتفعيله والدخول الآن'}
            </span>
          </button>
        </form>

        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <span className="text-slate-400">لديك حساب بالفعل؟</span>
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold"
          >
            <span>الانتقال لصفحة تسجيل الدخول</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
