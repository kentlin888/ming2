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
const testdata = require('./testdata.js')
//-------chrome options
let chrome = require('selenium-webdriver/chrome')
const { doesNotReject } = require('assert')


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

describe('UI-Login', async function () {
    this.timeout(15* 1000)
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

    By.prototype.constructor.prototype.findElement = findElement
    By.prototype.constructor.prototype.until_assert_elementTextIs = until_assert_elementTextIs
    By.prototype.constructor.prototype.driver = driver
    // both work     
    // By.prototype.findElement = findElement;
    // By.prototype.until_assert_elementTextIs = until_assert_elementTextIs;
    // By.prototype.driver = driver;

    // async function initSuite() {

    // }
    beforeEach(async function () {
        // driver = new webdriver.Builder()
        //     .setChromeOptions(options)
        //     .withCapabilities(webdriver.Capabilities.chrome())
        //     .forBrowser('chrome')
        //     .build();
        // vars = {}
    })
    afterEach(async function () {
        //await driver.quit();
    })

    /**@type {index} */
    let index = require('../MDPages/index/index.md');
    let assertIndex = require('../MDPages/index/index.assertLog.js')
    /**@type {cusModalLogin} */
    let cusModalLogin = require('../MDPages/cusModalLogin/cusModalLogin.md');
    //let assertcusModalLogin = require('../MDPages/cusModalLogin/index.assertLog.js')
    
    
    /**@type {webdriver.WebElement} */
    let elem
    let elemTimeout = 5000;
    /**
     * 
     * @param {any} byElem // typeof By.
     * @return {webdriver.WebElementPromise}
     */
    function getElement(byElem) {
        return byElem.findElement()
    }
    let sAssertText = ''
    /**@type {webdriver.logging.Entry[]} */
    let logs
    /**@type {webdriver.logging.Entry[]} */
    let findEntries
    let assertMsg=''
    
    //await driver.get("https://ming2-dad1d.firebaseapp.com/#/ProductListSearch")

    before(async function () {
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
    })

    
    it('註冊Email帳號 - user exist', async function () {
        (await getElement(index.btnLogin)).click();
        // elem = (await index.btnLogin.findElement())
        // elem.click();
        (await getElement(cusModalLogin.btnRegisterEmail)).click();
        (await getElement(cusModalLogin.iptRegisterEmail)).sendKeys(testdata.email);//'ice4kimo@yahoo.com.tw')
        // // driver.executeScript("arguments[0].setAttribute('value', '" + longstring +"')", elem)
        (await getElement(cusModalLogin.iptRegisterPWD1)).sendKeys(testdata.password);//'11111111')
        (await getElement(cusModalLogin.iptRegisterPWD2)).sendKeys(testdata.password);//'11111111')
        (await getElement(cusModalLogin.btnSendRegister)).click();
        
        // TODO
        // --- check log register success
    })
    it('登入Email帳號 - display correct name, badge2=0', async function () {
        (await getElement(index.btnLogin)).click();
        (await getElement(cusModalLogin.btnEmailSignin)).click();
        //assert
        await index.spanDisplayEmail.until_assert_elementTextIs(testdata.email, elemTimeout);

        logs = await driver.manage().logs().get(webdriver.logging.Type.BROWSER)
        assertMsg = assertIndex.loginSuccess(true)
        findEntries = entryManager_temp.findEntries(logs, assertMsg);
        //assert
        assert(findEntries.length === 1)

        assertMsg = assertIndex.displayLoginName(testdata.email)//'ice4kimo@yahoo.com.tw')
        findEntries = entryManager_temp.findEntries(logs, assertMsg);
        //assert
        assert(findEntries.length === 1)
        elem = (await index.spanNumberBadge2.findElement())
        assert(await elem.getText() === '0')

        // await index.spanNumberBadge1.until_assert_elementTextIs('0', elemTimeout);
        // elem = (await index.spanNumberBadge1.findElement())
        // console.log("LOG: ~ file: login.spec.js ~ line 146 ~ elem", await elem.getText())
        
        //assert(await elem.getText() === '0')
        
        
    })
})