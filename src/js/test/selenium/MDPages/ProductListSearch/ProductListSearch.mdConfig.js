module.exports = {
    btnMainCourse: {
        "byCss": "[data-href='#mainCourse']",
        "imgName": "btnMainCourse.png"
    },
    btnMeats: {
        "byCss": "[data-href='#meats']",
        "imgName": "btnMeats.png"
    },
    btnAddProdcard1: {
        "byCss": "[data-testid^='prodName-']:nth-child(1) .addButton",//:nth-of-type(1) also work
        "imgName": "btnAddProdcard1.png"
    },
    btnAddProdcard2: {
        "byCss": "[data-testid^='prodName-']:nth-child(2) .addButton",
        "imgName": "btnAddProdcard2.png"
    },
    btnAddProdcardRice: {
        "byCss": "[data-testid='prodName-炒米粉'] .addButton",//:nth-of-type(1) also work
        "imgName": "btnAddProdcard1.png"
    },
    btnAddProdcardNoodle: {
        "byCss": "[data-testid^='prodName-炒麵'] .addButton",
        "imgName": "btnAddProdcard2.png"
    },
    shopitem_Prodname_Rice: {
        "byCss": "[data-testid='spitem-prodName-炒米粉'] .tdProductName",//:nth-of-type(1) also work
        "imgName": "btnAddProdcard1.png"
    },
    shopitem_Prodname_Noodle: {
        "byCss": "[data-testid='spitem-prodName-炒麵'] .tdProductName",
        "imgName": "btnAddProdcard2.png"
    },
    shopitem_amount_Rice: {
        "byCss": "[data-testid='spitem-prodName-炒米粉'] .divCellAmount",//:nth-of-type(1) also work
        "imgName": "btnAddProdcard1.png"
    },
    shopitem_amount_Noodle: {
        "byCss": "[data-testid='spitem-prodName-炒麵'] .divCellAmount",//:nth-of-type(1) also work
        "imgName": "btnAddProdcard1.png"
    },
    shopitem_price_Rice: {
        "byCss": "[data-testid='spitem-prodName-炒米粉'] [data-testid='spitem_prodPrice']",//:nth-of-type(1) also work
        "imgName": "btnAddProdcard1.png"
    },
    shopitem_price_Noodle: {
        "byCss": "[data-testid='spitem-prodName-炒麵'] [data-testid='spitem_prodPrice']",//:nth-of-type(1) also work
        "imgName": "btnAddProdcard1.png"
    },
}