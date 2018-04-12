/**
 * 跨浏览器实现事件绑定
 * @param ele
 * @param event
 * @param handler
 */
function addEventHandler(ele, event, handler) {
    if (ele.addEventListener) {
        ele.addEventListener(event, handler, false);
    }else if (ele.attachEvent) {
        ele.attachEvent('on' + event, handler);
    }else {
        ele['on' + event] = handler;
    }
}

/**
 * 跨浏览器取消事件绑定
 * @param ele
 * @param event
 * @param handler
 */
function removeEventHandler(ele, event, handler) {
    if (ele.removeEventListener) {
        ele.removeEventListener(event, handler, false);
    }else if (ele.detachEvent) {
        ele.detachEvent('on' + event, handler);
    }else {
        ele['on' + event] = null;
    }
}