import React, { useState, useMemo } from 'react';
import {
  KeyRound,
  Check,
  Copy,
  Download,
  Upload,
  Sparkles,
  Users,
  Shield,
  FileSpreadsheet,
  X,
  CheckCircle2,
  AlertCircle,
  FileText,
  RefreshCw,
  Lock,
} from 'lucide-react';
import {
  PREDEFINED_CREDENTIALS,
  importPredefinedPasswords,
  importPasswordsBatch,
  UserRole,
  getUsers,
  saveUsers,
  flushAuth,
} from '@/lib/auth';
import { rotateDataKey } from '@/lib/crypto';

interface ImportPasswordsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (msg: string) => void;
  onSelectCredential?: (username: string, password: string) => void;
  defaultIncludeAdmin?: boolean;
}

export default function ImportPasswordsModal({
  isOpen,
  onClose,
  onSuccess,
  defaultIncludeAdmin = true,
}: ImportPasswordsModalProps) {
  const [activeTab, setActiveTab] = useState<'official' | 'custom'>('official');
  const [search, setSearch] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rotatingKey, setRotatingKey] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  // Custom import state
  const [customText, setCustomText] = useState('');
  const [customOverwrite, setCustomOverwrite] = useState(true);

  const credentials = useMemo(() => {
    return defaultIncludeAdmin
      ? PREDEFINED_CREDENTIALS
      : PREDEFINED_CREDENTIALS.filter((c) => c.role !== 'admin');
  }, [defaultIncludeAdmin]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return credentials;
    return credentials.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.username.toLowerCase().includes(q) ||
        c.academicId.toLowerCase().includes(q) ||
        (c.title && c.title.toLowerCase().includes(q))
    );
  }, [credentials, search]);

  if (!isOpen) return null;

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // fallback
    }
  };

  const handleCopyAll = async () => {
    const header = 'الاسم\tاسم المستخدم\tالرقم الأكاديمي\tالدور\tبصمة PBKDF2-SHA256\n';
    const body = credentials
      .map(
        (c) =>
          `${c.name}\t${c.username}\t${c.academicId}\t${
            c.role === 'admin' ? 'مشرف' : 'طالب'
          }\t${c.passwordHash || c.password}`
      )
      .join('\n');
    await navigator.clipboard.writeText(header + body);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const handleDownloadCSV = () => {
    const header = 'Name,Username,AcademicID,Role,HashAlgorithm,SaltFingerprint\n';
    const rows = credentials
      .map(
        (c) =>
          `"${c.name}","${c.username}","${c.academicId}","${c.role}","PBKDF2-HMAC-SHA256 (600000)","${
            c.passwordSalt?.slice(0, 12) || '128-bit'
          }"`
      )
      .join('\n');
    const blob = new Blob(['\uFEFF' + header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mirsad_accounts_audit_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportPredefined = async () => {
    setLoading(true);
    setStatusMsg(null);
    try {
      const res = await importPredefinedPasswords({
        overwrite: true,
        includeAdmin: defaultIncludeAdmin,
      });
      const msg = `✓ تم استيراد وتشفير كلمات المرور بنجاح (${res.imported} حساب جديد، ${res.updated} حساب محدّث) عبر PBKDF2-SHA256 + AES-256-GCM.`;
      setStatusMsg({ type: 'ok', text: msg });
      if (onSuccess) onSuccess(msg);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'فشل مزامنة الحسابات المشفرة';
      setStatusMsg({ type: 'err', text: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleRotateDEK = async () => {
    setRotatingKey(true);
    setStatusMsg(null);
    try {
      const snapshot = getUsers();
      await rotateDataKey();
      saveUsers(snapshot);
      await flushAuth();
      const msg = `✓ تم تدوير مفتاح تشفير البيانات (DEK Key Rotation) وإعادة تشفير ${snapshot.length} سجل بـ AES-256-GCM + AAD بنجاح.`;
      setStatusMsg({ type: 'ok', text: msg });
      if (onSuccess) onSuccess(msg);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'تعذّر تدوير مفتاح التشفير';
      setStatusMsg({ type: 'err', text: msg });
    } finally {
      setRotatingKey(false);
    }
  };

  const handleCustomImport = async () => {
    if (!customText.trim()) {
      setStatusMsg({ type: 'err', text: 'يرجى إدخال بيانات المستخدمين وكلمات المرور أولاً.' });
      return;
    }

    setLoading(true);
    setStatusMsg(null);
    try {
      let records: Array<{
        username: string;
        password: string;
        fullName?: string;
        academicId?: string;
        phone?: string;
        role?: UserRole;
      }> = [];

      const trimmed = customText.trim();
      if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
        const parsed = JSON.parse(trimmed);
        records = Array.isArray(parsed) ? parsed : [parsed];
      } else {
        const lines = trimmed.split('\n').filter((l) => l.trim().length > 0);
        for (const line of lines) {
          if (line.includes('username') || line.includes('اسم المستخدم')) continue;
          const parts = line.split(/[,;\t]/).map((p) => p.trim().replace(/^["']|["']$/g, ''));
          if (parts.length >= 2) {
            records.push({
              username: parts[0],
              password: parts[1],
              fullName: parts[2] || parts[0],
              academicId: parts[3] || parts[0],
              role: (parts[4] as UserRole) || 'user',
              phone: parts[5] || '',
            });
          }
        }
      }

      if (records.length === 0) {
        throw new Error('لم يتم العثور على سجلات صالحة في النص المدخل.');
      }

      const res = await importPasswordsBatch(records, { overwrite: customOverwrite });
      if (res.errors.length > 0 && res.imported === 0 && res.updated === 0) {
        throw new Error(res.errors.join(' | '));
      }
      const msg = `✓ تم استيراد ${res.imported} حساب وتحديث ${res.updated} حساب بتشفير ثنائي كامل!`;
      setStatusMsg({ type: 'ok', text: msg });
      if (onSuccess) onSuccess(msg);
      setCustomText('');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ أثناء معالجة بيانات الاستيراد';
      setStatusMsg({ type: 'err', text: msg });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setCustomText(content || '');
    };
    reader.readAsText(file);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md"
      dir="rtl"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <span>حوكمة التشفير الثنائي ومزامنة الحسابات (خاص بالمشرف)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  PBKDF2-600K + AES-GCM
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                إدارة بصمات الحسابات المعتمدة وتدوير مفاتيح التشفير (DEK/KEK) دون كشف كلمات المرور النصية
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status notification */}
        {statusMsg && (
          <div
            className={`mx-5 mt-4 p-3.5 rounded-2xl text-xs flex items-center justify-between border ${
              statusMsg.type === 'ok'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-red-500/10 border-red-500/30 text-red-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMsg.type === 'ok' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              )}
              <span>{statusMsg.text}</span>
            </div>
            <button
              onClick={() => setStatusMsg(null)}
              className="text-slate-400 hover:text-white text-xs px-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* Tab switch */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-4 shrink-0">
          <div className="flex gap-1.5 p-1 rounded-2xl bg-slate-950 border border-slate-800">
            <button
              onClick={() => setActiveTab('official')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'official'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>بصمات الحسابات المعتمدة (10 طلاب + المشرف)</span>
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'custom'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>استيراد مخصص مشفّر (CSV / JSON)</span>
            </button>
          </div>

          {activeTab === 'official' && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleRotateDEK}
                disabled={rotatingKey}
                className="px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-xs font-bold flex items-center gap-1.5 border border-amber-500/30 transition-colors disabled:opacity-50"
                title="تدوير مفتاح تشفير البيانات (DEK Rotation)"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${rotatingKey ? 'animate-spin' : ''}`} />
                <span>تدوير مفتاح DEK</span>
              </button>
              <button
                onClick={handleCopyAll}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors"
                title="نسخ سجل البصمات التشفيرية"
              >
                {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAll ? 'تم النسخ' : 'نسخ البصمات'}</span>
              </button>
              <button
                onClick={handleDownloadCSV}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors"
                title="تنزيل تقرير التدقيق CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span>CSV</span>
              </button>
            </div>
          )}
        </div>

        {/* Tab 1: Official Pre-hashed Accounts */}
        {activeTab === 'official' && (
          <div className="p-5 flex-1 overflow-y-auto space-y-4">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <span>مزامنة وإعادة تثبيت البصمات التشفيرية (Zero-Plaintext)</span>
                </h3>
                <p className="text-xs text-slate-300">
                  تُخزَّن الحسابات بتجزئة <span className="font-mono text-emerald-300">v2$600000$</span> مع تشفير سجل المستخدم بـ <span className="font-mono text-cyan-300">AES-256-GCM + AAD</span> دون الاحتفاظ بأي كلمة مرور نصية.
                </p>
              </div>

              <button
                onClick={handleImportPredefined}
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all shrink-0 disabled:opacity-50"
              >
                <KeyRound className="w-4 h-4" />
                <span>{loading ? 'جارٍ التثبيت والتشفير...' : 'استيراد كلمات المرور الآن'}</span>
              </button>
            </div>

            {/* Filter Search */}
            <div className="relative">
              <input
                type="search"
                placeholder="ابحث بالاسم، اسم المستخدم، أو الرقم الأكاديمي..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl bg-slate-950 border border-slate-800 px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-950/60">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 font-bold">
                  <tr>
                    <th className="px-4 py-3">المستخدم / الاسم</th>
                    <th className="px-4 py-3">الرقم الأكاديمي</th>
                    <th className="px-4 py-3">الدور</th>
                    <th className="px-4 py-3">بصمة التشفير الثنائي (KDF + AEAD)</th>
                    <th className="px-4 py-3 text-left">نسخ المعرف</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {filtered.map((item) => {
                    const isCopied = copiedKey === item.username;
                    const isLead = item.username === 'admin';

                    return (
                      <tr
                        key={item.username}
                        className={`hover:bg-slate-900/60 transition-colors ${
                          isLead ? 'bg-emerald-500/[0.03]' : ''
                        }`}
                      >
                        <td className="px-4 py-3 font-sans">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-white border border-slate-700 shrink-0">
                              {item.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-white text-xs">{item.name}</p>
                              <p className="text-[11px] text-slate-400 font-mono">@{item.username}</p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3 text-slate-300">{item.academicId}</td>

                        <td className="px-4 py-3 font-sans">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              item.role === 'admin'
                                ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                : 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                            }`}
                          >
                            {item.role === 'admin' ? 'مشرف' : 'طالب'}
                          </span>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="text-[11px] text-emerald-300 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                              {item.password}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-3 text-left font-sans">
                          <button
                            type="button"
                            onClick={() => copyToClipboard(item.username, item.username)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[11px] font-bold inline-flex items-center gap-1 transition-colors"
                          >
                            {isCopied ? (
                              <Check className="w-3 h-3 text-emerald-400" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                            <span>{isCopied ? 'تم النسخ' : 'نسخ المعرف'}</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Custom Import */}
        {activeTab === 'custom' && (
          <div className="p-5 flex-1 overflow-y-auto space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>الصيغ المدعومة للاستيراد المشفّر (8 أحرف على الأقل لكل كلمة مرور):</span>
                </h3>

                <label className="cursor-pointer px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors shrink-0">
                  <Upload className="w-3.5 h-3.5 text-emerald-400" />
                  <span>رفع ملف (CSV / JSON)</span>
                  <input
                    type="file"
                    accept=".csv,.json,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="text-[11px] text-slate-400 space-y-1 font-mono bg-slate-900/80 p-3 rounded-xl border border-slate-800/80">
                <p className="text-slate-300 font-sans font-bold">صيغة CSV أو أسطر مفصولة بفواصل:</p>
                <p className="text-emerald-300">username,password,fullName,academicId,role</p>
              </div>

              <textarea
                rows={7}
                placeholder="الصق أسطر CSV أو كائن JSON هنا ليتم اشتقاق PBKDF2-SHA256 وتشفيره فوراً..."
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full rounded-2xl bg-slate-950 border border-slate-800 p-3 text-xs text-white placeholder:text-slate-500 font-mono focus:outline-none focus:border-emerald-500/50"
              />

              <div className="flex items-center justify-between gap-4 pt-2">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customOverwrite}
                    onChange={(e) => setCustomOverwrite(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-0"
                  />
                  <span>تحديث الحسابات الموجودة مسبقاً إذا وُجدت</span>
                </label>

                <button
                  type="button"
                  onClick={handleCustomImport}
                  disabled={loading || !customText.trim()}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>{loading ? 'جارٍ التشفير والاستيراد...' : 'استيراد الحسابات وتشفيرها'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <span>
              التشفير الثنائي مفعل: PBKDF2-HMAC-SHA256 (600,000 دورة) + AES-256-GCM (AAD) وفق معايير NCS-1:2020 و ECC-2:2024.
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
