const express = require('express');
const router = express.Router();

const {
	getWishes,
	getWish,
	makeWish,
	removeWish,
	changeWish,
} = require('../controllers/wish_controller');
const { userAuthenticated } = require('../utils/auth_utilities');

// Authenticate user for all routes
router.use(userAuthenticated);

// Read all wishes
router.get('/', getWishes);

// Read wish with :id
router.get('/:id', getWish);

// Make a wish
router.post('/', makeWish);

// Update status of a wish
router.patch('/:id', changeWish);

// Delete wish
router.delete('/:id', removeWish);

module.exports = router;
