const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const tvRoutes = require('./routes/tvRoutes');
const searchRoutes = require('./routes/searchRoutes');
const trendingRoutes = require('./routes/trendingRoutes');

const ENV_VARS = require('./config/envVars');
const connectDB = require('./config/db');
const protectRoute = require('./middleware/protectRoute');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movie', protectRoute, movieRoutes);
app.use('/api/v1/tv', protectRoute, tvRoutes);
app.use('/api/v1/search', protectRoute, searchRoutes);
app.use('/api/v1/', trendingRoutes);

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