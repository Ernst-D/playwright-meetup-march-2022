from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    device = p.devices["Nokia N9"]
    browser = p.chromium.launch(headless=False, slow_mo=50, )
    context = browser.new_context(**device, permissions=["geolocation"])
    context.set_geolocation({"longitude": 38.727648 , "latitude": -9.1583030}) 
    page = context.new_page()
    page.goto("https://www.gps-coordinates.net/my-location")
    page.wait_for_selector('[id="addr"]',state="visible")
    page.screenshot(path="./screenshot.py.png")
    browser.close()