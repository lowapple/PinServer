'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pinpost', { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("open db");
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

var user = require('./routes/user');
var posts = require('./routes/post');
app.use('/', user);
app.use('/', posts);

app.get('/', function(req, res) {
    res.send('Hello World')
})

app.listen(3000)