import assertLog from '../assertLog.js'
import assertIndex from '../../../../pages/index/index.assertLog.js'
import assertcusModalLogin from '../../../../webcomponents/cusModalLogin3/cusModalLogin.assertLog.js'
import EntryManager from '../entryManager.js'
import {
    getRandomString
} from '../../../lib/dataKits.js'
import {
    resolve
} from 'dns'
import {
    ProductInfo,
    UserData
} from '../../../dataDefine/index.js'
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


//let {assert} = require('chai')
//let assertIndex = require('../../../../pages/index/index.assertLog.js')
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

const {
    assertTitle,
} = assertLog

const testdata = require('../../../../../adminData/testdata.json')
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




describe('login2.spec.js', async function () {


    /**@type {webdriver.ThenableWebDriver} */
    let driver //= new webdriver.Builder().forBrowser('chrome').build();
    let vars
    vars = {}

    let entryManager = new EntryManager();
    

    before(async function () {

        // exe 安装之后在根目录找到chromedriver.exe
        if (fs.existsSync(pathDriver)) {
            //console.log(path.join(__dirname, 'chromedriver.exe'));
            service = new chrome.ServiceBuilder(pathDriver).build();
        }
        chrome.setDefaultService(service);
        this.timeout(15 * 1000)
        driver = new webdriver.Builder()
            .setChromeOptions(options)
            .withCapabilities(webdriver.Capabilities.chrome())
            .forBrowser('chrome')
            .build();

        seleniumKits.bindBy(driver)
        

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


    /**@type {webdriver.WebElement} */
    let elem
    let elemTimeout = 5000;
    
    let sAssertText = ''
    /**@type {webdriver.logging.Entry[]} */
    let logs
    /**@type {webdriver.logging.Entry[]} */
    let findEntries
    let assertMsg = ''

    function getBrowserConsoleLog() {
        return driver.manage().logs().get(webdriver.logging.Type.BROWSER)
    }




    async function _loginEmail() {
        //(await cusModalLogin.iptSignInEmail.findElement()).
        
        (await index.btnLogin.findElement()).click();
        //(await getElement(index.btnLogin)).click();
        //(await cusModalLogin.iptSignInEmail.findElement()).
        await driver.sleep(1000); //wait for css animation
        (await (cusModalLogin.iptSignInEmail.findElement())).clear();
        (await (cusModalLogin.iptSignInEmail.findElement())).sendKeys(testdata.email);
        (await (cusModalLogin.iptSignInPassword.findElement())).clear();
        (await (cusModalLogin.iptSignInPassword.findElement())).sendKeys(testdata.password);
        (await (cusModalLogin.btnEmailSignin.findElement())).click();
        
    }
    async function _assertDisplayEMail() {
        //assert
        await index.spanDisplayEmail.until_assert_elementTextIs(testdata.email, elemTimeout);
        //購物車 數量0
        elem = (await index.spanNumberBadge2.findElement());
        assert(await elem.getText() === '0');
    }
    it('未登入 - 購物車無法 +產品 / 結帳，', async function () {
        await _loginEmail();
    })



})