
import orderList from './orderList.js'
import {Remove_order, Modify_orderStatus} from '../actions/orderList.js'
import {ENUM_orderStatus} from '../../firebase/FirebaseMJS.js'
let chai = require('chai')
describe('reducer-orderList.spec.js', () => {
    const preState = [
        {
            userId: "RFnmmEi6fAWCNhOb6Auz0jhmYn82",
            orderId: "202102140001",
            orderAddress: "s987k",
            orderStatus:{
                isCanceled:false
            },
        },
        {
            userId: "RFnmmEi6fAWCNhOb6Auz0jhmYn82",
            orderId: "202102140002",
            orderAddress: "s987k",
            orderStatus:{
                isCanceled:false
            },
        },
        {
            userId: "RFnmmEi6fAWCNhOb6Auz0jhmYn82",
            orderId: "202102140003",
            orderAddress: "s987k",
            orderStatus:{
                isCanceled:false
            },
        },
    ]
    it('REMOVE_order',() => {
        // const preState = []
        let action = Remove_order(preState[1].orderId);
        let newState = orderList(preState, action)
        //console.log(newState)
        chai.assert(preState.length === 3)
        chai.assert(newState.length === 2)
    })
    it('Modify_orderStatus',() => {
        // const preState = []
        chai.assert(preState[1].orderStatus.isCanceled === false)
        let action = Modify_orderStatus(preState[1].orderId,ENUM_orderStatus.canceled, true);
        let newState = orderList(preState, action)
        //console.log(newState)
        chai.assert(preState[1].orderStatus.isCanceled === true)
    })
})
