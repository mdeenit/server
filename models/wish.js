const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the wish schema here
const Wish = new Schema({
	wish: {
		type: String,
		required: true,
	},
	user_name: {
		type: String,
		required: true,
	},
	create_date: {
		type: Date,
		required: true,
	},
	modified_date: {
		type: Date,
		required: true,
	},
});

module.exports = mongoose.model('Wish', Wish);