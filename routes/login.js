const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const verify = require('../middlewares/verifyToken')
const config = require('../config')
const User = require('../db/models/User')
const Product = require('../db/models/Product')


router.post('/', async (req, res, next) => {
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
			sellerStatus: user.sellerStatus,
			exp: Date.parse(date)
		}, config.secretKey)
		res.send(JSON.stringify(token))
	} catch (err) {
		next(err)
	}
})

router.get('/', verify, async (req, res, next) => {
	try {
		const products = await Product.find({creatorId: req.user.id})
		res.send({...req.user, products})
	} catch (err) {
		next(err)
	}
})

module.exports = router
