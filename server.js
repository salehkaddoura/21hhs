var express = require('express');
var app = module.exports = express();
var path = require('path');
var connect = require('connect');
var sassMiddleware = require('node-sass-middleware');
var port = process.env.PORT || 8080;

app.use(
    sassMiddleware({
        src: __dirname + '/sass',
        dest: __dirname + '/app',
        debug: true,
        outputStyle: 'expanded', 
    })
);

app.set('views', __dirname + '/app');
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.use(express.static(path.join(__dirname, 'app')));

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(port);
console.log('The magic happens on port ' + port);
