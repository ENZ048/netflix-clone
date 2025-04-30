const fetchFromTMDB = require('../services/tmdb.service');
const UserModel = require('../models/userModels');

const searchPerson = async (req, res) => {
    const query = req.params.query;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);

        if(data.results.length === 0){
            return res.status(404).send(null);
        }

        await UserModel.findByIdAndUpdate(req.user._id, {
            $push: {
                seachHistory: {
                    id: data.results[0].id,
                    name: data.results[0].name,
                    image: data.results[0].profile_path,
                    searchType: "Person",
                    createdAt: new Date(),
                }
            }
        });

        res.status(200).json({
            success: true,
            data : data.results
        })
    } catch (error) {
        console.log('Error in searching for person', error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
const searchMovie = async (req, res) => {
    const query = req.params.query;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);

        if(data.results.length === 0){
            return res.status(404).send(null);
        }

        await UserModel.findByIdAndUpdate(req.user._id, {
            $push: {
                seachHistory: {
                    id: data.results[0].id,
                    title: data.results[0].title,
                    image: data.results[0].poster_path,
                    searchType: "Movie",
                    createdAt: new Date(),
                }
            }
        });

        res.status(200).json({
            success: true,
            data : data.results
        })
    } catch (error) {
        console.log('Error in searching for movie', error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
const searchTv = async (req, res) => {
    const query = req.params.query;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);

        if(data.results.length === 0){
            return res.status(404).send(null);
        }


        await UserModel.findByIdAndUpdate(req.user._id, {
            $push: {
                seachHistory: {
                    id: data.results[0].id,
                    title: data.results[0].name,
                    image: data.results[0].poster_path,
                    searchType: "TV",
                    createdAt: new Date(),
                }
            }
        });

        res.status(200).json({
            success: true,
            data : data.results
        })
    } catch (error) {
        console.log('Error in searching for tv', error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const getSearchHistory = async(req, res) => {
    try {
        res.status(200).json({
            success: true,
            searchHistory: req.user.seachHistory
        })
    } catch (error) {
        console.log('Error in fetching search history', error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}


const removeFromSearchHistory = async(req,res) => {
    let id = req.params.id;

    id = parseInt(id);

    try {
        await UserModel.findByIdAndUpdate(req.user._id, {
            $pull:{
                seachHistory: {id: id}
            }
        })

        res.status(200).json({
            success: true,
            message: 'Removed form search history successfully'
        })
    } catch (error) {
        console.log('Error in deleting search history', error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

module.exports = {searchMovie, searchPerson, searchTv, getSearchHistory, removeFromSearchHistory};