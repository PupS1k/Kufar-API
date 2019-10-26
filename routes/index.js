const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const {sendImage, saveImage} = require('./images');
const createUser = require('./registration');
const {sendToken} = require('./login');
const {sendProducts, deleteProduct, createProduct, getProductByCreatorId} = require('./products');



router.get('/images/:id', sendImage);
router.post('/images/:id', verifyToken, saveImage);

router.post('/login', sendToken);

router.get('/products/user/:id', verifyToken, getProductByCreatorId);
router.get('/products', sendProducts);
router.delete('/products/:id', verifyToken, deleteProduct);
router.post('/products', verifyToken, createProduct);

router.post('/registration', createUser);

module.exports = router;
