module.exports = function Resource(options) {
    var elem = $('<div></div>');

    var resource = options.resource;

    // subscribe on resource
    resource.subscribe(render);

    function render() {
        elem.html(App.templates['resource']({}));
        elem.find('.resource__name').html(resource.getName());
        elem.find('.resource__val').html(resource.getCount());

        return this;
    }

    return {
        render: render,
        elem: elem
    }
};
