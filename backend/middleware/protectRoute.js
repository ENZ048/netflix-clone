const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModels');
const ENV_VARS = require('../config/envVars');

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies["jwt-netflix"];

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No Token Provided"
            })
        }

        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Invalid Token"
            })
        }

        const user = await UserModel.findById(decoded.userId).select('-password');

        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        req.user = user;

        next();
    } catch (error) {
        console.log("Error in protect route middleware", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

module.exports = protectRoute;