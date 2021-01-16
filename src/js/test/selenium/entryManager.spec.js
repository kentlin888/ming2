import EntryManager from './entryManager.js'
import assertLog from '../../react/components/PopInvoice.assertLog'
import RdQaLog from '../../lib/RdQaLog.js'
const log1 = require('./MDPages/forTest/logEntries1.json')
const log2 = require('./MDPages/forTest/logEntries2.json')
const log3 = require('./MDPages/forTest/logEntries3.json')
const {
    assert
} = require('chai')
let webdriver = require('selenium-webdriver')
describe('entryManager.spec.js', () => {
    let entryManager = new EntryManager();
    let sampleEntries = []
    before(() => {
        let ety1 = new webdriver.logging.Entry('', '');
        ety1 = Object.assign(ety1, {
            "level": "INFO",
            "message": "webpack-internal:///../node_modules/react-dom/cjs/react-dom.development.js 24993:16 \"%cDownload the React DevTools for a better development experience: https://fb.me/react-devtools\" \"font-weight:bold\"",
            "timestamp": 1608547033152,
            "type": ""
        })
        let ety2 = new webdriver.logging.Entry('', '');
        ety2 = Object.assign(ety2, {
            "level": "INFO",
            "message": "assertLog: webpack-int XX1",
            "timestamp": 1608547033152,
            "type": ""
        })
        let ety3 = new webdriver.logging.Entry('', '');
        ety3 = Object.assign(ety3, {
            "level": "INFO",
            "message": "assertLog: webpack-int aa1",
            "timestamp": 1608547033152,
            "type": ""
        })
        let ety4 = new webdriver.logging.Entry('', '');
        ety4 = Object.assign(ety4, {
            "level": "INFO",
            "message": "assertLog:[PopInvoice-addNewOrderId_ok]202105230002",
            "timestamp": 1608547023152,
            "type": ""
        })
        sampleEntries = [ety1, ety2, ety3,ety4]
    })
    it('pushArrayEntries()', () => {
        entryManager.pushArrayEntries(log1);
        assert(entryManager.arrayEntries.length === 2)
    })
    it('promise_findLog_withAssert()', async () => {
        function getLog() {
            return log3
        }
        let bl = await entryManager.promise_findLog_withAssert('ice4', getLog)
        console.log("LOG: ~ file: entryManager.spec.js ~ line 22 ~ it ~ bl", bl)
        bl = await entryManager.promise_findLog_withAssert('ice4', getLog)
        console.log("LOG: ~ file: entryManager.spec.js ~ line 22 ~ it ~ bl", bl)
        bl = await entryManager.promise_findLog_withAssert('ice4', getLog)
        console.log("LOG: ~ file: entryManager.spec.js ~ line 22 ~ it ~ bl", bl)
        assert(bl === true)
    })
    it('monitorEntries() - false', async () => {
        function getLog() {
            return log2
        }
        let bl = await entryManager.monitorEntries(getLog, 'ice4', 2)
        assert(bl === false)
        //console.log("LOG: ~ file: entryManager.spec.js ~ line 34 ~ it ~ bl", bl)
    })
    it('monitorEntries() - true', async () => {
        function getLog() {
            return log3
        }
        let bl = await entryManager.monitorEntries(getLog, 'ice4', 2)
        assert(bl === true)
        //console.log("LOG: ~ file: entryManager.spec.js ~ line 34 ~ it ~ bl", bl)
    })
    let index = 0
    let getLog_waitfor = function (params) {
        index++
        console.log("LOG: ~ file: entryManager.spec.js ~ line 89 ~ describe ~ index", index)

        if(index==3)
            return [sampleEntries[3]]
        // sampleEntries = [ety1, ety2, ety3,ety4]
        let sample2 = [...sampleEntries]
        delete sample2[3]
        return sample2
        // delete sampleEntries
        
    }
        
    let getBrowserConsoleLog = function () {
        return sampleEntries
    }
    it('filterAssertTitle()', () => {
        let entryManager = new EntryManager();
        entryManager.pushArrayEntries(sampleEntries)
        assert(entryManager.arrayEntries.length === 3)
        entryManager.filterAssertTitle();
        assert(entryManager.arrayEntries.length === 2)
    })
    it('promise_getLogMatches()', () => {
        //let msgLog = assertLog.addNewOrderId_ok.log('202105230002')
        // Waiting 30 seconds for an element to be present on the page, checking
        // for its presence once every 5 seconds.
        // let foo = await driver.wait(until.elementLocated(By.id('foo')), 30000, 'Timed out after 30 seconds', 5000);
        // await driver.wait(() => documentInitialised(), 10000);
        // for loop--- await new Promise(r => setTimeout(r, 2000));
        return entryManager.promise_getLogMatches(getBrowserConsoleLog ,assertLog.addNewOrderId_ok)
            .then((matches) => {
                assert(matches[0] === '202105230002')
                console.log('matches~~~~~', matches)
            })
        

    })
    it('waitLog()',async() => {
        let getResult = entryManager.promise_getLogMatches.bind(entryManager, getLog_waitfor, assertLog.addNewOrderId_ok)
        //let matches = await entryManager.promise_getLogMatches(getBrowserConsoleLog ,assertCusPopInvoice.addNewOrderId_ok)
        // console.log("LOG: ~ file: login1.spec.js ~ line 404 ~ it ~ matches", matches)

        // monitorEntries = entryManager.monitorEntries.bind(entryManager, getBrowserConsoleLog)
        let matches = await entryManager.waitLog(getResult, 3000,500)
        console.log("LOG: ~ file: entryManager.spec.js ~ line 124 ~ it ~ matches", matches)
        
    })
})