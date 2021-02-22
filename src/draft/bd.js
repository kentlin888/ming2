let randomColor = require('../../node_modules/randomcolor/randomColor.js')

let arrayColor20;
// arrayColor20 = randomColor({
//     count: 10,
//     hue: 'green'
// });
arrayColor20 = randomColor({
    count: 20,
    // luminosity: 'random',
    //luminosity: 'light',
    luminosity: 'bright',
    hue: 'random'
});

let fileText = '';
arrayColor20.forEach((item, index) => {
    fileText += `.bd${index}{border:2px solid ${item};}\n`;
});

let fs = require('fs')
let path = require('path')
let pathBD = path.join(__dirname, 'bd.css')
fs.writeFileSync(pathBD, fileText, 'utf8')



// let aa2 = randomColor();
// console.log(aa2)

// let elemStyle = document.createElement('style')
// elemStyle.innerHTML = `.bd1{border:2px solid ${aa2};}`;