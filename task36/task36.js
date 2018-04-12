(function () {
    var tb = document.querySelector('#background');

    for (var i = 0; i < 11; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 11; j++) {
            var td = document.createElement('td');
            tr.appendChild(td);
            if (i == 0 && j > 0) {
                td.innerHTML = j;
            }
            if (i > 0 && j == 0) {
                td.innerHTML = i;
            }
        }
        tb.appendChild(tr);
    }
})();

(function () {
    var timer = null;
    var queue = [];

    // 获取HTML元素
    var square = document.getElementById('square');
    var btnRun = document.getElementById('run');

    var cmdInput = document.getElementById('command-input');
    var cmdRow = document.getElementById('command-row');

    var row = document.getElementsByTagName('tr');

    var pos = {
        X: 6,	// X坐标 1-10
        Y: 6,	// Y坐标 1-10
        face: 0	// 方向 0: 上, 1: 右, 2: 下, 3: 左;
    };

    addEventHandler(btnRun, 'click', getCommend);

    addEventHandler(document.getElementById('refresh'), 'click', clearCommend);

    addEventHandler(document.getElementById('random'), 'click', randomCreateWall);

    addEventHandler(cmdInput, 'scroll', syncScroll);

    addEventHandler(cmdInput, 'keydown', function () {
        setTimeout(function () {
            var input = cmdInput.value;
            input.match(/\n/g) ? updateLineNumber(input.match(/\n/g).length + 1) : updateLineNumber(1);
            syncScroll();
        }, 0);
    });
    
    function getWallPos() {
        var x = pos.X;
        var y = pos.Y;
        switch (pos.face) {
            case 0:
                y--;
                break;
            case 1:
                x++;
                break;
            case 2:
                y++
                break;
            case 3:
                x--;
                break;
        }
        return [x, y];
    }
    
    function brushWall(color, index) {
        if (index[0] >= 1 && index[1] >= 1 && index[0] <= 10 && index[1] <= 10 && row[index[1]].childNodes[index[0]].className == 'wall') {
            row[index[1]].childNodes[index[0]].style.background = color;
        } else {
            console.log('当前位置不存在墙，刷墙失败！');
        }
    }

    function buildWall(index) {
        if (index[0] < 1 && index[1] < 1 && index[0] > 10 && index[1] > 10) {
            console.log("已到达边缘，不能造墙！");
        } else if (row[index[1]].childNodes[index[0]].className == 'wall') {
            console.log("当前位置已存在墙！");
        } else {
            row[index[1]].childNodes[index[0]].className = 'wall';
        }
    }

    function randomCreateWall() {
        var row = document.getElementsByTagName('tr');
        for (var i = 1; i < row.length; i++) {
            for (var j = 1; j < row[i].childNodes.length; j++) {
                row[i].childNodes[j].className = '';
                row[i].childNodes[j].style.background = '';
            }
        }

        //随机生成的墙的总数不超过20
        var number = Math.ceil(Math.random() * 10 + 10);
        while (number) {
            var x = Math.ceil(Math.random() * 10);
            var y = Math.ceil(Math.random() * 10);
            if (x == pos.X || y == pos.Y) continue;
            row[x].childNodes[y].className = 'wall';
            number--;
        }
    }

    function clearCommend() {
        cmdInput.value = '';
        cmdRow.innerHTML = '';
    }

    function getCommend() {
        var inputValue = (cmdInput.value).toLowerCase();
        var inputArray = inputValue.split('\n');
        for (var cur = 0; cur < inputArray.length; cur++) {
            if (/\d+/.test(inputArray[cur]) && !(/tun/.test(inputArray[cur])) && !(/build/.test(inputArray[cur])) && !(/bru/.test(inputArray[cur])) && !(/mov to/.test(inputArray[cur]))) {
                for (var i = 0; i < inputArray[cur].match(/\d+/); i++) {
                    move(inputArray[cur].replace(/\s+\d+\s*/g, ''));
                }
            } else {
                move(inputArray[cur]);
            }
        }
    }

    function updateLineNumber(number) {
        cmdRow.innerHTML = '';
        for (var cur = 0; cur < number; cur++) {
            var li = document.createElement('li');
            li.className = 'line';
            li.style.height = '14px';
            li.style.fontSize = '14px';
            li.style.marginTop = '0px';
            var text = document.createTextNode(cur + 1);
            li.appendChild(text);
            cmdRow.appendChild(li);
        }
    }

    function syncScroll() {
        var lineObj = document.getElementsByClassName('line');
        lineObj[0].style.marginTop = -cmdInput.scrollTop + 'px';
    }

    function move(cmd) {
        if (cmd) {
            queue.push(cmd);
        }
        if (timer) {
            return false;
        } else {
            return timer = setTimeout(function () {
                clearTimeout(timer);
                timer = null;
                var cur = queue.shift().trim();
                if (/bru/.test(cur)) {
                    var str = cur.split(' ');
                    cur = 'wrong';
                    if (str.length <= 2) {
                        cur = 'bru';
                        var key = str[1];
                    }
                }
                if (/mov to/.test(cur) && cur.match(/\d+/g) && cur.match(/\d+/g).length == 2) {
                    var end = cur.match(/\d+/g);
                    cur = 'mov to';
                }

                switch (cur) {
                    case 'go':
                        go();
                        break;
                    case 'tun lef':
                        pos.face--;
                        break;
                    case 'tun rig':
                        pos.face++;
                        break;
                    case 'tun bac':
                        pos.face += 2;
                        break;
                    case 'tra lef':
                        if (pos.X <= 1) {
                            console.log('已到达边缘，不能前进！');
                            return false;
                        } else if (row[pos.Y].childNodes[pos.X-1].className == 'wall') {
                            console.log('有墙，不能前进！');
                            return false;
                        } else {
                            pos.X--;
                        }
                        break;
                    case 'tra top':
                        if (pos.Y <= 1) {
                            console.log('已到达边缘，不能前进！');
                            return false;
                        } else if (row[pos.Y-1].childNodes[pos.X].className == 'wall') {
                            console.log('有墙，不能前进！');
                            return false;
                        } else {
                            pos.Y--;
                        }
                    case 'tra rig':
                        if (pos.X >= 10) {
                            console.log('已到达边缘，不能前进！');
                            return false;
                        } else if (row[pos.Y].childNodes[pos.X+1].className == 'wall') {
                            console.log('有墙，不能前进！');
                            return false;
                        } else {
                            pos.X++;
                        }
                        break;
                    case 'tra bot':
                        if (pos.Y >= 10) {
                            console.log('已到达边缘，不能前进！');
                            return false;
                        } else if (row[pos.Y+1].childNodes[pos.X].className == 'wall') {
                            console.log('有墙，不能前进！');
                            return false;
                        } else {
                            pos.Y++;
                        }
                        break;
                    case 'mov lef':
                        pos.face = 3;
                        go();
                        break;
                    case 'mov top':
                        pos.face = 0;
                        go();
                        break;
                    case 'mov rig':
                        pos.face = 1;
                        go();
                        break;
                    case 'mov bot':
                        pos.face = 2;
                        go();
                        break;
                    case 'build':
                        var index = getWallPos();
                        buildWall(index);
                        break;
                    case 'bru':
                        var index = getWallPos();
                        brushWall(key, index);
                        break;
                    case 'mov to':
                        var start = [pos.X, pos.Y];
                        BFS(start, end);
                        break;
                    default:
                        alert('请输入正确的指令');
                        throwError(cur);
                        queue = [];
                        break;
                }
                draw();
                if (queue.length) {
                    move();
                }
            }, 500)
        }


    }

    function throwError(error) {
        var lineObj = document.getElementsByClassName('line');
        var inputArray = cmdInput.value.split('\n');
        for (var cur = 0; cur < inputArray.length; cur++) {
            if (error == inputArray[cur].toLowerCase() || error == inputArray[cur].replace(/\s+\d+\s*/g, '').toLowerCase()) {
                lineObj[cur].style.backgroundColor = 'red';
            }
        }
    }

    function go() {
        var face_ = pos.face;
        face_ = face_ % 4 + (face_ % 4 < 0 ? 4 : 0);

        switch (face_) {
            case 0:
                if (pos.Y <= 1) {
                    console.log('已到达边缘，不能前进！');
                    return false;
                } else if (row[pos.Y-1].childNodes[pos.X].className == 'wall') {
                    console.log('有墙，不能前进！');
                    return false;
                } else {
                    pos.Y--;
                }
                break;
            case 1:
                if (pos.X >= 10) {
                    console.log('已到达边缘，不能前进！');
                    return false;
                } else if (row[pos.Y].childNodes[pos.X+1].className == 'wall') {
                    console.log('有墙，不能前进！');
                    return false;
                } else {
                    pos.X++;
                }
                break;
            case 2:
                if (pos.Y >= 10) {
                    console.log('已到达边缘，不能前进！');
                    return false;
                } else if (row[pos.Y+1].childNodes[pos.X].className == 'wall') {
                    console.log('有墙，不能前进！');
                    return false;
                } else {
                    pos.Y++;
                }
                break;
            case 3:
                if (pos.X <= 1) {
                    console.log('已到达边缘，不能前进！');
                    return false;
                } else if (row[pos.Y].childNodes[pos.X-1].className == 'wall') {
                    console.log('有墙，不能前进！');
                    return false;
                } else {
                    pos.X--;
                }
                break;
        }
    }


    function draw() {
        //if (pos.X <= 0 || pos.Y <= 0 || pos.X > 10 || pos.Y > 10) {
        //    return;
        //} else {
        square.style.top = pos.Y * 50 + 'px';
        square.style.left = pos.X * 50 + 'px';
        square.style.transform = square.style.webkitTransform = square.style.msTransform = 'rotate(' + (pos.face * 90) + 'deg)';
        //addEventHandler(square, 'webkitTransitionEnd', rect);
        //addEventHandler(square, 'transitionEnd', rect);
        //}
    }


    var row = document.getElementsByTagName('tr');

    function Position(x, y, lastPOS){
        this.X = x;
        this.Y = y;
        this.LastPOS = lastPOS;
    }

    Position.prototype.validate = function(curPos, queue, closedQ) {
        if (curPos.X > 0 && curPos.X <= 10 && curPos.Y > 0 && curPos.Y <= 10 && (row[curPos.Y]).childNodes[curPos.X].className == '' && !queue.has(curPos) && !closedQ.has(curPos)) {
            return true;
        }
        return false;
    }

    Position.prototype.Up = function(queue,closedQ) {
        var cur = new Position(this.X, this.Y - 1);
        if (this.validate(cur, queue, closedQ)) {
            cur.LastPOS = this;
            return cur;
        }
        return undefined;
    }


    Position.prototype.Down = function(queue,closedQ) {
        var cur = new Position(this.X, this.Y + 1);
        if (this.validate(cur, queue, closedQ)) {
            cur.LastPOS = this;
            return cur;
        }
        return undefined;
    }

    Position.prototype.Left = function(queue,closedQ) {
        var cur = new Position(this.X - 1, this.Y);
        if (this.validate(cur, queue, closedQ)) {
            cur.LastPOS = this;
            return cur;
        }
        return undefined;
    }

    Position.prototype.Right = function(queue,closedQ) {
        var cur = new Position(this.X + 1, this.Y);
        if (this.validate(cur, queue, closedQ)) {
            cur.LastPOS = this;
            return cur;
        }
        return undefined;
    }

    function Queue(startPos) {
        var that = this;
        var list = [];

        this.length = function() {
            return list.length;
        }

        this.push = function(position) {
            if(startPos.constructor.name == "Position"){
                list.push(position);
            }
            return that;
        }

        this.pop = function(){
            return list.pop();
        }

        this.top = function(){
            return list.shift();
        }

        this.has = function(position){
            for(var i = 0, len = list.length; i < len; i++){
                if(list[i].X == position.X && list[i].Y == position.Y){
                    return true;
                }
            }
            return false;
        }

        this.Item = list;
    }

    function BFS(start, end) {
        var startPos = new Position(start[0], start[1], null);
        var endPos = new Position(parseInt(end[0]), parseInt(end[1]), null);
        var openQ = new Queue(startPos), closedQ = new Queue(startPos);
        var found = false;
        var count = 0;
        openQ.push(startPos);
        while(!found && openQ.length() && count <= 100) {
            count++;
            var pos = openQ.top();
            closedQ.push(pos);
            if (pos.X == endPos.X && pos.Y == endPos.Y) {
                found = true;
            }
            else {
                var down = pos.Down(openQ, closedQ);
                var right = pos.Right(openQ, closedQ);
                var up = pos.Up(openQ, closedQ);
                var left = pos.Left(openQ, closedQ);

                if(down) openQ.push(down);
                if(right) openQ.push(right);
                if(up) openQ.push(up);
                if(left) openQ.push(left);
            }
        }

        if (found) {
            outputResult(closedQ, startPos);
        }
        else {
            alert("找不到可行的路径！");
        }
    }

    function outputResult(closedQ, startPos) {
        var path = [];
        var pathLength = 0;
        var lastPOS = closedQ.pop();
        while(lastPOS.X != startPos.X || lastPOS.Y != startPos.Y){
            path.push(lastPOS);
            lastPOS = lastPOS.LastPOS;
            pathLength++;
        }
        console.log(path[0]);
        var timer1 = window.setInterval(function(){
            var point = path.pop();
            if (point) {
                var diff = [(point.X - startPos.X), (point.Y - startPos.Y)];
                switch(diff.join(' ')) {
                    case ('1 0'):
                        pos.face = 1;
                        go();
                        break;
                    case ('-1 0'):
                        pos.face = 3;
                        go();
                        break;
                    case ('0 1'):
                        pos.face = 2;
                        go();
                        break;
                    case ('0 -1'):
                        pos.face = 0;
                        go();
                        break;
                }
                draw();
                startPos = point;
            }
            else clearInterval(timer1);
        },500);
    }

})();
















