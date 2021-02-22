import pageConfig from './pages.config.js'
import {getMatches} from '../../lib/dataKits.js'
let fs = require('fs')
let path = require('path')
let content = `const {
    By,
    Key,
    until
} = require('selenium-webdriver')`

class MdElem {
    constructor(objectEntry) {
        this.id = objectEntry[0];
        if (objectEntry[1] !== null) {
            let elem = objectEntry[1];
            if (elem.byCss)
                this.byCss = elem.byCss;
            if (elem.imgName)
                this.imgName = elem.imgName;
        }
    }
    id = "";
    byCss = null;
    imgName = null;

    get line1() {
        return `    // REVIEW ${this.id}`
    }
    get line2() {
        if (this.imgName)
            return `    //![](imgs/${this.imgName})`
        else
            return `    //![](imgs/${this.id}.png)`
    }
    get line3() {
        if (this.byCss)
            return `    ${this.id}:By.css("${this.byCss}"),`
        else
            return `    ${this.id}:By.css("[data-testid='${this.id}']"),`
    }
    get line4() {
        return `    //`
    }
    getContent() {
        let rtn = ''
        rtn += '\n' + this.line1;
        rtn += '\n' + this.line2;
        rtn += '\n' + this.line3;
        rtn += '\n' + this.line4;
        return rtn
    }
}
/**@enum {string} */
let ENUM_ExtName = {
    htm: 'htm',
    jsx: 'jsx',
}
class MdModule {
    mdID = ''
    mdConfig = {}
    arrayMdElems = []
    pathMdConfig = ''
    pathHtml = ''
    pathMdFolder = ''
    /**@type {ENUM_ExtName} */
    enum_ExtName = ENUM_ExtName.htm
    constructor( /**@type {import('./pages.config.js').PageConfig} */ pageConfig) {
        this.mdID = pageConfig.id;
        let filenameMdConfig = `${this.mdID}.mdConfig.js`;
        if (pageConfig.filenameMdConfig !== null)
            filenameMdConfig = pageConfig.filenameMdConfig
        this.pathMdConfig = path.join(__dirname, pageConfig.srcMdFolder, filenameMdConfig)
        this.initMdConfigFile(this.pathMdConfig)
        this.pathHtml = path.join(__dirname, pageConfig.srcHtml)
        let extName = path.extname(this.pathHtml).replace('.', '');
        this.enum_ExtName = (extName === ENUM_ExtName.htm) ? ENUM_ExtName.htm : ENUM_ExtName.jsx;
        this.pathMdFolder = path.join(__dirname, pageConfig.srcMdFolder)
    }
    initMdConfigFile(pathFile) {
        let pathFolder = path.dirname(pathFile)
        if (fs.existsSync(pathFolder)===false) {
            console.log('Directory exists!');
            fs.mkdirSync(pathFolder,{ recursive: true });
        }
        //console.log("LOG: ~ file: makeMdModules.js ~ line 80 ~ MdModule ~ initMdConfigFile ~ pathFile", pathFile)
        //let aaPath = path.join(__dirname, 'aa.js')
        if (fs.existsSync(pathFile) === false) {
            let content = 'module.exports = {}'
            fs.writeFileSync(pathFile, content, 'utf8')
        }
    }
    loadArrayMdElems() {
        //1.--- load default html --> htmlConfig
        let arrayTestId = MdModule.getArray_DataTestId(this.pathHtml)

        let htmlConfig = {}
        arrayTestId.forEach(dataTestId => {
            if(dataTestId.includes('-'))
                throw new Error(`dash - appear in [data-TestId]-> ${dataTestId}`)
            htmlConfig[dataTestId] = null;
        });
        //2.--- load custom config
        this.mdConfig = require(this.pathMdConfig)
        //3.--- override default html config
        let combineConfig = Object.assign(htmlConfig, this.mdConfig)
        //4.--- get this.arrayMdElems
        let arrayObjEntry = Object.entries(combineConfig)
        this.arrayMdElems = arrayObjEntry.map((item) => {
            return new MdElem(item)
        })
    }
    /**
     * 
     * @param {string} pathHtml 
     * @returns {string[]}
     */
    static getArray_DataTestId(pathHtml) {
        let enum_ExtName = path.extname(pathHtml).replace('.', '');
        //let enum_ExtName = path.join()
        switch (enum_ExtName) {
            case ENUM_ExtName.htm:
                return MdModule._getArray_DataTestId_htm(pathHtml);
            case ENUM_ExtName.jsx:
                return MdModule._getArray_DataTestId_jsx(pathHtml);
            default:
                throw new Error('enum_ExtName must be htm or jsx!')
        }
        
            
        // let jsdom = require('jsdom')
        // const {
        //     JSDOM
        // } = jsdom
        // let fs = require('fs')
        // let contentHtm = fs.readFileSync(pathHtml, 'utf8')
        // let dom = new JSDOM(contentHtm);
        // let isWebComponent = contentHtm.toLowerCase().includes('<template>')

        // let sBody = ''
        // let elemBody = dom.window.document.querySelector("body")
        // // search in body
        // if(isWebComponent === false){
        //     sBody = elemBody.innerHTML;
        // }else{
        //     // search in body
        //     let elemTemplate = elemBody.querySelector("template")
        //     sBody = elemTemplate.innerHTML;
        // }
        // // <body> or <template>
        // dom = new JSDOM(sBody);
        // let arrayHtmlElement = [...dom.window.document.querySelectorAll("[data-testid]")]; // "Hello world"
        // let arrayDataTestId = arrayHtmlElement.map((element) => {
        //     return element.getAttribute('data-testid')
        // })
        // let arrayDistinct = [...new Set(arrayDataTestId)];
        // if(arrayDataTestId.length!=arrayDistinct.length){
        //     let msg = `testid duplicated in array - ${JSON.stringify(arrayDataTestId)}`
        //     console.error(msg)
        //     throw new Error(msg)
        // }

        // return arrayDataTestId
    }
    static _getArray_DataTestId_htm(pathHtml) {
        let jsdom = require('jsdom')
        const {
            JSDOM
        } = jsdom
        
        let contentHtm = fs.readFileSync(pathHtml, 'utf8')
        let dom = new JSDOM(contentHtm);
        let isWebComponent = contentHtm.toLowerCase().includes('<template>')

        let sBody = ''
        let elemBody = dom.window.document.querySelector("body")
        // search in body
        if (isWebComponent === false) {
            sBody = elemBody.innerHTML;
        } else {
            // search in body
            let elemTemplate = elemBody.querySelector("template")
            sBody = elemTemplate.innerHTML;
        }
        // <body> or <template>
        dom = new JSDOM(sBody);
        let arrayHtmlElement = [...dom.window.document.querySelectorAll("[data-testid]")]; // "Hello world"
        let arrayDataTestId = arrayHtmlElement.map((element) => {
            return element.getAttribute('data-testid')
        })
        let arrayDistinct = [...new Set(arrayDataTestId)];
        if (arrayDataTestId.length != arrayDistinct.length) {
            let msg = `testid duplicated in array - ${JSON.stringify(arrayDataTestId)}`
            console.error(msg)
            throw new Error(msg)
        }

        return arrayDataTestId
    }
    static _getArray_DataTestId_jsx(pathJSX){
        let contentJSX = fs.readFileSync(pathJSX, 'utf8')
        //------ "
        let sepChar = `"`
        let regex = new RegExp(`data-testid=${sepChar}(?<tid>.[^${sepChar}]*)${sepChar}`,"gi")
        let arrayDataTestId1 = getMatches(contentJSX, regex)
        //------ '
        sepChar = `'`
        regex = new RegExp(`data-testid=${sepChar}(?<tid>.[^${sepChar}]*)${sepChar}`,"gi")
        let arrayDataTestId2 = getMatches(contentJSX, regex)
        //------ combine
        let arrayDataTestId = arrayDataTestId1.concat(arrayDataTestId2)
        let arrayDistinct = [...new Set(arrayDataTestId)];
        if (arrayDataTestId.length != arrayDistinct.length) {
            let msg = `testid duplicated in array - ${JSON.stringify(arrayDataTestId)}`
            console.error(msg)
            throw new Error(msg)
        }
        return arrayDataTestId
    }
    getPath_OutputMdFile() {
        return path.join(this.pathMdFolder, `${this.mdID}.md`)
    }
    getPath_OutputDTSFile() {
        return path.join(this.pathMdFolder, `${this.mdID}.d.ts`)
    }
    writeOutputMdFile(content) {
        let pathOutputMdFile = this.getPath_OutputMdFile();
        fs.writeFileSync(pathOutputMdFile, content)
    }
    writeOutputDTSFile(content) {
        let pathOutputDTSFile = this.getPath_OutputDTSFile();
        fs.writeFileSync(pathOutputDTSFile, content)
    }
    requireHeader = `const {
        By,
        Key,
        until
    } = require('selenium-webdriver')\n`;

