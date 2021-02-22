var firebaseConfig = {
    apiKey: "AIzaSyD4H_AArvgvLf7HEmFBdHS6iUQcG3CTUOM",
    authDomain: "ming1-d8ff5.firebaseapp.com",
    databaseURL: "https://ming1-d8ff5.firebaseio.com",
    projectId: "ming1-d8ff5",
    storageBucket: "ming1-d8ff5.appspot.com",
    messagingSenderId: "504139528822",
    appId: "1:504139528822:web:078db71d75c01af93bfd57",
    measurementId: "G-ENYG95C00T"
};
let app = firebase.initializeApp(firebaseConfig);
firebase.analytics();

let db = firebase.firestore();
//console.log(db)

let root = document.querySelector('#root')
root.innerHTML = 'SDSD'

let btntransaction = document.querySelector('#btntransaction');
btntransaction.addEventListener('click', try3)

function try1() {
    //const documentReference = < Your Firestore doc ref > ;
    var documentReference = db.collection("cities").doc("SF");
    // running the transaction
    db.runTransaction(transaction => {
        // returning the transaction function
        return transaction.get(documentReference).then(async doc => {
            const newData = doc.data();
            
            const finalData = {
                capacity: newData.capacity + 1,
            };
            await transaction.update(documentReference, finalData)
            console.log('Firestore Data', doc.data());
            
        });
    })
    .then(res => console.log(res, 'Transaction completed!'))
    .catch((err) => {
        console.error('Transaction failed: ', err)
        //console.log(err)
    })
}

function try3(){
    //var collectionProducts = db.collection("Products");
    var autoNum_DocRef = db.collection("Products").doc("--AutoNum--");
    return db.runTransaction((transaction) => {
        return transaction.get(autoNum_DocRef)
            .then((autoNum_Doc) => {
                if (!autoNum_Doc.exists) {
                    throw "autoNum_DocDocument does not exist!";
                }
                //get autoNum data
                var autoNum_data = autoNum_Doc.data();
                var nowNum = autoNum_data.autoNum//serial number
                //add new doc
                let uuid = "fdafhref"
                let newDoc = db.collection("Products").doc(`${uuid}-${nowNum}`)

                transaction.update(autoNum_DocRef, {
                    autoNum: nowNum + 1
                })
                throw "Force stop!";
                transaction.set(newDoc, {name:"John",autoNum:nowNum})
                
                //var newPopulation = sfDoc.data().population + 1;
                
            })
    })
}

function try2() {
    // db.collection("cities").doc("SF").set({
    //     population:15
    // })

    // Create a reference to the SF doc.
    var sfDocRef = db.collection("cities").doc("SF");
    // Uncomment to initialize the doc.
    // sfDocRef.set({ population: 0 });

    return db.runTransaction(function (transaction) {
        // This code may get re-run multiple times if there are conflicts.
        return transaction.get(sfDocRef)
            .then(function (sfDoc) {
                if (!sfDoc.exists) {
                    throw "Document does not exist!";
                }

                // Add one person to the city population.
                // Note: this could be done without a transaction
                //       by updating the population using FieldValue.increment()
                var newPopulation = sfDoc.data().population + 1;
                transaction.update(sfDocRef, {
                    population: newPopulation
                })

                // let out = transaction.get(sfDocRef).data()
                // console.log(out)

                // .then((e) => {
                //     console.log(e)
                // })

            });
    }).then(function () {
        console.log("Transaction successfully committed!");
    }).catch(function (error) {
        console.log("Transaction failed: ", error);
    });
}