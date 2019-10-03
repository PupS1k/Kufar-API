const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema({
	image: {type: String},
	name: {type: String},
	categories: {type: String},
	state: {type: String},
	sellerType: {type: String},
	stocks: {
		fashionableSummer: {type: Boolean}
	},
	installmentHalva: {type: Boolean},
	isExchange: {type: Boolean},
	price: {type: String},
	location: {type: String},
	createDate: {type: Date, default: Date.now},
	creatorId: {type: String}
})

ProductSchema.set('toJSON', {
	transform: (doc, result) => {
		const {_id: id, ...rest} = result
		return {...rest, id}
	}
})

module.exports = mongoose.model('Product', ProductSchema)
