const { rejects } = require("assert");

async function gogo() {
    let i = 0
    // let aa = new Promise((resolve, reject) => {
    //     setTimeout(() => {

    //         console.log('--->', i)
    //         resolve(i)
    //     }, 1000);
    // })
    function bb(){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
    
                console.log('--->', i)
                resolve(i)
            }, 1000);
        })
    }
    
    for (i = 0; i < 5; i++) {
        await bb()

    }



}
//gogo()
function bb(){
    return new Promise((resolve, reject) => {
        reject(2222)
        setTimeout(() => {
            //console.log('--->', i)
            resolve(1111)
        }, 1000);
    })
}
bb().then((data) => {
    console.log(data)
})
.catch((data) => {
    console.log(data)
})

// let mingRunPromise = (someone) => {
//     // let ran = parseInt(Math.random() * 2); // 隨機成功或失敗
//     // console.log(`${someone} 開始跑開始`);

//     return new Promise((resolve, reject) => {
//         // 傳入 resolve 與 reject，表示資料成功與失敗
//         if (ran) {
//             setTimeout(function () {
//                 // 3 秒時間後，透過 resolve 來表示完成
//                 resolve(`${someone} 跑 3 秒時間(fulfilled)`);
//             }, 3000);
//         } else {
//             // 回傳失敗
//             reject(new Error(`${someone} 跌倒失敗(rejected)`))
//         }
//     });
// }
// for (let i = 0; i < 10; i += 1) {
//     await xxx;
// }