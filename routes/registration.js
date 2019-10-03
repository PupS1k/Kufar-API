const User = require('../db/models/User')

module.exports = async (req, res, next) => {
	try {
		const emailExist = await User.find({mail: req.body.mail})
		if (emailExist.length) return res.send({message: 'Аккаунт с таким email уже существует'})

		const user = new User({
			mail: req.body.mail,
			password: req.body.password,
		  	sellerType: req.body.sellerType
		})

		user.save()
		res.send({message: ''})
	} catch (err) {
		next(err)
	}
}
