
const {
    By,
    Key,
    until
} = require('selenium-webdriver')

let config = {
    btnLogin2: {
        byCss: "[data-testid='btnLogin']",
        imgName: "btnLogin.png", //default = imgs/[key].png
    },
    iptSignInEmail2: {
        byCss: "[data-testid='iptSignInEmail']",
        imgName: "iptSignInEmail.png", //default = imgs/[key].png
    },
    iptSignInPassword2: {
        byCss: "[data-testid='iptSignInPassword']",
        imgName: "iptSignInPassword.png", //default = imgs/[key].png
    },
    ckboxKeepSignin2: {
        byCss: "[data-testid='ckboxKeepSignin']",
        imgName: "ckboxKeepSignin.png", //default = imgs/[key].png
    },
    btnEmailSignin2: {
        byCss: "[data-testid='btnEmailSignin']",
        imgName: "btnEmailSignin.png", //default = imgs/[key].png
    },
    btnGoogleSignin2: {
        byCss: "[data-testid='btnGoogleSignin']",
        imgName: "btnGoogleSignin.png", //default = imgs/[key].png
    },
}
module.exports.config = config;
