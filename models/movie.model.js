const mongoose = require("mongoose");
const constants = require("../utils/constants")


const movieSchema = new mongoose.Schema({
    
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    casts : {
        type : [String],
        required : true
    },
    trailerUrls : {
        type : [String],
        required : true
    },
    posterUrls : {
        type : [String],
        required : true
    },
    languages : {
        type : [String],
        required : true
    },
    releaseDate : {
        type : Date,
        required : true
    },
    releaseStatus : {
        type : String,
        required : true,
        enum : [constants.movieStatuses.released,constants.movieStatuses.comingSoon,constants.movieStatuses.blocked]
    },
    imdbRating : {
        type : Number
    },
    genre : {
        type : [String],
        required : true,
        enum : [constants.movieGenre.action,constants.movieGenre.adventure,constants.movieGenre.comedy,constants.movieGenre.drama,constants.movieGenre.fantasy,constants.movieGenre.horror,constants.movieGenre.scifi]
    },
    myTheatres : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "theatre"
    }
},{timeStamps : true,versionKey : false})

module.exports = mongoose.model("movie",movieSchema)