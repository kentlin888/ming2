import EntryManager from './entryManager.js'
const log1 = require('./MDPages/forTest/logEntries1.json')
const log2 = require('./MDPages/forTest/logEntries2.json')
const log3 = require('./MDPages/forTest/logEntries3.json')
const chai = require('chai')
describe('entryManager.spec.js',() => {
    let entryManager = new EntryManager();
    it('pushArrayEntries()',() => {
        entryManager.pushArrayEntries(log1);
        chai.assert(entryManager.arrayEntries.length === 3)
    })
    it('promise_findLog_withAssert()',async() => {
        function getLog() {
            return log3
        }
        let bl = await entryManager.promise_findLog_withAssert('ice4', getLog)
        console.log("LOG: ~ file: entryManager.spec.js ~ line 22 ~ it ~ bl", bl)
        bl = await entryManager.promise_findLog_withAssert('ice4', getLog)
        console.log("LOG: ~ file: entryManager.spec.js ~ line 22 ~ it ~ bl", bl)
        bl = await entryManager.promise_findLog_withAssert('ice4', getLog)
        console.log("LOG: ~ file: entryManager.spec.js ~ line 22 ~ it ~ bl", bl)
        chai.assert(bl === true)
    })
    it('monitorEntries() - false',async() => {
        function getLog() {
            return log2
        }
        let bl = await entryManager.monitorEntries('ice4', getLog,4)
        console.log("LOG: ~ file: entryManager.spec.js ~ line 34 ~ it ~ bl", bl)
    })
    it('monitorEntries() - true',async() => {
        function getLog() {
            return log3
        }
        let bl = await entryManager.monitorEntries('ice4', getLog,4)
        console.log("LOG: ~ file: entryManager.spec.js ~ line 34 ~ it ~ bl", bl)
    })
})