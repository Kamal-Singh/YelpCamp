var express = require('express');
var router = express.Router();
var campgrounds = require('../models/campground');
var middleware = require('../middleware');

//INDEX Route
router.get('/campgrounds', function(req, res){
campgrounds.find({}, function(err, campgrounds){
        if(err) {
            console.log(err);
            req.flash('error', 'Error Occurred');
            res.redirect('/');
        } else {
            res.render('campgrounds/index', {campgrounds: campgrounds});
        }
    });
});

//CREATE Route
router.post('/campgrounds', middleware.isLoggedIn, function(req, res){
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
            req.flash('error', 'Error Occurred');
            console.log(err);
            res.redirect('/campgrounds/new');
        } else {
            req.flash('success', 'Campground '+req.body.name+' Added Successfully');
            res.redirect('/campgrounds');
        }
    })
});

//NEW ROUTE
router.get('/campgrounds/new', middleware.isLoggedIn, function(req, res){
    res.render('campgrounds/new');
});

//SHOW ROUTE
router.get('/campgrounds/:id', function(req, res){
    campgrounds.findById(req.params.id).populate('comments').exec(function(err, campgrounds){
        if(err) {
            req.flash('error', 'Error Occurred');
            console.log(err);
            res.redirect('/campgrounds');
        } else if(!campgrounds) {
            req.flash('error', 'Campground Not Found!!!');
            res.redirect('/campgrounds');
        } else {
            res.render('campgrounds/show', {campgrounds: campgrounds});
        }
    });
});

//EDIT ROUTE
router.get('/campgrounds/:id/edit', middleware.checkCampgroundOwnership, function(req, res){
    campgrounds.findById(req.params.id, function(err, foundCampground){
        if(err) {
            req.flash('error', 'Error Occurred');
            console.log(err);
            res.redirect('/campgrounds/'+req.params.id);
        } else {
            res.render('campgrounds/edit', {campground: foundCampground});
        }
    });
});

//UPDATE ROUTE
router.put('/campgrounds/:id', middleware.checkCampgroundOwnership, function(req, res){
    campgrounds.findByIdAndUpdate(req.params.id, req.body.camp, function(err, updatedCamp){
        if(err) {
            req.flash('error', 'Error Occurred');
            console.log(err)
            res.redirect('/campgrounds/'+req.params.id);
        } else {
            req.flash('success', 'Campground '+updatedCamp.name+' Updated Successfully');
            res.redirect('/campgrounds/'+ req.params.id);
        }
    });
});

//DESTROY ROUTE
router.delete('/campgrounds/:id', middleware.checkCampgroundOwnership, function(req, res){
    campgrounds.findByIdAndRemove(req.params.id, function(err, deletedCamp){
        if(err) {
            req.flash('error', 'Error Occurred');
            console.log(err);
            res.redirect('/campgrounds'+req.params.id);
        } else {
            req.flash('success', 'Campground '+deletedCamp.name+' Removed Successfully');
            res.redirect('/campgrounds');
        }
    });
});

module.exports = router;