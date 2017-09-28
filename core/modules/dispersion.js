'use strict';

var folder = require('./folderControl'),
    time = require('./time'),
    config = require('../config'),
    hash = require('./hash');

module.exports = {
    dispersion: () => {
        var path = config.path.image,
            folderName = hash.unidirectionalEncrypt(time.getTime(), 'md5');

        console.log('folderName : ' + folderName);
        return folder.getFolder(path, [folderName])
            .then((result) => {
                if (result == 0) {
                    return folder.createFolders(path, [folderName])
                        .then(() => {
                            return path + '/' + folderName;
                        });
                } else {
                    return path + '/' + folderName;
                }
            });
    }
}