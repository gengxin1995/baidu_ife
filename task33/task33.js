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
    var btnGo = document.getElementById("go");
    var btnLef = document.getElementById("tunLef");
    var btnRig = document.getElementById("tunRig");
    var btnBac = document.getElementById("tunBac");
    var pos = {
        X: 6,	// X坐标 1-10
        Y: 6,	// Y坐标 1-10
        face: 0	// 方向 0: 上, 1: 右, 2: 下, 3: 左;
    }

    function move(cmd) {
        if (cmd === 'GO') {
            go();
        } else if (cmd === 'TUN LEF') {
            tunLef();
        } else if (cmd === 'TUN RIG') {
            tunRig();
        } else if (cmd === 'TUN BAC') {
            tunRig();
            tunRig();
        } else {
            alert("请输入正确的指令\nGO：前进一格\nTUN LEF：向左转\nTUN RIG：向右转\nTUN BAC：向后转");
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
    
    function tunLef() {
        pos.face--;
    }
    
    function tunRig() {
        pos.face++;
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

    var cmd = document.getElementById("cmd").value;

    addEventHandler(btnRun, 'click', function () {
        move(cmd);
    });
    addEventHandler(btnGo, 'click', function () {
        move('GO');
    })
    addEventHandler(btnLef, 'click', function () {
        move('TUN LEF');
    })
    addEventHandler(btnRig, 'click', function () {
        move('TUN RIG');
    })
    addEventHandler(btnBac, 'click', function () {
        move('TUN BAC');
    })

})();













