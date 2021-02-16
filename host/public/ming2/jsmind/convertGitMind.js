var os = require('os');

//a.split(os.EOL);
//https://gitmind.com/app/doc/d8865b60ed31e3c39522d5b9696f2b8c
let fs = require('fs')
let path = require('path')
//let pathText = path.join(__dirname, 'charge.txt')
let pathText = path.join(__dirname, './Skills.txt')
let txt = fs.readFileSync(pathText, 'utf8')
//let txt2 = txt.replace("\t","|||")
let arrayText = txt.split(os.EOL);

let arraySplitTab = arrayText[1].split("\t")
let tabCount = arraySplitTab.length - 1

let arrayItem = []
// arrayItem.push({
//     topic:arrayText[0],
//     level = 1
// })
function getRandomString(charCount) {
    let uuid = Math.random().toString(36).substring(2, 2 + charCount) // 36 carry bit, ignore '0.', get 8 char
    return uuid
}

let arrayParentIdLevel = [] // each level , current parent id
let preLevel = 0

arrayText.forEach((eachLine, index) => {
    let arraySplitTab = eachLine.split("\t")
    let tabCount = arraySplitTab.length - 1
    let topic = arraySplitTab[tabCount]
    if(topic!==""){
        arrayItem.push({
            id:getRandomString(8),
            topic: topic,
            level : tabCount,
            //parentid:""
        })
    }
    
})

// console.log(tabCount)
let arrayItem2 =  arrayItem.map((node, index) => {
    if(node.level === 0 && index === 0){
        node.isroot = true;
        //arrayParentIdLevel[0] = node.id // level 0 node id
        preLevel = 0
    }
    //-------- Each Node
    // if(node.level===preLevel+1){
    //     node.parentid = arrayParentIdLevel[node.level-1]
    // }
    node.parentid = arrayParentIdLevel[node.level-1]
    arrayParentIdLevel[node.level] = node.id // level 0 node id
    preLevel = node.level
    return node
})
// let arrayItem3 = arrayItem2.map((item) => {
//     delete item.level
//     return item
// })
console.log(JSON.stringify(arrayItem2,null,4))
//console.log(arrayText)


