(function () {
    var layer = createFloatLayer(document.querySelector('#loginDiv'));
    layer.show();

    addEventHandler(document.querySelector('#loginBtn'), 'click', function () {
        layer.show();
    })

    addEventHandler(document.querySelector('#sureBtn'), 'click', function () {
        layer.hide();
    })

    addEventHandler(document.querySelector('#cancelBtn'), 'click', function () {
        layer.hide();
    })
})();
