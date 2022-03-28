using Microsoft.Playwright;

class Program
{
    public static async Task Main()
    {
        using var playwright = await Playwright.CreateAsync();
        await using var browser = await playwright.Chromium.LaunchAsync(
            new BrowserTypeLaunchOptions { 
                Headless = false,
                SlowMo = 50
            }
        );
        var pwContext = await browser.NewContextAsync();

        await pwContext.Tracing.StartAsync(new TracingStartOptions
        {
            Screenshots = true,
            Snapshots = true,
            Sources = true
        });

        var pwPage = await pwContext.NewPageAsync();
        
        await pwPage.GotoAsync("https://playwright.dev/dotnet");
        
        // Click a:has-text("Docs")
        await pwPage.Locator("a:has-text('Docs')").ClickAsync();
        // Assert.AreEqual("https://playwright.dev/dotnet/docs/intro", page.Url);

        await pwPage.PauseAsync();

        // Click text=Trace Viewer
        await pwPage.Locator("[href='/dotnet/docs/trace-viewer']").ClickAsync();
        // Assert.AreEqual("https://playwright.dev/dotnet/docs/trace-viewer", page.Url);

        // Click img[alt="Playwright Trace Viewer"]
        await pwPage.WaitForSelectorAsync("img[alt=\"Playwright Trace Viewer\"]", 
        new PageWaitForSelectorOptions{
            State = WaitForSelectorState.Visible
        });

        await pwContext.Tracing.StopAsync(new TracingStopOptions
        {
            Path = "trace.zip"
        });
        await pwContext.CloseAsync();
        await browser.CloseAsync();
    }
}