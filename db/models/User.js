const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
	mail: {type: String},
	password: {type: String},
	sellerStatus: {type: String}
})

const User = mongoose.model('User', UserSchema)

module.exports = User
