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
    var sizeFactor = 5;
    var renderInterval = 150;
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
            each(this.str, function (item) { str += ("<div class='red' style='height:" + parseInt(item) * sizeFactor + "px'>"+ parseInt(item) + "</div>")});
            container.innerHTML = str;
            addDivDelEvent();
        },
        deleteID: function (id) {
            console.log(id);
            this.str.splice(id, 1);
            this.paint();
        },
        randomFN: function () {
            this.str = [];
            for (var i = 0; i < 50; i++) {
                this.str.push(Math.floor(Math.random() * 91 + 10));
            }
            this.paint();
        }
        // mysort: function () {
        //     var len = this.str.length;
        //     var tmp;
        //     for (var i = 0; i < len; i++) {
        //         for (var j = 0; j < len - i - 1; j++) {
        //             if (this.str[j] > this.str[j + 1]) {
        //                 tmp = this.str[j];
        //                 this.str[j] = this.str[j + 1];
        //                 this.str[j + 1] = tmp;
        //                 this.paint();
        //             }
        //         }
        //     }
        // }
    }

    function addDivDelEvent() {
        for (var cur = 0; cur < container.childNodes.length; cur++) {
            addEventHandler(container.childNodes[cur], "click", function (cur) {
                return function () { return queue.deleteID(cur) };
            }(cur));
        }
    }

    function getInput() {
        var input = buttonList[0].value;
        if (!validateStr(input)) {
            alert("input error");
            throw new Error("input error");
        }
        if (queue.str.length > 60) {
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

    function swap(ele1, ele2) {
        var temp = ele1.offsetHeight;
        var text = ele1.innerText;

        ele1.offsetHeight = ele2.offsetHeight;
        ele1.style.height = ele2.offsetHeight + "px";
        ele1.innerText = ele2.innerText;
        ele2.offsetHeight = temp;
        ele2.style.height = temp + "px";
        ele2.innerText = text;
    };

    function bubbleSort(container, renderInterval) {
        var eles = container.querySelectorAll("div"),
            len  = eles.length, i, j = 0, timer;

        i = len - 1;
        timer = setInterval(function() {
            if(i < 1) {
                clearInterval(timer);
            }
            if(j == i) {
                --i;
                j = 0;
            }
            if (eles[j].offsetHeight > eles[j+1].offsetHeight) {
                swap(eles[j], eles[j+1]);
            }
            ++j;
        }, renderInterval);
    };

    addEventHandler(buttonList[1], "click", function () { queue.leftPush(getInput()) });
    addEventHandler(buttonList[2], "click", function () { queue.rightPush(getInput()) });
    addEventHandler(buttonList[3], "click", function () { queue.leftPop() });
    addEventHandler(buttonList[4], "click", function () { queue.rightPop() });
    addEventHandler(buttonList[5], "click", function () {
        renderInterval = buttonList[7].value || 150;
        //queue.mysort(renderInterval);
        bubbleSort(container, renderInterval);
    });
    addEventHandler(buttonList[6], "click", function () { queue.randomFN() });
}