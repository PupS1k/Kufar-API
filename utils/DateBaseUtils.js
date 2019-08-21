import mongoose from 'mongoose';
import '../models/Product';
import '../models/User';

import config from '../etc/config';

const User = mongoose.model('User');

const Product = mongoose.model('Product');

export function setUpConnection() {
  mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

export function asyncValidateLogin(data) {
  return User.find(data)
      .then(res => res.length === 0)
      .catch(err => console.log(err));
}

export function registrationUser(data) {
  const user = new User({
    mail: data.mail,
    password: data.password,
    seller: data.seller
  });
  return User.find({mail: data.mail})
      .then(res => {
        if(res.length === 0) {
          user.save();
          return false;
        }else return true;
      })
      .catch(err => console.log(err));
}

export function logInUser(data) {
  return User.find(data)
      .then(res => res.length === 0 ? true : res[0])
      .catch(err => console.log(err));
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
