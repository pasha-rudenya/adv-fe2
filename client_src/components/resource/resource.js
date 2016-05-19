module.exports = function Resource(options) {
    var elem = $('<div></div>');
    var resource = {
        name: options.name,
        amount: options.amount
    }

    function render() {
        elem.html(App.templates['resource']({
            resource: {
                name: resource.name,
                amount: resource.amount
            }
        }));
        console.log(resource.name);
        return this;
    }

    return {
        render: render,
        plus: function(count) {
            progress += count || 1;
            render();
        },
        minus: function(count) {
            progress -= count || 1;
            render();
        },
        getAmount: function() {
            return resource.amount;
        },
        elem: elem
    }
};
