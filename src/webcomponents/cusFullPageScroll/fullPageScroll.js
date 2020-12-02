export default class extends HTMLElement{
    constructor(templateContent){
        super(templateContent);
        if(!templateContent)
        throw new Error('Argument dose not exist.');
        this.appendChild(templateContent);
    }
    scrollToElem(targetEle){
        let ele = this.querySelector(targetEle);
        ele.scrollIntoView();
    }
}