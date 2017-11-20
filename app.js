var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose');
    campgrounds = require('./models/campground'),
    Comment     = require('./models/comments'),
    seedDB      = require('./seed');

//seed Data
//seedDB();

mongoose.connect('mongodb://localhost/yelp_camp', {useMongoClient: true});
mongoose.Promise = global.Promise;
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));

app.get('/', function(req, res){
    res.render('landing');
});
//INDEX Route
app.get('/campgrounds', function(req, res){
    campgrounds.find({}, function(err, campgrounds){
        if(err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds: campgrounds});
        }
    });
});

//CREATE Route
app.post('/campgrounds', function(req, res){
    var new_camp = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description
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
app.get('/campgrounds/new', function(req, res){
    res.render('campgrounds/new');
});

//SHOW ROUTE
app.get('/campgrounds/:id', function(req, res){
    campgrounds.findById(req.params.id).populate('comments').exec(function(err, campgrounds){
        if(err) {
            console.log(err);
        } else {
            res.render('campgrounds/show', {campgrounds: campgrounds});
        }
    });
});

//===========================
// Comment ROUTES
//===========================


//NEW ROUTE
app.get('/campgrounds/:id/comment/new', function(req ,res){
    campgrounds.findById(req.params.id, function(err ,campground){
       if(err) {
           console.log(err);
       } else {
           res.render('comments/new', {campground: campground});
       }
    });
});

//CREATE ROUTE
app.post('/campgrounds/:id/comment', function(req, res){
    campgrounds.findById(req.params.id, function(err, campground){
        if(err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/'+req.params.id);
                }
            });
        }
    });
});

//==========================
// SERVER LISTENER
//==========================
app.listen(3000, function(){
    console.log('The Yelp Camp is running on http://localhost:3000');
});