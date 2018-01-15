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
        ele.attachEvent("on" + event, handler);
    }else {
        ele["on" + event] = handler;
    }
}

var msg = document.getElementById("msg");
var btn = document.getElementById("btn");
var tip = document.getElementById("tip");

function validate() {
    var msgText = msg.value;
    var len = getLength(msgText);
    if (len == 0) {
        tip.innerHTML = "姓名不能为空";
        tip.style.color = "red";
        msg.style.border = "2px solid red";
    } else if (len >= 4 && len <= 16) {
        tip.innerHTML = "格式正确";
        tip.style.color = "lightgreen";
        msg.style.border = "2px solid lightgreen";
    } else {
        tip.innerHTML = "字符数应为4~16位";
        tip.style.color = "red";
        msg.style.border = "2px solid red";
    }
}

var getLength = function (str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
        var charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) {
            len += 1;
        } else {
            len += 2;
        }
    }
    return len;
};

addEventHandler(btn, "click", validate);