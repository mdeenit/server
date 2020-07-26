const Wish = require('../models/wish');

const getAllWishes = function (req) {
	if (req.user.admin) {
		return Wish.find();
	}
};

const getWishById = (req) => {
	if (req.user.admin) {
		return Wish.findById(req.params.id);
	}
};

const updateWish = (req) => {
	if (req.user.admin) {
		req.body.modified_date = Date.now();
		return Wish.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
	}
};

const addWish = (req) => {
	let date = Date.now();
	req.body.create_date = date;
	req.body.modified_date = date;
	return new Wish(req.body);
};

function deleteWish(req) {
	return Wish.findByIdAndRemove(req.params.id);
}

module.exports = {
	getAllWishes,
	getWishById,
	addWish,
	deleteWish,
	updateWish,
};
