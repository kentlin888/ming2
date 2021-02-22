static create(chromePath, headless) {
    const args = [
      "--disable-extensions",
      "--window-size=1366,768",
      "--no-sandbox", // required for Linux without GUI
      "--disable-gpu", // required for Windows,
      "--enable-logging --v=1", // write debug logs to file(debug.log)
    ];

    if (headless) {
      args.push("--headless")
    }

    const chromeCapabilities = selenium.Capabilities.chrome()
      .set('chromeOptions', { args })
      .set("chrome.binary", chromePath)
      .set("acceptInsecureCerts", true); // if you render localhost with SSL

    const builder = new selenium.Builder()
      .forBrowser('chrome')
      .withCapabilities(chromeCapabilities);

    return builder.build().then(driver => new Renderer(driver));
  }


  SendKeys("myUser");
SendKeys("{TAB}");
SendKeys("MyPassword");
SendKeys("~"); // Enter

https://stackoverflow.com/questions/5672407/how-to-perform-basic-authentication-for-firefoxdriver-chromedriver-and-iedriver  
