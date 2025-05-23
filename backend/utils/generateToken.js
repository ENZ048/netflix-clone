const jwt = require('jsonwebtoken')
const ENV_VARS = require('../config/envVars');

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, {expiresIn: "10d"});

    res.cookie("jwt-netflix", token, {
        maxAge: 10 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "Strict",
        secure: ENV_VARS.NODE_ENV !== 'development'
    });
};

module.exports = generateTokenAndSetCookie;