import * as assertLog from '../../js/test/selenium/assertLog.js'
import * as pageConfig from '../../js/test/selenium/pages.config.js'


let {getTitle} = assertLog.default
let {ENUM_mdId} = pageConfig.default


// let {
//     getTitle
// } = require('../../assertLog.js')

//let assertTitle = 'assertLog:'
// let getTitle = (mdId, arguments_callee_name) => {
//     return `${assertTitle}[${mdId}-${arguments_callee_name}]  `
// }
let mdID = ENUM_mdId.cusModalLogin;//'cusModalLogin'

function duplicatedRegisterAccount(funcName, isDuplicated) {
    //arguments.callee.name
    return `${getTitle(mdID, funcName)}${isDuplicated}`
}

function registerSuccess(funcName, isSuccess) {
    return `${getTitle(mdID, funcName)}${isSuccess}`
}
export default {
    duplicatedRegisterAccount: duplicatedRegisterAccount.bind(null, duplicatedRegisterAccount.name),
    registerSuccess: registerSuccess.bind(null, registerSuccess.name),
}