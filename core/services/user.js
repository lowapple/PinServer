
var User = require('../models/user');

module.exports = {
    find_user : (name)=>{
        User.findOne({name : name}, (err, user)=>{
            if(err) return res.status(500).json({error: err});
            if(!user) return res.status(404).json({error: 'user not found'});
            res.json(user);
        });
    },
    is_find_user : (name)=>{
        var promise = new Promise((resolve, reject)=>{
            User.findOne({name : name}, (err, user)=>{
                if(!user) resolve(false);
                resolve(true)
            });
        })
        return promise;
    },
    signup: (req, res) =>{
        require('./user').is_find_user(req.body.name).then((result)=>{
            // 유저가 없을때만 회원가입한다.
            if(!result) {
                var user = new User({
                    user_id : '1',
                    sns_name : req.body.sns_name,
                    email: req.body.email
                });

                user.save((err)=>{
                    if(err){
                        console.error(err);
                        res.json({result : false, signup : false});
                        return;
                    }
                    else {
                        res.json({result : true, signup : true});
                    }
                })
            } else {
                res.json({result : true, signup : false})
            }
        })
    }
};