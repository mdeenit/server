const {
	getAllBookings,
	getBookingById,
	addBooking,
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

const makeBooking = (req, res) => {
	const newBooking = addBooking(req);
	if (newBooking) {
		res.status(201);
		res.send(newBooking);
	} else {
		res.status(500);
		res.send(req.error);
	}
};

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
