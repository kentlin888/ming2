const {
        By,
        Key,
        until
    } = require('selenium-webdriver')
module.exports = {
    // REVIEW invoice_totalPrice2
    //![](imgs/invoice_totalPrice2.png)
    invoice_totalPrice2:By.css("[data-testid='invoice_totalPrice2']"),
    //
    // REVIEW popinvoice_btnCheckOutOrder
    //![](imgs/popinvoice_btnCheckOutOrder.png)
    popinvoice_btnCheckOutOrder:By.css("[data-testid='popinvoice_btnCheckOutOrder']"),
    //
    // REVIEW btnSwalConfirm
    //![](imgs/btnSwalConfirm.png)
    btnSwalConfirm:By.css("[data-testid='btnSwalConfirm']"),
    //
    // REVIEW btnSwalCancel
    //![](imgs/btnSwalCancel.png)
    btnSwalCancel:By.css("[data-testid='btnSwalCancel']"),
    //
}