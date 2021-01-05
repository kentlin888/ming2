
let adminAPI = require('../../../../../adminAPI/adminAPI')
const testdata = require('./testdata.js')
const path = require('path')
const fs =require('fs');

describe('login0.spec.js',() => {
    
    it('admin 刪除測試帳號', () => {
        let userData
        return adminAPI.getUser(testdata.email)
            .then((user) => {
                if (user) {
                    userData = user
                    //delete
                    return adminAPI.deleteUser(user.uid)
                    .then(() => {
                        console.log('delete user success! ', userData.uid)
                        return adminAPI.fStore_GetUser(userData.uid)
                    })
                    .then((fStore_userData) => {
                        console.log(JSON.stringify(fStore_userData, null, 4))
                        return adminAPI.fStore_BatchDeleteUsers();
                    })
                    
                } else {
                    //user not exist
                    console.log('user not existed.')
                }
            })
        // .catch((err) => {
        //     //auth/user-not-found
        //     console.log("LOG: ~ file: login.spec.js ~ line 137 ~ it ~ err.code", err.code)
        //     console.log("LOG: ~ file: login.spec.js ~ line 137 ~ it ~ err.message", err.message)
        // })

    })
    it('admin download FS.ProductInfo-all', () => {
        let pathDownloadFile = path.join(__dirname,'../../../../../adminData/downloads/ProductInfo.json')
        return adminAPI.getProductInfo()
            .then((listProductInfo) => {
                let list_filterAutonum = listProductInfo.filter((item) => {
                    return (item.docid!="--AutoNum--")
                })
                fs.writeFileSync(pathDownloadFile, JSON.stringify(list_filterAutonum,null,4), 'utf8')
                //console.log(listProductInfo)
            })
    })
})