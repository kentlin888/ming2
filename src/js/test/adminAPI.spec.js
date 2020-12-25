let adminAPI = require('../../../adminAPI/adminAPI.js')

describe('adminAPI.test.js', () => {

    it('getUser()', () => {
        let email = 'ice4kimo@yahoo.com.tw'
        return adminAPI.getUser(email)
            .then((user) => {
                console.log(user)
            })
    })

    it('setUserEmailVerified()', () => {
        let email = 'ice4kimo@yahoo.com.tw'
        let uid = 'wLdBVK7ihpgmGTyt1sgeCFELS8g2'
        return adminAPI.setUserEmailVerified(uid, false)
            .then((user) => {
                console.log('OK~~~',user.emailVerified)
            })
    })
    it('deleteUser()', () => {
        // let email = 'ice4kimo@yahoo.com.tw'
        // let uid = 'wLdBVK7ihpgmGTyt1sgeCFELS8g2'
        let testdata=  require('../../../adminData/testdata.json')
        return adminAPI.deleteUser(testdata.userId)
            .then((e) => {
                // e == undefined
                console.log('OK~~~',e)
            })
    })
})