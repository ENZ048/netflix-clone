const express = require('express');
const router = express.Router();
const searchControllers = require('../controlllers/searchControllers');

router.get('/person/:query', searchControllers.searchPerson);
router.get('/movie/:query', searchControllers.searchMovie);
router.get('/tv/:query', searchControllers.searchTv);

router.get('/history', searchControllers.getSearchHistory);
router.delete('/history/:id', searchControllers.removeFromSearchHistory);

module.exports = router;