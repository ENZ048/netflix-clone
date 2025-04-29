const express = require('express');
const ENV_VARS = require('./config/envVars');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const tvRoutes = require('./routes/tvRoutes');

const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movie', movieRoutes);
app.use('/api/v1/tv', tvRoutes);

const PORT = ENV_VARS.PORT;
app.listen(PORT, (err)=> {
    if(err){
        console.log("Error listening to the server", err);
    }
    else{
        console.log(`Listening to the server at ${PORT}`);
        connectDB();
    }
})