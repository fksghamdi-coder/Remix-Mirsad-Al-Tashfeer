// new_structure/modules/academic/crypto/ChapterTemplate.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ChapterProps {
  title: string;
  content: string;
  lab3DContent: React.ReactNode;
}

export const ChapterTemplate: React.FC<ChapterProps> = ({ title, content, lab3DContent }) => {
  const [_activeStep] = useState(0);
  void motion;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 min-h-screen">
      {/* الفئة الأولى: التنسيق الأكاديمي */}
      <div className="glass-panel p-8 rounded-3xl overflow-y-auto">
        <h1 className="text-4xl font-black text-emerald-400 mb-6">{title}</h1>
        <div className="prose prose-invert prose-emerald leading-relaxed">
          {content}
        </div>
      </div>

      {/* الفئة الثانية: الكتاب التفاعلي 3D */}
      <div className="flex flex-col gap-6">
        <div className="bg-black/40 p-6 rounded-3xl border border-cyan-500/30">
          <h3 className="text-lg font-bold text-cyan-400 mb-4">المختبر التفاعلي (3D Live Interaction)</h3>
          {lab3DContent}
        </div>
        <div className="bg-slate-900/80 p-6 rounded-3xl border border-amber-500/30">
          <h3 className="font-bold text-amber-400">شرح الخطوات التفاعلية</h3>
          <p className="text-sm text-slate-400 mt-2">انقر على المكونات أعلاه لتفعيل المحاكاة الحية...</p>
        </div>
      </div>
    </div>
  );
};
