function isScrolledIntoView(el) {
    //https://stackoverflow.com/questions/21561480/trigger-event-when-user-scroll-to-specific-element-with-jquery
    //https://stackoverflow.com/questions/487073/how-to-check-if-element-is-visible-after-scrolling
    // check for 75% visible
    var percentVisible = 0.75;
    var elemTop = el.getBoundingClientRect().top;

    var elemBottom = el.getBoundingClientRect().bottom;
    var elemHeight = el.getBoundingClientRect().height;
    var overhang = elemHeight * (1 - percentVisible);

    var isVisible = (elemTop >= -overhang) && (elemBottom <= window.innerHeight + overhang);
    return isVisible;
}