# الخطوة النهائية (2 من 6) قبل الإطلاق: الكود الكامل لملف تخطيط لوحة الإدارة والإعدادات
**المسار في المشروع:** `src/components/AdminLayout.tsx`

انسخ الكود التالي بالكامل واستبدل به محتوى ملف `src/components/AdminLayout.tsx`:

```tsx
// File: src/components/AdminLayout.tsx
import { useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Shield, UserCircle, Settings as SettingsIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { securityHardening } from '@/lib/securityHardening';
import AdminNav from './AdminNav';
import UnifiedProjectFooter from './layout/UnifiedProjectFooter';

export default function AdminLayout() {
  const { isGuest, session, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    securityHardening();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-blue-300 font-bold text-sm">جارٍ التحميل...</p>
        </div>
      </div>
    );
  }

  if (isGuest || !session) {
    return <Navigate to="/welcome" replace />;
  }

  const isSettingsRoute =
    location.pathname === '/settings' || location.pathname.startsWith('/admin/settings');
  const isAdmin = session.role === 'admin';

  if (!isAdmin && !isSettingsRoute) {
    return <Navigate to="/main" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <AdminNav />
      <main className="flex-1 py-8 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full" role="main">
        <div className="mb-6 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30">
            {isAdmin ? (
              <Shield className="w-5 h-5 text-blue-400" />
            ) : (
              <SettingsIcon className="w-5 h-5 text-emerald-400" />
            )}
          </div>
          <div>
            <h1 className="text-lg font-black text-blue-200">
              {isAdmin ? 'لوحة إدارة مِرْصَاد' : 'الإعدادات وإدارة الحساب الشخصي'}
            </h1>
            <p className="text-xs text-slate-500">
              {isAdmin
                ? 'الإدارة المركزية للمنصة الأكاديمية'
                : 'إدارة الحساب الشخصي والأمان وتفضيلات المستخدم'}
            </p>
          </div>
          <div className="mr-auto flex items-center gap-2 text-xs text-slate-400">
            <UserCircle className="w-4 h-4 text-blue-400" />
            <span>{session.displayName || session.username}</span>
          </div>
        </div>
        <Outlet />
      </main>
      <UnifiedProjectFooter />
    </div>
  );
}
```
