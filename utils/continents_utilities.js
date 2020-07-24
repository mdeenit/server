const Continent = require('../models/continent');

const getAllContinents = function(req) {
	return Continent.find();
}

const getFairy = (req) => {
	if (req.continent.continent) {
		return Continent.findFairyByContinent(req.continent.continent);
	}
}

const getContinentById = (req) => {
    return Continent.findById(req.params.id);
};

const addContinent = (req) => {
	let date = Date.now();
	req.body.create_date = date;
	req.body.modified_date = date;
	return new Continent(req.body);
};

function deleteContinent(req) {
	return Continent.findByIdAndRemove(req.params.id);
}

function updateContinent(req) {
	req.body.modified_date = Date.now();
	return Continent.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
}

module.exports = {
	getAllContinents,
	getContinentById,
	addContinent,
	deleteContinent,
	updateContinent,
	getFairy,
};