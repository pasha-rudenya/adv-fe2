var UserWealth = require('containers/user-wealth/user-wealth.js');
var GodGiftForm = require('containers/god-gift-form/god-gift-form.js');

module.exports = function Game() {
    var elem = $('<div></div>');

    var userWealth = new UserWealth();
    var godGiftForm = new GodGiftForm();

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