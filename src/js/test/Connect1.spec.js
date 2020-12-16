import FirebaseMJS from '../firebase/FirebaseMJS.js'
import {
    OrderInfo,
    ShopItemInfo
} from '../dataDefine/index'
import * as dataKits from '../lib/dataKits.js'
let firebaseConfig = require('../../projectConfig/firebaseProj.config.json')
let chai = require('chai')
let firebase = require('firebase/app');
require('firebase/firestore')
// require('firebase/functions')
// require('firebase/storage')
//require('firebase/auth')
firebase.initializeApp(firebaseConfig);

let adminKeyJsonPath = '../../../adminKeys/ming2-dad1d-firebase-adminsdk-5wmli-9c686eda26.json';
let adminKeyJson = require(adminKeyJsonPath)

describe('Connect1.spec.js', () => {

    it('firestore.set', () => {
        let db = firebase.firestore()
        let data1 = {
            name: "John",
            age: 25
        }
        return db.collection('User2').doc().set(data1, {
                merge: true
            })
            .then((e) => {
                console.log("LOG: ~ file: try1.js ~ line 37 ~ .then ~ e", e)

            })
    })

    it('firestore.get save-fakeData OrderInfo', () => {
        let testData = require('../../../adminData/testdata.json')
        let db = firebase.firestore()
        let collectionName = 'OrderInfo'
        let uid = testData.userId;
        return db.collection(collectionName).where("userId", "==", uid).get()
        .then((snapshot) => {
            //console.log(snapshot.docs)
            let arrayOrderInfo = snapshot.docs.map((item) => {
                let data = item.data()                
                return data
            })
            let fs = require('fs')
            let json = JSON.stringify(arrayOrderInfo,null,4)
            let path = require('path')
            let filePath = path.resolve(__dirname,`../../../adminData/fakeData/${collectionName}.json`)
            fs.writeFileSync(filePath,json)
            console.warn('okokok')
        })
    })
    it('firestore.get save-fakeData ProductInfo', () => {
        //let testData = require('../../../adminData/testdata.json')
        let db = firebase.firestore()
        let collectionName = 'ProductInfo'
        //let uid = testData.userId;
        return db.collection(collectionName).get()//.where("userId", "==", uid).get()
        .then((snapshot) => {
            //console.log(snapshot.docs)
            let arrayProductInfo = snapshot.docs.map((item) => {
                let data = item.data()
                if(data.productId)//exist => not AutoNum
                    return data
            })
            let fs = require('fs')
            let json = JSON.stringify(arrayProductInfo,null,4)
            let path = require('path')
            let filePath = path.resolve(__dirname,`../../../adminData/fakeData/${collectionName}.json`)
            fs.writeFileSync(filePath,json)
            console.warn('okokok')
        })
    })

    it('Prod.html.Products.delete(AutoNum).', () => {
        let db = firebase.firestore()
        // return db.collection('Products').doc('--AutoNum--').delete()
        //     .then((e) => {
        //         console.log('delete done!')
        //     })
    })
    it('Prod.admin.Products.BatchDelete', () => {
        let collectionName
        //collectionName = 'Products'
        //collectionName = 'ProductInfo'
        collectionName = "OrderInfo"
        let admin = require('firebase-admin');
        admin.initializeApp({
            credential: admin.credential.cert(adminKeyJson),
            databaseURL: "https://ming2-dad1d.firebaseio.com"
        });
        let db = admin.firestore()
        let query = db.collection(collectionName);

        return query.get().then((querySnapshot) => {
            console.log("LOG:: querySnapshot", querySnapshot)
            //querySnapshot[0].delete()
            //querySnapshot.docs[0].delete();
            let batch = db.batch();

            let boolResult = false;
            querySnapshot.docs.forEach((doc) => {
                // if (doc.id === '--AutoNum--')
                //     boolResult = true;
                // if(doc.id!='--AutoNum--')
                batch.delete(doc.ref);

            })
            batch.commit()
            //chai.expect(boolResult).to.be.equal(true);
        })
    })
    it('FirebaseMJS.addProductInfo()', () => {
        let firebaseMJS = new FirebaseMJS(firebase,dataKits);
        return firebaseMJS.addProductInfo("清燉牛肉麵", 540, "beef", "https://www.google.com")
            .then((newDocRef) => {
                return newDocRef.get()
            })
            .then((docSnapShot) => {
                let docData = docSnapShot.data()
                console.log("LOG: ~ file: Connect1.test.js ~ line 77 ~ .then ~ docData", docData)

                // return docSnapShot.data()
            })

    })
    it('Prod.html.Firebase_MJS.addProductInfo data[17]', () => {
        let firebaseMJS = new FirebaseMJS(firebase,dataKits);
        let arrayProductInfo = require('../../../adminData/NewProducts.json')
        //only test 3 items
        // let [a,b,c] = arrayProductInfo
        // arrayProductInfo = [a,b,c]

        let arrayPromise_ProductInfo = arrayProductInfo.map((item) => {
            //must be BIND()!!!
            return firebaseMJS.addProductInfo.bind(firebaseMJS, item.name, item.price, item.category, item.imgUrl)
            // let dd = Firebase.addOrderInfo.bind(Firebase, item, true)
            // return dd 
        })
        return arrayPromise_ProductInfo.reduce(function (prePromise, arryFunc_promise, i) {
                console.log('reduce(i)--->', i)
                //return arryPromise
                return prePromise.then(function () {
                    return arryFunc_promise() //saveInDatabase(item).then((myResult) => ... );
                })
            }, Promise.resolve())
            .then((done) => {
                console.log("LOG:: done", done)

            })
            .catch((err) => {
                console.log("LOG:: err", err)
            })

    })
    it('FirebaseMJS.addOrderInfo()', () => {
        let orderInfo = new OrderInfo();
        let firebaseMJS = new FirebaseMJS(firebase,dataKits);
        return firebaseMJS.addOrderInfo(orderInfo)
            .then((newDocRef) => {
                return newDocRef.get()
            })
            .then((docSnapShot) => {
                let docData = docSnapShot.data()
                console.log("LOG: ~ file: Connect1.test.js ~ line 93 ~ .then ~ docData", docData)
            })

    })
    it('FirebaseMJS.getNewOrderInfoId()', () => {
        //different date , 5
        //same date , 2
        let today = new Date('2020/10/15')
        let predate = new Date('2020/10/11')
        let autoNewNumber = 5
        let result = FirebaseMJS.getNewOrderInfoId(predate, today, autoNewNumber)
        chai.expect(result.isCrossDate).to.be.equal(true)
        chai.expect(result.lastId).to.be.equal('202010150001')

        //today = new Date('2020/10/15')
        predate = new Date('2020/10/15')
        autoNewNumber = 367
        result = FirebaseMJS.getNewOrderInfoId(predate, today, autoNewNumber);
        chai.expect(result.isCrossDate).to.be.equal(false)
        chai.expect(result.lastId).to.be.equal('202010150367')


    })
    it('Prod.html.Firebase_MJS.addOrderInfo_FakeData[4]', () => {
        
        let firebaseMJS = new FirebaseMJS(firebase,dataKits);
        
        let _ = require('lodash')
        // return firebaseMJS.getProductInfo()
        //     .then((listProductInfo) => {
        //         let arrayOrderInfo = GetArrayOrderInfo(listProductInfo);


        //         let orderInfo = arrayOrderInfo[0]
        //         // get plain object
        //         orderInfo = dataKits.getPlainObject(orderInfo)
        //         let _ = require('lodash')
        //         return firebaseMJS.addOrderInfo(orderInfo,_)
        //     })

        return firebaseMJS.getProductInfo()
            .then((listProductInfo) => {
                let arrayOrderInfo = GetArrayOrderInfo(listProductInfo);
                let _ = require('lodash')
                let arrayPromise_AddOrderInfo = arrayOrderInfo.map((item) => {
                    //must be BIND()!!!
                    let dd = firebaseMJS.addOrderInfo.bind(firebaseMJS, item, _)
                    return dd //Firebase.addOrderInfo(item, true)
                })
                return arrayPromise_AddOrderInfo
            })
            .then((arrayPromise_AddOrderInfo) => {
                return arrayPromise_AddOrderInfo.reduce(function (prePromise, arryFunc_promise, i) {
                    //return arryPromise
                    return prePromise.then(function () {
                        return arryFunc_promise() //saveInDatabase(item).then((myResult) => ... );
                    });
                }, Promise.resolve())
            })
    })
    
    
})

