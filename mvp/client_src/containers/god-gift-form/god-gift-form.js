var GiftTunner = require('containers/gift-tunner/gift-tunner.js');
var GodHateIndicator = require('containers/god-hate-indicator/god-hate-indicator.js');
var Resource  = require('models/resource.js'); //comment it
var Hate = require('models/hate.js');

module.exports = function GodGiftForm(options) {
    var elem = $('<div></div>');

    var BASE_HATE = 50;
    var resources = options.resources;
    var hate = new Hate(BASE_HATE);

    console.log(resources);

    //Model.subscribeAll([goldResource, copperResource], function() {
    //    hate.setCount(
    //            BASE_HATE - copperResource.getCount() * 1 - goldResource.getCount() * 4
    //    );
    //});

    var godHateIndicator = new GodHateIndicator({
        hate: hate 
    });
    var goldTunner = new GiftTunner({
        name: 'Gold'
    //    resource: goldResource
    });
    var copperTunner = new GiftTunner({
        name: 'Copper'
    //    resource: copperResource
    });

    function render() {
        elem.html(App.templates['god-gift-form']({}));

        elem.find('.god-gift-form__gold-tunner').html(goldTunner.render().elem);
        elem.find('.god-gift-form__copper-tunner').html(copperTunner.render().elem);
        elem.find('.god-gift-form__hate').html(godHateIndicator.render().elem);

        subscribeHandlers(elem);

        return this;
    }

    function subscribeHandlers(elem) {
        elem.find('.god-gift-form__send').click(function() {
            console.log('send gift [gold: ' + goldResource.getCount() + ', copper:' + copperResource.getCount() + ']');
        });
    }

    return {
        render: render,
        elem: elem
    }
};
