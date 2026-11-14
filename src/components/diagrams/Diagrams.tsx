import React, { useMemo } from 'react';
import { DiagramId } from './diagramData';
import { buildScene, Scene, C, arrowColors, arrowMarkerId } from './scenes';

/** يرسم المشهد كعناصر SVG ثلاثية الأبعاد في React (بلا HTML خام)، فهو آمن ويتبع حجم الحاوية */
export function SceneSvg({ scene }: { scene: Scene }) {
  const colors = arrowColors(scene);
  return (
    <svg
      viewBox={`0 0 ${scene.w} ${scene.h}`}
      role="img"
      aria-label={scene.caption}
      direction="rtl"
      className="w-full h-auto block rounded-xl recharts-surface"
      style={{ fontFamily: "Tahoma, 'Noto Sans Arabic', system-ui, sans-serif" }}
    >
      <title>{scene.title}</title>
      <defs>
        <filter id="scene3dDepth" x="-10%" y="-10%" width="120%" height="125%">
          <feDropShadow dx="0" dy="4" stdDeviation="2.5" floodColor="#020617" floodOpacity="0.65" />
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#10b981" floodOpacity="0.18" />
        </filter>
        {colors.map((c) => (
          <marker key={c} id={arrowMarkerId(c)} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill={c} />
          </marker>
        ))}
      </defs>
      <rect width={scene.w} height={scene.h} rx={12} fill={C.bg} />
      {scene.items.map((p, i) => {
        switch (p.k) {
          case 'rect':
            return (
              <rect
                key={i}
                x={p.x}
                y={p.y}
                width={p.w}
                height={p.h}
                rx={p.rx ?? 0}
                fill={p.fill ?? 'none'}
                stroke={p.stroke ?? 'none'}
                strokeWidth={p.sw ?? 1}
                strokeDasharray={p.dash}
                opacity={p.op}
                filter={p.w < scene.w * 0.9 ? 'url(#scene3dDepth)' : undefined}
              />
            );
          case 'poly':
            return (
              <polygon
                key={i}
                points={p.pts.map((q) => q.join(',')).join(' ')}
                fill={p.fill ?? 'none'}
                stroke={p.stroke ?? 'none'}
                strokeWidth={p.sw ?? 1}
                opacity={p.op}
                filter="url(#scene3dDepth)"
              />
            );
          case 'circle':
            return (
              <circle
                key={i}
                cx={p.cx}
                cy={p.cy}
                r={p.r}
                fill={p.fill ?? 'none'}
                stroke={p.stroke ?? 'none'}
                strokeWidth={p.sw ?? 1}
                opacity={p.op}
                filter={p.r > 4 ? 'url(#scene3dDepth)' : undefined}
              />
            );
          case 'line':
            return <line key={i} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} stroke={p.stroke ?? C.sl} strokeWidth={p.sw ?? 2} strokeDasharray={p.dash} opacity={p.op} markerEnd={p.arrow ? `url(#${arrowMarkerId(p.stroke)})` : undefined} />;
          case 'text':
            return (
              <text key={i} x={p.x} y={p.y} fontSize={p.size ?? 13} fill={p.fill ?? C.text} textAnchor={p.anchor ?? 'start'} fontWeight={p.weight ?? 400} direction={p.ltr ? 'ltr' : undefined} unicodeBidi={p.ltr ? 'isolate' : undefined} opacity={p.op}>
                {p.s}
              </text>
            );
        }
      })}
    </svg>
  );
}

export const SceneViewer = SceneSvg;

/** رسم تعليمي ثلاثي الأبعاد دقيق بالمعرّف، مع إطار نيون زجاجي عائم وشرح اختياري */
export default function ChapterDiagram({ id, caption }: { id: DiagramId; caption?: string }) {
  const scene = useMemo(() => buildScene(id), [id]);
  return (
    <figure className="chart-3d-stage card-3d-neon rounded-2xl overflow-hidden border border-emerald-500/35 bg-slate-950/90 p-2">
      <SceneSvg scene={scene} />
      <figcaption className="mt-1.5 px-4 py-2.5 rounded-xl text-[11px] text-slate-300 bg-slate-900/85 border border-emerald-500/20">
        {caption || scene.caption}
      </figcaption>
    </figure>
  );
}
