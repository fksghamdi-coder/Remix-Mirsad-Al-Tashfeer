# التحديث الاختياري المكمل (ملف واحد مستقل): `src/lib/tests/creativity.test.ts`

> **الهدف:** تحديث سطر التحقق في لوحة الاختبارات الذاتية (`/test`) ليتطابق مع تشفير الرقم الأكاديمي للطالب الأول في الشريط المتحرك (`002M-01` بدلاً من `25105375`)، بحيث تنجح جميع الفحوصات الذاتية بنسبة 100% دون أي تحذير.
> **طريقة التطبيق:** افتح الملف `src/lib/tests/creativity.test.ts` واستبدل محتواه بالكامل بالكود التالي:

```
// src/lib/tests/creativity.test.ts
import { testRunner, expect } from '../testRunner';

export function registerCreativityTests() {
  testRunner.describe('🎨 المرحلة 3: الإبداع والخصائص المتقدمة', () => {
    testRunner.it('1. ترتيب الفريق الجديد صحيح', async () => {
      const { STUDENTS } = await import('@/data/students');
      expect(STUDENTS[0].name).toBe('فهد خالد الغامدي');
      expect(STUDENTS[0].academicId).toBe('002M-01');
      expect(STUDENTS[5].name).toBe('عمر إبراهيم بن مشعان');
      expect(STUDENTS[6].name).toBe('إيمان محمد الأهدل');
      expect(STUDENTS[9].name).toBe('خديجة محمد جعفري');
      expect(STUDENTS.length).toBe(10);
    });

    testRunner.it('2. بنك الصور يحتوي على 86 prompt', async () => {
      const { getTotalPromptsCount } = await import('@/data/chapterPrompts');
      const total = getTotalPromptsCount();
      expect(total).toBe(86);
    });

    testRunner.it('3. كل مقرر له prompts', async () => {
      const { CHAPTER_PROMPTS } = await import('@/data/chapterPrompts');
      expect(Object.keys(CHAPTER_PROMPTS).length).toBe(5);
      // ISE243
      expect(Object.keys(CHAPTER_PROMPTS.ise243).length).toBe(12);
      // ISE231
      expect(Object.keys(CHAPTER_PROMPTS.ise231).length).toBe(11);
    });

    testRunner.it('4. كل prompt فريد', async () => {
      const { CHAPTER_PROMPTS } = await import('@/data/chapterPrompts');
      const all: string[] = [];
      for (const course of Object.values(CHAPTER_PROMPTS)) {
        for (const prompts of Object.values(course)) {
          all.push(...prompts);
        }
      }
      const unique = new Set(all);
      expect(unique.size).toBe(all.length);
    });

    testRunner.it('5. getChapterPrompt يعيد prompt صحيح', async () => {
      const { getChapterPrompt } = await import('@/data/chapterPrompts');
      const p1 = getChapterPrompt('ise243', 1, 0);
      const p2 = getChapterPrompt('ise243', 1, 1);
      expect(p1.length).toBeGreaterThan(10);
      expect(p2.length).toBeGreaterThan(10);
      expect(p1 !== p2).toBe(true);
    });

    testRunner.it('6. buildAcademicImage ينشئ رابط صالح', async () => {
      const { buildAcademicImage } = await import('@/lib/academicImages');
      const url = buildAcademicImage('ise243', 1, 0);
      expect(url.startsWith('data:image/png;base64,') || url.startsWith('/icons/')).toBe(true);
    });

    testRunner.it('7. الفهرس المعرفي يحتوي على عقد', async () => {
      const { KNOWLEDGE_NODES } = await import('@/data/knowledgeGraph');
      expect(KNOWLEDGE_NODES.length).toBeGreaterThan(30);
    });

    testRunner.it('8. البحث في الفهرس يعمل', async () => {
      const { searchNodes } = await import('@/data/knowledgeGraph');
      const results = searchNodes('AES');
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].label).toContain('AES');
    });

    testRunner.it('9. العلاقات بين العقد صحيحة', async () => {
      const { getRelatedNodes } = await import('@/data/knowledgeGraph');
      const related = getRelatedNodes('aes');
      expect(related.length).toBeGreaterThan(0);
      expect(related.some((n) => n.id === 'galois-field')).toBe(true);
    });

    testRunner.it('10. كل مفاهيم ISE243 موجودة', async () => {
      const { getNodesByCourse } = await import('@/data/knowledgeGraph');
      const nodes = getNodesByCourse('ise243');
      expect(nodes.length).toBeGreaterThan(10);
    });
  });
}

// Auto-register when imported
registerCreativityTests();

```