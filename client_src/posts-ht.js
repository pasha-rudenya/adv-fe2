$( document ).ready( function () {
    var posts = Data.getPosts();

    var postsJsonTemplateRaw = $('#posts-json-template').html();
    var postsTableTemplateRaw = $('#posts-table-template').html();

    var postsJsonTemplate = Handlebars.compile(postsJsonTemplateRaw);
    var postsTableTemplate = Handlebars.compile(postsTableTemplateRaw);

    Handlebars.registerHelper('json', function(options) {
        return '<pre>' + JSON.stringify(options, undefined, 2) + '</pre>';
    });

    Handlebars.registerHelper('table', function(options) {
        //console.log(options);

        var description = '';

        //for (var i = 0; i < options.hash.posts.length; i++) {
        //    if(options.hash.posts[i].id % 2 == 0) {
        //        description = description + '<div class="even">' + options.hash.posts[i].description + '</div>';
        //    }
        //    else {
        //        description = description + '<div>' + options.hash.posts[i].description + '</div>';
        //    }
        //}

        for (var i = 0; i < options.length; i++) {
            if(options[i].id % 2 == 0) {
                description = description + '<div class="even">' + options[i].description + '</div>';
            }
            else {
                description = description + '<div class="odd">' + options[i].description + '</div>';
            }
        }

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