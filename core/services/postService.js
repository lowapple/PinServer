'use strict';

var multiparty = require('multiparty');
var fs = require('fs');
var dispersion = require('../modules/dispersion');

// Post 관련 함수
module.exports = {
    posting: function(req, res) {
        // name : value
        // { title : "안녕하세요" }
        var fields = [];
        var files = [];
        var dispersions = [];
        var fileCount = 0;
        var form = new multiparty.Form();

        form.on('field', (name, value) => {
            console.log('field upload' + name + ' : ' + value);
            fields.push({ name: name, value: value });
        });

        // 여기서는 파일 업로드에 대해서 반응
        form.on('part', (part) => {
            console.log('file upload');
            var filename,
                size;

            var checkFile = (part.filename != '');

            // 파일인지 아닌지 구분하는 구문
            if (checkFile == false) {
                // 처리를 넘어감
                part.resume();
            } else {
                filename = part.filename;
                size = part.byteCount;
                var filetype = part.headers['content-type'].split('/')[1];
                
                console.log(filetype);

                // 파일이 맞으면 여기 들어옴
                // 파일 fs로 스트림 저장
                var writeStream = fs.createWriteStream(filename);
                writeStream.filename = filename;
                // HTTP request 스트림과 파일 writeStream을 파이프로 연결
                part.pipe(writeStream);
                // data에서 파일을 다 읽으면 발생
                part.on('end', () => {
                    if (checkFile == true) {
                        writeStream.end();
                        // get folder
                        // move images
                        var promise = dispersion.dispersion(filename).then((result) => {
                            var imagePath = result + '.' + filetype;
                            fs.renameSync(filename, imagePath, (err)=>{
                                console.log('image save : ' + imagePath);                                
                            })
                            fileCount += 1;
                            files.push(
                                {
                                    count : fileCount,
                                    origin : filename,
                                    path : imagePath,
                                    type : filetype,
                                }
                            );
                        });

                        dispersions.push(promise);
                    }
                });
            }
        });

        form.parse(req);

        return new Promise((resolve, reject) => {
            form.on('err', (err) => {
                reject(err);
            });

            form.on('close', () => {
                if (files == []) {
                    files = null;
                }
                Promise.all(dispersions).then(()=>{
                    var data = { fields: fields, files: files };
                    var promise = require('../models/post').posting_query(data);
                    resolve(promise);
                });
            });
        });
    }
};