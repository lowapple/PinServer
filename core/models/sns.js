var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * sns별 글 수를 저장한다.
 */
var snsSchema = new Schema({
    author : String,
    name : String,
    count : Number
});

var SNS = mongoose.model('sns', snsSchema);

module.exports = SNS;