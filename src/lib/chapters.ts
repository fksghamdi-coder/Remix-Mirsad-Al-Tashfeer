// File: src/lib/chapters.ts
import { Chapter, FlashcardData } from '@/data/courses/types';
import { SyncEngine } from './syncEngine';
import {
  getChapters as getISE243Chapters,
  saveChapters as saveISE243Chapters,
  addChapter as addISE243Chapter,
  updateChapter as updateISE243Chapter,
  deleteChapter as deleteISE243Chapter,
  resetChapters as resetISE243Chapters,
} from './chapters-ise243';
import { ISE231_CHAPTERS } from '@/data/courses/ise231/chapters';
import { ISE232_RISK_CHAPTERS } from '@/data/courses/ise232-risk/chapters';
import { ISE232_THREATS_CHAPTERS } from '@/data/courses/ise232-threats/chapters';
import { ISE232_PROGRAMS_CHAPTERS } from '@/data/courses/ise232-programs/chapters';
import { ENG_CYBER_CHAPTERS } from '@/data/courses/eng-cyber/chapters';
import { COURSES } from '@/data/courses';
import { hydrateChapter } from './chapterHydrator';

void SyncEngine;

export type { Chapter, FlashcardData };
export { hydrateChapter };

export function normalizeCourseSlug(slug: string): string {
  const s = (slug || 'ise243').trim().toLowerCase();
  if (s === 'ise232' || s === 'threats' || s === 'ise232-threat' || s === 'threat') return 'ise232-threats';
  if (s === 'upmn075' || s === 'risk' || s === 'ise232-risk' || s === 'upmn') return 'ise232-risk';
  if (s === '232elm' || s === 'sec_prog' || s === 'programs' || s === 'ise232-programs' || s === 'sec-prog') return 'ise232-programs';
  if (s === 'eng-academic' || s === 'english-mastery') return 'eng-cyber';
  return s;
}

const COURSE_CHAPTERS: Record<string, () => Chapter[]> = {
  ise243: () => getISE243Chapters() as unknown as Chapter[],
  ise231: () => ISE231_CHAPTERS as unknown as Chapter[],
  'ise232-risk': () => ISE232_RISK_CHAPTERS as unknown as Chapter[],
  'ise232-threats': () => ISE232_THREATS_CHAPTERS as unknown as Chapter[],
  'ise232-programs': () => ISE232_PROGRAMS_CHAPTERS as unknown as Chapter[],
  'eng-cyber': () => ENG_CYBER_CHAPTERS as unknown as Chapter[],
  'eng-academic': () => ENG_CYBER_CHAPTERS as unknown as Chapter[],
  'english-mastery': () => ENG_CYBER_CHAPTERS as unknown as Chapter[],
  upmn075: () => ISE232_RISK_CHAPTERS as unknown as Chapter[],
  ise232: () => ISE232_THREATS_CHAPTERS as unknown as Chapter[],
  '232elm': () => ISE232_PROGRAMS_CHAPTERS as unknown as Chapter[],
  sec_prog: () => ISE232_PROGRAMS_CHAPTERS as unknown as Chapter[],
};

// مفتاح محدث لتجاوز أي نسخة قديمة كانت تحفظ فصلاً واحداً فقط في localStorage
const KEY_PREFIX = 'mirsad_chapters_v10_isolated_';

export function getChaptersByCourse(slug: string): Chapter[] {
  const normalized = normalizeCourseSlug(slug);
  if (normalized === 'ise243') {
    return (getISE243Chapters() as unknown as Chapter[]).map((ch) =>
      ch.richData ? ch : hydrateChapter(ch)
    );
  }
  const chapterGetter = COURSE_CHAPTERS[normalized] || COURSE_CHAPTERS['ise243'];
  const sourceChapters = (chapterGetter?.() || []).map((ch) =>
    ch.richData ? ch : hydrateChapter(ch)
  );

  // قراءة فصول المقرر دائماً من مصفوفته المصدرية المعتمدة لضمان عزل الفصول ومنع تداخلها
  return sourceChapters;
}

export function getChapters(slug: string = 'ise243'): Chapter[] {
  return getChaptersByCourse(slug);
}

export function getChapterById(slugOrId: string | number, maybeId?: number): Chapter | undefined {
  if (typeof slugOrId === 'number') {
    return getChaptersByCourse('ise243').find(
      (c) => c.id === slugOrId || c.chapter_number === slugOrId
    );
  }
  const slug = slugOrId;
  const id = Number(maybeId);
  return getChaptersByCourse(slug).find(
    (c) => c.id === id || c.chapter_number === id
  );
}

