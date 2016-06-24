var GiftTunner = require('containers/gift-tunner/gift-tunner.js');
var GodHateIndicator = require('containers/god-hate-indicator/god-hate-indicator.js');
var Resource  = require('models/resource.js');
var Hate = require('models/hate.js');

module.exports = function GodGiftForm(options) {
    var elem = $('<div></div>');

    var BASE_HATE = 50;
    var resources = options.resources;
    var tunnerResources = [];

    var hate = new Hate(BASE_HATE);

    var godHateIndicator = new GodHateIndicator({
        hate: hate
    });

    function calcHate() {
        hate.setCount(
            tunnerResources.reduce(function(counter, resource) {
                return counter - resource.getCount() * resource.getGodPrefer();
            }, BASE_HATE)
        );
    }

    var tunners = resources.map(function(resource) {
        var gift = new Resource({
            name: resource.getName(),
            count: 0,
            godPrefer: resource.getGodPrefer()
        });

        tunnerResources.push(gift);

        var tunner = new GiftTunner({
            resource: gift
        });

        tunner.onInc(function() {
            if (!resource.getCount()) {
                return false;
            }
            resource.dec();
            return true;
        });

        tunner.onDec(function() {
            resource.inc();
        });

        gift.subscribe(calcHate);

        return tunner;
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
