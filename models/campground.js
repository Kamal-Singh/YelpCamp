var mongoose = require('mongoose');
//Create a schema for campground
var schema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    }
});
//create a model of the schema
module.exports = mongoose.model('campground', schema);