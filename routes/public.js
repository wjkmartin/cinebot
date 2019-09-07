const express = require('express');
const router = express.Router();

const publicController = require('../controllers/publicController');

router.get('/', publicController.getIndex);

router.get('/index', (req, res, next) => {
	res.redirect('/');
});

router.get('/rate', publicController.getRate);
router.get('/find', publicController.getFind);


module.exports = router;