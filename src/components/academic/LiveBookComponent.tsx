import React, { useEffect, useState } from 'react';
import { tutorAgent } from '@/lib/TutorAgent';
import { apiClient } from '@/lib/apiClient';
import { LiveBookChapter } from '@/components/interactive/LiveBookComponent';

export interface InteractiveBookProps {
  courseId?: string;
  courseTitle?: string;
  chapterTitle?: string;
  chapterNumber?: number;
  pdfContentSummary?: string;
  interactiveLabType?: 'cmm' | 'pqc' | 'threats' | 'risk' | 'planning';
}

export const LiveBookComponent: React.FC<InteractiveBookProps> = ({
  courseId = 'ISE243',
  courseTitle = 'أمن المعلومات والتشفير التطبيقي',
  chapterTitle = 'معايير النضج وحوكمة ضوابط التشفير المؤسسي',
  chapterNumber = 4,
  pdfContentSummary = 'يتناول هذا الفصل منهجيات تقييم مستوى النضج الأمني CMM وعلاقتها بتطبيق ضوابط NIST الخاصة بإدارة المفاتيح والتشفير بعد الكمي (PQC). تتطلب الحوكمة السليمة ربط السياسات الأمنية بالبنية التشغيلية للمؤسسة لضمان المرونة والاستجابة ضد التهديدات الحديثة وفق نموذج الدفاع في العمق.',
  interactiveLabType: _interactiveLabType = 'cmm',
}) => {
  const [teacherMode, setTeacherMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [labValue, setLabValue] = useState(3);
  const [stars, setStars] = useState(3);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [chapters, setChapters] = useState<LiveBookChapter[]>([]);
  const [loadingChapters, setLoadingChapters] = useState(true);

  // AI Tutor Agent State
  const [tutorQuery, setTutorQuery] = useState('');
  const [tutorResponse, setTutorResponse] = useState<string | null>(null);
  const [isTutorLoading, setIsTutorLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = (await apiClient.request(
          `/courses/${courseId}/chapters`
        )) as LiveBookChapter[];
        if (Array.isArray(result) && result.length > 0) {
          setChapters(result);
        }
      } catch (err) {
        console.error('Critical: Failed to load academic content', err);
      } finally {
        setLoadingChapters(false);
      }
    }
    fetchData();
  }, [courseId]);

  const activeChapter = chapters[currentPage - 1];
  const effectiveChapterNumber = activeChapter?.number ?? chapterNumber;
  const effectiveChapterTitle = activeChapter?.title ?? chapterTitle;
  const effectiveSummary = activeChapter?.content ?? pdfContentSummary;

  const handleTutorAsk = async () => {
    if (!tutorQuery.trim() || isTutorLoading) return;

    setIsTutorLoading(true);
    setTutorResponse(null);
    try {
      const response = await tutorAgent.askTutor(tutorQuery, effectiveSummary);
      setTutorResponse(response);
    } catch {
      setTutorResponse('أنا هنا لمساعدتك في المحتوى الأكاديمي، بماذا يمكنني مساعدتك؟');
    } finally {
      setIsTutorLoading(false);
    }
  };

  const handleQuizSubmit = (optionIndex: number) => {
    setQuizAnswered(true);
    if (optionIndex === 0) {
      setIsCorrect(true);
      setStars((prev) => Math.min(prev + 1, 5));
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div
      className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${
        teacherMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-950 text-slate-200'
      }`}
      dir="rtl"
    >
      {/* شريط أدوات التحكم والوضع التفاعلي */}
      <div className="max-w-5xl mx-auto flex flex-wrap justify-between items-center gap-4 mb-6 bg-slate-900/90 p-4 rounded-xl backdrop-blur-md border border-slate-800 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="mirsad-logo-3d w-10 h-10 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-900/30">
            م
          </div>
          <div>
            <h1 className="text-lg font-bold text-cyan-400">
              مرصاد التشفير | دليل الكتاب الحيّ التفاعلي (Live Book)
            </h1>
            <p className="text-xs text-slate-400">
              {courseTitle} — الفصل {chapterNumber}: {chapterTitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setTeacherMode(!teacherMode)}
            className={`px-4 py-2 rounded-lg font-medium text-xs transition border ${
              teacherMode
                ? 'bg-amber-600/90 text-white border-amber-500 shadow-lg shadow-amber-900/30'
                : 'bg-cyan-600/90 text-white border-cyan-500 hover:bg-cyan-500 shadow-lg shadow-cyan-900/30'
            }`}
          >
            {teacherMode ? 'وضع الطالب (المحتوى)' : 'وضع المعلم (السبورة الذكية)'}
          </button>
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition"
          >
            طباعة الفصل PDF
          </button>
        </div>
      </div>

      {/* كتاب الحيّ (صفحتان متجاورتان بأسلوب الكتاب الأكاديمي الرقمي) */}
      <div className="max-w-5xl mx-auto bg-slate-900/95 rounded-2xl shadow-2xl border-4 border-slate-800 overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[620px] transition-all">
        {/* الصفحة اليمنى: الشرح والمختبر التفاعلي */}
        <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-l border-slate-800 flex flex-col justify-between bg-gradient-to-b from-slate-900/90 to-slate-950">
          <div>
            <div className="flex justify-between items-center border-b pb-3 mb-4 border-slate-800">
              <h2 className="text-base font-bold text-cyan-300 flex items-center gap-2">
                <span>📖</span>
                {chapterNumber}.1 المحتوى الأكاديمي الشامل
              </h2>
              <span className="text-xs px-2.5 py-0.5 bg-cyan-950/80 text-cyan-300 border border-cyan-700/50 rounded font-bold">
                كتاب حيّ متقدم
              </span>
            </div>

            <p className="text-xs md:text-sm leading-relaxed mb-6 text-slate-300">
              {pdfContentSummary}
            </p>

            {/* المختبر التفاعلي الحاسوبي للدرس */}
            <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800 shadow-inner my-4">
              <h3 className="text-xs font-bold text-cyan-300 mb-2 flex items-center gap-2">
                <span>🧪</span> المختبر التفاعلي الحيّ: قياس مستوى النضج CMM
              </h3>

              <label className="block text-xs font-normal text-slate-400 mb-2">
                حرّك شريط المؤشر لمشاهدة تصنيف نضج الضوابط السيبرانية لحظياً:
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={labValue}
                onChange={(e) => setLabValue(Number(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
              />

              <div className="mt-4 p-3 bg-slate-900/90 rounded-lg border border-slate-700/70 text-xs font-bold flex justify-between items-center">
                <span className="text-slate-300">المستوى: {labValue} / 5</span>
                <span className="text-amber-400">
                  {labValue === 1 && '1. ابتدائي (Initial / Ad-hoc)'}
                  {labValue === 2 && '2. مُدار (Managed)'}
                  {labValue === 3 && '3. مُعرّف وموثق (Defined)'}
                  {labValue === 4 && '4. مُقاس كمياً (Quantitatively Managed)'}
                  {labValue === 5 && '5. مُحسّن تلقائياً ومستمر (Optimizing)'}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex justify-between text-xs text-slate-500">
            <span>منصة مرصاد للأمن السيبراني</span>
            <span>صفحة {currentPage * 2 - 1}</span>
          </div>
        </div>

        {/* الصفحة اليسرى: التحدي والـ AI Tutor Agent */}
        <div className="p-6 md:p-8 flex flex-col justify-between bg-gradient-to-b from-slate-900/90 to-slate-950">
          <div>
            <div className="flex justify-between items-center border-b pb-3 mb-4 border-slate-800">
              <h2 className="text-base font-bold text-cyan-300 flex items-center gap-2">
                <span>🎯</span>
                {chapterNumber}.2 التحديات والمساعد الذكي
              </h2>
              <div className="flex gap-1 text-amber-400 text-sm">
                {Array.from({ length: stars }).map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
            </div>

            {/* قسم التحدي: توقع ثم اكشف */}
            <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800 mb-6">
              <h3 className="text-xs font-bold text-amber-300 mb-2">
                🎯 سؤال التحدي الأكاديمي
              </h3>
              <p className="text-xs text-slate-300 mb-3.5 leading-relaxed">
                ما هي الخطيئة الأمنية الكبرى عند صياغة وتطبيق ضوابط الأمن السيبراني في المؤسسات الناشئة؟
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => handleQuizSubmit(0)}
                  className="w-full text-right p-3 rounded-lg bg-slate-900 text-xs border border-slate-700/80 hover:border-cyan-500 hover:bg-slate-850 text-slate-200 transition"
                >
                  أ) تطبيق المعايير التقنية دون مراعاة السياق التشغيلي وحوكمة الإدارة العليا.
                </button>
                <button
                  onClick={() => handleQuizSubmit(1)}
                  className="w-full text-right p-3 rounded-lg bg-slate-900 text-xs border border-slate-700/80 hover:border-cyan-500 hover:bg-slate-850 text-slate-200 transition"
                >
                  ب) التحديث المستمر للسياسات الأمنية بشكل فصلي استباقي.
                </button>
              </div>

              {quizAnswered && (
                <div
                  className={`mt-3 p-3 rounded-lg text-xs font-bold border ${
                    isCorrect
                      ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                  }`}
                >
                  {isCorrect
                    ? '✓ إجابة صحيحة! أحسنت، كسبت نجمة أكاديمية إضافية.'
                    : '✗ حاول مرة أخرى؛ راجع فقرة الحوكمة المؤسسية في الصفحة المقابلة.'}
                </div>
              )}
            </div>

            {/* المساعد الأكاديمي الذكي (AI Tutor Agent) */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <h4 className="text-xs font-bold text-cyan-400 mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <span>🤖</span> المساعد الأكاديمي الذكي (Tutor Agent)
                </span>
                <span className="text-[10px] text-slate-500">مُقيد بنطاق الدرس</span>
              </h4>

              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="اسأل عن أي مفهوم أو مصطلح في هذا الدرس..."
                  value={tutorQuery}
                  onChange={(e) => setTutorQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleTutorAsk()}
                  className="flex-1 px-3 py-2 text-xs bg-slate-900 text-slate-100 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500"
                />
                <button
                  onClick={handleTutorAsk}
                  disabled={isTutorLoading}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition"
                >
                  {isTutorLoading ? 'جاري...' : 'إرسال'}
                </button>
              </div>

              {tutorResponse && (
                <div className="p-3 bg-slate-900 rounded-lg text-xs text-cyan-200 border border-slate-700/80 leading-relaxed mt-2 animate-fadeIn">
                  {tutorResponse}
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex justify-between text-xs text-slate-500">
            <span>حقوق المحتوى محفوظة © منصة مرصاد</span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="text-slate-400 hover:text-cyan-400 disabled:opacity-30"
              >
                السابق
              </button>
              <span>صفحة {currentPage * 2}</span>
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                className="text-slate-400 hover:text-cyan-400"
              >
                التالي
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveBookComponent;
