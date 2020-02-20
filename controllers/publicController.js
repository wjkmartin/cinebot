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
					req.activeUser.currentMovieId = movieData._id;
					req.activeUser.currentMovieTConst = movieData.tconst;
					req.activeUser.currentMovieReleaseYear = movieData.startYear;
					req.activeUser.currentMovieGenres = movieData.genres;
					req.activeUser.currentMovieRating = movieData.averageRating;
					req.activeUser.currentMovieNumVotes = movieData.numVotes;
					req.activeUser.save();
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
	req.activeUser.ratings.push({
		movieId: req.activeUser.currentMovieId,
		tconst: req.activeUser.currentMovieTConst,
		releaseYear: req.activeUser.currentMovieStartYear,
		genres: req.activeUser.currentMovieGenres,
		avgUserRating: req.activeUser.currentMovieRating,
		numUserVotes: req.activeUser.currentMovieNumVotes,
		rating: buttonPressed
	})
	req.activeUser.save();
	this.getRate(req, res, next);
}