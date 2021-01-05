declare module '*.htm' {
    const value: string;
    export default value
}
declare module '*.jpg' {
    const value: string;
    export default value
}
declare module '*.png' {
    const value: string;
    export default value
}

// export interface Global {
//     document: Document;
//     window: Window;
// }
// declare var global: Global;
// declare global {
//     namespace NodeJS {
//         interface Global {
//             document: Document;
//             window: Window;
//             navigator: Navigator;
//         }
//     }
// }