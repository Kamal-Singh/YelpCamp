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
    image: String
});
//create a model of the schema
var campgrounds = mongoose.model('campground', schema);

// campground.create({
//     name: 'River Way Ranch Camp', 
//     image: 'https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jpg'
// }, function(err, campground){
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(campground);
//     }
// });
/*
var campgrounds = [
    { name: 'Tripp Lake Camp', image: 'https://cdn.pixabay.com/photo/2017/10/28/23/18/indians-2898463__340.jpg'},
    { name: 'River Way Ranch Camp', image: 'https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jpg'},
    { name: 'Raquette Lake Camps', image: 'https://cdn.pixabay.com/photo/2017/08/29/04/16/site-2692058__340.jpg'},
    { name: 'Tripp Lake Camp', image: 'https://cdn.pixabay.com/photo/2017/10/28/23/18/indians-2898463__340.jpg'},
    { name: 'River Way Ranch Camp', image: 'https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jpg'},
    { name: 'Raquette Lake Camps', image: 'https://cdn.pixabay.com/photo/2017/08/29/04/16/site-2692058__340.jpg'},
    { name: 'Tripp Lake Camp', image: 'https://cdn.pixabay.com/photo/2017/10/28/23/18/indians-2898463__340.jpg'},
    { name: 'River Way Ranch Camp', image: 'https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jpg'},
    { name: 'Raquette Lake Camps', image: 'https://cdn.pixabay.com/photo/2017/08/29/04/16/site-2692058__340.jpg'}
];*/

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
        image: req.body.image
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

app.listen(3000, function(){
    console.log('The Yelp Camp is running on http://localhost:3000');
});