function fetchA() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            // 模擬冗長運算
            resolve(6);
        }, 1000);
    });
}

function fetchB(cb) {
    return new Promise(function (resolve, reject) {
        resolve(2);
    });
}

function add(xPromise, yPromise) {
    // x 與 y 都取到了
    return Promise.all([xPromise, yPromise])
    .then(function (values) {
        console.log(values)
        return values[0] + values[1]; // 執行加法運算
    });
}

add(fetchA(), fetchB())
.then(function (sum) {
    console.log(sum); // 印出相加結果
});