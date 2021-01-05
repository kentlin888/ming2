
import 'selenium-webdriver';


//let webdriver = require('selenium-webdriver')
module 'selenium-webdriver' {
    interface WebElement {
        jsReplaceText:(text:string)=>void;
        jsGetInputValue:()=>string;
    }
    interface By{
        findElement:()=>WebElement;
        until_assert_elementTextIs(text:string, elemTimeout:number);
        until_assert_elementIsVisible(elemTimeout:number);
        waitUntil_ElementTextIs(text:string, elemTimeout:number);
        waitUntil_ElementIsVisible(elemTimeout:number);
        jsReplaceText:(text:string)=>void;
        jsGetInputValue:()=>any;
    }
}
