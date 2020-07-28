const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the wish schema here
const Wish = new Schema({
	wish: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	granted: {
		type: Boolean,
		default: false,
	},
	open_status: {
		type: Boolean,
		default: true,
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
