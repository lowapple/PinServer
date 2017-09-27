'use strict';

var express = require('express');
var router = express.Router();
var postService = require('../core/services/postService');

// User Signup
router.post('/posting', function(req, res){
    var username  = req.body.title;
    var email     = req.body.contents;
    // 이미지를 가져온다.
    var password  = req.body.password;

    var user = { username : username, email : email, password : password };

    res.send(userService.signup(user));
})

module.exports = router;