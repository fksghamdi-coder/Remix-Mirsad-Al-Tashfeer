import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeId(raw: string): string {
  const cleaned = raw.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 128);
  return cleaned.length > 0 ? cleaned : 'doc_1';
}

export function truncateString(val: string, maxLen: number, minLen = 1, fallback = '-'): string {
  const trimmed = (val || '').trim();
  if (trimmed.length < minLen) return fallback.padEnd(minLen, '_');
  return trimmed.slice(0, maxLen);
}

export function getAssetUrl(assetPath: string): string {
  const cleanPath = assetPath.replace(/^(\.\/|\/)+/, '');
  if (typeof window !== 'undefined' && window.location.hostname.endsWith('github.io')) {
    const firstSegment = window.location.pathname.split('/').filter(Boolean)[0];
    if (firstSegment) {
      return `/${firstSegment}/${cleanPath}`;
    }
  }
  return `/${cleanPath}`;
}

