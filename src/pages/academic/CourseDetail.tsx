// src/pages/academic/CourseDetail.tsx

import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Clock,
  Target,
  Award,
  Calendar,
  TrendingUp,
  GraduationCap,
  Library,
  Play,
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { getCourseBySlug } from '@/data/courses';
import { cn } from '@/lib/utils';

export default function CourseDetail() {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const course = getCourseBySlug(courseSlug || '');

  if (!course || course.status !== 'available') {
    return <Navigate to="/academic" replace />;
  }

  const IconComp = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[course.icon] || BookOpen;

  return (
    <div className="space-y-8 pb-8">
      {/* ============ Hero ============ */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-3xl overflow-hidden glass-panel card-3d-neon border border-amber-500/35"
      >
        {/* خلفية متدرجة */}
        <div className={cn('absolute inset-0 bg-gradient-to-br', course.color, 'opacity-20')} />
        <div className="absolute inset-0 bg-slate-950/70" />

        <div className="relative p-6 md:p-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-amber-400 mb-4">
            <Link to="/academic" className="hover:text-amber-300 transition-colors">
              المقررات
            </Link>
            <ArrowRight className="w-3 h-3 rotate-180" />
            <span className="text-slate-300 font-bold">{course.title}</span>
          </div>

          {/* Icon + Code */}
          <div className="flex items-center gap-4 mb-4">
            <div
              className={cn(
                'w-16 h-16 rounded-2xl icon-glass-3d bg-gradient-to-br flex items-center justify-center shadow-2xl',
                course.color
              )}
            >
              <IconComp className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-xs font-mono text-amber-400 font-bold mb-1">{course.code}</p>
              <p className="text-sm text-slate-400">{course.level}</p>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-black gradient-text-academic mb-2">
            {course.title}
          </h1>
          <p className="text-sm text-slate-500 italic mb-6">{course.titleEn}</p>

          {/* Description */}
          <p className="text-slate-300 max-w-3xl leading-relaxed mb-8 text-base">
            {course.description}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-3xl">
            {[
              { icon: BookOpen, label: 'الفصول', value: course.chaptersCount },
              { icon: Clock, label: 'الساعات', value: `${course.totalHours} س` },
              { icon: Calendar, label: 'الأسابيع', value: (course.weeklyPlan || []).length },
              { icon: Award, label: 'المستوى', value: course.level.replace('المستوى ', '') },
            ].map((stat, i) => {
              const StatIcon = stat.icon;
              return (
                <div key={i} className="glass-panel card-3d-neon p-4 rounded-2xl text-center border border-amber-500/35">
                  <StatIcon className="w-5 h-5 mx-auto mb-2 text-amber-400" />
                  <p className="text-2xl font-black text-amber-300">{stat.value}</p>
                  <p className="text-xs text-slate-300 font-bold mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ============ Vision & Mission ============ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel card-3d-neon p-6 rounded-2xl border-l-4 border-l-amber-500 border border-amber-500/35"
        >
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-amber-300">الرؤية</h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">{course.vision}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-panel card-3d-neon p-6 rounded-2xl border-l-4 border-l-emerald-500 border border-emerald-500/35"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-emerald-300">الرسالة</h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">{course.mission}</p>
        </motion.div>
      </div>

      {/* ============ Learning Outcomes ============ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel card-3d-neon p-6 rounded-2xl border border-amber-500/35"
      >
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-slate-100">مخرجات التعلم المستهدفة</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {(course.learningOutcomes || []).map((outcome, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl glass-panel card-3d-neon bg-slate-900/75 border border-emerald-500/30">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/35 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-amber-400">{i + 1}</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{outcome}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ============ Weekly Plan ============ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="glass-panel card-3d-neon p-6 rounded-2xl border border-emerald-500/35"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-slate-100">الخطة الأسبوعية المعتمدة</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {(course.weeklyPlan || []).length} أسبوعاً دراسياً
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-400 border-b border-slate-800">
                <th className="text-right py-3 px-3 font-medium w-20">الأسبوع</th>
                <th className="text-right py-3 px-3 font-medium">الموضوع الدراسي</th>
                <th className="text-right py-3 px-3 font-medium w-24">الفصل</th>
                <th className="text-right py-3 px-3 font-medium w-20">الوصول</th>
              </tr>
            </thead>
            <tbody>
              {(course.weeklyPlan || []).map((week, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.02 }}
                  className="border-b border-slate-800/50 hover:bg-emerald-500/5 transition-colors group"
                >
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold font-mono">
                      {week.week}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-medium">{week.topic}</td>
                  <td className="py-3 px-3">
                    <span className="text-xs font-mono text-slate-400 bg-slate-900/80 px-2 py-1 rounded">
                      #{week.chapterNumber}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <Link
                      to={`/academic/${courseSlug}/chapters/${week.chapterNumber}`}
                      className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity font-bold"
                    >
                      فتح <ArrowRight className="w-3 h-3 rotate-180" />
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ============ Assessment Methods ============ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-panel card-3d-neon p-6 rounded-2xl border border-amber-500/35"
      >
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-slate-100">طرق التقييم وتوزيع الدرجات</h2>
        </div>
        <div className="space-y-4">
          {(course.assessmentMethods || []).map((method, i) => (
            <div key={i}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-bold text-sm text-slate-200">{method.name}</p>
                  <p className="text-xs text-slate-400">{method.description}</p>
                </div>
                <span className="text-lg font-black text-amber-400 font-mono">{method.weight}%</span>
              </div>
              <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${method.weight}%` }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ============ Reference ============ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="glass-panel card-3d-neon p-6 rounded-2xl border-l-4 border-l-blue-500 border border-blue-500/35"
      >
        <div className="flex items-center gap-2 mb-3">
          <Library className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-bold text-blue-300">المرجع الأكاديمي الرئيسي</h2>
        </div>
        <p className="text-sm text-slate-300 font-mono">{course.reference}</p>
      </motion.div>

      {/* ============ CTA ============ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-panel card-3d-neon p-8 md:p-12 rounded-3xl text-center relative overflow-hidden border border-amber-500/40"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent" />
        <div className="relative">
          <Play className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-black gradient-text-academic mb-2">
            ابدأ رحلتك التعليمية في {course.title}
          </h2>
          <p className="text-sm text-slate-400 mb-6 max-w-xl mx-auto">
            {course.chaptersCount} فصلاً تفاعلياً مع شروحات وفيديوهات وعروض تقديمية وبطاقات مراجعة
          </p>
          <Link
            to={`/academic/${courseSlug}/chapters`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl btn-3d-neon btn-3d-amber btn-3d-amber-active text-amber-200 hover:text-white font-bold transition-all duration-300 active:scale-95"
          >
            <BookOpen className="w-5 h-5" />
            <span>استعراض فهرس الفصول</span>
            <ArrowRight className="w-5 h-5 rotate-180" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
