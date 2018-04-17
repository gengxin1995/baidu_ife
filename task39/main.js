
function randomScore(n) {
    var arr = [];
    var sum = 0;
    for (var i = 0; i < n; i++) {
        var num = Math.floor(Math.random() * 101);
        sum += num;
        arr.push(num);
    }

    arr.push(sum);
    return arr;
}

var scoreData = {
    '小红': randomScore(3),
    '小明': randomScore(3),
    '小李': randomScore(3),
    '小王': randomScore(3),
    '小张': randomScore(3),
    '小白': randomScore(3),
    '小刘': randomScore(3),
    '小赵': randomScore(3),
    '小周': randomScore(3),
    '小孙': randomScore(3),
    '小吴': randomScore(3),
    '老红': randomScore(3),
    '老明': randomScore(3),
    '老李': randomScore(3),
    '老王': randomScore(3),
    '老张': randomScore(3),
    '老白': randomScore(3),
    '老刘': randomScore(3),
    '老赵': randomScore(3),
    '老周': randomScore(3),
    '老孙': randomScore(3),
    '老吴': randomScore(3)
}

var names = ['姓名', '语文', '数学', '英语', '总分'];

var getSortFns = function(name) {
    if (name == names[0]) {
        return;
    }
    return function(d1, d2) {
        return d2 - d1;
    }
}

var table = new SortableTable(document.getElementById('scoreTable'), scoreData, names, getSortFns);