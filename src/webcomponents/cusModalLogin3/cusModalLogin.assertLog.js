
import RdQaLog,{ENUM_mdId} from '../../js/lib/RdQaLog.js'
let mdID = ENUM_mdId.cusModalLogin

let duplicatedRegisterAccount = new RdQaLog(mdID);
duplicatedRegisterAccount.setLogFunction((isDuplicated) => {
    return `${duplicatedRegisterAccount.prefix}${isDuplicated}`
})

let registerSuccess = new RdQaLog(mdID);
registerSuccess.setLogFunction((isSuccess) => {
    return `${registerSuccess.prefix}${isSuccess}`
})

//---------------Export
let ExportRdQA = {
    duplicatedRegisterAccount,
    registerSuccess,
}
//fill name
for(let keyname in ExportRdQA){
    ExportRdQA[keyname].name = keyname
}
export default ExportRdQA