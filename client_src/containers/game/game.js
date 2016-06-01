var GodGiftForm = require('containers/god-gift-form/god-gift-form.js');
var UserWealth = require('containers/user-wealth/user-wealth.js');
var Resource = require('models/resource.js');

module.exports = function Game() {
    var elem = $('<div></div>');

    function getData() {
        fetch('/json-server/wealth')
            .then(function(response) {
                return response.json();
            }).then(function(res) {
                var resources = $.map(res, function(value) {
                    return [value];
                });

                var resourseList = resources[0].map(function(a) {
                    return new Resource(a);
                });

                renderModels(resourseList);
                return resources;
            });
    }

    function renderModels(resources) {
        var userWealth = new UserWealth({
            resources: resources
        });

        var godGiftForm = new GodGiftForm({
            resources: resources
        });

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
