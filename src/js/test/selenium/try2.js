let pagesConfig = require('./pages.config.js')
let makeMdModules = require('./makeMdModules.js')
let generateId = pagesConfig.default.generateId // default = null
//generateId = ['cusModalLogin']//forTest cusModalLogin index

let allMdModule = new makeMdModules.AllMdModules(pagesConfig.default.data, generateId);
console.log(allMdModule.arrayMdModules)
//allMdModule.writeOutputMdFile_All();
// this.arrayMdModules.forEach((/**@type {MdModule}*/mdModule) => {
//     mdModule.writeOutputMdFile(mdModule.getContent());
//     mdModule.writeOutputDTSFile(mdModule.dtsInterface);
// })