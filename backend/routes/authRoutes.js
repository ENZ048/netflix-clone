const express = require('express');
const router = express.Router();
const authController = require('../controlllers/authControllers')

router.get('/signup', authController.signupController);

router.get('/login', authController.loginController);

router.get('/logout', authController.logoutController);

module.exports = router;
