const { chromium } = require('playwright');
const chalk = require("chalk");

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  // Open new page
  const page = await context.newPage();

  page.on("request", (req)=>{
      if(req.url().endsWith("/graphql")){
          console.log(`Operation name: ${chalk.magenta(req.postDataJSON().operationName)}`)
      }
  })
  page.on("console",(msg)=>{
      console.log(`\n${msg.type()} | ${msg.location().url}: ${msg.text()}\n`);
  })

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');
  // Go to http://localhost:3000/signin
  await page.goto('http://localhost:3000/signin');
  // Click input[name="username"]
  await page.locator('input[name="username"]').click();
  // Fill input[name="username"]
  await page.locator('input[name="username"]').fill('Allie2');
  // Click input[name="password"]
  await page.locator('input[name="password"]').click();
  // Fill input[name="password"]
  await page.locator('input[name="password"]').fill('s3cret');
  // Click [data-test="signin-submit"]
  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://localhost:3000/' }*/),
    page.locator('[data-test="signin-submit"]').click()
  ]);
  // ---------------------
  await context.close();
  await browser.close();
})();