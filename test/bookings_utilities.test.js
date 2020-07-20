const expect = require('expect');
const mongoose = require('mongoose');
const Booking = require('../models/booking');
const {
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

beforeEach(async () => {
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
	it('should return all bookings if they exist in DB', async () => {
		await getAllBookings(req).exec((error, bookings) => {
			expect(Object.keys(bookings).length).toBe(1);
		});
	});
	it('the child_name should be JOE BLOGGS', async () => {
		await getAllBookings(req).exec((error, bookings) => {
			expect(bookings[0].child_name).toBe('JOE BLOGGS');
		});
	});
});

describe('getBookingById', () => {
	it('should return the booking with username db_tester', async () => {
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
	it('should add and return a booking', async () => {
		await addBooking(req).save((error, booking) => {
			expect(booking.username).toBe('db_tester_2');
		});
	});

	it('should return default value for missing fields', async () => {
		await addBooking(req).save((error, booking) => {
			expect(booking.state).toBe('');
		});
	});
	it('should return open_status as true', async () => {
		await addBooking(req).save((error, booking) => {
			expect(booking.open_status).toBe(true);
		});
	});
});

describe('deleteBooking', () => {
	it('should delete the specified booking', async () => {
		let req = {
			params: {
				id: bookingId,
			},
		};
		await deleteBooking(req).exec();
		await getBookingById(req).exec((error, booking) => {
			expect(booking).toBe(null);
		});
	});
});

describe('updateBooking', () => {
	it('should update the specified booking and specified fields', async () => {
		let req = {
			params: {
				id: bookingId,
			},
			body: {
				teeth: 7,
			},
		};
		await updateBooking(req).exec((error, booking) => {
			expect(booking.teeth).toBe(req.body.teeth);
			expect(booking.username).toBe('db_tester');
		});
	});
});

describe.only('get all bookings for a particular continent', () => {
    it('should return a booking if it is in the given continent', function ()  {
        // Add a post for a category 'code'
        const date = Date.now();
        const req = {
            body: {
                child_name: 'JOHN SMITH',
				username: 'db_tester_2',
				address: '999 Fake Street',
				city: 'London',
				postcode: 'L1',
				continent: 'Europe',
				currency: 'GBP',
				teeth: 2,
                create_date: date,
                modified_date: date
            }
        };
        Booking.create(req.body).then(() => {
            utilities.getAllBookings({
                query: {
                    category: 'continent'
                }
            }).exec((err, bookings) => {
                console.log(`BOOKINGS-----${bookings}---`)
                // Expect to only get the booking we just added with the 'Europe' continent
                expect(Object.keys(bookings).length).toBe(1);
                expect(posts[0].continent).toBe('Europe');
                done();
            });
        });

    });
});


describe.only('get all bookings by category with no bookings in category', () => {
	it('should return no bookings if category not found', function () {
		
		const req = {
			body: {
				child_name: 'JOHN SMITH',
				username: 'db_tester_2',
				address: '999 Fake Street',
				city: 'London',
				postcode: 'L1',
				continent: 'EUROPE',
				currency: 'GBP',
				teeth: 2,
				
			}
		};
		Booking.create(req.body).then(() => {
			utilities.getAllBookings({
				query: {
					continent: 'Asia'
				}
			}).exec((err, bookings) => {
				expect(Object.keys(bookings).length).toBe(0);
				done();
			});
		});
	});
});

function clearData() {
	return Booking.deleteMany();
}
