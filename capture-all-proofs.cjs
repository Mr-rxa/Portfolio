const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');

const artifactDir = 'C:\\Users\\sharm\\.gemini\\antigravity\\brain\\ee61673f-b6cf-428f-a9c7-18ae3fc3cf2a';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

(async () => {
  console.log('Starting full browser test suite...');
  const browser = await chromium.launch({ executablePath: chromePath, headless: true });

  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  // 1. Visit #graph to test Hero Battery Twin & Causal Graph
  console.log('Navigating to #graph view...');
  await page.goto('http://localhost:5173/#graph', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);

  // If boot sequence is showing, click to skip
  try {
    const boot = await page.$('text=Click or press key to skip');
    if (boot) {
      console.log('Skipping boot sequence...');
      await page.click('text=Click or press key to skip');
      await page.waitForTimeout(500);
    }
  } catch (e) {}

  // 1. Capture Hero Battery Twin
  console.log('Capturing Hero Battery Twin...');
  const heroPath = path.join(artifactDir, 'proof_hero_battery_twin.png');
  await page.screenshot({ path: heroPath });
  console.log('Saved:', heroPath);

  // 2. Scroll to Causal Graph and hover over Python node
  console.log('Scrolling to Causal Graph...');
  await page.evaluate(() => {
    document.getElementById('causal-graph-canvas')?.scrollIntoView();
  });
  await page.waitForTimeout(1000);
  const graphPath = path.join(artifactDir, 'proof_causal_graph.png');
  await page.screenshot({ path: graphPath });
  console.log('Saved:', graphPath);

  // 3. Open Smart Ambulance Playable Proof Modal
  console.log('Opening Smart Ambulance proof...');
  await page.goto('http://localhost:5173/#/project/smart-ambulance', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const ambPath = path.join(artifactDir, 'proof_smart_ambulance.png');
  await page.screenshot({ path: ambPath });
  console.log('Saved:', ambPath);

  // 4. Open AI Retail War Room Playable Proof Modal
  console.log('Opening Retail War Room proof...');
  await page.goto('http://localhost:5173/#/project/retail-war-room', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const warRoomPath = path.join(artifactDir, 'proof_retail_war_room.png');
  await page.screenshot({ path: warRoomPath });
  console.log('Saved:', warRoomPath);

  // 5. Open Rice Leaf Disease Playable Proof Modal
  console.log('Opening Rice Disease proof...');
  await page.goto('http://localhost:5173/#/project/rice-disease', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const ricePath = path.join(artifactDir, 'proof_rice_disease.png');
  await page.screenshot({ path: ricePath });
  console.log('Saved:', ricePath);

  // 6. Open Olist Marketplace Customer Clustering Proof Modal
  console.log('Opening Olist Clustering proof...');
  await page.goto('http://localhost:5173/#/project/olist-analytics', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const olistPath = path.join(artifactDir, 'proof_olist_churn.png');
  await page.screenshot({ path: olistPath });
  console.log('Saved:', olistPath);

  // 7. Mobile Viewport (390x844) on #graph
  console.log('Testing Mobile 390px Viewport on Graph...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('http://localhost:5173/#graph', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(800);
  const mobilePath = path.join(artifactDir, 'mobile_hero_and_graph.png');
  await mobilePage.screenshot({ path: mobilePath });
  console.log('Saved:', mobilePath);

  await browser.close();
  console.log('All browser test screenshots captured successfully!');
})();
