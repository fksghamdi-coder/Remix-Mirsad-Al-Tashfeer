import { Link } from 'react-router-dom';
import { Home, LogIn, ShieldAlert, GraduationCap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function NotFound() {
  const { isGuest, session } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center text-center p-4">
      <div className="glass-panel p-8 rounded-3xl max-w-md w-full">
        <ShieldAlert className="w-16 h-16 text-amber-400 mx-auto mb-4" />
        <h1 className="text-5xl font-black gradient-text mb-2">404</h1>
        <p className="text-slate-400 mb-6">الصفحة التي تبحث عنها غير موجودة</p>

        <div className="space-y-2">
          <Link
            to="/main"
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> العودة للرئيسية
          </Link>

          {isGuest && (
            <Link
              to="/login"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-600/20 text-amber-300 border border-amber-500/40 hover:bg-amber-600/30 transition-all text-sm font-bold"
            >
              <LogIn className="w-4 h-4" /> سجّل دخولاً كاملاً للوصول للمنصة الأكاديمية
            </Link>
          )}

          {session && (
            <Link
              to="/academic"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition-all text-sm font-bold"
            >
              <GraduationCap className="w-4 h-4" /> المنصة الأكاديمية
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
