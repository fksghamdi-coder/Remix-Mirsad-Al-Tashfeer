import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ShieldCheck, 
  ShieldAlert, 
  Cpu, 
  KeyRound, 
  Layers, 
  Info, 
  Sparkles,
  Zap
} from 'lucide-react';

export type CryptoAlgorithm = 'AES' | 'PQC_LATTICE' | 'RSA';

export interface Crypto3DVisualizerProps {
  className?: string;
  initialAlgorithm?: CryptoAlgorithm;
}

export const Crypto3DVisualizer: React.FC<Crypto3DVisualizerProps> = ({
  className = '',
  initialAlgorithm = 'AES',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeAlgorithm, setActiveAlgorithm] = useState<CryptoAlgorithm>(initialAlgorithm);
  const [encryptionRound, setEncryptionRound] = useState<number>(1);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [transformationPhase, setTransformationPhase] = useState<'SubBytes' | 'ShiftRows' | 'MixColumns' | 'AddRoundKey'>('SubBytes');

  // Animation & Canvas references
  const animFrameRef = useRef<number | null>(null);
  const angleRef = useRef<number>(0);
  const isRotatingRef = useRef<boolean>(isRotating);
  isRotatingRef.current = isRotating;

  // Max rounds based on algorithm
  const maxRounds = activeAlgorithm === 'AES' ? 14 : activeAlgorithm === 'PQC_LATTICE' ? 8 : 10;

  // Handle Canvas Rendering
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const canvas = document.createElement('canvas');
    const width = container.clientWidth || 650;
    const height = 380;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = '100%';
    canvas.style.height = `${height}px`;
    canvas.style.display = 'block';
    canvas.style.borderRadius = '14px';
    canvas.style.background = 'radial-gradient(ellipse at center, #090d16 0%, #030712 100%)';
    canvas.style.boxShadow = '0 0 30px rgba(14, 165, 233, 0.15), inset 0 0 20px rgba(2, 6, 23, 0.8)';

    container.innerHTML = '';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localAngle = angleRef.current;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw subtle futuristic cyber grid background
      ctx.save();
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.35)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      if (isRotatingRef.current) {
        localAngle += 0.015;
        angleRef.current = localAngle;
      }

      // ==========================================
      // ALGORITHM 1: AES-256 (3D Matrix Cube of State)
      // ==========================================
      if (activeAlgorithm === 'AES') {
        const cubeSize = 130;
        const cosA = Math.cos(localAngle);
        const sinA = Math.sin(localAngle);
        const pitch = 0.45;

        // Draw 4x4 state matrix vertices in 3D isometric projection
        const cells: Array<{ x: number; y: number; z: number; val: string; active: boolean }> = [];
        const stateMatrixDim = 4;
        const spacing = cubeSize / (stateMatrixDim - 1);

        for (let i = 0; i < stateMatrixDim; i++) {
          for (let j = 0; j < stateMatrixDim; j++) {
            // Coordinate in 3D centered at (0, 0, 0)
            const origX = (i - 1.5) * spacing;
            const origY = (j - 1.5) * spacing;
            const origZ = Math.sin(localAngle + i * 0.4 + encryptionRound) * 18;

            // Rotate around Y-axis
            const rotX = origX * cosA - origZ * sinA;
            const rotZ = origX * sinA + origZ * cosA;

            // Isometric tilt around X-axis
            const projX = centerX + rotX;
            const projY = centerY + origY * Math.cos(pitch) - rotZ * Math.sin(pitch);

            const byteHex = ((i * 16 + j * 4 + encryptionRound * 7) % 256)
              .toString(16)
              .toUpperCase()
              .padStart(2, '0');

            cells.push({
              x: projX,
              y: projY,
              z: rotZ,
              val: byteHex,
              active: (i + j + encryptionRound) % 3 === 0,
            });
          }
        }

        // Draw connecting lattice lines (State Matrix connections)
        ctx.save();
        ctx.lineWidth = 1.2;
        for (let i = 0; i < cells.length; i++) {
          for (let j = i + 1; j < cells.length; j++) {
            const dist = Math.hypot(cells[i].x - cells[j].x, cells[i].y - cells[j].y);
            if (dist < spacing * 1.5) {
              const alpha = Math.max(0.15, 1 - dist / (spacing * 1.6));
              ctx.strokeStyle = `rgba(14, 165, 233, ${alpha * 0.7})`;
              ctx.beginPath();
              ctx.moveTo(cells[i].x, cells[i].y);
              ctx.lineTo(cells[j].x, cells[j].y);
              ctx.stroke();
            }
          }
        }
        ctx.restore();

        // Draw 3D nodes (Bytes of the AES State)
        cells.sort((a, b) => a.z - b.z);
        cells.forEach((cell) => {
          ctx.save();
          const radius = cell.active ? 8 : 5.5;
          const glowGrad = ctx.createRadialGradient(cell.x, cell.y, 1, cell.x, cell.y, radius * 2.5);
          glowGrad.addColorStop(0, cell.active ? 'rgba(56, 189, 248, 1)' : 'rgba(99, 102, 241, 0.9)');
          glowGrad.addColorStop(1, 'rgba(14, 165, 233, 0)');

          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(cell.x, cell.y, radius * 2.2, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = cell.active ? '#38bdf8' : '#818cf8';
          ctx.beginPath();
          ctx.arc(cell.x, cell.y, radius, 0, Math.PI * 2);
          ctx.fill();

          // Text label
          ctx.font = '10px monospace';
          ctx.fillStyle = '#ffffff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(cell.val, cell.x, cell.y - 12);
          ctx.restore();
        });

        // AES Orbit ring (Round transformation cycle)
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, 190, 70, localAngle * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
        ctx.setLineDash([6, 6]);
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      // ==========================================
      // ALGORITHM 2: PQC_LATTICE (Post-Quantum LWE / SVP)
      // ==========================================
      else if (activeAlgorithm === 'PQC_LATTICE') {
        const cosA = Math.cos(localAngle);
        const sinA = Math.sin(localAngle);
        const pitch = 0.5;

        // Render 3D Vector Lattice Grid (LWE Hard Problem)
        const dim = 5;
        const spacing = 45;
        const latticePoints: Array<{ x: number; y: number; z: number; isVectorBasis: boolean }> = [];

        for (let x = -dim; x <= dim; x++) {
          for (let y = -dim; y <= dim; y++) {
            // Lattice vector: v = x*b1 + y*b2 + noise
            const noise = ((Math.sin(x * 12.3 + y * 45.6 + encryptionRound) * 8) % 6);
            const origX = x * spacing;
            const origY = y * spacing + noise;
            const origZ = (Math.cos(x * 0.8 + y * 0.8 + localAngle) * 25);

            const rotX = origX * cosA - origZ * sinA;
            const rotZ = origX * sinA + origZ * cosA;

            const projX = centerX + rotX;
            const projY = centerY + origY * Math.cos(pitch) - rotZ * Math.sin(pitch);

            latticePoints.push({
              x: projX,
              y: projY,
              z: rotZ,
              isVectorBasis: Math.abs(x) <= 1 && Math.abs(y) <= 1,
            });
          }
        }

        // Connect basis vectors
        ctx.save();
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
        ctx.lineWidth = 1;
        for (let i = 0; i < latticePoints.length; i += 3) {
          const pt = latticePoints[i];
          if (pt.isVectorBasis) {
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(pt.x, pt.y);
            ctx.strokeStyle = 'rgba(52, 211, 153, 0.6)';
            ctx.stroke();
          }
        }
        ctx.restore();

        // Render lattice points
        latticePoints.sort((a, b) => a.z - b.z);
        latticePoints.forEach((pt) => {
          ctx.save();
          const radius = pt.isVectorBasis ? 4.5 : 2.5;
          ctx.fillStyle = pt.isVectorBasis ? '#10b981' : 'rgba(52, 211, 153, 0.4)';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // Perturbation vector (Shortest Vector Problem Target)
        const targetX = centerX + Math.cos(localAngle * 2) * 80;
        const targetY = centerY + Math.sin(localAngle * 2) * 40;
        ctx.save();
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(targetX, targetY);
        ctx.stroke();

        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(targetX, targetY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = '10px monospace';
        ctx.fillText('e (Error/SVP)', targetX + 10, targetY - 5);
        ctx.restore();
      }

      // ==========================================
      // ALGORITHM 3: RSA Trapdoor Prime Keyspace
      // ==========================================
      else if (activeAlgorithm === 'RSA') {
        const numRings = 4;
        for (let r = 1; r <= numRings; r++) {
          const radiusX = r * 45;
          const radiusY = r * 22;
          const ringAngle = localAngle * (r % 2 === 0 ? 1 : -1) * 0.8;

          ctx.save();
          ctx.beginPath();
          ctx.ellipse(centerX, centerY, radiusX, radiusY, ringAngle, 0, Math.PI * 2);
          ctx.strokeStyle = r === 2 ? 'rgba(239, 68, 68, 0.7)' : 'rgba(245, 158, 11, 0.4)';
          ctx.lineWidth = r === 2 ? 2 : 1;
          ctx.setLineDash(r % 2 === 0 ? [5, 5] : []);
          ctx.stroke();

          // Modular points on the ring: N = p * q
          const pointsOnRing = 8;
          for (let p = 0; p < pointsOnRing; p++) {
            const theta = (p / pointsOnRing) * Math.PI * 2 + ringAngle;
            const px = centerX + Math.cos(theta) * radiusX;
            const py = centerY + Math.sin(theta) * radiusY;

            ctx.fillStyle = r === 2 ? '#ef4444' : '#fbbf24';
            ctx.beginPath();
            ctx.arc(px, py, r === 2 ? 4.5 : 3, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }

        // Shor's quantum break indicator
        ctx.save();
        ctx.font = '11px sans-serif';
        ctx.fillStyle = '#ef4444';
        ctx.textAlign = 'center';
        ctx.fillText('خطر: خوارزمية شور الكمومية تفكك N = p × q في زمن حدودي O((log N)³)', centerX, height - 20);
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [activeAlgorithm, encryptionRound]);

  // Cycle AES transformation phases automatically
  useEffect(() => {
    if (activeAlgorithm !== 'AES') return;
    const phases: Array<'SubBytes' | 'ShiftRows' | 'MixColumns' | 'AddRoundKey'> = [
      'SubBytes',
      'ShiftRows',
      'MixColumns',
      'AddRoundKey',
    ];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % phases.length;
      setTransformationPhase(phases[idx]);
    }, 2800);
    return () => clearInterval(interval);
  }, [activeAlgorithm]);

  const handleNextRound = () => {
    setEncryptionRound((prev) => (prev >= maxRounds ? 1 : prev + 1));
  };

  const handleReset = () => {
    setEncryptionRound(1);
    angleRef.current = 0;
  };

  return (
    <div className={`glass-panel card-3d-neon card-3d-cyan p-6 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-100 shadow-2xl ${className}`}>
      {/* Header & Algorithm Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-lg">
            <Cpu className="w-5 h-5" />
            <span>مختبر التجسيم الهندسي ثلاثي الأبعاد للتشفير (3D Matrix Visualizer)</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            محاكاة رياضية حية لمصفوفات التحويل، شبكات الأمان المقاوم للكم (PQC)، وثغرات التشفير التقليدي.
          </p>
        </div>

        {/* Algorithm Tabs */}
        <div className="flex items-center bg-slate-950 p-1.5 rounded-xl border border-slate-800/80 gap-1.5 self-start md:self-auto">
          <button
            type="button"
            onClick={() => {
              setActiveAlgorithm('AES');
              setEncryptionRound(1);
            }}
            className={`btn-3d-neon btn-3d-cyan px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeAlgorithm === 'AES'
                ? 'btn-3d-cyan-active bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>AES-256 (كتلي)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveAlgorithm('PQC_LATTICE');
              setEncryptionRound(1);
            }}
            className={`btn-3d-neon px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeAlgorithm === 'PQC_LATTICE'
                ? 'btn-3d-neon-active bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>PQC الشبكات (Lattice)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveAlgorithm('RSA');
              setEncryptionRound(1);
            }}
            className={`btn-3d-neon btn-3d-amber px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeAlgorithm === 'RSA'
                ? 'btn-3d-amber-active bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>RSA-2048 (تقليدي)</span>
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative mt-5">
        <div ref={mountRef} className="w-full relative overflow-hidden rounded-xl border border-slate-800/80 shadow-inner" />

        {/* Floating Overlay Badge */}
        <div className="btn-3d-neon absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs flex items-center gap-2">
          {activeAlgorithm === 'AES' && (
            <>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-slate-300 font-mono">طَوْر: {transformationPhase}</span>
            </>
          )}
          {activeAlgorithm === 'PQC_LATTICE' && (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-300 font-mono">مسألة أقصر متّجه (SVP/CVP)</span>
            </>
          )}
          {activeAlgorithm === 'RSA' && (
            <>
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span className="text-red-300 font-mono">فضاء العوامل الأولية (p × q)</span>
            </>
          )}
        </div>

        {/* Quantum Status Tag */}
        <div className="absolute top-4 right-4">
          {activeAlgorithm === 'AES' && (
            <span className="btn-3d-neon btn-3d-cyan px-2.5 py-1 rounded text-[11px] font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              آمن حتى 128 بت ضد خوارزمية جروفر
            </span>
          )}
          {activeAlgorithm === 'PQC_LATTICE' && (
            <span className="btn-3d-neon px-2.5 py-1 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              مقاوم للهجمات الكمومية بالكامل (NIST PQC Standard)
            </span>
          )}
          {activeAlgorithm === 'RSA' && (
            <span className="btn-3d-neon btn-3d-amber px-2.5 py-1 rounded text-[11px] font-semibold bg-red-500/10 text-red-300 border border-red-500/30 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              مخترق نظرياً بالحواسيب الكمومية
            </span>
          )}
        </div>
      </div>

      {/* Interactive Controls & Sliders */}
      <div className="card-3d-neon card-3d-cyan mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-slate-950/60 p-4 rounded-xl border border-slate-800">
        {/* Play/Pause & Reset */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsRotating(!isRotating)}
            className="btn-3d-neon flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer"
          >
            {isRotating ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isRotating ? 'إيقاف الدوران' : 'تشغيل الدوران'}</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="btn-3d-neon btn-3d-cyan flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span>إعادة ضبط</span>
          </button>
        </div>

        {/* Round / Step Slider */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-medium whitespace-nowrap">
            {activeAlgorithm === 'AES' ? 'جولة التشفير:' : activeAlgorithm === 'PQC_LATTICE' ? 'البُعد الشبكي:' : 'بتات المعامل:'}
          </span>
          <input
            type="range"
            min={1}
            max={maxRounds}
            value={encryptionRound}
            onChange={(e) => setEncryptionRound(Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
          <span className="text-xs font-mono font-bold text-cyan-300 bg-slate-800 px-2 py-0.5 rounded">
            {encryptionRound} / {maxRounds}
          </span>
        </div>

        {/* Next Step / Step Trigger */}
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={handleNextRound}
            className="btn-3d-neon btn-3d-cyan btn-3d-cyan-active w-full md:w-auto px-4 py-1.5 rounded-lg text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)] transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>الخطوة التالية (Next Round)</span>
          </button>
        </div>
      </div>

      {/* Cryptographic Insight Cards */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="card-3d-neon card-3d-cyan p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center gap-2 text-slate-300 font-semibold mb-1.5">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>الأساس الرياضي للمجسم</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            {activeAlgorithm === 'AES' && 'يعتمد على مصفوفة الحالة 4×4 في حقل غالوا GF(2⁸) عبر 14 جولة إزاحة وخلط تضمن أقصى تشتت (Diffusion).'}
            {activeAlgorithm === 'PQC_LATTICE' && 'يعتمد على متجهات الفضاء n-الأبعاد حيث يستحيل إيجاد أقصر متجه مع إضافة تشويش عشوائي خوارزمياً.'}
            {activeAlgorithm === 'RSA' && 'يعتمد على صعوبة تحليل الأعداد الكبيرة لعواملها الأولية في الحساب الموديلو، وهو ما ينهار كمومياً.'}
          </p>
        </div>

        <div className="card-3d-neon p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center gap-2 text-slate-300 font-semibold mb-1.5">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>مستوى الأمان والتصنيف</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            {activeAlgorithm === 'AES' && 'AES-256 معتمد للأمن القومي الأمريكي (NSA Top Secret) ويوفر مقاومة ممتازة حتى مع خوارزميات جروفر الكمومية.'}
            {activeAlgorithm === 'PQC_LATTICE' && 'الفائز بمعايير NIST الرسمية (مثل ML-KEM وML-DSA) كبديل إلزامي للتشفير التقليدي قبل عام 2030.'}
            {activeAlgorithm === 'RSA' && 'يجب التوقف عن استخدامه في الأنظمة الحيوية والانتقال إلى خوارزميات ما بعد الحوسبة الكمومية فوراً.'}
          </p>
        </div>

        <div className="card-3d-neon card-3d-amber p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center gap-2 text-slate-300 font-semibold mb-1.5">
            <Info className="w-4 h-4 text-amber-400" />
            <span>التطبيق في منصة مِرْصَاد</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            تطبق منصة مرصاد نموذج التشفير الهجين (Hybrid Cryptography): AES-256 لحماية القنوات مع توقيعات ما بعد الكم للمصادقة وتأمين الشهادات.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Crypto3DVisualizer;
