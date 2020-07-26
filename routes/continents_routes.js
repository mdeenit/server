const express = require('express');
const router = express.Router();

const {
	getContinents,
	getContinent,
	makeContinent,
	changeContinent,
	removeContinent,
	getFairyByContinent,
} = require('../controllers/continents_controller');
const { userAuthenticated } = require('../utils/auth_utilities');

// Authenticate user for all routes
router.use(userAuthenticated);
// Read all continents
router.get('/', getContinents);

//get Fairy by continent
router.get('/continent', getFairyByContinent);

// Read continent with :id
router.get('/:id', getContinent);

// Make a continent
router.post('/', makeContinent);

// Delete continent
router.delete('/:id', removeContinent);

// Delete continent
router.patch('/:id', changeContinent);

module.exports = router;
