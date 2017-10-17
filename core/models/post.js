
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 파일, 이미지 종류는 해시값을 계산해서 저장한다.
var postSchema = new Schema({
    author : String,
    id: Number,  // postId
    title: String,    // 제목
    contents: String, // 내용
    images: String,   // 이미지 리스트
    sns: String,      // SNS 리스트
    date : { type: Date, default: Date.now }
});

// Post Data
var Post = mongoose.model('post', postSchema);

module.exports = Post;