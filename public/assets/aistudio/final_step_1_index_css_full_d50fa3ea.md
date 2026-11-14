# الخطوة النهائية (1 من 6) قبل الإطلاق: الكود الكامل لملف التنسيق العام والوضع النهاري الهادئ
**المسار في المشروع:** `src/index.css`

انسخ الكود التالي بالكامل واستبدل به محتوى ملف `src/index.css`:

```css
@import "tailwindcss";
@import "./styles/PlatformLayout.css";
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

/* ═══════════════════════════════════════════════════════
   THEME TOKENS FOR TAILWIND V4
   ═══════════════════════════════════════════════════════ */
@theme {
  --color-theme-bg-base: var(--bg-base);
  --color-theme-bg-surface-1: var(--bg-surface-1);
  --color-theme-bg-surface-2: var(--bg-surface-2);
  --color-theme-bg-surface-3: var(--bg-surface-3);
  --color-theme-bg-input: var(--bg-input);

  --color-theme-text-primary: var(--text-primary);
  --color-theme-text-secondary: var(--text-secondary);
  --color-theme-text-tertiary: var(--text-tertiary);
  --color-theme-text-muted: var(--text-muted);
  --color-theme-text-inverse: var(--text-inverse);

  --color-theme-border-subtle: var(--border-subtle);
  --color-theme-border-default: var(--border-default);
  --color-theme-border-strong: var(--border-strong);

  --color-theme-accent-emerald: var(--accent-emerald);
  --color-theme-accent-amber: var(--accent-amber);
  --color-theme-accent-blue: var(--accent-blue);
  --color-theme-accent-purple: var(--accent-purple);
  --color-theme-accent-rose: var(--accent-rose);
  --color-theme-accent-cyan: var(--accent-cyan);
}

/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS — Semantically named CSS Variables
   ═══════════════════════════════════════════════════════ */

@layer base {
  /* ============ DARK MODE (الوضع الليلي الافتراضي) ============ */
  :root,
  [data-theme="dark"] {
    color-scheme: dark;

    /* Surfaces */
    --bg-base: #020617;
    --bg-base-gradient-1: rgba(16, 185, 129, 0.08);
    --bg-base-gradient-2: rgba(59, 130, 246, 0.08);
    --bg-surface-1: #0f172a;
    --bg-surface-2: #1e293b;
    --bg-surface-3: #334155;
    --bg-elevated: rgba(15, 23, 42, 0.72);
    --bg-elevated-light: rgba(30, 41, 59, 0.4);
    --bg-input: #0f172a;

    /* Text */
    --text-primary: #f8fafc;
    --text-secondary: #cbd5e1;
    --text-tertiary: #94a3b8;
    --text-muted: #64748b;
    --text-inverse: #0f172a;

    /* Borders */
    --border-subtle: rgba(30, 41, 59, 0.85);
    --border-default: rgba(51, 65, 85, 0.8);
    --border-strong: rgba(71, 85, 105, 0.9);

    /* Accents (dark) */
    --accent-emerald: #10b981;
    --accent-emerald-soft: #34d399;
    --accent-amber: #f59e0b;
    --accent-amber-soft: #fbbf24;
    --accent-blue: #3b82f6;
    --accent-blue-soft: #60a5fa;
    --accent-purple: #8b5cf6;
    --accent-purple-soft: #a78bfa;
    --accent-rose: #ef4444;
    --accent-rose-soft: #f87171;
    --accent-cyan: #06b6d4;

    /* Shadows */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 10px 30px -10px rgba(0, 0, 0, 0.6);

    /* Special */
    --chart-grid: #1e293b;
    --chart-text: #94a3b8;
    --chart-tooltip-bg: #0f172a;
    --chart-tooltip-border: #1e293b;
    --chart-tooltip-text: #f8fafc;
    --scrollbar-track: #0f172a;
    --scrollbar-thumb: #334155;
    --scrollbar-thumb-hover: #475569;
    --selection-bg: rgba(16, 185, 129, 0.3);
    --selection-text: #a7f3d0;
  }

  /* ============ LIGHT MODE (الوضع النهاري الأكاديمي الهادئ والمريح للعين) ============ */
  [data-theme="light"] {
    color-scheme: light;

    /* Surfaces — Calm Warm Alabaster & Soft Ivory Slate */
    --bg-base: #f4f7f9;
    --bg-base-gradient-1: rgba(5, 150, 105, 0.045);
    --bg-base-gradient-2: rgba(37, 99, 235, 0.04);
    --bg-surface-1: #ffffff;
    --bg-surface-2: #edf2f6;
    --bg-surface-3: #e2e8f0;
    --bg-elevated: rgba(255, 255, 255, 0.95);
    --bg-elevated-light: rgba(244, 247, 249, 0.92);
    --bg-input: #ffffff;

    /* Text — Calm High-Clarity Academic Ink */
    --text-primary: #0f172a;
    --text-secondary: #1e293b;
    --text-tertiary: #334155;
    --text-muted: #475569;
    --text-inverse: #ffffff;

    /* Borders — Soft, Calm & Balanced */
    --border-subtle: rgba(148, 163, 184, 0.35);
    --border-default: rgba(100, 116, 139, 0.38);
    --border-strong: rgba(71, 85, 105, 0.52);

    /* Accents — Harmonized Deep Academic Tones */
    --accent-emerald: #047857;
    --accent-emerald-soft: #065f46;
    --accent-amber: #b45309;
    --accent-amber-soft: #92400e;
    --accent-blue: #1d4ed8;
    --accent-blue-soft: #1e40af;
    --accent-purple: #6d28d9;
    --accent-purple-soft: #5b21b6;
    --accent-rose: #be123c;
    --accent-rose-soft: #9f1239;
    --accent-cyan: #0e7490;

    /* Shadows — Soft Architectural Elevation */
    --shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.04);
    --shadow-md: 0 4px 12px rgba(15, 23, 42, 0.06);
    --shadow-lg: 0 10px 26px -6px rgba(15, 23, 42, 0.08);

    /* Special */
    --chart-grid: #cbd5e1;
    --chart-text: #1e293b;
    --chart-tooltip-bg: #ffffff;
    --chart-tooltip-border: #cbd5e1;
    --chart-tooltip-text: #0f172a;
    --scrollbar-track: #edf2f6;
    --scrollbar-thumb: #94a3b8;
    --scrollbar-thumb-hover: #64748b;
    --selection-bg: rgba(4, 120, 87, 0.16);
    --selection-text: #064e3b;
  }

  /* ============ BASE STYLES ============ */
  html {
    scroll-behavior: smooth;
    background-color: var(--bg-base);
  }

  body {
    background-color: var(--bg-base);
    color: var(--text-primary);
    background-image:
      radial-gradient(circle at 10% 20%, var(--bg-base-gradient-1), transparent 45%),
      radial-gradient(circle at 90% 80%, var(--bg-base-gradient-2), transparent 45%);
    min-height: 100vh;
    font-family: 'Cairo', 'Tajawal', system-ui, sans-serif;
  }

  code, pre, .font-mono {
    font-family: 'IBM Plex Mono', monospace;
    font-variant-numeric: tabular-nums;
  }

  ::selection {
    background-color: var(--selection-bg);
    color: var(--selection-text);
  }

  ::-webkit-scrollbar { width: 8px; height: 8px; }
  ::-webkit-scrollbar-track { background: var(--scrollbar-track); }
  ::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb);
    border-radius: 999px;
  }
  ::-webkit-scrollbar-thumb:hover { background: var(--scrollbar-thumb-hover); }

  /* ============ SMOOTH TRANSITIONS ============ */
  body.theme-transitioning,
  body.theme-transitioning *,
  body.theme-transitioning *::before,
  body.theme-transitioning *::after {
    transition-property: background-color, border-color, color, fill, stroke, box-shadow !important;
    transition-duration: 200ms !important;
    transition-timing-function: ease !important;
  }
}

/* ═══════════════════════════════════════════════════════
   COMPONENT CLASSES — Theme-Aware
   ═══════════════════════════════════════════════════════ */

@layer components {
  .glass-panel {
    background-color: var(--bg-elevated);
    border: 1px solid rgba(16, 185, 129, 0.25);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 0 15px rgba(16, 185, 129, 0.12), var(--shadow-lg);
    transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .glass-panel:hover {
    border-color: rgba(52, 211, 153, 0.5);
    box-shadow: 0 0 25px rgba(16, 185, 129, 0.22), var(--shadow-lg);
    transform: translateY(-2px);
  }

  [data-theme="light"] .glass-panel {
    background-color: rgba(255, 255, 255, 0.96);
    border: 1px solid rgba(148, 163, 184, 0.38);
    box-shadow: 0 6px 20px -6px rgba(15, 23, 42, 0.06), 0 1px 4px rgba(15, 23, 42, 0.03);
  }

  [data-theme="light"] .glass-panel:hover {
    border-color: rgba(4, 120, 87, 0.42);
    box-shadow: 0 10px 26px -6px rgba(15, 23, 42, 0.09), 0 2px 8px rgba(4, 120, 87, 0.06);
  }

  .neon-card {
    border: 1px solid rgba(16, 185, 129, 0.3);
    box-shadow: 0 0 18px rgba(16, 185, 129, 0.15), inset 0 0 12px rgba(16, 185, 129, 0.05);
    backdrop-filter: blur(20px);
    transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .neon-card:hover {
    border-color: rgba(52, 211, 153, 0.75);
    box-shadow: 0 0 28px rgba(16, 185, 129, 0.32), inset 0 0 18px rgba(16, 185, 129, 0.08);
    transform: translateY(-3px);
  }

  .glass-panel-light {
    background-color: var(--bg-elevated-light);
    border: 1px solid var(--border-subtle);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .floating-nav {
    position: fixed;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 50;
    padding: 0.625rem 1rem;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: var(--bg-elevated);
    border: 1px solid var(--border-subtle);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: var(--shadow-lg);
    transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .gradient-text {
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    background-image: linear-gradient(to left, var(--accent-emerald), var(--accent-blue), var(--accent-purple));
    line-height: 1.5 !important;
    padding-top: 0.15em;
    padding-bottom: 0.2em;
    overflow: visible !important;
  }

  .gradient-text-academic {
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    background-image: linear-gradient(to left, var(--accent-amber), #ea580c, var(--accent-rose));
    line-height: 1.5 !important;
    padding-top: 0.15em;
    padding-bottom: 0.2em;
    overflow: visible !important;
  }

  .bg-clip-text {
    line-height: 1.5 !important;
    padding-top: 0.15em;
    padding-bottom: 0.2em;
    overflow: visible !important;
  }

  .btn-primary {
    font-weight: 700;
    padding: 0.75rem 1.5rem;
    border-radius: 0.75rem;
    transition: all 150ms ease;
    background-color: var(--accent-emerald);
    color: #ffffff;
    box-shadow: 0 4px 15px -4px var(--accent-emerald);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  .btn-primary:hover {
    filter: brightness(1.06);
    transform: translateY(-1px);
  }
  .btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .input-field {
    width: 100%;
    border-radius: 0.75rem;
    padding: 0.75rem 2.75rem 0.75rem 1rem;
    outline: none;
    transition: all 150ms ease;
    background-color: var(--bg-input);
    border: 1px solid var(--border-default);
    color: var(--text-primary);
  }
  .input-field::placeholder {
    color: var(--text-muted);
  }
  .input-field:focus {
    border-color: var(--accent-emerald);
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
  }

  select.input-field {
    background-color: var(--bg-input);
    color: var(--text-primary);
  }
  select.input-field option {
    background-color: var(--bg-surface-1);
    color: var(--text-primary);
  }
}

/* ═══════════════════════════════════════════════════════
   LIGHT MODE OVERRIDES — Calm, Balanced & 100% Complete
   ═══════════════════════════════════════════════════════ */

[data-theme="light"] {
  /* ========== 1. SLATE BACKGROUNDS (ALL OPACITIES) ========== */
  .bg-slate-950 { background-color: var(--bg-base) !important; }
  .bg-slate-950\/95,
  .bg-slate-950\/90,
  .bg-slate-950\/85 { background-color: rgba(244, 247, 249, 0.97) !important; }
  .bg-slate-950\/80,
  .bg-slate-950\/75,
  .bg-slate-950\/70 { background-color: rgba(244, 247, 249, 0.93) !important; }
  .bg-slate-950\/60,
  .bg-slate-950\/50,
  .bg-slate-950\/40,
  .bg-slate-950\/30 { background-color: rgba(237, 242, 246, 0.88) !important; }

  .bg-slate-900 { background-color: var(--bg-surface-1) !important; }
  .bg-slate-900\/95,
  .bg-slate-900\/90,
  .bg-slate-900\/85 { background-color: rgba(255, 255, 255, 0.98) !important; }
  .bg-slate-900\/80,
  .bg-slate-900\/75,
  .bg-slate-900\/70 { background-color: rgba(255, 255, 255, 0.94) !important; }
  .bg-slate-900\/60,
  .bg-slate-900\/50,
  .bg-slate-900\/40,
  .bg-slate-900\/30,
  .bg-slate-900\/20 { background-color: rgba(248, 250, 252, 0.9) !important; }

  .bg-slate-800 { background-color: var(--bg-surface-2) !important; }
  .bg-slate-800\/90,
  .bg-slate-800\/80,
  .bg-slate-800\/70 { background-color: rgba(237, 242, 246, 0.92) !important; }
  .bg-slate-800\/60,
  .bg-slate-800\/50,
  .bg-slate-800\/40,
  .bg-slate-800\/30 { background-color: rgba(226, 232, 240, 0.78) !important; }

  .bg-slate-700 { background-color: var(--bg-surface-3) !important; }
  .bg-slate-700\/80,
  .bg-slate-700\/60,
  .bg-slate-700\/50 { background-color: rgba(203, 213, 225, 0.78) !important; }

  /* ========== 2. HOVER BACKGROUNDS ========== */
  .hover\:bg-slate-900:hover,
  .hover\:bg-slate-900\/90:hover { background-color: #ffffff !important; }
  .hover\:bg-slate-800:hover,
  .hover\:bg-slate-800\/90:hover,
  .hover\:bg-slate-800\/60:hover,
  .hover\:bg-slate-800\/50:hover { background-color: #e2e8f0 !important; }
  .hover\:bg-slate-700:hover,
  .hover\:bg-slate-700\/80:hover { background-color: #cbd5e1 !important; }

  /* ========== 3. TINTED ACADEMIC BACKGROUNDS (ALL OPACITIES) ========== */
  .bg-emerald-950,
  .bg-emerald-950\/80,
  .bg-emerald-950\/60,
  .bg-emerald-950\/50,
  .bg-emerald-950\/40,
  .bg-emerald-950\/35,
  .bg-emerald-950\/30,
  .bg-emerald-950\/20,
  .bg-emerald-950\/15,
  .bg-emerald-900\/40,
  .bg-emerald-900\/30 { background-color: rgba(220, 252, 231, 0.7) !important; }

  .bg-amber-950,
  .bg-amber-950\/60,
  .bg-amber-950\/50,
  .bg-amber-950\/40,
  .bg-amber-950\/30,
  .bg-amber-950\/20,
  .bg-amber-950\/10,
  .bg-amber-900\/50,
  .bg-amber-900\/40,
  .bg-amber-900\/30 { background-color: rgba(254, 243, 199, 0.68) !important; }
  .hover\:bg-amber-900\/50:hover { background-color: rgba(253, 230, 138, 0.8) !important; }

  .bg-blue-950,
  .bg-blue-950\/80,
  .bg-blue-950\/50,
  .bg-blue-900\/50,
  .bg-blue-900\/40,
  .bg-blue-900\/30 { background-color: rgba(219, 234, 254, 0.72) !important; }
  .hover\:bg-blue-900\/50:hover { background-color: rgba(191, 219, 254, 0.85) !important; }

  .bg-cyan-950,
  .bg-cyan-950\/80,
  .bg-cyan-950\/60,
  .bg-cyan-950\/50,
  .bg-cyan-950\/40,
  .bg-cyan-950\/30,
  .bg-cyan-950\/25,
  .bg-cyan-950\/20,
  .bg-cyan-900\/70,
  .bg-cyan-900\/40 { background-color: rgba(207, 250, 254, 0.68) !important; }

  .bg-purple-950,
  .bg-purple-950\/50,
  .bg-purple-900\/40,
  .bg-purple-900\/30,
  .bg-indigo-950,
  .bg-indigo-950\/50,
  .bg-indigo-900\/40 { background-color: rgba(237, 233, 254, 0.68) !important; }

  .bg-rose-950,
  .bg-rose-950\/80,
  .bg-rose-950\/50,
  .bg-rose-950\/40,
  .bg-rose-950\/30,
  .bg-rose-950\/20,
  .bg-rose-950\/15,
  .bg-rose-950\/10,
  .bg-red-950,
  .bg-red-950\/80,
  .bg-red-950\/50,
  .bg-red-950\/40,
  .bg-red-950\/30 { background-color: rgba(255, 228, 230, 0.72) !important; }

  /* Translucent Accent Chips */
  .bg-emerald-500\/30,
  .bg-emerald-500\/25,
  .bg-emerald-500\/20,
  .bg-emerald-600\/30,
  .bg-emerald-600\/20 { background-color: rgba(4, 120, 87, 0.13) !important; }
  .bg-emerald-500\/15,
  .bg-emerald-500\/10,
  .bg-emerald-500\/5 { background-color: rgba(4, 120, 87, 0.08) !important; }

  .bg-amber-500\/30,
  .bg-amber-500\/25,
  .bg-amber-500\/20,
  .bg-amber-600\/30,
  .bg-amber-600\/20,
  .bg-amber-700\/20 { background-color: rgba(180, 83, 9, 0.13) !important; }
  .bg-amber-500\/15,
  .bg-amber-500\/10,
  .bg-amber-500\/5 { background-color: rgba(180, 83, 9, 0.08) !important; }

  .bg-blue-500\/30,
  .bg-blue-500\/25,
  .bg-blue-500\/20,
  .bg-blue-500\/15,
  .bg-blue-500\/10,
  .bg-indigo-500\/30,
  .bg-indigo-500\/20,
  .bg-indigo-500\/15,
  .bg-indigo-500\/10,
  .bg-sky-500\/20,
  .bg-sky-500\/15,
  .bg-sky-500\/10 { background-color: rgba(29, 78, 216, 0.1) !important; }

  .bg-purple-500\/25,
  .bg-purple-500\/20,
  .bg-purple-500\/15,
  .bg-purple-500\/10 { background-color: rgba(109, 40, 217, 0.1) !important; }

  .bg-cyan-500\/25,
  .bg-cyan-500\/20,
  .bg-cyan-500\/15,
  .bg-cyan-500\/10,
  .bg-cyan-500\/5 { background-color: rgba(14, 116, 144, 0.1) !important; }

  .bg-rose-500\/30,
  .bg-rose-500\/25,
  .bg-rose-500\/20,
  .bg-rose-500\/15,
  .bg-rose-500\/10,
  .bg-red-500\/30,
  .bg-red-500\/20,
  .bg-red-500\/15,
  .bg-red-500\/10,
  .bg-red-500\/5 { background-color: rgba(190, 18, 60, 0.1) !important; }

  /* ========== 4. GRADIENTS IN LIGHT MODE (COMPLETE) ========== */
  .from-slate-950,
  .from-slate-900,
  .from-slate-900\/95,
  .from-slate-900\/90,
  .from-slate-800 {
    --tw-gradient-from: #ffffff !important;
  }
  .via-slate-950,
  .via-slate-900,
  .via-slate-900\/95,
  .via-slate-900\/90 {
    --tw-gradient-via: #f8fafc !important;
  }
  .to-slate-950,
  .to-slate-900,
  .to-slate-900\/95,
  .to-slate-900\/90,
  .to-slate-800 {
    --tw-gradient-to: #edf2f6 !important;
  }
  .from-amber-950\/60,
  .from-amber-950,
  .from-amber-900\/40 {
    --tw-gradient-from: rgba(254, 243, 199, 0.65) !important;
  }
  .via-amber-950\/10,
  .via-amber-950 {
    --tw-gradient-via: rgba(254, 243, 199, 0.45) !important;
  }
  .to-amber-950\/35 {
    --tw-gradient-to: rgba(254, 243, 199, 0.5) !important;
  }
  .via-emerald-950 {
    --tw-gradient-via: rgba(209, 250, 229, 0.5) !important;
  }
  .from-emerald-950\/90,
  .from-emerald-950\/80,
  .from-emerald-950\/50,
  .from-emerald-900\/40 {
    --tw-gradient-from: rgba(209, 250, 229, 0.75) !important;
  }
  .to-emerald-950\/40,
  .to-emerald-950\/30,
  .to-teal-900\/40 {
    --tw-gradient-to: rgba(209, 250, 229, 0.65) !important;
  }
  .to-cyan-950\/80,
  .to-cyan-900\/40,
  .from-cyan-900\/40 {
    --tw-gradient-from: rgba(207, 250, 254, 0.72) !important;
    --tw-gradient-to: rgba(207, 250, 254, 0.72) !important;
  }
  .from-blue-900\/40,
  .to-blue-900\/40,
  .to-indigo-900\/40 {
    --tw-gradient-from: rgba(219, 234, 254, 0.75) !important;
    --tw-gradient-to: rgba(224, 231, 255, 0.75) !important;
  }
  .to-purple-900\/40 {
    --tw-gradient-to: rgba(243, 232, 255, 0.75) !important;
  }

  .from-white.via-slate-100.to-emerald-200 {
    background-image: linear-gradient(to left, #064e3b, #047857, #0e7490) !important;
  }

  /* ========== 5. TEXT COLORS (CALM HIGH CLARITY) ========== */
  .text-white,
  .text-slate-50,
  .text-slate-100 { color: var(--text-primary) !important; }
  .text-slate-200,
  .text-slate-300,
  .text-slate-300\/90 { color: var(--text-secondary) !important; }
  .text-slate-400 { color: var(--text-tertiary) !important; }
  .text-slate-500 { color: var(--text-muted) !important; }
  .text-slate-600,
  .text-slate-700 { color: #475569 !important; }

  .hover\:text-white:hover,
  .hover\:text-slate-100:hover,
  .hover\:text-slate-200:hover { color: var(--text-primary) !important; }
  .hover\:text-emerald-300:hover,
  .hover\:text-emerald-400:hover,
  .group:hover .group-hover\:text-emerald-300,
  .group:hover .group-hover\:text-emerald-200,
  .group:hover .group-hover\:text-emerald-400 { color: var(--accent-emerald-soft) !important; }
  .hover\:text-amber-200:hover,
  .hover\:text-amber-300:hover,
  .hover\:text-amber-400:hover,
  .group:hover .group-hover\:text-amber-300,
  .group:hover .group-hover\:text-amber-400 { color: var(--accent-amber-soft) !important; }

  .text-emerald-100,
  .text-emerald-200,
  .text-emerald-300,
  .text-emerald-300\/80,
  .text-emerald-300\/70,
  .text-emerald-400,
  .text-emerald-400\/90,
  .text-emerald-400\/80,
  .text-emerald-500,
  .text-emerald-700 { color: var(--accent-emerald) !important; }

  .text-amber-100,
  .text-amber-100\/85,
  .text-amber-100\/80,
  .text-amber-100\/75,
  .text-amber-100\/70,
  .text-amber-100\/60,
  .text-amber-200,
  .text-amber-200\/90,
  .text-amber-200\/80,
  .text-amber-200\/60,
  .text-amber-200\/50,
  .text-amber-300,
  .text-amber-300\/95,
  .text-amber-400,
  .text-amber-400\/90,
  .text-amber-400\/80,
  .text-amber-400\/70,
  .text-amber-400\/50,
  .text-amber-500,
  .text-amber-500\/40,
  .text-amber-600 { color: var(--accent-amber) !important; }

  .text-blue-200,
  .text-blue-300,
  .text-blue-300\/80,
  .text-blue-400,
  .text-blue-400\/70,
  .text-blue-500,
  .text-indigo-200,
  .text-indigo-300,
  .text-indigo-400,
  .text-sky-200,
  .text-sky-300,
  .text-sky-400 { color: var(--accent-blue) !important; }

  .text-purple-200,
  .text-purple-300,
  .text-purple-400,
  .text-purple-500 { color: var(--accent-purple) !important; }

  .text-rose-200,
  .text-rose-300,
  .text-rose-300\/80,
  .text-rose-400,
  .text-rose-400\/90,
  .text-red-200,
  .text-red-300,
  .text-red-400,
  .text-red-400\/70,
  .text-red-500 { color: var(--accent-rose) !important; }

  .text-cyan-200,
  .text-cyan-300,
  .text-cyan-300\/90,
  .text-cyan-400,
  .text-cyan-400\/90,
  .text-cyan-500 { color: var(--accent-cyan) !important; }

  /* ========== 6. BORDERS & DIVIDERS ========== */
  .border-slate-800,
  .border-slate-800\/90,
  .border-slate-800\/80,
  .border-slate-800\/70,
  .border-slate-800\/60,
  .border-slate-800\/50,
  .border-slate-800\/40,
  .border-slate-800\/30 { border-color: var(--border-subtle) !important; }

  .border-slate-700,
  .border-slate-700\/80,
  .border-slate-700\/60,
  .border-slate-700\/50,
  .border-slate-700\/40 { border-color: var(--border-default) !important; }

  .border-slate-600 { border-color: var(--border-strong) !important; }

  .divide-slate-800 > :not([hidden]) ~ :not([hidden]),
  .divide-slate-800\/70 > :not([hidden]) ~ :not([hidden]),
  .divide-slate-800\/60 > :not([hidden]) ~ :not([hidden]) {
    border-color: var(--border-subtle) !important;
  }

  .ring-slate-950 {
    --tw-ring-color: var(--bg-base) !important;
  }

  .border-emerald-500\/50,
  .border-emerald-500\/45,
  .border-emerald-500\/40,
  .border-emerald-500\/35 { border-color: rgba(4, 120, 87, 0.38) !important; }
  .border-emerald-500\/30,
  .border-emerald-500\/25,
  .border-emerald-500\/20,
  .border-emerald-500\/15 { border-color: rgba(4, 120, 87, 0.25) !important; }
  .border-emerald-700\/40 { border-color: rgba(4, 120, 87, 0.35) !important; }

  .border-amber-500\/50,
  .border-amber-500\/40,
  .border-amber-500\/35 { border-color: rgba(180, 83, 9, 0.38) !important; }
  .border-amber-500\/30,
  .border-amber-500\/25,
  .border-amber-500\/20,
  .border-amber-500\/15 { border-color: rgba(180, 83, 9, 0.25) !important; }
  .border-amber-700\/40,
  .border-amber-700\/50,
  .border-amber-700\/30 { border-color: rgba(180, 83, 9, 0.35) !important; }

  .border-blue-500\/40,
  .border-blue-500\/30,
  .border-blue-500\/20,
  .border-blue-700\/50 { border-color: rgba(29, 78, 216, 0.32) !important; }

  .border-purple-500\/40,
  .border-purple-500\/30,
  .border-purple-500\/20 { border-color: rgba(109, 40, 217, 0.32) !important; }

  .border-cyan-500\/50,
  .border-cyan-500\/40,
  .border-cyan-500\/35,
  .border-cyan-500\/30,
  .border-cyan-500\/25,
  .border-cyan-500\/20 { border-color: rgba(14, 116, 144, 0.32) !important; }

  .border-rose-500\/45,
  .border-rose-500\/40,
  .border-rose-500\/35,
  .border-rose-500\/30,
  .border-red-500\/40,
  .border-red-500\/30 { border-color: rgba(190, 18, 60, 0.32) !important; }

  /* ========== 7. MODAL BACKDROPS ========== */
  .fixed.inset-0.bg-slate-950\/85,
  .fixed.inset-0.bg-slate-950\/80,
  .fixed.inset-0.bg-slate-950\/75,
  .fixed.inset-0.bg-slate-950\/70,
  .fixed.inset-0.bg-slate-950\/60,
  [class*="fixed"][class*="inset-0"][class*="bg-slate-9"] {
    background-color: rgba(15, 23, 42, 0.42) !important;
    backdrop-filter: blur(6px);
  }

  /* ========== 8. SOLID BUTTONS & GRADIENT BADGES ========== */
  .btn-primary,
  .bg-emerald-600.text-white,
  .bg-emerald-600 .text-white,
  .bg-amber-600.text-white,
  .bg-amber-600 .text-white,
  .bg-blue-600.text-white,
  .bg-blue-600 .text-white,
  .bg-cyan-600.text-white,
  .bg-cyan-600 .text-white,
  .bg-red-600.text-white,
  .bg-purple-600.text-white,
  .bg-indigo-600.text-white,
  [class*="from-emerald-500"].text-white,
  [class*="from-emerald-500"] .text-white,
  [class*="from-emerald-600"].text-white,
  [class*="from-emerald-600"] .text-white,
  [class*="from-amber-500"].text-white,
  [class*="from-amber-500"] .text-white,
  [class*="from-amber-600"].text-white,
  [class*="from-amber-600"] .text-white,
  [class*="from-blue-600"].text-white,
  [class*="from-blue-600"] .text-white,
  [class*="from-purple-600"].text-white,
  [class*="from-purple-600"] .text-white,
  [class*="from-cyan-600"].text-white,
  [class*="from-cyan-600"] .text-white,
  [class*="from-red-600"].text-white,
  [class*="from-red-600"] .text-white,
  [style*="background"] > .text-white,
  polygon + div .text-white {
    color: #ffffff !important;
  }

  .bg-emerald-500.text-slate-950,
  .bg-amber-500.text-slate-950,
  .bg-blue-500.text-slate-950,
  .bg-cyan-500.text-slate-950,
  .bg-emerald-400.text-slate-950 {
    color: #ffffff !important;
  }
  .bg-emerald-500.text-slate-950 { background-color: #047857 !important; }
  .bg-amber-500.text-slate-950 { background-color: #b45309 !important; }
  .bg-blue-500.text-slate-950 { background-color: #1d4ed8 !important; }
  .bg-cyan-500.text-slate-950 { background-color: #0e7490 !important; }

  /* ========== 9. INPUT FIELDS, SELECT & TEXTAREA ========== */
  .input-field,
  input[type="text"],
  input[type="email"],
  input[type="password"],
  input[type="tel"],
  textarea,
  select {
    background-color: var(--bg-input) !important;
    border-color: var(--border-default) !important;
    color: var(--text-primary) !important;
  }
  .input-field::placeholder,
  input::placeholder,
  textarea::placeholder {
    color: var(--text-muted) !important;
  }
  select option {
    background-color: var(--bg-surface-1) !important;
    color: var(--text-primary) !important;
  }

  /* ========== 10. CHARTS (Recharts) ========== */
  .recharts-cartesian-grid line {
    stroke: var(--chart-grid) !important;
  }
  .recharts-cartesian-axis-tick-value {
    fill: var(--chart-text) !important;
  }
  .recharts-legend-item-text {
    color: var(--chart-text) !important;
  }
  .recharts-default-tooltip {
    background-color: var(--chart-tooltip-bg) !important;
    border-color: var(--chart-tooltip-border) !important;
    color: var(--chart-tooltip-text) !important;
    box-shadow: var(--shadow-md) !important;
  }
  .recharts-tooltip-label,
  .recharts-tooltip-item {
    color: var(--chart-tooltip-text) !important;
  }
  .recharts-text {
    fill: var(--chart-text) !important;
  }

  /* ========== 11. SVG DIAGRAMS ========== */
  svg rect[fill="#1e293b"],
  svg circle[fill="#1e293b"],
  svg rect[fill="#0f172a"],
  svg circle[fill="#0f172a"] {
    fill: #f8fafc !important;
  }
  svg rect[fill="#064e3b"],
  svg circle[fill="#064e3b"] {
    fill: #ecfdf5 !important;
  }
  svg rect[fill="#1e3a8a"],
  svg circle[fill="#1e3a8a"] {
    fill: #eff6ff !important;
  }
  svg rect[fill="#7c2d12"],
  svg circle[fill="#7c2d12"] {
    fill: #fffbeb !important;
  }
  svg text[fill="#fff"],
  svg text[fill="#ffffff"],
  svg text[fill="#e2e8f0"],
  svg text[fill="#cbd5e1"] {
    fill: #0f172a !important;
  }
  svg text[fill="#94a3b8"],
  svg text[fill="#64748b"] {
    fill: #334155 !important;
  }
  svg text[fill="#10b981"],
  svg text[fill="#34d399"],
  svg text[fill="#6ee7b7"],
  svg text[fill="#a7f3d0"] {
    fill: #047857 !important;
  }
  svg text[fill="#f59e0b"],
  svg text[fill="#fbbf24"],
  svg text[fill="#fcd34d"] {
    fill: #b45309 !important;
  }
  svg text[fill="#3b82f6"],
  svg text[fill="#60a5fa"],
  svg text[fill="#93c5fd"],
  svg text[fill="#dbeafe"] {
    fill: #1d4ed8 !important;
  }
  svg text[fill="#8b5cf6"],
  svg text[fill="#a78bfa"],
  svg text[fill="#c4b5fd"] {
    fill: #6d28d9 !important;
  }
  svg text[fill="#ef4444"],
  svg text[fill="#f87171"] {
    fill: #be123c !important;
  }

  /* ========== 12. CODE BLOCKS ========== */
  pre, code {
    background-color: var(--bg-surface-2) !important;
    color: var(--accent-emerald-soft) !important;
    border-color: var(--border-subtle) !important;
  }
  .prose code {
    background-color: var(--bg-surface-2) !important;
  }

  hr {
    border-color: var(--border-default) !important;
  }
}

/* ═══════════════════════════════════════════════════════
   ANIMATIONS & UTILITIES
   ═══════════════════════════════════════════════════════ */

.perspective-1000 { perspective: 1000px; }
.preserve-3d { transform-style: preserve-3d; }
.backface-hidden { backface-visibility: hidden; }
.rotate-y-180 { transform: rotateY(180deg); }

.line-clamp-1,
.line-clamp-2,
.line-clamp-3,
.line-clamp-4,
[class*="line-clamp-"] {
  display: block !important;
  -webkit-line-clamp: unset !important;
  -webkit-box-orient: unset !important;
  overflow: visible !important;
  text-overflow: unset !important;
  white-space: normal !important;
}

.truncate {
  overflow: visible !important;
  text-overflow: unset !important;
  white-space: normal !important;
  word-break: break-word;
}

h1, h2, h3, h4, h5, h6 {
  line-height: 1.45;
  overflow: visible;
  word-break: break-word;
}

.neon-border:not(.absolute) {
  position: relative;
}
.neon-border {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

[data-theme="light"] .card-stage-portal .text-white,
[data-theme="light"] .card-3d-preserve .text-white,
[data-theme="light"] .card-stage-portal .text-slate-100,
[data-theme="light"] .card-3d-preserve .text-slate-100 {
  color: #f8fafc !important;
}
[data-theme="light"] .card-stage-portal .text-slate-200,
[data-theme="light"] .card-stage-portal .text-slate-300,
[data-theme="light"] .card-3d-preserve .text-slate-200,
[data-theme="light"] .card-3d-preserve .text-slate-300 {
  color: #cbd5e1 !important;
}
[data-theme="light"] .card-stage-portal .text-slate-400,
[data-theme="light"] .card-3d-preserve .text-slate-400 {
  color: #94a3b8 !important;
}

.neon-emerald {
  border-color: rgba(16, 185, 129, 0.5) !important;
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.25), inset 0 0 8px rgba(16, 185, 129, 0.15);
}

.neon-cyan {
  border-color: rgba(6, 182, 212, 0.5) !important;
  box-shadow: 0 0 12px rgba(6, 182, 212, 0.25), inset 0 0 8px rgba(6, 182, 212, 0.15);
}

.neon-amber {
  border-color: rgba(245, 158, 11, 0.5) !important;
  box-shadow: 0 0 12px rgba(245, 158, 11, 0.25), inset 0 0 8px rgba(245, 158, 11, 0.15);
}

.neon-purple {
  border-color: rgba(168, 85, 247, 0.5) !important;
  box-shadow: 0 0 12px rgba(168, 85, 247, 0.25), inset 0 0 8px rgba(168, 85, 247, 0.15);
}

.neon-blue {
  border-color: rgba(59, 130, 246, 0.5) !important;
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.25), inset 0 0 8px rgba(59, 130, 246, 0.15);
}

[data-theme="light"] .neon-emerald {
  border-color: rgba(4, 120, 87, 0.32) !important;
  box-shadow: 0 3px 10px rgba(4, 120, 87, 0.08);
}

[data-theme="light"] .neon-cyan {
  border-color: rgba(14, 116, 144, 0.32) !important;
  box-shadow: 0 3px 10px rgba(14, 116, 144, 0.08);
}

[data-theme="light"] .neon-amber {
  border-color: rgba(180, 83, 9, 0.32) !important;
  box-shadow: 0 3px 10px rgba(180, 83, 9, 0.08);
}

[data-theme="light"] .neon-purple {
  border-color: rgba(109, 40, 217, 0.32) !important;
  box-shadow: 0 3px 10px rgba(109, 40, 217, 0.08);
}

[data-theme="light"] .neon-blue {
  border-color: rgba(29, 78, 216, 0.32) !important;
  box-shadow: 0 3px 10px rgba(29, 78, 216, 0.08);
}

.neon-pulse-emerald {
  animation: neonPulseEmerald 3s infinite ease-in-out;
}

@keyframes neonPulseEmerald {
  0%, 100% {
    box-shadow: 0 0 8px rgba(16, 185, 129, 0.2), inset 0 0 5px rgba(16, 185, 129, 0.1);
    border-color: rgba(16, 185, 129, 0.4);
  }
  50% {
    box-shadow: 0 0 18px rgba(16, 185, 129, 0.45), inset 0 0 12px rgba(16, 185, 129, 0.25);
    border-color: rgba(16, 185, 129, 0.8);
  }
}

.glass-panel-floating {
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 15px rgba(16, 185, 129, 0.15);
}

[data-theme="light"] .glass-panel-floating,
.light .glass-panel-floating {
  background: rgba(255, 255, 255, 0.96) !important;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(148, 163, 184, 0.35) !important;
  box-shadow: 0 16px 36px -12px rgba(15, 23, 42, 0.12), 0 2px 8px rgba(15, 23, 42, 0.04) !important;
}

@keyframes calmGlassFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-2px); }
}

.icon-glass-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.45rem;
  height: 1.45rem;
  border-radius: 0.45rem;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.16) 0%, rgba(16, 185, 129, 0.12) 60%, rgba(15, 23, 42, 0.45) 100%);
  border: 1px solid rgba(52, 211, 153, 0.38);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.38),
    inset 0 -1px 2px rgba(0, 0, 0, 0.35),
    0 3px 6px -1px rgba(0, 0, 0, 0.45),
    0 0 10px rgba(16, 185, 129, 0.25);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  animation: calmGlassFloat 3.6s ease-in-out infinite;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
}

.icon-glass-amber {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.16) 0%, rgba(245, 158, 11, 0.16) 60%, rgba(15, 23, 42, 0.45) 100%);
  border-color: rgba(251, 191, 36, 0.42);
}

.icon-glass-blue {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.16) 0%, rgba(59, 130, 246, 0.16) 60%, rgba(15, 23, 42, 0.45) 100%);
  border-color: rgba(96, 165, 250, 0.42);
}

.btn-3d-neon {
  position: relative;
  transform-style: preserve-3d;
  background: linear-gradient(180deg, rgba(30, 41, 59, 0.82) 0%, rgba(15, 23, 42, 0.94) 100%);
  border: 1px solid rgba(16, 185, 129, 0.32);
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.22),
    inset 0 -2px 3px rgba(0, 0, 0, 0.45),
    0 3px 0 rgba(6, 78, 59, 0.65),
    0 6px 14px -2px rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  transition: all 0.28s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-3d-neon:hover {
  transform: translateY(-2px);
  border-color: rgba(52, 211, 153, 0.68);
  background: linear-gradient(180deg, rgba(16, 185, 129, 0.18) 0%, rgba(15, 23, 42, 0.94) 100%);
}

.btn-3d-neon-active {
  background: linear-gradient(180deg, rgba(16, 185, 129, 0.32) 0%, rgba(6, 95, 70, 0.52) 100%) !important;
  border-color: rgba(52, 211, 153, 0.85) !important;
  color: #a7f3d0 !important;
}

.btn-3d-amber {
  border-color: rgba(245, 158, 11, 0.38);
}

.btn-3d-amber-active {
  background: linear-gradient(180deg, rgba(245, 158, 11, 0.32) 0%, rgba(120, 53, 15, 0.55) 100%) !important;
  border-color: rgba(251, 191, 36, 0.88) !important;
  color: #fde68a !important;
}

[data-theme="light"] .btn-3d-neon {
  background: linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%);
  border-color: rgba(148, 163, 184, 0.45);
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.05);
}

[data-theme="light"] .btn-3d-neon:hover {
  background: linear-gradient(180deg, #ffffff 0%, #ecfdf5 100%);
  border-color: rgba(4, 120, 87, 0.55);
  box-shadow: 0 4px 12px rgba(4, 120, 87, 0.1);
}

[data-theme="light"] .btn-3d-neon-active {
  background: linear-gradient(180deg, #ecfdf5 0%, #d1fae5 100%) !important;
  border-color: rgba(4, 120, 87, 0.65) !important;
  color: #064e3b !important;
  box-shadow: 0 3px 10px rgba(4, 120, 87, 0.12) !important;
}

[data-theme="light"] .btn-3d-amber-active {
  background: linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%) !important;
  border-color: rgba(180, 83, 9, 0.65) !important;
  color: #78350f !important;
  box-shadow: 0 3px 10px rgba(180, 83, 9, 0.12) !important;
}

[data-theme="light"] .icon-glass-badge {
  background: linear-gradient(145deg, #ffffff 0%, #ecfdf5 100%);
  border-color: rgba(4, 120, 87, 0.3);
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.06);
}

[data-theme="light"] .icon-glass-amber {
  background: linear-gradient(145deg, #ffffff 0%, #fffbeb 100%);
  border-color: rgba(180, 83, 9, 0.32);
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.06);
}

[data-theme="light"] .card-3d-neon,
[data-theme="light"] .box-3d-neon,
[data-theme="light"] .glass-panel,
[data-theme="light"] main div[class*="rounded-3xl"][class*="border"]:not(.no-3d),
[data-theme="light"] main div[class*="rounded-2xl"][class*="border"]:not(.no-3d),
[data-theme="light"] main div[class*="rounded-xl"][class*="border"][class*="p-"]:not(.no-3d),
[data-theme="light"] main li[class*="rounded-"][class*="border"]:not(.no-3d) {
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%);
  border-color: rgba(148, 163, 184, 0.35);
  box-shadow: 0 4px 16px -4px rgba(15, 23, 42, 0.06), 0 1px 3px rgba(15, 23, 42, 0.03);
}

[data-theme="light"] .card-3d-neon:hover,
[data-theme="light"] .box-3d-neon:hover,
[data-theme="light"] .glass-panel:hover,
[data-theme="light"] main div[class*="rounded-2xl"][class*="border"]:not(.no-3d):hover {
  border-color: rgba(4, 120, 87, 0.45);
  box-shadow: 0 8px 22px -4px rgba(15, 23, 42, 0.09), 0 2px 6px rgba(4, 120, 87, 0.06);
}

[data-theme="light"] input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="file"]):not([type="color"]):not([type="hidden"]),
[data-theme="light"] textarea,
[data-theme="light"] select {
  background: #ffffff;
  border-color: rgba(100, 116, 139, 0.38);
  color: #0f172a;
  box-shadow: inset 0 1px 2px rgba(15, 23, 42, 0.04);
}

[data-theme="light"] input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="file"]):not([type="color"]):not([type="hidden"]):focus,
[data-theme="light"] textarea:focus,
[data-theme="light"] select:focus {
  border-color: rgba(4, 120, 87, 0.75);
  box-shadow: 0 0 0 3px rgba(4, 120, 87, 0.14);
}

[data-theme="light"] .chart-3d-stage,
[data-theme="light"] .recharts-responsive-container {
  background: linear-gradient(165deg, #ffffff 0%, #f8fafc 100%);
  border-color: rgba(148, 163, 184, 0.35);
  box-shadow: 0 4px 16px -4px rgba(15, 23, 42, 0.06);
}

[data-theme="light"] .bar-3d-track {
  background: #e2e8f0;
  border-color: rgba(148, 163, 184, 0.4);
}

@media print {
  body { background: white !important; color: black !important; }
  .floating-nav, .no-print { display: none !important; }
  .glass-panel {
    background: white !important;
    border: 1px solid #ccc !important;
    box-shadow: none !important;
  }
}

.mirsad-logo-3d {
  position: relative;
  perspective: 1000px;
  transform-style: preserve-3d;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
  will-change: transform;
}

.mirsad-logo-3d:hover {
  transform: perspective(1000px) rotateY(-12deg) rotateX(8deg) scale3d(1.05, 1.05, 1.05);
}

[dir="rtl"] {
  font-family: 'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif;
  letter-spacing: 0 !important;
  line-height: 1.8;
}
[dir="rtl"] h1, [dir="rtl"] h2, [dir="rtl"] h3, [dir="rtl"] h4 {
  letter-spacing: 0 !important;
  line-height: 1.45;
}
[dir="rtl"] p, [dir="rtl"] li {
  line-height: 1.85;
  word-spacing: 0.5px;
}

@keyframes sectionPulseHighlight {
  0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); background-color: rgba(16, 185, 129, 0.22); }
  50% { box-shadow: 0 0 0 12px rgba(16, 185, 129, 0); background-color: rgba(245, 158, 11, 0.18); }
  100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); background-color: transparent; }
}
.chapter-section-highlight {
  animation: sectionPulseHighlight 3.2s ease-in-out 2;
  border-radius: 1rem;
  padding: 0.5rem 0.75rem;
  border-right: 4px solid #10b981 !important;
}
```
