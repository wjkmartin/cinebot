exports.getIndex = (req, res, next) => {
	res.render('index', {
		docTitle: "Will Martin's Portfolio and Blog",
		path: 'index',
	});
};