// src/pages/academic/AcademicHomeRedirect.tsx
import { Navigate, useParams } from 'react-router-dom';
import { getCourseBySlug } from '@/data/courses';

export default function AcademicHomeRedirect() {
  const { courseSlug } = useParams();
  const course = getCourseBySlug(courseSlug || '');

  // تحقق من وجود المقرر وأنه متاح
  if (!course || course.status !== 'available') {
    return <Navigate to="/academic" replace />;
  }

  // توجه مباشرة إلى قائمة الفصول
  return <Navigate to={`/academic/${courseSlug}/chapters`} replace />;
}
