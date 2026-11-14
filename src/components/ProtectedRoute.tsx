import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface Props {
  allowedRoles?: string[];
}

/** كل المسارات المحمية تتطلب جلسة حقيقية؛ الزائر وغير المسجّل يرون شاشة الترحيب فقط */
export default function ProtectedRoute({ allowedRoles }: Props) {
  const { session, isGuest, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-emerald-400 font-bold">
        جاري التحميل...
      </div>
    );
  }

  // 🚨 القاعدة الأولى: الزائر أو بلا جلسة → شاشة الترحيب فقط
  if (isGuest || !session) {
    return <Navigate to="/welcome" replace state={{ from: location, reason: isGuest ? 'guest_not_allowed' : 'no_session' }} />;
  }

  // 🚨 القاعدة الثالثة: يحتاج تغيير كلمة المرور
  if (session.needs_password_change && location.pathname !== '/change-password') {
    return <Navigate to="/change-password" replace />;
  }

  // 🚨 القاعدة الرابعة: دور غير مسموح
  if (allowedRoles && !allowedRoles.includes(session.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
