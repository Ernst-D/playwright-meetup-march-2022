package com.example;

import com.microsoft.playwright.*;

public class CalculatorPage {
    private final Page page;
    private final Locator searchTermInput;

    public CalculatorPage(Page page) {
        this.page = page;
        this.searchTermInput = page.locator("[aria-label='Enter your search term']");
    }

    public void navigate() {
        page.navigate("https://bing.com");
    }

    public void search(String text) {
        searchTermInput.fill(text);
        searchTermInput.press("Enter");
    }
}
