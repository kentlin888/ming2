const {
    By,
    Key,
    until
} = require('selenium-webdriver')

let config = {
    btnLogin: {
        byCss: "[data-testid='btnLogin']",
        imgName: "btnLogin.png", //default = imgs/[key].png
    },
    iptSignInEmail: {
        byCss: "[data-testid='iptSignInEmail']",
        imgName: "iptSignInEmail.png", //default = imgs/[key].png
    },
    iptSignInPassword: {
        byCss: "[data-testid='iptSignInPassword']",
        imgName: "iptSignInPassword.png", //default = imgs/[key].png
    },
    ckboxKeepSignin: {
        byCss: "[data-testid='ckboxKeepSignin']",
        imgName: "ckboxKeepSignin.png", //default = imgs/[key].png
    },
    btnEmailSignin: {
        byCss: "[data-testid='btnEmailSignin']",
        imgName: "btnEmailSignin.png", //default = imgs/[key].png
    },
    btnGoogleSignin: {
        byCss: "[data-testid='btnGoogleSignin']",
        imgName: "btnGoogleSignin.png", //default = imgs/[key].png
    },
}
module.exports.config = config;

module.exports = Object.assign(module.exports, {
    //![](imgs/btnLogin.png)
    // REVIEW btnLogin
    btnLogin: By.css("[data-testid='btnLogin']"),
    //
    /*![](imgs/iptSignInEmail.png)*/
    // REVIEW iptSignInEmail
    iptSignInEmail: By.css("[data-testid='iptSignInEmail']"),
    //
    //![](imgs/iptSignInPassword.png)
    // REVIEW iptSignInPassword
    iptSignInPassword: By.css("[data-testid='iptSignInPassword']"),
    //
    //![](imgs/ckboxKeepSignin.png)
    // REVIEW ckboxKeepSignin
    ckboxKeepSignin: By.css("[data-testid='ckboxKeepSignin']"),
    //
    //![](imgs/btnEmailSignin.png)
    // REVIEW btnEmailSignin
    btnEmailSignin: By.css("[data-testid='btnEmailSignin']"),
    //
    //![](imgs/btnGoogleSignin.png)
    // REVIEW btnGoogleSignin
    btnGoogleSignin: By.css("[data-testid='btnGoogleSignin']"),
    //
})