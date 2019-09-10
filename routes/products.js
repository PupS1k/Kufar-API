var express = require('express');
var router = express.Router();

const multer = require('multer');

const verify = require('./verifyToken');
const Product = require('./models/Product');


const storage = multer.diskStorage({
  destination: './public/images',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({storage: storage});

router.get('/', (req, res) => {
  Product.find().then(products => {
    if(!products) res.status(400).send('Products is not exists');
    res.send(products);
  });
});

router.delete('/', verify, (req, res) => {
  Product.deleteOne(req.body);
  res.sendStatus(200);
});

router.post('/image', verify, upload.single('file'), (req, res) =>{
  res.send(JSON.stringify(req.file.filename));
});

router.post('/', verify, (req, res) => {
  const product = new Product({
    image: req.body.image,
    name: req.body.name,
    categories: req.body.categories,
    state: req.body.state,
    fashionableSummer: req.body.fashionableSummer,
    installmentHalva: req.body.installmentHalva,
    isExchange: req.body.isExchange,
    price: req.body.price,
    location: req.body.location,
    announced: new Date(),
    creatorId: req.user._id
  });
  try{
    product.save().then(product => res.send({_id: product._id}));
  }catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
