import mongoose from 'mongoose';

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

export const Product = mongoose.model('Product', ProductSchema);
