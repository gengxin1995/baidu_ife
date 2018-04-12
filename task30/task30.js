(function () {
    var hintText=[{hint:"必填，长度为4~16位字符",right:"名称格式正确",wrong:"名称格式有误",isPassed:false},
        {hint:"必填，长度为6~16位字符,包含字母和数字",right:"密码可用",wrong:"密码不可用",isPassed:false},
        {hint:"必填，必须与密码相同",right:"密码输入一致",wrong:"密码输入不一致",isPassed:false},
        {hint:"填写正确的邮箱格式",right:"邮箱格式正确",wrong:"邮箱格式错误",isPassed:false},
        {hint:"必填，需使用正确的手机号码",right:"手机格式正确",wrong:"手机格式错误",isPassed:false}];

    function checkValue(id) {
        var flag = false;
        var input = document.getElementById("ip" + id);
        var pp = document.getElementById("p" + id);
        var value = input.value;
        switch (parseInt(id)) {
            case 1:
                flag = /^[a-zA-Z0-9]{4,16}$/.test(value.replace(/[\u0391-\uFFE5]/g, "nn"));
                break;
            case 2:
                flag = /^[a-zA-Z0-9]{6,16}$/.test(value);
                break;
            case 3:
                flag = document.getElementById("ip2").value == value;
                break;
            case 4:
                flag = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}/.test(value);
                break;
            case 5:
                flag = /^[1][0-9]{10}$/.test(value);
                break;
        }
        if (flag) {
            input.style.borderColor = "green";
            pp.style.color = "green";
            pp.innerHTML = hintText[id-1].right;
            hintText[id-1].isPassed = false;
        } else {
            input.style.borderColor = "red";
            pp.style.color = "red";
            pp.innerHTML = hintText[id-1].wrong;
            hintText[id-1].isPassed = true;
        }
    }

    var inputs = document.getElementsByTagName("input");
    [].forEach.call(inputs, function (t) {
        var id = t.getAttribute("id").slice(2);
        addEventHandler(t, "blur", function () {
            checkValue(id);
        })
    });

    addEventHandler(document.getElementById("btn"), "click", function (e) {
        e.preventDefault();

        [1,2,3,4,5].forEach(function (t) {
            checkValue(t);
        });

        var flag = hintText.every(function (t) {
            return t.isPassed;
        });

        if (flag) {
            alert("提交失败");
        } else {
            alert("提交成功");
        }
    })
})();