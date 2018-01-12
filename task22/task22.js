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

(function () {
    var treeWalker = new TreeWalker(),
        btns = document.querySelectorAll("input"),
        preBtn = btns[0],
        inBtn = btns[1],
        postBtn = btns[2],
        root = document.querySelector(".root");

    addEventHandler(preBtn, "click", function () {
        treeWalker.preOrder(root);
        treeWalker.animation();
    });
    addEventHandler(inBtn, "click", function () {
        treeWalker.inOrder(root);
        treeWalker.animation();
    });
    addEventHandler(postBtn, "click", function () {
        treeWalker.postOrder(root);
        treeWalker.animation();
    });
})();

function TreeWalker() {
    this.stack = [];
    this.isWalking = false;
}

TreeWalker.prototype.preOrder = function (node) {
    if (!(node == null)) {
        this.stack.push(node);
        this.preOrder(node.firstElementChild);
        this.preOrder(node.lastElementChild);
    }
};

TreeWalker.prototype.inOrder = function (node) {
    if (!(node == null)) {
        this.inOrder(node.firstElementChild);
        this.stack.push(node);
        this.inOrder(node.lastElementChild);
    }
};

TreeWalker.prototype.postOrder = function (node) {
    if (!(node == null)) {
        this.postOrder(node.firstElementChild);
        this.postOrder(node.lastElementChild);
        this.stack.push(node);
    }
};

TreeWalker.prototype.animation = function () {
    var stack   = this.stack,
        iter    = 0,
        self    = this,
        timer;

    self.stack = [];
    if(!self.isWalking) {
        self.isWalking = true;
        stack[iter].style.backgroundColor = "blue";
        timer = setInterval(function() {
            if(iter == stack.length-1) {
                stack[iter].style.backgroundColor = "#FFFFFF";
                self.isWalking = false;
                clearInterval(timer);
            } else {
                ++iter;
                stack[iter-1].style.backgroundColor = "#FFFFFF";
                stack[iter].style.backgroundColor = "blue";
            }
        }, 500);
    }

};














