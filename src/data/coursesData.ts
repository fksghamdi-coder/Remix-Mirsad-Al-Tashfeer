// File: src/data/coursesData.ts
import { getChaptersByCourse } from '@/lib/chapters';

export interface ChapterItem {
  id: number;
  number: number;
  title: string;
  description: string;
}

export interface CourseItem {
  id: string;
  slug: string;
  code: string;
  title: string;
  description: string;
  chapters: ChapterItem[];
}

function mapCourseChapters(slug: string): ChapterItem[] {
  const raw = getChaptersByCourse(slug);
  return raw.map((ch, idx) => ({
    id: ch.chapter_number || idx + 1,
    number: ch.chapter_number || idx + 1,
    title: ch.title,
    description: ch.description || ch.subtitle || ch.title,
  }));
}

export const COURSES_DATA: CourseItem[] = [
  {
    id: 'sec_prog',
    slug: 'ise232-programs',
    code: '232 علم',
    title: 'إدارة البرامج الأمنية',
    description: 'حوكمة وهندسة برامج الأمن السيبراني المؤسسية وفق ضوابط NCA ECC-2:2024',
    chapters: mapCourseChapters('ise232-programs'),
  },
  {
    id: 'ise243',
    slug: 'ise243',
    code: 'ISE 243',
    title: 'التشفير المتقدم',
    description: 'الأسس الرياضية لحقول غالوا GF(2^8)، معيار AES، المنحنيات الإهليلجية، والتشفير ما بعد الكم PQC',
    chapters: mapCourseChapters('ise243'),
  },
  {
    id: 'ise232',
    slug: 'ise232-threats',
    code: 'ISE 232',
    title: 'التهديدات السيبرانية',
    description: 'تحليل سلسلة القتل السيبراني، استخبارات التهديدات CTI، إطار MITRE ATT&CK، وقواعد Snort',
    chapters: mapCourseChapters('ise232-threats'),
  },
  {
    id: 'ise231',
    slug: 'ise231',
    code: 'ISE 231',
    title: 'تخطيط وإدارة الأمن السيبراني',
    description: 'التخطيط الاستراتيجي، أطر الحوكمة NIST CSF 2.0، واستمرارية الأعمال',
    chapters: mapCourseChapters('ise231'),
  },
  {
    id: 'upmn075',
    slug: 'ise232-risk',
    code: 'UPMN075',
    title: 'تحليل المخاطر السيبرانية',
    description: 'التحليل الكمي والنوعي للمخاطر، حسابات SLE وALE وROSI، ومنهجيات ISO 27005',
    chapters: mapCourseChapters('ise232-risk'),
  },
  {
    id: 'eng_cyber',
    slug: 'eng-cyber',
    code: 'CEFR A1–C2',
    title: 'مقرر اللغة الإنجليزية التعليمي الشامل (A1–C2)',
    description: 'منهج متدرج لتعلم قواعد اللغة الإنجليزية والمفردات والمحادثة والقراءة والكتابة من التأسيس إلى الاحتراف',
    chapters: mapCourseChapters('eng-cyber'),
  },
];
