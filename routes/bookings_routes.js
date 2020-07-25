const express = require('express');
const router = express.Router();

const {
	getBookings,
	getBooking,
	makeBooking,
	changeBooking,
	removeBooking,
	userAuthenticated,
	getBookingsByContinent
} = require('../controllers/bookings_controller');

// Authenticate user for all routes
router.use(userAuthenticated);
// Read all bookings
router.get('/', getBookings);

//get Bookings by continent
router.get('/continent', getBookingsByContinent);

// Read booking with :id
router.get('/:id', getBooking);

// Make a booking
router.post('/', makeBooking);

// Delete booking
router.delete('/:id', removeBooking);

// Update booking
router.patch('/:id', changeBooking);

module.exports = router;
