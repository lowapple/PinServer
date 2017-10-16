'use strict';

var express = require('express');
var router = express.Router();
var user = require('../core/services/user');

router.post('/user/user', (req, res)=>{
    user.find_user_by_email(req, res);
});

// User Signup
router.post('/user/signup', (req, res)=> {
    user.signup(req, res);
});

router.post('/user/signin', (req, res)=>{
    user.signin(req, res);
});

module.exports = router;