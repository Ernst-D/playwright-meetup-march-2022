using Microsoft.Playwright;

class Program
{
    public static async Task Main()
    {
        using var playwright = await Playwright.CreateAsync();
        await using var browser = await playwright.Chromium.LaunchAsync(
            new BrowserTypeLaunchOptions { 
                Headless = false
            }
        );
        // maybe try iPhone 12 to show "Safari on Windows"
        var pageOpts = new BrowserNewContextOptions(playwright.Devices["Pixel 5"]){
            Geolocation = new() { Longitude = 12.492507f, Latitude = 41.889938f },
            Permissions = new[] { "geolocation" },
            Locale = "de-DE"
        };

        var context = await browser.NewContextAsync(pageOpts);

        var page = await context.NewPageAsync();
        
        await page.GotoAsync("https://www.whatismybrowser.com/");
        await page.ScreenshotAsync(new PageScreenshotOptions { Path = "mybrowser.png" });
    }
}