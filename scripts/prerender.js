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
  try {
    const isVercel = process.env.VERCEL === '1';
    
    console.log(`🖥️ Environment: ${isVercel ? 'Vercel (Serverless)' : 'Local'}`);

      // 2. Launch browser
    const localChromePaths = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
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

    for (const route of ROUTES) {
      console.log(`📄 Prerendering route: ${route}`);
      
      try {
        await page.goto(`http://localhost:${port}${route}`, {
          waitUntil: 'networkidle2', // More resilient than networkidle0
          timeout: 120000 // Increased to 120s for slow builds
        });
      } catch (gotoErr) {
        console.warn(`⚠️ Warning: Navigation to ${route} timed out or failed, attempting to proceed anyway...`);
      }

      // Give it a moment for any client-side JS/animations
      await new Promise(r => setTimeout(r, 1000));

      const html = await page.content();

      // Determine output path
      const folderPath = path.join(DIST_DIR, route === '/' ? '' : route);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      fs.writeFileSync(path.join(folderPath, 'index.html'), html);
      console.log(`✅ Saved: ${route} -> ${folderPath}/index.html`);
    }

  } catch (err) {
    console.error('❌ Prerender error:', err);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
    server.close();
    console.log('🏁 Prerender sequence complete.');
  }
}

prerender();
