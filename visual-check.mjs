import { chromium } from "playwright";

const baseUrl = "http://localhost:5174/";
const routes = ["#/home", "#/about", "#/arsenal", "#/projects", "#/japan"];

async function canvasHasColor(page) {
  return page.evaluate(() => {
    const canvas = document.querySelector("#neural-grid");
    const ctx = canvas?.getContext("webgl2") || canvas?.getContext("webgl");
    if (!canvas || !ctx) return false;

    const width = canvas.width;
    const height = canvas.height;
    const pixels = new Uint8Array(4 * 24 * 24);
    ctx.readPixels(
      Math.max(0, Math.floor(width / 2) - 12),
      Math.max(0, Math.floor(height / 2) - 12),
      24,
      24,
      ctx.RGBA,
      ctx.UNSIGNED_BYTE,
      pixels
    );

    return pixels.some((value) => value > 8);
  });
}

async function checkViewport(browser, name, viewport) {
  const page = await browser.newPage({ viewport });
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);

  const title = await page.locator(".glow-title").first().textContent();
  if (!title || !title.trim()) {
    throw new Error(`${name}: headline did not render`);
  }

  for (const route of routes) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(250);
    const active = await page.locator(".nav-links a.active").textContent();
    if (!active) throw new Error(`${name}: missing active nav for ${route}`);
  }

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  const hasCanvasPixels = await canvasHasColor(page);
  if (!hasCanvasPixels) {
    throw new Error(`${name}: Three.js canvas appears blank`);
  }

  await page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  await page.close();
}

const browser = await chromium.launch();
try {
  await checkViewport(browser, "desktop", { width: 1440, height: 960 });
  await checkViewport(browser, "mobile", { width: 390, height: 844 });
  console.log("Visual check passed: desktop/mobile pages render and canvas has colored pixels.");
} finally {
  await browser.close();
}
