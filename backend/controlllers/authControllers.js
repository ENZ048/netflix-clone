const UserModel = require('../models/userModels');
const generateTokenAndSetCookie = require('../utils/generateToken');
const bcryptjs = require('bcryptjs')

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

        const newUser = new UserModel({
            username,
            email,
            password,
            image
        })

        generateTokenAndSetCookie(newUser._id, res);

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
    catch (err) {
        console.log('Error in signup', err);
    
        let errorMessage = 'Error in signing up the user';
    
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            errorMessage = messages.join(', ');
        }
    
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            errorMessage = 'Email already exists';
        }
    
        res.status(500).json({
            success: false,
            message: errorMessage,
            data: err
        });
    }
}
const loginController = async (req , res) => {
    try{

        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await UserModel.findOne({email: email});

        if(!user){
            return res.status(404).json({
                success: false,
                message: "No user registred with this email, signup instead"
            });
        }

        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(404).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            user: {
                ...user._doc,
                password: "",
            }
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

        res.clearCookie("jwt-netflix");

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

const authCheck = async (req,res)=>{
    try {
        res.status(200).json({
            success: true,
            user: req.user
        })
    } catch (error) {
        console.log("Error in AUthCheck", error);
        res.status(500).json({
            success:false,
            message: "Internal Server Error"
        })
    }
}

module.exports = {loginController, logoutController, signupController, authCheck}