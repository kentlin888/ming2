
import RdQaLog,{ENUM_mdId} from '../../js/lib/RdQaLog.js'
let mdID = ENUM_mdId.index

let displayLoginName = new RdQaLog(mdID);
displayLoginName.setLogFunction((loginName) => {
    return `${displayLoginName.prefix}${loginName}`
})

let loginSuccess = new RdQaLog(mdID);
loginSuccess.setLogFunction((isSuccess) => {
    return `${loginSuccess.prefix}${isSuccess}`
})

//---------------Export
let ExportRdQA = {
    loginSuccess,
    displayLoginName,
}
//fill name
for(let keyname in ExportRdQA){
    ExportRdQA[keyname].name = keyname
}
export default ExportRdQA
