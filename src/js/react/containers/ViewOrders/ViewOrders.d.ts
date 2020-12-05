//https://stackoverflow.com/questions/40382842/cant-import-css-scss-modules-typescript-says-cannot-find-module
//declare module '*.css';

// declare module '*.scss' {
//     const content: {[className: string]: string};
//     export default content;
// }

import * as React from 'react'
export interface ViewOrdersProps {
    // foo ? : any;
    data ? : [any];
    //Requireable<any[]>
}
// interface PropsType {
//     children: JSX.Element;
//     name: string;
//     data:Array;
// }
declare class ViewOrders extends React.PureComponent < ViewOrdersProps, any > {
    constructor(props: any) {}
    //constructor (props: ViewOrdersProps){}
    //render: any;
}
export default ViewOrders;



// declare namespace JSX {
//     interface ElementClass {
//       render: any;
//     }
//   }

// declare interface Window {
//     // Swal: typeof import("sweetalert2").default;
//     $: typeof import('jquery');
// }