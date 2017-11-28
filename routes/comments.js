var express     = require('express'),
    router      = express.Router();
    campgrounds = require('../models/campground'),
    Comment     = require('../models/comments'),
    middleware  = require('../middleware');

    
//===========================
// Comment ROUTES
//===========================

//NEW ROUTE
router.get('/campgrounds/:id/comment/new', middleware.isLoggedIn, function(req ,res){
    campgrounds.findById(req.params.id, function(err ,campground){
       if(err) {
            req.flash('error', 'Error Occurred');
            console.log(err);
            res.redirect('/campgrounds/'+req.params.id);
       } else if(!campground) {
        req.flash('error', 'Campground Not Found!!!');
        res.redirect('/campgrounds');
        } else {
           res.render('comments/new', {campground: campground});
       }
    });
});

//CREATE ROUTE
router.post('/campgrounds/:id/comment', middleware.isLoggedIn, function(req, res){
    campgrounds.findById(req.params.id, function(err, campground){
        if(err) {
            req.flash('error', 'Error Occurred');
            console.log(err);
            res.redirect('/campgrounds/'+req.params.id);
        } else if(!campground) {
            req.flash('error', 'Campground Not Found!!');
            res.redirect('/campgrounds');
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    req.flash('error', 'Error Occurred');
                    console.log(err);
                    res.redirect('/campgrounds/'+req.params.id);
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

// EDIT ROUTE
router.get('/campgrounds/:id/comment/:comment_id/edit', middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err) {
            req.flash('error', 'Error Occurred');
            console.log(err);
            res.redirect('back');
        } else {
            res.render('comments/edit', { comment: foundComment, campground_id: req.params.id});
        }
    });
});

//UPDATE ROUTE
router.put('/campgrounds/:id/comment/:comment_id', middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err) {
            req.flash('error', 'Error Occurred');
            console.log(err);
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/'+req.params.id);
        }
    });
});

//DESTROY ROUTE
router.delete('/campgrounds/:id/comment/:comment_id', middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, deletedComment){
        if(err) {
            req.flash('error', 'Error Occurred');
            console.log(err);
            res.redirect('back');
        } else if(!deletedComment) {
            req.flash('error', 'Comment Not Found!!');
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/'+req.params.id);
        }
    });
});

module.exports = router;