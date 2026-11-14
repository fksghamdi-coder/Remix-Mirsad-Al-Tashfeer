import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Save, ArrowLeft, Sparkles, Maximize2 } from 'lucide-react';
import { getSession, findUser } from '@/lib/auth';
import { findTeamMember, GENERAL_MOTIVATION, STUDENTS, StudentPersona } from '@/data/students';
import { saveCard, markCongratsSeen } from '@/lib/cards';
import CongratulationCard from '@/components/ui/CongratulationCard';
import InteractiveCardStage, { buildWelcomePersona } from '@/components/ui/InteractiveCardStage';

export default function Congratulations() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [teamMember, setTeamMember] = useState<ReturnType<typeof findTeamMember>>(undefined);
  const [userName, setUserName] = useState('');
  const [username, setUsername] = useState('');
  const [academicId, setAcademicId] = useState('');
  const [stageStudent, setStageStudent] = useState<StudentPersona | null>(null);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      navigate('/login');
      return;
    }
    const user = findUser(session.username);
    const resolvedFullName = user?.fullName || session.fullName || session.displayName || session.username;
    const resolvedUsername = user?.username || session.username;
    const resolvedAcademicId = user?.academicId || session.username;

    setUserName(resolvedFullName);
    setUsername(resolvedUsername);
    setAcademicId(resolvedAcademicId);

    const member =
      findTeamMember(resolvedAcademicId) ||
      findTeamMember(resolvedUsername) ||
      findTeamMember(resolvedFullName);
    setTeamMember(member);
  }, [navigate]);

  const card = teamMember
    ? {
        title: teamMember.title,
        subtitle: teamMember.theme.specialty,
        message: teamMember.message,
        recipientName: teamMember.name,
        isTeamMember: true,
        academicId: teamMember.academicId || academicId,
      }
    : {
        title: GENERAL_MOTIVATION.title,
        subtitle: GENERAL_MOTIVATION.subtitle,
        message: GENERAL_MOTIVATION.message,
        recipientName: userName || 'عضو مِرْصَاد الجديد',
        isTeamMember: false,
        academicId,
      };

  const handleSave = () => {
    if (username) {
      saveCard(username, {
        kind: teamMember ? 'team' : 'general',
        title: card.title,
        subtitle: card.subtitle,
        message: card.message,
      });
      markCongratsSeen(username);
    }
    setSaved(true);
    setTimeout(() => navigate('/'), 900);
  };

  const handleSkip = () => {
    if (username) {
      markCongratsSeen(username);
    }
    navigate('/');
  };

  const openWelcomeStage = () => {
    setStageStudent(
      buildWelcomePersona({
        fullName: card.recipientName,
        academicId: card.academicId,
        username,
        title: card.title,
        subtitle: card.subtitle,
        message: card.message,
        teamMember,
      })
    );
  };

  return (
    <>
      <motion.div
        animate={{
          opacity: stageStudent ? 0.08 : 1,
          scale: stageStudent ? 0.97 : 1,
          filter: stageStudent ? 'blur(10px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-slate-950"
      >
        {/* خلفية */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
          />
        </div>

        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-flex mb-3"
          >
            <Sparkles className="w-8 h-8 text-amber-400" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-black gradient-text-academic mb-2">
            مبروك! تم تفعيل حسابك
          </h1>
          <p className="text-slate-400 text-sm">
            {teamMember
              ? 'بطاقتك الخاصة كعضو في فريق مِرْصَاد جاهزة — انقر عليها لتشغيل المسرح التفاعلي'
              : `بطاقة ترحيب خاصة باسمك (${userName}) من فريق مِرْصَاد`}
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full"
        >
          <CongratulationCard {...card} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-3 mt-7 w-full max-w-lg"
        >
          <button
            type="button"
            onClick={handleSave}
            disabled={saved}
            className="flex-1 w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {saved ? (
              <>
                <CheckCircle2 className="w-5 h-5" /> تم حفظ البطاقة!
              </>
            ) : (
              <>
                <Save className="w-5 h-5" /> احفظ البطاقة في ملفك
              </>
            )}
          </button>
          <button
            type="button"
            onClick={openWelcomeStage}
            className="flex-1 w-full bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 border border-emerald-500/40"
          >
            <Maximize2 className="w-4 h-4" /> المسرح التفاعلي للبطاقات
          </button>
          <button
            type="button"
            onClick={handleSkip}
            className="sm:w-auto w-full px-5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-700"
          >
            <ArrowLeft className="w-5 h-5" /> تخطي
          </button>
        </motion.div>

        <p className="text-xs text-slate-500 mt-4 text-center max-w-md">
          يمكنك دائماً الرجوع إلى بطاقتك من صفحة{' '}
          <span className="text-amber-400">الإعدادات → بطاقاتي</span>
        </p>
      </motion.div>

      <InteractiveCardStage
        open={Boolean(stageStudent)}
        student={stageStudent}
        onClose={() => setStageStudent(null)}
        allStudents={STUDENTS}
        onSelectStudent={setStageStudent}
        isWelcomeMode={stageStudent?.id === 0}
        primaryActionLabel="حفظ البطاقة والدخول للمنصة"
        onPrimaryAction={handleSave}
      />
    </>
  );
}
