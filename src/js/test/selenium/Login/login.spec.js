let webdriver = require('selenium-webdriver')
const {
    Builder,
    By,
    Key,
    until
} = require('selenium-webdriver')
const assert = require('assert')
let fs = require('fs')
let path = require('path')
//-------chrome options
let chrome = require('selenium-webdriver/chrome')
var options = new chrome.Options();
options.addArguments("--start-maximized"); // 启动就最大化，而不是像后面再使用 maximize() 那样之后再最大化
options.addArguments("disable-extensions");

let service;
let pathDriver = path.join(__dirname, '../chromedriver.exe')

// exe 安装之后在根目录找到chromedriver.exe
if (fs.existsSync(pathDriver)) {
    //console.log(path.join(__dirname, 'chromedriver.exe'));
    service = new chrome.ServiceBuilder(pathDriver).build();
}
chrome.setDefaultService(service);

describe('UI-Login', async function () {
    this.timeout(30000)
    /**@type {webdriver.ThenableWebDriver} */
    let driver //= new webdriver.Builder().forBrowser('chrome').build();
    let vars
    driver = new webdriver.Builder()
        .setChromeOptions(options)
        .withCapabilities(webdriver.Capabilities.chrome())
        .forBrowser('chrome')
        .build();
    vars = {}

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

    async function initSuite() {
        const TIMEOUT = 300000000
        //driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        await driver.manage().setTimeouts({
            implicit: TIMEOUT,
            pageLoad: TIMEOUT,
            script: TIMEOUT
        })
        console.info(await driver.manage().getTimeouts())
        // driver.manage().timeouts().pageLoadTimeout(10, TimeUnit.SECONDS);
        //await driver.get("https://ming2-dad1d.firebaseapp.com/#/ProductListSearch")
        await driver.get("http://localhost:3000/")
    }
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
    
    it('登入Email帳號', async function () {
        //-------- initSuite
        await initSuite();
        // const TIMEOUT = 300000000
        // //driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);
        // await driver.manage().setTimeouts({
        //     implicit: TIMEOUT,
        //     pageLoad: TIMEOUT,
        //     script: TIMEOUT
        // })
        // console.info(await driver.manage().getTimeouts())
        // /**
        //  * @returns {webdriver.WebElementPromise}
        //  */
        // function findElement() {
        //     return this.driver.findElement(this)
        // }

        // async function until_assert_elementTextIs(matchText, timeout) {
        //     let elem = (await this.findElement())//login.spanDisplayEmail.findElement())
        //     let condition = until.elementTextIs(elem, matchText)//'ice4kimo@yahoo.com.tw')
        //     await this.driver.wait(condition, timeout);
        //     return assert(await elem.getText() === matchText)//'ice4kimo@yahoo.com.tw')
        // }
        // By.prototype.findElement = findElement;
        // By.prototype.until_assert_elementTextIs = until_assert_elementTextIs;
        // By.prototype.driver = driver;

        // // driver.manage().timeouts().pageLoadTimeout(10, TimeUnit.SECONDS);
        // //await driver.get("https://ming2-dad1d.firebaseapp.com/#/ProductListSearch")
        // await driver.get("http://localhost:3000/")
        

        /**@type {login} */
        let login = require('./login.md');

        /**@type {webdriver.WebElement} */
        let elem

        elem = (await login.btnLogin.findElement())
        elem.click();
        elem = (await login.btnEmailSignin.findElement())
        elem.click();
        //elem = (await login.spanDisplayEmail.findElement())
        await login.spanDisplayEmail.until_assert_elementTextIs('ice4kimo@yahoo.com.tw', 3000);

        //await driver.manage().window().setRect(1900, 1020)
        //await driver.sleep(1000)
    })
})