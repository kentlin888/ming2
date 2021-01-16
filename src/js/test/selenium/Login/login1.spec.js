import assertLog from '../assertLog.js'
import assertIndex from '../../../../pages/index/index.assertLog.js'
import assertCusModalLogin from '../../../../webcomponents/cusModalLogin3/cusModalLogin.assertLog.js'
import assertCusPopInvoice from '../../../../js/react/components/PopInvoice.assertLog.js'
import EntryManager from '../entryManager.js'
import {
    getRandomString
} from '../../../lib/dataKits.js'

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
/**@type {PopInvoice} */
let PopInvoice = require('../MDPages/PopInvoice/PopInvoice.md');

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


describe('login1.spec.js', async function () {
    this.timeout(15 * 1000)
    let pathDriver = path.join(__dirname, '../chromedriver.exe')
    let chromeOptions = null; //new chrome.Options();
    /**@type {webdriver.ThenableWebDriver} */
    let driver
    let entryManager = new EntryManager();
    /**@type {seleniumKits.getBrowserConsoleLog} */
    let getBrowserConsoleLog
    let monitorEntries

    /**@enum {any}} */
    let ENUM_windowType = {
        iphone: {
            width: 414,
            height: 736
        },
        desktop: "max",
    }
    /**
     * @param {webdriver.ThenableWebDriver} indriver 
     * @param {ENUM_windowType} enum_windowType 
     */
    async function _setWindow(indriver, enum_windowType) {
        if(enum_windowType!=ENUM_windowType.desktop){
            enum_windowType.x = 0;
            enum_windowType.y = 0;
        }
        switch (enum_windowType) {
            case ENUM_windowType.desktop:
                await indriver.manage().window().maximize();
                break;
            case ENUM_windowType.iphone:
                await indriver.manage().window().setRect(enum_windowType);
                break;
            default:
                break;
        }
    }
    /**@type {Function} */
    let setWindow //= _setWindow.bind(null, driver)
    before(async function () {

        /**@type {webdriver.ThenableWebDriver} */
        driver = seleniumKits.buildDriver(pathDriver, chromeOptions);
        getBrowserConsoleLog = seleniumKits.getBrowserConsoleLog.bind(null, driver)
        monitorEntries = entryManager.monitorEntries.bind(entryManager, getBrowserConsoleLog)
        setWindow = _setWindow.bind(null, driver)

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

    it('初次註冊Email帳號 - success and user exist', async function () {
        (await index.btnLogin.findElement()).click();
        // elem = (await index.btnLogin.findElement())
        // elem.click();
        (await cusModalLogin.btnRegisterEmail.findElement()).click();
        //await cusModalLogin.iptRegisterEmail.until_assert_elementIsVisible(elemTimeout);
        await cusModalLogin.iptRegisterEmail.jsReplaceText(testdata.email);
        await cusModalLogin.iptRegisterPWD1.jsReplaceText(testdata.password);
        await cusModalLogin.iptRegisterPWD2.jsReplaceText(testdata.password);


        await driver.sleep(2000); //wait for css animation
        (await cusModalLogin.btnSendRegister.findElement()).click();
        //console.log(3333);
        await driver.sleep(1000); //wait for css animation
        (await cusModalLogin.btnSwalConfirm.findElement()).click();

        entryManager.clearEntries();
        let bl = await monitorEntries(assertIndex.displayLoginName.log(testdata.email), 2);
        assert(bl === true);
        bl = await monitorEntries(assertIndex.loginSuccess.log(true), 2);
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
        (await index.btnLogin.findElement()).click();
        // elem = (await index.btnLogin.findElement())
        // elem.click();

        (await cusModalLogin.btnRegisterEmail.findElement()).click();
        await cusModalLogin.iptRegisterEmail.jsReplaceText(testdata.email);
        await cusModalLogin.iptRegisterPWD1.jsReplaceText(testdata.password);
        await cusModalLogin.iptRegisterPWD2.jsReplaceText(testdata.password);

        //console.log(2222);
        await driver.sleep(2000); //wait for css animation
        (await cusModalLogin.btnSendRegister.findElement()).click();
        entryManager.clearEntries();
        let bl = await monitorEntries(assertCusModalLogin.duplicatedRegisterAccount.log(true), 4);
        assert(bl === true);
        entryManager.clearEntries();
        //await driver.sleep(2000);//wait for css animation
        (await cusModalLogin.btnSwalConfirm.findElement()).click();
        (await cusModalLogin.btnCloseModal.findElement()).click();

    })
    it('登出帳號', async () => {
        (await index.spanDisplayEmail.findElement()).click();
    })
    async function _loginEmail() {
        (await index.btnLogin.findElement()).click();
        await driver.sleep(1000); //wait for css animation
        (await cusModalLogin.iptSignInEmail.findElement()).clear();
        (await cusModalLogin.iptSignInEmail.findElement()).sendKeys(testdata.email);
        (await cusModalLogin.iptSignInPassword.findElement()).clear();
        (await cusModalLogin.iptSignInPassword.findElement()).sendKeys(testdata.password);
        (await cusModalLogin.btnEmailSignin.findElement()).click();
    }
    async function _assertShopcartBadge(expectNumber){
        elem = (await index.spanNumberBadge2.findElement());
        assert(await elem.getText() == expectNumber);
        await setWindow(ENUM_windowType.iphone)
        elem = (await index.spanNumberBadge1.findElement());
        assert(await elem.getText() == expectNumber);
        await setWindow(ENUM_windowType.desktop)
    }
    async function _assertDisplayEMail() {
        //assert
        await index.spanDisplayEmail.until_assert_elementTextIs(testdata.email, elemTimeout);
        //購物車badge 數量==0
        await _assertShopcartBadge(0);
    }
    it('登入Email帳號 - display correct name, badge2=0', async function () {
        await _loginEmail();
        await _assertDisplayEMail();
        // //執行登出
        // (await index.spanDisplayEmail)).click();
        // (await index.aLogout)).click();
        // // 登入按鈕 要能夠顯示
        // await index.btnLogin.until_assert_elementIsVisible(elemTimeout);
    })

    async function _openMyProfile() {
        (await index.spanDisplayEmail.findElement()).click();
        // await index.aMyProfile.until_assert_elementIsVisible(elemTimeout);
        // await driver.sleep(3000);
        (await index.aMyProfile.findElement()).click();
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

        (await cusModalUserProfile.UserProfile_iptName.findElement()).clear();
        (await cusModalUserProfile.UserProfile_iptName.findElement()).sendKeys(uuid_iptName);
        (await cusModalUserProfile.UserProfile_iptAddress.findElement()).clear();
        (await cusModalUserProfile.UserProfile_iptAddress.findElement()).sendKeys(uuid_iptAddress);
        (await cusModalUserProfile.UserProfile_btnSaveProfile.findElement()).click();
        await driver.sleep(2000);
        (await cusModalUserProfile.UserProfile_btnCloseModal.findElement()).click();
        await driver.sleep(1000);
        await _openMyProfile();
        await driver.sleep(1000);
        let value = await cusModalUserProfile.UserProfile_iptName.jsGetInputValue();
        assert(value === uuid_iptName)
        await driver.sleep(1000);
        value = await cusModalUserProfile.UserProfile_iptAddress.jsGetInputValue();
        assert(value === uuid_iptAddress);
        (await cusModalUserProfile.UserProfile_btnCloseModal.findElement()).click();
        // await driver.sleep(1000);
        // await cusModalUserProfile.UserProfile_iptName.until_assert_elementTextIs(uuid_iptName, elemTimeout)
        // await driver.sleep(1000);
        // await cusModalUserProfile.UserProfile_iptAddress.until_assert_elementTextIs(uuid_iptAddress, elemTimeout)
        // uuid = getRandomString(5);
        // (await cusModalUserProfile.UserProfile_iptAddress)).jsReplaceText(uuid);

        //cusModalUserProfile.
        //console.log(uuid)

    })
    it('綁定電話號碼', async () => {
        await _loginEmail();
        await _openMyProfile();
        await driver.sleep(1000);
        (await cusModalUserProfile.UserProfile_iptPhone.findElement()).clear();
        await driver.sleep(1000);
        (await cusModalUserProfile.UserProfile_iptPhone.findElement()).sendKeys('+886 926923281');
        await driver.sleep(1000);
        (await cusModalUserProfile.UserProfile_btnVerifyNumber.findElement()).click();
        await cusModalUserProfile.UserProfile_iptPhoneVerifyCode.waitUntil_ElementIsVisible(elemTimeout);
        await driver.sleep(1000);
        (await cusModalUserProfile.UserProfile_iptPhoneVerifyCode.findElement()).sendKeys('111111');
        await driver.sleep(1000);
        (await cusModalUserProfile.UserProfile_btnSendVerifyCode.findElement()).click();
        await driver.sleep(1000);
        await cusModalUserProfile.UserProfile_iptPhone.waitUntil_ElementTextIs('+886926923281', elemTimeout);
        (await cusModalUserProfile.UserProfile_btnCloseModal.findElement()).click();
    })
    it('重寄密碼', async () => {
        await _loginEmail();
        await _openMyProfile();
        await driver.sleep(1000);
        (await cusModalUserProfile.UserProfile_btnResendPassword.findElement()).click();
        await driver.sleep(1000);
        (await cusModalUserProfile.btnSwalConfirm.findElement()).click();
    })
    it('開始購物 - 運送地址正確', async () => {
        let adminAPI = require('../../../../../adminAPI/adminAPI');
        //let fAuthUser = await adminAPI.getUser(testdata.email);
        let array_FS_USERs = await adminAPI.fStore_GetUsers_byMail(testdata.email);
        let userData = Object.assign(new UserData(), array_FS_USERs[0])
        console.log(userData.uid)
        await _loginEmail();
        await (await index.navitemOrderProducts.findElement()).click();
        await driver.sleep(4000);
        //await ProductListSearch.plsDeliveryAddress.waitUntil_ElementTextIs(userData.userProfile.address);
        let plsDeliveryAddress = await ProductListSearch.plsDeliveryAddress.jsGetInputValue();
        assert(plsDeliveryAddress === userData.userProfile.address);
        await driver.sleep(1000);
        (await ProductListSearch.btnMeats.findElement()).click();
        await driver.sleep(1000);
        (await ProductListSearch.btnMainCourse.findElement()).click();
        //console.log("LOG: ~ file: login1.spec.js ~ line 435 ~ it ~ iptValue", iptValue);
        //.productCard
        //.addButton
    })
    
    this.timeout(25 * 1000)
    it('開始購物 1&2 - 購物車功能正常', async () => {
        let adminAPI = require('../../../../../adminAPI/adminAPI');
        //let fAuthUser = await adminAPI.getUser(testdata.email);
        let array_FS_USERs = await adminAPI.fStore_GetUsers_byMail(testdata.email);
        let userData = Object.assign(new UserData(), array_FS_USERs[0])
        console.log(userData.uid)
        
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
        findNoodle = Object.assign(new ProductInfo(), findNoodle)

        await _loginEmail();
        (await index.navitemOrderProducts.findElement()).click();
        //await driver.sleep(1000);
        await driver.sleep(4000); //wait for address
        
        //await ProductListSearch.plsDeliveryAddress.waitUntil_ElementTextIs(userData.userProfile.address);
        let plsDeliveryAddress = await ProductListSearch.plsDeliveryAddress.jsGetInputValue();
        assert(plsDeliveryAddress === userData.userProfile.address);
        
        //assert(plsDeliveryAddress != "");
        // (await ProductListSearch.btnAddProdcard1)).click();
        // (await ProductListSearch.btnAddProdcard2)).click();
        // +炒米粉 +炒麵
        (await ProductListSearch.btnAddProdcardRice.findElement()).click();
        (await ProductListSearch.btnAddProdcardNoodle.findElement()).click();
        (await ProductListSearch.btnAddProdcardRice.findElement()).click();
        (await ProductListSearch.btnAddProdcardNoodle.findElement()).click();
        await ProductListSearch.shopitem_Prodname_Rice.waitUntil_ElementIsVisible(elemTimeout);
        await ProductListSearch.shopitem_Prodname_Noodle.waitUntil_ElementIsVisible(elemTimeout);
        //await driver.sleep(1000); //數字會有延遲
        // shopcart badge == 4
        _assertShopcartBadge(4);
        await driver.sleep(1000);
        await ProductListSearch.shopitem_Prodname_Rice.until_assert_elementTextIs(findRice.name,elemTimeout);
        await ProductListSearch.shopitem_Prodname_Noodle.until_assert_elementTextIs(findNoodle.name,elemTimeout);
        // assert 數量 == 2數量 == 2
        await ProductListSearch.shopitem_amount_Rice.until_assert_elementTextIs("2",elemTimeout);
        await ProductListSearch.shopitem_amount_Noodle.until_assert_elementTextIs("2",elemTimeout);
        // 單品價格小計
        let expectPrice_Rice = findRice.price * 2;
        let expectPrice_Noodle = findNoodle.price * 2;
        let shopitem_price_Rice = await(await ProductListSearch.shopitem_price_Rice.findElement()).getText();
        let shopitem_price_Noodle = await(await ProductListSearch.shopitem_price_Noodle.findElement()).getText();
        assert(shopitem_price_Rice == expectPrice_Rice.toString())
        assert(shopitem_price_Noodle == expectPrice_Noodle.toString())
        // 總價
        let expectTotalPrice = expectPrice_Rice + expectPrice_Noodle;
        let spcartSpan_AllItems_Price = await (await ShopCart.spcartSpan_AllItems_Price.findElement()).getText();
        assert(expectTotalPrice.toString() == spcartSpan_AllItems_Price);
        //let aa = await driver.executeScript(`return arguments[0].innerHTML; `, elem)
        //console.log("LOG: ~ file: login1.spec.js ~ line 484 ~ it ~ aa", aa)
        //change order address
        let newAddress = getRandomString(5);
        (await ProductListSearch.plsDeliveryAddress.findElement()).clear();
        (await ProductListSearch.plsDeliveryAddress.findElement()).sendKeys(newAddress);

        (await ShopCart.spcartBtnCheckOut.findElement()).click();
        await driver.sleep(1000);
        let invoice_userName = await (await Invoice.invoice_userName.findElement()).getText();
        let invoice_orderAddress = await (await Invoice.invoice_orderAddress.findElement()).getText();
        assert(invoice_userName === userData.userProfile.name);
        assert(invoice_orderAddress === newAddress);
        //total price
        let invoice_totalPrice = await (await Invoice.invoice_totalPrice.findElement()).getText();
        let invoice_totalPrice2 = await (await PopInvoice.invoice_totalPrice2.findElement()).getText();
        assert(invoice_totalPrice == expectTotalPrice.toString());
        assert(invoice_totalPrice2 == expectTotalPrice.toString());
        //click btn CheckOut
        await (await PopInvoice.popinvoice_btnCheckOutOrder.findElement()).click();
        
        //clear log
        await getBrowserConsoleLog();
        let promise_getLogMatches = entryManager.promise_getLogMatches.bind(entryManager, getBrowserConsoleLog,assertCusPopInvoice.addNewOrderId_ok)
        let matches = await EntryManager.waitLog(promise_getLogMatches, 3000,500) //entryManager.waitLog(getResult, 3000,500)
        console.log("LOG: ~ file: login1.spec.js ~ line 411 ~ it ~ matches", matches)
        let lastOrderId = matches[0]
        console.log("LOG: ~ file: login1.spec.js ~ line 412 ~ it ~ lastOrderId", lastOrderId)
        
        
        //return getBrowserConsoleLog()

    })
    it('購物車沒商品,結帳 - 跳出警示框', async () => {
        await _loginEmail();
        (await index.navitemOrderProducts.findElement()).click();
        await driver.sleep(1000);
        (await ShopCart.spcartBtnCheckOut.findElement()).click();
        await driver.sleep(1000);
        await ShopCart.btnSwalCancel.waitUntil_ElementIsVisible(elemTimeout);
        await driver.sleep(1000);
        (await ShopCart.btnSwalCancel.findElement()).click();
    })
    // it('檢查個人檔案',async() => {
    //     await _loginEmail();
    //     await _openMyProfile();

    // })
})