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
    }
}