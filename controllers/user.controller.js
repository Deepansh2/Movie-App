const User = require("../models/user.model")
const objectConvertor = require("../utils/objectConvertor")
const bcrypt = require("bcryptjs");
const constants = require("../utils/constants");
const jwt = require("jsonwebtoken")
const authConfig = require("../configs/auth.config")

exports.findAll = async (req, res) => {


    try {
        const queryObj = {};
        const userStatusQP = req.query.userStatus;
        const userTypeQP = req.query.userType;
        if (userStatusQP) {
            queryObj.userStatus = userStatusQP
        }
        if (userTypeQP) {
            queryObj.userType = userTypeQP
        }

        const users = await User.find(queryObj)
        return res.status(200).send(objectConvertor.userResponse(users))
    } catch (err) {
        console.log("Error while finding all user", err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}


exports.findById = async (req, res) => {

    try {
        const user = await User.find({ userId: req.params.id });
        return res.status(200).send(objectConvertor.userResponse(user))
    } catch (err) {
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}

exports.update = async (req, res) => {

    try {
        const user = req.user;

        user.name = req.body.name != undefined ? req.body.name : user.name;
        user.userId = req.body.userId != undefined ? req.body.userId : user.userId;
        user.email = req.body.email != undefined ? req.body.email : user.email;

        if (user.userType == constants.userTypes.admin) {
            user.userStatus = req.body.userStatus != undefined ? req.body.userStatus : user.status;
            user.userType = req.body.userType != undefined ? req.body.userType : user.userType
        }
        const updatedUser = await user.save();
        return res.status(200).send({
            name: updatedUser.name,
            userId: updatedUser.userId,
            email: updatedUser.email,
            userType: updatedUser.userType,
            userStatus: updatedUser.userStatus
        })
    } catch (err) {
        console.log("Error while updating user", err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}



exports.resetPassword = async (req, res) => {

    try {
        const user = req.user

        user.password = req.body.password != undefined ? bcrypt.hashSync(req.body.password, 8) : user.password
        await user.save()
        console.log(`${user.name}`, "password rested successfully")
        return res.status(200).send(`successfully reset the password of the user : ${user.name}`)
    } catch (err) {
        console.log("Error while resetting the password", err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }

}


exports.refreshToken = (req, res) => {

    try {
        const user = req.refUserToken;
        const accessToken = jwt.sign({
            id: user.userId
        }, authConfig.secret, {
            expiresIn: 60000
        })

        return res.status(200).send({accessToken:accessToken});

    } catch (err) {
        console.log("Error while generating refreshToken", err);
        return res.status(500).send({
            message: "Internal server error"
        })
    }
}