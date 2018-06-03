'use strict';

var folder = require('./folderControl'),
    time = require('./time'),
    config = require('../config'),
    hash = require('./hash');

module.exports = {
    dispersion: (filename) => {
        var folderName = hash.unidirectionalEncrypt(time.getTime() + filename, 'md5');
        return new Promise((resolve, reject)=>{
            resolve(folderName);
        });
    }
}