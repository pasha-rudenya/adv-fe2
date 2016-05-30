var Bar = require('components/bar/bar.js');

module.exports = function GodLoveIndicator(options) {
    var elem = $('<div></div>');

    var hate = options.hate;

    var bar = new Bar({
        model: hate
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
            hate.inc(count);
        },
        dec: function(count) {
            if (hate.getCount() < count) {
                return 0;
            }
            else {
                hate.dec(count);
            }
        }
    }
};
