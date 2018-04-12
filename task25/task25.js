//封装TreeNode

function TreeNode(obj) {
    this.parent = obj.parent;
    this.childs = obj.childs || [];
    this.data = obj.data || "";
    this.selfElement = obj.selfElement;
    this.selfElement.TreeNode = this;
}
//原型模式封装公共操作
TreeNode.prototype = {
    constructor: TreeNode,
    //解耦样式操作，四个参数表示是否改变箭头，可见性，改为高亮，改为普通
    render: function (arrow, visibility, toHighlight, deHighlight) {
        if (arguments.length < 3) {
            toHighlight = false;
            deHighlight = false;
        }
        if (arrow) {
            if (this.isLeaf()) { //叶子节点，设为空箭头
                this.selfElement.getElementsByClassName("arrow")[0].className = "arrow empty-arrow";
            } else if (this.isFolded()) { //折叠状态，设为右箭头
                this.selfElement.getElementsByClassName("arrow")[0].className = "arrow right-arrow";
            } else {
                this.selfElement.getElementsByClassName("arrow")[0].className = "arrow down-arrow";
            }
        }
        if (visibility) {
            if (this.selfElement.className.indexOf("nodebody-visible") == -1) {
                this.selfElement.className = this.selfElement.className.replace("hidden", "visible");
            } else {
                this.selfElement.className = this.selfElement.className.replace("visible", "hidden");
            }
        }
        if (toHighlight) {
            this.selfElement.getElementsByClassName("node-title")[0].className = "node-title node-title-highlight";
        }
        if (deHighlight) {
            this.selfElement.getElementsByClassName("node-title")[0].className = "node-title";
        }
    },
    //删除节点，DOM会自动递归删除子节点，TreeNode递归手动删除子节点
    deleteNode: function () {
        var i;
        if (!this.isLeaf()) {
            for (i = 0; i < this.childs; i++) {
                this.childs[i].deleteNode();
            }
        }
        this.parent.selfElement.removeChild(this.selfElement);
        for (i = 0; i < this.parent.childs.length; i++) {
            if (this.parent.childs[i] == this) {
                this.parent.childs.splice(i, 1);
                break;
            }
        }
        //调整父节点箭头样式
        this.parent.render(true, false);
    },
    //添加子节点
    addChild: function (text) {
        if (text == null) return this;
        if (text.trim() == "") {
            alert("节点内容不能为空");
            return this;
        }
        //先增加子节点，再渲染自身样式
        //若当前节点关闭，则将其展开
        if (!this.isLeaf() && this.isFolded()) {
            this.toggleFold();
        }
        //创建新的DOM节点并附加
        var newNode = document.createElement("div");
        newNode.className = "nodebody-visible";
        var newHeader = document.createElement("label");
        newHeader.className = "node-header";
        var newSymbol = document.createElement("div");
        newSymbol.className = "arrow empty-arrow";
        var newTitle = document.createElement("span");
        newTitle.className = "node-title";
        newTitle.innerHTML = text;
        var space = document.createElement("span");
        space.innerHTML = "&nbsp;&nbsp;";
        var newAdd = document.createElement("img");
        newAdd.className = "addIcon";
        newAdd.src = "images/add.png";
        var newDelete = document.createElement("img");
        newDelete.className = "deleteIcon";
        newDelete.src = "images/delete.png";
        newHeader.appendChild(newSymbol);
        newHeader.appendChild(newTitle);
        newHeader.appendChild(space);
        newHeader.appendChild(newAdd);
        newHeader.appendChild(newDelete);
        newNode.appendChild(newHeader);
        this.selfElement.appendChild(newNode);
        //创建对应的TreeNode对象并添加到子节点队列
        this.childs.push(new TreeNode({ parent: this, childs: [], data: text, selfElement: newNode }));
        //渲染自身样式
        this.render(true, false);
        return this;//返回自身，以便链式操作
    },
    //展开、收拢节点
    toggleFold: function () {
        if (this.isLeaf()) return this;
        //改变所有子节点的可见状态
        for (var i = 0; i < this.childs.length; i++) {
            this.childs[i].render(false, true);
        }
        //渲染本节点的箭头
        this.render(true, false);
        return this;
    },
    //判断是否为叶节点
    isLeaf: function () {
        return this.childs.length == 0;
    },
    //判断节点是否处于折叠状态
    isFolded: function () {
        if (this.isLeaf()) {
            return false;
        }
        if (this.childs[0].selfElement.className == "nodebody-visible") {
            return false;
        }
        return true;
    }
};