/**
 * 
 * @param {ProductInfo[]} listProductInfo 
 */
function GetArrayOrderInfo(listProductInfo) {
    // pick random elements ----------------------
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    Array.prototype.pickArrayRandomElements = function (elementCount) {
        let arryLength = this.length
        if (arryLength === 0) {
            return;
        } else if (arryLength <= elementCount) {
            return this;
        } else {
            //let elementCount = 3
            let arryThis = this //_.cloneDeep(this)//[1, 3, 6, 8, 9]
            let arrayPicked = []
            // 3 times
            for (let i = 0; i < elementCount; i++) {
                let idx = getRandom(0, arryThis.length - 1)
                let pickedItem = arryThis.splice(idx, 1);
                arrayPicked.push(pickedItem)
            }
            arrayPicked = arrayPicked.flat(1)
            return arrayPicked;
        }
    }
    //---------------------------------
    let arrayOrderInfo = []
    let newOrderInfo;
    //let jsonOrder = require('./OrderInfo.json');
    let testdata = require('../../../adminData/testdata.json')
    let userData = require('../../../adminData/userData.json')
    let _ = require('lodash')

    let getNewOrderInfo = () => {
        let rtnOrderInfo = new OrderInfo();
        //let newJsonOrder = new OrderInfo(); //_.cloneDeep(jsonOrder);
        rtnOrderInfo.userId = testdata.userId;
        rtnOrderInfo.userData = userData;

        let newAddress = Math.random().toString(36).substring(2, 5) // 36 carry bit, ignore '0.', get 8 char
        rtnOrderInfo.orderAddress = newAddress;
        
        //pick random ShopItems
        //let sumPrice = 0
        let listRandomProducts = _.cloneDeep(listProductInfo)
        listRandomProducts = listRandomProducts.pickArrayRandomElements(3)
        
        //console.log("LOG: ~ file: Connect1.test.js ~ line 276 ~ getNewOrderInfo ~ listRandomProducts", listRandomProducts)
        
        let listShopItems = listRandomProducts.map((item) => {
            
            let newShopItem = new ShopItemInfo()
            // custom object must not be class object,(if save firestore)
            //newShopItem = Object.assign({},newShopItem);
            //newShopItem._productInfo=null;
            newShopItem.productId = item.productId
            //newShopItem.productInfo = item; //setter productId + price
            newShopItem.amount = getRandom(1, 4)
            
            //sumPrice+=(newShopItem.amount * newShopItem.productInfo.price)
            
            return newShopItem
        })
        
        rtnOrderInfo.shopItemList = listShopItems;
        rtnOrderInfo.fillShopItems(listRandomProducts)
        rtnOrderInfo.shopItemList = rtnOrderInfo.shopItemList.map((item) => {
            item._productInfo = null;
            return item
        })
        //newJsonOrder.fillShopItems(listRandomProducts)
        //newJsonOrder.totalPrice = sumPrice
        //---------------
        //rtnOrderInfo = Object.assign(rtnOrderInfo, newJsonOrder)
        
        //count total price
        
        // rtnOrderInfo.shopItemList = rtnOrderInfo.shopItemList.map((item) => {
        //     item._productInfo=null;
        // })

        //console.log("LOG:: getNewOrderInfo -> rtnOrderInfo", rtnOrderInfo)
        
        //delete rtnOrderInfo.getShopItems_Id
        return rtnOrderInfo;
    }

    //待付款
    newOrderInfo = getNewOrderInfo();
    arrayOrderInfo.push(newOrderInfo)
    //待出貨
    newOrderInfo = getNewOrderInfo();
    arrayOrderInfo.push(newOrderInfo)
    newOrderInfo.orderStatus.isPaid = true

    //已完成
    newOrderInfo = getNewOrderInfo();
    arrayOrderInfo.push(newOrderInfo)
    newOrderInfo.orderStatus.isPaid = true
    newOrderInfo.orderStatus.isDelivery = true
    newOrderInfo.orderStatus.isCompleted = true
    //已取消
    newOrderInfo = getNewOrderInfo();
    arrayOrderInfo.push(newOrderInfo)
    newOrderInfo.orderStatus.isCanceled = true
    // orderStatus": {
    //     "isCanceled": false,
    //     "isDelivery": false,
    //     "isCompleted": false,
    //     "isPaid": false
    // },
    return arrayOrderInfo;
}