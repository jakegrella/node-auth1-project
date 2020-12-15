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
		try {
			// needs req body to include username, password
			// username cannot already be in db

			// need to hash password (can't save pw in raw text in db)
			const hash = bcrypt.hashSync(req.body.password, 10); //2^10 (1,024 rounds)
			// create new record in db
			const newUser = await User.add({
				username: req.body.username,
				password: hash,
			});
			// send back appropriate code and response
			res.status(201).json(newUser);
		} catch (err) {
			res.status(500).json('500 error');
		}
	}
);

router.post('/login', checkPayload, checkUsernameExists, (req, res) => {
	console.log('logging in');
	try {
		// check req.body.password (raw password) against hash saved inside req.userData.password
		const verifies = bcrypt.compareSync(
			req.body.password,
			req.userData.password
		);
		if (verifies) {
			console.log('we should save a session for user');
			// MAGIC
			// set-cookie header is set on response
			// an active session for this user is saved
			req.session.user = req.userData;
			res.json(`welcome back ${req.userData.username}`);
		} else {
			res.status(401).json('bad credentials');
		}
	} catch (err) {
		res.status(500).json('500 error');
	}
});

router.get('/logout', (req, res) => {
	console.log('goodbye');
	if (req.session) {
		req.session.destroy((err) => {
			if (err) res.json('error logging out');
			else res.json('goodbye - logged out');
		});
	} else {
		res.json('there was no session');
	}
});

module.exports = router;
