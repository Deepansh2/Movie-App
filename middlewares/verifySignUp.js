const constants = require("../utils/constants");
const User = require("../models/user.model")


const verifySignUpReqBody = async (req,res,next) =>{

    if(!req.body.name){
        return res.status(400).send({
            message : "Failed ! name is not provided"
        })
    }

    if(!req.body.userId){
        return res.status(400).send({
            message : "Failed ! userId is not provided"
        })
    }
    const user = await User.findOne({userId : req.body.userId});
    if(user){
        return res.status(400).send({
            message : "Failed ! userId is already present"
        })
    }

    if(!req.body.email){
        return res.status(400).send({
            message : "Failed! email is not provided"
        })
    }

    if(!isValidEmail(req.body.email)){
        return res.status(400).send({
            message : "Failed! email is not valid"
        })
    }

    if(!req.body.password){
        return res.status(400).send({
            message : "Failed! password is not provided"
        })
    }

    if(!isValidPassword(req.body.password)){
        return res.status(400).send({
            message : "Failed! Not a valid password. Password must be 10 to 25 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
        })
    }

    if(!req.body.userType){
        return res.status(400).send({
            message : "Failed! user Type is not provided"
        })
    }
    if(req.body.userType == constants.userTypes.admin){
        return res.status(400).send({
            message : "Failed! admin registration is not allowed"
        })
    }
    const userTypes = [constants.userTypes.customer,constants.userTypes.theatreOwner];
    if(!userTypes.includes(req.body.userType)){
        return res.status(400).send({
            message : "Only theatreOwner and customer registration is allowed"
        })
    }
    next()
}

const isValidEmail = (email) =>{
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}
const isValidPassword = (password) =>{
    return password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{10,25}$/)
}


const verifySignInReqBody = (req,res,next) =>{

    if(!req.body.userId){
        return res.status(400).send({
            message : "Failed! userId is not provided"
        })
    }

    if(!req.body.password){
        return res.status(400).send({
            message : "Failed! user password is not provided"
        })
    }
    next()
}

const validateNewPassword = (req,res,next) =>{
    if(!req.body.password){
        return res.status(400).send({
            message  : "Password is not provided for resetting"
        })
    }
    if(!isValidPassword(req.body.password)){
        return res.status(400).send({
            message : "Failed! Not a valid password. Password must be 10 to 25 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
        })
    }
    next()
}

const verifySignUpBodies = {
    verifySignUpReqBody : verifySignUpReqBody ,
    verifySignInReqBody : verifySignInReqBody,
    validateNewPassword : validateNewPassword
}
module.exports = verifySignUpBodies