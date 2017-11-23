var express = require('express'),
    router  = express.Router(),
    passport= require('passport'),
    User    = require('../models/user');

router.get('/', function(req, res){
    res.render('landing');
});

//==========================
// Authentication Routes
//==========================

// New User Form
router.get('/register', function(req, res){
    res.render("register");
});

// Create User
router.post('/register', function(req, res){
    User.register(new User({ username: req.body.username }), req.body.password, function(err, user){
        if(err) {
            console.log(err);
            return res.render('/register');
        } 
        res.redirect('/campgrounds');
    })
});

// Login Route
router.get('/login', function(req, res){
    res.render('login');
});

// Authentication 
router.post('/login',  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/campgrounds'
}), function(req, res){
});

//  Logout 
router.get('/logout', function(req,res){
    req.logout();
    res.redirect('/campgrounds');
});

// Middleware for Checking Logging Status
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports = router;