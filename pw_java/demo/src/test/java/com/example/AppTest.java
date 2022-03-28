package com.example;

import com.microsoft.playwright.Browser;
import com.microsoft.playwright.BrowserContext;
import com.microsoft.playwright.BrowserType;
import com.microsoft.playwright.Page;
import com.microsoft.playwright.Playwright;

import org.junit.jupiter.api.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class AppTest {
  // Shared between all tests in this class.
  static Playwright playwright;
  static Browser browser;

  // New instance for each test method.
  BrowserContext context;
  Page page;

  @BeforeAll
  static void launchBrowser() {
    playwright = Playwright.create();
    browser = playwright.webkit().launch(new BrowserType.LaunchOptions()
    .setHeadless(false));
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
    page.pause();
    context.close();
  }

  @Test
  void shouldClickButton() {
    page.navigate("data:text/html,<script>var result;</script><button onclick='result=\"Clicked\"'>Go</button>");
    page.click("button");
    assertEquals("Clicked", page.evaluate("result"));
  }

  @Test
  void shouldCheckTheBox() {
    page.setContent("<input id='checkbox' type='checkbox'></input>");
    page.check("input");
    assertTrue((Boolean) page.evaluate("() => window['checkbox'].checked"));
  }

  @Test
  void shouldSearchWiki() {
    page.navigate("https://www.wikipedia.org/");
    page.click("input[name=\"search\"]");
    page.fill("input[name=\"search\"]", "playwright");
    page.press("input[name=\"search\"]", "Enter");
    assertEquals("https://en.wikipedia.org/wiki/Playwright", page.url());
  }

  @Test
  void shouldMakeFetch(){
    page.navigate("http://example.com/");
    int status = (int) page.evaluate("async () => {\n" +
    "  const response = await fetch('http://example.com');\n" +
    "  return response.status;\n" +
    "}");
    assertEquals(200, status);
  }
}