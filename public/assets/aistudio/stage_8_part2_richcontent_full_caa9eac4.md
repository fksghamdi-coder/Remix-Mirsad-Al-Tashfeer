# المرحلة الثامنة (الجزء 2 المستقل): الكود الكامل لملف العرض الأكاديمي والصور والجداول
**المسار في المشروع:** `src/components/ui/RichContent.tsx`

انسخ الكود التالي بالكامل واستبدل به محتوى ملف `src/components/ui/RichContent.tsx`:

```tsx
// File: src/components/ui/RichContent.tsx
import React, { useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import { ChapterImage } from '@/data/courses/types';
import { buildAcademicImage } from '@/lib/academicImages';
import { resolveChapterImage, AI_IMAGE_PROVIDER } from '@/lib/aiImages';
import { parseInline, safeImgSrc, InlineNode } from '@/lib/safeMarkdown';
import SmartImage from '@/components/ui/SmartImage';

interface RichContentProps {
  content: string;
  images?: ChapterImage[];
  courseSlug?: string;
  chapterNumber?: number;
}

export default function RichContent({
  content,
  images,
  courseSlug = 'ise243',
  chapterNumber = 1,
}: RichContentProps) {
  const blocks = useMemo(() => parseContent(content), [content]);

  // ضمان توليد صورتين علميتين تعريفيتين لكل فصل في كل مقرر حتى لو كانت images فارغة
  const effectiveImages: ChapterImage[] = useMemo(() => {
    if (images && images.length > 0) return images;
    const headings = blocks.filter((b) => b.type === 'h2' || b.type === 'h3').map((b) => b.content);
    return [
      {
        caption:
          headings[0] ||
          `المخطط المعماري والهندسي للمفاهيم الأساسية — الفصل ${chapterNumber} (${courseSlug.toUpperCase()})`,
        prompt: `${courseSlug} chapter ${chapterNumber} ${headings[0] || 'architecture diagram'}`,
      },
      {
        caption:
          headings[1] ||
          `التدفق التطبيقي والضوابط المعيارية — الفصل ${chapterNumber} (${courseSlug.toUpperCase()})`,
        prompt: `${courseSlug} chapter ${chapterNumber} ${headings[1] || 'protocol flow diagram'}`,
      },
    ];
  }, [images, blocks, courseSlug, chapterNumber]);

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => renderBlock(block, i))}

      {/* شبكة الصور والمخططات التعريفية للفصل */}
      {effectiveImages.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8 pt-8 border-t border-slate-800">
          {effectiveImages.map((img, i) => {
            const rawUrl = img.prompt
              ? resolveChapterImage(img, {
                  courseSlug,
                  chapterNumber,
                  caption: img.caption,
                  seed: chapterNumber * 10 + i,
                })
              : buildAcademicImage(courseSlug, chapterNumber, i, img.caption);
            const url = safeImgSrc(rawUrl) || rawUrl;

            return (
              <figure key={i} className="group">
                <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-emerald-500/35 shadow-xl">
                  <span className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-slate-950/90 backdrop-blur border border-emerald-500/40 text-[10px] font-bold text-emerald-300 flex items-center gap-1.5 shadow pointer-events-none">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>{AI_IMAGE_PROVIDER}</span>
                  </span>
                  <SmartImage
                    src={url}
                    alt={img.alt || img.caption}
                    fallbackLabel={img.caption || img.alt}
                    className="rounded-2xl"
                  />
                </div>
                <figcaption className="text-xs font-bold text-slate-300 mt-2.5 text-center">
                  {img.caption}
                </figcaption>
              </figure>
            );
          })}
        </div>
      )}
    </div>
  );
}

function renderBlock(block: ParsedBlock, key: number) {
  switch (block.type) {
    case 'h2':
      return (
        <h2
          key={key}
          className="text-xl font-black text-emerald-300 mt-8 mb-3 pb-2 border-b border-emerald-500/20"
        >
          {block.content}
        </h2>
      );
    case 'h3':
      return (
        <h3 key={key} className="text-lg font-bold text-amber-300 mt-6 mb-2">
          {block.content}
        </h3>
      );
    case 'list':
      return (
        <ul key={key} className="space-y-2 my-4 pr-4">
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-slate-300 leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div key={key} className="my-5 overflow-x-auto rounded-2xl border border-slate-800 shadow-lg">
          <table className="w-full text-right text-xs md:text-sm border-collapse">
            {block.headers && block.headers.length > 0 && (
              <thead className="bg-slate-950/90 text-amber-300 border-b border-slate-800">
                <tr>
                  {block.headers.map((h, hi) => (
                    <th key={hi} className="p-3 font-black">
                      {renderInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody className="divide-y divide-slate-800/70 bg-slate-900/60 text-slate-200">
              {block.rows?.map((row, ri) => (
                <tr key={ri} className="hover:bg-slate-800/40 transition-colors">
                  {row.map((cell, ci) => (
                    <td key={ci} className="p-3 leading-relaxed">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'callout':
      return (
        <div
          key={key}
          className={`p-4 my-4 rounded-xl border-r-4 ${
            block.variant === 'warning'
              ? 'bg-amber-500/10 border-amber-500 text-amber-200'
              : block.variant === 'error'
              ? 'bg-red-500/10 border-red-500 text-red-200'
              : block.variant === 'success'
              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-200'
              : 'bg-blue-500/10 border-blue-500 text-blue-200'
          }`}
        >
          <p className="text-sm leading-relaxed">{renderInline(block.content)}</p>
        </div>
      );
    case 'code':
      return (
        <pre
          key={key}
          className="bg-slate-900 border border-slate-800 rounded-xl p-4 my-4 overflow-x-auto text-left dir-ltr"
        >
          <code className="text-xs text-emerald-300 font-mono">{block.content}</code>
        </pre>
      );
    default:
      return (
        <p key={key} className="text-slate-300 leading-loose my-3 text-justify">
          {renderInline(block.content)}
        </p>
      );
  }
}

interface ParsedBlock {
  type: 'h2' | 'h3' | 'list' | 'table' | 'callout' | 'code' | 'paragraph';
  content: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
  variant?: 'info' | 'warning' | 'error' | 'success';
}

function parseContent(content: string): ParsedBlock[] {
  const blocks: ParsedBlock[] = [];
  const lines = (content || '').split('\n');
  let currentList: string[] = [];
  let currentCode: string[] = [];
  let currentTable: string[] = [];
  let inCode = false;

  const flushList = () => {
    if (currentList.length > 0) {
      blocks.push({ type: 'list', content: '', items: currentList });
      currentList = [];
    }
  };

  const flushCode = () => {
    if (currentCode.length > 0) {
      blocks.push({ type: 'code', content: currentCode.join('\n') });
      currentCode = [];
    }
  };

  const flushTable = () => {
    if (currentTable.length > 0) {
      const parsedRows = currentTable
        .map((line) =>
          line
            .replace(/^\|/, '')
            .replace(/\|$/, '')
            .split('|')
            .map((c) => c.trim())
        )
        .filter((r) => !r.every((cell) => /^[:\-\s]+$/.test(cell)));

      if (parsedRows.length > 0) {
        blocks.push({
          type: 'table',
          content: '',
          headers: parsedRows[0],
          rows: parsedRows.slice(1),
        });
      }
      currentTable = [];
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
      if (inCode) {
        flushCode();
        inCode = false;
      } else {
        flushList();
        flushTable();
        inCode = true;
      }
      continue;
    }
    if (inCode) {
      currentCode.push(line);
      continue;
    }
    if (!trimmed || trimmed === '---' || trimmed === '---page---') {
      flushList();
      flushTable();
      continue;
    }
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushList();
      currentTable.push(trimmed);
      continue;
    } else {
      flushTable();
    }
    if (trimmed.startsWith('# ')) {
      continue;
    }
    if (trimmed.startsWith('## ')) {
      flushList();
      blocks.push({ type: 'h2', content: trimmed.slice(3) });
      continue;
    }
    if (trimmed.startsWith('### ')) {
      flushList();
      blocks.push({ type: 'h3', content: trimmed.slice(4) });
      continue;
    }
    if (trimmed.startsWith('> ')) {
      flushList();
      const text = trimmed.slice(2);
      if (
        text === '[!warning]' ||
        text === '[!error]' ||
        text === '[!success]' ||
        text === '[!important]' ||
        text === '[!note]'
      ) {
        continue;
      }
      let variant: ParsedBlock['variant'] = 'info';
      let calloutText = text;
      if (text.startsWith('[!warning]')) {
        variant = 'warning';
        calloutText = text.slice(10).trim();
      } else if (text.startsWith('[!error]')) {
        variant = 'error';
        calloutText = text.slice(8).trim();
      } else if (text.startsWith('[!success]') || text.startsWith('[!important]')) {
        variant = 'success';
        calloutText = text.replace(/^\[!(success|important)\]/, '').trim();
      }
      blocks.push({ type: 'callout', content: calloutText, variant });
      continue;
    }
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      currentList.push(trimmed.slice(2));
      continue;
    }
    if (/^\d+\.\s/.test(trimmed)) {
      currentList.push(trimmed.replace(/^\d+\.\s/, ''));
      continue;
    }
    flushList();
    blocks.push({ type: 'paragraph', content: trimmed });
  }

  flushList();
  flushTable();
  flushCode();
  return blocks;
}

function renderInline(text: string): React.ReactNode {
  return renderNodes(parseInline(text));
}

function renderNodes(nodes: InlineNode[]): React.ReactNode[] {
  return nodes.map((n, i) => {
    switch (n.type) {
      case 'strong':
        return (
          <strong key={i} className="text-white font-bold">
            {renderNodes(n.children)}
          </strong>
        );
      case 'em':
        return (
          <em key={i} className="text-slate-200 italic">
            {renderNodes(n.children)}
          </em>
        );
      case 'code':
        return (
          <code
            key={i}
            className="text-amber-300 bg-slate-800/60 px-1.5 py-0.5 rounded text-sm font-mono"
          >
            {n.text}
          </code>
        );
      case 'link':
        return (
          <a
            key={i}
            href={n.href}
            {...(n.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="text-emerald-400 hover:underline"
          >
            {renderNodes(n.children)}
          </a>
        );
      default:
        return <React.Fragment key={i}>{n.text}</React.Fragment>;
    }
  });
}
```
