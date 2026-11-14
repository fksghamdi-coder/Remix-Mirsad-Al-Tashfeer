// File: src/lib/academicImages.ts
import { getChapterPrompt } from '@/data/chapterPrompts';
import { generateScientificDiagramDataUrl } from './aiImages';

export async function buildAcademicImageAsync(
  course: string,
  chapter: number,
  imageIndex: number
): Promise<string> {
  return buildAcademicImage(course, chapter, imageIndex);
}

export function buildAcademicImage(
  course: string,
  chapter: number,
  imageIndex: number,
  caption?: string
): string {
  const prompt =
    getChapterPrompt(course, chapter, imageIndex) ||
    caption ||
    `المخطط العلمي للفصل ${chapter} في مقرر ${course.toUpperCase()} (شكل ${imageIndex + 1})`;

  return generateScientificDiagramDataUrl(prompt, {
    courseSlug: course,
    chapterNumber: chapter,
    seed: chapter * 10 + imageIndex,
    caption: caption || `الشكل التوضيحي (${imageIndex + 1}) — الفصل ${chapter} (${course.toUpperCase()})`,
  });
}
