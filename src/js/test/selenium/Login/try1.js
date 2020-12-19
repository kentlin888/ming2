const {
    Builder,
    By,
    Key,
    until
} = require('selenium-webdriver')

let login = require('./login.md');
let condition;
// let Elements = require('login.md')
function findElement(){
    console.log('this----',this.value)
}

// delete login.config;
// for(let key in login){
//     login[key].findElement = findElement;
// }
// login.btnLogin.findElement = findElement

By.prototype.findElement = findElement;
login.btnLogin.findElement();