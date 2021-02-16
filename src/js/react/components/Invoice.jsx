import React, { Component } from 'react'
import './Invoice.css'
import { OrderInfo, ShopItemInfo } from '../../dataDefine/index.js'
import PropTypes from 'prop-types'
import {ENUM_orderStatus} from '../../firebase/FirebaseMJS.js'

class InvoiceShopItem extends Component {
    static propTypes = {
        shopItemInfo: PropTypes.instanceOf(ShopItemInfo)
    }
    render() {
        /**@type {ShopItemInfo} */
        let shopItemInfo = this.props.shopItemInfo
        let imgUrl = shopItemInfo._productInfo.imgUrl
        if (shopItemInfo._productInfo === null)
            throw new Error('shopItemInfo._productInfo is null! try method OrderInfo.fillShopItem()')
        return <tr>
            <td><div className="imgContainer bd2"><a href={imgUrl}><img src={imgUrl} /></a></div></td>
            <td><div className="rowProductName" data-testid="invoiceShopItem_prodName">{shopItemInfo._productInfo.name}</div></td>
            <td data-testid="invoiceShopItem_amount">{shopItemInfo.amount}</td>
            <td data-testid="invoiceShopItem_price">{shopItemInfo.price}</td>
            <td data-testid="invoiceShopItem_itemCountPrice">{shopItemInfo.amount * shopItemInfo.price}</td>
        </tr>
    }
}

export default class Invoice extends Component {
    static propTypes = {
        orderInfo: PropTypes.any,//PropTypes.instanceOf(OrderInfo)
        IsOrderExisted: PropTypes.bool,
        ['data-cancelOrder']:PropTypes.func,
        // userData:PropTypes.instanceOf(OrderInfo),
        // orderAddress:PropTypes.string,
        // totalPrice:PropTypes.number,

    }

    // cancelOrder=() => {
        
    //     //let firebaseMJS = new FirebaseMJS(firebase,dataKits);
        
    //     return window.FirebaseMJS.modifyOrderStatus('202102080002', ENUM_orderStatus.canceled, true)
    //         .then((msg) => {
    //             console.log(msg)
    //             //return newOrder.newDocRef.get()
    //         })
    // }
    render() {
        let { IsOrderExisted } = this.props;
        let { userData, orderAddress, totalPrice, orderId, sOrderStatus, orderStatus, shopItemList } = this.props.orderInfo
        let IsShowBtn_CancelOrder = (IsOrderExisted && orderStatus.isCanceled===false)
        let cancelOrder = this.props['data-cancelOrder']
        console.log("LOG: ~ file: Invoice.jsx ~ line 28 ~ Invoice ~ render ~ shopItemList", shopItemList)
        //console.log("LOG: ~ file: Invoice.jsx ~ line 28 ~ Invoice ~ render ~ orderInfo", orderStatus.isCanceled)
        let jsdtCreateDateTime_server = (this.props.orderInfo.jsdtCreateDateTime_server) ? this.props.orderInfo.jsdtCreateDateTime_server.toLocaleString() : 'XXXXX';
        return (
            <div className="boxInvoice b-flexCenter">
                <table className="tableHeader">
                    <tbody>
                        <tr className={(IsOrderExisted) ? '' : 'd-none'}>
                            <td>
                                <span><span>訂單編號：&nbsp;</span><span data-testid="invoice_orderId">{orderId}</span></span>
                            </td>
                            <td>
                                <span><span>訂單成立日期：&nbsp;</span><span data-testid="invoice_jsdtCreateDateTime_server">{jsdtCreateDateTime_server}</span></span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span><span>姓名：&nbsp;</span><span data-testid="invoice_userName">{userData.userProfile.name}</span></span>
                            </td>
                            <td><span className={(IsOrderExisted) ? '' : 'd-none'} >
                                <span><span>訂單狀態：&nbsp;</span><span data-testid="invoice_sOrderStatus">{sOrderStatus}</span></span>
                            </span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span><span>電話：&nbsp;</span><span data-testid="invoice_phoneNumber">{userData.phoneNumber}</span></span>
                            </td>
                            <td>
                                <div className={`btn btn-danger ${(IsShowBtn_CancelOrder) ? '' : 'd-none'}`} onClick={function(){cancelOrder(orderId)}}>取消訂單</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span><span>送貨地址：&nbsp;</span><span data-testid="invoice_orderAddress">{orderAddress}</span></span>
                            </td>
                            <td>
                                <span><span>訂單總金額:&nbsp;NT$&nbsp;</span><span data-testid="invoice_totalPrice">{totalPrice}</span></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <table className="tableItems bd1">
                    <thead>
                        <tr>
                            <th>圖片</th>
                            <th>名稱/規格</th>
                            <th>數量</th>
                            <th>單價</th>
                            <th>金額</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shopItemList.map((/**@type {ShopItemInfo}*/shopItemInfo, index) => {
                            return <InvoiceShopItem key={index} shopItemInfo={shopItemInfo}></InvoiceShopItem>
                        }
                        )}
                        {/* <tr>
                            <td><div className="imgContainer bd2"><img src="http://fakeimg.pl/300x250/" /></div></td>
                            <td><div className="rowProductName">【火鍋好物】龍鳳蛋餃|88g克/Box盒XXXadfasdfasdfasdfasdfasdfdsafasdfsadfsdafasdfsdaf</div></td>
                            <td>15</td>
                            <td>10</td>
                            <td>150</td>
                        </tr>
                        <tr>
                            <td><div className="imgContainer bd2"><img src="http://fakeimg.pl/300x250/" /></div></td>
                            <td><div className="rowProductName">【火鍋好物】龍鳳蛋餃|88g克/Box盒XXXadfasdfasdfasdfasdfasdfdsafasdfsadfsdafasdfsdaf</div></td>
                            <td>15</td>
                            <td>10</td>
                            <td>150</td>
                        </tr>
                        <tr>
                            <td><div className="imgContainer bd2"><img src="http://fakeimg.pl/300x250/" /></div></td>
                            <td><div className="rowProductName">【火鍋好物】龍鳳蛋餃|88g克/Box盒XXXadfasdfasdfasdfasdfasdfdsafasdfsadfsdafasdfsdaf</div></td>
                            <td>15</td>
                            <td>10</td>
                            <td>150</td>
                        </tr>
                        <tr>
                            <td><div className="imgContainer bd2"><img src="http://fakeimg.pl/300x250/" /></div></td>
                            <td><div className="rowProductName">【火鍋好物】龍鳳蛋餃|88g克/Box盒XXXadfasdfasdfasdfasdfasdfdsafasdfsadfsdafasdfsdaf</div></td>
                            <td>15</td>
                            <td>10</td>
                            <td>150</td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        )
    }
}

function getDateString_correctTimeZone(inDate, formatNo) {
    // correct timezone time -> inDate.getXXXX()
    let yy = inDate.getFullYear();
    let mm = inDate.getMonth() + 1;
    let dd = inDate.getDate();
    let MM = String(mm).padStart(2, '0')
    let DD = String(dd).padStart(2, '0')
    switch (formatNo) {
        case 1:
            return `${yy}/${MM}/${DD} `;
        default:
            return ''
    }
}