import React from 'react';
import { SceneViewer } from '@/components/diagrams/Diagrams';
import { buildScene } from '@/components/diagrams/scenes';

// 12+ مخططاً فنياً توضيحياً — SVG حقيقي لكل فصل

interface DiagramProps {
  chapterNumber: number;
  courseSlug?: string;
}

export default function ChapterDiagram({ chapterNumber, courseSlug = 'ise243' }: DiagramProps) {
  const normalizedSlug = (courseSlug || 'ise243').toLowerCase();
  const key = `${normalizedSlug}-${chapterNumber}`;
  const Registry: Record<string, () => React.ReactElement> = {
    // ===== ISE243 (13) — الرسوم المحسوبة بالدوال الرياضية النمطية =====
    'ise243-1': () => <SceneViewer scene={buildScene('aes-round')} />,
    'ise243-2': () => <SceneViewer scene={buildScene('ec-points')} />,
    'ise243-3': () => <SceneViewer scene={buildScene('dh-exchange')} />,
    'ise243-4': () => <SceneViewer scene={buildScene('tls13-handshake')} />,
    'ise243-5': IPsecPackets,
    'ise243-6': () => <SceneViewer scene={buildScene('key-hierarchy')} />,
    'ise243-7': HomomorphicNoise,
    'ise243-8': () => <SceneViewer scene={buildScene('zkp-sigma')} />,
    'ise243-9': KeyLifecycle,
    'ise243-10': PowerAnalysis,
    'ise243-11': ShorSpeedup,
    'ise243-12': NISTPQC,
    'ise243-13': () => <SceneViewer scene={buildScene('key-hierarchy')} />,

    // ===== ISE231 (11) =====
    'ise231-1': NISTCSFWheel,
    'ise231-2': GovernanceHierarchy,
    'ise231-3': CSF_Functions,
    'ise231-4': AssetLifecycle,
    'ise231-5': RiskLifecycle,
    'ise231-6': PolicyHierarchy,
    'ise231-7': StrategyRoadmap,
    'ise231-8': PDCA_Cycle,
    'ise231-9': MTDRTORPO,
    'ise231-10': FourPhasesRoadmap,
    'ise231-11': FourPhasesRoadmap,

    // ===== ISE232-Risk (11) =====
    'ise232-risk-1': OctaveAllegroPhases,
    'ise232-risk-2': ThreatTree,
    'ise232-risk-3': Octave8Steps,
    'ise232-risk-4': AnalysisSpectrum,
    'ise232-risk-5': RiskMatrix5x5,
    'ise232-risk-6': TreatmentArrows,
    'ise232-risk-7': WorksheetAnatomy,
    'ise232-risk-8': NIST800_30Steps,
    'ise232-risk-9': ReportStructure,
    'ise232-risk-10': Octave8Steps,
    'ise232-risk-11': RiskMatrix5x5,

    // ===== ISE232-Threats (9) =====
    'ise232-threats-1': CIATriad,
    'ise232-threats-2': MalwareTaxonomy,
    'ise232-threats-3': CyberKillchain,
    'ise232-threats-4': AAA_Flow,
    'ise232-threats-5': EspionageRecon,
    'ise232-threats-6': IT_vs_OT,
    'ise232-threats-7': AIThreats,
    'ise232-threats-8': IDSvsIPS,
    'ise232-threats-9': CyberKillchain,

    // ===== ISE232-Programs (12) =====
    'ise232-programs-1': ECCPyramid,
    'ise232-programs-2': AccessControlFlow,
    'ise232-programs-3': AssetCategories,
    'ise232-programs-4': PatchCycle,
    'ise232-programs-5': ClassicalVsModernCrypto,
    'ise232-programs-6': MFAFactors,
    'ise232-programs-7': DefenseInDepth,
    'ise232-programs-8': IncidentPhases,
    'ise232-programs-9': ForensicTimeline,
    'ise232-programs-10': PolicyHierarchy,
    'ise232-programs-11': RiskMatrix5x5,
    'ise232-programs-12': ECCPyramid,

    // ===== ENG-CYBER (8) =====
    'eng-cyber-1': () => <SceneViewer scene={buildScene('aes-round')} />,
    'eng-cyber-2': PolicyHierarchy,
    'eng-cyber-3': IDSvsIPS,
    'eng-cyber-4': ForensicTimeline,
    'eng-cyber-5': RiskMatrix5x5,
    'eng-cyber-6': GovernanceHierarchy,
    'eng-cyber-7': NISTPQC,
    'eng-cyber-8': ReportStructure,
  };

  const Diagram = Registry[key] || Registry[`${normalizedSlug}-1`] || GaloisField;

  return (
    <div className="glass-panel p-6 rounded-2xl">
      <div className="w-full aspect-video flex items-center justify-center">
        {Diagram ? <Diagram /> : (
          <p className="text-slate-500 text-sm">لا يوجد مخطط لهذا الفصل</p>
        )}
      </div>
    </div>
  );
}

/* ============ Chapter 1: Galois Field GF(2^8) ============ */
function GaloisField() {
  const cells = Array.from({ length: 16 }, (_, i) => i);
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full max-w-md">
      <text x="200" y="20" textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="bold">
        AES State Matrix (4×4 bytes) — GF(2⁸)
      </text>
      {cells.map(i => {
        const row = Math.floor(i / 4);
        const col = i % 4;
        return (
          <g key={i}>
            <rect
              x={60 + col * 70}
              y={50 + row * 40}
              width="60"
              height="34"
              rx="6"
              fill="#1e293b"
              stroke="#10b981"
              strokeWidth="1.5"
            />
            <text
              x={90 + col * 70}
              y={72 + row * 40}
              textAnchor="middle"
              fill="#10b981"
              fontSize="10"
              fontFamily="monospace"
            >
              0x{((0x63 + i * 17) & 0xff).toString(16).padStart(2, '0').toUpperCase()}
            </text>
          </g>
        );
      })}
      <text x="200" y="225" textAnchor="middle" fill="#64748b" fontSize="10">
        كل بايت = عنصر في GF(2⁸) — 256 عنصراً
      </text>
    </svg>
  );
}

/* ============ Chapter 2: Elliptic Curve y²=x³-x+9 ============ */
function EllipticCurve() {
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full max-w-md">
      <line x1="20" y1="140" x2="380" y2="140" stroke="#475569" strokeWidth="1" />
      <line x1="200" y1="20" x2="200" y2="260" stroke="#475569" strokeWidth="1" />
      <path
        d="M 40 40 Q 140 30 170 140 Q 180 180 200 180 Q 220 180 230 140 Q 260 30 360 40"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2.5"
      />
      <circle cx="270" cy="60" r="5" fill="#ef4444" />
      <text x="285" y="65" fill="#ef4444" fontSize="11">
        P
      </text>
      <circle cx="300" cy="80" r="5" fill="#ef4444" />
      <text x="315" y="85" fill="#ef4444" fontSize="11">
        Q
      </text>
      <circle cx="150" cy="200" r="5" fill="#10b981" />
      <text x="110" y="220" fill="#10b981" fontSize="11">
        R = P+Q
      </text>
      <line
        x1="270"
        y1="60"
        x2="150"
        y2="200"
        stroke="#f59e0b"
        strokeWidth="1.5"
        strokeDasharray="5,3"
      />
      <text x="200" y="265" textAnchor="middle" fill="#64748b" fontSize="10">
        y² = x³ - x + 9 (mod p) — عملية جمع النقاط
      </text>
    </svg>
  );
}

/* ============ Chapter 3: ECDH Flow ============ */
function ECDHFlow() {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full max-w-md">
      <rect
        x="20"
        y="30"
        width="120"
        height="80"
        rx="8"
        fill="#064e3b"
        stroke="#10b981"
        strokeWidth="2"
      />
      <text x="80" y="55" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">
        Alice
      </text>
      <text x="80" y="75" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
        α ← ℤq
      </text>
      <text x="80" y="92" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="monospace">
        u = g^α
      </text>

      <rect
        x="260"
        y="30"
        width="120"
        height="80"
        rx="8"
        fill="#1e3a8a"
        stroke="#3b82f6"
        strokeWidth="2"
      />
      <text x="320" y="55" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">
        Bob
      </text>
      <text x="320" y="75" textAnchor="middle" fill="#94a3b8" fontSize="10" fontFamily="monospace">
        β ← ℤq
      </text>
      <text x="320" y="92" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="monospace">
        v = g^β
      </text>

      <line
        x1="140"
        y1="70"
        x2="260"
        y2="70"
        stroke="#10b981"
        strokeWidth="1.5"
        markerEnd="url(#arrowG)"
      />
      <text x="200" y="60" textAnchor="middle" fill="#10b981" fontSize="9" fontFamily="monospace">
        u
      </text>

      <line
        x1="260"
        y1="95"
        x2="140"
        y2="95"
        stroke="#3b82f6"
        strokeWidth="1.5"
        markerEnd="url(#arrowB)"
      />
      <text x="200" y="115" textAnchor="middle" fill="#3b82f6" fontSize="9" fontFamily="monospace">
        v
      </text>

      <rect
        x="20"
        y="140"
        width="360"
        height="60"
        rx="8"
        fill="#7c2d12"
        fillOpacity="0.4"
        stroke="#f59e0b"
        strokeWidth="1.5"
      />
      <text x="200" y="165" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">
        السر المشترك
      </text>
      <text
        x="200"
        y="185"
        textAnchor="middle"
        fill="#fbbf24"
        fontSize="11"
        fontFamily="monospace"
      >
        K = u^β = v^α = g^(αβ)
      </text>

      <defs>
        <marker id="arrowG" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill="#10b981" />
        </marker>
        <marker id="arrowB" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill="#3b82f6" />
        </marker>
      </defs>
    </svg>
  );
}

