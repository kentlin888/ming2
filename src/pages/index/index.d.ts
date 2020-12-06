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
declare module '@babel/polyfill';

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