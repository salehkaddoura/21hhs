var express = require('express');
var app = express();
var path = require('path');
var errorHandler = require('errorhandler');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var port = process.env.PORT || 8080;
process.env.NODE_ENV = 'development';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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

app.post('/contacthhs', function(req, res) {
    console.log(req.body);
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'saleh.kaddoura@gmail.com',
            pass: 'smileyrilec93'
        }
    });

    var mailOptions = {
        from: req.body.fullname + ' ' + req.body.email,
        to: 'saleh.kaddoura@gmail.com',
        subject: 'New Customer',
        text: req.body.message
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ', info.response);
        }
    });
})

app.listen(port);
console.log('The magic happens on port ' + port);
