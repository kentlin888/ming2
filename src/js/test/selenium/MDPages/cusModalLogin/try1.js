let path = require('path')
let fs = require('fs')
let aaPath = path.join(__dirname, 'aa.js')
if (fs.existsSync(aaPath) === false) {
    let content = 'module.exports = {}'
    fs.writeFileSync(aaPath, content, 'utf8')
}

function initMdConfigFile() {
    let path = require('path')
    let fs = require('fs')
    let aaPath = path.join(__dirname, 'aa.js')
    if (fs.existsSync(aaPath) === false) {
        let content = 'module.exports = {}'
        fs.writeFileSync(aaPath, content, 'utf8')
    }
}