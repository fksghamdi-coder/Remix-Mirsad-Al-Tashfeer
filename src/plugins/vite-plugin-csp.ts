import type { Plugin } from 'vite';

export function vitePluginCSP(): Plugin {
  return {
    name: 'vite-plugin-csp',
    apply: 'build' as const,
    transformIndexHtml(html: string): string {
      const securityMeta = `
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.firebaseio.com https://*.googleapis.com wss://*.firebaseio.com; frame-src 'none'; base-uri 'self'; form-action 'self' https://accounts.google.com; object-src 'none';">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="DENY">
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
<meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=(), payment=(), usb=()">`.trim();
      return html.replace('</head>', `${securityMeta}\n</head>`);
    },
  };
}
export default vitePluginCSP;
