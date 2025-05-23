const dotenv = require('dotenv');

dotenv.config();

const ENV_VARS = {
    MONGO_URI : process.env.MONGO_URI,
    PORT: process.env.PORT || 5001,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: 'development',
    TMDB_API_KEY: process.env.TMDB_API_KEY
}

module.exports = ENV_VARS;