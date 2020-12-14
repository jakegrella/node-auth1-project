const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../users/users-model');

// middlewares
const checkPayload = require('../middlewares/checkPayload');
const checkUsernameUnique = require('../middlewares/checkUsernameUnique');
const checkUsernameExists = require('../middlewares/checkUsernameExists');

const router = express.Router();

router.post(
	'/register',
	checkPayload,
	checkUsernameUnique,
	async (req, res) => {
		console.log('registering');
	}
);

router.post('/login', checkPayload, checkUsernameExists, (req, res) => {
	console.log('logging in');
});

router.get('/logout', (req, res) => {
	console.log('goodbye');
});

module.exports = router;
