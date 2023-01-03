const mongoose = require("mongoose");
const constants = require("../utils/constants")

const paymentSchema = new mongoose.Schema({

    bookingId : {
        type : mongoose.SchemaTypes.ObjectId,
    },
    amount : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        default : constants.paymentStatus.failed,
        enum : [constants.paymentStatus.success,constants.paymentStatus.failed]
    }
},{timestamps : true,versionKey : false});

module.exports = mongoose.model("payment",paymentSchema)