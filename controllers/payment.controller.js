const Payment = require("../models/payment.model");
const constants = require("../utils/constants");
const Booking = require("../models/booking.model")


exports.create = async(req,res) =>{

    try{
    const booking = await Booking.findOne({_id : req.body.bookingId})
    const paymentObj = {
        bookingId : req.body.bookingId,
        amount : req.body.amount,
        status : booking.status == constants.bookingStatus.inprogress ? constants.paymentStatus.success : constants.paymentStatus.failed
        
    }
   
    const paymentCreated = await Payment.create(paymentObj);
    if(paymentCreated.status == constants.paymentStatus.success){
        booking.status = constants.bookingStatus.completed
    }
    await booking.save()
    
    console.log("Payment successful")
    return res.status(201).send({
        bookingId : paymentCreated.bookingId,
        amount : paymentCreated.amount,
        status : paymentCreated.status,
        transactionId : paymentCreated._id
    })
}catch(err){
    console.log("Error while doing payment",err);
    return res.status(500).send({
        message : "Internal server error"
    })
}
}


exports.findAll = async(req,res) =>{

    try{
    const queryObj = {};
    const queryStatusQP = req.query.status;
    if(queryStatusQP){
        queryObj.status = queryStatusQP;
    }
    
    if(req.user.userType == constants.userTypes.customer){
        queryObj["_id"] = {$in : req.user.myBookings}
    }

    const payments = await Payment.find(queryObj);
    return res.status(200).send(payments)
    }catch(err){
        console.log("Error while finding all the payments",err);
        return res.status(500).send({
            message : "Internal server error"
        })
    }
}


exports.findById = async (req,res) =>{

    try{

    const payment = await Payment.findOne({_id : req.params.id})
    return res.status(200).send(payment)

    }catch(err){
        console.log("Error while finding payment by id ",err);
        return res.status(500).send({
            message : "Internal server error"
        })
    }
}