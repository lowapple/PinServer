var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    user_id : String,
    sns_name : String,
    email: String,
    singup_date : { type: Date, default: Date.now }
});

var User = mongoose.model('user', userSchema);

module.exports = User;