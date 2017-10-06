'use strict';

var fs = require('fs');

module.exports = {
    getCountByFolder: (path) => {
        var folder = '.' + path;

        var promise = new Promise((resolve, reject) => {
            return fs.readdir(folder, (err, files) => {
                if (err) return reject(err);
                return resolve(files.length);
            });
        });

        return promise;
    },
    isOverlap: (path, name) => {
        var folder = '.' + path + '/' + name;
        var promise = new Promise((resolve, reject) => {
            return fs.readdir(folder, (err, files) => {
                if (err) throw reject(err);
                resolve(false);
            });
        });
        return promise;
    },
    createFolder: (path, name) => {
        var promise = new Promise((resolve, reject) => {
            var tg = '.' + path + '/' + name;
            console.log(tg);

            return fs.mkdir(tg, 777, (err) => {
                if (err) resolve(false);
                resolve(true);
            });
        });

        return promise;
    },
    getFolder: (dir, name) => {
        var promise = new Promise((resolve, reject) => {
            var overlap = require('./folderControl').isOverlap(dir, name).then((result) => {
                console.log('overlap : ' + result)
                // Not file folder
                if (!result) {
                    var cf = require('./folderControl').createFolder(dir, name).then((result) => {
                        console.log('create folder : ' + result)
                        return result;
                    });
                    return resolve(cf);
                } else {
                    return dir + '/' + name;
                }
            });

            resolve(overlap);
        });
        return promise;
    },
    createFolders: (dir, creates) => {
        var folder = dir;
        var results = [];

        var promise = new Promise((resolve, reject) => {
            for (var fold in creates) {
                require('./folderControl').isOverlap(folder, creates[fold])
                    .then((result) => {
                        if (!result) {
                            require('./folderControl').createFolder(folder, creates[fold])
                                .then((result) => {
                                    if (result == null) return reject(false);
                                    results.push(result);
                                    folder = path.join('.' + folder, creates[fold]);
                                });
                        }
                    })
            }

            return resolve(results);
        });

        return promise;
    }
};