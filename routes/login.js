var express = require('express');
var router = express.Router();

const db = require('./dbMethods');

router.get('/:mail/:password', (req, res) => {
    db.getUser({
        mail: req.params.mail,
        password: req.params.password
    }).then(data => res.send(data))
});

module.exports = router;
