var GiftTunner = require('containers/gift-tunner/gift-tunner.js');
var GodHateIndicator = require('containers/god-hate-indicator/god-hate-indicator.js');

module.exports = function GodGiftForm(options) {
    var elem = $('<div></div>');

    var resources = options.resources;
    var tunners = {};

    var godHateIndicator = new GodHateIndicator({
        hate: 30
    });

    console.log(godHateIndicator.hate);

    for (var resource in resources) {
        tunners[resource] = new GiftTunner({
            name: resource,
            hateIndicator: godHateIndicator,
            resource: resources[resource]
        });
    }

    function render() {
        elem.html(App.templates['god-gift-form']({}));

        for (var resource in tunners) {
            elem.find('.god-gift-form__' + resource.toLowerCase() + '-tunner').html(tunners[resource].render().elem);
        }

        elem.find('.god-gift-form__hate').html(godHateIndicator.render().elem);

        subscribeHandlers(elem);

        return this;
    }

    function subscribeHandlers(elem) {
        elem.find('.god-gift-form__send').click(function() {
            console.log('send gift [gold: ' + goldTunner.getCount() + ', copper:' + copperTunner.getCount() + ', some:' + someTunner.getCount() + ']');
        });
    }

    return {
        render: render,
        elem: elem
    }
};
