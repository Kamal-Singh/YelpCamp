var express = require('express');
var router = express.Router();
var campgrounds = require('../models/campground');

//INDEX Route
router.get('/campgrounds', function(req, res){
campgrounds.find({}, function(err, campgrounds){
        if(err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: campgrounds});
        }
    });
});

//CREATE Route
router.post('/campgrounds', isLoggedIn, function(req, res){
    var new_camp = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    };
    campgrounds.create(new_camp, function(err, campground){
        if(err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    })
});

//NEW ROUTE
router.get('/campgrounds/new', isLoggedIn, function(req, res){
    res.render('campgrounds/new');
});

//SHOW ROUTE
router.get('/campgrounds/:id', function(req, res){
    campgrounds.findById(req.params.id).populate('comments').exec(function(err, campgrounds){
        if(err) {
            console.log(err);
        } else {
            res.render('campgrounds/show', {campgrounds: campgrounds});
        }
    });
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