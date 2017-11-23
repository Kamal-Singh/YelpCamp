var express     = require('express'),
    router      = express.Router();
    campgrounds = require('../models/campground'),
    Comment     = require('../models/comments');

    
//===========================
// Comment ROUTES
//===========================

//NEW ROUTE
router.get('/campgrounds/:id/comment/new', isLoggedIn, function(req ,res){
    campgrounds.findById(req.params.id, function(err ,campground){
       if(err) {
           console.log(err);
       } else {
           res.render('comments/new', {campground: campground});
       }
    });
});

//CREATE ROUTE
router.post('/campgrounds/:id/comment', isLoggedIn, function(req, res){
    campgrounds.findById(req.params.id, function(err, campground){
        if(err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/'+req.params.id);
                }
            });
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