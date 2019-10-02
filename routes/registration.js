const express = require('express')
const router = express.Router()

const User = require('../db/models/User')

router.post('/', async (req, res, next) => {
	try {
		const emailExist = await User.find({mail: req.body.mail})
		if (emailExist.length) return res.send({message: 'Аккаунт с таким email уже существует'})

		const user = new User({
			mail: req.body.mail,
			password: req.body.password,
			sellerStatus: req.body.seller
		})

		user.save()
		res.send({message: ''})
	} catch (err) {
		next(err)
	}
})

module.exports = router
