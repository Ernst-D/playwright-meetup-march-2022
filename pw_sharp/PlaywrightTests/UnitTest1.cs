using System;
using System.Threading.Tasks;
using Microsoft.Playwright;
using NUnit.Framework;

namespace PlaywrightTests;

public class Tests
{
    public IBrowser _Browser { get; set;}
    public IPlaywright _Playwright { get; set;}

    [SetUp]
    public async Task SetupAsync()
    {
        var playwright = await Playwright.CreateAsync();
        _Playwright = playwright;

        var browser = await playwright.Chromium.LaunchAsync();
        _Browser = browser;
        
    }

    [TearDown]
    public async Task TearDownAsync(){
        await _Browser.CloseAsync();
        _Playwright.Dispose();
    }

    [Test]
    public async Task Test1Async()
    {   
        var gcpOptions = new BrowserNewContextOptions(_Playwright.Devices["iPhone 12 Pro"]){
            Geolocation = new() { Longitude = 12.492507f, Latitude = 41.889938f },
            Permissions = new[] { "geolocation" },
            Locale = "de-DE"
        };

        var pwContext = await _Browser.NewContextAsync();
        var gcpContext = await _Browser.NewContextAsync(gcpOptions);

        var pwPage = await pwContext.NewPageAsync();
        var gcpPage = await gcpContext.NewPageAsync();
        
        await pwPage.GotoAsync("https://playwright.dev/dotnet");
        await pwPage.ScreenshotAsync(new PageScreenshotOptions { Path = "screenshot.pw.png" });
        await gcpPage.GotoAsync("https://cloud.google.com");
        Console.WriteLine(await gcpPage.TitleAsync());
        await gcpPage.ScreenshotAsync(new PageScreenshotOptions { Path = "screenshot.gcp.png" });
    }
}