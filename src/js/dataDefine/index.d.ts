import firebase from 'firebase';

/**
 * @class
 * @desc ming1 project ShopItem.jsx
 */
export class ShopItemInfo {
    /**@type {(ProductInfo|null|undefined)} */
    _productInfo: (ProductInfo | null | undefined);
    /**@type {string} */
    productId: string;
    /**@type {number} */
    amount: number;
    /**@type {number} */
    price: number;
    /**@property {string}*/
    get productName(): string;
    /**
     * fill _productInfo - from given product list
     * @param {ProductInfo[]} arrayProducts
     */
    fill_ProductInfo_ByProductArray(arrayProducts: ProductInfo[]): void;
    /**@type {ProductInfo} - set this ShopItem's ProductInfo*/
    set productInfo(arg: ProductInfo);
    /**@type {(ProductInfo|null|undefined)} - return this ShopItem's ProductInfo*/
    get productInfo(): ProductInfo;
}
export type ENUM_ProductCategory = string;
export namespace ENUM_ProductCategory {
    export const mainCourse: string;
    export const meats: string;
    export const soups: string;
    export const stirFired: string;
    export const coldPlates: string;
}
export namespace Map_ProductCategory {
    export const mainCourse:string;
    export const meats:string;
    export const soups:string;
    export const stirFired:string;
    export const coldPlates:string;
    // const mainCourse_1: string;
    // export { mainCourse_1 as mainCourse };
    // const meats_1: string;
    // export { meats_1 as meats };
    // const soups_1: string;
    // export { soups_1 as soups };
    // const stirFired_1: string;
    // export { stirFired_1 as stirFired };
    // const coldPlates_1: string;
    // export { coldPlates_1 as coldPlates };
}
/**
 * @class
 * @description firestore.Products/ProductList.jsx/ProductCard.jsx
 * */
export class ProductInfo {
    /**@prop {string} */
    productId: string;
    /**@prop {string} */
    name: string;
    /**@prop {number} */
    price: number;
    /**@prop {?firebase.firestore.Timestamp} */
    fstsAddDateTime_server: any;
    /**@prop {string} */
    category: string;
    /**@prop {string} */
    tag: string;
    /**@prop {string} */
    imgUrl: string;
    /**@prop {string} */
    imgFileName: string;
    /**@prop {?number} */
    autoNum: any;
    /**@prop {?boolean} - in use or not */
    isActived: boolean;
}
/**
 * @class
 * @description OrderInfo.OrderStatus
 */
export class OrderStatus {
    /**@type {boolean} */
    isPaid: boolean;
    /**@type {boolean} */
    isCompleted: boolean;
    /**@type {boolean} */
    isCanceled: boolean;
    /**@type {boolean} */
    isDelivery: boolean;
}
/**
 * @class
 * @description - OrderInfo.OrderLog by LogType
 */
export class OrderLog {
    /**@type {?firebase.firestore.Timestamp} */
    fstsLogDateTime_server: Date | null;
    /**@type {LogType} */
    logType: LogType;
    /**@type {string} */
    remarks: string;
}
/**
 * *
 */
export type LogType = string;
export namespace LogType {
    export const NewOrder: string;
    export const PaidMoney: string;
    export const CancelOrder: string;
    export const DeliveryOrder: string;
    export const CompleteOrder: string;
}
/**
 * @class
 * @description - from firestore.OrderInfo
 */
export class OrderInfo {
    /** firestore.Users.uid*/
    userId: string;
    /** order create datetime is js Date or from firestore timestamp FORMAT!*/
    fstsCreateDateTime_server: firebase.firestore.Timestamp;
    
    /**@type {?Date} - server time conver to client js datetime*/ 
    get jsdtCreateDateTime_server():Date;

    get sCreateDateTime(): string;
    
    get sOrderStatus(): string;
    
    orderId: string;

    orderAddress:string;
    
    shopItemList: ShopItemInfo[];
    /**first shop product name with /.... */
    get orderProductName(): string;
    
    getShopItems_ProdId: () => string[];
    
    /**
     * @function - fill shopItem detail information
     * @param arrayProductInfo - distinct product list
     */
    fillShopItems(arrayProductInfo: ProductInfo[]): void;
    
    totalPrice: number;
    
    orderStatus: OrderStatus;
    
    orderLog: OrderLog[];
    
    userData: UserData;
    
    /**Convert props from db to local js fields */
    convertDbFields():void;

    static getOrderInfo_FromDbFormat(db_orderInfo:*):OrderInfo;
}
/**@class
 * @desc firestore.Users
*/
export class UserData {
    /**
     * @function
     * @param {Array} AuthUserProviderData
     */
    static ENUM_ProviderType: {
        google: string;
        password: string;
    };
    static getListProviderId_ByAuthUserProviderData(AuthUserProviderData: any): any;
    /**@prop {string} */
    dispalyName: any;
    /**@prop {boolean} */
    emailVerified: boolean;
    /**@prop {UserProfile} */
    userProfile: UserProfile;
    /**@prop {string} */
    phoneNumber: string;
    /**@prop {string} */
    uid: string;
    /**@prop {string} */
    photoURL: string;
    /**@prop {string} */
    get providerId(): string;
    /**@prop {string} */
    email: string;
    /**@prop {string[]} */
    listProviderId: any[];
}
/**
 * @class
 * @desc firestore.Users.userProfile
 */
export class UserProfile {
    /**@type {string} */
    uid: string;
    /**@type {string} */
    sendEmail: string;
    /**@type {string} */
    name: string;
    /**@type {string} */
    phoneNumber: string;
    /**@type {string} */
    address: string;
}
export type GlobalFlag = {
    __myFlag__?: boolean;
    firebase?: any;
    Firebase?: import('../firebase/FirebaseMJS.js').default;
    app?: object;
};
export type ExtendedWindow = Window & GlobalFlag;
/**
 * @typedef {Object} GlobalFlag
 * @prop {boolean} [__myFlag__]
 * @prop {firebase} [firebase]
 * @prop {import('../firebase/FirebaseMJS.js').default} [Firebase]
 * @prop {object} [app]
 * @typedef {Window & GlobalFlag} ExtendedWindow
 */
export const fakeProductInfo1: ProductInfo;
export const fakeProductInfo2: ProductInfo;
export const fakeProductInfo3: ProductInfo;
