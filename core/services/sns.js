var SNS = require('../models/sns');

module.exports = {
    add_post : (author, sns_name)=>{
        SNS.findOne({
            author : author,
            name : sns_name
        }, (err, sns)=>{
            if(err) return;
            if(!sns){
                var sns = new SNS({
                    author : author,
                    name : sns_name,
                    count : 1
                });
                sns.save((err)=>{
                    if(err){
                        console.error(err);
                    }
                });
            } else {
                sns.count += 1;
                sns.save((err)=>{
                    if(err){
                        console.error(err);
                    }
                })
            }
        });
    },
    get_post : (req, res) => {
        SNS.find({
            author : req.params.user_id
        }, (err, sns)=>{
            if(err) { console.error(err); return; }
            if(sns){
                res.json({ result : true, sns });
            } else {
                res.json({ result : false });
            }
        });
    },
    get_post_by_sns : (req, res) => {        
        SNS.findOne({
            author : req.params.user_id,
            name : req.params.sns_name
        }, (err, sns)=>{
            if(err) return;
            if(sns){
                res.json({ result : true, sns });
            } else {
                res.json({ result : false });
            }
        });
    }
}