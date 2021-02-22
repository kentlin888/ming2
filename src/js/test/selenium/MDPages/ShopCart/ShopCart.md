const {
        By,
        Key,
        until
    } = require('selenium-webdriver')
module.exports = {
    // REVIEW spcartSpan_AllItems_Price
    //![](imgs/spcartSpan_AllItems_Price.png)
    spcartSpan_AllItems_Price:By.css("[data-testid='spcartSpan_AllItems_Price']"),
    //
    // REVIEW spcartBtnCheckOut
    //![](imgs/spcartBtnCheckOut.png)
    spcartBtnCheckOut:By.css("[data-testid='spcartBtnCheckOut']"),
    //
    // REVIEW btnSwalCancel
    //![](imgs/btnSwalCancel.png)
    btnSwalCancel:By.css("[data-testid='btnSwalCancel']"),
    //
}