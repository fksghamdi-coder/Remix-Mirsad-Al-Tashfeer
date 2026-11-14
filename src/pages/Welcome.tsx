import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ShieldCheck, LogIn, UserPlus, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import LegalContent from '@/components/LegalContent';
import { getAssetUrl } from '@/lib/utils';

/**
 * الشاشة الوحيدة المتاحة للزائر: ترحيب ونبذة موجزة دون أي بيانات أو مؤشرات أو أسماء أو أرقام.
 * من لديه جلسة صالحة يُحوَّل إلى المنصة مباشرة.
 */
export default function Welcome() {
  const { session } = useAuth();
  const [showNotice, setShowNotice] = useState(false);

  if (session) return <Navigate to="/" replace />;

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-slate-950 relative overflow-hidden" dir="rtl">
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

      <div className="glass-panel w-full max-w-lg p-8 md:p-10 rounded-3xl text-center space-y-6 relative z-10">
        <div className="w-24 h-24 mx-auto rounded-3xl bg-slate-900/90 border border-emerald-500/40 p-2 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
          <img
            src={getAssetUrl('assets/mirsad-emblem-logo.png')}
            alt="شعار مِرْصَاد التشفير"
            className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(6,182,212,0.7)]"
          />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl md:text-2xl font-black gradient-text">
            مشروع مِرْصَاد التشفير الأكاديمي التدريبي للعلوم التشفيرية والأمن السيبراني
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            مشروع أكاديمي تعليمي وتدريبي حقيقي موثق بالمصادر الرسمية والأكاديمية المعتمدة (وليس منصة حكومية أو تجارية رسمية)، أعدّه طلاب شعبة (002م) في تخصص دبلوم أمن المعلومات لمادة التشفير المتقدم (ISE243) للسنة الأكاديمية (2026-2027) بجامعة الأمير مقرن بن عبدالعزيز.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            لعرض محتوى المشروع التدريبي والمختبرات والمقررات سجّل الدخول أو أنشئ حساباً.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link to="/login" className="btn-primary flex items-center justify-center gap-2 py-3 text-sm">
            <LogIn className="w-4 h-4" aria-hidden="true" /> تسجيل الدخول
          </Link>
          <Link
            to="/register"
            className="flex items-center justify-center gap-2 py-3 text-sm rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold border border-slate-700 transition-all"
          >
            <UserPlus className="w-4 h-4" aria-hidden="true" /> إنشاء حساب
          </Link>
        </div>

        <div className="text-right">
          <button
            type="button"
            onClick={() => setShowNotice((v) => !v)}
            aria-expanded={showNotice}
            className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-slate-200 px-3 py-2 rounded-xl border border-slate-800 bg-slate-900/60"
          >
            <span>الاستخدام التعليمي والخصوصية</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showNotice ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
          {showNotice && (
            <div className="mt-3 p-4 rounded-xl border border-slate-800 bg-slate-900/60 max-h-64 overflow-y-auto">
              <LegalContent compact />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
