var express = require('express');
var router = express.Router();

const db = require( '../public/javascripts/DateBaseUtils');

router.post('/login', (req, res) => {
  db.logInUser(req.body).then(data => res.send(data))
});

module.exports = router;
