const constants = require("../utils/constants")
const Theatre = require("../models/theatre.model")
const Movie = require("../models/movie.model")
const allowedShowTypes = [constants.theatreShowTypes.evening, constants.theatreShowTypes.morning, constants.theatreShowTypes.noon, constants.theatreShowTypes.night]

const ObjectId = require('mongoose').Types.ObjectId;
function isValidObjectId(id) {

    if (ObjectId.isValid(id)) {
        if ((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

async function checkValidObjId(array) {
    let temp = { validIds: true, movieExist: true }
    for (let e of array) {
        if (!isValidObjectId(e)) {
            temp.validIds = false;
        }
        else {
            const movie = await Movie.findOne({ _id: e })
            if (!movie) {
                temp.movieExist = false;
            }
        }
    }
    return temp
}

function showTypeChecker(given) {
    let temp = true;
    given.forEach(e => {
        if (!allowedShowTypes.includes(e)) {
            temp = false;
        }
    })
    return temp
}
const verifyTheatreReqBody = (req, res, next) => {

    if (!req.body.name) {
        return res.status(400).send({
            message: "Failed! theatre name is not provided"
        })
    }

    if (!req.body.description) {
        return res.status(400).send({
            message: "Failed! theatre description is not provided"
        })
    }

    if (!req.body.city) {
        return res.status(200).send({
            message: "Failed! theater city is not provided"
        })
    }

    if (!req.body.pinCode) {
        return res.status(400).send({
            message: "Failed! theatre city-pinCode is not provided"
        })
    }
    else {
        if (typeof req.body.pinCode !== "number") {
            return res.status(400).send({
                message: "pinCode data should be in formate(number)"
            })
        }
    }


    if (!req.body.showTypes) {
        return res.status(400).send({
            message: "Failed! theatre show type is not provided"
        })
    }
    else {
        if (!showTypeChecker(req.body.showTypes)) {
            return res.status(400).send({
                message: "Failed ! not a valid show type possible showTypes are NOON | NIGHT | MORNING | EVENING"
            })
        }
    }


    next()
}



const verifyMovieAddingInTheatre = async (req, res, next) => {

    try {

        const theatre = await Theatre.findOne({ _id: req.params.id });
        const theatreMovies = theatre.myMovies
        if (req.body.movies && req.body.movies.length > 0) {

            const movie = req.body.movies.filter(movieId => !theatreMovies.includes(movieId))
            const checker = await checkValidObjId(movie)
            if (!checker.validIds) {
                return res.status(400).send({
                    message: "movie id in request body is invalid"
                })
            }

            else if (!checker.movieExist) {
                return res.status(400).send({
                    message: "movie id adding in theatre doesn't exist"
                })
            }

            // else if (theatreMovies.includes(movie)) {
            //     console.log("movie is already exist in theatre")
            //     return res.status(400).send({
            //         message: "Movie is already in theatre"
            //     })
            // }


        }

        if (req.body.remove && req.body.remove.length > 0) {
                // const movieObj = await Movie.findOne({ _id: movie });
                const movie = req.body.remove.filter(movieId => theatreMovies.includes(movieId))
                const checker = await checkValidObjId(movie)
                if (!checker.validIds) {
                    return res.status(400).send({
                        message: "movie id in request body is Invalid"
                    })
                }

                else if (!checker.movieExist) {
                    console.log("movie id in req.body doesn't exist")
                    return res.status(400).send({
                        message: "movie id want to remove in theatre doesn't exist"
                    })
                }
    
        
        }
        next()
    } catch (err) {
        console.log("Error while validating movies in req body", err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}

const theatreVerification = {
    verifyTheatreReqBody: verifyTheatreReqBody,
    verifyMovieAddingInTheatre: verifyMovieAddingInTheatre
}
module.exports = theatreVerification;