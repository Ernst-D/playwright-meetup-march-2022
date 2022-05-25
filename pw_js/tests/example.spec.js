// example.spec.js
const { test } = require('@playwright/test');

test('my test', async ({ page, browserName }) => {
  await page.goto('https://www.whatsmybrowser.org/');

  let os = await page.locator('[class="value small-6"]').first().textContent();
  console.log(os);
  await page.screenshot(
    {
      path:`./screenshots/${os.trim().replace(".","_")}.${browserName}.png`
    }
  );
});