import PopInvoice from '../../js/react/components/PopInvoice.jsx'
import React from 'react'
import arrayFakeOrderData from '../../../adminData/fakeData/OrderInfo.json'
import { OrderInfo } from '../../js/dataDefine/index.js';
import 'jquery'
import 'bootstrap'
import FirebaseMJS from '../../js/firebase/FirebaseMJS.js'
import * as dataKits from '../../js/lib/dataKits.js'
//--------- REDUX
import { createStore, applyMiddleware, bindActionCreators } from "redux";
import { Provider , connect } from 'react-redux'
import reducer from "../../js/react/reducers";
//import * as App_redux from '../../App_redux.js'
import * as shopCart_actions from '../../js/react/actions/shopCart.js'
//--------- Swal
import Swal from 'sweetalert2'

window.Swal = Swal;
// import './ShopCart.css'
//import '../../containers/ProductListSearch/ProductListSearch.css'

//REDUX
var rootReducer = reducer; //already combine Reducers
const store = createStore(
    rootReducer,
    //composeWithDevTools(applyMiddleware(...middlewares))
);
//FIREBASE
let firebaseConfig = require('../../projectConfig/firebaseProj.config.json')
let firebase = require('firebase/app');
require('firebase/firestore')
firebase.initializeApp(firebaseConfig);
let firebaseMJS = new FirebaseMJS(firebase,dataKits);
window.FirebaseMJS = firebaseMJS

//get fake data
let order1 = arrayFakeOrderData[0];
let orderInfo = OrderInfo.getOrderInfo_FromDbFormat(order1)//Object.assign(new OrderInfo(), order1)
// convert orderInfo.fstsCreateDateTime_server (add toDate())
orderInfo.convertDbFields();
//userData={order1.userData} orderAddress={order1.orderAddress} totalPrice={order1.totalPrice}


class UsePopInvoice extends React.Component {
    state={
        refPopInvoice : React.createRef()
    }
    constructor(props){
        super(props);
        this.boundActionCreators = bindActionCreators(shopCart_actions, props.dispatch);

        window.FirebaseMJS
        
    }
    btnClick = () => {
        this.state.refPopInvoice.current.showModal(true);
    }
    
    render() {
        let {dispatch} = this.props
        return (
            <div>
                <button type="button" className="btn btn-primary" onClick={this.btnClick}>XXXX modal</button>
                <PopInvoice ref={this.state.refPopInvoice} orderInfo={orderInfo} dispatch={dispatch}></PopInvoice>
            </div>
        )
    }
}
const mapStateToProps = (/**@type {any}*/state) => {
    //console.log('shopCart -- mapStateToProps==> ', state)
    //let { sumPrice, totalItemCount } = countAllItems_Price(state.shopCart.shopItemList)
    return {
        shopItemList: state.shopCart.shopItemList,
        //getAllItem_PriceTotal: state.shopCart.getAllItem_PriceTotal,
        // AllItems_Price: sumPrice,//countAllItems_Price(state.shopCart.shopItemList)
        // totalItemCount: totalItemCount,
    }
}

const mapDispatchToProps = (/**@type {any}*/dispatch) => {
    //return bindActionCreators(App_redux, dispatch);
    return {
        dispatch: dispatch
    }
}
let HocUsePopInvoice = connect(mapStateToProps, mapDispatchToProps)(UsePopInvoice)
let app = (
    <Provider store={store}>
        <HocUsePopInvoice></HocUsePopInvoice>
    </Provider>
);

export default app;


// let app = <UsePopInvoice></UsePopInvoice>
// export default app
