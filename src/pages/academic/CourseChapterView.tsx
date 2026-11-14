import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AcademicModeContainer } from '@/components/academic/AcademicModeContainer';
import { Interactive3DBookEngine } from '@/components/interactive/Interactive3DBookEngine';
import { InternalNotebook } from '@/components/ui/InternalNotebook';
import { CertificatePreview } from '@/components/ui/CertificatePreview';
import { getChaptersByCourse } from '@/lib/chapters';
import { getCourseBySlug } from '@/data/courses';
import { ArrowLeft, BookOpen, Layers, Edit3, Award } from 'lucide-react';

export default function CourseChapterView() {
  const { courseId, chapterId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'reader' | 'book3d' | 'notebook' | 'certificate'>('reader');

  const effectiveSlug = courseId || 'ise232-programs';
  const course = getCourseBySlug(effectiveSlug);
  const chapters = getChaptersByCourse(effectiveSlug);
  const parsedChapterId = Number(chapterId) || 1;
  const currentChapter =
    chapters.find((c) => c.id === parsedChapterId || c.chapter_number === parsedChapterId) ||
    chapters[0];

  if (!currentChapter) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans dir-rtl" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/academic/${course?.slug || effectiveSlug}/chapters`)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-xs font-mono text-emerald-400">
                {course?.code || effectiveSlug.toUpperCase()} — {course?.title || ''}
              </span>
              <h1 className="text-xl font-bold text-slate-100">
                الفصل {currentChapter.chapter_number}: {currentChapter.title}
              </h1>
            </div>
          </div>

          {/* Mode Selector */}
          <div className="flex gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('reader')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'reader' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4" /> القارئ التفاعلي
            </button>
            <button
              onClick={() => setActiveTab('book3d')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'book3d' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" /> العرض ثلاثي الأبعاد
            </button>
            <button
              onClick={() => setActiveTab('notebook')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'notebook' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Edit3 className="w-4 h-4" /> الدفتر المشفر
            </button>
            <button
              onClick={() => setActiveTab('certificate')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                activeTab === 'certificate' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Award className="w-4 h-4" /> الشهادة
            </button>
          </div>
        </div>

        {/* View Switcher */}
        {activeTab === 'reader' && (
          <AcademicModeContainer
            chapter={(currentChapter.richData || currentChapter) as unknown as import('@/types/academic').ChapterData}
          />
        )}
        {activeTab === 'book3d' && (
          <Interactive3DBookEngine
            totalPages={64}
            currentChapterTitle={`الفصل ${currentChapter.chapter_number}: ${currentChapter.title}`}
          />
        )}
        {activeTab === 'notebook' && <InternalNotebook />}
        {activeTab === 'certificate' && (
          <CertificatePreview
            courseTitle={`${course?.title || effectiveSlug.toUpperCase()}: ${currentChapter.title}`}
          />
        )}
      </div>
    </div>
  );
}
