// src/lib/TutorAgent.ts
import { apiClient } from './apiClient';

/**
 * وكيل المساعد الأكاديمي الذكي لمنصة مِرْصَاد
 * يطبق قيود الحماية الأكاديمية الصارمة (Guardrails) ويتصل بالخادم الخلفي الآمن
 */
export class TutorAgent {
  /**
   * فحص سريع لحدود النطاق الأكاديمي وحظر الاستفسارات الهجومية أو الضارة (Guardrail محلي مساند)
   */
  private isRelevantQuestion(question: string, chapterContent: string): boolean {
    const q = question.toLowerCase();

    // قائمة حظر الاستفسارات الضارة أو غير الأخلاقية (صنع برمجيات خبيثة أو اختراق غير مشروع)
    const maliciousPatterns = [
      'كيف أصنع فيروس',
      'كيف اصنع فيروس',
      'صنع فيروس',
      'فيروس حاسوبي',
      'صناعة فيروس',
      'برمجة فيروس',
      'كيف أخترق',
      'كيف اخترق',
      'اختراق حساب',
      'سرقة كلمات المرور',
      'تدمير جهاز',
      'هجوم فدية',
      'create a virus',
      'make malware',
      'how to hack',
    ];

    if (maliciousPatterns.some((pattern) => q.includes(pattern))) {
      return false;
    }

    const commonAcademicKeywords = [
      'أمن', 'تشفير', 'ضوابط', 'مخاطر', 'تهديدات', 'nist', 'iso', 'ecc', 'حوكمة',
      'aes', 'rsa', 'pqc', 'مقرر', 'فصل', 'دراسة', 'برهان', 'zkp', 'شهادة', 'معيار',
      'حماية', 'سياسة', 'امتثال', 'صلاحيات', 'هجوم', 'ثغرة', 'cmm', 'نضج', 'اختبار',
      'مفتاح', 'توقيع', 'هاش', 'sha', 'pbkdf2', 'خوارزمية', 'سري', 'بيانات', 'درس', 'شرح',
    ];

    const hasAcademicKeyword = commonAcademicKeywords.some((kw) => q.includes(kw));
    const wordsInChapter = chapterContent
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 3);
    const hasChapterKeyword = wordsInChapter.some((w) => q.includes(w));

    return hasAcademicKeyword || hasChapterKeyword;
  }

  async askTutor(question: string, chapterContent: string): Promise<string> {
    const trimmed = question.trim();
    if (!trimmed) {
      return 'أنا هنا لمساعدتك في المحتوى الأكاديمي، بماذا يمكنني مساعدتك؟';
    }

    // 1. تطبيق نظام الحماية والقيود (Guardrails)
    const systemPrompt = `أنت مساعد أكاديمي لمنصة مِرْصَاد. 
    محتوى الدرس الحالي: "${chapterContent}"
    قاعدة صارمة: لا تجب إلا بناءً على محتوى الدرس أعلاه. 
    إذا كان السؤال خارج نطاق الدرس أو خارج تخصص الأمن السيبراني، أجب بـ: 
    "أنا هنا لمساعدتك في المحتوى الأكاديمي، بماذا يمكنني مساعدتك؟"`;

    if (!this.isRelevantQuestion(trimmed, chapterContent)) {
      return 'أنا هنا لمساعدتك في المحتوى الأكاديمي، بماذا يمكنني مساعدتك؟';
    }

    try {
      const aiTutorData = (await apiClient.request('/ai-tutor', 'POST', {
        question: trimmed,
        context: chapterContent,
      })) as { answer?: string };
      if (aiTutorData && aiTutorData.answer) {
        return aiTutorData.answer;
      }
    } catch {
      // المتابعة إلى نقطة النهاية البديلة عند عدم توفر التوكن أو تعذر الاتصال
    }

    try {
      const response = await fetch('/api/v1/tutor/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: trimmed,
          chapterContent,
          systemPrompt,
        }),
      });

      if (response.ok) {
        const data = (await response.json()) as { answer?: string };
        if (data.answer) {
          return data.answer;
        }
      }
    } catch (error) {
      console.error('[TutorAgent] Error:', error);
    }

    // استجابة أكاديمية مقيدة بمحتوى الدرس عند تعذر الاتصال بالخادم
    return `بناءً على محتوى الدرس الحالي (${chapterContent.slice(0, 90)}...): يركّز هذا المحور على تطبيق الضوابط التشفيرية والأمنية المعتمدة لحماية البيانات والأنظمة وفق المعايير الأكاديمية.`;
  }
}

export const tutorAgent = new TutorAgent();
