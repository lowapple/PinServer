var Media = require('../models/media');
var FileLoader = require('../modules/fileLoader');
module.exports = {
    add_media : (post_id, files) => {
        files.forEach((value, index)=>{
            Media.findOne({
                post_id : post_id,
                count : index
            }, (err, media)=>{
                if(!media){
                    var media = new Media({
                        post_id : post_id,
                        id : value.name,
                        count : index,
                        origin : value.origin,
                        type : value.type
                    });
                    
                    media.save((err)=>{
                        if(err) {
                            console.error(err);
                        }else {
                            console.log(media);
                        }
                    }); 
                }
            })
        });
    },
    get_media: (req, res)=>{
        Media.findOne({
            id : req.params.media_id
        }, (err, media)=>{
            res.json({media});
        }).sort({
            count : 1
        });
    },
    remove_media: (id)=>{
        var promise = new Promise((resolve, reject)=>{
            Media.find({
                id : id
            }, (err, media)=>{
                if(err) {
                    console.error(err);
                    resolve(false);
                }else {
                    if(!media){
                        console.log('media remove error');
                        resolve(false);
                    }else {
                        resolve({
                            filename : media.id,
                            filetype : media.type
                        });
                    }
                }
            });
        });

        return promise;
    }
};