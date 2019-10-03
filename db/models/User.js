const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
	mail: {type: String},
	password: {type: String},
	sellerType: {type: String}
})

module.exports = mongoose.model('User', UserSchema)
