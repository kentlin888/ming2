let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(10);
    }, 3 * 100);
});

// p.then((result) => {
//     console.log(result);
//     return result * 2;
// }).then((result) => {
//     console.log(result);
//     return result * 3;
// })
// .then((e) => {
//     console.log(e)
// }
// );
p.then((e) => {
        console.log(e)
        return Promise.resolve(6)
        //return 9
    })
    .then((e) => {
        console.log(e)
    })

let uu = require('uuid')
let option = {

}

function padWithZeroes(n, width) {
    while (n.length < width) n = '0' + n;
    return n;
}
let aa = uu.v4();
let cc = aa.slice(0, 8)
console.log(cc)
let bb = 53
let dd = bb.toString();
console.log(dd.padStart(4, "0"))

let uuuu = Math.random().toString(36).substring(2, 10) //+ Math.random().toString(36).substring(2, 15);
console.log(uuuu)
