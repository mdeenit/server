const { 
    getAllContinents,
	getContinentById,
	addContinent,
	deleteContinent,
	updateContinent,
	getFairy,
} = require("../utils/continents_utilities");

const getContinents = (req, res) => {
	getAllContinents(req)
		
		.exec((error, continents) => {
			if (error) {
				res.status(500);
				return res.json({
					error: error.message,
				});
			}
			res.send(continents);
		});
};

const getFairyByContinent = (req, res) => {
	getFairy(req)
		.exec((error, fairy_name) => {
			if (error) {
				res.status(500);
				return res.json({
					error: error.message,
				});
			}
			res.send(fairy_name);
		});
};

const getContinent = (req, res) => {
	getContinentById(req).exec((error, continent) => {
		if (error) {
			res.status(404);
			return res.send('Continent not found');
		}
		res.send(continent);
	});
};

const makeContinent = (req, res) => {
	req.body.modified_date = new Date();
	console.log('received continent req', req);
	addContinent(req).save((error, continent) => {
		if (error) {
			res.status;
			res.json({
				error: error.message,
			});
		}
		res.status(201);
		res.send(continent);
	});
};

const changeContinent = (req, res) => {
	updateContinent(req).exec((error, continent) => {
		if (error) {
			res.status(500);
			return res.json({
				error: error.message,
			});
		}
		res.status(200);
		res.send(continent);
	});
};

const removeContinent = (req, res) => {
	deleteContinent(req).exec((error, continent) => {
		if (error) {
			res.status(500);
			return res.json({
				error: error.message,
			});
		}
		res.sendStatus(204);
	});
};

const userAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		console.log('User authenticated');
		next();
	} else {
		console.log('User not authenticated');
		res.sendStatus(403);
	}
};
module.exports = {
	getContinents,
	getContinent,
	makeContinent,
	changeContinent,
	removeContinent,
	userAuthenticated,
	getFairyByContinent
};