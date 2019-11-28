const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    ratings: [{
        movieId: {
            type: Schema.Types.ObjectId,
            ref: 'Movie',
            required: true
        },
        rating: {
            type: String,
            required: true
        }
    }]

});

module.exports = mongoose.model('User', userSchema)