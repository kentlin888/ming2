
import {getMatches, getFunctionParameters} from './dataKits.js'


export const assertTitle = 'assertLog:'
export function getTitle(mdID, arguments_callee_name){
    return `${assertTitle}[${mdID}-${arguments_callee_name}]`
}
/**@enum {string} */
export const ENUM_mdId = {
    forTest:"forTest",
    T1:"T1",
    index:"index",
    cusModalLogin:"cusModalLogin",
    cusModalUserProfile:"cusModalUserProfile",
    ProductListSearch:"ProductListSearch",
    ShopCart:"ShopCart",
    ShopItem:"ShopItem",
    Invoice:"Invoice",
    ProductCard:"ProductCard",
    PopInvoice:"PopInvoice",
}

export default class RdQaLog{
    constructor(mdID){
        this.mdID = mdID;
    }
    mdID=""
    name=""
    static logValueSeparator = "|||"
    get prefix(){
        return getTitle(this.mdID, this.name);
    }
    get _prefix_matchPattern(){
        return this.prefix.replace(`]`,`\\]`).replace(`[`,`\\[`);
    }
    /**@prop {function} - return log message*/
    log=null;
    /**
     * @function - define log function (return log message)
     * @param {function} log 
     */
    setLogFunction(log){
        this.log = log;//.bind(this)
    }
    // log(isSuccess){
    //     return `${this.prefix}}${isSuccess}`
    // }
    _getLogArgumentNames(){
        if(this.log===null)
            throw new Error('Please define RdQaLog.log(function) first!')
        return getFunctionParameters(this.log)
    }
    matchPattern(){
        if(this.log===null)
            throw new Error('Please define RdQaLog.log(function) first!')
        //let newPrefix = this.prefix.replace(`]`,`\\]`).replace(`[`,`\\[`)
        let logArgumentNames = this._getLogArgumentNames()
        let logArgumentCount = logArgumentNames.length
        let pat_matchValue_all = `${this._prefix_matchPattern}(?<matchValue>.*)`
        if(logArgumentCount<=1)
            return pat_matchValue_all
        else{
            let pat_matchValue = "(?<matchValue>.*)"
            // let pat_matchValue_all = "(?<matchValue>.*)"
            for(let i=1;i<logArgumentCount;i++){
                pat_matchValue = `(?<matchValue${i+1}>.*)`
                pat_matchValue_all+=`${RdQaLog.logValueSeparator}${pat_matchValue}`
            }
            return pat_matchValue_all
        }
    }
    /**@returns {any[]}*/
    getMatchValues(content){
        let reg = new RegExp(this.matchPattern(), "g")
        let rtn = getMatches(content, reg)
        return rtn
    }
}
