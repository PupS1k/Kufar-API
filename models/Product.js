const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
  announced: {type: String}
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
