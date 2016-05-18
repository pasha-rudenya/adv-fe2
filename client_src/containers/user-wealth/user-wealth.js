var Resource = require('components/resource/resource.js');

module.exports = function UserWealth() {
    var elem = $('<div></div>');

    var goldResource = new Resource({
        name: 'Gold',
        amount: 20
    });
    var copperResource = new Resource({
        name: 'Copper',
        amount: 30
    });
    var someResource = new Resource({
        name: 'Some',
        amount: 30
    });

    function render() {
        elem.html(App.templates['user-wealth']({}));

        elem.find('.user-wealth__gold').html(goldResource.render().elem);
        elem.find('.user-wealth__copper').html(copperResource.render().elem);
        elem.find('.user-wealth__some').html(someResource.render().elem);

        subscribeHandlers(elem);

        return this;
    }

    function subscribeHandlers(elem) {
        elem.find('.god-gift-form__send').click(function() {
            console.log('send gift [gold: ' + goldTunner.getCount() + ', copper:' + copperTunner.getCount() + ']');
        });
    }

    return {
        render: render,
        elem: elem
    }
};
