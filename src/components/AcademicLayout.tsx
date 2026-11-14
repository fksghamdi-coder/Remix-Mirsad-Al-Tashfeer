// File: src/components/AcademicLayout.tsx
import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { securityHardening } from '../lib/securityHardening';
import '../styles/PlatformLayout.css';
import AcademicNav from './AcademicNav';
import UnifiedProjectFooter from './layout/UnifiedProjectFooter';

export default function AcademicLayout() {
  const { isGuest, session, isLoading } = useAuth();

  useEffect(() => {
    securityHardening({ strictRedirect: false, showVisualBanner: true });
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-amber-400 font-bold">
        جارٍ التحميل...
      </div>
    );
  }

  if (isGuest || !session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-amber-950/10 to-slate-950">
      <AcademicNav />
      <main className="py-8 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full flex-1">
        <Outlet />
      </main>
      <UnifiedProjectFooter />
    </div>
  );
}
