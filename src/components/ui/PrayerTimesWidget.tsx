// src/components/ui/PrayerTimesWidget.tsx
import { useState, useEffect } from 'react';
import { Clock, MapPin, Bell, BellOff, Moon, Sun, Sunrise, Sunset } from 'lucide-react';
import { usePrayerSettings } from '@/contexts/PrayerSettingsContext';

interface Timings {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

const PRAYER_NAMES_AR: Record<string, { name: string; icon: typeof Moon }> = {
  Fajr: { name: 'الفجر', icon: Sunrise },
  Sunrise: { name: 'الشروق', icon: Sun },
  Dhuhr: { name: 'الظهر', icon: Sun },
  Asr: { name: 'العصر', icon: Sun },
  Maghrib: { name: 'المغرب', icon: Sunset },
  Isha: { name: 'العشاء', icon: Moon },
};

export default function PrayerTimesWidget({
  compact = false,
  variant = 'emerald',
}: {
  compact?: boolean;
  variant?: 'emerald' | 'amber';
}) {
  const { settings, isReady } = usePrayerSettings();
  const [timings, setTimings] = useState<Timings | null>(null);
  const [loading, setLoading] = useState(true);
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string; remaining: string } | null>(null);

  useEffect(() => {
    if (!settings.enabled) return;

    let isMounted = true;
    setLoading(true);

    const fetchPrayerTimes = async () => {
      try {
        const res = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
            settings.city
          )}&country=${encodeURIComponent(settings.country)}&method=${
            settings.calculationMethod
          }&school=${settings.madhab === 'hanafi' ? 1 : 0}`
        );
        const data = await res.json();
        if (isMounted && data.code === 200 && data.data?.timings) {
          setTimings(data.data.timings);
        }
      } catch (err) {
        // Fallback default times for Riyadh if offline or rate limited
        if (isMounted) {
          setTimings({
            Fajr: '04:45',
            Sunrise: '06:05',
            Dhuhr: '11:50',
            Asr: '15:15',
            Maghrib: '17:35',
            Isha: '19:05',
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPrayerTimes();
    const interval = setInterval(fetchPrayerTimes, 60000 * 30); // كل 30 دقيقة
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [settings.city, settings.country, settings.calculationMethod, settings.madhab, settings.enabled]);

  // حساب الصلاة القادمة
  useEffect(() => {
    if (!timings) return;

    const calcNext = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      const prayers = [
        { key: 'Fajr', name: 'الفجر', time: timings.Fajr },
        { key: 'Dhuhr', name: 'الظهر', time: timings.Dhuhr },
        { key: 'Asr', name: 'العصر', time: timings.Asr },
        { key: 'Maghrib', name: 'المغرب', time: timings.Maghrib },
        { key: 'Isha', name: 'العشاء', time: timings.Isha },
      ];

      for (const p of prayers) {
        const [h, m] = p.time.split(':').map(Number);
        const pMinutes = h * 60 + m;
        if (pMinutes > currentMinutes) {
          const diff = pMinutes - currentMinutes;
          const diffHours = Math.floor(diff / 60);
          const diffMins = diff % 60;
          const remaining =
            diffHours > 0 ? `بعد ${diffHours} س و ${diffMins} د` : `بعد ${diffMins} دقيقة`;
          setNextPrayer({ name: p.name, time: p.time, remaining });
          return;
        }
      }

      // إذا انتهت صلوات اليوم، فالصلاة القادمة فجر الغد
      setNextPrayer({ name: 'الفجر', time: timings.Fajr, remaining: 'فجر الغد' });
    };

    calcNext();
    const t = setInterval(calcNext, 30000);
    return () => clearInterval(t);
  }, [timings]);

  if (!isReady || !settings.enabled) return null;

  if (compact) {
    if (variant === 'amber') {
      return (
        <div className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-[11px] font-bold text-amber-300 bg-slate-900/90 border border-amber-500/30 shadow-sm whitespace-nowrap shrink-0">
          <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          {nextPrayer ? (
            <span className="inline-flex items-center gap-1">
              <span>{nextPrayer.name}</span>
              <strong className="text-amber-200 font-mono font-black">{nextPrayer.time}</strong>
              <span className="text-amber-100/75 text-[10px]">({nextPrayer.remaining})</span>
            </span>
          ) : (
            <span className="text-amber-200/80">جاري التحديث...</span>
          )}
        </div>
      );
    }

    return (
      <div className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-slate-900/90 border border-emerald-500/30 text-[11px] text-slate-200 shadow-sm whitespace-nowrap shrink-0">
        <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        {nextPrayer ? (
          <span className="inline-flex items-center gap-1">
            <span className="font-bold text-slate-100">{nextPrayer.name}</span>
            <strong className="text-emerald-400 font-mono font-bold">{nextPrayer.time}</strong>
            <span className="text-slate-400 text-[10px]">({nextPrayer.remaining})</span>
          </span>
        ) : (
          <span>جاري التحديث...</span>
        )}
      </div>
    );
  }

  return (
    <div className="glass-panel p-5 rounded-2xl border border-emerald-500/20 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-slate-100">مواقيت الصلاة</h3>
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-400" /> {settings.city}، {settings.country}
            </p>
          </div>
        </div>

        {nextPrayer && (
          <div className="text-left bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg">
            <span className="text-[10px] text-emerald-400 block">الصلاة القادمة</span>
            <span className="text-xs font-bold text-slate-200">
              {nextPrayer.name} {nextPrayer.time}
            </span>
          </div>
        )}
      </div>

      {loading && !timings ? (
        <div className="py-6 text-center text-xs text-slate-400">جاري تحميل المواقيت...</div>
      ) : timings ? (
        <div className="grid grid-cols-5 gap-2">
          {(['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const).map((key) => {
            const info = PRAYER_NAMES_AR[key];
            const Icon = info.icon;
            const isNext = nextPrayer?.name === info.name;
            return (
              <div
                key={key}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isNext
                    ? 'bg-emerald-500/20 border-emerald-500/50 shadow-sm shadow-emerald-500/20 scale-105'
                    : 'bg-slate-900/40 border-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 mx-auto mb-1 ${isNext ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span className="block text-[11px] font-bold text-slate-300 mb-0.5">{info.name}</span>
                <span className={`block text-xs font-mono font-bold ${isNext ? 'text-emerald-300' : 'text-slate-400'}`}>
                  {timings[key]?.slice(0, 5)}
                </span>
              </div>
            );
          })}
        </div>
      ) : null}

      <div className="flex items-center justify-between text-[10px] text-slate-500 mt-3 pt-3 border-t border-slate-800/80">
        <span>تقويم أم القرى</span>
        <span className="flex items-center gap-1">
          {settings.notificationsEnabled ? (
            <>
              <Bell className="w-3 h-3 text-emerald-400" /> التنبيهات مفعّلة
            </>
          ) : (
            <>
              <BellOff className="w-3 h-3 text-slate-500" /> التنبيهات صامتة
            </>
          )}
        </span>
      </div>
    </div>
  );
}
