const userAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		console.log('User authenticated');
		next();
	} else {
		console.log('User not authenticated');
		res.sendStatus(403);
	}
};

module.exports = { userAuthenticated };
