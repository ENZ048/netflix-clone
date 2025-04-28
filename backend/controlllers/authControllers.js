const loginController = async (req , res) => {
    try{
        res.status(200).json({
            success: true,
            message: 'User logged in successfully'
        })
    }
    catch(err){
        console.log('Error in logging in', err);
        res.status(500).json({
            success: false,
            message: 'Error in logging in the user',
            data: err
        })
    }
}
const signupController = async (req , res) => {
    try{
        res.status(200).json({
            success: true,
            message: 'User registered successfully'
        })
    }
    catch(err){
        console.log('Error in signup', err);
        res.status(500).json({
            success: false,
            message: 'Error in signup the user',
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