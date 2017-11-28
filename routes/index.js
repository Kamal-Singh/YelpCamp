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
            req.flash('error', err.message);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, function(){
            req.flash('success', 'Hi '+req.user.username+' ,You Have Been Successfully Registered'); 
            res.redirect('/campgrounds');
        });
    });
});

// Login Route
router.get('/login', function(req, res){
    res.render('login');
});

// Authentication 
router.post('/login',  passport.authenticate('local', {
    successReturnToOrRedirect: '/campgrounds',
    failureRedirect: '/login',
    failureFlash: true
}));

//  Logout 
router.get('/logout', function(req,res){
    req.logout();
    req.flash('success', 'You Have Been Successfully Logout!!');
    if(req.session.returnTo)
        {
            res.redirect(req.session.returnTo);
        } else {
            res.redirect('/campgrounds');
        }
});

module.exports = router;