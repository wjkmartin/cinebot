const express = require('express');
const router = express.Router();

const publicController = require('../controllers/publicController');

router.get('/', publicController.getIndex);

router.get('/index', (req, res, next) => {
	res.redirect('/');
});

module.exports = router;
