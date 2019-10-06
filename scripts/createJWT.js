const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports = (user) => {
	const date = new Date();
	date.setHours(date.getHours() + 24);

	const token = jwt.sign({
		id: user._id,
		mail: user.mail,
		password: user.password,
		sellerType: user.sellerType,
		exp: Date.parse(date)
	}, config.secretKey);

	return {
	  token,
	  id: user._id,
	  mail: user.mail,
	  sellerType: user.sellerType
	};
};
