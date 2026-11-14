# المرحلة الثامنة (الجزء 5 المستقل): الكود الكامل لصفحة الإعدادات وتبويبات الحساب
**المسار في المشروع:** `src/pages/Settings.tsx`

انسخ الكود التالي بالكامل واستبدل به محتوى ملف `src/pages/Settings.tsx`:

```tsx
// File: src/pages/Settings.tsx
import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Lock,
  Phone,
  AlertTriangle,
  Save,
  Award,
  Sparkles,
  CheckCircle2,
  Clock,
  MapPin,
  RotateCcw,
  HardDrive,
} from 'lucide-react';
import { changePassword, updateUserPhone, getUsers, StoredUser } from '@/lib/auth';
import { getSavedCards, saveCard } from '@/lib/cards';
import { findTeamMember, GENERAL_MOTIVATION } from '@/data/students';
import { useAuth } from '@/contexts/AuthContext';
import { usePrayerSettings } from '@/contexts/PrayerSettingsContext';
import Tabs from '@/components/ui/Tabs';
import CongratulationCard from '@/components/ui/CongratulationCard';
import PrayerTimesWidget from '@/components/ui/PrayerTimesWidget';
import BackupPanel from '@/components/ui/BackupPanel';

export default function Settings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { session, isGuest, refresh } = useAuth();
  const [, setTick] = useState(0);

  const isAdmin = session?.role === 'admin';

  // تفعيل جميع تبويبات الحساب للطلاب المسجلين مع إبقاء النسخ الاحتياطي المشفر حصرياً للأدمن
  const availableTabs = useMemo(() => {
    if (isAdmin) {
      return [
        { id: 'backup', label: 'النسخ الاحتياطي المشفر (Admin)', icon: HardDrive, color: 'from-cyan-600 to-blue-500' },
        { id: 'password', label: 'تغيير كلمة مرور المشرف', icon: Lock, color: 'from-purple-600 to-purple-500' },
        { id: 'info', label: 'معلومات المشرف العام', icon: User, color: 'from-blue-600 to-blue-500' },
        { id: 'prayer', label: 'مواقيت الصلاة', icon: Clock, color: 'from-emerald-600 to-teal-500' },
      ];
    }
    if (isGuest) {
      return [
        { id: 'prayer', label: 'مواقيت الصلاة', icon: Clock, color: 'from-emerald-600 to-teal-500' },
        { id: 'info', label: 'معلومات الزائر', icon: User, color: 'from-blue-600 to-blue-500' },
      ];
    }
    return [
      { id: 'info', label: 'معلوماتي الأكاديمية', icon: User, color: 'from-blue-600 to-blue-500' },
      { id: 'password', label: 'تغيير كلمة المرور', icon: Lock, color: 'from-purple-600 to-purple-500' },
      { id: 'phone', label: 'رقم الجوال', icon: Phone, color: 'from-emerald-600 to-emerald-500' },
      { id: 'cards', label: 'بطاقاتي وإنجازاتي', icon: Award, color: 'from-amber-600 to-orange-500' },
      { id: 'prayer', label: 'مواقيت الصلاة', icon: Clock, color: 'from-emerald-600 to-teal-500' },
    ];
  }, [isAdmin, isGuest]);

  const queryTab = searchParams.get('tab');

  const [tab, setTab] = useState<string>(() => {
    if (queryTab && availableTabs.some((t) => t.id === queryTab)) {
      return queryTab;
    }
    return isAdmin ? 'backup' : isGuest ? 'prayer' : 'info';
  });

  useEffect(() => {
    if (queryTab && availableTabs.some((t) => t.id === queryTab)) {
      setTab(queryTab);
    }
  }, [queryTab, availableTabs]);

  const handleTabChange = (newTab: string) => {
    setTab(newTab);
    setSearchParams({ tab: newTab });
  };

  const allUsers = getUsers();
  const registeredUser =
    allUsers.find((u) => u.username.toLowerCase() === (session?.username || '').toLowerCase()) ||
    (session?.role === 'admin' ? allUsers.find((u) => u.username === 'admin') : undefined);
  const user: StoredUser = registeredUser || {
    academicId: session?.username || 'GUEST',
    fullName: session?.displayName || 'زائر المنصة الكريم',
    username: session?.username || 'guest',
    role: 'user',
    phone: '',
    passwordHash: '',
    passwordSalt: '',
    needs_password_change: false,
    isDefaultPassword: false,
    created_at: Date.now(),
  };

  const handleUpdated = () => {
    refresh();
    setTick((t) => t + 1);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12" dir="rtl">
      <header>
        <h1 className="text-3xl md:text-4xl font-black gradient-text mb-2">الإعدادات وإدارة الحساب</h1>
        <p className="text-slate-400">
          {isGuest
            ? 'تخصيص مواقيت الصلاة والتفضيلات العامة للزائر'
            : 'إدارة حسابك الأكاديمي وكلمة المرور ورقم الجوال ومواقيت الصلاة وبطاقاتك التقديرية'}
        </p>
      </header>

      {user.isDefaultPassword && !isGuest && (
        <div className="bg-amber-500/10 border border-amber-500/40 text-amber-300 p-4 rounded-xl flex items-start gap-2">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-bold mb-1">أنت تستخدم كلمة المرور الافتراضية!</p>
            <p className="text-amber-400/80">
              يُنصح بشدة بتغييرها الآن من تبويب «تغيير كلمة المرور»
            </p>
          </div>
        </div>
      )}

      <Tabs tabs={availableTabs} active={tab} onChange={handleTabChange} />

      <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        {tab === 'prayer' && <PrayerSettingsView username={user.username} />}
        {tab === 'backup' && isAdmin && <BackupPanel />}
        {tab === 'password' && !isGuest && <ChangePasswordForm onUpdated={handleUpdated} />}
        {tab === 'phone' && !isGuest && (
          <PhoneForm currentPhone={user.phone} onUpdated={handleUpdated} />
        )}
        {tab === 'cards' && !isGuest && <CardsView user={user} onUpdated={handleUpdated} />}
        {tab === 'info' && <InfoView user={user} isGuest={isGuest} />}
      </motion.div>
    </div>
  );
}

/* ============ Prayer Settings View ============ */
const SAUDI_CITIES = [
  { ar: 'الرياض', en: 'Riyadh' },
  { ar: 'مكة المكرمة', en: 'Makkah' },
  { ar: 'المدينة المنورة', en: 'Madinah' },
  { ar: 'جدة', en: 'Jeddah' },
  { ar: 'الدمام', en: 'Dammam' },
  { ar: 'الخبر', en: 'Khobar' },
  { ar: 'بريدة', en: 'Buraidah' },
  { ar: 'أبها', en: 'Abha' },
  { ar: 'تبوك', en: 'Tabuk' },
  { ar: 'الطائف', en: 'Taif' },
];

function PrayerSettingsView({ username }: { username: string }) {
  const { settings, updateSettings, resetSettings } = usePrayerSettings();
  const [city, setCity] = useState(settings.city);
  const [country, setCountry] = useState(settings.country);
  const [method, setMethod] = useState(settings.calculationMethod);
  const [madhab, setMadhab] = useState(settings.madhab);
  const [enabled, setEnabled] = useState(settings.enabled);
  const [notifications, setNotifications] = useState(settings.notificationsEnabled);
  const [statusMsg, setStatusMsg] = useState<{ text: string; ok: boolean } | null>(null);

  useEffect(() => {
    setCity(settings.city);
    setCountry(settings.country);
    setMethod(settings.calculationMethod);
    setMadhab(settings.madhab);
    setEnabled(settings.enabled);
    setNotifications(settings.notificationsEnabled);
  }, [settings]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      city,
      country,
      calculationMethod: Number(method),
      madhab,
      enabled,
      notificationsEnabled: notifications,
    });
    setStatusMsg({ text: `تم حفظ إعدادات الصلاة بنجاح لحساب (${username})!`, ok: true });
    setTimeout(() => setStatusMsg(null), 3500);
  };

  const handleQuickCity = (cityEn: string) => {
    setCity(cityEn);
    updateSettings({ city: cityEn });
    setStatusMsg({ text: `تم تحديث المدينة إلى ${cityEn} وحفظ التغييرات.`, ok: true });
    setTimeout(() => setStatusMsg(null), 2500);
  };

  const handleReset = () => {
    resetSettings();
    setStatusMsg({ text: 'تمت استعادة الإعدادات الافتراضية (الرياض - أم القرى).', ok: true });
    setTimeout(() => setStatusMsg(null), 2500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-bold text-slate-300 mb-2 flex items-center gap-2">
          <Clock className="w-4 h-4 text-emerald-400" /> معاينة مباشرة لمواقيت الصلاة
        </h3>
        <PrayerTimesWidget />
      </div>

      {statusMsg && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-3.5 rounded-xl text-sm flex items-center gap-2 ${
            statusMsg.ok
              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
              : 'bg-red-500/10 text-red-300 border border-red-500/30'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{statusMsg.text}</span>
        </motion.div>
      )}

      <form onSubmit={handleSave} className="glass-panel p-6 rounded-2xl space-y-5 border border-emerald-500/20">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="font-bold text-lg text-slate-100 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" /> تخصيص مواقيت الصلاة
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              الإعدادات تُحفظ تلقائياً في التخزين المحلي للمستخدم ({username})
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-400 hover:text-white transition-colors"
            title="استعادة الافتراضي"
          >
            <RotateCcw className="w-3.5 h-3.5" /> استعادة
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-300 mb-2 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" /> مدن شائعة بالمملكة العربية السعودية:
          </label>
          <div className="flex flex-wrap gap-2">
            {SAUDI_CITIES.map((c) => {
              const isSelected = city.toLowerCase() === c.en.toLowerCase();
              return (
                <button
                  type="button"
                  key={c.en}
                  onClick={() => handleQuickCity(c.en)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                      : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60'
                  }`}
                >
                  {c.ar}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">المدينة (City)</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="input-field"
              placeholder="مثال: Riyadh"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">الدولة (Country)</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="input-field"
              placeholder="Saudi Arabia"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">طريقة الحساب المعتمدة</label>
            <select
              value={method}
              onChange={(e) => setMethod(Number(e.target.value))}
              className="input-field bg-slate-900"
            >
              <option value={4}>جامعة أم القرى، مكة المكرمة (الافتراضي للمملكة)</option>
              <option value={3}>رابطة العالم الإسلامي (Muslim World League)</option>
              <option value={5}>الهيئة المصرية العامة للمساحة</option>
              <option value={2}>الاتحاد الإسلامي لأمريكا الشمالية (ISNA)</option>
              <option value={1}>جامعة العلوم الإسلامية بكراتشي</option>
              <option value={8}>الخليج العربي (Gulf Region)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">المذهب الفقهي لحساب صلاة العصر</label>
            <select
              value={madhab}
              onChange={(e) => setMadhab(e.target.value as 'shafi' | 'hanafi')}
              className="input-field bg-slate-900"
            >
              <option value="shafi">الشافعي، الحنبلي، والمالكي (المثل الواحد - الافتراضي)</option>
              <option value="hanafi">الحنفي (المثلين)</option>
            </select>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-800 space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 bg-slate-900 border-slate-700"
            />
            <span className="text-xs text-slate-200 font-medium">
              تفعيل ويدجت مواقيت الصلاة في التطبيق
            </span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 bg-slate-900 border-slate-700"
            />
            <span className="text-xs text-slate-200 font-medium">
              تفعيل إشعارات دخول وقت الصلاة والتنبيهات الصوتية الصامتة
            </span>
          </label>
        </div>

        <button type="submit" className="btn-primary w-full py-3 flex items-center justify-center gap-2">
          <Save className="w-4 h-4" /> حفظ تفضيلات الصلاة
        </button>
      </form>
    </div>
  );
}

