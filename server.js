const serverConfig = require("./configs/server.config");
const init = require("./init")
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))

const dbConfig = require("./configs/db.config")
const mongoose = require("mongoose");
mongoose.set("strictQuery",true)
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error",()=>{
    console.log("Error while db connecting to mongodb")
});
db.once("open",()=>{
    console.log("Connected to mongodb");
    init()
})


require("./routes/auth.route")(app);
require("./routes/user.route")(app);
require("./routes/movie.route")(app);
require("./routes/theatre.route")(app);
require("./routes/booking.route")(app);
require("./routes/payment.route")(app);



app.listen(serverConfig.PORT,()=>{
    console.log("Started the server at Port Number :",serverConfig.PORT)
})