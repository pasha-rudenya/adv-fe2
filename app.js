var express = require( 'express' );
var path = require( 'path' );
var fs = require( 'fs' );
var url = require('url');
var apiVersion = require('./package').version;

var app = express();

app.set('port', 5000);

app.listen(app.get('port'), function() {
    console.log('Node app is running on http://localhost:' + app.get('port') );
});

app.get('/', function (req, res) {
    var urlParsed = url.parse(req.url, true);

    console.log(urlParsed);

    res.send('<html><body><h1>My web app http API! Version ' + apiVersion + ' </h1></body></html>');
});

app.all('/test/', function (req, res) {
    res.send('<html><body><h1>Hello test</h1></body></html>');
});

app.get('/api/' + apiVersion + '/*', function (req, res) {
    render(req, res);
});

// task 2
app.delete('/api/' + apiVersion + '/*/:id', function(req, res) {
    var filePath = getFilepath(req);

    try {
        if (fs.lstatSync(filePath).isDirectory()) {
            deleteFolderRecursive(filePath);
            res.setHeader('content-type', 'application/json');
            res
                .json([{
                    'status': 'success'
                }])
                .end();
        }
    }

    catch (e) {
        res.setHeader('content-type', 'application/json');
        res
            .status(404)
            .json([{
            'status': 'fail'
        }])
            .end();
    }

});

// task 1
function render(req, res) {
    var filePath = getFilepath(req);

    var directories = getDirectories(filePath);

    var files = directories.map(function(directory) {
        return filePath + directory + '/' + req.method.toLowerCase() + '.json';
    });

    files.forEach(function(file) {
        if (fs.statSync(file)) {
            res.setHeader('content-type', 'application/json');
            fs.createReadStream(file).pipe(res);
        }
        else {
            console.log('no such file', file);

            res
                .status(404)
                .json([
                    {
                        "info": {
                            "success": false,
                            "code": 12345
                        }
                    }
                ])
                .end();
        }
    });
}

function getDirectories(filepath) {
    return fs.readdirSync(filepath).filter(function(file) {
        return fs.statSync(path.join(filepath, file)).isDirectory();
    });
}

function getFilepath(request) {
    var fileName =request.path + '/';
    // /api/1.0.1/users/003/
    fileName = fileName.replace('/' + apiVersion + '/', '/');
    // /api/users/003/

    return path.join(__dirname, fileName);
}

function deleteFolderRecursive(path) {
    fs.readdirSync(path).forEach(function(file) {
        var curPath = path + file;
        if (fs.lstatSync(curPath).isDirectory()) {
            deleteFolderRecursive(curPath);
        }
        else {
            fs.unlinkSync(curPath);
        }
    });
    fs.rmdirSync(path);
}

//
//app.get('/api/1.0/users', function (req, res) {
//    res.send(users);
//});
//
//app.get('/api/1.0/users/:userId', function (req, res) {
//
//    console.log(req.query);
//
//    res.send(user);
//});