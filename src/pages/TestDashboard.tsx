// src/pages/TestDashboard.tsx
import React, { useState, useEffect } from 'react';
import {
  Shield,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  Cpu,
  Database,
  Lock,
  Key,
  Wifi,
  Activity,
  Terminal,
  Search,
  Filter,
  Check,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import { testRunner, TestResult } from '../lib/testRunner';
import { getDeviceFingerprint } from '../lib/encryption';
import { secureDB } from '../lib/secureDB';
import { SyncEngine, syncEngine } from '../lib/syncEngine';

// استيراد حزم الاختبارات لتسجيلها في testRunner
import '../lib/tests/foundation.test';
import '../lib/tests/enhancement.test';
import '../lib/tests/creativity.test';
import '../lib/tests/advancedFeatures.test';
import '../lib/tests/qa_simulation_engine';

export default function TestDashboard() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTestName, setCurrentTestName] = useState('');
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [auditChainStatus, setAuditChainStatus] = useState<boolean | null>(null);

  // تشخيص حالة النظام
  const systemDiagnostics = {
    cryptoApi: typeof window !== 'undefined' && !!window.crypto?.subtle,
    indexedDB: typeof window !== 'undefined' && !!window.indexedDB,
    online: typeof navigator !== 'undefined' ? navigator.onLine : true,
    localStorage: typeof window !== 'undefined' && !!window.localStorage,
    fingerprint: getDeviceFingerprint(),
  };

  const handleRunAllTests = async () => {
    setIsRunning(true);
    setResults([]);
    setProgress(0);

    const runResults = await testRunner.run((res, index, total) => {
      setProgress(Math.round((index / total) * 100));
      setCurrentTestName(res.name);
      setResults((prev) => [...prev, res]);
    });

    setResults(runResults);
    setIsRunning(false);
    setCurrentTestName('');

    // فحص سلسلة التشفير للتدقيق
    try {
      const isAuditOk = await secureDB.verifyAuditChain();
      setAuditChainStatus(isAuditOk);
    } catch {
      setAuditChainStatus(false);
    }
  };

  useEffect(() => {
    // تشغيل الاختبارات تلقائياً عند تحميل الصفحة لأول مرة
    handleRunAllTests();
  }, []);

  const totalTests = results.length;
  const passedCount = results.filter((r) => r.status === 'passed').length;
  const failedCount = results.filter((r) => r.status === 'failed').length;
  const totalDuration = results.reduce((acc, r) => acc + r.duration, 0).toFixed(1);

  // استخراج التصنيفات المتاحة
  const categories = Array.from(testRunner.getSuites().keys());

  // تصفية النتائج
  const filteredResults = results.filter((r) => {
    const matchesCategory = filter === 'all' || r.category === filter;
    const matchesSearch =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 sm:p-6 lg:p-8 dir-rtl text-right">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Header Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-slate-900/90 border border-emerald-500/30 p-6 sm:p-8 shadow-[0_0_30px_rgba(16,185,129,0.1)] backdrop-blur-md">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 shrink-0">
                <Shield className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
                  لوحة اختبارات البنية الأساسية للنظام
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                  منصة مرصد التشفير — فحص التشفير، قاعدة البيانات المشفرة، إدارة الجلسات، وسلسلة التدقيق
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleRunAllTests}
                disabled={isRunning}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg ${
                  isRunning
                    ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/30 shadow-emerald-900/30 hover:shadow-emerald-500/20 active:scale-95'
                }`}
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    جاري التنفيذ ({progress}%)
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    تشغيل كافة الاختبارات
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          {isRunning && (
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>جاري اختبار: {currentTestName}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700/50">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* System Diagnostics Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
            <div className="p-2.5 bg-cyan-500/10 rounded-lg text-cyan-400 border border-cyan-500/20">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Web Crypto API</div>
              <div className="text-sm font-semibold text-slate-200">
                {systemDiagnostics.cryptoApi ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> مدعوم
                  </span>
                ) : (
                  <span className="text-rose-400">غير مدعوم</span>
                )}
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400">IndexedDB</div>
              <div className="text-sm font-semibold text-slate-200">
                {systemDiagnostics.indexedDB ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> متاح
                  </span>
                ) : (
                  <span className="text-rose-400">غير متاح</span>
                )}
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
            <div className="p-2.5 bg-purple-500/10 rounded-lg text-purple-400 border border-purple-500/20">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400">سلسلة التدقيق Audit</div>
              <div className="text-sm font-semibold text-slate-200">
                {auditChainStatus === true ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> سليمة
                  </span>
                ) : auditChainStatus === false ? (
                  <span className="text-rose-400 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" /> خطأ بالحجم
                  </span>
                ) : (
                  <span className="text-slate-400">جاري الفحص</span>
                )}
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
              <Wifi className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400">حالة الاتصال</div>
              <div className="text-sm font-semibold text-slate-200">
                {systemDiagnostics.online ? (
                  <span className="text-emerald-400">متصل (Online)</span>
                ) : (
                  <span className="text-amber-400">منفصل (Offline)</span>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-4 lg:col-span-1 bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400">الزمن الإجمالي</div>
              <div className="text-sm font-semibold text-emerald-400">{totalDuration} ms</div>
            </div>
          </div>
        </div>

        {/* Test Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-xs font-medium">إجمالي الفحوصات</p>
              <p className="text-2xl font-bold text-slate-100 mt-1">{totalTests}</p>
            </div>
            <div className="p-3 bg-slate-800/80 border border-slate-700/50 rounded-xl text-slate-300">
              <Activity className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-slate-900/70 border border-emerald-500/30 rounded-xl p-5 flex items-center justify-between shadow-[0_0_15px_rgba(16,185,129,0.05)]">
            <div>
              <p className="text-emerald-400/90 text-xs font-medium">الفحوصات الناجحة</p>
              <p className="text-2xl font-bold text-emerald-400 mt-1">{passedCount}</p>
            </div>
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-slate-900/70 border border-rose-500/30 rounded-xl p-5 flex items-center justify-between shadow-[0_0_15px_rgba(244,63,94,0.05)]">
            <div>
              <p className="text-rose-400/90 text-xs font-medium">الفحوصات الفاشلة</p>
              <p className="text-2xl font-bold text-rose-400 mt-1">{failedCount}</p>
            </div>
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400">
              <XCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-400 flex items-center gap-1 ml-2">
              <Filter className="w-3.5 h-3.5" /> الفئات:
            </span>
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              الكل ({results.length})
            </button>
            {categories.map((cat) => {
              const count = results.filter((r) => r.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors truncate max-w-[200px] ${
                    filter === cat
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute top-3 right-3 text-slate-500" />
            <input
              type="text"
              placeholder="بحث في نتائج الاختبارات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-9 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>
        </div>

        {/* Test Results Table / Cards */}
        <div className="space-y-3">
          {filteredResults.length === 0 ? (
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-12 text-center text-slate-400">
              <Terminal className="w-12 h-12 mx-auto text-slate-600 mb-3" />
              <p className="font-semibold">لا توجد فحوصات مطابقة للفلتر المحال</p>
              <p className="text-xs text-slate-500 mt-1">انقر على "تشغيل كافة الاختبارات" لبدء عملية الفحص الشاملة</p>
            </div>
          ) : (
            filteredResults.map((result, idx) => (
              <div
                key={idx}
                className={`bg-slate-900/80 border rounded-xl p-4 transition-all hover:translate-y-[-2px] ${
                  result.status === 'passed'
                    ? 'border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.03)]'
                    : 'border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.1)] bg-rose-950/10'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {result.status === 'passed' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-slate-100">{result.name}</span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700/60 text-slate-400">
                          {result.category}
                        </span>
                      </div>
                      {result.error && (
                        <div className="mt-2 p-3 bg-rose-950/50 border border-rose-800/50 rounded-lg text-xs font-mono text-rose-300 dir-ltr text-left overflow-x-auto">
                          {result.error}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 text-xs">
                    <span className="text-slate-400 flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {result.duration.toFixed(2)} ms
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                        result.status === 'passed'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {result.status === 'passed' ? 'ناجح' : 'فشل'}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>مرصد التشفير (Mirsad Cyber Platform) — وحدة اختبار البنية الأساسية</span>
          <span className="font-mono text-[11px] truncate max-w-md">بصمة الجهاز: {systemDiagnostics.fingerprint}</span>
        </div>

      </div>
    </div>
  );
}
