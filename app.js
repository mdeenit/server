const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
//routers
const bookingRouter = require('./routes/bookings_routes');

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
	},
	(error) => {
		if (error) {
			console.log('Error connecting to MongoDB');
		} else {
			console.log('Connected to Tooth Inc. database');
		}
	}
);

app.get('/', (req, res) => {
	res.send('Welcome to Tooth Inc!');
});

app.use('/bookings', bookingRouter);

app.listen(port, () => {
	console.log(`Tooth Inc Server running on port ${port}`);
});
