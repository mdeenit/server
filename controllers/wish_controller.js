const {
	getAllWishes,
	getWishById,
	addWish,
	updateWish,
	deleteWish,
} = require('../utils/wish_utilities');

const getWishes = (req, res) => {
	getAllWishes(req)
		.sort({
			modified_date: -1,
		})
		.exec((error, wishes) => {
			if (error) {
				res.status(500);
				return res.json({
					error: error.message,
				});
			}
			res.send(wishes);
		});
};

const getWish = (req, res) => {
	getWishById(req).exec((error, wish) => {
		if (error) {
			res.status(404);
			return res.send('Wish not found');
		}
		res.send(wish);
	});
};

const makeWish = (req, res) => {
	req.body.modified_date = new Date();
	req.body.username = req.user.username;
	console.log('received wish req', req);
	addWish(req).save((error, wish) => {
		if (error) {
			res.status;
			res.json({
				error: error.message,
			});
		}
		res.status(201);
		res.send(wish);
	});
};

const removeWish = (req, res) => {
	deleteWish(req).exec((error, wish) => {
		if (error) {
			res.status(500);
			return res.json({
				error: error.message,
			});
		}
		res.sendStatus(204);
	});
};

const changeWish = (req, res) => {
	updateWish(req).exec((error, wish) => {
		if (error) {
			res.status(500);
			return res.json({
				error: error.message,
			});
		}
		res.status(200);
		res.send(wish);
	});
};

module.exports = {
	getWishes,
	getWish,
	makeWish,
	removeWish,
	changeWish,
};
