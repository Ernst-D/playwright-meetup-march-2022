const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Go to https://bowery-development.herokuapp.com/
  await page.goto('https://bowery-development.herokuapp.com/');

  // Go to https://bowery-development.herokuapp.com/login
  await page.goto('https://bowery-development.herokuapp.com/login');

  // Click input[name="username"]
  await page.locator('input[name="username"]').click();

  // Fill input[name="username"]
  await page.locator('input[name="username"]').fill('ernst.dzeravianka@boweryvaluation.com');

  // Click input[name="password"]
  await page.locator('input[name="password"]').click();

  // Fill input[name="password"]
  await page.locator('input[name="password"]').fill('login');

  // Click button:has-text("Sign In")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://bowery-development.herokuapp.com/' }*/),
    page.locator('button:has-text("Sign In")').click()
  ]);

  // Click button:has-text("+ New Report")
  await page.locator('button:has-text("+ New Report")').click();

  // Click [placeholder="Search Address"]
  await page.locator('[placeholder="Search Address"]').click();

  // Fill [placeholder="Search Address"]
  await page.locator('[placeholder="Search Address"]').fill('462');

  // Click text=462 1st Avenue, New York, NY, USA
  await page.locator('text=462 1st Avenue, New York, NY, USA').click();

  // Click button:has-text("Search")
  await page.locator('button:has-text("Search")').click();

  // Click text=462 1 Avenue
  await page.locator('text=462 1 Avenue').click();

  // Click button:has-text("Select")
  await page.locator('button:has-text("Select")').click();

  // Check input[name="settings\.pullExternalData"] >> nth=1
  await page.locator('input[name="settings\\.pullExternalData"]').nth(1).check();

  // Click [placeholder="\#\#\#\#\#\#\#\#\#\#"]
  await page.locator('[placeholder="\\#\\#\\#\\#\\#\\#\\#\\#\\#\\#"]').click();

  // Fill [placeholder="\#\#\#\#\#\#\#\#\#\#"]
  await page.locator('[placeholder="\\#\\#\\#\\#\\#\\#\\#\\#\\#\\#"]').fill('playwright-test-job-1234');

  // Check input[name="settings\.templateType"] >> nth=0
  await page.locator('input[name="settings\\.templateType"]').first().check();

  // Check input[name="settings\.incomeType"] >> nth=0
  await page.locator('input[name="settings\\.incomeType"]').first().check();

  // Check input[name="settings\.valueConclusionType"] >> nth=0
  await page.locator('input[name="settings\\.valueConclusionType"]').first().check();

  // Click button:has-text("Create Report")
  await page.locator('button:has-text("Create Report")').click();

  // Fill textarea[name="letterOfTransmittalPurpose\.additionalCommentary"]
  await page.locator('textarea[name="letterOfTransmittalPurpose\\.additionalCommentary"]').fill('febfhebfhe');

  // Click text=Client
  await page.locator('text=Client').click();

  // Click text=Yes
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://bowery-development.herokuapp.com/report/627922b557f02100211284fb/client' }*/),
    page.locator('text=Yes').click()
  ]);

  // Click .mui5-jss64
  await page.locator('.mui5-jss64').click();

  // Click text=Yes
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://bowery-development.herokuapp.com/reports' }*/),
    page.locator('text=Yes').click()
  ]);

  // ---------------------
  await context.close();
  await browser.close();
})();