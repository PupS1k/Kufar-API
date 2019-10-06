const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function (req, res, next) {
	const bearer = req.header('Authorization').split(' ');
	const token = bearer[1];

	if (token === null) return res.status(403).send('Access Denied');

	try {
		jwt.verify(token, config.secretKey, (err, decoded) => {
		  if(err) res.status(400).send('Invalid token');
		  req.user = {
				id: decoded.id,
				mail: decoded.mail,
				password: decoded.password,
				sellerType: decoded.sellerType,
		  };
		  next();
		});
	} catch (err) {
		next(err);
	}
};
