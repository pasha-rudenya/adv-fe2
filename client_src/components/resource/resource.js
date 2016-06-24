module.exports = function Resource(options) {
    var elem = $('<div></div>');

    var resource = options.resource;
    var name = options.name;
    var count = options.count || 0;

    render();


    function render() {
        elem.html(App.templates['resource']({
            name: name,
            count: count
        }));

        return this;
    }

    return {
        render: render,
        elem: elem,
        setCount: function(c) {
            count = c;
            render();
        }
    }
};
