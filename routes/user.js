'use strict';

var express = require('express');
var router = express.Router();
var user = require('../core/services/user');

// User Signup
router.post('/user/signup', function(req, res) {
    user.signup(req, res);
});

module.exports = router;