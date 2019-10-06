const movieFetcher = require('../models/movieFetching');

let currentTitle = 'default';
let currentMoviePosterSrc = 'https://via.placeholder.com/400x650';

exports.getIndex = (req, res, next) => {
	res.render('index', {
		docTitle: "Cinebot - Find Something New",
		path: 'index',
	});
};

exports.getRate = (req, res, next) => {
	res.render('rate', {
		docTitle: "Rate Movies You've Seen.",
		path: 'rate',
		movieTitle: currentTitle,
		currentMoviePosterSrc: currentMoviePosterSrc,
	});
};

exports.postRate = (req, res, next) => {
	let buttonPressed = Object.keys(req.body)[0];

	const randomMovie = movieFetcher.getRandomMovie();
	
	currentTitle = randomMovie.Title;
	currentMoviePosterSrc = randomMovie.Poster;
	this.getRate(req, res, next);
}

exports.getFind = (req, res, next) => {
	res.render('find', {
		docTitle: "Find new movies.",
		path: 'find',
	})
}