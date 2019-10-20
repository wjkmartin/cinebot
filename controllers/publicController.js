const movieFetcher = require('../models/movieFetching');

exports.getIndex = (req, res, next) => {
	res.render('index', {
		docTitle: "Cinebot - Find Something New",
		path: 'index',
	});
};

exports.getRate = (req, res, next) => {
	movieFetcher.getRandomMovie()
		.then(movieData => {
			console.log(movieData)
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

	const randomMovie = movieFetcher.getRandomMovie();

	currentTitle = randomMovie.Title;
	currentMoviePoster = randomMovie.Poster;
	this.getRate(req, res, next);
}

exports.getFind = (req, res, next) => {
	res.render('find', {
		docTitle: "Find new movies.",
		path: 'find',
	})
}