//事件绑定

//创建根节点对应的TreeNode对象
var root = new TreeNode({ parent: null, childs: [], data: "前端攻城狮", selfElement: document.getElementsByClassName("nodebody-visible")[0]});
//为root绑定事件代理，处理所有节点的点击事件
addEventHandler(root.selfElement, "click", function (e) {
    var target = e.target || e.srcElement;
    var domNode = target;
    while (domNode.className.indexOf("nodebody") == -1) { //找到类名含有nodebody前缀的DOM节点
        domNode = domNode.parentNode;
    }
    selectedNode = domNode.TreeNode; //获取DOM对象对应的TreeNode对象
    //如果点在节点文字或箭头上
    if (target.className.indexOf("node-title") != -1 || target.className.indexOf("arrow") != -1) {
        selectedNode.toggleFold();
    } else if (target.className == "addIcon") { //点在加号上
        selectedNode.addChild(prompt("请输入子节点的内容："));
    } else if (target.className == "deleteIcon") {
        selectedNode.deleteNode();
    }

});

//给root绑定广度优先搜索函数，无需访问DOM，返回一个搜索结果队列
root.search = function (query) {
    var resultList = [];
    //广度优先搜索
    var queue = [];
    var current = this;
    queue.push(current);
    while (queue.length > 0) {
        //从待访问队列取出队首节点访问，并将其所有子节点入队
        current = queue.shift();
        //还原当前节点颜色
        current.render(false, false, false, true);
        //读取当前节点data
        if (current.data == query) resultList.push(current);
        for (var i = 0; i < current.childs.length; i++) {
            queue.push(current.childs[i]);
        }
    }
    return resultList;
};

//搜索并显示结果
addEventHandler(document.getElementById("search"), "click", function () {
    var text = document.getElementById("searchText").value.trim();
    var result = document.getElementById("result");
    if (text == "") {
        result.innerHTML = "请输入查询内容！";
        return;
    }
    //执行搜索
    var resultList = root.search(text);
    //处理搜索结果
    if (resultList.length == 0) {
        result.innerHTML = "没有查询到符合条件的节点！";
    } else {
        result.innerHTML = "查询到" + resultList.length + "个符合条件的节点";
        //将所有节点沿途展开，结果节点加粗红色展示
        var pathNode;
        for (var x = 0; x < resultList.length; x++) {
            pathNode = resultList[x];
            pathNode.render(false, false, true, false);
            while (pathNode.parent != null) {
                if (pathNode.selfElement.className == "nodebody-hidden")
                    pathNode.parent.toggleFold();
                pathNode = pathNode.parent;
            }
        }
    }
});

//清除搜索结果
addEventHandler(document.getElementById("clear"), "click", function () {
   document.getElementById("searchText").value = "";
   root.search(null);
   document.getElementById("result").innerHTML = "";
});

//动态生成Demo树
root.addChild("技术").addChild("IT公司").addChild("谈笑风生");
root.childs[0].addChild("HTML5").addChild("CSS3").addChild("JavaScript").addChild("PHP").addChild("Node.JS").toggleFold();
root.childs[0].childs[4].addChild("JavaScript").toggleFold();
root.childs[1].addChild("百度").addChild("腾讯").addChild("大众点评").toggleFold();
root.childs[2].addChild("身经百战").addChild("学习一个").addChild("吟两句诗").toggleFold();
root.childs[2].childs[2].addChild("苟利国家生死以").toggleFold();
//初始化查询Demo值
document.getElementById("searchText").value = "JavaScript";












