const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    tconst: {
        type: String,
        required: true
    },
    primaryTitle: String,
    isAdult: Boolean,
    startYear: Number,
    runtimeMins: Number,
    genres: String,
    averageRating: Number,
    numVotes: Number
},
{ collection: 'imdbData'});

module.exports = mongoose.model('Movie', movieSchema);