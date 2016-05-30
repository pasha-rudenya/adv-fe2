var BASE_PATH = '/json-server';
var USERS_URL = '/users/';
var POSTS_URL = '/posts/';

var getPosts = fetch(BASE_PATH + POSTS_URL)
    .then(function(res) {
        return res.json();
});

// 1.1
fetch(BASE_PATH + POSTS_URL + 466, {
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
//var getUsers = fetch(BASE_PATH + USERS_URL)
//    .then(function(res) {
//        return res.json();
//    });
//
//fetch(BASE_PATH + POSTS_URL + 466).then(function(post) {
//    return post.json();
//})
//    .then(function(post) {
//        console.log(getUsers);
//        post.comments.forEach(function(comment) {
//            console.log(comment);
//        });
//    });

Promise.all([
    fetch(BASE_PATH + POSTS_URL + 466),
    fetch(BASE_PATH + USERS_URL)
]).then(function(results) {
    return results;
}).then(function(results) {
    results.forEach(function(result) {
        console.log(result);
        console.log(result.json());
    });
});