import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3210";
const OUT = path.join(process.cwd(), "screenshots");
fs.mkdirSync(OUT, { recursive: true });

const pages = [
  { name: "home-hero", path: "/", scroll: 0 },
  { name: "home-services", path: "/", scroll: 1200 },
  { name: "home-mission", path: "/", scroll: 2250 },
  { name: "home-grid", path: "/", scroll: 3400 },
  { name: "home-process", path: "/", scroll: 4500 },
  { name: "home-team", path: "/", scroll: 5300 },
  { name: "home-testimonials", path: "/", scroll: 6300 },
  { name: "home-blog", path: "/", scroll: 7500 },
  { name: "home-finalcta", path: "/", scroll: 8550 },
  { name: "services-hero", path: "/services", scroll: 0 },
  { name: "services-home-cleaning-card", path: "/services", scroll: 700 },
  { name: "services-company-card", path: "/services", scroll: 1400 },
  { name: "services-uhnw-card", path: "/services", scroll: 2100 },
  { name: "services-quote-band", path: "/services", scroll: 2800 },
  { name: "service-home-cleaning", path: "/services/home-cleaning", scroll: 0 },
  { name: "service-home-cleaning-body", path: "/services/home-cleaning", scroll: 700 },
  { name: "service-company", path: "/services/company-cleaning", scroll: 0 },
  { name: "service-uhnw", path: "/services/uhnw", scroll: 0 },
  { name: "service-uhnw-body", path: "/services/uhnw", scroll: 700 },
  { name: "service-uhnw-bgband", path: "/services/uhnw", scroll: 1500 },
  { name: "about-hero", path: "/about", scroll: 0 },
  { name: "contact-hero", path: "/contact", scroll: 0 },
  { name: "contact-form", path: "/contact", scroll: 700 },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  reducedMotion: "reduce",
});
const page = await ctx.newPage();

let last = "";
for (const p of pages) {
  if (p.path !== last) {
    await page.goto(`${BASE}${p.path}`, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(700);
    last = p.path;
  }
  if (p.scroll) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), p.scroll);
    await page.waitForTimeout(450);
  }
  await page.screenshot({ path: path.join(OUT, `${p.name}.png`), type: "png" });
  console.log(`✓ ${p.name}`);
}

await browser.close();
console.log(`\nDone — ${pages.length} viewport screenshots`);
