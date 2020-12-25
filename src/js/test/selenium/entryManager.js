
//const { WebDriver } = require('selenium-webdriver')
let {assertTitle} = require('./assertLog.js')
class EntryManager{
    /**@type {import('selenium-webdriver').logging.Entry[]}} */
    arrayEntries = []
    loadEntries(arrayEntries){
        this.arrayEntries = arrayEntries
    }
    pushEntry(entry){
        this.arrayEntries.push(entry)
    }
    filterAssertTitle(){
        this.arrayEntries = this.arrayEntries.filter((entry) => {
            return entry.message.includes(assertTitle)
        })
    }
    findEntries(/**@type {import('selenium-webdriver').logging.Entry[]}*/arrayEntries, /**@type {string}*/msg){
        this.loadEntries(arrayEntries)
        this.filterAssertTitle();
        return this.arrayEntries.filter((entry) => {
            return entry.message.includes(msg)
        })
    }
}
module.exports = EntryManager;