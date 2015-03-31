var express = require('express');
var app = express();
var path = require('path');
var errorHandler = require('errorhandler');
var port = process.env.PORT || 8080;
process.env.NODE_ENV = 'development';

app.set('views', __dirname + '/app');
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

if ('development' == app.get('env')) {
    app.use(errorHandler());
    app.use(express.static(__dirname + '/app'));
    app.use(express.static(__dirname + '/.tmp'));
}

if ('production' == app.get('env')) {
    app.use(express.static(__dirname + '/dist'));
}

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/contact', function(req, res) {
    res.render('contact');
});

app.get('/careers', function(req, res) {
    res.render('careers');
});

app.listen(port);
console.log('The magic happens on port ' + port);
