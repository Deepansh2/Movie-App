const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authConfig = require("../configs/auth.config")
const constants = require("../utils/constants")

exports.signup = async (req,res) =>{

    const userObj = {
        name : req.body.name,
        userId : req.body.userId,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,8),
        userType : req.body.userType,
        userStatus : req.body.userStatus
    }

    try{
    const user = await User.create(userObj);

    const response = {
        name : user.name,
        userId : user.userId,
        email : user.email,
        userType : user.userType,
        userStatus : user.userStatus,
        createdAt : user.createdAt,
        updatedAt : user.updatedAt
    }

    console.log("## new user created",`${user.name}`)
    return res.status(201).send(response)
}catch(err){
    console.log("Error while user signup",err);
    return res.status(500).send({
        message : "Internal server error"
    })
}
}


exports.signin = async (req,res) =>{

    try{

    const user = await User.findOne({userId : req.body.userId});
    if(user == null){
        return res.status(400).send({
            message : "Failed ! userId doesn't exist"
        })
    }

    const isValidPassword = bcrypt.compareSync(req.body.password,user.password);
    if(!isValidPassword){
        return res.status(400).send({
            message : "Wrong password"
        })
    }
    
    if(user.userStatus == constants.userStatuses.pending){
        return res.status(400).send({
            message : "Not approved by admin yet"
        })
    }
    const token = jwt.sign({
        id : user.userId
    },authConfig.secret,{
        expiresIn : 60000
    })

    const refToken = jwt.sign({
        id : user.userId
    },authConfig.secret,{
        expiresIn : 120000
    })

    const response = {
        name : user.name,
        userId : user.userId,
        email : user.email,
        myRecords : user.myRecords,
        userType : user.userType,
        userStatus : user.userStatus,
        accessToken : token,
        refreshToken : refToken
    }
    console.log(`## ${user.userType} ## logged in`)
    return res.status(200).send(response)
}catch(err){
    console.log("Error while user signin",err);
    return res.status(500).send({
        message : "Internal server error"
    })
}
}

