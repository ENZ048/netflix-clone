const express = require('express');
const router = express.Router();
const movieController = require('../controlllers/movieController');

router.get('/trending',movieController.getTrendingMovie);
router.get('/trailers/:id',movieController.getTrailers);
router.get('/details/:id',movieController.getMovieDetails);
router.get('/similar/:id',movieController.getSimilarMovies);
router.get('/category/:category',movieController.getMoviesByCategory);

module.exports = router;