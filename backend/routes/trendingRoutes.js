const express = require('express');
const router = express.Router();
const trendingController = require('../controlllers/trendingController');

router.get('/trendingIndia', trendingController.getTrendingContentIndia);

module.exports = router;