/* ============ Chapter 4: TLS 1.3 Handshake ============ */
function TLSHandshake() {
  const messages = [
    { y: 50, from: 'c', label: 'ClientHello + KeyShare', color: '#10b981' },
    { y: 80, from: 's', label: 'ServerHello + KeyShare', color: '#3b82f6' },
    { y: 110, from: 's', label: '{EncryptedExtensions}', color: '#3b82f6' },
    { y: 140, from: 's', label: '{Certificate}', color: '#3b82f6' },
    { y: 170, from: 's', label: '{CertificateVerify}', color: '#3b82f6' },
    { y: 200, from: 's', label: '{Finished}', color: '#3b82f6' },
  ];
  return (
    <svg viewBox="0 0 400 260" className="w-full h-full max-w-md">
      <text x="70" y="25" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">
        Client
      </text>
      <text x="330" y="25" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">
        Server
      </text>
      <line x1="70" y1="35" x2="70" y2="240" stroke="#475569" strokeDasharray="3,3" />
      <line x1="330" y1="35" x2="330" y2="240" stroke="#475569" strokeDasharray="3,3" />

      {messages.map((m, i) => {
        const x1 = m.from === 'c' ? 70 : 330;
        const x2 = m.from === 'c' ? 330 : 70;
        return (
          <g key={i}>
            <line
              x1={x1}
              y1={m.y}
              x2={x2}
              y2={m.y}
              stroke={m.color}
              strokeWidth="1.5"
              markerEnd={`url(#arr${m.from})`}
            />
            <text
              x={(x1 + x2) / 2}
              y={m.y - 3}
              textAnchor="middle"
              fill={m.color}
              fontSize="9"
              fontFamily="monospace"
            >
              {m.label}
            </text>
          </g>
        );
      })}
      <defs>
        <marker id="arrc" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="#10b981" />
        </marker>
        <marker id="arrs" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="#3b82f6" />
        </marker>
      </defs>
    </svg>
  );
}

/* ============ Chapter 5: IPsec Packets ============ */
function IPsecPackets() {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full max-w-md">
      <text x="200" y="25" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">
        Transport Mode
      </text>
      <rect x="30" y="40" width="60" height="30" fill="#1e293b" stroke="#64748b" rx="3" />
      <text x="60" y="60" textAnchor="middle" fill="#94a3b8" fontSize="9">
        IP Header
      </text>
      <rect
        x="90"
        y="40"
        width="40"
        height="30"
        fill="#3b82f6"
        fillOpacity="0.6"
        stroke="#3b82f6"
        rx="3"
      />
      <text x="110" y="60" textAnchor="middle" fill="#dbeafe" fontSize="9">
        ESP
      </text>
      <rect
        x="130"
        y="40"
        width="140"
        height="30"
        fill="#10b981"
        fillOpacity="0.4"
        stroke="#10b981"
        rx="3"
      />
      <text x="200" y="60" textAnchor="middle" fill="#a7f3d0" fontSize="9">
        Payload (TCP/UDP)
      </text>
      <rect
        x="270"
        y="40"
        width="40"
        height="30"
        fill="#3b82f6"
        fillOpacity="0.6"
        stroke="#3b82f6"
        rx="3"
      />
      <text x="290" y="60" textAnchor="middle" fill="#dbeafe" fontSize="9">
        ESP
      </text>
      <rect x="310" y="40" width="60" height="30" fill="#1e293b" stroke="#64748b" rx="3" />
      <text x="340" y="60" textAnchor="middle" fill="#94a3b8" fontSize="9">
        ICV
      </text>

      <text x="200" y="115" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">
        Tunnel Mode
      </text>
      <rect x="10" y="130" width="55" height="30" fill="#1e293b" stroke="#64748b" rx="3" />
      <text x="37" y="150" textAnchor="middle" fill="#94a3b8" fontSize="9">
        Outer IP
      </text>
      <rect
        x="65"
        y="130"
        width="35"
        height="30"
        fill="#3b82f6"
        fillOpacity="0.6"
        stroke="#3b82f6"
        rx="3"
      />
      <text x="82" y="150" textAnchor="middle" fill="#dbeafe" fontSize="9">
        ESP
      </text>
      <rect
        x="100"
        y="130"
        width="55"
        height="30"
        fill="#7c2d12"
        fillOpacity="0.5"
        stroke="#f59e0b"
        rx="3"
      />
      <text x="127" y="150" textAnchor="middle" fill="#fbbf24" fontSize="9">
        Inner IP
      </text>
      <rect
        x="155"
        y="130"
        width="120"
        height="30"
        fill="#10b981"
        fillOpacity="0.4"
        stroke="#10b981"
        rx="3"
      />
      <text x="215" y="150" textAnchor="middle" fill="#a7f3d0" fontSize="9">
        Payload (TCP/UDP)
      </text>
      <rect
        x="275"
        y="130"
        width="35"
        height="30"
        fill="#3b82f6"
        fillOpacity="0.6"
        stroke="#3b82f6"
        rx="3"
      />
      <text x="292" y="150" textAnchor="middle" fill="#dbeafe" fontSize="9">
        ESP
      </text>
      <rect x="310" y="130" width="55" height="30" fill="#1e293b" stroke="#64748b" rx="3" />
      <text x="337" y="150" textAnchor="middle" fill="#94a3b8" fontSize="9">
        ICV
      </text>

      <text x="200" y="200" textAnchor="middle" fill="#64748b" fontSize="10">
        Tunnel Mode يغلف الحزمة كاملة (Inner + Payload) — الأنسب للبوابات
      </text>
    </svg>
  );
}

