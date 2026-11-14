import { ChapterData, SolvedExample, QuizQuestion } from '@/lib/mockData';
import { Chapter } from '@/data/courses/types';

/**
 * محرك ترقية الفصول: يدمج المحتوى الخام مع الهيكل التفاعلي الغني
 */
export function hydrateChapter(chapter: Chapter, richData: Partial<ChapterData> = {}): Chapter {
  if (chapter.richData && Object.keys(richData).length === 0) {
    return chapter;
  }

  const rawPages = chapter.content
    ? chapter.content.split('---page---').map(p => p.trim()).filter(Boolean)
    : [];

  const defaultSections =
    rawPages.length > 0
      ? rawPages.map((pageText, idx) => {
          const headingMatch = pageText.match(/^#{1,3}\s+(.+)/m);
          const heading = headingMatch ? headingMatch[1].trim() : idx === 0 ? 'مقدمة' : `القسم ${idx + 1}`;
          const cleanedContent = headingMatch ? pageText.replace(/^#{1,3}\s+.+\n?/, '').trim() : pageText;
          return {
            heading,
            content: cleanedContent || pageText,
          };
        })
      : [{ heading: 'مقدمة', content: chapter.content }];

  const validCategory = (
    ['أساسي', 'متقدم', 'شبكات', 'كمومي', 'تطبيقي'].includes(chapter.category)
      ? chapter.category
      : 'أساسي'
  ) as ChapterData['category'];

  return {
    ...chapter,
    richData: {
      id: chapter.id,
      chapter_number: chapter.chapter_number,
      title: chapter.title,
      subtitle: chapter.subtitle || 'فصل تفاعلي متقدم',
      category: validCategory,
      pdfStartPage: chapter.pdfStartPage || 1,
      pdfEndPage: chapter.pdfEndPage || 10,
      description: chapter.description,
      objectives:
        richData.objectives ||
        (chapter.keyTopics && chapter.keyTopics.length > 0
          ? chapter.keyTopics
          : ['فهم المفهوم الأساسي', 'تطبيق المفهوم عملياً', 'تحليل الأثر الأمني']),
      sections: richData.sections || defaultSections,
      tables: richData.tables || [],
      commonMistake: richData.commonMistake || {
        mistake: 'يتم رصد الخطأ لاحقاً',
        fix: 'تجنب هذا الخطأ عبر المراجعة',
      },
      solvedExample:
        richData.solvedExample ||
        ({
          title: 'مثال توضيحي',
          given: 'معطيات',
          steps: ['خطوة 1'],
          result: 'النتيجة',
          whyItMatters: 'الأهمية',
        } satisfies SolvedExample),
      flashcards: chapter.flashcards || [],
      selfAssessment: richData.selfAssessment || [],
      quiz: (richData.quiz || chapter.miniQuiz || []) satisfies QuizQuestion[],
    },
  };
}
