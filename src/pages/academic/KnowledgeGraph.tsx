import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Search, BookOpen, ArrowRight, X, ExternalLink, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ALL_KNOWLEDGE_NODES, searchNodes, getRelatedNodes, KnowledgeNode } from '@/data/knowledgeGraph';
import { COURSES } from '@/data/courses';
import { cn } from '@/lib/utils';

const CATEGORY_COLORS: Record<string, string> = {
  'تشفير': '#3b82f6',
  'أمن': '#10b981',
  'تهديد': '#ef4444',
  'مخاطر': '#f59e0b',
  'حوكمة': '#8b5cf6',
  'شبكات': '#06b6d4',
  'كمومي': '#ec4899',
};

export default function KnowledgeGraph() {
  const [query, setQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const filtered = query
    ? searchNodes(query)
    : selectedCourse === 'all'
    ? ALL_KNOWLEDGE_NODES
    : ALL_KNOWLEDGE_NODES.filter((n) => n.course === selectedCourse);

  const relatedNodes = selectedNode ? getRelatedNodes(selectedNode.id) : [];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <div className="btn-3d-neon inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm mb-4">
          <Network className="w-4 h-4" /> الفهرس المعرفي الموسّع
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-100 mb-3">
          خريطة وشبكة المفاهيم التشفيرية
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm">
          {ALL_KNOWLEDGE_NODES.length} مفهوماً مترابطاً يغطي التشفير الكلاسيكي والحديث والتشفير المقاوم للكم
        </p>
      </motion.header>

      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute right-4 top-3.5 w-5 h-5 text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="ابحث عن مفهوم أو خوارزمية (مثل: AES, ZKP, RSA, NCA)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="card-3d-neon w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 pr-12 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all"
          />
        </div>

        <div className="flex gap-2 flex-wrap justify-center">
          <button
            onClick={() => { setSelectedCourse('all'); setQuery(''); }}
            className={`btn-3d-neon px-4 py-2 rounded-xl text-xs font-medium transition-all border cursor-pointer ${
              selectedCourse === 'all'
                ? 'btn-3d-neon-active bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-700'
            }`}
          >
            الكل ({ALL_KNOWLEDGE_NODES.length})
          </button>
          {COURSES.filter(c => c.status === 'available').map((course) => {
            const count = ALL_KNOWLEDGE_NODES.filter(n => n.course === course.slug).length;
            return (
              <button
                key={course.slug}
                onClick={() => { setSelectedCourse(course.slug); setQuery(''); }}
                className={`btn-3d-neon px-4 py-2 rounded-xl text-xs font-medium transition-all border cursor-pointer ${
                  selectedCourse === course.slug
                    ? 'btn-3d-neon-active bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-700'
                }`}
              >
                {course.code} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Nodes Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 glass-panel card-3d-neon rounded-xl">
          <Search className="w-12 h-12 mx-auto text-slate-600 mb-3" />
          <p className="text-slate-400">لا توجد نتائج مطابقة لبحثك</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {filtered.map((node, i) => {
            const color = CATEGORY_COLORS[node.category] || '#10b981';
            const isHovered = hoveredNode === node.id;
            const isConnected = selectedNode ? relatedNodes.some(r => r.id === node.id) : false;

            return (
              <motion.button
                key={node.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.02, 0.3) }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setSelectedNode(node)}
                className={cn(
                  "glass-panel card-3d-neon p-4 rounded-xl text-right transition-all duration-200 hover:bg-slate-900/90 border group cursor-pointer",
                  isHovered ? "border-emerald-500/50 shadow-lg shadow-emerald-500/10" : "border-slate-800/80",
                  selectedNode?.id === node.id && "card-3d-selected",
                  isConnected && selectedNode && "border-emerald-500/40 bg-emerald-500/5"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <span
                    className="text-[9px] px-2 py-0.5 rounded font-bold"
                    style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }}
                  >
                    {node.category}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 transition-colors rotate-180" />
                </div>
                <h3 className="font-bold text-xs text-slate-100 group-hover:text-emerald-300 transition-colors mb-1">
                  {node.label}
                </h3>
                <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-2">
                  {node.description}
                </p>
                <p className="text-[9px] text-slate-600 mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between">
                  <span>الفصول: {node.chapters.slice(0, 3).map(c => `#${c}`).join(', ')}{node.chapters.length > 3 && ` +${node.chapters.length - 3}`}</span>
                  <span className="text-[8px] font-mono" style={{ color }}>{node.course.toUpperCase()}</span>
                </p>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Node Detail Panel */}
      <AnimatePresence>
        {selectedNode && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm"
              onClick={() => setSelectedNode(null)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.9, opacity: 0, x: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[calc(100%-2rem)] max-w-lg glass-panel-floating card-3d-neon rounded-2xl p-6 max-h-[80vh] overflow-y-auto border border-emerald-500/30 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span
                    className="px-2.5 py-1 rounded-md text-xs font-bold"
                    style={{
                      backgroundColor: `${CATEGORY_COLORS[selectedNode.category] || '#10b981'}20`,
                      color: CATEGORY_COLORS[selectedNode.category] || '#10b981',
                      border: `1px solid ${CATEGORY_COLORS[selectedNode.category] || '#10b981'}40`,
                    }}
                  >
                    {selectedNode.category}
                  </span>
                  <h2 className="font-black text-xl text-slate-100">{selectedNode.label}</h2>
                </div>
                <button onClick={() => setSelectedNode(null)} className="btn-3d-neon p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-slate-300 mb-6 leading-relaxed">{selectedNode.description}</p>

              <div className="space-y-5">
                {/* Course Links */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> الفصول الدراسية
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {selectedNode.chapters.map((ch) => (
                      <Link
                        key={ch}
                        to={`/academic/${selectedNode.course}/chapters/${ch}`}
                        onClick={() => setSelectedNode(null)}
                        className="btn-3d-neon px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/40 text-xs flex items-center gap-1.5 hover:bg-emerald-500/20 transition-colors"
                      >
                        <BookOpen className="w-3 h-3" /> الفصل {ch}
                        <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Related Nodes */}
                {relatedNodes.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 mb-2 flex items-center gap-1.5">
                      <LinkIcon className="w-3.5 h-3.5" /> المفاهيم المترابطة
                    </h3>
                    <div className="space-y-1.5">
                      {relatedNodes.map((related) => (
                        <button
                          key={related.id}
                          onClick={() => setSelectedNode(related)}
                          className="card-3d-neon w-full text-right p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-xs text-slate-200 flex items-center justify-between transition-all cursor-pointer"
                        >
                          <div>
                            <span className="font-bold mr-2" style={{ color: CATEGORY_COLORS[related.category] || '#10b981' }}>
                              {related.label}
                            </span>
                            <span className="text-slate-500">({related.category})</span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-500 rotate-180" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t border-slate-800">
                  <Link
                    to={`/academic/${selectedNode.course}/chapters/${selectedNode.chapters[0]}`}
                    onClick={() => setSelectedNode(null)}
                    className="btn-3d-neon btn-3d-neon-active flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold text-center transition-all"
                  >
                    فتح الفصل الأول
                  </Link>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="btn-3d-neon px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-bold transition-all cursor-pointer"
                  >
                    إغلاق
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
export { KnowledgeGraph, KnowledgeGraph as EnhancedKnowledgeGraph };
