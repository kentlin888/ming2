/**@type {index} */
let index = require('../MDPages/index/index.md');
/**@type {cusModalLogin} */
let cusModalLogin = require('../MDPages/cusModalLogin/cusModalLogin.md');
/**@type {cusModalUserProfile} */
let cusModalUserProfile = require('../MDPages/cusModalUserProfile/cusModalUserProfile.md');
/**@type {ProductListSearch} */
let ProductListSearch = require('../MDPages/ProductListSearch/ProductListSearch.md');
/**@type {ShopCart} */
let ShopCart = require('../MDPages/ShopCart/ShopCart.md');
/**@type {ShopItem} */
let ShopItem = require('../MDPages/ShopItem/ShopItem.md');
/**@type {Invoice} */
let Invoice = require('../MDPages/Invoice/Invoice.md');


let webdriver = require('selenium-webdriver')
const {
    Builder,
    By,
    Key,
    until
} = webdriver //require('selenium-webdriver')
//const assert = require('assert')
const {
    assert
} = require('chai')
let fs = require('fs')
let path = require('path')

// const {
//     assertTitle,
// } = assertLog

const testdata = require('../../../../../adminData/testdata.json')
// //-------chrome options
// let chrome = require('selenium-webdriver/chrome')
// const {
//     doesNotReject
// } = require('assert')


// var options = new chrome.Options();
// options.addArguments("--start-maximized"); // 启动就最大化，而不是像后面再使用 maximize() 那样之后再最大化
// //options.addArguments("disable-extensions");
// var prefs = new webdriver.logging.Preferences();
// prefs.setLevel(webdriver.logging.Type.BROWSER, webdriver.logging.Level.ALL);
// options.setLoggingPrefs(prefs);

// let service;
// let pathDriver = path.join(__dirname, '../chromedriver.exe')

// // exe 安装之后在根目录找到chromedriver.exe
// if (fs.existsSync(pathDriver)) {
//     //console.log(path.join(__dirname, 'chromedriver.exe'));
//     service = new chrome.ServiceBuilder(pathDriver).build();
// }
// chrome.setDefaultService(service);

// //this.timeout(15 * 1000)
// /**@type {webdriver.ThenableWebDriver} */
// let driver //= new webdriver.Builder().forBrowser('chrome').build();
// driver = new webdriver.Builder()
//     .setChromeOptions(options)
//     .withCapabilities(webdriver.Capabilities.chrome())
//     .forBrowser('chrome')
//     .build();
// let vars
// vars = {}

//let entryManager = new EntryManager();
//let entryManager_all = new EntryManager();
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
    await this.driver.sleep(1000);
    return assert(await elem.getText() === matchText, `assert text->${matchText}`) //'ice4kimo@yahoo.com.tw')
}
async function until_assert_elementIsVisible(timeout) {
    /**@type {webdriver.WebElement} */
    let elem = (await this.findElement()) //login.spanDisplayEmail.findElement())
    let condition = await until.elementIsVisible(elem) //'ice4kimo@yahoo.com.tw')
    await this.driver.wait(condition, timeout);
    await this.driver.sleep(1000);
    return assert(await elem.isDisplayed() === true, `assert isDisplayed->${this}`) //'ice4kimo@yahoo.com.tw')
}
async function waitUntil_ElementTextIs(matchText, timeout) {
    let elem = (await this.findElement()) //login.spanDisplayEmail.findElement())
    let condition = until.elementTextIs(elem, matchText) //'ice4kimo@yahoo.com.tw')
    await this.driver.wait(condition, timeout);
    // await driver.sleep(1000);
    // return assert(await elem.getText() === matchText, `assert text->${matchText}`) //'ice4kimo@yahoo.com.tw')
}
async function waitUntil_ElementIsVisible(timeout) {
    /**@type {webdriver.WebElement} */
    let elem = (await this.findElement()) //login.spanDisplayEmail.findElement())
    let condition = await until.elementIsVisible(elem) //'ice4kimo@yahoo.com.tw')
    await this.driver.wait(condition, timeout);
    // await driver.sleep(1000);
    // return assert( await elem.isDisplayed() === true, `assert isDisplayed->${this}`) //'ice4kimo@yahoo.com.tw')
}
async function jsReplaceText(text) {
    /**@type {webdriver.WebElement} */
    let elem = (await this.findElement()) //login.spanDisplayEmail.findElement())
    await this.driver.executeScript(`arguments[0].value='${text}'; `, elem)
}
/**@returns {Promise<string>} */
async function jsGetInputValue() {
    /**@type {webdriver.WebElement} */
    let elem = (await this.findElement()) //login.spanDisplayEmail.findElement())
    return await this.driver.executeScript(`return arguments[0].value; `, elem)
}

function bindBy(inDriver) {
    By.prototype.constructor.prototype.findElement = findElement
    By.prototype.constructor.prototype.until_assert_elementTextIs = until_assert_elementTextIs
    By.prototype.constructor.prototype.until_assert_elementIsVisible = until_assert_elementIsVisible
    By.prototype.constructor.prototype.waitUntil_ElementTextIs = waitUntil_ElementTextIs
    By.prototype.constructor.prototype.waitUntil_ElementIsVisible = waitUntil_ElementIsVisible
    By.prototype.constructor.prototype.jsReplaceText = jsReplaceText
    By.prototype.constructor.prototype.jsGetInputValue = jsGetInputValue
    By.prototype.constructor.prototype.driver = inDriver
}
bindBy();
// By.prototype.constructor.prototype.findElement = findElement
// By.prototype.constructor.prototype.until_assert_elementTextIs = until_assert_elementTextIs
// By.prototype.constructor.prototype.until_assert_elementIsVisible = until_assert_elementIsVisible
// By.prototype.constructor.prototype.waitUntil_ElementTextIs = waitUntil_ElementTextIs
// By.prototype.constructor.prototype.waitUntil_ElementIsVisible = waitUntil_ElementIsVisible
// By.prototype.constructor.prototype.driver = driver
// cusModalLogin.btnCloseModal



// function bindWebElement(inDriver) {
//     webdriver.WebElement.prototype.constructor.prototype.jsReplaceText = jsReplaceText;
//     webdriver.WebElement.prototype.constructor.prototype.jsGetInputValue = jsGetInputValue;
//     webdriver.WebElement.prototype.constructor.prototype.driver = inDriver
// }
// bindWebElement();

// async function initSuite() {

// }



module.exports={
    bindBy,
    //bindWebElement
}