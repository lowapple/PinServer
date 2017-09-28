'use strict';

var express = require('express');
var router = express.Router();
var userService = require('../core/services/userService');

// User Signup
router.post('/user/signup', function(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    console.log(username);

    var user = { username: username, email: email, password: password };
    console.log(user);

    userService.signup(user, res).then((result)=>{
        if(result){
            res.send({success:result});
            console.log('signup ' + username);
        }
    });
});

router.post('/user/signin', (req, res)=>{
    var email = req.body.email;
    var password = req.body.email;

    var user = { email : email, password : password };

    res.send(userService.signin(user, res));
});

module.exports = router;