var mongoose = require('mongoose'),
    campgrounds = require('./models/campground'),
    Comment = require('./models/comments');

var data = [
    {
        name: 'Hela Leuia',
        image: 'https://farm6.staticflickr.com/5059/5518252117_d232831997.jpg',
        description: 'blah blah blah blah blah'
    },
    {
        name: 'Toofani Jagah',
        image: 'https://farm9.staticflickr.com/8471/8137270056_21d5be6f52.jpg',
        description: 'blah blah blah blah blah'
    },
    {
        name: 'Yellow Stone',
        image: 'https://farm6.staticflickr.com/5334/9925256586_c06d949b3e.jpg',
        description: 'blah blah blah blah blah'
    }
];

var comment = {
        author: 'Kamal Singh',
        text: 'This is place is awesome but doesn\'t have wifi'
    };



function seedDB()
{
    campgrounds.remove({}, function(err){
        if(err) {
            console.log(err);
        } else {
            console.log('Removing Campgrounds.....');
            Comment.remove({}, function(err){
                if(err) {
                    console.log(err);
                } else {
                    console.log("Removing Comments......");
                }
            });
            data.forEach(function(campground){
                campgrounds.create(campground, function(err, addedCampground){
                    if(err) {
                        console.log(err);
                    } 
                    console.log("Adding Campground...");
                    Comment.create(comment, function(err, addedComment){
                        if(err) {
                            console.log(err);
                        } else {
                            addedCampground.comments.push(addedComment);
                            addedCampground.save();
                            console.log("Adding Comments....");
                        }
                    });
                });
            });
        }
    });
}
module.exports = seedDB;