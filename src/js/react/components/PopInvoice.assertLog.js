
import RdQaLog,{ENUM_mdId} from '../../lib/RdQaLog.js'
let mdID = ENUM_mdId.PopInvoice

let addNewOrderId_ok = new RdQaLog(mdID);
addNewOrderId_ok.setLogFunction((newOrderId) => {
    return `${addNewOrderId_ok.prefix}${newOrderId}`
})

// let registerSuccess = new RdQaLog(mdID);
// registerSuccess.setLogFunction((isSuccess) => {
//     return `${registerSuccess.prefix}${isSuccess}`
// })

//---------------Export
let ExportRdQA = {
    addNewOrderId_ok,
    //registerSuccess,
}
//fill name
for(let keyname in ExportRdQA){
    ExportRdQA[keyname].name = keyname
}
export default ExportRdQA