import {REFRESH_orderList, REMOVE_order, MODIFY_order_status} from '../actionTypes'
import {ENUM_orderStatus} from '../../firebase/FirebaseMJS.js'

//import * as dataDefine from '../../dataDefine/index.js'

//productList:
const initState = [] // array Order Info

// Reducer
export default function reducer(state = initState, action = {}) {
    let newState = []// = Object.assign({}, state);
    switch (action.type) {
        case REFRESH_orderList:
            newState=action.orderList;//[]
            //newState.push(action.productList)//dataDefine.fakeProductInfo1
            return newState;
        case REMOVE_order:
            newState = state.filter((item) => {
                return (item.orderId!=action.orderId)
            })
            return newState;
        case MODIFY_order_status:
            let findOrder = state.find((item) => {
                return item.orderId === action.orderId
            })
            newState = state.filter((item) => {
                return (item.orderId!=action.orderId)
            })
            if(findOrder){
                findOrder = window._.cloneDeep(findOrder)
                newState.push(findOrder)
                switch (action.status) {
                    case ENUM_orderStatus.canceled:
                        findOrder.orderStatus.isCanceled = action.value;
                        break;
                    default:
                        throw new Error('MODIFY_order_status -- error')
                }
            }

            //let orderId = action.orderId;

            //* @param {import('../../firebase/FirebaseMJS.js').ENUM_orderStatus} status 

            return newState;
        // do reducer stuff
        default:
            return state;
    }
}

// Action Creators


// side effects, only as applicable
// e.g. thunks, epics, etc
// export function getWidget() {
//     return (dispatch) =>
//         get("/widget").then((widget) => dispatch(updateWidget(widget)));
// }