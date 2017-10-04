var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
    res.header("Pragma", "no-cache");
    res.header("Cache-Control", "no-cache");
    return next();
});

app.options('/*', function(req, res) {
    // res.send(200);
    res.header("Access-Control-Allow-Origin", "new[] { (string)context.Request.Headers['Origin'] }");
    res.header("Access-Control-Allow-Headers", "new[] { 'Origin, X-Requested-With, Content-Type, Accept, Authorization' }");
    res.header("Access-Control-Allow-Methods", "new[] { 'GET, POST, PUT, DELETE, OPTIONS' }");
    res.header("Access-Control-Allow-Credentials", "new[] { 'true' }");
});



app.use(express.static(__dirname + '/app'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.listen(port, function() {
    console.log('App is running on port ' + port);
});