// src/pages/academic/Students.tsx
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Award,
  Sparkles,
  Code2,
  BookOpen,
  Trophy,
  CheckCircle2,
} from 'lucide-react';
import { STUDENTS, StudentPersona } from '@/data/students';
import { COURSE_INFO } from '@/data/ise243';
import { COURSES } from '@/data/courses';
import { useAuth } from '@/contexts/AuthContext';
import GeometricTeamCard from '@/components/ui/GeometricTeamCard';
import InteractiveCardStage from '@/components/ui/InteractiveCardStage';

export default function Students() {
  const { session } = useAuth();
  const isAdmin = session?.role === 'admin';
  const [selectedStudent, setSelectedStudent] = useState<StudentPersona | null>(null);

  const totalChapters = useMemo(
    () => COURSES.reduce((acc, c) => acc + (c.chaptersCount || 0), 0),
    []
  );

  return (
    <>
      <motion.div
        animate={{
          opacity: selectedStudent ? 0.08 : 1,
          scale: selectedStudent ? 0.97 : 1,
          filter: selectedStudent ? 'blur(10px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-10 pb-10"
      >
        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center relative py-8"
        >
          <div className="absolute inset-0 -z-10 flex justify-center items-center">
            <div className="w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="btn-3d-neon btn-3d-amber inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm mb-5 neon-border neon-amber"
          >
            <Trophy className="w-4 h-4" /> طلاب شعبة (002م) · {COURSE_INFO.code} · دبلوم أمن المعلومات · (2026-2027)
          </motion.div>

          <h1 className="text-3xl md:text-5xl font-black gradient-text mb-4">
            فريق المشروع الأكاديمي التدريبي — طلاب شعبة (002م)
          </h1>
          <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed text-sm md:text-base">
            مشروع أكاديمي تعليمي وتدريبي حقيقي موثق بالمصادر الرسمية والأكاديمية المعتمدة (وليس منصة حكومية أو تجارية رسمية)، أعدّه{' '}
            <span className="text-amber-300 font-bold">طلاب شعبة (002م)</span> ضمن متطلبات مقرر{' '}
            <span className="text-emerald-300 font-bold">{COURSE_INFO.title} ({COURSE_INFO.code})</span> — تخصص{' '}
            <span className="text-cyan-300 font-bold">دبلوم أمن المعلومات</span> للعام الأكاديمي{' '}
            <span className="text-amber-300 font-mono font-bold">(2026-2027)</span> في {COURSE_INFO.university}.
          </p>
          <p className="text-xs text-emerald-400/90 mt-3 font-medium">
            ✦ انقر على أي بطاقة طالب لاستعراض الدور الهندسي والفصول التخصصية المسندة إليه في المشروع
          </p>
        </motion.header>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3.5"
        >
          {[
            { icon: Users, label: 'طلاب شعبة (002م)', value: STUDENTS.length, color: 'text-amber-400' },
            { icon: BookOpen, label: 'فصلاً دراسياً موثقاً', value: totalChapters, color: 'text-emerald-400' },
            { icon: Code2, label: 'مقررات أكاديمية', value: COURSES.length, color: 'text-blue-400' },
            { icon: Sparkles, label: 'مختبرات تشفيرية حية', value: 'AES · ZKP · PQC', color: 'text-purple-400' },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="glass-panel card-3d-neon p-4 rounded-2xl text-center neon-border border border-emerald-500/20 overflow-hidden">
                <Icon className={`w-6 h-6 mx-auto mb-2 ${s.color}`} />
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-slate-100 whitespace-nowrap truncate">{s.value}</p>
                <p className="text-xs text-slate-400 whitespace-nowrap truncate">{s.label}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Geometric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {STUDENTS.map((student, i) => (
            <GeometricTeamCard
              key={student.id}
              student={student}
              index={i}
              onSelect={(st) => setSelectedStudent(st)}
            />
          ))}
        </div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass-panel card-3d-neon card-3d-amber p-8 md:p-10 rounded-2xl text-center relative overflow-hidden neon-border neon-amber"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent" />
          <div className="relative">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full icon-glass-3d bg-amber-500/20 border border-amber-500/30 mb-4"
            >
              <Award className="w-8 h-8 text-amber-400" />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-black gradient-text mb-3">
              توثيق أكاديمي معتمد بالمصادر — شعبة (002م) · (2026-2027)
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
              تم إعداد وتدقيق هذا المشروع التطبيقي بواسطة طلاب شعبة (002م) في تخصص دبلوم أمن المعلومات لمقرر التشفير المتقدم ({COURSE_INFO.code}) بجامعة الأمير مقرن بن عبدالعزيز، وفق المعايير الرسمية (NCA ECC-2:2024، NCS-1:2020، ITU GCI 2024، NIST FIPS 197 / 203 / 204 / 205).
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              {[
                `${totalChapters} فصلاً دراسياً`,
                `${COURSES.length} مقررات تخصصية`,
                'مختبر AES & GF(2^8) (FIPS 197)',
                'مختبر Schnorr ZKP',
                'معايير NIST FIPS 203/204/205',
              ].map((tag, i) => (
                <span key={i} className="btn-3d-neon inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* المسرح التفاعلي للبطاقة المختارة */}
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
