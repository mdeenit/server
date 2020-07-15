const passport = require('passport');
const User = require('../models/user');

const register = (req, res) => {
	User.register(
		new User({
			username: req.body.username,
			email: req.body.email,
			admin: req.body.admin || false,
		}),
		req.body.password,
		(error) => {
			if (error) {
				res.status(500);
				res.json({
					error: error,
				});
			} else {
				login(req, res);
			}
		}
	);
};

const login = (req, res) => {
	passport.authenticate('local')(req, res, () => {
		console.log('authenticated user: ', req.user.username);
		console.log('session: ', req.session);
		res.json(req.user);
	});
};

const logout = (req, res) => {
	req.logout();
	res.sendStatus(200);
	console.log('User logged out');
};

module.exports = { register, login, logout };
