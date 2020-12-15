const checkPayload = (req, res, next) => {
	const { username, password } = req.body;
	if (!username || !password) {
		res.status(400).json('bad payload');
	} else {
		next();
	}
};

module.exports = checkPayload;
