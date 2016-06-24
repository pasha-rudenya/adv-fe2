module.exports = function Bar() {
    var elem = $('<div></div>');

    var count = 0;

    function render(count) {
        elem.html(App.templates['bar']({
            progress: Array(count)
        }));
        return this;
    }

    return {
        render: render,
        setCount: function(c) {
            count = c;
            render(c);
        },
        elem: elem
    }
};