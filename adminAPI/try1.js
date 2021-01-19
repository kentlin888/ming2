let adminAPI = require('./adminAPI.js')
adminAPI.fStore_GetUsers_byMail('ice4kimo@yahoo.com.tw')
.then((arrayUsers) => {
    console.log(JSON.stringify(arrayUsers, null , 4))
})