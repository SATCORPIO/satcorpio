#!/usr/bin/env node
/**
 * ROUTE JS BUDGET   build plan §11, phase guide §A5.
 *
 * "Route JS (initial, pre-3D) <= 300KB gz   3D worlds are dynamic-imported
 * after LCP." Nothing on this site enforced that number before this script;
 * it was written down and admired, not checked   the exact gap phase guide
 * §0.3 calls out ("Add a size assertion to CI so the budget is enforced
 * rather than admired").
 *
 * How this measures, and the two things that turned out not to work first:
 *
 * 1. Parsing Next's build manifests (`.next/build-manifest.json`, the App
 *    Router client-reference manifests) was tried and abandoned. Those group
 *    chunks for Turbopack's own loading strategy, and a module's "chunks"
 *    entry lists the whole group it ships alongside rather than only what it
 *    strictly needs   a script built on that would misattribute bytes in a
 *    way that is easy to get subtly wrong and hard to notice from the
 *    numbers alone.
 *
 * 2. Distinguishing "critical" from "deferred" scripts by the `async`
 *    attribute in the rendered HTML was also tried and abandoned: every
 *    script tag Next emits on this project carries `async`, the framework
 *    runtime and a next/dynamic-loaded chunk alike. It is not a signal here.
 *
 * What actually works, and is what was done by hand to find and fix the
 * original /pulse regression this script now guards against: fetch a real
 * route from a running production server, extract every `<script src>` the
 * response HTML references, and gzip each one to measure it the way a
 * browser's transfer size would. Separately, **content-sniff** each chunk's
 * body for known 3D-library signatures (`@react-three/fiber`, three.js's own
 * revision string) to identify which chunk(s) belong to a dynamically-loaded
 * 3D world, and report the "pre-3D" total with those subtracted   which is
 * the number the budget in §11 is actually about, since a 3D world loading
 * asynchronously after first paint is the entire point of deferring it.
 *
 * Both totals are printed. A route is judged against the 300KB budget on its
 * pre-3D total; the full total is shown alongside so a regression in "how
 * much does this page eventually download" is still visible even though it
 * is not what fails the check.
 *
 * Requires a production server already running (`npm run build && npm run
 * start`) at the target origin. Not wired into CI yet   there is no CI
 * workflow in this repository yet either (phase guide §0.3 defers both to a
 * follow-up). Run by hand until then:
 *
 *   node scripts/check-bundle-size.mjs
 *   node scripts/check-bundle-size.mjs --origin http://localhost:3000
 */

import zlib from "node:zlib";
import { promisify } from "node:util";

const gzip = promisify(zlib.gzip);

const ORIGIN =
  process.argv.includes("--origin")
    ? process.argv[process.argv.indexOf("--origin") + 1]
    : "http://localhost:3000";

/** Route -> pre-3D budget in KB gz. Only PULSE is budgeted today; extend as
 *  other divisions get the same treatment. */
const BUDGETS_KB = {
  "/pulse": 300,
  "/pulse/specification": 300,
};

/**
 * Signatures that identify a chunk as belonging to a 3D world. Checked
 * against each chunk's raw (ungzipped) source. Kept short and specific
 * rather than broad   a false positive here silently excludes real
 * initial-path JS from the budget it is supposed to be checked against.
 */
const THREE_D_SIGNATURES = [/@react-three\/fiber/, /THREE\.REVISION/];

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  return res.text();
}

async function fetchChunk(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

/** Every same-origin <script src="..."> in the response HTML. Next inlines
 *  the RSC payload as a script body rather than a src on some routes, which
 *  this deliberately does not measure   it is small, and inlined content is
 *  already counted once in the HTML transfer itself rather than fetched a
 *  second time. */
function extractScriptSrcs(html, origin) {
  const out = new Set();
  const re = /<script[^>]+src="([^"]+)"/g;
  let m;
  while ((m = re.exec(html))) {
    const src = m[1];
    out.add(src.startsWith("http") ? src : `${origin}${src}`);
  }
  return [...out];
}

async function checkRoute(route) {
  const url = `${ORIGIN}${route}`;
  const html = await fetchText(url);
  const scripts = extractScriptSrcs(html, ORIGIN);

  const rows = [];
  for (const src of scripts) {
    const raw = await fetchChunk(src);
    const gz = (await gzip(raw, { level: 9 })).length;
    const is3d = THREE_D_SIGNATURES.some((re) => re.test(raw.toString("utf8")));
    rows.push({ src: src.replace(ORIGIN, ""), gz, is3d });
  }
  rows.sort((a, b) => b.gz - a.gz);

  const totalGz = rows.reduce((sum, r) => sum + r.gz, 0);
  const threeDGz = rows.filter((r) => r.is3d).reduce((sum, r) => sum + r.gz, 0);
  const preThreeDGz = totalGz - threeDGz;

  const budgetKb = BUDGETS_KB[route];
  const pass = budgetKb === undefined || preThreeDGz / 1024 <= budgetKb;

  return { route, totalGz, threeDGz, preThreeDGz, budgetKb, pass, rows };
}

async function main() {
  const routes = Object.keys(BUDGETS_KB);
  let allPass = true;

  for (const route of routes) {
    let result;
    try {
      result = await checkRoute(route);
    } catch (error) {
      console.error(`\n${route}: could not measure   ${error.message}`);
      console.error(
        `Is a production server running at ${ORIGIN}? (npm run build && npm run start)`,
      );
      process.exitCode = 1;
      return;
    }

    const { totalGz, threeDGz, preThreeDGz, budgetKb, pass, rows } = result;
    allPass &&= pass;

    console.log(`\n${route}`);
    console.log(`  Total shipped:  ${(totalGz / 1024).toFixed(1)}KB gz`);
    if (threeDGz > 0) {
      console.log(`  Of which 3D:    ${(threeDGz / 1024).toFixed(1)}KB gz (dynamically imported)`);
    }
    console.log(
      `  Pre-3D:         ${(preThreeDGz / 1024).toFixed(1)}KB gz` +
        (budgetKb ? ` / ${budgetKb}KB budget   ${pass ? "PASS" : "OVER BUDGET"}` : ""),
    );
    for (const row of rows.slice(0, 8)) {
      console.log(
        `    ${(row.gz / 1024).toFixed(1).padStart(6)}KB  ${row.src}${row.is3d ? "  [3D]" : ""}`,
      );
    }
    if (rows.length > 8) console.log(`    ... and ${rows.length - 8} more`);
  }

  console.log();
  if (!allPass) {
    console.error("One or more routes are over their pre-3D route-JS budget.");
    process.exitCode = 1;
  } else {
    console.log("All budgeted routes are within their pre-3D route-JS budget.");
  }
}

main();
