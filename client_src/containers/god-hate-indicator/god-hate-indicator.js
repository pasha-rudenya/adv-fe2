var Bar = require('components/bar/bar.js');

module.exports = function GodHateIndicator(options) {
    var elem = $('<div></div>');

    var hate = options.hate;

    var bar = new Bar({
        count: hate
    });

    function render() {
        elem.html(App.templates['god-hate-indicator']({}));

        elem.find('.god-hate-indicator__bar').html(bar.render().elem);
        return this;
    }

    return {
        render: render,
        elem: elem,
        inc: function(count) {
            bar.inc(count);
            hate += count;
        },
        dec: function(count) {
            if (hate < count) {
                return 0;
            }
            else {
                bar.dec(count);
                hate -= count;
            }
        }
    }
};