    get bodyMdElems() {
        let rtn = 'module.exports = {'
        this.arrayMdElems.forEach((mdElem) => {
            rtn += mdElem.getContent()
        })
        return rtn
    }
    lineFooter = `\n}`
    getContent() {
        let rtn = ''
        rtn += this.requireHeader
        //rtn += this.lineHeader
        rtn += this.bodyMdElems
        rtn += this.lineFooter
        return rtn
    }
    get dtsInterface() {
        let arrayKeys = this.arrayMdElems.map(( /**@type {MdElem}*/ mdElem) => {
            return mdElem.id
        })
        //Object.getOwnPropertyNames(this.mdConfig)
        let rtn=`type By2 = import('selenium-webdriver').By;\n`;
        rtn += `declare module '*.md';\n`
        rtn += `interface ${this.mdID} {\n`
        arrayKeys.forEach((key) => {
            rtn += `    ${key}:By2;\n`
        })
        rtn += `}\n`
        return rtn
    }
}
class AllMdModules {
    /**@type {import('./pages.config').PageConfig[]} */
    arrayPageConfig = []
    /**@type {MdModule[]} */
    arrayMdModules = []
    constructor( /**@type {any[]}*/ arrayPageConfigData, /**@type {string[]}*/ generateId) {
        //let pageConfig = require('./pages.config.js')
        this.arrayPageConfig = arrayPageConfigData
        console.log("LOG: ~ file: makeMdModules.js ~ line 183 ~ AllMdModules ~ constructor ~ this.arrayPageConfig", this.arrayPageConfig)
        if (generateId !== null)
            // filter generateId
            this.arrayPageConfig = arrayPageConfigData.filter((item) => {
                let boolUseThis = generateId.includes(item.id)
                return boolUseThis
            })

        this.arrayPageConfig = this.arrayPageConfig.map((mdPgConfig) => {
            return Object.assign(new pageConfig.PageConfig(), mdPgConfig)
        })

        this.arrayMdModules = this.arrayPageConfig.map(( /**@type {import('./pages.config').PageConfig} */ mdPgConfig) => {
            let newMdModule = new MdModule(mdPgConfig)

            newMdModule.loadArrayMdElems();

            return newMdModule
        })
    }
    writeOutputMdFile_All() {
        this.arrayMdModules.forEach(( /**@type {MdModule}*/ mdModule) => {
            mdModule.writeOutputMdFile(mdModule.getContent());
            mdModule.writeOutputDTSFile(mdModule.dtsInterface);
        })
    }
    getPath_Output_DTS_File() {
        return path.join(__dirname, '../global.d.ts') //  selenium/global.d.ts
    }

