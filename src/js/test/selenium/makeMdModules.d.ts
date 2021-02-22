export declare module 'makeMdModules.js';
// declare module 'foo' {
//     export interface Foo {
//         foo: string;
//     }
// }
declare class AllMdModules {
    constructor(arrayPageConfigData: any[], generateId:string[]) {}
    writeOutputMdFile_All:()=>void;
    writeOutput_DTS_File:(DTSContent:string)=>void;
    getDTSContent:()=>string;
}
declare class MdElem {
    constructor(objectEntry: Array) {}
    getContent:()=>string;
}
declare class MdModule {
    constructor(pgTestConfig: any) {}
    loadArrayMdElems:()=>void;
    getContent:()=>string;
    writeOutputMdFile:(moduleContent:string)=>void;
    writeOutputDTSFile:(moduleDTSContent:string)=>void;
    getPath_OutputMdFile:()=>string;
    dtsInterface:string;
    static getArray_DataTestId:(pathHtml: string)=>string[];

}

// export declare module 'makeMdModules'{
//     export = {
//         MdElem:any
//     }
//     // export interface MdElem{

//     //     AA:any;
//     // }
//     // export interface MdModule{};
//     // export interface AllMdModules{};
// }

// declare namespace makeMdModules {
//     export interface MdElem {
//     //   width?: number;
//     //   height?: number;
//     };
//     export interface MdModule {
//         //   width?: number;
//         //   height?: number;
//         };
//         export interface AllMdModules {
//             //   width?: number;
//             //   height?: number;
//             };
//   }