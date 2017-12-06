var http = require('http');

var dt = require('./module.js');

var insert= require('./DB_Select.js');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hola World! '+ dt.myDateTime());

}).listen(8080);



