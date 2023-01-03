const constants = require("../utils/constants")
const isDate = (date) =>{
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

const allowedGenreTypes = [constants.movieGenre.action,constants.movieGenre.adventure,constants.movieGenre.comedy,constants.movieGenre.drama,constants.movieGenre.fantasy,
constants.movieGenre.horror,constants.movieGenre.scifi]

function genreChecker(given){
    let temp = true;
    given.forEach(e=>{
        if(!allowedGenreTypes.includes(e)){
            temp = false;
        }
    })
    return temp
}



const verifyMovieReqBody = (req,res,next) =>{


    if(!req.body.name){
        return res.status(400).send({
            message : "Failed! movie name is not provided"
        })
    }
    else if(req.body.name){
        if(typeof req.body.name !== "string"){
            return res.status(400).send({
                message : "Failed! name field should be string in data type"
            })
        }
    }

    if(!req.body.description){
        return res.status(400).send({
            message : "Failed! movie description is not provided"
        })
    }

    if(!req.body.casts){
        return res.status(400).send({
            message : "Failed! movie casts is not provided"
        })
    }
    else {
        if(!Array.isArray(req.body.casts)){
            return res.status(400).send({
                message : "Casts Data should be in formate(array)"
            })
        }
    }

    if(!req.body.trailerUrls){
        return res.status(400).send({
            message : "Failed! movie trailerUrls are not provided"
        })
    }

    if(!req.body.posterUrls){
        return res.status(400).send({
            message : "Failed! movie posterUrls are not provided"
        })
    }

    if(!req.body.languages){
        return res.status(400).send({
            message : "Failed! movie languages are not provided"
        })
    }

    if(!req.body.releaseDate){
        return res.status(400).send({
            message : "Failed! movie release date is not provided"
        })
    }
    else{
        if(!isDate(req.body.releaseDate)){
            return res.status(400).send({
                message : "releaseDate data should be in formate(date)"
            })
        }
    }

    if(!req.body.releaseStatus){
        return res.status(400).send({
            message : "Failed! release Status is not provided"
        })
    }

    if(!req.body.genre){
        return res.status(400).send({
            message : "Failed ! movie genre is not provided"
        })
    }
    else{
        if(!genreChecker(req.body.genre)){
            return res.status(400).send({
                message : "Not a valid type of genre Possible types are ACTION | HORROR | ADVENTURE | SCI-FI | COMEDY | DRAMA | FANTASY"
            })
        }
    }
    if(!req.body.imdbRating){
        return res.status(400).send({
            message : "Failed ! imdbRating is not provided"
        })
    }else{
        if(typeof req.body.imdbRating !== "number"){
            return res.status(400).send({
                message : "imdbRating Data should be in formate(number)"
            })
        }
    }

    next()
}





const verifyMovie = {
    verifyMovieReqBody : verifyMovieReqBody 
}

module.exports = verifyMovie