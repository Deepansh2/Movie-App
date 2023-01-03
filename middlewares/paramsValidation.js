
const mongoose = require('mongoose');
const Movie = require("../models/movie.model")
const Theatre = require("../models/theatre.model")

const verifyParams = async (req,res,next) =>{

    const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!isValid){
        return res.status(400).send({
            message : "Not a Valid ObjectId in Params"
        })
    }
    next()
}

const verifyMovieParams = async (req,res,next) =>{

    if(!req.params.id){
        return res.status(400).send({
            message : "Movie id is not provided in the param"
        })
    }

    const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!isValid){
        return res.status(400).send({
            message : "Not a Valid ObjectId in Params"
        })
    }
    const movie = await Movie.findOne({_id : req.params.id});
    if(!movie){
        return res.status(400).send({
            message : "Movie in params doesn't exist"
        })
    }
    next()
}

const verifyTheatreParams = async (req,res,next) =>{

    if(!req.params.id){
        return res.status(400).send({
            message : "Theatre id is not provided"
        })
    }
    const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
    if(!isValid){
        return res.status(400).send({
            message : "Not a Valid ObjectId in Params"
        })
    }
    const theatre = await Theatre.findOne({_id : req.params.id});
    if(!theatre){
        return res.status(400).send({
            message : " theatre in params doesn't exist"
        })
    }
    next()
}
const verifyParamIds = {
    verifyParams : verifyParams,
    verifyMovieParams : verifyMovieParams,
    verifyTheatreParams : verifyTheatreParams
}

module.exports = verifyParamIds