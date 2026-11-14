import { BookMarked, ExternalLink, ShieldCheck } from 'lucide-react';
import { ACCESSED, SOURCES, factsBySource } from '@/data/catalog';

export default function Sources() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-6">
      <header className="text-center space-y-2.5">
        <div className="w-14 h-14 mx-auto rounded-2xl icon-glass-3d flex items-center justify-center text-emerald-400">
          <BookMarked className="w-7 h-7" aria-hidden="true" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/12 border border-emerald-500/35 text-emerald-300 text-[11px] font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>بيانات حقيقية موثقة بالمصادر المعتمدة 100% · العام الأكاديمي (2026-2027)</span>
        </div>
        <h1 className="text-2xl font-black text-white">
          سجل المراجع والمصادر العلمية والتنظيمية الموثقة للمشروع
        </h1>
        <p className="text-xs text-slate-300 max-w-2xl mx-auto leading-relaxed">
          «مشروع مِرْصَاد التشفير الأكاديمي التدريبي للعلوم التشفيرية والأمن السيبراني» هو <strong>مشروع أكاديمي تعليمي وتدريبي حقيقي موثق بالمصادر الرسمية والأكاديمية المعتمدة</strong> مقدم لمادة{' '}
          <strong>«التشفير المتقدم (ISE243)»</strong> — تخصص <strong>«دبلوم أمن المعلومات»</strong> —{' '}
          <strong>طلاب شعبة (002م)</strong> — السنة الأكاديمية <strong>(2026-2027)</strong> في{' '}
          <strong>جامعة الأمير مقرن بن عبدالعزيز</strong> (وليس منصة حكومية أو تجارية رسمية). وجميع البيانات والمعايير الخوارزمية والتنظيمية الواردة في المنصة حقيقية ومرتبطة بمصادرها الرسمية والأكاديمية الموثقة أدناه ({ACCESSED}).
        </p>
      </header>

      <ol className="space-y-3.5">
        {SOURCES.map((s, i) => {
          const used = factsBySource(s.id);
          return (
            <li key={s.id} className="glass-panel card-3d-neon rounded-2xl p-4 sm:p-5 space-y-2 active:scale-[0.995]">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="text-xs text-slate-400">
                    [{i + 1}] {s.publisher}
                  </p>
                  <h2 className="text-sm font-bold text-slate-100 leading-relaxed" dir="auto">
                    {s.title}
                  </h2>
                </div>
                <span
                  className={
                    s.kind === 'official'
                      ? 'px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shrink-0'
                      : 'px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 shrink-0'
                  }
                >
                  {s.kind === 'official' ? 'مصدر رسمي معتمد' : 'مرجع تخصصي مساند'}
                </span>
              </div>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-emerald-400 hover:underline inline-flex items-center gap-1 break-all"
                dir="ltr"
              >
                {s.url} <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
              </a>
              <p className="text-[11px] text-slate-400">
                {s.published ? `تاريخ النشر: ${s.published} · ` : ''}يوثّق في المشروع:{' '}
                {used.map((f) => f.title).join('، ') || 'المعايير الخوارزمية والتنظيمية المعتمدة'}
              </p>
            </li>
          );
        })}
        <li className="glass-panel card-3d-neon rounded-2xl p-5 space-y-1.5 border border-emerald-500/40 active:scale-[0.995]">
          <p className="text-xs text-emerald-300 font-bold">المرجع الأكاديمي الأساسي لمادة المشروع (ISE243)</p>
          <h2 className="text-sm font-bold text-slate-100">
            Dan Boneh &amp; Victor Shoup — A Graduate Course in Applied Cryptography (Stanford / NYU) &amp; كتاب مقرر «التشفير المتقدم (ISE243)» — تخصص دبلوم أمن المعلومات (جامعة الأمير مقرن بن عبدالعزيز)
          </h2>
          <p className="text-[11px] text-slate-400">
            المرجع العلمي المعتمد لبناء المحاكيات الرياضية في المشروع (حقول غالوا GF(2^8)، معيار AES-256، المنحنيات الإهليلجية ECC، تبادل المفاتيح ECDH، التوقيع الرقمي ECDSA، بروتوكول شنور للمعرفة الصفرية ZKP، والتشفير المتجانس Paillier).
          </p>
        </li>
      </ol>
    </div>
  );
}
