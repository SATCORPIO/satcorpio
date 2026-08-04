import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const here = (p) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  /* Absolute, not './'. The section pages live one directory deep, and a
     relative base resolves runtime URLs — TEX_DIR, the landmarks fetch, the
     depart() navigation — against whatever page is open rather than the site
     root. Deploying anywhere other than a domain root means changing this. */
  base: '/',
  server: { port: 5173, host: true },
  build: {
    target: 'es2020',
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      /* One entry per document. Vite mirrors each HTML file's source position
         into dist/, so keeping them in folders at the root is what produces
         dist/kyrax/index.html and therefore the clean /kyrax/ URL. */
      input: {
        main: here('index.html'),
        namtar: here('namtar/index.html'),
        kyrax: here('kyrax/index.html'),
        kira: here('kira/index.html'),
        anu: here('anu/index.html'),
        pulse: here('pulse/index.html'),
        notfound: here('404.html'),
      },
    },
  },
});
