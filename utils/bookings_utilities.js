const fs = require('fs');
let dataFile = '../data/dummy_bookings.json';
let dummyBookings = require(dataFile);

const getAllBookings = (req) => {
	return dummyBookings;
};

const getBookingById = (req) => {
	let booking = dummyBookings[req.params.id];
	if (booking) {
		return booking;
	}
	req.error = 'No booking found';
};

function loadData(file) {
	dummyBookings = JSON.parse(fs.readFileSync(file, 'utf8'));
}

module.exports = { getAllBookings, getBookingById, loadData };
