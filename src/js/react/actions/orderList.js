import {
    REMOVE_order,
    MODIFY_order_status,
    REFRESH_orderList,
    
} from '../actionTypes/index.js'
//import * as dataDefine from '../../dataDefine/index.js'


export function load_orderListAsync(uid, orderStatus) {
    
    //let db_data = dataDefine.fakeProductInfo1;
    
    //return Refresh_productList(db_data)   this line is replaced to as below...
    return (/**@type {any}*/dispatch, /**@type {any}*/getState)=>{
        window.FirebaseMJS.getOrderInfo(uid, orderStatus)//'canceled'
            .then((/**@type {any}*/orderInfo_list) => {
                
                dispatch(Refresh_orderList(orderInfo_list));
                //self.setState({ arrayOrderInfo: orderInfo_list });
                
            })

        
    };
}
export function Refresh_orderList(orderList) {
    return {
        type: REFRESH_orderList,
        //productId: productId,
        orderList: orderList,
        //productInfo: productInfo
    };
}
export function Remove_order(orderId) {
    return {
        type: REMOVE_order,
        //productId: productId,
        orderId: orderId,
        //productInfo: productInfo
    };
}
/**
 * 
 * @param {string} orderId 
 * @param {import('../../firebase/FirebaseMJS.js').ENUM_orderStatus} status 
 * @param {boolean} value 
 */
export function Modify_orderStatus(orderId, status, value) {
    return {
        type: MODIFY_order_status,
        //productId: productId,
        orderId: orderId,
        status:status,
        value:value,
        //productInfo: productInfo
    };
}