const paymentController = require("../controllers/payment.controller")
const {verifyPayment,authJwt}  = require("../middlewares")
module.exports = (app) =>{

    app.post("/mba/api/payments",[verifyPayment.verifyReqPaymentBody],paymentController.create);
    app.get("/mba/api/payments",[authJwt.verifyToken],paymentController.findAll);
    app.get("/mba/api/payments/:id",[authJwt.verifyToken,authJwt.isAdminOrBookingIdOwner],paymentController.findById)
}