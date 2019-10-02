const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema({
	image: {type: String},
	name: {type: String},
	categories: {type: String},
	state: {type: String},
	seller: {type: String},
	fashionableSummer: {type: Boolean},
	installmentHalva: {type: Boolean},
	isExchange: {type: Boolean},
	price: {type: String},
	location: {type: String},
	announced: {type: String},
	creatorId: {type: String}
})

ProductSchema.set('toJSON', {
	transform: (doc, result) => {
		const product = {...result, id: result._id}
		delete product['_id']
		return product
	}
})

module.exports =  mongoose.model('Product', ProductSchema)
