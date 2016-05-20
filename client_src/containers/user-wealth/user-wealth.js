var Resource = require('components/resource/resource.js');

module.exports = function UserWealth(options) {
    var elem = $('<div></div>');

    var resources = {};

    for (var resource in options) {
        resources[resource] = new Resource({
            name: resource,
            amount: options[resource].amount,
            hateCount: options[resource].hateCount
        })
    }

    function render() {
        elem.html(App.templates['user-wealth']({}));

        for (var resource in resources) {
            elem.find('.user-wealth__' + resource.toLowerCase()).html(resources[resource].render().elem);
        }

        subscribeHandlers(elem);

        return this;
    }

    function subscribeHandlers(elem) {
        elem.find('.god-gift-form__send').click(function() {
            console.log('send gift [gold: ' + goldTunner.getCount() + ', copper:' + copperTunner.getCount() + ']');
        });
    }

    return {
        resources: resources,
        render: render,
        elem: elem
    }
};
