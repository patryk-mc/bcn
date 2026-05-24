import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" }).then(c => c.newPage());
await page.goto("http://localhost:3210/", { waitUntil: "networkidle" });
await page.waitForTimeout(800);

const sections = await page.evaluate(() => {
  const result = [];
  const all = document.querySelectorAll("section");
  all.forEach((s, i) => {
    const rect = s.getBoundingClientRect();
    const text = (s.textContent || "").trim().slice(0, 60).replace(/\s+/g, " ");
    result.push({ i, top: window.scrollY + rect.top, height: rect.height, text });
  });
  return { sections: result, total: document.body.scrollHeight };
});
console.log(JSON.stringify(sections, null, 2));
await browser.close();
