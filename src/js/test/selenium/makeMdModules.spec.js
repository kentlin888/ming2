describe('makeMdModules.spec.js', () => {
    let chai = require('chai')
    let _=require('lodash')
    it('MdElem', () => {
        let config = {
            btnLogin: {
                byCss: "[data-testid='btnLogin']",
                imgName: "btnLogin.png", //default = imgs/[key].png
            },
            iptSignInEmail: {
                byCss: "[data-testid='iptSignInEmail']",
                imgName: "iptSignInEmail.png", //default = imgs/[key].png
            },
        }
        let expect0 = {
            id: 'btnLogin',
            byCss: "[data-testid='btnLogin']",
            imgName: 'btnLogin.png'
        }
        let arrayObjEntry = Object.entries(config)
        let makeMdElements = require('./makeMdModules.js')
        let a0 = new makeMdElements.MdElem(arrayObjEntry[0])
        let plainA0 = Object.assign({},a0)
        let result = _.isEqual(expect0, plainA0)
        console.log("LOG: ~ file: makeMdElements.spec.js ~ line 24 ~ it ~ plainA0", plainA0)
        chai.assert(result)
    })
    
    it('MdModule',() => {
        let makeMdModules = require('./makeMdModules.js')
        let login = require('./Login/login.md')
        let mdModule = new makeMdModules.MdModule(login)
        
        let fs = require('fs')
        let path = require('path')
        let content = mdModule.getContent()
        let pathSave = path.join(__dirname,'Login','login2.js')
        fs.writeFileSync(pathSave, content)
    })

    it('make all elements',() => {
        let makeMdModules = require('./makeMdModules.js')
        let allMdModule = new makeMdModules.AllMdModule();
        let fs = require('fs')
        let path = require('path')
        let pathBackupFolder = path.join(__dirname, 'backup')
        let pathCpSource=  ''
        let pathCpBackup=  ''
        //process MdModules
        allMdModule.pathCpSource = path.join(__dirname,'../global.d.ts')
        allMdModule.pathCpBackup = path.join(pathBackupFolder, 'global.d.ts')
        //------
        let mdModule
        let configModule
        configModule = require('./Login/login.md')
        mdModule = new makeMdModules.MdModule('login',configModule)
        mdModule.pathCpSource = path.join(__dirname, './Login/login.md')
        mdModule.pathCpBackup = path.join(pathBackupFolder, 'login.md')
        allMdModule.addMdModule(mdModule)
        //------
        configModule = require('./TDemo/tDemo.md')
        mdModule = new makeMdModules.MdModule('tDemo',configModule)
        mdModule.pathCpSource = path.join(__dirname, './TDemo/tDemo.md')
        mdModule.pathCpBackup = path.join(pathBackupFolder, 'tDemo.md')
        allMdModule.addMdModule(mdModule)
        //------
        //------
        let arrayTargetMdNames = ['login']

        let arrayTargetMDs = allMdModule.arrayMdModules.filter((/**@type {makeMdModules.MdModule}*/mdModule) => {
            if(arrayTargetMdNames.includes(mdModule.mdName))
                return true;
        })
        //backup files
        allMdModule.backupFile(fs)
        arrayTargetMDs.forEach((/**@type {makeMdModules.MdModule}*/mdModule) => {
            mdModule.backupFile(fs);
        })
        //rewrite files
        allMdModule.rewriteFile(fs, allMdModule.getDTSContent())
        arrayTargetMDs.forEach((/**@type {makeMdModules.MdModule}*/mdModule) => {
            mdModule.rewriteFile(fs, mdModule.getContent())
        })

        // allMdModule.arrayMdModules.forEach((/**@type {makeMdModules.MdModule} */ mdModule) => {
        //     let content = mdModule.getContent()
        //     let pathSave = mdModule.pathCpSource
        //     fs.writeFileSync(pathSave, content)
        // })
        
        
        
        //allMdModule.getDTSContent()
        
    })
})