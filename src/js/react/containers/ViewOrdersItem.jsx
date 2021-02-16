//@ts-check
//Inside of settings.json, add the following:{ "javascript.implicitProjectConfig.checkJs": true }
import React, { PureComponent } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
//import OrderList_css from './OrderList.css'
import Invoice from '../components/Invoice.jsx'
import PropTypes from 'prop-types'
import { OrderInfo, UserData, ShopItemInfo } from '../../../js/dataDefine/index.js'
// import { times } from 'lodash';

/**
 * 
 * @param {*} cell 
 * @param {*} row 
 * @param {*} rowIndex 
 * @param {*} formatExtraData 
 */
function dateFormatter1(cell, row, rowIndex, formatExtraData) {
    /**@type {Date} */
    let date1 = cell;
    let sDate = date1.toLocaleDateString()
    let sTime = date1.toLocaleTimeString()
    //console.log('cell--->',date1)
    return (
        <div>
            <div>{sDate}</div>
            <div>{sTime}</div>
        </div>
    );
}
const columns = [
    {
        dataField: 'jsdtCreateDateTime_server',
        text: '訂單日期',
        formatter: dateFormatter1
    }, {
        dataField: 'orderId',
        text: '訂單編號'
    }, {
        dataField: 'orderProductName',
        text: '名稱/規格'
    }, {
        dataField: 'totalPrice',
        text: '訂單總金額'
    }, {
        dataField: 'sOrderStatus',
        text: '訂單狀態'
    }];

const rowStyle = { backgroundColor: '#c8e6c9' };
// const products = [
//     {
//         id: 0,
//         name: 'name xxx 1',
//         price: 500
//     },
//     {
//         id: 1,
//         name: 'name xxx 2',
//         price: 250
//     }
// ]
let funcCancelOrder = function(){}
const expandRow = {
    onlyOneExpanding: true,
    className: 'expandingRowBackground',
    renderer: (/**@type {any}*/row) => {
        let orderInfo = row
        //console.log('------funcCancelOrder-----',funcCancelOrder)
        return <div className="expandedInvoice">
            <Invoice orderInfo={orderInfo} IsOrderExisted={true} data-cancelOrder={funcCancelOrder}></Invoice>
        </div>
        
    }
    ,
    parentClassName: (/**@type {Boolean}*/isExpanded, /**@type {any}*/row, /**@type {Number}*/rowIndex) => {
        return 'parentExpandFoo'
        // if (rowIndex > 2) return 'parent-expand-foo';
        // return 'parent-expand-bar';
    },
    showExpandColumn: true,
    expandHeaderColumnRenderer: (/**@type {any}*/{ isAnyExpands }) => {
        if (isAnyExpands) {
            return <b>-</b>;
        }
        return <b>+</b>;
    },
    expandColumnRenderer: (/**@type {any}*/{ expanded }) => {
        if (expanded) {
            return (
                <b>-</b>
            );
        }
        return (
            <b>...</b>
        );
    },

};

export default class ViewOrdersItem extends PureComponent {
    
    static propTypes = {
        //OrderInfo[]
        ['data-arrayOrder']: PropTypes.arrayOf(PropTypes.instanceOf(OrderInfo)),
        ['data-cancelOrder']:PropTypes.func,
    }
    static defaultProps = {
        //data: []
    }
    constructor(props){
        super(props)
        funcCancelOrder = props['data-cancelOrder']//function
    }
    render() {
        console.log('ViewOrdersItem.props-->', this.props)
        
        return (
            <div>
                <BootstrapTable
                    keyField='orderId'
                    data={this.props['data-arrayOrder']}
                    columns={columns}
                    expandRow={expandRow}
                />
            </div>
        )
    }
}
