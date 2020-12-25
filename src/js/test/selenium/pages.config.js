class PageConfig{
    id = '';
    srcMdFolder = '';
    srcHtml = '';
    filenameMdConfig = '';
}
let generateId = null//['forTest','index','cusModalLogin']
let data = [
    {
        id:'forTest',
        srcMdFolder:'./MDPages/forTest',
        filenameMdConfig:'forTest.mdConfig.js',//'./MDPages/forTest/config.md.js',
        srcHtml:'./MDPages/forTest/getDataTestId.htm',
        
    },
    {
        id:'index',
        srcMdFolder:'./MDPages/index',
        filenameMdConfig:'index.mdConfig.js',
        srcHtml:'../../../pages/index/index.htm',
        
    },
    {
        id:'cusModalLogin',
        srcMdFolder:'./MDPages/cusModalLogin',
        filenameMdConfig:null,//不指定檔案,使用default
        srcHtml:'../../../webcomponents/cusModalLogin3/cusModalLogin.htm',
    },
    // {
    //     id:'cusModalLogin',
    //     srcMdFolder:'./cusModalLogin',
    //     filenameMdConfig:'',
    //     srcHtml:'../../../webcomponents/cusModalLogin3/cusModalLogin.htm',
    // },
]
module.exports = {
    PageConfig,
    data,
    generateId,
}