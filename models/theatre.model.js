const mongoose = require("mongoose");
const constants = require("../utils/constants")

const theatreSchema = new mongoose.Schema({

    ownerId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "user"
    },
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    pinCode : {
        type : Number,
        required : true
    },
    showTypes : {
        type : [String],
        required : true,
        enum : [constants.theatreShowTypes.evening,constants.theatreShowTypes.morning,constants.theatreShowTypes.night,constants.theatreShowTypes.noon]
    },
    noOfSeats : {
        type : Number,
        required : true
    },
    myMovies : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "movie"
    }
},{timestamps : true, versionKey : false});

module.exports = mongoose.model("theatre",theatreSchema)