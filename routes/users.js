'use strict';

var express = require('express');
var router = express.Router();
var userService = require('../core/services/userService');

// User Signup
router.post('/user/signup', function(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    var user = { username: username, email: email, password: password };

    res.send(userService.signup(user, res));
});

router.post('/user/signin', (req, res)=>{
    var email = req.body.email;
    var password = req.body.email;

    var user = { email : email, password : password };

    res.send(userService.signin(user, res));
});

module.exports = router;