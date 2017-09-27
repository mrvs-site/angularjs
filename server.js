var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://viacep.com.br');
    res.header('Access-Control-Allow-Methods', 'GET');
    res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Max-Age', '1728000');
    res.header('Content-type', 'application/json');
    res.header('Cache-Control', 'no-cache');
    res.header('Content-type', 'text/html; charset=utf-8');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

app.options('*', function(req, res) {
    res.send(200);
});

app.use(express.static(__dirname + '/app'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.listen(port, function() {
    console.log('App is running on port ' + port);
});