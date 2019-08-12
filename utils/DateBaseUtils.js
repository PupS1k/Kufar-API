import mongoose from 'mongoose';
import '../models/Product';

import config from '../etc/config';

const Product = mongoose.model('Product');

export function setUpConnection() {
  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function listProducts(){
  return Product.find();
}

export function deleteAll() {
  return Product.remove();
}

export function createProducts(data) {
  const product = new Product({
    image: data.image,
    name: data.name,
    categories: data.categories,
    state: data.state,
    seller: data.seller,
    fashionableSummer: data.fashionableSummer,
    installmentHalva: data.installmentHalva,
    isExchange: data.isExchange,
    price: data.price,
    location: data.location,
    announced: data.announced
  });

  return product.save();
}


// export function goLink(id) {
//   return Product.findById(id);
// }
