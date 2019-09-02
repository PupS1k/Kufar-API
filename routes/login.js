var express = require('express');
var router = express.Router();

const db = require('./dbUserMethods');

router.get('/', (req, res) => {
    const buff = new Buffer.from(req.headers.authorization, 'base64');
    const data = buff.toString('ascii').split(':');
    db.getUser({mail: data[0], password: data[1]}).then(data => res.send(data))
});

module.exports = router;
