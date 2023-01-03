const theatreController = require("../controllers/theatre.controller")
const {authJwt,verifyTheatre,verifyParam} = require("../middlewares")


module.exports = (app) =>{

    app.post("/mba/api/theatres",[authJwt.verifyToken,authJwt.isAdminOrTheatreOwner,verifyTheatre.verifyTheatreReqBody],theatreController.create);
    app.put("/mba/api/theatres/:id",[authJwt.verifyToken,authJwt.isAdminOrTheatreOwner,verifyParam.verifyTheatreParams],theatreController.update);
    app.get("/mba/api/theatres/:id",[verifyParam.verifyTheatreParams],theatreController.findById);
    app.get("/mba/api/theatres",theatreController.findAll);
    app.delete("/mba/api/theatres/:id",[authJwt.verifyToken,authJwt.isAdminOrTheatreOwner,verifyParam.verifyTheatreParams],theatreController.delete);
    app.get("/mba/api/theatres/:id/movies",[verifyParam.verifyTheatreParams],theatreController.moviesInTheatre);
    app.put("/mba/api/theatres/:id/movies",[authJwt.verifyToken,authJwt.isAdminOrTheatreOwner,verifyParam.verifyTheatreParams,verifyTheatre.verifyMovieAddingInTheatre],theatreController.insertAndRemoveMovieInTheatre)

}