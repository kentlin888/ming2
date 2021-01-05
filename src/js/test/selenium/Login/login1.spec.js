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

// exe 安装之后在根目录找到chromedriver.exe
if (fs.existsSync(pathDriver)) {
    //console.log(path.join(__dirname, 'chromedriver.exe'));
    service = new chrome.ServiceBuilder(pathDriver).build();
}
chrome.setDefaultService(service);

describe('login1.spec.js', async function () {
    this.timeout(15 * 1000)
    /**@type {webdriver.ThenableWebDriver} */
    let driver //= new webdriver.Builder().forBrowser('chrome').build();
    driver = new webdriver.Builder()
        .setChromeOptions(options)
        .withCapabilities(webdriver.Capabilities.chrome())
        .forBrowser('chrome')
        .build();
    seleniumKits.bindBy(driver)
    let vars
    vars = {}

    let entryManager = new EntryManager();
    

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
    let assertMsg = ''

    function getBrowserConsoleLog() {
        return driver.manage().logs().get(webdriver.logging.Type.BROWSER)
    }
    //await driver.get("https://ming2-dad1d.firebaseapp.com/#/ProductListSearch")

    // function promise_findLog_withAssert(assertMsg, findEntriesLength) {
    //     return new Promise(async (resolve, reject) => {
    //         await setTimeout(async () => {
    //             logs = await driver.manage().logs().get(webdriver.logging.Type.BROWSER)
    //             console.log(JSON.stringify(logs,null,4))
    //             //assertMsg = assertIndex.loginSuccess(true)
    //             findEntries = entryManager.findEntries(logs, assertMsg);
    //             //console.log("LOG: ~ file: login1.spec.js ~ line 144 ~ awaitsetTimeout ~ findEntries.length", findEntries.length)
    //             if (findEntries.length >= findEntriesLength) {
    //                 resolve(true)
    //             } else {
    //                 resolve(false)
    //             }
    //         }, 500);
    //     })
    // }
    // async function findLog_withAssert(assertMsg, findEntriesLength, timeoutSeconds) {
    //     let times = timeoutSeconds * 2
    //     for(let i=0; i<times;i++){
    //         let bl = await promise_findLog_withAssert(assertMsg, findEntriesLength)
    //         //console.log("LOG: ~ file: login1.spec.js ~ line 156 ~ findLog_withAssert ~ bl", bl)
    //         // if(bl===false)
    //         //     console.log(`findLog_withAssert->${assertMsg}, tyr again...`)
    //         //console.log("LOG: ~ file: login1.spec.js ~ line 155 ~ findLog_withAssert ~ bl", bl)
    //         //last time or find it
    //         if(i===times-1 || bl===true){
    //             assert(bl, 'find log failed-> assertMsg:' + assertMsg)
    //             //return false//continue
    //             break;
    //         }
    //     }
    //     // logs = await driver.manage().logs().get(webdriver.logging.Type.BROWSER)
    //     // //assertMsg = assertIndex.loginSuccess(true)
    //     // findEntries = entryManager_temp.findEntries(logs, assertMsg);
    //     // //assert
    //     // assert(findEntries.length === findEntriesLength, 'find log failed-> assertMsg:' + assertMsg)
    // }

    before(async function () {

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


    // it('打開瀏覽器到ming2', async () => {
    //     driver = new webdriver.Builder()
    //         .setChromeOptions(options)
    //         .withCapabilities(webdriver.Capabilities.chrome())
    //         .forBrowser('chrome')
    //         .build();
    //     const TIMEOUT = 9 * 1000 * 1000 // seconds
    //     await driver.manage().setTimeouts({
    //         implicit: TIMEOUT,
    //         pageLoad: TIMEOUT,
    //         script: TIMEOUT
    //     })
    //     //await driver.manage().timeouts().implicitlyWait(5, TimeUnit.SECONDS);        
    //     console.info(await driver.manage().getTimeouts())

    //     await driver.get("http://localhost:3000/")
    // })
    it('初次註冊Email帳號 - success and user exist', async function () {
        (await getElement(index.btnLogin)).click();
        // elem = (await index.btnLogin.findElement())
        // elem.click();
        (await getElement(cusModalLogin.btnRegisterEmail)).click();
        //await cusModalLogin.iptRegisterEmail.until_assert_elementIsVisible(elemTimeout);
        await cusModalLogin.iptRegisterEmail.jsReplaceText(testdata.email);
        await cusModalLogin.iptRegisterPWD1.jsReplaceText(testdata.password);
        await cusModalLogin.iptRegisterPWD2.jsReplaceText(testdata.password);
        //(await getElement(cusModalLogin.iptRegisterEmail)).jsReplaceText(testdata.email);
        //(await getElement(cusModalLogin.iptRegisterPWD1)).clear();
        // (await getElement(cusModalLogin.iptRegisterPWD1)).jsReplaceText(testdata.password); //'11111111')
        // //(await getElement(cusModalLogin.iptRegisterPWD2)).clear();
        // (await getElement(cusModalLogin.iptRegisterPWD2)).jsReplaceText(testdata.password); //'11111111')

        await driver.sleep(2000); //wait for css animation
        (await getElement(cusModalLogin.btnSendRegister)).click();
        //console.log(3333);
        await driver.sleep(1000); //wait for css animation
        (await getElement(cusModalLogin.btnSwalConfirm)).click();

        entryManager.clearEntries();
        let bl = await entryManager.monitorEntries(assertIndex.displayLoginName(testdata.email), getBrowserConsoleLog, 2);
        assert(bl === true);
        bl = await entryManager.monitorEntries(assertIndex.loginSuccess(true), getBrowserConsoleLog, 2);
        assert(bl === true);
        // await index.spanDisplayEmail.until_assert_elementTextIs(testdata.email, elemTimeout);
        // await index.spanNumberBadge1.until_assert_elementTextIs('0', elemTimeout);

        // save firestore success
        let adminAPI = require('../../../../../adminAPI/adminAPI');
        let fAuthUser = await adminAPI.getUser(testdata.email);
        let array_FS_USERs = await adminAPI.fStore_GetUsers_byMail(testdata.email);
        //console.log("LOG: ~ file: login1.spec.js ~ line 285 ~ array_FS_USERs", array_FS_USERs[0])
        assert(array_FS_USERs.length === 1)
        assert(fAuthUser.uid === array_FS_USERs[0].uid)

        // --- check log register success
    })
    it('重複註冊Email帳號 - alert user duplicated', async () => {
        (await getElement(index.btnLogin)).click();
        // elem = (await index.btnLogin.findElement())
        // elem.click();
        
        (await getElement(cusModalLogin.btnRegisterEmail)).click();
        (await getElement(cusModalLogin.iptRegisterEmail)).jsReplaceText(testdata.email);
        //(await getElement(cusModalLogin.iptRegisterPWD1)).clear();
        (await getElement(cusModalLogin.iptRegisterPWD1)).jsReplaceText(testdata.password); //'11111111')
        //(await getElement(cusModalLogin.iptRegisterPWD2)).clear();
        (await getElement(cusModalLogin.iptRegisterPWD2)).jsReplaceText(testdata.password); //'11111111')
        //console.log(2222);
        await driver.sleep(2000); //wait for css animation
        (await getElement(cusModalLogin.btnSendRegister)).click();

        entryManager.clearEntries();
        let bl = await entryManager.monitorEntries(assertcusModalLogin.duplicatedRegisterAccount(true), getBrowserConsoleLog, 4);
        assert(bl === true);
        entryManager.clearEntries();
        //await driver.sleep(2000);//wait for css animation
        (await getElement(cusModalLogin.btnSwalConfirm)).click();
        (await getElement(cusModalLogin.btnCloseModal)).click();

    })
    it('登出帳號', async () => {
        (await getElement(index.spanDisplayEmail)).click();
    })
    async function _loginEmail() {
        (await getElement(index.btnLogin)).click();
        await driver.sleep(1000); //wait for css animation
        (await getElement(cusModalLogin.iptSignInEmail)).clear();
        (await getElement(cusModalLogin.iptSignInEmail)).sendKeys(testdata.email);
        (await getElement(cusModalLogin.iptSignInPassword)).clear();
        (await getElement(cusModalLogin.iptSignInPassword)).sendKeys(testdata.password);
        (await getElement(cusModalLogin.btnEmailSignin)).click();
    }
    async function _assertDisplayEMail() {
        //assert
        await index.spanDisplayEmail.until_assert_elementTextIs(testdata.email, elemTimeout);
        //購物車 數量0
        elem = (await index.spanNumberBadge2.findElement());
        assert(await elem.getText() === '0');
    }
    it('登入Email帳號 - display correct name, badge2=0', async function () {
        await _loginEmail();
        await _assertDisplayEMail();
        // //執行登出
        // (await getElement(index.spanDisplayEmail)).click();
        // (await getElement(index.aLogout)).click();
        // // 登入按鈕 要能夠顯示
        // await index.btnLogin.until_assert_elementIsVisible(elemTimeout);
    })

    async function _openMyProfile() {
        (await getElement(index.spanDisplayEmail)).click();
        // await index.aMyProfile.until_assert_elementIsVisible(elemTimeout);
        // await driver.sleep(3000);
        (await getElement(index.aMyProfile)).click();
    }
    it('check個人檔案 - iFaEnvelope + iFaWarningEmailNotVerified', async () => {
        await _loginEmail();
        await _openMyProfile();
        await driver.sleep(1000);
        await cusModalUserProfile.UserProfile_iFaEnvelope.waitUntil_ElementIsVisible(elemTimeout);
        await cusModalUserProfile.UserProfile_iFaWarningEmailNotVerified.waitUntil_ElementIsVisible(elemTimeout);
    })
    it('執行email認證 - iFaWarningEmailNotVerified should disappeared.', async () => {
        let adminAPI = require('../../../../../adminAPI/adminAPI')
        await adminAPI.setUserEmailVerified(testdata.userId, true);
        await _loginEmail();
        await _openMyProfile();
        await driver.sleep(1000);
    })
    it('修改個人檔案', async () => {
        await _loginEmail();
        await _openMyProfile();
        let uuid_iptName = getRandomString(5);
        let uuid_iptAddress = getRandomString(5);
        await driver.sleep(1000);
        
        (await getElement(cusModalUserProfile.UserProfile_iptName)).clear();
        (await getElement(cusModalUserProfile.UserProfile_iptName)).sendKeys(uuid_iptName);
        (await getElement(cusModalUserProfile.UserProfile_iptAddress)).clear();
        (await getElement(cusModalUserProfile.UserProfile_iptAddress)).sendKeys(uuid_iptAddress);
        (await getElement(cusModalUserProfile.UserProfile_btnSaveProfile)).click();
        await driver.sleep(2000);
        (await getElement(cusModalUserProfile.UserProfile_btnCloseModal)).click();
        await driver.sleep(1000);
        await _openMyProfile();
        await driver.sleep(1000);
        let value = await (await getElement(cusModalUserProfile.UserProfile_iptName)).jsGetInputValue();
        assert(value === uuid_iptName)
        await driver.sleep(1000);
        value = await (await getElement(cusModalUserProfile.UserProfile_iptAddress)).jsGetInputValue();
        assert(value === uuid_iptAddress);
        (await getElement(cusModalUserProfile.UserProfile_btnCloseModal)).click();
        // await driver.sleep(1000);
        // await cusModalUserProfile.UserProfile_iptName.until_assert_elementTextIs(uuid_iptName, elemTimeout)
        // await driver.sleep(1000);
        // await cusModalUserProfile.UserProfile_iptAddress.until_assert_elementTextIs(uuid_iptAddress, elemTimeout)
        // uuid = getRandomString(5);
        // (await getElement(cusModalUserProfile.UserProfile_iptAddress)).jsReplaceText(uuid);

        //cusModalUserProfile.
        //console.log(uuid)

    })
    it('綁定電話號碼', async () => {
        await _loginEmail();
        await _openMyProfile();
        await driver.sleep(1000);
        (await getElement(cusModalUserProfile.UserProfile_iptPhone)).clear();
        await driver.sleep(1000);
        (await getElement(cusModalUserProfile.UserProfile_iptPhone)).sendKeys('+886 926923281');
        await driver.sleep(1000);
        (await getElement(cusModalUserProfile.UserProfile_btnVerifyNumber)).click();
        await cusModalUserProfile.UserProfile_iptPhoneVerifyCode.waitUntil_ElementIsVisible(elemTimeout);
        await driver.sleep(1000);
        (await getElement(cusModalUserProfile.UserProfile_iptPhoneVerifyCode)).sendKeys('111111');
        await driver.sleep(1000);
        (await getElement(cusModalUserProfile.UserProfile_btnSendVerifyCode)).click();
        await driver.sleep(1000);
        await cusModalUserProfile.UserProfile_iptPhone.waitUntil_ElementTextIs('+886926923281',elemTimeout);
        (await getElement(cusModalUserProfile.UserProfile_btnCloseModal)).click();
    })
    it('重寄密碼', async () => {
        await _loginEmail();
        await _openMyProfile();
        await driver.sleep(1000);
        (await getElement(cusModalUserProfile.UserProfile_btnResendPassword)).click();
        await driver.sleep(1000);
        (await getElement(cusModalUserProfile.btnSwalConfirm)).click();
    })
    it('開始購物 - 運送地址正確', async () => {
        let adminAPI = require('../../../../../adminAPI/adminAPI');
        //let fAuthUser = await adminAPI.getUser(testdata.email);
        let array_FS_USERs = await adminAPI.fStore_GetUsers_byMail(testdata.email);
        let userData = Object.assign(new UserData(), array_FS_USERs[0])
        console.log(userData.uid)
        await _loginEmail();
        (await getElement(index.navitemOrderProducts)).click();
        await driver.sleep(4000);
        //await ProductListSearch.plsDeliveryAddress.waitUntil_ElementTextIs(userData.userProfile.address);
        let iptValue = await (await getElement(ProductListSearch.plsDeliveryAddress)).jsGetInputValue();
        assert(iptValue === userData.userProfile.address);
        await driver.sleep(1000);
        (await getElement(ProductListSearch.btnMeats)).click();
        await driver.sleep(1000);
        (await getElement(ProductListSearch.btnMainCourse)).click();
        //console.log("LOG: ~ file: login1.spec.js ~ line 435 ~ it ~ iptValue", iptValue);
        //.productCard
        //.addButton
    })
    
    it('開始購物 1&2 - 購物車功能正常', async () => {
        let pathDownload_ProductInfo = path.join(__dirname, '../../../../../adminData/downloads/ProductInfo.json')
        let sJson = fs.readFileSync(pathDownload_ProductInfo, 'utf8')
        /**@type {any[]} */
        let list_ProductInfo = JSON.parse(sJson)

        /**@type {ProductInfo} */
        let findRice = list_ProductInfo.find((item) => {
            return (item.name === '炒米粉')
        });
        /**@type {ProductInfo} */
        let findNoodle = list_ProductInfo.find((item) => {
            return (item.name === '炒麵')
        });
        findRice = Object.assign(new ProductInfo(), findRice)
        findNoodle= Object.assign(new ProductInfo(), findNoodle)
        
        await _loginEmail();
        (await getElement(index.navitemOrderProducts)).click();
        //await driver.sleep(1000);
        await driver.sleep(4000); //wait for address
        //await ProductListSearch.plsDeliveryAddress.waitUntil_ElementTextIs(userData.userProfile.address);
        let iptValue = await (await getElement(ProductListSearch.plsDeliveryAddress)).jsGetInputValue();
        assert(iptValue!="");
        // (await getElement(ProductListSearch.btnAddProdcard1)).click();
        // (await getElement(ProductListSearch.btnAddProdcard2)).click();
        (await getElement(ProductListSearch.btnAddProdcardRice)).click();
        (await getElement(ProductListSearch.btnAddProdcardNoodle)).click();
        (await getElement(ProductListSearch.btnAddProdcardRice)).click();
        (await getElement(ProductListSearch.btnAddProdcardNoodle)).click();
        await ProductListSearch.shopitem_Prodname_Rice.waitUntil_ElementIsVisible(elemTimeout);
        await ProductListSearch.shopitem_Prodname_Noodle.waitUntil_ElementIsVisible(elemTimeout);
        await driver.sleep(1000); //數字會有延遲
        let shopitem_Prodname_Rice = await (await getElement(ProductListSearch.shopitem_Prodname_Rice)).getText();
        let shopitem_Prodname_Noodle = await (await getElement(ProductListSearch.shopitem_Prodname_Noodle)).getText();
        /**@type {any} */
        let shopitem_amount_Rice = await (await getElement(ProductListSearch.shopitem_amount_Rice)).getText();
        shopitem_amount_Rice = Number(shopitem_amount_Rice)
        /**@type {any} */
        let shopitem_amount_Noodle = await (await getElement(ProductListSearch.shopitem_amount_Noodle)).getText();
        shopitem_amount_Noodle = Number(shopitem_amount_Noodle)
        assert(shopitem_Prodname_Rice == findRice.name)
        assert(shopitem_Prodname_Noodle == findNoodle.name)
        let expectPrice_Rice = findRice.price*2
        let expectPrice_Noodle = findNoodle.price*2
        
        assert(expectPrice_Rice == findRice.price * shopitem_amount_Rice)
        assert(expectPrice_Noodle == findNoodle.price * shopitem_amount_Noodle)
        let expectTotalPrice = expectPrice_Rice + expectPrice_Noodle;
        //let shopitem_price_Noodle = await (await getElement(ProductListSearch.)).getText();
        let spcartSpan_AllItems_Price = await (await getElement(ShopCart.spcartSpan_AllItems_Price)).getText();
        assert(expectTotalPrice.toString() == spcartSpan_AllItems_Price);
        //let aa = await driver.executeScript(`return arguments[0].innerHTML; `, elem)
        //console.log("LOG: ~ file: login1.spec.js ~ line 484 ~ it ~ aa", aa)
        (await getElement(ShopCart.spcartBtnCheckOut)).click();
        await driver.sleep(1000);
        elem = (await getElement(Invoice.invoice_orderAddress))
        let aa = await elem.getText();
        console.log("LOG: ~ file: login1.spec.js ~ line 516 ~ it ~ aa", aa)
        // iptValue = await (await getElement(ProductListSearch.plsDeliveryAddress)).jsGetInputValue();
        assert(aa!="");
    })
    it('購物車沒商品,結帳 - 跳出警示框', async () => {
        await _loginEmail();
        (await getElement(index.navitemOrderProducts)).click();
        await driver.sleep(1000);
        (await getElement(ShopCart.spcartBtnCheckOut)).click();
        await driver.sleep(1000);
        await ShopCart.btnSwalCancel.waitUntil_ElementIsVisible(elemTimeout);
        await driver.sleep(1000);
        (await getElement(ShopCart.btnSwalCancel)).click();
    })
    // it('檢查個人檔案',async() => {
    //     await _loginEmail();
    //     await _openMyProfile();

    // })
})