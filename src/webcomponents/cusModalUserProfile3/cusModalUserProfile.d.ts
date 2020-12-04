declare const Swal: typeof import('sweetalert2').default;
declare const firebase: typeof import('firebase').default;


export default class cusModalUserProfile {
    showModal: (isShow: boolean) => void;
}

declare global {
    //var __INITIAL_DATA__: InitialData;
    interface HTMLElement {
        setShow: (isTrue: boolean) => void;
        setDisabled: (isTrue: boolean) => void;
        // self.btnVerifyNumber.setShow(true)
        // self.btnVerifyNumber.setDisabled(false)
    }
    interface Element {
        setShow: (isTrue: boolean) => void;
        setDisabled: (isTrue: boolean) => void;
        // self.btnVerifyNumber.setShow(true)
        // self.btnVerifyNumber.setDisabled(false)
    }
}
//declare interface HTMLInputElement {
//     setShow:(isTrue:boolean)=>void;
//     setDisabled:(isTrue:boolean)=>void;
//     // self.btnVerifyNumber.setShow(true)
//     // self.btnVerifyNumber.setDisabled(false)
// }



// interface Window{
//     recaptchaVerifier : firebase.auth.RecaptchaVerifier;
// }

// declare interface Window{
//     Swal: typeof import("sweetalert2").default;
//     $: typeof jQuery;
//     firebase: typeof firebase;
// }

// interface JQuery{
//     modal:(strShow:string)=>void;
// }