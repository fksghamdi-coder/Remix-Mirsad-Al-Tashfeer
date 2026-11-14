// File: src/components/MainLayout.tsx
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import MainNav from './MainNav';
import UnifiedProjectFooter from './layout/UnifiedProjectFooter';
import { securityHardening } from '@/lib/securityHardening';

export default function MainLayout() {
  useEffect(() => {
    securityHardening();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <MainNav />
      <main className="py-8 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full flex-1" role="main">
        <Outlet />
      </main>
      <UnifiedProjectFooter />
    </div>
  );
}
