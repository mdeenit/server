const expect = require('expect');
const dummyDataFile = './data/dummy_bookings.test.json';
const fs = require('fs');
const { loadData } = require('../utils/bookings_utilities');

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
