var express     = require('express'),
    app         = express(),
    bodyParser  = require('body-parser'),
    mongoose    = require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp', {useMongoClient: true});
mongoose.Promise = global.Promise;
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));

//Create a schema for campground
var schema = mongoose.Schema({
    name: String,
    image: String,
    description: String
});
//create a model of the schema
var campgrounds = mongoose.model('campground', schema);

app.get('/', function(req, res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res){
    campgrounds.find({}, function(err, campgrounds){
        if(err) {
            console.log(err);
        } else {
            res.render('index', {campgrounds: campgrounds});
        }
    });
});

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

app.get('/campgrounds/new', function(req, res){
    res.render('new');
});

app.get('/campgrounds/:id', function(req, res){
    campgrounds.findById(req.params.id, function(err, campgrounds){
        if(err) {
            console.log(err);
        } else {
            res.render('show', {campgrounds: campgrounds});
        }
    })
});

app.listen(3000, function(){
    console.log('The Yelp Camp is running on http://localhost:3000');
});