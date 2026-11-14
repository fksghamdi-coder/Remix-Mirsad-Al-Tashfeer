# الملف الخامس المستقل الكامل: `src/pages/admin/AdminUsers.tsx`

```tsx
// File: src/pages/admin/AdminUsers.tsx
import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  ShieldCheck,
  Sparkles,
  Eye,
  EyeOff,
  Copy,
  Check,
  Pencil,
  Trash2,
  X,
  Activity,
  Clock,
  Code2,
  RefreshCw,
  UserPlus,
} from 'lucide-react';
import {
  getUsers,
  saveUsers,
  deleteUserAsync,
  initializeAuth,
  StoredUser,
  UserRole,
  seedStudentAccounts,
  getUserPasswordDetails,
  adminUpdateUserPassword,
  adminCreateUserAccount,
} from '@/lib/auth';
import {
  getRealLoginLogs,
  fetchAndMergeCloudLoginLogs,
  syncAdminStateWithCloud,
  subscribeToCentralAccounts,
  pushAdminAccountOverride,
  getLocalAccountOverrides,
  LoginActivityRecord,
} from '@/lib/centralAdminDB';
import { removeDashboardUser } from '@/lib/dashboardData';
import { useAuth } from '@/contexts/AuthContext';
import { writeAuditLog } from '@/lib/audit';
import { AdminNav } from '@/components/admin/AdminNav';
import { cn } from '@/lib/utils';
import ImportPasswordsModal from '@/components/ui/ImportPasswordsModal';

const ROLE_OPTIONS = [
  { value: 'student', label: 'طالب', color: 'bg-slate-500/15 text-slate-300 border-slate-500/30' },
  { value: 'instructor', label: 'مُدرّس', color: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30' },
  { value: 'admin', label: 'مشرف (Admin)', color: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
];

export default function AdminUsers() {
  const { session } = useAuth();
  const [usersList, setUsersList] = useState<StoredUser[]>(() => getUsers());
  const [loginLogs, setLoginLogs] = useState<LoginActivityRecord[]>(() => getRealLoginLogs());
  const [accountOverrides, setAccountOverrides] = useState(() => getLocalAccountOverrides());
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusMsg, setStatusMsg] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportCodeModal, setShowExportCodeModal] = useState(false);

  const [showPasswordMap, setShowPasswordMap] = useState<Record<string, boolean>>({});
  const [copiedUsername, setCopiedUsername] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<StoredUser | null>(null);
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);
  const [editPasswordError, setEditPasswordError] = useState<string | null>(null);
  const [confirmDeleteUsername, setConfirmDeleteUsername] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createForm, setCreateForm] = useState({
    fullName: '',
    academicId: '',
    password: '',
    phone: '',
    role: 'user' as UserRole,
  });
  const isAdmin = session?.role === 'admin';

  const refreshAllData = async (forceServerCacheBust = false) => {
    if (forceServerCacheBust && typeof window !== 'undefined') {
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
    setUsersList(getUsers());
    setAccountOverrides(getLocalAccountOverrides());
    const mergedLogs = await fetchAndMergeCloudLoginLogs();
    setLoginLogs(mergedLogs);
    if (forceServerCacheBust) {
      const currentUsers = getUsers();
      const registeredStudents = currentUsers.filter((u) => u.role !== 'admin').length;
      setStatusMsg(
        `✓ تم تحديث السيرفر ومزامنة قاعدة البيانات المركزية: إجمالي الحسابات الفعلية (${currentUsers.length}) — منها (${registeredStudents}) حساب طالب مسجل فعلياً + حساب المشرف العام.`
      );
    }
  };

  useEffect(() => {
    void refreshAllData();
    const onUsersUpdated = () => {
      setUsersList(getUsers());
      setAccountOverrides(getLocalAccountOverrides());
    };
    const onLogsUpdated = () => {
      setLoginLogs(getRealLoginLogs());
    };
    const unsubCloud = subscribeToCentralAccounts(() => {
      setUsersList(getUsers());
      setAccountOverrides(getLocalAccountOverrides());
      setLoginLogs(getRealLoginLogs());
    });
    window.addEventListener('mirsad-users-updated', onUsersUpdated);
    window.addEventListener('mirsad-login-logs-updated', onLogsUpdated);
    window.addEventListener('storage', onUsersUpdated);
    return () => {
      unsubCloud();
      window.removeEventListener('mirsad-users-updated', onUsersUpdated);
      window.removeEventListener('mirsad-login-logs-updated', onLogsUpdated);
      window.removeEventListener('storage', onUsersUpdated);
    };
  }, []);

  const toggleShowPassword = (username: string) => {
    setShowPasswordMap((prev) => ({ ...prev, [username]: !prev[username] }));
  };

  const handleCopyPassword = async (username: string, pwd: string) => {
    try {
      await navigator.clipboard.writeText(pwd);
      setCopiedUsername(username);
      setTimeout(() => setCopiedUsername(null), 2000);
    } catch {
      // ignore
    }
  };

  const openEditPasswordModal = (user: StoredUser) => {
    setEditingUser(user);
    setNewPasswordInput('');
    setShowNewPassword(false);
    setEditPasswordError(null);
  };

  const generateQuickPassword = () => {
    const randDigits = Math.floor(1000 + Math.random() * 9000);
    setNewPasswordInput(`Mirsad#${randDigits}`);
  };

  const handleSavePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    const trimmed = newPasswordInput.trim();
    if (!trimmed || trimmed.length < 6) {
      setEditPasswordError('يجب أن يتكون الرقم السري الجديد من 6 خانات على الأقل.');
      return;
    }

    setIsSubmittingPassword(true);
    setEditPasswordError(null);

    const res = await adminUpdateUserPassword(editingUser.username, trimmed);
    setIsSubmittingPassword(false);

    if (!res.success) {
      setEditPasswordError(res.error || 'فشل تحديث الرقم السري.');
      return;
    }

    const updated = getUsers();
    const updatedUser = updated.find((u) => u.username === editingUser.username);
    if (updatedUser) {
      await pushAdminAccountOverride({
        username: updatedUser.username,
        academicId: updatedUser.academicId,
        fullName: updatedUser.fullName,
        role: updatedUser.role,
        password: trimmed,
        passwordHash: updatedUser.passwordHash,
        passwordSalt: updatedUser.passwordSalt,
        isDeleted: false,
        updatedAt: Date.now(),
      });
    }

    setUsersList(updated);
    setShowPasswordMap((prev) => ({ ...prev, [editingUser.username]: true }));

    try {
      await navigator.clipboard.writeText(trimmed);
      setCopiedUsername(editingUser.username);
    } catch {
      // ignore
    }

    await writeAuditLog(null, {
      userId: session?.username || 'admin',
      actorName: session?.fullName || 'مشرف النظام',
      action: 'PASSWORD_RESET_ASSISTANCE',
      category: 'admin',
      details: `تغيير وتشفير الرقم السري للمستخدم ${editingUser.fullName} (${editingUser.username}) ومزامنته في قاعدة بيانات المشرف المركزية.`,
    });

    setStatusMsg(
      `✓ تم تغيير الرقم السري للمستخدم ${editingUser.fullName} بنجاح إلى: (${trimmed}) ومزامنته مع قاعدة بيانات المشرف السحابية.`
    );
    setEditingUser(null);
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return usersList.filter((u) => {
      const currentRole =
        u.role === 'admin'
          ? 'admin'
          : (u as { isInstructor?: boolean }).isInstructor
          ? 'instructor'
          : 'student';
      if (roleFilter !== 'all' && currentRole !== roleFilter) return false;
      if (!q) return true;
      return (
        u.username.toLowerCase().includes(q) ||
        (u.fullName || '').toLowerCase().includes(q) ||
        (u.academicId || '').includes(q)
      );
    });
  }, [usersList, search, roleFilter]);

  const handleImportAllStudents = async () => {
    setStatusMsg('جارٍ استيراد ومزامنة جميع الحسابات الرسمية...');
    await seedStudentAccounts(true);
    const updated = getUsers();
    setUsersList(updated);
    setStatusMsg(`✓ تم استيراد وتحديث حسابات الطلاب والمشرف بنجاح (${updated.length} حساب فعلي).`);
  };

  const handleRoleChange = async (username: string, newRole: string) => {
    const current = usersList.find((u) => u.username === username);
    if (!current) return;

    if (current.username === session?.username && newRole !== 'admin') {
      setStatusMsg('⚠️ لا يمكنك تنزيل رتبتك الإدارية الخاصة.');
      return;
    }

    const mappedRole = (newRole === 'admin' ? 'admin' : 'user') as UserRole;
    const updated = usersList.map((u) =>
      u.username === username
        ? { ...u, role: mappedRole, isInstructor: newRole === 'instructor' }
        : u
    );

    setUsersList(updated);
    saveUsers(updated);
    await pushAdminAccountOverride({
      username: current.username,
      academicId: current.academicId,
      fullName: current.fullName,
      role: mappedRole,
      updatedAt: Date.now(),
    });

    setStatusMsg(`✓ تم تحديث دور ${current.fullName} إلى ${newRole} وحفظه في قاعدة بيانات المشرف.`);
  };

  const handleRemoveUser = async (targetUser: StoredUser) => {
    if (!isAdmin) return;
    const res = await deleteUserAsync(targetUser.username);
    if (!res.success) {
      setStatusMsg(`⚠️ ${res.error || 'تعذّر إزالة المستخدم.'}`);
      setConfirmDeleteUsername(null);
      return;
    }
    removeDashboardUser(targetUser.username);

    setUsersList(getUsers());
    setAccountOverrides(getLocalAccountOverrides());
    setLoginLogs(getRealLoginLogs());
    setConfirmDeleteUsername(null);

    await writeAuditLog(null, {
      userId: session?.username || 'admin',
      actorName: session?.fullName || 'مشرف النظام',
      action: 'USER_REMOVED_CENTRAL',
      category: 'admin',
      details: `حذف فعلي ونهائي لحساب المستخدم ${targetUser.fullName} (@${targetUser.username}) من النظام وقاعدة البيانات المركزية والسحابة.`,
    });

    setStatusMsg(
      `✓ تم الحذف الفعلي النهائي للحساب ${targetUser.fullName} (@${targetUser.username}) من جميع قواعد البيانات المحلية والسحابية ولن يتمكن من الدخول مجدداً.`
    );
  };

  const handleCreateUser = async (e: React.FormEvent) => {
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

    setUsersList(getUsers());
    setStatusMsg(
      `✓ تم إنشاء وتفعيل حساب «${fullName}» بنجاح! المعرف للدخول: (${academicId}) — كلمة المرور: (${password}). يمكنه تسجيل الدخول الآن فوراً.`
    );
    setShowCreateModal(false);
    setCreateForm({ fullName: '', academicId: '', password: '', phone: '', role: 'user' });

    await writeAuditLog(null, {
      userId: session?.username || 'admin',
      actorName: session?.fullName || 'مشرف النظام',
      action: 'CREATE_USER',
      category: 'admin',
      details: `إنشاء وتفعيل حساب ${fullName} (${academicId}) بكلمة مرور معتمدة`,
    });
  };

  // توليد الكود المصدري لمصفوفة PREHASHED_ACCOUNTS بالحسابات الفعلية المتبقية فقط بعد الحذف
  const exportedAccountsCode = useMemo(() => {
    const items = usersList.map((u) => ({
      username: u.username,
      name: u.fullName,
      academicId: u.academicId,
      passwordSalt: u.passwordSalt,
      passwordHash: u.passwordHash,
      role: u.role,
      title: u.persona || (u.role === 'admin' ? 'مشرف النظام المركزي' : 'طالب دبلوم أمن المعلومات — شعبة (002م)'),
      phone: u.phone || '',
    }));
    return `export const PREHASHED_ACCOUNTS: PrehashedAccount[] = ${JSON.stringify(items, null, 2)};`;
  }, [usersList]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-4" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <Link to="/admin" className="hover:text-emerald-400 transition-colors">
              لوحة الإدارة
            </Link>
            <span>/</span>
            <span className="text-slate-200">قاعدة بيانات المشرف وسجل تسجيل الدخول الفعلي</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-emerald-400" />
            <span>إدارة حساب المشرف العام وقاعدة البيانات المركزية</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {usersList.length} حساب فعلي معتمد • عزل ومسح الحسابات السابقة ومزامنة قاعدة البيانات المركزية SQL + Cloud
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setCreateError(null);
              setShowCreateModal(true);
            }}
            className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center gap-1.5 border border-emerald-500/40 cursor-pointer shadow-lg"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ إضافة مستخدم جديد وتفعيله</span>
          </button>
          <button
            type="button"
            onClick={() => void refreshAllData(true)}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs flex items-center gap-1.5 border border-cyan-500/30 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>تحديث السيرفر وإظهار الحسابات الفعلية الآن</span>
          </button>
          <button
            type="button"
            onClick={() => setShowExportCodeModal(true)}
            className="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 font-bold text-xs flex items-center gap-1.5 border border-amber-500/40 cursor-pointer"
          >
            <Code2 className="w-4 h-4" />
            <span>تصدير كود الحسابات الفعلي (لـ GitHub / Netlify)</span>
          </button>
        </div>
      </div>

      <AdminNav />

      {statusMsg && (
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
          <span>{statusMsg}</span>
          <button onClick={() => setStatusMsg('')} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* شريط البحث والفلترة */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="search"
            placeholder="ابحث باسم المستخدم أو الاسم الكامل أو الرقم الأكاديمي..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl bg-slate-900 border border-slate-800 px-4 py-3 pr-10 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        <div className="flex gap-1 p-1 rounded-2xl bg-slate-900 border border-slate-800">
          {[
            { value: 'all', label: `الكل (${usersList.length})` },
            ...ROLE_OPTIONS.map((r) => ({ value: r.value, label: r.label })),
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setRoleFilter(opt.value)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                roleFilter === opt.value
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* جدول الحسابات الفعلية الحالية (شامل حساب الأدمن + سجل آخر دخول لكل حساب) */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
        <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-black text-emerald-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>قائمة الحسابات الفعلية المعتمدة حالياً في قاعدة بيانات المشرف ({filtered.length} حساب)</span>
          </h2>
          <span className="text-[11px] text-slate-400">
            يشمل حساب المشرف العام (admin) وجميع حسابات الطلاب غير المحذوفة
          </span>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 font-bold text-[11px]">
              <tr>
                <th className="px-3 py-2.5 text-right whitespace-nowrap">المستخدم</th>
                <th className="px-3 py-2.5 text-right whitespace-nowrap">الرقم الأكاديمي / المعرف</th>
                <th className="px-3 py-2.5 text-right whitespace-nowrap">الدور</th>
                <th className="px-3 py-2.5 text-right whitespace-nowrap">الرقم السري الفعلي</th>
                <th className="px-3 py-2.5 text-right whitespace-nowrap">آخر تسجيل دخول فعلي</th>
                <th className="px-3 py-2.5 text-center whitespace-nowrap">مرات الدخول</th>
                <th className="px-3 py-2.5 text-left whitespace-nowrap">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-400 text-xs">
                    لا توجد حسابات مطابقة لمعايير البحث الحالية
                  </td>
                </tr>
              ) : (
                filtered.map((user) => {
                  const userRole =
                    user.role === 'admin'
                      ? 'admin'
                      : (user as { isInstructor?: boolean }).isInstructor
                      ? 'instructor'
                      : 'student';
                  const roleMeta = ROLE_OPTIONS.find((r) => r.value === userRole) || ROLE_OPTIONS[0];
                  const isSelf = user.username.toLowerCase() === session?.username?.toLowerCase();
                  const { password: realPassword, isDefault: isDefaultPw } = getUserPasswordDetails(user);
                  const isRevealed = showPasswordMap[user.username] !== false;
                  const isCopied = copiedUsername === user.username;

                  // حساب إحصائيات الدخول الفعلية لهذا المستخدم من السجل الحي
                  const userLogs = loginLogs.filter(
                    (l) =>
                      l.status === 'success' &&
                      (l.username.toLowerCase() === user.username.toLowerCase() ||
                        l.academicId.toLowerCase() === (user.academicId || '').toLowerCase())
                  );
                  const overrideInfo = accountOverrides[user.username.toLowerCase()];
                  const lastLoginTs =
                    userLogs[0]?.timestamp ||
                    overrideInfo?.lastLoginAt ||
                    (isSelf ? session?.loginTime : undefined);
                  const totalLogins = Math.max(
                    userLogs.length,
                    overrideInfo?.loginCount || 0,
                    isSelf ? 1 : 0
                  );

                  return (
                    <tr key={user.username} className="hover:bg-slate-950/40 transition-colors">
                      <td className="px-3 py-2.5">
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              'w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 border',
                              user.role === 'admin'
                                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                                : 'bg-slate-800 border-slate-700'
                            )}
                          >
                            {(user.fullName || user.username).charAt(0)}
                          </div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-white text-xs whitespace-nowrap">
                              {user.fullName || user.username}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono whitespace-nowrap">
                              @{user.username}
                            </span>
                            {isSelf && (
                              <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black shrink-0">
                                متصل الآن
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-2.5 font-mono text-slate-300 text-xs whitespace-nowrap">
                        {user.academicId || user.username}
                      </td>

                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold shrink-0 ${roleMeta.color}`}>
                          {roleMeta.label}
                        </span>
                      </td>

                      <td className="px-3 py-2.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 flex-nowrap">
                          <span
                            className={cn(
                              'px-1.5 py-0.5 rounded text-[10px] font-bold border shrink-0',
                              isDefaultPw
                                ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                            )}
                          >
                            {isDefaultPw ? 'افتراضي' : 'محدّث'}
                          </span>

                          <div className="flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded-lg border border-slate-800 font-mono text-xs shrink-0">
                            <span className={cn('select-all font-bold', isRevealed ? 'text-amber-300' : 'text-slate-400')}>
                              {isRevealed ? (realPassword || 'admin123') : '••••••••'}
                            </span>
                            <button
                              type="button"
                              onClick={() => toggleShowPassword(user.username)}
                              className="text-slate-500 hover:text-slate-200 p-0.5 cursor-pointer"
                              title={isRevealed ? 'إخفاء' : 'إظهار'}
                            >
                              {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleCopyPassword(user.username, realPassword || 'admin123')}
                              className="text-slate-500 hover:text-emerald-400 p-0.5 cursor-pointer"
                              title="نسخ الرقم السري"
                            >
                              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => openEditPasswordModal(user)}
                            className="px-2 py-0.5 rounded-lg bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 border border-blue-500/30 font-bold text-[10px] flex items-center gap-1 cursor-pointer shrink-0"
                          >
                            <Pencil className="w-2.5 h-2.5" />
                            <span>تعديل</span>
                          </button>
                        </div>
                      </td>

                      <td className="px-3 py-2.5 font-mono text-[11px] whitespace-nowrap">
                        {lastLoginTs ? (
                          <span className="text-emerald-300">
                            {new Date(lastLoginTs).toLocaleString('ar-SA')}
                          </span>
                        ) : (
                          <span className="text-slate-500">لم يسجل دخولاً بعد</span>
                        )}
                      </td>

                      <td className="px-3 py-2.5 font-mono text-xs text-center whitespace-nowrap">
                        <span
                          className={cn(
                            'px-2 py-0.5 rounded-full text-[10px] font-black shrink-0',
                            totalLogins > 0
                              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                              : 'bg-slate-800 text-slate-400'
                          )}
                        >
                          {totalLogins} مرة
                        </span>
                      </td>

                      <td className="px-3 py-2.5 text-left whitespace-nowrap">
                        {isSelf ? (
                          <span className="text-emerald-400 font-bold text-[11px]">حساب الأدمن النشط</span>
                        ) : (
                          <div className="flex items-center justify-end gap-1.5 flex-nowrap">
                            <select
                              value={userRole}
                              onChange={(e) => handleRoleChange(user.username, e.target.value)}
                              className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-0.5 text-white text-xs cursor-pointer"
                            >
                              {ROLE_OPTIONS.map((r) => (
                                <option key={r.value} value={r.value}>
                                  {r.label}
                                </option>
                              ))}
                            </select>

                            {isAdmin &&
                              (confirmDeleteUsername === user.username ? (
                                <div className="flex items-center gap-1 flex-nowrap">
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveUser(user)}
                                    className="px-2 py-0.5 rounded-lg bg-rose-600 text-white font-bold text-[10px] cursor-pointer whitespace-nowrap"
                                  >
                                    تأكيد الحذف
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setConfirmDeleteUsername(null)}
                                    className="px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300 text-[10px] cursor-pointer whitespace-nowrap"
                                  >
                                    إلغاء
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteUsername(user.username)}
                                  className="px-2 py-0.5 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 font-bold text-[10px] flex items-center gap-1 cursor-pointer shrink-0"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  <span>حذف</span>
                                </button>
                              ))}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── جدول سجل تسجيل الدخول الفعلي والعمليات الأمنية لحساب المشرف العام ─── */}
      <div className="rounded-2xl bg-slate-900 border border-emerald-500/30 overflow-hidden shadow-xl">
        <div className="px-5 py-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <Activity className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="text-sm font-black text-white">
                سجل عمليات تسجيل الدخول الفعلي والعمليات الأمنية
              </h2>
              <p className="text-[11px] text-slate-400">
                يوثق لحظياً كل عملية تسجيل دخول أو خروج أو إجراء تشفيري لحساب المشرف العام (Admin) بتشفير AES-256-GCM وسلسلة SHA-256
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-300">
            إجمالي العمليات الموثقة: {loginLogs.length}
          </span>
        </div>

        <div className="overflow-x-auto max-h-96 overflow-y-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-950/90 border-b border-slate-800 text-slate-400 font-bold sticky top-0">
              <tr>
                <th className="px-4 py-3">التاريخ والوقت</th>
                <th className="px-4 py-3">اسم المستخدم / الحساب</th>
                <th className="px-4 py-3">المعرف / الرقم الأكاديمي</th>
                <th className="px-4 py-3">نوع الحساب</th>
                <th className="px-4 py-3">حالة العملية</th>
                <th className="px-4 py-3">التفاصيل الأمنية</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {loginLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-slate-400">
                    سيظهر هنا تلقائياً كل تسجيل دخول فعلي يقوم به الأدمن أو أي طالب فور دخوله للمنصة.
                  </td>
                </tr>
              ) : (
                loginLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-950/40">
                    <td className="px-4 py-3 font-mono text-[11px] text-slate-300 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-400" />
                        {new Date(log.timestamp).toLocaleString('ar-SA')}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-white">{log.fullName}</td>
                    <td className="px-4 py-3 font-mono text-amber-300">{log.academicId}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          'px-2 py-0.5 rounded-full text-[10px] font-bold border',
                          log.role === 'admin'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                        )}
                      >
                        {log.role === 'admin' ? 'المشرف العام (Admin)' : 'طالب'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          'px-2.5 py-0.5 rounded-full text-[10px] font-black',
                          log.status === 'success'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : log.status === 'logout'
                            ? 'bg-slate-800 text-slate-300'
                            : 'bg-rose-500/20 text-rose-300'
                        )}
                      >
                        {log.status === 'success'
                          ? 'دخول ناجح ✓'
                          : log.status === 'logout'
                          ? 'تسجيل خروج'
                          : 'محاولة مرفوضة'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-300 text-[11px]">{log.note}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* نافذة تصدير كود الحسابات الفعلي بعد الحذف لنسخه في src/lib/auth.ts قبل الرفع لـ Netlify */}
      {showExportCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md" dir="rtl">
          <div className="w-full max-w-3xl bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-black text-white">
                  كود الحسابات الفعلية المتبقية بعد الحذف ({usersList.length} حساب)
                </h3>
                <p className="text-xs text-slate-400">
                  انسخ هذه المصفوفة واستبدل بها `PREHASHED_ACCOUNTS` في `src/lib/auth.ts` لتثبيت الحذف نهائياً داخل الكود المصدري على GitHub وNetlify.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowExportCodeModal(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <pre
              dir="ltr"
              className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-emerald-300 overflow-x-auto max-h-80 overflow-y-auto"
            >
              {exportedAccountsCode}
            </pre>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(exportedAccountsCode);
                  setStatusMsg('✓ تم نسخ كود PREHASHED_ACCOUNTS المحدث للحافظة.');
                  setShowExportCodeModal(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs cursor-pointer"
              >
                نسخ الكود المحدث للحافظة
              </button>
            </div>
          </div>
        </div>
      )}

      {/* نافذة تعديل كلمة المرور */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" dir="rtl">
          <div className="relative w-full max-w-md bg-slate-900 border border-blue-500/40 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                تغيير الرقم السري لـ {editingUser.fullName}
              </h3>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="w-8 h-8 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePassword} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-200">الرقم السري الجديد:</label>
                  <button
                    type="button"
                    onClick={generateQuickPassword}
                    className="text-[11px] text-emerald-400 font-bold"
                  >
                    توليد تلقائي
                  </button>
                </div>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  placeholder="أدخل كلمة المرور الجديدة"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
                  required
                />
              </div>

              {editPasswordError && (
                <p className="text-xs text-rose-400">{editPasswordError}</p>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={isSubmittingPassword}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer"
                >
                  تأكيد التغيير والمزامنة
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* نافذة إضافة مستخدم جديد وتشفير كلمة مروره ليتمكن من الدخول فوراً */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" role="dialog" aria-modal="true">
          <form
            onSubmit={handleCreateUser}
            className="relative w-full max-w-md glass-panel rounded-3xl p-6 shadow-2xl border border-indigo-500/40 bg-slate-900 space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-400" />
                <span>إضافة وتفعيل حساب مستخدم جديد</span>
              </h2>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

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

      <ImportPasswordsModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onSuccess={(msg) => {
          setUsersList(getUsers());
          setStatusMsg(msg);
        }}
      />
    </div>
  );
}
```
