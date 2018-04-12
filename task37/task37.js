var FloatLayer = function(element) {
    this.ele = element;
    this.visible = false;
    this.maskEle = null;
    this.animateTime = 600;

    this.init();
};

FloatLayer.prototype = {
    show: function() {
        this.visible = true;
        this.ele.style.transform = 'translate(-50%, -50%) scale(1,1)';
        this.maskEle.style.visibility = 'visible';
        this.ele.style.left = '50%';
        this.ele.style.top = '50%';
    },

    hide: function() {
        this.visible = false;
        this.ele.style.transform = 'translate(-50%, -50%) scale(0,0)';
        var self = this;
        setTimeout(function () {
            self.maskEle.style.visibility = 'hidden';
        }, this.animateTime - 10);
    },

    init: function() {
        this.maskEle = document.createElement('div');
        this.maskEle.style.width = window.screen.width + 'px';
        this.maskEle.style.height = window.screen.height + 'px';
        this.maskEle.style.backgroundColor = 'rgba(108, 108, 108, 0.5)';
        this.maskEle.style.position = 'fixed';
        this.maskEle.style.left = '50%';
        this.maskEle.style.top = '50%';
        this.maskEle.style.transform = 'translate(-50%, -50%)';
        this.maskEle.style.visibility = this.visible ? 'visible' : 'hidden';

        this.ele.style.position = 'absolute';
        this.ele.style.left = '50%';
        this.ele.style.top = '50%';
        this.ele.style.width = this.ele.clientWidth + 'px';
        this.ele.style.transform = 'translate(-50%, -50%) scale(0, 0)';
        this.ele.style.transition = this.animateTime + 'ms transform';

        this.ele.parentNode.removeChild(this.ele);
        this.maskEle.appendChild(this.ele);
        document.body.appendChild(this.maskEle);

        var self = this;
        addEventHandler(this.maskEle, 'click', function (e) {
            if (self.maskEle === this) {
                self.hide();
            }
        });

        addEventHandler(this.ele, 'click', function (e) {
            e.stopPropagation();
        });

        this.setDragNode(this.ele.children[0]);
    },

    setDragNode: function(node) {
        var self = this;

        node.style.cursor = 'move';

        addEventHandler(node, 'mousedown', function (e) {
            var disX = e.clientX - self.ele.offsetLeft;
            var disY = e.clientY - self.ele.offsetTop;

            var move = function (e) {
                self.ele.style.left = e.clientX - disX + 'px';
                self.ele.style.top = e.clientY - disY + 'px';
            };

            addEventHandler(document, 'mousemove', move);
            addEventHandler(document, 'mouseup', function () {
                removeEventHandler(document, 'mousemove', move);
            })
        })
    }
};

function createFloatLayer(ele) {
    return new FloatLayer(ele);
}











