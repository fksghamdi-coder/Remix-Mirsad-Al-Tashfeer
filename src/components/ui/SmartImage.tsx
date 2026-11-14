// File: src/components/ui/SmartImage.tsx
import React, { useMemo } from 'react';
import { generateScientificDiagramDataUrl } from '@/lib/aiImages';

interface Props {
  src: string;
  alt: string;
  aspect?: string;
  fit?: 'cover' | 'contain';
  priority?: boolean;
  srcSet?: string;
  sizes?: string;
  retries?: number;
  className?: string;
  fallbackLabel?: string;
}

export default function SmartImage({
  src,
  alt,
  aspect = '16 / 9',
  fit = 'cover',
  priority = false,
  className = '',
  fallbackLabel,
}: Props) {
  const resolvedSrc = useMemo(() => {
    const label = fallbackLabel || alt || 'المخطط العلمي التوضيحي للفصل';
    // اعتراض أي رابط pollinations.ai أو رابط فارغ وتحويله فوراً للمحرك العلمي المحلي
    if (!src || src.includes('pollinations.ai')) {
      return generateScientificDiagramDataUrl(src || label, {
        caption: label,
      });
    }
    return src;
  }, [src, alt, fallbackLabel]);

  return (
    <div
      className={`relative w-full overflow-hidden bg-slate-950 ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <img
        src={resolvedSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={(e) => {
          const target = e.currentTarget;
          const fallbackUrl = generateScientificDiagramDataUrl(
            fallbackLabel || alt || 'Mirsad Diagram',
            {
              caption: fallbackLabel || alt,
            }
          );
          if (target.src !== fallbackUrl) {
            target.src = fallbackUrl;
          }
        }}
        className={`w-full h-full ${fit === 'cover' ? 'object-cover' : 'object-contain'}`}
      />
    </div>
  );
}
