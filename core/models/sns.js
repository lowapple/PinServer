'use strict';

var mongoose = require('mongoose');

// sns의 로그인 형태
var snsSchema= mongoose.Schema({
    name: 'string',
});

module.exports = snsSchema;