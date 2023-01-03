const Booking = require("../models/booking.model")
const constants = require("../utils/constants")
const notificationReqSend = require("../utils/notificationReqSender")
const User = require("../models/user.model")
// function bookingSeats(noOfSeats){
//     let totalCost = 100*noOfSeats;
//     return totalCost;
// }
exports.create = async (req, res) => {

    try {
        const bookingObj = {
            totalCost: req.body.noOfSeats * 100,
            theatreId: req.body.theatreId,
            movieId: req.body.movieId,
            userId: req.body.userId ? req.body.userId : req.user.userId,
            timing: req.body.timing,
            status: req.body.status,
            noOfSeats: req.body.noOfSeats
        }

        const booking = await Booking.create(bookingObj)
        const user = req.user;
        user.myBookings.push(booking._id);
        await user.save()

        setTimeout(async () => {
            const bookingId = await Booking.findOne({ _id: booking._id })
            if (bookingId.status != constants.bookingStatus.completed) {
                bookingId.status = bookingId.status == constants.bookingStatus.cancelled ? constants.bookingStatus.cancelled : constants.bookingStatus.failed
    
            }
            const user = await User.findOne({userId : bookingId.userId})
            notificationReqSend(`booking id ${bookingId._id}`,"your booking process",`${user.email}`,"MOVIE APP")
            console.log("booking", `${bookingId.status}`)
            await bookingId.save()
        }, 30000);

        console.log("## Movie ticket booked ##")
        return res.status(201).send({
            trackingId: booking._id,
            bookingStatus: booking.status,
            totalCost: booking.totalCost
        })
    } catch (err) {
        console.log("Error while creating booking", err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }

}


exports.findAll = async (req, res) => {

    try {
        const queryObj = {};
        const bookingStatusQP = req.query.status;
        if (bookingStatusQP) {
            queryObj.status = bookingStatusQP
        }
        const bookings = await Booking.find(queryObj)
        return res.status(200).send(bookings);

    } catch (err) {
        console.log("Error while finding all the bookings", err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}

exports.findById = async (req, res) => {

    try {

        const booking = await Booking.findOne({ _id: req.params.id });
        return res.status(200).send(booking)

    } catch (err) {
        console.log("Error while finding booking by id ", err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}

exports.update = async (req, res) => {

    try {

        const booking = await Booking.findOne({ _id: req.params.id });
        const user = req.user
        if (booking.status == constants.bookingStatus.inprogress) {
            booking.theatreId = req.body.theatreId != undefined ? req.body.theatreId : booking.theatreId;
            booking.movieId = req.body.movieId != undefined ? req.body.movieId : booking.movieId;
            booking.timing = req.body.timing != undefined ? req.body.timing : booking.timing;
            booking.noOfSeats = req.body.noOfSeats != undefined ? req.body.noOfSeats : booking.noOfSeats;
        }
        if (user.userType == constants.userTypes.admin) {
            booking.status = req.body.status != undefined ? req.body.status : booking.status;
            booking.totalCost = req.body.totalCost != undefined ? req.body.totalCost : booking.totalCost;
        }
        const updatedBooking = await booking.save()
        return res.status(200).send(updatedBooking)

    } catch (err) {
        console.log("Error while updating booking", err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}


