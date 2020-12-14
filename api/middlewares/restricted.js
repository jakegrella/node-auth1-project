const restricted = (req, res, next) => {
	if (req.session && req.session.user) {
		next();
	} else {
		res.status(401).json('unauthorized');
	}
};

module.exports = restricted;
