
const Movie = require("../models/movie.model")


exports.create = async(req,res) =>{

    try{
    const movieObj = {
        name : req.body.name,
        description : req.body.description,
        casts : req.body.casts,
        trailerUrls : req.body.trailerUrls,
        posterUrls : req.body.posterUrls,
        languages : req.body.languages,
        releaseDate : req.body.releaseDate,
        releaseStatus : req.body.releaseStatus,
        imdbRating : req.body.imdbRating,
        genre : req.body.genre
    }

    const movieCreated = await Movie.create(movieObj);

    console.log("## new movie created ##",`${movieCreated.name}`);
    return res.status(201).send(movieCreated)
}catch(err){
    console.log("Error while creating movie",err);
    return res.status(500).send({
        message : "Internal server error"
    })
}
}


exports.findAll = async(req,res) =>{

    try{

    const movies = await Movie.find();
    return res.status(200).send(movies);

    }catch(err){
        console.log("Error while finding all the user",err);
        return res.status(500).send({
            message : "Internal serve error"
        })
    }
}

exports.findById = async(req,res) =>{

    try{

    const movie = await Movie.findOne({_id : req.params.id});
    return res.status(200).send(movie);

    }catch(err){
        console.log("Error while finding a single movie",err);
        return res.status(500).send({
            message : "Internal server error"
        })
    }
}

exports.update = async(req,res) =>{

    try{
    const movie = await Movie.findOne({_id : req.params.id});

    movie.name = req.body.name != undefined ? req.body.name : movie.name;
    movie.description = req.body.description != undefined ? req.body.description : movie.description;
    movie.casts = req.body.casts != undefined ? req.body.casts : movie.casts;
    movie.trailerUrls = req.body.trailerUrls != undefined ? req.body.trailerUrls : movie.trailerUrls;
    movie.posterUrls = req.body.posterUrls != undefined ? req.body.posterUrls : movie.posterUrls;
    movie.languages = req.body.languages != undefined ? req.body.languages : movie.languages;
    movie.releaseDate = req.body.releaseDate != undefined ? req.body.releaseDate : movie.releaseDate;
    movie.releaseStatus = req.body.releaseStatus != undefined ? req.body.releaseStatus : movie.releaseStatus;
    movie.imdbRating = req.body.imdbRating != undefined ? req.body.imdbRating : movie.imdbRating;
    movie.genre = req.body.genre != undefined ? req.body.genre : movie.genre;

    const updatedMovie = await movie.save();

    console.log("## movie updated ##",`${updatedMovie.name}`)
    return res.status(200).send(updatedMovie);

    }catch(err){
        console.log("Error while updating movie",err);
        return res.status(500).send({
            message : "Internal server error"
        })
    }
}


exports.delete = async(req,res) =>{

    try{
    const movie = await Movie.deleteOne({_id : req.params.id});

    console.log("## movie successfully got deleted ##")
    return res.status(200).send(movie)
    }catch(err){
        console.log("Error while deleting the movie",err);
        return res.status(500).send({
            message : "Internal server error"
        })
    }
}