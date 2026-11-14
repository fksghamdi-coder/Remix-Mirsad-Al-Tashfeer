import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Sparkles } from 'lucide-react';
import InteractiveTextbook from '@/components/academic/InteractiveTextbook';
import InternalSupport from '@/components/ui/InternalSupport';
import { COURSES } from '@/data/courses';
import { getChaptersByCourse } from '@/lib/chapters';

export default function LiveBookPage() {
  const academicCourses = COURSES.filter((c) => c.slug !== 'eng-cyber');
  const [selectedSlug, setSelectedSlug] = useState<string>('ise243');
  const currentCourse = academicCourses.find((c) => c.slug === selectedSlug) || academicCourses[0];
  const chapters = getChaptersByCourse(currentCourse.slug);
  const [selectedChapterIdx, setSelectedChapterIdx] = useState<number>(0);

  const activeChapter = chapters[selectedChapterIdx] || chapters[0];

  return (
    <div className="space-y-8" dir="rtl">
      {/* شريط اختيار المقرر والفصل للكتاب التفاعلي 3D */}
      <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 bg-slate-900/90 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>الكتاب الجامعي التفاعلي ثلاثي الأبعاد (3D Interactive Textbook) · شعبة (002م) · (2026-2027)</span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white">
                {currentCourse.title} ({currentCourse.code}) — الفصل {activeChapter?.chapter_number}: {activeChapter?.title}
              </h1>
            </div>
          </div>

          <Link
            to="/academic/english"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 flex items-center gap-2 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>كتاب اللغة الإنجليزية التفاعلي 3D (ENG 101–301)</span>
          </Link>
        </div>

        {/* اختيار المقرر */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 ml-2">المقرر:</span>
          {academicCourses.map((course) => (
            <button
              key={course.slug}
              type="button"
              onClick={() => {
                setSelectedSlug(course.slug);
                setSelectedChapterIdx(0);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                course.slug === currentCourse.slug
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                  : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {course.code} · {course.title}
            </button>
          ))}
        </div>

        {/* اختيار الفصل */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/80">
          <span className="text-xs font-bold text-slate-400 ml-2">الفصل:</span>
          {chapters.map((ch, idx) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => setSelectedChapterIdx(idx)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                idx === selectedChapterIdx
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                  : 'bg-slate-950/70 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              فصل {ch.chapter_number}: {ch.title}
            </button>
          ))}
        </div>
      </div>

      {/* عرض الكتاب التفاعلي 3D الحقيقي */}
      {activeChapter && (
        <InteractiveTextbook
          chapter={activeChapter}
          courseTitle={currentCourse.title}
          courseSlug={currentCourse.slug}
        />
      )}

      {/* قسم الدعم الفني والأكاديمي المباشر داخل صفحة الكتاب الحي */}
      <div className="max-w-5xl mx-auto">
        <InternalSupport />
      </div>
    </div>
  );
}
