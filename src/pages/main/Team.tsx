import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, GraduationCap, ShieldCheck, Maximize2, Calendar, BookOpen } from 'lucide-react';
import { STUDENTS, StudentPersona } from '@/data/students';
import { useAuth } from '@/contexts/AuthContext';
import InteractiveCardStage, { getCardIdentity } from '@/components/ui/InteractiveCardStage';

export default function Team() {
  const { session } = useAuth();
  const isAdmin = session?.role === 'admin';
  const [selectedStudent, setSelectedStudent] = useState<StudentPersona | null>(null);

  return (
    <>
      <motion.div
        animate={{
          opacity: selectedStudent ? 0.08 : 1,
          scale: selectedStudent ? 0.97 : 1,
          filter: selectedStudent ? 'blur(10px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto py-8 px-4 space-y-8"
      >
        <header className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-2xl icon-glass-3d flex items-center justify-center text-emerald-400">
            <Users className="w-8 h-8" aria-hidden="true" />
          </div>
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/12 border border-emerald-500/35 text-emerald-300 text-xs font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
            <span>مشروع أكاديمي تعليمي وتدريبي حقيقي موثق بالمصادر</span>
            <span>·</span>
            <span>طلاب شعبة (002م)</span>
            <span>·</span>
            <span>السنة الأكاديمية (2026-2027)</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            فريق المشروع الأكاديمي التدريبي — طلاب شعبة (002م)
          </h1>
          <p className="text-sm text-slate-300 max-w-3xl mx-auto leading-relaxed">
            مشروع أكاديمي تعليمي وتدريبي حقيقي موثق بالمصادر الرسمية والأكاديمية المعتمدة (وليس منصة حكومية أو تجارية رسمية)، أنجزه <strong>{STUDENTS.length} طلاب وطالبات من شعبة (002م)</strong>، مقدم لمادة{' '}
            <strong className="text-amber-300">«التشفير المتقدم (ISE243)»</strong> — تخصص{' '}
            <strong className="text-emerald-300">«دبلوم أمن المعلومات»</strong> — السنة الأكاديمية{' '}
            <strong className="text-cyan-300">(2026-2027)</strong> في جامعة الأمير مقرن بن عبدالعزيز.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl card-3d-neon bg-slate-900/80 border border-emerald-500/30 text-xs text-slate-300">
              <GraduationCap className="w-4 h-4 text-amber-400" aria-hidden="true" />
              <a
                href="https://upm.edu.sa/ar"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors font-semibold"
              >
                جامعة الأمير مقرن بن عبدالعزيز — تخصص دبلوم أمن المعلومات
              </a>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl card-3d-neon bg-slate-900/80 border border-emerald-500/30 text-xs text-emerald-300 font-mono">
              <Calendar className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>السنة الأكاديمية: (2026-2027) · طلاب شعبة (002م)</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl card-3d-neon card-3d-cyan bg-slate-900/80 border border-cyan-500/30 text-xs text-cyan-300">
              <BookOpen className="w-4 h-4 text-cyan-400" aria-hidden="true" />
              <span>المادة: التشفير المتقدم (ISE243) · شعبة (002م)</span>
            </div>
          </div>
          <p className="text-xs text-emerald-400/90 font-medium pt-1">
            ✦ انقر على أي بطاقة لاستعراض هوية الطالب ودوره العلمي في المشروع بالتأثير التفاعلي ثلاثي الأبعاد
          </p>
        </header>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STUDENTS.map((s) => {
            const identity = getCardIdentity(s.id);
            return (
              <li
                key={s.id}
                onClick={() => setSelectedStudent(s)}
                className="glass-panel card-3d-neon rounded-2xl p-5 space-y-3 border-t-4 cursor-pointer group transition-all duration-300 hover:-translate-y-1.5 active:scale-[0.98]"
                style={{ borderTopColor: s.theme.accent }}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black text-white shrink-0 shadow-md"
                      style={{ background: s.theme.accent }}
                      aria-hidden="true"
                    >
                      {s.initial}
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-sm font-bold text-white break-words">{s.name}</h2>
                      <p className="text-xs" style={{ color: s.theme.accent }}>
                        {s.badge} {s.title}
                      </p>
                    </div>
                  </div>
                  <span
                    className="p-2 rounded-xl border opacity-75 group-hover:opacity-100 transition-all shrink-0"
                    style={{
                      backgroundColor: `${s.theme.accent}18`,
                      borderColor: `${s.theme.accent}40`,
                      color: s.theme.accent,
                    }}
                    title="فتح المسرح التفاعلي للبطاقة"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>

                <p className="text-xs text-slate-400">
                  <span className="text-slate-500">المسار في المشروع (شعبة 002م): </span>
                  {s.theme.specialty}
                </p>

                <p className="text-[11px] italic text-slate-400 leading-relaxed">
                  «{s.theme.quote}»
                </p>

                <div className="flex items-center justify-between gap-2 text-[11px] pt-2 border-t border-slate-800">
                  <span className="text-slate-400">
                    {identity.characterTag.split('·')[0]} · شعبة 002م
                  </span>
                  <span className="font-mono text-slate-300 shrink-0" dir="ltr">
                    {s.academicId}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
          مشروع مِرْصَاد التشفير الأكاديمي التدريبي للعلوم التشفيرية والأمن السيبراني — مادة التشفير المتقدم (ISE243) — دبلوم أمن المعلومات — طلاب شعبة (002م) — (2026-2027) — جامعة الأمير مقرن بن عبدالعزيز.
        </p>
      </motion.div>

      <InteractiveCardStage
        open={Boolean(selectedStudent)}
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
        allStudents={STUDENTS}
        onSelectStudent={setSelectedStudent}
        isAdmin={isAdmin}
      />
    </>
  );
}
