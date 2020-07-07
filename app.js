const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bookingRouter = require('./routes/bookings_routes');

const port = process.env.PORT || 3030;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('Welcome to Tooth Inc!');
});

app.use('/bookings', bookingRouter);

app.listen(port, () => {
	console.log(`Tooth Inc Server running on port ${port}`);
});
