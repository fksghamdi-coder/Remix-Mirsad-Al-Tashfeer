import React, { useState } from 'react';
import {
  Download,
  Upload,
  Lock,
  Key,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  ShieldAlert,
  RefreshCw,
  HardDrive
} from 'lucide-react';
import { exportEncryptedBackup, importEncryptedBackup } from '@/lib/backupManager';
import { cn } from '@/lib/utils';

export default function BackupPanel() {
  const [exportPassword, setExportPassword] = useState('');
  const [importPassword, setImportPassword] = useState('');
  const [importFileContent, setImportFileContent] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleExport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!exportPassword || exportPassword.length < 4) {
      setMessage({ type: 'error', text: 'كلمة المرور يجب أن تتكون من 4 أحرف أو أرقام على الأقل.' });
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      const encryptedJson = await exportEncryptedBackup(exportPassword);
      
      // Trigger download
      const blob = new Blob([encryptedJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mirsad_backup_encrypted_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);

      setMessage({ type: 'success', text: 'تم تصدير وحفظ النسخة الاحتياطية المشفرة بنجاح.' });
      setExportPassword('');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ أثناء تصدير البيانات المشفرة.';
      setMessage({ type: 'error', text: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setImportFileContent(content);
      setMessage(null);
    };
    reader.readAsText(file);
  };

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!importFileContent) {
      setMessage({ type: 'error', text: 'يرجى اختيار ملف النسخة الاحتياطية أولاً.' });
      return;
    }
    if (!importPassword) {
      setMessage({ type: 'error', text: 'أدخل كلمة المرور لفك التشفير.' });
      return;
    }

    setLoading(true);
    setMessage(null);
    try {
      const result = await importEncryptedBackup(importFileContent, importPassword);
      if (result.success) {
        setMessage({
          type: 'success',
          text: `تم فك التشفير واسترجاع ${result.restoredCount} عنصر بنجاح! سيتم تحديث الصفحة...`
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setMessage({ type: 'error', text: result.error || 'فشل فك التشفير.' });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ أثناء معالجة الملف.';
      setMessage({ type: 'error', text: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Message Notification */}
      {message && (
        <div
          className={cn(
            'p-4 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all',
            message.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
              : 'bg-red-500/10 text-red-300 border-red-500/40'
          )}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Encrypted Backup Box */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/30 space-y-4 shadow-lg">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">تصدير نسخة احتياطية مشفرة</h3>
              <p className="text-[11px] text-slate-400">حماية البيانات بكلمة مرور خوارزمية AES-GCM 256-bit</p>
            </div>
          </div>

          <form onSubmit={handleExport} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium block">
                كلمة مرور التشفير
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute right-3 top-3" />
                <input
                  type="password"
                  value={exportPassword}
                  onChange={(e) => setExportPassword(e.target.value)}
                  placeholder="أدخل كلمة مرور قوية لتشفير الملف..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 pr-10 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_15px_#10b981] transition-all disabled:opacity-50"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>تشفير وتنزيل النسخة الاحتياطية</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Import & Restore Encrypted Backup Box */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-cyan-500/30 space-y-4 shadow-lg">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-100">استرجاع نسخة احتياطية</h3>
              <p className="text-[11px] text-slate-400">فك تشفير ملفات التناظر واسترجاع حالة التقدم</p>
            </div>
          </div>

          <form onSubmit={handleImport} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium block">
                اختر ملف النسخة الاحتياطية (.json)
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="backup-file-input"
                />
                <label
                  htmlFor="backup-file-input"
                  className="w-full bg-slate-950 border border-dashed border-slate-700 hover:border-cyan-500 rounded-xl p-3 text-xs text-slate-300 flex items-center justify-between cursor-pointer transition-all"
                >
                  <span className="truncate max-w-[200px]">
                    {fileName || 'اضغط هنا لرفع الملف...'}
                  </span>
                  <HardDrive className="w-4 h-4 text-cyan-400" />
                </label>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium block">
                كلمة مرور فك التشفير
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute right-3 top-3" />
                <input
                  type="password"
                  value={importPassword}
                  onChange={(e) => setImportPassword(e.target.value)}
                  placeholder="كلمة المرور المستخدمة عند التصدير..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 pr-10 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !importFileContent}
              className="w-full py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-40"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <FileCheck className="w-4 h-4" />
                  <span>فك التشفير واسترجاع البيانات</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
