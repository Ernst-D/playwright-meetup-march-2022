const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: false, timeout: 60000})
  const page = await browser.newPage()
  await page.setViewportSize({ width: 1280, height: 800 })
  await page.goto('https://www.nytimes.com/')
  await page.screenshot({ path: 'nytimes.pw.png', fullPage: true })
  await browser.close()
})()
