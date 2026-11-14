import { Navigate } from 'react-router-dom';
import ArchitectureViewer from '@/components/ui/ArchitectureViewer';
import { useAuth } from '@/contexts/AuthContext';

export default function ArchitecturePage() {
  const { session, isGuest } = useAuth();
  const isDeveloperOrAdmin = Boolean(
    !isGuest &&
      session &&
      (session.role === 'admin' ||
        session.username === 'admin' ||
        session.username === 'fk.sghamdi' ||
        session.username === 'fk_sghamdi')
  );

  if (!isDeveloperOrAdmin) {
    return <Navigate to="/main" replace />;
  }

  return (
    <div className="space-y-6">
      <ArchitectureViewer />
    </div>
  );
}
