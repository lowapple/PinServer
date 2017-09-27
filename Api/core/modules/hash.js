'use strict';

const hasha = require('hasha');

module.exports = {
    // 단 방향성 해싱
    // 단 방향성 해싱은 다시 복호화가 필요 없는 경우 쓰임
    // 이 프로젝트에서 쓰이는 곳 : 폴더 해싱
    unidirectionalEncrypt: (value, type) => {
        if (type == null) type = 'md5';
        return hasha(value, { algorithm: type });
    },

    // 이미지 파일의 해쉬 값을 가져옵니다
    getFileHash: (filePath) => {
        return hasha.fromFile(filePath, { algorithm: 'md5' })
            .then((result) => {
                return result;
            })
            .catch((err) => {
                return err;
            });
    },

    getFileHashes: (filePaths) => {
        var paths = filePaths;
        var promises = [];

        console.log('getFIleHashes : ' + filePaths);
        paths.forEach((path) => {
            var promise = require('./hash').getFileHash(path)
                .then((result) => {
                    console.log('getFIleHashes : ' + result);
                    return result;
                });

            promises.push(promise);
        });

        return Promise.all(promises)
            .then((result) => {
                return result;
            });
    }
};