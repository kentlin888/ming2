let webdriver = require('selenium-webdriver')
const {
    Builder,
    By,
    Key,
    until
} = require('selenium-webdriver')
//const assert = require('assert')
const {
    assert
} = require('chai')
let fs = require('fs')
let path = require('path')

const {
    assertTitle,
} = require('../assertLog.js')
const EntryManager = require('../entryManager.js')
//-------chrome options
let chrome = require('selenium-webdriver/chrome')
const {
    doesNotReject
} = require('assert')


var options = new chrome.Options();
options.addArguments("--start-maximized"); // 启动就最大化，而不是像后面再使用 maximize() 那样之后再最大化
//options.addArguments("disable-extensions");
var prefs = new webdriver.logging.Preferences();
prefs.setLevel(webdriver.logging.Type.BROWSER, webdriver.logging.Level.ALL);
options.setLoggingPrefs(prefs);

let service;
let pathDriver = path.join(__dirname, '../chromedriver.exe')

// exe 安装之后在根目录找到chromedriver.exe
if (fs.existsSync(pathDriver)) {
    //console.log(path.join(__dirname, 'chromedriver.exe'));
    service = new chrome.ServiceBuilder(pathDriver).build();
}
chrome.setDefaultService(service);



// this.timeout(15* 1000)
/**@type {webdriver.ThenableWebDriver} */
let driver //= new webdriver.Builder().forBrowser('chrome').build();
let vars
driver = new webdriver.Builder()
    .setChromeOptions(options)
    .withCapabilities(webdriver.Capabilities.chrome())
    .forBrowser('chrome')
    .build();
vars = {}

let entryManager_temp = new EntryManager();
let entryManager_all = new EntryManager();
/**
 * @returns {webdriver.WebElementPromise}
 */
function findElement() {
    return this.driver.findElement(this)
}

async function until_assert_elementTextIs(matchText, timeout) {
    let elem = (await this.findElement()) //login.spanDisplayEmail.findElement())
    let condition = until.elementTextIs(elem, matchText) //'ice4kimo@yahoo.com.tw')
    await this.driver.wait(condition, timeout);
    return assert(await elem.getText() === matchText) //'ice4kimo@yahoo.com.tw')
}
By.prototype.findElement = findElement;
By.prototype.until_assert_elementTextIs = until_assert_elementTextIs;
By.prototype.driver = driver;

/**@type {index} */
let index = require('../MDPages/index/index.md');
let assertIndex = require('../MDPages/index/index.assertLog.js')
/**@type {cusModalLogin} */
let cusModalLogin = require('../MDPages/cusModalLogin/cusModalLogin.md');
//let assertcusModalLogin = require('../MDPages/cusModalLogin/index.assertLog.js')


/**@type {webdriver.WebElement} */
let elem
let elemTimeout = 5000;
let sAssertText = ''
/**@type {webdriver.logging.Entry[]} */
let logs
/**@type {webdriver.logging.Entry[]} */
let findEntries
let assertMsg = ''

//await driver.get("https://ming2-dad1d.firebaseapp.com/#/ProductListSearch")
before();
async function before() {
    const TIMEOUT = 9 * 1000 * 1000 // seconds
    await driver.manage().setTimeouts({
        implicit: TIMEOUT,
        pageLoad: TIMEOUT,
        script: TIMEOUT
    })
    //await driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);        
    console.info(await driver.manage().getTimeouts())
    await driver.get("http://localhost:3000/")
    //await driver.manage().window().setRect(1900, 1020)
    //await driver.sleep(1000)

    //ok
    let mm = By.id('aa')
    let aa = await driver.findElement(mm)
    //aa.sendKeys('PLLL')
    driver.executeScript("document.querySelector('#aa').setAttribute('value', 'new value for element')");


    let uu = By.css(`[data-testid='iptDemo']`) // [data-testid='iptDemo'] cus-demo
    let tt =  await driver.findElement(uu)
    console.log("LOG: ~ file: try2.js ~ line 117 ~ before ~ tt", tt)
    tt.sendKeys('PLLL')
    //data-testid="iptDemo" cus-demo
    

    // elem = (await index.btnLogin.findElement())
    // elem.click();
    // elem = (await cusModalLogin.btnRegisterEmail.findElement())
    // elem.click();
    // elem = (await cusModalLogin.iptSignInEmail.findElement())
    
    // let longstring = 'PPPPP'

    // let inputField = await cusModalLogin.iptSignInEmail.findElement()
    // driver.executeScript("arguments[0].setAttribute('value', '" + longstring +"')", inputField);

    // await elem.sendKeys(333666)   
    
    // await driver.executeScript("arguments[0].setAttribute('value', '" + longstring + "')", elem)



    //webdriver.executeScript("document.getElementById('elementID').setAttribute('value', 'new value for element')");
    
    //await driver.executeScript("arguments[0].setAttribute('value', '" + longstring +"')", elem);
    // let cc = await  elem.getTagName();
    // let sss = 'PPPPP'
    // elem.sendKeys(sss)
    //driver.executeScript(`document.querySelector("[data-testid='iptSignInEmail']").setAttribute('value', 'new value for element')`);

    // document.querySelector("#modalLogin > div > div > div.modal-body > form.signInHtm.titleText > div:nth-child(1) > input[type=email]")

    // // await elem.clear();
    // await elem.sendKeys("MMM")

    //driver.executeScript(`arguments[0].setAttribute('value','Selenium Web Driver')`,cusModalLogin.iptSignInEmail.findElement());
    // JavascriptExecutor jse = (JavascriptExecutor)driver;
    // jse.executeScript("arguments[0].value='enter the value here';", element);
    // elem.sendKeys("value","BBB")
    // let value = 'ice4kimo@yahoo.com.tw'
    //await driver.executeScript("arguments[0].setAttribute('value', '" + value +"')", elem);
    // let sElem = `document.querySelector("[data-testid='iptSignInEmail']")`
    
    //driver.executeScript(`arguments[0].setAttribute('value', 'AAA')`, elem);
    //driver.executeScript("document.getElementById('[data-testid=]').value='AAA'")


}