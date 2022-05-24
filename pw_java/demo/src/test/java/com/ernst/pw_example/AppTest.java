package com.ernst.pw_example;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.FrameLocator;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;
import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class AppTest {
  // Shared between all tests in this class.
  static Playwright playwright;
  static Browser browser;

  // New instance for each test method.
  BrowserContext context;
  Page page;

  static FrameLocator getWithinFrame(Page page){
    FrameLocator firstFrame = page.frameLocator("devsite-iframe iframe");
    FrameLocator secondFrame = firstFrame.frameLocator("#myFrame");
    return secondFrame;
  }

  @BeforeAll
  static void launchBrowser() {
    playwright = Playwright.create();
    browser = playwright.chromium().launch(new BrowserType.LaunchOptions()
    .setHeadless(false)
    .setSlowMo(1000));
  }

  @AfterAll
  static void closeBrowser() {
    playwright.close();
  }

  @BeforeEach
  void createContextAndPage() {
    context = browser.newContext();
    page = context.newPage();
  }

  @AfterEach
  void closeContext() {
    context.close();
  }

  @Test
  void shouldSearchWiki() {
    page.navigate("https://cloud.google.com/products/calculator");
    getWithinFrame(page)
    .locator("[ng-model='listingCtrl.computeServer.os']").click();    
    getWithinFrame(page).locator("[value='ubuntu-pro']").click();

    getWithinFrame(page).locator("[ng-model='listingCtrl.computeServer.quantity']").fill("2");
    getWithinFrame(page).locator("[ng-model='listingCtrl.computeServer.instance']").click();
    getWithinFrame(page).locator("[value='CP-COMPUTEENGINE-VMIMAGE-E2-STANDARD-4']").click();
    getWithinFrame(page)
    .locator("[aria-label='ComputeEngineForm'] >> text=Add to Estimate").click();
    assertTrue(
      getWithinFrame(page).locator("[ng-if='appCtrl.CartData.hasItems()']").isVisible()
    );
    page.pause();
  }
}