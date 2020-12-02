/**@typedef {object} EnumObj 
 * @prop {number} value
 * @prop {string} desc
 */
import {
    ProductInfo,
    OrderInfo,
    ENUM_ProductCategory,
    Map_ProductCategory,
} from "../dataDefine/index.js";

/**@enum {string} */
export const MIME_TYPE = {
    jpg: 'image/jpeg',
    png: 'image/png',
}
/**@enum {string} */
export const FIRESTORE_COLLECTION = {
    //Products: "Products",
    ProductInfo: "ProductInfo",
    Users: "Users",
    OrderInfo: "OrderInfo"
}
/**@enum {string} */
export const FIRESTORAGE_FOLDERS = {
    Products: "Products"
}
/**@enum {string} */
export const ENUM_orderStatus = {
    all: 'all',
    completed: 'completed',
    waitForPay: 'waitForPay',
    waitForDelivery: 'waitForDelivery',
    canceled: 'canceled',
}


/**
 * @module
 * @class 
 * @description Firebase class
 */
export default class FirebaseMJS {
    /**
     * @param {firebase} firebase - from firebase
     */
    constructor(firebase) {
        this._firebase = firebase;
        /**
         * initial-- use this.initStorageRef()
         * @type {object} - this._firebase.storage().ref()
         */
        this._storageRef = null;
        /**
         * initial-- use this.initDb()
         * @type {object} - this._firebase.firestore()
         */
        this._db = null;
    }
    /**@description initial this._firebase.storage().ref() */
    initStorage = () => {
        if (this._storageRef == null)
            // Create a root reference
            this._storageRef = this._firebase.storage().ref();
    }
    /**@description initial this._firebase.firestore()*/
    initDB = () => {
        if (this._db == null)
            this._db = this._firebase.firestore();
    }
    /**
     * @param {string} name 
     * @param {number} price
     * @param {ENUM_ProductCategory} category - beef/chicken/soybean...etc
     * @param {{beginEvent:function, endEvent:function}} [options] - callback functions
     */
    addProductInfo(name, price, category, imgUrl, options) {
        this.initDB();
        let self = this
        let newAutoNum1 = {
            docid: "--AutoNum--",
            autoNum: 0,
            updateDateTime: self._firebase.firestore.FieldValue.serverTimestamp()
        }
        let autoNum_DocRef = self._db.collection(FIRESTORE_COLLECTION.ProductInfo).doc("--AutoNum--");

        return self._db.runTransaction(async (transaction) => {
            let thisData = {
                autoNum_Doc: undefined
            }
            // get autoNum_Doc
            await transaction.get(autoNum_DocRef)
                .then((autoNum_Doc) => {
                    thisData.autoNum_Doc = autoNum_Doc
                })
            //------ if --AutoNum-- not exist, create new one
            // must be a function, or checkAutoNumExist() will be executed twice
            async function checkAutoNumExist() {
                if (thisData.autoNum_Doc.exists === false)
                    await autoNum_DocRef.set(newAutoNum1, {
                        merge: true
                    })
            }
            await checkAutoNumExist();
            //------
            let nowNum
            if (thisData.autoNum_Doc.exists === false)
                nowNum = newAutoNum1.autoNum
            else {
                nowNum = thisData.autoNum_Doc.data().autoNum
            }

            if (thisData.autoNum_Doc.exists === false)
                await transaction.get(autoNum_DocRef)

            // get new number and uuid
            let newNumber = ++nowNum
            transaction.update(autoNum_DocRef, {
                autoNum: newNumber,
                updateDateTime: self._firebase.firestore.FieldValue.serverTimestamp(),
            })
            // set new ProductInfo
            let newProdId = Math.random().toString(36).substring(2, 5) // 36 carry bit, ignore '0.', get 8 char
            let sNewNumber = newNumber.toString().padStart(4, "0")
            newProdId = `${sNewNumber}-${newProdId}`
            //let newProdId = `${sNowNum}-${getRandomId(3)}`
            //let newDoc = this._self._db.collection(FIRESTORE_COLLECTION.Products).doc(uuid)
            let newDocRef = self._db.collection(FIRESTORE_COLLECTION.ProductInfo).doc(newProdId)
            // let prodInfo = {
            //     name: "John",
            //     autoNum: newNumber
            // }
            /**@type {import('../dataDefine/index.js').ProductInfo} */
            let prodInfo = new ProductInfo();
            prodInfo.productId = newProdId // 0001-tds
            prodInfo.name = name //"白斬雞"
            prodInfo.price = price //140
            prodInfo.addDateTime = self._firebase.firestore.FieldValue.serverTimestamp()
            prodInfo.category = category
            if (imgUrl)
                prodInfo.imgUrl = imgUrl
            //prodInfo.tag = "#"
            //prodInfo.imgUrl = 'null'
            //prodInfo.imgFileName = 'null'
            prodInfo.autoNum = newNumber
            // convert to plain object
            prodInfo = Object.assign({}, prodInfo)
            removeFuncProp(prodInfo)
            transaction.set(newDocRef, prodInfo)
            return newDocRef
        })

    }
    getProductInfo = () => {
        this.initDB();

        // if(userId)
        //     fakeUid = userId
        let rtnProductInfo_list = []
        let self = this
        return this._db.collection(FIRESTORE_COLLECTION.ProductInfo).get()
            .then((snapshot) => {
                snapshot.forEach(element => {
                    let data = element.data()
                    if (data.hasOwnProperty('--AutoNum--'))
                        return true

                    let prodInfo = new ProductInfo();
                    prodInfo = Object.assign(prodInfo, data);
                    //prodInfo.createDateTime = (prodInfo.createDateTime == null) ? null : prodInfo.createDateTime.toDate()
                    rtnProductInfo_list.push(prodInfo)
                });

                rtnProductInfo_list.sort((a, b) => {
                    return b.autoNum - a.autoNum
                })
                return rtnProductInfo_list;
            })
    }
    /**
     * add OrderInfo to firestore.OrderInfo
     * @param  {import("../dataDefine/index.js").OrderInfo} orderInfo
     * @param  {{beginEvent: function, endEvent: function}} [options] - callback functions
     */
    addOrderInfo(orderInfo) {
        this.initDB();
        //clear function props
        let order = Object.assign({}, orderInfo);
        if (order.userData) {
            order.userData = Object.assign({}, orderInfo.userData);
            if (order.userData.userProfile)
                order.userData.userProfile = Object.assign({}, orderInfo.userData.userProfile);
        }

        order.createDateTime = this._firebase.firestore.FieldValue.serverTimestamp();
        removeFuncProp(order); //remove getShopItems_Id
        if (order.userData) {
            removeFuncProp(order.userData);
            if (order.userData.userProfile)
                removeFuncProp(order.userData.userProfile);
        }

        let autoNum_DocRef = this._db.collection(FIRESTORE_COLLECTION.OrderInfo).doc("--AutoNum--");

        /** identify the AutoNum is generated by self, not from other user.*/
        let orderIdentityToken = Math.random().toString(36).substring(2, 7) // 36 carry bit, ignore '0.', get 8 char
        let overrideAutoNum = {
            docid: "--AutoNum--",
            autoNum: this._firebase.firestore.FieldValue.increment(1),
            updateDateTime: this._firebase.firestore.FieldValue.serverTimestamp(),
            orderIdentityToken: orderIdentityToken,
            // lastId:'',
            // lastTime:firebase.firestore.FieldValue.serverTimestamp(),
        }


        // (node:15072) UnhandledPromiseRejectionWarning: FirebaseError: 
        // Firestore transactions require all reads to be executed before all writes.
        //autoNumData.updateDateTime always exist in db, update first.
        let self = this
        return autoNum_DocRef.set(overrideAutoNum, {
                merge: true
            })
            .then(() => {
                return self._db.runTransaction(async (transaction) => {
                    let thisData = {
                        autoNum_Doc: undefined
                    }
                    // get autoNum_Doc
                    await transaction.get(autoNum_DocRef)
                        .then((autoNum_Doc) => {
                            thisData.autoNum_Doc = autoNum_Doc
                            //return autoNum_DocRef
                        })

                    let autoNumData = thisData.autoNum_Doc.data()
                    if (autoNumData.orderIdentityToken !== orderIdentityToken)
                        throw new Error('addOrderInfo collision occurs with other user (different orderIdentityToken).')

                    let autoNewNumber = autoNumData.autoNum //updated from beginning.

                    let nowToday = autoNumData.updateDateTime; //updated from beginning                
                    nowToday = getDate_From_Firestore_TimeStamp(nowToday) //convert format to js Date

                    let preDayTime
                    if (autoNumData.lastTime)
                        preDayTime = autoNumData.lastTime
                    else
                        preDayTime = autoNumData.updateDateTime; //updated from beginning
                    preDayTime = getDate_From_Firestore_TimeStamp(preDayTime) //convert format to js Date

                    let newOrderId_obj = FirebaseMJS.getNewOrderInfoId(preDayTime, nowToday, autoNewNumber)

                    //update lastId + lastTime
                    transaction.update(autoNum_DocRef, {
                        autoNum: newOrderId_obj.autoNum,
                        lastId: newOrderId_obj.lastId,
                        lastTime: nowToday //newOrderId_obj.lastTime
                    })

                    let newDocRef = self._db.collection(FIRESTORE_COLLECTION.OrderInfo).doc(newOrderId_obj.lastId)
                    order.orderId = newOrderId_obj.lastId;
                    transaction.set(newDocRef, order)
                    return newDocRef
                })

            })


    }

