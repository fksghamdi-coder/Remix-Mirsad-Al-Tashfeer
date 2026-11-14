// src/components/interactive/LiveBookComponent.tsx (Refactored)
import React, { useEffect, useState } from 'react';
import { apiClient } from '../../lib/apiClient';

export interface LiveBookChapter {
  number?: number;
  title: string;
  content: string;
  description?: string;
}

export interface InteractiveBookProps {
  courseId?: string;
  courseTitle?: string;
  chapterTitle?: string;
  chapterNumber?: number;
  pdfContentSummary?: string;
  interactiveLabType?: 'cmm' | 'pqc' | 'threats' | 'risk' | 'planning';
}

export const LiveBookComponent = ({
  courseId = 'ISE243',
}: InteractiveBookProps) => {
  const [chapters, setChapters] = useState<LiveBookChapter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = (await apiClient.request(
          `/courses/${courseId}/chapters`
        )) as LiveBookChapter[];
        setChapters(Array.isArray(result) ? result : []);
        setLoading(false);
      } catch (err) {
        console.error('Critical: Failed to load academic content', err);
        setLoading(false);
      }
    }
    fetchData();
  }, [courseId]);

  if (loading) return <div>تحميل المحتوى الأكاديمي المؤمن...</div>;

  return (
    <div className="book-container space-y-4">
      {chapters.map((chapter, idx) => (
        <div
          key={idx}
          className="page bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-2"
        >
          <h2 className="text-lg font-bold text-cyan-400">{chapter.title}</h2>
          <p className="text-sm text-slate-300 leading-relaxed">{chapter.content}</p>
          {/* هنا يتم ربط مشغل الفيديو المحمي */}
        </div>
      ))}
    </div>
  );
};

export default LiveBookComponent;
