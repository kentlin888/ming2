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
        let getArrayTestId = makeMdModules.MdModule.getArray_DataTestId(pathHtm)
        let expectArray = ["btnLogin", "span1", "alink1"]
        console.log(JSON.stringify(getArrayTestId))
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

    it('MdModule', () => {
        let makeMdModules = require('./makeMdModules.js')
        let pagesConfig = require('./pages.config.js')
        let pgTestConfig = Object.assign(new pagesConfig.PageConfig(), pagesConfig.data[0])
        let mdModule_ForTest = new makeMdModules.MdModule(pgTestConfig)
        mdModule_ForTest.loadArrayMdElems();
        mdModule_ForTest.writeOutputMdFile(mdModule_ForTest.getContent());
        console.log('write ok--> ', mdModule_ForTest.getPath_OutputMdFile())
    })

    it('MAKE ALL Elements', () => {
        let pagesConfig = require('./pages.config.js')
        let makeMdModules = require('./makeMdModules.js')
        let generateId = pagesConfig.generateId // default = null
        //generateId = ['cusModalLogin']//forTest cusModalLogin index
        
        let allMdModule = new makeMdModules.AllMdModules(pagesConfig.data, generateId);
        allMdModule.writeOutputMdFile_All();
        allMdModule.writeOutput_DTS_File(allMdModule.getDTSContent());
        //------ Target Md
        // let arrayTargetMdNames = ['index']
        // console.log(allMdModule.getDTSContent())
        
    })
})