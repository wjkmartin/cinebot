const movieFetcher = require('../models/movieFetching');
const movieRater = require('../models/movieRating')

const mongo = require('mongodb').ObjectID

const userID = mongo.ObjectID('5dacf59e1c9d44000011c01a');
let currentMovieID = 'tt123456'

exports.getIndex = (req, res, next) => {
	res.render('index', {
		docTitle: "Cinebot - Find Something New",
		path: 'index',
	});
};

exports.getRate = (req, res, next) => {
	movieFetcher.getRandomMovie()
		.then(movieData => {
			currentMovieID = movieData.MovieID
			res.render('rate', {
				docTitle: "Rate Movies You've Seen.",
				path: 'rate',
				movieTitle: movieData.Title,
				currentMoviePoster: movieData.Poster,
			})
		});
};

exports.postRate = (req, res, next) => {
	let buttonPressed = Object.keys(req.body)[0]; //which button was pressed.

	movieRater.recordRate(currentMovieID, buttonPressed, userID)
	
	this.getRate(req, res, next);
}

exports.getFind = (req, res, next) => {
	res.render('find', {
		docTitle: "Find new movies.",
		path: 'find',
	})
}