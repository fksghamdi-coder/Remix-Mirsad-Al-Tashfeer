import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  FlaskConical,
  GraduationCap,
  Award,
  Target,
  Calendar,
  Clock,
  TrendingUp,
  CheckCircle2,
  Users,
  Trophy,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { COURSE_INFO } from '@/data/ise243';
import { useAuth } from '@/contexts/AuthContext';
import { getProgress, getCompletionPercent } from '@/lib/progress';

export default function AcademicHome() {
  const { session, isGuest } = useAuth();
  const progress = session ? getProgress(session.username) : null;
  const percent = session
    ? getCompletionPercent(session.username, COURSE_INFO.totalChapters)
    : 0;

  return (
    <div className="space-y-8">
      {/* Course Catalog Switcher Bar */}
      <div className="flex items-center justify-between pb-1 border-b border-slate-800/80">
        <Link
          to="/academic"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-amber-300 font-bold transition-colors"
        >
          <ArrowRight className="w-3.5 h-3.5" />
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>العودة لمعرض المقررات</span>
        </Link>
        <span className="text-[11px] font-mono text-slate-400">
          المقرر المختار: <strong className="text-amber-400">ISE243</strong>
        </span>
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm mb-4">
          <GraduationCap className="w-4 h-4" /> ISE243 · {COURSE_INFO.level}
        </div>
        <h1 className="text-4xl md:text-5xl font-black gradient-text-academic mb-3">
          {COURSE_INFO.title}
        </h1>
        <p className="text-slate-400 max-w-3xl mx-auto">
          {COURSE_INFO.department} — {COURSE_INFO.university}
        </p>
      </motion.div>

      {/* Progress Bar Card (للمستخدمين المسجلين) */}
      {!isGuest && session ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="glass-panel p-6 rounded-2xl"
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-amber-300">تقدمك في المقرر</h3>
            <span className="text-2xl font-black text-amber-400">{percent}%</span>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500"
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
            <span>
              {progress?.completedChapters.length || 0} من {COURSE_INFO.totalChapters} فصلاً
            </span>
            <Link to="/academic/certificate" className="text-amber-400 hover:underline font-medium">
              {percent >= 100 ? '🎉 الشهادة جاهزة للتحميل!' : 'عرض حالة الشهادة ←'}
            </Link>
          </div>
        </motion.div>
      ) : (
        <div className="glass-panel p-4 rounded-2xl border border-amber-500/20 text-xs text-slate-400 flex items-center justify-between gap-3">
          <span>أنت تتصفح المنصة كـ <strong className="text-amber-300">زائر</strong>. سجّل الدخول لحفظ تقدمك والحصول على شهادة الإتمام.</span>
          <Link to="/login" className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold shrink-0">تسجيل الدخول</Link>
        </div>
      )}

      {/* Course Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-6 rounded-2xl border-l-4 border-l-amber-500"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: BookOpen, label: 'الفصول', value: COURSE_INFO.totalChapters },
            { icon: Clock, label: 'الساعات', value: COURSE_INFO.estimatedHours },
            { icon: Calendar, label: 'الأسابيع', value: COURSE_INFO.weeklyPlan.length },
            { icon: Award, label: 'المستوى', value: 'الرابع' },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="text-center">
                <Icon className="w-6 h-6 mx-auto mb-2 text-amber-400" />
                <p className="text-2xl font-black text-amber-300">{s.value}</p>
                <p className="text-xs text-slate-400">{s.label}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          {
            to: '/academic/chapters',
            icon: BookOpen,
            title: 'الفصول الـ 12',
            desc: 'شرح + فيديو + PPT + بطاقات',
            iconTone: 'text-emerald-400',
          },
          {
            to: '/academic/zkp-lab',
            icon: FlaskConical,
            title: 'مختبر ZKP',
            desc: 'بروتوكول سيجما التفاعلي',
            iconTone: 'text-purple-400',
          },
          {
            to: '/academic/final-quiz',
            icon: Trophy,
            title: 'الاختبار النهائي',
            desc: '15 سؤالاً عشوائياً',
            iconTone: 'text-amber-400',
          },
          {
            to: '/academic/certificate',
            icon: Award,
            title: 'شهادتك',
            desc: 'أكمل 12 فصلاً لتحميلها',
            iconTone: 'text-emerald-400',
          },
          {
            to: '/academic/students',
            icon: Users,
            title: 'فريق العمل',
            desc: 'عشرة أعضاء صنعوا الإنجاز',
            iconTone: 'text-rose-400',
          },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
            >
              <Link
                to={card.to}
                className="glass-panel block p-6 rounded-2xl hover:border-amber-500/40 transition-all group h-full"
              >
                <Icon
                  className={`w-10 h-10 mb-3 ${card.iconTone} group-hover:scale-110 transition-transform`}
                />
                <h3 className="font-bold mb-2 group-hover:text-amber-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-400">{card.desc}</p>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Learning Outcomes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-panel p-6 rounded-2xl"
      >
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2 text-amber-300">
          <Target className="w-5 h-5" /> مخرجات التعلم
        </h2>
        <div className="space-y-2">
          {COURSE_INFO.learningOutcomes.map((out, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{out}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Assessment + Weekly Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-panel p-6 rounded-2xl"
        >
          <h2 className="font-bold mb-4 flex items-center gap-2 text-amber-300">
            <TrendingUp className="w-5 h-5" /> طرق التقييم
          </h2>
          <div className="space-y-3">
            {COURSE_INFO.assessmentMethods.map((m, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{m.name}</span>
                  <span className="text-amber-400 font-bold">{m.weight}%</span>
                </div>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${m.weight}%` }}
                    transition={{ delay: 0.6 + i * 0.15, duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">{m.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="glass-panel p-6 rounded-2xl max-h-[400px] overflow-y-auto"
        >
          <h2 className="font-bold mb-4 flex items-center gap-2 text-amber-300 sticky top-0 bg-slate-900/80 backdrop-blur pb-2">
            <Calendar className="w-5 h-5" /> الخطة الأسبوعية
          </h2>
          <div className="space-y-2">
            {COURSE_INFO.weeklyPlan.map((w, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-2 border-b border-slate-800/50 last:border-0"
              >
                <span className="text-xs font-mono text-amber-500 bg-amber-500/10 px-2 py-1 rounded shrink-0">
                  أسبوع {w.week}
                </span>
                <span className="text-sm text-slate-300">{w.topic}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Syllabus Reference */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="glass-panel p-4 rounded-2xl text-center text-sm text-slate-500"
      >
        📚 المرجع الرئيسي: <span className="text-slate-300">{COURSE_INFO.reference}</span>
      </motion.div>
    </div>
  );
}
