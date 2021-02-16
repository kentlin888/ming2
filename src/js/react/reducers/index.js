import {
    combineReducers
} from 'redux'
// import uniqueChildId from './uniqueChildId'
import shopCart from './shopCart'
import productList from './productList'
import orderList from './orderList.js'
//import visibilityFilter from './visibilityFilter'

//console.log('todos==>', todos)
var combine = combineReducers({
    //uniqueChildId,
    shopCart,
    productList,
    orderList,
})
//console.log(combine)
export default combine