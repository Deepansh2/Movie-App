const Theatre = require("../models/theatre.model")
const Movie = require("../models/movie.model")
const constants = require("../utils/constants")

exports.create = async (req, res) => {

    const theatreObj = {
        ownerId : req.user._id,
        name: req.body.name,
        description: req.body.description,
        city: req.body.city,
        pinCode: req.body.pinCode,
        showTypes: req.body.showTypes,
        noOfSeats: req.body.noOfSeats
    }

    try {
        const theatreCreated = await Theatre.create(theatreObj);
        const user = req.user
        user.theatreOwned.push(theatreCreated._id)
        await user.save()
        console.log("## new Theatre created ##", `## ${theatreCreated.name} ## created by ${req.user.name}## user type ${req.user.userType}`)
        return res.status(201).send(theatreCreated);
    } catch (err) {
        console.log("Error while creating theatre", err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}


exports.update = async (req, res) => {

    try {
        const theatre = await Theatre.findOne({ _id: req.params.id })

        theatre.name = req.body.name != undefined ? req.body.name : theatre.name;
        theatre.description = req.body.description != undefined ? req.body.description : theatre.description;
        theatre.city = req.body.city != undefined ? req.body.city : theatre.city;
        theatre.pinCode = req.body.pinCode != undefined ? req.body.pinCode : theatre.pinCode;
        theatre.showTypes = req.body.showTypes != undefined ? req.body.showTypes : theatre.showTypes;
        theatre.noOfSeats = req.body.noOfSeats != undefined ? req.body.noOfSeats : theatre.noOfSeats;

        const updatedTheatre = await theatre.save();

        return res.status(201).send(updatedTheatre);
    } catch (err) {
        console.log("Error while updating theatre", err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }

}


exports.findById = async (req, res) => {

    try {

        const theatre = await Theatre.findOne({ _id: req.params.id });
        return res.status(200).send(theatre);

    } catch (err) {
        console.log("Error while finding theatre by id", err);
        return res.status(500).send({
            message: "internal server error"
        })
    }
}

exports.findAll = async (req, res) => {

    try {

        const theatres = await Theatre.find();
        return res.status(200).send(theatres);

    } catch (err) {
        console.log("Error while finding all theatre", err);
        return res.status(200).send({
            message: "Internal server error"
        })
    }
}


exports.delete = async (req, res) => {

    try {
        const theatre = await Theatre.deleteOne({ _id: req.params.id });
        return res.status(200).send(theatre);

    } catch (err) {
        console.log("Error while deleting theatre", err);
        return res.status(200).send({
            message: "Internal server error"
        })
    }
}

exports.moviesInTheatre = async (req, res) => {

    try {
        const theatre = await Theatre.findOne({ _id: req.params.id });

        if (theatre.myMovies.length == 0) {
            return res.status(400).send({
                message: "This theatre doesn't have any movies"
            })
        }

        const movieResponse = []
        for (let i = 0; i < theatre.myMovies.length; i++) {
            const movie = await Movie.findOne({ _id: theatre.myMovies[i] });
            movieResponse.push(movie)
        }
        console.log("successfully send the all movies")
        return res.status(200).send(movieResponse);
    } catch (err) {
        console.log("Error while calling movies in theatre", err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}

exports.insertAndRemoveMovieInTheatre = async (req, res) => {

    try {
        const theatre = await Theatre.findOne({ _id: req.params.id });
        const theatreMovie = theatre.myMovies

        if (req.body.movies && req.body.movies.length >= 1) {
            req.body.movies.forEach(async movie => {
                theatreMovie.push(movie)
                const movieObj = await Movie.findOne({ _id: movie })
                movieObj.myTheatres.push(theatre._id)
                console.log("successfully added")
            })
        } else if (req.body.remove && req.body.remove.length >= 1) {
            req.body.remove.forEach(async movie => {
                theatreMovie.remove(movie)
                const movieId = await Movie.findOne({ _id: movie })

                const index = movieId.myTheatres.indexOf(theatre._id);
                movieId.myTheatres.splice(index, 1)
                await movieId.save()
                console.log(`movie removed successfully`)
            })

        }
        await theatre.save();
        return res.status(200).send({
            message: "successful"
        })

    } catch (err) {
        console.log("Error while adding and removing movie in a theatres", err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}
