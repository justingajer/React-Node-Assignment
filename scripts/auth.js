const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../models/User.js");

const localOpt = {
    usernameField: "email",
    passwordField: "password"
}

const strategy = new LocalStrategy(localOpt, async (email, password, done) => {
    try {
        console.log("user logging in...");
        const userChosen = await UserModel.findOne({email: email});
        console.log("user logging in...");
        if(!userChosen) {
            return done(null, false, {message: "Email Not Found"});
        }

        console.log("user logging in...");
        const validate = await userChosen.isValidPassword(password);
        if(!validate) {
            return done(null, false, {message: "Wrong Password"});
        } else {
            console.log("~The User~");
            console.log(userChosen);
            console.log("~End User~");
            console.log(userChosen.getUserID());
            return done(null, userChosen, {message: "Logged In Successfully"});
        }

    } catch (error) {
        return done(error);
    }
});

passport.use("localLogin", strategy);

passport.serializeUser((user, done) => done(null, user.email));

passport.deserializeUser((email, done) => {
    UserModel.findOne({email: email}, (err, user) => done(err, user));
});