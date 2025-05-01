const fetchFromTMDB = require('../services/tmdb.service')
const getTrendingContentIndia = async (req, res) => {
    try {
        // Popular general Indian content
        const generalMovies = await fetchFromTMDB(
            'https://api.themoviedb.org/3/discover/movie?region=IN&sort_by=popularity.desc&language=en-US&page=1'
        );

        const generalTv = await fetchFromTMDB(
            'https://api.themoviedb.org/3/discover/tv?region=IN&sort_by=popularity.desc&language=en-US&page=1'
        );

        // Indian-origin movies
        const indianMovies = await fetchFromTMDB(
            'https://api.themoviedb.org/3/discover/movie?with_origin_country=IN&sort_by=popularity.desc&language=en-US&page=1'
        );

        // Indian-origin TV shows
        const indianTv = await fetchFromTMDB(
            'https://api.themoviedb.org/3/discover/tv?with_origin_country=IN&sort_by=popularity.desc&language=en-US&page=1'
        );

        const topGeneralMovies = generalMovies.results.slice(0, 2);
        const topGeneralTv = generalTv.results.slice(0, 2);
        const topIndianMovies = indianMovies.results.slice(0, 3);
        const topIndianTv = indianTv.results.slice(0, 3);

        const trendingContent = [
            ...topIndianMovies,
            ...topIndianTv,
            ...topGeneralMovies,
            ...topGeneralTv
        ];

        res.status(200).json({
            success: true,
            message: "Trending content in India (including Indian-origin) fetched successfully",
            content: trendingContent
        });
    } catch (err) {
        console.log("Error in fetching trending content in India", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


module.exports = {getTrendingContentIndia};