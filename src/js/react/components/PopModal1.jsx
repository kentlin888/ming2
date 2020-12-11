import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { OrderInfo } from '../../dataDefine/index.js'
import Invoice from './Invoice.jsx'
import './PopModal1.css'
export default class PopModal1 extends Component {
    static propTypes = {
        orderInfo: PropTypes.instanceOf(OrderInfo)
        // userData:PropTypes.instanceOf(OrderInfo),
        // orderAddress:PropTypes.string,
        // totalPrice:PropTypes.number,

    }
    constructor(props) {
        super(props)
        this.refModal = React.createRef();
    }
    componentDidMount() {
        $(this.refModal.current).modal('show')
    }
    gogogo() {
        console.log('99999')
        $(this.refModal.current).modal('show')
    }
    render() {
        let { userData, orderAddress, totalPrice, orderId, sOrderStatus } = this.props.orderInfo
        let jsdtCreateDateTime_server = (this.props.orderInfo.jsdtCreateDateTime_server) ? this.props.orderInfo.jsdtCreateDateTime_server.toLocaleString() : 'XXXXX';
        return (
            (
                <div>
                    {/* <button type="button" className="btn btn-primary" >Large modal</button> */}
                    {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Large modal</button> */}
                    <div ref={this.refModal} className="modal fade bd-example-modal-lg" tabIndex={-1} role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
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
                                                <td>訂單金額總計:NT$ {totalPrice}</td>
                                            </tr>
                                            <tr>
                                                <td>送貨地址: {orderAddress}</td>
                                                <td>???????????</td>
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
                                    {/* <Invoice orderInfo={this.props.orderInfo}></Invoice> */}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            )
        )
    }
}
