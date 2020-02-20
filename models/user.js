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
        },
        tconst: String,
        releaseYear: String,
        genres: String,
        avgUserRating: Number,
        numUserVotes: Number,
        rating: {
            type: String,
            required: true
        },
    }],
    currentMovieId: Schema.Types.ObjectId,
    currentMovieTConst: String,
    currentMovieReleaseYear: Number,
    currentMovieGenres: String,
    currentMovieRating: Number,
    currentMovieNumVotes: Number,
});

module.exports = mongoose.model('User', userSchema)