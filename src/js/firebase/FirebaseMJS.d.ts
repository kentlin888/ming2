export function Email_ResendPassword(emailAddress: any, inFirebase: any, swal: any, funcCloseModal: any): any;
export type MIME_TYPE = string;
export namespace MIME_TYPE {
    export const jpg: string;
    export const png: string;
}
export type FIRESTORE_COLLECTION = string;
export namespace FIRESTORE_COLLECTION {
    export const ProductInfo: string;
    export const Users: string;
    export const OrderInfo: string;
}
export type FIRESTORAGE_FOLDERS = string;
export namespace FIRESTORAGE_FOLDERS {
    export const Products: string;
}
export type ENUM_orderStatus = string;
export namespace ENUM_orderStatus {
    export const all: string;
    export const completed: string;
    export const waitForPay: string;
    export const waitForDelivery: string;
    export const canceled: string;
}
/**
 * @module
 * @class
 * @description Firebase class
 */
export default class FirebaseMJS {
    /**
     * @param {import('lodash')} _
     * @param {ProductInfo[]} listProductInfo
     */
    static getProductInfo_GroupedItems_ByCategory(_: import('lodash'), listProductInfo: ProductInfo[]): {
        category: string;
        categoryZhTW: any;
        arrayGroupedItems: ProductInfo[];
    }[];
    /**
     * get new OrderInfo ID , check whether cross date or not.
     * @param {Date} preDayTime
     * @param {Date} nowTime
     * @param {number} autoNewNumber
     */
    static getNewOrderInfoId(preDayTime: Date, nowTime: Date, autoNewNumber: number): {
        lastId: string;
        lastTime: Date;
        isCrossDate: boolean;
    };
    /**
     * @param {firebase} firebase - from firebase
     * @param {import('../lib/dataKits.js')}
     */
    constructor(firebase: any,dataKits:dataKits);
    _firebase: any;
    /**
     * initial-- use this.initStorageRef()
     * @type {object} - this._firebase.storage().ref()
     */
    _storageRef: object;
    /**
     * initial-- use this.initDb()
     * @type {object} - this._firebase.firestore()
     */
    _db: object;
    /**@description initial this._firebase.storage().ref() */
    initStorage: () => void;
    /**@description initial this._firebase.firestore()*/
    initDB: () => void;
    /**
     * @param {string} name
     * @param {number} price
     * @param {ENUM_ProductCategory} category - beef/chicken/soybean...etc
     * @param {{beginEvent:function, endEvent:function}} [options] - callback functions
     */
    addProductInfo(name: string, price: number, category: ENUM_ProductCategory, imgUrl: any, options?: {
        beginEvent: Function;
        endEvent: Function;
    }): any;
    //getProductInfo: () => any;
    /**
     * add OrderInfo to firestore.OrderInfo
     * @param  {import("../dataDefine/index.js").OrderInfo} orderInfo
     * @param  {{beginEvent: function, endEvent: function}} [options] - callback functions
     */
    addOrderInfo(orderInfo: import("../dataDefine/index.js").OrderInfo): any;
    /**
     *
     * @param {string} userId
     * @param {ENUM_orderStatus} orderStatus
     * @returns {Promise<OrderInfo[]>}
     */
    getOrderInfo: (userId: string, orderStatus: ENUM_orderStatus) => Promise<OrderInfo[]>;
    /**@function - get doc.data() from FIRESTORE_COLLECTION.ProductInfo */
    getProductInfo: ()=>any;
    /**
     * @function
     * @return {Promise<object>} - firestore.Users.data()
     */
    getUser: () => Promise<object>;
}
export type EnumObj = {
    value: number;
    desc: string;
};
import { ENUM_ProductCategory } from "../dataDefine/index.js";
import { OrderInfo as OrderInfo_1 } from "../dataDefine/index.js";
import { ProductInfo as ProductInfo_1 } from "../dataDefine/index.js";
