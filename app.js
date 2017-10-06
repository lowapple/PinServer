'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

fs.mkdir('./test',777, (err)=>{
    console.log('create folder');
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

var users = require('./routes/users');
var posts = require('./routes/posts');
app.use('/', users);
app.use('/', posts);

app.get('/', function(req, res) {
    res.send('Hello World')
})

app.listen(3000)