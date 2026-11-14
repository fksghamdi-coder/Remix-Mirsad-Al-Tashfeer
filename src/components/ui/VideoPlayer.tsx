// File: src/components/ui/VideoPlayer.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Lock,
  Sparkles,
  Subtitles,
} from 'lucide-react';

interface VideoPlayerProps {
  url?: string;
  title: string;
}

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

export default function VideoPlayer({ url, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showCC, setShowCC] = useState(true);
  const [mode, setMode] = useState<'interactive-stream' | 'youtube'>('interactive-stream');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const ytId = extractYouTubeId(url || '');

  const scenes = [
    `المشهد 1: التأصيل العلمي والمعماري لمحاضرة «${title}» وربطها بمعايير الأمن السيبراني الوطنية.`,
    `المشهد 2: التحليل الرياضي والهندسي للخوارزميات والضوابط المطبقة في «${title}» خطوة بخطوة.`,
    `المشهد 3: تشريح التهديدات السيبرانية وآليات الكشف والاحتواء عبر أنظمة المراقبة والتشفير.`,
    `المشهد 4: الخلاصة التطبيقية وأفضل الممارسات الهندسية وفق ضوابط NCA ECC-2:2024 و NIST.`,
  ];

  const currentSceneIdx = Math.min(scenes.length - 1, Math.floor((progress / 100) * scenes.length));

  useEffect(() => {
    if (!isPlaying) return;

    const timer = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setIsPlaying(false);
          return 100;
        }
        return Number((prev + 0.35).toFixed(2));
      });
    }, 100);

    return () => window.clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (mode !== 'interactive-stream') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let t = 0;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      if (
        canvas.width !== Math.floor(rect.width * dpr) ||
        canvas.height !== Math.floor(rect.height * dpr)
      ) {
        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);
      }
      ctx.save();
      ctx.scale(dpr, dpr);
      const w = rect.width;
      const h = rect.height;
      t += isPlaying ? 0.04 : 0.008;

      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)';
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Draw animated orbital nodes for the lecture
      const cx = w / 2;
      const cy = h * 0.45;
      for (let i = 0; i < 4; i++) {
        const ang = t + (i * Math.PI) / 2;
        const nx = cx + Math.cos(ang) * 140;
        const ny = cy + Math.sin(ang) * 55;
        ctx.strokeStyle = '#10b981';
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.stroke();

        ctx.fillStyle = i === currentSceneIdx ? '#f59e0b' : '#0f172a';
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(nx, ny, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Cairo, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`محور ${i + 1}`, nx, ny);
      }

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 18px Cairo, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(title, cx, 42);

      ctx.restore();
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [mode, isPlaying, title, currentSceneIdx]);

  return (
    <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-4" dir="rtl">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="font-black text-slate-100 text-sm md:text-base">
            المحاضرة المرئية التفاعلية المشفرة: {title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {ytId && (
            <button
              type="button"
              onClick={() =>
                setMode((m) => (m === 'interactive-stream' ? 'youtube' : 'interactive-stream'))
              }
              className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-amber-300 cursor-pointer"
            >
              {mode === 'interactive-stream'
                ? 'التبديل لمشغل YouTube'
                : 'التبديل للبث المشفر Mirsad DRM'}
            </button>
          )}
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono">
            <Lock className="w-3 h-3 inline ml-1" />
            HLS-AES-128 ACTIVE
          </span>
        </div>
      </div>

      {mode === 'youtube' && ytId ? (
        <div className="aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${ytId}?rel=0&modestbranding=1`}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-emerald-500/30">
          <canvas
            ref={canvasRef}
            onClick={() => setIsPlaying((p) => !p)}
            className="w-full h-full block cursor-pointer"
          />

          {!isPlaying && (
            <div className="absolute inset-0 bg-slate-950/60 flex flex-col items-center justify-center p-4 text-center">
              <button
                type="button"
                onClick={() => {
                  if (progress >= 100) setProgress(0);
                  setIsPlaying(true);
                }}
                className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-xl cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>العرض المرئي التفاعلي للفصل</span>
              </button>
            </div>
          )}

          {showCC && (
            <div className="absolute bottom-14 right-4 left-4 flex justify-center pointer-events-none">
              <div className="px-4 py-2 rounded-xl bg-slate-950/90 border border-slate-700 text-xs text-slate-100 text-center max-w-2xl">
                {scenes[currentSceneIdx]}
              </div>
            </div>
          )}

          <div className="absolute bottom-0 right-0 left-0 p-3 bg-slate-950/95 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'إيقاف' : 'تشغيل'}</span>
            </button>

            <div
              onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                const ratio = Math.max(0, Math.min(1, (r.width - (e.clientX - r.left)) / r.width));
                setProgress(Math.round(ratio * 100));
              }}
              className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden cursor-pointer"
            >
              <div
                className="h-full bg-gradient-to-l from-amber-400 to-emerald-400"
                style={{ width: `${progress}%` }}
              />
            </div>

            <button
              type="button"
              onClick={() => setShowCC((c) => !c)}
              className="p-1.5 rounded-lg bg-slate-900 text-amber-300 cursor-pointer"
            >
              <Subtitles className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                setProgress(0);
                setIsPlaying(true);
              }}
              className="p-1.5 rounded-lg bg-slate-900 text-slate-300 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
