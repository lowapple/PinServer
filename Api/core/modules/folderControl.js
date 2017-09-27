'use strict';

var fs = require('fs'),
    path = require('path');

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
        var folder = '.' + path;

        var promise = new Promise((resolve, reject) => {
            return fs.readdir(folder, (err, files) => {
                if (err) throw reject(true);
                if (files.length == 0) return resolve(false);
                files.forEach((file) => {
                    if (file == name) {
                        return resolve(true);
                    } else {
                        return resolve(false);
                    }
                });
            });
        });

        return promise;
    },
    createFolder: (folder, name) => {
        var promise = new Promise((resolve, reject) => {
            var tg = path.join('.' + folder, name);

            return fs.mkdir(tg, 777, (err) => {
                if (err) return reject(err);
                else return resolve(true);
            });
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