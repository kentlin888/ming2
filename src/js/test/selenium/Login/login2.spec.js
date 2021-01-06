import assertLog from '../assertLog.js'
import EntryManager from '../entryManager.js'

let seleniumKits = require('./seleniumKits.js')

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
/**@type {ProductCard} */
let ProductCard = require('../MDPages/ProductCard/ProductCard.md');

let webdriver = require('selenium-webdriver')

const {
    assert
} = require('chai')
let fs = require('fs')
let path = require('path')

const {
    assertTitle,
} = assertLog

const testdata = require('../../../../../adminData/testdata.json')


describe('login2.spec.js', async function () {
    this.timeout(15 * 1000)
    let pathDriver = path.join(__dirname, '../chromedriver.exe')
    let chromeOptions = null; //new chrome.Options();
    /**@type {webdriver.ThenableWebDriver} */
    let driver
    let entryManager = new EntryManager();
    /**@type {seleniumKits.getBrowserConsoleLog} */
    let getBrowserConsoleLog
    let monitorEntries
    before(async function () {

        /**@type {webdriver.ThenableWebDriver} */
        driver = seleniumKits.buildDriver(pathDriver, chromeOptions);
        getBrowserConsoleLog = seleniumKits.getBrowserConsoleLog.bind(null, driver)
        
        monitorEntries = entryManager.monitorEntries.bind(entryManager, getBrowserConsoleLog)


        const TIMEOUT = 9 * 1000 * 1000 // seconds
        await driver.manage().setTimeouts({

            implicit: TIMEOUT,
            pageLoad: TIMEOUT,
            script: TIMEOUT
        })
        //await driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);        
        console.info(await driver.manage().getTimeouts())
        //http://localhost:9006/
        //http://localhost:3000/
        await driver.get("http://localhost:9006/")

        //await driver.manage().window().setRect(1900, 1020)
        //await driver.sleep(1000)
    })


    beforeEach(async function () {

    })
    afterEach(async function () {
        //await driver.quit();
    })

    /**@type {webdriver.WebElement} */
    let elem
    let elemTimeout = 5000;

    async function _loginEmail() {
        (await index.btnLogin.findElement()).click();
        await driver.sleep(1000); //wait for css animation
        (await cusModalLogin.iptSignInEmail.findElement()).clear();
        (await cusModalLogin.iptSignInEmail.findElement()).sendKeys(testdata.email);
        (await cusModalLogin.iptSignInPassword.findElement()).clear();
        (await cusModalLogin.iptSignInPassword.findElement()).sendKeys(testdata.password);
        (await cusModalLogin.btnEmailSignin.findElement()).click();
    }
    async function _assertDisplayEMail() {
        //assert
        await index.spanDisplayEmail.until_assert_elementTextIs(testdata.email, elemTimeout);
        //購物車 數量0
        elem = (await index.spanNumberBadge2.findElement());
        assert(await elem.getText() === '0');
    }
    async function _openMyProfile() {
        (await index.spanDisplayEmail.findElement()).click();
        // await index.aMyProfile.until_assert_elementIsVisible(elemTimeout);
        // await driver.sleep(3000);
        (await index.aMyProfile.findElement()).click();
    }
    it('未登入 - 購物車無法 +產品 / 結帳', async function () {
        //await _loginEmail();
        await (await index.navitemOrderProducts.findElement()).click();
        await driver.sleep(1000);
        //await ProductListSearch.plsDeliveryAddress.waitUntil_ElementTextIs(userData.userProfile.address);
        let iptValue = await ProductListSearch.plsDeliveryAddress.jsGetInputValue();
        assert(iptValue == "");
        //buy rice - NG
        (await ProductListSearch.btnAddProdcardRice.findElement()).click();
        await driver.sleep(1000);
        (await ProductCard.btnSwalCancel.findElement()).click();
        //login
        //await driver.sleep(1000);
        await _loginEmail();
        await _assertDisplayEMail();//wait for login success        
        //buy rice - OK
        (await ProductListSearch.btnAddProdcardRice.findElement()).click();
        // email logout
        (await index.spanDisplayEmail.findElement()).click();
        (await index.aLogout.findElement()).click();
        await driver.sleep(1000);
        //結帳
        (await ShopCart.spcartBtnCheckOut.findElement()).click();
        await driver.sleep(1000);
        (await ShopCart.btnSwalCancel.findElement()).click();
    })
    
})