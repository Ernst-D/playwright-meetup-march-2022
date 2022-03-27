package com.example;

import com.microsoft.playwright.*;

import models.gcp.MainPage;

public class App {
  public static void main(String[] args) {
      try (Playwright playwright = Playwright.create()) {
        Browser browser = playwright.chromium().launch(
          new BrowserType.LaunchOptions()
          .setHeadless(false)
        );
        BrowserContext context = browser.newContext();
        Page page = context.newPage();
        MainPage gcpPage = new MainPage(page);
        gcpPage.navigateToGCP();
        gcpPage.searchForCalcluator().setUpCloudMachine();
        gcpPage.getPage().pause();
        
        context.close();
        browser.close();
    }
  }
}