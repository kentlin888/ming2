let obj2 = {
    aa: 5,
    bb: 6
}

let pp = Object.assign({},"dfs");

let name = "John"
obj2[name]=5
console.log(obj2)

let obj={}
obj[name]=5
console.log(obj)

let obj3 = Object.defineProperty({},'name',{value:55})
console.log(obj3)

var target = Object.defineProperty({}, 'foo', {
    value: 1,
    writable: false
  }); // target.foo 是 read-only (唯讀)屬性
  console.log(target)