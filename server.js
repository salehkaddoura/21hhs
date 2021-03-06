require('newrelic')
var express = require('express');
var app = express();
var path = require('path');
var errorHandler = require('errorhandler');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var port = process.env.PORT || 8080;
// process.env.NODE_ENV = 'development';

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

app.get('/pt', function(req, res) {
    res.render('pt');
});

app.get('/ot', function(req, res) {
    res.render('ot');
});

app.get('/st', function(req, res) {
    res.render('st');
});

app.get('/hha', function(req, res) {
    res.render('hha');
});

app.get('/msw', function(req, res) {
    res.render('msw');
});

app.get('/nursing', function(req, res) {
    res.render('nursing');
});

app.get('/about', function(req, res) {
    res.render('about');
})

app.post('/contacthhs', function(req, res) {
    console.log(req.body);
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: '21centuryhhs@gmail.com',
            pass: 'phone123'
        }
    });

    var mailOptions = {
        from: req.body.email,
        to: 'contact@21hhs.com',
        subject: 'New Customer',
        text: 'Name: ' + req.body.fullname + '\n' +
             'Email: ' + req.body.email + '\n' +
             'Telephone: ' + req.body.telephone + '\n' +
             'Zipcode: ' + req.body.zipcode + '\n' +
             'Message: ' + req.body.message 
    }

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ', info.response);
            res.status(200).send('<p>Success!</p>');
        }
    });
});

function keepAwake() {
    console.log('ping!');
}

setInterval(keepAwake, 5000);

app.listen(port);
console.log('The magic happens on port ' + port);
