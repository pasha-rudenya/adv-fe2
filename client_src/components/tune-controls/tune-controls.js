module.exports = function TuneControls(options) {
    var elem = $('<div></div>');

    var hateIndicator = options.hateIndicator;
    var resource = options.resource;

    function render() {
        elem.html(App.templates['tune-controls']({}));
        subscribeHandlers(elem);

        return this;
    }

    function subscribeHandlers() {
        elem.find('.tune-controls__inc').click(function() {
            hateIndicator.dec(resource.getHateCount());
            resource.plus(resource.getHateCount());
        });
        elem.find('.tune-controls__dec').click(function() {
            if (resource.getAmount() < resource.getHateCount()) {
                return 0;
            }
            else {
                hateIndicator.inc(resource.getHateCount());
                resource.minus(resource.getHateCount());
            }
        });
    }

    return {
        render: render,
        elem: elem
    }
};
