var multiparty = require('multiparty');
var fs = require('fs');
var dispersion = require('../modules/dispersion');
var fileLoader = require('../modules/fileLoader')
var Post = require('../models/post');

// Post 관련 함수
module.exports = {
    posting_query : (req, res, data)=>{
        try{
            var author = 'ndeveat';
            var post_id = 1;
            var fields = data.fields;

            // 이미지 삽입
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

            var sns = req.body.sns;
        }
        catch (err) {
            console.log(err);
        }
        finally {
            Post.findOne({
                author : author,
                post_id : post_id
            }, (err, rpost)=>{
                if(!rpost){
                    var post = new Post({
                            author : 'req.body.user_id',
                            post_id : 1,
                            title : title.value,
                            contents : title.value,
                            images : images,
                            sns : sns
                        }
                    );

                    post.save((err)=>{
                        if(err){
                            console.log('post error : ' + err);
                            res.json({result : false});
                        } else {
                            console.log('sending post : ' + post);
                            require('./media').add_media(post_id, files);
                            res.json({result : true});
                        }
                    });
                }
            });
        }
    },
    posting : (req, res)=>{
        fileLoader.get_postdata(req).then((data)=>{
            require('./post').posting_query(req, res, data);
        });
    }
};