import React, { useState } from 'react';
import { 
  BookOpen, 
  Cpu, 
  Users, 
  Languages, 
  HelpCircle, 
  Sparkles,
  Layers
} from 'lucide-react';
import { LiveBookComponent } from '@/components/interactive/LiveBookComponent';
import { Crypto3DVisualizer } from '@/components/interactive/Crypto3DVisualizer';
import { AcademicCommunities } from '@/components/academic/AcademicCommunities';
import EnglishCourseInteractive from '@/components/interactive/EnglishCourseInteractive';
import { InternalSupport } from '@/components/ui/InternalSupport';

export type InteractiveTab = 'LIVE_BOOK' | 'VISUAL_3D' | 'COMMUNITIES' | 'ENGLISH_COURSE' | 'SUPPORT';

export interface InteractiveHubProps {
  initialTab?: InteractiveTab;
}

export const InteractiveHub: React.FC<InteractiveHubProps> = ({ initialTab = 'LIVE_BOOK' }) => {
  const [currentTab, setCurrentTab] = useState<InteractiveTab>(initialTab);

  return (
    <div className="space-y-6">
      {/* Top Interactive Hub Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>البوابة التفاعلية الموحدة لمنظومة مِرْصَاد الأكاديمية</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-100 tracking-tight">
              مركز التعلّم التفاعلي والتشفير المتقدم
            </h1>
            <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
              انتقل بسلاسة بين الكتاب الحيّ، محاكاة خوارزميات التشفير ثلاثية الأبعاد، مجتمعات المذاكرة، دورة الإنجليزية التخصصية، وقنوات الدعم التقني الأكاديمي.
            </p>
          </div>

          {/* Tab Selector Buttons */}
          <div className="flex flex-wrap items-center bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 gap-1.5 shadow-inner">
            <button
              type="button"
              onClick={() => setCurrentTab('LIVE_BOOK')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                currentTab === 'LIVE_BOOK'
                  ? 'bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>الكتاب الحيّ</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentTab('VISUAL_3D')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                currentTab === 'VISUAL_3D'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>مجسم التشفير 3D</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentTab('COMMUNITIES')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                currentTab === 'COMMUNITIES'
                  ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>المجتمعات والمتصدرين</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentTab('ENGLISH_COURSE')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                currentTab === 'ENGLISH_COURSE'
                  ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Languages className="w-4 h-4" />
              <span>الإنجليزية السيبرانية</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentTab('SUPPORT')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                currentTab === 'SUPPORT'
                  ? 'bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>الدعم الأكاديمي</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area based on current active tab */}
      <div className="transition-all duration-300">
        {currentTab === 'LIVE_BOOK' && (
          <div>
            <LiveBookComponent />
          </div>
        )}

        {currentTab === 'VISUAL_3D' && (
          <div>
            <Crypto3DVisualizer />
          </div>
        )}

        {currentTab === 'COMMUNITIES' && (
          <div>
            <AcademicCommunities />
          </div>
        )}

        {currentTab === 'ENGLISH_COURSE' && (
          <div>
            <EnglishCourseInteractive />
          </div>
        )}

        {currentTab === 'SUPPORT' && (
          <div>
            <InternalSupport />
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveHub;
