const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const multer = require('multer');

const sendImage = require('./images');
const createUser = require('./registration');
const {sendToken} = require('./login');
const {sendProducts, deleteProduct, createProduct, saveImage, getProductByCreatorId} = require('./products');

const storage = multer.diskStorage({
	destination: './public/images',
	filename: function (req, file, cb) {
		cb(null, `image_${req.params.id}`);
	}
});
const upload = multer({storage: storage});


router.get('/images/:fileName', sendImage);

router.post('/login', sendToken);

router.get('/products/user/:id', verifyToken, getProductByCreatorId);
router.get('/products', sendProducts);
router.delete('/products/:id', verifyToken, deleteProduct);
router.post('/products/image/:id', verifyToken, saveImage);
router.post('/products', verifyToken, createProduct);

router.post('/registration', createUser);

module.exports = router;
