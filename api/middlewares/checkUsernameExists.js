const User = require('../users/users-model');

const checkUsernameExists = async (req, res, next) => {
	// username must be in db already
	// should also tack user in db to req object for conveinence
	try {
		const rows = await User.findBy({ username: req.body.username });
		if (rows.length) {
			req.userData = rows[0];
			next();
		} else {
			res.status(400).json('username does not exist');
		}
	} catch (err) {
		res.status(500).json('500 error');
	}
};

module.exports = checkUsernameExists;
