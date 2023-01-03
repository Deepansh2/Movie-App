# Movie-App
This project is node.js back-end code for a movie booking application that can create various entities like users, movies, theatres, bookings and payments as well as perform various actions on them.


Features
Account creation

You can create accounts for user as well as theatre owner.
If the user is a customer, the account will autometically be approved on verification.
In case of theatre owner, an admin will have to approve the account.
JSON Web Token used for authentication.
Users can also update some details like name, password and email.
Admin can update additional details like userType and userStatus.
User search is also available for users with proper authorization.
Movie API

An admin can create a new movie, Edit an existing movie and delete an existing movie.
All registered users can get a list of all movies as well as a single movie using movieId.
Theatre API

A theatre owner or an admin can create a new theatre, Edit their existing theatre and delete their existing theatre.
All registered users can get a list of all theatres as well as a single theatre using theatreId.
All registered users can get a list of all the movies released in a single theatre using theatreId.
A theatre owner or an admin can add or remove a new movie in an existing theatre.
Booking API

All registered users can create a new booking and update their existing booking.
All registered users can get a list of all of their bookings as well as a single booking using bookingId.
An admin can get the list of all the bookings.
Payment API

All registered users with a booking can create a payment for their booking.
All registered users can get a list of all of their payments as well as a single payment using paymentId.
An admin can get the list of all the payments.

Dependencies
npm modules
express
mongoose
jsonwebtoken
node-rest-client
dotenv
body-parser
bcryptjs
external applications
notification service application
REST API paths
User creation and operations

Sign-up
POST /mba/api/v1/auth/signup
Register user with name, userId, email, password and user type.


Sign-in
POST /mba/api/v1/auth/signin
User Sign-in using userId and password.


Get all users (Query params userType and userStatus supported)
GET /mba/api/v1/users
An admin can get a list of all users. The list can also be filtered by userType and userStatus.


Get user by userId
GET /mba/api/v1/users/:id
A user or an admin can get the data of the user by userId.


Update user data
PUT /mba/api/v1/users/:id
A user or an admin can update the data of the user by userId.


Movie creation and operations

Create new movie
POST /mba/api/v1/movies
Admin can create a movie.


Update a movie
PUT /mba/api/v1/movies/:id
Admin can update a movie.


Delete a movie
DELETE /mba/api/v1/movies/:id
Admin can delete a movie.


Get all movies
GET /mba/api/v1/movies
Any user can get a list of all movies


Get Single movie
GET /mba/api/v1/movies/:id
Any user can get a single movie by movieId


Theatre creation and operations

Create new theatre
POST /mba/api/v1/theatres
A theatre owner or an admin can create a theatre.


Update a theatre
PUT /mba/api/v1/theatres/:id
A theatre owner or an admin can update their theatre.


Delete a theatre
DELETE /mba/api/v1/theatres/:id
A theatre owner or an admin can delete their theatre.


Get all theatres
GET /mba/api/v1/theatres
Any user can get a list of all theatres


Get Single theatre
GET /mba/api/v1/theatres/:id
Any user can get a single theatre by theatreId


Get movies in a theatre
GET /mba/api/v1/theatres/:id/movies
Any user can get movies inside a theatre by theatreId


Update movies in a theatre
PUT /mba/api/v1/theatres/:id/movies
A theatre owner or an admin can update movies inside their theatre by theatreId.


Booking creation and operations

Create new booking
POST /mba/api/v1/bookings
Any user can create a booking.


Update a booking
PUT /mba/api/v1/bookings/:id
Any user can update their booking.


Get Single booking
GET /mba/api/v1/bookings/:id
Any user can get a single booking by bookingId


Get all bookings
GET /mba/api/v1/bookings
Any user can get a list of all their bookings


Payment creation and operations

Create new payment
POST /mba/api/v1/payments
Any user can create a payment.


Get Single payment
GET /mba/api/v1/payments/:id
Any user can get a single payment by paymentId


Get all payments
GET /mba/api/v1/payments
Any user can get a list of all their payments
