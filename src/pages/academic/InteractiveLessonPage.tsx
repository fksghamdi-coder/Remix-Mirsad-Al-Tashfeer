import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Sparkles, MonitorPlay } from 'lucide-react';
import InteractiveLessonViewer from '@/components/interactive/InteractiveLessonViewer';

export default function InteractiveLessonPage() {
  const [searchParams] = useSearchParams();
  const initialCourse = searchParams.get('course') || 'ise232-programs';
  const initialChapter = parseInt(searchParams.get('chapter') || '1', 10);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-6">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link to="/academic" className="hover:text-amber-300 transition-colors flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>المنصة الأكاديمية</span>
          </Link>
          <span>/</span>
          <span className="text-amber-300 font-bold flex items-center gap-1">
            <MonitorPlay className="w-3.5 h-3.5" />
            <span>الشرح التفاعلي المتطور</span>
          </span>
        </div>

        <Link
          to="/academic"
          className="text-xs font-bold text-amber-200 hover:text-white flex items-center gap-1.5 px-4 py-2 rounded-xl btn-3d-neon btn-3d-amber transition-all duration-300 active:scale-95"
        >
          <span>العودة إلى فهرس المقررات</span>
          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
        </Link>
      </div>

      {/* Main Interactive Lesson Studio */}
      <InteractiveLessonViewer
        initialCourseSlug={initialCourse}
        initialChapterId={initialChapter}
      />
    </div>
  );
}
