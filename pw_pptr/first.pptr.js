const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, timeout: 60000})
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto('https://www.nytimes.com/')
  await page.screenshot({ path: 'nytimes.pptr.png', fullPage: true })
  await browser.close()
})()
