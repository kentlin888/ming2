import FirebaseMJS from '../firebase/FirebaseMJS.js'
import {
    OrderInfo,
    ShopItemInfo
} from '../dataDefine/index'
import * as dataKits from '../lib/dataKits.js'
let projectConfig = require('../../projectConfig/firebaseProj.config.json')
let {databaseURL} = projectConfig
let chai = require('chai')

// let firebase = require('firebase/app');
// require('firebase/firestore')
// require('firebase/auth')
// firebase.initializeApp(firebaseConfig);

let adminKeyJsonPath = '../../../adminKeys/ming2-dad1d-firebase-adminsdk-5wmli-9c686eda26.json';
let adminKeyJson = require(adminKeyJsonPath)

describe('Connect3.spec.js', () => {

    it('Prod.admin.auth.getUserByEmail', () => {
        let admin = require('firebase-admin');
        admin.initializeApp({
            credential: admin.credential.cert(adminKeyJson),
            databaseURL: databaseURL
        });
        let email_KT = 'ice4kimo@yahoo.com.tw';
        return admin.auth().getUserByEmail(email_KT)
            .then(function (userRecord) {
                let boolResult = false;
                if (userRecord)
                    boolResult = true
                chai.expect(boolResult).to.be.equal(true);
                console.log("LOG: ~ file: Connect3.spec.js ~ line 36 ~ userRecord.emailVerified", userRecord.emailVerified)
                return admin.auth().updateUser(userRecord.uid, {emailVerified:true})
            })
            .then(() => {
                return admin.auth().getUserByEmail(email_KT)
            })
            .then(function (userRecord) {
                userRecord.emailVerified
                console.log("LOG: ~ file: Connect3.spec.js ~ line 42 ~ userRecord.emailVerified", userRecord.emailVerified)
            })
                
                

        function DeleteUser(in_uid) {
            admin.auth().deleteUser(in_uid)
                .then(function () {

                    process.exit(0); //success and exit
                })
                .catch(function (error) {});
        }
    })
})