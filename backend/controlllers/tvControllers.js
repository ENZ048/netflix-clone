const fetchFromTMDB = require('../services/tmdb.service')

const getTrendingTv = async (req, res) => {
    try {
        const data = await fetchFromTMDB('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1');
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

        res.status(200).json({
            success: true,
            message: "Trending Tv fetched successfully",
            content: randomMovie
        })
    }
    catch (err) {
        console.log("Error in fetching trending tv", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getTrailers = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);

        res.status(200).json({
            success: true,
            message: "Trailer fetched successfully",
            trailers: data.results
        })
    }
    catch (err) {
        console.log("Error in fetching trailers", err);

        if (err.message.includes('404')) {
            return res.status(404).send(null)
        }

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getTvDetails = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);

        res.status(200).json({
            success: true,
            message: "Details fetched successfully",
            content: data
        })
    }
    catch (err) {
        console.log("Error in fetching details", err);

        if (err.message.includes('404')) {
            return res.status(404).send(null)
        }

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getSimilarTvs = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);

        res.status(200).json({
            success: true,
            message: "Similar tvs fetched successfully",
            content: data
        })
    }
    catch (err) {
        console.log("Error in fetching similar tvs", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

const getTvsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(
            `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1&region=IN`
        );


        res.status(200).json({
            success: true,
            message: "Tvs fetched by category successfully",
            content: data
        })
    }
    catch (err) {
        console.log("Error in fetching tvs by category", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

module.exports = { getTrendingTv, getTrailers, getSimilarTvs, getTvDetails, getTvsByCategory };