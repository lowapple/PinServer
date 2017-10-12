var SNS = require('../models/sns');

module.exports = {
    is_sns : (author, sns_name)=>{
        var promise = new Promise((resolve, reject)=>{
            SNS.findOne({author : author, sns_name : sns_name}, (err, sns)=>{
                if(err) resolve(false);
                else resolve(true);
            });
        })
        return promise;
    },
    login_sns : (req, res)=>{
        require('./sns').is_sns(req.body.author, req.body.sns_name).then((result)=>{
            if(!result){
                var sns = new SNS({
                    author : req.body.author, 
                    sns_name : req.body.sns_name, 
                    is_login : true 
                })
                sns.save((err)=>{
                    if(err){
                        console.error(err);
                        res.json({result : false});
                    }else {
                        res.json({result : true })
                    }
                });
            } else {
                SNS.findOne({author : req.body.author, sns_name : req.body.sns_name}, (err, sns)=>{
                    sns.is_login = true;
                    sns.save((err)=>{
                        if(err) res.json({result : false});
                        else res.json({result : true});
                    })
                })
            }
        });
    },
    logout_sns : (req, res)=>{

    }
}