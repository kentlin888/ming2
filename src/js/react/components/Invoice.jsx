import React, { Component } from 'react'
import './Invoice.css'
import {OrderInfo} from '../../dataDefine/index.js'
import PropTypes from 'prop-types'

class InvoiceShopItem extends Component{
    render(){
        return <tr>
        <td><div className="imgContainer bd2"><img src="http://fakeimg.pl/300x250/" /></div></td>
        <td><div className="rowProductName">【火鍋好物】龍鳳蛋餃|88g克/Box盒XXXadfasdfasdfasdfasdfasdfdsafasdfsadfsdafasdfsdaf</div></td>
        <td>15</td>
        <td>10</td>
        <td>150</td>
    </tr>
    }
}

export default class Invoice extends Component {
    static propTypes={
        orderInfo:PropTypes.instanceOf(OrderInfo)
        // userData:PropTypes.instanceOf(OrderInfo),
        // orderAddress:PropTypes.string,
        // totalPrice:PropTypes.number,
        
    }
    render() {
        let {userData, orderAddress, totalPrice, orderId, sOrderStatus} = this.props.orderInfo
        let jsdtCreateDateTime_server = (this.props.orderInfo.jsdtCreateDateTime_server)?this.props.orderInfo.jsdtCreateDateTime_server.toLocaleString():'XXXXX';
        return (
            <div className="boxInvoice b-flexCenter">
                <table className="tableHeader">
                    <tbody>
                        <tr>
                            <td>訂單編號： {orderId}</td>
                            <td>訂單成立日期 : {jsdtCreateDateTime_server}</td>
                        </tr>
                        <tr>
                            <td>姓名: {userData.userProfile.name}</td>
                            <td>訂單狀態: {sOrderStatus}</td>
                        </tr>
                        <tr>
                            <td>電話: {userData.phoneNumber}</td>
                            <td>?????????</td>
                        </tr>
                        <tr>
                            <td>送貨地址: {orderAddress}</td>
                            <td>訂單金額總計:NT$ {totalPrice}</td>
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
                        </tr>
                        <tr>
                            <td><div className="imgContainer bd2"><img src="http://fakeimg.pl/300x250/" /></div></td>
                            <td><div className="rowProductName">【火鍋好物】龍鳳蛋餃|88g克/Box盒XXXadfasdfasdfasdfasdfasdfdsafasdfsadfsdafasdfsdaf</div></td>
                            <td>15</td>
                            <td>10</td>
                            <td>150</td>
                        </tr>
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