import PopModal1 from '../../js/react/components/PopModal1.jsx'
import React from 'react'
import arrayFakeOrderData from '../../../adminData/fakeData/OrderInfo.json'
import { OrderInfo } from '../../js/dataDefine/index.js';
import 'jquery'
import 'bootstrap'

let order1 = arrayFakeOrderData[0];

let orderInfo = OrderInfo.getOrderInfo_FromDbFormat(order1)//Object.assign(new OrderInfo(), order1)
// convert orderInfo.fstsCreateDateTime_server (add toDate())
orderInfo.convertDbFields();
//userData={order1.userData} orderAddress={order1.orderAddress} totalPrice={order1.totalPrice}




class UsePopModal1 extends React.Component {
    state={
        refPopModal1 : React.createRef()
    }
    constructor(props){
        super(props);
        
    }
    btnClick = () => {
        this.state.refPopModal1.current.gogogo();
    }
    
    render() {
        return (
            <div>
                <button type="button" className="btn btn-primary" onClick={this.btnClick}>XXXX modal</button>
                <PopModal1 ref={this.state.refPopModal1} orderInfo={orderInfo}></PopModal1>
            </div>
        )
    }
}



let app = <UsePopModal1></UsePopModal1>
export default app
