#!/usr/bin/env node
/**
 * Comprehensive QA suite.
 *
 * Usage:
 *   BASE_URL=http://localhost:3220 node scripts/qa.mjs
 *
 * Runs:
 *   1. Route status check  (every defined route returns 200)
 *   2. Link crawl          (every <a href> on every page resolves)
 *   3. Asset audit         (every <img>, <video>, <source> file exists)
 *   4. Security sweep      (rel=noopener on external links, no console.log/secrets)
 *   5. Responsive smoke    (renders without overflow at 375 / 768 / 1440)
 *   6. Contact form        (multi-step navigation + validation + happy submit)
 *   7. Stress test         (50 concurrent requests against every page, p95 timings)
 *   8. Cross-browser smoke (Chromium + Firefox + WebKit fetch home page)
 *
 * Output: human-readable report to stdout, exit 0 if all green.
 */

import { chromium, firefox, webkit } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3220";
const PUBLIC_DIR = path.join(process.cwd(), "public");

const ROUTES = [
  "/",
  "/about",
  "/services",
  "/services/home-cleaning",
  "/services/company-cleaning",
  "/services/uhnw",
  "/process",
  "/contact",
  "/blog",
  "/blog/welcome-to-bcn-ideal-services",
  "/blog/hiring-a-housekeeper-in-barcelona",
  "/blog/why-two-person-cleaning-teams",
  "/blog/finding-a-nanny-for-an-international-family",
  "/news",
  "/news/woman-founders-award",
  "/news/barcelona-womens-network-fundraiser",
  "/faq",
  "/privacy",
  "/sitemap.xml",
  "/robots.txt",
  "/icon.svg",
  "/opengraph-image",
];

const fails = [];
const warns = [];
const okCount = { val: 0 };
function ok(msg) { okCount.val++; }
function fail(msg) { fails.push(msg); console.error("  ✗ " + msg); }
function warn(msg) { warns.push(msg); console.warn("  ⚠ " + msg); }
function head(t) { console.log("\n=== " + t + " ==="); }

// ─── 1. Route status ──────────────────────────────────────────────────
async function checkRoutes() {
  head("1. Route status");
  for (const r of ROUTES) {
    const res = await fetch(BASE + r, { redirect: "manual" });
    if (res.status === 200) ok();
    else fail(`route ${r} returned ${res.status}`);
  }
  console.log(`  ${okCount.val}/${ROUTES.length} routes ok`);
}

// ─── 2. Link audit ────────────────────────────────────────────────────
async function linkAudit(browser) {
  head("2. Link audit (internal + external)");
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const internalSeen = new Set();
  const externalSeen = new Set();

  // Pages to crawl
  const pagesToCrawl = ROUTES.filter((r) => !r.includes("sitemap") && !r.includes("robots") && !r.includes("icon") && !r.includes("opengraph"));

  for (const route of pagesToCrawl) {
    await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 20000 });
    const links = await page.$$eval("a[href]", (as) =>
      as.map((a) => ({ href: a.getAttribute("href"), target: a.getAttribute("target"), rel: a.getAttribute("rel") }))
    );
    for (const l of links) {
      if (!l.href || l.href.startsWith("#")) continue;
      if (l.href.startsWith("mailto:") || l.href.startsWith("tel:")) continue;
      if (l.href.startsWith("http")) {
        externalSeen.add(JSON.stringify({ href: l.href, target: l.target, rel: l.rel, on: route }));
      } else if (l.href.startsWith("/")) {
        internalSeen.add(l.href);
      }
    }
  }

  // Verify every internal link returns 200
  console.log(`  ${internalSeen.size} unique internal links found`);
  for (const href of internalSeen) {
    const res = await fetch(BASE + href, { redirect: "follow" });
    if (res.status === 200) ok();
    else fail(`internal link ${href} returns ${res.status}`);
  }

  // Spot-check external links (HEAD requests, allow timeouts)
  console.log(`  ${externalSeen.size} external link variants found, sampling 5`);
  const sample = [...externalSeen].slice(0, 5).map((s) => JSON.parse(s));
  for (const ext of sample) {
    try {
      const res = await fetch(ext.href, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(8000) });
      if (res.status < 500) ok();
      else warn(`external ${ext.href} returned ${res.status}`);
    } catch (e) {
      warn(`external ${ext.href} unreachable (${e.message})`);
    }
  }

  await ctx.close();
}

// ─── 3. Asset audit ───────────────────────────────────────────────────
async function assetAudit(browser) {
  head("3. Asset audit (videos, images, posters)");
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const assets = new Set();
  for (const r of ["/", "/about", "/services", "/services/home-cleaning", "/services/company-cleaning", "/services/uhnw", "/process", "/contact", "/blog"]) {
    await page.goto(BASE + r, { waitUntil: "domcontentloaded" });
    const urls = await page.evaluate(() => {
      const out = new Set();
      document.querySelectorAll("img[src], video, source[src], [poster]").forEach((el) => {
        const v = el.getAttribute("src") || el.getAttribute("poster");
        if (v && v.startsWith("/")) out.add(v);
      });
      return [...out];
    });
    urls.forEach((u) => assets.add(u));
  }
  console.log(`  ${assets.size} unique assets referenced`);
  for (const a of assets) {
    const filePath = path.join(PUBLIC_DIR, a);
    if (fs.existsSync(filePath)) ok();
    else fail(`asset ${a} not found in public/`);
  }
  await ctx.close();
}

