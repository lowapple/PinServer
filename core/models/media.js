'use strict';

var mongoose = require('mongoose');

var mediaSchema = mongoose.Schema({
    id : 'int',
    count : 'int',
    path : 'string'
});

module.exports = mediaSchema;