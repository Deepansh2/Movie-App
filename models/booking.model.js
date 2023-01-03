const mongoose = require("mongoose");
const constants = require("../utils/constants")

const bookingSchema = new mongoose.Schema({

    totalCost : {
        type : Number,
        required : true
    },
    theatreId : {
        type : mongoose.SchemaTypes.ObjectId,
        required : true
    },
    movieId : {
        type : mongoose.SchemaTypes.ObjectId,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    timing : {
        type : Date,
        required : true
    },
    status : {
        type : String,
        default : constants.bookingStatus.inprogress,
        enum : [constants.bookingStatus.inprogress,constants.bookingStatus.failed,constants.bookingStatus.completed,constants.bookingStatus.cancelled]
    },
    noOfSeats : {
        type : Number,
        required : true
    }
},{timestamps : true,versionKey : false});

module.exports = mongoose.model("booking",bookingSchema)