const mongoose = require('mongoose');
const ENV_VARS = require('./envVars');

const connectDB = async () => {
    try{
        const connection = await mongoose.connect(ENV_VARS.MONGO_URI);
        console.log("Connected to MongoDB");
    }
    catch(err){
        console.log("Error connecting to MongoDB", err);
    }
   
}

module.exports = connectDB;