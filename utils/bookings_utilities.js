const Booking = require('../models/booking');

const getAllBookings = (req) => {
	return Booking.find();
};

const getBookingById = (req) => {
	return Booking.findById(req.params.id);
};

const addBooking = (req) => {
	let date = Date.now();
	req.body.create_date = date;
	req.body.modified_date = date;
	return new Booking(req.body);
};

function deleteBooking(req) {
	return Booking.findByIdAndRemove(req.params.id);
}

function updateBooking(req) {
	req.body.modified_date = Date.now();
	return Booking.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
}

module.exports = {
	getAllBookings,
	getBookingById,
	addBooking,
	deleteBooking,
	updateBooking,
};
