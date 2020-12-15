const User = require('../users/users-model');

const checkUsernameUnique = async (req, res, next) => {
	try {
		const rows = await User.findBy({ username: req.body.username });
		if (!rows.length) {
			next();
		} else {
			res.status(400).json('username taken');
		}
	} catch (err) {
		res.status(500).json('500 error');
	}
};

module.exports = checkUsernameUnique;
