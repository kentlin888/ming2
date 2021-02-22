//var Immutable = require("seamless-immutable");
var Immutable = require("immutable");

// 原来的写法

let foo = {a: {b: 1}};

let bar = foo;

bar.a.b = 2;

console.log(foo.a.b); // 打印 2

console.log(foo === bar); // 打印 true

// 使用 immutable.js 后

foo = Immutable.fromJS({a: {b: 1}});

bar = foo.setIn(['a', 'b'], 2);  // 使用 setIn 赋值

console.log(foo.getIn(['a', 'b'])); // 使用 getIn 取值，打印 1

console.log(foo === bar); // 打印 false

// 使用 seamless-immutable.js 后

import SImmutable from 'seamless-immutable';

foo = SImmutable({a: {b: 1}})

bar = foo.merge({a: { b: 2}})  // 使用 merge 赋值

console.log(foo.a.b); // 像原生 Object 一样取值，打印 1

console.log(foo === bar); // 打印 false









let aa = Immutable([1,2,3,])//Immutable.from([1, 2, 3]); static
let bb = aa.setIn([1],66)

console.log(bb)

// var obj = {};

// obj.setIn(['key'], 55)

// console.log(obj)