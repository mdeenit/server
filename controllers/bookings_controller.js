const {
	getAllBookings,
	getBookingById,
} = require('../utils/bookings_utilities');

const getBookings = (req, res) => {
	let bookings = getAllBookings(req);
	res.send(bookings);
};

const getBooking = (req, res) => {
	let booking = getBookingById(req);
	if (booking) {
		res.send(booking);
	}
	res.status(404);
	res.send(req.error);
};

const makeBooking = (req, res) => {};

const changeBooking = (req, res) => {};

const removeBooking = (req, res) => {};

// functions to verify that the user is logged in and owns the booking

module.exports = {
	getBookings,
	getBooking,
	makeBooking,
	changeBooking,
	removeBooking,
};
