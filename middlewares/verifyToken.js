const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = function (req, res, next) {
	const bearer = req.header('Authorization').split(' ')
	const token = bearer[1];

	if (token === null) return res.status(403).send('Access Denied')

	try {
		const dataToken = jwt.verify(token, config.secretKey)
		req.user = {
			id: dataToken.id,
			mail: dataToken.mail,
			password: dataToken.password,
		  	sellerType: dataToken.sellerType,
		}
		next()
	} catch (err) {
		res.status(400).send('Invalid token')
	}
}
