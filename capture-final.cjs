const { chromium } = require('playwright-core');
const ARTIFACT = 'C:/Users/sharm/.gemini/antigravity/brain/ee61673f-b6cf-428f-a9c7-18ae3fc3cf2a';

(async () => {
  const b = await chromium.launch({ channel: 'chrome' });

  // --- Desktop ---
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });
  await page.click('body');
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${ARTIFACT}/final_recruiter.png` });

  await page.click('button:has-text("Causal Graph")');
  await page.waitForTimeout(2800);
  await page.screenshot({ path: `${ARTIFACT}/final_graph.png` });

  await page.evaluate(() => window.scrollBy(0, 900));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${ARTIFACT}/final_proofs.png` });

  const cards = page.locator('button:has-text("Open Case Study")');
  await cards.first().click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${ARTIFACT}/final_modal.png` });

  await page.click('button:has-text("Case Study")');
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${ARTIFACT}/final_casestudy.png` });
  await ctx.close();

  // --- Mobile ---
  const ctx2 = await b.newContext({ viewport: { width: 390, height: 844 } });
  const page2 = await ctx2.newPage();
  await page2.goto('http://localhost:5174/', { waitUntil: 'networkidle' });
  await page2.click('body');
  await page2.waitForTimeout(700);
  await page2.screenshot({ path: `${ARTIFACT}/final_mobile.png` });

  await page2.click('button:has-text("Graph")');
  await page2.waitForTimeout(1500);
  await page2.screenshot({ path: `${ARTIFACT}/final_mobile_graph.png` });
  await ctx2.close();

  await b.close();
  console.log('DONE');
})();
