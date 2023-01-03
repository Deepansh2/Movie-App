const userController = require("../controllers/user.controller");
const {authJwt,verifySignUp} = require("../middlewares")

module.exports = (app) =>{

    app.get("/mba/api/users",[authJwt.verifyToken,authJwt.isAdmin],userController.findAll)
    
    app.get("/mba/api/users/:id",[authJwt.verifyToken,authJwt.isAdminOrOwner],userController.findById);

    app.put("/mba/api/user/:id",[authJwt.verifyToken,authJwt.isAdminOrOwner],userController.update)

    app.post("/mba/api/users/:id",[authJwt.verifyToken,verifySignUp.validateNewPassword,authJwt.isAdminOrOwner],userController.resetPassword)

    app.get("/mba/api/refreshTokens/:refreshToken",[authJwt.refTokenInParam],userController.refreshToken)

}