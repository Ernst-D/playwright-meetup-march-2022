import base from '@playwright/test';
import { expect } from '@playwright/test';
import { loginAction, logoutAction } from '../actions/common.actions';
import { predefinedUser, testUrl } from "../fixtures/logout.fixture";
import {MainPage} from '../pages/main.page';


/**
 * "context" and "page" fixtures are not supported in beforeAll,
 * so we extend test object with some predefined conditions
 */
const test = base.extend<{ mainPage: MainPage, testUrl: typeof testUrl }>({    
    testUrl: ({},use) => {
        use(testUrl);
    },
    mainPage: async ({ page }, use) => {
        const mainPage = new MainPage(page);

        await test.step("Navigate to the main page",async() => {
            await mainPage.page.goto(testUrl.href, {timeout:60000});
        });
        await test.step("Login action",async() => {
            await loginAction(mainPage);
        });
        await test.step("Assert personal info", async() => {   
            await page.click('text=My personal information');
            await expect(page.locator('#email')).toHaveValue(predefinedUser().email);
        });

        await use(mainPage);

        await mainPage.page.waitForLoadState("load");
        await expect(mainPage.page.locator("a >> text=Sign in")).toBeVisible(); 
}});

test.describe.parallel("Logout test suite",() => {
    test('Logout UI with predefined user', async ({ mainPage }) => {
        let page = mainPage.page;
        await test.step("Logout action via UI", async () => {
           await logoutAction(page);
           expect(true).toBeFalsy();
        });
    });
    
    test("Logout via API with predifined user", async ({mainPage, testUrl}) => {
        await test.step("Logout action via request", async () => {
            // @ts-ignore
            mainPage.page.testUrl = testUrl;
            await logoutAction(mainPage.page,"request");
         });
    });
});