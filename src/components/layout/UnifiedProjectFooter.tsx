// File: src/components/layout/UnifiedProjectFooter.tsx
import React, { useState, useEffect } from 'react';
import { ShieldCheck, FileCheck2, UserCheck, BookMarked, ExternalLink, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ACCESSED, SOURCES, factsBySource } from '@/data/catalog';

export default function UnifiedProjectFooter() {
  const { session } = useAuth();
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);

  const connectedAccountName =
    session?.fullName || session?.displayName || session?.username || 'زائر أكاديمي';

  useEffect(() => {
    if (!isSourcesOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSourcesOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isSourcesOpen]);

  return (
    <>
      <footer
        dir="rtl"
        role="contentinfo"
        className="fixed bottom-0 inset-x-0 z-40 bg-slate-950/95 backdrop-blur-xl border-t border-emerald-500/20 px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 text-[11px] leading-relaxed text-slate-300 shadow-[0_-4px_20px_rgba(0,0,0,0.6)]"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-y-1.5 gap-x-6">
          {/* الجهة اليمنى: هوية المشروع الموحدة للمنصة بالكامل */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-2.5 gap-y-1 text-right">
            <span className="font-black text-emerald-400 inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>مشروع التشفير المتقدم (ISE243) · شعبة (002م)</span>
            </span>
            <span className="text-slate-600 font-bold" aria-hidden="true">·</span>
            <a
              href="https://elearning.upm.edu.sa/ar"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-slate-200 hover:text-emerald-400 transition-colors hover:underline"
            >
              جامعة الأمير مقرن بن عبدالعزيز
            </a>
            <span className="text-slate-600 font-bold" aria-hidden="true">·</span>
            <span className="text-amber-300/95 font-semibold">
              مشروع أكاديمي تدريبي موثق بالمصادر (وليس منصة رسمية)
            </span>
          </div>

          {/* الجهة اليسرى: الحساب المتصل وبيان المشروع والمصادر */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-2.5 gap-y-1 shrink-0">
            <span className="inline-flex items-center gap-1.5 font-bold text-emerald-300">
              <UserCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>الحساب: ({connectedAccountName})</span>
            </span>
            <span className="text-slate-600 font-bold" aria-hidden="true">·</span>
            <a
              href="#project-sources"
              onClick={(e) => {
                e.preventDefault();
                setIsSourcesOpen(true);
              }}
              className="inline-flex items-center gap-1.5 font-bold text-cyan-400 hover:text-cyan-300 transition-colors hover:underline cursor-pointer"
            >
              <FileCheck2 className="w-3.5 h-3.5 shrink-0" />
              <span>بيان المشروع والمصادر</span>
            </a>
            <span className="text-slate-600 font-bold" aria-hidden="true">·</span>
            <span className="text-slate-400 font-semibold">بيانات موثقة بالمصادر</span>
          </div>
        </div>
      </footer>

      {isSourcesOpen && (
        <div
          dir="rtl"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsSourcesOpen(false)}
        >
          <div
            className="w-full max-w-4xl max-h-[88vh] rounded-3xl bg-slate-900 border-2 border-cyan-500/40 shadow-[0_25px_90px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* رأس القائمة العائمة */}
            <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <BookMarked className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold mb-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>بيانات حقيقية موثقة بالمصادر المعتمدة 100% · العام الأكاديمي (2026-2027)</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-white">
                    سجل المراجع والمصادر العلمية والتنظيمية الموثقة للمشروع
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsSourcesOpen(false)}
                className="p-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 transition-colors cursor-pointer shrink-0"
                title="إغلاق القائمة العائمة"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* محتوى القائمة العائمة */}
            <div className="p-6 overflow-y-auto space-y-5">
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-emerald-500/30 text-xs text-slate-300 leading-relaxed">
                «مشروع مِرْصَاد التشفير الأكاديمي التدريبي للعلوم التشفيرية والأمن السيبراني» هو{' '}
                <strong className="text-emerald-300">
                  مشروع أكاديمي تعليمي وتدريبي حقيقي موثق بالمصادر الرسمية والأكاديمية المعتمدة
                </strong>{' '}
                مقدم لمادة <strong className="text-white">«التشفير المتقدم (ISE243)»</strong> — تخصص{' '}
                <strong className="text-white">«دبلوم أمن المعلومات»</strong> —{' '}
                <strong className="text-amber-300">طلاب شعبة (002م)</strong> — السنة الأكاديمية{' '}
                <strong className="text-amber-300">(2026-2027)</strong> في{' '}
                <strong className="text-white">جامعة الأمير مقرن بن عبدالعزيز</strong> (وليس منصة حكومية أو تجارية رسمية). وجميع البيانات والمعايير الخوارزمية والتنظيمية الواردة في المنصة حقيقية ومرتبطة بمصادرها الرسمية والأكاديمية الموثقة أدناه ({ACCESSED}).
              </div>

              <ol className="space-y-3">
                {SOURCES.map((s, i) => {
                  const used = factsBySource(s.id);
                  return (
                    <li
                      key={s.id}
                      className="rounded-2xl p-4 space-y-2 bg-slate-950/80 border border-slate-800 hover:border-cyan-500/30 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-0.5">
                          <p className="text-xs text-slate-400">
                            [{i + 1}] {s.publisher}
                          </p>
                          <h3 className="text-sm font-bold text-slate-100 leading-relaxed" dir="auto">
                            {s.title}
                          </h3>
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
                <li className="rounded-2xl p-4 space-y-1 bg-slate-950/90 border border-emerald-500/30">
                  <p className="text-xs text-emerald-300 font-bold">
                    المرجع الأكاديمي الأساسي لمادة المشروع (ISE243)
                  </p>
                  <h3 className="text-sm font-bold text-slate-100">
                    Dan Boneh &amp; Victor Shoup — A Graduate Course in Applied Cryptography (Stanford / NYU) &amp; كتاب مقرر «التشفير المتقدم (ISE243)» — تخصص دبلوم أمن المعلومات (جامعة الأمير مقرن بن عبدالعزيز)
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    المرجع العلمي المعتمد لبناء المحاكيات الرياضية في المشروع (حقول غالوا GF(2^8)، معيار AES-256، المنحنيات الإهليلجية ECC، تبادل المفاتيح ECDH، التوقيع الرقمي ECDSA، بروتوكول شنور للمعرفة الصفرية ZKP، والتشفير المتجانس Paillier).
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

