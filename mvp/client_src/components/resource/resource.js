module.exports = function Resource() {
    var elem = $('<div></div>');

    var resource = '', count = 0;

    function render() {
        elem.html(App.templates['resource']({}));
        elem.find('.resource__name').html(resource);
        elem.find('.resource__val').html(count);

        return this;
    }

    return {
        render: render,
        elem: elem,
        dec: function() {
            render();
        },
        inc: function() {
            render();
        },
        setName: function(name) {
            resource = name;
            render();
        },
        setCount: function(c) {
            count = c;
            render();
        }
    }
};