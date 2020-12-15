const router = require('express').Router();

const Users = require('./users-model');

//  middlewares
const restricted = require('../middlewares/restricted');

router.get('/', restricted, async (req, res) => {
	try {
		const users = await Users.getAll();
		res.status(200).json(users);
	} catch (err) {
		console.log(err.message);
		res.status(500).json({ errMessage: 'server error' });
	}
});

module.exports = router;
