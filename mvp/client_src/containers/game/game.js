var GodGiftForm = require('containers/god-gift-form/god-gift-form.js');
var UserWealth = require('containers/user-wealth/user-wealth.js');
var Resource = require('models/resource.js');

module.exports = function Game() {
    var elem = $('<div></div>');

    var resources = [
        new Resource({
            name: 'Gold',
            count: 20
        }),
        new Resource({
            name: 'Copper',
            count: 30
        })
    ];

    var userWealth = new UserWealth({
        resources: resources
    });

    var godGiftForm = new GodGiftForm({
        resources: resources
    });

    function render() {
        elem.html(App.templates['game']({}));
        elem.find('.game__god-gift-form').html(godGiftForm.render().elem);
        elem.find('.game__wealth').html(userWealth.render().elem);
        return this;
    }

    return {
        render: render,
        elem: elem
    }
};