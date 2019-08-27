var express = require('express');
var router = express.Router();
const db = require( './dbMethods');

router.get('/', (req, res) => {
  db.listProducts().then(data => res.send(data));
});

router.post('/', (req, res) => {
  db.createProducts(req.body).then(data => res.send(data));
});

module.exports = router;
