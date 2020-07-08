const expect = require('expect');
const dummyDataFile = './data/dummy_bookings.test.json';
const fs = require('fs');
const {
	loadData,
	getAllBookings,
	getBookingById,
	addBooking,
} = require('../utils/bookings_utilities');

beforeEach(() => {
	setupData();
});

describe('Setup data', () => {
	it('should populate test file with data', () => {
		let bookingContent = fs.readFileSync(dummyDataFile, 'utf8');
		expect(bookingContent.length).toBeGreaterThan(3);
		let bookings = JSON.parse(bookingContent);
		expect(bookings['1'].child_name).toBe('test data child name');
	});
});

describe('getAllBookings', () => {
	it('should return all bookings from dummy data file', () => {
		let bookings = getAllBookings({});
		expect(Object.keys(bookings).length).toBe(1);
		expect(bookings['1'].child_name).toBe('test data child name');
	});
});

describe('getBookingById', () => {
	let req = {
		params: {
			id: '1',
		},
	};
	it('should return the correct booking based on id', () => {
		let booking = getBookingById(req);
		expect(booking.username).toBe('test data username');
	});
	it('should set req.error when given an invalid id', () => {
		req.params.id = '2';
		let booking = getBookingById(req);
		expect(req.error).toBe('No booking found');
	});
});

describe('addBooking', () => {
	let req = {
		body: {
			child_name: 'John Smith',
			username: 'second tester',
			address: '123 sesame street',
			city: 'Liverpool',
			state: '',
			postcode: 'L36',
			continent: 'Europe',
			currency: 'GBP',
			teeth: 2,
		},
	};
	it('should add the booking to the data file', () => {
		addBooking(req);
		let bookingContent = fs.readFileSync(dummyDataFile, 'utf8');
		let bookings = JSON.parse(bookingContent);
		expect(Object.keys(bookings).length).toBe(2);
	});
	it('should return the new bookings', () => {
		let newBooking = addBooking(req);
		expect(newBooking.username).toBe(req.body.username);
	});
});

function setupData() {
	let testBookingData = {};
	let testBooking = {};
	let date = Date.now();
	testBooking.child_name = 'test data child name';
	testBooking.username = 'test data username';
	testBooking.address = 'test street';
	testBooking.city = 'test city';
	testBooking.state = 'test state';
	testBooking.postcode = 'test postcode';
	testBooking.continent = 'EUROPE';
	testBooking.currency = 'EUR';
	testBooking.teeth = 2;
	testBooking.open_status = true;
	testBooking.review_status = false;
	testBooking.create_date = date;
	testBooking.modified_date = date;
	testBookingData['1'] = testBooking;
	fs.writeFileSync(dummyDataFile, JSON.stringify(testBookingData));
	loadData(dummyDataFile);
}
