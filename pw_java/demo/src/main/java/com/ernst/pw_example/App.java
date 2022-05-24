package com.ernst.pw_example;

import com.microsoft.playwright.*;;

public class App 
{
    public static void main( String[] args )
    {
        try (Playwright playwright = Playwright.create()) {
            Browser browser = playwright.chromium().launch(
                new BrowserType.LaunchOptions().setHeadless(false)
            );
            Page page = browser.newPage();
            page.navigate("http://playwright.dev");
            System.out.println(page.title());
          }
    }
}
