// import { ENUM_switchIndexPage } from "./pages/index/index.js";



interface $ {
    modal: (strShow: string) => void;
}
interface JQuery {
    modal: (strShow: string) => void;
    scrollspy:(options:*)=>void;
}
interface History {
    push: (url: string) => void;
}



//-------- add attrubutes ok
// declare namespace JSX {
//     interface IntrinsicElements {
//         "li": HTMLAttributes & {
//             orderstatus: string;
//         }
//     }
// }


// declare global {
//     namespace JSX {
//         interface IntrinsicAttributes extends React.Attributes {
//             testID ? : string
//         }
//         interface IntrinsicClassAttributes < T > extends React.ClassAttributes < T > {
//             testID ? : string
//         }
//     }
// }

// declare interface HTMLElement {
//     setShow:(isTrue:boolean)=>void;
//     setDisabled:(isTrue:boolean)=>void;
//     // self.btnVerifyNumber.setShow(true)
//     // self.btnVerifyNumber.setDisabled(false)
// }
// declare global{
//     firebase:typeof firebase;
// }
//declare var $: typeof JQuery;
declare var Swal: typeof import("sweetalert2").default;
declare var firebase: firebase;
declare interface Window {
    Swal: typeof import("sweetalert2").default;
    $: jQuery;
    firebase: typeof firebase;
    app: {
        /** push history url , so that can change react page router path */
        pushUrl: (url: string) => void;
        /** get bootstrap viewsize from index hidden tag detector */
        viewSize: () => ('xl' | 'lg' | 'md' | 'sm' | 'xs'); //ENUM_ViewSize
        /** set proxyMainPageUI.shopItemCount, 2 shopcart count number on navbar1 */
        setShopItemCount: (itemCount: number) => void;
        /** index page, navbar1 */
        navbar1: HTMLElement;
        /** open shopcart hidden bootstrap modal, this function is set by react page */
        openModalShopCart: () => void;
        /** data is from firebase.auth().currentUser, get from onAuthStateChanged() */
        userData: import('../../js/dataDefine/index.js').UserData;
        history: History; //import('history').default;
        switchIndexPage:(enum_switchIndexPage:string)=>void;
        arrayGroupedCategories:import('./js/firebase/FirebaseMJS.js').groupedCategory[];
        arrayProductInfo:import('./js/dataDefine/index.js').ProductInfo[];
    };
    recaptchaVerifier: firebase.auth.RecaptchaVerifier;
    FirebaseMJS: import('./js/firebase/FirebaseMJS.js').default
}