/**
 * Seed or dummy data to test the api's 
 */

const User = require("./models/user.model");
const Movie = require("./models/movie.model");
const Theatre = require("./models/theatre.model")
const Booking = require("./models/booking.model");
const Payment = require("./models/payment.model")
const bcrypt = require("bcryptjs");

module.exports = async ()=>{

    await User.collection.drop();
    console.log("##user collections drop##")
    await Movie.collection.drop();
    console.log("##movie collection drop##")
    await Theatre.collection.drop();
    console.log("##theatre collection drop##")
    await Booking.collection.drop();
    console.log("##booking collection drop##")
    await Payment.collection.drop();
    console.log("##payment collection drop##")

    const adminUser = await User.create({
        name : "Deepanshu",
        userId : "admin",
        email : "deepanshusing54@gmail.com",
        password : bcrypt.hashSync("Deepanshu@123",8),
        userType : "ADMIN",
        userStatus : "APPROVED"
    })

    const user1 = await User.create({
        name : "sahul",
        userId : "deep1",
        email : "deepanshus1@gmail.com",
        password : bcrypt.hashSync("Deepanshu@123",8),
        userType : "CUSTOMER",
        userStatus : "APPROVED"
    })

    const movie1 = await Movie.create({
        name : "Avatar the way of water",
        description : "this movie is about different species that lives on another plant far away from earth",
        casts : ["jack","tabo","kat"],
        trailerUrls : ["https://youtu.be/o5F8MOz_IDw","https://youtu.be/d9MyW72ELq0"],
        posterUrls : ["https://youtu.be/d9MyW72ELq0","https://images.app.goo.gl/YUoHWDCPj9tGKHge9"],
        languages : ["Hindi","English"],
        releaseDate : "2022-12-16",
        releaseStatus : "RELEASED",
        imdbRating : 9,
        genre : ["ADVENTURE","ACTION","FANTASY","SCI-FI"]
    })
    
    const theatre1 = await Theatre.create({
        name : "PVR",
        description : "it is an bit expensive and awesome theatre",
        city : "new delhi",
        pinCode : 110094,
        showTypes : ["NIGHT","MORNING","NOON","EVENING"],
        noOfSeats : 4,
        myMovies : [movie1._id]
    })
    const theatre2 = await Theatre.create({
        name : "4D theatre2",
        description : "it is an bit expensive and awesome theatre with play zone",
        city : "new delhi",
        pinCode : 110094,
        showTypes : ["NIGHT","MORNING","NOON","EVENING"],
        noOfSeats : 7,
        myMovies : []
    })

    movie1.myTheatres.push(theatre1._id);
    await movie1.save()

    console.log(adminUser);
    console.log(user1);
    console.log(movie1);
    console.log(theatre2)
    console.log(theatre1);
}