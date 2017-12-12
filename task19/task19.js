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
    var sizeFactor = 5;
    var dataList = [];
    var state = [];
    var buttonList = document.querySelectorAll("input");
    var renderInterval = 150;

    function render() {
        var container = document.getElementById("container");
        container.innerHTML = "";
        for (var i = 0; i < dataList.length; i++) {
            container.innerHTML += "<div>" + dataList[i] + "</div>";
            var dataDiv = container.querySelectorAll("div");
            dataDiv[i].style.height = dataList[i] * sizeFactor + "px";
        }
        addDivDelEvent();
    }
    
    function leftPush(num) {
        dataList.unshift(num);
        render();
    }
    
    function rightPush(num) {
        dataList.push(num);
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

    function randomFN() {
        dataList = [];
        for (var i = 0; i < 50; i++) {
            dataList.push(Math.floor(Math.random() * 91 + 10));
            render();
        }
    }

    function getInput() {
        var input = buttonList[0].value;
        if (!validateStr(input)) {
            alert("input error");
            throw new Error("input error");
        }
        if (dataList.length > 60) {
            alert("no room");
            throw new Error("no room");
        }
        var val = parseInt(input);
        if (val > 100 || val < 10) {
            alert("out of range");
            throw new Error('');
        }
        return val;
    }

    function validateStr(input) {
        return (/^[0-9]+$/).test(input);
    }

    function mysort(arr) {
        var len = arr.length;
            var tmp;
            for (var i = 0; i < len; i++) {
                for (var j = 0; j < len - i - 1; j++) {
                    if (arr[j] > arr[j + 1]) {
                        tmp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = tmp;
                        state.push(JSON.parse(JSON.stringify(arr)))
                    }
                }
            }
    }



    addEventHandler(buttonList[1], "click", function () { leftPush(getInput()) });
    addEventHandler(buttonList[2], "click", function () { rightPush(getInput()) });
    addEventHandler(buttonList[3], "click", function () { leftPop() });
    addEventHandler(buttonList[4], "click", function () { rightPop() });
    addEventHandler(buttonList[5], "click", function () {
        renderInterval = buttonList[7].value || 150;
        mysort(dataList);
        var timer = setInterval(draw, renderInterval);
        //bubbleSort(container, renderInterval);
        function draw() {
            var s;
            s = state.shift();
            var container = document.getElementById("container");
            container.innerHTML = "";
            if (s !== undefined) {
                for (var i = 0; i < s.length; i++) {
                    container.innerHTML += "<div>" + s[i] + "</div>";
                    var dataDiv = container.querySelectorAll("div");
                    dataDiv[i].style.height = s[i] * sizeFactor + "px";
                }
                addDivDelEvent();
            } else {
                render();
                window.clearInterval(timer);
            }
        }
    });
    addEventHandler(buttonList[6], "click", function () { randomFN() });

}
