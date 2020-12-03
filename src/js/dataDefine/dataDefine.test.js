import {
    UserData
} from './index.js'
describe('dataDefine.test.js', () => {

    it('get UserData.providerId', () => {
        let chai = require('chai')
        let userData = new UserData();
        userData.listProviderId = []
        chai.expect(userData.providerId).to.be.equal(null)
        userData.listProviderId = ['password', 'google.com']
        chai.expect(userData.providerId).to.be.equal('google.com')
        userData.listProviderId = ['google.com', 'password']
        chai.expect(userData.providerId).to.be.equal('google.com')
        userData.listProviderId = ['google.com']
        chai.expect(userData.providerId).to.be.equal('google.com')
        userData.listProviderId = ['password']
        chai.expect(userData.providerId).to.be.equal('password')
    })
    it('getListProviderId_ByAuthUserProviderData()', () => {
        //fake data
        let auth_providerData1 = {
            displayName: null,
            email: "ice4kimo@yahoo.com.tw",
            phoneNumber: null,
            photoURL: null,
            providerId: "password",
            uid: "ice4kimo@yahoo.com.tw",
        }
        let auth_providerData2 = {
            providerId: "facebook.com",
            uid: "ice4kimo@yahoo.com.tw",
        }
        let auth_providerData3 = {
            providerId: "google.com",
            uid: "ice4kimo@yahoo.com.tw",
        }
        let arrayProviderData = [auth_providerData1,auth_providerData2,auth_providerData3]
        //shallow compare array
        function arrayEquals(a, b) {
            return Array.isArray(a) &&
                Array.isArray(b) &&
                a.length === b.length &&
                a.every((val, index) => val === b[index]);
        }
        //_.isEqual(a, b); // false use lodash
        let listProviderId = UserData.getListProviderId_ByAuthUserProviderData(arrayProviderData);
        let expectArray = [ 'password', 'facebook.com', 'google.com' ];
        let isTheSame = arrayEquals(listProviderId , expectArray)
        let chai = require('chai')
        chai.assert(isTheSame === true)
    })

})