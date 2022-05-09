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

        var gcpOptions = new BrowserNewContextOptions(playwright.Devices["iPhone 12 Pro"]){
            Geolocation = new() { Longitude = 12.492507f, Latitude = 41.889938f },
            Permissions = new[] { "geolocation" },
            Locale = "de-DE"
        };

        var gcpContext = await browser.NewContextAsync(gcpOptions);

        var gcpPage = await gcpContext.NewPageAsync();
        
        await gcpPage.GotoAsync("https://www.whatismybrowser.com/");
        await gcpPage.ScreenshotAsync(new PageScreenshotOptions { Path = "mybrowser.png" });
    }
}