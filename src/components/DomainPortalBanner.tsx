import React, { useState } from 'react';
import { Globe, GraduationCap, Layers } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import ArchitectureViewer from '@/components/ui/ArchitectureViewer';

export default function DomainPortalBanner() {
  const navigate = useNavigate();
  const location = useLocation();
  const [archModalOpen, setArchModalOpen] = useState(false);

  const isAcademicRoute = location.pathname.startsWith('/academic');
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAuthRoute = ['/login', '/register', '/recovery', '/setup', '/welcome'].includes(location.pathname);

  if (isAdminRoute || isAuthRoute) return null;

  return (
    <>
      <div className="w-full bg-slate-950/95 border-b border-emerald-500/20 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">القسم الحالي في المشروع:</span>
            {isAcademicRoute ? (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono font-bold flex items-center gap-1.5 text-[11px]">
                <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                القسم الأكاديمي الثاني · ISE243 · شعبة (002م)
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 font-mono font-bold flex items-center gap-1.5 text-[11px]">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                القسم التطبيقي الأول · ISE243 · شعبة (002م)
              </span>
            )}
            <span className="hidden md:inline text-[11px] text-slate-500">
              ({isAcademicRoute ? 'بوابة البيئة الأكاديمية التفاعلية والمقررات' : 'بوابة المرصد التحليلي والمختبرات التشفيرية التدريبية'})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setArchModalOpen(true)} className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer" title="عرض البنية الهندسية ومخطط قواعد البيانات">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>البنية الهندسية للمشروع التدريبي</span>
            </button>

            {isAcademicRoute ? (
              <button onClick={() => navigate('/main')} className="px-2.5 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40 text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer">
                <Globe className="w-3.5 h-3.5" />
                <span>المرصد والمختبرات التدريبية</span>
              </button>
            ) : (
              <button onClick={() => navigate('/academic')} className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>البيئة الأكاديمية والمقررات</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Architecture Modal */}
      {archModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 dir-rtl">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setArchModalOpen(false)} />
          <div className="relative z-[101] w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-950 border border-slate-700">
            <ArchitectureViewer onClose={() => setArchModalOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
