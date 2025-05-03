const fetchFromTMDB = require('../services/tmdb.service')

const getTrendingMovie = async (req, res) => {
    try{
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1');
        // console.log(data);
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

        res.status(200).json({
            success: true,
            message: "Trending movie fetched successfully",
            content: randomMovie
        })
    }
    catch(err){
        console.log("Error in fetching trending movie", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const  getTrailers = async(req,res) => {
    const {id} = req.params;
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);

        res.status(200).json({
            success: true,
            message: "Trailer fetched successfully",
            trailers: data.results
        })
    }
    catch(err){
        console.log("Error in fetching trailers", err);

        if(err.message.includes('404')){
            return res.status(404).send(null)
        }

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const  getMovieDetails = async(req,res) => {
    const {id} = req.params;
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);

        res.status(200).json({
            success: true,
            message: "Details fetched successfully",
            content: data
        })
    }
    catch(err){
        console.log("Error in fetching details", err);

        if(err.message.includes('404')){
            return res.status(404).send(null)
        }

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const  getSimilarMovies = async(req,res) => {
    const {id} = req.params;
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);

        res.status(200).json({
            success: true,
            message: "Similar movies fetched successfully",
            content: data
        })
    }
    catch(err){
        console.log("Error in fetching similar movies", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const  getMoviesByCategory = async(req,res) => {
    const {category} = req.params;
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&region=IN&page=1`);


        res.status(200).json({
            success: true,
            message: "Movies fetched by category successfully",
            content: data
        })
    }
    catch(err){
        console.log("Error in fetching movies by category", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

module.exports = {getTrendingMovie, getTrailers, getMovieDetails, getSimilarMovies, getMoviesByCategory};