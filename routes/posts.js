'use strict';

var express = require('express');
var router = express.Router();
var postService = require('../core/services/postService');

// User Signup
router.post('/post/posting', function(req, res) {
    console.log('posting');

    postService.posting(req, res);
    res.send({ "success": "fuckyou" });
})

module.exports = router;