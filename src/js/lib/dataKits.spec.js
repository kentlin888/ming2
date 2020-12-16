import {recursiveToPlainObject, getPlainObject} from '../lib/dataKits.js'
let _ = require('lodash')
let chai = require('chai')


class AA {
    name = "John"
    age = 25
    get ageGET_A(){
        return this.age + 12
    }
    aFunc = function () {
        let ii = 55
    }
}
class BB {
    aa = new AA()
    address = 'XXXXX'
    obj1 = {}
    get addressGET_B(){
        return this.address + '___XXX'
    }
}

let func1= function () {
    let ccd = 2
}
class CC {
    bb = new BB()
    school = "XSXSXS"
    obj2 = {}
    arry1 = [{
            yt: 5,
            func1: function () {
                let ccd = 2
            }
        },
        new AA(),
        //function func3(){}
    ]
}
let expectResult = {
    bb: { aa: { name: 'John', age: 25 }, address: 'XXXXX', obj1: {} },
    school: 'XSXSXS',
    obj2: {},
    arry1: [ { yt: 5 }, { name: 'John', age: 25 } ]
}

/**@type {import('mocha')} */
describe('dataKits.spec.js', () => {
    
    it('getPlainObject()',() => {
        let cc = new CC()
        cc = getPlainObject(cc)
        let isTheSame
        //case 1
        isTheSame = _.isEqual(cc, expectResult)
        chai.assert(isTheSame === true)
        console.dir(cc)
        //recursiveToPlainObject(cc)
    })
    it('recursiveToPlainObject()',() => {
        let cc = new CC()
        recursiveToPlainObject(cc)
        
        let isTheSame
        //case 1
        isTheSame = _.isEqual(cc, expectResult)
        chai.assert(isTheSame === false)
        //chai.assert(cc.arry1[0].func1 === undefined)
        chai.assert(cc.bb.addressGET_B === undefined)
        chai.assert(cc.bb.aa.ageGET_A === undefined)
        chai.assert(cc.bb.aa.aFunc === undefined)
        //should remove arry1[0].func1
        let keys_arry1_0 = Object.keys(cc.arry1[0])
        let hasKey_func1 = keys_arry1_0.includes('func1')
        chai.assert(hasKey_func1 === false)
        //case 2
        cc = Object.assign({},cc)
        console.dir(cc)
        isTheSame = _.isEqual(cc, expectResult)
        chai.assert(isTheSame === true)
        
    })
})