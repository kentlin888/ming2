let webdriver = require('selenium-webdriver')
let assertLog = require('./assertLog.js')
let chai = require('chai')
describe('assertLog.spec.js', () => {

    it('EntryManager 1', () => {
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

        let mgr = new assertLog.EntryManager();
        mgr.pushEntry(ety1)
        mgr.pushEntry(ety2)
        mgr.pushEntry(ety3)
        mgr.filterAssertTitle()
        chai.assert(mgr.arrayEntries.length == 2)
        // let arrayFind = mgr.findEntries('aa1')
        // chai.assert(arrayFind.length == 1)
    })

    it('assertLog.isLoginSuccess()',() => {
        let assertIndex = require('./MDPages/index/index.assertLog.js')
        let assertMsg=assertIndex.loginSuccess(false)
        console.log("LOG: ~ file: assertLog.spec.js ~ line 42 ~ it ~ assertMsg", assertMsg)
    })
})