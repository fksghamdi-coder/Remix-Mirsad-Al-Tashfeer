import React, { useState, useEffect } from 'react';
import { useSupport } from '@/contexts/SupportContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  ShieldAlert,
  Send,
  Lock,
  Clock,
  CheckCircle2,
  MessageSquare,
  CornerDownLeft,
  UserCheck,
  KeyRound,
  FileText,
  XCircle,
  ShieldCheck,
} from 'lucide-react';
import {
  getAdminPasswordResetRequests,
  approvePasswordResetByAdmin,
  rejectPasswordResetByAdmin,
  AdminPasswordResetRequest,
} from '@/lib/auth';

export default function InternalSupport() {
  const { sendTicket, replyToTicket, tickets, isAdmin } = useSupport();
  const { session } = useAuth();

  const [senderName, setSenderName] = useState(session?.fullName || session?.username || '');
  const [message, setMessage] = useState('');
  const [submittedTicketRef, setSubmittedTicketRef] = useState<string | null>(null);

  // حالة الرد للأدمن لكل تذكرة
  const [replyInputs, setReplyInputs] = useState<Record<number, string>>({});
  const [replySuccess, setReplySuccess] = useState<number | null>(null);

  // إدارة طلبات استعادة كلمة المرور للأدمن
  const [resetRequests, setResetRequests] = useState<AdminPasswordResetRequest[]>(() =>
    getAdminPasswordResetRequests()
  );
  const [resetApproving, setResetApproving] = useState<number | null>(null);
  const [resetSuccessMsg, setResetSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const syncReqs = () => setResetRequests(getAdminPasswordResetRequests());
    window.addEventListener('mirsad-reset-requests-updated', syncReqs);
    window.addEventListener('storage', syncReqs);
    return () => {
      window.removeEventListener('mirsad-reset-requests-updated', syncReqs);
      window.removeEventListener('storage', syncReqs);
    };
  }, []);

  const handleApproveReset = async (reqId: number, replyNote?: string) => {
    setResetApproving(reqId);
    await approvePasswordResetByAdmin(reqId, replyNote);
    setResetRequests(getAdminPasswordResetRequests());
    setResetApproving(null);
    setResetSuccessMsg('تم اعتماد وتفعيل كلمة المرور بنجاح للمستخدم، وسيظهر له إشعار فوري!');
    setTimeout(() => setResetSuccessMsg(null), 4000);
  };

  const handleRejectReset = async (reqId: number) => {
    await rejectPasswordResetByAdmin(reqId);
    setResetRequests(getAdminPasswordResetRequests());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) return;

    const created = sendTicket(senderName, message);
    if (created) {
      setSubmittedTicketRef(created.referenceCode);
      setMessage('');
      setTimeout(() => setSubmittedTicketRef(null), 6000);
    }
  };

  const handleAdminReply = (ticketId: number) => {
    const text = replyInputs[ticketId] || '';
    if (!text.trim()) return;

    replyToTicket(ticketId, text);
    setReplyInputs((prev) => ({ ...prev, [ticketId]: '' }));
    setReplySuccess(ticketId);
    setTimeout(() => setReplySuccess(null), 3000);
  };

  const pendingResetRequests = resetRequests.filter((r) => r.status === 'pending');

  return (
    <div className="space-y-6" dir="rtl">
      {/* الترويسة الرئيسية */}
      <div className="glass-panel card-3d-neon p-6 rounded-3xl border border-emerald-500/35 bg-slate-900/90 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl icon-glass-3d flex items-center justify-center text-emerald-400">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  CONFIDENTIAL & INTERNAL ONLY
                </span>
                {isAdmin && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    ADMIN PRIVILEGED VIEW
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-white mt-1">
                نظام الشكاوى والمراسلات الداخلية السري
              </h2>
              <p className="text-xs text-slate-400">
                قناة تواصل مشفرة ومغلقة تماماً ومحكومة بالسرية التامة بين المستخدم وإدارة المنصة
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-slate-300">
              {isAdmin ? `إجمالي الوارد: ${tickets.length}` : `تذاكري المسجلة: ${tickets.length}`}
            </span>
          </div>
        </div>

        {/* نموذج رفع الشكوى / الرسالة (يطلب فقط اسم المرسل ومحتوى الرسالة) */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>اسم المرسل:</span>
              </label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="أدخل اسمك الكريم أو المعرف"
                className="w-full bg-slate-950/90 border border-emerald-500/35 hover:border-emerald-400/70 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 outline-none transition-all shadow-[inset_0_1px_2px_rgba(255,255,255,0.14)]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>محتوى الرسالة أو الشكوى:</span>
              </label>
              <textarea
                rows={2}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب تفاصيل الشكوى، الملاحظة، أو الاستفسار السري هنا..."
                className="w-full bg-slate-950/90 border border-emerald-500/35 hover:border-emerald-400/70 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-2 text-xs text-slate-100 placeholder:text-slate-500 outline-none transition-all resize-none shadow-[inset_0_1px_2px_rgba(255,255,255,0.14)]"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                تخضع الرسائل لعزل أمني صارم ولا يمكن لأي مستخدم آخر الاطلاع على شكواك أو بياناتك.
              </span>
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 btn-3d-neon btn-3d-neon-active text-emerald-200 hover:text-white font-black text-xs rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>إرسال الشكوى للأدمن</span>
            </button>
          </div>

          {submittedTicketRef && (
            <div className="p-3.5 rounded-2xl card-3d-neon bg-emerald-500/10 border border-emerald-500/35 text-xs text-emerald-300 flex items-center justify-between gap-3 mt-3 animate-fadeIn">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  تم إرسال شكواك بنجاح وسريّة تامة. الرمز المرجعي الخاص بك:{' '}
                  <strong className="font-mono text-white underline">{submittedTicketRef}</strong>
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">حالة الطلب: قيد الانتظار</span>
            </div>
          )}
        </form>
      </div>

      {/* قسم اعتمادات طلبات استعادة كلمة المرور المشفرة (خاص بالأدمن) */}
      {isAdmin && (
        <div className="glass-panel card-3d-neon p-6 rounded-3xl border border-amber-500/40 bg-slate-950/95 space-y-4 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>طلبات تفويض استعادة كلمة المرور باعتماد الأدمن (HMAC-SHA256)</span>
                  {pendingResetRequests.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black">
                      {pendingResetRequests.length} معلق
                    </span>
                  )}
                </h3>
                <p className="text-[11px] text-slate-400">
                  إصدار تصريح تشفيري موقّع بـ HMAC-SHA256 لفتح خانة تعيين كلمة المرور للمستخدم لمرة واحدة فقط
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-400">
              إجمالي الطلبات: {resetRequests.length}
            </span>
          </div>

          {resetSuccessMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{resetSuccessMsg}</span>
            </div>
          )}

          {resetRequests.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              لا توجد أي طلبات استعادة كلمة مرور مسجلة حالياً.
            </div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {resetRequests.map((req) => (
                <div
                  key={req.id}
                  className={`p-4 rounded-2xl border transition-all space-y-3 ${
                    req.status === 'pending'
                      ? 'bg-slate-900/90 border-amber-500/40 shadow-lg shadow-amber-500/5'
                      : req.status === 'authorized' || req.status === 'completed'
                      ? 'bg-slate-900/60 border-emerald-500/30 opacity-95'
                      : 'bg-slate-900/40 border-rose-500/20 opacity-70'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-400 bg-slate-950 px-2.5 py-0.5 rounded-lg border border-slate-800">
                        {req.referenceCode}
                      </span>
                      <span className="text-xs font-bold text-white flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                        <span>{req.senderName}</span>
                      </span>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                        الرقم الأكاديمي: {req.academicId}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {new Date(req.requestedAt).toLocaleDateString('ar-SA', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 text-[10px] font-mono font-bold rounded-lg border ${
                          req.status === 'authorized' || req.status === 'completed'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : req.status === 'rejected'
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                            : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        }`}
                      >
                        {req.status === 'completed'
                          ? 'مكتمل (تم تعيين كلمة المرور)'
                          : req.status === 'authorized'
                          ? 'مفوّض بتوقيع HMAC-SHA256'
                          : req.status === 'rejected'
                          ? 'مرفوض'
                          : 'بانتظار تصريح الأدمن'}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-300 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 space-y-1">
                    <div>
                      <span className="text-slate-500 font-bold">سبب الطلب:</span>{' '}
                      <span>{req.reasonNote}</span>
                    </div>
                    {req.adminGrantSignature && (
                      <div className="text-[11px] font-mono text-emerald-400/90 flex items-center gap-1.5 pt-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>تصريح HMAC-SHA256 نشط: {req.adminGrantSignature.slice(0, 32)}...</span>
                      </div>
                    )}
                  </div>

                  {(req.status === 'authorized' || req.status === 'completed') && req.adminReply && (
                    <div className="text-xs text-emerald-300 bg-emerald-950/20 p-2.5 rounded-xl border border-emerald-500/30">
                      <span className="font-bold">رد الأدمن المعتمد:</span> {req.adminReply}
                    </div>
                  )}

                  {req.status === 'pending' && (
                    <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleRejectReset(req.id)}
                        className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/50 hover:text-rose-400 text-slate-400 border border-slate-700 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>رفض الطلب</span>
                      </button>
                      <button
                        type="button"
                        disabled={resetApproving === req.id}
                        onClick={() =>
                          handleApproveReset(
                            req.id,
                            'تم التحقق من هويتك وإصدار تصريح الأدمن التشفيري (HMAC-SHA256) لفتح خانة تعيين كلمة المرور الجديدة.'
                          )
                        }
                        className="px-4 py-2 rounded-xl bg-gradient-to-l from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs transition flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 cursor-pointer disabled:opacity-50"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>
                          {resetApproving === req.id
                            ? 'جاري توقيع التصريح التشفيري...'
                            : 'اعتماد وإصدار تصريح (HMAC-SHA256) للمستخدم'}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* سجل الشكاوى والرسائل مع العزل التام */}
      <div className="glass-panel card-3d-neon p-6 rounded-3xl border border-emerald-500/35 bg-slate-950 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>{isAdmin ? 'سجل كافة الشكاوى الواردة للأدمن' : 'سجل شكاوي ومراسلاتي الخاصة'}</span>
          </h3>
          <span className="text-xs text-slate-500">
            {isAdmin ? 'صلاحيات الإشراف: يمكنك الرد المباشر' : 'تظهر رسائلك السرية وردود الإدارة عليها فقط'}
          </span>
        </div>

        {tickets.length === 0 ? (
          <div className="py-10 text-center space-y-2">
            <Lock className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400">
              {isAdmin
                ? 'لا توجد شكاوى أو مراسلات واردة حالياً.'
                : 'لم تقم بإرسال أي شكوى بعد. رسائلك هنا ستبقى سرية ومخصصة لك فقط.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3.5 max-h-[600px] overflow-y-auto pr-1">
            {tickets.map((t) => {
              const isReplied = t.status === 'replied';

              return (
                <div
                  key={t.id}
                  className="p-4 rounded-2xl card-3d-neon bg-slate-900/90 border border-emerald-500/30 transition-all space-y-3"
                >
                  {/* رأس بطاقة التذكرة */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/60 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-400 bg-slate-950 px-2.5 py-0.5 rounded-lg border border-slate-800">
                        {t.referenceCode}
                      </span>
                      <span className="text-xs font-bold text-white flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                        <span>{t.senderName}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {new Date(t.timestamp).toLocaleDateString('ar-SA', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 text-[10px] font-mono font-bold rounded-lg border ${
                          isReplied
                            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        {isReplied ? 'تم الرد' : 'قيد الانتظار'}
                      </span>
                    </div>
                  </div>

                  {/* نص الشكوى */}
                  <p className="text-xs text-slate-200 leading-relaxed font-normal bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                    {t.message}
                  </p>

                  {/* رد الأدمن إذا وجد */}
                  {t.adminReply && (
                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-emerald-400 font-bold">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>رد إدارة المنصة (الأدمن):</span>
                        </span>
                        {t.repliedAt && (
                          <span className="text-[10px] text-slate-400 font-mono">
                            {new Date(t.repliedAt).toLocaleDateString('ar-SA', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-100 leading-relaxed font-medium">
                        {t.adminReply}
                      </p>
                    </div>
                  )}

                  {/* منطقة رد الأدمن المباشر (تظهر لحساب الأدمن فقط) */}
                  {isAdmin && (
                    <div className="pt-2 border-t border-slate-800/60 space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={replyInputs[t.id] || ''}
                          onChange={(e) =>
                            setReplyInputs((prev) => ({ ...prev, [t.id]: e.target.value }))
                          }
                          placeholder="اكتب رد الأدمن المباشر للمرسل..."
                          className="flex-1 bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl px-3 py-1.5 text-xs text-white placeholder:text-slate-500 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleAdminReply(t.id)}
                          className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shrink-0 cursor-pointer"
                        >
                          <CornerDownLeft className="w-3.5 h-3.5" />
                          <span>إرسال الرد للمرسل</span>
                        </button>
                      </div>
                      {replySuccess === t.id && (
                        <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>تم إرسال الرد وتحديث حالة الشكوى بنجاح.</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export { InternalSupport };
