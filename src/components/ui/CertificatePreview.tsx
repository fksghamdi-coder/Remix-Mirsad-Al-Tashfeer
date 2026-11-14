import React from 'react';
import { Shield, Award, CheckCircle2, Lock } from 'lucide-react';
import { getAssetUrl } from '@/lib/utils';

export interface CertificatePreviewProps {
  studentName?: string;
  studentId?: string;
  courseTitle?: string;
  courseCode?: string;
  score?: number;
  issueDate?: string;
  certificateId?: string;
  supervisorName?: string;
  institutionName?: string;
  sha256Signature?: string;
  customNote?: string;
  showGridGuides?: boolean;
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({
  studentName = 'المشرف العام على المنصة',
  studentId = 'ADMIN-001',
  courseTitle = 'إتمام متطلبات المشروع التدريبي الأكاديمي — دبلوم أمن المعلومات — طلاب شعبة (002م) — مادة التشفير المتقدم (ISE243)',
  courseCode = 'ISE243 · دبلوم أمن المعلومات · طلاب شعبة (002م) · العام الأكاديمي (2026-2027)',
  score = 98,
  issueDate = 'العام الأكاديمي (2026-2027)',
  certificateId = 'MIRSAD-CERT-2026-88412',
  supervisorName = 'الإشراف الأكاديمي على المشروع التدريبي — مادة التشفير المتقدم (ISE243)',
  institutionName = 'جامعة الأمير مقرن بن عبدالعزيز — تخصص دبلوم أمن المعلومات (طلاب شعبة 002م · 2026-2027)',
  sha256Signature = '9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08',
  customNote = 'شهادة إتمام مشروع مِرْصَاد التشفير الأكاديمي التدريبي للعلوم التشفيرية والأمن السيبراني — مشروع أكاديمي تعليمي وتدريبي حقيقي موثق بالمصادر الرسمية والأكاديمية المعتمدة (وليس منصة حكومية أو تجارية رسمية) مقدم لمادة التشفير المتقدم (ISE243) — تخصص دبلوم أمن المعلومات — طلاب شعبة (002م) — السنة الأكاديمية (2026-2027) في جامعة الأمير مقرن بن عبدالعزيز.',
  showGridGuides = false
}) => {
  return (
    <div
      id="mirsad-certificate-printable"
      dir="rtl"
      className={`relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-[#060b16] via-[#0b1325] to-[#07101e] text-white p-8 md:p-12 shadow-2xl border-2 border-amber-500/60 ${
        showGridGuides ? 'bg-[radial-gradient(#f59e0b22_1px,transparent_1px)] [background-size:20px_20px]' : ''
      }`}
    >
      {/* الإطار الزخرفي الهندسي المزدوج لهوية مرصاد */}
      <div className="pointer-events-none absolute inset-3 rounded-2xl border border-amber-400/30" />
      <div className="pointer-events-none absolute inset-5 rounded-xl border border-emerald-400/20" />

      {/* العلامة المائية البارزة أسفل وخلفية الشهادة — شعار منصة مرصاد */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center opacity-[0.09] select-none z-0">
        <img
          src={getAssetUrl('assets/mirsad-emblem-logo.png')}
          alt="شعار مرصاد المائي"
          className="w-[420px] h-[420px] object-contain drop-shadow-[0_0_50px_rgba(6,182,212,0.8)] filter brightness-125"
        />
        <span className="text-3xl font-black tracking-widest text-emerald-300 mt-2 font-mono uppercase">
          MIRSAD PLATFORM
        </span>
      </div>

      {/* الترويسة العليا الرسمية */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-amber-500/30">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/25 to-emerald-500/20 border-2 border-amber-400/60 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.25)] p-1.5">
            <img
              src={getAssetUrl('assets/mirsad-emblem-logo.png')}
              alt="شعار مِرْصَاد التشفير"
              className="w-full h-full object-contain drop-shadow-[0_4px_10px_rgba(6,182,212,0.6)]"
            />
          </div>
          <div>
            <div className="text-xs font-mono text-amber-400 tracking-widest uppercase flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              مشروع تدريبي أكاديمي جامعي · ACADEMIC TRAINING PROJECT
            </div>
            <h2 className="text-2xl font-extrabold text-white mt-0.5">مشروع مِرْصَاد التشفير الأكاديمي التدريبي</h2>
            <p className="text-xs text-slate-300 mt-0.5">{institutionName}</p>
          </div>
        </div>

        <div className="text-left font-mono bg-slate-900/90 px-4 py-2.5 rounded-2xl border border-amber-500/40 shadow-lg">
          <div className="text-[11px] text-amber-400 font-bold tracking-wider">CERT ID: {certificateId}</div>
          <div className="text-[11px] text-emerald-400 mt-0.5 font-semibold">PROJECT VERIFIED · ACADEMIC PASS</div>
          <div className="text-[10px] text-slate-400 mt-0.5">ACADEMIC YEAR: {issueDate}</div>
        </div>
      </div>

      {/* متن الشهادة الرئيسي */}
      <div className="relative z-10 text-center my-8 space-y-4">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-amber-500/20 border-2 border-amber-400/50 text-amber-300 text-xs font-bold shadow-md">
          <Award className="w-4 h-4 text-amber-400" />
          <span>شهادة إتمام مشروع تدريبي أكاديمي</span>
        </div>

        <p className="text-sm text-slate-300">تشهد المشرفون على المشروع التدريبي الأكاديمي بجامعة الأمير مقرن بأن الطالب / المتدرب:</p>

        <div className="py-2">
          <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-emerald-300">
            {studentName}
          </h1>
          {studentId && (
            <div className="text-xs font-mono text-slate-400 mt-1">
              الرقم الأكاديمي: <span className="text-amber-300 font-bold">{studentId}</span>
            </div>
          )}
        </div>

        <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          قد اجتاز بنجاح متطلبات الاختبار التقييمي بنسبة تفوق الحد الأدنى للنجاح (60%)، وأكمل التدريبات والمختبرات المخصصة للمشروع في:
        </p>

        <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/40 max-w-4xl mx-auto shadow-inner">
          <div className="text-lg md:text-xl font-extrabold text-white whitespace-nowrap overflow-hidden text-ellipsis">{courseTitle}</div>
          {courseCode && <div className="text-xs font-mono text-emerald-400 mt-1.5 font-bold tracking-wider">{courseCode}</div>}
        </div>

        {/* مؤشرات التقييم والأداء البارزة */}
        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto pt-3">
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border-2 border-emerald-500/40 shadow-lg flex flex-col items-center">
            <div className="text-[11px] text-slate-400 font-medium">الدرجة المحققة</div>
            <div className="text-xl font-black text-emerald-400 font-mono mt-0.5">{score}%</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border-2 border-amber-500/40 shadow-lg flex flex-col items-center">
            <div className="text-[11px] text-slate-400 font-medium">التقدير الأكاديمي</div>
            <div className="text-xs font-bold text-amber-300 mt-1">
              {score >= 90 ? 'ممتاز مرتفع' : score >= 80 ? 'جيد جداً' : score >= 70 ? 'جيد' : 'اجتياز معتمد'}
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border-2 border-cyan-500/40 shadow-lg flex flex-col items-center">
            <div className="text-[11px] text-slate-400 font-medium">حالة الاختبار</div>
            <div className="text-xs font-mono font-bold text-cyan-300 mt-1">PASSED (MIN 60%)</div>
          </div>
        </div>
      </div>

      {/* التوقيعات والختم الرقمي المشفر SHA-256 */}
      <div className="relative z-10 pt-6 border-t border-slate-800/90 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="text-right space-y-1">
          <div className="text-xs text-slate-400 font-medium">الإشراف الأكاديمي على المشروع:</div>
          <div className="text-sm font-bold text-white">{supervisorName}</div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>مشروع جامعي تدريبي موثق داخلياً</span>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="mirsad-logo-3d group relative w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/20 via-slate-900 to-cyan-500/20 border-2 border-amber-400/80 flex flex-col items-center justify-center shadow-[0_12px_32px_rgba(0,0,0,0.65),0_0_24px_rgba(245,158,11,0.35)] transition-all duration-500 hover:border-amber-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_35px_rgba(245,158,11,0.55)] cursor-pointer">
            {/* حلقة الإضاءة ثلاثية الأبعاد الداخلية */}
            <div className="pointer-events-none absolute inset-1.5 rounded-full border border-amber-300/40 border-dashed animate-spin-slow opacity-75" />
            
            {/* صورة شعار درع مرصاد ثلاثي الأبعاد الرسمي */}
            <div className="relative flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <img
                src={getAssetUrl('assets/mirsad-emblem-logo.png')}
                alt="شعار درع مرصاد ثلاثي الأبعاد"
                className="w-16 h-16 object-contain drop-shadow-[0_4px_12px_rgba(6,182,212,0.65)]"
              />
            </div>
          </div>
        </div>

        <div className="text-left dir-ltr font-mono bg-slate-950/90 p-3 rounded-xl border border-slate-800 shadow-inner">
          <div className="text-[10px] text-amber-400 font-bold">SHA-256 DIGITAL SIGNATURE:</div>
          <div className="text-[10px] text-slate-300 break-all mt-1">{sha256Signature}</div>
        </div>
      </div>

      {/* التنويه القانوني والتعريف بالمشروع التدريبي */}
      <div className="relative z-10 mt-5 pt-3 border-t border-slate-800/60 text-center">
        <p className="text-[11px] text-slate-400 leading-relaxed max-w-3xl mx-auto">{customNote}</p>
      </div>
    </div>
  );
};

export default CertificatePreview;
