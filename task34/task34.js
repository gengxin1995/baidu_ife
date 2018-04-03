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
    // 获取HTLM元素
    var square = document.getElementById("square");
    var btnRun = document.getElementById("run");

    var pos = {
        X: 6,	// X坐标 1-10
        Y: 6,	// Y坐标 1-10
        face: 0	// 方向 0: 上, 1: 右, 2: 下, 3: 左;
    };

    addEventHandler(btnRun, 'click', function () {
        var cmd = document.getElementById("cmd").value;
        move(cmd);
    });

    function move(cmd) {
        cmd = cmd.toLowerCase();

        switch (cmd) {
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
                if (pos.X > 1) {
                    pos.X--;
                }
                break;
            case 'tra top':
                if (pos.Y > 1) {
                    pos.Y--;
                }
                break;
            case 'tra rig':
                if (pos.X < 10) {
                    pos.X++;
                }
                break;
            case 'tra bot':
                if (pos.Y < 10) {
                    pos.Y++;
                }
                break;
            case 'mov lef':
                pos.face = 3;
                if (pos.X > 1) {
                    pos.X--;
                }
                break;
            case 'mov top':
                pos.face = 0;
                if (pos.Y > 1) {
                    pos.Y--;
                }
                break;
            case 'mov rig':
                pos.face = 1;
                if (pos.X < 10) {
                    pos.X++;
                }
                break;
            case 'mov bot':
                pos.face = 2;
                if (pos.Y < 10) {
                    pos.Y++;
                }
                break;
            default:
                alert("请输入正确的指令");
                return false;
        }
        draw();
    }

    function go() {
        var face_ = pos.face;
        face_ = face_ % 4 + (face_ % 4 < 0 ? 4 : 0);

        if (face_ === 0 && pos.Y > 1) {
            pos.Y--;
        } else if (face_ === 1 && pos.X < 10) {
            pos.X++;
        } else if (face_ === 2 && pos.Y < 10) {
            pos.Y++;
        } else if (face_ === 3 && pos.X > 1) {
            pos.X--;
        } else {
            return false;
        }
    }


    function draw() {
        //if (pos.X <= 0 || pos.Y <= 0 || pos.X > 10 || pos.Y > 10) {
        //    return;
        //} else {
        square.style.top = pos.Y * 50 + 'px';
        square.style.left = pos.X * 50 + 'px';
        square.style.transform = square.style.webkitTransform = square.style.msTransform = "rotate(" + (pos.face * 90) + "deg)";
        //addEventHandler(square, 'webkitTransitionEnd', rect);
        //addEventHandler(square, 'transitionEnd', rect);
        //}
    }

    function rect() {
        pos.face = pos.face % 4 + (pos.face % 4 < 0 ? 4 : 0);	// 修正超出的pos.face值
        square.style.transition = square.style.webkitTransition = "0";	// 暂时取消过渡效果
        square.style.transform = square.style.webkitTransform = square.style.msTransform = "rotate(" + (pos.face * 90) + "deg)";	// 修正超出的旋转度数

        // 用定时器避免和上面设置的样式同步执行
        setTimeout(function() {
            square.style.transition = square.style.webkitTransition = ""	// 还原过渡效果
        }, 0)
    }



})();













