var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose');
    campgrounds     = require('./models/campground'),
    Comment         = require('./models/comments'),
    User            = require('./models/user'),
    passport        = require('passport'),
    localStrategy   = require('passport-local'),
    seedDB          = require('./seed');

// Routes Variable    
var campgroundRoutes = require('./routes/campground'),
commentRoutes    = require('./routes/comments'),
indexRoutes      = require('./routes/index');

//seed Data
//seedDB();

mongoose.connect('mongodb://localhost/yelp_camp', {useMongoClient: true});
mongoose.Promise = global.Promise;
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));

//Configuring Session
app.use(require('express-session')({
    secret: 'I don\'t know what to keep as my secret for a cookie',
    saveUninitialized: false,
    resave: false
}));

//Initializing Middleware Passport
app.use(passport.initialize());
app.use(passport.session());

//Configure Passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//  My own middleware
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//===============================
// Routes
//===============================
app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(indexRoutes);
//==========================
// SERVER LISTENER
//==========================
app.listen(3000, function(){
    console.log('The Yelp Camp is running on http://localhost:3000');
});