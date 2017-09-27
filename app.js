'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var users = require('./routes/users');
var posts = require('./routes/posts');
app.use('/', users);
app.use('/', posts);

app.get('/', function(req, res) {
    res.send('Hello World')
})

app.listen(3000)