import Invoice from '../../js/react/components/Invoice.jsx'
import React from 'react'
import arrayFakeOrderData from '../../../adminData/fakeData/OrderInfo.json'
import { OrderInfo } from '../../js/dataDefine/index.js';


let order1 = arrayFakeOrderData[0];

let orderInfo = OrderInfo.getOrderInfo_FromDbFormat(order1)//Object.assign(new OrderInfo(), order1)
// convert orderInfo.fstsCreateDateTime_server (add toDate())
orderInfo.convertDbFields();
//userData={order1.userData} orderAddress={order1.orderAddress} totalPrice={order1.totalPrice}
let app = <Invoice orderInfo={orderInfo}></Invoice>
export default app