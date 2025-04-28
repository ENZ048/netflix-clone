const express = require('express');
const router = express.Router();
const authController = require('../controlllers/authControllers')

router.post('/signup', authController.signupController);

router.post('/login', authController.loginController);

router.post('/logout', authController.logoutController);

module.exports = router;
