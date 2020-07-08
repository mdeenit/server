const fs = require('fs');
let dataFile = 'data/dummy_bookings.json';
let dummyBookings = require(`../${dataFile}`);

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

const addBooking = (req) => {
	try {
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
		let newBooking = {
			child_name: child_name,
			username: username,
			address: address,
			city: city,
			state: state || '',
			postcode: postcode,
			continent: continent,
			currency: currency,
			teeth: teeth,
			created_at: date,
			modified_date: date,
		};

		dummyBookings[getNextId()] = newBooking;
		fs.writeFileSync(`./${dataFile}`, JSON.stringify(dummyBookings));
		return newBooking;
	} catch (err) {
		req.error = err;
	}
};

function deleteBooking(req) {
	const id = req.params.id;
	try {
		if (dummyBookings[id]) {
			delete dummyBookings[id];
			fs.writeFileSync(`./${dataFile}`, JSON.stringify(dummyBookings));
		} else {
			req.error = 'Post not found';
		}
		return dummyBookings;
	} catch (error) {
		req.error = error;
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
};
