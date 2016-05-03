$( document ).ready( function () {
    var posts = Data.getPosts();

    var selectedPage = 0;
    var perPage = 13;

    var postTemplateRaw = $('#post-preview-template').html();
    var postsTemplateRaw = $('#posts-list-template').html();
    var navigationTemplateRaw = $('#navigation-template').html();
    var postsJsonTemplateRaw = $('#posts-json-template').html();
    var postsTableTemplateRaw = $('#posts-table-template').html();

    var postTemplate = Handlebars.compile(postTemplateRaw);
    var postsTemplate = Handlebars.compile(postsTemplateRaw);
    var navigationTemplate = Handlebars.compile(navigationTemplateRaw);
    var postsJsonTemplate = Handlebars.compile(postsJsonTemplateRaw);
    var postsTableTemplate = Handlebars.compile(postsTableTemplateRaw);

    Handlebars.registerPartial('post-preview', postTemplateRaw);
    Handlebars.registerHelper('bold', function (options) {
        return new Handlebars.SafeString('<b>' +
            Handlebars.Utils.escapeExpression(options.hash.text) + '</b>'
        );
    });
    Handlebars.registerHelper('nav', function (options) {
        return Array.apply(null, Array(options.hash.count)).map(function(v,i) {
            return options.fn({
                number: i + 1,
                selected: options.hash.selected == i
            });
        }).join('');
    });
    Handlebars.registerHelper('json', function(options) {
        return '<pre>' + JSON.stringify(options, undefined, 2) + '</pre>';
    });

    Handlebars.registerHelper('table', function(options) {
        //console.log('options: ' + options.hash.posts[2].description);

        var description = '';

        for (var i = 0; i < options.hash.posts.length; i++) {
            if(options.hash.posts[i].id % 2 == 0) {
                description = description + '<div class="even">' + options.hash.posts[i].description + '</div>';
            }
            else {
                description = description + '<div>' + options.hash.posts[i].description + '</div>';
            }
        }

        return description;
    });

    render();
    subscribeHandlers();

    function render() {
        renderPosts();
        renderNavigation();
        renderPostsJson();
        renderPostsTable();
    }

    function subscribeHandlers() {
        $( '.posts-container__navigation' ).click( function( event ) {
            var selected = parseInt($(event.target).data('id')) - 1;

            if ( selected === selectedPage ) {
                return;
            }
            selectedPage = selected;
            renderPosts();
            renderNavigation();
            $( 'html,body' ).animate( { scrollTop : 0 }, 0 );
        });

        $( '.posts-container__post' ).click( function () {
            console.log( 'selected post' );
        } );
    }

    function renderNavigation() {
        var count = Math.ceil( posts.length / perPage );

        $( '.posts-container__navigation' ).html(navigationTemplate({
            count: count,
            selected: selectedPage
        }));
    }

    function renderPosts() {
        var postsForRender = posts.slice( selectedPage * perPage, selectedPage * perPage + perPage );
        var html = postsTemplate({
            posts: postsForRender
        });

        jQuery('.posts-container__list').html(html);
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