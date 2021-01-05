const {
        By,
        Key,
        until
    } = require('selenium-webdriver')
module.exports = {
    // REVIEW invoiceShopItem_prodName
    //![](imgs/invoiceShopItem_prodName.png)
    invoiceShopItem_prodName:By.css("[data-testid='invoiceShopItem_prodName']"),
    //
    // REVIEW invoiceShopItem_amount
    //![](imgs/invoiceShopItem_amount.png)
    invoiceShopItem_amount:By.css("[data-testid='invoiceShopItem_amount']"),
    //
    // REVIEW invoiceShopItem_price
    //![](imgs/invoiceShopItem_price.png)
    invoiceShopItem_price:By.css("[data-testid='invoiceShopItem_price']"),
    //
    // REVIEW invoiceShopItem_itemCountPrice
    //![](imgs/invoiceShopItem_itemCountPrice.png)
    invoiceShopItem_itemCountPrice:By.css("[data-testid='invoiceShopItem_itemCountPrice']"),
    //
    // REVIEW invoice_orderId
    //![](imgs/invoice_orderId.png)
    invoice_orderId:By.css("[data-testid='invoice_orderId']"),
    //
    // REVIEW invoice_jsdtCreateDateTime_server
    //![](imgs/invoice_jsdtCreateDateTime_server.png)
    invoice_jsdtCreateDateTime_server:By.css("[data-testid='invoice_jsdtCreateDateTime_server']"),
    //
    // REVIEW invoice_userName
    //![](imgs/invoice_userName.png)
    invoice_userName:By.css("[data-testid='invoice_userName']"),
    //
    // REVIEW invoice_sOrderStatus
    //![](imgs/invoice_sOrderStatus.png)
    invoice_sOrderStatus:By.css("[data-testid='invoice_sOrderStatus']"),
    //
    // REVIEW invoice_phoneNumber
    //![](imgs/invoice_phoneNumber.png)
    invoice_phoneNumber:By.css("[data-testid='invoice_phoneNumber']"),
    //
    // REVIEW invoice_orderAddress
    //![](imgs/invoice_orderAddress.png)
    invoice_orderAddress:By.css("[data-testid='invoice_orderAddress']"),
    //
    // REVIEW invoice_totalPrice
    //![](imgs/invoice_totalPrice.png)
    invoice_totalPrice:By.css("[data-testid='invoice_totalPrice']"),
    //
}