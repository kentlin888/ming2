import {
    recursiveToPlainObject,
    getPlainObject,
    getMatches,
    getFunctionParameters,
    sleep,
    waitUntil,
} from '../lib/dataKits.js'
let _ = require('lodash')
let chai = require('chai')
const {assert} = chai

class AA {
    name = "John"
    age = 25
    get ageGET_A() {
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
    get addressGET_B() {
        return this.address + '___XXX'
    }
}

let func1 = function () {
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
    bb: {
        aa: {
            name: 'John',
            age: 25
        },
        address: 'XXXXX',
        obj1: {}
    },
    school: 'XSXSXS',
    obj2: {},
    arry1: [{
        yt: 5
    }, {
        name: 'John',
        age: 25
    }]
}

/**@type {import('mocha')} */
describe('dataKits.spec.js', () => {

    it('getPlainObject()', () => {
        let cc = new CC()
        cc = getPlainObject(cc)
        let isTheSame
        //case 1
        isTheSame = _.isEqual(cc, expectResult)
        assert(isTheSame === true)
        console.dir(cc)
        //recursiveToPlainObject(cc)
    })
    it('recursiveToPlainObject()', () => {
        let cc = new CC()
        recursiveToPlainObject(cc)

        let isTheSame
        //case 1
        isTheSame = _.isEqual(cc, expectResult)
        assert(isTheSame === false)
        //chai.assert(cc.arry1[0].func1 === undefined)
        assert(cc.bb.addressGET_B === undefined)
        assert(cc.bb.aa.ageGET_A === undefined)
        assert(cc.bb.aa.aFunc === undefined)
        //should remove arry1[0].func1
        let keys_arry1_0 = Object.keys(cc.arry1[0])
        let hasKey_func1 = keys_arry1_0.includes('func1')
        assert(hasKey_func1 === false)
        //case 2
        cc = Object.assign({}, cc)
        console.dir(cc)
        isTheSame = _.isEqual(cc, expectResult)
        assert(isTheSame === true)

    })

    it('getMatches()', () => {
        let content2 = "fs  af=1fdsf1 fd af=1hgfh1 dsf"
        let content = `fkjsadf  fksadf sadf s data-testid="ABC" dd="DD" data-testid="AC" `
        let reg = new RegExp("af=(?<name>.[^1]*[1$])", "g") //開頭與結尾
        reg = new RegExp("af=1(?<name>.[^1]*)1", "g")
        let mats = getMatches(content2, reg);
        console.log(mats)
        let expect = ['fdsf', 'hgfh']
        assert(_.isEqual(mats, expect))

        // reg = new RegExp("af=1(?<name>.[^1]*)1", "g")
        // let aa = reg.exec(content2)
        // console.log(aa)
        // aa = reg.exec(content2)
        // console.log(aa)
        // aa = reg.exec(content2)
        // console.log(aa)
    })

    it('getFunctionParameters()',() => {
        let _ = require('lodash')
        //----1 function XX(XX){}
        function f1(p1,p2) {
            console.log(p1,p2)
        }
        let matches = getFunctionParameters(f1)
        assert(_.isEqual(matches,['p1','p2']))
        //----2 XX = function XX(XX){}
        let a2 = function f2(p1,p2) {
            console.log(p1,p2)
        }
        matches = getFunctionParameters(a2)
        console.log('a2--->',a2.toString())
        assert(_.isEqual(matches,['p1','p2']))
        //----3 XX= arrow function
        let a3 = (p1,p2) => {
            console.log(p1,p2)
        }
        matches = getFunctionParameters(a3)
        console.log('a3--->',a3.toString())
        assert(_.isEqual(matches,['p1','p2']))

        //console.log("LOG: ~ file: dataKits.spec.js ~ line 127 ~ it ~ matches", matches)
        // displayLoginName.log=function cc(a1,a2) {
            
        // }
    })

    
    it('waitUntil()',async () => {
        function getResult() {
            let i = 0
            return function () {
                i++
                console.log('getlog----', i)
                if(i===6)
                    return 'done----'
                else
                    return null //not done
            }
        }
        let getResult2 = getResult();
        let a = await waitUntil(getResult2, 5000, 500)
        assert(a === 'done----')
        console.log('-------------')
        getResult2 = getResult();
        let b = await waitUntil(getResult2, 2000, 500)
        assert(b === null)
    })
})