'use strict';

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: 'string',
    email: 'string',
    password: 'string',
});

module.exports = userSchema;