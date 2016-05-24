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
        elem.html(App.templates['user-wealth']({
            resources: resources
        }));

        for (var resource in resources) {
            elem.find('.user-wealth__' + resource).html(resources[resource].render().elem);
        }

        return this;
    }

    return {
        resources: resources,
        render: render,
        elem: elem
    }
};