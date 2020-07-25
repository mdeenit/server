const express = require('express');
const router = express.Router();

const {
	getWishes,
	getWish,
	makeWish,
	removeWish,
	userAuthenticated,
} = require('../controllers/_controller');

// Authenticate user for all routes
router.use(userAuthenticated);

// Read all wishes
router.get('/', getWishes);

// Read wish with :id
router.get('/:id', getWish);

// Make a wish
router.post('/', makeWish);

// Delete wish
router.delete('/:id', removeWish);

module.exports = router;