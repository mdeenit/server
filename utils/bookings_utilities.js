const Booking = require('../models/booking');

const fs = require('fs');
let dataFile = 'data/dummy_bookings.json';
let dummyBookings = require(`../${dataFile}`);

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
	const id = req.params.id;
	try {
		if (dummyBookings[id]) {
			delete dummyBookings[id];
			fs.writeFileSync(`./${dataFile}`, JSON.stringify(dummyBookings));
		} else {
			req.status = 400;
			req.error = 'Booking not found';
		}
		return dummyBookings;
	} catch (error) {
		req.status = 500;
		req.error = error;
	}
}

function updateBooking(req) {
	let id = req.params.id;
	let existingBooking = dummyBookings[id];
	try {
		if (existingBooking) {
			const {
				child_name,
				username,
				address,
				city,
				state,
				postcode,
				continent,
				currency,
				teeth,
			} = req.body;
			const date = Date.now();
			const updatedBooking = {
				child_name: child_name || existingBooking.child_name,
				username: username || existingBooking.username,
				address: address || existingBooking.address,
				city: city || existingBooking.city,
				state: state || existingBooking.state,
				postcode: postcode || existingBooking.postcode,
				continent: continent || existingBooking.continent,
				currency: currency || existingBooking.currency,
				teeth: teeth || existingBooking.teeth,
				create_date: existingBooking.create_date,
				modified_date: date,
			};
			dummyBookings[id] = updatedBooking;
			fs.writeFileSync(`./${dataFile}`, JSON.stringify(dummyBookings));
			return updatedBooking;
		} else {
			req.status = 400;
			req.error = 'Booking not found';
		}
	} catch (error) {
		req.status = 400;
		req.error = 'Booking not found';
	}
}

// for testing
function loadData(file) {
	dataFile = file;
	dummyBookings = JSON.parse(fs.readFileSync(file, 'utf8'));
}

// for testing
function getNextId() {
	let ids = Object.keys(dummyBookings).sort();
	let lastId = ids.length > 0 ? ids[ids.length - 1] : 0;
	return parseInt(lastId) + 1;
}

module.exports = {
	getAllBookings,
	getBookingById,
	loadData,
	addBooking,
	deleteBooking,
	updateBooking,
};
