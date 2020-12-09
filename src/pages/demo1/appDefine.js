
/**@enum {string} - ex: mapping T1 to ./T1.jsx */
const ENUM_AppPath = {
    T1:"./T1.jsx",
    Invoice:"./Invoice.use.jsx",
}
/**
 * @param {string} pathAppjs - full path of app.js
 * @param {ENUM_AppPath} enum_AppPath_Prop ex:T1
 */
function changeDemo1AppJSX(pathAppjs, enum_AppPath_Prop){
    let fs = require('fs');
    //get mapping path - ex: mapping T1 to ./T1.jsx
    let appPath = ENUM_AppPath[enum_AppPath_Prop]
    let fileContent = `import App from '${appPath}';
    export default App;`;
    fs.writeFileSync(pathAppjs, fileContent)
}
    
module.exports = {
    changeDemo1AppJSX
}

//let path = require('path');
// let pathAppjs = path.join(__dirname, 'app2.js')
// changeDemo1AppJSX(pathAppjs, 'T1')
// console.log(22222)