// src/lib/safeMarkdown.ts
// محلّل Markdown مضمّن آمن: ينتج شجرة عقد (لا HTML) ليعرضها React،
// فيهرّب React كل نص تلقائياً ولا حاجة لـ dangerouslySetInnerHTML.

export type InlineNode =
  | { type: 'text'; text: string }
  | { type: 'code'; text: string }
  | { type: 'strong' | 'em'; children: InlineNode[] }
  | { type: 'link'; href: string; external: boolean; children: InlineNode[] };

// مسموح فقط: http(s) و mailto ومسار داخلي واحد (/x) أو مرساة (#x).
// مرفوض: javascript: و data: و vbscript: و //host و /\host وأي مسافة/محرف تحكم.
const SAFE_HREF = /^(?:https?:\/\/[^\s\u0000-\u001f\\]+|mailto:[^\s\u0000-\u001f\\]+|\/(?![\/\\])[^\s\u0000-\u001f\\]*|#[^\s\u0000-\u001f\\]*)$/i;

export function safeHref(url: string): string | null {
  const u = (url || '').trim();
  return SAFE_HREF.test(u) ? u : null;
}

const SAFE_IMG =
  /^(?:https?:\/\/[^\s\u0000-\u001f\\]+|\/(?![\/\\])[^\s\u0000-\u001f\\]*|data:image\/(?:png|jpe?g|gif|webp);base64,[A-Za-z0-9+/=]+)$/i;

/** يعيد المصدر إن كان آمناً للصور، وإلا نصاً فارغاً (SVG data مرفوض عمداً) */
export function safeImgSrc(src: string): string {
  const s = (src || '').trim();
  return SAFE_IMG.test(s) ? s : '';
}

const MAX_DEPTH = 3;

export function parseInline(text: string, depth = 0): InlineNode[] {
  if (!text) return [];
  if (depth >= MAX_DEPTH) return [{ type: 'text', text }];

  // ترتيب البدائل: كود، رابط، عريض، مائل
  const re = /`([^`]+)`|\[([^\]]+)\]\(((?:[^()\s]|\([^()\s]*\))+)\)|\*\*(.+?)\*\*|\*([^*\s](?:[^*]*[^*\s])?)\*/g;
  const out: InlineNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(text))) {
    if (m.index > last) out.push({ type: 'text', text: text.slice(last, m.index) });
    if (m[1] !== undefined) {
      out.push({ type: 'code', text: m[1] });
    } else if (m[2] !== undefined && m[3] !== undefined) {
      const href = safeHref(m[3]);
      const children = parseInline(m[2], depth + 1);
      if (href) {
        out.push({ type: 'link', href, external: /^https?:\/\//i.test(href), children });
      } else {
        out.push(...children);
      }
    } else if (m[4] !== undefined) {
      out.push({ type: 'strong', children: parseInline(m[4], depth + 1) });
    } else if (m[5] !== undefined) {
      out.push({ type: 'em', children: parseInline(m[5], depth + 1) });
    }
    last = m.index + m[0].length;
  }

  if (last < text.length) out.push({ type: 'text', text: text.slice(last) });
  return out;
}
