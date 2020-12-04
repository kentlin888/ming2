interface $ {
    modal: (strShow: string) => void;
}
interface JQuery {
    modal: (strShow: string) => void;
}
interface History{
    push:(url:string)=>void;
}
// declare interface HTMLInputElement {
//     setShow:(isTrue:boolean)=>void;
//     setDisabled:(isTrue:boolean)=>void;
//     // self.btnVerifyNumber.setShow(true)
//     // self.btnVerifyNumber.setDisabled(false)
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
declare var firebase : firebase;
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
        history: History;//import('history').default;
    };
    recaptchaVerifier : firebase.auth.RecaptchaVerifier;
    FirebaseMJS : import('./js/firebase/FirebaseMJS.js').default
}
