const mongoose = require("mongoose");
const constants = require("../utils/constants")
const userSchema = new mongoose.Schema({
    
    name : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        minLength : 10,
        unique : true,
        trim : true
    },
    userType : {
        type : String,
        default : constants.userTypes.customer,
        enum : [constants.userTypes.customer,constants.userTypes.admin,constants.userTypes.theatreOwner]
    },
    userStatus : {
        type : String,
        default : constants.userStatuses.approved,
        enum : [constants.userStatuses.approved,constants.userStatuses.pending,constants.userStatuses.rejected]
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : ()=>{
            return Date.now()
        }
    },

    updatedAt :  {
        type : Date,
        default : ()=>{
            return Date.now()
        }
    },
    theatreOwned : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "theatre"
    },
    myBookings : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "booking"
    }
},{versionKey : false});

module.exports = mongoose.model("user",userSchema)