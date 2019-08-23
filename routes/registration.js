var express = require('express');
var router = express.Router();

const db = require( '../public/javascripts/DateBaseUtils');

router.post('/registration', (req, res) => {
  db.registrationUser(req.body).then(data => res.send(data))
});

module.exports = router;
