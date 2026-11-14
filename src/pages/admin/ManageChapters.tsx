import React, { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import GlassCard from '@/components/ui/GlassCard';
import { BookOpen, Save, RotateCcw, CloudUpload } from 'lucide-react';
import { AdminNav } from '@/components/admin/AdminNav';

export default function ManageChapters() {
  const {
    chapters,
    upsertChapterMetadata,
    deleteCustomChapter,
    syncDefaultChaptersToCloud,
  } = useData();
  const [selectedCh, setSelectedCh] = useState<number>(1);
  const current = chapters.find(c => c.chapter_number === selectedCh) || chapters[0];

  const [title, setTitle] = useState(current.title);
  const [description, setDescription] = useState(current.description);
  const [category, setCategory] = useState<'أساسي' | 'متقدم' | 'شبكات' | 'كمومي' | 'تطبيقي'>(
    (['أساسي', 'متقدم', 'شبكات', 'كمومي', 'تطبيقي'].includes(current.category)
      ? current.category
      : 'أساسي') as any
  );
  const [statusMsg, setStatusMsg] = useState('');
  const [syncing, setSyncing] = useState(false);

  const handleSelect = (num: number) => {
    setSelectedCh(num);
    const ch = chapters.find(c => c.chapter_number === num);
    if (ch) {
      setTitle(ch.title);
      setDescription(ch.description);
      setCategory(
        (['أساسي', 'متقدم', 'شبكات', 'كمومي', 'تطبيقي'].includes(ch.category)
          ? ch.category
          : 'أساسي') as any
      );
    }
    setStatusMsg('');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await upsertChapterMetadata(selectedCh, title, description, category);
    setStatusMsg(`تم حفظ وتحديث الفصل ${selectedCh} في القاعدة المركزية بنجاح.`);
  };

  const handleReset = async () => {
    await deleteCustomChapter(selectedCh);
    const orig = chapters.find(c => c.chapter_number === selectedCh);
    if (orig) {
      setTitle(orig.title);
      setDescription(orig.description);
    }
    setStatusMsg(`تمت استعادة الإعدادات المرجعية للفصل ${selectedCh}.`);
  };

  const handleCloudSync = async () => {
    setSyncing(true);
    setStatusMsg('');
    try {
      await syncDefaultChaptersToCloud();
      setStatusMsg('تمت مزامنة الفصول الـ 13 مع قاعدة البيانات المركزية بنجاح.');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminNav />
      <GlassCard className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span>إدارة فصول المنهج الأكاديمي (13 فصلاً)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            تعديل عناوين وتوصيفات الفصول ومزامنتها مع مجموعة /chapters في Firestore
          </p>
        </div>

        <button
          type="button"
          onClick={handleCloudSync}
          disabled={syncing}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold inline-flex items-center gap-2 transition-colors whitespace-nowrap self-start"
        >
          <CloudUpload className="w-4 h-4" />
          <span>{syncing ? 'جاري المزامنة...' : 'مزامنة الـ 13 فصلاً مع السحابة'}</span>
        </button>
      </div>

      {statusMsg && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
          {statusMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-1.5 max-h-96 overflow-y-auto pr-1">
          {chapters.map(ch => (
            <button
              key={ch.chapter_number}
              type="button"
              onClick={() => handleSelect(ch.chapter_number)}
              className={`w-full text-right p-3 rounded-xl border text-xs transition-colors flex items-center justify-between gap-2 ${
                selectedCh === ch.chapter_number
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-200 font-bold'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-900'
              }`}
            >
              <span className="truncate">
                الفصل {ch.chapter_number}: {ch.title}
              </span>
              <span className="font-mono text-[11px] text-slate-500 shrink-0">
                ص{ch.pdfStartPage}
              </span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSave} className="lg:col-span-8 space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>تحرير الفصل رقم {selectedCh}</span>
            <span className="font-mono">
              صفحات الكتاب: {current.pdfStartPage} – {current.pdfEndPage}
            </span>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">عنوان الفصل</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              maxLength={200}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">التصنيف الأكاديمي</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500"
            >
              <option value="أساسي">أساسي</option>
              <option value="متقدم">متقدم</option>
              <option value="شبكات">شبكات</option>
              <option value="كمومي">كمومي</option>
              <option value="تطبيقي">تطبيقي</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">وصف وموجز الفصل</label>
            <textarea
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
              maxLength={1000}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-emerald-500 leading-relaxed"
              required
            />
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="submit"
              className="btn-primary text-xs inline-flex items-center gap-2 whitespace-nowrap"
            >
              <Save className="w-4 h-4" />
              <span>حفظ التعديلات</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4" />
              <span>استعادة الأصل</span>
            </button>
          </div>
        </form>
      </div>
    </GlassCard>
    </div>
  );
}
