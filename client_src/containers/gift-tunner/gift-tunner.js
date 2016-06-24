var Bar = require('components/bar/bar.js');
var TuneControls = require('components/tune-controls/tune-controls.js');

module.exports = function GiftTunner(options) {
    var elem = $('<div></div>');

    var resource = options.resource;

    var bar = new Bar();
    var controls = new TuneControls();

    var onIncCallback, onDecCallback;

    controls.onInc(function() {
        if (!onIncCallback()) {
            return;
        }
        resource.inc();
        render();
    });

    controls.onDec(function() {
        if (!resource.getCount()) {
            return;
        }
        onDecCallback();
        resource.dec();
        render();
    });

    function render() {
        elem.html(App.templates['gift-tunner']({}));

        elem.find('.gift-tunner__name').html(resource.getName());
        elem.find('.gift-tunner__bar').html(bar.render(resource.getCount()).elem);
        elem.find('.gift-tunner__controls').html(controls.render().elem);

        return this;
    }

    return {
        render: render,
        resource: resource,
        elem: elem,
        getCount: function () {
            return count;
        },
        setCount: function (c) {
            count = c;
            render();
        },
        onInc: function (cb) {
            onIncCallback = cb;
        },
        onDec: function (cb) {
            onDecCallback = cb;
        }
    }
};
