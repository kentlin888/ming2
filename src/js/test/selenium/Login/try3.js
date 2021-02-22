
const webdriver = require('selenium-webdriver')
const By = webdriver.By;
Function.prototype.applyParams = function(params) {
    this.apply(this, params);
};
let aa = By.css('ddd')
By.prototype.constructor.prototype.print = function (params) {
    console.log(1111)
}
let pp = 
// By.prototype.print = function (params) {
//     console.log(1111)
// }
let ss = By.css('dd')
ss.print();

// By.prototype.applyParams= function(params) {
//     this.apply(this, params);
// };

//By.prototype.aa 