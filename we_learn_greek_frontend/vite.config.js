import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Absolute site URL for canonical/Open Graph tags. Falls back to Vercel's production domain. */
function resolveSiteUrl(env) {
  if (env.VITE_SITE_URL) return env.VITE_SITE_URL.replace(/\/$/, '');
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return 'http://localhost:3000';
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname, 'VITE_');
  const siteUrl = resolveSiteUrl(env);

  return {
    plugins: [
      react(),
      {
        name: 'inject-site-url',
        transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', siteUrl),
      },
      // Bundle report only on `npm run build:analyze`, so it is never deployed.
      process.env.ANALYZE &&
        visualizer({
          filename: 'dist/stats.html',
          open: false,
          gzipSize: true,
        }),
    ],
    server: {
      port: 3000,
      open: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
