import React, { useCallback, useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Award, RefreshCw, ShieldAlert, Copy, Ban } from 'lucide-react';
import { db, auth } from '@/lib/firebase';
import { AdminNav } from '@/components/admin/AdminNav';
import {
  CertificateRecord,
  issueCertificate,
  listAllCertificates,
  revokeCertificate,
} from '@/lib/certificates';

interface StudentOption {
  uid: string;
  name: string;
}

export default function AdminCertificates() {
  const [students, setStudents] = useState<StudentOption[]>([]);
  const [certs, setCerts] = useState<CertificateRecord[]>([]);
  const [uid, setUid] = useState('');
  const [name, setName] = useState('');
  const [score, setScore] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const signedIn = !!auth.currentUser;

  const load = useCallback(async () => {
    if (!auth.currentUser) return;
    try {
      // قاعدة users تشترط قيد role في الاستعلام ليُقبل list
      const us = await getDocs(query(collection(db, 'users'), where('role', 'in', ['admin', 'user'])));
      setStudents(
        us.docs
          .map((d) => d.data() as { uid: string; displayName?: string; username?: string })
          .map((u) => ({ uid: u.uid, name: u.displayName || u.username || u.uid }))
      );
      setCerts(await listAllCertificates());
    } catch (e) {
      setMsg({ ok: false, text: 'تعذّر تحميل البيانات: ' + ((e as Error).message || '') });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const onPick = (v: string) => {
    setUid(v);
    const s = students.find((x) => x.uid === v);
    if (s) setName(s.name);
  };

  const onIssue = async () => {
    setMsg(null);
    const me = auth.currentUser;
    if (!me) return setMsg({ ok: false, text: 'سجّل الدخول بحساب Google الخاص بالمشرف أولاً' });
    setBusy(true);
    const r = await issueCertificate({ uid, studentName: name, scorePercentage: Number(score), issuedBy: me.uid });
    setBusy(false);
    if (r.success) {
      setMsg({ ok: true, text: `تم الإصدار: ${r.certId}` });
      setScore('');
      load();
    } else setMsg({ ok: false, text: ('error' in r && r.error) || 'تعذّر إصدار الشهادة' });
  };

  const onRevoke = async (c: CertificateRecord) => {
    const reason = window.prompt(`سبب إلغاء ${c.certId}:`);
    if (!reason) return;
    const r = await revokeCertificate(c.certId, reason);
    setMsg(r.success ? { ok: true, text: 'تم الإلغاء' } : { ok: false, text: r.error || 'تعذّر الإلغاء' });
    load();
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6">
      <AdminNav />

      <div className="flex items-center justify-between">
        <h1 className="text-xl font-black text-white flex items-center gap-2">
          <Award className="w-6 h-6 text-amber-400" /> إدارة الشهادات
        </h1>
        <button onClick={load} className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300" title="تحديث">
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {!signedIn && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          إصدار الشهادات يتطلب تسجيل الدخول بحساب Google للمشرف؛ الحسابات المحلية لا تملك صلاحية كتابة في السجل الرسمي.
        </div>
      )}

      {msg && (
        <div className={`p-3 rounded-xl text-sm border ${msg.ok ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border-red-500/30 text-red-300'}`}>
          {msg.text}
        </div>
      )}

      <div className="glass-panel p-5 rounded-2xl space-y-3">
        <h2 className="text-sm font-bold text-slate-200">إصدار شهادة جديدة</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <select className="input-field" value={uid} onChange={(e) => onPick(e.target.value)}>
            <option value="">اختر الطالب...</option>
            {students.map((s) => (
              <option key={s.uid} value={s.uid}>
                {s.name}
              </option>
            ))}
          </select>
          <input className="input-field" placeholder="الاسم على الشهادة" value={name} onChange={(e) => setName(e.target.value)} />
          <input
            className="input-field"
            placeholder="الدرجة % (0–100)"
            inputMode="decimal"
            value={score}
            onChange={(e) => setScore(e.target.value)}
          />
        </div>
        <p className="text-[11px] text-slate-500">
          أنت المسؤول عن صحة الدرجة: يتحقق السجل من وجود الشهادة وسلامتها لا من صحة نتائج الاختبارات. راجع إنجاز الطالب قبل الإصدار.
        </p>
        <button onClick={onIssue} disabled={busy || !signedIn || !uid || !name || !score} className="btn-primary disabled:opacity-50">
          {busy ? 'جاري الإصدار...' : 'إصدار الشهادة'}
        </button>
      </div>

      <div className="glass-panel rounded-2xl overflow-x-auto">
        <table className="w-full text-xs text-right">
          <thead className="bg-slate-900 text-slate-400">
            <tr>
              <th className="px-4 py-3">رقم الشهادة</th>
              <th className="px-4 py-3">الطالب</th>
              <th className="px-4 py-3">الدرجة</th>
              <th className="px-4 py-3">الحالة</th>
              <th className="px-4 py-3">إجراء</th>
            </tr>
          </thead>
          <tbody>
            {certs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-500">
                  لا توجد شهادات صادرة بعد
                </td>
              </tr>
            )}
            {certs.map((c) => (
              <tr key={c.certId} className="border-t border-slate-800">
                <td className="px-4 py-3 font-mono text-amber-300" dir="ltr">
                  {c.certId}
                </td>
                <td className="px-4 py-3 text-slate-200">{c.studentName}</td>
                <td className="px-4 py-3 text-slate-300">{c.scorePercentage.toFixed(1)}%</td>
                <td className="px-4 py-3">
                  {c.status === 'valid' ? (
                    <span className="text-emerald-400">سارية</span>
                  ) : (
                    <span className="text-red-400" title={c.revokeReason}>
                      ملغاة
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(`${window.location.origin}/verify/${c.certId}`)}
                    className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300"
                    title="نسخ رابط التحقق"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  {c.status === 'valid' && (
                    <button onClick={() => onRevoke(c)} className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300" title="إلغاء">
                      <Ban className="w-3.5 h-3.5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
