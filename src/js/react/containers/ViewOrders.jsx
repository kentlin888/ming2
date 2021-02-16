//@ts-check
//Inside of settings.json, add the following:{ "javascript.implicitProjectConfig.checkJs": true }
import React, { PureComponent } from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { load_orderListAsync as load_orderListAsync_act } from '../actions/orderList.js'
import * as orderList_actions from '../actions/orderList.js'
import ViewOrdersItem from './ViewOrdersItem.jsx'
import { OrderInfo } from '../../dataDefine/index.js'

import './ViewOrders.css'
import FirebaseMJS, { ENUM_orderStatus } from '../../firebase/FirebaseMJS.js'
import testData from '../../../../adminData/testdata.json'
var window2 = /**@type {import('../../dataDefine/index.js').ExtendedWindow}*/ (window);

class ViewOrders extends PureComponent {
    constructor(/**@type {any}*/props) {
        super(props);
        this.state = {
            /**@type {OrderInfo[]} */
            arrayOrderInfo: []
        }
        this.boundActionCreators = bindActionCreators(orderList_actions, props.dispatch);
    }

    /**
     * 
     * @param {string} orderId 
     */
    cancelOrder=(orderId) => {
        
        //let firebaseMJS = new FirebaseMJS(firebase,dataKits);
        
        return window.FirebaseMJS.modifyOrderStatus(orderId, ENUM_orderStatus.canceled, true)
            .then((msg) => {
                //console.log(msg)
                this.boundActionCreators.Modify_orderStatus(orderId, ENUM_orderStatus.canceled, true)
                //this.boundActionCreators.Remove_order(orderId)
                //return newOrder.newDocRef.get()
                window.Swal.fire({
                    title: '提醒',
                    text: '訂單已取消',
                    icon: 'info',
                })
            })
            
    }
    // loadOrders = (inOrderStatus) => {
    //     // console.log("LOG:: ViewOrders -> loadOrders -> inOrderStatus", inOrderStatus)
    //     //window.Firebase._setOrderInfo_And_autoNum();
    //     console.log(testData.userId)
    //     window2.Firebase.getOrderInfo(testData.userId, 'canceled')
    //         .then((orderInfo_list) => {
    //             let sJson = JSON.stringify(orderInfo_list[0], null, 4)
    //             //console.log(sJson)
    //             this.setState({ orderInfo_list: orderInfo_list });
    //         })
    // }
    // queryOrderStatus(element_orderStatus){
    //     let uid = window2.firebase.auth().currentUser.uid
    //     let self = this
    //     if(uid){
    //         window.FirebaseMJS.getOrderInfo(uid, element_orderStatus)//'canceled'
    //         .then((orderInfo_list) => {
                
    //             //let sJson = JSON.stringify(orderInfo_list[0], null, 4)
    //             //console.log(sJson)

    //             // let arrayOrderInfo = orderInfo_list.map((eachDbOrder) => {
    //             //     let jsOrderInfo = OrderInfo.getOrderInfo_FromDbFormat(eachDbOrder)
    //             //     jsOrderInfo.fillShopItems(window.app.arrayProductInfo)
    //             //     jsOrderInfo.convertDbFields();
    //             //     return arrayOrderInfo
    //             // })
    //             self.setState({ arrayOrderInfo: orderInfo_list });
                
    //         })
    //     }
    // }
    componentDidMount() {
        //console.log('AAA')
        //console.log($(".button"))
        window.app.pageViewOrders = this;
        //console.log('--------------------AAAA')
        let self = this
        $(".ulScrollButtons .btnCategory").on('click',(e) => {
        // $(".ulScrollButtons .btnCategory").click(function (e) {
            e.preventDefault()
            // $(".active").removeClass("active");
            // $(this).addClass("active");
            let element_orderStatus = e.currentTarget.getAttribute('data-orderstatus')
            if (ENUM_orderStatus.hasOwnProperty(element_orderStatus) === false)
                throw new Error('value of attribute[data-orderstatus] is not valid in ENUM_orderStatus.')
            //console.log(ENUM_orderStatus.hasOwnProperty(element_orderStatus))
            //window2.app
            
            let uid = testData.userId
            uid = window2.app.userData.uid
            //this.queryOrderStatus(element_orderStatus)
            this.props.act_loadOrderInfo(uid, element_orderStatus)
        });
        //console.log('arrayOrderInfo-->', this.state.arrayOrderInfo)
        //queryOrderStatus
    }
    // onInputChange = (bindarg1, e) => {

    //     e.preventDefault()
    //     // console.log(bindarg1)
    //     // console.log(e.currentTarget.getAttribute('data-orderstatus'))
    //     $(".active").removeClass("active");
    //     $(this).addClass("active");
    //     let orderstatus = e.currentTarget.getAttribute('data-orderstatus')
    //     console.log(orderstatus)
    //     //console.log(bindarg1)
    //     //console.log(e.target)
    //     //     let statePropName = e.target.getAttribute('bindstate')
    //     // console.log(statePropName)
    // }

    render() {
        return (
            <main className="boxViewOrders bd1">
                <article >
                    <section>
                        <ul className="b-flexCenter ulScrollButtons bd3">
                            <li className="btnCategory" data-orderstatus="all">所有訂單</li>
                            <li className="btnCategory" data-orderstatus="waitForDelivery">待出貨</li>
                            {/* <li className="btnCategory" data-orderstatus="waitForDelivery">待出貨</li> */}
                            <li className="btnCategory" data-orderstatus="waitForPay">已出貨</li>
                            <li className="btnCategory" data-orderstatus="completed">已完成</li>
                            <li className="btnCategory" data-orderstatus="canceled">已取消</li>
                        </ul>
                        <div >

                            {/* <a href="#" className="button active" orderstatus="all"><span>所有訂單</span></a>
                            <a href="#" className="button" orderstatus="completed"><span>已完成</span></a>
                            <a href="#" className="button" orderstatus="waitForPay"><span>待付款</span></a>
                            <a href="#" className="button" orderstatus="waitForDelivery"><span>待出貨</span></a>
                            <a href="#" className="button" orderstatus="canceled"><span>已取消</span></a> */}
                            {/* <a href="#" className="button" orderstatus="XXX" onClick={this.onInputChange.bind(this, "xx1")}><span>XXXXX</span></a> */}

                        </div>

                        <div className="boxTable bd1">
                            {/* <button onClick={this.loadOrders}>Load Orders</button> */}
                            {/* <ViewOrdersItem data-arrayOrder={this.state.arrayOrderInfo}></ViewOrdersItem> */}
                            <ViewOrdersItem data-arrayOrder={this.props.orderList} data-cancelOrder={this.cancelOrder}></ViewOrdersItem>
                        </div>

                    </section>
                </article>
            </main>

        )
    }
}


const mapStateToProps = (/**@type {any}*/state) => {
    //let { sumPrice, totalItemCount } = countAllItems_Price(state.shopCart.shopItemList)
    //console.log('state-> ',state)
    console.log('----orderList--->', state)
    return {
        //App_redux: state.App_redux,
        orderList: state.orderList,
        // AllItems_Price: sumPrice,//countAllItems_Price(state.shopCart.shopItemList),
        // totalItemCount: totalItemCount,
    };
};

const mapDispatchToProps = (/**@type {any}*/dispatch) => {
    //return bindActionCreators(App_redux, dispatch);
    return {
        dispatch: dispatch,
        act_loadOrderInfo: (uid, orderStatus) => {
            dispatch(load_orderListAsync_act(uid, orderStatus))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrders);