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

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var user = require('./routes/user');
var posts = require('./routes/post');
var media = require('./routes/media');
var sns = require('./routes/sns');
app.use('/', user);
app.use('/', posts);
app.use('/', media);

app.get('/', function(req, res) {
    res.send('PinPost API Server');
})

app.listen(3000);