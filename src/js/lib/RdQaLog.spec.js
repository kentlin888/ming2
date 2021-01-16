import { getMatches, getFunctionParameters } from './dataKits.js';
import RdQaLog from './RdQaLog.js'
let {assert} = require('chai')

describe('RdQaLog.spec.js',() => {
    

    it('setLogFunction() - matchPattern is correct',() => {
        let _=require('lodash')
        let mdID = 'index'
        let displayLoginName = new RdQaLog(mdID);
        let ExportRdQA = {
            displayLoginName
        }
        for(let keyname in ExportRdQA){
            ExportRdQA[keyname].name = keyname
        }
        // 2 parameters
        let log = function cc(a1,a2) {
            
        }
        displayLoginName.setLogFunction(log)
        let matches = getFunctionParameters(displayLoginName.log)
        assert(_.isEqual(matches, ['a1','a2']))
        let matchPattern = displayLoginName.matchPattern();
        assert(matchPattern === `assertLog:\\[index-displayLoginName\\](?<matchValue>.*)|||(?<matchValue>.*)`)
        // 1 parameters
        log = function cc2(a1) {    }
        displayLoginName.setLogFunction(log)
        matches = getFunctionParameters(displayLoginName.log)
        assert(_.isEqual(matches, ['a1']))
        matchPattern = displayLoginName.matchPattern();
        assert(matchPattern === "assertLog:\\[index-displayLoginName\\](?<matchValue>.*)")
    })

    it('getMatchValues()',() => {
        let mdID = 'index'
        let displayLoginName = new RdQaLog(mdID);
        let ExportRdQA = {
            displayLoginName
        }
        for(let keyname in ExportRdQA){
            ExportRdQA[keyname].name = keyname
        }
        //---------------
        // 1 parameter
        displayLoginName.setLogFunction((loginName) => {
            return `${displayLoginName.prefix}${loginName}`
        })
        assert(displayLoginName.name === "displayLoginName")
        assert(displayLoginName.log('AAAA')==="assertLog:[index-displayLoginName]AAAA")
        let matches = displayLoginName.getMatchValues("assertLog:[index-displayLoginName]AAAA")
        console.log("LOG: ~ file: RdQaLog.spec.js ~ line 58 ~ it ~ matches", matches)
        assert(matches[0] === 'AAAA')
        // 2 parameter
        // displayLoginName.setLogFunction((loginName, schoolName) => {
        //     return `${displayLoginName.prefix}${loginName}${RdQaLog.logValueSeparator}${schoolName}`
        // })
        // assert(displayLoginName.log('AAAA','BBB')==="assertLog:[index-displayLoginName]AAAA|||BBB")
        // console.log(displayLoginName.matchPattern())
        // let aa = displayLoginName.getMatchValues("assertLog:[index-displayLoginName]AAAA|||BBB")
        // console.log("LOG: ~ file: RdQaLog.spec.js ~ line 58 ~ it ~ aa", aa)

        //let content = "assertLog:[index-displayLoginName]AAAA|||BBB|||CCC"
        // let pattern = "assertLog:\\[index-displayLoginName\\](?<matchValue>.[^|||]*)|||"
        // pattern = "assertLog:\\[index-displayLoginName\\].*[|||](?<matchValue>.[^|||]*)|||"
        // let reg = new RegExp(pattern,"g")
        // let matches = reg.exec(content)
        // console.log(matches)
        // console.log(matches.groups)
    })
})