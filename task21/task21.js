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

function CreateList(container, isDelDiv) {
    this.queue = [];

    this.render = function () {
        var str = '';
        this.queue.forEach(function (t) {
            if (t === '' || t === ',' || t === '，') {
                return ;
            }
            str += '<div>' + t + '</div>';
        })
        container.innerHTML = str;
        if(isDelDiv) addDivDelEvent(this, container);
    }

    this.deleteID = function (id) {
        this.queue.splice(id, 1);
        this.render();
    }
}

CreateList.prototype.rightPush = function (str) {
    this.queue.push(str);
    this.render();
}

CreateList.prototype.leftPop = function () {
    this.queue.shift();
    this.render();
}

addDivDelEvent = function (queue, container) {
    var temp = [];
    for (var cur = 0; cur < container.childNodes.length; cur++) {
        temp.push(container.childNodes[cur].innerHTML);
        addEventHandler(container.childNodes[cur], "click", function (cur) {
            return function () { return queue.deleteID(cur) };
        }(cur));
        addEventHandler(container.childNodes[cur], "mouseover", function (cur) {
            return function () {
                container.childNodes[cur].style.background = "red";
                container.childNodes[cur].innerHTML = "删除" + temp[cur] + "?";
            };
        }(cur));
        addEventHandler(container.childNodes[cur], "mouseout", function (cur) {
            return function () {
                container.childNodes[cur].style.background = "#78BCFB";
                container.childNodes[cur].innerHTML = temp[cur];
            };
        }(cur));
    }
}

function splitInput(str) {
    var inputArray = str.trim().split(/[,，;；、。.\s\n]+/);
    return inputArray;
}

window.onload = function () {
    var tagInput = document.getElementById("tag_input"),
        tagList = document.getElementById("tag_list"),
        hobbyInput = document.getElementById("hobby_input"),
        hobbyList = document.getElementById("hobby_list"),
        hobbyBtn = document.getElementById("hobby_btn");

    var tagObj = new CreateList(tagList, true),
        hobbyObj = new CreateList(hobbyList, false);

    function showTag() {
        if (/[,，;；、\s\n]+/.test(tagInput.value) || event.keyCode == 13) {
            var data = splitInput(tagInput.value),
                newTag = data[0];
            if (tagObj.queue.indexOf(newTag) === -1) {
                tagObj.rightPush(newTag);
                if (tagObj.queue.length > 10) {
                    tagObj.leftPop();
                }
            }
            tagObj.render();
            tagInput.value = "";
        }
    }

    function showHobby() {
        var data = splitInput(hobbyInput.value);
        data.forEach(function (t) {
            if (hobbyObj.queue.indexOf(t) === -1) {
                hobbyObj.rightPush(t);
                if (hobbyObj.queue.length > 10) {
                    hobbyObj.leftPop();
                }
            }
            hobbyObj.render();
            hobbyInput.value = "";
        })
    }

    addEventHandler(tagInput, "keyup", showTag);
    addEventHandler(hobbyBtn, "click", showHobby);
}



