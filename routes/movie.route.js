const movieController = require("../controllers/movie.controller");
const {authJwt,movieValidation,verifyParam} = require("../middlewares");


module.exports = function(app){

    app.post("/mba/api/movies",[authJwt.verifyToken,authJwt.isAdmin,movieValidation.verifyMovieReqBody],movieController.create);
    app.get("/mba/api/movies",movieController.findAll);
    app.get("/mba/api/movies/:id",[verifyParam.verifyMovieParams],movieController.findById);
    app.put("/mba/api/movies/:id",[authJwt.verifyToken,authJwt.isAdminOrTheatreOwner,verifyParam.verifyMovieParams],movieController.update);
    app.delete("/mba/api/movies/:id",[authJwt.verifyToken,authJwt.isAdmin,verifyParam.verifyMovieParams],movieController.delete)
}