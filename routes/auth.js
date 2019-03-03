var authController = require('../controllers/authcontroller.js');

//Passing passport in from server.js as a parameter
module.exports = function(app, passport) {
    
    //Route for sign-up
    app.get('/signup', authController.signup);
    
    //Route for sign-in
    app.get('/signin', authController.signin);

    //Route for posting to signup
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/signup'
    }));

    //Route to Dashboard- isLoggedIn protects the router
    app.get('/dashboard', isLoggedIn, authController.dashboard);

    //Logout route used to protect routes so that if user is not logged in they cannot see it
    app.get('/logout', authController.logout);

    //Route for posting to signin
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin'
    }));

    //Custom middleware to protect dashboard route
    function isLoggedIn(req, res, next) {
        if(req.isAuthenticated())
            return next();
        res.redirect('signin');
    }
}