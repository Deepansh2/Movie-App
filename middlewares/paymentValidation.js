const Booking = require("../models/booking.model");
const paymentModel = require("../models/payment.model");
const constants = require("../utils/constants")





const ObjectId = require('mongoose').Types.ObjectId;
function isValidObjectId(id) {

    if (ObjectId.isValid(id)) {
        if ((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}


const verifyReqPaymentBody = async(req,res,next) =>{

    if(!req.body.bookingId){
        return res.status(400).send({
            message : "Failed! booking Id is not provided"
        })
    }
    else{
        if(!isValidObjectId(req.body.bookingId)){
            return res.status(400).send({
                message : "ObjectId in req bookingId is not valid"
            })
        }
    }

    const booking = await Booking.findOne({_id : req.body.bookingId});
    req.bookingObj = booking
    if(!req.body.amount){
        return res.status(400).send({
            message : "Failed! amount is not passed"
        })
    }else if(typeof req.body.amount == "number"){
        if(booking.totalCost !== req.body.amount){
            return res.status(400).send({
                message : "You are Amount is not matching with totalCost"
            })
        }else{
            if(booking.status == constants.bookingStatus.cancelled){
                return res.status(400).send({
                    message : "Booking is already cancelled "
                })
            }
            else if(booking.status == constants.bookingStatus.failed){
                return res.status(400).send({
                    message : "Booking is failed because of transaction time out"
                })
            }else if(booking.status == constants.bookingStatus.completed){
                return res.status(400).send({
                    message : "Booking is already completed"
                })
            }
        }
    }
    next()
}



const verifyPayments = {
    verifyReqPaymentBody : verifyReqPaymentBody,

}
module.exports = verifyPayments