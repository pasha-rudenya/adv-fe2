module.exports = function TuneControls(options) {
    var elem = $('<div></div>');

    var bar = options.bar; // <----
    var hateIndicator = options.hateIndicator; // <----
    var hateCount = options.hateCount; // <----
    var resource = options.resource;

    function render() {
        elem.html(App.templates['tune-controls']({}));
        subscribeHandlers(elem);

        return this;
    }

    function subscribeHandlers() {
        elem.find('.tune-controls__inc').click(function() {
            bar.inc(); // <----
            hateIndicator.dec(resource.getHateCount()); // <----
        });
        elem.find('.tune-controls__dec').click(function() {
            bar.dec(); // <----
            hateIndicator.inc(hateCount); // <----
        });
    }

    return {
        render: render,
        elem: elem
    }
};
