using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Playwright;
using NUnit.Framework;
using Newtonsoft.Json;

namespace PlaywrightTests;

public class Tests
{
    public IBrowser _Browser { get; set;}
    public IPlaywright _Playwright { get; set;}
    public IBrowserContext _Context { get; set; }

    public IPage _Page { get; set; }

    [OneTimeSetUp]
    public async Task SetupAsync()
    {
        var playwright = await Playwright.CreateAsync();
        _Playwright = playwright;

        var browserLaunchOptions = new BrowserTypeLaunchOptions { 
                Headless = false
        };
        var browser = await playwright.Chromium.LaunchAsync(browserLaunchOptions);
        _Browser = browser;

        _Context = await _Browser.NewContextAsync();

        _Page = await _Context.NewPageAsync();
    }

    [TearDown]
    public async Task TearDownAsync(){
        Console.WriteLine(await _Page.TitleAsync());
        await _Page.PauseAsync();
    }

    [OneTimeTearDown]
    public async Task OneTimeTearDownAsync(){
        await _Context.CloseAsync();
        await _Browser.CloseAsync();
        _Playwright.Dispose();
    }

    [Test]
    public async Task InterceptContent()
    {
        await _Page.RouteAsync("**/*", async route =>{
            if(route.Request.ResourceType == "stylesheet" ){
                await route.AbortAsync();
            }
            else {
                await route.ContinueAsync();
            }
        });
        await _Page.GotoAsync("https://danube-webshop.herokuapp.com/");
    }
    [Test]
    public async Task InterceptResponses()
    { 
        Object[] mockResponseObject = {new {
            id =  1,
            title = "How to Mock a Response",
            author = "A. Friend",
            genre = "business",
            price = "0.00",
            rating = "★★★★★",
            stock = 65535
        }};
        var list = new List<object>(){mockResponseObject};
        await _Page.RouteAsync("https://danube-webshop.herokuapp.com/api/books", async route =>{
            await route.FulfillAsync(new RouteFulfillOptions {
                ContentType = "application/json",
                Body = JsonConvert.SerializeObject(mockResponseObject)
            });
        });
        await _Page.GotoAsync("https://danube-webshop.herokuapp.com/");
    }
}