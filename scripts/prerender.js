import { launch } from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import sirv from 'sirv';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '../dist');

const ROUTES = [
  '/',
  '/anu',
  '/kyrax',
  '/pulse',
  '/kirastudios',
  '/namtar',
  '/namtarark',
  '/frostheimark',
  '/dysunsrealm',
  '/dysunsark',
  '/brief',
  '/namtarsurvey'
];

async function prerender() {
  console.log('🚀 Starting prerender sequence...');

  // 1. Start a static server on dist
  const assets = sirv(DIST_DIR, { single: true });
  const server = http.createServer(assets);
  const port = 3333;
  
  server.listen(port);
  console.log(`📡 Static server running at http://localhost:${port}`);

  let browser;
  const results = [];
  try {
    const isVercel = process.env.VERCEL === '1';
    
    console.log(`🖥️ Environment: ${isVercel ? 'Vercel (Serverless)' : 'Local'}`);

      // 2. Launch browser
    const localChromePaths = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Users\\' + (process.env.USERNAME || 'SATCO') + '\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'
    ];
    
    let executablePath = isVercel ? await chromium.executablePath() : null;
    if (!isVercel) {
      executablePath = localChromePaths.find(p => fs.existsSync(p)) || 'chrome.exe';
    }

    browser = await launch({
      args: isVercel ? chromium.args : ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: isVercel ? chromium.headless : true,
    });

    console.log('🌐 Browser launched');

    const page = await browser.newPage();
    
    // Add console logging
    page.on('console', msg => console.log('🌐 BROWSER:', msg.text()));
    page.on('pageerror', err => console.error('🌐 BROWSER ERROR:', err.message));

    for (const route of ROUTES) {
      console.log(`📄 Prerendering route: ${route}`);
      
      try {
        await page.goto(`http://localhost:${port}${route}`, {
          waitUntil: 'domcontentloaded', // Fast trigger
          timeout: 45000 // Reasonable timeout
        });
      } catch (gotoErr) {
        console.warn(`⚠️ Warning: Initial load for ${route} timed out, attempting to wait and capture anyway...`);
      }

      // 3. Wait for hydration/rendering to stabilize (8s for boot sequences)
      await new Promise(r => setTimeout(r, 8000));

      const html = await page.content();

      results.push({ route, html });
      console.log(`✅ Captured: ${route}`);
    }

  } catch (err) {
    console.error('❌ Prerender error:', err);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
    // Handle server shutdown and write results to disk
    server.close(() => {
      console.log('📡 Static server stopped');
      
      console.log('💾 Writing results to disk...');
      for (const { route, html } of results) {
        const folderPath = path.join(DIST_DIR, route === '/' ? '' : route);
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath, { recursive: true });
        }
        fs.writeFileSync(path.join(folderPath, 'index.html'), html);
        console.log(`✅ Saved: ${route}`);
      }
      
      console.log('🏁 Prerender sequence complete.');
      process.exit(0);
    });
  }
}

prerender();
