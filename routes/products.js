var express = require('express');
var router = express.Router();

const Product = require('./models/Product');

router.get('/', (req, res) => {
  const products = Product.find();
  if(!products) res.status(400).send('Products is not exists');

  res.send(products);
});

router.post('/', (req, res) => {
  const product = new Product({
    image: req.body.image,
    name: req.body.name,
    categories: req.body.categories,
    state: req.body.state,
    seller: req.body.seller,
    fashionableSummer: req.body.fashionableSummer,
    installmentHalva: req.body.installmentHalva,
    isExchange: req.body.isExchange,
    price: req.body.price,
    location: req.body.location,
    announced: req.body.announced
  });

  try{
    product.save();
    res.send({product: product._id});
  }catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
