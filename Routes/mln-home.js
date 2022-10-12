const path = require('path');
const express = require('express');
const request = require('request');
const mlnDashController = require('../Controllers/mln-home');

const isAuth = require('../Middleware/is-auth');

const router = express.Router();

router.get('/', mlnDashController.getIndex);

router.get('/viewfile', mlnDashController.getViewFile);
router.post('/viewfile', mlnDashController.postViewFile);


module.exports = router;
