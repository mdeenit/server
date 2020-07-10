const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
//routers
const bookingRouter = require('./routes/bookings_routes');
const authRouter = require('./routes/auth_routes');

const port = process.env.PORT || 3030;
const app = express();

app.use(cors());
app.use(bodyParser.json());

const databaseConnection = 'mongodb://localhost/tooth_inc';

mongoose.connect(
	databaseConnection,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
		useCreateIndex: true,
	},
	(error) => {
		if (error) {
			console.log('Error connecting to MongoDB');
		} else {
			console.log('Connected to Tooth Inc. database');
		}
	}
);

app.use(
	session({
		secret: 'The Tooth Inc secret string',
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1800000,
		},
		store: new MongoStore({
			mongooseConnection: mongoose.connection,
		}),
	})
);
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());
// to test session and send response to client
app.get('/', (req, res) => {
	console.log(req.session);
	res.send(req.session);
});
app.get('/', (req, res) => {
	res.send('Welcome to Tooth Inc!');
});

app.use('/bookings', bookingRouter);
app.use('/auth', authRouter);

app.listen(port, () => {
	console.log(`Tooth Inc Server running on port ${port}`);
});
