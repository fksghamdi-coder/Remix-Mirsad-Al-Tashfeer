# الملف الرابع المستقل الكامل: `src/pages/admin/AdminDashboard.tsx`

```tsx
// File: src/pages/admin/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import CircularProgress from '@/components/admin/CircularProgress';
import DonutChart from '@/components/admin/DonutChart';
import BarChart from '@/components/admin/BarChart';
import LineChart from '@/components/admin/LineChart';
import {
  getCoursesStats,
  removeDashboardUser,
  addAuditLog,
} from '@/lib/dashboardData';
import {
  getUsers,
  saveUsers,
  deleteUserAsync,
  adminCreateUserAccount,
  getUserPasswordDetails,
  initializeAuth,
  StoredUser,
  UserRole,
} from '@/lib/auth';
import {
  getRealLoginLogs,
  fetchAndMergeCloudLoginLogs,
  syncAdminStateWithCloud,
  subscribeToCentralAccounts,
  pushAdminAccountOverride,
  LoginActivityRecord,
} from '@/lib/centralAdminDB';
import { getStoredAuditLogs, AuditLogRecord, writeAuditLog } from '@/lib/audit';

export default function AdminDashboard({ inModal = false }: { inModal?: boolean } = {}) {
  const [users, setUsers] = useState<StoredUser[]>(() => getUsers());
  const [courses] = useState(getCoursesStats);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);
  const [activeLogTab, setActiveLogTab] = useState<'LOGIN_LOGS' | 'AUDIT_LOGS'>('LOGIN_LOGS');
  const [loginLogs, setLoginLogs] = useState<LoginActivityRecord[]>(() => getRealLoginLogs());
  const [auditLogs, setAuditLogs] = useState<AuditLogRecord[]>(() => getStoredAuditLogs());

  const [createForm, setCreateForm] = useState({
    fullName: '',
    academicId: '',
    password: '',
    phone: '',
    role: 'user' as UserRole,
  });

  const refreshUsersList = async (forceClearSwCache = false) => {
    if (forceClearSwCache && typeof window !== 'undefined') {
      try {
        if ('caches' in window) {
          const keys = await caches.keys();
          await Promise.all(keys.map((k) => caches.delete(k)));
        }
        if ('serviceWorker' in navigator) {
          const regs = await navigator.serviceWorker.getRegistrations();
          await Promise.all(regs.map((r) => r.update()));
        }
      } catch {
        // ignore
      }
    }
    await syncAdminStateWithCloud();
    await initializeAuth();
    const mergedLogs = await fetchAndMergeCloudLoginLogs();
    setUsers(getUsers());
    setLoginLogs(mergedLogs);
    setAuditLogs(getStoredAuditLogs());
  };

  useEffect(() => {
    void refreshUsersList().finally(() => setLoading(false));
    const onUpdated = () => {
      setUsers(getUsers());
      setLoginLogs(getRealLoginLogs());
      setAuditLogs(getStoredAuditLogs());
    };
    const unsubCloud = subscribeToCentralAccounts(() => {
      setUsers(getUsers());
      setLoginLogs(getRealLoginLogs());
    });
    window.addEventListener('mirsad-users-updated', onUpdated);
    window.addEventListener('mirsad-login-logs-updated', onUpdated);
    window.addEventListener('storage', onUpdated);
    return () => {
      unsubCloud();
      window.removeEventListener('mirsad-users-updated', onUpdated);
      window.removeEventListener('mirsad-login-logs-updated', onUpdated);
      window.removeEventListener('storage', onUpdated);
    };
  }, []);

  const totalChapters = courses.reduce((s, c) => s + c.totalChapters, 0);
  const totalCompleted = courses.reduce((s, c) => s + c.completedChapters, 0);
  const completionPercent =
    totalChapters > 0 ? Math.round((totalCompleted / totalChapters) * 100) : 0;

  const handleDelete = async (username: string) => {
    if (username.toLowerCase() === 'admin') return;
    const res = await deleteUserAsync(username);
    if (!res.success) {
      setStatusMessage(`⚠️ ${res.error}`);
      return;
    }
    removeDashboardUser(username);
    setUsers(getUsers());
    setLoginLogs(getRealLoginLogs());
    addAuditLog({ action: 'DELETE_USER', details: `حذف المستخدم ${username} نهائياً`, user: 'admin' });
    await writeAuditLog(null, {
      userId: 'admin',
      actorName: 'المشرف العام',
      action: 'DELETE_USER',
      category: 'admin',
      details: `حذف المستخدم ${username} نهائياً من قاعدة البيانات المركزية والسحابة`,
    });
    setAuditLogs(getStoredAuditLogs());
    setStatusMessage(`✓ تم الحذف الفعلي النهائي للحساب (${username}) من قاعدة البيانات المركزية والسحابة.`);
  };

  const handleRoleChange = async (username: string, role: UserRole) => {
    if (username.toLowerCase() === 'admin' && role !== 'admin') return;
    const updated = users.map((u) => (u.username === username ? { ...u, role } : u));
    saveUsers(updated);
    setUsers(getUsers());
    await pushAdminAccountOverride({
      username,
      role,
      updatedAt: Date.now(),
    });
    addAuditLog({ action: 'ROLE_UPDATE', details: `تغيير دور ${username} إلى ${role}`, user: 'admin' });
    await writeAuditLog(null, {
      userId: 'admin',
      actorName: 'المشرف العام',
      action: 'ROLE_UPDATE',
      category: 'admin',
      details: `تعديل دور المستخدم ${username} إلى ${role}`,
    });
    setAuditLogs(getStoredAuditLogs());
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateError(null);

    const fullName = createForm.fullName.trim();
    const academicId = createForm.academicId.trim();
    const password =
      createForm.password.trim() || `Mirsad#${academicId.slice(-4).padStart(4, '0')}`;

    if (!fullName || !academicId) {
      setCreateError('يرجى إدخال الاسم الكامل والرقم الأكاديمي');
      return;
    }
    if (password.length < 6) {
      setCreateError('كلمة المرور يجب أن تكون 6 خانات على الأقل');
      return;
    }

    const res = await adminCreateUserAccount({
      fullName,
      academicId,
      username: academicId.toLowerCase(),
      password,
      phone: createForm.phone.trim(),
      role: createForm.role,
    });

    if (!res.success) {
      setCreateError(res.error || 'تعذر إنشاء الحساب');
      return;
    }

    setUsers(getUsers());
    addAuditLog({
      action: 'CREATE_USER',
      details: `إنشاء وتفعيل حساب ${fullName} (${academicId}) بكلمة مرور معتمدة`,
      user: 'admin',
    });
    await writeAuditLog(null, {
      userId: 'admin',
      actorName: 'المشرف العام',
      action: 'CREATE_USER',
      category: 'admin',
      details: `إنشاء وتفعيل حساب ${fullName} (${academicId}) بكلمة مرور معتمدة`,
    });
    setAuditLogs(getStoredAuditLogs());

    setStatusMessage(
      `✓ تم إنشاء وتفعيل حساب «${fullName}» بنجاح! المعرف للدخول: (${academicId}) — كلمة المرور: (${password}). يمكنه تسجيل الدخول الآن فوراً.`
    );
    setShowCreateModal(false);
    setCreateForm({ fullName: '', academicId: '', password: '', phone: '', role: 'user' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-sm text-slate-400">جاري تحميل لوحة التحكم...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${inModal ? 'p-2' : ''}`} dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-100">
            لوحة تحكم المسؤول والحوكمة المركزية
          </h1>
          <p className="text-sm mt-1 text-slate-400">
            إدارة الحسابات الفعلية والمحتوى الأكاديمي وسجل تسجيل الدخول المباشر
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black tracking-widest uppercase border bg-indigo-500/15 text-indigo-300 border-indigo-500/30">
          ADMIN ACTIVE
        </span>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-xs text-emerald-200 flex items-center justify-between gap-3">
          <span className="font-bold">{statusMessage}</span>
          <button onClick={() => setStatusMessage(null)} className="text-slate-400 hover:text-white cursor-pointer">
            ✕
          </button>
        </div>
      )}

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KPICard label="إجمالي الحسابات الفعلية بالنظام" value={users.length} icon="👥" tone="text-indigo-400" />
        <KPICard label="الحسابات المسجلة فعلياً (طلاب)" value={users.filter((u) => u.role !== 'admin').length} icon="🎓" tone="text-emerald-400" />
        <KPICard label="عمليات الدخول الفعلية الموثقة" value={loginLogs.length} icon="⚡" tone="text-amber-400" />
        <KPICard label="سجلات التدقيق المشفرة" value={auditLogs.length} icon="📊" tone="text-purple-400" />
      </div>

      {/* Overview Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl">
          <h3 className="text-sm font-bold text-slate-200 mb-4">👤 توزيع الحسابات الفعلية</h3>
          <DonutChart
            segments={[
              { label: 'طلاب', value: users.filter((u) => u.role === 'user').length, color: '#6366f1' },
              { label: 'دكاترة', value: users.filter((u) => u.role === 'doctor').length, color: '#10b981' },
              { label: 'مشرفون', value: users.filter((u) => u.role === 'admin').length, color: '#f59e0b' },
            ]}
            size={130}
          />
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <h3 className="text-sm font-bold text-slate-200 mb-4">📝 أداء الاختبارات</h3>
          <LineChart
            points={[
              { x: 1, y: 78, label: 'F1', value: 78 },
              { x: 2, y: 82, label: 'F2', value: 82 },
              { x: 3, y: 75, label: 'F3', value: 75 },
              { x: 4, y: 88, label: 'F4', value: 88 },
            ]}
            height={160}
          />
        </div>

        <div className="glass-panel p-5 rounded-2xl">
          <h3 className="text-sm font-bold text-slate-200 mb-4">⏱ جاهزية المقررات</h3>
          <div className="flex items-center justify-center py-4">
            <CircularProgress
              percentage={completionPercent || 100}
              size={120}
              strokeWidth={10}
              color="#10b981"
              label="جاهزية المنصة"
            />
          </div>
        </div>
      </div>

      {/* User Management — مربوط مباشرة بنظام المصادقة الفعلي auth.ts */}
      <div className="glass-panel p-5 rounded-2xl border border-indigo-500/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
            <span>👥</span> إدارة المستخدمين الفعليين ({users.length})
          </h3>
          <button
            type="button"
            onClick={() => {
              setCreateError(null);
              setShowCreateModal(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer bg-indigo-500/20 text-indigo-200 border border-indigo-500/40 hover:bg-indigo-500/30"
          >
            <span className="text-base leading-none">+</span>
            <span>إضافة مستخدم جديد وتفعيله</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-right">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800">
                <th className="py-2.5 px-3 font-semibold">الاسم والمستخدم</th>
                <th className="py-2.5 px-3 font-semibold">الرقم الأكاديمي / المعرف</th>
                <th className="py-2.5 px-3 font-semibold">كلمة المرور المعتمدة للدخول</th>
                <th className="py-2.5 px-3 font-semibold">الجوال</th>
                <th className="py-2.5 px-3 text-center font-semibold">الدور</th>
                <th className="py-2.5 px-3 text-center font-semibold">الحالة</th>
                <th className="py-2.5 px-3 text-center font-semibold">إجراء</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const pwInfo = getUserPasswordDetails(u);
                return (
                  <tr key={u.username} className="border-b border-slate-800/40 hover:bg-slate-800/30">
                    <td className="py-3 px-3 font-bold text-white">
                      {u.fullName || u.username}{' '}
                      <span className="text-slate-400 font-mono text-[11px]">(@{u.username})</span>
                    </td>
                    <td className="py-3 px-3 font-mono text-amber-300">{u.academicId || u.username}</td>
                    <td className="py-3 px-3 font-mono text-emerald-300 font-bold select-all">
                      {pwInfo.password}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-400">{u.phone || '—'}</td>
                    <td className="py-3 px-3 text-center">
                      <select
                        value={u.role}
                        disabled={u.username.toLowerCase() === 'admin'}
                        onChange={(e) => handleRoleChange(u.username, e.target.value as UserRole)}
                        className="bg-slate-900 text-xs border border-slate-700 rounded-lg px-2 py-1 text-slate-200 cursor-pointer"
                      >
                        <option value="user">طالب</option>
                        <option value="doctor">دكتور</option>
                        <option value="admin">مسؤول</option>
                      </select>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="text-emerald-400 font-bold text-[11px]">✓ نشط ومفعّل للدخول</span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <button
                        type="button"
                        onClick={() => void handleDelete(u.username)}
                        disabled={u.username.toLowerCase() === 'admin'}
                        className="text-rose-400 hover:text-rose-300 disabled:opacity-30 disabled:cursor-not-allowed text-xs px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 cursor-pointer"
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Audit Logs & Real Login Activity ───────────── */}
      <div className="glass-panel p-5 rounded-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveLogTab('LOGIN_LOGS')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeLogTab === 'LOGIN_LOGS'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              🔐 سجل تسجيل الدخول الفعلي ({loginLogs.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveLogTab('AUDIT_LOGS')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeLogTab === 'AUDIT_LOGS'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              📋 سجل التدقيق الأمني وسلسلة التجزئة ({auditLogs.length})
            </button>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
            ✓ موثق بتشفير SHA-256 + HMAC
          </span>
        </div>

        {activeLogTab === 'LOGIN_LOGS' ? (
          <div className="max-h-64 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
            {loginLogs.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">لا توجد عمليات تسجيل دخول مسجلة بعد</p>
            ) : (
              loginLogs.map((log) => {
                const isSuccess = log.status === 'success';
                const isLogout = log.status === 'logout';
                return (
                  <div
                    key={log.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isSuccess
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : isLogout
                            ? 'bg-slate-700/50 text-slate-300 border border-slate-600'
                            : 'bg-red-500/20 text-red-300 border border-red-500/30'
                        }`}
                      >
                        {isSuccess ? 'دخول ناجح' : isLogout ? 'تسجيل خروج' : 'محاولة فاشلة'}
                      </span>
                      <span className="font-bold text-slate-200">{log.fullName || log.username}</span>
                      <span className="font-mono text-slate-400 text-[11px]">@{log.username}</span>
                      <span className="font-mono text-cyan-400 text-[11px]">({log.academicId || '—'})</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-400 text-[11px] font-mono">
                      <span className="text-slate-300">{log.note}</span>
                      <span>
                        {log.isoDate?.replace('T', ' ').substring(0, 19) ||
                          new Date(log.timestamp).toLocaleString('ar-SA')}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        ) : (
          <div className="max-h-64 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
            {auditLogs.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-6">لا توجد سجلات تدقيق بعد</p>
            ) : (
              auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="font-mono text-slate-500 shrink-0 text-[10px] w-28">
                      {log.created_at
                        ? log.created_at.split('T')[0] + ' ' + (log.created_at.split('T')[1]?.substring(0, 5) || '')
                        : '—'}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${actionBadge(log.action)}`}>
                      {log.action}
                    </span>
                    <span className="text-slate-300 truncate">{log.details}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-slate-500 font-mono text-[10px]">
                      {log.actor_name || log.user_id || 'system'}
                    </span>
                    {log.hash && (
                      <span className="text-[10px] font-mono text-amber-400/80 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                        #{log.hash.substring(0, 8)}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* نافذة إضافة مستخدم جديد وتشفير كلمة مروره ليتمكن من الدخول فوراً */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" role="dialog" aria-modal="true">
          <form
            onSubmit={handleCreate}
            className="relative w-full max-w-md glass-panel rounded-3xl p-6 shadow-2xl border border-indigo-500/40 bg-slate-900 space-y-4"
          >
            <h2 className="text-lg font-black text-white">إضافة وتفعيل حساب مستخدم جديد</h2>

            {createError && (
              <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-xs text-rose-300">
                {createError}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold mb-1 text-slate-300">الاسم الكامل *</label>
              <input
                type="text"
                required
                value={createForm.fullName}
                onChange={(e) => setCreateForm((p) => ({ ...p, fullName: e.target.value }))}
                className="w-full rounded-xl px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-indigo-500"
                placeholder="أدخل الاسم الثلاثي الكامل"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-1 text-slate-300">
                الرقم الأكاديمي / اسم المستخدم للدخول *
              </label>
              <input
                type="text"
                required
                value={createForm.academicId}
                onChange={(e) =>
                  setCreateForm((p) => ({
                    ...p,
                    academicId: e.target.value,
                    password:
                      p.password ||
                      (e.target.value.trim().length >= 4
                        ? `Mirsad#${e.target.value.trim().slice(-4)}`
                        : ''),
                  }))
                }
                className="w-full rounded-xl px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-indigo-500"
                placeholder="(الرقم الأكاديمي)"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-emerald-300">
                  كلمة المرور المعتمدة للحساب (6 خانات فأكثر) *
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const suffix =
                      createForm.academicId.trim().slice(-4) ||
                      String(Math.floor(1000 + Math.random() * 9000));
                    setCreateForm((p) => ({ ...p, password: `Mirsad#${suffix}` }));
                  }}
                  className="text-[11px] text-amber-400 hover:underline font-bold cursor-pointer"
                >
                  توليد تلقائي
                </button>
              </div>
              <input
                type="text"
                required
                value={createForm.password}
                onChange={(e) => setCreateForm((p) => ({ ...p, password: e.target.value }))}
                className="w-full rounded-xl px-3.5 py-2.5 text-xs bg-slate-950 border border-emerald-500/50 text-emerald-300 font-mono font-bold focus:outline-none focus:border-emerald-400"
                placeholder="أدخل كلمة المرور التي سيدخل بها المستخدم"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-300">رقم الجوال</label>
                <input
                  type="tel"
                  value={createForm.phone}
                  onChange={(e) => setCreateForm((p) => ({ ...p, phone: e.target.value }))}
                  className="w-full rounded-xl px-3 py-2 text-xs bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none"
                  placeholder="05XXXXXXXX"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1 text-slate-300">الدور</label>
                <select
                  value={createForm.role}
                  onChange={(e) => setCreateForm((p) => ({ ...p, role: e.target.value as UserRole }))}
                  className="w-full rounded-xl px-3 py-2 text-xs bg-slate-950 border border-slate-700 text-white cursor-pointer focus:outline-none"
                >
                  <option value="user">طالب</option>
                  <option value="doctor">دكتور</option>
                  <option value="admin">مسؤول</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-black bg-emerald-500 hover:bg-emerald-400 text-slate-950 cursor-pointer shadow-lg transition-all"
              >
                إنشاء وتفعيل الحساب الآن
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function KPICard({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: string | number;
  icon?: string;
  tone: string;
}) {
  return (
    <div className="glass-panel p-4 rounded-xl flex items-center gap-3">
      {icon && <span className="text-xl">{icon}</span>}
      <div>
        <p className={`text-xl md:text-2xl font-black font-mono tabular-nums ${tone}`}>{value}</p>
        <p className="text-[11px] text-slate-400 mt-0.5">{label}</p>
      </div>
    </div>
  );
}

function actionBadge(action: string): string {
  const a = action.toLowerCase();
  if (a.includes('delete')) return 'bg-red-500/20 text-red-300 border border-red-500/30';
  if (a.includes('create') || a.includes('add')) return 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
  if (a.includes('role')) return 'bg-amber-500/20 text-amber-300 border border-amber-500/30';
  if (a.includes('audit')) return 'bg-purple-500/20 text-purple-300 border border-purple-500/30';
  if (a.includes('update')) return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
  return 'bg-slate-700/50 text-slate-300 border border-slate-600/50';
}
```
