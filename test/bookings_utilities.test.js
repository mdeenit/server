const expect = require('expect');
const mongoose = require('mongoose');
const Booking = require('../models/booking');
const {
	loadData,
	getAllBookings,
	getBookingById,
	addBooking,
	deleteBooking,
	updateBooking,
} = require('../utils/bookings_utilities');

const databaseConnection = 'mongodb://localhost/tooth_inc_test';
let bookingId = null;

before((done) => connectToMongo(done));
after((done) => {
	mongoose.disconnect(() => done());
});

beforeEach(async function () {
	let booking = await setupData();
	bookingId = booking._id;
});

afterEach((done) => {
	clearData().exec(() => done());
});

function connectToMongo(done) {
	mongoose.connect(
		databaseConnection,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: true,
		},
		(error) => {
			if (error) {
				console.log('Error connecting to MongoDB');
				done();
			} else {
				console.log('Connected to Tooth Inc. database');
				done();
			}
		}
	);
}

function setupData() {
	let date = Date.now();
	let testBooking = {};
	testBooking.child_name = 'JOE BLOGGS';
	testBooking.username = 'db_tester';
	testBooking.address = '123 Fake Street';
	testBooking.city = 'Sydney';
	testBooking.state = 'NSW';
	testBooking.postcode = '2204';
	testBooking.continent = 'AUSTRALIA';
	testBooking.currency = 'AUD';
	testBooking.teeth = 2;
	testBooking.create_date = date;
	testBooking.modified_date = date;
	return Booking.create(testBooking);
}

function clearData() {
	return Booking.deleteMany();
}
