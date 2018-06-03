var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id : Number,
    name : String,
    email: String,
    password : String,
    singup_date : { type: Date, default: Date.now }
});

var User = mongoose.model('user', userSchema);

module.exports = User;