    /**
     * 
     * @param {string} userId 
     * @param {ENUM_orderStatus} orderStatus 
     * @returns {Promise<OrderInfo[]>}
     */
    getOrderInfo = (userId, orderStatus) => {
        this.initDB();

        // if(userId)
        //     fakeUid = userId
        let rtnOrderInfo_list = []
        let list_productId = []
        let self = this

        /**@param {ENUM_orderStatus} inOrderStatus */
        function getQuery(inOrderStatus) {
            switch (inOrderStatus) {
                case ENUM_orderStatus.all:
                    return self._db.collection(FIRESTORE_COLLECTION.OrderInfo).where('userId', '==', userId)
                case ENUM_orderStatus.completed:
                    return self._db.collection(FIRESTORE_COLLECTION.OrderInfo).where('userId', '==', userId).where('orderStatus.isCompleted', '==', true)
                case ENUM_orderStatus.waitForPay:
                    return self._db.collection(FIRESTORE_COLLECTION.OrderInfo).where('userId', '==', userId).where('orderStatus.isPaid', '==', false).where('orderStatus.isCanceled', '==', false)
                case ENUM_orderStatus.waitForDelivery:
                    return self._db.collection(FIRESTORE_COLLECTION.OrderInfo).where('userId', '==', userId).where('orderStatus.isPaid', '==', true).where('orderStatus.isDelivery', '==', false)
                case ENUM_orderStatus.canceled:
                    return self._db.collection(FIRESTORE_COLLECTION.OrderInfo).where('userId', '==', userId).where('orderStatus.isCanceled', '==', true)
                default:
                    break;
            }
        }
        //return this._db.collection(FIRESTORE_COLLECTION.OrderInfo).where('userId', '==', userId).where('orderStatus.isPaid', '==', true).get()
        return getQuery(orderStatus).get() //.orderBy("createDateTime","desc").get()
            .then((snapshot) => {
                snapshot.forEach(element => {
                    //let data = snapshot.docs[0].data()
                    let orderInfo = new OrderInfo();
                    orderInfo = Object.assign(orderInfo, element.data());
                    orderInfo.createDateTime = (orderInfo.createDateTime == null) ? null : orderInfo.createDateTime.toDate()
                    //orderInfo.createDateTime = 
                    //console.log(orderInfo)
                    rtnOrderInfo_list.push(orderInfo)
                    let arr = orderInfo.getShopItems_Id()
                    list_productId.push(...arr);
                });
                //list_productId.push('AAA','AAA');
                //distinct
                list_productId = [...new Set(list_productId)]
                rtnOrderInfo_list.sort((a, b) => {
                    return b.createDateTime - a.createDateTime
                })
                //console.log(list_productId)
                //console.log(rtnOrderInfo_list)
                return [rtnOrderInfo_list, list_productId]
                // let data = snapshot.docs[0].data()
                // let orderInfo = new OrderInfo();
                // orderInfo = Object.assign(orderInfo, data);
                // orderInfo.createDateTime = data.createDateTime.toDate()
                // console.log(orderInfo)


                // let temp = new Date(data.createDateTime)
                // console.log(data.createDateTime.toDate())
            })
            .then((array) => {
                let [orderInfo_list, list_productId] = array

                //------- group list_productId limit -- 10
                function getGroupedArray_ByTimes(TargetArray, eachGroupCount) {
                    let rtnGroupedArray = []
                    // loop times
                    let doTimes = Math.ceil(TargetArray.length / eachGroupCount) //4
                    for (let i = 0; i < doTimes; i++) {
                        let newGroup = TargetArray.splice(0, eachGroupCount)
                        rtnGroupedArray.push(newGroup)
                    }
                    return rtnGroupedArray
                }
                /**@type {Array} */
                let listGroupProductId = getGroupedArray_ByTimes(list_productId, 10)
                // get firestore - Products in Id
                let newPromise = (list_Limit_10_ProductIds) => {
                    return self._db.collection(FIRESTORE_COLLECTION.ProductInfo)
                        .where(self._firebase.firestore.FieldPath.documentId(), 'in', list_Limit_10_ProductIds) //['02d2bss3-0012','1c718och-0001'])
                        .get()
                }
                // console.log(newPromise)
                let PromistArray = []
                //console.log(listGroupProductId[0])
                PromistArray.push(orderInfo_list)
                //PromistArray.push(list_productId)
                listGroupProductId.forEach((item) => {
                    PromistArray.push(newPromise(item)) //listGroupProductId[0]))    
                })
                //PromistArray.push(newPromise(listGroupProductId[0]))
                // PromistArray.push(newPromise(listGroupProductId[1]))
                // for(let i=0;i<listGroupProductId.length;i++){
                //     let list_Limit_10_ProductIds = listGroupProductId[i]
                //     PromistArray.push(newPromise(list_Limit_10_ProductIds))
                // }
                return Promise.all(PromistArray) //[orderInfo_list, list_productId, newPromise()])
            })
            .then((array) => {

                let orderInfo_list = array.shift() // pop [0]
                //let list_productId = array.splice(0, 1)
                //let [orderInfo_list, list_productId, snapshot] = array
                let arraySnapshot = array
                let rtnOrderInfo_list = orderInfo_list
                /**
                 * @type {ProductInfo[]} - distinct productInfo list
                 */
                let arrayDistinctProducts = []
                //collect distinct productInfo array
                //arraySnapshot = arraySnapshot.flat(1)
                let arrayDocs = []
                arraySnapshot.forEach(snapshot => {
                    arrayDocs = arrayDocs.concat(snapshot.docs)
                });
                //arraySnapshot[0].docs, arraySnapshot[1].docs
                //arrayDocs = arrayDocs.flat(1)
                arrayDocs.forEach(element => {
                    /**@type {ProductInfo} */
                    let productInfo = element.data()
                    productInfo = Object.assign(new ProductInfo(), productInfo)
                    arrayDistinctProducts.push(productInfo)
                    //console.log(productInfo)
                });
                //fill ShopItems - _productInfo

                //console.log('-----',rtnOrderInfo_list)
                //rtnOrderInfo_list = rtnOrderInfo_list.flat(1)
                rtnOrderInfo_list.forEach(eachOrderInfo => {
                    //console.log('---------',eachOrderInfo[0])
                    eachOrderInfo.fillShopItems(arrayDistinctProducts)
                    //console.log(element.orderId)
                });
                /**@type {OrderInfo[]} */
                return rtnOrderInfo_list

            })

    }
    /**
     * @function
     * @return {Promise<object>} - firestore.Users.data()
     */
    getUser = () => {
        if (!this._firebase.auth()) {
            throw new Error('this._firebase.auth() is --->' + this._firebase.auth())
        }
        if (this._firebase.auth()) {
            /**@ignore */
            let pp = this._firebase.auth()
            if (pp)
                pp.currentUser.uid
        }
        let uid = this._firebase.auth().currentUser.uid

        this.initDB();
        return this._db.collection(FIRESTORE_COLLECTION.Users).doc(uid).get()
            .then((doc) => {
                return doc.data()
            })
        // .then((query) => {
        //     console.log(query.docs)
        // }
        // )

    }
    /**
     * @param {import('lodash')} _ 
     * @param {ProductInfo[]} listProductInfo 
     */
    static getProductInfo_GroupedItems_ByCategory(_, listProductInfo) {
        let groupedData = _(listProductInfo).groupBy('category').map((arrayGroupedItems, category) => {
            // return ''
            // Object.
            return {
                category,
                categoryZhTW: Map_ProductCategory[category],
                arrayGroupedItems
            }
            // return {
            //     category,
            //     name: _.map(arrayGroupedItems, 'name')
            // }
        }).value()
        //console.log(d2)
        return groupedData
    }
    /**
     * get new OrderInfo ID , check whether cross date or not.
     * @param {Date} preDayTime 
     * @param {Date} nowTime 
     * @param {number} autoNewNumber 
     */
    static getNewOrderInfoId(preDayTime, nowTime, autoNewNumber) {
        let sPreDayTime_8 = getDateString_correctTimeZone(preDayTime, 1)
        let sNowToday_8 = getDateString_correctTimeZone(nowTime, 1)
        let orderNumber
        let isCrossDate //today is the same date with preDayTime
        let newResult = {
            lastId: '',
            lastTime: new Date(),
            isCrossDate: false, //today is the same date with preDayTime
        }
        if (sPreDayTime_8 === sNowToday_8) {
            //today is the same date with preDayTime
            isCrossDate = false;
            orderNumber = autoNewNumber
        } else {
            //today is different date with preDayTime
            isCrossDate = true;
            orderNumber = 1
        }
        /**
         * @param {string} sDate 
         * @param {number} newAutoNum 
         */
        let getNewID = (sDate, newAutoNum) => {
            return `${sDate}${String(newAutoNum).padStart(4, '0')}`
        }
        //sNowToday_8 == correct locale timezone time
        let lastId = getNewID(sNowToday_8, orderNumber)
        newResult = {
            autoNum: orderNumber,
            lastId: lastId,
            lastTime: nowTime,
            isCrossDate: isCrossDate, //today is the same date with preDayTime
        }
        return newResult
    }
}

