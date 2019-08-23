var express = require('express');
var router = express.Router();
const db = require( '../public/javascripts/DateBaseUtils');

router.get('/kufar', (req, res) => {
  console.log('tut');
  db.listProducts().then(data => res.send(data));
});

router.post('/kufar', (req, res) => {
  db.createProducts(req.body).then(data => res.send(data));
});

module.exports = router;
