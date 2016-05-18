module.exports = function Resource(options) {
    var elem = $('<div></div>');
    var resource = {
        name: options.name,
        amount: options.amount
    }

    function render() {
        elem.html(App.templates['resource']({
            name: resource.name,
            amount: resource.amount
        }));
        console.log(resource.name);
        return this;
    }

    return {
        render: render,
        inc: function(count) {
            progress += count || 1;
            render();
        },
        dec: function(count) {
            progress -= count || 1;
            render();
        },
        getCount: function() {
            return progress;
        },
        elem: elem
    }
};
