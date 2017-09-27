'use strict';

module.exports = {
    encrypto : function (string) {
        return new Buffer(string).toString('base64');
    },
    decrypto : function (string) {
        return new Buffer(string, 'base64').toString('utf8');
    }
};