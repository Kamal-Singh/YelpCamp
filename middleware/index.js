var middlewareObj = {}

//Middleware for checking ownership
middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated())
        {
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err) {
                    req.flash('error', 'Error Occurred');
                    res.redirect('/campgrounds/'+req.params.id);
                } else if(!foundComment) {
                    req.flash('error', 'Comment Not Found!!');
                    res.redirect('/campgrounds');
                }  else if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash('error', 'Permission Denied!!');
                    res.redirect('/campgrounds/'+req.params.id);
                }
            });
        }
    else {
        req.flash('error', 'You Need To Be Logged In!!');
        res.redirect('/campgrounds/'+req.params.id);
    }
}

// Middleware for checking ownership
middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        campgrounds.findById(req.params.id, function(err, foundcamp){
            if(err) {
                console.log(err);
                req.flash('error', 'Error Occurred!!');
                res.redirect('/campgrounds/'+req.params.id);
            } else if(!foundcamp) {
                req.flash('error', 'Campground Not Found!!');
                res.redirect('/campgrounds');
            } else if(foundcamp.author.id.equals(req.user._id)) {
                next();
            } 
            else {
                req.flash('error', 'Permission Denied');
                res.redirect('/campgrounds/'+req.params.id);
            }
        });
    }
    else {
        req.flash('error', 'You Need To Be Logged In!!');
        res.redirect('/campgrounds/'+req.params.id);
    }
}

// Middleware for Checking Logging Status
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        next();
    } else {
        req.flash('error', 'You Need To Be Logged In!!!');
        res.redirect('/login');
    }
};

module.exports = middlewareObj;