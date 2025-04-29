const express = require('express');
const router = express.Router();
const tvController = require('../controlllers/tvControllers');

router.get('/trending', tvController.getTrendingTv);
router.get('/trailers/:id', tvController.getTrailers);
router.get('/details/:id', tvController.getTvDetails);
router.get('/similar/:id', tvController.getSimilarTvs);
router.get('/category/:category', tvController.getTvsByCategory);

module.exports = router;