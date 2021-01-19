let adminKeyJsonPath = '../adminKeys/ming2-dad1d-firebase-adminsdk-5wmli-9c686eda26.json';
let adminKeyJson = require(adminKeyJsonPath)
let projectConfig = require('../src/projectConfig/firebaseProj.config.json')
let {
    databaseURL
} = projectConfig
let fs = require('fs')
let path = require('path')
let pathTestData = path.resolve(__dirname, '../adminData/testdata.json')
let testdata = require(pathTestData)

let admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(adminKeyJson),
    databaseURL: databaseURL
});
// let email_KT = 'ice4kimo@yahoo.com.tw';
// return admin.auth().getUserByEmail(email_KT)
//     .then(function (userRecord) {
//         let boolResult = false;
//         if (userRecord)
//             boolResult = true
//         chai.expect(boolResult).to.be.equal(true);
//         console.log("LOG: ~ file: Connect3.spec.js ~ line 36 ~ userRecord.emailVerified", userRecord.emailVerified)
//         return admin.auth().updateUser(userRecord.uid, {
//             emailVerified: true
//         })
//     })
//     .then(() => {
//         return admin.auth().getUserByEmail(email_KT)
//     })
//     .then(function (userRecord) {
//         userRecord.emailVerified
//         console.log("LOG: ~ file: Connect3.spec.js ~ line 42 ~ userRecord.emailVerified", userRecord.emailVerified)
//     })
function getUser(userEmail) {
    return admin.auth().getUserByEmail(userEmail)
        .then((user) => {
            if (user) {
                if (user.uid != testdata.userId) {
                    testdata.userId = user.uid
                    fs.writeFileSync(pathTestData, JSON.stringify(testdata, null, 4), 'utf8')
                }
            }
            return user
        })
        .catch((err) => {
            console.log(err.code, err.message)
            return null
        })
}

function getProductInfo() {
    let collectionName
    //collectionName = 'Products'
    collectionName = 'ProductInfo'
    //collectionName = "Users"
    //collectionName = "OrderInfo"
    // let admin = require('firebase-admin');
    // admin.initializeApp({
    //     credential: admin.credential.cert(adminKeyJson),
    //     databaseURL: "https://ming2-dad1d.firebaseio.com"
    // });
    let db = admin.firestore()
    let query = db.collection(collectionName);

    return query.get().then((querySnapshot) => {
        let listProductInfo = querySnapshot.docs.map((item) => {
            return item.data();
        })
        return listProductInfo
    })
}

function setUserEmailVerified(uid, isEmailVerified) {
    return admin.auth().updateUser(uid, {
        emailVerified: isEmailVerified
    })
}

function deleteUser(in_uid) {
    return admin.auth().deleteUser(in_uid)
}

function fStore_BatchDeleteUsers() {
    let collectionName
    //collectionName = 'Products'
    //collectionName = 'ProductInfo'
    collectionName = "Users"
    //collectionName = "OrderInfo"
    // let admin = require('firebase-admin');
    // admin.initializeApp({
    //     credential: admin.credential.cert(adminKeyJson),
    //     databaseURL: "https://ming2-dad1d.firebaseio.com"
    // });
    let db = admin.firestore()
    let query = db.collection(collectionName);

    return query.get().then((querySnapshot) => {
        //console.log("LOG:: querySnapshot", querySnapshot)
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
}

function fStore_GetUser(in_uid) {
    //return admin.auth().deleteUser(in_uid)
    let collectionName = "Users"
    let db = admin.firestore()
    let query = db.collection(collectionName).doc(in_uid);
    return query.get().then((querySnapshot) => {
        return querySnapshot.data()
        // if(querySnapshot.docs.length===0)
        //     return null
        // else
        //     return querySnapshot.docs[0].data()
    })
}

function fStore_GetUsers_byMail(email) {
    //return admin.auth().deleteUser(in_uid)
    let collectionName = "Users"
    let db = admin.firestore()
    let query = db.collection(collectionName).where("email", "==", email);
    return query.get().then((querySnapshot) => {
        return querySnapshot.docs.map((item) => {
            return item.data()
        })
        // if(querySnapshot.docs.length===0)
        //     return null
        // else
        //     return querySnapshot.docs[0].data()
    })
}

module.exports = {
    admin,
    getUser,
    getProductInfo,
    setUserEmailVerified,
    deleteUser,
    fStore_GetUser,
    fStore_GetUsers_byMail,
    fStore_BatchDeleteUsers,

}