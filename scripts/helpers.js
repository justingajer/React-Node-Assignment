function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        console.log("user is logged in!")
        return next();
    }
    req.flash("info", "Please log in to view that resource...");
    res.render("login", {message: req.flash("info")});
}

function getUserID(req, res, next) {
    console.log("Getting UserID...");
    try {
        req.myUserID = req.user.id;
        return next();
    } catch(err) {
        //do nothing, user is not logged in yet.
        return next();
    }
    
    /*
    if(req.isAuthenticated()) {
        console.log("user is logged in!")
        return next();
    }
    req.flash("info", "Please log in to view that resource...");
    res.render("login", {message: req.flash("info")});
    */
}

module.exports = { ensureAuthenticated, getUserID };