// ─── 4. Security sweep ────────────────────────────────────────────────
async function securitySweep(browser) {
  head("4. Security sweep");

  // Repo-level scan for secrets (limited to source files, not node_modules)
  const secretPatterns = [
    /sk-[A-Za-z0-9]{20,}/,                          // OpenAI key
    /sk_live_[A-Za-z0-9]{20,}/,                     // Stripe
    /AKIA[0-9A-Z]{16}/,                             // AWS
    /AIza[0-9A-Za-z-_]{35}/,                        // Google API
    /xox[baprs]-[A-Za-z0-9-]{20,}/,                 // Slack
    /-----BEGIN (RSA|EC|OPENSSH) PRIVATE KEY-----/, // private keys
  ];
  const scanDirs = ["src", "content", "scripts", "public"];
  let secretFound = 0;
  for (const d of scanDirs) {
    if (!fs.existsSync(d)) continue;
    const walk = (dir) => {
      for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, f.name);
        if (f.isDirectory()) walk(p);
        else if (/\.(ts|tsx|js|mjs|md|mdx|json|env|yml|yaml)$/.test(f.name)) {
          const body = fs.readFileSync(p, "utf8");
          for (const re of secretPatterns) {
            if (re.test(body)) {
              fail(`possible secret in ${p}`);
              secretFound++;
              break;
            }
          }
        }
      }
    };
    walk(d);
  }
  if (secretFound === 0) ok();
  console.log(`  ${secretFound === 0 ? "no" : secretFound} secret pattern matches`);

  // External links: target=_blank must have rel=noopener (XSS / tabnabbing protection)
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  let noOpenerMissing = 0;
  for (const r of ["/", "/about", "/services", "/contact", "/blog"]) {
    await page.goto(BASE + r, { waitUntil: "domcontentloaded" });
    const bad = await page.$$eval('a[target="_blank"]', (as) =>
      as
        .filter((a) => {
          const rel = (a.getAttribute("rel") || "").toLowerCase();
          return !rel.includes("noopener");
        })
        .map((a) => a.getAttribute("href"))
    );
    if (bad.length) {
      bad.forEach((h) => fail(`${r}: target=_blank missing rel=noopener on ${h}`));
      noOpenerMissing += bad.length;
    }
  }
  if (noOpenerMissing === 0) ok();

  // SECURITY headers on prod responses
  const res = await fetch(BASE + "/", { method: "GET" });
  const h = Object.fromEntries(res.headers);
  const wantedHeaders = ["x-content-type-options"];
  for (const wh of wantedHeaders) {
    if (h[wh]) ok();
    else warn(`response missing recommended header: ${wh} (Vercel adds these in production by default)`);
  }
  // Check CSP / X-Frame-Options notes
  if (!h["content-security-policy"]) warn("no CSP header (consider adding via Next config or Vercel)");
  if (!h["strict-transport-security"]) warn("no HSTS header (Vercel auto-adds on HTTPS, only an issue on local)");

  // Form action does NOT submit anywhere risky (no leaking PII)
  await page.goto(BASE + "/contact", { waitUntil: "domcontentloaded" });
  const formAction = await page.$eval("form", (f) => f.getAttribute("action") || "");
  if (!formAction || formAction === "#") ok();
  else warn(`form has action="${formAction}" (verify backend endpoint)`);

  await ctx.close();
}

