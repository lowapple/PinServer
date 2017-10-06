'use strict';

var mongoose = require('mongoose');

var mediaSchema = mongoose.Schema({
    id : 'string',
    path : 'string'
});

module.exports = mediaSchema;