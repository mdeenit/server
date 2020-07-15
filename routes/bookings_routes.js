const express = require('express');
const router = express.Router();

const {
	getBookings,
	getBooking,
	makeBooking,
	changeBooking,
	removeBooking,
	userAuthenticated,
} = require('../controllers/bookings_controller');

// Authenticate user for all routes

// Read all bookings
router.get('/', getBookings);

// Read booking with :id
router.get('/:id', getBooking);
router.use(userAuthenticated); // THIS SHOULD BE ON LINE 14
// Make a booking
router.post('/', makeBooking);

// Delete booking
router.delete('/:id', removeBooking);

// Delete booking
router.patch('/:id', changeBooking);

module.exports = router;
