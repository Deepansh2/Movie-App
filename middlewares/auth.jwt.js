const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.config")
const User = require("../models/user.model")
const Booking = require("../models/booking.model")
const constants = require("../utils/constants")


const verifyToken = (req,res,next) =>{

    const token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
            message : "Failed ! token is not provided access probated"
        })
    }

    jwt.verify(token,authConfig.secret,async (err,decoded)=>{
        if(err){
            return res.status(403).send({
                message : "Failed ! Token is not valid"
            })
        }
        const user = await User.findOne({userId : decoded.id})
        req.user = user
        next()
    })

}

const refTokenInParam = (req,res,next) =>{
    const refToken = req.params.refreshToken;
    if(!refToken){
        return res.status(400).send({
            message : "Refresh Token is not provided"
        })
    }

    jwt.verify(refToken,authConfig.secret,async(err,decoded) =>{
        if(err){
            console.log(err)
            return res.status(403).send({
                message : "ref token in params is not valid"
            })
        }

       
        const user = await User.findOne({userId:decoded.id})
        if(!user){
            return res.status(400).send({
                message : "user doesn't exist associated with refreshToken"
            })
        }
        req.refUserToken = user
        next()
    })
}

const isAdmin = (req,res,next) =>{

    const user = req.user
    if(user.userType == constants.userTypes.admin){
        next()
    }
    else{
        return res.status(400).send({
            message : "Only admin allow to make this end point"
        })
    }
}

const isAdminOrOwner = (req,res,next) =>{
    
    const user = req.user;
    if(user.userType == constants.userTypes.admin || user._id == req.params.id){
        next()
    }
    else{
        return res.status(403).send({
            message : "Only admin and Owner allow to make this call"
        })
    }

}

const isAdminOrTheatreOwner = (req,res,next) =>{
    
    const user = req.user;
    if((user.userType == constants.userTypes.admin) || (user.userType == constants.userTypes.theatreOwner && user.userStatuses == constants.userStatuses.approved)){
        next()
    }else{
        return res.status(400).send({
            message : "Only admin and owner of theatre allow to make this call"
        })
    }
}

const isAdminOrBookingIdOwner = async(req,res,next) =>{
    const user = req.user;
    const booking = await Booking.findOne({_id : req.params.id})
    if(user.userType == constants.userTypes.admin || user.userId == booking.userId){
        next()
    }
    else{
        return res.status(400).send({
            message : "Only admin or theatre owner or owner of booking id is allow to make this call"
        })
    }
}

const verifyTokenBody = {
    verifyToken : verifyToken,
    isAdmin : isAdmin,
    isAdminOrOwner : isAdminOrOwner,
    isAdminOrTheatreOwner : isAdminOrTheatreOwner,
    isAdminOrBookingIdOwner : isAdminOrBookingIdOwner,
    refTokenInParam : refTokenInParam
}

module.exports = verifyTokenBody