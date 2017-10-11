var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    sns_name : String,
    name: String,
    email: String,
    singup_date : { type: Date, default: Date.now }
});

var User = mongoose.model('user', userSchema);

module.exports = User;