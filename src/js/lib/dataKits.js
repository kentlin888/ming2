var TYPE = {
    number: Symbol('數字'),
    string: Symbol('文字'),
    boolean: Symbol('真假'),
    object: Symbol('純物件'),
    array: Symbol('陣列'),
    undefined: Symbol('未定義'),
    null: Symbol('空值'),
    function: Symbol('函數'),
    NaN: Symbol('空數字'),
    symbol: Symbol('標識符'),
    error: Symbol('未找到type定義')
}


export const ENUM_TypeOf = {
    array:'array',
    null:'null',
    objectClass:'objectClass',
    objectPlain:'objectPlain',
    RegExp:'RegExp',
    Date:'Date',
    numberNaN:'numberNaN',
    function:'function',
    number:'number',// defaltTypes/others
}
export function TypeOf(in_Object) {
    if (typeof in_Object === 'object') {
        //[object Object]
        //[object Array]
        if (Array.isArray(in_Object)) {
            return ENUM_TypeOf.array
        } else if (in_Object === null) {
            return ENUM_TypeOf.null
        } else if (Object.prototype.toString.call(in_Object) === '[object Object]') {
            //(variable1.constructor.prototype instanceof Object)//class == true, object == false
            let objectType=(in_Object.constructor.prototype instanceof Object)
                ?ENUM_TypeOf.objectClass
                :ENUM_TypeOf.objectPlain;
            return objectType;
            //return 'object';
        } else if (Object.prototype.toString.call(in_Object) === '[object RegExp]') {
            return ENUM_TypeOf.RegExp;
        } else if (Object.prototype.toString.call(in_Object) === '[object Date]') {
            return ENUM_TypeOf.Date;
        } else return Object.prototype.toString.call(in_Object); //'not find type of object';
    } else if (typeof in_Object === 'number') {
        if (isNaN(in_Object)) {
            return ENUM_TypeOf.numberNaN
        } else
            return ENUM_TypeOf.number
    } else if(typeof in_Object === 'function'){
        return ENUM_TypeOf.function
    } else
        return typeof in_Object;
}

function CheckVarExist(in_Object) {
    if (typeof in_Object === 'undefined')
        return false;
    else if (typeof in_Object === typeof undefined)
        return false;
    else
        return true;
    //window.hasOwnProperty
    // if (in_Object)..................
    // 1.undefined: if the value is not defined and it's undefined
    // 2.null: if it's null, for example, if a DOM element not exists...
    // 3.empty string: ''
    // 4.0: number zero
    // 5.NaN: not a number
    // 6.false
    //看下圖
    //2020-01-11-14-11-32.png
}
function isDate(value) {
    switch (typeof value) {
        case 'number':
            return true;
        case 'string':
            return !isNaN(Date.parse(value));
        case 'object':
            if (value instanceof Date) {
                return !isNaN(value.getTime());
            }
        default:
            return false;
    }
}
// export {
//     TypeOf
// }

//------------------------------
// document.addEventListener('scroll', (params) => {
//     // console.log(1)
//     //isScrolledIntoView(elDiv)
//     let result = isScrolledIntoView(elDiv)
//     console.log(result)
// })

function isScrolledIntoView(el) {
    //https://stackoverflow.com/questions/21561480/trigger-event-when-user-scroll-to-specific-element-with-jquery
    //https://stackoverflow.com/questions/487073/how-to-check-if-element-is-visible-after-scrolling
    // check for 75% visible
    var percentVisible = 0.75;
    var elemTop = el.getBoundingClientRect().top;

    var elemBottom = el.getBoundingClientRect().bottom;
    var elemHeight = el.getBoundingClientRect().height;
    var overhang = elemHeight * (1 - percentVisible);

    var isVisible = (elemTop >= -overhang) && (elemBottom <= window.innerHeight + overhang);
    return isVisible;
}

function getDateTimeFormat() {
    let nn = new Date()
    console.log(nn.toLocaleDateString())

    // const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(nn)
    // console.log(ye)

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

    console.log(`${da}-${mo}-${ye}`)

    let options = {
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
}

function converter_objectPlain(propValue){
    //let value = target[prop];
    if(TypeOf(propValue) == ENUM_TypeOf.objectClass)
        propValue = Object.assign({},propValue)
}
function objectMapValue(objValue){
    return Object.assign({},objValue)
}

/**
 * 
 * @param {object} rootNode 
 * @returns {object} - type is objectPlain
 */
export function getPlainObject(rootNode) {
    recursiveToPlainObject(rootNode)//process all children
    //process rootNode then return
    if(TypeOf(rootNode)==ENUM_TypeOf.objectClass)
        rootNode = Object.assign({}, rootNode)
    return rootNode //plain object
}
export function recursiveToPlainObject(leafNode) {
    //search object props
    //let keys = Object.getOwnPropertyNames(leafNode)// leafNode prop names [Array]
    for (let keyName in leafNode) {
        let value = leafNode[keyName]
        if (TypeOf(value) == ENUM_TypeOf.objectClass ||
            TypeOf(value) == ENUM_TypeOf.objectPlain) {
                recursiveToPlainObject(value)
            //if(converter) converter(leafNode[keyName]);
            if(TypeOf(value) == ENUM_TypeOf.objectClass)
                leafNode[keyName] = objectMapValue(value)//Object.assign({},value)
        } else if (TypeOf(value) == ENUM_TypeOf.array) {

            for(let i = 0;i<value.length;i++){
                let item = value[i]
                if (TypeOf(item) == ENUM_TypeOf.objectClass ||
                    TypeOf(item) == ENUM_TypeOf.objectPlain) {
                        recursiveToPlainObject(item)
                    //if(converter) converter(value[i]);
                    if(TypeOf(item) == ENUM_TypeOf.objectClass)
                        value[i] = objectMapValue(item)//Object.assign({},item)
                }
            }
            // value.forEach((item) => {
                
            //     // else if (TypeOf(item) == ENUM_TypeOf.function) {
            //     //     delete leafNode[keyName]
            //     // }
            //     //recursiveToPlainObject(item)
            // })
        } else if (TypeOf(value) == ENUM_TypeOf.function) {
            delete leafNode[keyName]
        }
    }
    //done leafNode tasks
    // leafNode.HH = 555
}
//module.exports = TypeOf;

// module.exports = {
//     ENUM_TypeOf,
//     TypeOf
//     // getDateTimeFormat,
//     // isScrolledIntoView,
//     // isDate,
//     // CheckVarExist
// }
export function getRandomString(charCount){
    let uuid = Math.random().toString(36).substring(2, 2+charCount) // 36 carry bit, ignore '0.', get 8 char
    return uuid
}
export function getMatches(content, regex) {
    var matches = [];
    var match;
    let iTotalMatch = 0 // af=1fdsf1
    let iOnlyVar = 1 //fdsf
    let displayIndex = iOnlyVar
    while (match = regex.exec(content)) {
        matches.push(match[displayIndex]);
    }
    return matches;
}