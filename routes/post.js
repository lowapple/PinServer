'use strict';

var express = require('express');
var router = express.Router();
var post = require('../core/services/post');

// User Signup
router.post('/post/posting', function(req, res) {
    post.posting(req, res);
})

module.exports = router;