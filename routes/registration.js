var express = require('express');
var router = express.Router();

const db = require( '../public/javascripts/DateBaseUtils');

router.post('/', (req, res) => {
  db.signUpUser(req.body).then(data => res.send(data))
});

module.exports = router;
