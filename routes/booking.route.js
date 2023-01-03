const bookingController = require("../controllers/booking.controller")
const {authJwt,verifyBooking,verifyParam} = require("../middlewares")
module.exports = (app) =>{

    app.post("/mba/api/bookings",[authJwt.verifyToken,verifyBooking.verifyBookingReqBody],bookingController.create);
    app.get("/mba/api/bookings",[authJwt.verifyToken,authJwt.isAdminOrTheatreOwner],bookingController.findAll);
    app.get("/mba/api/bookings/:id",[verifyParam.verifyParams,authJwt.verifyToken,authJwt.isAdminOrBookingIdOwner],bookingController.findById);
    app.put("/mba/api/bookings/:id",[verifyParam.verifyParams,authJwt.verifyToken],bookingController.update);
}