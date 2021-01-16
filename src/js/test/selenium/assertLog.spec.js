import EntryManager from './entryManager.js'
let webdriver = require('selenium-webdriver')
// import assertLog from './assertLog.js'


let {assert} = require('chai')
describe('assertLog.spec.js', () => {
    let sampleEntries=[]
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
        sampleEntries = [ety1,ety2,ety3]
    })
    it('EntryManager 1', async () => {
        
        let getBrowserConsoleLog = function(){
            return sampleEntries
        }
        let entryManager = new EntryManager();
        let monitorEntries = entryManager.monitorEntries.bind(entryManager, getBrowserConsoleLog)
        let bl = await monitorEntries("assertLog: webpack-int aa1", 2);
        assert(bl===true)
    })

    it('assertLog.isLoginSuccess()',() => {
        let assertIndex = require('../../../pages/index/index.assertLog.js')
        let assertMsg=assertIndex.default.loginSuccess.log(false)
        console.log("LOG: ~ file: assertLog.spec.js ~ line 42 ~ it ~ assertMsg", assertMsg)
    })
    
})