/* ============ Chapter 6: Key Hierarchy ============ */
function KeyHierarchy() {
  return (
    <svg viewBox="0 0 400 260" className="w-full h-full max-w-md">
      <rect
        x="140"
        y="30"
        width="120"
        height="50"
        rx="8"
        fill="#7c2d12"
        stroke="#f59e0b"
        strokeWidth="2"
      />
      <text x="200" y="52" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">
        Root Key
      </text>
      <text x="200" y="70" textAnchor="middle" fill="#94a3b8" fontSize="9">
        (HSM فقط)
      </text>

      <line x1="200" y1="80" x2="200" y2="105" stroke="#f59e0b" strokeWidth="2" />
      <line x1="200" y1="105" x2="200" y2="110" stroke="#f59e0b" strokeWidth="2" />
      <line x1="80" y1="110" x2="320" y2="110" stroke="#f59e0b" strokeWidth="2" />

      <line x1="80" y1="110" x2="80" y2="130" stroke="#10b981" strokeWidth="2" />
      <line x1="200" y1="110" x2="200" y2="130" stroke="#10b981" strokeWidth="2" />
      <line x1="320" y1="110" x2="320" y2="130" stroke="#10b981" strokeWidth="2" />

      {[
        { x: 80, label: 'Wrapping Key 1' },
        { x: 200, label: 'Wrapping Key 2' },
        { x: 320, label: 'Wrapping Key 3' },
      ].map((k, i) => (
        <g key={i}>
          <rect
            x={k.x - 45}
            y="130"
            width="90"
            height="40"
            rx="6"
            fill="#1e293b"
            stroke="#10b981"
            strokeWidth="1.5"
          />
          <text x={k.x} y="155" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">
            {k.label}
          </text>
        </g>
      ))}

      <line x1="80" y1="170" x2="80" y2="190" stroke="#3b82f6" strokeWidth="1.5" />
      <line x1="200" y1="170" x2="200" y2="190" stroke="#3b82f6" strokeWidth="1.5" />
      <line x1="320" y1="170" x2="320" y2="190" stroke="#3b82f6" strokeWidth="1.5" />

      {[
        { x: 80, label: 'Data Key A' },
        { x: 200, label: 'Data Key B' },
        { x: 320, label: 'Data Key C' },
      ].map((k, i) => (
        <g key={i}>
          <rect
            x={k.x - 45}
            y="190"
            width="90"
            height="40"
            rx="6"
            fill="#1e293b"
            stroke="#3b82f6"
            strokeWidth="1.5"
          />
          <text x={k.x} y="215" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold">
            {k.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ============ Chapter 7: Homomorphic Noise ============ */
function HomomorphicNoise() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-full max-w-md">
      <line x1="40" y1="180" x2="380" y2="180" stroke="#475569" />
      <line x1="40" y1="20" x2="40" y2="180" stroke="#475569" />
      <text x="35" y="25" fill="#94a3b8" fontSize="9" textAnchor="end">
        Noise
      </text>
      <text x="380" y="200" fill="#94a3b8" fontSize="9">
        Operations
      </text>
      <line x1="40" y1="40" x2="380" y2="40" stroke="#ef4444" strokeDasharray="4,4" />
      <text x="385" y="43" fill="#ef4444" fontSize="9">
        Max
      </text>
      <path
        d="M 40 170 L 100 155 L 160 130 L 220 95 L 280 55 L 330 30 L 380 20"
        fill="none"
        stroke="#f59e0b"
        strokeWidth="2.5"
      />
      <circle cx="220" cy="95" r="4" fill="#f59e0b" />
      <text x="225" y="88" fill="#fbbf24" fontSize="10">
        Bootstrapping
      </text>
      <text x="200" y="215" textAnchor="middle" fill="#64748b" fontSize="10">
        الضوضاء تتراكم — التمهيد يعيدها لمستوى آمن
      </text>
    </svg>
  );
}

/* ============ Chapter 8: Sigma Protocol ============ */
function SigmaProtocol() {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full max-w-md">
      <text x="80" y="25" textAnchor="middle" fill="#f59e0b" fontSize="12" fontWeight="bold">
        Prover (P)
      </text>
      <text x="320" y="25" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold">
        Verifier (V)
      </text>
      <line x1="80" y1="35" x2="80" y2="215" stroke="#475569" strokeDasharray="3,3" />
      <line x1="320" y1="35" x2="320" y2="215" stroke="#475569" strokeDasharray="3,3" />

      {[
        { y: 60, from: 'p', label: '1. Commitment: t = g^r', color: '#f59e0b' },
        { y: 110, from: 'v', label: '2. Challenge: c ← ℤq', color: '#3b82f6' },
        { y: 160, from: 'p', label: '3. Response: s = r + c·x', color: '#10b981' },
      ].map((m, i) => (
        <g key={i}>
          <line
            x1={m.from === 'p' ? 80 : 320}
            y1={m.y}
            x2={m.from === 'p' ? 320 : 80}
            y2={m.y}
            stroke={m.color}
            strokeWidth="2"
            markerEnd={`url(#arr_${i})`}
          />
          <text
            x="200"
            y={m.y - 5}
            textAnchor="middle"
            fill={m.color}
            fontSize="10"
            fontFamily="monospace"
          >
            {m.label}
          </text>
          <defs>
            <marker
              id={`arr_${i}`}
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="4"
              orient="auto"
            >
              <polygon points="0 0, 8 4, 0 8" fill={m.color} />
            </marker>
          </defs>
        </g>
      ))}
      <text x="200" y="205" textAnchor="middle" fill="#94a3b8" fontSize="10">
        التحقق: g^s ?= t · y^c
      </text>
    </svg>
  );
}

/* ============ Chapter 9: Key Lifecycle ============ */
function KeyLifecycle() {
  const states = ['توليد', 'توزيع', 'استخدام', 'تدوير', 'إتلاف'];
  return (
    <svg viewBox="0 0 400 220" className="w-full h-full max-w-md">
      <circle cx="200" cy="110" r="70" fill="none" stroke="#475569" strokeDasharray="3,3" />
      {states.map((s, i) => {
        const angle = (i * 72 - 90) * (Math.PI / 180);
        const x = 200 + Math.cos(angle) * 70;
        const y = 110 + Math.sin(angle) * 70;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="26" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <text x={x} y={y + 4} textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">
              {s}
            </text>
          </g>
        );
      })}
      <text x="200" y="200" textAnchor="middle" fill="#64748b" fontSize="10">
        دورة حياة المفتاح (مع تعليق/إبطال استثنائيين)
      </text>
    </svg>
  );
}

/* ============ Chapter 10: Power Analysis ============ */
function PowerAnalysis() {
  const points = [
    { x: 20, y: 150 },
    { x: 40, y: 148 },
    { x: 60, y: 152 },
    { x: 80, y: 150 },
    { x: 100, y: 40 },
    { x: 120, y: 152 },
    { x: 140, y: 148 },
    { x: 160, y: 150 },
    { x: 180, y: 30 },
    { x: 200, y: 152 },
    { x: 220, y: 148 },
    { x: 240, y: 150 },
    { x: 260, y: 45 },
    { x: 280, y: 148 },
    { x: 300, y: 152 },
    { x: 320, y: 150 },
    { x: 340, y: 35 },
    { x: 360, y: 152 },
  ];
  const d = points.map((p, i) => (i === 0 ? 'M' : 'L') + `${p.x} ${p.y}`).join(' ');
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full max-w-md">
      <line x1="20" y1="180" x2="380" y2="180" stroke="#475569" />
      <line x1="20" y1="10" x2="20" y2="180" stroke="#475569" />
      <text x="15" y="15" fill="#94a3b8" fontSize="9" textAnchor="end">
        Power
      </text>
      <text x="380" y="195" fill="#94a3b8" fontSize="9">
        Time
      </text>
      <path d={d} fill="none" stroke="#ef4444" strokeWidth="1.5" />
      {points
        .filter((_, i) => i % 4 === 0)
        .map((p, i) => (
          <text key={i} x={p.x} y={p.y - 8} fill="#fbbf24" fontSize="9" textAnchor="middle">
            1
          </text>
        ))}
      <text x="200" y="100" textAnchor="middle" fill="#10b981" fontSize="10">
        ↑ ارتفاعات = بتات المفتاح "1"
      </text>
    </svg>
  );
}

/* ============ Chapter 11: Shor Speedup ============ */
function ShorSpeedup() {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full max-w-md">
      <text x="200" y="25" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="bold">
        Classical vs Quantum — RSA-2048
      </text>
      <rect
        x="60"
        y="70"
        width="130"
        height="130"
        rx="8"
        fill="#7c2d12"
        fillOpacity="0.4"
        stroke="#f59e0b"
        strokeWidth="2"
      />
      <text x="125" y="100" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">
        Classical
      </text>
      <text
        x="125"
        y="125"
        textAnchor="middle"
        fill="#fbbf24"
        fontSize="20"
        fontFamily="monospace"
      >
        10¹⁴
      </text>
      <text x="125" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">
        عام
      </text>

      <rect
        x="210"
        y="70"
        width="130"
        height="130"
        rx="8"
        fill="#064e3b"
        fillOpacity="0.4"
        stroke="#10b981"
        strokeWidth="2"
      />
      <text x="275" y="100" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">
        Quantum (Shor)
      </text>
      <text
        x="275"
        y="125"
        textAnchor="middle"
        fill="#34d399"
        fontSize="20"
        fontFamily="monospace"
      >
        ~8
      </text>
      <text x="275" y="145" textAnchor="middle" fill="#94a3b8" fontSize="9">
        ساعات
      </text>

      <line x1="200" y1="60" x2="200" y2="220" stroke="#475569" strokeDasharray="3,3" />
      <text x="200" y="230" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">
        تسريع أسّي (Exponential Speedup)
      </text>
    </svg>
  );
}

/* ============ Chapter 12: NIST PQC Timeline ============ */
function NISTPQC() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-full max-w-md">
      <line x1="30" y1="110" x2="370" y2="110" stroke="#475569" strokeWidth="2" />
      <line x1="30" y1="105" x2="30" y2="115" stroke="#475569" strokeWidth="2" />
      <line x1="370" y1="105" x2="370" y2="115" stroke="#475569" strokeWidth="2" />

      {[
        { x: 60, label: '2016', desc: 'إطلاق المسابقة', color: '#64748b' },
        { x: 140, label: '2022', desc: 'الفائزون', color: '#3b82f6' },
        { x: 220, label: '2023', desc: 'HQC بديل', color: '#8b5cf6' },
        { x: 300, label: '2024', desc: 'FIPS 203/204/205', color: '#10b981' },
        { x: 360, label: '2030', desc: 'CNSA 2.0', color: '#ef4444' },
      ].map((e, i) => (
        <g key={i}>
          <circle cx={e.x} cy="110" r="6" fill={e.color} />
          <text x={e.x} y="95" textAnchor="middle" fill={e.color} fontSize="11" fontWeight="bold">
            {e.label}
          </text>
          <text x={e.x} y="140" textAnchor="middle" fill="#94a3b8" fontSize="9">
            {e.desc}
          </text>
        </g>
      ))}
      <text x="200" y="180" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold">
        ML-KEM · ML-DSA · SLH-DSA
      </text>
      <text x="200" y="200" textAnchor="middle" fill="#64748b" fontSize="9">
        المعايير النهائية — 13 أغسطس 2024
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   ISE231 — المخططات الجديدة
   ═══════════════════════════════════════════════════════════ */

