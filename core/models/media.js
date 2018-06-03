var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mediaSchema = Schema({
    post_id : Number,      // 포스트 ID
    id : String,    // 이미지 위치
    count : Number,   // 이미지 순서
    origin : String,  // 원제
    type : String
});

var Media = mongoose.model('media', mediaSchema)

module.exports = Media;