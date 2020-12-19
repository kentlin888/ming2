const {
        By,
        Key,
        until
    } = require('selenium-webdriver')

let config = {
    "btnLogin": {
        "byCss": "[data-testid='btnLogin']",
        "imgName": "btnLogin.png"
    },
    "iptSignInEmail": {
        "byCss": "[data-testid='iptSignInEmail']",
        "imgName": "iptSignInEmail.png"
    },
    "iptSignInPassword": {
        "byCss": "[data-testid='iptSignInPassword']",
        "imgName": "iptSignInPassword.png"
    },
    "ckboxKeepSignin": {
        "byCss": "[data-testid='ckboxKeepSignin']",
        "imgName": "ckboxKeepSignin.png"
    },
    "btnEmailSignin": {
        "byCss": "[data-testid='btnEmailSignin']",
        "imgName": "btnEmailSignin.png"
    },
    "btnGoogleSignin": {
        "byCss": "[data-testid='btnGoogleSignin']",
        "imgName": "btnGoogleSignin.png"
    },
    "spanDisplayEmail": {
        "byCss": "[data-testid='spanDisplayEmail']",
        "imgName": "spanDisplayEmail.png"
    }
}
module.exports.config = config;
module.exports = Object.assign(module.exports, {
    // REVIEW btnLogin
    //![](imgs/btnLogin.png)
    btnLogin:By.css("[data-testid='btnLogin']"),
    //
    // REVIEW iptSignInEmail
    //![](imgs/iptSignInEmail.png)
    iptSignInEmail:By.css("[data-testid='iptSignInEmail']"),
    //
    // REVIEW iptSignInPassword
    //![](imgs/iptSignInPassword.png)
    iptSignInPassword:By.css("[data-testid='iptSignInPassword']"),
    //
    // REVIEW ckboxKeepSignin
    //![](imgs/ckboxKeepSignin.png)
    ckboxKeepSignin:By.css("[data-testid='ckboxKeepSignin']"),
    //
    // REVIEW btnEmailSignin
    //![](imgs/btnEmailSignin.png)
    btnEmailSignin:By.css("[data-testid='btnEmailSignin']"),
    //
    // REVIEW btnGoogleSignin
    //![](imgs/btnGoogleSignin.png)
    btnGoogleSignin:By.css("[data-testid='btnGoogleSignin']"),
    //
    // REVIEW spanDisplayEmail
    //![](imgs/spanDisplayEmail.png)
    spanDisplayEmail:By.css("[data-testid='spanDisplayEmail']"),
    //
})