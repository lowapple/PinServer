var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mediaSchema = Schema({
    post_id : Number,      // 포스트 ID
    count : Number,   // 이미지 순서
    path : String,    // 이미지 위치
    origin : String,  // 원제
    type : String
});

var Media = mongoose.model('media', mediaSchema)

module.exports = Media;