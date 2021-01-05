import assertLog from '../../js/test/selenium/assertLog.js'
import pageConfig from '../../js/test/selenium/pages.config.js'
const {getTitle} = assertLog
const {ENUM_mdId} = pageConfig

//let assertTitle = 'assertLog:'
// let getTitle = (mdId, arguments_callee_name) => {
//     return `${assertTitle}[${mdId}-${arguments_callee_name}]  `
// }
let mdID = ENUM_mdId.index

function loginSuccess(funcName, isSuccess) {
    //arguments.callee.name
    return `${getTitle(mdID, funcName)}${isSuccess}`
}

function displayLoginName(funcName, loginName) {
    return `${getTitle(mdID, funcName)}${loginName}`
}
export default {
    loginSuccess: loginSuccess.bind(null, loginSuccess.name),
    displayLoginName: displayLoginName.bind(null, displayLoginName.name),
}
