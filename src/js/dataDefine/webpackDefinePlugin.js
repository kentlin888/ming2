class WebpackDefinePlugin{
    constructor(devMode){
        this.devMode = devMode
    }
    devMode = true
    SOMETHING = JSON.stringify('this.some thing XXXX..........')
}
module.exports = WebpackDefinePlugin