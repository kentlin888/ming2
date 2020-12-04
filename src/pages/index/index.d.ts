//@ts-check
//import Swal from 'sweetalert2'

//import Swal from "sweetalert2";
// import {
//     UserData
// } from '../../js/dataDefine/index.js'
// enum ENUM_ViewSize {
//     xl = "xl",
//         lg = "lg",
//         md = "md",
//         sm = "sm",
//         xs = "xs"
// }
// enum ENUM_ViewSize {
//     xl,lg,md,sm,xs
// }
//-----finally OK!!!
// import("sweetalert2")
declare interface Window {
    Swal: typeof import("sweetalert2").default;
    $: typeof jQuery;
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
        history:any;
    };
}

// declare function jQuery(domReadyCallback: () => any): any;

//-----Property 'Swal' is missing in type 'typeof Swal' but required in type 'typeof import("sweetalert2")'
// declare interface Window {
//     Swal: typeof import("sweetalert2"),
//     $: typeof jQuery

// }
//----any , no error
// import("sweetalert2")
// declare interface Window {
//     Swal: typeof Swal,//typeof import("sweetalert2"),
//     $: typeof jQuery

// }