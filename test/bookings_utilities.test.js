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
				console.log('Connected to Tooth Inc. TEST database');
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

describe('getAllBookings', () => {
	let req = {
		query: {},
	};
	it('should return all bookings if they exist in DB', async function () {
		await getAllBookings(req).exec((error, bookings) => {
			expect(Object.keys(bookings).length).toBe(1);
		});
	});
	it('the child_name should be JOE BLOGGS', async function () {
		await getAllBookings(req).exec((error, bookings) => {
			expect(bookings[0].child_name).toBe('JOE BLOGGS');
		});
	});
});

describe('getBookingById', () => {
	it('should return the booking with username db_tester', async function () {
		let req = {
			params: {
				id: bookingId,
			},
		};
		await getBookingById(req).exec((error, booking) => {
			expect(booking.username).toBe('db_tester');
		});
	});
});

describe('makeBooking', () => {
	let req = {
		body: {
			child_name: 'JOHN SMITH',
			username: 'db_tester_2',
			address: '999 Fake Street',
			city: 'London',
			postcode: 'L1',
			continent: 'EUROPE',
			currency: 'GBP',
			teeth: 2,
		},
	};
	it('should add and return a booking', async function () {
		await addBooking(req).save((error, booking) => {
			expect(booking.username).toBe('db_tester_2');
		});
	});

	it('should return default value for missing fields', async function () {
		await addBooking(req).save((error, booking) => {
			expect(booking.state).toBe('');
		});
	});
	it('should return open_status as true', async function () {
		await addBooking(req).save((error, booking) => {
			expect(booking.open_status).toBe(true);
		});
	});
});

function clearData() {
	return Booking.deleteMany();
}
