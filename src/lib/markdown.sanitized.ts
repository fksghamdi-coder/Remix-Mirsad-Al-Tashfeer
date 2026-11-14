const ALLOWED_TAGS = new Set(['p','br','strong','em','b','i','u','s','code','pre','h1','h2','h3','h4','h5','h6','ul','ol','li','blockquote','a','img','table','thead','tbody','tr','th','td','hr','div','span','sub','sup']);
const ALLOWED_ATTRS = new Set(['href','src','alt','title','class','id','target','rel','colspan','rowspan']);
const ALLOWED_PROTOCOLS = new Set(['http:','https:','mailto:']);

function sanitizeUrl(url: string): string {
  try {
    const parsed = new URL(url, window.location.href);
    return ALLOWED_PROTOCOLS.has(parsed.protocol) ? parsed.href : '#';
  } catch { return '#'; }
}

function stripEventHandlers(attrs: Record<string, string>): Record<string, string> {
  const cleaned: Record<string, string> = {};
  for (const [key, value] of Object.entries(attrs)) {
    if (/^on/i.test(key)) continue;
    if (ALLOWED_ATTRS.has(key)) cleaned[key] = value;
  }
  return cleaned;
}

function sanitizeHTML(html: string): string {
  let sanitized = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi, '')
    .replace(/<input\b[^<]*(?:(?!<\/input>)<[^<]*)*\/>/gi, '');

  sanitized = sanitized.replace(/<([^>]+)>/g, (_match, inner) => {
    const tagMatch = inner.match(/^(\w+)(\s[^>]*)?$/);
    if (!tagMatch) return '';
    const tagName = tagMatch[1].toLowerCase();
    if (!ALLOWED_TAGS.has(tagName)) return '';
    const attrsStr = tagMatch[2] || '';
    const attrs: Record<string, string> = {};
    const attrRegex = /(\w+)=["']?([^"']*)["']?/g;
    let attrMatch;
    while ((attrMatch = attrRegex.exec(attrsStr)) !== null) {
      const [, key, value] = attrMatch;
      const lowerKey = key.toLowerCase();
      if (lowerKey === 'href' || lowerKey === 'src') attrs[lowerKey] = sanitizeUrl(value);
      else attrs[lowerKey] = value;
    }
    const cleanedAttrs = stripEventHandlers(attrs);
    const attrString = Object.entries(cleanedAttrs).map(([k, v]) => `${k}="${v.replace(/"/g, '&quot;')}"`).join(' ');
    const selfClosing = ['img','br','hr'];
    if (selfClosing.includes(tagName)) return `<${tagName}${attrString ? ' ' + attrString : ''}>`;
    return `<${tagName}${attrString ? ' ' + attrString : ''}>`;
  });
  return sanitized;
}

export function safeMarkdownToHtml(markdown: string): string {
  if (!markdown) return '';
  let html = markdown
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/~~(.+?)~~/g, '<s>$1</s>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^---$/gm, '<hr>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
  if (!html.startsWith('<')) html = `<p>${html}</p>`;
  return sanitizeHTML(html);
}

export function safeInlineFormat(content: string): string {
  return safeMarkdownToHtml(content);
}
export default safeInlineFormat;
