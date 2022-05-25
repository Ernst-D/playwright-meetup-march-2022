import { Page } from "@playwright/test";
import { predefinedUser } from "../fixtures/logout.fixture";
import {MainPage} from "../pages/main.page";

export const loginAction = async(mainPage: MainPage) => {
    let { email, password } = predefinedUser();
    await mainPage.signinBtn.click();
    await mainPage.page.fill('input[name="email"]', email);
    await mainPage.page.fill('input[name="passwd"]', password);    
    await mainPage.page.click('button:has-text("Sign in")');
}

export const logoutAction = async(page: Page, ui_request: ("ui" | "request") = "ui") => {
    /**
     * The reason why I added testUrl to page object is that our actions
     * shouldn't know anything about context where they are executes
     */
    // @ts-ignore
    let testUrl = page.testUrl;
    
    let logoutUI = async () => {
        return await page.locator("[class='logout'] >> text=Sign out").click();
    };
    let logoutRequest = async () => {
        await page.request.get(`${testUrl.href}?mylogout=`);
        /**
         * In case, if we want to do something extra :)
         * P.S. Better not do such thing in production
         */
        await page.evaluate((testUrl) => {
            window.fetch(`${testUrl.href}?controller=identity`);
        }, testUrl);     

        return await page.request.get(`${testUrl.href}?controller=authentication&back=identity`).then(response => {
            page.goto(response.url());
        });
    }

    ui_request == "ui" ? await logoutUI() : await logoutRequest();
}