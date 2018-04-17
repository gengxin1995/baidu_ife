function Student(name, chinese, math, english) {
    this.name = name;
    this.chinese = chinese;
    this.math = math;
    this.english = english;
    this.total = chinese + math + english;
}

var table = document.getElementById('tab'),
    title = document.getElementById('title');
var data = [];
data[0] = new Student("小明", 80, 90, 70);
data[1] = new Student("小红", 90, 60, 90);
data[2] = new Student("小亮", 60, 100, 70);
data[3] = new Student("小李", 50, 95, 40);

function renderTable(data) {
    var str = '';
    for (var i = 0; i < data.length; i++) {
        str += "<tr><td>" + data[i].name + "</td><td>" + data[i].chinese + "</td><td>" + data[i].math +"</td><td>" + data[i].english + "</td><td>" + data[i].total + "</td></tr>";
    }
    table.innerHTML += str;
}

function deleteTable(table) {
    var len = table.rows.length;
    for (var i = 1; i < len; i++) {
        table.deleteRow(1);
    }
}

//按照某项成绩从小到大排序
function upSort(data, tip){
    data.sort(function(a, b){
        return a[tip] - b[tip];
    });
    return data;
}
//按照某项成绩从大到小排序
function downSort(data, tip){
    data.sort(function(a, b){
        return b[tip] - a[tip];
    });
    return data;
}

function delClick() {
    var flag = {
        'chinese': true,
        'math': true,
        'english': true,
        'total': true
    };

    addEventHandler(table, 'click', function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;

        if (target.tagName.toLowerCase() === 'th') {
            if (flag[target.id] !== true) {
                upSort(data, target.id);
            } else {
                downSort(data, target.id);
            }
            deleteTable(table);
            renderTable(data);
            flag[target.id] = !flag[target.id];
        }
    })
}

renderTable(data);
delClick();









