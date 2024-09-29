// Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

// Create a server
http.createServer(function(req, res) {
    var path = url.parse(req.url).pathname;
    console.log(path);
    switch (path) {
        case '/':
            fs.readFile(__dirname + '/index.html', function(err, data) {
                if (err) {
                    res.writeHead(404);
                    res.write("opps this doesn't exist - 404");
                    res.end();
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    res.write(data, 'utf8');
                    res.end();
                }
            });
            break;
        case '/comment':
            var body = '';
            req.on('data', function(data) {
                body += data;
            });
            req.on('end', function() {
                var POST = qs.parse(body);
                console.log(POST);
                res.writeHead(200);
                res.write(JSON.stringify(POST));
                res.end();
            });
            break;
        default:
            res.writeHead(404);
            res.write("opps this doesn't exist - 404");
            res.end();
            break;
    }
}).listen(3000);
console.log('Server is running at http://localhost:3000/');