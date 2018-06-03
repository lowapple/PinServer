'use strict';

var express = require('express');
var router = express.Router();
var media = require('../core/services/media');

// User Signup
router.get('/media/:media_id', (req, res) => {
    media.get_media(req, res);
});

module.exports = router;