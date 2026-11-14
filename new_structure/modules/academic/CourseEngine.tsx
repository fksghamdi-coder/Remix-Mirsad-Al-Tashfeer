import React from 'react';
import { ChapterTemplate } from './crypto/ChapterTemplate';
import manifest from './crypto/manifest.json';
import { ECCEngine } from '../labs/ECCEngine';

export const CourseEngine: React.FC<{ chapterId: string }> = ({ chapterId }) => {
  const chapterData = manifest.chapters.find(c => c.id === chapterId);
  
  if (!chapterData) return <div>الفصل غير موجود</div>;

  return (
    <ChapterTemplate 
      title={chapterData.title}
      content={chapterData.summary}
      lab3DContent={
        chapterData.interactive === 'ECC_CURVE_VISUALIZER' 
        ? <ECCEngine />
        : <div>محرك قياسي</div>
      }
    />
  );
};

