declare const Swal: typeof import('sweetalert2').default;
declare const firebase: typeof import('firebase').default;

// interface Element {
//     setShow:(isTrue:boolean)=>void;
//     setDisabled:(isTrue:boolean)=>void;
//     // self.btnVerifyNumber.setShow(true)
//     // self.btnVerifyNumber.setDisabled(false)
// }
interface HTMLElement {
    setShow:(isTrue:boolean)=>void;
    setDisabled:(isTrue:boolean)=>void;
    // self.btnVerifyNumber.setShow(true)
    // self.btnVerifyNumber.setDisabled(false)
}

interface Window{
    recaptchaVerifier : firebase.auth.RecaptchaVerifier;
}

interface JQuery{
    modal:(strShow:string)=>void;
}