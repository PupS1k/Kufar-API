const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');

const config = require('../etc/config');

function setUpConnection() {
  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}
function signUpUser(data) {
  return User.find({mail: data.mail})
      .then(res => {
        if(res.length) {
          const user = new User({
            mail: data.mail,
            password: data.password,
            seller: data.seller
          });
          user.save();
          return false;
        }else return true;
      })
      .catch(err => console.log(err));
}

function getUser(data) {
  return User.find(data)
      .then(res => res.length ? false : res[0])
      .catch(err => console.log(err));
}


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
  getUser,
  listProducts,
  setUpConnection,
  deleteAll,
  signUpUser,
  createProducts
};
