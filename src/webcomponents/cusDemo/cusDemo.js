export default class extends HTMLElement{
    /**
     * 
     * @param {HTMLElement} templateContent 
     */
    constructor(templateContent){
        super();
        if(!templateContent)
        throw new Error('Argument dose not exist.');
        this.appendChild(templateContent);
    }
    /**
     * 
     * @param {string} targetEle 
     */
    scrollToElem(targetEle){
        let ele = this.querySelector(targetEle);
        ele.scrollIntoView();
    }
}