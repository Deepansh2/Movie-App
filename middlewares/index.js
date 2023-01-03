const authJwt = require("./auth.jwt");
const verifySignUp = require("./verifySignUp");
const verifyParam = require("./paramsValidation");
const movieValidation = require("./verifyMovie");
const verifyTheatre = require("./verifyTheatre");
const verifyBooking = require("./bookingValidation");
const verifyPayment = require("./paymentValidation")

module.exports = {
    authJwt,
    verifySignUp,
    verifyParam,
    movieValidation,
    verifyTheatre,
    verifyBooking,
    verifyPayment
}