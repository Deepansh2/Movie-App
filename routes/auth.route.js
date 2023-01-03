const authController = require("../controllers/auth.controller")
const {verifySignUp} = require("../middlewares")
module.exports = (app) =>{

    app.post("/mba/api/signup",[verifySignUp.verifySignUpReqBody],authController.signup);

    app.post("/mba/api/signin",[verifySignUp.verifySignInReqBody],authController.signin);
}