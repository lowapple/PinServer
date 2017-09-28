'use strict';

var express = require('express');
var router = express.Router();
var postService = require('../core/services/postService');

// User Signup
router.post('/post/posting', function(req, res) {
    console.log('posting');

    postService.posting(req, res).then((data)=>{
        res.send({ "success" : true });
    }).catch(()=>{
        res.send({ "success" : false})
        console.log('posting fail');
    });
})

module.exports = router;