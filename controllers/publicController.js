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
	});
};

exports.getFind = (req, res, next) => {
	res.render('find', {
		docTitle: "Find new movies.",
		path: 'find',
	})
}



