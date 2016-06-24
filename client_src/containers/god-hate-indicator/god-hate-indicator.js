var Bar = require('components/bar/bar.js');

module.exports = function GodLoveIndicator(options) {
    var elem = $('<div></div>');

    var hate = options.hate;

    var bar = new Bar();
    bar.setCount(hate.getCount());

    hate.subscribe(function() {
        bar.setCount(hate.getCount());
    });

    function render() {
        elem.html(App.templates['god-hate-indicator']({}));

        elem.find('.god-hate-indicator__bar').html(bar.render(hate.getCount()).elem);
        return this;
    }

    return {
        render: render,
        elem: elem
    }
};
