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

window.onload = function () {
    var dataList = [];
    var buttonList = document.querySelectorAll("input");

    function render(match) {
        var container = document.getElementById("container");
        var str = "";
        for (var i = 0; i < dataList.length; i++) {
            var r = dataList[i];
            if (match != null && match.length > 0) {
                r = r.replace(new RegExp(match, "g"), "<span class='select'>" + match + "</span>");
            }
            str += "<div>" + r + "</div>";
        }
        container.innerHTML = str;
        addDivDelEvent();
    }

    function leftPush(arr) {
        for (var i = 0; i < arr.length; i++) {
            dataList.unshift(arr[i]);
        }
        document.getElementById("input").value = "";
        render();
    }

    function rightPush(arr) {
        for (var i = 0; i < arr.length; i++) {
            dataList.push(arr[i]);
        }
        document.getElementById("input").value = "";
        render();
    }

    function isEmpty() {
        return (dataList.length == 0);
    }

    function leftPop() {
        if (!isEmpty()) {
            alert(parseInt(dataList.shift()));
            render();
        } else {
            alert("The queue is already empty!");
        }
    }

    function rightPop() {
        if (!isEmpty()) {
            alert(parseInt(dataList.pop()));
            render();
        } else {
            alert("The queue is already empty!");
        }
    }

    function deleteID(id) {
        console.log(id);
        dataList.splice(id, 1);
        render();
    }

    function addDivDelEvent() {
        var container = document.getElementById("container");
        for (var cur = 0; cur < container.childNodes.length; cur++) {
            addEventHandler(container.childNodes[cur], "click", function (cur) {
                return function () { return deleteID(cur) };
            }(cur));
        }
    }

    function getInput() {
        var input = document.getElementById("input");
        return input.value.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function (t) { return t !== ''; });
    }
    
    function isMatch(keyword, test) {
        var reg = new RegExp(keyword);
        if (test.match(reg)) return true;
    }
    
    function showHigh(highLight) {
        
    }
    
    function search() {
        var keyword = document.getElementById("search_input");
        if(keyword.length === 0) return;
        var highLight = [];
        for (var i = 0; i < dataList.length; i++) {
            if (isMatch(keyword, dataList[i])) {
                highLight.push(i);
            }
        }
        render();
        showHigh(highLight);
        document.getElementById("search_input").value = "";
    }

    addEventHandler(buttonList[0], "click", function () { leftPush(getInput()) });
    addEventHandler(buttonList[1], "click", function () { rightPush(getInput()) });
    addEventHandler(buttonList[2], "click", function () { leftPop() });
    addEventHandler(buttonList[3], "click", function () { rightPop() });
    addEventHandler(buttonList[5], "click", function () {
        var match = document.getElementById("search_input").value;
        render(match);
    });
}
