'use strict';

var express = require('express');
var router = express.Router();
var sns = require('../core/services/sns');

router.get('/sns/:user_id', (req, res)=>{
    sns.get_post(req, res);
});

router.get('/sns/:user_id/:sns_name', (req, res)=>{
    sns.get_post_by_sns(req, res);
});

module.exports = router;