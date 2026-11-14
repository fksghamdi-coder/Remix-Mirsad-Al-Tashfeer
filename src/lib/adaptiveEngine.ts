export type LearnerLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface PerformanceInput {
  totalQuestions?: number;
  correctAnswers?: number;
  failedTopics?: string[];
  completedLabs?: number;
  totalLabs?: number;
  timeSpentSeconds?: number;
  averageScore?: number;
  recentScores?: number[];
}

export interface AnalysisResult {
  level: LearnerLevel;
  scorePercentage: number;
  failedTopics: string[];
  masteredTopics: string[];
  recommendations: string[];
  recommendedLab?: string;
  nextStep: string;
}

/**
 * محرك التعلم التكيفي (Adaptive Learning Engine)
 * يربط الأداء الأكاديمي بنطاق الصعوبة البرمجية.
 */
export const AdaptiveEngine = {
  determineDifficulty(studentPerformance: { correct: number; total: number }): LearnerLevel {
    const total = Math.max(studentPerformance.total, 1);
    const ratio = studentPerformance.correct / total;

    if (ratio > 0.85) return 'ADVANCED'; // مستوى احترافي
    if (ratio > 0.5) return 'INTERMEDIATE'; // مستوى متوسط
    return 'BEGINNER'; // مسار تقويمي تعليمي
  },

  async getDynamicPrompt(topic: string, level: string): Promise<string> {
    // إرجاع البرومبت المخصص لكل طالب بناءً على مستواه
    return `اشرح ${topic} بمستوى ${level}، مع التركيز على الأمثلة العملية للأمن السيبراني.`;
  },

  /**
   * تقييم أداء الطالب وتحديد مستواه الأكاديمي والتوصيات المخصصة
   */
  analyzePerformance(performanceData: PerformanceInput): AnalysisResult {
    const total = performanceData.totalQuestions || 10;
    const correct = performanceData.correctAnswers ?? 7;
    const rawPercentage =
      performanceData.averageScore ??
      Math.round((correct / Math.max(total, 1)) * 100);

    const failed = performanceData.failedTopics || [];

    let level: LearnerLevel = AdaptiveEngine.determineDifficulty({
      correct: rawPercentage,
      total: 100,
    });
    const recommendations: string[] = [];

    // تصنيف المستوى الأكاديمي الصارم
    if (rawPercentage >= 85 && failed.length <= 1) {
      level = 'ADVANCED';
      recommendations.push('جاهز للاختبار النهائي المتقدم وخوض تحديات بروتوكول ZKP');
      recommendations.push('الانتقال لمشروع الحوكمة المؤسسية والتقييم الكمي CMM Level 5');
    } else if (rawPercentage >= 65 && failed.length <= 3) {
      level = 'INTERMEDIATE';
      recommendations.push('مراجعة الفصول ذات الصلة بالمخاطر وإعادة اختبار المفاهيم الأساسية');
      recommendations.push('إتمام المختبرات التفاعلية لرفع نسبة الإتقان العملي');
    } else {
      level = 'BEGINNER';
      recommendations.push('التركيز على مراجعة أساسيات التشفير ومعايير NIST ومبادئ الدفاع في العمق');
      recommendations.push('إعادة محاولة الأسئلة النظرية واستخدام المساعد الأكاديمي الذكي للاستفسار');
    }

    if (failed.length > 0) {
      recommendations.push(
        `يوصى بإعادة مراجعة المواضيع التالية: ${failed.slice(0, 3).join('، ')}`
      );
    }

    const masteredTopics = [
      'مبادئ التشفير المتماثل وغير المتماثل',
      'إدارة المفاتيح وتواقيع الشهادات الرقمية',
      'نمذجة التهديدات السيبرانية',
    ].filter((topic) => !failed.includes(topic));

    let recommendedLab = 'مختبر براهين المعرفة الصفرية ZKP';
    if (level === 'BEGINNER') {
      recommendedLab = 'المختبر التفاعلي لقياس مستويات النضج CMM';
    } else if (level === 'ADVANCED') {
      recommendedLab = 'مختبر التشفير ما بعد الكمي PQC ونماذج NIST';
    }

    return {
      level,
      scorePercentage: rawPercentage,
      failedTopics: failed,
      masteredTopics,
      recommendations,
      recommendedLab,
      nextStep:
        level === 'ADVANCED'
          ? 'إصدار الشهادة الأكاديمية الرقمية المشفرة وتوثيق الختم'
          : 'استكمال المختبرات التفاعلية الموصى بها لرفع مستوى النضج',
    };
  },
};

export const analyzePerformance = AdaptiveEngine.analyzePerformance;

