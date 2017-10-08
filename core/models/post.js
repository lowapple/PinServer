'use strict';

var mongoose = require('mongoose');

// 파일, 이미지 종류는 해시값을 계산해서 저장한다.
var postSchema = mongoose.Schema({
    id: 'Number',       // 아이디
    time : 'Date',      // 시간
    title: 'String',    // 제목
    contents: 'String', // 내용
    images: 'String',   // 이미지 리스트
    sns: 'String',      // SNS 리스트
});

module.exports = postSchema;