const Wish = require('../models/wish');

const getAllWishes = function(req) {
	return Wish.find();
}

const getWishById = (req) => {
    return Wish.findById(req.params.id);
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
};