var mongoose = require('mongoose');
var userSchema = require('../models/user');

// User Database
mongoose.connect('mongodb://localhost/pinpost', { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("open db users");
});

// User Data
var User = mongoose.model('users', userSchema);

// Signup
module.exports = {
    signup: (json, res) =>{
        var user = new User(json);
        var promise = new Promise((resolve, reject)=>{
            user.save((err, user)=>{
                if(err)
                    resolve(false);
                else
                    resolve(true);
            })
        }).then((result)=>{
            result = !result;
            return { success : result };
        });

        return promise;
    },
    signin: (json, res)=>{
        // 비교 후 반환
        var promise = new Promise((resolve, reject)=>{
            
        }).then((result)=>{
            
        });
        return promise;
    }
};