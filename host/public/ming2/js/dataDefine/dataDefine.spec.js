import {
    UserData,
    OrderInfo
} from './index.js'
/**@type {import('chai')} */
let chai = require('chai')

describe('dataDefine.spec.js', () => {

    it('get UserData.providerId', () => {
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
    it('orderInfo.convertDbFields()', () => {

        let arrayFakeOrderData = require('../../../adminData/fakeData/OrderInfo.json');
        let order1 = arrayFakeOrderData[0];
        let orderInfo = OrderInfo.getOrderInfo_FromDbFormat(order1)//Object.assign(new OrderInfo(), order1)
        // test data
        let expect_fsTimeStamp = {
            seconds: 1607496130,
            nanoseconds: 833000000,
        }
        orderInfo.fstsCreateDateTime_server = expect_fsTimeStamp;
        orderInfo.convertDbFields();
        // if toDate() work?
        let date1 = orderInfo.fstsCreateDateTime_server.toDate();
        let date2 = new Date('2020-12-09T06:42:10.000Z')

        // if toDate() work?
        chai.assert(date1.toLocaleString() == date2.toLocaleString())
        
        

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
        let arrayProviderData = [auth_providerData1, auth_providerData2, auth_providerData3]
        //shallow compare array
        function arrayEquals(a, b) {
            return Array.isArray(a) &&
                Array.isArray(b) &&
                a.length === b.length &&
                a.every((val, index) => val === b[index]);
        }
        //_.isEqual(a, b); // false use lodash
        let listProviderId = UserData.getListProviderId_ByAuthUserProviderData(arrayProviderData);
        let expectArray = ['password', 'facebook.com', 'google.com'];
        let isTheSame = arrayEquals(listProviderId, expectArray)
        
        chai.assert(isTheSame === true)
    })

})