/* ============ Cards View ============ */
function CardsView({ user, onUpdated }: { user: StoredUser; onUpdated: () => void }) {
  const savedCards = getSavedCards(user.username);
  const teamMember = findTeamMember(user.academicId);
  const [justSaved, setJustSaved] = useState(false);

  const defaultCard = teamMember
    ? {
        kind: 'team' as const,
        title: teamMember.title,
        subtitle: teamMember.name,
        message: teamMember.message,
        recipientName: teamMember.name,
        isTeamMember: true,
      }
    : {
        kind: 'general' as const,
        title: GENERAL_MOTIVATION.title,
        subtitle: GENERAL_MOTIVATION.subtitle,
        message: GENERAL_MOTIVATION.message,
        recipientName: user.fullName,
        isTeamMember: false,
      };

  const handleSaveNow = () => {
    saveCard(user.username, {
      kind: defaultCard.kind,
      title: defaultCard.title,
      subtitle: defaultCard.subtitle,
      message: defaultCard.message,
    });
    setJustSaved(true);
    onUpdated();
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-2xl border border-amber-500/20">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2 text-amber-300">
              <Sparkles className="w-5 h-5" />
              {teamMember ? 'بطاقة عضو فريق مِرْصَاد التقديرية' : 'بطاقة عضو مِرْصَاد الترحيبية'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              اضغط على زر «اقرأ الرسالة» لقلب البطاقة واستعراض الإهداء الخاص بك
            </p>
          </div>
          {savedCards.length === 0 ? (
            <button
              onClick={handleSaveNow}
              className="btn-primary text-xs py-2 px-3 flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" /> حفظ البطاقة في ملفي
            </button>
          ) : (
            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> محفوظة في حسابك
            </span>
          )}
        </div>

        {justSaved && (
          <div className="bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 p-3 rounded-xl text-xs mb-4">
            ✓ تم حفظ البطاقة بنجاح في ملفك الشخصي!
          </div>
        )}

        <div className="max-w-md mx-auto">
          <CongratulationCard
            title={defaultCard.title}
            subtitle={defaultCard.subtitle}
            message={defaultCard.message}
            recipientName={defaultCard.recipientName}
            isTeamMember={defaultCard.isTeamMember}
            academicId={user.academicId}
          />
        </div>
      </div>
    </div>
  );
}

/* ============ Change Password ============ */
function ChangePasswordForm({ onUpdated }: { onUpdated: () => void }) {
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    if (newPass.trim().length < 6) {
      setMsg({ type: 'err', text: 'كلمة المرور يجب أن تكون 6 أحرف أو أرقام على الأقل' });
      return;
    }
    if (newPass !== confirm) {
      setMsg({ type: 'err', text: 'كلمتا المرور غير متطابقتين' });
      return;
    }

    const res = await changePassword(current, newPass);
    if (!res.success) {
      setMsg({ type: 'err', text: res.error || 'تعذر تغيير كلمة المرور' });
      return;
    }

    setMsg({ type: 'ok', text: 'تم تغيير كلمة المرور بنجاح!' });
    setCurrent('');
    setNewPass('');
    setConfirm('');
    onUpdated();
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-2xl space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Lock className="w-5 h-5 text-purple-400" />
        <h3 className="font-bold text-lg">تغيير كلمة المرور</h3>
      </div>
      {msg && (
        <div
          className={`p-3 rounded-lg text-sm ${
            msg.type === 'ok'
              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/40'
              : 'bg-red-500/10 text-red-300 border border-red-500/40'
          }`}
        >
          {msg.text}
        </div>
      )}
      <div>
        <label className="block text-sm text-slate-400 mb-2">كلمة المرور الحالية</label>
        <input
          type="password"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          className="input-field"
          required
        />
      </div>
      <div>
        <label className="block text-sm text-slate-400 mb-2">كلمة المرور الجديدة</label>
        <input
          type="password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          className="input-field"
          required
        />
      </div>
      <div>
        <label className="block text-sm text-slate-400 mb-2">تأكيد كلمة المرور الجديدة</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="input-field"
          required
        />
      </div>
      <button type="submit" className="btn-primary w-full">
        <Save className="w-4 h-4 inline mr-2" /> حفظ كلمة المرور
      </button>
    </form>
  );
}

