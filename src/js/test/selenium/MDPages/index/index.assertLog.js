let {
    getTitle
} = require('../../assertLog.js')
//let assertTitle = 'assertLog:'
// let getTitle = (mdId, arguments_callee_name) => {
//     return `${assertTitle}[${mdId}-${arguments_callee_name}]  `
// }
let mdID = 'index'
let msg = ''

function loginSuccess(funcName, isSuccess) {
    //arguments.callee.name
    return `${getTitle(mdID, funcName)}${isSuccess}`
}

function displayLoginName(funcName, loginName) {
    return `${getTitle(mdID, funcName)}${loginName}`
}
module.exports = {
    loginSuccess: loginSuccess.bind(null, loginSuccess.name),
    displayLoginName: displayLoginName.bind(null, displayLoginName.name),
}