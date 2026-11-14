import { ScrollText } from 'lucide-react';
import LegalContent from '@/components/LegalContent';

export default function Legal() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-14 h-14 mx-auto rounded-2xl icon-glass-3d flex items-center justify-center text-emerald-400">
          <ScrollText className="w-7 h-7" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-black text-white">الاستخدام التعليمي والخصوصية</h1>
        <p className="text-xs text-slate-400">ما الذي تقدّمه المنصة، وما الذي لا تقدّمه، وكيف نتعامل مع بياناتك.</p>
      </div>
      <div className="glass-panel card-3d-neon p-6 rounded-2xl">
        <LegalContent />
      </div>
    </div>
  );
}
