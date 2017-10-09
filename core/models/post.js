'use strict';

var mongoose = require('mongoose');
// Post Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/pinpost', { useMongoClient: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("open db posts");
});

var postCount = db.collection('posts').find().count((value)=>{
    console.log(value);
});

// 파일, 이미지 종류는 해시값을 계산해서 저장한다.
var postSchema = mongoose.Schema({
    id: 'Number',       // 아이디
    time : 'Date',      // 시간
    title: 'String',    // 제목
    contents: 'String', // 내용
    images: 'String',   // 이미지 리스트
    sns: 'String',      // SNS 리스트
});

// Post Data
var Post = mongoose.model('posts', postSchema);

module.exports = {
    posting_query : (data)=>{
        try{
            var fields = data.fields;
            var files = data.files;

            var title = fields.find((value)=>{ return value.name == "Title"; });
            var contents = fields.find((value)=>{ return value.name == "Contents"; });
            var images = "";

            files.forEach((value, index)=>{
                images += value.path;
                if (index != files.length-1){
                    images += ",";
                }
            });
        }
        catch (err) {
            console.log(err);
        }
        finally {
            var post = new Post(
                {
                    id : 1,
                    time : new Date(),
                    title : title.value,
                    contents : title.value,
                    images : images,
                    sns : ""
                }
            )

            var promise = new Promise((resolve, reject)=>{
                post.save((err)=>{
                    if(err){
                        console.log('post error : ' + err);
                        reject(err);
                    }else {
                        console.log('sending post : ' + post);
                        resolve(true);
                    }
                })
            });

            return promise;
        }
    }
};