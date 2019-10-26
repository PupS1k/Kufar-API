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
		  fs.unlink(`./public/images/${product.image}`, err => console.error(err));
		}
		Product.deleteOne(product).then(res => console.log(res));
		res.send({id: req.params.id});
	} catch (err) {
		next(err);
	}
};

const saveImage = (req, res, next) => {
	const image = new Image({
		body: `url('data:image/jpeg;base64,${req.files.file.data.toString('base64')}')`
	});
	try {
		image.save().then(image => res.send(JSON.stringify(image._id)));
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

module.exports = {saveImage, createProduct, deleteProduct, sendProducts, getProductByCreatorId};
