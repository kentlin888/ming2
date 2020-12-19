let a1 = require('./Login/a1.js')
let content = `const {
    By,
    Key,
    until
} = require('selenium-webdriver')`
let arrayContent = []
//console.log(JSON.stringify(a1.config,null,4))
let arrayObjEntry = Object.entries(a1.config)
//console.log("LOG: ~ file: makeMdElements.js ~ line 10 ~ bb", JSON.stringify(arrayObjEntry,null,4))

// let elem1 = bb[0]
// console.log("LOG: ~ file: makeMdElements.js ~ line 13 ~ elem1", JSON.stringify(elem1,null,4))
class MdElem {
    constructor(objectEntry) {
        this.id = objectEntry[0];
        let elem = objectEntry[1];
        this.byCss = elem.byCss;
        this.imgName = elem.imgName;
    }
    id = "";
    byCss = "";
    imgName = "";

    get line1() {
        return `    // REVIEW ${this.id}`
    }
    get line2() {
        return `    //![](imgs/${this.id}.png)`
    }
    get line3() {
        return `    ${this.id}:By.css("[data-testid='${this.id}']"),`
    }
    get line4() {
        return `    //`
    }
}
class MdModule {
    constructor(mdName, classModule) {
        this.mdName = mdName
        this.config = classModule.config;
        let arrayObjEntry = Object.entries(this.config)
        this.arrayMdElems = arrayObjEntry.map((item) => {
            return new MdElem(item)
        })
    }
    mdName = ''
    config = {}
    arrayMdElems = []
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
    backupFile(fs){
        fs.copyFileSync(this.pathCpSource, this.pathCpBackup)
    }
    rewriteFile(fs,content){
        fs.writeFileSync(this.pathCpSource, content)
    }
    get mdFileName() {
        return ''
    }
    requireHeader = `const {
        By,
        Key,
        until
    } = require('selenium-webdriver')\n`
    get lineHeader() {
        let rtn = `\nlet config = ` + JSON.stringify(this.config, null, 4)
        rtn += '\nmodule.exports.config = config;'
        rtn += '\nmodule.exports = Object.assign(module.exports, {'
        return rtn
    }
    get bodyMdElems() {
        let rtn = ''
        this.arrayMdElems.forEach((mdElem) => {
            rtn += '\n' + mdElem.line1;
            rtn += '\n' + mdElem.line2;
            rtn += '\n' + mdElem.line3;
            rtn += '\n' + mdElem.line4;
        })
        return rtn
    }
    lineFooter = `\n})`
    getContent() {
        let rtn = ''
        rtn += this.requireHeader
        rtn += this.lineHeader
        rtn += this.bodyMdElems
        rtn += this.lineFooter
        return rtn
    }
    get dtsInterface() {
        let arrayKeys = Object.getOwnPropertyNames(this.config)
        let rtn = `interface ${this.mdName} {\n`
        arrayKeys.forEach((key) => {
            rtn += `    ${key}:any;\n`
        })
        rtn += `}\n`
        return rtn
    }
    // get globalDTS_Interface(){

    // }
}
class AllMdModule {
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
    backupFile(fs){
        fs.copyFileSync(this.pathCpSource, this.pathCpBackup)
    }
    rewriteFile(fs,content){
        fs.writeFileSync(this.pathCpSource, content)
    }
    addMdModule(mdModule) {
        this.arrayMdModules.push(mdModule)
    }
    getDTSContent() {
        let rtn = '';
        this.arrayMdModules.forEach(mdModule => {
            rtn += `declare module '${mdModule.mdName}.md';\n`
        });
        this.arrayMdModules.forEach(mdModule => {
            rtn += mdModule.dtsInterface;
        });
        return rtn;
        //mdModule.dtsInterface
    }
    static getAllMdFiles(pathMdFolder) {
        let path = require('path')
        let nodeKits = require('../../lib/nodeKits.js')
        let arrayFiles = []
        nodeKits.getFilesDeep(pathMdFolder)
            .then((files) => {
                console.log("LOG: ~ file: makeMdModules.js ~ line 93 ~ .then ~ files", JSON.stringify(files, null, 4))
                //arrayFiles = files;
                console.log(path.basename(files[0]))
            })
    }
}




// let mdElem = new MdElem(arrayObjEntry[0]);
// console.log("LOG: ~ file: makeMdElements.js ~ line 29 ~ mdElem", mdElem)

module.exports = {
    MdElem,
    MdModule,
    AllMdModule,
}