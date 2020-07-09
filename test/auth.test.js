const expect = require('expect');
const mongoose = require('mongoose');
const User = require('../models/user');
const { register, login, logout } = require('../controllers/auth_controller');

const databaseConnection = 'mongodb://localhost/tooth_inc_test';

before((done) => connectToMongo(done));
after((done) => {
	mongoose.disconnect(() => done());
});

beforeEach(async () => {
	let user = await setupData();
	UserId = user._id;
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
	let testUser = {};
	testUser.username = 'test user';
	testUser.email = 'test@tester.com';
	testUser.password = '123456';
	testUser.create_date = date;
	testUser.modified_date = date;
	return User.create(testUser);
}

function clearData() {
	return User.deleteMany();
}
