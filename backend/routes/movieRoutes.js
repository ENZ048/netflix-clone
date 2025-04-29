const express = require('express');
const router = express.Router();
const movieController = require('../controlllers/movieController');

router.get('/trending',movieController.getTrendingMovie);
router.get('/trailers/:id',movieController.getTrailers);

module.exports = router;