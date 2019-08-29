const Product = require('./models/Product');

function listProducts(){
  return Product.find();
}

function deleteAll() {
  return Product.remove();
}

function createProducts(data) {
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

module.exports = {
  listProducts,
  deleteAll,
  createProducts
};
