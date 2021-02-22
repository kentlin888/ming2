const {
        By,
        Key,
        until
    } = require('selenium-webdriver')
module.exports = {
    // REVIEW btnCloseModal
    //![](imgs/btnCloseModal.png)
    btnCloseModal:By.css("[data-testid='btnCloseModal']"),
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
    // REVIEW btnRegisterEmail
    //![](imgs/btnRegisterEmail.png)
    btnRegisterEmail:By.css("[data-testid='btnRegisterEmail']"),
    //
    // REVIEW btnForgetPassword
    //![](imgs/btnForgetPassword.png)
    btnForgetPassword:By.css("[data-testid='btnForgetPassword']"),
    //
    // REVIEW btnEmailSignin
    //![](imgs/btnEmailSignin.png)
    btnEmailSignin:By.css("[data-testid='btnEmailSignin']"),
    //
    // REVIEW btnGoogleSignin
    //![](imgs/btnGoogleSignin.png)
    btnGoogleSignin:By.css("[data-testid='btnGoogleSignin']"),
    //
    // REVIEW iptRegisterEmail
    //![](imgs/iptRegisterEmail.png)
    iptRegisterEmail:By.css("[data-testid='iptRegisterEmail']"),
    //
    // REVIEW iptRegisterPWD1
    //![](imgs/iptRegisterPWD1.png)
    iptRegisterPWD1:By.css("[data-testid='iptRegisterPWD1']"),
    //
    // REVIEW iptRegisterPWD2
    //![](imgs/iptRegisterPWD2.png)
    iptRegisterPWD2:By.css("[data-testid='iptRegisterPWD2']"),
    //
    // REVIEW btnSendRegister
    //![](imgs/btnSendRegister.png)
    btnSendRegister:By.css("[data-testid='btnSendRegister']"),
    //
    // REVIEW iptResentPwdEmail
    //![](imgs/iptResentPwdEmail.png)
    iptResentPwdEmail:By.css("[data-testid='iptResentPwdEmail']"),
    //
    // REVIEW btnResentPassword
    //![](imgs/btnResentPassword.png)
    btnResentPassword:By.css("[data-testid='btnResentPassword']"),
    //
    // REVIEW btnSwalConfirm
    //![](imgs/btnSwalConfirm.png)
    btnSwalConfirm:By.css("[data-testid='btnSwalConfirm']"),
    //
}