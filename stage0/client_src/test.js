var BASE_PATH = '/json-server';
var USERS_URL = '/users/';
var POSTS_URL = '/posts/';
var POST_ID = '466';

var getPosts = fetch(BASE_PATH + POSTS_URL)
    .then(function(res) {
        return res.json();
});

// 1.1
fetch(BASE_PATH + POSTS_URL + POST_ID, {
    method: 'PATCH',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        likeCount: 8
    })
});

// 1.2
getPosts.then(function(posts) {
    var count = 0;
    posts.forEach(function(post) {
        count += post.likeCount;
    });

    return count;
})
    .then(function(count) {
        var para = document.createElement('p');
        var node = document.createTextNode('Count of likes: ' + count);

        para.appendChild(node);

        var element = document.getElementsByClassName('content')[0];
        element.appendChild(para);
});

// 1.3
fetch(BASE_PATH + POSTS_URL + POST_ID)
    .then(function(response) {
        return response.json();
    })
    .then(function(post) {
        Promise.all(post.comments.map(function(comment) {
            return fetch(BASE_PATH + USERS_URL + comment.user)
                .then(function(response) {
                    return response.json();
                })
                .then(function(result) {
                    return {
                        user: result.name,
                        text: comment.text
                    };
                });
        }))
        .then(function(comments) {
                comments.forEach(function(comment) {
                    var para = document.createElement('p');
                    var node = document.createTextNode(comment.user + ': ' + comment.text);

                    para.appendChild(node);

                    var element = document.getElementsByClassName('content')[0];
                    element.appendChild(para);
                });
            });
    });