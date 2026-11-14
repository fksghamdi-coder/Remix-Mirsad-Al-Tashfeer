import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookMarked, RotateCw, Maximize2, Sparkles } from 'lucide-react';
import { DEFINITIONS, Definition } from '@/data/definitions';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export default function Definitions() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'flashcards'>('grid');
  const [flippedTerms, setFlippedTerms] = useState<Record<string, boolean>>({});
  const [selectedDef, setSelectedDef] = useState<Definition | null>(null);

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(DEFINITIONS.map(d => d.category)))],
    []
  );

  const filtered = useMemo(() => {
    return DEFINITIONS.filter(
      d =>
        (category === 'all' || d.category === category) &&
        (d.term.includes(search) ||
          d.en.toLowerCase().includes(search.toLowerCase()) ||
          d.definition.includes(search))
    );
  }, [search, category]);

  const toggleFlip = (term: string) => {
    setFlippedTerms(prev => ({ ...prev, [term]: !prev[term] }));
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black gradient-text mb-2 whitespace-nowrap">
            المصطلحات والتعريفات
          </h1>
          <p className="text-slate-400">
            قاموس التشفير المتقدم — {DEFINITIONS.length} مصطلح بمعادلات وفصول مرجعية
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1.5 glass-panel card-3d-neon border border-emerald-500/35 rounded-2xl self-start">
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer btn-3d-neon active:scale-95 ${
              viewMode === 'grid' ? 'btn-3d-neon-active text-emerald-200' : 'text-slate-300 hover:text-emerald-200'
            }`}
          >
            العرض المرجعي
          </button>
          <button
            type="button"
            onClick={() => setViewMode('flashcards')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer btn-3d-neon btn-3d-amber active:scale-95 ${
              viewMode === 'flashcards' ? 'btn-3d-amber-active text-amber-200' : 'text-slate-300 hover:text-amber-200'
            }`}
          >
            بطاقات 3D التفاعلية
          </button>
        </div>
      </header>

      {/* Banner Instruction */}
      <div className="glass-panel card-3d-neon bg-emerald-500/10 border border-emerald-500/35 rounded-2xl p-4 text-xs text-emerald-300 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>
            انقر على أي بطاقة مصطلح لعرض القائمة العائمة والتحليل البياني الموسع دون تشوه للصفحة.
          </span>
        </div>
        <span className="text-[11px] font-mono bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
          دقة عالية · تكبير منسق
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3.5 top-3.5 w-4 h-4 text-emerald-400" />
          <input
            type="text"
            placeholder="ابحث عن مصطلح بالعربية أو الإنجليزية..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pr-10 card-3d-neon"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                'px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 btn-3d-neon cursor-pointer active:scale-95',
                category === cat
                  ? 'btn-3d-neon-active ring-1 ring-emerald-400/60 text-emerald-200'
                  : 'text-slate-300 hover:text-emerald-200'
              )}
            >
              {cat === 'all' ? 'الكل' : cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <BookMarked className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p>لا توجد نتائج مطابقة</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((def, i) => (
            <motion.div
              key={def.term}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              onClick={() => setSelectedDef(def)}
              className={cn(
                'glass-panel card-3d-neon p-5 rounded-2xl transition-all duration-300 group flex flex-col justify-between cursor-pointer relative overflow-hidden active:scale-[0.98]',
                selectedDef?.term === def.term && 'ring-2 ring-emerald-400/80 border-emerald-300'
              )}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedDef(def);
                }
              }}
            >
              <div>
                <div className="flex items-start justify-between mb-2 gap-2">
                  <h3 className="font-bold text-emerald-300 group-hover:text-emerald-200 transition-colors flex items-center gap-1.5">
                    <span>{def.term}</span>
                  </h3>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-xs px-2 py-0.5 rounded-lg bg-slate-800/90 border border-slate-700 text-slate-300">
                      {def.category}
                    </span>
                    <Link
                      to={`/academic/ise243/chapters/${def.chapter}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs px-2 py-0.5 rounded-lg btn-3d-neon btn-3d-amber text-amber-300 hover:text-amber-200 font-mono tabular-nums"
                    >
                      فصل {def.chapter}
                    </Link>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDef(def);
                      }}
                      className="p-1.5 rounded-lg btn-3d-neon text-slate-300 group-hover:text-emerald-300 transition-all"
                      title="فتح القائمة العائمة"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-blue-400 font-mono mb-2">{def.en}</p>
                <p className="text-sm text-slate-300 leading-relaxed">{def.definition}</p>
              </div>
              {def.formula && (
                <div
                  dir="ltr"
                  className="mt-3 p-3 rounded-xl bg-slate-950/90 border border-emerald-500/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.14)] text-xs font-mono text-emerald-300 text-left overflow-x-auto whitespace-pre-line"
                >
                  {def.formula}
                </div>
              )}
              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-emerald-400 transition-colors">
                <span>انقر لعرض القائمة العائمة والشرح البياني</span>
                <span>←</span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(def => {
            const isFlipped = !!flippedTerms[def.term];
            return (
              <div
                key={def.term}
                className="h-72 cursor-pointer perspective-1000 relative group"
              >
                <div
                  onClick={() => toggleFlip(def.term)}
                  className={`relative w-full h-full duration-500 preserve-3d transition-transform ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Front */}
                  <div className="absolute inset-0 backface-hidden glass-panel card-3d-neon rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                    <BookMarked className="w-6 h-6 text-amber-400 mb-3" />
                    <h3 className="text-lg font-bold text-slate-100 mb-1">{def.term}</h3>
                    <p className="text-xs font-mono text-emerald-400 mb-3">{def.en}</p>
                    <span className="text-[11px] text-slate-400 inline-flex items-center gap-1 mb-2">
                      <RotateCw className="w-3 h-3" /> انقر لقلب البطاقة
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDef(def);
                      }}
                      className="mt-1 px-3.5 py-1.5 rounded-xl btn-3d-neon text-emerald-300 hover:text-emerald-200 text-xs flex items-center gap-1.5 font-bold cursor-pointer active:scale-95"
                    >
                      <Maximize2 className="w-3 h-3" />
                      <span>عرض القائمة العائمة الموسعة</span>
                    </button>
                  </div>

                  {/* Back */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 glass-panel card-3d-neon border border-emerald-500/45 rounded-2xl p-5 flex flex-col justify-between text-right overflow-y-auto">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-xs text-emerald-400 font-bold">{def.term}</div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDef(def);
                          }}
                          className="p-1 rounded bg-slate-800 text-emerald-300 hover:bg-emerald-500/20"
                          title="فتح التفاصيل العائمة"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">{def.definition}</p>
                      {def.formula && (
                        <p
                          dir="ltr"
                          className="text-[11px] font-mono text-amber-300 mt-2 bg-slate-950 p-1.5 rounded border border-slate-800 text-left"
                        >
                          {def.formula}
                        </p>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
                      <span>التصنيف: {def.category}</span>
                      <span>الفصل {def.chapter}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
