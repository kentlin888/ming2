import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
//import * as App_redux from "../../App_redux.js";
import * as shopCart_actions from '../actions/shopCart.js'
//import ProductCard_css from './ProductCard.css'
//import '../CategoryCard/CategoryCard.css'
import '../containers/ProductListSearch.css'
import { ProductInfo } from "../../dataDefine/index.js";

export default class ProductCard extends PureComponent {
    static propTypes = {
        id: PropTypes.string,
        dispatch: PropTypes.func,
        productInfo: PropTypes.object,
        //ref
        refShopcartBox: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
        //PropTypes.instanceOf(Element)

    }
    constructor(/**@type {any}*/props) {
        super(props);
        //this.data = props.data;
        const { dispatch, refShopcartBox } = props
        this.boundActionCreators = bindActionCreators(shopCart_actions, dispatch)
        //notify parent add click happened.  need to scroll to shopcart bottom.

        this.refShopcartBox = refShopcartBox;

    }
    btnAddToCart = (/**@type {any}*/e) => {
        const { productInfo, dispatch } = this.props
        if (window.app.userData === null) {
            window.Swal.fire({
                title: '提醒',
                text: `請先登入您的帳號,以便開始選購商品`,
                icon: 'warning',
                //confirmButtonText: '檢視我的訂單',
                // denyButtonText: 'Cool',
                cancelButtonText: '返回',
                showConfirmButton: false,
                // showDenyButton:true,
                showCancelButton: true,
                didOpen: (htmlElement) => {
                    $('.swal2-cancel').attr('data-testid', 'btnSwalCancel');
                    //console.log(assertLog.registerSuccess(true))
                    //console.log("LOG: ~ file: cusModalLogin.js ~ line 311 ~ .then ~ htmlElement", htmlElement)
                }
            })
        } else {
            //alredy login
            this.boundActionCreators.add_shopCart(1, productInfo);
            setTimeout(() => {

                this.refShopcartBox.current.scroll(0, this.refShopcartBox.current.scrollHeight)
            }, 500);
        }
    }
    render() {
        /**@type {ProductInfo} */
        let productInfo = this.props.productInfo
        //const { productInfo } = this.props
        return (
            <React.Fragment>
                <li className="bd1 productCard" data-testid={`prodName-${productInfo.name}`}>
                    <figure>
                        <figcaption className="b-textCenter">
                            <div >{productInfo.name}</div>
                        </figcaption>
                        <div >
                            <a href={productInfo.imgUrl} className="imgContainer bd2">
                                <img className="imgFood"
                                    src={productInfo.imgUrl}
                                    // src={imgProduct.default}
                                    alt="image not found"
                                />
                            </a>


                        </div>


                    </figure>
                    <div className="priceBottom bd3">
                        <div >NT$ {productInfo.price}</div>
                        <button className="addButton" onClick={this.btnAddToCart}>
                            <div>+</div>
                        </button>
                    </div>
                    <hr className="hrDot" />
                </li>

            </React.Fragment>
        );
    }
}
