/**
 * 
 * @param {string} newTagName 
 * @param {string} htmlContent
 */
export function useComponent(newTagName, htmlContent, compClass) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(htmlContent, 'text/html');
    const template = doc.querySelector('template');
    if (!template)
        throw new Error('error: webcomponent DOM element<template> not found.')
    const templateContent = template.content;
    customElements.define(newTagName, compClass);
    let ctor = customElements.get(newTagName);
    let rtnObject = {
        ctor: ctor,
        templateContent: templateContent
    }
    return rtnObject
}