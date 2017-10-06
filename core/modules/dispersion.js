'use strict';

var folder = require('./folderControl'),
    time = require('./time'),
    config = require('../config'),
    hash = require('./hash');

module.exports = {
    dispersion: () => {
        var path = config.path.image,
            folderName = hash.unidirectionalEncrypt(time.getTime(), 'md5');

        return folder.getFolder(path, folderName);
    }
}