export function saveChapters(slug: string, chapters: Chapter[]) {
  if (slug === 'ise243') {
    saveISE243Chapters(chapters as unknown as Parameters<typeof saveISE243Chapters>[0]);
    return;
  }
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(KEY_PREFIX + slug.toLowerCase(), JSON.stringify(chapters));
    } catch {
      // Ignore quota errors
    }
  }
}

export function addChapter(
  slugOrChapter: string | Omit<Chapter, 'id' | 'updated_at'>,
  maybeChapter?: Omit<Chapter, 'id' | 'updated_at'>
): number {
  if (typeof slugOrChapter !== 'string') {
    return addISE243Chapter(slugOrChapter as unknown as Parameters<typeof addISE243Chapter>[0]);
  }
  const slug = slugOrChapter;
  const chapter = maybeChapter!;
  const chapters = getChaptersByCourse(slug);
  const newId = Math.max(0, ...chapters.map((c) => c.id)) + 1;
  chapters.push({ ...chapter, id: newId, updated_at: Date.now() });
  saveChapters(slug, chapters);
  return newId;
}

export function updateChapter(
  slugOrId: string | number,
  idOrUpdates: number | Partial<Chapter>,
  maybeUpdates?: Partial<Chapter>
) {
  if (typeof slugOrId === 'number') {
    updateISE243Chapter(
      slugOrId,
      idOrUpdates as unknown as Parameters<typeof updateISE243Chapter>[1]
    );
    return;
  }
  const slug = slugOrId;
  const id = idOrUpdates as number;
  const updates = maybeUpdates!;
  const chapters = getChaptersByCourse(slug).map((c) =>
    c.id === id ? { ...c, ...updates, updated_at: Date.now() } : c
  );
  saveChapters(slug, chapters);
}

export function deleteChapter(slugOrId: string | number, maybeId?: number) {
  if (typeof slugOrId === 'number') {
    deleteISE243Chapter(slugOrId);
    return;
  }
  const slug = slugOrId;
  const id = maybeId!;
  saveChapters(slug, getChaptersByCourse(slug).filter((c) => c.id !== id));
}

export function resetChapters(slug: string = 'ise243') {
  if (slug === 'ise243') {
    resetISE243Chapters();
    return;
  }
  if (typeof window !== 'undefined') {
    const defaultList = COURSE_CHAPTERS[slug.toLowerCase()]?.() || [];
    try {
      localStorage.setItem(KEY_PREFIX + slug.toLowerCase(), JSON.stringify(defaultList));
    } catch {
      // Ignore quota errors
    }
  }
}

export function getAllChapters(): Chapter[] {
  return [
    ...(getISE243Chapters() as unknown as Chapter[]),
    ...(ISE231_CHAPTERS as unknown as Chapter[]),
    ...(ISE232_RISK_CHAPTERS as unknown as Chapter[]),
    ...(ISE232_THREATS_CHAPTERS as unknown as Chapter[]),
    ...(ISE232_PROGRAMS_CHAPTERS as unknown as Chapter[]),
    ...(ENG_CYBER_CHAPTERS as unknown as Chapter[]),
  ];
}

export interface AggregateStats {
  totalCourses: number;
  totalChapters: number;
  totalFlashcards: number;
  totalKeyTopics: number;
  perCourse: {
    slug: string;
    title: string;
    code: string;
    chaptersCount: number;
    flashcardsCount: number;
  }[];
}

export function getAggregateStats(): AggregateStats {
  const perCourse = COURSES.map((course) => {
    const chapters = getChaptersByCourse(course.slug);
    return {
      slug: course.slug,
      title: course.title,
      code: course.code,
      chaptersCount: chapters.length,
      flashcardsCount: chapters.reduce((sum, ch) => sum + (ch.flashcards || []).length, 0),
    };
  });

  return {
    totalCourses: perCourse.length,
    totalChapters: perCourse.reduce((sum, c) => sum + c.chaptersCount, 0),
    totalFlashcards: perCourse.reduce((sum, c) => sum + c.flashcardsCount, 0),
    totalKeyTopics: perCourse.reduce((sum, c) => {
      const chapters = getChaptersByCourse(c.slug);
      return sum + chapters.reduce((s, ch) => s + (ch.keyTopics || []).length, 0);
    }, 0),
    perCourse,
  };
}

export function getChapterCountByCourse(): Record<string, number> {
  return COURSES.reduce((acc, course) => {
    acc[course.slug] = getChaptersByCourse(course.slug).length;
    return acc;
  }, {} as Record<string, number>);
}
