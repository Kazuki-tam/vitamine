import fs from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { getPageConfig, globalConfig } from './src/config/pages';

export default defineConfig({
  root: './src',
  publicDir: '../public',
  preview: {
    port: 4173,
    strictPort: true,
  },

  build: {
    target: 'es2022',
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        '404': resolve(__dirname, 'src/404.html'),
      },
    },
  },
  plugins: [
    // 404ハンドリング用のカスタムプラグイン
    {
      name: 'custom-404',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          // 静的ファイル（css、js、画像など）は除外
          if (req.url && req.url.includes('.') && !req.url.endsWith('.html')) {
            return next();
          }

          // APIエンドポイントやその他の特殊パスは除外
          if (req.url && (req.url.startsWith('/api') || req.url.startsWith('/@'))) {
            return next();
          }

          // 既存のファイルかチェック
          if (req.url && req.url !== '/') {
            const filePath = req.url.endsWith('/') ? `${req.url}index.html` : `${req.url}.html`;
            const fullPath = resolve(__dirname, `src${req.url === '/' ? '/index.html' : filePath}`);
            const directPath = resolve(__dirname, `src${req.url}`);

            // ファイルが存在しない場合、404.htmlにリダイレクト
            if (
              !fs.existsSync(fullPath) &&
              !fs.existsSync(directPath) &&
              !fs.existsSync(resolve(__dirname, `src${req.url}/index.html`))
            ) {
              req.url = '/404.html';
            }
          }
          next();
        });
      },
    },
    handlebars({
      partialDirectory: resolve(__dirname, 'src/templates/partials'),
      context(pagePath: string) {
        const normalizedPath = pagePath.replace(/\\/g, '/');
        const relativePath = normalizedPath.replace(resolve(__dirname, 'src'), '');
        const pageConfig = getPageConfig(relativePath);

        return {
          // グローバル設定
          ...globalConfig,
          currentYear: new Date().getFullYear(),
          // ページ固有の設定
          ...(pageConfig || {}),
        };
      },
    }),
    ViteImageOptimizer({
      png: {
        quality: 90,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        lossless: true,
      },
      svg: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ],
});