/**
 * get 8 char string from date
 * @param {Date} inDate
 * @param {(1|2)} formatNo
 */
function getDateString_correctTimeZone(inDate, formatNo) {
    // correct timezone time -> inDate.getXXXX()
    let yy = inDate.getFullYear();
    let mm = inDate.getMonth() + 1;
    let dd = inDate.getDate();
    let MM = String(mm).padStart(2, '0')
    let DD = String(dd).padStart(2, '0')
    switch (formatNo) {
        case 1:
            return `${yy}${MM}${DD}`;
        default:
            return ''
    }
}

function getDate_From_Firestore_TimeStamp(timestamp) {
    let seconds = null
    if (timestamp.seconds)
        seconds = timestamp.seconds
    else if (timestamp._seconds) {
        seconds = timestamp._seconds
    }
    if (seconds === null)
        return null
    else
        return new Date(seconds * 1000)
}

function removeFuncProp(obj) {
    for (let propName in obj) {
        if (typeof obj[propName] === 'function')
            delete obj[propName]
        //if(${typeof arry1[0][keyName]} == )
    }
}

export function Email_ResendPassword(emailAddress, inFirebase, swal, funcCloseModal) {
    var auth = inFirebase.auth();
    //var emailAddress = this.proxyUI.bindIptResentPwdEmail;
    return auth.sendPasswordResetEmail(emailAddress).then(function () {
        // Email sent.
        swal.fire({
                title: '提醒',
                text: '密碼已寄出，請至信箱收信',
                icon: 'success',
            })
            .then(() => {
                //self.showModal(false)
                if (funcCloseModal)
                    funcCloseModal();
            })

    }).catch(function (error) {
        // An error happened.
        let errCode_ZhTW;
        console.log(error.code)
        switch (error.code) {
            case 'auth/invalid-email':
                errCode_ZhTW = '輸入錯誤'
                break;
            case 'auth/user-not-found':
                errCode_ZhTW = '此Email帳號不存在'
                break;
            default:
                errCode_ZhTW = error.code
                break;
        }
        swal.fire({
            title: 'Error',
            text: `${errCode_ZhTW},${error.message}`,
            icon: 'error',
            //confirmButtonText: 'Cool'
        })
    });


    //this.showModal(false)
}