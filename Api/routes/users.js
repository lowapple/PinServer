'use strict';

var express = require('express');
var router = express.Router();
var userService = require('../../Core/services/userService');

// User Signup
router.post('/signup', function(req, res){
    var useremail = req.body.name,
        email     = req.body.email,
        password  = req.body.password;

    var user = { useremail : useremail, email : email, password : password };

    res.send(userService.signup(user));
})

module.exports = router;