/* ============ Phone Form ============ */
function PhoneForm({
  currentPhone,
  onUpdated,
}: {
  currentPhone: string;
  onUpdated: () => void;
}) {
  const { session } = useAuth();
  const [phone, setPhone] = useState(currentPhone);
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    if (!/^05\d{8}$/.test(phone)) {
      setMsg({ type: 'err', text: 'رقم الجوال يجب أن يبدأ بـ 05 ويتكون من 10 أرقام' });
      return;
    }

    const res = updateUserPhone(session?.username || '', phone);
    if (!res.success) {
      setMsg({ type: 'err', text: res.error || 'تعذر تحديث رقم الجوال' });
      return;
    }

    setMsg({ type: 'ok', text: 'تم حفظ رقم الجوال بنجاح!' });
    onUpdated();
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-6 rounded-2xl space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Phone className="w-5 h-5 text-emerald-400" />
        <h3 className="font-bold text-lg">تحديث رقم الجوال</h3>
      </div>
      {msg && (
        <div
          className={`p-3 rounded-lg text-sm ${
            msg.type === 'ok'
              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/40'
              : 'bg-red-500/10 text-red-300 border border-red-500/40'
          }`}
        >
          {msg.text}
        </div>
      )}
      <div>
        <label className="block text-sm text-slate-400 mb-2">رقم الجوال</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input-field"
          placeholder="05XXXXXXXX"
          maxLength={10}
          required
        />
      </div>
      <button type="submit" className="btn-primary w-full">
        <Save className="w-4 h-4 inline mr-2" /> حفظ رقم الجوال
      </button>
    </form>
  );
}

