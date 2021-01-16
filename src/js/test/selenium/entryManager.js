//const { WebDriver } = require('selenium-webdriver')
import assertLog from './assertLog.js'
let {
    assertTitle
} = assertLog
export default class EntryManager {
    constructor() {}
    /**@type {import('selenium-webdriver').logging.Entry[]}} */
    arrayEntries = []
    loadEntries(arrayEntries) {
        this.arrayEntries = arrayEntries
    }
    clearEntries() {
        this.arrayEntries = []
    }
    pushEntry(entry) {
        this.arrayEntries.push(entry)
    }
    pushArrayEntries(arrayEntries) {
        arrayEntries.forEach((item) => {
            this.pushEntry(item);
        })
    }
    filterAssertTitle() {
        this.arrayEntries = this.arrayEntries.filter((entry) => {
            return entry.message.includes(assertTitle)
        })
    }

    /**
     * 
     * @param {Function} getLog 
     * @param {string} assertMsg 
     * @param {number} timeoutSeconds - timeout seconds
     */
    async monitorEntries(getLog, assertMsg, timeoutSeconds) {
        let times = timeoutSeconds * 2
        for (let i = 0; i < times; i++) {
            let bl = await this.promise_findLog_withAssert(assertMsg, getLog)
            //console.log("LOG: ~ file: entryManager.js ~ line 34 ~ monitorEntries ~ bl", bl)
            if (bl)
                return true
        }
        return false; //finally
    }
    static async sleep(interval) {
        return new Promise(async (resolve, reject) => {
            setTimeout(async () => {
                //console.log(`sleep(${interval})....`)
                resolve()
            }, interval); //500

        })
    }
    
    static async waitLog(getMatchResult, timeout, interval) {
        return new Promise(async(resolve) => {
            let times = Math.ceil(timeout / interval);
            for (let i = 0; i < times; i++) {
                // console.log('i-->', i)
                let result = await getMatchResult(interval);
                if (result !== null) {
                    resolve(result)
                }else{
                    //wait 500
                    await EntryManager.sleep(interval)
                }
            }
            resolve(null); //finally not found
        })
    }
    /**
     * 
     * @param {function} getLog 
     * @param {import('../../lib/RdQaLog.js').default} rdqaLog 
     */
    async promise_getLogMatches(getLog, rdqaLog) {
        let self = this
        return new Promise(async (resolve, reject) => {
            let arrayLogEntries = await getLog();
            //console.log("LOG: ~ file: entryManager.js ~ line 91 ~ setTimeout ~ arrayLogEntries", arrayLogEntries)
            if (arrayLogEntries.length > 0) {
                self.pushArrayEntries(arrayLogEntries)
                self.filterAssertTitle();
            }
            // find prefix
            let findEntries = self.findEntries(rdqaLog.prefix)
            //console.log("LOG: ~ findEntries", findEntries)
            if (findEntries.length === 0) {
                //return null
                resolve(null)
            }
            else{
                //console.log(666622)
                let matches = rdqaLog.getMatchValues(findEntries[0].message)
                let _ = require('lodash')
                matches = matches.map((item) => {
                    return _.trimEnd(item, '"')
                })
                resolve(matches)
            }
        })
    }

    getLog() {
        // return logEntries
    }
    promise_findLog_withAssert(assertMsg, getLog) {
        return new Promise(async (resolve, reject) => {
            await setTimeout(async () => {
                let arrayLogEntries = await getLog();
                if (arrayLogEntries.length > 0) {
                    this.pushArrayEntries(arrayLogEntries)
                    this.filterAssertTitle();
                }
                let findEntries = this.findEntries(assertMsg)
                // console.log("LOG: ~ file: entryManager.js ~ line 1 ~ awaitsetTimeout ~ assertMsg", assertMsg)
                // console.log(JSON.stringify(this.arrayEntries, null, 4))
                if (findEntries.length > 0)
                    resolve(true)
                else
                    resolve(false)
            }, 500);
        })
    }

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
    ///**@type {import('selenium-webdriver').logging.Entry[]}*/arrayEntries,
    findEntries( /**@type {string}*/ msg) {
        //this.loadEntries(arrayEntries)
        //this.filterAssertTitle();
        //console.log("LOG: ~ file: entryManager.js ~ line 25 ~ returnthis.arrayEntries.filter ~ this.arrayEntries", this.arrayEntries)
        return this.arrayEntries.filter((entry) => {
            //console.log(1111, entry.message.includes(msg))
            return entry.message.includes(msg)
        })
    }
}
//module.exports = EntryManager;