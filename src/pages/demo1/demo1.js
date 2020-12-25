
import ReactDOM from 'react-dom'
//import Invoice from '../../js/react/components/Invoice.jsx'
import App from './app.js'
import cusDemo from '../../webcomponents/cusDemo/cusDemo.js'
import {useComponent} from '../../js/others/useComponent4.js'
import htmlCusDemo from '../../webcomponents/cusDemo/cusDemo.htm'
// console.log("LOG: ~ file: demo1.js ~ line 7 ~ useComponent", useComponent)

//import T1 from './T1.jsx'
//let Invoice = require('./Invoice.use.jsx')
//let path = require('path')


// import './demo1.css'
// //import ProductCard from '../../js/react/components/ProductCard.jsx'
// import CategoryCard from '../../js/react/components/CategoryCard.jsx'
// import Shopitem from '../../js/react/components/Shopitem.jsx'
// import NewProducts from '../../../adminData/NewProducts.json'
// import FirebaseMJS from '../../js/firebase/FirebaseMJS.js'
// import ProductListSearch from '../../js/react/containers/ProductListSearch.jsx'
console.log(WebpackDefinePlugin.SOMETHING)

require('@babel/polyfill')//for async await
let root = document.querySelector('#root')
ReactDOM.render(App, root);

// let newComponent
// let pathHTML=  '../../webcomponents/cusDemo/cusDemo.htm'
// let newTagName = 'cus-demo'

// let htmlFile = useComponent(newTagName,htmlCusDemo, cusDemo)
// console.log("LOG: ~ file: demo1.js ~ line 32 ~ htmlFile", htmlFile)
// newComponent = new htmlFile.ctor(htmlFile.templateContent,{})
// document.body.appendChild(newComponent)


// let firebaseConfig = require('../../projectConfig/firebaseProj.config.json')
// let firebase = require('firebase/app');
// require('firebase/firestore')
// require('firebase/auth')
// firebase.initializeApp(firebaseConfig);



// 牛肉麵
// 單價:$50
// 金額小計:$150
// - 採購數量:3 +


// let data = {
//     name:"牛肉麵",
//     price:50,
//     amount:5
// }




//const app = T1//<Invoice></Invoice>
//<CategoryCard data={data}></CategoryCard>