/* ============ Info View ============ */
function InfoView({ user, isGuest }: { user: StoredUser; isGuest?: boolean }) {
  const teamMember = !isGuest ? findTeamMember(user.academicId) : null;
  const rows = isGuest
    ? [
        { label: 'الصفة', value: 'زائر لمنصة مِرْصَاد التشفير' },
        { label: 'اسم الحساب', value: 'guest' },
        { label: 'الصلاحيات', value: 'استعراض الداشبورد، المقارنات، التعريفات، وضبط مواقيت الصلاة' },
        { label: 'إعدادات الصلاة', value: 'محفوظة باسم mirsad_prayer_settings_guest' },
      ]
    : [
        { label: 'الاسم الكامل', value: user.fullName },
        { label: 'الرقم الأكاديمي', value: user.academicId },
        ...(teamMember ? [{ label: 'اللقب في فريق مِرْصَاد', value: `✧ ${teamMember.title}` }] : []),
        { label: 'اسم المستخدم', value: user.username },
        {
          label: 'الدور',
          value:
            user.role === 'admin'
              ? 'مسؤول'
              : user.role === 'doctor'
              ? 'مستخدم (دكتور)'
              : 'مستخدم (طالب)',
        },
        { label: 'رقم الجوال', value: user.phone || 'غير محدد' },
        {
          label: 'حالة كلمة المرور',
          value: user.needs_password_change ? '⚠ بانتظار التغيير' : '✓ آمنة',
        },
        { label: 'تاريخ الإنشاء', value: new Date(user.created_at).toLocaleDateString('ar-SA') },
      ];

  return (
    <div className="glass-panel p-6 rounded-2xl">
      <h3 className="font-bold mb-4 flex items-center gap-2">
        <User className="w-5 h-5 text-blue-400" /> {isGuest ? 'معلومات الزائر' : 'معلومات الحساب'}
      </h3>
      <div className="divide-y divide-slate-800">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between py-3 text-sm">
            <span className="text-slate-400">{r.label}</span>
            <span className="font-medium text-slate-200">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```
