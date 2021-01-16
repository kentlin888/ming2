btnVerifyPhone.addEventListener('click', () => {

    const appVerifier = new firebase.auth.RecaptchaVerifier(btnVerifyPhone, {
        'size': 'invisible',
    })

    let numberValue = iptPhone.value;
    if (numberValue) {
        let _phone = numberValue.split('0')[1];
        let phoneNumber = `+886${_phone}`;
        console.log('驗證phoneNumber', phoneNumber)
        firebase.auth().currentUser.linkWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                console.log("LOG:confirmationResult", confirmationResult)

                Swal.fire({
                    text: '認證碼已送出',
                    icon: 'success'
                });
                // ...
            }).catch((error) => {
                Swal.fire({
                    text: `btnVerifyPhone${error}`,
                    icon: 'warning'
                });
            });

    } else {
        Swal.fire({
            text: '請輸入電話號碼',
            icon: 'warning'
        })
    }
})


btnDeletePhone.addEventListener('click', () => {
    console.log('btnDeletePhone')
    firebase.auth().currentUser.unlink('phone').then((result) => {
        console.log(result);
        Swal.fire({
            title:'刪除成功',
            text: '請重新驗證並更新電話號碼',
            icon: 'info'
        })
    }).catch((error) => {
        Swal.fire({
            text: `${error}`,
            icon: 'warning'
        })
        console.log(`btnDeletePhone:${error}`);
    });
})
