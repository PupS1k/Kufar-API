const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../db/models/User')

const createToken = async (req, res, next) => {
	try {
		const user = await User.find({mail: req.body.mail, password: req.body.password})
	  		.then(users => users[0])
		if (!user) return res.status(400).send('Email or password is wrong')

		const date = new Date()
		date.setHours(date.getHours() + 24)

		const token = jwt.sign({
			id: user._id,
			mail: user.mail,
			password: user.password,
		  	sellerType: user.sellerType,
			exp: Date.parse(date)
		}, config.secretKey)
		res.send({
			token,
			id: user._id,
			mail: user.mail,
			sellerType: user.sellerType
		})
	} catch (err) {
		next(err)
	}
}

module.exports = {createToken}
