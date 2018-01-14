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
    var nodeList = [],
        timer = null,
        head = null,
        text = "",
        found = false,
        btns = document.querySelectorAll("input"),
        root = document.querySelector(".one"),
        input = btns[0],
        DFSBtn = btns[1],
        BFSBtn = btns[2];

    addEventHandler(DFSBtn, "click", function () {
        reset();
        DFS(root);
        render();
    });
    addEventHandler(BFSBtn, "click", function () {
        reset();
        BFS(root);
        render();
    });
    addEventHandler(input, "focus", function () {
        this.value = "";
    })


    function DFS(node) {
        if (node) {
            nodeList.push(node);
            for (var i = 0; i < node.children.length; i++) {
                DFS(node.children[i], nodeList);
            }
        }
    }

    function BFS(node) {
        var queue = [];
        var p = null;
        if(node) {
            queue.push(node);
        }
        while (queue.length > 0) {
            p = queue.shift();
            nodeList.push(p);
            if (p.firstElementChild) {
                queue.push(p.firstElementChild);
                p = p.firstElementChild;
                while (p.nextElementSibling) {
                    queue.push(p.nextElementSibling);
                    p = p.nextElementSibling;
                }
            }
        }
    }

    function reset() {
        if (nodeList.length > 0) {
            text = "";
            found = false;
            nodeList = [];
            clearTimeout(timer);
            head.style.backgroundColor = "#fff";
        }

    }

    function trim(str) {
        return str.replace(/^\s+|\s+$/g, "");
    }

    function render() {
        if (input.value !== "") {
            searchShow();
        } else {
            onlyShow();
        }
    }

    function searchShow() {
        if (nodeList.length === 0 && !found) {
            alert("没有找到");
        }
        head = nodeList.shift(); //出队
        if (head) {
            text = head.firstChild.nodeValue;
            if (trim(text) === input.value) {
                head.style.backgroundColor = "red";
                found = true;
                return;
            } else {
                head.style.backgroundColor = "blue";//显示蓝色
                timer = setTimeout(function () {
                    head.style.backgroundColor = "#fff";//1秒后节点的蓝色变为白色
                    searchShow(); //递归调用，使要显示的节点不停出队显示，直至为空
                }, 800);
            }
        }
    }

    function onlyShow() {
        head = nodeList.shift();
        if (head) {
            head.style.backgroundColor = "blue";
            timer = setTimeout(function () {
                head.style.backgroundColor = "#fff";
                onlyShow()
            }, 800);
        }
    }
};