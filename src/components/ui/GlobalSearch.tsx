import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, FileText, Globe, Hash, X, GraduationCap } from 'lucide-react';
import { getAllChapters } from '@/lib/chapters';
import { DEFINITIONS } from '@/data/definitions';
import { ALGORITHMS } from '@/data/algorithms';
import { TIMELINE_EVENTS } from '@/data/timeline';
import { COURSES } from '@/data/courses';

interface Result {
  type: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  path: string;
}

export default function GlobalSearch({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState('');
  const navigate = useNavigate();

  const results: Result[] = useMemo(() => {
    if (q.length < 2) return [];
    const query = q.toLowerCase();
    const out: Result[] = [];

    COURSES.filter(
      c =>
        c.code.toLowerCase().includes(query) ||
        c.title.includes(q) ||
        c.titleEn.toLowerCase().includes(query) ||
        c.description.includes(q)
    ).forEach(c =>
      out.push({
        type: 'مقرر',
        icon: GraduationCap,
        title: `${c.code}: ${c.title}`,
        subtitle: c.status === 'available' ? 'متاح للدراسة' : 'قريباً',
        path: c.status === 'available' ? `/academic/${c.slug}` : '/academic',
      })
    );

    getAllChapters()
      .filter(
        c =>
          c.title.toLowerCase().includes(query) ||
          c.description.toLowerCase().includes(query)
      )
      .forEach(c =>
        out.push({
          type: 'فصل',
          icon: BookOpen,
          title: c.title,
          subtitle: `فصل ${c.chapter_number}`,
          path: `/academic/chapters/${c.id}`,
        })
      );

    DEFINITIONS.filter(d => d.term.includes(q) || d.en.toLowerCase().includes(query)).forEach(d =>
      out.push({
        type: 'تعريف',
        icon: FileText,
        title: d.term,
        subtitle: d.en,
        path: '/main/definitions',
      })
    );

    ALGORITHMS.filter(a => a.name.toLowerCase().includes(query)).forEach(a =>
      out.push({
        type: 'خوارزمية',
        icon: Hash,
        title: a.name,
        subtitle: `${a.type} — ${a.standard}`,
        path: '/main/comparisons',
      })
    );

    TIMELINE_EVENTS.filter(e => e.title.includes(q) || e.description.includes(q)).forEach(e =>
      out.push({
        type: 'حدث',
        icon: Globe,
        title: e.title,
        subtitle: `${e.year} — ${e.category}`,
        path: '/main/timeline',
      })
    );

    return out.slice(0, 15);
  }, [q]);

  const go = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-20 p-4"
      onClick={onClose}
    >
      <div
        className="glass-panel w-full max-w-2xl rounded-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 p-4 border-b border-slate-800">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            autoFocus
            type="text"
            placeholder="ابحث في الفصول، التعريفات، الخوارزميات، الأحداث..."
            value={q}
            onChange={e => setQ(e.target.value)}
            className="flex-1 bg-transparent outline-none text-white"
          />
          <button type="button" onClick={onClose} className="p-1.5 rounded hover:bg-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        {q.length >= 2 && (
          <div className="max-h-96 overflow-y-auto p-2">
            {results.length === 0 ? (
              <p className="text-center text-slate-500 py-8 text-sm">لا توجد نتائج</p>
            ) : (
              results.map((r, i) => {
                const Icon = r.icon;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => go(r.path)}
                    className="w-full text-right flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/60 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-white truncate">{r.title}</p>
                      <p className="text-xs text-slate-500 truncate">{r.subtitle}</p>
                    </div>
                    <span className="text-xs text-slate-600">{r.type}</span>
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
