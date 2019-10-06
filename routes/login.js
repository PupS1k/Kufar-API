const User = require('../db/models/User');
const createJWT = require('../scripts/createJWT');

const sendToken = async (req, res, next) => {
	try {
		const user = await User.find({mail: req.body.mail, password: req.body.password})
		  .then(users => users[0]);
		if (!user) return res.status(400).send('Email or password is wrong');

		const token = createJWT(user);

		res.send(token);
	} catch (err) {
		next(err);
	}
};

module.exports = {sendToken};
