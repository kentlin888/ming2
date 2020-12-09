import FirebaseMJS from '../firebase/FirebaseMJS.js'
import {
    OrderInfo,
    ShopItemInfo
} from '../dataDefine/index.js'
import * as dataKits from '../lib/dataKits.js'
let firebaseConfig = require('../../projectConfig/firebaseProj.config.json')
let chai = require('chai')
let firebase = require('firebase/app');
require('firebase/firestore')


// let adminKeyJsonPath = '../../../adminKeys/ming2-dad1d-firebase-adminsdk-5wmli-9c686eda26.json';
// let adminKeyJson = require(adminKeyJsonPath)


describe('FirebaseMJS.test.js', () => {
    
    
    it('getGroupedArray_ByTimes()', () => {
        //firebase.initializeApp(firebaseConfig);
        let TargetArray = [13,14,16,17,25,26,31,36,44,45,47,52,73,74]
        let newArray = FirebaseMJS.getGroupedArray_ByTimes(TargetArray, 4)
        let expect1 = [ 13, 14, 16, 17 ]
        let expect2 = [ 25, 26, 31, 36 ]
        let expect3 = [ 44, 45, 47, 52 ]
        let expect4 = [ 73, 74 ]

        let _ = require('lodash')

        
        chai.assert(_.isEqual(newArray[0] , expect1))
        chai.assert(_.isEqual(newArray[1] , expect2))
        chai.assert(_.isEqual(newArray[2] , expect3))
        chai.assert(_.isEqual(newArray[3] , expect4))
        
        console.log(newArray)
    })
})

