var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
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
];

app.get('/', function(req, res){
    res.render('landing');
});

app.get('/campgrounds', function(req, res){
     res.render('camps', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res){
    var new_camp = {
        name: req.body.name,
        image: req.body.image
    };
    campgrounds.push(new_camp);
    res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res){
    res.render('new_campground');
});
app.listen(3000, function(){
    console.log('The Yelp Camp is running on http://localhost:3000');
});