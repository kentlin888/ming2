
describe('Connect2.test.js', () => {

    it('plain object vs class object', () => {
        class A {
            hh = 55
        }
        let G1 = new A()
        let PK = {
            yy: 888
        }
        show('class G1-->', G1)
        show('object PK-->', PK)

        function show(desc, variable1) {
            console.log(desc, 'constructor.toString()----', variable1.constructor.toString())
            let str = variable1.constructor.toString()
            console.log(desc, "constructor.toString().startsWith('class')----", str.startsWith('class'))
            console.log(desc, '[constructor]', variable1.constructor)
            console.log(desc, '[constructor.prototype]', variable1.constructor.prototype)
            console.log(desc, '[constructor.prototype.__proto__]', variable1.constructor.prototype.__proto__)
            console.log(variable1.constructor.prototype instanceof Object) //class == true,plain object == false
            //console.log(desc,variable1.constructor.prototype.constructor)
            // console.log(desc)
            // console.log(variable1.constructor.prototype.__proto__)


            // //console.log(desc,variable1.prototype)
            // //console.log(typeof desc,variable1.constructor)

            // console.log(desc,'[constructor.prototype.__proto__]',variable1.constructor.prototype.__proto__)
            // let t1 = variable1.constructor.prototype
            // console.log('getPrototypeOf --- > ')
            // console.log(Object.getPrototypeOf(t1))
            // //console.log(object1.prototype.isPrototypeOf(new Object({})))

        }
    })
    
    it('lodash.cloneDeepWith', () => {
        let _ = require('lodash')
        class AA {
            name = "John"
            age = 25
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
        }
        let cc = new CC()
        let result = _.cloneDeepWith(cc, iteratee) //iteratee  customizer
        // result = _.cloneDeepWith(cc, function (val) {
        //     if (customizer instanceof Function) {
        //         let resolved = customizer(val);
        //         if (resolved !== undefined) {
        //             return resolved;
        //         }
        //     }
        //     if (val instanceof Instance) return val;
        // })


        // // result.bb = Object.assign({},result.bb)
        // // console.log(result.bb.constructor)
        // console.log(result.bb.aa.constructor)
        console.log(JSON.stringify(result, null, 4))
        console.log(result.bb.aa.constructor)
        console.log(result.bb.constructor)
        console.log(result.constructor)

        function customizer(value, key, object, stack) {
            if (object === undefined)
                return object
            if (key === 'bb') {
                console.log('bb----', object)
                let rtn = _.clone(value)
                return Object.assign({}, rtn)
            }
            if (key === 'aa') {
                console.log('aa----', object)
                let rtn = _.clone(value)
                return Object.assign({}, rtn)
            }
            console.log(value)

            // let newObj = _.cloneDeep(value)
            // object = Object.assign({},value)

            // if (value && value.constructor) {
            //     //(value.constructor.prototype instanceof Object)
            //     //console.log('----------sss----',value.constructor)
            //     let str = value.constructor.toString()
            //     if (str.startsWith('class')) {
            //         console.log('key----',key)
            //         //let rtn = _.clone(value)
            //         //object = Object.assign({}, rtn)
            //         return object

            //         // let newObj = _.cloneDeep(value)
            //         // //object = Object.assign({},value)
            //         // object = Object.assign({},newObj)
            //         // return object
            //         // //return Object.assign({},object)
            //     }
            // }

            //return _.clone(value);
            //return Object.assign({},value)
            //return value

        }
        //value，key，object，stack
        function iteratee(val) {
            // Base case
            if (!val || (typeof val !== 'object' && !Array.isArray(val))) {
                return
            }

            // Recursively apply iteratee 
            _.forEach(val, iteratee)

            // Perform check
            if (val.hasOwnProperty('test')) {
                Object.assign(val, {
                    ...myCustomProps
                })
            }
            if (val.constructor.prototype instanceof Object) {
                return Object.assign({}, val)
            }
        }

    })
    it('timezone offset', () => {
        let today = new Date()
        console.log("LOG: ~ file: Connect1.test.js ~ line 72 ~ it ~ today", today)
        let predate = new Date('2020/10/11')
        console.log("LOG: ~ file: Connect1.test.js ~ line 73 ~ it ~ predate", predate)
        var offset = today.getTimezoneOffset();
        console.log("LOG: ~ file: Connect1.test.js ~ line 76 ~ it ~ offset", offset)
        let currentTimeZoneOffsetInHours = offset / 60;
        console.log("LOG: ~ file: Connect1.test.js ~ line 78 ~ it ~ currentTimeZoneOffsetInHours", currentTimeZoneOffsetInHours)
        let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        console.log("LOG: ~ file: Connect1.test.js ~ line 80 ~ it ~ timezone", timezone)
        var usedOptions = Intl.DateTimeFormat().resolvedOptions();
        console.log("LOG: ~ file: Connect1.test.js ~ line 84 ~ it ~ usedOptions", usedOptions)
        // var hrs = offsetTime_OK.getUTCHours();
        // console.log("LOG: ~ file: Connect1.test.js ~ line 87 ~ it ~ hrs", hrs)

        // ok
        let localHours = today.getHours();
        console.log('localHours-->', localHours)

        // sometimes you want to be more precise
        let options = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: timezone, //'Asia/Taipei', //'Australia/Sydney',
            timeZoneName: 'short'
        };
        let localeString = new Intl.DateTimeFormat('en-US', options).format(today)
        console.log("LOG: ~ file: Connect1.test.js ~ line 99 ~ it ~ localeString", localeString)

        let nn = new Date()
        console.log(nn.toLocaleDateString())
        const d = new Date('2010-08-05')
        const ye = new Intl.DateTimeFormat('en', {
            year: 'numeric'
        }).format(d)
        const mo = new Intl.DateTimeFormat('en', {
            month: '2-digit'
        }).format(d)
        const da = new Intl.DateTimeFormat('en', {
            day: '2-digit'
        }).format(d)

        console.log(`rrrr-->${da}-${mo}-${ye}`)

        options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }
        console.log(nn.toLocaleDateString('en-US', options));

        console.log(new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        }).format(nn))

    })
})