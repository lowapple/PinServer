'use strict';

var mongoose = require('mongoose');

var mediaSchema = mongoose.Schema({
    id : 'Number',      // 포스트 ID
    count : 'Number',   // 이미지 순서
    path : 'String',    // 이미지 위치
    origin : 'String',  // 원제
});

module.exports = mediaSchema;