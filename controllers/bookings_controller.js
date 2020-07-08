const {
	getAllBookings,
	getBookingById,
	addBooking,
	deleteBooking,
	updateBooking,
} = require('../utils/bookings_utilities');

const getBookings = (req, res) => {
	getAllBookings(req)
		.sort({
			modified_date: -1,
		})
		.exec((error, bookings) => {
			if (error) {
				res.status(500);
				return res.json({
					error: error.message,
				});
			}
			res.send(bookings);
		});
};

const getBooking = (req, res) => {
	getBookingById(req).exec((error, booking) => {
		if (error) {
			res.status(404);
			return res.send('Booking not found');
		}
		res.send(booking);
	});
};

const makeBooking = (req, res) => {
	addBooking(req).save((error, booking) => {
		if (error) {
			res.status;
			res.json({
				error: error.message,
			});
		}
		res.status(201);
		res.send(booking);
	});
};

const changeBooking = (req, res) => {
	let updatedBooking = updateBooking(req);
	if (req.error) {
		res.status(req.status);
		res.send(req.error);
	} else {
		res.send(updatedBooking);
	}
};

const removeBooking = (req, res) => {
	let bookings = deleteBooking(req);
	if (req.error) {
		res.status(req.status);
		res.send(req.error);
	} else {
		res.send(bookings);
	}
};

// functions to verify that the user is logged in and owns the booking

module.exports = {
	getBookings,
	getBooking,
	makeBooking,
	changeBooking,
	removeBooking,
};
