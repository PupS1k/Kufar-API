const User = require('../db/models/User');
const createJWT = require('../scripts/createJWT');

module.exports = async (req, res, next) => {
	try {
		const emailExist = await User.find({mail: req.body.mail});
		if (emailExist.length) return res.send({message: 'Аккаунт с таким email уже существует'});

		const user = new User({
		  mail: req.body.mail,
		  password: req.body.password,
		  sellerType: req.body.sellerType
		});
		user.save();

		const token = createJWT(user);

		res.send({message: '', user: token});
	} catch (err) {
		next(err);
	}
};
