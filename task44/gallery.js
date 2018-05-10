var Gallery = function (container, width, minColNum) {
    this.container = $(container);
    var colNum = Math.floor(this.container.width() / width);
    this.colNum = colNum > minColNum ? colNum : minColNum;

    this.mainEle = null;
    this.columns = [];
    this.showEle = null;
    this.index = 1;
    this.init();
}

Gallery.prototype = {
    init: function () {
        this.mainEle = $('<div>')
            .css('position', 'relative')
            .appendTo(this.container);

        for (var i = 0; i < this.colNum; i++) {
            var eleCol = $('<div>')
                .css({
                    'padding': '8px',
                    'box-sizing': 'border-box',
                    'position': 'absolute',
                    'width': 100 / this.colNum + '%',
                    'left': 100 / this.colNum * i + '%'
                })
                .appendTo(this.mainEle);
            this.columns.push(eleCol);
        }
        this.showEle = $('<div>')
            .css({
                'position': 'fixed',
                'width': window.screen.width,
                'height': window.screen.height,
                'left': '50%',
                'top': '50%',
                'transform': 'translate(-50%, -50%)',
                'background-color': 'rgba(0, 0, 0, 0.8)'
            })
            .appendTo($(document.body))
            .hide()
            .click(function (e) {
                console.log(e.target);
                if (e.target === this) {
                    $(this).hide();
                }
            });
        var img = $('<img>')
            .css({
                'position': 'absolute',
                'left': '50%',
                'top': '50%',
                'transform': 'translate(-50%, -50%)',
            })
            .appendTo(this.showEle);
    },
    addImage: function (img) {
        var self = this;
        img.css({
            'width': '100%',
            'cursor': 'zoom-in'
        }).on('load', function (e) {
            var div = $('<div>')
                .css('width', '100%')
                .append($(this))
                .append($("<p style='text-align:center;font-family:黑体;'>picture" + self.index++ + '<p>'))
                .appendTo(self.getMinHeightColumn())
        }).click(function () {
            self.showImage($(this));
        })
    },
    showImage: function (img) {
        var imgForShow = this.showEle.find('img');
        imgForShow.attr('src', img.attr('src'));
        this.showEle.show();
    },
    getMinHeightColumn: function () {
        var min = this.columns.length - 1;
        for (var i = this.columns.length-1; i >= 0; i--) {
            if (this.columns[i].height() <= this.columns[min].height()) {
                min = i;
            }
        }
        return this.columns[min];
    }
}