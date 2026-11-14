import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, ShieldAlert, Lock } from 'lucide-react';
import { changePassword } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';

export default function ChangePassword() {
  const [current, setCurrent] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { refresh } = useAuth();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (newPwd !== confirm) return setError('كلمتا المرور غير متطابقتين');
    setLoading(true);
    const res = await changePassword(current, newPwd);
    setLoading(false);
    if (res.success) {
      refresh();
      navigate('/congratulations');
    } else setError(res.error || 'خطأ');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950">
      <div className="glass-panel p-8 rounded-3xl w-full max-w-md border-yellow-500/40">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center">
            <KeyRound className="w-8 h-8 text-yellow-400" />
          </div>
          <h1 className="text-2xl font-bold">تغيير كلمة المرور</h1>
          <p className="text-slate-400 text-sm mt-2 flex items-center justify-center gap-1">
            <ShieldAlert className="w-4 h-4 text-yellow-400" /> إجباري قبل استخدام النظام
          </p>
        </div>
        {error && (
          <div className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-4 text-sm">{error}</div>
        )}
        <form onSubmit={submit} className="space-y-3">
          <div className="relative">
            <Lock className="absolute right-3 top-3.5 w-5 h-5 text-slate-500" />
            <input
              type="password"
              placeholder="كلمة المرور الحالية"
              value={current}
              onChange={e => setCurrent(e.target.value)}
              className="input-field pr-10"
              required
            />
          </div>
          <input
            type="password"
            placeholder="كلمة المرور الجديدة (8 أحرف+)"
            value={newPwd}
            onChange={e => setNewPwd(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="تأكيد كلمة المرور الجديدة"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            className="input-field"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 rounded-xl transition-all disabled:opacity-50"
          >
            {loading ? 'جاري الحفظ...' : 'حفظ وتفعيل'}
          </button>
        </form>
      </div>
    </div>
  );
}
