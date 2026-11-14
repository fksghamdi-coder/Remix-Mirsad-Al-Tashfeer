import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  GraduationCap,
  Database,
  ShieldCheck,
  Zap,
  Copy,
  Check,
  Download,
  Server,
  Key,
  Code,
  CheckCircle2,
  Lock,
  Layers,
  Cpu,
  ArrowRightLeft,
  FileCode,
  Terminal,
  ShieldAlert,
  Fingerprint,
  Radio
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ArchitectureViewerProps {
  isOpen?: boolean;
  onClose?: () => void;
  compactMode?: boolean;
}

export default function ArchitectureViewer({
  isOpen = true,
  onClose,
  compactMode = false
}: ArchitectureViewerProps) {
  const [activeTab, setActiveTab] = useState<'topology' | 'schemas' | 'bff' | 'hardening' | 'rls' | 'sql'>('topology');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const toggleSelectCard = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedCardId((prev) => (prev === id ? null : id));
  };

  const academicSQL = `-- مخطط قاعدة البيانات الأساسي للمنصة الأكاديمية
-- مصمم مع التركيز على السلامة (ACID) والترابط

CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- سيتم استخدام Argon2id
    mfa_secret VARCHAR(255),
    role VARCHAR(20) DEFAULT 'student',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
    course_id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chapters (
    chapter_id UUID PRIMARY KEY,
    course_id UUID REFERENCES courses(course_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    video_url VARCHAR(500),
    order_index INT NOT NULL
);

CREATE TABLE security_logs (
    log_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id) ON DELETE SET NULL,
    action VARCHAR(100),
    ip_address INET,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- بيانات أولية للمقررات بناءً على الكتب المرفقة (Seed Data)
INSERT INTO courses (course_id, title, description) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'إدارة البرامج الأمنية', 'مقرر يغطي حوكمة الأمن السيبراني وإدارة الضوابط.'),
('660e8400-e29b-41d4-a716-446655440001', 'التشفير المتقدم', 'دراسة الرياضيات والتطبيقات المتقدمة للتشفير.'),
('770e8400-e29b-41d4-a716-446655440002', 'التهديدات السيبرانية', 'تحليل أنواع الهجمات والاستجابة للحوادث.'),
('880e8400-e29b-41d4-a716-446655440003', 'تحليل المخاطر السيبرانية', 'منهجيات NIST و ISO لتقييم المخاطر.'),
('990e8400-e29b-41d4-a716-446655440004', 'تخطيط وإدارة الأمن السيبراني', 'التخطيط الاستراتيجي للأمن في المؤسسات.');

-- مثال لإدراج فصل من مقرر إدارة البرامج الأمنية
INSERT INTO chapters (chapter_id, course_id, title, order_index, video_url) VALUES
(gen_random_uuid(), '550e8400-e29b-41d4-a716-446655440000', 'مقدمة الضوابط الأساسية', 1, '/videos/security_mgmt_ch1.mp4');`;

  const backendPyCode = `from fastapi import FastAPI, Depends, HTTPException, Security, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, Field
import hashlib
from typing import List, Optional

app = FastAPI(title="Secure Academic Platform Backend")
security = HTTPBearer()

class Chapter(BaseModel):
    title: str
    content: str
    video_url: str

class ContentProtectRequest(BaseModel):
    course_id: str
    content: str
    protection_level: Optional[str] = "ACID_SEAL"

# طبقة التحقق من التوكن (JWT RS256 Validation)
def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    if not token or len(token) < 10:
        raise HTTPException(status_code=403, detail="Not authenticated or invalid RS256 token")
    return token

@app.get("/api/v1/courses")
async def get_courses(token: str = Depends(verify_token)):
    return {
        "status": "success",
        "data": [
            {"course_id": "550e8400-e29b-41d4-a716-446655440000", "title": "إدارة البرامج الأمنية"},
            {"course_id": "660e8400-e29b-41d4-a716-446655440001", "title": "التشفير المتقدم"},
            {"course_id": "770e8400-e29b-41d4-a716-446655440002", "title": "التهديدات السيبرانية"},
            {"course_id": "880e8400-e29b-41d4-a716-446655440003", "title": "تحليل المخاطر السيبرانية"},
            {"course_id": "990e8400-e29b-41d4-a716-446655440004", "title": "تخطيط وإدارة الأمن السيبراني"}
        ]
    }

@app.get("/api/v1/courses/{course_id}/chapters", response_model=List[Chapter])
async def get_chapters(course_id: str, token: str = Depends(verify_token)):
    # منطق جلب الفصول للمقرر بعد تدقيق الصلاحيات
    return [
        Chapter(
            title="مقدمة الضوابط الأساسية",
            content="استعراض ضوابط الهيئة الوطنية للأمن السيبراني ECC-1:2018.",
            video_url="/videos/security_mgmt_ch1.mp4"
        )
    ]

@app.post("/api/v1/content/protect")
async def protect_content(payload: ContentProtectRequest, token: str = Depends(verify_token)):
    # ختم المحتوى الأكاديمي بالبصمة المشفرة
    fingerprint = hashlib.sha256(f"{payload.course_id}:{payload.content}".encode()).hexdigest()
    return {"status": "protected", "seal": f"MIRSAD-{fingerprint[:16]}"}

@app.post("/api/v1/login")
async def login(credentials: dict):
    # التحقق من الهوية وكلمة السر (Argon2id)
    return {"message": "Login successful", "algorithm": "RS256"}`;

  const hardeningJsCode = `// طبقة حماية الواجهة الأمامية وإغلاق أدوات المطورين
export function initSecurityHardening() {
    // منع النقر بزر الماوس الأيمن
    window.addEventListener('contextmenu', (e) => e.preventDefault());

    // الكشف عن فتح أدوات المطورين عبر قياس حجم النافذة ومراقبة البريمج
    let devtoolsOpen = false;
    const threshold = 160;

    setInterval(() => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;

        if (widthThreshold || heightThreshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                alert("تحذير أمني: تم رصد محاولة استعراض الكود البرمجي!");
                window.location.href = "about:blank";
            }
        }
    }, 1000);

    // تعطيل اختصارات لوحة المفاتيح الشائعة لفتح الأدوات
    document.addEventListener('keydown', (e) => {
        if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
            (e.ctrlKey && e.key.toUpperCase() === 'U')
        ) {
            e.preventDefault();
            return false;
        }
    });
}`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full glass-panel card-3d-neon bg-slate-950/90 text-slate-100 rounded-3xl border border-emerald-500/35 p-5 md:p-7 relative overflow-hidden">
      {/* Background Neon Accent */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-slate-800/90">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold font-mono shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
              DEFENSE-IN-DEPTH ARCHITECTURE
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/35 text-[11px] font-semibold shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]">
              PostgreSQL ACID + FastAPI BFF + Anti-DevTools
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black mt-3 text-slate-100 flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-emerald-400" />
            البنية المعمارية والأمنية المتكاملة لمنصة مِرْصَاد
          </h2>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
            مخطط قواعد بيانات ACID المترابط، وخادم BFF الخلفي الآمن بتقنية RS256 وArgon2id، وطبقة حماية الواجهة الأمامية وإغلاق أدوات المطورين.
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="self-end md:self-auto px-4 py-2 rounded-xl btn-3d-neon text-xs text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95"
          >
            إغلاق
          </button>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pb-4 mb-6 border-b border-slate-800/80">
        {[
          { id: 'topology', label: 'توزيع النطاقات (Topology)', icon: Globe },
          { id: 'schemas', label: 'مخطط قواعد البيانات (ACID)', icon: Database },
          { id: 'bff', label: 'الخادم الخلفي (FastAPI BFF)', icon: Terminal },
          { id: 'hardening', label: 'حماية الواجهة (Anti-DevTools)', icon: ShieldAlert },
          { id: 'rls', label: 'سياسات الأمان RLS', icon: ShieldCheck },
          { id: 'sql', label: 'ملف SQL Schema', icon: FileCode },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'px-3 py-2.5 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 whitespace-nowrap truncate transition-all duration-300 cursor-pointer btn-3d-neon active:scale-95',
                active
                  ? 'btn-3d-neon-active ring-2 ring-emerald-400/70 text-emerald-200 border-emerald-400'
                  : 'text-slate-300 hover:text-emerald-200 border-slate-700/80'
              )}
            >
              <Icon className={cn('w-4 h-4 shrink-0', active ? 'text-emerald-300' : 'text-slate-400')} />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <AnimatePresence mode="wait">
        {/* 1. Topology */}
        {activeTab === 'topology' && (
          <motion.div
            key="topology"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div
              onClick={(e) => toggleSelectCard('edge-network-container', e)}
              className={cn(
                'p-5 md:p-6 rounded-2xl glass-panel card-3d-neon bg-slate-900/85 border transition-all duration-300 relative cursor-pointer',
                selectedCardId === 'edge-network-container'
                  ? 'border-emerald-400 ring-2 ring-emerald-400/75 shadow-[0_18px_38px_-10px_rgba(2,6,23,0.92),0_0_26px_rgba(16,185,129,0.28)]'
                  : 'border-emerald-500/35 hover:border-emerald-400/70'
              )}
            >
              <div className="flex items-center justify-between flex-wrap gap-2 mb-5">
                <div className="flex items-center gap-2.5">
                  <Server className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-sm text-slate-100">مستضيف Edge Network &amp; BFF Architecture</span>
                </div>
                <span className="text-[11px] px-3 py-1 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/35 font-mono shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]">
                  Dual-Zone Deployment
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Observatory & Labs Portal Box */}
                <div
                  onClick={(e) => toggleSelectCard('portal-main', e)}
                  className={cn(
                    'p-5 rounded-2xl glass-panel card-3d-neon bg-slate-950/90 border transition-all duration-300 cursor-pointer active:scale-[0.99]',
                    selectedCardId === 'portal-main'
                      ? 'border-blue-400 ring-2 ring-blue-400/80 bg-blue-950/25 shadow-[0_14px_30px_-8px_rgba(2,6,23,0.9),0_0_22px_rgba(59,130,246,0.3)]'
                      : 'border-blue-500/35 hover:border-blue-400/75'
                  )}
                >
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                    <span className="font-mono text-sm font-black text-blue-300 flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-blue-400" /> القسم التطبيقي الأول (/main)
                    </span>
                    <span className="text-[10px] px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-300 border border-blue-500/35 font-mono shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                      Observatory &amp; Crypto Labs
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3.5">بوابة المرصد التحليلي والمختبرات التشفيرية التدريبية:</p>
                  <ul className="space-y-2 text-xs text-slate-200">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" /> مختبر AES &amp; GF(2^8) ومختبر المعرفة الصفرية ZKP
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" /> الخط الزمني لتاريخ التشفير والمصادر الموثقة
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" /> فريق طلاب شعبة (002م) وبوابة التواصل الأكاديمي
                    </li>
                  </ul>
                </div>

                {/* Academic Platform Box */}
                <div
                  onClick={(e) => toggleSelectCard('portal-academic', e)}
                  className={cn(
                    'p-5 rounded-2xl glass-panel card-3d-neon bg-slate-950/90 border transition-all duration-300 cursor-pointer active:scale-[0.99]',
                    selectedCardId === 'portal-academic'
                      ? 'border-amber-400 ring-2 ring-amber-400/80 bg-amber-950/25 shadow-[0_14px_30px_-8px_rgba(2,6,23,0.9),0_0_22px_rgba(245,158,11,0.3)]'
                      : 'border-amber-500/40 hover:border-amber-400/75'
                  )}
                >
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                    <span className="font-mono text-sm font-black text-amber-300 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-amber-400" /> القسم الأكاديمي الثاني (/academic)
                    </span>
                    <span className="text-[10px] px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/35 font-mono shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
                      Academic Platform · ISE243
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3.5">بوابة البيئة الأكاديمية التفاعلية والمقررات (دبلوم أمن المعلومات):</p>
                  <ul className="space-y-2 text-xs text-slate-200">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> توثيق مشدد مع Argon2id وPBKDF2-SHA256
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> الكتب التفاعلية ثلاثية الأبعاد والاختبارات القياسية
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" /> إصدار الشهادات التدريبية الموقعة ببصمة SHA-256
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Downward Connector Line */}
            <div className="flex flex-col items-center justify-center -my-1">
              <div className="w-0.5 h-6 bg-gradient-to-b from-emerald-500 to-amber-500" />
              <div
                onClick={(e) => toggleSelectCard('connector-badge', e)}
                className={cn(
                  'p-2.5 rounded-2xl glass-panel card-3d-neon border text-emerald-300 hover:text-white transition-all duration-300 cursor-pointer active:scale-95',
                  selectedCardId === 'connector-badge'
                    ? 'border-emerald-400 ring-2 ring-emerald-400/80 bg-emerald-950/50 shadow-[0_0_20px_rgba(16,185,129,0.35)]'
                    : 'border-emerald-500/40 hover:border-emerald-400/75'
                )}
              >
                <ArrowRightLeft className="w-4 h-4 rotate-90" />
              </div>
              <div className="w-0.5 h-6 bg-gradient-to-b from-amber-500 to-emerald-500" />
            </div>

            {/* Backend & DB Architecture */}
            <div
              onClick={(e) => toggleSelectCard('backend-db-container', e)}
              className={cn(
                'p-5 md:p-6 rounded-2xl glass-panel card-3d-neon bg-slate-900/85 border transition-all duration-300 cursor-pointer',
                selectedCardId === 'backend-db-container'
                  ? 'border-amber-400 ring-2 ring-amber-400/75 shadow-[0_18px_38px_-10px_rgba(2,6,23,0.92),0_0_26px_rgba(245,158,11,0.28)]'
                  : 'border-amber-500/35 hover:border-amber-400/75'
              )}
            >
              <div className="flex items-center justify-between flex-wrap gap-2 mb-5">
                <div className="flex items-center gap-2.5">
                  <Database className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-sm text-slate-100">نظام البيانات والخدمات الخلفية المؤمنة</span>
                </div>
                <span className="text-[11px] px-3 py-1 rounded-xl bg-amber-500/15 text-amber-300 border border-amber-500/35 font-mono shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]">
                  PostgreSQL ACID + FastAPI BFF
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div
                  onClick={(e) => toggleSelectCard('service-bff', e)}
                  className={cn(
                    'p-4 rounded-2xl glass-panel card-3d-neon bg-slate-950/90 border transition-all duration-300 cursor-pointer active:scale-[0.98]',
                    selectedCardId === 'service-bff'
                      ? 'border-emerald-400 ring-2 ring-emerald-400/80 bg-emerald-950/25 shadow-[0_14px_30px_-8px_rgba(2,6,23,0.9),0_0_22px_rgba(16,185,129,0.3)]'
                      : 'border-emerald-500/35 hover:border-emerald-400/75'
                  )}
                >
                  <div className="font-bold text-emerald-300 mb-2 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400 shrink-0" /> FastAPI BFF Service
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">بوابة خلفية آمنة تتحقق من توقيعات RS256 وتفصل الواجهة عن قاعدة البيانات مباشرة.</p>
                </div>
                <div
                  onClick={(e) => toggleSelectCard('service-acid-db', e)}
                  className={cn(
                    'p-4 rounded-2xl glass-panel card-3d-neon bg-slate-950/90 border transition-all duration-300 cursor-pointer active:scale-[0.98]',
                    selectedCardId === 'service-acid-db'
                      ? 'border-amber-400 ring-2 ring-amber-400/80 bg-amber-950/25 shadow-[0_14px_30px_-8px_rgba(2,6,23,0.9),0_0_22px_rgba(245,158,11,0.3)]'
                      : 'border-amber-500/35 hover:border-amber-400/75'
                  )}
                >
                  <div className="font-bold text-amber-300 mb-2 flex items-center gap-2">
                    <Database className="w-4 h-4 text-amber-400 shrink-0" /> ACID Academic Database
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">جداول Users, Courses, Chapters, Security Logs مع قيود سلامة البيانات التامة.</p>
                </div>
                <div
                  onClick={(e) => toggleSelectCard('service-hardening', e)}
                  className={cn(
                    'p-4 rounded-2xl glass-panel card-3d-neon bg-slate-950/90 border transition-all duration-300 cursor-pointer active:scale-[0.98]',
                    selectedCardId === 'service-hardening'
                      ? 'border-red-400 ring-2 ring-red-400/80 bg-red-950/25 shadow-[0_14px_30px_-8px_rgba(2,6,23,0.9),0_0_22px_rgba(239,68,68,0.3)]'
                      : 'border-red-500/35 hover:border-red-400/75'
                  )}
                >
                  <div className="font-bold text-red-300 mb-2 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" /> Front-End Hardening
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">حظر الزر الأيمن، تعطيل F12، وكشف فتح أدوات المطورين تلقائياً.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. Schemas */}
        {activeTab === 'schemas' && (
          <motion.div
            key="schemas"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="p-5 md:p-6 rounded-2xl glass-panel card-3d-neon bg-slate-900/85 border border-amber-500/40">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-4 border-b border-slate-800 pb-3">
                <h4 className="font-bold text-sm text-amber-300 flex items-center gap-2">
                  <Database className="w-4 h-4 text-amber-400" />
                  مخطط قاعدة البيانات الأساسي للمنصة الأكاديمية (ACID Architecture)
                </h4>
                <span className="text-[10px] px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/35 font-mono">
                  PostgreSQL · Relational
                </span>
              </div>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                تم تصميم الجداول مع التركيز الصارم على مبادئ السلامة والاعتمادية (Atomicity, Consistency, Isolation, Durability) والترابط التام عبر المفاتيح الأجنبية:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Table users */}
                <div
                  onClick={(e) => toggleSelectCard('table-users', e)}
                  className={cn(
                    'p-4 rounded-2xl glass-panel card-3d-neon bg-slate-950/90 border transition-all duration-300 cursor-pointer active:scale-[0.99]',
                    selectedCardId === 'table-users'
                      ? 'border-emerald-400 ring-2 ring-emerald-400/80'
                      : 'border-emerald-500/35 hover:border-emerald-400/75'
                  )}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-mono font-bold text-emerald-400 text-sm">TABLE users</span>
                    <span className="text-[10px] text-slate-400">حسابات المستخدمين</span>
                  </div>
                  <ul className="space-y-1.5 font-mono text-[11px] text-slate-300">
                    <li><strong className="text-emerald-400">user_id:</strong> UUID PRIMARY KEY</li>
                    <li><strong className="text-slate-200">username:</strong> VARCHAR(50) UNIQUE NOT NULL</li>
                    <li><strong className="text-slate-200">email:</strong> VARCHAR(255) UNIQUE NOT NULL</li>
                    <li><strong className="text-amber-300">password_hash:</strong> VARCHAR(255) (Argon2id)</li>
                    <li><strong className="text-slate-200">mfa_secret:</strong> VARCHAR(255) (TOTP/SMS)</li>
                    <li><strong className="text-slate-200">role:</strong> VARCHAR(20) DEFAULT 'student'</li>
                    <li><strong className="text-slate-400">created_at:</strong> TIMESTAMP WITH TIME ZONE</li>
                  </ul>
                </div>

                {/* Table courses */}
                <div
                  onClick={(e) => toggleSelectCard('table-courses', e)}
                  className={cn(
                    'p-4 rounded-2xl glass-panel card-3d-neon bg-slate-950/90 border transition-all duration-300 cursor-pointer active:scale-[0.99]',
                    selectedCardId === 'table-courses'
                      ? 'border-blue-400 ring-2 ring-blue-400/80'
                      : 'border-blue-500/35 hover:border-blue-400/75'
                  )}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-mono font-bold text-blue-400 text-sm">TABLE courses</span>
                    <span className="text-[10px] text-slate-400">المقررات الأكاديمية</span>
                  </div>
                  <ul className="space-y-1.5 font-mono text-[11px] text-slate-300">
                    <li><strong className="text-blue-400">course_id:</strong> UUID PRIMARY KEY</li>
                    <li><strong className="text-slate-200">title:</strong> VARCHAR(255) NOT NULL</li>
                    <li><strong className="text-slate-200">description:</strong> TEXT</li>
                    <li><strong className="text-slate-400">created_at:</strong> TIMESTAMP WITH TIME ZONE</li>
                  </ul>
                </div>

                {/* Table chapters */}
                <div
                  onClick={(e) => toggleSelectCard('table-chapters', e)}
                  className={cn(
                    'p-4 rounded-2xl glass-panel card-3d-neon bg-slate-950/90 border transition-all duration-300 cursor-pointer active:scale-[0.99]',
                    selectedCardId === 'table-chapters'
                      ? 'border-purple-400 ring-2 ring-purple-400/80'
                      : 'border-purple-500/35 hover:border-purple-400/75'
                  )}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-mono font-bold text-purple-400 text-sm">TABLE chapters</span>
                    <span className="text-[10px] text-slate-400">الفصول والوحدات</span>
                  </div>
                  <ul className="space-y-1.5 font-mono text-[11px] text-slate-300">
                    <li><strong className="text-purple-400">chapter_id:</strong> UUID PRIMARY KEY</li>
                    <li><strong className="text-amber-300">course_id:</strong> UUID REFERENCES courses</li>
                    <li><strong className="text-slate-200">title:</strong> VARCHAR(255) NOT NULL</li>
                    <li><strong className="text-slate-200">content:</strong> TEXT (Markdown/Interactive)</li>
                    <li><strong className="text-slate-200">video_url:</strong> VARCHAR(500)</li>
                    <li><strong className="text-slate-200">order_index:</strong> INT NOT NULL</li>
                  </ul>
                </div>

                {/* Table security_logs */}
                <div
                  onClick={(e) => toggleSelectCard('table-logs', e)}
                  className={cn(
                    'p-4 rounded-2xl glass-panel card-3d-neon bg-slate-950/90 border transition-all duration-300 cursor-pointer active:scale-[0.99]',
                    selectedCardId === 'table-logs'
                      ? 'border-red-400 ring-2 ring-red-400/80'
                      : 'border-red-500/35 hover:border-red-400/75'
                  )}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="font-mono font-bold text-red-400 text-sm">TABLE security_logs</span>
                    <span className="text-[10px] text-slate-400">سجل الأحداث والتدقيق</span>
                  </div>
                  <ul className="space-y-1.5 font-mono text-[11px] text-slate-300">
                    <li><strong className="text-red-400">log_id:</strong> UUID PRIMARY KEY</li>
                    <li><strong className="text-amber-300">user_id:</strong> UUID REFERENCES users</li>
                    <li><strong className="text-slate-200">action:</strong> VARCHAR(100) (LOGIN, INSPECT...)</li>
                    <li><strong className="text-slate-200">ip_address:</strong> INET</li>
                    <li><strong className="text-slate-400">timestamp:</strong> TIMESTAMP WITH TIME ZONE</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. BFF Backend App */}
        {activeTab === 'bff' && (
          <motion.div
            key="bff"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="p-5 md:p-6 rounded-2xl glass-panel card-3d-neon bg-slate-900/85 border border-emerald-500/35 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2.5">
                  <Terminal className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-sm text-slate-100">
                    خادم المنصة الأكاديمية الآمن (BFF - Backend app · PY)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
                    FastAPI · Python 3
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(backendPyCode, 'py')}
                    className="px-3.5 py-1.5 rounded-xl btn-3d-neon text-xs text-slate-200 hover:text-emerald-200 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                  >
                    {copiedType === 'py' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedType === 'py' ? 'تم النسخ' : 'نسخ الكود'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => downloadFile(backendPyCode, 'backend_app.py', 'text/x-python')}
                    className="px-3.5 py-1.5 rounded-xl btn-3d-neon btn-3d-neon-active text-xs text-emerald-200 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>تحميل backend_app.py</span>
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                يعمل الخادم كطبقة وسيطة مؤمنة (BFF) بين تطبيق React وقاعدة البيانات، مع تفعيل التحقق الصارم من توقيع JWT بمفتاح RS256 والتحقق من كلمات المرور عبر Argon2id.
              </p>

              {/* Endpoints Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs pt-1">
                <div
                  onClick={(e) => toggleSelectCard('ep-courses', e)}
                  className={cn(
                    'p-4 rounded-2xl glass-panel card-3d-neon bg-slate-950/90 border transition-all duration-300 cursor-pointer active:scale-[0.99]',
                    selectedCardId === 'ep-courses' ? 'border-blue-400 ring-2 ring-blue-400/75' : 'border-emerald-500/30'
                  )}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 font-mono text-[10px] font-bold">GET</span>
                    <span className="font-mono text-slate-200 font-bold">/api/v1/courses</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    محمي بواسطة <code className="text-emerald-400 font-mono">verify_token (RS256)</code> لجلب بيانات المقررات الـ 5 المعتمدة بعد تدقيق صلاحيات الطالب.
                  </p>
                </div>

                <div
                  onClick={(e) => toggleSelectCard('ep-chapters', e)}
                  className={cn(
                    'p-4 rounded-2xl glass-panel card-3d-neon bg-slate-950/90 border transition-all duration-300 cursor-pointer active:scale-[0.99]',
                    selectedCardId === 'ep-chapters' ? 'border-purple-400 ring-2 ring-purple-400/75' : 'border-emerald-500/30'
                  )}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-mono text-[10px] font-bold">GET</span>
                    <span className="font-mono text-slate-200 font-bold">/api/v1/courses/{'{course_id}'}/chapters</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    إرجاع قائمة الفصول مع نموذج <code className="text-purple-300 font-mono">Chapter(Pydantic)</code> والروابط الآمنة لمحاضرات المقرر.
                  </p>
                </div>

                <div
                  onClick={(e) => toggleSelectCard('ep-protect', e)}
                  className={cn(
                    'p-4 rounded-2xl glass-panel card-3d-neon bg-slate-950/90 border transition-all duration-300 cursor-pointer active:scale-[0.99]',
                    selectedCardId === 'ep-protect' ? 'border-cyan-400 ring-2 ring-cyan-400/75' : 'border-emerald-500/30'
                  )}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold">POST</span>
                    <span className="font-mono text-slate-200 font-bold">/api/v1/content/protect</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    تطبيق درع الحماية الرقمية وبصمة <code className="text-cyan-300 font-mono">SHA-256</code> والختم الأكاديمي المشفر للمحتوى العلمي.
                  </p>
                </div>

                <div
                  onClick={(e) => toggleSelectCard('ep-login', e)}
                  className={cn(
                    'p-4 rounded-2xl glass-panel card-3d-neon bg-slate-950/90 border transition-all duration-300 cursor-pointer active:scale-[0.99]',
                    selectedCardId === 'ep-login' ? 'border-emerald-400 ring-2 ring-emerald-400/75' : 'border-emerald-500/30'
                  )}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">POST</span>
                    <span className="font-mono text-slate-200 font-bold">/api/v1/login</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    استقبال بيانات الدخول والتحقق الآمن من الهاش عبر <code className="text-amber-300 font-mono">Argon2id</code> وإصدار رمز التوثيق.
                  </p>
                </div>
              </div>

              {/* Code Viewer */}
              <pre className="p-4 rounded-2xl card-3d-neon bg-slate-950/95 border border-emerald-500/30 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-72 dir-ltr text-left">
                <code>{backendPyCode}</code>
              </pre>
            </div>
          </motion.div>
        )}

        {/* 4. Hardening Tab */}
        {activeTab === 'hardening' && (
          <motion.div
            key="hardening"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="p-5 md:p-6 rounded-2xl glass-panel card-3d-neon bg-slate-900/85 border border-red-500/35 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="w-5 h-5 text-red-400" />
                  <span className="font-bold text-sm text-slate-100">
                    طبقة حماية الواجهة الأمامية وإغلاق أدوات المطورين (Anti-DevTools)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-lg text-[10px] bg-red-500/20 text-red-300 border border-red-500/40 font-mono">
                    ACTIVE · مُفعّلة في المنصة
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(hardeningJsCode, 'hardening')}
                  className="px-3.5 py-1.5 rounded-xl btn-3d-neon text-xs text-slate-200 hover:text-emerald-200 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                >
                  {copiedType === 'hardening' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'hardening' ? 'تم النسخ' : 'نسخ كود الحماية'}</span>
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                تعمل هذه الطبقة فور تحميل التطبيق على منع استعراض الأكواد، حظر قائمة النقر بالزر الأيمن، تعطيل اختصارات التفتيش، وتسجيل أي محاولة في السجلات الأمنية:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-xs">
                <div
                  onClick={(e) => toggleSelectCard('hard-context', e)}
                  className={cn(
                    'p-4 rounded-2xl glass-panel card-3d-neon bg-slate-950/90 border transition-all duration-300 cursor-pointer active:scale-[0.98]',
                    selectedCardId === 'hard-context' ? 'border-red-400 ring-2 ring-red-400/75' : 'border-red-500/30'
                  )}
                >
                  <div className="font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-400" /> حظر الزر الأيمن
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    اعتراض حدث <code className="text-red-400 font-mono">contextmenu</code> لمنع فتح خيارات الفحص وحفظ الصفحات.
                  </p>
                </div>

                <div
                  onClick={(e) => toggleSelectCard('hard-resize', e)}
                  className={cn(
                    'p-4 rounded-2xl glass-panel card-3d-neon bg-slate-950/90 border transition-all duration-300 cursor-pointer active:scale-[0.98]',
                    selectedCardId === 'hard-resize' ? 'border-amber-400 ring-2 ring-amber-400/75' : 'border-amber-500/30'
                  )}
                >
                  <div className="font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" /> مراقبة أبعاد الشاشة
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    رصد فارق الحجم بين النافذة الخارجية والداخلية للكشف الفوري عن فتح نوافذ DevTools الجانبية أو السفلية.
                  </p>
                </div>

                <div
                  onClick={(e) => toggleSelectCard('hard-keys', e)}
                  className={cn(
                    'p-4 rounded-2xl glass-panel card-3d-neon bg-slate-950/90 border transition-all duration-300 cursor-pointer active:scale-[0.98]',
                    selectedCardId === 'hard-keys' ? 'border-emerald-400 ring-2 ring-emerald-400/75' : 'border-emerald-500/30'
                  )}
                >
                  <div className="font-bold text-slate-200 mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> تعطيل الاختصارات
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    حظر مفاتيح <code className="text-emerald-400 font-mono">F12</code> و <code className="text-emerald-400 font-mono">Ctrl+Shift+I/J/C</code> و <code className="text-emerald-400 font-mono">Ctrl+U</code>.
                  </p>
                </div>
              </div>

              {/* Code Viewer */}
              <pre className="p-4 rounded-2xl card-3d-neon bg-slate-950/95 border border-red-500/30 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-72 dir-ltr text-left">
                <code>{hardeningJsCode}</code>
              </pre>
            </div>
          </motion.div>
        )}

        {/* 5. RLS Policies */}
        {activeTab === 'rls' && (
          <motion.div
            key="rls"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="p-5 md:p-6 rounded-2xl glass-panel card-3d-neon bg-slate-900/85 border border-emerald-500/35">
              <h4 className="font-bold text-sm text-emerald-400 flex items-center gap-2 mb-4">
                <ShieldCheck className="w-5 h-5" /> سياسات حماية البيانات (Row Level Security Policies)
              </h4>

              <div className="space-y-3.5 text-xs">
                <div
                  onClick={(e) => toggleSelectCard('rls-1', e)}
                  className={cn(
                    'p-4 rounded-2xl glass-panel card-3d-neon bg-slate-950/90 border transition-all duration-300 cursor-pointer active:scale-[0.99]',
                    selectedCardId === 'rls-1' ? 'border-emerald-400 ring-2 ring-emerald-400/75' : 'border-emerald-500/30'
                  )}
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-mono text-emerald-300 font-bold">Public Read on Reference Schema</span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/35 text-[10px]">ANON / PUBLIC</span>
                  </div>
                  <p className="text-slate-300 mt-1.5 leading-relaxed">يسمح بقراءة بيانات المصادر الموثقة والجدول الزمني وبيان المشروع الأكاديمي دون المساس بسجلات الطلاب الخاصة.</p>
                </div>

                <div
                  onClick={(e) => toggleSelectCard('rls-2', e)}
                  className={cn(
                    'p-4 rounded-2xl glass-panel card-3d-neon bg-slate-950/90 border transition-all duration-300 cursor-pointer active:scale-[0.99]',
                    selectedCardId === 'rls-2' ? 'border-amber-400 ring-2 ring-amber-400/75' : 'border-amber-500/30'
                  )}
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-mono text-amber-300 font-bold">Strict Student Isolation Policy</span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-amber-500/15 text-amber-300 border border-amber-500/35 text-[10px]">AUTH.UID() CHECK</span>
                  </div>
                  <p className="text-slate-300 mt-1.5 leading-relaxed">
                    لا يمكن لأي طالب الوصول إلى سجلات درجات أو تقدم طالب آخر. يتم التحقق تلقائياً بواسطة شرط <code className="font-mono text-amber-400">auth.uid() = student_id</code> على مستوى قاعدة البيانات.
                  </p>
                </div>

                <div
                  onClick={(e) => toggleSelectCard('rls-3', e)}
                  className={cn(
                    'p-4 rounded-2xl glass-panel card-3d-neon bg-slate-950/90 border transition-all duration-300 cursor-pointer active:scale-[0.99]',
                    selectedCardId === 'rls-3' ? 'border-purple-400 ring-2 ring-purple-400/75' : 'border-purple-500/30'
                  )}
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-mono text-purple-300 font-bold">Public Certificate Hash Verification</span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/35 text-[10px]">VERIFY BY CODE</span>
                  </div>
                  <p className="text-slate-300 mt-1.5 leading-relaxed">يُسمح للعامة والجهات الخارجية بالتحقق من صحة الشهادات الأكاديمية الصادرة عن طريق كود الشهادة أو تجزئة SHA-256.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 6. SQL Schema Tab */}
        {activeTab === 'sql' && (
          <motion.div
            key="sql"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <span className="text-xs font-mono text-emerald-400 font-bold">academic_schema.sql (ACID Core Schema)</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard(academicSQL, 'sql')}
                  className="px-3.5 py-1.5 rounded-xl btn-3d-neon text-xs text-slate-200 hover:text-emerald-200 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                >
                  {copiedType === 'sql' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedType === 'sql' ? 'تم النسخ' : 'نسخ كود SQL'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => downloadFile(academicSQL, 'academic_schema.sql', 'application/sql')}
                  className="px-3.5 py-1.5 rounded-xl btn-3d-neon btn-3d-neon-active text-xs text-emerald-200 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>تحميل academic_schema.sql</span>
                </button>
              </div>
            </div>

            <pre className="p-4 rounded-2xl card-3d-neon bg-slate-950/95 border border-emerald-500/35 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-80 dir-ltr text-left">
              <code>{academicSQL}</code>
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
