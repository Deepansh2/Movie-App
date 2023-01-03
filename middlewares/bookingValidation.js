const isDate = (date) =>{
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}


const ObjectId = require('mongoose').Types.ObjectId;
function isValidObjectId(id) {

    if (ObjectId.isValid(id)) {
        if ((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}


const verifyBookingReqBody = (req,res,next) =>{

    if(!req.body.theatreId){
        return res.status(400).send({
            message : "Theatre id is not provided"
        })
    }else{
        if(!isValidObjectId(req.body.theatreId)){
            return res.status(400).send({
                message : "Failed theatreId in request body is not valid id"
            })
        }
    }

    if(!req.body.movieId){
        return res.status(400).send({
            message : "Failed! movie id is not provided"
        })
    }else{
        if(!isValidObjectId(req.body.movieId)){
            return res.status(400).send({
                message : "Failed! movie id is not a valid id"
            })
        }
    }

    if(!req.body.timing){
        return res.status(400).send({
            message : "Failed! movie timing is not provided"
        })
    }else{
        if(!isDate(req.body.timing)){
            return res.status(400).send({
                message : "Failed! timing data formate(Date)"
            })
        }
    }

    if(!req.body.noOfSeats){
        return res.status(400).send({
            message : "Failed! noOfSeats are not provided"
        })
    }else{
        if(typeof req.body.noOfSeats !== "number"){
            return res.status(400).send({
                message : "Failed! noOfSeats should be in formate(Number)"
            })
        }
    }
    next()
}

const bookingValidations = {
    verifyBookingReqBody : verifyBookingReqBody
}
module.exports = bookingValidations