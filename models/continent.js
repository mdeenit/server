const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the continent schema here
const Continent = new Schema({
	
	continent: {
		type: String,
		required: true,
	},
	fairy_name: {
		type: String,
		required: true,
	},
    description: {
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


Continent.statics.findFairyByContinent = function (continent) {
	return this.find({
		continent: continent,
	});
};

module.exports = mongoose.model('Continent', Continent);