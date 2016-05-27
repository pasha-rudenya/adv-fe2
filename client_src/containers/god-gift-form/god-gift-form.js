var GiftTunner = require('containers/gift-tunner/gift-tunner.js');
var GodHateIndicator = require('containers/god-hate-indicator/god-hate-indicator.js');
var Resource  = require('models/resource.js');
var Hate = require('models/hate.js');

module.exports = function GodGiftForm(options) {
    var elem = $('<div></div>');

    var BASE_HATE = 50; // can be propogated from game
    var resources = options.resources;

    var hate = new Hate(BASE_HATE);

    var godHateIndicator = new GodHateIndicator({
        hate: hate
    });

    // use it as map of gift impact
    var godPrefer = {
        'gold': 6,
        'copper': 2,
        'some': 1
    };

    // create tuner resources (resource model) tuneResource (1)
    //
    // create gift components(gift-tuner) with tunerResouce (2)
    //
    // subscribe on tuner resouces (3)
    // onChange -> set changes in reseouce
    //

    // subscribe on tunner resoures (3)
    // onChange -> recalculate and set hate count
    //

    // (1)
    var tunnerResources = resources.map(function(resource) {
        var gift = new Resource({
            name: resource.getName(),
            count: 0
        });

        // (3)
        gift.subscribe(function() {
            var name = gift.getName();

            godHateIndicator.dec(godPrefer[name.toLowerCase()]);
            resources.forEach(function(resource) {
                if (resource.getName() === name ) {
                    resource.dec(godPrefer[name.toLowerCase()]);
                }
            });
        });

        return gift;
    });

    // (2)
    var tunners = tunnerResources.map(function(resource) {
        return new GiftTunner({
            resource: resource
        });
    });

    function render() {
        elem.html(App.templates['god-gift-form']({}));

        elem.find('.god-gift-form__tunners').html(tunners.map(function(tunner) {
            return tunner.render().elem;
        }));
        elem.find('.god-gift-form__hate').html(godHateIndicator.render().elem);

        subscribeHandlers(elem);

        return this;
    }

    function subscribeHandlers(elem) {
        elem.find('.god-gift-form__send').click(function() {
            console.log(
                'send gift [' +
                tunnerResources.map(function(resource) {
                    return resource.getName() + ':' + resource.getCount()
                }) +
                ']'
            );
        });
    }

    return {
        render: render,
        elem: elem
    }
};
