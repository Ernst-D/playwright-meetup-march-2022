using Microsoft.Playwright;
using System.Threading.Tasks;

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

        var pwContext = await browser.NewContextAsync();
        var gcpContext = await browser.NewContextAsync(gcpOptions);

        var pwPage = await pwContext.NewPageAsync();
        var gcpPage = await gcpContext.NewPageAsync();
        
        await pwPage.GotoAsync("https://playwright.dev/dotnet");
        await pwPage.ScreenshotAsync(new PageScreenshotOptions { Path = "screenshot.pw.png" });
        await gcpPage.GotoAsync("https://cloud.google.com");
        await gcpPage.ScreenshotAsync(new PageScreenshotOptions { Path = "screenshot.gcp.png" });
    }
}