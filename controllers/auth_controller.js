const passport = require('passport');
const User = require('../models/user');

const register = (req, res) => {
	User.register(
		new User({
			username: req.body.username,
			email: req.body.email,
		}),
		req.body.password,
		(error) => {
			if (error) {
				res.status(500);
				res.json({
					error: error,
				});
			} else {
				passport.authenticate('local')(req, res, () => {
					console.log('authenticated user: ', req.user.username);
					console.log('session: ', req.session);
					res.json(req.user);
				});
			}
		}
	);
};

const login = (req, res) => {};

const logout = (req, res) => {};

module.exports = { register, login, logout };
