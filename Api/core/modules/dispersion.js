'use strict';

var folder = require('./folderControl'),
    time = require('./time'),
    config = require('../config'),
    hash = require('./hash');

module.exports = {
    dispersion: () => {
        var path = config.path.image,
            folderName = hash.unidirectionalEncrypt(time.getTime(), 'md5');
        return folder.getCountByFolder(path)
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