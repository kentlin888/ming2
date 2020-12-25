let webdriver = require('selenium-webdriver')
const {
    Builder,
    By,
    Key,
    until
} = require('selenium-webdriver')
//const assert = require('assert')
let assertLog = require('./assertLog.js')
const { assertTitle } = require('./assertLog.js')
let assertIndex = require('./MDPages/index/index.assertLog.js')

let fs = require('fs')
let path = require('path')
//-------chrome options
let chrome = require('selenium-webdriver/chrome')

var options = new chrome.Options();
options.addArguments("--start-maximized"); // 启动就最大化，而不是像后面再使用 maximize() 那样之后再最大化
options.addArguments("disable-extensions");

let service;
let pathDriver = path.join(__dirname, './chromedriver.exe')

// exe 安装之后在根目录找到chromedriver.exe
if (fs.existsSync(pathDriver)) {
    //console.log(path.join(__dirname, 'chromedriver.exe'));
    service = new chrome.ServiceBuilder(pathDriver).build();
}
chrome.setDefaultService(service);

/**@type {webdriver.ThenableWebDriver} */
let driver //= new webdriver.Builder().forBrowser('chrome').build();
let vars
var prefs = new webdriver.logging.Preferences();
prefs.setLevel(webdriver.logging.Type.BROWSER, webdriver.logging.Level.ALL);
options.setLoggingPrefs(prefs);
driver = new webdriver.Builder()
    .setChromeOptions(options)
    .withCapabilities(webdriver.Capabilities.chrome())
    .forBrowser(webdriver.Browser.CHROME)//'chrome')
    .build();
vars = {}
let entryManager_temp = new assertLog.EntryManager();
let entryManager_all = new assertLog.EntryManager();
async function getURL () {
    const TIMEOUT = 300000000
    await driver.manage().setTimeouts({
        implicit: TIMEOUT,
        pageLoad: TIMEOUT,
        script: TIMEOUT
    })
    //await driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);        
    console.info(await driver.manage().getTimeouts())
    await driver.get("http://localhost:3000/")

    let logs = await driver.manage().logs().get(webdriver.logging.Type.BROWSER)

    entryManager_temp.loadEntries(logs)
    entryManager_temp.filterAssertTitle();
    //console.log(JSON.stringify(entryManager_temp.arrayEntries,null,4))
    // .then((logs) => {
    //     entryManager_temp.loadEntries(logs)
        
    //     entryManager_temp.filterAssertTitle();
        
    //     let msg = assertIndex.loginSuccess(false)
    //     let findEntries = entryManager_temp.findEntries(msg);
    //     console.log("LOG: ~ file: try2.js ~ line 61 ~ .then ~ findEntries", JSON.stringify(findEntries,null,4))
    //     // // let arrayEntries = logs.map((/**@type {webdriver.logging.Entry}*/entry) => {
            
    //     // // })
    //     // console.log(JSON.stringify(logs[0],null,4));
    //     // console.log(logs[0])
    // })
    // await driver.manage().logs().get(webdriver.logging.Type.BROWSER)
    // .then((logs) => {
    //     console.log(JSON.stringify(logs,null,4));
    // })
    
    
    // .then((logs) => {
    //     console.log(JSON.stringify(logs));
    // })
    await driver.manage().logs().get(webdriver.logging.Type.BROWSER)
    // .then((logs) => {
    //     console.log(JSON.stringify(logs));
    // })
    //await driver.manage().window().setRect(1900, 1020)
    //await driver.sleep(1000)
}

getURL();


// LoggingPreferences logPrefs = new LoggingPreferences();
//         logPrefs.enable(LogType.BROWSER, Level.ALL);
//         caps.setCapability(CapabilityType.LOGGING_PREFS, logPrefs);
//         driver = new ChromeDriver(caps);