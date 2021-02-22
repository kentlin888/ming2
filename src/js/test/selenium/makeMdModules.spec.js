//const { assert } = require('console')
const {assert} = require('chai')

describe('makeMdModules.spec.js', () => {
    let chai = require('chai')

    it('MdElem', () => {
        let path = require('path')
        let fs = require('fs')
        let mdconfig = require('./MDPages/forTest/forTest.mdConfig.js')
        let arrayObjEntry = Object.entries(mdconfig)
        
        let makeMdElements = require('./makeMdModules.js')
        
        let mdElem0 = new makeMdElements.MdElem(arrayObjEntry[0])
        let mdElem1 = new makeMdElements.MdElem(arrayObjEntry[1])
        let mdElem2 = new makeMdElements.MdElem(arrayObjEntry[2])
        let mdElem3 = new makeMdElements.MdElem(arrayObjEntry[3])
        let content = mdElem0.getContent() + mdElem1.getContent() + mdElem2.getContent() + mdElem3.getContent()
        console.log("LOG: ~ file: makeMdModules.spec.js ~ line 16 ~ it ~ content", content)
        let pathSaveFile = path.join(__dirname, './MDPages/forTest/expectMdElemBody.txt')

        // change this flag
        let readonlyMode = true // only read & compare

        if (readonlyMode === true) {
            //assert expect data
            let expectContent = fs.readFileSync(pathSaveFile, 'utf8')
            chai.assert(content == expectContent)
        } else {
            //generate expect data
            fs.writeFileSync(pathSaveFile, content)
        }
    })

    it('getArray_DataTestId()', () => {
        let makeMdModules = require('./makeMdModules.js')
        let path = require('path')
        let pathHtm = path.join(__dirname, './MDPages/forTest/getDataTestId.htm')
        //pathHtm = path.join(__dirname, '../../react/components/Invoice.jsx')
        let getArrayTestId = makeMdModules.MdModule.getArray_DataTestId(pathHtm)
        console.log(JSON.stringify(getArrayTestId))
        let expectArray = ["btnLogin", "span1", "alink1"]
        chai.assert(JSON.stringify(getArrayTestId) == JSON.stringify(expectArray))
    })

    it('getArray_DataTestId() - duplicate testid', () => {
        let makeMdModules = require('./makeMdModules.js')
        let path = require('path')
        let pathHtm = path.join(__dirname, './MDPages/forTest/duplicateTestID.htm')
        let errorHappend = false;
        let getArrayTestId
        try {
            getArrayTestId = makeMdModules.MdModule.getArray_DataTestId(pathHtm)    
        } catch (error) {
            errorHappend = true
            console.error(error)
        }
        // let expectArray = ["btnLogin", "span1", "alink1"]
        chai.assert(errorHappend === true)
        // chai.assert(JSON.stringify(getArrayTestId) == JSON.stringify(expectArray))
    })

    it('MdModule forTest', () => {
        let makeMdModules = require('./makeMdModules.js')
        let pagesConfig = require('./pages.config.js')
        let pgTestConfig = Object.assign(new pagesConfig.PageConfig(), pagesConfig.default.data[0])
        let mdModule_ForTest = new makeMdModules.MdModule(pgTestConfig)
        mdModule_ForTest.loadArrayMdElems();
        mdModule_ForTest.writeOutputMdFile(mdModule_ForTest.getContent());
        mdModule_ForTest.writeOutputDTSFile(mdModule_ForTest.dtsInterface);
        console.log('write ok--> ', mdModule_ForTest.getPath_OutputMdFile())
    })
    it('MdModule T1', () => {
        let makeMdModules = require('./makeMdModules.js')
        let pagesConfig = require('./pages.config.js')
        let pgTestConfig = Object.assign(new pagesConfig.PageConfig(), pagesConfig.default.data[1])
        let mdModule_T1 = new makeMdModules.MdModule(pgTestConfig)
        mdModule_T1.loadArrayMdElems();
        mdModule_T1.writeOutputMdFile(mdModule_T1.getContent());
        mdModule_T1.writeOutputDTSFile(mdModule_T1.dtsInterface);
        console.log('write ok--> ', mdModule_T1.getPath_OutputMdFile())
        let fs = require('fs')
        let content = fs.readFileSync(mdModule_T1.getPath_OutputMdFile(),'utf8')
        console.log("LOG: ~ file: makeMdModules.spec.js ~ line 82 ~ it ~ content", content)
        let expectExist = content.includes(`[data-testid='btnLog111']`)
        assert(expectExist === true)
        expectExist = content.includes(`[data-testid='btnLog222']`)
        assert(expectExist === true)
    })
    it('MdModule PLS', () => {
        let makeMdModules = require('./makeMdModules.js')
        let pagesConfig = require('./pages.config.js')
        let pgTestConfig = Object.assign(new pagesConfig.PageConfig(), pagesConfig.default.data[2])
        console.log("LOG: ~ file: makeMdModules.spec.js ~ line 85 ~ it ~ pgTestConfig", pgTestConfig)
        let mdModule_PLS = new makeMdModules.MdModule(pgTestConfig)
        mdModule_PLS.loadArrayMdElems();
        mdModule_PLS.writeOutputMdFile(mdModule_PLS.getContent());
        mdModule_PLS.writeOutputDTSFile(mdModule_PLS.dtsInterface);
        console.log('write ok--> ', mdModule_PLS.getPath_OutputMdFile())
    })

    it('MAKE ALL Elements', () => {
        let pagesConfig = require('./pages.config.js')
        let makeMdModules = require('./makeMdModules.js')
        let generateId = pagesConfig.default.generateId // default = null
        //generateId = ['cusModalLogin']//forTest cusModalLogin index
        
        let allMdModule = new makeMdModules.AllMdModules(pagesConfig.default.data, generateId);
        allMdModule.writeOutputMdFile_All();
        //allMdModule.writeOutput_DTS_File(allMdModule.getDTSContent());
        //------ Target Md
        // let arrayTargetMdNames = ['index']
        // console.log(allMdModule.getDTSContent())
        
    })
})