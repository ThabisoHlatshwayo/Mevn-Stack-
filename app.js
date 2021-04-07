var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var dashboard = require('./routes/dashboard');
var auth = require('./routes/auth');

var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/mevnstack', { 
    promiseLibrary: require('bluebird')
})
.then(() => console.log('Connection successful'))
.catch((err) => console.error(err));

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/dishboards', express.static(path.join(__dirname, 'dist')));
app.use('/dashboard', dashboard);
app.use('/api/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//restful api error handler
app.use(function(err, req, res, next) {
    console.log(err);

    if (req.app.get('env') !== 'development') {
        delete err.stack;
    }

    res.status(err.statusCode || 500).json(err);
});

module.exports = app;