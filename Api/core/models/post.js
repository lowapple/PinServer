'use strict';

var mongoose = require('mongoose');

// 파일, 이미지 종류는 해시값을 계산해서 저장한다.
var postSchema = mongoose.Schema({
    title: 'string',
    contents: 'string',
    imageId : 'string',
});

module.exports = postSchema;