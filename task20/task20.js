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

    //左侧入
    function leftPush(arr) {
        for (var i = 0; i < arr.length; i++) {
            dataList.unshift(arr[i]);
        }
        document.getElementById("input").value = "";
        render();
    }

    //右侧入
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

    //左侧出
    function leftPop() {
        if (!isEmpty()) {
            alert(parseInt(dataList.shift()));
            render();
        } else {
            alert("The queue is already empty!");
        }
    }

    //右侧出
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

    //为每个div添加点击删除事件
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

    addEventHandler(buttonList[0], "click", function () { leftPush(getInput()) });
    addEventHandler(buttonList[1], "click", function () { rightPush(getInput()) });
    addEventHandler(buttonList[2], "click", function () { leftPop() });
    addEventHandler(buttonList[3], "click", function () { rightPop() });
    addEventHandler(buttonList[5], "click", function () {
        var match = document.getElementById("search_input").value;
        render(match);
    });
}
