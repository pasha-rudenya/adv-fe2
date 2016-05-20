var UserWealth = require('containers/user-wealth/user-wealth.js');
var GodGiftForm = require('containers/god-gift-form/god-gift-form.js');

module.exports = function Game() {
    var elem = $('<div></div>');

    var userWealth = new UserWealth({
        Gold: {
            amount: 20,
            hateCount: 4
        },
        Copper: {
            amount: 30,
            hateCount: 1
        },
        Some: {
            amount: 30,
            hateCount: 1
        }
    });
    var godGiftForm = new GodGiftForm({
        resources: userWealth.resources
    });

    function render() {
        elem.html(App.templates['game']({}));

        elem.find('.game__user-wealth').html(userWealth.render().elem);
        elem.find('.game__god-gift-form').html(godGiftForm.render().elem);

        return this;
    }

    return {
        render: render,
        elem: elem
    }
};