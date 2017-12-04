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

function each(arr, fn) {
    for(var cur = 0; cur < arr.length; cur++) {
        fn(arr[cur], cur);
    }
}

window.onload = function () {
    var container = document.getElementById("container");
    var buttonList = document.getElementsByTagName("input");

    var queue = {
        str: [],
        leftPush: function (num) {
            this.str.unshift(num);
            this.paint();
        },
        rightPush: function (num) {
            this.str.push(num);
            this.paint();
        },
        isEmpty: function () {
            return (this.str.length == 0);
        },
        leftPop: function () {
            if (!this.isEmpty()) {
                alert(parseInt(this.str.shift()));
                this.paint();
            } else {
                alert("The queue is already empty!");
            }
        },
        rightPop: function () {
            if (!this.isEmpty()) {
                alert(parseInt(this.str.pop()));
                this.paint();
            } else {
                alert("The queue is already empty!");
            }
        },
        paint: function () {
            var str = "";
            each(this.str, function (item) { str += ("<div>" + parseInt(item) + "</div>")});
            container.innerHTML = str;
            addDivDelEvent();
        },
        deleteID: function (id) {
            console.log(id);
            this.str.splice(id, 1);
            this.paint();
        }
    }
    
    function addDivDelEvent() {
        for (var cur = 0; cur < container.childNodes.length; cur++) {
            addEventHandler(container.childNodes[cur], "click", function (cur) {
                return function () { return queue.deleteID(cur) };
            }(cur));
        }
    }

    addEventHandler(buttonList[1], "click", function () {
        var input = buttonList[0].value;
        if ((/^[0-9]+$/).test(input)) {
            queue.leftPush(input);
        } else {
            alert("Please enter an integer!");
        }
    });

    addEventHandler(buttonList[2], "click", function () {
        var input = buttonList[0].value;
        if ((/^[0-9]+$/).test(input)) {
            queue.rightPush(input);
        } else {
            alert("Please enter an integer!");
        }
    });

    addEventHandler(buttonList[3], "click", function () { queue.leftPop() });
    addEventHandler(buttonList[4], "click", function () { queue.rightPop() });
}