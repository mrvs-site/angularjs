var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var cors_proxy = require('cors-anywhere');

cors_proxy.createServer({
    originWhitelist: [], // Allow all origins 
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
});

// app.all('*', function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'URLs to trust of allow');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     if ('OPTIONS' == req.method) {
//         res.sendStatus(200);
//     } else {
//         next();
//     }
// });

// app.all('/*', function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
//     next();
// });

// app.options('/*', function(req, res) {
//     // res.send(200);
//     res.header("Access-Control-Allow-Origin", "new[] { (string)context.Request.Headers['Origin'] }");
//     res.header("Access-Control-Allow-Headers", "new[] { 'Origin, X-Requested-With, Content-Type, Accept, Authorization' }");
//     res.header("Access-Control-Allow-Methods", "new[] { 'GET, POST, PUT, DELETE, OPTIONS' }");
//     res.header("Access-Control-Allow-Credentials", "new[] { 'true' }");
// });


app.use(express.static(__dirname + '/app'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.listen(port, function() {
    console.log('App is running on port ' + port);
});