import {ENUM_mdId} from '../../lib/RdQaLog.js'
export class PageConfig{
    id = '';
    srcMdFolder = '';
    srcHtml = '';
    filenameMdConfig = '';
}

let generateId = null//['forTest','index','cusModalLogin']
let data = [
    {
        id:ENUM_mdId.forTest,
        srcMdFolder:'./MDPages/forTest',
        filenameMdConfig:'forTest.mdConfig.js',//'./MDPages/forTest/config.md.js',
        srcHtml:'./MDPages/forTest/getDataTestId.htm',
        
    },
    {
        id:ENUM_mdId.T1,
        srcMdFolder:'./MDPages/forTest',
        filenameMdConfig:'T1.mdConfig.js',//'./MDPages/forTest/config.md.js',
        srcHtml:'./MDPages/forTest/T1.jsx',
        
    },
    {
        id:ENUM_mdId.ProductListSearch,
        srcMdFolder:'./MDPages/ProductListSearch',
        filenameMdConfig:null,//不指定檔案,使用default
        srcHtml:'../../react/containers/ProductListSearch.jsx',
    },
    {
        id:ENUM_mdId.ShopCart,
        srcMdFolder:'./MDPages/ShopCart',
        filenameMdConfig:null,//不指定檔案,使用default
        srcHtml:'../../react/containers/ShopCart.jsx',
    },
    {
        id:ENUM_mdId.ShopItem,
        srcMdFolder:'./MDPages/ShopItem',
        filenameMdConfig:null,//不指定檔案,使用default
        srcHtml:'../../react/components/ShopItem.jsx',
    },
    {
        id:ENUM_mdId.Invoice,
        srcMdFolder:'./MDPages/Invoice',
        filenameMdConfig:null,//不指定檔案,使用default
        srcHtml:'../../react/components/Invoice.jsx',
    },
    {
        id:ENUM_mdId.ProductCard,
        srcMdFolder:'./MDPages/ProductCard',
        filenameMdConfig:null,//不指定檔案,使用default
        srcHtml:'../../react/components/ProductCard.jsx',
    },
    // {
    //     id:ENUM_mdId.,
    //     srcMdFolder:'./MDPages/ShopItem',
    //     filenameMdConfig:null,//不指定檔案,使用default
    //     srcHtml:'../../react/components/Invoice.jsx',
    // },
    {
        id:ENUM_mdId.index,
        srcMdFolder:'./MDPages/index',
        filenameMdConfig:'index.mdConfig.js',
        srcHtml:'../../../pages/index/index.htm',
        
    },
    {
        id:ENUM_mdId.cusModalLogin,
        srcMdFolder:'./MDPages/cusModalLogin',
        filenameMdConfig:null,//不指定檔案,使用default
        srcHtml:'../../../webcomponents/cusModalLogin3/cusModalLogin.htm',
    },
    {
        id:ENUM_mdId.cusModalUserProfile,
        srcMdFolder:'./MDPages/cusModalUserProfile',
        filenameMdConfig:null,//不指定檔案,使用default
        srcHtml:'../../../webcomponents/cusModalUserProfile3/cusModalUserProfile.htm',
    },
    {
        id:ENUM_mdId.PopInvoice,
        srcMdFolder:'./MDPages/PopInvoice',
        filenameMdConfig:null,//不指定檔案,使用default
        srcHtml:'../../react/components/PopInvoice.jsx',
    },
    


    
    // {
    //     id:'cusModalLogin',
    //     srcMdFolder:'./cusModalLogin',
    //     filenameMdConfig:'',
    //     srcHtml:'../../../webcomponents/cusModalLogin3/cusModalLogin.htm',
    // },
]
export default {
    PageConfig,
    data,
    generateId,
    ENUM_mdId,
}

