var middlewareObj = {}

//Middleware for checking ownership
middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated())
        {
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err) {
                    res.redirect('back');
                }  else if(foundComment.author.id.equals(req.user._id))
                {
                    next();
                } else {
                    res.redirect('back');
                }
            });
        }
    else {
        res.redirect('back');
    }
}

// Middleware for checking ownership
middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        campgrounds.findById(req.params.id, function(err, foundcamp){
            if(err) {
                console.log(err);
                res.redirect('back');
            } 
            else if(foundcamp.author.id.equals(req.user._id)) {
                next();
            } 
            else {
                res.redirect('back');
            }
        });
    }
    else {
        res.redirect('back');
    }
}

// Middleware for Checking Logging Status
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports = middlewareObj;