function NISTCSFWheel() {
  const functions = ['GOVERN', 'IDENTIFY', 'PROTECT', 'DETECT', 'RESPOND', 'RECOVER'];
  const colors = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444', '#06b6d4'];
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full max-w-md">
      <text x="200" y="20" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="bold">
        NIST CSF 2.0 — الوظائف الست
      </text>
      {/* المركز */}
      <circle cx="200" cy="150" r="30" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2" />
      <text x="200" y="155" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">CSF</text>
      {/* الحلقة */}
      {functions.map((fn, i) => {
        const angle = (i * 60 - 90) * (Math.PI / 180);
        const x = 200 + Math.cos(angle) * 90;
        const y = 150 + Math.sin(angle) * 90;
        return (
          <g key={i}>
            <line x1="200" y1="150" x2={x} y2={y} stroke={colors[i]} strokeWidth="1.5" strokeOpacity="0.4" />
            <circle cx={x} cy={y} r="28" fill="#1e293b" stroke={colors[i]} strokeWidth="2" />
            <text x={x} y={y + 3} textAnchor="middle" fill={colors[i]} fontSize="7" fontWeight="bold">
              {fn}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function GovernanceHierarchy() {
  return (
    <svg viewBox="0 0 400 260" className="w-full h-full max-w-md">
      <text x="200" y="20" textAnchor="middle" fill="#10b981" fontSize="13" fontWeight="bold">
        هيكل حوكمة الأمن السيبراني
      </text>
      {/* الإدارة العليا */}
      <rect x="130" y="40" width="140" height="40" rx="8" fill="#7c2d12" stroke="#f59e0b" strokeWidth="2" />
      <text x="200" y="65" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">
        الإدارة العليا (صاحب الصلاحية)
      </text>
      {/* اللجنة الإشرافية */}
      <line x1="200" y1="80" x2="200" y2="100" stroke="#f59e0b" strokeWidth="1.5" />
      <rect x="100" y="100" width="200" height="40" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
      <text x="200" y="125" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
        اللجنة الإشرافية (توجيه ومتابعة)
      </text>
      {/* إدارة الأمن */}
      <line x1="200" y1="140" x2="200" y2="160" stroke="#f59e0b" strokeWidth="1.5" />
      <rect x="100" y="160" width="200" height="40" rx="8" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
      <text x="200" y="185" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">
        إدارة الأمن السيبراني
      </text>
      {/* المستوى التشغيلي */}
      <line x1="200" y1="200" x2="200" y2="220" stroke="#f59e0b" strokeWidth="1.5" />
      <rect x="80" y="220" width="240" height="30" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
      <text x="200" y="240" textAnchor="middle" fill="#94a3b8" fontSize="10">
        الممارسون (مالكو الأصول، مسؤولو الأنظمة)
      </text>
    </svg>
  );
}

function RiskLifecycle() {
  const steps = ['التحضير', 'التصنيف', 'التقييم', 'الاختيار', 'التنفيذ', 'المراقبة', 'التفويض'];
  return (
    <svg viewBox="0 0 420 240" className="w-full h-full max-w-md">
      <text x="210" y="20" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="bold">
        دورة حياة إدارة المخاطر — 7 خطوات
      </text>
      {steps.map((s, i) => {
        const angle = (i * (360 / steps.length) - 90) * (Math.PI / 180);
        const x = 210 + Math.cos(angle) * 80;
        const y = 130 + Math.sin(angle) * 80;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="26" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
            <text x={x} y={y + 4} textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">
              {s}
            </text>
            <text x={x} y={y - 34} textAnchor="middle" fill="#64748b" fontSize="8">
              {i + 1}
            </text>
          </g>
        );
      })}
      <circle cx="210" cy="130" r="30" fill="#0f172a" fillOpacity="0.6" stroke="#3b82f6" strokeDasharray="4,3" />
      <text x="210" y="134" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">
        Risk
      </text>
    </svg>
  );
}

function MTDRTORPO() {
  return (
    <svg viewBox="0 0 420 200" className="w-full h-full max-w-md">
      <text x="210" y="20" textAnchor="middle" fill="#8b5cf6" fontSize="13" fontWeight="bold">
        MTD · RTO · RPO — مقاييس التعافي
      </text>
      {/* المحور الزمني */}
      <line x1="40" y1="120" x2="380" y2="120" stroke="#475569" strokeWidth="2" />
      <line x1="40" y1="115" x2="40" y2="125" stroke="#475569" strokeWidth="2" />
      <line x1="380" y1="115" x2="380" y2="125" stroke="#475569" strokeWidth="2" />
      <text x="40" y="150" textAnchor="middle" fill="#94a3b8" fontSize="9">الكارثة</text>
      <text x="380" y="150" textAnchor="middle" fill="#94a3b8" fontSize="9">الوقت</text>

      {/* MTD */}
      <line x1="40" y1="60" x2="380" y2="60" stroke="#ef4444" strokeWidth="2" strokeDasharray="4,3" />
      <text x="210" y="52" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">
        MTD (أقصى توقف مسموح)
      </text>

      {/* RTO */}
      <line x1="40" y1="80" x2="280" y2="80" stroke="#f59e0b" strokeWidth="2.5" />
      <text x="160" y="72" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
        RTO (هدف زمن التعافي)
      </text>

      {/* RPO */}
      <line x1="40" y1="100" x2="180" y2="100" stroke="#10b981" strokeWidth="2.5" />
      <text x="110" y="92" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">
        RPO (كم بيانات نقبل فقدها)
      </text>

      <text x="210" y="180" textAnchor="middle" fill="#64748b" fontSize="9">
        RTO يجب أن يكون أقل من MTD دائمًا
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   ISE232-Risk — المخططات الجديدة
   ═══════════════════════════════════════════════════════════ */

function OctaveAllegroPhases() {
  const phases = [
    { name: 'المرحلة 1', sub: 'معايير القياس', color: '#3b82f6' },
    { name: 'المرحلة 2', sub: 'ملفات الأصول', color: '#10b981' },
    { name: 'المرحلة 3', sub: 'التهديدات', color: '#f59e0b' },
    { name: 'المرحلة 4', sub: 'المخاطر', color: '#ef4444' },
  ];
  return (
    <svg viewBox="0 0 420 240" className="w-full h-full max-w-md">
      <text x="210" y="20" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="bold">
        منهجية OCTAVE Allegro — 4 مراحل
      </text>
      {phases.map((p, i) => {
        const x = 40 + i * 95;
        return (
          <g key={i}>
            <rect x={x} y="70" width="80" height="90" rx="10" fill="#1e293b" stroke={p.color} strokeWidth="2" />
            <text x={x + 40} y="95" textAnchor="middle" fill={p.color} fontSize="10" fontWeight="bold">
              {p.name}
            </text>
            <text x={x + 40} y="120" textAnchor="middle" fill="#e2e8f0" fontSize="9">
              {p.sub}
            </text>
            <text x={x + 40} y="140" textAnchor="middle" fill="#64748b" fontSize="8">
              ورقة عمل
            </text>
            {i < 3 && (
              <path
                d={`M ${x + 80} 115 L ${x + 95} 115`}
                stroke={p.color}
                strokeWidth="2"
                markerEnd="url(#arrowRisk)"
              />
            )}
          </g>
        );
      })}
      <defs>
        <marker id="arrowRisk" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill="#64748b" />
        </marker>
      </defs>
      <text x="210" y="190" textAnchor="middle" fill="#64748b" fontSize="9">
        خطوات متسلسلة من معايير القياس إلى اختيار الاستراتيجية
      </text>
    </svg>
  );
}

function ThreatTree() {
  return (
    <svg viewBox="0 0 420 280" className="w-full h-full max-w-md">
      <text x="210" y="20" textAnchor="middle" fill="#ef4444" fontSize="13" fontWeight="bold">
        شجرة تصنيف التهديدات
      </text>
      {/* الجذر */}
      <rect x="155" y="40" width="110" height="35" rx="8" fill="#7c2d12" stroke="#f59e0b" strokeWidth="2" />
      <text x="210" y="62" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">التهديدات</text>

      {/* 4 فروع */}
      {[
        { x: 40, label: 'فاعل بشري\nبوسائل تقنية', color: '#3b82f6' },
        { x: 140, label: 'فاعل بشري\nبوصول مادي', color: '#10b981' },
        { x: 240, label: 'مشكلات\nتقنية', color: '#f59e0b' },
        { x: 340, label: 'مشكلات\nأخرى', color: '#8b5cf6' },
      ].map((b, i) => (
        <g key={i}>
          <line x1="210" y1="75" x2={b.x + 20} y2="130" stroke={b.color} strokeWidth="1.5" />
          <rect x={b.x} y="130" width="80" height="50" rx="6" fill="#1e293b" stroke={b.color} strokeWidth="1.5" />
          <text x={b.x + 40} y="152" textAnchor="middle" fill={b.color} fontSize="9" fontWeight="bold">
            {b.label.split('\n')[0]}
          </text>
          <text x={b.x + 40} y="168" textAnchor="middle" fill={b.color} fontSize="9">
            {b.label.split('\n')[1]}
          </text>
        </g>
      ))}

      <text x="210" y="220" textAnchor="middle" fill="#64748b" fontSize="9">
        كل فرع ينقسم إلى: متعمد / غير متعمد
      </text>
      <text x="210" y="240" textAnchor="middle" fill="#64748b" fontSize="9">
        النتائج: إفشاء · تعديل · فقدان · انقطاع
      </text>
    </svg>
  );
}

function RiskMatrix5x5() {
  const getColor = (impact: number, likelihood: number) => {
    const score = impact * likelihood;
    if (score >= 15) return '#ef4444';
    if (score >= 8) return '#f59e0b';
    return '#10b981';
  };
  return (
    <svg viewBox="0 0 420 280" className="w-full h-full max-w-md">
      <text x="210" y="20" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="bold">
        مصفوفة المخاطر 5×5
      </text>
      <text x="30" y="150" textAnchor="middle" fill="#94a3b8" fontSize="10" transform="rotate(-90 30 150)">
        الاحتمالية →
      </text>
      <text x="210" y="270" textAnchor="middle" fill="#94a3b8" fontSize="10">الأثر →</text>

      {[5, 4, 3, 2, 1].map((likelihood, row) =>
        [1, 2, 3, 4, 5].map((impact, col) => {
          const x = 60 + col * 60;
          const y = 40 + row * 42;
          const score = impact * likelihood;
          return (
            <g key={`${row}-${col}`}>
              <rect
                x={x}
                y={y}
                width="58"
                height="40"
                rx="4"
                fill={getColor(impact, likelihood)}
                fillOpacity="0.3"
                stroke={getColor(impact, likelihood)}
                strokeWidth="1.5"
              />
              <text x={x + 29} y={y + 24} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">
                {score}
              </text>
            </g>
          );
        })
      )}
      <text x="210" y="32" textAnchor="middle" fill="#ef4444" fontSize="9">
        🔴 حرج (15-25) · 🟠 متوسط (8-12) · 🟢 منخفض (1-6)
      </text>
    </svg>
  );
}

function TreatmentArrows() {
  return (
    <svg viewBox="0 0 420 240" className="w-full h-full max-w-md">
      <text x="210" y="20" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="bold">
        استراتيجيات معالجة المخاطر الأربع
      </text>
      {[
        { label: 'التخفيف', sub: 'Mitigate', color: '#10b981', icon: '🛡' },
        { label: 'النقل', sub: 'Transfer', color: '#3b82f6', icon: '📤' },
        { label: 'التجنب', sub: 'Avoid', color: '#8b5cf6', icon: '⛔' },
        { label: 'القبول', sub: 'Accept', color: '#f59e0b', icon: '✓' },
      ].map((t, i) => {
        const x = 30 + (i % 2) * 200;
        const y = 60 + Math.floor(i / 2) * 80;
        return (
          <g key={i}>
            <rect x={x} y={y} width="170" height="60" rx="10" fill="#1e293b" stroke={t.color} strokeWidth="2" />
            <text x={x + 20} y={y + 30} fill={t.color} fontSize="20">{t.icon}</text>
            <text x={x + 55} y={y + 25} fill="#e2e8f0" fontSize="12" fontWeight="bold">
              {t.label}
            </text>
            <text x={x + 55} y={y + 45} fill={t.color} fontSize="10" fontFamily="monospace">
              {t.sub}
            </text>
          </g>
        );
      })}
      <text x="210" y="225" textAnchor="middle" fill="#64748b" fontSize="9">
        المتبقي = ما يبقى بعد التخفيف ويجب أن يكون مقبولاً
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   ISE232-Threats — المخططات الجديدة
   ═══════════════════════════════════════════════════════════ */

function CIATriad() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full max-w-md">
      <text x="200" y="25" textAnchor="middle" fill="#8b5cf6" fontSize="13" fontWeight="bold">
        ثالوث CIA
      </text>
      {/* المثلث */}
      <polygon points="200,60 100,240 300,240" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="4,3" />

      {/* السرية */}
      <circle cx="200" cy="60" r="35" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
      <text x="200" y="58" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">السرية</text>
      <text x="200" y="72" textAnchor="middle" fill="#6ee7b7" fontSize="8" fontFamily="monospace">Confidentiality</text>

      {/* التكامل */}
      <circle cx="100" cy="240" r="35" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2.5" />
      <text x="100" y="238" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">التكامل</text>
      <text x="100" y="252" textAnchor="middle" fill="#93c5fd" fontSize="8" fontFamily="monospace">Integrity</text>

      {/* التوافر */}
      <circle cx="300" cy="240" r="35" fill="#7c2d12" stroke="#f59e0b" strokeWidth="2.5" />
      <text x="300" y="238" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">التوافر</text>
      <text x="300" y="252" textAnchor="middle" fill="#fcd34d" fontSize="8" fontFamily="monospace">Availability</text>

      {/* المركز */}
      <circle cx="200" cy="180" r="28" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
      <text x="200" y="184" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontWeight="bold">الأصل</text>

      <text x="200" y="290" textAnchor="middle" fill="#64748b" fontSize="9">
        أي هجوم يمس واحدًا أو أكثر من هذه الأضلاع
      </text>
    </svg>
  );
}

function MalwareTaxonomy() {
  const types = [
    { name: 'فيروس', sub: 'يحتاج تدخل', color: '#ef4444' },
    { name: 'دودة', sub: 'ذاتية الانتشار', color: '#f59e0b' },
    { name: 'تروجان', sub: 'يتنكر', color: '#8b5cf6' },
    { name: 'فدية', sub: 'تشفير + فدية', color: '#dc2626' },
  ];
  return (
    <svg viewBox="0 0 420 240" className="w-full h-full max-w-md">
      <text x="210" y="22" textAnchor="middle" fill="#ef4444" fontSize="13" fontWeight="bold">
        تصنيف البرمجيات الخبيثة (Malware)
      </text>
      <rect x="160" y="45" width="100" height="35" rx="8" fill="#7c2d12" stroke="#f59e0b" strokeWidth="2" />
      <text x="210" y="67" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Malware</text>

      {types.map((t, i) => {
        const x = 20 + i * 100;
        return (
          <g key={i}>
            <line x1="210" y1="80" x2={x + 40} y2="120" stroke={t.color} strokeWidth="1.5" />
            <rect x={x} y="120" width="80" height="60" rx="8" fill="#1e293b" stroke={t.color} strokeWidth="2" />
            <text x={x + 40} y="145" textAnchor="middle" fill={t.color} fontSize="11" fontWeight="bold">
              {t.name}
            </text>
            <text x={x + 40} y="165" textAnchor="middle" fill="#94a3b8" fontSize="8">
              {t.sub}
            </text>
          </g>
        );
      })}
      <text x="210" y="215" textAnchor="middle" fill="#64748b" fontSize="9">
        الأنواع متداخلة — قد تُوزَّع الفدية فيروسًا أو تروجانًا
      </text>
    </svg>
  );
}

function CyberKillchain() {
  const stages = [
    'استطلاع', 'تسليح', 'إيصال', 'استغلال', 'تثبيت', 'C2', 'تسريب',
  ];
  return (
    <svg viewBox="0 0 440 180" className="w-full h-full max-w-lg">
      <text x="220" y="20" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="bold">
        سلسلة الهجوم السيبراني — 7 مراحل
      </text>
      {stages.map((s, i) => {
        const x = 15 + i * 60;
        return (
          <g key={i}>
            <rect x={x} y="60" width="55" height="45" rx="6" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
            <text x={x + 27} y="82" textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">
              {s}
            </text>
            <text x={x + 27} y="95" textAnchor="middle" fill="#64748b" fontSize="8">
              {i + 1}
            </text>
            {i < stages.length - 1 && (
              <path
                d={`M ${x + 55} 82 L ${x + 60} 82`}
                stroke="#3b82f6"
                strokeWidth="2"
                markerEnd="url(#kcArrow)"
              />
            )}
          </g>
        );
      })}
      <defs>
        <marker id="kcArrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="#3b82f6" />
        </marker>
      </defs>
      <text x="220" y="140" textAnchor="middle" fill="#64748b" fontSize="9">
        ظهور مؤشر في مرحلة يعني أن الهجوم بلغها على الأقل
      </text>
    </svg>
  );
}

function IDSvsIPS() {
  return (
    <svg viewBox="0 0 420 240" className="w-full h-full max-w-md">
      <text x="210" y="20" textAnchor="middle" fill="#10b981" fontSize="13" fontWeight="bold">
        IDS vs IPS
      </text>
      {/* IDS */}
      <rect x="30" y="50" width="170" height="150" rx="10" fill="#064e3b" fillOpacity="0.3" stroke="#10b981" strokeWidth="2" />
      <text x="115" y="75" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">
        IDS — كشف
      </text>
      <text x="115" y="100" textAnchor="middle" fill="#e2e8f0" fontSize="9">يراقب ويُبلغ</text>
      <text x="115" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">لا يقطع الاتصال</text>
      <text x="115" y="145" textAnchor="middle" fill="#94a3b8" fontSize="8">القرار: فريق الأمن</text>
      <text x="115" y="170" textAnchor="middle" fill="#64748b" fontSize="8">موضع: خارج مسار الحركة</text>

      {/* IPS */}
      <rect x="220" y="50" width="170" height="150" rx="10" fill="#1e3a8a" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2" />
      <text x="305" y="75" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">
        IPS — منع
      </text>
      <text x="305" y="100" textAnchor="middle" fill="#e2e8f0" fontSize="9">يراقب ويقطع</text>
      <text x="305" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">آلياً عند الرصد</text>
      <text x="305" y="145" textAnchor="middle" fill="#94a3b8" fontSize="8">القرار: النظام نفسه</text>
      <text x="305" y="170" textAnchor="middle" fill="#64748b" fontSize="8">موضع: في مسار الحركة</text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   ISE232-Programs — المخططات الجديدة
   ═══════════════════════════════════════════════════════════ */

function ECCPyramid() {
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full max-w-md">
      <text x="200" y="20" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="bold">
        ECC-2:2024 — المكونات الأربعة
      </text>
      {[
        { label: 'حوكمة الأمن السيبراني', y: 50, color: '#f59e0b', width: 200 },
        { label: 'تعزيز الأمن السيبراني', y: 110, color: '#3b82f6', width: 240 },
        { label: 'صمود الأمن السيبراني', y: 170, color: '#10b981', width: 280 },
        { label: 'الأمن المتعلق بالأطراف الخارجية والسحابة', y: 230, color: '#8b5cf6', width: 320 },
      ].map((p, i) => (
        <g key={i}>
          <rect
            x={200 - p.width / 2}
            y={p.y}
            width={p.width}
            height="45"
            rx="6"
            fill="#1e293b"
            stroke={p.color}
            strokeWidth="2"
          />
          <text x="200" y={p.y + 28} textAnchor="middle" fill={p.color} fontSize="10" fontWeight="bold">
            {i + 1}. {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function AccessControlFlow() {
  return (
    <svg viewBox="0 0 420 200" className="w-full h-full max-w-md">
      <text x="210" y="22" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="bold">
        التحكم في الوصول — من الهوية إلى البيانات
      </text>
      {[
        { label: 'المستخدم', x: 40, color: '#64748b' },
        { label: 'المصادقة', x: 130, color: '#10b981' },
        { label: 'الصلاحيات', x: 230, color: '#f59e0b' },
        { label: 'الوصول', x: 320, color: '#3b82f6' },
      ].map((s, i) => (
        <g key={i}>
          <circle cx={s.x + 30} cy="100" r="35" fill="#1e293b" stroke={s.color} strokeWidth="2.5" />
          <text x={s.x + 30} y="105" textAnchor="middle" fill={s.color} fontSize="10" fontWeight="bold">
            {s.label}
          </text>
          {i < 3 && (
            <path
              d={`M ${s.x + 65} 100 L ${s.x + 90} 100`}
              stroke="#475569"
              strokeWidth="2"
              markerEnd="url(#acArrow)"
            />
          )}
        </g>
      ))}
      <defs>
        <marker id="acArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill="#475569" />
        </marker>
      </defs>
      <text x="210" y="175" textAnchor="middle" fill="#64748b" fontSize="9">
        المصادقة = من أنت؟ · الصلاحيات = ماذا يحق لك؟
      </text>
    </svg>
  );
}

function MFAFactors() {
  return (
    <svg viewBox="0 0 420 240" className="w-full h-full max-w-md">
      <text x="210" y="22" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="bold">
        المصادقة متعددة العوامل (MFA)
      </text>
      {[
        { icon: '🧠', title: 'شيء تعرفه', sub: 'كلمة المرور', color: '#10b981', x: 40 },
        { icon: '🔑', title: 'شيء تملكه', sub: 'بطاقة / Token', color: '#3b82f6', x: 160 },
        { icon: '👁', title: 'شيء منك', sub: 'بصمة / وجه', color: '#8b5cf6', x: 280 },
      ].map((f, i) => (
        <g key={i}>
          <circle cx={f.x + 50} cy="120" r="45" fill="#1e293b" stroke={f.color} strokeWidth="2.5" />
          <text x={f.x + 50} y="115" textAnchor="middle" fill={f.color} fontSize="24">{f.icon}</text>
          <text x={f.x + 50} y="140" textAnchor="middle" fill="#e2e8f0" fontSize="9" fontWeight="bold">
            {f.title}
          </text>
          <text x={f.x + 50} y="190" textAnchor="middle" fill={f.color} fontSize="9">
            {f.sub}
          </text>
        </g>
      ))}
      <text x="210" y="220" textAnchor="middle" fill="#64748b" fontSize="9">
        MFA = عاملان على الأقل من فئات مختلفة (ليس نفس الفئة مرتين)
      </text>
    </svg>
  );
}

function DefenseInDepth() {
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full max-w-md">
      <text x="200" y="20" textAnchor="middle" fill="#8b5cf6" fontSize="13" fontWeight="bold">
        الدفاع المتعمق (Defense in Depth)
      </text>
      {[
        { label: 'المستخدمون', color: '#64748b', w: 280, y: 50 },
        { label: 'السياسات', color: '#8b5cf6', w: 240, y: 90 },
        { label: 'جدار الحماية', color: '#3b82f6', w: 200, y: 130 },
        { label: 'التشفير', color: '#10b981', w: 160, y: 170 },
        { label: 'البيانات', color: '#f59e0b', w: 120, y: 210 },
      ].map((layer, i) => (
        <rect
          key={i}
          x={200 - layer.w / 2}
          y={layer.y}
          width={layer.w}
          height="32"
          rx="6"
          fill="#1e293b"
          stroke={layer.color}
          strokeWidth="2"
        />
      ))}
      {[
        { label: 'المستخدمون', color: '#64748b', y: 72 },
        { label: 'السياسات', color: '#8b5cf6', y: 112 },
        { label: 'جدار الحماية', color: '#3b82f6', y: 152 },
        { label: 'التشفير', color: '#10b981', y: 192 },
        { label: 'البيانات', color: '#f59e0b', y: 232 },
      ].map((layer, i) => (
        <text key={i} x="200" y={layer.y} textAnchor="middle" fill={layer.color} fontSize="10" fontWeight="bold">
          {layer.label}
        </text>
      ))}
      <text x="200" y="270" textAnchor="middle" fill="#64748b" fontSize="8">
        سقوط طبقة لا يعني سقوط المنظومة كلها
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   ISE231 — مخططات إضافية (6)
   ═══════════════════════════════════════════════════════════ */

function CSF_Functions() {
  const funcs = [
    { code: 'GV', name: 'الحوكمة', color: '#f59e0b' },
    { code: 'ID', name: 'التحديد', color: '#3b82f6' },
    { code: 'PR', name: 'الحماية', color: '#10b981' },
    { code: 'DE', name: 'الاكتشاف', color: '#8b5cf6' },
    { code: 'RS', name: 'الاستجابة', color: '#ef4444' },
    { code: 'RC', name: 'التعافي', color: '#06b6d4' },
  ];
  return (
    <svg viewBox="0 0 420 200" className="w-full h-full max-w-md">
      <text x="210" y="22" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="bold">
        وظائف CSF الست — العلاقة الدائرية
      </text>
      {funcs.map((f, i) => {
        const angle = (i * 60 - 90) * (Math.PI / 180);
        const cx = 210 + Math.cos(angle) * 70;
        const cy = 115 + Math.sin(angle) * 70;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r="28" fill="#1e293b" stroke={f.color} strokeWidth="2" />
            <text x={cx} y={cy - 3} textAnchor="middle" fill={f.color} fontSize="9" fontWeight="bold">
              {f.code}
            </text>
            <text x={cx} y={cy + 10} textAnchor="middle" fill={f.color} fontSize="7">
              {f.name}
            </text>
          </g>
        );
      })}
      <text x="210" y="192" textAnchor="middle" fill="#64748b" fontSize="9">
        الحوكمة في المركز — توجه الخمس الأخرى
      </text>
    </svg>
  );
}

function AssetLifecycle() {
  const stages = ['اقتناء', 'استخدام', 'نقل', 'حفظ', 'إتلاف'];
  return (
    <svg viewBox="0 0 420 200" className="w-full h-full max-w-md">
      <text x="210" y="22" textAnchor="middle" fill="#10b981" fontSize="13" fontWeight="bold">
        دورة حياة الأصل — 5 مراحل
      </text>
      {stages.map((s, i) => {
        const x = 30 + i * 78;
        return (
          <g key={i}>
            <rect x={x} y="70" width="70" height="60" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
            <text x={x + 35} y="103" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
              {s}
            </text>
            <text x={x + 35} y="120" textAnchor="middle" fill="#64748b" fontSize="8">
              مرحلة {i + 1}
            </text>
            {i < 4 && (
              <path d={`M ${x + 70} 100 L ${x + 78} 100`} stroke="#10b981" strokeWidth="1.5" markerEnd="url(#arrowAL)" />
            )}
          </g>
        );
      })}
      <defs>
        <marker id="arrowAL" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="#10b981" />
        </marker>
      </defs>
      <text x="210" y="170" textAnchor="middle" fill="#64748b" fontSize="9">
        كل مرحلة تتطلب ضوابط حماية مختلفة
      </text>
    </svg>
  );
}

function PolicyHierarchy() {
  return (
    <svg viewBox="0 0 400 260" className="w-full h-full max-w-md">
      <text x="200" y="22" textAnchor="middle" fill="#8b5cf6" fontSize="13" fontWeight="bold">
        هرمية الوثائق الأمنية
      </text>
      {[
        { label: 'السياسة (Policy)', sub: 'ماذا ومن المسؤول', w: 200, y: 50, color: '#f59e0b' },
        { label: 'المعيار (Standard)', sub: 'بأي قيمة', w: 160, y: 105, color: '#3b82f6' },
        { label: 'الإجراء (Procedure)', sub: 'كيف ومن ومتى', w: 120, y: 160, color: '#10b981' },
        { label: 'الدليل (Guideline)', sub: 'تفسير التطبيق', w: 80, y: 215, color: '#8b5cf6' },
      ].map((d, i) => (
        <g key={i}>
          <rect
            x={200 - d.w / 2}
            y={d.y}
            width={d.w}
            height="40"
            rx="6"
            fill="#1e293b"
            stroke={d.color}
            strokeWidth="2"
          />
          <text x="200" y={d.y + 18} textAnchor="middle" fill={d.color} fontSize="10" fontWeight="bold">
            {d.label}
          </text>
          <text x="200" y={d.y + 32} textAnchor="middle" fill="#94a3b8" fontSize="8">
            {d.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}

function StrategyRoadmap() {
  const milestones = [
    { q: 'Q1', label: 'تقييم الوضع', color: '#3b82f6' },
    { q: 'Q2', label: 'بناء القدرات', color: '#10b981' },
    { q: 'Q3', label: 'التنفيذ', color: '#f59e0b' },
    { q: 'Q4', label: 'المراقبة', color: '#ef4444' },
  ];
  return (
    <svg viewBox="0 0 420 200" className="w-full h-full max-w-md">
      <text x="210" y="22" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="bold">
        خارطة الطريق الاستراتيجية — 4 أرباع
      </text>
      <line x1="40" y1="120" x2="380" y2="120" stroke="#475569" strokeWidth="3" />
      {milestones.map((m, i) => {
        const x = 60 + i * 90;
        return (
          <g key={i}>
            <circle cx={x} cy="120" r="14" fill={m.color} />
            <text x={x} y={125} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">
              {m.q}
            </text>
            <rect x={x - 35} y="150" width="70" height="30" rx="4" fill="#1e293b" stroke={m.color} strokeWidth="1.5" />
            <text x={x} y={170} textAnchor="middle" fill={m.color} fontSize="8" fontWeight="bold">
              {m.label}
            </text>
          </g>
        );
      })}
      <text x="210" y="195" textAnchor="middle" fill="#64748b" fontSize="8">
        خطة سنوية قابلة للتعديل حسب الأولويات
      </text>
    </svg>
  );
}

function PDCA_Cycle() {
  const stages = ['Plan', 'Do', 'Check', 'Act'];
  return (
    <svg viewBox="0 0 300 280" className="w-full h-full max-w-md">
      <text x="150" y="22" textAnchor="middle" fill="#10b981" fontSize="13" fontWeight="bold">
        دورة PDCA — التحسين المستمر
      </text>
      {stages.map((s, i) => {
        const angle = (i * 90 - 90) * (Math.PI / 180);
        const x = 150 + Math.cos(angle) * 80;
        const y = 145 + Math.sin(angle) * 80;
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="35" fill="#1e293b" stroke={colors[i]} strokeWidth="2.5" />
            <text x={x} y={y + 4} textAnchor="middle" fill={colors[i]} fontSize="12" fontWeight="bold">
              {s}
            </text>
          </g>
        );
      })}
      <circle cx="150" cy="145" r="20" fill="#0f172a" stroke="#64748b" strokeDasharray="3,3" />
      <text x="150" y="195" textAnchor="middle" fill="#64748b" fontSize="9">
        🔄 التكرار المستمر
      </text>
    </svg>
  );
}

function FourPhasesRoadmap() {
  const phases = ['حوكمة', 'تقييم', 'استراتيجية', 'تبرير'];
  return (
    <svg viewBox="0 0 420 180" className="w-full h-full max-w-md">
      <text x="210" y="22" textAnchor="middle" fill="#8b5cf6" fontSize="13" fontWeight="bold">
        دراسة حالة روافد التقنية — 4 مراحل
      </text>
      {phases.map((p, i) => {
        const x = 30 + i * 95;
        return (
          <g key={i}>
            <rect x={x} y="60" width="85" height="80" rx="10" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
            <text x={x + 42} y="85" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontWeight="bold">
              المرحلة {i + 1}
            </text>
            <text x={x + 42} y="105" textAnchor="middle" fill="#e2e8f0" fontSize="9">
              {p}
            </text>
            <text x={x + 42} y="125" textAnchor="middle" fill="#64748b" fontSize="8">
              أسبوع {i + 1}
            </text>
          </g>
        );
      })}
      <text x="210" y="165" textAnchor="middle" fill="#64748b" fontSize="9">
        التسليم النهائي في الأسبوع 6
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   ISE232-Risk — مخططات إضافية (5)
   ═══════════════════════════════════════════════════════════ */

function Octave8Steps() {
  const steps = ['معايير', 'ملف الأصل', 'الحاويات', 'مجالات القلق', 'سيناريوهات', 'عواقب', 'تحليل', 'استراتيجية'];
  return (
    <svg viewBox="0 0 440 260" className="w-full h-full max-w-lg">
      <text x="220" y="22" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="bold">
        OCTAVE Allegro — 8 خطوات
      </text>
      {steps.map((s, i) => {
        const row = Math.floor(i / 4);
        const col = i % 4;
        const x = 15 + col * 105;
        const y = 50 + row * 90;
        return (
          <g key={i}>
            <rect x={x} y={y} width="95" height="65" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
            <text x={x + 47} y={y + 20} textAnchor="middle" fill="#60a5fa" fontSize="9" fontWeight="bold">
              خطوة {i + 1}
            </text>
            <text x={x + 47} y={y + 40} textAnchor="middle" fill="#e2e8f0" fontSize="9">
              {s}
            </text>
            <text x={x + 47} y={y + 55} textAnchor="middle" fill="#64748b" fontSize="7">
              ورقة {i + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function AnalysisSpectrum() {
  return (
    <svg viewBox="0 0 420 220" className="w-full h-full max-w-md">
      <text x="210" y="22" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="bold">
        طيف أساليب تحليل المخاطر
      </text>
      <defs>
        <linearGradient id="spectrum" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
      <rect x="30" y="60" width="360" height="30" rx="15" fill="url(#spectrum)" opacity="0.6" />
      <text x="70" y="80" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">نوعي</text>
      <text x="210" y="80" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">شبه كمي</text>
      <text x="350" y="80" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">كمي</text>

      <rect x="30" y="120" width="110" height="60" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
      <text x="85" y="140" textAnchor="middle" fill="#34d399" fontSize="9">مرتفع/متوسط/منخفض</text>
      <text x="85" y="160" textAnchor="middle" fill="#64748b" fontSize="8">وصفي</text>

      <rect x="155" y="120" width="110" height="60" rx="6" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="210" y="140" textAnchor="middle" fill="#fbbf24" fontSize="9">درجة نسبية</text>
      <text x="210" y="160" textAnchor="middle" fill="#64748b" fontSize="8">للترتيب فقط</text>

      <rect x="280" y="120" width="110" height="60" rx="6" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" />
      <text x="335" y="140" textAnchor="middle" fill="#f87171" fontSize="9">مبالغ مالية</text>
      <text x="335" y="160" textAnchor="middle" fill="#64748b" fontSize="8">قيم نقدية</text>
    </svg>
  );
}

function WorksheetAnatomy() {
  const fields = ['الأصل', 'مجال القلق', 'الفاعل', 'الوسيلة', 'الدافع', 'النتيجة', 'الاحتمالية', 'الشدة', 'المعالجة'];
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full max-w-md">
      <text x="200" y="22" textAnchor="middle" fill="#8b5cf6" fontSize="13" fontWeight="bold">
        حقول ورقة المخاطر التسعة
      </text>
      {fields.map((f, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const x = 30 + col * 120;
        const y = 50 + row * 70;
        return (
          <g key={i}>
            <rect x={x} y={y} width="110" height="55" rx="6" fill="#1e293b" stroke="#8b5cf6" strokeWidth="1.5" />
            <text x={x + 55} y={y + 20} textAnchor="middle" fill="#c4b5fd" fontSize="9" fontWeight="bold">
              {i + 1}. {f}
            </text>
            <text x={x + 55} y={y + 40} textAnchor="middle" fill="#64748b" fontSize="8">
              حقل
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function NIST800_30Steps() {
  const steps = ['الإعداد', 'الإجراء', 'الإيصال', 'المحافظة'];
  return (
    <svg viewBox="0 0 420 180" className="w-full h-full max-w-md">
      <text x="210" y="22" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="bold">
        NIST SP 800-30 — 4 خطوات
      </text>
      {steps.map((s, i) => {
        const x = 30 + i * 95;
        return (
          <g key={i}>
            <rect x={x} y="60" width="85" height="70" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
            <text x={x + 42} y="85" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">
              {i + 1}
            </text>
            <text x={x + 42} y="110" textAnchor="middle" fill="#e2e8f0" fontSize="10">
              {s}
            </text>
          </g>
        );
      })}
      <text x="210" y="160" textAnchor="middle" fill="#64748b" fontSize="9">
        تقييم متكرر عبر دورة حياة النظام
      </text>
    </svg>
  );
}

function ReportStructure() {
  const sections = ['الغلاف', 'الملخص', 'المنهجية', 'السياق', 'التحليل', 'الأولويات', 'التوصيات', 'الملاحق'];
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full max-w-md">
      <text x="200" y="22" textAnchor="middle" fill="#ef4444" fontSize="13" fontWeight="bold">
        هيكل تقرير تحليل المخاطر
      </text>
      {sections.map((s, i) => {
        const y = 45 + i * 28;
        return (
          <g key={i}>
            <rect x="40" y={y} width="320" height="24" rx="4" fill="#1e293b" stroke="#ef4444" strokeWidth="1" />
            <text x="55" y={y + 16} fill="#f87171" fontSize="9" fontWeight="bold">
              {String(i + 1).padStart(2, '0')}.
            </text>
            <text x="90" y={y + 16} fill="#e2e8f0" fontSize="9">
              {s}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   ISE232-Threats — مخططات إضافية (4)
   ═══════════════════════════════════════════════════════════ */

function AAA_Flow() {
  return (
    <svg viewBox="0 0 400 180" className="w-full h-full max-w-md">
      <text x="200" y="22" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="bold">
        مبادئ AAA
      </text>
      {[
        { label: 'المصادقة', sub: 'من أنت؟', x: 40, color: '#10b981' },
        { label: 'التفويض', sub: 'ماذا يحق لك؟', x: 155, color: '#f59e0b' },
        { label: 'المحاسبة', sub: 'ماذا فعلت؟', x: 270, color: '#3b82f6' },
      ].map((s, i) => (
        <g key={i}>
          <circle cx={s.x + 45} cy="100" r="42" fill="#1e293b" stroke={s.color} strokeWidth="2.5" />
          <text x={s.x + 45} y="100" textAnchor="middle" fill={s.color} fontSize="10" fontWeight="bold">
            {s.label}
          </text>
          <text x={s.x + 45} y="118" textAnchor="middle" fill="#94a3b8" fontSize="8">
            {s.sub}
          </text>
        </g>
      ))}
      <text x="200" y="165" textAnchor="middle" fill="#64748b" fontSize="9">
        Authentication · Authorization · Accounting
      </text>
    </svg>
  );
}

function EspionageRecon() {
  return (
    <svg viewBox="0 0 420 220" className="w-full h-full max-w-md">
      <text x="210" y="22" textAnchor="middle" fill="#ef4444" fontSize="13" fontWeight="bold">
        مراحل التجسس الإلكتروني
      </text>
      {[
        { label: 'SNMP', sub: 'المنفذ 161', color: '#3b82f6' },
        { label: 'مسح', sub: 'nmap', color: '#f59e0b' },
        { label: 'اعتراض', sub: 'MitM', color: '#10b981' },
        { label: 'تسريب', sub: 'بيانات', color: '#ef4444' },
      ].map((s, i) => {
        const x = 30 + i * 95;
        return (
          <g key={i}>
            <rect x={x} y="70" width="85" height="70" rx="8" fill="#1e293b" stroke={s.color} strokeWidth="2" />
            <text x={x + 42} y="100" textAnchor="middle" fill={s.color} fontSize="11" fontWeight="bold">
              {s.label}
            </text>
            <text x={x + 42} y="120" textAnchor="middle" fill="#94a3b8" fontSize="9">
              {s.sub}
            </text>
            {i < 3 && <path d={`M ${x + 85} 105 L ${x + 95} 105`} stroke={s.color} strokeWidth="1.5" markerEnd="url(#espArrow)" />}
          </g>
        );
      })}
      <defs>
        <marker id="espArrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="#475569" />
        </marker>
      </defs>
      <text x="210" y="180" textAnchor="middle" fill="#64748b" fontSize="9">
        من جمع المعلومات إلى استغلالها
      </text>
    </svg>
  );
}

function IT_vs_OT() {
  return (
    <svg viewBox="0 0 400 260" className="w-full h-full max-w-md">
      <text x="200" y="22" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="bold">
        تقنية المعلومات vs التقنية التشغيلية
      </text>
      <rect x="30" y="50" width="170" height="180" rx="10" fill="#1e3a8a" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="2" />
      <text x="115" y="75" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="bold">IT</text>
      <text x="115" y="105" textAnchor="middle" fill="#e2e8f0" fontSize="9">الغاية: سرية البيانات</text>
      <text x="115" y="130" textAnchor="middle" fill="#e2e8f0" fontSize="9">الأولوية: CIA</text>
      <text x="115" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="9">الخطأ = فقد بيانات</text>
      <text x="115" y="180" textAnchor="middle" fill="#e2e8f0" fontSize="9">التحديثات: معتادة</text>
      <text x="115" y="205" textAnchor="middle" fill="#94a3b8" fontSize="8">مثال: خادم بريد، ERP</text>

      <rect x="200" y="50" width="170" height="180" rx="10" fill="#7c2d12" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="2" />
      <text x="285" y="75" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">OT</text>
      <text x="285" y="105" textAnchor="middle" fill="#e2e8f0" fontSize="9">الغاية: سلامة العمليات</text>
      <text x="285" y="130" textAnchor="middle" fill="#e2e8f0" fontSize="9">الأولوية: التوافر</text>
      <text x="285" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="9">الخطأ = ضرر مادي</text>
      <text x="285" y="180" textAnchor="middle" fill="#e2e8f0" fontSize="9">التحديثات: حذرة جداً</text>
      <text x="285" y="205" textAnchor="middle" fill="#94a3b8" fontSize="8">مثال: SCADA، PLC</text>
    </svg>
  );
}

function AIThreats() {
  return (
    <svg viewBox="0 0 420 240" className="w-full h-full max-w-md">
      <text x="210" y="22" textAnchor="middle" fill="#8b5cf6" fontSize="13" fontWeight="bold">
        تهديدات الذكاء الاصطناعي
      </text>
      <rect x="155" y="45" width="110" height="40" rx="8" fill="#7c2d12" stroke="#8b5cf6" strokeWidth="2" />
      <text x="210" y="70" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="bold">نظام AI</text>

      {[
        { label: 'تسميم البيانات', color: '#ef4444', x: 30 },
        { label: 'حقن الأوامر', color: '#f59e0b', x: 130 },
        { label: 'التحيز', color: '#10b981', x: 240 },
        { label: 'الخصوصية', color: '#3b82f6', x: 340 },
      ].map((t, i) => (
        <g key={i}>
          <line x1="210" y1="85" x2={t.x} y2="130" stroke={t.color} strokeWidth="1.5" />
          <rect x={t.x - 5} y="130" width="90" height="50" rx="6" fill="#1e293b" stroke={t.color} strokeWidth="1.5" />
          <text x={t.x + 40} y="160" textAnchor="middle" fill={t.color} fontSize="9" fontWeight="bold">
            {t.label}
          </text>
        </g>
      ))}
      <text x="210" y="220" textAnchor="middle" fill="#64748b" fontSize="9">
        الدفاع: حواجز الحماية + الأمن بالتصميم + المراقبة
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   ISE232-Programs — مخططات إضافية (4)
   ═══════════════════════════════════════════════════════════ */

function AssetCategories() {
  const cats = [
    { label: 'مادي', color: '#3b82f6', icon: '🖥' },
    { label: 'بشري', color: '#10b981', icon: '👤' },
    { label: 'برمجي', color: '#f59e0b', icon: '💾' },
    { label: 'رقمي', color: '#8b5cf6', icon: '📁' },
    { label: 'معلوماتي', color: '#ef4444', icon: '📊' },
  ];
  return (
    <svg viewBox="0 0 420 200" className="w-full h-full max-w-md">
      <text x="210" y="22" textAnchor="middle" fill="#10b981" fontSize="13" fontWeight="bold">
        فئات الأصول الخمس
      </text>
      {cats.map((c, i) => {
        const x = 20 + i * 78;
        return (
          <g key={i}>
            <rect x={x} y="60" width="70" height="90" rx="8" fill="#1e293b" stroke={c.color} strokeWidth="2" />
            <text x={x + 35} y="95" textAnchor="middle" fontSize="24">{c.icon}</text>
            <text x={x + 35} y="125" textAnchor="middle" fill={c.color} fontSize="10" fontWeight="bold">
              {c.label}
            </text>
          </g>
        );
      })}
      <text x="210" y="185" textAnchor="middle" fill="#64748b" fontSize="9">
        الجرد الشامل = حماية كل نوع
      </text>
    </svg>
  );
}

function PatchCycle() {
  const steps = ['اكتشاف', 'تقييم', 'اختبار', 'نشر', 'مراقبة'];
  return (
    <svg viewBox="0 0 420 200" className="w-full h-full max-w-md">
      <text x="210" y="22" textAnchor="middle" fill="#3b82f6" fontSize="13" fontWeight="bold">
        دورة إدارة التحديثات
      </text>
      {steps.map((s, i) => {
        const x = 25 + i * 78;
        return (
          <g key={i}>
            <circle cx={x + 30} cy="100" r="28" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
            <text x={x + 30} y="105" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">
              {s}
            </text>
            {i < 4 && (
              <path d={`M ${x + 58} 100 L ${x + 80} 100`} stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#patchArrow)" />
            )}
          </g>
        );
      })}
      <defs>
        <marker id="patchArrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
          <polygon points="0 0 6 3 0 6" fill="#3b82f6" />
        </marker>
      </defs>
      <text x="210" y="170" textAnchor="middle" fill="#64748b" fontSize="9">
        الاختبار في بيئة معزولة قبل الإنتاج
      </text>
    </svg>
  );
}

function ClassicalVsModernCrypto() {
  return (
    <svg viewBox="0 0 420 240" className="w-full h-full max-w-md">
      <text x="210" y="22" textAnchor="middle" fill="#f59e0b" fontSize="13" fontWeight="bold">
        التشفير الكلاسيكي vs الحديث
      </text>
      <rect x="30" y="50" width="170" height="160" rx="10" fill="#7c2d12" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="2" />
      <text x="115" y="75" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">كلاسيكي</text>
      <text x="115" y="105" textAnchor="middle" fill="#e2e8f0" fontSize="9">شفرة قيصر</text>
      <text x="115" y="130" textAnchor="middle" fill="#e2e8f0" fontSize="9">استبدال</text>
      <text x="115" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="9">فضاء مفاتيح صغير</text>
      <text x="115" y="180" textAnchor="middle" fill="#94a3b8" fontSize="8">سهل الكسر</text>

      <rect x="220" y="50" width="170" height="160" rx="10" fill="#064e3b" fillOpacity="0.3" stroke="#10b981" strokeWidth="2" />
      <text x="305" y="75" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">حديث</text>
      <text x="305" y="105" textAnchor="middle" fill="#e2e8f0" fontSize="9">AES / RSA / ECC</text>
      <text x="305" y="130" textAnchor="middle" fill="#e2e8f0" fontSize="9">رياضيات متقدمة</text>
      <text x="305" y="155" textAnchor="middle" fill="#e2e8f0" fontSize="9">فضاء مفاتيح ضخم</text>
      <text x="305" y="180" textAnchor="middle" fill="#94a3b8" fontSize="8">آمن عملياً</text>
    </svg>
  );
}

function IncidentPhases() {
  const phases = ['تحضير', 'اكتشاف', 'احتواء', 'استئصال', 'تعافي', 'دروس'];
  return (
    <svg viewBox="0 0 420 180" className="w-full h-full max-w-md">
      <text x="210" y="22" textAnchor="middle" fill="#ef4444" fontSize="13" fontWeight="bold">
        مراحل الاستجابة للحوادث
      </text>
      {phases.map((p, i) => {
        const x = 15 + i * 67;
        return (
          <g key={i}>
            <circle cx={x + 27} cy="90" r="22" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
            <text x={x + 27} y="88" textAnchor="middle" fill="#f87171" fontSize="8" fontWeight="bold">
              {p}
            </text>
            <text x={x + 27} y="100" textAnchor="middle" fill="#64748b" fontSize="8">
              {i + 1}
            </text>
            {i < 5 && <path d={`M ${x + 49} 90 L ${x + 65} 90`} stroke="#ef4444" strokeWidth="1" />}
          </g>
        );
      })}
      <text x="210" y="150" textAnchor="middle" fill="#64748b" fontSize="9">
        حفظ الأدلة قبل الاحتواء
      </text>
    </svg>
  );
}

function ForensicTimeline() {
  return (
    <svg viewBox="0 0 440 200" className="w-full h-full max-w-lg">
      <text x="220" y="22" textAnchor="middle" fill="#8b5cf6" fontSize="13" fontWeight="bold">
        الجدول الزمني الجنائي
      </text>
      <line x1="30" y1="110" x2="410" y2="110" stroke="#475569" strokeWidth="3" />
      {[
        { t: '14:00', label: 'تعديل الملف', color: '#f59e0b' },
        { t: '02:15', label: 'إنشاء الملف', color: '#ef4444' },
        { t: '02:20', label: 'وصول الملف', color: '#10b981' },
      ].map((e, i) => {
        const x = 100 + i * 120;
        return (
          <g key={i}>
            <line x1={x} y1="110" x2={x} y2="70" stroke={e.color} strokeWidth="2" />
            <circle cx={x} cy="110" r="6" fill={e.color} />
            <rect x={x - 50} y="40" width="100" height="30" rx="4" fill="#1e293b" stroke={e.color} strokeWidth="1.5" />
            <text x={x} y={58} textAnchor="middle" fill={e.color} fontSize="10" fontWeight="bold">
              {e.t}
            </text>
            <text x={x} y={85} textAnchor="middle" fill="#e2e8f0" fontSize="9">
              {e.label}
            </text>
          </g>
        );
      })}
      <text x="220" y="150" textAnchor="middle" fill="#64748b" fontSize="9">
        MAC times = Modified · Accessed · Created
      </text>
      <text x="220" y="170" textAnchor="middle" fill="#64748b" fontSize="9">
        نافذة البحث: من 02:15 إلى 02:20 لفحص السجلات
      </text>
    </svg>
  );
}
