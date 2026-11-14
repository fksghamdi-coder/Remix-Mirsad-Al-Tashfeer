// src/lib/privacy.ts
// أدوات تقنيع المعرّفات الشخصية في الواجهة العامة.

/**
 * يقنّع آخر `hidden` خانات من الرقم الأكاديمي بنجوم، مع الإبقاء على البادئة للتفريق البصري.
 * مثال: "4310592" -> "431****"
 */
export function maskAcademicId(id: string, hidden = 4): string {
  const s = (id || '').trim();
  if (!s) return '';
  if (s.length <= hidden) return '*'.repeat(s.length);
  return s.slice(0, s.length - hidden) + '*'.repeat(hidden);
}
