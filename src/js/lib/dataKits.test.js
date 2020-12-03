import {recursiveToPlainObject} from '../lib/dataKits.js'
describe('dataKits.js', () => {
    
    it('recursiveToPlainObject()',() => {
        class AA {
            name = "John"
            age = 25
            aFunc = function () {
                let ii = 55
            }
        }
        class BB {
            aa = new AA()
            address = 'XXXXX'
            obj1 = {}
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
        let cc = new CC()
        recursiveToPlainObject(cc)
        let expectResult = {
            bb: { aa: { name: 'John', age: 25 }, address: 'XXXXX', obj1: {} },
            school: 'XSXSXS',
            obj2: {},
            arry1: [ { yt: 5 }, { name: 'John', age: 25 } ]
        }
        let _ = require('lodash')
        let chai = require('chai')
                
        let isTheSame
        //case 1
        isTheSame = _.isEqual(cc, expectResult)
        chai.assert(isTheSame === false)
        //case 2
        cc = Object.assign({},cc)
        console.dir(cc)
        isTheSame = _.isEqual(cc, expectResult)
        chai.assert(isTheSame === true)
        
    })
})