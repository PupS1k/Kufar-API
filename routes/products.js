const fs = require('fs');
const Product = require('../db/models/Product');
const Image = require('../db/models/Image');

const sendProducts = async (req, res, next) => {
	try {
		const products = await Product.find();
		if (!products) res.status(400).send('Products is not exists');
		res.send(products);
	} catch (err) {
		next(err);
	}
};

const deleteProduct = async (req, res, next) => {
	try {
		const product = await Product.findOne({_id: req.params.id});
		if (product.image) {
		  Image.deleteOne({_id: product.image}).then(res => console.log(res));
		}
		Product.deleteOne(product).then(res => console.log(res));
		res.send({id: req.params.id});
	} catch (err) {
		next(err);
	}
};

const createProduct = async (req, res, next) => {
	const product = new Product({
		image: req.body.image,
		name: req.body.name,
		categories: req.body.categories,
		state: req.body.state,
		sellerType: req.user.sellerType,
		stocks: {
			fashionableSummer: req.body.stocks.fashionableSummer
		},
		installmentHalva: req.body.installmentHalva,
		isExchange: req.body.isExchange,
		price: req.body.price,
		location: req.body.location,
		creatorId: req.user.id
	});
	try {
		product.save().then(product => res.send(product));
	} catch (err) {
		next(err);
	}
};

const getProductByCreatorId = async (req, res, next) => {
	try {
		const products = await Product.find({creatorId: req.user.id});
		res.send(products);
	} catch (err) {
		next(err);
	}
};

module.exports = {createProduct, deleteProduct, sendProducts, getProductByCreatorId};
