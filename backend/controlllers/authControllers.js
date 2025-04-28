const UserModel = require('../models/userModels');
const bcryptjs = require('bcryptjs');


const signupController = async (req , res) => {
    try{

        const {username, email, password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingEmail = await UserModel.findOne({email: email});

        if(existingEmail){
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const existingUsername = await UserModel.findOne({username: username});

        if(existingUsername){
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            });
        }

        const PROFILE_PICS = ['/avatar1.png', '/avatar2.png', '/avatar3.png']; 

        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword,
            image
        })

        await newUser.save();

        res.status(200).json({
            success: true,
            message: 'User registered successfully',
            user: {
                ...newUser._doc,
                password: "",
            }
        })
    }
    catch(err){
        console.log('Error in signup', err);
        res.status(500).json({
            success: false,
            message: 'Error in signing up  the user',
            data: err
        })
    }
}
const loginController = async (req , res) => {
    try{
        res.status(200).json({
            success: true,
            message: 'User Logged in successfully'
        })
    }
    catch(err){
        console.log('Error in Login', err);
        res.status(500).json({
            success: false,
            message: 'Error in logging in the user',
            data: err
        })
    }
}
const logoutController = async (req , res) => {
    try{
        res.status(200).json({
            success: true,
            message: 'User logged out successfully'
        })
    }
    catch(err){
        console.log('Error in logging out', err);
        res.status(500).json({
            success: false,
            message: 'Error in logging out the user',
            data: err
        })
    }
}

module.exports = {loginController, logoutController, signupController}