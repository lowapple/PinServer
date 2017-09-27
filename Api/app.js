'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express()

var users = require('./routes/users');
app.use('/', users);

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000)