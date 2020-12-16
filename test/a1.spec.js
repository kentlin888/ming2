// Generated by Selenium IDE
let webdriver = require('selenium-webdriver')
const {
    Builder,
    By,
    Key,
    until
} = webdriver//require('selenium-webdriver')
const assert = require('assert')
let fs = require('fs')
let path = require('path')
//-------chrome options
let chrome = require('selenium-webdriver/chrome')
var options = new chrome.Options();
options.addArguments("--start-maximized"); // 启动就最大化，而不是像后面再使用 maximize() 那样之后再最大化
// options.addArguments("--disable-popup-blocking");
// options.addArguments("no-sandbox");
options.addArguments("disable-extensions");
// options.addArguments("no-default-browser-check");

//if (chrome.getDefaultService() == null) {
    var service;
    
    let pathDriver = path.join(__dirname, 'chromedriver.exe')
    
    // exe 安装之后在根目录找到chromedriver.exe
    if (fs.existsSync(pathDriver)) {
        //console.log(path.join(__dirname, 'chromedriver.exe'));
        
        service = new chrome.ServiceBuilder(path.join(__dirname, 'chromedriver.exe')).build();
    }

    chrome.setDefaultService(service);

describe('A1333', function() {
  this.timeout(30000)
  let driver 
  // = new webdriver.Builder()
  // .setChromeOptions(options)
  // .withCapabilities(webdriver.Capabilities.chrome())
  // .forBrowser('chrome')
  // .build();

  let vars
  beforeEach(async function() {
    driver = new webdriver.Builder()
    .setChromeOptions(options)
    .withCapabilities(webdriver.Capabilities.chrome())
    .forBrowser('chrome')
    .build();
    //driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    //await driver.quit();
  })
  it('A1444', async function() {
    await driver.get("https://ming2-dad1d.firebaseapp.com/#/ProductListSearch")
    await driver.sleep(1000)
    
    //await driver.manage().window().setRect(1900, 1020)
    await driver.findElement(By.linkText("登入")).click()
    await driver.sleep(1000)
    await driver.findElement(By.css(".btnEmailSignin:nth-child(6)")).click()
    await driver.sleep(1000)
    //await driver.findElement(By.id("spanDisplayEmail")).click()
    assert(await driver.findElement(By.id("spanDisplayEmail")).getText() == "ice4kimo@yahoo.com.tw")
    // await driver.findElement(By.id("aLogout")).click()
    
  })
})
