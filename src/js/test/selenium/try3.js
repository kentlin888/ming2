let path = require('path')

let aa = path.join(__dirname, './MDPages/forTest/getDataTestId.htm')
let bb = path.extname(aa)

console.log(path.parse(aa).base)
console.log(bb.replace('.',''))