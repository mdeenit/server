const expect = require('expect');
const mongoose = require('mongoose');
const Wish = require('../models/wish');
const {
	getAllWishes,
	getWishById,
	addWish,
	deleteWish,
} = require('../utils/wish_utilities');

const databaseConnection = 'mongodb://localhost/tooth_inc_test';
let wishId = null;

before((done) => connectToMongo(done));
after((done) => {
	mongoose.disconnect(() => done());
});

beforeEach(async () => {
	let wish = await setupData();
	wishId = wish._id;
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
			useFindAndModify: false,
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
	let testWish = {};
	testWish.wish = 'I wish for world peace';
	testWish.user_name = 'Isabel';
	testWish.create_date = date;
	testWish.modified_date = date;
	return Wish.create(testWish);
}

describe.only('getAllWishes', () => {
	let req = {
		query: {},
	};
	it('should return all wishes if they exist in DB', async () => {
		await getAllWishes(req).exec((error, wishes) => {
			expect(Object.keys(wishes).length).toBe(1);
		});
	});
	it('the username should be Isabel', async () => {
		await getAllWishes(req).exec((error, wishes) => {
			expect(wishes[0].user_name).toBe('Isabel');
		});
	});
});

describe.only('getWishById', () => {
	it('should return the wish with user_name Isabel', async () => {
		let req = {
			params: {
				id: wishId,
			},
		};
		await getWishById(req).exec((error, wish) => {
			expect(wish.user_name).toBe('Isabel');
		});
	});
});

describe.only('makeWish', () => {
	let req = {
		body: {
			wish: 'I wish for world peace.',
			user_name: 'Isabel',
		},
	};
	it('should add and return a wish', async () => {
		await addWish(req).save((error, wish) => {
			expect(wish.user_name).toBe('Isabel');
		});
	});


});

describe.only('deleteWish', () => {
	it('should delete the specified wish', async () => {
		let req = {
			params: {
				id: wishId,
			},
		};
		await deleteWish(req).exec();
		await getWishById(req).exec((error, wish) => {
			expect(wish).toBe(null);
		});
	});
});

	function clearData() {
		return Wish.deleteMany();
	}