    writeOutput_DTS_File(content) {
        let pathOutput_DTS_File = this.getPath_Output_DTS_File();
        fs.writeFileSync(pathOutput_DTS_File, content, 'utf8')
    }
    getDTSContent() {
        let rtn = "declare module '*.md';\n";
        // this.arrayMdModules.forEach(/**@type {MdModule}*/mdModule => {
        //     rtn += `declare module '${mdModule.mdID}.md';\n`
        // });
        this.arrayMdModules.forEach( /**@type {MdModule}*/ mdModule => {
            rtn += mdModule.dtsInterface;
        });
        return rtn;
        //mdModule.dtsInterface
    }
}
class AllMdModule2 {
    arrayMdModules = []
    //----pathCpSource
    _pathCpSource = ''
    get pathCpSource() {
        return this._pathCpSource;
    }
    set pathCpSource(value) {
        this._pathCpSource = value;
    }
    //----pathCpBackup
    _pathCpBackup = ''
    get pathCpBackup() {
        return this._pathCpBackup;
    }
    set pathCpBackup(value) {
        this._pathCpBackup = value;
    }
    backupFile(fs) {
        fs.copyFileSync(this.pathCpSource, this.pathCpBackup)
    }
    rewriteFile(fs, content) {
        fs.writeFileSync(this.pathCpSource, content)
    }
    addMdModule(mdModule) {
        this.arrayMdModules.push(mdModule)
    }
    getDTSContent() {
        let rtn = '';
        this.arrayMdModules.forEach(mdModule => {
            rtn += `declare module '${mdModule.mdID}.md';\n`
        });
        this.arrayMdModules.forEach(mdModule => {
            rtn += mdModule.dtsInterface;
        });
        return rtn;
        //mdModule.dtsInterface
    }
    static getAllMdFiles(pathFolder) {
        let path = require('path')
        let nodeKits = require('../../lib/nodeKits.js')
        let arrayFiles = []
        nodeKits.getFilesDeep(pathFolder)
            .then((files) => {
                //arrayFiles = files;
                console.log(path.basename(files[0]))
            })
    }
}
// let mdElem = new MdElem(arrayObjEntry[0]);
module.exports = {
    MdElem,
    MdModule,
    AllMdModules,
}