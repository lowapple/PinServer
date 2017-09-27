'use strict';

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: 'string',
    email: 'string',
    password : 'string',
});

module.exports = userSchema;