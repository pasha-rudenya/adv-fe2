var GodGiftForm = require('containers/god-gift-form/god-gift-form.js');
var UserWealth = require('containers/user-wealth/user-wealth.js');
var Resource = require('models/resource.js');

module.exports = function Game() {
    var elem = $('<div></div>');

    var userWealth, godGiftForm;

    function getData() {
        fetch('/json-server/wealth')
            .then(function(response) {
                return response.json();
            }).then(function(res) {
                var resources = $.map(res, function(value) {
                    return [value];
                });
                var arr = [];
                for (var i = 0; i < resources[0].length; i++) {
                    arr.push(new Resource(resources[0][i]));
                }
                initModels(arr);
                addDataToTemplate();
                return resources;
            });
    }

    function initModels(resources) {
        userWealth = new UserWealth({
            resources: resources
        });

        godGiftForm = new GodGiftForm({
            resources: resources
        });
    }

    function addDataToTemplate() {
        elem.html(App.templates['game']({}));
        elem.find('.game__god-gift-form').html(godGiftForm.render().elem);
        elem.find('.game__wealth').html(userWealth.render().elem);
    }

    function render() {
        getData();

        return this;
    }

    return {
        render: render,
        elem: elem
    }
};
