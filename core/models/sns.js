var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * sns별 글 수를 저장한다.
 */
var snsSchema = new Schema({
    author : String,
    sns_name : String,
    post_count : Number
});

var SNS = mongoose.model('sns', snsSchema);

module.exports = SNS;