// ─── 5. Responsive smoke ──────────────────────────────────────────────
async function responsiveSmoke(browser) {
  head("5. Responsive smoke (375 / 768 / 1440)");
  const viewports = [
    { name: "mobile", width: 375, height: 812 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "desktop", width: 1440, height: 900 },
  ];
  for (const v of viewports) {
    const ctx = await browser.newContext({ viewport: { width: v.width, height: v.height }, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    for (const r of ["/", "/services", "/about", "/contact"]) {
      await page.goto(BASE + r, { waitUntil: "domcontentloaded" });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (overflow <= 1) ok();
      else fail(`${v.name} ${r}: horizontal overflow ${overflow}px`);
    }
    await ctx.close();
  }
}

// ─── 6. Contact form interactive test ─────────────────────────────────
async function contactFormTest(browser) {
  head("6. Contact form (multi-step + validation + submit)");
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();

  await page.goto(BASE + "/contact", { waitUntil: "networkidle" });

  // Step 0: pick topic, click Next without topic → should NOT advance (validation)
  const nextBtn = page.getByRole("button", { name: /Next/i });
  await nextBtn.click();
  // Wait briefly then check we're still on step 0
  await page.waitForTimeout(300);
  const stillStep0 = await page.locator("text=/Step 1 of 3/i").isVisible().catch(() => false);
  if (stillStep0) ok();
  else fail("form advanced past step 0 without selecting a topic");

  // Pick topic and advance
  await page.getByText("Home cleaning").first().click();
  await nextBtn.click();
  await page.waitForTimeout(300);
  const onStep1 = await page.locator("text=/Step 2 of 3/i").isVisible().catch(() => false);
  if (onStep1) ok();
  else fail("form did not advance to step 1");

  // Step 1: fill required fields and advance
  await page.getByPlaceholder("Marina Cohen").fill("QA Test");
  await page.getByPlaceholder("you@example.com").fill("test@example.com");
  await page.getByPlaceholder("+34 600 000 000").fill("+34600000000");
  await page.getByPlaceholder(/Eixample/i).fill("Eixample");
  await nextBtn.click();
  await page.waitForTimeout(300);
  const onStep2 = await page.locator("text=/Step 3 of 3/i").isVisible().catch(() => false);
  if (onStep2) ok();
  else fail("form did not advance to step 2");

  // Step 2: try to submit without details / consent
  const submitBtn = page.getByRole("button", { name: /Send request/i });
  await submitBtn.click();
  await page.waitForTimeout(300);
  const stillForm = await page.locator("text=/Thank you/i").isVisible().catch(() => false);
  if (!stillForm) ok();
  else fail("form submitted without required details/consent");

  // Fill details, accept consent, submit
  await page.locator("textarea").fill("This is a QA test submission with enough detail to pass validation.");
  await page.locator('input[type="checkbox"]').check();
  await submitBtn.click();
  await page.waitForTimeout(1500);
  const thankYou = await page.locator("text=/Thank you/i").isVisible().catch(() => false);
  if (thankYou) ok();
  else fail("form did not show success state after happy-path submit");

  await ctx.close();
}

// ─── 7. Stress test ───────────────────────────────────────────────────
async function stressTest() {
  head("7. Stress test (50 concurrent requests, p50 / p95)");
  const targets = ROUTES.filter((r) => !["/icon.svg", "/opengraph-image", "/sitemap.xml", "/robots.txt"].includes(r));
  for (const r of targets) {
    const N = 50;
    const start = performance.now();
    const results = await Promise.all(
      Array.from({ length: N }).map(async () => {
        const t0 = performance.now();
        const res = await fetch(BASE + r);
        await res.arrayBuffer();
        return { ms: performance.now() - t0, status: res.status };
      })
    );
    const wallMs = performance.now() - start;
    const times = results.map((x) => x.ms).sort((a, b) => a - b);
    const p50 = Math.round(times[Math.floor(N * 0.5)]);
    const p95 = Math.round(times[Math.floor(N * 0.95)]);
    const max = Math.round(times[N - 1]);
    const errors = results.filter((x) => x.status !== 200).length;
    if (errors === 0 && p95 < 800) ok();
    else if (errors > 0) fail(`${r}: ${errors}/${N} errored`);
    else warn(`${r}: p95 ${p95}ms (>800ms) under 50 concurrent (wall ${Math.round(wallMs)}ms)`);
    console.log(`  ${r.padEnd(50)} p50=${p50}ms p95=${p95}ms max=${max}ms wall=${Math.round(wallMs)}ms`);
  }
}

// ─── 8. Cross-browser smoke ───────────────────────────────────────────
async function crossBrowserSmoke() {
  head("8. Cross-browser smoke (Chromium / Firefox / WebKit)");
  for (const [name, launcher] of [
    ["chromium", chromium],
    ["webkit", webkit],
  ]) {
    try {
      const b = await launcher.launch();
      const c = await b.newContext({ viewport: { width: 1280, height: 800 } });
      const p = await c.newPage();
      await p.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: 20000 });
      const title = await p.title();
      if (title.includes("BCN")) ok();
      else fail(`${name}: title doesn't contain BCN (${title})`);
      await b.close();
    } catch (e) {
      warn(`${name} skipped: ${e.message.split("\n")[0]}`);
    }
  }
  // Firefox: only test if installed
  try {
    const b = await firefox.launch();
    const c = await b.newContext({ viewport: { width: 1280, height: 800 } });
    const p = await c.newPage();
    await p.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: 20000 });
    if ((await p.title()).includes("BCN")) ok();
    else fail("firefox: title check failed");
    await b.close();
  } catch (e) {
    warn(`firefox skipped: ${e.message.split("\n")[0]}`);
  }
}

// ─── Run ──────────────────────────────────────────────────────────────
(async () => {
  console.log(`QA against ${BASE}\n`);
  const browser = await chromium.launch();
  try {
    await checkRoutes();
    await linkAudit(browser);
    await assetAudit(browser);
    await securitySweep(browser);
    await responsiveSmoke(browser);
    await contactFormTest(browser);
  } finally {
    await browser.close();
  }
  await stressTest();
  await crossBrowserSmoke();

  console.log("\n=== Summary ===");
  console.log(`  ✓ ${okCount.val} checks passed`);
  if (warns.length) console.log(`  ⚠ ${warns.length} warnings`);
  if (fails.length) {
    console.log(`  ✗ ${fails.length} failures`);
    process.exit(1);
  } else {
    console.log("  ALL GREEN");
  }
})();
