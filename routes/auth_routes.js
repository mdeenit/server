const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/auth_controller');

router.post('/register', register);

module.exports = router;
