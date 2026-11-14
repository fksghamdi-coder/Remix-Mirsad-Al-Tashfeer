import React from 'react';
import { InternalSupport } from '@/components/ui/InternalSupport';
import { ShieldCheck, Lock, Headphones } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8" dir="rtl">
      {/* Title & Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/12 border border-emerald-500/35 text-emerald-400 text-xs font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
          <Headphones className="w-4 h-4" />
          <span>منظومة التواصل والشكاوى الداخلية المغلقة</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-100">
          التواصل والشكاوى <span className="text-emerald-400">السرية الداخلية</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
          جميع قنوات التواصل والشكاوى داخل منصة مِرْصَاد محصورة داخلياً بنظام أمني معزول ومشفّر.
          لا توجد أية عناوين أو أرقام خارجية، ويتم التعامل مع كل شكوى أو استفسار بسرية تامة ومباشرة مع إدارة المنصة.
        </p>
      </div>

      {/* شريط الإيضاح الأمني */}
      <div className="p-5 rounded-2xl glass-panel card-3d-neon border border-emerald-500/35 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl icon-glass-3d flex items-center justify-center text-emerald-400 shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">عزل تام وتشفير لبيانات المراسلات</div>
            <div className="text-[11px] text-slate-400">
              لا يمكن لأي طرف ثالث أو مستخدم آخر الاطلاع على رسائلك أو الشكاوى التي تقدمها.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3.5 py-2 rounded-xl border border-emerald-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.14)]">
          <ShieldCheck className="w-4 h-4" />
          <span>ZERO EXTERNAL LEAKAGE</span>
        </div>
      </div>

      {/* المكون الداخلي السري الموحد */}
      <InternalSupport />
    </div>
  );
}
