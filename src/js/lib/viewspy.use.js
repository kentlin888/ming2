let root = document.querySelector('#root');
let rect2 = document.querySelector('#rect2');
let viewspy = isScrolledIntoView(rect2)
let showstr = `isVisible:${viewspy.isVisible} - elemTop:${viewspy.elemTop} - elemBottom:${viewspy.elemBottom} - elemHeight:${viewspy.elemHeight} - overhang:${viewspy.overhang}`

root.textContent = showstr
window.addEventListener('scroll',(e) => {
    viewspy = isScrolledIntoView(rect2)
    showstr = `isVisible:${viewspy.isVisible} - elemTop:${viewspy.elemTop} - elemBottom:${viewspy.elemBottom} - elemHeight:${viewspy.elemHeight} - overhang:${viewspy.overhang}`
    root.textContent = showstr
})

function isScrolledIntoView(el) {
    //https://stackoverflow.com/questions/21561480/trigger-event-when-user-scroll-to-specific-element-with-jquery
    //https://stackoverflow.com/questions/487073/how-to-check-if-element-is-visible-after-scrolling
    // check for 75% visible
    let percentVisible = 0.75;
    let elemTop = el.getBoundingClientRect().top;

    let elemBottom = el.getBoundingClientRect().bottom;
    let elemHeight = el.getBoundingClientRect().height;
    let overhang = elemHeight * (1 - percentVisible);

    let isVisible = (elemTop >= -overhang) && (elemBottom <= window.innerHeight + overhang);
    return {
        isVisible,
        elemTop,
        elemBottom,
        elemHeight,
        overhang
    }
}