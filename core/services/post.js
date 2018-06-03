var multiparty = require('multiparty');
var fs = require('fs');
var dispersion = require('../modules/dispersion');
var fileLoader = require('../modules/fileLoader');
var Post = require('../models/post');

// TODO

// 1. 포스트 수정 시 연관 데이터 수정
// ( SNS, MEDIA ) 연결된 것 처리하기
// Prev, Next 비교


// Post 관련 함수
module.exports = {
    // 포스트 데이터를 입력함
    posting_query : (req, res, data)=>{
        try{
            var fields = data.fields;
            var files = data.files;
            // User ID
            var user_id = fields.find((value)=>{ return value.name == "user_id"; }).value;
            // SNS
            var sns_list = fields.find((value)=>{ return value.name == "sns"; }).value;
            var sns = JSON.parse(sns_list)["sns"];
            console.log(sns);

            var tag_list = fields.find((value)=>{ return value.name == "tag" }).value;
            // var tag = JSON.parse(tag_lsit)["tag"];
            console.log(tag_list);

            // Title
            var title = fields.find((value)=>{ return value.name == "title"; }).value;
            // Contents
            var contents = fields.find((value)=>{ return value.name == "contents"; }).value;
            // Images
            var images = "";
            files.forEach((value, index)=>{
                images += value.name;
                if (index != files.length-1){
                    images += ",";
                }
            });
        }
        catch (err) {
            console.log(err);
        }
        finally {
            Post.count({
                author : user_id
            }, (err, post_count)=>{
                var post_id = post_count + 1;
                Post.findOne({
                    author : user_id,
                    id : post_id
                }, (err, rpost)=>{
                    if(!rpost){
                        var post = new Post({
                            author : user_id,
                            id : post_id,
                            title : title,
                            contents : contents,
                            images : images,
                            sns : sns,
                            tag : tag_list
                        });

                        post.save((err)=>{
                            if (err) {
                                console.log('post error : ' + err);
                                res.json({result : false});
                            } else {
                                console.log('sending post : ' + post);
                                // 미디어 추가
                                require('./media').add_media(post_id, files);
                                sns = sns.split(',');
                                sns.forEach((value, index)=>{
                                    if(value != ''){
                                        require('./sns').add_post(user_id, value);
                                    }
                                });
                                res.json({result : true});
                            }
                        });
                    }
                });
            });
        }
    },
    // posting_query를 사용하여
    // 데이터를 입력한다.
    posting : (req, res)=>{
        fileLoader.get_postdata(req).then((data)=>{
            require('./post').posting_query(req, res, data);
        });
    },
    // 포스트 데이터를 받아옴
    get_posts : (req, res)=>{
        var user_id = req.body.user_id;
        var page = parseInt(req.body.page);
        
        Post.find({
            author : user_id
        }, (err, posts)=>{
            if(!posts)
                res.json({ result : null })
            res.json({posts});
        }).sort({ date : -1 }).skip(page).limit(10);
    },
    // 포스트 항목을 삭제함
    remove_posts : (req, res) => {
        // 포스트 DB에서 삭제
        Post.findOneAndRemove({
            author : req.body.user_id,
            id : req.body.post_id 
        }, (err, post)=>{
            if(err){
                console.debug(err);
                res.json({
                    result : false,
                    err : err
                });
            } else {
                if (!post){
                    res.json({
                        result : false
                    });
                } else {
                    // SNS 카운트 제거
                    // Media 제거
                    // 이미지 제거
                    var imageList = post.images.split(',');
                    var snsList = post.sns.split(',');

                    imageList.forEach((value, index)=>{
                        require('./media').remove_media(value).then((value)=>{
                            if(value != false){
                                fileLoader.remove_image(value.filename, value.filetype);
                            }
                        });
                    });
                    
                    snsList.forEach((value, index)=>{
                        if(value != ''){
                            require('./sns').remove_post(req.body.user_id, value);
                        }
                    });

                    res.json({
                        result : true
                    });
                }
            }
        });
    }
};