import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  ShieldAlert,
  Activity,
  RefreshCw,
  Plus,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import {
  getStoredAuditLogs,
  verifyAuditChain,
  writeAuditLog,
  simulateTampering,
  resetAuditChain,
  AuditLogRecord,
  AuditCategory,
} from '@/lib/audit';
import { AdminNav } from '@/components/admin/AdminNav';
import BlockchainReport from '@/components/admin/BlockchainReport';
import { MirsadInternalBlockchain } from '@/lib/internalBlockchain';

const CATEGORY_COLORS: Record<AuditCategory, string> = {
  auth: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  curriculum: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  security: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  lab: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
  admin: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
};

export default function AdminAudit() {
  const [logs, setLogs] = useState<AuditLogRecord[]>([]);
  const [statusMsg, setStatusMsg] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAction, setNewAction] = useState('CUSTOM_ADMIN_ACTION');
  const [newCategory, setNewCategory] = useState<AuditCategory>('admin');
  const [newDetails, setNewDetails] = useState('');

  const [blockchainChain, setBlockchainChain] = useState<any[]>([]);

  const refreshLogs = () => {
    const list = getStoredAuditLogs();
    setLogs(list);
    try {
      const bc = new MirsadInternalBlockchain();
      setBlockchainChain(bc.getChain());
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    refreshLogs();
  }, []);

  const chainStatus = verifyAuditChain(logs);
  const displayLogs = [...logs].reverse();

  const handleTamperTest = () => {
    if (logs.length > 0) {
      simulateTampering(logs.length - 1);
      refreshLogs();
      setStatusMsg('🚨 تم تطبيق تعديل غير مصرّح به على سجل حديث لاختبار كاشف التلاعب!');
    }
  };

  const handleReset = () => {
    resetAuditChain();
    refreshLogs();
    setStatusMsg('✓ تمت إعادة تهيئة سلسلة سجلات التدقيق إلى حالتها التشفيرية المعتمدة.');
  };

  const handleAddLog = async (e: React.FormEvent) => {
    e.preventDefault();
    await writeAuditLog(null, {
      userId: 'admin_session',
      actorName: 'مشرف النظام',
      action: newAction.toUpperCase().trim(),
      category: newCategory,
      details: newDetails || 'عملية إدارية مسجلة في سلسلة التدقيق',
    });
    setShowAddModal(false);
    setNewDetails('');
    refreshLogs();
    setStatusMsg('✓ تم توثيق العملية وحساب بصمة SHA-256 وربطها بالكتلة السابقة بنجاح.');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-4">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <Link to="/admin" className="hover:text-emerald-400 transition-colors">
              لوحة الإدارة
            </Link>
            <span>/</span>
            <span className="text-slate-200">سجل التدقيق الأمني (Audit Logs)</span>
          </div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-black text-white flex items-center gap-2.5 whitespace-nowrap">
            <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400 shrink-0" />
            <span className="whitespace-nowrap">سجل التدقيق بسلسلة التشفير غير القابلة للكسر</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {logs.length} سجل موثق • كل سجل يتضمن بصمة SHA-256 السابقة (prev_hash) لمنع الحذف أو التعديل
          </p>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)]"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة سجل موثق</span>
          </button>

          <button
            onClick={handleTamperTest}
            className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-xs flex items-center gap-1.5 transition-all"
            title="تجربة محاكاة تلاعب لإظهار كشف الخلل أمام اللجنة"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>محاكاة تلاعب (اختبار)</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1.5 transition-all"
            title="إعادة ضبط السلسلة الأصلية"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <AdminNav />

      {statusMsg && (
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
          <span>{statusMsg}</span>
          <button onClick={() => setStatusMsg('')} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Verification Banner */}
      <div
        className={`rounded-2xl border-2 p-5 flex items-center gap-4 transition-all ${
          chainStatus.valid
            ? 'bg-emerald-500/10 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.1)]'
            : 'bg-red-500/10 border-red-500/40 shadow-[0_0_30px_rgba(239,68,68,0.2)]'
        }`}
      >
        {chainStatus.valid ? (
          <ShieldCheck className="w-12 h-12 text-emerald-400 shrink-0" />
        ) : (
          <ShieldAlert className="w-12 h-12 text-red-400 shrink-0 animate-pulse" />
        )}
        <div className="flex-1">
          <p
            className={`font-black text-lg ${
              chainStatus.valid ? 'text-emerald-300' : 'text-red-300'
            }`}
          >
            {chainStatus.valid
              ? 'سلسلة التدقيق التشفيرية سليمة تماماً ✓'
              : '⚠️ تحذير: تم كشف تلاعب أو كسر في سلسلة التجزئة!'}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            {chainStatus.valid
              ? 'تم التحقق رياضياً عبر خوارزمية SHA-256 Hash Chain — جميع الكتل ترتبط بالتسلسل الأمني الصحيح'
              : `السجل رقم ${chainStatus.brokenAt! + 1} لا يطابق البصمة الرياضية المتوقعة، مما يشير إلى محاولة تعديل بيانات سابقة!`}
          </p>
        </div>

        <button
          onClick={refreshLogs}
          className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 shrink-0"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>إعادة الفحص</span>
        </button>
      </div>

      {/* Audit Log Entries List */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="font-bold text-slate-300">سجل الأحداث (الأحدث أولاً)</span>
          <span>إجمالي السجلات: {logs.length}</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {displayLogs.map((log, index) => (
            <div key={log.id} className="p-4 sm:p-5 hover:bg-slate-950/40 transition-colors space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full border font-bold ${
                      CATEGORY_COLORS[log.category] || 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {log.category}
                  </span>
                  <span className="font-bold text-sm text-white font-mono">{log.action}</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {new Date(log.created_at).toLocaleString('ar-SA')}
                </span>
              </div>

              {log.actor_name && (
                <p className="text-xs text-slate-400">
                  المنفّذ: <span className="text-emerald-300 font-semibold">{log.actor_name}</span>
                  {log.user_id && <span className="text-slate-600 font-mono text-[10px]"> ({log.user_id})</span>}
                </p>
              )}

              {log.details && (
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-2.5 rounded-xl border border-slate-800/60">
                  {log.details}
                </p>
              )}

              {/* Hash Proof Blocks */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-right">
                  <span className="text-slate-500 block mb-0.5">البصمة الحالية (Hash):</span>
                  <span className="text-emerald-400 break-all select-all">{log.hash}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-right">
                  <span className="text-slate-500 block mb-0.5">البصمة السابقة (Prev Hash):</span>
                  <span className="text-cyan-400 break-all select-all">{log.prev_hash || 'GENESIS'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* تقرير وسجل كتل البلوكشين للشهادات (Blockchain Ledger) */}
      <BlockchainReport chain={blockchainChain} />

      {/* Add Audit Log Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-400" />
              <span>تسجيل حدث تدقيق تشفيري جديد</span>
            </h3>

            <form onSubmit={handleAddLog} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">اسم الإجراء (Action)</label>
                <input
                  type="text"
                  value={newAction}
                  onChange={(e) => setNewAction(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white uppercase font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">التصنيف (Category)</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="admin">admin (إداري)</option>
                  <option value="security">security (أمني)</option>
                  <option value="curriculum">curriculum (مناهج)</option>
                  <option value="lab">lab (مختبر)</option>
                  <option value="auth">auth (مصادقة)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">تفاصيل العملية (Details)</label>
                <textarea
                  value={newDetails}
                  onChange={(e) => setNewDetails(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600"
                  placeholder="وصف تفصيلي للحدث لتضمينه في حساب التجزئة..."
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
                >
                  حفظ وتشفير
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
