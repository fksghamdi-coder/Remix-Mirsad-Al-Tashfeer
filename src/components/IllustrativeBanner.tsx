import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

/** شريط التوثيق الأكاديمي للمشروع التدريبي الموثق بالمصادر */
export default function IllustrativeBanner() {
  return (
    <div
      role="note"
      className="max-w-7xl mx-auto mb-4 flex items-start gap-2.5 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-100 text-xs leading-relaxed"
    >
      <ShieldCheck className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" aria-hidden="true" />
      <p>
        <strong>شريط التوثيق الأكاديمي للمشروع التدريبي (شعبة 002م · 2026-2027):</strong> مشروع مِرْصَاد التشفير الأكاديمي التدريبي للعلوم التشفيرية والأمن السيبراني هو مشروع أكاديمي تعليمي وتدريبي حقيقي موثق بالمصادر الرسمية والأكاديمية المعتمدة (وليس منصة حكومية أو تجارية رسمية)، مقدم لمادة{' '}
        <strong>«التشفير المتقدم (ISE243)»</strong> — التخصص: <strong>«دبلوم أمن المعلومات»</strong> — إعداد{' '}
        <strong>طلاب شعبة (002م)</strong> — السنة الأكاديمية <strong>(2026-2027)</strong> في{' '}
        <strong>جامعة الأمير مقرن بن عبدالعزيز</strong>. جميع المعايير والبيانات والخوارزميات المعروضة فيها حقيقية وموثقة بالمصادر الرسمية والأكاديمية (NCA وNIST وITU وIETF) في{' '}
        <Link to="/sources" className="text-amber-300 font-bold underline hover:text-amber-200">
          سجل المراجع والمصادر الرسمية
        </Link>
        .
      </p>
    </div>
  );
}
