package com.ernst.pw_example;

import com.microsoft.playwright.*;
import com.microsoft.playwright.options.LoadState;
import com.microsoft.playwright.options.WaitForSelectorState;;

public class App 
{
    public static void main( String[] args )
    {
        try (Playwright playwright = Playwright.create()) {
            Browser browser = playwright.chromium().launch(
                new BrowserType.LaunchOptions()
                .setHeadless(false)
                .setSlowMo(500)
            );
            Page page = browser.newPage();

            page.onRequest(handler -> {
                if(handler.url().endsWith("/graphql")){
                    System.out.println(String.format("Operation name: %s \n", handler.postData()));
                }
            });
            page.onConsoleMessage(handler -> {
                System.out.println(String.format("%s | %s: %s \n", handler.type(),handler.location(),handler.text()));
            });

            page.navigate("http://localhost:3000/");
            page.locator("input[name=\"username\"]").fill("Tavares_Barrows");
            page.locator("input[name=\"password\"]").fill("s3cret");
            page.locator("[data-test='signin-submit']").click();

            page.waitForSelector("[data-test='transaction-list']", 
                new Page.WaitForSelectorOptions().setState(WaitForSelectorState.VISIBLE)
            );
            page.waitForLoadState(
                LoadState.NETWORKIDLE
            );
          }
    }
}
