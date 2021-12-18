require('dotenv').config();
console.log(process.env.MONGO_URL);
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const path = require('path');
const passport = require('passport');
const helper = require('./scripts/helpers.js');
require('./scripts/mongoDataConnector.js').connect();

//instantiating models
const User = require('./models/User.js');
//console.log("need this?");
const Play = require('./models/Play.js');
//console.log("or not?");

// create an express app
const app = express();

/* --- middleware section --- */

//express:
app.use(cookieParser("oreos"));
app.use(
    session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true
    })
);

//passport:
app.use(passport.initialize());
app.use(passport.session());

//express flash:
app.use(flash());

//passport authentication:
require("./scripts/auth.js");

// view engine setup
app.set('views', './views');
app.set('view engine', 'ejs');

// serves up static files from the public folder. 


// tell node to use json and HTTP header features
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// controls book data access
//const controller = require('./scripts/playDataController.js');


//tell node to use json and http header features in body-parser
app.use(express.urlencoded({ extended: true }));

app.use(helper.getUserID);

//Controllers
//const playController = require('./scripts/playDataController.js');

//const userController = require('./scripts/userDataController.js');


/* --- handlers section --- */

//image handlers
const userRouter = require('./handlers/user-router.js');
userRouter.handleUserID(app, User);
//play handlers
const playRouter = require('./handlers/play-router.js');
playRouter.handleAllPlays(app, Play);
playRouter.handlePlayID(app, Play);


/* --- login section --- */

/*
app.get("/", helper.ensureAuthenticated, (req, res) => {
    res.render("home.ejs", { user: req.user });
    console.log(req.user.details);
});
*/

app.get("/user", helper.ensureAuthenticated, (req, res) => {
    res.render("home.ejs", { user: req.user });
    console.log(req.user.details);
});

/*
app.get("/site/list", helper.ensureAuthenticated, (req, res) => {
    res.render("list.ejs", { books: controller.getAll() });
});

app.get("/site/book/:isbn", helper.ensureAuthenticated, (req, res) => {
    res.render("book.ejs", { book: controller.findByISBN10(req.params.isbn) });
});
*/

app.get("/login", (req, res) => {
    res.render("login.ejs", { message: req.flash("error") });
});
app.post("/login", async (req, res, next) => {
    passport.authenticate("localLogin", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next);
});
app.get("/logout", (req, res) => {
    req.logout();
    req.flash("info", "You have been logged out!");
    res.render("login", { message: req.flash("info") });
});


app.use('/rescources', express.static(path.join(__dirname, 'resources')));


console.log(__dirname);
app.use(helper.ensureAuthenticated);
app.use('/', express.static(path.join(__dirname, 'build')));

// customize the 404 error with our own middleware function
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
});


// create connection to db
//require('./scripts/mongoDataConnector').connect();

//port info when connected
const port = (process.env.PORT || 3000);
app.listen(port, () => {
    console.log("Server running at port= " + port);
});