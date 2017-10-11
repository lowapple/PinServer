var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var snsSchema = new Schema({
    author : String,
    sns_name : String,
    is_login : { type : Boolean, default : false }
});

var SNS = mongoose.model('sns', snsSchema);

module.exports = SNS;