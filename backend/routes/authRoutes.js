const express = require('express');
const router = express.Router();
const authController = require('../controlllers/authControllers')
const protectRoute = require('../middleware/protectRoute')

router.post('/signup', authController.signupController);

router.post('/login', authController.loginController);

router.post('/logout', authController.logoutController);

router.get('/authCheck', protectRoute, authController.authCheck)

module.exports = router;
