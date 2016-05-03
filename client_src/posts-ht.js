$( document ).ready( function () {
    var posts = Data.getPosts();

    var postsJsonTemplateRaw = $('#posts-json-template').html();
    var postsTableTemplateRaw = $('#posts-table-template').html();

    var postsJsonTemplate = Handlebars.compile(postsJsonTemplateRaw);
    var postsTableTemplate = Handlebars.compile(postsTableTemplateRaw);

    Handlebars.registerHelper('json', function(options) {
        return '<pre>' + JSON.stringify(options, undefined, 2) + '</pre>';
    });

    Handlebars.registerHelper('table', function(context, options) {
        var description = '';

        context.forEach(function(item, i, context) {
            item.rowClass = (i % 2 === 0 ? 'even' : 'odd');

            description += options.fn(context[i]);
        });

        return description;
    });

    render();

    function render() {
        renderPostsJson();
        renderPostsTable();
    }

    function renderPostsJson() {
        var html = postsJsonTemplate({
            posts: posts
        });

        jQuery('.posts-json-container__list').html(html);
    }

    function renderPostsTable() {
        var html = postsTableTemplate({
            posts: posts
        });

        jQuery('.posts-table-container__list').html(html);
    }
});