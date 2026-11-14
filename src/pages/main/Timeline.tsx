import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Globe2, Landmark, Filter, Cpu, BookOpen } from 'lucide-react';
import { TIMELINE_EVENTS, TimelineCategory } from '@/data/timeline';
import { cn } from '@/lib/utils';

type FilterType = 'all' | TimelineCategory;

export default function Timeline() {
  const [filter, setFilter] = useState<FilterType>('all');

  const events = useMemo(() => {
    return TIMELINE_EVENTS.filter(e => filter === 'all' || e.category === filter).sort(
      (a, b) => a.year - b.year
    );
  }, [filter]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl md:text-4xl font-black gradient-text mb-2">السجل التاريخي</h1>
        <p className="text-slate-400">
          رحلة التشفير والأمن السيبراني عالمياً وفي المملكة العربية السعودية
        </p>
      </header>

      <div className="flex items-center gap-2.5 flex-wrap p-3 rounded-2xl glass-panel card-3d-neon border border-emerald-500/30">
        <Filter className="w-4 h-4 text-emerald-400 mr-1" />
        {(['all', 'تاريخي', 'عالمي', 'السعودية', 'كمومي'] as FilterType[]).map(f => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              'px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 btn-3d-neon cursor-pointer active:scale-95',
              filter === f
                ? 'btn-3d-neon-active ring-1 ring-emerald-400/60 text-emerald-200'
                : 'text-slate-300 hover:text-emerald-200'
            )}
          >
            {f === 'all' ? 'الكل' : f}
          </button>
        ))}
        <span className="text-xs text-emerald-300 mr-auto font-mono tabular-nums px-3 py-1 rounded-xl bg-slate-950/80 border border-emerald-500/30">
          {events.length} حدث
        </span>
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/60 via-blue-500/40 to-transparent -translate-x-1/2 hidden md:block" />

        <div className="space-y-8 md:space-y-12">
          {events.map((event, i) => {
            const isRight = i % 2 === 0;
            const isKSA = event.category === 'السعودية';
            const isQuantum = event.category === 'كمومي';
            const isHist = event.category === 'تاريخي';

            return (
              <motion.div
                key={`${event.year}-${event.title}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4 }}
                className={cn(
                  'relative flex flex-col md:flex-row items-start md:items-center gap-4',
                  isRight ? 'md:justify-start' : 'md:justify-end'
                )}
              >
                {/* Timeline Node */}
                <div className="absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-slate-950 hidden md:block z-10" />

                {/* Card */}
                <div
                  className={cn(
                    'w-full md:w-[calc(50%-2rem)] glass-panel card-3d-neon p-5 rounded-2xl transition-all duration-300 cursor-pointer active:scale-[0.99]',
                    isRight ? 'md:mr-auto' : 'md:ml-auto'
                  )}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'text-xs px-2.5 py-1 rounded-md flex items-center gap-1 border',
                          isKSA
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : isQuantum
                            ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                            : isHist
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                        )}
                      >
                        {isKSA ? (
                          <Landmark className="w-3 h-3" />
                        ) : isQuantum ? (
                          <Cpu className="w-3 h-3" />
                        ) : isHist ? (
                          <BookOpen className="w-3 h-3" />
                        ) : (
                          <Globe2 className="w-3 h-3" />
                        )}
                        {event.category}
                      </span>
                      {event.source && (
                        <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          {event.source}
                        </span>
                      )}
                    </div>
                    <span className="text-2xl font-black gradient-text font-mono tabular-nums">
                      {event.year}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-100 mb-1">{event.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{event.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
