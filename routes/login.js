var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');
const User = require('./models/User');

router.post('/', (req, res) => {
    const user = User.find({mail: req.body.mail, password: req.body.password});
    if(!user) return res.status(400).send('Email or password is wrong');

    const token = jwt.sign(req.body, 'KEY_TOKEN');
    res.header('auth-token', token).send(token);
});

router.get('/', verify, (req, res) => {
    res.send({mail: req.user.mail, password: req.user.password});
});

module.exports = router;
