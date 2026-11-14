// src/pages/Recovery.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  KeyRound,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Send,
  Search,
  AlertTriangle,
  RefreshCw,
  Lock,
  Fingerprint,
  Eye,
  EyeOff,
} from 'lucide-react';
import {
  submitAdminPasswordResetRequest,
  checkMyPasswordResetStatus,
  completeAuthorizedPasswordReset,
} from '@/lib/auth';
import { useSupport } from '@/contexts/SupportContext';

type TabMode = 'request' | 'status';

export default function Recovery() {
  const [activeTab, setActiveTab] = useState<TabMode>('request');

  // التبويب الأول: حقول طلب التفويض فقط (بدون أي حقول لكلمة المرور قبل اعتماد الأدمن)
  const [usernameOrAcademicId, setUsernameOrAcademicId] = useState('');
  const [senderName, setSenderName] = useState('');
  const [secretPin, setSecretPin] = useState('');
  const [reasonNote, setReasonNote] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // التبويب الثاني: حقول التحقق من اعتماد الأدمن وتعيين كلمة المرور بعد التفويض
  const [lookupId, setLookupId] = useState('');
  const [lookupPin, setLookupPin] = useState('');
  const [statusError, setStatusError] = useState('');
  const [trackedRequest, setTrackedRequest] = useState<{
    referenceCode: string;
    username: string;
    academicId: string;
    senderName: string;
    status: 'pending' | 'authorized' | 'completed' | 'rejected';
    adminGrantSignature?: string;
    adminReply?: string;
    requestedAt: string;
    authorizedAt?: string;
    resolvedAt?: string;
  } | null>(null);

  // حقول تعيين كلمة المرور الجديدة (لا تفتح ولا تظهر إلا بعد صدور تصريح الأدمن الموقّع HMAC-SHA256)
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [resetError, setResetError] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);
  const [resetSuccessMessage, setResetSuccessMessage] = useState('');

  const navigate = useNavigate();
  const { sendTicket } = useSupport();

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await submitAdminPasswordResetRequest({
      usernameOrAcademicId,
      senderName,
      secretPin,
      reasonNote,
    });
    setLoading(false);

    if (!res.success || !res.request) {
      setError(res.error || 'تعذر إرسال طلب التفويض للأدمن');
      return;
    }

    // إرسال إشعار تذكرة داخلية سرية للأدمن لإصدار تصريح الاستعادة
    sendTicket(
      senderName.trim(),
      `[طلب تفويض استعادة كلمة مرور - مرجع ${res.referenceCode}] — الرقم الأكاديمي: (${usernameOrAcademicId.trim()}) — السبب: ${
        reasonNote.trim() || 'يرجى اعتماد الطلب وإصدار تصريح HMAC-SHA256 لتمكيني من تعيين كلمة مرور جديدة.'
      }`
    );

    // الانتقال الفوري للتبويب الثاني لمتابعة صدور تصريح الأدمن التشفيري
    setLookupId(res.referenceCode || usernameOrAcademicId.trim());
    setLookupPin(secretPin.trim());
    setTrackedRequest({
      referenceCode: res.request.referenceCode,
      username: res.request.username,
      academicId: res.request.academicId,
      senderName: res.request.senderName,
      status: res.request.status,
      requestedAt: res.request.requestedAt,
    });
    setActiveTab('status');
  };

  const handleCheckStatus = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setStatusError('');
    setResetError('');
    if (!lookupId.trim() || !lookupPin.trim()) return;

    const res = await checkMyPasswordResetStatus(lookupId, lookupPin);
    if (!res.found || !res.request) {
      setStatusError(res.error || 'لم يتم العثور على طلب مطابق');
      setTrackedRequest(null);
    } else {
      setTrackedRequest(res.request);
    }
  };

  const handleCompleteAuthorizedReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');
    setResetSuccessMessage('');

    if (!trackedRequest || trackedRequest.status !== 'authorized') {
      setResetError('لا يمكن تعيين كلمة المرور قبل صدور تصريح الأدمن الموقّع بـ HMAC-SHA256');
      return;
    }

    if (newPassword !== confirmPassword) {
      setResetError('كلمتا المرور غير متطابقتين');
      return;
    }

    setSavingPassword(true);
    const res = await completeAuthorizedPasswordReset({
      identifier: lookupId.trim() || trackedRequest.referenceCode,
      secretPin: lookupPin.trim(),
      newPassword,
    });
    setSavingPassword(false);

    if (!res.success) {
      setResetError(res.error || 'تعذر حفظ كلمة المرور الجديدة');
      return;
    }

    setNewPassword('');
    setConfirmPassword('');
    setResetSuccessMessage(
      'تم التحقق من توقيع الأدمن (HMAC-SHA256) وتشفير كلمة المرور الجديدة عبر PBKDF2-SHA256 وحفظها بنجاح!'
    );

    // تحديث الحالة المعروضة إلى مكتمل (completed) بعد إتلاف التصريح ذي الاستخدام الواحد
    const updatedStatus = await checkMyPasswordResetStatus(
      lookupId.trim() || trackedRequest.referenceCode,
      lookupPin.trim()
    );
    if (updatedStatus.found && updatedStatus.request) {
      setTrackedRequest(updatedStatus.request);
    }
  };

  // استماع لحظي كل 3 ثوانٍ وعند تغير التخزين لفتح خانة كلمة المرور فور اعتماد الأدمن
  useEffect(() => {
    if (activeTab !== 'status' || !lookupId.trim() || !lookupPin.trim()) return;

    const refreshStatus = () => {
      checkMyPasswordResetStatus(lookupId, lookupPin).then((res) => {
        if (res.found && res.request) {
          setTrackedRequest(res.request);
        }
      });
    };

    const interval = setInterval(refreshStatus, 3000);
    window.addEventListener('storage', refreshStatus);
    window.addEventListener('mirsad-reset-requests-updated', refreshStatus);
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', refreshStatus);
      window.removeEventListener('mirsad-reset-requests-updated', refreshStatus);
    };
  }, [activeTab, lookupId, lookupPin]);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-950"
      dir="rtl"
    >
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="glass-panel p-7 md:p-9 rounded-3xl w-full max-w-lg relative z-10 border border-slate-800 shadow-2xl space-y-5">
        {/* الترويسة */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-500 to-emerald-600 flex items-center justify-center shadow-lg">
            <KeyRound className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            بروتوكول استعادة كلمة المرور المشفر
          </h1>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300 font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>طلب تفويض أولاً ← تصريح الأدمن (HMAC-SHA256) ← تعيين كلمة المرور</span>
          </div>
        </div>

        {/* التبويبان */}
        <div className="flex gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('request')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'request'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            1. إرسال طلب استعادة للأدمن
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('status')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'status'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            2. التحقق من الاعتماد وتعيين كلمة المرور
          </button>
        </div>

        {/* التبويب الأول: طلب تفويض استعادة للأدمن (بدون أي حقول لكلمة المرور الجديدة) */}
        {activeTab === 'request' && (
          <form onSubmit={handleSubmitRequest} className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              وفق التسلسل التشفيري الآمن لمنصة مِرْصَاد، يُرسل أولاً طلب تفويض إلى الأدمن. وتظل خانة كتابة كلمة المرور الجديدة مغلقة تماماً حتى يعتمد الأدمن طلبك ويصدر تصريحاً موقّعاً بـ{' '}
              <span className="font-mono text-emerald-400">HMAC-SHA256</span>.
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-400 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  الرقم الأكاديمي أو اسم المستخدم:
                </label>
                <input
                  type="text"
                  required
                  value={usernameOrAcademicId}
                  onChange={(e) => setUsernameOrAcademicId(e.target.value)}
                  placeholder="(الرقم الأكاديمي)"
                  className="input-field text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  اسم المرسل الكامل:
                </label>
                <input
                  type="text"
                  required
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="أدخل اسمك الثلاثي الكامل..."
                  className="input-field text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-300 mb-1.5">
                رمز التحقق الشخصي السري (PIN من 4 إلى 6 أرقام):
              </label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={6}
                required
                value={secretPin}
                onChange={(e) => setSecretPin(e.target.value.replace(/\D/g, ''))}
                placeholder="أدخل من 4 إلى 6 أرقام تحفظها لمتابعة الطلب وتعيين كلمة المرور لاحقاً"
                className="input-field text-sm text-right"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                يُجزّأ هذا الرمز بـ SHA-256 ويُستخدم للتحقق من هويتك عند فتح خانة كلمة المرور بعد اعتماد الأدمن.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                سبب الطلب الموجه للأدمن:
              </label>
              <input
                type="text"
                value={reasonNote}
                onChange={(e) => setReasonNote(e.target.value)}
                placeholder="مثال: نسيت كلمة المرور وأرجو إصدار تصريح لتعيين كلمة مرور جديدة..."
                className="input-field text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-60"
            >
              <Send className="w-4 h-4" />
              <span>
                {loading
                  ? 'جاري توثيق الطلب وإرساله للأدمن...'
                  : 'إرسال طلب التفويض إلى الأدمن'}
              </span>
            </button>
          </form>
        )}

        {/* التبويب الثاني: التحقق من اعتماد الأدمن وتعيين كلمة المرور الجديدة */}
        {activeTab === 'status' && (
          <div className="space-y-4">
            <form onSubmit={handleCheckStatus} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    الرقم الأكاديمي أو رقم المرجع:
                  </label>
                  <input
                    type="text"
                    required
                    value={lookupId}
                    onChange={(e) => setLookupId(e.target.value)}
                    placeholder="(الرقم الأكاديمي) أو رقم المرجع"
                    className="input-field text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    رمز التحقق الشخصي السري (PIN):
                  </label>
                  <input
                    type="password"
                    inputMode="numeric"
                    maxLength={6}
                    required
                    value={lookupPin}
                    onChange={(e) => setLookupPin(e.target.value.replace(/\D/g, ''))}
                    placeholder="أدخل رمز الـ PIN السري (4-6 أرقام)"
                    className="input-field text-xs text-right"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>فحص حالة تصريح الأدمن الآن</span>
              </button>
            </form>

            {statusError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                {statusError}
              </div>
            )}

            {trackedRequest && (
              <div className="p-5 rounded-2xl bg-slate-900/95 border border-slate-800 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <div className="text-xs text-slate-400">
                      المرسل: <strong className="text-white">{trackedRequest.senderName}</strong> ({trackedRequest.username})
                    </div>
                    <div className="text-[11px] font-mono text-amber-400 mt-0.5">
                      رقم المرجع: {trackedRequest.referenceCode}
                    </div>
                  </div>

                  {trackedRequest.status === 'authorized' ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>مفوّض بتوقيع الأدمن (مفتوح للتعيين)</span>
                    </span>
                  ) : trackedRequest.status === 'completed' ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>تم تحديث كلمة المرور بنجاح</span>
                    </span>
                  ) : trackedRequest.status === 'rejected' ? (
                    <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold">
                      مرفوض من الأدمن
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5">
                      <Clock className="w-4 h-4 animate-spin" />
                      <span>بانتظار تصريح الأدمن...</span>
                    </span>
                  )}
                </div>

                {/* الحالة 1: الطلب معلق (pending) — حقول كلمة المرور مغلقة تشفيرياً ولا تظهر */}
                {trackedRequest.status === 'pending' && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-2">
                    <div className="font-bold flex items-center gap-1.5 text-amber-300">
                      <Lock className="w-4 h-4 shrink-0" />
                      <span>حقول كلمة المرور الجديدة مغلقة تشفيرياً حتى يصدر تصريح الأدمن:</span>
                    </div>
                    <p className="leading-relaxed text-slate-300">
                      لا يمكن كتابة أو تعيين كلمة مرور جديدة في هذه المرحلة. بمجرد مراجعة الأدمن لطلبك وإصدار التصريح التشفيري الموقّع بـ{' '}
                      <span className="font-mono text-amber-300">HMAC-SHA256</span>، ستُفتح لك خانة إدخال كلمة المرور الجديدة هنا تلقائياً.
                    </p>
                    <div className="pt-1 flex items-center gap-1.5 text-[11px] text-amber-400/90">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>يتم الاستماع لتصريح الأدمن وتحديث الحالة تلقائياً كل 3 ثوانٍ...</span>
                    </div>
                  </div>
                )}

                {/* الحالة 2: صدور تصريح الأدمن (authorized) — عرض شارة HMAC-SHA256 وفتح حقول كلمة المرور الجديدة */}
                {trackedRequest.status === 'authorized' && (
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-extrabold text-emerald-300 flex items-center gap-1.5">
                          <Fingerprint className="w-4 h-4 text-emerald-400" />
                          <span>تم التحقق من تصريح الأدمن لفتح خانة كلمة المرور</span>
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-slate-950 border border-emerald-500/40 text-[10px] font-mono font-bold text-emerald-400">
                          HMAC-SHA256 GRANT
                        </span>
                      </div>
                      {trackedRequest.adminGrantSignature && (
                        <div className="text-[10px] font-mono text-slate-400 bg-slate-950/80 px-2.5 py-1.5 rounded-lg border border-slate-800 truncate">
                          SIG: {trackedRequest.adminGrantSignature}
                        </div>
                      )}
                      {trackedRequest.adminReply && (
                        <p className="text-xs text-slate-200 pt-1">
                          <strong className="text-emerald-400">رسالة الأدمن:</strong> {trackedRequest.adminReply}
                        </p>
                      )}
                    </div>

                    {resetError && (
                      <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-400 text-xs flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{resetError}</span>
                      </div>
                    )}

                    <form onSubmit={handleCompleteAuthorizedReset} className="space-y-3 pt-1">
                      <div>
                        <label className="block text-xs font-bold text-emerald-300 mb-1.5">
                          كلمة المرور الجديدة:
                        </label>
                        <div className="flex items-center w-full h-11 rounded-xl bg-slate-950 border border-slate-700 focus-within:border-emerald-500 px-3">
                          <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="أدخل كلمة المرور الجديدة (8 أحرف فأكثر)"
                            className="flex-1 h-full bg-transparent px-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword((v) => !v)}
                            className="p-1 text-slate-400 hover:text-emerald-400 cursor-pointer"
                            title={showNewPassword ? 'إخفاء' : 'إظهار'}
                          >
                            {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-emerald-300 mb-1.5">
                          تأكيد كلمة المرور الجديدة:
                        </label>
                        <div className="flex items-center w-full h-11 rounded-xl bg-slate-950 border border-slate-700 focus-within:border-emerald-500 px-3">
                          <Lock className="w-4 h-4 text-slate-400 shrink-0" />
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="أعد كتابة كلمة المرور الجديدة للتأكيد"
                            className="flex-1 h-full bg-transparent px-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={savingPassword}
                        className="w-full py-3 rounded-xl bg-gradient-to-l from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>
                          {savingPassword
                            ? 'جاري التحقق من توقيع الأدمن وتشفير كلمة المرور...'
                            : 'تشفير وحفظ كلمة المرور الجديدة المعتمدة الآن'}
                        </span>
                      </button>
                    </form>
                  </div>
                )}

                {/* الحالة 3: اكتمال تعيين كلمة المرور بنجاح (completed) */}
                {trackedRequest.status === 'completed' && (
                  <div className="p-4 rounded-xl bg-emerald-500/15 border-2 border-emerald-500/50 text-xs text-emerald-100 space-y-3">
                    <div className="font-extrabold text-sm text-emerald-300 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span>تم تشفير وحفظ كلمة المرور الجديدة الخاصة بك بنجاح!</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed">
                      {resetSuccessMessage ||
                        'تم التحقق من تصريح الأدمن (HMAC-SHA256)، وتجزئة كلمة المرور الجديدة عبر PBKDF2-SHA256 (600,000 تكرار)، وإتلاف التصريح لضمان استخدامه لمرة واحدة فقط.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate('/login')}
                      className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg cursor-pointer"
                    >
                      الانتقال لتسجيل الدخول بكلمة المرور الجديدة الآن
                    </button>
                  </div>
                )}

                {/* الحالة 4: الطلب مرفوض (rejected) */}
                {trackedRequest.status === 'rejected' && (
                  <div className="p-4 rounded-xl bg-rose-500/15 border border-rose-500/40 text-xs text-rose-200 space-y-2">
                    <div className="font-bold text-rose-300">تم رفض هذا الطلب من إدارة المنصة:</div>
                    <p className="text-slate-300">
                      {trackedRequest.adminReply || 'يرجى مراجعة إدارة المنصة عبر نظام الدعم الداخلي بالبيانات الصحيحة.'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="pt-2 border-t border-slate-800/80 text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white font-bold"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة لصفحة تسجيل الدخول</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
