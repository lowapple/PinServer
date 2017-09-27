var mongoose = require('mongoose');
var postSchema = require('../models/post');
var multiparty = require('multiparty');
var fs = require('fs');

// Post Database
mongoose.connect('mongodb://localhost/pinpost', { useMongoClient : true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  	console.log("open");
});

// Post Data
var User = mongoose.model('posts', postSchema);

// Post 관련 함수
module.exports = {
    posting : function(json, images){

        var fields = [],
            files = [],
            paths = [],
            dispersionList = [];

        var form = new multiparty.Form();

        form.on('field', (name, value)=>{
            console.log('file upload');
            
            fields.push({name: name, value: value});
        });

        // 여기서는 파일 업로드에 대해서 반응
        form.on('part', (part) => {
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

                // 파일이 맞으면 여기 들어옴
                // 파일 fs로 스트림 저장
                var writeStream = fs.createWriteStream(filename);
                writeStream.filename = filename;
                // HTTP request 스트림과 파일 writeStream을 파이프로 연결
                part.pipe(writeStream);
                // data에서 파일을 다 읽으면 발생
                part.on('end', () => {
                    if (checkFile == true) {
                        files.push(filename);
                        writeStream.end();

                        var promise = dispersion.dispersion()
                            .then((result) => {
                                var createPath = '.' + result + '/' + filename;
                                paths.push(createPath);
                                fs.renameSync(filename, createPath);

                                return createPath;
                            });

                        dispersionList.push(promise);
                    }
                });
            }
        });

        var promise = new Promise((resolve, reject) => {
            form.on('err', (err) => {
                reject(err);
            });

            // 해당 part를 다 읽으면 발생
            form.on('close', () => {
                if (files == []) files = null;

                Promise.all(dispersionList)
                    .then(() => {
                        var data = {fields: fields, files: files, paths: paths};

                        resolve(data);
                    });
            });
        });

        form.parse(req);
        
        return promise;
    }
};