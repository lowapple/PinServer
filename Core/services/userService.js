var mongoose = require('mongoose');
var userSchema = require('../models/user');

// User Database
mongoose.connect('mongodb://localhost/pinpost', { useMongoClient : true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  	console.log("open");
});

// User Data
var User = mongoose.model('users', userSchema);

// Signup
module.exports = {
    signup : function(json){
        var user = new User({ username: 'ndeveat', email : 'ndeveat@gmail.com', password : 'a741236985B@' });
        return user.save(function (err, user) {
            if (err)
                return { success : false };
            else
                return { success : true };
        });
    }
};