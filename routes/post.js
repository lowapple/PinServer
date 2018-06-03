'use strict';

var express = require('express');
var router = express.Router();
var post = require('../core/services/post');

// User Signup
router.post('/post/posting', function(req, res) {
    post.posting(req, res);
});

router.post('/post/postlist', (req, res)=>{
    post.get_posts(req, res);
});

router.post('/post/remove', (req, res)=>{
    post.remove_posts(req, res);
});

module.exports = router;
