const Movie = require('../models/movie');
const User = require('../models/user');
const mongoose = require('mongoose');

const getMoviePoster = require('../util/moviePosters');

exports.getIndex = (req, res, next) => {
	res.render('index', {
		docTitle: "Cinebot - Find Something New",
		path: 'index',
	});
};

exports.getRate = (req, res, next) => {
	Movie.aggregate( //this just quickly samples a single random movie
			[{
					$match: {
						$and: [{
								isAdult: 0
							},
							{
								numVotes: {
									$gt: 200
								}
							}
						]
					}
				},
				{
					$sample: {
						size: 1
					}
				}
			])
		.then(movie => {
			var movieData = movie[0]
			getMoviePoster(movieData.tconst)
				.then(posterURL => {
					movieData.poster = posterURL;
				})
				.then(data => {
					req.user.currentMovieId = movieData._id;
					req.user.save();
					res.render('rate', {
						docTitle: "Rate Movies You've Seen.",
						path: 'rate',
						movieTitle: movieData.primaryTitle,
						currentMoviePoster: movieData.poster
					})
				})
		})
}

exports.postRate = (req, res, next) => {
	let buttonPressed = Object.keys(req.body)[0]; //which button was pressed.
	req.user.ratings.push({
		movieId: req.user.currentMovieId,
		rating: buttonPressed
	})
	req.user.save();
	this.getRate(req, res, next);
}