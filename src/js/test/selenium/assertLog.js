let assertTitle = 'assertLog:'
module.exports = {
    assertTitle:assertTitle,
    getTitle : (mdID, arguments_callee_name)=>{
        return `${assertTitle}[${mdID}-${arguments_callee_name}]  `
    },
    //EntryManager:EntryManager,
}