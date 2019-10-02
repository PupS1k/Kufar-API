const express = require('express');
const router = express.Router();
const fs = require('fs');
const multer = require('multer');

const verify = require('../middlewares/verifyToken');
const Product = require('../db/models/Product');

const storage = multer.diskStorage({
  destination: './public/images',
  filename: function (req, file, cb) {
    cb(null, `image_${req.params.id}`);
  }
});

const upload = multer({storage: storage});

router.get('/', async(req, res, next) => {
  try {
    const products = await Product.find();
    if (!products) res.status(400).send('Products is not exists');
    res.send(products);
  }catch (err) {
    next(err);
  }
});

router.delete('/:id', verify, async(req, res, next) => {
  try {
    const product = await Product.findOne({_id: req.params.id});
    if(product.image)
      fs.unlink(`./public/images/${product.image}`, err => console.error(err));
    Product.deleteOne(product).then(res => console.log(res));
    res.send({id: req.params.id});
  }catch (err) {
    next(err);
  }
});

router.post('/image/:id', verify, upload.single('file'), (req, res) =>{
  res.send(JSON.stringify(`image_${req.params.id}`));
});

router.post('/', verify, (req, res, next) => {
  const product = new Product({
    image: req.body.image,
    name: req.body.name,
    categories: req.body.categories,
    state: req.body.state,
    seller: req.user.sellerStatus,
    fashionableSummer: req.body.fashionableSummer,
    installmentHalva: req.body.installmentHalva,
    isExchange: req.body.isExchange,
    price: req.body.price,
    location: req.body.location,
    announced: req.body.announced,
    creatorId: req.user.id
  });
  try{
    product.save().then(product => res.send({id: product._id, seller: product.seller}));
  }catch (err) {
    next(err)
  }
});

module.exports = router;
