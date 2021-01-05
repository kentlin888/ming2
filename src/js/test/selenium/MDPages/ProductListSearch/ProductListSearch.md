const {
        By,
        Key,
        until
    } = require('selenium-webdriver')
module.exports = {
    // REVIEW plsDeliveryAddress
    //![](imgs/plsDeliveryAddress.png)
    plsDeliveryAddress:By.css("[data-testid='plsDeliveryAddress']"),
    //
    // REVIEW btnMainCourse
    //![](imgs/btnMainCourse.png)
    btnMainCourse:By.css("[data-href='#mainCourse']"),
    //
    // REVIEW btnMeats
    //![](imgs/btnMeats.png)
    btnMeats:By.css("[data-href='#meats']"),
    //
    // REVIEW btnAddProdcard1
    //![](imgs/btnAddProdcard1.png)
    btnAddProdcard1:By.css("[data-testid^='prodName-']:nth-child(1) .addButton"),
    //
    // REVIEW btnAddProdcard2
    //![](imgs/btnAddProdcard2.png)
    btnAddProdcard2:By.css("[data-testid^='prodName-']:nth-child(2) .addButton"),
    //
    // REVIEW btnAddProdcardRice
    //![](imgs/btnAddProdcard1.png)
    btnAddProdcardRice:By.css("[data-testid='prodName-炒米粉'] .addButton"),
    //
    // REVIEW btnAddProdcardNoodle
    //![](imgs/btnAddProdcard2.png)
    btnAddProdcardNoodle:By.css("[data-testid^='prodName-炒麵'] .addButton"),
    //
    // REVIEW shopitem_Prodname_Rice
    //![](imgs/btnAddProdcard1.png)
    shopitem_Prodname_Rice:By.css("[data-testid='spitem-prodName-炒米粉'] .tdProductName"),
    //
    // REVIEW shopitem_Prodname_Noodle
    //![](imgs/btnAddProdcard2.png)
    shopitem_Prodname_Noodle:By.css("[data-testid='spitem-prodName-炒麵'] .tdProductName"),
    //
    // REVIEW shopitem_amount_Rice
    //![](imgs/btnAddProdcard1.png)
    shopitem_amount_Rice:By.css("[data-testid='spitem-prodName-炒米粉'] .divCellAmount"),
    //
    // REVIEW shopitem_amount_Noodle
    //![](imgs/btnAddProdcard1.png)
    shopitem_amount_Noodle:By.css("[data-testid='spitem-prodName-炒麵'] .divCellAmount"),
    //
}