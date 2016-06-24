var Resource = require('components/resource/resource.js');

module.exports = function UserWealth(options) {
    var elem = $('<div></div>');

    var resources = options.resources;

    var ctResources = resources.map(function(resource) {
        var res = new Resource({
            name: resource.getName(),
            count: resource.getCount()
        });

        resource.subscribe(function() {
            res.setCount(resource.getCount());
        });

        return res;
    });

    function render() {
        elem.html(App.templates['user-wealth']({}));
         elem.find('.user-wealth__resources').html(ctResources.map(function(r) {
             return r.render().elem;
         }));
        return this;
    }

    return {
        render: render,
        elem: elem,
        resources: ctResources
    }
};
