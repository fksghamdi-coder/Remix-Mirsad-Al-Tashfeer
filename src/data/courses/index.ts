// File: src/data/courses/index.ts
import type { CourseInfo } from './types';
import { COURSE_ISE243_INFO } from './ise243/chapters';
import { COURSE_ISE231_INFO } from './ise231/chapters';
import { COURSE_UPMN075_RISK_INFO } from './ise232-risk/chapters';
import { COURSE_ISE232_THREATS_INFO } from './ise232-threats/chapters';
import { COURSE_ISE232_PROGRAMS_INFO } from './ise232-programs/chapters';
import { COURSE_ENG_CYBER_INFO } from './eng-cyber/chapters';
import { STUDENTS } from '../students';

export * from './types';
export { STUDENTS };

export const COURSE_ENG_ACADEMIC_INFO: CourseInfo = {
  ...COURSE_ENG_CYBER_INFO,
  id: 'course-eng-101',
  slug: 'english-mastery',
  code: 'ENG 101–301',
  title: 'مقرر اللغة الإنجليزية الأكاديمي والتدريبي الشامل (A1–C2)',
  titleEn: 'Interactive 3D English Training Book (CEFR A1 to C2)',
  category: 'اللغة الإنجليزية الأكاديمية والتدريبية',
  level: 'تأسيسي إلى متقدم (CEFR A1–C2)',
  icon: 'BookOpen',
  color: 'from-emerald-500 to-cyan-600',
  badge: '3D Training Book · 50 Pages',
  neonColor: 'emerald',
  status: 'available',
  chaptersCount: 5,
  totalHours: 50,
  description:
    'كتاب تفاعلي تدريبي ديناميكي ثلاثي الأبعاد يأخذ الطالب من التأسيس (A1) إلى الاحتراف الأكاديمي واختبار IELTS (C2) عبر صفحات كتاب مفتوح وتدريبات حية.',
  topics: [
    'A1–A2 Sentence Architecture',
    'B1–B2 Tenses, Conditionals & Passive',
    'IPA Phonetics & 3D Flip-Cards',
    'C1–C2 Academic Writing & IELTS',
  ],
  prerequisite: 'متاح لجميع المستويات من الصفر',
};

export const COURSES: CourseInfo[] = [
  COURSE_ISE243_INFO,
  COURSE_ISE231_INFO,
  COURSE_UPMN075_RISK_INFO,
  COURSE_ISE232_THREATS_INFO,
  COURSE_ISE232_PROGRAMS_INFO,
  COURSE_ENG_ACADEMIC_INFO,
];

export const COURSE_INFO: CourseInfo = COURSE_ISE243_INFO;

export function getCourseBySlug(slug: string): CourseInfo | undefined {
  const normalized = slug?.trim().toLowerCase();
  return COURSES.find(
    (c) =>
      c.slug.toLowerCase() === normalized ||
      ((normalized === 'eng-cyber' ||
        normalized === 'eng-academic' ||
        normalized === 'english-mastery') &&
        (c.slug === 'english-mastery' || c.slug === 'eng-academic' || c.slug === 'eng-cyber'))
  );
}

export function getCourseByCode(code: string): CourseInfo | undefined {
  const normalized = code?.trim().toLowerCase();
  return COURSES.find(
    (c) =>
      c.code.toLowerCase() === normalized ||
      c.slug.toLowerCase() === normalized
  );
}

export function getAvailableCourses(): CourseInfo[] {
  return COURSES.filter((c) => c.status === 'available');
}
