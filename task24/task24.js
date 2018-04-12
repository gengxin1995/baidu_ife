window.onload = function () {
    var nodeList = [],
        timer = null,
        head = null,
        text = "",
        found = false,
        inputs = document.querySelectorAll("input"),
        root = document.querySelector(".one"),
        searchText = inputs[0],
        DFSBtn = inputs[1],
        BFSBtn = inputs[2],
        delBtn = inputs[3],
        insertText = inputs[4],
        insertBtn = inputs[5];

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
    addEventHandler(searchText, "focus", function () {
        this.value = "";
    });
    addEventHandler(delBtn, "click", function () {
        reset();
        deleteNode();
    });
    addEventHandler(insertBtn, "click", function () {
        addNode();
    });
    addEventHandler(insertText, "focus", function () {
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
        var allDiv = document.querySelectorAll("div");

        for (var i = 0; i < allDiv.length; i++) {
            allDiv[i].style.backgroundColor = "#fff";
        }

        text = "";
        found = false;
        nodeList = [];
        clearTimeout(timer);
    }

    function trim(str) {
        return str.replace(/^\s+|\s+$/g, "");
    }

    function render() {
        if (searchText.value !== "") {
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
            if (trim(text) === searchText.value) {
                head.style.backgroundColor = "red";
                found = true;
                return;
            } else {
                head.style.backgroundColor = "blue";//显示蓝色
                timer = setTimeout(function () {
                    head.style.backgroundColor = "#fff";
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

    //选中节点
    var selectDiv;
    var levels = document.getElementById("container").querySelectorAll("div");
    for (var i = 0; i < levels.length; i++) {
        levels[i].onclick = function (e) {
            reset();
            this.style.backgroundColor = "#fef9d1";
            e.stopPropagation();
            selectDiv = this;
        }
    }

    //删除选中节点及其子节点
    function deleteNode() {
        if (selectDiv === undefined) {
            alert("请选中要删除的节点");
        } else {
            var parent = selectDiv.parentNode;
            parent.removeChild(selectDiv);
        }
    }

    //在选中节点下增加子节点
    function addNode() {
        var text = insertText.value;
        if (text === "") {
            alert("请填写新增节点的内容");
        } else if (selectDiv === undefined) {
            alert("请选中要操作的节点");
        } else {
            var newDiv = document.createElement("div");
            newDiv.innerHTML = text;
            var className = selectDiv.className;
            console.log(className);
            if (className === "one") {
                newDiv.className = "two";
            } else if (className === "two") {
                newDiv.className = "three";
            } else if (className === "three") {
                newDiv.className = "four";
            } else if (className === "four") {
                newDiv.className = "five";
            } else {
                newDiv.className = "six";
            }
            selectDiv.appendChild(newDiv);

            //更新点击事件
            var levels = document.getElementById("container").querySelectorAll("div");
            for (var i = 0; i < levels.length; i++) {
                levels[i].onclick = function (e) {
                    reset();
                    this.style.backgroundColor = "#fef9d1";
                    e.stopPropagation();
                    selectDiv = this;
                }
            }
        }
    }
};